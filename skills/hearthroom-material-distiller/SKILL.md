---
name: hearthroom-material-distiller
description: Use when a Hearthroom card task starts from author-provided files, folders, world bibles, pasted lore, notes, imported source material, an existing draft, or more setting and character material than one card can hold, before blueprinting or authoring.
---

# Hearthroom Material Distiller

Turn a large source into a source-to-play map the next skill can draft from
without rereading the material. The output is a map, not a card.

## Required references

- `../../references/material-distillation.md`: passes, keep/delay/cut, world and
  character compression, conflict handling.
- `../../references/platform-facts.md`: card folder, field limits, how Lorebook
  entries reach the model.
- `../../references/voice-calibration.md` when the material has dialogue or a cast.
- `../../references/originality-adaptation.md` when the material is canon-like.
- `../../references/cost-and-boundaries.md` when the material is mature or personal.

## Workflow

1. List the sources (files, notes, outline, world bible, character sheet,
   dialogue, existing draft). Confirm the author wants them used. Inspect only
   what the requested card needs.
2. Inventory each source by what it can contribute, without copying it.
3. Extract the playable promise: fantasy, player role, central tension, and the
   pressure that starts the first scene.
4. Filter for playability. Keep a fact only when it creates agency, consequence,
   character behavior, state, a route seed, voice, or a first-scene action.
5. Compress a world into modules: core rule, player position, locations,
   factions, state, route seeds, one opening problem. Compress a character into
   desire, contradiction, boundary, player leverage, voice, turn behavior,
   progression.
6. Mark every item keep, delay, cut, merge, rename, or assumption.
7. Map what is kept to the folder: durable rules and engine to `definition.md`;
   the first scene to `welcome.md`; background that matters only when named to
   `lorebook.json` entries with keywords and descriptive names; visible status
   or layout ideas to a presentation note; example conversations only when they
   teach voice or format.
8. Write a character plan per field. Take limits from `card validate --json`
   (`tokenBudget.limits`). Cut history before agency, consequence, voice, or state.

## Hand-off

```text
Material inventory / Playable promise
Source-to-play map: definition | opening | Lorebook | presentation | examples
Delay / cut / merge / assumptions
Character plan per field; cut first
Next skill; ready: yes | no; missing author input
```

- `hearthroom-world-engineer`: still a world or relationship network without
  playable rules, state, or routes.
- `hearthroom-originality-adapter`: canon-like, derivative, or renamed-copy risk.
- `hearthroom-card-blueprint`: concept still needs ideation.
- `hearthroom-card-author`: fields can be drafted now.
- `hearthroom-presentation-director`: visible state or layout for display rules
  or opening HTML.

## Do not

- Do not summarize every fact; a short map that keeps agency, consequence, voice,
  and a first action beats a digest.
- Do not paste source passages into the card; rewrite as original rules and beats.
- Do not keep names, factions, or mechanics that do not change play.
- Do not ask about every gap; ask only when the answer changes player role,
  intensity, central relationship, first scene, or ownership.
- Do not run CLI commands or edit the folder from this skill.
