# Hearthroom skills

**[English](README.md) · 繁體中文**

這是一組技能，教會你手上的 AI 編程助手怎麼替 [Hearthroom](https://hearthroom.club)
寫出一張好的角色卡，並且用 [`hearthroom` 命令列工具](https://cli.hearthroom.club)
在終端機裡直接推上去、驗證、渲染、試玩。

CLI 負責把檔案送去、把證據帶回來；這些技能負責寫卡這門手藝：前提、人物、關係、
世界與 Lorebook、開場白、聲線、狀態、呈現、診斷與迭代。所有關於平台本身的說法，
都只來自一頁：[`references/platform-facts.md`](references/platform-facts.md)。

## 安裝

Claude Code：

```bash
claude plugin marketplace add hearthroom/skills
claude plugin install hearthroom
```

Codex：

```bash
codex plugin marketplace add hearthroom/skills
codex plugin add hearthroom@hearthroom-skills
```

任何讀得到檔案的助手：clone 這個倉庫，在它的規則檔加一句：

```
寫、審或測 Hearthroom 角色卡時，先讀 <路徑>/skills/using-hearthroom/SKILL.md，照裡面的路由表走。
```

另外要裝 CLI：`curl -fsSL https://raw.githubusercontent.com/hearthroom/cli/main/install.sh | sh`，
然後 `hearthroom auth login`。

## 可以跟助手怎麼說

> 我想做一個為了保護別人而說謊的燈塔守護人。幫我做一張卡，推成試玩卡。

> 這張卡聊三輪就沒東西了，查一下為什麼，然後修掉。

> 把開場白渲染出來，告訴我狀態欄那條規則到底有沒有套上。

> 用第二個開場白玩兩輪，告訴我玩家會在哪裡失去興趣。

助手會從 `using-hearthroom` 出發，挑最窄的技能，改卡片資料夾裡的檔案，然後跑
`card push --validate`、`card render`；只有你同意花點數時才跑 `play --allow-spend`。

## 裡面有什麼

- `skills/using-hearthroom` 替每個請求分流。
- `skills/hearthroom-cli-operator` 操作 CLI、讀它的 JSON。
- 塑形：前提工作坊、類型導演、人物核心、關係架構、世界工程、張力編織、
  能動性設計、開場導演、聲線導演、對話範例策展、狀態經濟、長篇架構。
- 卡片類型：玩法工程、劇情架構、日常架構、生成器架構、群像導演、系列架構。
- 素材與包裝：素材蒸餾、原創改編、樣本校準、資料包裝、視覺識別、邊界設計、
  語言風格、設定工程、token 架構、指令護欄。
- 呈現：呈現導演、沙盒套件、渲染審查。`assets/sandbox-kit/` 是這個工具包自己的沙盒頁套件：
  模型寫的狀態區塊畫成氣泡內面板、深淺兩套的主題 preset、設定抽屜、釘選列、選項鈕，
  由 `build.mjs` 編成顯示規則。`scripts/check-card.mjs` 用 `scripts/sandbox-contract.json`
  （從聊天頁原始碼生成的作者 API 清單）檢查整個卡片資料夾。Hearthroom 的沙盒頁跟 MMD
  新版沙盒同形，`hearthroom card import` 也讀得懂那個格式；差異列在平台事實頁。
- 組裝與迴圈：卡片藍圖、卡片作者、欄位定稿、品質稽核、卡片醫生、協作導演、
  對話模擬、迭代導演、送審就緒。
- `references/` 是共用的手藝指南；`examples/` 是合成的簡報與樣本形狀。

## 費用與界線

構思、驗證、渲染只花你助手自己的用量。`play -m` 會扣你的點數，要加 `--allow-spend`；
技能會在第一輪之前先問過你。所有工作都留在試玩卡或你自己的私有卡上；
除非你自己到網站上送審，否則不會有東西被送出去。

## 讓這些 skill 越用越好

這些 skill 靠真實寫卡來改進。助手用它們寫卡時，若發現某個 skill 寫錯或缺了什麼，應該順手把該 skill 或參考文件改好（寫成通用結論，不放卡名、ID、私人內容），跑 `npm run validate` 和 `npm test`，用這個倉庫的作者身分 commit，然後告訴合作的人改了什麼、為什麼改；對方同意後才 push。入口 skill `using-hearthroom` 也寫了同樣的規則，助手工作時就看得到。

## 開發

```bash
npm test          # 驗證器的單元測試
npm run validate  # 結構、引用、清單、禁用詞
```

`scripts/manifest.json` 列出所有技能、參考文件、資產與腳本；樹跟清單不一致、技能引用了不存在的
參考、套件腳本不能解析或 JSON 無效、或者混進了來源平台的詞彙，驗證器就會紅。`tests/` 也涵蓋套件的
解析器與建置，以及卡片檢查器。部分內容源自一套 MIT 授權的前身工具包，套件的方法參考了 MIT 授權的
tavern-mmd 專案，出處都寫在 `LICENSE`。
