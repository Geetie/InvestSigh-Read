---
id: 03-broker-research-2026-06-11-3
cat: "03"
sub: broker-research
template: broker-research
template_version: 2
date: 2026-06-11
time: "00:00"
title: "03-broker-research-2026-06-11-3"
kind: "broker-research"
issuer: ""
ticker: META
source_pages: 44
---

> 骨架已生成，答案待填。原文：`corpus/materials/mineru/03-broker-research-2026-06-11-3/full.md`（44 页）。
> 填写纪律见 `docs/EVIDENCE-SPEC.md`：有答案必有依据块，块须逐字，页码 `p.N` 以源 PDF 为准。

## Q1 · 他的**关键假设取值**各是多少？

本件是月度数据中心容量追踪（不是个股损益模型），因此没有 Meta 的收入/毛利/营业利润/税率/摊薄股数假设行。它真正在用的假设链是"容量—施工—接入方式—设备 TAM"，逐项取值：

- **管道总量**：May-26 为 324.0 GW，M/M +29.1 GW（+10%），Y/Y +227%，YTD +43%，折合 10 年施工工作量。
- **在建容量**：63.0 GW，M/M +4.4 GW（+7%），Y/Y +185%，YTD +50%。
- **受阻（搁置）容量**：34.3 GW，占管道 11%，M/M +1.9 GW（+6%），Y/Y +324%。
- **BTM 渗透率**：BTM 管道 128.9 GW，M/M +12%（+14.1 GW），YTD +48%；占管道 40%、占在建 25%、占已装机 4%。
- **资本开支（超大厂，报告所引共识口径）**：'26 年 \$640B（+78% Y/Y），'27 年 \$812B（+27%）。
- **电气设备 TAM（按公司披露 \$M/MW 机会推算）**：PWR \$4.4T、VRT \$1T、Schneider \$865B、ETN \$758B、ABB \$648B、LGN \$329B。
- **收入增速、毛利率、营业利润率、实际税率、摊薄股数**：材料未给出。本件只附一张报价表给 EPS（2025A/2026E/2027E）与 P/E，无任何损益科目，属产品型不符，不从 EPS 反推。

### 依据

- p.1｜In this note, we update our monthly Data Center Capacity Tracker series, a comprehensive monitor of N. American data center capacity by stage of development, operator, and geography.
- p.1｜Project Pipeline. Over the last month, the data center project pipeline grew by 10%, up 29 GW to 324 GW.
- p.1｜Under Construction. In May data center capacity under construction increased by 4.4 GW to 63 GW.
- p.1｜Stranded Capacity. The rise in local data center opposition/NIMBY continues driving stranded capacity higher. This grew by 1.9 GW to 34 GW, representing 11% of total pipeline, which remains up vs. 7-9% last summer, but is beginning to stabilize.
- p.1｜Behind-the-meter power continues accelerating. During the month, the BTM pipeline grew by 12% or 14 GW M/M and by 48% or 42 GW YTD to 129 GW.
- p.1｜Currently, only 4% of the installed base of data centers use this approach, but 25% of the capacity under construction will use it and 40% of the projects in the pipeline will use it.
- p.1｜Electricals TAM update. Based on the current pipeline and company-disclosed \$M/MW opportunity, we estimate the following data center TAMs: PWR (\$4.4T), ETN (\$758B), LGN (\$329B), VRT (\$1T), Schneider (\$865B), ABB (\$648B), as well as several other OEMs.
- p.12｜EXHIBIT 14: Consensus is Anticipating \~\$640B in Capex Spend From the Top 4 Hyperscalers in ‘26, Up 78% Y/Y. ‘27 Currently Expects 27% Growth to \$812B

## Q2 · **他和我差在哪一项、哪一年**？差多少？

我方模型数值不在本份材料内，逐行"他 vs 我"的对照需跨批（交主控）。本材料内可核的对照只能做"他本期 vs 他上期"——同一张月度表、同一自算口径：

| 指标（GW） | Apr-26 上期 | May-26 本期 | 变动 |
|---|---|---|---|
| 管道 Pipeline | 294.9 | 324.0 | +29.1，+9.9% |
| 在建 Under Construction | 58.6 | 63.0 | +4.4，+7.5% |
| 受阻 Stranded | 32.4 | 34.3 | +1.9，+5.9% |
| BTM 管道 | 114.9 | 128.9 | +14.0，+12.2% |

差异全部落在**容量总量端**，不在利润率端——本件不产利润率预测，也没给任何个股的年度收入/EPS 修正，所以"哪一年差多少"在这一层无法回答。

增量结构值得单列：管道增加的 29 GW 里开发商 22 GW（占 75%）、加密矿企 6 GW（占 21%），超大厂容量反而小幅下降；即在"超大厂自建"这条主线上，他本月的边际判断比上月更弱，对开发商与 BTM 的依赖更重。

报告唯一的外部锚是超大厂资本开支共识（'26 \$640B、'27 \$812B），但他没有给出"自己 vs 共识"的差额行，故该项仍记缺口。

### 依据

- p.5｜<tr><td>Pipeline</td><td>324.0</td><td>294.9</td><td>226.1</td><td>99.0</td><td>227%</td><td>10%</td><td>43%</td></tr>
- p.5｜<tr><td>Under Construction</td><td>63.0</td><td>58.6</td><td>42.1</td><td>22.1</td><td>185%</td><td>7%</td><td>50%</td></tr>
- p.5｜<tr><td>Total Stranded Capacity</td><td>34.3</td><td>32.4</td><td>21.2</td><td>8.1</td><td>324%</td><td>6%</td><td>61%</td></tr>
- p.5｜<tr><td rowspan="2"></td><td colspan="7">Monthly</td></tr><tr><td>May-26</td><td>Apr-26</td><td>Dec-25</td><td>May-25</td><td>%Y/Y</td><td>% M/M</td><td>% YTD</td></tr>
- p.1｜Developers (22 GW) and crypto miners (6 GW) drove the majority of the growth this month, accounting for 75% and 21% of the increase, respectively.
- p.12｜EXHIBIT 14: Consensus is Anticipating \~\$640B in Capex Spend From the Top 4 Hyperscalers in ‘26, Up 78% Y/Y. ‘27 Currently Expects 27% Growth to \$812B

## Q3 · 他的**财年是谁的财年**？

- 报价表列头只写 `2025A / 2026E / 2027E`，既没有 `FYE Dec` 也没有 `Dec-26` 这类月末标记，**按日历年推定**，不作已确认处理。报价时点标注为 9 Jun 2026。
- 口径陷阱在 EPS：同一张表里 Meta、Amazon、Alphabet、台系硬件与 Siemens Energy 用的是 **Reported EPS**，其余多数公司用 Adjusted EPS，跨公司比较不可混用；Meta 一栏三期为 23.49 / 33.54 / 37.04。
- 本件主体（管道/在建/受阻 GW）不是财年概念，而是月末快照，列头为 May-26 / Apr-26 / Dec-25 / May-25 四个月末，与会计年度无关；它的"年"是日历年月序列。

### 依据

- p.2｜<tr><td>META (Meta)</td><td>0</td><td>USD 584.59</td><td>850.00</td><td>(37.1)%</td><td>USD</td><td>23.49</td><td>33.54</td><td>37.04</td><td>24.9</td><td>17.4</td><td>22.0</td></tr>
- p.2｜AMZN, META, GOOGL, 2308.TT, 2360.TT, 2382.TT, 3037.TT, ENR.GR estimate is Reported EPS
- p.2｜<table><tr><td colspan="4">9 Jun 2026</td><td colspan="2">TTM</td><td colspan="3"> Adjusted EPS</td><td colspan="3">Adjusted P/E (x)</td></tr>
- p.5｜<tr><td rowspan="2"></td><td colspan="7">Monthly</td></tr><tr><td>May-26</td><td>Apr-26</td><td>Dec-25</td><td>May-25</td><td>%Y/Y</td><td>% M/M</td><td>% YTD</td></tr>

## Q4 · **预测修正**：改了哪一项、从多少改到多少？改的是**假设**还是**结论**？

- 本件是月度追踪更新，全文未见 `old/new`、`prior/current`、`raise/lower our … estimate`、`from \$X to \$Y` 一类估计修正句，也没有上期目标价可对。评级与目标价整段沿用：Meta Outperform、\$850；ETN \$534、HUBB \$584、LGN \$103、J \$163、TRMB \$85、URI \$1,153、CAT \$879、CMI \$700、OSK \$138、PWR \$725，一句"Remain"贯穿。
- 真正变动的是**追踪数据集本身**，不是估值假设：管道 +29.1 GW、在建 +4.4 GW、受阻 +1.9 GW、BTM +14.1 GW。这是事实层月更新，改的是"世界的读数"，不是"他的假设"。
- 分层判定：**假设没变、结论也没变**。唯一被点名的估值口径是 Ferguson 的 EV/EBITDA 18.0x 与 P/E 24.5x，原文用 maintaining，明确未调。
- 唯一带"边际转向"含义的表述是超大厂管道容量环比持平/小幅下降，但这仍是观测值，不是对某只票的估计修正，故不构成"假设变了"。
- 因此本件不存在需要逐行给"旧值→新值"的修正项；若主控要的是个股模型修订，本件答不了。

### 依据

- p.3｜Remain Outperform on ETN (\$534), HUBB (\$584), LGN (\$103), J (\$163), TRMB (\$85), and URI (\$1,153). Remain Market-Perform on CAT (\$879), CMI (\$700), OSK (\$138) and PWR (\$725).
- p.4｜US Business Services: We rate Ferguson Outperform with a \$310 (GBp 22,963) target price, maintaining our EV/EBITDA multiple of18.0x and a P/E multiple of 24.5x.
- p.5｜<tr><td>△ in Pipeline</td><td>29.1</td><td>13.9</td><td>9.2</td><td></td><td>-</td><td>110%</td><td>217%</td></tr>
- p.15｜EXHIBIT 21: Hyperscalers’ Capacity in Pipeline Remained Flat Month-Over-Month

## Q5 · 他给了**情景**吗？各自驱动假设是什么？

- **单情景**。全文没有 Bull/Base/Bear，也没有三档目标价。本文标的 Meta 只给一个 \$850（Outperform），Amazon \$315、Google \$390 同为单点。
- 未设三档，仅有下行风险方向：NIMBY 导致的受阻容量（34 GW、占管道 11%）与管道增速可持续性。这两个变量都没有被折算成任何一档 PT。
- 因此"目标价差三成、假设只差一点、杠杆在倍数不在经营"这类判断在本件无从检验——连目标倍数都没披露。
- 三档缺位的后果是：读者只能拿到一个点估计，无法知道他在什么容量增速假设下 \$850 成立、在什么假设下会失效。

### 依据

- p.3｜US Internet: We rate Amazon Outperform with PT of \$315. We rate Meta Outperform with PT of \$850. We rate Google Market-Perform with PT of \$390.
- p.2｜<tr><td>META (Meta)</td><td>0</td><td>USD 584.59</td><td>850.00</td><td>(37.1)%</td><td>USD</td><td>23.49</td><td>33.54</td><td>37.04</td><td>24.9</td><td>17.4</td><td>22.0</td></tr>
- p.1｜Stranded Capacity. The rise in local data center opposition/NIMBY continues driving stranded capacity higher. This grew by 1.9 GW to 34 GW, representing 11% of total pipeline, which remains up vs. 7-9% last summer, but is beginning to stabilize.

## Q6 · 他用了哪几种**估值方法**？**能互相印证吗**？

- 对本文标的**未给估值方法**：Meta 的 \$850 只有一个数字，没有目标倍数、没有指标（EPS/EBITDA 基数）、没有 WACC 或永续增长率，无法复算。
- 披露附录对"覆盖六家及以上公司"的估值方法整体外链，正文不复述，属"只给结论、不给方法"。
- 全篇唯一可复算的一例在 Ferguson：EV/EBITDA 18.0x 叠加 P/E 24.5x，PT \$310（GBp 22,963）。这是双倍数并用的一例，但对象不是本文标的，也不能外推到 Meta。
- 判定：**方法缺位**。既然连一种方法都没落到 Meta 上，"两法是否得同一结果"无从谈起；唯一的多方法样本（Ferguson）也未说明两法孰主孰辅、是否得同一价。

### 依据

- p.3｜US Internet: We rate Amazon Outperform with PT of \$315. We rate Meta Outperform with PT of \$850. We rate Google Market-Perform with PT of \$390.
- p.35｜This research publication covers six or more companies. For valuation methodology and other company disclosures:
- p.4｜US Business Services: We rate Ferguson Outperform with a \$310 (GBp 22,963) target price, maintaining our EV/EBITDA multiple of18.0x and a P/E multiple of 24.5x.
- p.2｜LGN, CRWV valuation is EV/EBITDA (x); AMZN, META, GOOGL, 2308.TT, 2360.TT, 2382.TT, 3037.TT, WULF, MARA, RIOT, CORZ valuation is Reported P/E (x)

## Q7 · 目标价的**依据 / 估值方法解释 / 风险列示**齐不齐？

三件逐条核，**三件全缺**：

1. **目标价由哪个方法算出**：无。Meta \$850 未给公式，也没说"倍数×指标"。
2. **方法的关键输入**：无。缺目标倍数、缺 EPS 基数（表内 EPS 是实际/预测值，不等于用于定价的基数）、缺 WACC 与永续增长率、缺溢价理由。
3. **可能阻碍达成目标价的风险列示**：无。风险条目整体外链，正文零条，连"竞争加剧"级别的模板句都没有。

结论：**形式不合规（2241(c)(1) 三件全缺），须上报**。本件只能当"容量数据源"用，不能当"有目标价论证的个股报告"用。清单上唯一有方法解释的 Ferguson 尚不属本文标的，不能用来补这一项。

### 依据

- p.35｜This research publication covers six or more companies. For valuation methodology and other company disclosures:
- p.35｜For risks and other company disclosures:
- p.3｜US Internet: We rate Amazon Outperform with PT of \$315. We rate Meta Outperform with PT of \$850. We rate Google Market-Perform with PT of \$390.

## Q8 · **评级分布三件**（三档占比 · 投行关系占比 · 观测时点）齐不齐？

三件里**两件齐、观测时点缺**。数据取自披露附录的机构级分布表，不是数正文股票条数：

| 评级档（MAR/FINRA 对应） | 全球评级占比 | 其中过去 12 个月有投行关系占比 |
|---|---|---|
| Outperform（BUY） | 51.1% | 16.5% |
| Market-Perform / Neutral（HOLD） | 36.3% | 17.8% |
| Underperform（SELL） | 12.6% | 14.9% |

- 三档合计 100.0%，占比与投行关系两列俱全。
- **观测时点：未见**。表头只写 `Global RatingDistribution` 与 `Investment BankingRelationships*`，正文和脚注都没有 `as of <日期>`，也没有"截至最近日历季末"的说明；带星号的脚注在文本层里找不到对应定义。故无法判断用的是哪一季，只能记"时点未标"。

### 依据

- p.37｜<tr><td rowspan=1 colspan=1>Equity Rating</td><td rowspan=1 colspan=1>Market AbuseRegulation (MAR) and FINRA Rating Category</td><td rowspan=1 colspan=1>Global RatingDistribution</td><td rowspan=1 colspan=1>Investment BankingRelationships*</td></tr>
- p.37｜<tr><td rowspan=1 colspan=1>Outperform</td><td rowspan=1 colspan=1>BUY</td><td rowspan=1 colspan=1>51.1%</td><td rowspan=1 colspan=1>16.5%</td></tr>
- p.37｜<tr><td rowspan=1 colspan=1> Market-Perform (Bernstein Brand) Neutral (Autonomous Brand)</td><td rowspan=1 colspan=1>HOLD</td><td rowspan=1 colspan=1>36.3%</td><td rowspan=1 colspan=1>17.8%</td></tr>
- p.37｜<tr><td rowspan=1 colspan=1>Underperform</td><td rowspan=1 colspan=1>SELL</td><td rowspan=1 colspan=1>12.6%</td><td rowspan=1 colspan=1>14.9%</td></tr>

## Q9 · **评级 / 目标价历史走势图**在不在（含赋改日期）？

- **声明有图、文本层无数据，判未见**。原文只有一句"PRICE CHARTS/ RATINGS AND PRICE TARGET HISTORY"，紧接着把图指向 bluematrix 外部链接，报告内既无图也无表、无任何赋改日期与历史 PT 序列。
- 因此"覆盖期间（起止）+ 变动条数 + 最近一次（日期/评级/PT）"三项全部取不到。
- 可确认的只有品牌沿革事实：2024 年 4 月 1 日之前由 Sanford C. Bernstein & Co., LLC 出具评级与目标价，涉及名单含 Meta Platforms Inc.——这只能证明该标的有较长覆盖史，不能替代历史图数据。
- 本件为月度系列追踪，不是首评件，故不适用"覆盖不足一年、无须附"的豁免口径；缺的是图本身。

### 依据

- p.37｜PRICE CHARTS/ RATINGS AND PRICE TARGET HISTORY
- p.37｜For price chart and other company disclosures, please visit https:// bernstein-autonomous.bluematrix.com/sellside/Disclosures.action
- p.37｜Prior to April 1, 2024, Sanford C. Bernstein & Co., LLC. issued the ratings and price target information in the graph(s) below for the following companies: Caterpillar Inc, Cummins Inc, Jacobs Solutions Inc, Oshkosh Corp, Quanta Services Inc, Trimble Inc, United Rentals Inc, NVIDIA Corp, Broadcom Inc, Advanced Micro Devices Inc, Intel Corp, Amazon.Com Inc, Meta Platforms Inc., Alphabet Inc, Microsoft Corp and Oracle Corp.

## Q10 · **九项冲突披露**在不在**首页**（或指明页码）？

首页以样板句指明披露位置（"See the Disclosure Appendix of this report for required disclosures, analyst certifications and other important information"），逐项内容集中在披露附录的"REQUIRED DISCLOSURES"名单段与"CONFLICTS OF INTEREST"段。本件为多标的合并披露，名单按公司逐票列名，故每项都要判**名单含/不含本文标的 Meta**。逐项核对：

| 项 | 有/无（对本文标的） | 位置与内容 |
|---|---|---|
| ① 分析师及家庭持仓 | 有 | 附录点名三名关联人分别持有 Amazon、Meta、Alphabet 的股权或债务证券，**含本标的 Meta Platforms Inc.**；未区分本人/家庭成员，也未给比例 |
| ② 报酬是否挂钩投行收入 | 有（明确否定） | 报酬按"account penetration, productivity and proactivity of investment ideas"计，并直写"No analysts are compensated based on performance in, or contributions to, generating investment banking revenues"，同时认证段声明报酬与具体推荐无关 |
| ③ 近 12 个月主/副承销或收投行报酬 | 有（名单不含本标的） | 收投行费名单为 Caterpillar、Legence、CoreWeave、Amazon、Alphabet、Schneider、Siemens、Legrand、Microsoft；另有一句"managed or co-managed a public offering"名单为 Caterpillar、Legence、CoreWeave、Amazon、Alphabet、Schneider、Legrand。两处**均不含 Meta** |
| ④ 未来 3 个月是否寻求投行费 | 有（名单不含本标的） | "expect to receive or intend to seek"名单为 Caterpillar、Legence、CoreWeave、Amazon、Alphabet、Schneider、Legrand，**不含 Meta** |
| ⑤ 近 12 个月非投行服务报酬 | 有（名单不含本标的） | 三句分主体列名（含 ABB、Cummins、Intel、Equinix、Microsoft 等），逐句比对**均不含 Meta**；NVIDIA/Microsoft 那句也不含 |
| ⑥ 是否客户及服务类型 | 有（投行客户名单不含本标的） | 仅披露"investment banking client relationship"名单（Caterpillar 等九家），**不含 Meta**；对 Meta 只披露了做市与持仓，未披露其为客户及服务类型 |
| ⑦ 实益持有该类普通股 ≥1% | 未见 | AB 的 1% 名单为 Eaton、Oshkosh、United Rentals、Prysmian、Core Scientific；SG 的 1% 名单为 Prysmian、Cipher、Riot，**两处均不含 Meta**。唯一相近的是 MiFID 口径"净多或净空 ≥0.5% 已发行股本"名单，其中含 Meta Platforms Inc.，但门槛是 0.5%、口径是净多/净空而非实益持有 1% 普通股，故不能算本项 |
| ⑧ 是否做市 | 有（名单含本标的） | 股票做市/流动性提供名单含 Meta Platforms Inc.，债务证券做市名单亦含 Meta Platforms Inc. |
| ⑨ 分析师过去 12 个月是否从标的收酬 | 未见 | 附录只有认证段（报酬不与具体推荐挂钩）与印度子公司口径的"未收取投行/商业银行服务报酬"，后者主体是 SCB India、范围限于印度公司，与"母公司分析师从 Meta 收酬"主体与标的两项均不符，故判未见 |
| ⑩ 其他重大冲突 | 有 | 另披露：SG 任 Alphabet 债券联席账簿管理人；SG 任 Schneider 可转债联席全球协调人；两名分析师持有多种加密货币多头。三项均**不涉 Meta**，但"关联人持有 Meta 证券"已计在① |

**红旗提示**：该机构对本文标的既有股票+债务证券做市，又在 MiFID 口径下持有 ≥0.5% 净仓，且报告参与人本人持有 Meta 证券 ⇒ 引用其 Meta 观点时应作立场折价，尤其在其未披露目标价方法（见前题）的情况下。

### 依据

- p.1｜See the Disclosure Appendix of this report for required disclosures, analyst certifications and other important information.
- p.35｜An associate contributing to this report has a financial interest in the equity or debt securities of Meta Platforms Inc..
- p.39｜Analysts are compensated based on aggregate contributions to the research franchise as measured by account penetration, productivity and proactivity of investment ideas. No analysts are compensated based on performance in, or contributions to, generating investment banking revenues.
- p.38｜Bernstein and/or affiliates have received compensation for investment banking services in the past twelve months from Caterpillar Inc, Legence Corp., CoreWeave, Inc., Amazon.Com Inc, Alphabet Inc, Schneider Electric SA, Siemens AG, Legrand SA and Microsoft Corp.
- p.38｜Bernstein and/or affiliates expect to receive or intend to seek compensation for investment banking services in the next three months from Caterpillar Inc, Legence Corp., CoreWeave, Inc., Amazon.Com Inc, Alphabet Inc, Schneider Electric SA and Legrand SA.
- p.38｜AB and/or its affiliates beneficially own 1% or more of a class of common equity securities of the following companies: Eaton Corp PLC, Oshkosh Corp, United Rentals Inc, Prysmian SpA and Core Scientific Inc.
- p.38｜Bernstein Autonomous LLP or BSG France SA, beneficially, has either a net long or short position of 0.5% or more of the total issued share capital of a class of common equity securities of the following MiFID eligible securities: Eaton Corp PLC, Oshkosh Corp, Quanta Services Inc, United Rentals Inc, Broadcom Inc, Digital Realty Trust, Inc., Meta Platforms Inc., Alphabet Inc, Prysmian SpA, Core Scientific Inc, Trane Technologies PLC and Carrier Global Corporation.
- p.38｜Certain affiliates of Bernstein act as market maker or liquidity provider in the equities securities of: Caterpillar Inc, Cummins Inc, Eaton Corp PLC, Hubbell Incorporated, Oshkosh Corp, Quanta Services Inc, Trimble Inc, United Rentals Inc, NVIDIA Corp, Broadcom Inc, Advanced Micro Devices Inc, Intel Corp, Amazon.Com Inc, Meta Platforms Inc., Alphabet Inc, Ferguson Enterprises Inc., Schneider Electric SA, Siemens AG, ABB Ltd, Legrand SA, Siemens Energy AG, Prysmian SpA, Microsoft Corp, Oracle Corp, Cipher Digital Inc, TeraWulf Inc, Vertiv Holdings Co, nVent Electric PLC, Trane Technologies PLC, Johnson Controls International PLC and Carrier Global Corporation.
- p.42｜• have not received any compensation for investment banking services or merchant banking services from the subject company in the past 12 months;
- p.37｜SG and/or its affiliate.s is acting as Joint Bookrunner for Alphabet Inc's bond issue (EUR, 3, 6, 9, 13, 19, 39Y).

## Q11 · 他的**风险章**挂了数字吗？

- **没有风险章，一条都没有**。披露附录以一句外链替代（"For risks and other company disclosures: please visit …"），正文也没有 Risks 小节。这既不是"挂了敏感度的风险"，也不是"样板风险句"，而是**风险列示缺位**：共 0 条，无一条附百分点或金额，也无 WACC ±1%、永续增长率 ±0.5%、目标倍数 ±1x 之类的敏感度表。
- 唯一近量化的表述是基本面方向：受阻容量升至 34.3 GW、占管道 11%，比去年夏天的 7–9% 高，但"开始企稳"。它没有被映射到任何一年的 EPS 或目标价，也没有给出"受阻再升 1 GW ⇒ 影响几何"的换算。
- 因此判据句"若〔变量〕变 X ⇒〔哪一年〕EPS 或 PT 变 Y%"在本件写不出来。这不是数据藏得深，是根本没有。
- 补充：全文唯一带点风险意味的方向句是管道增速的不可持续性，但也止于描述，无量级。

### 依据

- p.35｜For risks and other company disclosures:
- p.1｜Stranded Capacity. The rise in local data center opposition/NIMBY continues driving stranded capacity higher. This grew by 1.9 GW to 34 GW, representing 11% of total pipeline, which remains up vs. 7-9% last summer, but is beginning to stabilize.
- p.5｜<tr><td>Total Stranded Capacity</td><td>34.3</td><td>32.4</td><td>21.2</td><td>8.1</td><td>324%</td><td>6%</td><td>61%</td></tr>

## Q12 · 这份报告落在**静默期窗口**内吗？

- **否**。发布日为 First Published 11 Jun 2026 00:30 UTC（Completion Date 10 Jun 2026 15:01 UTC），本件是月度容量追踪的常规更新，全文没有任何 IPO/二次发行/发售时间线，也没有"作为承销商在发行后 N 天内不出报告"的日期链条可比对。
- 披露里确有 `underwriting` 性质的记录，但那是过去 12 个月的一般性投行关系名单（Caterpillar、Legence、CoreWeave、Amazon、Alphabet、Schneider、Legrand），且**不含本文标的 Meta**；也没有任何"本次发行"的定价日可与发布日相减。故不构成落窗。
- 判定依据是"发布日 vs 发行日"比对，而非"有没有静默期声明"：本件无发行日，故不落窗。

### 依据

- p.1｜First Published: 11 Jun 2026 00:30 UTC  Completion Date: 10 Jun 2026 15:01 UTC
- p.38｜Affiliates of Bernstein managed or co-managed in the past twelve months a public offering of securities of Caterpillar Inc, Legence Corp., CoreWeave, Inc., Amazon.Com Inc, Alphabet Inc, Schneider Electric SA and Legrand SA.
- p.1｜In this note, we update our monthly Data Center Capacity Tracker series, a comprehensive monitor of N. American data center capacity by stage of development, operator, and geography.
