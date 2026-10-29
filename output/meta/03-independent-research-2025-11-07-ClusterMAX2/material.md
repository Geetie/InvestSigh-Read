---
id: 03-independent-research-2025-11-07-ClusterMAX2
cat: "03"
sub: independent-research
template: independent-research
template_version: 2
date: 2025-11-07
time: "00:00"
title: "SemiAnalysis ClusterMAX 2.0：84 家 GPU 云评级、209 家追踪与自建 RPO 估算（2025-11-07）"
kind: "independent-research"
issuer: "SemiAnalysis / Jordan Nanos、Daniel Nishball、Michelle Shen 等"
ticker: META
source_pages: 355
---

## Q1 · 他给的公司**未披露口径**的外部估算是什么？

本件主体是行业（GPU 云，即只租算力不卖模型的新云），不是 Meta 一家。能给的外部估算有四组。

一、头部新云自 v1.0 发布以来新增 RPO（剩余履约义务，即已签约未确认的收入）合计近 4000 亿美元，逐家为 CoreWeave 450 亿、Oracle 3200 亿+、Nebius 170 亿+、Crusoe 140 亿、Lambda 30 亿+、IREN 90 亿+。期间 = 2025 年 3 月下旬至本期；代理变量 = 已公布合约金额折算成 RPO；模型是他自家的 Tokenomics Model；样本口径 84 家评级、209 家追踪、140+ 终端用户访谈。判断：Oracle 一家占八成，背后主要是那份逾 3000 亿美元的 OpenAI 合约，所以「近 4000 亿」不是全行业读数，是少数几张超大单的加总。

二、单集群年化 TCO（总拥有成本，含机器与存储，不含电与运维）：1,024 张 GPU、$3/GPU-hr、按整年计费 = 2,690 万美元；1PB 活跃数据、$0.11/GB/月 = 130 万美元/年，约占 BOM 的 4.6%，并称存储很少超过集群总成本 5%。代理变量是公开 list price，只能当量级。

三、交易结构：超过 90% 的 GPU 云租赁走企业间长期合约，首付 25% + 按月分期。口径自称「行业经验」，无样本、无年份，只能当量级，不能入格。

四、覆盖率「95% By Volume」：全文只出现一次，「volume」是 GPU 数、MW 还是收入没有定义，不能当份额分母。

与 Meta 有关的硬数只有 CoreWeave 2025 年 9 月签下的 6 年 142 亿美元合约，那是公司公告，不算他的估算。

略读交代：逐家点评约占 250 页、150 家以上，只抽读与 Meta、成本、产能相关的 CoreWeave／Nebius／Oracle／Azure／Fluidstack／Crusoe／IREN／Tensorwave 八家，其余按页首行扫过未逐字读——它们是个别供应商的控制台、监控、工单细节，对八问无增量。

### 依据
- p.5｜Before we even get to the results, we’d like to point that since releasing v1.0 in late March, our highest rated Neoclouds have collectively booked nearly $400Bn in Remaining Performance Obligations (RPOs).
- p.6｜<td>Platinum</td><td>Coreweave</td><td>$45Bn</td></tr><tr><td>Gold</td><td>Oracle</td><td>$320Bn+</td></tr><tr><td>Gold</td><td>Nebius</td><td>$17Bn+</td></tr><tr><td>Gold</td><td>Crusoe</td><td>$14Bn</td></tr><tr><td>Silver</td><td>Lambda</td><td>$3Bn+</td></tr>
- p.6｜Source: SemiAnalysis Tokenomics Model来源:SemiAnalysis 代币经济模型
- p.118｜According to list prices, for example, a 1,204 GPU cluster at $3/hr for 1year will co $26.9M.
- p.320｜根据我们的行业经验，超过 90%的 GPU 云租赁业务是通过企业间长期合约完的，标准模式为首付 25%加按月分期直至合约期末——这是典型的 B2B 交易模式。

## Q2 · 他的**物理量**从哪来、能不能核？

本件的电力与机柜数都不是他实测，而是转述厂商公告，口径统一是「宣称容量（claimed／announced）」。

① IREN 德州 Childress 站点 750MW 可用电力，另有 450MW 可扩；来源标注 IREN 新闻稿。同一站点他另记微软 200MW 级、97 亿美元承购。可回溯到公告，但「available power」是接入能力，不是已上架 IT 负载。

② Crusoe 自称 3.4GW 数据中心规模，含怀俄明 1.8GW（设计可扩至 10GW）、Abilene 1.2GW、二叠纪 150MW；他自己在句中用了「claimed」，等于承认未核。

③ CoreWeave 7 月全股票收购 Core Scientific，带来 1.3GW 数据中心 footprint，属公司公告口径，含在建。

④ Tensorwave 图森机房 8,192 张 MI325X，是厂商提供测试环境时的自述。

⑤ Meta：本件没有给 Meta 的 GW、机柜或卡数；唯一可引的是 Meta Llama 3 论文里 16,000 张 H100 同时在跑（8 组 × 3,072 张），那是一手论文，可回溯。

判断：①—④ 都能追到公司公告或新闻稿，属「来源可回溯」，但没有并网、上架、可用率任何一道中间核验，所以只能当旁证，口径必须写成「宣称」；⑤ 是全文唯一可以当事实用的物理量。若要用它估 Meta 的自建与租用比例，本件给不出。

### 依据
- p.64｜Childress 750MW Texas Available Power
- p.64｜Source: IREN Press Release
- p.156｜After all these announcements, Crusoe is left with a claimed 3.4GW of datacenter footprint, some of which is already showing up as revenue on their balance sheet.
- p.98｜They have also announced an all-stock acquisition of Core Scientific in July for $9 which represents a 1.3GW expansion of datacenter footprint.
- p.234｜Tensorwave is a provider that recently raised a $100M Series A from AMD Ventur As a result, they have an exclusive focus on AMD hardware, including 8,192 MI325 GPUs in their Tucson, Arizona datacenter.
- p.113｜Meta’s Llama 3 paper is the most clear description of where reliability issues can manifest in a training campaign.

## Q3 · 这份材料是**四种交付物里的哪一种**？同源的另一份是哪一份？

按内容判：本份是 `bilingual`——每一段英文原文后面紧跟同一段中文译文，页首标题也是中英并列，正文没有被压成要点条目，也没有只剩摘要，所以既不是 `original`（纯原文）也不是 `summary`。作业书与文件名把它登记为 `original`，那是按命名而非按版式；实际版式是逐段对照的双语件，按手册「以内容判」归 `bilingual`。

同源组：`03-independent-research-0000-00-00-clustermax2bilingual`，即同一篇 ClusterMAX 2.0 的另一份双语交付（122 页，版式更完整、保留了图位），与本份（355 页，同样中英并列但行尾被版面裁切）是同一原文的两种交付物。两份共用一个来源，不得计成两个独立源；本份的依据只从本份原文抄。

判断：本份行尾截断（如「up from in ClusterMAX 1.0」「will co $26.9M」）属 PDF 版面裁切，不是译者删节，抄依据照抄、不补字；若两版数字不一致，以本份为准并注明。

### 依据
- p.1｜ClusterMAX™ 2.0: The Industry Standard GPU Cloud Rating System ClusterMAX™ 2.0:行业标准 GPU 云评级系统
- p.2｜自 ClusterMAX 1.0 发布六个月以来，行业格局已发生显著变化。
- p.4｜CoreWeave 继续保持铂金级唯一成员地位。在与终端用户的访谈中，CoreWe始终是行业标杆，也是唯一能够持续获得溢价空间的云服务提供商。

## Q4 · 他的**假设与算式**能不能复算？

挑两处可复算的。

一、TCO 算例：假设 1,024 张 GPU × $3/GPU-hr × 8,760 小时 ⇒ 2,691 万美元，与他写的 2,690 万吻合，复算通过。但文中写「1,204 GPU」，按 1,204 算是 3,164 万美元，比 2,690 万高 17%——说明 1,204 是排版或 OCR 错，真值应为 1,024（与他后文 Nebius 的 1,024 卡算例一致）。同段存储：1PB × $0.11/GB/月 × 12 ⇒ 132 万美元，复算通过；但 132 ÷ 2,690 = 4.9%，他写 4.6%，差约 6%，属凑整。

二、MTBF（平均无故障间隔，按 GPU 小时计）：1,024 张 × 336 小时 ÷ 13 次故障 = 26,446 GPU-hr，与他给的数一致，复算通过。Meta 那组：16,000 张 × 1,296 小时 ÷ 419 次 = 49,489 GPU-hr，他写 50,677，差 2.3%；只有把卡数换成 16,384 张才等于 50,677——他用的是 16,384（16k 的整数化）而不是正文写的 16,000。

判断：算式结构清楚、可复算，但两处输入数与结果不自洽（1,204 与 16,000），说明数字经手多人、排版后失校。转引时只能抄他的算例并自带卡数，不能直接抄结果数字。

### 依据
- p.118｜以公开报价为例，1,204 个 GPU 组成的集群按每小时 3 美元计费，运行 1 年的成本达到 2,690 万美元。
- p.132｜有趣的是，Nebius 在其博客中声称，在 1,024 个 GPU 组成的集群上，336 小时（天）内仅发生 13 次故障，由此计算出 GPU 级别的平均故障间隔时间为 26,446 GP小时（即 1,101 GPU 天）。
- p.132｜When compared to the data from Meta’s Llama 3 paper, which claims 419 failures 1,296 hours (55 days) on a 16,000 GPU cluster, there is a GPU-level MTBF of 50,67 GPU-hr, or 2,111 GPU-days

## Q5 · 关键数字的**脚注指向哪**？

逐个关键数看指向。

① 最值钱的 RPO 表，唯一来源行是「Source: SemiAnalysis Tokenomics Model」，指向自家付费模型：不是监管文件、不是公司公告、也不是独立第三方，属自建模型推算，只能记二手以下，无法核。

② 可靠性对比（Meta 419 次故障、2,111 H100-天）指向 arXiv 上的 Llama 3 论文，一手，可记 Ⅰ 档。

③ 产能类（IREN 750MW、Crusoe 怀俄明 1.8GW）指向 IREN 新闻稿与 crusoe.ai 新闻页链接，一手公司公告，可记 Ⅰ 档——但只是宣称值（见物理量一题）。

④「Oracle 掌握美国 Stargate 逾 60%」那句，英文到「according to the」就断了，来源被版面裁掉，无法核，只能当旁证。

⑤ 成本结论（IREN 合约经济性）指向「our AI Cloud TCO Model」，同样是自家模型，不可核。

判断：本件不是译本丢脚注，而是原文多数段落本就没有编号脚注，只在图表下给一行 Source；能当 Ⅰ 档的只有公司公告与论文两类，凡挂「我们的模型」的数字都不可复核，引用时必须降档。

### 依据
- p.6｜Source: SemiAnalysis Tokenomics Model来源:SemiAnalysis 代币经济模型
- p.115｜Source: The Llama 3 Herd of Models https://arxiv.org/abs/2407.21783
- p.154｜A 1.8GW datacenter in Wyoming, with a design to scale up to 10GW: https://www.crusoe.ai/resources/newsroom/crusoe-and-tallgrass-announce-ai-data-center-in-wyoming.
- p.136｜They currently have over 60% of US Stargate according to the
- p.300｜For a deeper analysis of the economics or IREN’s publicly announced AI cloud contracts, our AI Cloud TCO Model is the best tool.

## Q6 · 他的**自建口径 / 评级**定义是什么？与公司口径差多少？

定义拿全了：10 类标准（安全、生命周期、编排、存储、网络、可靠性、监控、定价、伙伴关系、可用性），细化成 129 项检查项，最后落到五档——Platinum／Gold／Silver／Bronze／Underperforming（Not Recommended 再分 Underperforming 与 Unavailable 两支）。档位描述也给了：白金「各维度卓越、可获价格溢价」；金「全面良好、有小缺口、靠最低 $/GPU-hr 加准时交付赢单」；银「合格但差距明显」；铜「满足最低标准、最后才会推荐」。

打分规则只给方向、没给权重：明说这是相对评级体系，各项相对同行评估；但既无每项分值、无类目权重、无合成公式，也无档位阈值，129 项怎么汇总成一个字母不公开。按本批口径记「定义不完整（缺权重）」——档位名可当标签，不能当连续变量，也不能据此算溢价幅度。

与公司口径有三处方向性差异：① 云厂商自报 SLA 是「节点 99% + 机架 95%」，他把「机架级 uptime 保证与罚则」当成白金／黄金的分水岭；② 厂商按 $/GPU-hr 比价，他主张白金可以单价更贵而 TCO 更低，方向相反；③ 他把价格降为 129 项之一，明确反对把 GPU 算力当大宗商品、拿单一单价做比较。

### 依据
- p.11｜Following an evaluation against 10 key criteria (Security, Lifecycle, Orchestration, Storage, Networking, Reliability, Monitoring, Pricing, Partnerships, and Availabil we assign one of five ratings to a given Neocloud (Platinum, Gold, Silver, Bronze, Underperforming).
- p.11｜It is important to understand that this is a relative rating system.
- p.320｜This is an importa criteria, but it is just one the 129 criteria that we use to assess a provider’s quality, is often a poor proxy for the realized TCO of a cluster.
- p.12｜In practice, Platinum-tier providers a able to command a pricing premium over their competitors, due to a recognition t the TCO of their offering is better, even if the raw $ per GPU-hr is higher when compared directly to a competitor.
- p.58｜1. A provider commits to a node level SLA, and a rack level SLA. In other words, individual nodes must have a 99% uptime, but a rack (defined as 16 of the 18 nodes, or 64 of 72 GPUs) has a lower SLA at 95%.

## Q7 · 他**有没有投行关系 / 持仓**？

三项分开：是否收费顾问——未声明；是否有投行关系——未声明；是否持仓或受资助——未声明。

查了哪里：文末确有「Disclaimer 免责声明」段，但通读只有两层内容，一是标识与商标的合理使用、不构成背书，二是 ClusterMAX 的方法与数据属 SemiAnalysis 知识产权、用于创设金融产品须事先书面许可。全文没有持仓、顾问、承销、受资助任何一句。封面「PAID」是付费墙标记，不能拿来当「无投行关系」的证据。

但有两处实质关系必须记：① 供应商免费提供测试资源——Tensorwave 那段明说提供远超 ClusterMAX 范围的 GPU 供其基准测试，作者称「感谢支持」；② 评级标准提前发给被评方——129 项清单在 8 月 6 日发给所有有合作关系的云厂商，随后多家据此改产品、延迟交付，作者还为此扣分。

判断：关系不明，按「不得假定独立」处理；引用其评级时须注明「被评方提供测试机、标准提前披露」，否则会把一份有互动的评测当成盲测。

### 依据
- p.353｜The logos and associated trademarks are displayed herein solely for editorial and informational purposes, consistent with the principles of fair use under applicable law.
- p.353｜The content, methodology, and data presented in ClusterMAX™ are the intellectual prop of SemiAnalysis.
- p.234｜Since we love all GPUs and love AMD, have been working with Tensorwave for a long time as they graciously provide us access to GPUs for benchmarking that is well beyond the scope of ClusterMAX.
- p.15｜Notably, this list was sent to all GPU cloud providers where we have working relations on August 6th .

## Q8 · 他的**行业级判断**（产能 · 份额）有数据支撑吗？

分三类看，支撑强度差别很大。

① 覆盖与样本：209 家追踪、84 家评级、37 家拿到奖章档、140+ 终端用户访谈，这是可数的样本量；但「95% Coverage By Volume」只出现一次，「volume」没定义（GPU 数？MW？收入？），所以任何份额断言的分母都不明。

② 产能：断言是「加密矿工带着吉瓦级站点进场」，例证是 IREN 750MW、Crusoe 自称 3.4GW、CoreWeave 并购 Core Scientific 增 1.3GW，全是 announced／claimed，不是投运容量，也没折算成可租 GPU 数。

③ 份额：唯一带数字的是「Oracle 掌握美国 Stargate 逾 60%」，但来源句被截断，无法核；「Azure 将失去市场份额」是预测，全文没有一个份额百分数；对新云整体的份额没有任何测算。

判断：份额类结论只有方向、没有可复算分母，按本批口径记「观点」不是读数；能进模型的只有 RPO 那组，且高度依赖 OpenAI 单一大单。若要用它判断 Meta 的算力外购比例，本件给不出——与 Meta 直接相关的只有一句全球基础设施负责人的背书，以及一份 CoreWeave 与 Meta 的六年合约。

### 依据
- p.1｜95% Coverage By Volume, 84 Providers Rated, 209 Providers Tracked, 140+ Customers Surveyed, 46,000 Words For Your Enjoyment
- p.4｜Many more clouds from all around the world debut at the Bronze or Silver tier a total of 37 clouds achieving a medallion rating.
- p.136｜They currently have over 60% of US Stargate according to the
- p.148｜The reality is that we are forecasting Azure to lose share in the market when considering the frontier labs compute requirements and existing commitments.
