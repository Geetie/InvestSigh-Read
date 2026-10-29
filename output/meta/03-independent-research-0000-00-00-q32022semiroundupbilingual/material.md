---
id: 03-independent-research-0000-00-00-q32022semiroundupbilingual
cat: "03"
sub: independent-research
template: independent-research
template_version: 2
date: 0000-00-00
time: "00:00"
title: "SemiAnalysis：2022Q3 半导体财报综述——存储雪崩、设备股分化与英特尔前瞻（中英对照，2022-10-27）"
kind: "independent-research"
issuer: "SemiAnalysis / Dylan Patel"
ticker: META
source_pages: 19
---

## Q1 · 他给的公司**未披露口径**的外部估算是什么？

本件主体是半导体行业而非某一家公司，Meta 与谷歌只作为资本开支读数出现在开头。作者给的外部估算有四类，全部标为自建模型或"我们预计"。

一是行业设备支出：2023 年 NAND 相关 WFE（晶圆制造设备采购额）仅 70 亿美元、DRAM 相关 WFE 仅约 130 亿美元，对应 SK 海力士与美光削减逾五成的动作。口径是设备采购金额，不是产能；没有历史基数、没有样本量、没有按厂商拆分。

二是服务器量：2023 年服务器出货量比 2022 年低 5.4%、比 2021 年低 5.1%；基于 DDR5/PCIe 5.0 的 x86 平台到 2023 年四季度只占出货量约 18.2%，而按其更看重的位元口径，数据中心 CPU 用 DDR5 位元占比约 34%。同一件事给出台数份额与位元份额两个口径，是全文口径最清楚的一处。

三是对 Meta 的估算：他们内部模型原先把 Meta 2023 年资本开支设为同比下降 7%，实际指引约为同比增长 12%；另称 Meta 当年自由现金流 190 亿美元，若资本开支再上调约 50 亿、运营支出上调约 120 亿，明年自由现金流可能转负。

四是事件型估算：英特尔将宣布 8,000 至 12,000 人裁员（原文自注"仅为估算"）；Besi 混合键合业务的天花板是每年 5 亿美元。

不算外部估算的：Meta 320–330 亿与 340–390 亿美元的资本开支指引、SK 海力士 DDR5 占比 20%/30%、Teradyne 的 20%–30% 复杂度增幅、先进探针卡行业增速 1%–2%，都是公司或他人的既有口径，作者只是引用。

### 依据

- p.10｜SK Hynix is cutting WFE by more than 50%, just like Micron. We believe NAND WFE is only \$7B in 2023, and DRAM WFE is only \~\$13B in 2023. These are massive declines.
- p.11｜We expect 2023 server units to be 5.4% lower than 2022 and 5.1% lower than 2021.
- p.11｜Content is the more important metric, and we expect \~34% of bits shipped into datacenter CPUs to be DDR5 in Q4 2023.
- p.3｜For the record, in our 2023 datacenter CPU spending and market share outlook, we penned in Meta as a 7% Capex decline. Instead, they will spend \~12% more year on year.
- p.18｜We expect a large layoff plan to be announced totaling 8,000 to 12,000 people. Just an estimate.

## Q2 · 他的**物理量**从哪来、能不能核？

本件没有给出自建的产能或装机物理量。能称物理量的只有三处，且都不是他们自己测的。

一是 SK 海力士把 WFE 支出削减超过 50%，厂房壳体与设备两端削减幅度相近。这是公司披露的百分比，可回溯到电话会，但换算不出任何绝对产能。

二是 Besi 混合键合的真实生产吞吐约 1,000 UPH（每小时键合颗数），以及单台设备售价稳在 200 万美元、选配后上探 250 万美元。这两个数是他算式的输入，全文没有来源、没有设备台数、没有封装颗数，属"按我们的测算"而无中间步骤，只能当量级，不能入格。

三是德州仪器库存天数本季增加 8 天至 133 天，属公司披露的运营量，可回溯。

其余涉及"量"的地方都是金额或定性：UMC 2023 年 28nm 营收只有 80% 受长期协议保护（约占其总营收 20%）、制裁对 KLA 影响约 4% 营收、DRAM 晶圆投片"大幅下滑"、三星/美光/海力士"都在大幅削减投片"。查了全部章节（存储、设备、代工、英特尔），无一处给出晶圆片数、机台数或功率。按手册这属红灯：吞吐与投片这类物理量来源不可回溯，只能当旁证。

### 依据

- p.17｜Besi will not have large ASP gains, they will be stuck around \$2M per tool and edge up to \$2.5M with some interesting options.
- p.17｜but running the math on tools, number of bonding steps per package, volume, and real production throughput figures (\~1,000 UPH), you simply do not get to this being a \$500M a year business like some analysts are projecting.
- p.6｜Their inventory is still going up; it’s now 8 days up in the quarter, to 133 days which is a huge jump.
- p.9｜Only 80% of their 28nm revenue is protected by long-term agreements for 2023, accounting for \~20% of their revenue.

## Q3 · 这份材料是**四种交付物里的哪一种**？同源的另一份是哪一份？

本份是 bilingual（双语句对齐），不是纯译文也不是摘要。判据三条：页首英文标题下并列中文标题与"中英对照 / BILINGUAL"标记；正文按段英中交替，一段英文紧跟其译文，段落顺序一致；没有 KEY POINTS 式的要点压缩，章节小标题（Wolfspeed、Texas Instruments、SK Hynix 等）中英各一行。

同源组：`03-independent-research-0000-00-00-q32022semirounduporiginal`（同源对照表"Q3 2022 半导体综述"一行只有这两个 id）。两份是同一篇 2022-10-27 付费长文的两个交付物，共用一个来源，不得计成两个独立源。

差异在译法：本份中文由译者重排，个别英文段落缺对应译文（开头讲 Meta 上调资本开支那半句，中文只剩谷歌一句），术语被本地化（AMX、DSA、IAA、DLB、QAT 都补了中文注释），行文有可读性改写。两版数字一致，未见换算差异，故口径以英文原文为准、措辞以本份为准。

### 依据

- p.1｜中英对照 / BILINGUAL
- p.2｜在正式进入这些半导体公司之前，先说一句：谷歌和 Meta 也公布了财报。谷歌看起来明年仍将继续增加服务器资本开支和员工编制。
- p.1｜Earnings Reviews And Previews Dylan Patel · Oct 27, 2022 · Paid

## Q4 · 他的**假设与算式**能不能复算？

最关键的一条可复算结论是对 Meta 2023 年资本开支的修正。算式：上年指引中值 ×(1+增速) ⇒ 新指引中值。

他们把原假设定为 −7%（这是模型输入），实际取值来自 Meta 披露的两段区间：2022 年 320–330 亿美元取中值 325 亿，2023 年 340–390 亿美元取中值 365 亿，365 ÷ 325 − 1 = +12.3%。与他们写的"同比增长约 12%"一致，复算通过，差 0.3 个百分点来自四舍五入。

但有两个口径问题：一是没交代用中值还是上限，若用上限 390 ÷ 325 = +20%，结论就从一成二变成两成；二是"含融资租赁本金偿还"写在指引原文里，他们的模型是否同口径未说明。

其余关键结论都不能复算：英特尔 8,000–12,000 人裁员没有任何输入；NAND/DRAM 的 70 亿与 130 亿美元 WFE 没有台数、单价或历史基数；Besi 的 5 亿美元天花板只给了单台售价与 1,000 UPH，缺"每封装键合步数"和"封装出货量"两个输入，只能反算——要够 5 亿美元需每年卖 250 台（5 亿 ÷ 200 万），这在混合键合早期明显不现实，所以方向可信、过程不可验。

### 依据

- p.2｜We expect 2022 capital expenditures, including principal payments on finance leases, to be in the range of \$32-33 billion, updated from our prior range of \$30-34 billion.
- p.2｜For 2023, we expect capital expenditures to be in the range of \$34-39 billion, driven by our investments in data centers, servers, and network infrastructure.
- p.18｜We expect a large layoff plan to be announced totaling 8,000 to 12,000 people. Just an estimate.

## Q5 · 关键数字的**脚注指向哪**？

无脚注。全文没有脚注编号、没有尾注、没有文末 Source 列表，关键数字只在正文里用破折号署到发言人（Meta、谷歌、SK 海力士）。这类署名的强度是"引自电话会或新闻稿"，没有链接、没有文件号、没有日期，属可核但本件未给核的路径，按手册记Ⅱ档。

有一处明确把量化工作推给别人：三家设备公司受中国制裁影响的金额是"感谢我们的朋友 Fabricated Knowledge"梳理并量化的，属二手引用记Ⅱ档，且本件未复述具体金额。

另有一处转引行业预测而不署名：先进探针卡 2023 年增速 1%–2% 出自被引用的"目前行业普遍预测"，作者借它说 FormFactor 会跑输，属他人预测经公司转述，同样只能记Ⅱ。

因此本件没有一条可为Ⅰ档的脚注；唯一接近一手的是被引用的公司原话（Meta 资本开支指引、SK 海力士 DDR5 与无锡厂表态），但载体是二手转录，不能升档。

### 依据

- p.17｜Shout out to our friend Fabricated Knowledge for rounding up the impact to these 3 firms.
- p.12｜current industry forecasts have advanced probe cards growing somewhere between 1% and 2%.
- p.11｜and it is bound to go higher as the year gets closer to the end. — SK Hynix

## Q6 · 他的**自建口径 / 评级**定义是什么？与公司口径差多少？

本件真正自建的口径只有一个，其余是沿用行业通用词。

自建口径：Entegris 的收入被重切成"80% 对应晶圆制造材料消耗、20% 对应晶圆制造设备资本开支"。这是把公司营收按"受投片量驱动"还是"受设备支出驱动"重新归类；Entegris 自己按事业部披露，两者维度不同。作者没给映射方法、没有拆分表，也没说与公司口径差多少。它被用来支撑"Entegris 这轮同样中招、四季度环比下滑而非像彭博一致预期那样增长"这个结论。按手册，这个 80/20 只能当分析框架，不得当作可入格的口径。

沿用的通用口径有两个：WFE 按 NAND／DRAM 分列，是行业惯例但未定义含不含零配件与服务；"位元"与"出货量"分列，作者明确说位元含量比台数更重要，这点与公司口径不冲突。

另有一条"测试内容随晶体管数量与制程节点亚线性增长"的判断尺子，被反复用来解释 Teradyne 的天花板，但只给方向、无系数，不能定量。

### 依据

- p.15｜Painting in broad swaths, Entegris is an 80% wafers manufactured, 20% wafer fabrication equipment capex company.
- p.15｜The fall won’t be huge, but we do expect a sequential decline in Q4 rather than growth like the BBG consensus.
- p.8｜Test content grows sub-linearly with transistor count and node transitions.

## Q7 · 他**有没有投行关系 / 持仓**？

三项分开：收费顾问＝有（客户未披露）；投行关系＝未声明；持仓或受资助＝未声明。

文末没有 Disclosure 或免责声明段，最后一段是作者对希捷裁员回购的牢骚，全文也没有作者简介或持仓清单。唯一的关系线索在正文：他们自述此前"为某客户做过大量碳化硅相关的研究工作，从衬底、设备到器件与封装"，并把"在两次跌超 20% 之前就转空"当作战绩。这说明存在付费委托研究关系，但没说是谁付费，也没说这份研究是否与本文标的有关。

持仓方面，文中引用作者 2021 年 11 月的推文"我把 Cree Wolfspeed 卖了"，那是三年前的个人交易，不能当现在的持仓披露。

页首的"Paid"是付费墙标记，不是投行关系，不能拿它证明"无投行关系"。按手册本件按"关系不明"处理，不得假定独立。

### 依据

- p.5｜顺带一提，我们此前为某客户做过大量碳化硅相关的研究工作，从衬底、设备到器件与封装，把整条供应链都梳理了一遍。
- p.5｜Dylan Patel（@dylan522p）：“也许有人会觉得我疯了，但尽管长期看多 Cree Wolfspeed，我还是把它卖掉了。
- p.1｜Earnings Reviews And Previews Dylan Patel · Oct 27, 2022 · Paid

## Q8 · 他的**行业级判断**（产能 · 份额）有数据支撑吗？

行业级判断有四条，支撑强度不一。

一、代工毛利率结构性下滑、二线厂更严重。这是判断不是读数：没给毛利率降幅、没给时间表，依据是 UMC 指引营收环比 −10%、2022 年资本开支下调 17%、稼动率不再钉在 100%，属从公司指引外推，方向可信、幅度不可核。

二、存储设备支出塌方：2023 年 NAND 70 亿、DRAM 130 亿美元（设备采购额口径），并称三星、美光、海力士都在大幅削减投片，与市场流传"只有两家在减"相反。这是本件最硬的行业数，仍无历史基数与拆分，只能当量级。

三、服务器：2023 年出货 −5.4%、DDR5 平台占台数 18.2%、占位元 34%（均为 2023 年四季度口径），口径写得最清楚，但样本与模型未公开。

四、NAND 同比跌 40% 会让数据中心从 HDD 转 SSD"以惊人的速度加快"——因果判断，没有切换量、没有时间窗，属观点。至于制裁对各家的影响（KLA 约 4% 营收、Teradyne 7,500 万至 1 亿美元），是公司口径的转述，不是他的估计。

### 依据

- p.9｜Foundry margins will go down structurally, especially at tier 2 foundries such as UMC.
- p.18｜but when they plunge 40% year on year, that changes the economics for server design overnight.
- p.16｜We expect it will hit about 4% of their revenues.
- p.9｜They guided a 10% quarterly decrease in revenue and cut 2022 Capex by 17%.
