# -*- coding: utf-8 -*-
"""把真实产物并入浏览器台账（public/data/bundle.json）。

跑在 gen_materials.py 之后：合成台账负责占位，真实结果覆盖 03-投行研报 这一型。
幂等：每次都先清掉 03-broker-research 的材料再插入，不会重复。
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BUNDLE = ROOT / "public" / "data" / "bundle.json"
REAL = ROOT / "data" / "real" / "broker-research.json"


def main():
    bundle = json.loads(BUNDLE.read_text(encoding="utf-8"))
    real = json.loads(REAL.read_text(encoding="utf-8"))

    cat_id, sub_id = real["cat"], real["sub"]

    # 1) 清掉该型的合成材料
    before = len(bundle["materials"])
    bundle["materials"] = [
        m for m in bundle["materials"] if not (m["cat"] == cat_id and m["sub"] == sub_id)
    ]
    removed = before - len(bundle["materials"])

    # 2) 插入真实材料
    bundle["materials"].extend(real["materials"])
    bundle["materials"].sort(key=lambda m: (m["date"], m["time"], m["id"]))

    # 3) 该型的行定义换成真实规格的栏目
    for c in bundle["categories"]:
        if c["id"] != cat_id:
            continue
        for s in c["subtypes"]:
            if s["id"] == sub_id:
                s["rows"] = real["rows"]
                s["real"] = True
                s["source"] = real.get("source", "")

    # 4) 全局窗口取所有材料的 min/max
    ds = [m["date"] for m in bundle["materials"]]
    bundle["window"] = [min(ds), max(ds)]

    BUNDLE.write_text(json.dumps(bundle, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")

    active = [m for m in bundle["materials"] if m["cat"] == cat_id and m["sub"] == sub_id]
    cells = sum(m["filled"] for m in active)
    total = len(active) * len(real["rows"])
    print(f"移除合成 {removed} 份 → 插入真实 {len(active)} 份；行 {len(real['rows'])}；"
          f"格 {cells}/{total} ({cells*100//total if total else 0}%)")
    print(f"窗口 {bundle['window'][0]} → {bundle['window'][1]}")


if __name__ == "__main__":
    main()
