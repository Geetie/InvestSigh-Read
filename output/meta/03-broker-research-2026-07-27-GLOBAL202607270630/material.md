---
id: 03-broker-research-2026-07-27-GLOBAL202607270630
cat: "03"
sub: broker-research
template: broker-research
template_version: 2
date: 2026-07-27
time: "00:00"
title: "03-broker-research-2026-07-27-GLOBAL202607270630"
kind: "broker-research"
issuer: ""
ticker: META
source_pages: 118
---

> 骨架已生成，答案待填。原文：`corpus/materials/mineru/03-broker-research-2026-07-27-GLOBAL202607270630/full.md`（118 页）。
> 填写纪律见 `docs/EVIDENCE-SPEC.md`：有答案必有依据块，块须逐字，页码 `p.N` 以源 PDF 为准。

## Q1 · 他的**关键假设取值**各是多少？

本件是多标主题件（Global Insight，横跨美股、欧洲、拉美、亚洲六十余标的），**没有单一标的的六年损益表**，六项标准假设只能按它真正在用的那条假设链给，缺的项如实标出。

- **收入增速（量）**：核心链条是"算力需求 10x 才换 2x 能力"，用芯片效率对冲——NVIDIA 每代 +250% exaFLOPs、仅 +60% 功耗。带明确年化的只有中国口径：AI 芯片 TAM 2030 年 US$91bn、2025–30 CAGR 23%（较原 US$67bn 上调 36%）。单票层面没有收入增速行。
- **毛利率**：他给的是"token 销售毛利率"，口径写明只计数据中心成本、不含模型研发与托管——Blackwell ~50%、Rubin ~75%、Feynman ~90%（Exhibit 19 标题给 58–90% 区间）；Kimi K3（输入 $3、输出 $15 每百万 token）在 Blackwell 上为 45%。
- **营业利润率**：材料未给出此项（全篇无损益表；token 毛利不等于营业利润率，不能替代）。
- **资本开支**：META 在 '27+'28 两年合计 $380bn+；中国超大规模厂商 2027 年约 Rmb706bn（≈US$101bn），仅相当于美国同业 capex 的 ~12%，中国云 capex 为美国的 11–14%。
- **实际税率**：材料未给出此项。
- **摊薄股数**：材料未给出此项（不能从 EPS 反推）。
- **EPS（旁证）**：只有 PT 反算值——META $775 ≈ 23x blended '27/'28 P/E ⇒ 隐含 EPS 约 $33.7，系我按 PT÷倍数推算，非原文数。

### 依据

- p.5｜While it may sound daunting for LLM developers to accumulate 10x the compute to achieve a 2x increase in capabilities, an important mitigant is the rapid improvement in GPU and TPU computational power per chip.
- p.21｜One analysis suggests that a single AI Agent may consume ~15x the tokens relative to a query-based usage of a LLM. Further, a typical query based usage of a LLM consumes ~5,000 tokens.
- p.21｜At an assumed average token price of $3-10 (in most cases, input tokens outnumber output tokens), the cost to execute the economic task would be $2-5, only a fraction of the $55 benefit.
- p.21｜the Blackwell data center would generate margins of ~50%, factoring in all data center costs (but not the cost to develop or host the LLM).
- p.21｜Exhibit 19: Our Intelligence Factory Model Projects 58-90% Margins for Token Sales, Depending on GPU
- p.22｜given the estimated $3/ million input tokens and $15/million output tokens, margins in the same data center utilizing Blackwells are 45%.
- p.30｜META's $380bn+ of capex ('27+'28)
- p.45｜We forecast China's AI chip TAM to reach US$91bn by 2030 up 36% from US$67bn previously, implying a 23% CAGR over 2025-30.
- p.61｜cloud capex is ~11–14% of US hyperscalers' level as of 2026E, and Chinese hyperscalers' 2027 capex of ~Rmb706bn (~US$101bn) would account for only ~12% of US hyperscalers' capex.

## Q2 · **他和我差在哪一项、哪一年**？差多少？

我方模型数值不在本份材料内，逐行"他 vs 我"的对照需跨批（交主控）。

本件没有共识表：全篇唯一出现 consensus 的一句是对 EQIX 的定性判断，无数值；估计表列头只有市值、上浮空间、2027 远期 P/E，没有共识列。因此改做「他本期 vs 他上期」对照：

| 项目 | 上期 | 本期 | 差额 |
|---|---|---|---|
| 中国 AI 芯片 TAM（2030 年） | US$67bn | US$91bn | +US$24bn，+35.8%（原文口径 +36%） |
| 主权/国企相关 TAM | US$7bn | US$9bn | +US$2bn，+28.6% |
| MLCC 直客价格（2H26 涨幅） | 10–20% | 30–40% | 中值 +20pp |

三项全部落在**收入端**（市场规模与价格），利润率端本期没有动；也就是说他和上期的分歧在"量价"，不在"每单位赚多少"。对第三方一致预期只有一句方向性表述（"above 3rd-party estimates"），无数字，做不出差额。

### 依据

- p.45｜We forecast China's AI chip TAM to reach US$91bn by 2030 up 36% from US$67bn previously, implying a 23% CAGR over 2025-30.
- p.45｜We raised sovereign and SOE-related TAM to US$9bn up from US$7bn.
- p.57｜We now expect direct-customer pricing to increase 30-40% on average in 2H26, vs. our previous estimate of 10–20%.
- p.31｜and above 3rd-party estimates.
- p.19｜<tr><td>Ticker</td><td>Company Name</td><td>Country</td><td>Sector</td><td>Rating</td><td>Mkt Cap. (US$ bn)</td><td>PT (US$, unless noted)</td><td>Last price</td><td>Upside</td><td>2027 Fwd P/E Estimate</td></tr>

## Q3 · 他的**财年是谁的财年**？

本件不设单一公司的财年损益表，时间口径按标的所在市场混用，要分三种读：

1. **日历年（多数美股与主题口径）**：NVDA 用 "CY27 EPS"，META 用 "blended '27/'28 P/E"，AVGO、BX 用 "2027e"，拉美表列头直接写 "2027 Fwd P/E Estimate" ⇒ 均为日历年，可直接与日历年末共识比。
2. **公司财年**：MSFT 的 "FY28e EPS $23.86" 是公司财年（6 月结账），与日历年差半年，不可直接比，需先换口径；材料未标月末，此点按公司惯例推定，不作已确认。
3. **未标年度的**：主题层的 TAM、GW、EV/Watt 用 2028/2030 自然年，仍属日历年。

结论：除 MSFT 一项外，本件全部按日历年，可与日历共识直接比；MSFT 须换算后再比。

### 依据

- p.30｜Our price target of $288 (39% upside) reflects ~22x our MW CY27 EPS of $13.08.
- p.30｜Our price target of $775 (30% upside) reflects implied ~23X base case blended '27/'28 P/E.
- p.31｜Our price target of $600, representing 57% upside, reflects approximately 25x our base-case FY28e EPS estimate of $23.86.
- p.19｜<tr><td>Ticker</td><td>Company Name</td><td>Country</td><td>Sector</td><td>Rating</td><td>Mkt Cap. (US$ bn)</td><td>PT (US$, unless noted)</td><td>Last price</td><td>Upside</td><td>2027 Fwd P/E Estimate</td></tr>

## Q4 · **预测修正**：改了哪一项、从多少改到多少？改的是**假设**还是**结论**？

三处实质修正，**全部是假设层**（市场规模、价格），没有一处是评级或目标价的口径变动：

| 项目 | 旧值 | 新值 | 变动 |
|---|---|---|---|
| 中国 AI 芯片 TAM（2030） | US$67bn | US$91bn | +35.8%（原文 +36%），并给出 2025–30 CAGR 23% |
| 主权/国企相关 TAM | US$7bn | US$9bn | +28.6% |
| MLCC 直客价格（2H26 涨幅） | 10–20% | 30–40% | 中值 +20pp |

上调理由写得可核：新增"中国 CSP 海外 AI 数据中心采用本地 GPU"一类（2028/2029/2030 分别按海外 capex 的 3%/10%/20% 渗透）；ByteDance 2027 capex 用其自设的保守值 US$80bn（≈Rmb542bn）；另新增金山云入库。

**分层判定：重要**——改的是收入侧假设（TAM 与价格），会直接改 EPS。但本件没有同步给出对应标的的 PT 修订说明；唯一一组近期 PT 变动是无公司名的历史序列（4/28/26 的 850,000 降到 7/10/26 的 580,000，−31.8%），无法归到本主题的修订上，只记"幅度有、归属无"。

### 依据

- p.45｜We forecast China's AI chip TAM to reach US$91bn by 2030 up 36% from US$67bn previously, implying a 23% CAGR over 2025-30.
- p.45｜We raised sovereign and SOE-related TAM to US$9bn up from US$7bn.
- p.45｜We added Kingsoft Cloud to our database; its capex surged to Rmb3bn, with fullyear 2026 capital investments projected to exceed Rmb15-20bn to meet explosive AI and cloud demand.
- p.57｜We now expect direct-customer pricing to increase 30-40% on average in 2H26, vs. our previous estimate of 10–20%.
- p.97｜11/5/25:337000; 3/27/26:420000:4/28/26:850000; 7/10/26:580000

## Q5 · 他给了**情景**吗？各自驱动假设是什么？

**单情景**：每只标的只给一个目标价，全篇没有 Bull/Base/Bear 三档 PT。

- 单点例：META $775（≈23x blended '27/'28 P/E）；NVDA $288（22x CY27 EPS 13.08）；AVGO $502（28x 2027e EPS 17.92）。
- 他另用一列 **Bull/Bear Skew** 表达上下行不对称：META 2.8、NVDA 2.5、AMZN 7.6、TeraWulf 1719.0。但**两端目标价与触发假设均未公布**，只有比值，无法复算情景，更不能倒推 bull/bear 价。
- 主题层给了一个可读区间：电力壳公司（PSP）17 笔租约的价值创造为 ~$7–19/W，市场按 $15 EV/Watt 交易，他认为终值应给 15x EV/Watt，相对成熟数据中心运营商的 20–25x 折价 ⇒ 差别落在**倍数**，不在经营假设。
- 下行只以"五个担忧"方向列出：tokenmaxxing、中国开源模型、数据中心政策反弹、模型封锁、物理瓶颈。

结论：没有三档情景；情景信息只有 Bull/Bear Skew 一个比值列 + 一个 EV/Watt 倍数区间。

### 依据

- p.30｜Our price target of $775 (30% upside) reflects implied ~23X base case blended '27/'28 P/E.
- p.19｜<tr><td>META.O</td><td>Meta</td><td>Interactive Media &amp; Services</td><td>1307064</td><td>30%</td><td>2.8</td><td>645.85</td></tr>
- p.19｜<tr><td>Ticker</td><td>Company Name</td><td>GICS Industry</td><td>Market Cap USD ($M)</td><td>Upside to PT</td><td>Bull/Bear Skew</td><td>Price (USD)</td></tr>
- p.16｜Exhibit 10: EV/Watt for the Powered Shell Provider Cohort from $2.04-$4.52 per watt. We Remain Bullish on the Conviction of These Names Trading at $15 EV/Watt.
- p.32｜We believe PSP stocks will eventually trade at a 15x EV/Watt multiple, a discount to the 20-25x multiple omature data center providers such as EQIX and DLR
- p.32｜Across 17 data center lease transactions that these companies signed with AI customers, value creation ranges from ~ $7 to $19 per watt and continues to trend higher.

## Q6 · 他用了哪几种**估值方法**？**能互相印证吗**？

四种方法，**每一只标的最多只用一种**，因此没有一处交叉印证：

1. **P/E × EPS（主流）**：NVDA 288 = 22 × 13.08；AVGO 502 = 28 × 17.92；MSFT 600 ≈ 25 × 23.86；MU 1200 = 30 × 40（through-cycle）；BX 184 = 22.5 × 8.17。五例算术自洽，可复算。
2. **AFFO 倍数（REIT）**：EQIX mid'27 PT $1,250 ≈ 25x 远期 AFFO/share。
3. **15 年 DCF**：SpaceX PT $300，DCF 只把 Space + Connectivity 估到 ~$136/share，其余靠 2028 年 ~$100bn AI 收入（6 GW 平均算力）撑。**WACC 与永续增长率全篇未给**（搜 WACC / terminal growth 均 0 命中），DCF 不可复算。
4. **EV/Watt 相对倍数**：PSP 给 15x，对标成熟运营商 20–25x。

能否互证：不能。唯一"两种口径"的 SpaceX 也不是互证——DCF 只覆盖部分业务（$136 对 PT $300），差额是未建模的 AI 期权，等于用叙事补 DCF。倍数法之间也不互校（各标的倍数不同，且无横截面锚定）。

### 依据

- p.30｜Our price target of $288 (39% upside) reflects ~22x our MW CY27 EPS of $13.08.
- p.30｜Our price target of $502 (31% upside) reflects 28x 2027e ModelWare Base EPS of $17.92.
- p.31｜Our price target of $600, representing 57% upside, reflects approximately 25x our base-case FY28e EPS estimate of $23.86.
- p.31｜we like Micron (MU) with a price target of $1200 (30% upside), reflecting 30x through-cycle earnings of $40.
- p.31｜our $300 price target implying substantial upside and supported by a 15-year DCF that values Space + Connectivity alone at approximately $136/share.
- p.32｜Our $184 price target reflects 22.5x Base Case 2027e EPS of $8.17 and offers ~48% upside.
- p.32｜Our mid'27 price target of $1,250, representing 15% upside, implies ~25x fwd. AFFO/share.

## Q7 · 目标价的**依据 / 估值方法解释 / 风险列示**齐不齐？

逐条判：

1. **目标价由哪个方法算出（可复算）**：**有**。PT = 倍数 × 指标，两个输入都落下：NVDA 288 = 22x × CY27 EPS 13.08；AVGO 502 = 28x × 17.92；MSFT 600 = 25x × FY28e 23.86；MU 1200 = 30x × 40；BX 184 = 22.5x × 8.17；EQIX 1,250 ≈ 25x × 远期 AFFO。
2. **方法的关键输入**：**部分有**。倍数与指标齐；但 DCF（SpaceX）没有 WACC、没有永续增长率、没有现金流表，只有终点值 $136/share；全篇无敏感性表，目标价对输入的弹性无法核。
3. **可能阻碍达成目标价的风险列示**：**缺**。没有任何一只标的的"risks to our price target"段；披露区只有一句"如需与任何评级或目标价相关的估值方法与风险，请联系 Client Support Team"，把风险推到线下；正文风险是主题级五项担忧与区域级四条，均不挂到具体 PT。

⇒ **三件缺第三件，按 2241(c)(1) 属形式不合规，须上报主控。**

另发现两处引用陷阱：META 文中写 "$775 (30% upside)"，但表内价 $645.85 反算只有 +20.0%；MU（$1200 对 $990.21，反算 +21.2%，文中 30%）与 AMZN（$330 对 $249.99，反算 +32.0%，文中 42%）同类偏差约 7%，推测是价格时点不同。引用上浮空间必须自算，不能照抄正文括号里的数。

### 依据

- p.30｜Our price target of $775 (30% upside) reflects implied ~23X base case blended '27/'28 P/E.
- p.30｜Our price target of $502 (31% upside) reflects 28x 2027e ModelWare Base EPS of $17.92.
- p.31｜Our price target of $600, representing 57% upside, reflects approximately 25x our base-case FY28e EPS estimate of $23.86.
- p.85｜For valuation methodology and risks associated with any recommendation, rating or price target referenced in this research report, please contact the Client Support Team as follows
- p.1｜Bottom line: we're bullish on the "Intelligence Superhighway" but see key speed bumps ahead.
- p.19｜<tr><td>META.O</td><td>Meta</td><td>Interactive Media &amp; Services</td><td>1307064</td><td>30%</td><td>2.8</td><td>645.85</td></tr>
- p.19｜Source: Morgan Stanley Research, Factset; Data as of 7/24/2026.

## Q8 · **评级分布三件**（三档占比 · 投行关系占比 · 观测时点）齐不齐？

三件齐，且全部来自同一张机构级披露表，不是数报告里的股票条数：

- **三档占比**：Overweight/Buy 1544 家（42%）、Equal-weight/Hold 1577 家（43%）、Not-Rated/Hold 3 家（0%）、Underweight/Sell 544 家（15%），合计 3,668 家。
- **投行关系占比**：投行客户（IBC）合计 933 家；分档为 OW 453 家（占 IBC 49%、占该档 29%）、EW 390 家（42%、25%）、NR 1 家（0%、33%）、UW 89 家（10%、16%）。定义写明 IBC 是"过去 12 个月从 MS 收到投行报酬的公司"。
- **观测时点**：as of June 30, 2026，即最近季末。发布日 2026-07-27 距季末 27 天（>15 天），用最近季末合规。

另附 Other MISC 客户 1,731 家（OW 757、EW 769、NR 1、UW 204）。读表注意两点：MS 不用 Buy/Hold/Sell 评级，表中三档名只为 FINRA 口径对应；百分比因四舍五入不一定加总 100%。

### 依据

- p.90｜Global Stock Ratings Distribution
- p.90｜(as of June 30, 2026)
- p.91｜<tr><td>Overweight/Buy</td><td>1544</td><td>42%</td><td>453</td><td>49%</td><td>29%</td><td>757</td><td>44%</td></tr>
- p.91｜<tr><td>Equal-weight/Hold</td><td>1577</td><td>43%</td><td>390</td><td>42%</td><td>25%</td><td>769</td><td>44%</td></tr>
- p.91｜<tr><td>Not-Rated/Hold</td><td>3</td><td>0%</td><td>1</td><td>0%</td><td>33%</td><td>1</td><td>0%</td></tr>
- p.91｜<tr><td>Underweight/Sell</td><td>544</td><td>15%</td><td>89</td><td>10%</td><td>16%</td><td>204</td><td>12%</td></tr>
- p.91｜<tr><td>Total</td><td>3,668</td><td></td><td>933</td><td></td><td></td><td>1731</td><td></td></tr>
- p.91｜Investment Banking Clients are companies from whom Morgan Stanley received investment banking compensation in the last 12 months.
- p.90｜Overweight, Equal-weight, Not-Rated and Underweight are not the equivalent of buy, hold, and sell but represent recommended relative weightings

## Q9 · **评级 / 目标价历史走势图**在不在（含赋改日期）？

有图有数据，但**归属不到单一标的**：

- 文本层出现 4 组 "Stock Rating History / Price Target History" 序列（分在四个披露页），图形本身未进文本层，页眉只有 Global Insight，**没有公司名**，无法把某组序列指给某只股票。
- 覆盖期：PT 序列最早 12/11/20（起点为 NA）、评级序列自 7/1/21 起，最晚一次变动 7/10/26，跨度约 5 年，远超一年，属"应附且已附"。
- 变动条数：第一组 PT 5 个点（NA→71,000→88,000→110,000→120,000）；第二组 6 个点（190,000 起，3/18/26 到 340,000）；第三组约 30 个点（98,000 起，9/15/24 低见 76,000，5/6/26 到 381,000）；第四组为最近一段（337,000→420,000→850,000→580,000）。
- 最近一次：7/10/26，PT 由 4/28/26 的 850,000 下调至 580,000（−31.8%）。

判读：**报告层面有**（4 组带日期的评级/PT 历史，覆盖满一年）；**标的层面未见**——本件点名的 META 等标的在本件内没有自己的评级/PT 走势序列，只有上述 4 组无名序列，不能张冠李戴。

### 依据

- p.91｜Stock Rating History:7/1/21 : NA/NR; 3/20/25:NA/NR; 6/24/25: E/NR; 7/25/25: E/A; 1/14/26 : 0/A
- p.91｜Price Target History: 12/11/20: NA; 6/24/25 : 71000; 11/6/25: 88000; 1/14/26: 110000; 6/17/26 : 120000
- p.94｜Stock Rating History: 7/1/21 :0/I; 3/14/22: E/I; 3/18/26 : 0/I
- p.94｜Price Target History: 4/29/21 : 190000; 3/14/22 : 132500; 5/25/23 : 125000; 3/27/24 : 180000; 1/16/25: 140000; 3/18/26: 340000
- p.96｜Price Target History: 6/8/21 :98000; 8/12/21: 89000; 9/15/21: 95000; 12/3/21: 97000;
- p.96｜10/8/25 :111000; 10/23/25: 120000; 10/30/25: 139000; 11/5/25: 144000; 1/8/26: 170000: 1/30/26 :210000; 2/24/26: 248000; 3/18/26:251000;4/19/26:362000;5/6/26:381000
- p.97｜11/5/25:337000; 3/27/26:420000:4/28/26:850000; 7/10/26:580000

## Q10 · **九项冲突披露**在不在**首页**（或指明页码）？

首页以样板句指明披露区在报告末（"refer to the Disclosure Section, located at the end of this report"，未给页码），逐项内容在末尾披露附录。本报告标的按 META 核对，逐项：

| 项 | 有/无 | 位置与内容 |
|---|---|---|
| ① 分析师及家庭持仓 | 有 | 认证段的定义句写明覆盖"分析师或家庭成员"；同段名单中 Laura Wang 项下含 "Meta Platforms Inc(common or preferred stock)"，Devin McDermott 项下亦有 META，另 Gregory Gao、Joy Golub 项下也有（后两人不在认证名单内）⇒ 本人/家庭持本标的普通股 |
| ② 报酬是否挂钩投行收入 | 有（间接） | 披露区薪酬段：报酬基于研究质量、客户反馈、选股、竞争因素、"firm revenues and overall investment banking revenues"；同段又声明"not linked to investment banking or capital markets transactions"，故为间接计入总收入，非按投行项目分成 |
| ③ 近 12 个月主/副承销或收投行报酬 | 有 | "managed or co-managed a public offering (or 144A offering)"名单含 Meta Platforms Inc（与 Maynilad、MiniMax 同列）；"received compensation for investment banking services"名单亦含（与 Micron、Microsoft、MiniMax 同列） |
| ④ 未来 3 个月是否寻求投行费 | 有 | 该名单起始句在披露区上段，续行含 "Meta Platforms Inc"（与 MediaTek、Megacable、MetaX 同列）⇒ 明示未来三个月拟寻求投行服务报酬 |
| ⑤ 近 12 个月非投行服务报酬 | 有 | "products and services other than investment banking services"名单含 Meta Platforms Inc（与 MediaTek、Micron、Microsoft 同列） |
| ⑥ 是否客户及服务类型 | 有 | 客户关系段的定式句为"已提供/正在提供非投行、证券相关服务，或曾达成服务协议，或存在客户关系"；续行含 Meta Platforms Inc ⇒ 服务类型＝非投行证券相关服务 |
| ⑦ 实益持有该类普通股 ≥1% | 有 | "As of June 30, 2026, Morgan Stanley beneficially owned 1% or more of a class of common equity securities"，名单含 "MediaTek, Meta Platforms Inc, Micron Technology Inc." ⇒ 主体为本机构、标的为本标的普通股，四要素齐 |
| ⑧ 是否做市 | 未见 | 查了披露区的做市段：唯一做市句点名 Ameren 至 ZoomInfo 约 79 家，逐名核对**不含 Meta**。相近的是另一句"包括 market making、提供流动性……"的机构层通用声明，未点名任何标的，主体与标的均不符，不算本项确认 |
| ⑨ 分析师过去 12 个月是否从标的收酬 | 未见 | 查了披露区全部与报酬有关的段落，无"分析师或其家庭自标的公司收取报酬/礼品"之类句子。两句最接近的都不算：薪酬因素句是公司层（研究质量、总收入），"IBC 是过去 12 个月收到投行报酬的公司"是机构层，均不指向分析师个人与本标的 |
| ⑩ 其他重大冲突 | 有（均不含本标的） | 具名：提前接触研究的研究人员持股名单（Apple、Atlassian、Blackstone、Bloom、Cisco、Hut 8、Micron、Microsoft、NVIDIA、T-Mobile、Uber、Western Digital、Workday，**无 META**）；MS 员工/董事兼任董事名单（Cummins、eBay、Elastic、HP、Occidental、Tenable，**无 META**）；净多头超 0.5% 仅 Lingyi Itech；一名 TMT 团队成员转任 DigitalOcean；另有 Smith Barney 复核人与报告复核人为同一人这一制度性冲突 |

红旗提示：该机构实益持有本标的 ≥1% 普通股 + 近 12 个月收投行费 + 未来 3 个月拟寻求投行费 + 认证分析师本人持本标的股票 ⇒ 引用其 META 观点时须立场折价。

### 依据

- p.1｜For analyst certification and other important disclosures, refer to the Disclosure Section, located at the end of this report.
- p.85｜The analyst or strategist (or a household member) identified below owns the following securities (or related derivatives)
- p.86｜Laura Wang - Akamai Technologies, Inc.(common or preferred stock), Cisco Systems Inc(common or preferred stock), Intel Corporation(common or preferred stock), KIOXIA Holdings(common or preferred stock), Meta Platforms Inc(common or preferred stock), NVIDIA Corp.(common or preferred stock)
- p.86｜As of June 30, 2026, Morgan Stanley beneficially owned 1% or more of a class of common equity securities of the following companies covered in Morgan Stanley Research:
- p.86｜Match Group Inc, MDA Space Ltd, MediaTek, Meta Platforms Inc, Micron Technology Inc., Micronics Japan, Microsoft
- p.87｜Match Group Inc, Maynilad Water Services, Inc., Meta Platforms Inc, Micron Technology Inc., Microsoft, MiniMax, Mitsubishi Heavy Industrie
- p.88｜Inc, Maynilad Water Services, Inc., MDA Space Ltd, MediaTek, Megacable Holdings CPO, Meta Platforms Inc, MetaX Integrated Circuits, Micron Technology Inc., Micronics Japan, Mi
- p.88｜Global, Liberty Latin America Ltd, Liftoff Mobile Inc., Lingyi Itech Guangdong Co, Logitech International SA, Lumentum Holdings Inc, Match Group Inc, MediaTek, Meta Platforms Inc, Micron Technology Inc., Microsoft, Millicom International Cellular SA,
- p.89｜Within the last 12 months, Morgan Stanley has either provided or is providing non-investment banking, securities-related services to and/or in the past has entered into an agreement to provide services or has a client relationship with the following company
- p.90｜The equity research analysts or strategists principally responsible for the preparation of Morgan Stanley Research have received compensation based upon various factors, including quality of research, investor client feedback, stock picking, competitive factors, firm revenues and overall investment banking revenues.
- p.90｜Morgan Stanley & Co. LLC makes a market in the securities of Ameren Corp, Amplitude Inc., Antero Midstream Corp, Appian Corp, Array Technologies Inc, Asana Inc, Atmos Energy Corp., Autodesk, AvePoint, Blackline Inc, Box Inc
- p.90｜Targa Resources Corp., TD Synnex Corporation, TIM Participacoes, Twilio Inc, Varonis Systems, Inc., Vertex Inc., Viasat Inc, Webtoon Entertainment Inc, Yelp Inc, ZoomInfo Technologies Inc.
- p.90｜An employee, director or consultant of Morgan Stanley is a director of Cummins Inc, eBay Inc, Elastic NV, HP Inc., Occidental Petroleum Corp, Tenable Holdings Inc.
- p.101｜A member of Research who had or could have had access to the research prior to completion owns securities (or related derivatives) in the Apple, Inc., Atlassian Corporation PLC, Blackstone Inc., Bloom Energy Corp., Cisco Systems Inc, Hut 8 Mining Corp., Micron Technology Inc., Microsoft, NVIDIA Corp., T-Mobile US, Inc., Uber Technologies Inc, Western Digital, Workday Inc.
- p.101｜As of July 23, 2026, Morgan Stanley beneficially owned a net long position exceeding 0.5% of the total issued share capital of the following companies covered in Morgan Stanley Research: Lingyi Itech Guangdong Co.
- p.85｜A member of the Telecom & Networking Equipment team has accepted a role with a company covered in Morgan Stanley Research: Josh Baer, CFA - DigitalOcean Holdings Inc.

## Q11 · 他的**风险章**挂了数字吗？

判据（能否写成"若〔变量〕变 X ⇒〔某年〕EPS 或 PT 变 Y%"）**不成立**，属样板风险，不是缺口：

- 全篇无敏感性表：搜 WACC、terminal growth、sensitivity 均 0 命中，也没有"目标倍数 ±1x / 折现率 ±1% 对 PT 影响"这类表。
- 风险条目共 9 条，全为方向句：首页五个担忧（tokenmaxxing、中国开源模型、数据中心政策反弹、模型封锁、物理瓶颈）；区域策略页四条（中东能源与产品市场、长端实际利率与信用条件、数据中心建设瓶颈侵蚀定价权与毛利、AI 监管与中美竞争）。
- 带数字的只有"风险规模"，不是"盈利影响"：美国数据中心电力缺口 2028 年 ~38GW、2030 年 ~122GW；17 个州已收紧或拟收紧数据中心税收优惠。这些都不落到任何标的的 EPS 或 PT 百分点。

结论：一条也写不成敏感度，按"样板风险"记（共 9 条方向句、0 条附 EPS/PT 影响）；若要用，只能自己另建敏感度。

### 依据

- p.1｜we revisit key debates and concerns (Chinese models, tokenmaxxing, political pushback, "model lockdowns," physical bottlenecks) and ways to play the dip.
- p.42｜We still see a long list of potential risks, including:
- p.13｜With an estimated ~38 GW potential shortfall in power for US data centers through 2028 (growing to ~122GW through 2030)
- p.13｜While largely not permanent in nature, we still see these actions as a risk to future data center build-out, potentially contributing to pauses or delays

## Q12 · 这份报告落在**静默期窗口**内吗？

**否，不落窗。**

- 发布日 2026-07-27 06:30 GMT；本件是 Global Insight 主题更新（覆盖六十余标的、无单一发行主体），不是某次发行的承销商研究。
- 全文无发行时间线：既无 IPO/二次发行的定价日，也无 Manager/Co-Manager 的任命日期。唯一提到的发行事件是 MiniMax 与 Z.AI 的港股上市及其 2026 年 7 月初的解禁，与本件相隔数周，且 MS 在该段只讨论指数纳入，不涉承销角色。
- 反向核对：披露区确实列有"近 12 个月为 META 主/副承销或收投行报酬"，但**未给该次发行的具体日期**，无法核到 IPO 后 10 天／二次发行后 3 天的窗口；本件亦非发行相关研究，按常规覆盖更新处理。

结论：否；属常规主题覆盖更新，不是发行窗口内的静默期违规件。

### 依据

- p.1｜July 27, 2026 06:30 AM GMT
- p.67｜the two listed LLM plays – Z.AI (Knowledge Atlas) and MiniMax – are both listed in the Hong Kong market, having just made it into the Hang Seng and Hang Seng Tech Indices in June this year.
- p.86｜Within the last 12 months, Morgan Stanley managed or co-managed a public offering (or 144A offering) of securities of A2A SpA
