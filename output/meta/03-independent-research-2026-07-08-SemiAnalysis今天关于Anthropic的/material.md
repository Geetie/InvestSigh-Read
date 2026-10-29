---
id: 03-independent-research-2026-07-08-SemiAnalysis今天关于Anthropic的
cat: "03"
sub: independent-research
template: independent-research
template_version: 2
date: 2026-07-08
time: "00:00"
title: "SemiAnalysis：Anthropic 3Q26 利润超 10 亿美元，IPO 前的财务底牌（2026-07-08）"
kind: "independent-research"
issuer: "SemiAnalysis / Joey Brookhart、Crystal Huang、Dylan Patel"
ticker: META
source_pages: 36
---

## Q1 · 他给的公司**未披露口径**的外部估算是什么？

全文的损益表与估值是 SemiAnalysis 代币经济学（Tokenomics，按 SKU、套餐层级、客户类型自下而上重建实验室财务的模型）团队做的，属外部估算。主要几项：Anthropic 季度总收入 1Q26 48.9 亿、2Q26 115.1 亿、3Q26 201.3 亿、4Q26 301.9 亿美元（口径为 GAAP 总额收入，期间为自然季度）；3Q26 GAAP 息税前利润约 10 亿美元即 6% 利润率；单兆瓦年化收入 2026 年底约 6,000 万美元、9 个月前为 1,600 万美元；混合毛利率中段 60%（2024 年为 -94%），API 毛利率 80% 以上；美国付费消费者月均支出约 45 美元（代理变量是银行卡面板数据，样本量未披露）；OpenAI 每个免费用户月服务成本略低于 0.70 美元、以 9 亿免费用户计侵蚀毛利率 20–30%；编码用例占实验室 ARR 65% 以上；Meta 是其最大客户但只占收入 3–5%、支出九位数；间接渠道（Bedrock/Foundry）已占 ARR 15–20%。单兆瓦收入有换算桥（收入÷装机 MW），但 MW 来自自家 Datacenter Model，所以只能当量级，不能入格。

### 依据

- p.2｜Fortunately, the Tokenomics team at SemiAnalysis works to build the financials from the bottom-up by SKU, tier, and customer type.
- p.18｜Anthropic ARR per MW will reach the \$60M range later this year. Just 9 months ago,this number was \$16M.
- p.10｜Our analysis of card panel data suggests that the average paying US consumer is spending around \$45/month on Claude.
- p.20｜This is a 20-30% hit to total gross margins historically and means if both OpenAI and Anthropic had \$100B of ARR, OpenAI would have \$25B less in gross profit.

## Q2 · 他的**物理量**从哪来、能不能核？

三组物理量都出自他的自建模型，不是一手台账。① 现有规模：OpenAI 与 Anthropic 合计可获取算力略超 6GW；② 需求与新增：2030 年两家合计算力需求超 100GW、需净新增超 90GW，而 2025 年新增 2.5GW、2026 年预计 5GW；③ 内部结构：目前 60% 以上算力用于训练与内部用途，2030 年训练与推理为 48% 对 52%。GW 的口径是「IT 容量」，供给侧由 Datacenter Model 按数据中心建设时间表推算，需求侧由「训练支出占收入比＋每兆瓦推理 ARR」外推，两端拼在一起得出缺口。全文没有给逐个园区、机柜或加速卡清单，也没有任何可对账的中间步骤，因此记来源不可回溯，数值只能当旁证。材料未给出 GPU 张数、机柜数与晶圆产能这几项。

### 依据

- p.6｜In fact, we see over 100GW of compute demand between OpenAI and Anrthropic by the end of 2030.
- p.6｜Today, we estimate OpenAI and Anthropic have access to just over 6GW of compute.
- p.5｜supply-based method in our Datacenter Model which tracks the timeline and progress of data center builds.
- p.21｜At Anthropic, we estimate over 60% of compute today is earmarked for Training and internal purposes.

## Q3 · 这份材料是**四种交付物里的哪一种**？同源的另一份是哪一份？

本份是 bilingual（双语句对齐）：封面标题、副题、三位作者名、日期都是中英两行并列，正文逐段「英文一段、紧接中文同一段」交替排布，英文段与中文段常常落在相邻两页上，文末保留英文的 Substack 版权行。判断依据是页面并列格式而不是文件名。同源组：按全批统一的同源对照表，SemiAnalysis 这篇 Anthropic 3Q26 财务件在表内只有本 id 一行，没有 original、translation 或 summary 的兄弟件，所以本份单独构成一个来源，不存在「一篇原文被拆成多份文档、被重复计成多个独立源」的风险；库里若出现同题中文转载，也只能算同一来源的再分发。

### 依据

- p.1｜Anthropic 3Q26 Profit Over \$1B: TheAnthropic IPO Financials Sneak PeakAnthropic2026年第三季度利润超10亿美元：Anthropic IPO财务数据抢先看
- p.1｜JUL08,20262026年7月8日·PAID已付费
- p.3｜In this article, we'll dive deep into the work our team has done in the Tokenomics Model and walk you through the financial details of Anthropic
- p.4｜本文将深入探讨我们团队在代币经济学模型中的工作成果，带您了解Anthropic 的财务细节、与OpenAI的对比

## Q4 · 他的**假设与算式**能不能复算？

最关键结论是估值：2027 年末 ARR 3,000 亿美元的 20 倍等于企业价值 6 万亿美元。复算 3,000×20 = 60,000 亿美元即 6 万亿，复算通过。上游链条也能对上：CFO 口径净美元留存 500%，意味着一批客户从 1Q25 的 20 亿美元 ARR 长到 1Q26 的 120 亿美元（6 倍即 500%），300 亿减 120 亿余 180 亿美元来自新客户，与文中说法自洽。3Q26 的「10 亿美元 GAAP 息税前利润」用季度收入 201.3 亿乘 6% 得 12.1 亿，差约 20%，属 6% 四舍五入与口径截断，方向一致。不能复算的是 20 倍这个倍数本身：材料没说它取自哪组可比公司、哪段历史区间，也没有与 OpenAI 或超大规模云商的倍数交叉验证，因此只能当作者的定价主张，不能当推导结果。

### 依据

- p.36｜Our base case for valuation is 20x 2027,ending ARR of \$300B (\~15B/month of NNARR in 2027). This would put Anthropic's enterprise value at \$6 trillion - making it the world's largest company.
- p.13｜This means \$12B of Anthropic's \$30B of 1Q26 ARR was driven by the customers who were just \$2B of ARR in 1Q25.
- p.21｜Anthropic, at \$1B of GAAP EBIT in 3Q26 (6% margin) and growing NNARR faster than OpenAI

## Q5 · 关键数字的**脚注指向哪**？

没有独立脚注区，只有数据表下方的 Source 行，而且绝大多数写「SemiAnalysis Tokenomics Model / Datacenter Model」，即作者自建模型，属二手推导，按规则只能记 Ⅱ 档。能算一手或准一手的只有少数几句：Anthropic 官方帮助页的 Claude Code 企业用户月支出 150–250 美元、CFO 在播客里给的 500% 净美元留存、OpenAI 首席商务官博客里的 B2B 占比口径，以及《华尔街日报》关于其财务的报道（他人已公开的二手，作者用它反证自家模型准）。剩下的核心数（单兆瓦 ARR、混合毛利率、TaaS 市场规模）既无脚注也无 Source 行。文末只有订阅与版权信息，没有参考文献表；因中英两段同页并列、中文未删掉英文之外的任何内容，判断是原文本身不设脚注，而非译本丢失。

### 依据

- p.15｜来源：SemiAnalysis 代币经济学模型，Anthropic 选项卡
- p.28｜Anthropic's own help pages the company states that the average Claude Code enterprise user spends just \$150-250/month and that 90% of users spend less than \$30/day.
- p.2｜Recently,a WSJ article on Anthropic's financials confirmed the accuracy of the work our Tokenomics team does across labs and hyperscalers

## Q6 · 他的**自建口径 / 评级**定义是什么？与公司口径差多少？

两把自建尺子。① EBTIT（Earnings Before Training, Interest and Taxes，即训练、利息与税收前收益）：作者称它是衡量实验室再投资的新默认指标、也是推理业务现金经济最可靠的口径，做法是把训练算力开支从成本里剔出去再算利润率，2Q26 为 36%。与公司口径的差距在于 GAAP 息税前利润把训练算进去：同一篇里 3Q26 GAAP 息税前利润率只有 6%，一个剔一个不剔，方向差约 30 个百分点，两个数不能混用，也不能拿 36% 去比任何 GAAP 口径。② ARR per MW（每兆瓦年化收入）：算法是年化收入除以已装机 IT 容量，2026 年底约 6,000 万美元每兆瓦；Anthropic 不披露兆瓦与分产品收入，所以这是纯自建指标。另有混合 token 单价（每百万 token 6.44 美元降至 4.84 美元），权重取自缓存命中率、输入输出比与 agentic 对 chat 的工作流组合，也是自建。

### 依据

- p.34｜Earning Before Training, Interest, and Taxes (EBTIT) is the new default metric for lab reinvestment and the best source of truth of where cash economics sit for the inference business.
- p.34｜Anthropic has excelled here at showing that AI can be wildly profitable with 36% EBTIT margins in 2Q26.
- p.13｜Cache rates, input/output ratios,and agentic vs chat workflow mix are all factors in determining blended token pricing.

## Q7 · 他**有没有投行关系 / 持仓**？

三项都未声明。① 是否收费顾问：未声明，全文没有顾问、咨询或客户名单字样。② 投行关系：未声明，文末只有版权与隐私行、以及「对订阅读者收费、模型另售给机构客户」的说明，没有承销商，也没有与 Anthropic 保密递交 IPO 相关的任何角色说明。③ 持仓或受资助：未声明，没有持仓、资金资助或利益冲突段落。付费墙标记只说明内容对订阅读者收费，不能反推「没有投行关系」。因此按「关系不明」处理，不得假定其独立：这篇明确主张 Anthropic 应当抢先 IPO、并给出 6 万亿美元估值，而这一主张与作者是否持有相关头寸、是否正在向潜在承销或投资方销售模型，材料里无从核实。

### 依据

- p.36｜To get access to our estimates, research,and opinions, please reach out to sales@semianalysis.com
- p.7｜SemiAnalysis is a reader-supported publication. To receive new posts and support our work, consider becoming a free

## Q8 · 他的**行业级判断**（产能 · 份额）有数据支撑吗？

有数，但都是自家模型的输出而非统计读数。产能与需求：2030 年 OpenAI 与 Anthropic 的无约束算力需求超 100GW、需净新增超 90GW，对比 2025 年新增 2.5GW；口径是 IT 容量 GW 且为需求侧无约束值，不是已签约容量，无地理拆分，也未区分自建与他租。份额：token 即服务（TaaS，通过云厂商接口转售模型 token）市场 2Q26 约 280 亿美元 ARR，三大云占 85%；但没说这是收入还是签约额、含不含云厂商自售。需求结构：编码用例占实验室 ARR 65% 以上，套壳类公司占 10–15%。资本侧：2027 年超大规模云商自由现金流合计为负九位数、Alphabet 六月已融 847.5 亿美元股权、Meta 融资仅「据传」数百亿。全部口径指向自建模型，无一条指向出货量统计或第三方数据库，只能当观点与其模型输出读。

### 依据

- p.6｜This willrequire over 90GW of net compute additions through 2030 vs 2.5GW added in 2025 and 5GW in 2026.
- p.27｜As of 2Q estimate the market at \$28B of ARR with 85% of the market share between the big 3 clouds.
- p.23｜The Tokenomics team estimates that over 65% of Lab ARR today is from coding use cases and a host of other coding startups such as Cursor, Cognition, Loveable, Replit, and more compose a additional \$6B of ARR as of 2Q26.
