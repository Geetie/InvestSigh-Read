---
id: 03-independent-research-0000-00-00-metasuperintelligencesumma
cat: "03"
sub: independent-research
template: independent-research
template_version: 2
date: 0000-00-00
time: "00:00"
title: "要点摘要｜SemiAnalysis：Meta 超级智能——算力、人才与数据（2025-07-11）"
kind: "independent-research"
issuer: "SemiAnalysis / Dylan Patel 等（本份为要点摘要）"
ticker: META
source_pages: 2
---

## Q1 · 他给的公司**未披露口径**的外部估算是什么？

本份是摘要，能看到的「外部估算」只有被压成条目后的结果，共四类：

1. **挖角成本（外部估算）**：约 300 亿美元估值买 Scale AI 49% 股权；每位研究员 4 年 2 亿至 3 亿美元，另有未被接受的 10 亿美元报价；资金来自年现金流约 1,000 亿美元的广告机器。代理变量是 offer 金额，样本是被挖对象，未给人数与职级。
2. **集群规模（外部估算）**：俄亥俄 Prometheus 为 1GW 级；路易斯安那 Hyperion 目标 2GW、一期 IT 供电 1.5GW 以上；两座 200MW 现场表后天然气电厂。
3. **税负（外部估算）**：按其 2026 年资本开支估算，税单可能减少 50% 以上。
4. **组织与人才结论（外部估算）**：把 Meta 定位为「有 2 亿美元以上薪酬包、吉瓦级帐篷集群」的前沿实验室候选。

判断：这些数字在摘要里都不带代理变量与样本说明，也没有换算桥（尤其「税单减少 50% 以上」），只能当量级，不能入格；要用必须回纯原文那份，取其表格与 Source 行。

### 依据

- p.1｜Losing the open-weight lead to DeepSeek and the Llama 4 Behemoth failure pushed Zuckerberg into full Founder Mode, spending without limit on compute, tentbuilt GW clusters, and $200M+ researcher packages to make Meta a frontier lab.
- p.1｜<td>1 Meta's ~$30B Scale AI stake (49%) and its 4-</td><td>Meta以约300亿美元估值收购Scale AI 49%</td>

## Q2 · 他的**物理量**从哪来、能不能核？

摘要里出现四个物理量，全部无法核：

1. **1GW 级集群（Prometheus，俄亥俄）**：只有「1GW 级」三个字，无时点、无 IT/设施口径之分、无 MW 明细。
2. **两座 200MW 现场表后天然气电厂**：只给台数与功率，未给设备型号、投运时间与厂用电，来源写在摘要里是「Williams 协建」，属转述。
3. **Hyperion 目标 2GW（一期 1.5GW 以上 IT 供电）**：摘要保留了「IT 供电」这个词，但没说是铭牌还是可用容量。
4. **「吉瓦级 GPU 集群」**：定性表述，无数字。

判断：这四项在摘要层面一律记「来源不可回溯」——摘要不含原文的表格、Source 行、消息人士说明，也查不到环评/并网/招标这类中间证据；要用必须回 `0000-00-00-metasuperintelligenceorigi` 取表格，并注意那里也只是自建模型。

### 依据

- p.1｜<td>two Williams-built 200MW on-site behind-the-</td><td>Williams 协建两座200MW现场表后天然气电</td>
- p.1｜<td>3 Its Ohio 'Prometheus' 1GW cluster uses an 'all</td><td>俄亥俄州的"Prometheus"1GW集群采取"全</td>

## Q3 · 这份材料是**四种交付物里的哪一种**？同源的另一份是哪一份？

本份是 **`summary`（要点摘要）**：页首即「KEY POINTS / 要点」抬头，正文不是连续论述，而是一段总括句加一张编号 1—8 的双语条目表（英文、中文两列逐条对齐），每条压成 2—3 行结论，原文的章节、表格与 Source 行全部消失。判断依据的反面也成立：它不是纯原文（无分节论述），不是译文（无逐段对译），也不是双语全文（只有条目级对照）。

同源组：《Meta Superintelligence》（SemiAnalysis，2025-07-11）的四种交付物——
`0000-00-00-metasuperintelligencesumma`（本份，摘要）、`0000-00-00-metasuperintelligenceorigi`（纯原文）、`0000-00-00-metasuperintelligencebilin`（双语）、`0000-00-00-metasuperintelligencetrans`（纯译文）。**四份共用一个来源，不得计成四个独立源**；本份只有 1 页，任何从摘要转引的数字都只能标「转述自摘要」。

### 依据

- p.1｜KEY POINTS / 要点
- p.1｜ENGLISH
- p.1｜SemiAnalysis · 2025-07-11 · https://semianalysis.com/

## Q4 · 他的**假设与算式**能不能复算？

本份**只给结果**，无法复算。

唯一勉强能摆成算式的是集群口径：目标 2GW（一期 IT 供电 1.5GW 以上）⇒ 一期占目标约 75%，二期再加约 0.5GW。但这个 75% 是我用他给的两个端点反推的，摘要没有给分期建设节奏、也没有给「2GW」是 IT 功率还是含制冷的总功率，因此这个比例只能当算术练习，不能当结论。

其余全部不可算：税单「减少 50% 以上」缺 2026 年 capex 基数与可折旧资产占比；薪酬包「2 亿至 3 亿美元/4 年」缺人数与对照基准；「1GW 级集群」缺芯片数、单柜功率与 PUE。

判断：摘要层不允许做复算，凡需要算式的场合必须回纯原文那份，取它的表格与算式；拿摘要里的估算值当「算出来的」属违规。

### 依据

- p.1｜<td>4 Meta's Louisiana 'Hyperion' cluster targets 2GW</td><td>Meta位于路易斯安那州的"Hyperion"集群目</td>
- p.1｜<td>标2GW（一期IT供电1.5GW以上），力争在</td>

## Q5 · 关键数字的**脚注指向哪**？

本份**无脚注**，而且不是译本删节造成的，是摘要体例本身就没有：全文只有 1 页，页内除「KEY POINTS / 要点」抬头、标题、站点署名与 8 条双语条目外，没有任何 Source 行、没有「据……估算」的指向、也没有超链接。

按档位：8 条条目全部只能记 **Ⅱ 档**。其中「约 300 亿美元/49%」在原文属媒体口径、「1,020MW/50 万颗」类数字在原文属自建模型输出，摘要把这两类差别抹平了，因此摘要本身连「指向哪」都答不出来。

判断：摘要只能当索引用——先由它定位到原文的哪一节，再回原文取 Source 行；直接引用摘要里的数字并标 Ⅰ 档属越级。

### 依据

- p.1｜<td>offers (up to unaccepted $1B bids) are a</td><td>（还有未被接受的十亿美元报价）的挖角条件；</td>
- p.1｜Meta 超级智能:以算力、人才与数据领跑

## Q6 · 他的**自建口径 / 评级**定义是什么？与公司口径差多少？

本份没有评级，也没有口径定义，只留下三个未被定义的「尺子」：

1. **「吉瓦级 / 1GW / 2GW」**：摘要用 GW 描述集群规模，但没说是 IT 功率、设施总功率还是含冗余容量；公司口径是资本开支与「算力规模」的定性表述，两者之间没有换算桥。
2. **「帐篷集群」**：作为设计取向的标签（超轻结构、预制化供电制冷、不设柴油备用），被用来支撑「把上市速度置于冗余之上」的判断，本身不是可计算的指标。
3. **「2 亿美元以上薪酬包」**：以单人 4 年总额为尺子，未给人数，也无法与公司人力成本口径对齐。

判断：三把尺子都属「未给定义」，按规范不得用于横向比较或入格；摘要里凡出现「按人均」「按吉瓦」的说法，都要回原文确认口径后再用。

### 依据

- p.1｜<td>datacenter playbook again to build GW-scale</td><td>法，用超轻量"帐篷"、预制化供电/制冷、且</td>
- p.1｜<td>of the above' strategy - self-build plus record</td><td>都要"战略--自建叠加创纪录的2024年下半</td>

## Q7 · 他**有没有投行关系 / 持仓**？

三项分开：**收费顾问——未声明；投行关系——未声明；持仓或受资助——未声明**，按「关系不明」处理，不得假定独立。

查了哪里：本份只有一张要点表（条目 1—4 与 5—8 分列两屏），通篇只有抬头、中英标题、站点与日期署名、一段总括句和 8 条条目，**没有** Disclaimer、Disclosure、作者简介或持仓段。查的范围就是整份材料，没有别处可查。

为何相近的不能算：署名行「SemiAnalysis · 2025-07-11 · https://semianalysis.com/」只交代出处，不构成任何关系声明；条目里也没有「我们持有」「我们受某公司资助」的句子。

判断：本份与另三份同源，关系状态应统一按「未声明」处理，不能因为它是摘要就默认更中立。

### 依据

- p.1｜SemiAnalysis · 2025-07-11 · https://semianalysis.com/

## Q8 · 他的**行业级判断**（产能 · 份额）有数据支撑吗？

本份有三条行业级断言，全部无读数：

1. **园区排名**：称 Hyperion 到 2027 年底成为「全球最大单一园区」，并称这是对阿比林 OpenAI/Oracle Stargate 的直接回应。口径是 single campus（单一园区），不含分布式园区合计，也没给对比方的 MW。
2. **产能领先**：称 Meta 2024 年下半年预租创纪录、自建叠加租赁，从而「更快放量」。无 MW、无对比样本。
3. **成本领先**：称通过抬高对手单人用工成本打击竞争。无薪酬基准数据。

判断：三条都是观点（凭什么说？凭作者的消息人士与自建模型），不是读数；摘要里没有任何份额、产能利用率或供需缺口的量化口径。要用这些断言，必须回纯原文取表格，并标明「模型输出、仅三家样本」。

### 依据

- p.1｜<td>4 Meta's Louisiana 'Hyperion' cluster targets 2GW</td><td>Meta位于路易斯安那州的"Hyperion"集群目</td>
- p.1｜<td>(1.5GW+ IT power in phase 1) to become the</td>
