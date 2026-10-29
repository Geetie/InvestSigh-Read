---
# ── 材料身份（解析成 Material 的字段，键名不要改） ──
id: 01-10-K-2025-01-30-meta20241231
cat: 01
sub: 10-K
# ── 模板身份：这份材料是用哪一版问法生成的 ──
template: 10-K
template_version: 2
# ── 材料元信息 ──
date: 2025-01-30
time: 08:00
title: Meta Platforms 2024 财年年报（10-K）
kind: 10-K
issuer: Meta Platforms, Inc.
ticker: META
source_pages: 21
---

<!--
  填写规则（给 agent）：

  1. 答案里**不要写页码、不要写括号引用** —— 正文保持干净的书面语，页码只出现在依据区。
  2. 每一行的「### 依据」**要把它支撑这个答案的原文全部登记进来**，不是登记一段就完。
     材料里有几处支撑就登几处（不同段落、不同页都分开登），格式一行一条：- p.12｜原文片段
  3. 原文片段必须是那一页里**原样抄下来的**：不改字、不概括、不加省略号、不换语序。
     抄不出来，就回 corpus/materials/<材料 id>/content.md 里再找一遍。
  4. 找不到任何原文支撑的那一句，**从答案里删掉**，或整句改成「材料未给出此项」。
     不允许留没有原文支撑的断言。
  
-->

## Q1 · **用户与参与度的口径**是什么？**含不含新东西**（如 AI 会话）？与上期**同口径**吗？

DAP 数人不数账号，也只数四个 App 的当日访问者：某日通过移动应用或网页浏览器访问 Facebook、Instagram、Messenger、WhatsApp 任一产品的注册且已登录用户即一人；公司不要求用户使用统一标识或绑定账号，而用设备信息、IP、用户名等信号加模型把同一人的多账号归并。2024 年 12 月平均 DAP 33.5 亿人，较 2023 年 12 月的 31.9 亿增 5%；ARPP 全年 49.63 美元、同比 +15%，口径是 FoA 季度收入除以季初末 DAP 均值。两者增速差 10 个百分点（计算值），说明当年收入增长更多来自单人变现而非人数。

AI 会话等新东西不计入，也没有单列。查了 Item 1 的 AI 段（Meta AI 被描述为跨 App、Ray-Ban Meta 眼镜与网页的助手，材料没有给它单列产品指标）、MD&A 的 DAP 定义段、Limitations of Key Metrics 的 Family 列举，计数单位始终是「人访问四个 App」；定义句明确其他产品的用户不计入，除非其在本 Family 产品上的其他活动使其另行达标——即当天仍须访问四个 App 之一。眼镜端的 Meta AI 使用、WhatsApp 上的 AI 对话都不在分子里，也没有会话数、调用量这类指标可替代。

可比性要分两段看：DAP 自 2023 年四季度起不再含 Messenger Kids，故 2024 与 2023 同口径，再往前不可直接比；ARPP 定义自 2024 年一季度变更并已重述上期，故 ARPP 可跨年比。公司自估 DAP 误差约为全球 DAP 的 3%，5% 的增幅约为误差的 1.7 倍（计算值），方向可信但幅度不算大；ARPP +15% 则明显超出误差范围，是更硬的读数。

### 依据
- p.9｜We define a daily active person as a registered and logged-in user of Facebook, Instagram, Messenger, and/or WhatsApp (collectively, our "Family" of products) who visited at least one of these Family products through a mobile device application or using a web or mobile browser on a given day.
- p.9｜We do not require people to use a common identifier or link their accounts to use multiple products in our Family, and therefore must seek to attribute multiple user accounts within and across products to individual people.
- p.9｜Our calculations of DAP rely upon complex techniques, algorithms, and machine learning models that seek to estimate the underlying number of unique people using one or more of these products, including by matching user accounts within an individual product and across multiple products when we believe they are attributable to a single person, and counting such group of accounts as one person.
- p.9｜Worldwide DAP increased 5% to 3.35&#160;billion on average during December 2024 from 3.19&#160;billion during December 2023.
- p.9｜Beginning in the fourth quarter of 2023, our Family metrics no longer include Messenger Kids users.
- p.9｜We define ARPP as our FoA revenue during a given quarter, divided by the average of the number of DAP at the beginning and end of the quarter.
- p.9｜Our annual worldwide ARPP in 2024, which represents the sum of quarterly ARPP during such period, was $49.63, an increase of 15% from 2023.
- p.9｜Note: We updated our definition of ARPP beginning in the first quarter of 2024 and have recast ARPP in prior periods for comparative purposes.
- p.9｜The numbers for our key Family metrics, our DAP and average revenue per person (ARPP), do not include users on our other products unless they would otherwise qualify as DAP based on their other activities on our Family products.
- p.9｜we estimate that such margin generally will be approximately 3% of our worldwide DAP
- p.3｜Meta AI is an assistant that's available across our apps, on Ray-Ban Meta AI glasses and on the web.
- p.2｜We report our estimates of the numbers of our daily active people (DAP) and average revenue per person (ARPP) (collectively, our "Family metrics") based on the activity of users who visited at least one of Facebook, Instagram, Messenger, and WhatsApp (collectively, our "Family" of products) during the applicable period of measurement.


## Q2 · 收入的期间变化里，**价格 / 数量 / 新产品各贡献多少**？

按来源只有两条腿，广告几乎是全部（百万美元，2024 对 2023）：Advertising 160,633 对 131,948，+22%、增 28,685；Other revenue 1,722 对 1,058，+63%、增 664；Total revenue 164,501 对 134,902，+22%、增 29,599。广告贡献总收入增量的 96.9%，非广告合计 3.1%（其中 Other revenue 2.2%、Reality Labs 0.8%，计算值）。

量价可以拆开：全年 ad impressions +11%，average price per ad +10%，口径是广告收入除以展示次数。两者是乘法——1.11×1.10≈1.221，与广告收入 21.7% 的增速吻合（计算值）；写成 11%+10%=21% 会低估，因为提价被新增展示摊薄了一部分。展示增长集中在亚太与 Rest of World，公司归因于用户与参与度上升；提价来自广告需求与投放、度量工具改善，但被两件事部分抵消：低变现地区的展示占比上升、以及 Reels 这类低变现产品的占比上升。分区域看收入增速，美加 18%、欧洲 26%、亚太 22%、其他 31%——低变现地区长得更快，这本身就在压均价。

新产品未单列：收入表只有 Advertising 与 Other revenue 两行，Reels、Threads、Meta AI 带来的广告都落在广告行内，没有产品维度的金额或增速。文字只说 Reels 变现率低于 Feed 与 Stories，且明示无法量化各趋势对广告收入的影响。唯一被点名的贡献项是垂直行业——线上 commerce 是 2024 年广告收入增量的最大来源，这不是产品口径。

判断：增长以量为主（11 个百分点）、价为辅（10 个百分点），且 10% 是净额。22% 的总收入增速里，广告之外只贡献 0.7 个百分点（914÷134,902，计算值），所以这是单一引擎的增长，量的部分来自低变现地区，意味着同样的展示增长换来的收入低于成熟市场。

### 依据
- p.9｜The following table sets forth our revenue by source and by segment:
- p.9｜Advertising $ 160,633&#160; $ 131,948&#160; $ 113,642&#160; 22&#160; % 16&#160; %
- p.9｜Other revenue 1,722&#160; 1,058&#160; 808&#160; 63&#160; % 31&#160; %
- p.9｜Total revenue $ 164,501&#160; $ 134,902&#160; $ 116,609&#160; 22&#160; % 16&#160; %
- p.9｜Advertising revenue in 2024 increased $28.68&#160;billion, or 22%, compared to 2023 due to increases in ad impressions delivered and average price per ad.
- p.9｜In 2024, ad impressions delivered increased by 11%, as compared with a 28% increase in 2023, year-over-year.
- p.9｜In 2024, the average price per ad increased by 10%, as compared with a decrease of 9% in 2023, year-over-year.
- p.9｜We calculate average price per ad as total advertising revenue divided by the number of ads delivered
- p.9｜Ad impressions delivered during 2024 grew in all regions, especially in Asia-Pacific and Rest of World, which was mostly driven by increases in users and their engagement on our products.
- p.9｜The increase in average price per ad in 2024 was driven by an increase in advertising demand, which we believe is mainly due to ongoing improvements to our ad performance from our ad targeting and measurement tools.
- p.9｜This increase was partially offset by a higher number of ad impressions delivered, especially in geographies and in products, such as Reels, that monetize at lower rates.
- p.9｜In addition, the online commerce vertical was the largest contributor to the increase in advertising revenue in 2024 compared to 2023.
- p.9｜As a result, it is difficult to identify with precision which advertiser spending decisions are attributable to which trends, and we are unable to quantify the exact impact that each trend had on our advertising revenue during the periods presented.
- p.9｜In 2024, revenue increased by 18% in United States & Canada, 26% in Europe, 22% in Asia-Pacific, and 31% in Rest of World, in each case relative to 2023.
- p.9｜Our revenue in regions such as United States & Canada and Europe is relatively higher primarily due to the size and maturity of those online and mobile advertising markets, and ad impression growth is primarily in geographies that monetize at lower rates, such as Asia-Pacific and Rest of World.
- p.9｜while Reels is growing in usage, it monetizes at a lower rate than our Feed and Stories products


## Q3 · **广告之外的腿**（订阅 / 企业 / 卖算力）有没有被拆出来？

报表上广告之外只有两条可核的腿，没有第三条。Other revenue 2024 年 17.22 亿美元、2023 年 10.58 亿，+63%、增 6.64 亿，占总收入 1.0%；Reality Labs 收入（Quest 与 Ray-Ban Meta 眼镜等硬件及相关软件内容）21.46 亿、上年 18.96 亿，+13%、增 2.50 亿，占 1.3%。两条合计 38.68 亿、占 2.35%，广告占 97.65%；上年两条合计 29.54 亿、占 2.19%（计算值），一年只挪 0.16 个百分点。

三项候选都没有单独金额。Meta Verified 只在 Other revenue 的定义里被点名，全篇无金额；WhatsApp Business Platform（企业消息）被指为 Other revenue 增长的主因，但也只有一句归因、无单列数；卖算力与企业 AI 连收入口径都没有，材料未给出此项——查了收入来源表、Other revenue 的定义与归因段、分部附注，收入只按 Advertising、Other revenue、FoA、Reality Labs 四行拆，没有云、算力或企业软件行。

它不能读成订阅收入：Other revenue 由 WhatsApp Business Platform、Meta Verified 订阅、Payments 基础设施净费与 various other sources 四类合成一行，其中 Payments 部分还是净额确认。

判断：增速 63% 在报表上最亮，但基数只有 17 亿，绝对增额 6.64 亿相当于广告增量的 1/43；两条非广告腿合计只解释了 22% 总收入增速里的 0.7 个百分点（914÷134,902，计算值）。结构上没有第二增长曲线，广告周期仍无法对冲。

### 依据
- p.9｜The following table sets forth our revenue by source and by segment:
- p.9｜Advertising $ 160,633&#160; $ 131,948&#160; $ 113,642&#160; 22&#160; % 16&#160; %
- p.9｜Other revenue 1,722&#160; 1,058&#160; 808&#160; 63&#160; % 31&#160; %
- p.9｜Family of Apps 162,355&#160; 133,006&#160; 114,450&#160; 22&#160; % 16&#160; %
- p.9｜Reality Labs 2,146&#160; 1,896&#160; 2,159&#160; 13&#160; % (12) %
- p.9｜Total revenue $ 164,501&#160; $ 134,902&#160; $ 116,609&#160; 22&#160; % 16&#160; %
- p.9｜Other revenue consists of revenue from WhatsApp Business Platform, Meta Verified subscriptions, net fees we receive from developers using our Payments infrastructure, and revenue from various other sources.
- p.9｜FoA other revenue in 2024 increased $664 million, or 63%, compared to 2023. The increase was primarily driven by WhatsApp Business Platform revenue.
- p.9｜RL revenue in 2024 increased $250&#160;million, or 13%, compared to 2023. The increase was mostly due to an increase in RL consumer hardware products sold.
- p.9｜RL revenue is generated from the delivery of consumer hardware products, such as Meta Quest and Ray-Ban Meta AI glasses, and related software and content.
- p.9｜Note: Non-advertising revenue includes RL revenue generated from the delivery of consumer hardware products and FoA Other revenue, which consists of revenue from WhatsApp Business Platform, Meta Verified subscriptions, net fees we receive from developers using our Payments infrastructure, and revenue from various other sources.
- p.11｜FoA other revenue consists of revenue from WhatsApp Business Platform, Meta Verified subscriptions, net fees we receive from developers using our Payments infrastructure, and revenue from various other sources.


## Q4 · **折旧寿命与残值**原文是多少（**分档吗**）？**估计的假设这期变了多少**？敏感性给了吗？

寿命分五档，服务器一档是区间且带脚注。2024 年 12 月 31 日口径：servers and network assets 四至五年（脚注：2025 年 1 月起部分延长至 5.5 年）、buildings 25 至 30 年、equipment and other 1 至 25 年、finance lease ROU assets 5 至 20 年、leasehold improvements 取可使用年限与剩余租赁期孰短、不给年数；折旧用直线法，摊销期取两者孰短。服务器是唯一带脚注的一档，也是区间最窄的一档（4–5 年）。

本期变更：2025 年 1 月完成评估，把部分服务器与网络资产的寿命延长到 5.5 年，2025 财年起生效；以 2024 年末已投用资产测算，预计减少 2025 年折旧费用约 29 亿美元。变更前的区间是 4–5 年，5.5 年是抬上限、不是把全部资产统一到 5.5 年——脚注写 certain servers and network assets，表内仍是四至五年。

敏感性未给：材料只有「估计可能与实际寿命不同」的原则句，没有 ±1 年重算表；MD&A 把关键会计估计限定为 loss contingencies、income taxes、valuation of assets，寿命不在其中，只在 Change in Accounting Estimate 段给了单点影响。残值也未给：查了 Note 1 的 Property and Equipment 政策整段与 MD&A 关键会计估计，没有 residual value 或 salvage value 的数字；该词只出现在减值测试的假设列举（residual value of asset groups）和租赁段「租约一般不含重大残值担保」，都不是折旧残值。

判断：29 亿相当于 2024 年折旧摊销 154.98 亿的 18.7%、净利 623.60 亿的 4.6%（计算值），是把费用后移到 2025 年及以后、直接托举下一年利润，而不是资产变便宜。2024 年折旧摊销已从 111.78 亿增到 154.98 亿、增 38.7%，资产基数扩张快于寿命延长，长期折旧压力是升不是降。

### 依据
- p.11｜Property and equipment, including finance leases, are depreciated and stated at cost less accumulated depreciation. Depreciation is computed using the straight-line method over the estimated useful lives of the assets or the remaining lease term, whichever is shorter.
- p.11｜Servers and network assets Four to Five years (1) Buildings 25 to 30 years Equipment and other One to 25 years Finance lease right-of-use assets Five to 20 years Leasehold improvements Lesser of estimated useful life or remaining lease term
- p.11｜Effective January 2025, the useful lives of certain servers and network assets are extended to 5.5 years.
- p.9｜In January 2025, we completed an assessment of the useful lives of certain servers and network assets, which resulted in an increase in their estimated useful life to 5.5 years, effective beginning fiscal year 2025. Based on the servers and network assets placed in service as of December 31, 2024, we expect this change in accounting estimate will reduce our full-year 2025 depreciation expense by approximately $2.9 billion.
- p.11｜In January 2025, we completed an assessment of the useful lives of certain servers and network assets, and determined we should extend the estimated useful lives to 5.5 years.
- p.11｜the remaining carrying amount of the asset is accounted for prospectively and depreciated or amortized over the revised estimated useful life.
- p.11｜Our estimate of useful lives represents the best estimate of the useful lives based on current facts and circumstances, but may differ from the actual useful lives due to changes to our business operations, changes in the planned use of assets, and technological advancements.
- p.9｜We believe that the estimates and assumptions associated with loss contingencies, income taxes, and valuation of assets, when applicable, have the greatest potential impact on our consolidated financial statements.
- p.9｜The valuation and impairment assessment of certain assets, including recoverability, requires significant judgment and assumptions such as estimation of future cash flows, discount rates, market data of comparable assets and companies, holding period and residual value of asset groups, among others.
- p.11｜Our lease agreements generally do not contain any material residual value guarantees or material restrictive covenants.
- p.11｜Depreciation and amortization 15,498 &#160; 11,178 &#160; 8,686 &#160; Share-based compensation 16,690
- p.11｜Net income $ 62,360 &#160; $ 39,098 &#160; $ 23,200


## Q5 · **人力成本与股份支付**怎么拆（提效体现在哪一行）？

费用行（百万美元，2024 对 2023）：cost of revenue 30,161 对 25,959、增 16%；research and development 43,873 对 38,483、增 14%；marketing and sales 11,347 对 12,301、减 8%；general and administrative 9,740 对 11,408、减 15%；合计 95,121 对 88,151、增 8%；收入 164,501、增 22%。四行费用增速都低于收入 22%，营业利润率由 35% 升到 42%。

人力拆法：四行都含 employee compensation，口径是 payroll、share-based compensation、benefits 三块同锅；研发与营销以它为主，行政也以它为主，成本行只是其中一项（另含数据中心、带宽、伙伴成本）。因此材料没有把每行的工资、股份支付、福利再拆开，现金人力成本无法单独取出——只能从人数与 SBC 两个侧面反推。全公司 74,067 人、同比 +10%，研发口径工程与技术岗人数 +13%，高于总人数增速。

股份支付：2024 年确认 16,690 百万美元（2023 年 14,027、2022 年 11,992），占 95,121 百万总成本费用的 17.5%（计算值）；分行为研发 13,683、成本 1,055、销售 1,026、行政 926，研发占 82%（计算值）。未确认 RSU 费用 347.9 亿美元，按归属条件约三年确认；RSU 服务期一般为四年。SBC 是非现金，不能与现金人力成本相加，否则重复计算。

提效体现在哪：表面看是 marketing and sales（−8%）与 G&A（−15%）两行，但公司把两者的下降分别归因于重组费用减少、以及 G&A 里 15.5 亿美元的法务相关成本有利影响，不是裁人——同期人数还增了 10%。研发 +14% 与研发口径人数 +13% 接近，人均费用没有明显扩张（研发费用还含基础设施成本，这只是近似）；真正拉起利润率的是收入 +22% 对总成本 +8% 的杠杆，叠加 2024 年重组与法务基数较低。这不是人力效率的改善，可持续性要看 2025 年这些基数是否回补。

### 依据
- p.9｜Total revenue $ 164,501&#160; $ 134,902&#160; $ 116,609&#160; 22&#160; % 16&#160; %
- p.9｜Cost of revenue $ 30,161&#160; $ 25,959&#160; $ 25,249&#160; 16&#160; % 3&#160; %
- p.9｜Research and development $ 43,873&#160; $ 38,483&#160; $ 35,338&#160; 14&#160; % 9&#160; %
- p.9｜Marketing and sales $ 11,347&#160; $ 12,301&#160; $ 15,262&#160; (8) % (19) %
- p.9｜General and administrative $ 9,740&#160; $ 11,408&#160; $ 11,816&#160; (15) % (3) %
- p.9｜Cost of revenue. Our cost of revenue consists of expenses associated with the delivery and distribution of our products. These mainly include expenses related to the operation of our data centers and technical infrastructure, such as depreciation expense from servers, network infrastructure and buildings, employee compensation which includes payroll, share-based compensation and benefits for employees on our operations teams, and energy and bandwidth costs.
- p.9｜Research and development expenses consist mostly of employee compensation which includes payroll, share-based compensation and benefits for our employees on our engineering and technical teams who are responsible for developing new technologies and products; RL technology development costs; infrastructure costs; and facilities-related costs.
- p.9｜Marketing and sales. Marketing and sales expenses consist primarily of employee compensation which includes payroll, share-based compensation and benefits for our employees engaged in sales, sales support, marketing, business development, and customer service functions; marketing and promotional expenses; and professional services to support our community and product operations.
- p.9｜General and administrative. General and administrative expenses consist primarily of employee compensation which includes payroll, share-based compensation and benefits for certain of our executives as well as our legal, finance, human resources, corporate communications and policy, and other administrative employees; legal-related costs, which include estimated fines, settlements, or other losses in connection with legal and related matters, as well as other legal fees; other taxes, such as digital services taxes and other non-income-based tax levies; and professional services.
- p.9｜Marketing and sales expenses in 2024 decreased $954&#160;million, or 8%, compared to 2023. The decrease was primarily due to lower restructuring charges and, to a lesser extent, a decrease in employee compensation.
- p.9｜General and administrative expenses in 2024 decreased $1.67 billion, or 15%, compared to 2023. The decrease was mostly driven by a favorable impact of $1.55 billion in legal-related costs.
- p.9｜The higher employee compensation was mainly from a 13% growth in employee headcount from 2023 to 2024 in engineering and other technical functions
- p.9｜Headcount was 74,067 as of December&#160;31, 2024, an increase of 10% year-over-year.
- p.9｜Operating margin 54&#160; % 47&#160; % (826) % (850) % 42&#160; % 35&#160; %
- p.11｜Cost of revenue $ 1,055 &#160; $ 740 &#160; $ 768 &#160; Research and development 13,683 &#160; 11,429 &#160; 9,361 &#160; Marketing and sales 1,026 &#160; 952 &#160; 1,004 &#160; General and administrative 926 &#160; 906 &#160; 859 &#160; Total $ 16,690
- p.11｜As of December&#160;31, 2024, there was $ 34.79 &#160;billion of unrecognized share-based compensation expense related to RSU awards. This unrecognized compensation expense is expected to be recognized over a weighted-average period of approximately three years
- p.11｜In general, our RSUs vest over a service period of four years


## Q6 · **资本支出的承诺**是多少？**钱从哪来、干什么用**？

不可撤销合同承诺 328.24 亿美元（2024 年末），主要是服务器与网络基础设施、内容成本。分年（百万美元）：2025 年 26,335、2026 年 2,548、2027 年 812、2028 年 227、2029 年 153、Thereafter 2,749、合计 32,824。2025 年一年占 80.2%（计算值），承诺高度集中在 12 个月内。表外另有两项，不与前者相加：经营租赁负债（非流动 182.92 亿 + 流动 19.42 亿）、可再生能源协议约 249.7 亿美元（大部分五年后到期，且无固定或最低采购量）。

钱从哪来：2024 年末现金及有价证券 778.1 亿、经营现金流 913.28 亿、自由现金流 521.03 亿；长期债务账面 288.26 亿（本金 290 亿，2027–2064 到期），2024 年 8 月发债净得 104.3 亿。用途：2024 年资本开支 392.3 亿（含融资租赁本金），2025 年指引 600–650 亿，用于核心业务与生成式 AI；物业端自有 27 个数据中心并少量租赁。

判断：2025 年到期的硬承诺 263.35 亿只占资本开支指引下限 600 亿的 43.9%（计算值），其余靠年度采购订单滚动，承诺表低估了实际年度支出强度，不能反过来当作「2025 年只花 263 亿」。经营现金流对指引上限 650 亿的覆盖是 1.40 倍（计算值），融资缺口不大；但资本开支比 2024 年实际跳增 53%–66%，若现金流不增、资本开支取上限，自由现金流会从 521 亿降到约 263 亿（计算值，未计融资租赁本金），这是当年最大的现金去向变化。

### 依据
- p.11｜We have $ 32.82 &#160;billion of non-cancelable contractual commitments as of December&#160;31, 2024, which are primarily related to our investments in servers and network infrastructure, and content costs.
- p.11｜The following is a schedule, by years, of non-cancelable contractual commitments as of December&#160;31, 2024 (in millions): 2025 $ 26,335 &#160; 2026 2,548 &#160; 2027 812 &#160; 2028 227 &#160; 2029 153 &#160; Thereafter 2,749 &#160; Total $ 32,824
- p.11｜the total estimated spend related to our renewable energy agreements as of December&#160;31, 2024 was approximately $ 24.97 &#160;billion, a majority of which is due beyond five years
- p.9｜Cash, cash equivalents, and marketable securities were $77.81 billion as of December&#160;31, 2024, an increase of $12.41&#160;billion from December&#160;31, 2023.
- p.9｜Net cash provided by operating activities $ 91,328&#160; $ 71,113&#160; $ 50,475&#160; Net cash used in investing activities $ (47,150) $ (24,495) $ (28,970)
- p.9｜Free cash flow $ 52,103&#160; $ 43,010&#160; $ 18,439
- p.9｜Capital expenditures, including principal payments on finance leases, were $39.23&#160;billion for the year ended December&#160;31, 2024.
- p.9｜We anticipate making capital expenditures of approximately $60&#160;billion to $65&#160;billion in 2025 to support our core business and generative AI efforts.
- p.9｜As of December&#160;31, 2024, we had outstanding long-term debt in the form of senior unsecured notes for an aggregate principal amount of $29.0&#160;billion, which mature from 2027 through 2064.
- p.9｜We currently anticipate that our available funds and cash flow from operations and financing activities will be sufficient to meet our operational cash needs and fund our investments in infrastructure and AI initiatives, share repurchases and dividend payments for at least the next 12&#160;months and thereafter for the foreseeable future.
- p.11｜Operating lease liabilities, non-current 18,292 &#160; 17,226 &#160; Long-term debt 28,826 &#160; 18,385
- p.11｜Operating lease liabilities, current 1,942 &#160; 1,623 &#160;
- p.6｜We own 27&#160;data center locations globally and we also lease some data centers at selected locations.


## Q7 · **回购**做了多少？**授权还剩多少**？股本是**净增还是净减**？

2024 年回购并注销 Class A 6,500 万股、297.5 亿美元（含 1% 消费税），均价约 457.7 美元/股（计算值）；四季度无回购，节奏集中在前三季。现金流量表口径的付现是 301.3 亿，比权责口径多 3,800 万，差额材料未解释，引用时不要混用两个数。

授权：2017 年 1 月起、无到期日。2023 年末剩余 309.3 亿，2024 年 1 月新增授权 500 亿，2024 年末剩余 512.8 亿。期初 309.3 + 新增 500 − 回购 297.5 = 511.8，与披露的 512.8 差 1 亿（计算值），在两项各自只披露到 0.1 亿美元的精度内，量级可忽略；材料未披露授权总额。

股本净减：Class A 由 22.11 亿股降至 21.90 亿股，Class B 由 3.50 亿股降至 3.44 亿股，合计 25.61 亿股降至 25.34 亿股，净减 2,700 万股、1.1%（计算值）。同期发行 6,500 万股、净额结算代扣 2,700 万股，与回购 6,500 万股相抵正好 −2,700 万（计算值）。

股利另计：2024 年 2 月起四个季度各 0.50 美元，全年每股 2.00 美元，支付 50.7 亿（Class A 43.8 亿、Class B 6.91 亿），不与回购混算。

判断：回购量恰好等于当年股权激励发行量，真正让股本下降的只有 2,700 万股代扣；297.5 亿美元换来 1.1% 的股本收缩，实质是对冲稀释而非缩股。剩余 512.8 亿按 2024 年节奏可支撑约 1.7 年（计算值）。回购均价 457.7 美元低于年末收盘 585.51 美元，执行价格不算差。

### 依据
- p.9｜In 2024, we repurchased and subsequently retired 65&#160;million shares of our Class&#160;A common stock for an aggregate amount of $29.75&#160;billion. As of December&#160;31, 2024, $51.28&#160;billion remained available and authorized for repurchases.
- p.11｜As of December&#160;31, 2023, $ 30.93 &#160;billion remained available and authorized for repurchases under this program. In January 2024, an additional $ 50 billion of repurchases was authorized under this program.
- p.11｜In 2024, we repurchased and subsequently retired 65 &#160;million shares of our Class&#160;A common stock for an aggregate amount of $ 29.75 &#160;billion, which includes the 1% excise tax accruals as a result of the Inflation Reduction Act of 2022. As of December&#160;31, 2024, $ 51.28 &#160;billion remained available and authorized for repurchases.
- p.8｜We had no share repurchase activity for the three months ended December&#160;31, 2024.
- p.11｜Common stock, $ 0.000006 par value; 5,000 million Class A shares authorized, 2,190 million and 2,211 million shares issued and outstanding, as of December&#160;31, 2024 and 2023, respectively; 4,141 million Class B shares authorized, 344 million and 350 million shares issued and outstanding, as of December&#160;31, 2024 and 2023, respectively
- p.11｜Balances at December 31, 2023 2,561 &#160; &#8212; &#160; 73,253 &#160; ( 2,155 ) 82,070 &#160; 153,168 &#160; Issuance of common stock 65 &#160; &#8212;&#160; &#8212;&#160; &#8212;&#160; &#8212;&#160; &#8212;&#160; Shares withheld related to net share settlement ( 27 ) &#8212;&#160; ( 6,721 ) &#8212;&#160; ( 7,049 ) ( 13,770 ) Share-based compensation &#8212;&#160; &#8212;&#160; 16,690 &#160; &#8212;&#160; &#8212;&#160; 16,690 &#160; Share repurchases ( 65 )
- p.9｜We paid four quarterly cash dividends, including dividend equivalents, totaling $2.00 for each share of Class A and Class B common stock during the year ended December&#160;31, 2024.
- p.8｜During the year ended December&#160;31, 2024, total dividend and dividend equivalent payments were $4.38 billion and $691 million for Class A and Class B common stock, respectively.
- p.8｜Beginning in February 2024, our board of directors declared a quarterly cash dividend of $0.50 per share to the holders of our Class A and Class B common stock.
- p.8｜the closing price of our Class&#160;A common stock was $585.51 per share as reported on the Nasdaq Global Select Market
- p.9｜Cash used in financing activities during 2024 mostly consisted of $30.13&#160;billion for repurchases of our Class&#160;A common stock


## Q8 · **亏损业务分部**的收入与亏损**环比方向**？分部**定义改了吗**（能否相减）？

Reality Labs 2024 年收入 21.46 亿美元、2023 年 18.96 亿，+13%、增 2.50 亿，增量来自消费硬件销量增加；成本费用 198.75 亿、上年 180.16 亿，+10%；营业亏损 177.29 亿、上年 161.20 亿，扩大 16.09 亿、10%；营业利润率 (826)%、上年 (850)%，亏损率收窄 24 个百分点。亏损额是收入的 8.3 倍（计算值），收入规模远不足以覆盖成本。

对照 Family of Apps：收入 1,623.55 亿、+22%，成本 752.46 亿、+7%，营业利润 871.09 亿、+39%，利润率 54%、上年 47%。全公司营业利润 693.80 亿、+48%，RL 亏掉的部分相当于 FoA 营业利润的 20.4%（计算值）；合并营业利润率由 35% 升到 42%，靠的是 FoA 收入增 22% 而成本只增 7%。

方向要分两层说：年报只有年度口径，MD&A 与分部附注都没有 RL 的分季度数，单季环比未见，只能按 2024 对 2023 年度比。年度上亏损额在扩大、亏损率在收窄，两者不矛盾——收入长得比成本快，但基数太小，亏损率的改善不足以让亏损额转向；公司明说 2025 年 RL 经营亏损还会增加，所以这不是投入峰值已过。

分部定义未改：两个 reportable segments 为 FoA（Facebook、Instagram、Messenger、WhatsApp 及其他服务）与 RL（虚拟、增强与混合现实相关消费硬件、软件与内容），operating segments 与 reportable segments 相同；查了 MD&A 分部段、分部附注、会计政策的分部表述，未见本期重分类或改分摊。可相减：162,355+2,146=164,501，87,109−17,729=69,380，与合并数逐项吻合。

### 依据
- p.9｜We report our financial results for our two reportable segments: Family of Apps (FoA) and Reality Labs (RL). FoA includes Facebook, Instagram, Messenger, WhatsApp, and other services. RL includes our virtual, augmented, and mixed reality related consumer hardware, software, and content.
- p.9｜Revenue $ 162,355&#160; $ 133,006&#160; 22% $ 2,146&#160; $ 1,896&#160; 13% $ 164,501&#160; $ 134,902&#160; 22%
- p.9｜Costs and expenses 75,246&#160; 70,135&#160; 7% 19,875&#160; 18,016&#160; 10% 95,121&#160; 88,151&#160; 8%
- p.9｜Income (loss) from operations $ 87,109&#160; $ 62,871&#160; 39% $ (17,729) $ (16,120) (10)% $ 69,380&#160; $ 46,751&#160; 48%
- p.9｜Operating margin 54&#160; % 47&#160; % (826) % (850) % 42&#160; % 35&#160; %
- p.9｜RL revenue in 2024 increased $250&#160;million, or 13%, compared to 2023. The increase was mostly due to an increase in RL consumer hardware products sold.
- p.9｜In 2024, our RL segment reduced our overall operating profit by approximately $17.73 billion, and we continue to expect our RL operating losses to increase in 2025.
- p.9｜FoA income from operations in 2024 increased $24.24&#160;billion, or 39%, compared to 2023.
- p.11｜We report our financial results for our two reportable segments: Family of Apps (FoA) and Reality Labs (RL). FoA includes Facebook, Instagram, Messenger, WhatsApp, and other services. RL includes our virtual, augmented, and mixed reality related consumer hardware, software, and content. Our operating segments are the same as our reportable segments.
- p.11｜Revenue $ 162,355 &#160; $ 133,006 &#160; $ 114,450
- p.11｜Income from operations $ 87,109 &#160; $ 62,871 &#160; $ 42,661
- p.11｜Loss from operations $ ( 17,729 ) $ ( 16,120 ) $ ( 13,717 )


## Q9 · **诉讼与监管**的**阶段与求偿额**？会不会变成可计量负债？

金额已落地的三笔：隐私集体诉讼 7.25 亿美元和解，2023 年 10 月 10 日获批、2023 年 11 月已付，仅剩异议人上诉（一名 2024 年 6 月 24 日撤回），2025 年 2 月 7 日开庭；FTC 和解的 50 亿美元罚金 2020 年 4 月已缴；爱尔兰数据保护委员会 2023 年 5 月 12 日 12 亿欧元罚款，已上诉、获爱尔兰高等法院临时中止。

仍在走的三条主线：一是 FTC 修改同意令的行政程序，2023 年 5 月 3 日发起，2025 年 1 月 10 日委员会就门槛法律问题裁定其有法定权限修改同意令，但该裁定受制于哥伦比亚特区巡回法院的管辖挑战（2024 年 11 月 5 日已庭辩、尚未裁决），可能的结果是业务限制（未成年人数据商用、董事会构成、新产品上线）而非罚款；二是 FTC 反垄断案，2024 年 11 月 13 日部分驳回双方简易判决动议，2025 年 4 月 14 日开庭，FTC 寻求的救济包括分拆或重组 Instagram 与 WhatsApp——这是唯一可能改变公司结构的案子；三是欧盟委员会 2024 年 11 月 18 日 Marketplace 7.98 亿欧元罚款，2025 年 1 月 28 日已上诉。

青少年与内容监管：2022 年 10 月 6 日联邦案件并入加州北区 MDL；2024 年 11 月起数千名个人发集体仲裁请求；新墨西哥州总检察长案 2025 年 12 月 1 日开庭；欧盟 2024 年 5 月 16 日与 4 月 30 日两个 DSA 正式程序；CFPB 2024 年 9 月 18 日启动 NORA；另有 Delaware 股东派生诉讼 2025 年 4 月 2 日开庭。这些都没有求偿额，属于「未给金额」。

会不会变成可计量负债：会计上仅「很可能且能合理估计」才计提。公司已就欧洲监管事项计提重大金额，并称可能还需追加且单项或合计都可能重大；其余事项要么无法估计、要么单项不重要但合计可能重大，没有给区间。IRS 转移定价两笔通知在税务法院，若败诉可能追加约 90 亿（2010 年）与 6.8 亿（2011–2013 年），另加利息罚款，税务法院预计 2025 年出意见——这是金额最可量化的一块，但仍是主张额不是负债。

判断：已落地的 7.25 亿 + 50 亿 + 12 亿欧元是历史成本，不再是变量；真正的敞口在 FTC 反垄断救济（非金钱、可致分拆）、FTC 修改同意令（可致业务限制）与青少年诉讼（无金额、可聚合）。未计提不等于不会赔，最近的观察窗口是 2025 年 4 月的反垄断开庭、税务法院意见与各和解的批准。

### 依据
- p.7｜on May 12, 2023, the IDPC issued a Final Decision concluding that Meta Platforms Ireland's reliance on Standard Contractual Clauses
- p.7｜On May 3, 2023, the FTC filed a public administrative proceeding ( In the Matter of Facebook, Inc. ) seeking substantial changes to the modified consent order
- p.7｜The underlying appeal was then briefed and oral argument was held on November 5, 2024. The U.S. Court of Appeals for the District of Columbia Circuit has yet to rule.
- p.7｜On October&#160;6, 2022, the U.S. federal cases were centralized in the U.S. District Court for the Northern District of California
- p.7｜On December&#160;22, 2022, the parties entered into a settlement agreement to resolve the lawsuit, which provides for a payment of $725&#160;million by us. The settlement was approved by the court on October&#160;10, 2023, and the payment was made in November 2023.
- p.7｜Two objectors appealed final approval (one of which was voluntarily dismissed as of June 24, 2024). The objection is fully briefed and will be heard on February 7, 2025.
- p.11｜Among other matters, our settlement with the FTC required us to pay a penalty of $ 5.0 &#160;billion which was paid in April 2020 upon the effectiveness of the modified consent order.
- p.7｜The IDPC issued an administrative fine of EUR &#8364;1.2&#160;billion as well as corrective orders requiring Meta Platforms Ireland to suspend the relevant transfers and to bring its processing operations into compliance with Chapter V GDPR by ceasing the unlawful processing, including storage, of such data in the United States. We are appealing this Final Decision and it is currently subject to an interim stay from the Irish High Court.
- p.7｜On January 10, 2025, the Commission issued a decision on certain threshold legal issues, including that the Commission has statutory authority to modify consent orders.
- p.7｜On November 13, 2024, the court granted in part and denied in part both our and the FTC&#8217;s motions for summary judgment. Trial is set to begin on April 14, 2025.
- p.7｜The FTC sought a permanent injunction against our company's alleged violations of the antitrust laws, and other equitable relief, including divestiture or reconstruction of Instagram and WhatsApp.
- p.7｜On November 18, 2024, the European Commission issued a decision that Meta infringed Article 102 on the Treaty of the Functioning of the European Union in relation to certain alleged business practices relating to Facebook Marketplace and imposed a fine of approximately EUR &#8364;798&#160;million. We appealed the European Commission's decision on January 28, 2025.
- p.7｜Trial in the New Mexico Attorney General's case is scheduled to begin on December 1, 2025.
- p.7｜Beginning in November 2024, counsel for thousands of individual claimants began sending mass arbitration demands relating to "social media addiction" and related harms allegedly caused by Instagram.
- p.7｜On May 16, 2024, the European Commission opened formal proceedings assessing our compliance with certain requirements under Articles 28, 34, and 35 of the Digital Services Act (DSA)
- p.7｜On April 30, 2024, the European Commission opened formal proceedings against us to assess Facebook and Instagram's compliance with certain requirements under Articles 14, 16, 17, 20, 24, 25, 34, 35, and 40 of the DSA
- p.7｜On September 18, 2024, staff of the Consumer Financial Protection Bureau (CFPB or Bureau) initiated a Notice and Opportunity to Respond and Advise (NORA) process related to its investigation of advertising for financial products and services on our platform
- p.7｜On January 19, 2022, we filed a motion to dismiss, which was denied in part on May 10, 2023. The insider trading claim was dismissed as to all defendants except Mark Zuckerberg, and the motion was denied as to the breach of fiduciary duty claims. Trial is scheduled to begin on April 2, 2025.
- p.11｜Unless otherwise noted, with respect to the matters described below that do not include an estimate of the amount of loss or range of possible loss, such losses or range of possible losses either cannot be estimated or are not individually material, but we believe there is a reasonable possibility that they may be material in the aggregate.
- p.11｜Although we are vigorously defending our regulatory compliance, we have accrued significant amounts for loss contingencies related to these inquiries and investigations in Europe, and we believe there is a reasonable possibility that additional accruals for losses related to these matters could be material individually or in the aggregate.
- p.11｜If the IRS prevails in its updated position, this could result in an additional federal tax liability of an estimated, aggregate amount of up to approximately $ 9.0 &#160;billion in excess of the amounts in our originally filed U.S. return, plus interest and any penalties asserted.
- p.11｜If the IRS prevails in its position for these new adjustments, this could result in an additional federal tax liability of up to approximately $ 680 &#160;million in excess of the amounts in our originally filed U.S. returns, plus interest and any penalties asserted.


## Q10 · **治理与内控**有无红灯（审计意见 / **CAM** / **ICFR** / 审计师变更 / 重述）？

三处全绿。Ernst & Young LLP 对 2024、2023 两年资产负债表，以及三年利润表、综合收益表、股东权益变动表与现金流量表出具「在所有重大方面公允」的标准无保留意见，并对财务报告内部控制另出无保留意见；报告日 2025 年 1 月 29 日，自 2007 年起任审计师。

关键审计事项 2 条：或有损失（Loss Contingencies）与不确定税务立场（Uncertain Tax Positions）。前者难在概率判断与金额或区间估计，后者难在转移定价的技术依据与计量；两条正好对应本件最大的两项表外敞口——诉讼或有与 IRS 转移定价争议。两条都落在估计与计量，没有一条涉及收入确认，说明审计师认为错报风险集中在判断类科目而非交易入账。

ICFR 双绿：管理层认定 2024 年 12 月 31 日内控有效，EY 亦认定有效；CEO 与 CFO 认定披露控制与程序在合理保证水平上有效；「material weakness」出现在审计程序设计说明句，不是认定存在；四季度无重大内控变化。审计师变更与分歧：无（Item 9 明写 None）。重述：查了 Item 9、审计报告与 Item 9A，未见重述字样。

治理侧另有一处需登记：Item 9B 披露两名内部人在四季度新设 Rule 10b5-1 计划——董事 Peggy Alford 2024 年 11 月 27 日（上限 120 万美元）、首席产品官 Christopher K. Cox 同日（上限 6 万股，2026 年 2 月 20 日到期）。这是常规预排交易，不构成内控红灯，但属于治理类事件，模型里没有对应格，单独记一笔。

判断：无制度性红灯，风险落在判断（诉讼或有、税务）而非错报；两条 CAM 与最大两项或有敞口一一对应，说明审计师也认为这两处最可能出偏差，读报表时要按「可能高估或低估」而不是「已审计即准确」来用。

### 依据
- p.11｜In our opinion, the consolidated financial statements present fairly, in all material respects, the financial position of the Company at December&#160;31, 2024 and 2023, and the results of its operations and its cash flows for each of the three years in the period ended December&#160;31, 2024, in conformity with U.S. generally accepted accounting principles.
- p.11｜We have served as the Company's auditor since 2007.
- p.11｜San Jose, California January&#160;29, 2025
- p.11｜Auditing the Company's accounting for, and disclosure of these loss contingencies was especially challenging due to the significant judgment required to evaluate management's assessments of the likelihood of a loss, and their estimate of the potential amount or range of such losses.
- p.11｜Auditing the Company's accounting for, and disclosure of, these uncertain tax positions was especially challenging due to the significant judgment required to assess management's evaluation of technical merits and the measurement of the tax position based on interpretations of tax laws and legal rulings.
- p.11｜In our opinion, Meta Platforms, Inc. (the Company) maintained, in all material respects, effective internal control over financial reporting as of December&#160;31, 2024, based on the COSO criteria.
- p.11｜Our audit included obtaining an understanding of internal control over financial reporting, assessing the risk that a material weakness exists, testing and evaluating the design and operating effectiveness of internal control based on the assessed risk, and performing such other procedures as we considered necessary in the circumstances.
- p.13｜Based on the assessment, management has concluded that its internal control over financial reporting was effective as of December&#160;31, 2024 to provide reasonable assurance regarding the reliability of financial reporting and the preparation of financial statements in accordance with U.S. GAAP.
- p.13｜our disclosure controls and procedures are designed at a reasonable assurance level and are effective
- p.13｜There were no changes in our internal control over financial reporting identified in management's evaluation pursuant to Rules 13a-15(d) or 15d-15(d) of the Exchange Act during the fourth quarter of 2024
- p.12｜Item 9. Changes in and Disagreements with Accountants on Accounting and Financial Disclosure None.
- p.14｜On November 27, 2024 , Peggy Alford , a member of our board of directors , entered into a trading plan that provides for the sale of an aggregate of up to $1.2&#160;million worth of shares of our Class A common stock.
- p.14｜Christopher K. Cox , our Chief Product Officer , entered into a trading plan that provides for the sale of an aggregate of up to 60,000 shares of our Class A common stock.
