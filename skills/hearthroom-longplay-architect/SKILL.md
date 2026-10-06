---
name: hearthroom-longplay-architect
description: Use when a card's opening works but play dies after a few turns (dead third turn, repeated setup, stalled or passive loops, choices with no memory, lost state), or when the author wants multi-session arcs, progression, route seeds or replayability.
---

# Hearthroom Longplay Architect

Make a card sustain play after the opening: state, routes, memory and
character initiative, so that turn ten is still moving. The output is a
longplay packet and a `definition.md` patch, not a full card.

## Required references

Read `../../references/longplay-design.md` (continuity spine, progression
phases, route seeds, memory threads, initiative rows, renewal,
player-triggered endings, probes). From `../../references/platform-facts.md`:
no separate memory feature is documented, so continuity is rules in
`definition.md` plus what the character writes; durable lore goes in
Lorebook entries with keywords and names that say what they contain. Read
`../../references/state-economy-design.md` when the blocker is which state
to track, and the shape reference that matches the failure
(`../../references/relationship-engine.md`,
`../../references/daily-life-design.md`,
`../../references/play-engine-design.md`,
`../../references/ensemble-card-design.md`,
`../../references/agency-design.md`, `../../references/boundary-design.md`).

## Workflow

1. Name the failure: dead third turn, repeated setup, passive character,
   choices with no memory, flat relationship, lost state, stalled route, or a
   session that restarts from the premise. Keep a working opening; rewrite
   `welcome.md` only if the failure starts there.
2. Repair upstream first when the failure is there: a static routine to
   `hearthroom-daily-life-architect`, decorative choices to
   `hearthroom-agency-designer`, comfort loops or instant intimacy to
   `hearthroom-relationship-architect`, resource loops to
   `hearthroom-play-engineer`, cast-over-player to
   `hearthroom-ensemble-director`.
3. Write the continuity spine (which choice changes which pressure over
   time) and three to six progression phases with trigger, character
   behaviour, player leverage, unlocks and risks.
4. Fix the compact state model (`hearthroom-state-economist` when bloated,
   decorative or trigger-less).
5. Write two to four route seeds, each with trigger, pressure, leverage,
   unlock, cost, memory left behind and renewal hook.
6. Write memory threads, return-later behaviour and the initiative rows of
   the reply-path matrix (accepts, questions, resists, passive, changes
   route, returns later). Renew statelessly: one concrete change and one
   optional next station in each reply, never by turn count. Endings are
   player-triggered; a script that counts the player's lines needs
   `pageMode: sandbox`.
7. Write continuation probes with pass and fail signs, state the token
   trade, and name which rule joins the iron rules and the recency checklist.

## Checks

The character continues without the player carrying the plot; state changes
every few turns; routes have cost and memory; a later session restarts from
the unresolved hook; state stays compact. Continue with
`hearthroom-card-author` to write the engine into `definition.md` and lore
into `lorebook.json`, `hearthroom-chat-simulation` to run the continuation
probes, or `hearthroom-state-economist` / `hearthroom-presentation-director`
when state or the surface is the remaining blocker.

## Do not

- Do not solve longplay with more lore; add state, routes, memory and
  initiative.
- Do not track state that never changes a turn.
- Do not make routes linear unless the card is explicitly a scenario.
