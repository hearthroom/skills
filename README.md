<p align="center">
  <a href="https://hearthroom.club"><img src="https://raw.githubusercontent.com/hearthroom/hearthroom/main/web/public/icons/icon-192.png" width="96" alt=""></a>
</p>

<h1 align="center">Hearthroom skills</h1>

<p align="center">
  Card-writing skills for AI coding agents. Your agent writes a character card, plays it, looks at the screen, and fixes what a player would notice.
</p>

<p align="center">
  <a href="https://hearthroom.club/guide"><img src="https://img.shields.io/badge/guide-hearthroom.club-E89064" alt="Card authoring guide"></a>
  <a href="https://discord.gg/C7m85YPHmK"><img src="https://img.shields.io/badge/Discord-join%20the%20community-5865F2?logo=discord&logoColor=white" alt="Discord"></a>
  <a href="https://github.com/hearthroom/skills/actions/workflows/validate.yml"><img src="https://github.com/hearthroom/skills/actions/workflows/validate.yml/badge.svg" alt="Validate"></a>
  <a href="LICENSE.md"><img src="https://img.shields.io/badge/license-FSL--1.1--ALv2-blue" alt="License: FSL-1.1-ALv2"></a>
  <a href="https://github.com/hearthroom/skills/commits/main"><img src="https://img.shields.io/github/last-commit/hearthroom/skills" alt="Last commit"></a>
</p>

<p align="center">
  <b>English</b> ·
  <a href="README.zh-Hant.md">繁體中文</a> ·
  <a href="README.zh-Hans.md">简体中文</a>
</p>

<p align="center">
  <img src="docs/readme/showcase.webp" width="860" alt="Three phone screens from a card made with these skills: a title screen, a pixel-art scene in a goblin village with the story text below, and a later turn showing what changed and the next choices, including writing your own">
</p>
<p align="center"><sub>A card written with these skills and the sandbox kit, in the CLI's offline preview.</sub></p>

## Overview

[Hearthroom](https://hearthroom.club) is an open community for AI character cards. A card is
a folder of plain files, and the [`hearthroom` CLI](https://cli.hearthroom.club) pushes that
folder to a private trial card, validates it, renders it and plays it from the terminal.

The CLI moves the files. These skills decide what goes in them. There are 43 skills and 48
shared guides. They cover premise, character, relationships, world and Lorebook, openings,
voice, state, presentation, diagnosis and iteration, and each one ends in a check the agent
can run. Claude Code, Codex, Cursor and any agent that can read files and run a shell can use them.

You describe the card. The agent asks only the questions that would change the result,
writes the folder, tests it the way a player would meet it, and keeps a record of what it
decided and why.

## Quick start

Paste this into your agent. It installs the CLI and these skills, and signs you in with a
one-time code:

```text
Fetch and follow the instructions at https://hearthroom.club/agent-setup.md to set me up for writing character cards on Hearthroom.
```

Then load the skills: run `/reload-plugins` in Claude Code, or start a new session in Codex
and other agents. Setup spends no credits.

<details>
<summary>Install by hand</summary>

**Claude Code**

```sh
claude plugin marketplace add hearthroom/skills
claude plugin install hearthroom@hearthroom-skills
```

**Codex**

```sh
codex plugin marketplace add hearthroom/skills
codex plugin add hearthroom@hearthroom-skills
```

**Cursor**

```sh
git clone https://github.com/hearthroom/skills ~/.cursor/plugins/local/hearthroom
```

Then run **Developer: Reload Window** or restart Cursor. Update later with
`git -C ~/.cursor/plugins/local/hearthroom pull`.

**Any other agent** (OpenCode, Gemini CLI and others). Clone the whole repository, because
the skills read shared files under `references/`:

```sh
git clone https://github.com/hearthroom/skills ~/.hearthroom/skills
```

Then add one line to the agent's user-level instructions file:

```text
When writing, reviewing or testing a Hearthroom character card, read ~/.hearthroom/skills/skills/using-hearthroom/SKILL.md first and follow its routing table.
```

**The CLI**

```sh
curl -fsSL https://raw.githubusercontent.com/hearthroom/cli/main/install.sh | sh   # macOS, Linux
hearthroom auth login
```

On Windows, use `irm https://raw.githubusercontent.com/hearthroom/cli/main/install.ps1 | iex`.
Homebrew, Scoop and source builds are covered in the [CLI README](https://github.com/hearthroom/cli#install).
Screenshot checks (`card preview --check`) also need Chrome, Chromium or Edge.

</details>

## What to ask for

> A cultivation card: I'm the disciple the sect expelled, my senior sister helps me in secret, and she'll be caught the moment she acts. Track my cultivation only. Push it as a trial card and tell me the weakest layer.

> Import this SillyTavern card, tell me why it runs out of things to say after three turns, and fix only that.

> Add a status window that shows affection and location. Show me screenshots on a phone, in dark and light.

> Play ten turns with the second opening on a weaker model and a stronger one, and tell me at which turn a player would lose interest.

> Is this card ready for review? List what still needs fixing, and don't change anything yet.

SillyTavern PNG, JSON and CHARX cards and MMD three-file sets import directly. What makes a
prompt work well (giving a situation instead of a genre, a sample line instead of adjectives,
and saying what counts as done) is in the [prompting guide](https://hearthroom.club/guide).

## How a card gets made

1. **Route.** `using-hearthroom` reads what you have (a mood, a premise, source material,
   an imported card, a transcript or feedback), names the weakest layer a player meets
   (cover and title, summary, opening, or later turns), and loads the narrowest skill for it.
2. **Name the obvious card, then drop it.** Before designing, the agent states the version
   any model would write for this request, so the real card can be something else.
3. **Write a folder.** Long text goes in Markdown and the Lorebook, rules and images go in
   their own files. You can open and edit everything.
4. **Check locally, for free.** `hearthroom card check` tests the folder's rules, markers and
   script calls. `hearthroom card preview --check` runs the real chat shell in headless
   Chrome and saves a screenshot of every state, phone and desktop, dark and light, plus a
   contact sheet and a list of findings.
5. **Push a trial card.** `card push --validate` returns the provider's report, and
   `card render` shows the opening after display rules. Only you can see a trial card.
6. **Play it.** `hearthroom play` sends real turns, which cost credits, so the agent asks
   first. A real test is 10 to 20 turns in a fresh conversation, on a weaker model as well
   as a stronger one, because weaker models fail first.
7. **Fix one thing per version.** The agent repairs the weakest layer, replays the same
   probe, and compares the result with the previous version.
8. **Keep it.** Once you're happy, `card push --create` saves a private card under My cards.
   Submitting for review and publishing stay with you on the site.

Every step is written to the card folder's `README.md`. That file is never sent to the
provider. It holds the decisions, the rejected directions and the evidence for each version,
so a new session can pick up where the last one stopped.

## What sets it apart

- **It asks questions instead of filling a template.** The skills list decisions, not
  answers. A card that could come out of filling in the blanks does not pass the scorecard.
- **Story comes first.** Every card declares whether its interface assists the story or is
  the game itself (`uiRole: assist` or `core`). The checker measures how much of each reply
  goes to status blocks and warns when that crowds out the story.
- **It writes for two readers.** The agent gets reasons and room to work. The model that
  runs the card in chat is often a fast, weaker one, so it gets exact protocols and a
  plain example turn to copy.
- **The agent looks at the screen.** Status panels, choice buttons and themes are checked
  in screenshots, not assumed to work from the source.
- **Platform facts live on one page.** Fields, limits, Lorebook behaviour, display rules,
  chat pages and CLI commands are stated only in
  [`references/platform-facts.md`](references/platform-facts.md). The sandbox contract is
  generated from the chat page's open source, and CI checks it every week.

## What's inside

### Start and drive

| Skill | Use it for |
|---|---|
| `using-hearthroom` | The entry point. Reads the request and routes it to the narrowest skill. |
| `hearthroom-creation-conductor` | Taking a card from a vague idea to a tested trial card. |
| `hearthroom-cli-operator` | Installing, signing in, and reading the CLI's JSON, errors and exit codes. |

### Shape the idea

| Skill | Use it for |
|---|---|
| `hearthroom-premise-workshop` | Turning a mood, trope or genre into directions worth comparing. |
| `hearthroom-tension-weaver` | Giving a pretty but inert idea stakes, a "why now" and player leverage. |
| `hearthroom-archetype-director` | Choosing one primary type: companion, story, game or generator. |
| `hearthroom-card-blueprint` | Designing character, relationship, world, voice, first scene and loop before writing. |

### Character and world

| Skill | Use it for |
|---|---|
| `hearthroom-character-core` | Desire, contradiction, boundaries and how the character acts under pressure. |
| `hearthroom-relationship-architect` | Trust, friction and pacing in romance, friendship, rivalry or mentorship. |
| `hearthroom-world-engineer` | Factions, places, setting rules and a Lorebook plan, without lore dumps. |
| `hearthroom-voice-director` | Generic dialogue, overused catchphrases and refusals that break character. |
| `hearthroom-talk-example-curator` | Deciding whether example dialogue is needed and what one sample must teach. |
| `hearthroom-detail-engineer` | A definition that is thin, all biography, or drifts on some models. |

### Play and the long arc

| Skill | Use it for |
|---|---|
| `hearthroom-opening-director` | An opening that starts play instead of only greeting. |
| `hearthroom-agency-designer` | Players who can only watch, and choices that change nothing. |
| `hearthroom-state-economist` | Which state to track, where it lives, and which meters to drop. |
| `hearthroom-longplay-architect` | Cards that die after a few turns: repeated setups, choices with no memory. |
| `hearthroom-boundary-designer` | Mature, intense or consent-sensitive cards, and refusals that stay in character. |

### Card types

| Skill | Use it for |
|---|---|
| `hearthroom-play-engineer` | RPGs, survival games, simulators: stats, resources, quests, turn protocols. |
| `hearthroom-scenario-architect` | Mysteries and dramas: stakes, branches, clues and reveals. |
| `hearthroom-daily-life-architect` | Quiet companion and slice-of-life cards that should not be flat. |
| `hearthroom-generator-architect` | Cards that must produce a usable artifact, not advice. |
| `hearthroom-ensemble-director` | Several speakers: cast size, spotlight, and contrast between voices. |
| `hearthroom-series-architect` | Sets, spin-offs and variants built from one shared concept. |

### Sources and first impressions

| Skill | Use it for |
|---|---|
| `hearthroom-material-distiller` | Turning notes, setting documents or pasted lore into what one card can hold. |
| `hearthroom-originality-adapter` | Fan works and "like X but original", including what to keep and what to change. |
| `hearthroom-sample-calibrator` | Borrowing the structure of strong samples without copying them. |
| `hearthroom-profile-packager` | Name, summary and tags: why someone would open the card. |
| `hearthroom-visual-identity-director` | Portrait, background and key art that agree with the text. |
| `hearthroom-language-stylist` | Register, forms of address, punctuation, and mixed Traditional and Simplified Chinese. |

### On screen

| Skill | Use it for |
|---|---|
| `hearthroom-presentation-director` | Deciding what the screen does before writing: plain text, HTML, panels, choices. |
| `hearthroom-sandbox-kit` | Building a status panel, choice buttons, a theme, a settings drawer or a pinned bar. |
| `hearthroom-render-review` | Judging render reports and screenshots: missing panels, panels drawn twice, broken rules. |

### Write, test and ship

| Skill | Use it for |
|---|---|
| `hearthroom-card-author` | Writing or patching the card files and pushing a trial card. |
| `hearthroom-field-finalizer` | The last pass before writing files: placeholders, limits, Markdown and JSON. |
| `hearthroom-token-architect` | Fields over their limits, duplicated lore, HTML bloat and status overhead. |
| `hearthroom-instruction-guardrail` | Drift in play: assistant-like replies, broken formats, a state protocol that slips. |
| `hearthroom-chat-simulation` | Designing playtests, judging transcripts and deciding whether another paid turn is worth it. |
| `hearthroom-quality-auditor` | A scorecard, a quality tier and the first three repairs. |
| `hearthroom-card-doctor` | Several symptoms at once, and the question of what to fix first. |
| `hearthroom-iteration-director` | Choosing the next step from the evidence: one patch, a replay, or stop. |
| `hearthroom-collaboration-director` | Turning "almost right but off" into concrete decisions. |
| `hearthroom-publish-readiness` | Turning a trial card into a private card and checking it before review. |

### Repository layout

```text
skills/        43 skills, one SKILL.md each, entered through using-hearthroom
references/    shared guides; platform-facts.md is the only source of platform facts,
               writing-skills.md is the standard for changing any of them
assets/
  sandbox-kit/ status panel, choice buttons, themes, drawer and pinned bar, built into display rules
  probe-card/  a card that checks the sandbox contract in the real chat shell
scripts/       check-card.mjs (same checks as hearthroom card check), sandbox contract,
               validator, line-budget.json
.out-of-scope/ ideas already turned down, one file each with the reason (see SCOPE.md)
examples/      synthetic briefs and sample shapes
evals/         prompts and assertions used to compare skill revisions
```

## Costs and boundaries

- Drafting, pushing, checking, previewing and rendering cost nothing beyond your agent's
  own usage.
- Only `play -m` generates a reply. It spends your credits, needs `--allow-spend`, and the
  agent asks before the first turn.
- A trial card expires three days after its last push, and an account can hold five.
- The agent works only on trial cards and your own private cards. It never submits a card
  for review or publishes one.

## Improving these skills

These skills improve through real card work. When an agent finds a skill that is wrong or
missing something, it fixes the toolkit as well as the card, and tells you what changed and
why; it pushes only after you agree. Every change, from an agent or a person, meets the same
two pages: [`SCOPE.md`](SCOPE.md) sets the bar (a failure seen in real card work, and nothing
already turned down in [`.out-of-scope/`](.out-of-scope/)), and
[`references/writing-skills.md`](references/writing-skills.md) says where a lesson belongs and
how to write it for a capable agent: goals, reasons and boundaries rather than step-by-step
recipes. The validator holds the parts a machine can check, including a line budget per file.
See [`CONTRIBUTING.md`](CONTRIBUTING.md).

Bug reports and proposals are welcome in [issues](https://github.com/hearthroom/skills/issues).
For a wrong platform fact, name the command or page you checked it against.

## Development

```bash
npm test          # validator, card checker, sandbox kit parser and build
npm run validate  # structure, citations, manifest, wording, line budgets
node scripts/sync-contract.mjs --check   # sandbox contract matches the chat page
```

`scripts/manifest.json` lists every skill, reference, asset and script. The validator fails
when the tree and the manifest disagree, when a skill cites a missing reference, when a kit
script does not parse, or when a JSON file is invalid. CI runs all three commands on every
push to main and every pull request, and runs them again weekly in case the chat page's contract changes.

## Community

Card sharing, questions and development happen on [Discord](https://discord.gg/C7m85YPHmK).
Related projects:

- [hearthroom/hearthroom](https://github.com/hearthroom/hearthroom): the community site
- [hearthroom/cli](https://github.com/hearthroom/cli): the `hearthroom` command-line client
- [hearthroom/moonstage](https://github.com/hearthroom/moonstage): the open-source chat page

## License

[Functional Source License, Version 1.1, ALv2 Future License](LICENSE.md) (FSL-1.1-ALv2), the
same licence as the chat page. You may use, copy, modify and redistribute these skills for any
purpose except a competing product or service, and copies and derivatives carry the same terms.
Each version becomes Apache 2.0 two years after its release. Versions up to 0.3.20 were
published under the MIT License and stay under it.

Cards you write with these skills are your content, not derivative works of the toolkit, and
carry no obligation under this licence; that includes the sandbox kit code that `build.mjs`
places in a card's display rules. Names and logos are not licensed. Parts derived from
MIT-licensed projects keep their notices in [`THIRD-PARTY-NOTICES.md`](THIRD-PARTY-NOTICES.md).
