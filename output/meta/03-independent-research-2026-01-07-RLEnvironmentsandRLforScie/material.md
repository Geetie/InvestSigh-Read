---
id: 03-independent-research-2026-01-07-RLEnvironmentsandRLforScie
cat: "03"
sub: independent-research
template: independent-research
template_version: 2
date: 2026-01-07
time: "00:00"
title: "SemiAnalysis：RL 环境与科学 RL——数据铸造厂、多智能体架构与各实验室采购图谱（2026-01-07）"
kind: "independent-research"
issuer: "SemiAnalysis / AJ Kourabi、Dylan Patel"
ticker: META
source_pages: 36
---

## Q1 · 他给的公司**未披露口径**的外部估算是什么？

**本件主体是行业（RL 环境与人类数据供应链），不是某一家公司**，Meta 只以 Scale AI 收购方与 mid-training 案例的身份出现。外估逐项：

① **环境单价**：克隆一个网站做"UI gym"约 2 万美元/站点，OpenAI 已为 ChatGPT Agent 采购"数百个"站点；代理变量=单站点克隆成本，样本为行业访谈，无客户名单。

② **供应商收入**：Surge"我们相信接近 \$1B ARR"（作者判断，非披露）；Scale AI 2024 年收入超 \$1.4B（媒体口径，后被 Meta 吸收）。

③ **供应商家数**：全球 35 家以上，做 RL 环境/工具；无名单、无地区拆分。

④ **后训练占预训练算力比**：Qwen 约 5%；Google 在 Gemini 2.5 Pro 发布时"很可能低于 5%"。

⑤ **mid-training 语料**：Meta 近期编码模型用 1T tokens，作者预计 OpenAI 用其 5–10 倍（即 5–10T）。

⑥ **评估结果**：GDPval 覆盖 1000+ 任务、44 个职业、所取行业占经济 >5%，出题专家平均 14 年经验；GPT-5.2 胜率约 71%。

⑦ **任务量**：DeepSeek V3.2 用 24,667 个 GitHub 编码任务；SWE-rebench 从 45 万 PR 过滤到 21,336 个任务。

判断：①② 无中间步骤，只能当量级；⑦ 有完整漏斗，可当读数。

### 依据

- p.6｜These “UI gyms” often cost about $20,000 per website, and OpenAI has purchased hundreds of sites for ChatGPT Agent training and development.
- p.12｜Firms like Mercor, Handshake, Surge, and Aboda.ai are used to hire these experts across many professional domains. Surge is the more established and larger player, with revenue we believe is closer to $1B ARR.
- p.5｜During a Gold Rush, sell shovels. In an RL Scaling Boom, sell RL environments. More than 35 companies have popped up whose goal is to do exactly this across a variety of domains.
- p.12｜Chinese VC firms are actively trying to stand up Chinese data foundry competitors so they can fully serve the local ecosystem at cheaper prices than western ones. Most Chinese labs are still early to scaling RL: Qwen is currently spending around 5% of
- p.16｜Google spent a small amount of compute on post-training for Gemini 2.5 Pro, likely under 5% of pre-training compute at launch.
- p.25｜Meta used 1T tokens for mid-training for a recent model, but we expect OpenAI to be using somewhere between 5-10x more.
- p.3｜This eval covers 1000+ tasks across 44 occupations, picked from sectors that representing >5% of the economy.
- p.3｜The best current model, GPT-5.2, scores around 71%, meaning its work is tied to or preferred from human outputs 71% of the time.
- p.10｜DeepSeek ended up using 24,667 coding tasks extracted from GitHub for the training of V3.2.

## Q2 · 他的**物理量**从哪来、能不能核？

**无法核**。本件几乎不给电力、机柜、卡数这类可核物理量，通篇没有 GW/MW 口径；能勉强算物理量的只有三处，且都不是 Meta 的产能：

① 并发实例数——"其他实验室（如 Kimi）已建成的基础设施可同时起 10,000+ 个实例"，出处是"we know"，无客户确认、无集群位置；② 机器人数量——Periodic 与 Medra 计划各建"数百台机器人"的自动化实验室，是计划值不是建成值；③ 单位实验成本——一次生物实验数百至数千美元、耗时数小时，对比编码任务可试 64 次近乎免费。

查了哪里：全文 35 页，含采购图谱、SWE-rebench 漏斗、生物实验室、多智能体四节，没有任何一处给数据中心功率、机柜数或加速卡张数；也没有一张表列站点。

为什么记无法核：这三处都缺"从计划到建成"的中间步骤，第①条甚至没有主语（"other labs like Kimi"）。判断：本件的物理量只能当背景，不得用于产能或算力测算。

### 依据

- p.10｜We know, from other labs like Kimi, that the infrastructure developed can support the instantiation of 10,000+ instances simultaneously.
- p.27｜Like periodic, Medra aims to build their own lab with hundreds of robots.
- p.28｜A single biological experiment can cost hundreds to thousands of dollars and take hours to complete, compared to a coding task that can be attempted 64 times and graded for a trivial cost.

## Q3 · 这份材料是**四种交付物里的哪一种**？同源的另一份是哪一份？

本份是 **original**（纯英文原文）：Substack 全文形态，页首是英文标题加一长串副题（列举全文覆盖的议题），随后是两位作者署名、日期与 `PAID` 付费墙标记，正文全英文，无任何中文对照或译文，也没有被压成要点条目。

同源组：本件在《同源对照表》里是单行单 id（"RL Environments / RL for Science（2026-01-07）"只列 `2026-01-07-RLEnvironmentsandRLforScie` 一份），**没有同源的另一份交付物**，因此它是这个来源的唯一载体，不存在"同一原文被计成多个源"的问题；反过来，引用它的任何结论时也不能再找一个"英文原版"来当第二来源。

主体提示：本件主体是行业，不是 Meta——Meta 只在两处出现（Scale AI 被其吸收、其编码模型的 mid-training 用 1T tokens），不能把它读成一份 Meta 研究。

### 依据

- p.1｜RL Environments and RL for Science: Data Foundries and Multi-Agent Architectures
- p.1｜AJ KOURABI AND DYLAN PATEL JAN 07, 2026 ∙ PAID

## Q4 · 他的**假设与算式**能不能复算？

两处，一通过一不通过：

① **mid-training 语料外推**：Meta 1T tokens ×（5～10）＝5～10T tokens，这就是作者"OpenAI 大概用 5–10 倍"的全部内容。乘法本身没问题，**复算通过**；但"5–10 倍"是拍的系数，没有任何依据（没有模型规模、没有 token/参数比、没有消融），所以结果只能当区间参考，不能当读数。

② **SWE-rebench 任务漏斗**：45 万 PR → 21,336 个有效任务，产出率约 4.7%。两端数字文中都有，**但中间不可复算**——过滤条件列了（已解决、已合并、描述充分、影响多文件、带测试改动、执行验证通过），却没给每一层剩下多少，无法验证 4.7% 是否合理，也无法判断这套漏斗换到私有仓库会不会同比例。

判断：本件能进模型的只有"后训练算力占比 5% 量级"和"任务产出率 5% 量级"这两个量级结论，具体系数不可复算。

### 依据

- p.25｜Meta used 1T tokens for mid-training for a recent model, but we expect OpenAI to be using somewhere between 5-10x more.
- p.10｜After all the filtering, we end up with 21,336 tasks from the 450k we started.

## Q5 · 关键数字的**脚注指向哪**？

无编号脚注，来源用行内括注与 `Source:` 行给出，三类：

**指向一手（该条可升 Ⅰ）**：GDPval 的任务构造、44 个职业、71% 胜率来自 OpenAI 自己的评测与论文；IMO 金牌模型的解题样本明确标"Sample answer from the IMO winning model. Source: OpenAI"；文末附的 OpenAI"Strategic Deployment"岗位描述也是官方招聘页；mid-training 消融表标"Source: Meta"，是 Meta 自家论文的表 4。

**指向另一家公司（Ⅱ）**：那份 LLM 自动生成的评分 rubric 标"Source: The LLM Data Company"，是一家创业公司的产物，未经第三方验证。

**无出处（Ⅱ，按"行业访谈"处理）**：Surge 接近 \$1B ARR、35 家以上环境公司、Anthropic 与"十几个"供应商合作、UI gym 2 万美元/站点、OpenAI 买了"数百个"站点——全部以"we believe / we think / we know"引出，无底稿。

判断：能升 Ⅰ 的只有 OpenAI 与 Meta 的公开材料；供应链侧的数字一律 Ⅱ。

### 依据

- p.16｜Sample answer from the IMO winning model. Source: OpenAI
- p.14｜LLM Generated Rubric. Source: The LLM Data Company
- p.25｜Source: Meta
- p.22｜Source: OpenAI
- p.12｜Surge is the more established and larger player, with revenue we believe is closer to $1B ARR.

## Q6 · 他的**自建口径 / 评级**定义是什么？与公司口径差多少？

本件没有评级体系，但有三把自建的尺子，定义都不完整：

① **GDPval 胜率口径**：专家在"模型答案 vs 人类专家答案"之间二选一，胜率相等即"与人类专家持平"（parity）。作者给了规则却**没定义 parity 的数值边界**（50%？还是统计上不显著？），也没说样本量与置信区间；这个口径被用来支撑"评估正从抽象智力转向真实效用"这个大判断。

② **"便宜 5 倍"**：说 RL-as-a-service 创业公司"比 OpenAI 平台便宜 5 倍"，但没给任何单价、也没说比的是 RFT 的哪一档；它被用来解释"需求流向小创业公司"。

③ **业务三分法**：UI gym／环境／数据铸造厂（data foundry），无边界定义，同一家公司常被跨类引用。

判断：三把尺子都**不得当客观标准入格**；与公司口径的差异无法量化，因为公司侧根本没有对应披露。

### 依据

- p.3｜Grading occurs through experts picking between a model’s answer and a human expert’s answer. This win rate, if equal, would then mean that a model’s performance is then in parity with a human expert.
- p.21｜However, they are able to serve users at 5x less compared to what it would cost on OpenAI’s platform, gaining market share.
- p.6｜These “UI gyms” often cost about $20,000 per website, and OpenAI has purchased hundreds of sites for ChatGPT Agent training and development.

## Q7 · 他**有没有投行关系 / 持仓**？

三项分开：收费顾问——未声明；投行关系——未声明；持仓或受资助——未声明。

查了哪里：页首只有两位作者署名、日期与 `PAID` 标记（付费墙标识，不是投行关系，也不能当"无投行关系"的证据）；全文没有 Disclosure 段、没有作者简介、没有持仓或资助声明；结尾只有 Substack 的推荐语与版权行，没有免责声明。判断：按"关系不明"处理，不得假定独立。

需要留意的是本件有多处直接替供应商说话的段落（如"Anthropic 是最激进的买家""某些创业公司比 OpenAI 便宜 5 倍"），而 SemiAnalysis 本身是收费研究机构、其数据产品与这些公司同处一条供应链；关系未披露时，这类评价应降权。

### 依据

- p.1｜AJ KOURABI AND DYLAN PATEL JAN 07, 2026 ∙ PAID

## Q8 · 他的**行业级判断**（产能 · 份额）有数据支撑吗？

分两类：

**有数据支撑（可作旁证）**：① 供应商家数——35 家以上 RL 环境公司，口径为公司计数、时点 2026 年 1 月、全球，但无名单；② 供应链收入——Scale AI 2024 年收入超 \$1.4B，被 Meta 收购后"多家 AI 实验室基本停止与其签约"，这是少见的、可用公开事实交叉验证的份额转移；③ 训练任务量——DeepSeek V3.2 用 24,667 个编码任务、SWE-rebench 21,336 个任务，两者口径都是"通过执行验证的有效任务数"。

**无数（记观点）**：Anthropic 与"十几个"环境供应商合作、OpenAI 的供应商更少但净支出更多、中国实验室的后训练占比、以及"环境是 RL 的瓶颈"这一总判断——全部无口径四要素、无中间步骤。

判断：本件的份额类断言普遍缺分母（既没有采购额，也没有任务供给量），只能在"谁在买、买什么"这一层采信。

### 依据

- p.5｜More than 35 companies have popped up whose goal is to do exactly this across a variety of domains.
- p.4｜Historically, Scale AI was one of the largest data contractors for the labs but now has been mostly absorbed by Meta. Scale saw considerable spending from across all labs, with revenues north of $1.4B in 2024.
- p.5｜After the acquisition, though, multiple AI labs mostly stopped contracting Scale.
- p.15｜We think they are working with more than a dozen RL environment companies as contractors.
- p.10｜DeepSeek ended up using 24,667 coding tasks extracted from GitHub for the training of V3.2.
