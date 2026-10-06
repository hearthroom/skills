---
name: hearthroom-opening-director
description: Use when a Hearthroom card's opening is weak, such as a greeting-only or hollow opening, a first screen without a scene, unclear first action, a dead second turn, alternate openings, suggested first lines, or making an existing card immediately playable before authoring, render review, a play turn, or publish readiness.
---

# Hearthroom Opening Director

Use this skill when the card idea or the card exists but the first screen does
not start play. The output is an opening packet and a `welcome.md` draft, not a
full card.

## Required references

- `../../references/opening-design.md`: the beats (promise paid off, place,
  action, pressure, implication, first action in under ten seconds, voice),
  first reply path, second-turn engine, mode recipes, failure repairs. The
  opening is the free demo that earns the first paid message (L2); funnel
  L0–L3 and "weakest layer first": `../../references/role-card-writing-framework.md`.
- `../../references/prose-texture.md`: the opening is the first reply sample
  the model continues from, so its intensity, ellipsis budget,
  objects-before-feelings and distinguishable voices are copied more
  reliably than any style rule in the definition.
- `../../references/platform-facts.md`: `welcome.md` is the opening and
  `openings/alt-NN.md` are alternates (`hearthroom play --new-session
  --greeting N` starts a conversation from one); `prologue` in `card.json`
  holds player-side suggested first lines, never the character's speech;
  openings are plain text or plain HTML with inline styles (`<style>`,
  `<script>` and author `data-*` are dropped on the sandbox page); the
  opening limit depends on the card's language, so read `tokenBudget.limits`
  from `hearthroom card push --validate --json`. Status block: the canonical
  form and its home are in `../../references/state-economy-design.md`.
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
4. Build the beats: the summary's promise paid off, place and time, character
   action already happening, pressure, why the player matters, one
   low-friction first action, at least one line in the character's own
   voice. Plot-driven cards also expose an external goal on the first screen
   or within two turns. When the card has a status block, the opening ends
   with it.
5. Write one expected first player message. Decide whether it and two or three
   alternatives go into `prologue`. Choices are drafts, not rails: free text
   always works, and the first action may be a button but never only a
   button.
6. Write the character's second-turn move and what it changes. Turn two must
   be better than turn one: it pays off something the first screen planted.
7. Choose the mode: plain text, or HTML when structure, choices or visible
   state help the first screen. If only layout or HTML justification remains,
   hand off to `hearthroom-presentation-director`.
8. Give a second starting situation its own `openings/alt-NN.md` instead of
   stretching one opening over both; an alternate is a different situation,
   never the main opening reworded.
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
- state visible on the first screen (the status block, if any):
- opening mode: plain | html
- alternate openings (each a different situation):
- token trade:
- attention: which rule from this packet joins the top iron rules, and the
  matching line in the final recency checklist (`prompt-attention-architecture.md`):

welcome.md draft:
...

Self-review:
- reply possible in under ten seconds:
- character acts before the player speaks:
- pressure visible:
- two or more reply paths change different things:
- second turn is better than turn one and pays off something planted:
- the summary's promise is on the first screen; one line is in the character's voice:
- player feelings, consent and actions left to the player:
- texture: intensity <= 4, ellipses <= 2, objects before feelings, one dry line:
```

## Hand-off

- `hearthroom-card-author`: write `welcome.md`, `openings/alt-NN.md`,
  `prologue`; then `hearthroom card push --validate --json` and
  `hearthroom card render --json`.
- `hearthroom-chat-simulation`: run the opening in a full probe once the
  author accepts the credit cost. Playtest: 10–20 turns, a weak and a strong
  model, `--new-session` (`--greeting N` for an alternate), one shortcoming
  per version, compared with the previous version (`playtest-loop.md`).
- `hearthroom-longplay-architect` when the opening works and play dies later.

## Do not

- Do not polish a greeting. Replace it with a scene.
- Do not open on the climax. A first screen at full volume leaves the second
  turn nothing to do but repeat it.
- Do not let choices carry the opening. Each choice must change response,
  information, relationship, state, risk or route.
- Do not put the world bible in the opening.
- Agency guardrails: `agency-design.md`.
- Do not write suggested first lines as the character's speech.
- Do not push, render or play from this skill.
