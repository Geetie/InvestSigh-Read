---
id: 03-independent-research-0000-00-00-100kh100clustersbilingual
cat: "03"
sub: independent-research
template: independent-research
template_version: 2
date: 0000-00-00
time: "00:00"
title: "SemiAnalysis：10 万卡 H100 集群的电力、网络与可靠性账（2024-06-17）"
kind: "independent-research"
issuer: "SemiAnalysis / Dylan Patel、Daniel Nishball"
ticker: META
source_pages: 23
---

## Q1 · 他给的公司**未披露口径**的外部估算是什么？

本件主体是超大规模训练集群这一工程品类，不是某公司，所以全部数字都是 SemiAnalysis 对"一个 10 万卡集群"的自建估算，没有一家公司的披露口径可直接对齐。逐项（均标外部估算）：① 单集群服务器资本开支 >40 亿美元（口径：仅服务器 capex，不含土建与电力接入，2024 年价格）；② 单集群需 >150MW 数据中心容量、年耗 1.59 TWh、按 0.078 美元/kWh 计年电费 1.239 亿美元；③ 算力规格——10 万卡 H100 峰值 198/99 FP8/FP16 ExaFLOP/s，是 2 万卡 A100 集群（6.28 ExaFLOP/s）的 31.5 倍；④ 实测利用率——万亿参数训练中 FP8 MFU 可达 35%、FP16 40%，据此 10 万卡跑 100 天可得约 6e26 有效 FLOP，跑 4 天可训完一个 GPT-4；⑤ 可靠性代理变量——单链路 MTTF 5 年时，全新集群 26.28 分钟出现首次任务失败；换 Cedar-7 双端口（MTTF 4 年、链路数减半）后延长到 42.05 分钟；⑥ 网络方案差价——4 层 InfiniBand 比其它三方案贵 1.3–1.6 倍，Spectrum-X 比 Tomahawk 5 多耗 5MW。判断：②⑤的代理变量（MTTF、链路数）与目标量之间有明确算式，可入模；①的"40 亿美元"是口径最干净的一条。

### 依据
- p.2｜These individual training clusters cost in excess of \$4 billion of server capital expenditures alone, but they are also heavily limited by the lack of datacenter capacity and power as GPUs generally need to be colocated for high-speed chip to chip networking. A 100,000 GPU cluster will require >150MW in datacenter capacity and guzzle down 1.59 terawatt hours in a single year, costing \$123.9 million at a standard rate of \$0.078/kWh.
- p.3｜On H100s, AI labs are achieving FP8 Model FLOPs Utilization (MFU) as high as 35% and FP16 MFU of 40% on trillion parameter training runs.
- p.14｜Even if each NIC to leaf switch link had a mean time to failure rate of 5 years, due to the high number of transceivers, it would only take 26.28 minutes for the first job failure on a brand new, working cluster.
- p.20｜Comparing between all four different types of network topologies that various firms are building, the 4 tier InfiniBand network is 1.3-1.6x more expensive compared to the other options.

## Q2 · 他的**物理量**从哪来、能不能核？

逐个数：① 150MW 关键 IT 电力／单集群——拆解为 GPU 700W 加服务器内 CPU、网卡、电源再 575W/GPU，再加存储、交换、光模块约 10%，属自建自下而上估算，无第三方核对，记来源不可回溯但内部自洽（见 Q4 复算）；② 单机柜 40kW、每柜 4 个 H100 节点、4 栋楼（已建成 3 栋）——指向 Microsoft 的标准数据中心设计，属可回溯的一手设计参数；③ 单园区 155MW——作者自述在跟踪 15 个以上 Microsoft、Meta、Google、Amazon、字节、X.AI、Oracle 的建设项目，属"industry checks"式跟踪，无项目清单与并网文件，记不可回溯；④ Google ICI 域最多 8,960 颗 TPU、每 64 颗水冷 TPU 一柜——引 Google 在 MLSys24 的材料，可回溯；⑤ 32,768／24,576 卡的计算岛规模、98,304 个光模块——由交换机 radix 与拓扑推导，可复算。判断：机柜级与拓扑级物理量站得住，园区级 MW 与"15 个在建"只能当旁证。

### 依据
- p.3｜The critical IT power required for a 100k H100 cluster is \~150MW. While the GPU itself is only 700W, within each H100 server, CPUs, Network Interface Cards (NICs), Power Supply Units (PSUs), account for a further \~575W per GPU.
- p.21｜In this Microsoft development cluster, each rack supports up to 40kW of power density, housing four H100 nodes per rack.
- p.9｜only scales up to a maximum of 8960 chips with costly 800G optics and optical circuit switches connecting each 64 TPU watercooled rack.
- p.4｜155MW is challenging to deliver in a single location, but we are tracking over 15 Microsoft, Meta, Google, Amazon, Bytedance, X.AI, Oracle, etc data center build outs that will have that much space for AI servers and networking.

## Q3 · 这份材料是**四种交付物里的哪一种**？同源的另一份是哪一份？

判为 `bilingual`（中英逐段对照）。依据：① 首页在英文标题下紧贴一行中文标题，重复两遍后接"前沿模型…机柜布局"的中英副题，文末明写"中英对照 / BILINGUAL"；② 正文每个英文段落后紧跟同一段中文译文（例：英文讲 10 万卡集群 capex 超 40 亿美元，下一段中文逐句对应），不是摘译、不是纯译文；③ 页脚保留原文链接与署名（SemiAnalysis · 2024-06-17 · semianalysis.com/2024/06/17/…），说明是同一篇原文的双语转制而非改写。同源组：按全批《同源对照表》"100,000 H100 Clusters（SemiAnalysis）"一行，同源 id 只有 `0000-00-00-100kh100clustersbilingual` 本份，未发现 original／translation／summary 其它交付物；若日后出现英文原版，两者共用一个来源，不得计成两个独立源。注意本份 frontmatter 日期是 0000-00-00，原文实际发布日为 2024-06-17，引用时应以原文日期为准。

### 依据
- p.1｜中英对照 / BILINGUAL
- p.1｜SemiAnalysis · 2024-06-17 · https://semianalysis.com/2024/06/17/100000-h100-clusters-power-network/
- p.2｜包括但不限于 OpenAI/Microsoft、xAI 和 Meta 在内的多家大型 AI 实验室，正竞相建设超过 10 万块 GPU 的集群。

## Q4 · 他的**假设与算式**能不能复算？

挑电力这一条复算。算式：每 GPU 负载 ＝ 700W（H100）＋ 575W（CPU／网卡／电源）＝ 1,275W，10 万卡 ＝ 127.5MW，再乘（1＋10%）覆盖存储、交换机、CPU 节点、光模块 ＝ 140.3MW，而他写"约 150MW"，差 6.5%，属取整与余量，复算基本通过。但同一段的年耗电对不上：150MW × 8,760h ＝ 1.314 TWh，他写 1.59 TWh，差 21%；反解 1.59 TWh ÷ 8,760h ＝ 181.5MW，正好是把 150MW 的 IT 电力再乘约 1.21 的 PUE——说明这段把 IT 电力与园区总电力混用了，须记口径不一。电费倒是自洽：1.59 TWh × 0.078 美元/kWh ＝ 1.24 亿美元，与他给的 1.239 亿一致。另两条精确可复算：31.5 倍（198 ÷ 6.28 ＝ 31.5，成立）；故障损失 99 步 × 2 秒 × 10 万卡 ÷ 86,400 ＝ 229 GPU-天，与他写的"229 GPU days"完全一致，RDMA 方案 1.6 秒对应 1.85 GPU-天也成立。

### 依据
- p.2｜A 100,000 GPU cluster will require >150MW in datacenter capacity and guzzle down 1.59 terawatt hours in a single year
- p.3｜On a 100k H100 cluster, this number would soar to 198/99 FP8/FP16 ExaFLOP/second. This is a 31.5x increase in peak theoretical AI training FLOPs compared to the 20k A100 cluster.
- p.13｜On an 100k cluster, if each iteration took 2 seconds, you lose up to 229 GPU days of work from a failure at iteration 99.

## Q5 · 关键数字的**脚注指向哪**？

没有编号脚注，只有图注里的 `Source:` 行，整体按 Ⅱ 档处理。逐处：① 电价 0.078 美元/kWh 的来源行是"Source: SemiAnalysis, US EIA"，指向美国能源信息署的工业电价，属一手可回溯；② 机柜与布线参数标"Source: Microsoft"、Meta 的 7:1 超订阅架构标"Source: Meta"、TPU ICI 标"Source: Google at MLSys24"、交换机端口数标"Source: Nvidia"，这四条都指向厂商一手资料，可为 Ⅰ 档；③ 但最关键的几个数——"40 亿美元 capex""150MW""26.28 分钟""42.05 分钟""1.3–1.6 倍"——只标"Source: SemiAnalysis Estimates"或直接写"We estimate"，没有中间步骤、没有供应商报价单，属自建估算，只能当 Ⅱ 档旁证。另需注意本份是双语转制件，原文的超链接在转制中被压成图注文字，无法点开核验，这属于载体丢失，不能据此说原文没有出处。

### 依据
- p.1｜[Figure: Source: SemiAnalysis Estimates]
- p.2｜[Figure: Source: SemiAnalysis, US EIA]
- p.16｜We estimate that each twin port 2x400G link has a mean time to failure per link of 4 years (vs. 5 years of single port 400G link)

## Q6 · 他的**自建口径 / 评级**定义是什么？与公司口径差多少？

自建了两把尺。① MFU（Model FLOPs Utilization）：定义为扣除开销与各类瓶颈后的有效吞吐占峰值 FLOPS 的比例，明确列出扣减项——功耗上限、通信抖动、重计算、拖尾节点、低效 kernel；与公司口径的差异在方向与幅度：厂商宣传的是峰值 FLOPS（198/99 ExaFLOP/s），他用 35%（FP8）／40%（FP16）折减，等于把账面算力打到约三分之一，任何用峰值算力推"训练需要多少卡"的模型都会高估 2.5–3 倍。② 每 TCO 网络性能＋"最性价比方案"：他在四种拓扑（4 层 IB、3 层 Spectrum-X、前端网络混跑、3 层 Tomahawk 5）之间按交换机与光模块 BoM 比价，结论是 3 层 Tomahawk 5、32k 卡岛、顶层 7:1 超订阅最优；差异量化为"4 层 IB 贵 1.3–1.6 倍""Spectrum-X 多耗 5MW"，但 TCO 只含网络设备与电力，未含运维人力与 NCCL 打补丁的工程师成本，这一点他自己也承认（需内部工程能力）。

### 依据
- p.3｜As a recap, MFU is a measure of the effective throughput and utilization of the peak potential FLOPS after taking into account overhead and various bottlenecks such as (power limits, communication flakiness, recomputation, stragglers, and inefficient kernels).
- p.20｜We believe Broadcom Tomahawk 5 based 32k Island with 7:1 oversubscription at the top layer is the most cost effective option which is why multiple firms have similar networks being built. It offers highest network performance per total cost of ownership (TCO) due to not having to pay the NVIDIA tax
- p.18｜The datacenter that you put Spectrum X in now requires an additional 5MW for a 100,000 GPU deployment versus a Broadcom Tomahawk 5 deployment with the exact same network architecture.

## Q7 · 他**有没有投行关系 / 持仓**？

三项分开：① 收费顾问＝**有**，文末自述"研究、数据与咨询服务覆盖业内最大的半导体、hyperscale 与 AI 公司，也为私募与公开市场投资机构服务"，即向被研究行业收费；② 投行关系＝**未声明**，全文没有承销、做市、经纪或投行部门关联的说明；③ 持仓／受资助＝**有（自述将设基金）**，同段写明将成立 accelerator fund，投 AI、半导体及其软件基础设施的早期项目。这构成明确的利益方向：同一家机构既向半导体与 hyperscale 公司卖咨询、又准备投这个赛道的早期公司，而本件的结论恰好是"最大赢家是 NVIDIA""博通网络收入将持续飙升"。文中没有常规的"本公司不持有文中证券"免责声明，属披露不完整，引用其份额与赢家判断时须标注来源利益。

### 依据
- p.22｜Our research, data, and consulting serves the largest semiconductor, hyperscale, and AI companies in the industry.
- p.22｜We also serve the private equity and public equity investment sectors. In addition to more offerings in the research business, we will also be launching an accelerator fund for early stage investments in AI, semiconductors, and the software infrastructure for both.

## Q8 · 他的**行业级判断**（产能 · 份额）有数据支撑吗？

三条行业级判断，支撑强度不同。① 技术路线：大型 InfiniBand 网络将退场、博通 Tomahawk 5 成为 hyperscaler 主流——有硬支撑：Quantum-2 只有 64 个 400G 端口、Spectrum-X SN5600 与 Tomahawk 5 各 128 个，因此全互连的 10 万卡集群在 Quantum-2 上被卡在 65,536 块 H100，且 4 层比 3 层多 1.33 倍光模块、贵 1.3–1.6 倍，属设备规格推算，可核。② 需求侧：跟踪到 15 个以上可容纳 15 万 kW 级 AI 服务器的园区在建，点名 Microsoft、Meta、Google、Amazon、字节、X.AI、Oracle——只有家数与公司名，没有单个项目的 MW、没有交付时点，属 industry checks，不可回溯。③ 谁赢：NVIDIA 拿走 BoM 最大份额、博通网络收入持续飙升——没有任何份额百分比、没有统计口径（按颗数还是按产值）、没有年份，是观点不是读数。判断：① 可入模，② 只能当方向，③ 只能当立场。

### 依据
- p.20｜This is why no one is actually going with large InfiniBand networks going forward.
- p.21｜At the end of the day, the number one winner of these multiple 100k H100 clusters will be NVIDIA, as they make up the larger share of the BoM.
- p.4｜155MW is challenging to deliver in a single location, but we are tracking over 15 Microsoft, Meta, Google, Amazon, Bytedance, X.AI, Oracle, etc data center build outs that will have that much space for AI servers and networking.
