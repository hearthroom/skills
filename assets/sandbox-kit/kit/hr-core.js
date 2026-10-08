/* hr-core: the Hearthroom sandbox kit's spine.
   Runs as a classic script in the shell's <head>, before the DOM exists, once per card
   (and again on every edit in the editor preview, so everything here is re-entrant).
   Depends only on the sandbox author API (window.sdk). No fetch, no imports. */
(function (W) {
  'use strict';
  var sdk = W.sdk;
  if (!sdk || !sdk.on) { if (W.console) W.console.warn('[hr] window.sdk missing: is this card on the sandbox page?'); return; }

  /* Re-entry: the preview re-runs card scripts and the platform clears every sdk.on
     subscription when it does, so a fresh instance is right. Tear the old one down first
     so dock tabs and drawers mounted by the previous run do not pile up. */
  var previous = W.HR;
  if (previous && typeof previous.dispose === 'function') { try { previous.dispose(); } catch (e) { /* ignore */ } }

  var HR = { version: '1', modules: {}, _disposers: [] };
  var D = W.document;

  /* ---------- logging (shell debug panel, ?sdkDebug=1) ---------- */
  function out(level, args) {
    try { sdk.debug.log.apply(null, ['[hr:' + level + ']'].concat(Array.prototype.slice.call(args))); } catch (e) { /* ignore */ }
  }
  HR.log = function () { out('log', arguments); };
  HR.warn = function () { out('warn', arguments); };

  /* ---------- module registry: a module that is already there returns false ---------- */
  HR.claim = function (name) {
    if (HR.modules[name]) { HR.warn('module ' + name + ' loaded twice'); return false; }
    HR.modules[name] = true;
    return true;
  };

  /* ---------- events: sdk.on has no off/once; keep our own registry so modules can unhook ---------- */
  var listeners = {};
  var SDK_EVENTS = { 'ready': 1, 'message:new': 1, 'message:done': 1, 'message:stream': 1, 'message:mount': 1, 'message:unmount': 1, 'input:change': 1, 'conversation:switch': 1, 'theme:change': 1, 'back': 1, 'stage:close': 1, 'dispose': 1 };
  var bridged = {};
  function bridge(name) {
    if (bridged[name]) return;
    bridged[name] = true;
    sdk.on(name, function (payload) {
      /* Capture the bubble synchronously: inside a handler document.querySelector is scoped to
         the current bubble; after any await or timeout it is not. */
      var bubble = null;
      if (name.indexOf('message:') === 0) { try { bubble = D.querySelector('[data-chat="message"]'); } catch (e) { bubble = null; } }
      HR.emit(name, payload, bubble);
    });
  }
  HR.on = function (name, fn) {
    if (typeof fn !== 'function') return function () {};
    if (SDK_EVENTS[name]) bridge(name);
    (listeners[name] = listeners[name] || []).push(fn);
    return function () { HR.off(name, fn); };
  };
  HR.once = function (name, fn) {
    var off = HR.on(name, function (a, b) { off(); fn(a, b); });
    return off;
  };
  HR.off = function (name, fn) {
    var list = listeners[name];
    if (!list) return;
    var i = list.indexOf(fn);
    if (i >= 0) list.splice(i, 1);
  };
  HR.emit = function (name, payload, bubble) {
    var list = (listeners[name] || []).slice();
    for (var i = 0; i < list.length; i++) {
      try { list[i](payload, bubble); } catch (e) { HR.warn('handler for ' + name + ' threw', e && e.message ? e.message : e); }
    }
  };

  /* ---------- "settled": the first screen is drawn. `ready` fires last on cold start and is
     never replayed, so modules wait for mount/done to go quiet instead. ---------- */
  var settled = false, settleTimer = null, settleQueue = [];
  function settleSoon() {
    if (settled) return;
    if (settleTimer) W.clearTimeout(settleTimer);
    settleTimer = W.setTimeout(function () {
      settled = true;
      var q = settleQueue.splice(0);
      for (var i = 0; i < q.length; i++) { try { q[i](); } catch (e) { HR.warn('settled callback threw', e); } }
      HR.emit('settled');
    }, 400);
  }
  HR.on('message:mount', settleSoon);
  HR.on('message:done', settleSoon);
  HR.on('ready', settleSoon);
  HR.settled = function (fn) { if (settled) fn(); else settleQueue.push(fn); };

  /* ---------- DOM helpers ---------- */
  var dom = HR.dom = {};
  dom.h = function (tag, attrs, children) {
    var el = D.createElement(tag), k, i, c;
    if (attrs) for (k in attrs) if (Object.prototype.hasOwnProperty.call(attrs, k) && attrs[k] != null) {
      if (k === 'text') el.textContent = attrs[k];
      else if (k === 'html') el.innerHTML = attrs[k];
      else if (k === 'on') { for (var ev in attrs.on) if (Object.prototype.hasOwnProperty.call(attrs.on, ev)) el.addEventListener(ev, attrs.on[ev]); }
      else el.setAttribute(k, attrs[k]);
    }
    if (children) for (i = 0; i < children.length; i++) { c = children[i]; if (c == null) continue; el.appendChild(typeof c === 'string' ? D.createTextNode(c) : c); }
    return el;
  };
  /* Platform nodes. Query from `document` outside handlers (the whole document) and keep the
     reference; inside a message handler the same query is scoped to the bubble. */
  dom.root = function () { return D.querySelector('[data-chat="root"]'); };
  dom.slot = function (name) { return D.querySelector('[data-slot="' + name + '"]'); };
  dom.stage = function () { return sdk.stage.el(); };
  dom.theme = function () { var r = dom.root(); return (r && r.getAttribute('data-theme')) || 'dark'; };
  dom.empty = function (el) { while (el && el.firstChild) el.removeChild(el.firstChild); };
  /* One node per id, rebuilt on re-entry: remove a stale copy first. */
  dom.single = function (id, make) {
    var old = D.getElementById(id);
    if (old && old.parentNode) old.parentNode.removeChild(old);
    var el = make();
    el.id = id;
    HR._disposers.push(function () { if (el.parentNode) el.parentNode.removeChild(el); });
    return el;
  };

  /* ---------- text: the player's Chinese script ---------- */
  HR.t = function (text) { try { return sdk.text.convert(String(text == null ? '' : text)); } catch (e) { return String(text == null ? '' : text); } };
  HR.locale = function () { try { return sdk.user.get().locale || ''; } catch (e) { return ''; } };
  /* the player's current model and the next turn's estimated cost; empty strings on an older page */
  HR.model = function () { try { var m = sdk.model && sdk.model.get(); return { name: String((m && m.name) || ''), cost: String((m && m.cost) || '') }; } catch (e) { return { name: '', cost: '' }; } };

  /* ---------- store: one durable bundle per card (save → cache → memory) ----------
     save.* is cross-device but limited (10 keys, 64 KiB each) and rate limited (20 writes a
     minute), so everything the kit persists goes into ONE key, merged and written at most
     once per 800 ms. Reads before saves are loaded throw HOST_DENIED: fall back silently. */
  var store = HR.store = { key: 'hr', mem: null, dirty: false, timer: null, available: null };
  function readBundle() {
    if (store.mem) return store.mem;
    var v = null;
    try { v = sdk.save.get(store.key); store.available = true; } catch (e) { store.available = false; }
    if (v == null) { try { v = sdk.cache.get(store.key); } catch (e2) { v = null; } }
    store.mem = (v && typeof v === 'object') ? v : {};
    return store.mem;
  }
  function flush() {
    store.timer = null;
    if (!store.dirty) return;
    store.dirty = false;
    try { sdk.cache.set(store.key, store.mem); } catch (e) { /* quota */ }
    if (store.available === false) return;
    sdk.save.set(store.key, store.mem).then(null, function (e) {
      HR.warn('save failed', e && e.code ? e.code : e);
      if (e && e.code === 'HOST_DENIED') store.available = false;
      /* RATE_LIMITED: try again later with the merged bundle. */
      if (e && e.code === 'RATE_LIMITED') { store.dirty = true; store.timer = W.setTimeout(flush, 5000); }
    });
  }
  store.get = function (name, fallback) { var b = readBundle(); return Object.prototype.hasOwnProperty.call(b, name) ? b[name] : fallback; };
  store.set = function (name, value) {
    var b = readBundle();
    b[name] = value;
    store.dirty = true;
    if (!store.timer) store.timer = W.setTimeout(flush, 800);
  };
  store.flush = function () { if (store.timer) W.clearTimeout(store.timer); flush(); };
  /* Validate a stored object against a whitelist of fields: unknown or ill-typed fields are
     dropped one by one, never clamped, never the whole record. */
  store.pick = function (obj, spec) {
    var out = {}, k, v;
    if (!obj || typeof obj !== 'object') return out;
    for (k in spec) if (Object.prototype.hasOwnProperty.call(spec, k) && Object.prototype.hasOwnProperty.call(obj, k)) {
      v = obj[k];
      if (spec[k] === 'number') { if (typeof v === 'number' && isFinite(v)) out[k] = v; }
      else if (spec[k] === 'string') { if (typeof v === 'string') out[k] = v; }
      else if (spec[k] === 'boolean') { if (typeof v === 'boolean') out[k] = v; }
      else if (Array.isArray(spec[k])) { if (spec[k].indexOf(v) >= 0) out[k] = v; }
    }
    return out;
  };

  /* ---------- sending a player line from a click ----------
     message.send must run in the same task as the trusted click: no await, no timeout before
     it. Outside a click the shell asks the player; a refusal is UNAUTHORIZED, not an error. */
  HR.send = function (text) {
    var t = String(text == null ? '' : text).trim();
    if (!t) return Promise.resolve(false);
    var p;
    try { p = sdk.message.send(t); } catch (e) { HR.warn('send threw', e && e.code ? e.code : e); return Promise.resolve(false); }
    return p.then(function () { return true; }, function (e) {
      var code = e && e.code;
      if (code === 'BUSY') HR.emit('send:busy');
      else if (code !== 'UNAUTHORIZED') HR.warn('send failed', code || e);
      return false;
    });
  };
  HR.busy = function () { var r = dom.root(); return !!r && r.getAttribute('data-busy') === '1'; };

  HR.dispose = function () {
    var d = HR._disposers.splice(0);
    for (var i = 0; i < d.length; i++) { try { d[i](); } catch (e) { /* ignore */ } }
    listeners = {};
  };
  HR.on('dispose', function () { store.flush(); });
  HR.on('conversation:switch', function () { store.flush(); });

  W.HR = HR;
  HR.log('core ready');
})(window);
