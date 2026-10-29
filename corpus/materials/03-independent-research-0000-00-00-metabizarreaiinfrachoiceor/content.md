Meta’s Bizarre AI Infrastructure Choice Costs Them \$100s of Millions
Meta is paying more for the same performance at higher power.
DYLAN PATEL AND GERALD WONG
MAY 06, 2023 ∙ PAID
Meta is squarely in the top 3 for AI capabilities, after Microsoft/OpenAI and Google. They have innovated and brought to market many pieces of software, including PyTorch, LLAMA, Cicero, the most advanced deep learning recommendation models, RecD, Segment Anything, and more. It should be no surprise, then, that Meta also has one of the largest AI infrastructures. In fact, our data shows that Meta will purchase more Nvidia H100 GPUs this year than any other company, including Microsoft. Despite this, everything at Meta is not all is sunshine and rainbows.
Meta has historically made very odd AI infrastructure choices. First, they overly relied on CPUs for smaller recommendation models despite GPUs being far superior on a total cost of ownership basis. Then they fumbled their efforts on 7nm-based internal AI silicon with programs that were, by any reasonable definition, failures.
While Meta finally going all in on Nvidia GPUs…
We've shifted the models from being more CPU-based to being GPU-based. The current surge in CapEx is really due to the building out of AI infrastructure, which we really began last year and are continuing into this year.
Meta Earnings Call February 2023

That doesn’t mean their bizarre infrastructure choices have stopped occurring. Meta is currently deploying billions of dollars of servers with silicon that increases costs, increases power, and, worst of all, reduces performance by increasing latency. The benefits of this infrastructure choice range from very limited to non-existent, and it will cost them hundreds of millions of dollars to implement.
Today we want to dive into Meta’s bizarre choice and explain why they made it. We also want to explain the alternative. Lastly, we want to dive into the adoption of that alternative at firms like Microsoft.
Get 20% off a group subscription
To start of with, let’s discuss the standard design of an Nvidia GPU server. The below diagram is for the DGX A100. DGX is when Nvidia sells the whole server. Most large buyers like Meta, Microsoft, and various other hyperscalers buy Nvidia HGX as there is no reason to pay Nvidia’s margin for memory, CPUs, PCIe switches, etc. These HGX designs are generally similar, except in the business model. Nvidia only sells the GPU Baseboard, which contains 8 GPUs and NVSwitches.
![001_p002_00.jpg](figures/001_p002_00.jpg)

In HGX, Nvidia supplies the GPUs, NVSwitches, and 8 CX6 NICs (networking cards) in the picture above. The two CPUs in blue are from Intel/AMD and the PCIe Switches in grey are from Broadcom. The purpose of the switches is to connect the GPUs, CPUs, and NICs together.
There are also other elements such as PCH, management controllers, BMCs, front-end NICs, and optional elements such as SSDs. The below diagram shows this more clearly.
This is what most OEM/ODM servers will look like. They will purchase an Nvidia HGX baseboard with the GPUs and NVSwitches from Nvidia, and everything else will be procured separately. After the HGX baseboard, the next costliest components relate to memory and networking.
![002_p003_01.jpg](figures/002_p003_01.jpg)

One-way OEMs tend to reduce cost is by drastically reducing memory or networking speeds. This is very evident if you look at OEM/ODM servers. While SuperMicro, Gigabyte, Lenovo, Dell, HPE, etc will sell servers with the maxed-out networking that Nvidia recommends, they also sell many options with much cheaper and slower networking.
Hyperscalers such as Meta and Microsoft do not participate in this cost reduction as they recognize high-performance networking is critical to achieving high performance on large language models and deep learning recommendation models.
These hyperscalers instead perform other cost optimizations. They purchase the packaged NIC ASICs rather than the entire NIC cards. They often do the same for DRAM, NAND, storage controllers, and other components. They then get ODMs like Wistron or SuperMicro to integrate the chips they buy into servers for them.
Broadcom and Intel also sell NIC ASICs to compete with Nvidia’s ConnectX NICs. Despite this, Nvidia continues to hold the majority market share for high-speed NICs because of their superior latency, power, management/control, and differentiated support for RDMA, Infiniband, and RoCE.
Broadcom is the exclusive supplier of all 104-lane and 88-lane PCIe Switches. While Microchip is theoretically a competitor, they sell close to none in the high lane count world. Broadcom makes millions of dollars from those deploying 8x GPU systems by selling these PCIe Switches. An obvious cost optimization is to reduce the number of or remove the PCIe Switches. Unfortunately, due to the lack of PCIe lanes from Intel and AMD CPUs, it was hard to achieve in practice.
With 2023 datacenter CPUs such as Intel Sapphire Rapids and AMD Genoa, PCIe lane counts went up. In conjunction, Nvidia made an architecture change with their NICs to push a new solution whose focus was on removing Broadcom from their GPU servers this generation.

Rather than using PCIe switches, they integrated a 32-lane PCIe switch into the ConnectX-7 NIC. This increases costs, latency, and power versus a theoretical standalone ConnectX-7 design with only 16-lanes, but when thinking from a systems perspective, this is a massive improvement.
Nvidia showcases this in their own systems, which completely remove Broadcom’s PCIe Switches where they existed in the prior generation, saving thousands of dollars, reducing power, and reducing latency to the network.
While DGX adoption is limited to mostly enterprises and governments, large hyperscalers are also deploying the ConnectX-7 with PCIe Switch
![003_p005_02.jpg](figures/003_p005_02.jpg)

capabilities in HGX form factors.
This is where Meta’s bizarre choice comes in. Instead of deploying this architecture, they chose to remain with the legacy architecture. The designed the Grand Teton server, which comprises of 3 elements, a CPU tray, a switch tray, and a GPU tray. Designing their own server for their unique needs and serviceability is a good idea, but they also increased costs massively.
The switch tray in the middle is the most important one here. They deployed Broadcom switches, 16 E1.S SSDs, and 8 NICs. The Broadcom switches are designed to connect all of these devices up, but they are not needed with a mild architecture tweak. Meta’s choice increases server-level power consumption by hundreds of watts.
The CPUs Meta utilizes here is Intel Sapphire Rapids with 80x PCIe lanes. If you run the math, Meta could have designed a box that
![004_p006_03.jpg](figures/004_p006_03.jpg)

connected the 2x 200G front-end NICs with 8 lanes each, 4 lanes for various management and control, and 16 lanes for each of the 8 ConnectX-7 NICs. This would leave them 32 lanes to connect to 8 E1.S SSDs.
Chassis
Comparedto Zion,theGrand Teton eternalcablesandreplaced themw forincreasedreliability.Astandard 8OUGrand Tetons.
Unlikeitspredecessor,Zion,theGr upof16rear serviceable fans.
FinallyintotaltheCassiss3fi
Arrowhead Pool
Arrowhead Pool isour next generation( bothtrainingandinferenceapplications
Asitweighs over 41kilos,the tray ison toensuresafeserviceabilityforon-site
Cascade Creek
CascadeCreekisour SwitchTray.it iscom
-8xRDMANICs
-Andupto16xE1.SDrives
Bringingthe total number of FRUsto25. serviceableandhot-swappableenablingf technicians.
Storm Point
StormPointisournext generation with39fieldreplaceableunits(FRl
-The DIMms
-TheCPUs
-And the TSFF NICs (tall small forr ThisnewCPUtray has increasedm comparedtoitspredecessorAngel
The sacrifice being made by Meta is that they would rather put 16 SSDs into each server instead of 8 and saving massively on costs. Rather than utilize a more networked storage architecture approach, Meta has chosen to massively increase costs and power consumption by adding PCIe switches so they can add 8 more SSDs. No other hyperscaler, including Microsoft, Oracle, Baidu, Alibaba, Tencent, and Amazon, adds this much storage in their AI nodes.
![005_p007_04.jpg](figures/005_p007_04.jpg)
![006_p007_05.jpg](figures/006_p007_05.jpg)
![007_p007_06.jpg](figures/007_p007_06.jpg)
![008_p007_07.jpg](figures/008_p007_07.jpg)

Meta could have saved hundreds of millions by continuing to use ConnectX-7 NICs they already do, but with all 32 lanes enabled for the CPU to NIC to GPU switching capabilities. This would necessitate a switch away from OCP NIC form factor to a custom one or Nvidia’s Cedar Fever.
Meta argues that in addition to additional storage at each server, they also have an improvement in serviceability. This is an interesting point, but it is also one that is quite moot given other hyperscalers are able to get away with using ConnectX-7 Switching capabilities reliability. The Broadcom PCIe Switches are not serviceable at all anyways, so arguably, there is no increase in serviceability.
Meta also argues that this allows them to retain the ability to use other provider’s NICs, but that point is moot given they still rely on Nvidia’s flavor of RoCE through their entire stack. They were never going to use non-Nvidia NICs.
Ultimately Meta’s server architecture choice will have very little impact in the grand scheme of things. The performance degradation is manageable. Yes it bumps up both Capex and Opex costs as well as Broadcom’s revenue, but it doesn’t mean much due to the scale of Meta’s profitability. Regardless, it is a choice that makes us scratch our heads. Meta could have a more efficient AI infrastructure, but they chose not to.
Leave a comment
![009_p008_08.jpg](figures/009_p008_08.jpg)
