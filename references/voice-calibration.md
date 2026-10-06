# Voice calibration

Use this reference when a card needs a stronger character voice, ensemble
contrast, or consistency over long sessions. Voice is how the player
recognises a character after many turns, even when the scene changes.

Voice rules live in the definition; the register the model actually copies
lives in the opening and the samples. When a voice card is sound but the
replies still tremble, stack adjectives or narrate the player's feelings, the
sample is teaching the wrong thing: fix it with `prose-texture.md` before
adding rules.

If the voice problem comes from a weak motive or missing player leverage,
repair the core first with `character-core-design.md`; voice rules cannot
compensate for a character with no pressure behaviour. Examples beat rules
for weak models: one ordinary-turn sample by default
(`talk-example-design.md`); the sample sets what rules cannot.

## Core rule

Do not stop at adjectives such as gentle, cold, witty, natural or human-like.
They describe a feeling; they do not tell the model what to write. Turn each
voice into executable instructions:

- rhythm: sentence length, pauses, fragments, formality, repetition
- vocabulary: address terms, technical words, slang, taboo words. Metaphor
  density is set by the opening and the sample, not by a rule: DeepSeek V4
  Flash over-uses metaphors whatever the definition says; write the samples
  with zero or one simile per screen and never add a "fewer metaphors" rule
  in place of fixing the sample
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
- says instead: (one line showing what replaces the tic)
- when the player is passive:
- when the player resists:
- when the player trusts them:
```

Eight lines or fewer. One line of it joins the top iron rules and the final
recency checklist (they must agree; `prompt-attention-architecture.md`).

## Catchphrase discipline

A catchphrase can support a voice but cannot be the voice. It is rationed,
not banned: say how often (once per scene; never in every line of the
sample) and how it changes with pressure: habit when calm, softer or more
honest under trust, a deflection under resistance, gone or replaced by a
clear refusal at a boundary. Never use it as a Lorebook keyword: the
character says it every turn and the entry becomes permanent
(`world-engine-design.md`).

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

## Response modes

To keep a voice stable when the player behaves unexpectedly, fill the
reply-path matrix in `agency-design.md` with these rows: accepts the hook
(how the character advances), questions (how it deflects or reveals),
resists (how it respects agency), is passive (what it initiates), pushes a
boundary (refusal style).

## Calibration ladder

1. Core repair: desire, contradiction, boundary, player leverage, pressure
   behaviour.
2. Voice card.
3. Response modes, including betrayal when relevant.
4. Blind-line test.
5. One ordinary-turn sample in the voice (`talk-example-design.md`).
6. Playtest: 10–20 turns, a weak and a strong model, `--new-session`, one
   shortcoming per version, compared with the previous version
   (`playtest-loop.md`).

## Patch order

Patch voice when review or a play turn shows tone labels instead of
behaviour, a polished voice with no desire or leverage, a catchphrase that
never adapts, interchangeable speakers, a quiet character that stops
initiating, a comic character that becomes random, a mysterious character
that withholds everything and creates no clue, or a refusal that breaks
character or seizes the player's agency.

One patch per version, retested on the same probes:

1. Fix the sample first (the opening or `talkExample`): the model copies it.
2. Add or tighten the voice card in `definition.md`.
3. Add response-mode rows for passive, resistant, trusting and
   boundary-pushing players.
4. Remove duplicate adjectives, lore and repeated catchphrases to pay for the
   added tokens.

## Token discipline

Keep voice cards for core speakers, one sample per difficult speaker, and the
response-mode rules that prevent drift. Cut synonyms for the same mood,
catchphrase lists, sample scenes that teach nothing reusable, and full-cast
dialogue when only one speaker needs calibration.
