---
name: hearthroom-quality-auditor
description: Use when a Hearthroom card, draft, blueprint or set of packets needs a quality audit, scorecard, craft tier, good-enough review, first-three repair list, or a decision on whether to keep ideating, author fields, review the render, playtest or check publish readiness.
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
`../../references/platform-facts.md` for what validation and render output
mean. Read `../../references/role-card-writing-framework.md` for promise,
engine, play and presentation patterns.

Read only for weak dimensions: `../../references/profile-packaging.md` when
the promise is weak despite a coherent engine,
`../../references/language-style.md` for mixed scripts, register or pronoun
drift, `../../references/token-economy.md` when allocation hides the engine,
`../../references/playtest-loop.md` when a transcript is part of the
evidence, and the narrow reference for archetype, character core,
relationship, daily-life, world, play, generator, agency, opening, longplay,
voice or boundary.

## Workflow

1. Gather evidence: card shape, goal, language, rating intent, the folder
   files, `card validate --json` (`status`, `blockers`, `tokenBudget`),
   `card render --json` (rule statuses, `unsupported`), and any play
   transcript the author provides.
2. State what is missing. Do not invent field content or play results.
3. Flag critical blockers from the scorecard before scoring.
4. Score the applicable dimensions on the `0-4` scale with the evidence
   behind each. Mark the rest `N/A`. Score Lorebook reachability only on the
   `--agent` mode actually played; say which mode is untested.
5. Assign the tier: blocked, needs architecture, usable private draft, strong
   candidate or signature candidate.
6. Name the strongest and weakest dimensions.
7. Choose the first three repairs by risk and leverage, concrete enough that
   the next skill can start without rereading the audit.
8. Map each repair to a skill and a file.
9. Say whether validation, render review, a playtest, field authoring or
   publish readiness comes next, and whether a playtest should wait for
   structural repairs.
10. Return the quality audit packet from the scorecard, followed by a short
    self-review: scores evidence-backed, blockers considered before the total,
    no platform claim beyond the facts sheet, next skill named.

## Hand-off

Give the audit packet to the skill that owns the weakest dimension:
`hearthroom-card-doctor` when weak dimensions interact,
`hearthroom-profile-packager` for promise, `hearthroom-archetype-director`
for an unclear contract, `hearthroom-tension-weaver` for an inert premise,
`hearthroom-character-core`, `hearthroom-relationship-architect`,
`hearthroom-daily-life-architect` or `hearthroom-world-engineer` for the
durable engine, `hearthroom-play-engineer` or
`hearthroom-generator-architect` for game or helper mechanics,
`hearthroom-agency-designer`, `hearthroom-opening-director` or
`hearthroom-longplay-architect` for reply paths, second turn or
continuation, `hearthroom-voice-director` for voice,
`hearthroom-language-stylist` for script or register,
`hearthroom-token-architect` when allocation hides the engine.

- `hearthroom-card-author` when the author wants the repairs applied.
- `hearthroom-render-review`, `hearthroom-chat-simulation` or
  `hearthroom-publish-readiness` only after no structural blocker remains.

## Do not

- Do not run CLI commands or edit files from this skill.
- Do not treat the score as a validation result, ranking or platform metric.
- Do not punish a simple companion card for lacking game mechanics; use `N/A`.
- Do not let a beautiful opening compensate for no durable engine, or a strong
  premise compensate for agency takeover.
- Do not count a long definition as strong unless it creates reusable
  behavior, state, voice, routes or boundaries.
- Do not recommend a paid playtest while structural repairs are pending.
