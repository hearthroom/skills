import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildRules, mergeInto, contrast, contrastReport, loadPreset, slim, compileCss, bytes, REPLACE_MAX_BYTES } from '../assets/sandbox-kit/build.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../assets/sandbox-kit');
const example = JSON.parse(readFileSync(path.join(ROOT, 'kit.config.example.json'), 'utf8'));

test('every shipped preset passes the contrast checks on both sides', () => {
  for (const name of ['quiet-reading', 'dense-status', 'expressive']) {
    const report = contrastReport(loadPreset(name));
    const bad = report.filter((c) => !c.ok);
    assert.deepEqual(bad, [], `${name}: ${bad.map((c) => `${c.side} ${c.fg}/${c.bg}=${c.ratio}`).join(', ')}`);
  }
});

test('contrast ratio matches the WCAG reference values', () => {
  assert.equal(Math.round(contrast('#000', '#fff')), 21);
  assert.equal(contrast('#777777', '#ffffff').toFixed(2), '4.48');
  assert.equal(contrast('not a colour', '#fff'), null);
});

test('the example config builds three rules, each well under 128 KiB, pageMode sandbox, kit rules first', () => {
  const built = buildRules(example, ROOT);
  assert.deepEqual(built.rules.map((r) => r.id), ['hr-style', 'hr-kit', 'hr-status']);
  for (const r of built.rules) assert.ok(bytes(r.replace) < REPLACE_MAX_BYTES / 2, `${r.id} is ${bytes(r.replace)} bytes`);
  assert.deepEqual(built.problems, []);
  const merged = mergeInto({ rules: [{ id: 'mine', find: 'x', replace: 'y', enabled: true }, { id: 'hr-kit', find: 'old', replace: 'old' }], mountTrigger: '' }, built);
  assert.deepEqual(merged.rules.map((r) => r.id), ['hr-style', 'hr-kit', 'hr-status', 'mine']);
  assert.equal(merged.pageMode, 'sandbox');
  assert.equal(merged.mountTrigger, '');
});

test('pinned fields add a function-bar trigger and a rule that hides it', () => {
  const built = buildRules({ ...example, modes: { ...example.modes, pinned: ['hp', 'stamina'] } }, ROOT);
  assert.ok(built.rules.some((r) => r.id === 'hr-pinned'));
  const merged = mergeInto({ rules: [], mountTrigger: '【menu】' }, built);
  assert.equal(merged.mountTrigger, '【menu】 [[hr-pinned]]');
  assert.match(built.rules.find((r) => r.id === 'hr-kit').replace, /HR\.ui\.pinned\(\["hp","stamina"\]/);
});

test('the compiled CSS defines --hr-* and --chat-* per theme on the root with specificity (0,2,0)', () => {
  const css = compileCss(loadPreset('quiet-reading'));
  assert.match(css, /\[data-chat="root"\]\[data-theme="dark"\]\{--hr-bg:#16181c/);
  assert.match(css, /--chat-bubble-ai-bg:#1f2228/);
  assert.match(css, /\[data-theme="light"\]/);
  assert.doesNotMatch(css, /!important/);
});

test('slim keeps string literals that contain comment-like characters', () => {
  const src = "var a = '/*not a comment*/';\n  // drop me\n/* drop me too */\nvar b = 1; /* trailing */\n";
  assert.equal(slim(src), "var a = '/*not a comment*/';\nvar b = 1;");
});

test('the kit modules parse as JavaScript after slimming and expose window.HR', async () => {
  const built = buildRules(example, ROOT);
  const js = /<script>\n([\s\S]*)\n<\/script>/.exec(built.rules[1].replace)[1];
  assert.doesNotThrow(() => new Function(js));
  assert.match(js, /W\.HR = HR/);
  assert.match(js, /HR\.status\.auto\(\)/);
});
