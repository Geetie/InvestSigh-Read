---
id: 03-independent-research-0000-00-00-metabizarreaiinfrachoicebi
cat: "03"
sub: independent-research
template: independent-research
template_version: 2
date: 0000-00-00
time: "00:00"
title: "SemiAnalysis：Meta 反常的 AI 基础设施选择多花了数亿美元（2023-05-06，中英对照）"
kind: "independent-research"
issuer: "SemiAnalysis / Dylan Patel、Gerald Wong"
ticker: META
source_pages: 6
---

## Q1 · 他给的公司**未披露口径**的外部估算是什么？

本件主体就是 Meta 的服务器架构，但通篇没有一个可入格的数：所有估算都是量级词。逐项列：

① GPU 采购排序：「我们的数据显示，Meta 今年采购的英伟达 H100 数量将超过包括微软在内的任何一家公司」。有方向、有对手，但没有张数、没有期间口径（自然年还是财年）、没有统计方法。
② 多花的钱：「为实施这一选择要花数亿美元」，另一处说「本可以省下数亿美元」。总量级有，但缺两个乘数——多少台服务器、单台差价多少，因此不能反推出单价，也不能和其他厂商对照。
③ 单台功耗增量：「单台服务器功耗增加数百瓦」。没有基线机型、没有测量点、没有满载还是空载。
④ 单台节省：「英伟达自家系统去掉博通交换芯片，每台省数千美元」。同样无 BOM 拆分。
⑤ Broadcom 的收入：「靠卖这些 PCIe 交换芯片从 8 卡系统厂商手里赚数百万美元」。这是 Broadcom 的收入侧估算，非 Meta 成本。

判断：这五项都不能入格，只能当量级——①②③④ 缺「台数 × 单价」这条换算桥，⑤ 缺出货量与单价。唯一带精确单位的物理量是每台 16 块 SSD 与 8 张网卡，那是配置事实，不是估算。对 Meta 的实际财务影响，材料自己在结尾也承认「相对于盈利规模算不上大事」。

### 依据
- p.1｜In fact, our data shows that Meta will purchase more Nvidia H100 GPUs this year than any other company, including Microsoft.
- p.2｜The benefits of this infrastructure choice range from very limited to nonexistent, and it will cost them hundreds of millions of dollars to implement.
- p.6｜Meta could have saved hundreds of millions by continuing to use ConnectX-7 NICs they already do, but with all 32 lanes enabled for the CPU to NIC to GPU switching capabilities.
- p.5｜Meta’s choice increases server-level power consumption by hundreds of watts.
- p.5｜Nvidia showcases this in their own systems, which completely remove Broadcom’s PCIe Switches where they existed in the prior generation, saving thousands of dollars, reducing power, and reducing latency to the network.
- p.4｜Broadcom makes millions of dollars from those deploying 8x GPU systems by selling these PCIe Switches.

## Q2 · 他的**物理量**从哪来、能不能核？

逐个列：

① 每台服务器 16 块 E1.S SSD、8 张 ConnectX-7 网卡、2 张 200G 前端网卡、3 个托盘（CPU 托盘、交换托盘、GPU 托盘）——这是 Grand Teton 的公开设计，出自 Meta 向 OCP（开放计算项目，把自研服务器设计公开给同行的组织）提交的机箱与托盘规格，可回溯，能查到同名托盘。
② CPU 侧 80 条 PCIe 通道——Intel Sapphire Rapids 的公开规格，可回溯。
③ 单台功耗增加数百瓦——不可核。没有给基线（去掉交换芯片的同配置机型）、没有给测试条件，也没有给整机功率，只有一个区间词。
④ 「英伟达自家系统每台省数千美元」——不可核，无 BOM。
⑤ H100 采购量排第一——不可核，无张数，属来源不明的产业清点。

判断：硬件拓扑这一层是可回溯的（OCP 文档 + CPU 规格），所以文章「Meta 多塞了 8 块盘、多养了一颗交换芯片」这个事实判断站得住；但一旦落到瓦特和美元，就全部失去中间步骤。做 Meta 单机成本模型时，只能用它的拓扑，不能用它的数。

### 依据
- p.5｜The switch tray in the middle is the most important one here. They deployed Broadcom switches, 16 E1.S SSDs, and 8 NICs.
- p.5｜The CPUs Meta utilizes here is Intel Sapphire Rapids with 80x PCIe lanes.
- p.6｜No other hyperscaler, including Microsoft, Oracle, Baidu, Alibaba, Tencent, and Amazon, adds this much storage in their AI nodes.
- p.2｜DGX is when Nvidia sells the whole server.
- p.4｜Broadcom is the exclusive supplier of all 104-lane and 88-lane PCIe Switches.

## Q3 · 这份材料是**四种交付物里的哪一种**？同源的另一份是哪一份？

`bilingual`（中英对照）。依据：标题连着两行一中一英，署名行也是「DYLAN PATEL AND GERALD WONG · MAY 06, 2023」与「DYLAN PATEL、GERALD WONG · 2023 年 5 月 6 日」并列；正文每一段先英文后中文、逐段对应；图注先 `[Figure: …]` 后 `[图：…]`；正文中段有显式「中英对照 / BILINGUAL」标记行。它比纯译文多保留了英文原句，比摘要完整（六页正文与图示一条不少）。

同源组：本件与 `0000-00-00-metabizarreaiinfrachoiceor`（英文原文，8 页）、`0000-00-00-metabizarreaiinfrachoicesu`（要点摘要，1 页）是同一篇 2023-05-06 文章的三种交付物，三份共用一个来源，不得计成三个独立源，回执时按一份材料计。

判断：三份里本份适合抄配置与论证链（中英互校能纠 OCR 错字），摘要适合快速取结论，英文原本适合核对措辞。三份的数字必须一致才算数——若译本与原本出现差异，以各份自己的原文为准并注明不一致。

### 依据
- p.1｜中英对照 / BILINGUAL
- p.1｜Meta’s Bizarre AI Infrastructure Choice Costs Them \$100s of Millions
- p.1｜Meta反常AI基础设施选择耗资数亿美元
- p.1｜DYLAN PATEL AND GERALD WONG · MAY 06, 2023
- p.1｜DYLAN PATEL、GERALD WONG · 2023 年 5 月 6 日

## Q4 · 他的**假设与算式**能不能复算？

它最关键的一个结论是「只需对架构稍作调整，博通交换芯片就完全用不上」。支撑它的是一段通道预算，我照它给的数逐项加起来复算：

2 张 200G 前端网卡各 8 条 = 16；管理与控制 = 4；8 张 ConnectX-7 各 16 条 = 128；8 块 E1.S SSD = 32。合计 180 条。而它给的 CPU 是 Sapphire Rapids，80 条通道；即便按双路（2×80=160）算，180 也超出 20 条，单路则超出 100 条。也就是说，「这样还剩 32 条通道」这句算不平——按它自己的分配，通道是缺的，不是剩的。

能救回这个算式的唯一解释是：那 16 条是网卡到 GPU 一侧的通道（ConnectX-7 内置 32 通道交换芯片，一半朝 CPU、一半朝 GPU），CPU 侧每张网卡只占 8 条。材料通篇没写这个区分，所以这一步不能复算，属于缺一步。

第二处不能复算：「省下数亿美元」= 台数 × 单台差价，两个乘数一个都没给；「单台省数千美元」也没给 BOM。

判断：结构判断（去掉独立交换芯片可行）方向可信，但它用来自证的那道算术题本身不成立；引用时必须自己重算通道预算，不能照抄「还剩 32 条」。

### 依据
- p.5｜If you run the math, Meta could have designed a box that connected the 2x 200G front-end NICs with 8 lanes each, 4 lanes for various management and control, and 16 lanes for each of the 8 ConnectX-7 NICs. This would leave them 32 lanes to connect to 8 E1.S SSDs.
- p.4｜Rather than using PCIe switches, they integrated a 32-lane PCIe switch into the ConnectX-7 NIC. This increases costs, latency, and power versus a theoretical standalone ConnectX-7 design with only 16-lanes, but when thinking from a systems perspective, this is a massive improvement.
- p.5｜This is where Meta’s bizarre choice comes in. Instead of deploying this architecture, they chose to remain with the legacy architecture.

## Q5 · 关键数字的**脚注指向哪**？

无脚注。六页里没有编号脚注、没有参考文献、没有超链接；唯一的来源线索是图注，而本份的图注只有描述、没有 `Source:` 行（例如「更详细的 HGX 服务器架构……」「Meta 的 Grand Teton 服务器设计……」），既没写来自 OCP 文档，也没写来自哪家 ODM 的拆解。

具体到数：「数亿美元」出自作者判断句，句尾无引注；「每台省数千美元」「数百瓦」同样无引注；「H100 采购量第一」自称「our data」，但没有说明数据是什么（海关？ODM 订单？供应链访谈？）。正文里唯一带出处的是 Meta 2023 年 2 月财报电话会的一句引语（把模型从 CPU 转向 GPU），那句是公司口径、也是一手。

判断：按规则，无脚注一律 Ⅱ 档。本份的一手成分只有那句财报会引语和 OCP 的公开硬件设计，二者都支撑不了金额与功率。这是原文本身就没有脚注（英文原本同样没有），不是译本丢失——所以不能指望换一份同源件补上。

### 依据
- p.2｜We’ve shifted the models from being more CPU-based to being GPU-based.
- p.2｜Meta Earnings Call February 2023
- p.5｜[Figure: Meta’s Grand Teton server design, comprising a CPU tray, switch tray, and GPU tray]
- p.2｜That doesn’t mean their bizarre infrastructure choices have stopped occurring.

## Q6 · 他的**自建口径 / 评级**定义是什么？与公司口径差多少？

本件没有打分体系，只有一把三轴尺子：同一性能下比成本、比功耗、比时延。原文的立论句就是「同样的性能，Meta 却要为此支付更高的成本，并承受更高的功耗」，时延是第三轴（「因时延上升而拖累性能」）。三轴都只给方向（更高/更低），没给权重、没给基准机型、没给换算成美元的方法，所以它不是可计算的 TCO 模型，只是一张定性对照表。

与 Meta 口径的差异在「收益」这一侧，且方向相反：Meta 的公开理由有两条——每台多 8 块本地盘的存储密度、以及可维护性（交换托盘让 SSD 与网卡可独立更换，还能保留换用非英伟达网卡的自由）。本件逐条否掉：博通的 PCIe 交换芯片本身不可现场维护，所以可维护性没提升；Meta 全栈依赖英伟达的 RoCE，本来就不会换别家网卡。

判断：这把尺子只能用来判断「这个选择值不值」，不能产出可比的分数或 TCO 数；与公司口径的差额是定性的——公司说换来存储密度与可维护性，作者说只换来存储密度。要量化差多少，得自己补 BOM 与台数，材料不给。

### 依据
- p.1｜Meta is paying more for the same performance at higher power.
- p.6｜The Broadcom PCIe Switches are not serviceable at all anyways, so arguably, there is no increase in serviceability.
- p.6｜They were never going to use non-Nvidia NICs.
- p.6｜The sacrifice being made by Meta is that they would rather put 16 SSDs into each server instead of 8 and saving massively on costs.

## Q7 · 他**有没有投行关系 / 持仓**？

三项分开：收费顾问——未声明；投行关系——未声明；持仓或受资助——未声明。

查证范围：页首只有标题、副题、两位作者署名与日期，没有机构介绍；六页正文与文末都没有 Disclosure、免责声明、利益冲突段；也没有「我们持有某公司头寸」一类表述。本份（中英对照件）页首没有 PAID 标记；同源的英文原本在日期旁有「PAID」，那是 SemiAnalysis 的付费墙标记，按作业规则不能当作「无投行关系」的证据。

另需点名：文章对 Broadcom 的定价与独家地位、英伟达网卡的份额描述都很具体，而 SemiAnalysis 本身是卖订阅的产业研究机构，客户群包含这些供应链公司；材料没有任何一句说明这一点。

判断：按「未声明 = 关系不明」处理，不得假定独立。它的结论对 Meta 偏负面、对博通偏正面（多卖了交换芯片、多了营收），在没有披露的情况下，不能把这条倾向当成中立观察。

### 依据
- p.1｜DYLAN PATEL AND GERALD WONG · MAY 06, 2023
- p.6｜Yes it bumps up both Capex and Opex costs as well as Broadcom’s revenue, but it doesn’t mean much due to the scale of Meta’s profitability.
- p.6｜Regardless, it is a choice that makes us scratch our heads.

## Q8 · 他的**行业级判断**（产能 · 份额）有数据支撑吗？

有三条行业级断言，都缺口径。

① 横向比较：「包括微软、甲骨文、百度、阿里、腾讯、亚马逊在内，没有任何一家其他 hyperscaler 会在 AI 节点里配这么多存储」。样本点名 6 家，但没给每家的节点定义（GPU 节点含不含存储节点）、没给盘数、没给时点，属于访谈式的定性比较——可以当「Meta 这一项异常」的线索，不能当份额或配置分布读数。
② 供应链份额：「英伟达凭借时延、功耗、管理控制与 RDMA/InfiniBand/RoCE 支持，在高速网卡市场仍占多数份额」。只有「多数」两字，没有百分比、没有按端口数还是按金额、没有年份。
③ 独家供应：「博通是所有 104 通道与 88 通道 PCIe 交换芯片的独家供应商，Microchip 在高通道数市场几乎无出货」。这条最接近可核——独家供应属于产品线事实，可查厂商料号，但同样没给料号与出货数。

判断：三条都是观点加权，不是读数。全文唯一接近可核的产能/份额信息是「博通独家供应某类通道数的交换芯片」，其余（6 家 hyperscaler 的存储配置、网卡多数份额）都必须另找 ODM 报价单或拆机报告补证。

### 依据
- p.4｜Despite this, Nvidia continues to hold the majority market share for high-speed NICs because of their superior latency, power, management/control, and differentiated support for RDMA, Infiniband, and RoCE.
- p.4｜While Microchip is theoretically a competitor, they sell close to none in the high lane count world.
- p.3｜Hyperscalers such as Meta and Microsoft do not participate in this cost reduction as they recognize highperformance networking is critical to achieving high performance on large language models and deep learning recommendation models.
