---
id: 03-broker-research-2026-05-31-GlobalArtificialIntelligen
cat: "03"
sub: broker-research
template: broker-research
template_version: 2
date: 2026-05-31
time: "00:00"
title: "03-broker-research-2026-05-31-GlobalArtificialIntelligen"
kind: "broker-research"
issuer: ""
ticker: META
source_pages: 21
---

> 骨架已生成，答案待填。原文：`corpus/materials/mineru/03-broker-research-2026-05-31-GlobalArtificialIntelligen/full.md`（21 页）。
> 填写纪律见 `docs/EVIDENCE-SPEC.md`：有答案必有依据块，块须逐字，页码 `p.N` 以源 PDF 为准。

## Q1 · 他的**关键假设取值**各是多少？

产品型不符：本件是 Citi 的 AI 主题跟踪件（周度信号汇总），没有个股损益表，也没有收入/利润率/资本开支/税率/股数六项财务假设——毛利率、营业利润率、资本开支、实际税率、摊薄股数五项材料未给出。

它真正在用的是另一条假设链，即"算力供需 → token 定价"：

- **核心假设**：AI 支出增速快于推理供给增速，因此 AI 实验室会继续用价格分层（如 5 月 28 日发布的 Claude Opus 4.8）抬高每 token 的实现价格。
- **推理成本代理**：H100 租金两周内下跌 10%，但年初至今仍上涨 27%；Blackwell 单瓦/单卡效能是前代的 35–50 倍，随新增产能投放会继续压低单位推理成本。
- **供给侧投入**：Anthropic 完成 650 亿美元 H 轮，三家高带宽存储厂商均作为战略投资方入股；NVIDIA 承诺在台湾投入 1,500 亿美元扩产。
- **需求侧代理**：SF Fed 经济通讯称劳动生产率处于 57% 的高增长区间概率，全要素生产率 2025 年四季度为 21%。
- **模型侧价格点**：本标的相关的 Meta Llama 4 Maverick 混合价 0.34 美元/百万 token、AA 智能指数 18、输出 106 tokens/秒、1000K 上下文、2026 年 4 月 5 日发布、开源。

### 依据

- p.1｜With AI spend accelerating beyond the growth in inference supply, we expect AI Lab models to continue to leverage pricing segmentation (as with the release of Anthropic’s Claude Opus 4.8 (5/28)) to drive realized pricing higher on a per token basis
- p.1｜H100 rental pricing down 10% over the last two weeks while still up 27% since the beginning of the year
- p.1｜We believe this will continue as the 35-50x more performant Blackwell infrastructure comes online as a larger share of new capacity additions.
- p.1｜Anthropic's $65B Series H raise (Anthropic, 5/28) coinciding with the leaderboard-topping release of Claude Opus 4.8
- p.3｜Meta Llama 4 Maverick 18 106 $0.34 1000 Apr. 5, 2026 Open

## Q2 · **他和我差在哪一项、哪一年**？差多少？

我方模型数值不在本份材料内，逐行"他 vs 我"的对照需跨批（交主控）。

本件既没有共识表（无 FirstCall／FactSet／Visible Alpha／"vs consensus"字样），也没有任何年度预测行；全部数值是时点快照——模型榜、模型定价、GPU 租金都按列头日期取值。所以收入、利润率、EPS 三个层面都无从对照，记缺口。

材料内唯一能做的是跨模型横向定价对照（不是"他 vs 我"的年度差）：

| 模型 | AA 智能指数 | 混合价（美元/百万 token） | 发布日 |
|---|---|---|---|
| Claude Opus 4.8 (max) | 61 | 4.10 | 2026-05-28 |
| GPT-5.5 (xhigh) | 60 | 4.35 | 2026-04-23 |
| Qwen3.7 Max | 57 | 1.43 | 2026-05-19 |
| Llama 4 Maverick | 18 | 0.34 | 2026-04-05 |

这组数支持"智能越高、单价越高"的分层判断（前两名单价是开源模型的 12 倍左右），但它证明的是定价结构，不是他对某一年盈利的预测。

### 依据

- p.2｜Model Metrics, Model Pricing, and GPU Pricing reflect values as of the date indicated in the column header.
- p.3｜Anthropic Claude Opus 4.8 (max) 61 $4.10 1000 May. 28, 2026 Proprietary
- p.3｜OpenAI GPT-5.5 (xhigh) 60 66 $4.35 922 Apr. 23, 2026 Proprietary
- p.3｜Alibaba Qwen3.7 Max 57 201 $1.43 1000 May. 19, 2026 Proprietary

## Q3 · 他的**财年是谁的财年**？

材料未给出财年口径。本件是 2026 年 5 月 29 日发布的主题跟踪件，全篇的时间标尺是发布时点与图表列头日期（如 Apr. 2026、May. 28, 2026），没有任何 FY／Dec-25A 式列头，也没有哪家公司进入会计年度预测。因此不存在"公司财年 vs 日历年"的选择问题，也不能与日历年末共识对齐——引用其数据时只能标"截至 2026 年 5 月 29 日"。

### 依据

- p.1｜29 May 2026 00:03:25 ET │ 21 pages
- p.2｜Model Metrics, Model Pricing, and GPU Pricing reflect values as of the date indicated in the column header.

## Q4 · **预测修正**：改了哪一项、从多少改到多少？改的是**假设**还是**结论**？

无预测修正可写。本件不发布盈利预测、不给目标价，全文没有 old/new、prior/current、from X to Y、raise/lower estimate 一类句子，也没有"我们对某公司 FY26 EPS 由 A 调至 B"的表述。

唯一带"变化"的数值是市场信号本身：H100 租金两周 −10%、年初至今 +27%，以及新模型进入榜单后单价档位的变化。这些是数据更新（本件定位就是周度信号汇总），不是对假设或结论的修正，所以既不能记"假设变了"，也不能记"结论变了"，只能记"本件无修正层"。

### 依据

- p.1｜CITI'S TAKE
- p.2｜Model Metrics, Model Pricing, and GPU Pricing reflect values as of the date indicated in the column header.

## Q5 · 他给了**情景**吗？各自驱动假设是什么？

产品型不符：本件是主题跟踪件，没有个股评级、没有目标价，也没有 Bull/Base/Bear 三档，因此不存在"三档各记 PT 与触发假设"这一层。

它给的是条件式的方向判断，不是情景：若 AI 支出继续快于推理供给，则实验室靠价格分层抬高每 token 实现价格（以 Claude Opus 4.8 发布为证）；若 Blackwell 产能按计划投放，则单位推理成本继续下行（H100 租金已两周 −10%）。这两句可以当作"驱动假设"，但没有对应到任何一档估值，也没有把上行/下行写成可计算的分叉。

### 依据

- p.1｜Citi’s Inference Ahead - Segmenting the Frontier
- p.1｜Supply constraints. We see model efficiency as a critical tool to address the supply constraints that exist across the full chain of AI infrastructure

## Q6 · 他用了哪几种**估值方法**？**能互相印证吗**？

产品型不符：本件没有任何估值方法。全文没有 P/E、EV/EBITDA、DCF、WACC、永续增长率或目标倍数，也没有给出任何目标价——它的"定价"指的是模型厂商的 token 单价（美元/百万 token）与 GPU 租金，不是股票估值。

材料内唯一与估值框架有关的是评级定义段：评级按 12 个月预期总回报划分，目标价基于 12 个月期限；但该定义在本件只作方法说明，未对任何公司落地，因此无从"互相印证"，也不能反推 META 的估值。

### 依据

- p.15｜The target price is based on a 12 month time horizon.
- p.13｜Companies Mentioned: Alphabet Inc (GOOGL.O; US$390.13; 1; 28 May 26; 16:00) | Apple, Inc. (AAPL.O; US$312.51; 1; 28 May 26; 16:00) | Ciena (CIEN.K; US$570.18; 1; 28 May 26; 16:00)

## Q7 · 目标价的**依据 / 估值方法解释 / 风险列示**齐不齐？

产品型不符，三件都无从谈起——本件不设目标价，因此不存在"目标价由哪个方法算出、关键输入是什么、阻碍达成的风险有哪些"这三件。

具体核对：本件提及的公司只有 Alphabet、Apple、Ciena、Lumentum、MiniMax、TSMC 六家有评级与参考价，META 只作为模型提供方（Llama）与订阅业务案例出现，没有评级、没有 PT，也就没有对应的估值与风险段。

披露里有一句说明这类内容的位置：估值与风险评估可在覆盖该标的的最新研究报告中查到——即本件按设计不承担该职能。按产品型判不适用，不算形式缺件、不上报。

### 依据

- p.15｜Valuation and Risk assessments can be found in the text of the most recent research note/report regarding the subject company.
- p.13｜Lumentum Holdings Inc (LITE.O; US$860.62; 1; 28 May 26; 16:00) | MiniMax (0100.HK; HK$837.0; 1H; 28 May 26; 16:10) | TSMC (2330.TW; NT$2295.0; 1; 28 May 26; 13:30)

## Q8 · **评级分布三件**（三档占比 · 投行关系占比 · 观测时点）齐不齐？

三件齐，出自机构级披露表，不是数报告里的个股条数。

- **三档占比**（Citi Research Global Fundamental Coverage，Neutral=Hold）：Buy 61%、Hold 32%、Sell 8%。
- **投行关系占比**：各评级类别中属于投行客户的比例为 38%（Buy）／41%（Hold）／28%（Sell）。
- **观测时点**：Data current as of 01 Apr 2026，即发布日（5 月 29 日）前近两个月，既不是当季末也不是上季末，属"季度初取数"，跨机构比较时要标注。
- 同表另有一组 12 个月 Catalyst Watch 分布（37%／47%／16%，投行客户 42%／37%／36%），那是短期观点体系，不能与基本面评级混算。

### 依据

- p.15｜Citi Research Equity Ratings Distribution
- p.15｜Data current as of 01 Apr 2026
- p.15｜Citi Research Global Fundamental Coverage (Neutral=Hold) 61% 32% 8% 37% 47% 16%
- p.15｜% of companies in each rating category that are investment banking clients 38% 41% 28% 42% 37% 36%

## Q9 · **评级 / 目标价历史走势图**在不在（含赋改日期）？

未见。本件既无个股评级也无目标价，因此不存在"评级/PT 历史走势图"的适用前提；披露里只有一句指向性说明：基本面覆盖的价格图与评级变动历史见披露附录或发行人披露摘要，但附录内落地的只有本报告提及六家公司的单点评级与参考价（且不含 META），没有任何时间序列、没有变动条数、没有最近一次调整日期。

按"覆盖满一年才须附"的口径，本件对本标的未建立覆盖，属不适用；文本层也没有图可读，故判未见。

### 依据

- p.16｜For fundamental coverage please refer to the price chart or rating change history within this disclosure appendix or the issuer disclosure summary
- p.13｜Companies Mentioned: Alphabet Inc (GOOGL.O; US$390.13; 1; 28 May 26; 16:00)

## Q10 · **九项冲突披露**在不在**首页**（或指明页码）？

首页没有"See page N for…"式样板句，只有一句"See Appendix A-1 for Analyst Certification, Important Disclosures and Research Analyst Affiliations."，逐项内容在 Appendix A-1。需先说明：本件不含 META 评级，披露名单只覆盖"报告提及且有评级的公司"（Alphabet、Apple、Ciena、Lumentum、MiniMax、TSMC），META 仅作为模型提供方与订阅案例出现——因此下面多处"无"是"名单不含本标的"，不等于"该机构与本标的无冲突"。

| 项 | 有/无 | 位置与内容 |
|---|---|---|
| ① 分析师及家庭持仓 | 未见 | Appendix A-1 只有认证段，逐条讲分析师观点独立、报酬不挂钩具体建议，全文没有"分析师本人或家庭成员持有某证券"的列名句，也没有 household member 口径；查了认证段与 16 页其他披露段均无，故判未见（不是"确认无持仓"） |
| ② 报酬是否挂钩投行收入 | 有（间接） | 报酬段：不由具体交易或建议决定，但受公司整体盈利影响，该盈利含投行、销售交易与自营收入；同段还承认"分析师看好某公司时其管理层更愿参加 corporate access"，属间接激励 |
| ③ 近 12 个月主/副承销或收投行报酬 | 无（本标的不在名单） | 承销段仅"acted as manager or co-manager of an offering of securities of Alphabet Inc."；投行报酬段为 Alphabet、Apple、TSMC ⇒ 两段均不含 META |
| ④ 未来 3 个月是否寻求投行费 | 无（本标的不在名单） | "expects to receive or intends to seek, within the next three months, compensation for investment banking services from Ciena." 只点名 Ciena |
| ⑤ 近 12 个月非投行服务报酬 | 无（本标的不在名单） | 名单为 Alphabet、Apple、Ciena、Lumentum、MiniMax、TSMC，不含 META |
| ⑥ 是否客户及服务类型 | 无（本标的不在名单） | 投行客户名单为 Alphabet、Apple、Ciena、TSMC；非投行证券类/非证券类客户名单同为上述六家 ⇒ 本件未把 META 列为客户，也无服务类型可记 |
| ⑦ 实益持有该类普通股 ≥1% | 未见（有相近声明但主体与标的均不符） | 唯一相近的是印度子公司句："Citigroup Global Markets India Private Limited and/or its affiliates may have, from time to time, actual or beneficial ownership of 1% or more in the debt securities of the subject issuer."——主体是印度子公司、标的是债务证券，与本项要确认的"母公司持本标的普通股 ≥1%"主体与标的均不符，故判未见；另有 significant financial interest 名单（Alphabet、Apple、Ciena、Lumentum、TSMC）也不含 META |
| ⑧ 是否做市 | 无（本标的不在名单） | 全文做市声明只有两条，均指 MiniMax（"made a market ... on at least one occasion since 1 Jan 2025"与"is a market maker ... of MiniMax"）⇒ 不含 META |
| ⑨ 分析师过去 12 个月是否从标的收酬 | 未见 | 最接近的是认证段"报酬任何部分与本文具体建议无直接或间接关系"——那是针对本文观点的独立性承诺，不是"从 META 收酬"的确认；披露中也没有按标的列示的分析师收酬句，故判未见 |
| ⑩ 其他重大冲突 | 有（通用，不含本标的） | "The Firm is a regular issuer of traded financial instruments linked to securities that may have been recommended in the Product. The Firm regularly trades in the securities of the issuer(s) discussed in the Product."；加上 significant financial interest 名单（不含 META）⇒ 通用冲突声明在，标的口径不在 |

红旗提示：本件对 META 无评级、无 PT，也未把 META 列入做市/持股/投行关系名单；但 Citi 与 Alphabet（本件核心论述对象之一）同时存在承销、投行报酬与显著财务利益，并对 MiniMax 做市 ⇒ 引用其 AI 主题判断时，对这几家的相关论述应作立场折价。

### 依据

- p.1｜See Appendix A-1 for Analyst Certification, Important Disclosures and Research Analyst Affiliations.
- p.14｜The research analysts primarily responsible for the preparation and content of this research report are either (i) designated by “AC” in the author block or (ii) listed in bold alongside content which is attributable to that analyst.
- p.14｜Compensation is not linked to specific transactions or recommendations.
- p.14｜One factor in equity research analyst compensation is arranging corporate access events between institutional clients and the management teams of covered companies.
- p.14｜Within the past 12 months, Citigroup Global Markets Inc. or its affiliates has acted as manager or co-manager of an offering of securities of Alphabet Inc.
- p.14｜Citigroup Global Markets Inc. or its affiliates has received compensation for investment banking services provided within the past 12 months from Alphabet Inc,Apple, Inc.,TSMC.
- p.14｜Citigroup Global Markets Inc. or its affiliates expects to receive or intends to seek, within the next three months, compensation for investment banking services from Ciena.
- p.14｜Citigroup Global Markets Inc. or its affiliates received compensation for products and services other than investment banking services from Alphabet Inc,Apple, Inc.,Ciena,Lumentum Holdings Inc,MiniMax,TSMC in the past 12 months.
- p.14｜Citigroup Global Markets Inc. or its affiliates currently has, or had within the past 12 months, the following as investment banking client(s): Alphabet Inc,Apple, Inc.,Ciena,TSMC.
- p.14｜Citigroup Global Markets Inc. and/or its affiliates has a significant financial interest in relation to Alphabet Inc,Apple, Inc.,Ciena,Lumentum Holdings Inc,TSMC.
- p.14｜The Firm has made a market in the publicly traded equity securities of MiniMax Group Inc on at least one occasion since 1 Jan 2025.
- p.16｜Citigroup Global Markets India Private Limited and/or its affiliates may have, from time to time, actual or beneficial ownership of 1% or more in the debt securities of the subject issuer.

## Q11 · 他的**风险章**挂了数字吗？

没有风险章，只有散在正文里的瓶颈句——存储供给、电力与电网接入、地缘与出口管制各一句，全部是方向表述（"存储仍将是 AI 供应链最重要的瓶颈""模型效率是缓解供给约束的关键工具"），没有一条附百分点、金额或对任何标的 EPS/PT 的敏感度。

因此判：无风险章、无数字。这不是"漏写"，本件按产品型（主题跟踪）不设风险章，风险只在单标的报告中列示；引用其瓶颈判断时只能当作方向输入，不能当作可复算的风险敞口。

### 依据

- p.1｜The inclusion of all three High Bandwidth Memory manufacturers as strategic partners in the raise serves as confirmation that memory is expected to remain the most significant bottleneck in the AI supply chain.
- p.1｜Huawei's TAU Scaling Law (Huawei, 5/25) at IEEE ISCAS offers the geopolitical counternarrative of an efficiency-first framework for frontier-level AI performance.

## Q12 · 这份报告落在**静默期窗口**内吗？

否。

- 发布日：2026 年 5 月 29 日 00:03:25 ET。
- 发行日：披露里唯一的主/副承销记录是过去 12 个月内为 Alphabet 的证券发行担任 manager 或 co-manager，没有给发行日期，也没有 META 的承销记录；全文无 IPO／follow-on／lock-up 时间线。
- 判定：本件是主题跟踪更新，不涉及任何标的的发行承销评论，发布日与任何已知发行日都无法配对，因此不落窗。若日后核实那笔 Alphabet 发行发生在 5 月 26 日之后（二次发行 3 日窗口），则仅影响 Alphabet 相关段落，不影响本件对 META 的论述。

### 依据

- p.1｜29 May 2026 00:03:25 ET │ 21 pages
- p.14｜Within the past 12 months, Citigroup Global Markets Inc. or its affiliates has acted as manager or co-manager of an offering of securities of Alphabet Inc.

