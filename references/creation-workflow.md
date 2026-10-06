# Creation workflow

The end-to-end route from an author's seed to a private card on Hearthroom:
draft the folder, push a trial card, validate, render, play, iterate, and
hand the card back to the author for publishing. Narrow craft skills own
each layer; this page is the runway.

```text
author seed -> first bottleneck -> narrow skill queue -> field files
-> card check -> card push --validate -> card render -> offline preview
-> play (paid; a weak and a strong model, --new-session)
-> one-shortcoming iteration, compared with the previous version
-> author decides on --create and review
```

A card is judged by deep-play conversion (`role-card-writing-framework.md`,
Funnel): find the weakest of L0–L3 and repair it first.

## Runway principle

Move one bottleneck at a time. A complete workflow is not every skill in
sequence: choose the first missing layer, preserve its packet, and continue
only when that layer is coherent enough for the next step. Skip stages the
author has settled; do not reopen a chosen direction unless asked.

Do not push a card while it lacks a playable premise, a player position,
first-scene pressure, or a settled boundary posture. Do not run `play -m`
until validation passes and the author accepts the credit cost. Do not run
`card push --create` or submit for review unless the author asks.

## Stage ladder

| Stage | Purpose | Owner | Stop if |
|---|---|---|---|
| Intake | author goal, language, rating intent, materials, output mode | `using-hearthroom` or the conductor | the goal is not a card task |
| Premise | turn mood or trope into a playable direction | `hearthroom-premise-workshop` | no role, player or tension choice exists |
| Contract | choose the primary card type and overlays | `hearthroom-archetype-director` | a hybrid has no primary contract |
| UI role | declare `uiRole: assist \| core` and the status overhead threshold in `README.md` | the conductor with the author (`presentation-design.md`, Story first) | the role is undeclared |
| Source and originality | convert files or inspiration safely | `hearthroom-material-distiller`, `hearthroom-originality-adapter` | the source is raw or copy risk is open |
| Engine | build the behaviour loop | character, relationship, world, daily-life, scenario, play, generator, ensemble skills | the engine is generic or contradictory |
| Interaction | make the player matter | `hearthroom-tension-weaver`, `hearthroom-agency-designer`, `hearthroom-opening-director`, `hearthroom-longplay-architect` | the first reply or second-turn move is unclear |
| Voice and examples | make behaviour executable | `hearthroom-voice-director`, `hearthroom-talk-example-curator`, `hearthroom-language-stylist` | the voice cannot survive pressure |
| State, budget, presentation | control memory, budget and reply shape | `hearthroom-state-economist`, `hearthroom-token-architect`, `hearthroom-presentation-director` | durable rules sit in the wrong file |
| Profile and visual | package the first impression and media | `hearthroom-profile-packager`, `hearthroom-visual-identity-director` | the summary is vague or media exist only as prompts |
| Quality gate | decide whether to author | `hearthroom-quality-auditor` | the first three repairs are unresolved |
| Field assembly | write or patch the folder files | `hearthroom-card-author`, then `hearthroom-field-finalizer` | a required packet is missing |
| CLI readiness | login, folder, flags | `hearthroom-cli-operator` | auth or the folder is not ready |
| Local checks | `hearthroom card check <dir>`; `card preview` after render | `hearthroom-field-finalizer`, `hearthroom-render-review` | errors remain |
| Trial card | `hearthroom card push <dir> --validate --json` | the CLI | the push fails |
| Validation | read `status`, `blockers`, `warnings`, `suggestedFixes`, `tokenBudget` | the report | blockers remain |
| Render review | `hearthroom card render <dir> --json` | `hearthroom-render-review` | the action path or readability fails |
| Play test | `hearthroom play <dir> --new-session -m "…" --allow-spend --json`, 10–20 turns, a weak and a strong model | `hearthroom-chat-simulation` | the author has not accepted the cost |
| Iteration | choose exactly one next repair | `hearthroom-iteration-director` | evidence is missing or mixed |
| Publish readiness | decide whether the card is worth keeping | `hearthroom-publish-readiness` | the author has not asked |

Publishing itself belongs to the author: `card push --create` makes a real
private card in their inventory, and review submission happens on the site,
where the version is frozen.

## Creation runway

Before narrow work on a broad or "idea to card" request, settle and write
down (in the reply or the dossier, as prose or a short list): the output
mode (brainstorm, draft-only, trial card, patch to an existing folder,
closed-loop iteration, publish readiness); the author's goal, language and
rating intent; what inputs exist and which decisions are already made
(premise, player role, type, first scene, media); the first bottleneck and
the skill queue (now, next, later); whether to push now and what media are
still missing; the cost and public-action warnings; what not to do yet;
the stop criteria. The shape is yours; the decisions are not optional.

## Guardrails

- Limits are ceilings read from `tokenBudget.limits`; expand only
  behaviour-bearing detail.
- Source material becomes a source-to-play map, never pasted lore.
- Author feedback stays in the conversation; the card's `README.md` dossier
  is the one record.
- Media are files under `assets/` referenced from `card.json` `media`. A
  prompt is a hand-off, not completion.
- `play -m` spends credits; run it only with `--allow-spend` after the author
  accepts the cost. Trial-card expiry and slots: `cost-and-boundaries.md`.

## Completion

An end-to-end trial-card workflow is complete when every design decision
(premise through media) is present or intentionally omitted with a reason;
the files are written or patched and validation reports no blockers; render
review has no unresolved readability or action-path failure; play is run
with accepted cost or explicitly deferred; and the remaining risks, the next
iteration, and how to keep the trial card with `--create` are stated.
