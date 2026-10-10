# Generated music

Load this reference when a card composes its music in the page (a synthesizer
and a conductor that follows the story) instead of playing recorded files.
What the music says is the card's own; this page says what makes generated
music hold up over hours of play and how to check it. Starting sound needs a
player's tap (`platform-facts.md`).

## What the player should hear

The music follows the story the page already knows (scene, mood, danger, the
wait for a reply) and changes the way a film score does: at phrase ends, by
re-voicing what is playing rather than cutting to another tune. How it waits
with the turn is in `presentation-design.md`.

- Write the score and the orchestration as separate steps: each part its own
  line (chord tones on strong beats, passing tones between, the
  countermelody moving when the melody holds, no parallel fifths with the
  bass), then an ensemble chosen by mood plays it. A mood change re-voices the
  same score; a scene change modulates over several bars (the old theme thins,
  a pivot chord, a dominant pedal) and cross-fades over bars, not seconds.
- A character theme is only heard if it survives the harmony it is played
  over. Write each motif against the progression it usually meets, with its
  strong-beat notes in that chord: a motif whose stressed notes belong to the
  dominant is rewritten by every chord-tone rule on the tonic, and the player
  never hears it whole. Keep each theme's signature (a leap, a dotted
  hesitation, a fanfare rhythm) and let variation change the rest.
- Phrases ask and answer, and the lead sings on the cadence bar. A phrase
  that ends on silence or on a held inner chord reads as a loop, however good
  the harmony is.
- Rules that repair one voice can break another. Run the chord-scale fit
  (borrowed and secondary-dominant chords included) after every pass that
  moves notes, and keep a secondary dominant's leading tone in one voice.
- Instruments stay in their real ranges and winds and brass breathe; a horn
  that holds for minutes or a flute below its lowest note is heard as fake
  even by players who could not say why.
- Long play is the real test: a player hears the same engine for hours.
  Change the second statement of a theme, rotate the lead instrument across
  long scenes, give the ensemble a lighter phrase now and then, and put small
  timing and velocity variation on every attack.
- Most players listen on phone speakers, which lose the bass. Give bass parts
  upper harmonics so the line is still heard through the missing
  fundamental, keep the mix mono-safe and keep loudness close between scenes.
  Sound effects sit in the current key and under the music's level; music
  dips a few decibels while a character speaks.
- A slow device should thin the music (fewer voices and doublings) instead of
  glitching; measure the audio thread's load and step down.

## Checking it: algorithm and reader together

Counting finds what is countable (clashes on strong beats, ranges, root
arrivals, how often a line repeats) and cannot say whether the result is
music. Check with both, on the card's own output:

- Run the conductor offline with a fake audio context and seeded randomness,
  driven by the story's real state changes (and, once the card is played,
  replayed logs from real sessions), and export every part as notation a
  reader can cite by bar (ABC or MIDI with chord, key and section per bar).
- Give the notation to two or three independent model readers with different
  backgrounds (classical harmony and counterpoint, game or anime scoring,
  melody and leitmotif) and ask for findings cited by bar, scores per
  dimension, and when a player would notice the patterns repeating.
- Turn each finding a number can catch into a check that fails before the
  fix, so the reader's ear and the metric agree on the problem. Send the next
  score to the same readers to accept or reject each finding. Stop when they
  accept and the checks hold; what remains are composition choices, which go
  to the author.

Do not claim the music resembles or avoids a source work without a reliable
score of it; keep original motifs short and say the comparison was not made.
