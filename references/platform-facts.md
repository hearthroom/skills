# Hearthroom platform facts

Every platform claim in this toolkit comes from here. If a fact is not on this
page, a skill must not assert it; say "not documented" instead. The community
site's card authoring guide (`https://sukisuki.ai/en/guide.md`, the Markdown of
`/guide`; `/guide.md` and `/<locale>/guide.md` for other languages) and the CLI manual
(`https://cli.hearthroom.club/llms-full.txt`) are the primary sources.

## Where these facts come from

The chat page is open source: `https://github.com/hearthroom/moonstage`
(the `stage` submodule of the community site, `hearthroom/hearthroom`). The
sandbox section of this page is prose over `scripts/sandbox-contract.json`,
which that repository generates from its runtime objects
(`src/sandbox/__tests__/contract.spec.ts`). When a fact you need is not on
this page, or a card contradicts it, read the source rather than guessing,
in this order and no further: `contract/sandbox-contract.json`,
`docs/sandbox-chat-page.md`, `src/sandbox/sdk/create-sdk.ts`,
`src/sandbox/sdk/events.ts`, `src/sandbox/sanitize.ts`, `src/sandbox/rules.ts`,
`src/sandbox/scope.ts`, `src/sandbox/author-scripts.ts`,
`src/sandbox/shell.ts`, `src/sandbox/shell.css`, `src/common/native-blocks.ts`,
`src/utils/display-rule-engine.js`, and `bench/card-preview` for the offline
harness. Then add what you learned to this page (feed lessons back) instead
of carrying it in your head. Three cautions: read `origin/main`, not
whatever checkout is lying around; the play page renders replies on the host path and the
shell renders only its own previews, so note which path a line of code is on;
and never depend on nodes or classes the contract lists as internal. The
deployed site may lag `main`: `hearthroom card preview` fetches the deployed
shell, so what it shows is what players get today. The rule engine's source
is shared byte for byte with the provider's `card render`.

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
| definition | `roleDetailDesc` | who the character is, how they speak, the world's rules; private. The site's guide calls it the "Persona" |
| summary | `roleDesc` | short public description on the board card |
| opening | `roleWelcome` | the first message of a conversation |
| alternate openings | `welcomeAlternates` | other first messages the player can pick |
| suggested first lines | `prologue` | player-side first lines offered as choices; never the character's first message |
| example conversations | `talkExample` | `{roleType: user|ai, content}` pairs |
| custom instructions | `customInstructions` | the site editor's 額外指示 ("a reminder attached at the end of every turn"). Per the provider's prompt code it is a system message after the history, followed only by the platform's short format guard and the `[Response preferences]` block (which carries any `responseDefaults` notes), prefixed `[Content scope]` / `[內容範圍]`; a non-empty value replaces the platform's default content-scope block (which, in Chinese, frames the story as mature literary writing with romance and physical intimacy). A player's own text in their persona's Advanced field replaces the card's; it is left out at the strictest safety level |
| output contract | `roleOutputContract` | format the reply must follow. Per the provider's prompt code it is sent under a `[Role Reply Format Template]` header saying platform format rules win over it; with the ordinary history policy it sits after the history (near generation), but with the cache-stable policy it moves into the stable prefix before the history, far from generation. `customInstructions` is always after the history (`instruction-guardrails.md`). A near-generation guard also tells the model to keep the latest reply's visible shape, so a format change takes hold in new conversations (they copy the opening and example conversations, which must use the new format) and is pulled back toward the old shape in existing ones |
| Lorebook, entry | worldbook, entries | keyword-triggered background knowledge |
| display rules | author asset, `rules.json` | find/replace rules that turn reply text into layout, status bars, buttons |
| function bar | `mountTrigger` | content pinned above the message list; visible to the player, never sent to the model. It is rendered once when the page loads from its own text (rules run over that text, never over a reply). A `<script>` written in the bar's text is dropped when the shell renders the bar itself (previews, the offline harness) and run once after mount when the play page's host renders it; an `<img onerror>` boot in it runs on both; put scripts in a rule, not in the bar. Anything in it that must change with the conversation is changed by a rule script |
| chat page | `pageMode` | `sandbox` (default for new cards) or `classic`; `immersive` exists as a legacy value |
| trial card | trial card | private, auto-expiring copy the CLI pushes to by default |
| player | user | the person chatting |

## The card folder (formatVersion 1)

```
my-card/
  card.json          manifest: name, summary, tags, type, sex, playerName, nickname,
                     language, outputContract, customInstructions, talkExample,
                     prologue, cardMeta, responseDefaults, media.portrait,
                     media.background, media.backgroundLandscape, media.share,
                     media.folder
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

`responseDefaults` (CLI 0.6.0) sets the card's defaults for the player's
Response preferences; an axis left out starts the player on the platform
default.

| Key | Values (platform default first) |
|---|---|
| `agency` | `protect` never writes the player's part; `assist` fills in details of actions the player stated; `lines` may write the player character's lines but not decisions; `coauthor` may write words, actions and decisions |
| `style` | `default` platform writing guide; `guided` a lighter guide that defers to the card's material; `card` no platform guide; `custom` with `customStyle` (at most 1000 characters) |
| `perspective` | `card` follow the material; `first_character`; `second_user`; `third_limited`; `third_omniscient` |
| `length` | `auto`; `recommended` 2 to 5 paragraphs, about 2500 characters; `target` with `lengthTarget`, one of 200, 300, 400, 500, 600, 800, 1000, 1200, 1500, 2000, 2500, 3000, 4000, 5000, 7000, 10000 characters |
| `pace` | `natural`; `linger`; `advance` |
| `agencyNote`, `styleNote`, `perspectiveNote`, `lengthNote`, `paceNote` | one line, at most 200 characters, refining that axis; it wins where it differs from the option |

How the player's choices combine with the card's:

- An axis the player has not touched uses the card's value.
- A player who picks a different option keeps their choice, and the card's
  note, custom style and length target for that axis stop applying.
- Picking the card's own option (or the platform default where the card
  set none) keeps all of them. A player's own note replaces only the card's
  note on that axis.
- A push reaches existing conversations from their next reply, on every
  axis the player has not moved off the card's option.
- `"responseDefaults": {}` clears the server copy; deleting the key from
  `card.json` leaves the server copy in place.

The notes are the latest text the card controls: they sit in the
`[Response preferences]` block after the history, after `customInstructions`.

Per the provider's prompt code, every conversation on this provider gets a
`[Roleplay]` preamble before the card ("keep the response inside the story;
follow the response preferences after the history"), and `style` decides
the writing guide after it: `default` and `guided` add one whose last word
is that everything written stays inside the story; `card` and `custom` add
none. Out-of-story blocks the card asks for (`[status]`, `[choices]`, side
channels) compete with that line: in a small test a weak model dropped them
in two of three turns with `guided` and kept them with `card` and with
`default`.

One portrait, three crops: `media.portrait` (9:16) is the board cover
(cropped to about 3:4), the chat avatar (cropped to a 1:1 circle) and, when
no background is set, the chat background (cropped to cover). Per the site's
source every cover slot (board tile, card page, own cards, review list) crops
3:4 from the centre, and the board and own-cards tiles zoom 4% on hover; with
the avatar's circle, the area every crop keeps is about the centre square of
the portrait. Keep the head inside the central circle and the silhouette
inside the middle 3:4 band.
Backgrounds are optional: `media.background` (9:16) and
`media.backgroundLandscape` (16:9, preferred on wide screens, falling back to
the portrait one). All are cropped to cover the screen, so keep important
elements inside the central 75% of each image. `media.share` (1200 × 630,
optional; pushed by CLI 0.7.0 and later) is the link-preview image; without it the site uses the landscape
background, then the portrait (`visual-identity.md`, The share image). On push they become `roleAvatar`, `roleBackground`,
`roleBackgroundLandscape` and `roleShareImage`. Per the site's source, the board
tile and the card page show the portrait, but the author's own "my cards"
tile shows the background first and falls back to the portrait. The chat
stage draws the background on `.chat-scope-box` (`--lt-bg-portrait`, and
`--lt-bg-landscape` in landscape), and a card's CSS may override that node, so
a card can point `media.background` at its cover and set its real chat
background in its own stylesheet. `card pull` leaves `media.background` out
when it equals the portrait.

## Media library

Every file under `assets/` goes into one folder of the author's media
library, and the served URL mirrors the path:
`assets/art/expr/happy.webp` → `<libraryPrefix>/<folder>/art/expr/happy.webp`.
The folder is `media.folder` in `card.json`, or the card name when unset; the
first push records it, so a later rename of the card does not move files.
The author manages the library by these names, so they must read as what
they are.

- Choose the folder: the card name, or one shared name for a series whose
  cards reuse the same art (set `media.folder` to it in every card).
- A library folder is a directory: each file is in exactly one folder, and
  its URL is its path. Renaming or moving a folder or file therefore changes
  its URLs and the old ones stop working. Rename with
  `hearthroom media mv <old> <new>`: it lists the author's cards that still
  mention the old URLs; update them or tell the author which will break, then
  run it with `--yes` and set `media.folder` to the new name. A push follows
  files renamed on the website and uploads again files deleted there.
- Name files for what they show and group them by job: `art/bg/night.webp`,
  `art/expr/shy.webp`, `art/npc/elder.webp`, `ui/frame.webp`. Never put a hash,
  card id, date or version number in a folder or file name. Paths are
  case-sensitive; use lowercase ASCII with hyphens for any name code builds.
- Upload the final size and format; replacing a file at the same path changes
  it for every card that uses it, which is how a shared asset is updated.
- If the push stops because the folder already holds files this card did not
  upload, pick a new `media.folder`, or set it to that folder only when the
  card is meant to share it.

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
invalid pattern is not treated as literal text. Whether a plain keyword
matches both Chinese scripts is not documented (display-rule `find` does):
for Chinese cards list both forms of a noun the player might type. Entry
length is limited per card language (`language` in `card.json`; the
numbers are not documented, so read the validation warnings).

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
- `assets/` paths written in a rule are uploaded on push and rewritten to
  their served URL. A directory reference uploads every file in that
  directory and rewrites the directory part, so the file name can come from
  the reply: `<img src="assets/art/expr/$1.webp">` for a find of
  `/<face>(\w+)<\/face>/`, or `"assets/art/expr/" + mood + ".webp"` and
  `` `assets/art/expr/${mood}.webp` `` in a script. Name those files exactly
  after the values the model emits, and list the allowed values in the
  output contract so a reply cannot ask for a file that does not exist.
- Markers the model emits: a rule that consumes an angle-bracket marker such
  as `<scene>…</scene>` works, because rules run before the sanitizer; a
  marker no rule matches is stripped silently. Some models drop the closing
  tag, so write `(?:</scene>)?` or stop at the next `<`. The page's Markdown
  pass can join the lines inside a marker into one line, so parse fields by
  key name (`hp=…`), not by line breaks.
- `mountLayer`: `under`, `over` or `cover`. `cardFormat`: `mmd` or `tavern`
  (how `<style>` in rules is scoped).

On the sandbox page the result then passes a sanitizer before display. There
are two render paths: on the play page the host computes each reply's HTML
with the ordinary card pipeline (standard HTML tags and hyphenated custom
elements kept, non-standard tag names stripped with the text kept) and sends
it to the shell; the shell's own path below applies when it renders a body
itself (the function bar, previews, the offline harness, a reply with no host
view). Whether the host path removes author `data-*` is not established from
its source; authors have seen it removed on the play page. Write for the
stricter path everywhere, and select your own elements by class:

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
the important ones in prose and `previewUrl` is the play page link. The
provider runs only the rule engine: it does not execute scripts, simulate
`sdk` events, or run the sanitizer or Markdown, so `applied` means the rule
matched, not that the screen is right. Markdown, layout and contrast are only
visible on the play page or in the offline preview below.

## Chat pages

**Sandbox** (default for new cards): the card's rules and scripts run in an
isolated page. Styles and scripts can restyle the whole chat screen; scripts
cannot read the player's login state or make requests to external URLs
(external `<script src>`, images and fonts load). Actions that spend credits
respond only to the player's own clicks.

The sandbox author API has the same shape as the new-style sandbox on Meimo
Island (MMD), so a script written for that page runs here; the differences are
listed at the end of this section. The complete, generated inventory (every
capability, event, node, variable, limit and sanitizer rule, produced from the
chat page's source) is `../scripts/sandbox-contract.json`; this section is its
prose.

- Nodes: `[data-chat="root"]` (`data-theme` dark|light, `data-composer`,
  `data-chrome` standard|host|shell, `data-busy` 1 while a reply generates),
  `[data-chat="message"]` (`data-from` ai|user|system, `data-state`
  pending|streaming|done, `data-msg-id`), `[data-chat="message-body"]`
  (`data-generating="1"` while the body is a placeholder, so never read it as
  reply text), `[data-chat="author-stage"]` (`data-stage` closed|content|full),
  `[data-chat="header"]`, `[data-chat="composer"]`, `[data-chat="input"]`.
  Slots: `[data-slot="statusbar"]` (exists only when the function bar is
  non-empty), `left` / `right` (zero-width positioned columns beside the
  message area; content placed there is a docked sidebar and the message
  column makes room), `header-extra`, `toolbar`. There is no per-message slot.
  The shell's remaining nodes are internal (`author-css`, `author-script`,
  `messages`, `list`, `list-spacer`, `message-frame`, `message-avatar`,
  `header-back`, `header-title`, `header-actions`, `composer-row`, `more`,
  `panels`, `sdk-debug`): do not depend on them.
  Select by these attributes, not by class names; the legacy selectors `.mes`,
  `.mes_text`, `#msglistview`, `#scrollview`, `.chat-scope-box`, `#chat` are
  also present. `role: system` rows (platform notices) are drawn but emit no
  author events.
- Theme: 29 `--chat-*` variables, defined on `[data-theme="dark"]` and
  `[data-theme="light"]` (not on `:root`): `bg`, `surface`, `text`,
  `text-muted`, `border`, `accent`, `bubble-user-bg`, `bubble-ai-bg`,
  `bubble-text`, `share-pick-bg`, `composer-bg`, `composer-text`,
  `shortcut-bg`, `shortcut-text`, `input-bg`, `input-text`,
  `input-placeholder`, `input-border`, `modal-bg`, `modal-surface`,
  `modal-text`, `modal-muted`, `modal-accent`, `modal-input-bg`,
  `modal-input-text`, `modal-cancel-bg`, `modal-btn-bg`, `modal-btn-border`,
  `more-item-bg`; the four `bubble-*` / `more-item-bg` ones are aliases of
  others. `--chat-viewport-height` is set inline by the host. Override on
  `[data-chat="root"][data-theme="…"]` (specificity 0,2,0) and no
  `!important` is needed; the shell's own CSS sits in `@layer lt-base`, so an
  unlayered author stylesheet always wins. `--rpx` is `calc(100vw / 750)`
  and `calc(375px / 750)` from 961 px wide: size layout in `--rpx`, text in px.
  z-index: platform nodes `auto`, stage content 2000, stage full 3000, the
  shell's own dialog 9000; use 3500–7999 for your overlays.
- **Theme is the platform's.** A card in MMD format (`cardFormat` empty or
  `mmd`, the default) is locked to dark: `data-theme` is always `dark` and
  `theme:change` never fires for it. A card in tavern format follows the
  player's light or dark setting. Write both sides anyway and read
  `data-theme`; never set it.
- `sdk.input.get/set/add/insert/clear/focus/blur/getCursor/setCursor`
  (writes throw `INVALID_ARGS` during an IME composition),
  `sdk.composer.show/hide/visible`, `sdk.message.send(text)` (no argument
  sends the input box; `BUSY` while a reply generates, never queued;
  confirmation dialog unless called inside the player's own click, declined =
  `UNAUTHORIZED`; the call must be in the same task as the click, so no
  `await` before it) and `sdk.message.edit(id, text)` (`id` is the bubble's
  `data-msg-id`, the server id; same confirmation rule),
  `sdk.save.get/set/remove/keys` (keys `[A-Za-z0-9_-]{1,64}`, at most 10 keys
  per card per player, 64 KiB each as the UTF-8 bytes of the JSON value, kept
  across devices; `get` and `keys` throw `HOST_DENIED` synchronously until the
  saves have loaded, so wrap them in `try`), `sdk.cache.*` (this page load
  only, 1 MiB in all), `sdk.stage.open('content'|'full')/close/el/visible`
  (`el()` returns the node even when closed, so decide by `visible()`; your
  own `close()` does not emit `stage:close`), `sdk.role.get()` → `{name,
  avatarUrl}`, `sdk.user.get()` → `{nickname, avatarUrl, locale}` (the key is
  `nickname`, not `name`), `sdk.text.convert(text)` and `sdk.text.ready()`
  (see Chinese script below), `sdk.model.get()` → `{name, cost}` (the
  player's current model as the header names it, and the next turn's
  estimated credits as the composer shows them, a range such as `127–251`
  for dynamic pricing; empty strings until the page sends them),
  `sdk.archive.list()/save(title?)/fork(messageId)/open(id)/start(opening?)/rename(id, title)/remove(id)`
  (the platform's conversation saves, up to 20 per card including the current
  one, across devices: `open` loads a save and the current progress stays in the
  list; `save` keeps a named copy of the current progress, returning
  `{id, current}`; `fork` starts a save from a message's `serverId`; `start`
  begins a new save from opening 0 or an alternate; `list` returns `{items,
  count, limit}` with `id, title, isCurrent, messageCount, lastMessage,
  createTime, lastUpdateTime`; changes run directly inside a user gesture, so
  the card confirms with its own screen, and outside one the shell asks first;
  a full list rejects with `LIMIT_REACHED` and `err.data = {count, limit}`;
  10 changes a minute), `sdk.on(event, handler)` (`sdk.off` and `sdk.once` do not
  exist; a misspelled event or capability never fires and never errors),
  `sdk.debug.log(...)` (`?sdkDebug=1` shows the panel). `sdk.version` is the
  string `'1'`. Rate limits per minute: `save.set` 20, `message.send` 3 by
  gesture and 3 automatic, `message.edit` 10 → `RATE_LIMITED`.
- Events: `ready`, `message:new`, `message:mount`, `message:stream`,
  `message:done`, `message:unmount`, `input:change`, `conversation:switch`,
  `theme:change`, `back`, `stage:close`, `dispose` (`conversation:switch` carries
  `{conversationId}` after a load, save, fork or new save), `model:change` (payload
  as `sdk.model.get()`, fired only when the name or the cost changes).
  Handlers get one argument:
  `{id, role, content, serverId}` for `message:*` (`message:stream` has no
  `serverId`; `serverId` is `null` for player messages and the greeting), a
  string for `input:change`, nothing for the rest. On a cold start every
  existing message fires `new` → `mount` → `done`, and `ready` comes last;
  `mount` and `done` are replayed to late subscribers for every bubble still
  on screen, `ready` is never replayed, and each message gets exactly one
  `done`. The list is virtualised: a bubble about two screen heights away is
  destroyed (`message:unmount`) and rebuilt (`message:mount` again) when it
  scrolls back; long-lived panels belong on the stage. Inside a handler, and
  inside any click/input/change/keydown handler, `document.querySelector`,
  `querySelectorAll`, `getElementById`, `getElementsByClassName` and
  `getElementsByTagName` search the current bubble first and never another
  bubble; after an `await` or a timeout the scope is gone, so capture the
  bubble's elements synchronously. `Element.querySelector` (for example from
  `document.body`) is not scoped.
- Scripts: every `<style>` and `<script>` in every enabled rule is extracted
  when the card loads, matched or not (fenced code blocks are left alone);
  styles merge into one stylesheet, scripts run once per card, in rule order,
  before any message is in the DOM and after the function bar is mounted.
  Inline scripts run as real `<script>` elements (top-level declarations are
  globals); a `SyntaxError` such as a top-level `return` is retried wrapped in
  a function. `type="module"` runs as a classic script; `document.currentScript`
  is the running script element (inline rule scripts are real `<script>`
  elements), null only in the wrapped fallback. External `<script src>` must be `https:` and is not awaited. A
  `<script>` inside a reply runs once per distinct code string after the
  message is done; code already run at load does not run again. The card
  editor's preview re-runs the scripts on every edit, so a boot must be
  re-entrant (remove what the previous run mounted). Actions that spend
  credits (send, continue, regenerate, assist, favourite) ignore synthetic
  clicks: only a trusted click counts.
- Native blocks (arrives with the chat page build that carries it; until that
  build is deployed, a kit rule is the only way to draw the block): when no
  display rule consumed them, the chat page itself
  draws a `[status]…[/status]` block in an AI reply as `.lt-status` (one
  `.lt-status__row` per `key: value` line; numbers, `a/b` and `n%` as a bar,
  the other shapes as text, chips, a list or a path) and a
  `[choices]…[/choices]` block as `.lt-choices` buttons (`.lt-choice`, plus
  `.lt-choice--own` to write one's own); the closing marker is optional; a tap
  puts the option into the composer, it never sends. Both render paths draw
  them, before Markdown, for AI replies only, in `@layer lt-base` so author
  CSS overrides them. A card with its own rule for the block (the toolkit's
  kit) is unaffected, because the rule consumes the marker first.
- The body of a bubble may not be final when `message:mount` or `message:done`
  fires: rules run in a worker and the finished HTML is swapped in a moment
  later. A script that draws into a bubble draws again when the bubble's
  children change (a `MutationObserver` for a few seconds), and binds buttons
  by delegation on `document`, not on the container.
- Error codes: `UNAUTHORIZED`, `RATE_LIMITED`, `INVALID_ARGS`, `HOST_DENIED`,
  `NETWORK`, `NOT_SUPPORTED`, `BUSY`, `UNKNOWN_CAPABILITY`. Synchronous
  capabilities throw an `SdkError` with `.code`; asynchronous ones reject.
- Differences from MMD's page: no platform state variables (`sdk.vars`,
  `vars:change`, `<abc_vars>`; `card render` reports them under
  `unsupported`); no `message-extra` slot; `user.get()` returns `nickname`;
  `sdk.text.*` exists; no empty `message:done` before streaming; `send`
  during generation is `BUSY`; header, composer and panels are the site's
  standard components drawn inside the shell (`data-chrome="standard"`), so
  author CSS reaches them and their buttons report to the host.
- Chrome modes: with `standard` the shell sets `--shell-header-h` from the
  header's height; with `shell` it does not (the shell's own CSS falls back
  to 45px); with `host` the host draws header and composer outside the page,
  the shell hides `[data-chat="header"]` and the composer and puts the stage
  and side slots at the top. Size an overlay from the header's `offsetHeight`
  (0 when hidden), not from the variable's fallback.
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
  from the table altogether, or strings stay half converted. Text the script draws itself needs `sdk.text.convert`
  plus a small character table for short labels; CSS `content` strings need
  a variant per script.
- The site header is `[data-chat="header"]`; the classes inside it are site
  internals. A card that moves its own bar into the header must fall back to
  `[data-slot="statusbar"]` when the header is hidden or changes.
- With the standard chrome the header carries stable `data-lt` hooks, kept
  across releases and checked by the site's tests (class names are not):
  `[data-lt="header"]`, `back`, `avatar`, `title`, `header-actions` and
  `fullscreen`. The fullscreen button exists only where the host document
  can go fullscreen (not on iPhone Safari) and has `aria-pressed="true"`
  while it is. Both buttons only post to the host and spend nothing, so a
  card script's `.click()` on them works: back navigates (or closes an open
  stage first), fullscreen toggles the host document. The browser grants
  fullscreen only after a player's gesture, so a forwarded click works
  inside a tap and does nothing on load.
  The model chip (`.model-chip`, name in `.model-chip-name`; a class, not a
  `data-lt` hook) also only posts to the host, which opens its model sheet in
  `[data-chat="panels"]`; a full-page overlay above z-index auto hides that
  sheet unless it lifts the panels layer while the player picks. Inside the
  sandbox shell there is no model chip: the model button is `.mind-type` in
  `[data-chat="composer"]` and still opens the host's model list when clicked
  (also while the composer is hidden). Read the model's name and the next
  turn's cost from `sdk.model.get()` (and `model:change`), not from the DOM;
  a settings row shows the name when it is there and never a "not found".
- Per the site's source, the model sheet and the response-settings sheet are
  drawn by the host page, outside the card's frame. While one is open the
  host copies every `<style>` from the card's rules into its own page and
  mirrors the classes and `data-*` the card's script set on `html` and
  `body`, so a rule scoped to such a class (`html.my-card .u-popup__content`)
  restyles them. Site popups open in the browser's top layer and take their
  look from `--lt-canvas-*` tokens on `.u-popup__content` (`accent`,
  `sheet-bg`, `sheet-fg`, `sheet-item-bg`, `sheet-line`, `radius`,
  `sheet-radius`, `pill-*`, `font`, …); the model sheet's own hooks are
  `.model-setting-scope`, `.mp-top`, `.mp-title`, `.mp-close`, `.mp-info-bar`,
  `.mp-model-name`, `.mp-energy-pill`, `.mp-setting-body` and `.bottom .btn`.
  The copied stylesheet is the card's whole one, so keep its other selectors
  scoped to the card's own nodes.
- The Hearthroom App's WebView adds `HearthroomApp/<version>` to the user
  agent, and the card's frame reads the same string. The site treats that,
  or `display-mode: standalone` / `fullscreen` (and iOS's
  `navigator.standalone`), as an installed app; a card opened from its own
  home-screen icon then has no back button in the header.
- The host colours the phone's status bar from the header's `.topTabbar`
  background and measures it again when the page's `html` or `body` classes
  change; a card that hides the header can still set that background.

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
in the rule's replacement, or the toolkit's sandbox kit
(`assets/sandbox-kit`, see `sandbox-kit.md`). `card render --json` still lists `hc-*` classes it
finds under `report.components` so imported classic-page cards can be spotted.

## Offline preview

`hearthroom card preview <dir>` fetches the real sandbox shell from the site
(`c<roleId>.<site>/sandbox/`), caches it, and serves the harness below with
the folder, so no repository checkout is needed. The chat page's repository
(`hearthroom/stage`, the `stage` submodule of the community site) carries
the same harness that runs the real sandbox shell against a
card folder with a fake host: `npm run build:sandbox`, then
`node scripts/serve-card-preview.mjs <card-dir>` and open the printed URL
(`bench/card-preview`). It loads `rules.json`, `welcome.md` and
`preview/replies.md` (sample replies separated by `## ` headings), streams a
sample, switches conversation, re-runs scripts, and offers phone, landscape,
unfolded, tablet and desktop sizes and both themes; assets resolve to the
folder. `node scripts/preview-shots.mjs --url … --out <dir> [--interact]`
drives it headless with the system Chrome: screenshots per size, a
`snapshot.json` (bubbles, panels, debug log) and, with `--interact`, a real
tap on a choice and on the dock. It is the real `sdk`, sanitizer, Markdown and
event order; it is not the host's rendering path, the real model or a device.
`hearthroom card preview --check --sizes A,B,…` names the first size's shots
`phone-*`, the last size's `desktop-*` and the rest `WxH`; `findings.json`
gives each size. Its `freeInputVisible` looks only for the site's composer,
so a card that hides it and draws its own input reads `false`; check that
input on the screenshot. The check does not tap inside the page: a card with
its own controls needs an interactive pass, in a browser with `--open` or
headless through the DevTools protocol (`Input.dispatchMouseEvent` gives
trusted clicks; Chrome started with site isolation disabled lets the harness
page read the frame's document).
Without that repository, the render report's `previewUrl` in a browser is the
check.

## Local checks

`hearthroom card check <dir>` (or the toolkit's `node <toolkit>/scripts/check-card.mjs <dir>`,
the same checks; the CLI reports lookaround and backreferences as unverified
locally) reads `rules.json`,
`definition.md`, `card.json`, `lorebook.json` and the openings and reports,
against `scripts/sandbox-contract.json`: invalid patterns and flags, patterns
that match the empty string, replacements over 128 KiB (UTF-8 bytes) and rule
sets over 32 MiB, blank `find`, duplicate ids, unknown `sdk` capabilities and
event names, `sdk.off`/`once`, `sdk.vars`, module syntax, `await` before a
send, invalid save keys, `data-*`/`aria-*`/`role` on author elements, `on*`
inside `<svg>`, CJK angle-bracket tags, `hc-*` components, `{{random}}` with
the wrong separator, concatenated asset paths and missing asset files, the
sandbox API on a classic-page card, and a marker a rule consumes that the
definition, output contract, a constant Lorebook entry or an opening never
mentions (the panel would show once and never update). Errors fail the run;
warnings do not.

## The CLI loop

The complete manual is `https://cli.hearthroom.club/llms-full.txt`; every
command accepts `--json`, and an error is one JSON object `{ "error", "detail" }`
with a non-zero exit code (no other error identifiers are documented: read
`detail` for the section, field or limit it names).

```
hearthroom auth login --no-wait --json            # one-time code; then auth login --resume; HEARTHROOM_TOKEN for unattended runs
hearthroom card init <dir> | card import <file…>   # SillyTavern PNG/JSON/CHARX, MMD three-file set; both write AGENTS.md (never sent)
hearthroom card check <dir> [--replay f…] --json   # local, free: rules, markers, sdk use, protocol health per marker (same numbers as the toolkit's check-card.mjs)
hearthroom card preview --check <dir> [--from-history f…] [--json]   # local, free, needs Chrome: screenshots of every state, contact.png, findings.json under preview/shots/
hearthroom card preview <dir> [--open]             # offline preview with the real chat shell (fetched from the site and cached; same CLI release; shows the deployed shell's behaviour)
hearthroom lorebook build <dir> | lorebook check <dir>   # worldbook/*.md sources → lorebook.json; drift, keyword collisions (same CLI release)
hearthroom card status <dir> --json                # what the folder is linked to, which sections changed
hearthroom card push <dir> --dry-run --json        # what would be sent, without sending
hearthroom card push <dir> --validate --json       # private trial card + validation report
hearthroom card validate <dir> --push --strict --json   # re-push and fail on warnings too
hearthroom card render <dir> --push --opening N --json  # one opening after display rules; --html f writes the raw string
hearthroom play <dir> --new-session --greeting N -m "…" --allow-spend --json   # one real turn; spends credits
hearthroom play <dir> --history --limit 20          # read the conversation back (free)
hearthroom wallet --json                           # balance before a cost stance
hearthroom card pull <roleId> [dir] --force        # bring the provider's copy back; --force overwrites local files
hearthroom card push <dir> --create                # keep it: a real private card on the site
hearthroom models | tags --zone zh | search | media ls|upload|mv|rm | upgrade --check
```

- Pushing, validating, rendering, importing, pulling and browsing are free.
  Only `play -m` generates and needs `--allow-spend`.
- A trial card expires three days after its last push; an account holds at
  most five (`--evict` frees the oldest). The site's inventory does not list
  trial cards, but their play link works for the author.
- Consecutive `play` calls on the same folder continue one conversation: the
  first call opens it, later calls resume it, and the folder's sync state
  remembers it. `--new-session` archives the current conversation and starts
  a fresh one; `--greeting N` (0 = main, 1.. = alternates) applies only when a
  new conversation is created, so an alternate is tested with
  `--new-session --greeting N`. Every independent probe and every retest
  starts with `--new-session`.
- Turns carry the card's `language` from `card.json`; without one the
  provider replies in English. `--language` overrides it for the turn,
  `--model` picks a model from `hearthroom models`, `--thinking` sets a
  thinking depth where the model supports it, `--show-thinking` prints
  reasoning deltas, `--stop` cancels a reply. With `--json`, every server
  event is printed as one JSON object per line; a stopped or failed reply is
  still charged for the calls it made. A provider outage ends the turn with
  `state: failed_retryable`, `failureCause: service_unavailable` and
  `chargeCredits: 0`. A reply left incomplete keeps the conversation busy:
  further sends and `--new-session` return `409 chat_operation_conflict` until
  the server lets go (about two to three minutes in CLI 0.5.0; `--stop` did
  not release it sooner), so poll `--history` before retrying. Turns sent with `play` do not pass
  through the play page, so display rules and scripts are not exercised by
  them; use the offline preview or the play link for the screen.
- `card validate --json` returns `status` (`pass` | `warning` | `blocker`),
  `blockers`, `warnings`, `suggestedFixes` and `tokenBudget` with
  `roleDescChars`, `roleDetailDescChars`, `roleWelcomeChars`,
  `customInstructionsChars`, `roleOutputContractChars`, `totalChars`,
  `estimatedTokens`, `welcomeToDetailRatio` and `limits`. There is no count
  or limit for `talkExample` in the report.
- `card pull` takes the card id, not the folder: `card pull <roleId> [dir]`;
  an existing folder needs `--force`, which overwrites local files, so run
  `card status` first and pull only when the site copy is the newer one.
- `push --create` makes a real private card; on a folder already linked to an
  owned card (after `pull` or `push --to <id>`), plain `push` updates that
  card and `--create` would make a second one. `card status` shows the link.
- `card init` takes only `--name`: set `language` in `card.json` yourself. It also selects the Lorebook entry length limit (the value is not
  documented; read validation warnings).
- CLI 0.5.0 mishandled `push --create` after a trial push (an empty private
  card), `play --greeting N` and `card check --replay`; 0.5.1 fixed all
  three. A card created with 0.5.0 whose `tokenBudget` counts are 0 needs a
  push with `--force`.
- An MMD rules file marked `chatVersion: 1` imports as `pageMode: sandbox`;
  trial cards keep `pageMode` and `cardFormat`. Its `pageDepth` 1/0/under
  becomes `mountLayer: under`, otherwise `over`; `statusbar` becomes
  `mountTrigger`; `beginning` becomes the opening. The six-key file's
  `personality` is not read (the persona comes from the separate text file),
  and the regex scripts' SillyTavern-only fields (`trimStrings`,
  `markdownOnly`, `promptOnly`, `runOnEdit`, `substituteRegex`, depth limits)
  are dropped without a note.

## Publishing

`card push --create` makes a real private card that appears in the author's
inventory on the site; later plain pushes keep updating it. Submitting for
community review happens on the site, and that is where a version is frozen:
review applies to one frozen version of the card, submitted together with a
content rating; changing content makes a new version that needs its own review.
Players get the approved copy (text, display rules and Lorebook) until an
update is submitted and approved, so pushes change only the author's draft.
The draft plays at `/play/<id>?mode=source` (printed by `card push` from CLI
0.7.2, "Play draft" on the card page for its owner); the plain `/play/<id>`
and the card page's Play show the approved copy. The card page and My Cards
flag unsubmitted edits, including edits to only display rules or the
Lorebook.

Reviewers see a similarity score for the definition against other submitted
and approved cards (reviewers only; the author's own other cards are
excluded). Originality of the definition text matters.

## Costs and boundaries

Generation spends the player's credits at the provider's model rates; agent
mode turns are billed on actual usage, including turns that fail or are
stopped. Drafting, validating and rendering cost nothing beyond the agent's own
usage. Keep all work on trial cards or the author's private cards; never
publish or submit on the author's behalf without an explicit request.
