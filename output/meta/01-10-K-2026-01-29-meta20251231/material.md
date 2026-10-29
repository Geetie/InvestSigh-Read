---
id: 01-10-K-2026-01-29-meta20251231
cat: "01"
sub: 10-K
template: 10-K
template_version: 2
date: 2026-01-29
time: "00:00"
title: "Meta Platforms 2025 财年年报（10-K）"
kind: "10-K"
issuer: "Meta Platforms, Inc."
ticker: META
source_pages: 38
---

> 原文：`corpus/materials/01-10-K-2026-01-29-meta20251231/pages.json`（38 个逻辑块；`p.N` 是 Item 块号，不是 PDF 物理页）。
> 依据逐字可核，自检：`node server/check.mjs meta/01-10-K-2026-01-29-meta20251231`。

## Q1 · **用户与参与度的口径**是什么？**含不含新东西**（如 AI 会话）？与上期**同口径**吗？

DAP 数人不数账号：某日通过移动应用或网页浏览器访问 Facebook、Instagram、Messenger、WhatsApp 任一产品的注册且已登录用户即一人；不要求统一标识或绑定账号，而用设备、IP、用户名等信号加模型把同一人的多账号归并。2025 年 12 月平均 DAP 35.8 亿人、同比 +7%；ARPP 为 FoA 季度收入除以季初末 DAP 均值，全年 57.03 美元、+15%，量的是单人的变现效率。DAP 的估计误差带约为全球 DAP 的 3%，7% 的同比增幅明显大于这一噪声。

AI 会话等：不计入 DAP 的独立口径，也没有单列。查了 Item 1 Business 产品段（Meta AI 为跨 App、独立 App、眼镜、网页的助手，Threads 单列）、MD&A 的 DAP 定义、Limitations of Key Metrics 的 Family 列举，计数单位都是「人访问四个 App」，没有把 AI 会话单列进 DAP。那句「other products」排除条款也不算纳入：它要求凭其在 Family 产品上的其他活动另行达标，即当天仍须访问四个 App 之一。

可比性：查了 Item 1 的产品与指标段、MD&A 的 Family Metrics 定义段、Limitations of Key Metrics 段，未见本期改 DAP 定义或分母的声明；只有「估计可能因方法改进而变化」这类常年风险提示，不等于本期改口径。2025 年四季度改的是违规账号占比的估计法，公司称该占比低于 5%、较此前估计上升源于方法更新，改的不是 DAP。ARPP 定义变更在 2024 年一季度且已重述。故 DAP、ARPP 可跨年比，违规账号占比不可。

### 依据
- p.27｜Family daily active people (DAP) was 3.58 billion on average for December 2025, an increase of 7% year-over-year.
- p.27｜We define a daily active person as a registered and logged-in user of Facebook, Instagram, Messenger, and/or WhatsApp (collectively, our "Family" of products) who visited at least one of these Family products through a mobile device application or using a web or mobile browser on a given day.
- p.27｜We do not require people to use a common identifier or link their accounts to use multiple products in our Family, and therefore must seek to attribute multiple user accounts within and across products to individual people.
- p.27｜Our calculations of DAP rely upon complex techniques, algorithms, and machine learning models that seek to estimate the underlying number of unique people using one or more of these products, including by matching user accounts within an individual product and across multiple products when we believe they are attributable to a single person, and counting such group of accounts as one person.
- p.27｜We view DAP as a measure of engagement across our products.
- p.27｜The numbers for our key Family metrics, our DAP and average revenue per person (ARPP), do not include users on our other products unless they would otherwise qualify as DAP based on their other activities on our Family products.
- p.27｜We define ARPP as our FoA revenue during a given quarter, divided by the average of the number of DAP at the beginning and end of the quarter.
- p.27｜Our annual worldwide ARPP in 2025, which represents the sum of quarterly ARPP during such period, was $57.03, an increase of 15% from 2024.
- p.27｜Note: We updated our definition of ARPP beginning in the first quarter of 2024 and have recast ARPP in prior periods for comparative purposes.
- p.19｜We report our estimates of the numbers of our daily active people (DAP) and average revenue per person (ARPP) (collectively, our "Family metrics") based on the activity of users who visited at least one of Facebook, Instagram, Messenger, and WhatsApp (collectively, our "Family" of products) during the applicable period of measurement.
- p.19｜In addition, we are continually seeking to improve our estimates of our user base, and such estimates may change due to improvements or changes in our methodology.
- p.19｜In the fourth quarter of 2025, we made certain updates to the methodology we use for this estimation, including to incorporate updated data signals as a result of improvements in our ability to identify activity we believe to be violating our policies, as well as to focus on the most recent account activity when determining whether to include a person in our violating accounts estimation.
- p.19｜Accordingly, in the fourth quarter of 2025, we estimated that less than 5% of our worldwide DAP consisted solely of violating accounts.
- p.19｜we estimate that such margin generally will be approximately 3% of our worldwide DAP
- p.19｜to match user accounts within individual products and across multiple products, we use data signals such as similar device information, IP addresses, and user names
- p.19｜We believe the increase compared to our prior estimation was a result of the methodology update described above.
- p.20｜Meta AI is an assistant that's available across our apps, as a stand-alone app, on our AI glasses, and on the web.
- p.20｜Threads is an application for text-based updates and public conversations, where communities come together to discuss topics of interest.

## Q2 · 收入的期间变化里，**价格 / 数量 / 新产品各贡献多少**？

金额（百万美元，2025 对 2024）：Advertising 196,175 对 160,633，+22%，增 35,542；Other revenue 2,584 对 1,722，+50%，增 862，主要由 WhatsApp 付费消息与 Meta Verified 订阅拉动；Total revenue 200,966 对 164,501，+22%。总收入增速几乎等于广告一条腿，其余两腿合计不足 3%，对 22% 的增速几乎没有拉动。

量价：全年 ad impressions +12%，average price per ad +9%（口径为广告收入÷展示次数）。对广告收入是乘法——1.12×1.09≈1.22，与 +22% 吻合；写成 12%+9%=21% 会低估，因为价格已被展示量摊薄。

新产品：未单列。查了收入表、收入分解附注与分部附注，收入只按 source 与 segment 拆，Reels、Threads、Meta AI 带来的广告都落在 Advertising 行，Other revenue 只列付费消息、Meta Verified、支付净费；附注的收入分解口径与之一致，没有产品维度。文字只说 Reels 变现率低于 Feed 和 Stories，且明示无法量化各趋势的影响。

判断：以量为主、价为辅。展示 +12% 说明供给（广告位，尤其亚太）在扩张；单价 +9% 说明需求与投放工具在抬变现效率，且 9% 是净额——展示量增加与 Reels 等低变现占比上升部分抵消了单价。量增是供给侧信号、价增是需求侧信号，同向说明增长不是单靠提价。

### 依据
- p.27｜The following table sets forth our revenue by source and by segment:
- p.27｜Advertising $ 196,175 $ 160,633 $ 131,948 22 % 22 %
- p.27｜Other revenue 2,584 1,722 1,058 50 % 63 %
- p.27｜FoA other revenue in 2025 increased $862 million, or 50%, compared to 2024. The increase was mostly driven by paid messaging from WhatsApp and Meta Verified subscriptions.
- p.27｜Total revenue $ 200,966 $ 164,501 $ 134,902 22 % 22 %
- p.27｜Advertising revenue in 2025 increased $35.54 billion, or 22%, compared to 2024 due to increases in ad impressions delivered and average price per ad.
- p.27｜FoA other revenue in 2025 increased $862 million, or 50%, compared to 2024.
- p.27｜Other revenue consists of revenue from paid messaging from WhatsApp, Meta Verified subscriptions, net fees we receive from developers using our Payments infrastructure, and revenue from various other sources.
- p.27｜In 2025, ad impressions delivered increased by 12%, as compared with an increase of 11% in 2024, year-over-year.
- p.27｜In 2025, the average price per ad increased by 9%, as compared with an increase of 10% in 2024, year-over-year.
- p.27｜We calculate average price per ad as total advertising revenue divided by the number of ads delivered.
- p.27｜Ad impressions delivered during 2025 grew in all regions, especially in Asia-Pacific, which was driven by increases in users and their engagement on our products.
- p.27｜The increase in average price per ad in 2025 was driven by an increase in advertising demand, which we believe is mostly due to ongoing improvements to our ad performance from our ad targeting and measurement tools.
- p.27｜This increase was partially offset by a higher number of ad impressions delivered, especially in geographies and in products, such as Reels, that monetize at lower rates.
- p.27｜In addition, while Reels is growing in usage, it monetizes at a lower rate than our Feed and Stories products and we expect it will continue to monetize at a lower rate for the foreseeable future.
- p.27｜As a result, it is difficult to identify with precision which advertiser spending decisions are attributable to which trends, and we are unable to quantify the exact impact that each trend had on our advertising revenue during the periods presented.
- p.29｜Revenue disaggregated by revenue source and by segment consists of the following (in millions):

## Q3 · **广告之外的腿**（订阅 / 企业 / 卖算力）有没有被拆出来？

广告之外在报表上只有两条可核的腿，且同在一张按来源与分部的表里。Other revenue 2025 年 25.84 亿美元，2024 年 17.22 亿，增 8.62 亿、增速 50%，占 2,009.66 亿总收入的 1.3%；Reality Labs 收入（硬件与相关软件内容）22.07 亿美元，上年 21.46 亿，增 0.61 亿、增速 3%，占 1.1%。两条合计 47.91 亿、占 2.4%，广告 1,961.75 亿、占 97.6%——非广告全年增量只有 9.23 亿，占 364.65 亿总收入增量的 2.5%。

三项候选都没有单独金额。查了收入来源表、Other revenue 的定义与增速归因、分部附注：Meta Verified 只被点名、未给金额；企业/商用 AI 与对外卖算力连单独的收入口径都没有，材料未给出此项。只按一整行披露的证据就是收入分类定义本身：Other revenue 由 WhatsApp 付费消息、Meta Verified 订阅、Payments 基础设施净费与 various other sources 四类合成一行，附注的分解表也只有 Advertising、Other revenue、FoA、Reality Labs 四行，没有产品维度。

它不能读作订阅收入：四类混合，Payments 部分是净费；增速归因只到「mostly driven by paid messaging from WhatsApp and Meta Verified subscriptions」，两项各自多少未给。

判断：占比 2.4%，上年同口径 2.35%，一年只挪 0.03 个百分点；绝对增额约为广告增量的 1/39。50% 的增速方向对，但基数太小，撑不起第二增长曲线，也对冲不了广告周期——22% 的总收入增速里，非广告只贡献约 0.6 个百分点。

### 依据
- p.27｜The following table sets forth our revenue by source and by segment:
- p.27｜Advertising $ 196,175 $ 160,633 $ 131,948 22 % 22 %
- p.27｜Other revenue 2,584 1,722 1,058 50 % 63 %
- p.27｜Reality Labs 2,207 2,146 1,896 3 % 13 %
- p.27｜Total revenue $ 200,966 $ 164,501 $ 134,902 22 % 22 %
- p.27｜Other revenue consists of revenue from paid messaging from WhatsApp, Meta Verified subscriptions, net fees we receive from developers using our Payments infrastructure, and revenue from various other sources.
- p.27｜RL revenue is generated from the delivery of consumer hardware products, such as Meta Quest and AI glasses, and related software and content.
- p.27｜FoA other revenue in 2025 increased $862 million, or 50%, compared to 2024. The increase was mostly driven by paid messaging from WhatsApp and Meta Verified subscriptions.
- p.27｜RL revenue in 2025 increased $61 million, or 3%, compared to 2024. The increase was driven by an increase in sales of AI glasses, partially offset by a decrease in Meta Quest sales.
- p.27｜Note: Non-advertising revenue includes RL revenue generated from the delivery of consumer hardware products and FoA Other revenue, which consists of revenue from paid messaging from WhatsApp, Meta Verified subscriptions, net fees we receive from developers using our Payments infrastructure, and revenue from various other sources.
- p.29｜Revenue disaggregated by revenue source and by segment consists of the following (in millions):
- p.29｜Other revenue 2,584 1,722 1,058
- p.29｜FoA other revenue consists of revenue from paid messaging from WhatsApp, Meta Verified subscriptions, net fees we receive from developers using our Payments infrastructure, and revenue from various other sources.

## Q4 · **折旧寿命与残值**原文是多少（**分档吗**）？**估计的假设这期变了多少**？敏感性给了吗？

寿命分五档，前四档是区间：servers and network assets 5 至 5.5 年，buildings 25 至 30 年，equipment and other 1 至 25 年，finance lease right-of-use assets 5 至 20 年，leasehold improvements 写「可使用年限与剩余租赁期孰短」、不给年数；折旧用直线法，摊销期取两者孰短（2025 年 12 月 31 日口径）。服务器一档区间最窄（5–5.5 年）。

残值材料未给出此项。查了 Note 1 的 Property and Equipment 政策整段（含折旧方法句）与 MD&A 的 Critical Accounting Estimates 全段，无 residual value 或 salvage value；该词只在租赁的 residual value guarantees（阈值约 280 亿美元）里出现。straight-line 是分摊方法、lesser of useful life or lease term 是摊销期规则，都不等于披露残值。

2025 年 1 月完成评估，将大部分服务器与网络资产寿命提高到 5.5 年，2025 年 1 月 1 日起生效；变更前的具体年限材料未给，只给变更后的 5.5 年，表里 5–5.5 年的区间也说明并非全部资产都到 5.5 年。以 2024 年末已投用资产测算，2025 年折旧费用减少 29.2 亿美元、净利润增加 25.9 亿美元、摊薄每股增加 1.00 美元。所以这是把折旧后移，直接托举当年利润。

敏感性材料未给：只有「实际结果可能与估计存在重大差异」的原则表述，无 ±1 年重算表；MD&A 把关键会计估计限定为 loss contingencies、income taxes、non-marketable equity investments，寿命不在其列。

判断上，25.9 亿美元相当于 2025 年 604.58 亿美元净利的 4.3%，托举幅度有限；折旧摊销已从 154.98 亿升到 186.16 亿美元、增 20%，资产基数扩张快于寿命延长，未来折旧压力是升不是降。

### 依据
- p.29｜Property and equipment, including finance leases, are depreciated and stated at cost less accumulated depreciation. Depreciation is computed using the straight-line method over the estimated useful lives of the assets or the remaining lease term, whichever is shorter.
- p.29｜Servers and network assets Five to 5.5 years Buildings 25 to 30 years Equipment and other One to 25 years Finance lease right-of-use assets Five to 20 years Leasehold improvements Lesser of estimated useful life or remaining lease term
- p.29｜When we change the estimated useful life assumption for any asset, the remaining carrying amount of the asset is accounted for prospectively and depreciated or amortized over the revised estimated useful life.
- p.29｜In January 2025, we completed an assessment of the useful lives of property and equipment, which resulted in an increase in the estimated useful lives of most servers and network assets to 5.5 years, effective January 1, 2025. Based on the servers and network assets placed in service as of December 31, 2024, the financial impact of this change in estimate included a reduction in depreciation expense of $ 2.92 billion and an increase in net income of $ 2.59 billion, or $ 1.00 per diluted share, for the year ended December 31, 2025.
- p.27｜In January 2025, we completed an assessment of the useful lives of property and equipment, which resulted in an increase in the estimated useful lives of most servers and network assets to 5.5 years, effective January 1, 2025.
- p.27｜We believe that the estimates and assumptions associated with loss contingencies, income taxes, and valuation of non-marketable equity investments, when applicable, have the greatest potential impact on our consolidated financial statements.
- p.29｜Depreciation and amortization 18,616 15,498 11,178
- p.27｜Net income $ 60,458 $ 62,360 $ 39,098
- p.29｜we have provided residual value guarantees (RVG) with an aggregate threshold of approximately $ 28 billion that decreases over time

## Q5 · **人力成本与股份支付**怎么拆（提效体现在哪一行）？

费用行（百万美元，2025 对 2024）：cost of revenue 36,175 对 30,161、增 20%；research and development 57,372 对 43,873、增 31%；marketing and sales 11,991 对 11,347、增 6%；general and administrative 12,152 对 9,740、增 25%；收入 200,966、增 22%。营销是唯一大幅慢于收入的一行（+6%），成本行 +20% 只小幅低于收入。

人力拆法：四行都含 employee compensation，研发、营销、行政以它为主，成本行只是其中一项（另含数据中心、带宽与合作伙伴成本）；原文口径为 payroll、share-based compensation、benefits 三块，工资与股份支付同锅。全公司 78,865 人、同比增 6%，研发口径工程与技术岗人数增 8%。所以研发与行政的费用增速高于人数增速，差额来自人均薪酬与股份支付；营销费用增速与人数大致持平；研发费用还另含基础设施成本。材料没有把每行的工资、股份支付、福利再拆开，只给费用行总额，所以现金人力成本无法单独取出。

股份支付：2025 年确认 20,427 百万美元（2024 年 16,690 百万美元），现金流量表以同额作非现金调整项；分行为研发 17,485、成本 1,124、销售 926、行政 892。未确认 RSU 费用 548.1 亿美元，加权平均约三年确认。SBC 是非现金，不能与现金人力成本相加，否则重复计算。

提效：marketing and sales 增 6% 远低于收入增 22%，占收入比由 7% 降到 6%，是唯一确定的提效行；cost of revenue 增 20% 虽低于收入，但含寿命延长少提的折旧，若把 29.2 亿美元全算在成本行、加回后约增 30%（测算，公司未按费用行拆分），所以并未真正跑赢；research and development 增 31% 高于收入，属投入加大而非提效。

### 依据
- p.27｜Cost of revenue $ 36,175 $ 30,161 $ 25,959 20 %
- p.27｜Research and development $ 57,372 $ 43,873 $ 38,483 31 %
- p.27｜Marketing and sales $ 11,991 $ 11,347 $ 12,301 6 %
- p.27｜General and administrative $ 12,152 $ 9,740 $ 11,408 25 %
- p.27｜Total revenue for 2025 was $200.97 billion, an increase of 22% compared to 2024, due to an increase in advertising revenue.
- p.27｜employee compensation which includes payroll, share-based compensation and benefits for employees on our operations teams
- p.27｜Research and development expenses consist mostly of employee compensation which includes payroll, share-based compensation and benefits for our employees on our engineering and technical teams who are responsible for developing new technologies and products; infrastructure costs; RL technology development costs; and facilities-related costs.
- p.27｜Marketing and sales expenses consist mostly of employee compensation which includes payroll, share-based compensation and benefits for our employees engaged in sales, sales support, marketing, business development, and customer service functions; professional services to support our community and product operations; and marketing and promotional expenses.
- p.27｜General and administrative expenses consist primarily of employee compensation which includes payroll, share-based compensation and benefits for certain of our executives as well as our legal, finance, human resources, corporate communications and policy, and other administrative employees; legal-related costs, which include estimated fines, settlements, or other losses in connection with legal and related matters, as well as other legal fees; other taxes, such as digital services taxes and other non-income-based tax levies; and professional services.
- p.27｜Marketing and sales expenses in 2025 increased $644 million, or 6%, compared to 2024.
- p.27｜Research and development expenses in 2025 increased $13.50 billion, or 31%, compared to 2024.
- p.27｜The higher employee compensation was primarily from an 8% growth in employee headcount from 2024 to 2025 in engineering and other technical functions and an increase in share-based compensation expense.
- p.27｜Cost of revenue in 2025 increased $6.01 billion, or 20%, compared to 2024. The increase was mainly due to higher operational expenses related to our data centers and technical infrastructure, which included decreases in the depreciation growth rate due to an extension in the useful lives of servers and network assets, effective January 1, 2025.
- p.27｜Headcount was 78,865 as of December 31, 2025, an increase of 6% year-over-year.
- p.20｜We had a global workforce of 78,865 employees as of December 31, 2025, and we have offices in more than 90 cities around the world.
- p.29｜Share-based compensation 20,427 16,690 14,027
- p.29｜Total $ 20,427 $ 16,690 $ 14,027
- p.29｜Research and development 17,485 13,683 11,429
- p.29｜Cost of revenue $ 1,124 $ 1,055 $ 740
- p.29｜Marketing and sales 926 1,026 952
- p.29｜General and administrative 892 926 906
- p.29｜As of December 31, 2025, unrecognized share-based compensation expense related to RSU awards was $ 54.81 billion, which is expected to be recognized over a weighted-average period of approximately three years based on vesting under the award service conditions.

## Q6 · **资本支出的承诺**是多少？**钱从哪来、干什么用**？

承诺 1,310.46 亿美元，全部不可撤销。分年（亿美元）：2026 年 306.34、2027 年 221.66、2028 年 212.21、2029 年 197.61、2030 年 194.07、Thereafter 178.57。前三年占 56.5%（测算），逐年摊开。另有未起租租赁义务 1,037.7 亿美元，主要是数据中心、托管与网络，另计、不与前者相加。

钱投向第三方云容量、服务器与网络基础设施、数据中心、Reality Labs 消费硬件。来源：2025 年末现金及有价证券 815.9 亿美元、经营现金流 1,158.00 亿美元、长期债务账面 587.4 亿美元（2026 年无本金到期），11 月另发 299.1 亿美元票据；公司称 12 个月内与更长期均可覆盖。

2025 年资本开支（含融资租赁本金）722.2 亿美元；2026 年指引「约 1,150 亿至 1,350 亿美元」用于 AI 与核心业务，未注明是否含融资租赁本金，材料未给出该口径。

判断：2026 年内到期的硬约束是 306.34 亿，只占指引下限 26.6%（测算）；2027 年及以后仍有约 1,004 亿不可撤销承诺，只是不在一年内到期，不能当作可协商。经营现金流对指引下限覆盖 1.007、对上限 0.86（测算），缺口要靠存量现金或新增融资。

### 依据
- p.29｜We have $131.05 billion of non-cancelable contractual commitments as of December 31, 2025. These commitments are mostly related to third-party cloud capacity arrangements and our continued investments in servers and network infrastructure, data centers, and consumer hardware products in Reality Labs.
- p.29｜The following is a schedule, by years, of non-cancelable contractual commitments as of December 31, 2025 (in millions): 2026 $ 30,634 2027 22,166 2028 21,221 2029 19,761 2030 19,407 Thereafter 17,857 Total $ 131,046
- p.27｜We also have $131.05 billion of contractual commitments as of December 31, 2025, mostly related to third-party cloud capacity arrangements and our continued investments in servers and network infrastructure, data centers, and consumer hardware products in Reality Labs with $30.63 billion due in 2026.
- p.27｜In addition to lease liabilities included in our consolidated balance sheets, we have leases that have not yet commenced, with total lease obligations of approximately $103.77 billion, mostly for data centers, colocations, and network infrastructure, as of December 31, 2025.
- p.27｜Cash, cash equivalents, and marketable securities were $81.59 billion as of December 31, 2025, an increase of $3.78 billion from December 31, 2024.
- p.27｜Net cash provided by operating activities $ 115,800 $ 91,328 $ 71,113
- p.27｜The increase was due to $115.80 billion of cash generated from operations and $29.91 billion of net proceeds from the issuance of fixed-rate senior unsecured notes (the Notes) in November 2025.
- p.27｜Long-term debt was $58.74 billion as of December 31, 2025.
- p.27｜As of December 31, 2025, we had outstanding long-term debt in the form of senior unsecured notes for an aggregate principal amount of $59.0 billion, which mature from 2027 through 2064.
- p.29｜2026 $ — 2027 2,750 2028 1,500 2029 1,000 2030 5,000 Thereafter 48,750 Total $ 59,000
- p.27｜We currently anticipate that our available funds and cash flow from operations and financing activities will be sufficient to meet our operational cash needs and fund our cash commitments for investing and financing activities, including investments in infrastructure and AI initiatives, as well as any return of capital to stockholders over the next 12 months and thereafter for the foreseeable future.
- p.27｜Capital expenditures, including principal payments on finance leases, were $72.22 billion for the year ended December 31, 2025.
- p.27｜We anticipate making capital expenditures of approximately $115 billion to $135 billion in 2026 to support our AI efforts and core business.

## Q7 · **回购**做了多少？**授权还剩多少**？股本是**净增还是净减**？

2025 年回购并注销 Class A 普通股 4,000 万股、262.6 亿美元（含消费税），据此测算均价约 657 美元/股；第四季度无回购活动，节奏集中在前三季。

授权 2017 年 1 月启动、无到期日：2024 年末剩余 512.8 亿美元，用掉 262.6 亿后 2025 年末剩余约 250.3 亿美元（与期初减回购的 250.2 亿差 0.1 亿，为四舍五入）。材料只披露余额，未披露授权总额。

股本是净减：Class A 由 21.90 亿股降至 21.87 亿股，Class B 由 3.44 亿股降至 3.43 亿股，合计 25.34 亿股降至 25.30 亿股，净减 400 万股。同期股权激励发行 6,300 万股、净额结算代扣 2,700 万股，与回购 4,000 万股相抵恰为 −400 万股（测算），所以 262.6 亿美元只换来 0.16% 的股本收缩。

股利另计：全年股利及等价支付 53.2 亿美元（Class A 46.0 亿、Class B 7.2 亿），季度股息由 0.50 提高到 0.525 美元，不与回购混算。

判断：剩余 250.3 亿美元按 2025 年节奏测算约 0.95 年、约 3,810 万股；股本几乎不降，说明回购实质是对冲股份支付稀释、维持股数，而非缩股。

### 依据
- p.27｜In 2025, we repurchased and subsequently retired 40 million shares of our Class A common stock for an aggregate amount of $26.26 billion. As of December 31, 2025, $25.03 billion remained available and authorized for repurchases.
- p.27｜Our board of directors has authorized a share repurchase program of our Class A common stock, which commenced in January 2017 and does not have an expiration date.
- p.29｜As of December 31, 2024, $51.28 billion remained available and authorized for repurchases under this program. In 2025, we repurchased and subsequently retired 40 million shares of our Class A common stock for an aggregate amount of $26.26 billion, including excise taxes. As of December 31, 2025, $25.03 billion remained available and authorized for repurchases.
- p.26｜There was no share repurchase activity during the three months ended December 31, 2025.
- p.29｜Common stock, $ 0.000006 par value; 5,000 million Class A shares authorized, 2,187 million and 2,190 million shares issued and outstanding, as of December 31, 2025 and 2024, respectively; 4,141 million Class B shares authorized, 343 million and 344 million shares issued and outstanding, as of December 31, 2025 and 2024, respectively
- p.29｜Issuance of common stock 63
- p.29｜Shares withheld related to net share settlement ( 27 ) — ( 8,312 ) — ( 10,088 ) ( 18,400 )
- p.27｜$18.40 billion of taxes paid related to net share settlement of employee restricted stock unit (RSU) awards
- p.27｜Total dividends and dividend equivalents paid were $5.32 billion for the year ended December 31, 2025.
- p.26｜During the year ended December 31, 2025, total dividend and dividend equivalent payments were $4.60 billion and $720 million for Class A and Class B common stock, respectively.
- p.27｜Beginning in the first quarter of 2025, we increased our quarterly cash dividends from $0.50 to $0.525 per share of Class A and Class B common stock.

## Q8 · **亏损业务分部**的收入与亏损**环比方向**？分部**定义改了吗**（能否相减）？

Reality Labs 2025 年收入 22.07 亿美元，2024 年 21.46 亿，增 0.61 亿、增速 3%，增量来自 AI 眼镜、被 Quest 下滑部分抵消；营业亏损 191.93 亿，上年 177.29 亿，扩大 14.64 亿、8%；营业利润率 (870)%，上年 (826)%；成本费用 214.00 亿、增 8%。收入增 3% 而成本增 8%，亏损率再深 44 个百分点，亏损额已是收入的 8.7 倍——成本几乎不随收入走。年报只有年度口径；查了 MD&A 分部盈利表与分部附注，只有年度数、没有 RL 的分季度拆分，所以单季环比未见，方向按 2025 对 2024 年度比较。

对照 Family of Apps：收入 1,987.59 亿、增 22%，营业利润 1,024.69 亿、增 18%，利润率 52%，上年 54%。全公司营业利润 832.76 亿、增 20%，全部由 FoA 贡献，RL 亏掉的部分相当于 FoA 营业利润的 18.7%。合并利润率由 42% 降到 41%，一头是 RL 亏损率加深，一头是 FoA 成本费用增 28% 快于收入增 22%。

分部定义未改：两个 reportable segments 为 FoA（Facebook、Instagram、Messenger、WhatsApp 及其他服务）与 RL（虚拟与增强现实相关消费硬件、软件与内容），且 operating segments 与 reportable segments 相同。查了 MD&A 分部段、分部附注、会计政策的分部表述，未见本期重分类或改分摊的声明；唯一的 recast 是 ARPP 指标定义（2024 年一季度起），不涉分部。所以可以相减：198,759+2,207=200,966，102,469−19,193=83,276，与合并数逐项吻合。

判断：亏损扩大 8%、收入只增 3%，是投入与变现的缺口在扩大而非收窄；公司自述预期 2026 年 RL 经营亏损与 2025 年相近，说明这不是一年的投入峰值。

### 依据
- p.27｜We report our financial results for our two reportable segments: Family of Apps (FoA) and Reality Labs (RL). FoA includes Facebook, Instagram, Messenger, WhatsApp, and other services. RL includes our virtual and augmented reality related consumer hardware, software, and content.
- p.27｜Revenue $ 198,759 $ 162,355 22% $ 2,207 $ 2,146 3% $ 200,966 $ 164,501 22%
- p.27｜Costs and expenses 96,290 75,246 28% 21,400 19,875 8% 117,690 95,121 24%
- p.27｜Income (loss) from operations $ 102,469 $ 87,109 18% $ (19,193) $ (17,729) (8)% $ 83,276 $ 69,380 20%
- p.27｜Operating margin 52 % 54 % (870) % (826) % 41 % 42 %
- p.27｜RL revenue in 2025 increased $61 million, or 3%, compared to 2024. The increase was driven by an increase in sales of AI glasses, partially offset by a decrease in Meta Quest sales.
- p.27｜In 2025, our RL segment reduced our overall operating profit by approximately $19.19 billion, and we expect our 2026 RL operating losses to remain similar to 2025.
- p.27｜Note: We updated our definition of ARPP beginning in the first quarter of 2024 and have recast ARPP in prior periods for comparative purposes.
- p.29｜We report our financial results for our two reportable segments: Family of Apps (FoA) and Reality Labs (RL). FoA includes Facebook, Instagram, Messenger, WhatsApp, and other services. RL includes our virtual and augmented reality related consumer hardware, software, and content. Our operating segments are the same as our reportable segments.
- p.29｜Revenue and costs and expenses are generally directly attributed to our segments. These directly attributable costs and expenses include certain product development related operating expenses, costs associated with partnership arrangements, consumer hardware product costs, content costs, and legal-related costs. Indirect costs are allocated to segments based on a reasonable allocation methodology, when such costs are significant to the performance measures of the operating segments.
- p.29｜Revenue $ 198,759 $ 162,355 $ 133,006
- p.29｜Income from operations $ 102,469 $ 87,109 $ 62,871
- p.29｜Revenue $ 2,207 $ 2,146 $ 1,896
- p.29｜Loss from operations $ ( 19,193 ) $ ( 17,729 ) $ ( 16,120 )
- p.29｜We report our financial results based on two reportable segments: Family of Apps (FoA) and Reality Labs (RL). The segment information aligns with how the chief operating decision maker (CODM), who is our chief executive officer (CEO), reviews and manages the business.

## Q9 · **诉讼与监管**的**阶段与求偿额**？会不会变成可计量负债？

两笔金额已落地：隐私集体诉讼 7.25 亿美元和解 2025 年 5 月 14 日生效；FTC 和解的 50 亿美元罚金 2020 年 4 月已缴。但 FTC 修改同意令的行政程序仍未了：2023 年 5 月发起，2025 年 5 月 16 日特区巡回上诉法院以管辖理由撤销地院驳回、7 月 10 日发回，2025 年 12 月 23 日地院定补充简报、2026 年 5 月前完成；行政程序自 2025 年 7 月 30 日中止。

加州 2025 年 12 月消费者保护和解待批，金额未给。青少年诉讼在审：洛杉矶 JCCP 5255 首案 2026 年 1 月 27 日已开庭，新墨西哥州总检察长案 2026 年 2 月 2 日，学区 bellwether 首案 2026 年 6 月 15 日；部分案件索赔最高达数百亿美元，另有逾十万人集体仲裁，公司另称全部诉讼合计最高可达数千亿美元。

已开出的罚款：爱尔兰数据保护委员会 2023 年 12 亿欧元（上诉获爱尔兰高等法院中止）；欧盟委员会 2024 年 7.98 亿欧元 Marketplace 罚款，已上诉。Flo Health 2025 年 8 月 1 日陪审团认定责任，按每成员 5,000 美元、最多约 160 万人主张，金额未定。

会计上仅「很可能且能合理估计」才计提；欧洲监管已计提重大金额，其余未给金额的事项，附注说要么无法估计、要么单项不重大但合计可能重大，没有给可能损失区间。故加州待批和解、2026 年庭审的青少年案与已进入税务法院的 IRS 补税通知都还没有最终定论——IRS 通知里的 158.9 亿美元是主张额，不是最终负债；窗口分别在和解批准、庭审与税务判决，未计提不等于不会赔。

### 依据
- p.25｜On December 22, 2022, the parties entered into a settlement agreement to resolve the lawsuit, which provided for a payment of $725 million by us and became final on May 14, 2025.
- p.25｜We entered into a settlement and modified consent order to resolve the FTC inquiry, which took effect in April 2020 and required us to pay a penalty of $5.0 billion and to significantly enhance our practices and processes for privacy compliance and oversight.
- p.25｜After the underlying appeal was briefed and oral argument was held on November 5, 2024, the U.S. Court of Appeals for the District of Columbia Circuit issued its decision on May 16, 2025, reversing the district court's denial of our motion on jurisdictional grounds, and directed the district court to consider the merits of our arguments. On July 10, 2025, the case was remanded to the district court to consider our claims in light of the Court of Appeals' determination that the district court retains jurisdiction over the entirety of the consent order. On December 23, 2025, the district court ordered a schedule for supplemental briefing in light of the Court of Appeals decision, with briefing due to be complete by May 2026.
- p.25｜On July 30, 2025, the Commission issued an order staying the Order to Show Cause proceeding pending final resolution of the two judicial cases we filed challenging the proceeding.
- p.25｜In addition, in December 2025, we entered into a settlement agreement with California to resolve its lawsuit alleging violations of consumer protection laws, which is subject to court approval.
- p.25｜Trial in the first of the personal injury cases began on January 27, 2026 in Judicial Council Coordination Proceeding No. 5255 pending in Los Angeles County California Superior Court.
- p.25｜Trial in the first of the state attorneys general cases is currently scheduled to begin on February 2, 2026 in the First Judicial District Court of New Mexico, in a case brought by the New Mexico Attorney General.
- p.25｜The first trial in the multidistrict litigation (In re Social Media Adolescent Addiction Product Liability Personal Injury Litigation) is a school district bellwether case and is scheduled to begin on June 15, 2026.
- p.25｜Across the cases described above, the damages or penalties that plaintiffs have indicated they intend to seek range widely in amount, including in certain cases up to the high tens of billions of dollars. In addition, beginning in November 2024, counsel for over one hundred thousand individual claimants have sent mass arbitration demands relating to "social media addiction" and related harms allegedly caused by Instagram.
- p.25｜The IDPC issued an administrative fine of EUR €1.2 billion as well as corrective orders requiring Meta Platforms Ireland to suspend the relevant transfers and to bring its processing operations into compliance with Chapter V GDPR by ceasing the unlawful processing, including storage, of such data in the United States. We are appealing this Final Decision and it is currently subject to a stay from the Irish High Court.
- p.25｜On November 18, 2024, the European Commission issued a decision that Meta infringed Article 102 on the Treaty of the Functioning of the European Union in relation to certain alleged business practices relating to Facebook Marketplace and imposed a fine of approximately EUR €798 million. We appealed the European Commission's decision on January 28, 2025.
- p.25｜In Flo Health, on August 1, 2025, a jury returned a verdict on liability in favor of the plaintiffs and on behalf of a California subclass on the sole claim remaining against Meta under Section 632 of the California Invasion of Privacy Act.
- p.25｜Plaintiffs are seeking $5,000 in statutory damages per class member and have asserted that there are up to approximately 1.6 million class members. The amount of potential damages is uncertain at this time.
- p.25｜The maximum aggregate monetary damages or penalties sought across our various legal proceedings could amount to an aggregate of up to hundreds of billions of dollars and, as a result, could be material to the financial condition of the company.
- p.29｜With respect to the cases, actions, and inquiries described below, we evaluate the associated developments on a regular basis and accrue a liability when we believe a loss is probable and the amount can be reasonably estimated.
- p.29｜Unless otherwise noted, with respect to the matters described below that do not include an estimate of the amount of loss or range of possible loss, such losses or range of possible losses either cannot be estimated or are not individually material, but we believe there is a reasonable possibility that they may be material in the aggregate.
- p.29｜Although we are vigorously defending our regulatory compliance, we have accrued significant amounts for loss contingencies related to these inquiries and investigations in Europe, and we believe there is a reasonable possibility that additional accruals for losses related to these matters could be material individually or in the aggregate.
- p.29｜Among other matters, our settlement with the FTC required us to pay a penalty of $ 5.0 billion which was paid in April 2020 upon the effectiveness of the modified consent order.
- p.29｜In September 2025, we received a Statutory Notice of Deficiency ("2017-2019 Notice") from the IRS, asserting an additional $15.89 billion in tax, plus interest and penalties for our 2017 through 2019 tax years.
- p.29｜We do not agree with the IRS' position and filed a petition with the Tax Court in December 2025 to challenge the 2017-2019 Notice.

## Q10 · **治理与内控**有无红灯（审计意见 / **CAM** / **ICFR** / 审计师变更 / 重述）？

意见标准无保留：Ernst & Young LLP 对 2025、2024 两年资产负债表，以及三年利润表、综合收益表、股东权益变动表与现金流量表出具「在所有重大方面公允」意见，另对财务报告内部控制出具无保留意见；日期 2026 年 1 月 28 日，自 2007 年起任审计师。

关键审计事项 3 条：或有损失（Loss Contingencies）、不确定税务立场（Uncertain Tax Positions）、可变利益实体合并会计（Consolidation accounting for a variable interest entity）——前两条难在概率判断与计量，第三条难在数据中心合资项目的主受益人认定。

ICFR 双绿：管理层认定 2025 年 12 月 31 日内控有效，EY 亦认定有效；CEO 与 CFO 并认定披露控制与程序在合理保证水平上有效；「重大缺陷」只出现在审计程序设计说明句，非认定存在，四季度无重大内控变化。审计师变更与分歧：无（Item 9 明写 None）。重述：查了 Item 9、审计报告与 Item 9A，未见重述字样。

三处全干净说明无制度性红灯，风险落在判断而非错报；三条关键审计事项里两条正对诉讼或有与 IRS 税务争议，与诉讼敞口互证。

### 依据
- p.29｜In our opinion, the consolidated financial statements present fairly, in all material respects, the financial position of the Company at December 31, 2025 and 2024, and the results of its operations and its cash flows for each of the three years in the period ended December 31, 2025, in conformity with U.S. generally accepted accounting principles.
- p.29｜We have served as the Company's auditor since 2007.
- p.29｜/s/ Ernst & Young LLP San Jose, California January 28, 2026
- p.29｜Auditing the Company's accounting for, and disclosure of these loss contingencies was especially challenging due to the significant judgment required to evaluate management's assessments of the probability of loss, and its estimate of the potential amount or range of such losses.
- p.29｜Auditing the Company's accounting for, and disclosure of, these uncertain tax positions was especially challenging due to the significant judgment required to assess management's evaluation of technical merits and the measurement of the tax positions based on interpretations of tax laws and legal rulings.
- p.29｜Auditing the Company's determination of the primary beneficiary of the VIE was especially challenging due to the significant judgment required in determining the activities that most significantly affect the VIE's economic performance based on the purpose and design of the entity and assessing whether the Company has the power to direct those activities.
- p.29｜In our opinion, Meta Platforms, Inc. (the Company) maintained, in all material respects, effective internal control over financial reporting as of December 31, 2025, based on the COSO criteria.
- p.29｜Our audit included obtaining an understanding of internal control over financial reporting, assessing the risk that a material weakness exists, testing and evaluating the design and operating effectiveness of internal control based on the assessed risk, and performing such other procedures as we considered necessary in the circumstances.
- p.30｜Based on the assessment, management has concluded that its internal control over financial reporting was effective as of December 31, 2025 to provide reasonable assurance regarding the reliability of financial reporting and the preparation of financial statements in accordance with U.S. GAAP.
- p.30｜Based on such evaluation, our CEO and CFO have concluded that as of December 31, 2025, our disclosure controls and procedures are designed at a reasonable assurance level and are effective to provide reasonable assurance that information we are required to disclose in reports that we file or submit under the Exchange Act is recorded, processed, summarized, and reported within the time periods specified in the rules and forms of the Securities and Exchange Commission
- p.30｜There were no changes in our internal control over financial reporting identified in management's evaluation pursuant to Rules 13a-15(d) or 15d-15(d) of the Exchange Act during the fourth quarter of 2025 that materially affected, or are reasonably likely to materially affect, our internal control over financial reporting.
- p.29｜Item 9. Changes in and Disagreements with Accountants on Accounting and Financial Disclosure None.

