---
id: 03-broker-research-2025-10-27-GFHKAI通信更新
cat: "03"
sub: broker-research
template: broker-research
template_version: 2
date: 2025-10-27
time: "00:00"
title: "03-broker-research-2025-10-27-GFHKAI通信更新"
kind: "broker-research"
issuer: ""
ticker: META
source_pages: 4
---

> 骨架已生成，答案待填。原文：`corpus/materials/mineru/03-broker-research-2025-10-27-GFHKAI通信更新/full.md`（4 页）。
> 填写纪律见 `docs/EVIDENCE-SPEC.md`：有答案必有依据块，块须逐字，页码 `p.N` 以源 PDF 为准。

## Q1 · 他的**关键假设取值**各是多少？

产品型不符：本件是 GF Securities (Hong Kong) 的**行业（板块）报告**，4 页，主题为 AI 网络光模块，**不对任何个股给评级或目标价，也没有公司损益表**。它真正在用的是一条"加速器出货 × 光模块配比 = 光模块需求"的假设链，逐条取值如下：

- **光模块总量**：800G 2026 年 4,300 万只、1.6T 2026 年 3,000 万只（2025 年分别为 2,200 万与 200 万，即当年几乎从零起量）。
- **配比假设（本件的核心杠杆）**：Rubin 世代每颗 GPU 配 1.6T 光模块的比例由 1:2.5 提到 **1:5**；Google TPU 整体 TPU-to-optics 约 **1:4**（1.6T 等值），拆开是 scale-up 1:1.5、scale-out 1:2.5。
- **上游产能假设**：Nvidia 的 CoWoS 2025/2026 为 377k/630k（原 377k/580k），其中 5 万片给 Vera CPU；AVGO 2026 年 CoWoS 200k（原 180k）；TPU 出货 2025/2026 为 270 万/400 万颗。
- **CPO 渗透假设**：明确判"1.6T 世代 CPO 渗透率不显著"，Nvidia CPO 交换机 2025/2026/2027 出货 2k/20k/35k 台；OIO 从 2027 年起才有增量。
- **收入增速 · 毛利率 · 营业利润率 · 资本开支 · 实际税率 · 摊薄股数**：**六项材料全未给出**。报告不含任何公司三表，连受益标的（TSEM、AVGO、CLS、LITE、FN）的财务数字都没有；CoWoS 的 377k/630k 是台积电**产能片数**，不是资本开支金额，不能当 capex 行用。

一句话：本件可用的假设只有"出货量 × 配比"这一条链，且全部是产业量纲（万只、千片、台），没有一项是财务量纲。用它做个股模型，必须自己接一层"单价 × 毛利率"的桥，报告不提供。

### 依据

- p.1｜We update that the total demand for 800G/1.6T will reach 43mn/30mn in 2026 (vs previous 37mn/28mn), mainly driven by: 1) Nvidia, Google and AWS’s accelerators’ demand;
- p.1｜Accordingly, we expect the ratio of 1.6T optical modules has risen from 1:2.5 to 1:5 in Rubin.
- p.1｜we now expect 377k/630k CoWoS for Nvidia in 2025/2026, from earlier 377k/580k, and this includes 50k for Vera CPUs
- p.1｜We maintain our estimation that Nvidia’s CPO switch will be 2k/20k/35k in 2025/2026/2027.
- p.2｜We update that the total demand for 800G/1.6T will reach 43mn/30mn in 2025/2026(vs 37mn/15mn last version)

## Q2 · **他和我差在哪一项、哪一年**？差多少？

我方模型数值不在本份材料内，逐行"他 vs 我"的对照需跨批（交主控）。本件**没有附任何共识表**（无 FactSet/Visible Alpha/Bloomberg 对照），所以只能做"**他本期 vs 他上期**"这一层，且上期值恰好都写在正文里：

| 项目 | 年份 | 上期 | 本期 | 变动 |
|---|---|---|---|---|
| 800G 光模块需求 | 2026 | 3,700 万只 | 4,300 万只 | +16.2%（按两值推算） |
| 1.6T 光模块需求 | 2026 | 2,800 万只 | 3,000 万只 | +7.1%（按两值推算） |
| Nvidia CoWoS | 2026 | 580k 片 | 630k 片 | +8.6%（按两值推算） |
| AVGO CoWoS | 2026 | 180k 片 | 200k 片 | +11.1%（按两值推算） |

差别集中在**2026 年这一个年份**，而且**全部落在量（出货/产能）上，没有一项落在价或利润率上**——这份报告从头到尾没有单价、没有毛利率，也就谈不上"价差"。

必须点出的一处**同件内不一致**：同样是"上期值"，What’s new 摘要段写 1.6T 旧值 2,800 万（`vs previous 37mn/28mn`，且把 4,300/3,000 万说成 2026 年一年），正文 Raise 1.6T demand 一节写 1.6T 旧值 1,500 万并把两个数分给 2025/2026 两年（`vs 37mn/15mn last version`）。两处差一倍，年份归属也不同 ⇒ **1.6T 的上修幅度到底是 +7% 还是 +100%，本件自身无法判定**。这是引用前必须回去问作者的一格，不能二选一自己拍。

### 依据

- p.1｜We update that the total demand for 800G/1.6T will reach 43mn/30mn in 2026 (vs previous 37mn/28mn), mainly driven by: 1) Nvidia, Google and AWS’s accelerators’ demand;
- p.2｜We update that the total demand for 800G/1.6T will reach 43mn/30mn in 2025/2026(vs 37mn/15mn last version), mainly driven by: 1) Nvidia, Google and AWS’s Accelerators’ demand are better than expected;
- p.1｜we now expect 377k/630k CoWoS for Nvidia in 2025/2026, from earlier 377k/580k, and this includes 50k for Vera CPUs
- p.1｜we estimate that AVGO’s cowos for 2026 will be 200k (vs 180k earlier), driven by robust TPU demand.

## Q3 · 他的**财年是谁的财年**？

**既不是公司财年，也不是可靠的日历年——是"设备出货年度"，且年度标注本身自相矛盾。**

- 表头只写 `2024 / 2025E / 2026E / 2027E`，无 `FYE`、无月末，按作业口径应作**日历年推定**。但这些列装的是光模块出货量（mn 只）、CoWoS 片数（k）、GPGPU/ASIC 出货（mn 颗），属产业量，不是某家公司的会计年度。
- 上文已述的年份错位是硬伤：摘要段把 4,300 万/3,000 万挂在"2026"一年，正文一节把同一对数拆成"2025/2026"，并对 1.6T 给出两个不同的旧值。⇒ 同一份 4 页报告内部就有两套年度口径，**不能直接与任何公司财年或日历年末共识对齐**。
- 若要落到个股，须自己换口径：Nvidia 财年非 12 月结账，其财年与报告里的 2026 日历年相差约三个季度；Google/Meta/AWS 为 12 月结账，可直接对得上。

结论：年度＝日历年（推定，且不可靠）；跨到公司模型时必须重排期，尤其 Nvidia。

### 依据

- p.2｜<tr><td rowspan=1 colspan=1>Shipment(m)</td><td rowspan=1 colspan=1>2018</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>2019</td><td rowspan=1 colspan=1>2020</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=3>2021</td><td rowspan=1 colspan=2>2022</td><td rowspan=1 colspan=4>2023</td><td rowspan=1 colspan=2>2024E</td><td rowspan=1 colspan=1>2025E</td><td rowspan=1 colspan=1>2026E
- p.2｜We update that the total demand for 800G/1.6T will reach 43mn/30mn in 2025/2026(vs 37mn/15mn last version)
- p.1｜We update that the total demand for 800G/1.6T will reach 43mn/30mn in 2026 (vs previous 37mn/28mn)

## Q4 · **预测修正**：改了哪一项、从多少改到多少？改的是**假设**还是**结论**？

**改的是假设，而且是这份报告唯一的实质内容。** 它没有评级、没有目标价，所以"结论层"无可改；改的全是产业量假设。逐行：

- **800G 需求（2026）**：3,700 万 → 4,300 万只（+16.2%，按两值推算）。
- **1.6T 需求（2026）**：2,800 万 → 3,000 万只（+7.1%，按两值推算）。**但同件正文一节写作 1,500 万 → 3,000 万（+100%）并分属 2025/2026 两年**，两处冲突，见 Q2。
- **Nvidia CoWoS（2026）**：580k → 630k 片（+8.6%，按两值推算），并新增说明其中 5 万片给 Vera CPU，理由是 Rubin 提前到 2026 年中封装出厂。
- **AVGO CoWoS（2026）**：180k → 200k 片（+11.1%，按两值推算），理由是 TPU 需求强。
- **TPU 出货**：2025/2026 为 270 万/400 万颗（原文未给旧值，只给新值，属"仅新值无旧值"，不补基数）。
- **CPO 出货**：Nvidia 交换机 2k/20k/35k 台（2025/2026/2027），用词是 `maintain`，即未改。

分层判定：**全部是假设层变化**（需求量、产能、配比），无一条是结论层。影响方向也清楚——上修 1.6T 与 CoWoS，直接抬升"光模块需求"这条链；但报告没有把上修折成任何一家公司的收入或 EPS，**从假设到盈利的桥由读者自建**。

### 依据

- p.1｜We update that the total demand for 800G/1.6T will reach 43mn/30mn in 2026 (vs previous 37mn/28mn), mainly driven by: 1) Nvidia, Google and AWS’s accelerators’ demand;
- p.1｜we now expect 377k/630k CoWoS for Nvidia in 2025/2026, from earlier 377k/580k, and this includes 50k for Vera CPUs, driven by the earlier ramp of Rubin which is scheduled for a mid-2026 package out
- p.1｜we estimate that AVGO’s cowos for 2026 will be 200k (vs 180k earlier), driven by robust TPU demand.
- p.1｜We expect TPU shipments to be 2.7mn/4mn in 2025 and 2026 for now.

## Q5 · 他给了**情景**吗？各自驱动假设是什么？

**没有情景，只有单点估计。** 全件没有 Bull/Base/Bear，也没有悲观/乐观两档，更没有"若 AI 需求降速则出货降到多少"的反事实。

- 唯一的"两档"是**时间序列上的旧值 vs 新值**（上期 3,700/2,800 万 → 本期 4,300/3,000 万），那是修正，不是情景。
- 驱动假设写得很实：三条例由（Nvidia/Google/AWS 加速器需求好于预期；scale-out 带宽提升带动光模块配比上升；Google 2026 转大规模集群、scale-up 层改用光互连）。这是**为什么上修**，不是**上修到什么情形**。
- 反向情形只出现在风险段三条（AI 需求降速、地缘、竞争），无一条配幅度或触发阈值。

结论：单情景。使用时只能取中枢（2026 年 800G 4,300 万 / 1.6T 3,000 万），且必须知道**这个中枢在一个月内被抬高过一次**，边界不在报告里。

### 依据

- p.1｜We update that the total demand for 800G/1.6T will reach 43mn/30mn in 2026 (vs previous 37mn/28mn), mainly driven by: 1) Nvidia, Google and AWS’s accelerators’ demand; 2) GPU/ASIC scale-out bandwidth increase driving increasing number of GPU/ASIC-tooptical module ratio; 3) Google’s transitions to large-scale clusters in 2026 and the scale-up layer will likely adopt optical interconnects.
- p.1｜Risks
- p.2｜1) AI demand deceleration; 2) Geo-political uncertainties; 3) Competition.

## Q6 · 他用了哪几种**估值方法**？**能互相印证吗**？

**一种都没有。** 本件不含估值：没有目标价、没有倍数、没有 DCF、没有 WACC、没有永续增长率，也没有 EPS 预测。

- 全文唯一与"估值"沾边的是受益标的名单（TSEM、AVGO/CLS、LITE、FN），但**只给理由不给价**：硅光（TSEM，因 EML 短缺）、交换机与交换芯片（AVGO/CLS）、EML 涨价与 OCS 份额（LITE，2026 年拿 30% 份额）。
- 因此"能否互相印证"这个问题不成立：只有一个分析维度（产业供需），没有第二个可交叉的估值路径。

这不是缺件，是产品型——板块报告的任务是给"量与配比"，把估值留给个股报告。引用时应把它当**产业假设输入**，而不是投资结论。

### 依据

- p.1｜Key beneficiaries: We expect that the upward revision of the 1.6T is favorable for silicon photonics players like TSEM (Tower Semi), considering the shortage of EML, and switch/switch chip players like AVGO/CLS.
- p.1｜In addition, within its OCS switch business, we expect the total shipment of OCS will be 15k/30k in 2025/2026 and Lite will take 30% share in 2026.
- p.3｜Rating definitions

## Q7 · 目标价的**依据 / 估值方法解释 / 风险列示**齐不齐？

**目标价三件全无——因为本件根本没有目标价。** 按产品型判定为不适用，不按"形式不合规"上报，但要写清缺的是什么：

1. **目标价由哪个方法算出**：无。全文无 target price、无 TP、无 12 个月目标。
2. **方法的关键输入**：无。没有 EPS、倍数、WACC、永续增长率任何一项；有的是产业量（4,300 万只、3,000 万只、630k 片、配比 1:5）。
3. **风险列示**：**有，但只是三条方向句**——AI 需求降速、地缘政治不确定性、竞争。没有一条量化，也没有指名哪家公司。

所以严格说：本件连"评级"都没有（正文未对 TSEM/AVGO/LITE 等给 Buy/Hold），只在末页给了评级**定义**（Buy/Accumulate/Hold/Underperform 四档，行业 Positive/Neutral/Cautious 三档），定义与结论不是一回事。

结论：2241(c)(1) 三件不适用于本件；若硬套，是三件全缺。**不上报为合规缺陷，但要登记"本件不可作为目标价来源"**。

### 依据

- p.3｜<tr><td colspan="2">Company ratings
- p.3｜<tr><td>Buy</td><td>Stock expected to outperform benchmark by more than 15%
- p.2｜1) AI demand deceleration; 2) Geo-political uncertainties; 3) Competition.

## Q8 · **评级分布三件**（三档占比 · 投行关系占比 · 观测时点）齐不齐？

**三件全无。** 只有评级**定义表**，没有评级**分布表**。

1. **三档占比**：未见。末页只有 `Company ratings` 与 `Sector ratings` 两张定义表（Buy >15%、Accumulate 5–15%、Hold −5%~5%、Underperform <−5%；行业 Positive >10%、Neutral −10%~10%、Cautious <−10%），**没有任何百分比分布**。查了 Rating definitions 整节与 Disclosure of Interests 整节，两节均无分布表。
2. **各类别中过去 12 个月有投行关系的占比**：未见。Disclosure of Interests 第 (4) 条只做了一句**否定式陈述**——过去 12 个月在香港与所涉公司无投行关系——这是"本机构无关系"，不是"各评级类别中有关系的占比"，两者不能互替。
3. **观测时点**：未见。全文无 `as of <日期>` 的评级统计时点；刊头日期是报告日期，不是披露观测日。

补充一个容易踩的坑：这份评级体系是**四档股票 + 三档行业**，与美系三档（Buy/Hold/Sell）不同构。即便将来拿到分布表，也不能与 Buy/Hold/Sell 直接对比，需先映射。

### 依据

- p.3｜<tr><td> Accumulate</td><td>Stock expected to outperform benchmark by more than 5% but not more than 15%
- p.3｜<tr><td colspan="2"> Sector ratings
- p.4｜(4) GF Securities (Hong Kong) Brokerage and/or its affiliates does not have any investment banking relationship in Hong Kong with the company(ies) mentioned in this report in the past 12 months.

## Q9 · **评级 / 目标价历史走势图**在不在（含赋改日期）？

**不在，且不适用。** 本件无个股评级、无目标价，故无历史可画。

- 全件无图无表涉及评级或目标价的历史变动；末页只有评级定义，没有 `price target history`、`rating history` 一类标题或表格。
- 唯一带时间维度的图是出货量序列（2018–2026E 的 800G/1.6T 分客户出货），那是**产业量历史**，不是评级/目标价历史。
- 覆盖期也不存在：本件不覆盖个股，谈不上"覆盖满一年须附"。

结论：判未见。若下游需要该分析师的评级历史，只能回 GF Securities (Hong Kong) 的单篇个股报告取，本件取不到。

### 依据

- p.1｜Oct 26, 2025
- p.3｜Rating definitions

## Q10 · **九项冲突披露**在不在**首页**（或指明页码）？

首页无样板句指向披露页，末页有一节 `Disclosure of Interests`，共 **4 条**，全部是**否定式**（"没有"型），不是美系 2241 的九项逐条结构。逐项核对：

| 项 | 有/无 | 位置与内容 |
|---|---|---|
| ① 分析师及家庭持仓 | 有（否定式，含 associate） | Disclosure of Interests 第 (1) 条：分析师及其 associate 未担任所涉公司高管，且**在所涉公司无任何财务利益**。这是明确的否定申报，主体含 associate，可判"有"；但未单列"家庭成员"字样，家庭成员仅以 associate 覆盖 |
| ② 报酬是否挂钩投行收入 | 部分有（只否定了"挂钩具体建议"） | 免责段：分析师报酬的任何部分均**不**与本文的具体建议或观点直接/间接相关。这是"不挂钩具体建议"，未说明是否与公司整体投行收入挂钩——与本项要问的"是否挂钩投行收入"不是同一命题，判部分 |
| ③ 近 12 个月主/副承销或收取投行报酬 | 有（否定式，限香港） | Disclosure of Interests 第 (4) 条：本机构及关联方过去 12 个月在香港与所涉公司**无投行关系**。注意地域限定为香港，境外承销不在声明范围内 |
| ④ 未来 3 个月是否寻求投行费 | 未见 | 查了Disclosure of Interests 全部四条与免责段，无"未来三个月寻求投行交易/费用"的时窗表述；免责段"may be seeking or building business relationships"是笼统意向，无时窗、无标的，不构成本项确认 |
| ⑤ 近 12 个月非投行服务报酬 | 未见 | 同两节均无非投行服务报酬（non-investment banking services）字样，也无按公司列示的条目 |
| ⑥ 是否客户及服务类型 | 未见（具体） | 免责段只有"本报告仅向本机构授权的客户或指定机构分发"，是**分发对象**说明，不是"所涉公司是否为本机构客户、提供何种服务"的确认 |
| ⑦ 实益持有该类普通股 ≥1% | 有（否定式，三重口径） | Disclosure of Interests 第 (2) 条：本机构及关联方**无任何财务利益**，且未投资达到 (i) 市值 1% 或 (ii) 已发行股本/单位 1% 的金额。这是本册少见的"明确否认 ≥1%"，主体与比例都落到位 |
| ⑧ 是否做市 | 有（否定式） | Disclosure of Interests 第 (3) 条：本机构及关联方**无做市活动**，也未派员担任所涉公司高管。明确否认，可判有 |
| ⑨ 分析师过去 12 个月是否从标的收酬 | 未见 | 第 (1) 条否定的是"财务利益"与"高管任职"，免责段否定的是"报酬挂钩具体建议"，两者都不等于"未从标的公司收取报酬"；全节无该项表述，判未见 |
| ⑩ 其他重大冲突 | 有（笼统） | 免责段：本机构及关联方可**正在寻求或建立**与所涉公司的业务关系，并提示读者据此考虑独立性受影响；免责段另有自营交易部门可能持有与报告相反头寸的提示。无具体标的、无金额 |

红旗提示：本件是**清白的否定型披露**——无实益持股、无做市、无香港投行关系、分析师无财务利益，均以明文否认。**不构成持仓/做市/投行费红旗**。唯一要留意的是②与⑨两个"没答到点上"的缺口：它否认了"报酬挂钩具体建议"，却没回答"报酬是否挂钩投行收入"，这与美系机构常见的 "includes investment banking revenues" 正好相反，属披露口径差异，引用时不应解读为"更干净"。

### 依据

- p.4｜(1) The research analyst(s) and his/her associate has not served as an officer of the company(ies) mentioned in this report, and does not have any financial interests in the company(ies) mentioned in this report.
- p.4｜(2) GF Securities (Hong Kong) Brokerage and/or its affiliates does not have any financial interests and has not invested in interests aggregate to an amount equal to or more than (i) 1% of the market capitalization; or (ii) 1% of the issued share capital, or issued units, in the company(ies) mentioned in this report.
- p.4｜(3) GF Securities (Hong Kong) Brokerage and/or its affiliates does not have any market making activities, and has not employed any individual(s) serving as officer(s) of the company(ies) mentioned in this report.
- p.3｜no part of his or her remuneration was, is, or will be, directly or indirectly, in connection with his or her specific recommendations or views expressed in this report.
- p.3｜GF Securities (Hong Kong) Brokerage and its affiliates may be seeking or building business relationships with company(ies) mentioned in this report.

## Q11 · 他的**风险章**挂了数字吗？

**没挂，判"样板风险"。** 全件风险只有一段三句，摘要段与正文末尾各重复一次：

- ① AI 需求降速；② 地缘政治不确定性；③ 竞争。**三条全是名词短语，无一条给百分点、金额、年份或触发阈值。**

判据检验：写不出"若〔变量〕变 X ⇒〔哪一年〕出货/收入变 Y%"。报告有大量可挂数字的地方却没挂——比如"若 1.6T 配比从 1:5 回落到 1:2.5，2026 年 1.6T 需求会从 3,000 万降到多少"，这条链用它自己的配比与出货数据完全算得出，但报告没算。

可替代的量化材料是修正本身（3,700→4,300 万、580k→630k），那是**假设调整**，不是**风险敏感度**，两者不能互替。使用时若要风险弹性，只能自建，并注明是自建。

### 依据

- p.1｜Risks
- p.1｜1) AI demand deceleration; 2) Geo-political uncertainties; 3) Competition.
- p.2｜1) AI demand deceleration; 2) Geo-political uncertainties; 3) Competition.

## Q12 · 这份报告落在**静默期窗口**内吗？

**否。**

- 发布时点：刊头 `Oct 26, 2025`（每页页脚同）。注意材料 id 与登记日为 2025-10-27，判窗口须用刊头的 10 月 26 日。
- 本件性质：板块报告（Sector Report | Technology），内容是光模块需求与 CoWoS 产能的假设上修 + 受益标的名单，**不含任何发行、承销、锁定期信息**。
- 发行时间线：全文未见 IPO、二次发行、配售、承销团（Manager/Co-Manager/underwriting）或发行日字样；Disclosure of Interests 第 (4) 条明确"过去 12 个月在香港与所涉公司无投行关系"，反向印证不存在在手承销项目。
- 因此没有"发行日"可与发布日比对，10 天/3 天窗口无从成立。

结论：不落静默期。真正的时点风险是**信息新鲜度**：报告发布于 10 月 26 日，而其中的 CoWoS 与 TPU 数据引用了 10 月 17 日与更早的报告，且 1.6T 旧值在同件内出现两个版本（见 Q2），引用前应以最新单篇为准。

### 依据

- p.1｜Oct 26, 2025
- p.1｜e] Sector Report | Technology
- p.4｜(4) GF Securities (Hong Kong) Brokerage and/or its affiliates does not have any investment banking relationship in Hong Kong with the company(ies) mentioned in this report in the past 12 months.
