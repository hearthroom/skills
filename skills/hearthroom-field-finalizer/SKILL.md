---
name: hearthroom-field-finalizer
description: Use when a card draft is field-ready and needs the last-mile pass before files are written or pushed, including placeholder cleanup, limit checks against the validation report, compact fallback, Markdown, HTML and JSON sanity, and mapping each field to its file in the card folder.
---

# Hearthroom Field Finalizer

Turn a mostly complete draft into files that can be written and pushed safely.
Preserve the creative packets, verify the fields, and stop when a narrow
repair is still needed.

## Required references

Read `../../references/field-finalization.md` first and
`../../references/platform-facts.md` for the folder layout and limits. Read
`../../references/card-authoring-templates.md` when the draft needs the final
field-authoring packet, `../../references/token-economy.md` when lengths or
allocation are uncertain, and `../../references/presentation-design.md` when
the opening contains HTML.

## Workflow

1. Confirm the mode: draft-only finalization, new trial card, patch to an
   existing folder, or blocked.
2. Preserve existing packets. Do not reopen the premise or rewrite the engine
   unless packets contradict each other or leave a required field undecidable.
3. Strip placeholders and authoring metadata from every field: bracket labels,
   TODOs, unresolved alternatives, meta commentary, author-facing notes,
   version banners, date stamps, changelogs. Move notes worth keeping into
   `README.md`, which is never sent.
4. Check limits and density. Take the limits from `tokenBudget.limits` in
   `card validate --json` when a report exists; otherwise use the table in
   the facts sheet, remembering that the English column applies only when
   `language` is exactly `en`. Limits are ceilings. Leave buffer, and add
   detail only when it changes future behavior, route, state, voice or
   boundary handling.
5. Prepare a compact fallback for any field near its limit.
6. Check format: one H1 and no skipped levels in `definition.md`; valid JSON
   in `card.json`, `lorebook.json` and `rules.json`; `{{char}}` and `{{user}}`
   spelled exactly; opening HTML is plain HTML and CSS with no custom elements
   the page does not register; the status line
   shape, if any, declared in the output contract with a matching display
   rule. Unsettled layout goes to `hearthroom-presentation-director` or
   `hearthroom-render-review`, not into a guess.
7. Map every field to its file and list what changes: `card.json` keys,
   `definition.md`, `welcome.md`, `openings/alt-NN.md`, `lorebook.json`,
   `rules.json`, `assets/`. Media referenced from `card.json` `media` must
   exist as files; a prompt is not a file.
8. Return the field finalization packet with status
   `ready | needs narrow repair | missing media | cost-gated`.

## Hand-off

Return the field finalization packet from `field-finalization.md`. If ready,
hand to `hearthroom-card-author` to write the files and run
`hearthroom card push <dir> --validate --json`. Route repairs: undrafted
fields to `hearthroom-card-author`; a missing creative decision to its narrow
skill; overlong opening, thin definition or misplaced rules to
`hearthroom-token-architect`; HTML, display rules or status line to
`hearthroom-presentation-director`; coherent fields that still drift in play to
`hearthroom-instruction-guardrail`.

## Do not

- Do not enlarge a field because it has room.
- Do not let validation, render or play discover a format defect this pass
  could catch.
- Do not write working notes, version markers or changelogs into any field.
- Do not mark the packet ready while media are prompt-only; report
  `missing media`.
- Do not turn writing taste into a validation gate; route craft failures to
  the craft skills.
