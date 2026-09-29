---
name: hearthroom-longplay-architect
description: Use when a Hearthroom card task involves long-term playability, replayability, multi-session arcs, route seeds, progression, memory and state, scene continuation, cards that die after the first few turns, passive or stalled loops, relationship pacing, game state, or making choices matter beyond the opening.
---

# Hearthroom Longplay Architect

Use this skill when the opening works but the card cannot sustain play. The
output is a longplay packet and a `definition.md` patch, not a full card.

## Required references

- `../../references/longplay-design.md`: continuity spine, progression phases,
  route seeds, memory threads, initiative table, renewal, probes.
- `../../references/state-economy-design.md` when the blocker is which state to
  track; use `hearthroom-state-economist` first when it is unresolved.
- `../../references/platform-facts.md`: no separate memory feature is
  documented, so continuity is rules in `definition.md` plus what the character
  writes; durable lore goes in Lorebook entries with keywords, few and short
  constant entries, names that say what they contain (agent mode reads entries
  by name and content); probe with `hearthroom play -m "…" --allow-spend --json`
  and `--history`.
- The shape reference that matches the failure:
  `../../references/relationship-engine.md`, `../../references/daily-life-design.md`,
  `../../references/play-engine-design.md`, `../../references/ensemble-card-design.md`,
  `../../references/agency-design.md`, `../../references/boundary-design.md`.

## Workflow

1. Name the failure: dead third turn, repeated setup, passive character,
   choices with no memory, flat relationship, lost state, stalled route, or a
   session that restarts from the premise.
2. Preserve a working opening. Rewrite `welcome.md` only if the failure starts
   there.
3. Repair the engine first when the failure is upstream: static daily-life
   routine to `hearthroom-daily-life-architect`; decorative choices or route
   funnelling to `hearthroom-agency-designer`; comfort loops, instant intimacy
   or rivalry without repair to `hearthroom-relationship-architect`; resource
   or turn loops to `hearthroom-play-engineer`; cast-over-player to
   `hearthroom-ensemble-director`. Preserve their packets.
4. Write the continuity spine: which choice changes which pressure over time.
5. Build three to six progression phases with trigger, character behaviour,
   player leverage, unlocks and risks.
6. Fix the compact state model. Bloated, decorative or trigger-less state goes
   to `hearthroom-state-economist` before continuing.
7. Write two to four route seeds, each with trigger, pressure, leverage,
   unlock, cost, memory left behind and renewal hook.
8. Write memory threads, return-later behaviour, and the initiative table for
   accepting, questioning, resisting, passive, route-changing and returning
   players.
9. Write continuation probes with pass and fail signs, state the token trade,
   and hand off.

## Output

```text
Longplay packet:
- current failure / longplay promise / card shape:
- continuity spine:
- progression phases:
- state model:
- route seeds:
- memory threads:
- initiative table / passive and stalled behaviour:
- scene renewal rules:
- continuation probes:
- patch targets: definition.md | lorebook.json | welcome.md
- token trade:
- self-review: character continues without the player carrying plot, state
  changes every few turns, routes have cost and memory, a later session
  restarts from the unresolved hook, player agency kept, state compact
```

## Hand-off

- `hearthroom-card-author` to write the engine into `definition.md` and lore
  into `lorebook.json`, then `hearthroom card push --validate --json`.
- `hearthroom-chat-simulation` to run the continuation probes.
- `hearthroom-state-economist`, `hearthroom-play-engineer` or
  `hearthroom-presentation-director` when state, the game loop or the surface
  is the remaining blocker.

## Do not

- Do not solve longplay with more lore; add state, routes, memory and
  initiative.
- Do not create decorative meters or track state that never changes a turn.
- Do not make routes linear unless the card is explicitly a scenario.
- Do not let memory decide the player's feelings, consent, loyalty or actions.
- Do not enforce renewal by turn count; renew statelessly with one concrete
  change and one optional next station in each reply.
- Do not summarise away a state packet's visibility, cadence, omissions,
  guardrails or placement.
