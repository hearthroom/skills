import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { validateRepo } from '../scripts/validate-skills.mjs';

async function repo(files) {
  const root = await mkdtemp(path.join(tmpdir(), 'skills-'));
  for (const [rel, body] of Object.entries(files)) {
    await mkdir(path.dirname(path.join(root, rel)), { recursive: true });
    await writeFile(path.join(root, rel), body);
  }
  return root;
}

const manifest = JSON.stringify({ skills: { 'hearthroom-a': { batch: 'A' } }, references: { 'x.md': { batch: 'A' }, 'platform-facts.md': { batch: 0 } } });
const good = `---\nname: hearthroom-a\ndescription: Use when a card needs a.\n---\n\n# A\n\n## Required references\n\nRead \`../../references/x.md\`.\n`;

test('a complete repo passes', async () => {
  const root = await repo({ 'scripts/manifest.json': manifest, 'skills/hearthroom-a/SKILL.md': good, 'references/x.md': '# x\n', 'references/platform-facts.md': '# facts\n' });
  assert.deepEqual(await validateRepo(root), []);
});

test('frontmatter, name and description are required', async () => {
  const root = await repo({ 'scripts/manifest.json': manifest, 'skills/hearthroom-a/SKILL.md': '# no frontmatter\n', 'references/x.md': '', 'references/platform-facts.md': '' });
  const findings = await validateRepo(root);
  assert.ok(findings.some(f => f.includes('frontmatter')), findings.join('\n'));
});

test('a description with a colon-space is rejected', async () => {
  const root = await repo({ 'scripts/manifest.json': manifest, 'skills/hearthroom-a/SKILL.md': good.replace('needs a.', 'needs: a.'), 'references/x.md': '', 'references/platform-facts.md': '' });
  const findings = await validateRepo(root);
  assert.ok(findings.some(f => f.includes('YAML')), findings.join('\n'));
});

test('a cited reference must exist and the name must match the folder', async () => {
  const root = await repo({ 'scripts/manifest.json': manifest, 'skills/hearthroom-a/SKILL.md': good.replace('x.md', 'missing.md').replace('name: hearthroom-a', 'name: hearthroom-b'), 'references/x.md': '', 'references/platform-facts.md': '' });
  const findings = await validateRepo(root);
  assert.ok(findings.some(f => f.includes('missing.md')), findings.join('\n'));
  assert.ok(findings.some(f => f.includes('hearthroom-b')), findings.join('\n'));
});

test('forbidden tokens from the source platform are reported', async () => {
  const root = await repo({ 'scripts/manifest.json': manifest, 'skills/hearthroom-a/SKILL.md': good + '\nCall render_preview through MCP on LunaTalk.\n', 'references/x.md': 'Theme V3 packet stack', 'references/platform-facts.md': '' });
  const findings = await validateRepo(root);
  for (const token of ['render_preview', 'MCP', 'LunaTalk', 'Theme V3', 'packet stack']) {
    assert.ok(findings.some(f => f.includes(token)), `expected a finding for ${token}:\n${findings.join('\n')}`);
  }
});

test('manifest entries without files and files outside the manifest are both reported', async () => {
  const root = await repo({ 'scripts/manifest.json': manifest, 'skills/hearthroom-zzz/SKILL.md': good.replace('hearthroom-a', 'hearthroom-zzz'), 'references/x.md': '', 'references/platform-facts.md': '' });
  const findings = await validateRepo(root);
  assert.ok(findings.some(f => f.includes('hearthroom-a') && f.includes('manifest')), findings.join('\n'));
  assert.ok(findings.some(f => f.includes('hearthroom-zzz')), findings.join('\n'));
});

test('every language README is scanned for forbidden tokens', async () => {
  const base = { 'scripts/manifest.json': manifest, 'skills/hearthroom-a/SKILL.md': good, 'references/x.md': '', 'references/platform-facts.md': '' };
  for (const readme of ['README.md', 'README.zh-Hant.md', 'README.zh-Hans.md']) {
    const findings = await validateRepo(await repo({ ...base, [readme]: '# Skills\n\nPorted from Moonloom.\n' }));
    assert.ok(findings.some(f => f.startsWith(`${readme}:3: forbidden token`)), `${readme}: ${findings.join('\n')}`);
  }
});

const base = () => ({ 'scripts/manifest.json': manifest, 'skills/hearthroom-a/SKILL.md': good, 'references/x.md': '# x\n', 'references/platform-facts.md': '# facts\n' });

test('a description over 300 characters is reported', async () => {
  const long = good.replace('Use when a card needs a.', `Use when a card needs ${'a, '.repeat(100)}a.`);
  const findings = await validateRepo(await repo({ ...base(), 'skills/hearthroom-a/SKILL.md': long }));
  assert.ok(findings.some(f => f.includes('description is') && f.includes('300')), findings.join('\n'));
});

test('instructions to review or narrate the agent\'s own reasoning are reported outside code and quotes', async () => {
  for (const phrase of ['Run a self-review first.', 'Double-check the opening.', 'Show your reasoning before you patch.', 'Think step by step.', 'Re-verify every field.']) {
    const findings = await validateRepo(await repo({ ...base(), 'references/x.md': `# x\n\n${phrase}\n` }));
    assert.ok(findings.some(f => f.startsWith('references/x.md:3:')), `${phrase}\n${findings.join('\n')}`);
  }
  const quoted = '# x\n\n```text\nDouble-check the status block.\n```\n\n> Think step by step.\n';
  assert.deepEqual(await validateRepo(await repo({ ...base(), 'references/x.md': quoted })), []);
});

test('line budgets: over budget, unbudgeted, stale and slack entries are reported', async () => {
  const budget = (o) => JSON.stringify(o);
  const lines = (n) => '# x\n' + 'line\n'.repeat(n - 1);
  const ok = { 'skills/hearthroom-a/SKILL.md': 12, 'references/x.md': 3, 'references/platform-facts.md': 1 };
  assert.deepEqual(await validateRepo(await repo({ ...base(), 'references/x.md': lines(3), 'scripts/line-budget.json': budget(ok) })), []);

  const over = await validateRepo(await repo({ ...base(), 'references/x.md': lines(5), 'scripts/line-budget.json': budget(ok) }));
  assert.ok(over.some(f => f.startsWith('references/x.md: 5 lines, budget 3')), over.join('\n'));

  const { 'references/x.md': _, ...missing } = ok;
  const unbudgeted = await validateRepo(await repo({ ...base(), 'references/x.md': lines(3), 'scripts/line-budget.json': budget(missing) }));
  assert.ok(unbudgeted.some(f => f.startsWith('references/x.md: no line budget')), unbudgeted.join('\n'));

  const stale = await validateRepo(await repo({ ...base(), 'references/x.md': lines(3), 'scripts/line-budget.json': budget({ ...ok, 'references/gone.md': 10 }) }));
  assert.ok(stale.some(f => f.startsWith('references/gone.md: has a line budget but no file')), stale.join('\n'));

  const slack = await validateRepo(await repo({ ...base(), 'references/x.md': lines(3), 'scripts/line-budget.json': budget({ ...ok, 'references/x.md': 30 }) }));
  assert.ok(slack.some(f => f.startsWith('references/x.md: 3 lines, budget 30; lower the budget to 3')), slack.join('\n'));
});
