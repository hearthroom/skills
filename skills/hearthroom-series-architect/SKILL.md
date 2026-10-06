---
name: hearthroom-series-architect
description: Use when an author wants a set, series, spin-off, alternate version, seasonal or event variant, daily-life variant, RPG variant, generator variant or several related cards from one shared character, setting or creator concept, and each variant must prove a distinct playable promise before blueprinting, authoring, render review, play testing or publishing.
---

# Hearthroom Series Architect

Use this skill when the author wants several related cards from one promising
character, relationship, world or creator concept. The output is a card-series
packet, not card files. It keeps the shared core recognizable while forcing
every variant to prove a different playable contract.

## Required references

Read `../../references/card-series-design.md` first and
`../../references/platform-facts.md` for card types, folders, trial-card
limits and the CLI loop. As needed: `../../references/archetype-contracts.md`
for each variant's primary contract;
`../../references/character-core-design.md` when the shared core is thin or
unstable; `../../references/opening-design.md` when variant openings need
first-screen proof; `../../references/longplay-design.md` when variants need
distinct route memory; `../../references/play-engine-design.md` for a `game`
variant; `../../references/generator-design.md` for a `generator` variant;
`../../references/boundary-design.md` when variants differ in intensity,
rating or refusal posture; `../../references/token-economy.md` when shared
lore would bloat several cards.

## Workflow

1. Restate the seed and the series goal. Build or preserve the shared core: identity, desire, contradiction, boundary, player leverage, relationship asymmetry, voice baseline, reusable motifs. Use `hearthroom-character-core` first if the core is weak.
2. List proposed variants and classify each as keep, merge or reject.
3. For every kept variant choose one primary archetype by player promise and the matching `type` (`companion`, `story`, `game`, `generator`); use `hearthroom-archetype-director` when a variant mixes contracts.
4. Define each kept variant's unique pressure, opening proof, long-play loop, boundary posture, token target, field allocation and required hand-offs from this toolkit.
5. Name overlap risks: duplicate opening, same second-turn move, copied lore, same player role, same route loop, same artifact, intensity drift.
6. Set authoring order: anchor card first, then the most distinct secondary variant, one folder per card for its whole life. Decide the series media folder (`media.folder`, the same name in every variant) and which art is shared (portrait, expressions) versus per-variant (`art/bg/<variant>.webp`); name files by what they show, never by season, year or version. Push, render and play the first two before adding more.
7. Write a cost-aware plan: validate and render every variant, `play` only the ones whose behaviour changed, stay within the trial-card ceiling or use `card push --create` for cards the author keeps.

## Hand-off

```text
Card-series packet:
- current seed:
- series goal:
- shared core:
- variant map: keep, merge, reject
- variant contracts: per variant, primary archetype, card type, player promise, player role, unique pressure, opening proof, long-play loop, boundary posture, token target, field allocation, required hand-offs
- overlap risks:
- authoring order:
- media folder and shared versus per-variant art:
- validation / render / play plan (Playtest: 10–20 turns, a weak and a strong model, `--new-session`, one shortcoming per version, compared with the previous version (`playtest-loop.md`).):
- self-review: each kept variant has a reason to exist; shared core compact; no contract stolen; openings start different situations and second-turn moves differ; daily-life variant not just thinner; generator variant produces an artifact; boundary posture differs safely; no copied lore
- next skill:
```

Hand it to `hearthroom-card-blueprint` to blueprint one kept variant;
`hearthroom-archetype-director` when a variant's contract is still contested;
`hearthroom-character-core` when the shared core is copied as biography
instead of behaviour; `hearthroom-daily-life-architect`,
`hearthroom-scenario-architect`, `hearthroom-play-engineer`,
`hearthroom-generator-architect`, `hearthroom-relationship-architect`,
`hearthroom-opening-director`, `hearthroom-longplay-architect`,
`hearthroom-boundary-designer` or `hearthroom-token-architect` for the weak
layer of one kept variant; `hearthroom-card-author` to write and push real
cards one at a time.

## Do not

- Do not create a series because more cards sounds better. One anchor plus one distinct alternate beats four cards with the same loop.
- Do not make mood, costume, season or intensity the only difference. Change player task, pressure, state, consequence or artifact.
- Do not paste a series bible into every definition. Keep shared behaviour compact; let each variant carry its own engine.
- Do not let a daily-life variant be the same card but softer, or an event variant be a lore tour.
- Do not edit files, push, play or publish from this skill.
