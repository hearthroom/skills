---
name: hearthroom-scenario-architect
description: Use when a story, mystery, investigation, event, case-file, social-drama, rescue, trial or betrayal card needs stakes, branches, clue and reveal pacing, false leads, suspect pressure or consequence state, or when its routes funnel or it opens at a briefing desk, before authoring or playtesting.
---

# Hearthroom Scenario Architect

Give a story-first card a branchable incident with stakes, clues or
reveals, consequence state and player agency, never a fixed plot. Story
cards set `type` to `story`. The output is a scenario packet.

## Required references

Read `../../references/scenario-design.md`. Read the narrow reference only
when it is the blocker: `../../references/agency-design.md` (fake choices
or funnelled routes), `../../references/opening-design.md` (the opening
incident), `../../references/longplay-design.md` (several scenes),
`../../references/voice-calibration.md` (narrator or suspect voices),
`../../references/presentation-design.md` (the UI role),
`../../references/talk-example-design.md` (the ordinary-turn sample).
Mechanics as the blocker go to `hearthroom-play-engineer`; lore rather than
one incident to `hearthroom-world-engineer`.

## Workflow

1. State the player role, the ongoing incident, the stakes and the core
   question.
2. Build the spine (incident, player choice, pressure response, clue or
   cost or state change, renewed hook) and two to four branches with
   trigger, leverage, pressure response, clue or reveal, cost, state change
   and renewal hook; merge branches that land in the same state. A branch is
   real only if it changes clue, trust, risk, access, route or pressure.
3. Build the clue ladder (visible clue, contradiction, false lead, partial
   reveal, reversal, final pressure) and two to five suspect or pressure
   nodes with want, leverage, secret, pressure move and player effect, one
   named Lorebook entry per node. A false lead costs time, trust, access or
   public risk and still leaves a way back.
4. Define compact consequence state and route-funnel guardrails: what the
   card must not force, solve, reveal or decide.
5. Design the opening incident (the free demo: voice heard, one low-friction
   first action, a pull to turn two), the second-turn reveal that beats the
   first, passive-player behaviour and false-lead recovery.
6. Allocate fields, declare `uiRole`, name which branch rule joins the iron
   rules and the recency checklist, write play probes.

## Packet

Promise; player role; incident; stakes; core question; spine; branches; clue
ladder; suspect network; consequence state; opening incident; expected
first message; second-turn reveal; passive-player behaviour; false-lead
handling; guardrails; `uiRole`; field allocation; probes. Continue with
`hearthroom-card-blueprint` or `hearthroom-card-author` when coherent,
`hearthroom-opening-director` when the opening itself is the repair,
`hearthroom-longplay-architect` when later scenes lack memory, or
`hearthroom-chat-simulation` after push.

## Do not

- Do not decide the player's conclusion, guilt, trust, fear, consent or next
  action; pressure, accuse, warn, withhold, reveal or bargain instead.
- Do not open at a briefing desk; open at the incident.
