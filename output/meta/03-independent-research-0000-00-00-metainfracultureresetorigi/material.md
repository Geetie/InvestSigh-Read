---
id: 03-independent-research-0000-00-00-metainfracultureresetorigi
cat: "03"
sub: independent-research
template: independent-research
template_version: 2
date: 0000-00-00
time: "00:00"
title: "SemiAnalysis：Meta 基础设施团队需要一次文化重塑（英文原文，2026-07-21）"
kind: "independent-research"
issuer: "SemiAnalysis / Wayne Ma、Myron Xie、Julien Martin-Prin 等"
ticker: META
source_pages: 17
---

## Q1 · 他给的公司**未披露口径**的外部估算是什么？

本件没有 Meta 的财务预测，四笔都是关于"这些硬件决定让 Meta 多付了多少钱"的外部估算：

① **Ariel 机架 TCO 高 14%**（外部估算）。量名：Meta 定制 GB200 机架（Ariel，NVL36x2 双机架）对标准 GB200 NVL72 的单机架总拥有成本（TCO＝物料＋功耗＋网络内容的整体拥有成本）；期间：GB200 部署期；代理变量：每 GPU 服务器 capex、$/FLOP、$/HBM 容量与带宽；口径：自建测算，覆盖 Meta 整个 GB200 机队。

② **DSF 比 NSF 贵约 11%**（外部估算）。量名：单个 AI 集群 zone 的 fabric 成本；代理变量：深缓冲 Jericho3-AI 对浅缓冲 Tomahawk 5 的选型、单一供应商 Arista 的规模劣势。

③ **COT 团队自建约 1 亿美元/年**（外部估算），作对照：收购 Rivos 花了逾 25 亿美元；原句用 "maybe"，属量级口估。

④ **并入的 Rivos 工程师约 30% 在裁员中被裁**（外部估算），样本为该批并入人员。

判断：①②只给结果、不给单价，代理变量到目标量没有换算桥，只能当量级与方向，不能入格；③④是自家调查读数，可作旁证，不是公司披露。

### 依据

- p.10｜All in all our calculations show that TCO for the Ariel NVL36x2 server was 14% higher than standard GB200 NVL72.
- p.9｜The result is much higher \$/FLOP and \$/HBM
- p.16｜Based on our modeling, DSF is about 11% more expensive than NSF.
- p.3｜However, paying more than \$2.5 billion for that privilege doesn’t make much sense either given that a COT team could be built from scratch for maybe \$100 million a year or more.
- p.5｜As we first reported for clients, around 30% of the Rivos engineers who joined Meta as part of the acquisition were let go in recent layoffs.

## Q2 · 他的**物理量**从哪来、能不能核？

三类，可核性不同；本件没有电力类物理量。

① **服务器结构量（可回溯）**：Grand Teton 在标准 HGX 头节点外加一个交换托盘，托盘内 4 块 Broadcom PCIe 交换芯片、16 块 SSD、8 块网卡；所引 OCP 幻灯片给出 ORv3 兼容 80U 机箱的托盘划分。该设计已贡献给 OCP，可回溯至 OCP 公开材料。

② **GPU 侧配置（半可核）**：Ariel 每块 Bianca 板配 1×B200＋1×Grace（标准 SKU 为 2×B200＋1×Grace），单机架 36 颗，凑 72 芯片规模须 36x2。结构描述具体，但 Meta 未公开该定制 SKU，属半可回溯。

③ **集群规模量（不可回溯）**：DSF 的 L1 zone 约 4,500 个 XPU 互联、L2 zone 约 18,000 个 XPU，Jericho3-AI 面网 14.4Tbps。前两项出自自家网络模型，无招标、环评、公告等中间步骤，记来源不可回溯，降为旁证；14.4Tbps 可回溯至芯片规格。

④ **本件未给的量**：没有 GW／MW、机柜总数、GPU 总张数、晶圆产能。全篇唯一的图注是 "Source: Meta"，图内无可引容量读数，这几项记"无法核"。

### 依据

- p.6｜This switch tray houses four Broadcom PCIe switches, 16 SSDs and eight NICs.
- p.6｜·ORv3compliant
- p.8｜Ariel has one Nvidia B200 GPU paired with one Grace CPU, instead of the standard two B200 GPUs with one Grace CPU in the regular GB200 SKU that everyone else purchased.
- p.9｜Because Ariel is 36 GPUs in the one rack, to get to the 72-chip world size scale up, it had to be in the 36x 2 format.
- p.15｜For the L1 DSF zone (\~ 4,500 XPUs interconnected), two layers are needed, with 7700R4C switches acting as the leaves and 7720R4 switches acting as the spines.
- p.15｜As Jericho3-AI has only 14.4Tbps of network facing bandwidth, it requires two independent fabrics
- p.7｜Source: Meta

## Q3 · 这份材料是**四种交付物里的哪一种**？同源的另一份是哪一份？

本份是 **original（纯原文）**：全篇只有英文，没有中英并列的段落、没有"中英对照"标记、也没有把正文压成要点的结构；页首保留作者与日期并带 PAID 付费墙标记，是比较稿的英文母本。

同源组：本份与 `0000-00-00-metainfracultureresetbilin`（双语对照）、`0000-00-00-metainfracultureresetsumma`（要点摘要），以及已填的 `2026-07-21-META-InfraCultureReset`，同出一篇 2026-07-21 的文章，共用一个来源，不得计成四个独立源。

对照要点：双语版把每段英文逐段译成中文，摘要版只留 9 条 KEY POINTS 并压成中英表格，本件是未加工的英文正文。

### 依据

- p.1｜Meta’s Infrastructure Team Needs A Culture Reset
- p.1｜JUL 21, 2026 ∙ PAID
- p.1｜WAYNE MA, MYRON XIE, JULIEN MARTIN-PRIN, AND 2 OTHERS

## Q4 · 他的**假设与算式**能不能复算？

最关键结论是"Ariel NVL36x2 的 TCO 比标准 GB200 NVL72 高 14%"。可写成：更高 CPU:GPU 配比＋36x2 的额外 NVLink／交换内容 ⇒ 每 GPU 服务器 capex 上升 ⇒ $/FLOP 与 $/HBM 容量带宽上升 ⇒ TCO 高 14%。方向走得通（Grace 与 LPDDR、交换机翻倍都是实加项），但**没有单价输入，14% 不能复算**，只能当旁证。

另一段给了完整算式却**算不平**：80 条 PCIe 通道下，2×8 条前端网卡＋4 条管理＋8×16 条 ConnectX-7＝148 条，已超 80；再加 32 条给 SSD 就是 180 条。按它自己给的数字，"还剩 32 条"不成立（双路 160 条也不够）。记算式不闭合。

可完整复算的只有一笔：自建 COT 团队约 1 亿美元/年，Rivos 收购价逾 25 亿美元 ⇒ 2,500 ÷ 100 ≈ 25 年，即要约 25 年自建成本才抵一次收购，支持"为这点能力付 25 亿美元不划算"。

### 依据

- p.10｜All in all our calculations show that TCO for the Ariel NVL36x2 server was 14% higher than standard GB200 NVL72.
- p.9｜The flipside is that by increasing the CPU ratio and additional NVLink networking content because of the 36x2 configuration the server capex per GPU increases.
- p.7｜With 80x PCIe lanes available on the Intel Sapphire Rapids host CPU, Meta could have designed a box that connected the 2x 200G front-end NICs with eight lanes each, four lanes for various management and control, and 16 lanes for each of the eight ConnectX-7 NICs. This would leave them 32 lanes to connect to eight E1.S SSDs.
- p.2｜First, one of Meta’s most recent missteps has been the more than \$2.5 billion it sunk last year into the acquisition of Rivos, a chip startup.
- p.3｜However, paying more than \$2.5 billion for that privilege doesn’t make much sense either given that a COT team could be built from scratch for maybe \$100 million a year or more.

## Q5 · 关键数字的**脚注指向哪**？

全文没有编号脚注或尾注，来源标注极稀：整份只有一处显式 "Source: Meta"，落在 Grand Teton 服务器图上；其余图件连图注都没有（含 Ariel 机架图与 ASIC 对照图）。

逐个数看指向：25 亿美元收购价与 30% 裁员率都没有来源行，30% 由 "As we first reported for clients" 引出，指向自家先前报道，Ⅱ 档；14% 由 "our calculations" 引出、11% 由 "our modeling" 引出，指向自建模型，Ⅱ 档；80 条 PCIe 通道、4 块 Broadcom 交换芯片等结构数来自 Meta 贡献给 OCP 的公开设计与厂商规格，可升 Ⅰ 档。

一条可升 Ⅰ 档的经营事实：AMD 定制 MI450 由 Lisa Su 在一季度财报电话会上确认，可回溯至公司披露。

### 依据

- p.7｜Source: Meta
- p.10｜All in all our calculations show that TCO for the Ariel NVL36x2 server was 14% higher than standard GB200 NVL72.
- p.16｜Based on our modeling, DSF is about 11% more expensive than NSF.
- p.5｜As we first reported for clients, around 30% of the Rivos engineers who joined Meta as part of the acquisition were let go in recent layoffs.
- p.10｜In AMD's Q1 2026 earnings call, Lisa Su confirmed that AMD is providing Meta with a custom GPU based on the MI450.

## Q6 · 他的**自建口径 / 评级**定义是什么？与公司口径差多少？

三个自建口径，都只给名字、不给算式：

① **TCO**——把单机架／单服务器的物料、功耗、网络内容折成每 GPU 成本再与标准 SKU 比；未说含不含机房、电费、折旧年限，无权重表。

② **$/FLOP 与 $/HBM 容量、带宽**——被指定为 LLM／生成式负载的关键指标，分子分母口径未给。

③ **DSF 对 NSF 的 fabric 成本对比**——以交换芯片选型（深缓冲对浅缓冲）与供应商数量作代理。

与公司口径的差异：Meta 内部同样用 TCO 矩阵比较排序推荐与 GenAI 负载，但 Zuckerberg 的指令是系统须服务整个业务，公司口径里 RecSys 的 CPU 与 Grace LPDDR 是收益项；本件只按 LLM 负载计价，同一台机器就被判贵 14%。方向明确、数值无法对齐，该 14% 不得当公司口径的 TCO 差，也不得与卖方评级并列。

### 依据

- p.5｜Now let’s talk about Meta’s AI server designs. Meta’s hardware decisions are largely driven by a TCO analysis comparing a matrix of workloads such as ranking-recommendation and GenAI against what vendors like Nvidia, AMD and their own custom silicon offering provide. Meta CEO
- p.6｜Mark Zuckerberg has issued an edict that the systems being designed have to work for the entire business, meaning they have to support not only Gen AI workloads but core ranking and recommendation systems as well.
- p.9｜The result is much higher \$/FLOP and \$/HBM
- p.4｜We have been updating our subscribers of the Accelerator Model about all the different architectures, floorplans, and volumes of various custom silicon.

## Q7 · 他**有没有投行关系 / 持仓**？

三项均未声明：本件没有免责声明段、没有持仓或赞助披露、没有承销关系说明，正文与页尾都没有。可见的只有作者署名与一行 "JUL 21, 2026 ∙ PAID"，以及文末仍在讨论文化如何修正的正文。

判断：按"关系不明"处理，不能假定独立；其测算一律登记为他人结论。

要分清一点：PAID 是 SemiAnalysis 的付费墙标记，不是投行关系，也不能反过来当"无投行关系"的证据——本件真正缺的是一段披露，而不是一条正面否认。

### 依据

- p.1｜JUL 21, 2026 ∙ PAID
- p.1｜WAYNE MA, MYRON XIE, JULIEN MARTIN-PRIN, AND 2 OTHERS
- p.17｜This will become more important over time if Meta does intend to sell its compute to outside customers

## Q8 · 他的**行业级判断**（产能 · 份额）有数据支撑吗？

有三条能落到口径，其余是观点。

① **"Meta 是 Ariel 这个 SKU 的唯一客户"**——口径为单 SKU 客户数，有出货事实支撑；配套世代读数也有数：只有少数超大规模厂商为 GB200 买过有限数量 36x2，GB300 一代 36x2 被完全放弃。

② **供应链侧**：几乎所有主流交换机厂商与 Celestica 这类白盒厂都在卖 Tomahawk 5 交换机——供应商覆盖面的定性描述，无出货量或产值份额；"部分供应商更愿把精力放在 Amazon 或 Google 的设计上"是访谈行为判断，无数。

③ **"这会把 AMD 在 Meta 的出货量打没"**——无数次、无口径，只能记观点；"MI450 会是硅工程上最先进的 GPU"（2nm、混合键合、12 层 HBM、最大 CoWoS 光罩）也是定性。

全篇没有给出任何市场份额、产能或供需缺口统计（不论出货量还是产值），行业结论都是建模与访谈推出来的观点。

### 依据

- p.9｜Meta was the only customer of this Ariel SKU
- p.10｜These challenges were why a limited number of 36x2 was shipped for some hyperscalers for GB200 only, with the 36x2 configuration being dropped entirely for GB300.
- p.16｜Virtually every major switch vendor such as Arista, as well as white-box vendors like Celestica, sells switch boxes built around Tomahawk 5
- p.2｜Some suppliers favor focusing on Amazon or Google designs due to Meta’s frequent reshuffling.
- p.12｜This decision is going to nuke AMD's volume at Meta because TBD will vastly prefer Rubin if the half MI450 design is chosen.
- p.11｜AMD MI450 will be the most advanced GPU in the market in terms of silicon engineering: 2nm, hybrid bonding, 12 stacks of HBM, with the largest CoWoS reticle size on the market.
