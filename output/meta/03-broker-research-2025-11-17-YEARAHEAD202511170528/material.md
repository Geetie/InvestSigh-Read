---
id: 03-broker-research-2025-11-17-YEARAHEAD202511170528
cat: "03"
sub: broker-research
template: broker-research
template_version: 2
date: 2025-11-17
time: "00:00"
title: "03-broker-research-2025-11-17-YEARAHEAD202511170528"
kind: "broker-research"
issuer: ""
ticker: META
source_pages: 66
---

> 骨架已生成，答案待填。原文：`corpus/materials/mineru/03-broker-research-2025-11-17-YEARAHEAD202511170528/full.md`（66 页）。
> 填写纪律见 `docs/EVIDENCE-SPEC.md`：有答案必有依据块，块须逐字，页码 `p.N` 以源 PDF 为准。

## Q1 · 他的**关键假设取值**各是多少？

**产品型：策略/主题件**（标的为 S&P 500 指数，无公司损益表），六项假设按指数口径逐项落：

- **口径**：本件唯一成型的假设链是"指数级 EPS 路径 × 目标 P/E"，没有三张表。六项里只有 EPS 路径、目标倍数、净利率增量三项有值，另四项材料未给出。
- **EPS 路径（自上而下，美元/指数点）**：2025 年 \$272（+12%）、2026 年 \$317（+17%）、2027 年 \$356（+12%）。
- **目标 P/E**：22.0x；当前（报告写作时 6,734 点）22.3x ⇒ 假设温和压缩 0.3 个 turn，即"估值小幅压缩但仍在历史高位"。复算：7,800 / 356 = 21.9x，取整为 22x。
- **净利率增量（唯一的利润率假设）**：AI 驱动效率对净利率的贡献 2026 年 +40bps、2027 年 +60bps。
- **收入增速**：材料未给出指数级收入增速预测（正文只有 3Q"2.2% 营收超预期率"这类事后读数，不是预测）。
- **毛利率 / 营业利润率绝对水平**：材料未给出。
- **资本开支**：材料未给出指数级数值，只有 AI capex 周期的方向性陈述。
- **实际税率 / 摊薄股数**：材料未给出，指数层面亦不适用。
- **判断**：整套模型是两点式（EPS × 目标倍数），不含资产负债表与现金流假设；因此 PT 可复算，从收入到 EPS 的桥不可复算，逐行"假设 vs 结果"的检验做不了。

### 依据

- p.1｜We see 2025 EPS of \$272 (12% growth), 2026 EPS of \$317 (17% growth), and 2027 EPS of \$356 (12% growth)
- p.14｜adds 40bps of net margin expansion in 2026 (up from 30bps previously) and 60bps in 2027 (up from 50bps previously)
- p.8｜Base</td><td>6,734</td><td>7,800</td><td>16%</td><td>22.3x</td><td>22.0x</td><td>$272</td><td>$317</td><td>$356</td><td>$270</td><td>$307</td><td>$351</td></tr>

## Q2 · **他和我差在哪一项、哪一年**？差多少？

我方模型数值不在本份材料内，逐行"他 vs 我"的对照需跨批（交主控）。

本材料内可核的对照是**他的自上而下 EPS vs 报告自附的自下而上共识**（同一张表左右两半）：

| 财年 | MS Top Down | Bottom Up Consensus | 差额 | 相对差 |
|---|---|---|---|---|
| 2025 | \$272 | \$270 | +\$2 | +0.7% |
| 2026 | \$317 | \$307 | +\$10 | +3.3% |
| 2027 | \$356 | \$351 | +\$5 | +1.4% |

- **差最大的一年是 2026 年**（+3.3%），2027 年回落到 +1.4%，2025 年几乎无差（+0.7%）——即分歧集中在"明年这一跳"，不是全期一致高估。
- **差异落在哪一端**：报告自称全预测期 EPS 均高于共识，并把原因归于经营杠杆回归、定价权与 AI 效率，即**利润率端主导**；但材料没有给收入与利润率的拆分，因此无法把 +3.3% 分解成"收入端多少、利润率端多少"——记为缺口。
- **旁证**：三个情景行（Bear/Base/Bull）引用的共识列完全相同（270/307/351），说明共识是同一套外生输入，不是逐情景重算的。
- **判断**：他的相对共识的偏离幅度（+3.3%）不算激进，但支撑点是一条未量化的利润率故事；若共识的收入假设本就接近，则全部差异都压在利润率上，风险敞口集中在单一一端。

### 依据

- p.8｜This expectation incorporates higher-than-consensus EPS throughout our forecast horizon.
- p.8｜Base</td><td>6,734</td><td>7,800</td><td>16%</td><td>22.3x</td><td>22.0x</td><td>$272</td><td>$317</td><td>$356</td><td>$270</td><td>$307</td><td>$351</td></tr>
- p.8｜Bear</td><td>6,734</td><td>5.600</td><td>-17%</td><td>22.3x</td><td>20.0x</td><td>$268</td><td>$281</td><td>$280</td><td>$270</td><td>$307</td><td>$351</td></tr>

## Q3 · 他的**财年是谁的财年**？

- **列头只写裸年份**（2025 / 2026 / 2027），没有 `FYE Dec`、`Dec-25A` 这类月末标记 ⇒ 按**日历年**处理，并注明这是**推定**，不是原文确认。
- **标的是 S&P 500 指数**，不是某家公司，因此不存在"公司财年 vs 日历年错一个季度"的问题；指数 EPS 本身即日历年口径，可直接与日历年末共识比。上面 Q2 的对照表就是同口径对同口径，不需要换口径。
- **时点基准**：当前点位取 6,734（写作时），PT 的期限是"未来 12 个月"，不是某一财年末 ⇒ PT 与 EPS 的财年标号不完全对齐（12 个月滚动 vs 日历年），复算 22x × 356 时用的是 2027 年 EPS，属于"以 12 个月后的 forward EPS 配 12 个月目标"的处理。
- **判断**：财年口径不构成陷阱，但"12 个月滚动 PT 配日历年 EPS"这一点在跨机构比目标价时必须统一，否则会系统性高估或低估一倍。

### 依据

- p.8｜Current Price</td><td>Price Target</td><td>toCurrent</td><td>CurrentP/E</td><td>P/ETarget</td><td>2025</td><td>2026</td><td>2027</td><td>2025</td><td>2026</td><td>2027</td>
- p.1｜We Raise Our 12-Month S&P 500 Price Target to 7,800 (22x forward EPS of \$356)

## Q4 · **预测修正**：改了哪一项、从多少改到多少？改的是**假设**还是**结论**？

分两层看，本件两层都动了：

**结论层（观点变了）**
- 目标价：上调至 7,800，原文只说 raise，**没有给旧值** ⇒ 记"仅方向无幅度"，不自行补基数、不说涨了多少。
- 配置结论：小盘相对大盘上调至超配；消费可选商品由低配上调至超配；医疗保健上调至超配。这是配置观点变化，不是盈利预测变化。

**假设层（事实变了，重要）**
- AI 效率对净利率的贡献：2026 年 **30bps → 40bps（+10bps）**；2027 年 **50bps → 60bps（+10bps）**。这是本件唯一给了"从多少改到多少"的假设修正。
- 判定：**假设变了，但幅度很小**（各 +10bps 净利率）。以 2026 年为例，10bps 净利率对 EPS 的拉动在 1% 量级以内，无法解释一次目标价上调（旧值缺失，无法分解）。因此这次修正的性质是"结论大改、假设微调"——观点的主要驱动不在盈利模型里，而在倍数与叙事（rolling recovery）。
- 对使用者含义：想抄他的仓位可以，但别把这次上调当成"盈利预测上修"来读。

### 依据

- p.1｜We raise our S&P 500 price target to 7,800 driven by strong earnings growth.
- p.14｜adds 40bps of net margin expansion in 2026 (up from 30bps previously) and 60bps in 2027 (up from 50bps previously)

## Q5 · 他给了**情景**吗？各自驱动假设是什么？

**三档齐**，且每档都有 PT、目标倍数、三年 EPS 与增速：

| 档 | PT | 目标 P/E | 2025/2026/2027 EPS | 增速 |
|---|---|---|---|---|
| Bear | 5,600 | 20.0x | \$268 / \$281 / \$280 | 10% / 5% / 0% |
| Base | 7,800 | 22.0x | \$272 / \$317 / \$356 | 12% / 17% / 12% |
| Bull | 9,000 | 23.0x | \$274 / \$338 / \$393 | 13% / 23% / 16% |

- **Bull 的触发假设（有文字）**：更强的正向经营杠杆，2025–2027 累计利润率扩张超 250bps；AI 效率在 2026/2027 分别贡献 60/80bps 利润率抬升；收入端靠工业、消费、科技三大板块的单位需求韧性加定价权；Fed 降息更久（贯穿 2026 而非集中在上半年）并前端净购债；财政端 bonus depreciation 与 R&D 费用化带动资本开支复苏；倍数扩至 23x。
- **Base 的差别**：利润率扩张弱于 Bull、倍数反而从当前 22.3x 压到 22.0x。
- **Bear 的触发假设（无文字）**：只有表格一行，没有对应的情景段落 ⇒ 只能从 EPS 增速 10%/5%/0% 与 20.0x 反读，属于**叙述缺失**。
- **杠杆在哪**：Bear→Bull 的 PT 差 +61%（5,600→9,000），其中 2026 年 EPS 从 281 到 338 是 +20%，倍数从 20x 到 23x 是 +15%，两者相乘约 +38%（其余来自 2027 EPS）⇒ **经营与倍数各占一半，杠杆不是纯倍数**。这与"目标价差三成而假设只差一个点"的典型病不同，本件情景是"EPS 与倍数同时动"。
- **判断**：情景结构完整、可复算，但 Bear 缺叙述、三档的宏观触发条件（降息路径、通胀读数）没有量化门槛，档位之间无法判定"哪个宏观读数落在哪个档"。

### 依据

- p.8｜Bear</td><td>6,734</td><td>5.600</td><td>-17%</td><td>22.3x</td><td>20.0x</td><td>$268</td><td>$281</td><td>$280</td><td>$270</td><td>$307</td><td>$351</td></tr>
- p.8｜Growth</td><td>6.734</td><td>9.000</td><td>34%</td><td>22.3x</td><td>23.0x</td><td>$274 13%</td><td>$338 23%</td><td>$393 16%</td><td>$270 11%</td><td>$307 14%</td><td>$351 14%</td></tr>
- p.22｜In our bull case outcome (9,000 price target), earnings growth is even stronger than it is in our base case. Specifically, we see 13% EPS growth in 2025, 23% in 2026 and 16% in 2027.
- p.22｜EPS growth upside is driven by an even more robust positive operating leverage dynamic as margin expansion is over 250bps cumulatively from 2025 through 2027.

## Q6 · 他用了哪几种**估值方法**？**能互相印证吗**？

**只给一种方法**：目标 P/E × forward EPS，无 DCF、无 WACC、无永续增长率、无同业可比组，因此**不存在两法互证**。

- **公式与输入**：PT = 22.0x × forward EPS \$356 = 7,832，与 7,800 差 0.4%（取整误差）。两个输入（倍数 22.0x、EPS 356）都落了纸面，可复算。
- **倍数取值的辩护**：报告用"当前 22.3x ⇒ 目标 22.0x"说明这是"温和压缩"，并以"EPS 增速高于中位数（约 7–8%）且货币政策宽松的时期，很少出现有意义的倍数压缩"作为历史依据——这是定性辩护，没有回归或分位数支撑。
- **三档内部一致性**：Bear 20.0 × 281 = 5,620 ≈ 5,600；Bull 23.0 × 393 = 9,039 ≈ 9,000。三档同用一套"倍数 × EPS"，口径自洽。
- **判断**：方法单点、可复算、但不能互证。真正无法验证的是 EPS 356 本身的来路——报告没有给收入与利润率的桥，EPS 是外生给定，等于整个估值只有一个可检验输入（倍数）。

### 依据

- p.8｜We raise our 12-month S&P 500 price target to 7,800 (22x forward EPS of \$356).
- p.8｜Growth</td><td>6.734</td><td>9.000</td><td>34%</td><td>22.3x</td><td>23.0x</td><td>$274 13%</td><td>$338 23%</td><td>$393 16%</td><td>$270 11%</td><td>$307 14%</td><td>$351 14%</td></tr>

## Q7 · 目标价的**依据 / 估值方法解释 / 风险列示**齐不齐？

逐条判 2241(c)(1) 三件：

1. **目标价由哪个方法算出**：**有**，一句话可复算——22x forward EPS of \$356。没有分步公式、没有倍数区间的选取规则。
2. **方法的关键输入**：**有（简版）**——EPS 三档、目标倍数 22.0x、当前倍数 22.3x 都在表内；但缺"为什么是 22x 而不是 21x 或 23x"的量化依据。
3. **可能阻碍达成目标价的风险列示**：**只有方向句，没有条目化**——近端是"货币政策不够鸽、流动性收紧压制高动量板块"，以及"政府关门导致数据延迟、若就业数据不 corroborate 则看多预测落空"；远端是"run it hot 引发决策者无法忽视的通胀冲动"。三条都是宏观机制描述，没有一条写成"若 X 变则指数跌到 Y"的可检验条件。

**另有一处形式问题必须上报**：披露段明文把"valuation methodology and risks associated with any recommendation, rating or price target"整体外包给 Client Support Team（打电话索取），即机构自己承认方法与风险不在本件内落地。就 2241(c)(1) 的三件而言，第 1、2 件以最简形式存在，第 3 件不成条目 ⇒ **形式要件不全，判"未见完整风险列示"**。

**判断**：这是一份策略展望而非个股研报，用个股研报的三件套去卡它天然吃亏；但对使用者的实际影响是——PT 的责任边界被推给了客服电话，报告本身不承担"什么情况下 7,800 不成立"的举证。

### 依据

- p.63｜For valuation methodology and risks associated with any recommendation, rating or price target referenced in this research report, please contact the Client Support Team as follows
- p.4｜This is a near-term risk to our bullish 12-month forecasts should delays in the data continue and/or lagging labor releases (i.e., September jobs) not corroborate the recent weakness in the alternative jobs data.
- p.2｜Longer-term risk: running it hot leads to an inflationary impulse that policy makers can't ignore (see our hotter but shorter cycle framework).

## Q8 · **评级分布三件**（三档占比 · 投行关系占比 · 观测时点）齐不齐？

**三件齐**，且全部取自机构级披露表（非数报告里的股票条数）：

| 档 | 覆盖数 | 占比 | 投行客户数 | 占 IBC | 占该评级 |
|---|---|---|---|---|---|
| Overweight/Buy | 1,501 | 41% | 384 | 46% | 26% |
| Equal-weight/Hold | 1,609 | 44% | 370 | 44% | 23% |
| Not-Rated/Hold | 4 | 0% | 1 | 0% | 25% |
| Underweight/Sell | 568 | 15% | 80 | 10% | 14% |
| 合计 | 3,682 | — | 835 | — | — |

- **三档占比**：超配 41% / 中性 44% / 低配 15%（另有 4 只未评级），合计 3,682 只普通股与 ADR。
- **投行关系占比**：全公司 835 家为过去 12 个月的投行客户；按评级看，超配档中 26% 是投行客户、中性档 23%、低配档 14% ⇒ **推荐越正面、投行关系越密**（26% vs 14%，差近一倍），这是本表最值得记的一列。
- **观测时点**：截至 2025 年 10 月 31 日；发布日为 11 月 17 日，距该时点 17 天。用的是 10 月末口径，不是 9 月末季末口径。
- **判断**：三件齐全、口径干净。但要注意 MS 的评级是相对配置（OW/EW/UW），不与 Buy/Hold/Sell 等价，报告自己也声明了这一点；跨机构比"买入占比"时须先换算。

### 依据

- p.63｜Global Stock Ratings Distribution (as of October 31, 2025)
- p.64｜Overweight/Buy</td><td>1501</td><td>41%</td><td>384</td><td>46%</td><td>26%</td><td>703</td><td>41%</td></tr>
- p.64｜Underweight/Sell</td><td>568</td><td>15%</td><td>80</td><td>10%</td><td>14%</td><td>223</td><td>13%</td></tr>
- p.64｜Total</td><td>3,682</td><td></td><td>835</td><td></td><td></td><td>1715</td><td></td></tr>

## Q9 · **评级 / 目标价历史走势图**在不在（含赋改日期）？

**判未见**。

- 文本层**没有任何评级/目标价历史图或表**：既无覆盖起止日期，也无变动条数，更无"最近一次（日期/评级/PT）"。全文 66 页只在披露段出现一句指向外部网站的声明（stock price charts and equity rating histories 请上 Disclosure Website 查），本件本身不承载数据。
- **产品型因素**：本件标的为 S&P 500 指数，本来就无个股评级，也就无所谓"评级历史"；报告层面只有指数目标价的一次性上调（无旧值），连单点序列都构不成。
- **判断**：这是"声明有图、文本层无数据"的典型情形，判未见；不是覆盖不足一年，而是压根不在本件载体内。若要补，只能到官网披露库调，不能从本件推。

### 依据

- p.63｜For important disclosures, stock price charts and equity rating histories regarding companies that are the subject of this report, please see the Morgan Stanley Research Disclosure Website at www.morganstanley.com/researchdisclosures

## Q10 · **九项冲突披露**在不在**首页**（或指明页码）？

首页以样板句指明披露页（"refer to the Disclosure Section, located at the end of this report"），逐项内容在披露附录。逐项核对：

| 项 | 有/无 | 位置与内容 |
|---|---|---|
| ① 分析师及家庭持仓 | 有 | 点名 Nicholas Lentini, CFA 持有 Delta Airlines 普通股或优先股（含家庭成员口径）；Lentini 在认证段署名之列，故属本件团队的持仓披露，但标的是 Delta（本件讨论的指数成份股之一），不是本件标的本身 |
| ② 报酬是否挂钩投行收入 | 有（间接） | 报酬基于研究质量、客户反馈、选股、竞争因素、"firm revenues and overall investment banking revenues"，但明文 not linked to 具体投行/资本市场交易或交易台盈亏 ⇒ 只到公司总收入层面，非直接挂钩 |
| ③ 近 12 个月主/副承销或收投行报酬 | 有 | 近 12 个月主承销或副承销 8 家公司证券（Abbvie、American Tower、CenterPoint、Colgate、McDonald's、Northrop、PSEG、Walmart）；另列收投行服务报酬的 10 家。名单均不含"S&P 500 指数"，含 Delta、Walmart、Target 等成份股 |
| ④ 未来 3 个月是否寻求投行费 | 有 | 明确列出"expects to receive or intends to seek"的 14 家公司名单（含 Atlassian、EQT、Target、Progressive 等），名单不含指数标的 |
| ⑤ 近 12 个月非投行服务报酬 | 有 | 单列"products and services other than investment banking services"的 14 家名单，与第③项名单分开列示，不混用 |
| ⑥ 是否客户及服务类型 | 有 | 两类分开写：投行客户关系（investment banking client relationship）与非投行证券相关服务/客户关系（non-investment banking, securities-related services），服务类型有明示 |
| ⑦ 实益持有该类普通股 ≥1% | 有 | 截至 2025-10-31，MS 实益持有 14 家公司一类普通股 1% 以上（Abbvie、American Tower、Atlassian、CenterPoint、Coca-Cola、Colgate、Delta、EQT、Knight-Swift、McDonald's、Northrop、PSEG、Target、Progressive、Walmart 中的 14 家）。四要素齐：谁=MS、何时=2025-10-31、什么=一类普通股 ≥1%、原文如上。名单内**没有"S&P 500 指数"这一标的**，指数不可实益持有，故对本件标的应读作"不适用"，但成份股层面确有多只被持有 |
| ⑧ 是否做市 | 有 | 仅两家：Knight-Swift、Public Service Enterprise Group。不含本件标的（指数），覆盖范围极窄 |
| ⑨ 分析师过去 12 个月是否从标的收酬 | 未见 | 查遍"Important Regulatory Disclosures on Subject Companies"整节（持仓/1%持股/承销/投行费/非投行费/客户关系/董事/做市/报酬机制），无"分析师从标的公司收取报酬"的确认或否认句。唯一相近的是认证段"未收取且将不收取以换取特定建议或观点的直接或间接报酬"——那是"为观点收酬"的否定式承诺，事项与主体都不同（不是"从被研究公司收酬"），故不算 |
| ⑩ 其他重大冲突 | 有 | 两条：研究部内部在报告完成前可接触本报告的人员持有 Atlassian 证券（声明其非分析师、非分析师家庭成员）；另有一名 MS 员工/董事/顾问出任 Walmart 董事（同样声明非分析师） |

红旗提示：该机构实益持有本件所讨论的多只成份股 ≥1% 普通股（含 Atlassian、EQT、Target、Walmart）+ 对两家成份股做市 + 近 12 个月对 10 家成份股收投行费 ⇒ 引用其板块与个股推荐（尤其 Fresh Money Buy List 里的 TEAM、TGT）时立场折价。另注：本件 12 页正文之外配了整本成份股筛选表，被点名个股多落在上述名单内，逐票核对成本高，建议按名单交集抽查。

### 依据

- p.1｜For analyst certification and other important disclosures, refer to the Disclosure Section, located at the end of this report.
- p.63｜The analyst or strategist (or a household member) identified below owns the following securities (or related derivatives): Nicholas Lentini, CFA - Delta Airlines, Inc.(common or preferred stock).
- p.63｜The equity research analysts or strategists principally responsible for the preparation of Morgan Stanley Research have received compensation based upon various factors, including quality of research, investor client feedback, stock picking, competitive factors, firm revenues and overall investment banking revenues.
- p.63｜Within the last 12 months, Morgan Stanley managed or co-managed a public offering (or 144A offering) of securities of Abbvie Inc., American Tower Corp., CenterPoint Energy Inc, Colgate-Palmolive Co, McDonald's Corporation, Northrop Grumman Corp., Public Service Enterprise Group Inc, Walmart Inc.
- p.63｜In the next 3 months, Morgan Stanley expects to receive or intends to seek compensation for investment banking services from Abbvie Inc., American Tower Corp., Atlassian Corporation PLC, CenterPoint Energy Inc, Coca-Cola Co., Colgate-Palmolive Co, Delta Airlines, Inc., EQT Corp., McDonald's Corporation, Northrop Grumman Corp., Public Service Enterprise Group Inc, Target Corp, The Progressive Corp., Walmart Inc.
- p.63｜Within the last 12 months, Morgan Stanley has received compensation for products and services other than investment banking services from Abbvie Inc., American Tower Corp., Atlassian Corporation PLC, CenterPoint Energy Inc, Coca-Cola Co., Colgate-Palmolive Co, Delta Airlines, Inc., EQT Corp., McDonald's Corporation, Northrop Grumman Corp., Public Service Enterprise Group Inc, Target Corp, The Progressive Corp., Walmart Inc.
- p.63｜Within the last 12 months, Morgan Stanley has provided or is providing investment banking services to, or has an investment banking client relationship with, the following company: Abbvie Inc., American Tower Corp., Atlassian Corporation PLC, CenterPoint Energy Inc, Coca-Cola Co.
- p.63｜As of October 31, 2025, Morgan Stanley beneficially owned 1% or more of a class of common equity securities of the following companies covered in Morgan Stanley Research: Abbvie Inc., American Tower Corp., Atlassian Corporation PLC, CenterPoint Energy Inc, Coca-Cola Co., Colgate-Palmolive Co, Delta Airlines, Inc., EQT Corp., Knight-Swift Transportation Holdings Inc, McDonald's Corporation, Northrop Grumman Corp., Public Service Enterprise Group Inc, Target Corp, The Progressive Corp., Walmart Inc.
- p.63｜Morgan Stanley & Co. LLC makes a market in the securities of Knight-Swift Transportation Holdings Inc, Public Service Enterprise Group Inc.
- p.63｜The following analysts hereby certify that their views about the companies and their securities discussed in this report are accurately expressed and that they have not received and will not receive direct or indirect compensation in exchange for expressing specific recommendations or views in this report
- p.64｜A member of Research who had or could have had access to the research prior to completion owns securities (or related derivatives) in the Atlassian Corporation PLC. This person is not a research analyst or a member of research analyst's household.
- p.63｜An employee, director or consultant of Morgan Stanley is a director of Walmart Inc. This person is not a research analyst or a member of a research analyst's household.

## Q11 · 他的**风险章**挂了数字吗？

**没挂数字，是样板风险（不是缺口）**。逐条点数：

- 全文风险条目共 3 条，全部为方向句：① 货币政策不够鸽派、流动性收紧压制高动量板块；② 政府关门造成就业数据延迟，若数据不 corroborate 则 12 个月看多预测落空；③ run it hot 最终引发决策者无法忽视的通胀冲动（自述"超出 12 个月预测期，但可能来得更早"）。
- **无一条附百分点、点位或 EPS 影响**。写不成"若〔变量〕变 X ⇒ 2027 年 EPS 或 PT 变 Y%"里的任何一条。
- 全文**没有 WACC / 永续增长率 / 目标倍数 ±1x 对 PT 的敏感度附表**——这本是唯一能把风险挂上数字的位置，估值为单一倍数法也没有做倍数敏感性（例如 21x 对应 7,476、23x 对应 8,188 这类，读者须自己算）。
- **判断**：指数策略件不做敏感度表是行业惯例，故判"样板风险"而非"缺口"；但代价是风险与目标价之间没有量化连接，7,800 在报告内是不可否证的。使用者需要自己补一条：22x 每差 1 个 turn，PT 差约 ±356 点（约 ±4.6%），这一条报告没写。

### 依据

- p.4｜This is a near-term risk to our bullish 12-month forecasts should delays in the data continue and/or lagging labor releases (i.e., September jobs) not corroborate the recent weakness in the alternative jobs data.
- p.2｜Longer-term risk: running it hot leads to an inflationary impulse that policy makers can't ignore (see our hotter but shorter cycle framework).

## Q12 · 这份报告落在**静默期窗口**内吗？

**否，不落窗。**

- **发布日**：2025 年 11 月 17 日 05:28 GMT（美东时间当日上午）。
- **发行时间线**：全文未见任何 IPO、二次发行、follow-on 或承销时间表；披露段只有一条常规的"近 12 个月曾为某些公司主/副承销证券"的历史名单，那是对已发生交易的回顾，与本次发布时点无对应关系，不构成本次发行的静默期约束。
- **角色判定**：本件不是某只新股的承销商研究报告，而是年度策略展望；标的为 S&P 500 指数，无发行主体，静默期规则（IPO 后 ≥10 天、二次发行后 ≥3 天）在指数层面不适用。
- **判断**：无窗口问题。唯一需要留意的是本件与同期若干成份股首发/增发报告可能同批发布，若主控要把本件与个股件合并核对承销角色，需另取那些个股件的披露页，本件提供不了。

### 依据

- p.1｜November 17, 2025 05:28 AM GMT
- p.1｜For analyst certification and other important disclosures, refer to the Disclosure Section, located at the end of this report.
