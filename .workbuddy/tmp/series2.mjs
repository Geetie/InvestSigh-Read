import fs from "node:fs";
import path from "node:path";

const batch = JSON.parse(fs.readFileSync(".workbuddy/tmp/meta-batch.json", "utf8"));

/** 面板区 = 现 text 去掉 pages.mineru.json 里的原文，剩下的就是补回来的那段 */
function appended(dir, n, curText) {
  const bak = path.join(dir, "pages.mineru.json");
  if (!fs.existsSync(bak)) return "";
  const orig = (JSON.parse(fs.readFileSync(bak, "utf8")).pages.find((p) => p.n === n)?.text) || "";
  return curText.slice(orig.length);
}

const rows = [];
for (const r of batch) {
  const d = path.join("corpus/materials", r.id);
  const pages = JSON.parse(fs.readFileSync(path.join(d, "pages.json"), "utf8")).pages;
  const byN = new Map(pages.map((g) => [g.n, g.text || ""]));
  const rec = { id: r.id, date: r.date, panelPage: r.pt[0] };

  const app = appended(d, r.pt[0], byN.get(r.pt[0]) || "");
  const ow = app.match(/(\d{1,3})%\s*Overweight/);
  const eq = app.match(/(\d{1,3})%\s*Equal-weight/);
  const uw = app.match(/(\d{1,3})%\s*Underweight/);
  rec.ow = ow?.[1];
  rec.eq = eq?.[1];
  rec.uw = uw?.[1];
  const ends = [...app.matchAll(/\$([\d,]+\.\d\d)/g)].map((m) => m[1]).slice(0, 2);
  if (ends.length === 2) rec.ends = ends;

  // 自家评级与目标价：面板页或首页
  for (const g of pages) {
    const t = g.text || "";
    if (!/Meta\s+Platforms/i.test(t)) continue;
    const pt = t.match(/\$([\d,]+)\.00\s*(?:\n|\s)*PRICE\s*TARGET/i);
    if (pt && !rec.msPT) {
      rec.msPT = pt[1];
      const rt = t.match(/\b(OVERWEIGHT|EQUAL-WEIGHT|UNDERWEIGHT)\b/);
      if (rt) rec.msRating = rt[1];
      rec.ptPage = g.n;
    }
  }

  // 覆盖域表：家数 + 占比（这是 §3.2 三件里的「占比」与「投行服务占比」）
  const tPage = r.table.map((n) => byN.get(n) || "").find((t) => /Coverage Universe/.test(t)) || "";
  const cells = (label, cnt) => {
    const m = tPage.match(new RegExp(label + "</td>(?:<td[^>]*>)?([\\s\\S]{0,160}?)</tr>"));
    if (!m) return null;
    const nums = [...m[1].matchAll(/>([\d,]+%?|\d+)</g)].map((x) => x[1]);
    return nums.slice(0, cnt);
  };
  rec.covOW = cells("Overweight/Buy", 6);
  rec.covEW = cells("Equal-weight/Hold", 6);
  rec.covUW = cells("Underweight/Sell", 6);
  rec.covTotal = cells("Total", 3);
  rec.tablePage = r.table.find((n) => /Coverage Universe/.test(byN.get(n) || ""));
  // 披露时点：MS 表下脚注只写「currently assigned ratings」，无 as-of
  const tail = tPage.slice(tPage.indexOf("</table>"), tPage.indexOf("</table>") + 700);
  rec.asOf = (tail.match(/[Aa]s of ([A-Z][a-z]+ \d{1,2},? \d{4})/) || [])[1] || null;

  rows.push(rec);
}

rows.sort((a, b) => (a.date || "").localeCompare(b.date || ""));
fs.writeFileSync(".workbuddy/tmp/consensus-series.json", JSON.stringify(rows, null, 1));
console.log("date        三档%（OW/EW/UW）  一致目标价两端($)      MS PT  覆盖域(%)      披露时点");
for (const r of rows) {
  const tri = [r.ow ?? "-", r.eq ?? "-", r.uw ?? "-"].join("/");
  console.log(
    (r.date || "?").padEnd(11),
    tri.padEnd(16),
    (r.ends ? r.ends.join(" ~ ") : "-").padEnd(22),
    (r.msPT ?? "-").padStart(5),
    (r.covOW ? r.covOW.join(" ") : "-").padEnd(14),
    r.asOf ?? "未标",
  );
}
