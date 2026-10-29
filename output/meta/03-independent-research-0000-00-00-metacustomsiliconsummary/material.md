---
id: 03-independent-research-0000-00-00-metacustomsiliconsummary
cat: "03"
sub: independent-research
template: independent-research
template_version: 2
date: 0000-00-00
time: "00:00"
title: "SemiAnalysis：Meta 定制芯片八条要点摘要（MSVP 与 MTIA，2023-05-19）"
kind: "independent-research"
issuer: "SemiAnalysis / Dylan Patel、Gerald Wong"
ticker: META
source_pages: 2
---

## Q1 · 他给的公司**未披露口径**的外部估算是什么？

本件是摘要，只保留了一条外部估算：Meta 是今年英伟达 H100 的最大单一买家，理由是训练与推理都需要，且在多数场景下 H100 仍是性价比最高的选择。这条没有台数、没有金额、没有按金额还是按台数排的口径，也没给数据来源（原版称"我们的数据"），只能当量级，不能入格。

其余七条要点全是参数或路线图，不是估算：MSVP 在约 10W 的模块上做 4K/60fps、H.264 9 倍与 VP9 50 倍；MTIA 第一代 102.4 TOPS INT8、51.2 TFLOPS FP16、25W TDP、128MB/800GB/s 片上 SRAM、最多 128GB 降频 LPDDR5-5500；第二代 Artemis 用台积电 5nm、今年回片；第三代伙伴未定（Marvell 在争，标为传闻）；部分模型 57% 时间耗在网络。这些都是公司口径或路线图判断。

要注意摘要做了一次减法：原版里"谷歌 Argos 等效 1,000 万颗英特尔 CPU、省数十亿美元"那条估算被删了。所以本件的外部估算比原版少一条，做数时不能只读摘要。

### 依据

- p.2｜8 Meta&#x27;s Nvidia H100 purchases this year make it the single largest individual buyer, needed for both training and inference since H10o remains the most cost-effective option in most cases despite Meta&#x27;s own silicon program.
- p.1｜2 MSVP delivers 4K/60fps transcoding at \~10W per PCIe module, with a 9x performance boost over the prior approach for H.264 and 50x for VP9;

## Q2 · 他的**物理量**从哪来、能不能核？

本件给的物理量都是单芯片参数，来源是 Meta 的发布材料，属可回溯但非独立测量：MSVP 在约 10W 的 PCIe 模块上做 4K/60fps 转码；MTIA 第一代 102.4 TOPS INT8、51.2 TFLOPS FP16、25W TDP、128MB 片上 SRAM（800GB/s）、最多 128GB 被降频使用的 LPDDR5-5500。

摘要没有给系统级物理量：没有每主机颗数（原版是 12 颗）、没有整机功耗（原版 780W）、没有裸片面积、没有晶圆投片或部署量，也没有任何产能数字。

因此本件只能用于单芯片规格对比，不能用于规模推算。引这些数必须标"公司自报"，因为它既不是第三方实测，也没有测试条件（分辨率档位、画质设定、batch）。按手册，这属可回溯但只是公司口径，能当Ⅰ档里最弱的一级，不能当独立测量。

### 依据

- p.1｜3 First-generation MTIA, fabricated on TSMC 7nm and packaged by Amkor, is inference-only despite its "Training and Inference" name — it offers 102.4 TOPS INT8 / 51.2 TFLOPS FP16 at 25W TDP, with 128MB of 800GB/s on-chip SRAM and up to 128GB of downclocked LPDDR5-5500.

## Q3 · 这份材料是**四种交付物里的哪一种**？同源的另一份是哪一份？

本份是 summary（要点摘要）。判据：只有 2 页，正文被压成 8 条编号要点，页末标"KEY POINTS / 要点"；每条先英文一句再中文一句，属摘译对齐而非全文对照；没有章节结构、没有算法术语与架构图，开篇只有一句总括加八条事实。

同源组：`03-independent-research-0000-00-00-metacustomsiliconbilingual`。两份共用 SemiAnalysis 2023-05-19 的同一篇原文，共用一个来源，不得计成两个独立源。

取舍是"结论优先"：留下联合设计、规格、路线图、网络瓶颈与 H100 采购，删掉 MSVP 的算法分层（块级／帧级／GOP 级）、MTIA 的 8×8 处理单元与 RISC-V 授权细节，以及谷歌 Argos 的等效算力估算。数字与双语版一致，未见换算差异。

### 依据

- p.1｜KEY POINTS / 要点
- p.1｜Meta is running Google's old playbook on custom silicon — quietly co-designing chips with Broadcom while only disclosing older generations, and its first-gen MTIA inference chip already can't handle today's model sizes.

## Q4 · 他的**假设与算式**能不能复算？

摘要里没有算式，只有结果。唯一能派生的是每瓦算力：102.4 TOPS INT8 ÷ 25W ≈ 4.1 TOPS/W。但摘要没把 MTIA 与任何对照硬件放进同一功耗口径，所以用它去比英伟达是越界的。

第 4 条结论"在与当前一代英伟达 GPU 的每瓦性能对比中，它在大多数负载上都会落败"缺三样：对照 GPU 型号、测试负载、功耗口径（是否含 DRAM）。原版对这三样给了部分答案——对照是旧 Ampere、负载是 Meta 的 DLRM 模型集——摘要全删了，因此本件无法复算，也无法判断这个"落败"是与旧卡还是新卡比。

同类问题在第 2 条：4K/60fps 与 10W 同时给出，但没说是标准画质还是最高画质（原版两种档位 fps 差四倍）。所以本件属"只给结果"：方向可用，数值不可复算。

### 依据

- p.1｜3 First-generation MTIA, fabricated on TSMC 7nm and packaged by Amkor, is inference-only despite its "Training and Inference" name — it offers 102.4 TOPS INT8 / 51.2 TFLOPS FP16 at 25W TDP, with 128MB of 800GB/s on-chip SRAM and up to 128GB of downclocked LPDDR5-5500.
- p.2｜4 First-gen MTlA (codenamed Freya) is already struggling: limited memory capacity, memory bandwidth and chip-to-chip IO mean it only works for small, low-complexity DLRM models, and once benchmarked against current- generation Nvidia GPUs on performance per watt, it loses in most workloads - leaving Meta still reliant on Nvidia GPUs for this generation.

## Q5 · 关键数字的**脚注指向哪**？

无脚注。摘要版把原版的链接与图注一并丢掉，只剩页首一行原文地址，等于"整份的证据链寄存在另一份载体上"。

逐条看：第 1、4、5、7、8 条（联合设计、Freya 局限、Artemis 5nm、57% 网络时间、H100 最大买家）在原版里分别指向 Meta 幻灯片、拆机标记与"我们的数据"，本件一律无标注，按无脚注处理，全部记Ⅱ。第 2、3 条（MSVP 4K/10W、MTIA 规格）来自 Meta 发布材料，属公司口径，可算Ⅰ档，但本件未给文件名。

唯一自曝不确定性的是第 6 条：第三代设计伙伴未定、Marvell 在争，明写"仅视为传闻"。这种自我限定提高了它作为Ⅱ档线索的可用性——至少读者知道哪句不能当事实。

### 依据

- p.1｜SemiAnalysis · 2023-05-19 · https://semianalysis.com/2023/05/19/meta-custom-silicon-whats-old-is/
- p.2｜6 The 3rd-generation MTIA&#x27;s design partner is unconfirmed; SemiAnalysis has heard Marvell is competing for the slot, but treats this as rumor only.

## Q6 · 他的**自建口径 / 评级**定义是什么？与公司口径差多少？

摘要没有评级、没有打分表，也没有给任何指标下定义。唯一像口径的是"每瓦性能"：第 4 条用它判 MTIA 输给英伟达，但没定义测峰值还是均值、含不含 DRAM 功耗、用哪几个模型。原版交代了负载是 Meta 的 DLRM 模型集、对照是旧 Ampere，摘要全删，所以这个词在本件里不可引用。

第二处是"自研"与"联合设计"的区分：本件明说 MSVP 虽被称作自研，但已公开的第一代与下一代都与博通联合设计，并以谷歌 Argos 前两代同为博通设计作类比。这是定性纠偏，不是新口径；与公司口径的差异方向是削弱 Meta 的自研叙事，幅度（博通承担多少工作量）未给。

第三处是规格的测试条件缺失：4K/60fps 与约 10W 并列给出，却没说画质档位——原版最高画质只有 15fps。引用这两个数必须自己补档位，否则会把不同工况拼在一起。

### 依据

- p.1｜Despite Meta's claim that MSVP is developed inhouse, both the disclosed 1st-gen video encoding ASIC and the upcoming next-gen version are co-designed with Broadcom — mirroring Google's own Argos video ASICs, whose first two generations were also Broadcom-designed.
- p.1｜2 MSVP delivers 4K/60fps transcoding at \~10W per PCIe module, with a 9x performance boost over the prior approach for H.264 and 50x for VP9;

## Q7 · 他**有没有投行关系 / 持仓**？

三项：收费顾问＝未声明；投行关系＝未声明；持仓或受资助＝未声明。

2 页里没有任何免责声明段。页首只有三行：标题、发布机构与日期、原文链接；正文是 8 条要点；页末是"KEY POINTS / 要点"标记，之后直接结束。没有 Disclosure、没有作者持仓、没有客户名单，也没有"我们与某公司有业务往来"之类的话。

本件对 Meta 的判断偏负面（"复制谷歌的老套路""第一代已经跟不上模型规模""仍要依赖英伟达 GPU"），但负面不等于无关系；摘要本身也不含任何"持有/不持有"的表述。按手册按"关系不明"处理，不得假定独立。

另一个可用线索是它对未证实信息的标注习惯——第 6 条主动把 Marvell 的竞争标为传闻。这提高可信度，但不能替代关系披露。

### 依据

- p.1｜Meta Custom Silicon: What's Old Is New
- p.2｜7 real bottleneck: some Meta models spend as much as 57% of their time on networking

## Q8 · 他的**行业级判断**（产能 · 份额）有数据支撑吗？

摘要里没有产能、份额、供需缺口的读数。

唯一带行业含义的量化断言是第 7 条：部分 Meta 模型多达 57% 的时间耗在网络通信上，据此推出"网络而非算力才是真瓶颈"，并称博通与 Marvell 之争取决于谁能联合设计定制光网络。57% 是 Meta 自家模型的画像，不是行业统计，样本与模型清单都没给。

第二处是第 8 条：Meta 是今年 H100 最大单一买家——这是买方份额型断言，但没有台数、金额与统计口径，也没有对照买家，只能当量级。

第三处是第 5 条 Artemis 转 5nm、"今年回片"——路线图不是产能。第 4 条"多数负载每瓦性能落败"是产品对比，不是市场份额。所以本件在产能与份额上属观点多于读数：可用于判断方向，不能引用任何份额或产能数字。

### 依据

- p.2｜5 MTIA gen 2, codenamed Artemis,moves to TSMC 5nm, is expected back from the fab this year, and can actually train models with higher memory bandwidth and chip-to-chip IO - though Meta will keep relying on GPUs for training for years regardless. It is also co- designed with Broadcom.
- p.2｜8 Meta&#x27;s Nvidia H100 purchases this year make it the single largest individual buyer
