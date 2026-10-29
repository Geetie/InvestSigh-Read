The Future of Meta Superintelligence: A 1 Year Progress Update
Meta 超级智能实验室的未来：一年进展复盘
SemiAnalysis · Max Kan, Julien Martin-Prin, Jeremie Eliahou Ontiveros, Dylan Patel · 2026-07-09 · https://semianalysis.com/2026/07/09/the-future-of-meta-superintelligence
A top tier RL environment startup spawns out of thin air, the most aggressive compute ramp we’ve ever seen, 2000km+ scale-across, and some advice for Google DeepMind
一家顶级 RL 环境初创公司凭空诞生、我们见过的最激进的算力爬坡、2000km+ 的 scale-across，以及给 Google DeepMind 的一些建议
It’s been a little over 1 year since the disastrous Llama 4 release spurred Zuck to rebuild his entire AI org. Highlights include the shocking \$14.3B Scale AI “investment” just to poach Alexandr Wang and the best people from his Safety, Evaluations, and Alignment Labs (SEAL) team, the multi-hundred million dollar (sometimes \$1B+) pay packages offered to top AI researchers/engineers, and the expedited compute ramp enabled by their new “Tent” datacenter design. For more details, see our original post on MSL.
自灾难性的 Llama 4 发布促使小扎推倒重建整个 AI 组织，已经过去一年多了。这期间的亮点包括：为挖走Alexandr Wang 及其 SEAL（Safety, Evaluations, and Alignment Labs）团队的顶尖人才，Meta 掷出令人震惊的 143 亿美元“投资”收购 Scale AI；向顶级 AI 研究员/工程师开出数亿美元（有时超过 10 亿美元）的薪酬包；以及依托全新“帐篷（Tent）”数据中心设计实现的加速算力爬坡。更多细节见我们此前关于 MSL（Meta Superintelligence Labs，Meta 超级智能实验室）的文章。
Since then, frontier AI has increasingly felt like a two horse race between OpenAI vs Anthropic. Google had a brief moment in the spotlight with Gemini 3 Pro and Nano Banana, but they’ve since faded dramatically. Despite their Windsurf acquisition, they’re far from a compelling agentic coding product, and 3.5 Flash is a benchmaxxed prop that performs far worse than GPT 5.5 and Opus 4.8 in real world scenarios (much less Fable and 5.6). 3.5 Pro is not even Opus level on coding. Microsoft has completely blown their early lead with GitHub copilot and failed to effectively leverage their access to OpenAI IP. SpaceXAI is selling \$26B a year worth of GPUs to Anthropic/Google, and the Chinese labs are simply too compute poor to truly reach the frontier.
自 那以后，前沿 AI 越来越像是 OpenAI 与 Anthropic 的两强争霸。Google 曾凭 Gemini 3 Pro 和 NanoBanana 短暂高光，但此后声势大幅回落。尽管收购了 Windsurf，他们离一款有竞争力的 agentic coding 产品仍然很远；3.5 Flash 是一款“刷榜”产品，在真实场景中的表现远逊于 GPT 5.5 和 Opus 4.8（更不用说Fable 和 5.6）。3.5 Pro 在编码上甚至达不到 Opus 的水平。微软则彻底葬送了 GitHub Copilot 的先发优势，也未能有效利用其对 OpenAI 知识产权的访问权。SpaceXAI 每年向 Anthropic/Google 出售价值 260 亿美元的 GPU，而中国的实验室则单纯因为算力太少，难以真正触及前沿。
中英对照 / BILINGUAL

Meanwhile, MSL made their public debut this April with the launch of Muse Spark. You could argue this model represented a relative regression for Meta. Llama 3 70B and 3.1 405B were both SOTA open-source on release, whereas Muse Spark, despite also being closed source, lagged both DeepSeek v4 Pro and Kimi K2.6—open source models released around the same time—on most benchmarks.
与此同时，MSL 于今年 4 月随 Muse Spark 的发布首次公开亮相。你可以说这个模型对 Meta 而言是一次相对的倒退：Llama 3 70B 和 3.1 405B 发布时都是开源 SOTA（state of the art，业界最优），而 Muse Spark尽管同样是闭源模型，却在多数基准上落后于同期发布的开源模型 DeepSeek v4 Pro 和 Kimi K2.6。
[Figure: Muse Spark vs Kimi K2.6 vs DeepSeek V4 Pro across 28 benchmarks (Muse Spark 1 win, Kimi K2.6 3 wins, DeepSeek V4 Pro 3 wins). Source: SemiAnalysis Tokenomics Model]
[图：Muse Spark、Kimi K2.6、DeepSeek V4 Pro 在 28 项基准上的对比（Muse Spark 1 胜，Kimi K2.6 3胜，DeepSeek V4 Pro 3 胜）。来源：SemiAnalysis Tokenomics Model]
However, evaluating Muse Spark in isolation is missing the forest for the trees. What matters for MSL is the slope, not the intercept. Rebuilding your entire team from the ground up obviously comes with some short term setbacks, and it appears Meta has finally finished paying down this debt. Thus, the interesting question is not where MSL is today, but trying to predict where they’ll be in the next 6 months.
然而，孤立地评价 Muse Spark 是只见树木、不见森林。对 MSL 来说，重要的是斜率，而非截距。从零重建整个团队显然会带来一些短期挫折，而 Meta 看来终于把这笔债还完了。因此，真正有意思的问题不是 MSL今天在哪里，而是预测他们在未来 6 个月会走到哪里。
At the simplest level, there are three things you need to build a true frontier model: data, talent, and compute. We believe Meta is the only hyperscaler/neolab on track to be world class at all three and therefore has the best chance at catching up with Anthropic/OpenAI. We’ll explain why in full detail below, but as a teaser, here are the AI compute projections from our new Tokenomics Model.
最简化地看，打造一个真正的前沿模型需要三样东西：数据、人才、算力。我们认为，Meta 是唯一一家有望在这三项上都做到世界级的 hyperscaler/neolab，因而最有希望追上 Anthropic/OpenAI。下文将详细展开，先剧透一下我们全新 Tokenomics Model 给出的 AI 算力预测。
[Figure: AI compute (Meta / OpenAI / Anthropic), 4Q23–2Q27. Source: SemiAnalysis Tokenomics Model] [图：AI 算力 走势（Meta / OpenAI / Anthropic），4Q23–2Q27。来源：SemiAnalysis Tokenomics Model] Lastly, behind the paywall, we’ll discuss what this all means for Google—the company most people today still believe rounds out the AI big 3.
最后，在付费墙之后，我们会讨论这一切对 Google 意味着什么——这家公司在今天多数人眼中仍是“AI 三巨头”的第三席。

Data is the new oil (for real this time) 数据是新的石油（这次是真的）
We’ll start with data because it’s Meta’s newest advantage and probably the most underappreciated of the three.
我们从数据讲起，因为这是 Meta 最新获得的优势，也很可能是三者中最被低估的一项。
In 2024, Ilya famously said that “data is the fossil fuel of AI.” While this analogy correctly highlights the importance of data for training AI models, it incorrectly assumes that the amount of good data is finite. In reality, if demand is strong enough, market forces will find a way.
2024 年，Ilya 有一句名言：“数据是 AI 的化石燃料。”这个类比正确地强调了数据对训练 AI 模型的重要性，却错误地假设优质数据的总量是有限的。事实上，只要需求足够强，市场自会找到出路。
This time, the invisible hand created a new human data/RL environment supply chain. The three incumbents—Mercor, Surge, and Handshake—are all at \$1B+ ARR, and many new entrants who are barely a year old (e.g. Fleet, Mechanize, and Afterquery) are sitting around \$100M ARR.
这一次，无形之手催生了一条全新的人类数据/RL 环境供应链。三家老牌公司——Mercor、Surge 和Handshake——ARR（annual recurring revenue，年度经常性收入）都已超过 10 亿美元；而许多成立仅一年左右的新进入者（如 Fleet、Mechanize、Afterquery）的 ARR 也已在 1 亿美元上下。
[Figure: RL data companies — ARR & valuation. Surge AI (\~\$3B ARR / \~\$30B), Mercor (\$2B+ / \$10B), Handshake AI (\~\$1B / \$3.5B), Micro1 (\$250M+ / \~\$2.5B), Fleet (\$63M / \$725M), Mechanize (undisclosed / \$500M), Afterquery (\$100M+ / \$300M), Deeptune (undisclosed). Source: Public disclosures, SemiAnalysis]
[图：RL 数据公司的 ARR 与估值——Surge AI（ARR 约 30 亿美元 / 估值约 300 亿美元）、Mercor（20 亿美元+ / 100 亿美元）、Handshake AI（约 10 亿美元 / 35 亿美元）、Micro1（2.5 亿美元+ / 约 25 亿美元）、Fleet（6300 万美元 / 7.25 亿美元）、Mechanize（未披露 / 5 亿美元）、Afterquery（1 亿美元+ / 3 亿美元）、Deeptune（未披露）。来源：公开披露、SemiAnalysis]
Reinforcement learning (RL) is the most important scaling law for improving AI capabilities today. The general idea is that instead of just predicting the next token, you teach the model how to complete entire tasks (e.g. fixing a bug in a codebase). Besides the tasks themselves, RL requires you to provide an environment for the model to complete the task in, tools the model can use to interact with the environment, and verifiers to check if the model’s answer is correct or not. For more background, see our previous posts.
强化学习（RL）是当下提升 AI 能力最重要的 scaling law。其基本思路是：不再只做下一个 token 的预测，而是教会模型完成整项任务（例如修复代码库中的一个 bug）。除了任务（tasks）本身，RL 还要求你提供模型完成任务所处的环境（environment）、模型可用于与环境交互的工具（tools），以及判断模型答案正误的验证器（verifiers）。更多背景见我们此前的文章。

It is worth emphasizing that many AI insiders believe more RL environments/tasks are all we need to automate virtually all white-collar work. Here’s a quote from my roommate Sholto Douglas, a prominent Anthropic researcher, on the Dwarkesh podcast last year:
值得强调的是，许多 AI 业内人士相信：只要有更多 RL 环境/任务，就足以自动化几乎所有白领工作。以下是我的室友、Anthropic 知名研究员 Sholto Douglas 去年在 Dwarkesh 播客上的一段话：
Even if algorithmic progress stalls out, and we just never figure out how to keep progress going—which I don’t think is the case, that hasn’t stalled out yet, it seems to be going great—the current suite of algorithms are sufficient to automate white collar work provided you have enough of the right kinds of data. Compared to the TAM of salaries for all of those kinds of work, it is so trivially worthwhile.
即便算法进步就此停滞、我们再也想不出如何推动进展——我并不认为会这样，进展至今没有停滞，看起来一切顺利——只要拥有足够多、类型正确的数据，现有这套算法就足以自动化白领工作。相比这些工作对应的全部薪酬 TAM（total addressable market，潜在市场总规模），这笔投入实在太划算了。
Screen recordings are extremely valuable for making RL tasks
屏幕录制对制作 RL 任务极具价值
Generally, all of these data companies create new RL tasks by hiring expert contractors from the relevant industries (hence why it’s called “human data”). However, there’s another thing every data company is desperately searching for today: real recordings of white-collar work.
般来说，这些数据公司都是通过雇佣相关行业的专家承包商来创建新的 RL 任务（这也是“human data”一词的由来）。然而，如今每一家数据公司还在拼命寻找另一样东西：白领工作的真实录制记录。
Naively, you might think screen recordings are primarily useful for older training paradigms like supervised fine-tuning (SFT) which teach the AI to mimic humans. After all, the whole point of RL is that you let the AI figure out the steps itself and assign rewards based solely on outcomes.
直觉上，你可能认为屏幕录制主要对监督微调（SFT）这类较老的训练范式有用——那种范式教 AI 模仿人类。毕竟 RL 的全部要义在于让 AI 自 己摸索步骤，仅根据结果给予奖励。
In reality, however, screen recordings can still be extremely useful for making RL tasks as long as you’re willing to do a little extra work.
但实际上，只要你愿意多做一点额外工作，屏幕录制对制作 RL 任务依然极其有用。
The first benefit is realism. RL data is only good if it’s 1) representative of real economically valuable work and 2) at the right difficulty level for the AI. Too easy and there’s nothing for the AI to learn, too hard and it’ll never achieve any reward.
第一个好处是真实性。RL 数据只有满足两点才算好：1）能代表真实且有经济价值的工作；2）难度对 AI 而言恰到好处。太简单，AI 学不到东西；太难，则它永远拿不到奖励。

The only way to calibrate task difficulty is to just have the AI try solving the problem a bunch of times and then iterating accordingly. It’s actually quite hard to make an RL task that’s sufficiently difficult for frontier models today, so your expert contractors normally spend their time making tasks more challenging. Mechanize, for example, only expects the software engineers they pay \$400k+ per year to make 1 good task per week.
校准任务难度的唯一办法，就是让 AI 反复尝试求解，然后据此迭代。要做出一个对当今前沿模型足够难的 RL任务其实相当不容易，因此专家承包商的时间通常都花在把任务变得更有挑战性上。以 Mechanize 为例，他们对年薪 40 万美元以上的软件工程师的要求，也不过是每周产出 1 个好任务。
Under these constraints, if you ask the average PE analyst to come up with a new financial modeling task from scratch because you want to RL your model to be better at Excel, you often end up with a contrived task that’s optimized for difficulty over realism. This is the main problem with benchmarks like OpenAI’s GDPval and Mercor’s Apex suite (a good benchmark and a good RL env are roughly equivalent). If you read the tasks, you’ll see that most are unnaturally over-specified and don’t sound like something a human would actually ask an AI to do.
在这样的约束下，如果你想通过 RL 让模型更擅长 Excel，于是让一位普通的 PE（private equity，私募股权）分析师从零构思一个新的财务建模任务，你往往会得到一个为难度而牺牲真实性的做作任务。这正是OpenAI 的 GDPval 和 Mercor 的 Apex 套件这类基准的主要问题（一个好基准和一个好 RL 环境大致等价）。如果你去读这些任务，会发现大多数都被不自然地过度规定，根本不像人类真的会要求 AI 去做的事。
For example, here’s a GDPval task that asks the AI to make an itinerary. In the real world, the difficult part of this task would be fetching all the context from disparate sources (email, text messages, random websites, etc) to build the schedule, but GDPval ignores all of that by just giving the AI super detailed step by step instructions instead. A human would never write this 1k+ word prompt to an AI. It would’ve been easier to just make the itinerary themselves at that point!
举例来说，下面这个 GDPval 任务要求 AI 制定一份行程表。在现实世界里，这项任务的难点在于从零散来源（邮件、短信、各种网站等）中抓取全部上下文来搭出日程，而 GDPval 完全绕开了这一部分，直接给 AI 一份超详细的分步指令。人类绝不会给 AI 写一段 1000 多字的提示词——到那份上，自 己把行程排了还更省事！
[Figure: GDPval task example — a four-day Istanbul wedding itinerary for an ultra-high-net-worth principal (excerpted from a 1,064-word prompt). Source: OpenAI, SemiAnalysis]
[图：GDPval 任务示例——为一位超高净值客户制定四天伊斯坦布尔婚礼行程（节选自一段 1064 字的提示词）。来源：OpenAI、SemiAnalysis]
On the other hand, if you base your task on a screen recording of someone doing their day-to-day job, then it’s guaranteed to be representative of real knowledge work by definition.
反过来，如果你的任务是基于某人日常工作的屏幕录制构建的，那它按定义就必然能代表真实的知识工作。

Relatedly, workflow best practices and correctness definitions can change a lot over time, so the only way to ensure your data stays realistic is to have a regular stream of real recordings. For example, a good coding RL task today would involve orchestrating subagents, and this simply didn’t exist just 7 months ago.
与此相关的是，工作流的最佳实践与“何为正确”的定义会随时间大幅变化，因此确保数据持续真实的唯一办法，就是拥有源源不断的真实录制流。举例来说，今天一个好的编码 RL 任务会涉及编排 subagent，而这在短短 7 个月前根本还不存在。
Screen recordings are also extremely useful for making verifiers. These days, most verifiers are rubrics. Since white-collar work is generally subjective—unlike math and coding where you can just check if the final number is correct or run a suite of integration tests—your verifier ends up being a set of rules/preferences encoded in a rubric that a human or LLM will then use to grade the AI’s output. As the tasks themselves become longer and more complex, so do their corresponding rubrics.
屏幕录制对制作验证器同样极其有用。如今大多数验证器是评分量表 （rubric） 。由于白领工作普遍带有主观性——不像数学和编码那样可以直接核对最终数字或跑一套集成测试——你的验证器最终会变成一组编码在rubric 里的规则/偏好，再由人类或 LLM 据此为 AI 的输出打分。随着任务本身变得更长、更复杂，对应的rubric 也是如此。
If you collect enough traces (typically thousands) of many people doing the \~same task in slightly different contexts, then you’ll eventually capture the entire action space for said task. This ends up being sufficient information for an LLM to more or less one shot the rubric. Of course, you still need a human to do final review and crucially assign weights to all the different criteria, but this is obviously much more efficient (and typically also higher quality) than asking experts to create the rubrics from scratch.
如果你收集到足够多的轨迹（通常是数千条），覆盖许多人在略有差异的情境下完成\~同一任务，你最终就能捕捉到该任务的整个动作空间。这些信息足以让 LLM 基本一次成型地写出 rubric。当然，你仍然需要人类做最终审核，并且关键是为各项标准分配权重——但这显然比让专家从零编写 rubric 高效得多（通常质量也更高）。
[Figure: Example rubric from OpenAI’s HealthBench (19 criteria, max +91, floor −47). Source: OpenAI, SemiAnalysis]
[图：OpenAI HealthBench 的 rubric 示例（19 项标准，满分 +91，下限 −47）。来源：OpenAI、SemiAnalysis]
Recordings can be super useful for deterministic verifiers as well. Knowing the underlying state of the application after the task is completed is often step 1 of creating a deterministic verifier for knowledge work, because the whole point of the verifier is to check whether the AI successfully reached the desired end state. A sufficiently detailed recording gives you this info for free.
录制对确定性验证器也大有用处。知识工作的确定性验证器，第一步往往是知道任务完成后应用程序的底层状态是什么——因为验证器的全部意义就在于检查 AI 是否成功抵达了目标终态。一段足够详尽的录制免费提供了这一信息。

Meta just created a top tier RL environment startupMeta 刚刚造出了一家顶级 RL 环境初创公司
With this context, we can better appreciate the recent news about Meta starting to track their employees’ screens, keyboards, and mouse movements. This is quite literally some of the most valuable data in the world today! Of course, it’s also poetically apt that the Scale AI man is the one spearheading the transformation.
有了这层背景，我们就能更好地理解近期那则新闻——Meta 开始追踪员工的屏幕、键盘和鼠标动作。这在今天简直就是世界上最有价值的数据之一！当然，由 Scale AI 出身的那个人来主导这场变革，也颇具诗意的贴切。
Whereas all the data companies are desperately trying to partner with investment banks, law firms, and advertising agencies to record their workflows, Meta is one of the few companies in the world that has a sufficiently large workforce dedicated to each of these industries in-house.
当所有数据公司都在拼命争取与投行、律所、广告公司合作以录制其工作流时，Meta 是世界上少数几家在内部就拥有足够庞大的、对应上述每个行业的员工队伍的公司。
The fact that Meta is still nimble and aggressive enough to do this despite the PR hit and initial employee backlash is already quite impressive. Yes, they’ve since walked it back slightly by strengthening privacy protections and giving employees the option to pause the tracker for 30min, but we think these are very minor concessions.
Meta 在承受了公关冲击和最初的员工抵触之后，仍然足够灵活、足够激进地把这件事推下去，本身就已相当令人印象深刻。是的，他们后来略作让步，加强了隐私保护，并允许员工将追踪器暂停 30 分钟——但我们认为这些都是非常小的妥协。
Furthermore, they took their data efforts to another level in late May by announcing a new “applied AI engineering org” as part of their most recent round of layoffs/restructuring. \~3000 engineers, which includes 70% of their new grads and a significant number of seniors, will now be making RL tasks/environments full-time.
更进一步，5 月底他们在最新一轮裁员/重组中宣布成立新的“应用 AI 工程组（applied AI engineeringorg）”，把数据方面的投入推到了另一个层级。约 3000 名工程师——其中包括他们 70% 的应届生和相当数量的资深工程师——将转为全职制作 RL 任务/环境。
We think this is an extremely underappreciated advantage for MSL. Anthropic has been the most aggressive lab by far when it comes to buying coding data from RL environment startups, and it’s one important reason why their models are so good at coding today.
我们认为这是 MSL 一个被极度低估的优势。在向 RL 环境初创公司采购编码数据这件事上，Anthropic 一直是最激进的实验室，这也是他们的模型今天在编码上如此出色的一个重要原因。

Mercor recently disclosed that they logged 2,517,000 expert hours on their platform in 2Q26, which is equivalent to \~4800 people working 40 hours a week. Meta is already in the same ballpark, and their average quality is likely higher. Additionally, they have another \~70k people to pull from if this experiment ends up being as valuable as we think.
Mercor 最近披露，2Q26 其平台上记录的专家工时达到 2,517,000 小时，相当于约 4800 人每周工作 40 小时。Meta 已经处在同一量级，且其平均质量很可能更高。此外，如果这项试验的价值如我们所料，他们还有另外约 7 万人可以调用。
It’s also worth briefly dispelling the myth that these 3000 Meta engineers will be doing mindless, low-level data labeling. The days of undereducated contractors from third-world countries drawing bounding boxes or classifying text as NSFW are long gone. At this point, the models are sufficiently smart such that creating a good piece of training data is a real intellectual challenge. Deeply understanding failure modes, ensuring your environment is robust to reward hacking, and scaling task creation without quality degradation are all non-trivial engineering problems.
还有必要顺带破除一个误解：这 3000 名 Meta 工程师并不是去做无脑的低端数据标注。第三世界国家学历不高的承包商画标注框、把文本分类为 NSFW 的时代早已过去。到了今天，模型已经足够聪明，以至于创造一条好的训练数据本身就是一项真正的智力挑战。深入理解失败模式、确保你的环境对 reward hacking 具有鲁棒性、在不损失质量的前提下规模化生产任务，都是并不简单的工程问题。
Besides purchasing from data companies, Anthropic engineers have also been making coding tasks themselves for over a year. Frontier labs are willing to pay \$5000+ for a single decent coding task. Mercor’s average pay rate recently surpassed \$100/hr, and the rate for SWEs is significantly above average. The top expert contractors at all of these data companies are making over 7 figures a year.
除了向数据公司采购，Anthropic 的工程师自 己动手制作编码任务也已经超过一年。前沿实验室愿意为一个像样的编码任务支付 5000 美元以上。Mercor 的平均时薪最近已突破 100 美元/小时，而 SWE（softwareengineer，软件工程师）的费率显著高于平均。这些数据公司里最顶尖的专家承包商，年收入超过 7 位数。
Not only is making RL data clearly more economically valuable than some big tech jobs, it just might be more intellectually stimulating too.
制作 RL 数据不仅在经济价值上明显高于某些大厂岗位，它在智力上可能也更有意思。
Instagram ads can fund a lot of compute
Instagram 广告能养得起大量算力
Compared to OpenAI and Anthropic, Meta has a balance sheet befitting a hyperscaler, and compared to Google, Meta doesn’t have a cloud business that’s aggressively trying to rent out as much compute as possible. Add in the fact that Zuck is willing to take free cash flow negative, and Meta should be able to bring up more internal AI compute than anyone else in the world.
相比 OpenAI 和 Anthropic，Meta 拥有一张与 hyperscaler 相称的资产负债表；相比 Google，Meta 又没有一个拼命想把算力尽量对外出租的云业务。再加上小扎愿意接受自由现金流为负这一事实，Meta 应当有能力把比世界上任何人都多的算力用于内部 AI。

This is exactly what we see happening. Our new Tokenomics Model projects that Meta will have more AI compute than both OpenAI and Anthropic by the end of this year.
而这正是我们看到的情况。我们全新的 Tokenomics Model 预测，到今年底 Meta 的 AI 算力将超过 OpenAI和 Anthropic。
[Figure: AI compute (Meta / OpenAI / Anthropic), 4Q23–2Q27. Source: SemiAnalysis Tokenomics Model]
[图：AI 算力 走势（Meta / OpenAI / Anthropic），4Q23–2Q27。来源：SemiAnalysis Tokenomics Model]
It is important to note that a meaningful portion of this compute will be used for recommendation systems (RecSys) and generative ads. However, even if we remain conservative and only assign specific, high-profile Meta DC sites to MSL, their training compute is still comparable to OpenAI and Anthropic through 2026 and 2027. See our recent newsletter for a more detailed breakdown on Meta’s compute strategy and our Tokenomics Model for concrete numbers.
需要指出的是，其中相当一部分算力将用于推荐系统（RecSys）和生成式广告。但即使我们保守处理，只把特定的、高知名度的 Meta 数据中心站点划归 MSL，其训练算力在 2026 和 2027 年仍可与 OpenAI 和Anthropic 相当。关于 Meta 算力战略的更详细拆解见我们近期的 newsletter，具体数字见我们的 TokenomicsModel。
An unprecedentedly large compute ramp led by 5 titans 由 5 座“泰坦”领衔的空前算力爬坡
Much has been written about Colossus and Elon’s ability to bring enormous amounts of compute online quickly, but what Meta’s doing today is arguably even more impressive, as our Datacenter Industry Model subscribers have known for over a year.
关于 Colossus 以及马斯克快速上线巨量算力的能力，外界已有大量报道；但 Meta 今天所做的事可以说更令人印象深刻——我们的 Datacenter Industry Model 订阅用户在一年多前就知道了。
Meta is simultaneously building 5 1GW+ “titan” clusters. There’s Prometheus in Ohio, Hyperion in Louisiana, and 3 unnamed campuses in El Paso, Iowa, and Indiana.
Meta 正在同时建设 5 座 1GW+ 的“泰坦（titan）”集群：俄亥俄的 Prometheus、路易斯安那的 Hyperion，以及位于 El Paso、爱荷华和印第安纳的 3 座尚未命名的园区。
Never in the history of humanity have we ever seen a full 1GW campus under construction simultaneously —the closest was AWS building 800MW in Indiana for Project Rainier—yet Meta has two of them right now! Hyperion and Iowa.
人类历史上从未同时出现过一座完整的 1GW 园区在建——最接近的是 AWS 为 Project Rainier 在印第安纳建设的 800MW——而 Meta 眼下同时有两座！Hyperion 和爱荷华。

For Hyperion, Meta is building the world’s largest single buildings at 400MW each. A total of 1.5GW is under construction today: 3x 400MW monsters plus 3 more standard 100MW buildings.
Hyperion 方面，Meta 正在建造世界上最大的单体建筑，每栋 400MW。目前在建总量达 1.5GW：3 栋400MW 的巨无霸，外加 3 栋标准的 100MW 建筑。
[Figure: Hyperion under construction. Source: SemiAnalysis Datacenter Model]
[图：Hyperion 园区在建情况。来源：SemiAnalysis Datacenter Model]
In Iowa, Meta signed a 1GW lease with a leading datacenter operator (as we flagged in June 2025 in our Datacenter Model). As you can see from the satellite images below, they’ve gone from nothing to the full GW under construction in just 1 year.
在爱荷华，Meta 与一家领先的数据中心运营商签下了 1GW 租约（我们早在 2025 年 6 月的 DatacenterModel 中就已提示）。从下方卫星图可以看到，他们在短短 1 年内从一片空地推进到整座 GW 级园区在建。
[Figure: May 2025 (left) vs May 2026 (right) satellite imagery. Source: SemiAnalysis Datacenter Model]
[图：2025 年 5 月 （左）对比 2026 年 5 月 （右）的卫星图。来源：SemiAnalysis Datacenter Model]
At Prometheus—which is already partially operational today—Meta doesn’t quite have a full GW currently under construction, but they are fully embracing the scrappy tent DC design we called out in our previous MSL article. The Prometheus cluster also keeps expanding—from an initial \~1GW to now >3GW within two years. To understand how Meta achieves this, check out our Datacenter Model. We have building-level tracking of all five Titans, and are the first to call out any expansions with precise monthly timelines. Some of these facilities use behind-the-meter power and we track the exact type of system and flag permitting risk.
在已部分投运的 Prometheus，Meta 目前在建规模还不到一整座 GW，但他们正全面拥抱我们在上一篇 MSL文章中点出的“糙快猛”帐篷式数据中心设计。Prometheus 集群还在持续扩张——两年内从最初的约 1GW扩到如今的 3GW 以上。想了解 Meta 是如何做到的，请查阅我们的 Datacenter Model：我们对全部五座泰坦做到了单栋建筑级别的跟踪，并且总是第一个以精确的月度时间线揭示各项扩建。其中部分设施采用表后（behind-the-meter）供电，我们会追踪具体的系统类型并标注审批风险。
[Figure: Prometheus campus. Source: SemiAnalysis Datacenter Model]
[图：Prometheus 园区。来源：SemiAnalysis Datacenter Model]

Connecting the titans: Meta’s solution to scale-across连接泰坦：Meta 的 scale-across 方案
Since Meta primarily builds and runs their own datacenters, they have more flexibility to customize their infrastructure to fit their actual needs. Prometheus is a good example of this. Instead of a single datacenter or campus, Prometheus is a constellation of 27 datacenters spread across 6 campuses. 5 of these are within 6km of each other and the 6th is 75 to 80km away from the rest.
由于 Meta 主要自建自营数据中心，他们有更大的自由度按实际需求定制基础设施。Prometheus 就是一个很好的例子：它不是单一的数据中心或园区，而是由分布在 6 个园区的 27 座数据中心组成的“星座”。其中 5个园区彼此相距 6km 以内，第 6 个则距其余园区 75–80km。
[Figure: Prometheus campus layout near Columbus, Ohio. Source: SemiAnalysis AI Networking Model, Meta]
[图：Prometheus 的园区分布（俄亥俄哥伦布市附近）。来源：SemiAnalysis AI Networking Model、Meta]
The reason behind this design choice is that scaling to hundreds of megawatts is currently very challenging, especially regarding thermal and power management. Training the next frontier AI models requires a lot of compute—way beyond 100MW—which is why spreading the workload across multiple datacenters is the path forward to overcome current limitations.
这样设计的原因在于，扩展到数百兆瓦目前非常困难，尤其是在散热和供电管理方面。训练下一代前沿 AI 模型需要大量算力——远超 100MW——因此把负载分散到多个数据中心，是突破当前限制的前进方向。
However, with this design choice comes a new challenge: networking. The whole point of a larger cluster is to be able to train larger models in a reasonable timeframe. If the accelerators are not able to communicate efficiently, then there is no point in a gigawatt scale campus. This is where scale-across comes into play.
但这一设计选择带来了新的挑战：网络。更大集群的全部意义在于能在合理时间内训练更大的模型。如果加速卡之间无法高效通信，那么 GW 级园区就毫无意义。这正是 scale-across 登场的地方。
To address this Meta has introduced a solution called AI-Backbone (or AIBB for short). This is an evolution of their 10X Backbone, specifically designed for AI and massive cluster needs. This network architecture consists of multiple L3 Superspines (or Backend Aggregation - BAG for short) that interconnect up to 5 DSF (Disaggregated Scheduled Fabric) or 7 NSF (Non-Scheduled Fabric) scale-out regions (those can be mixed as well). The L3 Superspines are then aggregated on a single L4 Inter-BAG hub which is set to provide around 22 petabits per second of bi-directional bandwidth across the whole Prometheus cluster.
为此，Meta 推出了名为 AI-Backbone（简称 AIBB）的方案。它是其 10X Backbone 的演进版本，专为 AI 与超大集群需求设计。该网络架构由多个 L3 Superspine（即 Backend Aggregation，简称 BAG）组成，每个可互连至多 5 个 DSF（Disaggregated Scheduled Fabric）或 7 个 NSF（Non-Scheduled Fabric）scale-out 区域（两者也可混用）。这些 L3 Superspine 再汇聚到单一的 L4 Inter-BAG 枢纽，该枢纽预计可在整个Prometheus 集群范围内提供约 22 Pb/s 的双向带宽。
[Figure: L2 to L3/BAG network architecture. Source: SemiAnalysis AI Networking Model]
[图：L2 到 L3/BAG 的网络架构示意。来源：SemiAnalysis AI Networking Model]

While the DSF and NSF regions fit into a single datacenter room, the L3 and L4 are distributed across all the datacenters. The L3 layer sits in a single campus, while the L4 is primarily used to interconnect the campuses together. The connection between L3 and L4 is a mix of LR optics and Dense Wave Division Multiplexing (DWDM) systems with ZR optics, depending on the length of the fiber to reach the other campus.
DSF 和 NSF 区域可以放进单个数据中心机房，而 L3 和 L4 则分布于所有数据中心之间。L3 层位于单个园区内，L4 则主要用于把各园区互连起来。L3 与 L4 之间的连接混用 LR 光模块，以及搭配 ZR 光模块的密集波分复用（DWDM）系统，具体取决于通往另一园区的光纤长度。
[Figure: Inter-BAG architecture. Source: SemiAnalysis AI Networking Model]
[图：Inter-BAG 架构示意。来源：SemiAnalysis AI Networking Model]
While this seems to be the perfect solution, this network architecture and the distance between the datacenters inherently introduce latency. Inside a DSF or a NSF region, the latency usually sits between 1 to 10µs, but the latency to reach a site that is 100km apart cannot be lower than 500µs, just due to light propagation in the fiber, which forces Meta to use asynchronous strategies for training workflows. The pretraining can be in 1 region synchronously, but the RL can be spread globally quite easily.
尽管这看起来是完美方案，但这套网络架构以及数据中心之间的物理距离必然引入时延。在 DSF 或 NSF 区域内部，时延通常在 1 到 10µs 之间；而抵达 100km 外站点的时延，仅因光在光纤中的传播就不可能低于500µs——这迫使 Meta 在训练流程中采用异步策略。预训练可以在单一区域内同步进行，但 RL 则可以相当轻松地在全球范围内分布。
Overall, while Prometheus offers a solution to current limitations, the other Titans will go even further with scale-across, connecting campuses up to 2,000kms apart.
总体而言，Prometheus 为当前的限制提供了一个解法，而其余几座泰坦在 scale-across 上还将走得更远—互连相距最远达 2000km 的园区。
Assembling the MSL superteam
组建 MSL 梦之队
Last year, Meta became famous for offering AI researchers compensation packages that would make Patrick Mahomes jealous.
去年，Meta 因向 AI 研究员开出让 Patrick Mahomes 都眼红的薪酬包而声名远播。
After spending \$14B to acquire Alexandr Wang and another \$1B+ to buy out Nat Friedman and Daniel Gross’ venture fund, it was reported that Meta had poached at least 14 researchers by the end of June 2025. Most of these people were ex-OpenAI, but there were a handful from Anthropic and Google as well. Some big names include Shengjia Zhao, Trapit Bansal, Joel Pobar, and Jack Rae.
在花费 140 亿美元拿下 Alexandr Wang、又花 10 亿美元以上买断 Nat Friedman 与 Daniel Gross 的风险基金之后，有报道称截至 2025 年 6 月底，Meta 已挖走至少 14 名研究员。这些人大多来自 OpenAI，也有少数来自 Anthropic 和 Google。知名者包括 Shengjia Zhao、Trapit Bansal、Joel Pobar 和 Jack Rae。

Since then, MSL has continued their recruiting frenzy. Notable research/engineering hires include
此后，MSL 的招募狂潮仍在继续。值得注意的研究/工程岗位引进包括：
Andrew Tulloch (ex Thinking Machines cofounder)
Joshua Gross, Mark Jen, Yinghai Lu (Thinking Machines founding team)
Jason Wei, Hyung Won Chung, and Zhiqing Sun (ex OpenAI)
Andrew Tulloch（前 Thinking Machines 联合创始人）
Joshua Gross、Mark Jen、Yinghai Lu（Thinking Machines 创始团队）
Jason Wei、Hyung Won Chung、Zhiqing Sun（前 OpenAI）
MSL’s not just hiring members of technical staff either. This January, they brought on Dina Powell McCormick—a well connected finance bro and former advisor to both Trump and W Bush—as President and Vice Chairman to help build out their compute fleet. In the same vein, they also poached the 3 musketeers from OpenAI’s compute team (Pete Hoeschele, Anuj Saharan, Shamez Hemani) in April, though 1 of them has already quit because of Meta’s culture issues on the infrastructure org.
MSL 招的也不只是技术人员。今年 1 月，他们请来 Dina Powell McCormick— 一位人脉深厚的金融圈人士、曾任特朗普和小布什两任总统的顾问——出任总裁兼副董事长，协助搭建其算力舰队。同样思路下，他们在 4 月 还挖来了 OpenAI 算力团队的“三剑客”（Pete Hoeschele、Anuj Saharan、Shamez Hemani），不过其中 1 人已因 Meta 基础设施组的文化问题离职。
Much like when a sports team suddenly starts lavishingly spending on superstars, only time will tell if this newly assembled Meta superteam can actually win a championship. However, Zuck has made his intentions clear and is pooling together all available resources to take a true shot at the frontier. As of today, you can’t say the same about any other hyperscaler. This could be good or bad for Meta’s business depending on your priors, but we believe they have the best shot at catching up to Anthropic/OpenAI.
正如一支球队突然开始一掷千金签超级巨星，这支新组建的 Meta 梦之队究竟能否真的夺冠，只有时间能给出答案。但小扎已经表明了他的意图，正在调动一切可用资源，向前沿发起一次真正的冲击。就今天而言，你无法对任何其他 hyperscaler 说同样的话。这对 Meta 的业务是好是坏，取决于你的先验；但我们相信，他们是最有希望追上 Anthropic/OpenAI 的那一个。
But just to be clear, success is far from guaranteed
但要说清楚：成功远未有保障
We’re overall bullish on the future of MSL, but it’s worth emphasizing that they are still basically at step 1. We commend them for marshaling the resources and balls necessary to take a true shot at building RSI, but now they have to do the actual work. Catching up to Anthropic is easier said than done, and at the end of the day, Meta is still a big tech company with lots of competing opinions and priorities.
我们整体上看好 MSL 的未来，但值得强调的是，他们基本上仍处在第一步。我们赞赏他们调集了向 RSI（递归自我改进）发起真正冲击所需的资源与胆量，但接下来他们得把活儿真正干出来。追上 Anthropic 说来容易做来难，说到底，Meta 仍是一家意见与优先级相互竞争的大型科技公司。

As we explained in our recent piece on Meta compute, there are many ways Meta can temporarily monetize compute in the short term while still giving themselves the optionality to full send MSL if their research org can hit the right milestones. However, if they do anything that demonstrates a true weakening of resolve, like signing a long term deal to sell compute with no clawback, disbanding their new RL task creation org, or letting their top researchers walk away, then we would be materially less bullish. You could even argue that any one of these would be tantamount to a death sentence for MSL.
正如我们在近期关于 Meta 算力的文章中所解释的，Meta 有很多办法在短期内临时变现算力，同时保留在研究组达成里程碑时全力押注 MSL 的选择权。然而，如果他们做出任何显示决心真正动摇的举动——比如签下没有回收条款（clawback）的长期算力出售协议、解散新成立的 RL 任务创建组，或者放任顶尖研究员离开我们的看多程度将实质性下调。你甚至可以说，其中任何一条都无异于给 MSL 判了死刑。
We briefly tested Muse Spark 1.1 before the official release and believe it’s roughly on par with Opus 4.6 or GLM 5.2 for general agentic use cases. The fact that Meta chose to price the model just under GLM 5.2 feels intentional. Some of our engineers noticed it has a bad habit of ignoring warnings instead of fixing them and doesn’t properly use the edit tool.
我们在正式发布前简短测试了 Muse Spark 1.1，认为它在通用 agentic 场景下大致与 Opus 4.6 或 GLM 5.2相当。 Meta 选择把定价定在略低于 GLM 5.2，感觉是有意为之。我们的一些工程师注意到，它有个坏习惯：忽略警告而不是去修复它们，并且不能正确使用 edit 工具。
None of our internal token volume will be moving to Muse Spark 1.1, but that’s still to be expected at this stage. Even in the bull case, we don’t expect them to be on par with Anthropic or OpenAI until the end of this year.
我们内部的 token 用量不会有任何一部分迁移到 Muse Spark 1.1，但在现阶段这也在意料之中。即便在乐观情形下，我们也不认为他们能在今年底之前追平 Anthropic 或 OpenAI。
What this means for Google
这对 Google 意味着什么
Reassigning 3000 engineers to full-time RL task creation, a rapid multi GW internal compute ramp, and billion dollar equity grants for top talent are all strong pieces of evidence that Meta is truly “AGI-pilled”. Despite significant negative PR, internal backlash, and serious hits to their stock price, they’re willing to think outside the box and leverage all the advantages they have over Anthropic/OpenAI.
把 3000 名工程师调去全职创建 RL 任务、快速推进多 GW 的内部算力爬坡、向顶尖人才发放十亿美元级的股权激励——这些都是有力证据，表明 Meta 是真正“AGI-pilled”（笃信 AGI）的。尽管承受了显著的负面公关、内部抵触和股价的严重打击，他们依然愿意跳出框架思考，并把自 己相对 Anthropic/OpenAI 的一切优势都用上。

Alexandr Wang described it well in a recent podcast appearance. Every true frontier lab starts with the core conviction that superintelligence is on the horizon, and all future business decisions must be downstream of this fundamental belief.
Alexandr Wang 在最近一次播客中说得很好：每一家真正的前沿实验室，都始于一个核心信念——超级智能已在地平线上；此后所有的商业决策都必须是这一根本信念的下游产物。
Historically, this prerequisite level of religious zeal was only present at startups (i.e. OpenAI and Anthropic) founded with the express goal of building digital god. Google may pay lip service to the idea of superintelligence, but it’s clear many key executives don’t actually believe a “country of geniuses in a datacenter” can appear within the next 3 years. If they did, they’d be funneling all their compute to DeepMind instead of actively enabling its fiercest competitors.
从历史上看，这种作为前提的宗教般的狂热，只存在于那些以“造出数字之神”为明确目标而创立的初创公司（即 OpenAI 和 Anthropic）。Google 或许会在口头上认同超级智能的理念，但很明显，许多关键高管并不真的相信“数据中心里的天才之国”能在未来 3 年内出现。如果他们真信，就会把全部算力灌给 DeepMind，而不是主动为其最凶猛的竞争对手提供助力。
[Figure: Google AI compute by segment (IaaS, Agent Enterprise API, Gemini Enterprise, Google Services AI, DeepMind), 4Q23–4Q27. Source: SemiAnalysis Tokenomics Model]
[图：Google 的 AI 算力按业务板块拆分（IaaS、Agent Enterprise API、Gemini Enterprise、Google ServicesAI、DeepMind），4Q23–4Q27。来源：SemiAnalysis Tokenomics Model]
We project that the majority of Google’s incremental datacenter capacity for the next 2 years will go towards their infrastructure as a service (IaaS) and 3p API businesses. DeepMind will have less training compute than OpenAI, Anthropic, and MSL. Yes, they just issued \$85B of equity to build more AI infrastructure, but we believe the majority of this additional compute will be rented out to customers like Anthropic.
我们预测，未来 2 年 Google 新增数据中心产能的大部分将投向其 IaaS 与第三方 API 业务。DeepMind 的训练算力将少于 OpenAI、Anthropic 和 MSL。 是的，他们刚刚增发了 850 亿美元股权用于建设更多 AI 基础设施，但我们认为这部分增量算力的大头将被出租给 Anthropic 之类的客户。
This is loser mentality from Google.
这是 Google 的失败者心态。
Google also recently lost even more great RL people to Anthropic. Their RL efforts are too decentralized.
Google 最近还向 Anthropic 又流失了一批优秀的 RL 人才。他们的 RL 投入过于分散。
If Google’s truly serious about reaching the frontier, they should start having some software engineers make RL tasks and redistribute significantly more compute to DeepMind effective immediately. We give the same advice to Microsoft AI and Amazon AGI too, but they are already beyond saving.
如果 Google 真的认真想触及前沿，他们应当立刻开始让一部分软件工程师去制作 RL 任务，并即刻向DeepMind 大幅重新分配算力。我们对 Microsoft AI 和 Amazon AGI 也给同样的建议，不过这两家已经无可救药了。

In our view, the race for 3rd is currently between Meta and SpaceX, not Google.
在我们看来，争夺第三名的是 Meta 和 SpaceX，而不是 Google。
