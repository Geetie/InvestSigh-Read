---
id: 03-independent-research-2026-07-21-META-InfraCultureReset
cat: "03"
sub: independent-research
template: independent-research
template_version: 2
date: 2026-07-21
time: "00:00"
title: "Meta’s Infrastructure Team Needs A Culture Reset"
kind: "手稿"
issuer: SemiAnalysis
ticker: META
source_pages: 18
---


## Q1 · 他给的公司**未披露口径**的外部估算是什么？

核心外部估算：Meta 定制 GB200 机架（Ariel，NVL36x2 形态）相对标准 GB200 NVL72 的总拥有成本（TCO）高 14%。估算对象为 Meta 整个 GB200 机队的单服务器 TCO（外部估算，据该文）。代理变量是服务器物料构成——每块 Bianca 计算板配 1×B200+1×Grace（标准 SKU 为 2×B200+1×Grace）、36x2 跨机架配置使交换机数量翻倍并多一跳时延、更高 CPU:GPU 比带来额外的 Grace 与 LPDDR 内容；样本口径为「Meta 的 GB200 机队全部采用该 SKU」，期间为 Blackwell 世代的 GB200 部署期。文中

其余外部估算：Meta DSF 网络 fabric 比 NSF 贵约 11%；自建 customer-owned tooling（COT）团队成本约 1 亿美元/年（对照收购 Rivos 超 25 亿美元）；近期裁员中被裁的 Rivos 工程师约占随收购并入人数的 30%。

### 依据

- p.10｜capacity and bandwidth than the standard GB2oo. These are key metrics for LLM/gen Al workloads making Ariel was far worse for LLM training and inference. All in all our calculations show that TCO for the Ariel NVL36x2 server was 14% higher than standard GB200 NVL72.
- p.9｜The flipside is that by increasing the CPU ratio and additional NVLink networking content because of the 36x2 configuration the server capex per GPU increases. The result is much higher \$/FLOP and \$/HBM
- p.16｜Based on our modeling, DSF is about 11% more expensive than NSF.
- p.3｜Few inside Meta's chip division have a full understanding of why the company bought Rivos in the first place,and those who championed the deal internally have since gone quiet. The prevailing theory is that Meta had the 
- p.5｜As we first reported for clients, around 30% of the Rivos engineers who joined Meta as part of the acquisition were let go in recent layoffs.

## Q2 · 他的**物理量**从哪来、能不能核？

物理量分三类，可回溯性不同：
1. 服务器结构量（可回溯）：Grand Teton 的 PCIe 通道预算——Intel Sapphire Rapids 主机 CPU 提供 80 条 PCIe lanes，2×200G 前端 NIC 各占 8 条、管理控制 4 条、8×ConnectX-7 NIC 各 16 条、余 32 条接 8×E1.S SSD；Switch Tray 内含 4×Broadcom PEX89144 PCIe 5.0 交换机（各 144 lanes）、16 个 E1.S SSD、8 个 OCP NIC 3.0。该设计已贡献给 OCP，可回溯至 OCP 公开资料。
2. 配置量（部分可核）：Ariel 为 1×B200+1×Grace 配 1 Grace CPU（标准 GB200 为 2×B200+1 Grace），单机架 36 GPU，72 芯片世界规模须 NVL36x2 双机架并配跨机架 ACC。图注来源标 Meta，但 Meta 未公开该定制 SKU 细节，以该文描述为主，属半可回溯。
3. 集群规模量（不可回溯，降为旁证）：DSF 的 L1 zone 约 4,500 XPU 互联、L2 zone 约 18,000 XPU 互联、Jericho3-AI 面网带宽 14.4Tbps。其中交换机型号与芯片带宽可回溯至 Arista/Broadcom 厂商规格，但 XPU 集群规模为 SemiAnalysis AI Networking Model 口径，文中未给原始出处（如招标公告、环评产能），记来源不可回溯。

### 依据

- p.7｜With 8Ox PCle lanes available on the Intel Sapphire Rapids host CPU, Meta could have designed a box that connected the 2x 2ooG front-end NICs with eight lanes each, four lanes for various management and control,and 16 lanes for each of the eight ConnectX-7 NiCs. This would leave them 32 lanes to connect to eight E1.S SSDs.
- p.6｜·4Broadcom PEX89144 PCle5.0switcheswith144 lanes each
- p.8｜Ariel has one Nvidia B2oo GPU paired with one Grace CPU, instead of the standard two B2oo GPUs with one Grace CPU in the regular GB2O0 SKU that everyone else purchased.
- p.15｜To come back on the hardware side, using both Jericho3-Al and Ramon3 ASlC makes the network design inherently complex. For the L1 DSF zone (\~ 4,5oo XPUs interconnected),two layers are needed, with 7700R4C switches acting as the leaves and 7720R4 switches acting as the spines. The L2 zone(\~ 18,0oo XPUs interconnected) only needs one supplementary layer of 7720R4 switches to aggregate up to 4 L1 DSF zones.As Jericho3-Al has only 14.4Tbps of network facing bandwidth, it requires two independent fabrics as one plane's fabric only scales to a certain number of switches before you run out of Ramon3 connectivity. To hit the target GPU count and per-GPU bandwidth in a single Al zone, each NIC/GPU attaches to both planes,and traffic is split between planes at the host/NlC level,which is exactly like plain old ECMP path selection at endpoint, sitting on top of two separated scheduled fabrics, adding complexity to an already complex control-plane.
- p.15｜As Jericho3-Al has only 14.4Tbps of network facing bandwidth

## Q3 · 这份材料是**四种交付物里的哪一种**？同源的另一份是哪一份？

归类为 original（英文原文件），体裁为论点稿：全文为英文长文，带作者署名与日期「JUL 21,2026PAID」标记，不是双语对齐件、不是译文、不是摘要；文内有完整假设链（文化问题→具体误判案例→机制→自建测算→结论），也非纯数据稿或单点拆解稿。同源的另一份（bilingual / translation / summary）：材料本身未标注存在其他交付物，本材料库亦仅收录此一件 → 材料无同源件。

### 依据

- p.1｜Meta's Infrastructure Team Needs A Culture Reset
- p.1｜WAYNE MA,MYRON XIE,JULIEN MARTIN-PRIN,AND2 OTHERS
- p.1｜JUL 21,2026PAID

## Q4 · 他的**假设与算式**能不能复算？

挑最关键结论复算：「Ariel NVL36x2 服务器 TCO 比标准 GB200 NVL72 高 14%」。
用文中给的输入做结构层复算：标准 NVL72 单机架 = 72×B200 + 36×Grace；Ariel 同为 72 GPU 世界规模需 NVL36x2 双机架 = 72×B200 + 72×Grace，且跨机架 ACC 使交换机数量翻倍、多一跳时延。即 Grace CPU 与 LPDDR 内容为 72/36 = 2 倍，交换芯片 2 倍，机制方向（\$/FLOP 与 \$/HBM 抬升、TCO 更高）与文中一致。

但文中未给 Grace CPU、LPDDR、交换芯片及功耗的单价输入，14% 这一数值无法仅用文中输入独立复算——中间缺单价一步，记不可完全复算，该数为 SemiAnalysis 自建测算（其 Accelerator Model 输出），只能当旁证。
文中另一结论可完整复算（Rivos 收购）：自建 COT 团队约 1 亿美元/年，收购 Rivos 超 25 亿美元 ⇒ 2,500M ÷ 100M/年 = 25 年，即约 25 年的自建成本才抵得上一次收购价——此行公式可落成一行并用文中输入直接复算，支持「为该特权付 25 亿美元不划算」的论点。

### 依据

- p.10｜All in all our calculations show that TCO for the Ariel NVL36x2 server was 14% higher than standard GB200 NVL72.
- p.9｜Because Ariel is 36 GPUs in the one rack, to get to the 72-chip world size scale up,it had to be in the 36x2 format. Cross-rack ACCs connected the switch trays between the racks. This meant double the number of switches which while also adding an extra hop of latency.
- p.8｜Ariel has one Nvidia B2oo GPU paired with one Grace CPU, instead of the standard two B2oo GPUs with one Grace CPU in the regular GB2O0 SKU that everyone else purchased.
- p.3｜Few inside Meta's chip division have a full understanding of why the company bought Rivos in the first place,and those who championed the deal internally have since gone quiet. The prevailing theory is that Meta had the 
- p.2｜First, one of Meta's most recent missteps has been the more than \$2.5 billion it sunk last year into the acquisition of Rivos, a chip startup.

## Q5 · 关键数字的**脚注指向哪**？

全文无编号脚注或尾注，来源以图注形式标注。指向逐个数：网络架构图注「Source: SemiAnalysis Al Networking Model, Meta」、服务器/机架图注「Source: Meta」与「Source: SemiAnalysis」、AMD 对比图注「Source: AMD, SemiAnalysis」——这些为图件来源，部分可回溯至公司材料（一手）或该文自建模型（二手）。

关键测算数的指向：TCO 高 14% 由「our calculations」引出、DSF 贵 11% 由「our modeling」引出，二者均指向 SemiAnalysis 自建订阅模型（Accelerator Model / AI Networking Model），非公开一手来源 → 二手（Ⅱ 档）；「30% 的 Rivos 工程师被裁」标「As we first reported for clients」，指向该媒体自有报道 → 二手。无脚注支撑即指向自建模型的关键数字，不得升为 Ⅰ 档。

### 依据

- p.14｜Source: SemiAnalysis Al Networking Model, Meta
- p.7｜Source: Meta
- p.9｜Source: SemiAnalysis
- p.2｜First, one of Meta's most recent missteps has been the more than \$2.5 billion it sunk last year into the acquisition of Rivos, a chip startup.
- p.10｜All in all our calculations show that TCO for the Ariel NVL36x2 server was 14% higher than standard GB200 NVL72.
- p.16｜Based on our modeling, DSF is about 11% more expensive than NSF.
- p.5｜As we first reported for clients, around 30% of the Rivos engineers who joined Meta as part of the acquisition were let go in recent layoffs.

## Q6 · 他的**自建口径 / 评级**定义是什么？与公司口径差多少？

材料无自建口径：文中未定义任何自建评分、指数或记分卡（无记分项、权重、打分区间与重算方法），故无从与公司口径比对。文中仅出现该机构订阅模型产品名（Accelerator Model、AI Networking Model）作为数字出处，以及 Meta 内部决策口径的描述（Meta 以 TCO 矩阵比较 ranking-recommendation 与 GenAI 等工作负载、Zuckerberg 要求系统须支持全业务）；另以 \$/FLOP 与 \$/HBM 容量带宽作为 LLM 负载关键指标，但未给算式定义。按手册纪律：自建口径未给定义，其测算结论不得当客观标准使用，仅作旁证登记。

### 依据

- p.4｜We have been updating our subscribers of the Accelerator Model about all the different architectures,floorplans,and volumes of various custom silicon.
- p.14｜Source: SemiAnalysis Al Networking Model, Meta
- p.5｜Meta's hardware decisions are largely driven by a TCO analysis comparing a matrix of workloads such as ranking-recommendation and GenAl against what vendors like Nvidia,AMD and their own custom silicon offering provide.
- p.9｜Because Ariel is 36 GPUs in the one rack, to get to the 72-chip world size scale up,it had to be in the 36x2 format. Cross-rack ACCs connected the switch trays between the racks. This meant double the number of switches 

## Q7 · 他**有没有投行关系 / 持仓**？

三项均未声明：正文与文首均未见是否持有标的、是否受发行人资助、有无付费关系的任何披露；可见信息仅作者署名（Wayne Ma、Myron Xie、Julien Martin-Prin 等）与「PAID」付费订阅标记（SemiAnalysis 为付费订阅刊物）。按未披露处理——不能假定其独立；其全部测算按「他人结论」登记为旁证。

### 依据

- p.1｜WAYNE MA,MYRON XIE,JULIEN MARTIN-PRIN,AND2 OTHERS
- p.1｜JUL 21,2026PAID

## Q8 · 他的**行业级判断**（产能 · 份额）有数据支撑吗？

部分有数据支撑，部分为观点：
1. DSF 比 NSF 贵约 11%——口径：单一 AI 集群 zone 的网络 fabric 成本建模读数（对比交换机芯片选型：Jericho3-AI/Ramon3 深缓冲方案 vs Tomahawk 5 浅缓冲方案），期间 2024-2026，来源为 SemiAnalysis AI Networking Model 建模输出，属建模读数而非官方统计，附硬件口径（L1 zone 约 4,500 XPU、L2 zone 约 18,000 XPU、Jericho3-AI 面网 14.4Tbps）齐全。
2. Ariel 定制 SKU 市况：Meta 是该 SKU 的唯一客户；GB200 世代仅少量 36x2 出货给其他超大规模厂商，GB300 完全取消 36x2——口径为单 SKU 客户数与出货形态，有出货事实支撑。
3. 「这一决定会毁掉 AMD 在 Meta 的出货量」——无数值与口径，记为观点，不得用于份额推演。
4. 「MI450 将是市场上面向硅工程最先进的 GPU」（2nm、hybrid bonding、12 层 HBM、最大 CoWoS reticle）——定性判断，未给统计口径（出货量还是产值、地理范围、年份均缺），按行业数无口径处理。

### 依据

- p.16｜Based on our modeling, DSF is about 11% more expensive than NSF. DSF also forces Meta to rely only on a single vendor, whereas NSF brings vendor diversity.
- p.15｜To come back on the hardware side, using both Jericho3-Al and Ramon3 ASlC makes the network design inherently complex. For the L1 DSF zone (\~ 4,5oo XPUs interconnected),two layers are needed, with 7700R4C switches acting as the leaves and 7720R4 switches acting as the spines. The L2 zone(\~ 18,0oo XPUs interconnected) only needs one supplementary layer of 7720R4 switches to aggregate up to 4 L1 DSF zones.As Jericho3-Al has only 14.4Tbps of network facing bandwidth, it requires two independent fabrics as one plane's fabric only scales to a certain number of switches before you run out of Ramon3 connectivity. To hit the target GPU count and per-GPU bandwidth in a single Al zone, each NIC/GPU attaches to both planes,and traffic is split between planes at the host/NlC level,which is exactly like plain old ECMP path selection at endpoint, sitting on top of two separated scheduled fabrics, adding complexity to an already complex control-plane.
- p.9｜Meta was the only customer of this Ariel SKU,and the reason for this is Meta's obsession with a higher CPU-GPU ratio for its recommendation systems
- p.10｜These challenges were why a limited number of 36x2 was shipped for some hyperscalers for GB200 only,with the 36×2 configuration being dropped entirely for GB30o.
- p.12｜This decision is going to nuke AMD's volume at Meta because TBD will vastly prefer Rubin if the half Ml45O design is chosen.
- p.11｜AMD Ml450 wil be the most advanced GPU in the market in terms of silicon engineering: 2nm, hybrid bonding,12 stacks of HBM,with the largest CoWoS reticle size on the market.
