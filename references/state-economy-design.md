# State economy design

Use this reference when a card needs memory or state but nobody has decided
which fields deserve tokens, which should be visible, which hidden, and which
omitted. State economy is a writing decision, not a validation gate.

## How state exists on Hearthroom

The platform keeps no state schema for the model. State is text the character
writes in its replies under a contract the card gives it, drawn on screen by a
display rule in `rules.json` and the sandbox kit; the model never sees the
drawn result. A script may keep its own values in `sdk.save` (see "One owner
per value"). "Hidden" state is a line the model writes and a rule removes;
because the model must reproduce every field on every update, keep the block
compact and its shape stable.

State tokens are taken from the story: every field costs characters in every
reply that could have been prose. The status overhead ratio (characters of the
status and choices blocks over characters of the reply) is measured on real
replies (`check-card.mjs --replay`) and kept under the card's declared
threshold (`statusOverheadThreshold:` in `README.md`; 15% by default for a
`uiRole: assist` card; a `core` card declares its own with a reason). Story
first, `uiRole`, the five jobs of UI and the overhead ratio:
`presentation-design.md`.

## When to use

The draft has a panel, memory block, hidden line, meters, route labels or
counters that may be too big; the card forgets choices or repeats setup; an
engine packet mentions state without update rules; a field exists because it
looks useful. Route away when only layout remains (presentation), the job is
full route design (longplay), it is resources and turn protocol (play
engine), or the character is deciding for the player (agency first).

## Keep test

Keep a field only if it changes future character behaviour, player options,
access, route, clue, risk, cost or resource, relationship pressure or
boundary handling, or a promise, debt, taboo or return-later hook. Otherwise
omit it.

## Visibility

- `visible`: helps the player's next action.
- `hidden`: needed for future updates, but showing it would spoil, clutter or
  turn the card into a dashboard.
- `volatile`: a scene-only value with no fallback; when the model stops
  writing it, it disappears (location of the moment, the current threat).
  Never for anything the player must not lose.
- `definition-only`: a rule in `definition.md`, not a runtime value.
- `omit`: decorative, duplicative, unsafe or too costly.

## Status surface contract

A status surface is an update contract, not a meter dump. Keep two to six
fields that help the next action: scene, time or phase, relationship
pressure, risk, resources, clues, route gates, available support. This is the
toolkit's single number; other references defer to it.

The model ends every reply with one status block:

```
[status]
hp: 72/100
mood: wary
location: Harbor > North pier
[/status]
```

Square brackets (the sandbox sanitizer strips unknown angle-bracket tags, and
a script that reads the bubble later would never see `<status>`), one
lowercase `key: value` per line, at the end of the reply, after the prose.
The keys, their allowed values, when each changes and the instruction to end
every reply with the block live in `card.json` `outputContract` (or the
definition); a long card repeats them in one short constant Lorebook entry.
`welcome.md` ends with the block once, so the first screen shows it and the
model has a sample to copy. A display rule and the sandbox kit
(`sandbox-kit.md`) draw the block as a panel inside the bubble; the model
never sees the drawn result (render rules are not generation rules). A single
line `hp::85;;mood::shy` is also accepted, so a card without scripts can draw
the block with `$hp` in a plain rule; teach the multi-line form.

- A bar only for a single continuous number (`72/100`, `40%`). The block
  carries the current value; show the change as a story consequence, not as
  arithmetic in the narration.
- Text, enum, flag, resource, phase, location and availability fields are
  text, tags, a path or a key-value list; the kit's type ladder draws them
  from the value's shape (`assets/sandbox-kit/README.md`). Do not invent a
  `max` to make a field look like a meter.
- The output contract's example is the most ordinary turn, in this block
  format; `hearthroom-presentation-director` decides what is drawn and
  `hearthroom-sandbox-kit` builds it.

A meter that measures a contest (control, suspicion, favour) needs signed
movement in the contract: how far each kind of player move pushes it and
when the other side pulls it back. With only "rises when the player
resists", models move it one way and it reaches the end in a few turns.

A hidden line drifts over long chats. Give phase, route, clue, risk, location
and relationship pressure a visible surface that still reads well if the
model forgets the line.

## One owner per value

The model owns a value if it is in the block; a script owns it if it lives in
`sdk.save` (badges, unlocks across conversations, preferences); never both,
because the model's copy rewinds with the conversation and the script's does
not. A narrated number and a stored number drift apart on the first rewind.

## Agency safety

State never stores the player's feelings, consent, loyalty, guilt, desire,
actions, confession, commitment or final route choice. Track what the
character knows, suspects, promised, withheld, offered, lost or unlocked;
what route, clue, resource, place, deadline, debt or boundary changed; what
option is now available, risky, delayed or closed. Agency guardrails:
`agency-design.md`.

## Decorative state

Cut mood meters that do not alter behaviour, trust bars with no unlock or
cost, risk labels that never fire, route badges that lead to the same scene,
stats copied from a genre UI, and fields that restate the definition. When a
meter is attractive, convert it into one concrete consequence or drop it.

## Packet

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
  matching line in the final recency checklist (they must agree;
  `prompt-attention-architecture.md`)
- verification probes:
- hand-off:
```

## Verification

- every kept field changes future play and has allowed values and a trigger
- the cadence is executable in chat
- visible fields help the next action; the hidden line has no prose
- player feelings and actions are not stored
- decorative meters were removed or converted into consequences
- each value has one owner
- `node scripts/check-card.mjs <dir>` reports no marker the model is never
  told to write; `hearthroom card render --json` shows the opening's surface
  with the rules applied; the offline preview or the play page shows the
  panel drawn (`card render` runs no scripts)
- read the opening and one reply with rules off: for `assist` nothing is
  lost; for `core` every value the player needs is still in the text
- Playtest: 10–20 turns, a weak and a strong model, `--new-session`, one
  shortcoming per version, compared with the previous version
  (`playtest-loop.md`); the block is intact at the last turn
