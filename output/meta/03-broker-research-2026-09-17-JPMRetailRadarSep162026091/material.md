---
id: 03-broker-research-2026-09-17-JPMRetailRadarSep162026091
cat: "03"
sub: broker-research
template: broker-research
template_version: 2
date: 2026-09-17
time: "00:00"
title: "03-broker-research-2026-09-17-JPMRetailRadarSep162026091"
kind: "broker-research"
issuer: ""
ticker: META
source_pages: 25
---

> 骨架已生成，答案待填。原文：`corpus/materials/mineru/03-broker-research-2026-09-17-JPMRetailRadarSep162026091/full.md`（25 页）。
> 填写纪律见 `docs/EVIDENCE-SPEC.md`：有答案必有依据块，块须逐字，页码 `p.N` 以源 PDF 为准。

## Q1 · 他的**关键假设取值**各是多少？

本件是 J.P. Morgan 的**散户资金流周报**（Retail Radar，Arun Jain 团队），不是个股模型：**没有损益表、没有评级目标价表、没有盈利预测**。所以六项假设里只有"资本开支"以外的一条能落到实处（且是市场级流量口径），其余五项按规则直说"表内未给"，不反推。

| 量名 | 本件取值 | 期间 | 口径 |
|---|---|---|---|
| 收入增速 | 未给该行 | — | 全篇无任何公司或指数收入预测 |
| 毛利率 | 未给该行 | — | 无损益表 |
| 营业利润率 | 未给该行 | — | 无损益表；只有"earnings durability"的定性话 |
| 资本开支 | 未给该行 | — | 仅在 AI 数据中心篮子流量中间接体现，无 capex 数值 |
| 实际税率 | 未给该行 | — | 无税率行 |
| 摊薄股数 | 未给该行 | — | 无股数行 |

它真在用的假设链是**资金流 + 利率**这一套，四条都有数：

1. **政策利率**：Fed 一致加息 25bp 至 **3.75–4%**，点阵图暗示年内还有一次；作者的判据是"浅加息周期（去年保险式降息的回撤）对股票可管理"。
2. **长端与估值的关系**：10y 与 S&P 500 倍数是**倒 U 型**，历史支持"10y 升向约 6% 仍可承受"，行业领导权取决于曲线形态。
3. **散户流量强度**：本周 **25 亿美元**，远低于 12 个月均值 **68 亿美元/周**（约为均值的 37%）；ETF +31 亿、单票 −6 亿。整体流量落到 **2% 分位**，ETF 流入为一年低点（−2.0z），单票转为**12% 分位**的负值。
4. **Mag7 篮子周转**：本周 72.9 亿美元、上周 117.4 亿、年初至今 459.6 亿（零售周转额口径，不是持仓）。

META 这条线只有一条可用的量：**上周散户净卖出 2,800 万美元（−0.6z）**，同期股价 +8%、自 8 月末低点 +25%；社交关注分 25.6、空头占流通股 1.3%、9 月 15 日出现 −0.9 的极端失衡。**注意方向相反**：股价涨、散户卖，说明这波上涨不是散户推的。

口径提醒：Z 值（−0.6z、−2.0z）是相对历史分布的标准化偏离，不是增减百分比；把 −0.6z 读成"卖出 0.6%"是常见错误。

### 依据

- p.1｜In line with expectations, the Fed unanimously raised interest rates 25bps to 3.75-4%, thereby removing “a dose of accommodation”
- p.1｜An inverted "U" relationship between 10y and S&P 500 multiples backed by history suggests that equities can withstand a 10y trending toward \~6%, with sector leadership hinging on the shape of the curve
- p.2｜Retail flows were \$2.5B this week, well below the 12-month average of \$6.8B/week. Retail investors continued to favor ETFs (+\$3.1B) over Single Stocks (-\$0.6B).
- p.2｜Activity in Mag7 this week: Retail investors bought NVDA (+\$1,196M), TSLA (+ \$201M), AMZN (+\$87M), AAPL (+\$63M), GOOG/L (+\$25M), MSFT (+\$19M) and META (+\$10M).
- p.5｜Magnificent 7</td><td>Mag7</td><td>7.29</td><td>11.74</td><td>45.96</td></tr>
- p.6｜META (\$28M sold last week, -0.6z, Figure 44Retail Imbncei META): Our analysts recently upgraded Meta Platforms to OW
- p.7｜<td>META</td><td>Meta Platforms Inc</td><td>1707.4</td><td>25.6</td><td>1.3%</td><td>-0.9</td><td>15-Sep</td></tr>

## Q2 · **他和我差在哪一项、哪一年**？差多少？

我方模型数值不在本份材料内，逐行"他 vs 我"的对照需跨批（交主控）。本件也**没有共识表、没有任何盈利估计**，所以"差在哪一年"这个问题在本份内无从谈起——不是差异为零，是**没有可比的两个数**。

能做的是本材料内唯一的一组对照：**本周 vs 12 个月均值**（同一口径、同一来源，可硬算）：

| 指标 | 本周 | 参照 | 差额 |
|---|---|---|---|
| 散户总流量 | \$2.5B | 12 个月均值 \$6.8B/周 | −63% |
| Mag7 篮子周转 | \$7.29B | 上周 \$11.74B（−38%）／四周前 \$13.13B 的 AI 篮子（−36%） | 大幅回落 |
| ETF / 单票结构 | ETF +\$3.1B、单票 −\$0.6B | 常态是两者同向 | 结构分裂 |

三条判断：

1. **差的不是"哪一年"，是"哪一周"**：本件的全部信息都在周度流量与 Z 值上，跨年比较（2026 vs 2027）在本件不成立。
2. **差异集中在风险偏好端，不在盈利端**：META 的股价上涨（+8% 周、+25% 自低点）与散户净卖出（−0.6z）同时发生，说明**边际定价者是机构/对冲基金而非散户**；这一点与我方若按"散户流入→动量"建模的假设会直接冲突，但本件没有给出可用于校准的绝对持仓。
3. **口径不可直接比**：他的流量是"零售券商渠道成交额"，不是净买入市值，也不是持仓变化；若要接我方模型，须先换算成占全市场成交比重（本件只给了 2021 年 1 月约 37% 的历史峰值一图，无当前值）。

结论：**记缺口**。本件能提供的只有"流量温度"，不能提供"盈利差"。

### 依据

- p.2｜Retail flows were \$2.5B this week, well below the 12-month average of \$6.8B/week.
- p.5｜Magnificent 7</td><td>Mag7</td><td>7.29</td><td>11.74</td><td>45.96</td></tr>
- p.5｜Al/Datacenter/Electrification</td><td>JPAMAIDE</td><td>8.38</td><td>13.13</td><td>56.54</td></tr>
- p.1｜retail flows turned materially weaker last week — 2%ile overall, with ETF inflows at 1y lows (-2.0z) and single-name flows turning negative at a mere 12%ile
- p.6｜The stock is +8% in the last week and +25% since its late-August trough.

## Q3 · 他的**财年是谁的财年**？

**本件没有财年**——不是"用了别人的财年"，而是**通篇没有任何盈利预测或财年列**，因此谈不上 FY 归属。这是产品型决定的，不是缺页。

它实际用的三个时间口径：

1. **周度流量窗口**：Sep 10 – Sep 16（标题即"Sep 16"、正文"for the Week: Sep 10 to Sep 16"）。这是滚动 5 个交易日的窗口，与任何财年都不对齐。
2. **评级分布时点**："截至最近一个日历季末"，按发布日 9 月 16 日推为 **2026 年 6 月 30 日**（Q3 未结束，故只能取 Q2 末）。文中未写具体日期，属推定。
3. **价格与技术位**：9 月 15 日（失衡日）、8 月末（低点）、年初至今（YTD）。

判读：**不能与日历年或公司财年共识直接比**；若要把本件接进按财年排的模型，必须先把它折成"季度平均流量"或"Z 值均值"，否则 Sep 10–16 这一周会被误当成 2026 年 Q3 的代表。另需注意本件的宏观前提（Fed 已加息至 3.75–4%）属情景设定，跨件引用时须核其假设基准日。

### 依据

- p.2｜Retail Trading Activity in Numbers for the Week: Sep 10 to Sep 16
- p.20｜Please note that stocks with an NR designation are not included in the table above. This information is current as of the end of the most recent calendar quarter.
- p.1｜Global Markets Strategy 16 September 2026
 
## Q4 · **预测修正**：改了哪一项、从多少改到多少？改的是**假设**还是**结论**？

有一个**评级动作**，但**没有预测修正**，两者要分开。

- **评级动作**：正文写"our analysts recently upgraded Meta Platforms to OW"——**上调至增持**。这是结论层的变化。
- **缺的四件**：旧评级（只说"upgraded to OW"，未写原为 Neutral 还是 UW）、目标价（全篇无 PT）、生效日期（只有"recently"）、上调理由的量化幅度（只给定性：前沿模型、Muse AI agent、Meta Model API 是多年变现管线）。
- **假设层**：**完全没动**，因为本件根本不承载 META 的盈利假设——无收入、无 EPS、无 capex、无利润率。所以"从多少改到多少"在本件**一个字都没有**。

分层判定：**结论变了（评级上调至 OW），假设未见任何修正** ⇒ 按作业口径属"不重要（观点变了，事实没变）"，但**必须标注为不可核**——因为旧评级与日期缺失，无法确认这是本周新发生、还是引用此前若干周的报告。这一点很关键：**本件是二手转述，不是评级变更的原始文件**。

另一层"修正"是市场级的、不是他的：财报后 MS 覆盖的净修正与散户流量的转向（见 Q2），属数据更新，不属模型修正。

### 依据

- p.6｜Our analysts recently upgraded Meta Platforms to OW, with the company in the early stages of releasing frontier models and AI-driven products beyond advertising, notably Muse AI agent and Meta Model API access.
- p.6｜Frontier models are at the core of Meta’s product and monetization pipeline over a multi-year period, and its path toward superintelligence.
- p.20｜History of Investment Recommendations:
A history of J.P. Morgan investment recommendations disseminated during the preceding 12 months can be accessed on the Research & Commentary page

## Q5 · 他给了**情景**吗？各自驱动假设是什么？

**没有三档情景，也没有目标价。**全篇只有"条件句"，没有"情形分支"：所有看多表述都挂在同一个条件上——**盈利持续性**。

三处条件句，可当作隐性的情景边界：

1. **浅加息周期可管理**，前提是"earnings backdrop remains strong"且中东局势受控；
2. **10y 升向约 6% 仍可承受**，前提是"hypergrowth regime"延续；
3. **Mag7 与非 Mag7 的分叉**，是资金流事实而非情景分支：散户仍买 Mag7，但已在非 Mag7 的半导体、硬件、软件转为净卖出。

判定：**单情景 + 条件句，未设 Bull/Base/Bear**。因此"三档各记 PT 与触发假设"这一条不适用；能记的只有触发变量（10y 水平、盈利广度）与方向，**无一条给点位**。

补一句结构判断：他的框架里**倍数由利率单变量决定**（倒 U），盈利由广度决定；这两条若同时恶化，本件没有任何一档能描述后果——这正是没有情景的直接代价。

### 依据

- p.1｜Our report argues that a shallow hiking cycle (i.e., a reversal of last year's insurance cuts) should be manageable for equities, provided the earnings backdrop remains strong and the geopolitical situation in the Middle East remains contained.
- p.1｜An inverted "U" relationship between 10y and S&P 500 multiples backed by history suggests that equities can withstand a 10y trending toward \~6%
- p.1｜Overall, retail flows remained supportive of the Mag 7 — notably NVDA, the top retail pick again this week— but shifted to net selling across non–Mag 7 Semis, Hardware, and Software

## Q6 · 他用了哪几种**估值方法**？**能互相印证吗**？

**未见任何估值方法，也未见目标价。**无 P/E 目标、无 DCF、无 WACC、无 EV/EBITDA、无 SOTP；全篇没有"我们给 x 倍"这类句子。所以既谈不上"多法互证"，也谈不上"只给一种方法"。

它有的是一个**估值框架判断**（不是方法）：10y 收益率与 S&P 500 倍数呈**倒 U 型**，历史支持 10y 升向约 6% 时倍数仍可承受；本轮由"更高更久"驱动的利率因子拥挤度已与动量因子持平。这两句是"倍数能不能扛"，**不是"倍数该是多少"**——缺目标倍数这一输入，任何目标价都无法复算。

对 META：评级上调至 OW，但**本件没有给目标价、没有给目标倍数、没有给 EPS**，三个输入全缺 ⇒ META 的估值在本件内**不可复算**。

要判方法与风险，只能按 JPM 自己的转引句回"最近的公司专属报告"取——本件明确把方法与风险外置了。

### 依据

- p.1｜An inverted "U" relationship between 10y and S&P 500 multiples backed by history suggests that equities can withstand a 10y trending toward \~6%, with sector leadership hinging on the shape of the curve
- p.1｜crowding in the Rates factor is now matching Momentum crowding levels
- p.20｜Equity Valuation and Risks: For valuation methodology and risks associated with covered companies or price targets for covered companies, please see the most recent company-specific research report
- p.6｜Our analysts recently upgraded Meta Platforms to OW

## Q7 · 目标价的**依据 / 估值方法解释 / 风险列示**齐不齐？

**0 / 3，三件全缺**——因为**本件没有目标价**（对 META 也没有，对指数也没有）。

1. **目标价由哪个方法算出**：无。META 只给了 OW 评级，无 PT；文中连"目标价"三字都未与 META 同时出现。
2. **方法的关键输入**：无。无 EPS、无目标倍数、无 WACC——三个能复算的输入一个都没有。
3. **可能阻碍目标价的风险列示**：有方向、无条目化。散见三处：油价上行、10y 反复测试 5%、AI 焦虑升温；另有一条结构性条件（中东局势受控、盈利持续性）。**没有一条挂到目标价上**（也没有目标价可挂），且未区分个股风险与市场风险。

按 2241(c)(1) 口径：**三件中第 1、2 件缺失，第 3 件只有方向句** ⇒ 形式不合规，须上报。但性质要写准：JPM 在披露节明写"方法与风险见最近的公司专属报告/联系分析师"，即**把这两件外置到公司报告**，本件是策略流量件，本不承载个股 PT。**后果是一样的：本件不可用于复算 META 的目标价。**

另有一处形式要件要记：本件**有署名**（Arun Jain 等 6 人，含 AC 标识）、**有日期**（2026-09-16）、**有评级方向**（OW，转述）、**有披露页**（首页指向披露节，内容在文末各页）——四查中署名/日期/披露三项齐，缺的是 PT 与方法，**按"研究摘要类"处理，不按转述降级**。

### 依据

- p.1｜See page 20 for analyst certification and important disclosures.
- p.20｜Equity Valuation and Risks: For valuation methodology and risks associated with covered companies or price targets for covered companies, please see the most recent company-specific research report
- p.1｜Amid a confluence of higher oil, higher rates (e.g. 10y yields repeatedly testing the 5% level) and heightened AI angst, retail flows turned materially weaker last week
- p.6｜Our analysts recently upgraded Meta Platforms to OW

## Q8 · **评级分布三件**（三档占比 · 投行关系占比 · 观测时点）齐不齐？

**三件齐全**，来自披露页的机构级表（不是数报告里的股票条数）。

| 口径 | Overweight（buy） | Neutral（hold） | Underweight（sell） |
|---|---|---|---|
| J.P. Morgan 全球股票研究覆盖 | 53% | 36% | 12% |
| 其中投行客户（IB clients） | 83% | 80% | 73% |
| JPMS 股票研究覆盖 | 51% | 37% | 12% |
| 其中投行客户（IB clients） | 95% | 92% | 87% |

- **三档占比**：全球 53/36/12，JPMS 51/37/12（两套口径并存，引用须注明用哪套）。
- **投行关系占比**：按档位给出，全球 83/80/73、JPMS 95/92/87；脚注定义是"该档中过去 12 个月 JPM 提供过投行服务的标的公司占比"。
- **观测时点**："截至最近一个日历季末"——按发布日 9 月 16 日推为 **2026 年 6 月 30 日**（距发布 78 天，超过 15 天，故不能用上上季末，只能用 6 月末）。文中**未写具体日期**，这一条属推定，须标注。

三点判读：

1. **两套口径差得很大**：全球 OW 档 53%、投行客户率 83%；JPMS 口径 OW 51%、投行客户率 **95%**。JPMS 的增持名单里几乎全是投行客户——这是本件最该记一笔的结构性事实。
   口径提醒：该表在文本层被拆成不完整的行（首行标签把"覆盖"与"IB clients"并在一格、第二段出现"83%/80%/73%"悬空行），上表的配对是**按数值合理性推定**的（覆盖档合计须为 100%，83/80/73 不满足，故归为 IB 客户行），不是原表版式的直接读取——引用具体百分比前应以 PDF 版式复核。
2. **NR 不计入表**：脚注明说 NR 标的不在表内，故三档合计不足 100% 属正常。
3. **Buy/Hold/Sell 只是 FINRA 对应**：JPM 实际用 OW/N/UW 相对评级，三档名称是监管映射，不能当绝对买卖建议读。

### 依据

- p.20｜J.P.Morgan Global Equity Research Coverage* IB clients**</td><td>53%</td><td>36%</td><td>12%</td></tr><tr><td rowspan="2">JPMS Equity Research Coverage* IB clients**</td><td>83%</td><td>80%</td><td>73%</td></tr><tr><td>51% 95%</td><td>37% 92%</td><td>12% 87%</td></tr></table>
- p.20｜\*\*Percentage of subject companies within each of the "buy," "hold" and "sell" categories for which J.P. Morgan has provided investment banking services within the previous 12 months.
- p.20｜For purposes of FINRA ratings distribution rules only, our Overweight rating falls into a buy rating category; our Neutral rating falls into a hold rating category; and our Underweight rating falls into a sell rating category.
- p.20｜Please note that stocks with an NR designation are not included in the table above. This information is current as of the end of the most recent calendar quarter.

## Q9 · **评级 / 目标价历史走势图**在不在（含赋改日期）？

**未见图，只有两处转引声明。**全篇图表都是流量类（散户日度买卖、ETF 分类流量、篮子周转、期权占比、券商渠道成交占比），**没有一张"股价 + 目标价 + 评级"的时间序列图**，也没有赋评/改价日期表。

披露节给的两句都是**指向外部**：

- "History of Investment Recommendations"——过去 12 个月建议历史可到研究网站查；
- "Important disclosures, including price charts and credit opinion history tables"——价格图也外置到 jpmm.com。

按判定口径：**声明有、文本层无数据 ⇒ 判未见**。

对本件的特殊性：META 的评级上调只有"recently"三字，**连上调日期都没给**，因此"覆盖期间"与"变动条数"均无法给出。这一条比"无图"更值得记——**评级动作无日期，等于不可归档**。

### 依据

- p.20｜A history of J.P. Morgan investment recommendations disseminated during the preceding 12 months can be accessed on the Research & Commentary page
- p.20｜Important disclosures, including price charts and credit opinion history tables (if applicable), are available for compendium reports and all J.P. Morgan–covered companies
- p.6｜Our analysts recently upgraded Meta Platforms to OW

## Q10 · **九项冲突披露**在不在**首页**（或指明页码）？

首页有指向句——"See page 20 for analyst certification and important disclosures."——但披露节的写法是**概括式**：只有分析师认证、评级定义、评级分布表、业务关系总述，**没有逐项列名式的九项清单**，公司级冲突明确外置到 jpmm.com。逐项核对（**META 不在任何列名名单里，因为本件根本没有列名名单**）：

| 项 | 有/无 | 位置与内容 |
|---|---|---|
| ① 分析师及家庭持仓 | 未见 | 认证段只认证"观点准确反映个人看法"，**全文无一句涉及分析师本人或家庭成员的持股**；最接近的是认证段，讲的是观点独立性，与持仓无关，不能顶替 |
| ② 报酬是否挂钩投行收入 | 有（间接） | 报酬段列"研究质量与准确性、客户反馈、竞争、公司整体收入（overall firm revenues）"，未单列投行收入；认证段同时声明"报酬任何部分与具体建议无直接或间接关系"。即**分子含公司总收入（内含投行）、分母切到具体建议**，属间接 |
| ③ 近 12 个月主/副承销或收投行报酬 | 有（仅聚合） | 评级分布表脚注给出"该档中过去 12 个月 JPM 提供过投行服务的标的占比"（全球 83/80/73、JPMS 95/92/87），**是比例不是名单**；全文无承销名单、无"lead manager/co-manager"字样 ⇒ 无法确认 META 是否在内，属**无法核验** |
| ④ 未来 3 个月是否寻求投行费 | 未见 | 全文无"未来三个月""拟寻求投行报酬"类句子；只有一句总述"J.P. Morgan does and seeks to do business with companies covered"——那是**长期业务意愿**，不是 3 个月窗口 |
| ⑤ 近 12 个月非投行服务报酬 | 未见 | 无客户名单、无服务类型；ETF 段只讲 JPMS 作为 ETF 授权参与人收费，与 META 无关 |
| ⑥ 是否客户及服务类型 | 未见（仅总述） | 只有"does and seeks to do business with companies covered in its research reports"这一句概括，**既没点名 META，也没写服务类型**，四要素缺三 |
| ⑦ 实益持有该类普通股 ≥1% | 未见 | 全文无 beneficial ownership、无 1% 字样、无 as-of 日期。注意：评级分布表的"IB clients 95%"是**投行客户比例**，与"实益持股比例"是两个概念，不能混用 |
| ⑧ 是否做市 | 未见 | 无 market maker / liquidity provider 句；只有"J.P. Morgan is a marketing name"这类实体说明与 ETF 授权参与人条款，均非做市声明 |
| ⑨ 分析师过去 12 个月是否从标的收酬 | 未见 | 认证段声明"未因本报告特定建议收酬"，那是**前瞻性的报酬切割**，不等于"过去 12 个月是否从 META 收过酬"；本件无该项 ⇒ 判未见 |
| ⑩ 其他重大冲突 | 有（不含 META） | 两处实体性披露：JPMS 担任"几乎所有美国上市 ETF"的授权参与人，可就 ETF 分销收佣金（本件确实讨论 IWM/QQQ/SPY 等 ETF，但与 META 无关）；另有多法域实体分发说明。**均不涉及 META** |

**红旗提示**：本件**没有可用的持股/做市/承销列名**，所以不能像对 GS/MS 那样逐条打勾；但"JPMS 覆盖中 OW 档 95% 是投行客户"这一比例本身即构成**系统性立场风险**，叠加 META 被"上调至 OW"且**无目标价、无日期**，引用其看多逻辑时须折价，并回公司报告核 PT 与冲突清单。

### 依据

- p.1｜See page 20 for analyst certification and important disclosures.
- p.20｜no part of any of the Research Analyst's compensation was, is, or will be directly or indirectly related to the specific recommendations or views expressed by the Research Analyst(s) in this report.
- p.20｜Company-Specific Disclosures: J.P. Morgan does and seeks to do business with companies covered in its research reports. As a result, investors should be aware that the firm may have a conflict of interest that could affect the objectivity of this report.
- p.21｜The research analysts responsible for the preparation of this report receive compensation based upon various factors, including the quality and accuracy of research, client feedback, competitive factors, and overall firm revenues.
- p.20｜\*\*Percentage of subject companies within each of the "buy," "hold" and "sell" categories for which J.P. Morgan has provided investment banking services within the previous 12 months.
- p.21｜Exchange-Traded Funds (ETFs): J.P. Morgan Securities LLC (“JPMS”) acts as authorized participant for substantially all U.S.-listed ETFs.

## Q11 · 他的**风险章**挂了数字吗？

**没有风险章；风险散在正文，半挂数字**——有阈值、无敏感度。

带数字的三条（都可写成"若 X 则 Y"，但 Y 只是定性）：

1. **10y 反复测试 5%**，历史关系支持"升向约 6% 仍可承受"⇒ 这是唯一给出**边界值**的风险句，但没给"6% 时倍数压缩几个点、S&P 跌多少"。
2. **利率因子拥挤度已与动量因子持平**，由"更高更久"驱动 ⇒ 有相对量（持平），无绝对水位。
3. **油价上行**（无阈值）。

不带数字的两条：AI 焦虑升温（Semis vs Software 叙事）、中东地缘（霍尔木兹海峡扰动、油价双向大幅波动）。

判定：**半挂数字**。与"样板风险"的区别在于他确实给了 6% 这个可检验的门槛，也与"有敏感度"的区别在于**没有任何一条换算成 EPS 或点位的百分比**。要变成可用的敏感度，须自己补两步（倍数对 10y 的斜率、EPS 对倍数的传导），本件两步都没给。

对 META 则是纯样板：股价 +8%/+25%、散户卖出 −0.6z、空头 1.3%，全是状态描述，**没有"若某变量变则 META 如何"的句子**。

### 依据

- p.1｜10y yields repeatedly testing the 5% level
- p.1｜An inverted "U" relationship between 10y and S&P 500 multiples backed by history suggests that equities can withstand a 10y trending toward \~6%
- p.1｜crowding in the Rates factor is now matching Momentum crowding levels
- p.1｜One potential catalyst for the Tech ex Mag 7 bearishness was the AI safety debate that reignited the Semis vs Software narrative as markets reopened on Monday.
- p.6｜META (\$28M sold last week, -0.6z, Figure 44Retail Imbncei META)

## Q12 · 这份报告落在**静默期窗口**内吗？

**否。**发布日 **2026 年 9 月 16 日**（周三），本件是周度资金流追踪，**全文无 IPO、无二次发行、无增发、无承销团、无定价日**——分母为零，10 日/3 日窗口无从起算。

- **作为承销商发布研究的角度**：本件不对 META 定价、不参与任何发行，也没有"Manager/Co-Manager/underwriting"字样（唯一的"underwriting"出现在讲房贷公司 AI 应用与保险软件时，与证券发行无关）。
- **披露里是否露出承销关系**：有，但只是聚合比例（评级分布表的 IB clients 列），**无名单、无日期** ⇒ 无法判断 META 是否在近 12 个月承销名单内，更无法判断是否落在 3 天窗口。
- **结论分两层**：就"是否违反静默期"而言，答案是**否**（无发行事件）；就"能否正面核实时间线"而言，答案是**不能**（本件没有发行时间线）。这两层不能合并成一句"未见静默期声明"——静默期从来不是靠声明判的。

另注：本件讨论的 SPCX（SpaceX 相关标的）在正文里被列为"最被卖出的单票"，历史期号里也有"Trading around IPOs"，说明该团队确实跟踪新股交易——但**本份没有涉及任何新股的发行时点**，故不影响判定。

### 依据

- p.1｜Retail Radar
Sep 16 – Retail Blinks as Rates Swing
- p.1｜Global Markets Strategy 16 September 2026
- p.2｜Bottom 5 retail stocks: SPCX (-\$249M), MRVL (-\$95M), INTC (-\$76M), SMR (-\$60M), AMD (-\$52M).
