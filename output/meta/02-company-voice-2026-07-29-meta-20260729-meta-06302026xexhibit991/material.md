---
# ── 材料身份（解析成 Material 的字段，键名不要改） ──
id: 02-company-voice-2026-07-29-meta-20260729-meta-06302026xexhibit991
cat: 02
sub: company-voice
# ── 模板身份：这份材料是用哪一版问法生成的 ──
template: company-voice
template_version: 2
# ── 材料元信息 ──
date: 2026-07-29
time: 08:00
title: Meta Reports Second Quarter 2026 Results
kind: 8-K Item 2.02 + EX-99.1 新闻稿
issuer: Meta Platforms, Inc.
ticker: META
source_pages: 3
---

<!--
  填写规则（给 agent）：

  1. 答案里**不要写页码、不要写括号引用** —— 正文保持干净的书面语，页码只出现在依据区。
  2. 每一行的「### 依据」**要把它支撑这个答案的原文全部登记进来**，不是登记一段就完。
     材料里有几处支撑就登几处（不同段落、不同页都分开登），格式一行一条：- p.12｜原文片段
  3. 原文片段必须是那一页里**原样抄下来的**：不改字、不概括、不加省略号、不换语序。
     抄不出来，就回 corpus/materials/<材料 id>/content.md 里再找一遍。
  4. 找不到任何原文支撑的那一句，**从答案里删掉**，或整句改成「材料未给出此项」。
     不允许留没有原文支撑的断言。
  
-->

## 1 · 他把**哪个指标放最前**、哪个**只提一句或埋在中间**？

**结论**：门面是收入（2026 年二季度，同比 +28%），真正的轴心是资本开支——费用指引、自由现金流、发债三处都由它带出；被埋起来的恰好是最难看的两项：自由现金流（一条带脚注的摘要行，同比 -91%）和回购（摘要里没有，现金流量表里是「—」）。说话人是 CEO Mark Zuckerberg 的具名引语；「CFO Outlook Commentary」一节只有职务、没有姓名，落款只给投资者关系 Chad Heaton 与媒体 Matt Tye。

**具体**：财务摘要表以收入 608.01 亿美元打头（2026 年二季度，同比 +28%），往下是成本费用 420.26 亿（+55%）、经营利润 187.75 亿（-8%）、经营利润率 31%（上年同期 43%）、净利润 158.48 亿（-14%）、摊薄每股 6.18 美元（-13%）。经营摘要的排序是 DAP 36.0 亿（2026 年 6 月均值，+3%）→ 广告展示 +14% → 单价 +12% → 收入（并附不变汇率 +27%）→ 成本（点出法律程序 24.0 亿、5 月裁员遣散 11.8 亿）→ 资本开支 310.8 亿（含融资租赁本金）→ 资本回报（只写股息 13.5 亿）→ 现金 902.64 亿 → 长期债务 836.64 亿 → 经营现金流 318.62 亿／自由现金流 7.84 亿 → 人头 75,472。自由现金流排在倒数第二行、带脚注、跌幅却是全篇最大（上年同期 85.49 亿）；回购金额摘要里一个字没有，翻到现金流量表才见「—」（上年同期 101.67 亿），249.1 亿新发债同样只在现金流程表出现。

**判断**：三处同指里，提及次数与解释关系都指向资本开支（费用指引被它推高、自由现金流被它压掉、缺口靠发债补），第三处「被追问时是否仍回到它」本件空缺——这是新闻稿，没有问答，只能记下这处不一致，不能替它补。以解释关系为准：主角是资本开支对现金的挤压，收入只是门面；摘要读下来会以为利润下滑全是 24 亿法律费用一次性所致，摸到现金流量表才知道更硬的变化是回购停摆与举债扩张。

### 依据
- p.1｜Revenue | $ | 60,801 | | | $ | 47,516 | | | 28 | % |
- p.1｜Costs and expenses | 42,026 | | | 27,075 | | | 55 | %
- p.1｜Net income | $ | 15,848 | | | $ | 18,337 | | | (14) | %
- p.1｜Diluted earnings per share (EPS) | $ | 6.18 | | | $ | 7.14 | | | (13) | %
- p.1｜Revenue was $60.80 billion, an increase of 28% year-over-year. Revenue on a constant currency basis would have increased by 27% year-over-year.
- p.1｜Capital expenditures, including principal payments on finance leases, were $31.08 billion.
- p.1｜Cash flow from operating activities was $31.86 billion, and free cash flow was $784 million.(1)
- p.1｜Dividend and dividend equivalent payments were $1.35 billion.
- p.1｜said Mark Zuckerberg, Meta founder and CEO
- p.1｜CFO Outlook Commentary
- p.1｜Chad Heaton
- p.2｜Repurchases of Class A common stock | &#8212; | | | (10,167) | | | &#8212;
- p.2｜Proceeds from issuance of long-term debt, net | 24,910
- p.3｜Free cash flow | $ | 784 | | | $ | 8,549 | | | $ | 13,170 | | | $ | 18,883 |


## 2 · 核心主题（执行 / 战略 / 市场 / 资本配置）**在报表里找得到对应吗**？

**结论**：主题是「AI 已经在加速核心业务」，成本与资本开支一侧对得上科目，收入一侧对不上任何可分离科目——AI 没有单独的收入行，也没有单独的分部。

**具体**：说话人是 CEO Zuckerberg，原话只说「已经在显现结果」，没有一个数字。可落地的三处：研发费用 216.56 亿（2026 年二季度，同比 +67%，上年同期 129.42 亿）、折旧摊销 63.56 亿（+46%）、资本开支 310.8 亿（含融资租赁本金；上年同期同口径 170.12 亿，本刊按购置物业设备 165.38 亿加融资租赁本金 4.74 亿折算，同比约 +83%）。收入侧能对上的只有分解式：广告展示 +14%、单价 +12%，乘出来约 27.7%，与收入 +28% 吻合，说明增长来自量与价的合成，材料没有把它归给 AI。对不上的部分：「打开全新企业机会」这句话在报表里找不到科目——其他收入 10.07 亿（+72.7%）只占收入 1.7%，Reality Labs 收入 4.31 亿、经营亏损 46.19 亿，都不是这句话的落点。分部仍是 Family of Apps 与 Reality Labs 两块，没有 AI 分部。

**判断**：主题在成本与资本开支上落地（研发、折旧、算力开支三条同步放大），在收入上无对应科目，属叙事无对应科目，不用行业逻辑替它补一行。可复核的只有一件事：AI 的账先记在费用和资产负债表上，收入侧还只有「加速」两个字。

### 依据
- p.1｜AI is accelerating our core business today, powering our next generation of products, and opening the door to entirely new enterprise opportunities
- p.1｜The results are already showing, and I'm optimistic about the potential ahead.
- p.1｜Ad impressions delivered across our Family of Apps increased by 14% year-over-year.
- p.1｜Average price per ad increased by 12% year-over-year.
- p.1｜Capital expenditures, including principal payments on finance leases, were $31.08 billion.
- p.2｜Research and development | 21,656 | | | 12,942 | | | 39,354 | | | 25,092 |
- p.2｜Depreciation and amortization | 6,356 | | | 4,342 | | | 12,355 | | | 8,242 |
- p.3｜Other revenue | 1,007 | | | 583
- p.3｜Reality Labs | 431 | | | 370
- p.3｜Reality Labs | (4,619) | | | (4,530)
- p.3｜RL includes our virtual and augmented reality related consumer hardware, software, and content.


## 3 · 问答里他是**直接给数字，还是打太极、换话题**？

**结论**：未见——本件没有问答，只有会前公告。查了全部三块：第一块是业绩稿与指引、第二块是报表与 non-GAAP 定义、第三块是分部与对账表，没有一处提问或回答。因此既不能算「给数」，也不能算「回避」。

**具体**：本件是 8-K 第 2.02 项下的 EX-99.1 新闻稿，电话会在发布当日稍晚举行，材料只写会开、会放回放、分析师电话会记录稿会后上网。问答里的给数／回避要向会后的记录稿取，届时才有逐字；把「没有问答」读成「管理层不敢答」是替材料加话。

**判断**：这一栏在本件上判不了，写作未见并注明查了哪里；若要判问答实质，须换到同一场电话会的记录稿。

### 依据
- p.1｜Webcast and Conference Call Information
- p.1｜Meta will host a conference call to discuss its results at
- p.1｜Following the call, a replay will be available at the same website.
- p.1｜Transcripts of conference calls with publishing equity research analysts held today will also be posted to the investor.atmeta.com website.


## 4 · **哪个问题被不同分析师反复追问**？给**基数**了吗？

**结论**：未见——本件没有分析师提问，无法计数。查了全部三块，无问答段落、无提问者姓名、无追问记录；按手册口径「两位以上提问者才算反复」，本件连一位都没有，不能给 0 之外的任何判断。

**具体**：可替代的线索只有「公司自己反复强调的那件事」，与「被追问」不是一回事：资本开支在三处出现（经营摘要、全年指引、对账表里的自由现金流扣减项），费用指引的下限上调被单独写一句，法律与监管风险被放在指引末尾加一句「可能最终造成重大损失」。这些是公司主动前置的，不是被问出来的。

**判断**：这一栏本件判不了，写未见并注明查了哪里；如要计数，须取同一场电话会记录稿逐条点提问人。

### 依据
- p.1｜Webcast and Conference Call Information
- p.1｜Transcripts of conference calls with publishing equity research analysts held today will also be posted to the investor.atmeta.com website.
- p.1｜We are raising the lower-end of our expense outlook to incorporate the $2.4 billion charges related to legal proceedings recognized in the second quarter.
- p.1｜Finally, we continue to monitor active legal and regulatory matters that could significantly impact our business and financial results.


## 5 · 同一问题**上一季怎么答**？措辞变了吗？（`预计→希望→正在努力` 的降级是领先信号）

**结论**：未见——本件只有本期新闻稿，没有上一季同一问题的逐字答法。查了全部三块，唯一的跨期文字是三处「prior outlook」的数值对照（资本开支、税率、费用下限），是数字不是措辞；因此判不了「预计→希望→正在努力」这类降级。

**具体**：能拿到的三点方向都是往上：资本开支从 125–145 亿（十亿美元）收窄到 130–145 亿，税率从 13–16% 升到 15–17%，费用下限上调以吸收 24 亿法律费用。措辞层面本件仍是「expect / anticipate / continue to expect」三种，与「希望」「正在努力」的降级不是一个量级；但这是同一期内部的用词，不是两季并排，不能当措辞变化的证据。

**判断**：这一栏本件判不了，写未见并注明查了哪里；要判降级，须把上一季（2026 年一季度）电话会的同题答法与本期并排。

### 依据
- p.1｜We anticipate 2026 capital expenditures, including principal payments on finance leases, to be in the range of $130-145 billion, narrowed from our prior outlook of $125-145 billion.
- p.1｜Absent any changes to our tax landscape, we expect our tax rate for the remaining quarters of 2026 to be between 15-17%, an increase from our prior outlook of 13-16%.
- p.1｜We are raising the lower-end of our expense outlook to incorporate the $2.4 billion charges related to legal proceedings recognized in the second quarter.
- p.1｜We continue to expect to deliver operating income this year that is above 2025 operating income.


## 6 · **指引**：区间是收窄还是放宽？有没有**撤回全年指引**？有没有"**重申 + 新增限定条件**"？**口径变了吗**？

**结论**：四条全年指引全部保留、无一条撤回；区间一收一平一上移：资本开支收窄且下限抬 50 亿美元，费用下限上调、上限不动，税率整体上移 2 个百分点，经营利润只有方向没有数字。说话人是「CFO Outlook Commentary」一节——只有职务、无具名发言人。

**具体**（金额单位美元，期间口径逐条标）：
- 三季度收入 610–640 亿（2026 年三季度，区间宽 30 亿、约为下限的 4.9%），基数＝2025 年三季度，本件未给该季收入数值；公司假设汇率对同比增速约 -1 个百分点。
- 全年费用 1,650–1,690 亿（2026 全年，宽 40 亿），下限上调以吸收二季度已确认的 24 亿法律费用；上半年实际 754.64 亿，隐含下半年 895.4–935.4 亿，环比上半年 +18.7%~+23.9%（本刊折算）。
- 全年资本开支 1,300–1,450 亿（2026 全年，含融资租赁本金），由 1,250–1,450 亿收窄：下限 +50 亿、上限不动，宽度从 200 亿压到 150 亿。上半年实际 509.18 亿（购置物业设备 491.13 亿＋融资租赁本金 18.05 亿），隐含下半年 790.8–940.8 亿。
- 全年经营利润「高于 2025 年」：只有方向，无区间、无基数数值，属单点定性，不可比中值。
- 税率：2026 年剩余季度 15–17%，由 13–16% 上调，两端各 +2 个百分点（不按全年、只按剩余季度）。
- 「重申 + 新增限定」并存：费用与资本开支是重申后加码，税率加了「若税制不变」这一前提，末尾另加法律与监管可能造成重大损失的一句。
**口径**：本期未改口径。non-GAAP 只有三项——不变汇率收入、不变汇率广告收入、自由现金流，全部是公司自定义口径，且每一项都配了 GAAP 对账（对账表在第三块）：不变汇率是把本期收入按上年月度汇率重算（外汇影响 -6.85 亿，故 608.01 亿→601.16 亿）；自由现金流＝经营现金流 − 购置物业设备 − 融资租赁本金（318.62 − 301.16 − 9.62＝7.84 亿）。资本开支同样是自定义口径「含融资租赁本金」，与现金流量表的「购置物业设备」不是同一个数（310.78 vs 301.16 亿）。

**判断**：这是一季「不撤指引、往紧里调」的动作——资本开支下限与税率同时上移，费用下限让位给法律费用。读的时候两处要小心：资本开支区间收窄不等于总量下修（上限没动、下限反而抬高 50 亿）；「经营利润高于 2025」是方向句，市场若拿上半年 +9.6% 外推成全年，就把定性当成了定量。

### 依据
- p.1｜We expect third quarter 2026 total revenue to be in the range of $61-64 billion.
- p.1｜Our guidance assumes foreign currency is an approximately 1% headwind to year-over-year total revenue growth, based on current exchange rates.
- p.1｜We now expect full year 2026 total expenses to be in the range of $165-169 billion.
- p.1｜We anticipate 2026 capital expenditures, including principal payments on finance leases, to be in the range of $130-145 billion, narrowed from our prior outlook of $125-145 billion.
- p.1｜Absent any changes to our tax landscape, we expect our tax rate for the remaining quarters of 2026 to be between 15-17%, an increase from our prior outlook of 13-16%.
- p.1｜We continue to expect to deliver operating income this year that is above 2025 operating income.
- p.1｜Capital expenditures, including principal payments on finance leases, were $31.08 billion.
- p.2｜revenue excluding foreign exchange effect, advertising revenue excluding foreign exchange effect, and free cash flow. The presentation of these financial measures is not intended to be considered in isolation
- p.2｜We subtract both purchases of property and equipment, and principal payments on finance leases in our calculation of free cash flow
- p.2｜Purchases of property and equipment | (30,116) | | | (16,538) | | | (49,113) | | | (29,479) |
- p.3｜Foreign exchange effect on 2026 revenue using 2025 rates | (685)
- p.3｜Free cash flow | $ | 784 | | | $ | 8,549 | | | $ | 13,170 | | | $ | 18,883 |


## 7 · 他的指引**兑现记录**怎样（一贯保守 / 一贯激进 / 摇摆）？

**结论**：未见——本件只给本期与「prior outlook」的两点对照，没有过去四到八期的指引中值与实际配对。查了全部三块（业绩稿的指引段、报表、分部与对账表），没有一处列出历史指引与实际达成。样本不足，不能判一贯保守、一贯激进或摇摆。

**具体**：本件内能确认的只有本期方向：资本开支下限上修 50 亿、税率两端各上修 2 个百分点、费用下限上调，三项都是往上，属「上修季」；但这是对指引本身的修订，不是「指引 vs 后来实际」的记录，两者不能混。要判兑现记录，至少需要 2025 年二季度至 2026 年二季度的五期费用与资本开支指引中值及其实际值，本件一份都提供不了。

**判断**：这一栏本件判不了，写未见并注明查了哪里；不能拿本期的三次上修推断「一贯保守」，那只是期内的修正方向。

### 依据
- p.1｜We anticipate 2026 capital expenditures, including principal payments on finance leases, to be in the range of $130-145 billion, narrowed from our prior outlook of $125-145 billion.
- p.1｜Absent any changes to our tax landscape, we expect our tax rate for the remaining quarters of 2026 to be between 15-17%, an increase from our prior outlook of 13-16%.
- p.1｜We are raising the lower-end of our expense outlook to incorporate the $2.4 billion charges related to legal proceedings recognized in the second quarter.
- p.1｜We continue to expect to deliver operating income this year that is above 2025 operating income.


## 8 · **资本配置的话和做对得上吗**？（说"估值有吸引力"却几乎不回购；指引算力开支下降却称需求强劲）

**结论**：话与做不冲突，但「资本回报」这个词在本季已经只剩股息——回购归零、同时举债 249.1 亿去垫资本开支。把「资本回报计划」读成含回购，会高估股东回报。

**具体**：做的一侧（金额为 2026 年二季度或期末，口径注明）：回购 0（现金流量表「—」，上年同期 101.67 亿；上半年 0，上年同期 229.21 亿）；股息及等价支付 13.53 亿（二季度）；新发长期债务净额 249.1 亿（上半年）；长期债务 836.64 亿（2026 年 6 月 30 日，2025 年 12 月 31 日为 587.44 亿）；资本开支 310.8 亿（二季度，含融资租赁本金）；自由现金流 7.84 亿（二季度，公司自定义口径：经营现金流 318.62 亿 − 购置物业设备 301.16 亿 − 融资租赁本金 9.62 亿，桥在对账表）；现金及有价证券 902.64 亿（期末）。说的一侧：摘要里只写「资本回报计划——股息及等价支付 13.53 亿」，没有回购承诺，也没有「估值有吸引力」一类措辞（查了全文）。所以不存在「说回购却不做」的对不上，真实情况是话被压缩到只覆盖股息。

**判断**：对得上，但口径要改：本季资本配置是「停回购 + 举债 + 把钱投进算力」。上半年资本开支 509.18 亿、全年指引 1,300–1,450 亿，意味着下半年还要再投 790.8–940.8 亿；自由现金流 7.84 亿只是这个转向的结果，不是偶发。要核回购授权余额，本件没有，须去 10-Q。

### 依据
- p.1｜Capital expenditures, including principal payments on finance leases, were $31.08 billion.
- p.1｜Dividend and dividend equivalent payments were $1.35 billion.
- p.1｜Cash, cash equivalents, and marketable securities were $90.26 billion as of June 30, 2026.
- p.1｜Long-term debt was $83.66 billion as of June 30, 2026.
- p.1｜Cash flow from operating activities was $31.86 billion, and free cash flow was $784 million.(1)
- p.2｜Repurchases of Class A common stock | &#8212; | | | (10,167) | | | &#8212;
- p.2｜Proceeds from issuance of long-term debt, net | 24,910
- p.2｜Purchases of property and equipment | (30,116) | | | (16,538) | | | (49,113) | | | (29,479) |
- p.2｜Free cash flow is not intended to represent our residual cash flow available for discretionary expenditures.
- p.3｜Free cash flow | $ | 784 | | | $ | 8,549 | | | $ | 13,170 | | | $ | 18,883 |


## 9 · ★ **什么"没了"**？（客户数被"客户群增长"取代、留存停更、地域拆分消失）

**结论**：没了的是回购——数值还在表里，活动没了；同时「资本回报」这条说法被替换成只剩股息。另有一处被模糊化：人头的 -1% 里还装着 8,000 名已宣布裁掉、要到三季度末才出表的人。

**具体**：
- 不再出现（活动消失）：回购。二季度为「—」，上年同期 101.67 亿；上半年为「—」，上年同期 229.21 亿。指标行仍在，数值归零，摘要正文一个字未提。
- 被替换（说法层）：上期摘要的「资本回报计划」同时报回购与股息，本期只报股息 13.53 亿，回购金额从叙述里退出、只留在报表。
- 被模糊化（口径层）：人头 75,472（2026 年 6 月 30 日，同比 -1%），公司自己写明其中约含 5 月裁员涉及的 8,000 人、多数到 2026 年三季度末才不再计入，故 -1% 不是裁员后的稳态数字。
- 本期未披露（不能判停更）：人群指标只给 DAP 36.0 亿一项，未见月活、单应用日活、使用时长的量化、分地区或分应用拆分；查了全篇指标清单（DAP、广告展示、单价、收入、成本、资本开支、资本回报、现金、长期债务、现金流、人头），本件不给这些拆分，且没有同口径的上期本件可比，只能说本期未披露，不能判为停更。
- 一次性项落位不对称：摘要把法律程序 24.0 亿与遣散 11.8 亿一并点出，但利润表附注只给法律费用落位（计入一般及行政费用），遣散没有对应附注；做同比还原时只有 24 亿有账可对。

**判断**：最值得上报的一处是回购从「叙述 + 数值」退成「只剩一个破折号」——这不是披露口径变化，是资本配置动作变化；其次是 -1% 人头与 8,000 人待离场的错位，读「效率已见效」会早一个季度。

### 依据
- p.1｜Capital return program
- p.1｜Dividend and dividend equivalent payments were $1.35 billion.
- p.1｜Headcount was 75,472 as of June 30, 2026, a decrease of 1% year-over-year.
- p.1｜Our reported headcount includes approximately 8,000 employees impacted by the May 2026 headcount reduction, the majority of whom will no longer be reflected in our headcount by the end of the third quarter of 2026.
- p.1｜Total costs and expenses were $42.03 billion, an increase of 55% year-over-year. This includes $2.40 billion of charges related to legal proceedings and $1.18 billion of severance expenses in connection with the May 2026 headcount reduction.
- p.1｜DAP was 3.60 billion on average for June 2026, an increase of 3% year-over-year.
- p.2｜Repurchases of Class A common stock | &#8212; | | | (10,167) | | | &#8212;
- p.2｜The second quarter 2026 general and administrative expenses include $2.40 billion of charges related to legal proceedings.


## 10 · 他说"**将 / 预计 / 目标**"的地方，市场当成"**已 / 达**"了吗？

**结论**：三处最容易把「预计」读成「已达」：一是 CEO 那句「结果已经在显现」，二是「全年经营利润高于 2025」，三是人头 -1%。第一处没有可分离科目可证，第二处是方向句而非数字，第三处的降幅还差 8,000 人没出表。

**具体**：
- 「The results are already showing」是完成态措辞，但同一份材料给出的可核项只有收入 +28%、DAP +3%、资本开支 310.8 亿，AI 没有单独的收入行或分部；这是「已显现」的断言，不是「已量化」的事实。此前怎么表述无法在本件内找到（本件只有这一期），故只能记成断言与科目之间缺一环。
- 全年经营利润：原文是 continue to expect（预计），且只说「高于 2025」，本件未给 2025 年全年经营利润数值，完成度无法在本件内算。上半年 416.47 亿（同比 +9.6%）、二季度单季 187.75 亿（-8%），若把上半年外推为全年达标，属把预计读成已达；二季度加回 24 亿法律费用与 11.8 亿遣散后约 223.55 亿、同比约 +9.4%（本刊折算），可见单季下滑主要来自一次性项，但全年仍取决于下半年。
- 人头：报告数 -1% 已含 8,000 名待离场者，多数到三季度末才出表；把「-1%」当成裁员已落地的效果，会早一个季度。
- 资本开支与税率的「上修」是已发生（指引动作已完成），这部分可以按已完成读；但它是动作完成，不是效果完成。
- 法律风险原文是 may ultimately result in a material loss（可能），已计提的只有二季度的 24 亿；把「可能重大损失」当成「已计提重大损失」是反向误读。

**判断**：本件的「已」集中在 CEO 引语与指引动作上，「预计」集中在全年经营利润与剩余季度税率上；把前者当业绩、把后者当承诺兑现，都会高估当期完成度。一处完成度对不上（经营利润只说方向、不给数），全篇进度表述都要按「方向句」重核。

### 依据
- p.1｜The results are already showing, and I'm optimistic about the potential ahead.
- p.1｜We continue to expect to deliver operating income this year that is above 2025 operating income.
- p.1｜Headcount was 75,472 as of June 30, 2026, a decrease of 1% year-over-year.
- p.1｜Our reported headcount includes approximately 8,000 employees impacted by the May 2026 headcount reduction, the majority of whom will no longer be reflected in our headcount by the end of the third quarter of 2026.
- p.1｜We are raising the lower-end of our expense outlook to incorporate the $2.4 billion charges related to legal proceedings recognized in the second quarter.
- p.1｜we continue to see scrutiny on youth-related issues in several markets and have a number of youth-related trials scheduled for this year in the U.S., which may ultimately result in a material loss.
- p.2｜Income from operations | 18,775 | | | 20,441 | | | 41,647 | | | 37,997 |
- p.2｜Total costs and expenses | 42,026 | | | 27,075 | | | 75,464 | | | 51,833 |
