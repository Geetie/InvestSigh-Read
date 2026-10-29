---
id: 03-broker-research-2026-02-25-6
cat: "03"
sub: broker-research
template: broker-research
template_version: 2
date: 2026-02-25
time: "00:00"
title: "03-broker-research-2026-02-25-6"
kind: "broker-research"
issuer: ""
ticker: META
source_pages: 16
---

> 骨架已生成，答案待填。原文：`corpus/materials/mineru/03-broker-research-2026-02-25-6/full.md`（16 页）。
> 填写纪律见 `docs/EVIDENCE-SPEC.md`：有答案必有依据块，块须逐字，页码 `p.N` 以源 PDF 为准。

## Q1 · 他的**关键假设取值**各是多少？

产品型为**事件驱动短评（deal note）**：AMD 与 META 宣布 6GW AI GPU 合作当日点评，1 页正文＋2 张图表＋财务模型附录。评级 AMD Market-Perform、PT US\$235（同时给出 META Outperform、PT US\$900，但本件主体是 AMD）。六项假设取自财务模型（AMD Calendar，US\$M）：

- **收入增速**：2026E 44,206.6（较 2025 的 34,639.0 为 **+27.6%**，按两值复算）、2027E 59,677.2（**+35.0%**）、2028E 75,377.3（**+26.3%**）。表内未直接给 YoY 行，增速为复算值。
- **毛利率**：GAAP 2026E 53.0%、2027E 52.7%、2028E 54.2%（2025 为 49.5%）；Pro-forma 口径 55.1% / 54.2% / 55.4%（PFGross Margin 行）。
- **营业利润率**：GAAP 15.9% / 22.5% / 28.3%；Pro-forma 26.0% / 29.9% / 34.3%（该行标签在文本层与 TaxRate 粘连，数值按列对齐读取）。
- **资本开支**：2026E (884.1)、2027E (1,193.5)、2028E (1,507.5)（2025 实际 (974.0)）；即 2026 年 capex 同比降约 9%、2027 年回升约 35%（复算）。注：文本层把 `Capex` 与 `Other` 两行合并，故每列第一个数值取为 capex。
- **实际税率**：**13.0%**（2026E–2028E），且 Exhibit 1 的每 GW 增量测算明确"Assumes 13% tax rate"。
- **摊薄股数**：2026E 1,646m、2027E 1,686m、2028E 1,737m；对应 Pro-forma 摊薄 EPS 6.12 / 9.25 / 12.96，GAAP 摊薄 EPS 3.76 / 7.04 / 11.03。

驱动链：META 6GW（MI450 平台，部分按 Meta 负载定制）＋ Meta 成为第六代 EPYC Venice/Verano 的 lead customer；新增 1GW 的理论 EPS 增量为 ~\$3.50（Exhibit 1 中 45% 毛利 × \$15B/GW 一格为 \$3.53）。

### 依据

- p.4｜<tr><td>Revenue</td><td>$</td><td>34,639.0</td><td>$</td><td>44,206.6 $</td><td></td><td>59,677.2 $</td><td>75,377.3</td></tr>
- p.4｜<tr><td>Gross Profit</td><td>$</td><td>17,152.0</td><td></td><td>23,450.4 $</td><td>31,465.9</td><td>$</td><td>40,861.5</td></tr>
- p.4｜<tr><td>Operating Income</td><td>$</td><td>3,694.0</td><td>$</td><td>7,036.4 $</td><td></td><td>13,401.9 $</td><td>21,357.5</td></tr>
- p.4｜<tr><td>Gross Margin</td><td>2025 49.5%</td><td>2026E 53.0%</td><td>2027E 52.7%</td><td>2028E 54.2%</td>
- p.4｜<tr><td>PFGross Margin</td><td>52.4%</td><td>55.1%</td><td>54.2%</td><td>55.4%</td>
- p.4｜<tr><td>GAAP Operating Margin</td><td>10.7%</td><td>15.9%</td><td>22.5%</td><td>28.3%</td>
- p.4｜PF Basic EPS ($) PF Diluted EPS($)</td><td>$ $</td><td>4.20</td><td>$</td><td>6.18 $</td><td></td><td>9.56 $</td><td>13.81</td></tr><tr><td></td><td></td><td>4.17</td><td>$</td><td>6.12 $</td><td></td><td>9.25 $</td><td>12.96</td></tr>
- p.4｜Weighted Average Diluted Shares</td><td></td><td>1,625 1,637</td><td></td><td>1,646</td><td></td><td>1,686</td><td>1,737</td></tr>
- p.5｜Capex Other</td><td>$</td><td>(974.0) $ (4,559.0) $</td><td>(884.1) $ $</td><td>(1,193.5) $</td><td>(1,507.5)</td>
- p.3｜Calculation assumes no incremental opex, with direct fallthrough of incremental gross profit. Assumes 13% tax rate Source: Company reports, Bernstein estimates and analysis

## Q2 · **他和我差在哪一项、哪一年**？差多少？

我方模型数值不在本份材料内，逐行"他 vs 我"的对照需跨批（交主控）。本件可做的是**他的收入框架 vs 报告所附 Bloomberg 共识（估值日 2026-02-24）**，但两者口径不同：他只给总收入，共识只给分部，故只能按量级对照：

| 口径（US\$M） | 2026E | 2027E | 2028E |
|---|---|---|---|
| 他的总收入（Bernstein 模型） | 44,206.6 | 59,677.2 | 75,377.3 |
| 共识 AI GPU 收入 | 13,811 | 27,842 | 40,652 |
| 共识数据中心收入 | 27,900 | 44,848 | 61,851 |

复算三个比例：共识 AI GPU 占他总收入 31.2% / 46.7% / 53.9%。也就是说，仅共识的 AI GPU 一条线，到 2028 年已能解释他总收入的过半。这正是他在正文里给出的判断——"consensus already models close to \$30B in AI GPU revenues for FY27 and over \$40B in FY28"，因此**这笔 6GW 交易不足以推动上调**。

差异在哪里、哪一年：他与共识的**分歧不在收入总量**（他的总收入远高于共识的 AI GPU 与数据中心口径，因含 client/gaming/embedded），而在**这笔交易该不该进模型**——2027 年共识已把 AI GPU 拉到 27,842（同比 +101.6%），意味着共识已提前计入新交易，他据此判断上调空间已被 price in。他未披露自己的 AI GPU 收入拆分，故**无法逐行对差**，记缺口。

### 依据

- p.3｜<tr><td> Al GPU Revenue</td><td></td><td>13,811</td><td>27,842</td><td>40,652</td></tr>
- p.3｜<tr><td>Datacenter revenue</td><td>16,635</td><td>27,900</td><td>44,848</td><td>61,851</td></tr>
- p.3｜Estimates as of 2/24/2026
- p.1｜Similar to OAI deal, the Meta deal should be accretive to EPS all else being equal, though we note that consensus already models in a sizeable AI ramp for the company.

## Q3 · 他的**财年是谁的财年**？

**公司财年，十二月结账，等于日历年**。模型表头直接写 `AMD (Calendar)`，列头为 `2025`（实际）/ `2026E` / `2027E` / `2028E`，季度表用 `Q125…Q427E` 的"季+年后两位"写法，无跨年错位提示，故可与日历年共识直接比较。

但有一处**表头错位必须点出**：首页 ticker table 的 EPS 列写成 `2024A 4.17 / 2025E 6.12 / 2026E 9.25`，而模型里这三个数分别对应 `2025 实际 4.17 / 2026E 6.12 / 2027E 9.25`——即**首页表格的年份标注整体比模型早一年**。估值方法段用的是"FY2027 non-GAAP EPS \$9.25"，与模型一致；若照抄首页列头，会把 FY27 的 EPS 误记为 FY26。引用时以模型列头为准。

### 依据

- p.4｜<tr><td>AMD:IncomeStatement($M) AMD (Calendar)</td><td colspan="7">2025 2026E</td></tr>
- p.5｜<tr><td>AMD (Calendar)</td><td>$</td><td>2025</td><td></td><td>2026E</td><td>$</td><td>2027E</td><td>2028E</td></tr>
- p.2｜<tr><td>Ticker</td><td>Rating</td><td>Cur</td><td>Price</td><td>Target</td><td>Perf.</td><td>Cur</td><td>2024A</td><td>2025E</td><td>2026E</td><td>2024A</td><td>2025E</td><td>2026E</td></tr>
- p.2｜AMD (Advanced Micro)</td><td>M</td><td>USD</td><td>196.60</td><td>235.00</td><td>68.1%</td><td>USD</td><td>4.17</td><td>6.12</td><td>9.25</td><td>47.1</td><td>32.1</td><td>21.3</td></tr>

## Q4 · **预测修正**：改了哪一项、从多少改到多少？改的是**假设**还是**结论**？

**明确不改**："We make no changes to our AMD model at this time." 评级 Market-Perform、目标价 US\$235 均维持；估计表为单点值，没有任何 old→new、prior→current、from \$X to \$Y 的修订行。故"从多少改到多少"在本件**无答案**，只能记：**旧值 = 新值**。

分层判定的结果：

- **结论层没变**：MP / \$235 不动。
- **假设层没变**：收入、毛利率、税率、股数一行未动；本件甚至没把 6GW 交易加进模型。
- **变的只是信息集与语气的边界**：他给出了"若纳入则量级多大"的粗算——新增每 GW 约 +\$3.50 EPS（Exhibit 1，45% 毛利、\$15B/GW 一格为 \$3.53），但明确写"very rough"、"assuming no incremental opex"，且强调共识已计入，因此不构成预测修正。

判定：**不重要（观点没变、事实没变）**。同时提示一处内部张力：按他自述的 ~\$3.50/GW，6GW 全额落地对应约 **+\$21 EPS**（3.50×6，复算），是其 FY27 EPS 9.25 的两倍多——说明该 per-GW 数字是"满产满收入"的理论上限、非逐年可叠加项，若被读者直接乘 6 会严重高估。

### 依据

- p.1｜We make no changes to our AMD model at this time. We rate AMD MP, \$235 PT. We rate META OP, \$900 PT.
- p.3｜EXHIBIT 1: Similar to AMD’s deal with OAI, the Meta agreement could potentially result in roughly \~\$3.50+ in EPS accretion per GW deployed assuming no incremental opex (probably a bit less in practice). EPS Accretion per GW
- p.3｜<tr><td>45%</td><td>$2.36</td><td>$3.53</td><td>$4.71</td></tr>

## Q5 · 他给了**情景**吗？各自驱动假设是什么？

**单情景**：只有一个评级与一个目标价（AMD MP / \$235），未设 Bull/Base/Bear，也没有三档 PT。对 META 同样只给一个 \$900。

但他给了**一个量化增量矩阵**（Exhibit 1），这是本件唯一的分情形结构——按"每 GW 收入 × 毛利率"两维展开 3×3：

| 收入/GW | 40% 毛利 | 45% 毛利 | 50% 毛利 |
|---|---|---|---|
| \$10,000M | \$2.09 | \$2.36 | \$2.62 |
| \$15,000M | \$3.14 | \$3.53 | \$3.93 |
| \$20,000M | \$4.19 | \$4.71 | \$5.23 |

驱动假设三条：**无增量 opex**（增量毛利直接落到 EPS）、**13% 税率**、**每 GW 收入 \$10–20B**。区间 \$2.09–\$5.23，他取"roughly ~\$3.50+"作为中枢。

差别落在哪：矩阵沿两个维度展开（单价 × 毛利率），说明他认为该交易的 EPS 弹性主要来自**每 GW 收入（卖多少钱）**而非费用；而组合层面对 2026–2028 的估值只有单点，**没有把矩阵结果并入模型**，所以三档情景实际不存在。

### 依据

- p.3｜<table><tr><td colspan="2"></td><td colspan="3">Revenue per GW ($M)</td></tr><tr><td colspan="2"></td><td>$10,000</td><td>$15,000</td><td>$20,000</td></tr><tr><td rowspan="3">Gross Margin</td><td>40%</td><td>$2.09</td><td>$3.14</td><td>$4.19</td></tr>
- p.3｜<tr><td>45%</td><td>$2.36</td><td>$3.53</td><td>$4.71</td></tr><tr><td>50%</td><td>$2.62</td><td>$3.93</td><td>$5.23</td></tr></table>
- p.1｜We make no changes to our AMD model at this time. We rate AMD MP, \$235 PT. We rate META OP, \$900 PT.

## Q6 · 他用了哪几种**估值方法**？**能互相印证吗**？

**只给一种方法**：P/E 相对估值。原文——"For AMD, we apply a ~25x multiple to our FY2027 non-GAAP EPS estimate (\$9.25) equating to a \$235 price target"。复算：9.25 × 25 = 231.25，报 235，差 +1.6%（取整到 5 的整数倍）。无 DCF、无 EV/EBITDA、无 SOTP，故不存在"两法互证"。

两个输入：倍数 **~25x**（"~"表示约数，且未给选取理由——不比同业、不给历史区间）；指标 **FY2027 non-GAAP EPS \$9.25**（Pro-forma 摊薄口径）。目标价可复算，但**倍数的来源不可复算**。

同一份报告对 META 用的是"2027e EV/Sales 8x 与 DCF（WACC 10%、永续 3.5%）各 50%"的双法组合——但那属另一标的，不能拿来印证 AMD 的 25x P/E。故 AMD 端结论：单法、不可交叉验证。

### 依据

- p.6｜For AMD, we apply a \~25x multiple to our FY2027 non-GAAP EPS estimate (\$9.25) equating to a \$235 price target.
- p.6｜We value Meta on a Price Target of \$900 using a 50/50 combination of 2027e EV/Sales multiple of 8x, and a DCF using a WACC of 10% and a terminal growth of 3.5%.
- p.2｜AMD (Advanced Micro)</td><td>M</td><td>USD</td><td>196.60</td><td>235.00</td><td>68.1%</td>

## Q7 · 目标价的**依据 / 估值方法解释 / 风险列示**齐不齐？

三件逐条：

1. **目标价由哪个方法算出（可复算）**：有。25x × FY2027 non-GAAP EPS 9.25 = 231.25 ≈ 235，公式与指标年份都写明，可复算。
2. **方法的关键输入**：有数值（25x、\$9.25），**缺倍数的选取论证**——为何 25x、对应同业什么水平、相对历史区间如何，全文未给，也无溢价/折价理由。属"输入齐、论证缺"。
3. **可能阻碍达成目标价的风险列示**：有，且具体到五条，非模板句：PC 市场下滑、份额再度流失、毛利压力、新产品未获 traction、Xilinx 整合执行失误；上行侧另列市场复苏、服务器份额加速、新数据中心与嵌入式市场成功、PC 反转四条。

结论：**形式三件齐**（可复算公式＋输入数值＋具体风险条目），不构成 2241(c)(1) 缺失；薄弱处在倍数无辩护、风险无量化，须与 Q11 一并看。无需按形式不合规上报。

### 依据

- p.6｜For AMD, we apply a \~25x multiple to our FY2027 non-GAAP EPS estimate (\$9.25) equating to a \$235 price target.
- p.6｜Upside risks include market recovery, acceleration in server share, success in new datacenter and embedded markets, and/or reversal of PC fortunes. Downside risks include PC market declines, resumption of share losses, margin pressures, failure of new products to gain traction, or mis-execution on the Xilinx integration.
- p.7｜Bernstein brand stock ratings are based on a 12-month time horizon.

## Q8 · **评级分布三件**（三档占比 · 投行关系占比 · 观测时点）齐不齐？

三件齐，取自披露附表的 DISTRIBUTION OF EQUITY RATINGS/INVESTMENT BANKING SERVICES 表：

| 评级档（MAR/FINRA 对应） | 全球评级分布 | 投行关系占比* |
|---|---|---|
| Outperform（BUY） | 51.4% | 16.8% |
| Market-Perform／Neutral（HOLD） | 34.7% | 18.7% |
| Underperform（SELL） | 13.9% | 13.4% |

- **三档占比**：51.4 / 34.7 / 13.9（合计 100.0%）。
- **投行关系占比**：16.8 / 18.7 / 13.4；脚注定义为"每个评级档内、关联方在过去 12 个月提供过投行服务的公司占比"。
- **观测时点**：`As of December 31, 2025. All figures are updated quarterly.` 发布日 2026-02-24 距 2025-12-31 已超 15 天，用最近一个已结束季末，合规。

一处要点：**HOLD 档的投行关系占比（18.7%）高于 BUY 档（16.8%）**，SELL 档也有 13.4%，说明本机构"投行客户"并不集中在看多档，不宜以"BUY 占比高"推断利益冲突方向。本标的 AMD 落在 Market-Perform。

### 依据

- p.9｜<tr><td rowspan=1 colspan=1>Outperform</td><td rowspan=1 colspan=1>BUY</td><td rowspan=1 colspan=1>51.4%</td><td rowspan=1 colspan=1>16.8%</td></tr>
- p.9｜<tr><td rowspan=1 colspan=1> Market-Perform (Bernstein Brand) Neutral (Autonomous Brand)</td><td rowspan=1 colspan=1>HOLD</td><td rowspan=1 colspan=1>34.7%</td><td rowspan=1 colspan=1>18.7%</td></tr>
- p.9｜<tr><td rowspan=1 colspan=1>Underperform</td><td rowspan=1 colspan=1>SELL</td><td rowspan=1 colspan=1>13.9%</td><td rowspan=1 colspan=1>13.4%</td></tr>
- p.9｜As of December 31, 2025. All figures are updated quarterly.

## Q9 · **评级 / 目标价历史走势图**在不在（含赋改日期）？

**声明有图、文本层无数据，判未见**。披露附表中确有专节标题 `PRICE CHARTS / RATINGS AND PRICE TARGET HISTORY`，并点名本文标的在列："Prior to April 1, 2024, Sanford C. Bernstein & Co., LLC. issued the ratings and price target information in the graph(s) below for the following companies: Advanced Micro Devices Inc, NVIDIA Corp, Broadcom Inc and Meta Platforms Inc."——但**该页及后续各页的文本层只有这段声明，没有坐标、日期、评级或目标价数值**，图以位图形式存在。

因此三项要素均无法给出：覆盖期间不可读、变动条数不可读、最近一次变动日期不可读。唯一可确认的时间锚点是图注中的"2024-04-01 之前由 Sanford C. Bernstein & Co., LLC 发布"，即图形覆盖至少回溯到 2024 年 4 月之前（跨过实体更名），覆盖期超过一年、本应附三年图。

补充：本件另有一处时间序列线索——ticker table 给出相对表现 68.1%（vs SPX），但那不是评级/PT 历史，不能替代。

### 依据

- p.9｜PRICE CHARTS / RATINGS AND PRICE TARGET HISTORY
- p.9｜Prior to April 1, 2024, Sanford C. Bernstein & Co., LLC. issued the ratings and price target information in the graph(s) below for the following companies: Advanced Micro Devices Inc, NVIDIA Corp, Broadcom Inc and Meta Platforms Inc..
- p.2｜AMD (Advanced Micro)</td><td>M</td><td>USD</td><td>196.60</td><td>235.00</td><td>68.1%</td>

## Q10 · **九项冲突披露**在不在**首页**（或指明页码）？

首页未逐项披露，只有"See the Disclosure Appendix of this report for required disclosures"的指引；逐项内容在 DISCLOSURE APPENDIX（估值方法/风险、评级定义与分布、CONFLICTS OF INTEREST、OTHER MATTERS 四节）。本件披露属**逐票列名型**，关键是看名单里有没有本文标的：

- 持股 ≥0.5% 名单：**Broadcom Inc 与 Meta Platforms Inc**，**不含本标的 AMD**。
- 非投行服务报酬名单：**仅 NVIDIA Corp**，**不含 AMD**。
- 股权做市名单：**AMD、NVIDIA、Broadcom、Meta 四家全含**。
- 债务做市名单：**Broadcom 与 Meta**，**不含 AMD**。

逐项核对：

| 项 | 有/无 | 位置与内容 |
|---|---|---|
| ① 分析师及家庭持仓 | 未见（本标的） | CONFLICTS OF INTEREST 节只写"Stacy A. Rasgon maintains long positions in various crypto currencies"——是加密货币，不是标的证券；另有一句"An associate contributing to this report has a financial interest in the equity or debt securities of Meta Platforms Inc."，主体是 associate、标的是 META，**均不指向 AMD**，故判未见。 |
| ② 报酬是否挂钩投行收入 | 有（明确否认） | OTHER MATTERS 后段原文："Analysts are compensated based on aggregate contributions to the research franchise as measured by account penetration, productivity and proactivity of investment ideas. No analysts are compensated based on performance in, or contributions to, generating investment banking revenues."四要素齐：主体=全体分析师；口径=按研究贡献、不按投行收入；时点=当前政策；原文如上。 |
| ③ 近 12 个月主/副承销或收取投行报酬 | 未见（本标的层面） | 只有机构级汇总（评级分布表的 IB 关系占比），无"AMD 在过去 12 个月获得投行服务／担任承销角色"的逐票声明；CONFLICTS OF INTEREST 节三条名单均未把 AMD 列入投行/报酬项。相近的 IB 关系占比是分类汇总，无法落到本标的，故判未见。 |
| ④ 未来 3 个月是否寻求投行费 | 未见 | 附录各节无"seeks/intends to seek investment banking business in the next three months"一类句子；最接近的只有信息隔离墙与覆盖自主权声明（"It is at the sole discretion of the Firm as to when to initiate, update and cease research coverage"），与本项无关。 |
| ⑤ 近 12 个月非投行服务报酬 | 有名单，但不含本标的 | 原文："Bernstein has received compensation for non-investment banking securities-related products or services in the previous twelve months from the following clients: NVIDIA Corp."名单**只有 NVIDIA，不含 AMD**，故本标的判未见。 |
| ⑥ 是否客户及服务类型 | 未见 | 无"AMD 是本机构客户"及服务类型的声明；上列名单只解决报酬问题，未确认客户身份，判未见。 |
| ⑦ 实益持有该类普通股 ≥1% | 有相近声明，但标的与门槛均不符 | 原文："Bernstein Autonomous LLP or BSG France SA, beneficially, has either a net long or short position of 0.5% or more of the total issued share capital of a class of common equity securities of the following MiFID eligible securities: Broadcom Inc and Meta Platforms Inc.."——门槛是 **0.5%** 而非 1%，名单**是 AVGO、META，不含 AMD**，故本标的判未见。 |
| ⑧ 是否做市 | 有（含本标的） | 原文："Certain affiliates of Bernstein act as market maker or liquidity provider in the equities securities of: Advanced Micro Devices Inc, NVIDIA Corp, Broadcom Inc and Meta Platforms Inc.."四要素齐：谁=Bernstein 的关联方；什么=上述四家普通股（**含 AMD**）；何时=当前有效（报告日 2026-02-24）；原文如上。债务做市名单只列 AVGO、META，不含 AMD。 |
| ⑨ 分析师过去 12 个月是否从标的收酬 | 未见 | 认证段只否认报酬与"具体建议/观点"挂钩；附录无"分析师从 AMD 收取报酬"的句子；CONFLICTS OF INTEREST 节亦无此项。 |
| ⑩ 其他重大冲突 | 有 | 三项：其一，股权做市含 AMD（同上）；其二，"Bernstein Institutional Services LLC may act as principal for its own account or as agent for another person (including an affiliate) in sales or purchases of any security which is a subject of this report"，即以本金参与本标的交易；其三，本文属 Bernstein 与 Autonomous 双品牌体系，两品牌对同一标的可有不同观点（报告自述），引用时须认品牌。 |

红旗提示：该机构**对本标的股权做市**＋**以本金参与本标的交易**＋投行关系占比在 HOLD 档最高（18.7%）⇒ 引用其 MP/235 观点时立场折价。持股 ≥0.5% 与非投行报酬两项均**不含 AMD**，是本件相对"干净"的一面。

### 依据

- p.10｜Bernstein Autonomous LLP or BSG France SA, beneficially, has either a net long or short position of 0.5% or more of the total issued share capital of a class of common equity securities of the following MiFID eligible securities: Broadcom Inc and Meta Platforms Inc..
- p.10｜Bernstein has received compensation for non-investment banking securities-related products or services in the previous twelve months from the following clients: NVIDIA Corp.
- p.10｜Certain affiliates of Bernstein act as market maker or liquidity provider in the equities securities of: Advanced Micro Devices Inc, NVIDIA Corp, Broadcom Inc and Meta Platforms Inc..
- p.10｜Certain affiliates of Bernstein act as market maker or liquidity provider in the debt securities of: Broadcom Inc and Meta Platforms Inc..
- p.10｜Stacy A. Rasgon maintains long positions in various crypto currencies.
- p.6｜An associate contributing to this report has a financial interest in the equity or debt securities of Meta Platforms Inc..
- p.12｜Analysts are compensated based on aggregate contributions to the research franchise as measured by account penetration, productivity and proactivity of investment ideas. No analysts are compensated based on performance in, or contributions to, generating investment banking revenues.
- p.12｜Bernstein Institutional Services LLC may act as principal for its own account or as agent for another person (including an affiliate) in sales or purchases of any security which is a subject of this report.

## Q11 · 他的**风险章**挂了数字吗？

**没挂数字，属样板风险（不是缺口）**。RISKS 节对 AMD 列 **5 条下行 + 4 条上行**，全为方向句：下行＝PC 市场下滑、份额再度流失、毛利压力、新产品未获 traction、Xilinx 整合执行失误；上行＝市场复苏、服务器份额加速、新数据中心/嵌入式成功、PC 反转。无一条附百分点、金额、EPS 或 PT 影响，也**没有** WACC/永续增长率/目标倍数 ±1x 对 PT 的敏感度表（方法是 P/E，最该给的是"倍数 ±1x ⇒ PT ±\$9.25"，即 231.25±9.25，此为按 Q6 公式复算，原文未给）。

本件唯一带数字的敏感度是 Exhibit 1 的"每 GW 增量 EPS"矩阵（\$2.09–\$5.23），但它描述的是**交易增厚**而非**目标价风险**，且自设"无增量 opex"的乐观前提，不能当风险敏感度使用。

### 依据

- p.6｜Upside risks include market recovery, acceleration in server share, success in new datacenter and embedded markets, and/or reversal of PC fortunes. Downside risks include PC market declines, resumption of share losses, margin pressures, failure of new products to gain traction, or mis-execution on the Xilinx integration.
- p.3｜Calculation assumes no incremental opex, with direct fallthrough of incremental gross profit. Assumes 13% tax rate Source: Company reports, Bernstein estimates and analysis

## Q12 · 这份报告落在**静默期窗口**内吗？

**否**。判定依据：

- 发布日：**2026-02-24**（`First Published: 24 Feb 2026 16:05 UTC  Completion Date: 24 Feb 2026 16:05 UTC`；纸质版日期栏为 25-Feb-2026）。
- 本件性质：对客户间商业合作（AMD–META 6GW）的**当日事件点评**，AMD 侧为常规覆盖更新（MP/\$235，模型不动），非首评。
- 全文未见任何证券发行事件：无 IPO、无二次发行/增发、无承销团名单（Manager / Co-Manager / underwriting / follow-on 零命中）、无发行定价日，故 10 天/3 天窗口无从起算，判**不落窗**。
- 需注意的相近但不同之事：文中的"deal"指 AMD 与 META 的**供货与认股权证安排**（warrant for up to 160M shares issued to Meta），是公司间商业合约，不是本机构承销的证券发行，不构成静默期锚点。

### 依据

- p.1｜See the Disclosure Appendix of this report for required disclosures, analyst certifications and other important information. Alternatively, visit our Global Research Disclosure Website. First Published: 24 Feb 2026 16:05 UTC  Completion Date: 24 Feb 2026 16:05 UTC
- p.1｜The deal appears almost identical to the OpenAI deal announced last October down to the magnitude (6GW), timing (first shipments beginning 2H26 and “multi-year” horizon), and (unfortunately) equity giveaway (with a warrant for up to 160M shares issued to Meta depending on purchases and AMD stock price thresholds, ending at \$600).
- p.1｜We make no changes to our AMD model at this time. We rate AMD MP, \$235 PT. We rate META OP, \$900 PT.
