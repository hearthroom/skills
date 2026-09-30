# Hearthroom skills

**English · [繁體中文](README.zh-Hant.md)**

A set of skills that teach an AI coding agent how to write a good character
card for [Hearthroom](https://hearthroom.club), and how to test it with the
[`hearthroom` CLI](https://cli.hearthroom.club) without leaving the shell.

The CLI moves files to the provider and brings evidence back. These skills
are the craft: premise, character, relationship, world and Lorebook, openings,
voice, state, presentation, diagnosis and iteration. Everything they say
about the platform itself comes from one page,
[`references/platform-facts.md`](references/platform-facts.md).

## Install

Claude Code:

```bash
claude plugin marketplace add hearthroom/skills
claude plugin install hearthroom
```

Codex:

```bash
codex plugin marketplace add hearthroom/skills
```

Any agent that can read files: clone this repository and add one line to its
rules file:

```
When writing, reviewing or testing a Hearthroom character card, read
<path>/skills/using-hearthroom/SKILL.md first and follow its routing table.
```

You also need the CLI: `curl -fsSL https://raw.githubusercontent.com/hearthroom/cli/main/install.sh | sh`,
then `hearthroom auth login`.

## What to say to your agent

> I want a lighthouse keeper who lies to protect someone. Make me a card and push it as a trial card.

> This card runs out of things to say after three turns. Find out why and fix it.

> Render the opening and tell me whether the status bar rule actually applies.

> Play two turns with the alternate opening and tell me where a player would lose interest.

The agent starts at `using-hearthroom`, routes to the narrowest skill, edits
the card folder, and runs `card push --validate`, `card render` and, only with
your agreement, `play --allow-spend`.

## What is inside

- `skills/using-hearthroom` routes every request.
- `skills/hearthroom-cli-operator` drives the CLI and reads its JSON.
- Shaping: premise workshop, archetype director, character core, relationship
  architect, world engineer, tension weaver, agency designer, opening director,
  voice director, talk example curator, state economist, longplay architect.
- Card types: play engineer, scenario architect, daily-life architect,
  generator architect, ensemble director, series architect.
- Sources and framing: material distiller, originality adapter, sample
  calibrator, profile packager, visual identity director, boundary designer,
  language stylist, detail engineer, token architect, instruction guardrail.
- Presentation: presentation director, render review.
  Status bars, themes and full custom pages are routed to the open-source
  [tavern-mmd](https://github.com/yofengi/tavern-mmd) skill; Hearthroom's
  sandbox page runs the same author API as MMD's new-style sandbox, and
  `hearthroom card import` reads its output.
- Assembly and loops: card blueprint, card author, field finalizer, quality
  auditor, card doctor, collaboration director, chat simulation, iteration
  director, publish readiness.
- `references/` holds the shared craft guides; `examples/` holds synthetic
  briefs and sample shapes.

## Costs and boundaries

Drafting, validating and rendering cost nothing beyond your agent's own usage.
`play -m` spends your credits and needs `--allow-spend`; the skills ask before
the first turn. Work stays on trial cards and your own private cards; nothing
is submitted for review unless you do it on the site.

## Improving these skills

These skills get better from real card work. When an agent using them finds a
skill that was wrong or missing something, it should fix the skill or
reference in general terms (no card names, ids or private content), run
`npm run validate` and `npm test`, commit with this repository's author
identity, and tell the person it works with what changed and why; push only
after they agree. The entry skill `using-hearthroom` says the same, so agents
see it while they work.

## Develop

```bash
npm test          # validator unit tests
npm run validate  # structure, citations, manifest, forbidden tokens
```

`scripts/manifest.json` is the list of skills and references; the validator
fails when the tree and the manifest disagree, when a skill cites a missing
reference, or when vocabulary from the platform this toolkit was distilled
from leaks in. Portions are derived from an MIT-licensed predecessor toolkit; `LICENSE` carries the attribution.
