---
name: hearthroom-opening-director
description: Use when a Hearthroom card's opening is weak, such as a greeting-only or hollow opening, a first screen without a scene, unclear first action, a dead second turn, alternate openings, suggested first lines, or making an existing card immediately playable before authoring, render review, a play turn, or publish readiness.
---

# Hearthroom Opening Director

Use this skill when the card idea or the card exists but the first screen does
not start play. The output is an opening packet and a `welcome.md` draft, not a
full card.

## Required references

- `../../references/opening-design.md`: five beats, first reply path, second-turn
  engine, mode recipes, failure repairs.
- `../../references/prose-texture.md`: the opening is the first reply sample
  the model continues from, so its intensity, ellipsis budget,
  objects-before-feelings and distinguishable voices are copied more
  reliably than any style rule in the definition.
- `../../references/platform-facts.md`: `welcome.md` is the opening and
  `openings/alt-NN.md` are alternates (`hearthroom play --greeting N` starts
  from one); `prologue` in `card.json` holds player-side suggested first
  lines, never the character's speech; openings are plain text or plain HTML
  and CSS; the opening limit depends on the card's language, so read
  `tokenBudget.limits` from `hearthroom card push --validate --json`.
- `../../references/agency-design.md` when the player can only watch or every
  reply lands in the same place.
- The shape reference that matches the card when its engine is not coherent:
  `../../references/daily-life-design.md`, `../../references/play-engine-design.md`,
  `../../references/generator-design.md`, `../../references/ensemble-card-design.md`,
  `../../references/boundary-design.md`.

## Workflow

1. Name the failure: greeting-only, lore before action, menu without scene,
   mood with no task, character waiting for the player, no player role, no
   pressure, too long, a second turn that can only restate the premise, or a
   first screen that is already the climax and reads like a template.
2. Ask only for what blocks the opening: player role, card shape, what the
   character wants, place, pressure, content rating.
3. Repair upstream first. Flat daily-life routine: `hearthroom-daily-life-architect`.
   Game card that reads like a manual: `hearthroom-play-engineer`. Generator
   whose intake stalls: `hearthroom-generator-architect`. Ensemble roll call:
   `hearthroom-ensemble-director`. Spectator opening: `hearthroom-agency-designer`.
   Preserve their packets before touching prose.
4. Build the five beats: place and time, character action already happening,
   pressure, why the player matters, reply paths. Plot-driven cards also expose
   an external goal on the first screen or within two turns.
5. Write one expected first player message. Decide whether it and two or three
   alternatives go into `prologue`.
6. Write the character's second-turn move and what it changes.
7. Choose the mode: plain text, or HTML when structure, choices or visible
   state help the first screen. If only layout or HTML justification remains,
   hand off to `hearthroom-presentation-director`.
8. Give a second starting situation its own `openings/alt-NN.md` instead of
   stretching one opening over both.
9. State the token trade: what stays, what moves to `definition.md` or a
   Lorebook entry, what is cut. Then self-review, including the texture
   checks in `prose-texture.md`: the first screen sits at or below four on
   the card's own intensity scale, at most two ellipses, no narrated player
   feelings, objects before adjectives, one line that refuses the mood.

## Output

```text
Opening packet:
- current failure:
- opening promise:
- player role:
- place / time:
- character action already happening:
- pressure:
- player implication:
- reply paths (which go into prologue):
- expected first player message:
- second-turn move and what changes:
- renewed hook:
- state visible on the first screen:
- opening mode: plain | html
- alternate openings:
- token trade:

welcome.md draft:
...

Self-review:
- reply possible in under ten seconds:
- character acts before the player speaks:
- pressure visible:
- two or more reply paths change different things:
- second turn changes state, relationship, risk, route or information:
- player feelings, consent and actions left to the player:
- texture: intensity <= 4, ellipses <= 2, objects before feelings, one dry line:
```

## Hand-off

- `hearthroom-card-author`: write `welcome.md`, `openings/alt-NN.md`,
  `prologue`; then `hearthroom card push --validate --json` and
  `hearthroom card render --json`.
- `hearthroom-chat-simulation`: probe the first two turns with
  `hearthroom play -m "…" --allow-spend --json` (`--greeting N` for an
  alternate) once the author accepts the credit cost.
- `hearthroom-longplay-architect` when the opening works and play dies later.

## Do not

- Do not polish a greeting. Replace it with a scene.
- Do not open on the climax. A first screen at full volume leaves the second
  turn nothing to do but repeat it.
- Do not let choices carry the opening. Each choice must change response,
  information, relationship, state, risk or route.
- Do not put the world bible in the opening.
- Do not decide the player's feelings, consent, actions or commitments.
- Do not write suggested first lines as the character's speech.
- Do not push, render or play from this skill.
