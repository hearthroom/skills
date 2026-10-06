---
name: hearthroom-presentation-director
description: Use when deciding how a Hearthroom card looks and behaves on screen before writing it, such as plain text vs HTML in the opening, what state to show, display rules and the function bar, sandbox vs classic chat page, status bars, themes, floating panels, sandbox scripts and saves, or which beautification kit to use.
---

# Hearthroom presentation director

Use this skill to plan presentation before fields are written or rules are
built, and to decide whether the work belongs in the opening as plain HTML
and CSS, in display rules, or in an external kit. Render review judges the
result afterwards; this skill decides the plan.

## Required references

Read `../../references/presentation-design.md` and the display rules, chat
pages and HTML in openings and replies sections of
`../../references/platform-facts.md`.

## Workflow

1. Confirm the story layers are settled: premise, opening beats, player
   agency and state. If not, route to the missing skill first.
2. List what the player must see on the first screen and on every turn.
   Cut anything that is only decoration.
3. Choose the opening format and each HTML block (bar, fact row, panel,
   choices), with a reason each. Plain HTML and CSS: in the opening for a
   one-off layout, in a display rule for repeated chrome or anything with a
   script. A button that sends a player line is a plain `<button>` in a
   display rule calling `sdk.message.send(text)` on the sandbox page.
4. Decide whether display rules are needed. If so, design the marker the
   model emits and the rule that renders it, following the status bar steps
   in the reference.
5. Choose the chat page. Default to sandbox; state the reason for classic.
   If the card takes over the whole page, plan it with the full-page,
   reading-first and screen-shape sections of the reference: which layout
   each area shape gets, where the choices appear and when, what the player
   confirms before a paid send, and which effects the script derives from
   markers the model already writes.
6. If the author wants a status panel, a theme, a settings drawer, a pinned
   bar or choice buttons, hand the packet to `hearthroom-sandbox-kit`, which
   builds them with the toolkit's kit; a full custom page (a book, a dossier)
   is planned here with the full-page sections and built on the kit's core.
7. Write the presentation packet and hand off to `hearthroom-card-author`
   for fields, or to `hearthroom-cli-operator` for the import and render run.

## Hand-off

The presentation packet from the reference, plus the exact commands to run
next (`card import`, `card push --validate`, `card render --json`).

## Do not

- Do not write display rules whose only purpose is to hide text from the
  player that the model needed anyway.
- Do not promise page-specific behaviour the facts sheet does not list.
- Do not let a choice panel open over, or shrink, text the reader has not
  finished.
- Do not copy another platform's kit files into a card; import its output
  through the CLI and run the local checker.
