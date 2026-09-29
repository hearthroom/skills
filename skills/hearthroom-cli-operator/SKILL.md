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
   If not signed in, ask the author to run `hearthroom auth login`, or use
   `HEARTHROOM_TOKEN` when the author provides one for unattended work.
3. Choose the target. Default to a trial card. Use `push --create` only when
   the author wants the card kept, and `push --to <id>` only for a card the
   author already owns and asked to update.
4. Run the smallest command for the stage and read the JSON, not the prose.
   Treat a non-zero exit as a stop: read `error` and `detail`, fix the cause,
   rerun the same command.
5. Before `play -m`, state the cost stance and the exact command including
   `--allow-spend`; run it only after the author agrees.
6. Hand off to the writing or review skill that owns the next decision with
   the report attached.

## Reading errors

- `validation found blockers` (exit 2): open `card validate --json`, fix each
  blocker in the folder, push again.
- `trial_unsupported` or `trial_payload_too_large`: `detail` names the
  section, field and limit; edit that file.
- `image_in_use`: the media item is a portrait or background of a listed card;
  detach it before deleting.
- `not signed in`: run the sign-in step; do not retry the command in a loop.

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
