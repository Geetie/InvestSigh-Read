---
id: 03-broker-research-2026-08-03-USWeeklyKickstartQ22026mid
cat: "03"
sub: broker-research
template: broker-research
template_version: 2
date: 2026-08-03
time: "00:00"
title: "03-broker-research-2026-08-03-USWeeklyKickstartQ22026mid"
kind: "broker-research"
issuer: ""
ticker: META
source_pages: 26
---

> 骨架已生成，答案待填。原文：`corpus/materials/mineru/03-broker-research-2026-08-03-USWeeklyKickstartQ22026mid/full.md`（26 页）。
> 填写纪律见 `docs/EVIDENCE-SPEC.md`：有答案必有依据块，块须逐字，页码 `p.N` 以源 PDF 为准。

## Q1 · 他的**关键假设取值**各是多少？

产品型不符：本件是 Portfolio Strategy 的周报（US Weekly Kickstart），**指数级、无个股评级，也没有公司损益表**。它真正在用的假设链是"指数 EPS × P/E = 指数点位"，以及一条 AI 资本开支链，逐条如下：

- **指数 EPS（本件的核心假设）**：S&P 500 EPS 2025 实际 $275（同比 +12%）、2026E $340（+24%）、2027E $385（+13%）。这是全文所有结论的分子。
- **估值倍数**：当前 NTM P/E 20x；该倍数在十年历史的第 52 百分位、三十年历史的第 73 百分位——即"不是便宜价，但也没到极值"。这是分母。
- **目标点位**：YE2026 8,000（较现价 +8%）、12 个月 8,300（+12%）；现价 7,438（截至 7 月 30 日）。3 个月 7,600、6 个月 8,000 给的是路径。
- **AI 资本开支链（本件最实的一条）**：hyperscaler 2026 年 capex 近 8,000 亿美元；2027 年超 1 万亿美元，比季初估计高 1,000 亿以上；Q2 已实际发生 1,820 亿美元，对应自由现金流仅 50 亿、股权+债务发行 1,010 亿。
- **收入增速 · 毛利率 · 营业利润率 · 实际税率 · 摊薄股数**：**五项材料均未给出**。这是指数与行业总量报告，不落到公司三表，也没有任何一行是"公司财年 + 单位 + 口径"的损益假设。

一句话：本件可用的假设只有三条——EPS $340/$385、P/E 20x、capex 8,000 亿/1 万亿；六项公司级假设里五项空缺，不是遗漏，是产品型所限。

### 依据

- p.13｜<tr><td>2026</td><td>$340</td><td>$359</td><td>$334
- p.13｜<tr><td>2027</td><td>$385</td><td>$404</td><td>$386
- p.13｜<tr><td>Current on NTM EPS</td><td>20x</td><td>20x</td><td>20x
- p.23｜<tr><td>S&amp;P 500</td><td>level</td><td>7438</td><td>7600</td><td>8000</td><td>8300</td><td>12
- p.10｜Exhibit 18: Analysts now expect nearly \$800 billion in hyperscaler capex this year

## Q2 · **他和我差在哪一项、哪一年**？差多少？

我方模型数值不在本份材料内，逐行"他 vs 我"的对照需跨批（交主控）。本件可做的是**他的预测 vs 报告同表列出的两种共识**（bottom-up 自下而上、top-down 自上而下策略师），这是这份周报少见的"三方并列"结构，单位美元/股：

| 年份 | GS 预测 | Bottom-up 共识 | Top-down 共识 | GS 相对 bottom-up | GS 相对 top-down |
|---|---|---|---|---|---|
| 2026 | $340 | $359 | $334 | −5.3%（按两值推算） | +1.8%（按两值推算） |
| 2027 | $385 | $404 | $386 | −4.7%（按两值推算） | −0.3%（按两值推算） |

差别落在**哪一年**：2026 年差得最开（对 bottom-up 低 19 美元、5.3%），2027 年收窄到 −19 美元但百分比降到 4.7%，对 top-down 几乎持平。也就是说分歧集中在**明年这一跳**，不是长期斜率。

差别落在**哪一项**：不是收入，是 EPS 的构成——本件自己的说法是 Q2 的 headline EPS 增速 45% 里有 19 个点来自 mega-cap tech 的"other income"（权益投资浮盈），剔除后是 26%。GS 的 $340 明显低于 bottom-up 的 $359，方向上与"他认为这块非经营性收益不可持续"一致，但原文没有把差额归因到某一项，此处只做方向判断，不补数。

### 依据

- p.13｜<tr><td>2026</td><td>$340</td><td>$359</td><td>$334
- p.13｜<tr><td>2027</td><td>$385</td><td>$404</td><td>$386
- p.1｜S&P 500 EPS growth is tracking at 26% year/year excluding the “other income” from mega-cap tech’s appreciating equity investments.

## Q3 · 他的**财年是谁的财年**？

**日历年，且是指数层面的日历年，不是任何一家公司的财年。**

- 表内行标直接是 `2025 / 2026 / 2027` 三个年份配 `Y/Y growth`，没有 `FYE`、没有月末标注，也没有"fiscal year ending"。指数 EPS 没有财年概念，这里的年份就是日历年（1–12 月），可直接与日历年末的指数共识比。
- 价格锚另有一层：`YE2026` 与 `12-month` 是两个不同期限——前者是 2026 年 12 月 31 日的点位（8,000），后者是发布日起十二个月（8,300）。做对照时不能把 8,300 当成"2027 年底"。
- 定价时点：`Pricing as of July 30, 2026`，比刊头日期早一天；跨日比较要以此为基准。

结论：财年＝日历年（指数口径，无公司财年问题）；目标点位分"年末"与"滚动十二个月"两套，与公司件的 `FY26E / NTM` 混用会错位约一个季度。

### 依据

- p.13｜<tr><td>2025</td><td>$275</td><td>$275</td><td>$275
- p.13｜<tr><td>YE2026</td><td>8000</td><td>NA</td><td>7975
- p.13｜<tr><td>12-month</td><td>8300</td><td>8900</td><td>NA
- p.12｜Pricing as of July 30, 2026, unless otherwise noted.

## Q4 · **预测修正**：改了哪一项、从多少改到多少？改的是**假设**还是**结论**？

**本份没有给自己的预测做"旧值→新值"的修正，故无幅度可登。** 这是周报的体例：EPS 表只列当期值（$340 / $385），不列上一版。

能落数的修正是**别人的、且只给方向与幅度、不给基数**：

- **共识 2027 EPS**：自三季度初以来上修 **1%**，Energy 与 Financials 修得最多，全指数修正宽度为正。原文只给"1%"，没给起点值。
- **hyperscaler 2027 capex**：分析师估计现指向超 1 万亿美元，**比进入本季时的估计高 1,000 亿美元以上**。同样是"高多少"，不是"从 A 到 B"。
- **Q3 利润率**：已报 Q2 的公司里，多数被分析师**下调**了 Q3 利润率估计——只给方向，无幅度。
- **结论层的修正**：目标点位 8,000 / 8,300 与上期比无对照，本件未标示是否变动。

分层判定：
- 改的是**假设**吗？共识的 2027 EPS +1% 与 capex +1,000 亿是假设层的变化，但它们不是"他的修正"，是"他观察到的修正"。用的时候要标明归属。
- 改的是**结论**吗？本件未声明自身结论变动，无法判。
- 因此这一题的诚实结论是：**GS 本版预测未见修正记录，只登记两条可核的第三方上修**，不自行补基数、不把共识修正当成 GS 的观点变化。

### 依据

- p.8｜Since the start of Q3, consensus estimates for S&P 500 2027 EPS have been revised up by 1%, with the strongest revisions to Energy and Financials.
- p.10｜Analyst estimates now show hyperscaler capex exceeding cash flow from operations from 2026 through 2028.
- p.1｜Analyst estimates now point to over \$1 trillion of capex in 2027, more than \$100 billion above estimates heading into the quarter, and capex that will exceed cash flow from operations from 2026 through 2028.
- p.8｜While the profitability of the largest tech stocks has continued to lift margins for the aggregate S&P 500, analysts have recently trimmed Q3 margin estimates for most stocks that have reported Q2 results.

## Q5 · 他给了**情景**吗？各自驱动假设是什么？

**单情景。** 没有 Bull/Base/Bear，也没有三档目标价，只给一条时间路径：

| 期限 | 点位 | 相对现价 7,438 |
|---|---|---|
| 3 个月 | 7,600 | +2% |
| 6 个月（=YE2026） | 8,000 | +8% |
| 12 个月 | 8,300 | +12% |

驱动假设只有两个：**EPS 从 2026 的 $340 走到 2027 的 $385（+13%）**，以及 **P/E 维持 20x 附近**。把 8,000 除以 2026 年 EPS $340 得约 23.5x，说明目标点位隐含的不是 20x 而是更高的倍数——**这个隐含倍数材料里没写，是我按两值推算的**，原文只给点位与 EPS，未做桥接。

所以差别落在哪：这份"情景"里既没有收入分档也没有利润率分档，**唯一的变量是时间**。它不提供"若 AI capex 少 1,000 亿，指数到多少"这种反事实，也不设下行档。使用时的含义：8,300 是趋势外推，不是情景中枢，不能当 bull case 用。

### 依据

- p.23｜<tr><td>S&amp;P 500</td><td>level</td><td>7438</td><td>7600</td><td>8000</td><td>8300</td><td>12
- p.13｜<tr><td>YE2026</td><td>8000</td><td>NA</td><td>7975
- p.13｜<tr><td>12-month</td><td>8300</td><td>8900</td><td>NA

## Q6 · 他用了哪几种**估值方法**？**能互相印证吗**？

**只有一种：P/E 乘 EPS 的指数点位法，而且公式没写出来。**

- 给出的一侧是**倍数**：当前 NTM P/E 20x，并附十年/三十年分位（52% / 73%）作为"贵不贵"的坐标。
- 给出的另一侧是**盈利**：2026E $340、2027E $385。
- 但**目标点位 8,000 / 8,300 与这两侧的连接没有写**：既没有"8,000 = 20x × 某年 EPS"，也没有给出目标倍数（target multiple）。20x 是"当前"倍数，不是目标倍数，所以严格说无法复算。

**能互相印证吗：不能，因为只有一种方法，也没有第二种做交叉。** 没有 DCF、没有 EV/EBITDA、没有股息折现、没有 ERP/无风险利率的拆解（本件只给了 10 年期国债 4.7% 这类宏观预测，未接入估值公式）。

可核的隐含关系（按两值推算，非原文）：8,000 / $340 ≈ 23.5x 2026 EPS；8,300 / $385 ≈ 21.6x 2027 EPS。两个隐含倍数都高于当前 20x，说明目标点位默认"倍数还要再抬"，这一点原文既没承认也没否认——是本份估值部分最需要追问的地方。

### 依据

- p.13｜<tr><td>Current on NTM EPS</td><td>20x</td><td>20x</td><td>20x
- p.13｜<tr><td>YE2026</td><td>8000</td><td>NA</td><td>7975
- p.23｜<tr><td>S&amp;P 500</td><td>level</td><td>7438</td><td>7600</td><td>8000</td><td>8300</td><td>12

## Q7 · 目标价的**依据 / 估值方法解释 / 风险列示**齐不齐？

**不齐，缺第①件，属形式不合规，须上报。**

1. **目标价由哪个方法算出——未见。** 全文给了点位（YE2026 8,000、12 个月 8,300）和两张输入表（EPS、P/E），但**没有一句话说明 8,000 是怎么从 EPS 与倍数算出来的**，也没有目标倍数。按 2241(c)(1) 这是必备件，本件缺。
2. **关键输入——部分有。** EPS $340/$385、当前 P/E 20x、分位 52%/73%、现价 7,438 都在表内；缺的是"目标倍数"与"为何取这个倍数"（溢价理由）。宏观侧倒是给了 10 年期美债 12 个月 4.3%、Brent 74 美元等，但未接入指数估值。
3. **风险列示——无专门章节。** 只有正文零散两句方向话：输入成本压利润率、Q3 利润率估计被下调。没有"哪些情形会让指数到不了 8,300"的条目化列示。

结论：三件里①缺、②半、③弱。**这份周报的指数目标不具备可复算性**，引用时应只当"方向性判断"，不能当作可校验的估值结论。上报要点：GS 策略周报的指数目标未附推导，非个案，建议主控在模板层面对"指数级目标价"单列口径。

### 依据

- p.13｜<tr><td>YE2026</td><td>8000</td><td>NA</td><td>7975
- p.13｜<tr><td>Current on NTM EPS</td><td>20x</td><td>20x</td><td>20x
- p.8｜Input cost pressures remain a risk to corporate profitability. Net profit margins for the median S&P 500 stock have remained relatively unchanged during the past several quarters as companies managed headwinds from tariffs and energy prices.

## Q8 · **评级分布三件**（三档占比 · 投行关系占比 · 观测时点）齐不齐？

**三件全无。** 这不是遗漏，是产品型：本件是 Portfolio Strategy 的宏观/策略周报，不对任何个股给评级，因此不产生评级分布披露。

逐件核：

1. **三档占比**：未见。查了披露附录全节（Reg AC、Disclosures、Regulatory disclosures、各司法辖区段），没有 `Rating Distribution` 表，也没有 Buy/Hold/Sell 任何百分比。
2. **投行关系占比**：未见。同节没有 `Investment Banking Relationships` 表；只有 `See company-specific regulatory disclosures above for any of the following disclosures...` 这一句把逐公司披露外链到网站，而本件本身并不覆盖个股。
3. **观测时点**：未见。没有 `as of <日期>` 的评级统计时点；全文唯一时点是定价时点 `Pricing as of July 30, 2026`，那是行情基准，不能当披露观测日。

提醒：不要拿正文里"Buy/Hold/Sell"式的措辞去凑数——本件通篇没有个股评级，也没有可聚合的评级条目，自行数报告里的涨幅榜前十与跌幅榜前十这二十只票得到的比例是错的。

### 依据

- p.24｜See company-specific regulatory disclosures above for any of the following disclosures required as to companies referred to in this report: manager or co-manager in a pending transaction; 1% or other ownership; compensation for certain services; types of client relationships; managed/co-managed public offerings in prior periods; directorships; for equity securities, market making and/or specialist role. Goldman Sachs trades or may trade as a principal in debt securities (or in related derivatives) of issuers discussed in this report.
- p.12｜Pricing as of July 30, 2026, unless otherwise noted.

## Q9 · **评级 / 目标价历史走势图**在不在（含赋改日期）？

**不在，且不适用。** 本件无个股评级、无个股目标价，因此没有"评级/目标价历史"可画。

- 唯一的"历史"是**指数点位的历史分位**：P/E 20x 处于十年第 52 百分位、三十年第 73 百分位。这是估值分位，不是评级/目标价变动记录，不能顶替。
- 唯一的"目标价"是**未来点位预测**（YE2026 8,000、12 个月 8,300），单向预测，无历史序列、无更改日期、无评级变动。
- 披露附录里也没有 `Price target and rating history chart(s)` 或 `Target price history table(s)` 之类的标题。

结论：判未见；覆盖不足一年这一条也无从谈起，因为不存在覆盖标的。

### 依据

- p.1｜US WEEKLY KICKSTART
- p.24｜Disclosure Appendix

## Q10 · **九项冲突披露**在不在**首页**（或指明页码）？

首页无样板句指向披露页，仅有脚注"see the Disclosure Appendix"。九项内容在披露附录 Regulatory disclosures 一节，形式是**通用声明 + 类别清单 + 外链**，无逐公司条目（本件不覆盖个股）。逐项核对：

| 项 | 有/无 | 位置与内容 |
|---|---|---|
| ① 分析师及家庭持仓 | 有（禁令式，非持仓申报） | 披露附录美国节写明 GS 政策**禁止**分析师、向其汇报者及其家庭成员持有覆盖范围内公司证券。是约束声明，不是"本人/家庭持有多少"的申报；本件无覆盖个股，故也无从申报 |
| ② 报酬是否挂钩投行收入 | 有（直接） | "Analysts are paid in part based on the profitability of Goldman Sachs, which includes investment banking revenues." 明确与含投行收入的公司整体盈利挂钩 |
| ③ 近 12 个月主/副承销或收取投行报酬 | 未见 | 只有类别清单句（manager or co-manager in a pending transaction…），未列任何具体公司；本件为策略周报，无标的公司可列 |
| ④ 未来 3 个月是否寻求投行费 | 未见 | 查了 Reg AC、Disclosures、Regulatory disclosures 及各国段，无"未来三个月寻求投行交易/费用"的时窗表述；类别清单里的 "manager or co-manager in a pending transaction" 是项目清单用语，不是本项确认 |
| ⑤ 近 12 个月非投行服务报酬 | 未见 | 全节无 `non-investment banking` 字样，也无按公司列示的非投行服务报酬条目 |
| ⑥ 是否客户及服务类型 | 未见（具体） | 只有类别清单（compensation for certain services、types of client relationships）这一串可选项，无主体、无服务类型落到具体公司，判未见 |
| ⑦ 实益持有该类普通股 ≥1% | 未见 | 唯一相近的是印度管辖段"Goldman Sachs may beneficially own 1% or more of the securities … of the subject company"，主体为印度受监管实体、标的是"securities"泛称且限于印度法规语境；另一句"trades or may trade as a principal in debt securities"标的是债务证券。两者与"母公司持本标的普通股 ≥1%"主体与证券类别均不符 |
| ⑧ 是否做市 | 未见（具体） | 仅在类别清单出现 "for equity securities, market making and/or specialist role"，无本件任何标的的做市/专家角色确认；本件亦无个股标的 |
| ⑨ 分析师过去 12 个月是否从标的收酬 | 未见 | 全节无"analyst received compensation from the subject company"类表述；②挂的是公司整体盈利，非标的付酬 |
| ⑩ 其他重大冲突 | 有（产品型，非持仓） | `Basket disclosure`："The ability to trade the basket(s) in this report will depend upon market conditions, including liquidity and borrow constraints at the time of trade." 是本件篮子产品的可交易性/流动性披露，属产品风险而非持仓冲突；另首页提示"consider this report as only a single factor" |

红旗提示：本件没有实益持股、做市或投行费的具体条目可挂，**不构成持仓型红旗**；但它是 GS 自家的策略篮子与指数目标，且⑩明确说了篮子受流动性与借券约束 ⇒ 引用其篮子表现与目标点位时，应按"自家产品 + 方向性判断"折价，不宜当独立第三方预测。

### 依据

- p.24｜Ownership and material conflicts of interest: Goldman Sachs policy prohibits its analysts, professionals reporting to analysts and members of their households from owning securities of any company in the analyst’s area of coverage.
- p.24｜Analyst compensation: Analysts are paid in part based on the profitability of Goldman Sachs, which includes investment banking revenues.
- p.24｜The ability to trade the basket(s) in this report will depend upon market conditions, including liquidity and borrow constraints at the time of trade.
- p.24｜Goldman Sachs may beneficially own 1% or more of the securities (as such term is defined in clause 2 (h) the Indian Securities Contracts (Regulation) Act, 1956) of the subject company or companies referred to in this research report.
- p.1｜Investors should consider this report as only a single factor in making their investment decision. For Reg AC certification and other important disclosures, see the Disclosure Appendix, or go to www.gs.com/research/hedge.html.

## Q11 · 他的**风险章**挂了数字吗？

**没有风险章，只有两句散落的方向话，判"样板风险"（不是缺口——主题件本就没有风险章）。**

- 第一句在开篇：输入成本上升对利润率的影响是"a key risk"，无百分点、无金额、无年份。
- 第二句在修正段：输入成本压力仍是企业盈利的风险；紧接着给了一条**唯一带方向又可核的事实**——已报 Q2 的公司里多数被下调了 Q3 利润率估计。但仍无幅度。
- 全件没有"若 WACC ±1% / 目标倍数 ±1x / EPS −5% ⇒ 指数点位变多少"这类敏感度表。可替代的只有分位信息（P/E 20x 处十年 52 分位），那是坐标不是弹性。

要拿它做风险定价，只能自己搭：用 8,000 与 $340 反推 23.5x，再看"若回到 20x ⇒ 约 6,800"这种自建敏感度——**这属于我方推算，原文未给**，引用时必须标明。

### 依据

- p.1｜The impact of rising input costs on margins remains a key risk.
- p.8｜Input cost pressures remain a risk to corporate profitability.
- p.8｜While the profitability of the largest tech stocks has continued to lift margins for the aggregate S&P 500, analysts have recently trimmed Q3 margin estimates for most stocks that have reported Q2 results.

## Q12 · 这份报告落在**静默期窗口**内吗？

**否。**

- 发布时点：`Portfolio Strategy Research 31 July 2026 | 4:47PM EDT`（首页刊头）。注意 frontmatter 的 2026-08-03 是登记日，不是发布日，判窗口要用 7 月 31 日。
- 本件性质：策略周报（US Weekly Kickstart），内容是 Q2 财报季中段回顾、指数 EPS/点位预测、板块与因子表现、跨资产预测表。**与任何发行、承销、锁定期无关**。
- 发行时间线：全文未见 IPO、二次发行、配售、承销团（Manager/Co-Manager）或发行日。披露附录出现 `manager or co-manager in a pending transaction` 属类别清单用语，未附任何项目与日期。
- 与发行最接近的一句是篮子披露——"篮子能否交易取决于市场条件，包括流动性与借券约束"，这是产品可交易性提示，不是发行事件，不产生 10 天/3 天窗口。

结论：不落静默期。真正的时点风险不在窗口，而在**定价日 7 月 30 日与发布日 7 月 31 日相差一天**、且 Nvidia 定于 8 月 26 日发布财报——引用其"Q2 已基本定调"的结论时，要预留这只有待发布的最大权重股。

### 依据

- p.1｜Portfolio Strategy Research 31 July 2026 | 4:47PM EDT
- p.3｜Nvidia, the largest stock left to report, is scheduled to release earnings on August 26th.
- p.24｜The ability to trade the basket(s) in this report will depend upon market conditions, including liquidity and borrow constraints at the time of trade.
