# Hearthroom platform facts

Every platform claim in this toolkit comes from here. If a fact is not on this
page, a skill must not assert it; say "not documented" instead. The community
site's card authoring guide (`/guide` on the site) and the CLI manual
(`https://cli.hearthroom.club/llms-full.txt`) are the primary sources.

## What Hearthroom is

Hearthroom is an open community for AI character cards. A card's content is
stored and played by a connected card provider; the community site lists,
reviews and plays cards. Authors and AI agents work on a card as a folder of
plain files with the `hearthroom` command-line client. There is no tool-protocol
server: everything an agent needs is a shell command with `--json` output.

## Vocabulary

Use the community's words. Keep the wire names only when telling an agent what
to read in `--json` output.

| Say | Wire name | Meaning |
|---|---|---|
| card | role, `roleId` | one character card |
| definition | `roleDetailDesc` | who the character is, how they speak, the world's rules; private |
| summary | `roleDesc` | short public description on the board card |
| opening | `roleWelcome` | the first message of a conversation |
| alternate openings | `welcomeAlternates` | other first messages the player can pick |
| suggested first lines | `prologue` | player-side first lines offered as choices; never the character's first message |
| example conversations | `talkExample` | `{roleType: user|ai, content}` pairs |
| custom instructions | `customInstructions` | replaces one default instruction block; not appended, not the whole system prompt |
| output contract | `roleOutputContract` | format the reply must follow |
| Lorebook, entry | worldbook, entries | keyword-triggered background knowledge |
| display rules | author asset, `rules.json` | find/replace rules that turn reply text into layout, status bars, buttons |
| function bar | `mountTrigger` | content pinned above the message list; visible to the player, never sent to the model |
| chat page | `pageMode` | `sandbox` (default for new cards) or `classic`; `immersive` exists as a legacy value |
| trial card | trial card | private, auto-expiring copy the CLI pushes to by default |
| player | user | the person chatting |

## The card folder (formatVersion 1)

```
my-card/
  card.json          manifest: name, summary, tags, type, sex, playerName, nickname,
                     language, outputContract, customInstructions, talkExample,
                     prologue, cardMeta, media.portrait, media.background
  definition.md      the definition
  welcome.md         the opening
  openings/alt-NN.md alternate openings, file-name order
  lorebook.json      { name, entries: [ … ] }
  rules.json         { rules: [{id,name,find,replace,enabled}], mountTrigger, mountLayer, pageMode, cardFormat }
  assets/            media referenced by relative path; uploaded on push
  README.md          notes; never sent to the provider
  .hearthroom/state.json   sync state written by the CLI
```

`type` is one of `companion`, `story`, `game`, `generator`. `playerName` is what
the card calls the player; placeholder values such as 你 / user / you / player
are ignored and the player's own name or a language default is used instead.
`nickname` is what `{{char}}` expands to when it differs from `name`.

## Field limits (characters)

The provider enforces these on push and reports them under
`tokenBudget.limits` in `card validate --json`. The English column applies only
when the card's language is exactly `en`; every other language, including
zh-Hant, zh-Hans, ja and ko, uses the first column. Read limits from the
validation report rather than hard-coding them.

| Field | Not English | English |
|---|---|---|
| summary (`roleDesc`) | 500 | 2500 |
| definition (`roleDetailDesc`) | 10000 | 50000 |
| opening (`roleWelcome`) | 8000 | 10000 |
| custom instructions | 2000 | 4000 |
| output contract | 4000 | 8000 |

## Lorebook

An entry has `name`, `content`, `keywords`, `secondaryKeywords`, `constant`,
`disabled`, `triggerRegion` and `matchOptions` (`caseSensitive`,
`matchWholeWords`, `selectiveLogic` 0–3: any secondary present, not all
present, none present, all present). A keyword written as `/pattern/flags` is
a regular expression; lookaround and backreferences work but run under a
timeout; an invalid pattern is not treated as literal text.

How entries reach the model in a normal conversation:

- Author keywords are matched first against the player's input and the recent
  messages (`scanDepth` 0 or omitted: this turn plus the latest reply; 1–100:
  that many real messages). Secondary keywords can veto a primary hit.
- Constant entries are always included, in priority order, as long as they fit.
  A card whose constant entries do not fit the context tier is refused with
  advice; the player can choose a smaller "trimmed" set. Keep constant entries
  few and short.
- Entries that did not match keywords may still be admitted by semantic search
  plus a reranker, within a token budget. Do not rely on it for facts that must
  appear: give those entries keywords or make them constant.
- Once admitted, an entry stays in place for later turns until the source is
  edited, deleted or reclaimed; scores do not shuffle old content.
- Long entries are split into ordered groups internally; admission keeps a
  group whole. The API still exposes the stored pieces.
- Not supported from other platforms: insertion depth, prompt role, outlets,
  sticky/cooldown, probability, recursion, group scoring, macros and scripts.
  Imports report them as unsupported.

In agent mode (the player's per-conversation setting, also `play --agent on`),
the character can list, search and read Lorebook entries by name and content
before replying. An entry named "Location 3" is invisible there: name entries
by what they contain.

## Display rules

Reply text passes through every enabled rule, in order, before display; the
model never sees the result.

- `find`: a fixed string (literal, all occurrences) or `/pattern/flags`.
  Flags `gimsuy`; `g` is always added. Leading and trailing backticks are stripped.
- `replace`: any HTML, including `<style>` and `<script>`. `$1`…`$99` are
  capture groups (a missing group stays literal); `$name` reads a key from a
  first capture shaped `hp::85;;mood::shy`; `{{random:a::b}}` picks one option.
  `{{user}}` and `{{char}}` expand first.
- Chinese characters in `find` match both Traditional and Simplified forms.
- A rule is rolled back, not partially applied, when its pattern is invalid
  (`bad_regex`), can match the empty string (`empty_match`), its replacement
  alone exceeds the budget (`replacement_alone`), the output would exceed
  256 KB or four times the input (`volume`), or matching times out (`timeout`).
- Relative media sources (`<img src="x">`) are neutralised to `data:,` so a
  broken-image `onerror` boot still fires without hitting the site.
- Limits: one replacement at most 128 KB; the whole rule set at most 32 MB.
- `mountLayer`: `under`, `over` or `cover`. `cardFormat`: `mmd` or `tavern`
  (how `<style>` in rules is scoped).

`hearthroom card render` runs these rules on the provider with the same engine
the play page uses and returns `rendered`, `rules[]` with one `status` per
rule (`applied`, `unmatched`, `disabled`, `empty`, `rolled_back` + `reason`),
and `report`: a static scan (`chars`, `estimatedTokens`, `tags`, `components`,
`scripts`, `styles`, `inlineHandlers`, `externalUrls`, `crossLineRules`) plus
`report.unsupported[]`: author-API identifiers the card's chat page does not
provide, each with `api`, `count`, `where` and a `hint`. `warnings[]` repeats
the important ones in prose and `previewUrl` is the play page link. Markdown, layout and contrast are
only visible on the play page; the command prints that link.

## Chat pages

**Sandbox** (default for new cards): the card's rules and scripts run in an
isolated page. Styles and scripts can restyle the whole chat screen; scripts
cannot read the player's login state or make requests to external URLs
(external `<script src>`, images and fonts load). Actions that spend credits
respond only to the player's own clicks.

The sandbox author API is identical to the new-style sandbox on Meimo Island
(MMD), so the same script runs on both:

- Nodes: `[data-chat="root"]` (`data-theme` dark|light, `data-composer`),
  `[data-chat="message"]` (`data-from` ai|user, `data-state`
  pending|streaming|done, `data-msg-id`), `[data-chat="message-body"]`,
  `[data-slot="statusbar"]`, `[data-slot="left"]` / `[data-slot="right"]`
  (docked sidebars), `[data-chat="author-stage"]`, `[data-chat="input"]`,
  `[data-chat="composer"]`. Select by these attributes, not by class names.
- Theme: `--chat-*` CSS variables (`--chat-bg`, `--chat-text`, `--chat-accent`,
  `--chat-bubble-ai-bg`, …) on the root node.
- `sdk.input.get/set/add/insert/clear/focus/blur/getCursor/setCursor`,
  `sdk.composer.show/hide/visible`, `sdk.message.send(text)` and
  `sdk.message.edit(id, text)` (confirmation unless from the player's own
  click), `sdk.save.get/set/remove/keys` (at most 10 keys per card per player,
  64 KB each, kept across devices), `sdk.cache.*` (this page load only),
  `sdk.stage.open('content'|'full')/close/el/visible`, `sdk.role.get()`,
  `sdk.user.get()`, `sdk.on(event, handler)`, `sdk.debug.log(...)`
  (`?sdkDebug=1` shows the panel).
- Events: `ready`, `message:new`, `message:mount`, `message:stream`,
  `message:done`, `message:unmount`, `input:change`, `conversation:switch`,
  `theme:change`, `back`, `stage:close`, `dispose`. Existing messages replay
  `message:new` / `mount` / `done` on open, then `ready`. Inside a handler,
  `document.querySelector` searches only that message.
- Error codes: `UNAUTHORIZED`, `RATE_LIMITED`, `INVALID_ARGS`, `HOST_DENIED`,
  `BUSY`, `NOT_SUPPORTED`.
- Not provided anywhere: MMD's platform state variables (`sdk.vars`,
  `<abc_vars>`).

**Classic**: rules are applied directly onto the site's chat page. The
selectors authors used there (`.mes`, `.mes_text`, `.mes.Ai` / `.mes.User`,
`#msglistview`, `.chat-scope-box`) also exist in the sandbox. The classic page
has no `sdk`, no `[data-chat]` nodes and no `--chat-*` variables; a card that
uses them must set `pageMode` to `sandbox`. `<img onerror>` boot scripts work
on both pages.

Sidebars docked flush to an edge and about 48 px wide or less get room made
for them automatically; `--lt-dock: left|right|none` on the element overrides
detection.

## HTML card components

Inside a reply or an opening, these `hc-*` elements and classes render on the
play page: `hc-btn` (`send`, `copy`, `bg`, `w`), `hc-bar`, `hc-meter`,
`hc-stat`, `hc-tabs` / `hc-tab`, `hc-list` / `hc-item`, `hc-collapse`,
`hc-toggle`, `hc-form` / `hc-input` / `hc-checkbox` / `hc-radio` / `hc-option`,
`hc-choices`, `hc-alert`, `hc-notice`, `hc-tag`, `hc-badge`, `hc-panel`,
`hc-card`, `hc-quote`, `hc-speaker`, `hc-avatar`, `hc-info-row`, `hc-hr`,
`hc-p`, layout helpers (`hc-f`, `hc-fw`, `hc-fj`, `hc-g`, `hc-c`, `hc-d`,
`hc-h`, `hc-mt`, `hc-mb`, `hc-my`, `hc-pt`, `hc-pb`), tones (`hc-primary`,
`hc-secondary`, `hc-success`, `hc-warning`, `hc-danger`, `hc-soft`, `hc-dark`,
`hc-light`) and backgrounds (`hc-bg-dark`, `hc-bg-night`, `hc-bg-glass`,
`hc-bg-dim`, `hc-bg-aurora`, `hc-bg-gold`, `hc-bg-blood`, `hc-bg-forest`,
`hc-bg-blue`, `hc-bg-cyan`, `hc-bg-green`, `hc-bg-orange`, `hc-bg-pink`,
`hc-bg-purple`, `hc-bg-red`), plus effects `hc-glow`, `hc-glow-text`,
`hc-gradient-text`, `hc-shimmer`, `hc-pulse`, `hc-pulse-border`,
`hc-text-outline`, `hc-shadow`. `card render` lists the ones a rendered opening
uses under `report.components`.

## The CLI loop

```
hearthroom auth login                        # once; HEARTHROOM_TOKEN for unattended runs
hearthroom card init <dir> | card import <file…>   # SillyTavern PNG/JSON/CHARX, MMD three-file set
hearthroom card push <dir> --validate --json # private trial card + validation report
hearthroom card render <dir> --json          # opening after display rules, per-rule outcome, scan
hearthroom play <dir> -m "…" --allow-spend --json   # one real turn; spends credits
hearthroom card pull <dir>                   # bring the provider's copy back to files
hearthroom card push <dir> --create          # keep it: a real private card on the site
```

- Pushing, validating, rendering, importing, pulling and browsing are free.
  Only `play -m` generates and needs `--allow-spend`.
- A trial card expires three days after its last push; an account holds at
  most five (`--evict` frees the oldest). The site's inventory does not list
  trial cards, but their play link works for the author.
- `play --greeting N` starts from an alternate opening, `--agent on|off` sets
  agent mode for the turn, `--model` picks a model from `hearthroom models`,
  `--history` prints recent messages, `--stop` cancels a reply.
- `card validate --json` returns `status` (`pass` | `warning` | `blocker`),
  `blockers`, `warnings`, `suggestedFixes` and `tokenBudget` with
  `roleDescChars`, `roleDetailDescChars`, `roleWelcomeChars`,
  `customInstructionsChars`, `roleOutputContractChars`, `totalChars`,
  `estimatedTokens`, `welcomeToDetailRatio` and `limits`.
- Consecutive `play` calls on the same folder continue one conversation: the
  first call opens it, later calls resume it, and the folder's sync state
  remembers it. `--greeting N` applies when a new conversation is created.
- An MMD rules file marked `chatVersion: 1` imports as `pageMode: sandbox`;
  trial cards keep `pageMode` and `cardFormat`.

## Publishing

`card push --create` makes a real private card that appears in the author's
inventory on the site. Submitting for community review happens on the site:
review applies to one frozen version of the card, submitted together with a
content rating; changing content makes a new version that needs its own review. Reviewers see a similarity score for the
definition against other submitted and approved cards (reviewers only; the
author's own other cards are excluded). Originality of the definition text
matters.

## Costs and boundaries

Generation spends the player's credits at the provider's model rates; agent
mode turns are billed on actual usage, including turns that fail or are
stopped. Drafting, validating and rendering cost nothing beyond the agent's own
usage. Keep all work on trial cards or the author's private cards; never
publish or submit on the author's behalf without an explicit request.
