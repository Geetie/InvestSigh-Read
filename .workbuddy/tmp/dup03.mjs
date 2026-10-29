import fs from "node:fs";
const root = "D:/InvestSigh/InvestSigh-Read";
const ids = process.argv.slice(2);
for (const id of ids) {
  const t = fs.readFileSync(root + "/output/meta/" + id + "/material.md", "utf8");
  const secs = t.split(/^## /m).slice(1);
  const map = new Map();
  for (const s of secs) {
    const q = s.split(/\s/)[0];
    const ev = (s.split(/^### 依据/m)[1] || "").split(/^## /m)[0] || "";
    for (const m of ev.matchAll(/^-\s*p\.(\d+)\s*[｜|]\s*(.+)$/gm)) {
      const key = m[2].trim();
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(q + "@p" + m[1]);
    }
  }
  console.log("\n### " + id);
  let n = 0;
  for (const [k, v] of map) {
    if (v.length > 1) {
      n++;
      console.log(" " + v.length + "x [" + v.join(", ") + "] " + k.slice(0, 90));
    }
  }
  console.log(" dup groups: " + n);
}
