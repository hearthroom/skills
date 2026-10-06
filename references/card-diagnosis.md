# Card diagnosis

Use this reference when an existing card, imported draft, validation report,
render report, play transcript or author feedback contains several symptoms
and the agent must decide what to repair first.

Diagnosis is not a rewrite. It is a triage loop:

```text
evidence -> weakest layer -> source file -> narrow skill -> patch plan -> verification
```

It stops the agent from polishing prose, adding lore or paying for another
playtest before the engine is repaired.

## Inputs

- the card's `README.md` dossier first: `uiRole`, the overhead threshold, the
  decision log, the rejected directions and the evidence by version (the
  template is in `card-authoring-templates.md`)
- card shape, author goal, language and rating intent
- the folder files: `card.json`, `definition.md`, `welcome.md`, `openings/`,
  `lorebook.json`, `rules.json`
- `node <toolkit>/scripts/check-card.mjs <dir>` findings
- `hearthroom card status <dir> --json`: which sections differ from the
  pushed card
- `card validate --json`: `status`, `blockers`, `warnings`, `suggestedFixes`,
  `tokenBudget`
- `card render --json`: `rendered`, per-rule status, the static scan,
  `unsupported`
- offline-preview or play-page screenshots
- a `play --json` transcript or `--history` output (10–20 turns; see
  `playtest-loop.md`)
- author feedback: boring, passive, generic, verbose, controlling, confusing,
  out of character, too busy, not ready

The author's feedback surface is the conversation. Do not require raw source
material or invent review storage.

## Diagnosis packet

Return this before patching any file:

```text
Card diagnosis packet:
- current request:
- available evidence:
- card shape; uiRole:
- primary failure (the next version fixes only this):
- secondary failures (backlog):
- do not rewrite yet because:
- repair order:
- symptom map: symptom / missing layer / source file / narrow skill / patch target
- field triage: summary, definition, opening and alternates, example conversations, Lorebook, display rules, custom instructions
- keep / move / cut / rewrite:
- packets to preserve / to create next:
- author-facing patch plan:
- verification plan:
- stop conditions:
- hand-off:
```

## Repair order

This is the single owner of the repair order; the scorecard and the iteration
loop point here. Route straight to the narrow skill when the evidence shows
one narrow blocker.

1. Technical blockers: `blockers`, `check-card.mjs` errors, `rolled_back`
   rules, `unsupported` identifiers, wrong `pageMode`.
2. Agency and boundary: the card decides the player's feelings, consent,
   actions or route; mature, coercion-adjacent, horror or power-imbalance
   premises without refusal, pacing or stop conditions.
3. The weakest conversion layer (`role-card-writing-framework.md`): L0 cover
   and title, L1 summary, L2 the opening as a free demo, L3 turn two and
   longplay. Find it first; repair it before polishing a layer that already
   works. Token allocation comes here when a long opening or a thin
   definition is what breaks L2 or L3.
4. Everything else, in the order the symptom map suggests: archetype
   contract, durable engine, state economy, voice, language style,
   presentation polish.
5. Render and play: rerun only after patches that change layout, behaviour,
   state, boundaries, voice or first-turn flow.

One primary repair per version; secondary failures are a backlog for the
next version.

## Symptom map

| Symptom | Missing layer | Source file | Narrow skill |
|---|---|---|---|
| Generic name, vague summary or tags, weak reason to open | Profile packaging (L0, L1) | `card.json` | `hearthroom-profile-packager` |
| Attractive premise, no stakes or why-now | Tension triangle | summary, definition, opening | `hearthroom-tension-weaver` |
| Card type unclear or mixed | Archetype contract | all | `hearthroom-archetype-director` |
| Biography with no present pressure | Character core / world engine | definition | `hearthroom-character-core` or `hearthroom-world-engineer` |
| Long opening carries lore or rules | Token architecture / opening | opening, display rules | `hearthroom-token-architect` then `hearthroom-opening-director` |
| Every choice returns the same response | Agency / consequence | opening, definition | `hearthroom-agency-designer` |
| Character waits or asks generic questions | Opening / initiative | opening, definition | `hearthroom-opening-director`, `hearthroom-longplay-architect` |
| Boring after one reply | Longplay / durable engine (L3) | definition | `hearthroom-longplay-architect` |
| Polite assistant voice | Voice / weak core | definition, example conversations | `hearthroom-voice-director` |
| Relationship becomes a comfort or flirting loop | Relationship engine | definition, opening | `hearthroom-relationship-architect` |
| Quiet routine becomes small talk | Daily-life engine | definition, opening | `hearthroom-daily-life-architect` |
| Lore dump during chat | World engine / token economy | definition, Lorebook | `hearthroom-world-engineer`, `hearthroom-token-architect` |
| Lorebook fact never appears, or only in one `--agent` mode | Keywords / entry naming | `lorebook.json` | `hearthroom-world-engineer` |
| Stats, items or failure do not change choices; state forgotten | Play engine | definition, opening | `hearthroom-play-engineer` |
| Helper chats but produces no artifact | Generator engine | definition, opening, examples | `hearthroom-generator-architect` |
| Cast talks over the player | Ensemble structure | definition, opening | `hearthroom-ensemble-director` |
| Rules rolled back, identifiers unsupported, render pretty but inert | Display rules / presentation | `rules.json`, opening | `hearthroom-render-review`, `hearthroom-presentation-director` |
| Panel shows once (on the opening) and never updates | Generation rule missing: the model is never told to write the block | definition, output contract, a constant entry | `hearthroom-sandbox-kit` |
| Status block or choices vanish by turn 10 | Format floor: the format rule is not in the iron rules and the recency checklist, or the sample shows a rare turn | output contract, recency checklist, `talkExample` | `hearthroom-token-architect` (`prompt-attention-architecture.md`), `hearthroom-talk-example-curator` |
| UI crowds out the story; the player reads the panel, not the reply | Story/UI balance: overhead over threshold, elements with no job, HUD where an object would do | `rules.json`, output contract | `hearthroom-presentation-director` |
| Kit panel, script or save misbehaves | Sandbox kit | `rules.json`, `kit.config.json` | `hearthroom-sandbox-kit` |
| Mixed scripts, pronouns, register or tags | Language style | all fields | `hearthroom-language-stylist` |
| Opening at full volume, ellipsis in every line, stacked adjectives, stop-motion replies | Prose texture | opening, examples, output contract | `hearthroom-opening-director`, `hearthroom-voice-director` (`prose-texture.md`) |
| Playtest passes safety but feels generic | Character / voice / longplay | definition, examples | choose by transcript evidence |

## Field triage

- Summary: promise, player relation and tension in one scannable sentence.
- Definition: the durable engine: core, relationship or routine or world
  rules, agency boundaries, voice, state, route costs, initiative.
- Opening and alternates: one playable first screen each, never the manual;
  the opening ends with the status block when the card has one.
- Example conversations: one ordinary-turn sample that teaches the format and
  the register (`talk-example-design.md`).
- Lorebook: facts that must appear get keywords or `constant`; entries are
  named by content so agent mode can find them; constant entries few and
  short.
- Display rules: reveal state, mood, route or choices that help the player
  act; every rule `applied` or intentionally `unmatched`; the block they
  consume is one the model is told to write.
- Custom instructions: replace one default instruction block; use only when
  the definition cannot carry the rule.

## Patch plan rules

- Diagnose before rewriting. A full rewrite is justified only when the engine
  is underdefined.
- Preserve what works. If the opening works and longplay fails, leave the
  opening alone except for state hand-off.
- Patch the smallest file that fixes the observed failure. Move durable rules
  into the definition before polishing the opening.
- One shortcoming per version: the patch plan names one primary repair;
  secondary failures wait for the next version. Record each version and its
  shortcoming in the dossier.
- Turn vague feedback into observable triggers: generic reply, no next
  action, route funnelling, voice drift, agency takeover, lore dump, repeated
  setup, panel never updates, block missing at turn 10.

## Verification plan

```text
Verification plan:
- pre-check before any paid retest: attention placement (iron rules and
  recency checklist agree), length buffer, one script, format and contract
  consistency, facts checked against platform-facts.md, local = pushed
  (`card status`), check-card, validate + render, offline preview with the
  failing reply in preview/replies.md
- probes: the same set as the previous version (compliance / off-script /
  passive / meta / ending), 10–20 turns, a weak and a strong model, each run
  on --new-session
- compare with the previous version: per layer, better / same / worse, with
  the line that shows it
- cost stance:
```

One reply cannot separate improvement from noise. If the evidence already
proves the failure, patch first and play later; rerun a playtest only when
the patch changes behaviour, boundaries, state, voice or first-turn flow.
