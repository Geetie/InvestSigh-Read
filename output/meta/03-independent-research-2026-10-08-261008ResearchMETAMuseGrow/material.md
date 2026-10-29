---
id: 03-independent-research-2026-10-08-261008ResearchMETAMuseGrow
cat: "03"
sub: independent-research
template: independent-research
template_version: 2
date: 2026-10-08
time: "00:00"
title: "FUNDA：Muse 增长会先走平再上台阶，关键在 D14 留存（2026-10-08）"
kind: "independent-research"
issuer: "FUNDA"
ticker: META
source_pages: 9
---

## Q1 · 他给的公司**未披露口径**的外部估算是什么？

全部标「外部估算」（FUNDA 自估与自建监测样本，非 Meta 披露）：

1. **Muse 的 D14 留存**：随用例增加由约 9% 升到约 16%（观测期内，per our estimates）。作者据此判断 D14 已接近长期留存——因为 D1 到 D7 骤降、D7 到 D14 几乎不再变动；又因 D28 数据尚不可用，D14 是当前最佳留存指标。
2. **Muse 的服务成本**：支撑 **100 万 DAU 约需 5 万块 GPU**——这是本件最值钱的一条估算，因为它把「留存不够就别放量」这个判断变成了成本约束。
3. **Muse 的 DAU 路径**：一旦留存达标并放开推送，DAU 可快速突破 **1,000 万**；在此之前增长走平。
4. **ChatGPT 对照基准**：其 D14 前六个月约 10%、2023 年末才升破 10%，现已接近 25%（月度均值，2024-01 至 2026-08），被当作 Agent 类留存曲线的类比锚。
5. **Muse 与 Instinct 的用例结构**（代理变量 = 监测样本里给每条用例打标）：Muse 偏内容生成（24.7% vs 17.6%）与写代码（12.0% vs 3.9%），Instinct 偏预订（19.4% vs 10.9%）与发邮件/消息（19.4% vs 9.7%）；样本 Muse n=3,146 例、Instinct n=615 例，窗口 2026-09-08 至 10-07。

口径提示：第 2 项的「5 万块 GPU」没有 GPU 型号、没有单卡吞吐、没有单价，只能当量级，不能换算成美元成本入格；第 5 项的占比是多标签占比（各项相加远超 100%），不是用户份额。

### 依据

- p.3｜2 . D14 has improved as Muse has added use cases, rising from about
- p.3｜9% to about 16% over the observation period, per our estimates.
- p.4｜Muse is expensive to serve. We estimates that supporting 1 million DAU takes roughly 50,000 GPUs.
- p.5｜We estimates that once retention reaches that bar and Muse ramps up push notifications, DAU could pass 10 million quickly.
- p.2｜According to our estimates, the ChatGPT app’s D14 retention sat around 10% for its first six months and only moved above 10% in late 2023. It is now approaching 25% (Figure 1) .
- p.3｜Figure 1: ChatGPT Retention by Cohort Day (Jan 2024 – Aug 2026) (Source: FUNDA Estimation)
- p.5｜Based on our monitored sample, Muse users lean toward content generation (24.7% vs. 17.6%) and coding (12.0% vs. 3.9%).
- p.6｜<tr><td>METRIC</td><td>MUSE n= 3,146cases</td><td>INSTINCT n = 615 cases</td></tr>
- p.6｜Figure 4: Muse vs. Instinct User Behavior and Re-engagement (Sep 8 – Oct 7, 2026) (Source: FUNDA Monitored Sample)

## Q2 · 他的**物理量**从哪来、能不能核？

文内物理量只有两项，都不可回溯：**GPU 数量**与**DAU/下载量**。

- **GPU**：支撑 100 万 DAU 约 5 万块（约 0.05 块/DAU）。没有型号、没有显存、没有单卡吞吐，也没有推理/训练拆分——缺「请求量 ÷ 单卡吞吐 = 卡数」这一步，属只给结论，记**无法核**。
- **DAU 与累计下载**：只有一张图（图题「Muse DAU and Cumulative Downloads」），本份转存件连图注与坐标文字都没保留，没有可引的数字；时间窗只能由图题之外的上下文推知，故按「图内无文字可引」处理。
- **留存**：按 cohort day 统计的曲线，来源 FUNDA Estimation。

来源状态逐项：三项全部标 FUNDA Estimation / FUNDA Monitored Sample，没有一项指向监管文件、公司公告、行业协会或商店后台导出；文件末尾另有「第三方数据来自公开或授权来源」的兜底，但没有给出任何具体可查的链接或数据集。故整组记「无法核，数值降为旁证」——尤其 GPU 那 5 万块，只能当量级，不能进成本模型。

### 依据

- p.4｜At that marginal cost, a large user acquisition push would be hard to justify right now.
- p.4｜Muse DAU and Cumulative Downloads
- p.3｜Muse Retention Over Time
- p.3｜Muse shows a similar pattern (Figure 2) :
- p.2｜ChatGPT Retention Over Time
- p.7｜Third-Party Data: All third-party data cited in this report is derived from public or authorized sources.

## Q3 · 这份材料是**四种交付物里的哪一种**？同源的另一份是哪一份？

本份是 `original`（英文原文稿）：页首是单语报头「Research|META: …」加一句副标题，没有中英并列；正文是连续的论证段落（留存路径 → 服务成本 → 再互动设计 → 分步增长），没有 KEY POINTS 摘要块，也没有被压成条目，故不是 summary，也不是 translation。

同源组：按同源对照表，「FUNDA Muse 留存（2026-10-08）」这一行有两件——本 id 与 `2026-10-08-META-MuseRetention`，两者是**同一篇 FUNDA 报告的两次导出**（同一标题、同一发布日、同一张 Figure 4 用例表、同一段免责声明），**共用一个来源，不得计成两个独立源**。

本份与同源那份的差异只在转存质量，不在内容：本份写作「50,000 GPUs」，同源那份被 OCR 成「50,0oo GPUs」；本份图标点用弯引号与 en dash，同源那份多为直引号与短横。数字以本份为准，但差异本身说明两份都来自同一版 PDF，引用时以本份的英文原句为据。

### 依据

- p.1｜Research|META: Muse Growth May Moderate Briefly, Then Pick Up as Retention Improves
- p.1｜FUNDA OCT 08, 2026 ∙ PAID
- p.1｜Two weeks ago we published our note on Muse monetization.
- p.1｜Deep|META: Could Muse be the Inflection Point Market Looking for? SEP 21

## Q4 · 他的**假设与算式**能不能复算？

算得通的是附录的计数占比与 GPU 的线性外推，算不通的是成本结论：

- **用例占比逐个复算（全部通过）**：777 ÷ 3,146 = 24.70%、377 ÷ 3,146 = 11.98%、343 ÷ 3,146 = 10.90%、810 ÷ 3,146 = 25.75%、465 ÷ 3,146 = 14.78%；Instinct 侧 108 ÷ 615 = 17.56%、24 ÷ 615 = 3.90%、119 ÷ 615 = 19.35%。分子分母都在表里，表是计数占比而不是加权指数。
- **一个必须指出的结构问题**：Muse 列 15 项占比相加约 159%，远超 100%——说明每条用例被打上多个标签，**占比不能相加、不能当作用户份额读**，也不能拿 24.7% 去推「四分之一用户只用来写内容」。
- **GPU 线性外推**：0.05 块/DAU × 1,000 万 DAU = 50 万块，与「100 万 DAU 用 5 万块」自洽；但这只是把同一个假设乘十，不是新证据。
- **不能复算**：「在这个边际成本下大举获客不成立」缺 GPU 单价或租价、缺获客成本，只能算出卡数、算不出金额，所以这句结论只能当判断。

另有一处计数可疑：预订（Bookings）与发邮件/消息两项的 Instinct 分子都写 119、占比都写 19.35%，同一分子支撑两项不同用例，可能是标签重叠或转存错位，引用时须注明。

### 依据

- p.6｜Content generation</td><td>24.70% (777)</td><td>17.56% (108)</td>
- p.6｜Code writing</td><td>11.98% (377)</td><td>3.90% (24)</td>
- p.6｜Bookings &amp;reservations</td><td>10.90% (343)</td><td>19.35% (119)</td>
- p.6｜Sending emails &amp; messages</td><td>9.69% (305)</td><td>19.35% (119)</td>
- p.4｜At that marginal cost, a large user acquisition push would be hard to justify right now.

## Q5 · 关键数字的**脚注指向哪**？

本份只有两条 Source 行，全部指向自家：

- 留存对照图：「Figure 1: ChatGPT Retention by Cohort Day (Jan 2024 – Aug 2026) (Source: FUNDA Estimation)」——FUNDA 自估，Ⅱ。
- 用例表：「Figure 4: Muse vs. Instinct User Behavior and Re-engagement (Sep 8 – Oct 7, 2026) (Source: FUNDA Monitored Sample)」——自建监测样本，Ⅱ。

缺的两条要分清是「原文没有」还是「转存丢了」：本份里 Muse 留存图与 DAU 图只剩图题（「Muse Retention Over Time」「Muse DAU and Cumulative Downloads」），没有 Figure 2 / Figure 3 的编号与 Source 行；而同源的另一份导出保留了这两条图注，可见是本份转存时丢的，不是原文没有。

兜底条款只有一句「第三方数据来自公开或授权来源」，没有指向任何具体披露。

结论：全篇 Ⅱ，无一条可升 Ⅰ；连「FUNDA Estimation」背后用的是哪家面板、多少样本、什么去重规则都没有，引用时只能当作者自估。

### 依据

- p.3｜Figure 1: ChatGPT Retention by Cohort Day (Jan 2024 – Aug 2026) (Source: FUNDA Estimation)
- p.6｜Figure 4: Muse vs. Instinct User Behavior and Re-engagement (Sep 8 – Oct 7, 2026) (Source: FUNDA Monitored Sample)
- p.7｜Third-Party Data: All third-party data cited in this report is derived from public or authorized sources.
- p.3｜Muse Retention Over Time
- p.4｜Muse DAU and Cumulative Downloads

## Q6 · 他的**自建口径 / 评级**定义是什么？与公司口径差多少？

本件没有评级、没有打分、没有指数，但有两把自建的「尺子」需要记定义：

1. **D14 作为长期留存的代理**：判定规则是「D1→D7 骤降、D7→D14 几乎不动 ⇒ D14 已接近长期留存」，并因 D28 数据不可用而把 D14 定为当前最佳指标。这条规则可复算（有曲线即可验证），但它是判断而非公式；与公司口径的差在于 Meta 不披露任何单一产品的 D14 与 DAU，无法对齐，只能自证。
2. **监测样本的用例打标（Monitored Sample）**：分母是 3,146 / 615 条用例，一条用例可打多个标签（Muse 列 15 项占比合计约 159%）。这意味着它是「用例构成」而非「用户构成」，与公司口径的 DAU/使用时长不是同一维度，差多少无法换算——只能说方向上会高估头部用例的占比。

另有一把被用来做结论的准口径：「每 DAU 的 GPU 数」（0.05 块/DAU）。它只有分子分母两个数，没有型号与吞吐定义，**该口径不得用于成本估算**，只能说明规模量级。

结论：本件的自建口径都属「判断规则」而非「可换算公式」，可用于理解作者的推理链，不可直接搬进模型。

### 依据

- p.3｜1 . Retention drops sharply from D1 to D7, then barely moves from D7 to D14. That suggests D14 is already close to long-term retention.
- p.3｜3. Muse is too new to have usable D28 data, so D14 is the best metric we have for now.
- p.6｜<tr><td>METRIC</td><td>MUSE n= 3,146cases</td><td>INSTINCT n = 615 cases</td></tr>
- p.2｜Agent products retain users very differently from most consumer internet products.

## Q7 · 他**有没有投行关系 / 持仓**？

三项分开看，声明是齐的，但有一项缺：

- **投行关系 / 收费顾问**：声明「无」——与被覆盖公司没有任何投行或承销关系，且不接受上市公司赞助或资助；同时声明不与任何券商、投行或资管机构关联，未在任何辖区注册为投资顾问或经纪商。
- **报酬挂钩**：声明分析师报酬与该报告的具体推荐或观点无直接或间接关联，且报告观点为分析师个人独立观点。
- **持仓**：材料中没有分析师本人或机构是否持有 Meta 证券的声明，此项**未声明**，按未披露处理，不能据此假定独立。
- **PAID**：页首「FUNDA OCT 08, 2026 ∙ PAID」是付费墙标记，不是投行关系证据。

综合：按 FUNDA 自述属无投行关系、无发行人资助的独立研究；个人持仓一项缺失，是本件关系披露的唯一缺口。

### 依据

- p.7｜The Company does not have any investment banking or underwriting relationship with the companies covered in this report, and does not accept sponsorship or funding from publicly listed companies.
- p.7｜The Company is not affiliated with any securities dealer, investment bank, or asset management firm, nor is it registered as an investment advisor or broker-dealer in any jurisdiction.
- p.7｜No part of the analyst’s compensation was, is, or will be directly or indirectly related to the specific recommendations or views expressed in this report.
- p.1｜FUNDA OCT 08, 2026 ∙ PAID

## Q8 · 他的**行业级判断**（产能 · 份额）有数据支撑吗？

本件没有产能、份额类断言——既没有 GPU 供给量、没有机柜数，也没有任何百分比市场份额，所以「行业级读数」这一项为空。它只有一条行业级**观点**：

- 观点：Agent 类产品的留存演进更像社媒与短视频平台（网络效应 + 内容/关系累积使其越长越黏），而不是功能一次到位的消费 App；因此不能用上线初期的留存去判断天花板。作者用 ChatGPT 的 D14 从约 10% 爬到接近 25% 作为这条路径的唯一实证锚，再套到 Muse 的 9%→16%。
- 这条锚的问题：没有样本量、没有口径（哪个版本、哪些地区、活跃如何定义）、没有第三方交叉验证，来源只写 FUNDA Estimation。所以它是**观点加一个自估数**，不是行业读数。
- 另一条接近行业级的判断是「Muse 在留存达标前不放大投放」，这属于公司行为推断，也不是产能或份额。

判断：本件的行业结论只能记「观点」，不能当 Agent 类产品留存的行业基准；要用这个基准，必须另找有样本口径的数据源。

### 依据

- p.2｜Some apps keep improving retention for months or even years after launch. Social media and short-video platforms are the obvious examples. Network effects and a growing base of content and connections make them stickier over time.
- p.2｜Agents look more like the second group.
- p.2｜According to our estimates, the ChatGPT app’s D14 retention sat around 10% for its first six months and only moved above 10% in late 2023. It is now approaching 25% (Figure 1) .
- p.5｜All of this makes us think Muse will hold off on its next acquisition push until retention and other key metrics are where it wants them.
