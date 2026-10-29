---
id: 03-independent-research-0000-00-00-metasuperintelligenceorigi
cat: "03"
sub: independent-research
template: independent-research
template_version: 2
date: 0000-00-00
time: "00:00"
title: "SemiAnalysis 原文：Meta 超级智能——算力、人才与数据的领导权（2025-07-11）"
kind: "independent-research"
issuer: "SemiAnalysis / Dylan Patel、Jeremie Eliahou Ontiveros、Wei Zhou 等"
ticker: META
source_pages: 27
---

## Q1 · 他给的公司**未披露口径**的外部估算是什么？

本份有真正的估算表，共四组，全部标「外部估算」：

1. **三家最大训练集群对比（外部估算）**：口径为「2026 年底 IT 功率」，Anthropic Project Rainier 780MW/80 万颗 Trainium 2；OpenAI Stargate 880MW/40 万颗 GB200/300；Meta Prometheus 1,020MW/50 万颗 GB200/300，总算力 3,171,044,226 TFLOPS。代理变量是芯片数×单片算力，样本仅三家，来源标注为自家 Datacenter Model 与 Accelerator Model。
2. **聊天应用格局（外部估算）**：按 DAU、日均查询、人均日查询、用户份额、查询份额五列给出六家；ChatGPT 1.6 亿 DAU/12 亿次查询/人均 7.5 次/份额 49% 与 71%；MetaAI 1 亿 DAU/2 亿次查询/人均 2.0 次/31% 与 12%。代理变量是 DAU 与查询量，未给抽样方法。
3. **薪酬包（外部估算）**：典型 4 年 2 亿美元，称是同行的 100 倍；区间 2 亿—3 亿美元/4 年。
4. **税负与 token（外部估算）**：2026 年税单可能比预期低 50% 以上；Behemoth 训练 token 为 Llama 3 405B（15T）的 3—4 倍。

判断：第 1、2 项是这份材料最值钱的两张表，但都出自自建模型，只能当量级与结构参考；第 4 项只给结果，无换算桥，不能入格。

### 依据

- p.3｜<td>AI Clusters</td><td>Anthropic - Project Rainier</td><td>OpenAI - Stargate</td><td>Meta - Prometheus</td>
- p.3｜<td>Total TFLOPS</td><td>1,040,000,000</td><td>2,469,594,595</td><td>3,171,044,226</td>
- p.5｜<td>OpenAI</td><td>ChatGPT</td><td>160</td><td>1,200</td><td>7.5</td><td>49%</td><td>71%</td>
- p.5｜<td>Meta</td><td>MetaAI</td><td>100</td><td>200</td><td>2.0</td><td>31%</td><td>12%</td>
- p.25｜Based on our estimate of Meta CapEx in 2026 and the expected mix of 100% bonus depreciation eligible purchases within CapEx, Meta’s tax bill in 2026 could be >50% less than expected.

## Q2 · 他的**物理量**从哪来、能不能核？

四项物理量，全部无法回溯到一手文件：

1. **Prometheus 1,020MW（IT 功率，2026 年底）**：来自表格，来源行写的是「SemiAnalysis Datacenter Model」与「Accelerator Model」，即自家模型；无环评、无并网、无施工许可，记不可回溯。
2. **50 万颗 GB200/300**：同上，芯片数由模型推算，未给机柜数与单柜功率的中间步骤，无法核。
3. **两座 200MW 现场天然气电厂**：给了第一座设备清单（3 台 Titan 250、9 台 PGM 130、3 台 SGT400、15 台 CAT 3520），型号可回溯到供应商产品页，但台数—功率对应关系未给，装机总量仍无法核。
4. **Hyperion 一期 1.5GW（IT 功率）**：来源是「消息人士告诉我们」，无证照类中间证据。

另有可回溯项：Llama 3 405B 的 15T token、20 亿 DAU 属公司公开口径。

判断：凡带 MW、颗数的都要按「自建模型输出」处理，只能当旁证；设备清单是唯一能往外核的抓手。

### 依据

- p.3｜Source: SemiAnalysis Datacenter Model, SemiAnalysis Accelerator Model
- p.8｜The Prometheus 1GW AI Training Cluster – An “All Of The Above” Infrastructure Strategy
- p.11｜With help from Williams, they’re building two 200MW on-site natural gas plants. The equipment breakdown for the first includes:
- p.13｜with over 1.5GW of IT power in phase 1

## Q3 · 这份材料是**四种交付物里的哪一种**？同源的另一份是哪一份？

本份是 **`original`（纯原文）**：全篇英文，无双语并列、无译文段、无 KEY POINTS 条目化压缩，正文是连续论述＋两张表，页首只有标题、副题（五个主题词）与作者署名行。

同源组：《Meta Superintelligence》（SemiAnalysis，2025-07-11）的四种交付物——
`0000-00-00-metasuperintelligenceorigi`（本份，纯原文）、`0000-00-00-metasuperintelligencebilin`（双语）、`0000-00-00-metasuperintelligencesumma`（要点摘要）、`0000-00-00-metasuperintelligencetrans`（纯译文）。**四份共用一个来源，不得计成四个独立源**。

口径提醒：另三份把两张表落成了图（只留 Source 行），本份是唯一保留表格数值的，故涉及「1,020MW / 50 万颗 / TFLOPS」的引用应以本份为准；若译本数字与之不一致，以本份英文原文为准并注明。

### 依据

- p.1｜Meta Superintelligence - Leadership Compute, Talent, and Data
- p.1｜DYLAN PATEL, JEREMIE ELIAHOU ONTIVEROS, WEI ZHOU, AND 2 OTHERS JUL 11, 2025 ∙ PAID
- p.3｜Largest AI Training Clusters By End of 2026

## Q4 · 他的**假设与算式**能不能复算？

挑最关键的一列：Meta Prometheus 的总算力。把表内两行相除——3,171,044,226 TFLOPS ÷ 500,000 颗 = 每颗约 6,342 TFLOPS。用同表 OpenAI 列交叉验：2,469,594,595 ÷ 400,000 = 每颗约 6,174 TFLOPS。两列芯片同为 GB200/300，单片值只差 2.7%，说明这张表内部自洽，**复算通过**。

但「缺一步」必须写明：文中从未给出单片 FLOPS 的精度口径（FP16 稠密、FP8，还是含稀疏），也没说明 GB200 与 GB300 的混合比例，所以 6,342 这个反推值只能用于验算自洽性，不能拿去与厂商峰值算力直接比。

第二处可验：Anthropic 列 1,040,000,000 ÷ 800,000 = 每颗 1,300 TFLOPS（Trainium 2），与另两列差一个量级，方向合理。

不可复算的是结论型数字：税单「低 50% 以上」、回本周期「缩短 1—2 年」，输入均未给数。

### 依据

- p.3｜<td># of Chips</td><td>800,000</td><td>400,000</td><td>500,000</td>
- p.3｜<td>Total TFLOPS</td><td>1,040,000,000</td><td>2,469,594,595</td><td>3,171,044,226</td>
- p.3｜<td>Chip types</td><td>Trainium 2</td><td>GB200/300</td><td>GB200/300</td>

## Q5 · 关键数字的**脚注指向哪**？

本份无编号脚注，全靠图表下的 Source 行。逐个看：

- 集群对比表 → 「Source: SemiAnalysis Datacenter Model, SemiAnalysis Accelerator Model」，即自建模型，**Ⅱ 档且不可复核**；
- 聊天应用统计表 → 无 Source 行，正文只说「借助我们自有的 Accelerator Industry Model 与 Datacenter Industry Model」，同样 **Ⅱ 档**；
- 薪酬数字（2 亿美元/4 年、10 亿美元报价、2 亿—3 亿美元区间）→ 无脚注，行文用「The typical offer」「have been some」，属消息人士口径，**Ⅱ 档**；
- 政策类 → 文中给了法案编号 H.R.1（第 119 届国会）与签署日，可回溯到法条，是本份唯一能往 Ⅰ 档靠的引用，但没给条款号；
- 公司口径数（2024 年 capex 372.56 亿美元、服务器与网络占比 58%）→ 表名「Meta Capex Composition」无 Source 行，须回 10-K 才能升档。

判断：可入 Ⅰ 档的只有法条那一条，其余一律 Ⅱ。

### 依据

- p.3｜Source: SemiAnalysis Datacenter Model, SemiAnalysis Accelerator Model
- p.25｜The One Big Beautiful Bill (OBBB) Act (H.R.1, 119th Congress), signed into law by the Trump administration on July 4, 2025
- p.25｜<table><tr><td colspan="4">Meta Capex Composition</td></tr>

## Q6 · 他的**自建口径 / 评级**定义是什么？与公司口径差多少？

本份自建两套口径，都没给完整定义：

1. **「IT Power at YE2026」**：只写年末 IT 功率，未说明是否含制冷与配电损耗、是铭牌容量还是可用容量、是否含在建未投运机柜。与公司口径不可直接比——Meta 从不披露 MW 数，只给资本开支与定性表述，因此这张表无法与任何公开数对照，只能表内横比。
2. **「Total TFLOPS」**：未标精度与稀疏性，也没写按峰值还是按有效利用率折算。同一芯片在 FP16 稠密与 FP8 稀疏下可差数倍，因此该列只可用于同表内排序，**不得**与厂商公布的单卡峰值相乘或相除。

另有一处人均口径：用「GPU-poor 到 GPU-filthy-rich，按人均研究员」描述，缺研究员人数，无换算。

判断：两套口径都属「未给定义」，按规范该口径不得用；若必须引用，只能引方向（Meta 单集群规模在 Stargate 之上），不能引绝对值。

### 依据

- p.3｜<td>IT Power at YE2026</td><td>780 MW</td><td>880 MW</td><td>1,020 MW</td>
- p.3｜<td>Chip types</td><td>Trainium 2</td><td>GB200/300</td><td>GB200/300</td>
- p.3｜The company is going from GPU-poor to GPU-filthy-rich on a per researcher basis.

## Q7 · 他**有没有投行关系 / 持仓**？

三项分开：**收费顾问——未声明；投行关系——未声明；持仓或受资助——未声明**，按「关系不明」处理，不得假定独立。

查了哪里：通篇读过——开篇是标题、五个主题词、五位作者与「PAID」标记（付费墙），其后直入正文分节，最后一节是「买得越多省得越多：OBBB 版」及税制条目，中间与文末都没有 Disclaimer、Disclosure、作者简介、利益冲突或持仓段落；正文也没有「我们持有」「我们为某公司提供顾问服务」的表述。

为何相近的句子不算本项：「PAID」只说明内容在付费墙内，既不能证明有投行关系，也不能证明没有；「SemiAnalysis Datacenter Model / Accelerator Model」说明的是研究方法，与顾问费、持仓无关。

判断：使用其资本开支与集群规模结论时，须另行核验利益关系。

### 依据

- p.1｜DYLAN PATEL, JEREMIE ELIAHOU ONTIVEROS, WEI ZHOU, AND 2 OTHERS JUL 11, 2025 ∙ PAID
- p.24｜The More You Buy The More You Save: OBBB Edition

## Q8 · 他的**行业级判断**（产能 · 份额）有数据支撑吗？

有三条，前两条有表、第三条只有观点：

1. **产能（有表）**：口径是「2026 年底 IT 功率」，三家 780/880/1,020MW，Meta 居首。这是读数，但来源是自建模型，属模型输出而非统计口径；样本只有三家（微软、谷歌、xAI 未列），故不能推出「全球份额」。
2. **芯片数（有表）**：80 万/40 万/50 万颗，Meta 居第二，与 MW 排序不一致——正好说明「功率第一、芯片数第二」，两者不能互相替代。
3. **预租份额（无表）**：称 2024 年下半年预租产能「超过任何一家超大规模云厂商」，无 MW、无对比样本，属观点；「2027 年底全球最大单一园区」同理。

判断：可用的只有前两项的相对排序，且必须带口径（年末 IT 功率、仅三家）；凡「最大/超过所有」的表述都要标为作者断言。

### 依据

- p.3｜<td>IT Power at YE2026</td><td>780 MW</td><td>880 MW</td><td>1,020 MW</td>
- p.3｜<td># of Chips</td><td>800,000</td><td>400,000</td><td>500,000</td>
- p.10｜In fact they pre-leased more capacity second half of 2024 than any hyperscaler, mostly in Ohio.
- p.13｜The Louisiana cluster is set to be the world’s largest individual campus by the end of 2027, with over 1.5GW of IT power in phase 1.
