---
name: hearthroom-presentation-director
description: Use when deciding how a Hearthroom card looks and behaves on screen before writing it, such as whether the UI assists the story or is part of the game, plain text vs HTML in the opening, what state to show and at what token cost, display rules and the function bar, sandbox vs classic chat page, status panels, choices, themes, sandbox scripts and saves, or whether the toolkit's sandbox kit builds it.
---

# Hearthroom presentation director

Use this skill to plan presentation before fields are written or rules are
built: whether the screen assists the story or carries the game, what the
player must see, and whether the work belongs in the opening as plain HTML
and CSS, in display rules, or in the toolkit's sandbox kit. Render review
judges the result afterwards; this skill decides the plan.

## Required references

Read `../../references/presentation-design.md` (Story first, the five jobs
of UI, the packet) and the display rules, chat pages and HTML in openings
and replies sections of `../../references/platform-facts.md`. Read
`../../references/sandbox-kit.md` when a panel, choices, a theme or a drawer
is on the table, and `../../references/full-page-layouts.md` only when the
card covers the whole page.

## Workflow

1. Confirm the story layers are settled: premise, opening beats, player
   agency and state. If not, route to the missing skill first.
2. Declare `uiRole` in the card's `README.md`: `assist` when the replies must
   read well with every display rule disabled, `core` when the mechanics are
   bound to the interface. Set the status overhead threshold (15% default for
   assist; a core card states its own with a reason). For `assist`, plan the
   reply so it reads as story without the screen.
3. List what the player must see on the first screen and on every turn, and
   for each element which of UI's five jobs it does (memory, legible choices,
   pacing, the world reacting, orientation). Cut anything that does none;
   prefer a diegetic object to a HUD.
4. Choose the opening format and each HTML block (bar, fact row, panel,
   choices), with a reason each. Plain HTML and CSS: in the opening for a
   one-off layout, in a display rule for repeated chrome or anything with a
   script. Choices are drafts: a `[choices]` block the kit draws, in draft
   mode (tap fills the composer) unless the card is `core`; free input stays
   first-class.
5. Decide whether display rules are needed. If so, the model's marker is the
   `[status]` block (canonical form in `state-economy-design.md`); its keys
   and cadence go into the output contract and the first block into the
   opening. The rule draws; it never instructs.
6. Choose the chat page and the card format. Default to sandbox; state the
   reason for classic. `cardFormat: mmd` (the default) is dark only; `tavern`
   follows the player's theme. If the card takes over the whole page, it is
   `core` by construction: plan it with `full-page-layouts.md` after it has
   passed the reading-first rules.
7. Hand the packet to `hearthroom-sandbox-kit` for the panel, choices, theme,
   pinned bar or drawer; to `hearthroom-card-author` for fields; to
   `hearthroom-cli-operator` for an import and the render run.

## Hand-off

The presentation packet from the reference, plus the exact commands to run
next (`node <toolkit>/scripts/check-card.mjs <dir>`, `card import`,
`card push --validate`, `card render --json`).

## Do not

- Do not write display rules whose only purpose is to hide text from the
  player that the model needed anyway.
- Do not promise page-specific behaviour the facts sheet does not list.
- Do not let a choice panel open over, or shrink, text the reader has not
  finished.
- Do not draw the status twice (in the bubble and in the function bar).
- Do not plan a full-page layout for an `assist` card whose replies do not
  already read well as plain text.
- Do not copy another platform's kit files into a card; import its output
  through the CLI and run the local checker.
