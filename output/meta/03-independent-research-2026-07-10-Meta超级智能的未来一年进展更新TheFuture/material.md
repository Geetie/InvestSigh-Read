---
id: 03-independent-research-2026-07-10-Meta超级智能的未来一年进展更新TheFuture
cat: "03"
sub: independent-research
template: independent-research
template_version: 2
date: 2026-07-10
time: "00:00"
title: "SemiAnalysis 全文对照：Meta 超级智能一周年进展——数据、人才、算力与对 Google 的建议（2026-07-09）"
kind: "independent-research"
issuer: "SemiAnalysis / Max Kan、Julien Martin-Prin、Jeremie Eliahou Ontiveros、Dylan Patel"
ticker: META
source_pages: 29
---

## Q1 · 他给的公司**未披露口径**的外部估算是什么？

四类，均为 Meta 不披露的投入侧量，一律标外部估算：

① **数据侧人力**：5 月底重组中新设"应用 AI 工程组织"，约 3000 名工程师（含 70% 应届生与大量资深）转全职制作 RL 任务/环境；另有约 7 万人可调用。代理变量=重组公告的编制口径，没有产能产出比。

② **专家工时对标**：Mercor 2Q26 记录 2,517,000 专家工时，折约 4800 人×40 小时/周；作者判断 Meta 已同量级且质量更高。样本=单平台单季度。

③ **RL 数据供应链收入**：Mercor、Surge、Handshake 三家 ARR 均超 10 亿美元，成立一年的新进入者（Fleet、Mechanize、Afterquery）约 1 亿美元。口径 ARR，期间未标。

④ **价格与算力**：一个像样的编码任务 \$5000+，Mercor 平均时薪超 \$100/小时，顶尖承包商年入七位数；Tokenomics Model 预测 2026 年底 Meta 的 AI 算力超过 OpenAI 与 Anthropic，保守划分后 2026–27 训练算力仍相当。

判断：①②③ 有交易对手或单季样本，可当量级用；④ 里的算力预测只有输出，没有从 GW 到算力的换算桥，只能当方向，不能入格。

### 依据

- p.13｜layoffs/restructuring. ~3000 engineers, which includes 70% of their new grads and a significant number of seniors, will now be making RL tasks/environments full-time.
- p.13｜Mercor recently disclosed that they logged 2,517,000 expert hours on their platform in 2Q26, which is equivalent to ~4800 people working 40 hours a week. Meta is already in the same ballpark, and their average quality is likely higher.
- p.5｜The three incumbements—Mercor, Surge, and Handshake—are all at $1B+ ARR, and many new entrants who are barely a year old (e.g. Fleet, Mechanize, and Afterquery) are sitting around $100M ARR.
- p.14｜Frontier labs are willing to pay $5000+ for a single decent coding task. Mercor’s average pay rate recently surpassed $100/hr, and the rate for SWEs is significantly above average.
- p.15｜This is exactly what we see happening. Our new Tokenomics Model projects that Meta will have more AI compute than both OpenAI and Anthropic by the end of this year.

## Q2 · 他的**物理量**从哪来、能不能核？

物理量全部来自 SemiAnalysis 自建的 Datacenter Industry Model 与 AI Networking Model，不是 Meta 公告。逐项：5 座 1GW+ "泰坦"集群同时在建（俄亥俄 Prometheus、路易斯安那 Hyperion、El Paso、爱荷华、印第安纳）；Hyperion 在建 1.5GW＝3×400MW＋3×100MW；爱荷华签 1GW 租约，一年内从空地到整 GW 在建；Prometheus 两年从约 1GW 扩到 3GW 以上，采用"帐篷式"简易数据中心设计，形态是 6 个园区 27 座数据中心（5 个相距 6km 内，第 6 个 75–80km）；AI-Backbone 单枢纽约 22 Pb/s 双向带宽；园区内时延 1–10µs、100km 外不低于 500µs；其余泰坦互连最远 2000km。

可回溯性：爱荷华租约与 2025 年 5 月／2026 年 5 月卫星影像对比可外部核，作者称 2025 年 6 月已在模型里提示过，这两项记"可部分回溯"；其余 GW 数、带宽、时延、2000km 全指向付费模型，本件无逐站点 MW 与上电时间表，记"来源不可回溯"，降为旁证，不得当 Meta 官方在建产能入格。

### 依据

- p.16｜Meta is simultaneously building 5 1GW+ “titan” clusters. There’s Prometheus in Ohio, Hyperion in Louisiana, and 3 unnamed campuses in El Paso, Iowa, and Indiana.
- p.16｜For Hyperion, Meta is building the world’s largest single buildings at 400MW each. A total of 1.5GW is under construction today: 3x 400MW monsters plus 3 more standard
- p.17｜In Iowa, Meta signed a 1GW lease with a leading datacenter operator (as we flagged in June 2025 in our Datacenter Model). As you can see from the satellite images below, they’ve gone from nothing to the full GW under construction in just 1 year.
- p.18｜The Prometheus cluster also keeps expanding—from an initial ~1GW to now >3GW within two years. To understand how Meta achieves this, check out our Datacenter Model. We have building-level tracking of all five Titans, and are the first to call out any expansions with precise monthly timelines.
- p.19｜Instead of a single datacenter or campus, Prometheus is a constellation of 27 datacenters spread across 6 campuses. 5 of these are within 6km of each other and the 6th is 75 to 80km away from the rest.
- p.21｜The L3 Superspines are then aggregated on a single L4 Inter-BAG hub which is set to provide around 22 petabits per second of bi-directional bandwidth across the whole Prometheus cluster.
- p.22｜Inside a DSF or a NSF region, the latency usually sits between 1 to 10µs, but the latency to reach a site that is 100km apart cannot be lower than 500µs, just due to light propagation in the fiber
- p.22｜Overall, while Prometheus offers a solution to current limitations, the other Titans will go even further with scale-across, connecting campuses up to 2,000kms apart.

## Q3 · 这份材料是**四种交付物里的哪一种**？同源的另一份是哪一份？

本份是 **bilingual**（双语句对齐）：页首英文标题下并列中文标题，正文每一段英文后紧跟同一段中文，全文论证完整（含付费墙后那节的 Google 部分），页脚保留 Substack 原始信息。它比另一份双语件更完整，是全文版而非精编版。

同源组：`0000-00-00-metamsl1yrbilingual`、`0000-00-00-metamsl1yrsummary`、`2026-07-10-META-1yrProgress`（已填）。四份共用同一来源 SemiAnalysis 2026-07-09《The Future of Meta Superintelligence: A 1 Year Progress Update》，**不得计成四个独立源**。

版本差异要留意：英文写"more AI compute than both OpenAI and Anthropic"（超过两者各自），中文栏译成"超过 OpenAI 和 Anthropic 两家之和"，强度被放大；引用该结论时以英文原文为准，并注明"译本与英文原本表述不一致"。

### 依据

- p.1｜JUL 10, 2026  2026 年 7 月 10 日 · PAID  · 付费
- p.1｜MAX KAN, JULIEN MARTIN-PRIN, JEREMIE ELIAHOU ONTIVEROS, AND DYLAN PATEL
- p.15｜This is exactly what we see happening. Our new Tokenomics Model projects that Meta will have more AI compute than both OpenAI and Anthropic by the end of this year.
- p.15｜Anthropic 两家之和

## Q4 · 他的**假设与算式**能不能复算？

两处可复算、一处不可，另有一处译本内部对不上：

① Hyperion 在建规模：3×400MW＋3×100MW＝1200＋300＝1500MW＝1.5GW，与"1.5GW is under construction today"一致——**复算通过**。
② Mercor 工时折人头：2,517,000÷（40×13）≈4,842≈4,800——**近似通过**，但"一季度 13 周"这个假设文中没写，需自己补。
③ 核心结论（2026 年底算力超过 OpenAI 与 Anthropic；保守划分后 2026–27 训练算力仍相当）只有模型输出，无输入、无中间步骤，**不可复算**。
④ 口径不允许混算：英文是"超过两者各自"，中文栏写成"超过两家之和"。若按中译理解，Meta 2026 年底算力要大于 OpenAI 与 Anthropic 之和，这比原文强得多，且与后文"训练算力仍相当"自相矛盾——用中译做推演会系统性高估。

判断：可入模型的只有 1.5GW 这个在建规模；算力对比只能当叙事，且必须回英文原文。

### 依据

- p.16｜For Hyperion, Meta is building the world’s largest single buildings at 400MW each. A total of 1.5GW is under construction today: 3x 400MW monsters plus 3 more standard
- p.13｜Mercor recently disclosed that they logged 2,517,000 expert hours on their platform in 2Q26, which is equivalent to ~4800 people working 40 hours a week.
- p.15｜However, even if we remain conservative and only assign specific, high-profile Meta DC sites to MSL, their training compute is still comparable to OpenAI and Anthropic through 2026 and 2027.
- p.15｜Anthropic 两家之和

## Q5 · 关键数字的**脚注指向哪**？

无编号脚注，来源全部落在图注 `Source:` 行与文内括注，按指向分三档：

**指向一手（可升 Ⅰ）**：RL 数据公司 ARR/估值标"Public disclosures"；GDPval 任务样例与 HealthBench rubric 标"OpenAI"；Prometheus 园区布局标"AI Networking Model, Meta"，其中一部分来自 Meta 本身。

**指向自建付费模型（Ⅱ，本件内不可回溯）**：算力预测与 28 项基准→Tokenomics Model；在建规模与卫星图→Datacenter Model；AI-Backbone 拓扑与时延→AI Networking Model。

**指向被转述的第三方（Ⅱ）**：Scale AI 的 143 亿美元"投资"、\$1B+ 买断基金、6 月底前挖到至少 14 名研究员，均以"it was reported"引出，无具体报道方。

另有一处技术性瑕疵：网络架构图注把机构名拼成"SemiAnalyis"，属 OCR 或排版错字，引用时照抄不改。判断：当结论用的算力与 GW 数字全在自建模型上，一律 Ⅱ 档。

### 依据

- p.6｜Source: Public disclosures, SemiAnalysis
- p.9｜Source: OpenAI, SemiAnalysis
- p.17｜Source: SemiAnalysis Datacenter Model
- p.18｜May 2025 (left) vs May 2026 (right). Source: SemiAnalysis Datacenter Model
- p.20｜Source: SemiAnalysis AI Networking Model, Meta
- p.22｜Source: SemiAnalyis AI Networking Model
- p.23｜it was reported that Meta had poached at least 14 researchers by the end of June 2025.

## Q6 · 他的**自建口径 / 评级**定义是什么？与公司口径差多少？

自建口径三件，都是付费订阅产品，本件只给名字与结论：**Tokenomics Model**（AI 算力 4Q23–2Q27 预测、28 项基准胜负）、**Datacenter Industry Model**（五座泰坦的建筑级跟踪与月度扩建时间线、表后供电与审批风险）、**AI Networking Model**（AI-Backbone 拓扑、22 Pb/s、时延）。

三项都没给记分项、权重、单站点 MW 输入或重算方法；"AI 算力"未定义是 FLOPS、卡数还是可训练 token；28 项基准不列清单与权重。**定义不完整，不得当客观标准入格**。

与公司口径的差异：三项都不是 Meta 披露口径，Meta 只在园区布局图注里作为来源之一出现；差异方向与幅度无法量化。此外本件中文栏把"超过两者各自"写成"超过两家之和"，等于在译本层面造出一个更激进的新口径，这属于口径漂移，必须按英文原文校正后才能用。

### 依据

- p.3｜Source: SemiAnalysis Tokenomics Model
- p.27｜Source: SemiAnalysis Tokenomics Model
- p.16｜impressive, as our Datacenter Industry Model subscribers have known for over a year.
- p.19｜Source: SemiAnalysis Datacenter Model
- p.15｜Anthropic 两家之和

## Q7 · 他**有没有投行关系 / 持仓**？

三项分开：收费顾问——未声明；投行关系——未声明；持仓或受资助——未声明。

查了哪里：页首只有作者署名与"PAID／付费"标记，那是付费墙标识，**不是**投行关系，也不能当"无投行关系"的证据；全文没有 Disclosure 段、没有作者简介、没有持仓或资助说明；文末只有 Substack 的版权与隐私链接。判断：按"关系不明"处理，不得假定独立。

补充一个可观察的事实：本件在结尾给 Google 下了"loser mentality"的判断，并明确"第三名之争是 Meta 对 SpaceX 不是 Google"，立场单向；在没有关系披露的前提下，这类排序与贬损性结论应降权，只能当作者观点引用。

### 依据

- p.1｜JUL 10, 2026  2026 年 7 月 10 日 · PAID  · 付费
- p.28｜In our view, the race for 3rd is currently between Meta and SpaceX, not Google.
- p.29｜© 2026 Dylan Patel · Privacy · Terms · Collection notice Substack is the home for great culture

## Q8 · 他的**行业级判断**（产能 · 份额）有数据支撑吗？

分两类：

**有数据支撑（可作旁证）**：① 在建产能——口径为在建电源功率，地理范围为俄亥俄、路易斯安那、El Paso、爱荷华、印第安纳，时点 2026 年 7 月，来源 Datacenter Model；行业锚点是"AWS 为 Project Rainier 在印第安纳建 800MW，而 Meta 眼下同时有两座完整 1GW 园区在建"。② 数据供应链规模——Mercor/Surge/Handshake 均 \$1B+ ARR，新进入者约 \$1 亿美元，口径 ARR、时点 2026 年中。③ Google 侧资本动作——刚增发 850 亿美元股权建 AI 基础设施，这是可查的融资事实。

**无数据支撑（记观点）**：Google 未来两年新增数据中心产能大部分投向 IaaS 与三方 API、DeepMind 训练算力将少于 OpenAI/Anthropic/MSL、这 850 亿美元带来的算力"大头将出租给 Anthropic 之类客户"。这三条是模型推断，无统计口径四要素，不得用于份额推演。

### 依据

- p.16｜Never in the history of humanity have we ever seen a full 1GW campus under construction simultaneously—the closest was AWS building 800MW in Indiana for Project Rainier—yet Meta has two of them right now! Hyperion and Iowa.
- p.5｜The three incumbements—Mercor, Surge, and Handshake—are all at $1B+ ARR, and many new entrants who are barely a year old (e.g. Fleet, Mechanize, and Afterquery) are sitting around $100M ARR.
- p.27｜We project that the majority of Google’s incremental datacenter capacity for the next 2 years will go towards their infrastructure as a service (IaaS) and 3p API businesses. DeepMind will have less training compute than OpenAI, Anthropic, and MSL.
- p.27｜Yes, they just issued $85B of equity to build more AI infrastructure, but we believe the majority of this additional compute will be rented out to customers like Anthropic.
