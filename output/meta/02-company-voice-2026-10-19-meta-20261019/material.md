---
# ── 材料身份（解析成 Material 的字段，键名不要改） ──
id: 02-company-voice-2026-10-19-meta-20261019
cat: 02
sub: company-voice
# ── 模板身份：这份材料是用哪一版问法生成的 ──
template: company-voice
template_version: 2
# ── 材料元信息 ──
date: 2026-10-21
time: 08:00
title: Form 8-K — Meta Platforms, Inc.（事发 2026 年 10 月 19 日，签署 2026 年 10 月 21 日）
kind: 8-K
issuer: Meta Platforms, Inc.
ticker: META
source_pages: 4
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

## 1 · 他把**哪个指标放最前**、哪个**只提一句或埋在中间**？

**结论**：这份材料里没有任何经营或财务指标，被放在最前、占篇幅九成以上的是资本结构（无投票权 C 类股与股票股息）；财务数字被一句话推给另件。

**具体**：说话人是 Meta Platforms, Inc. 公司本体（8-K 正文，无具名发言人），董事会为行为主体。按提及次数排，C 类股、股息、绑定出售条件贯穿 1.01 全条；按被用来解释其他事项的关系排，全篇轴心是控制权——Zuckerberg 拿到的大部分 C 类股不降投票权就卖不掉。收入、成本、费用、利润、现金流一个都没有；2.02 项下只写"已发新闻稿并将开电话会"，业绩数字落在 8-K 之外。

**判断**：三处同指（次数、解释关系、被追问）里第三处本件空缺，因为没有问答；以解释关系为准，主角是"控制权＋摊薄"，不是任何经营指标。要读他的业绩口径，必须换到 Ex-99.1 新闻稿与 10-Q，本件不能承担。

### 依据
- p.1｜establishing a new class of non-voting Class C common stock, par value $0.000006
- p.1｜Mr. Zuckerberg generally cannot obtain liquidity in a significant majority of the non-voting Class C common stock that he will receive in the Stock Dividend without a corresponding reduction in his voting power
- p.2｜the Company issued a press release and will hold a conference call regarding its financial results for the quarter ended September 30, 2026


## 2 · 核心主题（执行 / 战略 / 市场 / 资本配置）**在报表里找得到对应吗**？

**结论**：主题是资本配置（股权结构重排），能对上的是股权结构表里的类别与比例，对不上任何损益科目；本件无法完成"话与数"核对。

**具体**：说话人为公司董事会（1.01 条与 8.01 条）。可落地的三处都是股数层面的安排：A、B 类各按 1:1 领 C 类股；其中 80% 为受限股，每季解禁 2.5%，最快第 32 个季度全部解禁；追加股息以 C 类 30 日成交量加权均价达到 A 类 2026 年 9 月 10 日 $580.60 的 1 倍递增档（2x、4x、8x……）且年化股东回报不低于 10% 为条件。对不上的部分：收入、成本、EPS、资本开支均不在本件，non-GAAP 也只有一句"对账在附件 99.1"，故任何"增长/效率"类叙事都无法在此验证。

**判断**：主题落地到股权结构，落不到利润表。这份文件只能证明"股本要变、控制权要锁"，不能证明经营好坏；把它当作业绩沟通件读会误判。

### 依据
- p.1｜2.5% of the shares of Class C common stock issued to the Holder Group in the Stock Dividend will be released from the Stapling Condition
- p.1｜the 30-day volume weighted average price of the Class C common stock reaches a successive doubling, initially 2x, then 4x, then 8x and so on
- p.1｜of the corresponding price of the Class A common stock on September 10, 2026 of $580.60 per share
- p.2｜A reconciliation of GAAP to non-GAAP results is provided in the attached Exhibit 99.1 press release


## 3 · 问答里他是**直接给数字，还是打太极、换话题**？

**结论**：本件没有问答环节，无法逐条判断给数还是回避；能判的只是契约条款这一层——条款里的数字给得很实，但那不是业绩回答。

**具体**：说话人为公司（2.02 条只作转引）。2.02 项下写的是"已于 2026 年 10 月 21 日发布新闻稿并将举行电话会，讨论截至 2026 年 9 月 30 日季度的财务结果"，问答逐字不在本件。条款层的数字则明确：C 类股 20% 可自由出售、80% 受限；解禁 2.5%/季；追加股息门槛 10% 年化回报；参照价 $580.60（2026 年 9 月 10 日 A 类价）。Zuckerberg 一方另承诺协议后 8 年内继续住在加州或公司总部所在辖区。同时条款也写明了不达标不没收（no shares are forfeited），属带缓冲的措辞。

**判断**：把条款数字当成"他愿意给数"会误读——那是律师写的参数，不是管理层对经营问题的回应。是否打太极，须回电话会逐字另判。

### 依据
- p.2｜the Company issued a press release and will hold a conference call regarding its financial results for the quarter ended September 30, 2026
- p.1｜20% of the shares of Class C common stock to be issued to the Holder Group in the Stock Dividend will be freely saleable and the other 80% of the shares of Class C common stock will be subject to sale and transfer restrictions
- p.1｜no shares are forfeited if the Continued Leadership Condition is not met
- p.1｜for eight years following the date of the Founder Alignment Agreement


## 4 · **哪个问题被不同分析师反复追问**？给**基数**了吗？

**结论**：未见——本件没有任何提问者、没有追问，因此无法计数，也给不出基数。

**具体**：查了四处：1.01 条全文（只有董事会决议、股息、创始人协议、解禁与追加股息、并购与回购条款、终止条款）；2.02 条（只有新闻稿与电话会的时间说明及 non-GAAP 转引）；8.01 条（重述股息宣布）；9.01 条（附件表，10.1 创始人协议、99.1 新闻稿）。四处均为公司单方陈述，无"提问—回答"结构，也无分析师姓名或机构。

**判断**：不能算的理由是体裁——8-K 是申报件，问答只存在于电话会逐字稿，本件仅"将举行电话会"一句，连问答是否存在都无法从此件确认。此项在本件应留空，待电话会材料补齐。

### 依据
- p.2｜the Company issued a press release and will hold a conference call regarding its financial results for the quarter ended September 30, 2026
- p.3｜Item 8.01 Other Events.
- p.4｜Exhibit Number | Exhibit Title or Description
- p.4｜Founder Alignment Agreement, dated October 20, 2026, by and between Mark Zuckerberg and Meta Platforms, Inc.


## 5 · 同一问题**上一季怎么答**？措辞变了吗？（`预计→希望→正在努力` 的降级是领先信号）

**结论**：未见——本件无问答，也没有与上一季并排的同题回答；单期无法判"降级"。

**具体**：本件内可记的字面事实只有三处措辞选择：C 类股被定义为"non-voting"；股息被定义为"one-time"；派发被挂在"章程生效"这一先决条件上，登记日与付款日还要董事会另定。说话人是公司董事会；股东批准已于 2026 年 10 月 20 日以书面同意方式取得，但章程本身还只是"预计"在 10 月 21 日前后提交、2027 年 1 月 19 日生效。

**判断**：这些限定词要与上一期同类文件（上季 8-K／14C 说明函）逐字并排后才谈得上方向；本件是孤本，把"one-time""contingent"读成措辞降级属于凭印象补历史，不成立。

### 依据
- p.1｜contingent upon the effectiveness of the Restated Charter, with the record date and payment date for the Stock Dividend to be established by the Board by subsequent action
- p.1｜which was subsequently approved by the requisite shareholders by written consent on October 20, 2026
- p.1｜The Company expects to file the Restated Charter with the Secretary of State of the State of Delaware on or about October 21, 2026 with an effective date of January 19, 2027
- p.3｜the Board declared the Stock Dividend, contingent upon the effectiveness of the Restated Charter


## 6 · **指引**：区间是收窄还是放宽？有没有**撤回全年指引**？有没有"**重申 + 新增限定条件**"？**口径变了吗**？

**结论**：没有财务指引，收窄／放宽／撤回三项均不适用；唯一的"预期"是三个时点承诺。口径确实变了，但变的是股权口径，不是 non-GAAP 口径。

**具体**：说话人为公司董事会，另有一处为 Mark Zuckerberg 本人（居住承诺，协议一方）。时点承诺三件：章程预计 2026 年 10 月 21 日前后提交、生效日 2027 年 1 月 19 日；股息付款不晚于章程生效后第 5 个营业日；Zuckerberg 在协议后 8 年内继续住在加州或公司总部所在辖区。口径变动：新增无投票权 C 类股，A、B 类各按 1:1 领取，属股本类别口径扩张；non-GAAP 与 GAAP 的桥本件内没有，只写"在附件 99.1 新闻稿"。

**判断**：所有指引都是单点时点、无区间、无金额，故"区间宽度"无处可比；"重申＋新增限定"倒是有一处——股息宣布被重申，同时加了"章程生效"这一先决条件。口径与业绩口径无关，不能拿来解释 non-GAAP 差异。

### 依据
- p.1｜The Company expects to file the Restated Charter with the Secretary of State of the State of Delaware on or about October 21, 2026 with an effective date of January 19, 2027
- p.1｜the payment date will be no later than the fifth business day following the effectiveness of the Restated Charter
- p.1｜for eight years following the date of the Founder Alignment Agreement
- p.2｜Meta is making reference to non-GAAP financial information in both the press release and the conference call
- p.2｜A reconciliation of GAAP to non-GAAP results is provided in the attached Exhibit 99.1 press release


## 7 · 他的指引**兑现记录**怎样（一贯保守 / 一贯激进 / 摇摆）？

**结论**：未见——本件只有单期承诺，且承诺尚未到期，样本为零，不能判保守或激进。

**具体**：查了 1.01 全文、2.02、8.01、9.01 四处：没有任何历史指引的中值、也没有实际达成值；没有上期指引原文可作对照。本件内的三个时点（章程提交 2026 年 10 月 21 日前后、生效 2027 年 1 月 19 日、股息付款不晚于生效后第 5 个营业日）全部落在未来，其中登记日与付款日还要董事会后续另定。说话人为公司董事会。

**判断**：一期样本不能算平均偏离，也不能说"下调后才达成"；此项须待 2027 年 1 月章程是否如期生效、股息是否在 5 个营业日内派发后再回填，届时才有第一笔兑现记录。

### 依据
- p.1｜The Company expects to file the Restated Charter with the Secretary of State of the State of Delaware on or about October 21, 2026 with an effective date of January 19, 2027
- p.1｜contingent upon the effectiveness of the Restated Charter, with the record date and payment date for the Stock Dividend to be established by the Board by subsequent action
- p.2｜the Company issued a press release and will hold a conference call regarding its financial results for the quarter ended September 30, 2026


## 8 · **资本配置的话和做对得上吗**？（说"估值有吸引力"却几乎不回购；指引算力开支下降却称需求强劲）

**结论**：三件能对上的事里，两件"说与做"同在一纸、可强制执行；回购那一件只有措辞、没有额度，是最弱一环。

**具体**：说话人为公司董事会，受限方为 Mark Zuckerberg（CEO，协议一方）。①说"对齐"——做的是硬约束：他领到的 C 类股 20% 可自由卖、80% 卖出时须同步卖出等量 A/B 股或把 B 类转为 A 类，等于用卖出动作换投票权下降；②说"回购"——公司只承诺"善意、尽最大努力"在回购 A 类时同期回购至少等量 C 类，无金额、无期限、无强制；③说"回报"——派的是 1:1 股票股息，不动现金，不算现金回报。

**判断**：控制权那一项话与做一致且可执行；回购那一项是典型的"最高/努力"式软承诺，按上限记也不能与实际发生额比，只能当意向。判断句：这份文件里资本配置的实质是"用股份换控制权稳定"，不是"用现金回报股东"。

### 依据
- p.1｜the Board declared a one-time stock dividend
- p.1｜20% of the shares of Class C common stock to be issued to the Holder Group in the Stock Dividend will be freely saleable and the other 80% of the shares of Class C common stock will be subject to sale and transfer restrictions
- p.1｜the Company and the Board shall in good faith use their best efforts to contemporaneously repurchase at least an equal number of shares of Class C common stock on an aggregate basis


## 9 · ★ **什么"没了"**？（客户数被"客户群增长"取代、留存停更、地域拆分消失）

**结论**：无法做"上期有、本期无"的指标差集——本件自身不带指标清单；能确认的缺口是三处"缺"，性质都不是"不再披露"。

**具体**：查了 1.01、2.02、8.01、9.01 四处。缺口一：non-GAAP 与 GAAP 的桥，本件只写"在附件 99.1 新闻稿"，属换了载体；缺口二：业绩数字（收入、成本、费用、EPS）本件全无，同属载体转移，因为 2.02 只作转引；缺口三：股数绝对量未给，只给比例（20%/80%、2.5%/季、32 个季度），属"只给比例不给绝对数"，与改名、并入口径都不同。说话人为公司董事会。

**判断**：这三处都是申报件体裁造成的抽取缺口，不能读成公司停止披露；真正的"指标消失"要等把本件与上一期同类 8-K 及上季电话会逐项做差集后才谈得上，本件单独不足以支撑该结论。

### 依据
- p.2｜A reconciliation of GAAP to non-GAAP results is provided in the attached Exhibit 99.1 press release
- p.4｜Press release dated October 21, 2026
- p.1｜2.5% of the shares of Class C common stock issued to the Holder Group in the Stock Dividend will be released from the Stapling Condition
- p.1｜Upon the thirty-second calendar quarter


## 10 · 他说"**将 / 预计 / 目标**"的地方，市场当成"**已 / 达**"了吗？

**结论**：本件把"已"与"未"分得很清，但有三处最容易被读成已达：已批准≠已生效、已宣布≠已派发、已达价≠已触发追加股息。

**具体**：说话人为公司董事会，条件受益方为 Mark Zuckerberg 及其受让人群体。①2026 年 10 月 19 日董事会已批准、10 月 20 日股东已书面同意，但章程只是"预计"10 月 21 日前后提交、生效日 2027 年 1 月 19 日；②股息已"宣布"，但明写以章程生效为前提，登记日与付款日由董事会另定，付款不晚于生效后第 5 个营业日；③追加股息（1:1）要 C 类 30 日成交量加权均价达到 A 类 2026 年 9 月 10 日 $580.60 的 2x、4x、8x 递增档，且自该日起年化股东回报不低于 10%，属条件触发。

**判断**：把"宣布/批准"当成"已发行"，会高估摊薄落地时点；最慢一档是受限股按 2.5%/季解禁、第 32 个季度才全部释放。凡见到"已完成资本重组"的说法，应回本件核对：截至签署日，章程未提交、股息未派、C 类股未发行。

### 依据
- p.1｜which was subsequently approved by the requisite shareholders by written consent on October 20, 2026
- p.1｜The Company expects to file the Restated Charter with the Secretary of State of the State of Delaware on or about October 21, 2026 with an effective date of January 19, 2027
- p.1｜contingent upon the effectiveness of the Restated Charter, with the record date and payment date for the Stock Dividend to be established by the Board by subsequent action
- p.1｜the 30-day volume weighted average price of the Class C common stock reaches a successive doubling, initially 2x, then 4x, then 8x and so on
- p.1｜is no less than 10%
- p.1｜Upon the thirty-second calendar quarter
