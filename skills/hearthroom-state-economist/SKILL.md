---
name: hearthroom-state-economist
description: Use when Hearthroom card work must decide which state or memory fields exist, whether each is visible, hidden or a definition-only rule, how it updates, which decorative meters to remove, and how to keep state player-agency-safe before authoring, longplay, presentation, render review, a play turn, or publishing.
---

# Hearthroom State Economist

Use this skill when the question is not "more state" but which state is worth
paying for. The output is a state packet, not final fields and not a layout.

## Required references

- `../../references/state-economy-design.md`: how state exists on Hearthroom,
  keep test, visibility (including `volatile`), the canonical status block,
  one owner per value, the overhead ratio, agency safety.
- `../../references/platform-facts.md`: display rules and HTML in openings and replies.
- `../../references/longplay-design.md`, `../../references/play-engine-design.md`,
  `../../references/presentation-design.md` or `../../references/agency-design.md`
  when the blocker is progression, a game loop, the surface itself, or state
  that decides for the player.

## Workflow

1. Say why state is wanted: longplay memory, route consequence, game resource,
   relationship pacing, scenario clue, daily-life habit, a status surface, or
   author confusion.
2. List candidates. Reject decorative meters, duplicated prose and mood-only
   fields.
3. Classify each survivor `visible`, `hidden`, `volatile`, `definition-only`
   or `omit`. State is text the character writes in one `[status]` block at
   the end of each reply, drawn by a display rule and the sandbox kit; the
   model never sees the drawn result.
4. For each kept field write its owner (the model, in the block; or a script,
   in `sdk.save`; never both), allowed values, update trigger, cadence,
   effect on character behaviour, effect on player options, token cost.
   Declare `uiRole` with the archetype packet and the overhead threshold
   (`presentation-design.md`); keep two to six fields.
5. Apply agency safety: never store the player's feelings, consent, loyalty,
   guilt, desire, actions, confession or final route choice.
6. If a status surface is wanted, put its contract in `outputContract` (or
   the definition): stable keys, allowed values, when each updates, and the
   instruction to end every reply with the block; a long card repeats it in
   one short constant Lorebook entry. A bar only for a single current number;
   text, enum, flag, phase and location fields are text, tags, a path or a
   list. The contract's example is the most ordinary turn.
7. Place the block once at the end of `welcome.md` and the transform in
   `rules.json` (built by `hearthroom-sandbox-kit`). Write verification probes
   and hand off.

## Output

```text
State packet:
- current request / card shape / state need:
- uiRole: assist | core (and the overhead threshold)
- status surface: needed | not; per field bar | text | tags | path | list | hidden | volatile
- kept fields: key, visibility, owner (model | script), allowed values,
  update trigger, cadence, character behaviour changed, player options
  changed, token cost
- omitted fields and why:
- placement: outputContract (or definition.md) | constant entry | welcome.md | rules.json
- agency guardrails:
- attention: which rule from this packet joins the top iron rules, and the
  matching line in the final recency checklist (`prompt-attention-architecture.md`):
- verification probes (what a 10–20-turn run on a weak model should show):
- self-review: every field changes future play, decorative meters gone, player
  feelings not stored, cadence executable, visible state helps the next action,
  hidden line compact and stable
```

## Hand-off

- `hearthroom-longplay-architect` when state mainly serves continuation;
  `hearthroom-play-engineer` when it is a game loop.
- `hearthroom-presentation-director` when only the surface remains;
  `hearthroom-sandbox-kit` builds the rules from the schema.
- `hearthroom-card-author` to write the contract and the opening, then
  `node scripts/check-card.mjs <dir>`, `hearthroom card push --validate --json`
  and `hearthroom card render --json`.
- `hearthroom-chat-simulation` to watch real updates. Playtest: 10–20 turns,
  a weak and a strong model, `--new-session`, one shortcoming per version,
  compared with the previous version (`playtest-loop.md`); report the
  overhead ratio with `check-card.mjs --replay`.

## Do not

- Do not invent state because a panel would look richer.
- Do not track mood meters, trust bars without an unlock or cost, risk labels
  that never fire, or route badges that lead to the same scene.
- Do not write a bar value as a range or delta such as `8 -> 14`, and do not
  write `<status>`: angle-bracket markers are stripped.
- Do not keep the same value in the block and in a script's save.
- Agency guardrails: `agency-design.md`.
- Do not rely on a hidden line as the only record of state that matters over
  a long chat; give player-facing state a visible surface too.
