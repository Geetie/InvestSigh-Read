# 材料类型的结构分级

> 读法怎么写，取决于**这一类材料里答案有没有固定位置**。
> 有法定骨架的可以写「看哪一节」；没有固定版式的写「看哪一节」就是造谣。

分级表落在 `corpus/prompts/_types.json`，`npm run lint:readings` 按它检查：
**N 类读法里出现「第几节 / 附注 / 附表 / 表头 / 字段 / Item」= 不合格**（这类材料没有这些位置）。

## 三类

| 级 | 含义 | 读法该写成什么 | 型 |
|---|---|---|---|
| **S 法定骨架** | 表格编号、条目顺序由法规规定，同一类文档长得一样 | 可以指位置：Item 编号、附表名、字段名、申报期限 | 10-K、10-Q、8-K与EX-99.1、委托书、招股书、其他条目与红灯、insider-filing、institutional-holding、short-option |
| **C 行业惯例** | 有通行版式与口径，但各家排版自由；位置不可指，口径可指 | 写「找什么、按什么口径、怎么判」，不写「第几节」 | broker-research、consensus-ratings、independent-research、macro-cycle、fiscal-debt、option-vol、rates-inflation、consensus-gap、position-flow、sentiment-survey、chain-tracking、alt-data |
| **N 无固定版式** | 每份材料结构都不一样，答案散落在正文里 | **只能写判据**：什么算有据、什么不算、缺了怎么记。禁止指位置 | media-analysis、expert-channel、company-voice、third-party、cross-read、chain-map、prediction-market |

## 判据式读法（N 类）该长什么样

三件事，缺一不可：

1. **什么算证据**（要不要具名、要不要原始文件、要不要两个独立来源）；
2. **怎么判**（看哪一对事实是否互相印证、哪句话是判断哪句话是事实）；
3. **没有就说没有**（这一项材料可能压根不涉及，必须写「材料未提供」，不许推断）。

反例（这些写法在 N 类是误导）：

- 「先看第一节的摘要」—— 媒体稿没有第一节
- 「取表头的口径」—— 专家纪要没有表头
- 「按附表逐行对」—— 独立研究常没有附表

## C 类的写法

可以有口径（季调/未季调、均值/中位数、名义/实际），但**不指定章节**：
写「这份材料的收入是怎么拆的，有就抄、没有就写未拆分」，而不是「看 MD&A 第二节」。

## S 类才有位置

10-K 的 Item 1/7/8、8-K 的 Item 2.02、Form 4 的 Table I、13F 的 summary page ——
这些是法规规定的，任何一家公司都一样，指位置不算误导。
