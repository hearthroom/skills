---
name: hearthroom-language-stylist
description: Use when a Hearthroom card task focuses on language consistency, such as Traditional Chinese cleanup, Simplified and Traditional mixing, translated-sounding prose, register alignment, pronouns, address terms, punctuation, mixed-language tags, or file-to-file language mismatch before authoring, render, a play turn, or publishing.
---

# Hearthroom Language Stylist

Use this skill when the engine, opening and voice plan are coherent but the
language surface is weak. The output is a language packet, not a plot rewrite
and not a new voice.

## Required references

- `../../references/language-style.md`: platform notes on `language`,
  `playerName` and `nickname`, display-time script conversion and what the
  converter skips, register alignment, address matrix, one script across the
  card, file pass, rewrite rules.
- `../../references/platform-facts.md`: limits by language; Chinese script
  (conversion is a display step, stored text stays as written).
- `../../references/prose-texture.md` when the prose is in one script and one
  register but still reads generated: ellipsis budget, adjectives one at a
  time, objects before feelings, similes rationed, stock gestures retired.
- `../../references/voice-calibration.md` only if the pass exposes a real
  voice-rule conflict; `../../references/boundary-design.md` when the card is
  mature or coercion-adjacent and its rating posture is unclear.

## Workflow

1. Confirm this is a language task: script, register, translated cadence,
   pronoun or address drift, punctuation, mixed-language tags, mismatch
   between files, or template texture (trembling ellipses, stacked
   adjectives, narrated player feelings) inside otherwise correct prose.
2. Confirm the engine and opening are worth preserving; otherwise route to
   `hearthroom-card-doctor`, `hearthroom-card-blueprint` or
   `hearthroom-opening-director` first.
3. Route sensitive content with no boundary posture to
   `hearthroom-boundary-designer`, and requests that are really about
   rhythm, refusal style or tells to `hearthroom-voice-director`.
4. Extract target language (it must match `card.json` `language`), card
   shape, files affected, packets to preserve. Field limits are larger only
   when the language is exactly `en`; read them from `tokenBudget.limits`.
5. Build the pronoun and address matrix before rewriting anything.
6. Sweep in order: `card.json` `name`, `summary`, `tags`; `definition.md`;
   `welcome.md` and `openings/alt-NN.md`; `talkExample`; Lorebook entry
   content, names and keywords (both forms of a noun the player might type);
   in `rules.json` only the strings the converter skips: `title` attributes,
   CSS `content`, labels a script draws. Write the card in one script; the
   platform converts for the player at display time.
7. Return the packet and hand off.

## Output

```text
Language packet:
- current request / target language / card shape:
- preserve: engine, opening, voice card, boundary posture, rule patterns,
  JSON keys, proper nouns
- failures: script, register, pronouns and address, translated prose,
  mixed-language tags, file mismatch
- address matrix: character self-reference, address for player, player in
  narration, formality ladder, stage variations, forbidden shifts
- file pass: card.json name / summary / tags, definition.md, welcome.md,
  openings, talkExample, lorebook.json, rules.json converter-skipped strings
- scripts that read reply text: normalise to the card's script first, or route
- rewrite rules:
- self-review: one script, one register, matrix coherent, boundary posture
  kept or routed, voice kept, opening action kept, no engine or plot drift
```

## Hand-off

- `hearthroom-card-author` to apply the pass, then
  `hearthroom card push --validate --json`.
- `hearthroom-voice-director` when cleanup exposes a voice-rule conflict.
- `hearthroom-boundary-designer` when sensitive content lacks a posture.
- `hearthroom-profile-packager` when the summary is clean but still does not
  say why to open the card.
- `hearthroom-quality-auditor` when the author asks whether the whole card is
  good enough.

## Do not

- Do not change premise, plot, relationship state, opening beats, boundary
  posture or voice rules during a language pass.
- Do not remove intentional code-switching, proper nouns, faction names,
  rule patterns or JSON keys.
- Do not let `talkExample` drift from the register of `definition.md`.
- Do not use styling to invent a missing boundary contract.
