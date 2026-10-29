---
id: 03-broker-research-2026-05-08-USEquityViewsMoreAIcapexat
cat: "03"
sub: broker-research
template: broker-research
template_version: 2
date: 2026-05-08
time: "00:00"
title: "03-broker-research-2026-05-08-USEquityViewsMoreAIcapexat"
kind: "broker-research"
issuer: ""
ticker: META
source_pages: 17
---

> 骨架已生成，答案待填。原文：`corpus/materials/mineru/03-broker-research-2026-05-08-USEquityViewsMoreAIcapexat/full.md`（17 页）。
> 填写纪律见 `docs/EVIDENCE-SPEC.md`：有答案必有依据块，块须逐字，页码 `p.N` 以源 PDF 为准。

## Q1 · 他的**关键假设取值**各是多少？

产品型不符：本件是 S&P 500 层面的组合策略件，不给单家公司损益表，因此"毛利率、营业利润率、实际税率、摊薄股数"四项材料未给出（指数层面没有这些口径）。它真正在用的是"现金流 → 现金用途"的分配假设，取值如下（金额为 S&P 500 合计，十亿美元）：

- **收入（销售）增速**：中位数 S&P 500 公司 2026 年 +7%、2027 年 +6%；这是研发模型的驱动项，不是指数加权收入。另引共识：中位数公司盈利 +10%/+11%，指数合计 EPS +22%/+15%。
- **资本开支**：2026E 1,724（+33%）、2027E 2,103（+22%）；其中五大超大规模厂商（AMZN、GOOGL、META、MSFT、ORCL）2025 年占 S&P 500 capex 的 32%，共识预计该组 2026 年 capex 7,550 亿美元（+83%），等于其经营现金流的 100%。
- **回购**：2026E 1,098（+3%）、2027E 1,153（+5%）——增速被 capex 挤压，是全文主线。
- **股息**：2026E 753（+6%）、2027E 791（+5%）。
- **研发**：2026E 837（+18%）、2027E 921（+10%）；META 占 S&P 500 研发的 10%，共识研发增速 39%（2026E）／19%（2027E）。
- **现金并购**：2026E 492（+80%）、2027E 566（+15%）。
- 合计现金使用 2026E 4,904（+21%）、2027E 5,534（+13%）；结构上 2027 年 55% 投向 capex 与研发，35% 投向回购与股息。

### 依据

- p.2｜Capital expenditures</td><td>$739</td><td>$892</td><td>$958</td><td>$1,077</td><td>$1,296</td><td>$1,724</td><td>$2,103</td>
- p.2｜Total cash use</td><td>$3,008</td><td>$3,244</td><td>$3,302</td><td>$3,638</td><td>$4,056</td><td> $4,904</td><td>$5,534</td>
- p.2｜We forecast 55% of cash spending will be allocated towards capex and R&D in 2027 compared with 35% to buybacks and dividends.
- p.8｜The median S&P 500 company is forecast to grow sales by +7% in 2026 and +6% in 2027.
- p.8｜META</td><td>Meta Platforms Inc</td><td>Comm Services</td><td>10%</td><td>39</td><td>19</td>
- p.6｜The five largest AI hyperscalers – AMZN, GOOGL, META, MSFT, ORCL – accounted for 32% of S&P 500 capex in 2025.

## Q2 · **他和我差在哪一项、哪一年**？差多少？

我方模型数值不在本份材料内，逐行"他 vs 我"的对照需跨批（交主控）。

本件附了共识数，所以做"他的估计 vs 报告所附共识"：

| 项目 | 他的值 | 报告所附共识 | 差额 |
|---|---|---|---|
| 2026E S&P 500 毛回购增速 | +3% | +11% | −8 个百分点（他更保守） |
| 2026E 五大超大规模厂商 capex | 未单列该组，只给 S&P 500 合计 +33% | 7,550 亿美元、+83% | 口径不同（组 vs 指数），不可直接相减 |
| 2027E S&P 500 capex 增速 | +22% | 未给 | 缺口 |

差异集中在**回购端**：他把 hyperscaler 的 capex 挤压当成主线，所以给 2026 年回购只有 +3%，比共识的 +11% 低 8 个点；capex 端他没有与共识对立的数，只是把共识的 7,550 亿美元（+83%）当作投入、把"2027 年减速"当作自己的判断。

### 依据

- p.2｜Share buybacks</td><td>71</td><td>3</td><td>(13)</td><td>19</td><td>9</td><td>3</td><td>5</td>
- p.10｜S&amp;P 500</td><td>100 %</td><td>11 %</td>
- p.1｜Consensus estimates show the largest AI hyperscalers spending \$755 billion on capex in 2026 (+83% year/year)

## Q3 · 他的**财年是谁的财年**？

不是任何公司的财年——本件的会计主体是 S&P 500 指数，列头 2021–2025 为实际值、2026E／2027E 为预测，全部按日历年计（2026 年即 2026 年 1–12 月）。因此与日历年末口径的共识可以直接比，不存在"公司财年 vs 日历年差一个季度"的换算问题。

需要注意的一点：文中引用的个股数据（如 META 的 2026 capex 区间、研发增速 39%）沿用各公司自己的日历财年，META 本身就是 12 月结账，与指数年度一致；本件没有建模任何非 12 月结账的公司，所以全套数可同日历年比较。

### 依据

- p.2｜Cash use ($billion)</td><td>2021</td><td>2022</td><td>2023</td><td>2024</td><td>2025</td><td>2026E</td><td>2027E</td>
- p.2｜We forecast S&P 500 cash spending will grow by +21% in 2026 and +13% in 2027.

## Q4 · **预测修正**：改了哪一项、从多少改到多少？改的是**假设**还是**结论**？

本件没有"我方上期 → 我方本期"的修正：全文找不到 old/new、prior/current、raise/lower our estimate 的句式，S&P 500 的 2026E／2027E 各项只有一列当期值，没有上一版基数。

但材料内记录了别人改的两层修正，且都落在**假设**（capex 上行）上：

- **共识层**：2026 年超大规模厂商 capex 在 1Q 财报季被上修超过 900 亿美元，共识全年达 7,550 亿美元（+83%）。
- **公司层**：Meta 把 2026 年 capex 区间上调 100 亿美元，理由是零部件涨价、其次是为未来产能追加的数据中心成本；微软称 2026 日历年 capex 约 1,900 亿美元，其中约 250 亿美元来自零部件涨价。

分层判定：改的是假设（capex 与成本），不是结论——他据此维持"capex 挤占回购、2027 年增速减速"的判断，且自己没给旧值，因此只能记"他引用的假设被上修"，不能记"他改了预测"。

### 依据

- p.6｜Analysts lifted 2026 capex estimates for the group by more than \$90 billion during 1Q earnings season.
- p.6｜Meta raised its 2026 capex range by \$10 billion, noting it “reflects our expectations for higher component pricing this year and, to a lesser extent, additional data center costs to support future year capacity.”
- p.6｜Microsoft stated “for calendar year 2026, we expect to invest roughly \$190 billion in capital expenditures, which includes approximately \$25 billion from the impact of higher component pricing.”

## Q5 · 他给了**情景**吗？各自驱动假设是什么？

单情景：只给 base case（2027 年 capex 增速继续为正但减速），没有 Bull/Bear 三档，也没有目标价可挂。

不过它给了一条可当上行情形用的**反向算式**，这是本件最有价值的情景线索：若 2027 年 capex 增速要与 2026 年持平，超大规模厂商需支出约 1.4 万亿美元，而共识预计该组经营现金流约 9,800 亿美元——缺口约 4,000 亿美元只能靠净负债增加来填。他的判断是：会看到增量发债，但最终仍是减速。

所以驱动差别落在"现金流能否支撑 capex"这一项，而不是收入或利润率：上行需要现金流上修或债务扩张，基准是减速。

### 依据

- p.7｜For 2027 capex growth to match 2026 capex growth, the hyperscalers would need to spend roughly \$1.4 trillion on capex. Consensus estimates that cash flows from operations for these companies will equal \$980 billion.
- p.7｜Without sharp upward revisions to hyperscaler cash flow growth, these companies would need to increase net debt by \$400 billion.
- p.7｜We expect incremental debt issuance among the group but ultimately expect a deceleration in the pace of capex growth.

## Q6 · 他用了哪几种**估值方法**？**能互相印证吗**？

产品型不符：本件不做股票估值，全文没有 P/E、EV/EBITDA、DCF、WACC、永续增长率或目标倍数，也没有目标价。它给的是 S&P 500 现金用途的**自下而上加总预测**（分超大规模厂商、能源、非能源三块拼出指数 capex），以及用回归解释现金支出的驱动因素——这是宏观/组合模型，不是估值模型。

因此"几种方法能否互相印证"不适用：只有一套现金流加总口径，没有第二套可交叉验证的估值输出。

### 依据

- p.16｜This research is focused on investment themes across markets, industries and sectors. It does not attempt to distinguish between the prospects or performance of, or provide analysis of, individual companies within any industry or sector we describe.
- p.6｜We separately estimate nominal capex for the hyperscalers, the S&P 500 Energy sector, and the S&P 500 ex-Energy to arrive at our aggregate S&P 500 capex forecast.

## Q7 · 目标价的**依据 / 估值方法解释 / 风险列示**齐不齐？

产品型不符：本件没有目标价，也没有评级，因此 2241(c)(1) 的三件（PT 由何方法算出、关键输入、阻碍达成 PT 的风险）都无从谈起。

材料自身的声明也印证这一点：它是跨市场、跨行业的主题研究，"不试图区分或分析单个公司的前景与表现"——个股评级与目标价不在其职能内。披露里对"目标价、评级、估值"的落点是"见上文公司特定披露"，而本件该段为空白页，只有页眉页脚，即没有需要披露的个股评级。

按产品型判不适用，不算形式缺件、不上报。

### 依据

- p.16｜Any trading recommendation in this research relating to an equity or credit security or securities within an industry or sector is reflective of the investment theme being discussed and is not a recommendation of any such security in isolation.

## Q8 · **评级分布三件**（三档占比 · 投行关系占比 · 观测时点）齐不齐？

未见，三件全无。

查证范围与结论：
- 查了 Disclosure Appendix 全段（Reg AC 认证、美国监管披露、非美辖区披露、general disclosures、分发与版权声明），没有任何 Buy/Hold/Sell 三档占比表，也没有"各评级类别中投行客户占比"那一行/列，更没有 as of 时点。
- 原因不是漏附：本件是主题/组合策略研究，明确声明"不区分也不分析单个公司的前景或表现"，其交易建议只是主题表达、不是对单一证券的推荐，因此不产生个股评级分布。GS 的三档分布表只随个股研究报告发布。
- 所以不能用"数报告里提到的股票条数"来替代——本件提到的 AMZN／GOOGL／META／MSFT／ORCL 只是 capex 组别成员，不带评级。

### 依据

- p.16｜This research is focused on investment themes across markets, industries and sectors. It does not attempt to distinguish between the prospects or performance of, or provide analysis of, individual companies within any industry or sector we describe.
- p.16｜Goldman Sachs conducts a global full-service, integrated investment banking, investment management, and brokerage business. We have investment banking and other business relationships with a substantial percentage of the companies covered by Global Investment Research.

## Q9 · **评级 / 目标价历史走势图**在不在（含赋改日期）？

未见。本件没有评级也没有目标价，全文（含披露附录）没有任何个股价格图、评级变动表或"as of"式的覆盖快照；提到的 AMZN／GOOGL／META／MSFT／ORCL 只作为 capex 组别成员出现，没有评级标记。

因此不是"图在但文本层读不出"，而是本件按产品型不产生该图——主题件不设个股覆盖，也就不存在"覆盖满一年须附历史图"的义务。

### 依据

- p.16｜Any trading recommendation in this research relating to an equity or credit security or securities within an industry or sector is reflective of the investment theme being discussed and is not a recommendation of any such security in isolation.
- p.15｜See company-specific regulatory disclosures above for any of the following disclosures required as to companies referred to in this report

## Q10 · **九项冲突披露**在不在**首页**（或指明页码）？

首页只有一句"for Reg AC certification and other important disclosures, see the Disclosure Appendix"，没有逐项样板句；逐项在 Disclosure Appendix。关键前提：本件是主题件，披露附录里没有"company-specific regulatory disclosures"实体段落（该页只有页眉页脚），所以九项多以**机构级通用条款**出现，落不到 META 这个标的。

| 项 | 有/无 | 位置与内容 |
|---|---|---|
| ① 分析师及家庭持仓 | 有（政策禁令，非个股申报） | 披露附录"Ownership and material conflicts of interest"：GS 政策禁止分析师、向分析师汇报者及其家庭成员持有其覆盖范围内的任何公司证券。主体是 GS 政策、标的是"覆盖范围内公司"、内容是禁止持有——但没有"META 持仓"的申报，故只有制度条、无标的级确认 |
| ② 报酬是否挂钩投行收入 | 有 | "Analyst compensation: Analysts are paid in part based on the profitability of Goldman Sachs, which includes investment banking revenues." 明示部分挂钩，且点名含投行收入 |
| ③ 近 12 个月主/副承销或收投行报酬 | 未见 | 附录称此类披露"见上文 company-specific regulatory disclosures"，但本件该段为空白页（仅页眉页脚），全文没有任何公司的承销、共同承销或投行报酬列名，META 自然也没有；查了美国监管披露段与 general disclosures，均无 |
| ④ 未来 3 个月是否寻求投行费 | 未见 | 同上，无任何公司级条目；仅有"we have investment banking and other business relationships with a substantial percentage of the companies covered"的泛述 |
| ⑤ 近 12 个月非投行服务报酬 | 未见 | 附录未设该条，也无任何公司列名；泛述句不区分服务类型，无法核验 |
| ⑥ 是否客户及服务类型 | 有（泛述，不落标的） | "Goldman Sachs conducts a global full-service, integrated investment banking, investment management, and brokerage business. We have investment banking and other business relationships with a substantial percentage of the companies covered by Global Investment Research."——未点名 META、未说服务类型，只能算"有泛述、无法核验本标的" |
| ⑦ 实益持有该类普通股 ≥1% | 未见（相近声明主体与标的均不符） | 唯一相近的是印度段："Goldman Sachs may beneficially own 1% or more of the securities ... of the subject company or companies referred to in this research report."主体是 GS 印度证券子公司、标的写"securities"而未限定普通股，且本件没有界定 subject company ⇒ 不能算"母公司持 META 普通股 ≥1%"，判未见 |
| ⑧ 是否做市 | 未见 | 附录把 market making／specialist role 列入 company-specific 披露，本件无该段；另有"Goldman Sachs trades or may trade as a principal in debt securities (or in related derivatives)"，标的是债务证券、不是股票做市，不算本项 |
| ⑨ 分析师过去 12 个月是否从标的收酬 | 未见 | Reg AC 认证只声明"观点未受公司业务或客户关系考虑影响"，是独立性声明；全文没有"某分析师从某标的收取报酬"的句子，也无按标的列示 ⇒ 判未见 |
| ⑩ 其他重大冲突 | 有（通用，不含标的确认） | "We and our affiliates, officers, directors, and employees will from time to time have long or short positions in, act as principal in, and buy or sell, the securities or derivatives, if any, referred to in this research"；另有"asset management area, principal trading desks and investing businesses may make investment decisions that are inconsistent with the recommendations"。均为机构级通用句，未落到 META |

红旗提示：本件对 META 无评级、无 PT、无公司级冲突披露；但 GS 自述与覆盖公司普遍存在投行关系、分析师报酬部分取决于含投行收入的公司盈利、公司及员工可能持有相关头寸 ⇒ 引用其 capex 预测时按卖方立场折价；就 META 本身，本件没有可用的具体冲突信息。

### 依据

- p.15｜Ownership and material conflicts of interest: Goldman Sachs policy prohibits its analysts, professionals reporting to analysts and members of their households from owning securities of any company in the analyst’s area of coverage.
- p.15｜Analyst compensation: Analysts are paid in part based on the profitability of Goldman Sachs, which includes investment banking revenues.
- p.15｜See company-specific regulatory disclosures above for any of the following disclosures required as to companies referred to in this report: manager or co-manager in a pending transaction; 1% or other ownership; compensation for certain services; types of client relationships; managed/co-managed public offerings in prior periods; directorships; for equity securities, market making and/or specialist role.
- p.15｜Goldman Sachs may beneficially own 1% or more of the securities (as such term is defined in clause 2 (h) the Indian Securities Contracts (Regulation) Act, 1956) of the subject company or companies referred to in this research report.
- p.15｜Goldman Sachs trades or may trade as a principal in debt securities (or in related derivatives) of issuers discussed in this report.
- p.15｜We, Ryan Hammond, Ben Snider, Jenny Ma, Daniel Chavez, Kartik Jayachandran and Christophe Sung, hereby certify that all of the views expressed in this report accurately reflect our personal views, which have not been influenced by considerations of the firm’s business or client relationships.
- p.16｜We and our affiliates, officers, directors, and employees will from time to time have long or short positions in, act as principal in, and buy or sell, the securities or derivatives, if any, referred to in this research, unless otherwise prohibited by regulation or Goldman Sachs policy.
- p.16｜Our asset management area, principal trading desks and investing businesses may make investment decisions that are inconsistent with the recommendations or views expressed in this research.

## Q11 · 他的**风险章**挂了数字吗？

挂了数字，但只有一条，且是宏观弹性而非个股敏感度。

正文明确给出：控制其他变量后，政策不确定性指数每上升 100 点，S&P 500 现金支出下降 10%，其中回购受损更重、下降 20%。这可以写成"若〔政策不确定性 +100 点〕⇒〔2026 年〕S&P 500 现金支出 −10%、回购 −20%"，符合"风险挂数字"的判据。

不足在于：本件没有风险章，这条弹性埋在正文对不确定性的讨论里；也没有分年拆解（2026E 与 2027E 各自受多少影响），更没有对 META 或任何单一标的的 EPS/PT 敏感度。因此判"有数字、但只有一条总量弹性"。

### 依据

- p.5｜Controlling for other variables, every 100 point increase in policy uncertainty is associated with a 10% decrease in S&P 500 cash spending, with buybacks faring particularly poorly (-20%).
- p.5｜Uncertainty Index is extremely elevated relative to history.

## Q12 · 这份报告落在**静默期窗口**内吗？

否。

- 发布日：2026 年 5 月 7 日 16:38 EDT（Portfolio Strategy Research）。
- 发行日：不适用——本件没有个股评级，披露附录也没有 company-specific 段，全文没有承销、共同承销、IPO、follow-on 或 pending transaction 的条目，找不到任何发行时间线可配对。
- 判定：这是指数层面的组合策略更新，不涉及承销商角色，因此不落静默期。限制在于：若日后发现 GS 在报告日前对文中提及的某家 hyperscaler 有未披露的承销安排，那属披露缺失问题，不是本件自身落窗。

### 依据

- p.1｜Portfolio Strategy Research 7 May 2026 | 4:38PM EDT
- p.15｜See company-specific regulatory disclosures above for any of the following disclosures required as to companies referred to in this report: manager or co-manager in a pending transaction; 1% or other ownership; compensation for certain services; types of client relationships; managed/co-managed public offerings in prior periods; directorships; for equity securities, market making and/or specialist role.

