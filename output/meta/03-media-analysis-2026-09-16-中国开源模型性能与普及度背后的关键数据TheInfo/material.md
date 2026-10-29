---
id: 03-media-analysis-2026-09-16-中国开源模型性能与普及度背后的关键数据TheInfo
cat: "03"
sub: media-analysis
template: media-analysis
template_version: 2
date: 2026-09-16
time: "00:00"
title: "中国开源模型性能与普及度背后的关键数据"
kind: "media-analysis"
issuer: "The Information"
ticker: META
source_pages: 14
---

## Q1 · 这条报道的**一手来源是什么**？能不能回溯？

据 The Information 二〇二六年九月十四日报道，本篇的一手来源分四层，能回溯的程度差别很大：只有基准那一层落到公开机构，其余都停在媒体转述或作者自算。

第一层是 Hugging Face 的平台数据：记者自述把开源模型当一条供应链来拆，用的是该平台四年半、逾 87 万个衍生"实例"的记录。数据源具名，但抽取口径、样本定义与清洗方法都未公开，属"源可指、原始表不可达"。

第二层是 Artificial Analysis 的智能指数，属公开第三方基准，机构这一头能回溯；但本篇未给榜单版本、取数日期与逐项分数，所以只能回溯到机构，回溯不到具体那一版榜单。

第三层是 Linux Foundation 与哈佛二〇二二年的研究（不足十名开发者贡献九成以上代码），只给机构与年份，无报告名、无链接，未回溯。

第四层是本报此前报道（英伟达 129 亿美元收购 Hugging Face、Thinking Machines 400 亿美元潜在估值），属自引，未给日期与链接，未回溯。另有一处不具名指控："美国前沿实验室称"，不点名哪几家，无法回溯。

至于份额、追平比例、版本年龄这些核心数字，全是作者在同一数据集上的自算，方法定义在作者手里：读者能核到"数据来自哪家平台"，核不到"怎么算出来的"。

### 依据
- p.4｜To better understand the landscape, I’ve been examining open source models as a supply chain, digging into a rich data trove from Hugging Face that I think is under-discussed.
- p.8｜Open-source models from Chinese labs consistently beat their U.S. open-source counterparts on capability metrics by AI evaluation company Artificial Analysis.
- p.9｜a 2022 study from the Linux Foundation and Harvard found 94% of projects have fewer than ten developers accounting for more than 90% of the code.
- p.7｜U.S. frontier labs allege their models’ outputs are used by Chinese developers for training.

## Q2 · 它带来的**新事实**是什么（不是转述的那部分）？

新事实不是某家公司说了什么，而是三组此前未公开的分布测算，出自本报对 Hugging Face 数据的整理（作者系本报研究总监），属自采分析，不是转述别人的稿。

其一，规模与结构：四年半记录逾 87 万个衍生实例，约一半建立在三家公司的开源模型上——表内 Qwen 31.4%、Meta Llama 9%、Google 8.5% 相加为 48.9%，与"约一半"自洽；近八成模型源自最热门的百分之一，而只有百分之四的模型被二次开发过。长尾极长，复用极集中。

其二，追平节奏的三段式：以智能指数衡量，扩容阶段最好的新开源模型约等于九个月前的前沿闭源；推理模型阶段差距大幅收窄；去年底以来的智能体阶段，中位滞后只剩约三个月。

其三，代际黏性：通义千问今年一月的新代只占该家族开发者活动的百分之十五，两年前的前代仍占两成；开发者所用中文模型版本平均十三个月，西方略短。

另有一项是未发生：Meta 的 Muse Spark 1.2 是否开源仍取决于公司是否兑现高管承诺，报道用条件句，不得读成已开源。

### 依据
- p.4｜The Hugging Face data captures more than 870,000 of these open-source “instances” over four-and-a-half years that show which underlying open model a developer built upon.
- p.10｜Three providers feed half of building with open-source models by leading developers\* on Hugging Face.
- p.13｜Its current-generation model, released in January, accounts for 15% of all developer activity on Hugging Face with Qwen, while the two-year-old predecessor still accounts for 20%.
- p.5｜By the current agent-focused period, which has emerged since the end of last year, the gap is only about three months.

## Q3 · 里面有**可计量的数字**吗？谁提供的？

数字齐全，提供者却有四家、口径至少五种，且同篇有两处对不上，不能合并成一串。

能力口径，即"占领先闭源前沿的百分比"，取自 Artificial Analysis 智能指数、由本报自算：二〇二四年三季度约五成、二〇二六年中 85%、本季度最新约 95%；同栏另有美欧最强开源 67%，计入韩国 Motif 后 75%。这是基准分数之比，既不是市占，也不是调用量。

图与文对不上：能力折线图（"China's Open Source Edge"那张）末点，中国开源约九成、美欧开源约六成四，与正文 95%、67% 各差几个百分点。可能是图取季度均值、正文取"最新读数"，但文中未交代；两值只能并列，不许平均。

份额口径，即占 Hugging Face 衍生模型数，不是调用量也不是下载量：Qwen 31.4%、Llama 9%、Google 8.5%、Black Forest Labs 7%、Mistral 2.9%、LeRobot 2.6%、Microsoft 2.3%、DeepSeek 1.9%、OpenAI 1.7%、Stability 1.3%、其余 1,186 家合计 31.3%。分母被限定为"年发二十个以上模型的最活跃百分之二发布者"，与正文"八成模型源自前百分之一"是两个分母，不可互推。

滞后口径以月计：早期约九个月、智能体阶段约三个月，图注只写"各时期中位滞后"，未给逐期数值。

外部引用两项：Linux Foundation 与哈佛二〇二二年研究给 94%；129 亿美元收购与 400 亿美元估值是本报先前报道，无公告可核。

所以什么：份额全部是衍生模型数口径，谁把它读成调用量份额，就会把通义千问的地位读错；95% 与图上的约九成并存时，取低者更稳。

### 依据
- p.7｜By mid-2026 the best open models had caught up to perform 85% as well as the leading closed frontier model, and as of the latest data in the current quarter, they are at roughly 95%.
- p.9｜The best U.S. and European open models reached 67% of frontier capability in the current quarter.
- p.10｜\* The top 2% most active Hugging Face publishers, releasing more than 20 models annually.
- p.10｜• Source: Hugging Face, The Information reporting

## Q4 · **公司回应**是什么（否认 / 拒绝置评 / 未取得）？

未载明。全篇十四页没有任何回应段，也搜不到"回应""置评""拒绝""发言人"一类字样；这是本报研究团队的自采分析稿，不是向当事方求证过的调查稿。

文本里唯二接近当事方表态的地方，都不是对本篇的回应。其一是关于 Meta 的条件句：若公司兑现高管承诺把 Muse Spark 1.2 开源，差距可能进一步收窄——这是记者转述"高管曾承诺"，既未点名哪位高管、哪个场合，也不构成回应。其二是一句不具名的指控：美国前沿实验室称中国开发者用其模型输出训练，没有点名任何一家实验室，也没有被指控方的回应。

四态都要分开记：本篇既无确认、也无否认、也无拒绝置评，只能记"未载明"。从署名可见这是本报研究人员的分析稿，正文通篇是数据论证，没有采访与求证环节——这正是"没有回应段"的成因，不是当事方拒答。

所以：把"没有回应"读成默认承认是错的，读成当事方否认同样是错的。涉及 Meta 的可核部分只剩"高管曾承诺开源"这一层线索，仍须回公司原话与场次核。

### 依据
- p.9｜Meta’s efforts with Muse Spark 1.2 could further narrow the gap if the company makes the model open as executives have promised.
- p.3｜By 作者 Eric Bellomo 埃里克·贝洛莫

## Q5 · 这是**原文还是转载**？如果转载，原文在哪？

原文，不是转载。判原文的三样要素里两样直接可见：指名原发媒体与记者（署名 Eric Bellomo，本报研究总监，文末附邮箱；发布时点二〇二六年九月十四日十二时二十七分，太平洋时间），页脚有指向 theinformation.com 原文的链接。第三样"正文引述别家报道"在此不适用——本篇自己就是原发，只引本报先前报道。

体裁上要说明两点。一是中英段对段排列，属同一份文档的两个语层，只算一个来源，不因有中文译文就多一个源。二是署名层级：作者是媒体自己的研究人员（The Information Pro），本篇属"媒体自采加数据研究"，价值在测算而不在独家爆料——它没有匿名线人，也没有拿到公司文件。

版面噪音要剔：开头"网页已解锁。网页数据已解锁"与每页重复的站名、带订阅参数的链接，都是抓取残留与广告位，不属正文，不能当事实引用；尤其"网页已解锁"这句与文章内容毫无关系，谁抄进正文谁就带了假事实。

时效上还有一处要正：本仓按抓取日九月十六日登记，实际发布是九月十四日；引用时以九月十四日为准，不要写成十六日的消息。

### 依据
- p.3｜Sep 14, 2026, 12:27pm PDT
- p.13｜Eric Bellomo is Director of Research at The Information Pro.
- p.5｜https://www.theinformation.com/articles/numbers-behind-chinese-open-source-models-performance-adoption?rc=hsqlhb
- p.1｜网页已解锁。网页数据已解锁。 了解更多

## Q6 · 若题材是**规则 / 监管**：它说的是哪条规则的什么？

本题不适用。题材是开源与闭源模型的能力对比与开发者采用度测算，主体是基准分数、衍生模型份额、版本年龄，不涉任何规则、监管或执法。

文内确有一处"监管"字样，但只是导语列举今夏本报跑过的几条新闻线（监管、Meta 回归开源、中国实验室崛起），既未指名哪条规则，也没有主管机关、条款号或生效日。按本类口径，媒体转述不能当生效依据；此处连转述都算不上，它只碰到了"监管"这个题材词。

范围证据用于确认题材而非规则：副标题把全文主题写成"中国实验室推动开源与闭源模型能力趋同，而西方平台渐进发展"，落点是能力比较，不是合规判断。

所以什么：这一栏留空不是漏读，而是题材本身没有规则可登记。若日后要写 Meta 的开源与监管议题，须另找官方原文，本篇不作为依据。

### 依据
- p.2｜Chinese labs drive the convergence in capability between open and closed source models while Western platforms advance incrementally
- p.4｜with news on regulation, Meta Platforms’ return to open source, and the rise of Chinese labs

## Q7 · 它和**已披露内容**一致还是冲突？

逐条对下来，只有"无法对照"，没有一条能落到公司的法定披露上。

其一，129 亿美元收购 Hugging Face 与 Thinking Machines 400 亿美元潜在估值：这是本报此前报道的转述，本篇未给日期与链接；我方手头也没有这两笔的任何公告或监管文件可对，记无法对照。注意"潜在估值"属未发生项，不得写成已定价。

其二，份额与能力数字：Meta 的定期报告只泛称以开源等许可向第三方提供技术，不按模型披露使用量；阿里巴巴不在本批披露范围内。因此这些数无法与披露逐条对照——这是"无法对照"，不是"没有冲突"。

其三，叙事层：本报称开发者越来越黏住已有开源模型、新挑战者要克服惯性，这是作者对数据的解释，属记者推断，没有外部对照件。

其四，涉及 Meta 的唯一前瞻表述（Muse Spark 1.2 或开源）用条件句，与已披露计划也不构成冲突，因为公司未披露该模型的开源安排。

结论：本篇不产生与法定披露的冲突，但也不能给任何一个数字加上"已与公司披露核对"的信用。

### 依据
- p.4｜culminating with Nvidia’s \$12.9 billion purchase of the Hugging Face and the potential \$40 billion valuation for startup Thinking Machines Lab.
- p.11｜And Alibaba, the most prolific maker of open models in recent years, is by far the biggest of those three.
- p.5｜Developers increasingly stick with existing opensource models, creating inertia against new challengers.
