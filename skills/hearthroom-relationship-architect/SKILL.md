---
name: hearthroom-relationship-architect
description: Use when a Hearthroom companion, romance, friendship, rivalry, ex-partner, cohabitation, mentor, found-family or slow-burn card needs relationship dynamics, intimacy pacing, trust and friction state, repair and rupture routes, or a fix for generic flirting and comfort loops before blueprinting or writing fields.
---

# Relationship Architect

Use this skill when relationship play is the weak layer. Character core makes
the character memorable; this skill makes repeated interaction keep changing
without forcing intimacy or collapsing into comfort. The output is a
relationship-engine packet, not a full card, and it does not touch the card
folder.

## Required references

Read `../../references/relationship-engine.md` first. Read
`../../references/character-core-design.md` when the character still lacks
desire, contradiction, boundary or leverage. Read
`../../references/boundary-design.md` when jealousy, power imbalance or
intimacy pacing could blur player agency. Read
`../../references/platform-facts.md` for the fields the packet points at.

Use `hearthroom-daily-life-architect` instead when the blocker is ordinary
routine, a shared object or habit state and romance or repair is only an
overlay.

## Workflow

1. Diagnose the failure: generic flirting, comfort loop, rivalry as harmless
   banter, instant intimacy, flat daily life, cruel friction, passive
   character, refusal ending play, or the card deciding the player's feelings.
2. Confirm the relationship shape from the reference and the asymmetry the
   player can affect.
3. Build closeness states and friction states that change behavior, not
   decorative meters.
4. Define pacing gates, slowdown triggers, repair routes and rupture or
   distance routes. Every route continues play.
5. Fix agency boundaries: what the player controls, can refuse, can
   renegotiate, and what the card never decides.
6. Fill the reply-path matrix. Each path gets a different response, a state
   change and a renewed hook.
7. Add passive-player behavior, the second-turn relationship move and
   long-session renewal.
8. Decide whether example conversations are needed to teach reusable pressure
   behavior such as boundary refusal or rupture and repair.
9. Allocate fields, write play probes for `hearthroom play`, and name the
   next skill.

## Hand-off

Give the next skill this packet:

```text
Relationship-engine packet:
- current failure:
- relationship promise and shape:
- card type and shape:
- player position:
- relationship asymmetry:
- closeness states / friction states:
- pacing gates and slowdown triggers:
- repair routes / rupture or distance routes:
- player agency boundaries:
- interaction hooks:
- reply-path matrix:
- compact relationship state:
- passive-player behavior:
- second-turn relationship move:
- long-session renewal:
- example conversation decision:
- field allocation (summary / definition / opening / examples / presentation):
- length tradeoff:
- play probes:
- next skill:
```

Route it to `hearthroom-card-blueprint` when opening, voice or field planning
is still needed; `hearthroom-card-author` when the engine is ready;
`hearthroom-boundary-designer` for mature, jealous or coercion-adjacent
pressure; `hearthroom-chat-simulation` when `hearthroom play` transcripts show
comfort loops, ignored boundaries or forced intimacy and the author accepts
the credit cost.

## Do not

- Do not fix a weak relationship with prettier flirting. Add asymmetry, state,
  cost, repair, rupture and renewed hooks.
- Do not let the card decide the player's attraction, forgiveness, consent,
  loyalty, feelings or actions.
- Do not let slow burn mean nothing happens, rivalry mean cute banter, or
  comfort be the only route.
- Do not let refusal end play. Shift to distance, friendship, practical
  cooperation or delayed repair.
- Do not add long sample scenes unless they teach reusable behavior.
- Do not edit the card folder or run `hearthroom card push` or `hearthroom play`
  here.
