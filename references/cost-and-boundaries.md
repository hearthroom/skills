# Cost and Boundaries

What toolkit work costs, and where it must stay. Every statement here comes
from `platform-facts.md`.

## What costs credits

- `hearthroom play -m` generates a real turn and spends the signed-in
  account's credits (the author's, during testing) at the provider's model
  rates. It requires `--allow-spend`; `hearthroom wallet` shows the balance.
- An agent-mode turn (`--agent on`) is billed on actual usage, including turns
  that fail or are stopped with `--stop`, so a turn that does more work costs
  more.
- Before running probes, make sure the author asked for play testing or
  understands the cost. Pick probes deliberately; do not replay a whole matrix
  in both agent and normal mode. A standard run is 10–20 turns on a weak and
  a strong model (`playtest-loop.md`); state that cost up front.

## What is free

Pushing, validating, rendering, importing, pulling, and browsing cost nothing
beyond the agent's own usage. Iterate on `card push --validate --json` and
`card render --json` freely before spending a turn.

## Where work stays

- Keep all work on trial cards or the author's private cards.
- A trial card expires three days after its last push; an account holds at
  most five (`--evict` frees the oldest). Trial cards do not appear in the
  site's inventory, but their play link works for the author. This is the
  only place in the toolkit that states it; other files point here.
- `card push --create` makes a real private card. Do it when the author wants
  to keep the card, not by default.
- Never publish or submit on the author's behalf without an explicit request.
  Submission happens on the site and reviews one frozen version; any later
  content change needs its own review.

## Content boundaries

Handle mature, sensitive, or risky themes as card design: make the intended
intensity, agency contract, refusal behaviour, and stop conditions explicit in
`definition.md` so the character stays in character without vague warnings.
Use `boundary-design.md` for the packet. Unresolved boundary ambiguity is a
writing problem even when validation passes.

## Authentication

Sign-in uses a one-time code (`cli-workflow.md`). Passing the author the code
and address is expected; never ask them to paste a token into the
conversation.
