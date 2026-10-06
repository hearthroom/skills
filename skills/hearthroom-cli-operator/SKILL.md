---
name: hearthroom-cli-operator
description: Use when the hearthroom CLI must be set up or driven (install, sign in, trial vs owned card, import, reading push, validate, render or play JSON, errors and exit codes), or when a step may spend credits and the cost must be settled before running it.
---

# Hearthroom CLI operator

Get the CLI ready, run the right command for the stage the card is in, and
read its output correctly. The output is the command lines and their
results, not a card and not a writing review.

## Required references

Read `../../references/cli-workflow.md` and the CLI sections of
`../../references/platform-facts.md`. When a command's flags matter, read
its manual page (`https://cli.hearthroom.club/manual/<command>.md` or
`hearthroom <command> --help`) rather than guessing.

## Workflow

1. Name the stage: setup, draft only, first push, iterate, playtest, keep,
   or hand to review.
2. Check readiness without printing secrets: `hearthroom auth status --json`.
   If not signed in, `hearthroom auth login --no-wait --json`, give the
   author the code and address, then `hearthroom auth login --resume`; or
   `HEARTHROOM_TOKEN` when the author provides one for unattended work.
3. Choose the target: a trial card by default; `push --create` only when the
   author wants the card kept; `push --to <id>` only for a card the author
   owns and asked to update. Work in the card's one folder. Set
   `media.folder` before the first push with images when the card should
   share a series folder (`card status <dir> --json` shows the linked one).
4. Run the smallest command for the stage and read the JSON, not the prose.
   Free and local: `card check <dir>` (`--replay` for protocol health),
   `card preview <dir>`, `lorebook build` / `lorebook check`, `card status`,
   `card push --dry-run`. Remote: `push`, `validate --push --strict` (fails
   on warnings too), `render --push --opening N`; paid: `play`.
5. Before `play -m`, show `hearthroom wallet --json`, state the cost stance
   (turns, models) and the exact command with `--allow-spend` and
   `--new-session`; run it only after the author agrees.

## Reading errors

Errors are one JSON object `{ "error", "detail" }` with a non-zero exit
code; no other identifiers are documented. Read `detail` for the section,
field or limit it names, fix that file, rerun the same command. A media
item a card still uses cannot be removed with `media rm`; change the card's
image first. A `media.folder` collision takes a new readable name, or the
shared name only when the cards should share it. When not signed in, run
the sign-in step once; never retry a command in a loop.

Then continue with the writing or review skill that owns the next decision,
with the JSON report attached.

## Do not

- Do not print or store tokens, cookies or session values.
- Do not run `play -m` without `--allow-spend` agreed by the author.
- Do not invent flags or JSON fields; read the manual page first.
