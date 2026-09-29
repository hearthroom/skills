# Prose texture

Use this reference when the words themselves read like a template: the
opening trembles, every line ends in an ellipsis, adjectives arrive in threes,
the narrator tells the player what they feel, or a play turn comes back in the
same breathless register no matter what the player did. It covers the opening
(`welcome.md`, `openings/alt-NN.md`), any sample the model will imitate
(`talkExample`, the output contract) and the prose habits an agent brings to
its own drafts.

It does not replace the engine. A card whose character has no desire, no
leverage and no loop stays flat however clean the sentences are; repair that
with `character-core-design.md`, `tension-triangle.md` or `longplay-design.md`
first. Texture is what you fix once the engine is sound and the card still
reads like it was generated.

Keep the order of importance honest. A clean first screen with nothing at
stake loses to a clumsy one that hands the player a question they want
answered. Texture decides between two cards that both have a hook; it does
not make a hook. Run `tension-triangle.md` before this reference, not after.

## Where texture bites

Texture matters most where nothing else carries the turn: a single
character, one relationship, no resources or cast to move. There, the
register of the replies is most of what the player gets, and the trembling
register (broken speech, begging, one held breath per paragraph) is the
commonest way such a card dies. Mature or romance cards that open on a plea
are the sharpest case; fix the intensity curve there before anything else.

Game, simulator and world cards are more forgiving. A working economy, a
cast with their own agendas or a turn protocol will keep players through
prose that would sink a companion card. Spend the texture pass on the first
screen and the sample, then let the loop do its work; do not polish a
simulator's status prose while its rules are still thin.

## The model copies the sample, not the rule

A card carries two kinds of style instruction. Rules ("do not repeat", "avoid
purple prose", "keep replies under 800 words") sit in the definition and are
read once. Samples (the opening, example conversations, a format sample) are
what the model actually continues from, turn after turn. When the two
disagree, the sample wins, because imitation is cheaper than obedience.

So the opening is the card's first reply sample, and it teaches more than any
"style" section. An opening full of trembling dialogue shows the model that
trembling dialogue is what this card sounds like, and nothing later tells it
to stop. An opening with whole sentences, concrete objects and distinct
voices shows it those instead. Write the sample you want copied; cut style
rules that the sample already demonstrates, and never rely on a rule to undo
what the sample shows.

## Intensity curve

Open at a low or middle setting. The pressure is real and visible, but the
player still has room: something to notice, decide, pick up, refuse or ask
before anything is at stake. A first screen at full intensity (someone
already crying, naked, dying, threatening, confessing) has nowhere to go: the
second turn can only repeat the peak or deflate, and the model learns that
every turn must be a peak.

Test it: name the emotional volume of the first screen on a scale where ten is
the climax of the whole card. If it is above four, move the crisis later and
open on the moment before it, or on its consequences the next morning.

Also check the exit. A crisis with one acceptable answer (protect the victim,
save the stranger, obey the ghost) is not a decision. Offer the player a
choice where more than one path is defensible.

## Objects before feelings

Show the scene as an inventory before anyone is sad about it. Concrete nouns
the player can act on carry more than any mood word: a bus ticket folded
twice in a coat pocket, a kettle left on in an empty kitchen, an umbrella
still dripping in the stand when nobody is supposed to be home, a receipt
with one line crossed out. A weight or a sound is enough to imply a feeling;
naming the feeling wastes the sentence and takes it from the player.

Never narrate the player's inner state. "你驚恐地", "你渾身冰冷", "你不禁",
"你感到" are agency takeovers as well as texture failures; `agency-design.md`
covers the first, this reference the second. Give the player the object and
let them decide what it means.

Adjectives come one at a time. A noun with three modifiers (淒厲、瘋狂、
病態的視線) is a mood label wearing a costume; pick the one that changes what
happens next, or replace all three with an action.

## Sentence texture

- Whole sentences. Dialogue that breaks every few words with 「……」 reads as a
  template of distress, and once it is in the sample the model will tremble
  for the rest of the session. Budget the ellipsis: one or two on a screen,
  placed where a specific character is specifically failing to say a specific
  thing. A trembling line that ends with a decision reads better than one
  that trails off.
- One beat per paragraph. A paragraph does one thing: an action, a line, a
  detail, a change. Short paragraphs are fine; a wall of paragraphs that each
  describe another millimetre of the same held breath is not, because the
  scene has stopped moving.
- Similes are rationed. 像是、彷彿、如同 once per screen at most, and only when
  the comparison brings in a new object. "像是獵食者在觀察獵物" adds nothing
  the eyes did not already say.
- Retire the stock gestures. 嘴角勾起一抹弧度、眼中閃過一絲、空氣彷彿凝固、
  不知為何、心中一動 are not forbidden words; they are signs that the writer
  has stopped watching the character. Replace with what this character does
  with hands, objects, distance or timing.
- Dialogue carries more than narration. Let people say things. A screen that
  is mostly narration about how someone looked while not speaking is a
  screen where nothing happened.

## Voices you can tell apart

If two or more characters are on the first screen, make them distinguishable
in one overheard exchange: different sentence length, different address
terms, different targets. Three heirs at a will reading who each object to a
different clause (the house, the debt, the dog) are three people; three who
all sneer are one narrator. `voice-calibration.md` has the contrast matrix for cast
work; here the check is only that the sample already shows the difference.

## A counterweight

The register that reads as generated is uniformly earnest: everything is
intense, everything matters, nobody is unimpressed. Give the card one layer
that refuses the mood: a narrator who is not impressed, a rival who keeps
getting the player's name slightly wrong, a bored dispatcher on the radio, a
protagonist whose inner voice undercuts the scene she is standing in. One
dry line on the first screen sets the ceiling and lets the intense moments
land when they come.

## The loop is texture too

A card whose turn twenty reads like its turn two has a texture problem the
sentences cannot fix. Check that the opening plants something that changes:
money, reputation, evidence, suspicion, a countdown, a set of relationships
that can move independently. A single character whose whole arc is growing
dependence produces static replies (she waited; she did not move; she looked
at you) because there is nothing left to push against. `longplay-design.md`
and `state-economy-design.md` own the mechanics; the texture symptom is the
stop-motion reply.

## Synthetic example

Before:

> 風暴夜。燈塔的鐵門被拍得震天響，一個渾身濕透的男人跌進來，死死抓住你的
> 手臂，眼中閃過一絲絕望：「求求你……讓我躲一晚……他們……他們在找我……」
> 你感到一陣寒意，不由自主地點了頭。空氣彷彿凝固了。

Every failure at once: full intensity on the first screen, four ellipses in
one line, a stock gesture, the player's feelings and decision narrated for
them, a simile with no object, one acceptable answer.

After:

> 晚上九點，煤油還剩半罐。你在記錄簿上寫今天的風向，寫到一半停下來：樓下的
> 門沒鎖。你記得鎖過。
>
> 桌上多了一頂不是你的帽子，帽簷還在滴水。無線電裡港口在點名，念到第三艘船
> 的時候停了一下。
>
> 你可以現在下樓，也可以先把燈點上。反正燈總得點。

Intensity around three. Three objects (the log, the hat, the radio) the
player can act on. No adjectives about anyone. One dry line at the end. The
crisis exists but has not arrived; two defensible paths.

## Self-check

Run this on the opening, every alternate opening, each example conversation
and the output contract sample:

- Emotional volume of the first screen at four or below; the climax is not
  on it.
- Count the ellipses. More than two on a screen means the sample teaches
  trembling.
- No sentence tells the player what they feel, want, decide or consent to.
- Every emotion on the screen is carried by an object, a sound, a distance or
  an action; adjectives arrive singly.
- At most one simile per screen, and it brings a new object.
- Speech is at least as present as narration; two or more speakers are
  distinguishable without names.
- One line refuses the mood.
- The player has at least two defensible next moves, and the second turn can
  change something the first screen planted.

## Repairs

| Symptom | Repair |
|---|---|
| Opening is the climax | open on the moment before or the morning after; keep the crisis as pressure |
| Ellipsis in every line | rewrite the line as a whole sentence that ends in a decision or an action |
| "你感到 / 你不禁 / 你驚恐地" | replace with the object or sound that would cause it |
| Stacked adjectives | keep the one that changes the next action, or replace with a gesture |
| Stock gesture (嘴角勾起、眼中閃過) | what does this character do with hands, distance or timing |
| Simile with no object | cut it, or make the comparison bring a new thing into the room |
| Everyone sounds the same | give each speaker a different target and sentence length |
| Uniformly earnest | add one unimpressed line, a dry aside or a reader's commentary layer |
| Static replies after turn ten | plant a variable on the first screen (`state-economy-design.md`) |
| Style rules in the definition contradict the opening | fix the opening; delete the rule |
