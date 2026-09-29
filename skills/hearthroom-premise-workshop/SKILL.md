---
name: hearthroom-premise-workshop
description: Use when a Hearthroom card starts from no settled premise, only a mood, trope, aesthetic, genre cluster or "make it popular" request, or when the author wants to brainstorm, open up or compare directions before choosing a card type, blueprinting or writing any field.
---

# Premise Workshop

Use this skill at the earliest creative stage, before `hearthroom-card-blueprint`.
The output is a premise packet: three contrasted playable directions and one
recommendation. It is not final fields and it does not touch the card folder.

## Required references

Read `../../references/premise-workshop.md` first. Read
`../../references/archetype-contracts.md` when the directions need a primary
contract comparison. Read `../../references/platform-facts.md` for the four card
types and the field names the packet points at.

## Workflow

1. Restate the author's seed as a taste brief, not as a finished premise.
2. Confirm this is premise work. Continue only if no character, player position,
   first scene or primary contract is settled. A concrete premise that needs
   fields goes to `hearthroom-card-author`; one explicit weak layer goes to the
   narrow skill for that layer.
3. Ask at most two questions, and only when the missing choice blocks every
   useful direction. Otherwise state assumptions and proceed.
4. Name three to five taste axes that will shape the directions.
5. Propose exactly three directions that differ by primary contract, player
   position, first scene, core loop and risk, not only by aesthetics: the
   safest, the boldest, and the most unusual that is still controllable.
6. Pressure-test each: first reply clarity, player leverage, what changes after
   the first reply, likely failure mode, best next skill.
7. Run the five-second gate from the reference on each direction. Repair any
   direction that fails before recommending it.
8. Recommend one direction and say why it is more playable than the generic or
   abstract version. If the author is stuck, still recommend.
9. Fill the packet and name the next skill.

## Hand-off

Give the next skill this packet:

```text
Premise packet:
- current seed:
- author taste signals:
- assumptions and questions asked:
- taste axes:
- direction 1 / 2 / 3, one block each:
  - title:
  - audience-legible pitch:
  - primary contract (card type and shape):
  - player position:
  - character seed:
  - first scene:
  - core loop:
  - what changes after the first reply:
  - involvement ladder:
  - tradeoff / risk:
  - best next skill:
- recommendation and why it wins:
- rejected or delayed ideas:
- risk flags:
- next decisions to lock:
- next skill:
```

Route it to `hearthroom-archetype-director` when the next step is choosing the
card type or limiting a hybrid; to `hearthroom-card-blueprint` when the author
accepts a direction and needs full planning; to `hearthroom-character-core`,
`hearthroom-relationship-architect`, `hearthroom-world-engineer`,
`hearthroom-daily-life-architect`, `hearthroom-scenario-architect`,
`hearthroom-agency-designer` or `hearthroom-boundary-designer` when the chosen
direction is blocked by that one layer; to `hearthroom-card-author` only when
the author explicitly asks to write the files now.

## Do not

- Do not write `definition.md`, `welcome.md` or `card.json` here, and do not
  run `hearthroom card push` or `hearthroom play`.
- Do not let a poetic institution, object, ritual or mood stand in for a
  premise. Attach the novelty to a familiar shelf.
- Do not turn "popular" or "top-tier" into performance claims. Translate them
  into craft goals.
- Do not assume romance is central unless the author says so.
- Do not offer more than three directions or end with only questions.
