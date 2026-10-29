Meta Custom Silicon: What's Old Is New
Meta Custom Silicon: What’s Old Is New
Meta 定制芯片：旧瓶新酒
Semi-Custom Silicon For AI and Video, Roadmap, Co-Design Partners
DYLAN PATEL AND GERALD WONG · MAY 19, 2023
面向 AI 与视频的半定制芯片：路线图与联合设计伙伴
Dylan Patel、Gerald Wong · 2023 年 5 月 19 日
Meta just made a whole host of announcements related to their internal AI infrastructure and silicon. Some of the topics included moving to datacenters with more liquid cooling, higher power, and facility level changes. On the silicon side, funnily enough, Meta is taking the exact same strategy as Google.
Meta 刚刚发布了一大批与内部 AI 基础设施和芯片相关的公告。其中一些议题涉及转向液冷程度更高、功率更大的数据中心，以及设施层面的变化。而在芯片方面，颇为有趣的是，Meta 采取的策略与谷歌如出一辙。
Meta is only talking about the old chips they already have, just as the new stuff is nearly ready. For example, they released an entire blog on a research cluster they built last year with 16,000 Nvidia A100’s, only once they had already started building the much larger clusters with H100. That H100 cluster, as we reported in the past, has a very bizarre infrastructure setup.
Meta 只谈论他们手头已有的旧芯片，而新东西恰好快要就绪。例如，他们发布了一整篇关于去年建造的、拥有 16000 块英伟达 A100 的研究集群的博客，而彼时他们其实已经开始建造规模大得多的 H100 集群。正如我们此前报道过的，那个 H100 集群的基础设施配置非常古怪。
This report will cover the old chips that Meta has had since 2021 as well as the new chips Meta has in development currently. We will discuss architecture, roadmap, various design partners, and future ambitions.
本报告将介绍 Meta 自 2021 年以来使用的旧芯片，以及目前在研的新芯片。我们将讨论架构、路线图、各类设计伙伴，以及未来的野心。
中英对照 / BILINGUAL
SemiAnalysis · 2023-05-19 · https://semianalysis.com/2023/05/19/meta-custom-silicon-whats-old-is/

Meta Scalable Video Processor (MSVP)Meta 可扩展视频处理器（MSVP）
[Figure: A high-level overview of MSVP, showing the LPDDR5, Transcoder IP, PCIe/SerDes, Control IP, and Fabric interconnecting the chip’s blocks]
[图：MSVP 架构概览图，展示了 LPDDR5、转码器（Transcoder）IP、PCIe/SerDes、控制 IP 与 Fabric 互连各功能模块]
Meta is showing off their video encoding ASIC which they have been deploying since 2021. The video encoding ASIC is an incredibly important piece of infrastructure for companies. For example, it is the primary reason Amazon has to offer significantly worse live streaming services with Twitch versus Google’s YouTube.
Meta 正在展示自 2021 年以来一直在部署的视频编码 ASIC。对企业而言，视频编码 ASIC 是极其重要的一环基础设施。例如，这正是亚马逊旗下 Twitch 的直播服务体验明显不如谷歌 YouTube 的主要原因。
Google was the first to design a video encoding chip, codenamed Argos, which we covered years ago. The Google Argos VPUs deployed at scale do the work of over 10 million Intel CPUs for VP9 encoding, saving Google billions in cost. We have also covered NetInt’s VCU, a startup with a similar video encoding ASIC which is being sold to companies such as ByteDance, Baidu, Tencent, and Alibaba.
谷歌是第一家设计视频编码芯片的公司，代号 Argos，我们多年前就曾报道过。大规模部署的谷歌 Argos VPU在 VP9 编码上做到了超过 1000 万颗英特尔 CPU 的工作量，为谷歌节省了数十亿美元成本。我们也报道过NetInt 的 VCU— 一家做类似视频编码 ASIC 的初创公司，产品销往字节跳动、百度、腾讯和阿里巴巴等企业。
Meta has tremendous amounts of videos uploaded to Instagram and Facebook, so this product is critical to reducing costs. Furthermore, the 2nd generation of Meta’s Scalable Video Processor is what enables them to deploy AV1 in reels so pervasively. Note Meta only disclosed the 1st generation today.
Instagram 和 Facebook 上传的视频量极其庞大，因此这款产品对降低成本至关重要。此外，正是第二代Meta 可扩展视频处理器让他们得以在 Reels 中如此大规模地部署 AV1。需要注意的是，Meta 今天只公开了第一代产品。
[Figure: Meta slide “Current Delivery Status” showing AV1 codec support and adoption across iOS and Android]
[图：Meta 幻灯片《当前交付状态》，展示 AV1 编解码器在 iOS 与 Android 上的支持与采用情况]
Meta claims this chip was developed in-house, but that is not true. Both the announced MSVP and the upcoming next-generation version are codesigned with Broadcom. Google’s 1st two generations of their video encoding ASICs were also co-designed with Broadcom.
Meta 声称这颗芯片是自研的，但事实并非如此。无论是已发布的 MSVP，还是即将推出的下一代版本，都是与博通联合设计的。谷歌前两代视频编码 ASIC 同样是与博通联合设计的。

Each MSVP ASIC chip boasts a maximum transcoding capability of 4K, operating at 15fps under the highest quality setting with a configuration of one input stream to five output streams. It has the ability to scale up to 4K at 60fps under standard quality configuration. Meta claims the performance scales uniformly with the increase in resolution. All of this is accomplished with an approximate power usage of 10W for the PCIe module. There is a 9x performance boost for H.264 and 50x for VP9.
每颗 MSVP ASIC 芯片最高可实现 4K 转码能力，在最高画质设置、单路输入对五路输出的配置下可达
15fps；在标准画质配置下可扩展到 4K 60fps。Meta 声称其性能随分辨率提升呈线性扩展。这一切都是在PCIe 模块约 10W 功耗下实现的。相较此前方案，H.264 性能提升 9 倍，VP9 提升 50 倍。
The chip comes in a M.2 22110 format supporting 4 lanes of PCIe Gen 4, so 8GB/s. There is also 2x 4GB of Micron LPDDR5 in the presented board, for a total of 8GB with 88GB/s of memory bandwidth. The package is about \~24mm by 19mm, and the die size is \~112mm^2.
该芯片采用 M.2 22110 规格，支持 4 条 PCIe Gen 4 通道，即 8GB/s 带宽。展示的板卡上还配有 2×4GB 的美光 LPDDR5，共计 8GB，内存带宽为 88GB/s。封装尺寸约为 24mm×19mm，裸片面积约为 112mm²。
[Figure: Photo of the MSVP ASIC mounted on its M.2 PCIe card]
[图：MSVP ASIC 安装在其 M.2 PCIe 卡上的实物照片]
The chips shown in Meta’s video were produced from June 21st to June 27th.
Meta 视频中展示的芯片生产日期为 6 月 21 日 至 6 月 27 日。
[Figure: Close-up of the MSVP die marking, showing a Broadcom (BCM) part number]
[图：MSVP 裸片标记特写，可见博通（Broadcom，BCM）料号]
Meta Training and Inference Accelerator (MTIA)Meta 训练与推理加速器（MTIA）
AI is the most important and costly workload in Meta’s datacenters. Meta has been developing their AI chips since at least 2019. The first generation was just announced, and while the category of processor is named Meta Training and Inference Accelerator, to be clear, the first generation is only usable for inference.
AI 是 Meta 数据中心中最重要、成本也最高的工作负载。Meta 至少从 2019 年起就已经在研发自 己的 AI 芯片。第一代产品刚刚发布，虽然这类处理器被命名为 Meta 训练与推理加速器，但需要明确的是，第一代产品其实只能用于推理。

Meta’s primary workload is DLRM inference today, and as such, they tried to architect their chip, especially for that workload. As a reminder, DLRM models are still the largest at-scale AI workload. These DLRMs are the backbone of companies like Baidu, Meta, ByteDance, Netflix, and Google. It is the engine of over a trillion dollars of annual revenue in advertising, search ranking, social media feed ordering, etc.
Meta 目前的主要工作负载是 DLRM（深度学习推荐模型）推理，因此他们在架构设计上也着重针对这一负载进行优化。提醒一下，DLRM 模型至今仍是规模最大的 AI 工作负载。这些 DLRM 是百度、Meta、字节跳动、Netflix 和谷歌等公司业务的支柱，支撑着广告、搜索排序、社交媒体信息流排序等领域每年超过一万亿美元的营收。
While generative AI will overtake it in hardware demand soon, that flip over hasn’t happened quite yet.   
Check out our prior dive into DLRMs here.
尽管生成式 AI 在硬件需求上迟早会反超它，但这一反转目前尚未发生。可参阅我们此前对 DLRM 的深度剖析。
DLRM models are continuing to grow, and that is leading to significant infrastructure changes for Meta. For a period of time, they heavily utilized Intel’s NNP-I inference accelerator, but that quickly made way to GPUs. In some ways, the first-generation MTIA can be thought of as a second-generation NNP-I because the system architecture (not uarch) is very similar.
DLRM 模型仍在持续增长，这给 Meta 的基础设施带来了重大变化。有一段时间，他们大量使用英特尔的NNP-I 推理加速器，但很快就被 GPU 取代。从某种意义上说，第一代 MTIA 可以被看作是第二代 NNP-I，因为二者的系统架构（而非微架构）非常相似。
[Figure: Meta slide “Demands of inference models at Meta” — chart showing DLRM model size and complexity (GFLOPS/sample) growing from 2020 to H2 2024]
[图：Meta 幻灯片《Meta 推理模型的需求》——展示 DLRM 模型规模与复杂度（GFLOPS/样本）从 2020 年到 2024 年下半年的增长曲线]
[Figure: Meta slide “Need for custom solutions” — chart showing inference server capacity demand for CPU, NNPI, and GPU over a two-year deployment period]
[图：Meta 幻灯片《对定制方案的需求》—— 展示两年部署周期内 CPU、NNPI 与 GPU 推理服务器容量需求的变化]
Meta launched their semi-custom AI accelerator program many years ago, and their goals were very clear. Lower cost inference for better DLRM models, and ease of use. Their first generation can be thought of as a software vehicle to develop the ability to utilize eager mode and full graph mode of PyTorch 2.0 with LLVM compilers. They are working on implementing Dynamo, Inductor, and Triton.
Meta 多年前就启动了半定制 AI 加速器项目，目标非常明确：为更好的 DLRM 模型实现更低成本的推理，并兼顾易用性。第一代产品可以被视为一个软件载体，用来打磨在 LLVM 编译器下运用 PyTorch 2.0 eager 模式和 full graph 模式的能力。他们正在推进 Dynamo、Inductor 和 Triton 的落地。

[Figure: Meta slide “Providing developer efficiency and high performance” — diagram of the MTIA software stack from the PyTorch application layer down to firmware]
[图：Meta 幻灯片《兼顾开发效率与高性能》——展示 MTIA 软件栈从 PyTorch 应用层到固件层的架构图]
Our data shows Meta is the largest individual buyer of Nvidia’s H100 GPUs this year. That’s no coincidence. Meta needs GPUs for both training and inference and the H100’s is the most cost-effective way for them to serve this need in most cases.
我们的数据显示，Meta 是今年英伟达 H100 GPU 的最大单一买家。这并非巧合。Meta 在训练和推理两方面都需要 GPU，而在大多数情况下，H100 是满足这一需求性价比最高的选择。
Meta shared a profile of their various production recommendation models. These models have varying sizes and complexity. Meta also shared the performance of various hardware in these workloads.
Meta 公布了其各类生产环境推荐模型的画像。这些模型的规模和复杂度各不相同。Meta 还公布了不同硬件在这些负载上的性能表现。
[Figure: Meta slide “Model characteristics” — table of DLRM model size and complexity (LC1/LC2/MC1/MC2/HC) alongside a pie chart of the operator breakdown for the MC2 model]
[图：Meta 幻灯片《模型特征》——展示 LC1/LC2/MC1/MC2/HC 各档 DLRM 模型的规模与复杂度表格，以及 MC2 模型的算子占比饼图]
[Figure: Meta slide “Model performance” — bar chart comparing perf/W of NNPI, MTIA, and GPU across the DLRM model set]
[图：Meta 幻灯片《模型性能》——对比 NNPI、MTIA 与 GPU 在 DLRM 模型集上每瓦性能的柱状图]
While Meta did not share which GPU they were comparing to, we asked around, and it seems to be old Ampere GPUs, not new Hopper and Lovelace GPUs. While this seems unfair, remember Meta’s 1st generation MTIA is also an older chip. Once you stack on the additional performance of the new Nvidia chips, the first-generation MTIA loses in most workloads on performance per watt.
Meta 没有公布对比用的具体是哪款 GPU，我们多方打听后发现，应该是较旧的 Ampere GPU，而不是更新的 Hopper 和 Lovelace GPU。这看似有失公允，但别忘了 Meta 的第一代 MTIA 同样是颗老芯片。一旦叠加上英伟达新芯片带来的额外性能，第一代 MTIA 在大多数负载的每瓦性能上都会落败。
With that said, the first gen MTIA is just a start. Let’s dive into the chip before discussing the next generation, roadmap, and design partners.
话虽如此，第一代 MTIA 只是个开始。在讨论下一代产品、路线图和设计伙伴之前，我们先深入剖析这颗芯片本身。
Meta got the chips in the video back in 2021. The MTIA is fabricated on TSMC’s 7nm fabs and packaged by Amkor. The chip markings state this occurred from August 23rd to August 29th of 2021.
Meta 在 2021 年就拿到了视频中展示的芯片。MTIA 由台积电 7nm 制程代工，安靠（Amkor）封装。芯片标记显示这批产品生产于 2021 年 8 月 23 日 至 29 日。

[Figure: MTIA die photo and a close-up of its package marking]
[图：MTIA 裸片照片及其封装标记特写]
The chip has 102.4 TOPS of INT8 and 51.2 TFLOPS of FP16 with a 25W TDP. There is a total of 128 MB SRAM which runs at 800GB/s. This SRAM sits next to the memory controllers and can act as a memory side cache of directly addressed as addressable memory. There is also up to 128GB of LPDDR5-5500 on a 256-bit bus running at 176GB/s. It’s noteworthy that Meta used LPDDR5 which is capable of 6400 MTs, but run it downclocked. There are also 8 PCIe 4.0 lanes.
这颗芯片提供 102.4 TOPS 的 INT8 算力和 51.2 TFLOPS 的 FP16 算力，TDP 为 25W。片上共有 128MBSRAM，带宽为 800GB/s。这块 SRAM 紧邻内存控制器，既可作为内存旁路缓存使用，也可作为可直接寻址的内存使用。此外还配有最多 128GB 的 LPDDR5-5500，位宽 256 位，带宽 176GB/s。值得注意的是，Meta 用的 LPDDR5 本可跑到 6400 MT/s，但被降频使用。芯片还提供 8 条 PCIe 4.0 通道。
[Figure: MTIA gen-1 chip specification table (TSMC 7nm, die size, TDP, TOPS/TFLOPS, SRAM and DRAM bandwidth) alongside a die photo and a block-level architecture overview]
[图：MTIA 第一代芯片规格表（台积电 7nm、裸片面积、TDP、TOPS/TFLOPS、SRAM 与 DRAM 带宽），并附裸片照片与模块级架构概览图]
The memory and IO sits around the processing elements. These processing elements are an 8 by 8 grid containing a command processor, local memory, and two different RISC-V CPUs from Andes. One core has only scalar capabilities, and the other can do both scalar and vector. These cores are licensed from a thirdparty IP house. That third party does not assist with the backend.
内存和 IO 环绕在处理单元（PE）周围。这些处理单元排布成 8×8 网格，每个单元包含一个命令处理器、本地内存，以及两颗来自 Andes 的不同 RISC-V CPU 核心。其中一个核心只具备标量能力，另一个则同时支持标量和向量运算。这些核心是从第三方 IP 厂商处获得授权的，该第三方并不参与后端设计。
There are also a variety of fixed accelerators to accelerate matrix multiplications, non-linear functions, and data movement.
芯片中还配备了多种固定功能加速器，用于加速矩阵乘法、非线性函数运算和数据搬运。
[Figure: Meta slide “Processing Element (PE)” — block diagram of the MTIA processing element, showing the scalar and vector RISC-V cores, command processor, and fixed-function accelerators]
[图：Meta 幻灯片《处理单元（PE）》——展示标量与向量 RISC-V 核心、命令处理器及固定功能加速器的处理单元架构图]
Physically the chip sits on a PCIe Gen 4x8 dual m.2 card in Delta Lake servers connected to Intel Copper Lake CPUs with 96GB of DDR4 and PCIe 3.0 x24 connection to nested switches (80 lane Broadcom PCIe4 switch).
从物理形态上看，这颗芯片安装在 PCIe Gen 4 x8 双 M.2 卡上，用于 Delta Lake 服务器，通过 PCIe 3.0 x24连接到嵌套交换机（一颗 80 通道的博通 PCIe4 交换机），服务器搭载英特尔 Copper Lake CPU 及 96GBDDR4 内存。

每台主机配备 12 颗 MTIA，整套系统功耗为 780W。
Silicon Co-Design Partners and Roadmap
芯片联合设计伙伴与路线图
Next, we will discuss the roadmap, chip codenames, the future of MTIA, and where it is useful vs not.
接下来，我们将讨论路线图、芯片代号、MTIA 的未来走向，以及它适用与不适用的场景。
In general, MTIA gen 1, codenamed Freya, is better for small and less complex models, and much worse for large models. Given model sizes have continued to soar since Meta made their benchmarks a while ago, it’s very difficult for Meta to use today. Lack of memory capacity, memory bandwidth, and chip-to-chip IO being pitiful makes it tough to use outside of these smaller less complex models. As such, Meta is still tied to the shackles of Nvidia GPUs for this generation,
总体而言，代号 Freya 的 MTIA 第一代更适合中小型、复杂度较低的模型，而在大模型上表现要差得多。由于模型规模自 Meta 做基准测试以来一直在飙升，如今这颗芯片已经很难派上用场。内存容量不足、内存带宽有限，加上芯片间互连 IO 十分寒酸，使得它除了这些中小型、低复杂度模型之外很难有用武之地。因此，就这一代产品而言，Meta 仍然被困在英伟达 GPU 的枷锁之中。
MTIA gen 2 is a much larger chip. It is on TSMC’s 5nm and codenamed Artemis. It is supposed to come back from the fabs this year, from our understanding. It will support higher memory bandwidth and higherspeed chip-to-chip IO. This chip, they actually have plans of deploying and can train models. With that said, Meta will still use GPUs for training for many years to come.
MTIA 第二代是一颗大得多的芯片，采用台积电 5nm 制程，代号 Artemis。据我们了解，它预计将于今年流片回厂。这颗芯片将支持更高的内存带宽和更快的芯片间互连 IO。Meta 确实计划部署这颗芯片，并且它具备训练能力。不过，未来许多年 Meta 在训练方面仍会依赖 GPU。
Much like Google’s TPUs, these chips are co-designed with Broadcom doing the backend.
与谷歌的 TPU 颇为相似，这些芯片也是联合设计的产物，后端由博通负责。
The third-generation chip is up in the air, we have heard Marvell is competing, but those are just rumors. We aren’t sure who the design partner is.
第三代芯片的归属尚无定论，我们听说 Marvell 正在争取这一项目，但这仅仅是传闻，我们并不确定最终的设计伙伴是谁。
Meta has models that spend as much as 57% of their time running in networking as such, this is their overarching goal.
Meta 有些模型多达 57% 的时间都耗费在网络通信上，因此这也是他们最优先要解决的核心问题。
There are 12x MTIA per host, and the entire system consumes 780W.

[Figure: Meta slide “Industry Trend” — chart showing FLOPS scaling far outpacing memory and interconnect bandwidth scaling, alongside a bar chart of time spent in networking (up to 57.24%) across model generations M1–M4]
[图：Meta 幻灯片《行业趋势》——展示算力（FLOPS）扩展速度远超内存与互连带宽扩展速度的曲线图，以及 M1 至 M4 各代模型网络通信耗时占比（最高达 57.24%）的柱状图]
Meta’s Alexis Bjorlin is the VP of Infrastructure, and she is an optics person.
Meta 的 Alexis Bjorlin 是基础设施副总裁，她本人是做光学出身的。
They have other optics people too, and it seems plain as day to us that the decision between Broadcom and Marvell likely comes down to who can co-design the custom optical network.
Meta 还有其他光学背景的人才，在我们看来，选择博通还是 Marvell 的决定，很可能取决于谁能联合设计出这套定制光网络。
Nvidia of course is also a leader in networking and so this will be an interesting race.
当然，英伟达在网络领域同样是领导者，所以这将是一场有意思的竞争。
Also, here are some of the more technical details of Meta’s video encoding ASIC release are summarized here. We recommend reading it for a primer on how video encoding at scale works.
此外，以下总结了 Meta 视频编码 ASIC 发布中一些更为技术性的细节。我们建议阅读这部分内容，作为了解大规模视频编码工作原理的入门。

These encoders use intra-coding to decrease spatial redundancy and inter-coding to eliminate temporal redundancy.
Motion estimation is performed to determine the best prediction among all possible block positions in available reference frames.
MSVP’s algorithms were developed with an emphasis on three levels: block level, frame level, and group of picture (GOP) level.
Block Level: Prioritized coding tools that were easy to implement, cost-effective in terms of silicon area and power, and delivered high compression efficiency while meeting performance targets.
Frame Level: Researched optimal algorithms to decide intelligently between I/P/B frames and to apply the best rate-control algorithms based on hardware-collected statistics.
GOP Level: Decided between using multiple-pass encoding with look-ahead or inserting intra (key) frames at certain shot boundaries.
Motion Estimation: It’s a heavy-duty algorithm in video encoding. MSVP’s motion search algorithm is designed to identify neighboring blocks contributing to quality and search around them with a limited cycle budget.
Rate Distortion Optimization (RDO): Essential for high video encoding quality. MSVP supports exhaustive RDO at almost all stages of mode decision. A unique challenge lies in the bit rate estimation.
Smart Quantization: This involves making smart quantization decisions that allocate encoding bits to areas that most significantly affect visual quality. It’s achieved through optimal QP selection and rounding decisions.
H.264 and VP9 Encoding: The frame-level algorithm for the MSVP H.264 encoder can be configured for either two-pass or one-pass. For VP9 encoding, multiple-pass encoding is used for high-quality VOD use cases.
MSVP’s Compression Efficiency: It supports upgrading basic ABR to advanced ABR encoding. This process becomes more complex as videos gain popularity, but MSVP significantly reduces compute complexity.
MSVP for RDX: RDX is a method that determines the best resolution and QP for a given channel condition (bit rate) and client viewport. MSVP’s high perf/W significantly reduces RDX compute requirements.
这些编码器使用帧内编码（intra-coding）降低空间冗余，使用帧间编码（inter-coding）消除时间冗余。
运动估计（motion estimation）用于在可用参考帧的所有可能块位置中确定最佳预测。
MSVP 的算法开发重点覆盖三个层级：块级、帧级和图像组（GOP）级。
块级： 优先选用易于实现、在芯片面积和功耗上具有成本效益，同时能在满足性能目标的前提下提供高压缩效率的编码工具。
帧级： 研究了能够智能判断 I/P/B 帧选择的最优算法，并基于硬件采集的统计数据应用最佳码率控制算法。
GOP 级： 在采用带前瞻（look-ahead）的多遍编码与在特定镜头边界插入帧内（关键）帧之间做出取舍。
运动估计： 这是视频编码中计算量极大的一项算法。MSVP 的运动搜索算法旨在识别对画质有贡献的相邻块，并在有限的周期预算内围绕这些块进行搜索。
率失真优化（RDO）： 对实现高质量视频编码至关重要。MSVP 在模式决策的几乎每个阶段都支持穷举式 RDO。其中的一大独特挑战在于码率估计。

智能量化： 这涉及做出智能的量化决策，将编码比特优先分配给对视觉质量影响最大的区域，具体通过最优 QP 选择和取整决策实现。
H.264 与 VP9 编码： MSVP H.264 编码器的帧级算法可配置为两遍或单遍模式。对于 VP9 编码，高画质点播（VOD）场景则采用多遍编码。
MSVP 的压缩效率： 支持将基础 ABR 升级为高级 ABR 编码。随着视频热度上升，这一过程会变得更加复杂，但 MSVP 能大幅降低计算复杂度。
MSVP 与 RDX： RDX 是一种根据给定信道条件（码率）和客户端视口来确定最佳分辨率与 QP 的方法。MSVP 出色的每瓦性能大幅降低了 RDX 所需的计算量。
