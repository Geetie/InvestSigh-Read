---
id: 03-broker-research-2026-09-02-8
cat: "03"
sub: broker-research
template: broker-research
template_version: 2
date: 2026-09-02
time: "00:00"
title: "03-broker-research-2026-09-02-8"
kind: "broker-research"
issuer: ""
ticker: META
source_pages: 16
---

> 骨架已生成，答案待填。原文：`corpus/materials/mineru/03-broker-research-2026-09-02-8/full.md`（16 页）。
> 填写纪律见 `docs/EVIDENCE-SPEC.md`：有答案必有依据块，块须逐字，页码 `p.N` 以源 PDF 为准。

## Q1 · 他的**关键假设取值**各是多少？

**产品型不符（本件是周度估值倍数追踪表，不含损益表）。** 六项关键假设在本件里**一项都没有**，但表内确有可用的估值与每股口径，照实写：

- **收入增速**：材料未给出此项——只有 EV/Rev 倍数（META 2026E 5.8x、2027E 4.7x），没有收入金额或增速。
- **毛利率**：材料未给出此项。
- **营业利润率**：材料未给出此项——只有 EV/EBITDA 倍数（META 2026E 7.2x、2027E 6.2x），EBITDA 本身未给。
- **资本开支**：材料未给出此项。
- **实际税率**：材料未给出此项。
- **摊薄股数**：材料未给出此项。

表内真有的东西（可替代引用，但不是假设表）：

- **每股口径**：META 2026E EPS 31.80、2027E 33.74（按其两列推算 2027E 增速 +6.1%）；P/E 18.2x / 17.1x。GOOGL 20.29 / 15.19，P/E 17.1x / 22.8x；AMZN 13.43 / 11.80，P/E 19.8x / 22.6x。
- **价格与市值**：价格取 2026 年 8 月 28 日收盘，META \$578.02、市值 \$1,483,199 百万、企业价值 \$1,476,603 百万。
- **口径警示**：GOOGL 与 AMZN 的 2027E EPS 低于 2026E 而其 P/E 反而上升，两列方向与常识相反，疑为 OCR 列序错位；本件 EPS 数值引用前须回原始 Excel 核对，不宜直接采信。

### 依据

- p.2｜META $578.02 1,483,199 1,476,603 5.8x 4.7x 7.2x 6.2x 10.1x 7.8x 0.2% NM 31.80 33.74 18.2x 17.1x 1.3%
- p.2｜GOOGL $346.59 4,266,176 3,990,406 8.0x 6.0x 13.3x 10.4x 16.9x 11.7x NM NM 20.29 15.19 17.1x 22.8x 1.3%
- p.2｜AMZN $266.43 2,904,886 2,910,792 3.5x 3.0x 6.7x 5.4x 13.0x 9.5x NM 1.3% 13.43 11.80 19.8x 22.6x 1.0%
- p.2｜Ticker 8/28/2026 ($ MM) ($ MM) 2026E 2027E 2026E 2027E 2026E 2027E 2026E 2027E 2026E 2027E 2026E 2027E

## Q2 · **他和我差在哪一项、哪一年**？差多少？

我方模型数值不在本份材料内，逐行"他 vs 我"的对照需跨批（交主控）。

本件没有共识表，也没有公司指引对照；材料内可核的对照是"**当下倍数 vs 他自己给的 2 年 / 3 年历史均值**"，差额集中在 2026 年的估值端、不在盈利端：

| 标的 | NTM EV/EBITDA（8/28/26） | 2 年均值 | 折溢价 | 3 年均值 | 折溢价 |
|---|---|---|---|---|---|
| AMZN | 11.5x | 12.8x | −10% | 13.0x | −12% |
| GOOGL | 15.1x | 14.1x | +7% | 13.5x | +12% |
| META | 9.1x | 12.3x | −26% | 12.0x | −24% |

另一条口径是 2026 年 EPS 的 P/E 相对自身 TTM 均值：AMZN/GOOGL/META 为 20x/17x/18x，分别低 33%/33%/20%。

差异的性质要看清：这不是"他 vs 共识"，而是"市价 vs 历史均值"——他给的是估值位置，不是盈利预测，所以"哪一年差多少"只能落到 2026 年这一列的倍数上，2027 年只有倍数、没有可比均值。

### 依据

- p.5｜As of 8/28/26 11.5x 15.1x 9.1x
- p.5｜2-Year Average 12.8x 14.1x 12.3x
- p.5｜Premium/Discount vs. 2-Year Average -10% 7% -26%
- p.5｜Premium/Discount vs. 3-Year Average -12% 12% -24%
- p.1｜AMZN/GOOGL/META 20X/17X/18X '26 EPS (-33%/-33%/-20% vs TTM avg).

## Q3 · 他的**财年是谁的财年**？

是**公司财年、推定等于日历年**：全部列头只写 2026E / 2027E，不标月末；价格列的日期写明 8/28/2026，报告发布 2026 年 9 月 1 日，故 2026E 即 2026 日历年、2027E 即 2027 日历年，可与日历年末共识直接比。

- 覆盖的 GOOGL、AMZN、META 都是 12 月结账，不存在财年错位；但材料未写"FYE December"，属推定。
- 需要留意的是**价格时点与财年不是一回事**：倍数用 2026 年 8 月 28 日收盘价除以 2026E / 2027E 的每股或 EBITDA，属"当年财年倍数"（本财年口径），不是 NTM 滚动口径；而同一份里的 NTM EV/EBITDA 图又用滚动十二个月——两处口径不同，不可混用。

### 依据

- p.2｜Ticker 8/28/2026 ($ MM) ($ MM) 2026E 2027E 2026E 2027E 2026E 2027E 2026E 2027E 2026E 2027E 2026E 2027E
- p.1｜September 1, 2026 02:00 PM GMT
- p.5｜Exhibit 4: NTM EV/EBITDA for AMZN/GOOGL/META vs. Historical Averages

## Q4 · **预测修正**：改了哪一项、从多少改到多少？改的是**假设**还是**结论**？

无预测修正可记：本件是周度市场追踪，全文没有 old/new 估计对照、没有"上调/下调"句式，也没有上一版可比。

唯一"变了"的是价格与倍数——标题句给的是上周涨跌幅（互联网板块 +2%，标普 +1%、纳指 +0%，META/AMZN +5%/+3%，GOOGL +1%），这是**市价变化**，不是估计变化；倍数随价格动，也不能读成"他改了假设"。

另需注意：本件不含评级与目标价，所以连"结论变没变"这一层都不适用——它输出的是估值位置，不是观点。

### 依据

- p.1｜Internet names frose +2% (SPX/NDX +1/+0%) led by META/AMZN +5/+3%, while GOOGL +1%.
- p.1｜AMZN/GOOGL/META 20X/17X/18X '26 EPS (-33%/-33%/-20% vs TTM avg).

## Q5 · 他给了**情景**吗？各自驱动假设是什么？

**产品型不符**：本件没有 Bull/Base/Bear，也没有目标价，因此没有"三档 PT 与触发假设"可记。

它提供的是另一种分层——按行业簇（数字媒体、电商、共享经济、游戏、旅游、地产科技）横向排倍数，并给每簇中位数；再用两张图把"当期倍数"与 5 年 / 10 年历史均值并列。这属于横截面比较，不是情景分析。

真要找方向性判断，只有一句：META 相对自身 2 年均值折 26%、GOOGL 溢价 7%，即他认为市场对两者的定价位置不同——但这是描述，不是情景。

### 依据

- p.2｜Digital Media Med. 7,384 6,070 3.1x 2.8x 4.0x 3.6x 9.9x 7.8x 8.9% 9.5% $1.56 $2.43 17.1x 16.3x 9.2%
- p.7｜Exhibit 7: … and NTM EV/Sales Multiples Are +18%/+20% vs. 5/10-Year Averages
- p.5｜Premium/Discount vs. 2-Year Average -10% 7% -26%

## Q6 · 他用了哪几种**估值方法**？**能互相印证吗**？

**产品型不符（无个股目标价、无 DCF）**，但本件有一套明确的倍数比较法，且给了两个口径，可以互相对照：

- **方法一：NTM EV/EBITDA 与自身 2 年 / 3 年历史均值比**。当期 AMZN 11.5x、GOOGL 15.1x、META 9.1x；对应的 2 年均值 12.8x / 14.1x / 12.3x，折溢价 −10% / +7% / −26%。
- **方法二：NTM EV/Sales 与 5 年 / 10 年历史均值比**。整体倍数 4.9x，对 5 年均值 4.2x、10 年均值 4.1x，分别高 18% / 20%。
- **口径调整（本件最有价值的一点）**：把股权激励当现金费用加回后重算 EV/EBITDA，数字媒体中位数升约 36%（SNAP 除外）、电商升约 30%、视频游戏升约 15%；GOOGL 升 9%、META 升 13%。

**能否互相印证**：两个方法都指向"META 相对自身历史便宜、GOOGL 相对自身历史贵"，方向一致，可算互证；但两者都不是目标价方法，得不出"应该值多少"，只能得出"现在处于历史什么位置"。

### 依据

- p.5｜As of 8/28/26 11.5x 15.1x 9.1x
- p.7｜Last 5-Year Average: 4.2x
- p.7｜Exhibit 8: Digital Media: Treating SBC as Cash Increases EV/EBITDA Multiples by ~36%, on Average
- p.8｜Median ∆: +30% Source: FactSet, Company data, Morgan Stanley Research estimates
- p.7｜Median ∆ (Excl. SNAP): +36%

## Q7 · 目标价的**依据 / 估值方法解释 / 风险列示**齐不齐？

三件全无，但属**产品型不符**，不按个股报告的合规口径判：

1. **目标价由哪个方法算出**：无。本件不设目标价，16 页里没有任何 PT 数字。
2. **方法的关键输入**：无。披露段直接把估值方法与风险外推——"如需任何建议、评级或目标价对应的估值方法与风险，请联系客户支持团队"，即正文不承载。
3. **可能阻碍达成目标价的风险列示**：无独立风险章；只有一句机构级声明"摩根士丹利可能不时持有标的公司的重要财务与商业利益"。

判断：三件都缺；对一份周度倍数追踪表而言这是正常形态（它不输出观点），但若被当作个股评级报告引用，则属形式不合规，需向上游提示。

### 依据

- p.12｜For valuation methodology and risks associated with any recommendation, rating or price target referenced in this research report, please contact the Client Support Team
- p.12｜For important disclosures, stock price charts and equity rating histories regarding companies that are the subject of this report, please see the Morgan Stanley Research Disclosure Website
- p.15｜Morgan Stanley may hold, from time to time, material financial and commercial interests regarding the company subject to the Research report.

## Q8 · **评级分布三件**（三档占比 · 投行关系占比 · 观测时点）齐不齐？

三件里只有观测时点可取，两张占比表的数值在文本层缺失。

- **三档占比**：未见数值。披露段有"Global Stock Ratings Distribution (as of July 31, 2026)"一句标题，并写明把 Overweight / Equal-weight / Not-Rated / Underweight 对应到 Buy / Hold / Sell 的监管口径，但表体只剩两个列头"Coverage Universe"与"Investment Banking Clients (IBC)"，**没有任何百分比或家数**——该表在文本层是图，取不到数。
- **投行关系占比**：同上，IBC 列头在、数值不在。
- **观测时点**：有，明确为 2026 年 7 月 31 日，且写明该表只适用于股票研究、不适用于债券研究。

另可确认评级体系本身：该行不对股票给 Buy/Hold/Sell，只给相对权重评级，监管口径下才做映射。

### 依据

- p.13｜Global Stock Ratings Distribution
- p.13｜(as of July 31, 2026) The Stock Ratings described below apply to Morgan Stanley's Fundamental Equity Research
- p.13｜Coverage Universe Investment Banking Clients (IBC)
- p.13｜Morgan Stanley does not assign ratings of Buy, Hold or Sell to the stocks we cover.

## Q9 · **评级 / 目标价历史走势图**在不在（含赋改日期）？

**声明有、正文无图；但有一张可读出"评级生效日"的覆盖清单，属半有。**

- **走势图**：披露段只给入口——"股价图与评级历史见摩根士丹利研究披露网站"，正文无图、无时间序列、无目标价历史。
- **评级生效日清单**：末尾"INDUSTRY COVERAGE: Internet"表按分析师分组列出每只股票的当前评级与生效日期，例如 GOOGL 为 O（2015 年 8 月 11 日）、AMZN 为 O（2015 年 4 月 24 日）、BKNG 为 O（2026 年 2 月 23 日）；价格统一取 8/28/2026。
- **本标的的缺口**：META 一行在页边界被截断，只剩"Meta Platforms Inc (META.O)"，评级、生效日、价格三项都读不到——这是文本层损坏，不能猜。
- **变动条数**：无从统计（清单只给当前评级与生效日，不给历次变动记录）。

### 依据

- p.12｜For important disclosures, stock price charts and equity rating histories regarding companies that are the subject of this report, please see the Morgan Stanley Research Disclosure Website
- p.15｜Company (Ticker) Rating (As Of) Price* (08/28/2026)
- p.15｜Alphabet Inc. (GOOGL.O) O (08/11/2015) $346.59
- p.15｜Meta Platforms Inc (META.O)
- p.16｜Stock Ratings are subject to change. Please see latest research for each company.

## Q10 · **九项冲突披露**在不在**首页**（或指明页码）？

首页只有一句样板句把披露指向文末披露段（"For analyst certification and other important disclosures, refer to the Disclosure Section, located at the end of this report."），没有把九项逐条写在首页。本件披露段采用"逐项一句话 + 点名公司清单"的结构，因此能判到条目级，但清单在页边界被截断。

| 项 | 有/无 | 位置与内容 |
|---|---|---|
| ① 分析师及家庭持仓 | 有 | 披露段"Important Regulatory Disclosures on Subject Companies"明确列出：研究助理 Gregory Gao（或其家庭成员）持有 Alphabet、Amazon、**Meta Platforms**、Reddit、Uber 的普通股或优先股（含相关衍生品）。四要素齐：谁（具名研究助理）、什么（普通/优先股及衍生品）、原文句式"owns the following securities (or related derivatives)"、时点未写（该段不附日期）——**含本标的，这是本件最硬的冲突项**。 |
| ② 报酬是否挂钩投行收入 | 未见（只有固收口径） | 披露段唯一的报酬句限定主体为"固定收益研究分析师、策略师或经济学家"，且方向是"不与投行或资本市场交易挂钩"；**股票分析师的报酬结构本件未写**。相近句主体不符（固收对股票），不能顶替本项。 |
| ③ 近 12 个月主/副承销或收取投行报酬 | 未见 | 披露段没有"过去 12 个月担任某次发行的承销商/管理人"或"收到投行服务报酬"的逐项清单；唯一接近的是对 Uber 的财务顾问身份（见第⑩项），那是并购顾问，不是证券承销，主体也不同。 |
| ④ 未来 3 个月是否寻求投行费 | 未见 | 全文无"未来三个月寻求投行报酬"句；机构级声明只说"does and seeks to do business with companies covered"，属模板，未指向具体标的，不能当本项确认。 |
| ⑤ 近 12 个月非投行服务报酬 | 未见 | 无"非投行证券相关服务报酬"句；最接近的是"可能持有重要财务与商业利益"这句泛化声明，无主体、无服务类型、无金额，不足以落四要素。 |
| ⑥ 是否客户及服务类型 | 未见 | 无"本标的为我们的客户"逐项句；披露段只给 IBC（投行客户）列头而无名单数值，无法指认哪个标的属哪类客户。 |
| ⑦ 实益持有该类普通股 ≥1% | 有（清单被截断） | "As of July 31, 2026, Morgan Stanley beneficially owned 1% or more of a class of common equity securities of the following companies covered in Morgan Stanley Research: Airbnb Inc, Alphabet…"——时点、比例、证券类别三要素齐，但**名单在"Alphabet"处被页边界截断**，Meta 是否在列无法从文本层确认；按披露惯例（第⑩项段落亦说明该节列全部 1% 以上持股）只能记为"存在该节、名单不全"。 |
| ⑧ 是否做市 | 未见 | 无"market maker"或"makes a market in"句；披露段与各地分发声明只讲分发主体与监管归属，不涉及做市。 |
| ⑨ 分析师过去 12 个月是否从标的收酬 | 未见 | 分析师认证段写的是"未因表达本报告的具体建议或观点而收取直接或间接报酬"，回答的是"观点报酬"，不等于"是否从标的公司取得报酬"；两者主体与对价均不同，故判未见。 |
| ⑩ 其他重大冲突 | 有 | 单列声明：该行正担任 Uber 收购 Delivery Hero 要约的财务顾问（2026 年 7 月 16 日宣布），Uber 已同意支付服务费；Uber 在本件 comp sheet 内（共享经济簇）。另有一句"可能不时持有标的公司的重要财务与商业利益"。 |

红旗提示：本标的 META 命中"分析师家庭实益持有本标的股票"；GOOGL 与 AMZN 同时命中该项与"公司层面实益持股 ≥1%"（清单含 Alphabet，Meta 因截断未定）⇒ 本件虽不评级、不给目标价，但其"哪只贵哪只便宜"的排序仍由同一批持仓分析师产出，引用估值位置时应打折。

### 依据

- p.1｜For analyst certification and other important disclosures, refer to the Disclosure Section, located at the end of this report.
- p.12｜The analyst or strategist (or a household member) identified below owns the following securities (or related derivatives): Gregory Gao - Alphabet Inc.(common or preferred stock), Amazon.com
- p.12｜As of July 31, 2026, Morgan Stanley beneficially owned 1% or more of a class of common equity securities of the following companies covered in Morgan Stanley Research: Airbnb Inc, Alphabet
- p.12｜have not received and will not receive direct or indirect compensation in exchange for expressing specific recommendations or views in this report
- p.14｜Fixed Income Research analysts', strategists' or economists' compensation is not linked to investment banking or capital markets transactions performed by Morgan Stanley
- p.11｜is acting as financial advisor to Uber Technologies, Inc. (“Uber”) in connection with the proposed takeover offer for Delivery Hero SE (“Delivery Hero”), as announced on July 16, 2026.
- p.11｜Uber has agreed to pay fees to Morgan Stanley for its services.
- p.15｜Morgan Stanley may hold, from time to time, material financial and commercial interests regarding the company subject to the Research report.

## Q11 · 他的**风险章**挂了数字吗？

**没有风险章，但倍数偏离度可以换算成价格敏感度，属"半个量化"。**

- **风险章**：无。本件是追踪表，不设风险段，也没有"若 X 变则 EPS/PT 变 Y%"的条目。
- **可换算的量化锚**：估值段给了当下倍数与 2 年 / 3 年历史均值——META 9.1x 对 2 年均值 12.3x（低 26%）、AMZN 11.5x 对 12.8x（低 10%）、GOOGL 15.1x 对 14.1x（高 7%）。据此可写成"**若倍数回到 2 年均值，META 隐含 +35%（12.3/9.1−1）、AMZN +11%、GOOGL −7%**"。
- **口径调整同样可量化**：把股权激励当现金后 EV/EBITDA 中位数抬升——数字媒体约 36%、电商约 30%、游戏约 15%，即同一家公司用两种口径算出的"贵/便宜"结论可差三分之一。
- 缺的是标准敏感度表（WACC、永续增长率、目标倍数 ±1x 对目标价的影响）：本件无目标价，故不存在；不构成缺口，但也不能当"风险已量化"用。

### 依据

- p.5｜2-Year Average 12.8x 14.1x 12.3x
- p.5｜Premium/Discount vs. 2-Year Average -10% 7% -26%
- p.7｜Exhibit 8: Digital Media: Treating SBC as Cash Increases EV/EBITDA Multiples by ~36%, on Average
- p.5｜As of 8/28/26 11.5x 15.1x 9.1x

## Q12 · 这份报告落在**静默期窗口**内吗？

否，不落窗。

- **发布日**：2026 年 9 月 1 日 14:00 GMT（材料入库日期标 9 月 2 日；价格数据截至 8 月 28 日收盘）。本件是周度估值追踪，非某次发行的承销商研究报告。
- **发行时间线**：全文没有 IPO 或二次发行的定价日、交割日、锁定期安排；也没有 Manager / Co-Manager / underwriting / bookrunner 之类角色声明。
- **唯一相近的投行角色**：披露段承认该行正担任 Uber 收购 Delivery Hero 的财务顾问（2026 年 7 月 16 日宣布，Uber 已同意付费）。这是**并购顾问**，不是证券发行承销，不触发"发行后 10 天 / 3 天"的静默期计算；且本件对 Uber 只做倍数展示，不给评级与目标价。
- 结论：无可比的发行日 ⇒ 判否。若后续发现该行在报告覆盖期内任一标的的发行中任承销商，需按发行日重算窗口。

### 依据

- p.1｜September 1, 2026 02:00 PM GMT
- p.1｜For analyst certification and other important disclosures, refer to the Disclosure Section, located at the end of this report.
- p.11｜is acting as financial advisor to Uber Technologies, Inc. (“Uber”) in connection with the proposed takeover offer for Delivery Hero SE (“Delivery Hero”), as announced on July 16, 2026.
- p.16｜Stock Ratings are subject to change. Please see latest research for each company.
