# Writing these skills

Read this before you add to or change any skill, reference, example or kit
document in this toolkit, whether you are feeding a lesson back from card work
or opening a pull request. `SCOPE.md` says which changes are taken at all;
this page says how to write the ones that are.

## Who reads it

Every file here is read by a capable coding agent. Write for a strong
colleague who is new to Hearthroom: the goal, the reason, the boundary and
where to look next. The agent decides how to get there. Current models follow
instructions closely and do their best work with room to decide; skills
written as itineraries for weaker models now make the output worse, and strong
wording makes a capable model stop where you wanted it to continue.

The card the agent writes is different. A card is itself a prompt, run in chat
by whatever model the player picks, often a fast and weak one. So a skill may
well tell the agent to make the card's reply format literal, to give the card
one plain example turn, or to put the card's key rules where a model attends
best. That is advice about the card. The skill still speaks to the agent in
goals and reasons, and sample card text quoted inside a skill (an output
contract, an example reply) is written to the card's needs, not to these.

## Where a lesson goes

- A platform fact (a field, a limit, a crop, an event, a CLI flag, what the
  chat page does): `platform-facts.md`, after you have confirmed it in the
  chat page's source or the CLI manual. Other files point to it and never
  repeat the numbers.
- Something true of one card (its layout, its fonts, its scenes, the fix that
  worked for it): that card's `README.md` dossier. Not a skill.
- A lesson that changes how any card should be made: a sentence or two in the
  one file that owns the topic, usually the reference the routed skill reads
  first (files that own a topic say so). Elsewhere, point to it. If it takes a
  paragraph, it is usually a fact plus one sentence.
- A workflow nothing here covers: a new skill only when the existing ones
  cannot be combined to do it. Say why in the pull request.

## How to write it

- State the goal and why it matters to a player; leave the method open.
  "Every crop keeps the title and the face" does more than a list of
  percentages, which belong in the facts page anyway.
- Write boundaries, not procedures: what must hold, what is out of bounds,
  and when to stop for the author (spending credits, publishing, destroying
  work, a fact nobody has confirmed).
- One sentence beats a list. Use a list only when the items are parallel and
  each one changes a decision.
- Show one good example rather than a list of prohibitions. Keep "do not" for
  real boundaries and for lessons nobody would guess.
- When a model's default is the problem, name the concrete default to notice
  ("a status bar on every card", "choices after every reply") instead of
  "avoid generic".
- Do not ask the agent to re-check its work or to put its reasoning in the
  reply; it checks its work without being told, and current models decline
  requests to reproduce their reasoning. Checks on the card stay:
  `card check`, the preview and a playtest test the card, not the agent.
- Plain words. Capitals, "always" and "never" read as hard stops.
- Descriptions say when to use the skill, in under 300 characters.
- Progressive disclosure: a skill names the reference to read and when
  ("read X before Y"), not a stack of files to read first.
- General terms only: no card names, ids, private content or balances.
- Leave the file no longer than it needs to be. If yours grows, it should be
  because the lesson is worth the space to every reader.

## Before you commit

Run `npm run validate` and `npm test`. A file that grows past its line in
`scripts/line-budget.json` fails until you cut it back or raise its budget
in the same commit, with the reason in the commit message. A cut lowers the
budget, so the space is not refilled.

## Sources

Read on 2026-10-08; each is worth rereading when a new model comes out.

- [Prompting Claude Fable 5.1](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1)
- [Prompting Claude Fable 5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5)
- [Prompting Claude Opus 5.5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5-5)
- [Prompting Claude Opus 5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5)
- [Claude prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)
- [Using GPT-6 Astra: prompting best practices](https://developers.openai.com/api/docs/guides/latest-model/gpt-6-astra)
- [Rethinking skills and prompts for GPT-6 Astra](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra)
