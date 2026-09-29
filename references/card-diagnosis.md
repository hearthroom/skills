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

- card shape, author goal, language and rating intent
- the folder files: `card.json`, `definition.md`, `welcome.md`, `openings/`,
  `lorebook.json`, `rules.json`
- `card validate --json`: `status`, `blockers`, `warnings`, `suggestedFixes`,
  `tokenBudget`
- `card render --json`: `rendered`, per-rule status, the static scan,
  `unsupported`
- a `play --json` reply or `--history` output
- author feedback: boring, passive, generic, verbose, controlling, confusing,
  out of character, not ready

The author's feedback surface is the conversation. Do not require raw source
material or invent review storage.

## Diagnosis packet

Return this before patching any file:

```text
Card diagnosis packet:
- current request:
- available evidence:
- card shape:
- primary failure:
- secondary failures:
- do not rewrite yet because:
- repair order:
- symptom map: symptom / missing layer / source file / narrow skill / patch target
- field triage: summary, definition, opening and alternates, example conversations, Lorebook, display rules, custom instructions
- keep / move / cut / rewrite:
- packets to preserve / to create next:
- author-facing patch plan:
- validate / render / play rerun plan:
- stop conditions:
- hand-off:
```

## Repair order

Default order when symptoms stack. Route straight to the narrow skill when the
evidence shows one narrow blocker.

1. Technical blockers: `blockers`, `rolled_back` rules, `unsupported`
   identifiers, wrong `pageMode`.
2. Boundary risk: mature, coercion-adjacent, horror, power imbalance, refusal,
   pacing or stop-condition gaps.
3. Token allocation: opening count above definition count in `tokenBudget`,
   thin definition, duplicated lore, durable rules in the wrong file.
4. Archetype contract: mixed type, unclear primary loop, companion promise
   drowned by assistant mode or lore.
5. Generator engine: advice without artifact, endless intake, drifting
   schema, no named revisions.
6. Tension and durable engine: missing desire, leverage, pressure or why-now;
   thin core; flat relationship; mood-only routine; inert world.
7. Agency and opening: spectator play, decorative choices, route funneling,
   missing first reply path or second-turn move.
8. Longplay: dead third turn, no memory, no route costs, passive character.
9. Voice: assistant tone, generic dialogue, repeated catchphrase, ensemble
   blur.
10. Render and play: rerun only after patches that change layout, behavior,
    state, boundaries, voice or first-turn flow.

## Symptom map

| Symptom | Missing layer | Source file | Narrow skill |
|---|---|---|---|
| Generic name, vague summary or tags, weak reason to open | Profile packaging | `card.json` | `hearthroom-profile-packager` |
| Attractive premise, no stakes or why-now | Tension triangle | summary, definition, opening | `hearthroom-tension-weaver` |
| Card type unclear or mixed | Archetype contract | all | `hearthroom-archetype-director` |
| Biography with no present pressure | Character core / world engine | definition | `hearthroom-character-core` or `hearthroom-world-engineer` |
| Long opening carries lore or rules | Token architecture / opening | opening, display rules | `hearthroom-token-architect` then `hearthroom-opening-director` |
| Every choice returns the same response | Agency / consequence | opening, definition | `hearthroom-agency-designer` |
| Character waits or asks generic questions | Opening / initiative | opening, definition | `hearthroom-opening-director`, `hearthroom-longplay-architect` |
| Boring after one reply | Longplay / durable engine | definition | `hearthroom-longplay-architect` |
| Polite assistant voice | Voice / weak core | definition, example conversations | `hearthroom-voice-director` |
| Relationship becomes a comfort or flirting loop | Relationship engine | definition, opening | `hearthroom-relationship-architect` |
| Quiet routine becomes small talk | Daily-life engine | definition, opening | `hearthroom-daily-life-architect` |
| Lore dump during chat | World engine / token economy | definition, Lorebook | `hearthroom-world-engineer`, `hearthroom-token-architect` |
| Lorebook fact never appears, or only in one `--agent` mode | Keywords / entry naming | `lorebook.json` | `hearthroom-world-engineer` |
| Stats, items or failure do not change choices; state forgotten | Play engine | definition, opening | `hearthroom-play-engineer` |
| Helper chats but produces no artifact | Generator engine | definition, opening, examples | `hearthroom-generator-architect` |
| Cast talks over the player | Ensemble structure | definition, opening | `hearthroom-ensemble-director` |
| Rules rolled back, identifiers unsupported, render pretty but inert | Display rules / presentation | `rules.json`, opening | `hearthroom-render-review`, `hearthroom-presentation-director` |
| Mixed scripts, pronouns, register or tags | Language style | all fields | `hearthroom-language-stylist` |
| Playtest passes safety but feels generic | Character / voice / longplay | definition, examples | choose by transcript evidence |

## Field triage

- Summary: promise, player relation and tension in one scannable sentence.
- Definition: the durable engine: core, relationship or routine or world
  rules, agency boundaries, voice, state, route costs, initiative.
- Opening and alternates: one playable first screen each, never the manual.
- Example conversations: teach reusable voice, refusal, pressure or format;
  otherwise cut.
- Lorebook: facts that must appear get keywords or `constant`; entries are
  named by content so agent mode can find them; constant entries few and
  short.
- Display rules: reveal state, mood, route or choices that help the player
  act; every rule `applied` or intentionally `unmatched`.
- Custom instructions: replace one default instruction block; use only when
  the definition cannot carry the rule.

## Patch plan rules

- Diagnose before rewriting. A full rewrite is justified only when the engine
  is underdefined.
- Preserve what works. If the opening works and longplay fails, leave the
  opening alone except for state hand-off.
- Patch the smallest file that fixes the observed failure. Move durable rules
  into the definition before polishing the opening.
- Turn vague feedback into observable triggers: generic reply, no next
  action, route funneling, voice drift, agency takeover, lore dump, repeated
  setup.

## Verification plan

```text
Verification plan:
- card validate: needed because ...
- card render: needed because ...
- play: needed because ... / probes: ... / patch triggers: ...
- cost stance:
```

If the evidence already proves the failure, patch first and play later. Rerun
a playtest only when the patch changes behavior, boundaries, state, voice or
first-turn flow.
