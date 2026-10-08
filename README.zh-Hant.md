<p align="center">
  <a href="https://hearthroom.club"><img src="https://raw.githubusercontent.com/hearthroom/hearthroom/main/web/public/icons/icon-192.png" width="96" alt=""></a>
</p>

<h1 align="center">Hearthroom skills</h1>

<p align="center">
  給 AI 編程助手的寫卡技能。助手會寫好角色卡、自己玩過、看過畫面，再把玩家會在意的地方修掉。
</p>

<p align="center">
  <a href="https://hearthroom.club/guide"><img src="https://img.shields.io/badge/guide-hearthroom.club-E89064" alt="寫卡指南"></a><a href="https://discord.gg/C7m85YPHmK"><img src="https://img.shields.io/badge/Discord-join%20the%20community-5865F2?logo=discord&logoColor=white" alt="Discord"></a><a href="https://github.com/hearthroom/skills/actions/workflows/validate.yml"><img src="https://github.com/hearthroom/skills/actions/workflows/validate.yml/badge.svg" alt="Validate"></a><a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="License: MIT"></a><a href="https://github.com/hearthroom/skills/commits/main"><img src="https://img.shields.io/github/last-commit/hearthroom/skills" alt="Last commit"></a>
</p>

<p align="center">
  <a href="README.md">English</a> ·<b>繁體中文</b> ·<a href="README.zh-Hans.md">简体中文</a>
</p>

<p align="center">
  <img src="docs/readme/showcase.webp" width="860" alt="用這套技能寫成的一張卡的三個手機畫面：標題頁、哥布林村的像素場景與下方劇情文字、幾天後的一回合（列出成長變化和下一步選項，也能自己寫）">
</p>
<p align="center"><sub>用這套技能和沙盒套件寫成的卡，畫面來自 CLI 的離線預覽。</sub></p>

## 這是什麼

[綺夢社](https://hearthroom.club)（Hearthroom）是一個開放的 AI 角色卡社群。一張卡就是一個放著純文字檔的資料夾，[`hearthroom` 命令列工具](https://cli.hearthroom.club)可以在終端機裡把資料夾推成私人試玩卡，再檢查、渲染、試玩。

CLI 負責搬檔案，檔案裡寫什麼由這套技能決定。這裡有 43 個技能和 47 份共用指南，涵蓋前提、人物、關係、世界與世界書、開場白、聲線、狀態、畫面、診斷和迭代，每一項最後都落在一個助手能自己跑的檢查上。Claude Code、Codex、Cursor，以及任何能讀檔案、能跑命令的助手都能用。

你說想要什麼卡就好。助手只問會改變結果的問題，然後寫出資料夾，用玩家實際碰到它的方式測一遍，並把自己做了哪些決定、為什麼這樣決定記下來。

## 快速開始

把這句話貼給你的助手。它會裝好 CLI 和這套技能，再用一次性代碼幫你登入：

```text
從 https://hearthroom.club/agent-setup.md 讀取設定步驟並照著做，幫我準備好在 Hearthroom 寫酒館角色卡的環境。
```

裝好之後載入技能：Claude Code 執行 `/reload-plugins`，Codex 和其他助手開一個新對話。整個設定過程不花點數。

<details>
<summary>手動安裝</summary>

**Claude Code**

```sh
claude plugin marketplace add hearthroom/skills
claude plugin install hearthroom@hearthroom-skills
```

**Codex**

```sh
codex plugin marketplace add hearthroom/skills
codex plugin add hearthroom@hearthroom-skills
```

**Cursor**

```sh
git clone https://github.com/hearthroom/skills ~/.cursor/plugins/local/hearthroom
```

再執行 **Developer: Reload Window** 或重開 Cursor。之後要更新就執行 `git -C ~/.cursor/plugins/local/hearthroom pull`。

**其他助手**（OpenCode、Gemini CLI 等）：整個倉庫都要 clone 下來，因為技能會讀 `references/` 底下的共用檔案。

```sh
git clone https://github.com/hearthroom/skills ~/.hearthroom/skills
```

再在助手的使用者層級指示檔裡加一句：

```text
寫、審或測 Hearthroom 角色卡時，先讀 ~/.hearthroom/skills/skills/using-hearthroom/SKILL.md，照裡面的路由表走。
```

**CLI**

```sh
curl -fsSL https://raw.githubusercontent.com/hearthroom/cli/main/install.sh | sh   # macOS、Linux
hearthroom auth login
```

Windows 用 `irm https://raw.githubusercontent.com/hearthroom/cli/main/install.ps1 | iex`。Homebrew、Scoop 和從原始碼建置的方式見 [CLI 的 README](https://github.com/hearthroom/cli#install)。截圖檢查（`card preview --check`）另外需要 Chrome、Chromium 或 Edge。

</details>

## 可以這樣跟助手說

> 寫一張修仙卡：我是被逐出宗門的廢柴，師姐偷偷幫我，張力是她一出手就會被發現。狀態只要修為一項。先做成試玩卡，告訴我最弱的一層。

> 匯入這張 SillyTavern 卡，告訴我為什麼聊三輪就沒話說，只修這一個問題。

> 加一個顯示好感度和所在地點的狀態視窗，給我看手機上深色、淺色的截圖。

> 用第二個開場白，分別在弱一點和強一點的模型上各玩十輪，告訴我玩家會在第幾輪失去興趣。

> 這張卡可以送審了嗎？列出還要修的地方，先不要動任何檔案。

SillyTavern 的 PNG、JSON、CHARX 和魅魔島三件套都能直接匯入。怎麼下指令效果最好（給處境而不是只給類型、給一句台詞而不是一串形容詞、說清楚做到哪裡算完成），寫在[寫卡指南](https://hearthroom.club/guide)裡。

## 一張卡是怎麼做出來的

1. **分流。** `using-hearthroom` 先看你手上有什麼（一種感覺、一個定案的前提、素材、匯入的卡、試玩紀錄或回饋），找出玩家最先卡住的那一層（封面與標題、簡介、開場白、之後的回合），再載入最貼切的那一個技能。
2. **先說出最顯而易見的版本，再丟掉它。** 動手設計前，助手會先講出「任何模型都會這樣寫」的那張卡，真正要寫的卡才能走別的路。
3. **寫成資料夾。** 長文放 Markdown，世界書、規則和圖片各有自己的檔案，你都可以打開來看、直接改。
4. **先在本機檢查，不花錢。** `hearthroom card check` 檢查資料夾裡的規則、標記和腳本呼叫。`hearthroom card preview --check` 用無頭 Chrome 跑真正的聊天頁外殼，把每一種狀態都截下來：手機和桌機、深色和淺色，另外拼一張總覽圖並列出發現的問題。
5. **推成試玩卡。** `card push --validate` 帶回平台的檢查報告，`card render` 顯示套用顯示規則後的開場白。試玩卡只有你自己看得到。
6. **實際玩。** `hearthroom play` 會送出真正的回合，要花點數，所以助手會先問你。真正的測試是在新對話裡玩 10 到 20 輪，弱模型和強模型都要玩，因為弱模型會先出問題。
7. **一版只修一件事。** 助手修最弱的那一層，用同一組探針重玩，再和上一版比較。
8. **保存。** 你滿意之後，`card push --create` 把它存成私人卡，出現在「我的卡片」。送審和公開由你在網站上決定。

每一步都會記在卡片資料夾的 `README.md` 裡。這個檔案不會送到平台，裡面是每一版的決定、放棄過的方向和證據，下次開新對話也能從上次停下的地方接著做。

## 和別的寫卡工具哪裡不同

- **它提問，不套模板。** 技能列的是要做的決定，不是答案。照著填空就能填出來的卡，評分表上不及格。
- **劇情優先。** 每張卡都要宣告介面是輔助劇情，還是本身就是玩法（`uiRole: assist` 或 `core`）。檢查工具會算出每則回覆有多少字花在狀態區塊上，擠到劇情時會提醒。
- **寫給兩種讀者。** 寫卡的助手拿到的是理由和發揮空間；卡上線後負責聊天的模型常常是又快又弱的那種，所以給它的是精確的格式約定，和一則可以照抄的平凡回合範例。
- **助手會看畫面。** 狀態面板、選項按鈕和主題都要在截圖裡確認過，不是讀原始碼就假設它會動。
- **平台事實只寫在一頁。** 欄位、上限、世界書的行為、顯示規則、聊天頁和 CLI 指令，只寫在[`references/platform-facts.md`](references/platform-facts.md)。沙盒契約由開源的聊天頁原始碼生成，CI 每週核對一次。

## 裡面有什麼

### 入口與操作

| 技能 | 用在 |
|---|---|
| `using-hearthroom` | 入口。看懂需求，分到最貼切的技能。 |
| `hearthroom-creation-conductor` | 從模糊的點子一路做到測過的試玩卡。 |
| `hearthroom-cli-operator` | 安裝、登入，讀懂 CLI 的 JSON、錯誤和結束碼。 |

### 想清楚點子

| 技能 | 用在 |
|---|---|
| `hearthroom-premise-workshop` | 把一種感覺、梗或類型展開成幾個值得比較的方向。 |
| `hearthroom-tension-weaver` | 點子好看卻動不起來：補上代價、「為什麼是現在」和玩家的籌碼。 |
| `hearthroom-archetype-director` | 選定一種主要卡型：陪伴、劇情、遊戲或生成器。 |
| `hearthroom-card-blueprint` | 動筆前先設計人物、關係、世界、聲線、第一場戲和遊玩迴圈。 |

### 人物與世界

| 技能 | 用在 |
|---|---|
| `hearthroom-character-core` | 角色想要什麼、矛盾在哪、底線是什麼、被逼急了會怎麼做。 |
| `hearthroom-relationship-architect` | 戀愛、友情、對手、師徒關係裡的信任、摩擦和節奏。 |
| `hearthroom-world-engineer` | 勢力、地點、世界規則和世界書規劃，不把設定一口氣倒給玩家。 |
| `hearthroom-voice-director` | 台詞沒個性、口頭禪用太多、一拒絕就出戲。 |
| `hearthroom-talk-example-curator` | 判斷要不要範例對話，以及一則範例該教會模型什麼。 |
| `hearthroom-detail-engineer` | 角色定義太薄、只有生平，或換個模型就跑掉。 |

### 遊玩與長線

| 技能 | 用在 |
|---|---|
| `hearthroom-opening-director` | 讓開場白真的開始一場戲，而不只是打招呼。 |
| `hearthroom-agency-designer` | 玩家只能旁觀，選了什麼都不會改變結果。 |
| `hearthroom-state-economist` | 追蹤哪些狀態、放在哪裡、哪些數值條該砍掉。 |
| `hearthroom-longplay-architect` | 玩幾輪就沒戲：一直重複開場、選擇沒有被記住。 |
| `hearthroom-boundary-designer` | 成人、強烈情緒或涉及同意的卡，以及不出戲的拒絕。 |

### 卡型

| 技能 | 用在 |
|---|---|
| `hearthroom-play-engineer` | RPG、生存、模擬器：數值、資源、任務和回合規則。 |
| `hearthroom-scenario-architect` | 懸疑和劇情卡：代價、分支、線索和揭露的節奏。 |
| `hearthroom-daily-life-architect` | 安靜的陪伴卡和日常卡，不讓它變得平淡。 |
| `hearthroom-generator-architect` | 要交出能用的成品，而不是只給建議的卡。 |
| `hearthroom-ensemble-director` | 多個角色同場：人數、鏡頭分配和聲線區隔。 |
| `hearthroom-series-architect` | 從同一個概念延伸出的系列、外傳和變體。 |

### 素材與第一印象

| 技能 | 用在 |
|---|---|
| `hearthroom-material-distiller` | 把筆記、設定集或貼上來的資料，收成一張卡裝得下的量。 |
| `hearthroom-originality-adapter` | 同人和「像 X 但要原創」：哪些保留、哪些改掉。 |
| `hearthroom-sample-calibrator` | 借好範例的結構，但不照抄。 |
| `hearthroom-profile-packager` | 卡名、簡介和標籤：別人為什麼會點開它。 |
| `hearthroom-visual-identity-director` | 頭像、背景和主視覺要跟文字講的是同一件事。 |
| `hearthroom-language-stylist` | 語氣、稱呼、標點，以及繁簡混用。 |

### 畫面

| 技能 | 用在 |
|---|---|
| `hearthroom-presentation-director` | 動筆前先決定畫面做什麼：純文字、HTML、面板還是選項。 |
| `hearthroom-sandbox-kit` | 做狀態面板、選項按鈕、主題、設定抽屜或釘選列。 |
| `hearthroom-render-review` | 看渲染報告和截圖：面板沒出現、畫了兩次、規則失效。 |

### 撰寫、測試與保存

| 技能 | 用在 |
|---|---|
| `hearthroom-card-author` | 寫或修補卡片檔案，推成試玩卡。 |
| `hearthroom-field-finalizer` | 寫入檔案前的最後一遍：佔位符、上限、Markdown 和 JSON。 |
| `hearthroom-token-architect` | 欄位超過上限、設定重複、HTML 太肥、狀態區塊太佔字數。 |
| `hearthroom-instruction-guardrail` | 玩著玩著跑掉：回得像助理、格式壞掉、狀態格式漂移。 |
| `hearthroom-chat-simulation` | 設計試玩、判讀對話紀錄，判斷要不要再花點數多玩一輪。 |
| `hearthroom-quality-auditor` | 評分表、品質等級，和最先該修的三件事。 |
| `hearthroom-card-doctor` | 好幾個問題同時出現，不知道先修哪個。 |
| `hearthroom-iteration-director` | 看著證據決定下一步：修一處、重玩，還是停手。 |
| `hearthroom-collaboration-director` | 把「差不多了但怪怪的」變成具體的決定。 |
| `hearthroom-publish-readiness` | 把試玩卡存成私人卡，送審前再檢查一遍。 |

### 倉庫結構

```text
skills/        43 個技能，每個一份 SKILL.md，從 using-hearthroom 進入
references/    共用指南；platform-facts.md 是平台事實的唯一出處
assets/
  sandbox-kit/ 狀態面板、選項按鈕、主題、抽屜和釘選列，建置成顯示規則
  probe-card/  在真正的聊天頁外殼裡核對沙盒契約的探針卡
scripts/       check-card.mjs（與 hearthroom card check 的檢查相同）、沙盒契約、驗證器
examples/      虛構的需求範例和樣本骨架
evals/         比較技能改版前後用的提示詞與斷言
```

## 費用與界線

- 起草、推送、檢查、預覽和渲染都不花錢，只算你的助手本身的用量。
- 只有 `play -m` 會生成回覆。它花的是你的點數，要加 `--allow-spend`，助手在第一輪之前會先問你。
- 試玩卡在最後一次推送後 3 天過期，一個帳號最多同時 5 張。
- 助手只動試玩卡和你自己的私人卡，絕不替你送審或公開。

## 讓這套技能變得更好

這套技能靠真實的寫卡工作變好。助手發現某個技能寫錯或少了什麼時，會用通用的寫法修正那個技能或指南，不寫卡名、ID 或任何私人內容；再跑 `npm run validate` 和 `npm test`、提交，然後告訴你改了什麼、為什麼改。要你同意之後才會推送。`using-hearthroom` 也會在工作時提醒助手這件事。

歡迎到 [issues](https://github.com/hearthroom/skills/issues) 回報問題或提出建議。回報平台事實有誤時，請附上你對照的指令或頁面。

## 開發

```bash
npm test          # 驗證器、卡片檢查器、沙盒套件的解析與建置
npm run validate  # 結構、引用、清單、禁用詞
node scripts/sync-contract.mjs --check   # 沙盒契約與聊天頁一致
```

`scripts/manifest.json` 列出所有技能、指南、資產和腳本。目錄和清單對不上、技能引用了不存在的指南、套件腳本解析失敗或 JSON 格式錯誤時，驗證器都會失敗。CI 在每次推送到 main 和每個 PR 上跑這三個指令，每週再跑一次，以防聊天頁的契約改了。

## 社群

分享卡片、提問和開發討論都在 [Discord](https://discord.gg/C7m85YPHmK)。相關專案：

- [hearthroom/hearthroom](https://github.com/hearthroom/hearthroom)：社群網站
- [hearthroom/cli](https://github.com/hearthroom/cli)：`hearthroom` 命令列工具
- [hearthroom/moonstage](https://github.com/hearthroom/moonstage)：開源的聊天頁

## 授權

[MIT](LICENSE)。部分內容衍生自一套以 MIT 授權的前身工具包，沙盒套件沿用以 MIT 授權的 tavern-mmd 專案的做法。兩者的署名都寫在 `LICENSE` 裡。
