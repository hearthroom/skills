---
name: hearthroom-play-engineer
description: Use when a card is an RPG, adventure, survival, investigation, simulator or any game with stats, resources, inventory, quests, combat or a turn protocol, or when such a card reads like a rule manual, forgets its state or lets failure end play, before authoring or playtesting.
---

# Hearthroom Play Engineer

Turn stat sheets and manuals into compact loops the model can run every
turn. Play cards set `type` to `game`. The output is a play-engine packet,
not card files.

## Required references

Read `../../references/play-engine-design.md` and
`../../references/state-economy-design.md` (the status block). Read the
narrow reference only when it is the blocker:
`../../references/system-intake-card-design.md` (an intake console),
`../../references/world-engine-design.md` (factions and locations),
`../../references/longplay-design.md` (route memory),
`../../references/agency-design.md` (the system controls the player),
`../../references/opening-design.md` (a manual-like first screen),
`../../references/presentation-design.md` (`uiRole` and the five jobs of
UI), `../../references/sandbox-kit.md` (how the block is drawn),
`../../references/talk-example-design.md` (the ordinary-turn sample).

## Workflow

1. Name the failure: manual opening, stats that never matter, resources
   without consequences, decorative inventory, forgotten state updates,
   failure that ends or vanishes, combat that swamps play, quests with no
   cost or memory. Choose the smallest scope: light adventure,
   investigation, RPG/open-world, survival/horror, simulator/management.
2. Define player position and controls (enter, risk, spend, refuse, retreat,
   investigate, bargain, unlock, hide) and what the card must not decide
   (feelings, courage, loyalty, consent, memories, future actions).
3. Write the core loop and a compact state model: two to six visible fields
   (`hearthroom-state-economist`), a few hidden flags in the definition, one
   owner per value, and the `[status]` block every reply ends with, declared
   in the output contract and present once in the opening.
4. Define resource rules and two or three quest or risk routes with trigger,
   approaches, pressure, cost, risk, reward, failure-forward outcome and
   renewed hook; then the turn protocol, failure-forward behaviour,
   lethal-route warnings and progression phases. Choices are drafts: a tap
   fills the composer, only a one-tap default start sends.
5. Declare `uiRole` and the status overhead threshold, and the opening
   contract: what the block shows, which values are volatile, that the kit
   draws it inside the bubble. Setup controls on the first screen follow the
   console pattern in `system-intake-card-design.md`.
6. Allocate fields, name which rule joins the iron rules and the recency
   checklist, write the play probes.

## Checks

Every stat changes a choice; the status block updates each reply and is
intact at the last turn; resources cost something; failure never dead-ends;
the opening is playable before it explains; tokens favour rules over lore.
Continue with `hearthroom-card-author` when coherent,
`hearthroom-opening-director` when the first screen still reads like a
manual, `hearthroom-sandbox-kit` to build the panel, or
`hearthroom-chat-simulation` after push.

## Do not

- Do not fix an RPG with a bigger rulebook; cut to what the model can run
  every turn.
- Do not let the opening explain the whole game; one playable setup or
  crisis.
- Do not write the player's next action or interior state; pressure, warn,
  tempt, block or price a route instead.
