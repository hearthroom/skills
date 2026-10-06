---
name: hearthroom-publish-readiness
description: Use when a trial card should become a real private card with card push --create, when the author asks whether a card is ready to submit for community review, or when they say "keep it", "ship it" or "is it done", and the final validate, render and playtest checks must be confirmed first.
---

# Publish readiness

Decide whether a card is ready to keep, and run
`hearthroom card push <dir> --create` only after the author explicitly asks.
Submission for community review happens on the site, by the author, and
freezes a version; a later change needs a new review. So every check
happens before they submit; `--create` only makes the card permanent, and
later plain pushes keep updating it.

Ready means: `card check` has no errors; `card validate --push --strict
--json` passes; `card render --opening N --json` for every opening has no
`rolled_back` rule and an empty `unsupported`; the preview or play page was
opened at a phone and a desktop width; a playtest was run or knowingly
skipped; the author has confirmed.

## Required references

Read `../../references/platform-facts.md` (CLI loop, trial-card rules,
publishing, costs) and `../../references/cost-and-boundaries.md`. Read a
craft reference only where the readiness risk lives
(`../../references/quality-scorecard.md` when the author actually wants a
score, `../../references/card-diagnosis.md` for several risks,
`../../references/profile-packaging.md`, `../../references/language-style.md`,
`../../references/originality-adaptation.md`, `../../references/token-economy.md`,
`../../references/boundary-design.md`, `../../references/playtest-loop.md`).

## Workflow

1. Confirm the author wants the card kept, not a scorecard ("good enough?"
   goes to `hearthroom-quality-auditor`). `hearthroom card status <dir>
   --json`: if the folder is already linked to an owned card, plain `push`
   updates it and `--create` would make a second card.
2. Read the folder and the dossier, run `hearthroom card check <dir>`, then
   `card push <dir> --validate --json`; resolve every blocker.
3. `card render <dir> --opening N --json` for every opening: no
   `rolled_back` rule, empty `unsupported` (sandbox identifiers on a
   `classic` card mean `pageMode: sandbox`), intended `scripts`,
   `inlineHandlers` and `externalUrls`. Open the preview or play link at a
   phone and a desktop width, or record that the author accepted the layout
   risk.
4. Read as a stranger: L0 cover and title, L1 summary, L2 opening (voice
   shown, one easy first action, a pull to reply); the weakest layer caps
   the card. An `assist` card reads well with rules off; a `core` card's
   mechanics are legible in the text. Route a weak layer to its skill
   before continuing. For boundary-sensitive cards confirm rating intent,
   ceiling, escalation ladder, refusal route and stop conditions are in the
   definition. Reviewers see a similarity score for the definition, so
   copied or lightly adapted text goes to `hearthroom-originality-adapter`.
5. Run a playtest through `hearthroom-chat-simulation` (10–20 turns, a weak
   and a strong model, `--new-session`; at least one `--agent on` probe for
   a Lorebook-dependent card), or record that the author skipped it knowing
   it is the closest real behaviour check and spends credits.
6. Summarise remaining warnings and tradeoffs in plain language and ask for
   confirmation if not already given. Sufficient: "Create the card", "Push
   it for real". Not sufficient: "Looks good", "What do you think?".
7. On confirmation run `card push <dir> --create`; tell the author the card
   is now a real private card in their inventory and that submitting for
   review is their step on the site. Report validation, render, playtest
   status and agent-mode coverage, unresolved warnings, and whether
   `--create` ran.

## Do not

- Do not submit the card for community review; the author does that.
- Do not run `--create` on "looks good" or silence.
- Do not report a card as ready while blockers, rolled-back rules or
  unsupported identifiers remain, or as fully behaviour-checked when only
  one `--agent` mode was played.
