---
id: 03-broker-research-2026-09-09-3
cat: "03"
sub: broker-research
template: broker-research
template_version: 2
date: 2026-09-09
time: "00:00"
title: "03-broker-research-2026-09-09-3"
kind: "broker-research"
issuer: ""
ticker: META
source_pages: 15
---

> 骨架已生成，答案待填。原文：`corpus/materials/mineru/03-broker-research-2026-09-09-3/full.md`（15 页）。
> 填写纪律见 `docs/EVIDENCE-SPEC.md`：有答案必有依据块，块须逐字，页码 `p.N` 以源 PDF 为准。

## Q1 · 他的**关键假设取值**各是多少？

本件是**两只股票的事件点评**（META 发布 Muse agent），只有两页 Risk Reward 驱动表，没有完整损益表，故六项只能给到两项，其余四项如实记缺。单位：百万美元，除 EPS。

**META（META.O，OW，PT 775 美元）**
- **收入增速**：固定汇率口径 22.5%（Dec2025A）→ 26.6%（Dec2026e）→ 22.2%（Dec2027e）→ 19.9%（Dec2028e）；base case 正文另写"Ad revenue grows ~27% in '26"。
- **营业利润（GAAP）**：83,276 → 89,133 → 103,424 → 111,210，四年只增 34%，即利润率假设是**摊薄**的（收入增速 26.6% 而营业利润只增 7%）。
- **EPS**：'27 约 34 美元、'28 约 35 美元（PT 用的就是这两个数的均值）。
- **用户假设**：合并日活 2,239.9 → 2,294.5 → 2,344.5 → 2,389.2 百万，四年年化约 2.2%。
- **毛利率、资本开支、实际税率、摊薄股数**：材料未给出此项——本件驱动表只有三行（固定汇率增速、GAAP 营业利润、DAU），无 COGS、无 capex 行、无税率行、无股数行。

**GOOGL（GOOGL.O，OW，PT 400 美元）**
- **营业利润（GAAP）**：129,039 → 171,465 → 229,478 → 284,409；同页另有一行"GAAP Operating Income (Loss)"137,054 / 178,940 / 236,678 / 290,959，与上一行口径不同，材料未解释差异（两行差约 6-8%，疑为是否含其他业务的口径差）。
- **EPS**：'27 约 15 美元、'28 约 18 美元。
- **收入增速、毛利率、资本开支、实际税率、摊薄股数**：材料未给出此项。

**行业假设**：消费级 agentic 可覆盖的消费支出 TAM 约 30 万亿美元（数字广告、电商、在线旅游、自动驾驶、外卖、物流、可穿戴），这是他整篇的核心前提。

判断：可用的假设只有"META 收入中高速增长 + 营业利润被 AI 投入摊薄"与"两只的 '27/'28 EPS"，其余关键行（capex、税率、股数）全缺——这意味着**无法独立重建他的 EPS**，只能核到他给的 EPS 数。

### 依据

- p.7｜<tr><td>Constant Currency % Growth (%)</td><td>22.5</td><td>26.6</td><td>22.2</td><td>19.9</td></tr>
- p.7｜<tr><td>Operating income (GAAP) ($, mm)</td><td>83,276</td><td>89,133</td><td>103,424</td><td>111,210</td></tr>
- p.7｜<tr><td>Consolidated Total Daily Active Users (mm)</td><td>2,239.9</td><td>2,294.5</td><td>2,344.5</td><td>2,389.2</td></tr>
- p.5｜<tr><td>Total operating income (GAAP) ($, mm)</td><td>129,039</td><td>171,465</td><td>229,478</td><td>284,409</td></tr>
- p.5｜<tr><td>GAAP Operating Income (Loss) ($, mm)</td><td>137,054</td><td>178,940</td><td>236,678</td><td>290,959</td></tr>
- p.6｜Our $775 PT is based on applying a ~23X P/E multiple to the average of our $34/$35 EPS in '27/'28.
- p.4｜Our $400 PT is based on applying a ~24X P/E multiple to the average of our $15/$18 EPS in '27/'28, and implies paying ~1.6X PEG, a ~35% premium to GOOGL's peer median.
- p.1｜In The Morgan Stanley AI Guidebook: Navigating the Age of Inference we laid out the $30tn TAM of consumer spend

## Q2 · **他和我差在哪一项、哪一年**？差多少？

我方模型数值不在本份材料内，逐行"他 vs 我"的对照需跨批（交主控）。

本件内可核的对照有两组，都不是"他 vs 我"，而是"他 vs 他自己的另一个口径"：

**（一）现价倍数 vs 目标价倍数（同一份材料内的两个锚）**
- META：现价 613.48 美元，PT 775 美元，空间 +26.3%（775/613.48−1）；而正文说他"at 18X '28 EPS"没被定价，PT 却用 **23x** 的 '27/'28 均值 ⇒ 目标价的上行**几乎全部来自倍数从 18x 抬到 23x（+28%）**，EPS 假设本身不动。
- GOOGL：PT 用 24x，并自称"implies paying ~1.6X PEG, a ~35% premium to GOOGL's peer median"——即他自己承认目标价里含 35% 的同业溢价，这部分是他的判断，不是市场共识。

**（二）评级共识（不是盈利共识）**
- META：卖方评级 88% Overweight / 12% Equal-weight / 0% Underweight；GOOGL：90% OW / 10% EW / 0% UW。两家都是"共识已偏多"，他再加一个 OW 的边际信息量有限。

**缺口**：盈利层面的"MS estimates vs consensus"表在两只的 Risk Reward 页都有标题，但表体是图、文本层无数字，取不到共识 EPS/收入；本件也没有上期估计可比（见 Q4）。因此**我方该项未定 ⇒ 记缺口**，登 1 条能证明"只有单点估计、无可核共识数"的依据。

### 依据

- p.2｜3) Muse Agent Success is Not Priced at 18X '28 EPS, But Expect Investors (and Us) to Need to See Adoption and Monetizable Behavior to Re-rate Shares Higher
- p.6｜88% Overweight
- p.4｜Consensus Rating Distribution 90% Overweight
- p.5｜MS ESTIMATES VS. CONSENSUSFY Dec 2026e
- p.1｜<tr><td>Price target</td><td>$775.00</td></tr><tr><td>Shr price, close (Sep 8, 2026)</td><td>$613.48</td></tr>

## Q3 · 他的**财年是谁的财年**？

是**公司财年，且 12 月结账，等于日历年**——这一点本件写得比同批其他件清楚：驱动表列头直接写 `Dec2025 / Dec2026e / Dec2027e / Dec2028e`，META 与 GOOGL 两张表都是同一列头。

因此：可直接与日历年（CY26/CY27/CY28）的共识、指引比较，不需要换口径；他文中的"'27/'28 EPS"就是 Dec2027e / Dec2028e，不是"未来 12 个月"的 NTM 口径。若要做 NTM 对比，须自行按季度加权，本件未给季度拆分。

### 依据

- p.7｜<tr><td>Drivers</td><td colspan="4">Dec2025 Dec2026e Dec2027e Dec2028e</td></tr>
- p.5｜<tr><td>Drivers</td><td>Dec2025</td><td>Dec2026e</td><td>Dec2027e</td><td>Dec2028e</td></tr>

## Q4 · **预测修正**：改了哪一项、从多少改到多少？改的是**假设**还是**结论**？

**本件没有修正——估值与评级全部沿用，是"Muse 发布"的事件点评，不是估计更新。**

- 全文检索未见 raise / lower / unchanged / maintain / prior 之类表述；
- 两家的目标价与最近一次记录一致：META PT 775 美元（历史记录最后一次设定为 2026-03-29 的 775，前值 2026-01-29 的 825）；GOOGL PT 400 美元（最后一次为 2026-07-23 的 400，前值 2026-06-29 的 415）；
- 原文明确说要等采用数据才改模型："look for adoption signal to confidently put upside into our base case numbers in '27 and '28"——即**本期估计未动**。

判定：**假设没变、结论（评级/PT）也没变**，属于"观点重申 + 等待验证"，不适用"重要/不重要"的分层；真正值得记的是他把 Muse 定义为"未定价的看涨期权"（call option），这部分不在数字里。

### 依据

- p.2｜and now look for adoption signal to confidently put upside into our base case numbers in '27 and '28
- p.12｜Price Target History: 7/28/21 : 400; 10/26/21 : 365; 1/19/22 :395
- p.12｜7/20/25:750;7/31/25:850;10/30/25:820: 12/10/25:750; 1/29/26:825:3/29/26:775
- p.11｜6/29/26:415:7/23/26:400

## Q5 · 他给了**情景**吗？各自驱动假设是什么？

给了，两只各三档，且每档都标了隐含倍数与 EPS：

| 标的 | Bull | Base（=PT） | Bear | 隐含倍数 |
|---|---|---|---|---|
| META | 1,000 | 775 | 450 | ~28x / ~23x / ~15x（blended '27/'28 P/E） |
| GOOGL | 460 | 400 | 225 | ~26x / ~24x / ~15x（Avg. '27/'28 EPS） |

驱动假设：
- **META**：bull 假设 AI 投入带动互动与新品（click-to-message、订阅、Business AI）超预期，并继续压缩 Reels 变现缺口；base 假设 '26 广告收入增 ~27%、效率继续改善；bear 假设互动下滑或 Reels 变现慢于预期、监管限制定向广告、数据中心投入失误拉高资本密度。
- **GOOGL**：bull 假设 Search/GCP 加速、AI 新品为增量而非蚕食、YouTube 与 Cloud 利润率更高（bull EPS ~16/~20）；base 假设搜索稳健增长、Cloud 加速（~15/~18）；bear 假设广告增速进一步放缓、费用纪律失效、AI 产品拉低毛利（~14/~16）。
- **概率**：三档概率由期权隐含波动率推算（"as of 8 Sep 2026"），是风险中性概率，不是他的主观概率。

判断：**PT 差一倍以上（META 1000 vs 450），但 EPS 只差 10-20%，杠杆全在倍数（28x vs 15x）**——这是典型"倍数情景"而非"盈利情景"，与 Q6 的单方法一致。

### 依据

- p.6｜BULL CASE $1,000.00 Implied ~28x blended '27/'28 P/E
- p.6｜BEAR CASE $450.00 Implied ~15x blended '27/'28 P/E
- p.4｜BULL CASE $460.00 ~26X Avg. '27/'28 Bull Case EPS of ~$16/~$20
- p.4｜~15X Avg. '27/'28 Bear Case EPS of ~$14/~$16
- p.4｜The probabilities of our Bull, Base, and Bear case scenarios playing out were estimated with implied volatility data from the options market as of 8 fiSep 2026.

## Q6 · 他用了哪几种**估值方法**？**能互相印证吗**？

**每只只用一种方法：目标 P/E 乘 '27/'28 平均 EPS。没有第二种方法，不能互证。**

- META：23x × avg(34, 35) = 34.5 × 23 = **793.5**，他给 775（差 −2.3%）；bull 28x × 34.5 ≈ 966 vs 给 1,000；bear 15x × 34.5 ≈ 518 vs 给 450（bear 的 EPS 假设应更低，材料未给 bear EPS 数值）。
- GOOGL：24x × avg(15, 18) = 16.5 × 24 = **396**，他给 400（差 +1.0%）；bull 26x × avg(16, 20) = 18 × 26 = 468 vs 给 460（差 −1.7%）；bear 15x × avg(14, 16) = 15 × 15 = 225，与其 bear case 225 完全一致（META 的 bear 450 无法用 15x 复算，须更低的 EPS，材料未给）。
- 辅助参照：GOOGL 段给了一个 PEG"~1.6X"与"~35% premium to GOOGL's peer median"，这是**溢价理由**，不是第二估值方法（没有可比公司倍数表、没有 DCF、无 WACC/永续增长率）。

结论：**单一方法（P/E），且 base 值可复算到 ±3% 以内（差异应来自 EPS 四舍五入）**；三档之间的差别主要靠倍数调节，方法内部自洽但无外部印证——这意味着"目标价对不对"完全取决于 23x/24x 这两个倍数是否合理，材料只给了 PEG 与溢价作旁证。

### 依据

- p.6｜Our $775 PT is based on applying a ~23X P/E multiple to the average of our $34/$35 EPS in '27/'28.
- p.4｜Our $400 PT is based on applying a ~24X P/E multiple to the average of our $15/$18 EPS in '27/'28, and implies paying ~1.6X PEG, a ~35% premium to GOOGL's peer median.
- p.6｜BASE CASE $775.00 Implied ~23X base case blended '27/'28 P/E
- p.4｜BASE CASE $400.00 BEAR CASE ~24X Avg. '27/'28 Base Case EPS of ~$15/~$18
- p.4｜BASE CASE $400.00 BEAR CASE ~24X Avg. '27/'28 Base Case EPS of ~$15/~$18

## Q7 · 目标价的**依据 / 估值方法解释 / 风险列示**齐不齐？

三件齐，两只都齐：

1. **目标价依据（可复算）**：META "~23X P/E × average of our $34/$35 EPS in '27/'28"；GOOGL "~24X P/E × average of our $15/$18 EPS in '27/'28"。倍数与 EPS 两个输入都给了，能一手复算（见 Q6，误差 ≤3%）。
2. **方法解释（含溢价理由）**：GOOGL 明确写出"implies paying ~1.6X PEG, a ~35% premium to GOOGL's peer median"，把溢价讲成"对平台级创新与费用纪律的付费"；META 用"未定价的 call option"解释为什么给 23x 而非现价 18x。三档也各有倍数与 EPS 口径。
3. **风险列示**：每只都列 RISKS TO UPSIDE / RISKS TO DOWNSIDE。META 下行四条（宏观/监管定向能力/Reality Labs 亏损扩大/资本密度失误），GOOGL 下行两条（SMB 与旅游敞口在衰退中压广告、分部披露改善不必然降低投资强度），并配期权隐含概率。

瑕疵：风险条目是定性清单，没有一条给出"若 X 变则 PT 变 Y"的量化；bear case 的 EPS 数值未逐项列出（只给倍数与区间描述），导致 bear PT 无法完整复算。

### 依据

- p.6｜Our $775 PT is based on applying a ~23X P/E multiple to the average of our $34/$35 EPS in '27/'28.
- p.4｜and implies paying ~1.6X PEG, a ~35% premium to GOOGL's peer median
- p.7｜RISKS TO DOWNSIDE Macro pressures/weaker consumer spend
- p.7｜Mis-execution risk could result in higher LT capital intensity
- p.5｜High exposure to SMB and travel could pressure ad revenue in a recession

## Q8 · **评级分布三件**（三档占比 · 投行关系占比 · 观测时点）齐不齐？

三件齐，取自机构级披露表（Global Stock Ratings Distribution）：

| 项 | 内容 |
|---|---|
| 三档占比 | Overweight/Buy 1,555 家（42%）、Equal-weight/Hold 1,577 家（43%）、Not-Rated/Hold 3 家（0%）、Underweight/Sell 559 家（15%），合计 3,694 家 |
| 投行关系占比 | IBC 共 939 家：OW 450 家（占 IBC 48%、占该档 29%）、EW 395 家（42%、25%）、NR 1 家（0%、33%）、UW 93 家（10%、17%）；Other MISC 1,754 家（OW 767、EW 770、NR 1、UW 216） |
| 观测时点 | as of August 31, 2026；本件发布日 2026-09-09，相隔 9 天，用月末口径（未取季末） |

另有一张**卖方共识评级分布**（META 88% OW / 12% EW；GOOGL 90% OW / 10% EW），那是市场共识，不是 MS 的机构级披露，两者不能混用。

### 依据

- p.10｜(as of August 31, 2026)
- p.10｜<tr><td>Overweight/Buy</td><td>1555</td><td>42%</td><td>450</td><td>48%</td><td>29%</td><td>767</td><td>44%</td></tr>
- p.10｜<tr><td>Equal-weight/Hold</td><td>1577</td><td>43%</td><td>395</td><td>42%</td><td>25%</td><td>770</td><td>44%</td></tr>
- p.10｜<tr><td>Underweight/Sell</td><td>559</td><td>15%</td><td>93</td><td>10%</td><td>17%</td><td>216</td><td>12%</td></tr>
- p.10｜<tr><td>Total</td><td>3,694</td><td></td><td>939</td><td></td><td></td><td>1754</td><td></td></tr>
- p.10｜Investment Banking Clients are companies from whom Morgan Stanley received investment banking compensation in the last 12 months.

## Q9 · **评级 / 目标价历史走势图**在不在（含赋改日期）？

**在，且文本层有完整数据（这份是本批少见的"图＋数字都在"）。**

- **META**：评级历史 4 条——2021-09-01 O/I → 2022-10-27 E/I → 2023-03-20 O/I → 2023-10-22 O/A（2023 年 10 月起 OW 至今，行业观点转为 Attractive）；目标价历史 30 条，自 2021-07-28 的 400 到 2026-03-29 的 775，最近一次为 **2026-03-29：775**（前值 2026-01-29：825，−6.1%），中间高点 2025-07-31 的 850。
- **GOOGL**：目标价历史 26 条，自 2022-07-27 的 145（拆股调整后口径）到 2026-07-23 的 400；最近一次为 **2026-07-23：400**（前值 2026-06-29：415，−3.6%）。
- 覆盖期均超过三年，符合"覆盖满一年须附"的要求；图上还标注"Stock Price (Not Covered by Current Analyst)"与期权隐含概率。

判：**有表、有日期、有点位**，可直接核对历史赋改；唯一缺的是 GOOGL 的评级历史行（该页只印了 PT 历史），评级变动需另查。

### 依据

- p.12｜Stock Rating History: 9/1/21: 0/I: 10/27/22 : E/I: 3/20/23 : 0/I; 10/22/23 : 0/A
- p.12｜Price Target History: 7/28/21 : 400; 10/26/21 : 365; 1/19/22 :395; 2/3/22 : 360;3/2/22 :325;4/28/22 :330; 5/31/22 :300;
- p.12｜7/20/25:750;7/31/25:850;10/30/25:820: 12/10/25:750; 1/29/26:825:3/29/26:775
- p.11｜7/27/22 :145:10/9/22 :135;10/26/22 :125;11/14/22:120;1/17/23 :125;2/3/23:135;4/25/23:140;7/12/23:150;
- p.11｜6/29/26:415:7/23/26:400

## Q10 · **九项冲突披露**在不在**首页**（或指明页码）？

首页以样板句指明披露在报告末尾（"refer to the Disclosure Section, located at the end of this report"），逐项内容在末页 Important Regulatory Disclosures on Subject Companies 一节。逐项核对（本文标的 = Alphabet、Meta）：

| 项 | 有/无 | 位置与内容 |
|---|---|---|
| ① 分析师及家庭持仓 | 有（**名单含本文两只**） | "The analyst or strategist (or a household member) identified below owns the following securities"：Gregory Gao 持 Alphabet Inc.、Amazon.com、Meta Platforms Inc、Reddit、Uber。**含 GOOGL 与 META**——这是要人注意的一条：分析师的持仓与 OW 评级同向 |
| ② 报酬是否挂钩投行收入 | 有（间接） | 报酬基于研究质量、客户反馈、选股、竞争力、"firm revenues and overall investment banking revenues"；同段明确"not linked to investment banking or capital markets transactions" |
| ③ 近 12 个月主/副承销或收取投行报酬 | 有（**含本文两只**） | 主/副承销（含 144A）名单**含 Alphabet Inc.、Meta Platforms Inc**（另有 Airbnb、Amazon、Compass、eBay、Liftoff、Uber）；收投行报酬名单**亦含两只** |
| ④ 未来 3 个月是否寻求投行费 | 有（**含本文两只**） | "In the next 3 months, Morgan Stanley expects to receive or intends to seek compensation for investment banking services"名单**含 Alphabet Inc.、Meta Platforms Inc** |
| ⑤ 近 12 个月非投行服务报酬 | 有（**含本文两只**） | "compensation for products and services other than investment banking services"名单**含 Alphabet Inc.、Meta Platforms Inc** |
| ⑥ 是否客户及服务类型 | 有（**含本文两只**） | 投行客户关系名单**含两只**；非投行证券相关服务/客户关系名单**亦含两只**。服务类型只写"investment banking services""non-investment banking, securities-related services"，未再细分 |
| ⑦ 实益持有该类普通股 ≥1% | 有（**含本文两只**） | "As of August 31, 2026, Morgan Stanley beneficially owned 1% or more of a class of common equity securities"名单**含 Alphabet Inc.、Meta Platforms Inc**。主体母公司、标普通股、时点 2026-08-31、比例 ≥1%，四要素齐 |
| ⑧ 是否做市 | 未见（本标的） | 唯一做市句为"Morgan Stanley & Co. LLC makes a market in the securities of DoubleVerify Holdings Inc, FIGS, Inc., Grindr Inc., Playtika Holding Corp, Revolve Group Inc, Webtoon Entertainment Inc, Yelp Inc."，**不含 Alphabet 与 Meta**；相近的"including market making, providing liquidity"是业务范围泛述，未点名证券，不算 |
| ⑨ 分析师过去 12 个月是否从标的收酬 | 未见 | 只有认证句"have not received and will not receive direct or indirect compensation in exchange for expressing specific recommendations or views"，是否定式通用认证，不是逐项确认 |
| ⑩ 其他重大冲突 | 有（通用声明 + 一条人员关联） | "Morgan Stanley may have a position in the debt of the Company""trades or may trade as principal"；另有"An employee, director or consultant of Morgan Stanley is a director of eBay Inc."——对象是 eBay，与本文两只无关 |

红旗提示：该机构对 Alphabet 与 Meta **同时**实益持有 ≥1% 普通股、近 12 个月收投行费、未来 3 个月继续寻求投行费，且撰写人之一（Gregory Gao）**个人持有这两只股票** ⇒ 引用其 OW 与 775/400 目标价时应显著折价；这是本批三份里冲突最重的一份。

### 依据

- p.1｜For analyst certification and other important disclosures, refer to the Disclosure Section, located at the end of this report.
- p.9｜The analyst or strategist (or a household member) identified below owns the following securities (or related derivatives): Gregory Gao - Alphabet Inc.(common or preferred stock), Amazon.com Inc(common or preferred stock), Meta Platforms Inc(common or preferred stock), Reddit Inc(common or preferred stock), Uber Technologies Inc(common or preferred stock).
- p.9｜As of August 31, 2026, Morgan Stanley beneficially owned 1% or more of a class of common equity securities of the following companies covered in Morgan Stanley Research: Airbnb Inc, Alphabet Inc., Amazon.com Inc, AppLovin Corp
- p.9｜Within the last 12 months, Morgan Stanley managed or co-managed a public offering (or 144A offering) of securities of Airbnb Inc, Alphabet Inc., Amazon.com Inc, Compass, Inc., eBay Inc, Liftoff Mobile Inc., Meta Platforms Inc, Uber Technologies Inc.
- p.9｜Within the last 12 months, Morgan Stanley has received compensation for investment banking services from Airbnb Inc, Alphabet Inc., Amazon.com Inc, Chewy Inc, eBay Inc, Instacart, Liftoff Mobile Inc., Meta Platforms Inc, Uber Technologies Inc.
- p.9｜Morgan Stanley & Co. LLC makes a market in the securities of DoubleVerify Holdings Inc, FIGS, Inc., Grindr Inc., Playtika Holding Corp, Revolve Group Inc, Webtoon Entertainment Inc, Yelp Inc.
- p.9｜An employee, director or consultant of Morgan Stanley is a director of eBay Inc. This person is not a research analyst or a member of a research analyst's household.
- p.9｜The equity research analysts or strategists principally responsible for the preparation of Morgan Stanley Research have received compensation based upon various factors, including quality of research, investor client feedback, stock picking, competitive factors, firm revenues and overall investment banking revenues.

## Q11 · 他的**风险章**挂了数字吗？

**基本没挂数字，属样板风险；唯一带数的是情景概率与倍数，不是敏感度。**

- META：上行 4 条（Reels 变现更快、AI 投入收益更大、订阅与 click-to-message 广告、效率改善推 FCF）、下行 4 条（宏观/消费走弱、监管限制定向、Reality Labs 亏损扩大、长期资本密度失误）；
- GOOGL：上行 3 条（新品贡献超预期、回购加大、单位人头开支低于预期）、下行 2 条（SMB 与旅游敞口在衰退中压广告、分部披露改善不必然降低投资强度）。

九条风险全是方向句，无一条附百分点或金额。带数字的只有：三档情景的**期权隐含概率**（风险中性、非他主观）、三档隐含倍数（28x/23x/15x、26x/24x/15x）、以及 PT 公式里的 EPS（34/35、15/18）。这些能反推"倍数每降 1x ⇒ PT 降约 4.3%（775/23）"，但**材料本身没给"WACC/倍数 ±1 单位对 PT 的影响"这类敏感度表**，所以按判据只能写定性，不能写"若 X 变 ⇒ EPS/PT 变 Y%"。

### 依据

- p.7｜RISKS TO UPSIDE Faster than expected Reels monetization & higher engagement growth
- p.7｜Regulation impacts ability to target ads
- p.5｜RISKS TO UPSIDE New products generate higher than expected top line contribution.
- p.4｜The probabilities of our Bull, Base, and Bear case scenarios playing out were estimated with implied volatility data from the options market as of 8 fiSep 2026.

## Q12 · 这份报告落在**静默期窗口**内吗？

**披露层面不能排除，须核发行日——本件的承销名单里含本文两只。**

- 发布日：2026-09-09 01:16 GMT；
- 披露明写："Within the last 12 months, Morgan Stanley managed or co-managed a public offering (or 144A offering) of securities of Airbnb Inc, Alphabet Inc., Amazon.com Inc, Compass, Inc., eBay Inc, Liftoff Mobile Inc., Meta Platforms Inc, Uber Technologies Inc."——**Alphabet 与 Meta 都在其中**；
- 但材料只给"近 12 个月"这个窗口，**没有给具体发行日**，也没有说明是 IPO 还是二次发行/144A。

按判据（作为承销商：IPO 后 ≥10 天、二次发行后 ≥3 天不得发布），**无法判定是否落窗**：若某次发行发生在 2026-09-06 之后，则本件落入窗口；若在更早，则不落。这不是"未见声明"的问题，而是日期缺失导致的不可判定，需回原始发行公告核对。就文本本身而言，本件是常规事件点评（Muse 发布），不是发行文件。

### 依据

- p.1｜September 9, 2026 01:16 AM GMT
- p.9｜Within the last 12 months, Morgan Stanley managed or co-managed a public offering (or 144A offering) of securities of Airbnb Inc, Alphabet Inc., Amazon.com Inc, Compass, Inc., eBay Inc, Liftoff Mobile Inc., Meta Platforms Inc, Uber Technologies Inc.
- p.9｜Within the last 12 months, Morgan Stanley has provided or is providing investment banking services to, or has an investment banking client relationship with, the following company: Airbnb Inc, Alphabet Inc., Amazon.com Inc, AppLovin Corp
