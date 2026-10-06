import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const status = require('../assets/sandbox-kit/kit/hr-status.js');

test('a block parses into typed fields in order, and is removed from the text', () => {
  const r = status.parse('Rain again.\n[status]\nhp: 72/100\nmood: wary\nallies: Mara=61, Tove=25\ntags: poisoned, tired\n[/status]\nShe waits.');
  assert.equal(r.cleaned, 'Rain again.\n\nShe waits.');
  assert.deepEqual(r.order, ['hp', 'mood', 'allies', 'tags']);
  assert.equal(r.state.hp.type, 'bar'); assert.equal(r.state.hp.value, 72); assert.equal(r.state.hp.max, 100);
  assert.equal(r.state.mood.type, 'text');
  assert.equal(r.state.allies.type, 'entities'); assert.equal(r.state.allies.value[1].name, 'Tove');
  assert.deepEqual(r.state.tags.value, ['poisoned', 'tired']);
  assert.equal(r.skipped.length, 0);
});

test('the inline form key::value;;key::value parses the same, so $name rules and the kit share one block', () => {
  const r = status.parse('[status]hp::85;;mood::shy[/status]');
  assert.deepEqual(r.order, ['hp', 'mood']);
  assert.equal(r.state.hp.type, 'num'); assert.equal(r.state.hp.value, 85);
  assert.equal(r.state.mood.value, 'shy');
});

test('value ladder: number, percent, a/b, level, kvlist, stats, entities, tags, path, text', () => {
  const v = status.value;
  assert.equal(v('380').type, 'num');
  assert.deepEqual([v('72%').type, v('72%').max], ['bar', 100]);
  assert.equal(v('84/100').type, 'bar');
  assert.equal(v('Adept|120/300').type, 'level'); assert.equal(v('Adept|120/300').value.name, 'Adept');
  assert.equal(v('head:hood|body:cloak:+2 armour').type, 'kvlist'); assert.equal(v('head:hood|body:cloak:+2 armour').value[1].note, '+2 armour');
  assert.equal(v('atk:12 def:8 agi:15').type, 'stats');
  assert.equal(v('Mara=61, Tove=25').type, 'entities');
  assert.equal(v('poisoned, tired').type, 'tags');
  assert.deepEqual(v('Inner city > East market > Apothecary').value, ['Inner city', 'East market', 'Apothecary']);
  assert.equal(v('north gate/east street/west market').type, 'text', 'three segments are not a bar');
  assert.equal(v('2026-08-26').type, 'text', 'a date is not a path');
  assert.equal(v('find the key=open the door').type, 'text', 'rhs not a number: not entities');
});

test('drift tolerance: full-width punctuation, markdown prefixes, bold keys, missing close marker, duplicate keys', () => {
  const r = status.parse('[status]\n- **hp**：７２／１００\n金币：３８０\n好感：熙宁＝61，阿澈=25\nhp: 50/100\nnonsense line\n');
  assert.equal(r.missingClose, true);
  assert.equal(r.state.hp.value, 50, 'later duplicate wins');
  assert.deepEqual(r.order, ['hp', '金币', '好感'], 'order keeps the first position');
  assert.equal(r.state['金币'].value, 380);
  assert.equal(r.state['好感'].type, 'entities');
  assert.equal(r.skipped.length, 1);
});

test('no block → null; angle and full-width brackets are accepted for imported cards', () => {
  assert.equal(status.parse('plain reply'), null);
  assert.deepEqual(status.parse('<status>\nhp: 1\n</status>').order, ['hp']);
  assert.deepEqual(status.parse('【status】hp: 1【/status】').order, ['hp']);
});

test('the display rule for the block is a slash regex that cannot match the empty string', () => {
  const rule = status.rule('status');
  const m = /^\/(.+)\/g$/.exec(rule.find);
  assert.ok(m);
  const re = new RegExp(m[1], 'g');
  assert.equal(re.test(''), false);
  assert.equal('x [status]hp: 1[/status] y'.replace(re, rule.replace), 'x <div class="hr-status hr-status--raw">hp: 1</div> y');
});

test('render follows the schema: sections, labels, forced types, hidden fields; unknown keys appended unless strict', () => {
  const parsed = status.parse('[status]\nhp: 72/100\nsecret: 3\nmood: wary\nextra: 5\n[/status]');
  const schema = { title: 'Status', fields: [{ section: 'Body', key: 'hp', label: 'HP', type: 'bar', tone: 'hp' }, { key: 'secret', hidden: true }, { key: 'mood', label: 'Mood' }] };
  const html = status.render(parsed, schema);
  assert.match(html, /hr-title">Status</);
  assert.match(html, /hr-section__t">Body</);
  assert.match(html, /hr-tone--hp/);
  assert.match(html, /width:72\.0%/);
  assert.doesNotMatch(html, /secret/);
  assert.match(html, /extra/);
  assert.doesNotMatch(status.render(parsed, { ...schema, strict: true }), /extra/);
  assert.doesNotMatch(html, /data-|onclick/, 'classes only: author data-* is stripped by the sanitizer');
});

test('the display rule tolerates a missing closer, and the choices block parses to options', () => {
  const rule = status.rule('status');
  const re = new RegExp(/^\/(.+)\/g$/.exec(rule.find)[1], 'g');
  assert.equal('x [status]hp: 1'.replace(re, rule.replace), 'x <div class="hr-status hr-status--raw">hp: 1</div>');
  assert.equal('[status]hp: 1[/status] tail'.replace(re, rule.replace), '<div class="hr-status hr-status--raw">hp: 1</div> tail');
  assert.equal(re.test(''), false);
  assert.deepEqual(status.parseChoices('- Ask about the keeper\n2. Say nothing\n\n③ Light the lamp'), ['Ask about the keeper', 'Say nothing', 'Light the lamp']);
  const c = status.choicesRule('choices', 'draft');
  assert.match(c.replace, /hr-choices--draft hr-choices--raw/);
  assert.match(status.choicesRule('choices', 'send').replace, /hr-choices--send/);
});

test('a status block without a closer stops before a following [choices] block, and vice versa', () => {
  const sr = status.rule('status'), cr = status.choicesRule('choices', 'draft');
  const sre = new RegExp(/^\/(.+)\/g$/.exec(sr.find)[1], 'g'), cre = new RegExp(/^\/(.+)\/g$/.exec(cr.find)[1], 'g');
  const text = 'Prose.\n[status]\nhp: 1\n[choices]\n- Go\n- Stay\n[/choices]';
  const out = text.replace(sre, sr.replace).replace(cre, cr.replace);
  assert.match(out, /hr-status--raw">\nhp: 1\n<\/div><div class="hr-choices hr-choices--draft hr-choices--raw">\n- Go\n- Stay\n<\/div>/);
  const text2 = '[choices]\n- Go\n[status]\nhp: 2\n[/status]';
  const out2 = text2.replace(sre, sr.replace).replace(cre, cr.replace);
  assert.match(out2, /hr-choices--raw">\n- Go\n<\/div><div class="hr-status hr-status--raw">\nhp: 2\n<\/div>/);
});
