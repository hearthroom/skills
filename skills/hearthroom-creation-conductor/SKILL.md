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
3. Choose the first bottleneck, not every possible skill:
   - vague mood or trope: `hearthroom-premise-workshop`
   - mixed card type: `hearthroom-archetype-director`
   - source files or world bible: `hearthroom-material-distiller`
   - recognizable inspiration or copy risk: `hearthroom-originality-adapter`
   - sensitive premise: `hearthroom-boundary-designer`
   - weak engine: character core, relationship, world, daily-life, scenario, play, generator or ensemble skill
   - weak interaction: `hearthroom-tension-weaver`, `hearthroom-agency-designer`, `hearthroom-opening-director`, `hearthroom-longplay-architect`
   - weak voice, examples or language: `hearthroom-voice-director`, `hearthroom-talk-example-curator`, `hearthroom-language-stylist`
   - state, budget or presentation: `hearthroom-state-economist`, `hearthroom-token-architect`, `hearthroom-presentation-director`
   - profile or media: `hearthroom-profile-packager`, `hearthroom-visual-identity-director`
   - "is this good enough": `hearthroom-quality-auditor`
   - existing card with mixed symptoms: `hearthroom-card-doctor`
   - evidence from validate, render, play or author feedback: `hearthroom-iteration-director`
4. For a trial card require `hearthroom-cli-operator` readiness (login,
   folder, flags) and `hearthroom-card-author` plus
   `hearthroom-field-finalizer` for the files.
5. Require media readiness for a complete card: files under `assets/`
   referenced from `card.json`. Prompt-only art is a hand-off, not completion.
6. Run the stage gates in order: `hearthroom card push <dir> --validate --json`
   and clear blockers; `hearthroom card render <dir> --json` with
   `hearthroom-render-review`; then
   `hearthroom play <dir> -m "…" --allow-spend --json` with
   `hearthroom-chat-simulation` only after the author accepts the credit cost.
   Skip render only when the author explicitly wants behavior after a
   known-good render.
7. Treat each evidence loop as one repair at a time through
   `hearthroom-iteration-director`.
8. Stop at publish readiness. `card push --create` and review submission are
   the author's actions; describe them, do not perform them unasked.

## Hand-off

```text
Route:
- mode:
- push now: yes | no
- next skill:

Creation runway packet: (shape in creation-workflow.md)

Self-review:
- route starts at the first bottleneck:
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
