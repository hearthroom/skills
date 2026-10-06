---
name: hearthroom-language-stylist
description: Use when a card's language surface is the problem (Traditional and Simplified Chinese mixing, translated-sounding prose, register, pronouns and address terms, punctuation, mixed-language tags, file-to-file mismatch), or when the author says it "reads like a translation", before authoring, render or publishing.
---

# Hearthroom Language Stylist

Clean the language surface of a card whose engine, opening and voice plan
are worth keeping. The output is a language packet, not a plot rewrite and
not a new voice.

## Required references

Read `../../references/language-style.md` (`language`, `playerName` and
`nickname`, display-time script conversion and what the converter skips,
register alignment, address matrix, file pass, rewrite rules). Read
`../../references/prose-texture.md` when the prose is in one script and one
register but still reads generated, `../../references/voice-calibration.md`
only when the pass exposes a voice-rule conflict, and
`../../references/boundary-design.md` when a mature card's rating posture is
unclear.

## Workflow

1. Confirm this is a language task and that the engine and opening are worth
   preserving; otherwise route to `hearthroom-card-doctor` or
   `hearthroom-opening-director` first. Requests really about rhythm,
   refusal style or tells go to `hearthroom-voice-director`.
2. Extract the target language (it must match `card.json` `language`), the
   card shape, the files affected and the packets to preserve. Field limits
   are larger only when the language is exactly `en`.
3. Build the pronoun and address matrix (self-reference, address for the
   player, the player in narration, formality ladder, stage variations,
   forbidden shifts) before rewriting anything.
4. Sweep in order: `card.json` `name`, `summary`, `tags`; `definition.md`;
   `welcome.md` and `openings/alt-NN.md`; `talkExample`; Lorebook entry
   content, names and keywords (both forms of a noun the player might
   type); in `rules.json` only the strings the converter skips (`title`
   attributes, CSS `content`, labels a script draws). Write the card in one
   script; the platform converts for the player at display time. A script
   that reads reply text normalises to the card's script first.
5. Report the failures found, the matrix, the file pass and the rewrite
   rules, then continue with `hearthroom-card-author` to apply the pass,
   `hearthroom-profile-packager` when the summary is clean but still does
   not say why to open the card, or `hearthroom-quality-auditor` when the
   author asks whether the whole card is good enough.

## Do not

- Do not change premise, plot, relationship state, opening beats, boundary
  posture or voice rules during a language pass.
- Do not remove intentional code-switching, proper nouns, rule patterns or
  JSON keys.
- Do not let `talkExample` drift from the register of `definition.md`.
