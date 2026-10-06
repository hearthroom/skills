/* hr-theme: the kit's design tokens at run time.

   The preset (both dark and light sides) is compiled into CSS by build.mjs and shipped in the
   style rule as `--hr-*` tokens on [data-chat="root"][data-theme=…]. This module owns what the
   player can change on top of that (text size, line height, motion) and keeps it in the store.
   Which side is active is the platform's decision: read `data-theme`, follow `theme:change`,
   never write it. A card in MMD format is locked to dark by the platform and never sees
   `theme:change`; a card in tavern format follows the player's setting. */
(function (W) {
  'use strict';
  var HR = W.HR;
  if (!HR || !HR.claim || !HR.claim('theme')) return;
  var D = W.document;

  var SPEC = { fontSize: 'number', lineHeight: 'number', motion: ['auto', 'reduced'], density: ['comfortable', 'compact'] };
  var LIMITS = { fontSize: [12, 22], lineHeight: [1.3, 2.2] };
  var defaults = { fontSize: null, lineHeight: null, motion: 'auto', density: 'comfortable' };
  var prefs = HR.store.pick(HR.store.get('prefs', {}), SPEC);

  function inRange(key, v) { var r = LIMITS[key]; return !r || (v >= r[0] && v <= r[1]); }
  function current() {
    var out = {}, k;
    for (k in defaults) if (Object.prototype.hasOwnProperty.call(defaults, k)) out[k] = Object.prototype.hasOwnProperty.call(prefs, k) ? prefs[k] : defaults[k];
    return out;
  }
  function apply() {
    var root = HR.dom.root();
    if (!root) return;
    var c = current();
    if (c.fontSize != null && inRange('fontSize', c.fontSize)) root.style.setProperty('--hr-font-size', c.fontSize + 'px'); else root.style.removeProperty('--hr-font-size');
    if (c.lineHeight != null && inRange('lineHeight', c.lineHeight)) root.style.setProperty('--hr-line-height', String(c.lineHeight)); else root.style.removeProperty('--hr-line-height');
    root.classList.toggle('hr-motion-reduced', c.motion === 'reduced');
    root.classList.toggle('hr-density-compact', c.density === 'compact');
    HR.emit('theme', { side: HR.dom.theme(), prefs: c });
  }

  var theme = HR.theme = {
    side: function () { return HR.dom.theme(); },
    get: current,
    /* Only non-default values are stored; a value equal to the default deletes the override. */
    set: function (patch) {
      var picked = HR.store.pick(patch || {}, SPEC), k;
      for (k in picked) if (Object.prototype.hasOwnProperty.call(picked, k)) {
        if (picked[k] === defaults[k] || (typeof picked[k] === 'number' && !inRange(k, picked[k]))) delete prefs[k];
        else prefs[k] = picked[k];
      }
      HR.store.set('prefs', prefs);
      apply();
    },
    reset: function () { prefs = {}; HR.store.set('prefs', prefs); apply(); },
    limits: LIMITS,
    defaults: defaults,
  };

  HR.on('theme:change', apply);
  HR.settled(apply);
  /* The root exists before scripts only on the page the shell built; apply once now as well. */
  apply();
  HR.log('theme ready');
})(window);
