# -*- coding: utf-8 -*-
"""
双色球数据更新脚本
从中国福彩官网抓取最近 100 期开奖数据,更新 双色球分析.html 和 index.html 中的内嵌数据。
用法: python update_data.py
"""
import json
import re
import urllib.request

API = ("https://www.cwl.gov.cn/cwl_admin/front/cwlkj/search/kjxx/findDrawNotice"
       "?name=ssq&issueCount=100&pageNo=1&pageSize=100&systemType=PC")
HEADERS = {
    "User-Agent": ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                   "(KHTML, like Gecko) Chrome/120.0 Safari/537.36"),
    "Referer": "https://www.cwl.gov.cn/ygkj/wqkjgg/ssq/",
}

TARGETS = ["双色球分析.html", "index.html"]
MARK = re.compile(r"(const\s+DRAWS_RAW\s*=\s*)\[.*?\];", re.S)


def fetch():
    req = urllib.request.Request(API, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=30) as r:
        data = json.loads(r.read().decode("utf-8"))
    assert data.get("state") == 0 and data.get("result"), "接口返回异常: %s" % data.get("message")
    recs = sorted(
        ({
            "i": x["code"],
            "d": x["date"][:10],
            "r": sorted(int(v) for v in x["red"].split(",")),
            "b": int(x["blue"]),
        } for x in data["result"]),
        key=lambda z: z["i"],
    )
    assert len(recs) == 100, "期望100期,实际 %d" % len(recs)
    return recs


def validate(recs):
    for x in recs:
        assert len(x["r"]) == 6 and len(set(x["r"])) == 6, x["i"]
        assert all(1 <= n <= 33 for n in x["r"]), x["i"]
        assert 1 <= x["b"] <= 16, x["i"]
    # 期号应连续递增
    nums = [int(x["i"]) for x in recs]
    assert nums == sorted(nums) and len(set(nums)) == 100, "期号异常"


def patch_html(path, js_array):
    with open(path, encoding="utf-8") as f:
        html = f.read()
    new_html, n = MARK.subn(lambda m: m.group(1) + js_array + ";", html, count=1)
    if n != 1:
        raise RuntimeError("%s 中未找到 DRAWS_RAW 数据块" % path)
    with open(path, "w", encoding="utf-8") as f:
        f.write(new_html)


def main():
    recs = fetch()
    validate(recs)
    first, last = recs[0], recs[-1]
    print("抓取成功: %s(%s) ~ %s(%s) 共 %d 期" % (first["i"], first["d"], last["i"], last["d"], len(recs)))
    js = json.dumps([[x["i"], x["d"], x["r"], x["b"]] for x in recs],
                    ensure_ascii=False, separators=(",", ":"))
    for p in TARGETS:
        patch_html(p, js)
        print("已更新:", p)
    with open("draws.json", "w", encoding="utf-8") as f:
        json.dump(recs, f, ensure_ascii=False, indent=1)
    print("已同步 draws.json")


if __name__ == "__main__":
    main()
