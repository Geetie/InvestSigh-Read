---
id: 03-broker-research-2026-06-16-JPMAICapex20IfYou202606165
cat: "03"
sub: broker-research
template: broker-research
template_version: 2
date: 2026-06-16
time: "00:00"
title: "03-broker-research-2026-06-16-JPMAICapex20IfYou202606165"
kind: "broker-research"
issuer: ""
ticker: META
source_pages: 61
---

> 骨架已生成，答案待填。原文：`corpus/materials/mineru/03-broker-research-2026-06-16-JPMAICapex20IfYou202606165/full.md`（61 页）。
> 填写纪律见 `docs/EVIDENCE-SPEC.md`：有答案必有依据块，块须逐字，页码 `p.N` 以源 PDF 为准。

## Q1 · 他的**关键假设取值**各是多少？

本件是跨行业信用/资本市场预测件（AI 数据中心融资），不是单公司损益模型，六项里只有部分能以"行业级假设"形式取到，逐项如下。

- **收入增速（行业级）**：无个股收入预测行，只有 hyperscaler 资本开支增速可作替代口径 —— 2026 年合计 $700–725bn，较 2025 年约 $410bn 增约 +75% Y/Y，为连续第三年 60%+ 增长（日历年口径，公司指引合计）。另给 hyperscaler 运营现金流 2027 年 >$900bn。单公司收入增速材料未给出此项，仅有个别已实现增速（Meta 广告驱动 1Q 收入 +33%、Alphabet Cloud +63%、Azure +40%）。
- **毛利率**：不是公司毛利率，而是变现反算用的稳态利润率假设 **50% stabilized**（含维护性支出、不含增长型 capex 与 R&D）。
- **营业利润率**：无预测行；仅引用已实现值，如 Meta 约 41%。材料未给出该项的逐年预测。
- **资本开支**：2026 年 $700–725bn（AMZN/MSFT/META 三家指引合计）；同一份材料另有一处按 hyperscaler cohort 口径给 $650bn（2026）、2027 年 >$1.1trn，两处口径不一，引用时须标清是"三家指引"还是"cohort 预测"。单公司如 Microsoft：FY25 约 $88bn → FY26E 约 $140bn，CY26 指引 $190bn。
- **实际税率**：**30%**，用于变现与 ROE 反算。
- **摊薄股数**：材料未给出此项。

配套的规模假设：2030 年前累计 AI capex **$5.5trn**，其中债务融资部分 **$4.1trn**；项目贷款价值比 LTC 样本均值 **>85%**、个别 **>90%**（对应 LTV 约 60%）；2030 年前新增数据中心容量 **138 GW**。

### 依据

- p.2｜We expect total AI capex spending of \$5.5 trillion through 2030, up from \$5.1 trillion in November.
- p.2｜we have also increased our assumed debt financing component of the AI capex buildout to \$4.1 trillion, largely to reflect a higher overall loan-to-cost assumption
- p.2｜Disclosed project LTCs in our cohort have averaged over 85% with select LTCs over 90%.
- p.7｜have collectively guided to \~\$700-725 billion of total capex in 2026, up \~75% Y/Y from \~\$410 billion in 2025
- p.2｜Hyperscaler capex has increased to \$650 billion for 2026, and is likely headed above \$1.1 trillion in 2027.
- p.55｜we have to assume a margin structure into perpetuity (we are assuming 50% stabilized for now
- p.55｜That requires assumptions around tax rates (we are using 30%) and our existing assumptions around loan-to-cost.
- p.11｜our base case forecast for data center growth is now 138 GW through 2030
- p.19｜Capex, which includes cash payments for finance leases per Microsoft’s definition, has increased from \~\$88bn in FY25 to an expected \~\$140bn in FY26

## Q2 · **他和我差在哪一项、哪一年**？差多少？

我方模型数值不在本份材料内，逐行"他 vs 我"的对照需跨批（交主控）。

本材料内可核的对照只有"他本期 vs 他上期"（2026 年 6 月 vs 2025 年 11 月同系列），以及一句定性共识比较：

| 项目 | 上期（2025 年 11 月） | 本期（2026 年 6 月） | 差额 |
|---|---|---|---|
| 累计 AI capex（至 2030） | $5.1trn | $5.5trn | +$0.4trn，+7.8% |
| 2030 年前新增容量 | 122 GW | 138 GW | +16 GW，+13.1% |
| 债务融资部分 | 未给上期值（只说"increased … to $4.1trn"） | $4.1trn | 仅方向无幅度 |
| 单 MW 开发成本 | — | 略降（"slightly lower"） | 仅方向无幅度，未给数 |
| SPG（数据中心证券化）发行 | 未给 | 未给 | 明确写"unchanged" |

差异结构：上调集中在**规模量（GW）与杠杆率（LTC）**两端，被单 MW 成本小幅下修部分抵消；即改动落在"投多少、借多少"，不在收入或利润率假设。相对卖方共识只有一句定性："slightly above consensus base cases but well below unconstrained bull cases"，无共识数字，故共识差额记缺口。

### 依据

- p.1｜we expect 138 GW of capacity growth through 2030, up from 122 GW in our November forecast
- p.2｜We expect total AI capex spending of \$5.5 trillion through 2030, up from \$5.1 trillion in November.
- p.2｜partially offset by slightly lower assumed development costs per MW
- p.3｜Our SPG numbers remain unchanged.
- p.11｜slightly above consensus base cases but well below unconstrained bull cases

## Q3 · 他的**财年是谁的财年**？

混合口径，必须逐表看，不能整份当同一财年：

- **hyperscaler 资产负债/现金流表**（Meta、Amazon、Alphabet 等）列头为 `FY20A / FY21A … FY26E`，只标年份不标月末，按日历年处理并注明"推定"；其中夹一个 `1Q26A (LTM)` 列，是滚动十二个月，不与财年列同口径。
- **Microsoft**：用 6 月结账的自家财年，正文明确把 `FY26` 与 `CY26` 分开写（"a $190bn CY26 outlook implies a FY27 runrate"），故其 FY 与日历年差半年，不可直接与日历年末共识比。
- **Oracle**：5 月结账，正文用 `FY26 / F1Q27` 标季度，与日历年差近一年，不可直接比。
- 主题层的年度数（$5.5trn 至 2030、138 GW through 2030）是日历年口径的行业预测，与公司财年无关。

结论：做"他 vs 共识"对照时，Meta/Amazon/Alphabet 可按日历年直接比（推定），Microsoft、Oracle 两家的 FY 行必须先换口径。

### 依据

- p.19｜<td>Meta Platforms (META)</td><td>EY20A</td><td>FY21A</td><td>FY22A</td>
- p.19｜Management also expects capacity constraints to persist through at least CY26
- p.19｜a \$190bn CY26 outlook implies a FY27 runrate of at least \~\$240bn in FY27
- p.20｜1.2GW delivered in FY26, nearly another GW expected in F1Q27
- p.11｜our base case forecast for data center growth is now 138 GW through 2030

## Q4 · **预测修正**：改了哪一项、从多少改到多少？改的是**假设**还是**结论**？

本件是对 2025 年 11 月同系列报告的全面修订，有明确的旧值→新值，且改动分两层：

**第一层：假设变了（重要）**

| 项目 | 旧值 | 新值 | 幅度 |
|---|---|---|---|
| 累计 AI capex（至 2030） | $5.1trn | $5.5trn | +$0.4trn（+7.8%，按 (新−旧)/旧 复算） |
| 2030 年前新增容量 | 122 GW | 138 GW | +16 GW（+13.1%，同上复算） |
| 债务融资部分 | 未给旧值 | $4.1trn | 仅方向，原文未给基数，不补 |
| 单 MW 开发成本 | 未给旧值 | 略降 | 仅方向 |
| SPG 发行预测 | — | — | 明写 unchanged，未改 |

**第二层：结论变了（不重要，事实未变）**：报告期内把科技板块信用评级由 Underweight 上调至 Neutral，理由是利差已在更宽水平稳定 —— 这是观点变动，不是现金流假设变动，按"只改结论"处理。

改动的驱动写得清楚：GW 上调是分子（bring-your-own-power、表后供电、每瓦算力提升），单 MW 成本下修是分母，LTC 假设上调是杠杆乘数。三者叠加才是 $5.5trn，不是单一变量。

### 依据

- p.1｜Since we wrote in November, total AI/Data Center–related issuance has exceeded \$300 billion
- p.2｜We expect total AI capex spending of \$5.5 trillion through 2030, up from \$5.1 trillion in November.
- p.1｜we expect 138 GW of capacity growth through 2030, up from 122 GW in our November forecast
- p.33｜we recently upgraded the sector from Underweight to Neutral
- p.3｜Our SPG numbers remain unchanged.

## Q5 · 他给了**情景**吗？各自驱动假设是什么？

没有 Bull/Base/Bear 三档目标价（本件不设目标价），但**给了两档容量情景**，且点明唯一分岔变量：

- **Base（已落地为基准预测）**：计入电力约束，2030 年前 138 GW，略高于卖方共识基准、明显低于无约束乐观情形。
- **Bull（只作口头上限，未给完整路径）**：若不受电力约束，五年内超过 150 GW "difficult but plausible"。
- **未设 Bear 档**：下行方向散落在正文（变现不足、残值风险、ARD 触发、并网排队），没有独立的下行情景数字。

差别**全部落在电力这一项约束**上，不在收入增速或利润率：两档之间只差 12 GW 上下的容量，收入/利润率假设共用同一套（50% 稳态利润率、30% 税率）。因此本件的情景不是"经营杠杆"情景，而是"物理约束"情景。

### 依据

- p.10｜the difference between ‘bull’ and ‘base’ case estimates broadly for data center growth is generally the constraint around power
- p.10｜Without those constraints, growth above 150 GW over five years appears difficult but plausible.
- p.11｜slightly above consensus base cases but well below unconstrained bull cases
- p.11｜our base case forecast for data center growth is now 138 GW through 2030

## Q6 · 他用了哪几种**估值方法**？**能互相印证吗**？

**产品型不符：本件不发布个股目标价，也没有 DCF / 目标倍数，因此不存在"多法互印"这回事。**它实际用的是信用端的相对价值框架，可复算的部分有三块：

1. **LTC → LTV 换算**：以 90% Loan-to-Cost 对应约 60% Loan-to-Value 判断项目杠杆是否被高估，这是全篇估值判断的锚。
2. **利差相对价值**：以"买更宽利差的项目债、等再融资或评级上迁"为收益来源，属信用 carry + 评级迁移交易，不是股权估值。
3. **ROC/ROE 反算**：给定稳态收入 $600–1,000bn、50% 稳态利润率、30% 税率与 LTC，反算投入资本回报 8%–13%、ROE 29%–44%、峰值杠杆 5.8–8.1x。这是唯一能复算的"估值"链条。

三块的输入不共享同一套外生变量（前两块看市场价，第三块看经营假设），故无法互相印证；且报告自己把公司层面的估值方法外置到单篇公司报告，本件不承担该职能。

### 依据

- p.2｜90% Loan-to-Cost appears closer to 60% Loan-to-Value
- p.4｜buying wider spread project deals into a likely refinancing or rise to Investment Grade presents an attractive risk/reward in our view
- p.55｜the sector needs roughly \$700 billion of revenue under our revised estimates to earn a 10% return on capital on the AI/data center buildout
- p.57｜J.P. Morgan uses a bond-level rating system that incorporates valuations (relative value) and our fundamental view on the security.
- p.57｜For valuation methodology and risks associated with covered companies or price targets for covered companies, please see the most recent company-specific research report

## Q7 · 目标价的**依据 / 估值方法解释 / 风险列示**齐不齐？

**产品型不符：本件无目标价**，故 2241(c)(1) 三件的第一件（目标价由何方法算出）在本件不成立，不能按"缺件"记不合规。但按同口径检视它实际给出的东西：

1. **方法解释**：有，但方法是信用评级方法论（债券层面的相对价值 + 基本面信用趋势、杠杆/覆盖/流动性比率），不是股价估值法；且明确把股权估值与风险外置到公司单篇报告。
2. **关键输入**：有，且可复算 —— 50% 稳态利润率、30% 税率、LTC 85%+、138 GW、稳态收入约 $700bn 对应 10% ROC。
3. **风险列示**：**无独立风险章**，这是本件的实质缺口。风险以条目形式散落在各章：电力/并网约束、熟练电力工人成本、变现不足（"可能永远达不到期望回报"）、数据中心 ABS 的残值风险与 ARD 触发、以及高杠杆下的再融资风险。条目具体，但没有一处集中成"可能阻碍达成结论的风险"清单。

结论：三件中第 1 件不适用、第 2 件具备、第 3 件**无专章**（形式瑕疵，已列上报）。另需注意：首页"Companies Discussed"只给价格与评级（如 META \$593.48/N），全篇无一个目标价数字。

### 依据

- p.56｜Companies Discussed in This Report (all prices in this report as of market close on 15 June 2026, unless otherwise indicated)
- p.57｜Equity Valuation and Risks: For valuation methodology and risks associated with covered companies or price targets for covered companies, please see the most recent company-specific research report
- p.56｜Important disclosures, including price charts and credit opinion history tables (if applicable), are available for compendium reports
- p.43｜handicapping residual value risk remains a tough task
- p.1｜power remains the most critical constraint on potential data center capacity growth

## Q8 · **评级分布三件**（三档占比 · 投行关系占比 · 观测时点）齐不齐？

三件齐，且**同时给了股权与信用两套分布**，这是本件最容易漏的地方：

| 口径 | Overweight/Buy | Neutral/Hold | Underweight/Sell | IB clients 占比 |
|---|---|---|---|---|
| 全球股权研究（J.P.Morgan Global Equity Research Coverage） | 51% | 37% | 12% | 83% / 79% / 74% |
| JPMS 股权研究 | 49% | 39% | 13% | 94% / 93% / 85% |
| 全球信用研究（Global Credit Research Universe） | 27% | 57% | 16% | 84% / 84% / 89% |

- 投行关系占比的定义写明：各类别中过去 12 个月获得过投行服务的标的公司百分比。
- 观测时点：表头写 "as of April 04, 2026"，但同段文字又说 "current as of the end of the most recent calendar quarter"，两处**不一致**（4 月 4 日不是季末），记形式瑕疵；发布日为 6 月 16 日，距 4 月 4 日约 73 天，已超过"发布日距季末 15 天内可用上上季末"的便利条件，故只能按表头日期引用，不能自动当作一季末数据。
- 本件的信用分布（27/57/16）与其结论（对板块整体看多）并存，说明机构级评级偏中性、观点在报告层面，属正常但值得记。

### 依据

- p.57｜J.P. Morgan Equity Research Ratings Distribution, as of April 04, 2026
- p.57｜<table><tr><td></td><td>Overweight (buy)</td><td>Neutral (hold)</td><td>Underweight (sell)</td></tr><tr><td>J.P.Morgan Global Equity Research Coverage* IB clients**</td><td>51%</td><td>37%</td><td>12%</td></tr>
- p.57｜JPMS Equity Research Coverage* IB clients**</td><td>83%</td><td>79%</td><td>74%</td>
- p.57｜Percentage of subject companies within each of the "buy," "hold" and "sell" categories for which J.P. Morgan has provided investment banking services within the previous 12 months.
- p.57｜<tr><td>Global CreditResearch Universe*</td><td>27%</td><td>57%</td><td>16%</td></tr><tr><td>IB clients**</td><td>84%</td><td>84%</td><td>89%</td></tr></table>
- p.57｜This information is current as of the end of the most recent calendar quarter.

## Q9 · **评级 / 目标价历史走势图**在不在（含赋改日期）？

**未见。**判"未见"而非"有图"的理由：

1. 披露段只有一句指向站外的声明 —— 价格图与信用观点历史表"available … by visiting https://www.jpmm.com/research/disclosures"，本件 PDF 内既无图、也无表。
2. 投资建议历史同样只给入口（Research & Commentary 页面可查），没有覆盖起止日期、没有变动条数、没有最近一次（日期/评级/PT）。
3. 文本层全文没有任何一段历史评级序列或历史目标价序列可读出。

因此三项交付物（覆盖期间、变动条数、最近一次变动）一项都取不到；这不是"覆盖不足一年无须附"，而是"声明在站外、文本层无数据"。

### 依据

- p.57｜A history of J.P. Morgan investment recommendations disseminated during the preceding 12 months can be accessed on the Research & Commentary page
- p.56｜price charts and credit opinion history tables (if applicable), are available for compendium reports and all J.P. Morgan–covered companies
- p.56｜Important disclosures, including price charts and credit opinion history tables (if applicable), are available for compendium reports

## Q10 · **九项冲突披露**在不在**首页**（或指明页码）？

首页末行以样板句指向披露页："See page 56 for analyst certification and important disclosures."，但**披露附录里并没有九项逐项列示**——它把逐项内容整体外置到 jpmm.com/research/disclosures 网站，正文只留通用句与评级定义。逐项核对：

| 项 | 有/无 | 位置与内容 |
|---|---|---|
| ① 分析师及家庭持仓 | 未见 | 披露附录只有 Analyst Certification 两段（观点如实反映、报酬与具体建议无关），无任何分析师本人或家庭成员持股句。相近的只有"非美分析师可能不受 FINRA 2241/2242 关于分析师账户持仓的限制"——那是**主体为非美分析师、内容是"不受限制"**，既不确认也无比例，不能当持仓披露。 |
| ② 报酬是否挂钩投行收入 | 有（间接、否定式） | 认证段称报酬"was, is, or will be"与具体建议无直接或间接关系；薪酬段列明依据为研究质量、客户反馈、竞争因素与"overall firm revenues"，含公司整体收入但未点名投行收入。 |
| ③ 近 12 个月主/副承销或收投行报酬 | 未见（仅通用句＋机构级占比） | 只有"J.P. Morgan does and seeks to do business with companies covered in its research reports"这一通用冲突提示，无逐标的的承销/收费确认。评级分布表里 83%/79%/74%（股权）与 84%/84%/89%（信用）的 IB clients 占比是**机构级聚合数**，不是"本件标的过去 12 个月收过投行费"的确认。 |
| ④ 未来 3 个月是否寻求投行费 | 未见 | 全文无"expects to receive or intends to seek compensation … in the next 3 months"类句子；最接近的仍是③那句通用"does and seeks to do business"，谈的是持续经营意向、无时限、无标的，不能替代本项。 |
| ⑤ 近 12 个月非投行服务报酬 | 未见 | 无"non-investment banking securities-related services"或"non-securities services"收费句。相近的是 ETF 做市/授权参与人服务声明，但主体服务对象是"substantially all U.S.-listed ETFs"，与本文标的（hyperscaler 及其债券）不符。 |
| ⑥ 是否客户及服务类型 | 未见 | 无"is a client of J.P. Morgan"或客户类型（投行/非投行/做市）逐项确认。相近的是披露页的 Coverage Universe 名单（分析师覆盖范围）与"Companies Discussed"名单（本件讨论的 15 家公司），覆盖≠客户关系，不能替代。 |
| ⑦ 实益持有该类普通股 ≥1% | 未见 | 无任何 1% 持股确认。唯一相近的是通用声明"J.P. Morgan may trade as a principal … may have investments in the securities (or derivatives of such securities) mentioned in this material"——无主体、无证券类别、无比例，属典型通用声明，不能算本项确认。 |
| ⑧ 是否做市 | 未见 | 无"makes a market in the securities of …"句。相近的是"J.P. Morgan Securities LLC is a member of the NYSE, FINRA, SIPC, and the NFA"——会员资格不等于对本文标的做市；另有 ETF 授权参与人声明，标的类别不符。 |
| ⑨ 分析师过去 12 个月是否从标的收酬 | 未见 | 认证段只讲报酬不与**具体建议**挂钩，未讲分析师是否从标的公司收取任何报酬（咨询、路演、差旅等）；薪酬段讲的是公司付酬依据，方向相反。 |
| ⑩ 其他重大冲突 | 有 | 三处实质冲突：一是通用业务冲突句（对公司"寻求业务"）；二是**结构性冲突**——本件 15 家"Companies Discussed"含 GOOG/GOOGL、AMZN、META、MSFT、ORCL 五家发行人，报告主题正是这五家的债券发行与融资安排，等于就"发行人如何融资"出观点；三是"J.P. Morgan may trade as a principal on the basis of the Research Analysts' views"，即自营可与本件观点同向或反向操作。另披露本件可能使用 AI 工具辅助数据分析与撰写。 |

名单核对（逐票列名型披露的处理）：披露页的 Companies Discussed 名单**含本文标的 META**（标注 META/\$593.48/N），同列还有 GOOG、GOOGL、AMZN、MSFT、ORCL、AVGO、NVDA、AMD、CRWV、IREN、APO、ARES、BX、OWL；该名单给的是价格与评级，**不含目标价、不含冲突状态**。

红旗提示：该机构对本件讨论的五家 hyperscaler 债券既做自营又可"寻求业务"，且机构级 IB clients 占比达 84%–89% ⇒ 引用其板块看多观点时须立场折价；九项中八项在本件正文无逐项披露，属披露外置，不是"无冲突"。

### 依据

- p.1｜See page 56 for analyst certification and important disclosures.
- p.56｜Important disclosures, including price charts and credit opinion history tables (if applicable), are available for compendium reports and all J.P. Morgan–covered companies, and certain non-covered companies, by visiting https://www.jpmm.com/research/disclosures
- p.56｜J.P. Morgan does and seeks to do business with companies covered in its research reports. As a result, investors should be aware that the firm may have a conflict of interest that could affect the objectivity of this report.
- p.56｜no part of any of the Research Analyst's compensation was, is, or will be directly or indirectly related to the specific recommendations or views expressed by the Research Analyst(s) in this report
- p.57｜The research analysts responsible for the preparation of this report receive compensation based upon various factors, including the quality and accuracy of research, client feedback, competitive factors, and overall firm revenues.
- p.58｜may not be subject to FINRA Rule 2241 or 2242 restrictions on communications with covered companies, public appearances, and trading securities held by a research analyst account
- p.58｜J.P. Morgan Securities LLC (“JPMS”) acts as authorized participant for substantially all U.S.-listed ETFs.
- p.61｜J.P. Morgan may trade as a principal on the basis of the Research Analysts’ views and research
- p.60｜J.P. Morgan Securities LLC (“JPMS”) is a member of the NYSE, FINRA, SIPC, and the NFA.

## Q11 · 他的**风险章**挂了数字吗？

**没有风险章，但有可量化的敏感度表**，所以不能简单判"样板风险"。分两层：

1. **可写成"若 X 变 ⇒ Y 变"的**：变现反算表 —— 稳态 AI 收入 $600bn → 投入资本回报 8%、ROE 29%、峰值杠杆 8.1x；$700bn → 10% / 33% / 7.4x；$800bn → 11% / 37% / 6.8x；$900bn → 12% / 41% / 6.3x；$1,000bn → 13% / 44% / 5.8x。即稳态收入每上 100bn，ROC 约 +1pt、ROE 约 +4pt、峰值杠杆约 −0.6x。这是全篇唯一能挂数的敏感度。
2. **只有方向、无百分点的**：电力与并网排队（最长 7 年 vs 数据中心 2–3 年规划期）、熟练电力工人成本上升与供给收缩、变现不足（"可能永远达不到期望回报"）、数据中心 ABS 残值风险与 ARD 触发（缓解因素：起始杠杆、终止契约、区位）、以及 5 年期资金池与资产久期错配。这些均为方向句，未附对任何一年 EPS 或目标价的量化影响。

结论：风险列示**部分挂数**——经营/融资杠杆对回报的影响有表，物理与制度约束对预测的影响无表；且报告不给 EPS 与目标价，故不存在"风险→PT 变 Y%"的口径。

### 依据

- p.55｜<table><tr><td>Hyperscaler/ModelDeveloper Cost Savings (Sbn)</td><td>Steady State AlRevenue(Sbn)</td><td>Implied Return OnCapital</td><td>Implied Return On Equity</td><td>ImpliedPeak AILeverage</td></tr><tr><td>$200</td><td>$600</td><td>8%</td><td>29%</td><td>8.1x</td></tr><tr><td>$200</td><td>$700</td><td>10%</td><td>33%</td><td>7.4x</td></tr>
- p.23｜One of the most visible constraints for new data center projects is the continually growing interconnection queue.
- p.1｜One other constraint to watch is likely labor, with costs for skilled powerline electricians spiking and availability shrinking.
- p.44｜Mitigating factors to the risk of tripping ARD include the starting leverage, termination covenants, and location.

## Q12 · 这份报告落在**静默期窗口**内吗？

**否。**判断路径：发布日 2026 年 6 月 16 日（美东时间 06:39 完成并分发），本件是 2025 年 11 月同系列预测的例行更新，属常规主题覆盖，不是某只新股的承销后首次覆盖。全文未见任何 IPO 或二次发行的承销角色、发行时间表或定价日——正文提到的 "recent equity offerings and IPOs and pending IPOs in the space" 是行业现象描述，未指认 J.P. Morgan 为任何一单的 manager/co-manager，披露段也只有通用"寻求业务"句。

因此无"发行日"可与发布日比对，静默期窗口（IPO 后 ≥10 天、二次发行后 ≥3 天）不成立，判不落窗。

### 依据

- p.61｜Disseminated 16 Jun 2026 06:39 AM EDT
- p.61｜Completed 16 Jun 2026 06:39 AM EDT
- p.2｜recent equity offerings and IPOs and pending IPOs in the space should put additional equity on the sector’s balance sheet
- p.56｜Companies Discussed in This Report (all prices in this report as of market close on 15 June 2026, unless otherwise indicated)
