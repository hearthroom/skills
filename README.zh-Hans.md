<p align="center">
  <a href="https://hearthroom.club"><img src="https://raw.githubusercontent.com/hearthroom/hearthroom/main/web/public/icons/icon-192.png" width="96" alt=""></a>
</p>

<h1 align="center">Hearthroom skills</h1>

<p align="center">
  给 AI 编程助手用的写卡技能。助手写好角色卡，自己玩一遍、看一遍画面，再把玩家会在意的地方改掉。
</p>

<p align="center">
  <a href="https://hearthroom.club/guide"><img src="https://img.shields.io/badge/guide-hearthroom.club-E89064" alt="写卡指南"></a>
  <a href="https://discord.gg/C7m85YPHmK"><img src="https://img.shields.io/badge/Discord-join%20the%20community-5865F2?logo=discord&logoColor=white" alt="Discord"></a>
  <a href="https://github.com/hearthroom/skills/actions/workflows/validate.yml"><img src="https://github.com/hearthroom/skills/actions/workflows/validate.yml/badge.svg" alt="Validate"></a>
  <a href="LICENSE.md"><img src="https://img.shields.io/badge/license-FSL--1.1--ALv2-blue" alt="License: FSL-1.1-ALv2"></a>
  <a href="https://github.com/hearthroom/skills/commits/main"><img src="https://img.shields.io/github/last-commit/hearthroom/skills" alt="Last commit"></a>
</p>

<p align="center">
  <a href="README.md">English</a> ·
  <a href="README.zh-Hant.md">繁體中文</a> ·
  <b>简体中文</b>
</p>

<p align="center">
  <img src="docs/readme/showcase.webp" width="860" alt="用这套技能写成的一张卡的三个手机界面：标题页、哥布林村的像素场景和下方的剧情文字、几天后的一个回合（列出成长变化和下一步选项，也能自己写）">
</p>
<p align="center"><sub>用这套技能和沙盒套件写成的卡，截图来自 CLI 的离线预览。</sub></p>

## 这是什么

[绮梦社](https://hearthroom.club)（Hearthroom）是一个开放的 AI 角色卡社区。一张卡就是一个装着纯文本文件的文件夹，[`hearthroom` 命令行工具](https://cli.hearthroom.club)可以在终端里把文件夹推成私人试玩卡，再检查、渲染、试玩。

CLI 负责搬文件，文件里写什么由这套技能决定。这里有 43 个技能和 48 份共享指南，覆盖前提、人物、关系、世界和世界书、开场白、声线、状态、界面、诊断与迭代，每一项最后都落到一个助手能自己跑的检查上。Claude Code、Codex、Cursor，以及任何能读文件、能执行命令的助手都能用。

你只要说想要什么样的卡。助手只问会改变结果的问题，然后写出文件夹，按玩家真正接触它的方式测一遍，并把自己做了哪些决定、为什么这样决定记下来。

## 快速开始

把这句话发给你的助手。它会装好 CLI 和这套技能，再用一次性验证码帮你登录：

```text
从 https://hearthroom.club/agent-setup.md 读取设置步骤并照着做，帮我准备好在 Hearthroom 写酒馆角色卡的环境。
```

装好后加载技能：Claude Code 里执行 `/reload-plugins`，Codex 和其他助手新开一个会话。整个设置过程不花点数。

<details>
<summary>手动安装</summary>

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

然后执行 **Developer: Reload Window** 或重启 Cursor。以后更新就执行 `git -C ~/.cursor/plugins/local/hearthroom pull`。

**其他助手**（OpenCode、Gemini CLI 等）：要 clone 整个仓库，因为技能会读取 `references/` 下的共享文件。

```sh
git clone https://github.com/hearthroom/skills ~/.hearthroom/skills
```

然后在助手的用户级指令文件里加一句：

```text
写、审或测 Hearthroom 角色卡时，先读 ~/.hearthroom/skills/skills/using-hearthroom/SKILL.md，按里面的路由表走。
```

**CLI**

```sh
curl -fsSL https://raw.githubusercontent.com/hearthroom/cli/main/install.sh | sh   # macOS、Linux
hearthroom auth login
```

Windows 用 `irm https://raw.githubusercontent.com/hearthroom/cli/main/install.ps1 | iex`。Homebrew、Scoop 和从源码构建的方法见 [CLI 的 README](https://github.com/hearthroom/cli#install)。截图检查（`card preview --check`）还需要 Chrome、Chromium 或 Edge。

</details>

## 可以这样跟助手说

> 写一张修仙卡：我是被逐出宗门的废柴，师姐偷偷帮我，张力是她一出手就会被发现。状态只要修为一项。先做成试玩卡，告诉我最弱的一层。

> 导入这张 SillyTavern 卡，告诉我为什么聊三轮就没话说，只修这一个问题。

> 加一个显示好感度和所在地点的状态窗口，给我看手机上深色、浅色两种截图。

> 用第二个开场白，在弱一点和强一点的模型上各玩十轮，告诉我玩家会在第几轮失去兴趣。

> 这张卡可以送审了吗？列出还要改的地方，先别动任何文件。

SillyTavern 的 PNG、JSON、CHARX 和魅魔岛三件套都能直接导入。怎样下指令效果最好（给处境而不是只给类型、给一句台词而不是一串形容词、讲清楚做到哪一步算完成），写在[写卡指南](https://hearthroom.club/guide)里。

## 一张卡是怎么做出来的

1. **分流。** `using-hearthroom` 先看你手上有什么（一种感觉、定好的前提、素材、导入的卡、试玩记录或反馈），找出玩家最先卡住的那一层（封面和标题、简介、开场白、之后的回合），再加载最对口的那个技能。
2. **先说出最常见的写法，再把它扔掉。** 动手设计前，助手先讲出“任何模型都会这么写”的那张卡，真正要写的卡才能走别的路。
3. **写成文件夹。** 长文本放 Markdown，世界书、规则和图片各有各的文件，你都能打开看、直接改。
4. **先在本地检查，不花钱。** `hearthroom card check` 检查文件夹里的规则、标记和脚本调用。`hearthroom card preview --check` 用无头 Chrome 运行真实的聊天页外壳，把每种状态都截下来：手机和桌面、深色和浅色，另外拼一张总览图，并列出发现的问题。
5. **推成试玩卡。** `card push --validate` 带回平台的检查报告，`card render` 显示套用显示规则后的开场白。试玩卡只有你自己能看到。
6. **真正去玩。** `hearthroom play` 会发出真实的回合，要花点数，所以助手会先问你。真正的测试是在新会话里玩 10 到 20 轮，弱模型和强模型都要玩，因为弱模型最先出问题。
7. **一版只改一件事。** 助手修最弱的那一层，用同一组探针重玩，再和上一版对比。
8. **保存。** 你满意之后，`card push --create` 把它存成私人卡，出现在“我的卡片”里。送审和公开由你在网站上决定。

每一步都会记在卡片文件夹的 `README.md` 里。这个文件不会发送到平台，里面是每一版的决定、放弃过的方向和证据，下次开新会话也能从上次停下的地方继续。

## 和其他写卡工具有什么不同

- **它提问，不套模板。** 技能列出的是要做的决定，不是答案。照着填空就能填出来的卡，在评分表上不及格。
- **剧情优先。** 每张卡都要声明界面是辅助剧情，还是本身就是玩法（`uiRole: assist` 或 `core`）。检查工具会算出每条回复有多少字花在状态区块上，挤占剧情时会提醒。
- **写给两种读者。** 写卡的助手拿到的是理由和发挥空间；卡上线后负责聊天的模型往往又快又弱，所以给它的是精确的格式约定，和一条可以照抄的普通回合示例。
- **助手会看界面。** 状态面板、选项按钮和主题都要在截图里确认过，而不是读了源码就默认它能用。
- **平台事实只写在一页。** 字段、上限、世界书的行为、显示规则、聊天页和 CLI 命令，只写在[`references/platform-facts.md`](references/platform-facts.md)。沙盒契约由开源聊天页的源码生成，CI 每周核对一次。

## 里面有什么

### 入口和操作

| 技能 | 用于 |
|---|---|
| `using-hearthroom` | 入口。读懂需求，分到最对口的技能。 |
| `hearthroom-creation-conductor` | 从模糊的想法一路做到测过的试玩卡。 |
| `hearthroom-cli-operator` | 安装、登录，读懂 CLI 的 JSON、报错和退出码。 |

### 想清楚点子

| 技能 | 用于 |
|---|---|
| `hearthroom-premise-workshop` | 把一种感觉、梗或类型展开成几个值得比较的方向。 |
| `hearthroom-tension-weaver` | 点子好看但动不起来：补上代价、“为什么是现在”和玩家的筹码。 |
| `hearthroom-archetype-director` | 定下一种主要卡型：陪伴、剧情、游戏或生成器。 |
| `hearthroom-card-blueprint` | 动笔前先设计人物、关系、世界、声线、第一场戏和游玩循环。 |

### 人物和世界

| 技能 | 用于 |
|---|---|
| `hearthroom-character-core` | 角色想要什么、矛盾在哪、底线是什么、被逼急了会怎么做。 |
| `hearthroom-relationship-architect` | 恋爱、友情、对手、师徒关系里的信任、摩擦和节奏。 |
| `hearthroom-world-engineer` | 势力、地点、世界规则和世界书规划，不把设定一股脑倒给玩家。 |
| `hearthroom-voice-director` | 台词没个性、口头禅太多、一拒绝就出戏。 |
| `hearthroom-talk-example-curator` | 判断要不要示例对话，以及一条示例该教会模型什么。 |
| `hearthroom-detail-engineer` | 角色定义太单薄、只有生平，或换个模型就跑偏。 |

### 游玩和长线

| 技能 | 用于 |
|---|---|
| `hearthroom-opening-director` | 让开场白真正开始一场戏，而不只是打招呼。 |
| `hearthroom-agency-designer` | 玩家只能旁观，选什么都改变不了结果。 |
| `hearthroom-state-economist` | 追踪哪些状态、放在哪里、哪些数值条该砍掉。 |
| `hearthroom-longplay-architect` | 玩几轮就没戏：反复重开场、选择没被记住。 |
| `hearthroom-boundary-designer` | 成人向、情绪强烈或涉及同意的卡，以及不出戏的拒绝。 |

### 卡型

| 技能 | 用于 |
|---|---|
| `hearthroom-play-engineer` | RPG、生存、模拟器：数值、资源、任务和回合规则。 |
| `hearthroom-scenario-architect` | 悬疑和剧情卡：代价、分支、线索和揭晓的节奏。 |
| `hearthroom-daily-life-architect` | 安静的陪伴卡和日常卡，不让它变得平淡。 |
| `hearthroom-generator-architect` | 要交出能用的成品，而不是只给建议的卡。 |
| `hearthroom-ensemble-director` | 多个角色同场：人数、镜头分配和声线区分。 |
| `hearthroom-series-architect` | 从同一个概念延伸出来的系列、外传和变体。 |

### 素材和第一印象

| 技能 | 用于 |
|---|---|
| `hearthroom-material-distiller` | 把笔记、设定集或粘贴进来的资料，压成一张卡装得下的量。 |
| `hearthroom-originality-adapter` | 同人和“像 X 但要原创”：哪些保留、哪些改掉。 |
| `hearthroom-sample-calibrator` | 借鉴好样本的结构，但不照抄。 |
| `hearthroom-profile-packager` | 卡名、简介和标签：别人为什么会点开它。 |
| `hearthroom-visual-identity-director` | 头像、背景和主视觉要和文字说的是同一件事。 |
| `hearthroom-language-stylist` | 语气、称呼、标点，以及繁简混用。 |

### 界面

| 技能 | 用于 |
|---|---|
| `hearthroom-presentation-director` | 动笔前先决定界面做什么：纯文本、HTML、面板还是选项。 |
| `hearthroom-sandbox-kit` | 做状态面板、选项按钮、主题、设置抽屉或钉选栏。 |
| `hearthroom-render-review` | 看渲染报告和截图：面板没出来、画了两次、规则失效。 |

### 撰写、测试和保存

| 技能 | 用于 |
|---|---|
| `hearthroom-card-author` | 编写或修补卡片文件，推成试玩卡。 |
| `hearthroom-field-finalizer` | 写入文件前的最后一遍：占位符、上限、Markdown 和 JSON。 |
| `hearthroom-token-architect` | 字段超出上限、设定重复、HTML 臃肿、状态区块太占字数。 |
| `hearthroom-instruction-guardrail` | 玩着玩着跑偏：回得像助理、格式坏掉、状态格式漂移。 |
| `hearthroom-chat-simulation` | 设计试玩、判读对话记录，判断值不值得再花点数多玩一轮。 |
| `hearthroom-quality-auditor` | 评分表、质量等级，以及最先该修的三件事。 |
| `hearthroom-card-doctor` | 好几个问题同时出现，不知道先修哪个。 |
| `hearthroom-iteration-director` | 根据证据决定下一步：改一处、重玩，还是停手。 |
| `hearthroom-collaboration-director` | 把“差不多了但总觉得不对”变成具体的决定。 |
| `hearthroom-publish-readiness` | 把试玩卡存成私人卡，送审前再检查一遍。 |

### 仓库结构

```text
skills/        43 个技能，每个一份 SKILL.md，从 using-hearthroom 进入
references/    共享指南；platform-facts.md 是平台事实的唯一来源，
               writing-skills.md 是修改任何一份的标准
assets/
  sandbox-kit/ 状态面板、选项按钮、主题、抽屉和钉选栏，构建成显示规则
  probe-card/  在真实聊天页外壳里核对沙盒契约的探针卡
scripts/       check-card.mjs（和 hearthroom card check 的检查相同）、沙盒契约、
               校验器、line-budget.json
.out-of-scope/ 已经否决过的想法，每个一个文件并写明原因（见 SCOPE.md）
examples/      虚构的需求示例和样本骨架
evals/         对比技能改版前后用的提示词和断言
```

## 费用和边界

- 起草、推送、检查、预览和渲染都不花钱，只算你的助手本身的用量。
- 只有 `play -m` 会生成回复。它花的是你的点数，需要加 `--allow-spend`，助手在第一轮之前会先问你。
- 试玩卡在最后一次推送后 3 天过期，一个账号最多同时有 5 张。
- 助手只动试玩卡和你自己的私人卡，绝不替你送审或公开。

## 让这套技能变得更好

这套技能靠真实的写卡工作变好。助手发现某个技能写错了或缺了什么时，会连同卡片一起修正这套技能，告诉你改了什么、为什么改，你同意之后才会推送。不管是助手还是人提的修改，都要过同样两页：[`SCOPE.md`](SCOPE.md) 定门槛（真实写卡时出过的问题，而且不是 [`.out-of-scope/`](.out-of-scope/) 里已经否决过的想法），[`references/writing-skills.md`](references/writing-skills.md) 说明教训该放哪里、怎么写给能力强的助手看：写目标、理由和边界，不写一步一步的菜谱。机器能检查的部分由校验器把关，包括每个文件的行数预算。详见 [`CONTRIBUTING.md`](CONTRIBUTING.md)。

欢迎在 [issues](https://github.com/hearthroom/skills/issues) 报告问题或提出建议。报告平台事实有误时，请附上你对照的命令或页面。

## 开发

```bash
npm test          # 校验器、卡片检查器、沙盒套件的解析和构建
npm run validate  # 结构、引用、清单、措辞、行数预算
node scripts/sync-contract.mjs --check   # 沙盒契约和聊天页一致
```

`scripts/manifest.json` 列出所有技能、指南、资源和脚本。目录和清单对不上、技能引用了不存在的指南、套件脚本解析失败或 JSON 格式错误时，校验器都会报错。CI 在每次推送到 main 和每个 PR 时运行这三条命令，每周再跑一次，以防聊天页的契约有变。

## 社区

分享卡片、提问和开发讨论都在 [Discord](https://discord.gg/C7m85YPHmK)。相关项目：

- [hearthroom/hearthroom](https://github.com/hearthroom/hearthroom)：社区网站
- [hearthroom/cli](https://github.com/hearthroom/cli)：`hearthroom` 命令行工具
- [hearthroom/moonstage](https://github.com/hearthroom/moonstage)：开源的聊天页

## 许可证

[Functional Source License 1.1（ALv2 Future License）](LICENSE.md)，简称 FSL-1.1-ALv2，和聊天页用的是同一份许可证。你可以出于任何目的使用、复制、修改和分发这套技能，唯独不能用来做竞争性的产品或服务；副本和衍生作品都沿用同样的条款。每个版本发布满两年后转为 Apache 2.0。0.3.20 及以前的版本以 MIT 许可发布，保持不变。

用这套技能写出来的卡是你自己的内容，不算这套工具的衍生作品，不受这份许可证约束；`build.mjs` 放进卡片显示规则里的沙盒套件代码也一样。名称和标志不在许可范围内。衍生自 MIT 许可项目的部分，原始署名保留在 [`THIRD-PARTY-NOTICES.md`](THIRD-PARTY-NOTICES.md)。
