/* hr-page: a full-page reading mode on top of the chat list (gated; off by default).

   The message list stays underneath as the transport (events, saves, streaming all come from
   it); this module draws one page per AI reply in a fixed overlay: the reply's rendered body,
   the choices at the end once the reader has reached the bottom, a page strip (previous /
   next), a "writing…" indicator while the model streams, and a switch back to the plain chat.
   Nothing here asks the model for anything; it re-reads what the bubbles already hold.

   Gate (P3/P4, see sandbox-kit.md): enable only for a card whose README declares the reason;
   an assist card must still read well with the overlay off; the overlay must not lose text
   the player has not read, must show the choices only at the end of the page, and must hand
   back to the chat list with one tap. */
(function (W) {
  'use strict';
  var HR = W.HR;
  if (!HR || !HR.claim || !HR.claim('page')) return;
  var D = W.document, h = HR.dom.h;
  var page = HR.page = {};
  var state = { on: false, index: -1, pages: [], el: null, body: null, strip: null, writing: null, bubbles: [] };

  function build() {
    var root = HR.dom.root() || D.body;
    state.el = HR.dom.single('hr-page', function () { return h('div', { 'class': 'hr-page' }); });
    state.body = h('div', { 'class': 'hr-page__body' });
    state.strip = h('div', { 'class': 'hr-page__strip' }, [
      h('button', { 'class': 'hr-btn hr-page__prev', type: 'button', text: '‹', on: { click: function () { page.go(state.index - 1); } } }),
      h('span', { 'class': 'hr-page__num' }),
      h('button', { 'class': 'hr-btn hr-page__next', type: 'button', text: '›', on: { click: function () { page.go(state.index + 1); } } }),
      h('button', { 'class': 'hr-btn hr-page__chat', type: 'button', text: HR.t('Chat'), on: { click: function () { page.off(); } } }),
    ]);
    state.writing = h('div', { 'class': 'hr-page__writing', text: HR.t('Writing…') });
    state.el.appendChild(state.body);
    state.el.appendChild(state.writing);
    state.el.appendChild(state.strip);
    root.appendChild(state.el);
    /* reading first: the choices in this page unlock when the reader reaches the bottom */
    state.body.addEventListener('scroll', function () {
      var near = state.body.scrollTop + state.body.clientHeight >= state.body.scrollHeight - 24;
      state.el.classList.toggle('hr-page--end', near);
    });
  }
  /* A page is a clone of a bubble's body after the kit drew into it; the clone is re-hydrated
     (clones lose nothing the DOM holds, but a clone taken before hydration would). */
  function pageFrom(bubble) {
    var body = bubble.querySelector('[data-chat="message-body"]');
    if (!body) return null;
    if (HR.status && HR.status.hydrate) HR.status.hydrate(bubble);
    if (HR.ui && HR.ui.hydrateChoices) HR.ui.hydrateChoices(bubble);
    var clone = body.cloneNode(true);
    var old = clone.querySelectorAll('.hr-choices');
    for (var i = 0; i < old.length; i++) old[i].classList.remove('hr-choices--old');
    return clone;
  }
  function collect() {
    var list = D.body.querySelectorAll('[data-chat="message"][data-from="ai"]');
    state.bubbles = Array.prototype.slice.call(list);
  }
  /* The bubble's body can change after done (the shell swaps in the finished HTML later, the
     kit hydrates it): keep the shown page equal to the bubble for a while. */
  var observed = null, observer = null, observerTimer = null;
  function follow(bubble) {
    if (!bubble || typeof W.MutationObserver !== 'function' || observed === bubble) return;
    if (observer) observer.disconnect();
    observed = bubble;
    observer = new W.MutationObserver(function () { if (state.on && state.bubbles[state.index] === bubble) render(true); });
    observer.observe(bubble, { childList: true, subtree: true, characterData: true });
    if (observerTimer) W.clearTimeout(observerTimer);
    observerTimer = W.setTimeout(function () { if (observer) observer.disconnect(); observer = null; observed = null; }, 10000);
  }
  var rendering = false;
  function render(fromObserver) {
    if (!state.on || !state.el || rendering) return;
    rendering = true;
    try { renderNow(fromObserver); } finally { rendering = false; }
  }
  function renderNow(fromObserver) {
    collect();
    if (state.index < 0 || state.index >= state.bubbles.length) state.index = state.bubbles.length - 1;
    HR.dom.empty(state.body);
    var b = state.bubbles[state.index];
    var keepScroll = fromObserver ? state.body.scrollTop : 0;
    var content = b ? pageFrom(b) : null;
    if (content) state.body.appendChild(content);
    if (b) follow(b);
    state.strip.querySelector('.hr-page__num').textContent = (state.index + 1) + ' / ' + state.bubbles.length;
    state.strip.querySelector('.hr-page__prev').disabled = state.index <= 0;
    state.strip.querySelector('.hr-page__next').disabled = state.index >= state.bubbles.length - 1;
    state.body.scrollTop = keepScroll;
    state.el.classList.toggle('hr-page--end', state.body.scrollHeight <= state.body.clientHeight + 24);
    state.el.classList.toggle('hr-page--old', state.index < state.bubbles.length - 1);
  }
  page.on = function () {
    if (!state.el) build();
    state.on = true;
    state.index = -1;
    state.el.classList.add('hr-page--on');
    HR.store.set('page', true);
    render();
  };
  page.off = function () { state.on = false; if (state.el) state.el.classList.remove('hr-page--on'); HR.store.set('page', false); };
  page.go = function (i) { if (i < 0 || i >= state.bubbles.length) return; state.index = i; render(); };
  page.visible = function () { return state.on; };

  /* the latest reply: follow it while it streams, settle on done */
  HR.on('message:new', function (p) { if (state.on && p && p.role === 'ai') { state.el.classList.add('hr-page--writing'); state.index = -1; render(); } });
  HR.on('message:stream', function (p) { if (state.on && p && p.role === 'ai' && state.index === state.bubbles.length - 1) render(); });
  HR.on('message:done', function (p) { if (state.on && p && p.role === 'ai') { state.el.classList.remove('hr-page--writing'); state.index = -1; render(); } });
  HR.on('conversation:switch', function () { if (state.on) { state.index = -1; W.setTimeout(render, 300); } });
  /* a choice tapped inside the page: the delegated handler in hr-ui already handles it (the
     clone keeps the classes); in draft mode the composer is below the overlay, so show it */
  HR.on('settled', function () { if (HR.store.get('page', false) && HR.page.auto) page.on(); });
  HR.log('page ready (off until HR.page.on())');
})(window);
