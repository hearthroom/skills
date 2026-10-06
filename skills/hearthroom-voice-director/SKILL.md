---
name: hearthroom-voice-director
description: Use when a character's voice is the problem (generic dialogue, catchphrase overuse, repeated phrasing, replies that tremble or stack adjectives, refusal that breaks character, ensemble speakers blending), or when the author says "doesn't sound like them", before authoring or playtesting.
---

# Hearthroom Voice Director

Make the character sound and behave like one person under pressure. The
opening and the samples are what the model copies, so they are patched
before any rule is added. The output is a voice packet with patch targets,
not a full card.

## Required references

Read `../../references/voice-calibration.md` (voice card, catchphrase
ration, contrast matrix, blind-line test, response modes) and
`../../references/prose-texture.md`. Read
`../../references/character-core-design.md` when the voice fails because
motive, leverage or pressure behaviour is missing,
`../../references/talk-example-design.md` for the sample, and
`../../references/ensemble-card-design.md` when speakers blur because cast
function or turn ownership is unclear.

## Workflow

1. Name the failure: generic assistant tone, mood labels instead of
   behaviour, catchphrase as identity, drift over long sessions, refusal
   that breaks character, exposition voice, ensemble blur, dialogue that
   decides the player's feelings, or a template register (ellipsis in every
   line, stacked adjectives, stock gestures) the opening itself taught. A
   character with no desire, contradiction, boundary or leverage goes to
   `hearthroom-character-core` first; style cannot rescue it.
2. Choose the anchor: social surface, private motive, pressure behaviour,
   what the voice hides.
3. Write an executable voice card (eight lines or fewer): rhythm,
   vocabulary, address terms, tells, action beats, concealment, refusal
   style, what the character says instead of the tic, and behaviour when
   the player is passive, resistant, trusting or setting a boundary. Ration
   the catchphrase (how often; never as a Lorebook keyword).
4. For ensembles build the contrast matrix first (want, fear, speech cue,
   pressure move, leverage per speaker); two speakers with the same row
   merge or one is redesigned. Cast size or turn ownership goes to
   `hearthroom-ensemble-director`.
5. Fix the sample first: the opening and one ordinary-turn `talkExample` in
   this voice, at most one simile per screen. A rule cannot set metaphor
   density or catchphrase frequency on a weak model; the sample can.
6. Run the blind-line test (three anonymous lines; can the speakers be
   identified?) and the five pressure probes (trust, question, resist,
   passive, boundary). Name patch targets by file, one patch per version,
   and which line of the voice card joins the iron rules and the recency
   checklist.

Continue with `hearthroom-card-blueprint` when the rest is unplanned,
`hearthroom-card-author` to apply the patches, `hearthroom-chat-simulation`
to test drift, or `hearthroom-publish-readiness` when voice was the last
blocker.

## Do not

- Do not stop at gentle, cold, witty or human-like; convert the feeling into
  rhythm, vocabulary, tells, refusals and action beats.
- Do not distinguish speakers by punctuation, accent or one quirk alone.
- Keep guidance and samples in the card's `language`; write originally.
