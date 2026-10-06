---
name: hearthroom-card-author
description: Use when the card's field files must be written, patched, imported or assembled from an idea, draft, notes or packets and pushed as a trial card, including "put this into the card", "update the definition" or any request to make a card real on Hearthroom and prove it with validate, render and play.
---

# Hearthroom Card Author

Turn an idea, draft, notes, imported material or prepared packets into the
files of a card folder, then prove them with the CLI. The files are what the
model reads every turn, so what you write here is the card; the CLI only
makes it real.

## Required references

Read `../../references/platform-facts.md` for the folder layout, field
names, limits and the CLI loop. Read `../../references/card-authoring-templates.md`
only when drafting fields from scratch, `../../references/field-finalization.md`
before writing files, and `../../references/cli-workflow.md` before the
first push. `../../references/talk-example-design.md` and
`../../references/prose-texture.md` matter whenever you write an opening or
a sample: the model copies them, so they must show an ordinary turn.

## Workflow

1. Capture the goal and the mode: draft-only field assembly, a new trial
   card, or a patch to an existing folder. For an existing folder run
   `hearthroom card status <dir>` first and read its `README.md` (the
   dossier: `uiRole`, decisions, rejected directions, evidence by version)
   before changing anything; pull (`card pull <roleId> <dir> --force`) only
   when the site copy is newer and the local files have no unpushed work,
   because `--force` overwrites them.
2. Route the first blocker to its narrow skill before assembling fields,
   unless that packet already exists (`using-hearthroom`).
3. Set `card.json` `type` (`companion`, `story`, `game`, `generator`);
   daily-life, light-setting, heavy-setting and ensemble are overlays.
4. Draft in this order: promise, engine, play, presentation. When packets
   exist, resolve conflicts and assemble; do not fill a missing packet with
   generic prose. While drafting:
   - make the engine legible: what the character wants, what blocks it, what
     they will not do, what changes when the player pushes closer or away,
     and what they ask, reveal or escalate when the player stalls;
   - write speech as rhythm, vocabulary, address terms and tells, plus one
     ordinary-turn line in the character's voice; for a tic you want gone,
     show what they say instead;
   - treat the opening and every sample as the reply the model will copy:
     open below the climax, objects before feelings, whole sentences; at
     least one of them shows an ordinary mid-story turn, never the climax;
   - repair the chosen type directly: a companion needs relationship
     pressure and pacing, a story needs stakes and consequence state, a game
     needs compact state and a turn protocol, a generator needs an artifact
     contract, an ensemble needs distinct wants and voices;
   - for mature or intense premises settle rating, ceiling, escalation,
     refusal style and stop conditions before a provocative opening;
   - write one expected first user message and one second-turn move; if turn
     two is not more interesting than turn one, revise the engine.
5. Continue with `hearthroom-field-finalizer` for the last-mile checks. In
   draft-only mode stop here with the fields.
6. Write the files: `card.json` for the short fields (The card folder in
   `platform-facts.md`), `definition.md`, `welcome.md`, `openings/alt-NN.md`,
   `lorebook.json`, `rules.json`, media under `assets/` (named as Media
   library says), working notes only in `README.md` (the dossier template in
   `card-authoring-templates.md`). When patching, edit only the fields that
   change.
7. Keep the definition an engine (`hearthroom-detail-engineer` for a thin
   biography); move scene-only facts into Lorebook entries with keywords and
   descriptive names, few and short constant entries; keep the output
   contract short with the format exemplar labelled as an example
   (`hearthroom-token-architect` when the opening carries rules or lore).
8. Make the opening playable: who is in motion, where and when the player
   is, what concrete problem is in front of them, one low-friction first
   action, a pull to turn two. Player-side reply paths go in `prologue` when
   they would lengthen the scene.
9. Presentation: declare `uiRole` (`assist` | `core`) and the status
   overhead threshold in `README.md` (`presentation-design.md`, Story
   first). Plain text is the default; ordinary HTML and CSS when a bar, fact
   row, panel or choice set carries play value; reusable layout, status
   panels, themes and choice buttons are built with `hearthroom-sandbox-kit`
   (`pageMode` `sandbox`); unresolved layout goes to
   `hearthroom-presentation-director`.
10. `customInstructions` replaces one default instruction block; change it
    only with play evidence (`hearthroom-instruction-guardrail`).
11. Check, push, validate: `hearthroom card check <dir>`, then
    `hearthroom card push <dir> --validate --json`; fix blockers and push
    again. Validation proves technical readiness, not writing.
12. Render: `hearthroom card render <dir> --json`, then
    `hearthroom-render-review`; `hearthroom card preview <dir>` with play
    replies in `preview/replies.md` is the free check of reply layout.
13. Play, when the author accepts the credit cost:
    `hearthroom play <dir> --new-session -m "…" --allow-spend --json` with
    `hearthroom-chat-simulation` (10–20 turns, a weak and a strong model,
    `--new-session --greeting N` for an alternate opening, `--agent on|off`,
    `--history`; `playtest-loop.md`). One shortcoming per version, compared
    with the previous one.
14. Record the card, validation, render and play results, remaining risks
    and the next action in the dossier and tell the author
    (`cost-and-boundaries.md` for trial-card expiry and `--create`).

## Checks

- No placeholders, unresolved alternatives or working notes in any field.
- The opening ends with the status block when the card has one; the output
  contract's example is an ordinary turn.
- `card check` has no errors; `validate` has no blockers.
- `README.md` carries this version's dossier line (`uiRole`, the decision,
  what was rejected), on a draft too: a folder without one cannot be
  continued by anyone, including you next session.

Continue with `hearthroom-iteration-director` after any validate, render,
play or author-feedback evidence; with `hearthroom-publish-readiness` when
the author asks whether to keep or submit the card.

## Do not

- Do not run `play -m` without `--allow-spend` and the author's acceptance,
  and do not run `card push --create` or submit for review unless asked.
- Do not write rules that decide the player's feelings, consent, actions or
  route.
- Do not copy source wording, names or scene text from inspiration material.
