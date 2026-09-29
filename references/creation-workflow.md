# Creation workflow

Use this reference for the end-to-end route from an author's seed to a private
card on Hearthroom: draft the folder, push a trial card, validate, render, play,
iterate, and hand the card back to the author for publishing. It is the runway
for the whole journey. Narrow craft skills own each layer.

```text
author seed -> runway packet -> narrow skill queue -> field files
-> card push --validate -> card render -> play (optional, paid) -> card pull
-> iteration -> author decides on --create and review
```

## Runway principle

Move one bottleneck at a time. A complete workflow is not every skill in
sequence. Choose the first missing layer, preserve its packet, and continue only
when that layer is coherent enough for the next step.

Do not push a card while it lacks a playable premise, a player position,
first-scene pressure, or a settled boundary posture. Do not run `play -m` until
validation passes and the author accepts the credit cost. Do not run
`card push --create` or submit for review unless the author asks for it.

## Stage ladder

| Stage | Purpose | Owner | Stop if |
|---|---|---|---|
| Intake | author goal, language, rating intent, materials, output mode | `using-hearthroom` or the conductor packet | the goal is not a card task |
| Premise | turn mood or trope into a playable direction | `hearthroom-premise-workshop` | no role, player or tension choice exists |
| Contract | choose the primary card type and overlays | `hearthroom-archetype-director` | a hybrid has no primary contract |
| Source and originality | convert files or inspiration safely | `hearthroom-material-distiller`, `hearthroom-originality-adapter` | the source is raw or copy risk is open |
| Engine | build the behavior loop | character, relationship, world, daily-life, scenario, play, generator, ensemble skills | the engine packet is generic or contradictory |
| Interaction | make the player matter | `hearthroom-tension-weaver`, `hearthroom-agency-designer`, `hearthroom-opening-director`, `hearthroom-longplay-architect` | the first reply or second-turn move is unclear |
| Voice and examples | make behavior executable | `hearthroom-voice-director`, `hearthroom-talk-example-curator`, `hearthroom-language-stylist` | the voice cannot survive pressure |
| State, budget, presentation | control memory, budget and reply shape | `hearthroom-state-economist`, `hearthroom-token-architect`, `hearthroom-presentation-director` | durable rules sit in the wrong file |
| Profile and visual | package the first impression and media | `hearthroom-profile-packager`, `hearthroom-visual-identity-director` | the summary is vague or media exist only as prompts |
| Quality gate | decide whether to author | `hearthroom-quality-auditor` | the first three repairs are unresolved |
| Field assembly | write or patch the folder files | `hearthroom-card-author`, then `hearthroom-field-finalizer` | a required packet is missing |
| CLI readiness | login, folder, flags | `hearthroom-cli-operator` | auth or the folder is not ready |
| Trial card | `hearthroom card push <dir> --validate --json` | the CLI | the push fails |
| Validation | read `status`, `blockers`, `warnings`, `suggestedFixes`, `tokenBudget` | the report | blockers remain |
| Render review | `hearthroom card render <dir> --json` | `hearthroom-render-review` | the action path or readability fails |
| Play test | `hearthroom play <dir> -m "…" --allow-spend --json` | `hearthroom-chat-simulation` | the author has not accepted the cost |
| Iteration | choose exactly one next repair | `hearthroom-iteration-director` | evidence is missing or mixed |
| Publish readiness | decide whether the card is worth keeping | `hearthroom-publish-readiness` | the author has not asked |

Publishing itself belongs to the author: `card push --create` makes a real
private card in their inventory, and review submission happens on the site.

## Creation runway packet

Return this before narrow work when the author asks for end-to-end help, is
unsure where to start, or wants the whole flow coordinated.

```text
Creation runway packet:
- current request:
- output mode: brainstorm | draft-only | trial card | patch existing folder | closed-loop iteration | publish readiness
- author goal:
- language:
- content rating intent:
- available inputs:
- known decisions:
  - premise:
  - player role:
  - card type:
  - first scene:
  - media status:
- missing decisions:
- first bottleneck:
- skill queue:
  - now:
  - next:
  - later:
- CLI stance:
  - push now: yes | no
  - media requirement:
  - validate / render / play stance:
- cost and public-action warnings:
- do not do yet:
- stop criteria:
- hand-off:
```

## Guardrails

- Limits are ceilings read from `tokenBudget.limits`; expand only
  behavior-bearing detail.
- Source material becomes a source-to-play map, never pasted lore.
- Author feedback stays in the conversation; no review ledgers.
- Media are files under `assets/` referenced from `card.json` `media`. A
  prompt is a hand-off, not completion.
- `play -m` spends credits; run it only with `--allow-spend` after the author
  accepts the cost.
- Trial cards expire three days after the last push; tell the author before
  `--evict`. Never publish or submit on the author's behalf.

## Completion check

An end-to-end trial-card workflow is complete only when:

- every design decision (premise through media) is present or intentionally
  omitted with a reason;
- the files are written or patched and validation reports no blockers;
- render review has no unresolved readability or action-path failure;
- play is run with accepted cost or explicitly deferred;
- remaining risks, the next iteration, and how to keep the trial card with
  `--create` are stated.
