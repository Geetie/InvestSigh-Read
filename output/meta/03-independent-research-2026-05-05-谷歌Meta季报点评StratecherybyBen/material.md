---
id: 03-independent-research-2026-05-05-谷歌Meta季报点评StratecherybyBen
cat: "03"
sub: independent-research
template: independent-research
template_version: 2
date: 2026-05-05
time: "00:00"
title: "Stratechery / Ben Thompson：谷歌净利涨 81%，但真正经营出来的只有 30%——同一周 Meta 只能请市场「相信我」（2026-05-04）"
kind: "independent-research"
issuer: "Stratechery / Ben Thompson"
ticker: META
source_pages: 14
---

## Q1 · 他给的公司**未披露口径**的外部估算是什么？

无外部估算。这是本件最容易被误读的地方：满页都是数字，但没有一个是他自己算出来的规模估计。

全文的数可分三类：一是公司披露——Alphabet 一季度营收增 22%、约 1,100 亿美元、净利 626 亿美元增 81%、营业利润增 30%、其他收入净额增 237% 至 377 亿美元、全年资本开支指引上调至 1,800–1,900 亿美元、谷歌云单季 200 亿美元增 63%、在手订单从 2,400 亿升至 4,600 亿美元；二是监管申报原文——10-Q 附注 3 里非上市股权账面 1,013 亿美元、其中 736 亿美元在本季重估；三是他人报道——Anthropic 2 月以 3,800 亿美元估值融 300 亿美元、较去年 9 月的 1,830 亿美元涨 108%；另有一个从《纽约时报》转引的谷歌持股比例，属媒体口径的旧时点数，我在复算一题里才用到它。

他唯一的「外推」是定性归因：这轮其他收入暴增「几乎肯定」主要来自 Anthropic 重估。没有金额、没有市值拆分，按定义不算估算，只能算解释。

### 依据
- p.2｜The more pertinent number, however, is 30%, which is how much Google’s operating profit increased.
- p.2｜The rest of the profit increase came from “Other income (expense), net”, which jumped 237% to $37.7 billion
- p.3｜As of March 31, 2026, the carrying value of our non-marketable equity securities accounted for under the measurement alternative was $101.3 billion
- p.4｜in February Anthropic raised $30 billion at a $380 billion valuation; that was a 108% increase over its $183 billion valuation last September

## Q2 · 他的**物理量**从哪来、能不能核？

只有一个物理量，且是别人给的：Anthropic 扩大使用谷歌云，包括最多 100 万块 TPU、价值数百亿美元、预计 2026 年上线「远超 1 吉瓦」的算力。来源是 Anthropic 自己的扩张公告，可回溯到公告原文——但它是承诺值而非交付值，「预计上线」与实际并网差着一年。

其余与算力相关的只有钱：Alphabet 全年资本开支指引 1,800–1,900 亿美元，是金额不是功率；谷歌云单季收入 200 亿美元同理。全文没有机柜数、GPU 张数、晶圆产能或自建电力测算。

我逐页读完并核了配图，云业务那张季度表只到收入、增长、利润、利润率四列，没有容量列。结论：物理量仅此一条，来源可回溯、数值不可当已交付产能，属「有出处但只能当计划」；其余为无法核。

### 依据
- p.6｜The expansion is worth tens of billions of dollars and is expected to bring well over a gigawatt of capacity online in 2026.
- p.6｜including up to one million TPUs
- p.2｜The company revised its estimates for capital expenditures this year to $180 billion to $190 billion, up from $175 billion to $185 billion.

## Q3 · 这份材料是**四种交付物里的哪一种**？同源的另一份是哪一份？

`bilingual`。每页页首是网页刊头与抓取时间，正文按段落地中英并列：先一段英文原文，紧跟同一段的中文译文，再下一段，全篇都是这个节奏，还带原文链接与「收听播客」控件。

不是 `translation`：英文没被删掉；不是 `summary`：没有被压成条目，长引文（10-Q 附注 3 的公允价值段落）整段保留；不是 `original`：中文是逐段对译而非零散注释。

同源：无。本份在同源对照表里自成一行（Stratechery 2026-05-04 谷歌/Meta 财报点评），没有其它交付物版本，不涉及「一份原文四份文档、不得计多源」的问题。

要注意的是译文质量：专有名词被机器译成「元宇宙公司」（Meta）、「元收益」，数字段落偶有空格错位，引用英文侧更稳。

### 依据
- p.1｜Google Earnings, Meta Earnings 谷歌财报，元宇宙财报
- p.1｜https://stratechery.com/2026/google-earnings-meta-earnings/
- p.8｜Meta’s earnings were, to be clear, extremely good! From the Wall Street Journal:很明显，Meta 的收益好得惊人！数据来自《华尔街日报》:

## Q4 · 他的**假设与算式**能不能复算？

他的关键结论是：81% 的净利增长里，经营贡献只有 30%，其余主要是 Anthropic 重估。他没写算式，但把三个数摆齐了，可以复算。

算式与我的复算：①净利增量 = 626 ÷ 1.81 ≈ 346（去年同季）⇒ 增量约 280 亿美元；②其他收入净额增 237% 至 377 亿 ⇒ 去年同期约 112 亿 ⇒ 增量约 265 亿美元，占净利增量的 95%；③Anthropic 重估贡献 = 14% ×（3,800 − 1,830）≈ 276 亿美元。

276 对 265，差约 4%，复算通过——方向上完全支持他「几乎肯定是最大驱动」的判断。

但只能当量级，不能入格：14% 是 2025 年 3 月的旧持股比例，之后融资摊薄与增持都未计；377 亿里也含汇兑与证券损益，不全是这一笔。判断：算式成立、精度不够，可用于验证叙事，不能用于预测下季利润。

### 依据
- p.2｜The rest of the profit increase came from “Other income (expense), net”, which jumped 237% to $37.7 billion
- p.4｜in February Anthropic raised $30 billion at a $380 billion valuation; that was a 108% increase over its $183 billion valuation last September
- p.4｜Google, according to the New York Times, owned 14% of the company as of March 2025
- p.1｜Net income was $62.6 billion, an 81% increase compared with the same period a year earlier.

## Q5 · 关键数字的**脚注指向哪**？

无编号脚注、无尾注；每页页脚只有原文网址，链接在、注不在。

可归一手的有四处：10-Q 附注 3 的公允价值段落是逐字引监管申报原文，可为 Ⅰ 档；皮查伊与扎克伯格在财报电话会上的原话（含「生成式模型产品收入同比增长近 800%」）是电话会记录，Ⅰ 档；Anthropic 的 TPU 扩张公告，Ⅰ 档；Alphabet 的营收、净利、资本开支指引、云收入与在手订单，虽经《华尔街日报》转述，但可回溯到 10-Q 与 8-K，Ⅰ 档。

二手：《纽约时报》给的「谷歌持股 14%」是媒体报道，Ⅱ 档；CNBC 的股价与月度表现（Alphabet 涨 10%、Meta 跌近 9%）也是媒体口径，Ⅱ 档。

他本人的加工只有一处标注方式：把 WSJ 头条的 81% 换成 30%，并在文中说明这是自己翻 10-Q 找到的，属作者自述、无外部校验。

### 依据
- p.2｜The rest of the profit increase came from “Other income (expense), net”, which jumped 237% to $37.7 billion
- p.7｜revenue from products built on our gen AI models grew nearly 800% year over year.
- p.8｜While Alphabet jumped 10% for the day, Meta shares plunged almost 9%
- p.4｜Google, according to the New York Times, owned 14% of the company as of March 2025

## Q6 · 他的**自建口径 / 评级**定义是什么？与公司口径差多少？

没有自建指数，也没有评级或打分表。他做的是口径重排，只有一处：

定义——把「净利润增长」拆成「营业利润增长」与「其他收入（费用）净额」两块，用前者衡量经营、后者衡量投资重估。换算规则很朴素：营业利润不含权益投资公允价值变动，净利润含。与公司/媒体口径的差异是 51 个百分点（81% 对 30%），方向向下，即把利润质量判得比头条差得多。

另有一处算半个口径：那张 2019 年四季度起的谷歌云季度序列（收入、增速、营业利润、利润率），是他多年自建的跟踪表，取值直接用分部披露数、不做调整；用处是看加速拐点（增速从 28% 抬到 63%、利润率从 18% 到 33%），但它不改数、不构成新尺子。

判断：这套拆法可以借用来判利润质量，但它没有阈值、没有分档，不能当评级用；云业务序列可当时间序列用，不能当预测模型。

### 依据
- p.2｜The more pertinent number, however, is 30%, which is how much Google’s operating profit increased.
- p.6｜Q2012260年26第一季度
- p.2｜The Cloud unit had $20 billion in first-quarter revenue, a 63% increase from the same period in 2025.

## Q7 · 他**有没有投行关系 / 持仓**？

三项分开看。

收费顾问：未见。本件是 Stratechery 的订阅更新，文末只讲单一收件人授权与团队订阅折扣，没有任何付费顾问或咨询业务说明，也没有作者简介交代收入来源。

投行关系：未声明。文末没有承销、做市、关联方或利益冲突段落，连「不构成投资建议」的免责句都没有，只有订阅条款。

持仓：未声明。文中不涉及他自己的仓位，也没有「我们持有什么」的表态。

另需记一笔工作往来：他自述就云业务的数据当面追问过谷歌云 CEO 库里安——这是采访关系，不是付费顾问关系，但足以说明他与被评公司有日常接触。判断：三项均无正面披露，按关系不明处理，不得假定独立。

### 依据
- p.7｜That said, I did push Google Cloud CEO Thomas Kurian on some of these points
- p.13｜The Stratechery Update is intended for a single recipient, but occasional forwarding is totally fine!
- p.14｜© Stratechery LLC 2026 | Terms of Service | Privacy Policy

## Q8 · 他的**行业级判断**（产能 · 份额）有数据支撑吗？

产能与份额：无数。他不做云市场份额对比（不与 AWS、Azure 比），也不给算力产能，行业判断靠两条腿：一条是单一公司的分部读数，一条是需求方的合约。

带数的判断有三条：①谷歌云在加速——单季 200 亿美元、增 63%，一年内增速从 28% 抬到 63%，营业利润率从 18% 到 33%，用的是他自己那张季度序列，可回溯到各季分部披露；②在手订单 4,600 亿美元、两年内确认约一半，是公司指引，不是他的测算；③需求方是 Anthropic 这类实验室——它承诺最多 100 万块 TPU、2026 年上线超 1 吉瓦，这条把「云增长」和「单一客户集中度」绑在一起，是他的核心论点。

判断：「Meta 没有云业务反而是优势」是纯观点，凭的是机会成本推理，无数字；「谷歌现在兑现、Meta 只能请人相信」有读数支撑，但样本只有两家公司一个季度，不能外推成行业份额结论。

### 依据
- p.2｜It expects to record about half of the backlog as revenue over the next two years.
- p.10｜Meta may actually face less competition in winning the consumer space
- p.6｜The expansion is worth tens of billions of dollars and is expected to bring well over a gigawatt of capacity online in 2026.
