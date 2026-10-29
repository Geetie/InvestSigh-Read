---
id: 03-broker-research-2026-07-02-MetaPlatforms
cat: "03"
sub: broker-research
template: broker-research
template_version: 2
date: 2026-07-02
time: "00:00"
title: "03-broker-research-2026-07-02-MetaPlatforms"
kind: "broker-research"
issuer: ""
ticker: META
source_pages: 13
---

> 骨架已生成，答案待填。原文：`corpus/materials/mineru/03-broker-research-2026-07-02-MetaPlatforms/full.md`（13 页）。
> 填写纪律见 `docs/EVIDENCE-SPEC.md`：有答案必有依据块，块须逐字，页码 `p.N` 以源 PDF 为准。

## Q1 · 他的**关键假设取值**各是多少？

产品型为**事件型首评（UBS First Read）**：彭博报道 Meta 考虑对外出售"裸算力"或模型访问权当日的一页短评，正文只有摘要、CEO 两段旧发言、估值三行；财务数据全部压在首页两张表里。**标的即 META**，评级与目标价均为本标的（Buy / PT US\$865，as of 2026-07-01，现价 US\$601.85）。

六项逐行（财年列头为 `12/26E`…`12/30E`，即日历年，见 Q3）：

- **收入增速**：表内不给 YoY 行，按相邻年份收入复算 —— 2025 +22.2%、**2026E +25.5%**（252,270 vs 200,965）、**2027E +22.6%**（309,386）、**2028E +16.7%**（360,907）、2029E +14.4%、2030E +12.4%。增速为复算值，非原文行。
- **毛利率**：**未给该行**。全表无毛利/收入成本科目，只有 `EBIT (UBS) margin %`，属营业口径，不能替代毛利。
- **营业利润率**：EBIT（UBS 调整后）margin 2026E **47.6%**、2027E **44.3%**、2028E **41.4%**、2029E 37.3%、2030E 32.7%；2025 实际 59.8% ⇒ 2026 一年掉 12.2pp。绝对额 EBIT 2026E 120,077 几乎与 2025 的 120,263 持平（-0.2%），而收入仍增 25.5% —— 这就是标题里"EPS 压缩"的机制：收入涨、利润不涨。
- **资本开支**：**未给该行**。表内只有 `Equity FCF (UBS) yield %`（2026E 为负 0.1%），无 capex、无折旧、无现金流表，无法推出算力投入斜率。
- **实际税率**：**未给该行**。无税前利润行，税率不可从净利与 EBIT 反推（纪律禁止倒推）。
- **摊薄股数**：**未给该行**。仅有当前 `Shares o/s 2,564m (COM)`，是时点在外流通股数，不是预测期摊薄股数；不从 EPS 与净利倒推。

补两条可用的口径锚：`EPS (UBS, diluted)` 2026E 32.61、2027E 32.98、2028E 34.98（2029E 34.57、2030E 32.02，即 2029 起转降）；表脚注明 `Metrics marked as (UBS)` 者经分析师调整，故 EBIT／净利／EPS 均为 UBS 自定义口径，与公司 GAAP 报告数不可直接混用（须建定义卡）。EPS 同比：2026 +38.8%、2027 **+1.1%**（与其"2027 EPS 走平"的判断自洽）、2028 +6.1%、2029 -1.2%、2030 -7.4%。

一处内部矛盾先记下：摘要正文写"we are modeling \$32.67 / \$32.98 in 2026 / 2027 EPS"，而表内 2026E 为 32.61，2027E 32.98 一致 —— 即 2026 有两个值（差 0.06，约 0.2%），取表内值。

### 依据

- p.1｜Revenues</td><td>134,901</td><td>164,500</td><td>200,965</td><td>252,270</td><td>309,386</td><td>360,907</td><td>412,862</td><td>464,135</td>
- p.1｜EBIT (UBS)</td><td>64,391</td><td>87,692</td><td>120,263</td><td>120,077</td><td>137,199</td><td>149,390</td><td>154,162</td><td>151,561</td>
- p.1｜EBIT (UBS) margin %</td><td>47.7</td><td>53.3</td><td>59.8</td><td>47.6</td><td>44.3</td><td>41.4</td><td>37.3</td><td>32.7</td>
- p.1｜EPS (UBS, diluted) (US$)</td><td>14.87</td><td>23.86</td><td>23.49</td><td>32.61</td><td>32.98</td><td>34.98</td><td>34.57</td><td>32.02</td>
- p.1｜Net earnings (UBS)</td><td>39,097</td><td>62,360</td><td>60,476</td><td>85,263</td><td>88,088</td><td>95,075</td><td>95,664</td><td>90,237</td>
- p.1｜Shares o/s</td><td>2,564m (COM)</td>
- p.1｜Equity FCF (UBS) yield %</td><td>6.4</td><td>4.1</td><td>2.7</td><td>(0.1)</td><td>1.1</td><td>2.4</td><td>3.5</td><td>4.2</td>
- p.1｜Metrics marked as (UBS) have had analyst adjustments applied.
- p.1｜we are modeling $32.67 / $32.98 in 2026 / 2027 EPS

## Q2 · **他和我差在哪一项、哪一年**？差多少？

我方模型的对应项不在本件内，逐行"他 vs 我"必须先跨批（交主控），本卡记缺口：**我方该项未定**，不倒推我方值。

本件能立刻做的是**他 vs 同页共识**（同一张 `EPS (UBS, diluted)` 表右列为 `Cons.`，估值日 2026-07-01），这是唯一同口径可对的数：

| 摊薄 EPS（US\$） | 2026E | 2027E | 2028E |
|---|---|---|---|
| UBS | 32.61 | 32.98 | 34.98 |
| 共识 | 32.91 | 34.81 | 39.95 |
| 差（他－共识） | **-0.9%** | **-5.3%** | **-12.4%** |

按差额绝对值排序，前四项是：**2028E EPS（-5.0 美元 / -12.4%）**、**2027E EPS（-1.83 / -5.3%）**、**2026Q3 EPS（6.55 vs 7.03，-6.8%）**、2026E 全年 EPS（-0.30 / -0.9%）。

差异落在哪一端：**落在 EPS／利润率端，不在收入端**。理由是共识只给了 EPS 一列，没有收入、EBIT、毛利率的共识值，故收入端无法对照、只能判"无共识可比数"；而 EPS 的偏离逐年放大（-0.9%→-5.3%→-12.4%），在收入无法对照的前提下，这只能是费用与利润率假设的差，且越往远期差越大。

这里有一条对判断有用的推论：他 2027 年比共识低 5.3%，却给 Buy、且把 26 倍压在 2028 年 EPS 上 —— 说明**这个买入评级不靠 2027，靠 2028 之后的利润率修复**；而共识在 2028 比他高 12.4%，等于市场比他更信修复。若要去一手源核，先核的应是费用率（尤其折旧与研发）而不是收入。

另一处需要主控注意的日期口径：首页现价 US\$601.85（01-Jul-2026），而披露页的 Company Disclosures 表记 US\$563.29（30 Jun 2026），一日相差 6.8%，与 52 周区间上沿 790、下沿 525.72 并列看亦不寻常 —— 两个价格至少一个不可用，已在待核项列出。

### 依据

- p.1｜12/26E</td><td>32.61</td><td>32.91</td>
- p.1｜12/27E</td><td>32.98</td><td>34.81</td>
- p.1｜12/28E</td><td>34.98</td><td>39.95</td>
- p.1｜UBS</td><td>Cons.</td>
- p.1｜Q3E</td><td>6.55</td><td>7.03</td>
- p.1｜Price (01 Jul 2026) US$601.85
- p.5｜Meta Platforms16,28</td><td>META.O</td><td>Buy</td><td>US$563.29</td><td>30 Jun 2026</td>
- p.1｜52-wk range</td><td>US$790.00-525.72</td>

## Q3 · 他的**财年是谁的财年**？

**公司财年，十二月结账，等于日历年**，可与日历年共识直接比较。证据是列头显式写了"月/年"：`12/23 … 12/30E`，`E` 只标在 2026 年及以后；脚注又以 `Common s/h equity (12/26E)`、`Net debt to EBITDA (12/26E)` 同一写法重复，无跨年错位。表脚另注明估值用的股价格 US\$601.85 取 01-Jul-2026，可见不是"财年挪月"的写法。

一处**必须点出的写法歧义**（不影响财年判定，但影响目标价复算）：估值句写"our full year ending 1 Q28E diluted GAAP EPS of \$33.26"，字面像"截至 2028 年第一季度的十二个月"，而表内 12/28E 的摊薄 EPS 是 34.98。两者相差 1.72（-4.9%）。按 26 倍复算：26 × 33.26 = 864.8 ≈ 报出的 865；若用表内 34.98，则 26 × 34.98 = 909.5，比 865 高 5.1%。所以**目标价只能与 33.26 闭合，与表内 12/28E 不闭合**。这是本件最需要上报的口径冲突（见 Q6、Q7），引用时以"目标价所用的 EPS 是 33.26"为准，不要拿 34.98 去解释 865。

### 依据

- p.1｜Highlights (US$m)</td><td>12/23</td><td>12/24</td><td>12/25</td><td>12/26E</td><td>12/27E</td><td>12/28E</td><td>12/29E</td><td>12/30E</td>
- p.1｜Common s/h equity (12/26E)</td><td>US$300b</td>
- p.1｜Net debt to EBITDA (12/26E)</td><td>0.3x</td>
- p.1｜Our price target stays at $865 on 26x (unchanged) our full year ending 1 Q28E diluted GAAP EPS of $33.26 (unchanged)
- p.1｜Valuations: based on an average share price that year, (E): based on a share price of US$ 601.85 on 01-Jul-2026 10:35:37 EDT

## Q4 · **预测修正**：改了哪一项、从多少改到多少？改的是**假设**还是**结论**？

**本件零修正**，且是明示的零修正，理由给得很具体：公司未确认该传闻。原文三处互证——"We make no revisions to our estimates today given lack of confirmation from the company on this potential sale news"；目标价"stays at \$865 on 26x **(unchanged)**"；估值用的 EPS"\$33.26 **(unchanged)**"。评级亦为"reiterate our Buy rating"。

因此"从多少改到多少"在本件无答案，只能记：**旧值 = 新值**。分层判定：

- **结论层没变**：Buy / \$865 不动。
- **假设层没变**：收入、EBIT、EPS 全序列一行未动，连他自认的 2026–2027 EPS 走平判断也没改（32.61→32.98，+1.1%）。
- **变的只是信息集**：新增的是彭博那条"Meta 考虑卖算力"的消息，以及 CEO 5/27 与 10/25 两段旧发言；他把这归为"此前已公开表态、非新增信息"（"this is not new news"），所以不构成预测修正。

判定：**不重要（观点没变、事实没变）**。但他承认这条消息若落地会改假设，只是现在不认——"The incremental revenue would hence also alleviate concerns that 2027 EPS will be flat or compress vs 2026"。也就是说，**下一次修正的触发点已经写明：公司确认出售算力/模型访问**。

内部矛盾另记一笔（不是修正）：正文 2026 EPS 写 \$32.67，表内写 32.61，同版两值并存，属编校问题而非 old→new 修订，引用取表内值。

### 依据

- p.1｜We reiterate our Buy rating. We make no revisions to our estimates today given lack of confirmation from the company on this potential sale news.
- p.1｜Our price target stays at $865 on 26x (unchanged) our full year ending 1 Q28E diluted GAAP EPS of $33.26 (unchanged).
- p.1｜We flag that CEO Mark Zuckerberg had previously floated both of these options on various public calls and as such this is not new news.
- p.1｜The incremental revenue would hence also alleviate concerns that 2027 EPS will be flat or compress vs 2026

## Q5 · 他给了**情景**吗？各自驱动假设是什么？

**无情景**：只有一个评级、一个目标价（Buy / US\$865），没有 Bull/Base/Bear，也没有三档 PT 或悲观情形下的下行目标。全文唯一的分情形结构是"这条算力外售消息落地 / 不落地"的**定性二分**，两边都不给目标价。

他给的是**条件依赖**，不是情景数值：

- 不落地（当前基准）：维持现有模型，2027 EPS 32.98，同比 +1.1%，即"走平或压缩"。
- 落地：卖裸算力或卖模型访问权，理论上能在 Meta Business Agents 与 Meta AI 聊天机器人规模化之前先拿到收入，从而"plug some of the duration problem"，并缓解 2027 EPS 走平/压缩的担心。

关键缺口：**落地这一支没有任何量化**——没有每 GW 或每 \$1B 算力收入的收入/毛利/EPS 弹性，也没有客户数、定价、折旧分摊假设。所以无法判断"缓解多少"，只能判断方向。这一点与 Q1 的空白互为因果：他没有 capex 与毛利率假设，就算不出外售算力的增量。

对模型的意义：他实际上把"算力外售"当成**一个免费的期权**挂在 Buy 上（不动模型却拿它当理由），这类论证不可核 —— 若要去核，必须先自建"每 GW 收入 × 毛利率 − 折旧"的增量表，再看他隐含的门槛。

### 依据

- p.1｜we think that either of these developments will plug some of the duration problem that has ailed the stock, as selling cloud capacity or model access will theoretically yield higher near-term revenue versus waiting for Meta Business Agents and Meta AI chatbots to scale.
- p.1｜The incremental revenue would hence also alleviate concerns that 2027 EPS will be flat or compress vs 2026
- p.1｜12-month rating Buy
- p.1｜12m price target US$865.00

## Q6 · 他用了哪几种**估值方法**？**能互相印证吗**？

**只给一种方法**：GAAP EPS 的倍数法（P/E 相对估值）。估值段的方法句极简——"Our valuation is based on a multiple of GAAP EPS."，没有 DCF、没有 EV/EBITDA、没有分部加总，故不存在"两法互证"。

两个输入：

- **倍数 26x**（明示 unchanged）。选取理由未给：不比同业、不给历史区间、不给溢价/折价说明。可对照的只有表内 `P/E (UBS, diluted)` 行（2026E 17.3x、2027E 17.1x、2028E 16.1x），那是按年均股价算的**事后**本益比，不是目标倍数，不能当依据。
- **指标**：2028 年 GAAP 摊薄 EPS，但正文写 \$33.26、表内 12/28E 写 34.98，**两个值**（见 Q3）。按 33.26 复算 26 × 33.26 = 864.8，与 865 只差 0.2（取整到整数美元），可闭合；按 34.98 复算得 909.5，与 865 差 +5.1%，不可闭合。

所以结论要分层：**方法单一是形式事实（只给一种方法）；可复算性只对 33.26 成立，对表内 12/28E 不成立**。一处旁证：26 倍压 2028 年、而 2027 年只有 17 倍，说明他的目标价里有近一半来自 2028 年之后的利润率修复假设，而这个假设在表内没有任何一行支撑（利润率行反而逐年下滑到 2030E 的 32.7%）。这是我认为最该去核的一处：**目标价与自家利润率路径方向相反**。

### 依据

- p.2｜Our valuation is based on a multiple of GAAP EPS.
- p.1｜Our price target stays at $865 on 26x (unchanged) our full year ending 1 Q28E diluted GAAP EPS of $33.26 (unchanged)
- p.1｜P/E (UBS, diluted) x</td><td>17.6</td><td>21.3</td><td>28.5</td><td>17.3</td><td>17.1</td><td>16.1</td><td>16.3</td><td>17.6</td>
- p.1｜trading at 17x our 2027 GAAP EPS estimate
- p.1｜12/28E</td><td>34.98</td><td>39.95</td>

## Q7 · 目标价的**依据 / 估值方法解释 / 风险列示**齐不齐？

三件逐条：

1. **目标价由哪个方法算出**：有，且可复算，但只对 \$33.26 这一支成立。26 × 33.26 = 864.8 ≈ 865。若用表内 12/28E 的 34.98，则对不上（909.5）。同一份报告两个 EPS 并存，属**输入不自洽**。
2. **方法的关键输入与解释**：输入有数值（26x、\$33.26），**缺解释**——为何 26 倍、相对同业或历史何处、为何用 GAAP 而不用其自定义 (UBS) 口径（表内 EPS 恰是 UBS 调整后的），全文未给。方法句只有一行"基于 GAAP EPS 的倍数"。
3. **风险列示**：有，且**具体到六条、非模板句**：广告整体回落、iOS 定向与测量变化、监管与反垄断解释变化、TikTok 等竞品带来的用户增长与参与度逆风、参与度向低变现形态（Reels）转移及新形态长期变现不确定、Reality Labs 重投入且尚无产品市场匹配。但**只列下行、不列上行**，且无一量化。

结论：**形式三件齐（方法＋输入＋风险），不构成 2241(c)(1) 缺失**；薄弱处是倍数无辩护、EPS 输入两值并存、风险单边且无量化。**须上报一条**：目标价复算口径与表内 12/28E 不一致（差 5.1%），下游若拿表内 EPS 复算 PT 会得到 909 而非 865。

### 依据

- p.1｜Our price target stays at $865 on 26x (unchanged) our full year ending 1 Q28E diluted GAAP EPS of $33.26 (unchanged)
- p.2｜Our valuation is based on a multiple of GAAP EPS. Key risks to the downside include: (1) a pullback in advertising more broadly; (2) impacts from iOS changes related to ad targeting and measurement; (3) changes to the regulatory landscape and how antitrust laws are interpreted; (4) headwinds related to user growth and engagement associated with competitor platforms like TikTok; (5) engagement shifts to lower monetizing portions of the app (e.g. Reels) and uncertainty around the long-term monetization potential of new formats; (6) heavy investment into Reality Labs with an uncertain outcome and lack of a product/market fit today.
- p.1｜EPS (UBS, diluted) (US$)</td><td>14.87</td><td>23.86</td><td>23.49</td><td>32.61</td><td>32.98</td><td>34.98</td><td>34.57</td><td>32.02</td>

## Q8 · **评级分布三件**（三档占比 · 投行关系占比 · 观测时点）齐不齐？

**三件齐**，取自 Global Equity Rating Definitions 表（同一张表既给评级定义，也给分布）：

| 12 个月评级 | 定义 | 覆盖占比 | 近 12 月有投行服务占比 |
|---|---|---|---|
| Buy | FSR 高于 MRA 6% 以上 | **54%** | **24%** |
| Neutral | FSR 在 MRA 的 -6% 至 +6% 之间 | **40%** | **21%** |
| Sell | FSR 低于 MRA 6% 以上 | **6%** | **21%** |

- **三档占比**：54 / 40 / 6，合计 100%。
- **投行关系占比**：24 / 21 / 21，脚注明确"该评级档中过去 12 个月获得投行服务的公司占比"。
- **观测时点**：`Rating allocations are as of 31 March 2026`。发布日 2026-07-01 距 2026-06-30 只 1 天（不足 15 日），按规则可用上上个季末，故 3/31 合规。

一处值得记的形状：**Buy 档的投行服务占比（24%）高于 Neutral 与 Sell（各 21%）**，即"看多档里投行客户更集中"；这与本件给 Buy 同向，引用时立场须折价。另注意评级定义本身：Buy 的门槛只是**跑赢市场回报 6% 以上**，不是绝对上涨，也不是"强烈看多"；MRA 定义为一年期本币市场利率＋5%，本件给的 `Market return assumption 9.2%`，据此 Buy 档的 FSR 门槛约在 15.2% 以上（复算：9.2% + 6%），而他的预测股价回报是 43.7%，远在门槛之上 —— 评级强度与目标价空间是两件事，不要混读。

### 依据

- p.4｜Buy</td><td>FSR is &gt; 6% above the MRA.</td><td>54%</td><td>24%</td>
- p.4｜Neutral</td><td>FSR is between -6% and 6% of the MRA.</td><td>40%</td><td>21%</td>
- p.4｜Sell</td><td>FSR is &gt; 6% below the MRA.</td><td>6%</td><td>21%</td>
- p.4｜Source: UBS. Rating allocations are as of 31 March 2026.
- p.4｜Percentage of companies within the 12-month rating category for which investment banking (IB) services were provided within the past 12 months.
- p.4｜Market Return Assumption (MRA) is defined as the one-year local market interest rate plus 5% (a proxy for, and not a forecast of, the equity risk premium).
- p.2｜Market return assumption</td><td>9.2%</td>

## Q9 · **评级 / 目标价历史走势图**在不在（含赋改日期）？

**有历史序列，但不是收盘价折线图** —— 记"数据齐、图形缺"的形式瑕疵。

披露附录给了两张连续的表，列头为 `Date / Stock Price (US$) / Price Target (US$) / Rating`，第一张 19 条、第二张 7 条，合计 **26 条赋改记录**，覆盖 **2023-03-30 至 2026-04-30**（逾三年，满足"首次评级起与三年取短"的取短要求），每条都带当日收盘股价、目标价与评级，赋改日期齐全。这满足 2241(c)(3) 的实质内容。

但要求的是"收盘价折线图"，本件只有表、没有图（本件 `figures/` 目录为空，PDF 内亦无图位），故图形要素判**未见**。

从表里能读出的走势（这部分比图更有用）：

- 评级**三年零两个月全程 Buy**，从未下调 —— 这是"单边评级史"，用它评估看多准确率会失真。
- 目标价轨迹：235（2023-03）→ 912 一线的 915 峰值（2025-10-30）→ 830（2026-01-19）→ 908（2026-04-21）→ **865（2026-04-30）**，即本件沿用的 865 是 4 月底的旧值、至今未动。
- 目标价与股价的裂口：2026-04-30 记股价 611.91 / PT 865；01-Jul 股价 601.85 / PT 865。**PT 自 4 月起未随股价下调**，因此 43.7% 的上行空间里有一部分是"目标价没跟上"造成的，不是新观点。

### 依据

- p.5｜Date</td><td>Stock Price (US$)</td><td>Price Target (US$)</td><td>Rating</td>
- p.5｜2023-03-30</td><td>207.84</td><td>235.00</td><td>Buy</td>
- p.5｜2025-06-26</td><td>726.09</td><td>812.00</td><td>Buy</td>
- p.6｜2025-10-30</td><td>666.47</td><td>915.00</td><td>Buy</td>
- p.6｜2026-01-19</td><td>620.25</td><td>830.00</td><td>Buy</td>
- p.6｜2026-04-30</td><td>611.91</td><td>865.00</td><td>Buy</td>
- p.6｜Source: UBS Global Research; LSEG Eikon as of 30-Jun-2026. All prices as of local market close. Ratings as of date shown.

## Q10 · **九项冲突披露**在不在**首页**（或指明页码）？

首页不逐项披露，只给指向："ANALYST CERTIFICATION AND REQUIRED DISCLOSURES … begin on page 4"，逐项内容在 p.4–p.8 的 Required Disclosures 与 p.5 的 Company Disclosures。位置合规（首页指明页码）。

本件披露属**逐票脚注型**：Company Disclosures 表里 `Meta Platforms16,28` 挂了两个脚注号，脚注 16 与 28 都直接点到本标的 —— 这是本件最有信息量的两行。

| 项 | 有/无 | 内容与判据 |
|---|---|---|
| ① 分析师及家庭持仓 | **未见** | Analyst Certification 只认证"观点为本人观点、报酬与具体建议无关"两句，无任何持股句；全文检索 long/short position 只命中机构层面的脚注 28（UBS 持 0.5% 以上），主体是机构不是分析师本人或家庭成员。故本项判未见。 |
| ② 报酬是否挂钩投行收入 | **有** | 原文四要素齐：主体＝撰写本件的分析师；口径＝"determined exclusively by UBS Global Research management and senior management (not including investment banking)"；但紧接着自陈例外——报酬"may relate to the revenues of UBS and/or its divisions as a whole, of which investment banking, sales and trading are a part"。即"不按投行收入、但按含投行的公司整体收入"，属**部分隔离**，不能读成完全无关。 |
| ③ 近 12 个月主/副承销或收取投行报酬 | **仅通用声明，未见具体名单** | 原文："Within the past 12 months UBS may have received or provided investment services and activities or ancillary services as per MiFID II which may have given rise to a payment or promise of a payment in relation to these services from or to this company." 用了 may have，且不区分投行/非投行、不列承销角色与日期；按判据缺"期间＋具体服务＋是否承销"三要素，只能记通用声明，不能算本项确认。另有评级分布表的 IB 占比 24%（Buy 档）属机构级汇总，也不能落到本标的。 |
| ④ 未来 3 个月是否寻求投行费 | **未见** | 全文无 next 3 months / intends to seek 一类句子；查过 p.4–p.9 披露段与 p.5 Company Disclosures，最接近的只有"UBS does and seeks to do business with companies covered in its research reports"这种一般性表述，不含三个月窗口、不含本标的，不算。 |
| ⑤ 近 12 个月非投行服务报酬 | **未见（本标的）** | 只有 p.11 印度/巴西段的通用句"UBS has provided, and/or may in the future provide investment banking, brokerage, asset management, commercial banking and other financial services to the subject company/companies"，属地合规样板、不点名标的、不给期间与费用类别；本标的层面判未见。 |
| ⑥ 是否客户及服务类型 | **未见** | 无"Meta 是本机构客户"及服务类型的声明；"does and seeks to do business"是意愿句而非客户身份确认，三类客户身份（投行/非投行证券类/非证券类）均无法落地。 |
| ⑦ 实益持有该类普通股 ≥1% | **有相近声明，但门槛 0.5% 不符** | 脚注 28 明写对象是本标的："UBS holds a long position of 0.5% or more of the listed shares of this company." 主体＝UBS、证券＝本标的上市股份、方向＝多头，但**门槛是 0.5% 而非 1%**，故不能确认"≥1%"，只能记"0.5% 以上多头已披露"。这是本件唯一直接点名本标的的持股披露。 |
| ⑧ 是否做市 | **有（含本标的）** | 脚注 16："UBS Securities LLC makes a market in the securities and/or ADRs of this company." 四要素齐：主体＝UBS Securities LLC（本件撰写实体）、对象＝本标的证券及/或 ADR、时点＝报告日有效、原文如上。另有 p.8 的 EU 通用做市句（"UBS (excluding UBS Securities LLC) acts as a market maker…"）为属地样板，两者不冲突。 |
| ⑨ 分析师过去 12 个月是否从标的收酬 | **未见** | 认证段只否认报酬与"具体建议/观点"挂钩，未提是否从标的公司取酬；披露段无 from the subject company 一类句子，判未见。 |
| ⑩ 其他重大冲突 | **有（三项）** | 其一，`UBS acts or may act as principal in the debt securities (or in related derivatives) that may be the subject of this report` —— 以本金参与本标的债务证券；其二，脚注 28 的 0.5% 以上多头（同上）；其三，p.8 自陈"UBS and its affiliates and employees may have long or short positions, trade as principal and buy and sell in instruments or derivatives identified herein; such transactions or positions may be inconsistent with the opinions expressed in this document"，即持仓可与本报告观点相反。 |

红旗：**对本标的做市（脚注 16）＋持 0.5% 以上多头（脚注 28）＋以本金参与本标的债务证券**，三项同时落在本标的身上，且给的是 Buy 且 PT 高于现价 43.7% —— 引用其看多观点时立场须折价。相对干净的一面：①⑤⑥⑨ 四项均未见，非投行报酬与客户关系未被披露，不能推断"有"。

### 依据

- p.5｜Meta Platforms16,28</td><td>META.O</td><td>Buy</td><td>US$563.29</td><td>30 Jun 2026</td>
- p.5｜UBS Securities LLC makes a market in the securities and/or ADRs of this company.
- p.5｜UBS holds a long position of 0.5% or more of the listed shares of this company.
- p.4｜no part of his or her compensation was, is, or will be, directly or indirectly, related to the specific recommendations or views expressed by that research analyst in the research report.
- p.8｜The compensation of the analyst who prepared this document is determined exclusively by UBS Global Research management and senior management (not including investment banking).
- p.8｜Analyst compensation is not based on investment banking revenues; however, compensation may relate to the revenues of UBS and/or its divisions as a whole, of which investment banking, sales and trading are a part, and UBS as a whole.
- p.8｜Within the past 12 months UBS may have received or provided investment services and activities or ancillary services as per MiFID II which may have given rise to a payment or promise of a payment in relation to these services from or to this company.
- p.8｜UBS does and seeks to do business with companies covered in its research reports.
- p.4｜UBS acts or may act as principal in the debt securities (or in related derivatives) that may be the subject of this report.
- p.8｜UBS and its affiliates and employees may have long or short positions, trade as principal and buy and sell in instruments or derivatives identified herein; such transactions or positions may be inconsistent with the opinions expressed in this document.
- p.11｜UBS has provided, and/or may in the future provide investment banking, brokerage, asset management, commercial banking and other financial services to the subject company/companies or its affiliates

## Q11 · 他的**风险章**挂了数字吗？

**没挂数字，属样板风险（不是缺口）**。风险段只有一段六条，全部是方向句：广告回落、iOS 变化、监管与反垄断、TikTok 竞争、参与度向 Reels 等低变现形态转移、Reality Labs 重投入未见产品市场匹配。六条里**没有一条**能写成"若〔变量〕变 X ⇒ 某年 EPS 变 Y%"，也没有金额、比例或时间；无 WACC/永续增长率/目标倍数的敏感度表（方法是 P/E，最该给的正是倍数敏感度）。

按公式可自行补一格（原文未给）：26x ±1x ⇒ 目标价 ±\$33.26（865 ± 33.26，约 ±3.8%）。这是 Q6 公式的复算，不是他披露的。

另有一条"带数字但不属风险章"的东西：Equity FCF 收益率 2026E 为 **-0.1%**、2027E 仅 1.1%，是他自己模型里最接近"资金压力"的证据，却未被写进风险段 —— 若按风险量化，可写成"若 capex 再上台阶，自由现金流收益率在 2026–2027 维持负值至 1% 区间，估值只剩倍数支撑"。这是我补的推论，不是他的表述，引用时须分开。

### 依据

- p.2｜Key risks to the downside include: (1) a pullback in advertising more broadly; (2) impacts from iOS changes related to ad targeting and measurement; (3) changes to the regulatory landscape and how antitrust laws are interpreted; (4) headwinds related to user growth and engagement associated with competitor platforms like TikTok; (5) engagement shifts to lower monetizing portions of the app (e.g. Reels) and uncertainty around the long-term monetization potential of new formats; (6) heavy investment into Reality Labs with an uncertain outcome and lack of a product/market fit today.
- p.1｜Equity FCF (UBS) yield %</td><td>6.4</td><td>4.1</td><td>2.7</td><td>(0.1)</td><td>1.1</td><td>2.4</td><td>3.5</td><td>4.2</td>
- p.1｜Our price target stays at $865 on 26x (unchanged) our full year ending 1 Q28E diluted GAAP EPS of $33.26 (unchanged)

## Q12 · 这份报告落在**静默期窗口**内吗？

**否**。判定：

- 发布日：**2026-07-01**（`This recommendation was finalized on: 01 July 2026 02:51 PM GMT`；封面 `Global Research 1 July 2026`；股价取价时点 01-Jul-2026 10:35:37 EDT）。文件名日期 07-02 为入库日，比发布日晚一日。
- 本件性质：**First Read 事件短评**，标的为彭博报道的"Meta 考虑对外出售算力/模型访问权"，属媒体报道驱动的观点更新，不是首评、不是评级变动（reiterate Buy）。
- 全文无任何证券发行事件：无 IPO、无二次发行/增发、无承销团、无发行定价日；因此 10 天/3 天的窗口**无从起算**，判不落窗。
- 需分辨的相近之处：文中"selling compute capacity"是 Meta 的**商业动作**（对外卖算力），与承销静默期无关；而 UBS 侧对本标的有做市（脚注 16）与 0.5% 以上持仓（脚注 28），属持续关系，同样不构成静默期锚点。
- 另一条时间线事实：该覆盖的最近一次目标价/评级变动在 2026-04-30（PT 865），距发布日两个月，本件未改评级也未改目标价，不存在"静默期内改评级"的嫌疑。

### 依据

- p.4｜This recommendation was finalized on: 01 July 2026 02:51 PM GMT.
- p.1｜Global Research 1 July 2026
- p.1｜Price (01 Jul 2026) US$601.85
- p.1｜Meta is considering either selling "raw" compute capacity to external companies or access to various AI models that are hosted on Meta’s existing infrastructure, as per Bloomberg news.
- p.1｜We reiterate our Buy rating.
- p.6｜2026-04-30</td><td>611.91</td><td>865.00</td><td>Buy</td>
- p.5｜UBS Securities LLC makes a market in the securities and/or ADRs of this company.
