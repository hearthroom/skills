#!/usr/bin/env node
// Structure check for the toolkit: every skill has frontmatter with a matching
// name and a description, cites only references that exist, the manifest and
// the tree agree, and nothing from the platform this toolkit was distilled from
// leaks through (its tool names, its runtime vocabulary, its URLs). It also holds
// the writing standard in references/writing-skills.md where a machine can: short
// descriptions, no instructions that make the agent review or narrate its own
// reasoning, and a line budget per file so growth is a visible decision.
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const FORBIDDEN = [
  'lunatalk', 'LunaTalk', 'Moonloom', 'moonloom', 'MCP', 'XMLV3', 'Theme V3', 'ThemeV3',
  'role_patch_', 'role_create', 'render_preview', 'validate_role', 'theme_validate',
  'structuredContent', 'api.lunatalk', 'creator_analytics', 'packet stack',
];
const DESCRIPTION_MAX = 300;
// Agent-facing rituals current models do on their own or decline (reasoning
// extraction). Checks on the card itself are fine; name them as such.
const RITUALS = [
  /\bself-review/i, /\bdouble-check/i, /\bre-verify\b/i, /\bthink step by step\b/i,
  /\b(show|explain|write out|write down) your (reasoning|thinking|thought process)\b/i,
];
const BUDGET_SLACK = 10;
const REF_LINK = /\.\.\/\.\.\/references\/([A-Za-z0-9._-]+\.md)/g;

async function exists(p) { try { await stat(p); return true; } catch { return false; } }

async function listDirs(dir) {
  if (!(await exists(dir))) return [];
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) if (e.isDirectory()) out.push(e.name);
  return out.sort();
}

async function listFiles(dir, ext) {
  if (!(await exists(dir))) return [];
  return (await readdir(dir)).filter(n => n.endsWith(ext)).sort();
}

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== 'node_modules') out.push(...(await walk(p))); }
    else out.push(p);
  }
  return out.sort();
}

function frontmatter(text) {
  const m = /^---\n([\s\S]*?)\n---\n/.exec(text);
  if (!m) return null;
  const fields = {};
  for (const line of m[1].split('\n')) {
    const at = line.indexOf(':');
    if (at > 0) fields[line.slice(0, at).trim()] = line.slice(at + 1).trim();
  }
  return fields;
}

export async function validateRepo(root) {
  const findings = [];
  const manifest = JSON.parse(await readFile(path.join(root, 'scripts/manifest.json'), 'utf8'));
  const skillDirs = await listDirs(path.join(root, 'skills'));
  const refFiles = await listFiles(path.join(root, 'references'), '.md');

  for (const name of Object.keys(manifest.skills ?? {})) {
    if (!skillDirs.includes(name)) findings.push(`skills/${name}: listed in the manifest but has no folder`);
  }
  for (const name of Object.keys(manifest.references ?? {})) {
    if (!refFiles.includes(name)) findings.push(`references/${name}: listed in the manifest but missing`);
  }
  for (const name of refFiles) {
    if (!(manifest.references ?? {})[name]) findings.push(`references/${name}: not in the manifest`);
  }

  for (const dir of skillDirs) {
    const file = path.join(root, 'skills', dir, 'SKILL.md');
    if (!(manifest.skills ?? {})[dir]) findings.push(`skills/${dir}: not in the manifest`);
    if (!(await exists(file))) { findings.push(`skills/${dir}: SKILL.md missing`); continue; }
    const text = await readFile(file, 'utf8');
    const fm = frontmatter(text);
    if (!fm) { findings.push(`skills/${dir}/SKILL.md: no frontmatter`); }
    else {
      if (fm.name !== dir) findings.push(`skills/${dir}/SKILL.md: frontmatter name "${fm.name}" does not match the folder`);
      if (!fm.description) findings.push(`skills/${dir}/SKILL.md: frontmatter description missing`);
      else if (!/^Use when\b/.test(fm.description)) findings.push(`skills/${dir}/SKILL.md: description should start with "Use when"`);
      else if (/: /.test(fm.description)) findings.push(`skills/${dir}/SKILL.md: description contains ": " which breaks YAML plain scalars`);
      else if (fm.description.length > DESCRIPTION_MAX) findings.push(`skills/${dir}/SKILL.md: description is ${fm.description.length} characters; keep it under ${DESCRIPTION_MAX} by naming only when to use the skill`);
    }
    for (const m of text.matchAll(REF_LINK)) {
      if (!refFiles.includes(m[1])) findings.push(`skills/${dir}/SKILL.md: cites references/${m[1]} which does not exist`);
    }
  }

  // Assets and scripts: every kit listed in the manifest exists, its JavaScript parses, its JSON
  // is valid. The kit runs as classic scripts inside display rules, so a syntax error would only
  // show up as "nothing happens" on the play page.
  const { execFileSync } = await import('node:child_process');
  for (const name of Object.keys(manifest.assets ?? {})) {
    const dir = path.join(root, 'assets', name);
    if (!(await exists(dir))) { findings.push(`assets/${name}: listed in the manifest but missing`); continue; }
    for (const file of await walk(dir)) {
      const rel = path.relative(root, file);
      if (file.endsWith('.js') || file.endsWith('.mjs')) {
        try { execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' }); } catch (e) { findings.push(`${rel}: does not parse (${String(e.stderr || e.message).split('\n')[0]})`); }
      } else if (file.endsWith('.json')) {
        try { JSON.parse(await readFile(file, 'utf8')); } catch (e) { findings.push(`${rel}: invalid JSON (${e.message})`); }
      }
    }
  }
  for (const name of Object.keys(manifest.scripts ?? {})) {
    if (!(await exists(path.join(root, 'scripts', name)))) findings.push(`scripts/${name}: listed in the manifest but missing`);
  }
  for (const name of await listDirs(path.join(root, 'assets'))) {
    if (!(manifest.assets ?? {})[name]) findings.push(`assets/${name}: not in the manifest`);
  }

  const assetDocs = [];
  for (const name of Object.keys(manifest.assets ?? {})) {
    const dir = path.join(root, 'assets', name);
    if (await exists(dir)) for (const file of await walk(dir)) if (file.endsWith('.md')) assetDocs.push(path.relative(root, file));
  }
  const scan = [
    ...skillDirs.map(d => path.join('skills', d, 'SKILL.md')),
    ...refFiles.map(f => path.join('references', f)),
    ...(await listFiles(path.join(root, 'examples'), '.md')).map(f => path.join('examples', f)),
    ...assetDocs,
    'README.md',
    'README.zh-Hant.md',
    'README.zh-Hans.md',
  ];
  for (const rel of scan) {
    const file = path.join(root, rel);
    if (!(await exists(file))) continue;
    const text = await readFile(file, 'utf8');
    for (const token of FORBIDDEN) {
      const at = text.indexOf(token);
      if (at >= 0) {
        const line = text.slice(0, at).split('\n').length;
        findings.push(`${rel}:${line}: forbidden token "${token}"`);
      }
    }
  }
  const prose = [
    ...skillDirs.map(d => path.join('skills', d, 'SKILL.md')),
    ...refFiles.map(f => path.join('references', f)),
    ...(await listFiles(path.join(root, 'examples'), '.md')).map(f => path.join('examples', f)),
  ];
  for (const rel of prose) {
    const file = path.join(root, rel);
    if (!(await exists(file))) continue;
    let fenced = false;
    (await readFile(file, 'utf8')).split('\n').forEach((line, i) => {
      if (/^\s*```/.test(line)) { fenced = !fenced; return; }
      if (fenced || /^\s*>/.test(line)) return;
      const hit = RITUALS.find(re => re.test(line));
      if (hit) findings.push(`${rel}:${i + 1}: asks the agent to review or narrate its own reasoning ("${line.match(hit)[0]}"); name the check on the card instead (references/writing-skills.md)`);
    });
  }

  // Line budgets: growth is allowed, but only as a change to scripts/line-budget.json in the
  // same commit, so a reviewer sees it. A cut lowers the budget so the space is not refilled.
  const budgetFile = path.join(root, 'scripts/line-budget.json');
  if (await exists(budgetFile)) {
    const budget = JSON.parse(await readFile(budgetFile, 'utf8'));
    for (const rel of prose) {
      const file = path.join(root, rel);
      if (!(await exists(file))) continue;
      const text = await readFile(file, 'utf8');
      const lines = text.split('\n').length - (text.endsWith('\n') ? 1 : 0);
      const max = budget[rel];
      if (max === undefined) findings.push(`${rel}: no line budget; add "${rel}": ${lines} to scripts/line-budget.json`);
      else if (lines > max) findings.push(`${rel}: ${lines} lines, budget ${max}. Cut it back, or raise the budget in scripts/line-budget.json in the same commit and say why in the message`);
      else if (max - lines > BUDGET_SLACK) findings.push(`${rel}: ${lines} lines, budget ${max}; lower the budget to ${lines} so the cut stays cut`);
    }
    for (const rel of Object.keys(budget)) if (!prose.includes(rel)) findings.push(`${rel}: has a line budget but no file; remove the entry`);
  }
  return findings;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = process.argv[2] ? path.resolve(process.argv[2]) : path.resolve(fileURLToPath(new URL('..', import.meta.url)));
  const findings = await validateRepo(root);
  for (const f of findings) console.log(f);
  console.log(findings.length ? `✖ ${findings.length} finding(s)` : '✔ skills, references and manifest agree; no forbidden tokens');
  process.exit(findings.length ? 1 : 0);
}
