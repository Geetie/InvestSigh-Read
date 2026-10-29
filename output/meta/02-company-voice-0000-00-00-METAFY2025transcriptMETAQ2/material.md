---
id: 02-company-voice-0000-00-00-METAFY2025transcriptMETAQ2
cat: "02"
sub: company-voice
template: company-voice
template_version: 2
date: 0000-00-00
time: "00:00"
title: "Meta 2025Q2 财报电话会问答（原件未标日期）"
kind: "财报电话会问答"
issuer: "Meta Platforms, Inc."
ticker: META
source_pages: 6
---

> 原文：`corpus/materials/02-company-voice-0000-00-00-METAFY2025transcriptMETAQ2/pages.json`（`p.N` 为逻辑块号，非 PDF 页码）。（6 页）。
> 依据为逐字片段，可 `node server/check.mjs 02-company-voice-0000-00-00-METAFY2025transcriptMETAQ2` 复验；引用纪律见 `docs/EVIDENCE-SPEC.md`。

## 1 · 他把**哪个指标放最前**、哪个**只提一句或埋在中间**？

他把 **2026 年总费用（尤其是折旧）放在最前**，CapEx 排在费用之后，而**收入整场没有出现**；股权补偿与股东回报只在中段被一句带过，Meta AI 变现则被埋在后半场。

具体：本场第一个提问来自高盛的 Eric Sheridan，他要求 Mark 讲 AI 学习，并要求 Susan 把人才与算力如何驱动未来 12 到 18 个月的 OpEx 与 CapEx 讲细。Susan 的回答顺序是先"2026 年总费用"——她明确 infrastructure 是 2026 年费用增长的最大单一贡献项，主因是折旧增速陡升，员工薪酬排第二——之后才用一句"On the CapEx side"转到 CapEx。三处同指检验：提及次数上，基础设施／折旧／服务器在 Susan 的两段、Justin Post 的 ROI 段、Mark 的 gigawatts 段反复出现；是否被用来解释别的指标上，折旧被用来解释 2026 年费用增长，CapEx 被用来解释未来折旧，收入一次都没有被用来解释任何东西；被追问时是否回到它上，Mark Shmulik 问超智能的进展 KPI、Ron Josey 问 Meta AI 变现、Youssef Squali 问股权补偿与稀释，三次都没有回到收入。三处指向一致，不构成矛盾。

判断：这场会的指标排序是"费用 → CapEx → 收入缺位"。收入唯一出现的地方是一句否定——GenAI 今年和明年都不是有意义的收入驱动。读这份材料时不能把"AI 投入"顺手当成"AI 收入"，公司在同一份记录里把两者明确分开了。

### 依据
- p.1｜And Susan, building on Mark’s comments on scaling talent and compute, I wanted to know if you could go a little bit deeper in how we should be thinking about those two components driving some of the commentary you’ve given around OpEx and CapEx over the next 12 to 18 months.
- p.2｜we expect infrastructure will be the single largest contributor to 2026 expense growth
- p.2｜After that, employee compensation is the next largest driver of expense growth in ’26
- p.2｜On the CapEx side, the big driver of our increased CapEx in ’26 will be scaling GenAI capacity
- p.4｜we don’t expect that the GenAI work is going to be a meaningful driver of revenue this year or next year

## 2 · 核心主题（执行 / 战略 / 市场 / 资本配置）**在报表里找得到对应吗**？

四个反复出现的主题里，**只有"基础设施成本"与"CapEx"两项能在报表上找到对应科目**，而且都没有金额；资本结构与产品叙事三项对不上任何科目。

具体：（一）基础设施 → 对到利润表的**折旧费用与运营费用**：Susan 说 2026 年折旧费用增速陡升，来源是 2026 年新增投入使用资产的增量折旧、加上 2025 年部署的资产明年计满一年折旧，另加能源、租赁、维护与云服务支出；方向对得上，数字没有。（二）CapEx → 对到现金流量表的**投资活动**，驱动项被说成 GenAI 训练容量带来的服务器、网络、数据中心支出，仍无数。（三）"与财务伙伴共同开发数据中心" → 本份只到"探索"这一步，且明确没有任何已敲定的交易，因此**对不到任何科目**（是否出表要等落地才谈得上）；这一行必须留空，不许用行业惯例替它补一行。（四）超级智能研究进展、推荐系统路线图、眼镜形态、Meta AI 参与度 → **叙事，无对应科目**；其中"平台上有 10 亿用户"是 Ron Josey 提问里的说法，Mark 既没确认也没纠正，不能登记为经营量。

判断：可对上的全部落在**费用与现金流**一侧，收入侧一项都对不上。这是本份最值得上报的一条：一份通篇讲 AI 的电话会，其可核部分只落在成本端，收入端的唯一表述是"今年和明年都不构成有意义的驱动"。

### 依据
- p.2｜That’s driven primarily by a sharp acceleration in depreciation expense growth in 2026
- p.3｜but we’re also exploring ways to work with financial partners to codevelop data centers
- p.4｜we don’t expect that the GenAI work is going to be a meaningful driver of revenue this year or next year
- p.2｜the big driver of our increased CapEx in ’26 will be scaling GenAI capacity as we build out training capacity that’s going to drive higher spend across servers, networking, data centers next year
- p.2｜the other component of infra cost growth next year would come from higher operating expenses including energy costs, leases, maintenance and operational expenses that are associated with maintaining that fleet

## 3 · 问答里他是**直接给数字，还是打太极、换话题**？

整场**没有给出任何一个绝对金额或区间**，属于"给方向不给数"；其中一处明确拒答，一处把比较题换成了承诺题。

具体逐条：（一）Doug Anmuth（JPMorgan）把'26 CapEx 说成"超过 1000 亿美元"并问是否全部自筹 → Susan 只答"预期自筹其中很大一部分"，并称在探索与财务伙伴共建数据中心、"没有已敲定的交易"。这个 1000 亿美元是分析师的推断，公司**没有认领、也没有纠正**。（二）Justin Post（BofA）问 CapEx 的 ROI → 答 core AI"继续看到强 ROI、可测量性好"，GenAI"在回报曲线上早得多"，且"今年或明年都不会是有意义的收入驱动"——给分层，不给数。（三）Mark Shmulik（Bernstein）问收入与投资节奏的关系是否变了 → 答首要看合并营业利润增长、"而且不会线性"——定性。（四）Ron Josey（Citi）问 Meta AI 的采用与搜索变现 → 答"我不会深入讲这条路线图"——明确拒答。（五）Youssef Squali（Truist）问股权补偿是否显著快于收入与 OpEx 增长 → 没有回答是或否，只说影响已反映在修订后的 2025 年费用展望里、会盯稀释、靠回购抵消股权补偿并派季度现金股息——把比较题换成了资本配置承诺。（六）Eric Sheridan（高盛）问 12 到 18 个月的 OpEx／CapEx 驱动 → 给结构排序，无数量。（七）Brian Nowak（Morgan Stanley）问核心推荐还有哪些提升 → 定性路线图。

判断：全篇 0 个金额，唯一带"数"的东西是股息的"季度"频率和变现支柱的"五"这个个数。把"没给数"读成"态度谨慎"是错的：公司同时给出了"2026 年预算尚未启动"这个原因，那是**明示的信息缺口**，不是保守的口风。

### 依据
- p.3｜And then, Susan, your comments on ‘26 CapEx suggest more than $100 billion of spend next year potentially. Do you continue to expect to finance all this yourself?
- p.3｜We certainly expect that we will finance some large share of that ourselves
- p.5｜I’m not going to get super deep into the roadmap on this
- p.6｜the impact of the sort of increased compensation costs including SBC, of our AI hires this year is reflected in the revised 2025 expense outlook

## 4 · **哪个问题被不同分析师反复追问**？给**基数**了吗？

被反复追问的是 **CapEx 的规模与资金来源**：四位不同提问者换了四种措辞问同一件事，答法越问越窄，且**全程没有给基数**。

具体：（一）Eric Sheridan（高盛）问人才与算力这两个成分如何驱动未来 12 到 18 个月的 OpEx 与 CapEx → 给结构排序（基础设施第一、薪酬第二、GenAI 容量驱动 CapEx），无金额。（二）Doug Anmuth（JPMorgan）直接把分析师的算术摆到台面上（超过 1000 亿美元），问是否全部自筹 → 只答融资方式，规模不接。（三）Justin Post（BofA）问产能是否只自用、ROI 怎么看 → 只答用途（目前不考虑外部用例）与 ROI 分层，仍无数。（四）Mark Shmulik（Bernstein）问收入与投资节奏的关系 → 退到利润口径（合并营业利润增长、不会线性）。答法的收窄路径很清楚：**规模 → 融资方式 → 用途 → 利润口径**，四次都没有落到数字上。

基数：**没给**。1000 亿美元出自 Doug Anmuth 的问句，不是公司指引；Susan 既没认领也没否认，且同段说明 2026 年预算尚未启动。同场另有两组追问（超智能的进展指标：Brian Nowak 问技术约束与门槛、Mark Shmulik 问 KPI；开源路线：Doug Anmuth）同样一个基数都没有。

判断：这是本份"追问最凶、基数最缺"的一题。任何把这句 1000 亿美元写成公司口径的转述，都是把分析师的算术当成了公司指引。

### 依据
- p.3｜And then, Susan, your comments on ‘26 CapEx suggest more than $100 billion of spend next year potentially. Do you continue to expect to finance all this yourself?
- p.4｜So at present, we’re not really thinking about external use cases on the infrastructure
- p.5｜we’ve said in the past that our primary focus from a profitability perspective is driving consolidated operating profit growth over time. And it won’t be linear.
- p.2｜we haven’t, in fact, kicked off our budgeting process for 2026
- p.4｜what are kind of some of the markers or KPIs that you’re tracking on whether you’re on track and making progress?

## 5 · 同一问题**上一季怎么答**？措辞变了吗？（`预计→希望→正在努力` 的降级是领先信号）

同一件事上一季（CV-2025Q1）的说法是"即便 2025 年产能上线，仍难以满足全公司对算力的需求"；本季改成了"确保内部用例有足够容量"，并把服务器的下单时点说成可按需决定——**短缺叙事换成了采购节奏叙事**。

具体，只记字面：（一）**新增的限定词**是 fungibility（可替代性）、"as we need them and when we need them"、"the best decisions at those times"，三者合起来的效果是把最大一块 CapEx（服务器）说成可推迟、可择时。（二）**删掉的**是"难以满足"这个判断：本季的落点是"Right now we are focused on ensuring that we have enough capacity for our internal use cases"，从"缺"改成"确保有"。（三）本季还**新增了一条范围限定**：目前不考虑把基础设施用于外部用例，上一季没有这个界定。（四）CapEx 侧：上一季是"上调展望但不给数字"，本季仍是给方向不给数字，但**换了一个不给数的理由**——2026 年预算尚未启动（该句在 Q6 处引用）。

判断：方向是从"受限"往"可控"松了一格，但这只是措辞，材料没有给出任何产能、缺口或利用率的数字来支撑这一格。按要求只记字面变化，不替公司解释动机，更不能把"可按需下单服务器"读成"算力已经够用"。

### 依据
- p.4｜we are building the infrastructure with fungibility in mind
- p.4｜we will be ordering servers, which ultimately will be the biggest bulk of CapEx spend as we need them and when we need them
- p.4｜Right now we are focused on ensuring that we have enough capacity for our internal use cases
- p.4｜So at present, we’re not really thinking about external use cases on the infrastructure
- p.4｜best decisions at those times in terms of figuring out where the capacity will go to use

## 6 · **指引**：区间是收窄还是放宽？有没有**撤回全年指引**？有没有"**重申 + 新增限定条件**"？**口径变了吗**？

本份**没有给任何可量化的指引**：2026 年预算尚未启动，只给了费用与 CapEx 增速的"early preview"且全为定性，因此既谈不上区间收窄或放宽，也谈不上撤回全年指引——因为 2026 年的指引从未给出。

具体：（一）Susan 明说还没有启动 2026 年的预算流程，给出这份早期预览的两个前提是有 2026 年基建计划的"大致形状"、以及今年 AI 招聘带来的薪酬增长有可见度。（二）形态上只有方向排序：2026 年总费用里基础设施是最大贡献项（折旧增速陡升），员工薪酬第二；CapEx 由 GenAI 训练容量驱动。**没有上下限、没有中值、没有增速百分比**。（三）2025 年这一侧：Susan 只说 AI 招聘的薪酬（含股权补偿）影响"已反映在修订后的 2025 年费用展望里"，但修订后的数值、修订方向与幅度都没有出现。（四）口径：本份没有宣布任何会计口径变化；只是在融资方式上新提"与财务伙伴共同开发数据中心"，并同时声明没有已敲定的交易——那是一条可选路径，不是口径变更。

判断：这是一份"明说还没到给指引的时候"的材料，既不是"重申加限定"，也不是"撤回"，而是主动标出的信息缺口。任何把它写成"公司指引 2026 年费用或 CapEx 增长"的转述都不成立；再把它和 Doug Anmuth 的 1000 亿美元焊在一起，就更没有依据。

### 依据
- p.2｜we haven’t, in fact, kicked off our budgeting process for 2026
- p.2｜those two things are part of why we gave a little bit of an early preview into the expectations for growth for 2026 total expenses as well as for 2026 CapEx
- p.6｜reflected in the revised 2025 expense outlook and in the comments I made about sort of the 2026, expense outlook
- p.3｜but we’re also exploring ways to work with financial partners to codevelop data centers
- p.3｜We don’t have any finalized transactions to announce

## 7 · 他的指引**兑现记录**怎样（一贯保守 / 一贯激进 / 摇摆）？

**材料未给出此项**：本份没有"指引中值 vs 实际"的可核对照，连上期指引的数值都没有在本份出现，因此无法判断一贯保守、一贯激进还是摇摆。

具体：查了本份全部六块问答，量化承诺为零——2025 年费用展望只被称作"修订后"而无数字，2026 年只有定性预览，且预算流程尚未启动，因此本份不存在可用于对账的指引值。唯一能引的是公司自评：Susan 说 core AI"继续看到强 ROI，衡量能力相当好"，GenAI"在回报曲线上早得多"、"今年或明年都不会是有意义的收入驱动"。这是公司对自身投入回报的判断，**是自评、不是对账**，因为它没有把任何一期说过的数与后来实际数并排放。相近的说法不能算本项，理由正在此：自评只给方向，不含"说过的数"与"实现的数"两端，构不成兑现记录。

判断：记为"样本不足 + 公司自评"，不能拿来当兑现记录，也不许用印象补历史。本份真正的价值在时点上——它记录的是"指引尚未成形"的那一刻，可以作为后续几期对比的起点。

### 依据
- p.4｜on the core AI side, we continue to see strong ROI. Our ability to measure that is quite good
- p.4｜On the GenAI side, we are clearly much, much earlier on the return curve
- p.2｜we haven’t, in fact, kicked off our budgeting process for 2026

## 8 · **资本配置的话和做对得上吗**？（说"估值有吸引力"却几乎不回购；指引算力开支下降却称需求强劲）

对不上，因为**三项口头承诺全部没有金额**：自筹 CapEx 的"很大一部分"、回购以抵消股权补偿、派季度现金股息，都是意愿表述，无额度、无期限、无比例，本份内没有任何实际发生额可以对照；而回购这一项到 2025Q4 那场电话会（2026-01-28）上被明确改口。

具体：（一）本份 Susan 说预期自筹 CapEx 的"很大一部分"，同时在探索与财务伙伴共建数据中心、且"没有已敲定的交易"。（二）同一位 CFO 在收尾时说，强财务地位允许公司在支撑这些投资的同时继续回购股份、作为抵消股权补偿的回购计划的一部分，并向投资人派发季度现金股息。（三）与做的对照：本份是纯问答、没有现金流量表数字，所以当场对不了账；能对账要往后看——到 CV-2025Q4（2026-01-28），Mark Mahaney 直接问本季是不是没回购，Susan 答资本的最高优先级是投 AI、回购会"机会主义地评估"，本份"继续回购以抵消摊薄并派息"的措辞在那一季被收回，这是全批最好的一个"话与做"样本。（四）"与财务伙伴共建"这条在 CV-2025Q3 落地为 Blue Owl 合资：数据中心建设成本不再计入 CapEx、Meta 按持股比例出剩余建设成本的 20% 并记入 other investing cash flows——那是**口径变动，不是支出消失**，本份的"探索"正是它的前身。

判断：本份三项承诺应记为"未量化的意向"，不能记为已执行；回购那一条必须连同后续两期的改口与合资安排一起读，否则会把一次措辞转向读成一项持续政策。

### 依据
- p.6｜our strong financial position is going to allow us to support these investments while continuing to repurchase shares as part of the sort of buyback program that offsets equity compensation and as well as provide quarterly cash dividend distributions to our investors
- p.3｜We don’t have any finalized transactions to announce
- p.3｜We certainly expect that we will finance some large share of that ourselves

## 9 · ★ **什么"没了"**？（客户数被"客户群增长"取代、留存停更、地域拆分消失）

与上一期（CV-2025Q1）相比，本期少了三样：**收入指引、Reality Labs 的季度亏损口径、Meta AI 的用户数**——最后一项是被问到了却没接。

具体，三种消失分开记：（一）**不再披露**：收入展望。上一期给的是"Q2 收入展望的区间宽度为 30 亿美元"这一形态，本份全篇没有收入指引，收入只在一句否定里出现。（二）**不再披露**：Reality Labs 的亏损。本份谈眼镜只谈形态、显示、Orion，以及"过去 5 到 10 年一直在 Reality Labs 把研究做满"，一个字没提每季约 40 亿美元的亏损——上一期那是 Mark Mahaney 提出、公司既未否认也未给新数的一个数。（三）**换了名字／换了口径**：Meta AI 的用户数。Ron Josey 在问句里说"你们平台上有 10 亿用户"，Mark 的回答换成了模型迭代（Llama 4 到 Llama 4.1）与"engagement increases"这种参与度说法，既没确认 10 亿，也没给任何用户数。

判断：三种消失含义不同——前两项是这一场没被追问、公司也没给；第三项是被问到却换了口径。把"engagement increases"读成"用户数还在增长"属于越读；本份能确证的只有一件事：公司没有接这个数。

### 依据
- p.5｜now you have 1 billion users on the platform
- p.5｜we do see that as we continue improving the models behind Meta AI and post training and just engagement increases
- p.6｜This is kind of what we’ve been maxing out with Reality Labs over the last 5 to 10 years
- p.4｜we don’t expect that the GenAI work is going to be a meaningful driver of revenue this year or next year
- p.5｜when we go from Llama 4 to Llama 4.1 when we have that

## 10 · 他说"**将 / 预计 / 目标**"的地方，市场当成"**已 / 达**"了吗？

本份**没有把"目标"改写成"已达成"的硬案例**；唯一一处进度表述跑在产品状态前面的是眼镜——Mark 说在造眼镜上"领先了几年"，同一段又自陈现在做的款式"不以显示为核心"。

具体：（一）"已／达成"式措辞：Mark 说眼镜品类"clearly doing quite well"、每天用 Meta AI 的比例在升，并称"we're just several years ahead on building out glasses"；但同一段里，带显示的形态（Orion 那样的全息视场、或更小的显示屏）被说成"要探索的一整套东西"，且明确"现在做的是好看、但不以显示为核心的款式"。（二）"计划／预计"式措辞：他说五年前若问先有全息还是先有超智能，多数人会以为先有全息，并把这称为技术行业的一个怪现象——这是回顾性判断，不是承诺，也没有时点。（三）提问侧的"homerun"是 Youssef Squali 的评价，不是公司披露，不能登记成公司说达成。（四）市场反应：本批材料没有股价与市场反应数据，这一层只能写材料内部的表述落差，不编市场反应。

判断：把"领先数年"与"显示形态还没做出来"并置，是本份唯一的进度落差，记为**进度描述先行**，不记为"计划被说成达成"。另有一处要盯住：Susan 说 AI 招聘的薪酬影响"已反映在修订后的 2025 年费用展望里"，但修订后的数始终没出现——这个"已反映"在本份内无法核。

### 依据
- p.6｜I think we’re just several years ahead on building out glasses
- p.6｜Right now we’re building ones that I think are stylish, but aren’t focused on the display
- p.5｜the Ray-Ban initiative has been a homerun for you guys so far
- p.6｜this product category is clearly doing quite well
- p.6｜the percent of people who are using it for that on a daily basis is increasing
