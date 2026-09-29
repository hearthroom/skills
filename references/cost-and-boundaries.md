# Cost and Boundaries

What toolkit work costs, and where it must stay. Every statement here comes
from `platform-facts.md`.

## What costs credits

- `hearthroom play -m` generates a real turn and spends the player's credits at
  the provider's model rates. It requires `--allow-spend`.
- An agent-mode turn (`--agent on`) is billed on actual usage, including turns
  that fail or are stopped with `--stop`, so a turn that does more work costs
  more.
- Before running probes, make sure the author asked for play testing or
  understands the cost. Pick probes deliberately; do not replay a whole matrix
  in both agent and normal mode.

## What is free

Pushing, validating, rendering, importing, pulling, and browsing cost nothing
beyond the agent's own usage. Iterate on `card push --validate --json` and
`card render --json` freely before spending a turn.

## Where work stays

- Keep all work on trial cards or the author's private cards.
- A trial card expires three days after its last push; an account holds at
  most five (`--evict` frees the oldest). Trial cards do not appear in the
  site's inventory, but their play link works for the author.
- `card push --create` makes a real private card. Do it when the author wants
  to keep the card, not by default.
- Never publish or submit on the author's behalf without an explicit request.
  Submission happens on the site and reviews one frozen version; any later
  content change needs its own review.

## Content boundaries

Handle mature, sensitive, or risky themes as card design: make the intended
intensity, agency contract, refusal behavior, and stop conditions explicit in
`definition.md` so the character stays in character without vague warnings.
Use `boundary-design.md` for the packet. Unresolved boundary ambiguity is a
writing problem even when validation passes.

## Authentication

`hearthroom auth login` once, or `HEARTHROOM_TOKEN` for unattended runs. Do not
ask the author to paste a token into the conversation.
