---
name: hearthroom-talk-example-curator
description: Use when Hearthroom card work focuses on the talkExample field, including whether example conversations are needed, micro-sample design, dialogue samples, example turns, sample token cost, voice or format examples, generator output examples, or game turn examples before final field assembly, a play turn, or publishing.
---

# Hearthroom Talk Example Curator

Use this skill when the open question is whether `talkExample` is needed and
what a compact sample should teach. The output is a talk-example packet.

## Required references

- `../../references/talk-example-design.md`: decision set, sample jobs, token
  payment, quality checks.
- `../../references/platform-facts.md`: `talkExample` in `card.json` is a list
  of `{roleType: user|ai, content}` pairs.
- `../../references/voice-calibration.md`, `../../references/generator-design.md`
  or `../../references/play-engine-design.md` when the sample teaches voice, an
  output format, or a turn protocol.

## Workflow

1. Confirm prerequisites. Unresolved voice, relationship, play, generator,
   ensemble or language rules go to their skill before any sample.
2. Choose `omit`, `micro-samples` or `full examples`.
3. Give each sample one job: voice under pressure, ensemble contrast,
   generator format, play protocol, or relationship repair.
4. Draft the minimal shape: one `user` line, one `ai` reply.
5. State what the sample must not decide for the player.
6. Name the token payment: what is cut, moved to `definition.md` or a Lorebook
   entry, or compressed. No separate limit for the field is documented; keep samples
   short and check `tokenBudget` in `hearthroom card push --validate --json`.

## Output

```text
Talk-example packet:
- current request / prerequisite packets:
- decision: omit | micro-samples | full examples, and why
- samples: job, user content, ai content, what it teaches, what it must not
  decide for the player
- token payment: cut / move / compress
- placement: talkExample | definition.md | welcome.md
- self-review: each sample has a job, decision minimal, nothing copied, no
  repeat of the opening, player agency kept, register matches the card's language
```

## Hand-off

- `hearthroom-voice-director` when voice rules are missing.
- `hearthroom-generator-architect`, `hearthroom-play-engineer`,
  `hearthroom-relationship-architect` or `hearthroom-ensemble-director` when
  the sample would invent unresolved engine behaviour.
- `hearthroom-token-architect` when samples are too long or unpaid.
- `hearthroom-card-author` to write the pairs into `card.json`, then
  `hearthroom card push --validate --json`.

## Do not

- Do not add examples when compact rules are enough.
- Do not use full examples outside generator, helper or system formats.
- Do not replay the opening or teach one route.
- Do not write the player's inner state or commitments in the `ai` reply.
- Do not copy source dialogue.
