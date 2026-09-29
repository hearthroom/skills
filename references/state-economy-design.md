# State economy design

Use this reference when a card needs memory or state but nobody has decided
which fields deserve tokens, which should be visible, which hidden, and which
omitted. State economy is a writing decision, not a validation gate.

## How state exists on Hearthroom

There is no separate state schema. State is text the character writes in its
replies under rules in `definition.md`. It becomes visible either as plain
HTML written directly into the reply, or as a compact
plain-text line that a display rule in `rules.json` turns into layout before
display (`$name` reads keys from a first capture shaped `hp::85;;mood::shy`).
The model never sees the rendered result. "Hidden" state is a line the model
writes and a rule removes or restyles; because the model must reproduce it on
every update, keep it compact and its shape stable.

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
- `definition-only`: a rule in `definition.md`, not a runtime value.
- `omit`: decorative, duplicative, unsafe or too costly.

## Status surface contract

A status surface is an update contract, not a meter dump. Keep two to six
fields that help the next action: scene, time or phase, relationship
pressure, risk, resources, clues, route gates, available support.

- A bar-type component only for a single continuous number. Its value is one
  current number; write the change (`+6`, `8 -> 14`) in prose.
- Text, enum, flag, resource, phase, location and availability fields get a
  tag, stat, row or panel type component. Do not invent a `max` to make a
  field look like a meter. `hearthroom-presentation-director` picks the HTML
  shape and whether it lives in the content or in a display rule.
- `definition.md` owns the contract for every kept field: stable key, label,
  allowed values, update trigger, cadence, play effect. `welcome.md` shows
  the first useful surface. `rules.json` holds the transform.

A hidden line drifts over long chats. Give phase, route, clue, risk, location
and relationship pressure a visible surface that still reads well if the
model forgets the line.

## Agency safety

State never stores the player's feelings, consent, loyalty, guilt, desire,
actions, confession, commitment or final route choice. Track what the
character knows, suspects, promised, withheld, offered, lost or unlocked;
what route, clue, resource, place, deadline, debt or boundary changed; what
option is now available, risky, delayed or closed.

## Decorative state

Cut mood meters that do not alter behaviour, trust bars with no unlock or
cost, risk labels that never fire, route badges that lead to the same scene,
stats copied from a genre UI, and fields that restate the definition. When a
meter is attractive, convert it into one concrete consequence or drop it.

## Packet

```text
State packet:
- current request / card shape / state need:
- status surface: needed | not; per field bar | tag | stat | panel | hidden
- kept fields: key, visibility, owner, allowed values, update trigger,
  cadence, character behaviour changed, player options changed, token cost
- omitted fields and why:
- placement: definition.md | welcome.md | rules.json
- agency guardrails:
- verification probes:
- hand-off:
```

## Verification

- every kept field changes future play and has allowed values and a trigger
- the cadence is executable in chat
- visible fields help the next action; the hidden line has no prose
- player feelings and actions are not stored
- decorative meters were removed or converted into consequences
- `hearthroom card render --json` shows the opening's surface with the rules
  applied; one play turn shows a real update
