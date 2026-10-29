---
# ── 材料身份（解析成 Material 的字段，键名不要改） ──
id: 01-other-forms-2026-10-19-meta-20261019
cat: 01
sub: "其他条目与红灯"
# ── 模板身份：这份材料是用哪一版问法生成的 ──
template: 其他条目与红灯
template_version: 2
# ── 材料元信息 ──
date: 2026-10-21
time: 08:00
title: "Meta Platforms 8-K：Class C 股本重组与创始人对齐协议"
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

## Q1 · 这份件里的**可观察 / 可计量硬事实**是什么？

① **结论**：硬事实是一整套股本重组条款，不是经营数字。可计量的有六组：新设零投票权 Class C（面值 0.000006 美元）、1 股派 1 股的股票股息、创始人获发 Class C 按 20%／80% 拆分、每季解绑 2.5% 且共 32 个季度、附息触发价锚定 2026 年 9 月 10 日 A 股 580.60 美元、以及自该日起年化复合回报不低于 10%。全部带期限或阈值，可逐条复核。

② **事实与数字**：
- 时点链：董事会 2026 年 10 月 19 日批准重述章程并建议股东采纳；股东 2026 年 10 月 20 日以书面同意批准；公司预计 2026 年 10 月 21 日前后报送特拉华州州务卿，生效日 2027 年 1 月 19 日。批准前经一个由无利害关系独立董事组成的特别委员会一致建议。
- 派息：董事会同日宣布一次性股票股息，每 1 股 A 或 B 派 1 股 Class C，以章程生效为条件；登记日与支付日由董事会后续确定，但依对创始人的对齐协议，支付不晚于章程生效后第 5 个工作日。
- 契约：2026 年 10 月 20 日公司与 Zuckerberg 签创始人 alignment 协议。其获发 Class C 中 20% 可自由出售，80% 为受绑定股；每卖 1 股受绑定股，须在结算后 2 个营业日内卖出 1 股 A 或 B（或把 1 股 B 转为 A，或动用绑定额度）；解绑比例＝可解绑容量÷当时所持受绑定股数，且不超过 1；违规出售视为自动把等量 B 转为 A；过失错误给 5 个交易日补救。
- 解绑时间表：派息后首个完整日历季末起，每季释放「派息所发 Class C 的 2.5%」，条件是 Zuckerberg 全时留任高管团队或董事会执行主席；不满足的季度不计入、股份不没收；第 32 个连续满足的季度释放全部剩余。另承诺协议后 8 年居住在公司总部所在州。
- 附息条款：当 Class C 的 30 日成交量加权均价达到 2026 年 9 月 10 日 A 股 580.60 美元/股的连续翻倍（先 2 倍、再 4 倍、再 8 倍…），且自该日起按同一均价、计股息再投资的年化复合股东回报不低于 10%，董事会须宣布 1:1 附加派息；每个翻倍事件最多一次；Zuckerberg 去世后不再发生。
- 对称回购：派息支付后，若公司决定回购 A 股，须善意尽力同期回购至少等量 Class C。
- 终止权：章程未在协议日起 2 个营业日内报送、或未于 2027 年 1 月 19 日前生效、派息未在章程生效后第 5 个营业日支付、重大违约 30 日未补救，Zuckerberg 可终止；公司方在对称情形下亦可终止，须经至少两名无利害董事组成的委员会或审计与隐私委员会批准。
- 业绩条目的硬事实只有两项时点：2026 年 10 月 21 日发布新闻稿并开电话会，对应期间为截至 2026 年 9 月 30 日的季度；新闻稿本身不在本件正文。

③ **自洽校验与边界**：2.5%×32 个季度＝80%，与「80% 受绑定」这一比例严丝合缝，说明解绑轨道是按同一分母设计的；580.60×2＝1,161.20 美元是第一个翻倍门槛，属倍数条款的算术展开，不是新事实。本件未给派息总股数，也未给 Zuckerberg 持股数，所以稀释比例无法算，也不外推；这两项属「本件无此项」，不是漏抄。

### 依据
- p.1｜which was subsequently approved by the requisite shareholders by written consent on October 20, 2026
- p.1｜on or about October 21, 2026 with an effective date of January 19, 2027
- p.1｜based on the unanimous recommendation of a special committee consisting of disinterested and independent directors established to review such transaction
- p.1｜the Board declared a one-time stock dividend of one share of the Company
- p.1｜contingent upon the effectiveness of the Restated Charter, with the record date and payment date for the Stock Dividend to be established by the Board by subsequent action
- p.1｜under the Founder Alignment Agreement described below, the payment date will be no later than the fifth business day following the effectiveness of the Restated Charter
- p.1｜20% of the shares of Class C common stock to be issued to the Holder Group in the Stock Dividend will be freely saleable and the other 80% of the shares of Class C common stock will be subject to sale and transfer restrictions
- p.1｜a number of Stapled Class C Shares then held by the Holder Group equal to 2.5% of the shares of Class C common stock issued to the Holder Group in the Stock Dividend will be released from the Stapling Condition
- p.1｜Upon the thirty-second calendar quarter in which the Continued Leadership Condition has been satisfied at all times, all remaining Stapled Class C Shares then held by the Holder Group will be released from the Stapling Condition.
- p.1｜the Holder Group will have five trading days after the earlier of the Company notifying Mr. Zuckerberg, or Mr. Zuckerberg notifying the Company, of such sale to cure the violation
- p.1｜the 30-day volume weighted average price of the Class C common stock reaches a successive doubling, initially 2x, then 4x, then 8x and so on, of the corresponding price of the Class A common stock on September 10, 2026 of $580.60 per share
- p.1｜is no less than 10%
- p.1｜in the event the Company, with the approval of the Board, determines to repurchase shares of Class A common stock, the Company and the Board shall in good faith use their best efforts to contemporaneously repurchase at least an equal number of shares of Class C common stock on an aggregate basis
- p.1｜Mr. Zuckerberg may terminate the Founder Alignment Agreement if the Restated Charter is not filed with the Secretary of State of the State of Delaware within two business days of the date of the Founder Alignment Agreement or is not effective by January 19, 2027
- p.1｜Mr. Zuckerberg has also separately committed, for eight years following the date of the Founder Alignment Agreement
- p.2｜On October 21, 2026, the Company issued a press release and will hold a conference call regarding its financial results for the quarter ended September 30, 2026.
- p.3｜As described above, also on October 19, 2026, the Board declared the Stock Dividend, contingent upon the effectiveness of the Restated Charter


## Q2 · 附件清单里**有哪些原始文本**？其中哪份是契约？

① **结论**：附件三份，唯一是契约的是 10.1 创始人对齐协议；99.1 是新闻稿，104 是封面交互数据文件。但契约全文不在本件内——正文只给摘要，并自述摘要不完整、整体以 10.1 全文为准。

② **逐条**：
- 10.1，Founder Alignment Agreement，2026 年 10 月 20 日，双方为 Zuckerberg 与 Meta Platforms, Inc.，性质：契约。它是本件里唯一能支撑「绑定条件、解绑比例、附息触发、终止权」的原始文本，也是正文自认「qualify in its entirety」的落点。
- 99.1，2026 年 10 月 21 日新闻稿，性质：业绩新闻稿，且为 furnished（提供）而非 filed（提交），登记在业绩条目下。
- 104，封面交互数据文件，XBRL 标签内嵌，性质：封面数据，不含额外事实。

③ **边界**：10.1 的全文未随本件到手，属「附件未在手」，不是材料缺口；因此凡涉及绑定条款的细节只能按摘要读，冲突时规则上以全文为准，而全文此刻不可核。另外其他事件条目指向一份 Schedule 14C 初步信息声明，也是一份独立原始文本，但它不在本件附件表内，只是被引用。

### 依据
- p.4｜Founder Alignment Agreement, dated October 20, 2026, by and between Mark Zuckerberg and Meta Platforms, Inc.
- p.4｜Press release dated October 21, 2026
- p.4｜Cover Page Interactive Data File (the cover page XBRL tags are embedded within the inline XBRL document)
- p.1｜The foregoing description of the Founder Alignment Agreement does not purport to be complete and is subject to, and is qualified in its entirety, by the full text of the Founder Alignment Agreement
- p.1｜which is filed as Exhibit 10.1 to this Current Report on Form 8-K.
- p.2｜A copy of the press release is furnished as Exhibit 99.1 to this Current Report on Form 8-K.
- p.3｜Preliminary Information Statement on Schedule 14C to be filed with the Securities and Exchange Commission on or about the date hereof.


## Q3 · 这是**外国发行人的表格**吗？对我的对象是否适用？

① **结论**：不是，也**不适用**。这是美国国内发行人的 8-K 现行报告，不是 20-F，也不是 6-K，因此不套外国发行人那套「furnish 降级」与「无固定截止日」的口径。

② **依据三点**：其一，表种是 8-K 现行报告，件内以 Item 编号组织（重大协议、经营成果、其他事件、财务报表与附件），而外国发行人的临时报告没有 Item 编号体系；其二，发行人是特拉华州公司，章程报送对象是特拉华州州务卿，属国内法域；其三，披露义务挂在国内法条上——交易法 18 条的责任界定、以及 Regulation FD 的披露渠道，都是国内发行人的制度装置。

③ **一处必须分清的降级**：本件内部确实有「furnished 而非 filed」的措辞，但它只作用于业绩条目及其新闻稿附件，不作用于整份 8-K；把这条降级规则外推到重大协议条目上，就会把一份已提交的契约说成「仅供参考」。这是本件最容易读错的一处。

### 依据
- p.1｜which is filed as Exhibit 10.1 to this Current Report on Form 8-K.
- p.1｜with the Secretary of State of the State of Delaware
- p.2｜shall not be deemed "filed" for purposes of Section 18 of the Securities Exchange Act of 1934
- p.2｜as means of disclosing material non-public information and for complying with its disclosure obligations under Regulation FD
- p.2｜A copy of the press release is furnished as Exhibit 99.1 to this Current Report on Form 8-K.
- p.4｜Item 9.01 Financial Statements and Exhibits.


## Q4 · 这件**是不是本类**？若不是，该归哪一类？

① **结论**：**部分是**。本件是 8-K，四个条目里三条属本类（重大明确协议、其他事件、财务报表与附件），一条属业绩件（经营成果及其新闻稿附件）。所以本件按「本类为主、业绩部分只记残余」处理，不重复记述业绩内容。

② **归类纠正**：经营成果条目及其 99.1 新闻稿归业绩件口径，此处只登记「存在这一条目、对应截至 2026 年 9 月 30 日季度、2026 年 10 月 21 日发布」这三项残余，指引、桥、量价一律不在本册问。另一处要纠正的是其他事件条目指向的 Schedule 14C，那是治理与股东行动类文件，属募资与治理口径，本册不含；它也不在手，只作线索登记。

③ **条目回执与红灯**：本件只出现四个条目号。破产接管、矿山安全、网络安全事件、完成收购处置、新增直接财务义务、加速义务、退出成本、重大减值、退市或未达标通知、未注册售股、权利变更、审计师变更、财报不可依赖、控制权变更、高管董事变动、章程与福利计划类、股东投票结果、股东提名、资产支持类、Reg FD 单独条目——逐一未见；查的地方是全件四个条目段与附件清单，件内没有这些条目号。未出现不等于未发生，故只记「本件无此条目」，不写成「公司无此事项」。红灯对照结论：命中「契约／承诺／期限类事实而模型接不住」一条——绑定条件、32 个季度解绑、翻倍附息、双向终止权都属期限与契约条款，模型没有对应格，应报缺格；审计师变更与重述、重大减值、网络安全、退市通知、退出成本五项按条目回执未见，不作表外补充。

### 依据
- p.1｜Item 1.01. Entry into a Material Definitive Agreement.
- p.2｜Item 2.02 Results of Operations and Financial Condition.
- p.3｜Item 8.01 Other Events.
- p.4｜Item 9.01 Financial Statements and Exhibits.
- p.3｜Preliminary Information Statement on Schedule 14C to be filed with the Securities and Exchange Commission on or about the date hereof.
- p.1｜The Company, with the approval of a committee of the Board consisting of at least two directors, or the audit & privacy committee
