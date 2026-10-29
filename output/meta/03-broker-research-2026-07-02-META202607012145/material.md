---
id: 03-broker-research-2026-07-02-META202607012145
cat: "03"
sub: broker-research
template: broker-research
template_version: 2
date: 2026-07-02
time: "00:00"
title: "03-broker-research-2026-07-02-META202607012145"
kind: "broker-research"
issuer: ""
ticker: META
source_pages: 16
---

> 骨架已生成，答案待填。原文：`corpus/materials/mineru/03-broker-research-2026-07-02-META202607012145/full.md`（16 页）。
> 填写纪律见 `docs/EVIDENCE-SPEC.md`：有答案必有依据块，块须逐字，页码 `p.N` 以源 PDF 为准。

## Q1 · 他的**关键假设取值**各是多少？

本件是 META 单票的 Idea（neocloud vs hyperscaler 五问）加风险回报页，六项标准假设里五项能取到值：

- **收入增速**：固定汇率口径 2025 +22.5%、2026E +26.2%、2027E +20.5%、2028E +18.3%（列头为 Dec 结账，故为财年口径）；基准情景另给「2026 年广告收入 +28%」。
- **营业利润率**：2026E 按 GAAP 营业利润 92,944 ÷ 收入 237,140 推算为 **39.2%**（自行推算，非表内直给；收入取共识对照表左列，列序说明见 Q2）；2025 与 2027E 因缺对应对收入数，未算。
- **资本开支**：2026E \$145bn → 2027E \$175bn → 2028E \$205bn（+20.7%、+17.1%），驱动是 2027 年带来约 3.5GW 自建自营 IT 容量。
- **摊薄股数**：估值表用 2,613 百万股（Base；Bear 2,612、Bull 2,614）。
- **口径不一致提示**：按 EPS 28.74 与净利 71,171 反推股数为 2,476 百万股，与估值表的 2,613 差 5.5%——两处股数口径不同（估值用期初/发行在外、EPS 用另一套），引用时必须标明取哪一种。
- **毛利率 · 实际税率**：材料未给出此项。
- 另给一条 neocloud 弹性假设：每 250MW、按 \$40/W 出租一年 → 2028 年 EPS 约 +$3（+8%）。

### 依据

- p.8｜<tr><td>Drivers</td><td colspan="4">Dec2025 Dec2026e Dec2027e Dec2028e</td></tr><tr><td>Constant Currency % Growth (%)</td><td>22.5</td><td>26.2</td><td>20.5</td><td>18.3</td></tr>
- p.8｜<tr><td>Operating income (GAAP) ($, mm)</td><td>83,276</td><td>92,944</td><td>104,243</td><td>108,640</td></tr>
- p.3｜Our model currently assumes META capex grows to $175bn/$205bn in '27/'28 (from $145bn in '26) as they bring on ~3.5 GW of capacity in '27.
- p.6｜<tr><td>(÷) Shares Outstanding</td><td>2,612</td><td>2,613</td><td>2,614</td></tr>
- p.2｜as every 250 MW leased for 1 year at $40/Watt would add ~$3 (8%) to our '28 EPS

## Q2 · **他和我差在哪一项、哪一年**？差多少？

我方模型数值不在本份材料内，逐行「他 vs 我」的对照需跨批（交主控）。

本件内可核的对照是「他的 2026E 估计 vs 报告所附共识」（同一张「MS ESTIMATES VS. CONSENSUS」表，列头 FY Dec 2026e）：

| 项目（2026E） | 他的估计 | 共识 | 差额 |
|---|---|---|---|
| Sales / Revenue（\$mm） | 237,140 | 256,708 | −7.6% |
| EBITDA（\$mm） | 114,318 | 148,942 | −23.2% |
| Net income（\$mm） | 71,171 | 85,256 | −16.5% |
| EPS（\$） | 28.74 | 32.83 | −12.5% |

- **差异在哪一端**：EBITDA 差 23.2% 明显大于收入差 7.6%，说明分歧主要在**利润率／成本端**（折旧、AI 相关费用），不在收入规模；净利与 EPS 差额介于两者之间，是利润率差被税后摊薄的结果。
- **表结构缺陷（须带回核标记）**：该表 OCR 把合并单元格打散，同一行出现 3–4 个数、列首无标签；本表列序是按四行内部一致性推定（共识均值应落在高/低之间，3 行成立），EPS 行的低值 32.91 却高于均值 32.83，属矛盾 ⇒ 上表数值可用，但列序须回源核。
- **目标价侧无对照数**：共识目标价分布只有图，文本层无均值，无法算他与街口的 PT 偏离。

### 依据

- p.8｜MS ESTIMATES VS. CONSENSUS<table><tr><td colspan="4">FY Dec 2026e</td></tr>
- p.8｜<tr><td rowspan="2">Sales / Revenue ($, mm)</td><td rowspan="2">237,140</td><td>256,708</td><td rowspan="2">258,240</td></tr><tr><td>252,737</td></tr>
- p.8｜<tr><td rowspan="2">EBITDA ($, mm)</td><td rowspan="2">114,318</td><td>148,942</td><td rowspan="2">170,068</td></tr><tr><td>142,342</td></tr>
- p.8｜<tr><td rowspan="2">EPS ($)</td><td rowspan="2">28.74</td><td>32.83</td><td rowspan="2">38.62</td></tr><tr><td>32.91</td></tr>

## Q3 · 他的**财年是谁的财年**？

- 列头**直接写明月份**：「Dec2025／Dec2026e／Dec2027e／Dec2028e」⇒ 公司财年为 12 月结账，等于日历年，**不需要推定**，可直接与日历年末共识比。
- 这是本批三份里唯一把财年结账月写进表头的一份；前两份（同批的主题件）只给年份，须按日历年推定。
- 影响：本件的年度数字与日历年度共识、与公司年报可直接对齐；跨件比较时以本件口径为准绳更安全。

### 依据

- p.8｜<tr><td>Drivers</td><td colspan="4">Dec2025 Dec2026e Dec2027e Dec2028e</td></tr><tr><td>Constant Currency % Growth (%)</td><td>22.5</td><td>26.2</td><td>20.5</td><td>18.3</td></tr>
- p.6｜<tr><td>EBITDA (FY27E)</td><td>$175,008</td><td>$185,526</td><td>$190,336</td></tr>

## Q4 · **预测修正**：改了哪一项、从多少改到多少？改的是**假设**还是**结论**？

- **本件正文无修正表述**：全文没有 old／new、prior／current、「from \$X to \$Y」、「we raise／lower our estimates」；目标价 \$775 与 Overweight 均按现值给。
- **目标价侧可核的事实**：价格目标历史末条为 3/29/26 的 \$775，与本件 \$775 相同 ⇒ 目标价自 3 月底以来未动，本件属「无修正的题材更新」。
- **分层判定**：本件新增的是**情景化的可选性假设**（neocloud 每 250MW 多 \$3 的 '28 EPS），属「加了一条假设分支」，不是「改了主模型假设」，也不是「只改结论」。
- **本件内可核的「上一次变动」**：目标价在 2026-03-29 由 \$825 下调到 \$775，但本件正文没有解释这次下调改了哪一项估计，只留下历史串 ⇒ 属「结论变过、本件未记假设变动」，需回上一版报告才能判性质。

### 依据

- p.13｜Price Target History: 4/29/21 : 375;7/28/21 :400; 10/26/21 :365; 1/19/22: 395; 2/3/22 :360; 3/2/22 :325; 4/28/22 :330;
- p.13｜3/20/23:250;4/26/23:300:7/12/23:350;7/27/23:375;2/2/24:550;7/31/24:575:10/20/24:600;1/12/25:660;
- p.13｜10/30/25:820; 12/10/25:750; 1/29/26 :825;3/29/26 :775
- p.1｜<tr><td>Price target</td><td>$775.00</td></tr>

## Q5 · 他给了**情景**吗？各自驱动假设是什么？

**有，三档，而且是全批最完整的一套（每档都给了完整的估值桥）。**

| 档位 | PT | '27 EPS | 隐含 '27 P/E | 倍数法 | DCF 法 | 目标倍数 | 相对 3 年均值 |
|---|---|---|---|---|---|---|---|
| Bear | \$450 | \$31.16 | 14x | \$351 | \$548 | 5.2x | −60% |
| Base | \$775 | \$34.16 | 23x | \$795 | \$756 | 11.1x | −15% |
| Bull | \$1,000 | \$35.46 | 28x | \$1,007 | \$994 | 13.8x | +5% |

- **驱动叙事**：Bull——AI 投资带动互动与新工具、click-to-message 等新品、效率改善、Reels 变现缺口收窄、Reality Labs 亏损收窄、宏观更好；Base——2026 广告收入 +28%、继续降本增效；Bear——互动下滑、Reels 变现慢、宏观走弱、监管限制定向、Reality Labs 亏损扩大、数据中心执行失误推高资本强度。
- **差别落在哪**：'27 EPS 三档只差 −8.8%～+3.8%（31.16→35.46），目标倍数从 5.2x 到 13.8x（相差 2.65 倍）⇒ **价差几乎全部由倍数解释，不在经营**；Bear 的 5.2x 是相对 3 年均值折 60%，Bull 的 13.8x 是溢价 5%，可见情景核心是对「META 该给多少倍」的判断。
- **两法在每档都给了分项结果**（见 Q6），这是可复核的情景，不是口号。

### 依据

- p.6｜<tr><td>(X) Target Multiple</td><td>5.2x</td><td>11.1x</td><td>13.8x</td></tr>
- p.6｜<tr><td>Discount to 3-Year Average</td><td>-60%</td><td>-15%</td><td>5%</td></tr>
- p.6｜<tr><td>PT (Average of Multiples, DCF Valuation)</td><td>$450</td><td>$775</td><td>$1,000</td></tr>
- p.6｜<tr><td>&#x27;27 EPS</td><td>$31.16</td><td>$34.16</td><td>$35.46</td></tr>
- p.7｜BULL CASE Implied ~28x '27 P/E $1,000.00
- p.7｜$775.00 BEAR CASE $450.00 Implied ~14x '27 P/E

## Q6 · 他用了哪几种**估值方法**？**能互相印证吗**？

- **两法并用**：一是长期 EBITDA 倍数法（EV/EBITDA × 目标倍数），二是 DCF（~8% WACC、~3% 永续增长）；目标价取两法**平均**。
- **输入齐全**：EBITDA（FY27E）185,526、目标倍数 11.1x、企业价值 2,066,756、净债务 −9,654、股数 2,613、倍数法估值 \$795、DCF 估值 \$756、平均 \$775 —— 全链条可复算。
- **能否互证**：**能**。Base 档两法分别为 \$795 与 \$756，差 4.9%；Bear \$351 对 \$548（相差 \$197，为分歧最大档）、Bull \$1,007 对 \$994（差 1.3%）——中枢与上档高度一致，下档分歧大（熊市情景下 DCF 给的底更高，倍数法更悲观）。
- **隐含交叉检查**：\$775 对应 '27 EPS 34.16 的 23x，与文中「implies paying 23X on our '27 EPS of ~\$34」一致，口径自洽。

### 依据

- p.7｜Our price target is determined using a discounted cash ow/long-term EBITDA multiple. It implies a ~23x '27 P/E Multiple. Our DCF uses an ~8% WACC and a ~3% terminal growth rate
- p.6｜<tr><td>(=) Multiples Based Valuation</td><td>$351</td><td>$795</td><td>$1,007</td></tr>
- p.6｜<tr><td>DCF Based Valuation</td><td>$548</td><td>$756</td><td>$994</td></tr>
- p.6｜<tr><td>(=) Enterprise Value</td><td>913,540</td><td>2,066,756</td><td>2,617,122</td></tr>
- p.6｜Exhibit 6: Our $775 PT on META implies paying 23X on our '27 EPS of ~$34

## Q7 · 目标价的**依据 / 估值方法解释 / 风险列示**齐不齐？

三件全齐，是本批质量最好的一份：

1. **方法（有且可复算）**：长期 EBITDA 倍数 + DCF 两法，公式链（EBITDA × 倍数 = EV；EV − 净债务 ÷ 股数 = 每股值）逐行列示。
2. **关键输入（有）**：目标倍数 11.1x（相对 3 年均值折 15%）、WACC ~8%、永续增长 ~3%、净债务 −9,654、股数 2,613、'27 EPS 34.16、隐含 23x P/E —— 缺的只是 DCF 的逐年现金流明细（未披露），但中枢倍数与折现率都在。
3. **风险列示（有，具体）**：上行 4 条（Reels 变现与互动、AI 投资收益、订阅与 click-to-message 收入、效率改善推 FCF）、下行 4 条（宏观／消费、监管限制定向、Reality Labs 亏损、执行失误推高长期资本强度），并额外把「neocloud 若真做大会对 '27/'28 资本开支形成上行压力」写成独立判断。

**判定**：合规，无形式缺口；唯一可挑的是 DCF 明细未给，但不影响复算中枢。

### 依据

- p.8｜RISKS TO DOWNSIDE Mis-execution risk could result in higher LT capital intensity
- p.8｜Faster than expected Reels monetization & higher engagement growth
- p.3｜the extent to which META is indeed going to focus on these opportunities (which as detailed above have higher risk) would put upward bias on our '27/'28 capex
- p.6｜<tr><td>(X) Target Multiple</td><td>5.2x</td><td>11.1x</td><td>13.8x</td></tr>

## Q8 · **评级分布三件**（三档占比 · 投行关系占比 · 观测时点）齐不齐？

三件齐，来自同一张 Global Stock Ratings Distribution 表：

- **三档占比**（按覆盖家数）：Overweight／Buy 42%（1,544）、Equal-weight／Hold 43%（1,577）、Not-Rated／Hold 0%（3）、Underweight／Sell 15%（544），合计 3,668 家。
- **投行关系占比**：投行客户（IBC）933 家；各类别内「属投行客户」的比例为 OW 29%、EW 25%、NR 33%、UW 16%。
- **观测时点**：as of June 30, 2026（发布日 2026 年 7 月 1 日）；这是季末口径，与发布日只差一天，属最新季末，不需回退到上上个季末。

### 依据

- p.12｜Global Stock Ratings Distribution (as of June 30, 2026)
- p.12｜<tr><td>Overweight/Buy</td><td>1544</td><td>42%</td><td>453</td><td>49%</td><td>29%</td><td>757</td><td>44%</td></tr>
- p.12｜<tr><td>Equal-weight/Hold</td><td>1577</td><td>43%</td><td>390</td><td>42%</td><td>25%</td><td>769</td><td>44%</td></tr>
- p.12｜<tr><td>Underweight/Sell</td><td>544</td><td>15%</td><td>89</td><td>10%</td><td>16%</td><td>204</td><td>12%</td></tr>
- p.12｜<tr><td>Total</td><td>3,668</td><td></td><td>933</td><td></td><td></td><td>1731</td><td></td></tr>

## Q9 · **评级 / 目标价历史走势图**在不在（含赋改日期）？

- **有完整价格目标历史序列（文本层可读）**：起 2021-04-29（\$375），止 2026-03-29（\$775），共 31 条目标价记录；覆盖约 4 年 11 个月，满足「满一年须附」。
- **评级历史**：4 次变更——2021-07-01 O/I；2022-10-27 E/I；2023-03-20 O/I；2023-10-22 O/A（评级 Overweight、行业观点 Attractive 自 2023-10-22 起沿用至今）。
- **最近一次**：目标价 2026-03-29 由 \$825（2026-01-29）下调至 \$775（约 −6.1%）；本件（7 月 1 日）维持 \$775 未变。
- **注意**：本件披露的是「历史数据串」，图形本体是否随 PDF 输出不影响取数；文本层能重建轨迹，不需要另找网站。

### 依据

- p.13｜Stock Rating History: 7/1/21:0/I; 10/27/22: E/I; 3/20/23:0/I; 10/22/23:0/A
- p.13｜Price Target History: 4/29/21 : 375;7/28/21 :400; 10/26/21 :365; 1/19/22: 395; 2/3/22 :360; 3/2/22 :325; 4/28/22 :330;
- p.13｜10/30/25:820; 12/10/25:750; 1/29/26 :825;3/29/26 :775
- p.12｜Stock Price, Price Target and Rating History (See Rating Definitions)

## Q10 · **九项冲突披露**在不在**首页**（或指明页码）？

首页以样板句把认证与披露指向 Disclosure Section；本件的披露是**逐票列名型**，且点名到公司。逐项核对：

| 项 | 有/无 | 位置与内容 |
|---|---|---|
| ① 分析师及家庭持仓 | 有（含本标的） | 披露段点名：「The analyst or strategist (or a household member) identified below owns the following securities」——Gregory Gao 持有 Alphabet、Amazon、**Meta Platforms Inc（普通股或优先股）**、Reddit、Uber。**名单含 META**，持仓人列在首页作者栏（研究助理）。 |
| ② 报酬是否挂钩投行收入 | 有（间接，且明确不挂钩交易） | 「analysts…received compensation based upon various factors, including quality of research, investor client feedback, stock picking, competitive factors, firm revenues and overall investment banking revenues」，后接「compensation is not linked to investment banking or capital markets transactions」——挂钩公司整体投行收入、不挂钩单笔交易。 |
| ③ 近 12 个月主/副承销或收取投行报酬 | 有（含本标的） | 两句点名：过去 12 个月「managed or co-managed a public offering (or 144A offering)」名单**含 Meta Platforms Inc**（与 Match Group、Uber 相邻）；「received compensation for investment banking services」名单**亦含 Meta Platforms Inc**。 |
| ④ 未来 3 个月是否寻求投行费 | 有（含本标的） | 「In the next 3 months, Morgan Stanley expects to receive or intends to seek compensation for investment banking services from…」名单**含 Meta Platforms Inc**（列于 Match Group 与 MNTN 之间）。 |
| ⑤ 近 12 个月非投行服务报酬 | 有（含本标的） | 「received compensation for products and services other than investment banking services from…」名单**含 Meta Platforms Inc**。 |
| ⑥ 是否客户及服务类型 | 有（含本标的） | 两类客户关系都点名：投行客户关系名单**含 META**；非投行、证券相关服务／客户关系名单**亦含 META**——服务类型为「投行 + 非投行证券相关」两类。 |
| ⑦ 实益持有该类普通股 ≥1% | 有（含本标的） | 「As of May 29, 2026, Morgan Stanley beneficially owned 1% or more of a class of common equity securities of the following companies…」名单**含 Meta Platforms Inc**（列于 Match Group 与 Opendoor 之间）。母公司层面、普通股、≥1%，主体与标的都对得上。 |
| ⑧ 是否做市 | 未见（做市名单不含本标的） | 「Morgan Stanley & Co. LLC makes a market in the securities of…」名单共 12 家（Bumble、Criteo、DoubleVerify、Expedia、FIGS、Grindr、Playtika、Revolve、Shutterstock、Webtoon、Yelp、Zillow），**不含 META**；另有一句泛指「包括 market making…」的业务范围描述，不是本项确认。 |
| ⑨ 分析师过去 12 个月是否从标的收酬 | 未见 | Certification 段只说「have not received and will not receive direct or indirect compensation in exchange for expressing specific recommendations or views」，讲的是「为表达观点而收酬」，与「从 META 收取报酬」不是同一件事；全文无后者表述。 |
| ⑩ 其他重大冲突 | 有（但不含本标的） | 董事交叉：「An employee, director or consultant of Morgan Stanley is a director of eBay Inc.」——**不含 META**；另有「A member of Research…owns securities…in the Uber Technologies Inc.」——亦不含 META。 |

红旗提示：①分析师（含其家庭成员）实益持有 META 普通股 + ③过去 12 个月为 META 主/副承销并收投行费 + ④未来 3 个月仍寻求 META 投行费 + ⑦母公司实益持有 META ≥1% 普通股 ⇒ 四项叠加，且本件是 Top Pick 单票推荐，引用其 \$775 目标价时立场折价应加重。

### 依据

- p.11｜The analyst or strategist (or a household member) identified below owns the following securities (or related derivatives): Gregory Gao - Alphabet Inc.(common or preferred stock), Amazon.com Inc(common or preferred stock), Meta Platforms Inc(common or preferred stock), Reddit Inc(common or preferred stock), Uber Technologies Inc(common or preferred stock).
- p.11｜As of May 29, 2026, Morgan Stanley beneficially owned 1% or more of a class of common equity securities of the following companies covered in Morgan Stanley Research: Airbnb Inc, Alphabet Inc., Amazon.com Inc, AppLovin Corp, Booking Holdings Inc, Bumble Inc., Chewy Inc, Criteo SA, DoorDash Inc, DoubleVerify Holdings Inc, Duolingo Inc, eBay Inc, Electronic Arts Inc, Etsy Inc, Expedia Inc., Instacart, Lyft Inc, Match Group Inc, Meta Platforms Inc, Opendoor Technologies Inc
- p.11｜Within the last 12 months, Morgan Stanley managed or co-managed a public offering (or 144A offering) of securities of Airbnb Inc, Alphabet Inc., Amazon.com Inc, Compass, Inc., eBay Inc, Liftoff Mobile Inc., Match Group Inc, Meta Platforms Inc, Uber Technologies Inc.
- p.11｜Within the last 12 months, Morgan Stanley has received compensation for investment banking services from Airbnb Inc, Alphabet Inc., Amazon.com Inc, Chewy Inc, DoorDash Inc, eBay Inc, Instacart, Liftoff Mobile Inc., Match Group Inc, Meta Platforms Inc, Uber Technologies Inc.
- p.11｜In the next 3 months, Morgan Stanley expects to receive or intends to seek compensation for investment banking services from Airbnb Inc, Alphabet Inc., Amazon.com Inc, AppLovin Corp, Booking Holdings Inc, Bumble Inc., Chewy Inc, Criteo SA, DoorDash Inc, DoubleVerify Holdings Inc, Duolingo Inc, eBay Inc, Electronic Arts Inc, Etsy Inc, Expedia Inc., FIGS, Inc., Instacart, Liftoff Mobile Inc., Lyft Inc, Match Group Inc, Meta Platforms Inc, MNTN Inc
- p.11｜Within the last 12 months, Morgan Stanley has received compensation for products and services other than investment banking services from Airbnb Inc, Alphabet Inc., Amazon.com Inc, AppLovin Corp, Booking Holdings Inc, Chewy Inc, DoorDash Inc, eBay Inc, Electronic Arts Inc, Expedia Inc., Instacart, Liftoff Mobile Inc., Match Group Inc, Meta Platforms Inc, Peloton Interactive, Inc.
- p.11｜Morgan Stanley & Co. LLC makes a market in the securities of Bumble Inc., Criteo SA, DoubleVerify Holdings Inc, Expedia Inc., FIGS, Inc., Grindr Inc., Playtika Holding Corp, Revolve Group Inc, Shutterstock Inc, Webtoon Entertainment Inc, Yelp Inc, Zillow Group Inc.
- p.11｜An employee, director or consultant of Morgan Stanley is a director of eBay Inc.
- p.13｜A member of Research who had or could have had access to the research prior to completion owns securities (or related derivatives) in the Uber Technologies Inc.
- p.11｜The equity research analysts or strategists principally responsible for the preparation of Morgan Stanley Research have received compensation based upon various factors, including quality of research, investor client feedback, stock picking, competitive factors, firm revenues and overall investment banking revenues.

## Q11 · 他的**风险章**挂了数字吗？

**风险条目本身是样板方向句，但报告另附了一张可算的业务敏感度表，属「部分挂数字」。**

- **风险章（方向句）**：上行 4 条、下行 4 条，全部无百分点、无金额；提到的「更高长期资本强度」也没有量化。
- **但有可计算的敏感度**：Exhibit 2／Exhibit 3 给「租出容量 × \$/Watt → '28 EPS 增厚%」矩阵：每 250MW、\$40/W 出租一年 ⇒ '28 EPS 约 +\$3（+8%）；矩阵覆盖 250–1,000MW 与 \$20–\$40/W，增厚区间 4%–33%。
- **能否写成敏感度句**：能，但只能写成「若租出 500MW、单价 \$30/W ⇒ '28 EPS +12%」，**这是新业务的弹性，不是目标价的敏感度**；WACC ±1%、永续增长 ±0.5%、目标倍数 ±1x 对 PT 的影响仍未给。
- 结论：风险章本身无数字；可用的量化是经营弹性表，与风险条目不是一回事，引用时不要混。

### 依据

- p.8｜RISKS TO DOWNSIDE Mis-execution risk could result in higher LT capital intensity
- p.2｜as every 250 MW leased for 1 year at $40/Watt would add ~$3 (8%) to our '28 EPS
- p.3｜<tr><td>$30</td><td>6%</td><td>12%</td><td>19%</td><td>25%</td></tr>

## Q12 · 这份报告落在**静默期窗口**内吗？

**否。**

- **发布日**：2026 年 7 月 1 日 09:45 PM GMT（美东同日午后），距 6 月 30 日收盘仅一天。
- **本件性质**：彭博报道「META 筹备云业务」后的当日点评 + 五问拆解，属常规覆盖更新，无发行时间线（无定价日、无上市日、无锁定期）。
- **承销身份核对**：披露显示过去 12 个月曾为 META 主承销或联席承销公开/144A 发行，属**已完成的历史发行**；全文无 pending transaction 描述，也无「manager or co-manager in a pending transaction」的待办条目。
- **结论**：无 pending 发行、无发行日期可比，静默期规则不触发，不落窗。

### 依据

- p.1｜July 1, 2026 09:45 PM GMT
- p.1｜5 Takes On The Neocloud vs Hyperscaler Opportunities
- p.11｜Within the last 12 months, Morgan Stanley managed or co-managed a public offering (or 144A offering) of securities of Airbnb Inc, Alphabet Inc., Amazon.com Inc, Compass, Inc., eBay Inc, Liftoff Mobile Inc., Match Group Inc, Meta Platforms Inc, Uber Technologies Inc.
