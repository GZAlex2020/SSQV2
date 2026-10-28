# -*- coding: utf-8 -*-
"""
双色球数据更新脚本(多数据源)
数据源顺序:
  1. 福彩官网 API(国内网络可用,境外 IP 会被 403)
  2. 500.com 开奖历史页(境内外均可访问,GitHub Actions 用)
抓取最近 100 期,校验后更新 双色球分析.html 和 index.html 内嵌数据及 draws.json。
用法: python update_data.py
"""
import json
import re
import urllib.request

HEADERS = {
    "User-Agent": ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                   "(KHTML, like Gecko) Chrome/120.0 Safari/537.36"),
}
CWL_API = ("https://www.cwl.gov.cn/cwl_admin/front/cwlkj/search/kjxx/findDrawNotice"
           "?name=ssq&issueCount=100&pageNo=1&pageSize=100&systemType=PC")
CWL_REFERER = "https://www.cwl.gov.cn/ygkj/wqkjgg/ssq/"
URL_500 = "https://datachart.500.com/ssq/history/newinc/history.php?limit=100&sort=0"

TARGETS = ["双色球分析.html", "index.html"]
MARK = re.compile(r"(const\s+DRAWS_RAW\s*=\s*)\[.*?\];", re.S)


def http_get(url, referer=None):
    headers = dict(HEADERS)
    if referer:
        headers["Referer"] = referer
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read()


def normalize(recs):
    recs = sorted(recs, key=lambda z: z["i"])
    assert len(recs) == 100, "期望100期,实际 %d" % len(recs)
    seen = set()
    for x in recs:
        assert x["i"] not in seen, "期号重复 " + x["i"]
        seen.add(x["i"])
        assert len(x["r"]) == 6 and len(set(x["r"])) == 6, x["i"]
        assert all(1 <= n <= 33 for n in x["r"]), x["i"]
        assert 1 <= x["b"] <= 16, x["i"]
        assert re.match(r"^\d{4}-\d{2}-\d{2}$", x["d"]), x["i"]
    return recs


def from_cwl():
    data = json.loads(http_get(CWL_API, CWL_REFERER).decode("utf-8"))
    assert data.get("state") == 0 and data.get("result"), "接口返回异常"
    return [{
        "i": x["code"],
        "d": x["date"][:10],
        "r": sorted(int(v) for v in x["red"].split(",")),
        "b": int(x["blue"]),
    } for x in data["result"]]


def from_500():
    html = http_get(URL_500).decode("gb18030", errors="replace")
    recs = []
    for row in re.findall(r'<tr class="t_tr1">(.*?)</tr>', html, re.S):
        tds = [re.sub(r"<[^>]+>", "", t).replace("&nbsp;", "").strip()
               for t in re.findall(r"<td[^>]*>(.*?)</td>", row, re.S)]
        if len(tds) < 17 or not tds[1].isdigit():
            continue
        issue = tds[1] if len(tds[1]) == 7 else "20" + tds[1]
        recs.append({
            "i": issue,
            "d": tds[16],
            "r": [int(tds[k]) for k in range(2, 8)],
            "b": int(tds[8]),
        })
    assert recs, "500.com 未解析到数据"
    return recs


def patch_html(path, js_array):
    with open(path, encoding="utf-8") as f:
        html = f.read()
    new_html, n = MARK.subn(lambda m: m.group(1) + js_array + ";", html, count=1)
    if n != 1:
        raise RuntimeError("%s 中未找到 DRAWS_RAW 数据块" % path)
    with open(path, "w", encoding="utf-8") as f:
        f.write(new_html)


def main():
    errors = []
    recs = None
    for name, fn in (("福彩官网", from_cwl), ("500.com", from_500)):
        try:
            recs = normalize(fn())
            print("数据源[%s]成功: %s(%s) ~ %s(%s) 共 %d 期"
                  % (name, recs[0]["i"], recs[0]["d"], recs[-1]["i"], recs[-1]["d"], len(recs)))
            break
        except Exception as e:
            errors.append("%s: %s" % (name, e))
            print("数据源[%s]失败: %s" % (name, e))
    if recs is None:
        raise SystemExit("全部数据源失败: " + " | ".join(errors))

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
