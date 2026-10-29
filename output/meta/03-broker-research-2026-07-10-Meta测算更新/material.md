---
id: 03-broker-research-2026-07-10-Meta测算更新
cat: "03"
sub: broker-research
template: broker-research
template_version: 2
date: 2026-07-10
time: "00:00"
title: "03-broker-research-2026-07-10-Meta测算更新"
kind: "broker-research"
issuer: ""
ticker: META
source_pages: 4
---

> 骨架已生成，答案待填。原文：`corpus/materials/mineru/03-broker-research-2026-07-10-Meta测算更新/full.md`（4 页）。
> 填写纪律见 `docs/EVIDENCE-SPEC.md`：有答案必有依据块，块须逐字，页码 `p.N` 以源 PDF 为准。

## Q1 · 他的**关键假设取值**各是多少？

Deutsche Bank 单票公司更新（4 页，Benjamin Black 等），损益只有 FY27 一年，且不是完整模型，是「超额容量 → 第三方云收入 → EPS」的增量测算。六项按此口径给，财年标 FY27（推定日历年）：

- **收入增速**：不给公司总收入增速，只给增量口径。Street FY27E 收入 301,814 百万美元；增量第三方云收入 A/B/C = 14,625 / 24,141 / 36,000 百万美元，相当于共识的 +4.8% / +8.0% / +11.9%。核心换算是**每 GW 年化收入 100–150 亿美元**（每 MW 10.0/12.5/15.0 百万美元）。
- **毛利率**：材料未给出此项。全文无毛利率行，只有「增量营业利润率」50%/62.5%/75%（销售与客服成本口径）与「增量边际」50–75%，二者都不是毛利率，不能替代。
- **营业利润率**：Street FY27E 34.8%（GAAP 营业利润 105,045 百万美元）→ 加增量后 35.5% / 36.9% / 39.1%，提升 70 / 205 / 428 bp。
- **资本开支**：2027 年新增 7GW、每 GW 约 350 亿美元 ⇒ 约 2,450 亿美元；剔除 Hyperion 表外 1.0–1.5GW 后为 5.5GW ⇒ 约 1,900–1,950 亿美元；若 Iris 与 GPU 五五开、每 GW 降到约 300 亿美元 ⇒ 约 1,650 亿美元。对照：Street 1,600–1,650 亿、DB 上期约 1,850 亿、买方约 2,200 亿。
- **实际税率**：12.6%（税前 102,839 → 净利 96,310 百万美元，按 Bloomberg 口径）。
- **摊薄股数**：2,570 百万股（稀释加权平均，Bloomberg）。
- **EPS（附）**：共识 FY27E 稀释 GAAP EPS 35.12 美元 → 情景后 37.47 / 40.11 / 44.17 美元，即 +6.7% / +14.2% / +25.8%。

一句话：六个"假设"里三个是真假设（每 GW 造价、每 GW 收入、可售比例），三个直接引共识（税率、股数、共识收入）。

### 依据

- p.1｜Adding 7GW of capacity in 2027 implies AI-related capex of ~$245bn, assuming each GW of capacity costs ~$35bn.
- p.1｜Although Street consensus for 2027 capex is well below -- at ~$160-$165bn, our prior expectations were in the ~$185bn range, and we believe the buyside was much higher, at around $220bn.
- p.1｜If we exclude Hyperion, Meta likely may be adding only 5.5GW of incremental capacity in 2027, which, at $35bn per GW, would imply capex of ~$190-$195bn.
- p.3｜Adding 5.5GW of capacity in 2027 using a 50/50 mix of Iris chips and GPUs, implies an average cost of ~$30bn/GW, and could represent a more modest outlay of ~$165bn, well within the range that the buyside is already assuming.
- p.4｜(x) Annualized Revenue per MW (mn) $10.0 $    12.5 $    15.0 Equivalent to $10-15bn per GW
- p.4｜(x) % Incremental Margins 50.0% 6    2.5% 7    5.0% DB assumption: Sales and customer support costs
- p.4｜Street Consensus 34.8% 3    4.8% 3    4.8%
- p.4｜(x) 1- Tax Rate 12.6% 1    2.6% 1    2.6% Per Bloomberg, LP
- p.4｜(/) Dil Wtd Ave Shares 2,570 2    ,570 2    ,570 Per Bloomberg, LP
- p.4｜(=) % Potential Upside to GAAP EPS 6.7% 1    4.2% 2    5.8%

## Q2 · **他和我差在哪一项、哪一年**？差多少？

我方模型数值不在本份材料内，逐行「他 vs 我」的对照需跨批（交主控）。

本材料内可核的对照是「**他 vs 报告所引共识**」（Bloomberg Street 口径，全部落在 FY27）：

| 项目 | 共识（Street） | DB 本件 | 差额 |
|---|---|---|---|
| FY27 资本开支 | 1,600–1,650 亿美元 | >2,000 亿（7GW 直算 2,450 亿；剔 Hyperion 1,900–1,950 亿；混合芯片 1,650 亿） | **高于共识约 350–400 亿美元**（按 2,000 亿 vs 1,625 亿中值复算，约 +22%~+25%）；亦高于 DB 上期 1,850 亿 |
| FY27 增量第三方云收入 | 共识未单列该科目；DB 以其对共识收入计增量，A/B/C 为 146 / 241 / 360 亿美元 | 基准 241 亿美元 | 相当于共识收入 +8.0% |
| FY27 GAAP EPS | 35.12 美元 | 37.47 / 40.11 / 44.17 美元 | +6.7% / +14.2% / +25.8% |
| FY27 营业利润率 | 34.8% | 35.5% / 36.9% / 39.1% | +70 / +205 / +428 bp |

**差异落在哪一端**：主要落在**资本开支假设**（他对 2027 capex 明显高于街头）与**变现假设**（把闲置容量当可售算收入，是街头模型里没有的一项）。利润率端差异是收入端的派生结果，不是独立假设。

一处必须点出的内部张力：正文说 2027 capex「至少 2,000 亿美元以上」，但剔除 Hyperion 并改用混合芯片后又说约 1,650 亿——**同一口径两处相差 350 亿以上，报告没有把两个口径对齐**。引述时须分别标注"直接出资 1,900–1,950 亿"与"混合芯片 1,650 亿"，不要只抄 2,450 亿。

### 依据

- p.2｜this implies the potential for ~$24bn in incremental 3P cloud revenue (our base case within a $15-$36bn range in our scenario analysis), or ~8% upside versus Street estimates, significantly higher than our prior analysis, which suggested $17bn in incremental revenue in our then base case.
- p.1｜Although Street consensus for 2027 capex is well below -- at ~$160-$165bn, our prior expectations were in the ~$185bn range, and we believe the buyside was much higher, at around $220bn.
- p.2｜If we just flow through the incremental revenue at 50-75% incremental margins, that would suggest ~$5 in additional GAAP EPS, or ~14% above current consensus, versus ~10% in our prior base case.
- p.4｜(/) Street Consensus FY27E Dil EPS $35.12 $   35.12 $   35.12 Per Bloomberg, LP
- p.4｜(/) Street Consensus FY27E Revenue $301,814 $ 301,814 $ 301,814 Per Bloomberg, LP

## Q3 · 他的**财年是谁的财年**？

- 估计表列头只写 `FY27E`、`FY26`、`FY27`，**不标月末**；情景表行标签是「Capacity at 2025-end」「Added in FY26」「Added in FY27」。按规范以日历年处理并注明**推定**。
- 与日历年的一致性：Meta 为 12 月结账（外部常识，本件未写明），故 FY27 ≈ 日历年 2027，可与 Bloomberg 的 FY27E 共识（收入 301,814 百万美元、EPS 35.12 美元）直接比。本件所有"相对共识的差额"都建立在这一假设上。
- 时点：定价基准 2026 年 7 月 8 日收盘 603.12 美元，发布日 2026 年 7 月 9 日，共识取自 Bloomberg（未标提取日）。
- 一处口径混用：正文用"2027 capex"（日历年），表格用"FY27"（公司财年），在 Meta 身上两者重合；换非 12 月结账公司即不成立，跨批比较时须先确认财年末。

### 依据

- p.4｜Figure 1: Scenario Analysis of Potential FY27 Impact
- p.1｜Price at 8 Jul 2026 (USD) 603.12 Price target 810.00 52-week range 790.00 - 525.72
- p.1｜9  July 2026
- p.4｜(/) Street Consensus FY27E Revenue $301,814 $ 301,814 $ 301,814 Per Bloomberg, LP

## Q4 · **预测修正**：改了哪一项、从多少改到多少？改的是**假设**还是**结论**？

**有真修正，且是假设层的修正**（不是只改评级/目标价）。逐项（均为 FY27）：

| 项目 | 上期 | 本期 | 变动 |
|---|---|---|---|
| 增量第三方云收入区间 | 90–300 亿美元 | 150–360 亿美元 | 上下限各抬 60 亿（下限 +67%、上限 +20%） |
| 增量收入基准 | 170 亿美元 | 241 亿美元 | **+41.2%**（(241−170)/170 复算） |
| 增量 GAAP EPS 区间 | 1.40–7.50 美元 | 2.35–9.00 美元 | 下限 +67.9%、上限 +20% |
| 相对共识 EPS 增幅 | 4%–21%（基准约 +10%） | 7%–26%（基准约 +14%） | 基准抬 4pp |
| 相对共识收入增幅 | 3%–10% | 5%–12% | 上下限各抬 2pp |
| 可售容量 | 约 1.0–1.5GW | 1,950–3,200MW（约 1.95–3.2GW） | 上限翻倍以上 |
| 评级 / 目标价 | Buy / 810 美元 | Buy / 810 美元 | **未变** |

- **改的是假设**：容量假设从"较温和的新增"改为"2027 年翻倍到 14GW（新增 7,000MW，2025 年底 2,000MW、FY26 新增 5,000MW）"；可售比例（2025 年底容量 30/40/50%、FY26 新增 20/25/30%、FY27 新增 5/7.5/10%）与每 GW 收入（100–150 亿美元）随之上调，EPS 因此上修。
- **结论没变**：Buy 与 810 美元一字未动，即"改了数、没改观点"。
- 判定：**重要**。典型"假设变了、结论没变"，且方向一致（把收入机会往上修，同时承认 capex 上行）。对读者最有用的正是这里——目标价没动，但支撑目标价的收入假设被抬了约四成。
- 口径说明：原文只给区间与基准，未给逐行旧值→新值表。"上期基准 170 亿"取自原文 "which suggested $17bn in incremental revenue in our then base case"，"本期基准 241 亿"取自 A/B/C 表中档，两者口径一致，可直接比。

### 依据

- p.3｜Our prior scenario analysis estimated potential FY27 incremental revenue of $9-$30bn, equal to 3-10% upside to Street revenue estimates, and ~ $1.40-$7.50 of incremental GAAP EPS, or 4-21% upside to Street estimates.
- p.3｜Updating this analysis for the new capacity targets, implies the potential for $15-$36bn in incremental 3P cloud revenue, or 5-12% upside versus Street estimates.
- p.2｜this implies the potential for ~$24bn in incremental 3P cloud revenue (our base case within a $15-$36bn range in our scenario analysis), or ~8% upside versus Street estimates, significantly higher than our prior analysis, which suggested $17bn in incremental revenue in our then base case.
- p.2｜If we just flow through the incremental revenue at 50-75% incremental margins, that would suggest ~$5 in additional GAAP EPS, or ~14% above current consensus, versus ~10% in our prior base case.
- p.1｜When we include the reported 14GW in FY27

## Q5 · 他给了**情景**吗？各自驱动假设是什么？

**给了三档经营情景（A/B/C，无牛熊命名，无三档目标价）**，全部落在 FY27，驱动假设在容量与变现两端。

| 驱动假设 | A | B | C |
|---|---|---|---|
| 2025 年底容量中判为"富余"的比例 | 30.0% | 40.0% | 50.0% |
| FY26 新增容量中的富余比例 | 20.0% | 25.0% | 30.0% |
| FY27 新增容量中的富余比例 | 5.0% | 7.5% | 10.0% |
| 可售容量合计（MW） | 1,950 | 2,575 | 3,200 |
| 售出比例 | 75% | 75% | 75% |
| 每 MW 年化收入 | 1,000 万美元 | 1,250 万美元 | 1,500 万美元 |
| **增量收入** | 146 亿美元 | 241 亿美元 | 360 亿美元 |
| 增量边际 | 50.0% | 62.5% | 75.0% |
| **FY27 EPS** | 37.47 美元 | 40.11 美元 | 44.17 美元 |
| 对共识 EPS 增幅 | +6.7% | +14.2% | +25.8% |

- **差别落在哪**：不在收入增速，而在两条同时变化的假设——①「富余容量占比」（30%→50%）决定有多少 MW 可卖；②「每 MW 收入」（1,000 万→1,500 万美元）决定每 MW 卖多少钱。两者相乘放大，C 档收入是 A 档的 2.46 倍（360/146 复算）。
- **三档共同假设 2027 年 14GW 到位、新增 7GW**：容量不外生变化，只有"可售比例"和"单价"在动。即**不测容量建不建得成，只测能卖出多少**。
- 无三档目标价：Buy/810 是单点，情景只到 EPS，不到 PT。
- 另有一组"上期 vs 本期"区间（见修正题），与 A/B/C 不是同一刻度，不可混用。

### 依据

- p.4｜Figure 1: Scenario Analysis of Potential FY27 Impact
- p.4｜(x) % Deemed "Excess" 30.0% 4    0.0% 5    0.0%
- p.4｜(x) % Deemed "Excess" 20.0% 2    5.0% 3    0.0% DB assumption
- p.4｜(x) % Deemed "Excess" 5.0% 7     .5% 1    0.0%
- p.4｜Capacity at FY27-end 1,950 2    ,575 3    ,200
- p.4｜(=) Incremental Revenue $14,625 $  24,141 $  36,000
- p.4｜(=) Potential EPS $37.47 $   40.11 $   44.17

## Q6 · 他用了哪几种**估值方法**？**能互相印证吗**？

**材料未给出估值方法——一种都没有。** 这是本份最硬的缺口：

- 全 4 页无 DCF、无 WACC、无永续增长率、无目标倍数、无 P/E 或 EV/EBITDA 的目标口径。首页只有 "Valuation & Risks" 这个小标题，其下紧跟 Reuters/Bloomberg 代码与交易所栏，**没有任何估值正文**。
- 目标价 810 美元是裸数字：对 7 月 8 日收盘 603.12 美元隐含 +34.3% 上行（(810−603.12)/603.12 复算），但**用什么方法、什么倍数、哪一年盈利算出 810，材料内无从得知**。
- 因此无法判断"能否互相印证"——**不存在第二种方法，连第一种都没披露**。
- 唯一可做的侧面推算：用本件 FY27 共识 EPS 35.12 美元，810 美元隐含约 23.1x FY27 P/E；用 C 档 44.17 美元则约 18.3x。这是**按 PT÷EPS 反推的，不是报告给的**，只能作缺口标注的参照，不能当成他的方法。

判定：估值方法缺失，与下一题一并构成形式不合规，须上报。

### 依据

- p.1｜Valuation & Risks
- p.1｜Price at 8 Jul 2026 (USD) 603.12 Price target 810.00 52-week range 790.00 - 525.72
- p.4｜(/) Street Consensus FY27E Dil EPS $35.12 $   35.12 $   35.12 Per Bloomberg, LP
- p.4｜Source : Company documents; Bloomberg Finance LP; Deutsche Bank

## Q7 · 目标价的**依据 / 估值方法解释 / 风险列示**齐不齐？

逐条判，**三件全缺**：

1. **目标价由哪个方法算出（可复算公式）**：**无**。810 美元没有任何公式、倍数或指标支撑；正文从头到尾在算"增量云收入 → EPS"，从未把 EPS 与目标价连起来。读者能算出增量 EPS，但算不出"为什么值 810"。
2. **方法的关键输入**：**无**。没有目标倍数、没有 WACC、没有永续增长率、没有分部加总权重；"Valuation & Risks" 标题下无正文。
3. **可能阻碍达成目标价的风险列示**：**无独立风险节**。最接近的是两句定性判断——「不能无视市场对 capex 的担忧，7GW 是个大数字，街头估计可能还得上修」与「抛售夸大了财务负担、低估了收入机会」；都是方向判断，不是"哪些因素会阻碍股价到 810"的条目，且下行侧零量化（三档情景全为上行）。

**判定：形式要件缺 2 件（方法、输入），第 3 件只有方向句、无条目化列示，等价于缺。必须上报主控。**

补充：本件是 4 页的 Company Update（副标题 Buyers of Capacity），DB 的完整估值方法与风险通常在同系列完整报告的 "Valuation & Risks" 正文页，本件未随附。属**载体不全**，但按件判仍不合规。

### 依据

- p.1｜Valuation & Risks
- p.1｜Price at 8 Jul 2026 (USD) 603.12 Price target 810.00 52-week range 790.00 - 525.72
- p.2｜we would not dismiss the market’s capex concern; 7GW of incremental capacity is a large number, and it appears Street estimates may still need to move higher.
- p.2｜we think the sell-off overstates the incremental financial burden and understates the revenue opportunity.

## Q8 · **评级分布三件**（三档占比 · 投行关系占比 · 观测时点）齐不齐？

**三件全无，且属"载体缺失"型，不是"披露了但没写"。**

- **三档占比**：未见。全 4 页无评级分布表；本件只有单一标的评级（Buy）。DB 的分布表通常在附录 Disclosure 段，本件未随附。
- **各类别中过去 12 个月有投行关系的占比**：未见。无 IBC 栏、无投行客户占比。
- **观测时点**：未见。没有 "as of <日期>" 的分布观测时点。
- **能确认的只有一件事**：首页写明"重要研究披露与分析师认证见附录 1"，说明**披露段存在但不在本件内**——这解释了九项与分布三件为何全空，也意味着不能据此断言"该机构未披露"，只能说"本件未含"。
- 另记：首页那句通用业务关系声明（"Deutsche Bank does and seeks to do business with companies covered in its research reports"）属机构级通用句，**不能替代评级分布表**，也不能替代九项中的任何一项。

### 依据

- p.1｜IMPORTANT RESEARCH DISCLOSURES AND ANALYST CERTIFICATIONS LOCATED IN APPENDIX 1.
- p.1｜Deutsche Bank does and seeks to do business with companies covered in its research reports.
- p.4｜Source : Company documents; Bloomberg Finance LP; Deutsche Bank
- p.1｜Rating Buy North America United States TMT Internet Company Meta

## Q9 · **评级 / 目标价历史走势图**在不在（含赋改日期）？

**不在。**

- 全 4 页无评级历史图、无目标价历史序列、无 "Stock Price, Price Target and Rating History" 类标题；文本层与图表位均无。
- 只有两个时点信息：当前目标价 810.00 美元、52 周区间 790.00–525.72 美元。52 周区间是**股价**区间，不是目标价历史，不能当历史图用。
- 无法判断"覆盖是否满一年"：本件未写首次覆盖日期，无 "Initiating Coverage" 字样，也无评级起始日。
- 判定：**未见历史图，且覆盖期长度不可核**。属载体不全（4 页更新件通常不带历史图，历史图在同系列完整报告中）。

### 依据

- p.1｜Price at 8 Jul 2026 (USD) 603.12 Price target 810.00 52-week range 790.00 - 525.72
- p.1｜Company Update
- p.1｜IMPORTANT RESEARCH DISCLOSURES AND ANALYST CERTIFICATIONS LOCATED IN APPENDIX 1.

## Q10 · **九项冲突披露**在不在**首页**（或指明页码）？

首页**没有**样板句指明披露在第几页，只有一句"重要研究披露与分析师认证见附录 1"。**附录 1 不在这 4 页里**，故九项逐条无内容可核。各项"未见"的直接理由相同（附录缺失），但可能被误当成本项确认的相邻句子各不相同，故逐条分开写：

| 项 | 有/无 | 位置与内容 |
|---|---|---|
| ① 分析师及家庭持仓 | 未见 | 查了全部 4 页正文，无任何"分析师本人或家庭成员持有 META"的句子。唯一相近的是署名栏（Benjamin Black、Kunal Madhukar、Raymond Wong、Benjamin Hui），只有姓名与电话、无持仓声明——署名≠持仓披露，不能替代 |
| ② 报酬是否挂钩投行收入 | 未见 | 无任何报酬构成句。首页那句 "Deutsche Bank does and seeks to do business with companies covered" 是机构业务关系声明，讲公司要不要做生意，不是分析师报酬结构，主体与事项均不符 |
| ③ 近 12 个月主/副承销或收取投行报酬 | 未见 | 全文无 manager / co-manager / underwriting / 承销名单，也无"过去 12 个月收到投行报酬"句。**这是缺失最实质的一项**：META 属超大盘股，DB 是否为承销商直接影响本件独立性判断，而本件对此全空白 |
| ④ 未来 3 个月是否寻求投行费 | 未见 | 无 "next 3 months / intends to seek" 类句子。缺失同上 |
| ⑤ 近 12 个月非投行服务报酬 | 未见 | 无 "products and services other than investment banking" 类句子 |
| ⑥ 是否客户及服务类型 | 未见 | 无客户关系句、无服务类型列举。首页通用句只说"做并寻求做业务"，未指明 META 是否为客户、属哪类服务；四要素（谁·何时·什么服务·原文）无一落地 |
| ⑦ 实益持有该类普通股 ≥1% | 未见 | 无 beneficially owned / 1% or more 类句子。DB 的持股披露惯常在附录以名单形式给出，本件未附，故只能判"本件未见"，不能判"DB 未持股" |
| ⑧ 是否做市 | 未见 | 无 market maker / liquidity provider 类句子。全文唯一"流动性"语境是算力市场的 "constrained compute market"，与证券做市无关，不可误读 |
| ⑨ 分析师过去 12 个月是否从标的收酬 | 未见 | 无 "analyst received compensation from the subject company" 句，也无反向的"未收取"认证句——**连认证段都没有**；首页只是一个指针（"ANALYST CERTIFICATIONS LOCATED IN APPENDIX 1"），指针本身不是认证 |
| ⑩ 其他重大冲突 | 未见 | 无董事关联、无内部人持股、无关联方交易披露。正文提到 Meta 与 Broadcom 合作设计、台积电代工（Reuters 转述），这是标的公司的供应链关系，与 DB 的冲突无关，不构成本项 |

**判定：九项全为"本件未见"，性质是披露附录未随件，不是机构未披露。** 因此冲突披露不可核验；引用其 Buy/810 时必须标注"冲突披露未见，独立性无法评估"。此项需主控裁。

### 依据

- p.1｜IMPORTANT RESEARCH DISCLOSURES AND ANALYST CERTIFICATIONS LOCATED IN APPENDIX 1.
- p.1｜Deutsche Bank does and seeks to do business with companies covered in its research reports. Thus, investors should be aware that the firm may have a conflict of interest that could affect the objectivity of this report.
- p.1｜Benjamin Black, CFA
- p.4｜Source : Company documents; Bloomberg Finance LP; Deutsche Bank

## Q11 · 他的**风险章挂了数字吗**？

**没有风险章；下行侧零量化，量化全部在 upside 一侧。**

- 全文无以 "Risks" 为题的段落（首页 "Valuation & Risks" 只是标签、无正文）。关于风险只有两句方向句：承认市场对 capex 的担忧（"7GW 是个大数字，街头估计可能还得往上"），以及抛售夸大财务负担、低估收入机会。
- **可写成"若…⇒…"的只有上行方向**（源自 A/B/C 情景表，不是风险章）：
  - 若富余容量占比取 30%/40%/50%、每 MW 收入取 1,000/1,250/1,500 万美元 ⇒ FY27 EPS 37.47/40.11/44.17 美元，对共识 +6.7%/+14.2%/+25.8%。
  - 若增量边际取 50%/62.5%/75% ⇒ 营业利润率 35.5%/36.9%/39.1%，较共识 +70/+205/+428 bp。
- **下行侧完全没有对应表**：没有"若 capex 超预期 X 亿 ⇒ EPS 减 Y"、没有"若容量卖不出去 ⇒ 目标价降 Z%"。报告自己承认"更高的 D&A 会抵销一部分"，但**只给定性、不给数**——本件最不对称之处：上行三档算到小数点后两位，下行一句"会更温和"。
- 判定：**"只有上行量化、无下行风险列示"**；不是样板风险（连模板条目都没有），而是**风险节整体缺位**。与上一题第 3 件判定呼应。

### 依据

- p.2｜we would not dismiss the market’s capex concern; 7GW of incremental capacity is a large number, and it appears Street estimates may still need to move higher.
- p.2｜We recognize that there would be higher D&A expense associated with the faster buildout. However, given the likelihood that Meta's 2027 capex may not be that much above where we think the buyside is currently, the likely impact could be more modest.
- p.4｜(x) % Incremental Margins 50.0% 6    2.5% 7    5.0% DB assumption: Sales and customer support costs
- p.4｜(=) % Potential Upside to GAAP EPS 6.7% 1    4.2% 2    5.8%

## Q12 · 这份报告落在**静默期窗口**内吗？

**判「否」，但只能判到"本件无证据"，不能判到"已排除"。**

- **发布日**：2026 年 7 月 9 日（周四），定价基准 7 月 8 日收盘。
- **发行日**：全文无 IPO、二次发行、跟随发行的定价日或时间线；无 manager / co-manager / underwriting syndicate 字样；附录 1（通常含承销关系）未随件。
- **本件性质**：常规公司更新（Company Update，副标题 Buyers of Capacity），由 Reuters 报道（Meta 拟把数据中心容量翻倍至 14GW、9 月量产 Iris 芯片）触发，属事件驱动的覆盖更新，不是新股覆盖、不是发行配套文件。
- **判定**：无发行时间线 ⇒ 无法计算 10 天/3 天窗口 ⇒ 按「否」处理。
- **残余风险（须记）**：因附录 1 缺失，无法确认 DB 近 12 个月是否为 META 承销商。若 DB 在 2026 年 7 月上旬参与 META 二次发行，则 7 月 9 日的更新可能落在 3 天窗口内。此项依赖披露外信息，标为**待核**，是本件形式缺陷的连带后果。

### 依据

- p.1｜9  July 2026
- p.1｜Company Update
- p.1｜Media reports (link) suggest Meta plans to 1) double its datacenter capacity to 14GW in 2027, and 2) accelerate mass production of its in-house chip "Iris" to starting in September, i.e. in two months.
- p.1｜IMPORTANT RESEARCH DISCLOSURES AND ANALYST CERTIFICATIONS LOCATED IN APPENDIX 1.
