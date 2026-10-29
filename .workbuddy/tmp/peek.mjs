import fs from "node:fs";
const root = "D:/InvestSigh/InvestSigh-Read";
const ids = process.argv.slice(2);
for (const id of ids) {
  const f = root + "/corpus/materials/" + id + "/pages.json";
  try {
    const p = JSON.parse(fs.readFileSync(f, "utf8"));
    const first = p.pages.slice(0, 2).map((g) => g.text.replace(/\s+/g, " ").slice(0, 320)).join(" ⏎ ");
    console.log("### " + id + "  [" + p.pages.length + " pages]");
    console.log(first + "\n");
  } catch (e) {
    console.log("### " + id + "  MISSING " + e.message);
  }
}
