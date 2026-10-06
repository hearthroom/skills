---
name: using-hearthroom
description: Use when starting any Hearthroom card work (writing, improving, importing, diagnosing or playtesting a character card, running the hearthroom CLI loop), when the author just says "make me a card" or "the card feels off", or when unsure which skill in this toolkit applies.
---

# Using Hearthroom

This toolkit teaches an agent to write character cards on Hearthroom with the
`hearthroom` command-line client. It is a set of questions and tests, not a
mould: the packets list decisions, never answers, and a card that could be
produced by filling them in is not good enough. This skill routes; pick the
narrowest skill and load only it and the references it asks for.

Every platform fact (fields, limits, Lorebook behaviour, display rules, chat
pages, CLI commands) lives in `../../references/platform-facts.md`; nothing in
this toolkit asserts a platform fact that page does not state.

## Required references

Read `../../references/platform-facts.md` once per session. Read
`../../references/cli-workflow.md` only before the first CLI command.

## Route

1. Identify what the author actually has: nothing but a mood, a settled
   premise, source material, an imported card, a pushed card with evidence,
   or feedback. When the author is asking a question or thinking out loud
   rather than requesting a change, the deliverable is your assessment:
   report and stop.
2. Name the weakest conversion layer (`role-card-writing-framework.md`,
   Funnel): L0 cover and title, L1 summary, L2 opening (the free demo that
   earns the first paid message), L3 play (turn two better than turn one,
   choices that accumulate). Judge it by reading as a player; board metrics
   are not documented. L0 → visual identity and profile packager, L1 →
   profile packager, L2 → opening director, L3 → longplay, relationship or
   play engineer.
3. Pick the narrowest skill from the table. If several apply, take the first
   decisive bottleneck and leave the rest for later. Decide the route; write
   it down only when it is not obvious or the author asked.
4. Before any packet is filled, say what the obvious card for this request
   would be and what this card will do instead.

Routine judgement calls are yours; check in only when different readings of
the request would lead to materially different cards.

A card task is done when the folder is pushed as a trial card, validate
passes, render shows the opening as intended, the dossier (`README.md`)
records the decisions and evidence, and anything that costs credits or
publishes has been agreed with the author. Stop earlier only to ask about
those. Keep all work on a trial card or the author's own private card; never
submit for review or make a card public on the author's behalf.

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
| Building the status panel, theme, settings drawer, pinned bar or choice buttons with the kit; the local checker or the offline preview; a sandbox script, save or rule that misbehaves | `hearthroom-sandbox-kit` |
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
author → finalizer → (sandbox kit) → `card check` → `push --validate` →
`render` → offline preview → playtest (a weak and a strong model, 10–20
turns, `--new-session`) → iterate one shortcoming per version → publish
readiness. Run a stage only when it is the current weakest layer; skip
stages the author has already settled and do not reopen a chosen direction
unless asked. This is the only routing table in the toolkit; other skills
point here.

## Feed lessons back into these skills

When a skill or reference here was wrong, missing, or only learned the hard
way (a platform fact, a layout rule, a model behaviour, a test that would
have caught it earlier), update the toolkit as well as the card: edit the
skill or reference that should have told you, in general terms (no card
names, ids, private content or credit balances); confirm a platform fact in
the chat page's source first (`platform-facts.md`, "Where these facts come
from") and write it into `platform-facts.md`; run `npm run validate` and
`npm test`; commit with the toolkit repository's own git identity; tell the
person you work with what changed and why, and push only after they agree.

## Do not

- Do not spend credits (`play -m`) before the author has agreed to the cost.
- Do not answer platform questions from memory; read the facts sheet.
