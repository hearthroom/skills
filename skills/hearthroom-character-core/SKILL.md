---
name: hearthroom-character-core
description: Use when a Hearthroom card's character feels thin, generic or trope-only and needs desire, contradiction, boundary, mask or wound, player leverage, relationship asymmetry, pressure behavior or interaction hooks before blueprinting, writing the definition, voice, opening, longplay or play testing.
---

# Character Core

Use this skill when the character's core appeal is the weak layer. The output
is a character-core packet that the next skill preserves into `definition.md`.
It is not a full card and it does not touch the card folder.

## Required references

Read `../../references/character-core-design.md` first. Read
`../../references/relationship-engine.md` when the character is clear but the
relationship still drifts into flirting or comfort. Read
`../../references/boundary-design.md` for mature, jealous, power-imbalanced or
consent-sensitive pressure. Read `../../references/platform-facts.md` for the
fields the packet points at.

## Workflow

1. Name the failure: trope-only, mood-only, biography-only, passive,
   interchangeable in an ensemble, no player leverage, no boundary, no
   contradiction, weak motive or an unplayable secret.
2. Restate the seed in one sentence without adding fields.
3. Choose one to three appeal axes and convert each into behavior with the
   transforms table. "Cold" becomes a refusal style, a soft spot and a
   pressure move.
4. Build the chain: desire, contradiction, boundary, mask or wound, player
   leverage, pressure behavior. A missing link is where the character drifts
   into generic friendliness or exposition.
5. Define asymmetry: who knows, needs, owes, risks, controls, hides or can
   lose what, and how the player can question, refuse, test, protect or change
   it.
6. Write interaction hooks that give the player something to do besides
   admire, comfort or wait.
7. Fill the pressure table for a player who trusts, questions, resists, stays
   passive, sets a boundary or breaks trust. Refusal opens an alternate route.
8. Apply the matching repair from the reference, then state where each part
   lands: summary sells appeal and tension; definition keeps the chain, tells
   and pressure table; opening starts where the core becomes actionable;
   example conversations only if behavior cannot survive as rules.
9. Check the packet against the reference's checks and name the next skill.

## Hand-off

Give the next skill this packet:

```text
Character-core packet:
- current failure:
- appeal promise:
- character identity:
- desire / contradiction / boundary:
- mask, wound or need:
- player leverage:
- relationship asymmetry:
- pressure behavior (trust / question / resist / passive / boundary / betrayal):
- soft spots and hard limits:
- behavioral tells:
- interaction hooks:
- voice, opening and longplay implications:
- field targets (definition.md / welcome.md / card.json summary, talkExample):
- length tradeoff:
- next skill:
```

Route it to `hearthroom-card-blueprint` when world, voice or opening planning
is still needed; `hearthroom-relationship-architect` when pacing, flirting or
repair and rupture need design; `hearthroom-voice-director` when speaking
style or ensemble contrast is the gap; `hearthroom-card-author` when the
author wants the files written; `hearthroom-chat-simulation` when
`hearthroom play` transcripts show generic behavior.

## Do not

- Do not stop at labels such as shy, cold, gentle, chaotic, powerful or
  mysterious. Turn each into behavior under pressure.
- Do not decide the player's feelings, consent, attraction, loyalty or actions,
  and do not leave the player as an audience.
- Do not solve a thin character with more biography. Convert history into
  present pressure.
- Do not edit the card folder or run `hearthroom card push` or `hearthroom play`
  here.
- Do not borrow real people or existing cards. Definition originality is
  reviewed on submission.
