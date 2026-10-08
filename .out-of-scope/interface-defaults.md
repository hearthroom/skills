# Interface parts as defaults

No skill makes a status bar, a dock, a settings drawer or a choices block the
default for every card, and no rule requires choices after every reply.

## Why

The story comes first. Each interface part has to say which job it does
(memory, readable choices, pacing, a world that reacts, orientation) and what
it costs the reply in words. A card that never needed a panel is worse with
one. The player's own words are the first-class input; choice buttons are a
draft the player can edit, not a rail.

## Where it came up

- The rewrite put story first and made every card declare `uiRole`, commit
  `32db74c`.
- In the slimming eval, the older skills turned "end every reply with
  [choices]" into an iron law for a card that did not need it, which is the
  default players had complained about, commit `22cafcd`.
