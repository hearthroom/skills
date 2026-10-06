---
name: hearthroom-talk-example-curator
description: Use when the talkExample field is the question (whether example conversations are needed, what one sample must teach, dialogue, format, generator or game-turn examples, their token cost), or when a weak model keeps breaking format or voice and a sample would hold it better than another rule.
---

# Hearthroom Talk Example Curator

Decide what the `talkExample` sample must teach and what it must never
show. Examples beat rules for weak models: one ordinary-turn sample by
default, because the model copies the sample every turn. The output is a
talk-example packet.

## Required references

Read `../../references/talk-example-design.md` (the decision, sample jobs,
token payment, quality checks). From `../../references/platform-facts.md`:
`talkExample` in `card.json` is a list of `{roleType: user|ai, content}`
pairs. Read `../../references/voice-calibration.md`,
`../../references/generator-design.md` or
`../../references/play-engine-design.md` when the sample teaches voice, an
output format or a turn protocol.

## Workflow

1. Unresolved voice, relationship, play, generator, ensemble or language
   rules go to their skill before any sample.
2. Choose one ordinary turn (default), a second sample for a pressure case
   the rules keep getting wrong, or omit only when both a weak-model and a
   strong-model playtest hold format and voice without it.
3. Give each sample one job: format floor, voice, ensemble contrast,
   generator format, play protocol, or relationship texture (an ordinary
   exchange, never the rupture or the repair).
4. Draft the shape: one plain `user` line, one `ai` reply at the length and
   format every reply should have, ending with the status block when the
   card has one, in a different situation from the opening's first step,
   deciding nothing for the player.
5. Name the token payment: what is cut, moved to `definition.md` or a
   Lorebook entry, or compressed. No limit for `talkExample` is documented
   and `tokenBudget` does not report it; count the characters and keep the
   total below the opening's.

Continue with `hearthroom-voice-director` when voice rules are missing,
the engine skill when the sample would invent unresolved behaviour,
`hearthroom-token-architect` when samples are too long, or
`hearthroom-card-author` to write the pairs into `card.json`.

## Do not

- Do not show a rare event (rupture, confession, reward, ending) as the
  sample; a weak model plays it every turn.
- Do not replay the opening or teach one route.
- Do not copy source dialogue.
