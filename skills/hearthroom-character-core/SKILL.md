---
name: hearthroom-character-core
description: Use when a Hearthroom card's character feels thin, generic or trope-only and needs desire, contradiction, boundary, mask or wound, player leverage, relationship asymmetry, pressure behaviour or interaction hooks before blueprinting, writing the definition, voice, opening, longplay or play testing.
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
3. Choose one to three appeal axes and convert each into behaviour with the
   transforms table. "Cold" becomes a refusal style, a soft spot and a
   pressure move.
4. Build the chain: desire, contradiction, boundary, mask or wound, player
   leverage, pressure behaviour. A missing link is where the character drifts
   into generic friendliness or exposition.
5. Define asymmetry: who knows, needs, owes, risks, controls, hides or can
   lose what, and how the player can question, refuse, test, protect or change
   it.
6. Write interaction hooks that give the player something to do besides
   admire, comfort or wait.
7. Fill the reply-path matrix in `agency-design.md` with the rows trusts,
   questions, resists, passive, sets a boundary, breaks trust. Refusal opens
   an alternate route.
8. Write only the appearance that deviates from the default picture (hide the
   name: still recognisable?); delete any backstory line the character would
   act the same without.
9. Apply the matching repair from the reference, then state where each part
   lands: summary sells appeal and tension; definition keeps the chain, tells
   and pressure rows; opening starts where the core becomes actionable;
   `talkExample` shows one ordinary turn in this voice (examples beat rules
   for weak models: `talk-example-design.md`).
10. Check the packet against the reference's checks and name the next skill.

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
- pressure behaviour (trust / question / resist / passive / boundary / betrayal):
- soft spots and hard limits:
- behavioural tells; appearance that deviates from the default:
- interaction hooks:
- attention: which rule from this packet joins the top iron rules, and the
  matching line in the final recency checklist (`prompt-attention-architecture.md`):
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
`hearthroom play` transcripts show generic behaviour.

## Do not

- Do not stop at labels such as shy, cold, gentle, chaotic, powerful or
  mysterious. Turn each into behaviour under pressure.
- Agency guardrails: `agency-design.md`.
- Do not solve a thin character with more biography. Convert history into
  present pressure.
- Do not edit the card folder or run `hearthroom card push` or `hearthroom play`
  here.
- Do not borrow real people or existing cards. Definition originality is
  reviewed on submission.
