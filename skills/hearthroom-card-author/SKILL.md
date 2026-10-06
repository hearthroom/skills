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

Load the narrow reference only when that layer is the current blocker; the
routing table in `using-hearthroom` names the skill, and each skill names its
reference. Two are always relevant to this skill:
`../../references/talk-example-design.md` (examples beat rules for weak
models: one ordinary-turn sample by default) and
`../../references/prose-texture.md` (the opening and every sample are the
reply the model copies).

## Workflow

1. Capture the goal and the mode: draft-only field assembly, a new trial card,
   or a patch to an existing card folder. Capture premise, relationship
   dynamic, play loop, tone, language, content rating intent and success
   criteria. For an existing folder run `hearthroom card status <dir>` first;
   pull (`hearthroom card pull <roleId> <dir> --force`) only when the card
   was edited on the site and the local files have no unpushed work, because
   `--force` overwrites them. Read the card's `README.md` (the dossier:
   `uiRole`, decisions, rejected directions, evidence by version) before
   changing anything.
2. Route the first blocker to its narrow skill before assembling fields,
   unless that packet already exists, with the table in `using-hearthroom`.
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
   - write speech as rhythm, vocabulary, address terms and tells, plus one
     ordinary-turn line in the character's voice; for a tic you want gone,
     show what they say instead; never "natural", "gentle" or "like a real
     person";
   - treat the opening and every sample as the reply the model will copy:
     open below the climax, objects before feelings, whole sentences with an
     ellipsis budget, one line that refuses the mood; do not add a style
     rule the opening already contradicts (`prose-texture.md`). Weak models
     copy the opening, the samples and the output-contract example every
     turn, so at least one of them shows an ordinary mid-story turn, never
     the climax (`talk-example-design.md`);
   - write proactive rules: what the character asks, reveals, escalates or
     offers when the player is passive or stalls;
   - repair the chosen type directly: a companion needs relationship pressure
     and pacing, a story needs stakes, branches and consequence state, a game
     needs compact state, resource rules, a turn protocol and failure-forward
     behaviour, a generator needs an artifact contract, defaults and named
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
6. Write the files. `card.json` holds the short fields listed under The card
   folder in `platform-facts.md`. The definition goes in `definition.md`,
   the opening in `welcome.md`, alternates in `openings/alt-NN.md`, entries in
   `lorebook.json`, display rules and page mode in `rules.json`, media files
   under `assets/` (named and grouped as Media library in `platform-facts.md`
   says), and working notes only in `README.md` (the dossier template in
   `card-authoring-templates.md`). When patching, edit only the fields that
   change.
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
9. Presentation: declare `uiRole` (`assist` | `core`) and the status overhead
   threshold in `README.md` (`presentation-design.md`, Story first). For
   `assist`, read the opening and three play replies with rules off; they
   must still read as story. Status lines take tokens from the story: if the
   status and choices blocks are more than the declared share of a typical
   reply, cut fields. Plain text is the default. Write ordinary HTML and CSS when
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
    `hearthroom-render-review`. When the chat page's repository is available,
    run the offline preview (`platform-facts.md`, Offline preview) with play
    replies pasted into `preview/replies.md`; it is the free check of reply
    layout. Repair render failures before another render.
13. Play, when the author accepts the credit cost:
    `hearthroom play <dir> --new-session -m "…" --allow-spend --json` with
    `hearthroom-chat-simulation`: 10–20 turns, a weak and a strong model,
    `--new-session --greeting N` for an alternate opening, `--agent on|off`
    for agent mode, `--history` to read back (`playtest-loop.md`). Repair
    one shortcoming per version and compare with the previous version.
14. Summarise the card, validation, render and play results, remaining risks
    and the next action in the dossier and to the author
    (`cost-and-boundaries.md` for trial-card expiry and `--create`).

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
