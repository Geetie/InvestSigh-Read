---
# ── 材料身份（解析成 Material 的字段，键名不要改） ──
id: 02-company-voice-2026-10-19-meta-20261019-meta-09302026xexhibit991
cat: 02
sub: company-voice
# ── 模板身份：这份材料是用哪一版问法生成的 ──
template: company-voice
template_version: 2
# ── 材料元信息 ──
date: 2026-10-21
time: 08:00
title: Meta Reports Third Quarter 2026 Results
kind: 8-K Item 2.02 + EX-99.1 业绩新闻稿（含 CFO 展望、C 类股安排）
issuer: Meta Platforms, Inc.
ticker: META
source_pages: 4
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

结论：门面是收入增速，全篇真正的解释轴是那笔 98.9 亿美元的诉讼计提；被埋的是自由现金流（为负）与资本开支。说话人两位——开场是创始人兼 CEO Mark Zuckerberg 的直接引语，财务口径由标题为「CFO Outlook Commentary」的段落承担（本件未点出该高管姓名）。

具体：按次数排，收入出现在四处（摘要表首行、经营要点第四条、四季度指引、分部表与 GAAP／non-GAAP 对账），其余经营量各只一条。按解释关系排，所有同比异常都由同一笔计提解释——第三季度成本与费用 516.13 亿，同比增 68%；经营利润 129.88 亿，同比减 37%；经营利润率 20%，去年同期 40%；有效税率 24%，去年同期 87%。公司自己给出三个「剔除该计提」的数：经营利润 228.8 亿、摊薄 EPS 7.40 美元、税率 17%。埋在中间的是资本开支——349.1 亿（含融资租赁本金），只有一条、无增速；自由现金流 -21.2 亿与经营现金流 327.86 亿挤在同一条并挂脚注；员工数 66,775 人放在最后一条。表末的净利润 98.60 亿（同比 +264%）与摊薄 EPS 3.83 美元（+265%）是高基数问题的反面：去年同季税率 87% 造成低基数，不是经营改善。

判断：三处判据里「被追问时是否仍回到它」这一处空缺，本件没有问答，只能以解释关系为准——主角是那笔计提，收入是门面。因此这份材料不能只读净利润增速；若只看 +264%，会把一次一次性计提造成的低基数读成经营反转。

### 依据
- p.1｜We hit major milestones this quarter toward delivering personal superintelligence for everyone - including launching Muse and Muse Wonder, our first frontier model
- p.1｜Our investments are paying off, the core business is strong, and we're seeing velocity across the board.
- p.1｜Revenue was $64.60 billion, an increase of 26% year-over-year on both a reported and constant currency basis.
- p.1｜Total costs and expenses were $51.61 billion, an increase of 68% year-over-year. This includes the litigation charge as discussed above.
- p.1｜Income from operations | $ | 12,988 | | | $ | 20,535
- p.1｜Operating margin | 20 | % | | 40 | %
- p.1｜Income from operations of $12.99 billion would have increased by $9.89 billion to $22.88 billion.
- p.1｜Diluted EPS of $3.83 would have increased by $3.57 to $7.40.
- p.1｜Effective tax rate | 24 | % | | 87 | %
- p.1｜Net income | $ | 9,860 | | | $ | 2,709 | | | 264 | %
- p.1｜Capital expenditures, including principal payments on finance leases, were $34.91 billion.
- p.1｜Cash flow from operating activities was $32.79 billion, and free cash flow was negative $2.12 billion.
- p.1｜Headcount was 66,775 as of September 30, 2026, a decrease of 15% year-over-year.

## 2 · 核心主题（执行 / 战略 / 市场 / 资本配置）**在报表里找得到对应吗**？

结论：四个主题里三个能在报表落地——广告变现、基础设施扩张、Reality Labs 减亏；「个人超级智能」与「MSL 投资将解锁重大新收入」这一层没有对应科目；资本结构那条本期没有任何科目变动。说话人为 CEO Mark Zuckerberg 与「CFO Outlook Commentary」段落（本件未点名）。

具体：能对上的——(1) 广告变现：第三季度收入 646.01 亿、广告收入 630.61 亿、广告展示同比 +10%、单广告均价同比 +14%，四条同指；(2) 基础设施投入：资本开支 349.1 亿（含融资租赁本金）、物业设备净额 2,532.22 亿（2025 年末 1,764.00 亿）、折旧摊销 71.54 亿（去年同期 49.63 亿），投入与摊销都在表里；(3) Reality Labs：经营亏损 41.29 亿（去年同期 44.32 亿）、收入 4.43 亿（去年同期 4.70 亿）——亏损收窄但收入下滑，减亏靠的是收缩而非增长；(4) 诉讼：一般及行政费用 148.57 亿（去年同期 35.12 亿），脚注写明含 98.9 亿计提。对不上的——「personal superintelligence」「velocity across the board」「our MSL investments are creating the technology and infrastructure needed to unlock significant new revenue opportunities」，三句都没有一行科目承接；C 类股 2027 年 1 月才生效，本期股本及资本公积 1,082.44 亿（2025 年末 957.93 亿）是股权激励造成的，与 C 类股无关。

判断：落地的是「投入了多少」与「现在是多少」，落不了的是「回报多少」——公司称 AI 投资已带来可观增量广告收入，但报表只给总收入一个口径，没有 AI 归因。不要用行业逻辑替它补一行。

### 依据
- p.1｜Ad impressions delivered across our Family of Apps increased by 10% year-over-year.
- p.1｜Average price per ad increased by 14% year-over-year.
- p.1｜our MSL investments are creating the technology and infrastructure needed to unlock significant new revenue opportunities
- p.3｜Property and equipment, net | 253,222 | | | 176,400
- p.3｜Depreciation and amortization | 7,154 | | | 4,963
- p.3｜General and administrative (1) | 14,857 | | | 3,512 | | | 23,079 | | | 8,455 |
- p.3｜The third quarter 2026 general and administrative expenses include a $9.89 billion charge related to the August 2026 agreement with U.S. State Attorneys General
- p.4｜Family of Apps | $ | 17,117 | | | $ | 24,967
- p.4｜Reality Labs | (4,129) | | | (4,432)
- p.4｜We report our financial results for our two reportable segments

## 3 · 问答里他是**直接给数字，还是打太极、换话题**？

结论：未见——本件没有任何问答，逐条判「给数还是回避」的前提不成立；能判的只有书面口径本身给数给得很齐，而那不是回答提问。查了四块：开场的 CEO 引语与「CFO Outlook Commentary」全部段落、第三季度经营要点十条、电话会通知与 C 类股说明、三张报表与分部／对账表。

具体：唯一近似「回应」的是 CFO 展望段，但它是独白，没有对应的提问；本件只写「今天将举行电话会」，问答逐字不在本件，另说明「与发表股票研究的分析师的电话会记录」会后另行发布。可数的数是：第四季度收入 730–760 亿、全年费用 1,750–1,790 亿、全年资本开支 1,350–1,450 亿、Reality Labs 全年亏损 180–190 亿、第四季度税率 15–17%。这些全部带区间与时点，属「给数」，但给的是公司自己选定的题目。

判断：不能算的理由是体裁——EX-99.1 是法定发布件，回避与追问只存在于逐字稿。把这一栏读成「他答得很实」会误判；须回电话会材料另判，本件这一项空缺。

### 依据
- p.1｜We expect fourth quarter 2026 total revenue to be in the range of $73-76 billion.
- p.1｜We are raising our expense outlook to incorporate the $9.9 billion charge related to legal proceedings recognized in the third quarter. We now expect full year 2026 total expenses to be in the range of $175-179 billion.
- p.2｜Meta will host a conference call to discuss its results
- p.2｜Following the call, a replay will be available at the same website.

## 4 · **哪个问题被不同分析师反复追问**？给**基数**了吗？

结论：未见——本件零位提问者、零次追问，无法计数，也给不出基数。查了四块：经营要点的十条陈述、CEO 引语与 CFO 展望段、电话会通知与 C 类股安排、报表与对账表；通篇没有一处分析师姓名或机构名。

具体：材料内唯一与「会被追问」有关的线索是公司自己的预判——它把法律与监管单列一段，说正在监控可能显著影响业务与财务结果的诉讼与监管事项，并说未来数月在美国还有多起与青少年相关的庭审。这是公司主动提示风险点，不是被追问的记录，两者不能互相替代。另一个可数的结构事实：本期十条经营要点中，只有「成本与费用」一条带解释（指向诉讼计提），其余九条为纯陈述。

判断：不成立的理由同上——新闻稿没有问答结构。此项在本件应留空，待电话会逐字稿补齐；用「预判会被问」代替「被反复追问」属于凭印象补证据。

### 依据
- p.1｜we continue to monitor active legal and regulatory matters that could significantly impact our business and financial results
- p.1｜Total costs and expenses were $51.61 billion, an increase of 68% year-over-year. This includes the litigation charge as discussed above.
- p.2｜Meta will host a conference call to discuss its results
- p.2｜Transcripts of conference calls with publishing equity research analysts held today will also be posted to the investor.atmeta.com website.

## 5 · 同一问题**上一季怎么答**？措辞变了吗？（`预计→希望→正在努力` 的降级是领先信号）

结论：本件没有问答，同题两季并排做不了；能并排的是书面口径，措辞变了三处——费用上调从「抬下限」变成「整体上调」、经营利润的重申前面加了「剔除该计提」这一限定、税率指引的覆盖期间从「余下各季」缩到「第四季度」。说话人为「CFO Outlook Commentary」段落（本件未点名）。

具体：逐字并排如下（跨份对照，上季件为 2026 年 7 月 29 日同一发行人 EX-99.1，该件原文不在本材料内，故只作文字说明、不登记依据块）。费用：上季「raising the lower-end of our expense outlook」，区间 1,650–1,690 亿；本期「raising our expense outlook」，区间 1,750–1,790 亿，上下限各加 100 亿，措辞从抬下限改为整体上调。经营利润：上季「We continue to expect to deliver operating income this year that is above 2025 operating income」；本期句首新增「Excluding the third quarter legal charge」，属重申加新增限定。税率：上季覆盖「the remaining quarters of 2026」，区间 15–17%（并说明高于此前 13–16%）；本期只覆盖「our fourth quarter 2026 tax rate」，区间同为 15–17%。资本开支：两季用同一句式「narrowed from our prior outlook of X-145 billion」，上季 X 为 125，本期 X 为 130。

判断：只记字面变化——新增限定、缩小覆盖期间、把抬下限换成整体上调，方向是收紧不是放松。这是措辞变化，不是事实变化：2026 全年经营利润能否仍高于 2025，须回报表实际数核，不能据这句措辞认定。

### 依据
- p.1｜We are raising our expense outlook to incorporate the $9.9 billion charge related to legal proceedings recognized in the third quarter. We now expect full year 2026 total expenses to be in the range of $175-179 billion.
- p.1｜Excluding the third quarter legal charge, we continue to expect 2026 operating income to be above 2025 operating income.
- p.1｜we expect our fourth quarter 2026 tax rate to be between 15-17%.
- p.1｜to be in the range of $135-145 billion, narrowed from our prior outlook of $130-145 billion.

## 6 · **指引**：区间是收窄还是放宽？有没有**撤回全年指引**？有没有"**重申 + 新增限定条件**"？**口径变了吗**？

结论：没有撤回 2026 全年指引；五条指引里资本开支收窄（下限抬、上限不动）、费用整体上调、Reality Labs 亏损首次给区间、第四季度税率只覆盖一季；2027 年收入明确「不提供展望」，属不提供而非撤回。说话人为「CFO Outlook Commentary」段落（本件未点名）。

具体：区间与期间逐条——第四季度收入 730–760 亿（宽 30 亿），假定汇率约 1 个百分点逆风；2026 全年费用 1,750–1,790 亿（宽 40 亿），较上季 1,650–1,690 亿整体上移 100 亿，理由是纳入 98.9 亿计提；2026 资本开支 1,350–1,450 亿（宽 100 亿），自 1,300–1,450 亿（宽 150 亿）收窄，下限抬 50 亿、上限不动，中值由 1,375 亿移到 1,400 亿；Reality Labs 全年亏损 180–190 亿（宽 10 亿，新增条目），2027 年约 150 亿（单点）；第四季度税率 15–17%（宽 2 个百分点）。重申加限定一处：经营利润在剔除该计提后仍高于 2025 年。口径变动两处：费用区间的口径从上季的「不含计提」改为「含计提」，这是本期可比性最容易出错的地方；税率指引的覆盖期间从余下各季缩到单季。资本开支与自由现金流仍含融资租赁本金，non-GAAP 三项（汇率影响、广告汇率影响、自由现金流）定义与上季一致。

判断：区间、基数、期间三件齐——收入以同比增速为基数表述、费用与资本开支以绝对额为基数。唯一的「变宽」出现在费用，而那是把一次性计提并进来造成的；资本开支名义收窄，实为下限抬升，读作加码更准。

### 依据
- p.1｜We expect fourth quarter 2026 total revenue to be in the range of $73-76 billion.
- p.1｜We are raising our expense outlook to incorporate the $9.9 billion charge related to legal proceedings recognized in the third quarter. We now expect full year 2026 total expenses to be in the range of $175-179 billion.
- p.1｜Excluding the third quarter legal charge, we continue to expect 2026 operating income to be above 2025 operating income.
- p.1｜we now expect Reality Labs losses to decline compared to 2025 to a range of $18-19 billion.
- p.1｜to be in the range of $135-145 billion, narrowed from our prior outlook of $130-145 billion.
- p.1｜we expect our fourth quarter 2026 tax rate to be between 15-17%.
- p.1｜although we are not providing a full-year 2027 revenue outlook
- p.1｜and expect losses to narrow next year to around $15 billion as we reallocate investment toward other priority areas, primarily AI.

## 7 · 他的指引**兑现记录**怎样（一贯保守 / 一贯激进 / 摇摆）？

结论：本件只有一期可核样本，判不了一贯保守或一贯激进；单看这一期，公司在收入上低估、在支出上也低估，两端方向相反，合成不出一个「保守」结论。

具体：可核的一条——上季给的第三季度收入区间 610–640 亿（中值 625 亿），本期实际 646.01 亿，高于上限 6 亿，偏高中值约 3.4%。支出端两条——上季全年费用 1,650–1,690 亿，本期上调到 1,750–1,790 亿，上调额 100 亿，与 98.9 亿计提几乎相等，即上季区间没有把这笔已发生的诉讼风险计入；资本开支下限连续两季上调（1,250→1,300→1,350），上限两季都停在 1,450。本件内没有把指引中值与实际值排成一行的历史表，也没有前四到八期数据，无法计算平均偏离或「下调后达成」的期数。

判断：按判据只能写样本不足。可留的方向性线索是：收入指引偏保守、支出指引偏乐观，两者不是同一方向的偏差，因此不能用一个词概括他的兑现风格。要把这一栏做实，需回财务报告类材料取六期以上的指引与实际配对。

### 依据
- p.1｜Revenue was $64.60 billion, an increase of 26% year-over-year on both a reported and constant currency basis.
- p.1｜We are raising our expense outlook to incorporate the $9.9 billion charge related to legal proceedings recognized in the third quarter. We now expect full year 2026 total expenses to be in the range of $175-179 billion.
- p.1｜to be in the range of $135-145 billion, narrowed from our prior outlook of $130-145 billion.
- p.1｜In August 2026, we announced an agreement with 52 attorneys general to resolve litigation related to teen mental health and social media, which provides for payments of up to approximately $18.59 billion.

## 8 · **资本配置的话和做对得上吗**？（说"估值有吸引力"却几乎不回购；指引算力开支下降却称需求强劲）

结论：在「投」这一侧对得上——说激进投、做也激进投；在「回报」这一侧对不上——称投资已在兑现，报表没有任何金额承接。资本回报上，回购连续三季为零，与新设 C 类股「用于融资」的用途同向。说话人为「CFO Outlook Commentary」段落与董事会。

具体：说的——「we expect to continue investing aggressively」、资本开支 1,350–1,450 亿、C 类股用途明确写入「Capital Raising, Employee Compensation, Potential Acquisitions」、诉讼赔偿写成「up to approximately 18.59 billion」（上限措辞，按上限记，不与已发生额直接比）。做的（2026 年第三季度）——购建固定资产 339.42 亿加融资租赁本金 9.64 亿合计 349.06 亿，与经营要点里的 349.1 亿一致；经营现金流 327.86 亿、自由现金流 -21.2 亿。资本回报——股息 13.61 亿；回购一行本期与前三季均为破折号，去年同期 33.27 亿、去年前三季 262.48 亿；前三季发行长期债净额 249.10 亿，长期债余额 809.22 亿（6 月末 836.64 亿）。说的回报——「already delivering substantial incremental advertising revenue」，报表只有总收入 646.01 亿一个口径。

判断：三项里两项对得上（投得狠、要钱），一项对不上（回报已现无金额）。「最高约 185.9 亿」是赔偿上限、98.9 亿是本期计提，两者都不是现金支出，不能相减。停回购、发债、新设可融资股票类别三件事同向：现金优先留给资本开支。

### 依据
- p.1｜we expect to continue investing aggressively to support both our core business and emerging AI initiatives
- p.1｜Our AI investments are already delivering substantial incremental advertising revenue through stronger engagement, better recommendations, and more efficient monetization.
- p.1｜In August 2026, we announced an agreement with 52 attorneys general to resolve litigation related to teen mental health and social media, which provides for payments of up to approximately $18.59 billion.
- p.1｜Dividend and dividend equivalent payments were $1.36 billion.
- p.2｜Creating a New Class of Shares for Capital Raising, Employee Compensation, Potential Acquisitions, and Other General Corporate Purposes
- p.3｜Purchases of property and equipment | (33,942) | | | (18,829)
- p.3｜Principal payments on finance leases | (964) | | | (545) | | | (2,769) | | | (1,770) |
- p.3｜Repurchases of Class A common stock | &#8212; | | | (3,327) | | | &#8212; | | | (26,248) |
- p.3｜Proceeds from issuance of long-term debt, net | &#8212; | | | &#8212; | | | 24,910 | | | &#8212; |
- p.3｜Long-term debt | 80,922 | | | 58,744
- p.4｜Free cash flow | $ | (2,120) | | | $ | 10,625

## 9 · ★ **什么"没了"**？（客户数被"客户群增长"取代、留存停更、地域拆分消失）

结论：三处没了，一处整条消失、两处被并进别的口径；另有一处随事项结束而删除的限定。三种含义不同，不能一并读成「藏起来」。

具体：逐条与上一期同类发布件（2026 年 7 月 29 日同一发行人 EX-99.1，原文不在本材料内，只作文字说明）对照——(1) 长期债务摘要条目消失：上期经营要点有「Long-term debt was $83.66 billion as of June 30, 2026」，本期经营要点没有这一条，但资产负债表仍有长期债务 809.22 亿（2025 年末 587.44 亿），属降级披露而非不再披露。(2) 遣散费拆分消失：上期成本条目写含「$2.40 billion of charges related to legal proceedings and $1.18 billion of severance expenses」，本期只写含上述诉讼计提，遣散费不再单列——对应的是本期无新裁员。(3) 汇率影响被并进口径：上期收入条目单列「不变汇率下增长 27%」（报表 28%），本期写成 26% 「报表与不变汇率同幅」，两个数并成一句；对账表里汇率影响本期为 +1.13 亿（前三季 -23.20 亿），影响接近于零，故合并。(4) 员工数条目上的限定随事项完成而删除：上期带一句「约 8,000 名受 5 月裁员影响的员工，多数将在第三季度末前不再计入」，本期该句消失，员工数 66,775 人（6 月末 75,472 人，减少 8,697 人）。

判断：三种消失含义不同——长期债务是降级披露（数还在，只是从摘要移到报表）、遣散费是事项结束（本期无新裁员）、汇率是影响归零（合并表述）。登记时只写「上期提、本期未提」并抄上期原话，不要替公司解释动机；其中唯一可核的后果是员工数那 8,697 人的减少。

### 依据
- p.1｜Headcount was 66,775 as of September 30, 2026, a decrease of 15% year-over-year.
- p.1｜Total costs and expenses were $51.61 billion, an increase of 68% year-over-year. This includes the litigation charge as discussed above.
- p.1｜Revenue was $64.60 billion, an increase of 26% year-over-year on both a reported and constant currency basis.
- p.3｜Long-term debt | 80,922 | | | 58,744
- p.4｜Foreign exchange effect on 2026 revenue using 2025 rates | 113
- p.4｜Revenue excluding foreign exchange effect | $ | 64,714

## 10 · 他说"**将 / 预计 / 目标**"的地方，市场当成"**已 / 达**"了吗？

结论：有一处容易被读成「已」，就在拆股——「二拆一」被写成对市价的预期，不是已生效的拆股；另一处是「投资已带来增量收入」，属无金额的既成表述，不是计划说成达成。其余进度表述逐条重核后时态与文本一致。主体为董事会与公司。

具体：已发生且有据——董事会批准设立 C 类股、修订章程已获股东书面同意、8 月与 52 位州检察长达成协议（最高约 185.9 亿）、第三季度计入 98.9 亿计提。未发生且写在将来——章程拟提交并以 2027 年 1 月 19 日为生效日、股息登记日与付款日「由董事会稍后决定」、C 类股「拟申请」在纳斯达克上市资格、章程生效前股息不派发。易被读成已发生的一句是「we expect the market price for our Class A common stock to reflect the effect of a two-for-one stock split」——它说的是派发后市价将反映拆股效果，是预期，不是拆股已实施。公司同时明说股息不改变任何股东的投票权。可核的兑现一条：上期说受裁员影响的员工「多数在第三季度末前不再计入」，本期员工数 66,775 人（上季 75,472 人），兑现。

判断：全篇进度表述里只有拆股这一处会被误读成「已拆」，须改成「公司称派发后市价将反映二拆一效果」。裁员那条是计划变事实且可核；C 类股、诉讼、股息三条的时态与文本一致，不改。「AI 投资已带来增量收入」是另一类问题——成果被说成已知，但没有金额，属第 8 题那一侧的缺口。

### 依据
- p.1｜The Board of Directors has approved the establishment of a new class of publicly listed, non-voting Class C common stock, with an effective date in January 2027.
- p.1｜We hit major milestones this quarter toward delivering personal superintelligence for everyone - including launching Muse and Muse Wonder, our first frontier model
- p.1｜Headcount was 66,775 as of September 30, 2026, a decrease of 15% year-over-year.
- p.2｜The amended and restated certificate of incorporation has been approved by shareholder written consent.
- p.2｜we expect the market price for our Class A common stock to reflect the effect of a two-for-one stock split.
- p.2｜The record date and payment date of the stock dividend will be determined by the Board at a later date.
- p.2｜The stock dividend will not change the voting power of any shareholder.
- p.2｜we intend to qualify the Class C common stock for listing on Nasdaq
