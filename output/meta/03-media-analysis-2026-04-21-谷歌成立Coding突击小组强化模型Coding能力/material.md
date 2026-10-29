---
id: 03-media-analysis-2026-04-21-谷歌成立Coding突击小组强化模型Coding能力
cat: "03"
sub: media-analysis
template: media-analysis
template_version: 2
date: 2026-04-21
time: "00:00"
title: "Google Creates Strike Team to Improve Coding Models"
kind: "media-analysis"
issuer: "The Information"
ticker: META
source_pages: 5
---

## Q1 · 这条报道的**一手来源是什么**？能不能回溯？

**结论**：核心新事实无法回溯到一手。全文只有一组匿名信源，人数在"三人"与"其中两人"之间摆动，报道没给任何可用于核对的文件、编号或落款。

**内容**：开篇是"三位直接了解情况的人"。全文八处归因里，五处用"其中一人""其中两人""这三人"回指这三位；文末两处又重述了"两位直接了解情况的人"这同一限定语。这是同一批受访者的子集，不是四组独立信源：定冠词回指说明后来者出自开头那三位。可回溯的只有两处公开表述：谷歌首席财务官二月的财报电话会、Claude Code 负责人一月的发言；都只给场合，不给逐字记录。布林的备忘录被引了原话，但没给日期、收件范围与获取方式，属"引用了文件却没给文件"。

**判断**：这是"独家＋匿名三人组"的标准结构。人数写得精确，实际不可核：没区分这三人属 DeepMind 内部还是跨部门，也没说是否仍在职。所以"谷歌已组建突击小组"这句最硬的表述只能记作"据三位匿名人士"，不能记作谷歌已确认。备忘录那一段强度更低——无原件、无日期，无法排除是转述的转述。

### 依据

- p.1｜Google has assembled a strike team of researchers and engineers to improve its AI coding models, according to three people with direct knowledge of the situation, as it looks to automate more of its own coding and ultimately its AI research.
- p.2｜The push was prompted in part by Anthropic’s recent AI model releases, according to two of the people.
- p.5｜Like Meta Platforms, Google has an internal leaderboard tracking usage of its internal coding tool, Jetski, according to two people with direct knowledge of the situation.
- p.5｜Some teams outside Google DeepMind are also holding mandatory AI training sessions for engineers, according to one of the people.

## Q2 · 它带来的**新事实**是什么（不是转述的那部分）？

**结论**：三条此前未公开的已发生事项，一条明确未发生。

**内容**：一、突击小组已成立，由 DeepMind 研究工程师 Sebastian Borgeaud 领导，他此前负责 DeepMind 的预训练；小组专攻"写一整块新软件"这类长期编码任务，需要模型通读文件并理解用户意图。二、布林与 DeepMind 首席技术官 Koray Kavukcuoglu 直接参与该小组，报道把这一点当作"最高层亲自盯"的证据。三、战略转向：从主要面向外部客户做编码模型，改为训练能吃谷歌私有代码库、供内部使用的模型；代价是这类模型不能公开发布，只能"理论上"帮出更好的可发布模型。未发生的是终局——"有朝一日可大规模替代 AI 研究员与工程师"用的是虚拟语气。

**判断**：三条已发生的事指向同一个动作：把编码能力从"先卖给别人"改成"先给自己用"。这对估值的含义不是新增收入，而是研发效率内部化——真正要观察的是它能否压低谷歌自身的工程人力成本，而这一点报道没给任何量化，只给了方向。突击小组本身是组织动作，不等于模型能力已提升。

### 依据

- p.4｜The strike team is led by Sebastian Borgeaud, a research engineer at Google DeepMind who previously led pretraining for Google DeepMind, the three people said. The team focuses on improving model performance for long-term coding tasks like writing a new piece of software.
- p.2｜Both Brin and Google DeepMind Chief Technology Officer Koray Kavukcuoglu have been directly involved with the strike team, showing its importance to Google’s top leadership, one of the people said.
- p.4｜Models trained on internal Google code can’t be released publicly, although they could theoretically help create better models that could then see a public release.
- p.3｜An advanced coding agent, combined with AI that can solve math problems and run experiments, could one day automate the work of AI researchers and engineers at a large scale.

## Q3 · 里面有**可计量的数字**吗？谁提供的？

**结论**：只有两个百分比，都来自当事方自述，没有第三方基准分，也没有排行榜使用率。

**内容**：一、"约 50%"：谷歌编码智能体编写代码的占比，提供者是谷歌首席财务官 Anat Ashkenazi，场合是二月最近一次财报电话会，属公司口径，可与电话会记录对账。二、"pretty much 100%"：Anthropic 代码由 AI 编写的比例，提供者是 Claude Code 负责人 Boris Cherny，今年一月，属同业高管自述，不是第三方测评。除此之外，全文没有排行榜使用率、没有模型基准分、没有突击小组的人数或预算——"三人""两人"是信源计数，不是计量。

**判断**：两个数不能直接比。一半的口径是"编码智能体写的代码"，另一个的口径是"AI 写的代码"，后者包含补全、生成等更宽的范围，而且由 Anthropic 自己宣布。并列会得出"谷歌落后一半"的强结论，但这只在口径对齐后才成立。对估值也没有直接用处：两个数都不进财务报表，只是研发效率的替代指标，且都无期间可比性。

### 依据

- p.5｜The head of Claude Code, Boris Cherny, said in January that “pretty much 100%” of Anthropic’s code is written using AI.
- p.5｜In contrast, coding agents write about 50% of code at Google, according to Google Chief Financial Officer Anat Ashkenazi, speaking on Google’s most recent earnings call in February.

## Q4 · **公司回应**是什么（否认 / 拒绝置评 / 未取得）？

**结论**：有回应，但不是对核心指控的回应——谷歌发言人以书面声明谈内部工具的采用率，对"落后 Anthropic""组建突击小组"均未置评，报道也没写"拒绝置评"。

**内容**：声明两句：公司内部编码工具获得"极高的采用率"，"这些工具的使用极大地推动了我们的模型和 AI 工具开发——我们正高度关注这一领域"。发言人未具名，只标"谷歌发言人"。对照看，布林对内的备忘录用的是另一套话："要赢得最后的冲刺，我们必须迫切弥合智能体执行上的差距，并把模型变成代码的主要开发者"——这句等于对内承认存在差距。

**判断**：四态应记"部分确认"：确认了内部工具被大量使用这件无害的事，回避了模型能力落后这件要害的事。对外说采用率高、对内说必须追赶，两句话不矛盾，但合起来说明"采用率高"不能当作"能力已追上"的证据。这也是本篇最容易被误读的地方：公关声明讲的是使用率，报道讲的是能力，两者不是同一件事。

### 依据

- p.4｜In a statement, a Google spokesperson said the company had seen “tremendous adoption” of internal coding tools. “Their use has been turbocharging our model and AI tooling development—we’re really focused here,” the spokesperson said.
- p.3｜“To win the final sprint, we must urgently bridge the gap in agentic execution and turn our models into primary developers” of code, Brin wrote.

## Q5 · 这是**原文还是转载**？如果转载，原文在哪？

**结论**：原文，不是转载。The Information 独家，署名 Erin Woo，2026 年 4 月 20 日 6:00（太平洋时间）发布。

**内容**：页面标 Exclusive（独家），标题即本篇英文原题；署名行同时给英文名与中文译名；文末有记者简介，说明她常驻旧金山、跑谷歌与 Alphabet 条线，并给出 Signal、邮箱、X 三种联系方式。链接指向 theinformation.com 的文章页，带订阅用户推荐码。中文段落与英文段落成对出现，是抓取时页面自带的译文层。页面还夹着四条站内推荐问题、"Powered by Deep Research"字样与"核心要点"框，属页面组件，不是正文。

**判断**：三样里指名原发媒体与记者、发布时间、回链都齐，缺更正声明，定为原文无疑。两点要提防：中文是机器译文，strike team 被译成"打击团队"、takeoff 被译成"崛起"，含义有偏移，引述以英文为准；"核心要点"框是编辑摘要，压掉了口径限定语，不能当正文引用。

### 依据

- p.1｜Exclusive Google Creates Strike Team to Improve Coding Models
- p.1｜By 作者 Erin Woo 艾琳·吴
- p.1｜Apr 20, 2026, 6:00am PDT
- p.1｜https://www.theinformation.com/articles/google-creates-strike-team-improve-coding-models?rc=hsqlhb

## Q6 · 若题材是**规则 / 监管**：它说的是哪条规则的什么？

**结论**：本题不适用。本篇题材是组织与产品路线——谁带队、模型给谁用、用什么代码训练，不涉任何规则、法规或监管动作。

**内容**：全篇没有法律名称、条款号、主管机关、生效日期。唯一带"强制"色彩的是布林备忘录里对内的要求（每位 Gemini 工程师处理复杂多步任务时必须使用内部智能体），那是公司内部管理指令，不是外部规则；Jetski 排行榜与部门自办的强制培训同属内部管理手段。报道谈战略时用的词是"战略转变""更强调"，全是商业选择。

**判断**：不适用指的是本篇没有提出任何规则主张。"模型不能公开发布"是训练数据带来的商业限制，报道自己也没往合规上引。要判断这类内部代码训练的合规边界，只能另找官方原文——本篇不构成依据，只能当"谷歌在做这件事"的线索。

### 依据

- p.3｜Google is now putting more emphasis on models that write code the company can use internally, a strategy shift from focusing primarily on coding models for external customers.

## Q7 · 它和**已披露内容**一致还是冲突？

**结论**：无与法定披露冲突的证据；一处篇内口径混用，其余无法对照。

**内容**：口径混用出现在"核心要点"框：它写"谷歌的 AI 编写 50% 的代码，落后于 Anthropic 近 100%"，把两个不同口径摆成同一把尺——正文自己交代，谷歌那 50% 是"编码智能体写的代码"，Anthropic 那 100% 是"AI 写的代码"，且由对方高管宣布。这与谷歌首席财务官二月电话会的口径本身一致，问题出在摘要压缩。无法对照的有三条：突击小组的存在与人事、Jetski 排行榜、强制培训，谷歌都没有公开披露可比；OpenAI 关停 Sora 转做编码一事，本篇是转述，手头没有公告原文。

**判断**："所有前沿实验室今年都在追 Anthropic"这类背景叙述，本篇与公开叙事方向一致，属一致而非冲突。真正要防的是摘要被单独引用：一旦"一半对百分之百"离开正文，就变成同尺对比的硬结论，而正文并不支持。用它做同业比较时，必须带上"谁写的代码"这个限定语，否则等于把两家不同口径的自述当成一个基准。

### 依据

- p.2｜Google&#x27;s AI writes 50% of code, trailing Anthropic&#x27;s near 100%.
- p.3｜Coding has been a major focus this year across all frontier AI labs, as OpenAI and Google have sought to catch up to Anthropic, which has long been in the lead in code generation abilities.
- p.3｜Last month, OpenAI announced it would shut down its Sora video generator and focus on coding and enterprise work.
