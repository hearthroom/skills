---
name: hearthroom-creation-conductor
description: Use when a card must be taken end to end from a vague idea, packet set, local material or existing folder through skill selection, trial-card push, validation, render, playtesting and iteration, or when the author says "make me a card" and expects the whole journey coordinated.
---

# Hearthroom Creation Conductor

Coordinate the whole card-making journey: decide when each narrow skill
runs and what it must return, without replacing any of them.

## Required references

Read `../../references/creation-workflow.md` and
`../../references/platform-facts.md` for the CLI loop and costs. Read
`../../references/cli-workflow.md` before the first real CLI action and
`../../references/cost-and-boundaries.md` when play, publishing, rating or
credentials come up. Load craft references only after the first bottleneck
is chosen.

## Workflow

1. Identify the output mode: brainstorm, draft-only, trial card, patch to an
   existing folder, closed-loop iteration, or publish readiness. For a
   broad or "idea to card" request, fill the creation runway
   (`creation-workflow.md`) before narrower work.
2. Choose the first bottleneck, not every possible skill: name the weakest
   conversion layer and route it with the table in `using-hearthroom`.
3. Decide the UI role with the author and record it in the card's
   `README.md`: `assist` (the story is the product; reads well with rules
   off) or `core` (mechanics bound to the interface, each legible in text
   and degrading to text; `presentation-design.md`, Story first).
4. For a trial card: `hearthroom-cli-operator` readiness, then
   `hearthroom-card-author` and `hearthroom-field-finalizer` for the files.
   A complete card has its media under `assets/` referenced from
   `card.json`, and a portrait and title that pass the L0 test (would a
   stranger scrolling the board stop?); prompt-only art is a hand-off, not
   completion.
5. Run the stage gates in order: `hearthroom card check <dir>` with no
   errors; `card push --validate --json` and clear blockers; `card render
   --json` with `hearthroom-render-review` plus the offline preview; then
   `play --new-session -m "…" --allow-spend --json` with
   `hearthroom-chat-simulation` (a weak and a strong model, 10–20 turns) only
   after the author accepts the cost. Skip render only when the author
   wants behaviour after a known-good render.
6. Treat each evidence loop as one repair per version through
   `hearthroom-iteration-director`, compared with the previous version.
7. Stop at publish readiness: `card push --create` and review submission
   are the author's actions; describe them, do not perform them unasked.

## Checks

The route starts at the weakest conversion layer; `uiRole` is in the
dossier; no premature push; media handled; play cost agreed; trial-card
expiry mentioned; publishing left to the author.

## Do not

- Do not jump from a broad request straight to writing files, and do not
  reopen a prepared packet set from scratch.
- Do not create a second folder for an existing card unless the author asks
  for a variant.
- Do not let render or play evidence trigger a broad rewrite; route one
  repair.
