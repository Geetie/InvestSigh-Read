/**
 * 接入验收：确认 ReactBits vendor 组件被真正引用（不是摆在 src/vendor 里当摆设）。
 * 逐个 vendor 文件名在 src/ 下（排除 src/vendor 自身）搜 import。
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const vendorDir = path.join(root, "src", "vendor");

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(tsx|ts)$/.test(e.name)) out.push(p);
  }
  return out;
}

const vendorFiles = fs
  .readdirSync(vendorDir)
  .filter((f) => f.endsWith(".tsx"))
  .map((f) => f.replace(/\.tsx$/, ""));

const appFiles = walk(path.join(root, "src")).filter((p) => !p.startsWith(vendorDir));

const used = new Map(vendorFiles.map((v) => [v, []]));
for (const file of appFiles) {
  const src = fs.readFileSync(file, "utf8");
  for (const v of vendorFiles) {
    const re = new RegExp(`from\\s+["'][^"']*vendor/${v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`);
    if (re.test(src)) used.get(v).push(path.relative(root, file));
  }
}

let missing = 0;
for (const [v, files] of used) {
  const ok = files.length > 0;
  if (!ok) missing++;
  console.log(
    `${ok ? "USED  " : "UNUSED"} ${v.padEnd(18)} ${files.map((f) => f.replace(/\\/g, "/")).join(", ")}`,
  );
}
console.log(`\nvendor total=${vendorFiles.length} unused=${missing}`);
process.exit(missing ? 1 : 0);
