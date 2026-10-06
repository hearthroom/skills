---
name: hearthroom-relationship-architect
description: Use when a companion, romance, friendship, rivalry, ex-partner, cohabitation, mentor, found-family or slow-burn card needs relationship dynamics, intimacy pacing, trust and friction state or repair and rupture routes, or when it drifts into generic flirting, comfort loops or instant intimacy.
---

# Relationship Architect

Make repeated interaction keep changing without forcing intimacy or
collapsing into comfort. Character core makes the character memorable; this
skill makes the relationship move. The output is a relationship-engine
packet; it does not touch the card folder.

## Required references

Read `../../references/relationship-engine.md`. Read
`../../references/character-core-design.md` when the character still lacks
desire, contradiction, boundary or leverage, and
`../../references/boundary-design.md` when jealousy, power imbalance or
intimacy pacing could blur player agency. When the blocker is ordinary
routine, a shared object or habit state, use
`hearthroom-daily-life-architect` instead.

## Workflow

1. Name the failure: generic flirting, comfort loop, rivalry as harmless
   banter, instant intimacy, cruel friction, passive character, refusal
   ending play, or the card deciding the player's feelings.
2. Confirm the relationship shape and the asymmetry the player can affect;
   write the relationship as one concrete image the model can reuse.
3. Build closeness and friction states that change behaviour (signed
   movement both ways, never decorative meters), pacing gates, slowdown
   triggers, repair routes and rupture or distance routes. Every route
   continues play: refusal shifts to distance, friendship, practical
   cooperation or delayed repair.
4. Fix agency boundaries (controls, can refuse, can renegotiate, the card
   never decides) and fill the relationship rows of the reply-path matrix:
   each path gets a different response, a state change and a renewed hook.
5. Add passive-player behaviour, the second-turn relationship move and
   long-session renewal.
6. Write one `talkExample` of an ordinary exchange at the card's usual
   closeness, never the rupture, confession or repair (a weak model plays
   the sample every turn). Allocate fields; alternate openings are different
   situations, not the same scene at another closeness. Write play probes
   and name which rule joins the iron rules and the recency checklist.

## Packet

Failure; promise and shape; player position; asymmetry; closeness and
friction states; pacing gates; repair and rupture routes; agency boundaries;
hooks; reply-path rows; compact state; the one image; passive-player
behaviour; second-turn move; renewal; the sample; field allocation; probes.
Continue with `hearthroom-card-blueprint`, `hearthroom-card-author`,
`hearthroom-boundary-designer` for mature or coercion-adjacent pressure, or
`hearthroom-chat-simulation` when transcripts show comfort loops or forced
intimacy.

## Do not

- Do not fix a weak relationship with prettier flirting; add asymmetry,
  state, cost, repair, rupture and renewed hooks.
- Do not let slow burn mean nothing happens, rivalry mean cute banter, or
  comfort be the only route.
