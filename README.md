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
codex plugin add hearthroom@hearthroom-skills
```

Any agent that can read files: clone this repository and add one line to its
rules file:

```
When writing, reviewing or testing a Hearthroom character card, read
<path>/skills/using-hearthroom/SKILL.md first and follow its routing table.
```

You also need the CLI: `brew install hearthroom/tap/hearthroom` on macOS,
or `curl -fsSL https://raw.githubusercontent.com/hearthroom/cli/main/install.sh | sh`,
then `hearthroom auth login`.

## What to say to your agent

> I want a lighthouse keeper who lies to protect someone. Make me a card and push it as a trial card.

> This card runs out of things to say after three turns. Find out why and fix it.

> Render the opening and show me a screenshot of whether the status panel actually draws.

> Play two turns with the alternate opening and tell me where a player would lose interest.

The agent starts at `using-hearthroom`, routes to the narrowest skill, edits
the card folder, runs the local checker (`scripts/check-card.mjs`),
`card push --validate` and `card render`, looks at the screen in the offline
preview when the chat page's repository is available, and, only with your
agreement, `play --allow-spend`.

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
- Presentation: presentation director, sandbox kit, render review. Story
  first: every card declares whether its UI assists the story or carries the
  game, and the toolkit measures how much of each reply the status block
  costs.
  `assets/sandbox-kit/` is the toolkit's own kit for the sandbox page: a
  status panel drawn from a block the model writes, a dark-and-light preset,
  a settings drawer, a pinned bar and choice buttons, built into display
  rules by `build.mjs`. `scripts/check-card.mjs` checks a card folder against
  `scripts/sandbox-contract.json`, the inventory of the sandbox author API
  generated from the chat page's source. Hearthroom's sandbox page has the
  same shape as MMD's new-style sandbox, so `hearthroom card import` reads
  that format too; the facts sheet lists the differences.
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

`scripts/manifest.json` is the list of skills, references, assets and
scripts; the validator fails when the tree and the manifest disagree, when a
skill cites a missing reference, when a kit script does not parse or a JSON
file is invalid, or when vocabulary from the platform this toolkit was
distilled from leaks in. `tests/` also cover the kit's parser and build and
the card checker. Portions are derived from an MIT-licensed predecessor
toolkit and the kit follows the method of the MIT-licensed tavern-mmd
project; `LICENSE` carries the attributions.
