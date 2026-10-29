---
id: 03-broker-research-2026-03-05-4
cat: "03"
sub: broker-research
template: broker-research
template_version: 2
date: 2026-03-05
time: "00:00"
title: "03-broker-research-2026-03-05-4"
kind: "broker-research"
issuer: ""
ticker: META
source_pages: 17
---

> 骨架已生成，答案待填。原文：`corpus/materials/mineru/03-broker-research-2026-03-05-4/full.md`（17 页）。
> 填写纪律见 `docs/EVIDENCE-SPEC.md`：有答案必有依据块，块须逐字，页码 `p.N` 以源 PDF 为准。

## Q1 · 他的**关键假设取值**各是多少？

本件是美国互联网板块的估值策略报告（US Emerging Internet／US Internet），不是单公司模型，六项经营假设一项都没有对应行。逐项：

- **收入增速**：材料未给出此项——虽有一张题为"Consensus 2026E Y/Y Revenue Growth"的图，但文本层只有图题、没有任何数值，按纪律不从图题推数。
- **毛利率**：表内未给该行（全篇只有 EV/NTM Adj. EBITDA 倍数与 GAAP P/E 两类估值行，无毛利科目）。
- **营业利润率**：表内未给该行。
- **资本开支**：公司级未给；只有一句定性"mega-cap tech investing substantial FCF into data center capacity"。
- **实际税率**：表内未给该行。
- **摊薄股数**：表内未给该行。
- **本件真正在用的假设链（估值口径三件）**：① EV/NTM Adj. EBITDA 倍数——篮子中位数 15.9x（2025-11-01）降到 11.8x（2026-03-04），报告正文口径为"16x 降至约 12x"；② 2027E GAAP P/E——中位数 22.5x，标普 500 为 20.2x；③ PEG——用 2026–2028 两年 EPS CAGR 计算（报告明说这样取是为避开一次性项目、稀释小基数高增长），篮子 0.8x、标普 1.4x。
- **单票口径示例（META）**：EV/NTM Adj. EBITDA 13.7x→13.2x；2026 GAAP P/E 22.5x、2027 19.4x；2026–2028 EPS CAGR 17%；PEG 1.1x。

### 依据

- p.1｜The median EV/NTM Adj. EBITDA multiple for our Internet basket has compressed from 16x in November to \~12x currently.
- p.1｜The median 2027E GAAP P/E multiple now also sits at 22.5x vs. the S&P500 at 20x (Exhibit 6).
- p.1｜The implied PEG ratio for the group is 0.8x vs. the broader market at 1.4x (we use a 2YR CAGR in forecasts to avoid one-timers and dilute the effect of growth off a small base).
- p.6｜<tr><td>META</td><td>22.5x</td><td>19.4x</td><td>17%</td><td>1.1x</td></tr>
- p.6｜<tr><td>S&amp;P 500</td><td>23.4x</td><td>20.2x</td><td> 14%</td><td> 1.4x</td></tr>
- p.5｜<tr><td>META</td><td>13.7x 13.2x</td><td> -3%</td></tr>
- p.6｜EXHIBIT 7: The market continues to expect strong revenue growth across the sector.

## Q2 · **他和我差在哪一项、哪一年**？差多少？

我方模型数值不在本份材料内，逐行"他 vs 我"的对照需跨批（交主控）。本材料内能做的是"他本期 vs 他上期"——同一篮子、同一指标、两个时点：

| 指标（EV/NTM Adj. EBITDA） | 2025-11-01 | 2026-03-04 | 变动（原文口径） |
|---|---|---|---|
| 篮子中位数 | 15.9x | 11.8x | −26% |
| META | 13.7x | 13.2x | −3% |
| GOOGL | 16.7x | 16.1x | −4% |
| AMZN | 13.8x | 11.0x | −20% |
| PINS | 12.7x | 7.0x | −45% |
| ZG | 22.4x | 12.8x | −43% |

差在哪一项：差在**倍数**，不在盈利——四个月内中位数估值砍掉 26%，而 EPS 序列（2025A/2026E/2027E）只有一个版本、没有改过，说明这一轮是纯 de-rating。差在哪一年：差异不落在某个财年的金额上，而落在 2026–2027 两个预测年的**倍数**上；报告另给了 GAAP P/E 的跨年对照（2026 22.5x → 2027 19.4x，META），那是年度滚动不是估计修正。

另有一条相对的"他 vs 市场"对照可用：中位数 2027E GAAP P/E 22.5x 对标普 500 的 20.2x（高 11%，自算），PEG 0.8x 对 1.4x（低 43%，自算）。我方该项未定 ⇒ 记缺口。

### 依据

- p.5｜<tr><td>Median</td><td>15.9x 11.8x</td><td>-26%</td></tr>
- p.5｜<tr><td>META</td><td>13.7x 13.2x</td><td> -3%</td></tr>
- p.5｜<tr><td>AMZN</td><td>13.8x 11.0x</td><td>-20%</td></tr>
- p.5｜<tr><td>PINS</td><td>12.7x 7.0x</td><td>-45%</td></tr>
- p.5｜<tr><td>GOOGL</td><td>16.7x 16.1x</td><td>-4%</td></tr>
- p.6｜<tr><td>SNAP Median</td><td>-28.1x 26.1x</td><td>-52.2x 22.5x</td><td>-46% 23%</td><td>NA 0.8x</td></tr>

## Q3 · 他的**财年是谁的财年**？

列头是 2025A／2026E／2027E，只标年份不标月末，按日历年处理并注明"推定"。

关键的一句口径证据在表注：CHWY 因报告日历不同，其日历年比其他公司**提前一年**——这句话反证"其余标的按日历年"，也说明本表并非所有行同口径，跨行比较要先对齐。另需记三处 pro-forma 调整：ETSY 2025 收入、EBAY 2025/2026 收入按 Depop 交易做 pro-forma；DASH 2025 收入按 Deliveroo 收购做 pro-forma；UBER 2025 收入为 pro-forma 且按 2026 年起英国（除伦敦外）会计变更调整；LYFT 2025 收入为 pro-forma，剔除 4Q25 的 1.68 亿美元法律费用并并入 FREENOW。

结论：本件财年是**公司自身的日历年（推定）**，可直接与日历年末共识比；但 CHWY 差一年、四家做过 pro-forma，不能整表当同一口径。

### 依据

- p.6｜CHWY calendar year is 1 year ahead of others due to a different reporting calendar.
- p.6｜ETSY 2025 revenue and EBAY 2025 and 2026 revenue are pro-forma to reflect the impact of Depop transaction. DASH 2025 revenue is pro-forma to account for the impact of Deliveroo acquisition.
- p.7｜adjusted to reflect UK (ex-London) accounting changes beginning in 2026. LYFT 2025 revenue is pro-forma and adjusted to exclude the impact of \$168M legal charges in 4Q25 and include the impact of FREENOW acquisition.
- p.2｜<table><tr><td colspan="4">4 Mar 2026</td><td colspan="2">TTM</td><td colspan="4"> Adjusted EPS</td><td colspan="3">Adjusted P/E (x)</td></tr>

## Q4 · **预测修正**：改了哪一项、从多少改到多少？改的是**假设**还是**结论**？

只有方向、没有幅度，按纪律不补基数。

全文唯一一句自家估计的修正表述是"Rideshare／Delivery 的 EBITDA 修正小幅为负"，没有旧值、新值或百分比 ⇒ 记"**仅方向无幅度**"。这句动的是**假设**（EBITDA 预测），方向向下，幅度不可核。

其余可能被误读成"修正"的三处都要剥开：① 倍数从 16x 到 12x 是**市场价格**变化，不是他改预测；② 2026 GAAP P/E 22.5x 与 2027 19.4x 的差是**年度滚动**（分母换年），不是修正；③ "KPI revisions stagnating or turning negative"是在描述卖方共识整体，不是他家自己的修订。

评级与目标价这一期没有可核的旧值——ticker 表在文本层严重错行（行标与数字无法逐行对齐），故不断言"上调/下调"。判"不重要（只有方向、无幅度，且不构成完整假设变更链条）"。

### 依据

- p.1｜(1) KPI revisions stagnating or turning negative (e.g., modestly negative EBITDA revisions in Rideshare/ Delivery and mega-cap tech investing substantial FCF into data center capacity)
- p.1｜The market is clearly debating the multi-year durability of these business models, not the next few quarters.
- p.5｜<tr><td>Median</td><td>15.9x 11.8x</td><td>-26%</td></tr>
- p.6｜<tr><td>META</td><td>22.5x</td><td>19.4x</td><td>17%</td><td>1.1x</td></tr>

## Q5 · 他给了**情景**吗？各自驱动假设是什么？

**单情景**，外加一层"熊市叙事 vs 基本面"的不对称框架。全文无 Bull／Base／Bear 三档目标价，每只票只有一个 PT；报告明说自己没有"银弹"，把上行写成条件句：AI 时间线若延长、或大资本开支方证明 durable ROIC、或垂直整合的 AI 助手（类比 AMZN 与 Rufus）跑通，情绪才修复。

驱动假设只有一条：**倍数已在历史谷底**（篮子中位数 EV/NTM Adj. EBITDA 11.8x，与过往低点一致），故在盈利不下修的前提下下行有限、上行靠叙事反转。差在哪一端：差别全在**倍数／情绪**，不在经营假设——报告没有为任何情景给出收入或利润率的差异值，因此也不存在"目标价差三成而假设只差一个点"的情形，这里连目标价情景都没有。

反向风险方向也点了名：若头部实验室把重心从 2C 转向 B2B（Anthropic 企业收入 run-rate 抬升、OpenAI 近期产品与合作为证），消费互联网的"被替代"叙事会拖得更久。

### 依据

- p.1｜This is in-line with recent trough levels (Exhibit 4).
- p.1｜We won’t pretend to have the silver bullet. The world is moving quickly, and the nature of software and technology development is changing.
- p.1｜Any extension of timelines around AGI capabilities is probably good for the Consumer Internet basket (ex-Cloud).
- p.2｜On US Emerging Internet, we rate DASH, ZG, UBER, and CART Outperform. On US Internet, we rate META, AMZN, and PINS Outperform. We rate the rest of our coverage Market-Perform.

## Q6 · 他用了哪几种**估值方法**？**能互相印证吗**？

三把尺子并列，全部是**相对估值**，没有 DCF、没有 WACC、没有永续增长率：

1. **EV/NTM Adj. EBITDA 倍数**——逐票两个时点（2025-11-01 与 2026-03-04）并列，给 % 变动与中位数；
2. **GAAP P/E**——2026E 与 2027E 两列，并特意与标普 500（23.4x／20.2x）并排；
3. **PEG**——用 2026–2028 两年 EPS CAGR 折算，篮子 0.8x 对大盘 1.4x。

能不能互相印证：只能"部分互证"，不能复算目标价。互证的部分是三种尺子指向同一结论——该篮子无论按 EV/EBITDA、GAAP P/E 还是 PEG 都已到或低于历史区间（P/E 略高于大盘但 PEG 显著低于大盘）；不能的部分是三者都没落到"目标价＝倍数×指标"的等式上，ticker 表只给 PT 数字、不给倍数与指标年份，无法验证目标价用的是哪把尺子。报告自己也承认"估值本身不是催化剂"，即这些倍数只用于定位、不用于定价。

### 依据

- p.5｜<table><tr><td colspan="3">EV/NTM Adjusted EBITDA Multiple</td></tr><tr><td>Ticker</td><td>1-Nov-25 4-Mar-26</td><td>% Change</td></tr>
- p.6｜<table><tr><td>Ticker</td><td>2026 GAAP P/E</td><td>2027 GAAP P/E</td><td>2026-2028 EPS CAGRPEG Ratio (on 2026-2028 CAGR)</td><td></td></tr>
- p.2｜Valuation alone is not a catalyst in this sector, but offers some perspective on where things currently stand following the sell-off.
- p.1｜The implied PEG ratio for the group is 0.8x vs. the broader market at 1.4x

## Q7 · 目标价的**依据 / 估值方法解释 / 风险列示**齐不齐？

三件**全缺**，判"未见依据"，形式不合规，必须上报。

1. **目标价由哪个方法算出**——未见。附录 VALUATION METHODOLOGY 只有一句"本报告覆盖六家以上公司，估值方法与其他公司披露请访问网站"，PDF 内无逐票方法。
2. **方法的关键输入**——未见。ticker 表只列 Price Target，不列目标倍数与指标年份；正文三张倍数表是横截面比较（已发生的倍数），不是目标价推导的输入。且 ticker 表文本层错行严重，连"PT 对应哪一行"都要靠外部信息才能对齐，更不可能复算。
3. **可能阻碍达成目标价的风险列示**——未见。附录 RISKS 与估值方法同构，同样只给外链；正文有实质风险叙事（AI 长期脱媒、白领岗位受冲击的宏观风险、超大规模厂商把 FCF 投入数据中心、KPI 修正转负），但没有一条挂到具体目标价或给出幅度。

结论：本件目标价"有数无据"，且表体文本层错行，属形式要件缺三件；引用时只能当情绪与估值定位参考，不能当定价依据。

### 依据

- p.9｜This research publication covers six or more companies. For valuation methodology and other company disclosures: Please visit: https://bernstein-autonomous.bluematrix.com/sellside/Disclosures.action.
- p.9｜This research publication covers six or more companies. For risks and other company disclosures:
- p.6｜<tr><td>Ticker</td><td>2026 GAAP P/E</td><td>2027 GAAP P/E</td><td>2026-2028 EPS CAGRPEG Ratio (on 2026-2028 CAGR)</td><td></td></tr>
- p.1｜(3) the AI pain trade, covering both Software and Consumer Internet on the long-term disintermediation risk from AI + broader macro risks from white collar work disruption.

## Q8 · **评级分布三件**（三档占比 · 投行关系占比 · 观测时点）齐不齐？

两件齐、一件缺。

1. **三档占比**（Global Rating Distribution）：Outperform 51.4%、Market-Perform（Bernstein 品牌）/Neutral（Autonomous 品牌）34.7%、Underperform 13.9%。
2. **各类别中过去 12 个月有投行关系的占比**（Investment Banking Relationships 列）：Outperform 16.8%、Market-Perform/Neutral 18.7%、Underperform 13.4%。
3. **观测时点**——**缺**。表头与表体后都没有 "as of" 日期，也没有"按季更新"的脚注；表头带星号（Investment Banking Relationships*），但对应脚注在本件文本层不存在。评级定义一节只写"评级基于未来 12 个月相对表现"，不含观测日。因此无法确认这张表用的是哪一季末，也无法核对它与发布日（2026-03-05）的间距。

口径提示：三档按相对表现定义——跑赢基准 15pp 以上为 Outperform、±15pp 内为 Market-Perform、跑输 15pp 以上为 Underperform，故三档不等于买卖建议。

### 依据

- p.11｜<tr><td rowspan=1 colspan=1>Outperform</td><td rowspan=1 colspan=1>BUY</td><td rowspan=1 colspan=1>51.4%</td><td rowspan=1 colspan=1>16.8%</td></tr>
- p.11｜<tr><td rowspan=1 colspan=1> Market-Perform (Bernstein Brand) Neutral (Autonomous Brand)</td><td rowspan=1 colspan=1>HOLD</td><td rowspan=1 colspan=1>34.7%</td><td rowspan=1 colspan=1>18.7%</td></tr>
- p.11｜<tr><td rowspan=1 colspan=1>Underperform</td><td rowspan=1 colspan=1>SELL</td><td rowspan=1 colspan=1>13.9%</td><td rowspan=1 colspan=1>13.4%</td></tr>
- p.11｜DISTRIBUTION OF EQUITY RATINGS/INVESTMENT BANKING SERVICES
- p.9｜• Outperform: Stock will outpace the market index by more than 15 pp

## Q9 · **评级 / 目标价历史走势图**在不在（含赋改日期）？

声明有图、文本层无数据，判**未见**。

附录有标题 PRICE CHARTS/ RATINGS AND PRICE TARGET HISTORY，正文只有一句外链；另有一段"2024 年 4 月 1 日之前由 Sanford C. Bernstein & Co., LLC. 发布评级与目标价信息"的公司清单（DASH、EBAY、ETSY、LYFT、CART、UBER、W、ZG、GOOGL、META、AMZN、SNAP、PINS），指向"下图"，而图不在文本层。

能读到的只有当期截面：评级（META、AMZN、PINS 为 Outperform，其余覆盖为 Market-Perform）与每只一个 PT 数字，无生效日期、无变动条数。覆盖起点可从"2024-04-01 之前由 SCB 发布"推知己逾两年，但最近一次评级/PT 变动日期在本件拿不到。

结论：声明有图、文本层无数据，未见；不能写"覆盖不足一年"。

### 依据

- p.11｜PRICE CHARTS/ RATINGS AND PRICE TARGET HISTORY
- p.11｜This research publication covers six or more companies. For price chart and other company disclosures, please visit https:// bernstein-autonomous.bluematrix.com/sellside/Disclosures.action or you can write to the Director of Compliance, Bernstein Institutional Services LLC, 245 Park Avenue, New York, NY 10167.
- p.11｜Prior to April 1, 2024, Sanford C. Bernstein & Co., LLC. issued the ratings and price target information in the graph(s) below for the following companies: DoorDash Inc, eBay Inc, Etsy Inc, Lyft Inc, Maplebear Inc, Uber Technologies Inc, Wayfair Inc, Zillow Group Inc, Alphabet Inc, Meta Platforms Inc., Amazon.Com Inc, Snap Inc and Pinterest Inc.

## Q10 · **九项冲突披露**在不在**首页**（或指明页码）？

首页只给一句样板指路："See the Disclosure Appendix of this report for required disclosures, analyst certifications and other important information."——指向文末附录、不给页码。逐项内容在 DISCLOSURE APPENDIX 的 REQUIRED DISCLOSURES／CONFLICTS OF INTEREST／CERTIFICATION 三节。逐项核对：

| 项 | 有/无 | 位置与内容 |
|---|---|---|
| ① 分析师及家庭持仓 | 有（限"参与撰写的 associate"，非分析师本人） | 附录三句并列：一位参与本报告的人员对 Alphabet、Meta、Amazon 的股权或债务证券有财务利益。三只均为本文标的（名单含 META／GOOGL／AMZN，不含 PINS、DASH、UBER 等其余票）；但原文为 "an associate contributing to this report"，未指明是署名分析师本人或家庭成员 |
| ② 报酬是否挂钩投行收入 | 有（明确否定） | "No analysts are compensated based on performance in, or contributions to, generating investment banking revenues."；取酬依据为 account penetration、productivity、investment ideas 的主动性 |
| ③ 近 12 个月主/副承销或收投行报酬 | 有 | 两条并列：managed or co-managed 公开/144A 发行——Alphabet、Amazon；收投行服务报酬——Alphabet、Amazon。**含本文标的 GOOGL、AMZN**，不含 META |
| ④ 未来 3 个月是否寻求投行费 | 有 | "expect to receive or intend to seek compensation for investment banking services in the next three months from Amazon.Com Inc."——只列 1 家，**含 AMZN**，不含 META、GOOGL |
| ⑤ 近 12 个月非投行服务报酬 | 有 | "products or services other than investment banking … from the following clients: Alphabet Inc and Amazon.Com Inc."——只列 2 家，**含 GOOGL、AMZN**，不含 META |
| ⑥ 是否客户及服务类型 | 有 | "investment banking client relationship during the past twelve months with Alphabet Inc and Amazon.Com Inc."——**含 GOOGL、AMZN**；本件未另列非投行证券相关服务客户名单，故服务类型只有投行一类 |
| ⑦ 实益持有该类普通股 ≥1% | 有，但**不含本文标的** | 两条 1% 声明：SG 及关联方持 ≥1% 的是 Etsy；AB 及关联方持 ≥1% 的是 Reddit。**META 两条都未进**——Meta 只出现在"Bernstein Autonomous LLP 或 BSG France SA 持 0.5% 以上净多/空"那一档（与 Alphabet、Reddit 并列），门槛与主体均不符，不能算本项 |
| ⑧ 是否做市 | 有 | 两处：股权做市/流动性提供名单含 DoorDash、eBay、Lyft、Uber、Wayfair、Zillow、Alphabet、**Meta**、Amazon、Pinterest、Reddit；债务证券做市名单含 Alphabet、**Meta**、Amazon。本文标的 META 在两个名单里都有 |
| ⑨ 分析师过去 12 个月是否从标的收酬 | 未见（母公司层面） | CERTIFICATION 只说报酬不与**具体推荐/观点**挂钩、②那条说不与**投行收入**挂钩，两句都不回答"是否从标的公司收取报酬"。文本里确有"have not received any compensation for investment banking services … from the subject company"一组否定句，但那是 SCB India 就"印度公司"所作的属地声明，本文标的均为美国公司，主体与标的均不符，不能移用 |
| ⑩ 其他重大冲突 | 有 | SG 及/或关联方担任 **Alphabet 债券发行的 Joint Bookrunner**（EUR，3/6/9/13/19/39Y）——与本文标的 GOOGL 直接相关；另有评级分布表所列投行关系（见 Q8） |

红旗提示：该机构对 META（股权与债务）做市 ＋ 其关联方对 META 持 0.5% 以上净多/空 ＋ 参与撰写人员持 META 财务利益 ＋ 对 GOOGL/AMZN 有 12 个月投行关系并在未来 3 个月继续寻求投行费 ⇒ 引用其"META、AMZN、PINS 跑赢"与 GOOGL 观点时应作立场折价；META 未被列入 1% 实益持股与投行费名单，冲突强度低于 GOOGL/AMZN。

### 依据

- p.1｜See the Disclosure Appendix of this report for required disclosures, analyst certifications and other important information.
- p.9｜An associate contributing to this report has a financial interest in the equity or debt securities of Meta Platforms Inc..
- p.13｜No analysts are compensated based on performance in, or contributions to, generating investment banking revenues.
- p.11｜SG and/or its affiliates beneficially own 1% or more of a class of common equity securities of the following company: Etsy Inc.
- p.11｜AB and/or its affiliates beneficially own 1% or more of a class of common equity securities of the following company: Reddit Inc.
- p.11｜Bernstein Autonomous LLP or BSG France SA, beneficially, has either a net long or short position of 0.5% or more of the total issued share capital of a class of common equity securities of the following MiFID eligible securities: Alphabet Inc, Meta Platforms Inc. and Reddit Inc.
- p.12｜Certain affiliates of Bernstein act as market maker or liquidity provider in the equities securities of: DoorDash Inc, eBay Inc, Lyft Inc, Uber Technologies Inc, Wayfair Inc, Zillow Group Inc, Alphabet Inc, Meta Platforms Inc., Amazon.Com Inc, Pinterest Inc and Reddit Inc.
- p.11｜SG and/or its affiliate.s is acting as Joint Bookrunner for Alphabet Inc's bond issue (EUR, 3, 6, 9, 13, 19, 39Y).

## Q11 · 他的**风险章**挂了数字吗？

**未见风险列示**——既非"挂了数字"，也非"样板风险"，而是风险章缺失：附录 RISKS 只有一句"本报告覆盖六家以上公司，风险与其他公司披露请访问网站"，与估值方法共用同一条外链；PDF 内没有任何个股风险条目，也没有 WACC／永续增长率／目标倍数对 PT 的敏感度表。

正文可捡到的方向性风险共 3 条，均无百分点或金额：AI 长期脱媒（软件与消费互联网同时受压）、超大规模厂商把大量 FCF 投入数据中心容量、白领岗位受 AI 冲击带来的宏观风险。另有一条量化但属"已发生"而非"风险预测"——年初至今该组中位数跑输标普 500 达 −19%。

能否写成"若〔变量〕变 X ⇒〔某年〕EPS 或 PT 变 Y%"：不能。本件没有任何敏感度换算，唯一带数字的是历史倍数与历史跑输幅度。此缺口与 Q7 第 3 件同源，应与 Q7 合并上报。

### 依据

- p.9｜This research publication covers six or more companies. For risks and other company disclosures:
- p.3｜EXHIBIT 1: It has been a challenging start to the year for Internet stocks, with the median name in the group underperforming the S&P500 by -19%.
- p.1｜Bearish narratives have packed a bigger punch than efforts to defend the incumbents.
- p.1｜(3) the AI pain trade, covering both Software and Consumer Internet on the long-term disintermediation risk from AI + broader macro risks from white collar work disruption.

## Q12 · 这份报告落在**静默期窗口**内吗？

否。首次发布 2026-03-05 05:05 UTC、完成 2026-03-05 01:37 UTC；本件是板块估值策略评论（AI 熊市叙事与是否见底），不对应任何 IPO 或二次发行的定价，全文无发行时间线、无定价日、无承销团名单，也无 "Initiation" 字样。

附录虽有"过去 12 个月主/副承销"名单（Alphabet、Amazon），但只给相对时窗"in the past twelve months"，无具体发行日期，无法与 3 月 5 日相减判窗；且该名单不含 META（本文 frontmatter 标的），据此不能认定本件是某次发行的承销商研究。

结论：不落静默期窗口（IPO 后 ≥10 天、二次发行后 ≥3 天两条均无对应事件）。

### 依据

- p.1｜See the Disclosure Appendix of this report for required disclosures, analyst certifications and other important information. Alternatively, visit our Global Research Disclosure Website. First Published: 05 Mar 2026 05:05 UTC  Completion Date: 05 Mar 2026 01:37 UTC
- p.1｜Internet stocks have de-rated on a combination of rotation away from tech and worsening AI sentiment (both too much CapEx and too much disruption risk).
- p.12｜Affiliates of Bernstein managed or co-managed in the past twelve months a public offering of securities of Alphabet Inc and Amazon.Com Inc.
