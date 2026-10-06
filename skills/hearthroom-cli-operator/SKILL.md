---
name: hearthroom-cli-operator
description: Use when an agent needs to set up or drive the hearthroom CLI, such as install, sign in, choose between trial and owned cards, import a card, read push, validate, render or play JSON output, handle errors and exit codes, or decide whether a step spends credits before running it.
---

# Hearthroom CLI operator

Use this skill when the problem is operational: getting the CLI ready, running
the right command for the stage the card is in, and reading its output
correctly. The output is a short operation plan and the command lines, not a
card and not a writing review.

## Required references

Read `../../references/cli-workflow.md` and the CLI sections of
`../../references/platform-facts.md`. When a command's flags matter, read its
manual page (`https://cli.hearthroom.club/manual/<command>.md` or
`hearthroom <command> --help`).

## Workflow

1. Name the stage: setup, draft only, first push, iterate, playtest, keep,
   or hand to review.
2. Check readiness without printing secrets: `hearthroom auth status --json`.
   If not signed in, run `hearthroom auth login --no-wait --json`, give the
   author the code and address it prints, then run
   `hearthroom auth login --resume` (see the sign-in fact in
   `platform-facts.md`); or use `HEARTHROOM_TOKEN` when the author provides one
   for unattended work.
3. Choose the target. Default to a trial card. Use `push --create` only when
   the author wants the card kept, and `push --to <id>` only for a card the
   author already owns and asked to update.
   Work in the card's one folder; never copy it to a new folder per draft.
   Before the first push with images, set `media.folder` when the card should
   share a series folder; the folder a card is linked to is in
   `.hearthroom/state.json` and `hearthroom card status <dir> --json` shows it
   (Media library in `platform-facts.md`).
4. Run the smallest command for the stage and read the JSON, not the prose.
   Before any push run `node <toolkit>/scripts/check-card.mjs <dir>` (local,
   free) and `hearthroom card status <dir> --json`; to see the payload
   without sending it, `card push <dir> --dry-run --json`;
   `card validate <dir> --push --strict --json` fails on warnings too;
   `card render <dir> --push --opening N --json` renders one opening after a
   push. Treat a non-zero exit as a stop: read `error` and `detail`, fix the
   cause, rerun the same command.
5. Before `play -m`, show `hearthroom wallet --json`, state the cost stance
   (turns, models) and the exact command including `--allow-spend` and
   `--new-session` for a fresh conversation; run it only after the author
   agrees.
6. Hand off to the writing or review skill that owns the next decision with
   the report attached.

## Free local commands

`card check` (the local checks, `--replay` for protocol health), `card preview`
(the real shell offline; one download from the site, then cached) and
`lorebook build` / `lorebook check` (source files to `lorebook.json`;
keyword collisions) cost nothing and spend nothing.

## Reading errors

Errors are one JSON object `{ "error", "detail" }` with a non-zero exit code;
no other error identifiers are documented. Read `detail` for the section,
field or limit it names, fix that file, rerun the same command. Validation
blockers are listed in `card validate --json`; fix each in the folder and
push again. A media item that a card still uses as portrait or background
cannot be removed with `media rm`; change the card's image first. A folder
collision on `media.folder` is resolved by choosing a new readable name, or
the shared name only when the cards should share it. When not signed in, run
the sign-in step once; never retry a command in a loop.

## Hand-off

```text
CLI operation:
- stage:
- target: trial | owned <id>
- commands to run, in order:
- spends credits: yes | no (turns, model)
- report to read next:
- next skill:
```

## Do not

- Do not print or store tokens, cookies or session values.
- Do not run `play -m` without `--allow-spend` agreed by the author.
- Do not invent flags or JSON fields; read the manual page first.
