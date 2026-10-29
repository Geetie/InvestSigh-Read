---
id: 03-independent-research-2026-07-01-META-NeoCloudVsRent
cat: "03"
sub: independent-research
template: independent-research
template_version: 2
date: 2026-07-01
time: "00:00"
title: "Building a NeoCloud and Continuing to Rent Capacity are not Contradictory"
kind: "手稿"
issuer: FUNDA
ticker: META
source_pages: 4
---

## Q1 · 他给的公司**未披露口径**的外部估算是什么？

本文未自建针对公司未披露口径的估算模型；文中出现的两个未披露口径数字均为转述而非本人测算：一是 Meta 与 Crusoe 新签合计约 1.6 GW 的算力协议（两处数据中心），来源标注为 Bloomberg/Reuters；二是 Meta 向 NeoCloud 求购 3 GW 算力，出自 FUNDA 自己去年的 3Q25 META Preview（专家访谈素材整理，按三重转述处理）。两者均无代理变量、样本量与期间，也没有代理变量到目标量的换算桥，只能当量级旁证，不能入格。

### 依据

- p.1｜Per Bloomberg/Reuters, Meta recently signed a new AI computing capacity agreement with Crusoe, taking roughly 1.6 GW of combined capacity from two Crusoe data centers in Childress, Texas,and Warrenton, Missouri.
- p.1｜Meta is also still buying compute from other NeoClouds.

## Q2 · 他的**物理量**从哪来、能不能核？

文中有三个物理量，可核性各不相同：
- 1.6 GW：Meta 向 Crusoe 租用的两数据中心合计容量（得州 Childress 与密苏里 Warrenton），来源为 Bloomberg/Reuters 报道，属媒体二手，可回溯到媒体报道但非一手监管文件或公司公告；
- 3 GW：Meta 向 NeoCloud 求购的算力量，出自 FUNDA 自家 3Q25 Preview，文中无中间步骤，来源不可回溯，数值降为旁证；
- 22 万张以上 NVIDIA GPU：xAI Colossus 1 的 GPU 规模（含 H100、H200、GB200），来源为 xAI 公开声明，一手可核。

### 依据

- p.1｜So,on the surface, there does seem to be a contradiction: if Meta already has surplus compute, why keep renting 1.6 GW from Crusoe?
- p.1｜In our 3Q25 META Preview last year, we noted that Meta was seeking to purchase 3 GW of compute capacity from NeoClouds.
- p.3｜xAI states that Colossus 1 contains more than 220,000 NVIDIA GPUs, including H100, H200,and GB200,and can support training, fine-tuning, inference, and HPC workloads.

## Q3 · 这份材料是**四种交付物里的哪一种**？同源的另一份是哪一份？

按四类归档为**论点稿**：全文围绕单一论点（建 NeoCloud 与继续租算力不矛盾）展开，有完整假设链——H100/H200 对 3T+ 参数前沿训练的经济性下降 → Meta 面临代际资产再配置问题 → 建 NeoCloud（旧代 GPU 外销变现）与续租 1.6 GW（新代训练供给）可同时成立；文中无数据表、无可复算模型、也非单点机制拆解。本文为 FUNDA 在 Substack 发布的英文原文付费件（original），四种交付物中本库仅收录此一件；文中自引同平台前作 3Q25 META Preview，属同机构的连续件而非同一原文的加工件，不得归一为同源。

### 依据

- p.1｜Research|META: Building a NeoCloud and Continuing to Rent Capacity are not Contradictory
- p.1｜JUL 01,2026 ·PAID
- p.1｜Our read is that this is not a contradiction. It is a generational shift in compute.
- p.1｜First, this is not about “AI compute demand peaking” or “Meta no longer needing to buy compute.” On the contrary, Meta is still locking in very large amounts of new compute at the same time.

## Q4 · 他的**假设与算式**能不能复算？

材料不可复算。全文最关键的结论（把不同代际 GPU 放到各自最适配的经济用途：GB200/GB300/Rubin 留给前沿训练、H100/H200 转向推理与外销变现）是定性论断，论证链上没有任何数值算式；文内数字（1.6 GW、3 GW、22 万张 GPU）均为引用值而非测算输出，没有「假设 × 数据 ⇒ 结果」的中间步骤，只给结论与方向，标为无法核，不得当算出来的使用。

### 依据

- p.2｜Meta now faces a fairly classic asset-allocation problem: The most advanced GB200/GB300/Rubin should be reserved first for next-generation model training; the prior-generation H10o/H200 should be shifted as far as possible toward inference or external commercial monetization.
- p.3｜Within this framework, Meta's move is quite rational: it is not halting AI infrastructure buildout, but placing different GPU generations into their best-fit economic uses.

## Q5 · 关键数字的**脚注指向哪**？

材料无脚注体系，来源以行内标注给出，逐个数看指向：
- 1.6 GW（Crusoe 协议）→ 指向 Bloomberg/Reuters，媒体二手，需再上一层找原始出处（监管文件或公司公告），文中未给，记 Ⅱ；
- 3 GW（向 NeoCloud 求购）→ 指向 FUNDA 自家 3Q25 META Preview，自家前作的专家访谈转述，二手，记 Ⅱ；
- 22 万张以上 GPU（Colossus 1）→ 指向 xAI 公开声明（xAI publicly announced / xAI states），公司一手口径，可为 Ⅰ。

### 依据

- p.1｜Per Bloomberg/Reuters, Meta recently signed a new AI computing capacity agreement with Crusoe, taking roughly 1.6 GW of combined capacity from two Crusoe data centers in Childress, Texas,and Warrenton, Missouri.
- p.1｜In our 3Q25 META Preview last year, we noted that Meta was seeking to purchase 3 GW of compute capacity from NeoClouds.
- p.2｜This actually aligns with the logic of xAI/SpaceX. xAI publicly announced a compute partnership with Anthropic this year, supplying Anthropic with Colossus 1 compute;
- p.3｜xAI states that Colossus 1 contains more than 220,000 NVIDIA GPUs, including H100, H200,and GB200,and can support training, fine-tuning, inference, and HPC workloads.

## Q6 · 他的**自建口径 / 评级**定义是什么？与公司口径差多少？

本文自建了一个**三层算力分层框架**作为分析口径：第一层为最新训练算力（GB300、Rubin 及后续更大 scale-up 域系统），服务前沿模型训练，供给仍稀缺；第二层为上一代高端算力（H100/H200 及部分 GB200），适配推理、微调、企业 AI、托管模型、agent 负载与中小模型训练；第三层为更通用的 GPU 云与长尾企业负载，价格敏感但需求弹性更大。该框架只有定性分层描述，未给记分项、权重、打分区间与重算方法，属定义不完整的自建分类，不得当客观标准用；Meta 公司口径从未披露过此类分层，无对照基数；亦不得与任何卖方评级或目标价并列在同一张表。

### 依据

- p.3｜A more accurate read: the AI compute market is moving from a single GPU shortage into a phase of multi-generation, tiered pricing and tiered usage.
- p.3｜The first tier is the newest training compute: GB300, Rubin, and later systems with even larger scale-up domains, serving mainly frontier model training. Supply here remains scarce,and customers will continue to lock in capacity with Crusoe, CoreWeave, Nebius, Oracle,Microsoft,and other suppliers.
- p.3｜The second tier is prior-generation high-end compute: H100/H200 and some GB200, better suited to inference, fine-tuning, enterprise AI, hosted models,agent workloads, and small- to mid-model training. Demand here has not disappeared; it has shifted from“the scarcest training resource” to“an inference resource that can be commercialized at scale."
- p.3｜The third tier is more general-purpose GPU cloud and long-tail enterprise workloads, more price-sensitive but also more elastic in demand.

## Q7 · 他**有没有投行关系 / 持仓**？

三项分开：**收费顾问——未声明；投行关系——未声明；持仓或受资助——未声明**，按「关系不明」处理，不因其自称独立而假定独立。查了哪里：全文通读（页首日期与「PAID」标记、两页正文各段、页尾版权与 Substack 平台页脚），没有 `Disclosure`、持仓、发行人资助或利益冲突段落。为何相近的不能算：页首「PAID」只说明内容在付费墙内，既不能证明有投行关系、也不能证明没有；文中引用的「our model」「our prior note」只说明研究方法。判断：引用其算力租用结论时须标注这一不确定性。

### 依据

- p.4｜@ 2026 FundaAl · Privacy. · Terms · Collection notice Substack is the home for great culture

## Q8 · 他的**行业级判断**（产能 · 份额）有数据支撑吗？

核心行业判断有二：一是 AI 算力市场正从单一 GPU 短缺进入多代际、分层定价与分层使用阶段；二是 GB200/GB300/Rubin 前沿训练需求依然非常强劲，H100/H200 不会被报废而是转向推理变现与外部算力销售。数据支撑：无数。三层框架未给任何一层的出货量或产值口径、地理范围、年份统计，也无份额数据，属行业数无口径，记为观点而非读数，不得用于市场空间推演。

### 依据

- p.3｜A more accurate read: the AI compute market is moving from a single GPU shortage into a phase of multi-generation, tiered pricing and tiered usage.
- p.3｜The judgment that really matters: demand for next-generation frontier model training for GB200/GB300/Rubin remains very strong; at the same time, prior-generation GPUs like H100/H200 will not be scrapped but will shift to inference monetization and external compute sales.
