---
name: hearthroom-opening-director
description: Use when a card's opening does not start play (greeting-only, mood without a task, lore before action, unclear first action, a dead second turn, an opening that is already the climax), when alternate openings or suggested first lines are needed, or when the author says "nobody sends a first message".
---

# Hearthroom Opening Director

Make the first screen start play. The opening is the free demo that earns
the first paid message (L2) and the first reply sample the model continues
from, so its voice, intensity and texture are copied more reliably than any
rule in the definition. The output is an opening packet and a `welcome.md`
draft, not a full card.

## Required references

Read `../../references/opening-design.md` (the beats, first reply path,
second-turn engine, mode recipes, failure repairs) and
`../../references/prose-texture.md`. From `../../references/platform-facts.md`:
`welcome.md` is the opening and `openings/alt-NN.md` are alternates
(`hearthroom play --new-session --greeting N` starts from one); `prologue`
in `card.json` holds player-side first lines, never the character's speech;
openings are plain text or plain HTML with inline styles; the opening limit
depends on the language (`tokenBudget.limits`). Read
`../../references/state-economy-design.md` for the status block's canonical
form, `../../references/agency-design.md` when the player can only watch,
and the shape reference when the engine is not coherent
(`../../references/daily-life-design.md`,
`../../references/play-engine-design.md`,
`../../references/generator-design.md`,
`../../references/ensemble-card-design.md`,
`../../references/boundary-design.md`).

## Workflow

1. Name the failure: greeting-only, lore before action, menu without scene,
   mood with no task, character waiting for the player, no player role, no
   pressure, too long, a second turn that can only restate the premise, or a
   first screen already at the climax. Ask only for what blocks the opening.
2. Repair upstream first and keep those packets: a flat routine to
   `hearthroom-daily-life-architect`, a manual-like game to
   `hearthroom-play-engineer`, a stalled intake to
   `hearthroom-generator-architect`, a roll call to
   `hearthroom-ensemble-director`, a spectator opening to
   `hearthroom-agency-designer`.
3. Build the beats: the summary's promise paid off, place and time, character
   action already happening, pressure, why the player matters, one
   low-friction first action, at least one line in the character's own
   voice. Plot-driven cards expose an external goal within two turns. When
   the card has a status block, the opening ends with it.
4. Write one expected first player message and decide whether it and two or
   three alternatives go into `prologue`. Choices are drafts: free text
   always works, and the first action may be a button but never only a
   button.
5. Write the character's second-turn move and what it changes: it pays off
   something the first screen planted, so turn two is better than turn one.
6. Choose plain text, or HTML when structure, choices or visible state help
   the first screen; layout questions go to `hearthroom-presentation-director`.
   A second starting situation gets its own `openings/alt-NN.md`; an
   alternate is a different situation, never the main opening reworded.
7. State the token trade (what stays, what moves to `definition.md` or a
   Lorebook entry, what is cut) and which rule joins the iron rules and the
   recency checklist.

## Checks

A reply is possible in under ten seconds; the character acts before the
player speaks; pressure is visible; two or more reply paths change different
things; the second turn pays off something planted; the summary's promise is
on the first screen; the player's feelings, consent and actions are left to
the player; texture sits at or below four on the card's own intensity scale,
at most two ellipses, objects before feelings, one dry line. Continue with
`hearthroom-card-author` to write `welcome.md`, the alternates and
`prologue`, `hearthroom-chat-simulation` to run the opening in a probe, or
`hearthroom-longplay-architect` when the opening works and play dies later.

## Do not

- Do not polish a greeting; replace it with a scene.
- Do not open on the climax; a first screen at full volume leaves turn two
  nothing to do but repeat it.
- Do not write suggested first lines as the character's speech.
