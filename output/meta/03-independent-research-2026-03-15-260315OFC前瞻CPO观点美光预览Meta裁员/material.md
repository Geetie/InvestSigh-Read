---
id: 03-independent-research-2026-03-15-260315OFC前瞻CPO观点美光预览Meta裁员
cat: "03"
sub: independent-research
template: independent-research
template_version: 2
date: 2026-03-15
time: "00:00"
title: "FUNDA 周报：OFC 前瞻、Hock Tan 的 CPO 观点、美光预览与 Meta 裁员（2026-03-15）"
kind: "independent-research"
issuer: "FUNDA"
ticker: META
source_pages: 7
---

## Q1 · 他给的公司**未披露口径**的外部估算是什么？

本件主体是行业（光互联 + 存储 + 应用广告），不是 Meta 一家。作者的数一律标「外部估算」：

1. **美光 DRAM 价格**：CY1Q26 与市场一致；CY2Q26 环比 **>40%**，高于市场已计入的 20–30%；CY2H26 再 **>20%**，高于 street 的 15–20%。口径是 DRAM 合约价环比、按日历年季度。
2. **美光盈利**：到今年三季度可看到 **$80 run-rate EPS**。
3. **美光 HBM4**：供应链检查显示认证「按计划」；即使熊市，Google TPU 与其他 ASIC/GPU 的需求也能把产能吃满——判断，非读数。
4. **AppLovin 电商日预算**：2 月底比 1 月底 **+30%**，3 月又比 2 月底 **+5% 以上**（自建跟踪，口径是日预算而非收入）。
5. **自家编码 agent 的单位成本**：软件分析师 Wooding 日均 Claude Code 消耗 **$1,000**，初级工程师 Levy **$500/日**；一个账号 11 天合计 10.3 亿 token、$1,253.49。
6. **Apple Store 中国抽成** 30%→25%（事实），并判断中国会继续降、欧洲跟进——判断。

样本与口径：第 4、5 项是 n=1 的自测（一个账号、一两位分析师），只能当量级；第 1–3 项是「供应链检查 + 与 street 对比」，没有中间步骤，属观点型预估。另须排除：读者留言区那条（提到 −20% 裁员、$135B AI capex）不是作者的数字。

### 依据

- p.3｜With CY1Q26 nearly complete, market consensus for a surge in DRAM pricing aligns with our view. However, we see significant upside for CY2Q26, where we project a >40% increase, above the 20-30% currently baked into expectations.
- p.3｜For CY2H26, we forecast an additional >20% jump, outperforming the conservative 15-20% Street forecast.
- p.3｜We actually believe that by the third quarter of this year, we could see an $80 run-rate EPS.
- p.3｜Regarding HBM, despite some prior market noise suggesting potential exclusion from NVIDIA’s HBM4 roadmap, our supply chain checks indicate that qualification remains on track.
- p.6｜As mentioned in our Weekly before, AppLovin’s e-commerce daily budget at the end of February grew by 30% compared to January’s end. The trend remains solid in March, up by more than 5% since the end of February.
- p.4｜Our Software Analyst, Wooding, has been building a large number of Agent Templates, and his daily Claude Code consumption has already hit $1,000.
- p.4｜Levy is our most junior engineer, but he just hit the milestone of $500 per day in Claude Code consumption.

## Q2 · 他的**物理量**从哪来、能不能核？

本件没有 GW/MW、机柜、晶圆、船期类物理量；唯一可计量的物理量是 token 与美元：

- **自家 Claude Code 账单（11 天，2026-02-28 至 03-11）**：总 token 1,031,311,843，其中 cache read 959,884,772、cache create 68,436,298、input 876,150、output 2,114,623，合计 $1,253.49。单日峰值在 03-11：161,582,487 token、$523.68。
- **agent 数量**：某产品经理自称第二周周五扩到 2,000 个 agent、周六晚到 14,000 个（自述，无凭证）。
- **DRAM**：只有百分比，没有 bit 供给量、没有晶圆投片、没有库存周数。

来源状态：账单可回溯到截图，口径是账号级 token 计费，样本 n=1，且没写是否含订阅折扣——记「可核但样本极小」；agent 数与 DRAM 供需全部记**无法核**，因为只有「supply chain checks」四个字，没有产能台账、没有合约价序列、没有中间步骤。故这些数只能作旁证，不能当存储供给读数，也不能换算成美光或 Anthropic 的收入。

### 依据

- p.5｜<tr><td>Total</td><td></td><td>876,150</td><td>2,114,623</td><td>68,436,298</td><td>959,884,772</td><td>1,031,311,843</td><td>$1,253.49</td></tr>
- p.5｜<tr><td>2026-03-11</td><td>claude-opus-4-6claude-sonnet-4-5-20250929claude-sonnet-4-6</td><td>149,818</td><td>435,491</td><td>16,924,655</td><td>144,072,523</td><td>161,582,487</td><td>$523.68</td></tr>
- p.4｜By Friday of the second week, he told me he had scaled his team to 2,000 agents. By Saturday night, he told me there were 14,000 agents working for him, and he could operate them remotely, running projects regardless of location.
- p.5｜<tr><td>Date</td><td>Models</td><td>Input</td><td>Output</td><td>Cache Create</td><td>Cache Read</td><td>Total Tokens</td><td>Cost (USD)</td></tr>

## Q3 · 这份材料是**四种交付物里的哪一种**？同源的另一份是哪一份？

本份是 `original`（英文原文的周报合集）：页首是一行单语周刊标题串（OFC 前瞻 / Hock 的 CPO 观点 / 美光预览 / Meta 裁员 / 自家编码 agent / HIMX / 新联盟 / RBRK / APP），正文是逐篇导读加「Read full story」，没有中英并列、没有被压成 KEY POINTS，也不是译文。

要分清它的层级：这是「周报索引 + 短评」，不是那几篇 Deep 报告本身。它对每篇只给一段结论和跳转，真正的论证在别处（如 3 月 11 日的 OFC 前瞻 Deep 稿、3 月 8 日的 CPO 评论）。所以本件的覆盖是观点摘要级，不能当那几篇的替身。

同源组：按同源对照表，「FUNDA Weekly 2026-03-15」为各自单份、库内无同源件，也没有 original / summary / translation 对照。但它导读的几篇（OFC 前瞻、GTC 前瞻、Hock Tan CPO 评论、HIMX、RBRK）若在库中另有存档，属同一机构同周内容，引用时须另行登记，不能因为本篇提过就记成独立源。

### 依据

- p.1｜Weekly|OFC Preview, Hock’s CPO View, MU Preview, META Layoff, FundaAI's Coding Agent in Practice, HIMX, New Consortium, RBRK, APP
- p.1｜FUNDA MAR 15, 2026 ∙ PAID
- p.1｜This week’s reports
- p.6｜Next week’s pipeline

## Q4 · 他的**假设与算式**能不能复算？

能复算的是 token 表加总，不能复算的是 DRAM 价格路径：

- **token 表**：input 逐日相加 = 876,150，与 Total 行一致；output 相加 = 2,114,623，一致；cache create 68,436,298、cache read 959,884,772，四项合计 = 1,031,311,843，与 Total 行一致；成本逐日相加 = $1,253.48，表列 $1,253.49，差 $0.01 属四舍五入。复算通过。
- **顺带算出的两个量**：混合单价 = $1,253.49 ÷ 1,031.31M token ≈ **$1.22/百万 token**；cache read 占总量 **93.1%**。这说明这个低价几乎全靠缓存命中，去掉 cache read 成本结构会完全不同——这是本件唯一能进模型的成本观察。
- **不能复算**：DRAM「CY2Q26 >40%」既无起点（哪一季的合约价）、也无供需平衡表与 bit 供给假设，只有「与 street 对比」；$80 run-rate EPS 无 EPS 构成；AppLovin 的 +30% / +5% 无基数。

结论：token 表可复算，并得出 $1.22/百万 token 的单位成本；价格类预估「只给结果」，标无法核。另外要注意，表里 11 天只覆盖 10 个有记录日（03-01、03-07 缺），按 11 天平均会低估单日均值。

### 依据

- p.5｜<tr><td>Total</td><td></td><td>876,150</td><td>2,114,623</td><td>68,436,298</td><td>959,884,772</td><td>1,031,311,843</td><td>$1,253.49</td></tr>
- p.5｜<tr><td>2026-02-28</td><td>claude-haiku-4-5-20251001claude-opus-4-6...and 2 more</td><td>433,663</td><td>336,967</td><td>6,344,397</td><td>116,057,889</td><td>123,172,916</td><td>$177.29</td></tr>
- p.5｜<tr><td>2026-03-02</td><td>claude-haiku-4-5-20251001claude-opus-4-6...and 2 more</td><td>88,432</td><td>149,465</td><td>3,000,581</td><td>59,144,224</td><td>62,382,702</td><td>$103.52</td></tr>
- p.2｜MU Preview - Micron is well-positioned to deliver results and an outlook that exceed Street consensus estimates.

## Q5 · 关键数字的**脚注指向哪**？

本件几乎没有脚注：全篇无脚注编号、无 Source 行、无数据附录，所有判断都写在第一人称正文里（"we see"、"we project"、"our supply chain checks"），Substack 原文的内链在转存件中全部丢失。按规则整篇记 Ⅱ。

唯一可回溯的是一手公开事实：Apple Store 中国抽成 30%→25%、小店 15%→12%，3 月 15 日生效——属公告级信息，但本件没给链接，仍需自行核。

其余关键数字：DRAM 价格与美光 $80 EPS 无任何出处，只有「供应链检查」与「与 street 对比」；AppLovin 电商预算 +30% / +5% 自引「our Weekly」（即自家前一期），是自引不是外证，仍算 Ⅱ；编码 agent 的 $1,000/日 指向自家账单截图，Ⅱ；Meta 裁员与 Manus 的判断没有数字，也无出处。

结论：可升 Ⅰ 的只有 Apple 抽成调整这一条，且要另找公告；DRAM 与美光的预估全为 Ⅱ，且属于「没有可追溯中间步骤」的那一类。

### 依据

- p.3｜our supply chain checks indicate that qualification remains on track.
- p.6｜This aligns with our Review: after resetting e-commerce expectations, AppLovin should focus on tracking incremental changes in e-commerce.
- p.6｜Apple Store China cutting take rate - reduced it from 30% to 25%.
- p.7｜© 2026 FUNDA · Privacy ∙ Terms ∙ Collection notice Substack is the home for great culture

## Q6 · 他的**自建口径 / 评级**定义是什么？与公司口径差多少？

无评级、无目标价、无打分表。本件有两个准口径，只有一个勉强可复算：

1. **「$/工程师/日的 Claude Code 消耗」**：把 $1,000/日、$500/日 当作 AI 编码的生产力与 ROI 代理，配一句「一个人干过去十个人的活」。定义缺口很大——分母没写（人日？功能？），没说是否含订阅费与 cache 折扣，样本只是 1–2 位自家工程师。**该口径不得用于估算任何公司的 AI 成本**，只能当个别观察。
2. **token 成本结构**：11 天 10.3 亿 token、$1,253.49、混合 $1.22/百万 token、cache read 占 93.1%——这条口径清楚、可复算，可用来支撑「agent 负载的成本几乎全在缓存命中上」，但只对一个账号成立。

与公司口径的差：Anthropic 不披露客户级 token 结构与折扣，本件也没有对照，所以「$1,000/日/人」无法与任何厂商价目表对齐；方向上，因为 cache read 占比极高，这个数系统性偏低，直接外推到别家会低估。

另有一个隐含口径：「一个人干十个人的活」是 productivity 断言，没有交付量、周期或缺陷率支撑，属未被定义的口径，不得引用。

### 依据

- p.4｜We encourage all of our engineers to consume as much Claude Code as possible. For a startup, this is a no-brainer. The ROI is extremely high. One person is now doing the work that used to require ten.
- p.4｜I personally watched him have Opus 4.6 work continuously for six hours, completing a critical feature that would have taken two weeks in the past.
- p.5｜<tr><td>2026-03-11</td><td>claude-opus-4-6claude-sonnet-4-5-20250929claude-sonnet-4-6</td><td>149,818</td><td>435,491</td><td>16,924,655</td><td>144,072,523</td><td>161,582,487</td><td>$523.68</td></tr>

## Q7 · 他**有没有投行关系 / 持仓**？

三项全部未声明：

- **收费顾问 / 投行关系**：未声明。整期周报没有免责声明、没有利益冲突段，页尾只有「© 2026 FUNDA · Privacy ∙ Terms ∙ Collection notice」。
- **持仓 / 受资助**：未声明，无持仓披露、无资助披露。
- **PAID**：页首「FUNDA MAR 15, 2026 ∙ PAID」是付费墙标记，不能当成「无投行关系」的证据。

能看到的只有公开互动，不是关系披露：文首点名感谢一批独立作者与卖方（Gavin Baker、Citrini、Collyer Bridge、TMTB 等），HIMX 一节还写「Citrini 的报告很好，我们同意大部分，但我们不同意它对 Himax 的看多」。这说明它与其它独立研究频繁互相引用，但这既不是投行关系，也不是持仓。

结论：按「关系不明」处理。它「对美光保持建设性」、把「Manus 当成 Meta 最大催化剂」这两个立场，都没有任何关系披露背书。

### 依据

- p.1｜FUNDA MAR 15, 2026 ∙ PAID
- p.7｜© 2026 FUNDA · Privacy ∙ Terms ∙ Collection notice Substack is the home for great culture
- p.2｜HIMX - where we disagree with Citrini. Citrini put out an excellent report, and we agree with most of it. Our ad was on the Himax bull case.

## Q8 · 他的**行业级判断**（产能 · 份额）有数据支撑吗？

行业级判断以观点为主，唯一带数字的是 DRAM 价格，且无供需模型：

- **有数字无模型**：CY2Q26 DRAM 环比 >40%（street 20–30%）、CY2H26 再 >20%（street 15–20%）；美光 HBM4 认证「按计划」，熊市下 Google TPU 与其他 ASIC/GPU 也能吃满产能。价格是预估、产能吸收是判断，都没有供给表与库存数据。
- **光互联（几乎全为观点）**：200G→400G per lane 不只是提速，会重塑调制方式、材料平台与整条价值链；新成立的 Optical Scale-up Consortium 把 NVIDIA、AMD、Broadcom、Microsoft、Meta、OpenAI 放在同一张标准桌上，物理层大概率收敛到 ELS / 光纤 / SiPho，CPO、NPO、板载光学是形态，理由是「铜在下一代 scale-up 面料上已无余量」。对 Meta 的含义：若 scale-up 转光，单套 AI 系统的光学含量会「大幅扩张」。
- **纯观点一条**：Meta 生态是个人 agent 最自然的入口（OpenClaw 目前主要跑在 Telegram 与 Discord，都不是大众产品）。

须排除：读者评论区里的「−20% 裁员」「$135B AI capex」「核心经营利润率 49%」是读者的话，不是作者读数，不能计入本件。

判断：产能与份额层面本件没有可回溯读数，全部记观点；唯一可核的行业事实是 Apple 抽成调整与 OSC 成员名单。

### 依据

- p.5｜If NVIDIA, AMD, Broadcom, Microsoft, Meta, and OpenAI are jointly defining an optical scale-up standard, that alone is a strong signal about where AI infrastructure is heading.
- p.5｜This direction acknowledges a constraint the industry has approached for some time: copper is running out of headroom for next-generation scale-up fabrics.
- p.6｜If that transition happens, the optical content per AI system could expand dramatically.
- p.3｜Even in a bear-case scenario, robust demand from Google TPUs and other AI ASICs/GPGPUs ensures full capacity absorption.
- p.7｜1) I agree that the -20% headcount reduction is a massive signal to the Street that management has its eye on expenses.
