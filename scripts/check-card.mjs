#!/usr/bin/env node
// Local checks for a Hearthroom card folder before push: rules.json against the sandbox
// contract, markers against the definition, and the things the provider's validate and render
// cannot see (a regex that compiles here but matches the empty string, an attribute the
// sanitizer will strip, a save key that is not a key, a marker the model is never told to emit).
//
//   node check-card.mjs <card-dir> [--json]
//
// Exit 0 when there are no errors; warnings do not fail. Every fact used here comes from
// scripts/sandbox-contract.json, generated from the chat page's source.
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const CONTRACT = JSON.parse(readFileSync(path.join(HERE, 'sandbox-contract.json'), 'utf8'));

const bytes = (s) => Buffer.byteLength(String(s ?? ''), 'utf8');

/** `/pattern/flags` → { source, flags }; a literal → null. */
export function slashForm(find) {
  const m = /^\/([\s\S]+)\/([a-zA-Z]*)$/.exec(String(find ?? '').replace(/^`+|`+$/g, ''));
  return m ? { source: m[1], flags: m[2] } : null;
}

function compile(find) {
  const sf = slashForm(find);
  if (!sf) return { regex: null, literal: String(find ?? '') };
  const bad = sf.flags.split('').filter((f) => !CONTRACT.rules.flags.includes(f));
  if (bad.length) return { error: `flags "${bad.join('')}" are not allowed (only ${CONTRACT.rules.flags})` };
  const flags = sf.flags.includes('g') ? sf.flags : sf.flags + 'g';
  try { return { regex: new RegExp(sf.source, flags) }; } catch (e) { return { error: `invalid pattern: ${e.message}` }; }
}

const SDK_CAP = /\bsdk\.([a-zA-Z]+)(?:\.([a-zA-Z]+))?/g;
const SDK_ON = /\bsdk\.on\(\s*(['"`])([^'"`]+)\1/g;
const HR_ON = /\bHR\.on\(\s*(['"`])([^'"`]+)\1/g;

function scanScript(code, where, out, module = false) {
  const caps = new Set(CONTRACT.sdk.capabilities);
  const keys = new Set(CONTRACT.sdk.keys);
  for (const m of code.matchAll(SDK_CAP)) {
    const key = m[1], method = m[2];
    if (key === 'on' || key === 'version') continue;
    if (!keys.has(key)) { out.error(where, `sdk.${key} does not exist on the sandbox page (keys: ${CONTRACT.sdk.keys.join(', ')})`); continue; }
    if (method && !caps.has(`${key}.${method}`)) out.error(where, `sdk.${key}.${method} does not exist; a misspelled capability never runs and never errors`);
  }
  for (const m of code.matchAll(SDK_ON)) {
    if (!CONTRACT.events.names.includes(m[2])) out.error(where, `sdk.on("${m[2]}") is not an event; it never fires (events: ${CONTRACT.events.names.join(', ')})`);
  }
  for (const m of code.matchAll(HR_ON)) {
    if (m[2].includes(':') && !CONTRACT.events.names.includes(m[2]) && !['send:busy', 'dock:open', 'dock:close', 'stage:closed'].includes(m[2])) out.warn(where, `HR.on("${m[2]}") is not a platform event or a kit event`);
  }
  if (/\bsdk\.(off|once)\b/.test(code)) out.error(where, 'sdk.off / sdk.once do not exist; keep your own registry (the kit\'s HR.on returns an unsubscribe)');
  for (const api of ['sdk.vars', 'vars:change', '<abc_vars']) if (code.includes(api)) out.error(where, `${api} is not provided by any Hearthroom chat page`);
  // sdk.on inside a message:mount handler multiplies subscriptions on every mount.
  const mountHandler = /sdk\.on\(\s*['"`]message:mount['"`]\s*,\s*function[^{]*\{([\s\S]*?)\n\s*\}\s*\)/g;
  for (const m of code.matchAll(mountHandler)) if (/\bsdk\.on\(/.test(m[1])) out.warn(where, 'sdk.on inside a message:mount handler subscribes again on every mount');
  const doneHandler = /sdk\.on\(\s*['"`]message:done['"`]\s*,\s*function[^{]*\{([\s\S]*?)\n\s*\}\s*\)/g;
  for (const m of code.matchAll(doneHandler)) if (/\bsdk\.message\.send\(/.test(m[1]) && !/if\s*\(/.test(m[1])) out.warn(where, 'sdk.message.send inside a message:done handler with no condition loops the conversation');
  if (/\bsave\.set\(\s*['"`]([^'"`]*)['"`]/.test(code)) {
    for (const m of code.matchAll(/\bsave\.set\(\s*['"`]([^'"`]*)['"`]/g)) if (!new RegExp(CONTRACT.save.keyPattern).test(m[1])) out.error(where, `save key "${m[1]}" is not valid (${CONTRACT.save.keyPattern})`);
  }
  if (/\bawait\b[\s\S]{0,200}\bsdk\.message\.send\(/.test(code)) out.warn(where, 'an await before sdk.message.send leaves the click gesture: the player will be asked to confirm');
  if (/document\.currentScript/.test(code)) out.info(where, 'document.currentScript is the running element for inline rule scripts but null in the wrapped fallback; do not depend on it');
  if (!module && (/\bimport\s+[\w{*]/.test(code) || /\bexport\s+(default|const|function)/.test(code))) out.error(where, 'ES module syntax in a classic script: use <script type="module"> (sandbox page only)');
  for (const m of code.matchAll(/<script[^>]+src=["']http:\/\//g)) out.warn(where, `${m[0]}…: http:// external scripts are skipped; use https://`);
}

function scanHtml(html, where, out, { isRule = false } = {}) {
  const noScripts = html.replace(/<script\b[\s\S]*?<\/script\s*>/gi, '').replace(/<style\b[\s\S]*?<\/style\s*>/gi, '');
  for (const m of noScripts.matchAll(/<[a-zA-Z][^>]*\s(data-[\w-]+|aria-[\w-]+|role)=/g)) out.warn(where, `attribute ${m[1]} is removed by the sanitizer on the shell render path; use a class instead`);
  for (const m of noScripts.matchAll(/<svg\b[\s\S]*?<\/svg>/gi)) if (/\son[a-z]+=/i.test(m[0])) out.warn(where, 'on* handlers inside <svg> are removed');
  for (const m of noScripts.matchAll(/<\/?([一-龥][^\s>/]*)\s*\/?>/g)) out.warn(where, `<${m[1]}> is stripped by the sanitizer (text kept); use [${m[1]}] square brackets for model markers`);
  for (const m of noScripts.matchAll(/\bhc-[a-z][a-z0-9-]*/g)) { out.warn(where, `${m[0]} is a classic-page component; the sandbox page does not register it`); break; }
  if (/\{\{random:[^}]*\|[^}]*\}\}/.test(html)) out.warn(where, '{{random:a|b}} uses the wrong separator; the engine expects {{random:a::b}}');
  if (/["'`]assets\/[^"'`]*["'`]\s*\+|\+\s*["'`][^"'`]*assets\//.test(html)) out.warn(where, 'an assets/ path built by concatenation is not uploaded on push; write every path as one literal');
  if (isRule) {
    for (const m of html.matchAll(/(["'])(assets\/[^"'\s]+\.[a-zA-Z0-9]+)\1/g)) out.asset(m[2], where);
  }
}

/** The card's working notes (README.md, never sent) carry two declarations the checker reads. */
export function readDeclarations(readme) {
  const text = String(readme ?? '');
  const role = /^\s*uiRole:\s*(assist|core)\b/mi.exec(text);
  const thr = /^\s*statusOverheadThreshold:\s*(\d+(?:\.\d+)?)\s*%?/mi.exec(text);
  return { uiRole: role ? role[1].toLowerCase() : null, threshold: thr ? Number(thr[1]) / (thr[0].includes('%') || Number(thr[1]) > 1 ? 100 : 1) : null };
}

const STATUS_BLOCK = /\[(status|choices)\]([\s\S]*?)(?:\[\/\1\]|$)/g;

/** Replies → protocol health: how often each key is written, how the block drifts, what it costs. */
export function replayHealth(replies, { block = 'status', threshold = 0.15, requiredKeys = [], volatileKeys = [], markers = [] } = {}) {
  const keyHits = {};
  let withBlock = 0, missingClose = 0, blockChars = 0, replyChars = 0, skippedLines = 0, fullWidth = 0, choicesBlocks = 0;
  const per = [];
  // The card's own markers (what its rules consume): presence rate and the characters they cost.
  const markerStats = {};
  const markerRes = markers.map((m) => {
    const n = m.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return { name: m.name, re: m.angle ? new RegExp(`<${n}[^>]*>[\\s\\S]*?(?:<\\/${n}>|(?=<[a-zA-Z])|$)`, 'g') : new RegExp(`\\[${n}\\][\\s\\S]*?(?:\\[\\/${n}\\]|(?=\\[)|$)`, 'g') };
  });
  for (const reply of replies) {
    const text = String(reply ?? '');
    replyChars += text.length;
    let found = 0, chars = 0;
    for (const { name, re } of markerRes) {
      let hit = 0;
      for (const m of text.matchAll(re)) { hit++; chars += m[0].length; }
      const st = markerStats[name] || (markerStats[name] = { replies: 0, count: 0, chars: 0 });
      if (hit) { st.replies++; st.count += hit; }
      st.chars += Array.from(text.matchAll(re)).reduce((a, m) => a + m[0].length, 0);
    }
    for (const m of text.matchAll(STATUS_BLOCK)) {
      // a block a rule consumes (every kit card) is already in chars from the marker pass; still tally its keys
      if (!markerRes.some((x) => x.name === m[1])) chars += m[0].length;
      if (m[1] === 'choices') { choicesBlocks++; continue; }
      found++;
      if (!m[0].includes(`[/${m[1]}]`)) missingClose++;
      for (const line of m[2].split(/\r?\n|;;/)) {
        let t = line.trim();
        if (!t) continue;
        if (/[：，＝／％｜]/.test(t)) { fullWidth++; t = t.replace(/：/g, ':'); }
        const i = t.replace(/^[-*+•]\s+/, '').indexOf(':');
        if (i <= 0) { skippedLines++; continue; }
        const key = t.replace(/^[-*+•]\s+/, '').slice(0, i).replace(/^[*_`#]+|[*_`#]+$/g, '').trim().toLowerCase();
        keyHits[key] = (keyHits[key] || 0) + 1;
      }
    }
    if (found) withBlock++;
    blockChars += chars;
    per.push({ chars: text.length, blockChars: chars, ratio: text.length ? chars / text.length : 0, hasBlock: found > 0 });
  }
  const n = replies.length || 1;
  const overhead = replyChars ? blockChars / replyChars : 0;
  const keys = Object.fromEntries(Object.entries(keyHits).sort((a, b) => b[1] - a[1]).map(([k, v]) => [k, { count: v, rate: v / n }]));
  const missing = requiredKeys.filter((k) => !(keyHits[k.toLowerCase()] >= Math.ceil(n * 0.9)));
  const markerRates = Object.fromEntries(Object.entries(markerStats).map(([k, v]) => [k, { rate: v.replies / n, perReply: v.count / n, share: replyChars ? v.chars / replyChars : 0 }]));
  return {
    replies: replies.length, withBlock, blockRate: withBlock / n, missingClose, skippedLines, fullWidthLines: fullWidth, choicesBlocks, markers: markerRates,
    overhead: Math.round(overhead * 1000) / 1000, threshold, overThreshold: overhead > threshold,
    worstReply: Math.max(0, ...per.map((p) => p.ratio)), keys, requiredKeysBelow90: missing, volatileKeys,
  };
}

/** Pull reply texts out of `hearthroom play --history --json` output (one JSON object per line or an array) or a plain transcript split by blank lines. */
export function repliesFrom(text) {
  const out = [];
  const t = String(text ?? '').trim();
  const take = (o) => { if (o && typeof o === 'object' && o.isSummary !== true) { const role = o.role || o.chatRole || o.roleType || o.from; const content = o.content ?? o.chatMessage ?? o.text ?? o.message; if (typeof content === 'string' && (role == null || /^(ai|assistant|char|character)$/i.test(String(role)))) out.push(content); } };
  // `play --history --json` prints {conversationId, history: {chats}}, newest first.
  const chatsOf = (j) => { const h = j && j.history && typeof j.history === 'object' ? j.history : j; return h && Array.isArray(h.chats) ? h.chats : null; };
  try { const j = JSON.parse(t); const chats = chatsOf(j); if (Array.isArray(j)) j.forEach(take); else if (j && Array.isArray(j.messages)) j.messages.forEach(take); else if (chats) [...chats].reverse().forEach(take); else take(j); if (out.length) return out; } catch { /* not one JSON document */ }
  let any = false;
  for (const line of t.split(/\n/)) { const l = line.trim(); if (!l.startsWith('{')) continue; try { take(JSON.parse(l)); any = true; } catch { /* skip */ } }
  if (any && out.length) return out;
  // `hearthroom play --history` text: sections headed [AI] / [USER]; keep the AI ones.
  if (/^\[(AI|USER)\]\s*$/m.test(t)) {
    const parts = t.split(/^\[(AI|USER)\]\s*$/m);
    for (let i = 1; i < parts.length; i += 2) if (parts[i] === 'AI') { const body = parts[i + 1].trim(); if (body) out.push(body); }
    if (out.length) return out;
  }
  // preview/replies.md style: one reply per `## ` heading; otherwise blank-line paragraphs.
  if (/^## /m.test(t)) return t.split(/^## .*$/m).map((s) => s.trim()).filter(Boolean);
  return t.split(/\n\s*\n(?=\S)/).filter((s) => STATUS_BLOCK.test(s) || s.length > 40).map((s) => { STATUS_BLOCK.lastIndex = 0; return s; });
}

export function checkCard(dir) {
  const findings = [];
  const out = {
    error: (where, msg) => findings.push({ level: 'error', where, msg }),
    warn: (where, msg) => findings.push({ level: 'warning', where, msg }),
    info: (where, msg) => findings.push({ level: 'info', where, msg }),
    assets: [],
    asset: (p, where) => out.assets.push({ p, where }),
  };
  const read = (name) => (existsSync(path.join(dir, name)) ? readFileSync(path.join(dir, name), 'utf8') : null);
  const rulesText = read('rules.json');
  let rules = null;
  if (rulesText != null) {
    try { rules = JSON.parse(rulesText); } catch (e) { out.error('rules.json', `not valid JSON: ${e.message}`); }
  }
  const definition = read('definition.md') || '';
  const welcome = read('welcome.md') || '';
  const card = (() => { try { return JSON.parse(read('card.json') || '{}'); } catch { out.error('card.json', 'not valid JSON'); return {}; } })();
  const lorebook = (() => { try { return JSON.parse(read('lorebook.json') || '{"entries":[]}'); } catch { out.error('lorebook.json', 'not valid JSON'); return { entries: [] }; } })();
  const openings = existsSync(path.join(dir, 'openings')) ? readdirSync(path.join(dir, 'openings')).filter((f) => f.endsWith('.md')).map((f) => readFileSync(path.join(dir, 'openings', f), 'utf8')) : [];

  const decl = readDeclarations(read('README.md'));
  if (!decl.uiRole) out.info('README.md', 'no `uiRole: assist | core` declared; the checker assumes assist (the replies must read well with display rules off)');
  if (decl.uiRole === 'core' && decl.threshold == null) out.warn('README.md', 'a core card declares its own `statusOverheadThreshold:` with a reason; none found');
  const modelFacing = [definition, String(card.outputContract || ''), String(card.customInstructions || ''), ...(lorebook.entries || []).filter((e) => e && e.constant && !e.disabled).map((e) => String(e.content || ''))].join('\n');
  const playerFacing = [welcome, ...openings].join('\n');

  if (rules && typeof rules === 'object') {
    const list = Array.isArray(rules.rules) ? rules.rules : (out.error('rules.json', '"rules" must be an array'), []);
    if (rules.pageMode && !CONTRACT.provider.pageMode.includes(rules.pageMode)) out.error('rules.json', `pageMode "${rules.pageMode}" is not one of ${CONTRACT.provider.pageMode.join(', ')}`);
    if (rules.mountLayer && !CONTRACT.provider.mountLayer.includes(rules.mountLayer)) out.error('rules.json', `mountLayer "${rules.mountLayer}" is not one of ${CONTRACT.provider.mountLayer.join(', ')}`);
    if (rules.cardFormat && !CONTRACT.provider.cardFormat.includes(rules.cardFormat)) out.error('rules.json', `cardFormat "${rules.cardFormat}" is not one of mmd, tavern`);
    const sandbox = rules.pageMode === 'sandbox';
    let total = 0, usesSdk = false;
    const ids = new Set();
    const consumedMarkers = [];
    list.forEach((r, i) => {
      const where = `rules.json#${r && r.id != null ? r.id : i}`;
      if (!r || typeof r !== 'object') { out.error(where, 'rule is not an object'); return; }
      if (r.id != null) { if (ids.has(String(r.id))) out.error(where, 'duplicate rule id'); ids.add(String(r.id)); }
      if (!String(r.find ?? '').trim()) out.error(where, 'find is blank (the provider rejects the whole rule set)');
      const rb = bytes(r.replace);
      total += bytes(r.find) + rb + bytes(r.name);
      if (rb > CONTRACT.provider.replaceMaxBytes) out.error(where, `replace is ${rb} bytes, over ${CONTRACT.provider.replaceMaxBytes} (UTF-8 bytes; strip comments or split script and style into two rules)`);
      else if (rb > CONTRACT.provider.replaceMaxBytes * 0.85) out.warn(where, `replace is ${rb} bytes, close to the ${CONTRACT.provider.replaceMaxBytes} limit`);
      if (r.enabled === false) return;
      const c = compile(r.find);
      if (c.error) out.error(where, `${c.error} (rolled back as bad_regex)`);
      else if (c.regex) {
        c.regex.lastIndex = 0;
        if (c.regex.test('')) out.error(where, 'the pattern can match the empty string (rolled back as empty_match)');
        c.regex.lastIndex = 0;
        if (/\$[a-zA-Z_]/.test(String(r.replace)) && !/\(/.test(c.regex.source)) out.warn(where, '$name in the replacement needs a first capture group shaped key::value;;key::value');
        const marker = /\\\[([a-zA-Z0-9_一-鿿-]+)\\\]/.exec(c.regex.source) || /<([a-zA-Z][a-zA-Z0-9_-]*)>/.exec(c.regex.source);
        if (marker) consumedMarkers.push({ name: marker[1], angle: marker[0].startsWith('<'), where });
      } else if (c.literal) {
        const marker = /^\[([^\]]+)\]$/.exec(c.literal.trim()) || /^<([^>]+)>$/.exec(c.literal.trim());
        if (marker) consumedMarkers.push({ name: marker[1], angle: c.literal.trim().startsWith('<'), where });
      }
      const replace = String(r.replace ?? '');
      if (/\bsdk\.|\[data-chat|\[data-slot|--chat-/.test(replace)) usesSdk = true;
      for (const m of replace.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)) {
        if (/\bsrc\s*=/.test(m[1])) continue;
        // The sandbox shell keeps type="module" on rule scripts; the classic page does not.
        scanScript(m[2], where, out, sandbox && /\btype\s*=\s*["']?module\b/i.test(m[1]));
      }
      scanHtml(replace, where, out, { isRule: true });
    });
    if (total > CONTRACT.provider.totalMaxBytes) out.error('rules.json', `the rule set is ${total} bytes, over ${CONTRACT.provider.totalMaxBytes}`);
    if (usesSdk && !sandbox) out.error('rules.json', 'rules use the sandbox author API (sdk / [data-chat] / --chat-*) but pageMode is not "sandbox"');
    if (rules.mountTrigger && /\[data-chat|<script/.test(String(rules.mountTrigger))) out.warn('rules.json#mountTrigger', 'the function bar is rendered once at load and only the text goes through rules; put scripts in a rule');

    // Render rules ≠ generation rules: a marker a rule consumes must be something the model is told to write.
    for (const m of consumedMarkers) {
      const name = m.name;
      // Bracketed forms only: a bare word such as "status" or "scene" appears in almost any prose.
      const told = modelFacing.includes(`[${name}]`) || modelFacing.includes(`<${name}>`) || modelFacing.includes(`[/${name}]`) || modelFacing.includes(`【${name}】`);
      const shown = playerFacing.includes(`[${name}]`) || playerFacing.includes(`<${name}>`);
      if (!told && !shown) out.warn(m.where, `the rule consumes the marker "${name}" but neither the definition, the output contract, a constant Lorebook entry nor an opening mentions it: the panel will never appear after the first message`);
      else if (!told && shown) out.warn(m.where, `"${name}" appears in the opening but the model is never told to emit it: it shows once and never updates`);
      if (m.angle && sandbox && /[一-鿿]/.test(name)) out.warn(m.where, `<${name}> works in a rule but is stripped before any script reads the bubble; prefer [${name}]`);
    }
    // The other direction: a marker the model is told to emit with no rule consuming it leaks as text.
    for (const m of modelFacing.matchAll(/\[([a-zA-Z][a-zA-Z0-9_-]{1,30})\]/g)) {
      const name = m[1];
      if (['user', 'char', 'status', 'STATE', 'STATUS'].includes(name) && !list.length) continue;
      if (/^(x|X| |ok)$/.test(name)) continue;
      if (!consumedMarkers.some((c) => c.name === name) && list.length && !new RegExp(`\\[${name}\\]`).test(list.map((r) => r.find).join('\n'))) {
        if (!['hr-pinned'].includes(name)) out.info('definition', `the model is told to write [${name}] but no rule consumes it; it will stay visible as text (fine if intended)`);
      }
    }
    for (const a of out.assets) if (!existsSync(path.join(dir, a.p))) out.error(a.where, `${a.p} is referenced but the file does not exist in the card folder`);
  }
  scanHtml(playerFacing, 'welcome.md', out);
  return findings;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const dir = process.argv[2];
  if (!dir || !existsSync(dir)) { console.error('usage: check-card.mjs <card-dir> [--json] [--replay <history.json|transcript.md>…]'); process.exit(2); }
  const findings = checkCard(path.resolve(dir));
  const at = process.argv.indexOf('--replay');
  if (at > 0) {
    const files = process.argv.slice(at + 1).filter((a) => !a.startsWith('--'));
    const replies = files.flatMap((f) => repliesFrom(readFileSync(path.resolve(f), 'utf8')));
    const decl = readDeclarations(existsSync(path.join(dir, 'README.md')) ? readFileSync(path.join(dir, 'README.md'), 'utf8') : '');
    let config = null;
    try { config = JSON.parse(readFileSync(path.join(dir, 'kit.config.json'), 'utf8')); } catch { /* no kit */ }
    const fields = (config && config.schema && config.schema.fields) || [];
    const markers = [];
    try {
      const rj = JSON.parse(readFileSync(path.join(dir, 'rules.json'), 'utf8'));
      for (const r of rj.rules || []) {
        if (r.enabled === false) continue;
        const sf = slashForm(r.find);
        const src = sf ? sf.source : String(r.find ?? '');
        const m = /\\\[([a-zA-Z0-9_\u4e00-\u9fff-]+)\\\]/.exec(src) || /<([a-zA-Z][a-zA-Z0-9_-]*)>/.exec(src) || /^\[([^\]]+)\]$/.exec(src.trim()) || /^<([^>]+)>$/.exec(src.trim());
        if (m && !markers.some((x) => x.name === m[1])) markers.push({ name: m[1], angle: m[0].startsWith('<') });
      }
    } catch { /* no rules */ }
    const health = replayHealth(replies, { threshold: decl.threshold ?? 0.15, requiredKeys: fields.filter((f) => f.key && !f.volatile && !f.hidden).map((f) => f.key), volatileKeys: fields.filter((f) => f.volatile).map((f) => f.key), markers });
    findings.push({ level: health.overThreshold ? 'warning' : 'info', where: 'replay', msg: `marked-up share ${(health.overhead * 100).toFixed(1)}% of ${health.replies} replies (threshold ${(health.threshold * 100).toFixed(0)}%, worst reply ${(health.worstReply * 100).toFixed(0)}%); a marker that wraps prose (dialogue, a chapter head) counts its whole span, so read the per-marker shares before cutting` });
    findings.push({ level: health.blockRate < 0.9 ? 'warning' : 'info', where: 'replay', msg: `block present in ${health.withBlock}/${health.replies} replies; missing closer ${health.missingClose}; skipped lines ${health.skippedLines}; full-width punctuation lines ${health.fullWidthLines}; choices blocks ${health.choicesBlocks}` });
    if (health.requiredKeysBelow90.length) findings.push({ level: 'warning', where: 'replay', msg: `keys written in fewer than 90% of replies: ${health.requiredKeysBelow90.join(', ')} (the model forgets them; move them to the recency checklist or drop them)` });
    if (Object.keys(health.markers).length) findings.push({ level: 'info', where: 'replay', msg: 'markers the rules consume: ' + Object.entries(health.markers).map(([k, v]) => `${k} in ${(v.rate * 100).toFixed(0)}% of replies (${v.perReply.toFixed(1)}/reply, ${(v.share * 100).toFixed(0)}% of characters)`).join(', ') });
    if (Object.keys(health.keys).length) findings.push({ level: 'info', where: 'replay', msg: 'per key: ' + Object.entries(health.keys).map(([k, v]) => `${k} ${(v.rate * 100).toFixed(0)}%`).join(', ') });
  }
  const errors = findings.filter((f) => f.level === 'error').length;
  if (process.argv.includes('--json')) console.log(JSON.stringify({ status: errors ? 'error' : 'ok', findings }, null, 2));
  else {
    for (const f of findings) console.log(`${f.level === 'error' ? '✖' : f.level === 'warning' ? '△' : '·'} ${f.where}: ${f.msg}`);
    console.log(errors ? `✖ ${errors} error(s)` : '✔ no errors');
  }
  process.exit(errors ? 1 : 0);
}
