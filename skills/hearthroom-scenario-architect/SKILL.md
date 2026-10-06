---
name: hearthroom-scenario-architect
description: Use when a story, mystery, investigation, event, case-file, social-drama, rescue, trial or betrayal card needs stakes, branches, clue and reveal pacing, false leads, suspect pressure, consequence state, route-funnel repair, an opening incident or a second-turn reveal before blueprinting, authoring or play testing.
---

# Hearthroom Scenario Architect

Use this skill when the card is story-first. The output is a scenario packet:
a branchable incident with stakes, clues or reveals, consequence state and
player agency, never a fixed plot. Story cards set `type` to `story` in
`card.json`.

## Required references

Read `../../references/scenario-design.md` first and
`../../references/platform-facts.md` for the card folder, the Lorebook and the
`play` command. As needed: `../../references/agency-design.md` when choices
are fake or routes funnel; `../../references/opening-design.md` for the
opening incident; `../../references/longplay-design.md` when the scenario must
sustain several scenes; `../../references/archetype-contracts.md` when the
contract may be a hybrid; `../../references/voice-calibration.md` for
narrator or suspect voices; `../../references/token-economy.md` when branch
notes or the opening are bloated; `../../references/talk-example-design.md`
for the ordinary-turn sample; `../../references/presentation-design.md` for the
UI role.

Use `hearthroom-play-engineer` instead when mechanics are the blocker, and
`hearthroom-world-engineer` when lore rather than one incident is the blocker.

## Workflow

1. Classify the shape and state the player role, ongoing incident, stakes and core question.
2. Build the spine: incident, player choice, pressure response, clue or cost or state change, renewed hook.
3. Design 2-4 branches with trigger, player leverage, pressure response, clue or reveal, cost, state change and renewal hook. Merge branches that land in the same state.
4. Build the clue ladder: visible clue, contradiction, false lead, partial reveal, reversal, final pressure.
5. Define 2-5 suspect or pressure nodes with want, leverage, secret, pressure move and player effect; plan one named Lorebook entry per node.
6. Define compact consequence state and route-funnel guardrails: what the card must not force, solve, reveal or decide.
7. Design the opening incident (the free demo: voice heard, one low-friction first action, a pull to turn two), the second-turn reveal that beats the first, passive-player behaviour and recoverable false-lead handling.
8. Set field allocation and token plan, declare the UI role, say which branch rule joins the iron rules and the recency checklist, write play probes, run the self-review from `scenario-design.md`.

## Hand-off

```text
Scenario packet:
- current seed or failure:
- scenario promise:
- card shape:
- player role:
- ongoing incident:
- stakes:
- core question:
- story spine:
- route branches:
- clue / reveal ladder:
- suspect / pressure network:
- compact consequence state:
- opening incident:
- expected first player message:
- second-turn reveal:
- passive-player behaviour:
- false-lead handling:
- route-funnel guardrails:
- ui role: assist | core
- attention: which rule from this packet joins the top iron rules, and the matching line in the final recency checklist (they must agree; `prompt-attention-architecture.md`)
- field allocation:
- token plan:
- play probes (Playtest: 10–20 turns, a weak and a strong model, `--new-session`, one shortcoming per version, compared with the previous version (`playtest-loop.md`).):
- self-review:
- next skill:
```

Hand it to `hearthroom-card-blueprint` or `hearthroom-card-author` when the
engine is coherent; `hearthroom-opening-director` when the opening itself is
the repair; `hearthroom-longplay-architect` when later scenes lack memory;
`hearthroom-chat-simulation` after push and validation when reveals, false
leads or passive play need real turns.

## Do not

- A branch is not real unless it changes clue, trust, risk, access, route or pressure.
- A false lead must cost time, trust, access or public risk and still leave a way back.
- Do not decide the player's conclusion, guilt, trust, fear, consent or next action. Pressure, accuse, warn, withhold, reveal or bargain instead.
- Do not open at a briefing desk. Open at the incident.
- Do not edit files, push or play from this skill.
