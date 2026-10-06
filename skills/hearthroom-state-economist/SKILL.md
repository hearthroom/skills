---
name: hearthroom-state-economist
description: Use when deciding which state or memory fields a card tracks, whether each is visible, hidden, volatile or a definition-only rule, how it updates and which decorative meters to drop, or when the author wants "a status bar" and nobody has asked what it is for.
---

# Hearthroom State Economist

The question is not "more state" but which state is worth paying for every
turn. The output is a state packet, not final fields and not a layout.

## Required references

Read `../../references/state-economy-design.md` (how state exists on
Hearthroom, the keep test, visibility including `volatile`, the canonical
status block, one owner per value, the overhead ratio, agency safety). Read
`../../references/longplay-design.md`, `../../references/play-engine-design.md`,
`../../references/presentation-design.md` or `../../references/agency-design.md`
when the blocker is progression, a game loop, the surface itself, or state
that decides for the player.

## Workflow

1. Say why state is wanted: longplay memory, route consequence, game
   resource, relationship pacing, scenario clue, daily-life habit, a status
   surface, or author confusion.
2. List candidates and reject decorative meters, duplicated prose and
   mood-only fields: a trust bar without an unlock or cost, a risk label
   that never fires, a route badge that leads to the same scene.
3. Classify each survivor `visible`, `hidden`, `volatile`, `definition-only`
   or `omit`. State is text the character writes in one `[status]` block at
   the end of each reply, drawn by a display rule and the sandbox kit; the
   model never sees the drawn result.
4. For each kept field (two to six) write its owner (the model in the block,
   or a script in `sdk.save`, never both), allowed values, update trigger,
   cadence, effect on character behaviour, effect on player options, token
   cost. Never store the player's feelings, consent, loyalty, guilt, desire,
   actions, confession or final route choice.
5. Put the contract in `outputContract` (or the definition): stable keys,
   allowed values, when each updates, the instruction to end every reply
   with the block; a long card repeats it in one short constant Lorebook
   entry. A bar only for a single current number (never a range or delta
   such as `8 -> 14`; never `<status>`, angle-bracket markers are stripped);
   text, enum, flag, phase and location fields are text, tags, a path or a
   list. The contract's example is the most ordinary turn. Place the block
   once at the end of `welcome.md`; `hearthroom-sandbox-kit` builds the
   rule. Player-facing state that matters over a long chat gets a visible
   surface, not only a hidden line.
6. Write verification probes (what a 10–20-turn run on a weak model should
   show; the overhead ratio from `card check --replay`) and name which rule
   joins the iron rules and the recency checklist.

## Packet

State need; `uiRole` and threshold; status surface per field; kept fields
with owner, values, trigger, cadence, effects, cost; omitted fields and
why; placement; agency guardrails; probes. Continue with
`hearthroom-longplay-architect` or `hearthroom-play-engineer` when state
serves continuation or a game loop, `hearthroom-sandbox-kit` to build the
rules, `hearthroom-card-author` to write the contract and the opening, or
`hearthroom-chat-simulation` to watch real updates.

## Do not

- Do not invent state because a panel would look richer.
- Do not keep the same value in the block and in a script's save.
