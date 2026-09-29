---
name: hearthroom-state-economist
description: Use when Hearthroom card work must decide which state or memory fields exist, whether each is visible, hidden or a definition-only rule, how it updates, which decorative meters to remove, and how to keep state player-agency-safe before authoring, longplay, presentation, render review, a play turn, or publishing.
---

# Hearthroom State Economist

Use this skill when the question is not "more state" but which state is worth
paying for. The output is a state packet, not final fields and not a layout.

## Required references

- `../../references/state-economy-design.md`: how state exists on Hearthroom,
  keep test, visibility, status surface contract, agency safety.
- `../../references/platform-facts.md`: display rules and `hc-*` components.
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
3. Classify each survivor `visible`, `hidden`, `definition-only` or `omit`.
   There is no separate state schema. State is text the character writes in
   replies, shown directly as `hc-*` components or transformed by a display
   rule in `rules.json`; the model never sees the rendered result.
4. For each kept field write owner, allowed values, update trigger, cadence,
   effect on character behaviour, effect on player options, token cost.
5. Apply agency safety: never store the player's feelings, consent, loyalty,
   guilt, desire, actions, confession or final route choice.
6. If a status surface is wanted, put its contract in `definition.md`: stable
   keys, labels, allowed values, when it updates. A bar only for a single
   current number; text, enum, flag, phase and location fields are tags,
   stats or panels.
7. Place durable rules in `definition.md`, the first surface in `welcome.md`,
   the transform in `rules.json`. Write verification probes and hand off.

## Output

```text
State packet:
- current request / card shape / state need:
- status surface: needed | not; per field bar | tag | stat | panel | hidden
- kept fields: key, visibility, owner, allowed values, update trigger, cadence,
  character behaviour changed, player options changed, token cost
- omitted fields and why:
- placement: definition.md | welcome.md | rules.json
- agency guardrails:
- verification probes (what a play turn should show):
- self-review: every field changes future play, decorative meters gone, player
  feelings not stored, cadence executable, visible state helps the next action,
  hidden line compact and stable
```

## Hand-off

- `hearthroom-longplay-architect` when state mainly serves continuation;
  `hearthroom-play-engineer` when it is a game loop.
- `hearthroom-presentation-director` when only the surface remains; it owns
  `rules.json` and the `hc-*` choice.
- `hearthroom-card-author` to write `definition.md`, then
  `hearthroom card push --validate --json` and `hearthroom card render --json`.
- `hearthroom-chat-simulation` to watch a real update with
  `hearthroom play -m "…" --allow-spend --json`.

## Do not

- Do not invent state because a panel would look richer.
- Do not track mood meters, trust bars without an unlock or cost, risk labels
  that never fire, or route badges that lead to the same scene.
- Do not write a bar value as a range or delta such as `8 -> 14`.
- Do not rely on a hidden line as the only record of state that matters over
  a long chat; give player-facing state a visible surface too.
