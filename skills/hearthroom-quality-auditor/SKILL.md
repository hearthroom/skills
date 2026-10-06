---
name: hearthroom-quality-auditor
description: Use when a Hearthroom card, draft, blueprint or set of packets needs a quality audit, scorecard, craft tier, conversion check-up, story-versus-UI balance review, first-three repair list, or a decision on whether to keep ideating, author fields, review the render, playtest or check publish readiness.
---

# Quality auditor

Use this skill when the author wants to know how strong a draft is. The output
is a quality audit packet and a repair order, not a rewrite, not a file edit,
not a push.

It separates "is this good enough?" from "how do I patch this card?" (that is
`hearthroom-card-doctor`) and from "is it ready to keep on the site?" (that is
`hearthroom-publish-readiness`).

## Required references

Read `../../references/quality-scorecard.md` first, then
`../../references/quality-rubric.md` for the pass/fail checklist and
`../../references/platform-facts.md` for what validation, render and the
local checker output mean. Read `../../references/role-card-writing-framework.md`
for the funnel (L0–L3) and the promise, engine, play and presentation
patterns; `../../references/prompt-attention-architecture.md` to score
attention placement; `../../references/presentation-design.md` and
`../../references/sandbox-kit.md` to score Story/UI balance.

Read only for weak dimensions: `../../references/profile-packaging.md` when
the promise is weak despite a coherent engine,
`../../references/language-style.md` for mixed scripts, register or pronoun
drift, `../../references/token-economy.md` when allocation hides the engine,
`../../references/playtest-loop.md` when a transcript is part of the
evidence, and the narrow reference for archetype, character core,
relationship, daily-life, world, play, generator, agency, opening, longplay,
voice or boundary.

## Workflow

1. Gather evidence: the card's `README.md` dossier (`uiRole`, threshold,
   evidence by version), card shape, goal, language, rating intent, the
   folder files, `node <toolkit>/scripts/check-card.mjs <dir>` (local, free),
   `card validate --json` (`status`, `blockers`, `tokenBudget`),
   `card render --json` (rule statuses, `unsupported`), offline-preview or
   play-page screenshots, and any play transcript the author provides.
2. State what is missing. Do not invent field content or play results.
3. Flag critical blockers from the scorecard before scoring.
4. Score the applicable dimensions on the `0-4` scale with the evidence
   behind each. Mark the rest `N/A`. Score Lorebook reachability only on the
   `--agent` mode actually played; say which mode is untested.
5. Run the conversion check-up (L0–L3): name the weakest layer; the first
   repair goes there. Report `uiRole` and, when a transcript exists, the
   status overhead ratio against the card's declared threshold.
6. Assign the tier: blocked, needs architecture, usable private draft
   (untested without transcripts), strong candidate or signature candidate;
   never above the weakest layer.
7. Name the strongest and weakest dimensions.
8. Choose the first three repairs by risk and leverage, concrete enough that
   the next skill can start without rereading the audit; the first one in
   the weakest layer.
9. Map each repair to a skill and a file, in the order `card-diagnosis.md`
   gives.
10. Say whether validation, render review, a playtest, field authoring or
    publish readiness comes next, and whether a playtest should wait for
    structural repairs.
11. Return the quality audit packet from the scorecard, followed by a short
    self-review: scores evidence-backed, blockers considered before the
    total, weakest layer named, no platform claim beyond the facts sheet,
    next skill named.

## Hand-off

Give the audit packet to the skill that owns the weakest dimension:
`hearthroom-card-doctor` when weak dimensions interact,
`hearthroom-profile-packager` for promise (L0, L1),
`hearthroom-archetype-director` for an unclear contract,
`hearthroom-tension-weaver` for an inert premise,
`hearthroom-character-core`, `hearthroom-relationship-architect`,
`hearthroom-daily-life-architect` or `hearthroom-world-engineer` for the
durable engine, `hearthroom-play-engineer` or
`hearthroom-generator-architect` for game or helper mechanics,
`hearthroom-agency-designer`, `hearthroom-opening-director` or
`hearthroom-longplay-architect` for reply paths, second turn or
continuation, `hearthroom-voice-director` for voice,
`hearthroom-language-stylist` for script or register,
`hearthroom-token-architect` when allocation hides the engine,
`hearthroom-presentation-director` for Story/UI balance and
`hearthroom-sandbox-kit` for a panel, choices or script that misbehaves.

- `hearthroom-card-author` when the author wants the repairs applied.
- `hearthroom-render-review`, `hearthroom-chat-simulation` or
  `hearthroom-publish-readiness` only after no structural blocker remains.

## Do not

- Do not push, render, play or edit files from this skill; `check-card.mjs`
  is the one command an audit may run.
- Do not treat the score as a validation result, ranking or platform metric.
- Do not punish a simple companion card for lacking game mechanics; use `N/A`.
- Do not let a beautiful opening compensate for no durable engine, a strong
  premise compensate for agency takeover, or a rich panel compensate for a
  reply that does not read as story.
- Do not count a long definition as strong unless it creates reusable
  behaviour, state, voice, routes or boundaries.
- Do not recommend a paid playtest while structural repairs are pending.
- Do not rate a card above "usable private draft" without transcript
  evidence from 10 or more turns on two models.
