import fs from "node:fs";
const root = "D:/InvestSigh/InvestSigh-Read";
const dirs = fs
  .readdirSync(root + "/output/meta")
  .filter((d) => d.startsWith("03-independent"))
  .sort();
const normDigits = (s) => s.replace(/[,，\s]/g, "");
const rows = [];
for (const id of dirs) {
  const t = fs.readFileSync(root + "/output/meta/" + id + "/material.md", "utf8");
  const secs = t.split(/^## /m).slice(1);
  for (const s of secs) {
    const q = s.split(/\s/)[0];
    const body = s.split(/^### 依据/m)[0].replace(/^[^\n]*\n/, "");
    const ev = (s.split(/^### 依据/m)[1] || "").split(/^## /m)[0] || "";
    const evD = normDigits(ev);
    // 只取阿拉伯数字串（≥2 位，避免 1/2/3 这类序数噪声）
    const nums = [...body.matchAll(/\d[\d,\.]{1,}/g)]
      .map((m) => normDigits(m[0]).replace(/\.$/, ""))
      .filter((x) => x.replace(/\D/g, "").length >= 2);
    const uniq = [...new Set(nums)];
    if (!uniq.length) continue;
    const miss = uniq.filter((n) => {
      const d = n.replace(/\D/g, "");
      return !evD.includes(d);
    });
    rows.push({ id: id.replace("03-independent-research-", "").slice(0, 34), q, total: uniq.length, miss: miss.length, sample: miss.slice(0, 4).join(" ") });
  }
}
rows.sort((a, b) => b.miss - a.miss);
const bad = rows.filter((r) => r.miss >= 3 && r.miss / r.total > 0.5);
console.log("问题格数(缺≥3且过半未登记):", bad.length, "／总格数", rows.length);
for (const r of bad.slice(0, 25)) console.log(`${r.miss}/${r.total} ${r.id} ${r.q} :: ${r.sample}`);
