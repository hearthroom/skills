---
name: hearthroom-card-author
description: Use when an agent must write, improve, import, restructure or assemble the field files of a Hearthroom card from an idea, draft, notes or prepared packets, or push those files as a trial card and iterate through validate, render and play.
---

# Hearthroom Card Author

Turn an author's idea, draft, notes, imported material or prepared packets
into the files of a card folder, then prove them with the CLI. The CLI makes
the card real; this toolkit makes it good.

## Required references

Read `../../references/platform-facts.md` for the folder layout, field names,
limits and the CLI loop. Read `../../references/card-authoring-templates.md`
before final field drafts, `../../references/role-card-writing-framework.md`
for self-review, `../../references/field-finalization.md` before writing
files, and `../../references/cli-workflow.md` before any push.

Load the narrow reference only when that layer is the current blocker:
`../../references/premise-workshop.md`, `../../references/tension-triangle.md`,
`../../references/character-core-design.md`,
`../../references/relationship-engine.md`,
`../../references/world-engine-design.md`,
`../../references/scenario-design.md`, `../../references/daily-life-design.md`,
`../../references/play-engine-design.md`,
`../../references/generator-design.md`,
`../../references/system-intake-card-design.md`,
`../../references/ensemble-card-design.md`,
`../../references/archetype-contracts.md`, `../../references/agency-design.md`,
`../../references/voice-calibration.md`,
`../../references/talk-example-design.md`,
`../../references/language-style.md`, `../../references/opening-design.md`,
`../../references/prose-texture.md`,
`../../references/longplay-design.md`,
`../../references/state-economy-design.md`,
`../../references/role-detail-engine.md`, `../../references/token-economy.md`,
`../../references/presentation-design.md`,
`../../references/boundary-design.md`,
`../../references/instruction-guardrails.md`,
`../../references/material-distillation.md`,
`../../references/originality-adaptation.md`,
`../../references/profile-packaging.md`, `../../references/visual-identity.md`,
`../../references/card-series-design.md`, `../../references/quality-rubric.md`,
`../../references/quality-scorecard.md`, `../../references/card-diagnosis.md`,
`../../references/playtest-loop.md`, `../../references/cost-and-boundaries.md`.

## Workflow

1. Capture the goal and the mode: draft-only field assembly, a new trial card,
   or a patch to an existing card folder. Capture premise, relationship
   dynamic, play loop, tone, language, content rating intent and success
   criteria. For an existing folder run `hearthroom card pull <dir>` first so
   the files match the provider's copy.
2. Route the first blocker to its narrow skill before assembling fields, unless
   that packet already exists:
   - loose mood, trope or aesthetic: `hearthroom-premise-workshop`
   - unclear or hybrid card type: `hearthroom-archetype-director`
   - notes, files or a world bible: `hearthroom-material-distiller`
   - canon, fan premise, copied draft, "like X but original": `hearthroom-originality-adapter`
   - mature, intense or consent-sensitive goals: `hearthroom-boundary-designer`
   - trope-only or passive character: `hearthroom-character-core`
   - generic flirting, comfort loops, instant intimacy: `hearthroom-relationship-architect`
   - lore digest, factions, locations: `hearthroom-world-engineer`
   - mystery, investigation, event, betrayal: `hearthroom-scenario-architect`
   - quiet routine, roommate, cafe, school: `hearthroom-daily-life-architect`
   - stats, resources, quests, combat, turn protocol: `hearthroom-play-engineer`
   - artifact output, intake defaults, revision commands: `hearthroom-generator-architect`
   - several active speakers, cast size, spotlight: `hearthroom-ensemble-director`
   - stakes, why-now, player leverage: `hearthroom-tension-weaver`
   - spectator play, decorative choices, narrated player feelings: `hearthroom-agency-designer`
   - speaking style, blurred voices, refusal voice: `hearthroom-voice-director`
   - example conversations, omit or keep: `hearthroom-talk-example-curator`
   - script mixing, register, pronouns, translated cadence: `hearthroom-language-stylist`
   - opening at full volume, trembling ellipses, stacked adjectives, template register: `hearthroom-opening-director` with `prose-texture.md`
   - opening repair, first reply path: `hearthroom-opening-director`
   - dead third turn, memory, progression: `hearthroom-longplay-architect`
   - which state to track, show or hide: `hearthroom-state-economist`
   - thin definition, less-empty settings: `hearthroom-detail-engineer`
   - overlong fields, allocation, compression: `hearthroom-token-architect`
   - plain vs HTML, display rules, status line: `hearthroom-presentation-director`
   - name, summary, tags, first impression: `hearthroom-profile-packager`
   - portrait, background, art prompts: `hearthroom-visual-identity-director`
   - related cards, variants, keep or merge: `hearthroom-series-architect`
   - "is this good enough": `hearthroom-quality-auditor`
   - existing-card mixed symptoms: `hearthroom-card-doctor`
   - comparative or taste-level feedback: `hearthroom-collaboration-director`
3. Choose or preserve the archetype and set `card.json` `type` (`companion`,
   `story`, `game`, `generator`). Daily-life, light-setting, heavy-setting and
   ensemble are overlays.
4. Draft in this order: promise, engine, play, presentation. Use the universal
   draft packet for thin or high-stakes briefs. When packets already exist,
   resolve conflicts and assemble; do not brainstorm from scratch and do not
   fill a missing packet with generic prose. While drafting:
   - surface the emotional promise, player fantasy, pressure or loop that must
     survive every route; for weak ideas propose concrete alternatives with
     player leverage, first-scene pressure and a repeatable loop;
   - make the character's engine legible: what they want, what blocks it, what
     they will not do, what changes when the player pushes closer or away;
   - write speech as rhythm, vocabulary, address terms, tells and avoided
     phrasing, never as "natural", "gentle" or "like a real person";
   - treat the opening and every sample as the reply the model will copy:
     open below the climax, objects before feelings, whole sentences with an
     ellipsis budget, one line that refuses the mood; do not add a style
     rule the opening already contradicts (`prose-texture.md`);
   - write proactive rules: what the character asks, reveals, escalates or
     offers when the player is passive or stalls;
   - repair the chosen type directly: a companion needs relationship pressure
     and pacing, a story needs stakes, branches and consequence state, a game
     needs compact state, resource rules, a turn protocol and failure-forward
     behavior, a generator needs an artifact contract, defaults and named
     revision operations, an ensemble needs distinct wants, voices and turn
     ownership;
   - for ensembles run a contrast check: each core speaker has a different
     want, fear, speech cue and pressure move, with a micro-sample only where
     rules alone blur;
   - for mature or intense premises make rating, explicitness ceiling,
     escalation ladder, refusal style, stop conditions and safer fallback
     explicit before writing a provocative opening;
   - for a card set author the anchor card first and one clearly distinct
     variant, and validate and render before adding more;
   - before finalizing, write one expected first user message and one
     second-turn move; if turn two is not more interesting than turn one,
     revise the engine.
5. Self-review against the framework and `quality-rubric.md`, then run
   `hearthroom-field-finalizer`. In draft-only mode stop here and return the
   final field-authoring packet.
6. Write the files. `card.json` holds name, summary, tags, type, language,
   `playerName`, `prologue`, `talkExample`, `outputContract`,
   `customInstructions` and `media`. The definition goes in `definition.md`,
   the opening in `welcome.md`, alternates in `openings/alt-NN.md`, entries in
   `lorebook.json`, display rules and page mode in `rules.json`, media files
   under `assets/` (named and grouped as Media library in `platform-facts.md`
   says), and working notes only in `README.md`. When patching, edit
   only the fields that change.
7. Keep the definition an engine. If it is a thin biography or under budget
   for its language and ambition, use `hearthroom-detail-engineer` before
   pushing. If the opening carries rules, lore or repeated monologue, use
   `hearthroom-token-architect`. Move facts needed only in some scenes into
   Lorebook entries with keywords and descriptive names; keep constant entries
   few and short.
8. Make the opening playable. The first two lines state who is in motion,
   where and when the player is, and what concrete problem is in front of them.
   Mood-first openings go back to `hearthroom-opening-director`. Put
   player-side reply paths in `prologue` when they would lengthen the scene.
   Keep example conversations as short calibration samples, never session
   summaries. Keep the output contract short and label the format exemplar as
   an example.
9. Presentation: plain text is the default. Write ordinary HTML and CSS when
   a bar, fact row, panel or set of choices carries play value; no custom
   elements the page does not register. Reusable layout, status bars and
   buttons belong in `rules.json` display rules, which the model never sees;
   a button that sends a player line is a plain `<button>` in a display rule
   calling `sdk.message.send(text)` on the sandbox page. A card that uses the
   sandbox author API needs `pageMode` `sandbox`. A status panel, theme,
   drawer or choice set is built by `hearthroom-sandbox-kit`, not by hand.
   Route unresolved layout to `hearthroom-presentation-director`. Before the
   first push run `node <toolkit>/scripts/check-card.mjs <dir>`.
10. Edit `customInstructions` only through `hearthroom-instruction-guardrail`
    with play evidence. It replaces one default instruction block; it is not a
    shortcut for a weak core, voice, opening or boundary.
11. Push and validate: `hearthroom card push <dir> --validate --json`. Read
    `status`, `blockers`, `warnings`, `suggestedFixes` and `tokenBudget`. Fix
    blockers in the files and push again. Validation proves technical
    readiness only; it does not judge writing.
12. Render: `hearthroom card render <dir> --json`, then review with
    `hearthroom-render-review`. Repair render failures before another render.
13. Play, when the author accepts the credit cost:
    `hearthroom play <dir> -m "…" --allow-spend --json` with
    `hearthroom-chat-simulation`. Use `--greeting N` for alternates,
    `--agent on|off` for agent mode, `--model` for a second model, `--history`
    to read back. Repair play failures before another play pass.
14. Summarize the card, validation, render and play results, remaining risks
    and the next action. Remind the author that a trial card expires three
    days after its last push and that `card push --create` keeps it.

## Hand-off

For a trial card report the folder path, files changed, validation status,
render status, play status, remaining risks and next action. For draft-only
work report the route, the final field-authoring packet, packets preserved,
conflict resolutions and next action.

Hand to `hearthroom-iteration-director` after any validate, render, play or
author-feedback evidence; to `hearthroom-publish-readiness` when the author
asks whether to keep or submit the card.

## Do not

- Do not push while placeholders, unresolved alternatives or working notes
  remain in the fields.
- Do not run `play -m` without `--allow-spend` and the author's acceptance.
- Do not run `card push --create` or submit for review unless asked.
- Do not write rules that decide the player's feelings, consent, actions or
  route.
- Do not copy source wording, names or scene text from inspiration material.
- Do not paste a formatting manual into the definition; write the
  card-specific contract.
- Do not let polished prose hide a weak engine, generic voice, passive
  character, hollow opening or missing consequence loop.
- Do not treat validation as proof of quality.
