---
id: 03-broker-research-2026-03-02-AdvancedMicroDevicesIncTak
cat: "03"
sub: broker-research
template: broker-research
template_version: 2
date: 2026-03-02
time: "00:00"
title: "03-broker-research-2026-03-02-AdvancedMicroDevicesIncTak"
kind: "broker-research"
issuer: ""
ticker: META
source_pages: 16
---

> 骨架已生成，答案待填。原文：`corpus/materials/mineru/03-broker-research-2026-03-02-AdvancedMicroDevicesIncTak/full.md`（16 页）。
> 填写纪律见 `docs/EVIDENCE-SPEC.md`：有答案必有依据块，块须逐字，页码 `p.N` 以源 PDF 为准。

## Q1 · 他的**关键假设取值**各是多少？

产品型为个股跟踪更新（评级 Buy、12 个月目标价 US$310），无三档情景。假设取自 UBS 调整后损益表（US$m，`(UBS)` 口径为分析师调整数，非 local GAAP）：

- **收入增速**：FY25A +34.3%（收入 34,639）、FY26E +34.9%（46,724）、FY27E +51.5%（70,798）、FY28E +28.5%（90,981）。
- **毛利率**：FY26E 55.0%（毛利 25,678）、FY27E 54.2%（38,386）、FY28E 54.9%；FY25A 为 49.5%。
- **营业利润率**：以 EBIT(UBS) margin 计，FY26E 20.5%、FY27E 27.5%、FY28E 31.6%（EBIT 9,580 → 19,468 → 28,721）。
- **资本开支**：有形资本开支 FY26E–FY30E 均按 US$400m 平推（FY26E 同比 −58.9%，原文符号如此）；capex/revenue 由 FY26E 0.9% 降至 FY27E 0.6%、FY30E 0.3%。
- **实际税率**：表内 `Tax rate (%)` 行 FY23–FY27E 记 0.0、FY28E 起记 13.0，该行与相邻列疑为错位；按 Tax/Pre-tax 复算，FY26E 为 1,241/9,527≈13.0%、FY27E 为 2,523/19,363≈13.0%（推算，非表内该行原值）。
- **摊薄股数**：FY26E 1,655m（+1.2%）、FY27E 1,691m（+2.1%）、FY28E 1,734m；对应 EPS(UBS, diluted) 6.65 / 11.57 / 15.94。

建模驱动链条写在正文：C2027 出现第三个 GW 级客户（推测为 MSFT）＋ OAI/META 两笔 6GW 级订单，MI450 于 C2H26 起量；服务器 CPU 市场 5 年 18% CAGR 有上行空间；长期毛利率目标 55–58%，GPU 业务长期 OpM 约 35%。

### 依据

- p.3｜<tr><td>Revenues</td><td>22,680</td><td>25,785</td><td>34,639</td><td>46,724</td><td>34.9</td><td>70,798</td><td>51.5</td><td>90,981</td><td>106,387</td><td>122,516</td></tr>
- p.3｜<tr><td>Gross profit</td><td>10,460</td><td>12,725</td><td>17,152</td><td>25,678</td><td>49.7</td><td>38,386</td><td>49.5</td><td>49,939</td><td>59,614</td><td>70,092</td></tr>
- p.3｜<tr><td>EBIT (UBS)</td><td>401</td><td>1,900</td><td>3,694</td><td>9,580</td><td>159.3</td><td>19,468</td><td>103.2</td><td>28,721</td><td>36,886</td><td>45,794</td></tr>
- p.3｜<tr><td>Tax rate (%)</td><td>0.0</td><td>0.0</td><td>0.0</td><td>0.0</td><td>-</td><td>0.0</td><td>-</td><td>13.0</td><td>13.0</td><td>13.0</td></tr>
- p.3｜<tr><td>Average shares (diluted)</td><td>1,624</td><td>1,637</td><td>1,637</td><td>1,655</td><td>1.2</td><td>1,691</td><td>2.1</td><td>1,734</td><td>1,780</td><td>1,830</td></tr>
- p.3｜<tr><td>Tangible capital expenditure</td><td>(546)</td><td>(636)</td><td>(974)</td><td>(400)</td><td>58.9</td><td>(400)</td><td>0.0</td><td>(400)</td><td>(400)</td><td>(400)</td></tr>
- p.4｜<tr><td>Gross profit margin</td><td>46.1</td><td>49.4</td><td>49.5</td><td>55.0</td><td>54.2</td><td>54.9</td><td>56.0</td><td>57.2</td></tr>
- p.4｜<tr><td>Capex / revenue %</td><td>2.4</td><td>2.5</td><td>2.8</td><td>0.9</td><td>0.6</td><td>0.4</td><td>0.4</td><td>0.3</td></tr>

## Q2 · **他和我差在哪一项、哪一年**？差多少？

我方模型数值不在本份材料内，逐行"他 vs 我"的对照需跨批（交主控）。本材料内可核的对照是**他的 EPS 估计 vs 报告首页所附 Consensus（LSEG Eikon）**：

| 财年 | UBS | 共识 | 差额（UBS−共识） | 相对差 |
|---|---|---|---|---|
| 12/26E | 6.65 | 6.66 | −0.01 | −0.2% |
| 12/27E | 11.57 | 10.86 | +0.71 | +6.5% |
| 12/28E | 15.94 | 13.35 | +2.59 | +19.4% |

差异落点很清楚：**2026 年几乎完全一致（季度值 Q1–Q4 亦仅差 0.01–0.03），分歧集中在 2027–2028 年**，且随年份放大。由于 2026 年 EPS 与共识持平而 2027/2028 高出 6.5%/19.4%，差异不是来自当期利润率假设，而是来自 C2027 收入规模——即第三个 GW 级客户与 MI450/OAI-META 订单爬坡带来的收入增量（正文把 C2027 收入增速定在 +51.5%，共识显然没把这部分计入）。换言之：**他比我方（共识口径）多的是收入端、远期的量，不是利润率**。

### 依据

- p.1｜<tr><td>12/26E</td><td>6.65</td><td>6.66</td></tr><tr><td>12/27E</td><td>11.57</td><td>10.86</td></tr><tr><td>12/28E</td><td>15.94</td><td>13.35</td></tr>
- p.1｜<tr><td></td><td>12/26E</td><td></td></tr><tr><td></td><td>UBS</td><td>Cons.</td></tr>
- p.1｜<tr><td>Q3E</td><td>1.72</td><td>1.67</td></tr><tr><td>Q4E</td><td>2.30</td><td>2.29</td></tr>

## Q3 · 他的**财年是谁的财年**？

公司财年，且为**十二月结账**，等于日历年。估计表列头统一写 `12/23` `12/24` `12/25` `12/26E` … `12/30E`，即"年/月"格式的年末标记，无 fiscal year ending 之类错位提示；正文叙事用 `C2026` `C2027` `C2028` `C2030` 的日历口径（如 C2027 增速、C2030 服务器 CPU 市场 600 亿美元），与列头一致。因此其 FY 估计可直接与日历年共识比较，本份首页的 Consensus 列也是按 `12/26E`、`12/27E`、`12/28E` 同列对齐的。

### 依据

- p.3｜<tr><td>Income Statement (US$m)</td><td>12/23</td><td>12/24</td><td>12/25</td><td>12/26E</td><td>%ch</td><td>12/27E</td><td>%ch</td><td>12/28E</td><td>12/29E</td><td>12/30E</td></tr>
- p.1｜<tr><td>Highlights (US$m)</td><td>12/23</td><td>12/24</td><td>12/25</td><td>12/26E</td><td>12/27E</td><td>12/28E</td><td>12/29E</td><td>12/30E</td></tr>
- p.1｜We emerged more confident in revenue upside for C2027 as the company is now suggesting there could be a third GW-scale customer beyond the deals it has struck with OpenAI and META.

## Q4 · **预测修正**：改了哪一项、从多少改到多少？改的是**假设**还是**结论**？

本份是**半导体路演（Semis Bus Tour）后的跟踪更新，不是首评，也没有估计修订表**。全文唯一的显式修正表述是"目标价维持"：

- 结论层：12 个月目标价 **US$310，unchanged**（`PT $310 (unchanged)`），评级维持 Buy；算法亦未换（27x × C27E EPS 11.57）。
- 假设层：**未见任何 old→new 的收入/毛利率/EBIT/EPS 修订对照**，估计表只有单点值，`%ch` 列是同比增速而非修订幅度。故本份"改了什么"的答案是：**没改数，只加信息**（新增 META 6GW 订单、第三个 GW 客户、CPU 市场超预期三条事实），评级与目标价原地不动。
- 作为背景而非本份动作：历史评级/目标价表显示最近一次数字变动发生在 2026-02-04，PT 由 330.00 下调至 310.00（(310−330)/330 = **−6.1%**，原文未给百分比，此为我按两值复算），同日股价 200.19；本份（2026-03-02）在该次下调之后，未再动。

判定：**不重要**——观点没变、事实层没变，只是把客户订单与产能线索补进了叙事。若主控要追"他上期与本期的假设差"，本件无法提供，记缺口（单点估计，无对照）。

### 依据

- p.2｜Valuation: PT $310 (unchanged) Our PT remains at $310, derived from a 27x multiple applied to C27E EPS of $11.57.
- p.9｜<tr><td>2026-01-26</td><td>251.31</td><td>330.00</td><td>Buy</td></tr><tr><td>2026-02-04</td><td>200.19</td><td>310.00</td><td>Buy</td></tr>
- p.1｜12-month rating Buy *
- p.1｜12m price target US$310.00

## Q5 · 他给了**情景**吗？各自驱动假设是什么？

**单情景**：全文只给一个 12 个月目标价 US$310、一个评级 Buy，未设 Bull/Base/Bear，也未给三档 PT 或概率加权。唯一的"分情形"是方向性风险句：上行情形=云/数据中心渗透更快、AI 落地更好；下行情形=Intel 激进价格竞争压毛利、向 TSMC 转产不及时。两句都没有对应目标价、没有触发阈值、没有对 EPS/PT 的量化。

时点分层上有一处近似情景的判断：**2H:26 才是故事**——MI450 随 OpenAI 订单先起量、META 紧随其后，故 1H26 基本是空窗。这个"上半年弱、下半年强"是时间分布判断，不是三档估值情景。

差别落在哪：由于只有单点 PT，无法比较三档之间是收入差还是利润率差；但正文把上行空间明确归到 **C2027 收入规模**（第三个 GW 客户），把下行归到 **毛利率**（愿以毛利换份额），可视为他心目中的上下行分岔口分别在收入端与毛利率端。

### 依据

- p.5｜We value AMD based on a NTM P/E methodology. Upside risks to our AMD thesis include higher-than-anticipated penetration into cloud/data center servers and better traction in AI. Downside risks include margin pressure in the form of aggressive price competition from Intel and an inability to effectively shift production to TSMC in a timely manner.
- p.1｜Overall, we emerge confident in our $310 PT and Buy rating, though we do believe AMD is probably more of a 2H:26 story as MI450 shipments related to the OpenAI deal commence, followed shortly thereafter by META shipments.
- p.2｜On the margins side, AMD reiterated 55-58% LT GM target, but also noted that it is willing to trade GM for higher market share.

## Q6 · 他用了哪几种**估值方法**？**能互相印证吗**？

**只给一种方法**：P/E 相对估值，目标价 = 27x × C2027E EPS 11.57 = 312.4，取整报 US$310（复算：11.57×27=312.39；较 310 高 0.8%，属取整）。无 DCF、无 EV/EBITDA 交叉、无 SOTP，因此不存在"两法是否印证"的问题——单一方法无法自证。

两个输入均可落地复算：倍数 27x（未说明相对同业溢价理由，仅称"applied to"）；指标为 C27E EPS 11.57（UBS diluted 口径，对应净利润 19,564、摊薄股数 1,691m）。作为参照，表内 12/27E 的 P/E(UBS, diluted) 为 17.3x（按 200.21 股价），即目标价对应的是把当年倍数从 17.3x 抬到 27x。

一处口径不一致需点出：方法说明页写 "NTM P/E methodology"（未来十二个月），而目标价算式用的是 **C27E 全年 EPS**（2027 日历年），两者不是同一时间窗；按 NTM 口径（自 2026-03 起滚动 12 个月）应为 26/27 混合 EPS，低于 11.57，故 27x 实际是"C27 全年"倍数。这不影响复算，但说明方法描述与算式未对齐。

### 依据

- p.2｜Valuation: PT $310 (unchanged) Our PT remains at $310, derived from a 27x multiple applied to C27E EPS of $11.57.
- p.5｜We value AMD based on a NTM P/E methodology.
- p.4｜<tr><td>P/E (UBS, diluted)</td><td>38.9</td><td>47.6</td><td>36.5</td><td>30.1</td><td>17.3</td><td>12.6</td><td>10.3</td><td>8.6</td></tr>
- p.1｜EPS (UBS, diluted) (USD)

## Q7 · 目标价的**依据 / 估值方法解释 / 风险列示**齐不齐？

三件逐条判：

1. **目标价由哪个方法算出（可复算公式）**：有。`PT = 27x × C27E EPS 11.57`，可复算得 312.4，取整 310。方法名为 P/E 相对估值。
2. **方法的关键输入**：有，但只给了两个（倍数 27x、EPS 11.57），**缺倍数的选取理由**（为什么是 27x 而不是当前 17.3x、同业倍数区间、历史区间均未给），也缺 WACC/永续增长率（本方法不需要，可接受）。故输入"数值齐、论证缺"。
3. **可能阻碍达成目标价的风险列示**：有，且非纯模板句——具体到两条：Intel 激进价格竞争导致毛利承压；向 TSMC 转产不能及时有效完成。另有上行侧两条（云/数据中心渗透超预期、AI 落地更好）。**但四条全为方向句，无一条附百分点、金额或 EPS 影响**。

结论：**形式三件齐**（可复算公式 + 输入数值 + 具体风险条目），不构成 2241(c)(1) 缺失；缺陷在"倍数的选择理由"与"风险无量纲"，与 Q11 同一病灶。不需按形式不合规上报，但应在引用其 310 目标价时注明"倍数假设无辩护"。

### 依据

- p.5｜We value AMD based on a NTM P/E methodology. Upside risks to our AMD thesis include higher-than-anticipated penetration into cloud/data center servers and better traction in AI. Downside risks include margin pressure in the form of aggressive price competition from Intel and an inability to effectively shift production to TSMC in a timely manner.
- p.4｜<tr><td>P/E (UBS, diluted)</td><td>38.9</td><td>47.6</td><td>36.5</td><td>30.1</td><td>17.3</td><td>12.6</td><td>10.3</td><td>8.6</td></tr>
- p.8｜Equity Price Targets have an investment horizon of 12 months.

## Q8 · **评级分布三件**（三档占比 · 投行关系占比 · 观测时点）齐不齐？

三件齐，且全部取自披露表本身（UBS Global Research: Global Equity Rating Definitions 表）：

| 档位 | 覆盖率（占全球覆盖公司） | 该档中过去 12 个月有 IB 服务的占比 |
|---|---|---|
| Buy（FSR > MRA+6%） | 52% | 24% |
| Neutral（FSR 在 MRA ±6%） | 41% | 22% |
| Sell（FSR < MRA−6%） | 7% | 25% |

- **三档占比**：52 / 41 / 7，合计 100%。
- **投行关系占比**：24 / 22 / 25（按档列示，非单一合计），脚注明确为"该 12 个月评级档内、过去 12 个月获得投行服务的公司占比"。
- **观测时点**：`as of 31 December 2025`（原文 `Rating allocations are as of 31 December 2025`）。发布日 2026-03-02 距 2025-12-31 已超过 15 天，用的是最近一个已结束日历季末，无需回溯到 2025-09-30。
- 另有 Short-Term Rating 两档（Buy/Sell）覆盖与 IB 均 `<1%`，量级可忽略。

注意：Sell 档的 IB 占比（25%）高于 Buy（24%）与 Neutral（22%），说明"投行关系"与评级档无单调关系，不能据"Buy 多"推断"投行客户多"。

### 依据

- p.7｜<tr><td>Buy</td><td>FSR is &gt; 6% above the MRA.</td><td>52%</td><td>24%</td></tr>
- p.7｜<tr><td>Neutral</td><td>FSR is between -6% and 6% of the MRA.</td><td>41%</td><td>22%</td></tr>
- p.7｜<tr><td>Sell</td><td>FSR is &gt; 6% below the MRA.</td><td>7%</td><td>25%</td></tr>
- p.7｜Source: UBS. Rating allocations are as of 31 December 2025.
- p.7｜2:Percentage of companies within the 12-month rating category for which investment banking (IB) services were provided within the past 12 months.

## Q9 · **评级 / 目标价历史走势图**在不在（含赋改日期）？

**在，但以表格而非图形呈现**（文本层可读，无需依赖图形）。覆盖期间与变动条数：

- 覆盖期间：**2022-11-25 起至 2026-02-04**，跨 3 年余（超过一年，按规则须附三年）。
- 变动条数：共 **21 条**记录（其中 2023-05-26 一条为 `No Rating` 的临时中断，PT 记为 "-"，不算目标价变动），实际 PT/评级条目 20 条。
- 最近一次：**2026-02-04，评级 Buy，PT US$310.00**（股价 200.19）；紧接着前一条为 2026-01-26，Buy，PT 330.00。
- 期间极值可读：PT 低点 95.00（2022-11-25、2023-05-29），高点 330.00（2026-01-26）；2025 年内多次上调（155→265→300），2026 年 1 月冲高后回落至 310。
- 数据源与时点：`Source: UBS Global Research; LSEG Eikon as of 27-Feb-2026`，即表覆盖到 2026-02-04，价格为 2026-02-27 收盘。

### 依据

- p.8｜<tr><td>2022-11-25</td><td>75.14</td><td>95.00</td><td>Buy</td></tr><tr><td>2023-05-26</td><td>127.03</td><td>-</td><td>No Rating</td></tr>
- p.8｜<tr><td>2023-06-11</td><td>124.92</td><td>155.00</td><td>Buy</td></tr><tr><td>2023-07-23</td><td>110.95</td><td>150.00</td><td>Buy</td></tr>
- p.9｜<tr><td>2025-11-05</td><td>256.33</td><td>300.00</td><td>Buy</td></tr><tr><td>2026-01-26</td><td>251.31</td><td>330.00</td><td>Buy</td></tr><tr><td>2026-02-04</td><td>200.19</td><td>310.00</td><td>Buy</td></tr>
- p.9｜Source: UBS Global Research; LSEG Eikon as of 27-Feb-2026. All prices as of local market close. Ratings as of date shown.

## Q10 · **九项冲突披露**在不在**首页**（或指明页码）？

首页未逐项披露，只在页脚指向披露起点（"ANALYST CERTIFICATION AND REQUIRED DISCLOSURES … begin on page 7"），逐项内容在 Required Disclosures 及各国免责段。本件**不是逐票列名型**（Company Disclosures 表只列本标的 AMD.O 一行，附脚注 16、20），故不存在"名单含/不含本标的"的判断问题——而是"本标的只有两个注记、其余项无公司级披露"。逐项核对：

| 项 | 有/无 | 位置与内容 |
|---|---|---|
| ① 分析师及家庭持仓 | 未见 | 分析师认证段只声明观点独立、报酬与具体建议无关；披露附录全部各页无任何"分析师本人/家庭成员持有 AMD 证券"的句子。相近的只有一句通用句"UBS and its affiliates and employees may have long or short positions"，主体是 UBS 及员工整体，不是署名分析师及其家庭，故不算本项。 |
| ② 报酬是否挂钩投行收入 | 有（间接，且否认直接挂钩） | 全球研究免责声明段原文：报酬"is not based on investment banking revenues; however, compensation may relate to the revenues of UBS and/or its divisions as a whole, of which investment banking, sales and trading are a part"。四要素：主体=署名分析师；口径=不直接按投行收入、但可按含投行在内的全公司收入；时点=当前政策；故判"间接关联"。另瑞士辖区段称按瑞士银行公会指令，分析师报酬"generally upon the performance of (i) the new issues department or investment banking"，与该句方向相反，属辖区说明而非本件确认。 |
| ③ 近 12 个月主/副承销或收取投行报酬 | 有通用声明，无公司级确认 | 全球研究免责声明段有"Within the past 12 months UBS may have received or provided investment services and activities or ancillary services as per MiFID II…"。但 Company Disclosures 表对本标的只挂脚注 16（做市）与 20（波动率评级例外），**没有**"过去 12 个月提供投行服务/收取投行报酬"的注记，故无法落到"谁·何时·何种服务"，判"无法核验"。 |
| ④ 未来 3 个月是否寻求投行费 | 未见 | 披露附录无"seeks/expects to seek investment banking business in the next three months"一类句子；相近的只有首页"UBS does and seeks to do business with companies covered in its research reports"，是所有覆盖公司的通用立场句、无 3 个月窗口与费用意图，故不算。 |
| ⑤ 近 12 个月非投行服务报酬 | 有通用声明，无公司级确认 | 同一 MiFID 句覆盖"ancillary services"，未区分为非投行；印度辖区段有"may have received compensation for non-investment banking securities-related services"，但主体限定为"the subject Indian company/companies"，与本标的（美国公司 AMD）不符，不能计入。 |
| ⑥ 是否客户及服务类型 | 未见（本标的层面） | Company Disclosures 表无 client 注记；附录仅有辖区级通用句（如印度段"may have been a client/clients of UBS…"），主体与辖区均不指向本标的，判未见。 |
| ⑦ 实益持有该类普通股 ≥1% | 未见 | 全文检索无 "beneficially"／"1% or more of the common stock" 一类句子。唯一相近的是印度段"UBS may have… interests in investments… in the subject Indian company"，主体为印度辖区、标的为印度公司、且未给比例，与本项"母公司实益持有 AMD 普通股 ≥1%"三处不符，故判未见。 |
| ⑧ 是否做市 | 有 | 脚注 16：`UBS Securities LLC makes a market in the securities and/or ADRs of this company`。四要素齐：谁=UBS Securities LLC；什么=AMD 的证券及/或 ADR；何时=当前有效（价格日 2026-02-27）；原文如上。另全球研究免责声明段有非美市场"UBS may act as a market maker"的通用句，属补充。 |
| ⑨ 分析师过去 12 个月是否从标的收酬 | 未见 | 认证段只否认报酬与"具体建议/观点"挂钩，未提是否从标的公司收取任何报酬；附录无对应句。 |
| ⑩ 其他重大冲突 | 有 | 两项：其一，脚注 20——因该证券波动率高于平均，Buy 的 FSR 门槛设为 MRA+15%、Sell 为 MRA−15%（常规为 ±6%），属评级制度例外，直接影响评级可比性；其二，披露首页"UBS acts or may act as principal in the debt securities (or in related derivatives) that may be the subject of this report"，即可能以本金持有本标的债务工具。 |

红旗提示：该机构对本标的**做市**（脚注 16）＋评级门槛因高波动被放宽至 ±15%（脚注 20）＋过去 12 个月投行关系仅见通用声明无法核验 ⇒ 引用其 Buy/310 目标价时立场折价，且"Buy"的实际含义弱于常规 Buy。未见实益持股 ≥1%。

### 依据

- p.8｜<tr><td>Advanced Micro Devices Inc<sup>16,20</sup></td><td>AMD.O</td><td>Buy (CBE)</td><td>US$200.21</td><td>27 Feb 2026</td></tr>
- p.8｜16. UBS Securities LLC makes a market in the securities and/or ADRs of this company.
- p.8｜20. Because this security exhibits higher-than-average volatility, the FSR has been set at 15% above the MRA for a Buy rating, and at -15% below the MRA for a Sell rating (compared with 6/-6% under the normal rating system).
- p.11｜The compensation of the analyst who prepared this document is determined exclusively by UBS Global Research management and senior management (not including investment banking). Analyst compensation is not based on investment banking revenues; however, compensation may relate to the revenues of UBS and/or its divisions as a whole, of which investment banking, sales and trading are a part, and UBS as a whole.
- p.11｜Within the past 12 months UBS may have received or provided investment services and activities or ancillary services as per MiFID II which may have given rise to a payment or promise of a payment in relation to these services from or to this company.
- p.7｜UBS acts or may act as principal in the debt securities (or in related derivatives) that may be the subject of this report.
- p.12｜Within the past 12 months, UBS may have received compensation for non-investment banking securities-related services and/or non-securities services from the subject Indian company/companies.

## Q11 · 他的**风险章**挂了数字吗？

**没挂数字，属样板风险（不是缺口）**。风险集中在 `Valuation Method and Risk Statement` 一段，共 **4 条**，全为方向句：

- 上行 2 条：云/数据中心渗透高于预期；AI 落地更好。
- 下行 2 条：Intel 激进价格竞争造成毛利压力；向 TSMC 转产不能及时有效完成。

无一条附百分点、金额、EPS 或 PT 影响，四条均无法写成"若〔变量〕变 X ⇒〔某年〕EPS/PT 变 Y%"。本件也**没有** WACC ±1%、永续增长率 ±0.5%、目标倍数 ±1x 对 PT 的敏感度表——因为方法是 P/E 而非 DCF，最该给的"倍数 ±1x 对 PT 的影响"（1x × 11.57 = US$11.6，约占 310 的 3.7%，此为按 Q6 算式复算，非原文）也未给。方法页另声明敏感度分析"can be found on UBS Neo"，即本文件不含。

### 依据

- p.5｜We value AMD based on a NTM P/E methodology. Upside risks to our AMD thesis include higher-than-anticipated penetration into cloud/data center servers and better traction in AI. Downside risks include margin pressure in the form of aggressive price competition from Intel and an inability to effectively shift production to TSMC in a timely manner.
- p.11｜All material information in relation to published research reports, such as valuation methodology, risk statements, underlying assumptions (including sensitivity analysis of those assumptions), ratings history etc. as required by the Market Abuse Regulation, can be found on UBS Neo.

## Q12 · 这份报告落在**静默期窗口**内吗？

**否**。判定依据是发布日与发行日的关系，本件无发行事件：

- 发布日：**2026-03-02**（报告头 `2 March 2026`；推荐定稿时间 `02 March 2026 06:16 AM GMT`）。
- 本件性质：Semis Bus Tour 路演后的**常规覆盖跟踪更新**，不是首评、不是发行相关报告；全文未见任何 IPO/二次发行的发行日、定价日、承销团名单（Manager / Co-Manager / underwriting / follow-on 均无命中），Company Disclosures 表也无承销角色注记。
- 因不存在"发行日"这一锚点，10 天（IPO）/3 天（二次发行）窗口无从起算，判**不落窗**。
- 唯一相近的是首页通用句"UBS does and seeks to do business with companies covered in its research reports"，这是所有覆盖报告的立场声明，与发行静默期无关，不能据此判落窗。

### 依据

- p.1｜UBS does and seeks to do business with companies covered in its research reports. As a result, investors should be aware that the firm may have a conflict of interest that could affect the objectivity of this report.
- p.7｜This recommendation was finalized on: 02 March 2026 06:16 AM GMT.
- p.1｜This report has been prepared by UBS Securities LLC. * Exception to core rating bands; See Required Disclosures section.
