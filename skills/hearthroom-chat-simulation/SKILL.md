---
name: hearthroom-chat-simulation
description: Use when a pushed card needs real turns through hearthroom play (probe design, agent-mode coverage, judging a transcript, mapping failures to a patch, deciding whether another paid turn is worth its credits), or when the author says "test it", "does it work" or "play a few rounds".
---

# Chat simulation

Test a card's behaviour through real turns, because nothing else shows
whether it reacts, remembers, creates pressure and leaves the player a move.
A simulation is `hearthroom play <dir> --new-session -m "…" --allow-spend
--json`, one turn at a time, 10–20 turns per probe set, on a weak model (the
format floor) and a strong model (emergence). There is no report command;
you are the judge.

## Required references

Read `../../references/playtest-loop.md`: it is the standard (probes,
closure, format stability, Lorebook reachability, triage, the repair
checklist). Read `../../references/cost-and-boundaries.md` before the first
turn. Read a craft reference only when the transcript points there
(`card-diagnosis.md` for several failures, `character-core-design.md`,
`world-engine-design.md`, `play-engine-design.md`, `voice-calibration.md`,
`opening-design.md`, `longplay-design.md`, `agency-design.md`,
`boundary-design.md`, `token-economy.md`).

## Workflow

1. Confirm the folder was pushed recently with no `blockers`, and that
   `card.json` has `language` (without it the provider replies in English).
2. State the cost stance: every `play -m` turn spends the author's credits,
   agent-mode turns bill on actual usage including stopped ones. Get consent
   before the first turn unless the author already asked for the playtest.
3. Plan before the first turn and keep it in the dossier: target risks, probe
   scope (spot-check or behaviour-complete), the probes in real player
   wording, which run with `--agent on`, the alternate opening if any, the
   two models, whether the previous version's probe set is reused.
4. Start each independent probe set and each retest with `--new-session`
   (`--greeting N` only takes effect with it). Read each reply before
   sending the next probe; `--history` for long conversations, `--stop` when
   the author stops waiting.
5. Judge each reply with the playtest checks: in character; desire,
   contradiction and boundary visible under trust, resistance, passivity and
   refusal; the scene moves; the player can tell what they could do next and
   has a reason to; the player's feelings, consent and actions are never
   narrated; tone matches the rating; no system leak. Turn one: would a real
   player send this first paid message? Turn two: is it better? Did
   something accumulate?
6. Closure is a gate: one reviewed reply that leaves the player with no move
   fails the run. Add the card-type checks from `playtest-loop.md` (second
   turn stronger than the setup, a generator's artifact, a game's state and
   costs, an ensemble's distinct speakers, a world card's lore through
   action, a mature card's pressure tied to choice).
7. Over the long arc check macro-progression and format stability (do later
   replies still carry the markers `rules.json` needs; choices drop first)
   and measure the status overhead against the dossier's threshold
   (`hearthroom card check --replay`).
8. For a Lorebook-dependent card run at least one probe in both `--agent`
   modes and compare what each reached.
9. Turns sent with `play` do not pass through the play page: paste the
   replies into `preview/replies.md` and open `hearthroom card preview`, or
   the play link; record which.
10. Map each failure to a patch target with the triage table; several
    failures at once go through `hearthroom-card-doctor`.
11. Patch only what the transcript proves (usually `definition.md` or
    `welcome.md`); push with `--validate` after structural patches.
12. Replay only when the patch changes behaviour, after the pre-check
    (check, validate, render, preview with the failing reply), on
    `--new-session`, with the same probes and models, and with the cost
    accepted. Compare layer by layer; one reply cannot separate improvement
    from noise. After two failed loops on one symptom, ask for a design
    direction.

## Checks

Keep in the dossier: model, agent mode and turns per run, credits when
reported, the weakest layer with the line that shows it, and what was
patched. Continue with the narrow skill the triage names, with
`hearthroom-collaboration-director` when the author wants to compare patch
directions first, or with `hearthroom-publish-readiness` when the accepted
scope passes.

## Do not

- Do not send a turn before the author has accepted the cost, and never when
  the request was for a plan.
- Do not claim behaviour-complete status from a spot-check, or a
  Lorebook-dependent card as tested after one `--agent` mode.
- Do not paste raw transcripts into shared files; paraphrase the evidence.
