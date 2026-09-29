---
name: hearthroom-archetype-director
description: Use when a Hearthroom card needs its type chosen among companion, story, game and generator, a shape such as daily life, light or heavy setting or ensemble decided, a hybrid limited to one primary contract, fields allocated by that contract, or the order of design skills fixed before blueprinting or writing fields.
---

# Archetype Director

Use this skill when card shape is the weak layer. The output is an archetype
packet, not a full card, and it does not touch the card folder. It answers
"which contract drives this card?" so a mixed idea does not become a lore
dump, a vague assistant, or a pretty opening with no durable play loop.

## Required references

Read `../../references/archetype-contracts.md` first. Read
`../../references/platform-facts.md` for the four `type` values and the fields
each contract allocates. Read `../../references/ensemble-card-design.md` when
cast scope or turn ownership is part of the decision, and use
`hearthroom-ensemble-director` first when multi-character structure is the main
problem. Read `../../references/card-series-design.md` when the author is
choosing across several related cards, and use `hearthroom-series-architect`
first when the task is deciding which variants to keep. Read
`../../references/quality-rubric.md` for the self-review probes.

## Workflow

1. Restate the seed in one sentence. If the author wants several related
   cards or variants, hand off to `hearthroom-series-architect` unless the
   request is only the contract for one specific card.
2. Name the primary contract by what the player comes to do, not by aesthetic
   or trope. That contract sets `type` in `card.json`: companion, story, game
   or generator.
3. Name the shape and overlays: daily life, light setting, heavy setting or
   ensemble, plus romance, mystery or artifact output as secondary layers.
   State what each overlay is allowed to do.
4. Reject any tempting archetype that would need a different primary loop.
5. Write the contract: player promise, player position, core loop, first-screen
   proof, and which field carries the durable engine.
6. Allocate summary, definition, opening, alternate openings, example
   conversations, Lorebook, output contract and presentation according to the
   primary contract.
7. List the design packets this card needs and the order to run them:
   character core, relationship, world, play engine, generator, scenario, daily
   life, ensemble, agency, voice, opening, longplay, boundary, length.
8. Apply the hybrid rules: companion hybrids keep relationship pressure
   primary; heavy-setting hybrids convert lore into choices and state before
   keeping names; generator hybrids keep the artifact concrete; ensemble cards
   settle turn ownership before adding cast; daily-life cards get a small
   specific desire, not sudden melodrama; game and generator cards proceed on
   minimal input with defaults; story cards carry incident stakes and route
   consequences.
9. Run the self-review probes and name the hand-off.

## Hand-off

Give the next skill this packet:

```text
Archetype packet:
- current seed:
- primary contract and card type (companion | story | game | generator):
- shape and overlays:
- rejected archetypes:
- player promise:
- player position:
- core loop:
- first-screen proof:
- field allocation:
  - summary:
  - definition:
  - opening and alternate openings:
  - example conversations:
  - Lorebook:
  - output contract and custom instructions:
  - presentation (opening HTML, hc-* components, display rules):
- required packets and order:
- hybrid failure modes:
- repair rules:
- self-review probes:
- next skill:
```

Route the packet to:

- `hearthroom-card-blueprint` when concept synthesis, character core, world,
  voice, opening or field planning is still needed.
- `hearthroom-card-author` when the contract is clear and the author wants the
  files written.
- `hearthroom-series-architect` when several related cards need keep, merge or
  reject decisions first.
- `hearthroom-ensemble-director` when the shape is ensemble but cast structure,
  spotlight or turn ownership is not yet playable.
- `hearthroom-play-engineer` when the type is game and rules, compact state,
  resource costs or turn protocol are not yet coherent.
- `hearthroom-generator-architect` when the type is generator and the artifact
  contract, intake defaults, output schema or revision operations are missing.
- `hearthroom-scenario-architect` when the type is story and incident stakes,
  route branches, clue pacing or consequence state are not yet coherent.
- `hearthroom-daily-life-architect` when the shape is daily life and the
  routine, small desire, tiny disruption or second-turn change is unclear.
- `hearthroom-character-core`, `hearthroom-relationship-architect`,
  `hearthroom-world-engineer`, `hearthroom-agency-designer`,
  `hearthroom-voice-director`, `hearthroom-opening-director`,
  `hearthroom-longplay-architect`, `hearthroom-boundary-designer` or
  `hearthroom-token-architect` when the packet identifies that one layer as
  the blocker.

## Do not

- Do not let a card be companion, game, generator, heavy setting and story at
  equal priority. Pick one primary contract.
- Do not classify by atmosphere or trope. Classify by what the player does.
- Do not write `type` as a shape. Daily life, light setting, heavy setting and
  ensemble are shapes inside one of the four types.
- Do not assign the player's feelings, memories, consent, actions or
  commitments. The card may offer, tempt, pressure, warn or refuse.
- Do not edit the card folder or run `hearthroom card push` or `hearthroom play`
  from this skill.
