---
id: 03-independent-research-0000-00-00-metacustomsiliconbilingual
cat: "03"
sub: independent-research
template: independent-research
template_version: 2
date: 0000-00-00
time: "00:00"
title: "SemiAnalysis：Meta 定制芯片——旧瓶新酒（MSVP 与 MTIA 路线图、联合设计伙伴，2023-05-19 中英对照）"
kind: "independent-research"
issuer: "SemiAnalysis / Dylan Patel、Gerald Wong"
ticker: META
source_pages: 10
---

## Q1 · 他给的公司**未披露口径**的外部估算是什么？

本件主体是 Meta 的自研与半定制芯片，外部估算有三处，都落在"别人家芯片值多少钱"。

一、谷歌 Argos 视频编码芯片的等价算力：大规模部署的 Argos VPU 做到超过 1,000 万颗英特尔 CPU 的 VP9 编码工作量，为谷歌省下数十亿美元成本。代理变量是"等效 CPU 颗数"，没有期间、没有换算方法与样本，只能说明这类 ASIC 的量级，不能入格。

二、Meta 的 H100 采购地位："我们的数据显示 Meta 是今年英伟达 H100 的最大单一买家"。这是供应链访谈型估算，没有台数、没有金额、没有按金额还是按台数排的口径，也没有对照组，只能当量级。

三、路线图判断：第二代 MTIA 代号 Artemis、台积电 5nm、今年流片回厂；第三代设计伙伴未定，听说 Marvell 在争，作者自己标为传闻。这是时间表不是数量估算。

不算外部估算的：MSVP 的 4K/60fps、约 10W、H.264 9 倍与 VP9 50 倍提升，MTIA 的 102.4 TOPS INT8、25W TDP，以及"Meta 只公开了第一代"这类判断，来源都是 Meta 的发布材料或他们看到的裸片标记，属公司口径。

### 依据

- p.2｜The Google Argos VPUs deployed at scale do the work of over 10 million Intel CPUs for VP9 encoding, saving Google billions in cost.
- p.5｜Our data shows Meta is the largest individual buyer of Nvidia’s H100 GPUs this year.
- p.7｜MTIA gen 2 is a much larger chip. It is on TSMC’s 5nm and codenamed Artemis.

## Q2 · 他的**物理量**从哪来、能不能核？

本件是少数能把物理量追到芯片标记上的材料。

可回溯：MSVP 采用 M.2 22110 规格、4 条 PCIe Gen 4（8GB/s）、板载 2×4GB 美光 LPDDR5 共 8GB 与 88GB/s 带宽、封装约 24mm×19mm、裸片约 112mm²、模块功耗约 10W；MTIA 第一代 102.4 TOPS INT8、51.2 TFLOPS FP16、25W TDP、128MB SRAM（800GB/s）、最多 128GB 降频 LPDDR5-5500（256 位、176GB/s）、8 条 PCIe 4.0。来源是 Meta 视频里展示的板卡与裸片标记：MSVP 裸片可见博通料号，MTIA 标记显示台积电 7nm 制造、安靠封装、2021 年 8 月 23 日至 29 日生产——标记可复现，属可回溯。

系统级：每台主机 12 颗 MTIA、整机 780W，挂在 Delta Lake 服务器上，配英特尔 Copper Lake CPU、96GB DDR4、80 通道博通 PCIe4 交换机。

无法核：产能与出货量。全文没有晶圆投片数、没有流片批量、没有部署台数，只有"2021 年就拿到了芯片"。所以这套物理量能做单芯片对比，不能做规模测算。

### 依据

- p.3｜The chip comes in a M.2 22110 format supporting 4 lanes of PCIe Gen 4, so 8GB/s.
- p.5｜Meta got the chips in the video back in 2021. The MTIA is fabricated on TSMC’s 7nm fabs and packaged by Amkor.
- p.6｜The chip has 102.4 TOPS of INT8 and 51.2 TFLOPS of FP16 with a 25W TDP.
- p.7｜There are 12x MTIA per host, and the entire system consumes 780W.

## Q3 · 这份材料是**四种交付物里的哪一种**？同源的另一份是哪一份？

本份是 bilingual（双语句对齐）。判据：页首英文标题下并列中文标题，作者与日期各一行（英文版一行、中文版一行）；正文逐段英中交替，图片说明也是"英文图注＋中文图注"两行；文末标"中英对照 / BILINGUAL"并附原文链接；没有要点压缩。

同源组：`03-independent-research-0000-00-00-metacustomsiliconsummary`。同源对照表"Meta 定制芯片（2023-05-19）"一行只有这两个 id，两份共用一个来源，不得计成两个独立源。

差异：本份保留全部技术细节（MSVP 的块级/帧级/GOP 级算法分层、MTIA 的 8×8 处理单元网格、RISC-V 授权来源、机箱与交换机形态），摘要版压成 8 条要点，丢掉的是机箱封装级参数与谷歌 Argos 的等效算力估算；两版数字一致，未见换算差异。

### 依据

- p.1｜中英对照 / BILINGUAL
- p.1｜Meta 定制芯片：旧瓶新酒
- p.1｜DYLAN PATEL AND GERALD WONG · MAY 19, 2023

## Q4 · 他的**假设与算式**能不能复算？

本件最关键的结论是"Meta 说 MSVP 自研，其实已公开的那颗和下一代都是与博通联合设计"。这条不是算出来的，是看出来的：展示的板卡与裸片标记上能看到博通料号。所以严格说不能复算，但物证强度高于一般估算——它的验证方式是拆机看标记，而不是公式。

能算的是性能与功耗的关系：MSVP 在约 10W 的 PCIe 模块上做 4K 60fps（标准画质）或 4K 15fps（最高画质、单进五出），H.264 提升 9 倍、VP9 提升 50 倍。若换算每瓦吞吐，50 倍 ÷ 10W 意味着同量转码功耗降两个量级——但对照方案的功耗没给，只能信 Meta 口径，不能验。

另一处可算的是每瓦算力：102.4 TOPS INT8 ÷ 25W ≈ 4.1 TOPS/W。作者用它对比旧 Ampere GPU，结论是叠上 Hopper 之后第一代 MTIA 在多数负载的每瓦性能上会输——方向可算、幅度不可算，因为对照 GPU 型号是他"多方打听"来的，Meta 未公布。

### 依据

- p.2｜Meta claims this chip was developed in-house, but that is not true. Both the announced MSVP and the upcoming next-generation version are codesigned with Broadcom.
- p.3｜There is a 9x performance boost for H.264 and 50x for VP9.

## Q5 · 关键数字的**脚注指向哪**？

无脚注。全文没有脚注编号、没有文末 Source 列表，10 页里唯一的链接是页首的原文地址。

关键数字的指向分三种。一是 Meta 官方材料（规格、幻灯片里的模型特征与每瓦性能柱状图），一手，可为Ⅰ档，但本件没有逐一给文件名或时间戳。二是作者拆机看到的一手物证（裸片上的博通料号、生产日期、2021 年 6 月 21 日至 27 日那批），强度最高，但只有照片，没有可核的记录号。三是"据我们了解/我们听说"（Artemis 今年回片、Marvell 争第三代），属消息源记Ⅱ档，后者作者自己标为传闻。

因此本件没有正式脚注体系，能升Ⅰ档的只有"公司原话加拆机标记"两类；凡以"我们的数据显示"开头而无下文的，一律记Ⅱ。

### 依据

- p.1｜SemiAnalysis · 2023-05-19 · https://semianalysis.com/2023/05/19/meta-custom-silicon-whats-old-is/
- p.3｜The chips shown in Meta’s video were produced from June 21st to June 27th.
- p.7｜The third-generation chip is up in the air, we have heard Marvell is competing, but those are just rumors.

## Q6 · 他的**自建口径 / 评级**定义是什么？与公司口径差多少？

有两把自建尺子，一把是"每瓦性能"对比，一把是"半定制"这个分类。

每瓦性能：把 NNPI、MTIA、GPU 放在同一组 Meta 生产 DLRM 模型（LC1/LC2/MC1/MC2/HC）上跑，取每瓦性能做柱状对比。打分规则没给——没说是峰值还是均值、用哪个 batch、含不含内存功耗。与公司口径的差异作者自己点了一处：Meta 没说对比哪款 GPU，他打听后判断是旧 Ampere 而非 Hopper；换成 Hopper，第一代 MTIA 在多数负载上就输。也就是说公司图表的方向被硬件代际选择放大了，差异方向对 Meta 有利。

半定制：指架构由 Meta 定义、后端由博通执行（与谷歌 TPU 同构）。在公司口径里"自研（in-house）"与"联合设计"是两件事，作者据此判定 Meta 的"自研"表述不实。这个区分可以用来审其他公司的"自研"说法，但本件没给博通承担的工作量比例，差异幅度不可量化。

### 依据

- p.7｜Much like Google’s TPUs, these chips are co-designed with Broadcom doing the backend.
- p.5｜While Meta did not share which GPU they were comparing to, we asked around, and it seems to be old Ampere GPUs, not new Hopper and Lovelace GPUs.

## Q7 · 他**有没有投行关系 / 持仓**？

三项：收费顾问＝未声明；投行关系＝未声明；持仓或受资助＝未声明。

10 页里没有免责声明、没有作者持仓披露、没有"与某公司有业务往来"的说明。页首只有标题、作者、日期与原文链接，正文直接进入技术拆解，最后一页是 MSVP 的算法术语（智能量化、RDX 等），之后没有任何文末声明段。

要注意本件对 Meta 的批评相当直接——"Meta 声称这颗芯片是自研的，但事实并非如此"、"Meta 仍被困在英伟达 GPU 的枷锁里"——但批评不能当作"无利益关系"的证据；作者也承认第三代设计伙伴"只是传闻"。按手册按"关系不明"处理，不得假定独立。

可用的替代信息：页首的原文链接指向 semianalysis.com 的公开文章页，说明本份是公开长文的双语版；载体形态与关系披露是两件事，不能互相替代。

### 依据

- p.1｜This report will cover the old chips that Meta has had since 2021 as well as the new chips Meta has in development currently.
- p.10｜MSVP 与 RDX：RDX 是一种根据给定信道条件（码率）和客户端视口来确定最佳分辨率与 QP 的方法。MSVP 出色的每瓦性能大幅降低了 RDX 所需的计算量。

## Q8 · 他的**行业级判断**（产能 · 份额）有数据支撑吗？

判断主要落在"网络而非算力是瓶颈"与"联合设计伙伴之争"。

有数的：Meta 有些模型多达 57% 的时间耗在网络通信上，这是唯一支撑"网络是瓶颈"的量化证据，来自 Meta 自己的幻灯片，可回溯但不是行业统计。另有"Meta 是今年 H100 最大单一买家"，无台数无金额。

无数但被当判断用的：视频编码 ASIC 决定直播体验（以 Twitch 与 YouTube 之差为例）、博通与 Marvell 之争实为"谁能联合设计定制光网络"之争、英伟达在网络领域同样是领导者。三条都没有份额、没有产能、没有订单金额，属观点。

份额方面唯一接近读数的是产品对比：第一代 MTIA 在多数负载的每瓦性能上会输给当代英伟达 GPU——那是产品比较，不是市占率。所以本件在产能与份额上没有可引用的行业读数，只有一条 57% 的时间占比能做机制证据。

### 依据

- p.7｜Meta has models that spend as much as 57% of their time running in networking as such, this is their overarching goal.
- p.8｜They have other optics people too, and it seems plain as day to us that the decision between Broadcom and Marvell likely comes down to who can co-design the custom optical network.
