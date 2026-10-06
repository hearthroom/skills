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

test('the example config builds four rules, each well under 128 KiB, pageMode sandbox, kit rules first', () => {
  const built = buildRules(example, ROOT);
  assert.deepEqual(built.rules.map((r) => r.id), ['hr-style', 'hr-kit', 'hr-status', 'hr-choices']);
  for (const r of built.rules) assert.ok(bytes(r.replace) < REPLACE_MAX_BYTES / 2, `${r.id} is ${bytes(r.replace)} bytes`);
  assert.deepEqual(built.problems, []);
  const merged = mergeInto({ rules: [{ id: 'mine', find: 'x', replace: 'y', enabled: true }, { id: 'hr-kit', find: 'old', replace: 'old' }], mountTrigger: '' }, built);
  assert.deepEqual(merged.rules.map((r) => r.id), ['hr-style', 'hr-kit', 'hr-status', 'hr-choices', 'mine']);
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

test('choices mode follows uiRole unless set; the choices rule is emitted', async () => {
  const { choicesModeOf, emitContract } = await import('../assets/sandbox-kit/build.mjs');
  assert.equal(choicesModeOf({ uiRole: 'assist', modes: { choices: true } }), 'draft');
  assert.equal(choicesModeOf({ uiRole: 'core', modes: { choices: true } }), 'send');
  assert.equal(choicesModeOf({ modes: { choices: 'send' } }), 'send');
  assert.equal(choicesModeOf({ modes: { choices: false } }), null);
  const built = buildRules(example, ROOT);
  assert.ok(built.rules.some((r) => r.id === 'hr-choices'));
  const c = emitContract(example);
  assert.match(c.text, /^End every reply with one \[status\] block/);
  assert.match(c.text, /hp: <current>\/<max>/);
  assert.match(c.text, /drop them when they stop applying: danger/);
  assert.match(c.text, /\[choices\]/);
  assert.ok(!c.keys.includes('danger') && c.volatileKeys.includes('danger'));
  assert.match(c.text, /Example of an ordinary turn/);
});

test('page and intro are gated; a palette becomes a preset that passes the contrast checks', async () => {
  const { presetFromPalette, bootScript, OPTIONAL_MODULES } = await import('../assets/sandbox-kit/build.mjs');
  const gated = buildRules({ ...example, modes: { ...example.modes, page: 'on', intro: { line: 'x' } } }, ROOT);
  assert.ok(gated.problems.some((p) => p.includes('modes.page is gated')));
  assert.ok(gated.problems.some((p) => p.includes('modes.intro is gated')));
  const ok = buildRules({ ...example, modes: { ...example.modes, page: 'on', intro: { line: 'x' } }, gates: { page: 'reads as a novel', intro: 'names the bet' } }, ROOT);
  assert.deepEqual(ok.problems, []);
  assert.match(ok.rules[1].replace, /HR\.claim\('page'\)/);
  assert.match(bootScript({ modes: { intro: { line: 'x' } } }), /HR\.ui\.intro\(\{"line":"x"\}\)/);
  assert.equal(OPTIONAL_MODULES.page, 'hr-page.js');
  const preset = presetFromPalette({ dark: { bg: '#101214', surface: '#1a1d21', text: '#e9ecef', accent: '#8ab4f8' }, light: { bg: '#fafafa', surface: '#ffffff', text: '#1f2328', accent: '#1a5fb4' } }, 'ink');
  assert.deepEqual(contrastReport(preset).filter((c) => !c.ok), []);
  assert.throws(() => presetFromPalette({ dark: { bg: '#000' }, light: {} }));
});
