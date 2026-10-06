# Probe card

A card whose only job is to check the sandbox contract on a real page. Its script writes one
result per claim into `window.__probe.results` (`{ ok, note }`) and the event sequence into
`window.__probe.events`; `sdk.debug.log` lines show in the debug panel (`?sdkDebug=1`).

What it checks (each key is a claim from `scripts/sandbox-contract.json`): scripts run before
the DOM; `document.currentScript` is the running script element; the sdk has 12 keys and no `off`/`once`;
`sdk.version === '1'`; `user.get()` has `nickname` and `locale`; `save.get` before load
throws `HOST_DENIED`; cache round-trips; `stage.el()` returns a node while closed; an
unknown event name is silent; cold start order `new → mount → done`, `ready` last and not
replayed while `mount` is; inside a handler `document.querySelector` is scoped to the bubble;
author `data-*` is stripped in the bubble and in the function bar; `onclick` inside `<svg>`
is stripped and on a `<button>` kept; `<状态>` is stripped with its text kept; `$a`/`$b`
read the field table; the eleventh `save` key is refused (sequential writes); whether an inline `<script>` in the function bar's text runs (`barInlineScriptRan`: it does not on the shell's own render path, the play page's host path is what the live run settles).

`welcome.md` carries the marker the rules consume. Run it in the offline preview
(`bench/card-preview` in the chat page's repository) and read `__probe.results` from the
console; push it as a trial card to run the same checks on the live page, where the host's
render path is what the player gets (the `authorDataStripped` and `barAuthorDataStripped`
results on the live page settle the question the facts sheet leaves open). Delete the trial
card afterwards. Do not publish it.
