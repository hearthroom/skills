# Talk example design

Use this reference when a card needs a decision about `talkExample`: whether
to add example turns, and what a minimal sample should teach about voice,
format, refusal or state updates.

`talkExample` is a calibration field, not decorative dialogue. In `card.json`
it is a list of `{roleType: user|ai, content}` pairs.

```text
voice or format risk -> sample job -> minimal example -> token payment -> hand-off
```

## Decision

- `omit`: voice, pressure behaviour and format are clear from compact rules.
- `micro-samples`: one `user` line plus one `ai` reply teaches a reusable
  behaviour.
- `full examples`: only when a generator, helper or system card needs a
  complete output artifact, or a turn protocol cannot be learned from less.

Prefer omission, then micro-samples. Full examples are expensive and rare.

## When to add

- voice rules are coherent but an unusual rhythm may still drift
- ensemble speakers blur after cast and voice rules are already clear
- a generator card needs a stable output shape or revision style
- a game or system card needs turn protocol, state update or action
  resolution
- a play turn or review still shows generic replies after the usual repairs

Route away when the voice card itself is missing (voice calibration first),
the relationship, play, generator or ensemble engine is unresolved (repair
that first), the problem is register (language style), or the problem is
bloat (token architecture before samples).

## Sample jobs

| Job | A good sample teaches |
|---|---|
| Voice pressure | rhythm, address terms, concealment, refusal or boundary style |
| Ensemble contrast | who speaks, their pressure move, player leverage, contrast |
| Generator format | complete artifact shape, defaults, revision behaviour |
| Play protocol | action resolution, state update, resource cost, consequence |
| Relationship repair | acceptance, refusal, questioning, rupture or repair |

Do not repeat the opening. The `user` line may express a move; the `ai` reply
must leave the player's feelings, actions, consent and commitments alone.

## Token payment

Every sample needs a payment: cut repeated mood adjectives, cut lore that
does not change play, shorten catchphrase lists, replace long scenes with
micro-samples, move durable rules from samples into `definition.md`, remove
samples that restate the opening. If no payment exists, omit the sample and
tighten the voice card or engine rules instead. No separate limit for the
field is documented; keep samples short and check `tokenBudget` in
`hearthroom card push --validate --json`.

## Packet

```text
Talk-example packet:
- current request / prerequisite packets:
- decision: omit | micro-samples | full examples, and why
- samples: job, user content, ai content, what it teaches, what it must not
  decide for the player
- token payment: cut / move / compress
- placement: talkExample | definition.md | welcome.md
- hand-off:
```

## Quality checks

- each sample has one job
- sample lines are shorter than the rules they replace
- the `ai` reply changes state, pressure, voice, format or boundary behaviour
- nothing is copied from source dialogue or unprovided material
- no sample decides the player's feelings or actions
- samples match the card's language and register
- samples do not lock the card into one route
- the token payment is explicit
