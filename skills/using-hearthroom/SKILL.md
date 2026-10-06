---
name: using-hearthroom
description: Use when routing any Hearthroom card work, such as writing, improving, importing or diagnosing a character card, its Lorebook, openings, display rules or presentation, running the hearthroom CLI loop (push, validate, render, play), or when unsure which skill in this toolkit applies.
---

# Using Hearthroom

This toolkit is a set of skills for writing character cards on Hearthroom with
the `hearthroom` command-line client. This skill is the entry router: classify
the author's intent, pick the narrowest skill, name the route, then load only
that skill and the references it asks for.

Every platform fact (fields, limits, Lorebook behaviour, display rules, chat
pages, CLI commands) lives in `../../references/platform-facts.md`. Skills cite
it; nothing in this toolkit asserts a platform fact that page does not state.

## Required references

Read `../../references/platform-facts.md` once per session. Read
`../../references/cli-workflow.md` before the first CLI command.

## Route first

1. Identify what the author actually has: nothing but a mood, a settled premise,
   source material, an imported card, a pushed card with evidence, or feedback.
2. Name the weakest conversion layer (`role-card-writing-framework.md`,
   Funnel): L0 cover and title (would a stranger stop?), L1 summary (would
   they open the opening?), L2 opening (is it a free demo that earns the
   first paid message?), L3 play (is turn two better than turn one; do
   choices accumulate?). Board metrics are not documented; judge the layer by
   reading as a player. L0 → `hearthroom-visual-identity-director` and
   `hearthroom-profile-packager`, L1 → `hearthroom-profile-packager`, L2 →
   `hearthroom-opening-director`, L3 → `hearthroom-longplay-architect`,
   `hearthroom-relationship-architect` or `hearthroom-play-engineer`.
3. Pick the narrowest skill below. If several apply, choose the first decisive
   bottleneck and list the others as "later".
4. State the route in one short block before doing narrower work:

```text
Route:
- intent:
- skill:
- mode: draft-only | folder edit | push + validate | render | playtest | publish readiness
- weakest layer: L0 | L1 | L2 | L3
- uiRole: assist | core (from the card's README.md, or to be declared)
- references:
- later:
- do not do yet:
```

5. Keep all work on a trial card or the author's own private card. Never
   submit for review or make a card public on the author's behalf.
6. Before any packet is filled, say what the obvious card for this request
   would be and what this card will do instead. The packets list decisions,
   not answers (`role-card-writing-framework.md`, "Questions, not a mould");
   a card an agent could produce by filling them in is not good enough.

## Routing table

| The author has or asks for | Skill |
|---|---|
| CLI setup, sign-in, which command does what, `--json` shapes, spend gate, trial-card slots, import formats | `hearthroom-cli-operator` |
| An idea from start to finish, "make me a card", coordinating several skills | `hearthroom-creation-conductor` |
| Only a mood, trope, genre, "open this idea up", comparing directions | `hearthroom-premise-workshop` |
| Which card type (`companion`, `story`, `game`, `generator`) or a hybrid | `hearthroom-archetype-director` |
| A thin or generic persona, trope repair, desire / contradiction / boundary | `hearthroom-character-core` |
| Romance, friendship, rivalry, slow burn, trust and friction, repair and rupture | `hearthroom-relationship-architect` |
| World seeds, factions, locations, lore that must become Lorebook entries | `hearthroom-world-engineer` |
| Stakes, hook, why now, player leverage, a pretty but passive premise | `hearthroom-tension-weaver` |
| Player agency, spectator openings, decorative choices, route funnelling | `hearthroom-agency-designer` |
| The opening, alternate openings, first reply paths, second-turn move, an opening that is already the climax | `hearthroom-opening-director` |
| Voice, generic dialogue, catchphrase overuse, speakers blending, replies that tremble or stack adjectives in one register | `hearthroom-voice-director` |
| Example conversations: omit, micro-samples, or full examples | `hearthroom-talk-example-curator` |
| Which state to track, show, hide or drop; status panels | `hearthroom-state-economist` |
| Multi-session play, dead third turns, repetitive loops, progression | `hearthroom-longplay-architect` |
| RPG, survival, simulator, stats, resources, turn protocol | `hearthroom-play-engineer` |
| Mystery, investigation, event, trial, betrayal, clue and reveal pacing | `hearthroom-scenario-architect` |
| Slice of life, roommate, cafe, school, quiet routine | `hearthroom-daily-life-architect` |
| Generator, helper, creator-assistant, artifact output | `hearthroom-generator-architect` |
| Several characters in one card, cast size, spotlight rules | `hearthroom-ensemble-director` |
| A set of related cards, variants, spin-offs | `hearthroom-series-architect` |
| Large notes, files, a world bible to compress | `hearthroom-material-distiller` |
| Canon, fan premise, "like X but original", copied draft | `hearthroom-originality-adapter` |
| Examples, golden samples, "make it like the good ones" | `hearthroom-sample-calibrator` |
| Name, summary, tags, first impression on the board | `hearthroom-profile-packager` |
| Portrait, background, art brief, asset readiness | `hearthroom-visual-identity-director` |
| Mature, intense, consent-sensitive, refusal behaviour | `hearthroom-boundary-designer` |
| Traditional / Simplified mixing, register, pronouns, field wording | `hearthroom-language-stylist` |
| The definition itself: thin biography, durable engine, under budget | `hearthroom-detail-engineer` |
| Over the limits, overlong opening, duplicated lore, token cost | `hearthroom-token-architect` |
| Behaviour or format still drifts although the fields are coherent | `hearthroom-instruction-guardrail` |
| Plain text vs HTML, what goes on screen, display rules, chat page, sandbox scripts, status bars, beautification | `hearthroom-presentation-director` |
| Building the status panel, theme, settings drawer, pinned bar or choice buttons with the kit; running the local checker or the offline preview; a sandbox script, save or rule that misbehaves | `hearthroom-sandbox-kit` |
| A `card render` report, the play page open, a screenshot, overflow or contrast | `hearthroom-render-review` |
| Turning a direction into a card-ready plan | `hearthroom-card-blueprint` |
| Writing the actual fields into the card folder | `hearthroom-card-author` |
| Last-mile field checks before push: caps, placeholders, formats | `hearthroom-field-finalizer` |
| "Is this good enough", scorecard, first three repairs | `hearthroom-quality-auditor` |
| An existing card with mixed symptoms, what to fix first | `hearthroom-card-doctor` |
| Author feedback, taste, comparing drafts, keep / change / reject | `hearthroom-collaboration-director` |
| Real turns with `play --allow-spend`, judging a transcript | `hearthroom-chat-simulation` |
| Evidence exists; deciding the next single repair or stopping | `hearthroom-iteration-director` |
| Ready to keep the card or hand it to review | `hearthroom-publish-readiness` |

## Order of work for a new card

premise → engine (character, relationship, world) → opening → blueprint →
author → finalizer → (sandbox kit) → `check-card.mjs` → `push --validate` →
`render` → offline preview → playtest (a weak and a strong model, 10–20
turns, `--new-session`) → iterate one shortcoming per version → publish
readiness. Run a stage only when it is the current weakest layer; skip
stages the author has already settled and do not reopen a chosen direction
unless asked. This table is the only routing table in the toolkit; other
skills point here.

## Feed lessons back into these skills

While or after working on a card, if a skill or reference here was wrong,
missing, or only learned the hard way (a platform fact, a layout rule, a
model behaviour, a test that would have caught it earlier), update this
toolkit as well as the card:

1. Edit the skill or reference that should have told you, in general terms:
   no card names, ids, private content or credit balances. For a platform
   fact, confirm it first in the chat page's source (`platform-facts.md`,
   "Where these facts come from" names the files) and then write it into
   `platform-facts.md`.
2. Run `npm run validate` and `npm test` in the toolkit.
3. Commit with the git identity already configured in the toolkit repository,
   never the card author's.
4. Tell the person you are working with what changed and why. Push only after
   they agree.

## Do not

- Do not route a display-rule, sandbox-script or beautification request to a
  writing skill; that is presentation work.
- Do not spend credits (`play -m`) before the author has agreed to the cost.
- Do not answer platform questions from memory; read the facts sheet.
