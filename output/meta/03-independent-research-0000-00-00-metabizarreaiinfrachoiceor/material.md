---
id: 03-independent-research-0000-00-00-metabizarreaiinfrachoiceor
cat: "03"
sub: independent-research
template: independent-research
template_version: 2
date: 0000-00-00
time: "00:00"
title: "SemiAnalysis：Meta 反常的 AI 基础设施选择多花了数亿美元（2023-05-06，英文原文）"
kind: "independent-research"
issuer: "SemiAnalysis / Dylan Patel、Gerald Wong"
ticker: META
source_pages: 8
---

## Q1 · 他给的公司**未披露口径**的外部估算是什么？

本份是英文原文，页面排版把结论压在标题副题里——「同样的性能，Meta 付得更多、功耗更高」——正文却没有把它落成一个可算的数。逐项：

① 采购排序：作者称自己的数据表明 Meta 当年买的 H100 比包括微软在内的任何公司都多。给的是名次不是数量，也没说口径（自然年/财年、整卡还是底板、直采还是经 ODM）。
② 多付的总额：「实施这一选择将花掉他们数亿美元」；后文再说「本可以省下数亿美元」。这是同一个估算的两种说法，都没给台数与单台差价。
③ 单台节省：「英伟达自家系统去掉博通交换芯片，每台省数千美元」。这是对英伟达设计的估算，不是对 Meta 的。
④ 单台功耗：「增加数百瓦」。无基线、无负载条件。
⑤ 收入侧：「博通靠卖这些交换芯片，从 8 卡系统厂商那里赚到数百万美元」。这是把 Meta 的成本移到博通的收入项，同样没有出货量。

判断：五项的计量单位都不完整——①缺数量、②缺乘数、③④缺基线、⑤缺单价。全部只能当量级，不能入格。它在结尾也主动降级了这个判断：「相对 Meta 的盈利规模，这不算什么」。

### 依据
- p.1｜Meta is paying more for the same performance at higher power.
- p.2｜That doesn’t mean their bizarre infrastructure choices have stopped occurring. Meta is currently deploying billions of dollars of servers with silicon that increases costs, increases power, and, worst of all, reduces performance by increasing latency.
- p.8｜Meta could have saved hundreds of millions by continuing to use ConnectX-7 NICs they already do, but with all 32 lanes enabled for the CPU to NIC to GPU switching capabilities.
- p.6｜Meta’s choice increases server-level power consumption by hundreds of watts.
- p.4｜Broadcom makes millions of dollars from those deploying 8x GPU systems by selling these PCIe Switches.

## Q2 · 他的**物理量**从哪来、能不能核？

逐个给值、时点与来源：

① 每台 16 块 E1.S SSD、8 张网卡、三层托盘结构（CPU tray / switch tray / GPU tray）——2023 年 5 月时点的 Grand Teton 设计。本份比中英对照件多留了一段 Meta 提交给 OCP 的机箱与托盘说明（Cascade Creek 交换托盘、最多 16 块 E1.S 盘、8 张 RDMA 网卡、25 个可更换单元），说明书级证据在文内，可回溯。
② 交换托盘里那颗博通 PCIe 交换芯片——同属 OCP 公开设计的组成部分，可回溯。
③ CPU 为 Intel Sapphire Rapids、80 条 PCIe 通道——厂商公开规格，可回溯。
④ 单台功耗增加数百瓦——不可核，全文没有功率表、没有基线机。
⑤ H100 采购量第一、每台省数千美元——不可核，无清点方法、无 BOM。

判断：这份原文的物理量分两层。拓扑（盘数、网卡数、托盘划分）是一手文档支撑的，可以放心用；功率与金额是作者判断，没有任何中间步骤，按规则降为旁证。本份因为保留了 OCP 段落，比摘要件更能证明「配置」这一层不是作者臆测。

### 依据
- p.6｜The switch tray in the middle is the most important one here. They deployed Broadcom switches, 16 E1.S SSDs, and 8 NICs.
- p.6｜The CPUs Meta utilizes here is Intel Sapphire Rapids with 80x PCIe lanes.
- p.7｜CascadeCreekisour SwitchTray
- p.7｜-Andupto16xE1.SDrives
- p.7｜Bringingthe total number of FRUsto25.

## Q3 · 这份材料是**四种交付物里的哪一种**？同源的另一份是哪一份？

`original`（纯英文原文）。依据：页首是英文标题、英文副题、两位作者、日期与一个 `PAID` 标记，没有中文行；八页正文只有英文；排版保留着网页原貌（订阅推广句「Get 20% off a group subscription」、文末「Leave a comment」），说明这是从付费原文页抓下来的，而不是经过翻译或压缩的再加工件。它比双语件多出 OCP 机箱段落与这些网页残留，比摘要件多出全部论证。

同源组：本件与 `0000-00-00-metabizarreaiinfrachoicebi`（中英对照，6 页）、`0000-00-00-metabizarreaiinfrachoicesu`（要点摘要，1 页）是同一篇 2023-05-06 文章的三种交付物，共用一个来源，不得计成三个独立源。

判断：三份在本库里只能算一份材料的三个视角。核对数字时，本份应作基准——它是英文原句；译本若与它出现措辞或数字差异（例如单位换算、`$` 写法），以各份自己的原文为准并注明不一致。

### 依据
- p.1｜Meta’s Bizarre AI Infrastructure Choice Costs Them \$100s of Millions
- p.1｜MAY 06, 2023 ∙ PAID
- p.2｜Get 20% off a group subscription
- p.8｜Leave a comment

## Q4 · 他的**假设与算式**能不能复算？

最关键的一条结论是「轻微改一下架构，就能完全不用博通交换芯片」。它给的证明是通道预算，我按它列的项加一遍：

2×200G 前端网卡各 8 条 = 16；管理与控制 4 条；8 张 ConnectX-7 各 16 条 = 128；8 块 E1.S SSD = 32。逐项相加 180 条。而它给的 CPU 是 80 条通道的 Sapphire Rapids；单路差 100 条，按双路 160 条仍差 20 条。所以「这样还剩 32 条给 SSD」不成立——按它自己的分配，通道是缺的。

唯一能让算式闭合的解释是：那 16 条属于网卡朝 GPU 一侧（ConnectX-7 内置 32 通道交换芯片，两侧各 16），CPU 侧每张卡只占 8 条。原文没有做这个区分，所以缺一步，不能复算。

第二处：「省下数亿美元」= 服务器台数 × 单台差价，两个乘数都没给；「每台省数千美元」也没有物料清单支撑。第三处：「单台多耗数百瓦」没有基线机，无法与任何机型对照。

判断：定性结论（去掉独立交换芯片在系统层可行）方向可信，但它用来自证的那道算术不闭合。任何人引用「还剩 32 条通道」都必须先自己重算，否则会把一个算错的中间步骤当成事实。

### 依据
- p.7｜connected the 2x 200G front-end NICs with 8 lanes each, 4 lanes for various management and control, and 16 lanes for each of the 8 ConnectX-7 NICs. This would leave them 32 lanes to connect to 8 E1.S SSDs.
- p.5｜Rather than using PCIe switches, they integrated a 32-lane PCIe switch into the ConnectX-7 NIC.
- p.5｜This increases costs, latency, and power versus a theoretical standalone ConnectX-7 design with only 16-lanes, but when thinking from a systems perspective, this is a massive improvement.
- p.7｜No other hyperscaler, including Microsoft, Oracle, Baidu, Alibaba, Tencent, and Amazon, adds this much storage in their AI nodes.

## Q5 · 关键数字的**脚注指向哪**？

无脚注。八页里没有编号脚注、没有参考文献表、没有一处超链接；数字后面也不带括号出处。本份是从网页原文抓下来的，连订阅推广和评论按钮都保留了，却没有任何链接残留——所以无法判断是原文就没挂引注，还是抓取时被剥掉；两种情况都按「无脚注」处理，记 Ⅱ 档。

逐个数看指向：「数亿美元」出自作者判断句，前后无引注；「每台省数千美元」「数百瓦」「博通赚数百万美元」同理；「H100 采购量第一」写的是「our data shows」，但没有交代数据是什么（ODM 订单？报关？供应链访谈？）。

全篇唯一的一手引用是 Meta 2023 年 2 月财报电话会那句（把模型从 CPU 转向 GPU），有明确出处标注；但那句只证明「Meta 在转 GPU」，支撑不了任何金额。

判断：这份材料的一手成分是 OCP 硬件文档 + 一句财报会引语，二者都不覆盖成本结论。金额与功率必须另找 BOM 或拆机报告，不能因为它是「英文原文」就自动升档。

### 依据
- p.1｜We've shifted the models from being more CPU-based to being GPU-based.
- p.1｜Meta Earnings Call February 2023
- p.1｜In fact, our data shows that Meta will purchase more Nvidia H100 GPUs this year than any other company, including Microsoft.
- p.4｜Broadcom is the exclusive supplier of all 104-lane and 88-lane PCIe Switches.

## Q6 · 他的**自建口径 / 评级**定义是什么？与公司口径差多少？

没有评级体系，只有一把三轴定性尺：同性能比成本、比功耗、比时延。原文立论句是「同样的性能，付得更多、功耗更高」，时延作为第三轴出现（「最糟的是还因时延上升而降低性能」）。三轴都没有权重、没有基准机型、没有换算成美元的公式，所以它不是 TCO 模型，是一张对照表。

与公司口径的差额落在「收益侧」，且方向相反。Meta 的公开理由两条：每台多 8 块本地盘（存储密度）、以及对可维护性与换用非英伟达网卡的保留。作者逐条反驳：博通的 PCIe 交换芯片本身不可现场更换，所以可维护性没涨；Meta 全栈吃英伟达的 RoCE，本来就不会换卡。

判断：用这把尺子只能判断「这笔钱花得值不值」，产不出可比分数，也不能与任何厂商披露的 TCO 并表。它和公司口径的差是定性的——公司说换来两样，作者说只换来一样（存储密度）。要量化，需要自己补台数与 BOM，材料不给。

### 依据
- p.8｜Meta argues that in addition to additional storage at each server, they also have an improvement in serviceability.
- p.8｜The Broadcom PCIe Switches are not serviceable at all anyways, so arguably, there is no increase in serviceability.
- p.8｜Meta also argues that this allows them to retain the ability to use other provider’s NICs, but that point is moot given they still rely on Nvidia’s flavor of RoCE through their entire stack.

## Q7 · 他**有没有投行关系 / 持仓**？

三项分开：收费顾问——未声明；投行关系——未声明；持仓或受资助——未声明。

查证范围：页首只有标题、副题、作者、日期与 `PAID`；八页正文、页脚、文末（评论按钮之后）都没有 Disclosure、免责声明或利益冲突段，也没有任何持仓表述。这里的 `PAID` 是 SemiAnalysis 的付费墙标记，说明这篇文章要订阅才能读，按作业规则它不是投行关系，也不能拿来证明「无关系」——这一点在三种交付物里只有本份保留了原始标记。

另需点名：全文对博通的独家供应地位、英伟达的网卡份额下了很具体的判断，而 SemiAnalysis 本身卖订阅、客户包含这些供应链公司；材料对此没有一句说明。

判断：按「未声明 = 关系不明」处理，不得假定独立。它的结论对 Meta 负面、对博通正面（多卖了交换芯片与营收），在零披露条件下，这条方向性倾向不能当中立观察使用。

### 依据
- p.1｜DYLAN PATEL AND GERALD WONG
- p.1｜MAY 06, 2023 ∙ PAID
- p.8｜Yes it bumps up both Capex and Opex costs as well as Broadcom’s revenue, but it doesn’t mean much due to the scale of Meta’s profitability.

## Q8 · 他的**行业级判断**（产能 · 份额）有数据支撑吗？

三条行业断言，全部缺口径。

① 横向配置比较：包括微软、甲骨文、百度、阿里、腾讯、亚马逊在内，没有第二家 hyperscaler 在 AI 节点里放这么多存储。点名 6 家，但没给各家的节点定义（含不含存储节点）、盘数与时点；这是访谈式定性比较，只能当「Meta 这一项异常」的线索。
② 网卡份额：英伟达在高速网卡市场仍占多数，理由是时延、功耗、管理控制与 RDMA/InfiniBand/RoCE 支持。只有「多数」两字，没有百分比、没说是按端口还是按金额。
③ 独家供应：博通是所有 104 通道与 88 通道 PCIe 交换芯片的独家供应商，Microchip 在高通道数市场几乎没有出货。这条最接近可核（属产品线事实，可查料号），但也没给料号与出货数。
④ 一条结构性判断：这种架构选择「对大局影响很小」——因为相对 Meta 的盈利规模可以承受。这是尺度判断，不是读数。

判断：全部是观点加权。要把它变成行业读数，至少需要 ODM 报价单、拆机报告与网卡出货统计三样，本份一样都没给；第 ③ 条可以自己去查证料号，其余两条只能当线索。

### 依据
- p.4｜Despite this, Nvidia continues to hold the majority market share for high-speed NICs because of their superior latency, power, management/control, and differentiated support for RDMA, Infiniband, and RoCE.
- p.4｜While Microchip is theoretically a competitor, they sell close to none in the high lane count world.
- p.8｜Ultimately Meta’s server architecture choice will have very little impact in the grand scheme of things.
