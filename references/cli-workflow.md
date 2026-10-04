# The CLI workflow

Everything an agent does to a Hearthroom card goes through `hearthroom`, the
command-line client. The complete manual is at
https://cli.hearthroom.club/llms-full.txt and `hearthroom <command> --help`
says the same for the installed version. Add `--json` to any command for
stable machine output; errors are one JSON object with a non-zero exit code.

## Setup

- Sign in once with a one-time code: `hearthroom auth login --no-wait --json`,
  give the author `user_code` and `verification_uri`, then
  `hearthroom auth login --resume`. It works over SSH; details in
  `platform-facts.md`. For unattended runs set `HEARTHROOM_TOKEN`.
  `HEARTHROOM_CONFIG_DIR` isolates an agent's session.
- `hearthroom auth status` and `hearthroom whoami` show the signed-in account
  without printing secrets. Never echo tokens.
- `hearthroom models` lists the models a card can be played with.

## A card is a folder

`hearthroom card init <dir>` creates `card.json`, `definition.md`,
`welcome.md` and `assets/`. `hearthroom card import <file…>` turns a
SillyTavern PNG / JSON / CHARX card or an MMD three-file set into a folder and
reports every source field it could not place. Edit files with any editor; the
folder format is documented in the facts sheet.

## The loop

| Step | Command | Costs credits |
|---|---|---|
| Sync to a private trial card | `hearthroom card push <dir> --validate --json` | no |
| Read the provider's report | `hearthroom card validate <dir> --json` | no |
| See an opening after the display rules | `hearthroom card render <dir> --json` (`--opening N`, `--html file`) | no |
| Play one turn | `hearthroom play <dir> -m "…" --allow-spend --json` | yes |
| Read the conversation so far | `hearthroom play <dir> --history` | no |
| Bring the provider's copy back to files | `hearthroom card pull <dir>` | no |
| Keep it as a real private card | `hearthroom card push <dir> --create` | no |

`push` sends only sections whose content changed and uploads assets once.
Trial cards expire three days after the last push; an account holds five
(`--evict` frees the oldest). `push --to <id>` writes into a card the author
already owns.

## Reading the reports

`card validate --json`: `status` is `pass`, `warning` or `blocker`;
`blockers`, `warnings` and `suggestedFixes` are English sentences;
`tokenBudget` carries per-field character counts and `limits`. Fix blockers
before anything else. Read limits from `limits`, never from memory.

`card render --json`: `rendered` is the opening as the renderer receives it;
`rules[]` has one `status` per rule with `reason` when rolled back; `report`
has `tags`, `components`, `scripts`, `styles`, `inlineHandlers`,
`externalUrls`, `crossLineRules` and `unsupported[]` (`api`, `count`,
`where`, `hint`); `warnings[]` repeats the important ones; `previewUrl` is the
play page for a browser check.

`play --json`: one JSON object per event. The turn ends with a `done` event
and an operation summary that says what was charged. Calls on the same folder
continue the same conversation; `--history` reads it back.

## Spend discipline

Only `play -m` generates a reply and spends the author's credits. Before the
first turn, state the cost stance (how many turns, which model) and get the
author's agreement. A stopped or failed turn is still billed for the calls it
made. Never loop turns unattended.
