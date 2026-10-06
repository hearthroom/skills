/* hr-status: the status block protocol, its parser and the panel renderer.

   The model ends a reply with one block:

     [status]
     hp: 72/100
     mood: wary
     allies: Mara=61, Tove=25
     tags: poisoned, tired
     [/status]

   One `key: value` per line (a single line of `key::value;;key::value` is accepted too, so the
   same block can also be drawn by a zero-script rule with `$key`). A display rule turns the
   block into a shell element; this module parses the text inside it on message:mount /
   message:done and draws the panel in place. The regex never computes; the script never
   writes anything the model has to read back.

   Loadable in Node for tests: `require('./hr-status.js')` exports { parse, value, render }. */
(function (W, factory) {
  var api = factory(W && W.HR ? W.HR : null, W);
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : null, function (HR, W) {
  'use strict';

  var MAX_VALUE = 200, MAX_ITEMS = 24, MAX_KEY = 40;
  var DEFAULT_BLOCK = 'status';

  /* ---------- block boundaries ----------
     Square brackets survive every path (the sanitizer strips unknown angle-bracket tags such as
     <状态> and keeps the text, so a script that reads the bubble afterwards would never see the
     marker). <name> and 【name】 are accepted for imported cards; new cards write [name]. */
  function esc(s) { return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  function blockSource(name) {
    var n = esc(name);
    return '[<\\[【]\\s*' + n + '\\s*[>\\]】]([\\s\\S]*?)[<\\[【]\\s*[\\/／]\\s*' + n + '\\s*[>\\]】]';
  }
  function blockRegex(name) { return new RegExp(blockSource(name), 'g'); }
  function openerRegex(name) { return new RegExp('[<\\[【]\\s*' + esc(name) + '\\s*[>\\]】]', 'g'); }

  /* The display rule a card ships for this block: square-bracket form only, so the model-side
     protocol and the rule agree on one spelling. The closing marker is optional: a model that
     drops `[/status]` still gets a panel (the block then runs to the end of the reply), and the
     pattern can never match the empty string because the opener is required. */
  function rule(name) {
    var n = esc(name || DEFAULT_BLOCK);
    return {
      id: 'hr-status',
      name: 'hr status block',
      find: '/\\[' + n + '\\]([\\s\\S]*?)(?:\\[\\/' + n + '\\]|(?=\\[choices\\])|$)/g',
      replace: '<div class="hr-status hr-status--raw">$1</div>',
      enabled: true,
    };
  }
  /* The choices block: one option per line, drawn as buttons by hr-ui. A draft set fills the
     composer on tap; a send set sends on a trusted tap. The model writes the block, never HTML. */
  function choicesRule(name, mode) {
    var n = esc(name || 'choices');
    var cls = 'hr-choices' + (mode === 'send' ? ' hr-choices--send' : ' hr-choices--draft');
    return {
      id: 'hr-choices',
      name: 'hr choices block',
      find: '/\\[' + n + '\\]([\\s\\S]*?)(?:\\[\\/' + n + '\\]|(?=\\[' + esc(DEFAULT_BLOCK) + '\\]|<div class="hr-status)|$)/g',
      replace: '<div class="' + cls + ' hr-choices--raw">$1</div>',
      enabled: true,
    };
  }
  /* Lines of a choices block → option texts (list prefixes and numbering stripped). */
  function parseChoices(body) {
    var raw = String(body == null ? '' : body).split(/\r?\n/), out = [], i, t;
    for (i = 0; i < raw.length; i++) {
      t = norm(raw[i]).trim().replace(/^(?:[-*+•]|\d+[.)]|[①-⑳])\s*/, '').trim();
      if (t) out.push(cut(t));
      if (out.length >= 8) break;
    }
    return out;
  }

  /* ---------- normalisation: full-width punctuation and digits to ASCII ---------- */
  var FW = { '：': ':', '，': ',', '、': ',', '＝': '=', '／': '/', '％': '%', '－': '-', '｜': '|', '＞': '>', '\u3000': ' ' };
  function norm(s) {
    return String(s)
      .replace(/[：，、＝／％－｜＞\u3000]/g, function (c) { return FW[c]; })
      .replace(/[\uff10-\uff19]/g, function (c) { return String.fromCharCode(c.charCodeAt(0) - 0xfee0); });
  }
  function num(s) {
    var t = String(s).trim();
    if (!/^[+-]?(\d+\.?\d*|\.\d+)$/.test(t)) return null;
    var v = parseFloat(t);
    return isFinite(v) ? v : null;
  }
  function cut(s) { var t = String(s).trim(); return t.length > MAX_VALUE ? t.slice(0, MAX_VALUE) : t; }
  function splitList(s) {
    var out = [], parts = String(s).split(','), i, t;
    for (i = 0; i < parts.length; i++) { t = parts[i].trim(); if (t) out.push(t); }
    return out.length > MAX_ITEMS ? out.slice(0, MAX_ITEMS) : out;
  }

  /* ---------- structured values: each parser returns null unless the whole value fits ---------- */
  function pair(s) {
    var a = String(s).split('/');
    if (a.length !== 2) return null;
    var x = num(a[0]), y = num(a[1]);
    return x === null || y === null ? null : { value: x, max: y };
  }
  function pairs(items, min) {
    var out = [], i, t, ci, k, rest, v, note;
    if (!items || items.length < (min || 2)) return null;
    for (i = 0; i < items.length; i++) {
      t = String(items[i]).trim();
      if (!t) return null;
      ci = t.indexOf(':');
      if (ci <= 0 || ci === t.length - 1) return null;
      k = t.slice(0, ci).trim();
      rest = t.slice(ci + 1);
      ci = rest.indexOf(':');
      if (ci >= 0) { v = rest.slice(0, ci).trim(); note = rest.slice(ci + 1).trim(); } else { v = rest.trim(); note = ''; }
      if (!k || !v) return null;
      out.push({ name: k, value: v, note: note });
      if (out.length >= MAX_ITEMS) break;
    }
    return out.length ? out : null;
  }
  function toLevel(t, loose) {
    var i = t.indexOf('|');
    if (i < 0) return loose ? { name: t, value: null, max: null } : null;
    var name = t.slice(0, i).trim(), b = pair(t.slice(i + 1).trim());
    if (!name) return null;
    if (!b) return loose ? { name: name, value: null, max: null } : null;
    return { name: name, value: b.value, max: b.max };
  }
  function toStats(t, min) {
    if (t.indexOf('|') >= 0) return null;
    var a = splitList(t);
    if (a.length < 2) a = t.split(/\s+/);
    return pairs(a, min);
  }
  function toKvlist(t, min) {
    if (t.indexOf('|') < 0 && (min || 2) > 1) return null;
    return pairs(t.split('|'), min);
  }
  /* A path is `a > b > c` (also › →). Hyphens are not a separator: too common in prose. */
  function toPath(t, min) {
    if (!/[>›→]/.test(t)) return null;
    var a = t.split(/\s*[>›→]\s*/), out = [], i;
    if (a.length < (min || 2)) return null;
    for (i = 0; i < a.length; i++) { if (!a[i].trim()) return null; out.push(a[i].trim()); if (out.length >= MAX_ITEMS) break; }
    return out;
  }

  /* ---------- value classification: the order is the priority ----------
     1 number · 2 n% · 3 a/b · 4 name|a/b (level) · 5 k:v|k:v (kvlist) · 6 k:v k:v (stats)
     7 name=number, … (entities) · 8 a, b (tags) · 9 a > b (path) · 10 text.
     Every tier needs the whole value to fit; otherwise it falls through to text. A line that is
     drawn as plain text is always better than a broken widget. */
  function value(raw) {
    var t = cut(norm(raw)), n, pc, ab, lv, kv, st, items, ents, plain, i, m, v, ph;
    if (!t) return { type: 'text', value: '', raw: t };
    n = num(t);
    if (n !== null) return { type: 'num', value: n, raw: t };
    pc = /^([+-]?[\d.]+)\s*%$/.exec(t);
    if (pc && num(pc[1]) !== null) return { type: 'bar', value: num(pc[1]), max: 100, unit: '%', raw: t };
    ab = pair(t);
    if (ab) return { type: 'bar', value: ab.value, max: ab.max, raw: t };
    lv = toLevel(t);
    if (lv) return { type: 'level', value: lv, raw: t };
    kv = toKvlist(t);
    if (kv) return { type: 'kvlist', value: kv, raw: t };
    st = toStats(t);
    if (st) return { type: 'stats', value: st, raw: t };
    items = splitList(t); ents = []; plain = 0;
    for (i = 0; i < items.length; i++) {
      m = /^([\s\S]+?)\s*=\s*([\s\S]+)$/.exec(items[i]);
      v = m ? num(m[2]) : null;
      if (m && v !== null) ents.push({ name: m[1].trim(), value: v }); else plain++;
    }
    if (ents.length && ents.length >= plain) return { type: 'entities', value: ents, raw: t };
    if (items.length > 1) return { type: 'tags', value: items, raw: t };
    ph = toPath(t);
    if (ph) return { type: 'path', value: ph, raw: t };
    return { type: 'text', value: t, raw: t };
  }
  /* A schema may force a type; re-fit the raw value with relaxed minimums. */
  function fit(type, raw) {
    var t = cut(norm(raw == null ? '' : raw));
    if (!t) return null;
    if (type === 'path') return toPath(t, 1);
    if (type === 'level') return toLevel(t, 1);
    if (type === 'stats') return toStats(t, 1);
    if (type === 'kvlist') return toKvlist(t, 1);
    if (type === 'bar') { var b = pair(t); if (b) return b; var n = num(t); return n === null ? null : { value: n, max: 100 }; }
    if (type === 'num') { var x = num(t); return x === null ? null : x; }
    if (type === 'tags') return splitList(t);
    return t;
  }

  /* ---------- lines: `key: value`, split at the first colon; `;;` also ends a line ---------- */
  function lines(body, state, order, skipped) {
    var raw = String(body).split(/\r?\n|;;/), i, ln, ci, k, rest;
    for (i = 0; i < raw.length; i++) {
      ln = norm(raw[i]).trim();
      if (!ln) continue;
      ln = ln.replace(/^[-*+•]\s+/, '');
      ci = ln.indexOf(':');
      if (ci <= 0) { skipped.push(raw[i].trim()); continue; }
      k = ln.slice(0, ci).trim().replace(/^[*_`#]+|[*_`#]+$/g, '').trim();
      rest = ln.slice(ci + 1);
      if (rest.charAt(0) === ':') rest = rest.slice(1);   /* key::value */
      if (!k) { skipped.push(raw[i].trim()); continue; }
      if (k.length > MAX_KEY) k = k.slice(0, MAX_KEY);
      if (!Object.prototype.hasOwnProperty.call(state, k)) order.push(k);
      state[k] = value(rest);
    }
  }

  /* parse(text, name?) → { state, order, cleaned, skipped } or null when there is no block.
     A missing closing marker parses to the end of the text (and is reported). */
  function parse(text, name) {
    var block = name || DEFAULT_BLOCK;
    if (typeof text !== 'string' || !text) return null;
    var re = blockRegex(block), bodies = [], m, cleaned, missingClose = false;
    while ((m = re.exec(text)) !== null) { bodies.push(m[1]); if (m.index === re.lastIndex) re.lastIndex++; }
    if (bodies.length) cleaned = text.replace(blockRegex(block), '');
    else {
      var op = openerRegex(block), o = op.exec(text);
      if (!o) return null;
      missingClose = true;
      bodies.push(text.slice(o.index + o[0].length));
      cleaned = text.slice(0, o.index);
    }
    var state = {}, order = [], skipped = [], i;
    for (i = 0; i < bodies.length; i++) lines(bodies[i], state, order, skipped);
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n').replace(/^\s+|\s+$/g, '');
    return { state: state, order: order, cleaned: cleaned, skipped: skipped, missingClose: missingClose };
  }
  /* Wrap a bare block body (what hydrate reads from a shell element) so parse() sees a block. */
  function wrap(body, name) { var n = name || DEFAULT_BLOCK; return '[' + n + ']\n' + String(body) + '\n[/' + n + ']'; }

  /* ---------- schema → ordered field list ----------
     schema: { title?, strict?, fields: [{ key, label?, type?, tone?, section?, max?, hidden?, volatile? }] }
     Without a schema every key is drawn in the order it appeared, type inferred. */
  function toneFor(key, forced) {
    if (forced) return forced;
    var k = String(key).toLowerCase();
    if (/^(hp|health|life|blood|體力|体力|血量|生命)$/.test(k)) return 'hp';
    if (/^(mp|mana|magic|靈力|灵力|法力|魔力)$/.test(k)) return 'mp';
    if (/^(sp|stamina|energy|精力|耐力|體能|体能)$/.test(k)) return 'sp';
    if (/^(xp|exp|experience|經驗|经验)$/.test(k)) return 'xp';
    return '';
  }
  function fieldsOf(parsed, schema) {
    var state = parsed.state, order = parsed.order, out = [], seen = {}, i, f, v, type, data;
    var list = (schema && schema.fields) || [];
    for (i = 0; i < list.length; i++) {
      f = list[i];
      if (!f || !f.key) continue;
      if (f.section) { out.push({ section: true, label: f.section, tone: f.tone || '' }); }
      if (!Object.prototype.hasOwnProperty.call(state, f.key)) continue;
      seen[f.key] = true;
      if (f.hidden) continue;
      v = state[f.key];
      type = f.type || v.type;
      data = f.type && f.type !== v.type ? fit(f.type, v.raw) : (v.type === 'num' || v.type === 'text' ? v.value : (v.type === 'bar' ? { value: v.value, max: f.max || v.max } : v.value));
      if (data === null) { type = 'text'; data = v.raw; }
      out.push({ key: f.key, label: f.label || f.key, type: type, data: data, tone: toneFor(f.key, f.tone), raw: v.raw });
    }
    if (!(schema && schema.strict)) {
      for (i = 0; i < order.length; i++) {
        if (seen[order[i]]) continue;
        v = state[order[i]];
        out.push({ key: order[i], label: order[i], type: v.type, data: (v.type === 'num' || v.type === 'text') ? v.value : (v.type === 'bar' ? { value: v.value, max: v.max } : v.value), tone: toneFor(order[i]), raw: v.raw });
      }
    }
    return out;
  }

  /* ---------- rendering: a tiny tree → DOM or HTML string. Classes only (author data-* is
     stripped by the sanitizer); no inline event handlers; no hard-coded colours. ---------- */
  function escapeHtml(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function n(tag, cls, kids, text, style) { return { t: tag, c: cls, k: kids || null, x: text == null ? null : String(text), s: style || null }; }
  function pct(v, max) { if (!max || !isFinite(v)) return 0; var p = (v / max) * 100; return Math.max(0, Math.min(100, p)); }
  var TYPES = {
    num: function (f) { return n('div', 'hr-row', [n('span', 'hr-label', null, f.label), n('span', 'hr-val hr-num', null, f.data)]); },
    text: function (f) { return n('div', 'hr-row', [n('span', 'hr-label', null, f.label), n('span', 'hr-val', null, f.data)]); },
    bar: function (f) {
      var d = f.data || {}, p = pct(d.value, d.max);
      return n('div', 'hr-row hr-row--bar' + (f.tone ? ' hr-tone--' + f.tone : ''), [
        n('span', 'hr-label', null, f.label),
        n('span', 'hr-bar', [n('span', 'hr-bar__fill', null, null, 'width:' + p.toFixed(1) + '%')]),
        n('span', 'hr-val hr-num', null, f.raw),
      ]);
    },
    level: function (f) {
      var d = f.data || {}, p = d.max ? pct(d.value, d.max) : 0;
      return n('div', 'hr-row hr-row--level' + (f.tone ? ' hr-tone--' + f.tone : ' hr-tone--xp'), [
        n('span', 'hr-label', null, f.label),
        n('span', 'hr-level', [n('b', 'hr-level__name', null, d.name), d.max ? n('span', 'hr-bar', [n('span', 'hr-bar__fill', null, null, 'width:' + p.toFixed(1) + '%')]) : null, d.max ? n('span', 'hr-val hr-num', null, d.value + '/' + d.max) : null]),
      ]);
    },
    tags: function (f) {
      var kids = [], i, list = f.data || [];
      for (i = 0; i < list.length; i++) kids.push(n('span', 'hr-chip', null, list[i]));
      return n('div', 'hr-row', [n('span', 'hr-label', null, f.label), n('span', 'hr-chips', kids)]);
    },
    entities: function (f) {
      var kids = [], i, list = f.data || [];
      for (i = 0; i < list.length; i++) kids.push(n('span', 'hr-chip hr-chip--kv', [n('span', 'hr-chip__k', null, list[i].name), n('span', 'hr-chip__v hr-num', null, list[i].value)]));
      return n('div', 'hr-row', [n('span', 'hr-label', null, f.label), n('span', 'hr-chips', kids)]);
    },
    stats: function (f) {
      var kids = [], i, list = f.data || [], item;
      for (i = 0; i < list.length; i++) {
        item = list[i];
        kids.push(n('span', 'hr-stat' + (item.note ? ' hr-stat--note' : ''), [n('span', 'hr-stat__k', null, item.name), n('span', 'hr-stat__v hr-num', null, item.value), item.note ? n('span', 'hr-note', null, item.note) : null]));
      }
      return n('div', 'hr-row hr-row--stats', [n('span', 'hr-label', null, f.label), n('span', 'hr-stats', kids)]);
    },
    kvlist: function (f) {
      var kids = [], i, list = f.data || [], item;
      for (i = 0; i < list.length; i++) {
        item = list[i];
        kids.push(n('span', 'hr-kv' + (item.note ? ' hr-kv--note' : ''), [n('span', 'hr-kv__k', null, item.name), n('span', 'hr-kv__v', null, item.value), item.note ? n('span', 'hr-note', null, item.note) : null]));
      }
      return n('div', 'hr-row hr-row--kv', [n('span', 'hr-label', null, f.label), n('span', 'hr-kvlist', kids)]);
    },
    path: function (f) {
      var kids = [], i, list = f.data || [];
      for (i = 0; i < list.length; i++) { if (i) kids.push(n('span', 'hr-path__sep', null, '›')); kids.push(n('span', 'hr-path__seg', null, list[i])); }
      return n('div', 'hr-row', [n('span', 'hr-label', null, f.label), n('span', 'hr-path', kids)]);
    },
  };
  function tree(parsed, schema) {
    var fields = fieldsOf(parsed, schema), out = [], cur = null, curLabel = '', curTone = '', i, f, node;
    if (schema && schema.title) out.push(n('div', 'hr-title', null, schema.title));
    function flush() {
      if (cur && cur.length) out.push(n('div', 'hr-section' + (curTone ? ' hr-tone--' + curTone : ''), curLabel ? [n('div', 'hr-section__t', null, curLabel)].concat(cur) : cur));
      cur = null; curLabel = ''; curTone = '';
    }
    for (i = 0; i < fields.length; i++) {
      f = fields[i];
      if (f.section) { flush(); cur = []; curLabel = f.label; curTone = f.tone; continue; }
      node = null;
      try { node = (TYPES[f.type] || TYPES.text)(f); } catch (e) { node = TYPES.text({ label: f.label, data: f.raw }); }
      if (!node) continue;
      if (cur) cur.push(node); else out.push(node);
    }
    flush();
    return out;
  }
  function toHtml(node) {
    if (!node) return '';
    var s = '<' + node.t + ' class="' + node.c + '"' + (node.s ? ' style="' + escapeHtml(node.s) + '"' : '') + '>';
    if (node.x != null) s += escapeHtml(node.x);
    if (node.k) for (var i = 0; i < node.k.length; i++) s += toHtml(node.k[i]);
    return s + '</' + node.t + '>';
  }
  function toDom(node, D, t) {
    var el = D.createElement(node.t);
    el.className = node.c;
    if (node.s) el.setAttribute('style', node.s);
    if (node.x != null) el.textContent = t ? t(node.x) : node.x;
    if (node.k) for (var i = 0; i < node.k.length; i++) if (node.k[i]) el.appendChild(toDom(node.k[i], D, t));
    return el;
  }
  /* render(parsed, schema) → HTML string of the panel (for the function bar or tests). */
  function render(parsed, schema) {
    var kids = tree(parsed, schema), s = '', i;
    for (i = 0; i < kids.length; i++) s += toHtml(kids[i]);
    return s ? '<div class="hr-status hr-status--done"><div class="hr-panel">' + s + '</div></div>' : '';
  }

  var api = { parse: parse, value: value, fit: fit, wrap: wrap, rule: rule, choicesRule: choicesRule, parseChoices: parseChoices, render: render, tree: tree, fieldsOf: fieldsOf, blockSource: blockSource, DEFAULT_BLOCK: DEFAULT_BLOCK };

  /* ---------- browser side: hydrate shell elements the display rule produced ---------- */
  if (HR && HR.claim && HR.claim('status')) {
    var D = W.document;
    var status = HR.status = api;
    var current = { schema: null, block: DEFAULT_BLOCK, latest: null };
    status.config = function (o) {
      o = o || {};
      if (o.schema) current.schema = o.schema;
      if (o.block) current.block = String(o.block).replace(/^[<\[【\/]+|[>\]】]+$/g, '') || DEFAULT_BLOCK;
      return current;
    };
    status.latest = function () { return current.latest; };
    /* Draw into one shell element. Author classes only: the raw element becomes --done. */
    /* The Markdown pass may have turned the block's line breaks into <br> or <p>: read the HTML
       and put the breaks back before parsing, instead of trusting textContent. */
    function textOf(el) {
      var html = el.innerHTML || '';
      html = html.replace(/<br\s*\/?>/gi, '\n').replace(/<\/(p|div|li|tr)>/gi, '\n').replace(/<[^>]+>/g, '');
      var box = D.createElement('textarea');
      box.innerHTML = html;
      return box.value;
    }
    status.textOf = textOf;
    function hydrateOne(el) {
      if (!el || /\bhr-status--done\b/.test(el.className)) return false;
      var text = textOf(el), parsed = parse(text, current.block);
      if (!parsed || !parsed.order.length) parsed = parse(wrap(text, current.block), current.block);
      if (!parsed || !parsed.order.length) { el.className = 'hr-status hr-status--done hr-status--plain'; return false; }
      var kids = tree(parsed, current.schema), box = D.createElement('div'), i;
      box.className = 'hr-panel';
      for (i = 0; i < kids.length; i++) box.appendChild(toDom(kids[i], D, HR.t));
      HR.dom.empty(el);
      el.appendChild(box);
      el.className = 'hr-status hr-status--done';
      /* Notes (`key:value:note`) open on tap, not hover: the page is mostly touch. */
      box.addEventListener('click', function (ev) {
        var t = ev.target && ev.target.closest ? ev.target.closest('.hr-stat--note, .hr-kv--note') : null;
        if (t) t.classList.toggle('hr-open');
      });
      return true;
    }
    /* hydrate(root?) draws every raw element under root (the current bubble inside a handler). */
    status.hydrate = function (root) {
      var scope = root || D, nodes = scope.querySelectorAll('.hr-status--raw'), i, count = 0;
      for (i = 0; i < nodes.length; i++) if (hydrateOne(nodes[i])) count++;
      return count;
    };
    /* auto(): hydrate on mount and done (both replayed to late subscribers), and keep the latest
       state from each finished AI reply for pinned bars, themes and other modules. */
    /* The body may not be final when mount or done fires: the shell renders rules in a worker
       and swaps the finished HTML in later (the same bubble, new children). Hydrate now, and keep
       watching the bubble for a few seconds so a raw element that appears later is drawn too. */
    var watching = typeof W.MutationObserver === 'function' ? new W.WeakMap() : null;
    function watch(bubble) {
      if (!bubble) return;
      status.hydrate(bubble);
      if (!watching || watching.get(bubble)) return;
      var done = false;
      var mo = new W.MutationObserver(function () { if (!done && bubble.querySelector('.hr-status--raw:not(.hr-status--done)')) status.hydrate(bubble); });
      mo.observe(bubble, { childList: true, subtree: true });
      watching.set(bubble, mo);
      W.setTimeout(function () { done = true; mo.disconnect(); watching.delete(bubble); }, 8000);
    }
    status.auto = function (schema) {
      if (schema) current.schema = schema;
      HR.on('message:mount', function (p, bubble) { watch(bubble); });
      HR.on('message:done', function (p, bubble) {
        watch(bubble);
        if (p && p.role === 'ai' && typeof p.content === 'string') {
          var parsed = parse(p.content, current.block);
          if (parsed && parsed.order.length) { current.latest = parsed; HR.emit('state', parsed); }
        }
      });
      return status;
    };
    HR.log('status ready');
  }
  return api;
});
