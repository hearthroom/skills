#!/usr/bin/env node
// Structure check for the toolkit: every skill has frontmatter with a matching
// name and a description, cites only references that exist, the manifest and
// the tree agree, and nothing from the platform this toolkit was distilled from
// leaks through (its tool names, its runtime vocabulary, its URLs).
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const FORBIDDEN = [
  'lunatalk', 'LunaTalk', 'Moonloom', 'moonloom', 'MCP', 'XMLV3', 'Theme V3', 'ThemeV3',
  'role_patch_', 'role_create', 'render_preview', 'validate_role', 'theme_validate',
  'structuredContent', 'api.lunatalk', 'creator_analytics', 'packet stack',
];
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
    }
    for (const m of text.matchAll(REF_LINK)) {
      if (!refFiles.includes(m[1])) findings.push(`skills/${dir}/SKILL.md: cites references/${m[1]} which does not exist`);
    }
  }

  const scan = [
    ...skillDirs.map(d => path.join('skills', d, 'SKILL.md')),
    ...refFiles.map(f => path.join('references', f)),
    ...(await listFiles(path.join(root, 'examples'), '.md')).map(f => path.join('examples', f)),
    'README.md',
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
  return findings;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = process.argv[2] ? path.resolve(process.argv[2]) : path.resolve(fileURLToPath(new URL('..', import.meta.url)));
  const findings = await validateRepo(root);
  for (const f of findings) console.log(f);
  console.log(findings.length ? `✖ ${findings.length} finding(s)` : '✔ skills, references and manifest agree; no forbidden tokens');
  process.exit(findings.length ? 1 : 0);
}
