---
id: 03-broker-research-2026-05-20-1
cat: "03"
sub: broker-research
template: broker-research
template_version: 2
date: 2026-05-20
time: "00:00"
title: "03-broker-research-2026-05-20-1"
kind: "broker-research"
issuer: ""
ticker: META
source_pages: 41
---

> 骨架已生成，答案待填。原文：`corpus/materials/mineru/03-broker-research-2026-05-20-1/full.md`（41 页）。
> 填写纪律见 `docs/EVIDENCE-SPEC.md`：有答案必有依据块，块须逐字，页码 `p.N` 以源 PDF 为准。

## Q1 · 他的**关键假设取值**各是多少？

本件是 Bernstein 的月度数据中心产能追踪（首期），主表是 33 只标的的评级/目标价/调整后 EPS/调整后 P/E，没有任何损益表，六项财务假设里只有"行业产能与 TAM"这条链和"调整后 EPS"可取。

**行业量（本件真正的假设）**

- **项目管线**：295 GW，月度 +14 GW（+5%），同比 3 倍。开发商贡献 86% 增量，超大规模厂 37%，neocloud 13%。
- **在建产能**：59 GW，月度 +6.5 GW；德州 +2 GW、威斯康星 +700 MW 合计贡献 40% 以上。
- **搁浅产能**：32 GW，月度 +3.4 GW，占总管线 11%（去年夏天 7–9%）。
- **表后供电（BTM）**：管线 115 GW（月度 +3.3 GW / +2%，年初至今 +30% / +28 GW）；在建仅 13 GW。渗透率：存量 4%、在建 22%、管线 39%。
- **电气设备 TAM（按 $M/MW 自下而上估算）**：PWR 4 万亿美元、VRT 9,140 亿美元、Schneider 7,870 亿美元、ETN 6,900 亿美元、ABB 5,900 亿美元、LGN 2,990 亿美元。

**公司层（只有一条可取）**

- **调整后 EPS**：ETN 2025A 12.07 / 2026E 13.29 / 2027E 15.71，对应同比 +10.1%、+18.2%；NVDA 4.77 / 8.88 / 11.94，同比 +86.2%、+34.5%。口径按表注：LGN 为 EBITDA（百万）、AMZN/META/GOOGL 及台系标的为 Reported EPS。
- **收入增速、毛利率、营业利润率、资本开支、实际税率、摊薄股数**：表内未给该六行，材料未给出，不能从 EPS 反推。

### 依据

- p.1｜Project Pipeline. Over the last month, the data center project pipeline grew by 5%, up 14 GW to 295 GW.
- p.1｜Under Construction. Over the last month, data center capacity under construction increased by 6.5 GW to 59 GW.
- p.1｜This grew by 3.4 GW to 32 GW, representing 11% of total pipeline, up from 7-9% last summer.
- p.1｜the BTM pipeline grew by 2% or 3.3 GW M/M and by 30% or 28 GW YTD to 115 GW
- p.1｜we estimate the following data center TAMs: PWR ($4T), ETN ($690B), LGN ($299B), VRT ($914B), Schneider ($787B), ABB ($590B), as well as several other OEMs.
- p.2｜<tr><td>ETN (Eaton)</td><td>O</td><td>USD</td><td>371.88</td><td>509.00</td><td>(10.4)%</td><td>USD</td><td>12.07</td><td>13.29</td><td>15.71</td><td>30.8</td><td>28.0</td><td>23.7</td></tr>
- p.2｜LGN estimate is EBITDA (M); AMZN, META, GOOGL, 2308.TT, 2360.TT, 2382.TT, 3037.TT, SIE.GR, ENR.GR estimate is Reported EPS

## Q2 · **他和我差在哪一项、哪一年**？差多少？

我方模型数值不在本份材料内，逐行"他 vs 我"的对照需跨批（交主控）。

本件既无共识表（全文不见 FirstCall / Visible Alpha / FactSet / Bloomberg consensus / "vs consensus"），又是该系列**首期**（first installation），因此也没有"他本期 vs 他上期"可做——两头都缺，只能记缺口：

- 行业量：管线 295 GW、在建 59 GW、搁浅 32 GW、BTM 115 GW 均只一个点，无区间、无上一版。
- 公司层：33 只标的只有 2025A/2026E/2027E 三列，无上一版可比；表内 "Rel. Perf." 是相对表现，不是共识。

判定：我方该项未定 ⇒ 记缺口。能证明"本件只有单点估计、无对照"的是估计表列头与首期声明。

### 依据

- p.1｜We introduce the first installation of our monthly Data Center Capacity Tracker series, a comprehensive monitor of N. American data center capacity by stage of development, operator, and geography.
- p.2｜<tr><td>NVDA (NVIDIA)</td><td>O</td><td>USD</td><td>220.61</td><td>300.00</td><td>39.4%</td><td>USD</td><td>4.77</td><td>8.88</td><td>11.94</td><td>46.2</td><td>24.8</td><td>18.5</td></tr>

## Q3 · 他的**财年是谁的财年**？

- 列头只写 `2025A / 2026E / 2027E`，**不标结算月份**，也未给任何标的的财年说明 ⇒ 按日历年处理，属**推定**，不能当作已确认。
- 口径混用必须点明：主表数字并非统一 EPS——LGN 是 EBITDA（百万），AMZN/META/GOOGL 及 2308.TT/2360.TT/2382.TT/3037.TT/SIE.GR/ENR.GR 是 Reported EPS，LGN 与 CRWV 的估值用 EV/EBITDA，HUBB 基年是 2024、NVDA 基年是 2026。因此"2026E"这一列在不同行代表的起点并不一致。
- 结论：可作日历年口径使用，但需先按标的校正基年（HUBB、NVDA 各推后一年），否则跨标的比较会错年。

### 依据

- p.2｜<tr><td>Ticker</td><td>Rating</td><td>Cur</td><td>2026Closing Price</td><td>Price Target</td><td>Rel. Perf.</td><td>Cur</td><td>2025A</td><td>2026E</td><td>2027E</td><td>2025A</td><td>2026E</td><td>2027E</td></tr>
- p.2｜HUBB base year is 2024; NVDA base year is 2026;
- p.2｜<tr><td>DLR (Digital Realty)</td><td>O</td><td>USD</td><td>186.28</td><td>232.00</td><td>(14.2)%</td><td>USD</td><td>3.87</td><td>2.74</td><td>2.37</td><td>48.1</td><td>68.1</td><td>78.5</td></tr>

## Q4 · **预测修正**：改了哪一项、从多少改到多少？改的是**假设**还是**结论**？

**首次发布，无上一版可比**（本件自述为该系列首期），谈不上"从多少改到多少"。

可核的只有一处口径表述：Ferguson 段写"maintaining our EV/EBITDA multiple of 18.0x and a P/E multiple of 24.5x"——用 "maintaining" 表示维持倍数不变，未给旧值，故只能记"仅方向：维持"，不补基数。

其余 32 只只给评级与目标价（如 ETN $509、HUBB $584），无任何 old/new 或 raise/lower 表述，判"无假设修正可查"。因为改的只是目标价而没有任何收入/EPS 修正句，即便有变动也只属结论层。

### 依据

- p.1｜We introduce the first installation of our monthly Data Center Capacity Tracker series, a comprehensive monitor of N. American data center capacity by stage of development, operator, and geography.
- p.3｜US Business Services: We rate Ferguson Outperform with a $310 (GBp 22,963) target price, maintaining our EV/EBITDA multiple of18.0x and a P/E multiple of 24.5x.

## Q5 · 他给了**情景**吗？各自驱动假设是什么？

**单情景**。33 只标的各只给一个 12 个月目标价（评级定义写明 12 个月相对表现），全文无 Bull/Base/Bear、无三档 PT、无情景假设表。

驱动假设是单点行业链：管线 295 GW（同比 3 倍）→ 在建 59 GW → BTM 115 GW 占管线 39% → 按 $M/MW 换算成电气设备 TAM。因为没有三档，无法做"目标价差三成而假设只差一个点"的杠杆检验。

情景信息只以方向句出现（瓶颈持续、设备与劳动力需求高），未量化，故判"单情景，仅列方向"。

### 依据

- p.3｜Remain Outperform on ETN ($509), HUBB ($584), LGN ($103), J ($163), TRMB ($85), and URI ($1,153).
- p.2｜We see all data center exposed names in our coverage benefiting from attractive multi-year end market growth where bottlenecks persist, demand for equipment and labor is high, and backlogs
- p.3｜We rate Amazon Outperform with PT of $315. We rate Meta Outperform with PT of $850. We rate Google Market-Perform with PT of $390.

## Q6 · 他用了哪几种**估值方法**？**能互相印证吗**？

**只给一种方法，且只覆盖一只标的。**

- **Ferguson**：明确给两个倍数——EV/EBITDA 18.0x 与 P/E 24.5x，目标价 $310（GBp 22,963）。两倍数并列但未说权重、未给对应指标值，无法复算。
- **其余 32 只**（ETN、HUBB、LGN、J、TRMB、URI、CAT、CMI、OSK、PWR、SU.FP、SIE.GR、LR.FP、ENR.GR、PRY.IM、ABBN.SW、DLR、EQIX、CRWV、AMZN、META、GOOGL、MSFT、ORCL、NVDA、AVGO、AMD、INTC 及四只台系标的）：只给目标价数字，**未给任何方法、倍数或指标口径**。
- **全局说明**：估值方法章节整段写"covers six or more companies"，把方法解释指向外部网站。

印证判断：不适用——只有一种方法，且只有一个标的给了输入；Ferguson 的两个倍数之间也无交叉验证信息（未说明是否指向同一价值）。

### 依据

- p.3｜US Business Services: We rate Ferguson Outperform with a $310 (GBp 22,963) target price, maintaining our EV/EBITDA multiple of18.0x and a P/E multiple of 24.5x.
- p.32｜This research publication covers six or more companies. For valuation methodology and other company disclosures: Please visit: https://bernstein-autonomous.bluematrix.com/sellside/Disclosures.action.
- p.3｜European Capital Goods: We rate Schneider (PT €310), Siemens (€300), Legrand (€170), Siemens Energy (€210), and Prysmian (€110) Outperform, and rate ABB (CHF 70) Market-Perform.

## Q7 · 目标价的**依据 / 估值方法解释 / 风险列示**齐不齐？

**不齐，且是形式不合规，必须上报。**

1. **方法（缺）**：全篇只有 Ferguson 一只给了倍数（EV/EBITDA 18.0x、P/E 24.5x）；其余 32 只只有目标价数字。估值方法章节整段指向外部网站，等于把方法解释外包。
2. **关键输入（几乎缺）**：无 WACC、无永续增长率、无终端倍数、无"为何给这个倍数"的溢价理由；Ferguson 给了倍数但未给对应的 EBITDA/EPS 基数，仍不可复算。
3. **风险列示（缺）**：风险章节同样整段写"covers six or more companies"并指向网站，正文**没有任何一条具名风险**，既无方向句也无量化条目。

结论：三件全缺或半缺，本件不满足 2241(c)(1) 的实质要求；引用其目标价时须标注"方法与风险均外置、不可复算"。

### 依据

- p.32｜This research publication covers six or more companies. For valuation methodology and other company disclosures: Please visit: https://bernstein-autonomous.bluematrix.com/sellside/Disclosures.action.
- p.32｜This research publication covers six or more companies. For risks and other company disclosures: Please visit: https://bernstein-autonomous.bluematrix.com/sellside/Disclosures.action.
- p.3｜US Business Services: We rate Ferguson Outperform with a $310 (GBp 22,963) target price, maintaining our EV/EBITDA multiple of18.0x and a P/E multiple of 24.5x.

## Q8 · **评级分布三件**（三档占比 · 投行关系占比 · 观测时点）齐不齐？

三件齐，全部来自披露表本身：

- **三档占比（全球）**：Outperform 51.1%、Market-Perform（Bernstein）/ Neutral（Autonomous）36.3%、Underperform 12.6%。
- **各类别中过去 12 个月有投行关系的占比**：Outperform 16.5%、Market-Perform 17.8%、Underperform 14.9%。脚注口径为"各评级类别中，Bernstein 关联方在过去 12 个月提供过投行服务的公司占比"。
- **观测时点**：As of March 31, 2026，按季更新。发布日 5 月 20 日距 3 月末 50 天（>15 天），用的是上一季末，口径正常。

口径提醒：这是机构级全球数字，不能用来推断本文 33 只标的的评级构成；逐票评级是另一层（以 Outperform 为主，另有 M/U 若干）。

### 依据

- p.34｜<tr><td>Outperform</td><td>BUY</td><td>51.1%</td><td>16.5%</td></tr>
- p.34｜<tr><td>Market-Perform (Bernstein Brand) Neutral (Autonomous Brand)</td><td>HOLD</td><td>36.3%</td><td>17.8%</td></tr>
- p.34｜<tr><td>Underperform</td><td>SELL</td><td>12.6%</td><td>14.9%</td></tr>
- p.34｜As of March 31, 2026. All figures are updated quarterly.

## Q9 · **评级 / 目标价历史走势图**在不在（含赋改日期）？

**声明有图、文本层无数据，判未见。**

- 文本层只有标题句"PRICE CHARTS/ RATINGS AND PRICE TARGET HISTORY"，其后紧接"covers six or more companies. For price chart and other company disclosures, please visit…"——图表本体指向外部网站，页内没有一张图的数据。
- 另有一句历史归属说明：2024 年 4 月 1 日之前由 Sanford C. Bernstein & Co., LLC 对 16 家公司发布评级与目标价，并称"in the graph(s) below"，但文本层同样没有这些图的数据点。
- 因此无法给出覆盖期间、变动条数、最近一次赋改日期，判未见。

### 依据

- p.34｜PRICE CHARTS/ RATINGS AND PRICE TARGET HISTORY
- p.34｜This research publication covers six or more companies. For price chart and other company disclosures, please visit https://bernstein-autonomous.bluematrix.com/sellside/Disclosures.action
- p.34｜Prior to April 1, 2024, Sanford C. Bernstein & Co., LLC. issued the ratings and price target information in the graph(s) below for the following companies: Caterpillar Inc, Cummins Inc, Jacobs Solutions Inc, Oshkosh Corp, Quanta Services Inc, Trimble Inc, United Rentals Inc, NVIDIA Corp, Broadcom Inc, Advanced Micro Devices Inc, Intel Corp, Amazon.Com Inc, Meta Platforms Inc., Alphabet Inc, Microsoft Corp and Oracle Corp.

## Q10 · **九项冲突披露**在不在**首页**（或指明页码）？

首页指明披露在 Disclosure Appendix（"See the Disclosure Appendix of this report for required disclosures, analyst certifications and other important information"），逐项内容在披露附录"REQUIRED DISCLOSURES / CONFLICTS OF INTEREST"两节，且为**逐票列名**型。逐项核对：

| 项 | 有/无 | 位置与内容 |
|---|---|---|
| ① 分析师及家庭持仓 | 有（部分，未点名未给比例） | 附录三句并列："An associate contributing to this report has a financial interest in the equity or debt securities of Amazon.Com Inc."（另两句为 Meta Platforms Inc.、Alphabet Inc.）。同页另有"Stacy A. Rasgon maintains long positions in various crypto currencies"，Rasgon 是本文署名分析师之一。四要素中"谁"只到 an associate 未点名、"什么"只到 equity or debt 未分证券类别、无比例。名单**含本文标的** AMZN/META/GOOGL。 |
| ② 报酬是否挂钩投行收入 | 有（明确否认） | "Analysts are compensated based on aggregate contributions to the research franchise as measured by account penetration, productivity and proactivity of investment ideas. No analysts are compensated based on performance in, or contributions to, generating investment banking revenues." 与同一附录披露的 10 只投行客户并存，故属"有否认声明、机构层面仍存投行收入关系"。 |
| ③ 近 12 个月主/副承销或收投行报酬 | 有（逐票列名） | "Bernstein and/or affiliates have received compensation for investment banking services in the past twelve months from Caterpillar Inc, Legence Corp., Digital Realty Trust, Inc., CoreWeave, Inc., Amazon.Com Inc, Alphabet Inc, Schneider Electric SA, Siemens AG, Legrand SA and Microsoft Corp." 名单**含本文标的** CAT/LGN/DLR/CRWV/AMZN/GOOGL/SU.FP/SIE.GR/LR.FP/MSFT 共 10 只。另有同名单的"had an investment banking client relationship"句。 |
| ④ 未来 3 个月是否寻求投行费 | 有（逐票列名） | "Bernstein and/or affiliates expect to receive or intend to seek compensation for investment banking services in the next three months from Caterpillar Inc, Legence Corp., CoreWeave, Inc., Schneider Electric SA and Legrand SA." 名单含 CAT/LGN/CRWV/SU.FP/LR.FP 五只。 |
| ⑤ 近 12 个月非投行服务报酬 | 有（逐票列名，三档主体） | 三句分别以"An affiliate of Bernstein""Bernstein and/or affiliates""Bernstein"为主语，客户名单合计含 CAT、CMI、LGN、INTC、EQIX、CRWV、AMZN、GOOGL、SU.FP、SIE.GR、ABB、LR.FP、ENR.GR、MSFT、NVDA；其中以"Bernstein"本体的名单只有 NVIDIA Corp 与 Microsoft Corp。 |
| ⑥ 是否客户及服务类型 | 有 | "Bernstein and/or affiliates had an investment banking client relationship during the past twelve months with…"（10 只），叠加上述非投行服务客户名单；服务类型分 investment banking services 与 non-investment banking securities-related products or services 两类，均列名。 |
| ⑦ 实益持有该类普通股 ≥1% | 有（逐票列名，含本文标的） | "AB and/or its affiliates beneficially own 1% or more of a class of common equity securities of the following companies: Eaton Corp PLC, Oshkosh Corp, United Rentals Inc and Prysmian SpA."另"SG and/or its affiliates beneficially own 1% or more of a class of common equity securities of the following company: Siemens Energy AG."第三句为 Bernstein Autonomous LLP / BSG France SA 持有 **0.5% 以上**净多或净空（ETN、OSK、URI、AVGO、DLR、META、GOOGL、PRY.IM），阈值不同，不能并入 ≥1%。 |
| ⑧ 是否做市 | 有（逐票列名） | "Certain affiliates of Bernstein act as market maker or liquidity provider in the equities securities of:" 列 24 只，含 ETN、CMI、HUBB、OSK、PWR、TRMB、URI、NVDA、AVGO、AMD、INTC、AMZN、META、GOOGL、FERG、SU.FP、SIE.GR、ABB、LR.FP、ENR.GR、PRY.IM、MSFT、ORCL、CAT；另有一句债务证券做市名单（12 只）。 |
| ⑨ 分析师过去 12 个月是否从标的收酬 | 未见 | 查了 CERTIFICATION 段与 REQUIRED DISCLOSURES 全部条目：只有"no part of that analyst's compensation was, is, or will be, directly or indirectly, related to the specific recommendations"这一独立性认证，讲的是"报酬不与观点挂钩"，不是"是否从标的公司收取报酬"；全文无第二种表述，故判未见。 |
| ⑩ 其他重大冲突 | 有（三处） | 其一："SG and/or its affiliate.s is acting as Joint Bookrunner for Alphabet Inc's bond issue (EUR, 3, 6, 9, 13, 19, 39Y)."——债券承销，标的为本文覆盖的 GOOGL。其二：Rasgon 持多种加密货币多头。其三：Gartner 数据免责句（本报告引用 Gartner 数据但未经其审阅）。 |

红旗提示：AB 实益持有 ETN/OSK/URI/PRY 的 ≥1% 普通股、SG 持有 ENR.GR ≥1%、24 只标的由关联方做市、10 只标的近 12 个月收过投行费且 5 只未来 3 个月仍在寻求投行费 ⇒ 引用其评级（尤其 ETN、URI、PWR、LGN）时立场折价明显。

### 依据

- p.32｜An associate contributing to this report has a financial interest in the equity or debt securities of Amazon.Com Inc.
- p.32｜An associate contributing to this report has a financial interest in the equity or debt securities of Meta Platforms Inc..
- p.32｜An associate contributing to this report has a financial interest in the equity or debt securities of Alphabet Inc.
- p.36｜Analysts are compensated based on aggregate contributions to the research franchise as measured by account penetration, productivity and proactivity of investment ideas. No analysts are compensated based on performance in, or contributions to, generating investment banking revenues.
- p.35｜Bernstein and/or affiliates have received compensation for investment banking services in the past twelve months from Caterpillar Inc, Legence Corp., Digital Realty Trust, Inc., CoreWeave, Inc., Amazon.Com Inc, Alphabet Inc, Schneider Electric SA, Siemens AG, Legrand SA and Microsoft Corp.
- p.35｜Bernstein and/or affiliates expect to receive or intend to seek compensation for investment banking services in the next three months from Caterpillar Inc, Legence Corp., CoreWeave, Inc., Schneider Electric SA and Legrand SA.
- p.34｜AB and/or its affiliates beneficially own 1% or more of a class of common equity securities of the following companies: Eaton Corp PLC, Oshkosh Corp, United Rentals Inc and Prysmian SpA.
- p.35｜Certain affiliates of Bernstein act as market maker or liquidity provider in the equities securities of: Caterpillar Inc, Cummins Inc, Eaton Corp PLC, Hubbell Incorporated, Oshkosh Corp, Quanta Services Inc, Trimble Inc, United Rentals Inc, NVIDIA Corp, Broadcom Inc, Advanced Micro Devices Inc, Intel Corp, Amazon.Com Inc, Meta Platforms Inc., Alphabet Inc, Ferguson Enterprises Inc., Schneider Electric SA, Siemens AG, ABB Ltd, Legrand SA, Siemens Energy AG, Prysmian SpA, Microsoft Corp and Oracle Corp.
- p.34｜SG and/or its affiliate.s is acting as Joint Bookrunner for Alphabet Inc's bond issue (EUR, 3, 6, 9, 13, 19, 39Y).

## Q11 · 他的**风险章**挂了数字吗？

**本件没有风险条目，属形式缺失，不是"样板风险"。**

- RISKS 一节全文只有一句"covers six or more companies，请访问网站"，正文没有任何一条风险句子，既无方向句也无量化句。
- 因此既写不出"若〔变量〕变 X ⇒ 某年 EPS 或 PT 变 Y%"，也无法按"共几条、全为方向句"去数——条数为 0。
- 与"样板风险"的区别：样板风险是"有话无数"，本件是"无话"，缺的是第三件的存在本身（已在目标价依据题一并上报）。

### 依据

- p.32｜This research publication covers six or more companies. For risks and other company disclosures: Please visit: https://bernstein-autonomous.bluematrix.com/sellside/Disclosures.action.
- p.32｜VALUATION METHODOLOGY
- p.32｜RISKS

## Q12 · 这份报告落在**静默期窗口**内吗？

**否**（但有两处承销相关事实需登记，均不触发窗口）。

- 发布日：2026 年 5 月 20 日，First Published 05:04 UTC；本件是月度数据追踪，不是承销后的首次覆盖。
- 唯一的即时承销角色是债券：SG 及关联方担任 Alphabet 债券（EUR，3/6/9/13/19/39Y）的 Joint Bookrunner。这是**债务**发行，不是 IPO 或股权二次发行，不落入股票静默期口径。
- 另有一句"Affiliates of Bernstein managed or co-managed in the past twelve months a public offering of securities of Caterpillar Inc, Legence Corp., CoreWeave, Inc., Amazon.Com Inc, Alphabet Inc, Schneider Electric SA and Legrand SA"——是 12 个月回溯声明，**未给任何发行日**，无法计算是否在窗口内。
- 结论：无发行日可比 ⇒ 不判落窗；若要严格核验，需补 CRWV（新股）与 LGN 的实际发行日期。

### 依据

- p.1｜First Published: 20 May 2026 05:04 UTC  Completion Date: 20 May 2026 05:04 UTC
- p.34｜SG and/or its affiliate.s is acting as Joint Bookrunner for Alphabet Inc's bond issue (EUR, 3, 6, 9, 13, 19, 39Y).
- p.35｜Affiliates of Bernstein managed or co-managed in the past twelve months a public offering of securities of Caterpillar Inc, Legence Corp., CoreWeave, Inc., Amazon.Com Inc, Alphabet Inc, Schneider Electric SA and Legrand SA.
