Meta’s Bizarre AI Infrastructure Choice Costs Them \$100s of Millions
Meta’s Bizarre AI Infrastructure Choice Costs Them \$100s of Millions
Meta反常AI基础设施选择耗资数亿美元
Meta is paying more for the same performance at higher power.
同样的性能，Meta 却要为此支付更高的成本，并承受更高的功耗。
DYLAN PATEL AND GERALD WONG · MAY 06, 2023
DYLAN PATEL、GERALD WONG · 2023 年 5 月 6 日
Meta is squarely in the top 3 for AI capabilities, after Microsoft/OpenAI and Google. They have innovated and brought to market many pieces of software, including PyTorch, LLAMA, Cicero, the most advanced deep learning recommendation models, RecD, Segment Anything, and more. It should be no surprise, then, that Meta also has one of the largest AI infrastructures. In fact, our data shows that Meta will purchase more Nvidia H100 GPUs this year than any other company, including Microsoft. Despite this, everything at Meta is not all is sunshine and rainbows.
Meta 在 AI 能力上稳居前三，仅次于 Microsoft/OpenAI 和 Google。他们已经创新并推出了多款软件产品，包括 PyTorch、LLAMA、Cicero，以及业内最先进的深度学习推荐模型、RecD、Segment Anything 等等。既然如此，Meta 拥有全球最大规模的 AI 基础设施之一也就不足为奇。事实上，我们的数据显示，今年 Meta 采购的英伟达 H100 GPU 数量将超过包括 Microsoft 在内的任何一家公司。尽管如此，Meta 的一切并非都一帆风顺。
Meta has historically made very odd AI infrastructure choices. First, they overly relied on CPUs for smaller recommendation models despite GPUs being far superior on a total cost of ownership basis. Then they fumbled their efforts on 7nm-based internal AI silicon with programs that were, by any reasonable definition, failures.
Meta 在 AI 基础设施上一向有些奇怪的选择。首先，尽管从总拥有成本（TCO）角度看 GPU 明显更优，他们仍然在较小规模的推荐模型上过度依赖 CPU。随后，他们在基于 7nm 的内部 AI 芯片项目上屡屡受挫，无论怎么定义，这些项目都是失败的。
中英对照 / BILINGUAL
Meta反常AI基础设施选择耗资数亿美元
SemiAnalysis · 2023-05-06

While Meta finally going all in on Nvidia GPUs…
不过 Meta 终于全面转向英伟达 GPU……
We’ve shifted the models from being more CPU-based to being GPU-based. The current surge in CapEx is really due to the building out of AI infrastructure, which we really began last year and are continuing into this year.
我们已经把模型从以 CPU 为主转向以 GPU 为主。目前资本开支（CapEx）的激增，主要就是因为 AI 基础设施的建设——这项工作我们去年就已经开始，今年仍在持续推进。
Meta Earnings Call February 2023
Meta 2023 年 2 月 财报电话会
That doesn’t mean their bizarre infrastructure choices have stopped occurring. Meta is currently deploying billions of dollars of servers with silicon that increases costs, increases power, and, worst of all, reduces performance by increasing latency. The benefits of this infrastructure choice range from very limited to nonexistent, and it will cost them hundreds of millions of dollars to implement.
但这并不意味着 Meta 奇怪的基础设施选择就此停止。Meta 目前正在部署价值数十亿美元的服务器，其中所用芯片不仅推高了成本、增加了功耗，最糟糕的是还因时延（latency）上升而拖累了性能。这一基础设施选择带来的收益从非常有限到几乎为零不等，而实施它却要花费 Meta 数亿美元。
Today we want to dive into Meta’s bizarre choice and explain why they made it. We also want to explain the alternative. Lastly, we want to dive into the adoption of that alternative at firms like Microsoft.
今天我们想深入探讨 Meta 这一反常选择，并解释他们为何这样做。我们还想说明另一种替代方案，最后再来看看 Microsoft 等公司对这一替代方案的采用情况。
To start of with, let’s discuss the standard design of an Nvidia GPU server. The below diagram is for the DGX A100. DGX is when Nvidia sells the whole server. Most large buyers like Meta, Microsoft, and various other hyperscalers buy Nvidia HGX as there is no reason to pay Nvidia’s margin for memory, CPUs, PCIe switches, etc. These HGX designs are generally similar, except in the business model. Nvidia only sells the GPU Baseboard, which contains 8 GPUs and NVSwitches.
首先，我们来看英伟达 GPU 服务器的标准设计。下图是 DGX A100。DGX 是英伟达整机销售的产品线。而Meta、Microsoft 等大多数大型买家以及其他 hyperscaler（超大规模云厂商）都会选择采购英伟达 HGX，因为没有必要为内存、CPU、PCIe 交换芯片等部件支付英伟达的加价。这些 HGX 设计整体上大同小异，区别主要在商业模式上：英伟达只出售包含 8 颗 GPU 和 NVSwitch 的 GPU 底板（baseboard）。
[Figure: Standard Nvidia DGX A100 server design — GPU baseboard, CPUs, PCIe switches, and NICs]
[图：英伟达 DGX A100 标准服务器设计——GPU 底板、CPU、PCIe 交换芯片与网卡]

In HGX, Nvidia supplies the GPUs, NVSwitches, and 8 CX6 NICs (networking cards) in the picture above. The two CPUs in blue are from Intel/AMD and the PCIe Switches in grey are from Broadcom. The purpose of the switches is to connect the GPUs, CPUs, and NICs together.
在 HGX 中，上图里的 GPU、NVSwitch，以及 8 张 CX6 网卡（NIC）均由英伟达提供。图中蓝色的两颗 CPU来自 Intel/AMD，灰色的 PCIe 交换芯片来自博通。这些交换芯片的作用是把 GPU、CPU 和网卡连接在一起。
There are also other elements such as PCH, management controllers, BMCs, front-end NICs, and optional elements such as SSDs. The below diagram shows this more clearly.
此外还有一些其他部件，例如 PCH（平台控制器中枢）、管理控制器、BMC（基板管理控制器）、前端网卡，以及 SSD 等可选部件。下图对此展示得更清楚。
[Figure: Detailed HGX server architecture, including PCH, management controllers, BMCs, front-end NICs, and SSDs]
[图：更详细的 HGX 服务器架构，包含 PCH、管理控制器、BMC、前端网卡与 SSD]
This is what most OEM/ODM servers will look like. They will purchase an Nvidia HGX baseboard with the GPUs and NVSwitches from Nvidia, and everything else will be procured separately. After the HGX baseboard, the next costliest components relate to memory and networking.
这就是大多数 OEM/ODM 服务器的大致构成。它们会向英伟达采购包含 GPU 和 NVSwitch 的 HGX 基板，其余部件则单独采购。在 HGX 基板之后，成本最高的部件主要与内存和网络相关。
One-way OEMs tend to reduce cost is by drastically reducing memory or networking speeds. This is very evident if you look at OEM/ODM servers. While SuperMicro, Gigabyte, Lenovo, Dell, HPE, etc will sell servers with the maxed-out networking that Nvidia recommends, they also sell many options with much cheaper and slower networking.
Hyperscalers such as Meta and Microsoft do not participate in this cost reduction as they recognize highperformance networking is critical to achieving high performance on large language models and deep learning recommendation models.
而 Meta、Microsoft 等 hyperscaler 并不参与这种成本压缩，因为它们清楚，高性能网络对于在大语言模型和深度学习推荐模型上取得高性能至关重要。

These hyperscalers instead perform other cost optimizations. They purchase the packaged NIC ASICs rather than the entire NIC cards. They often do the same for DRAM, NAND, storage controllers, and other components. They then get ODMs like Wistron or SuperMicro to integrate the chips they buy into servers for them.
相反，这些 hyperscaler 会在其他地方做成本优化：它们采购封装好的网卡 ASIC 芯片，而不是整张网卡；对DRAM、NAND、存储控制器等部件也常常采用同样的做法。然后，它们再让纬创（Wistron）、SuperMicro等 ODM 厂商把自 己采购来的芯片集成到服务器中。
Broadcom and Intel also sell NIC ASICs to compete with Nvidia’s ConnectX NICs. Despite this, Nvidia continues to hold the majority market share for high-speed NICs because of their superior latency, power, management/control, and differentiated support for RDMA, Infiniband, and RoCE.
博通和英特尔也销售网卡 ASIC，与英伟达的 ConnectX 网卡竞争。尽管如此，英伟达凭借在时延、功耗、管理/控制方面的优势，以及对 RDMA、InfiniBand 和 RoCE 的差异化支持，在高速网卡市场依然占据多数份额。
Broadcom is the exclusive supplier of all 104-lane and 88-lane PCIe Switches. While Microchip is theoretically a competitor, they sell close to none in the high lane count world. Broadcom makes millions of dollars from those deploying 8x GPU systems by selling these PCIe Switches. An obvious cost optimization is to reduce the number of or remove the PCIe Switches. Unfortunately, due to the lack of PCIe lanes from Intel and AMD CPUs, it was hard to achieve in practice.
所有 104 通道和 88 通道的 PCIe 交换芯片都由博通独家供应。Microchip 理论上是竞争对手，但在高通道数这一细分市场几乎没有出货。博通仅靠向部署 8 卡 GPU 系统的厂商销售这些 PCIe 交换芯片，就能赚取数百万美元。一个显而易见的成本优化方向，是减少甚至去掉 PCIe 交换芯片。可惜的是，由于英特尔和 AMD 的CPU 长期缺乏足够的 PCIe 通道数，这一点在实践中很难做到。
With 2023 datacenter CPUs such as Intel Sapphire Rapids and AMD Genoa, PCIe lane counts went up. In conjunction, Nvidia made an architecture change with their NICs to push a new solution whose focus was on removing Broadcom from their GPU servers this generation.
随着 Intel Sapphire Rapids、AMD Genoa 等 2023 年数据中心 CPU 的推出，PCIe 通道数有所提升。与此同时，英伟达也对其网卡做了架构调整，力推一套新方案，核心目标就是在这一代产品中把博通从其 GPU 服务器中剔除出去。
Rather than using PCIe switches, they integrated a 32-lane PCIe switch into the ConnectX-7 NIC. This increases costs, latency, and power versus a theoretical standalone ConnectX-7 design with only 16-lanes, but when thinking from a systems perspective, this is a massive improvement.
英伟达没有再使用独立的 PCIe 交换芯片，而是把一颗 32 通道的 PCIe 交换芯片直接集成进了 ConnectX-7 网卡。相比只有 16 通道的理论独立 ConnectX-7 设计，这样做会推高单颗网卡的成本、时延和功耗，但从整个系统的角度来看，这是一次巨大的改进。
[Figure: Nvidia’s new architecture integrating a PCIe switch into the ConnectX-7 NIC, eliminating the standalone Broadcom PCIe switch]
[图：英伟达将 PCIe 交换芯片集成进 ConnectX-7 网卡的新架构，从而去除独立的博通 PCIe 交换芯片]

Nvidia showcases this in their own systems, which completely remove Broadcom’s PCIe Switches where they existed in the prior generation, saving thousands of dollars, reducing power, and reducing latency to the network.
英伟达在自家系统中展示了这一方案：与上一代相比，原本存在的博通 PCIe 交换芯片被彻底去除，从而节省了数千美元的成本，同时降低了功耗，也缩短了网络时延。
While DGX adoption is limited to mostly enterprises and governments, large hyperscalers are also deploying the ConnectX-7 with PCIe Switch capabilities in HGX form factors.
尽管 DGX 的采用者大多局限于企业和政府客户，但大型 hyperscaler 同样在 HGX 形态下部署带有 PCIe 交换能力的 ConnectX-7。
This is where Meta’s bizarre choice comes in. Instead of deploying this architecture, they chose to remain with the legacy architecture. The designed the Grand Teton server, which comprises of 3 elements, a CPU tray, a switch tray, and a GPU tray. Designing their own server for their unique needs and serviceability is a good idea, but they also increased costs massively.
而这正是 Meta 反常选择出现的地方。他们没有采用这套新架构，而是选择继续沿用旧架构。Meta 设计了自己的 Grand Teton 服务器，由 CPU 托盘、交换托盘和 GPU 托盘三部分组成。为满足自身独特需求和可维护性而自行设计服务器，本身是个好主意，但这也让他们的成本大幅增加。
[Figure: Meta’s Grand Teton server design, comprising a CPU tray, switch tray, and GPU tray]
[图：Meta 的 Grand Teton 服务器设计，由 CPU 托盘、交换托盘和 GPU 托盘组成]
The switch tray in the middle is the most important one here. They deployed Broadcom switches, 16 E1.S SSDs, and 8 NICs. The Broadcom switches are designed to connect all of these devices up, but they are not needed with a mild architecture tweak. Meta’s choice increases server-level power consumption by hundreds of watts.
其中最关键的是中间的交换托盘。Meta 在其中部署了博通交换芯片、16 块 E1.S SSD 和 8 张网卡。这些博通交换芯片的作用是把上述设备统统连接起来，但只需对架构稍作调整，其实完全用不上它们。Meta 的这一选择使单台服务器的功耗增加了数百瓦。
The CPUs Meta utilizes here is Intel Sapphire Rapids with 80x PCIe lanes. If you run the math, Meta could have designed a box that connected the 2x 200G front-end NICs with 8 lanes each, 4 lanes for various management and control, and 16 lanes for each of the 8 ConnectX-7 NICs. This would leave them 32 lanes to connect to 8 E1.S SSDs.
Meta 在这里使用的 CPU 是拥有 80 条 PCIe 通道的 Intel Sapphire Rapids。稍加计算就会发现，Meta 完全可以设计出这样一套方案：2 张 200G 前端网卡各占 8 条通道，各类管理与控制功能占 4 条通道，8 张ConnectX-7 网卡各占 16 条通道，这样一来，还能剩下 32 条通道用于连接 8 块 E1.S SSD。
[Figure: Meta’s alternative PCIe lane allocation on Sapphire Rapids’ 80 lanes — front-end NICs, management, ConnectX-7 NICs, and SSDs]
[图：Meta 若采用替代方案，在 Sapphire Rapids 80 条 PCIe 通道上的分配方式——前端网卡、管理功能、ConnectX-7 网卡与 SSD]

The sacrifice being made by Meta is that they would rather put 16 SSDs into each server instead of 8 and saving massively on costs. Rather than utilize a more networked storage architecture approach, Meta has chosen to massively increase costs and power consumption by adding PCIe switches so they can add 8 more SSDs. No other hyperscaler, including Microsoft, Oracle, Baidu, Alibaba, Tencent, and Amazon, adds this much storage in their AI nodes.
Meta 做出的取舍是：宁愿在每台服务器里塞入 16 块 SSD 而不是 8 块，也不愿大幅节省成本。相比采用更依赖网络化存储架构的方案，Meta 选择增加 PCIe 交换芯片、大幅推高成本和功耗，只为多塞进 8 块 SSD。包括 Microsoft、Oracle、百度、阿里巴巴、腾讯和亚马逊在内，没有任何一家其他 hyperscaler 会在其 AI 节点中配置如此多的存储。
Meta could have saved hundreds of millions by continuing to use ConnectX-7 NICs they already do, but with all 32 lanes enabled for the CPU to NIC to GPU switching capabilities. This would necessitate a switch away from OCP NIC form factor to a custom one or Nvidia’s Cedar Fever.
Meta 本可以继续使用他们已经在用的 ConnectX-7 网卡，但把全部 32 条通道都用于 CPU 到网卡再到 GPU的交换能力，从而节省数亿美元。这需要放弃 OCP（开放计算项目，Open Compute Project）网卡外形规格，改用定制外形或英伟达的 Cedar Fever。
Meta argues that in addition to additional storage at each server, they also have an improvement in serviceability. This is an interesting point, but it is also one that is quite moot given other hyperscalers are able to get away with using ConnectX-7 Switching capabilities reliability. The Broadcom PCIe Switches are not serviceable at all anyways, so arguably, there is no increase in serviceability.
Meta 辩称，除了让每台服务器获得更多存储空间外，这一方案还提升了可维护性。这个说法有点意思，但也相当站不住脚——因为其他 hyperscaler 完全可以放心使用 ConnectX-7 的交换能力，也没出什么问题。况且博通的 PCIe 交换芯片本身根本谈不上可维护，所以可以说，这一选择并没有带来任何可维护性上的提升。
Meta also argues that this allows them to retain the ability to use other provider’s NICs, but that point is moot given they still rely on Nvidia’s flavor of RoCE through their entire stack. They were never going to use non-Nvidia NICs.
Meta 还辩称，这套方案能让他们保留使用其他厂商网卡的能力，但这一点同样站不住脚，因为他们整套技术栈依然依赖英伟达自家版本的 RoCE。说到底，他们从来就没打算使用非英伟达的网卡。
Ultimately Meta’s server architecture choice will have very little impact in the grand scheme of things. The performance degradation is manageable. Yes it bumps up both Capex and Opex costs as well as Broadcom’s revenue, but it doesn’t mean much due to the scale of Meta’s profitability. Regardless, it is a choice that makes us scratch our heads. Meta could have a more efficient AI infrastructure, but they chose not to.
归根结底，Meta 的这一服务器架构选择，从大局来看影响其实相当有限。性能上的损失是可以承受的。没错，它确实推高了 Meta 的资本开支和运营开支，也让博通的营收多了一块，但相对于 Meta 的盈利规模而言，这些都算不上什么大事。尽管如此，这仍然是一个让我们百思不得其解的选择。Meta 本可以拥有更高效的 AI 基础设施，但他们选择了不这么做。
