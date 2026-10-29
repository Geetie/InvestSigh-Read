---
id: 03-independent-research-2026-07-10-META-1yrProgress
cat: "03"
sub: independent-research
template: independent-research
template_version: 2
date: 2026-07-10
time: "00:00"
title: "The Future of Meta Superintelligence: A 1 Year Progress Update"
kind: "手稿"
issuer: SemiAnalysis
ticker: META
source_pages: 16
---


## Q1 · 他给的公司**未披露口径**的外部估算是什么？

他给了四类 Meta 未披露口径的外部估算（一律标"外部估算"，非公司口径）：

1. **MSL 数据生产能力**：约 3000 名工程师（含 70% 应届生与相当数量资深工程师）自 2026 年 5 月底起全职制作 RL 任务/环境；另有约 7 万名员工可作后备扩充。代理变量：员工屏幕/键盘/鼠标操作追踪 + 新设"应用 AI 工程组"的编制口径。
2. **MSL 算力轨迹**：其自建 Tokenomics Model 预测 Meta 的 AI 算力到 2026 年底超过 OpenAI 与 Anthropic；即便保守处理、只把特定知名数据中心站点划归 MSL，其训练算力在 2026 与 2027 年仍与 OpenAI/Anthropic 相当。期间口径为 4Q23–2Q27 的预测区间。
3. **Meta 专家工时量级对标**：Mercor 披露 2Q26 平台记录 2,517,000 专家工时，折合约 4800 人每周工作 40 小时；他判断 Meta 已处同一量级且平均质量更高。样本量与期间明确（2Q26、Mercor 单平台）。
4. **RL 数据供应链的 ARR/估值**（Meta 数据采购成本的旁证）：Surge AI 约 \$3B ARR / 约 \$30B 估值、Mercor \$2B+ / \$10B、Handshake AI 约 \$1B / \$3.5B、Micro1 \$250M+ / 约 \$2.5B、Fleet \$63M / \$725M、Mechanize 未披露 / \$500M、Afterquery \$100M+ / \$300M、Deeptune 未披露。代理变量为公开披露，期间未给。
5. **Muse Spark 竞争力**：28 项基准对比中 Muse Spark 仅 1 胜，Kimi K2.6 与 DeepSeek V4 Pro 各 3 胜（自建评测口径）。

### 依据

- p.7｜Furthermore, they took their data efforts to another level in late May by announcing a new “applied AI engineering org” as part of their most recent round of layoffs/restructuring. \~3000 engineers, which includes 70% of their new grads and a significant number of seniors, will now be making RL tasks/environments full-time.
- p.8｜Mercor recently disclosed that they logged 2,517,000 expert hours on their platform in 2Q26, which is equivalent to \~4800 people working 40 hours a week. Meta is already in the same ballpark, and their average quality i
- p.9｜However, even if we remain conservative and only assign specific, high-profile Meta DC sites to MSL, their training compute is still comparable to OpenAI and Anthropic through 2026 and 2027.
- p.8｜Mercor recently disclosed that they logged 2,517,000 expert hours on their platform in 2Q26, which is equivalent to \~4800 people working 40 hours a week. Meta is already in the same ballpark, and their average quality is likely higher. Additionally, they have another \~70k people to pull from if this experiment ends up being as valuable as we think.
- p.3｜[Figure: RL data companies — ARR & valuation. Surge AI (\~\$3B ARR / \~\$30B), Mercor (\$2B+ / \$10B), Handshake AI (\~\$1B / \$3.5B), Micro1 (\$250M+ / \~\$2.5B), Fleet (\$63M / \$725M), Mechanize (undisclosed / \$500M), Afterquery (\$100M+ / \$300M), Deeptune (undisclosed). Source: Public disclosures, SemiAnalysis]
- p.2｜[Figure: AI compute (Meta / OpenAI / Anthropic), 4Q23–2Q27. Source: SemiAnalysis Tokenomics Model]

## Q2 · 他的**物理量**从哪来、能不能核？

物理量全部出自 SemiAnalysis 自建的 Datacenter Industry Model 与 AI Networking Model 跟踪，**不是 Meta 官方披露**。可回溯性分级如下：

- **可部分回溯**：爱荷华 1GW 租约（2025 年 6 月已在 Datacenter Model 中提示，源自公开租约消息）；2025 年 5 月 vs 2026 年 5 月卫星影像对比（可外部核图）；Prometheus 园区布局（27 座数据中心分布于 6 个园区，5 个相距 6km 以内、第 6 个 75–80km，来源标注含 Meta）。
- **不可完全核（模型估算，降旁证）**：5 座 1GW+ 泰坦集群同时在建（俄亥俄 Prometheus、路易斯安那 Hyperion、El Paso/爱荷华/印第安纳 3 座未命名园区）；Hyperion 在建 1.5GW（3×400MW 加 3×100MW）；Prometheus 两年内从约 1GW 扩至 3GW 以上；AI-Backbone 约 22 Pb/s 双向带宽；区域内部时延 1–10µs、100km 外站点时延不低于 500µs；其余泰坦将互连相距达 2000km 的园区。作者自称对五座泰坦有建筑级跟踪与精确月度时间线，且部分设施为表后供电（behind-the-meter）并标注审批风险，但这些底层数据在付费订阅产品内，本件中无法逐行回溯。

### 依据

- p.9｜Meta is simultaneously building 5 1GW+ “titan” clusters. There’s Prometheus in Ohio, Hyperion in Louisiana, and 3 unnamed campuses in El Paso, Iowa, and Indiana.
- p.10｜For Hyperion, Meta is building the world’s largest single buildings at 400MW each. A total of 1.5GW is under construction today: 3x 400MW monsters plus 3 more standard 100MW buildings.
- p.10｜In Iowa, Meta signed a 1GW lease with a leading datacenter operator (as we flagged in June 2025 in our Datacenter Model).
- p.10｜For Hyperion, Meta is building the world’s largest single buildings at 400MW each. A total of 1.5GW is under construction today: 3x 400MW monsters plus 3 more standard 100MW buildings. Hyperion 方面，Meta 正在建造世界上最大的单体建筑，每栋 
- p.10｜We have building-level tracking of all five Titans, and are the first to call out any expansions with precise monthly timelines. Some of these facilities use behind-the-meter power and we track the exact type of system and flag permitting risk.
- p.11｜Instead of a single datacenter or campus, Prometheus is a constellation of 27 datacenters spread across 6 campuses. 5 of these are within 6km of each other and the 6th is 75 to 80km away from the rest.
- p.11｜The L3 Superspines are then aggregated on a single L4 Inter-BAG hub which is set to provide around 22 petabits per second of bi-directional bandwidth across the whole Prometheus cluster.
- p.12｜Inside a DSF or a NSF region, the latency usually sits between 1 to 10µs, but the latency to reach a site that is 100km apart cannot be lower than 500µs, just due to light propagation in the fiber
- p.12｜Overall, while Prometheus offers a solution to current limitations, the other Titans will go even further with scale-across, connecting campuses up to 2,000kms apart.

## Q3 · 这份材料是**四种交付物里的哪一种**？同源的另一份是哪一份？

本件为**中英对照件（bilingual）**：文末明确标注"中英对照 / BILINGUAL"，正文逐段英中对照。同源的另一份是同一报告《The Future of Meta Superintelligence: A 1 Year Progress Update》的英文 original 版（SemiAnalysis，Max Kan、Julien Martin-Prin、Jeremie Eliahou Ontiveros、Dylan Patel，2026-07-09），与本件共用同一 root source，计源时不得归一。

按内容形态归类为**论点稿**：有完整假设链（数据、人才、算力三项论证）与产业判断，但无可复算的模型表。文中"our original post on MSL""our previous MSL article""our recent newsletter""our recent piece on Meta compute"所指为同机构其他文章，系背景引用，非本件的同源交付物。

### 依据

- p.1｜中英对照 / BILINGUAL
- p.1｜SemiAnalysis · Max Kan, Julien Martin-Prin, Jeremie Eliahou Ontiveros, Dylan Patel · 2026-07-09 · https://semianalysis.com/2026/07/09/the-future-of-meta-superintelligence
- p.1｜For more details, see our original post on MSL.

## Q4 · 他的**假设与算式**能不能复算？

能复算两处，均可落成一行公式：

1. **Hyperion 在建规模**：3×400MW + 3×100MW = 1200MW + 300MW = 1500MW = 1.5GW，与文中"A total of 1.5GW is under construction today"完全一致——复算通过。
2. **Mercor 专家工时折算**：2,517,000 小时 ÷（40 小时/周 × 13 周/季）≈ 4,842 ≈ 4,800 人每周 40 小时，与文中"\~4800 people working 40 hours a week"一致——复算近似通过（需补"1 季度 = 13 周"假设，文中未明说，故记近似）。

核心结论性数字（Meta 算力何时超过 OpenAI/Anthropic、训练算力与之相当）只有 Tokenomics Model 的输出，无输入与中间算式，**不可复算**，只能当外部估算。

### 依据

- p.10｜For Hyperion, Meta is building the world’s largest single buildings at 400MW each. A total of 1.5GW is under construction today: 3x 400MW monsters plus 3 more standard 100MW buildings.
- p.8｜Mercor recently disclosed that they logged 2,517,000 expert hours on their platform in 2Q26, which is equivalent to \~4800 people working 40 hours a week. Meta is already in the same ballpark, and their average quality is likely higher. Additionally, they have another \~70k people to pull from if this experiment ends up being as valuable as we think.
- p.9｜Our new Tokenomics Model projects that Meta will have more AI compute than both OpenAI and Anthropic by the end of this year.

## Q5 · 关键数字的**脚注指向哪**？

本件无编号脚注体系，来源以图注与文内括注给出，分两类：

- **指向一手（可回溯）**：GDPval 任务示例与 HealthBench rubric 示例标注"Source: OpenAI, SemiAnalysis"（OpenAI 公开发布物）；RL 数据公司 ARR/估值标注"Source: Public disclosures, SemiAnalysis"（公开披露，可再上一层到公司公告与融资稿）；Prometheus 园区布局标注"Source: SemiAnalysis AI Networking Model, Meta"（部分来自 Meta 一手）。
- **指向自建模型（二手，无法在本件内回溯）**：算力预测与模型基准对比指向"SemiAnalysis Tokenomics Model"；泰坦在建规模与卫星图指向"SemiAnalysis Datacenter Model"；AI-Backbone 架构与时延指向"SemiAnalysis AI Networking Model"——三者均为付费订阅产品，具体底层数据不在本件中。

结论：Meta 相关的关键数字（算力轨迹、在建 GW 规模）全部指向 SemiAnalysis 自建模型，属二手不可回溯，默认 Ⅱ 档；直接引用 OpenAI、Meta、公开披露的少量条目可升 Ⅰ 档。

### 依据

- p.2｜[Figure: Muse Spark vs Kimi K2.6 vs DeepSeek V4 Pro across 28 benchmarks (Muse Spark 1 win, Kimi K2.6 3 wins, DeepSeek V4 Pro 3 wins). Source: SemiAnalysis Tokenomics Model]
- p.3｜[Figure: RL data companies — ARR & valuation. Surge AI (\~\$3B ARR / \~\$30B), Mercor (\$2B+ / \$10B), Handshake AI (\~\$1B / \$3.5B), Micro1 (\$250M+ / \~\$2.5B), Fleet (\$63M / \$725M), Mechanize (undisclosed / \$500M), Afterquery (\$100M+ / \$300M), Deeptune (undisclosed). Source: Public disclosures, SemiAnalysis]
- p.5｜[Figure: GDPval task example — a four-day Istanbul wedding itinerary for an ultra-high-net-worth principal (excerpted from a 1,064-word prompt). Source: OpenAI, SemiAnalysis]
- p.6｜[Figure: Example rubric from OpenAI’s HealthBench (19 criteria, max +91, floor −47). Source: OpenAI, SemiAnalysis]
- p.10｜[Figure: Hyperion under construction. Source: SemiAnalysis Datacenter Model]
- p.10｜[Figure: May 2025 (left) vs May 2026 (right) satellite imagery. Source: SemiAnalysis Datacenter Model]
- p.11｜[Figure: Prometheus campus layout near Columbus, Ohio. Source: SemiAnalysis AI Networking Model, Meta]
- p.11｜[Figure: L2 to L3/BAG network architecture. Source: SemiAnalysis AI Networking Model]

## Q6 · 他的**自建口径 / 评级**定义是什么？与公司口径差多少？

自建口径有三，均为 SemiAnalysis 付费订阅产品：**Tokenomics Model**（AI 算力预测与模型评测）、**Datacenter Industry Model**（数据中心产能与建筑级跟踪）、**AI Networking Model**（网络架构与时延）。本件只给结论，不给记分项、权重、打分区间与重算方法——**定义不完整，不得当客观标准入格**。另有一个自建评测口径"Muse Spark vs Kimi K2.6 vs DeepSeek V4 Pro across 28 benchmarks"（计 1/3/3 胜），同样未给 28 项基准的清单与权重。与公司口径差异：文中所有算力与在建产能数字均非 Meta 官方口径（Meta 仅作为来源之一出现在园区布局图注中），无任何一项可与公司披露逐项对照；差异程度无法量化，只能记"全部为外部估算"。

### 依据

- p.2｜[Figure: AI compute (Meta / OpenAI / Anthropic), 4Q23–2Q27. Source: SemiAnalysis Tokenomics Model]
- p.9｜This is exactly what we see happening. Our new Tokenomics Model projects that Meta will have more AI compute than both OpenAI and Anthropic by the end of this year.
- p.9｜Much has been written about Colossus and Elon’s ability to bring enormous amounts of compute online quickly, but what Meta’s doing today is arguably even more impressive, as our Datacenter Industry Model subscribers have known for over a year.
- p.11｜To address this Meta has introduced a solution called AI-Backbone (or AIBB for short).
- p.2｜[Figure: Muse Spark vs Kimi K2.6 vs DeepSeek V4 Pro across 28 benchmarks (Muse Spark 1 win, Kimi K2.6 3 wins, DeepSeek V4 Pro 3 wins). Source: SemiAnalysis Tokenomics Model]

## Q7 · 他**有没有投行关系 / 持仓**？

材料未披露。全文未见作者或 SemiAnalysis 持有 META 的声明、未见发行人（Meta）资助声明、未见任何付费关系或投行关系声明。文中唯一可确认的商业形态是付费订阅制（"behind the paywall"），但这本身不构成利益关系披露。持仓、资助、付费关系三项均按**未披露**处理，不能因署名"独立研究"而假定独立。

### 依据

- p.2｜Lastly, behind the paywall, we’ll discuss what this all means for Google—the company most people today still believe rounds out the AI big 3.

## Q8 · 他的**行业级判断**（产能 · 份额）有数据支撑吗？

分两类：

**有数据支撑（口径基本齐备，可作旁证）**：
- 数据中心产能：口径为在建电源功率（MW/GW）；地理范围为俄亥俄、路易斯安那、El Paso、爱荷华、印第安纳五座园区；时点为 2026 年 7 月发文；来源为 SemiAnalysis Datacenter Model。具体数：5 座 1GW+ 集群同时在建；Hyperion 在建 1.5GW（3×400MW + 3×100MW）；爱荷华 1GW 租约一年内从空地到整 GW 在建；行业对比"人类历史上从未同时有完整 1GW 园区在建，最近先例为 AWS 在印第安纳为 Project Rainier 建设的 800MW"，而 Meta 眼下同时有两座（Hyperion 与爱荷华）。
- RL 数据供应链规模：口径为 ARR（年度经常性收入）、时点 2026 年中、来源公开披露；三家老牌公司 Mercor/Surge/Handshake 均达 \$1B+ ARR，新进入者（Fleet、Mechanize、Afterquery）约 \$100M ARR。

**无数据支撑（模型推断，无公开口径）**：未来 2 年 Google 新增数据中心产能大部分将投向 IaaS 与第三方 API、DeepMind 训练算力将少于 OpenAI/Anthropic/MSL；Meta 2026 年底 AI 算力超过 OpenAI/Anthropic——均为 Tokenomics Model 预测，无统计口径四要素，属观点，不得用于市场空间推演。

### 依据

- p.9｜Meta is simultaneously building 5 1GW+ “titan” clusters. There’s Prometheus in Ohio, Hyperion in Louisiana, and 3 unnamed campuses in El Paso, Iowa, and Indiana.
- p.9｜Never in the history of humanity have we ever seen a full 1GW campus under construction simultaneously —the closest was AWS building 800MW in Indiana for Project Rainier—yet Meta has two of them right now! Hyperion and Iowa.
- p.10｜In Iowa, Meta signed a 1GW lease with a leading datacenter operator (as we flagged in June 2025 in our Datacenter Model). As you can see from the satellite images below, they’ve gone from nothing to the full GW under construction in just 1 year.
- p.3｜Data is the new oil (for real this time) 数据是新的石油（这次是真的） We’ll start with data because it’s Meta’s newest advantage and probably the most underappreciated of the three. 我们从数据讲起，因为这是 Meta 最新获得的优势，也很可能是三者中最被低估的一项。 In 2024, 
- p.15｜We project that the majority of Google’s incremental datacenter capacity for the next 2 years will go towards their infrastructure as a service (IaaS) and 3p API businesses. DeepMind will have less training compute than OpenAI, Anthropic, and MSL.
- p.9｜Our new Tokenomics Model projects that Meta will have more AI compute than both OpenAI and Anthropic by the end of this year.
