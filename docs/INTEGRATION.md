# 手册真源与提示词页（现行）

> 2026-10-24 重写。此前把 `corpus/prompts/index.json` 与 `server/data/taxonomy.json` 当真源，
> 那是错的：前者是早期前端快照 `bundle.json` 的回灌产物（逐字相同、已过时），
> 后者只是类/型目录元数据。**真源是手册文件本身。**

## 一、真源在哪

```
corpus/prompts/
  <NN>-型/<册>.md      ← 真源。每册的 `## 4. 问句表` 就是提示词（共 34 册）
  0X-<类名>.md          ← 类主件（判读总则，不参与回写）
```

`server/data/taxonomy.json` 只用于一件事：把材料里的英文 slug（`insider-filing`）
对到中文册名（`内部人申报.md`）。**它不提供任何行内容。**

**`corpus/prompts/index.json` 已删除**（不是"不再引用"，是文件本身没了）。
行的 `kind`（问/数，只影响界面上的行头标记）改为从读法文本推出：
读法或问题任一列出现「只抄材料给出的数字」这句数字类套话 ⇒ `data`，否则 `question`。
这条规则与旧 `index.json` 里的值 **164/164 完全一致**；删文件前后服务都返回 34 型。

同时删掉的**旧世界脚本**（它们会破坏数据，不是无害的死代码）：

| 删掉的 | 为什么必须删 |
|---|---|
| `server/seed.mjs` | 从 `bundle.json` 反推生成材料。**实测跑一次就重写了 1482 份材料、新建 630 个假材料目录**——正是交接文档警告过的"假材料"事故 |
| `server/regen-templates.mjs` | 按已废除的版本模型写 `template.vN.md` / `prompt.vN.md`，与手册真源并行造第二套定义 |
| `server/migrate-layout.mjs` | 一次性目录迁移，早已跑完 |
| `tools/restore-prompts.mjs`、`tools/clean-test-versions.mjs` | 服务于旧的多版本模型；手册是当前态，没有"版本"可复原 |

`server/store.mjs` 里对应的 `loadPrompts / savePrompts / putVersion / versionsOf /
writeTemplate / readTemplate / writePrompt / readPrompt / PATHS.prompts` 一并删除（207 → 95 行）。
`server/new-material.mjs` 改为按手册当前问句表现场 `renderTemplate()`，不再读 `template.vN.md`。

## 二、34 册现已统一

| 项 | 统一后 |
|---|---|
| 章节 | `## 4. 问句表`（中文序号册为 `## 四、问句表`，保留该册风格） |
| 表头 | `# · 问什么 · 读法 · 拿到什么算过 · 答不上来怎么写 · 频次 · 落哪个篮子` |
| 问题列 | 第 2 列 |
| 读法列 | 第 3 列 |

统一**没有覆盖**任何原有章节：问句表插入为第 4 节，原有编号 ≥4 的章节整体顺延；
小数子节（`1.5` / `4.5`）与无编号节（`读前 30 秒` / `附·`）一律不动。

验收判据（`node tools/verify-unified.mjs`，当前全通过）：

- 34/34 有「问句表」标题
- 主节号无重复、无风格混排
- **问句表取值集合相对 git HEAD 零丢失**

> `05-型/AI产业链地图.md`（slug `05-AIMAP`）是本轮新建的第 34 册，11 条问句，
> 覆盖：定边界 → 分层 → 切环 → 定位主体 → 标瓶颈，以及每环六个刻度（规模/增速/格局/
> 毛利/壁垒/交期）与卡点识别的四条判据。它与《产业链上下游》《产业链跟踪》的分工
> 写在册首：**先画图 → 再刻尺 → 后跑数**。

## 三、回写只有一条路径

`server/manual.mjs` 的 `writeRows(file, rows)`：

1. 定位 `## 4. 问句表` 那一节
2. 在该节里按**表块**找表头像问句表的那一块（不能按 `| Q1 |` 行匹配 ——
   `必过项` 表也是 `| 1 |`，会把整张必过项表吃进来）
3. 只替换目标单元格：第 2 列写问题、第 3 列写读法
4. **其余字节原样**，行尾沿用文件原来的（CRLF 工作树写 LF 会让整份文件在 diff 里"全被重写"）

往返验证：`node tools/check-manual-write.mjs` → 改问题/改读法/增/删/复原，
**复原后与原始逐字节相同**。

## 四、接口

| 端点 | 行为 |
|---|---|
| `GET /prompts` | 33 型的当前问句表（读手册） |
| `GET /prompts/:slug` | 单型，附 `section` / `header` / `file`（供界面显示"这册长什么样"） |
| `PUT /prompts/:slug` | **原地改写手册的问句表**，返回写回统计 |
| `GET /templates/:slug` | 按手册当前问句表现场渲染答题卡 |
| `GET /prompt-versions` | 兼容旧前端，回单版（手册是当前态，无多版） |

手册是**当前态**，没有"按日期回溯"这回事 —— 上一版那套 `effectiveFrom` 版本隔离
随 `index.json` 一起废除。改完即生效，所有日期看到同一份。

缓存带 `mtime+size` 指纹：外部直接改手册，API 下一次读立刻看到
（`node tools/check-cache-invalidation.mjs` 验证，否则会出现"改了手册界面不动、重启才好"）。

## 五、联调工具

```bash
npm run server    # 5280
npm run dev       # 5277

node tools/verify-unified.mjs         # 手册统一验收（34 册）
node tools/check-manual-parse.mjs     # 解析自检（全部册的行数/列位）
node tools/check-manual-write.mjs     # 写回往返（逐字节）
node tools/e2e-readpages.mjs          # 阅读三页 + 提示词页，21 条
node tools/e2e-prompts.mjs            # 提示词页专项，18 条（直接核手册文件，跑完自动复原）
node tools/e2e-ux.mjs                 # 端到端用户体验走查（27 条，纯点击/键盘，每步截图）
node tools/walkthrough.mjs            # 快速走查（旧版，保留）
node tools/check-watch-ignore.mjs     # 写数据目录不触发 Vite 整页重载
node tools/check-cache-invalidation.mjs
```

## 六、迁移工具

一次性脚本已删除（统一已完成，留着只会让人以为还要再跑一遍）。
要用时从 git 历史取：`git show 6f8bba3:InvestSigh-Read/tools/unify-manuals.mjs`。

它们当时做的三件事，记在这里备查：

1. **统一章节与表头**到 `## 4. 问句表` + 7 列固定表头；带两条不变式（表外行不动、
   问句表取值不丢），任一不成立就整体拒写。
2. **删重复问句节**（共识与评级档位、独立研究各一处），判据是**内容包含关系**：
   副本每一行都在保留版里才删。
3. **统一编号风格**、把问句表钉到第 4 位（中文序号册保留 `四、`）。

## 七、已知未做

- 3 册存在**既有**的节号跳跃（`04/内部人申报`、`04/机构持仓申报`、`05/另类数据` 缺第 3 节），
  是这些册原本就没有第 3 节（问句表从第 3 节上移到第 4 节后空出）。
  **按用户口径：不补，就空着**，验收里只报告、不判红。

## 八、读法列曾被污染，现已恢复

**事实经过**（这一段必须留着，否则下一个人会重犯）：

1. `corpus/prompts/index.json` 是早期从 `public/data/bundle.json` 回灌的产物。
   `bundle.json` 里每行读法都被压成同一句默认值
   （`只读材料明确写出的判断：谁在什么时点说了什么，句末带页码…`）。
2. 首次入库那次提交（`1ca8e1c`）之前跑过 `server/seed.mjs`，**用这份被压扁的快照覆盖了真读法**，
   105 行的读法列因此变成同一句套话（另有 78 行的**问题列**也被同样覆盖）。
3. 后续几轮把它当成"原本就这样"，还据此误判「这些是待补写的套话」——**方向完全错了**。

**真读法一直在**，在两个地方：

| 位置 | 内容 |
|---|---|
| `InvestSigh-Workbuddy-frontend/InvestSigh-Read/corpus/prompts/index.json` | 34 型 · 323 行 · **套话 0 条**（唯一完好的副本） |
| 各册 §1「怎么读」与 §3「必过项」正文 | 分层读法与逐项判据（从未被覆盖） |

**恢复方式**：按行 id 从旧壳 `index.json` 取回（id 前缀不同的册按问题语义逐条人工对应；
源里确实没有对应项的 49 行，按该册 §1/§3 的纪律原文补，不是凭空写）。

**恢复后的状态**（`node tools/verify-unified.mjs` 全通过）：

- 34 册 · 281 行 · **套话 0 行 · 空桩 0 行**
- 问题列与读法列都是真内容（例：10-K Q1 读法 = 「Item 1 的 Business 段末尾或 MD&A 首段会给关键运营指标的定义…」）
- `lint-readings`：不合格 0 · 警告 0

> ★ 判据教训：`verify-unified` 的「内容零丢失」曾以 `git HEAD` 为基线，
> 而 HEAD 里读法正是被污染的状态 —— 于是「恢复真读法」被误报成「丢内容」（24 册假红）。
> 基线只能是**未被污染的那份**。同理，旧壳源与手册的行数本来就不同
> （源 10 条 vs 手册 7 条，源是模板节、手册是问句表），按条数比也会永远假红。
