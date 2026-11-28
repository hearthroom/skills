# Hearthroom chat presets

A chat preset supplies reusable instructions and their order around a
conversation's history. Use this format to write or edit a chat preset. The
examples below are synthetic.

## Document and entries

The document has `schemaVersion`, the SillyTavern-shaped source object `st`,
and `selection`. The wire version is
`hearthroom.st-preset.v1`. The older layout compiler `preset-p1.2` (v1.2)
uses that same document. Current saves select the compiler for the document's
syntax. Response or tool-reply slots require the newer compiler, so keep the
wire version in the example when using them.

This document shows two authored entries, two platform markers and one order
profile. To import it as SillyTavern JSON, save the value of `st` as the file
and select profile `1` in Hearthroom's import preview.

```json
{
  "schemaVersion": "hearthroom.st-preset.v1",
  "st": {
    "prompts": [
      {"identifier": "voice", "name": "Voice", "role": "system", "content": "Use concrete details."},
      {"identifier": "charDescription", "marker": true, "role": "assistant"},
      {"identifier": "chatHistory", "marker": true},
      {"identifier": "preferences", "role": "system", "content": "{{writingStyleSlot}}\n{{perspectiveSlot}}\n{{lengthSlot}}\n{{ruleSlot}}\n{{turnInputInstructionSlot}}\n{{toolReplySlot}}"}
    ],
    "prompt_order": [{
      "character_id": 1,
      "order": [
        {"identifier": "voice", "enabled": true},
        {"identifier": "charDescription", "enabled": true},
        {"identifier": "chatHistory", "enabled": true},
        {"identifier": "preferences", "enabled": true}
      ]
    }],
    "temperature": 0.7,
    "suki_response_slots": true,
    "suki_tool_reply": true
  },
  "selection": {
    "profileId": 1,
    "excludedEntryIds": [],
    "excludedFields": [],
    "acceptedAdaptationIds": [],
    "toolReply": true
  }
}
```

- Use unique identifiers. The selected `prompt_order[].order` gives the
  sequence and the boolean `enabled` for each entry. An authored entry has
  a `role` of `system`, `user` or `assistant`. Ordinary ordered entries use
  `injection_position: 0` or omit it. Place `chatHistory` between the two
  sections to mark which entries go before and after history.
- `profileId` selects `character_id`. Adding `"voice"` to `excludedEntryIds`
  suppresses that entry while keeping it in the source. Adding
  `"temperature"` to `excludedFields` suppresses that sampling override.
  Leave `acceptedAdaptationIds` empty in new work. It retains compatibility
  with older selections.
- Use numbers for `temperature` (0–2), `top_p` (0–1), `frequency_penalty`
  and `presence_penalty` (both −2 to 2). The provider sends active penalties
  on eligible OpenAI-compatible routes. Gemini and Anthropic-native routes
  omit them. Other fields, such as `top_k`, stay in the source.
- To create a preset directly in Hearthroom's native editor, start with plain
  authored text, platform markers using their default roles, and optionally the
  sampling fields. Native saves accept the document shape above but use a
  narrower set of fields and macros. For the `suki_*` fields, marker role
  overrides and response or tool-reply slots, use the JSON import path.

## Platform-owned material and message roles

Recognized markers are `chatHistory`, `personaDescription`, `charDescription`,
`dialogueExamples`, `worldInfoBefore`, `worldInfoAfter`, `charPersonality`
and `scenario`. Leave their `content` empty. The platform supplies history,
card definition, player persona, examples, Lorebook and summaries. For
example, place `{"identifier":"personaDescription","marker":true}` in the
prefix to position the player persona. If the marker is omitted, disabled or
placed after history, the renderer still supplies that material in the prefix.
The same holds for card definition and examples. The personality and scenario
markers are compatibility placeholders for combined card material. Lorebook
placement, summaries and history are managed by the platform.

For an imported preset, a `role` of `assistant` or `user` on a marker can
change how its material is sent. The example's `charDescription` marker sends
the existing definition as `assistant`. `personaDescription` and
`dialogueExamples` work the same way. A role on `worldInfoBefore` or
`worldInfoAfter` sets one shared Lorebook role, using the first eligible
marker in source order. This declaration is read from the source even when
the marker is disabled or excluded from the selected order.

Add `suki_material_roles` at the source top level to override marker roles.
For example, `"suki_material_roles": {"charDescription":"system","worldInfo":"user","memory":"assistant","userHistory":"system"}`
restores the definition's default role, sends resident Lorebook material and
any separate recall block as `user`, sends story-history summary blocks as
`assistant`, and marks earlier player messages as player-turn records sent
as `system`. In-history context anchors, including ordinary per-turn recall,
stay in their platform system role. The card material
keys are `personaDescription`, `charDescription`, `dialogueExamples`,
`worldInfo` and `memory`, each accepting `assistant`, `user` or
`system` to keep the platform default. `userHistory` accepts `assistant`
or `system` as overrides of its default `user` role. The current player
message follows the platform's usual handling unless the preset places it
through takeover.

## Response preferences, reply tool and current input

Use the five preference slots exactly once each across enabled, non-excluded
ordered `system` entries after `chatHistory` with `injection_position: 0`
or omitted. All five together let the player set those preferences in the
conversation. A partial or duplicated
set requires adjustment before use. With none, the custom preset locks
agency, style, perspective and pace. Length remains adjustable. Safety
level and custom instructions remain locked under a custom preset.
`"suki_response_slots": true` declares intent. The compiled slot layout
controls the unlock.

| Insert in an entry's `content` | What the platform supplies |
| --- | --- |
| `{{writingStyleSlot}}` | Writing style |
| `{{perspectiveSlot}}` | Narrative perspective |
| `{{lengthSlot}}` | Reply length |
| `{{ruleSlot}}` | Player-character control and story pacing |
| `{{turnInputInstructionSlot}}` | How to use the turn input according to the player-character control setting |

`"suki_tool_reply": true` starts an import with `selection.toolReply`
enabled. Clearing it removes the preset's request for tool delivery. The
model, turn mode and delivery settings determine what the turn actually
uses. For example, `"content":"{{toolReplySlot}}"`
in an ordered tail `system` entry places the platform's submission
instructions there when that turn uses `submit_reply`. The slot expands to
empty otherwise. Without the slot the platform adds those instructions after
the preset's tail. Use the slot once and let the platform supply the
instructions. The slot works on its own without the five preference slots.

`{{lastUserMessage}}` expands to the current input supplied for rendering.
For takeover, add `"suki_takeover_last_user_message": true` and place it in
an enabled, non-excluded tail entry, for example
`{"identifier":"current","role":"user","content":"{{lastUserMessage}}"}`.
Add `current` to the selected order after history. When the newest history
row is the current player message, including on Agent turns, the renderer
omits that row from the sent history and skips any suggested-reply pair
built from it. The preset supplies it in the selected entry's role.
Continue and turns without a new player message keep platform placement.
The saved conversation history is preserved.

## Import and compatibility

For a plain SillyTavern chat-completion export, upload the source object as
shown by `st` above. The platform wraps the source, selects the requested
profile and starts with empty exclusions. A version-1 pack instead has
`{"version":1,"type":"character","data":{"prompts":[],"prompt_order":[]}}`.
A pack uses `profileId: 0` and a flat list of order entries in
`data.prompt_order`. Put `suki_*` fields beside `prompts` in the source,
or inside `data` for a pack. SillyTavern export carries the source object.
Review the profile, exclusions and tool-reply setting in the preview when
importing it again, because Hearthroom rebuilds the selection on import.

Read the import compatibility report before saving. The platform projects
recognized text, order and parameters. It keeps other source settings for
round-tripping. For example, a Tavern plugin tool binding stays in the
source and does not become a chat tool. Replace an active entry that uses an
unsupported macro or condition with supported text, or exclude it from
the selection. Besides the slots above, `{{char}}` and `{{user}}` insert
names, `{{// note}}` is a comment and `{{trim}}` trims adjacent line breaks.

## CLI editing

Use a CLI whose `hearthroom preset --help` lists the commands below. If the group is unavailable, use the web editor.
`check` works offline. To save, export, or bind a preset, sign in on a supported provider with `hearthroom auth login --presets`.
Save the example's `st` object as `tavern.json` to import slots or `suki_*` fields. Use `--profile-id` for files with multiple profiles.
A full Hearthroom document follows the native editor's rules. Open the web import preview if compatibility checks require choices.

```sh
hearthroom preset check tavern.json --profile-id 1 --json
hearthroom auth login --presets
hearthroom preset push tavern.json --profile-id 1 --create --title "My preset"
hearthroom preset list
```

Use the preset ID from that list. The default pull format is SillyTavern JSON. Use `--format hearthroom` to keep the selection and
take `EXPORTED_VERSION` from the same pull. On a version conflict, pull to a new file and reconcile your edits.

```sh
hearthroom preset pull "$PRESET_ID" --format hearthroom --out edit.json --json
# Edit edit.json before checking and saving.
hearthroom preset check edit.json
hearthroom preset push edit.json --id "$PRESET_ID" --expected-version "$EXPORTED_VERSION"
```

If a push result is uncertain and the CLI prints an operation ID, retry the same save with `--operation-id` and that value.
Updates to a shared preset follow its sharing settings. Use the web editor to manage sharing.
With `bind`, `unbind` and `status` available, use the card UUID accepted by `hearthroom play --role`.

```sh
hearthroom preset bind "$PRESET_ID" --role "$ROLE_ID"
hearthroom preset status --role "$ROLE_ID" --json
hearthroom preset unbind --role "$ROLE_ID"
```

The choice applies to new turns in all your conversations with the card. Unbind before playing to compare with the platform default.
JSON status reports `source` as `custom` (with `presetId` and content `version`), `platform-default`, or `unavailable`.
If a change conflicts or its result is uncertain, check status before trying again.

## Preset Library

Players can apply either kind of listed preset. **Open content**
(`contentVisibility: "open"`) lets other players read its entries.
**Use only** (`contentVisibility: "hidden"`) shows listing details such as
name and author and keeps the document out of other players' detail,
copy and export flows. A player can apply a use-only preset from the
library and play with it. Model output can still reveal material that was
sent to the model.

When use-only publishing is available, the author can choose either mode
for a preset made in Hearthroom or imported from JSON. For example, import
your own SillyTavern preset, then choose Use only to let others play with
it while keeping its entries out of the listing detail. The platform checks
for copied content and can refuse use-only publishing if the entries
overlap another author's preset. Share only material you have permission
to publish.
