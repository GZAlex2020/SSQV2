/* ============================================================
 * math-drill.js —— 数学专项：口算闯关出题器 + 口诀公式卡
 * ------------------------------------------------------------
 * 纯本地生成，无需联网；题目为教学示范题，不是教材原题。
 * 每道题返回 { q, a, opts, tip }，统一为四选项，便于即时判分。
 * ============================================================ */
(function () {
  'use strict';

  function rnd(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function shuffle(a) {
    var r = a.slice(), i, j, t;
    for (i = r.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = r[i]; r[i] = r[j]; r[j] = t; }
    return r;
  }
  function uniq(correct, distract) {
    var set = [String(correct)], fill = ['以上都不对', '需要再算一遍', '条件不够'];
    (distract || []).forEach(function (x) {
      x = String(x); if (set.indexOf(x) < 0 && set.length < 4) set.push(x);
    });
    for (var k = 0; set.length < 4 && k < fill.length; k++) if (set.indexOf(fill[k]) < 0) set.push(fill[k]);
    return shuffle(set);
  }
  function make(q, correct, distract, tip) {
    return { q: q, a: String(correct), opts: uniq(correct, distract), tip: tip || '' };
  }

  /* ---------- 题型定义 ---------- */
  var TYPES = [
    { id: 'add5', label: '5 以内加法', level: 1, tip: '把两部分合起来', gen: function () {
      var a = rnd(1, 4), b = rnd(1, 5 - a);
      return make(a + ' + ' + b + ' = ?', a + b, [a + b + 1, a + b - 1, a * b], '从 ' + a + ' 往后数 ' + b + ' 个。');
    } },
    { id: 'sub5', label: '5 以内减法', level: 1, tip: '从总数里去掉一部分', gen: function () {
      var a = rnd(2, 5), b = rnd(1, a);
      return make(a + ' − ' + b + ' = ?', a - b, [a - b + 1, a + b, a - b + 2], '从 ' + a + ' 里拿走 ' + b + ' 个。');
    } },
    { id: 'add10', label: '10 以内加法', level: 1, tip: '凑十是重点', gen: function () {
      var a = rnd(1, 9), b = rnd(1, 10 - a);
      return make(a + ' + ' + b + ' = ?', a + b, [a + b + 1, a + b - 1, 10], '先看清一共合起来是多少。');
    } },
    { id: 'sub10', label: '10 以内减法', level: 1, tip: '想加法算减法', gen: function () {
      var a = rnd(3, 10), b = rnd(1, a);
      return make(a + ' − ' + b + ' = ?', a - b, [a - b + 1, a - b - 1, a + b], '想一想：几加 ' + b + ' 等于 ' + a + '？');
    } },
    { id: 'carry', label: '20 以内进位加法', level: 1, tip: '凑十法', gen: function () {
      var a = rnd(5, 9), b = rnd(10 - a + 1, 9), s = a + b;
      return make(a + ' + ' + b + ' = ?', s, [s + 1, s - 1, s - 10], '把 ' + b + ' 拆成 ' + (10 - a) + ' 和 ' + (b - (10 - a)) + '，先凑成 10。');
    } },
    { id: 'borrow', label: '20 以内退位减法', level: 1, tip: '破十法 / 想加算减', gen: function () {
      var a = rnd(11, 18), b = rnd(a - 9, 9), s = a - b;
      return make(a + ' − ' + b + ' = ?', s, [s + 1, s - 1, 10 - b], '先算 10 − ' + b + '，再加上个位。');
    } },
    { id: 'add100', label: '100 以内加减法', level: 1, tip: '整十数先算', gen: function () {
      var a = rnd(11, 79), b = rnd(2, 9), plus = Math.random() < 0.5;
      var s = plus ? a + b : a - b;
      return make(a + (plus ? ' + ' : ' − ') + b + ' = ?', s, [s + 1, s - 1, s + 10], '个位先算，再合上十位。');
    } },
    { id: 'compare', label: '100 以内数的认识', level: 1, tip: '数位与比大小', gen: function () {
      var a = rnd(11, 98), b = rnd(11, 98);
      if (a === b) b = a + 1;
      var s = a > b ? '>' : '<';
      return make(a + ' ○ ' + b + '，○ 里填？', s, ['<', '>', '='], '先看十位，十位相同再看个位。');
    } },
    { id: 'length', label: '长度单位换算', level: 2, tip: '1 米 = 100 厘米，1 厘米 = 10 毫米', gen: function () {
      var mode = rnd(1, 5), n = rnd(2, 9), m = rnd(1, 9) * 10;
      if (mode === 1) return make(n + ' 米 = ( ? ) 厘米', n * 100, [n * 10, n * 100 + 10, n * 1000], '1 米 = 100 厘米，乘 100。');
      if (mode === 2) return make(n + ' 厘米 = ( ? ) 毫米', n * 10, [n * 100, n + 10, n * 10 + 5], '1 厘米 = 10 毫米，乘 10。');
      if (mode === 3) return make(n + ' 米 ' + m + ' 厘米 = ( ? ) 厘米', n * 100 + m, [n * 100 + m / 10, n * 100 - m, n * 10 + m], '先把 ' + n + ' 米换成 ' + (n * 100) + ' 厘米，再加上 ' + m + '。');
      if (mode === 4) return make('( ? ) 厘米 = ' + n + ' 米', n * 100, [n * 10, n * 1000, n * 100 + 100], '1 米 = 100 厘米，' + n + ' 米就是 ' + n + ' 个 100 厘米。');
      var c = rnd(2, 15) * 10, ans = c < 100 ? '<' : (c > 100 ? '>' : '=');
      return make(c + ' 厘米 ○ 1 米，○ 里填？', ans, ['>', '<', '='], '1 米 = 100 厘米，先统一单位再比。');
    } },
    { id: 'mult', label: '表内乘法口诀', level: 2, tip: '九九乘法表', gen: function () {
      var a = rnd(2, 9), b = rnd(2, 9), s = a * b;
      return make(a + ' × ' + b + ' = ?', s, [s + a, s - b, a + b], '口诀：' + CN[a] + CN[b] + (s < 10 ? '得' : '') + numCn(s) + '。');
    } },
    { id: 'div', label: '表内除法', level: 2, tip: '用乘法口诀求商', gen: function () {
      var b = rnd(2, 9), q = rnd(2, 9), s = b * q;
      return make(s + ' ÷ ' + b + ' = ?', q, [q + 1, q - 1, b], '想：' + b + ' × 几 = ' + s + '？');
    } },
    { id: 'remainder', label: '有余数的除法', level: 2, tip: '余数一定比除数小', gen: function () {
      var b = rnd(3, 6), q = rnd(2, 6), r = rnd(1, b - 1), s = b * q + r;
      return make(s + ' ÷ ' + b + ' = ' + q + ' …… ( ? )', r, [r + 1, b, 0], '余数要比除数 ' + b + ' 小。');
    } },
    { id: 'mixed', label: '混合运算', level: 2, tip: '先乘除后加减', gen: function () {
      var a = rnd(2, 9), b = rnd(2, 9), c = rnd(1, 20), s = a * b + c;
      return make(a + ' × ' + b + ' + ' + c + ' = ?', s, [s + c, a * (b + c), s - 1], '先算 ' + a + '×' + b + '=' + (a * b) + '，再加 ' + c + '。');
    } },
    { id: 'time', label: '时、分、秒', level: 3, tip: '1 时 = 60 分，1 分 = 60 秒', gen: function () {
      var mode = rnd(1, 5), n = rnd(2, 9), m = rnd(1, 5) * 10;
      if (mode === 1) return make(n + ' 时 = ( ? ) 分', n * 60, [n * 100, n * 60 + 10, n * 30], '1 时 = 60 分，乘 60。');
      if (mode === 2) return make(n + ' 分 = ( ? ) 秒', n * 60, [n * 100, n * 6, n * 60 + 60], '1 分 = 60 秒，乘 60。');
      if (mode === 3) return make(n + ' 时 ' + m + ' 分 = ( ? ) 分', n * 60 + m, [n * 60 - m, n * 60 + m * 10, n * 100 + m], '先把 ' + n + ' 时换成 ' + (n * 60) + ' 分，再加 ' + m + '。');
      if (mode === 4) return make('( ? ) 分 = ' + n + ' 时', n * 60, [n * 10, n * 100, n + 60], '1 时 = 60 分，' + n + ' 时是 ' + n + ' 个 60 分。');
      var h = rnd(7, 10), a = rnd(0, 4) * 5, b = rnd(1, 5) * 10;
      return make('从 ' + h + ':' + (a < 10 ? '0' + a : a) + ' 到 ' + h + ':' + (a + b < 10 ? '0' + (a + b) : a + b) + '，经过 ( ? ) 分', b,
        [b + 10, b + 60, Math.max(1, b - 5)], '同一小时内，用结束分钟减开始分钟。');
    } },
    { id: 'bigadd', label: '万以内加减法', level: 3, tip: '相同数位对齐', gen: function () {
      var a = rnd(120, 890), b = rnd(110, 890), s = a + b;
      return make(a + ' + ' + b + ' = ?', s, [s + 10, s - 10, s + 100], '列竖式，从个位加起，满十进一。');
    } },
    { id: 'mult1', label: '多位数乘一位数', level: 3, tip: '从个位乘起', gen: function () {
      var a = rnd(12, 99), b = rnd(2, 9), s = a * b;
      return make(a + ' × ' + b + ' = ?', s, [s + b, s - a, s + 10], '拆成整十和个位分别乘，再相加。');
    } },
    { id: 'fraction', label: '分数的初步认识', level: 3, tip: '同分母相加减，分母不变', gen: function () {
      var d = rnd(4, 9), a = rnd(1, d - 2), b = rnd(1, d - a);
      var s = (a + b) + '/' + d;
      return make(a + '/' + d + ' + ' + b + '/' + d + ' = ?', s,
        [(a + b) + '/' + (d * 2), (a * b) + '/' + d, (a + b - 1) + '/' + d],
        '分母都是 ' + d + '，只把分子相加：' + a + '+' + b + '=' + (a + b) + '。');
    } },
    { id: 'area', label: '周长与面积', level: 3, tip: '周长一圈，面积一片', gen: function () {
      var a = rnd(3, 12), b = rnd(2, 10), isA = Math.random() < 0.5;
      var s = isA ? a * b : 2 * (a + b);
      return make('长 ' + a + ' 厘米、宽 ' + b + ' 厘米的长方形，' + (isA ? '面积' : '周长') + '是？',
        s, [a + b, 2 * a * b, s + a], isA ? '面积 = 长 × 宽，单位是平方厘米。' : '周长 = (长 + 宽) × 2，单位是厘米。');
    } },
    { id: 'date', label: '年、月、日', level: 3, tip: '大月 31 天，小月 30 天', gen: function () {
      var m = rnd(1, 12), big = [1, 3, 5, 7, 8, 10, 12].indexOf(m) >= 0;
      var s = big ? '31 天' : (m === 2 ? '28 或 29 天' : '30 天');
      return make(m + ' 月有多少天？', s, ['31 天', '30 天', '28 或 29 天'], '一三五七八十腊，三十一天永不差。');
    } },
    { id: 'bignum', label: '大数的认识', level: 4, tip: '四位一级', gen: function () {
      var n = rnd(2, 90), s = n + ' 万';
      return make(n + '0000 改写成用「万」作单位是？', s, [n + ' 千', n * 10 + ' 万', n + ' 亿'], '去掉末尾 4 个 0，添上「万」字。');
    } },
    { id: 'angle', label: '角的度量', level: 4, tip: '直角 90°，平角 180°', gen: function () {
      var a = rnd(20, 160), s = 180 - a;
      return make('一个角与 ' + a + '° 的角合成平角，它是多少度？', s, [90 - a, a, 360 - a], '平角是 180°，用 180 − ' + a + '。');
    } },
    { id: 'ops', label: '运算定律简算', level: 4, tip: '乘法分配律', gen: function () {
      var a = rnd(11, 49), b = rnd(2, 9), c = 10 - b, s = a * 10;
      return make(a + ' × ' + b + ' + ' + a + ' × ' + c + ' = ?', s, [a * b, a * (b + c + 1), s + a],
        '提取相同的 ' + a + '：' + a + ' × (' + b + '+' + c + ') = ' + a + ' × 10。');
    } },
    { id: 'decimal', label: '小数加减法', level: 4, tip: '小数点对齐', gen: function () {
      var a = (rnd(11, 89) / 10), b = (rnd(11, 89) / 10), s = (a + b).toFixed(1);
      return make(a.toFixed(1) + ' + ' + b.toFixed(1) + ' = ?', s,
        [(a + b + 1).toFixed(1), (a + b - 1).toFixed(1), (a + b).toFixed(0)],
        '小数点对齐，按整数加法算，最后点上小数点。');
    } }
  ];

  var CN = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  function numCn(n) {
    if (n < 10) return CN[n];
    var s = Math.floor(n / 10), g = n % 10;
    return (s > 1 ? CN[s] : '') + '十' + (g ? CN[g] : '');
  }

  /* ---------- 按单元推荐题型 ---------- */
  var RECOMMEND = {
    '1|上|2': ['add5', 'sub5', 'add10', 'sub10'],
    '1|上|7': ['carry', 'add10', 'sub10'],
    '1|下|1': ['borrow', 'carry', 'sub10'],
    '1|下|3': ['add100', 'compare', 'add10'],
    '2|上|0': ['length', 'add100', 'compare'],
    '2|上|3': ['mult', 'add100', 'div'],
    '2|下|1': ['div', 'mult', 'remainder'],
    '2|下|5': ['remainder', 'div', 'mixed'],
    '3|上|0': ['time', 'bigadd', 'add100'],
    '3|上|7': ['fraction', 'div', 'add100'],
    '3|下|4': ['area', 'mult', 'bigadd'],
    '3|下|5': ['date', 'time', 'mixed'],
    '4|上|0': ['bignum', 'bigadd', 'compare'],
    '4|上|2': ['angle', 'mult1', 'mixed'],
    '4|下|2': ['ops', 'mult1', 'mixed'],
    '4|下|3': ['decimal', 'fraction', 'bigadd']
  };

  function byId(id) {
    for (var i = 0; i < TYPES.length; i++) if (TYPES[i].id === id) return TYPES[i];
    return null;
  }
  function recommend(grade, volume, unitIndex) {
    var ids = RECOMMEND[grade + '|' + volume + '|' + unitIndex] || [];
    var list = ids.map(byId).filter(Boolean);
    if (list.length) return list;
    var lv = grade;
    return TYPES.filter(function (t) { return t.level === lv; }).slice(0, 3);
  }
  function groupByLevel() {
    var g = {};
    TYPES.forEach(function (t) { (g[t.level] || (g[t.level] = [])).push(t); });
    return g;
  }
  function build(typeId, n) {
    var t = byId(typeId) || TYPES[0], out = [], guard = 0;
    while (out.length < (n || 10) && guard++ < 200) {
      var q = t.gen();
      var dup = out.some(function (x) { return x.q === q.q; });
      if (!dup) out.push(q);
    }
    return out;
  }

  /* ---------- 口诀 / 公式速查卡 ---------- */
  var CARDS = [
    { level: 1, title: '凑十歌', color: '#2f6fed', lines: [
      '一九一九好朋友，二八二八手拉手。',
      '三七三七真亲密，四六四六一起走。',
      '五五五五伸出手，凑成十的好朋友。'
    ] },
    { level: 1, title: '数位顺序', color: '#2f6fed', lines: [
      '从右边起：个位、十位、百位。',
      '10 个一是 1 个十，10 个十是 1 个百。',
      '读数从高位读起，写数从高位写起。'
    ] },
    { level: 2, title: '长度单位', color: '#0f9d8c', lines: [
      '1 米 = 100 厘米，1 厘米 = 10 毫米。',
      '1 米 = 10 分米，1 分米 = 10 厘米。',
      '量比较短的物体用厘米，量比较长的用米。'
    ] },
    { level: 2, title: '乘法口诀要点', color: '#0f9d8c', lines: [
      '一一得一，二二得四，九九八十一。',
      '交换两个乘数，积不变。',
      '用口诀求商：想「几和几相乘得被除数」。'
    ] },
    { level: 2, title: '有余数的除法', color: '#0f9d8c', lines: [
      '被除数 ÷ 除数 = 商 …… 余数。',
      '余数一定要比除数小。',
      '验算：除数 × 商 + 余数 = 被除数。'
    ] },
    { level: 3, title: '时间单位', color: '#d98324', lines: [
      '1 时 = 60 分，1 分 = 60 秒。',
      '1 日 = 24 时，1 年 = 12 个月。',
      '一三五七八十腊，三十一天永不差。'
    ] },
    { level: 3, title: '周长与面积', color: '#d98324', lines: [
      '长方形周长 = (长 + 宽) × 2。',
      '长方形面积 = 长 × 宽。',
      '正方形周长 = 边长 × 4，面积 = 边长 × 边长。'
    ] },
    { level: 3, title: '分数初步', color: '#d98324', lines: [
      '把一个整体平均分，分母表示分成几份。',
      '同分母分数相加减，分母不变、分子相加减。',
      '分子分母相同的分数等于 1。'
    ] },
    { level: 4, title: '大数与近似数', color: '#8b5cf6', lines: [
      '从右往左每四位一级：个级、万级、亿级。',
      '改写用等号，求近似数用约等号。',
      '四舍五入：小于 5 舍去，满 5 进一。'
    ] },
    { level: 4, title: '运算定律', color: '#8b5cf6', lines: [
      '加法交换律：a + b = b + a。',
      '乘法分配律：(a + b) × c = a × c + b × c。',
      '连减性质：a − b − c = a − (b + c)。'
    ] },
    { level: 4, title: '图形与小数', color: '#8b5cf6', lines: [
      '三角形内角和是 180 度。',
      '小数加减要对齐小数点。',
      '小数的末尾添 0 或去 0，小数大小不变。'
    ] }
  ];

  function cards(grade) {
    var hit = CARDS.filter(function (c) { return c.level === grade; });
    return hit.length ? hit : CARDS.filter(function (c) { return c.level <= grade; }).slice(-3);
  }

  /* 九九乘法表：口诀文本，点读用 */
  function multiTable() {
    var rows = [];
    for (var a = 1; a <= 9; a++) {
      var row = [];
      for (var b = a; b <= 9; b++) {
        var s = a * b;
        row.push({ a: a, b: b, s: s, text: CN[a] + CN[b] + (s < 10 ? '得' : '') + numCn(s) });
      }
      rows.push(row);
    }
    return rows;
  }

  window.MathDrill = {
    types: TYPES,
    recommend: recommend,
    groupByLevel: groupByLevel,
    byId: byId,
    build: build,
    cards: cards,
    multiTable: multiTable
  };
})();
