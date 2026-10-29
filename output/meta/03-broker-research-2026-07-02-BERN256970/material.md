---
id: 03-broker-research-2026-07-02-BERN256970
cat: "03"
sub: broker-research
template: broker-research
template_version: 2
date: 2026-07-02
time: "00:00"
title: "03-broker-research-2026-07-02-BERN256970"
kind: "broker-research"
issuer: ""
ticker: META
source_pages: 15
---

> 骨架已生成，答案待填。原文：`corpus/materials/mineru/03-broker-research-2026-07-02-BERN256970/full.md`（15 页）。
> 填写纪律见 `docs/EVIDENCE-SPEC.md`：有答案必有依据块，块须逐字，页码 `p.N` 以源 PDF 为准。

## Q1 · 他的**关键假设取值**各是多少？

先定性：本件首页评级栏的主标的其实是 CRWV（U，目标价 67），META 作为"新闻主体 + 报价表第二行"出现（O，目标价 850）。两家的假设都只能从这两张表取。

**CRWV（主标的，有 Financials 表）**

- **收入增速**：F25A 5,131 → F26E 12,371 → F27E 19,731（百万美元）。按表内数推算：F26E +141.1%、F27E +59.5%；原表自给两年 CAGR 96.1%。
- **EBITDA**：2,442 → 6,232 → 11,736（百万美元），自给 CAGR 119.2%。
- **毛利率、营业利润率**：年度值材料未给出。只有隐含的 EV/EBIT 倍数（F26E 460x、F27E 36.8x）与 2027E 调整后 EBIT/股 \$5.81，不足以还原利润率。
- **资本开支、实际税率、摊薄股数**：材料未给出。本件是 5 页正文的 Quick Take，无现金流量表、无税率行、无股数行，三者均无从取。
- **Adj. EPS**：（1.20）/（4.20）/（2.41）美元——三期全为负，F26E 亏损最深。

**META（报价表行，只有 EPS 与倍数）**

- Adjusted EPS：23.49 / 33.54 / 37.04 美元；EV/EBITDA：24.0x / 16.8x / 15.2x。
- 收入增速、毛利率、营业利润率、资本开支、税率、股数：**表内未给该行**，本件对 META 只有倍数与 EPS，不从 EPS 反推。

### 依据

- p.1｜<tr><td>Revenues (M)</td><td>5,131</td><td>12,371</td><td>19,731</td><td>96.1%</td></tr>
- p.1｜<tr><td>EBITDA (M)</td><td>2,442</td><td>6,232</td><td>11,736</td><td>119.2%</td></tr>
- p.1｜<tr><td>CRWV (USD)</td><td>(1.20)</td><td>(4.20)</td><td>(2.41)</td></tr>
- p.1｜<tr><td>EV/EBIT (x)</td><td>N/M</td><td>460</td><td>36.8</td></tr>
- p.5｜<tr><td>META (Meta) SPX</td><td>0</td><td>USD</td><td>563.29</td><td>850.00</td><td>(42.5)%</td><td>USD</td><td>23.49</td><td>33.54</td><td></td><td>37.04</td><td>24.0</td><td>16.8</td><td>15.2</td></tr>

## Q2 · **他和我差在哪一项、哪一年**？差多少？

我方模型数值不在本份材料内，逐行"他 vs 我"的对照需跨批（交主控）。

本件只有单点估计、没有共识对照表，能做的只有"他的目标价 vs 当日收盘"这一组：

| 标的 | 收盘（30 Jun 2026） | 他的目标价 | 空间 |
|---|---|---|---|
| CRWV | \$99.54 | \$67.00 | −32.7%（原文记 (33)%） |
| META | \$563.29 | \$850.00 | +50.9% |

差异的性质要分清：CRWV 是**负空间 33%**（评级 U），META 是**正空间 51%**（评级 O），同一张表、同一团队署名、方向相反。这不是"他和我差一年"，而是"他对同一条新闻的两个标的给了相反结论"。

年度逐项（2026E/2027E 收入、EBITDA、EPS 的他值 vs 我值）本材料无法提供——全文没有"vs consensus"或"vs prior"表，登记的单点估计列头即为此证。

结论：可核差异在目标价与收盘的偏离（CRWV −33%、META +51%）；年度逐项对照记缺口。

### 依据

- p.1｜<tr><td>Close Date</td><td>30 Jun 2026</td></tr><tr><td>CRWV Close Price (USD)</td><td>99.54</td></tr><tr><td>Price Target (USD)</td><td>67.00</td></tr><tr><td>Upside/(Downside)</td><td>(33)%</td></tr>
- p.5｜<tr><td>CRWV (CoreWeave)</td><td>U</td><td>USD</td><td>99.54</td><td>67.00</td><td>(57.0)%</td><td>USD</td><td>(1.20)</td><td>(4.20)</td><td>(2.41)</td><td></td><td>35.8</td><td>14.0</td><td>7.4</td></tr>
- p.5｜<tr><td>META (Meta) SPX</td><td>0</td><td>USD</td><td>563.29</td><td>850.00</td><td>(42.5)%</td><td>USD</td><td>23.49</td><td>33.54</td><td></td><td>37.04</td><td>24.0</td><td>16.8</td><td>15.2</td></tr>
- p.1｜<tr><td>52-Week Range</td><td>166.22/63.80</td></tr>

## Q3 · 他的**财年是谁的财年**？

- **公司财年，且明确十二月结账**：首页信息栏直接写 `FYE Dec`；估计表列头用 `F25A / F26E / F27E` 的 F 前缀标财年。故 CRWV 与 META 两家都可直接与日历年末共识对比，不需换口径。
- 时间锚点：收盘日 30 Jun 2026（二季末），发布日 01 Jul 2026 14:57 UTC；评级按 12 个月相对表现定义。
- 口径提醒：`F26E` 是"财年 2026"，不是"未来十二个月（NTM）"，本件没有 NTM 口径的数，跨报告比较时别混用。

### 依据

- p.1｜<tr><td>FYE</td><td>Dec</td></tr>
- p.1｜<tr><td>Close Date</td><td>30 Jun 2026</td></tr>
- p.1｜<tr><td>Adjusted EPS</td><td>F25A</td><td>F26E</td><td>F27E</td></tr>
- p.7｜Bernstein brand stock ratings are based on a 12-month time horizon.

## Q4 · **预测修正**：改了哪一项、从多少改到多少？改的是**假设**还是**结论**？

- **本件无预测修正**。它是 `QUICK TAKE` 体例的新闻点评，全文没有 `old/new`、`prior/current`、`raise/lower` 的估计修正句，也没有上一版目标价可对；CRWV 的 U/\$67 与 META 的 O/\$850 都是重申，不是新设。
- 可确认这不是首次覆盖：正文自己引了既有的首次覆盖报告（"see our initiation: Hyperscalers are Situationships, Not Spouses"），所以"首次覆盖、无上一版"的豁免口径不适用——它有过上一版，只是本件没登上一版的数。
- 分层判定：**假设没变、结论也没变**。改的是"事件解读"——Meta 发展对外云业务的可能性上升被写进叙事，但没有落到 CRWV 的 \$67 或 META 的 \$850 上。
- 若主控要 CRWV 的估计修订史，须回取该团队首次覆盖件，本件给不了。

### 依据

- p.1｜QUICK TAKE 1 July 2026 BERNSTEIN SOCIETE GENERALE GROUP
- p.1｜We have consistently said that it’s only a matter of time before hyperscalers compete headon with CRWV (see our initiation: Hyperscalers are Situationships, Not Spouses).
- p.1｜<tr><td>Upside/(Downside)</td><td>(33)%</td></tr>
- p.5｜We rate Meta Outperform.

## Q5 · 他给了**情景**吗？各自驱动假设是什么？

- **单情景**。全文没有 Bull/Base/Bear，也没有三档目标价：CRWV 只有一个 \$67（U，对应 −33%），META 只有一个 \$850（O，对应 +51%）。
- 未设三档，仅列风险方向。对 CRWV 因为评级是 U，风险全写在**上行侧**：超大厂自建产能延迟上线、CRWV 自研软件平台留住需求、电力短缺维持其定价权。
- 对 META 风险写在**下行侧**：监管调查、数字广告成熟与隐私变更、元宇宙拖累利润率与 ROIC。
- 因此"目标价差三成是杠杆在倍数还是经营"无从检验：CRWV 只有一个 28.4x 的 EV/Adj. EBIT 单点，没有第二、第三档倍数。
- 真正的情景味道在正文第三点：Meta 若入场，服务形态可能是"仅自有模型 API"、"多模型托管（类 Bedrock/Vertex）"或"裸金属出租"三种，各自的单位经济完全不同——但这是**业务形态的三种可能**，不是估值的三档情景，报告没有把它量化到 CRWV 的每股价值。

### 依据

- p.1｜CoreWeave, Inc. Rating Underperform Price Target CRWV 67.00 USD
- p.5｜We rate Meta Outperform.
- p.2｜The nature of the service could take various forms with very different implications.
- p.1｜<tr><td>Price Target (USD)</td><td>67.00</td></tr>

## Q6 · 他用了哪几种**估值方法**？**能互相印证吗**？

两家分开看，方法都写明了：

- **CRWV：单一方法**——前瞻 EV/调整后 EBIT 倍数。\$67 = 28.4x × 2027E 调整后 EBIT/股 \$5.81。一个倍数、一个基数，可复算。
- **META：两法各半**——2027E EV/Sales 7x 与 DCF（WACC 10%、永续增长率 3.5%）按 50/50 组合得 \$850。三个关键输入都给了。
- 能否互证：**不能真正互证**。两法被写成"50/50 combination"一个数，没有分别给出 EV/Sales 法与 DCF 法各自的估值结果；被乘的 2027E 销售额、被折现的现金流序列都没登，所以只能确认两法被加权到同一个数，不能确认两法独立收敛。
- 另一处不一致值得记：同一份报告里 CRWV 用 EV/EBIT、META 用 EV/Sales + DCF，两家之间无交叉对照，也没有相对估值的横向比较表。

### 依据

- p.6｜We value CRWV on a forward EV/Adjusted EBIT multiple. Our \$67 price target is based on an Enterprise Value calculated as 28.4x our 2027E Adj. EBIT per share of \$5.81.
- p.6｜We value Meta on a Price Target of \$850 using a 50/50 combination of 2027e EV/Sales multiple of 7x, and a DCF using a WACC of 10% and a terminal growth of 3.5%.
- p.6｜We consider Meta primarily a digital advertising business and benchmark valuation to comparable peers in this industry set.
- p.1｜<tr><td>Valuation Metrics</td><td>F25A</td><td>F26E</td><td>F27E</td></tr>

## Q7 · 目标价的**依据 / 估值方法解释 / 风险列示**齐不齐？

两家都齐，方法可复算到公式级：

1. **方法**：有，且分标的写清。CRWV = 前瞻 EV/Adj. EBIT 倍数；META = 2027E EV/Sales 7x 与 DCF（WACC 10%、g 3.5%）各半。
2. **关键输入**：有。CRWV 给到 28.4x 与每股基数 \$5.81；META 给到 7x、WACC 10%、永续增长率 3.5%，并说明以数字广告同业为基准。缺口只在 META 的被乘数（2027E 销售额）与现金流序列未登，属复算层面不足，不属三件缺件。
3. **风险列示**：有，且是具体条目。CRWV 三条上行风险（超大厂产能延迟、自研软件平台、电力短缺支撑定价权）；META 三条下行风险（多地监管调查聚焦青少年保护与反垄断、数字广告成熟与隐私变更、元宇宙拖累利润率与 ROIC）。

判定：**三件齐，不属形式不合规**。相对同批多标的合并件，这份的方法段是少见的完整。

### 依据

- p.6｜We value CRWV on a forward EV/Adjusted EBIT multiple. Our \$67 price target is based on an Enterprise Value calculated as 28.4x our 2027E Adj. EBIT per share of \$5.81.
- p.6｜We value Meta on a Price Target of \$850 using a 50/50 combination of 2027e EV/Sales multiple of 7x, and a DCF using a WACC of 10% and a terminal growth of 3.5%.
- p.6｜The main upside risks to our price target/Underperform rating on CRWV are 1) Delays in hyperscaler built capacity coming online may maintain CRWV value proposition, 2) Development of CRWV’s specialized software platform which maintains demand for CRWV operated data centers, and 3) Continued shortage in power supply to power data centers may sustain CRWV’s pricing power
- p.6｜Meta is currently under investigation in multiple regulatory proceedings now mostly focused on teen-protection and anti-trust domestically and abroad.
- p.6｜Signs that we’re reaching maturity in digital ads, increased competition as alternatives emerge with compelling ad ROIs, or further privacy related changes (e.g., Cookie depreciation) could all put press on Meta's revenue outlook resulting in compressing revenue growth and de-rating.
- p.6｜Meta's metaverse aspirations could lead to margin headwinds and potentially minimal ROIC, which could negatively affect both estimates and multiples.

## Q8 · **评级分布三件**（三档占比 · 投行关系占比 · 观测时点）齐不齐？

三件齐，全部取自披露附录的机构级分布表：

| 评级档（MAR/FINRA 对应） | 全球评级占比 | 过去 12 个月有投行关系占比 |
|---|---|---|
| Outperform（BUY） | 51.2% | 15.3% |
| Market-Perform / Neutral（HOLD） | 35.8% | 16.2% |
| Underperform（SELL） | 13.1% | 13.6% |

- **观测时点**：`As of June 30, 2026. All figures are updated quarterly.` 表下明写，并注明更新频率。发布日 7 月 1 日，距季末仅 1 天（<15 天），按惯例可用上上个季末，但本件用的是**当季末 6/30**，更及时，不违规，记清即可。
- 投行关系口径在星号脚注里定义：该档内"过去 12 个月由关联方提供过投行服务"的公司占比。
- 三档合计 100.1%（51.2+35.8+13.1），为四舍五入所致，原文未给合计数。

### 依据

- p.8｜<tr><td rowspan=1 colspan=1>Outperform</td><td rowspan=1 colspan=1>BUY</td><td rowspan=1 colspan=1>51.2%</td><td rowspan=1 colspan=1>15.3%</td></tr>
- p.8｜<tr><td rowspan=1 colspan=1>Market-Perform (Bernstein Brand) Neutral (Autonomous Brand)</td><td rowspan=1 colspan=1>HOLD</td><td rowspan=1 colspan=1>35.8%</td><td rowspan=1 colspan=1>16.2%</td></tr>
- p.8｜<tr><td rowspan=1 colspan=1>Underperform</td><td rowspan=1 colspan=1>SELL</td><td rowspan=1 colspan=1>13.1%</td><td rowspan=1 colspan=1>13.6%</td></tr>
- p.8｜As of June 30, 2026. All figures are updated quarterly.
- p.8｜* These figures represent the percentage of companies within each equity rating category for which affiliates of Bernstein have provided investment banking services within the previous 12 months.

## Q9 · **评级 / 目标价历史走势图**在不在（含赋改日期）？

- **声明有图、文本层无数据，判未见**。披露附录只有一句标题"PRICE CHARTS / RATINGS AND PRICE TARGET HISTORY"，加一句品牌沿革说明（2024 年 4 月 1 日之前由 Sanford C. Bernstein & Co., LLC 出具图内评级与目标价，名单仅列 Meta Platforms Inc.），图本身及其数值序列在本件文本层不存在。
- 因此"覆盖期间起止 + 变动条数 + 最近一次（日期/评级/PT）"三项全部取不到。
- 可确认两点：一是该标的覆盖史早于 2024-04-01，按规则**满一年本应附图**，属缺失而非豁免；二是 CRWV 不在那句名单里——本件两家里只有 META 被点名有历史图。
- 引用提示：若需要 META 的 PT 变动史，本件给不了，须另取历史件。

### 依据

- p.8｜PRICE CHARTS / RATINGS AND PRICE TARGET HISTORY
- p.8｜Prior to April 1, 2024, Sanford C. Bernstein & Co., LLC. issued the ratings and price target information in the graph(s) below for the following companies: Meta Platforms Inc..

## Q10 · **九项冲突披露**在不在**首页**（或指明页码）？

首页以样板句指向披露附录（"See the Disclosure Appendix of this report for required disclosures, analyst certifications and other important information"）。本件披露段极短，九项里**五项有、一项部分、三项未见**；多为逐票列名型，须对两家标的分别判"名单含不含"。逐项核对：

| 项 | 有/无（对本文标的） | 位置与内容 |
|---|---|---|
| ① 分析师及家庭持仓 | 有（含 META） | 附录明写"一名参与本报告撰写的关联人持有 Meta Platforms Inc. 的股权或债务证券"，只给主体与证券类别，未给比例与日期；CRWV 未见同类句 |
| ② 报酬是否挂钩投行收入 | 有（明确否定） | 报酬按 account penetration / productivity / proactivity 计，并直写"No analysts are compensated based on performance in, or contributions to, generating investment banking revenues"；认证段另称报酬与具体推荐无关 |
| ③ 近 12 个月主/副承销或收投行报酬 | 有（名单只含 CRWV，不含 META） | 两句都只点名 CoreWeave, Inc.：一句"received compensation for investment banking services in the past twelve months"，一句"managed or co-managed in the past twelve months a public offering"。**名单不含 META** |
| ④ 未来 3 个月是否寻求投行费 | 有（名单只含 CRWV，不含 META） | "expect to receive or intend to seek compensation for investment banking services in the next three months"名单仅 CoreWeave, Inc. |
| ⑤ 近 12 个月非投行服务报酬 | 有（名单只含 CRWV，不含 META） | 两句（主体分别为 Bernstein 与 an affiliate of Bernstein）均只列 CoreWeave, Inc.，**不含 META** |
| ⑥ 是否客户及服务类型 | 有（投行客户关系只含 CRWV，不含 META） | "had an investment banking client relationship during the past twelve months"仅列 CoreWeave, Inc.；对 META 只披露做市与持仓，未披露客户关系及服务类型 |
| ⑦ 实益持有该类普通股 ≥1% | 未见 | 全篇没有"beneficially own 1% or more"这类句子（该句在另一批 Bernstein 长报告的附录里才有，本件未收）。唯一相近的是 MiFID 口径那句：Bernstein Autonomous LLP 或 BSG France SA 就 Meta Platforms Inc. 等 MiFID 适格证券"有 0.5% 或以上的净多头或净空头头寸"。标的虽对得上，但门槛是 0.5%、口径是净多/净空而非"母公司实益持有 1% 普通股"，故判未见 |
| ⑧ 是否做市 | 有（名单含 META） | 两句分别就**股票**与**债务证券**披露做市/流动性提供，两处名单都只有 Meta Platforms Inc.；CRWV 未在名单内 |
| ⑨ 分析师过去 12 个月是否从标的收酬 | 有（否定式确认） | 认证段逐字写"no part of that analyst's compensation was, is, or will be, directly or indirectly, related to the specific recommendations or views in this publication" |
| ⑩ 其他重大冲突 | 有（不涉两家标的的经营冲突） | 另披露：署名分析师 Stacy A. Rasgon 持多种加密货币多头（与本件两家标的不直接相关）；以及 Gartner 数据引用未经其审阅的声明。两处均不构成对 META/CRWV 的额外利益输送，但①的持股与⑧的做市已覆盖本文标的 |

**红旗提示**：本机构对本文标的 META 同时是**股票与债务双市场做市商**、按 MiFID 口径持有 **≥0.5% 净多/净空头寸**、且**撰写关联人本人持有 META 证券**；对另一标的 CRWV 则在近 12 个月**收过投行费、做过承销、未来 3 个月仍要收**。一张表里给出 META 买入、CRWV 卖出的相反结论，两边的利益方向也正好相反，引用时两边立场都要折价。

### 依据

- p.1｜See the Disclosure Appendix of this report for required disclosures, analyst certifications and other important information.
- p.6｜An associate contributing to this report has a financial interest in the equity or debt securities of Meta Platforms Inc..
- p.11｜Analysts are compensated based on aggregate contributions to the research franchise as measured by account penetration, productivity and proactivity of investment ideas. No analysts are compensated based on performance in, or contributions to, generating investment banking revenues.
- p.9｜Bernstein and/or affiliates have received compensation for investment banking services in the past twelve months from CoreWeave, Inc..
- p.9｜Bernstein and/or affiliates expect to receive or intend to seek compensation for investment banking services in the next three months from CoreWeave, Inc..
- p.9｜Bernstein Autonomous LLP or BSG France SA, beneficially, has either a net long or short position of 0.5% or more of the total issued share capital of a class of common equity securities of the following MiFID eligible securities: Meta Platforms Inc..
- p.10｜Bernstein and/or affiliates had an investment banking client relationship during the past twelve months with CoreWeave, Inc..
- p.10｜Affiliates of Bernstein managed or co-managed in the past twelve months a public offering of securities of CoreWeave, Inc..
- p.10｜Certain affiliates of Bernstein act as market maker or liquidity provider in the equities securities of: Meta Platforms Inc..
- p.10｜Certain affiliates of Bernstein act as market maker or liquidity provider in the debt securities of: Meta Platforms Inc..
- p.10｜Each research analyst listed in this report, who is primarily responsible for the preparation of the content of this report, certifies that all of the views expressed in this publication accurately reflect that analyst's personal views about any and all of the subject securities or issuers and that no part of that analyst's compensation was, is, or will be, directly or indirectly, related to the specific recommendations or views in this publication.

## Q11 · 他的**风险章**挂了数字吗？

- **没挂数字**。风险段按标的分两组，共 6 条：CRWV 三条上行风险、META 三条下行风险，**全部是方向句**，无一条附百分点、金额或时间量化；也没有 WACC ±1%、永续增长率 ±0.5%、目标倍数 ±1x 对 PT 的敏感度表。
- 唯一带量的是评级与空间的对应：CRWV 的 U 对应 −33%（原文口径）；META 那一行的 (42.5)% 是历史相对表现，不是风险敏感度，别混用。
- 判定：属**样板风险**（条目具体但无量化）。若要写成"若〔变量〕变 X ⇒〔哪一年〕PT 变 Y%"，只有 CRWV 那条 28.4x × \$5.81 可自己反推倍数敏感性——28.4x 乘 \$5.81 得企业价值约 \$165/股，扣净债务后才落到 \$67，而净债务数未登，所以一步也算不出来。
- 补充：本篇有一处"风险—结论"挂钩来自正文判断而非风险章——Meta 若真做对外云，CRWV 的 \$35.2B 合同在续约时转为竞争，但报告明确说"we do not believe there is immediate risk to CRWV’s financials or debt"。

### 依据

- p.6｜The main upside risks to our price target/Underperform rating on CRWV are 1) Delays in hyperscaler built capacity coming online may maintain CRWV value proposition, 2) Development of CRWV’s specialized software platform which maintains demand for CRWV operated data centers, and 3) Continued shortage in power supply to power data centers may sustain CRWV’s pricing power
- p.6｜Meta is currently under investigation in multiple regulatory proceedings now mostly focused on teen-protection and anti-trust domestically and abroad.
- p.6｜Meta's metaverse aspirations could lead to margin headwinds and potentially minimal ROIC, which could negatively affect both estimates and multiples.
- p.1｜We understand that the existing CRWV contracts are tight and difficult to churn out of, so we do not believe there is immediate risk to CRWV’s financials or debt
- p.5｜<tr><td>CRWV (CoreWeave)</td><td>U</td><td>USD</td><td>99.54</td><td>67.00</td><td>(57.0)%</td><td>USD</td><td>(1.20)</td><td>(4.20)</td><td>(2.41)</td><td></td><td>35.8</td><td>14.0</td><td>7.4</td></tr>

## Q12 · 这份报告落在**静默期窗口**内吗？

- **否**（就本文标的 META 而言）。发布日 First Published 01 Jul 2026 14:57 UTC、Completion 同日同刻；对 META 全文没有任何发行/承销/时间线记录，无发行日可与发布日相减，故不落窗。
- 对另一标的 CRWV 存在需留意的记录：附录写明"Affiliates of Bernstein managed or co-managed in the past twelve months a public offering of securities of CoreWeave, Inc."，但**只给 12 个月窗口、不给具体发行日**，无法判断是否落在"二次发行后 3 天内"；按可核事实只能记"发行日未披露，无法判窗"。
- 判据是发布日 vs 发行日的比对，不是"有没有静默期声明"：本件属事件点评，无发行日，故不落窗；CRWV 那条属"待核"而非"确认落窗"。

### 依据

- p.1｜First Published: 01 Jul 2026 14:57 UTC  Completion Date: 01 Jul 2026 14:57 UTC
- p.10｜Affiliates of Bernstein managed or co-managed in the past twelve months a public offering of securities of CoreWeave, Inc..
- p.1｜QUICK TAKE 1 July 2026 BERNSTEIN SOCIETE GENERALE GROUP
