---
name: hearthroom-card-doctor
description: Use when an existing card, draft, validation or render report, play transcript or author feedback shows several symptoms at once and the question is what to fix first, including "it's boring", "something is off" or "where do I start", before rewriting, playing or publishing.
---

# Card doctor

Diagnose a card with more than one obvious problem and decide the single
repair for the next version, so nobody polishes prose, adds lore or pays
for another playtest when the card needs structural repair. The output is
a diagnosis and a patch plan, not a file edit.

## Required references

Read the card's `README.md` dossier (`uiRole`, threshold, decisions,
rejected directions, evidence by version), then
`../../references/card-diagnosis.md`, and `../../references/platform-facts.md`
for the meaning of each `--json` field and checker finding. Read the
narrow reference only for the diagnosed layer
(`../../references/playtest-loop.md` for transcripts,
`../../references/profile-packaging.md`, `../../references/tension-triangle.md`,
`../../references/token-economy.md`, `../../references/language-style.md`,
`../../references/presentation-design.md` and `../../references/sandbox-kit.md`
when the screen is the complaint).

## Workflow

1. Gather evidence: the complaint, the dossier, the folder, `hearthroom card
   check <dir>` (local, read-only), `card status`, `card validate --json`
   (`blockers`, `warnings`, `suggestedFixes`, `tokenBudget`), `card render
   --json` (per-rule status, `unsupported`), screenshots, any `play` or
   `--history` transcript, language, shape and rating intent.
2. Separate technical blockers from writing failures and name the mechanical
   fix for each blocker first.
3. Identify the primary failure; the next version fixes only this. Keep up
   to three secondary failures as a backlog. Translate taste labels into
   observable symptoms: "boring" is a vague promise, a weak engine, a generic
   voice, no consequence, route funnelling, a passive character, an
   overloaded opening or a missing second-turn move.
4. Map each symptom to its layer, source file, narrow skill and patch target
   with the symptom map, in the repair order from `card-diagnosis.md`
   (blockers, then agency and boundary, then the weakest conversion layer).
5. Decide keep / move / cut / rewrite per field; move durable behaviour into
   the definition before cutting anything.
6. Write the patch plan and the verification plan: pre-check, the previous
   version's probes on a weak and a strong model with `--new-session`, the
   comparison column, cost stance.

## Checks

Evidence-backed; one primary repair; patch targets concrete; the player's
agency considered. Continue with the narrow skill the symptom map names
(`hearthroom-presentation-director` when the UI crowds out the story,
`hearthroom-sandbox-kit` for a kit panel or script, `hearthroom-render-review`
for rolled-back rules), `hearthroom-card-author` to apply the patch, or
`hearthroom-chat-simulation` when a structural patch makes another paid run
meaningful.

## Do not

- Do not edit files, push, render or play from this skill, and do not spend
  credits when the evidence already proves a structural failure.
- Do not rewrite everything; patch the smallest file that fixes the failure.
- Do not trust a good-looking render as proof of playability, or one reply
  as proof of improvement.
