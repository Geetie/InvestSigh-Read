---
id: 03-broker-research-2026-04-14-5CoreWeaveCRWVThecapacityl
cat: "03"
sub: broker-research
template: broker-research
template_version: 2
date: 2026-04-14
time: "00:00"
title: "03-broker-research-2026-04-14-5CoreWeaveCRWVThecapacityl"
kind: "broker-research"
issuer: ""
ticker: META
source_pages: 22
---

> 骨架已生成，答案待填。原文：`corpus/materials/mineru/03-broker-research-2026-04-14-5CoreWeaveCRWVThecapacityl/full.md`（22 页）。
> 填写纪律见 `docs/EVIDENCE-SPEC.md`：有答案必有依据块，块须逐字，页码 `p.N` 以源 PDF 为准。

## Q1 · 他的**关键假设取值**各是多少？

本件是 Bernstein 的行业＋个股更新，正文没有损益估计表，只有首页末的 ticker 表（13 Apr 2026 收盘、Adjusted EPS 三列、Adjusted P/E 三列）。六项里可确认的只有调整后 EPS 的方向：CRWV 仍为亏损，2026E 亏损扩大（旧口径 -4.58 → 新口径 -4.83），2027E 亏损同样扩大（-4.22 → -4.80）；ticker 表的 EPS 与 P/E 两处数值互相复算不上（110.27 除以 35.2x／12.7x／7.4x 得 3.13／8.68／14.90，与 -2.42／-4.83／-4.80 均不匹配），故只取 EPS 行、不取 P/E 行。

**收入增速、毛利率、营业利润率、资本开支、实际税率、摊薄股数六项，表内均未给出行**；资本开支只有方向（作者称把资本开支上调、利润率改善放慢）。可写的经营假设是这条链：

- **数据中心供给**：当前全球约 100GW，作者预期 2028 年（极端看多则 2029 年）供给转松；
- **新增签约**：预计 2027 年底前再签约 450 亿美元；
- **相对共识**：2026 年大致持平，2027 年开始分化，2028 年收入约低于共识 15%；
- **估值输入**：EV/Adj. EBIT 28.4x × 2027E 每股 Adj. EBIT 5.81 美元（按原文口径算不出 67 美元的目标价，见 Q6）。

### 依据

- p.2｜<td>CRWV (CoreWeave)</td><td>U</td><td>USD</td><td>110.27</td><td>67.00</td><td>123.7%</td><td>USD</td><td>(2.42)</td><td>(4.83)</td><td></td><td>(4.80)</td><td>35.2</td><td>12.7</td><td>7.4</td>
- p.2｜<td>OLD</td><td></td><td></td><td></td><td>56.00</td><td></td><td></td><td></td><td></td><td>(4.58)</td><td>(4.22)</td><td></td><td></td><td></td>
- p.1｜We are forecasting an easing of data center capacity in 2028 - maybe 2029 if you’re extremely bullish on AI demand.
- p.2｜and anticipate them signing an incremental \$45B of deals between now and the end of 2027.
- p.2｜We are roughly in line with consensus for 2026 expectations. By 2027, we begin to diverge, and by 2028, we are \~15% below consensus revenue estimates, accelerating through the forecast window.
- p.2｜We have accordingly slowed margin improvement and increased capex.

## Q2 · **他和我差在哪一项、哪一年**？差多少？

我方模型数值不在本份材料内，逐行「他 vs 我」的对照需跨批（交主控）。本材料内可核的是「他 vs 共识」，作者自己给了三档年份的相对关系：

| 财年 | 他与共识的关系 | 驱动器 |
|---|---|---|
| 2026E | 大致持平 | 现有合约＋新签 Meta 增量 |
| 2027E | 开始分化，方向未给数 | 数据中心供给转松、签约节奏 |
| 2028E | 收入约低于共识 15% | 供需反转、超大规模厂商自建替代 |

差异集中在**收入端**而不是利润率端：作者的看空点是长期收入显著低于卖方一致预期，并把利润率改善放慢、资本开支上调作为配套假设。材料没有逐项共识数值（无 FirstCall／Visible Alpha 明细），只有相对表述，无法给到「差多少美元」。

### 依据

- p.2｜Our case hinges on our longer-term revenue expectations for CRWV, which are significantly lower than street expectations.
- p.2｜We are roughly in line with consensus for 2026 expectations. By 2027, we begin to diverge, and by 2028, we are \~15% below consensus revenue estimates, accelerating through the forecast window.
- p.2｜We have accordingly slowed margin improvement and increased capex.

## Q3 · 他的**财年是谁的财年**？

公司财年，标的是 CRWV（CoreWeave）。但材料**没有标财年月末**：ticker 表列头只写 `Cur 2025A / 2026E / 2027E` 与 `Adjusted P/E 2025A / 2026E / 2027E`，正文只提 2026、2027、2028 三个年份，没有 `FYE Dec`、`Dec-26E` 一类标记。按纪律以**日历年处理并注明推定**，不得当作已确认。

旁证方向一致：报告日 2026-04-14、股价取 2026-04-13 收盘，讨论的是「2026 年预期」，与日历年口径不冲突；但没有月末标记，若要和 META（12 月结账）的财年直接对齐，仍属推定对齐，需回原始模型确认。

### 依据

- p.2｜BERNSTEIN TICKER TABLE
- p.2｜<td colspan="4">13 Apr 2026</td><td>TTM</td><td></td><td colspan="4"> Adjusted EPS</td><td colspan="4"> Adjusted P/E (x)</td>
- p.2｜<td>Ticker</td><td>Rating</td><td>Cur</td><td>Price</td><td>Target</td><td>Perf.</td><td></td><td>Cur 2025A</td><td>2026E</td><td>2027E</td><td></td><td>2025A</td><td>2026E</td><td>2027E</td>

## Q4 · **预测修正**：改了哪一项、从多少改到多少？改的是**假设**还是**结论**？

两样都改了：假设（利润率与资本开支）变了，结论（目标价）也变了，评级不变。

- **目标价**：56.00 → 67.00 美元，+11 美元，按 (67−56)/56 复算为 +19.6%（原文只说上调 11 美元，未给百分比）；
- **2026E 调整后 EPS**：-4.58 → -4.83 美元，亏损扩大 0.25 美元（按 (新−旧)/|旧| 为 -5.5%）；
- **2027E 调整后 EPS**：-4.22 → -4.80 美元，亏损扩大 0.58 美元（-13.7%）；
- **配套假设**：利润率改善放慢、资本开支上调，并把最近的优先票据发行纳入模型；
- **触发事件**：Meta 增量 210 亿美元合约（超预期）＋Anthropic 合约（金额未披露）。

判定：假设变了（margin／capex 双双调整），所以重要；结论也变了（PT 上调 19.6%），但评级维持 Underperform，属「看空不变、路径改善」。

### 依据

- p.1｜We maintain our Under-Perform, but raise our target price to \$67 on the new signings.
- p.2｜Since our last model refresh, we have increased our Price Target by \$11, reflecting a Meta deal that exceeded expectations and the promise of Anthropic revenue (numbers not disclosed). We have accordingly slowed margin improvement and increased capex. Finally, we have taken CRWV’s recent senior notes offering into account.
- p.2｜<td>OLD</td><td></td><td></td><td></td><td>56.00</td><td></td><td></td><td></td><td></td><td>(4.58)</td><td>(4.22)</td><td></td><td></td><td></td>
- p.2｜<td>CRWV (CoreWeave)</td><td>U</td><td>USD</td><td>110.27</td><td>67.00</td><td>123.7%</td><td>USD</td><td>(2.42)</td><td>(4.83)</td><td></td><td>(4.80)</td><td>35.2</td><td>12.7</td><td>7.4</td>

## Q5 · 他给了**情景**吗？各自驱动假设是什么？

单情景。只有一个目标价 67 美元与一个评级 Underperform，没有 Bull/Base/Bear 三档，也没有三档 PT。

作者给的是「时间路径」而不是情景树：近期仍会有签单驱动的股价脉冲，长期则因供给转松而看空；触发条件是 2028 年（乐观 2029 年）数据中心供给转松、超大规模厂商以自建或整栋租赁替代 neocloud。差别全部落在**收入假设与合约时长**上，不在利润率假设上（利润率只是被「放慢改善」）。

### 依据

- p.1｜All of this underpins our call on CRWV (UP, \$67), and our long-term bearishness on the neocloud sector, though we anticipate continuing to see stock pops on news updates for many months to come.
- p.1｜We are forecasting an easing of data center capacity in 2028 - maybe 2029 if you’re extremely bullish on AI demand.
- p.2｜We are Underperform on CRWV with a revised price target of \$67.
- p.1｜It’s far easier to churn out of a neocloud relationship than a data center - the contracts are shorter and you don’t have to move any hardware.

## Q6 · 他用了哪几种**估值方法**？**能互相印证吗**？

只给一种方法：EV/Adj. EBIT 倍数法。原文是以 28.4x 的 EV/Adj. EBIT 乘 2027E 每股 Adj. EBIT 5.81 美元得到目标价。

**不能复算**：28.4 × 5.81 = 165.0 美元，与 67 美元的目标价差 2.5 倍；反推 67 ÷ 5.81 ≈ 11.5x。同一页脚注又写 CRWV 的估值口径是 EV/EBITDA（x），与正文的 EV/Adj. EBIT 自相矛盾。故只能确认「单方法＋一个倍数＋一个每股指标」，倍数口径（EBIT 还是 EBITDA）与倍数水平（28.4x 还是隐含 11.5x）都无法与目标价对齐，谈不上互相印证。

### 依据

- p.2｜We value the company using an EV/Adj. EBIT multiple (28.4x) on 2027 E Adj. EBIT per share of \$5.81.
- p.2｜GOOGL, META, AMZN estimate is Reported EPS; CRWV valuation is EV/EBITDA (x); GOOGL, META, AMZN valuation is Reported P/E (x);
- p.2｜We are Underperform on CRWV with a revised price target of \$67.

## Q7 · 目标价的**依据 / 估值方法解释 / 风险列示**齐不齐？

两件有、一件缺，缺的那件属形式不合规，需上报：

1. **目标价依据**：有——正文给了公式式表述（28.4x × 2027E 每股 Adj. EBIT 5.81 美元），但如 Q6 所述复算不出 67 美元，可复算性不成立；
2. **方法关键输入**：部分有——倍数与每股指标都给了，缺的是口径（EBIT／EBITDA 打架）与为何取 28.4x 的理由；
3. **风险列示**：缺——披露附录的 RISKS 一节只写「本报告覆盖六家以上公司，风险与其他公司披露请访问 bernstein-autonomous.bluematrix.com」，正文与附录都没有针对 CRWV 的风险条目。

即 2241(c)(1) 第三件被整段外推进网站，属**未见依据（形式要件缺失）**，须上报。

### 依据

- p.14｜RISKS
- p.14｜This research publication covers six or more companies. For risks and other company disclosures:
- p.14｜This research publication covers six or more companies. For valuation methodology and other company disclosures:
- p.2｜We value the company using an EV/Adj. EBIT multiple (28.4x) on 2027 E Adj. EBIT per share of \$5.81.

## Q8 · **评级分布三件**（三档占比 · 投行关系占比 · 观测时点）齐不齐？

两件齐、一件缺（缺观测时点）：

| 评级 | FINRA 对应档 | 全球评级分布 | 投行关系占比 |
|---|---|---|---|
| Outperform | BUY | 51.1% | 16.5% |
| Market-Perform / Neutral | HOLD | 36.3% | 17.8% |
| Underperform | SELL | 12.6% | 14.9% |

- **三档占比**：OP 51.1%／MP 36.3%／UP 12.6%，覆盖 Bernstein 与 Autonomous 两品牌合并口径。
- **投行关系占比**：16.5%／17.8%／14.9%，表头写作 Investment Banking Relationships（带星号），星号脚注在本页文本层未见定义。
- **观测时点**：**缺失**——表头只有 Global Rating Distribution，表内外均无 as of 日期，也没有「截至最近季末」字样；查了披露附录的评级定义段与分布表前后文，均未标注统计基准日，无法判断用的是哪一季。

### 依据

- p.16｜<td rowspan=1 colspan=1>Equity Rating</td><td rowspan=1 colspan=1>Market AbuseRegulation (MAR) and FINRA Rating Category</td><td rowspan=1 colspan=1>Global RatingDistribution</td><td rowspan=1 colspan=1>Investment BankingRelationships*</td>
- p.16｜<tr><td rowspan=1 colspan=1>Outperform</td><td rowspan=1 colspan=1>BUY</td><td rowspan=1 colspan=1>51.1%</td><td rowspan=1 colspan=1>16.5%</td></tr>
- p.16｜<tr><td rowspan=1 colspan=1> Market-Perform (Bernstein Brand) Neutral (Autonomous Brand)</td><td rowspan=1 colspan=1>HOLD</td><td rowspan=1 colspan=1>36.3%</td><td rowspan=1 colspan=1>17.8%</td></tr>
- p.16｜<tr><td rowspan=1 colspan=1>Underperform</td><td rowspan=1 colspan=1>SELL</td><td rowspan=1 colspan=1>12.6%</td><td rowspan=1 colspan=1>14.9%</td></tr>

## Q9 · **评级 / 目标价历史走势图**在不在（含赋改日期）？

未见。披露附录只有一句声明：PRICE CHARTS/ RATINGS AND PRICE TARGET HISTORY 一节称本报告覆盖六家以上公司，价格图与其他公司披露请访问 bernstein-autonomous.bluematrix.com——声明有图、文本层无数据，按纪律判未见：没有覆盖起止日期、没有变动条数、也没有最近一次评级／目标价变动日期。

材料内唯一可得的变动是本次：PT 56 → 67 美元（ticker 表 OLD 行），评级维持 U；作者没写变动日期，只能以报告日 2026-04-14 作推定。另有说明 2024-04-01 之前 Alphabet、Meta、Amazon、Microsoft、Oracle 的评级与目标价由 Sanford C. Bernstein & Co. 发布，与本标的无关。

### 依据

- p.16｜PRICE CHARTS/ RATINGS AND PRICE TARGET HISTORY
- p.16｜This research publication covers six or more companies. For price chart and other company disclosures, please visit https:// bernstein-autonomous.bluematrix.com/sellside/Disclosures.action or you can write to the Director of Compliance, Bernstein Institutional Services LLC, 245 Park Avenue, New York, NY 10167.
- p.2｜<td>OLD</td><td></td><td></td><td></td><td>56.00</td><td></td><td></td><td></td><td></td><td>(4.58)</td><td>(4.22)</td><td></td><td></td><td></td>

## Q10 · **九项冲突披露**在不在**首页**（或指明页码）？

首页只写「本报告所需的披露、分析师认证与其他重要信息见披露附录」，逐项内容在文末 Disclosure Appendix。逐项核对（标的 CRWV）：

| 项 | 有/无 | 位置与内容 |
|---|---|---|
| ① 分析师及家庭持仓 | 未见（有相近声明） | 参与本报告的 associate 声明持有 Alphabet、Meta、Amazon 的证券，Shelly Tang 声明持有 Microsoft 证券；主体均为 associate／具名分析师，标的均为他司，无一句涉及 CRWV，故不算本项确认。 |
| ② 报酬是否挂钩投行收入 | 有（明确否） | 认证段称分析师报酬与具体推荐无关；另一段明确「No analysts are compensated based on performance in, or contributions to, generating investment banking revenues」。 |
| ③ 近 12 个月主/副承销或收取投行报酬 | 有 | 过去 12 个月收取投行服务报酬的名单含 CoreWeave, Inc.；另有「过去 12 个月主承销或副承销公开增发」的名单亦含 CoreWeave。 |
| ④ 未来 3 个月是否寻求投行费 | 有 | 「expect to receive or intend to seek compensation for investment banking services in the next three months from CoreWeave, Inc.」——本标的在列。 |
| ⑤ 近 12 个月非投行服务报酬 | 有 | 过去 12 个月收取非投行、证券相关产品或服务报酬的名单含 CoreWeave, Inc.；另有按 affiliate／Bernstein 主体分列的两段同类名单。 |
| ⑥ 是否客户及服务类型 | 有 | 「had an investment banking client relationship during the past twelve months with CoreWeave, Inc.」——服务类型为投行客户关系，且与非投行证券相关服务客户身份并存。 |
| ⑦ 实益持有该类普通股 ≥1% | 未见 | 唯一相近句是 Bernstein Autonomous LLP／BSG France SA 就 MiFID 证券「net long or short position of 0.5% or more of the total issued share capital of a class of common equity securities」的清单，标的是 Digital Realty、Alphabet、Meta，不含 CRWV；门槛是 0.5% 且可为空头，与「母公司实益持有本标的普通股 ≥1%」主体、标的、门槛三项均不符。 |
| ⑧ 是否做市 | 有（不含本标的） | 股票档名单为 Alphabet、Meta、Amazon、Microsoft、Oracle；债券档另列 Equinix、Alphabet、Meta、Amazon、Oracle。两档均未见 CoreWeave。 |
| ⑨ 分析师过去 12 个月是否从标的收酬 | 未见 | 查了 CERTIFICATION 段与 ADDITIONAL GLOBAL CONFLICT DISCLOSURES 段：只有「报酬与具体推荐无关」与「分析师报酬不基于投行收入贡献」两句，讲的是报酬机制，未就「过去 12 个月是否从 CRWV 收酬」作任何确认，故判未见。 |
| ⑩ 其他重大冲突 | 有 | SG 及关联方担任 Alphabet 债券（EUR 3/6/9/13/19/39Y）的 Joint Bookrunner；分析师 Gautam Chhugani 持多种加密货币多头；本报告按 MAR 属独立分析师产品；2024-04-01 前评级由 Sanford C. Bernstein & Co. 发布。均不含 CRWV。 |

红旗提示：该机构近 12 个月从本标的收取投行报酬＋担任其公开增发的主/副承销＋未来 3 个月仍拟向本标的寻求投行费 ⇒ 其 Underperform 结论与自身投行利益方向相反，引用时不以「有利益所以看多」推定，但披露关系仍应折价看待。

### 依据

- p.1｜See the Disclosure Appendix of this report for required disclosures, analyst certifications and other important information.
- p.14｜An associate contributing to this report has a financial interest in the equity or debt securities of Meta Platforms Inc..
- p.17｜Shelly Tang has a financial interest in the equity or debt securities of Microsoft Corp (MSFT).
- p.18｜No analysts are compensated based on performance in, or contributions to, generating investment banking revenues.
- p.16｜Bernstein and/or affiliates have received compensation for investment banking services in the past twelve months from CoreWeave, Inc., Digital Realty Trust, Inc., Alphabet Inc, Amazon.Com Inc and Microsoft Corp.
- p.17｜Affiliates of Bernstein managed or co-managed in the past twelve months a public offering of securities of CoreWeave, Inc., Alphabet Inc and Amazon.Com Inc.
- p.17｜Bernstein and/or affiliates expect to receive or intend to seek compensation for investment banking services in the next three months from CoreWeave, Inc..
- p.16｜Bernstein and/or affiliates have received compensation for non-investment banking securities-related products or services in the previous twelve months from the following clients: CoreWeave, Inc., Equinix, Inc., Alphabet Inc, Amazon.Com Inc and Microsoft
- p.17｜Bernstein and/or affiliates had an investment banking client relationship during the past twelve months with CoreWeave, Inc., Digital Realty Trust, Inc., Alphabet Inc, Amazon.Com Inc and Microsoft Corp.
- p.16｜Bernstein Autonomous LLP or BSG France SA, beneficially, has either a net long or short position of 0.5% or more of the total issued share capital of a class of common equity securities of the following MiFID eligible securities: Digital Realty Trust, Inc., Alphabet Inc and Meta Platforms Inc..
- p.17｜Certain affiliates of Bernstein act as market maker or liquidity provider in the equities securities of: Alphabet Inc, Meta Platforms Inc., Amazon.Com Inc, Microsoft Corp and Oracle Corp.
- p.16｜SG and/or its affiliate.s is acting as Joint Bookrunner for Alphabet Inc's bond issue (EUR, 3, 6, 9, 13, 19, 39Y).

## Q11 · 他的**风险章**挂了数字吗？

没有风险章，也没有一条带数字的风险句。披露附录的 RISKS 一节整段外推——本报告覆盖六家以上公司，风险与其他公司披露请访问网站——正文里最接近风险的表述是对 CRWV 软件护城河的质疑，属定性判断。

因此无法写成「若〔变量〕变 X ⇒ 某年 EPS 或 PT 变 Y%」：全件没有 WACC／永续增长率／目标倍数 ±1x 对 PT 的敏感度表，也没有 EPS 弹性表 ⇒ 属**样板风险（不是缺口）**，量化条目 0 条、方向句 1 条。

### 依据

- p.14｜This research publication covers six or more companies. For risks and other company disclosures:
- p.14｜Please visit: https://bernstein-autonomous.bluematrix.com/sellside/Disclosures.action.
- p.2｜We disagree with CRWV’s premise that its existing software moat will hold up to hyperscaler attacks, especially given hyperscalers’ scale and ability to spend.

## Q12 · 这份报告落在**静默期窗口**内吗？

否。发布日 2026-04-14（First Published 与 Completion Date 同为 14 Apr 2026 06:43 UTC）。披露确实提到承销角色：Bernstein 关联方在过去 12 个月担任 CoreWeave 公开增发的主承销或副承销——但材料**未给该次发行的具体日期**，无法做「发行日＋3 天／10 天」的精确比对。

从可得信息判断不落窗：本件是常规观点更新（因 Meta、Anthropic 两笔新约而调整 PT），不是发行相关文件；披露的承销发生在「过去 12 个月」区间内、早于发布日，同期披露的是「未来 3 个月拟寻求投行费」而非在执行的发行。故判不在静默期窗口内，唯发行日缺失这一点需主控注意。

### 依据

- p.1｜First Published: 14 Apr 2026 06:43 UTC  Completion Date: 14 Apr 2026 06:43 UTC
- p.17｜Affiliates of Bernstein managed or co-managed in the past twelve months a public offering of securities of CoreWeave, Inc., Alphabet Inc and Amazon.Com Inc.
- p.17｜Bernstein and/or affiliates expect to receive or intend to seek compensation for investment banking services in the next three months from CoreWeave, Inc..
