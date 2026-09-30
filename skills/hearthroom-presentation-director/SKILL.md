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
6. If the author wants a status bar, a global theme, floating panels or a
   full custom chat page, route to the `tavern-mmd` skill as the reference
   describes and plan the import back into the card folder.
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
- Do not vendor another toolkit's files; reference them and import their
  output through the CLI.
