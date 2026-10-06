---
name: hearthroom-talk-example-curator
description: Use when Hearthroom card work focuses on the talkExample field, including whether example conversations are needed, micro-sample design, dialogue samples, example turns, sample token cost, voice or format examples, generator output examples, or game turn examples before final field assembly, a play turn, or publishing.
---

# Hearthroom Talk Example Curator

Use this skill when the open question is what the `talkExample` sample must
teach and what it must never show. Examples beat rules for weak models: one
ordinary-turn sample by default (`talk-example-design.md`). The output is a
talk-example packet.

## Required references

- `../../references/talk-example-design.md`: examples beat rules, decision,
  sample jobs, token payment, quality checks.
- `../../references/platform-facts.md`: `talkExample` in `card.json` is a list
  of `{roleType: user|ai, content}` pairs.
- `../../references/voice-calibration.md`, `../../references/generator-design.md`
  or `../../references/play-engine-design.md` when the sample teaches voice, an
  output format, or a turn protocol.

## Workflow

1. Confirm prerequisites. Unresolved voice, relationship, play, generator,
   ensemble or language rules go to their skill before any sample.
2. Choose `one ordinary turn` (default), `a second sample` for a pressure
   case the rules keep getting wrong, or `omit` only when both a weak-model
   and a strong-model playtest hold format and voice without it.
3. Give each sample one job: format floor, voice, ensemble contrast,
   generator format, play protocol, or relationship texture (an ordinary
   exchange; never the rupture or the repair).
4. Draft the shape: one plain `user` line, one `ai` reply at the length and
   format every reply should have, ending with the status block when the
   card has one, in a different situation from the opening's first step.
5. State what the sample must not decide for the player.
6. Name the token payment: what is cut, moved to `definition.md` or a Lorebook
   entry, or compressed. No limit or per-field count for `talkExample` is
   documented, and `tokenBudget` does not report it; count the characters
   yourself and keep the total below the opening's.

## Output

```text
Talk-example packet:
- current request / prerequisite packets:
- decision: one ordinary turn | second sample (pressure case) | omit, and why
- samples: job, user content, ai content, what it teaches, what it must not
  decide for the player
- token payment: cut / move / compress
- placement: talkExample | definition.md | welcome.md
- self-review: each sample has a job, the sample is an ordinary turn (not a
  climax), nothing copied, not the opening's situation, player agency kept,
  register matches the card's language
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

- Do not show a rare event (rupture, confession, reward, ending) as the
  sample; a weak model plays it every turn.
- Do not replay the opening or teach one route.
- Do not write the player's inner state or commitments in the `ai` reply.
- Do not copy source dialogue.
