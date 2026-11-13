// 存量卡同步：按分册问句表新序重排卡内题节并改题号。
// 匹配：归一化（去空白/ emphasis 符号）后比较题文；新表题无卡节=缺席（合法，待重填生效）；卡节无表题=置尾+警告。
import fs from "fs";
import path from "path";
const ROOT = "/Users/leilabot/InvestSigh-Read";
const SUBMAP = {
  "8-K与EX-99.1": "01-型/8-K与EX-99.1.md", "10-K": "01-型/10-K.md", "10-Q": "01-型/10-Q.md",
  "委托书": "01-型/委托书.md", "招股书": "01-型/招股书.md", "其他条目与红灯": "01-型/其他条目与红灯.md",
  "company-voice": "02-型/公司自己的话.md", "third-party": "02-型/别人的解读.md", "cross-read": "02-型/旁证与读穿.md",
  "broker-research": "03-型/投行研报.md", "independent-research": "03-型/独立研究.md", "consensus-ratings": "03-型/共识与评级档位.md",
  "expert-channel": "03-型/专家纪要与渠道交流.md", "media-analysis": "03-型/媒体分析.md",
  "short-option": "04-型/做空与期权读数.md", "insider-filing": "04-型/内部人申报.md", "institutional-holding": "04-型/机构持仓申报.md",
  "alt-data": "05-型/另类数据.md", "chain-tracking": "05-型/产业链跟踪.md", "consensus-gap": "07-型/共识预期与预期差.md",
};
const norm = (s) => s.replace(/[\s*`＄]/g, "").replace(/[（(]/g, "(").replace(/[）)]/g, ")");
const bigrams = (s) => { const set = new Set(); for (let i = 0; i < s.length - 1; i++) set.add(s.slice(i, i + 2)); return set; };
const sim = (a, b) => { const A = bigrams(a), B = bigrams(b); let inter = 0; for (const x of A) if (B.has(x)) inter++; return inter / (A.size + B.size - inter); };
const rowRe = /^\|\s*(Q?)(\d+)\s*\|/;
const headRe = /^##\s+(Q?)(\d+)\s*·\s*(.*)$/m;
function tableRows(file) {
  const lines = fs.readFileSync(path.join(ROOT, "corpus/prompts", file), "utf8").split("\n");
  const s = lines.findIndex(l => /^#{1,4} .*问句表/.test(l));
  if (s < 0) throw new Error(`tableRows: ${file} 找不到问句表`);
  let e = lines.length;
  for (let i = s + 1; i < lines.length; i++) if (/^#{1,3} /.test(lines[i])) { e = i; break; }
  const rows = [];
  for (let i = s; i < e; i++) {
    const m = lines[i].match(rowRe);
    if (m) rows.push({ no: Number(m[2]), prefix: m[1], text: lines[i].split("|")[2].trim() });
  }
  return rows;
}
let total = 0, reordered = 0, absent = [], unmatched = [], unchanged = 0;
for (const dir of fs.readdirSync(path.join(ROOT, "output/meta"))) {
  const card = path.join(ROOT, "output/meta", dir, "material.md");
  if (!fs.existsSync(card)) continue;
  const raw = fs.readFileSync(card, "utf8");
  const sub = (raw.match(/^sub:\s*"?([^"\n]+)"?/m) || [])[1];
  const booklet = SUBMAP[sub];
  if (!booklet) continue;
  const rows = tableRows(booklet);
  const lines = raw.split("\n");
  // 找卡内题节：headRe 行起的连续块（到下一个 ## 行前）
  const heads = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(headRe);
    if (m) heads.push({ i, prefix: m[1], no: Number(m[2]), text: m[3].trim() });
  }
  if (!heads.length) continue;
  total++;
  // 每节范围
  const sections = heads.map((h, k) => ({ ...h, end: (k + 1 < heads.length ? heads[k + 1].i : lines.length) }));
  const texts = rows.map(r => norm(r.text));
  const assigned = new Set();
  const newOrder = [];
  const leftovers = [];
  for (const sec of sections) {
    const nt = norm(sec.text);
    // 档1：全等或前缀 40
    let idx = texts.findIndex((t, k) => !assigned.has(k) && (t === nt || t.startsWith(nt.slice(0, 40)) || nt.startsWith(t.slice(0, 40))));
    // 档2：bigram 相似度回退（题干历史漂移）；要求唯一最佳且过阈值
    if (idx < 0) {
      let best = -1, bestScore = 0;
      texts.forEach((t, k) => { if (!assigned.has(k)) { const s2 = sim(t, nt); if (s2 > bestScore) { bestScore = s2; best = k; } } });
      if (best >= 0 && bestScore >= 0.55) idx = best;
    }
    if (idx >= 0) { assigned.add(idx); newOrder.push({ sec, row: rows[idx] }); }
    else leftovers.push(sec);
  }
  const missingInCard = rows.filter((_, k) => !assigned.has(k));
  if (missingInCard.length) absent.push(`${dir}: 缺 ${missingInCard.map(r => r.no).join(",")}`);
  if (leftovers.length) unmatched.push(`${dir}: 未匹配节 ${leftovers.map(s => s.no + "·" + s.text.slice(0, 20)).join(" / ")}`);
  // 是否已恒等（节位置与号都已是表序）
  const sorted = newOrder.slice().sort((a, b) => a.row.no - b.row.no);
  const identity = leftovers.length === 0 && sorted.length === sections.length &&
    sorted.every((x, k) => x.sec.i === sections[k].i) &&
    sorted.every((x, k) => (x.row.prefix + x.row.no) === (x.sec.prefix + x.sec.no));
  if (identity) { unchanged++; continue; }
  // 重写卡：头部（YAML+引用行）不变，题节按表序重排
  const firstHead = sections[0].i;
  const head = lines.slice(0, firstHead).join("\n");
  const bodyParts = [];
  sorted.forEach((x) => {
    const seg = lines.slice(x.sec.i, x.sec.end).join("\n");
    const newNo = `${x.row.prefix}${x.row.no}`;
    bodyParts.push(seg.replace(headRe, (m0, p, n, t) => `## ${newNo} · ${t}`));
  });
  for (const sec of leftovers) bodyParts.push(lines.slice(sec.i, sec.end).join("\n"));
  fs.writeFileSync(card, head + "\n" + bodyParts.join("\n").replace(/\n*$/, "\n"));
  reordered++;
  console.log(`${dir}: ${sections.length} 节 → 表序 ${sorted.map(x => x.row.prefix + x.row.no).join(",")}${leftovers.length ? " ＋ 置尾" + leftovers.length + " 节" : ""}`);
}
console.log(`\n共 ${total} 张卡参与，重排 ${reordered}，恒等跳过 ${unchanged}`);
if (absent.length) console.log(`卡缺新表题（待重填生效）：\n  ` + absent.join("\n  "));
if (unmatched.length) console.log(`未匹配（人工看）：\n  ` + unmatched.join("\n  "));
