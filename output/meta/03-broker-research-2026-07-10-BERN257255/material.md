---
id: 03-broker-research-2026-07-10-BERN257255
cat: "03"
sub: broker-research
template: broker-research
template_version: 2
date: 2026-07-10
time: "00:00"
title: "03-broker-research-2026-07-10-BERN257255"
kind: "broker-research"
issuer: ""
ticker: META
source_pages: 47
---

> 骨架已生成，答案待填。原文：`corpus/materials/mineru/03-broker-research-2026-07-10-BERN257255/full.md`（47 页）。
> 填写纪律见 `docs/EVIDENCE-SPEC.md`：有答案必有依据块，块须逐字，页码 `p.N` 以源 PDF 为准。

## Q1 · 他的**关键假设取值**各是多少？

本件是 Bernstein 月度数据中心容量追踪（Jun '26），首页 ticker 表只列 Rating／Closing Price／Price Target／Adjusted EPS／Adjusted P/E 五组，六项假设里四项根本没有对应行。逐项：

- **收入增速**：表内未给该行——ticker 表无任何收入科目，只有 EPS 与 P/E 三列，按纪律不从 EPS 反推收入。
- **毛利率**：表内未给该行（全文无毛利/EBIT 行，只有 LGN、IREN、CIFR、WULF、CLSK、MARA、RIOT、CORZ 的估计口径是 EBITDA）。
- **营业利润率**：表内未给该行。
- **资本开支（仅行业口径）**：Top 5 hyperscalers 2026 年共识 capex 约 $727B（+76% Y/Y），2027 年共识 $916B（+26%）；公司级 capex 本件未给。
- **实际税率**：表内未给该行。
- **摊薄股数**：表内未给该行。
- **可用的 EPS 序列（附）**：META 2025A 23.49 → 2026E 33.54（+42.8%，自算）→ 2027E 37.04（+10.4%，自算）；注意注脚规定 META／AMZN／GOOGL 等为 Reported EPS，而表头写的是 Adjusted EPS，两者口径不一致，引用时须标"报道口径"。
- **本件真正在用的假设链（容量侧三口径）**：pipeline 338 GW（月度 +14 GW／+4%）、under construction 63.2 GW（+200 MW）、stranded 38 GW（占 pipeline 11%）、BTM 131 GW；单位经济用 company-disclosed $M per MW，并假定当前 pipeline 有 70% 是 AI 建设（ETN 口径）。TAM 由此换算：PWR $4.6T、VRT $1T、Schneider $902B、ETN $791B、ABB $676B、LGN $343B。

### 依据

- p.2｜<tr><td>Ticker</td><td>Rating</td><td>Cur</td><td>Closing Price</td><td>Price Target</td><td>Rel. Perf.</td><td>Cur</td><td>2025A</td><td>2026E</td><td>2027E</td><td>2025A</td><td>2026E</td><td>2027E</td></tr>
- p.2｜<tr><td>META(Meta)</td><td>O</td><td>USD</td><td>631.48</td><td>850.00</td><td>(34.0)%</td><td>USD</td><td>23.49</td><td>33.54</td><td>37.04</td><td>26.9</td><td>18.8</td><td>17.1</td></tr>
- p.3｜LGN, IREN, CIFR, WULF, CLSK, MARA, RIOT, CORZ estimate is EBITDA (M); AMZN, META, GOOGL, 2308.TT, 2360.TT, 2382.TT, 3037.TT, ENR.GR, DELL estimate is Reported EPS
- p.13｜EXHIBIT 15: Consensus is Anticipating ~$727B in Capex Spend From the Top 5 Hyperscalers in ‘26, Up 76% Y/Y. ‘27 Currently Expects 26% Growth to $916B
- p.1｜Project Pipeline. Over the last month, the data center project pipeline grew by 4%, up 14 GW to 338 GW.
- p.12｜<tr><td>Eaton</td><td>ETN</td><td>$1.9</td><td>$2.6</td><td>791</td></tr>
- p.12｜We Estimate 70% of the Current Pipeline Are AI Builds (Based on Recent ETN Commentary That 70% of Current Construction Being AI)

## Q2 · **他和我差在哪一项、哪一年**？差多少？

我方模型数值不在本份材料内，逐行"他 vs 我"的对照需跨批（交主控）。本件附的"共识"只有行业级 hyperscaler capex（2026 $727B、2027 $916B），没有公司级 EPS／目标价共识，故公司级改做"他本期 vs 他上期"对照：

| 变量 | 上期 | 本期 | 差额 |
|---|---|---|---|
| Pipeline 总量 | 324 GW（上月基数） | 338 GW | +14 GW／+4% |
| TTM 口径 pipeline 变化 | 225 GW | 217 GW | −8 GW／−4% |
| Under construction | 63.0 GW | 63.2 GW | +200 MW |
| Stranded capacity | 34 GW | 38 GW | +4 GW（占 pipeline 11%） |
| BTM pipeline | 129.4 GW（5 月仅 +14 GW） | 131 GW | +1.6 GW／+1% |
| 清库年数 | 10 年 | 12 年 | +2 年 |

差在哪一项：六处差异全部落在**供给侧容量**（在建、搁浅、BTM、清库速度），没有一处落在收入端或利润率端——本件不产出公司收入与利润估计，所以"哪一年"这一问只能答到月度口径（2026 年 6 月 vs 5 月）与 2026／2027 两个 capex 年，不能答到某个财年的 EPS。反向信号也值得记：TTM 口径 pipeline 净变化是负的（225→217 GW），说明月度 +4% 的增长是短周期回补而非趋势加速。我方该项未定 ⇒ 记缺口。

### 依据

- p.1｜Project Pipeline. Over the last month, the data center project pipeline grew by 4%, up 14 GW to 338 GW.
- p.1｜On a cumulative TTM basis, the change in pipeline is down (for only the second month this year) by 4% M/M from 225 GW to 217 GW.
- p.1｜Under Construction. Capacity marginally increased by 200 MW to 63.2 GW.
- p.1｜Stranded Capacity. The rise in local data center opposition/NIMBY continues driving stranded capacity higher, up 4 GW to 38 GW, representing 11% of total pipeline
- p.1｜Behind-the-meter slows vs. last month. The BTM pipeline grew by 1% or 1.6 GW M/ M to 131 GW after growing 14 GW in May.
- p.1｜As a result, at today’s build rate, it would take 12 years to clear the 338 GW pipeline, up from 10 years last month.
- p.13｜EXHIBIT 15: Consensus is Anticipating ~$727B in Capex Spend From the Top 5 Hyperscalers in ‘26, Up 76% Y/Y. ‘27 Currently Expects 26% Growth to $916B

## Q3 · 他的**财年是谁的财年**？

表列头为 2025A／2026E／2027E，只标年份不标月末，按日历年处理并注明"推定"，不得视为已确认。

两条必须带上的口径提示：一是注脚明确"NVDA, ORCL, DELL, SMCI base year is 2026"，即这四只的基年不是 2025，说明它们的财年与日历年不对齐，不能直接与日历年末共识比，须换口径；二是注脚另列"AMZN, META, GOOGL … estimate is Reported EPS"，说明这几只的 EPS 是报道口径而非 adjusted，跨公司比较 EPS 增速时须同口径。

结论：本件列头是**日历年（推定）**，且至少四只标的的财年与日历年不一致；本件不提供任何公司的 FYE 月份，故"公司财年 vs 日历年"的换口径无法在本件内完成。

### 依据

- p.2｜<tr><td>Ticker</td><td>Rating</td><td>Cur</td><td>Closing Price</td><td>Price Target</td><td>Rel. Perf.</td><td>Cur</td><td>2025A</td><td>2026E</td><td>2027E</td><td>2025A</td><td>2026E</td><td>2027E</td></tr>
- p.3｜NVDA, ORCL, DELL, SMCI base year is 2026
- p.3｜AMZN, META, GOOGL, 2308.TT, 2360.TT, 2382.TT, 3037.TT, ENR.GR, DELL estimate is Reported EPS
- p.1｜In this note, we update our monthly Data Center Capacity Tracker series, a comprehensive monitor of N. American data center capacity by stage of development, operator, and geography.

## Q4 · **预测修正**：改了哪一项、从多少改到多少？改的是**假设**还是**结论**？

无公司级估计修正：全文不出现 old/new、prior/current、"raise/lower our estimate"、"from X to Y" 任何一句，ticker 表也只有一个版本、无上期对照列。评级与目标价这一期全部为**维持**动作，逐条是"Remain Outperform on ETN ($534)、HUBB ($584)、LGN ($103)、J ($163)、TRMB ($85)、URI ($1,153)"与"Remain Market-Perform on CAT ($1002)、CMI ($700)、OSK ($138) 和 PWR ($725)"，没有一条评级或 PT 变动 ⇒ **结论没变**。

有一处"上修"但不是他家估计：报告附图标题称年初至今 FY26 hyperscaler capex 共识上修 80%+，2026 共识 $727B（+76% Y/Y）、2027 $916B（+26%）。这改的是**行业共识输入**，不是 Bernstein 自己的假设，也不是结论。

另一处是容量数据的月度更新（pipeline +14 GW、在建 +200 MW、搁浅 +4 GW），属数据刷新。判"不重要（数据与共识换新，自家假设与结论均未改）"。

### 依据

- p.3｜Remain Outperform on ETN ($534), HUBB ($584), LGN ($103), J ($163), TRMB ($85), and URI ($1,153). Remain Market-Perform on CAT ($1002), CMI ($700), OSK ($138) and PWR ($725).
- p.13｜EXHIBIT 16: YTD, FY26 Consensus’ Hyperscaler Capex Estimates Are Up 80%+
- p.13｜EXHIBIT 15: Consensus is Anticipating ~$727B in Capex Spend From the Top 5 Hyperscalers in ‘26, Up 76% Y/Y. ‘27 Currently Expects 26% Growth to $916B
- p.1｜Project Pipeline. Over the last month, the data center project pipeline grew by 4%, up 14 GW to 338 GW.

## Q5 · 他给了**情景**吗？各自驱动假设是什么？

**单情景**。全文无 Bull／Base／Bear 三档，也无三档目标价；每只票只有一个目标价与一个评级（例 Meta Outperform PT $850、Amazon Outperform $315、Google Market-Perform $390），情景信息只以"下行风险方向"的形式出现，且集中在容量侧：地方反对/NIMBY 推高搁浅容量至 38 GW（占 pipeline 11%）、pipeline 清库时间从 10 年拉长到 12 年、BTM 在 6 月只占新增 pipeline 的 12%（远低于年初至今 36% 的均值）。

驱动假设：单情景建立在"AI 需求持续 + 瓶颈未解"上——报告称覆盖内所有数据中心相关标的都受益于"bottlenecks persist, demand for equipment and labor is high, and backlogs remain healthy"；情景未分档，所以不存在"差三成"的假设对比，杠杆落在**订单/在手订单延续性**而非倍数。

### 依据

- p.3｜We rate Amazon Outperform with PT of $315. We rate Meta Outperform with PT of $850. We rate Google Market-Perform with PT of $390.
- p.3｜We see all data center exposed names in our coverage benefiting from attractive multi-year end market growth where bottlenecks persist, demand for equipment and labor is high, and backlogs remain healthy.
- p.1｜Stranded Capacity. The rise in local data center opposition/NIMBY continues driving stranded capacity higher, up 4 GW to 38 GW, representing 11% of total pipeline
- p.1｜Of note, BTM projects accounted for only 12% of the additions to June’s pipeline, below the 36% YTD average.

## Q6 · 他用了哪几种**估值方法**？**能互相印证吗**？

只给一种方法：**相对倍数法**。而且只有 Ferguson 一只把两个输入写全了——EV/EBITDA 18.0x 与 P/E 24.5x（原文写"maintaining"，说明倍数未变、只是目标价随盈利走）。其余四十余只票在 ticker 表里只有 Price Target 一个数字，既无倍数、也无指标年份、无 WACC、无永续增长率，目标价无法复算。

表内注脚给出了估值口径的分类（这点有价值）：LGN、CRWV 用 EV/EBITDA；AMZN、META、GOOGL、2308.TT、2360.TT、2382.TT、3037.TT、ENR.GR、IREN、CIFR、WULF、CLSK、MARA、RIOT、CORZ 用 Reported P/E。但"用哪个倍数"没有任何一只给出。

能不能互相印证：不能。无第二方法（无 DCF、无 SOTP、无 NAV），单一倍数法也无从自证；且唯一可复算的 Ferguson 也只有倍数没有当年 EPS/EBITDA 值，仍无法落成"倍数×指标=目标价"的等式。

### 依据

- p.4｜We rate Ferguson Outperform with a $310 (GBp 22,963) target price, maintaining our EV/EBITDA multiple of18.0x and a P/E multiple of 24.5x.
- p.3｜LGN, CRWV valuation is EV/EBITDA (x); AMZN, META, GOOGL, 2308.TT, 2360.TT, 2382.TT, 3037.TT, ENR.GR, IREN, CIFR, WULF, CLSK, MARA, RIOT, CORZ valuation is Reported P/E (x)
- p.2｜<tr><td>META(Meta)</td><td>O</td><td>USD</td><td>631.48</td><td>850.00</td><td>(34.0)%</td><td>USD</td><td>23.49</td><td>33.54</td><td>37.04</td><td>26.9</td><td>18.8</td><td>17.1</td></tr>
- p.38｜VALUATION METHODOLOGY

## Q7 · 目标价的**依据 / 估值方法解释 / 风险列示**齐不齐？

三件**全缺**，判"未见依据"，属形式不合规，必须上报。

1. **目标价由哪个方法算出**——未见。附录 VALUATION METHODOLOGY 一节只有一句"本报告覆盖六家以上公司，估值方法与其他公司披露请访问网站"，正文与表格均无逐票方法说明；唯一例外是 Ferguson 的倍数句，占覆盖标的不到 1/40。
2. **方法的关键输入**——未见。四十余只票只给一个 PT 数字，无目标倍数、无指标年份、无 WACC、无永续增长率、无溢价理由；连 EPS 也是 Reported 而非 adjusted，无法与倍数配套复算。
3. **可能阻碍达成目标价的风险列示**——未见。附录 RISKS 一节与 VALUATION METHODOLOGY 完全同构，也只给同一外链；正文没有风险章，个股层面只有方向性描述（NIMBY 推高搁浅容量、清库 12 年、BTM 占比降到 12%），没有一条挂到某只票的目标价上。

也就是说，本件的 PT 是"有数无据"：数字齐、推导链与风险链都外置到 bluematrix 网站，PDF 内不可复算、不可核验。这不是"某一件缺"，是三件同时缺。

### 依据

- p.38｜This research publication covers six or more companies. For valuation methodology and other company disclosures: Please visit: https://bernstein-autonomous.bluematrix.com/sellside/Disclosures.action.Or, you can also write to the Director of Compliance, Bernstein Institutional Services LLC, 245 Park Avenue, New York, NY 10167.
- p.38｜RISKS
- p.38｜This research publication covers six or more companies. For risks and other company disclosures:
- p.4｜We rate Ferguson Outperform with a $310 (GBp 22,963) target price, maintaining our EV/EBITDA multiple of18.0x and a P/E multiple of 24.5x.

## Q8 · **评级分布三件**（三档占比 · 投行关系占比 · 观测时点）齐不齐？

三件齐，全部取自机构级披露表（DISTRIBUTION OF EQUITY RATINGS/INVESTMENT BANKING SERVICES），不是数报告里的个股条数。

1. **三档占比**（Global Rating Distribution）：Outperform 51.2%、Market-Perform（Bernstein 品牌）/Neutral（Autonomous 品牌）35.8%、Underperform 13.1%。合计 100.1%，系四舍五入。
2. **各类别中过去 12 个月有投行关系的占比**（Investment Banking Relationships 列）：Outperform 15.3%、Market-Perform/Neutral 16.2%、Underperform 13.6%。表注说明该列口径为"每档中过去 12 个月由 Bernstein 关联方提供过投行服务的公司占比"，且全部数字按季更新。
3. **观测时点**：截至 2026 年 6 月 30 日。发布日为 2026-07-09，距 6 月 30 日 9 天（<15 天），按规则可用上上个季末，本表用的是 6 月底这一观测点。

附带一条与合规有关的口径：机构自述"评级按 12 个月相对表现"给档——Outperform 为跑赢基准 15pp 以上、Market-Perform 为 ±15pp 以内、Underperform 为跑输 15pp 以上，故三档不是买卖建议的同义词。

### 依据

- p.40｜<tr><td>Outperform</td><td>BUY</td><td>51.2%</td><td>15.3%</td></tr>
- p.40｜<tr><td>Market-Perform (Bernstein Brand) Neutral (Autonomous Brand)</td><td>HOLD</td><td>35.8%</td><td>16.2%</td></tr>
- p.40｜<tr><td>Underperform</td><td>SELL</td><td>13.1%</td><td>13.6%</td></tr>
- p.40｜* These figures represent the percentage of companies within each equity rating category for which affiliates of Bernstein have provided investment banking services within the previous 12 months. As of June 30, 2026. All figures are updated quarterly.
- p.38｜• Outperform: Stock will outpace the market index by more than 15 pp
- p.38｜• Market-Perform: Stock will perform in line with the market index to within +/-15 pp

## Q9 · **评级 / 目标价历史走势图**在不在（含赋改日期）？

声明有图、文本层无数据，判**未见**。

附录有一节标题 PRICE CHARTS/ RATINGS AND PRICE TARGET HISTORY，但正文只写"本报告覆盖六家以上公司，价格图与其他公司披露请访问链接"，PDF 内没有任何一张图、也没有评级/目标价变动序列表。另有一段说明"2024 年 4 月 1 日之前由 Sanford C. Bernstein & Co., LLC. 发布评级与目标价信息"的公司清单（CAT、CMI、J、OSK、PWR、TRMB、URI、NVDA、AVGO、AMD、INTC、AMZN、META、GOOGL、MSFT、ORCL、DELL、HPE），也只是指向"下图"，而图并不在文本层里。

能读到的只有一个当期截面：ticker 表给出每只票的 Rating 与 Price Target（META O／$850、AMZN O／$315、GOOGL M／$390），没有生效日期，也没有变动条数。覆盖起始日与最近一次变动日期均无法从本件取得。

结论：声明有图、文本层无数据，判未见；不能写"覆盖不足一年，无须附"，因为报告自述覆盖已逾 2024 年 4 月的品牌切换节点。

### 依据

- p.40｜PRICE CHARTS/ RATINGS AND PRICE TARGET HISTORY
- p.40｜This research publication covers six or more companies. For price chart and other company disclosures, please visit https://bernstein-autonomous.bluematrix.com/sellside/Disclosures.action or you can write to the Director of Compliance, Bernstein Institutional Services LLC, 245 Park Avenue, New York, NY 10167.
- p.40｜Prior to April 1, 2024, Sanford C. Bernstein & Co., LLC. issued the ratings and price target information in the graph(s) below for the following companies: Caterpillar Inc, Cummins Inc, Jacobs Solutions Inc, Oshkosh Corp, Quanta Services Inc, Trimble Inc, United Rentals Inc, NVIDIA Corp, Broadcom Inc, Advanced Micro Devices Inc, Intel Corp, Amazon.Com Inc, Meta Platforms Inc., Alphabet Inc, Microsoft Corp, Oracle Corp, Dell Technologies Inc and Hewlett Packard Enterprise Co.

## Q10 · **九项冲突披露**在不在**首页**（或指明页码）？

首页只给一句样板指路："See the Disclosure Appendix of this report for required disclosures, analyst certifications and other important information."——指向文末附录、不给页码。逐项内容在 DISCLOSURE APPENDIX 的 REQUIRED DISCLOSURES／CONFLICTS OF INTEREST／CERTIFICATION 三节。逐项核对：

| 项 | 有/无 | 位置与内容 |
|---|---|---|
| ① 分析师及家庭持仓 | 有（限"参与撰写的 associate"，非分析师本人） | 附录三句并列：一位参与本报告的人员对 Amazon 股权或债务证券有财务利益、一位对 Meta 有、一位对 Alphabet 有。三只均为本文标的（名单含 META、AMZN、GOOGL，不含 NVDA／ETN 等其余票）；但原文用的是 "an associate contributing to this report"，未指明是署名分析师本人或家庭成员，故只能算部分覆盖 |
| ② 报酬是否挂钩投行收入 | 有（明确否定） | 附录称分析师按 account penetration、productivity、investment ideas 的主动性等对研究业务的贡献取酬，"No analysts are compensated based on performance in, or contributions to, generating investment banking revenues."——与本项要求确认的"是否挂钩"给出的是**否**，且落到具体考核项 |
| ③ 近 12 个月主/副承销或收投行报酬 | 有 | 两条并列：managed or co-managed 公开/144A 发行名单（CAT、Legence、CoreWeave、AMZN、Alphabet、Schneider、Legrand、HPE）；收投行服务报酬名单（CAT、Legence、CoreWeave、AMZN、Alphabet、Schneider、Siemens AG、Legrand、MSFT、HPE）。**含本文标的 AMZN、GOOGL**，不含 META |
| ④ 未来 3 个月是否寻求投行费 | 有 | "expect to receive or intend to seek compensation for investment banking services in the next three months from" 7 家：CAT、Legence、CoreWeave、AMZN、Alphabet、Schneider、Legrand。**含 AMZN、GOOGL**，不含 META |
| ⑤ 近 12 个月非投行服务报酬 | 有 | 三档分列（affiliate 提供、Bernstein 及关联方提供、Bernstein 单独提供），合并名单含 CAT、CMI、Legence、INTC、EQIX、CoreWeave、AMZN、Alphabet、Schneider、Siemens、ABB、Legrand、Siemens Energy、MSFT、Carrier、DELL、HPE、NVIDIA。**含 AMZN、GOOGL**，不含 META |
| ⑥ 是否客户及服务类型 | 有 | 两类：investment banking client relationship 名单（10 家，含 AMZN、Alphabet、MSFT、Siemens、Schneider、Legrand、CAT、Legence、CoreWeave、HPE）；non-investment banking securities-related 服务名单（同上加 INTC、EQIX、ABB、Carrier、DELL、NVIDIA）。**含本文标的 AMZN、GOOGL、NVDA** |
| ⑦ 实益持有该类普通股 ≥1% | 有，但**不含本文标的** | 三档主体分别列名：AB 及关联方持 ≥1% 的是 Eaton、Oshkosh、United Rentals、Prysmian、Core Scientific；SG 及关联方持 ≥1% 的是 Siemens Energy、Riot。**META 一个都没进**——Meta 只出现在"Bernstein Autonomous LLP 或 BSG France SA 持有 0.5% 以上净多/空"那一档，门槛与主体均与本项要求（1%、母公司）不符，不能算 |
| ⑧ 是否做市 | 有 | 两处：股权做市/流动性提供名单（33 家，**含 Meta**、CAT、ETN、NVDA、AVGO、AMZN、Alphabet、MSFT、ORCL、VRT、TT、JCI、CARR、DELL、HPE 等）；债务证券做市名单（20 家，**含 Meta**、AMZN、Alphabet、ETN、NVDA、AVGO、INTC、EQIX、DLR 等）。本文标的 META 在两个名单里都有 |
| ⑨ 分析师过去 12 个月是否从标的收酬 | 未见 | 附录 CERTIFICATION 只说"no part of that analyst's compensation was, is, or will be, directly or indirectly, related to the specific recommendations or views"——讲的是报酬不与**具体推荐/观点**挂钩；②那条讲的是不与**投行收入**挂钩。两句都不回答"过去 12 个月是否从标的公司收取报酬"，事由不同，故判未见 |
| ⑩ 其他重大冲突 | 有 | 三条：SG 及/或关联方担任 Alphabet 债券发行的 Joint Bookrunner（EUR，3/6/9/13/19/39Y）；两名署名分析师持有多种加密货币多头（Chhugani、Rasgon）；另有 Gartner 数据免责声明。第一条与本文标的 GOOGL 直接相关 |

红旗提示：该机构对 META（含股权与债务）做市 ＋ 其关联方对 META 持 0.5% 以上净多/空 ＋ 参与撰写人员持 META 财务利益 ＋ 对 AMZN/GOOGL 有近 12 个月投行关系并将在未来 3 个月继续寻求投行费 ⇒ 引用其 META"Outperform／PT $850"与 AMZN/GOOGL 观点时应作立场折价；相对而言 META 未被列入 1% 实益持股与投行费名单，其 META 观点的利益冲突强度低于 AMZN/GOOGL。

### 依据

- p.1｜See the Disclosure Appendix of this report for required disclosures, analyst certifications and other important information.
- p.38｜An associate contributing to this report has a financial interest in the equity or debt securities of Meta Platforms Inc..
- p.38｜An associate contributing to this report has a financial interest in the equity or debt securities of Amazon.Com Inc.
- p.38｜An associate contributing to this report has a financial interest in the equity or debt securities of Alphabet Inc.
- p.43｜No analysts are compensated based on performance in, or contributions to, generating investment banking revenues.
- p.41｜AB and/or its affiliates beneficially own 1% or more of a class of common equity securities of the following companies: Eaton Corp PLC, Oshkosh Corp, United Rentals Inc, Prysmian SpA and Core Scientific Inc.
- p.41｜SG and/or its affiliates beneficially own 1% or more of a class of common equity securities of the following companies: Siemens Energy AG and Riot Platforms Inc.
- p.40｜Bernstein Autonomous LLP or BSG France SA, beneficially, has either a net long or short position of 0.5% or more of the total issued share capital of a class of common equity securities
- p.41｜Certain affiliates of Bernstein act as market maker or liquidity provider in the equities securities of: Caterpillar Inc, Cummins Inc, Eaton Corp PLC, Hubbell Incorporated, Legence Corp., Oshkosh Corp, Quanta Services Inc, Trimble Inc, United Rentals Inc, NVIDIA Corp, Broadcom Inc, Advanced Micro Devices Inc, Intel Corp, Amazon.Com Inc, Meta Platforms Inc., Alphabet Inc, Ferguson Enterprises Inc., Schneider Electric SA, Siemens AG, ABB Ltd, Legrand SA, Siemens Energy AG, Prysmian SpA, Microsoft Corp, Oracle Corp, Cipher Digital Inc, TeraWulf Inc, Vertiv Holdings Co, nVent Electric PLC, Trane Technologies PLC, Johnson Controls International PLC, Carrier Global Corporation, Dell Technologies Inc and Hewlett Packard Enterprise Co.

## Q11 · 他的**风险章**挂了数字吗？

**未见风险列示**——既不是"挂了数字"，也不是"样板风险"，而是风险章本身缺失。附录 RISKS 一节只有一句"本报告覆盖六家以上公司，风险与其他公司披露请访问网站"，与估值方法共用同一个外链；PDF 内没有任何一条个股风险条目，更没有"WACC ±1%、永续增长率 ±0.5%、目标倍数 ±1x 对 PT 的影响"这类敏感度表。

正文里能捡到的方向性表述共 3 条，均无百分点或金额：地方反对/NIMBY 推高搁浅容量（38 GW、占 pipeline 11%，去年夏为 7–9%）、按当前建造速度需 12 年清完 338 GW pipeline（上月 10 年）、BTM 依赖度（neocloud 56%、developer 47%、hyperscaler 38% 的 pipeline 用 BTM）。

能否写成"若〔变量〕变 X ⇒〔某年〕EPS 或 PT 变 Y%"：不能。本件不提供任何敏感度换算，唯一带数字的是容量与占比，属运营数据而非风险量化。此缺口与 Q7 第 3 件是同一处，应合并上报。

### 依据

- p.38｜This research publication covers six or more companies. For risks and other company disclosures:
- p.1｜Stranded Capacity. The rise in local data center opposition/NIMBY continues driving stranded capacity higher, up 4 GW to 38 GW, representing 11% of total pipeline, which remains up vs. 7-9% last summer, but is beginning to stabilize.
- p.1｜As a result, at today’s build rate, it would take 12 years to clear the 338 GW pipeline, up from 10 years last month.
- p.1｜From an operator type perspective, neoclouds are most reliant on BTM (56% of pipeline), followed by developers (47% of pipeline), and hyperscalers (38% of pipeline).

## Q12 · 这份报告落在**静默期窗口**内吗？

否。发布与完成时间同为 2026-07-09 23:20 UTC；本件是月度容量追踪（每月固定更新），不对应任何 IPO 或二次发行的定价，全文无发行时间线、无定价日、无承销团名单，也没有 "Initiation" 字样。

附录虽有"过去 12 个月主/副承销"名单（CAT、Legence、CoreWeave、AMZN、Alphabet、Schneider、Legrand、HPE），但只给相对时窗"in the past twelve months"，无具体发行日期，无法与 7 月 9 日相减判窗；且清单里没有 META（本文 frontmatter 标的），无法据此认定本件是某次发行的承销商研究。

结论：不落静默期窗口（IPO 后 ≥10 天、二次发行后 ≥3 天两条均无对应事件）。

### 依据

- p.1｜First Published: 09 Jul 2026 23:20 UTC Completion Date: 09 Jul 2026 23:20 UTC
- p.1｜In this note, we update our monthly Data Center Capacity Tracker series, a comprehensive monitor of N. American data center capacity by stage of development, operator, and geography.
- p.41｜Affiliates of Bernstein managed or co-managed in the past twelve months a public offering of securities of Caterpillar Inc, Legence Corp., CoreWeave, Inc., Amazon.Com Inc, Alphabet Inc, Schneider Electric SA, Legrand SA and Hewlett Packard Enterprise Co.
