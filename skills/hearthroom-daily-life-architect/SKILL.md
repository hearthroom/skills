---
name: hearthroom-daily-life-architect
description: Use when a daily-life, slice-of-life, quiet companion, neighbor, roommate, cafe, workplace or school card feels flat, comfort-only or passive and needs a playable routine engine with small desire, tiny disruption, shared object, habit state and second-turn change before blueprinting, authoring or play testing.
---

# Hearthroom Daily-Life Architect

Use this skill when the card is quiet or ordinary but still needs a playable
engine. The output is a daily-life packet: a repeatable routine with a small
desire, a tiny disruption, a shared object, habit state, player leverage and
renewed hooks. Most daily-life cards use `type` `companion` in `card.json`.

## Required references

Read `../../references/daily-life-design.md` first and
`../../references/platform-facts.md` for the card folder and the `play`
command. As needed: `../../references/character-core-design.md` when the
character lacks a small desire, contradiction or boundary;
`../../references/opening-design.md` for the first routine moment;
`../../references/longplay-design.md` when routine memory across sessions is
weak; `../../references/agency-design.md` when the player can only watch or
must comfort; `../../references/relationship-engine.md` only if romance
pacing is the primary blocker; `../../references/voice-calibration.md` when
quiet restraint drifts; `../../references/token-economy.md` when mood prose
or panels are bloated; `../../references/talk-example-design.md` for the
ordinary-turn sample.

Use `hearthroom-relationship-architect` instead when relationship state is the
main blocker and `hearthroom-scenario-architect` when an incident drives the
card.

## Workflow

1. Classify the shape and state the player role, the ordinary routine, the small playable desire and the tiny disruption.
2. Choose one shared object or place that can return changed later, and the sensory anchors.
3. Build the loop: ordinary routine, tiny disruption, player choice, small state change, next routine returns altered.
4. Pick the micro-tension (privacy, time, competence, boundary, memory, social friction, care cost) and define compact habit state.
5. Design at least three reply paths that change habit, object, trust, distance, boundary, mood, promise or next routine differently.
6. Name the romance posture and add passive-player behaviour that continues through action tied to the routine.
7. Design the opening moment, the expected first player message, the second-turn change and return-next-time hooks.
8. Set field allocation and token plan (one ordinary-turn sample at the card's usual closeness, never the confession), say which rule joins the iron rules and the recency checklist, write play probes, run the self-review.

## Hand-off

```text
Daily-life packet:
- current seed or failure:
- daily-life promise:
- card shape:
- player role:
- ordinary routine:
- small playable desire:
- tiny disruption:
- shared object / place:
- sensory anchors:
- player leverage:
- routine loop:
- micro-tension:
- habit state:
- reply paths:
- passive-player behaviour:
- boundary and romance posture:
- opening moment:
- expected first player message:
- second-turn change:
- long-session renewal:
- attention: which rule from this packet joins the top iron rules, and the matching line in the final recency checklist (they must agree; `prompt-attention-architecture.md`)
- field allocation:
- token plan:
- play probes (Playtest: 10–20 turns, a weak and a strong model, `--new-session`, one shortcoming per version, compared with the previous version (`playtest-loop.md`).):
- self-review:
- next skill:
```

Hand it to `hearthroom-card-blueprint` when concept, character core or voice
is still open; `hearthroom-card-author` when the packet is coherent and the
author wants files written and pushed; `hearthroom-opening-director` when the
first scene is still mood prose; `hearthroom-longplay-architect` when
return-next-time behaviour stays weak; `hearthroom-relationship-architect` when
romance pacing is the remaining blocker; `hearthroom-chat-simulation` after
push and validation when quiet play, boundaries or continuity need real turns.

## Do not

- Quiet is not empty. The character needs one small specific desire and a reason the moment starts now.
- A routine is not playable unless the player can help, refuse, ask, notice, fix, tease, leave, set terms or change the order.
- Do not repair quietness with melodrama unless the author asked for drama.
- Do not force romance. State the posture: friendship-first, slow-burn optional, non-romantic, cohabitation friction or another.
- Do not edit files, push or play from this skill.
