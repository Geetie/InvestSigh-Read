---
id: 03-independent-research-2026-09-14-RSI论文
cat: "03"
sub: independent-research
template: independent-research
template_version: 2
date: 2026-09-14
time: "00:00"
title: "上海交大 Theseus：人类造的最后一批 AI——通往真正的递归自我改进（2026-09）"
kind: "independent-research"
issuer: "上海交通大学 Theseus 团队（Yi Duan、Ying Liu、Zirui Tang 等，联合清华、字节跳动、小红书等 9 家机构署名）"
ticker: META
source_pages: 75
---

## Q1 · 他给的公司**未披露口径**的外部估算是什么？

本件没有对任何公司做财务、产能或单位经济的外部估算，全篇量化内容只有三类：转述各家自报的运营量、作者自建的能力指数、以及小样本实验的前后对照。最接近「经营」的一条是 Meta 的回归排查人工量：Meta 自报 FBDetect 每周识别数千次基础设施回归，单次诊断约需 10 个工程师工时，作者把它接到 Capacity Efficiency 系统「把数小时压缩到分钟」的叙述上。原文只给两个基数、不给乘积；按原文相乘，每周量级是数万工程师工时（数千 × 10 小时），但这是 Meta 自报、作者转引，不是作者的独立估算，且没有「工时 → 美元」的换算桥，只能当量级，不能入格。第二类是人力对标：ModelBest 的 ForgeTrain 在 H100 上约 8 小时追平 Megatron-LM v0.15，对标「估计 3–5 名工程师做 6–12 个月」——这是全文唯一带 estimated 的外部估算，但标的是人数乘月数，不是钱，同样无单价桥。第三类是小样本效率量：Humanlaya V0→V4 在 600 个留出任务包上把单任务人工处理时间从 48 分钟降到 27 分钟（-43.75%）。判断：这些都是「改进流程省了多少人工」的量，不是收入、成本或产能；能支撑「RSI 在压缩工程工时」的方向性结论，不能折算成任何公司的财务读数。HCI 与各基准分数属能力指数，benchmark 分数，不作经营读数。

### 依据
- p.3｜Meta reports that FBDetect identifies thousands of infrastructure regressions each week, and diagnosing one such regression required roughly ten engineer-hours [5].
- p.48｜compared with an estimated 3–5 engineers working for 6–12 months for comparable manual development
- p.3｜Anthropic reports that agentic workloads use approximately four times as many tokens as ordinary chat, rising to about fifteen times for multi-agent systems because of longer contexts, coordination, environment setup, and end-to-end verification [13]
- p.47｜The rate of packages containing key defects after automated repair decreased from 9.0% to 3.7%, while average human handling time fell from 48 to 27 minutes per task.

## Q2 · 他的**物理量**从哪来、能不能核？

本件是综述，没有设施级物理量。查过全文的电力（GW/MW）、机柜数、集群卡数、晶圆产能、建筑面积、船期，一处都没有；也没有一处写出训练用了多少张卡、多少度电、多长时间。唯一带硬件型号的表述是实验台配置：NanoGPT 评测给智能体一块 H100 和受限训练环境；ForgeTrain 在 H100 上约 8 小时追平 Megatron-LM v0.15、1.5–2.5 天内反超。这两条是单卡实验与单项目墙钟，属实验设置，不能外推为算力规模，也无中间步骤（卡型、并行度、集群规模）可核。另有比例型算力量：DeepSeek-V3.2 的后训练计算预算超过预训练的 10%，是比例不是绝对量，且为公司自报。结论：设施级物理量「无法核」——不是作者藏了数，而是本件体裁不承载（摘要自述是靠行业实践与初步实证把 RSI 研究与实际系统连起来），要拿算力规模必须另找有集群披露的件；实验台物理量仅一块 H100 与 H100 墙钟小时，来源为论文自述、无外部凭证，只作旁证。

### 依据
- p.20｜OpenAI’s NanoGPT evaluation for GPT-6 Astra gives the agent a fixed validation target, one H100, and a constrained training setup
- p.48｜ForgeTrain [213] generated a pre-training framework that matched Megatron-LM v0.15 on H100 within roughly 8 hours and reportedly surpassed it within 1.5–2.5 days
- p.1｜Drawing on diverse industry practices and preliminary empirical evidence, we connect RSI research with practical systems and identify key challenges to achieving genuine RSI.

## Q3 · 这份材料是**四种交付物里的哪一种**？同源的另一份是哪一份？

本份是 `original`（纯原文）。判断依据：首页只有英文标题、作者名单、九家机构署名与英文摘要，没有中英并列对照；没有 `KEY POINTS` 一类摘要抬头，也没有把正文压成条目的痕迹；正文是完整论文结构（引言 → 背景与 HCI → 五级自主权 → 分场景 → 行业实践与初步实证 → 挑战），带编号参考文献与 LaTeX 公式残片（如 `H _ { m b h }`），这是原版排版直接抽取的特征；目录页整页只有 `Contents` 一行，译本与摘要件不会保留这种版式。同源组：按同源对照表的「Theseus RSI 论文（上海交大）」一行，本批只登记 `2026-09-14-RSI论文` 一份，没有它的双语版、译本或摘要件。因此本份是单一来源、单一文档，不存在「同一原文被计成多个独立源」的风险；引用时无需注明译本数字差异，但要记住它的证据都来自转引而非作者实测。

### 依据
- p.1｜The Last AI Built by Humans: Toward Genuine Recursive Self-Improvement
- p.2｜Contents

## Q4 · 他的**假设与算式**能不能复算？

最关键的可复算结论是「剩余余量」外推：作者假设各能力域此后按剩余空间的 78% 继续收敛，写成 R_d − T_d,2026 = 0.78 × (100 − T_d,2026)。按原文四个域的 2026 值复算：软件工程 52.6 + 0.78×47.4 = 89.57（原文 89.6）；搜索/终端智能体 56.8 + 0.78×43.2 = 90.50（原文 90.5）；工具智能体 39.9 + 0.78×60.1 = 86.78（原文 86.8）；网络安全 91.9 + 0.78×8.1 = 98.22（原文 98.2）。四例全对，差异只在四舍五入，**复算通过**。但算式通过不等于假设成立：0.78 不是拟合值，原文没给回归、样本或置信区间，自己也称其为 illustrative，即为了让「余量越大涨得越多」这条叙事成立而设的示意参数；所以能复算的是算术，不能核的是那个 78%。另一条可算的是 GDPval 的 9,240 专家小时 ÷ 1,320 个专业任务 = 7.0 小时/任务，同样通过，但那是数据生产成本，不是经营量。结论：本件的公式层是干净的（可逐行复核），结论层的数字是示意性的，不能当预测用。

### 依据
- p.9｜Equivalently, the illustrative gain is R _ { d } { - } T _ { d , 2 0 2 6 } = 0 . 7 8 ( 1 0 0 { - } T _ { d , 2 0 2 6 } )
- p.9｜Cybersecurity therefore moves from 91.9 to 98.2, while software engineering, search and terminal agents, and tool agents move from 52.6 to 89.6, from 56.8 to 90.5, and from 39.9 to 86.8.

## Q5 · 关键数字的**脚注指向哪**？

本件不用脚注，用论文体尾注：正文以方括号编号标注，文末 References 逐条给出标题、出处与 URL。关键数字的指向可逐条追：Meta 的「每周数千次回归、单次约 10 工程师工时」指向 Meta Engineering 的公司工程博客（engineering.fb.com，2026-04-16 发布，2026-09-09 访问），属一手公司工程披露；Anthropic 的 4 倍/15 倍 token 倍数指向 Anthropic 官方工程博客；DeepSeek 的后训练占比指向 arXiv 预印本。链条可回溯，按 Ⅰ 档（可逐行复核）处理。两点限制必须写明：一是作者在证据范围一节明说，纳入技术报告、官方工程博客、开源仓库、模型文档与公开榜单，不要求同行评审，因此同一批数字的证据强度并不齐（工程博客强于榜单自述）；二是全部为转引，作者没有复述原始统计口径——样本多大、时间窗多长、是否含缓存与重试，一概未交代。所以引用一律写「论文称」，它不能替代公司披露，也不能当作已核过的原始数据。

### 依据
- p.54｜[5] Meta Engineering, “Capacity efficiency at meta: How unified ai agents optimize performance at hyperscale,”
- p.54｜https://engineering.fb.com/2026/04/16/developer-tools/capacity-efficiency-at-meta-how-unified-ai-agents-optimize-performance-at-hyperscale/, Apr. 2026, published April 16, 2026; accessed September 9, 2026.
- p.12｜Industrial practice is a primary source of evidence for contemporary RSI.

## Q6 · 他的**自建口径 / 评级**定义是什么？与公司口径差多少？

作者自建了两把尺子。第一把是 HCI（Headroom-Closed Index，余量收敛指数）：先把上报分数按「基准版本 + 评测 harness 不变」归入同一 protocol 家族，同模型同基准多源上报时按来源加权求共识分——基准方表、独立同 harness 评测、综合报告、模型方自报依次给 3、2.5、2、1 的权重，模型作者自报再乘 0.75 压低；再以该基准进入数据集首年得分的 90 分位为 0 点（记进入年前沿）、满分为 100 做归一；域级轨迹按 √n（该基准年参与模型数）加权平均，让小表不被大表淹掉。第二把是自主权分级：B0（仅任务内自我改进，不算 RSI）与 L1–L5（执行、策略、经验获取、环境适应、递归继承），切分依据是「哪些改进决策转给了 AI」，不是能力高低或自动化组件数量。与公司口径的差异：公司没有任何对应指标可比，HCI 是百分制相对指数，无法与任何披露数字换算，「差多少、哪个方向」无从谈起；0.78 的外推系数也未定义为可估计参数。结论：两把尺子只能用于内部排序与跨域比较，不得当公司口径；L1–L5 分级还带主观判断，表里大量 adj.／cand.／target 标注即作者自认边界不清。

### 依据
- p.8｜3, 2.5, 2, and 1, respectively. We multiply first-party values by an additional factor of 0.75. These weights provide a practical sensitivity adjustment, limiting the influence of self-reported results.
- p.8｜Thus, H _ { m b h } = 0 denotes the entry-year frontier and H _ { m b h } = 1 0 0 denotes a perfect score.
- p.8｜The square-root weight allows better-covered families to contribute more without letting the largest table dominate the domain value.

## Q7 · 他**有没有投行关系 / 持仓**？

三项分开答：收费顾问——未声明；投行关系——未声明；持仓或受资助——未声明。查了哪里：首页只有作者名单、九家机构署名与一位通讯作者，没有 funding、acknowledgement 或 competing interests 段；文末从参考文献直接进到附录大表的续表，全篇收在表注上，没有 Disclosure 段可读。因此按「关系不明」处理，不得假定独立。要分清的一点：作者单位里有多家产业机构（字节跳动、小红书超级智能团队、ModelBest、上海 AI Lab），上海交大与 Theseus Labs 是主场，这构成产业署名与潜在利益关联，但不是投行关系，也不是持仓披露；本件也没有付费墙标记，不能用它反证「无关系」。另外它是学术论文，本来就不承担卖方那套披露义务，缺这些不等于刻意隐瞒，只是让我们无法据此判定独立性——引用其涉及具体公司的段落（如 Meta 的回归排查效率）时，应回到原始工程博客核对。

### 依据
- p.1｜1Shanghai Jiao Tong University 2Theseus Labs 3Tsinghua University 4ByteDance 5ModelBest 6Super Intelligence Team, Xiaohongshu Inc. 7Humanlaya 8Agent-Native Research Lab 9Shanghai AI Lab
- p.1｜†Corresponding author: Xuanhe Zhou

## Q8 · 他的**行业级判断**（产能 · 份额）有数据支撑吗？

没有产能、份额、供需缺口的数据：全文不出现出货量、产值、市占率、装机量，也没有一句「某公司占多少」。唯一成体系的行业级读数是自建的 HCI 域轨迹：393 条模型×基准观测、覆盖十个能力域、模型发布期 2023 年至 2026 年 9 月；最新一轮审计的 33 条结果只采纳 17 条进轨迹，另 16 条因基准版本或评测设置无法桥接，只留在审计记录里参考。这些是 benchmark 分数，不作经营读数——它衡量「离满分还有多远」，不衡量收入、算力或客户数。第二类是定性判断：行业景观大表把上百家公司与产品按「改进对象 × AI 控制的部分 × 自主级别」逐行标注，用 adj.／cand.／target 与星号标出证据强度，并明说部分公司身份与技术边界仍需更强核实。所以「模型厂商 2024 年后转向 agentic coding 与工具使用」「交互类能力余量最大所以 RSI 价值最高」这类话，只能记观点，凭据是自建索引加文献盘点，不是统计口径下的读数；要谈份额或产能，本件给不了，得另找有出货与产值口径的源。

### 依据
- p.7｜Figure 3 summarizes 393 eligible model–benchmark observations across ten capability domains for models released between 2023 and September 2026.
- p.75｜“ adj .” marks RS I- adj acent infrast ruct ure or b ehavior
