---
id: 03-independent-research-0000-00-00-scalinglawso1probilingual
cat: "03"
sub: independent-research
template: independent-research
template_version: 2
date: 0000-00-00
time: "00:00"
title: "SemiAnalysis：Scaling Law 没死——O1 Pro 架构、推理训练基础设施，以及 Orion 与 Claude 3.5 Opus 的「失败」（2024-12-11）"
kind: "independent-research"
issuer: "SemiAnalysis / Dylan Patel、Daniel Nishball、AJ、Reyk Knuhtsen"
ticker: META
source_pages: 42
---

## Q1 · 他给的公司**未披露口径**的外部估算是什么？

本件主体是行业而非某公司：它评的是「scaling law 还成不成立」，Meta 只是被举的一个例子。可归入「公司未披露口径」的估算有五项，全部是外部估算。

① 推理单次查询成本倍数：o1-mini 的单次查询成本是中杯级非推理模型的 24 倍、o1-preview 是 57 倍。代理变量是「输出 token 数 × 每 token 价格」，样本是一道逻辑推理题（Qwen QwQ 发布博客里的括号题），o1-preview 输出 7,661 token、GPT-4o 同一题只输出 775 token。
② 训练侧合成数据生成量：约 1,000 万道题，每题生成数千条轨迹、每条轨迹数千 token，合计「数百万亿 token」。口径是生成量而非保留量，材料自己承认 ORM 会剔掉大部分，所以只能当量级、不能当训练集规模。
③ 跨厂商算力折算：40 万颗 Trainium2 按原始 FLOPs 不及 10 万颗 GB200。没有给单卡 FLOPS 与精度，只能当量级。
④ Meta 的可用数据量约为公开互联网的 100 倍（若可合规使用）。分母没定义（按 token 还是按字节、含不含私域图文），只能当量级。
⑤ 两项有单位有期间的：Meta 为 Llama 2 的偏好数据花了 1,000 万–2,000 万美元，超出同期算力开销；OpenAI 用户基数逾 3 亿（用于免费收偏好反馈）。

判断：能入格的只有 ①②⑤——有单位、有期间、有代理变量与换算桥；③④缺单卡参数与分母定义，只能当量级。另需注意 ② 的「数百万亿」与后文「后训练 FLOPS 已超预训练」是同一套自建模型的推论，不是两套独立证据。

### 依据
- p.34｜the cost per query is 24x higher in the case of o1mini and 57x higher for o1-preview.
- p.34｜If we were to take the 7,661 output tokens for o1preview and then run a query that resulted in that same sequence length of 7,661 tokens on Llama 3.1 405B, this would limit us to a maximum batch size of 72
- p.35｜The same problem run on GPT-4o only resulted in a sequence length of 775 tokens
- p.30｜Each of these trajectories contains thousands of tokens. This is hundreds of trillions of tokens generated for training a strawberry model such as o1.
- p.6｜Project Rainier has Amazon providing Anthropic with 400k Tranium 2 chips, but, in raw FLOPs, that is less than 100k GB200s.
- p.6｜Meta alone has approximately 100x more data available to them than is on the public internet (if they can harness this data in a compliant manner).
- p.18｜Meta spent \$10-20 million dollars on preference data for Llama 2, more than the compute time itself.
- p.18｜Because OpenAI has a huge customer base of more than 300M users, it can gather a lot of feedback, for improving models.

## Q2 · 他的**物理量**从哪来、能不能核？

分三档。

可回溯（产品规格或已公告项目）：单台 8×H100 节点 640GB HBM、Llama 3.1 405B 参数占 405GB、留给 KV Cache 235GB，这类是硬件与模型规格，可查；三种系统的 CPU:GPU 配比——当前英伟达整机 8 卡 2 颗 x86（4:1）、GB200 NVL72 是 72 卡 36 颗 CPU（2:1）、Anthropic 的 Project Rainier 是 16 颗 Trainium2 配 2 颗 CPU（8:1），也是产品参数。

半可回溯：Meta 在路易斯安那州为 2026 年规划的 2GW 数据中心、亚马逊为 Anthropic 备 40 万颗 Trainium2（IT 与机房合计约 65 亿美元）。这两项对应公开的园区与项目公告，方向可核，但本件没给公告出处与口径（2GW 是 IT 负荷还是园区总容量、40 万颗是否含备件），数值只能作旁证。

不可回溯：「DeepSeek 有 5 万颗 Hopper，超过除少数几家西方实验室之外的所有对手」「OpenAI 与微软用大约几十万颗 GPU 跑推理」「马斯克目标 100 万颗 GPU 集群」。三处都只给结论、没有中间步骤（谁数的、按出货还是按部署、含不含租赁），按规则记来源不可回溯、数值降为旁证。

判断：这份材料的物理量强在节点级规格推演（能自己算 KV Cache 与 batch），弱在「谁有多少卡」——后者是它全部行业结论的地基，却是全篇最不可核的一段。

### 依据
- p.36｜a sequence length of 39,000 tokens would mean that the KV Cache requirements would completely fill up all the 640GB of total HBM capacity of an 8xH100 node
- p.36｜we have not even factored in the 405GB required just to load the model parameters
- p.31｜Nvidia’s next generation GPU system, GB200 NVL72, has 72 GPUs and 36 CPUs, a 2:1 ratio.
- p.31｜Anthropic’s next generation system from Amazon codenamed Project Rainier, has 16 Trainium2, but only 2 CPUs, an 8:1 ratio.
- p.2｜to Meta’s 2GW datacenter plans for 2026 in Louisiana
- p.2｜preparing 400k chips for Anthropic at an estimated cost of \$6.5B in total IT and datacenter investment
- p.39｜Deepseek has more GPUs than you'd think: 50k Hopper GPUs - more than all but a few of the leading Western AI Labs.
- p.42｜Given OpenAI and Microsoft are running inference of GPTs on roughly a couple hundred thousand GPUs

## Q3 · 这份材料是**四种交付物里的哪一种**？同源的另一份是哪一份？

`bilingual`（中英对照）。判断依据有三条：页首标题、副题、作者行、正文段落全部中英并列、逐段一一对应；正文中段有一处显式的「中英对照 / BILINGUAL」标记行；图注也是先英文 `[Figure: …]` 后中文 `[图：…]` 成对出现。它不是纯译文（英文原句完整保留、未被删除），也不是摘要（没有 `KEY POINTS` 抬头，论证段落与图表一条不少）。

同源组：按本批统一的同源对照表，本件所在那一行只有 `0000-00-00-scalinglawso1probilingual` 一个 id，没有 original、summary、translation 的其它交付物。所以它是这份原文在本库里的唯一载体——单独登记，不构成多源，也不能与其他 SemiAnalysis 件（100k H100 集群、ClusterMAX、Gemini/GCP）互相加权，那些是不同原文。

判断：正因为是独源，它的每一个数字在本库里只有这一个出处；Q5 里「无脚注」的扣分不会被另一份同源件补回来，用它的数就必须回到 SemiAnalysis 本身。

### 依据
- p.1｜中英对照 / BILINGUAL
- p.1｜Scaling Laws - O1 Pro Architecture, Reasoning Training Infrastructure, Orion and Claude 3.5 Opus “Failures”
- p.1｜Scaling Laws：O1 Pro 架构、推理训练基础设施，以及 Orion 与Claude 3.5 Opus 的“失败”
- p.3｜Scaling Up Training, New and Old Paradigms Continue Scaling 训练的持续扩展：新老范式并存

## Q4 · 他的**假设与算式**能不能复算？

挑它最关键的一条：推理模型为什么贵。算式是「单次查询成本倍数 = 输出 token 倍数 × 每 token 价格倍数」。

复算：同一道题，o1-preview 输出 7,661 token、GPT-4o 输出 775 token，倍数 9.9；材料说两者同架构同规模、单价差 6 倍。9.9 × 6 = 59.3，材料给的 57 倍 —— 复算通过，差 4%（差额应来自单价里 prefill 与 decode 的拆分，材料没展开）。第二式：7,661 token 序列在 Llama 3.1 405B 上、以每用户 30 token/秒为交互性下限，最大 batch 72；775 token 时是 368。368 ÷ 72 = 5.1，材料写「每 token 成本高出 5 倍以上」，方向与量级都对，复算通过。

不能复算的一步：它说 39,000 token 的序列就能占满 8×H100 的 640GB。用材料自己给的 GQA 公式反算，Llama 3.1 405B 每 token 的 KV 约 252KB，39,000 token 的单条序列约 9.8GB，要占满 640GB 需要 batch 约 65 —— 而那张图没有标 batch 假设。这一步缺一个输入，不能验证，只能接受它的方向。

判断：核心成本结论可复算且误差在 5% 内，是本件最硬的一块；但凡是涉及「一张卡能服务几个用户」的图，都缺 batch 与精度标注，引用时要带上「按其自设的 30 token/秒」。

### 依据
- p.33｜Despite the fact that GPT 4o and o1 are the same architecture and size, the pricing difference is 6x per token.
- p.34｜o1-preview and o1-mini generate far more output tokens than their non-reasoning counterparts of similar size
- p.35｜this would correspond to a maximum batch size of 368
- p.35｜the cost per token over 5x higher for the longer sequence length query from KVCache limiting maximum batch size
- p.35｜Total GQA KV Cache Size in Bytes = Batch Size x Sequence Length x 2 x Number of Layers x (Hidden Size / Num Heads x Num of KV Heads) x Precision in Bytes.
- p.36｜memory available for KV Cache drops down to 235GB (the red line in the below chart), and in reality we reach memory limits at sequence lengths shorter than about 16k tokens

## Q5 · 关键数字的**脚注指向哪**？

本件没有脚注体系：42 页里没有一处编号脚注、没有参考文献列表、没有超链接形式的引注。它只有图注里的 `Source:` 行，而且分布很不均匀。

挂了 Source 的（指向一手：OpenAI、Meta、DeepSeek、Qwen、阿里、Hugging Face、Anthropic 论文、Epoch）——这些图的读法可到 Ⅰ 档，例如「过度训练两个数量级 FLOPs 换推理成本降一个数量级」那张图挂的是 Epoch，「PRM800K：80 万过程步骤、7.5 万解法、1.2 万道题」来自 OpenAI 自己的论文。

没挂 Source 的恰好是最关键的那批：Meta 2026 年 2GW 园区、40 万颗 Trainium2 与 65 亿美元、Meta 数据量 100 倍、Meta Llama 2 偏好数据 1,000 万–2,000 万美元、DeepSeek 5 万颗 Hopper、OpenAI 与微软几十万颗 GPU。这些是它自称「our data / industry checks」得出的估算，中间步骤不公开。

判断：按规则，无脚注的一律 Ⅱ 档；这份材料的一手图能撑住方法（KV Cache、roofline、过度训练曲线），但撑不住任何一个具体公司的算力与开支数。用它的 2GW、40 万颗、100 倍，必须另找公司公告或第三方清点复核，不能直接进格。

### 依据
- p.42｜the same performance can be achieved as what would be with a Chinchilla optimal using overtraining with two orders of magnitude extra FLOPs, resulting in a reduction in inference costs by one order of magnitude.
- p.22｜researchers introduced the PRM800K process supervision dataset, in which human data-labelers annotate 800,000 process steps that form part of 75,000 solutions to 12,000 questions from the MATH Dataset
- p.34｜[Figure: Source: SemiAnalysis]
- p.2｜From Amazon investing considerable sums to accelerate its Trainium2 custom silicon

## Q6 · 他的**自建口径 / 评级**定义是什么？与公司口径差多少？

本件自建了两把尺子，都给了定义，但没有打分权重。

尺子一，「推理 token 经济学」：以每用户每秒 30 token 作为最低交互性，用纯 roofline 模型（只算显存带宽与算力两个上限，忽略 MFU 与带宽利用率的实际折损）反推单卡能挂多少并发，再用 batch 反推每 token 摊到的集群 TCO。KV Cache 给了明确公式：批大小 × 序列长度 × 2 × 层数 ×（隐藏维度 / 注意力头数 × KV 头数）× 精度字节。这是可复算的工程口径，比厂商口径细一档。

尺子二，「berry training」：把 o1 类训练拆成生成器、验证器、奖励模型、策略模型四件套，用蒙特卡洛树并发 rollout，据此判断后训练的前向/反向比远高于预训练的 1:1。

与公司口径的差异：OpenAI 对外只给价格——同架构同规模的 o1 与 GPT-4o 单价差 6 倍，o1 mini 与 GPT-4o mini 差 20 倍；本件算的是成本，给出 24 倍与 57 倍。方向一致（都承认贵），但倍数大 4 倍上下，差额被它归因为「OpenAI 凭独特能力多收的毛利」。

判断：尺子可用，但要带三个前提（30 token/秒、纯 roofline、FP8 精度）；它没有「Tier 分级」这类可比较的评分，所以不能拿它的分数去和 ClusterMAX 之类的评级并表。

### 依据
- p.34｜this would limit us to a maximum batch size of 72 given that we want to target an interactivity of 30 tokens per second per user based on a pure roofline model.
- p.34｜For this simplified analysis, we do not incorporate any impact on memory bandwidth utilization or model flops utilization from different batch sizes.
- p.33｜there is an even larger difference in pricing of 20x per token
- p.30｜The entire system for training reasoning models is known as berry training.
- p.30｜These functional verifiers differ in many ways, but they can be thought of as independent “sandboxes” that are checking the math or running code to verify the generate data for correctness.

## Q7 · 他**有没有投行关系 / 持仓**？

三项分开看：收费顾问——未声明；投行关系——未声明；持仓或受资助——未声明。

查证范围：全文 42 页的页首（标题、副题、作者四人署名、日期）、每页页脚、文末，都没有 Disclosure / Conflict / 免责声明段落；本文也没有任何「本公司持有相关头寸」类表述。页首只有一句机构自述，说正在从 Substack 迁出、要做「更全面的全服务研究机构」——这是商业模式说明，不是关系披露。本份是中英对照件，页首没有 PAID 标记；同源的英文原本在日期旁有 PAID，那是付费墙标记，按规则不能当作「无投行关系」的证据。

需要点名的一处：文章对 OpenAI、Anthropic、亚马逊的产能与合作细节描述得非常具体（40 万颗 Trainium2、Rainier 的 CPU:GPU 配比、Anthropic 中期要打到 FrontierMath 80%），这类信息通常来自付费客户或产业访谈，但材料没有交代来源性质。

判断：按「未声明 = 关系不明」处理，不得假定独立。引用它对具体厂商的产能判断时，要同时承认存在未披露的产业信息来源。

### 依据
- p.1｜In our pursuit of becoming a better full service research firm, we’ve moved off Substack.
- p.1｜DYLAN PATEL, DANIEL NISHBALL, AJ, AND REYK KNUHTSEN — DEC 11, 2024
- p.9｜Anthropic has line of sight to hit 80% on FrontierMath over the medium term.

## Q8 · 他的**行业级判断**（产能 · 份额）有数据支撑吗？

有三类断言，支撑强度差别很大。

产能类：「各大实验室都没有足够产能按自己期望的广度提供模型服务」，举证是微软 Copilot 功能集未全量、Sora 无法广泛使用、注册通道关闭两天。这是产品可用性观察，不是产能读数——没有一处给 GW、卡数、交付周期，属于观点。

供需结构类：「后训练 FLOPS 已超过预训练」「后训练的前向/反向比远高于预训练的 1:1，因此单一全互连网络不再必要、跨地域训练更容易」。这条有机制解释（生成器、奖励模型、验证器要反复跑前向），但没有给量化，属有依据的判断而非读数。

份额类：只有一处可比，「DeepSeek 有 5 万颗 Hopper，超过除少数几家西方实验室之外的所有对手」。没有给分母、没有给统计时点与口径（自有还是租用、H100/H800 混算），因此不能算份额，只能算排序性观点。

唯一带一手图表的是「过度训练两个数量级 FLOPs 可把推理成本降一个数量级」，挂 Epoch；这条可以进格，其余不行。

判断：本件的行业结论是「scaling 仍在推进」，靠的是工程机制与成本算式（可复算），不是产能或份额统计（没有）。把它当产业逻辑读，不要当供需读数用。

### 依据
- p.42｜Compute is still very limited, on both pre-training and in inference.
- p.32｜Prior reasoning model post training runs take nearly as much compute as pre-training, and in many cases, the current ones already exceed the pre-training FLOPS.
- p.32｜This changes the infrastructure requirements heavily for training. For example, having a single large fully connected scale out fabric may not be as necessary as it was in the past.
- p.42｜with Elon Musk aiming for a 1 million GPU cluster
