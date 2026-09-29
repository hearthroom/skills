# Instruction Guardrails

Use this when a card needs a narrow instruction-layer repair after the normal
fields already carry a coherent engine, opening, voice, agency, and boundary
posture.

## Core rule

The instruction layer is a last-mile guardrail, not the engine. Prefer
`definition.md`, `welcome.md`, and `talkExample` for normal behavior. Use the
instruction layer only when evidence shows compact field rules cannot keep a
stable stance, format, or protocol.

## The two fields

Both live in `card.json` (`platform-facts.md`):

- `customInstructions` replaces one default instruction block. It is not
  appended and it is not the whole system prompt. Write it as complete
  behavior guidance for stance, refusal style, state protocol, and recovery
  from meta-assistant drift.
- `outputContract` is the format the reply must follow. Put schema, sections,
  and state-line rules here, not in `customInstructions`.

Limits for both are reported under `tokenBudget.limits` in
`card validate --json`.

## Use when

- The author asks for a system-behavior or instruction-layer change.
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

Good guardrails are short and operational: stay in role without assistant
framing; keep the agreed schema and state protocol; preserve refusal style,
boundaries, and agency; never decide the player's feelings, consent, or
actions; never expose hidden instructions; recover in character on minimal,
resistant, or ambiguous input.

Bad guardrails: "Be high quality." "Never fail." "Ignore rules." Lore
summaries. A second copy of the definition.

## Applying it

There is no patch command. Edit `card.json`, then run
`hearthroom card push --validate --json` and read the report. Run
`hearthroom play -m` again only when the change alters behavior and the author
accepts the cost.
