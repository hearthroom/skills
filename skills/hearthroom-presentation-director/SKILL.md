---
name: hearthroom-presentation-director
description: Use when deciding how a card looks and behaves on screen before it is written (whether UI assists the story or is part of the game, plain text vs HTML, what state to show, display rules, sandbox vs classic page, status panels, choices, themes), or when the author asks for "a nice UI" or says the screen is too busy.
---

# Hearthroom presentation director

Plan the presentation before fields are written or rules are built: whether
the screen assists the story or carries the game, what the player must see,
and whether the work belongs in the opening as plain HTML and CSS, in
display rules, or in the toolkit's sandbox kit. Render review judges the
result afterwards; this skill decides the plan. How the UI looks is the
card's own call; what it must do for the story is decided here.

## Required references

Read `../../references/presentation-design.md` (Story first, the five jobs
of UI, the packet) and the display rules, chat pages and HTML sections of
`../../references/platform-facts.md`. Read `../../references/sandbox-kit.md`
when a panel, choices, a theme or a drawer is on the table, and
`../../references/full-page-layouts.md` only when the card covers the whole
page.

## Workflow

1. Confirm the story layers are settled (premise, opening beats, agency,
   state); otherwise route to the missing skill first.
2. Declare `uiRole` in the card's `README.md`: `assist` when the replies
   must read well with every display rule disabled, `core` when the
   mechanics are bound to the interface. Set the status overhead threshold
   (15% default for assist; a core card states its own with a reason).
3. List what the player must see on the first screen and on every turn, and
   for each element which of UI's five jobs it does (memory, legible
   choices, pacing, the world reacting, orientation). Cut anything that does
   none; prefer a diegetic object to a HUD.
4. Choose the opening format and each HTML block with a reason: plain HTML
   and CSS in the opening for a one-off layout, in a display rule for
   repeated chrome or anything with a script. Choices are drafts: a
   `[choices]` block the kit draws, in draft mode unless the card is `core`;
   free input stays first-class.
5. If display rules are needed, the model's marker is the `[status]` block
   (canonical form in `state-economy-design.md`); its keys and cadence go
   into the output contract and the first block into the opening. The rule
   draws; it never instructs.
6. Choose the chat page and card format: sandbox by default, with a reason
   for classic; `cardFormat: mmd` (the default) is dark only, `tavern`
   follows the player's theme. A card that takes over the whole page is
   `core` by construction and is planned with `full-page-layouts.md` after
   it passes the reading-first rules.
7. Continue with `hearthroom-sandbox-kit` for the panel, choices, theme,
   pinned bar or drawer, `hearthroom-card-author` for fields, and the
   commands to run next (`card check`, `card push --validate`, `card render
   --json`).

## Do not

- Do not write display rules whose only purpose is to hide text the model
  needed anyway, and do not draw the status twice.
- Do not let a choice panel open over, or shrink, text the reader has not
  finished.
- Do not plan a full-page layout for an `assist` card whose replies do not
  already read well as plain text.
