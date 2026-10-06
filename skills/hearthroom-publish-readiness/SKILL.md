---
name: hearthroom-publish-readiness
description: Use when a Hearthroom trial card should become a real private card with card push --create, or the author asks whether a card is ready to submit for community review, needs readiness blocker triage, a final validate/render/playtest check, or explicit confirmation before the card is kept.
---

# Publish readiness

Use this skill to decide whether a card is ready to keep and to run
`hearthroom card push <dir> --create` only after the author explicitly asks.
Readiness means: `check-card.mjs` has no errors; `card validate --push
--strict --json` passes; `card render --opening N --json` for every opening
has no `rolled_back` rule and an empty `unsupported`; the offline preview or
the play page was opened at a phone and a desktop width; a playtest was run
or knowingly skipped; and the author has confirmed.

Submission for community review happens on the site, by the author, and that
is where a version is frozen; a later change needs a new review. So every
check happens before the author submits; `--create` only makes the card
permanent, and later plain pushes keep updating it.

## Required references

Read `../../references/platform-facts.md` first for the CLI loop, trial card
rules, publishing and costs. Read `../../references/quality-rubric.md` for the
readiness criteria and `../../references/cost-and-boundaries.md` for what the
agent may and may not do on the author's behalf.

Read when the readiness risk lives there:
`../../references/quality-scorecard.md` when the author actually wants a
craft score, `../../references/card-diagnosis.md` when several risks appear
at once, `../../references/profile-packaging.md` for a generic name, vague
summary or weak tags, `../../references/language-style.md` for mixed scripts
or register, `../../references/originality-adaptation.md` when the definition
may resemble other cards, `../../references/token-economy.md` when
`tokenBudget` shows a long opening or thin definition,
`../../references/boundary-design.md` for mature or consent-sensitive cards,
and `../../references/playtest-loop.md` for the behaviour check.

## Workflow

1. Confirm the author wants the card kept on the site, not a scorecard. A
   request for a tier or a "good enough?" review goes to
   `hearthroom-quality-auditor`.
2. Run `hearthroom card status <dir> --json`: if the folder is already linked
   to an owned card, plain `push` updates it and `--create` would make a
   second card. Read the folder files and the `README.md` dossier, run
   `node <toolkit>/scripts/check-card.mjs <dir>` (no errors), then
   `hearthroom card push <dir> --validate --json`. Resolve every entry in
   `blockers`; read `warnings` and `suggestedFixes`.
3. Run `hearthroom card render <dir> --opening N --json` for every opening.
   No rule may be `rolled_back`. `unsupported` must be empty; if it lists
   sandbox author-API identifiers on a `classic` card, set `pageMode` to
   `sandbox` and render again. Check the static scan's `scripts`,
   `inlineHandlers` and `externalUrls` are intended. Open the offline preview
   or the play page link at a phone and a desktop width, or record that the
   author accepted the layout risk.
4. Read as a stranger: L0 cover and title, L1 summary, L2 opening (voice
   shown, one easy first action, a pull to reply); the weakest layer caps
   the card (`role-card-writing-framework.md`, Funnel). For `uiRole: assist`
   the card reads well with rules off; for `core`, every UI mechanic is
   legible in the reply text and changes a choice or consequence. Then check
   the craft: playable first action, anchored character, consequences,
   purposeful token spend. Route a weak layer to its skill before continuing:
   profile to `hearthroom-profile-packager`, language to
   `hearthroom-language-stylist`, several risks to `hearthroom-card-doctor`,
   trope-only character to `hearthroom-character-core`, inert world to
   `hearthroom-world-engineer`, decorative mechanics to
   `hearthroom-play-engineer`, advice-only helper to
   `hearthroom-generator-architect`, generic voice to
   `hearthroom-voice-director`, hollow opening to
   `hearthroom-opening-director`, dead third turn to
   `hearthroom-longplay-architect`, spectator play to
   `hearthroom-agency-designer`, opening carrying the engine to
   `hearthroom-token-architect`. For boundary-sensitive cards confirm rating
   intent, explicitness ceiling, escalation ladder, refusal route and stop
   conditions are in the definition.
5. Check originality. Reviewers see a similarity score for the definition
   against other submitted and approved cards. Copied or lightly adapted
   definition text is a readiness risk; route to
   `hearthroom-originality-adapter`.
6. Run a playtest through `hearthroom-chat-simulation` (10–20 turns, a weak
   and a strong model, `--new-session`; `playtest-loop.md`), or record that
   the author skipped it after understanding it is the closest real
   behaviour check and that it spends credits. When the card depends on Lorebook
   material, at least one probe runs with `--agent on`; if the author declines
   that cost, report the card as checked in one mode only.
7. Summarize remaining warnings and tradeoffs in plain language.
8. Ask for confirmation if the author has not already given it. Sufficient:
   "Create the card", "Push it for real", "I confirm, make it a real card".
   Not sufficient: "Looks good", "What do you think?", "Maybe later".
9. On confirmation run `hearthroom card push <dir> --create`. Tell the author
   the card is now a real private card in their inventory and that submitting
   it for review is their step on the site.
10. Report: card folder, validation status, render status, playtest status
    and agent-mode coverage, unresolved warnings, whether `--create` was run.

## Hand-off

- `hearthroom-quality-auditor` when the author wanted a craft score.
- `hearthroom-card-doctor` when several readiness risks interact.
- The narrow skill named in step 4 or 5 for a single weak layer.
- `hearthroom-chat-simulation` for the behaviour check.
- `hearthroom-collaboration-director` when the remaining tradeoff is taste.
- Back to `hearthroom-card-author` when a patch is needed; then rerun the
  checks the patch affects.

## Do not

- Do not submit the card for community review; the author does that on the
  site.
- Do not run `--create` on "looks good" or silence.
- Do not report a card as ready while `blockers`, `rolled_back` rules or
  `unsupported` identifiers remain.
- Do not call a card fully behaviour-checked when only one `--agent` mode was
  played.
- Do not skip the playtest silently; record who skipped it and why.
- Do not defer fixes until after review; a changed card needs a new review.
