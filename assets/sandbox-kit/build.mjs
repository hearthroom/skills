#!/usr/bin/env node
// Turns kit.config.json into display rules for a Hearthroom card folder.
//
//   node build.mjs --config kit.config.json --card ./my-card      # merge into my-card/rules.json
//   node build.mjs --config kit.config.json --out rules.json      # write a standalone rule set
//   node build.mjs --config kit.config.json --check               # checks only, no files written
//
// Produces: hr-style (the compiled preset + kit CSS), hr-kit (the kit modules + boot), hr-status
// (the block → shell element rule) and, with pinned fields, hr-pinned. Everything else in the
// card's rules.json is kept. No dependencies beyond Node.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const status = require(path.join(HERE, 'kit/hr-status.js'));

export const MODULES = ['hr-core.js', 'hr-status.js', 'hr-theme.js', 'hr-ui.js'];
export const REPLACE_MAX_BYTES = 128 * 1024;
export const WARN_BYTES = 110 * 1024;
const TOKEN_KEYS = ['bg', 'surface', 'surface-2', 'text', 'muted', 'border', 'accent', 'on-accent', 'hp', 'mp', 'sp', 'xp', 'good', 'warn', 'bad', 'gap', 'pad', 'radius', 'shadow', 'glow', 'font-size', 'line-height'];
const CHAT_VARS = ['bg', 'surface', 'text', 'text-muted', 'border', 'accent', 'bubble-user-bg', 'bubble-ai-bg', 'bubble-text', 'share-pick-bg', 'composer-bg', 'composer-text', 'shortcut-bg', 'shortcut-text', 'input-bg', 'input-text', 'input-placeholder', 'input-border', 'modal-bg', 'modal-surface', 'modal-text', 'modal-muted', 'modal-accent', 'modal-input-bg', 'modal-input-text', 'modal-cancel-bg', 'modal-btn-bg', 'modal-btn-border', 'more-item-bg'];

export function bytes(s) { return Buffer.byteLength(String(s), 'utf8'); }

/** Drop comments, indentation and blank lines. Comments only where they start a line or trail
 *  after whitespace, so a `/*` inside a string literal is left alone. */
export function slim(code) {
  return String(code)
    .replace(/^\s*\/\*[\s\S]*?\*\/\s*$/gm, '')
    .replace(/(^|\s)\/\*[^\n]*?\*\/\s*$/gm, '$1')
    .replace(/^\s*\/\/[^\n]*$/gm, '')
    .replace(/^[ \t]+/gm, '')
    .replace(/\n{2,}/g, '\n')
    .trim();
}

/** WCAG relative luminance and contrast ratio for #rgb / #rrggbb. Returns null for other forms. */
export function contrast(a, b) {
  const lum = (hex) => {
    const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(hex).trim());
    if (!m) return null;
    let h = m[1];
    if (h.length === 3) h = h.split('').map((c) => c + c).join('');
    const ch = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
  };
  const la = lum(a), lb = lum(b);
  if (la == null || lb == null) return null;
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

/** Pairs that must stay readable on both sides. */
export function contrastReport(tokens) {
  const checks = [
    ['text', 'bg', 4.5], ['text', 'surface', 4.5], ['text', 'surface-2', 4.5], ['muted', 'surface', 3],
    ['border', 'bg', 3], ['accent', 'surface', 3], ['on-accent', 'accent', 4.5],
    ['hp', 'surface', 3], ['mp', 'surface', 3], ['sp', 'surface', 3], ['xp', 'surface', 3],
  ];
  const out = [];
  for (const side of ['dark', 'light']) {
    const t = tokens[side] || {};
    for (const [fg, bg, min] of checks) {
      const ratio = contrast(t[fg], t[bg]);
      if (ratio == null) { out.push({ side, fg, bg, min, ratio: null, ok: false, note: 'not a hex colour' }); continue; }
      out.push({ side, fg, bg, min, ratio: Math.round(ratio * 100) / 100, ok: ratio >= min });
    }
  }
  return out;
}

export function loadPreset(name, root = HERE) {
  const file = /[\\/]|\.json$/.test(name) ? path.resolve(name) : path.join(root, 'presets', `${name}.json`);
  if (!existsSync(file)) throw new Error(`preset not found: ${file}`);
  return JSON.parse(readFileSync(file, 'utf8'));
}

export function mergeTokens(preset, overrides = {}) {
  const out = { dark: { ...(preset.dark || {}) }, light: { ...(preset.light || {}) }, chat: preset.chat || {} };
  for (const side of ['dark', 'light']) for (const [k, v] of Object.entries(overrides[side] || {})) if (!k.startsWith('$')) out[side][k] = v;
  return out;
}

/** The preset as CSS: --hr-* on [data-chat="root"][data-theme=side] (specificity 0,2,0 beats the
 *  shell's 0,1,0 without !important) and, when retheme is on, the platform's --chat-* mapped to
 *  the same tokens so bubbles, composer and modals follow the preset. */
export function compileCss(tokens, { retheme = true } = {}) {
  let css = '';
  for (const side of ['dark', 'light']) {
    const t = tokens[side] || {};
    const decl = [];
    for (const k of TOKEN_KEYS) if (t[k] != null) decl.push(`--hr-${k}:${t[k]}`);
    if (retheme) {
      const map = (tokens.chat && tokens.chat[side]) || {};
      for (const [chatVar, token] of Object.entries(map)) {
        if (!CHAT_VARS.includes(chatVar)) continue;
        decl.push(`--chat-${chatVar}:${t[token] != null ? t[token] : token}`);
      }
    }
    css += `[data-chat="root"][data-theme="${side}"]{${decl.join(';')}}\n`;
  }
  return css;
}

export function bootScript(config) {
  const modes = config.modes || {};
  const lines = ['(function(){', 'var HR=window.HR; if(!HR||!HR.status){return;}'];
  lines.push(`HR.status.config(${JSON.stringify({ block: config.block || status.DEFAULT_BLOCK, schema: config.schema || null })});`);
  if (modes.status !== false) lines.push('HR.status.auto();');
  if (modes.dock) {
    const d = typeof modes.dock === 'object' ? modes.dock : {};
    lines.push(`var dock=HR.ui.dock(${JSON.stringify({ side: d.side || 'right', icon: d.icon || '☰', label: d.label || 'Menu' })});`);
    if (d.settings !== false) lines.push('dock.add(HR.ui.settingsPane());');
  }
  if (Array.isArray(modes.pinned) && modes.pinned.length) {
    const labels = {};
    for (const f of (config.schema && config.schema.fields) || []) if (f.key && f.label) labels[f.key] = f.label;
    lines.push(`HR.settled(function(){HR.ui.pinned(${JSON.stringify(modes.pinned.slice(0, 3))},${JSON.stringify(labels)});});`);
  }
  if (modes.choices !== false) lines.push('HR.ui.choices();');
  lines.push('})();');
  return lines.join('\n');
}

export function buildRules(config, root = HERE) {
  const preset = loadPreset(config.preset || 'quiet-reading', root);
  const tokens = mergeTokens(preset, config.overrides);
  const report = contrastReport(tokens);
  const css = slim(readFileSync(path.join(root, 'kit/hr-base.css'), 'utf8')) + '\n' + compileCss(tokens, { retheme: config.retheme !== false }) + (config.extra && config.extra.css ? '\n' + slim(config.extra.css) : '');
  const js = MODULES.map((m) => slim(readFileSync(path.join(root, 'kit', m), 'utf8'))).join('\n') + '\n' + bootScript(config) + (config.extra && config.extra.js ? '\n' + slim(config.extra.js) : '');
  const rules = [
    { id: 'hr-style', name: 'hr kit styles', find: '{{hr-style}}', replace: `<style>\n${css}\n</style>`, enabled: true },
    { id: 'hr-kit', name: 'hr kit script', find: '{{hr-kit}}', replace: `<script>\n${js}\n</script>`, enabled: true },
    status.rule(config.block || status.DEFAULT_BLOCK),
  ];
  const pinned = Array.isArray(config.modes && config.modes.pinned) && config.modes.pinned.length > 0;
  if (pinned) rules.push({ id: 'hr-pinned', name: 'hr pinned bar host', find: '[[hr-pinned]]', replace: '', enabled: true });
  const problems = [];
  for (const r of rules) {
    const b = bytes(r.replace);
    if (b > REPLACE_MAX_BYTES) problems.push(`${r.id}: replacement is ${b} bytes, over the 128 KiB limit`);
    else if (b > WARN_BYTES) problems.push(`${r.id}: replacement is ${b} bytes, close to the 128 KiB limit`);
  }
  for (const c of report) if (!c.ok) problems.push(`${c.side}: ${c.fg} on ${c.bg} is ${c.ratio ?? c.note}, needs ${c.min}:1`);
  if (pinned && config.modes.pinned.length > 3) problems.push('modes.pinned: at most three fields');
  for (const f of (config.schema && config.schema.fields) || []) if (f.type && !['num', 'text', 'bar', 'level', 'tags', 'entities', 'stats', 'kvlist', 'path'].includes(f.type)) problems.push(`schema field ${f.key}: unknown type ${f.type}`);
  return { rules, report, problems, pinned, sizes: Object.fromEntries(rules.map((r) => [r.id, bytes(r.replace)])) };
}

/** Merge kit rules into an existing rules.json object: kit rules first, in order; others kept. */
export function mergeInto(existing, built) {
  const ids = new Set(built.rules.map((r) => r.id));
  const rest = (existing && Array.isArray(existing.rules) ? existing.rules : []).filter((r) => !ids.has(r.id));
  const out = { ...(existing || {}), rules: [...built.rules, ...rest] };
  if (!out.pageMode) out.pageMode = 'sandbox';
  if (built.pinned) {
    const trigger = String(out.mountTrigger || '');
    if (!trigger.includes('[[hr-pinned]]')) out.mountTrigger = (trigger + ' [[hr-pinned]]').trim();
  }
  return out;
}

function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) { const k = a.slice(2); const v = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true; out[k] = v; }
    else out._.push(a);
  }
  return out;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = parseArgs(process.argv.slice(2));
  const configFile = path.resolve(args.config || 'kit.config.json');
  if (!existsSync(configFile)) { console.error(`config not found: ${configFile}`); process.exit(2); }
  const config = JSON.parse(readFileSync(configFile, 'utf8'));
  const built = buildRules(config);
  for (const p of built.problems) console.log((p.includes('over the') || p.includes('needs') || p.includes('unknown') || p.includes('at most')) ? `✖ ${p}` : `△ ${p}`);
  const hard = built.problems.filter((p) => !p.includes('close to'));
  console.log(`rules: ${built.rules.map((r) => `${r.id} (${built.sizes[r.id]} B)`).join(', ')}`);
  if (hard.length && !args.force) { console.log(`✖ ${hard.length} problem(s); fix them or pass --force`); process.exit(1); }
  if (args.check) process.exit(0);
  if (args.card) {
    const file = path.join(path.resolve(args.card), 'rules.json');
    const existing = existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : { rules: [] };
    writeFileSync(file, JSON.stringify(mergeInto(existing, built), null, 2) + '\n');
    console.log(`✔ wrote ${file}`);
  } else if (args.out) {
    writeFileSync(path.resolve(args.out), JSON.stringify(mergeInto({ rules: [] }, built), null, 2) + '\n');
    console.log(`✔ wrote ${path.resolve(args.out)}`);
  } else {
    process.stdout.write(JSON.stringify(mergeInto({ rules: [] }, built), null, 2) + '\n');
  }
}
