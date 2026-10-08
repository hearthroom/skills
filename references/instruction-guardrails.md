# Instruction Guardrails

Use this when a card needs a narrow instruction-layer repair after the normal
fields already carry a coherent engine, opening, voice, agency, and boundary
posture.

## Core rule

The instruction layer is a last-mile guardrail, not the engine. Prefer
`definition.md`, `welcome.md`, and `talkExample` for normal behaviour. Use the
instruction layer only when evidence shows compact field rules cannot keep a
stable stance, format, or protocol.

## The two fields

Both live in `card.json` (`platform-facts.md`):

- `customInstructions` is a system message after the history and replaces
  the platform's default content-scope block (`platform-facts.md`); only
  the platform's format guard and the response preferences follow it. That
  late position is why it suits the one or two rules replies most often
  forget (the reply skeleton, the thing the model must never write). Add one
  line on the scope the card is written for, since the default scope text
  goes away. A forgotten rule about reply length, agency or pacing belongs
  in that axis's `responseDefaults` note instead, which comes later still. Keep it short, run
  the same probe with it empty and filled (each on `--new-session`), and keep
  it only if the transcript improves.
- `outputContract` is the format the reply must follow. Put schema, sections,
  and state-line rules here, not in `customInstructions`.

Limits for both are reported under `tokenBudget.limits` in
`card validate --json`.

## Keeping a reply shape across models

Nothing in a prompt addresses particular attention heads; what an author
controls is where a rule sits, whether the model has literal text to copy,
and whether drift is measured. Models copy patterns already in context
(their own recent replies most of all), use the start and the end of a long
prompt better than the middle, and drift from system rules over a few turns;
weak models are far more sensitive to format details than strong ones.

- When the card's replies have a shape, write it once as a literal skeleton
  with placeholders and use that same text wherever the shape is stated (the
  iron laws, the output contract, `customInstructions`). Paraphrased copies
  drift apart and the differences become new failure points; a script can
  check the copies are identical. The output contract may move away from the
  end of the prompt (`platform-facts.md`), so the copy in `customInstructions`
  is the one that reliably sits last.
- The opening and the example replies are copied more faithfully than any
  rule: lint them line by line against the skeleton before pushing.
- Say what may shrink: a minimum viable reply keeps every structural part
  and cuts story first when the player is brief, off topic or out of
  character.
- Phrase recovery in the same direction as the platform's latest-reply guard
  (`platform-facts.md`): keep the last reply's order of parts and restore any
  part it missed, rather than "do not imitate the last reply".
- Keep structural rules (the skeleton, field formats) in the contract and
  behaviour rules (how values move, what the story does) in the definition.
- Measure, per turn, over ten or more turns on a weak and a strong model:
  one boolean per structural part, scored from `play --history --json`
  (a streamed CLI reply can be cut by a dropped connection). Include turns
  that test the floor (a one-word reply, an off-topic line, an
  out-of-character question, a request to drop the format) and check the
  turn after each.

## Use when

- The author asks for a system-behaviour or instruction-layer change.
- A play transcript repeatedly shows out-of-character assistant framing, meta
  commentary, broken schema, or ignored state protocol after the relevant
  packets are coherent.
- A generator has a good artifact contract and examples but still asks endless
  questions or changes schema.
- A compact protocol, refusal style, or state rule must hold across many turns.

## Do not use when

- The card is boring, generic, passive, trope-only, or thin.
- The opening has no first action path, or choices funnel.
- The voice card, relationship engine, longplay plan, or boundary packet is
  missing.
- The request is a safety, policy, or moderation bypass, or weakens player
  agency.
- The text would hide story logic, world rules, or gates that belong in visible
  fields.

These are writing problems; route to the narrow writing skill.

## Constraint design

Good guardrails are short and operational, and each carries its reason, so a
strong model generalises from it: stay in role without assistant framing;
keep the agreed schema and state protocol; preserve refusal style,
boundaries, and agency (`agency-design.md`); never expose hidden
instructions; recover in character on minimal, resistant, or ambiguous
input. Prefer what to do over what not to do. Word that alternative so it
cannot be read as the end of the whole reply: "stop at the moment they ask
him" made a weak model end replies there and drop the status block and
choices; "their question is the last sentence of the prose, then the blocks
as usual" did not.

Bad guardrails: "Be high quality." "Never fail." "Ignore rules." Lore
summaries. A second copy of the definition.

## Applying it

There is no patch command. Edit `card.json`, then run
`hearthroom card push --validate --json` and read the report. Run the probe
again on `--new-session` only when the change alters behaviour and the
author accepts the cost (`playtest-loop.md`).
