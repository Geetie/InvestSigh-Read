---
id: 03-media-analysis-2026-04-27-01OpenAI进驻AWS客户却在拥抱竞争对手中英双
cat: "03"
sub: media-analysis
template: media-analysis
template_version: 2
date: 2026-04-27
time: "00:00"
title: "OpenAI’s AWS Push Comes As Customers Embrace Rivals"
kind: "media-analysis"
issuer: "The Information"
ticker: META
source_pages: 6
---

## Q1 · 这条报道的**一手来源是什么**？能不能回溯？

一手是记者对六家与 AWS 有业务关系公司的访谈，外加两家公司发言人与一份内部备忘录；没有合同、没有报价单、没有第三方调查。可回溯到个人的只有三位具名者：Inflectra 首席执行官亚当·桑德曼、Rhythmic Technologies 首席执行官克里斯·丹尼卢克、Xurrent 首席产品官菲尔·克里斯蒂安森，他们讲的都是自家与自家客户的取舍，不是行业统计。匿名三处：一位在备忘录中表态的 OpenAI 高管，只给职级，不给姓名与部门；一位客户服务软件公司高管，只给行业；OpenAI 与亚马逊的发言人均不署名。亚马逊 2 月投资 OpenAI 一事本身可回溯到公司公告，但本篇只是转述。判断：核心结论「客户不买账」由六家受访公司支撑，六家不是抽样、无筛选说明，属有具名信源但仍不可外推的报道，引用时须写明这是六家公司的主观陈述。

### 依据
- p.3｜Six firms that work with AWS, either as customers or as consultants to customers, said they and their clients have been happy using models AWS offers through its Bedrock service
- p.1｜测试和质量保证软件公司Inflectra的首席执行官亚当·桑德曼表示，OpenAI的声明“几年前可能很重要，但我们现在看到的是，Qwen和DeepSeek才是真正的焦点。”
- p.2｜本月早些时候，一位OpenAI高管在一份备忘录中表示，对新的AWS服务的需求“惊人”。
- p.6｜An executive at a customer service software firm noted that 12 to 18 months ago, clients were skittish about multi-cloud setups due to data control concerns.

## Q2 · 它带来的**新事实**是什么（不是转述的那部分）？

新事实分两层。产品层：亚马逊 2 月宣布首笔 150 亿美元投资 OpenAI，并计划以「有状态运行时」（可在多次交互之间保留上下文的运行环境）把 OpenAI 模型接进 Bedrock，另配 OpenAI Frontier 做部署支持；但截至发稿该服务尚未上线，4 月 28 日客户活动只知主题是智能体 AI，具体细节记者未能获知。行为层：客户的用法已经在变——一家客户服务软件公司按实时性能把请求分发给多家云以压低延迟；Rhythmic 的丹尼卢克认为新产品对想用 OpenAI 又不愿搬去 Azure 的客户更有吸引力，属意向而非成交。判断：这条报道的真正信息不是「OpenAI 进 AWS」，而是「它进场时客户已经换过一轮供应商」；对判断的意义是 OpenAI 要付的是存量迁移成本，不是抢新增需求。

### 依据
- p.1｜今年2月，亚马逊宣布对OpenAI进行首笔150亿美元的投资，并表示计划通过“有状态的”运行时环境向AWS客户提供OpenAI的技术
- p.4｜The OpenAI offering has yet to launch, and it’s always possible more customers will show interest once Amazon starts marketing the service in detail.
- p.6｜The firm now routes requests to the best-performing cloud in real time to reduce latency, a critical factor in customer service.
- p.2｜丹尼卢克表示，新产品可能对那些有兴趣使用OpenAI技术但从未使用的客户更具吸引力，因为他们不想转向微软Azure。

## Q3 · 里面有**可计量的数字**吗？谁提供的？

有，四组，提供者各不相同，不能相加。150 亿美元：亚马逊 2 月公告的首笔对 OpenAI 投资，本篇为转述。300 亿美元：Anthropic 自己披露的「最近年化收入」，公司未说明年化怎么算；「略高于 OpenAI」是记者的比较，OpenAI 未给可比数。50 亿美元：亚马逊本月公告的追加对 Anthropic 投资——投的是 Anthropic 不是 OpenAI，与 150 亿不是同一家公司、同一轮，不能相加。10% 降到不足 1%：Inflectra 首席执行官自述的自家客户结构，样本只有一家公司，不是 Bedrock 的份额。另有「六家」是受访公司数而非市占，「12 到 18 个月」是一位匿名高管的回忆区间。判断：全篇没有一份第三方市场数据，唯一带百分比的数字来自被访公司自述，只能当案例；把它读成「AWS 客户普遍弃用 OpenAI」，就是把案例当统计。

### 依据
- p.4｜In February, Amazon announced an initial \$15 billion investment in OpenAI
- p.5｜Anthropic’s gains were reflected in its disclosure that it recently reached \$30 billion in annualized revenue, a little ahead of OpenAI.
- p.5｜Earlier this month, Amazon announced it was investing another \$5 billion in Anthropic as part of an extension of Anthropic’s agreement to use AWS infrastructure.
- p.6｜the share of customers opting for Azure to access OpenAI has dropped from 10% around two years ago to under 1% currently

## Q4 · **公司回应**是什么（否认 / 拒绝置评 / 未取得）？

两家都出声了，但都只给情绪词，且均不署名。OpenAI 发言人称看到对新产品「前所未有的兴趣」，企业客户要的是能带来实际投资回报的方案，产品会让企业在 Bedrock 里原生部署智能体工作流，「很快」分享细节——没有时间表、没有客户数、没有价格。亚马逊发言人称客户「难以置信的兴奋」，同样没有量化。第三类是微软高管对更广泛分销可能违反双方合同的担忧，属记者转述的内部态度，不是针对本篇的置评。全文没有「拒绝置评」字样；4 月 28 日活动的具体细节记者写明「不得而知」，按四态应记「确认（方向性）加部分未取得」。判断：声明的措辞强度明显高于客户访谈呈现的温度，这个反差本身就是信号；把「前所未有的兴趣」当需求证据，等于把公关话术当订单。

### 依据
- p.2｜OpenAI发言人表示：“我们看到对新的有状态运行时环境产品前所未有的兴趣。企业客户希望获得能够让团队完成更多工作并带来实际投资回报率的解决方案。”
- p.2｜亚马逊发言人表示，“客户对即将登陆Amazon Bedrock的由OpenAI模型驱动的有状态运行时环境表现出令人难以置信的兴奋。”
- p.1｜AWS首席执行官马特·加曼和OpenAI领导人等高管将于4月28日在一个面向AWS客户的活动上讨论智能体AI，但他们将讨论的具体细节尚不得而知。

## Q5 · 这是**原文还是转载**？如果转载，原文在哪？

是原文，不是转载；中英两语属同一篇，只能算一个来源。英文原稿以 Original English Article 作分隔、整段附在译文之后，标题为 OpenAI’s AWS Push Comes As Customers Embrace Rivals，中文标题与它同指一篇，两语段落一一对应。全文没有译者署名，没有「据某家报道」式的转载声明，没有更正栏，也不引任何其他媒体的报道，说明它是本报采写稿而非聚合稿。缺的是记者署名与原文回链，属抓取版常见缺失，因此无法从文内追到作者，但不改变「自家稿」的判定。判断：做信源计数时按一家媒体、一篇稿计；中文版不构成第二个独立来源，引用同一事实不能因「中英互证」而加分。

### 依据
- p.3｜Original English Article
- p.3｜OpenAI’s AWS Push Comes As Customers Embrace Rivals
- p.1｜OpenAI的AWS推广正值客户拥抱竞争对手之 际

## Q6 · 若题材是**规则 / 监管**：它说的是哪条规则的什么？

本题不适用：题材是云厂商分销第三方 AI 模型的商业竞争，讲亚马逊把 OpenAI 模型接进 Bedrock、客户买不买账，通篇没有规则名、条款号、主管机关或生效日。唯一近似规则的是微软与 OpenAI 的私有合同——报道说把 AWS 限定在有状态运行时「可能有助于避免违反」协议，微软高管担心更广泛分销「可能违反」合同；这是合同义务不是监管规则，用词是「可能」，既无条款号，也没有任何一方对是否违约作出判定，不能当合规依据。范围证据取开篇对那项协议的定位：把 OpenAI 引入 AWS 云部门、面向运行 AI 智能体的新服务。判断：不适用不等于没有约束，真正的约束来自那份未公开的合同；任何「已合规」或「已违约」的推断都超出本篇。

### 依据
- p.1｜亚马逊曾大肆宣传一项协议，最终将OpenAI引入其Amazon Web Services云部门，推出一项旨在运行AI智能体的新服务。

## Q7 · 它和**已披露内容**一致还是冲突？

部分一致，部分只能记张力。一致项：Bedrock 自 2023 年起销售 Anthropic、Meta、亚马逊 Nova 等模型，微软 Azure 曾是 OpenAI 的独家云、双方去年修约允许经其他云销售部分技术，这些是已公开的产品与合同事实，与本篇叙述同口径。张力两处：一是公司口径与客户体感相反，OpenAI 说「前所未有」、亚马逊说「难以置信」，六家受访公司说反应冷淡，这是话术与体感的对立，不是两份文件打架；二是修约允许有限分销，而微软高管担心更广泛分销可能违约，说明边界未定；同一批访谈里也有客户认可有状态运行时的价值，冷淡是对「OpenAI 模型」而非对这项技术。无法对照的是份额：没有第三方数据能核 Bedrock 上各模型的实际调用占比，Inflectra 的 10% 到不足 1% 只是一家公司的客户结构，「六家」也无抽样说明。判断：记「关键事实一致、程度判断无法对照」，不能记成「已互证」。

### 依据
- p.5｜AWS has sold various AI models through its Bedrock service since 2023, including those from Anthropic, Meta Platforms, and Amazon’s own Nova line.
- p.5｜Still, Microsoft executives have raised concerns that broader distribution on AWS could violate Microsoft and OpenAI’s contract.
- p.1｜一些AWS客户确实看到了亚马逊宣布的有状态运行时技术的优势。
