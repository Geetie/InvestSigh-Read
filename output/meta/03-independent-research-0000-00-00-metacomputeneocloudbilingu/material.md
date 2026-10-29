---
id: 03-independent-research-0000-00-00-metacomputeneocloudbilingu
cat: "03"
sub: independent-research
template: independent-research
template_version: 2
date: 0000-00-00
time: "00:00"
title: "SemiAnalysis：Meta 的算力买卖——人人都想做 Neocloud（2026-07-02 双语版）"
kind: "independent-research"
issuer: "SemiAnalysis / Jeremie Eliahou Ontiveros、Max Kan、Joey Brookhart 等 5 人"
ticker: META
source_pages: 12
---

## Q1 · 他给的公司**未披露口径**的外部估算是什么？

四项外部估算。① 签约节奏：2026 年上半年在云与托管两条线上签下超 5GW，且不含加速中的自建；自 2024 年初累计近 10GW（口径为 IT 容量 GW，按季切分见其堆叠图）。② GPU 云的单 GW 年化收入：Neocloud 五年期 IaaS 平均 120 亿美元/GW、B300 按需 290 亿、SpaceX 对 Anthropic 310 亿、SpaceX 对 Google 480 亿（样本为其 TCO 模型每年跟踪的数百笔 GPU 云交易，含 SLA、定价、合约期限等条款，是全球范围、全期限的均价，不是单笔）。③ 溢价变现测算：每 GW 年收入约 500 亿美元时，把 200MW 分给一个外部客户即可得 100 亿美元/年。④ 推荐系统弹性：广告推荐算力可再放大 10 倍以上仍有利可图，GEM 训练栈用 16 倍 GPU 换 23 倍有效训练算力、MFU 提升约 1.4 倍。①②之间有换算桥（GW 乘单价），④的「10 倍」没有换算桥，只能当量级、不能入格。

### 依据

- p.1｜In just the first six months of the year, Meta has contracted over 5GW of capacity across Cloud & Colo, and that doesn’t even include all their accelerating self-build activity.
- p.4｜After nearly 10GW of deals signed since early 2024, the bulk of their capacity additions are now through 3rd parties.
- p.5｜[图：SpaceX 创造了一个新的市场细分—— 短期＋大规模算力，溢价极高。各玩家的单 GW 年化收入：Neocloud 五年期 IaaS 平均 \$12B（1.0x）、B300 按需 \$29B（2.4x）、SpaceX + Anthropic \$31B（2.6x）、SpaceX + Google \$48B（4.0x）。来源：AI Cloud TCO Model]
- p.10｜A new training stack that has 23x effective training FLOPs with \~1.4x increase in MFU using 16x more GPUs

## Q2 · 他的**物理量**从哪来、能不能核？

三个量都停在「自家模型换算」这一步。① 在建容量：最大的两个园区合计代表 2.5GW 在建，配了卫星影像；影像能证明工地确实在施工，但从影像到 2.5GW 之间没有逐栋、逐机柜或逐变压器的换算，仍属不可回溯。② 已签约容量：2026 年上半年云与托管超 5GW、2024 年初以来近 10GW，来源是 Datacenter Model 的交易台账，未列交易对手与单笔规模。③ 单笔规模：SpaceX 式交易里的 200MW 是作者设想给外部客户的配置量，不是已签约量；SpaceX 手上剩余可用的 900MW 同样是推算值。全文没有 GPU 张数、机柜数与变电容量，也没有合同编号或监管备案可对账，因此这些数只能当旁证。

### 依据

- p.2｜Meta’s capacity under construction just keeps accelerating. We show below Meta’s two largest campuses – these two pictures represent 2.5GW of capacity under construction!
- p.2｜[图：Meta 两个最大在建园区的卫星影像。来源：SemiAnalysis Datacenter Model]
- p.4｜Our Datacenter Model breaks down quarter by quarter their capacity additions across selfbuild, datacenter leasing, and cloud renting.
- p.11｜SpaceX still has up to 900MW left after their eye-watering compute deals.

## Q3 · 这份材料是**四种交付物里的哪一种**？同源的另一份是哪一份？

本份是 bilingual（双语逐段对齐）：封面英文标题与中文标题、副题与副题、作者行与作者行、日期与日期全部并列，页脚另有「中英对照 / BILINGUAL」标记，正文每个英文段后紧跟同一段的中文，图注也做成「[Figure: …] / [图：…]」成对出现。同源组按全批对照表是四份文档一个来源：本份双语版、一页要点摘要版、七月三日的英文原版，以及同日的另一份英文整理件（对照表标注已填）；四份共用一个来源，不得计成四个独立源。三份可见版本的措辞与关键数字一致（同一笔 2.5GW 在建、同一组单 GW 收入），差别只在交付形态，因此检索时只能算一次证据。

### 依据

- p.1｜中英对照 / BILINGUAL
- p.1｜Meta Compute: Everyone Wants To Be A Neocloud Meta 的算力：人人都想做 Neocloud
- p.3｜3. （SemiAnalysis 独家）我们认为 Meta 正在与 Anthropic 进行最后阶段的谈判，以获得 Claude 的私有实例。
- p.3｜(SemiAnalysis Exclusive) We believe that Meta is in final talks with Anthropic to get access to private instances of Claude.

## Q4 · 他的**假设与算式**能不能复算？

最关键的结论是「SpaceX 式交易的单 MW 收入是同行的三到四倍」，把图上的倍率自己算一遍会出问题：以 Neocloud 五年期 IaaS 平均 120 亿美元/GW 为 1.0x，SpaceX 对 Anthropic 的 310 亿应为 2.6x（31÷12 = 2.58），对 Google 的 480 亿才是 4.0x（48÷12 = 4.0），B300 按需 290 亿为 2.4x。也就是说正文说的「三倍和四倍」中，四倍通过、三倍这一档对不上，实际是 2.6 倍，与「三倍」差约 15%。另一条可复算：每 GW 年收入 500 亿美元 × 0.2GW = 100 亿美元/年，与「200MW 带来 100 亿美元」完全一致，复算通过。缺的一步是 500 亿美元/GW 这个单价本身怎么来：材料只说 SpaceX 对 Google 的定价高于按需市场，没有给出合同金额与容量的原始输入。

### 依据

- p.5｜The reason is simple: the revenue per MW of these deals are respectively triple and quadruple what peers are charging, as shown below.
- p.6｜At \$50B/Gigawatt of annual revenue, it becomes an easy call. Just allocating 200MW of compute to an external customer drives \$10B/yr of revenue, at sky-high margin.
- p.5｜[图：SpaceX 创造了一个新的市场细分—— 短期＋大规模算力，溢价极高。各玩家的单 GW 年化收入：Neocloud 五年期 IaaS 平均 \$12B（1.0x）、B300 按需 \$29B（2.4x）、SpaceX + Anthropic \$31B（2.6x）、SpaceX + Google \$48B（4.0x）。来源：AI Cloud TCO Model]

## Q5 · 关键数字的**脚注指向哪**？

没有脚注，只有 Source 行与口头归因。可查的三处指向：交易台账写「SemiAnalysis Datacenter Model」，定价写「AI Cloud TCO Model」，算力拆分写「Tokenomics Model / Datacenter Model」，三者都是自建模型，只能记 Ⅱ 档。少数几处属一手或准一手：彭博关于 Meta 可能转型 Neocloud 的报道（媒体，Ⅱ 档）、Meta 首席财务官 Susan Li 对单条广告价格归因的说法（公司公开表态）、Advantage+ Shopping 的 ROAS 与转化成本对比（公司自述口径）。至于 SpaceX 与 Anthropic、Google 两笔交易的金额与期限，没有任何文件级引用，只有「我们的 TCO 模型每年跟踪数百笔交易」这一句自证。本份为中英对照且中文段未删减英文段内容，判断是原文不设脚注，而非译本丢失。

### 依据

- p.1｜With Bloomberg headlines suggesting Meta could become a Neocloud, the market’s reaction was immediate
- p.5｜Our AI Cloud TCO model team tracks hundreds of GPU cloud deals every year, including all contract terms like SLA, pricing, contract length etc.
- p.10｜This is a continuation CFO Susan Li has attributed their increased average price per ad to improved ad performance and targeting capabilities.

## Q6 · 他的**自建口径 / 评级**定义是什么？与公司口径差多少？

两个自建口径，其中第一个没给定义。① 「IT 容量 GW」：全文用它量在建与签约（2.5GW 在建、5GW 签约、10GW 累计），但没说它是 IT 负载功率、园区总供电还是含冗余，也没说能否与 SpaceX 交易里的 MW 直接比；因此该口径不得换算成公司披露的资本开支或机柜数。② 「单 GW 年化收入」：来自 AI Cloud TCO Model，规则是按合约期限分组统计每 GW 每年的收入（五年期 IaaS 均值 120 亿美元/GW/年），与公司口径的差别是公司从不披露单位算力收入，且这把尺子量的是收入而非毛利，须假定「成本结构大致相同」才能谈每 MW 利润差。③ 文中预告 ClusterMAX 评级即将发布，但本文未给分档与权重，因此这份材料里没有可用的评级体系。

### 依据

- p.1｜[Figure: Meta’s Compute Deals per Quarter (GW of IT Capacity) — over 5GW of cloud & colo contracted in 2026 year-to-date; stacked bars of New Datacenter Leases and New Neocloud GPU Deals, Q3 2025 through Q2 2026. Source: SemiAnalysis Datacenter Model]
- p.5｜The profit per MW gap is, of course, even larger given the cost structure is roughly the same.
- p.1｜ClusterMAX ranking coming soon?

## Q7 · 他**有没有投行关系 / 持仓**？

三项都未声明。① 是否收费顾问：未声明，全文没有顾问、咨询字样，也没有列出受雇对象。② 投行关系：未声明，文末停在「唯一能改变我们看法的是它签下一笔没有提前取消条款的合约」这句结论上，没有免责声明、没有承销或做市角色说明。③ 持仓或受资助：未声明，没有持仓、基金资助或利益冲突段。封面上的付费标记只表示内容对订阅读者收费，不能当「无投行关系」的证据。因此按「关系不明」处理：这篇的结论是「Meta 会继续激进锁定算力、Neocloud 被错杀」，直接指向 Coreweave、Nebius 等标的的股价判断，而作者是否持有这些标的、是否与其中任何一方有商业往来，材料里无从核实。

### 依据

- p.12｜Compute, data, and talent are the three pillars of a frontier lab, and unlike the other hyperscalers, Zuck has put up the capital to try becoming world-class at all three.
- p.1｜Jeremie Eliahou Ontiveros, Max Kan, Joey Brookhart, and 2 others — Jul 02, 2026 · SemiAnalysis

## Q8 · 他的**行业级判断**（产能 · 份额）有数据支撑吗？

三条行业级断言，口径都可辨。① 新细分市场：SpaceX 把「短期＋大规模」算力做成独立品类，定价 310 亿至 480 亿美元/GW/年，是同业五年期均价的 2.6 至 4 倍；口径是单 GW 年化收入、不含电力与土建，样本是 TCO 模型跟踪的数百笔交易，属自建统计而非行业出货。② 供给格局：融资压力把 Neocloud 排除在该细分之外，前三大云商各有更高价值的长期打法，因此只剩 Oracle 与 Meta 吃得下；这是逻辑推演，没有份额百分比，也没有产能统计。③ 需求端：Meta 可把广告推荐算力放大 10 倍以上，2026 年一季度展示量同比增 19%、单条价格增 12%，转化率在 GEM 训练 GPU 翻倍后分别提升 5% 与 3%；这组是公司披露口径，可回溯。

### 依据

- p.10｜We think Meta can profitably absorb a >10x increase in AdRec compute with this new model because each additional gigawatt correlates directly to better predictions
- p.10｜In Q1 2026, ad impressions grew 19% YoY and average price per ad grew 12% YoY.
- p.6｜This effectively leaves only two companies that can truly capitalize on this new market: Oracle and Meta.
