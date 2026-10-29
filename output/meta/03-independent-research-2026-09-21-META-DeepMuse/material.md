---
id: 03-independent-research-2026-09-21-META-DeepMuse
cat: "03"
sub: independent-research
template: independent-research
template_version: 2
date: 2026-09-21
time: "00:00"
title: "Deep|META: Could Muse be the Inflection Point? Insights from 654 Muse Use Cases"
kind: "手稿"
issuer: FUNDA
ticker: META
source_pages: 36
---


## Q1 · 他给的公司**未披露口径**的外部估算是什么？

FUNDA 给出多组 Meta 未披露口径的外部估算，全部为「据 FUNDA」性质：

1. **Muse 用例结构估算（核心样本）**：自建用例数据库，**样本量 654 个 Muse 用例**（初期切分为 424 例，表头保留 Initial share 列），**期间为 Muse 上线后 12 天**（首切为上线后 4 天，约一周前做过 64.9% 的初始读数）。代理变量是公开社交平台上用户自发发布的 Muse 使用帖子，按检索词（如 "asked Muse"/"used Muse"）收集入候选池。估算结果：省钱/退款/个人理财为最大类，128 例、占 19.6%；工作与小企业 73 例（11.2%）；行政事务 69 例（10.6%）；购物 62 例（9.5%）；技术与智能体设置 54 例（8.3%）；旅游 53 例（8.1%）；电话类用例从首切的 26 例翻倍至 58 例。数据访问方面：58.7% 的用例明确授予某种个人数据访问权，23.7% 明确不需要。
2. **用户省钱金额估算**：654 例中 49 例细节足以计算节省额——年化合计 \$35,426，平均每例约 \$723，中位数 \$490；另 14 例追回无人认领财产/欠薪/旧托管余额 \$17,652（最大单笔 \$4,700），5 例退款合计 \$1,264，三组合计约 \$54,000。均为用户自报、未独立核实。
3. **Meta 广告收入行业构成估算（公司不披露）**：代理变量为广告代理商专家访谈样本，给出 12 个行业的 Meta 与 Google 广告收入 mix 估计，如旅游 Meta 约 4.5% vs Google 约 12%，金融服务约 4% vs 约 10%，B2B 及本地商家约 14% vs 约 20%+；由此估算 Meta 相对 Google 的构成缺口：旅游 7.5 个百分点、金融服务 6 个百分点、汽车 1.5 个百分点、B2B 及本地服务约 6 个百分点，合计约 21 个百分点。
4. **WhatsApp Business 收入占比估算**：专家估计其占 Meta 总收入低个位数百分比（该专家自家业务中约 7%，约为典型水平的三倍）。
5. **硬件承载量估算**：「Based on FUNDA's estimates」，一颗 CPU 约可支撑 200 个日活用户（DAU），并延伸出对 CPU、NAND、HDD 需求的行业判断。

代理变量与目标量之间多数没有换算桥：用例帖子→商业化收入的链条、CPU→DAU 的链条都未给换算步骤，只能当量级参考，不能入格；行业 mix 缺口（约 21 个百分点）是相对结构估计，可作广告收入结构旁证。

### 依据

- p.3｜Twelve days after launch, the task users most want Muse to handle has not changed: arguing with companies on their behalf. Saving money, securing refunds and managing personal finances remain the largest category in our database,with 128 of 654 cases,or 19.6%.
- p.4｜The six largest primary categories are saving money, refunds and personal finance,with 128 cases (19.6%); work and small business, 73 (11.2%); administrative tasks, 69 (10.6%); shopping, 62 (9.5%); technology and agent setup,54 (8.3%); and travel, 53 (8.1%).
- p.5｜Initial share(424 cases)
- p.6｜4. Of the cases in our database, 49 provide enough detail to calculate savings: \$35,426 annualized in total, or roughly \$723 per case, with a median of \$490. Another 14 cases recovered \$17,652 in unclaimed property, unpaid wages and old escrow balances; the largest recovery was \$4,7oo. Five refund cases totaled \$1,264. Combined, these three groups amount to roughly \$54,0oo. These are all self-reported figures that we cannot independently verify, but their scale helps explain why users are so eager to share these experiences.
- p.19｜<td rowspan=1 colspan=1>Travel</td><td rowspan=1 colspan=1>~4.5%</td><td rowspan=1 colspan=1>~12%</td>
- p.19｜The table highlights categories where Meta's lack of explicit purchase intent or precise timing has left it less exposed than Google: travel, with a 7.5-percentage-point gap in ad revenue mix; financial services, 6 points; automotive, 1.5 points; and B2B and local services, roughly 6 points. Together, these gaps in revenue mix total approximately 21 percentage points.
- p.32｜By my estimate,WhatsApp Business currently accounts for a low-single-digit share of Meta's total revenue. In our business, it is roughly 7%,or about three times the typical level.
- p.29｜Based on FUNDA's estimates,one CPU could support roughly 200 daily active users (DAUs).

## Q2 · 他的**物理量**从哪来、能不能核？

文中真正的物理量很少，主要是：

1. **一颗 CPU 约支撑 200 DAU**（FUNDA 自己的估算）。只写「Based on FUNDA's estimates」，没有给 CPU 型号、单用户负载、并发或内存假设等中间步骤，**来源不可回溯**，数值只能降为旁证，不得入格。
2. **用例库计数类「物理量」**（165,000 封未读邮件清理、146 次航班搜索、5% 周配额等）均为用户帖子自述，FUNDA 的候选池以检索词（"asked Muse"/"used Muse"）收录公开帖子，未入池的帖子（如那条 1,100 赞的隐私投诉）被明示排除——抽样框是「带特定检索词的公开帖子」，不是全量使用数据，无法核到平台原始计数。
3. **帖子浏览量**（230,000、73,000、36,000 等）是平台公开展示计数，可核但属传播度指标，非经营物理量。

结论：本文物理量无一能落到海关编码、环评产能、招标公告、卫星面积、船期这类可查原始出处；CPU/DAU 无中间步骤记来源不可回溯，用例库计数记为自建抽样统计（可回溯到 FUNDA 自建库，但库本身依赖用户自报）。

### 依据

- p.29｜Based on FUNDA's estimates,one CPU could support roughly 200 daily active users (DAUs).
- p.11｜That post did not enter our candidate pool because it lacked search terms such as “asked Muse" or"used Muse," but it is worth tracking separately.
- p.10｜In 58.7% of the 654 cases,users explicitly granted access to some form of personal data; 23.7% explicitly required none.
- p.7｜One user had Muse clear 165,0o0 unread messages from two old Yahoo accounts and prepare a migration checklist, using just 5% of the weekly allowance.

## Q3 · 这份材料是**四种交付物里的哪一种**？同源的另一份是哪一份？

**归类：`original`（原文论点稿）**。判定理由：英文原文、付费（PAID）Substack 体例、自带完整假设链（654 用例统计 → 行业收入 mix 缺口 → 变现路径推论 → 3Q26 早期读数），不是只有表的数据稿、也不是单点拆解稿。本件未附 bilingual / translation / summary 任何一版，本批内无同原文的其他三种交付物。

**同源件**：文中自述属于同一 FUNDA Muse 跟踪体系的还有——① 每周 Muse/Instinct 用例更新（Substack 连载）；②《META 2Q26 Preview》（Premium Report，机构客户版，文中建议作为 Business Agents 背景阅读）；③ GOOG 1Q26/2Q26 Preview（对话式广告定义）。这些共用一个 FUNDA 来源，引用时按同一研究机构的连续观点处理，不得计为多个独立来源；本批中的 FUNDA Muse 系列后续件（10 月留存件）亦属同系列。

### 依据

- p.1｜SEP 21,2026PAID
- p.2｜Muse is the first development that has made us think a real inflection may be possible.
- p.3｜FUNDA will also publish weekly Muse and Instinct use-case updates on Substack and provide institutional clients with detailed agency channel checks to track whether Muse is beginning to affect ad budgets.
- p.23｜Our META 2Q26 Preview, a Premium Report for institutional clients, examined Business Agents' progress and product strategy in detail. We recommend reading it for background.

## Q4 · 他的**假设与算式**能不能复算？

**能复算，且多处复算通过**。取最关键结论之一——用户省钱规模：

- 公式：平均每例年化节省 = 年化总节省 ÷ 可计算例数 = \$35,426 ÷ 49 = \$722.98 ≈ 每例约 \$723（与文中一致）。
- 公式：三组合计 = \$35,426 + \$17,652 + \$1,264 = \$54,342 ≈ 约 \$54,000（与文中一致；文中 \$4,7oo、\$54,0oo 等为 OCR 字形，不影响量级）。

交叉验证同样通过：128 ÷ 654 = 19.57% ≈ 19.6%（最大类占比）；45 ÷ 654 = 6.88% ≈ 6.9%（失败/部分成功/存疑占比）；行业构成缺口 = 7.5 + 6 + 1.5 + 6 = 约 21 个百分点（与文中合计一致）；life admin 归并组内各类例数相加 128+69+53+62+29+28+29+13 = 411 例，与文中 411 例、62.8%（411 ÷ 654 = 62.84%）一致。

注意：以上复算只验证「文内数字自洽」。由于底层金额为用户自报（见 Q5），复算通过 ≠ 数值可被第三方核实；可入模型的只有「每例约 \$723、中位 \$490、合计约 \$54,000」这一组带外部估算标注的量级。

### 依据

- p.6｜4. Of the cases in our database, 49 provide enough detail to calculate savings: \$35,426 annualized in total, or roughly \$723 per case, with a median of \$490. Another 14 cases recovered \$17,652 in unclaimed property, unpaid wages and old escrow balances; the largest recovery was \$4,7oo. Five refund cases totaled \$1,264. Combined, these three groups amount to roughly \$54,0oo. These are all self-reported figures that we cannot independently verify, but their scale helps explain why users are so eager to share these experiences.
- p.3｜with 128 of 654 cases,or 19.6%
- p.9｜Together, these 45 cases represent 6.9% of the sample,versus 7.3% in the first cut.
- p.19｜The table highlights categories where Meta's lack of explicit purchase intent or precise timing has left it less exposed than Google: travel, with a 7.5-percentage-point gap in ad revenue mix; financial services, 6 points; automotive, 1.5 points; and B2B and local services, roughly 6 points. Together, these gaps in revenue mix total approximately 21 percentage points.

## Q5 · 关键数字的**脚注指向哪**？

关键数字的来源分三类，可回溯性不同：

1. **自建用例库（一手收集、但底层为用户自报）**：654 例分类、省钱金额、数据访问比例均出自 FUNDA use-case database。文中明示节省金额「都是用户自报数字，我们无法独立核实」→ 按无法核处理，降级为 Ⅲ，只能作量级旁证。
2. **专家访谈（二手，三重转述）**：行业收入 mix 表（Table 2）与 3Q26 广告支出增速表（Table 3）均出自 agency expert interview——前者来自本周一次「特别有用」的广告代理商专家访谈，后者来自 FUNDA 常态跟踪的 5–10 位 agency 专家中的 North America expert A。专家样本与预测不是 Meta 指引；指向二手，本件内无法再上一手。
3. **公司口径转述（一手但未附出处）**：「Meta currently states that Muse conversations are not shared with its advertising systems」及 Muse 浏览会以用户身份出现等表述指向 Meta 官方说明，属公司口径的二手转述，未给具体公告链接。

结论：无一关键数字附有指向监管文件、公司公告或行业协会统计的可逐行复核脚注；省钱金额自报未核（降级），行业与季度数据为专家访谈（Ⅱ），Meta 政策表述为公司口径转述（Ⅱ）。

### 依据

- p.6｜These are all self-reported figures that we cannot independently verify, but their scale helps explain why users are so eager to share these experiences.
- p.17｜We conducted a particularly useful agency expert interview this week and strongly recommend that clients read the full transcript.
- p.18｜In our agency expert interview, we focused on the industry mix of Google and Meta ad revenue in the expert's sample.
- p.29｜FUNDA regularly tracks quarterly trends with five to ten agency experts. Ahead of quarter-end,we spoke with North America expert A
- p.27｜Meta currently states that Muse conversations are not shared with its advertising systems.

## Q6 · 他的**自建口径 / 评级**定义是什么？与公司口径差多少？

**自建口径有两套，均为计数分类，无评分、无权重、无评级档位**：

1. **用例分类体系（18 个 primary category）**：以类别名称枚举定义（省钱/退款/个人理财、工作与小企业、行政事务、购物、技术与设置、旅游、个人整理、健康、餐饮、家庭、娱乐、内容创作、研究、社交、家务、其他等），每类给例数与占比。
2. **「life admin」二级归并口径**：定义以枚举方式明确给出——把 savings、administrative tasks、travel、shopping、dining、family、health、home tasks 归为一组，得 411 例、占样本 62.8%；并报告了初始读数 64.9% 与周环比变化。
3. 另有配套的**失败模式分类**（网站拦截、错误操作、编造数据、响应慢、谎报完成、任务停滞、其他）与**数据访问/审批口径**（是否授予个人数据、是否设用户检查点），同样是枚举计数。

与公司口径差异：Meta 不披露 Muse 用例分类、失败率或数据访问结构，**无公司口径可对照**；该分类只在 FUNDA 654 例样本内自洽（组内例数可复算相加验证），不得与卖方评级或目标价并列使用，也不得当作 Meta 官方使用结构。无权重、无打分区间 → 定义完整性按「枚举式、无权重」登记，仅可作分类参考。

### 依据

- p.8｜Grouping savings,administrative tasks, travel, shopping,dining, family, health and home tasks as “life admin" gives 411 cases,or 62.8% of the sample.
- p.4｜The six largest primary categories are saving money, refunds and personal finance,with 128 cases (19.6%); work and small business, 73 (11.2%); administrative tasks, 69 (10.6%); shopping, 62 (9.5%); technology and agent setup,54 (8.3%); and travel, 53 (8.1%).
- p.10｜Our failure-mode breakdown includes five cases of website blocking,four incorrect actions,four instances of fabricated data, two slow responses,one false claim of completion, one stalled task and 24 other cases.

## Q7 · 他**有没有投行关系 / 持仓**？

**投行关系与资助：明示没有。** ① FUNDA（Consensus Al Technology Pte. Ltd.，新加坡注册独立研究机构）声明不与任何证券交易商、投行或资产管理公司关联，不在任何法域注册为投资顾问或经纪商；② 与被覆盖公司没有任何投行或承销关系，不接受上市公司赞助或资助；③ 分析师报酬不与报告中的具体推荐或观点直接或间接挂钩。

**持仓：材料未给出此项。** 全文未声明分析师或 FUNDA 是否持有 Meta 证券，按未披露处理，不能假定独立。

### 依据

- p.34｜The Company is not affiliated with any securities dealer, investment bank, or asset management firm,nor is it registered as an investment advisor or broker-dealer in any jurisdiction.
- p.34｜No part of the analyst's compensation was, is， or will be directly or indirectly related to the specific recommendations or views expressed in this report.
- p.34｜The Company does not have any investment banking or underwriting relationship with the companies covered in this report, and does not accept sponsorship or funding from publicly listed companies.

## Q8 · 他的**行业级判断**（产能 · 份额）有数据支撑吗？

**部分有、部分无，需分开记：**

1. **有数据支撑（带口径）**：Meta vs Google 广告收入行业构成（12 行业 mix 估计）——口径是「平台广告收入构成，不是行业市场份额」，范围是受访广告代理商专家样本，给出 Meta 相对 Google 约 21 个百分点的结构性缺口（旅游 7.5、金融 6、汽车 1.5、B2B 及本地约 6）。这是本文最有数据支撑的行业级判断，可用于广告收入结构旁证，但属专家样本估计，非统计口径。
2. **数据支撑弱（估计/引述）**：① WhatsApp Business 占 Meta 总收入「低个位数百分比」（专家估计，其自家样本约 7%）；② 平台变现率「从模糊兴趣一路带到购买可抽 GMV 的 10% 以上、若只是众多广告之一仅 3%」（专家经验引述），并据此讨论 3–5% 佣金机制；③ 一颗 CPU 约支撑 200 DAU（FUNDA 估算，无中间步骤）。
3. **无数据支撑（观点）**：「若 Muse 获得更广泛采用，存在超过 20% 增量 GMV 的可信路径」——纯推断，无数据、无口径四要素，记观点，不得用于市场空间推演；对 Cloudflare/Akamai/Fastly 的 agent 基础设施受益判断同为定性观点。

口径四要素核对：第 1 项有指标（收入 mix）、范围（专家样本）、年份（约 2026 当期）、并明示非市场份额；第 2、3 项缺地理范围与统计年份，记为估计/观点。

### 依据

- p.18｜In our agency expert interview, we focused on the industry mix of Google and Meta ad revenue in the expert's sample.
- p.19｜The table highlights categories where Meta's lack of explicit purchase intent or precise timing has left it less exposed than Google: travel, with a 7.5-percentage-point gap in ad revenue mix; financial services, 6 points; automotive, 1.5 points; and B2B and local services, roughly 6 points. Together, these gaps in revenue mix total approximately 21 percentage points.
- p.32｜By my estimate,WhatsApp Business currently accounts for a low-single-digit share of Meta's total revenue. In our business, it is roughly 7%,or about three times the typical level.
- p.21｜The more a platform contributes to a sale, the more value it can capture. Our agency expert put it this way: “lfα platform can take a consumer from a vague interest all the way to a purchase, it may capture 10% or more of GMv.If it is merely one of many ads, with weak attribution, it may capture only 3%."
- p.20｜If Muse gains broader adoption and gives Meta access to these intent signals,we see a credible path to more than 20% incremental GMV.
