---
name: hearthroom-quality-auditor
description: Use when a card, draft, blueprint or packet set needs a quality audit, scorecard, craft tier or first-three-repairs list, or when the author asks "is this good enough", "how strong is it" or "what would you fix first", before authoring, playtesting or publish readiness.
---

# Quality auditor

Tell the author how strong a draft is and what to repair first. This is
"is this good enough?", not "how do I patch it?" (`hearthroom-card-doctor`)
and not "is it ready to keep?" (`hearthroom-publish-readiness`). The output
is an audit and a repair order; no rewrite, no file edit, no push.

## Required references

Read `../../references/quality-scorecard.md` and
`../../references/quality-rubric.md`. Read
`../../references/role-card-writing-framework.md` for the funnel (L0–L3),
`../../references/prompt-attention-architecture.md` to score attention
placement, and `../../references/presentation-design.md` to score Story/UI
balance. Read the narrow reference only for a weak dimension.

## Workflow

1. Gather evidence: the dossier (`uiRole`, threshold, evidence by version),
   shape, goal, language, rating intent, the folder, `hearthroom card check
   <dir>` (the one command an audit may run), `card validate --json`, `card
   render --json`, screenshots and any transcript the author provides. State
   what is missing; never invent field content or play results.
2. Flag critical blockers from the scorecard before scoring, then score the
   applicable dimensions on the `0-4` scale with the evidence behind each
   (`N/A` for the rest; a simple companion is not punished for lacking game
   mechanics). Score Lorebook reachability only on the `--agent` mode
   actually played.
3. Run the conversion check-up (L0–L3) and name the weakest layer; the first
   repair goes there. Report `uiRole` and, when a transcript exists, the
   status overhead ratio against the declared threshold.
4. Assign the tier (blocked, needs architecture, usable private draft,
   strong candidate, signature candidate), never above the weakest layer and
   never above "usable private draft" without transcript evidence from ten
   or more turns on two models.
5. Choose the first three repairs by risk and leverage, concrete enough that
   the next skill can start without rereading the audit; map each to a
   skill and a file in the order `card-diagnosis.md` gives. Say whether
   validation, render review, a playtest, authoring or publish readiness
   comes next, and whether a playtest should wait for structural repairs.

Continue with the skill that owns the weakest dimension (card doctor when
weak dimensions interact; profile packager for L0 and L1; the engine, play,
agency, opening, longplay, voice, language, token or presentation skill for
that layer), `hearthroom-card-author` when the author wants the repairs
applied, or render review, chat simulation or publish readiness only after
no structural blocker remains.

## Do not

- Do not treat the score as a validation result, ranking or platform metric.
- Do not let a beautiful opening compensate for no durable engine, a strong
  premise for agency takeover, or a rich panel for a reply that does not
  read as story.
- Do not recommend a paid playtest while structural repairs are pending.
