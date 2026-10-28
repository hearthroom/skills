import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { checkCard, CONTRACT } from '../scripts/check-card.mjs';

async function card(files) {
  const root = await mkdtemp(path.join(tmpdir(), 'card-'));
  for (const [rel, body] of Object.entries(files)) {
    await mkdir(path.dirname(path.join(root, rel)), { recursive: true });
    await writeFile(path.join(root, rel), typeof body === 'string' ? body : JSON.stringify(body));
  }
  return root;
}
const msgs = (f) => f.map((x) => `${x.level}:${x.msg}`);

test('a clean sandbox card with a status rule the definition mentions passes', async () => {
  const dir = await card({
    'definition.md': '# Role\nEnd every reply with a [status] block: hp: a/b, mood: word.',
    'welcome.md': 'Hello.\n[status]\nhp: 10/10\nmood: calm\n[/status]',
    'rules.json': { pageMode: 'sandbox', rules: [{ id: 's', name: 's', find: '/\\[status\\]([\\s\\S]*?)\\[\\/status\\]/g', replace: '<div class="hr-status hr-status--raw">$1</div>', enabled: true }] },
  });
  assert.deepEqual(checkCard(dir).filter((f) => f.level === 'error'), []);
});

test('bad regex, empty match, blank find, oversize replace, bad flags', async () => {
  const dir = await card({
    'rules.json': { pageMode: 'sandbox', rules: [
      { id: 'a', find: '/(/', replace: 'x', enabled: true },
      { id: 'b', find: '/a*/', replace: 'x', enabled: true },
      { id: 'c', find: '  ', replace: 'x', enabled: true },
      { id: 'd', find: 'd', replace: 'y'.repeat(CONTRACT.provider.replaceMaxBytes + 1), enabled: true },
      { id: 'e', find: '/e/v', replace: 'x', enabled: true },
    ] },
  });
  const m = msgs(checkCard(dir));
  assert.ok(m.some((x) => x.startsWith('error:invalid pattern')));
  assert.ok(m.some((x) => x.includes('empty string')));
  assert.ok(m.some((x) => x.includes('find is blank')));
  assert.ok(m.some((x) => x.includes('over 524288')));
  assert.ok(m.some((x) => x.includes('flags "v"')));
});

test('sdk misuse: unknown capability, unknown event, off/once, vars, module syntax, classic page', async () => {
  const dir = await card({
    'rules.json': { pageMode: 'classic', rules: [{ id: 'k', find: '{{k}}', replace: '<script>sdk.on("message:finish", f); sdk.save.put("a", 1); sdk.once("ready", f); sdk.vars.get("x"); import x from "y";</script>', enabled: true }] },
  });
  const m = msgs(checkCard(dir));
  assert.ok(m.some((x) => x.includes('sdk.on("message:finish")')));
  assert.ok(m.some((x) => x.includes('sdk.save.put does not exist')));
  assert.ok(m.some((x) => x.includes('sdk.off / sdk.once')));
  assert.ok(m.some((x) => x.includes('sdk.vars')));
  assert.ok(m.some((x) => x.includes('ES module syntax')));
  assert.ok(m.some((x) => x.includes('pageMode is not "sandbox"')));
});

test('sanitizer traps: author data-*, on* inside svg, CJK angle tags, hc-* components', async () => {
  const dir = await card({
    'rules.json': { pageMode: 'sandbox', rules: [{ id: 'h', find: '{{h}}', replace: '<div data-x="1"><svg onclick="a()"></svg><状态>x</状态><hc-btn>b</hc-btn></div>', enabled: true }] },
  });
  const m = msgs(checkCard(dir));
  assert.ok(m.some((x) => x.includes('data-x')));
  assert.ok(m.some((x) => x.includes('inside <svg>')));
  assert.ok(m.some((x) => x.includes('<状态>')));
  assert.ok(m.some((x) => x.includes('hc-btn')));
});

test('render rules ≠ generation rules: a consumed marker nobody tells the model to write is reported, even when the word appears in prose', async () => {
  const dir = await card({
    'definition.md': '# Role\nSpeak softly. Describe the scene before each line; a scene is a place and a time.',
    'welcome.md': 'Hi.',
    'rules.json': { pageMode: 'sandbox', rules: [{ id: 's', find: '/\\[scene\\]([\\s\\S]*?)\\[\\/scene\\]/g', replace: '<b>$1</b>', enabled: true }] },
  });
  const m = msgs(checkCard(dir));
  assert.ok(m.some((x) => x.includes('consumes the marker "scene"') && x.includes('never appear')));
});

test('a constant Lorebook entry counts as telling the model; a disabled one does not', async () => {
  const base = {
    'definition.md': '# Role',
    'welcome.md': 'Hi.',
    'rules.json': { pageMode: 'sandbox', rules: [{ id: 's', find: '[scene]', replace: '<b>scene</b>', enabled: true }] },
  };
  const ok = await card({ ...base, 'lorebook.json': { entries: [{ name: 'format', content: 'Write [scene] each turn', constant: true }] } });
  assert.equal(msgs(checkCard(ok)).filter((x) => x.includes('consumes the marker')).length, 0);
  const off = await card({ ...base, 'lorebook.json': { entries: [{ name: 'format', content: 'Write [scene] each turn', constant: true, disabled: true }] } });
  assert.equal(msgs(checkCard(off)).filter((x) => x.includes('consumes the marker')).length, 1);
});

test('literal asset paths must exist; concatenated paths are flagged', async () => {
  const dir = await card({
    'assets/a.webp': 'x',
    'rules.json': { pageMode: 'sandbox', rules: [{ id: 'i', find: '{{i}}', replace: '<img src="assets/a.webp"><img src="assets/missing.webp"><script>var p = "assets/" + id + ".webp"</script>', enabled: true }] },
  });
  const m = msgs(checkCard(dir));
  assert.ok(m.some((x) => x.includes('assets/missing.webp') && x.includes('does not exist')));
  assert.ok(!m.some((x) => x.includes('assets/a.webp') && x.includes('does not exist')));
  assert.ok(m.some((x) => x.includes('concatenation')));
});

test('README declarations and the replay health report', async () => {
  const { readDeclarations, replayHealth, repliesFrom } = await import('../scripts/check-card.mjs');
  assert.deepEqual(readDeclarations('# notes\nuiRole: core\nstatusOverheadThreshold: 25%\n'), { uiRole: 'core', threshold: 0.25 });
  assert.deepEqual(readDeclarations('nothing'), { uiRole: null, threshold: null });
  const replies = [
    'A long reply about the harbour and the keeper, with weather and a decision.\n\n[status]\nhp: 70/100\nmood: wary\n[/status]',
    'Another reply, shorter.\n[status]\nhp: 65/100\nmood：calm\n',
    'No block here at all, just prose that goes on for a while to make the ratio small.',
  ];
  const h = replayHealth(replies, { threshold: 0.15, requiredKeys: ['hp', 'mood', 'time'] });
  assert.equal(h.withBlock, 2);
  assert.equal(h.missingClose, 1);
  assert.equal(h.fullWidthLines, 1);
  assert.ok(h.keys.hp.count === 2 && h.keys.mood.count === 2);
  assert.deepEqual(h.requiredKeysBelow90, ['hp', 'mood', 'time']);
  assert.ok(h.overhead > 0 && h.overhead < 1);
  // a kit card's rules consume [status]: the block must still be tallied per key, and its characters counted once
  const k = replayHealth(replies, { threshold: 0.15, requiredKeys: ['hp', 'mood'], markers: [{ name: 'status' }, { name: 'choices' }] });
  assert.equal(k.withBlock, 2);
  assert.equal(k.missingClose, 1);
  assert.ok(k.keys.hp.count === 2 && k.keys.mood.count === 2);
  assert.ok(Math.abs(k.overhead - h.overhead) < 0.02, `overhead ${k.overhead} vs ${h.overhead}`);
  const played = repliesFrom('{"conversationId":"c","history":{"chats":[{"chatRole":"AI","chatMessage":"Second.\\n[status]\\nhp: 2\\n[/status]"},{"chatRole":"AI","chatMessage":"recap","isSummary":true},{"chatRole":"USER","chatMessage":"go on"},{"chatRole":"AI","chatMessage":"Opening.","isFirst":true}]}}');
  assert.deepEqual(played.map((r) => r.split('\n')[0]), ['Opening.', 'Second.']);
  const fromJsonl = repliesFrom('{"role":"user","content":"hi"}\n{"role":"ai","content":"[status]\\nhp: 1\\n[/status]"}\n');
  assert.deepEqual(fromJsonl, ['[status]\nhp: 1\n[/status]']);
  const dir = await card({ 'README.md': 'uiRole: core\n', 'rules.json': { pageMode: 'sandbox', rules: [] } });
  assert.ok(checkCard(dir).some((f) => f.msg.includes('statusOverheadThreshold')));
});

test('module syntax is fine in a sandbox <script type="module">, not in a classic one', async () => {
  const dir = await card({
    'rules.json': { pageMode: 'sandbox', rules: [
      { id: 'm', name: 'm', find: '[[m]]', replace: '<script type="module">import { go } from "https://assets.harperharbor.com/u/x/lib.mjs"; go()</script>', enabled: true },
      { id: 'c', name: 'c', find: '[[c]]', replace: '<script>import x from "y"</script>', enabled: true },
    ] },
  });
  assert.equal(msgs(checkCard(dir)).filter((x) => x.includes('ES module syntax')).length, 1);
});

test('sharedState: the declaration rules the provider enforces on push (one-option poll, maxStep 1001, …)', async () => {
  const base = { 'definition.md': '# Role\nStay in character.', 'welcome.md': 'Hello.' };
  const ok = await card({ ...base, 'rules.json': { pageMode: 'sandbox', rules: [], sharedState: { polls: { p1: { options: ['a', 'b'], share: true } }, counters: { boss: { goal: 1000, maxStep: 10, perMember: 100, period: 'week' } } } } });
  assert.deepEqual(checkCard(ok).filter((f) => f.level === 'error'), []);
  const bad = await card({ ...base, 'rules.json': { pageMode: 'sandbox', rules: [], sharedState: {
    polls: { p1: { options: ['a'] }, 'a b': { options: ['x', 'x'] }, boss: { options: ['a', 'b'] } },
    counters: { boss: { maxStep: 1001, perMember: 0, goal: -1, period: 'month' } },
  } } });
  const m = msgs(checkCard(bad));
  for (const part of ['poll "p1" needs 2-12 options', 'poll key "a b"', 'option "x" must be unique', 'counter "boss" has the same key as a poll', 'counter "boss" maxStep must be 1-1000', 'counter "boss" perMember must be', 'counter "boss" goal must be', 'counter "boss" period must be none, day or week']) {
    assert.ok(m.some((x) => x.startsWith('error:') && x.includes(part)), `missing "${part}" in ${m.join(' | ')}`);
  }
  // an unknown field is a shape error on its own, as the provider decodes with unknown fields disallowed
  const shape = await card({ ...base, 'rules.json': { pageMode: 'sandbox', rules: [], sharedState: { polls: {}, extra: true } } });
  assert.ok(msgs(checkCard(shape)).some((x) => x.startsWith('error:') && x.includes('sharedState must be')));
});

test('reading sdk.share properties is not a missing capability; a misspelled one still is', async () => {
  const base = { 'definition.md': '# Role\nStay in character.', 'welcome.md': 'Hello.' };
  const rule = (script) => ({ pageMode: 'sandbox', rules: [{ id: 's', name: 's', find: '/^$x/', replace: `<script>${script}</script>`, enabled: true }] });
  const ok = await card({ ...base, 'rules.json': rule('if(sdk.share.enabled&&sdk.share.context&&sdk.share.audience&&sdk.share.poll){}') });
  assert.deepEqual(checkCard(ok).filter((f) => f.level === 'error'), []);
  const typo = await card({ ...base, 'rules.json': rule('if(sdk.share.contxt){}') });
  assert.ok(msgs(checkCard(typo)).some((x) => x.startsWith('error:') && x.includes('sdk.share.contxt does not exist')));
});

const scriptContexts = JSON.parse(await readFile(new URL('./fixtures/script-contexts.json', import.meta.url), 'utf8'));
for (const tc of scriptContexts) {
  test(`SDK script context: ${tc.name}`, async () => {
    const dir = await card({ 'rules.json': { pageMode: tc.pageMode ?? 'sandbox', rules: [{ id: 'probe', find: '{{probe}}', replace: tc.html }] } });
    const errors = checkCard(dir).filter(f => f.level === 'error');
    assert.equal(errors.length > 0, tc.error, JSON.stringify(errors));
    if (tc.error) assert.ok(errors.some(f => f.msg.includes(tc.want)), JSON.stringify(errors));
  });
}

test('card checker accepts512KiB but rejects one additional byte', async () => {
 for (const n of [256 * 1024 + 1, 512 * 1024, 512 * 1024 + 1]) {
  const dir = await card({ 'rules.json': { pageMode: 'sandbox', rules: [{ id: 'boundary', find: 'x', replace: '界'.repeat(Math.floor(n / 3)) + 'x'.repeat(n % 3), enabled: true }] } });
  assert.equal(msgs(checkCard(dir)).some(m => m.includes('over 524288')), n > 512 * 1024);
 }
});


test('large replacement advisory uses UTF-8 bytes and never blocks allowed sizes', async () => {
 for (const n of [136325, 262144, 262145, 300 * 1024, 524288, 524289]) {
  const dir = await card({ 'rules.json': { pageMode: 'sandbox', rules: [{ id: 'large', find: 'marker', replace: '界'.repeat(Math.floor(n/3)) + 'x'.repeat(n%3), enabled: false }] } });
  const findings = checkCard(dir);
  assert.equal(findings.some(f => f.level === 'warning' && f.msg.includes('play')), n > 262144 && n <= 524288, String(n));
  assert.equal(findings.some(f => f.level === 'error'), n > 524288, String(n));
 }
});
