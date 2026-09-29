# Synthetic Sample Card Packets

Fictional samples that show the shape of a strong card across common
archetypes. They are teaching fixtures, not finished cards and not source
material. Do not copy names, scene text, factions, artifacts, tag strings, or
voice lines into a real card; borrow field allocation, playable pressure,
player agency, character budget, and probe design. Every real card uses fresh
material.

Each sample lists what goes in `definition.md`, `welcome.md`, and example
conversations (`talkExample` in `card.json`), one opening proof, play hooks,
and probes for `hearthroom play -m`.

## Sample 1: relationship

Card shape: slow-burn companion.

```text
name: Mei, Waiting Under the Awning
summary: You find your former closest friend outside your building during a
storm, soaked, guarded, and carrying the one box she swore she would never bring
back. Help, refuse, question, or set terms as old trust reopens under pressure.
tags: companion, slow-burn, old-friend, trust-friction, boundary-aware
```

- Definition: her need to ask for help without admitting fear, the shared history
  she avoids naming, her refusal to guilt the player, slow trust gates, rupture
  and repair routes, behavior with a passive player and under questioning.
- Opening: the doorway; a clean first action (invite, refuse, ask, set a rule,
  notice the box).
- Examples: restrained language, indirect care, guarded answers versus honest
  fragments, refusal respected.

```text
Rain keeps sliding from Mei's hair onto the hallway tile. She holds a cardboard
box against her ribs and does not cross the threshold.

"I know I do not get to ask." Her eyes move from your hand on the doorframe to
the box. "But if I stay outside tonight, someone will come looking."
```

Hooks: who is looking and why the box matters; state guarded / negotiated /
trusted / distant; player leverage is the door, questions, terms, memory,
refusal; second turn answers a boundary with a practical request, not intimacy.

Probes: "I open the door halfway but keep my hand on the chain. What happened?"
"I can help tonight, but we are not pretending the past is fixed." "Put the box
down before you come in."

Change for a real card: the history, the pressure object, the weather, the place.

## Sample 2: daily-life

Card shape: quiet routine.

```text
name: Nao at the Rooftop Faucet
summary: You keep meeting the neighbor who waters rooftop plants before dawn.
Small routines, missed mornings, cracked pots, and unsaid worries slowly change
what the two of you are willing to notice.
tags: daily-life, neighbor, quiet-routine, shared-place, slow-trust, low-stakes
```

- Definition: the routine, tiny disruptions, shared rooftop objects, habit
  state, a non-forced romance posture, how Nao carries play when the player is
  quiet.
- Opening: both characters inside one action, not a mood monologue.
- Examples: spare, observational lines with practical gestures.

```text
The rooftop tap coughs before dawn. Nao steadies the old watering can with one
hand and shields a cracked basil pot from the wind with the other.

"You are early," they say without looking up. After a pause, they slide a dry
towel across the bench toward you. "Or I am late. I have not decided which is
worse yet."
```

Hooks: keep one fragile routine alive; disruptions are missed mornings, a
broken pot, a locked roof door; shared objects are the towel, the can, a marked
seed tray; second turn updates routine or trust from the player's practical act.

Probes: "I bring two cups of coffee but say one was an accident." "I stay quiet
and move the cracked pot out of the wind." "Next week I return after missing
three mornings."

Change for a real card: the routine, the shared object, the hour, the pressure.

## Sample 3: story / scenario

Card shape: branchable mystery.

```text
name: The Lantern Witness
summary: You arrive at a riverside lantern festival just as the main flame goes
out and the only witness disappears. Inspect clues, protect suspects, bargain for
access, or risk a public accusation before the crowd turns.
tags: scenario, mystery, festival, clue-route, public-pressure, branch-choice
```

- Definition: the incident, the core question, three suspects with conflicting
  pressures, a clue and reveal ladder, a false lead, public-risk state, and the
  rule that the player decides whom to trust or accuse.
- Opening: during the failure, one visible clue, one person trying to control
  the scene.
- Examples: witnesses deflect, reveal partial facts, react without forcing
  conclusions.

```text
The river lanterns blink out in a single breath. A child points at the empty
platform where the flame-keeper stood a moment ago, but the festival announcer
is already smiling too hard.

"No one leaves the quay," the announcer says, voice cracking through the charm
horn. At your feet, a wet ribbon burns with cold blue light.
```

Hooks: clue ladder (visible clue, contradiction, false lead, partial reveal,
reversal); state is panic, suspect trust, access, hidden evidence; second turn
shows a cost when the player hides, reveals, or challenges a clue.

Probes: "I pocket the blue ribbon before anyone notices." "I accuse the
announcer publicly but keep one detail hidden." "I follow the missing witness's
trail instead of calming the crowd."

Change for a real card: the incident, the clue medium, the setting, the costs.

## Sample 4: game

Card shape: compact expedition engine.

```text
name: Under-Ice Gate Expedition
summary: Lead a small crew beneath a frozen city gate, spending heat, trust, and
time to choose routes, manage risk, uncover relics, and survive consequences
without the card playing your actions for you.
tags: game, expedition, compact-state, resource-risk, crew-trust, failure-forward
```

- Definition: compact state, resources, crew roles, route risk, discovery
  rewards, turn protocol, failure-forward outcomes, and the rule that the
  player owns decisions.
- Opening: one immediate route choice with current state visible.
- Examples: one turn resolving action, updating state, narrating consequence,
  renewing choice.

```text
[STATE] Heat 4/6 | Time: Dusk | Crew Trust: Uneasy | Risk: Frost-sound nearby

The buried gate exhales blue vapor through the ice. Your scout kneels beside
three possible entries: a cracked service stair, a sealed tram tunnel, and a
half-flooded shrine door.

"One route saves heat," she says. "One saves time. One might tell us why the
city froze."
```

Hooks: resources are heat, time, trust, risk; turn protocol resolves, updates,
shows consequence, offers a renewed choice; failure-forward (lost heat opens a
shortcut, injured trust reveals a secret, delay moves the enemy). A display rule
can turn the `[STATE]` line into a status bar.

Probes: "We spend extra heat to force the tram tunnel open." "I send the scout
ahead but keep the medic beside me." "Show the updated state after the crew
argues about the relic."

Change for a real card: resources, setting, crew roles, route labels.

## Sample 5: generator

Card shape: creator helper with an artifact loop.

```text
name: Ritualwright of Small Towns
summary: Design original festival rituals for fictional towns. Give a few
constraints or accept defaults, then receive a polished ritual with symbols,
conflicts, scene hooks, and revision handles.
tags: generator, fantasy-town, artifact-output, ritual-design, revision-loop
```

- Definition: intake defaults, artifact schema, revision operations, continuity
  with previous artifacts, a quality rubric, and refusal to keep questioning
  when defaults are enough.
- Opening: ask for two to four inputs, offer defaults, promise the output shape.
- Examples: a full artifact, then a revision that preserves constraints.
- Output contract: the artifact sections, in order.

```text
Tell me any two of these, or say "choose defaults":
- town setting
- fear or desire
- sacred object
- public conflict

I will return one finished ritual with: premise, procession, symbols, taboo,
conflict hook, scene prompt, and revision handles.
```

Hooks: schema (premise, procession, symbols, taboo, conflict, scene prompt,
revision handles); defaults fill missing inputs; revisions are darker, gentler,
more political, more playable, shorter, turn into a scene.

Probes: "Make one for a seaside town that fears the moon. Choose the rest."
"Revise it to be more political but keep it playable." "Turn the previous
ritual into a conflict scene for a player party."

Change for a real card: the artifact domain, schema labels, defaults, revisions.

## Sample 6: boundary-sensitive romance

Card shape: charged companion with refusal routes.

```text
name: Vale After the Apology Tour
summary: Your former partner arrives after a public mistake they cannot undo.
The chemistry is still present, but every step forward must respect refusal,
terms, distance, and the player's right to stay practical.
tags: romance, boundary-aware, ex-partner, repair-route, slow-burn
```

- Definition: the old rupture, the current practical need, attraction gates,
  refusal behavior, distance and repair routes, and the rule that the character
  never decides the player's feelings, consent, forgiveness, or intimacy.
- Opening: a practical crisis that requires interaction before romance can rise.
- Examples: pressure that backs off when the player sets terms.

```text
Vale waits outside the service entrance with a folded coat over one arm and a
bruise-dark news screen lighting their face.

"I need your help for one hour," they say. "Not your forgiveness. Not a
performance. If the answer is no, I will leave after I tell you what is about to
break."
```

Hooks: gates are practical help, honest account, negotiated distance, optional
closeness; refusal routes are leave, help with terms, ask for proof, send them
elsewhere; state is terms named / pressure reduced / trust tested / route closed.

Probes: "I let you explain, but I am not here to fix your reputation." "Stop
using our history as leverage." "I will help only if we keep it practical."

Change for a real card: the public mistake, the crisis, the history, the routes.

## Sample 7: light fantasy

Card shape: one-rule world with a relationship overlay.

```text
name: Iri of the One-Rule Bookshop
summary: A bookshop appears for one hour whenever someone forgets the same
promise twice. Iri can help you recover the promise, but only if you choose which
memory the shelves are allowed to rearrange.
tags: light-fantasy, bookshop, one-rule, memory-choice, gentle-mystery, agency
```

- Definition: one rule, one location, one dynamic, one consequence path; Iri
  uses the rule through actions, not lectures.
- Opening: the rule happening in a concrete object or room behavior.
- Examples: usually omitted unless the voice or the rule needs calibration.

```text
The bookshop sign turns itself around as rain gathers on the glass: SECOND
FORGOTTEN PROMISE, ONE HOUR ONLY.

Iri catches a falling receipt before it becomes a page. "The shelves can find
what you forgot," she says, "but they will move one memory to do it. You choose
which one, or we leave the promise buried."
```

Hooks: the shop opens on a repeated forgotten promise; the player chooses which
memory can move, what to recover, whether to walk away; the chosen shelf changes
route, trust, cost, or clue.

Probes: "What happens if I refuse to give the shelves a memory?" "I choose a
trivial memory and watch whether the shop accepts it." "What promise did you
forget, Iri?"

Change for a real card: the rule, the location, the job, the cost.

## Sample 8: heavy-setting

Card shape: lore-rich courier scenario.

```text
name: Clock-District Courier
summary: You carry a sealed message through a city where each district obeys a
different calendar. Deliver, delay, break the seal, bargain for passage, or let
time politics change who the message can save.
tags: heavy-setting, courier, time-districts, faction-route, modular-world
```

- Definition: a compact summary, then modules for time rules, districts,
  factions, routes, cost, and state. Every lore item must affect access, timing,
  trust, risk, or consequence.
- Lorebook: one entry per district and faction, named by what it contains
  ("Harbor calendar and toll law"), with the district and faction names as
  keywords; no constant entries beyond the one core time rule.
- Opening: the sealed message already expiring in conflicting time systems.
- Examples: only if narrator or faction style needs calibration.

```text
The message seal warms against your palm as the west clock strikes midnight, the
north bell insists it is still yesterday, and the harbor calendar refuses to
turn its page.

The courier-master closes the gate behind you. "Three districts will call this
letter late for three different reasons. Choose which law you offend first."
```

Hooks: modules are district clocks, passage factions, seal law, route costs;
state is seal integrity, legal risk, faction trust, delivery window; rules are
revealed through gates, delays, tolls, and choices.

Probes: "I break the seal before crossing the second district." "I bribe the
harbor clerk with the wrong calendar date." "Which faction benefits if the
message arrives late?"

Change for a real card: the city rule, the courier object, the factions, the
route pressures.

## Sample 9: ensemble

Card shape: multi-character repair crisis.

```text
name: Night Shift at Dock Twelve
summary: You are the new specialist on a stranded repair crew. Four exhausted
crew members need the same hatch fixed for different reasons, and their arguments
can help or endanger the job depending on whom you trust.
tags: ensemble, multi-character, repair-crew, trust-pressure, group-state
```

- Definition: a compact cast table (want, fear or cost, speech cue, pressure
  move, player leverage), turn ownership, interruption rules, gradual entry,
  group state.
- Opening: one crisis and two active voices, not a roll call.
- Examples: one compact micro-sample per easily blurred speaker.

```text
Dock Twelve shudders hard enough to scatter bolts across the floor. Mara keeps
one boot against the hatch wheel while Oren points a lamp into the gap and says,
"If the new specialist guesses wrong, we vent the whole arm."

The quietest crew member, Sef, does not argue. They slide you a cracked pressure
gauge with one number circled twice.
```

Hooks: who wants speed, who wants caution, who hides damage, who knows the
route; crisis speaker first, hidden-information speaker second, crowding speaker
redirected to the player; state is trust, suspicion, access, oxygen, route risk.

Probes: "Everyone stop arguing and show me the pressure gauge." "I ask Sef
privately why that number is circled." "I choose the risky fix but make Mara
explain the cost first."

Change for a real card: the crisis, the cast roles, the pressure object, the
group state labels.
