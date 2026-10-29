---
id: 02-company-voice-0000-00-00-METAFY2025transcriptMETAQ1
cat: "02"
sub: company-voice
template: company-voice
template_version: 2
date: 0000-00-00
time: "00:00"
title: "Meta 2025Q1 财报电话会问答（原件未标日期）"
kind: "财报电话会问答"
issuer: "Meta Platforms, Inc."
ticker: META
source_pages: 6
---

> 原文：`corpus/materials/02-company-voice-0000-00-00-METAFY2025transcriptMETAQ1/pages.json`（`p.N` 为逻辑块号，非 PDF 页码）。
> 依据为逐字片段，可 `node server/check.mjs 02-company-voice-0000-00-00-METAFY2025transcriptMETAQ1` 复验；引用纪律见 `docs/EVIDENCE-SPEC.md`。

## 1 · 他把**哪个指标放最前**、哪个**只提一句或埋在中间**？

结论：放最前的是 Llama（模型能力），不是收入也不是费用；真正被反复回到、并被用来解释别的指标的是"算力不够"；而财务上最该排前的"费用展望下调"，被埋在第 5 位提问者那轮的后半句。

具体：首问来自 Morgan Stanley 的 Brian Nowak，他自己给两个问题排了序——第一问 Llama（Behemoth 与下一代模型），第二问才是 Meta AI；Zuckerberg 用整段回答 Llama 的架构与蒸馏逻辑（Llama 4 每个专家 170 亿参数、为自有机队做低延迟优化、长上下文窗口、从 Behemoth 蒸馏出大模型 90%–95% 的智能），对 Meta AI 只回了"不清楚现在还有没有更多数据可分享"就转给 Susan Li，Susan 也只给用例排序（信息查询第一、社交互动第二、WhatsApp 在自家应用里使用最强），一个用户数都不给。算力与 CapEx 被四位不同机构的提问者分别问到（BofA 的 Justin Post、J.P. Morgan 的 Douglas Anmuth、Barclays 的 Ross Sandler、Wells Fargo 的 Kenneth Gawrelski），且被用来解释别的指标：Ross Sandler 说广告排序团队想跑的测试被算力卡住，Susan 又把上升的基建成本说成费用展望下调的部分抵消项。埋在中间的还有：Bernstein 的 Mark Shmulik（第 5 位提问者）在自己的第二问后半句才提到费用展望"小幅下调"；收入只在同一段里以"30 亿美元区间宽度"的形式出现，没有绝对值；Evercore 的 Mark Mahaney 最后一问提到 Reality Labs 每季约 40 亿美元亏损，Truist 的 Youssef Squali（第 8 位）那轮才拿到 EU 占全球广告收入 16%，两者各只出现一次。

判断：三处同指并不一致——"叙事第一"是 Llama，"被追问最多、且被用来解释别的指标"是算力与 CapEx，"财务上最该排前"的费用下调反而在别人问题的第二半句。记录时按"算力是这一季的主叙事、模型是开场门面、收入与费用被压缩成区间宽度"来记；最值得上报的是费用展望下调的位置——公司没有主动展开，是被问到才说，且说完立刻补"维持 50 亿美元宽度"。

### 依据
- p.1｜Llama 4, the shape of the model with 17 billion parameters per expert was designed specifically for the infrastructure that we have in order to provide the low latency experience to be voice optimized.
- p.1｜are basically distilled from the Behemoth model in order to get the 90%, 95% of the intelligence of the large model in a form factor that is much lower latency and much more efficient.
- p.2｜that’s partly why the $3 billion range reflects the potential for a wider range of outcomes.
- p.5｜they’ve been very consistent $4 billion a quarter for quite some time.
- p.5｜was 16% of our worldwide total revenue in 2024.

## 2 · 核心主题（执行 / 战略 / 市场 / 资本配置）**在报表里找得到对应吗**？

结论：能对到报表科目的只有三项（EU/EEA 与瑞士占全球广告收入 16%、Reality Labs 每季约 40 亿美元的亏损量级、CapEx），其余四个反复出现的主题——Llama 与 Behemoth、Meta AI 的使用与独立 app、business AI 测试、AI 编码智能体——都没有可对应的科目或经营量。

具体：对得上的：Susan Li 答 Youssef Squali 时给出"EEA 与瑞士的广告收入占 2024 年全球总收入 16%"，这一项可对到分地区收入；Mark Mahaney 提的 Reality Labs"每季约 40 亿美元"可对到 RL 分部亏损，但这是分析师的数，公司既未否认也未认领；CapEx 可对到投资活动现金流，可 Susan 明确说"We haven’t broken down sort of the exact drivers"，连数据中心与硬件的拆分都不给，金额更从未出现。对不上的：Llama 4 的架构与从 Behemoth 蒸馏是研发叙事，无金额、无调用量；Meta AI 的用例与独立 app 无用户数、无收入，Brian Nowak 问句里的"近 10 亿"被公司当场推掉；business AI 只在"a limited set of businesses"里测试，无客户数、无定价；AI 编码智能体给的是时点（今年可能出现、明年年中到年底承担相当部分研发），不对应任何已发生的费用节约。半对得上的只有广告转化——"转化增速快于展示增速"可对到收入与展示量，但只给方向不给幅度。

判断：这是典型的"叙事有、科目无"——四个最热的主题里没有一个能在本期报表里落成一行。记录时不要把"基建优势""每家企业将来都会有一个 AI"这类话折算成任何收入或成本；唯一可挂账的是 16% 与 40 亿美元这两个数，且都要标注来源是分析师或单次披露。

### 依据
- p.3｜We haven’t broken down sort of the exact drivers.
- p.5｜our advertising revenue in the European economic area and Switzerland, which would be the geographies impacted here, was 16% of our worldwide total revenue in 2024.
- p.4｜We are currently testing business AIs with a limited set of businesses in the U.S. and a few additional countries on WhatsApp, Messenger and ads on Facebook and Instagram.
- p.5｜they’ve been very consistent $4 billion a quarter for quite some time.
- p.4｜we continue to see conversions grow at a faster rate than ad impressions in Q1

## 3 · 问答里他是**直接给数字，还是打太极、换话题**？

结论：给数的只有三处，且全是"区间宽度"或"占比"，没有一处是绝对值；被问到金额、拆分、时点时，四次里有三次是明确的"还没拆""太早""没有固定答案"。

具体：给数的一侧——Justin Post 问 Q2 指引里的电商供给问题，Susan Li 答"30 亿美元区间反映的是更宽的结果分布"，并给出 de minimis 豁免 5 月 2 日取消这个时点；Mark Shmulik 问费用，她给出"维持 50 亿美元区间"；Youssef Squali 问 EU DMA 的财务影响，她给出 16%。回避的一侧——Douglas Anmuth 问 CapEx 上调里数据中心与硬件各占多少，答"没有拆出确切驱动因素"；Kenneth Gawrelski 问 2025 年的上调是否构成 2026 的新起点，答"现在谈 2025 年以后太早"；Ross Sandler 问算力约束何时缓解，答"没有固定答案"；Squali 追问 EU 要改什么、财务影响多大，答正在与欧委会接触、"现在说太早"。真正给到时点的只有 Mark Zuckerberg 的编码智能体（今年可能出现、明年年中到年底）。

判断：按"给数字/区间/时点＝给数，只给方向或把问题转走＝回避"逐条判，这份的给数率很低，且给的全是形状（多宽），不是规模（多少）。不能把"区间宽度"读成"给了指引"——宽度只说明不确定性大小，不说明水平。最值得上报的是 CapEx 那一问：被直接问拆分，回答是"没拆"，而这一项恰恰是当季唯一被上调的展望。

### 依据
- p.2｜that’s partly why the $3 billion range reflects the potential for a wider range of outcomes.
- p.3｜We haven’t broken down sort of the exact drivers.
- p.4｜it’s too early to discuss plans beyond 2025.
- p.5｜it is really too early to speak about what those changes could be because we are in the process of engaging with the European Commission.
- p.3｜And we’ve maintained our $5 billion range just given the more dynamic operating environment that we’re in.

## 4 · **哪个问题被不同分析师反复追问**？给**基数**了吗？

结论：CapEx 与算力是被追问最多的一条——本份内 4 位不同机构的分析师从四个角度问同一件事，而公司一次也没给基数：没有 CapEx 绝对值、没有 2026 年的数、没有算力缺口的数字。

具体：四位提问者与问法——BofA 的 Justin Post 先把它概念化："CapEx 已接近一些有巨大客户群的大厂"，问这套生态的 ROI 在没有直接企业收入时怎么成立；J.P. Morgan 的 Douglas Anmuth 问上调部分里数据中心与硬件各多少、以及是否找伙伴分摊；Barclays 的 Ross Sandler 问瓶颈何时缓解、广告排序"打到第几局"；Wells Fargo 的 Kenneth Gawrelski 问 2025 年的上调是否构成 2026 的新起点。答法越问越窄：先讲目的（"基建是我们的优势""2025 年产能上线仍难满足全公司需求"），再拒拆分（"没有拆出确切驱动因素"，只说"区间更宽"），再拒时点（"供需都很流动，没有固定答案"），最后拒前瞻（"现在谈 2025 年以后太早"）。基数：没有绝对值、没有 2026 数、没有缺口数；唯一接近量级的话是"区间更宽"，而"30 亿美元"是收入展望的宽度，不是 CapEx。次多的是 Meta AI（Brian Nowak、Eric Sheridan、Youssef Squali 三位），同样没给基数——用户数被推给"没有更多数据可分享"。

判断：追问最凶、基数最缺的一条就是它。记录时把 4 次问答按"目的→拆分→时点→前瞻"四段排，能看出公司每一步都只退不答；"投入会继续很有意义"与"一个数都不给"同时成立，这个组合本身就可上报。对照其他主题，广告推荐那条反而给了基数（转化增速、GEM/Lattice/Andromeda 等模型名），说明不是所有问题都缺数，是资本强度这一类被系统性留白。

### 依据
- p.2｜Your CapEx spend is now close to some hyperscalers with very big client bases.
- p.3｜And so that is both reflected in the wider range that we are giving.
- p.4｜we don’t have a sort of fixed answer in terms of when we expect that we will sort of have enough supply to meet all demand
- p.2｜Can you just help us understand how much of that is tied to the additional data center investments versus the increased hardware costs and really what’s driving those higher hardware costs?
- p.4｜We talked about the introduction of the new GEM ads recommendation model in Q1. And we have talked about some of the prior model architecture improvements like Lattice and Andromeda in past quarters.

## 5 · 同一问题**上一季怎么答**？措辞变了吗？（`预计→希望→正在努力` 的降级是领先信号）

结论：本份是这 8 份里最早的一份，没有上一季的同类材料可以逐字并排；能直接回答"变没变"的只有一处——Mark Zuckerberg 明确说编码智能体的时间预测"没有任何实质变化"，即他自认与之前同一口径。

具体：他先把时间表重述一遍——"still on track for something around a mid-level engineer kind of starting to become possible sometime this year, scaling into next year"，再加一句"by the middle to end of next year, AI coding agents are going to be doing a substantial part of AI research and development"，然后才给"no real change in our prediction for the timing"这句自评，等于把口径锁在原地。算力那条在本份是整条措辞链的起点：Zuckerberg 与 Susan Li 用的是"即使 2025 年产能上线，仍难以满足全公司对算力的需求"，以及"供需两端都很流动"。此后各季的措辞（据本批其余各份，非本份原文）：2025Q2 变成"不考虑把基础设施用于外部用例、要留可替代性"，2025Q3 变成"希望今天就有更多产能"，2025Q4 变成"2026 年大部分时间仍受限"，2026Q1 追问会变成"年内有效缓解"。

判断：本份缺可比的上期，只能记"起点措辞"——hard time meeting demand 加 no fixed answer on when，这两句是全批最硬的表述，之后逐季被加限定或换成承诺，方向是"承认受限→要求更多→承诺缓解"，属升级不是降级。按手册只记字面变化与方向、不替公司解释动机。要报的是：本份没有任何"预计→希望→正在努力"式的降级，唯一自称"没变"的是编码智能体时间表，而这一条恰是后面最容易被改口的承诺。

### 依据
- p.3｜I don’t think that there’s been any real change in our prediction for the timing of this.
- p.3｜I’d say it’s basically still on track for something around a mid-level engineer kind of starting to become possible sometime this year, scaling into next year.
- p.4｜So both the supply and demand are quite fluid.
- p.2｜even with the capacity that we’re bringing online in 2025, we are having a hard time meeting the demand that teams have for compute resources across the company.
- p.3｜So I’d expect that by the middle to end of next year, AI coding agents are going to be doing a substantial part of AI research and development.

## 6 · **指引**：区间是收窄还是放宽？有没有**撤回全年指引**？有没有"**重申 + 新增限定条件**"？**口径变了吗**？

结论：收入展望只给区间宽度 30 亿美元并明说要装"更宽的结果分布"、费用展望下调但宽度仍是 50 亿美元、CapEx 上调且区间同样放宽却不给数；没有撤回全年指引，也没有给任何中值——本份通篇没有可算中值的上下限。

具体：Susan Li 对 Justin Post 说 Q2 收入展望"这就是 30 亿美元区间反映更宽结果分布的部分原因"，理由是宏观与 5 月 2 日 de minimis 取消；对 Mark Shmulik 说费用展望下调来自"更精细的预测"（薪酬与非人头运营费用），但被上升的基建成本与 Reality Labs 销货成本部分抵消，且"我们维持了 50 亿美元区间，就是因为经营环境更动态"；对 Douglas Anmuth 说 CapEx 上调同时反映数据中心支出与硬件成本，这两项"都体现在我们给出的更宽区间里"。2026 年一律"太早"。全年指引：本份没有全年收入指引，也没有撤回或重申的动作。口径：没有变——CapEx 仍由自己出资（"我们出资建设用于训练 Llama 的基础设施"），既无合资也无表外安排。

判断：形态是"宽度维持、水平移动"——收入宽度 30 亿美元且明说装更宽分布，费用宽度 50 亿美元不变但水平下移，CapEx 水平上移且宽度也放宽。因为没有上下限，中值移到哪、下限还是上限先动都无法验证，唯一可比的量是宽度。最值得上报的是费用那条："下调 + 维持 50 亿美元宽度"意味着上下限同向下移，公司是在不确定环境里保住容错空间，而不是收窄。

### 依据
- p.2｜that’s partly why the $3 billion range reflects the potential for a wider range of outcomes.
- p.3｜The lowered outlook reflects more refined forecasts including updated expectations for both employee compensation as well as some other non-headcount-related operating expenses this year.
- p.3｜And we’ve maintained our $5 billion range just given the more dynamic operating environment that we’re in.
- p.3｜And that’s partially offset by higher expected infrastructure costs related to our increased CapEx outlook as well as higher expected Reality Labs cost of goods sold.
- p.2｜which we believe is in anticipation of the de minimis exemption going away on May 2nd

## 7 · 他的指引**兑现记录**怎样（一贯保守 / 一贯激进 / 摇摆）？

结论：材料未给出此项——本份只有问答逐字，没有任何"指引中值 vs 实际"的对照，也没有可核的历史兑现记录，只能给公司自评，不能当对账。

具体：查过的地方——本份全部六块都是问答，开场即"现在开放提问"，没有准备稿，因此没有指引汇总表；被问到 Q2 指引时，Susan Li 只答"这个展望反映的是我们 4 月至今看到的趋势，总体健康，所以现在非常早"，即只给方向、不给数；被问到广告投放回报时，她答"我们对过去这些投资正在产生回报感觉良好"。为何相近的说法不能算本项：这两处一处是对当季剩余时间的判断、一处是对过去投入的定性自评，都没有对应到任何一条此前给出的指引，也没有实际值；"prior investments are paying off"是公司自评，不是把中值与实际比出来的兑现率。本份也没把 2025 年 CapEx 或费用的全年数字给出来，连事后核的锚都不存在。

判断：样本不足，无法判定一贯保守还是一贯激进。要报的是这份材料的形态：问答段把所有指引压缩成方向与宽度，使兑现记录在单份内不可核——这也是 Q7 必须跨份做的原因。记录时把"公司自评"与"对账"分开写，不要用一句 feel good 折算成"兑现良好"。

### 依据
- p.1｜We will now open the lines for a question and answer session.
- p.2｜But our Q2 outlook reflects the trends we’re seeing so far in April, which have generally been healthy. So it’s very early.
- p.4｜we feel good about how the prior investments are paying off

## 8 · **资本配置的话和做对得上吗**？（说"估值有吸引力"却几乎不回购；指引算力开支下降却称需求强劲）

结论：本份内能核到的话只有一条——他说基建自己出钱、伙伴只做托管，这一条与"自己做重资产"的方向一致；但资本返还（回购、股息）在本份六块里一次都没出现，谈不上"说估值有吸引力却不回购"，因为回购这个议题根本没上桌。

具体：话的一侧——Susan Li 答 Douglas Anmuth 时说"很高兴有伙伴跟我们一起投、把 Llama 推向市场，比如 AWS 和 Azure"，紧接着限定"用于训练 Llama 的基础设施是我们自己出资的，目前不预期这一点会改变"；对 Justin Post 说建产能要留"部署方式与时机的最大灵活性"。做的一侧——本份没有 CapEx 金额、没有合资结构、没有表外安排，也没有一笔已签的伙伴交易，"一直在找机会深化合作"只是意愿。资本返还——六块里没有任何一处提到回购、股息或股本回报；本份被问到的资本类问题只有两个，Justin Post 的 CapEx 规模与 ROI、Douglas Anmuth 的"有文章说你们在找伙伴分摊成本"，都不涉及资本返还。

判断：这一份是"全部自己出钱 + 留灵活性"的口径，不能拿后来把数据中心建设移出 CapEx 的合资安排反推这份在打埋伏。最值得上报的是资本返还的缺席：后续各份（据本批其余材料，非本份原文）先把它说成"继续回购抵消摊薄并派季度股息"，再变成"AI 是最高优先级、回购机会主义评估"，而本份是这条链的零起点——一个字的承诺都没有。

### 依据
- p.3｜we are funding the infrastructure that is being used to train Llama, and we don’t have any expectation that that will change at this point.
- p.2｜we are also really looking to build this capacity in a way that gives us the maximum flexibility in how and when we deploy it over the coming years
- p.2｜there have been some articles suggesting that you’ve been looking to partner to share some of the cost of the AI infrastructure build-out.
- p.3｜we’re pleased to have partners investing alongside us and bringing Llama to market like AWS and Azure who are helping us host Llama.

## 9 · ★ **什么"没了"**？（客户数被"客户群增长"取代、留存停更、地域拆分消失）

结论：本份是 8 份里最早的一份，所以"没了"要反向看——有三项只在本份出现、此后各份再没给过：EU/EEA 与瑞士广告收入占全球 16%、Reality Labs 每季约 40 亿美元的亏损量级、Meta AI 的用户数（且公司当场就拒给）。

具体：16% 是 Susan Li 答 Youssef Squali 时给的，限定为 2024 年，并说"希望下季度电话会能有更清楚的说明"；40 亿美元是 Mark Mahaney 自己说的"相当长时间里非常稳定地每季 40 亿美元"，Zuckerberg 接过去只讲效率与"第三代 1000 万台"的行业类比，既没否认也没给新数；"近 10 亿用户"是 Brian Nowak 问句里的前提，Zuckerberg 的回答是"关于 Meta AI 的使用，我不确定现在还有没有更多数据可分享"。此后各份的走向（非本份原文）：16% 不再给，改说修订版低个性化广告的逆风；Reality Labs 从亏损额改成收入逆风（Quest 3S 基数、当年无新头显）；Meta AI 先给"每月超过 10 亿人使用"，再改"200 多个市场"，最后改成"每周对话次数"。

判断：三种消失要分开记——16% 属"不再披露"，40 亿美元属"公司从未认领，本来就不算它披露过"，Meta AI 用户数属"换了名字／并进另一口径"。最值得上报的是 Meta AI 那个数：公司在本份就明确拒给，说明"近 10 亿"从头到尾是分析师的估算而非公司口径；后面各季换成市场数、再换成对话次数，是同一件事上换了尺子，不是新增披露。记录时别把"每月超 10 亿人"当成对"近 10 亿用户"的确认。

### 依据
- p.5｜our advertising revenue in the European economic area and Switzerland, which would be the geographies impacted here, was 16% of our worldwide total revenue in 2024.
- p.5｜they’ve been very consistent $4 billion a quarter for quite some time.
- p.1｜On the Meta AI usage, I’m not sure if we have more stats to share on that now.
- p.6｜by the time they get to their third generation, they’re often selling 10 million units and scaling from there.
- p.1｜the second one on Meta AI, almost 1 billion users globally

## 10 · 他说"**将 / 预计 / 目标**"的地方，市场当成"**已 / 达**"了吗？

结论：本份没有把计划说成达成——恰恰相反，三处最容易被读成"已"的地方都明确标着"希望""预计""太早"；唯一用完成态的是"AI 眼镜已经起飞"，而这一句没有任何数字支撑。

具体：标为未达成的：Zuckerberg 说 Meta AI"定位不错，但要把它做成领先的个人 AI，我们还有很多工作要做"；说美国市场"We hope to become the leader over time"，并承认 iMessage 才是美国主用通讯应用；对 2026 CapEx 与 EU 影响都说"太早"；编码智能体给的是"今年可能出现、明年铺开"。完成态的那一句在他讲 Reality Labs 时——"随着 AI 眼镜真正起飞"，紧接着用"别的品类到第三代常常卖到 1000 万台"的他行业类比代替自家数据，并补一句"我不确定我们会不会正好做到那样"。已经算落地的只有"上线了新的智能体管理界面与看板"这类产品动作。

判断：本批材料没有股价与市场反应数据，所以"市场当成已达成"这一层只能核材料内部表述，不能核市场。内部看，这份的预期管理偏保守，把它当"计划被说成达成"的样本会判错；要报的是 taken off 这种没有数字的完成态措辞——把还在投入期的业务说成已经起量，而同一段里公司自己承认不确定能否做到那个量级。另外"第三代 1000 万台"是行业类比，不是自家目标，记录时不要写成公司指引。

### 依据
- p.5｜I mean I think Meta AI is well positioned, but we have a lot of work to do in order to make it the leading personal AI.
- p.2｜We hope to become the leader over time.
- p.6｜as the AI glasses have really taken off
- p.6｜by the time they get to their third generation, they’re often selling 10 million units and scaling from there.
- p.6｜And I’m not sure if we’re going to do exactly that, but I think that that’s like the ballpark of the opportunity that we have.
