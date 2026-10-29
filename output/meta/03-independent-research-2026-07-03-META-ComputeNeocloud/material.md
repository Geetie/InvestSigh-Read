---
id: 03-independent-research-2026-07-03-META-ComputeNeocloud
cat: "03"
sub: independent-research
template: independent-research
template_version: 2
date: 2026-07-03
time: "00:00"
title: "Meta Compute: Everyone Wants To Be A Neocloud"
kind: "手稿"
issuer: SemiAnalysis
ticker: META
source_pages: 12
---


## Q1 · 他给的公司**未披露口径**的外部估算是什么？

据该文（外部估算，非公司披露口径），核心是 Meta 算力容量的两套自建分拆：

- **半年签约容量**：2026 年上半年 Meta 在 Cloud & Colo 渠道已签约超 5GW 容量，且不含其自建活动——这是对"已签约管道"的外部跟踪值。
- **在建容量**：Meta 两大校园的在建容量合计 2.5GW（由两幅现场图片代表）。
- **2024 年初以来累计签约**：接近 10GW 交易，且当前新增容量的主体已转向第三方（self-build / datacenter leasing / cloud renting 三分法按季度跟踪）。
- **容量用途拆分**：按其 Tokenomics / Datacenter Model，容量被拆为 MSL（Meta Superintelligence Labs）、Other AI、non-AI 三类，2026 年 Other AI 出现激增——Meta 不披露此口径。
- **SpaceX 剩余算力**：外售交易后 SpaceX 仍留有最高 900MW，足够训练前沿模型。
- **外部售算力定价锚**：按 $50B/GW/年营收、200MW → $10B/年 的换算。
- **代理变量**：全部数字来自其自建的 Datacenter Model / Tokenomics Model / AI Cloud TCO Model（每年跟踪数百笔 GPU 云交易、含 SLA/定价/合同期限），属"自建跟踪体系"，与目标量之间有模型换算，但模型本身与逐笔数据未公开，故只能作量级旁证。

### 依据

- p.1｜In just the first six months of the year, Meta has contracted over 5GW of capacity across Cloud & Colo,and that doesn't even include all their accelerating self-build activity.
- p.1｜these two pictures represent 2.5GW of capacity under construction!
- p.3｜Our Datacenter Model breaks down quarter by quarter their capacity additions across selfbuild,datacenter leasing,and cloud renting. After nearly 10GW of deals signed since early 2024, the bulk of their capacity additions are now through 3rd parties.
- p.3｜Our model also breaks down,quarter by quarter, Meta's capacity into MSL,other A1, and non-AI.
- p.11｜SpaceX still has up to 90oMW left after their eye-watering compute deals.
- p.6｜Enter Meta. Given their laser-focus on building Superintelligence,they probably didn't put enough thought into the Cloud option. SpaceX and Elon paved the way for them. At \$50B/Gigawatt of annual revenue,it becomes an easy call. Just allocating 20oMW of compute to an external customer drives \$10B/yr of revenue,at sky-high margin. And the ability to cancel that contract within 90 days makes it even easier - if they want to give MSL more compute, they can, in short notice.
- p.5｜Our AI Cloud TCO model team tracks hundreds of GPU cloud deals every year, including all contract terms like SLA, pricing, contract length etc.

## Q2 · 他的**物理量**从哪来、能不能核？

核心物理量（5GW 半年签约、2.5GW 在建、近 10GW 累计签约）全部出自 SemiAnalysis 自建的 Datacenter Model，正文未给出可回溯的原始出处——无海关编码、无环评产能文件、无招标公告、无站点坐标或卫星面积数据，仅有"两幅最大校园图片"与"tent 数据中心设计在各地出现"这类定性图像线索：

- **5GW / 10GW / 2.5GW**：来源标注为 Datacenter Model（图注 "Source: SemiAnalysis Datacenter Model"），模型口径与逐笔合同清单均未披露，**来源不可回溯，数值降为旁证**。
- **反驳"全美仅 5GW 在建"头条**：其论据是"仅两个数据中心就占一半"，同样无统计口径（哪些项目计入、时点、地理范围）。
- **tent 数据中心**：称一年前最先跟踪到 Meta 的 "tent" 超快数据中心设计，此后在全美出现——图像线索，可粗核但未给站点清单。

结论：物理量来源为其自建模型 + 图像判断，**无法核**（无海关/环评/招标/卫星面积级出处），按红灯规则上报，不得当事实入格。

### 依据

- p.1｜Meta's capacity under construction just keeps accelerating. We show below Meta's two largest campuses - these two pictures represent 2.5GW of capacity under construction!
- p.1｜In just the first six months of the year, Meta has contracted over 5GW of capacity across Cloud & Colo,and that doesn't even include all their accelerating self-build activity.
- p.2｜By the way, if you believed the laughable headlines that “half of US datacenters and delayed and only 5GW are under construction", we show you here that just two datacenters are half of this. Read our piece “Stop Saying Half of US Datacenters Are Delayed" for more on why these headlines are completely off.
- p.3｜After nearly 10GW of deals signed since early 2024, the bulk of their capacity additions are now through 3rd parties.
- p.6｜A year ago, we were the first to track their new“tent” ultra-fast datacenter design. Since then, Meta tents have been popping up all over the US!

## Q3 · 这份材料是**四种交付物里的哪一种**？同源的另一份是哪一份？

**归类：original（论点稿，有假设链）**。判据：署名作者 + "∙ PAID" 付费墙体例的完整长文，含明确论点链（"Meta 算力采购将加速、2027 资本开支将高得惊人"→ 四大用例：前沿模型 / RecSys / Bedrock 式 Claude 分发 / SpaceX 式外售算力 → 每条用例配价格与容量论据），属论点稿而非数据稿、模型件或拆解稿。文内注明部分深度内容在 paywall 之后（MSL 与 RecSys 展望）。材料库中未见本件的 bilingual / translation / summary 同源件，按"材料无同源件"处理；文中引用的 "Stop Saying Half of US Datacenters Are Delayed" 等为其姊妹篇，非本件加工版，**不得当同源件计数**。

### 依据

- p.1｜JEREMIE ELIAHOU ONTIVEROS,MAX KAN, JOEY BROOKHART,AND 2 OTHERS JUL 03,2026·PAID
- p.9｜Behind paywall, we discuss the outlook for RecSys scaling, and then for Meta Superintelligence Labs.
- p.4｜SpaceX dreams - Elon's genius deals
- p.2｜Read our piece “Stop Saying Half of US Datacenters Are Delayed" for more on why these headlines are completely off.

## Q4 · 他的**假设与算式**能不能复算？

**能复算。** 全文最可复算的一行是 SpaceX 式外售算力收益换算：

- 假设：单价 $50B/GW/年（年营收口径）；分配 200MW = 0.2GW 给外部客户。
- 算式：0.2 GW × $50B/GW/年 = $10B/年——与文中 "Just allocating 20oMW of compute to an external customer drives \$10B/yr of revenue" 完全一致，正文两处表述（"couple hundred MWs → >\$10B"）互相印证。
- 复算结论：200MW × $50B/GW = $10B/yr ✓ 通过。这是本份材料唯一能进模型的算式（可落到 M-7 资本开支格的"算力外售变现单价"旁证档）。

第二处可近似复算：GEM 训练栈 "23x effective training FLOPs with ~1.4x increase in MFU using 16x more GPUs"：16 × 1.4 = 22.4 ≈ 23 ✓（数量级吻合，属约数）。

其余核心判断（2027 资本开支"将高得惊人"、RecSys 可吸收 >10x 算力增长）只给结论与方向，未给算式与输入，不可复算，按"只给结果"标无法核。

### 依据

- p.6｜Enter Meta. Given their laser-focus on building Superintelligence,they probably didn't put enough thought into the Cloud option. SpaceX and Elon paved the way for them. At \$50B/Gigawatt of annual revenue,it becomes an easy call. Just allocating 20oMW of compute to an external customer drives \$10B/yr of revenue,at sky-high margin. And the ability to cancel that contract within 90 days makes it even easier - if they want to give MSL more compute, they can, in short notice.
- p.3｜2. RecSys: We believe Meta thinks they can scale up Ads recommendation systems by >10x in complexity to accelerate revenue growth. That requires both inference & training compute for their RecSys models. They can also do
- p.9｜: A new training stack that has 23x effective training FLOPs with \~1.4x increase in MFU using 16x more GPUs
- p.1｜Capex in 2027 will be shockingly high.

## Q5 · 关键数字的**脚注指向哪**？

材料未给出此项——**全篇无编号脚注、无参考文献列表**。关键数字的"出处"仅为图注 "Source: SemiAnalysis Datacenter Model" / "Source: SemiAnalysis Tokenomics Model, Datacenter Model"，指向其自建模型而非监管文件、公司公告或行业协会统计（即二手中的自建口径）。按数据纪律：无脚注 ⇒ 一律Ⅱ级（间接），只有那些明确转述公司财报口径的数（如 Q1 2026 广告展示量 +19%、广告均价 +12%，注明为 CFO Susan Li 归因）才具备指向一手的条件，但仍需回 Meta 财报核对后才能升档。

### 依据

- p.4｜Source: SemiAnalysis Tokenomics Model, Datacenter Model Let's now dig into these four options.
- p.3｜Our Datacenter Model breaks down quarter by quarter their capacity additions across selfbuild,datacenter leasing,and cloud renting.
- p.10｜This is a continuation CFO Susan Li has attributed their increased average price per ad to improved ad performance and targeting capabilities.

## Q6 · 他的**自建口径 / 评级**定义是什么？与公司口径差多少？

文中用到三个自建口径，均**未给完整定义（无打分权重、无算式细则）**：

1. **Datacenter Model 容量三分法**：容量增量按 selfbuild / datacenter leasing / cloud renting 分拆；容量存量按 MSL / Other AI / non-AI 分拆。公司不披露任何容量用途拆分——与公司口径的差：这是纯自建口径，无法与公司财报对表。
2. **Tokenomics Model**：按 RecSys AI / Meta SuperIntelligence / other Meta LLM products 分拆算力消耗，模型不公开，只给结论图。
3. **AI Cloud TCO Model / ClusterMAX**：每年跟踪数百笔 GPU 云交易（SLA、定价、合同期限）；标题预告 "ClusterMAX ranking coming soon"——新自建榜单尚未发布，定义空白，**该口径不得采用**。

无自建评分/评级体系，无权重，无打分区间；定义均不完整，按手册记"定义不完整，不得与公司口径混用"。

### 依据

- p.3｜Our Datacenter Model breaks down quarter by quarter their capacity additions across selfbuild,datacenter leasing,and cloud renting.
- p.9｜We cover this split compute split between RecSys AI, Meta SuperIntelligence,and other Meta LLM products in our Tokenomics Model.
- p.1｜Zuck Takes Plan B? SpaceX 2.0, Bedrock 2.0, MSL Isn't Giving Up, Scaling RecSys by 10x... ClusterMAX ranking coming soon?
- p.5｜Our AI Cloud TCO model team tracks hundreds of GPU cloud deals every year, including all contract terms like SLA, pricing, contract length etc.

## Q7 · 他**有没有投行关系 / 持仓**？

材料未披露。全文无任何关于作者/机构持仓、是否受发行人资助、与客户付费关系的声明；唯一可确认的形态信息是署名（JEREMIE ELIAHOU ONTIVEROS、MAX KAN、JOEY BROOKHART 等）与 SemiAnalysis 付费订阅出版标记（∙ PAID）。按手册：三项均未声明 ⇒ 按"关系不明"处理，不能假定独立，可信度降级上报。

### 依据

- p.1｜JEREMIE ELIAHOU ONTIVEROS,MAX KAN, JOEY BROOKHART,AND 2 OTHERS JUL 03,2026·PAID
- p.12｜Recommend

## Q8 · 他的**行业级判断**（产能 · 份额）有数据支撑吗？

部分有数据、但口径不完整：

- **"Meta 将成为 Coreweave、Nebius 等 RPO 增长的重要来源"**：推论，无数据。
- **"2024 年初以来近 10GW 签约"**：有数，但口径模糊——未说明这 10GW 含哪些渠道（是否含 self-build）、是否含意向书、地理范围、逐年拆分，属自建模型口径。
- **反驳"全美仅 5GW 在建"头条**：有数据方向（两个数据中心即占一半）但无统计口径（全样本清单、时点、计入标准），行业数口径不完整，不得用于市场空间推演。
- **"2027 年资本开支将高得惊人"**：断言无数。
- **广告侧行业级数据有明确口径**：Q1 2026 广告展示量 +19% YoY、广告均价 +12% YoY（财报口径，CFO 归因）；GEM 训练栈 23x FLOPs、~1.4x MFU、16x GPU；Advantage+ 购物广告 ROAS +32%、cost/action -17%——这些是 Meta 自身披露口径的转述，口径四要素（量名、期间、范围、来源）齐全，可作背景。

结论：产能/份额级判断缺口径，广告经营数据口径齐全；前者不得入格，后者可作公司口径旁证待核。

### 依据

- p.3｜After nearly 10GW of deals signed since early 2024, the bulk of their capacity additions are now through 3rd parties. We expect this to continue and believe that Meta will be a huge source of RPO growth for the likes of Coreweave, Nebius and others.
- p.2｜if you believed the laughable headlines that “half of US datacenters and delayed and only 5GW are under construction", we show you here that just two datacenters are half of this.
- p.1｜Capex in 2027 will be shockingly high.
- p.10｜In Q1 2026,ad impressions grew 19% YoY and average price per ad grew 12% YoY.
- p.10｜Meta Advantage+ Shopping delivers 32% higher ROAS with 17% lower cost/action relative to manual campaigns.
- p.9｜The key question on everyone's mind is now- is this sustainable? How much can Meta accelerate core revenue growth? While Meta is playing catching up on the frontier lab side, the non-Meta SuperIntelligence AI chip fleet 
