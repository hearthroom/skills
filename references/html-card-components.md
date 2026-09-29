# HTML card components

`hc-*` elements and classes are rendered by the play page inside replies and
openings. They are the safe way to give the player buttons, bars, facts,
forms and panels without writing scripts. The full supported list is in the
facts sheet; `hearthroom card render --json` lists the ones an opening uses
under `report.components`.

## The catalog that carries play value

| Need | Component | Notes |
|---|---|---|
| A player action | `<hc-btn send="…">label</hc-btn>` | `send` puts a complete player intent into the input; `copy="…"` copies text; `bg`, `w` (`auto`, `50%`, `full`), `txt-color` style it |
| A continuous value | `<hc-bar value="60" max="100" color="…" label="…">` | only for numbers that move: trust, heat, countdown, resources |
| A compact gauge | `<hc-meter …>` | same rule as bars |
| A fact | `<hc-stat label="Route" value="North">` | text states: location, phase, route |
| A label | `<hc-tag bg="…" txt-color="…">clue</hc-tag>` | rarity, phase, clue type |
| Optional detail | `<hc-collapse title="Case file" open>…</hc-collapse>` | rules, logs, help; collapsed by default |
| Toggle section | `<hc-toggle>` | header that shows or hides a block |
| Setup or intake | `<hc-form>` with `<hc-input>`, `<hc-radio>`, `<hc-checkbox>`, `<hc-option>` | first-screen wizards for game and generator cards |
| Choice list | `<hc-choices>` | a group of actions laid out together |
| Message and notice | `<hc-alert>`, `<hc-notice>` | warnings, system notes |
| Grouping | `<hc-panel>`, `<hc-card>`, `<hc-tabs>` / `<hc-tab>`, `<hc-list>` / `<hc-item>`, `<hc-info-row>`, `<hc-hr>` | keep nesting shallow |
| Speech | `<hc-quote>`, `<hc-speaker>`, `<hc-avatar>` | ensemble scenes |

Tones (`hc-primary`, `hc-secondary`, `hc-success`, `hc-warning`,
`hc-danger`, `hc-soft`, `hc-dark`, `hc-light`), backgrounds (`hc-bg-*`),
layout helpers (`hc-f`, `hc-fw`, `hc-fj`, `hc-g`, `hc-c`, `hc-d`, `hc-h`,
spacing `hc-mt` / `hc-mb` / `hc-my` / `hc-pt` / `hc-pb`) and effects
(`hc-glow`, `hc-glow-text`, `hc-gradient-text`, `hc-shimmer`, `hc-pulse`,
`hc-pulse-border`, `hc-text-outline`, `hc-shadow`) are classes on those
elements or on plain HTML.

## Rules

- Use only names from the facts sheet. An invented element renders as an
  empty unknown element and the player sees nothing.
- Keep `hc-*` markup free of scripts. Scripts belong in display rules, where
  the platform runs each `<script>` once per card and the sandbox page gives
  them the author API.
- Bars are for numbers that move. Facts and tags are for words.
- A button's `send` text is what the player will say; write it as the player,
  in full, not as a label.
- Do not hide critical state in a button label or a collapsed block; the
  first screen must show what the player needs to act.
- Keep the model's markup budget small: the model writes every `hc-*` tag it
  emits. Put repeated chrome into a display rule instead of asking the model
  to write it each turn.
- Check the result with `hearthroom card render --json`
  (`report.components`, `report.tags`), then on the play page at a phone
  width and a desktop width.

## Migration from other platforms

SillyTavern and MMD cards arrive with their own HTML and CSS in rules. Keep
them; `cardFormat` controls how `<style>` in rules is scoped. Replace ad hoc
`<div>` status blocks with `hc-*` components only when the author wants the
platform look; otherwise leave working markup alone and verify it renders.
