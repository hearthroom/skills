# Voice calibration

Use this reference when a card needs a stronger character voice, ensemble
contrast, or consistency over long sessions. Voice is how the player
recognises a character after many turns, even when the scene changes.

If the voice problem comes from a weak motive or missing player leverage,
repair the core first with `character-core-design.md`; voice rules cannot
compensate for a character with no pressure behaviour. Use
`talk-example-design.md` once rules exist and the question is whether
`talkExample` is needed.

## Core rule

Do not stop at adjectives such as gentle, cold, witty, natural or human-like.
They describe a feeling; they do not tell the model what to write. Turn each
voice into executable instructions:

- rhythm: sentence length, pauses, fragments, formality, repetition
- vocabulary: address terms, metaphors, technical words, slang, taboo words
- pressure behaviour: what the character says when cornered, refused,
  trusted or bored
- action beat: what the character does while speaking
- concealment: what the character avoids saying directly
- refusal style: how the character says no while staying in character

## Voice card

Write one compact voice card per main speaker and keep it in `definition.md`:

```text
Voice card: [name]
- social surface:
- private motive:
- rhythm:
- vocabulary:
- address terms:
- emotional tells:
- action beats:
- concealment:
- refusal style:
- never says:
- when the player is passive:
- when the player resists:
- when the player trusts them:
```

Keep it short enough to survive token pressure.

## Catchphrase discipline

A catchphrase can support a voice but cannot be the voice. Use one only when
it changes with pressure: habit when calm, softer or more honest under trust,
a deflection under resistance, gone or replaced by a clear refusal at a
boundary, revised or corrected under stress. A phrase in every reply is noise;
replace repetition with rhythm, vocabulary, action beats and decisions.

## Ensemble contrast matrix

For two to five core speakers, check contrast before writing the final card:

```text
Speaker | Wants | Fears | Speech cue | Pressure move | Player leverage
```

Two speakers with the same want, rhythm and pressure move: merge them or
redesign one. A cast member who cannot change the player's choices is scenery.

## Blind-line test

Write one anonymous line per core speaker and ask whether the speaker can be
identified without the name.

Pass: the line has a distinct rhythm or vocabulary, carries a motive or
pressure move, and does not rely on a catchphrase alone.

Fail: every speaker sounds like the narrator, differences are only
punctuation, accent or one repeated phrase, or the line could belong to any
other speaker.

## Response-mode grid

Use this to keep a voice stable when the player behaves unexpectedly:

```text
Player move     | Character response mode        | What changes
accepts hook    | how the character advances     | state or relationship
questions       | how it deflects or reveals     | new clue or risk
resists         | how it respects agency         | cost or route shift
is passive      | what it initiates              | new hook
pushes boundary | refusal style                  | safe continuation
```

## Calibration ladder

1. Core repair: desire, contradiction, boundary, player leverage, pressure
   behaviour.
2. Voice card.
3. Response-mode grid, including betrayal when relevant.
4. Blind-line test.
5. Micro-sample or `talkExample` through `talk-example-design.md`, only when
   rules still do not hold the voice.
6. A real turn with `hearthroom play -m "…" --allow-spend --json`, only after
   the card is pushed as a trial and the author accepts the credit cost.

## When `talkExample` helps

Use it when a rhythm is unusual and rules will not preserve it, a generator
card needs a stable output format, an ensemble needs one compact sample per
speaker, or a play turn showed drift or generic replies. Avoid it when it
repeats the opening, is worldbuilding disguised as dialogue, teaches the
model to decide the player's feelings, or locks the card into one route.

## Patch order

Patch voice when review or a play turn shows tone labels instead of
behaviour, a polished voice with no desire or leverage, a catchphrase that
never adapts, interchangeable speakers, a quiet character that stops
initiating, a comic character that becomes random, a mysterious character
that withholds everything and creates no clue, or a refusal that breaks
character or seizes the player's agency.

1. Add or tighten the voice card in `definition.md`.
2. Add response-mode rules for passive, resistant, trusting and
   boundary-pushing players.
3. Add one compact `talkExample` pair only if the voice still needs it.
4. Remove duplicate adjectives, lore and repeated catchphrases to pay for the
   added tokens.

## Token discipline

Keep voice cards for core speakers, one sample per difficult speaker, and the
response-mode rules that prevent drift. Cut synonyms for the same mood,
catchphrase lists, sample scenes that teach nothing reusable, and full-cast
dialogue when only one speaker needs calibration.
