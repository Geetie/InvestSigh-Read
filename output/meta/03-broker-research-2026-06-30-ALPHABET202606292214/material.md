---
id: 03-broker-research-2026-06-30-ALPHABET202606292214
cat: "03"
sub: broker-research
template: broker-research
template_version: 2
date: 2026-06-30
time: "00:00"
title: "03-broker-research-2026-06-30-ALPHABET202606292214"
kind: "broker-research"
issuer: ""
ticker: META
source_pages: 21
---

> 骨架已生成，答案待填。原文：`corpus/materials/mineru/03-broker-research-2026-06-30-ALPHABET202606292214/full.md`（21 页）。
> 填写纪律见 `docs/EVIDENCE-SPEC.md`：有答案必有依据块，块须逐字，页码 `p.N` 以源 PDF 为准。

## Q1 · 他的**关键假设取值**各是多少？

个股评级驱动型报告（GOOGL，OW，PT $415）。六项全部可从损益表与现金流量表逐行取到，口径为 GAAP（另有 adjusted 行并列）。

- **收入增速**：2025A 402,836 → 2026E 497,283.6（+23.4%）→ 2027E 650,119.0（+30.7%）→ 2028E 782,949.4（+20.4%），25–28 CAGR 25%（增速为按表内值推算）。收入里最陡的一条是 "Google Other & Other Bets"（含云与 1P TPU）：108,272 → 387,569.5，25–28 CAGR 53%。
- **毛利率**：59.7%（2025A）→ 61.3%（2026E）→ 60.4%（2027E）→ 60.0%（2028E），GAAP 口径。折旧从 21,136 涨到 117,636.6（5.6 倍），是毛利率 2026 年后逐年下滑的唯一主因。
- **营业利润率**：GAAP 32.0% → 36.3% → 37.2% → 36.9%；adjusted 38.2% → 42.1% → 42.3% → 41.7%。两者差 6 个百分点左右，差额即 SBC（24,953 → 37,313.3）。
- **资本开支**：91,447 → 189,596 → 349,846 → 374,846（百万美元）。2027 年较上一版 $300bn 上调到 $350bn（+16.7%），2028 年 $375bn。
- **实际税率**：16.8% → 17.1% → 16.0% → 16.4%（GAAP）。四年都在 16–17% 窄区间，没有税务假设的变化。
- **摊薄股数**：表内未单列该行。按净利润 ÷ EPS 推算：2025 年 132,170/10.81 ≈ 12,227 百万股，2028 年 239,629.8/19.12 ≈ 12,533 百万股，即四年股本基本持平、略增 2.5%（回购 33,460/34,758 被增发抵消）。
- **EPS（GAAP）**：10.81 → 14.80 → 16.30 → 19.12。

**真正的驱动假设链（这是本件的核心，不在损益表里）**：

1. 2028 年新增算力 9 GW（7 GW TPU + 2 GW NVDA GPU），其中约 4 GW TPU 作 1P 对外销售、约 5 GW 自用；
2. 1P TPU 单 GW 收入约 $20bn（2027 年 20,397、2028 年 19,810 百万美元/GW），机架 ASP v8 $1.4mn、v9 $1.6mn，毛利率一律假设 20.0%；
3. 核心云变现按 $15/W（2027）、$18/W（2028），推出核心云收入 $152bn/$229bn；
4. 2028 年算力 50% 给云、50% 给搜索/YouTube 等；
5. Google Cloud 分部 2027/2028 收入增速 106%/44%，2028 年 EBIT $132bn（占公司 EBIT 46%）。

### 依据

- p.10｜<tr><td>Total Alphabet revenue</td><td>$402,836.0</td><td>$497,283.6</td><td>$650,119.0</td><td>$782,949.4</td><td>25%</td></tr>
- p.10｜<tr><td>Total gross margin (GAAP)</td><td>59.7%</td><td>61.3%</td><td>60.4%</td><td>60.0%</td><td></td></tr>
- p.10｜<tr><td>Total operating margin (GAAP)</td><td>32.0%</td><td>36.3%</td><td>37.2%</td><td>36.9%</td></tr>
- p.10｜<tr><td>Total operating margin (adjusted)</td><td>38.2%</td><td>42.1%</td><td>42.3%</td><td>41.7%</td></tr>
- p.10｜<tr><td>Tax rate (GAAP)</td><td>16.8%</td><td>17.1%</td><td>16.0%</td><td>16.4%</td></tr>
- p.10｜<tr><td>EPS (GAAP) as reported</td><td>$10.81</td><td>$14.80</td><td>$16.30</td><td>$19.12 21%</td></tr>
- p.12｜<tr><td>Capex</td><td>(91,447.0)</td><td>(189,596.0)</td><td>(349,846.0)</td><td>(374,846.0)</td></tr>
- p.2｜Lastly, we also model GOOGL to add 2 GW of compute capacity of NVDA GPUs in '28...for total net additions of ~9 GW of onpremises compute capacity.
- p.7｜<tr><td>(=) Revenue/GW of 1P TPU Sales ($mn)</td><td>$20,397</td><td>$19,810</td><td></td></tr>
- p.7｜<tr><td>(X) Rack ASP to GOOGL ($mn)</td><td>$1.4</td><td>$1.4</td><td>MS Est. Rack Cost</td></tr>
- p.2｜Monetization of the capacity remains a debate but our base model assumes incremental "core" (pre 1P TPU sales) Google Cloud Revenue monetizes at $15/$18 per watt in '27/'28
- p.4｜Google Cloud EBIT to reach $132bn in '28...or 46% of company-wide EBIT

## Q2 · **他和我差在哪一项、哪一年**？差多少？

我方模型数值不在本份材料内，逐行「他 vs 我」的对照需跨批（交主控）。

本材料内可核的对照有两处，第二处才有数：

1. **共识表存在但文本层无数据**。Risk Reward 页有 "MS ESTIMATES VS. CONSENSUS / FY Dec 2026e" 的表头，表体是图片，只有标题、没有任何数值。所以"他 vs 共识"这一对照在本件里**取不到数**，只能记缺口。
2. **他 vs 同业（可核，且恰好指向真正的分歧点）**。估值页附了同业倍数表，按 2028 年口径：

| 标的 | '28 EPS | '25–'28 EPS CAGR | '28 P/E | '28 PEG |
|---|---|---|---|---|
| AAPL | $11 | 10% | 25x | 2.5x |
| MSFT | $27 | 14% | 14x | 1.0x |
| META | $36 | 11% | 16x | 1.4x |
| AMZN | $15 | 20% | 16x | 0.8x |
| NFLX | $5 | 16% | 16x | 1.0x |
| **同业中位** | — | **14%** | **16x** | **1.2x** |
| GOOGL（现价 $353） | $19.1 | 15% | 18x | 1.2x |
| GOOGL（$415 目标价） | $19.1 | 15% | 22x | 1.4x |

差额读出来的结论很硬：**GOOGL 的 EPS 增速（15%）只比同业中位（14%）高 1 个百分点，但按目标价给的 P/E（22x）比中位（16x）高 36%**。也就是说，他和同业的差**不在增速这一项，在倍数**——他把差 1 个点的增速定价成 36% 的估值溢价，理由写的是"AI EBIT engine 应享更高倍数"（定性，未量化）。用 PEG 折一下：溢价从 36% 收敛到 23%，仍为正溢价。这就是需要跨批核对的点：**我方若不同意 22x，全部差异都在 2028 年倍数上，不在任何一年的盈利上**。

### 依据

- p.14｜MS ESTIMATES VS. CONSENSUSFY Dec 2026e
- p.6｜<tr><td>GOOGL @ Current Share Price</td><td>Share Price</td><td>&#x27;28 EPS</td><td>&#x27;25-&#x27;28 EPS CAGR</td><td>&#x27;28 P/E</td><td>&#x27;28 PEG</td></tr><tr><td>GOOGL</td><td>$353</td><td>$19.1</td><td>15%</td><td>18x</td><td>1.2x</td></tr>
- p.6｜MSFT $368 $27 14% 14x 1.0x
- p.6｜<tr><td>Peer Median</td><td>14%</td><td>16x</td><td>1.2x</td></tr>
- p.6｜<tr><td>GOOGL</td><td>$415</td><td>$19.1</td><td>15%</td><td>22x</td><td>1.4x</td></tr>
- p.6｜<tr><td>Premium/(Discount) vs. Median</td><td></td><td></td><td></td><td>36%</td><td>23%</td></tr>
- p.4｜We argue GOOGL’s material multi-pronged leading AI EBIT engine should warrant a higher multiple over time.

## Q3 · 他的**财年是谁的财年**？

**公司财年，十二月结账，等于日历年，可直接与日历年末共识比。**

证据是两处独立标注：Risk Reward 页的驱动表列头写成 "Dec2025 / Dec2026e / Dec2027e / Dec2028e"（月份写在年份前），共识表标题写成 "FY Dec 2026e"，损益表列头写成 "2025 / 2026E / 2027E / 2028E / 25-'28 CAGR"。三处指向同一结论：Alphabet 财年 12 月 31 日结束，2026E 就是 CY2026。

一处需要留意的口径细节：报告把估值基准从 FY 滚动到 **1H:28**（"rolling our valuation to 1H:28"），即 $415 对应的不是 2028 年末，而是 2028 年上半年的时点，EPS 用的是 '27/'28 两年平均（16.30 与 19.12 的平均 17.71）。所以"2028 年 22x"这个说法是近似，严格讲是"以 1H28 为锚的 23x 平均 EPS"。做跨机构对比时，别把它当成标准的年末前瞻倍数。

另有一处会影响"同一年"对齐的：报告内的 1P TPU 收入/GW 从 2027 年的 20,397 降到 2028 年的 19,810，说明它自己在两个年度间用了不同的产品结构（v8 占比下降、v9 上升），不是同一口径的两年延续。

### 依据

- p.14｜<tr><td>Drivers</td><td>Dec2025</td><td>Dec2026e</td><td>Dec2027e</td><td>Dec2028e</td></tr>
- p.10｜<tr><td>(USD millions)</td><td>2025</td><td>2026E</td><td>2027E</td><td>2028E</td><td>25-&#x27;28 CAGR</td></tr>
- p.5｜We are also rolling our valuation to 1H:28 as our new $415 PT (~20% upside) implies paying 22X '28 EPS
- p.6｜<tr><td>GOOGL Valuation Bear Base Bull '27/'28 Avg. EPS $16.21 $17.71 $18.68 (X) P/E 15X 23X 26X (=) Price Per Share $250 $415 $480</td></tr>

## Q4 · **预测修正**：改了哪一项、从多少改到多少？改的是**假设**还是**结论**？

**改的是假设，而且是有具体旧值的那一类，不是靠换倍数的纯结论调整。**逐项：

| 项目 | 旧值 | 新值 | 幅度（复算） |
|---|---|---|---|
| 2027 年公司收入 | 未给绝对值 | 650,119.0 | +4%（原文口径） |
| 2028 年公司收入 | 未给绝对值 | 782,949.4 | +1%（原文口径） |
| 2027 年 EPS | 未给绝对值 | $16.30 | +4%（原文口径） |
| 2028 年 EPS | 未给绝对值 | $19.12 | +1%（原文口径） |
| 2027 年资本开支 | **$300bn** | **$350bn** | **+16.7%**（原文口径 +17%） |
| 2027 年搜索增速假设 | 7% | 8% | +1 个百分点 |
| 目标价 | $375.00 | $415.00 | **+10.7%** |

读法：**收入与 EPS 只上调 4%/1%，资本开支却上调 17%——这是"分母涨得比分子快"的一年**。作者自己也把逻辑摊开了：capex 上调是因为 "28 TPU 产能可见度提高，而收入上调靠的是云增速（106%/44%）与搜索增速（7%→8%）。所以这轮修正的实质是：**先承认要多花 $50bn，再用云的加速把回报补回来**。若云的收入/GW 从 $18 掉到 $15，这 $50bn 就变成纯摊薄。

分层判定：改的是假设（capex、云增速、搜索增速三条真假设），结论随之变（PT +10.7%、倍数从 '27 滚到 1H28）。与"只改评级/目标价"的情形有本质区别，属**重要**。

原文未给 2027/2028 收入与 EPS 的旧绝对值，只给变动百分比，故表中"未给绝对值"，不自己补基数。

### 依据

- p.1｜<tr><td>Price Target</td><td>$375.00</td><td>$415.00</td></tr>
- p.1｜Raise GOOGL company-wide revenue by 4%/1% in ‘27/’28 as we now model Google Cloud segment to grow 106%/44%...reaching $214bn/$308bn of revenue.
- p.1｜Raise GOOGL ‘27/‘28 EPS by 4%/1%…now modeling $19 of ‘28 EPS
- p.1｜Raise GOOGL ‘27 capex by 17%…now modeling $350bn/$375bn of capex in '27/'28.
- p.5｜Exhibit 6: We raise '27 GOOGL capex estimates from $300bn previously to $350bn, accounting for more informed estimates on TPU and capacity related capex.
- p.5｜The revisions are driven by faster cloud growth and assumed faster ‘28 search growth (8% now vs 7% previously) driven by continued GenAI innovation, engagement and monetization.
- p.5｜better visibility into ‘28 TPU capacity causes us to raise ‘27 capex to $350bn (vs $300bn prior)

## Q5 · 他给了**情景**吗？各自驱动假设是什么？

给了三档，而且是**用同一张表、同一个 EPS 基准、只改倍数**做出来的。

| 档位 | 目标价 | 倍数（P/E） | '27/'28 平均 EPS | 隐含 '27 P/E | 隐含 '28 P/E | 相对现价 $353.65 |
|---|---|---|---|---|---|---|
| Bear | $250 | 15X | $16.21 | 15X | 13X | −29% |
| Base | $415 | 23X | $17.71 | 25X | 22X | +17% |
| Bull | $480 | 26X | $18.68 | 29X | 25X | +36% |

**驱动假设差在哪：几乎全在倍数，不在经营。**熊市 EPS $16.21 只比基准 $17.71 低 8.5%，但目标价低 40%；牛市 EPS $18.68 只比基准高 5.5%，目标价高 16%。倍数从 15X 到 26X 是 1.73 倍，EPS 从 16.21 到 18.68 只有 1.15 倍。**换句话说，这份报告的三档情景本质上是在赌市场愿意给 Alphabet 多少倍，而不是赌它赚多少钱。**这在实操上意味着：情景分析对"基本面下行"的保护很弱——就算 EPS 只掉 8.5%，估值若回到 15X，股价要跌 29%。

触发条件写得偏薄：正文只给了基准情形的驱动（云 106%/44%、capex $350bn/$375bn、搜索 8%），熊市与牛市各自的基本面触发条件**没有单独成段说明**，只体现在 EPS 的差额上。三档概率（期权隐含）只在图表里，文本层无百分比。

### 依据

- p.6｜<tr><td>GOOGL Valuation Bear Base Bull '27/'28 Avg. EPS $16.21 $17.71 $18.68 (X) P/E 15X 23X 26X (=) Price Per Share $250 $415 $480</td></tr>
- p.6｜<tr><td>% upside/(downside) (29%) 17% 36%</td></tr>
- p.6｜<tr><td>Implied P/E on '27 EPS 15X 25X 29X</td></tr>
- p.6｜<tr><td>Implied P/E on '28 EPS 13X 22X 25X</td></tr>
- p.1｜<tr><td>Shr price, close (Jun 29, 2026)</td><td>$353.65</td></tr>

## Q6 · 他用了哪几种**估值方法**？**能互相印证吗**？

**只给一种主方法：目标 P/E 乘以 '27/'28 平均 EPS，并把估值时点滚到 1H28。没有 DCF，没有 WACC，没有永续增长率，没有 EV/EBITDA。**

复算：$415 = 23X × $17.71（'27 的 16.30 与 '28 的 19.12 取平均）。同一目标价另有两种等价说法：25X × '27 EPS 16.30 = $407.5；22X × '28 EPS 19.12 = $420.6。三法结果落在 $407–421，彼此差 3% 以内，**内部一致，可复算**。

第二种方法是相对估值（同业 P/E / PEG），但它不是独立的方法，而是**给倍数找理由的校验**：同业中位 '28 P/E 16x、PEG 1.2x；GOOGL 现价 18x/1.2x，目标价对应 22x/1.4x。作者用"PEG 溢价 23% 而非表观溢价 36%"来论证 22x 不算离谱。这是一次**部分印证**——它证明了溢价在增长调整后变小，但没有证明 22x 是对的（同业里 MSFT 14x 的增速 14% 与 GOOGL 15% 几乎相同，P/E 却差 8 个点，这个反例报告没处理）。

两个隐含条件值得单独记：

1. 22x '28 相对 Alphabet 自身 ~21x 的长期 NTM 均值只是"持平略高"，所以目标价里几乎没有"重估"成分，涨的空间全来自 EPS 从 19.12 往上的增长——这一点作者自己写明了（现价 18x 是"较 21x 长期均值折 15%"）。
2. 估值锚是 1H28，意味着从现在起 18–24 个月的持有期才兑现 17% 的空间，年化不到 10%，与"OW + 20% 上行"的表述要分开看。

### 依据

- p.6｜Exhibit 7: Our new $415 GOOGL PT implies a 23X multiple on an average of our $16/$19 EPS in '27/'28
- p.1｜These revisions combined with the forward model roll lead us to raise our GOOGL PT to $415 (20% upside), which implies paying 25X/22X ’27/‘28 EPS.
- p.5｜We are also rolling our valuation to 1H:28 as our new $415 PT (~20% upside) implies paying 22X '28 EPS, a ~25% premium on PEG to peers (vs the ~5% premium where GOOGL trades currently).
- p.6｜Exhibit 8: … and implies a ~25% premium to peers on a growth adjusted basis (vs. the ~5% premium that GOOGL currently trades at).
- p.5｜With GOOGL currently trading at 18X our new $19 ‘28 EPS (a ~15% discount to the ~21X long-term NTM average) we remain bullish GOOGL and are buyers on this fund-flow driven weakness.

## Q7 · 目标价的**依据 / 估值方法解释 / 风险列示**齐不齐？

三件齐，但第三件的质量弱于前两件。

1. **方法**：有，且可复算。$415 = 23X × '27/'28 平均 EPS 17.71，同时给出 25X '27 / 22X '28 两种等价表述，并说明为什么滚到 1H28（成长能见度延伸到 '28）。
2. **关键输入**：有，三层都给。EPS 层（16.30 / 19.12 / 平均 17.71）；倍数层（23X，对同业中位 16x 溢价 36%、PEG 溢价 23%）；溢价理由层（"AI EBIT engine 应享更高倍数"、"云 EBIT 2028 年占 46%"）。缺折现类输入（无风险利率、ERP），但方法本身不用，不算缺件。
3. **风险列示**：有，3 条上行 + 3 条下行。但**这一条是三件里最薄的一件**：上行风险是"新产品收入超预期、回购加码、招聘/人均支出低于预期"，下行风险是"SMB 与旅游广告的周期暴露、分部披露改善未必降低整体投入"。除"SMB/travel"这一条外，其余五条都是可套在任何互联网大盘股上的通用句，没有一条挂数字、时点或阈值。对照 2241(c)(1) 的要求"可能阻碍达成目标价的风险"，勉强算列示，不算充分。

形式合规结论：三件齐，不需上报为"形式要件缺失"；但风险段应记为"列示存在、实质不足"，引用其目标价时不应把风险段当作业已量化的下行保护。

### 依据

- p.14｜RISKS TO PT/RATING
- p.14｜High exposure to SMB and travel could pressure ad revenue in a recession
- p.14｜Improved disclosure around the Google and Other Alphabet segments may not decrease the overall investment activity of the business.
- p.14｜New products generate higher than expected top line contribution.
- p.14｜Capital returns through greater share buybacks.
- p.6｜Exhibit 7: Our new $415 GOOGL PT implies a 23X multiple on an average of our $16/$19 EPS in '27/'28
- p.5｜a ~25% premium on PEG to peers (vs the ~5% premium where GOOGL trades currently).

## Q8 · **评级分布三件**（三档占比 · 投行关系占比 · 观测时点）齐不齐？

三件齐，全部来自披露表本身。

1. **三档占比**：Overweight/Buy 1,542 只、42%；Equal-weight/Hold 1,571 只、43%；Not-Rated/Hold 3 只、0%；Underweight/Sell 551 只、15%；合计 3,667 只。42+43+15 = 100%，NR 的 3 只被四舍五入进 0%。
2. **投行关系占比（按评级类别）**：OW 30%（465 只）、EW 23%（369 只）、NR 0%（0 只）、UW 16%（86 只）；IBC 合计 920 只。另一列 Other Material Investment Services Clients（MISC）：43%/44%/0%/12%，合计 1,632 只。
3. **观测时点**：as of May 31, 2026。发布日 2026 年 6 月 29 日，距 5 月 31 日 29 天、距二季度末（6/30）还差 1 天——**用的是最近月末，不是季末**，且发布日距该时点已超 15 天，故不能用"上上个季末"的口径去套。

与上一批同机构另一份（2026 年 2 月）对比：OW 占比从 41% 升到 42%、UW 从 16% 降到 15%，覆盖总数 3,695→3,667，属正常漂移，不是口径变化。

### 依据

- p.17｜Global Stock Ratings Distribution
- p.17｜(as of May 31, 2026)
- p.17｜<tr><td>Overweight/Buy</td><td>1542</td><td>42%</td><td>465</td><td>51%</td><td>30%</td><td>707</td><td>43%</td></tr>
- p.17｜<tr><td>Equal-weight/Hold</td><td>1571</td><td>43%</td><td>369</td><td>40%</td><td>23%</td><td>723</td><td>44%</td></tr>
- p.17｜<tr><td>Underweight/Sell</td><td>551</td><td>15%</td><td>86</td><td>9%</td><td>16%</td><td>201</td><td>12%</td></tr>
- p.17｜<tr><td>Total</td><td>3,667</td><td></td><td>920</td><td></td><td></td><td>1632</td><td></td></tr>

## Q9 · **评级 / 目标价历史走势图**在不在（含赋改日期）？

**在，而且是本批里少见的"数据在文本层"的完整形态。**

- **覆盖期间**：2021 年 4 月 28 日至 2026 年 4 月 30 日，跨 5 年，远超"覆盖满一年须附"的门槛。
- **变动条数**：32 条目标价记录（从 4/28/21 的 $128.75 到 4/30/26 的 $375）。
- **最近一次（历史表内）**：2026 年 4 月 30 日，目标价 $375（由 2025 年 10 月 30 日的 $330 上调，+13.6%）。
- **本期变动**：2026 年 6 月 29 日由 $375 上调至 $415（+10.7%），尚未进入历史表（历史表止于 4/30/26），属正常——历史表只记上一版。
- 两次最大的单次跳变都在 AI 行情里：2025 年 10 月 1 日 $210→$270（+28.6%）、2025 年 10 月 30 日 $270→$330（+22.2%）。
- **评级历史**：评级与行业观点的缩写以 "Stock Rating/Industry View" 形式画在图上，文本层只有目标价数字，**没有逐条的评级变动日期**（例如"何时由 EW 升 OW"）。所以这张表能证明目标价历史，不能证明评级历史。

### 依据

- p.18｜Price Target History: 4/28/21 : 128.75; 7/27/21 : 150; 11/1/21 : 160; 1/19/22 : 171.5; 2/2/22 : 172.5; 4/27/22 : 163.5;
- p.18｜10/30/25:330;4/30/26:375
- p.18｜Source: Morgan Stanley Research Date Format : MM/DD/YY Price Target. No Price Target Assigned (NA)
- p.18｜Stock and Industry Ratings (abbreviations below) appear as Stock Rating/Industry View
- p.17｜Stock Price, Price Target and Rating History (See Rating Definitions)

## Q10 · **九项冲突披露**在不在**首页**（或指明页码）？

首页只有一句指向附录的引导（"For analyst certification and other important disclosures, refer to the Disclosure Section, located at the end of this report"），逐项在 Disclosure Section。本件披露是**逐票列名型**（消费互联网覆盖组的长名单），下面每项都点明名单含不含本标的 Alphabet（GOOGL）。逐项核对：

| 项 | 有/无 | 位置与内容 |
|---|---|---|
| ① 分析师及家庭持仓 | **有** | "The analyst or strategist (or a household member) identified below owns the following securities"，点名 **Gregory Gao** 持有 Alphabet、Amazon、Meta、Reddit、Uber 的普通股/优先股。**名单含本文标的 Alphabet**。注意主体：Gregory Gao 是 Research Associate，认证分析师 Brian Nowak 未列在持仓名单中——按措辞（analyst or strategist or household member）这一条覆盖了研究团队成员，故判"有"。 |
| ② 报酬是否挂钩投行收入 | 有（明确否认） | 报酬基于研究质量、客户反馈、选股、竞争、"firm revenues and overall investment banking revenues"；但明写分析师报酬 "not linked to investment banking or capital markets transactions"，也不挂钩特定交易台盈亏。属"公司总收入含投行收入、个人不直接挂钩"的间接口径。 |
| ③ 近 12 个月主/副承销或收取投行报酬 | **有** | "Within the last 12 months, Morgan Stanley managed or co-managed a public offering (or 144A offering) of securities of Airbnb Inc, **Alphabet Inc.**, Amazon.com Inc, Compass, Inc., eBay Inc, Liftoff Mobile Inc., Match Group Inc, Meta Platforms Inc, Uber Technologies Inc." **名单含本标的**。 |
| ④ 未来 3 个月是否寻求投行费 | **有** | "In the next 3 months, Morgan Stanley expects to receive or intends to seek compensation for investment banking services from" 一长串，**Alphabet Inc. 在列**（同一名单另含 Meta、Amazon、Uber 等同业）。 |
| ⑤ 近 12 个月非投行服务报酬 | **有** | "compensation for products and services other than investment banking services from Airbnb Inc, **Alphabet Inc.**, Amazon.com Inc …" **名单含本标的**。 |
| ⑥ 是否客户及服务类型 | **有** | 分两类列：投行客户关系名单**含 Alphabet**；非投行、证券相关服务名单**亦含 Alphabet**。服务类型字面为 "investment banking services / investment banking client relationship" 与 "non-investment banking, securities-related services"，未细到具体产品。 |
| ⑦ 实益持有该类普通股 ≥1% | **有** | "As of May 29, 2026, Morgan Stanley beneficially owned 1% or more of a class of common equity securities of the following companies"：**Alphabet Inc. 在列**（名单共 33 家），观测时点 2026-05-29。 |
| ⑧ 是否做市 | 否（名单不含本标的） | "Morgan Stanley & Co. LLC makes a market in the securities of Bumble Inc., Criteo SA, DoubleVerify Holdings Inc, Expedia Inc., FIGS, Inc., Grindr Inc., Playtika Holding Corp, Revolve Group Inc, Shutterstock Inc, Webtoon Entertainment Inc, Yelp Inc, Zillow Group Inc."。该名单**不含 Alphabet**，13 家全是中小盘消费互联网标的，故本项判否。 |
| ⑨ 分析师过去 12 个月是否从标的收酬 | 未见 | 认证段只有"have not received and will not receive direct or indirect compensation in exchange for expressing specific recommendations or views"，这是"不因发表特定观点而收酬"，**不等于**"过去 12 个月未从 Alphabet 收取任何报酬"；披露页其余各节无 "analyst received compensation from the subject company" 类句子，判未见。 |
| ⑩ 其他重大冲突 | 有（与本文标的不符） | 两处：① "An employee, director or consultant of Morgan Stanley is a director of **eBay Inc.**"——标的是 eBay，不是 Alphabet；② "A member of Research who had or could have had access to the research prior to completion owns securities … in the **Uber Technologies Inc.**"——主体是研究部内可提前接触报告的成员，标的是 Uber，**两项主体或标的均与本标的 Alphabet 不符**，不能当作本项确认。 |

**红旗提示**：Morgan Stanley 实益持有 Alphabet ≥1% 普通股（2026-05-29）、近 12 个月为本标的做过主/副承销、收过其投行与非投行报酬、未来 3 个月仍要收投行费，且**研究团队成员 Gregory Gao 个人持有 Alphabet** ⇒ 这份 OW + PT 上调 10.7% 的报告，是四重利益叠加下发出的；引用其"$415 对应 22x 只是持平历史均值"的说辞时立场折价。

### 依据

- p.1｜For analyst certification and other important disclosures, refer to the Disclosure Section, located at the end of this report.
- p.16｜The analyst or strategist (or a household member) identified below owns the following securities (or related derivatives): Gregory Gao - Alphabet Inc.(common or preferred stock), Amazon.com Inc(common or preferred stock), Meta Platforms Inc(common or preferred stock), Reddit Inc(common or preferred stock), Uber Technologies Inc(common or preferred stock).
- p.16｜As of May 29, 2026, Morgan Stanley beneficially owned 1% or more of a class of common equity securities of the following companies covered in Morgan Stanley Research: Airbnb Inc, Alphabet Inc., Amazon.com Inc, AppLovin Corp
- p.16｜Within the last 12 months, Morgan Stanley managed or co-managed a public offering (or 144A offering) of securities of Airbnb Inc, Alphabet Inc., Amazon.com Inc, Compass, Inc., eBay Inc, Liftoff Mobile Inc., Match Group Inc, Meta Platforms Inc, Uber Technologies Inc.
- p.16｜Within the last 12 months, Morgan Stanley has received compensation for investment banking services from Airbnb Inc, Alphabet Inc., Amazon.com Inc, Chewy Inc, DoorDash Inc, eBay Inc, Instacart, Liftoff Mobile Inc., Match Group Inc, Meta Platforms Inc, Reddit Inc, Uber Technologies Inc.
- p.16｜Within the last 12 months, Morgan Stanley has received compensation for products and services other than investment banking services from Airbnb Inc, Alphabet Inc., Amazon.com Inc, AppLovin Corp
- p.16｜Within the last 12 months, Morgan Stanley has provided or is providing investment banking services to, or has an investment banking client relationship with, the following company: Airbnb Inc, Alphabet Inc., Amazon.com Inc, AppLovin Corp
- p.16｜Within the last 12 months, Morgan Stanley has either provided or is providing non-investment banking, securities-related services to and/or in the past has entered into an agreement to provide services or has a client relationship with the following company: Airbnb Inc, Alphabet Inc., Amazon.com Inc, AppLovin Corp
- p.16｜In the next 3 months, Morgan Stanley expects to receive or intends to seek compensation for investment banking services from Airbnb Inc, Alphabet Inc., Amazon.com Inc, AppLovin Corp
- p.16｜Morgan Stanley & Co. LLC makes a market in the securities of Bumble Inc., Criteo SA, DoubleVerify Holdings Inc, Expedia Inc., FIGS, Inc., Grindr Inc., Playtika Holding Corp, Revolve Group Inc, Shutterstock Inc, Webtoon Entertainment Inc, Yelp Inc, Zillow Group Inc.
- p.16｜The equity research analysts or strategists principally responsible for the preparation of Morgan Stanley Research have received compensation based upon various factors, including quality of research, investor client feedback, stock picking, competitive factors, firm revenues and overall investment banking revenues.
- p.16｜The following analysts hereby certify that their views about the companies and their securities discussed in this report are accurately expressed and that they have not received and will not receive direct or indirect compensation in exchange for expressing specific recommendations or views in this report: Brian Nowak, CFA.
- p.16｜An employee, director or consultant of Morgan Stanley is a director of eBay Inc. This person is not a research analyst or a member of a research analyst's household.

## Q11 · 他的**风险章**挂了数字吗？

**风险条目本身没挂数字（6 条全是方向句），但情景价挂了，所以能拼出"若 EPS 落到 X ⇒ PT 变 Y%"的条件句——只不过这个数字来自三档情景，不是敏感度表。**

- 条目层面：RISKS TO UPSIDE 3 条、RISKS TO DOWNSIDE 3 条，**无一条附百分点、金额或概率**。全篇没有 WACC ±1%、永续增长率 ±0.5%、目标倍数 ±1x 对 PT 的影响表——因为没有 DCF，也没做倍数敏感度。
- 可量化层面（来自估值表，不是风险段）：**若 EPS 落到熊市 16.21（较基准 17.71 低 8.5%）⇒ PT $250，较基准 $415 下行 40%、较现价下行 29%**；牛市中 EPS 18.68（+5.5%）⇒ PT $480，上行 16%。这组数字说明：**EPS 只差 8.5%，PT 差 40% ⇒ 风险几乎全在倍数上**，而倍数风险在风险段里一个字都没提（六条全是基本面条目，没有一条讲"估值中枢下移"）。
- 另外两条可量化的经营风险线索（散在正文）：资本开支 2027 年 $350bn、2028 年 $375bn，而折旧从 21,136 涨到 117,636.6；若 1P TPU 的单 GW 收入从 $19,810 掉到 $15,000，按 4 GW 计 2028 年收入少约 $19bn（我们的推算，非原文）。

判断：**风险段是样板风险（不是缺口）**，共 6 条、全为方向句；量化下行只能借情景表取，且缺失"倍数风险"这一条本件最该讲的风险。

### 依据

- p.14｜RISKS TO UPSIDE
- p.14｜Hiring and/or spend per headcount is lower than expected.
- p.14｜High exposure to SMB and travel could pressure ad revenue in a recession
- p.6｜<tr><td>% upside/(downside) (29%) 17% 36%</td></tr>
- p.10｜<tr><td>Depreciation (included in expense lines)</td><td>21,136.0</td><td>34,539.8</td><td>70,221.8</td><td>117,636.6</td></tr>
- p.1｜now modeling $350bn/$375bn of capex in '27/'28.

## Q12 · 这份报告落在**静默期窗口**内吗？

**不能判定为"否"——本件是本批里唯一一份真需要核发行日的。**

- 发布日：2026 年 6 月 29 日 22:14 GMT（美东时间 6 月 29 日下午 6 点后）。
- 关键事实：披露页明写"过去 12 个月 Morgan Stanley 主承销或联席主承销了 **Alphabet Inc.** 的公开增发（或 144A 发行）"。这一次标的**就是本报告的主体公司**，不是同业的泛列表。
- 交叉印证：现金流量表 2026E 有一行 "Net proceeds from a public stock offering 84,750.0"（百万美元），说明模型里确实假定本年度完成了一笔约 $84.75bn 的公开增发。这与披露的"12 个月内主/副承销"相互对应，即**发行大概率发生在 2026 年上半年**。
- 判定规则：作为承销商，二次发行后 3 天内不得发布报告（例外：新兴成长公司、经法务授权的重大新闻、活跃交易证券）。若该笔发行定价在 2026 年 6 月 26 日（周五）之后，本件即落窗；若在上半年更早，则不落窗。
- 结论：**披露未给发行定价日，无法核到具体日期，故不能判"不落窗"**。按"未证伪即存疑"处理，记为待核项交主控，并附上核验路径：查 2026 年上半年 Alphabet 的股权融资公告定价日，与本件 6/29 比对。

其余线索不构成本项：报告是常规个股观点更新（Idea），不是发行相关文件；文中无 IPO、锁定期、稳定价格期等表述。

### 依据

- p.1｜June 29, 2026 10:14 PM GMT
- p.16｜Within the last 12 months, Morgan Stanley managed or co-managed a public offering (or 144A offering) of securities of Airbnb Inc, Alphabet Inc., Amazon.com Inc, Compass, Inc., eBay Inc, Liftoff Mobile Inc., Match Group Inc, Meta Platforms Inc, Uber Technologies Inc.
- p.12｜<tr><td>Net proceeds from a public stock offering</td><td>0.0</td><td>84,750.0</td><td>0.0</td><td>0.0</td></tr>
