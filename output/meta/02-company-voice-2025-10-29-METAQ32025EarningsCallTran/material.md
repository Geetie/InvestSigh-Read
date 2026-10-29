---
id: 02-company-voice-2025-10-29-METAQ32025EarningsCallTran
cat: "02"
sub: company-voice
template: company-voice
template_version: 2
date: 2025-10-29
time: "00:00"
title: "Meta 2025Q3 财报电话会问答（2025-10-29）"
kind: "财报电话会问答"
issuer: "Meta Platforms, Inc."
ticker: META
source_pages: 6
---

> 原文：`corpus/materials/02-company-voice-2025-10-29-METAQ32025EarningsCallTran/pages.json`（`p.N` 为逻辑块号，非 PDF 页码）。（6 页）。
> 依据为逐字片段，可 `node server/check.mjs 02-company-voice-2025-10-29-METAQ32025EarningsCallTran` 复验；引用纪律见 `docs/EVIDENCE-SPEC.md`。

## 1 · 他把**哪个指标放最前**、哪个**只提一句或埋在中间**？

结论：本份没有准备稿，第一个提问就把主角定在 CapEx 与算力上——它是唯一被用来解释其他指标的指标；利润率、Reality Labs 收入、Meta AI 用户数各只占一句或一段。

具体：**放最前**——Brian Nowak（Morgan Stanley）第一个提问，问的是 2026 年核心改进的管线，以及"凭什么从这些 CapEx 里拿到 ROIC"；Susan Li 的第一段回答直接拆成"2026 CapEx 相对 2025 的增长来自 MSL、core AI、non-AI 三块"，等于把 CapEx 的构成当开场白。**只提一句**——Justin Post（BofA）问新内容周期的利润率，Mark Zuckerberg 只回一句"目标是最大化盈利（profitability），不是利润率（margin）"，没有任何利润率口径或数值；Reality Labs 的收入逆风被 Brian 追问规模，Susan 一句"我们没有量化过确切规模"就收尾。**埋在中段**——Meta AI 的用户数（每月超过 10 亿人）出现在第三位提问者 Eric Sheridan（Goldman Sachs）的回答里，是顺带说出，没有被当成主题指标。

三处同指也对得上：十位提问者里三位直接问到 CapEx（Brian Nowak、Doug Anmuth、Youssef Squali），全场第一问与倒数第二问都是它（提及次数与位置）；它被用来解释 2026 年支出结构、解释核心业务回报、解释为什么要提前建（解释关系）；Doug Anmuth 追问现金目标时，Susan 仍然回到"战略优先是确保有需要的算力"（被追问时仍回到它）。唯一不一致的是"回报"这一层：利润率被问两次（Brian 的 ROIC、Justin 的 margin），两次都没有读数。

判断：这是一份以资本开支为轴的问答，经营质量本身读不出来。最值得记的是"回报"只有叙事没有指标——ROIC 与 margin 都被问到，也都被绕开。

### 依据

- p.1｜The first one, Susan, so the pipeline for core improvements to come in ‘26 with models and ad ranking models and more types of compute seems very exciting, and the infrastructure build seems sizable behind that.
- p.4｜I think it’s too early to really understand what the margins are going to be for the new products that we build.
- p.3｜there’s more than a billion people who use it on a monthly basis.
- p.1｜I will say that the growth in 2026 CapEx relative to 2025 comes from growth in each of the core areas, MSL, core AI, as well as non-AI spend.
- p.4｜I mean my general goal is to build a business that maximizes value for people who use our products and maximizes profitability, not margin.

## 2 · 核心主题（执行 / 战略 / 市场 / 资本配置）**在报表里找得到对应吗**？

结论：四个反复出现的主题里，只有资本开支能落到报表科目；Meta AI／超级智能、Advantage+ 自动化、可穿戴三个都只有叙事或经营量，对不上任何一行。

具体：**资本开支**对得上 CapEx，本份后段还把数据中心建设成本移出 CapEx、改记 other investing cash flows（Blue Owl 合资，按 20% 持股出剩余建设成本）——这一项能对到科目行。**Advantage+**只有经营量：三季度完成 lead campaigns 简化创建流程的全球铺开；用 Advantage+ 跑 lead 的广告主单条线索成本平均低 14%；使用自动化方案的广告主年度收入 run rate 为 \$60 billion。报表里没有"Advantage+ 收入"这一行，run rate 也不是已确认收入。**MSL／超级智能**完全无对应科目：Mark 给的是"行业里人才密度最高的实验室"，模型与产品都"没有具体时间表"，没有收入、没有成本行、没有分部。**可穿戴**只有"卖设备＋服务＋AI"的方向，且落成条件句——"如果继续这么走下去，会是很赚钱的投资"。唯一贴近成本口径的一句是不用 GEM 这类大模型做推理，因为"规模和复杂度会让成本高到不划算"，对得上推理成本，但没有金额。

判断：本份的话密度高、数密度低。把 \$60 billion 读成 Advantage+ 的产品收入是常见误读——它是使用自动化方案的广告主的年度收入规模，且明确被说成"还有增长空间"。

### 依据

- p.5｜advertisers who run lead campaigns using Advantage+ are seeing a 14% lower cost per lead on average than those who are not.
- p.5｜I think Mark mentioned that the annual revenue run right now for advertisers who are using these automated options is \$60 billion, and again, we see that there’s room to continue growing that.
- p.3｜we don’t use our larger model architectures like GEM for inference because their size and complexity would make it too cost prohibitive.
- p.6｜Going forward, the construction cost of the data center will not be recorded in CapEx. As the data center is constructed, we will contribute 20% of the remaining construction costs required, which is in line with our ownership stake, and those will be recorded as other investing cash flows.
- p.5｜And so in Q3, we completed the global rollout of the streamlined campaign creation flow for Advantage+ lead campaigns.

## 3 · 问答里他是**直接给数字，还是打太极、换话题**？

结论：逐条数下来，问答里只有一个给了可核数字（Ron Josey 问 Advantage+），其余是方向、口径或"没有可分享的目标"；回避集中在资本开支规模、回报、时点、利润率四类。

具体逐条判：Brian Nowak 问 A/B 早期可量化信号与 ROIC → 答"价值加权转化率同比很强、转化增长快于曝光"，无数字，回避；同一位问四季度 Reality Labs 收入逆风多大 → "我们没有量化过确切规模"，自认没数，回避；Doug Anmuth 问现金与净现金目标 → "没有具体目标可分享"，回避；Eric Sheridan 问 Meta AI 的消费者信号 → 答"十亿人用、模型变好用量就变好"，无数字，回避；Mark Shmulik 问前沿模型发布时间 → "没有具体时间表可宣布"，回避；Justin Post 问新内容周期利润率 → "现在谈还太早"，回避；Ross Sandler 问 AGI 目标与能马上创收的产品怎么排 → 答能力清单，并明说"不想从竞争或战略角度讲我们在优先什么"，回避加换话题；Mark Mahaney 问 Meta AI 变现路径 → 答"先把使用做起来、模型接进产品后各条变现路径都会改善"，无时点，回避；Ken Gawrelski 问价值归平台还是一方应用 → 答"AI 整体能创造很多价值"，无判断，回避。给数的只有 Ron Josey 那条：14% 单条线索成本优势、\$60 billion run rate、三季度完成全球铺开。Youssef Squali 问 Blue Owl 是否在 2026 CapEx 指引内，得到的是记账规则（不计入 CapEx、20%、other investing cash flows），不是金额。

判断：给数的位置全在"已经发生的广告产品"，回避的位置全在"还没发生的资本开支与回报"。这不是谨慎——尤其现金目标那条，等于承认没有锚。

### 依据

- p.1｜We don’t have specific targets to share, but we do feel like our strategic priority is really making sure that we have the compute that we need to be well positioned to succeed at AI. And that’s sort of the foremost priority as we’re putting together the budget.
- p.1｜On your second question, which is the Reality Labs revenue headwind, I don’t think we have quantified the exact size of that.
- p.3｜I don’t think we have any specific timing to announce certainly on the models or products, but I expect that you will see both.
- p.4｜I think it’s too early to really understand what the margins are going to be for the new products that we build.
- p.5｜And we see that Advantage+ continues to drive performance gains, advertisers who run lead campaigns using Advantage+ are seeing a 14% lower cost per lead on average than those who are not.

## 4 · **哪个问题被不同分析师反复追问**？给**基数**了吗？

结论：被反复追问的是 CapEx——本份内三位提问者直接问它的规模与融资方式，第四位从价值归属侧再问一次，四人都没拿到基数。

具体：问法在递进——Brian Nowak 从"2026 核心改进管线＋这些 CapEx 的 ROIC"切；Doug Anmuth 从"CapEx 美元增长与费用增长对盈利和自由现金流的影响，以及现金／净现金目标"切；Youssef Squali 从"Blue Owl 是否在 2026 CapEx 指引里、会不会让 2026 之后放缓"切；Ken Gawrelski 从"价值归平台还是一方应用"切。答法越问越窄：对 Brian 答"转化率在改善"（回报的方向）；对 Doug 答"预算还在做、没有具体目标"（回报的承诺）；对 Youssef 答"不计入 CapEx、20% 记 other investing"（回报的记账位置）；对 Ken 答"我们看到了核心业务的回报，所以要多投"（回报的感性判断）。从"回报在哪"退到"记在哪"。

基数：没有。2026 CapEx 无绝对数、无区间、无中值，只有"三块都在长、MSL 长得最多"这一句结构描述；Mark 把时间点推到"明年年初"。给过基数的只有广告那条（14%、\$60 billion）。

判断：追问强度与披露程度成反比，是本份最该上报的一处。四位换四种角度都没要到数，更像是预算确实没定，而不是不愿说。

### 依据

- p.1｜I will say that the growth in 2026 CapEx relative to 2025 comes from growth in each of the core areas, MSL, core AI, as well as non-AI spend. So all of those areas are growing, but the MSL AI needs are growing the most.
- p.1｜And do you have targets that we should be thinking about for cash on hand or net cash overall?
- p.5｜Is that part of the CapEx guide for ‘26? And if it’s not, how significant will that way of funding be for Meta going forward and basically will that slow down your CapEx growth past 2026?
- p.6｜we’re seeing the returns in the core business. That’s giving us a lot of confidence that we should be investing a lot more and we want to make sure that we’re not underinvesting.
- p.5｜I think Mark mentioned that the annual revenue run right now for advertisers who are using these automated options is \$60 billion, and again, we see that there’s room to continue growing that.

## 5 · 同一问题**上一季怎么答**？措辞变了吗？（`预计→希望→正在努力` 的降级是领先信号）

结论：同一件事（算力够不够）本份的措辞更紧，方向却是"承认可能建多"，不是"预计→希望→正在努力"那类降级。

具体：跨份并排——CV-2025Q1 的说法是"即便 2025 年产能上线，仍难以满足全公司对算力的需求"；CV-2025Q2 的说法是"目前不考虑把基础设施用于外部用例"，基建要留"可替代性（fungibility）"；本份 Susan Li 说"我们希望今天就有比现在更多的产能"，Mark Zuckerberg 说"我们目前是长期让 Family of Apps 和广告业务处在算力饥饿（compute-starved）状态"，并第一次给出超建的后果："最坏情况是我们实际上提前建了两年的量，那当然会有一些损失和折旧，但我们会成长进去、慢慢用完。"

字面变化：新增"today"（今天）与"perennially"（长期）两个限定词，把"受限"从阶段性说成常态；新增"overshoot／prebuilt for a couple of years"这一让步句，此前没有；删掉的是 Q2 那句 fungibility 承诺，改成"外部一直有人来要 API 或算力，我们还没做，但可以作为选项"。

判断：升级而非降级，公司在为超额投入做预期管理。只记字面与方向——"可能建多"是承认风险，不等于需求已经转弱。

### 依据

- p.1｜We’re certainly seeing that we wish we had more capacity today than we do.
- p.3｜we are sort of perennially operating the Family of Apps and ads business in a compute-starved state at this point
- p.2｜And then, the kind of very worst case would be that we effectively have just prebuilt for a couple of years, in which case of course there would be some loss and depreciation, but we’d grow into that and use it over time.
- p.2｜And we haven’t done that yet, but obviously if you got to a point where you overbuilt, you could have that as an option.

## 6 · **指引**：区间是收窄还是放宽？有没有**撤回全年指引**？有没有"**重申 + 新增限定条件**"？**口径变了吗**？

结论：本份没有 2026 CapEx 的区间，只有定性方向，所以"收窄还是放宽"无从判；真正变的是口径——数据中心建设成本从 CapEx 移到 other investing cash flows。

具体：**区间**：没有上下限、没有中值、没有绝对数。Susan Li 只说"2026 CapEx 相对 2025 的增长来自 MSL、core AI、non-AI 三块，三块都在长，MSL 的 AI 需求长得最多"；预算"还在做、还没定稿"；Mark Zuckerberg 补一句"通常要到明年年初才有更多可分享"。**撤回全年指引**：没有撤回，也谈不上"重申＋新增限定"——本份根本没有给出可撤回的 2026 CapEx 数值指引；2025 全年 CapEx 指引本份未复述（无准备稿）。**口径**：变了。Susan 明说合资成立前的 CapEx 里含了一部分数据中心建设成本，"今后，数据中心的建设成本不会记入 CapEx"，Meta 按 20% 持股比例出剩余建设成本，记入 other investing cash flows。

判断：这是"定性指引＋口径变动"的组合，不是区间指引。2026 年 CapEx 同比增速与真实建设规模从此不同义；任何跨期比较都要先把 Blue Owl 那部分建设成本加回去，否则会把口径变动读成支出放缓。

### 依据

- p.1｜I will say that the growth in 2026 CapEx relative to 2025 comes from growth in each of the core areas, MSL, core AI, as well as non-AI spend. So all of those areas are growing, but the MSL AI needs are growing the most.
- p.2｜as Susan said, we’re still working through the actual budget and I think we’ll typically have more to share on that early next year.
- p.6｜In terms of how that is recognized as CapEx, our prior CapEx reflected a portion of the data center build cost prior to the joint venture being established. Going forward, the construction cost of the data center will not be recorded in CapEx. As the data center is constructed, we will contribute 20% of the remaining construction costs required, which is in line with our ownership stake, and those will be recorded as other investing cash flows.

## 7 · 他的指引**兑现记录**怎样（一贯保守 / 一贯激进 / 摇摆）？

结论：样本不足——本份是纯问答、无准备稿无财务表，没有任何"指引中值 vs 实际"的对照，判不出一贯保守、激进还是摇摆。

具体：材料形态先排除了一种可能——开场就是问答环节，没有管理层陈述，也没有财务表，所以连本季实际值都不在本份。可用的只有公司自评：Susan Li 说 2025 年预算时定的"人头＋算力"路线图"我们以为会在 2026 年见效"，"今年一年下来我们看到这些确实见了效（have paid off）"；Mark Zuckerberg 说"我们看到了核心业务的回报，这让我们有信心应该投更多"。跨份可参照的是 CV-2025Q4 也说过上一年投的"generally paid off"——同样是公司自评。两次自评都没有量化口径：没有 ROIC、没有增量收入归因、没有回报期。

判断：只能记"公司连续两季自评正向"，不能记成"指引兑现良好"。要判兑现记录必须回 01 类报表核实际值，这份材料本身给不了。

### 依据

- p.1｜We will now open the line for a question and answer session.
- p.1｜last year when we were going into the 2025 budget process, we had a roadmap of resource investments across both headcount and compute that we thought would pay off in 2026. And it’s really a very broad range of sort of different ads ranking and performance efforts. And we’re continuing to see that those have paid off through the course of the year.
- p.6｜we’re seeing the returns in the core business. That’s giving us a lot of confidence that we should be investing a lot more and we want to make sure that we’re not underinvesting.

## 8 · **资本配置的话和做对得上吗**？（说"估值有吸引力"却几乎不回购；指引算力开支下降却称需求强劲）

结论：对得上的只有"找外部资本共同开发数据中心"这一条——上季还在探索，本份已宣布 Blue Owl 合资；对不上的是回购与股息，本份通篇未提；而 Blue Owl 最容易被读错：改的是记账位置，不是现金去向。

具体：已落地的——合资把数据中心建设成本移出 CapEx，Meta 按 20% 持股出剩余建设成本，记 other investing cash flows；合资被明说成"与外部资本提供方合作共建数据中心、为未来产能留长期选择权"，理由是产能前景的规模与不确定性。没提的——回购与股息在本份问答里一次都没出现（对照 CV-2025Q2 承诺继续回购抵消股权补偿摊薄并派季度现金股息，CV-2025Q4 改口"资本最高优先级是投 AI、回购机会主义评估"），本份是这条转向的中间站，沉默本身是信号。误读防线——20% 是"剩余建设成本"的 20%，不是"总建设成本"的 20%；这笔钱仍要付现金，只是从 CapEx 行挪到同属投资活动的 other investing cash flows，所以"CapEx 少了"不等于"花钱少了"，也不等于自由现金流同额改善。

判断：本份的资本配置话术已完成从"股东回报"到"产能优先"的切换，Blue Owl 是这条切换的融资工具，不是节流证据。凡引用本份的 CapEx 数，都要同时注明是否含合资部分。

### 依据

- p.6｜In terms of how that is recognized as CapEx, our prior CapEx reflected a portion of the data center build cost prior to the joint venture being established. Going forward, the construction cost of the data center will not be recorded in CapEx. As the data center is constructed, we will contribute 20% of the remaining construction costs required, which is in line with our ownership stake, and those will be recorded as other investing cash flows.
- p.6｜the JV that we announced with Blue Owl is sort of an example of finding a solution that enabled us to partner with external capital providers to co-develop data centers in a way that gives us long term optionality in supporting our future capacity needs, just given both the magnitude, but also uncertainty of what the capacity outlook in future years looks like.

## 9 · ★ **什么"没了"**？（客户数被"客户群增长"取代、留存停更、地域拆分消失）

结论：三类消失本份都出现了——不再披露（EU 广告占比、广告加载空间）、换了名字（Reality Labs 从"每季约 \$4 billion 亏损"换成"收入逆风"）、并进另一口径（Meta AI 用户数走向市场数／对话次数，发生在下一份）。

具体：**Reality Labs**——CV-2025Q1 由 Mark Mahaney（Evercore）提出"连续多季每季约 \$4 billion 亏损"，公司未否认也未更新；本份 Brian Nowak 直接问四季度 RL 收入逆风多大，答"我们没有量化过确切规模"，改谈 Quest 3S 基数与今年没有新头显。亏损口径在本份完全消失，只剩收入口径且无数字。**Advantage+**——Ron Josey（Citi）先说"我们看到 \$60 billion ARR"，Susan Li 复述为"使用这些自动化选项的广告主目前的年度收入 run rate 是 \$60 billion"；这是该数在本批材料中唯一一次出现，CV-2026Q1 换成"800 万广告商至少使用一款 AI 创意工具（2024 年底 400 万）"。**Meta AI**——本份第一次由公司自己给整数："每月超过 10 亿人使用"（此前是分析师口径"接近 10 亿"）；CV-2025Q4 改给"200 多个市场""DAU 最大的市场"而不给数值，CV-2026Q1 换成周对话次数。另有两项在本份问答里彻底没出现：EU/EEA＋瑞士广告收入占全球 16%（只在 CV-2025Q1 出现过一次）、广告加载与推荐系统的剩余空间。

判断：三种消失含义不同——EU 占比与广告加载是"本期问答未提"（本份是纯问答，没人问到的话题自然不出现，不能当作公司停止披露）；RL 是"换了名字"，亏损换成收入逆风、数值一并消失；Meta AI 是"并进另一口径"。最该盯的是 RL：亏损口径消失后，读者失去了唯一能估 RL 拖累的锚。

### 依据

- p.1｜On your second question, which is the Reality Labs revenue headwind, I don’t think we have quantified the exact size of that.
- p.3｜there’s more than a billion people who use it on a monthly basis.
- p.5｜I think we’ve seen a \$60 billion ARR.
- p.1｜The biggest factor is we’re lapping the introduction of Quest 3S in Q4 of last year and we don’t have a new headset in the market this year.
- p.5｜I think Mark mentioned that the annual revenue run right now for advertisers who are using these automated options is \$60 billion, and again, we see that there’s room to continue growing that.

## 10 · 他说"**将 / 预计 / 目标**"的地方，市场当成"**已 / 达**"了吗？

结论：本份真正被说成"已"的只有两处（2025 年投资"见了效"、Advantage+ 简化流程三季度完成全球铺开），其余全是条件句或"没有时间表"；材料内部没有把计划写成达成的硬伤，但那句"已见效"是自评而非对账。

具体：**写成"已"的**——Susan Li 说 2025 年预算路线图"今年一年下来我们看到这些确实见了效"；"三季度我们完成了 Advantage+ lead campaigns 简化创建流程的全球铺开"（后者是可核的完成，有季度有时点）。**仍是"将／预计／目标"的**——2026 预算"还在做、没定稿"，Mark Zuckerberg 说"通常明年年初会有更多可分享"；前沿模型"没有具体时间表"；MSL 的模型"等它准备好了"才接进产品；可穿戴"如果继续这么走下去，某个时点会是很赚钱的投资"，条件句，不是达成。落差点在于：唯一被写成"已见效"的是投资回报，但它没有量化（无 ROIC、无增量收入归因）；同一份里 2026 年的支出还停在"预算未定"——所以"已见效"支撑的是"要继续投"，而不是"已经投对了"。

判断：市场反应这一层本份给不了，材料里没有股价与市场反应数据，只能写表述落差。若后续材料出现"CapEx 已带来回报"的说法，应回对本份这句自评——本份的措辞还停在"我们看到了回报"（主观），没到"回报是多少"（可核）。

### 依据

- p.1｜last year when we were going into the 2025 budget process, we had a roadmap of resource investments across both headcount and compute that we thought would pay off in 2026. And it’s really a very broad range of sort of different ads ranking and performance efforts. And we’re continuing to see that those have paid off through the course of the year.
- p.2｜as Susan said, we’re still working through the actual budget and I think we’ll typically have more to share on that early next year.
- p.6｜One is that the work that on Ray-Ban Meta and the Oakley Meta products is going very well. I think, yeah, I mean, at some point, if these continue going as well as it has been, then I think it will be a very profitable investment.
- p.5｜And so in Q3, we completed the global rollout of the streamlined campaign creation flow for Advantage+ lead campaigns.
- p.3｜I don’t think we have any specific timing to announce certainly on the models or products, but I expect that you will see both.
