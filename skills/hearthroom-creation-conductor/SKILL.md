---
name: hearthroom-creation-conductor
description: Use when a card task needs end-to-end coordination from a vague idea, packet set, local material or existing card folder through skill selection, CLI readiness, trial-card push, validation, render review, play testing, iteration and publish-readiness decisions.
---

# Hearthroom Creation Conductor

Coordinate the whole card-making journey. The output is a creation runway
packet and a sequenced hand-off plan. Do not replace the narrow skills; decide
when to call them and what packet each returns.

## Required references

Read `../../references/creation-workflow.md` first and
`../../references/platform-facts.md` for the CLI loop and costs. Read
`../../references/cli-workflow.md` before any real CLI action and
`../../references/cost-and-boundaries.md` when play, publishing, rating or
credentials appear. Load craft references only after the first bottleneck is
chosen.

## Workflow

1. Identify the output mode: brainstorm, draft-only, trial card, patch to an
   existing folder, closed-loop iteration, or publish readiness.
2. Build the creation runway packet before narrower work when the request is
   broad, ambiguous, or "from idea to card".
3. Choose the first bottleneck, not every possible skill: name the weakest
   conversion layer and route it with the table in `using-hearthroom`.
4. Decide the UI role with the author and record it in the card's
   `README.md`: `assist` (the story is the product; the card must read well
   with display rules off) or `core` (mechanics are bound to the interface:
   each mechanic is legible in text, the UI degrades to text, and every UI
   element changes a choice or consequence). `presentation-design.md`, Story
   first.
5. For a trial card require `hearthroom-cli-operator` readiness (login,
   folder, flags) and `hearthroom-card-author` plus
   `hearthroom-field-finalizer` for the files.
6. Require media readiness for a complete card: files under `assets/`
   referenced from `card.json`, and the portrait and title pass the L0 test
   (would a stranger scrolling the board stop on them?). Prompt-only art is a
   hand-off, not completion.
7. Run the stage gates in order: `node <toolkit>/scripts/check-card.mjs <dir>`
   with no errors; `hearthroom card push <dir> --validate --json` and clear
   blockers; `hearthroom card render <dir> --json` with
   `hearthroom-render-review`, plus the offline preview when the chat page's
   repository is available; then `hearthroom play <dir> --new-session -m "…"
   --allow-spend --json` with `hearthroom-chat-simulation` (a weak and a
   strong model, 10–20 turns) only after the author accepts the credit cost.
   Skip render only when the author explicitly wants behaviour after a
   known-good render.
8. Treat each evidence loop as one repair per version through
   `hearthroom-iteration-director`, compared with the previous version.
9. Stop at publish readiness. `card push --create` and review submission are
   the author's actions; describe them, do not perform them unasked.

## Hand-off

```text
Route:
- mode:
- push now: yes | no
- next skill:

Creation runway packet: (shape in creation-workflow.md)

Self-review:
- route starts at the weakest conversion layer:
- uiRole declared in README.md:
- no premature push:
- media requirement handled:
- play cost handled:
- publish left to the author:
- trial-card expiry mentioned:
```

## Do not

- Do not jump from a broad request straight to writing files.
- Do not reopen a prepared packet set from scratch.
- Do not create a second folder for an existing card unless the author asks
  for a variant.
- Do not read validation as proof of quality.
- Do not let render or play evidence trigger a broad rewrite; route one repair.
- Do not publish, submit or spend credits without an explicit request.
