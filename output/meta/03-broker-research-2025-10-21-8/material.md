---
id: 03-broker-research-2025-10-21-8
cat: "03"
sub: broker-research
template: broker-research
template_version: 2
date: 2025-10-21
time: "00:00"
title: "03-broker-research-2025-10-21-8"
kind: "broker-research"
issuer: ""
ticker: META
source_pages: 20
---

> 骨架已生成，答案待填。原文：`corpus/materials/mineru/03-broker-research-2025-10-21-8/full.md`（20 页）。
> 填写纪律见 `docs/EVIDENCE-SPEC.md`：有答案必有依据块，块须逐字，页码 `p.N` 以源 PDF 为准。

## Q1 · 他的**关键假设取值**各是多少？

**产品型先判清：这是摩根士丹利「Idea」行业主题件（Asia Pacific Industry View: In-Line），不是个股评级 / 首评件。** 全文没有个股评级、没有目标价、没有财务估计表；正文 5 页 + 展位目录 1 页 + 图版 8 页 + 披露 6 页。META 在文中以**需求侧客户**身份出现（Meta 主题演讲，由 Brian Nowak 覆盖），本件署名分析师 Sharon Shih / Howard Kao / Derrick Yang 覆盖的是大中华科技硬件。

因此 Q1 的六项财务假设**逐项未给该行**：

- 收入增速：**未给该行**（无 P&L 预测，也无单家公司收入拆分）
- 毛利率：**未给该行**
- 营业利润率：**未给该行**
- 资本开支：**未给该行**（只给客户侧电力/机架规模，未折算为任何公司的 capex 金额）
- 实际税率：**未给该行**
- 摊薄股数：**未给该行**

手册对主题件的要求是"Q1 取长期假设行"。他真正给出的"假设"是**产业时间表与工程规格**，共十条，逐条带口径：

| # | 量名 | 值 | 期间 / 时点 | 口径 |
|---|---|---|---|---|
| 1 | OCP 参展商数 | 129 家（去年 99，+30.3% 复算） | 2025 年展会（10/13–16） | 现场设展位企业数 |
| 2 | 其中台湾厂商 | 27 家（去年 22，+22.7% 复算） | 同上 | 同上 |
| 3 | AMD Helios 机架宽度 | 21 英寸，ORV3 的两倍宽 | 2026 下半年起出货 | 机架外形规格（ORW） |
| 4 | 800 VDC 架构收益 | 同截面铜排多传 >150% 功率；PUE 改善约 5% | 随 Rubin Ultra 于 2027 下半年首发 | 相对 50V conventional 机房 |
| 5 | Delta 固态变压器 | 1.2 MW 已量产，设计 >3 MW | 当前 | 10 尺集装箱尺寸 |
| 6 | Google Deschutes CDU | 2 MW；3°C ATD；80 PSI 可用压力 | 当前（开放设计） | 机柜列间液冷 |
| 7 | GB300 计算托盘液冷比 | 85% 液冷 / 15% 风冷；每托盘 6 组快接头 | 当前量产 | 混合散热 |
| 8 | VR200 计算托盘 | 14 组快接头（GB300 为 6 组）；整机柜交付 2026 三季度末 | 2026Q3 末 | 全液冷 |
| 9 | Meta 单站规模 | Richland & Parish（Hyperion）单站 5 GW；集群由 128 GPU 扩至 12.9 万卡 | 截至去年 | 区域级集群 |
| 10 | 测试产能配比 | 每交付 10 MW 机房，伙伴需自建 1 MW 测试产能 | 当前 | 供应链扩产约束 |

另有两条"市场结构假设"，属他引数据而非自身测算：CPO 交换机 TH5 Bailly 51.2T 首 1,500 万器件小时的年链路故障率 0.34%（可插拔对照 1.58%）、MTBF 260 万小时（对照 55 万小时）；浸没式散热 2028 年见拐点、冷板技术至 2030 年仍是主流（Promersion 观点）。

**图内读数（无文本层可引）**：规模化域上限随机架形态抬升——ORV3 HPR ≤72 加速器、ORW 于 2026Q3 ≤144、下一代 2027Q3 ≥256。该组数字只见于 p.7 第 4 张图，文本层无字可抄，判据为该页图。

一句话：这份材料能进模型的不是 EPS 假设，而是**三个时点（Helios 2H26、VR200 机柜 3Q26 末、800VDC 2H2027）＋ 两个工程比率（液冷占比、测试产能配比）**；把它们当收入或利润率假设直接入模会错。

### 依据

- p.1｜The Open Compute Project (OCP) Global Summit was hosted in San Jose, US on October 13-16. Of the 129 companies (up from 99 last year) ( Exhibit 1 ) that had booths at OCP, 27 were Taiwanese (up from 22 last year) ( Exhibit 2 ).
- p.1｜The AMD Helios rack features double-wide of 21" to enable bigger scale-up domains. It is aiming to start shipments in 2H26.
- p.1｜800 VDC solution is in development from solid-state transformer to DC-DC power conversion board, aiming to debut with the Rubin Ultra platform in 2H2027.
- p.1｜Ethernet for Scale-Up Networking (ESUN) and CPO switches have been introduced to optimize AI data networking but reliability, serviceability and cost remain key
- p.2｜Meta said its Richland & Parish site (Hyperion) is just one 5GW datacenter and it is going to build more of these over the next few years ( Exhibit 11 ), and the entire industry is going to build more as well.
- p.2｜In Meta's (covered by Brian Nowak) keynote speech, Vice President, Dan Rabinovitsj, mentioned that Meta has been scaling up its GPU clusters over the past few years, from 128 GPUs to 129K region scale clusters as of last year.
- p.2｜especially since every 10MW of capacity that it delivers in a datacenter, its partners would need to build 1MW of capacity just for testing ( Exhibit 10 ).
- p.3｜It is a hybrid solution (85% liquid / 15% air), with only 6x sets of QD per compute tray ( Exhibit 16 ).
- p.3｜These compute trays should be fully liquid-cooled, which means there should 14x sets of QD (vs just 6x sets for GB300), Exhibit 17 .
- p.4｜As we noted on OCP Day one, 800 VDC allows >150% more power transmitted through the same copper without additional 200-kg copper busbars feeding a single server rack. This improves power usage effectiveness by around 5%, vs. 50V power architecture at conventional data center.
- p.4｜Delta Electronics at its booth showcased its own-designed solid-state transformer (SST) that features 1.2MW (mass produced already, >3MW in design) in 10-feet cargo container size for mid-voltage fuse and converter, mid-voltage to low-voltage AC/DC, SiC power module and control box.
- p.4｜Google (covered by Brian Nowak) offers open design for its two megawatt coolant distribution units that features 3 degree Celsius approach temperature difference (ATD), in addition to 80 PSI available pressure to enable advanced cold plate designs for large-scale AI accelerators.
- p.4｜Promersion presented at OCP, and according to it, immersion cooling, which took a dip in market value this year, will see inflection in 2028 ( Exhibit 19 ).
- p.4｜Additionally, Promersion also provided its view of the market share by different cooling technologies, up to 2030 ( Exhibit 18 ), implying cold plate technology will still be the mainstream in the market, which should be a tailwind to cold plate suppliers such as AVC and Auras.
- p.5｜In the photonics session, Meta unveiled the results of its latest research on co-packaged optics (CPO), which shows that the Tomahawk 5 Bailly 51.2T CPO switch witnessed a annual link failure rate (ALFR) of 0.34% and mean time between failures (MTBF) of 2.6mn hours in the first 15mn device hours of testing, representing better reliability over a comparable pluggable configuration at an ALFR of 1.58% and MTBF of 0.55mn hours.

## Q2 · **他和我差在哪一项、哪一年**？差多少？

**这一问在本件答不成"差多少"**，原因有两层，都要写明：

1. **他没有预测值可对差**。本件无收入 / 毛利 / EPS 预测，我方模型也无从对齐——本材料不含我方任何数值。
2. **没有共识分母**。本批只此一份行业件，无同标的的第二组预测，按手册 §4.6 的判法，跨机构对照、对指引对照、对历史误差带三条**都打不出来**，只能记"**无可比分母，本项判不了**"，并把唯一一侧的数与日期并列：他的版本日期 2025-10-20，值见 Q1 十条时间表。

能做的对照是**时间表假设 vs 我方未定的时点**，差异不在"多少"，在"哪一年"：

- **2H26**：他说 Helios 机架 2026 下半年开始出货，且主要 ODM 是 Wiwynn、GPU 模块 / 基板 / 交换托盘子组件主供是 Wistron——这是我方 2026 年 AI 机架收入能否兑现的分水岭。
- **2026Q3 末**：VR200 整机柜交付，且他点出计算托盘的中板 PCB 可能成为瓶颈。若我方模型把 VR200 放 2027，收入会整体后移一年。
- **2H2027**：800 VDC 绑 Rubin Ultra 首发。这是我方"单瓦价值翻倍以上"假设的起算年，早一年或晚一年，对电源链公司的 2027 年弹性差别很大。
- **2028 / 2030**：浸没式拐点 2028、冷板主流至 2030——浸没式与冷板两条路线的份额切换年，决定 AVC / Auras 类标的的长坡长度。

我方对应项**均未定**，按纪律记缺口，不倒推我方值。要把这三组时点变成"差多少"，需跨批（交主控）拿到我方算力 / 机架 / 电源链模型。

### 依据

- p.3｜These Helios racks should start to ship from 2H26, and we believe key customers include Meta, Oracle (press release), and OpenAI, among others.
- p.3｜Based on our supply chain checks, Sanmina (SANM.O, not covered) should be the NPI (New Product Introduction) partner for AMD, but Wiwynn should be the main ODM partner for Meta (report link).
- p.3｜At the component level, we believe Wistron is the main ODM partner for the GPU mobule, baseboard, as well as the switch tray, which should be positive for the stock, and we believe most PCBs will require M9 grade CCL.
- p.3｜For VR200, the midplane PCB in the compute tray may be a constraint now, but we still have some time before rack delivery is expected, which should be late 3Q26.
- p.4｜We expect this to raise power offering value per watt more than double that of the current design, as we highlighted in our data center power and cooling face-off report.
- p.5｜both Accton and Celestica showcased its their latest 1.6T network switch offerings based on Broadcom's (covered by Joseph Moore) Tomahawk 6 ASIC, which we think might start to see early adoption in late 2026 or early 2027.

## Q3 · 他的**财年是谁的财年**？

**本件没有估计表，因此不存在"他的财年"这回事**——不是"未标明"，是**无表可标**。

文内所有时间锚都是日历年口径的季度或半年：`2H26`、`late 3Q26`、`2H2027`、`2028`、`up to 2030`，没有一处写 `FY25E / FY26E` 这类财年标号，也没有列头。故可安全按**日历年**读，且不存在公司财年与日历年错位。

两处日期需要分清（易混）：

- **发布时刻**：封面写 `October 20, 2025 09:00 PM GMT`，即美东 / 伦敦收盘后，对应亚洲 10 月 21 日早间，文件名日期 2025-10-21 由此而来；材料日期字段与封面日期差一天不是笔误。
- **会期**：10 月 13–16 日，圣何塞。发布距会期结束 4 天。

### 依据

- p.1｜October 20, 2025 09:00 PM GMT
- p.1｜The Open Compute Project (OCP) Global Summit was hosted in San Jose, US on October 13-16.
- p.3｜These Helios racks should start to ship from 2H26, and we believe key customers include Meta, Oracle (press release), and OpenAI, among others.
- p.3｜For VR200, the midplane PCB in the compute tray may be a constraint now, but we still have some time before rack delivery is expected, which should be late 3Q26.
- p.4｜800 VDC power distribution and protection include 800 VDC eFuse, 90kW DC-DC power shelf and power capacitance shelf and 12kW power distribution board. ( Exhibit 22 )
- p.4｜Additionally, Promersion also provided its view of the market share by different cooling technologies, up to 2030 ( Exhibit 18 )

## Q4 · **预测修正**：改了哪一项、从多少改到多少？改的是**假设**还是**结论**？

**本件没有修正表，也没有任何 old→new 的句子**。它是对 OCP 展会的现场读稿（"Our major takeaways follow"），性质上不是对既有预测的修订，故"从多少改到多少"没有答案——**旧值 = 新值不适用，因为两侧都没有值**。

分层判定：

- **结论层**：行业观点维持 In-Line，无升降级动作可记。
- **假设层**：无任何假设被上修或下修；三条时间表（Helios 2H26、VR200 3Q26 末、800VDC 2H2027）与他在 OCP 第一天笔记里的口径一致，属**重申**而非修正。
- **唯一可算"语气变化"的地方**：对 AEC 明确写 "We remain constructive"，属维持判断，不是上调。

跨期比较（例如与他在同一议题上的下一篇）需**跨批（交主控）**，本批只有这一份行业件，无法在本份内闭合。

### 依据

- p.1｜Our major takeaways follow.
- p.5｜We remain constructive on the growth opportunities for AEC (active electrical cable) in the coming years as cost effective and reliable solutions compared to its optical counterparts. We expect Bizlink to continue benefiting from this trend.
- p.4｜As we noted on OCP Day one, 800 VDC allows >150% more power transmitted through the same copper without additional 200-kg copper busbars feeding a single server rack.

## Q5 · 他给了**情景**吗？各自驱动假设是什么？

**无情景**。没有 Bull / Base / Bear 三档，没有三档目标价（本件没有目标价），只有行业观点 In-Line 一个档位，时间跨度 12–18 个月。按手册记"**无情景**"。

他给的是**条件依赖**，两条，都是一句话的方向判断而不是分情形测算：

1. **铜 → 光解耦**：近期峰值机架功率密度还会上升，但最终会下降，因为行业能用光把规模化域拆开。这条决定"更大的机架"是过渡形态还是终局——若成立，21 寸 ORW 的寿命比市场预期短。
2. **散热路线切换**：浸没式 2028 年见拐点，冷板到 2030 年仍是主流。两条路线份额交接年定在 2028。

差别的杠杆在哪：他的判断都压在**物理约束（铜的传输极限）与热密度**上，不在价格或倍数上；由于没有目标价，情景即使存在也无法折算成涨跌幅，这也是本件不能当个股情景用的原因。

### 依据

- p.3｜However, Meta believes the future has to be disaggregation, so while in the near-term the peak rack power density will continue to increase, it will eventually decline, because the industry will be able to disaggregate using optics ( Exhibit 8 ).
- p.4｜Promersion presented at OCP, and according to it, immersion cooling, which took a dip in market value this year, will see inflection in 2028 ( Exhibit 19 ).
- p.16｜In-Line (I): The analyst expects the performance of his or her industry coverage universe over the next 12-18 months to be in line with the relevant broad market benchmark, as indicated below.

## Q6 · 他用了哪几种**估值方法**？**能互相印证吗**？

**未给估值方法，也无从互证。** 本件是行业主题件，评级体系用的是**相对行业基准的配置观点**（In-Line：未来 12–18 个月行业覆盖池表现与相关宽基基准持平），不是倍数或折现模型；文内没有 P/E、EV/EBITDA、DCF、SOTP 任何一项，也没有目标价。

更关键的是，报告**明示方法不在文内**：估值方法与风险需向 Client Support Team 索取。也就是说，即便想知道他用什么尺子，这份文件也给不了，属**载体层面的缺口**，不是"只给一种方法"。

可确认的只有评级定义与时间跨度：四档（Overweight / Equal-weight / Not-Rated / Underweight），均为相对行业覆盖池的风险调整后总回报，12–18 个月；价格目标若无特别说明也是 12–18 个月。

### 依据

- p.15｜For valuation methodology and risks associated with any recommendation, rating or price target referenced in this research report, please contact the Client Support Team as follows
- p.16｜Overweight (O). The stock's total return is expected to exceed the average total return of the analyst's industry (or industry team's) coverage universe, on a risk-adjusted basis, over the next 12-18 months.
- p.16｜In-Line (I): The analyst expects the performance of his or her industry coverage universe over the next 12-18 months to be in line with the relevant broad market benchmark, as indicated below.
- p.16｜Unless otherwise specified, the time frame for price targets included in Morgan Stanley Research is 12 to 18 months.

## Q7 · 目标价的**依据 / 估值方法解释 / 风险列示**齐不齐？

三件逐条，结论是**缺两件**：

1. **目标价由哪个方法算出**：**无对象**。本件不给个股目标价，只有行业观点 In-Line，故 2241(c)(1) 意义上"目标价依据"无从查起——不等于合规，只是该项无标的。
2. **方法的关键输入**：**未见**。全文无倍数、无折现率、无永续增长率；估值方法被外指到客服电话与披露网站。
3. **可能阻碍达成目标价的风险列示**：**未见**。全文没有 Risk 节，风险句散落在正文（机械件复杂度、运输重量、可维护性、CPO 可靠性与成本），未成节、未列示、也未与任何目标挂钩。

判定：**形式三件中两件未见**，按手册"形式要件缺失"处理，**上报（可信度降级）**；但因本件未给目标价，不宜写成"目标价无依据"，准确说法是"**无目标价、亦无方法与风险列示**"。

### 依据

- p.15｜For valuation methodology and risks associated with any recommendation, rating or price target referenced in this research report, please contact the Client Support Team as follows
- p.15｜For important disclosures, stock price charts and equity rating histories regarding companies that are the subject of this report, please see the Morgan Stanley Research Disclosure Website at www.morganstanley.com/researchdisclosures
- p.1｜Greater China Technology Hardware
- p.1｜Asia Pacific Industry View In-Line

## Q8 · **评级分布三件**（三档占比 · 投行关系占比 · 观测时点）齐不齐？

**三件齐**，但档位是**四档**而非三档（含 Not-Rated），照原表登记，不合并：

| 评级档（监管对应） | 覆盖家数 | 占比 | 投行客户数 | 占投行客户比 | 占本档比 |
|---|---|---|---|---|---|
| Overweight / Buy | 1,499 | 41% | 389 | 46% | 26% |
| Equal-weight / Hold | 1,618 | 44% | 375 | 44% | 23% |
| Not-Rated / Hold | 4 | 0% | 1 | 0% | 25% |
| Underweight / Sell | 577 | 16% | 88 | 10% | 15% |
| 合计 | 3,698 | — | 853 | — | — |

- **三档（四档）占比**：41 / 44 / 0 / 16，合计约 100%（原表注明四舍五入可能不等于 100%）。
- **投行关系占比**：取"占本档比"一列，26% / 23% / 25% / 15%；投行客户定义为过去 12 个月从摩根士丹利获得投行报酬的公司。
- **观测时点**：2025 年 9 月 30 日。发布日 2025-10-20，距季末 20 天，**超过 15 天**，用最近一个已结束季末，合规。

一处要点：**Not-Rated 档只有 4 家**，其 25% 的投行关系占比是 1/4，基数极小，不能当趋势读；本件所属行业观点为 In-Line，与"买入占比高"无关。

### 依据

- p.16｜Global Stock Ratings Distribution (as of September 30, 2025)
- p.16｜<tr><td>Overweight/Buy</td><td>1499</td><td>41%</td><td>389</td><td>46%</td><td>26%</td><td>702</td><td>41%</td></tr>
- p.16｜<tr><td>Equal-weight/Hold</td><td>1618</td><td>44%</td><td>375</td><td>44%</td><td>23%</td><td>782</td><td>45%</td></tr>
- p.16｜<tr><td>Not-Rated/Hold</td><td>4</td><td>0%</td><td>1</td><td>0%</td><td>25%</td><td>1</td><td>0%</td></tr>
- p.16｜<tr><td>Underweight/Sell</td><td>577</td><td>16%</td><td>88</td><td>10%</td><td>15%</td><td>234</td><td>14%</td></tr>
- p.16｜<tr><td>Total</td><td>3,698</td><td></td><td>853</td><td></td><td></td><td>1719</td><td></td></tr>
- p.16｜Investment Banking Clients are companies from whom Morgan Stanley received investment banking compensation in the last 12 months.

## Q9 · **评级 / 目标价历史走势图**在不在（含赋改日期）？

**未见走势图**，仅有替代物，判形式瑕疵。

- 报告正文只写"股价图与评级历史见披露网站"，把图**外指**出去，PDF 内无一张带收盘价折线与赋改日期的图。
- 报告末尾有一张 **INDUSTRY COVERAGE** 表：列为"公司（代码）/ 评级（As Of）/ 价格（2025-10-20）"。它是**时点快照**，不是覆盖≥1 年的走势，也不标每次赋改日期，不能当 2241(c)(3) 的图用。
- 更根本的一点：**META 不在该覆盖表内**。本件署名分析师覆盖大中华科技硬件，META 由 Brian Nowak 覆盖，故本标的在本件根本不存在"评级 / 目标价历史"可附。

因此三项要素（覆盖期间、变动条数、最近一次赋改日）均无法给出；若下游要 META 的评级历史，须去其覆盖分析师的报告，不在本件。

### 依据

- p.15｜For important disclosures, stock price charts and equity rating histories regarding companies that are the subject of this report, please see the Morgan Stanley Research Disclosure Website at www.morganstanley.com/researchdisclosures
- p.18｜INDUSTRY COVERAGE: Greater China Technology Hardware
- p.18｜<tr><td>Company (Ticker)</td><td>Rating (As Of)</td><td>Price* (10/20/2025)</td></tr>
- p.2｜In Meta's (covered by Brian Nowak) keynote speech, Vice President, Dan Rabinovitsj, mentioned that Meta has been scaling up its GPU clusters over the past few years, from 128 GPUs to 12

## Q10 · **九项冲突披露**在不在**首页**（或指明页码）？

首页只有一句总括（"does and seeks to do business…"，置于封面下方的冲突提示），**未逐项披露**，但**指了页码**（指向文末 Disclosure Section），符合"或指明页码"的形式要求。逐项内容集中在披露节。

判读的关键前提：**本件所有名单都是"大中华科技硬件覆盖池"名单**，而 META 不在其中任何一份。所以本标的层面，多数项只能是"名单不含本标的"这种**有信息量的未见**，而不是"机构没披露"。

| 项 | 有 / 无 | 位置与内容 |
|---|---|---|
| ① 分析师及家庭持仓 | 未见（本标的） | 披露节唯一涉及分析师家庭的句子是"某作者的家庭成员担任 Visual Photonics Epitaxy（2455.TW）公司董事的代表"，标的是 VPE、性质是董事席位，**不是持仓、也不是本标的**；全文无"分析师持有 META 证券"句。 |
| ② 报酬是否挂钩投行收入 | 有（双向表述） | 原文两段：报酬基于研究质量、客户反馈、选股、竞争因素、**公司收入与整体投行收入**；同时明确"不与投行或资本市场交易挂钩，也不与特定交易台盈亏挂钩"。四要素齐：主体=全体股票研究分析师；口径=挂钩公司整体收入、不挂钩特定交易；时点=当前政策。 |
| ③ 近 12 个月主/副承销或收取投行报酬 | 有披露，**不含本标的** | 承销名单只有 **Zhen Ding** 一家；投行报酬名单同样只有 Zhen Ding。META 不在，判本标的未见。 |
| ④ 未来 3 个月是否寻求投行费 | 有长名单，**不含本标的** | 名单为亚太硬件 38 家（AAC、Accton、Acer、Advantech、AVC、Asustek、AUO、Bizlink、BYD Electronics…Zhen Ding、Zhongji Innolight），**无 META**。 |
| ⑤ 近 12 个月非投行服务报酬 | 有名单，**不含本标的** | 名单 17 家（AAC、Accton、Acer、Asustek、AUO、BYD Electronics、Compal、Eoptolink、Foxconn Technology、Giga-Byte、GoerTek、Hon Hai、Innolux、Lenovo、Quanta、Xiaomi、Yageo），**无 META**。 |
| ⑥ 是否客户及服务类型 | 有投行客户名单，**不含本标的** | "已提供或正在提供投行服务、或存在投行客户关系"的名单为亚太硬件 37 家，**无 META**；另有独立的非投行证券类服务 / 客户关系名单（17 家），亦无 META。 |
| ⑦ 实益持有该类普通股 ≥1% | 有声明，**不含本标的** | 截至 **2025-09-30**，持股 ≥1% 的名单 32 家，全为亚太硬件（AAC、Accton、AirTAC、AVC、AUO、Auras、Bizlink…Wistron、Wiwynn、Yageo、Zhen Ding、Zhongji Innolight），**无 META**。日期、证券类别（common equity）、门槛三要素齐。 |
| ⑧ 是否做市 | **部分披露** | 具体名单只有港股一档：摩根士丹利香港证券为 AAC、BYD Electronics、Lenovo、Sunny Optical、Xiaomi、ZTE 提供流动性 / 做市，**不含 META**；另有一句通用声明称集团业务"包括做市、提供流动性…"，未点名标的，不能当本项确认。 |
| ⑨ 分析师过去 12 个月是否从标的收酬 | 未见 | 只有分析师认证段的否认句（未因表达特定建议而收取直接或间接报酬），该句约束的是"为观点收费"，**不是"从标的公司收酬"**；全文无 from the subject company 类表述。 |
| ⑩ 其他重大冲突 | 有 | 三项：其一，集团与覆盖公司"做业务并寻求做业务"，可能影响客观性（首页已提示）；其二，以本金与客户买卖所覆盖证券，并可持有标的债务；其三，1% 持股名单中的多家公司属本件行业覆盖池，行业层面存在持仓利益（不含 META）。 |

**红旗**：形式要件缺（无目标价、无估值方法、无风险列示、无评级历史图）＋ 通用做市声明未点名 ⇒ 引用其行业判断时按"观点"折价，不作事实层。相对干净的一面是：META 在持股、承销、投行报酬、非投行报酬、客户关系五份名单中**全部不在列**。

### 依据

- p.1｜Morgan Stanley does and seeks to do business with companies covered in Morgan Stanley Research. As a result, investors should be aware that the firm may have a conflict of interest that could affect the objectivity of Morgan Stanley Research.
- p.18｜A family member of one of the authors of this research report serves as a representative of a corporate director of Visual Photonics Epitaxy Co Ltd (2455.TW).
- p.15｜The equity research analysts or strategists principally responsible for the preparation of Morgan Stanley Research have received compensation based upon various factors, including quality of research, investor client feedback, stock picking, competitive factors, firm revenues and overall investment banking revenues.
- p.15｜Equity Research analysts' or strategists' compensation is not linked to investment banking or capital markets transactions performed by Morgan Stanley or the profitability or revenues of particular trading desks.
- p.15｜Within the last 12 months, Morgan Stanley managed or co-managed a public offering (or 144A offering) of securities of Zhen Ding.
- p.15｜Within the last 12 months, Morgan Stanley has received compensation for investment banking services from Zhen Ding.
- p.15｜In the next 3 months, Morgan Stanley expects to receive or intends to seek compensation for investment banking services from AAC Technologies Holdings, Accton Technology Corporation, Acer Inc., Advantech, Asia Vital Components Co. Ltd., Asustek Computer Inc., AU Optronics, Bizlink, BYD Electronics, Catcher Technology, Chenbro, Compal Electronics, Delta Electronics Inc., E Ink Holdings Inc., Ennostar Inc, Eoptolink Technology Inc Ltd, Foxconn Industrial Internet Co. Ltd., Giga-Byte Technology Co. Ltd., Gold Circuit Electronics Ltd., Hon Hai Precision, Innolux, Lenovo, Lens Technology, Lite-On Technology, Luxshare Precision Industry Co., Ltd., Pegatron Corporation, Q Technology (Group) Company Ltd, Quanta Computer Inc., Sanan Optoelectronics, Shangha Conant Optical Co Ltd, Shenzhen Transsion Holdings Co Ltd, TCL Corp., Unimicron, Wistron Corporation, Wiwynn Corp, Xiaomi Corp, Yageo Corp., Zhen Ding, Zhongji Innolight Co Ltd.
- p.15｜Within the last 12 months, Morgan Stanley has either provided or is providing non-investment banking, securities-related services to and/or in the past has entered into an agreement to provide services or has a client relationship with the following company: AAC Technologies Holdings, Accton Technology Corporation, Acer Inc., Asustek Computer Inc., AU Optronics, BYD Electronics, Compal Electronics, Eoptolink Technology Inc Ltd, Foxconn Technology, Giga-Byte Technology Co. Ltd., GoerTek Inc, Hon Hai Precision, Innolux, Lenovo, Quanta Computer Inc., Xiaomi Corp, Yageo Corp., Zhen Ding.
- p.15｜Within the last 12 months, Morgan Stanley has provided or is providing investment banking services to, or has an investment banking client relationship with, the following company: AAC Technologies Holdings, Accton Technology Corporation, Acer Inc., Advantech, Asia Vital Components Co. Ltd., Asustek Computer Inc., AU Optronics, Bizlink, BYD Electronics, Catcher Technology, Chenbro, Compal Electronics, Delta Electronics Inc., E Ink Holdings Inc., Ennostar Inc, Eoptolink Technology Inc Ltd, Foxconn Industrial Internet Co. Ltd., Giga-Byte Technology Co. Ltd., Gold Circuit Electronics Ltd., Hon Hai Precision, Innolux, Lenovo, Lens Technology, Lite-On Technology, Luxshare Precision Industry Co., Ltd., Pegatron Corporation, Q Technology (Group) Company Ltd, Quanta Computer Inc., Sanan Optoelectronics, Shanghai Conant Optical Co Ltd, Shenzhen Transsion Holdings Co Ltd, TCL Corp., Unimicron, Wistron Corporation, Wiwynn Corp, Xiaomi Corp, Yageo Corp., Zhen Ding, Zhongji Innolight Co Ltd.
- p.15｜Within the last 12 months, Morgan Stanley has received compensation for products and services other than investment banking services from AAC Technologies Holdings, Accton Technology Corporation, Acer Inc., Asustek Computer Inc., AU Optronics, BYD Electronics, Compal Electronics, Eoptolink Technology Inc Ltd, Foxconn Technology, Giga-Byte Technology Co. Ltd., GoerTek Inc, Hon Hai Precision, Innolux, Lenovo, Quanta Computer Inc., Xiaomi Corp, Yageo Corp..
- p.15｜As of September 30, 2025, Morgan Stanley beneficially owned 1% or more of a class of common equity securities of the following companies covered in Morgan Stanley Research: AAC Technologies Holdings, Accton Technology Corporation, AirTAC International, Asia Vital Components Co. Ltd., AU Optronics, Auras Technology Co Ltd, Bizlink, BYD Electronics, Chenbro, Chroma Ate Inc., Compal Electronics, Delta Electronics Inc., Eoptolink Technology Inc Ltd, Fositek Corp, Genius Electronic Optical Co. Ltd., Giga-Byte Technology Co. Ltd., GoerTek Inc, Gold Circuit Electronics Ltd., Hiwin Technologies Corp., Innolux, King Slide Works Co. Ltd., Nan Ya PCB, Sunonwealth Electric Machine Industry Co, TCL Corp., Tong Hsing, Unimicron, Visual Photonics Epitaxy Co Ltd, Wistron Corporation, Wiwynn Corp, Yageo Corp., Zhen Ding, Zhongji Innolight Co Ltd.
- p.18｜Morgan Stanley Hong Kong Securities Limited is the liquidity provider/market maker for securities of AAC Technologies Holdings, BYD Electronics, Lenovo, Sunny Optical, Xiaomi Corp, ZTE Corporation listed on the Stock Exchange of Hong Kong Limited.
- p.15｜Morgan Stanley and its affiliates do business that relates to companies/instruments covered in Morgan Stanley Research, including market making, providing liquidity, fund management, commercial banking, extension of credit, investment services and investment banking.
- p.15｜The following analysts hereby certify that their views about the companies and their securities discussed in this report are accurately expressed and that they have not received and will not receive direct or indirect compensation in exchange for expressing specific recommendations or views in this report: Howard Kao; Sharon Shih; Derrick Yang.

## Q11 · 他的**风险章**挂了数字吗？

**没有风险章，也没有一条能写成"若 X 变则 Y%"。** 全文无 Risk / Risks 节，风险以**方向句**散落在正文：

- 更大机架的三个挑战：设计与制造复杂度上升、昂贵且运输沉重、可维护性变差；
- CPO：可靠性初测好看但还需更多现场测试，可维护性与成本是普及关键；
- ESUN：可靠性、可维护性、成本仍是关键。

以上无一条附百分点、金额、EPS 或目标价影响，按手册归"**样板风险**"（不是缺口）；但"**整节缺失**"本身是结构缺口，须与 Q7 的形式缺失一并上报。

唯一带数字的两处是**工程参数**，不是财务敏感度：GB300 托盘 85% 液冷 / 15% 风冷；每交付 10 MW 机房需配套 1 MW 测试产能。这两条能改写为运营约束（"若测试产能不足，交付节奏后移"），但**推不出 EPS 变动幅度**，因此不能当风险量化使用。

若要做敏感度，只能自己按 Q1 的时间表建：例如 800VDC 若从 2H2027 推迟一年，受影响的是 2027 年电源链公司的单瓦价值翻倍；本件未给该测算。

### 依据

- p.2｜However, there are challenges to building these bigger racks, including: 1) the increased complexity to design and manufacture; 2) they are expensive and heavy to transport; 3) operational challenges, because the serviceability of these bigger racks is more difficult ( Exhibit 7 ).
- p.5｜This initial result looks inspiring, though more field testing might be needed for more solid conclusion; meanwhile, serviceability and cost are also key factors for wide CPO adoption in the future.
- p.1｜Ethernet for Scale-Up Networking (ESUN) and CPO switches have been introduced to optimize AI data networking but reliability, serviceability and cost remain key
- p.3｜From a thermal perspective, the GB300 compute trays that are in mass production today are not fully liquid.
- p.2｜especially since every 10MW of capacity that it delivers in a datacenter, its partners would need to build 1MW of capacity just for testing ( Exhibit 10 ).

## Q12 · 这份报告落在**静默期窗口**内吗？

**否，不落窗。** 判定链：

- **发布时刻**：2025-10-20 21:00 GMT（封面）。文件日期 2025-10-21 为亚洲时区落地日。
- **本件性质**：行业展会读稿（OCP 2025 现场），不涉及任何证券发行；全文无 IPO、无二次发行 / 增发、无承销团名单、无发行定价日。
- **唯一可查的承销记录**：过去 12 个月摩根士丹利仅主 / 副承销 **Zhen Ding** 一家，且 Zhen Ding 不是本件标的（META），其发行日也未在文内给出，故 10 天 / 3 天窗口**无从起算**。
- **时间上也不冲突**：会期 10 月 13–16 日，报告 10 月 20 日发布，间隔 4 天，即便有发行也不落在同一窗口内。

结论：不属静默期违规，也不属"重大新闻经合规授权"的例外情形——它就是一份常规行业读稿。

### 依据

- p.1｜October 20, 2025 09:00 PM GMT
- p.1｜The Open Compute Project (OCP) Global Summit was hosted in San Jose, US on October 13-16.
- p.15｜Within the last 12 months, Morgan Stanley managed or co-managed a public offering (or 144A offering) of securities of Zhen Ding.
- p.1｜Morgan Stanley Taiwan Limited+
