---
id: 03-broker-research-2025-10-24-1AlphabetInc
cat: "03"
sub: broker-research
template: broker-research
template_version: 2
date: 2025-10-24
time: "00:00"
title: "03-broker-research-2025-10-24-1AlphabetInc"
kind: "broker-research"
issuer: "Morgan Stanley & Co. LLC"
ticker: GOOGL
source_pages: 15
---

> 答案已填。原文：`corpus/materials/03-broker-research-2025-10-24-1AlphabetInc/content.md`（15 页）。
> 填写纪律见 `docs/EVIDENCE-SPEC.md`：有答案必有依据块，块须逐字，页码 `p.N` 以源 PDF 为准。
> 本件为 Morgan Stanley「Idea」事件点评（Anthropic 与 Google Cloud 的 TPU 扩容协议），评级 Overweight、目标价 US\$270（as of 2025-10-24，股价基准 2025-10-23 收盘 253.08）。评级与目标价只作背景。

## Q1 · 他的**关键假设取值**各是多少？

本件是**事件驱动点评**（Idea，正文 4 页＋两张 Risk Reward 页＋披露），**不是完整模型件**。他的「KEY EARNINGS INPUTS」只列出两行营业利润，手册要的六项里**五项未给该行**，第六项（营业利润率）也因无收入行而无法算出：

| 六项 | 取值 | 状态 |
|---|---|---|
| 收入增速 | — | **未给该行**（全篇无收入表；仅给 2026 年 Google Cloud 增速 **35%**，自述较 Street 高 **~700bps**，复算 Street ≈ 28%） |
| 毛利率 | — | **未给该行** |
| 营业利润率 | — | 只有营业利润绝对值，无收入分母，**不可算** |
| 资本开支 | — | **未给该行**（全篇无 capex 数字） |
| 实际税率 | — | **未给该行** |
| 摊薄股数 | — | **未给该行**；EPS 只有 FY2025e 一个点（见 Q2 的双值） |

能拿到的营业利润（US\$M，GAAP）：2024 **112,390** / 2025e **128,716** / 2026e **153,092** / 2027e **173,468**。同页还有一行 `GAAP Operating Income (Loss)` 为 **117,334 / 133,788 / 157,992 / 177,468**，两行逐年差 4,944 / 5,072 / 4,900 / 4,000，**口径未说明**（首行疑为经营口径、次行含其他项），引用必须标用哪一行。

真正值钱的是他算这笔交易的**三条联动假设**（不是六项会计假设）：

1. **合同规模与期限**：6 年、总额 **US\$50–80bn**（他按 GOOGL/META、META/CRWV 的合约长度推定 6 年）；
2. **单价与数量**：Ironwood TPUv7 的 ASP ≈ **US\$10k/芯片**，规模 **~1mn 芯片**（≈2026 年 TPU 产量的 30%）；
3. **上线节奏**：2026 年内上线占全年 **10%–50%**、价格 **US\$700–1,100/芯片/月**，对应 2026 年 Cloud 收入上修 **1%–9%**；2027 年全年贡献 **US\$9–13bn**。

复算校核（这是本件最有用的一处）：50–80bn ÷ 6 年 ÷ 1mn 芯片 ÷ 12 月 = **US\$694–1,111/芯片/月**，正是矩阵价格轴 \$700–\$1,100 的来源；50–80bn ÷ 6 = **US\$8.3–13.3bn/年**，与他说的 2027 年 9–13bn 同量级（下限差 0.7bn，属取整）。故那张 5×5 矩阵不是独立情景，而是「合同总额 ÷ 期限 ÷ 芯片数」三个假设的联动表。

### 依据

- p.1｜Even before the Anthropic announcement, we had forecast 35% '26 Google Cloud growth, \~700bps above Street.
- p.1｜depending on pricing and phasing of capacity online, we estimate the Anthropic relationship could add another \~100bps to 900bps upside to '26 Google Cloud revenue
- p.1｜with a full year \~\$9bn-\$13bn annual contribution likely in '27.
- p.1｜We assume the deal is 6 years given the length of deals like GOOGL/META and META/CRWV, which would imply \$50-\$80bn over the life of the contract, in line with reports of high tens of billions.
- p.1｜Given the size of the deal (\~1mn chips) and estimated ASP of \~\$10k for the Ironwood TPUv7
- p.2｜1mn TPUs represents \~30% of TPUs produced in 2026.
- p.2｜% Uplift to &#x27;26 Google Cloud Estimates
- p.6｜Total operating income (GAAP)(S, mm)</td><td>112,390</td><td>128,716</td><td>153,092</td><td>173,468</td>
- p.6｜GAAP Operating Income (Loss) ($, mm)</td><td>117,334</td><td>133,788</td><td>157,992</td><td>177,468</td>
- p.5｜Our DCF uses a \~8% WACC and a \~3% terminal growth rate (in line with other growth-oriented internet companies).

## Q2 · **他和我差在哪一项、哪一年**？差多少？

**我方模型数值不在本份材料内**，逐行「他 vs 我」的对照记缺口（交主控跨批）。本件能做的是三组可比的**他 vs 共识 / 他 vs 他自身上限**：

| 口径 | 他的值 | 对照值 | 差 | 落在哪一端 |
|---|---|---|---|---|
| 2026 年 Google Cloud 增速 | 35% | Street ≈28%（他自述高 ~700bps） | 约 +7pct | 收入端 |
| 2026 年 Cloud 收入上修（Anthropic 增量） | 1%–9%（上线 10%–50% × 单价 \$700–1,100） | 他的 35% 基线**未并入** | 上限 9pct | 收入端 |
| 2027 年 Anthropic 贡献 | US\$9–13bn | 合同均值 8.3–13.3bn | 同量级 | 收入端 |

**差异集中在收入端（云），不在利润率端**——他根本没给毛利率/费用行，利润侧无法对差。这决定了先核哪一项：**先核 Google Cloud 2026 年收入基数与增速**，因为 35% 与 28% 这 7 个百分点的分歧直接决定 1%–9% 的上修落在什么绝对额上。

第三组对照（FY2025e 三点，图内读数，文本层无值）：

- 收入 **397,359 / 395,138**（US\$M）
- 净利 **119,885 / 121,264**
- EPS **9.80 / 9.94**

该图标题为「MS ESTIMATES VS. CONSENSUS」，但两色的图例在文本层缺失，**无法判定哪一组是本机构估计**；三组差 −1.1% 到 +0.6%，均在 2% 容差内，不构成红灯。按纪律**两值并列、不取单值**（下方待核第 2 条）。

### 依据

- p.1｜Even before the Anthropic announcement, we had forecast 35% '26 Google Cloud growth, \~700bps above Street.
- p.1｜We assume the deal is 6 years given the length of deals like GOOGL/META and META/CRWV, which would imply \$50-\$80bn over the life of the contract, in line with reports of high tens of billions.
- p.6｜MS ESTIMATES VS. CONSENSUS
- p.6｜FY Dec 2025e
- p.2｜1mn TPUs represents \~30% of TPUs produced in 2026.
- p.2｜Here we note that Broadcom indicated the full \~\$10bn would be delivered in their fiscal 2H26 (May to October 2026) giving us a sense of the potential timing on the ramp in potential GOOGL revenues.

## Q3 · 他的**财年是谁的财年**？

**公司财年，十二月结账，等于日历年**。依据两处：估计表列头写 `2024 / 2025e / 2026e / 2027e`，另一处明写 `FY Dec 2025e`；Alphabet 自身财年即 12 月结，故列头年份可直接当日记年用，**无需换季**。

一处需注意但**不构成错位**：正文的 '25–'27 增速、'26/'27 增量一律是日历年口径；估值倍数用「'26 adjusted EBITDA」与「Avg. '26 and '27」，也是日历年。全文没有出现「fiscal year ending June」这类非 12 月结表述，故本件与日历年共识可直接比。

### 依据

- p.6｜FY Dec 2025e
- p.6｜Drivers</td><td>2024</td><td>2025e</td><td>2026e</td><td>2027e</td>
- p.1｜October 24, 2025 11:55 AM GMT
- p.5｜It implies a \~18X '26 adjusted EBITDA.

## Q4 · **预测修正**：改了哪一项、从多少改到多少？改的是**假设**还是**结论**？

**没有修订行，旧值 = 新值**。本件通篇无 old→new、prior→current、from \$X to \$Y 结构，也没有「raising/lowering our estimates」一句；相反，他明说 35% 的 2026 年 Cloud 增速是公告之前就有的，公告只是「再加 1%–9%」的上限测算。

三层判定：

- **结论层没动**：评级 Overweight、目标价 US\$270（as of 2025-10-24）维持。目标价历史上一次变动是 **2025-10-01 由 210 上调至 270**，发生在本件之前，属前作，不是本件的修正。
- **假设层没动**：收入、利润、倍数、WACC 全未改；Anthropic 的 9–13bn 只是「if」，没进表。
- **变的是信息集**：新增一笔合同 + 一张 1%–9% 的敏感性矩阵，属新增论据，不属修正。

故「从多少改到多少」在本件**无答案**；要给出真实修订幅度，须与 9 月末/10 月初那份「Search and Cloud Revisions Ahead」跨批对比（交主控）。仅方向无幅度，不得自补基数。

### 依据

- p.1｜Even before the Anthropic announcement, we had forecast 35% '26 Google Cloud growth, \~700bps above Street.
- p.1｜we estimate the Anthropic relationship could add another \~100bps to 900bps upside to '26 Google Cloud revenue
- p.5｜\$270.00PRICE TARGET
- p.12｜7/20/25:205;7/23/25:210;10/1/25:270
- p.12｜Stock and Industry Ratings(abbreviations below） appear as+Stock Rating/Industry View

## Q5 · 他给了**情景**吗？各自驱动假设是什么？

**三档齐全**，每档都带目标价、隐含倍数、驱动假设，另附期权隐含概率：

| 情景 | 目标价 | 隐含倍数 | 期权隐含概率 | 触发假设 |
|---|---|---|---|---|
| Bull | US\$335 | ~17x 平均 '26/'27 EBITDA | ~16.5% | 搜索/云加速、创新带来多重扩张与更高盈利力；新 AI 产品增量而非蚕食核心搜索；YouTube 与云以更高毛利贡献 |
| Base | US\$270 | ~16x 平均 '26/'27 | ~38.9% | 2026 年搜索「务实」增长、平台变现继续推进、Google Cloud 2026 年加速（新合作与 backlog） |
| Bear | US\$180 | ~11x 平均 '26/'27 | ~17.4% | 全球广告增速进一步放缓、费用纪律落空、AI 产品因低变现率与算力强度压低毛利 |

三档差别**落在收入增速与利润率两条线上，不是单一杠杆**：Bull 是「加速＋多重扩张」双驱动，Bear 是「广告放缓＋费用纪律失败＋AI 摊薄毛利」三杀，Base 居中。

两处必点：

1. **概率不可当分布用**：三者相加仅 72.8%，余下是「落在档位之间」的部分；且原文注明是**期权隐含的风险中性概率**（as of 2025-10-23），不是他的主观概率。
2. **倍数口径内部有张力**：目标价段说「implies a ~18X '26 adjusted EBITDA」，情景段说 Base 是「~16x 平均 '26/'27」。两者只有在 2027 年 EBITDA 比 2026 年高约 25% 时才自洽（18÷16=1.125 的平均关系，复算），可作一致性旁证；但材料未给 EBITDA 绝对值，无法复算到美元。

### 依据

- p.5｜Implied \~17X Avg. '26 and '27 bull case EBITDA.
- p.5｜Implied \~16X Avg. '26 and '27 base case EBITDA.
- p.5｜Implied \~11X Avg. '26 and '27 bear case EBITDA.
- p.5｜Faster innovation and Search/GCP acceleration lead to multiple expansion and higher earnings power.
- p.5｜Assumes pragmatic search revenue growth in '26, continued incremental platform monetization and Google Cloud acceleration in '26.
- p.5｜Global ad growth slows further and margins face pressure.
- p.5｜The probabilities of our Bull, Base, and Bear case scenarios playing out were estimated with implied volatility data from the options market as of 23 fiOct 2025.

## Q6 · 他用了哪几种**估值方法**？**能互相印证吗**？

**两种方法、一个目标价**：DCF ＋ 长期 EBITDA 倍数，组合成单一 PT，**未给两者权重**。

- **DCF**：WACC **~8%**、永续增长率 **~3%**（自述「与其它成长型互联网公司一致」）；
- **相对估值**：**16.3x** × 平均 '26/'27 调整后 EBITDA；
- 另有一句口径：目标价「implies a **~18X** '26 adjusted EBITDA」。

**不能互相印证**——可验的只有一层算术自洽：18x（单年 '26）与 16x（'26/'27 平均）在 2027 年 EBITDA 增长约 25% 时相容；两种方法的**绝对输入（FCF、EBITDA 美元值）都没给**，无法各自独立算出 270，故谈不上「两法互证」。

方法选择的理由也缺：为何 16.3x、为何 8% WACC，只给了「in line with other growth-oriented internet companies」这类相对说法，没有同业倍数表，也没有历史区间。目标价的时间跨度由评级定义处补足：**12–18 个月**。

### 依据

- p.5｜Our price target is determined using a discounted cash ow/discount to long-term EBITDA multiple. It implies a \~18X '26 adjusted EBITDA.
- p.5｜Our DCF uses a \~8% WACC and a \~3% terminal growth rate (in line with other growth-oriented internet companies). Our multiple based valuation uses a 16.3x multiple on Avg. '26 and '27 Adj. EBITDA
- p.11｜Unless otherwise specified, the time frame for price targets included in Morgan Stanley Research is 12 to 18 months.
- p.6｜RISKS TO PT/RATING

## Q7 · 目标价的**依据 / 估值方法解释 / 风险列示**齐不齐？

三件逐条：

1. **目标价由哪个方法算出**：**有**。DCF（8% WACC／3% g）＋ 16.3x 平均 '26/'27 EBITDA，并给出反推口径「implies ~18X '26 adjusted EBITDA」，方法链条完整。
2. **方法的关键输入**：**有数值、缺论证**。8%、3%、16.3x 三个输入都在，但为何取这些值只有一句「与其它成长型互联网公司一致」，无同业对照、无历史区间、无敏感性表（WACC ±1%、g ±0.5%、倍数 ±1x 对 PT 的影响一律未给）。
3. **可能阻碍达成目标价的风险列示**：**有，但为方向句**。分「RISKS TO UPSIDE」3 条与「RISKS TO DOWNSIDE」2 条，具体到 SMB/旅游敞口、分部披露改善，但无一条挂数字（详见 Q11）。

结论：**形式三件齐**（方法＋输入＋风险），不构成 2241(c)(1) 缺项，无需按形式不合规上报；薄弱点在**倍数与 WACC 无辩护**——这是「可复算但不可复核」的典型，引用时只能当他的假设，不能当依据。

### 依据

- p.5｜Our price target is determined using a discounted cash ow/discount to long-term EBITDA multiple. It implies a \~18X '26 adjusted EBITDA.
- p.5｜Our DCF uses a \~8% WACC and a \~3% terminal growth rate (in line with other growth-oriented internet companies).
- p.6｜RISKS TO UPSIDE
- p.6｜New products generate higher than expected top line contribution.
- p.6｜RISKS TO DOWNSIDE
- p.6｜High exposure to SMB and travel could pressure ad revenue in a recession

## Q8 · **评级分布三件**（三档占比 · 投行关系占比 · 观测时点）齐不齐？

**三件齐**，取自 Global Stock Ratings Distribution：

| 评级档（对应 MAR/FINRA） | 覆盖家数 | 占比 | 投行客户（IBC）家数 | 占 IBC 比 | 占该档比 | 其他重大服务客户（MISC） |
|---|---|---|---|---|---|---|
| Overweight / Buy | 1,499 | 41% | 389 | 46% | **26%** | 702（41%） |
| Equal-weight / Hold | 1,618 | 44% | 375 | 44% | **23%** | 782（45%） |
| Not-Rated / Hold | 4 | 0% | 1 | 0% | 25% | 1（0%） |
| Underweight / Sell | 577 | 16% | 88 | 10% | **15%** | 234（14%） |
| 合计 | 3,698 | — | 853 | — | — | 1,719 |

- **三档占比**：41% / 44% / 16%（另 Not-Rated 0%），原文注明四舍五入可能不足 100%。
- **投行关系占比**：按档 26% / 23% / 25% / 15%；注意「占 IBC 比」（46/44/0/10）与「占该档比」是两个不同分母，**不可混用**。
- **观测时点**：`as of September 30, 2025`。发布日 2025-10-24，距季末 24 天，超过 15 天，须用最近一个已结束季末——用的正是 9/30，**合规**。

一处要点：投行关系占比在 OW 档 26%、EW 档 23%，**UW 档反而最低（15%）**，说明投行客户不集中在看多档，不能据「OW 占比高」推断立场方向。

**易错提醒**：本件另一处有「Consensus Rating Distribution：84% Overweight / 16% Equal-weight / 0% Underweight」——那是**卖方共识分布**（图，非本机构），与本节 41/44/16 完全不是一回事，**不得**当本项答案。

### 依据

- p.11｜Global Stock Ratings Distribution
- p.11｜(as of September 30, 2025)
- p.11｜Overweight/Buy</td><td>1499</td><td>41%</td><td>389</td><td>46%</td><td>26%</td><td>702</td><td>41%</td>
- p.11｜Equal-weight/Hold</td><td>1618</td><td>44%</td><td>375</td><td>44%</td><td>23%</td><td>782</td><td>45%</td>
- p.11｜Underweight/Sell</td><td>577</td><td>16%</td><td>88</td><td>10%</td><td>15%</td><td>234</td><td>14%</td>
- p.11｜Investment Banking Clients are companies from whom Morgan Stanley received investment banking compensation in the last 12 months.

## Q9 · **评级 / 目标价历史走势图**在不在（含赋改日期）？

**有，且带日期**。这是本批少见的「图文俱全」情形：

- **图**：标题 `Stock Price, Price Target and Rating History (See Rating Definitions)`，横轴 10/01/2022–10/01/2025（三年），股价折线与目标价台阶叠加，图例为评级/行业观点组合（O/I、O/A）。
- **变动点（文字层逐条给出 12 个）**：1/31/24:165、4/26/24:195、7/22/24:210、7/24/24:205、9/2/24:190、10/30/24:205、1/12/25:215、2/5/25:210、4/16/25:185、7/20/25:205、7/23/25:210、**10/1/25:270**。
- **评级起始**：Alphabet 自 **2015-08-11** 起为 O（Overweight），此后无评级变动记录，故图上只有目标价台阶、无评级跳变。

覆盖期判定：三年窗口满足「首次评级起与三年取短」的要求，**形式合规**。

瑕疵两处：① 文字层 OCR 有三处日期/数字损坏（`7/24/4:205`、`10/3024:205`、`2/5/5:210`），需按上下文还原为 7/24/24、10/30/24、2/5/25；② 图形右侧台阶标签重叠（215/210、245/210），逐点读数不可靠，**以文字层日期序列为准**。

### 依据

- p.11｜Stock Price, Price Target and Rating History (See Rating Definitions)
- p.12｜1/31/24:165;4/26/24:195；7/22/24:210；7/24/4:205；9/2/24:190；10/3024:2051/12/25:215;2/5/5:210；4/16/25:185；
- p.12｜7/20/25:205;7/23/25:210;10/1/25:270
- p.14｜Alphabet Inc. (GOOGL.O)</td><td>0 (08/11/2015)</td><td>$253.08</td>
- p.11｜Underweight (U). The stock's total return is expected to be below the average total return of the analyst's industry (or industry team's) coverage universe, on a risk-adjusted basis, over the next 12-18 months.

## Q10 · **九项冲突披露**在不在**首页**（或指明页码）？

首页只有指引（「refer to the Disclosure Section, located at the end of this report」），逐项在文末 Disclosure Section，**符合「首页或指明页码」**。本件属**逐票列名型**，标的名在不在名单里直接决定有/无——本标的在多数名单内，这是它与「干净披露」相反的一面：

| # | 项 | 结论 | 内容 |
|---|---|---|---|
| ① | 分析师及家庭持仓 | **未见本标的** | 认证段只声明「未因表达特定建议/观点收取直接或间接报酬」；唯一持仓句是「某位可事先接触本报告的研究人员持有 Uber Technologies 证券（或相关衍生品）」，**主体非分析师本人、标的为 Uber**，故不指向 Alphabet |
| ② | 报酬是否挂钩投行收入 | **有（含限定）** | 原文两句须并读：报酬基于「研究质量、投资者反馈、选股、竞争因素、公司收入与**整体投行收入**」；同时「**不与**投行或资本市场交易、亦不与特定交易台盈利能力挂钩」。即基数含整体投行收入、但不与具体交易挂钩 |
| ③ | 近 12 个月主/副承销或收取投行报酬 | **有，含本标的** | 「managed or co-managed a public offering (or 144A offering) of securities of **Alphabet Inc.**…」；另有「received compensation for investment banking services from **Alphabet Inc.**…」 |
| ④ | 未来 3 个月是否寻求投行费 | **有，含本标的** | 「In the next 3 months, Morgan Stanley expects to receive or intends to seek compensation for investment banking services from Airbnb Inc, **Alphabet Inc.**…」 |
| ⑤ | 近 12 个月非投行服务报酬 | **有，含本标的** | 「received compensation for products and services other than investment banking services from Airbnb Inc, **Alphabet Inc.**…」 |
| ⑥ | 是否客户及服务类型 | **有，两类均含本标的** | 投行客户关系一项含 Alphabet；非投行、证券相关服务/客户关系一项亦含 Alphabet |
| ⑦ | 实益持有该类普通股 ≥1% | **有，含本标的** | 「As of **September 30, 2025**, Morgan Stanley beneficially owned **1% or more** of a class of common equity securities of…Airbnb Inc, **Alphabet Inc.**…」四要素齐（主体、截止日、比例门槛、证券类别＝普通股） |
| ⑧ | 是否做市 | **未见本标的** | 做市名单 13 家：Booking、Bumble、Criteo、DoubleVerify、FIGS、Integral Ad Science、Nextdoor、Opendoor、Playtika、Revolve、Shutterstock、Yelp、Zillow，**不含 Alphabet**。另有一句「以本金向客户买卖所覆盖证券」是通用声明，不能替代逐票做市确认 |
| ⑨ | 分析师过去 12 个月是否从标的收酬 | **未见** | 认证段只否认「为特定建议/观点收酬」，全文无「分析师自标的公司收取报酬」句 |
| ⑩ | 其他重大冲突 | **有** | 「An employee, director or consultant of Morgan Stanley is a director of **Alphabet Inc.**, eBay Inc.」，并注明此人非分析师、非分析师家庭成员 |

**红旗**：③④⑤⑥⑦ **五项全部含本标的**——近 12 个月既参与 Alphabet 证券发行、又收投行与非投行报酬、且自持 ≥1% 普通股，同时 ⑩ 有一名董事关联。这是本件最重的立场折价来源，与 ⑧「未见做市」并不矛盾（做市名单确实不含它）。引用其 OW/270 时应按此打折，且**不得**把 ⑦ 的 1% 门槛说成「未持股」。

### 依据

- p.1｜For analyst certification and other important disclosures, refer to the Disclosure Section, located at the end of this report.
- p.10｜The following analysts hereby certify that their views about the companies and their securities discussed in this report are accurately expressed and that they have not received and will not receive direct or indirect compensation in exchange for expressing specific recommendations or views in this report: Joseph Moore; Brian Nowak, CFA.
- p.13｜A member of Research who had or could have had access to the research prior to completion owns securities (or related derivatives) in the Uber Technologies Inc. This person is not a research analyst or a member of research analyst's household.
- p.10｜The equity research analysts or strategists principally responsible for the preparation of Morgan Stanley Research have received compensation based upon various factors, including quality of research, investor client feedback, stock picking, competitive factors, firm revenues and overall investment banking revenues.
- p.10｜Equity Research analysts' or strategists' compensation is not linked to investment banking or capital markets transactions performed by Morgan Stanley or the profitability or revenues of particular trading desks.
- p.10｜Within the last 12 months, Morgan Stanley managed or co-managed a public offering (or 144A offering) of securities of Alphabet Inc.
- p.10｜Within the last 12 months, Morgan Stanley has received compensation for investment banking services from Alphabet Inc.
- p.10｜In the next 3 months, Morgan Stanley expects to receive or intends to seek compensation for investment banking services from Airbnb Inc, Alphabet Inc.
- p.10｜Within the last 12 months, Morgan Stanley has received compensation for products and services other than investment banking services from Airbnb Inc, Alphabet Inc.
- p.10｜Within the last 12 months, Morgan Stanley has provided or is providing investment banking services to, or has an investment banking client relationship with, the following company: Airbnb Inc, Alphabet Inc.
- p.10｜Within the last 12 months, Morgan Stanley has either provided or is providing non-investment banking, securities-related services to and/or in the past has entered into an agreement to provide services or has a client relationship with the following company: Airbnb Inc, Alphabet Inc.
- p.10｜As of September 30, 2025, Morgan Stanley beneficially owned 1% or more of a class of common equity securities of the following companies covered in Morgan Stanley Research: Airbnb Inc, Alphabet Inc.
- p.10｜An employee, director or consultant of Morgan Stanley is a director of Alphabet Inc., eBay Inc. This person is not a research analyst or a member of a research analyst's household.
- p.10｜Morgan Stanley & Co. LLC makes a market in the securities of Booking Holdings Inc, Bumble Inc., Criteo SA, DoubleVerify Holdings Inc, FIGS, Inc., Integral Ad Science Holding Corp., Nextdoor Holdings Inc, Opendoor Technologies Inc, Playtika Holding Corp, Revolve Group Inc, Shutterstock Inc, Yelp Inc, Zillow Group Inc.

## Q11 · 他的**风险章**挂了数字吗？

**没挂数字，属样板风险（不是缺口）**。「RISKS TO PT/RATING」共 5 条，上行 3、下行 2，全部方向句：

- 上行：新产品收入贡献超预期；回购加码的资本回报；人均招聘/费用低于预期。
- 下行：SMB 与旅游敞口在衰退中压广告收入；Google 与 Other Alphabet 分部披露改善，未必降低整体投资强度。

无一条能写成「若〔变量〕变 X，则〔某年〕EPS 或 PT 变 Y%」。

可借的量化只有情景台阶（11x→180、16x→270、17x→335），但**不能当敏感度用**：三档对应的是各情景下**不同的 EBITDA 基数**，故倍数与 PT 不成线性——从 11x 到 16x 是 5 个倍数换 US\$90，从 16x 到 17x 是 1 个倍数换 US\$65（复算，原文未给）。倍数差 5 倍换 90、差 1 倍换 65，正说明基数不同，任何「1x ≈ \$X」的换算都会错。

DCF 侧同样无 WACC ±1%、永续 ±0.5% 对 PT 的敏感度表。结论：定性风险列示齐全、定量敏感度全缺，**样本板风险**，不上报为缺口。

### 依据

- p.6｜RISKS TO UPSIDE
- p.6｜Capital returns through greater share buybacks.
- p.6｜Hiring and/or spend per headcount is lower than expected.
- p.6｜RISKS TO DOWNSIDE
- p.6｜Improved disclosure around the Google and Other Alphabet segments may not decrease the overall investment activity of the business.
- p.5｜Implied \~11X Avg. '26 and '27 bear case EBITDA.
- p.5｜Implied \~17X Avg. '26 and '27 bull case EBITDA.
- p.5｜Global ad growth slows further and margins face pressure.

## Q12 · 这份报告落在**静默期窗口**内吗？

**无法判定 —— 发行时间线不明**。

- **发布时点**：2025-10-24 11:55 GMT，产品为 Idea（事件点评）。
- **标题事件不是证券发行**：Anthropic 与 Google Cloud 的 TPU 容量协议（最高 100 万颗 TPU、商谈额数百亿美元），是公司间商业合同，**不构成静默期锚点**——不能拿「deal」二字当发行。
- **但披露里有一句必须盯**：「Within the last 12 months, Morgan Stanley managed or co-managed a public offering (or 144A offering) of securities of **Alphabet Inc.**」。这说明近 12 个月内本机构确曾参与 Alphabet 的证券发行，而**材料未给发行日、发行类型（IPO/二次/144A）、亦未说明本机构是否为主承销**，10 天/3 天窗口无从起算。

处置：不判「落窗/不落窗」，按「发行时间线不明」登记，交主控外部核 SEC 发行文件日期（下方待核第 1 条）。判定要点：若该发行是二次/144A 且定价日落在 2025-10-21 之后（3 天窗口），或属 IPO 且定价日落在 2025-10-14 之后（10 天窗口），则本件属**窗口内发布**，须有合规事先授权或构成瑕疵；两种情形材料均未交代。

### 依据

- p.1｜October 24, 2025 11:55 AM GMT
- p.1｜including an agreement to access up to 1 million TPUs to provide additional capacity required to train and serve next generations of Claude models.
- p.1｜Through this deal worth tens of billions of dollars, Anthropic expects to have well over a gigawatt of capacity online in 2026.
- p.10｜Within the last 12 months, Morgan Stanley managed or co-managed a public offering (or 144A offering) of securities of Alphabet Inc.
- p.10｜Within the last 12 months, Morgan Stanley has received compensation for investment banking services from Alphabet Inc.
