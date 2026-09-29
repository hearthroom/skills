---
name: hearthroom-chat-simulation
description: Use when a Hearthroom trial or private card needs a playtest through hearthroom play, realistic probe design, agent-mode coverage, transcript triage, behavior repair mapping, or a decision on whether another paid turn is worth its credits after validation passes.
---

# Chat simulation

Use this skill to test a card's behavior through real turns. A simulation is
`hearthroom play <dir> -m "…" --allow-spend --json`, one turn at a time. The
loop: design realistic probes, get consent for the cost, run the turns, judge
the replies with the rubric, patch from evidence, decide whether another turn
is worth it.

There is no report command. The agent is the judge.

## Required references

Read `../../references/playtest-loop.md` first for probes, closure, format
stability, Lorebook reachability, triage and the repair packet. Read
`../../references/platform-facts.md` for the `play` flags, costs and how
Lorebook entries reach the model in normal and agent turns. Read
`../../references/cost-and-boundaries.md` before the first turn and
`../../references/quality-rubric.md` for the playtest checks.

Read when the transcript points there: `../../references/card-diagnosis.md`
for several failures at once, `../../references/character-core-design.md` for
a generic persona, `../../references/world-engine-design.md` for lore dumps or
decorative factions, `../../references/play-engine-design.md` for lost state
or inert resources, `../../references/generator-design.md` for advice-only
helpers, `../../references/voice-calibration.md` for voice drift or ensemble
blur, `../../references/opening-design.md` for the first reply path,
`../../references/longplay-design.md` for continuation failures,
`../../references/agency-design.md` for spectator play or agency takeover,
`../../references/boundary-design.md` for mature or consent-sensitive
behavior, and `../../references/token-economy.md` for repeated setup.

## Workflow

1. Confirm the folder was pushed recently: `hearthroom card push <dir>
   --validate --json` with no `blockers`. A trial card expires three days
   after its last push. If blockers exist, patch and push before spending.
2. State the cost stance. Every `play -m` turn spends the author's credits at
   the model's rate; agent mode turns bill on actual usage, including failed
   or stopped turns. If the author has not already asked for a playtest,
   explain this and get consent before the first turn. A test plan alone
   sends nothing.
3. Write the playtest plan before the first turn:

   ```text
   Playtest plan:
   - card folder:
   - target risks: opening hook | agency | continuity | longplay | boundary | state | Lorebook reachability | format stability
   - probe scope: narrow spot-check | behavior-complete
   - probes: numbered, real player wording
   - agent mode: which probes run with --agent on, which with --agent off, which in both
   - alternate opening: --greeting N if one is under test
   - expected healthy behavior:
   - patch triggers: what reply evidence changes the definition, opening, Lorebook, rules or custom instructions
   - model: chosen with the author from hearthroom models
   - cost stance: accepted | wait for confirmation | plan only
   ```

   Behavior-complete acceptance runs the eight-probe matrix from
   `playtest-loop.md`. A spot-check is labeled as not behavior-complete.
4. Run one turn: `hearthroom play <dir> -m "<probe>" --allow-spend --json`
   with `--model`, and `--agent on` or `--greeting N` when the plan says so.
   Read the reply before sending the next probe. Use `--history` when the
   conversation is long and `--stop` when the author stops waiting.
5. Judge each reply against the playtest checks: in character; desire,
   contradiction and boundary visible under trust, resistance, passivity and
   refusal; the scene moves; the last visible block gives the player a
   concrete next move; the player's feelings, consent and actions are never
   narrated; refusal, questioning and cooperation produce distinct responses;
   tone matches the rating; no system leak.
6. Apply closure as a gate. One reviewed reply with no next move fails the
   run even when later turns pass. Patch the definition and opening so sparse,
   normal, off-path and boundary replies all close with a playable move.
   Add the card-type checks: a second turn that is stronger than the setup;
   a generator that produces a usable artifact from defaults, keeps its
   schema and remembers the last version; a game card whose state updates
   every turn and whose resources and failures change access, cost or risk;
   an ensemble whose speakers stay distinguishable and never drown the
   player; a world-heavy card that answers lore questions through objects,
   demands, witnesses or route offers instead of a dump; a mature card whose
   pressure stays tied to player choice, pacing and stop conditions.
7. For the long arc (8 to 12 turns, 10 or more when structure matters),
   check macro-progression and format stability: did location, route, clue,
   risk or obligation move, and do later replies still contain the markers
   `rules.json` needs? Choices usually drop first.
8. When the card depends on Lorebook material, run at least one
   Lorebook-dependent probe in both `--agent` modes on the same card and
   compare what each reached. A keyword gap needs keywords or `constant`; a
   naming gap needs descriptive entry names.
9. Reply layout is only visible on the play page. Open the link the CLI
   prints when layout is part of acceptance, or record "reply display not
   checked".
10. Map each failure to a patch target with the triage table. Several
    failures at once: hand off to `hearthroom-card-doctor` before choosing
    patches.
11. Return the playtest repair packet from `playtest-loop.md` before editing
    any file or paying for another turn. Include the model, agent mode and
    turns run, and the credits spent when the output reports them.
12. Patch only what the transcript proves: usually `definition.md` or
    `welcome.md`, sometimes `lorebook.json`, `rules.json` or custom
    instructions (which replace one default block, not append). Push with
    `--validate --json` after structural patches.
13. Replay only when the patch changes behavior, boundaries, state, voice or
    first-turn flow, and the author accepts the cost. Stop after two failed
    loops on one symptom and ask for a design direction.

## Hand-off

Give the next skill the repair packet, not the transcript.

- `hearthroom-card-doctor` when several failures interact.
- `hearthroom-collaboration-director` when the author wants to compare patch
  directions or adjust taste before another paid turn.
- The narrow skill when one layer is clear: `hearthroom-agency-designer`,
  `hearthroom-opening-director`, `hearthroom-longplay-architect`,
  `hearthroom-voice-director`, `hearthroom-boundary-designer`,
  `hearthroom-token-architect`, `hearthroom-play-engineer`,
  `hearthroom-generator-architect`, `hearthroom-world-engineer`,
  `hearthroom-relationship-architect`, `hearthroom-daily-life-architect`,
  `hearthroom-ensemble-director` or `hearthroom-character-core`.
- `hearthroom-card-author` when the author wants the patch applied and
  pushed.
- `hearthroom-publish-readiness` when the accepted scope passes and the
  author wants the card kept.

## Do not

- Do not send a turn before the author has accepted the cost, and never when
  the request was for a plan.
- Do not send the next probe before reading the current reply.
- Do not write probes as evaluator instructions; write what a player would
  type.
- Do not claim behavior-complete status from a spot-check.
- Do not report a Lorebook-dependent card as fully tested after one `--agent`
  mode; say which mode is untested.
- Do not accept a run on the strength of later turns when one reviewed reply
  had no next move.
- Do not hard-code a model; choose from `hearthroom models` with the author.
- Do not paste raw transcripts into packets or shared files; paraphrase the
  evidence that justifies the weakest layer.
