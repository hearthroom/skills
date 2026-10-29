# The CLI workflow

Everything an agent does to a Hearthroom card goes through `hearthroom`, the
command-line client. The complete manual is at
https://cli.hearthroom.club/llms-full.txt and `hearthroom <command> --help`
says the same for the installed version. Add `--json` to any command for
stable machine output; an error is one JSON object `{ "error", "detail" }`
with a non-zero exit code. The facts behind every line here are in
`platform-facts.md` (The CLI loop); when the two disagree, the facts sheet
wins.

## Setup

- Sign in once with a one-time code: `hearthroom auth login --no-wait --json`,
  give the author `user_code` and `verification_uri`, then
  `hearthroom auth login --resume`. It works over SSH. For unattended runs
  set `HEARTHROOM_TOKEN`.
  `HEARTHROOM_CONFIG_DIR` isolates an agent's session.
- `hearthroom auth status` and `hearthroom whoami` show the signed-in account
  without printing secrets. Never echo tokens.
- `hearthroom models` lists the models a card can be played with;
  `hearthroom wallet` shows the balance before a cost stance.

## A card is a folder

`hearthroom card init <dir> --language zh-Hant` creates `card.json`, `definition.md`,
`welcome.md`, `assets/` and an `AGENTS.md` (never sent) that points to this
toolkit. `hearthroom card import <file…>` turns a SillyTavern PNG / JSON /
CHARX card or an MMD three-file set into a folder, writes the same
`AGENTS.md`, and reports every source field it could not place (what the MMD
import drops is listed in the facts sheet). Edit files with any editor; the
folder format is documented in the facts sheet. The card's `README.md` is the
dossier (`card-authoring-templates.md`): `uiRole`, the status overhead
threshold, decisions, rejected directions and evidence by version.

Keep one folder per card for its whole life: iterate, rename and publish from
the same folder, and use git for drafts. A new folder per draft creates a new
trial card and, unless `media.folder` is set, a new media-library folder, which
leaves the author with copies they cannot tell apart. `hearthroom card status
<dir>` shows what the folder is linked to and which sections changed; the
naming rules are under Media library in the facts sheet.

## The loop

| Step | Command | Costs credits |
|---|---|---|
| Check the folder locally | `hearthroom card check <dir> --json` (or `node <toolkit>/scripts/check-card.mjs <dir>`); `--replay <history>` for protocol health | no |
| See what is linked and what changed | `hearthroom card status <dir> --json` | no |
| See what would be sent | `hearthroom card push <dir> --dry-run --json` | no |
| Sync to a private trial card | `hearthroom card push <dir> --validate --json` | no |
| Re-push and fail on warnings too | `hearthroom card validate <dir> --push --strict --json` | no |
| See one opening after the display rules | `hearthroom card render <dir> --push --opening N --json` (`--html file` writes the raw string) | no |
| See the real chat shell draw it | `hearthroom card preview <dir> --open` (the shell is fetched from the site and cached; `platform-facts.md`, Offline preview) | no |
| Build `lorebook.json` from `worldbook/*.md`; find keyword collisions | `hearthroom lorebook build <dir>` / `hearthroom lorebook check <dir>` | no |
| Play one turn in a fresh conversation | `hearthroom play <dir> --new-session -m "…" --allow-spend --json` | yes |
| Generate an image for the card | `hearthroom media generate --model <id> --prompt "…" --out assets/art/portrait.png --allow-spend --json` (`media models` for prices and sizes; `platform-facts.md`, Generating images) | yes, purchased credits per image |
| Read the conversation so far | `hearthroom play <dir> --history --limit 20` | no |
| Bring the provider's copy back to files | `hearthroom card pull <roleId> [dir] --force` (overwrites local files) | no |
| Keep it as an owned card (unlisted by default) | `hearthroom card push <dir> --create` | no |

`push` sends only sections whose content changed and uploads assets once. `push --to <id>` writes into a card the author already owns; on a folder
already linked to an owned card, plain `push` updates it and `--create` would
make a second card. Trial-card expiry and slots are in `cost-and-boundaries.md`. Plain pushes preserve the card's visibility.

Run --create only when the author asks. Anyone with an unlisted card's link can play the latest saved content, including changes that have not passed review. Trial cards remain private. Follow the author's existing editing authorization.

On a card that has passed review, players get the approved copy until an
update is approved, so test a push with the draft link (`platform-facts.md`,
Publishing).

## Reading the reports

`card validate --json`: `status` is `pass`, `warning` or `blocker`;
`blockers`, `warnings` and `suggestedFixes` are English sentences;
`tokenBudget` carries per-field character counts, `welcomeToDetailRatio` and
`limits`. Fix blockers before anything else. Read limits from `limits`, never
from memory. There is no count or limit for `talkExample` in the report.

`card render --json`: `rendered` is the opening after rules, before the
sanitizer and Markdown; `rules[]` has one `status` per rule with `reason`
when rolled back; `report` has `tags`, `components`, `scripts`, `styles`,
`inlineHandlers`, `externalUrls`, `crossLineRules` and `unsupported[]`
(`api`, `count`, `where`, `hint`); `warnings[]` repeats the important ones;
`previewUrl` is the play page for a browser check. The provider runs only the
rule engine: `applied` means the rule matched, not that a script drew
anything.

`play --json`: every server event is printed as one JSON object per line;
read final billing under `platform-facts.md`, CLI commands. Calls on the same folder continue
one conversation; `--new-session` starts a fresh one, and `--greeting N`
applies only when a new conversation is created. `--history` reads the
conversation back newest first (sort by `id` before pairing a line with its reply). Turns sent with `play` do not pass through the play page,
so display rules and scripts are not exercised by them.

## Spend discipline

Only `play -m` generates a reply and spends the author's credits. Before the
first turn, state the cost stance (how many turns, which models) with
`hearthroom wallet --json` and get the author's agreement. A stopped or
failed turn may still cost credits; see `platform-facts.md`. Never loop turns
unattended. The playtest standard (10–20 turns, a weak and a strong model,
`--new-session`, one shortcoming per version) is in `playtest-loop.md`.

## Author Lorebook recall details

On a connected provider that supports recall details, use `hearthroom play <dir> -m "…" --debug-recall --allow-spend` for a real paid turn, or add `--debug-recall` to an eligible `--continue --allow-spend` invocation.

Recall details help you check how your card's Lorebook entries were found and which content was sent to the model. Only the card's author can use this feature, and both `chat.play` and `role.read` are required. Normal chat billing applies.

Reading saved recall details does not search again or generate another reply. Details cannot be collected later for a turn that did not have `--debug-recall` enabled. The authenticated HTTP read is `GET /open/v1/conversation/operations/<operationId>?include=recallDebug`; it reads the same operation. Do not submit another paid turn to retrieve missing details.

With `--continue`, recall details cover only this continuation. Entries already available from earlier preparation are marked separately; they were not necessarily read again. Normal continuation billing applies. An entry being found, read or sent to the model does not mean the model used it in its reply.

With --json, recallDebug is kept separate from the answer. Server events are printed one JSON object per line; the final result may span multiple lines. Incomplete, unavailable, unsupported and not-enabled captures differ from an empty entry set. Names, keys, queries and author-owned content remain private diagnostics; keep them out of public reports.
