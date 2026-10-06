---
name: hearthroom-field-finalizer
description: Use when a card draft is field-ready and needs the last-mile pass before files are written or pushed (placeholders, limits, Markdown, HTML and JSON sanity, mapping each field to its file), or whenever a push is about to happen and nobody has checked the fields.
---

# Hearthroom Field Finalizer

Turn a mostly complete draft into files that can be written and pushed
safely: preserve the creative packets, verify the fields, and stop when a
narrow repair is still needed.

## Required references

Read `../../references/field-finalization.md` and
`../../references/platform-facts.md` for the folder layout and limits. Read
`../../references/presentation-design.md` only when the opening contains
HTML, and `../../references/token-economy.md` when lengths or allocation
are uncertain.

## Workflow

1. Confirm the mode (draft-only, new trial card, patch, blocked) and preserve
   the packets; reopen the premise or the engine only when packets
   contradict each other or leave a required field undecidable.
2. Strip placeholders and authoring metadata from every field: bracket
   labels, TODOs, unresolved alternatives, meta commentary, version banners,
   date stamps, changelogs. Notes worth keeping go to `README.md`, which is
   never sent.
3. Check limits from `tokenBudget.limits` in `card validate --json` when a
   report exists, otherwise from the facts sheet (the English column applies
   only when `language` is exactly `en`). Limits are ceilings: leave buffer,
   and add detail only when it changes future behaviour. Prepare a compact
   fallback for any field near its limit.
4. Run `hearthroom card check <dir>`: errors block, warnings are read. Then
   check format: one H1 and no skipped levels in `definition.md`; valid JSON
   in `card.json`, `lorebook.json` and `rules.json`; `{{char}}` and
   `{{user}}` spelled exactly; opening HTML is plain HTML and CSS; the status
   block, if any, is declared with its keys and values in the output
   contract or the definition, appears in the opening, and has a matching
   display rule (render rules are not generation rules); every value has one
   owner (the model in the block, or a script in `sdk.save`, never both).
   Unsettled layout goes to `hearthroom-presentation-director`, not into a
   guess.
5. Map every field to its file and list what changes: `card.json` keys
   (including `sex`, `nickname`, `cardMeta`, `media.backgroundLandscape`,
   `media.folder`), `definition.md`, `welcome.md`, `openings/alt-NN.md`,
   `lorebook.json`, `rules.json` (`mountLayer`, `cardFormat`; `mmd`, the
   default, locks the card to the dark theme), `assets/`, the dossier
   (`uiRole`, threshold). Media referenced from `card.json` must exist as
   files; a prompt is not a file.
6. Report the status: `ready | needs narrow repair | missing media |
   cost-gated`, then continue with `hearthroom-card-author` to write and
   push, or with the narrow skill a repair needs (`hearthroom-token-architect`
   for an overlong opening or misplaced rules,
   `hearthroom-presentation-director` for HTML or display rules,
   `hearthroom-instruction-guardrail` for coherent fields that still drift
   in play).

## Do not

- Do not enlarge a field because it has room.
- Do not mark the packet ready while media are prompt-only.
- Do not turn writing taste into a validation gate; route craft failures to
  the craft skills.
