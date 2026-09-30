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
                     prologue, cardMeta, media.portrait, media.background,
                     media.backgroundLandscape
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

Two backgrounds: `media.background` is the portrait (9:16) baseline and
`media.backgroundLandscape` is an optional landscape (16:9) image the chat
page prefers on wide screens, falling back to the portrait one. Both are
cropped to cover the screen, so keep important elements inside the central
75% of each image. On push they become `roleBackground` and
`roleBackgroundLandscape`.

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
`disabled`, `triggerRegion` (stored and exported, not used by recall) and
`matchOptions`: `selective` (whether secondary keywords apply),
`selectiveLogic` 0–3 (any secondary present, not all present, none present,
all present), `caseSensitive`, `matchWholeWords`, `scanDepth` (0–100),
`order` (stable author order among newly admitted entries), `groupId` /
`groupOrder` (pieces of one long entry) and `extensions` (kept from imports,
never executed). A keyword written as `/pattern/flags` is a regular
expression; lookaround and backreferences work but run under a timeout; an
invalid pattern is not treated as literal text.

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
  The 128 KB counts UTF-8 bytes, so comments in Chinese cost three bytes a
  character. A large script is easier to keep under it when the build strips
  whole-line comments and indentation, and when script and stylesheet live in
  two rules that the same function-bar trigger mounts.
- Only literal relative paths written in a rule (`"assets/art/a.webp"`) are
  detected and uploaded on push. A path assembled at runtime
  (`"assets/art/" + id`) is not found; list every file literally, for example
  in a lookup table.
- Markers the model emits: a rule that consumes an angle-bracket marker such
  as `<scene>…</scene>` works, because rules run before the sanitizer; a
  marker no rule matches is stripped silently. Some models drop the closing
  tag, so write `(?:</scene>)?` or stop at the next `<`. The page's Markdown
  pass can join the lines inside a marker into one line, so parse fields by
  key name (`hp=…`), not by line breaks.
- `mountLayer`: `under`, `over` or `cover`. `cardFormat`: `mmd` or `tavern`
  (how `<style>` in rules is scoped).

On the sandbox page the result then passes a sanitizer before display:

- Tags outside an allowlist are removed and their text kept. The allowlist is
  ordinary HTML (`div`, `span`, `p`, headings, lists, `table`, `img`, `a`,
  `button`, `input`, `textarea`, `select`, `details` / `summary`, `progress`,
  `meter`, `canvas`, `video`, `audio`, `svg` and its shapes, and more). Custom
  elements and tags with Chinese characters such as `<状态>` are not on it, so
  a marker the model must emit for a rule should use square brackets
  (`[status]…[/status]`) or be consumed by a rule before display.
- `<script>` and `<style>` inside a message are dropped there: rule scripts
  and styles are extracted once when the card loads. `iframe`, `form`,
  `object`, `embed` are unwrapped.
- `data-*`, `aria-*` and `role` attributes written by the author are removed;
  `on*` handlers on ordinary elements are kept (that is how card buttons
  work); `on*` inside `<svg>` and `javascript:` URLs are removed.
- The provider's `card render` shows the text before this sanitizer runs.

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
  `sdk.user.get()` (name, avatar and `locale`, the player's interface
  language such as `zh-Hans`), `sdk.text.convert(text)` and
  `sdk.text.ready()` (see Chinese script below), `sdk.on(event, handler)`,
  `sdk.debug.log(...)`
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
- `data-msg-id` is not stable across a reload: during a session a new message
  carries a local id (a millisecond timestamp), after a reload the same
  message carries the server id (a UUIDv7, whose first 48 bits are also
  milliseconds). Key anything you store per conversation on message content,
  not on ids; to order messages, read the time from either kind of id.
- The message list is virtualised: recent messages mount first and older ones
  mount as the player scrolls, not always contiguously. A layout that shows
  the whole conversation (pages, a timeline) keeps its own copy in
  `localStorage`, merges what mounts, drops duplicates by body text and sorts
  by id time; mount order is not conversation order.
- Do not start a first-run animation on `ready` alone; wait until the replayed
  messages have settled (`message:done` quiet for a moment).
- The page runs in a cross-origin iframe. Browser automation can take
  screenshots and accessibility snapshots of it but cannot script it, and
  device APIs such as viewport segments may report a single segment there.
- Chinese script (Simplified or Traditional) follows the player's interface
  language, as a display step only: stored and sent text stays as written.
  After the rules run, the page converts visible text nodes of replies and of
  the function bar. It does not convert attributes (`title`), CSS `content`,
  `<script>` / `<style>`, subtrees marked `translate="no"` or
  `class="notranslate"`, or text a card script creates. It also leaves a
  string alone when it cannot tell the source script, which catches single
  characters and short mixed labels. `find` patterns match both scripts
  (the server widens each Chinese character to a class). The converter loads
  on demand; `sdk.text.ready()` resolves once it has, and
  `sdk.text.convert(text)` converts a string the same way.
- A card script that reads reply text back sees the player's script, not the
  one the card was written in. Normalise it to the card's script before
  matching or hashing, with a complete single-character table so the result
  is not half one script and half the other (the converter will not convert
  a mixed string back). Normalisation runs in both directions and only on a
  mismatch: a Traditional card read by a Simplified player normalises to
  Traditional, a Simplified card read by a Traditional player normalises to
  Simplified, and a same-script player sees the text untouched. For the
  one-to-many direction (Simplified to Traditional), take OpenCC's first
  candidate but keep a character the card itself uses as written (卷, 里, 后),
  or correct text is rewritten (卷 becomes 捲); do not drop such characters
  from the table altogether, or strings stay half converted (青云崖·拂曉). Text the script draws itself needs `sdk.text.convert`
  plus a small character table for short labels; CSS `content` strings need
  a variant per script.
- The site header is `[data-chat="header"]`; the classes inside it are site
  internals. A card that moves its own bar into the header must fall back to
  `[data-slot="statusbar"]` when the header is hidden or changes.

**Classic**: rules are applied directly onto the site's chat page. The
selectors authors used there (`.mes`, `.mes_text`, `.mes.Ai` / `.mes.User`,
`#msglistview`, `.chat-scope-box`) also exist in the sandbox. The classic page
has no `sdk`, no `[data-chat]` nodes and no `--chat-*` variables; a card that
uses them must set `pageMode` to `sandbox`. `<img onerror>` boot scripts work
on both pages.

Sidebars docked flush to an edge and about 48 px wide or less get room made
for them automatically; `--lt-dock: left|right|none` on the element overrides
detection.

## HTML in openings and replies

Openings and replies may contain HTML; the chat page renders it, and display
rules add `<style>` and `<script>` around it. Write ordinary HTML and CSS.

The `hc-*` custom elements and classes (`hc-btn`, `hc-bar`, `hc-stat`,
`hc-tag`, `hc-collapse`, `hc-form` and the `hc-bg-*` / `hc-glow` classes) are
a legacy of the classic chat page: only the classic page registers them and
loads their stylesheet. The sandbox page, which new cards use by default,
does not, so there an `<hc-btn>` renders as an unknown empty element. Do not
write `hc-*` markup for new cards. For a button that sends a player line on
the sandbox page, use a display rule with a plain `<button>` and
`sdk.message.send(text)`; for bars, facts and panels, use plain HTML and CSS
in the rule's replacement. `card render --json` still lists `hc-*` classes it
finds under `report.components` so imported classic-page cards can be spotted.

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
