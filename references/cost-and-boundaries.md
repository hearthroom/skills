# Cost and Boundaries

What toolkit work costs, and where it must stay. Every statement here comes
from `platform-facts.md`.

## What costs credits

- `hearthroom play -m` generates a real turn and spends the signed-in
  account's credits (the author's, during testing) at the provider's model
  rates. It requires `--allow-spend`; `hearthroom wallet` shows the balance.
- Ordinary and agent-mode turns (`--agent on`) may still cost credits when
  stopped or failed. Actual-usage charges and platform-error waivers are
  described in `platform-facts.md`, CLI commands.
- Before running probes, make sure the author asked for play testing or
  understands the cost. Pick probes deliberately; do not replay a whole matrix
  in both agent and normal mode. A standard run is 10–20 turns on a weak and
  a strong model (`playtest-loop.md`); state that cost up front.

## What is free

Pushing, validating, rendering, importing, pulling, and browsing cost nothing
beyond the agent's own usage. Iterate on `card push --validate --json` and
`card render --json` freely before spending a turn.

## Where work stays

- Work on trial cards or cards the author has authorized you to edit. For unlisted cards, anyone with the link can play the latest saved content, including changes that have not passed review. Follow the author's existing editing authorization.
- A trial card expires three days after its last push; an account holds at
  most five (`--evict` frees the oldest). Trial cards do not appear in the
  site's inventory, but their play link works for the author. This is the
  only place in the toolkit that states it; other files point here.
- `card push --create` makes an owned card, unlisted by default. Run it only when the author asks to keep a new card. Creating it does not submit it for review or add it to public listings; later pushes preserve its visibility.
- Do not submit for review or change visibility automatically.
  Review freezes one version; later content changes need their own review.

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
