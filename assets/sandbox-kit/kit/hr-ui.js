/* hr-ui: the chrome the kit can draw outside the reply.

   - dock: one tab on a screen edge (inside [data-slot="left"|"right"], the shell's sidebar
     positions) opening a drawer with one or more panes. One dock per side; a single pane gets no
     tab bar; a dock with no panes is not drawn.
   - settings pane: text size, line height, motion, density, reset.
   - pinned bar: one line of one to three fields in the function bar, redrawn from the latest
     parsed status; never a second copy of the panel.
   - choices: buttons that send a player line (the text of the button) on a trusted click.
   - toast and a stage helper.

   Nothing here renders business data except the pinned bar; the status panel lives in the
   bubble (hr-status). Every node carries classes only; author data-* would be stripped. */
(function (W) {
  'use strict';
  var HR = W.HR;
  if (!HR || !HR.claim || !HR.claim('ui')) return;
  var D = W.document, h = HR.dom.h;
  var ui = HR.ui = {};
  var docks = {};

  /* ---------- dock + drawer ---------- */
  function Dock(opts) {
    var side = opts.side === 'left' ? 'left' : 'right';
    var self = this;
    this.side = side;
    this.panes = [];
    this.open = false;
    this.slot = HR.dom.slot(side) || HR.dom.root() || D.body;
    this.el = HR.dom.single('hr-dock-' + side, function () {
      return h('div', { 'class': 'hr-dock hr-dock--' + side, style: '--lt-dock:' + side + ';' });
    });
    this.tab = h('button', { 'class': 'hr-dock__tab', type: 'button', title: opts.label || '', on: { click: function () { self.toggle(); } } }, [h('span', { 'class': 'hr-dock__icon', text: opts.icon || '☰' })]);
    this.drawer = h('div', { 'class': 'hr-drawer' }, [
      this.nav = h('div', { 'class': 'hr-drawer__nav' }),
      this.body = h('div', { 'class': 'hr-drawer__body' }),
      h('button', { 'class': 'hr-drawer__close', type: 'button', text: '×', on: { click: function () { self.close(); } } }),
    ]);
    this.el.appendChild(this.tab);
    this.el.appendChild(this.drawer);
    this.slot.appendChild(this.el);
    this.active = null;
  }
  Dock.prototype.add = function (pane) {
    /* pane: { id, title, render(bodyEl) } — render is called every time the pane is shown. */
    if (!pane || !pane.id || typeof pane.render !== 'function') return this;
    for (var i = 0; i < this.panes.length; i++) if (this.panes[i].id === pane.id) { HR.warn('dock pane ' + pane.id + ' added twice'); return this; }
    this.panes.push(pane);
    this.renderNav();
    return this;
  };
  Dock.prototype.renderNav = function () {
    var self = this;
    HR.dom.empty(this.nav);
    this.nav.classList.toggle('hr-drawer__nav--hidden', this.panes.length < 2);
    for (var i = 0; i < this.panes.length; i++) (function (pane) {
      self.nav.appendChild(h('button', { 'class': 'hr-drawer__navbtn' + (self.active === pane.id ? ' hr-drawer__navbtn--on' : ''), type: 'button', text: HR.t(pane.title || pane.id), on: { click: function () { self.show(pane.id); } } }));
    })(this.panes[i]);
  };
  Dock.prototype.show = function (id) {
    var pane = null, i;
    for (i = 0; i < this.panes.length; i++) if (this.panes[i].id === id) pane = this.panes[i];
    if (!pane) return;
    this.active = id;
    this.renderNav();
    HR.dom.empty(this.body);
    try { pane.render(this.body); } catch (e) { HR.warn('pane ' + id + ' threw', e); }
  };
  Dock.prototype.toggle = function () { if (this.open) this.close(); else this.openDrawer(); };
  Dock.prototype.openDrawer = function () {
    if (!this.panes.length) return;
    this.open = true;
    this.el.classList.add('hr-dock--open');
    this.show(this.active || this.panes[0].id);
    HR.emit('dock:open', this.side);
  };
  Dock.prototype.close = function () { this.open = false; this.el.classList.remove('hr-dock--open'); HR.emit('dock:close', this.side); };

  /* ui.dock({ side, icon, label }) → the dock for that side (created once). */
  ui.dock = function (opts) {
    opts = opts || {};
    var side = opts.side === 'left' ? 'left' : 'right';
    if (!docks[side]) docks[side] = new Dock(opts);
    return docks[side];
  };
  /* Closing drawers while the model writes keeps the reply readable; reopen is the player's. */
  HR.on('message:new', function (p) { if (p && p.role === 'ai') for (var s in docks) if (docks[s].open) docks[s].close(); });
  HR.on('conversation:switch', function () { for (var s in docks) docks[s].close(); });

  /* ---------- settings pane ---------- */
  ui.settingsPane = function () {
    return {
      id: 'settings',
      title: 'Settings',
      render: function (body) {
        var t = HR.theme, c = t.get();
        function row(label, control) { return h('label', { 'class': 'hr-set__row' }, [h('span', { 'class': 'hr-set__label', text: HR.t(label) }), control]); }
        function range(key, min, max, step, fallback) {
          var input = h('input', { 'class': 'hr-set__range', type: 'range', min: String(min), max: String(max), step: String(step), value: String(c[key] == null ? fallback : c[key]) });
          input.addEventListener('input', function () { var o = {}; o[key] = parseFloat(input.value); t.set(o); });
          return input;
        }
        function choice(key, options) {
          var sel = h('select', { 'class': 'hr-set__select' });
          for (var i = 0; i < options.length; i++) sel.appendChild(h('option', { value: options[i][0], text: HR.t(options[i][1]), selected: c[key] === options[i][0] ? 'selected' : null }));
          sel.addEventListener('change', function () { var o = {}; o[key] = sel.value; t.set(o); });
          return sel;
        }
        body.appendChild(h('div', { 'class': 'hr-set' }, [
          row('Text size', range('fontSize', t.limits.fontSize[0], t.limits.fontSize[1], 1, 15)),
          row('Line height', range('lineHeight', t.limits.lineHeight[0], t.limits.lineHeight[1], 0.1, 1.6)),
          row('Motion', choice('motion', [['auto', 'Follow system'], ['reduced', 'Reduced']])),
          row('Density', choice('density', [['comfortable', 'Comfortable'], ['compact', 'Compact']])),
          h('button', { 'class': 'hr-btn hr-set__reset', type: 'button', text: HR.t('Reset all'), on: { click: function () { t.reset(); HR.dom.empty(body); ui.settingsPane().render(body); } } }),
        ]));
      },
    };
  };

  /* ---------- pinned bar in the function bar ---------- */
  ui.pinned = function (keys, labels) {
    keys = (keys || []).slice(0, 3);
    if (!keys.length) return null;
    var slot = HR.dom.slot('statusbar');
    if (!slot) { HR.warn('pinned: the function bar is empty, so [data-slot="statusbar"] does not exist; put a trigger word in mountTrigger'); return null; }
    var host = HR.dom.single('hr-pinned', function () { return h('div', { 'class': 'hr-pinned' }); });
    slot.appendChild(host);
    function draw(parsed) {
      HR.dom.empty(host);
      if (!parsed) return;
      for (var i = 0; i < keys.length; i++) {
        var v = parsed.state[keys[i]];
        if (!v) continue;
        var text = v.type === 'bar' ? (v.value + '/' + v.max) : (v.type === 'num' ? String(v.value) : v.raw);
        if (text.length > 24) text = text.slice(0, 24) + '…';
        host.appendChild(h('span', { 'class': 'hr-pinned__item' }, [h('span', { 'class': 'hr-pinned__k', text: HR.t((labels && labels[keys[i]]) || keys[i]) }), h('span', { 'class': 'hr-pinned__v', text: HR.t(text) })]));
      }
    }
    HR.on('state', draw);
    if (HR.status && HR.status.latest()) draw(HR.status.latest());
    return host;
  };

  /* ---------- choices: a button sends its own text ----------
     `<div class="hr-choices"><button class="hr-choice">Open the door</button>…</div>`
     Written by the model inside the reply or by a display rule. Armed on first tap when the
     container has hr-choices--confirm (shows "tap again to send"), sent on the next. The send
     happens inside the click handler, so no confirmation dialog appears. */
  /* One delegated listener on the document: a bubble's body can be replaced after mount or done
     (the shell swaps in the finished HTML later), so a listener bound to the container would be
     lost; delegation survives every redraw. The send runs inside the click (a real gesture). */
  function onChoiceClick(ev) {
    var btn = ev.target && ev.target.closest ? ev.target.closest('.hr-choice') : null;
    if (!btn) return;
    var box = btn.closest('.hr-choices');
    if (!box || box.classList.contains('hr-choices--old') || btn.classList.contains('hr-choice--spent')) return;
    ev.preventDefault();
    if (HR.busy()) { ui.toast(HR.t('Still writing…')); return; }
    if (box.classList.contains('hr-choices--confirm') && !btn.classList.contains('hr-choice--armed')) {
      var armed = box.querySelectorAll('.hr-choice--armed');
      for (var j = 0; j < armed.length; j++) armed[j].classList.remove('hr-choice--armed');
      btn.classList.add('hr-choice--armed');
      return;
    }
    var text = btn.getAttribute('title') || btn.textContent;
    HR.send(text).then(function (ok) {
      if (!ok) { btn.classList.remove('hr-choice--armed'); return; }
      var all = box.querySelectorAll('.hr-choice');
      for (var k = 0; k < all.length; k++) all[k].classList.add('hr-choice--spent');
      btn.classList.add('hr-choice--picked');
    });
  }
  var choicesBound = false;
  ui.choices = function () {
    if (choicesBound) return ui;
    choicesBound = true;
    D.addEventListener('click', onChoiceClick);
    HR._disposers.push(function () { D.removeEventListener('click', onChoiceClick); choicesBound = false; });
    return ui;
  };
  /* Old choice sets go quiet once a newer AI reply exists. */
  HR.on('message:done', function (p, bubble) {
    if (!p || p.role !== 'ai' || !bubble) return;
    var all = D.body.querySelectorAll('.hr-choices'), i;
    for (i = 0; i < all.length; i++) if (!bubble.contains(all[i])) all[i].classList.add('hr-choices--old');
  });

  /* ---------- toast ---------- */
  var toastTimer = null;
  ui.toast = function (text, ms) {
    var root = HR.dom.root() || D.body;
    var el = HR.dom.single('hr-toast', function () { return h('div', { 'class': 'hr-toast', text: String(text) }); });
    root.appendChild(el);
    if (toastTimer) W.clearTimeout(toastTimer);
    toastTimer = W.setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, ms || 1800);
  };
  HR.on('send:busy', function () { ui.toast(HR.t('Still writing…')); });

  /* ---------- stage ---------- */
  ui.stage = {
    open: function (mode, render) {
      var el = HR.dom.stage();
      if (!el) return null;
      HR.dom.empty(el);
      var box = h('div', { 'class': 'hr-stage hr-stage--' + (mode === 'full' ? 'full' : 'content') });
      el.appendChild(box);
      if (typeof render === 'function') render(box);
      W.sdk.stage.open(mode === 'full' ? 'full' : 'content');
      return box;
    },
    close: function () { W.sdk.stage.close(); HR.emit('stage:closed'); },
    visible: function () { return W.sdk.stage.visible(); },
  };

  HR.log('ui ready');
})(window);
