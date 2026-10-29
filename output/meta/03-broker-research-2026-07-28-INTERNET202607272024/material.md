---
id: 03-broker-research-2026-07-28-INTERNET202607272024
cat: "03"
sub: broker-research
template: broker-research
template_version: 2
date: 2026-07-28
time: "00:00"
title: "03-broker-research-2026-07-28-INTERNET202607272024"
kind: "broker-research"
issuer: ""
ticker: META
source_pages: 23
---

> 骨架已生成，答案待填。原文：`corpus/materials/mineru/03-broker-research-2026-07-28-INTERNET202607272024/full.md`（23 页）。
> 填写纪律见 `docs/EVIDENCE-SPEC.md`：有答案必有依据块，块须逐字，页码 `p.N` 以源 PDF 为准。

## Q1 · 他的**关键假设取值**各是多少？

本件是 Morgan Stanley 的行业框架件（Internet / North America，行业观点 Attractive），把 AMZN、GOOGL、MSFT、META 四只放在同一篇里，每只两页 Risk Reward。所以关键假设分两层写：框架层的单位经济假设（这是本件真正的新东西），与 META 的盈利输入行。

**框架层——单 GW GB300 数据中心租出去（GPU IaaS）的单位经济**：年 8,760 小时 × 单 GW 41.03 万颗 GB300 = 36 亿 GPU 小时，利用率固定 75%；GPU 时租价做五档弹性 $7.0 / $8.0 / $8.5 / $9.0 / $10.0，对应单 GW 收入 $18.9 / 21.6 / 22.9 / 24.3 / 27.0bn。成本端刚性：IT 折旧 $5 + 非 IT 折旧 $1 + 能源与其他运营 $2 = $7.6bn/GW。结果：增量 EBIT $11.2–19.3bn，增量 EBIT 利润率 60%→72%，税率 21%，NOPAT $8.9–15.3bn。资本端：单 GW 总资本开支 $39bn（IT $23bn 按 5 年折、非 IT $16bn 按 15 年折）。产出：ROIC 23% / 28% / 31% / 34% / 39%。

**框架层——模型 API**：自有算力做模型 API 给 70%+ 增量 EBIT 利润率、40%+ ROIC；第三种情形（API 跑在第三方算力）单列另算。关键弹性是"用于推理的算力占比""每 GPU 每秒 token 吞吐""token 单价"三个，且他明确考虑 token 单价与吞吐的反向关系。

**META 的盈利输入（Dec 财年）**：不变币收入增速 22.5% / 26.0% / 22.0% / 19.8%（Dec25 / Dec26e / Dec27e / Dec28e）；GAAP 营业利润 83,276 / 92,216 / 101,748 / 104,841 百万美元；全家族日活 2,239.9 / 2,294.5 / 2,344.5 / 2,389.2 百万。

**缺项（材料未给出该行，不倒推）**：毛利率、营业利润率（只给营业利润绝对额、不给率）、公司级资本开支（只有框架的 $39bn/GW 单位 capex，不是 META 的 capex 预算）、摊薄股数——这四项本件未给。表内的 21% 税率是框架假设，不是 META 的有效税率，不能当公司假设用。

### 依据

- p.1｜We are bullish these investments as 3 new bottom-up GenAI ROIC frameworks across GPU IaaS and model APIs show paths to 25-50% ROIC.
- p.2｜1. Hyperscaler GPU Rental (IaaS): 70% Incremental EBIT Margins and 30%+ ROIC
- p.2｜we estimate this business can generate ~60-70% incremental EBIT margins and ROIC of 25%-40%.
- p.3｜(X) Est. Price/Hour $7.0 $8.0 $8.5 $9.0 $10.0 (=) Revenue/GW $18.9 $21.6 $22.9 $24.3 $27.0
- p.3｜(=) Total Opex/GW $7.6 $7.6 $7.6 $7.6 $7.6
- p.3｜Incremental EBIT Margins 60% 65% 67% 69% 72%
- p.3｜(X) Tax Rate 21% 21% 21% 21% 21%
- p.3｜Total Capex (IT + Non IT) $39 $39 $39 $39 $39
- p.3｜ROIC (NOPAT / Total Capex) 23% 28% 31% 34% 39%
- p.3｜2. A Model Enabled API Business: 70%+ Incremental EBIT Margins and 40%+ ROIC
- p.13｜Drivers</td><td colspan="4">Dec2025 Dec2026e Dec2027e Dec2028e
- p.13｜Constant Currency % Growth (%)</td><td>22.5</td><td>26.0</td><td>22.0</td><td>19.8
- p.13｜Operating income (GAAP) ($, mm)</td><td>83,276</td><td>92,216</td><td>101,748</td><td>104,841
- p.13｜Consolidated Total Daily Active Users (mm)</td><td>2,239.9</td><td>2,294.5</td><td>2,344.5</td><td>2,389.2

## Q2 · **他和我差在哪一项、哪一年**？差多少？

我方模型数值不在本份材料内，逐行"他 vs 我"的对照需跨批（交主控）。本件可核的是"他 vs 共识"，但只有三处能逐字对上，其余缺口要标出来：

| 项目 | 他 | 共识 | 差额 | 口径与年限 |
|---|---|---|---|---|
| 目标价（META） | $775 | 均值 $664.46（图上另标 $1,015.00） | +16.6%（自算） | 12–18 个月，非财年 |
| 评级（META） | Overweight，标 Top Pick | 88% OW / 12% EW / 0% UW | — | 卖方共识评级分布，非 MS 自身分布 |
| 2026e EPS | 32.49 | 32.95 | −1.4%（自算） | FY Dec 2026e |

三点必须写清：

1. 上表第三行取自 META 页的"MS ESTIMATES VS. CONSENSUS"表，该表表头只剩"FY Dec 2026e"一格、四个数据列没有逐年标签，首列与末列（237,140 / 269,079 一行、114,318 / 170,068 一行）无年份标注。故 MS 与共识的配对是按行内上下位置推定，不是原表明确标注——这是本件的文本层缺口，收入与 EBITDA 两行因此不敢硬对。
2. 差异的方向：目标价比共识高 16.6%，但 2026 年 EPS 比共识低 1.4% ⇒ 他贵在倍数不在盈利，与"Top Pick + 结构性效率改善"的叙事一致，属观点差不是数字差。
3. 同一篇里另三只的目标价是 MSFT $600、AMZN $330、GOOGL $400，但那是三个不同标的、三套算法（FY28e EPS×25x、'27/'28 EPS×约 25x、约 24x 加溢价），不能横向当"他 vs 我"的偏差用。

### 依据

- p.12｜$775.00PRICE TARGET Our price target is determined using a discounted cash ow/long-term EBITDA multiple.
- p.12｜$664.46 $1,015.00 MS PT Morgan Stanley Estimates Mean
- p.12｜88% Overweight 12% Equal-weight 0% Underweight
- p.12｜Consensus Price Target Distribution
- p.13｜MS ESTIMATES VS. CONSENSUS<table><tr><td colspan="4">FY Dec 2026e
- p.13｜EPS ($)</td><td rowspan="2">28.74</td><td>32.49</td><td rowspan="2">38.62</td></tr><tr><td>32.95
- p.8｜$600.00PRICE TARGET 25x Base Case FY28e EPS of $23.86
- p.10｜$330.00PRICE TARGET Our $330 PT is based on applying a ~25X
- p.14｜$400.00PRICE TARGET Our $400 PT is based on applying a ~24X

## Q3 · 他的**财年是谁的财年**？

公司财年，十二月结账，等于日历年。META 的关键输入表列头写 "Dec2025 / Dec2026e / Dec2027e / Dec2028e"，场景段的隐含倍数用 "blended '27/'28 P/E"，即财年截止 12 月 31 日。

可直接与日历年末共识比，但有两处口径要注意：
- 目标价的时限不是财年，是"12 至 18 个月"（评级定义段明确），所以 $775 不能挂在某个财年末上；
- 场景倍数用的是"混合 '27/'28"，即跨两个财年的 blended P/E，不是单一年份，引用时要标清，否则与单年 P/E 不可比。

### 依据

- p.13｜Drivers</td><td colspan="4">Dec2025 Dec2026e Dec2027e Dec2028e
- p.12｜Implied ~23X base case blended '27/'28 P/E
- p.18｜Unless otherwise specified, the time frame for price targets included in Morgan Stanley Research is 12 to 18 months.

## Q4 · **预测修正**：改了哪一项、从多少改到多少？改的是**假设**还是**结论**？

本件未改估计，也没有旧值→新值对照。它是框架发布件（三套 GenAI ROIC 模型首次推出），四只标的的评级与目标价都是既有值，正文没有任何 raise / lower our estimates 句式，META 页只给单套 Dec25–Dec28e 数字，没有 prior 列。

可核的历史变动只有一条，且**不是本件动作**：META 目标价在评级历史里 2026-01-29 记 $825、2026-03-29 记 $775，即 −6.1%（自算，(775−825)/825）。这条只见结论变动、不见对应假设变动（历史表只记目标价与评级，不记 EPS 或利润率改动），所以按纪律只能记"仅知结论、不知假设"，不能推断是估值假设还是盈利假设改的。

分层判定：**假设没变、结论也没在本件变**——本件为零修正，属框架件的信息增量而非估计修正。若需 old→new，只能取上一份 META 覆盖报告，本仓库无，跨批交主控。

### 依据

- p.20｜Stock Rating History: 7/1/21:0/I; 10/27/22: E/I; 3/20/23:0/I; 10/22/23:0/A
- p.20｜12/10/25 :750: 1/29/26:825:3/29/26:775
- p.12｜Our price target is determined using a discounted cash ow/long-term EBITDA multiple.
- p.13｜Drivers</td><td colspan="4">Dec2025 Dec2026e Dec2027e Dec2028e

## Q5 · 他给了**情景**吗？各自驱动假设是什么？

给了，META 三档齐备，三档都用"混合 '27/'28 P/E"做标尺：

| 档位 | 目标价 | 隐含倍数 | 驱动假设 |
|---|---|---|---|
| Bull | $1,000 | ~29x blended '27/'28 | AI 投入带动参与度与新产品（click-to-message），广告变现超预期，效率改善再叠加，Reels 变现缺口收窄 |
| Base（=PT） | $775 | ~23x blended '27/'28 | '26 年广告收入增约 27%，AI 投资驱动 Reels 参与度与测量归因改善，继续控费并盘活数据中心产能 |
| Bear | $450 | ~15x blended '27/'28 | 参与度下滑或 Reels 变现慢于预期、宏观不确定、广告定向受限的监管、数据中心建设失手导致资本强度上升且 ROIC 低 |

差别落在哪：三档倍数从 15x 到 29x（约 1.9 倍），目标价从 $450 到 $1,000（约 2.2 倍），而三档的经营假设（广告增速、参与度、资本强度）都没有量化到具体百分点 ⇒ 杠杆主要挂在倍数上，经营假设只是方向性叙述。这与 Q11 的判断互相印证。

另三只同篇也有三档，但档位数值只在各自的 Risk Reward 页，跨标的不可直接比。

### 依据

- p.12｜BULL CASE $1,000.00 Implied ~29x blended '27/'28 P/E
- p.12｜BASE CASE $775.00 Implied ~23X base case blended '27/'28 P/E
- p.12｜BEAR CASE $450.00 Implied ~15x blended '27/'28 P/E
- p.12｜Ad revenue grows ~27% in '26 as META's AI investments drive incremental Reels engagement/monetization

## Q6 · 他用了哪几种**估值方法**？**能互相印证吗**？

META 用的是"贴现现金流 / 长期 EBITDA 倍数"两种口径合一的方法：目标价由一个 DCF 折出，再用长期 EBITDA 倍数交叉，最后折算成约 23x '27 P/E 供横向比较。输入给到了关键两个：DCF 用约 8% 的 WACC、约 3% 的永续增长率，隐含约 23x '27 P/E。

能不能互相印证：**只能部分印证**。理由是——两种口径没有各自独立的输出值（既没给 DCF 单独算出的每股价值，也没给 EBITDA 倍数的具体倍数与对应 EBITDA 基数），只给了一个合并结果 $775 与一个换算后的 23x。没有两套独立数字，就无法判断"两法是否得同一结果"，只能说方法名义上是双口径、实际只有一个可核输出。

跨标的对照更说明问题：同篇四只标的方法并不统一——MSFT 是 25x 基础情景 FY28e EPS $23.86，AMZN 是约 25x '27/'28 EPS，GOOGL 是约 24x 加对同业中位数的溢价，只有 META 走 DCF + 长期 EBITDA 倍数。所以"能互相印证"在本件里不成立，同篇内部的横向可比性也弱。

### 依据

- p.12｜Our price target is determined using a discounted cash ow/long-term EBITDA multiple. It implies a ~23x '27 P/E Multiple. Our DCF uses an ~8% WACC and a ~3% terminal growth rate
- p.8｜25x Base Case FY28e EPS of $23.86
- p.10｜Our $330 PT is based on applying a ~25X
- p.14｜Our $400 PT is based on applying a ~24X

## Q7 · 目标价的**依据 / 估值方法解释 / 风险列示**齐不齐？

三件齐，但第三件偏薄。

1. **方法**：有——DCF / 长期 EBITDA 倍数，且给了 WACC 约 8%、永续增长率约 3%，并把结果折算成约 23x '27 P/E。可复算程度：部分。给了折现率与永续增长率，但没给现金流明细、EBITDA 口径与长期倍数取值，所以只能验算"$775 是否约等于 23x '27 EPS"，不能从零复现 DCF。
2. **关键输入**：有——WACC 8%、g 3%、隐含 23x '27 P/E，另有三档的 29x / 23x / 15x 标尺；三档目标价与对应倍数都列在同一处，可交叉读。缺的是具体 EBITDA 基数与终值权重。
3. **风险列示**：有但薄——下行风险正式条目只有 1 条（执行失手推高长期资本强度、ROIC 低），另加三条模板风险（宏观与消费走弱、监管限制广告定向、Reality Labs 亏损扩大）；上行侧给了 4 条。风险条目与目标价之间的传导（哪一条会让目标价从 775 掉到多少）完全没有，靠 Bear 档 $450 间接兜底。

判：形式齐备，实质偏薄——方法解释到"折现率 + 永续增长率 + 隐含倍数"这一层就停了，没到可复现的现金流层。

### 依据

- p.12｜Our price target is determined using a discounted cash ow/long-term EBITDA multiple. It implies a ~23x '27 P/E Multiple. Our DCF uses an ~8% WACC and a ~3% terminal growth rate
- p.13｜RISKS TO DOWNSIDE Mis-execution risk could result in higher LT capital intensity
- p.13｜RISKS TO UPSIDE Faster than expected Reels monetization & higher engagement growth

## Q8 · **评级分布三件**（三档占比 · 投行关系占比 · 观测时点）齐不齐？

三件齐备，取自 Morgan Stanley 的全球评级分布表（机构级，不是数本报告里的股票条数）。

- **三档占比**：Overweight/Buy 1,544 只占 42%；Equal-weight/Hold 1,577 只占 43%；Not-Rated/Hold 3 只占 0%；Underweight/Sell 544 只占 15%；合计 3,668 只。注意 MS 是四档制，NR 单列，按三档读时须说明 NR 归入 Hold（披露段自己就是这么映射的）。
- **投行关系占比**：该表给了两列口径，别混用——投行客户共 933 只，"占 IBC 总数"为 OW 49% / EW 42% / NR 0% / UW 10%；"占该评级类别"为 OW 29% / EW 25% / NR 33% / UW 16%。前者答"投行客户里各评级占多少"，后者答"各评级里有多少是投行客户"，本项要的是后者。
- 另有 Other MISC（投行以外其他重大服务客户）共 1,731 只：OW 757 只 44%、EW 769 只 44%、NR 1 只 0%、UW 204 只 12%。
- **观测时点**：as of June 30, 2026；发布日 2026-07-27，距季末 27 天，属正常季末口径（不适用"<15 天可用上上季末"的例外）。
- 口径提示：投行客户定义为"过去 12 个月从 Morgan Stanley 取得投行报酬的公司"，与 Q10 第三项同源但不同表，勿互相替代。

### 依据

- p.18｜Global Stock Ratings Distribution (as of June 30, 2026)
- p.18｜Overweight/Buy</td><td>1544</td><td>42%</td><td>453</td><td>49%</td><td>29%</td><td>757</td><td>44%
- p.18｜Equal-weight/Hold</td><td>1577</td><td>43%</td><td>390</td><td>42%</td><td>25%</td><td>769</td><td>44%
- p.18｜Underweight/Sell</td><td>544</td><td>15%</td><td>89</td><td>10%</td><td>16%</td><td>204</td><td>12%
- p.18｜Total</td><td>3,668</td><td></td><td>933</td>
- p.18｜Investment Banking Clients are companies from whom Morgan Stanley received investment banking compensation in the last 12 months.

## Q9 · **评级 / 目标价历史走势图**在不在（含赋改日期）？

在，而且本件的文本层拿到了历史序列本身（不只是图题），可直接读数。

- **归属判定**：披露附录里有两段评级/目标价历史，其中一段的评级起点是 2023-03-20 由 Equal-weight 转 Overweight，与本件评级生效表里 META 的 "O (03/20/2023)" 对得上，末条目标价又是 $775，与本件 META 目标价一致 ⇒ 该段为 META。
- **覆盖期间**：目标价记录自 2021-04-29 起至 2026-03-29 止，约五年，远超一年，须附且已附。
- **变动条数**：目标价共 31 条记录（2021-04-29 $375 起，依次 $400 / $365 / $395 / $360 / $325 / $330 / $300 / $280 / $225 / $205 / $105 / $100 / $130 / $190 / $250 / $300 / $350 / $375 / $550 / $575 / $600 / $660 / $615 / $650 / $750 / $850 / $820 / $750 / $825 / $775）。评级共 4 条记录、3 次变动：2021-07-01 Overweight/In-line → 2022-10-27 Equal-weight/In-line → 2023-03-20 Overweight/In-line → 2023-10-22 Overweight/Attractive（行业观点由 In-line 上调为 Attractive）。
- **最近一次**：2026-03-29，目标价 $825 → $775（−6.1%，自算），评级维持 Overweight/Attractive 未动。
- 一条可读的规律：$105 那条（2022-10-27）与评级下调同日，是全序列最低点；此后回升到 2025-07-31 的 $850 再回落。评级五年只动 3 次，目标价动了 31 次 ⇒ 这条曲线主要由目标价而非评级驱动。

### 依据

- p.18｜Stock Price, Price Target and Rating History (See Rating Definitions)
- p.20｜Stock Rating History: 7/1/21:0/I; 10/27/22: E/I; 3/20/23:0/I; 10/22/23:0/A
- p.20｜Price Target History: 4/29/21 : 375;7/28/21 :400; 10/26/21 :365
- p.20｜10/27/22:105;11/14/22:100;1/17/23:130
- p.20｜12/10/25 :750: 1/29/26:825:3/29/26:775
- p.23｜Meta Platforms Inc (META.O)</td><td>O (03/20/2023)</td><td>$595.19

## Q10 · **九项冲突披露**在不在**首页**（或指明页码）？

首页以样板句把披露指引到报告末尾的 Disclosure Section（"For analyst certification and other important disclosures, refer to the Disclosure Section, located at the end of this report."），逐项内容在披露段的"Important Regulatory Disclosures on Subject Companies"。本件是**逐票列名型**：每条声明后面跟一长串公司名，需逐条点明本文标的在不在名单里。逐项核对（本文标的 = Meta Platforms Inc / META）：

| 项 | 有/无 | 位置与内容 |
|---|---|---|
| ① 分析师及家庭持仓 | 有，**名单含本标的** | 披露段点名："The analyst or strategist (or a household member) identified below owns the following securities"——Gregory Gao（本件作者之一，Research Associate）持有 Alphabet、Amazon、**Meta Platforms**、Reddit、Uber 的普通股或优先股。四要素齐：谁（Gregory Gao 及其家庭成员）· 何时（报告时点）· 什么（普通股/优先股及衍生品）· 原文如上。 |
| ② 报酬是否挂钩投行收入 | 有（带限定） | 报酬基于研究质量、客户反馈、选股、竞争因素、公司收入与 "overall investment banking revenues"；但紧接着限定 "compensation is not linked to investment banking or capital markets transactions performed by Morgan Stanley or the profitability or revenues of particular trading desks"。即：整体投行收入是因子之一，具体交易不挂钩。 |
| ③ 近 12 个月主/副承销或收投行报酬 | 有，**名单含本标的** | 两条并列且都含 Meta：过去 12 个月 "managed or co-managed a public offering (or 144A offering)" 的名单含 Meta Platforms；过去 12 个月收取投行服务报酬的名单含 Meta Platforms。 |
| ④ 未来 3 个月是否寻求投行费 | 有，**名单含本标的** | "In the next 3 months, Morgan Stanley expects to receive or intends to seek compensation for investment banking services from …" 名单含 Meta Platforms Inc。 |
| ⑤ 近 12 个月非投行服务报酬 | 有，**名单含本标的** | 过去 12 个月 "received compensation for products and services other than investment banking services" 名单含 Meta Platforms Inc。 |
| ⑥ 是否客户及服务类型 | 有，**名单含本标的** | 两类客户身份分别列名且都含 Meta：投行客户关系（"has provided or is providing investment banking services to, or has an investment banking client relationship with"）与非投行证券相关服务客户。 |
| ⑦ 实益持有该类普通股 ≥1% | 有，**名单含本标的** | "As of June 30, 2026, Morgan Stanley beneficially owned 1% or more of a class of common equity securities" 名单含 Meta Platforms Inc。主体是母公司 Morgan Stanley、标的是普通股、时点明确，与本项要求一致。 |
| ⑧ 是否做市 | **未见（本标的）** | 逐票做市名单只列 DoubleVerify、FIGS、Grindr、Playtika、Revolve、Webtoon、Yelp 七家，**不含 META**。相近的只有一句全公司通用声明 "Morgan Stanley and its affiliates do business that relates to companies/instruments covered … including market making" 以及"买卖以 principal basis"，那是覆盖全业务的概括句、不点名本标的，不能当本项确认，故判未见。 |
| ⑨ 分析师过去 12 个月是否从标的收酬 | 无（明确否认） | 认证段原文：分析师 "have not received and will not receive direct or indirect compensation in exchange for expressing specific recommendations or views"，并声明观点准确表达。这是本项唯一可能的答案形式，且是否定式，不是"未见"。 |
| ⑩ 其他重大冲突 | 未见（针对本标的） | 查披露段全文，唯一一条人员关联是 "An employee, director or consultant of Morgan Stanley is a director of eBay Inc."，主体是 eBay、不是 META，故不算。META 被标为 Top Pick 属评级安排，披露段未把它列为额外冲突。 |

红旗提示：该机构实益持有本标的 ≥1% 普通股 + 近 12 个月为本标的承销/投行客户 + 本件作者之一（Gregory Gao）本人及家庭持有本标的股票，同时给出 Overweight/Top Pick ⇒ 引用其 $775 观点时立场须显著折价。唯一"未见"的第八项反而是对多头有利的证据：做市名单不含 META，说明自营库存动机不是这条评级的主要驱动。

### 依据

- p.1｜For analyst certification and other important disclosures, refer to the Disclosure Section, located at the end of this report.
- p.17｜The analyst or strategist (or a household member) identified below owns the following securities (or related derivatives): Gregory Gao - Alphabet Inc.(common or preferred stock), Amazon.com Inc(common or preferred stock), Meta Platforms Inc(common or preferred stock), Reddit Inc(common or preferred stock), Uber Technologies Inc(common or preferred stock).
- p.17｜As of June 30, 2026, Morgan Stanley beneficially owned 1% or more of a class of common equity securities of the following companies covered in Morgan Stanley Research: Airbnb Inc, Alphabet Inc., Amazon.com Inc, AppLovin Corp, Booking Holdings Inc, Chewy Inc, Criteo SA, DoorDash Inc, DoubleVerify Holdings Inc, Duolingo Inc, eBay Inc, Electronic Arts Inc, Etsy Inc, Expedia Inc., Grindr Inc., Instacart, Lyft Inc, Match Group Inc, Meta Platforms Inc, Microsoft, MNTN Inc, Opendoor Technologies Inc
- p.17｜Within the last 12 months, Morgan Stanley managed or co-managed a public offering (or 144A offering) of securities of Airbnb Inc, Alphabet Inc., Amazon.com Inc, Compass, Inc., eBay Inc, Liftoff Mobile Inc., Match Group Inc, Meta Platforms Inc, Uber Technologies Inc.
- p.17｜Within the last 12 months, Morgan Stanley has received compensation for investment banking services from Airbnb Inc, Alphabet Inc., Amazon.com Inc, Chewy Inc, eBay Inc, Instacart, Liftoff Mobile Inc., Match Group Inc, Meta Platforms Inc, Microsoft, Uber Technologies Inc.
- p.17｜Within the last 12 months, Morgan Stanley has received compensation for products and services other than investment banking services from Airbnb Inc, Alphabet Inc., Amazon.com Inc, AppLovin Corp, Booking Holdings Inc, Chewy Inc, DoorDash Inc, eBay Inc, Electronic Arts Inc, Expedia Inc., Instacart, Liftoff Mobile Inc., Match Group Inc, Meta Platforms Inc, Microsoft, Peloton Interactive, Inc.
- p.17｜In the next 3 months, Morgan Stanley expects to receive or intends to seek compensation for investment banking services from Airbnb Inc, Alphabet Inc., Amazon.com Inc, AppLovin Corp, Booking Holdings Inc, Bumble Inc., Chewy Inc, Criteo SA, DoorDash Inc, DoubleVerify Holdings Inc, Duolingo Inc, eBay Inc, Electronic Arts Inc, Etsy Inc, Expedia Inc., FIGS, Inc., Instacart, Liftoff Mobile Inc., Lyft Inc, Match Group Inc, Meta Platforms Inc, Microsoft, MNTN Inc
- p.17｜Morgan Stanley & Co. LLC makes a market in the securities of DoubleVerify Holdings Inc, FIGS, Inc., Grindr Inc., Playtika Holding Corp, Revolve Group Inc, Webtoon Entertainment Inc, Yelp Inc.
- p.17｜An employee, director or consultant of Morgan Stanley is a director of eBay Inc. This person is not a research analyst or a member of a research analyst's household.
- p.17｜The equity research analysts or strategists principally responsible for the preparation of Morgan Stanley Research have received compensation based upon various factors, including quality of research, investor client feedback, stock picking, competitive factors, firm revenues and overall investment banking revenues.
- p.17｜Equity Research analysts' or strategists' compensation is not linked to investment banking or capital markets transactions performed by Morgan Stanley or the profitability or revenues of particular trading desks.
- p.17｜The following analysts hereby certify that their views about the companies and their securities discussed in this report are accurately expressed and that they have not received and will not receive direct or indirect compensation in exchange for expressing specific recommendations or views in this report: Stephen C Byrd; Brian Nowak, CFA; Adam Wood.
- p.17｜Morgan Stanley and its affiliates do business that relates to companies/instruments covered in Morgan Stanley Research, including market making, providing liquidity, fund management, commercial banking, extension of credit, investment services and investment banking.

## Q11 · 他的**风险章**挂了数字吗？

两半：框架部分**挂了数字**，公司风险部分**没挂**。

- 框架部分有真敏感度：单 GW 数据中心的 ROIC 随 GPU 时租价变动——$7/小时 → ROIC 23%，$8 → 28%，$8.5 → 31%，$9 → 34%，$10 → 39%；同步给出增量 EBIT 利润率 60% / 65% / 67% / 69% / 72%。这是可写成"若〔时租价〕变 X ⇒〔ROIC〕变 Y%"的敏感度，属真数字。
- 但它不是 EPS/PT 敏感度：本件没有"若时租价跌 $1 ⇒ META 2026 年 EPS 变 −Z%、目标价变 −W%"这条链，也没有 WACC ±1% / 永续 ±0.5% / 目标倍数 ±1x 对 $775 的敏感度表。
- 公司风险部分全是方向句：META 页下行风险正式条目 1 条（执行失手推高长期资本强度）+ 三条模板（宏观与消费走弱、监管限制广告定向、Reality Labs 亏损扩大），无一条附百分点或金额。上行侧 4 条亦同。
- 后果：风险与目标价之间的量化桥只能靠 Bear 档 $450 间接给（较 $775 为 −41.9%，自算），而不是靠敏感度表。

判：**半样板、半有数**——框架层有 ROIC 敏感度，公司层是样板风险；缺的是把框架敏感度传导到 EPS/PT 的那一步。

### 依据

- p.3｜ROIC (NOPAT / Total Capex) 23% 28% 31% 34% 39%
- p.3｜Incremental EBIT Margins 60% 65% 67% 69% 72%
- p.13｜RISKS TO DOWNSIDE Mis-execution risk could result in higher LT capital intensity
- p.12｜BEAR CASE $450.00 Implied ~15x blended '27/'28 P/E
- p.12｜$775.00PRICE TARGET Our price target is determined using a discounted cash ow/long-term EBITDA multiple.

## Q12 · 这份报告落在**静默期窗口**内吗？

否（按常规主题/框架件处理），但有一处核验缺口。

- 发布日：2026-07-27 20:24 GMT（首页时间戳 "July 27, 2026 08:24 PM GMT"）。本件是行业框架与 ROIC 模型的首次发布，四只标的的评级与目标价均为既有观点重申，不属于承接发行的新股覆盖。
- 全文无发行时间线：没有 IPO 定价日、没有二次发行定价日、没有承销团名单或生效日。
- 缺口：披露段称过去 12 个月 Morgan Stanley 曾对本标的（META）"managed or co-managed a public offering (or 144A offering)"，但未给该次发行的日期与证券类型。没有发行日就算不出 10 天 / 3 天窗口，只能判"不能认定落入窗口"，不能判"确认不在窗口"。
- 文中不涉第三方 IPO 时间安排，故无其他窗口线索。

结论：判否——不落在静默期窗口内；同时把"近 12 个月曾任本标的发行 manager 但未披露发行日"作为核验缺口上报主控。

### 依据

- p.1｜July 27, 2026 08:24 PM GMT
- p.1｜For analyst certification and other important disclosures, refer to the Disclosure Section, located at the end of this report.
- p.17｜Within the last 12 months, Morgan Stanley managed or co-managed a public offering (or 144A offering) of securities of Airbnb Inc, Alphabet Inc., Amazon.com Inc, Compass, Inc., eBay Inc, Liftoff Mobile Inc., Match Group Inc, Meta Platforms Inc, Uber Technologies Inc.
