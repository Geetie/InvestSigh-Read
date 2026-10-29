---
id: 03-independent-research-2026-08-07-Gemini凉了但GCP正在崛起GeminiisCo
cat: "03"
sub: independent-research
template: independent-research
template_version: 2
date: 2026-08-07
time: "00:00"
title: "SemiAnalysis：Gemini 气数已尽，但 GCP 正在崛起（2026-08-07）"
kind: "independent-research"
issuer: "SemiAnalysis / Max Kan、Joey Brookhart、Doug O'Laughlin、Dylan Patel"
ticker: META
source_pages: 17
---

## Q1 · 他给的公司**未披露口径**的外部估算是什么？

本件主体是 Google 的两个业务块，不是 Meta。外置估算逐项如下：① Gemini 业务 2026 年二季度 ARR 约 120 亿美元（口径为年化收入，来自其代币经济学模型）；② GCP 到 2027 年底第三方 AI 的 IaaS/TaaS 年化收入超 730 亿美元，另有 1,200 亿美元 TPU 销售额，两者合计约 2,000 亿美元外部销售、EBIT 利润率三成七上下；③ 2026 年二季度 TPU 系统季度销售额约 12 亿美元，按总额法、单价约每 GW 350 亿美元计，剔除后核心 GCP 增速在七成出头；④ 2027 年 GCP 增速「一百五十上下」对卖方共识 64%；⑤ TPU 系统在手订单超 1,500 亿美元，未来几季 RPO 可能再加 2,500 亿美元 TPU 预订；⑥ 2027 年对 Google 每股收益贡献约 3 美元。③有换算桥（GW×单价），①②⑤是外推，不能入格。

### 依据

- p.11｜Our Tokenomics Model estimates that Gemini ARR was \$12B in 2Q26.
- p.11｜by the end of 2027, GCP will be doing over \$73B in third party AI ARR IaaS/TaaS and another \$120B of TPU sales.
- p.12｜In 2Q26, we estimate that TPU sales were around \$1.2B in the quarter, and thus core GCP grew in the low 70s.
- p.12｜Given over \$150B of TPU systems backlog, these TPU system sales will drive GCP’s 2027 growth rate into the mid 100s vs sellside consensus at 64%.

## Q2 · 他的**物理量**从哪来、能不能核？

只有一组物理量，且口径被特意声明过。① 出货份额：2026 年三季度到 2027 年四季度，TPU 总出货量的两成以上直接卖给 Anthropic；② 租用规模：GCP 目前已租给 Anthropic 数十万颗 TPU，另有数十万颗已承诺在未来六个季度租给 Anthropic 与 Meta；③ 单价：TPU 系统按每 GW 约 350 亿美元确认收入。关键在于他把「出货量」定义成加速器供应商确认收入的时点，即基板或封装件交付下游制造商之时，与芯片真正投入运行不是一回事，所以这两成是收入确认口径、不是装机容量口径，也不能与「在运 TPU 数」直接比。三条都没有指向海关、招标或公司公告，只有自家加速器模型，因此记来源不可回溯，数值只能当旁证。

### 依据

- p.7｜More than 20% of total TPU shipments from 3Q26 to 4Q27 are being sold directly to Anthropic.
- p.7｜This is excluding the hundreds of thousands of TPUs GCP already rents to Anthropic today, and the many hundreds of thousands more they’ve committed to rent to Anthropic and Meta over the next 6 quarters.
- p.16｜2 Shipment refers to when the accelerator supplier recognizes revenue, which is typically when they ship a baseboard/package to the downstream manufacturer. This is different from when the chips are actually operational.

## Q3 · 这份材料是**四种交付物里的哪一种**？同源的另一份是哪一份？

本份是 bilingual（双语句对齐）：封面英文标题与中文标题并列，作者行排两遍（一遍英文、一遍中文），正文逐段「英文段紧跟中文同段」，引用的推文也保留英文原文再给中文解释，文末英文注释后附中文译文。按全批同源对照表，这篇 SemiAnalysis 的 Gemini/GCP 件在表内只有本 id 一行，没有原文、译文或摘要的兄弟件，因此本份单独构成一个来源，不存在同一原文被拆成多份文档、重复计成多个独立源的问题。需要注意的是它内含一处翻译事故：英文写 TPU 销售 1,200 亿美元，中文写成「120 亿美元」，与本段合计 2,000 亿美元的口径自相矛盾，引用时必须回到英文段取值。

### 依据

- p.1｜Gemini is Cooked but GCP is Cooking Gemini 气数已尽，但 GCP 正在崛起
- p.1｜MAX KAN, JOEY BROOKHART, DOUG O'LAUGHLIN, AND DYLAN PATEL
- p.1｜MAX KAN, JOEY BROOKHART, DOUG O'LAUGHLIN, 以及 DYLAN PATEL
- p.2｜For all intents and purposes, we believe DeepMind is no longer a frontier lab.
- p.2｜从各方面来看，我们认为 DeepMind 已不再是一家前沿实验室。

## Q4 · 他的**假设与算式**能不能复算？

最关键结论是「2027 年 GCP 约 2,000 亿美元外部销售」。复算：730 亿第三方 AI IaaS/TaaS 加 1,200 亿 TPU 销售等于 1,930 亿，与文中「约 2,000 亿」差 3.5%，属取整，复算通过；同段又说第一方业务今天只有 120 亿，倍数关系也自洽。token 增速可复算：一季度从每分钟 100 亿增到 160 亿即 +60%，二季度 160 亿到 220 亿为 +37.5%，与文中 38% 一致。不能复算的是「2027 年增速一百五十上下」：它由 TPU 系统销售按总额法入账推出，但文中只给在手订单 1,500 亿与单价 350 亿/GW，没有给确认节奏与期间分布，缺一步。另需注意中文段把 1,200 亿写成 120 亿，按中文段加总只有 850 亿，与 2,000 亿对不上，属译本数字错误。

### 依据

- p.11｜\$200B of external sales at high 30s EBIT margins vs a first party business generating just \$12B today shows where the focus is.
- p.5｜Whereas they grew 60% in 1Q26, going from 10B to 16B tokens per minute, 2Q26 saw just 38% growth to 22B.
- p.11｜到 2027 年底，GCP 的第三方AI IaaS/TaaS 年度经常性收入将超过 730 亿美元，此外还有 120 亿美元的 TPU 销售额。

## Q5 · 关键数字的**脚注指向哪**？

有脚注，但脚注不指向数据源：全文只有两条编号注释，第一条说明 Sanjay 的职级是高级 Google 研究员（作者背景，不涉数据），第二条定义「出货量」指供应商确认收入的时点（口径说明，也不给来源）。因此 2,000 亿、730 亿、1,200 亿、1,500 亿在手订单、20% 出货占比这些核心数字，脚注区一条都没接住，只能按其正文自称的模型记 Ⅱ 档。文中另有一处引用 X 上的推文并标了来源，属他人公开发言，可作旁证但不算一手数据。这与中文译本无关——中英两段同段并列、注释也译了——是原文本身没做数据引注。

### 依据

- p.16｜1 Technically Sanjay is a Senior Google Fellow, the only one besides Jeff.
- p.16｜Recommend SemiAnalysis to your readers
- p.10｜Source: Tibo on X X 上的 Tibo

## Q6 · 他的**自建口径 / 评级**定义是什么？与公司口径差多少？

两个自建口径，都有明确定义，但都与公司披露不同向。① 「出货量（shipment）」：定义为加速器供应商确认收入的时点，通常是基板或封装件交付下游制造商，不等于芯片投运；用它算出的「两成 TPU 卖给 Anthropic」是收入确认口径，会比按装机口径算出的份额偏早、偏高。② 「TPU 系统按总额法（gross basis）每 GW 约 350 亿美元确认收入」：总额法把整套系统（含配套）全额计入 GCP 收入，而云服务的净额法只计服务费；这直接抬高了 GCP 增速——剔除 12 亿美元 TPU 销售后核心 GCP 只有七成出头，而报表口径是 82%。两个口径都由作者声明，但公司不按此拆分披露，所以不能直接与 Google 财报的云收入增速对账。

### 依据

- p.12｜This last quarter, GCP growth was 82%.
- p.12｜These TPU sales are accounted for on a gross basis at \~\$35B/GW.
- p.13｜虽然这些系统销售的 EBIT 利润率略低于核心云业务 30% 出头的水平，但我们仍预计未来整个 GCP 将实现 35% 至 39% 的 EBIT 利润率。

## Q7 · 他**有没有投行关系 / 持仓**？

三项都未声明。① 是否收费顾问：未声明，全文没有顾问、咨询或客户名单。② 投行关系：未声明，文末只有 Substack 的版权与隐私行，没有承销、做市或与 Alphabet 相关的任何角色说明。③ 持仓或受资助：未声明，没有持仓、资助或利益冲突段。页首的付费标记只说明内容对订阅读者收费，不能反推「无投行关系」。因此按「关系不明」处理：这篇对 Alphabet 给出的是「放弃前沿、转向卖 TPU 的金融化」这种结构性看空叙事，同时又给出 2027 年每股收益增 3 美元、GCP 增速一百五十上下的强多头数字，两种方向同时存在，作者是否持有相关头寸、是否与 GPU/TPU 供应链任何一方有商业往来，材料里无从核实。

### 依据

- p.17｜© 2026 Dylan Patel · Privacy ∙ Terms ∙ Collection notice Substack is the home for great culture
- p.1｜AUG 07, 2026 ∙ PAID ∙ 付费内容

## Q8 · 他的**行业级判断**（产能 · 份额）有数据支撑吗？

有三条，全部落在自家模型口径上。① 份额：2026 年三季度至 2027 年四季度 TPU 总出货量两成以上直卖 Anthropic，另有数十万颗已租、数十万颗已承诺租给 Anthropic 与 Meta；这是加速器出货（收入确认）口径，不是市场份额，也不含 Google 自用。② 产能与订单：TPU 系统在手订单超 1,500 亿美元，按 350 亿美元/GW 折算约 4GW 出头（此折算文中未明写，属我方推算，只能当量级）；未来几季 RPO 或再加 2,500 亿美元。③ 增速对比：GCP 2027 年增速一百五十上下对卖方共识 64%，差距近 90 个百分点，但共识的来源与样本未给。三条都无第三方数据库或出货量统计支撑，只能当作者模型的输出。

### 依据

- p.7｜More than 20% of total TPU shipments from 3Q26 to 4Q27 are being sold directly to Anthropic.
- p.12｜GCP has a new revenue source in selling full systems of its TPUs to external SPVs that run datacenters for customers such as Anthropic.
- p.13｜总计，我们估计未来几个季度 GCP 的 RPO（剩余履约义务）可能会增加超过 2500 亿美元的额外 TPU 预订量。
