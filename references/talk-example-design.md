# Talk example design

Use this reference when a card needs a decision about `talkExample`: what the
sample must teach about voice, format and state, and what it must never show.

`talkExample` is a calibration field, not decorative dialogue. In `card.json`
it is a list of `{roleType: user|ai, content}` pairs.

```text
format and voice risk -> sample job -> the ordinary turn -> token payment -> hand-off
```

## Examples beat rules

`talkExample` is the strongest instruction a weak model receives: it copies
the sample's length, register, metaphor density and format every turn. Write
one sample of the ordinary turn — a plain player line and a full-length,
full-format reply, including the status block if the card has one — whenever
the card has an output format, a distinctive register or a weak-model target.
Rules describe the rare turn (the rupture, the confession, the ending); the
sample shows the common one, and never a rare event, because a rupture sample
teaches a rupture every turn. Omit samples only when a weak-model playtest and
a strong-model playtest both hold format and voice without them. Metaphor
density and catchphrase frequency are set by the sample, not by a rule: a
"fewer metaphors" rule does not move DeepSeek V4 Flash; a sample with one
simile per screen does.

## Decision

- `one ordinary turn` (default): a plain `user` line and the `ai` reply the
  card should give on an unremarkable turn, at the target length, in the
  target register, ending with the status block when the card has one.
- `a second sample`: only for a pressure case the rules alone keep getting
  wrong in playtest (a refusal, a turn protocol, an ensemble hand-over).
- `omit`: only when both a weak-model and a strong-model playtest hold format
  and voice without a sample.

A generator, helper or system card's sample is one complete ordinary
artifact, since the artifact's shape is the format.

## Sample jobs

| Job | A good sample teaches |
|---|---|
| Format floor | an ordinary turn, exactly as every reply should end: the prose, then the status block |
| Voice | rhythm, address terms, the one simile per screen, what the character says instead of the tic |
| Ensemble contrast | who speaks, their pressure move, player leverage, contrast, at the card's usual temperature |
| Generator format | the complete artifact shape, defaults, revision behaviour |
| Play protocol | one ordinary action resolved: state update, resource cost, consequence |
| Relationship texture | an ordinary exchange at the card's usual closeness: one small move, one small state change; never the rupture, confession or repair beat, which stay in the definition's rules |

Do not stage the move a player is most likely to make first (the canonical
fix, the obvious offer): a strong model replays the sample almost word for
word when the player makes it. Do not repeat the opening scene, and do not use the same situation as the
opening's first step: weak models copy it word for word. The `user` line may
express a move; the `ai` reply must leave the player's feelings, actions,
consent and commitments alone.

## Token payment

The `ai` sample is the length and shape of an ordinary target reply, so it
costs what a reply costs. Pay for it by cutting repeated mood adjectives, lore
that does not change play, catchphrase lists and rules the sample now
demonstrates. No limit or per-field count for `talkExample` is documented, and
`tokenBudget` in `card push --validate --json` does not report it; count its
characters yourself and keep the total below the opening's.

## Packet

```text
Talk-example packet:
- current request / prerequisite packets:
- decision: one ordinary turn | second sample (pressure case) | omit, and why
- samples: job, user content, ai content, what it teaches, what it must not
  decide for the player
- token payment: cut / move / compress
- placement: talkExample | definition.md | welcome.md
- attention: which rule the sample demonstrates so it can leave the iron rules
  (`prompt-attention-architecture.md`)
- hand-off:
```

## Quality checks

- the sample shows an ordinary turn, not a climax, and ends with the status
  block when the card has one
- the `ai` reply is the length and format every reply should have
- nothing is copied from source dialogue or unprovided material
- no sample decides the player's feelings or actions
- samples match the card's language and register
- samples do not lock the card into one route
- the token payment is explicit
- Playtest: 10–20 turns, a weak and a strong model, `--new-session`, one
  shortcoming per version, compared with the previous version
  (`playtest-loop.md`)
