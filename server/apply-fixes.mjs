// 审查修补：读法修正与需件 token 修正
import fs from "fs";
const DIR = "/Users/leilabot/InvestSigh-Read/corpus/prompts/";
const fixes = [
  // [文件, 行定位正则, 旧串, 新串, 说明]
  ["02-型/旁证与读穿.md", /有没有时滞/, "| 同型跨期:任一期 |", "| 同型跨期:1期 |", "旁证时滞题需件 token 兼容 kit"],
  ["02-型/别人的解读.md", /预测修正.*上季实际/, "| 同型跨期:1期 |", "| 同型跨期:1期；账本:指引账 |", "解读修正题补账本（上季实际的真源）"],
  ["01-型/委托书.md", /say-on-pay/, "同型跨期:1期(会后8-K", "同类跨型:8-K:会后(表决结果)——旧记法:", "委托书 say-on-pay 需件 token 规范化"],
  ["01-型/10-K.md", /亏损业务分部/, "环比方向", "较上年方向", "10-K 分部题：年报无环比口径"],
  ["01-型/其他条目与红灯.md", /20-F/, "年报期限分别是四个月与三个月", "20-F 四个月、40-F 三个月、6-K 无固定截止日", "其他条目适用性题：6-K 期限句与 §5 对齐"],
  ["01-型/其他条目与红灯.md", /^\| `5\.02` \|/, "| **高管 / 董事**变动 | |", "| **高管 / 董事**变动（8-K 册已覆盖，此处仅回执） |", "其他条目 §3.1：5.02 与 8-K 册分工"],
];
let ok = 0;
for (const [file, loc, from, to, why] of fixes) {
  const p = DIR + file;
  const lines = fs.readFileSync(p, "utf8").split("\n");
  const i = lines.findIndex(l => loc.test(l));
  if (i < 0) { console.log(`SKIP(${file}): ${why} —— 定位失败`); continue; }
  if (!lines[i].includes(from)) { console.log(`SKIP(${file}): ${why} —— 旧串不存在：…${lines[i].slice(-100)}`); continue; }
  lines[i] = lines[i].replace(from, to);
  fs.writeFileSync(p, lines.join("\n"));
  ok++;
  console.log(`OK(${file}): ${why}`);
}
console.log(`${ok}/${fixes.length} 处完成`);
