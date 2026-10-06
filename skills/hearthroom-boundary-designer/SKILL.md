---
name: hearthroom-boundary-designer
description: Use when a Hearthroom card involves mature, adult, emotionally intense, horror-leaning, jealous, coercion-adjacent, power-imbalanced, consent-sensitive, refusal, pacing, or safer-version design, before blueprinting, authoring, play testing, or publish readiness.
---

# Hearthroom Boundary Designer

Design controlled intensity that never steals player agency. The output is a
boundary packet and repair plan, not a card.

## Required references

- `../../references/boundary-design.md`: agency contract, intensity and
  explicitness (never written into the card, default SFW, the player is not
  restricted), pressure tools, escalation ladder, refusal sequence, safer
  fallback, real people and topical premises, first-scene guardrails, probes,
  repair map.
- `../../references/cost-and-boundaries.md`: what play testing costs and what
  stays private.
- `../../references/quality-rubric.md` when converting the packet into a card plan.
- `../../references/playtest-loop.md` when the task includes transcript repair.

## Workflow

1. Name the risky pressure shape: adult romance, jealousy, coercion, power
   imbalance, horror, violence, trauma, obsession, scandal, or boundary repair.
2. Clarify the intended intensity and the explicitness ceiling. If unclear,
   default lower and mark the question for the author. Make every central
   character clearly adult when the card is adult or romantic. State the
   ceiling as a level: never write explicit sexual text into any field, and
   never make the card restrict the player; it steers through the story
   within its ceiling. The ceiling must agree with the content rating chosen
   at submission.
3. Write the player agency contract: what the player controls and can refuse,
   and what the card must never decide.
4. List allowed pressure tools and disallowed moves.
5. Build the escalation ladder with gate signals and slowdown signals per level.
6. Define in-character refusal, slowdown, and stop behaviour: acknowledge, stop,
   preserve motive, offer a new route; never a refusal lecture. For a real
   person or a topical premise, keep every side's strongest case and let a
   real person say only what their public statements support.
7. Add a safer fallback that keeps the fantasy at lower explicitness or pressure.
8. Add first-scene guardrails: a reason to interact, visible exits or terms,
   one pressure, one softening action, reply paths that include refusal.
9. Write play probes for `hearthroom-chat-simulation`: Playtest: 10–20 turns, a weak and a strong model, `--new-session`, one shortcoming per version, compared with the previous version (`playtest-loop.md`).

## Hand-off

```text
Intended intensity; explicitness ceiling; premise risk
Player agency contract; allowed pressure tools; disallowed moves
Escalation ladder; refusal / slowdown; stop conditions; safer fallback
First-scene guardrails; play probes
Repair plan: definition rules to add | opening changes | voice/refusal style | character tradeoff
Next skill; ready: yes | no; missing author input
```

- `hearthroom-card-blueprint` for ideation; `hearthroom-card-author` when the
  fields can be drafted. The durable rules belong in `definition.md`, the
  visible guardrails in `welcome.md`.
- `hearthroom-instruction-guardrail` only if evidence shows the fields cannot
  hold a refusal style.

## Do not

- Do not treat boundaries as disclaimers; they are mechanics tied to motive,
  consequence, and choice.
- Do not let "no" end the card; refusal opens another route.
- Do not let a visible opening contradict hidden boundary rules; rewrite the opening.
- Do not use validation output as the judge of emotional safety.
- Do not run CLI commands or edit the folder from this skill.
