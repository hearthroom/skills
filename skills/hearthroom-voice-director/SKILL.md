---
name: hearthroom-voice-director
description: Use when a Hearthroom card task involves character voice, speaking style, generic dialogue, catchphrases, repeated phrasing, emotional tells, refusal style, behaviour consistency, whether example conversations are needed, blind-line checks, voice drift, or ensemble speakers blending together before authoring, a play turn, or publish readiness.
---

# Hearthroom Voice Director

Use this skill when the weak layer is how a character sounds and behaves in
dialogue. The output is a voice packet with patch targets, not a full card.

## Required references

- `../../references/voice-calibration.md`: voice card, catchphrase discipline,
  contrast matrix, blind-line test, response-mode grid.
- `../../references/character-core-design.md` when the voice fails because the
  motive, player leverage or pressure behaviour is missing.
- `../../references/talk-example-design.md` when deciding on examples.
- `../../references/prose-texture.md` when the voice rules are sound but the
  replies still tremble, stack adjectives, narrate the player's feelings or
  come back in one breathless register; the opening and samples are what the
  model copies, so patch them before adding another rule.
- `../../references/ensemble-card-design.md` when speakers blur because cast
  function or turn ownership is unclear.

## Workflow

1. Diagnose: generic assistant tone, mood labels instead of behaviour,
   catchphrase as identity, drift over long sessions, refusal that breaks
   character, exposition voice, ensemble blur, dialogue that decides the
   player's feelings, or a template register (ellipsis in every line,
   stacked adjectives, stock gestures) that the opening itself taught.
2. If the character has no desire, contradiction, boundary or player leverage,
   route to `hearthroom-character-core` first. Style cannot rescue a character
   with no pressure behaviour.
3. Choose the anchor: social surface, private motive, pressure behaviour, and
   what the voice hides.
4. Write an executable voice card: rhythm, vocabulary, address terms, tells,
   action beats, concealment, refusal style, never-says, and behaviour when
   the player is passive, resistant, trusting or setting a boundary.
5. For ensembles, build the contrast matrix first. Two speakers with the same
   want, rhythm, pressure move and leverage: merge or redesign one. Cast size
   or turn ownership problems go to `hearthroom-ensemble-director`.
6. Decide whether `talkExample` is needed. Prefer rules; add micro-samples
   only when rules will not hold the voice, and detail them with
   `hearthroom-talk-example-curator`.
7. Run the blind-line test and the five pressure probes (trust, question,
   resist, passive, boundary). Name patch targets by file and hand off.

## Output

```text
Voice packet:
- current failure / voice promise / speaker scope:
- prerequisite core repair:
- social surface / private motive / pressure behaviour:
- rhythm / vocabulary / address terms:
- tells / action beats / concealment:
- refusal style / never says / catchphrase policy:
- response modes: trusts | questions | resists | passive | sets a boundary
- ensemble contrast (if needed): speaker, want, fear, speech cue, pressure move, leverage
- talkExample decision and what pays for it:
- blind-line test: lines, pass criteria, risk
- patch targets: definition.md | welcome.md | card.json summary | card.json talkExample
- self-review: behaviour not adjectives, assistant phrases removed, refusal in
  character, player agency kept, speakers distinguishable, token trade
```

## Hand-off

- `hearthroom-card-blueprint` when premise, relationship, world or opening are
  still unplanned.
- `hearthroom-card-author` to apply patch targets, then
  `hearthroom card push --validate --json`.
- `hearthroom-chat-simulation` to test drift with
  `hearthroom play -m "…" --allow-spend --json`.
- `hearthroom-publish-readiness` when voice is the last blocker.

## Do not

- Do not stop at gentle, cold, witty or human-like; convert the feeling into
  rhythm, vocabulary, tells, refusals and action beats.
- Do not make a catchphrase the voice; it earns its place only if it changes
  under trust, resistance or pressure.
- Do not let the voice decide the player's feelings, consent or next action.
- Do not distinguish speakers by punctuation, accent or one quirk alone.
- Keep guidance and samples in the card's `language`; write originally.
