---
id: 03-broker-research-2026-03-16-2
cat: "03"
sub: broker-research
template: broker-research
template_version: 2
date: 2026-03-16
time: "00:00"
title: "03-broker-research-2026-03-16-2"
kind: "broker-research"
issuer: ""
ticker: META
source_pages: 17
---

> 骨架已生成，答案待填。原文：`corpus/materials/mineru/03-broker-research-2026-03-16-2/full.md`（17 页）。
> 填写纪律见 `docs/EVIDENCE-SPEC.md`：有答案必有依据块，块须逐字，页码 `p.N` 以源 PDF 为准。

## Q1 · 他的**关键假设取值**各是多少？

本件是 Bernstein 的单票观点件（标题问"Meta 是不是全球第一家 AI 导向组织"），估值表只给 EPS 与 P/E 两组，**没有损益表主体**。逐项：

- **收入增速**：表内未给该行（估值表只有 Reported EPS 与 Reported P/E，无收入行）。
- **毛利率**：表内未给该行。
- **营业利润率**：表内未给该行。
- **资本开支**：表内未给该行。
- **实际税率**：表内未给该行。
- **摊薄股数**：表内未给该行。
- **EPS（口径 Reported，非 adjusted）**：2025A 23.49 美元、2026E 30.87 美元、2027E 37.15 美元；对应报告 P/E 26.1x / 19.9x / 16.5x，价格基准 613.71 美元（2026/03/13 收盘，表头另标 TTM）。

本件真正在用的假设链是"裁员→成本→EPS 弹性"，逐条可取值：

- **裁员幅度**：以 20% 为测算基准。
- **组织扁平化目标**：传闻的拉伸目标为 50:1 员工/经理比，对照当前标准区间 7–15:1。
- **成本节省**：20% 裁员对应今年 2–4bn 美元、2027 年 5–8bn 美元。
- **EPS 弹性**：同口径下 2026 年 +3–5%、2027 年 +4–7%；但作者自己加了反向假设——节省大概率被再投入 AI 投资，而非落到利润。

六项中能取数的只有 EPS 与 P/E，其余四项（毛利率、营业利润率、税率、股数）本件确实没有，**不从 EPS 反推**。

### 依据

- p.2｜Ticker</td><td>Rating</td><td>Cur</td><td>Price</td><td> Target</td><td>Perf.</td><td>Cur</td><td>2025A</td><td>2026E</td><td>2027E</td><td>2025A</td><td>2026E</td><td>2027E</td></tr>
- p.2｜META (Meta)</td><td>0</td><td>USD</td><td>613.71</td><td>900.00</td><td>(16.2)%</td><td>USD</td><td>23.49</td><td>30.87</td><td>37.15</td><td>26.1</td><td>19.9</td><td>16.5</td></tr>
- p.3｜Even at a 20% reduction in headcount, Meta could realize \$2-4B in costsavings this year and \$5-8B in 2027, potentially worth 3-5% EPS upside in 2026 and 4-7% in 2027.
- p.3｜Reports hint of a stretch target to flatten the org further to 50:1 employee:manager ratios - well beyond the 7-15:1 ratios that is considered the standard range today.
- p.3｜But of course these outcomes assume the company pockets the savings, whereas it’s far more likely we see most of the savings redeployed into AIrelated investment.

## Q2 · **他和我差在哪一项、哪一年**？差多少？

我方模型数值不在本份材料内，逐行"他 vs 我"的对照需跨批（交主控）。

本材料内可做的对照只有一条，且**不是"他 vs 共识"**：估值表只有 Bernstein 自己的 EPS 与 P/E 两组（2025A / 2026E / 2027E），表头无 consensus / FactSet / Visible Alpha 列，来源行也只写"Bloomberg, Bernstein estimates and analysis"——Bloomberg 在这里是价格与原始数据源，不是共识口径。故做不出"他的估计 vs 报告所附共识"的差额表；本件也不是修订件，没有"他本期 vs 他上期"。

能取到的唯一相对量是目标价对现价：

| 项目 | 值 | 说明 |
|---|---|---|
| 目标价 | 900.00 美元 | 单点，无区间 |
| 参考价 | 613.71 美元（2026/03/13 收盘） | 隐含上行 46.6%（本卡按 900/613.71−1 推算） |
| 2026E / 2027E EPS | 30.87 / 37.15 美元 | 只有他的单点值，无共识可比 |

⇒ META 的差异落在收入端还是利润率端，本件无法判定——它连收入估计都不给，全部论证走成本端。**我方该项未定 ⇒ 记缺口**。

### 依据

- p.2｜Source: Bloomberg, Bernstein estimates and analysis.
- p.2｜META (Meta)</td><td>0</td><td>USD</td><td>613.71</td><td>900.00</td><td>(16.2)%</td><td>USD</td><td>23.49</td><td>30.87</td><td>37.15</td><td>26.1</td><td>19.9</td><td>16.5</td></tr>
- p.2｜Reported EPS</td><td colspan="3">Reported P/E (x)</td>

## Q3 · 他的**财年是谁的财年**？

**推定日历年、且是公司财年——但报告没把这件事写明。**

- 估值表列头是 2025A / 2026E / 2027E，只有年份加 A/E，**不标月末**；全表唯一日期是与价格对应的"13Mar 2026"及 TTM 标记。按手册口径，这种列头只能按日历年处理并注明"推定"，不得当作已确认。
- 全文无 "FYE"、"fiscal year ending" 或任何结账月表述，也未说明 EPS 是否按公司财年折算。
- 对比较的影响：若拿 2026E EPS 30.87 与日历年末共识并列，须先确认标的结账月为 12 月，本件不提供该确认；就本件内部而言，EPS 年号与 P/E 用的是同一套年份，内部自洽。

### 依据

- p.2｜13Mar 2026</td><td></td><td>TTM</td><td></td><td colspan="3">Reported EPS</td><td colspan="3">Reported P/E (x)</td></tr>
- p.2｜Ticker</td><td>Rating</td><td>Cur</td><td>Price</td><td> Target</td><td>Perf.</td><td>Cur</td><td>2025A</td><td>2026E</td><td>2027E</td><td>2025A</td><td>2026E</td><td>2027E</td></tr>

## Q4 · **预测修正**：改了哪一项、从多少改到多少？改的是**假设**还是**结论**？

**本件无预测修正，没有旧值可给。**

- 全文没有 old / new、prior / current、from $X to $Y、raise / lower our … estimate 句式；估值表只有一组 2025A/2026E/2027E，没有"上一版"列。
- 目标价 900 美元与 Outperform 评级都以单点出现，无"维持/上调/下调"表述，因此既不能证明结论变过，也不能证明没变——只能记"本件未披露修正"。
- 分层判定：**假设未改**（无估计修正）、**结论未改**（无 PT 调整声明）⇒ 对 META 本项不适用。
- 唯一近似"改"的动作在观点层：把裁员从"负面信号"重述为"AI 效率已兑现的证据"。这是框架变化，不是数字变化。

### 依据

- p.2｜META (Meta)</td><td>0</td><td>USD</td><td>613.71</td><td>900.00</td><td>(16.2)%</td><td>USD</td><td>23.49</td><td>30.87</td><td>37.15</td><td>26.1</td><td>19.9</td><td>16.5</td></tr>
- p.1｜We’d pivot the framing slightly as layoffs that may have been perceived as a negative signal in a stable period, could now be viewed as support that a company’s seeing tangible AI efficiency gains.

## Q5 · 他给了**情景**吗？各自驱动假设是什么？

**给了"条件式敏感性"，没给三档 PT。**

- 情景只有一档，且写成条件句：**若裁员 20% 且节省全部落袋** ⇒ 今年省 2–4bn、2027 年省 5–8bn，对应 2026 年 EPS +3–5%、2027 年 +4–7%。驱动变量是**人力成本**，不是收入或倍数。
- 作者随即否证落袋假设：节省"更可能被再投入 AI 投资"。所以这是一条**上限测算**，不是 base case。
- 另一条是组织假设而非财务假设：员工/经理比由当前 7–15:1 拉到 50:1 的"拉伸目标"，只有定性路径、无配套财务量化。
- **没有 Bull/Base/Bear 三档目标价**，也没有三档评级；900 美元为单点。故本件是**单情景＋一条敏感性**，无法做三档对照。
- 可推的一点：900 对 613.71 隐含 46.6% 上行，而 20% 裁员情景只值 3–7% 的 EPS ⇒ 目标价空间主要不在裁员，而在 2027e EV/Sales 8x 这个倍数——杠杆在倍数不在经营。

### 依据

- p.3｜Even at a 20% reduction in headcount, Meta could realize \$2-4B in costsavings this year and \$5-8B in 2027, potentially worth 3-5% EPS upside in 2026 and 4-7% in 2027.
- p.3｜But of course these outcomes assume the company pockets the savings, whereas it’s far more likely we see most of the savings redeployed into AIrelated investment.
- p.5｜We value Meta on a Price Target of \$900 using a 50/50 combination of 2027e EV/Sales multiple of 8x, and a DCF using a WACC of 10% and a terminal growth of 3.5%.

## Q6 · 他用了哪几种**估值方法**？**能互相印证吗**？

**两种方法，各占 50%**：

- **相对估值**：2027e EV/Sales 8x。口径是 2027e（前瞻财年，非 NTM），分母是 Sales 而非 EBIT/EBITDA。
- **绝对估值**：DCF，WACC 10%、永续增长率 3.5%。
- 两者 50/50 加权得 900 美元；并说明"META 主要是数字广告业务，按同业可比基准估值"。

**能否互相印证：不能判。** 报告只给加权后的 900 美元，没有分别披露 EV/Sales 法的每股价值与 DCF 的每股价值，也没有给 2027e 收入、净现金、股本等复算输入。因此只能说"用了两法并等权平均"，**不能说"两法得同一结果"**——两法是否印证在本件内不可验证。

可复算性：方法名与三项关键参数（8x、WACC 10%、g 3.5%）都在纸面上，属"方法可核、结果不可复算"。

### 依据

- p.5｜We value Meta on a Price Target of \$900 using a 50/50 combination of 2027e EV/Sales multiple of 8x, and a DCF using a WACC of 10% and a terminal growth of 3.5%.
- p.5｜We consider Meta primarily a digital advertising business and benchmark valuation to comparable peers in this industry set.
- p.2｜META (Meta)</td><td>0</td><td>USD</td><td>613.71</td><td>900.00</td><td>(16.2)%</td><td>USD</td><td>23.49</td><td>30.87</td><td>37.15</td><td>26.1</td><td>19.9</td><td>16.5</td></tr>

## Q7 · 目标价的**依据 / 估值方法解释 / 风险列示**齐不齐？

三件**基本齐**，但有一处不对称、一处不可复算：

1. **目标价由哪个方法算出**：有。900 = 50/50（2027e EV/Sales 8x ＋ DCF）。公式结构清楚，但缺各法单独结果，只能核方法、不能复算数值。
2. **方法的关键输入**：有。8x、WACC 10%、永续增长率 3.5% 三项都在；缺的是分母（2027e Sales）与股本口径，于是"倍数×指标=价格"这一步断在指标上。
3. **可能阻碍达成目标价的风险列示**：有，且是具体条目——(a) 反垄断等多项监管调查（主要在美国及海外）；(b) 数字广告成熟化、替代渠道以更优 ROI 抢预算、隐私政策变化（Cookie 贬值）压收入增速并引发 de-rating；(c) 元宇宙投入带来利润率逆风与潜在极低 ROIC。
   - **不对称**：META 只列 "Downside risk to our target price"，**未列 upside risk**；同一附录里 GOOGL、AMZN、Reddit、Snap 都写了双向风险。这是形式上的偏单向披露，记为瑕疵，不构成缺件。

⇒ 判：三件齐；引用时须注意"PT 不可复算（缺 2027e Sales）＋仅列下行风险"。

### 依据

- p.5｜We value Meta on a Price Target of \$900 using a 50/50 combination of 2027e EV/Sales multiple of 8x, and a DCF using a WACC of 10% and a terminal growth of 3.5%.
- p.6｜Signs that we’re reaching maturity in digital ads, increased competition as alternatives emerge with compelling ad ROIs, or further privacy related changes (e.g., Cookie depreciation) could all put press on Meta's revenue outlook resulting in compressing revenue growth and de-rating.
- p.6｜Meta's metaverse aspirations could lead to margin headwinds and potentially minimal ROIC, which could negatively affect both estimates and multiples.
- p.6｜Meta is currently under investigation in multiple regulatory proceedings now mostly focused on anti-trust domestically and abroad.

## Q8 · **评级分布三件**（三档占比 · 投行关系占比 · 观测时点）齐不齐？

**两件有、一件缺。**

- **三档占比（全公司；Bernstein 与 Autonomous 合并口径）**：Outperform / BUY 51.4%；Market-Perform（Bernstein 品牌）/ Neutral（Autonomous 品牌）/ HOLD 34.7%；Underperform / SELL 13.9%。
- **各类别中投行关系占比**：Outperform 16.8%、Market-Perform 18.7%、Underperform 13.4%。表头写作 "Investment Banking Relationships\*"，带星号。
- **观测时点：未见**。该表标题只写 "DISTRIBUTION OF EQUITY RATINGS/INVESTMENT BANKING SERVICES"，表内表下都无 "as of <日期>"；星号注释所在页在文本层只有页眉页脚（图表页），无可读脚注；全文也检索不到"截至某季末/某月"的表述。故无法判定它用的是哪一季，**三件缺观测时点**。
- 另注：该表只给百分比、不给绝对家数，无法反算覆盖股票数。

### 依据

- p.9｜DISTRIBUTION OF EQUITY RATINGS/INVESTMENT BANKING SERVICES
- p.9｜Outperform</td><td rowspan=1 colspan=1>BUY</td><td rowspan=1 colspan=1>51.4%</td><td rowspan=1 colspan=1>16.8%</td></tr>
- p.9｜Market-Perform (Bernstein Brand) Neutral (Autonomous Brand)</td><td rowspan=1 colspan=1>HOLD</td><td rowspan=1 colspan=1>34.7%</td><td rowspan=1 colspan=1>18.7%</td></tr>
- p.9｜Underperform</td><td rowspan=1 colspan=1>SELL</td><td rowspan=1 colspan=1>13.9%</td><td rowspan=1 colspan=1>13.4%</td></tr>
- p.9｜Global RatingDistribution</td><td rowspan=1 colspan=1>Investment BankingRelationships*</td>

## Q9 · **评级 / 目标价历史走势图**在不在（含赋改日期）？

**声明有图、文本层无数据 ⇒ 判未见。**

- 附录确有专节 "PRICE CHARTS / RATINGS AND PRICE TARGET HISTORY"，并点名本标的："Prior to April 1, 2024, Sanford C. Bernstein & Co., LLC. issued the ratings and price target information in the graph(s) below for the following companies: Alphabet Inc, Amazon.Com Inc, Meta Platforms Inc., Pinterest Inc and Snap Inc."
- 但该节及其后一页在文本层没有任何图内数据点、没有日期轴、没有变动条数——图是位图，抽取后为空页（只剩页眉页脚）。
- 故：**图在但不可读**。覆盖期间（2024/04/01 起为 Bernstein 品牌口径，之前为 Sanford C. Bernstein 口径）、变动条数、最近一次变动（日期/评级/PT）三项均无法取得。
- 另有一句可替代但不等价：信用评级的"全部投资建议与评级历史可应要求提供"——那是信用研究口径且需索取，不是随件披露。

### 依据

- p.9｜PRICE CHARTS / RATINGS AND PRICE TARGET HISTORY
- p.9｜Prior to April 1, 2024, Sanford C. Bernstein & Co., LLC. issued the ratings and price target information in the graph(s) below for the following companies: Alphabet Inc, Amazon.Com Inc, Meta Platforms Inc., Pinterest Inc and Snap Inc.
- p.9｜A list of all investment recommendations produced by the author(s) of this report alongside credit ratings history are available upon request.

## Q10 · **九项冲突披露**在不在**首页**（或指明页码）？

首页有指向语（"See the Disclosure Appendix of this report for required disclosures, analyst certifications and other important information"），未给具体页码；逐项内容在 Disclosure Appendix（REQUIRED DISCLOSURES → CONFLICTS OF INTEREST → 区域补充）。**本标的 META 只在三处出现，多数名单不含它**，逐项核对：

| 项 | 有/无 | 位置与内容 |
|---|---|---|
| ① 分析师及家庭持仓 | 有（未具名） | "An associate contributing to this report has a financial interest in the equity or debt securities of Meta Platforms Inc.."——**含本标的**，但只写 "an associate"，不点名、不给股数/比例，也不说明是署名分析师本人还是家庭成员。注意区域附录另有"署名分析师及亲属 do not have any financial interest in the subject company"，与本句口径相左，须主控裁 |
| ② 报酬是否挂钩投行收入 | 无 | 明确否认："No analysts are compensated based on performance in, or contributions to, generating investment banking revenues."；认证句另称报酬与具体观点"directly or indirectly"无关 |
| ③ 近 12 个月主/副承销或收投行报酬 | 公司层面有、**本标的未见** | 两句名单都只列 "Alphabet Inc and Amazon.Com Inc"：收到投行服务报酬、以及"Affiliates of Bernstein managed or co-managed in the past twelve months a public offering of securities"；**不含 Meta** |
| ④ 未来 3 个月是否寻求投行费 | 未见 | 查 CONFLICTS OF INTEREST 全段七条（SG 任 Alphabet 债券 Joint Bookrunner、0.5% 净头寸、AB 持 1%+、投行报酬、非投行报酬、主承销、投行客户关系）无 "next three months / intend to seek" 句；区域附录亦无。判未见（不是否认，是没写） |
| ⑤ 近 12 个月非投行服务报酬 | 公司层面有、**本标的未见** | "have received compensation for non-investment banking securities-related products or services in the previous twelve months from the following clients: Alphabet Inc and Amazon.Com Inc."——**不含 Meta** |
| ⑥ 是否客户及服务类型 | 公司层面有、**本标的未见** | "had an investment banking client relationship during the past twelve months with Alphabet Inc and Amazon.Com Inc."——服务类型为投行客户关系，**不含 Meta** |
| ⑦ 实益持有该类普通股 ≥1% | 未见 | 1% 以上名单只有一家："AB and/or its affiliates beneficially own 1% or more of a class of common equity securities of the following company: Reddit Inc."，**不含 Meta**。唯一相近声明是 Bernstein Autonomous LLP 或 BSG France SA 对 "Alphabet Inc, Meta Platforms Inc. and Reddit Inc." 持 0.5% 以上净多/净空头寸——阈值是 0.5% 非 ≥1%、且是净多空头寸不是实益持有，口径不符，故不算 |
| ⑧ 是否做市 | 有 | "Certain affiliates of Bernstein act as market maker or liquidity provider in the equities securities of: Alphabet Inc, Amazon.Com Inc, Meta Platforms Inc., Reddit Inc and Pinterest Inc."——**含本标的**；另有债务证券做市名单，亦含 Meta Platforms Inc. |
| ⑨ 分析师过去 12 个月是否从标的收酬 | 未见 | 只有认证句（报酬与具体观点无关）与"不按投行收入计酬"两句，均非"从标的公司收取报酬"。区域附录有一句 "have not received any compensation … from the subject company in the past 12 months"，但主体是 SCB India（印度主体）、内容是"没有"，与本项要确认的"Bernstein 分析师是否从 META 收酬"主体与方向都不同，故判未见 |
| ⑩ 其他重大冲突 | 有（一条涉本标的，两条不涉） | ①"SG and/or its affiliate.s is acting as Joint Bookrunner for Alphabet Inc's bond issue (EUR, 3, 6, 9, 13, 19, 39Y)"——标的是 Alphabet 债券，不涉 META；②META 在 0.5% 净多/净空名单内（见⑦）；③META 在股票与债务证券做市名单内（见⑧）；另有 associate 持 META 证券（见①） |

红旗提示：该机构对 META 做市（股票＋债务证券）＋有 associate 持有 META 证券＋自持 META 0.5% 以上净头寸 ⇒ 引用其 META 观点时立场折价；但**无 ≥1% 实益持股、近 12 个月无 META 投行费**，折价幅度应低于有投行关系的标的。

### 依据

- p.1｜See the Disclosure Appendix of this report for required disclosures, analyst certifications and other important information.
- p.5｜An associate contributing to this report has a financial interest in the equity or debt securities of Meta Platforms Inc..
- p.11｜SG and/or its affiliate.s is acting as Joint Bookrunner for Alphabet Inc's bond issue (EUR, 3, 6, 9, 13, 19, 39Y).
- p.11｜Bernstein Autonomous LLP or BSG France SA, beneficially, has either a net long or short position of 0.5% or more of the total issued share capital of a class of common equity securities of the following MiFID eligible securities: Alphabet Inc, Meta Platforms Inc. and Reddit Inc.
- p.11｜AB and/or its affiliates beneficially own 1% or more of a class of common equity securities of the following company: Reddit Inc.
- p.11｜Bernstein and/or affiliates have received compensation for investment banking services in the past twelve months from Alphabet Inc and Amazon.Com Inc.
- p.11｜Bernstein and/or affiliates have received compensation for non-investment banking securities-related products or services in the previous twelve months from the following clients: Alphabet Inc and Amazon.Com Inc.
- p.11｜Affiliates of Bernstein managed or co-managed in the past twelve months a public offering of securities of Alphabet Inc and Amazon.Com Inc.
- p.11｜Bernstein and/or affiliates had an investment banking client relationship during the past twelve months with Alphabet Inc and Amazon.Com Inc.
- p.12｜Certain affiliates of Bernstein act as market maker or liquidity provider in the equities securities of: Alphabet Inc, Amazon.Com Inc, Meta Platforms Inc., Reddit Inc and Pinterest Inc.
- p.12｜Certain affiliates of Bernstein act as market maker or liquidity provider in the debt securities of: Alphabet Inc, Amazon.Com Inc and Meta Platforms Inc..
- p.13｜Analysts are compensated based on aggregate contributions to the research franchise as measured by account penetration, productivity and proactivity of investment ideas. No analysts are compensated based on performance in, or contributions to, generating investment banking revenues.
- p.15｜Except as noted above, SCB India and/or its Associates (i.e., affiliates/group companies), the Research Analysts authoring this report, and their relatives

## Q11 · 他的**风险章**挂了数字吗？

**风险章本身没挂数字；量化弹性在正文，不在风险章。**

- 风险章（RISKS 节）对 META 三条全为方向句：监管调查、广告成熟化/替代竞争/隐私变化、元宇宙利润率逆风。**无一条附百分点或金额**，也无"若 X 变 ⇒ EPS/PT 变 Y%"的算式。
- 正文里唯一挂数字的是裁员情景：20% 裁员 ⇒ 2–4bn / 5–8bn 成本节省、2026 年 EPS +3–5%、2027 年 +4–7%。但作者自己加了"节省会被再投入"的反向限定，故这是**上限而非预期**。
- 目标价层面的敏感度完全缺失：没有 EV/Sales ±1x、WACC ±1%、永续增长率 ±0.5% 对 900 美元的影响。可自算部分：EV/Sales 由 8x 到 9x，其他不变时按等权法 PT 约升 6.25%（约 +56 美元至 956 美元），但这是**本卡自算**，报告未披露，不能算作风险章挂数字。

### 依据

- p.6｜Meta's metaverse aspirations could lead to margin headwinds and potentially minimal ROIC, which could negatively affect both estimates and multiples.
- p.6｜Meta is currently under investigation in multiple regulatory proceedings now mostly focused on anti-trust domestically and abroad.
- p.3｜Even at a 20% reduction in headcount, Meta could realize \$2-4B in costsavings this year and \$5-8B in 2027, potentially worth 3-5% EPS upside in 2026 and 4-7% in 2027.
- p.5｜We value Meta on a Price Target of \$900 using a 50/50 combination of 2027e EV/Sales multiple of 8x, and a DCF using a WACC of 10% and a terminal growth of 3.5%.

## Q12 · 这份报告落在**静默期窗口**内吗？

**否，不落窗。**

- 发布时点：2026 年 3 月 16 日 10:00 UTC（完成时点同日 02:49 UTC）；产品为常规单票观点更新，不是发行相关研究。
- 披露段与承销相关的只有一句，且**标的是 Alphabet 债券**（SG 任 Joint Bookrunner），与本标的 META 无关；META 在"投行报酬""主承销""投行客户关系"三份名单里**都不出现**。
- 全文没有 META 的发行类型、定价日或交割日，因此不存在"IPO 后 ≥10 天／二次发行后 ≥3 天"的比对基础；按现有材料判不落窗。
- 若主控要严格核：需另取 META 最近一次发行的定价日与本件发布日相减；本件不足以证明，也不足以排除。

### 依据

- p.1｜First Published: 16 Mar 2026 10:00 UTC  Completion Date: 16 Mar 2026 02:49 UTC
- p.11｜SG and/or its affiliate.s is acting as Joint Bookrunner for Alphabet Inc's bond issue (EUR, 3, 6, 9, 13, 19, 39Y).
- p.11｜Affiliates of Bernstein managed or co-managed in the past twelve months a public offering of securities of Alphabet Inc and Amazon.Com Inc.
