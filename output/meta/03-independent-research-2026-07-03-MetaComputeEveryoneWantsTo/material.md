---
id: 03-independent-research-2026-07-03-MetaComputeEveryoneWantsTo
cat: "03"
sub: independent-research
template: independent-research
template_version: 2
date: 2026-07-03
time: "00:00"
title: "SemiAnalysis：Meta 的算力生意——人人都想做云（与双语版同一原文，2026-07-03）"
kind: "independent-research"
issuer: "SemiAnalysis / Jeremie Eliahou Ontiveros、Max Kan、Joey Brookhart 等 5 人"
ticker: META
source_pages: 12
---

## Q1 · 他给的公司**未披露口径**的外部估算是什么？

三项外部估算。① 签约规模：2024 年初以来 Meta 签下近 10GW 交易，容量增量的大头已转到第三方（口径为 IT 容量 GW，未拆分自建、租数据中心、租云三条路径的比例）。② 溢价定价的单 GW 收入：SpaceX 那笔对 Google 的交易，单 MW 收入是同业报价的四倍左右，对 Anthropic 那笔在三倍左右；作者据此给出「每 GW 年收入约 500 亿美元」的锚，并算出把 200MW 分给一个外部客户即得 100 亿美元/年。③ 推荐系统的算力弹性：广告推荐算力可再放大 10 倍以上仍有利可图；GEM 训练栈用 16 倍 GPU 换 23 倍有效训练算力、MFU 提升约 1.4 倍。②里的 500 亿美元/GW 是纯锚值，样本与合同条款未在本份列出（同源双语版把这张图的数据放在图注里），因此只能当量级，不能入格。

### 依据

- p.3｜After nearly 10GW of deals signed since early 2024, the bulk of their capacity additions are now through 3rd parties.
- p.3｜After all, just a couple hundred MWs can already drive >\$10B of yearly revenue! We expect a ten billion dollar Anthropic deal to kick off the flywheel.
- p.4｜The reason is simple: the revenue per MW of these deals are respectively triple and quadruple what peers are charging, as shown below.
- p.9｜A new training stack that has 23x effective training FLOPs with \~1.4x increase in MFU using 16x more GPUs

## Q2 · 他的**物理量**从哪来、能不能核？

三个物理量与三个时点：① 最大的两个园区合计 2.5GW 在建（撰稿时，2026 年 7 月初），配了卫星影像；② 2024 年初以来累计近 10GW 签约；③ SpaceX 在完成那几笔算力交易后仍余 900MW 可用于训练前沿模型。单位都是 GW/MW，但本份没有任何一处给出这些量的换算过程：从卫星图到 2.5GW 之间没有逐栋、逐机柜的分解，10GW 没有交易对手与单笔规模，900MW 也没有减去已售容量的明细。卫星影像只能证明工地确实在建，不能证明 2.5GW 这个数，因此三个量都记来源不可回溯、只能当旁证。本份未给出 GPU 张数、机柜数与变电容量。

### 依据

- p.1｜Meta's capacity under construction just keeps accelerating. We show below Meta's two largest campuses - these two pictures represent 2.5GW of capacity under construction!
- p.2｜Of course, this naturally raises the questions of what Meta will do with this compute, and whether they're going to flood the market with all of this supply if they turn into a Neocloud.
- p.11｜SpaceX still has up to 90oMW left after their eye-watering compute deals. This is sufficient for taking a few true shots on goal at reaching the frontier.

## Q3 · 这份材料是**四种交付物里的哪一种**？同源的另一份是哪一份？

本份是 original（纯英文原文），不是双语也不是摘要：全篇只有英文，没有中文段落并列，没有「KEY POINTS」条目化抬头，正文是完整论证段。同源判断：它与双语版是同一篇原文的两种交付物，不是两篇独立文章。依据有四条同时成立——副题逐字相同（SpaceX 2.0、Bedrock 2.0、MSL 未放弃、推荐系统放大 10 倍、ClusterMAX 排名即将发布），作者名单与排序相同（均为五人，末位写「另两人」），关键数字相同（2.5GW 在建、近 10GW 签约、500 亿美元/GW、900MW 余量），章节顺序相同。唯一差异是标题把 Neocloud 改成了 Cloud、日期比双语版晚一天，属重发时的标题修订；因此同源组为双语版、摘要版、本份，以及同日的另一份英文整理件，四份共用一个来源，不得计成四个独立源。

### 依据

- p.1｜Meta Compute: Everyone Wants To Be A Cloud
- p.1｜Zuck Takes Plan B? SpaceX 2.0, Bedrock 2.0, MSL Isn’t Giving Up, Scaling RecSys by 10x... ClusterMAX ranking coming soon?
- p.1｜JEREMIE ELIAHOU ONTIVEROS,MAX KAN, JOEY BROOKHART,AND 2 OTHERS JUL 03,2026·PAID
- p.6｜Enter Meta. Given their laser-focus on building Superintelligence,they probably didn't put enough thought into the Cloud option.

## Q4 · 他的**假设与算式**能不能复算？

有一条能算通、一条算不了。能算通的：每 GW 年收入 500 亿美元，乘 0.2GW 得 100 亿美元/年，与「200MW 带来 100 亿美元」完全一致，复算通过；再往下如果按 90 天可解约、实质三个月合约理解，这条收入的年化前提是持续续约，材料自己点明了这一点。算不了的：正文说 SpaceX 两笔交易的单 MW 收入分别是同行的「三倍和四倍」，但本份文本里没有那张展示各家单 GW 收入的图，也没有同业的基准价，缺了分母就无法验证三倍这个说法；同源双语版把该图数据写进图注（同业五年期均值 120 亿美元/GW、SpaceX 对 Anthropic 310 亿、对 Google 480 亿），按那组数算，对 Anthropic 实为 2.6 倍而非三倍。因此倍数这一条只能当作者的定价主张。

### 依据

- p.6｜At \$50B/Gigawatt of annual revenue,it becomes an easy call. Just allocating 20oMW of compute to an external customer drives \$10B/yr of revenue,at sky-high margin.
- p.5｜We have never ever seen a deal that large,and that short: the deal is three years, but with option to cancel from both parties within 90 days - so it's effectively a 3-month deal with automatic renewal.

## Q5 · 关键数字的**脚注指向哪**？

无脚注。全文没有脚注标记，也没有 Source 行或参考文献表；可辨的归因只有三处：① GPU 云定价与合同条款来自「我们的 AI Cloud TCO 模型团队每年跟踪数百笔交易」（自建样本，Ⅱ 档）；② 单条广告价格的解释引 Meta 首席财务官 Susan Li 的说法（公司公开表态）；③ Advantage+ Shopping 的回报率与转化成本对比（公司自述）。Meta 与 Anthropic 的「最后阶段谈判」被标为 SemiAnalysis 独家，属单一信源、无第二方确认。作为纯英文原文，缺脚注不可能是译本删节，只能是原文本身的形式，所以本份所有关键数一律按 Ⅱ 档处理。

### 依据

- p.5｜Our AI Cloud TCO model team tracks hundreds of GPU cloud deals every year, including all contract terms like SLA, pricing, contract length etc.
- p.10｜This is a continuation CFO Susan Li has attributed their increased average price per ad to improved ad performance and targeting capabilities.
- p.3｜3. (SemiAnalysis Exclusive) We believe that Meta is in final talks with Anthropic to get access to private instances of Claude.

## Q6 · 他的**自建口径 / 评级**定义是什么？与公司口径差多少？

两个自建口径，第一个没给定义。① 「IT 容量 GW」：本份用它衡量在建与签约（2.5GW、10GW），但没说含不含电力冗余、是 IT 负载还是园区总容量，也没说能否与 SpaceX 交易里的 MW 相加；该口径不得换算成公司披露的资本开支或机柜数。② 「单 GW 年化收入」：来自 AI Cloud TCO 模型，规则是按合约期限分组统计每 GW 每年收入，与公司口径的差别是公司从不披露单位算力收入，且这把尺子量收入而非毛利，作者须假设「成本结构大致相同」才能推出每 MW 利润差更大。③ 文中预告 ClusterMAX 评级即将发布，但本份没有给分级与权重，因此这份材料里没有可用的评级体系。

### 依据

- p.4｜The proft per MW gap is, of course, even larger given the cost structure is roughly the same.
- p.1｜Zuck Takes Plan B? SpaceX 2.0, Bedrock 2.0, MSL Isn’t Giving Up, Scaling RecSys by 10x... ClusterMAX ranking coming soon?

## Q7 · 他**有没有投行关系 / 持仓**？

三项都未声明。① 是否收费顾问：未声明，全文没有顾问或咨询字样。② 投行关系：未声明，文末只有 Substack 的版权与隐私行，没有承销、做市或与任何一方的关系说明。③ 持仓或受资助：未声明，没有持仓、资助或利益冲突段。页首的付费标记只说明内容收费，不能反推「无投行关系」。因此按「关系不明」处理，不得假定其独立。之所以要谨慎：本份对 Oracle 下了「本该把手里那么多 GW 变现得漂亮得多」的重话，对 Coreweave、Nebius 的剩余履约义务给出利好判断，这些都是能直接影响个股定价的结论，而作者与这些标的的关系在材料里无从核实。

### 依据

- p.12｜© 2026 Dylan Patel · Privacy · Terms · Collection notice Substack is the home for great culture
- p.1｜JEREMIE ELIAHOU ONTIVEROS,MAX KAN, JOEY BROOKHART,AND 2 OTHERS JUL 03,2026·PAID

## Q8 · 他的**行业级判断**（产能 · 份额）有数据支撑吗？

有三条，口径都可辨但都不是行业统计。① 新细分市场：SpaceX 把「短期＋大规模」算力做成独立品类，定价达同业的三至四倍；口径是单 MW 收入，样本是自家 TCO 模型跟踪的数百笔交易，没有行业出货量或份额分母。② 供给格局：融资压力把 Neocloud 挡在该细分之外，前三大云商各有更高价值的长期打法，只剩 Oracle 与 Meta 吃得下——纯逻辑推演，零份额数字。③ 需求侧：Meta 可把广告推荐算力放大 10 倍以上，2026 年一季度展示量同比增 19%、单条价格增 12%，GEM 训练 GPU 翻倍后 Instagram 与 Facebook 转化率分别提升 5% 与 3%；这一组是公司披露口径，可回溯，但它是 Meta 自身的经营指标，不能当行业读数。

### 依据

- p.10｜We think Meta can profitably absorb a >10x increase in AdRec compute with this new model because each additional gigawatt correlates directly to better predictions
- p.10｜In Q1 2026,ad impressions grew 19% YoY and average price per ad grew 12% YoY.
- p.5｜This effectively leaves only two companies that can truly capitalize on this new market: Oracle and Meta.
