---
id: 03-independent-research-2025-11-13-MicrosoftsAIStrategyDecons
cat: "03"
sub: independent-research
template: independent-research
template_version: 2
date: 2025-11-13
time: "00:00"
title: "SemiAnalysis：微软 AI 战略拆解——从电力到 Token，以及那场「大暂停」（2025-11-13）"
kind: "independent-research"
issuer: "SemiAnalysis / Dylan Patel、Jeremie Eliahou Ontiveros、Myron Xie 等"
ticker: META
source_pages: 53
---

## Q1 · 他给的公司**未披露口径**的外部估算是什么？

本件主体是微软与 OpenAI 的算力关系，外部估算基本都出自自家模型，逐项列：（1）单卡小时经济（H200 口径，外部估算）：8 卡服务器总资本 24.6 万美元、折旧 4.0 年 ⇒ 单卡折旧 0.88 美元/小时，托管 110 美元/kW·月、电价 0.087 美元/kWh、运营 0.35 美元/GPU·小时，总变动成本 1.23 美元、单卡收入 1.90 美元、neocloud 毛利 35%。（2）资金成本分层（外部估算）：超大规模厂 WACC 9.4%、新兴厂 13.3%、neocloud 17.5%，同口径服务器月资本成本 6,742/8,098/9,785 美元。（3）OpenAI 合同机会成本（外部估算）：12 个月 4,200 亿美元合同额 ⇒ 约 1,500 亿美元毛利，5 年摊得 300 亿/年，称相当于 FY25 毛利 1,940 亿美元的「18% 以上」。（4）RPO 追踪（外部估算）：微软 12 个月新增 500 亿→1,320 亿美元，Azure 份额 38%→18%。样本口径写明的是 140+ 家算力买家访谈。判断：这些都能入格，但必须标「自建模型」，第（3）项与自己的分母不自洽（见 Q4）。

### 依据
- p.5｜Total Server Capital Cost</td><td rowspan=1 colspan=1>USD per8GPU</td><td rowspan=1 colspan=1>$246,391
- p.5｜Revenue per GPU</td><td rowspan=1 colspan=1>USD/hr/GPU</td><td rowspan=1 colspan=1>$1.90</td><td rowspan=1 colspan=1>IAAS</td></tr><tr><td rowspan=1 colspan=1>Neocloud Gross Margin</td><td rowspan=1 colspan=1>%</td><td rowspan=1 colspan=1>35%
- p.30｜Weighted Average Cost of Capital</td><td rowspan=1 colspan=1>%</td><td rowspan=1 colspan=1>9.4%</td><td rowspan=1 colspan=1>13.3%</td><td rowspan=1 colspan=1>17.5%
- p.21｜They’ve signed over \$420B of contract value over the last twelve months, translating into \~\$150B of gross profit dollars
- p.23｜In our research talking to 140+ buyers of compute from scaled-up AI companies such as OpenAI, Meta, Snowflake and Cursor

## Q2 · 他的**物理量**从哪来、能不能核？

物理量成体系，来源与可核性分三类。可回溯的只有一处：威斯康星园区输电计划表，逐项列了变电站与线路的造价（8,900 万至 3.85 亿美元）与投运日期（2025 年至 2027 年中），属公用事业文件口径。不可回溯的是绝大多数容量数：每个 Fairwater 由 48MW 的 CPU/存储楼加约 300MW 的 GPU 楼组成、GPU 楼约 80 万平方英尺、每楼超 15 万张 GB200；爱荷华首簇约 2.5 万张 A100、实际用电约 19MW；威州园区满建超 2GW、规划两栋单体超 600MW；被「冻结」的自建容量约 950MW（威州 350MW、北卡 200MW 与 250MW）；1.5GW 扩产要到 2027 年中才具备输电条件。这些出自自家 Datacenter Industry Model 的逐楼测算与施工图，没有环评、招标或公告指向，记不可回溯、降旁证。网络侧两个数（524,288 张 GPU 对 24,576 台交换机、160,000 张对应 300MW）属架构推导，可复算但非实测。判断：本件的 MW 只能当结构性旁证，不能进电力台账。

### 依据
- p.8｜Each “Fairwater” is comprised of two buildings – a standard CPU & storage facility of 48MW, and an ultra-dense GPU building.
- p.8｜That represents over 150k GB200 GPUs per building.
- p.7｜We believe it hosts \~25k A100 chips.
- p.15｜listing \~950MW of “frozen” IT capacity
- p.20｜<td rowspan=1 colspan=1>New 138kV substation #1</td><td rowspan=1 colspan=1>$    89,000,000</td><td rowspan=1 colspan=1>4/1/2025</td>
- p.48｜This network utilizes 24,576 switches to connect 524,288 GPUs

## Q3 · 这份材料是**四种交付物里的哪一种**？同源的另一份是哪一份？

本份是 `original`：SemiAnalysis 原发的英文长文，页首单语种、无对照译文、无 `KEY POINTS` 摘要头，正文是连续论证加自制图表，末尾带 Substack 推荐位与评论区，属平台原发付费件。同源组：按全批统一口径，本件只有这一份，无 bilingual、translation、summary 兄弟件，不与其他材料并源，也不得计成多个独立源。需分清同机构前作与本件的关系：文中自引《Microsoft's Datacenter Freeze》《ClusterMAX 2.0》《100k H100》三篇，都是同一机构的连续件与自有方法论来源，不是同一原文的另一种交付物，引用它们时必须回原篇取数，不得用本件的转述当那几篇的证据。

### 依据
- p.1｜Microsoft's AI Strategy Deconstructed - From Energy to Tokens
- p.1｜, , , AND 4 OTHERSDYLAN PATEL JEREMIE ELIAHOU ONTIVEROS MYRON XIE NOV 13, 2025 ∙ PAID
- p.24｜ClusterMAX™ 2.0: The Industry Standard GPU Cloud Rating
- p.53｜Recommend SemiAnalysis to your readers Bridging the gap between the world's most important industry, semiconductors, and business.

## Q4 · 他的**假设与算式**能不能复算？

分三层。能复算的：网络公式 2(k/2)^L，k=64、L=2 得 2,048，L=3 得 65,536，k=512、L=2 得 131,072，与表内三行完全一致；RPO 份额也对——停摆前 50/(50+28+22+32)=37.9%，约 38%，停摆后 132/(132+33+71+425+20+41)=18.3%，约 18%。不能复算的是本件最关键那一条：4,200 亿合同额 × 35% 毛利 ≈ 1,470 亿，与「约 1,500 亿」吻合；150 ÷ 5 年 = 300 亿/年，也吻合；但 300 ÷ 194 = 15.5%，与文中的「18% 以上」差 2.5 个百分点（相对差约 14%）。要用 18% 得把分母压到约 1,650 亿美元，文中没给这个分母，也没说 18% 是拿哪一年的毛利算的，所以这一条只能标「缺一步不能复算」，18% 不得当算出来的数用。判断：方法论层面的表都能复算，结论层的放大倍数不能。

### 依据
- p.46｜The number of GPUs that can be connected on a non-blocking clos network using switches with k ports and L layers of switches can be calculated using the formula below.
- p.22｜Microsoft</td><td rowspan=1 colspan=1>$50</td><td rowspan=1 colspan=1>$132</td>
- p.21｜Given typical 5-year duration, the \$30B of annual gross profits would’ve increased Microsoft’s \$194B of annual gross profits (FY25) by over 18%.
- p.47｜Multiplying 8 planes times the 768 switches per plane we arrive at 6,144 switches. This is a ratio of 21.3 GPUs per Switch

## Q5 · 关键数字的**脚注指向哪**？

本件无脚注体系，图表下方只有一行 `Source:`，全部指向自家模型：数据中心容量与冻结容量指向 Datacenter Industry Model（附销售邮箱），TCO 与毛利指向 AI TCO Model 与 Datacenter Model，网络与光纤指向 Networking Model，RPO 与合同指向 Tokenomics。这属自建模型二手，记 Ⅱ，不是一手。可往上一层的只有两处：威州输电计划表（造价与投运日期可回溯到公用事业文件，但文中未给文件名与链接），以及 Maia 100 的算力、显存、带宽参数（属产品规格，可为一手，引用处同样未标来源）。判断：全件没有一条带文件名或链接的一手引用，所有数字引用时统一降一档；若要拿 18%、950MW 这类数进模型，须自己另找一手锚点。

### 依据
- p.16｜Source: SemiAnalysis Datacenter Industry Model sales@semianalysis.com
- p.19｜Source: SemiAnalysis, sales@semianalysis.com
- p.50｜Source: SemiAnalysis Networking Model

## Q6 · 他的**自建口径 / 评级**定义是什么？与公司口径差多少？

本件有四把自建尺子。（1）ClusterMAX 2.0 分级：把 GPU 云按 Tier 排，Azure 在 1.0 里是 Gold（排在 CoreWeave 之后、与 Nebius、Oracle、Crusoe 并列），2.0 里因 CycleCloud/AKS 体验停滞而有降为 Silver 的风险；但打分项、权重、阈值一律未给，属「有分级名、无算法」，只能定性引用。（2）AI Token Factory Economics Stack：把产业链切成应用/模型/PaaS/IaaS/芯片五层，用单卡小时经济贯通。（3）AI Cloud TCO：按主体类型给 WACC，再算月资本成本与运营成本。（4）Tokenomics：逐合同追踪收入、毛利、ROIC。与公司口径最实的一处差异在折旧年限：模型按 4.0 年折旧算单卡成本，而微软自己 2022 年起就把服务器折旧定在 6 年（表内 2022–2025 连续为 6），差 2 年，方向是模型口径更保守、单卡折旧成本更高（0.88 美元/小时按 4 年摊）。判断：引用 35% 毛利与 0.88 美元时必须写明是 4 年折旧口径，不能与公司报表的 6 年口径并列。

### 依据
- p.23｜This put them clearly in the Gold tier of our rankings, right behind CoreWeave and next to companies like Nebius, Oracle, and Crusoe.
- p.25｜Azure is at risk of being demoted to Silver
- p.5｜Useful Life</td><td rowspan=1 colspan=1>Yrs</td><td rowspan=1 colspan=1>4.0
- p.27｜<td rowspan=1 colspan=1>MSFT</td><td rowspan=1 colspan=1>3</td><td rowspan=1 colspan=1>4</td><td rowspan=1 colspan=1>6</td><td rowspan=1 colspan=1>6</td><td rowspan=1 colspan=1>6</td><td rowspan=1 colspan=1>6</td>

## Q7 · 他**有没有投行关系 / 持仓**？

三项分开：收费顾问——未声明；投行关系——未声明；持仓或受资助——未声明。查了哪里：首页刊头与作者行、全篇正文、末页的推荐位与评论区，全文没有 `Disclosure`、持仓、利益冲突、发行人付费任何一段。相近但不能算本项的有两处：首页的 `PAID` 只是付费墙标记，不能当「无投行关系」的证据；图表来源行里的 `sales@semianalysis.com` 说明机构在卖模型与数据（TCO 模型自称被全球最大买家及其财务赞助方使用），那是数据商业关系，不等于投行或持仓关系。判断：按「关系不明」处理，不得假定独立；本件对微软的判断极负面（「在自研芯片上垫底」「管理层只听顺耳话」），与任何持仓方向都不构成一致性检验，引用时须标注关系未声明。

### 依据
- p.1｜, , , AND 4 OTHERSDYLAN PATEL JEREMIE ELIAHOU ONTIVEROS MYRON XIE NOV 13, 2025 ∙ PAID
- p.30｜Our AI Cloud TCO Model, trusted by most of the world’s largest buyers of GPUs as well as their financial sponsors
- p.53｜55 Likes ∙ 7 Restacks

## Q8 · 他的**行业级判断**（产能 · 份额）有数据支撑吗？

有数，但口径要看清。份额类：Azure 在超大规模厂新增 RPO 中的份额由 38% 降到 18%，同表 OCI 12 个月新增 4,250 亿美元——这是「合同额（RPO）」口径，不是出货量也不是产值，且期间是滚动 12 个月，不能与 IDC 之类的年度产值份额并列。产能与技术对比类：Google TPU v7 与 Nvidia Blackwell 相当、Anthropic 联合宣布明年至少订 100 万颗 TPU、Amazon 的 Trainium 已出货数百万颗、Nvidia 毛利 75% 以上即对成本 4 倍加价——前两条是可引的公司声明，后两条是自家测算。最强的一句结论是「除微软外，所有超大规模厂都会部署能跑真实负载的自研 ASIC」，属观点，依据是 CoWoS 预订量与产品路线，非读数。判断：份额只用 RPO 口径，别与产值份额混；产能判断按观点处理。

### 依据
- p.43｜Anthropic is one of them having jointly announced with Google that they will order at least 1mn TPUs for next year.
- p.43｜Amazon is shipping millions of units of its Trainium line of accelerators
- p.44｜the cost comes with Nvidia’s hefty gross margin of 75% and above. This is a 4 x markup on Nvidia’s cost.
- p.44｜all the hyperscalers will have deployed ASICs that support real workloads except Microsoft
