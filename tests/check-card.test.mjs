import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile } from 'node:fs/promises';
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
  assert.ok(m.some((x) => x.includes('over 131072')));
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
