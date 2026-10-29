import fs from "node:fs";
const root = "D:/InvestSigh/InvestSigh-Read";
const dirs = fs
  .readdirSync(root + "/corpus/materials")
  .filter((d) => d.startsWith("03-independent-research"))
  .sort();
for (const id of dirs) {
  let t = "";
  try {
    const p = JSON.parse(fs.readFileSync(root + "/corpus/materials/" + id + "/pages.json", "utf8"));
    t = (p.pages[0]?.text || "").replace(/\s+/g, " ").slice(0, 150);
  } catch (e) {
    t = "ERR " + e.message;
  }
  const filled = fs.existsSync(root + "/output/meta/" + id + "/material.md")
    ? fs.readFileSync(root + "/output/meta/" + id + "/material.md", "utf8").match(/^title: (.*)$/m)?.[1]
    : "";
  console.log("[" + (filled ? "FILLED" : "empty ") + "] " + id.replace("03-independent-research-", "") + " :: " + t);
}
