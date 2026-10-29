---
id: 03-independent-research-0000-00-00-metamsl1yrbilingual
cat: "03"
sub: independent-research
template: independent-research
template_version: 2
date: 0000-00-00
time: "00:00"
title: "SemiAnalysis：Meta 超级智能实验室一年复盘——数据、人才、算力三条线的进度（2026-07-09）"
kind: "independent-research"
issuer: "SemiAnalysis / Max Kan、Julien Martin-Prin、Jeremie Eliahou Ontiveros、Dylan Patel"
ticker: META
source_pages: 16
---

## Q1 · 他给的公司**未披露口径**的外部估算是什么？

本件给的都是 Meta 不披露的投入侧结构量，逐项（一律为外部估算）：① RL 数据供应链收入——Surge AI 约 \$3B ARR、Mercor \$2B+、Handshake AI 约 \$1B、Micro1 \$250M+、Fleet \$63M、Afterquery \$100M+，对应估值约 \$30B/\$10B/\$3.5B/\$2.5B/\$725M/\$300M，期间未标，口径写的是"公开披露"，代理变量为公司融资与媒体披露的 ARR；② 数据生产人力——约 3000 名工程师（含 70% 应届生与相当数量资深）自 5 月底起全职制作 RL 任务/环境，另有约 7 万人可调用，代理变量是重组公告的员工编制；③ 专家工时对标——Mercor 2Q26 记录 2,517,000 专家工时，折约 4800 人×40 小时/周，作者据此判断 Meta 已处同一量级；④ 价格——一个像样的编码任务 \$5000+，Mercor 平均时薪已超 \$100/hr，顶尖承包商年入七位数；⑤ 算力轨迹——Tokenomics Model 预测 2026 年底 Meta 的 AI 算力超过 OpenAI 与 Anthropic，保守划分 MSL 后 2026–2027 训练算力仍与两者相当；⑥ 模型竞争力——28 项基准中 Muse Spark 仅 1 胜，Kimi K2.6 与 DeepSeek V4 Pro 各 3 胜。

判断：①③④ 有明确交易对手与单季度样本，可当量级用于推 RL 数据市场的规模；⑤⑥ 只有模型输出、没有从 GW 到算力的换算桥，只能当方向，不能入格。

### 依据

- p.3｜This time, the invisible hand created a new human data/RL environment supply chain. The three incumbents—Mercor, Surge, and Handshake—are all at \$1B+ ARR, and many new entrants who are barely a year old (e.g. Fleet, Mechanize, and Afterquery) are sitting around \$100M ARR.
- p.3｜[Figure: RL data companies — ARR & valuation. Surge AI (\~\$3B ARR / \~\$30B), Mercor (\$2B+ / \$10B), Handshake AI (\~\$1B / \$3.5B), Micro1 (\$250M+ / \~\$2.5B), Fleet (\$63M / \$725M), Mechanize (undisclosed / \$500M), Afterquery (\$100M+ / \$300M), Deeptune (undisclosed). Source: Public disclosures, SemiAnalysis]
- p.7｜Furthermore, they took their data efforts to another level in late May by announcing a new “applied AI engineering org” as part of their most recent round of layoffs/restructuring. \~3000 engineers, which includes 70% of their new grads and a significant number of seniors, will now be making RL tasks/environments full-time.
- p.8｜Mercor recently disclosed that they logged 2,517,000 expert hours on their platform in 2Q26, which is equivalent to \~4800 people working 40 hours a week. Meta is already in the same ballpark, and their average quality is likely higher.
- p.8｜Frontier labs are willing to pay \$5000+ for a single decent coding task. Mercor’s average pay rate recently surpassed \$100/hr, and the rate for SWEs is significantly above average. The top expert contractors at all of these data companies are making over 7 figures a year.
- p.9｜Our new Tokenomics Model projects that Meta will have more AI compute than both OpenAI and Anthropic by the end of this year.
- p.2｜[Figure: Muse Spark vs Kimi K2.6 vs DeepSeek V4 Pro across 28 benchmarks (Muse Spark 1 win, Kimi K2.6 3 wins, DeepSeek V4 Pro 3 wins). Source: SemiAnalysis Tokenomics Model]

## Q2 · 他的**物理量**从哪来、能不能核？

物理量全部出自 SemiAnalysis 自建的 Datacenter Industry Model 与 AI Networking Model，不是 Meta 公告。逐项：5 座 1GW+ "泰坦"集群同时在建（俄亥俄 Prometheus、路易斯安那 Hyperion、El Paso、爱荷华、印第安纳）；Hyperion 在建 1.5GW，为 3×400MW 加 3×100MW，单体 400MW 号称全球最大；爱荷华签 1GW 租约，一年内从空地推进到整 GW 在建；Prometheus 两年内从约 1GW 扩到 3GW 以上，形态是 6 个园区 27 座数据中心，5 个相距 6km 内、第 6 个 75–80km；AI-Backbone 单枢纽约 22 Pb/s 双向带宽；园区内时延 1–10µs，100km 外不低于 500µs；其余泰坦互连最远 2000km。

可回溯性：爱荷华 1GW 租约与 2025 年 5 月对 2026 年 5 月的卫星影像对比，外部可核，作者也称 2025 年 6 月已在模型里提示过——这两项记"可部分回溯"。其余 GW 数、22 Pb/s、时延、2000km 全部指向付费订阅模型，本件没有逐站点 MW、没有上电时间表，记"来源不可回溯"，数值降为旁证，不得当成 Meta 官方在建产能入格。

### 依据

- p.9｜Meta is simultaneously building 5 1GW+ “titan” clusters. There’s Prometheus in Ohio, Hyperion in Louisiana, and 3 unnamed campuses in El Paso, Iowa, and Indiana.
- p.10｜For Hyperion, Meta is building the world’s largest single buildings at 400MW each. A total of 1.5GW is under construction today: 3x 400MW monsters plus 3 more standard 100MW buildings.
- p.10｜In Iowa, Meta signed a 1GW lease with a leading datacenter operator (as we flagged in June 2025 in our Datacenter Model). As you can see from the satellite images below, they’ve gone from nothing to the full GW under construction in just 1 year.
- p.10｜The Prometheus cluster also keeps expanding—from an initial \~1GW to now >3GW within two years. To understand how Meta achieves this, check out our Datacenter Model. We have building-level tracking of all five Titans, and are the first to call out any expansions with precise monthly timelines.
- p.11｜Instead of a single datacenter or campus, Prometheus is a constellation of 27 datacenters spread across 6 campuses. 5 of these are within 6km of each other and the 6th is 75 to 80km away from the rest.
- p.11｜The L3 Superspines are then aggregated on a single L4 Inter-BAG hub which is set to provide around 22 petabits per second of bi-directional bandwidth across the whole Prometheus cluster.
- p.12｜Inside a DSF or a NSF region, the latency usually sits between 1 to 10µs, but the latency to reach a site that is 100km apart cannot be lower than 500µs, just due to light propagation in the fiber, which forces Meta to use asynchronous strategies for training workflows.
- p.12｜Overall, while Prometheus offers a solution to current limitations, the other Titans will go even further with scale-across, connecting campuses up to 2,000kms apart.

## Q3 · 这份材料是**四种交付物里的哪一种**？同源的另一份是哪一份？

本份是 **bilingual**（双语句对齐）：页首标题与副题中英并列，正文每一段英文后紧跟同一段中文，文末明写"中英对照 / BILINGUAL"，全文论证完整保留，没有被压成条目，也不是只有译文的单语件。

同源组：`0000-00-00-metamsl1yrsummary`（九点要点摘要）、`2026-07-10-Meta超级智能的未来一年进展更新TheFuture`（同一篇的全文对照件）、`2026-07-10-META-1yrProgress`（已填）。四份共用同一个来源 SemiAnalysis 2026-07-09《The Future of Meta Superintelligence: A 1 Year Progress Update》（作者 Max Kan、Julien Martin-Prin、Jeremie Eliahou Ontiveros、Dylan Patel），**不得计成四个独立源**。本件的口径以本份英文原文为准；引用同源另一份的结论时必须另注"同源另一份材料称"。

### 依据

- p.1｜中英对照 / BILINGUAL
- p.1｜SemiAnalysis · Max Kan, Julien Martin-Prin, Jeremie Eliahou Ontiveros, Dylan Patel · 2026-07-09 · https://semianalysis.com/2026/07/09/the-future-of-meta-superintelligence

## Q4 · 他的**假设与算式**能不能复算？

能复算两处，都能落成一行算式：

① Hyperion 在建规模：3×400MW + 3×100MW = 1200 + 300 = 1500MW = 1.5GW，与文中"a total of 1.5GW is under construction today"完全一致——**复算通过**。
② Mercor 工时折全职人头：2,517,000 小时 ÷（40 小时/周 × 13 周/季）≈ 4,842 ≈ 4,800 人，与文中"\~4800 people working 40 hours a week"一致——**复算近似通过**，但要补"一个季度按 13 周"这个文中没写的假设，故只记近似。

不可复算的是它最关键的那句：Meta 2026 年底 AI 算力超过 OpenAI 与 Anthropic、保守划分后 2026–2027 训练算力仍相当。这两句只有 Tokenomics Model 的输出，没有输入（各站点 MW、利用率、MFU）、没有折算口径、没有中间步骤，一行算式都搭不起来。

判断：这份材料能进模型的是 GW 级在建规模这一项物理量；算力对比只能当叙事，不能当读数。

### 依据

- p.10｜For Hyperion, Meta is building the world’s largest single buildings at 400MW each. A total of 1.5GW is under construction today: 3x 400MW monsters plus 3 more standard 100MW buildings.
- p.8｜Mercor recently disclosed that they logged 2,517,000 expert hours on their platform in 2Q26, which is equivalent to \~4800 people working 40 hours a week.
- p.9｜However, even if we remain conservative and only assign specific, high-profile Meta DC sites to MSL, their training compute is still comparable to OpenAI and Anthropic through 2026 and 2027.

## Q5 · 关键数字的**脚注指向哪**？

本件没有编号脚注，来源全部落在图注的 `Source:` 行与文内括注，分两类：

**指向一手（该条可升 Ⅰ）**：RL 数据公司的 ARR/估值标"Source: Public disclosures, SemiAnalysis"，可再上溯到融资公告；GDPval 任务样例与 HealthBench rubric 标"Source: OpenAI, SemiAnalysis"，是 OpenAI 的公开产物；Prometheus 园区布局标"Source: SemiAnalysis AI Networking Model, Meta"，其中一部分来自 Meta 一手。

**指向自建付费模型（二手，本件内不可回溯，Ⅱ）**：算力预测与 28 项基准指向 Tokenomics Model；在建规模与卫星图指向 Datacenter Model；AI-Backbone 拓扑与时延指向 AI Networking Model。

判断：本件真正当结论用的数字——Meta 算力轨迹、在建 GW 规模——全部落在自建模型上，一律 Ⅱ 档；能升 Ⅰ 的只有公开披露与 OpenAI 那两张图注。它的形态是"有模型、无底稿"，不是"有脚注的投研"。

### 依据

- p.3｜[Figure: RL data companies — ARR & valuation. Surge AI (\~\$3B ARR / \~\$30B), Mercor (\$2B+ / \$10B), Handshake AI (\~\$1B / \$3.5B), Micro1 (\$250M+ / \~\$2.5B), Fleet (\$63M / \$725M), Mechanize (undisclosed / \$500M), Afterquery (\$100M+ / \$300M), Deeptune (undisclosed). Source: Public disclosures, SemiAnalysis]
- p.5｜[Figure: GDPval task example — a four-day Istanbul wedding itinerary for an ultra-high-net-worth principal (excerpted from a 1,064-word prompt). Source: OpenAI, SemiAnalysis]
- p.10｜[Figure: Hyperion under construction. Source: SemiAnalysis Datacenter Model]
- p.10｜[Figure: May 2025 (left) vs May 2026 (right) satellite imagery. Source: SemiAnalysis Datacenter Model]
- p.11｜[Figure: Prometheus campus layout near Columbus, Ohio. Source: SemiAnalysis AI Networking Model, Meta]

## Q6 · 他的**自建口径 / 评级**定义是什么？与公司口径差多少？

自建口径有三件，都是付费订阅产品，本件只给名字与结论、不给尺子本体：

① **Tokenomics Model**——用来预测 Meta/OpenAI/Anthropic 的 AI 算力（4Q23–2Q27），并给 Muse Spark、Kimi K2.6、DeepSeek V4 Pro 算 28 项基准胜负；② **Datacenter Industry Model**——做五座泰坦的建筑级跟踪与月度扩建时间线，含表后供电与审批风险标注；③ **AI Networking Model**——做 AI-Backbone 拓扑、22 Pb/s 带宽与时延推算。

三项都没有给记分项、权重、单站点 MW 输入或重算方法；"AI 算力"本身也没定义是 FLOPS、加速卡张数还是可训练 token 产出；28 项基准不列清单与权重。按手册口径，**定义不完整，不得当客观标准入格**。

与公司口径的差异：三项全不是 Meta 披露口径，Meta 只在园区布局图注里作为来源之一出现；差异的方向与幅度都无法量化，只能说"全部为外部估算"，不能拿去与 10-Q/8-K 的口径逐项对齐。

### 依据

- p.2｜[Figure: AI compute (Meta / OpenAI / Anthropic), 4Q23–2Q27. Source: SemiAnalysis Tokenomics Model]
- p.2｜[Figure: Muse Spark vs Kimi K2.6 vs DeepSeek V4 Pro across 28 benchmarks (Muse Spark 1 win, Kimi K2.6 3 wins, DeepSeek V4 Pro 3 wins). Source: SemiAnalysis Tokenomics Model]
- p.9｜Much has been written about Colossus and Elon’s ability to bring enormous amounts of compute online quickly, but what Meta’s doing today is arguably even more impressive, as our Datacenter Industry Model subscribers have known for over a year.
- p.11｜To address this Meta has introduced a solution called AI-Backbone (or AIBB for short). This is an evolution of their 10X Backbone, specifically designed for AI and massive cluster needs.

## Q7 · 他**有没有投行关系 / 持仓**？

三项分开：收费顾问——未声明；投行关系——未声明；持仓或受资助——未声明。

查了哪里：文末只有一句立场收尾"the race for 3rd is currently between Meta and SpaceX, not Google."，没有 Disclosure、免责声明或作者简介段；署名是四名 SemiAnalysis 员工，无个人持仓说明；正文里唯一明示的商业形态是付费墙（"behind the paywall"），那属于内容分发模式，不是投行关系，也**不能**拿它当"无投行关系"的证据。

判断：按"关系不明"处理，不得假定独立。这份材料的态度是明确看多 MSL、并直接给 Google 打分"loser mentality"，排序类结论（最有希望追上 Anthropic/OpenAI、第三名之争是 Meta 对 SpaceX）应当打折使用。

### 依据

- p.2｜Lastly, behind the paywall, we’ll discuss what this all means for Google—the company most people today still believe rounds out the AI big 3.
- p.16｜In our view, the race for 3rd is currently between Meta and SpaceX, not Google.

## Q8 · 他的**行业级判断**（产能 · 份额）有数据支撑吗？

分两类：

**有数据支撑（口径基本齐备，可作旁证）**：① 在建产能——口径是在建电源功率（MW/GW），地理范围为俄亥俄、路易斯安那、El Paso、爱荷华、印第安纳，时点 2026 年 7 月，来源 Datacenter Model；可供对照的行业锚点是"AWS 为 Project Rainier 在印第安纳建 800MW，而 Meta 眼下同时有两座完整 1GW 园区在建"。② RL 数据供应链规模——口径 ARR、时点 2026 年中、来源公开披露：Mercor/Surge/Handshake 均 \$1B+，成立一年的新进入者约 \$100M。

**无数据支撑（记观点）**：Google 未来 2 年新增数据中心产能大部分投向 IaaS 与三方 API、DeepMind 训练算力将少于 OpenAI/Anthropic/MSL；Meta 2026 年底 AI 算力超过两家。这些既没有统计口径四要素，也没有中间步骤，不得用于份额推演或市场空间测算。

### 依据

- p.9｜Never in the history of humanity have we ever seen a full 1GW campus under construction simultaneously —the closest was AWS building 800MW in Indiana for Project Rainier—yet Meta has two of them right now! Hyperion and Iowa.
- p.3｜This time, the invisible hand created a new human data/RL environment supply chain. The three incumbents—Mercor, Surge, and Handshake—are all at \$1B+ ARR, and many new entrants who are barely a year old (e.g. Fleet, Mechanize, and Afterquery) are sitting around \$100M ARR.
- p.15｜We project that the majority of Google’s incremental datacenter capacity for the next 2 years will go towards their infrastructure as a service (IaaS) and 3p API businesses. DeepMind will have less training compute than OpenAI, Anthropic, and MSL.
