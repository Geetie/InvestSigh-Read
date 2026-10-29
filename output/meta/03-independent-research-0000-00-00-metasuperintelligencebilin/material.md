---
id: 03-independent-research-0000-00-00-metasuperintelligencebilin
cat: "03"
sub: independent-research
template: independent-research
template_version: 2
date: 0000-00-00
time: "00:00"
title: "中英对照｜SemiAnalysis：Meta 超级智能——以算力、人才与数据领跑（2025-07-11）"
kind: "independent-research"
issuer: "SemiAnalysis / Dylan Patel、Jeremie Eliahou Ontiveros、Wei Zhou 等"
ticker: META
source_pages: 17
---

## Q1 · 他给的公司**未披露口径**的外部估算是什么？

本份给出的都是「外部估算」，且都靠图注式 Source 行交代来源：

1. **研究员薪酬包（外部估算）**：典型报价 4 年 2 亿美元，文中称「是同行的 100 倍」；另给区间 4 年 2 亿至 3 亿美元，以及个别未被接受的 10 亿美元报价。期间 2025 年上半年，代理变量是挖角 offer 金额，样本是被挖对象，未给样本量与职级口径。
2. **Scale AI 交易对价（外部估算）**：49% 股权、约 300 亿美元估值，属媒体口径，非公司披露。
3. **2026 年税单（外部估算）**：在其对 2026 年 capex 的估算与「capex 中符合 100% 加速折旧的采购占比」两个假设下，税单可能比预期低 50% 以上——两个输入都没给数，只有结果。
4. **回本周期（外部估算）**：OBBB 使新建项目回本周期缩短 1—2 年，无中间算式。

判断：第 2 项可与他处公告对照；第 1、3、4 项只有结果、无换算桥，只能当量级，不能入格。

### 依据

- p.2｜The typical offer for the folks being poached for this team is \$200 million over 4 years. That is 100x that of their peers.
- p.14｜The offers that generally range from \$200M to \$300M per researcher for 4 years also strengthens this pitch.
- p.1｜Meta’s shocking purchase of 49% of Scale AI at a \~\$30B valuation shows that money is of no concern for the \$100B annual cashflow ad machine.
- p.16｜Based on our estimate of Meta CapEx in 2026 and the expected mix of 100% bonus depreciation eligible purchases within CapEx, Meta’s tax bill in 2026 could be >50% less than expected.
- p.15｜shortens payback periods by 1–2 years vs. pre-OBBB

## Q2 · 他的**物理量**从哪来、能不能核？

本份的物理量三项，全部记「来源不可回溯」或「部分可回溯」：

1. **Prometheus 1GW 级训练集群**（俄亥俄）：量名是集群级 IT 功率，值 1GW 量级，时点 2025 年在建，来源是「据其基础设施部门内部消息人士」。无环评、无并网申请、无施工许可作为中间步骤，记不可回溯，只能当旁证。
2. **两座 200MW 现场表后天然气电厂**：这是全文最接近可核的一项——给了第一座的设备清单（3 台 Solar Turbines Titan 250、9 台 PGM 130、3 台西门子能源 SGT400、15 台 CAT 3520），型号可回溯到供应商产品页；但台数与功率的对应、厂用电与可用率均未给，装机总量仍无法核。
3. **训练 token 量**：Llama 3 405B 为 15T token，属公司公开披露，可回溯；Behemoth「3—4 倍」是其估算，不可回溯。

判断：电力类物理量一律不可回溯；设备清单是可核的起点，但要落到「兆瓦」还缺一份招标或环评文件。

### 依据

- p.5｜The Prometheus 1GW AI Training Cluster – An “All Of The Above” Infrastructure Strategy
- p.6｜With help from Williams, they’re building two 200MW on-site natural gas plants. The equipment breakdown for the first includes:
- p.12｜Llama 3 405B was trained on 15T tokens and we believe Llama 4 Behemoth required substantially more tokens, 3-4x order of magnitude larger.

## Q3 · 这份材料是**四种交付物里的哪一种**？同源的另一份是哪一份？

本份是 **`bilingual`（双语句对齐）**：页首中英双标题并列，正文每一段英文后紧跟对应中文段，末行明标「中英对照 / BILINGUAL」，并附站点与日期署名。判断依据的反面也成立——它不是纯译文（纯译文没有并列英文段），也不是 summary（没有 KEY POINTS 式条目压缩）。

同源组：《Meta Superintelligence》（SemiAnalysis，2025-07-11）的四种交付物——
`0000-00-00-metasuperintelligencebilin`（本份，双语）、`0000-00-00-metasuperintelligenceorigi`（纯原文）、`0000-00-00-metasuperintelligencesumma`（要点摘要）、`0000-00-00-metasuperintelligencetrans`（纯译文）。**四份是四份文档、一个来源，不得计成四个独立源**；四份各自登记回执，统计时只能算一次。

一个载体差异要点：本份把原文的两张表（最大训练集群对比、聊天应用统计）落成了图，只留图注，故那两个表的数值需回 `…origi` 取。

### 依据

- p.1｜中英对照 / BILINGUAL
- p.1｜SemiAnalysis · 2025-07-11 · https://semianalysis.com/

## Q4 · 他的**假设与算式**能不能复算？

本份唯一能自己算一遍的是薪酬倍数。算式：典型报价 2 亿美元/4 年 ÷ 他说「100 倍」⇒ 同行基准 = 200 ÷ 100 = 2 百万美元/4 年，即人均约 50 万美元/年。再用区间校验：2 亿 ÷ 50 万 = 100 倍，3 亿 ÷ 50 万 = 150 倍，与其「2 亿—3 亿美元」区间自洽。

**复算结论：方向与量级通过，但缺一步不能完全复算**——文中没有给「同行」的薪酬基准（哪家实验室、什么职级、是否含股票），只能用他的「100 倍」反推，无法独立验证。

其余关键结论不能复算：2026 年税单「低 50% 以上」的输入是「我们对 Meta 2026 年 capex 的估算」与「capex 中符合 100% 加速折旧条件的采购占比」，两个输入都没数，只给结果；回本周期缩短 1—2 年同样无算式。这类数字只能当方向性旁证，不许拿估算值冒充算出来的。

### 依据

- p.2｜The typical offer for the folks being poached for this team is \$200 million over 4 years. That is 100x that of their peers.
- p.14｜The offers that generally range from \$200M to \$300M per researcher for 4 years also strengthens this pitch.

## Q5 · 关键数字的**脚注指向哪**？

本份没有编号脚注，关键数字靠图注式 Source 行交代，译本把这些行保留了：公司财务类指向「Source: Meta financials and SemiAnalysis estimates」；份额与对比类指向「Source: The Information, SemiAnalysis estimates」（二手媒体）；行业模型类指向「Source: SemiAnalysis Datacenter Model」与「Source: SemiAnalysis Accelerator Model」（自建模型）。

按档位：指向公司财报的是一手，但本文未给报表期次或链接，不能直接落 Ⅰ 档；指向 The Information 的是二手，记 Ⅱ；指向自建 Datacenter/Accelerator Model 的属自建模型，记 Ⅱ 且不可复核。

另有一处明说数字在付费墙之后——核心研究图的「实际数字见报告末尾付费墙之后」，即图只有来源、没有可核的数。

判断：本份最硬的三个数（1.5GW、200MW、约 300 亿美元）都没有脚注，一律按 Ⅱ 处理；想升档必须回原文的一手文件。

### 依据

- p.1｜Source: Meta financials and SemiAnalysis estimates
- p.3｜Source: The Information, SemiAnalysis estimates
- p.4｜actual numbers are shown beyond paywall

## Q6 · 他的**自建口径 / 评级**定义是什么？与公司口径差多少？

本份没有评级体系，只有两把自建尺子，都没给算式：

1. **人均算力（compute per researcher）**：用「GPU 穷光蛋变 GPU 富得流油，按人均研究员口径」描述进展。与公司口径方向不同——公司讲绝对 capex 与绝对 GW，他讲人均；两者之间缺研究员人数这一环，无法换算，也没给人数。
2. **吉瓦级集群的财务画像**：断言 2027 年财务面貌「与 Reality Labs 如出一辙」。这是类比口径，既没把 GW 折成折旧与电费，也没给 Reality Labs 的亏损口径，只能当叙事。

另有一处隐含口径：把 2026 年税单下降归因于「capex 中符合 100% 加速折旧的采购占比」，该占比未定义、未给数。

判断：两把尺子都**不得**用来做横向比较或入格，只可作定性旁证。

### 依据

- p.2｜The company is going from GPU-poor to GPU-filthy-rich on a per researcher basis.
- p.16｜Based on our estimate of Meta CapEx in 2026 and the expected mix of 100% bonus depreciation eligible purchases within CapEx
- p.16｜On the other hand, the Superintelligence Gigawatt training clusters are a pure expense. We think the financial profile will likely resemble Reality Labs by 2027.

## Q7 · 他**有没有投行关系 / 持仓**？

三项分开：**是否收费顾问——未声明；是否有投行关系——未声明；是否持仓或受资助——未声明**，按「关系不明」处理，不能假定其独立。

查了哪里：全文 17 页，页首只有标题、副题、五位作者与「PAID」标记，末页是结论段（2026—2027 年从独立业务看很可能极度亏损），**没有** Disclaimer、Disclosure、作者简介或持仓声明段；正文也没有「本公司持有」「担任某公司顾问」一类句子。

为何相近的句子不能算本项：「PAID」是付费墙标记，只说明这是付费订阅内容，既没说有投行关系，也没说无；「SemiAnalysis estimates / Datacenter Model」只表明自建模型，与持仓、顾问费无关。

判断：对「Meta 估值与资本开支」这类结论，使用时须自行加一道利益核验。

### 依据

- p.1｜[Figure: DYLAN PATEL, JEREMIE ELIAHOU ONTIVEROS, WEI ZHOU, AND 2 OTHERS JUL 11, 2025 ∙ PAID]
- p.17｜2026 and 2027 will likely be extremely unprofitable on a standalone business perspective

## Q8 · 他的**行业级判断**（产能 · 份额）有数据支撑吗？

本份的行业级断言有三条，都缺读数：

1. **预租份额**：称 2024 年下半年 Meta 预租的产能「超过任何一家超大规模云厂商」，且多在俄亥俄。口径是预租容量（不是投运容量）、地理集中一地，既没给 MW 也没给对比样本（对哪几家、含不含自建），只能算观点。
2. **单一园区规模**：路易斯安那集群一期 IT 供电超 1.5GW、2027 年底成为「全球最大单一园区」——比的是 individual campus，不含分布式园区合计，且来源是消息人士。
3. **训练算力总量**：称 Meta 在训练 FLOPS 上的爬坡「将与 OpenAI 分庭抗礼」，是相对量级判断，正文没给任何 FLOPS 数；真正的三家集群对比表在本份被落成图，图内无文字可引。

判断：这三条是观点＋消息人士，不是读数；要做产能/份额结论必须回原文表格，并标明表的口径是「YE2026 IT 功率」还是「芯片数」。

### 依据

- p.6｜In fact they pre-leased more capacity second half of 2024 than any hyperscaler, mostly in Ohio.
- p.7｜The Louisiana cluster is set to be the world’s largest individual campus by the end of 2027, with over 1.5GW of IT power in phase 1.
- p.2｜In fact, we believe Meta’s ramp in training FLOPS will rival even that of OAI.
- p.7｜[Figure: Source: SemiAnalysis Datacenter Model and Accelerator Model]
