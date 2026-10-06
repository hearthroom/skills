---
name: hearthroom-series-architect
description: Use when the author wants a set, series, spin-off, alternate version, seasonal or event variant, or several related cards from one shared character, setting or creator concept, and each variant must prove a distinct playable promise before any of them is authored.
---

# Hearthroom Series Architect

Keep the shared core recognisable while forcing every variant to prove a
different playable contract. One anchor plus one distinct alternate beats
four cards with the same loop. The output is a card-series packet, not
card files.

## Required references

Read `../../references/card-series-design.md`. From
`../../references/platform-facts.md`: card types, folders, trial-card limits,
the Media library. Read the narrow reference only when it is the blocker:
`../../references/archetype-contracts.md` (a variant's primary contract),
`../../references/character-core-design.md` (a thin shared core),
`../../references/opening-design.md` (variant openings),
`../../references/boundary-design.md` (variants differ in intensity),
`../../references/token-economy.md` (shared lore bloating several cards).

## Workflow

1. Restate the seed and the series goal. Build or preserve the shared core:
   identity, desire, contradiction, boundary, player leverage, asymmetry,
   voice baseline, reusable motifs (`hearthroom-character-core` first if it
   is weak).
2. List proposed variants and classify each keep, merge or reject. For every
   kept variant choose one primary archetype by player promise and the
   matching `type` (`hearthroom-archetype-director` when a variant mixes
   contracts).
3. Define each kept variant's unique pressure, opening proof, long-play
   loop, boundary posture, token target and field allocation. Name overlap
   risks: duplicate opening, same second-turn move, copied lore, same player
   role, same loop, same artifact, intensity drift.
4. Set the authoring order: anchor card first, then the most distinct
   secondary variant, one folder per card for its whole life. Decide the
   series media folder (`media.folder`, the same name in every variant) and
   which art is shared versus per-variant (`art/bg/<variant>.webp`); name
   files by what they show, never by season, year or version. Push, render
   and play the first two before adding more.
5. Write a cost-aware plan: validate and render every variant, `play` only
   the ones whose behaviour changed, stay within the trial-card ceiling or
   `card push --create` for cards the author keeps.

## Packet

Seed; series goal; shared core; variant map; per-variant contract (type,
promise, player role, unique pressure, opening proof, loop, boundary
posture, token target, allocation); overlap risks; authoring order; media
plan; validation, render and play plan. Continue with
`hearthroom-card-blueprint` for one kept variant, the layer skill for a
variant's weak layer, or `hearthroom-card-author` to write and push real
cards one at a time.

## Do not

- Do not make mood, costume, season or intensity the only difference; change
  player task, pressure, state, consequence or artifact.
- Do not paste a series bible into every definition; keep shared behaviour
  compact and let each variant carry its own engine.
