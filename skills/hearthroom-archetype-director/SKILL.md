---
name: hearthroom-archetype-director
description: Use when a card's type (companion, story, game, generator) or shape (daily life, light or heavy setting, ensemble) is unclear or mixed, when a hybrid needs one primary contract, or when the author asks "what kind of card is this" before blueprinting or writing fields.
---

# Archetype Director

Answer "which contract drives this card?" so a mixed idea does not become a
lore dump, a vague assistant, or a pretty opening with no durable play loop.
The output is an archetype packet; it does not touch the card folder.

## Required references

Read `../../references/archetype-contracts.md`. Read
`../../references/platform-facts.md` for the four `type` values and the
fields each contract allocates; `../../references/ensemble-card-design.md`
when cast scope is part of the decision;
`../../references/card-series-design.md` when the author is choosing across
related cards.

## Workflow

1. Restate the seed in one sentence. Several related cards or variants go to
   `hearthroom-series-architect` first.
2. Name the primary contract by what the player comes to do, not by
   aesthetic or trope; that sets `type` in `card.json`.
3. Name the shape and overlays (daily life, light or heavy setting,
   ensemble; romance, mystery or artifact output as secondary layers) and
   what each overlay is allowed to do. Reject any tempting archetype that
   would need a different primary loop.
4. Write the contract: player promise, player position, core loop,
   first-screen proof, and which field carries the durable engine.
5. Allocate summary, definition, opening, alternates, examples, Lorebook,
   output contract and presentation by the primary contract. Declare
   `uiRole` (`assist`: the story is the product and must read well with
   rules off; `core`: mechanics bound to UI, each legible in text and
   degrading to text) and `pageMode` (`presentation-design.md`, Story first).
6. List the design packets this card needs and their order, then apply the
   hybrid rules: companion hybrids keep relationship pressure primary;
   heavy-setting hybrids turn lore into choices and state before keeping
   names; generator hybrids keep the artifact concrete; ensembles settle turn
   ownership before adding cast; daily-life cards get a small specific
   desire; game and generator cards proceed on minimal input with defaults;
   story cards carry incident stakes and route consequences.

## Packet

Seed; primary contract and type; shape and overlays; rejected archetypes;
player promise, position, core loop, first-screen proof; field allocation;
`uiRole`; `pageMode`; required packets and order; hybrid failure modes.
Continue with `hearthroom-card-blueprint` when design is still needed,
`hearthroom-card-author` when the contract is clear, or the shape skill
(play engineer, generator architect, scenario architect, daily-life
architect, ensemble director) when that shape is not yet playable.

## Do not

- Do not let a card be companion, game, generator and story at equal
  priority, and do not classify by atmosphere or trope.
- Do not write a shape as `type`; shapes live inside one of the four types.
