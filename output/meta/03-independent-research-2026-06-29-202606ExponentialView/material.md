---
id: 03-independent-research-2026-06-29-202606ExponentialView
cat: "03"
sub: independent-research
template: independent-research
template_version: 2
date: 2026-06-29
time: "00:00"
title: "Exponential View：AI 经济现状——需求、CapEx 与 Token（2026-06-25）"
kind: "independent-research"
issuer: "Exponential View / Azeem Azhar 等"
ticker: META
source_pages: 66
---

## Q1 · 他给的公司**未披露口径**的外部估算是什么？

本件主体是整个 AI 经济而非某家公司，估算全部来自一套自下而上的去重收入模型。逐项：（1）GenAI 生态收入 1,750 亿美元年化、近 12 个月 1,100 亿美元（外部估算）；口径是全球除中国、应用＋模型＋基础设施三层按增加值归属、剔除芯片与 AI 广告 uplift 与融资，样本为 1,000 家以上公司的逐条收入线，每条先做置信度打分再计入。（2）算力变现效率：全行业每 GW 数据中心容量对应收入已过 70 亿美元（外部估算），右侧轴同时给每万亿 token 收入。（3）token 体量：月度 30 个千万亿级（30Q）token、同比增长 14 倍（外部估算）。（4）价格弹性：每降价 10%，token 量增 12%–18%，总支出仍上升（外部估算，代理变量是 Google、OpenAI、火山引擎三家的价格与量）。（5）CapEx 与折旧：到 2026 年累计 2 万亿美元、比 AI 前趋势多 5,350 亿美元，2026 年折旧约 1,110 亿美元（外部估算）。判断：这些都能入格，但第（1）项没有分项拆解，只能整块引用。

### 依据
- p.4｜Generative AI ecosystem revenue has already surpassed $175 billion annualized (after removing double-counting from provider revenues).
- p.7｜$110bn trailing 12-month revenues – now at a $175bn pace
- p.3｜Bottom-up, 1,000+ firms
- p.47｜Industry-wide revenue per GW of data center capacity passed $7bn/GW.
- p.41｜Global token volumes exceed 30Q/month, growing 14x YoY
- p.44｜Across providers, magnitude of elasticity ≈ 1.2-1.8 every 10% price cut → 12–18% more tokens → total token spend still rises
- p.29｜AI-linked CapEx adds $535bn above the pre-AI trend by 2026E

## Q2 · 他的**物理量**从哪来、能不能核？

物理量有三个，可核性都不高。一是美国电网到 2030 年需要新增的负荷从 2022 年的 24GW 升到 166GW（约 7 倍），其中数据中心占约 55%；这是并网与负荷预测口径，但全件只写「Exponential View analysis」，没有给任何一份并网队列或公用事业规划文件名，记不可回溯、降旁证。二是最大数据中心的体量四年增长 50 倍，只给倍数、不给 MW，也不给站点清单，连基数都没有，无法核。三是 Nvidia 供货承诺从 310 亿升到 950 亿美元，属公司披露口径的转述，可回溯到英伟达财报/电话会，但文中未标具体文件。另有算力供给的定性说法「10 倍算力」，同样无数。判断：本件没有任何一条可以核到环评、招标或并网文件的 GW 读数，全部只能当方向；要进电力台账须另找一手。

### 依据
- p.18｜The extra electricity the US grid is expected to need by 2030 has grown ~7x since 2022 (24GW→166GW), with data centers accounting for ~55% of this growth.
- p.16｜The size of the largest data centers has grown 50x in four years
- p.18｜Nvidia supply commitments have grown from $31bn to $95bn in the last year.

## Q3 · 这份材料是**四种交付物里的哪一种**？同源的另一份是哪一份？

本份是 `original`：Exponential View 原创的英文幻灯片报告，封面署名五位作者、页脚带公司版权，正文是图表页加短标题的 deck 体，没有并列译文、也不是把长文压成要点，属原文首发。同源组：按全批统一口径，本件只有这一份，无 bilingual、translation、summary 兄弟件，不并源、不计成多个独立源。需注意一处登记差异：封面写的日期是 2026 年 6 月 25 日，本库按 6 月 29 日归档，这是同一份原文的日期标注不同，不是两份材料，引用时以封面日期为准并注明。另需注意内容边界：文末的方法与作者页、附一篇旧文摘，属载体的一部分，不是另一篇材料的拼接。

### 依据
- p.1｜The State of the AI Economy June 25, 2026
- p.1｜Azeem Azhar, William Gildea, Hannah Petrovic, PhD, Nathan Warren & Marija Gavrilov
- p.1｜Independently produced by Exponential View. Built from public disclosures and Exponential View’s own models; all conclusions are our own. © Epiiplus1 Ltd 2026
- p.64｜Methodology: How we count revenues, CapEx, tokens

## Q4 · 他的**假设与算式**能不能复算？

能复算，且内部自洽。挑最关键的一条——折旧覆盖率：文中定义余量 headroom =（收入 − 折旧）÷ 收入，2026 年折旧约 1,110 亿美元，表内给出「要留 50% 余量需 2,230 亿美元收入」，我算 1,110 ÷ 2,230 = 49.8%，通过；同页的另一组数也对得上：Q1 26 折旧占超大规模厂/neocloud GenAI 收入的 81%（余量 19%）、占全部 GenAI 收入 68%（余量 32%），1 − 0.81 = 0.19、1 − 0.68 = 0.32，两条独立表述互相印证。弹性那条也能算：降价 10% 配量增 12% 得支出 0.9 × 1.12 − 1 = +0.8%，配 18% 得 +6.2%，与「总支出仍上升」一致。去重规则同样可验：100 美元应用支出拆成 40/30/30 相加仍为 100，重复计才得 190。判断：方法与算术层都能复算，但 1,750 亿美元这个总量没有分项，无法验算其构成。

### 依据
- p.32｜The 2026E depreciation charge approaches $111 billion
- p.32｜Note: IT equipment is depreciated over 6 years, and buildings over 14 years. Required revenue values exclude OpEx.
- p.34｜Q1 26 headroom reached 19% for hyperscaler/neocloud revenues and 32% across all GenAI revenues.
- p.34｜Depreciation absorbs roughly 81% of hyperscaler/neocloud GenAI revenue and 68% of total GenAI revenue before additional costs.
- p.64｜$100 of app spend that sends $60 to a model provider which in turn spends $30 on cloud hosting for inference is attributed (in line with added value) $40/$30/$30 to sum to the same $100 without double-/triple-counting, which would otherwise result in an erroneous $190 figure.

## Q5 · 关键数字的**脚注指向哪**？

本件无编号脚注，来源以页内 `Sources:` 行给出，指向分三档。一手档：财务数据指向 SEC 的 10-K、10-Q、8-K 与高管披露，并用云归属交叉验证（OpenAI 的收入经 Azure、Anthropic 经 Bedrock 显形），这类可为 Ⅰ 档；学术与行业口径指向 Nordhaus（1996）、Brynjolfsson 等（2019）、Crafts（2004）、Graetz & Michaels（2018）、Bessen 等（2020）、Epoch AI、IAB/PwC 广告收入报告，也可为一手。二手档：聚合数如 1,750 亿美元、70 亿美元/GW、30Q token 全是自家模型输出，记 Ⅱ；公司口径引用如 Meta Q3 2025 电话会那句、皮查伊的 token 数，虽是高层原话，但属转述摘句，记 Ⅱ 偏一手。判断：本件的可信度分布很均匀——底层有一手，顶层是自建，引用顶层数时必须标「自建模型」。

### 依据
- p.64｜All figures are built bottom-up from primary and specialist sources, and triangulated against top-level estimates and proxies.
- p.64｜Revenue and CapEx are grounded on company filings (SEC 10-K, 10-Q and 8-K) and executive disclosures, cross-checked through cloud attribution (e.g. Azure and Bedrock) where a private company’s revenue appears in a public firm’s accounts.
- p.44｜Sundar Pichai Google: I/O 2025 “…we were processing 9.7 trillion tokens a month. Now, over 480 trillion — 50x more.” Price −97% | Volume 50x
- p.26｜Sources: Exponential View analysis; Bessen, Goos, Salomons & Van den Berge (2020): “What Happens to Workers at Firms that Automate?”.

## Q6 · 他的**自建口径 / 评级**定义是什么？与公司口径差多少？

本件自建口径最完整，共四把尺子，定义都写明了。（1）去重收入：同一美元在应用、模型、托管三层只按增加值归属一次（100 拆 40/30/30），并规定芯片、AI 广告 uplift、legacy 软件里的 AI 功能、融资一律不计；置信度打分是「申报数最高，其次是经交叉验证的三方估算，最后是单一来源」，派生数继承输入里最低的那一档。（2）CapEx：只算七家自建方（超大规模厂＋neocloud）的 AI 归属部分，含现金 PP&E 与租赁，且只在资产所有方计一次，承租方不重复计。（3）headroom =（收入 − 折旧）÷ 收入，IT 设备按 6 年、楼宇按 14 年折旧，数字不含运营费用。（4）质量调整 token：剔除输入与推理 token，只按输出 token 乘能力打分。与公司口径的差：公司从不披露「GenAI 收入」，Meta 的广告 uplift 被明确排除在本件收入之外，所以本件对 Meta 只贡献 CapEx 不贡献收入，方向是低估 Meta 的 AI 变现；CapEx 口径含租赁，比公司报表的「购置 PP&E」更宽。判断：跨公司比较可用，与单一公司财报并列时必须换算。

### 依据
- p.3｜Confidence-scored before it counts
- p.3｜We grade filed figures highest, above other primary sources, corroborated 3 rd-party estimates and single-sourced claims.
- p.3｜Scope: Global ex-China · App, model & infrastructure revenue counted · Excludes chips, AI ad-uplift, legacy-software features and financing.
- p.33｜Note: Meta contributes to industry CapEx but initiatives are focused on ad uplift, so not recognized as pure GenAI revenue, or currently have minimal direct monetization (e.g. Meta AI assistant, Muse Spark).
- p.38｜Range of headroom after CapEx per chip depreciation schedule Q1 2026, 3-9-year schedules, % = (Revenue – Depreciation) ÷ Revenue

## Q7 · 他**有没有投行关系 / 持仓**？

三项分开：收费顾问——有迹象（文末明确招揽 advisory 与机构咨询，并给专用邮箱）；投行关系——未声明；持仓或受资助——未声明。查了哪里：封面版权行、全篇正文、方法页与作者页、末页的订阅与dashboard 推广；全件没有 `Disclosure`、持仓、利益冲突、发行人付费任何一段。封面那句「独立制作、只用公开披露与自家模型、结论自负」是自我声明独立，不等于披露了关系，不能当「无投行关系」的证据；末页的产品推广（AI 经济看板）说明机构有付费产品，属商业关系而非投行关系。判断：收费顾问一项按「有」记，另两项按「关系不明」处理，不得假定独立；引用其看多或看空倾向时须标明这一背景。

### 依据
- p.65｜For advisory requests and institutional inquiries, please contact helen@exponentialview.co
- p.1｜Independently produced by Exponential View. Built from public disclosures and Exponential View’s own models; all conclusions are our own. © Epiiplus1 Ltd 2026
- p.66｜Subscribe to Exponential View to receive our research in your inbox each week

## Q8 · 他的**行业级判断**（产能 · 份额）有数据支撑吗？

有数，而且口径是全批里最清楚的一份。份额与比重类：AI 收入相当于美国 GDP 的 0.42%（IT 业为 9.4%）、企业利润总额是全部 GenAI 收入的 32 倍、AI 相关 CapEx 到 2026 年累计 2 万亿美元；产能与成本结构类：每美元数据中心支出里芯片占比从 40% 升到 60%、内存从约 2% 升到约 18%、英伟达供货承诺一年从 310 亿到 950 亿美元。口径写明是全球除中国、按增加值去重、CapEx 只算七家自建方，缺陷是不含中国、且份额只到「层」不到「公司」，没有单一厂商份额读数。另有一组调查数可用：标普 500 中 AI 影响提及增长 3–4 倍、其中 50%–60% 已量化、七成集中在降本；27% 的高管称 AI 达到其 ROI 预期。判断：可用作行业分母，但不能反推任何一家公司的份额；0.42% 与 32 倍是比率不是份额，别当市场份额用。

### 依据
- p.20｜Still tiny: AI revenue is equivalent to 0.42% of US GDP (vs IT sector’s 9.4%).
- p.20｜Even a generous yardstick (corporate profits) is 32x larger than all GenAI revenues.
- p.27｜Hyperscalers & neoclouds have committed to $2 trillion of cumulative CapEx to 2026
- p.17｜Each new dollar buys more silicon and less concrete: chips’ share of spend is up 50% (40%→60%).
- p.17｜Memory is the single biggest mover, from a 2% rounding error to ~18%.
- p.66｜But in more than three years since ChatGPT’s release, only 27% of executives say AI has met their ROI expectations.
