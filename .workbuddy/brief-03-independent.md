# 03 独立研究 · 填卡作业书（本轮 58 份 · 唯一作业规范）

> 你被分到一个 **BIN**（见文末附录），只做你 BIN 里那几份，别的材料一份都不许碰。
> 判据真源是 `corpus/prompts/03-型/独立研究.md`（下称「手册」），本作业书是它的执行版；冲突时以手册为准。
> 一句话定位：**独立研究 = 没有评级、没有目标价、没有合规披露的深度长文**（SemiAnalysis / Stratechery / Citrini / FUNDA / 拾象 / arXiv 论文）。
> 它值钱的不是结论，是**产业逻辑、一手观察与他自建的测算**；所以本批要交的是「**他的估算 ＋ 来源状态**」，不是我们的观点。

## 0. 输入输出

- 输入：`corpus/materials/<材料 id>/pages.json`（`{"pages":[{"n":1,"text":"…"}]}`，`n` **就是**依据区要写的 `p.N`，1 起）、同目录 `content.md`（同内容，图按阅读顺序内联）、`figures/`（可能没有）。
- 输出：`output/meta/<材料 id>/material.md` —— **骨架已生成**，你只填 8 个 `## Qn` 段下的答案正文与 `### 依据`。

**允许改的**（仅此四项）：
1. 8 个 `## Qn` 段下的答案正文与 `### 依据`；
2. frontmatter 的 `title:` —— 换成一句中文人话标题（例：`"SemiAnalysis：Meta 基础设施团队需要一次文化重检（2026-07-21）"`），别再用材料 id 当标题；
3. frontmatter 的 `issuer:` —— 发布机构 + 作者（例：`SemiAnalysis / Dylan Patel 等`、`FUNDA`、`Citrini Research`、`Stratechery / Ben Thompson`、`上海交通大学 Theseus 团队`）；查不到就留空字符串；
4. 删掉正文顶部那两行 `> 骨架已生成，答案待填。…` 的引用块（它现在是假话）。删掉即可，不要补别的话。

**禁止改的**：`id / cat / sub / template / template_version / date / time / kind / ticker / source_pages`；`## Qn · …` 的题号与问题文字一个字符都不许动（**不许合并、不许删题、不许加题**）；不许加 `####`、不许加小节、不许写「回执 / 覆盖 / 自检 / 我已完成」这类机器账；不许建别的文件。

## 1. 先读完，再动笔

**读法（必须逐页落地再读，Read 直接读 pages.json 会被截断）**：

```bash
cd /d/InvestSigh/InvestSigh-Read && mkdir -p .workbuddy/tmp/pg/<短名> && node -e "
const fs=require('fs');const id='<材料 id>';const tag='<短名>';
const p=JSON.parse(fs.readFileSync('corpus/materials/'+id+'/pages.json','utf8'));
p.pages.forEach(g=>fs.writeFileSync('.workbuddy/tmp/pg/'+tag+'/p'+String(g.n).padStart(3,'0')+'.txt',g.text,'utf8'));
console.log(p.pages.length+' pages', p.pages.map(g=>g.n+':'+g.text.length).join(' '));
"
```

然后用 Read 逐页读 `.workbuddy/tmp/pg/<短名>/pNNN.txt`。**页数 = frontmatter 的 `source_pages`，全部读完再动笔**；单页可能上万字，Read 会自动截断时用 `offset`/`limit` 续读。

**长件（>100 页）的合法读法**（手册 §0 的渠道读法就是这么规定的，不是偷懒）：
- 先读前 2–3 页（封面/标题/作者/日期/章节清单）。SemiAnalysis 类把**章节标题全排在头部**，先扫一遍；
- 按章节判相关性：**与 Meta／算力／成本／产能／广告直接相关的节全读**；无关的节（芯片工艺细节、无关公司复盘、宏观随笔）可略读，但要在 Q1 或 Q8 的答案里**一句话交代「哪几节略读了、为什么」**；
- 再用 Grep 在 `.workbuddy/tmp/pg/<短名>/` 里搜关键量（`GW`、`MW`、`capex`、`billion`、`H100`、`rack`、`token`、`\$`）定位数字所在页，回读那段上下文。
- **无论如何不许**只读第一页就写答案。

**图（有图必读图）**：`content.md` 里图片已按阅读顺序内联，`figures/` 文件名 = `阅读序_页_页内序`。只在两种时候必须看图：① 题目要的数值可能只存在于估计表/走势图；② 你准备写「材料未给出此项」——**先确认图里也没有**。
图**不能单独当文字依据**（依据区要逐字原文）：图里有可抄的文字（表头、图题、坐标标签）就抄它并标该页；纯图像就在答案里写「见该页第 k 张图，图内无文字可引」，依据区登该页的图题/图注原文。**禁止把图里的数字 OCR 出来当逐字原文抄。**

## 2. 八问逐题（本型的读法与缺答写法）

> 题目问的是**这份材料的作者**，不是我们。材料主体公司不一定是 Meta（可能是微软、谷歌、Anthropic、英伟达、整个半导体行业），**就材料的主体作答，别硬扯回 Meta**；若主体是行业而非单一公司，答案开头一句点明「本件主体是行业而非某公司」。

| 题 | 要拿到什么（三层：结论 → 具体内容 → 判断） | 材料没有时怎么写 |
|---|---|---|
| **Q1 他的外部估算** | 逐项列：**量名 ＋ 值 ＋ 期间 ＋ 代理变量 ＋ 样本量/口径**，每项**一律标「外部估算」**。例：广告收入行业构成（12 个行业、Meta vs Google 份额、据代理商访谈样本）、单 CPU 可支撑的 DAU、AI 收入 run-rate、单位算力成本。**代理变量与目标量之间没有换算桥的，明写「只能当量级，不能入格」** | 写「**无外部估算**」，并说清全文只有哪些数、为什么那些数不算外部估算（公司自己披露的、或他人已公开的二手引用） |
| **Q2 物理量** | 逐个：**值 ＋ 单位 ＋ 时点 ＋ 来源**，并给**可回溯 / 无法核**。物理量 = GW/MW 电力、机柜数、GPU/TPU 张数、晶圆产能、建筑面积、船期。来源指向海关/环评/招标/卫星/公司公告 ⇒ 可回溯；只写「据估算」「industry checks」而无中间步骤 ⇒ **记来源不可回溯，数值降为旁证** | 「**无法核**」＋ 说明查了哪几处、缺哪一步（这是要上报的红灯，不许当事实） |
| **Q3 四种交付物** | **四选一**：`original`（纯原文）/ `bilingual`（双语句对齐）/ `translation`（纯译文）/ `summary`（要点摘要）。给判断依据（页首是否并列两语、是否只有 `KEY POINTS`、正文是否被压成条目）。再写**同源组**：用下面的《同源对照表》给出同源的其它材料 id，并注明「共用一个来源，不得计成多个独立源」 | 「**未标注**」⇒ 按内容判并写理由（大多数中文件属于此列） |
| **Q4 假设与算式能否复算** | 挑**它最关键的一个结论**，把它给的输入抄成一行算式（`假设 × 数据 ⇒ 结果`），**自己算一遍**，写「复算通过 / 差 X% / 缺某一步不能复算」。这是本型唯一能进模型的东西 | 「**只给结果**」⇒ 标「无法核」；不许拿估算值冒充算出来的 |
| **Q5 脚注指向哪** | 逐个关键数字看脚注/`Source:` 行指向：一手（监管文件、公司公告、行业协会、论文）⇒ **该条可为 Ⅰ 档**；二手（媒体、另一份研究、专家访谈）⇒ Ⅱ；中文译本常把超链接与脚注整段丢掉 ⇒ 按「无脚注」处理 | 「**无脚注**」⇒ 一律 Ⅱ，并说明是原文就没有、还是译本丢失 |
| **Q6 自建口径 / 评级** | 独立研究常自建尺子：ClusterMAX 的 Tier 分级与打分权重、`TCO`、`$/GPU-hour`、「有效算力」、「token 经济」、自建指数。记 **定义 ＋ 算式/打分规则 ＋ 与公司口径的差异（多少、哪个方向）** | 「**未给定义**」⇒ 明确写「该口径不得用」，并说清它出现在哪、被用来支撑什么结论 |
| **Q7 投行关系 / 持仓** | 三项分开：**是否收费顾问 / 是否有投行关系 / 是否持仓或受资助**，各写 `有 / 无 / 未声明`。来源是文末免责声明、作者简介、`PAID` 标记旁、`Disclosure` 段 | 「**未声明**」⇒ 按「关系不明」处理，不得假定独立。**注意：`PAID` 是付费墙标记，不是投行关系**，不能拿它当「无投行关系」的证据 |
| **Q8 行业级判断** | 产能、份额、供需缺口的断言要落到口径：统计的是出货量还是产值、地理范围、年份、含不含某类产品。给「数字 ＋ 来源」 | 「**无数**」⇒ 记「**观点**」不是读数，并写清它凭什么说（访谈？自建模型？） |

**三样不许问**（手册 §0）：评级分布、冲突披露九项、静默期——独立研究**没有**这些法定义务，问了必然「未见」，那是**假缺口**。

## 3. 答案正文的六条硬要求

1. **正文不写页码**：不写「第 N 页」「p.12」「[p.12]」「见 p.12」。页码只出现在依据区。
2. **粒度三层**：① 结论 → ② 具体内容（谁·何时·什么·多少·什么口径）→ ③ 判断（所以什么 / 为什么这么判）。**只有结论 = 不合格**（例如 Q7 只写「未声明」三个字）。
3. **数字四出门**：量名、数值、期间、口径，后面跟一句「所以什么」。「1.6GW」不是答案，「Crusoe 租约 1.6GW、2026 年交付，说明 Meta 的自建与租用是并行而非替代」才是。
4. **「未见」三段式**：未见 ＋ **查了哪里**（哪一页/哪一节/文末有没有 Disclosure）＋ **为何相近的那句不能算本项**。「未见。」两个字 = 与没查无法区分。
5. **未见 ≠ 无**：未见 = 我没找到（可能是载体缺失/译本删节）；无 = 材料明确否认。混起来等于给材料栽赃。
6. **不编 + 讲人话**：材料没写的一律「材料未给出此项」，不许用行业常识补、不许说「一般来说」、不许拿同源另一份的数字填空（要用必须写明「同源另一份材料称」）。术语首现给一句人话（TCO = 总拥有成本含电/机房/运维；Neocloud = 只租算力不卖模型的 GPU 云；D14 = 次日留存到第 14 天）。不写「我已仔细核对」这类自述。

**长度**：每条 150–600 字（Q1 有多项估算、Q4 有算式时可到 800 字）。**八条全填，一条都不许空**——本型的题都答得上，答不上也要写清为什么答不上。

## 4. 依据区怎么写（校验器只认这一种格式）

```
### 依据
- p.3｜Twelve days after launch, the task users most want Muse to handle has not changed
- p.6｜4. Of the cases in our database, 49 provide enough detail to calculate savings: \$35,426 annualized in total
```

- 一行一条 `- p.N｜原文片段`，`N` = `pages.json` 的 `n`，不是你自己数的页。
- **逐字**：从该页 `text` 原样复制，不改字、不概括、不加省略号、不换语序、不补标点。原文 OCR 的错字也要照抄（实测有 `4,7oo`、`\$`、`Meta's` 与 `Meta’s` 混用）。
- **实体码原样**：`&#160;` `&#8201;` `&#8220;` `&#9744;` 照抄；`\$725` 的反斜杠一起抄。
- 数字被拆行很正常（`$` 与 `51,242` 分属两行）：**一行内用空格连起来**即可，校验时空白会被去掉。
- 长表只抄**完整一行**，不抄半行；一条引文 1–3 句，够定位就行。
- **每条有答案的行至少 1 块**（校验器唯一会卡的规则）；一般每题 2–5 块，全份 15–40 块。
- **「材料未给出此项」的行也必须登依据**：登能证明「本件范围就只有这些」的那句（章节清单、`KEY POINTS` 抬头、文末 `Source:` 行、摘要的收尾句）。

**反填充（实测踩过）**：
- 同一段引文**不要在多题重复**；确需同一句支撑两题，最多两次且用法不同。
- 缺答行只登 1–2 条范围证据，别把同一张长表在六题里粘六遍。
- 依据是「支撑这条答案」，不是「证明我很努力」。

## 5. 同源对照表（Q3 必用 · 全批统一口径）

同一份原文常有四种交付物（original / bilingual / translation / summary），**四份是四份文档，不是四份材料**：逐份回执、**共用一个来源**、**不得计成多个独立源**。下表第一列是「根来源」，同一行的所有 id **互为同源**（标 `[已填]` 的已完成，可作参照，但你**只能从自己那份的原文里抄依据**）。

| 根来源 | 同源材料 id（去掉 `03-independent-research-` 前缀） |
|---|---|
| 100,000 H100 Clusters（SemiAnalysis） | `0000-00-00-100kh100clustersbilingual` |
| Agentic Reality（Citrini 2026-09-22） | `0000-00-00-260923AgenticReality` ；`2026-09-23-260923智能体时代消费者智能体时代的连锁反应Ag` |
| FUNDA Weekly Vol.5 | `0000-00-00-FUNDAWeeklyConsumerAgentsT` |
| ClusterMAX 2.0（SemiAnalysis） | `0000-00-00-clustermax2bilingual` ；`2025-11-07-ClusterMAX2` |
| GPT-4 架构（SemiAnalysis） | `0000-00-00-gpt4architecturebilingual` |
| Meta AI 硬件与 CPO（2022-09-15） | `0000-00-00-metaaihardwarecpobilingual` ；`0000-00-00-metaaihardwarecposummary` |
| Meta 反常 AI 基础设施选择（2023-05-06） | `0000-00-00-metabizarreaiinfrachoicebi` ；`…choiceor` ；`…choicesu` |
| Meta Compute: Everyone Wants To Be A Neocloud（2026-07-02） | `0000-00-00-metacomputeneocloudbilingu` ；`…cloudsummary` ；`2026-07-03-MetaComputeEveryoneWantsTo` ；`2026-07-03-META-ComputeNeocloud` **[已填]** |
| FUNDA：自建 NeoCloud 与继续租用不矛盾（2026-07-01） | `2026-07-01-260701Meta自建NeoCloud与继续租用算` ；`2026-07-01-META-NeoCloudVsRent` **[已填]** ；`2026-07-01-火速解读META出租H100与购买先进算力并不矛盾`（中文解读件，作者 Andy，**另行登记**：它转述了 FUNDA，属二手转述） |
| FUNDA Weekly 2026-07-06 | `2026-07-06-260706MetaNeoCloud担忧过度关键AI` |
| Meta 定制芯片（2023-05-19） | `0000-00-00-metacustomsiliconbilingual` ；`…siliconsummary` |
| Meta 基础设施团队文化重塑（2026-07-21） | `0000-00-00-metainfracultureresetbilin` ；`…origi` ；`…summa` ；`2026-07-21-META-InfraCultureReset` **[已填]** |
| Meta Superintelligence（2025-07-11） | `0000-00-00-metasuperintelligencebilin` ；`…origi` ；`…summa` ；`…trans` |
| The Future of Meta Superintelligence：一年进展（2026-07-09） | `0000-00-00-metamsl1yrbilingual` ；`…msl1yrsummary` ；`2026-07-10-Meta超级智能的未来一年进展更新TheFuture` ；`2026-07-10-META-1yrProgress` **[已填]** |
| Q3 2022 半导体综述 | `0000-00-00-q32022semiroundupbilingual` ；`…original` |
| Scaling Laws / O1 Pro（SemiAnalysis） | `0000-00-00-scalinglawso1probilingual` |
| FUNDA Preview META 4Q25（2026-01-26） | `2026-01-26-260126Meta四季报预览四季度喜忧参半一季度有` ；`2026-01-26-META-Preview4Q25` **[已填]** |
| FUNDA Review META 4Q25（2026-01-29） | `2026-01-29-260129Meta四季报一季度加速增长驱动因素ME` ；`2026-01-29-META-Review4Q25` **[已填]** |
| 拾象 Best Ideas（2026-02） | `2026-02-05-深度讨论高价值Agent拾象BestIdeas` |
| FUNDA Weekly 2026-03-15 / 04-13 / 07-13 / 08-03 / 01-05 | 各自单份，无同源 |
| FUNDA Deep TikTok 1Q26（2026-04-27） | `2026-04-27-260427TikTok一季度更新对Meta和谷歌尚` |
| FUNDA Preview APP 1Q26（2026-05-04） | `2026-05-04-260504AppLovin一季报未见Meta冲击电` |
| Stratechery：Google/Meta 财报（2026-05-04） | `2026-05-05-谷歌Meta季报点评StratecherybyBen` |
| Exponential View：AI 经济现状（2026-06-25） | `2026-06-29-202606ExponentialView` |
| SemiAnalysis：Anthropic 3Q26 财务（2026-07-08） | `2026-07-08-SemiAnalysis今天关于Anthropic的` |
| Citrini Semis：All Along the AI Watchtower（2026-07-20） | `2026-07-20-260720守望AI瞭望塔AllAlongtheAI` |
| SemiAnalysis：Gemini is Cooked but GCP is Cooking（2026-08-07） | `2026-08-07-Gemini凉了但GCP正在崛起GeminiisCo` |
| 卖方全面解读 Meta Muse（2026-09-11，无署名中文汇编） | `2026-09-11-卖方全面解读MetaMuse`（**无署名中文解读件**：只当线索，每个数要另找署名源，档位降级） |
| Stratechery 2026-09-09（OpenAI 数学 / Meta 个人智能体） | `2026-09-14-OpenAI攻克数学难题奖励黑客问题Meta推出个人` |
| Theseus RSI 论文（上海交大） | `2026-09-14-RSI论文` |
| FUNDA Deep Muse（2026-09-21） | `2026-09-21-260921深度分析METAMuse能否成为市场期待` ；`2026-09-21-META-DeepMuse` **[已填]** |
| FUNDA Muse 留存（2026-10-08） | `2026-10-08-261008ResearchMETAMuseGrow` ；`2026-10-08-META-MuseRetention` **[已填]** |
| Microsoft AI 战略拆解（2025-11-13） | `2025-11-13-MicrosoftsAIStrategyDecons` |
| Benedict Evans：AI eats the world（2025-11） | `2025-11-24-2025AutumnAI`（幻灯片，正文极少，密集图表） |
| TPUv7（2025-11-28） | `2025-11-28-GoogleTPUv7The900lbGorilla` |
| 现场制气解决电力危机（2025-12-31） | `2025-12-31-人工智能实验室如何解决电力危机现场天然气深度剖析Ho` |
| RL Environments / RL for Science（2026-01-07） | `2026-01-07-RLEnvironmentsandRLforScie` |

**用法**：Q3 写「本份是 `bilingual`（页首中英并列逐段对应），同源组为 `…bilingual` / `…summary` / `…original`，四份共用一个来源，不得计成四个独立源」。**同源组里 `[已填]` 的那份可以打开对照写法与已确认的事实，但你的依据必须逐字来自你自己那份的 `pages.json`**；中英两份数字若有差异（译者换算、单位改动），以你这份原文为准并注明「译本与英文原本数字不一致」。

## 6. 自检（不绿不算完）

```bash
cd /d/InvestSigh/InvestSigh-Read && node server/check.mjs <材料 id>
```

必须看到 `OK  8 行有答案 · N 块原文`（N ≥ 8）。三种红：
- `unverified` / `查无此文`：抄错字或抄了别的页 → 回该页原文重抄（注意全角/半角、`’` 与 `'`、实体码）；
- `no-block`：某行有答案没登依据；
- `out-of-range`：`p.N` 超过 `source_pages`。

**校验器的盲区要知道**：它**只查「有答案必有块」和「块须逐字」**，**空答案不报错**（全新骨架也会显示「合格」）。所以绿了不等于写完，交付前自己再数一遍：**8 个 `## Qn` 段每段都有正文、每段都有 `### 依据`、每条正文不写页码**。

## 7. 交回来时报告什么（给我，不写进 material.md）

按材料逐份给 5 行：
1. `材料 id` ＋ 一句话「这是什么」（机构/作者/日期/主题）＋ Q3 的四选一结论与同源组；
2. 八问各一句结论（有数给数：Q1 的估算值、Q2 的物理量、Q8 的份额/产能）；
3. 覆盖情况：读了多少页/哪些节略读及理由、有没有图、图里有没有关键读数；
4. `check.mjs` 那行输出原文（`OK 8 行有答案 · N 块原文`）；
5. 红灯（手册 §6）：物理量无法回溯 / 同一原文被当多源 / 与公开披露冲突 / 只有结论无算式 / 关系未声明 / 自建口径未定义 / 口径漂移——命中写清哪一段、多少、与什么比；没命中写「无」。

---

## 附录：13 个 BIN 的任务清单（**只做你那一格**）

> 括号里是页数；id 都要补上 `03-independent-research-` 前缀。

**BIN 1**（152 页）
- `2025-11-13-MicrosoftsAIStrategyDecons`（53）
- `2026-01-26-260126Meta四季报预览四季度喜忧参半一季度有`（30）
- `2026-06-29-202606ExponentialView`（66）
- `2026-07-06-260706MetaNeoCloud担忧过度关键AI`（3）

**BIN 2**（61 页）
- `0000-00-00-scalinglawso1probilingual`（42）
- `0000-00-00-metabizarreaiinfrachoicebi`（6）／`…choiceor`（8）／`…choicesu`（1）
- `2026-09-11-卖方全面解读MetaMuse`（4）

**BIN 3**（172 页）
- `0000-00-00-260923AgenticReality`（31）／`2026-09-23-260923智能体时代消费者智能体时代的连锁反应Ag`（37）
- `2026-05-05-谷歌Meta季报点评StratecherybyBen`（14）
- `2025-11-24-2025AutumnAI`（90，幻灯片）

**BIN 4**（92 页）
- `0000-00-00-metamsl1yrbilingual`（16）／`…msl1yrsummary`（1）／`2026-07-10-Meta超级智能的未来一年进展更新TheFuture`（29）
- `2026-01-07-RLEnvironmentsandRLforScie`（35）
- `0000-00-00-metaaihardwarecpobilingual`（4）／`…cposummary`（1）
- `2026-09-14-OpenAI攻克数学难题奖励黑客问题Meta推出个人`（6）

**BIN 5**（112 页）
- `2025-11-28-GoogleTPUv7The900lbGorilla`（64）
- `0000-00-00-100kh100clustersbilingual`（23）
- `2026-02-05-深度讨论高价值Agent拾象BestIdeas`（19）
- `2026-04-27-260427TikTok一季度更新对Meta和谷歌尚`（6）

**BIN 6**（83 页）
- `2026-07-08-SemiAnalysis今天关于Anthropic的`（36）
- `0000-00-00-metacomputeneocloudbilingu`（12）／`…cloudsummary`（1）／`2026-07-03-MetaComputeEveryoneWantsTo`（12）
- `2026-08-07-Gemini凉了但GCP正在崛起GeminiisCo`（17）
- `2026-01-05-260105FundaAI2025年英伟达收购Gro`（5）

**BIN 7**（105 页）
- `0000-00-00-q32022semiroundupbilingual`（19）／`…original`（19）
- `2026-07-20-260720守望AI瞭望塔AllAlongtheAI`（50）
- `0000-00-00-metacustomsiliconbilingual`（10）／`…siliconsummary`（2）
- `2026-04-13-260413CollyerBridge加盟Funda`（5）

**BIN 8**（117 页）
- `2025-12-31-人工智能实验室如何解决电力危机现场天然气深度剖析Ho`（81）
- `2026-05-04-260504AppLovin一季报未见Meta冲击电`（20）
- `2026-03-15-260315OFC前瞻CPO观点美光预览Meta裁员`（7）
- `2026-10-08-261008ResearchMETAMuseGrow`（9）＋ **顺手修** `2026-10-08-META-MuseRetention`（已填但只有 7 行有答案，缺的那一行补上，依据从它自己的原文抄）

**BIN 9**（102 页）
- `0000-00-00-metasuperintelligencebilin`（17）／`…origi`（25）／`…summa`（1）／`…trans`（9）
- `2026-09-21-260921深度分析METAMuse能否成为市场期待`（36）
- `2026-01-29-260129Meta四季报一季度加速增长驱动因素ME`（6）
- `2026-08-03-260803周报历史性一周微软受奖赏Meta受惩罚A`（8）

**BIN 10**（85 页）
- `0000-00-00-metainfracultureresetbilin`（17）／`…origi`（17）／`…summa`（2）
- `0000-00-00-gpt4architecturebilingual`（19）
- `0000-00-00-FUNDAWeeklyConsumerAgentsT`（14）
- `2026-07-01-260701Meta自建NeoCloud与继续租用算`（4）／`2026-07-01-火速解读META出租H100与购买先进算力并不矛盾`（5）
- `2026-07-13-260713Meta明年资本开支粉碎削减担忧Grok`（7）

**BIN 11**（75 页 / 306KB，密）
- `2026-09-14-RSI论文`（75，arXiv 论文体：摘要→方法→实验，按手册论文体读法，只看与经营相关的量）

**BIN 12**（355 页 / 530KB，巨）
- `2025-11-07-ClusterMAX2`（355，ClusterMAX 评级体系；按 §1 长件读法：先读头部章节清单，只全读与评级方法/份额/成本相关的节）

**BIN 13**（122 页 / 534KB，巨）
- `0000-00-00-clustermax2bilingual`（122，与 BIN 12 同一原文的双语版；Q3 必须写明与 `2025-11-07-ClusterMAX2` 同源）
