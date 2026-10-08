# Platform numbers repeated outside the facts page

Limits, crop ratios, pixel sizes, event names and CLI flags are stated once,
in `references/platform-facts.md`. Other files point there and do not repeat
the numbers.

## Why

The platform changes. A number copied into a craft guide goes stale silently,
and then two files disagree and an agent has to guess which one is current.
The facts page is checked against the chat page's source and the CLI manual;
nothing else is. A craft file says what the number means for the card ("keep
the title and the face inside every crop") and names the facts section.

## Where it came up

- Cover crop percentages and hover zoom written into the visual identity
  guide, commits `ec7c816`, `9eabf37`.
- "Review the feedback: one owner per fact", commit `c1b794b`, after the
  same facts had spread to several files.
