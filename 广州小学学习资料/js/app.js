/* ============================================================
 * app.js —— 应用主逻辑
 * ------------------------------------------------------------
 * 只负责「渲染与交互」，不含任何教材内容。
 * 所有内容来自 config.js（目录/配置）与 data-*.js（单元数据）。
 * ============================================================ */
(function () {
  'use strict';

  var C = window.APP_CONFIG;
  var SP = window.Speech;
  var DATA = window.UNIT_DATA;
  var BD = window.BasicData || null;   /* 目录空白单元的基础学习内容生成器 */
  var SB = window.StrokeBook || {
    has: function () { return false; }, info: function () { return {}; }, count: function () { return 0; },
    stepsHtml: function () { return ''; }, gridSvg: function () { return ''; },
    create: function () { return null; }, call: function () { return false; },
    quiz: function () { return false; }, supported: false, note: ''
  };
  var MD = window.MathDrill;
  var TEXTS = window.TEXT_DATA || {};

  /* ---------------- 图标 ---------------- */
  var P = {
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    calc: '<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><path d="M8 10h1M12 10h1M16 10h1M8 14h1M12 14h1M16 14h1M8 18h1M12 18h1M16 18h1"/>',
    globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    notebook: '<path d="M4 4a2 2 0 0 1 2-2h14v20H6a2 2 0 0 1-2-2z"/><path d="M8 2v20M11 7h6M11 11h6"/>',
    speaker: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/>',
    trophy: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3"/>',
    play: '<polygon points="5 3 19 12 5 21 5 3"/>',
    stop: '<rect x="6" y="6" width="12" height="12" rx="2"/>',
    star: '<polygon points="12 2 15.1 8.3 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 8.9 8.3 12 2"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
    refresh: '<path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>',
    x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    right: '<polyline points="9 18 15 12 9 6"/>',
    layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    pencil: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    print: '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
    eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8z"/>',
    list: '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>'
  };
  function ic(n, cls) {
    return '<svg class="ic ' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (P[n] || P.info) + '</svg>';
  }

  /* ---------------- 工具 ---------------- */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function split(s, sep) { return String(s || '').split(sep || '|').map(function (x) { return x.trim(); }).filter(Boolean); }
  function shuffle(a) {
    var r = a.slice(), i, j, t;
    for (i = r.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = r[i]; r[i] = r[j]; r[j] = t; }
    return r;
  }
  function $(sel) { return document.querySelector(sel); }
  function $$(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }

  /* ---------------- 状态与存档 ---------------- */
  var S = {
    grade: 1, subject: 'chinese', volume: '上', unitIndex: 0, module: 'preview',
    hideWords: false, challenge: null, progress: loadProgress(), flipped: {},
    /* 新增模块状态 */
    strokeChar: '', strokeStep: 0, writer: null, strokeQuiz: false,
    textHide: false, customTexts: loadTexts(),
    drillType: '', drill: null
  };
  function loadProgress() {
    try { return JSON.parse(localStorage.getItem(C.storageKey) || '{}') || {}; } catch (e) { return {}; }
  }
  function saveProgress() {
    try { localStorage.setItem(C.storageKey, JSON.stringify(S.progress)); } catch (e) {}
  }
  /* 「录入课本原文」只保存在本机浏览器，不上传 */
  function loadTexts() {
    try { return JSON.parse(localStorage.getItem(C.textStorageKey) || '{}') || {}; } catch (e) { return {}; }
  }
  function saveTexts() {
    try { localStorage.setItem(C.textStorageKey, JSON.stringify(S.customTexts)); } catch (e) {}
  }
  function unitKey(g, s, v, i) { return g + '|' + s + '|' + v + '|' + i; }
  function markVisited(mod) {
    var k = unitKey(S.grade, S.subject, S.volume, S.unitIndex);
    var p = S.progress[k] || (S.progress[k] = {});
    p.visited = p.visited || {};
    p.visited[mod] = true;
    saveProgress();
  }

  /* ---------------- 数据解析 ---------------- */
  function currentKey() { return S.grade + '|' + S.subject + '|' + S.volume; }
  /** 精编单元优先；目录里其余课由 BasicData 生成基础学习内容，
   *  这样每一课点开都有预习、笔顺、复习、跟读、原文、通关六大模块。 */
  function currentUnitRaw() {
    var k = currentKey() + '|' + S.unitIndex;
    return DATA[k] || (BD ? BD.unit(S.grade, S.subject, S.volume, S.unitIndex) : null);
  }
  function isBasicUnit() { return BD ? BD.isBasic(S.grade, S.subject, S.volume, S.unitIndex) : false; }
  function currentTitles() { return C.getCatalog(S.grade, S.subject, S.volume); }
  function currentTitle() { return currentTitles()[S.unitIndex] || '单元 ' + (S.unitIndex + 1); }
  function currentLang() { return SP.langOf(S.subject); }

  function parseWords(raw) {
    return split(raw, ';').map(function (s) {
      var a = split(s, '|');
      return { t: a[0] || '', p: a[1] || '', m: a[2] || '' };
    }).filter(function (w) { return w.t; });
  }
  function parseQuiz(raw) {
    return split(raw, ';').map(function (s) {
      var a = s.split('|');
      if (a.length < 3) return null;
      var opts = split(a[1], ',');
      return { q: a[0], options: opts, a: parseInt(a[2], 10) || 0, e: a[3] || '' };
    }).filter(Boolean);
  }
  function parseLines(raw) {
    return split(raw, ';').map(function (s) {
      var a = split(s, '|');
      return { t: a[0] || '', p: a[1] || '', m: a[2] || '' };
    }).filter(function (x) { return x.t; });
  }
  function parseUnit(u) {
    return {
      title: u.title || currentTitle(),
      goals: split(u.goals), words: parseWords(u.words), ask: split(u.ask),
      steps: split(u.steps), points: split(u.points), quiz: parseQuiz(u.quiz),
      lines: parseLines(u.lines), hw: split(u.hw), tip: u.tip || ''
    };
  }

  /* ---------------- 新增模块的数据准备 ---------------- */
  function unitFullKey() { return unitKey(S.grade, S.subject, S.volume, S.unitIndex); }

  /** 从本课字词里提取要练笔顺的生字（保留拼音与组词） */
  function strokeChars(u) {
    var list = [], seen = {};
    u.words.forEach(function (w) {
      var t = String(w.t || '').trim();
      if (!t) return;
      var arr = Array.prototype.slice.call(t);
      if (arr.length === 1 && /[\u4e00-\u9fa5]/.test(t)) {
        if (!seen[t]) { seen[t] = 1; list.push({ ch: t, p: w.p, words: w.m }); }
      } else {
        arr.forEach(function (ch) {
          if (/[\u4e00-\u9fa5]/.test(ch) && !seen[ch]) { seen[ch] = 1; list.push({ ch: ch, p: '', words: '' }); }
        });
      }
    });
    return list;
  }

  /** 整段文本按句末标点断句（不使用后行断言，兼容旧浏览器） */
  function splitSentences(text, isEn) {
    var out = [], buf = '', marks = isEn ? '.!?' : '。！？；', i, c;
    for (i = 0; i < text.length; i++) {
      c = text.charAt(i);
      buf += c;
      if (marks.indexOf(c) < 0) continue;
      /* 英文句号后若紧跟数字或非空白，可能是小数/缩写，不断 */
      if (isEn && c === '.' && i + 1 < text.length && !/\s/.test(text.charAt(i + 1))) continue;
      if (buf.trim()) out.push(buf.trim());
      buf = '';
    }
    if (buf.trim()) out.push(buf.trim());
    return out;
  }

  /** 把用户录入的课本原文拆成句子；支持 A: / B: 角色前缀 */
  function parseCustomText(raw, isEn) {
    var src = String(raw || '').replace(/\r/g, '').trim();
    if (!src) return null;
    var rows = src.split('\n').map(function (x) { return x.trim(); }).filter(Boolean);
    if (rows.length === 1) rows = splitSentences(rows[0], isEn);
    var lines = rows.map(function (r) {
      var role = '';
      var m = r.match(/^([A-Za-z\u4e00-\u9fa5]{1,10})\s*[:：]\s*(.+)$/);
      if (m && (isEn || /^(A|B|老师|妈妈|爸爸|同学)$/.test(m[1]))) { role = m[1]; r = m[2]; }
      return { role: role, t: r, p: '', m: '' };
    }).filter(function (x) { return x.t; });
    if (!lines.length) return null;
    return {
      kind: isEn ? 'dialogue' : 'poem',
      source: '我的课本原文（本机保存）',
      title: '我录入的课本原文',
      note: '按孩子手上的课本自行录入，内容只保存在本机浏览器。',
      sections: [{ title: '', author: '', lines: lines }]
    };
  }

  /** 当前课文原文：优先用户录入，其次内置古诗文 / 示范对话，最后用本单元示范句段兜底 */
  function currentTextData() {
    var k = unitFullKey();
    var customRaw = S.customTexts[k];
    var isEn = S.subject === 'english';
    var custom = parseCustomText(customRaw, isEn);
    if (custom) return { origin: 'custom', data: custom, hasBuiltin: !!TEXTS[k], hasCustom: true };
    if (TEXTS[k]) return { origin: 'builtin', data: TEXTS[k], hasBuiltin: true, hasCustom: false };
    /*
     * 现代课文受著作权保护，不能预先收录。若这一课没有内置古诗文、家长也还没录入，
     * 就用「课本跟读」模块的配套示范句段生成一份可跟读内容，
     * 让「课文原文」页点开即有句子可读、可连读、可背诵，而不是只有空状态。
     */
    var raw = currentUnitRaw();
    if (raw) {
      var u = parseUnit(raw);
      if (u.lines && u.lines.length) {
        var basic = isBasicUnit();
        return {
          origin: 'sample', hasBuiltin: false, hasCustom: false,
          data: {
            kind: 'sample',
            title: basic ? ('跟读短文 · ' + (raw.textTitle || '原创朗读练习')) : '已初始化 · 本单元示范句段',
            source: basic ? '原创朗读练习（非教材原文）' : '示范句段（非课文原文）',
            note: basic
              ? '这是一篇为朗读训练原创编写的短文，不是本课的课本原文；打开即可逐句点读、整篇连读与背诵。课本原文请点「录入课本原文」按课本粘贴一次。'
              : '已为本单元准备好配套句段，打开即可逐句点读、整篇连读与背诵；如需课本原文，点「录入课本原文」粘贴一次。',
            sections: [{ title: '', author: '', lines: u.lines }]
          }
        };
      }
    }
    return { origin: 'none', data: null, hasBuiltin: false, hasCustom: false };
  }

  function flattenLines(data) {
    var out = [];
    (data.sections || []).forEach(function (sec, si) {
      (sec.lines || []).forEach(function (l, li) {
        out.push({ t: l.t, role: l.role || '', si: si, li: li, key: si + '-' + li });
      });
    });
    return out;
  }

  /* ---------------- 通用片段 ---------------- */
  function sectionHead(icon, title, desc, extra) {
    return '<div class="sec-head"><div class="sec-title">' + ic(icon) + '<h3>' + esc(title) + '</h3></div>' +
      (desc ? '<p class="sec-desc">' + esc(desc) + '</p>' : '') +
      (extra ? '<div class="sec-extra">' + extra + '</div>' : '') + '</div>';
  }
  function speakBtn(text, lang, label, cls) {
    return '<button class="speak-btn ' + (cls || '') + '" data-act="speak" data-text="' + esc(text) + '" data-lang="' + esc(lang) + '" title="点击发音">' +
      ic('speaker') + (label ? '<span>' + esc(label) + '</span>' : '') + '</button>';
  }
  function wordLabel() { return C.subjectById(S.subject).wordLabel; }
  function readLabel() { return C.subjectById(S.subject).readLabel; }

  /* ---------------- 侧栏 ---------------- */
  function renderSidebar() {
    var subject = C.subjectById(S.subject);
    var stage = C.stageByGrade(S.grade);
    var h = '';

    h += '<div class="brand"><div class="brand-logo">' + ic('book') + '</div>' +
      '<div><div class="brand-name">' + esc(C.appName) + '</div>' +
      '<div class="brand-sub">' + esc(C.appSubTitle) + '</div></div></div>';

    /* 学段 */
    h += '<div class="side-label">学段</div><div class="stage-row">';
    C.stages.forEach(function (st) {
      var on = st.id === stage.id;
      h += '<button class="stage-chip ' + (on ? 'on' : '') + '" data-act="stage" data-v="' + st.id + '">' + esc(st.label) + '</button>';
    });
    h += '</div>';

    /* 年级 */
    h += '<div class="side-label">年级</div><div class="grade-grid">';
    stage.grades.forEach(function (g) {
      var on = g === S.grade, ready = C.isReady(g);
      h += '<button class="grade-btn ' + (on ? 'on' : '') + ' ' + (ready ? '' : 'planned') + '" data-act="grade" data-v="' + g + '">' +
        (ready ? '' : ic('lock', 'lock-ic')) + esc(C.gradeShort(g)) + '</button>';
    });
    h += '</div>';
    if (stage.planned.length) {
      h += '<p class="side-tip">' + ic('info') + '带锁年级已预留槽位，内容待建设</p>';
    }

    /* 学科 */
    h += '<div class="side-label">学科</div><div class="subject-list">';
    C.subjects.forEach(function (s) {
      var on = s.id === S.subject;
      var note = (s.id === 'english' && S.grade < 3) ? '口语启蒙' : '';
      h += '<button class="subject-btn ' + (on ? 'on' : '') + '" data-act="subject" data-v="' + s.id + '" style="--sc:' + s.color + ';--ss:' + s.soft + '">' +
        '<span class="subject-ic">' + ic(s.icon) + '</span><span class="subject-txt">' + esc(s.label) +
        (note ? '<small>' + note + '</small>' : '') + '</span>' + (on ? ic('right', 'arrow') : '') + '</button>';
    });
    h += '</div>';

    /* 册次 */
    h += '<div class="side-label">册次</div><div class="vol-row">';
    C.volumes.forEach(function (v) {
      h += '<button class="vol-btn ' + (S.volume === v ? 'on' : '') + '" data-act="volume" data-v="' + v + '">' + esc(v) + '册</button>';
    });
    h += '</div>';

    /* 单元目录 */
    var titles = currentTitles();
    var fullCount = 0;
    titles.forEach(function (t, i) { if (DATA[currentKey() + '|' + i]) fullCount++; });
    h += '<div class="side-label unit-label">课本目录 <span>' + titles.length + ' 课 · 全部可学</span></div>';
    h += '<div class="unit-hint">' + ic('info') + '<span>向下滚动查看全部 ' + titles.length + ' 课' +
      '（精编 ' + fullCount + ' 课）　<i class="dot-full"></i>精编 <i class="dot-basic"></i>通用示范</span></div>';
    h += '<div class="unit-list">';
    titles.forEach(function (t, i) {
      var full = !!DATA[currentKey() + '|' + i];
      var on = i === S.unitIndex;
      var p = S.progress[unitKey(S.grade, S.subject, S.volume, i)];
      h += '<button class="unit-btn ' + (on ? 'on' : '') + ' ' + (full ? '' : 'basic') + '" data-act="unit" data-v="' + i +
        '" title="' + esc(t + '（' + (full ? '精编学习内容' : '通用教学示范内容，非教材原文') + '）') + '">' +
        '<span class="unit-no">' + (i + 1) + '</span><span class="unit-name">' + esc(t) + '</span>' +
        (p && p.stars ? '<span class="unit-stars">' + starStr(p.stars) + '</span>' :
          '<span class="unit-dot ' + (full ? '' : 'basic') + '"></span>') +
        '</button>';
    });
    h += '</div>';

    h += '<div class="side-foot">' +
      '<button class="foot-btn" data-act="guide">' + ic('layers') + '扩展指南：新增年级 / 初高中</button>' +
      '<button class="foot-btn" data-act="about">' + ic('info') + '教材版本与使用说明</button>' +
      '</div>';

    $('#sidebar').innerHTML = h;
  }

  function starStr(n) {
    var s = '';
    for (var i = 0; i < 3; i++) s += '<span class="' + (i < n ? 'st-on' : 'st-off') + '">' + ic('star') + '</span>';
    return s;
  }

  /* ---------------- 顶栏 ---------------- */
  function renderTopbar() {
    var subj = C.subjectById(S.subject);
    var ready = C.isReady(S.grade);
    var h = '';
    h += '<div class="crumb">' + ic('layers') + '<span>' + esc(C.stageByGrade(S.grade).label) + '</span>' + ic('right') +
      '<span>' + esc(C.gradeLabel(S.grade)) + '</span>' + ic('right') +
      '<span>' + esc(subj.label) + '</span>' + ic('right') +
      '<span>' + esc(S.volume) + '册</span></div>';
    h += '<div class="top-actions">' +
      (SP.supported ? '' : '<span class="warn-pill">' + ic('info') + '当前浏览器不支持语音，请用 Edge / Chrome</span>') +
      '<button class="top-btn" data-act="settings" title="语音设置">' + ic('settings') + '<span>语音设置</span></button>' +
      '<button class="top-btn" data-act="print" title="打印本页">' + ic('print') + '</button>' +
      '</div>';
    $('.topbar').innerHTML = h;

    if (!ready) return;
  }

  /* ---------------- 模块可见性兜底 ---------------- */
  /** 当前学科允许出现的模块。只认 moduleSets + only，绝不渲染模块全集 */
  function activeModules() {
    var list = C.modulesFor(S.subject) || [];
    return list.filter(function (m) {
      return m && m.id && (!m.only || m.only.indexOf(S.subject) >= 0);
    });
  }
  /** 切科/切册后如残留了别的学科模块，自动回到该学科第一个模块 */
  function ensureModule() {
    var list = activeModules();
    if (!list.length) { S.module = 'preview'; return; }
    for (var i = 0; i < list.length; i++) if (list[i].id === S.module) return;
    S.module = list[0].id;
  }
  /** 选一个能整除的列数，让每一行标签都排满、末尾不留半行空格 */
  function tabCols(n) {
    if (n % 5 === 0) return 5;
    if (n % 4 === 0) return 4;
    if (n % 3 === 0) return 3;
    return Math.min(n, 3);
  }

  /* ---------------- 主区 ---------------- */
  function renderMain() {
    /* innerHTML 重绘前先释放上一个笔顺动画实例 */
    if (S.writer) { SB.call(S.writer, 'cancelQuiz'); S.writer = null; }
    S.strokeQuiz = false;
    ensureModule();
    if (!C.isReady(S.grade)) { renderLocked(); return; }
    var raw = currentUnitRaw();
    var title = raw ? raw.title : currentTitle();
    var subj = C.subjectById(S.subject);
    var p = S.progress[unitKey(S.grade, S.subject, S.volume, S.unitIndex)] || {};

    var h = '<div class="unit-hero" style="--sc:' + subj.color + ';--ss:' + subj.soft + '">';
    h += '<div class="unit-hero-left"><div class="unit-badge">' + esc(S.volume) + '册 · 第 ' + (S.unitIndex + 1) + ' 单元' +
      (isBasicUnit() ? ' · 通用教学示范内容（非教材原文）' : '') + '</div>' +
      '<h1>' + esc(title) + '</h1>' +
      '<p>' + esc(subj.textbook) + ' · ' + esc(C.gradeLabel(S.grade)) + esc(subj.label) + '</p></div>';
    h += '<div class="unit-hero-right">' + (p.stars ? '<div class="hero-stars">' + starStr(p.stars) + '</div><small>最佳 ' + (p.best || 0) + ' 分</small>' : '<small>完成通关即可获得星级</small>') + '</div>';
    h += '</div>';

    if (S.subject === 'english' && S.grade < 3) {
      h += '<div class="notice-bar">' + ic('info') + '<span>广州小学英语国家课程自 <b>三年级</b> 起开设（教科版·广州版）。本年级内容为口语启蒙拓展，非课本同步。</span></div>';
    }
    if (S.subject === 'english' && S.grade === 4 && S.volume === '下') {
      h += '<div class="notice-bar">' + ic('info') + '<span>四年级下册目录按旧版 Module 制整理；新版教材启用后请在 <b>js/config.js</b> 中更新该册目录。</span></div>';
    }

    var mods = activeModules();
    h += '<div class="module-tabs" style="--tab-cols:' + tabCols(mods.length) + '">';
    mods.forEach(function (m) {
      var on = m.id === S.module;
      var done = p.visited && p.visited[m.id];
      h += '<button class="module-tab ' + (on ? 'on' : '') + '" data-act="module" data-v="' + m.id + '" style="--sc:' + subj.color + '">' +
        ic(m.icon) + '<span><b>' + esc(m.label) + '</b><small>' + esc(m.hint) + '</small></span>' +
        (done ? '<i class="done-dot">' + ic('check') + '</i>' : '') + '</button>';
    });
    h += '</div>';

    h += '<div class="module-body" id="module-body">';
    if (!raw) h += renderNotBuilt(title);
    else {
      var u = parseUnit(raw);
      if (S.module === 'preview') h += renderPreview(u);
      else if (S.module === 'strokes') h += renderStrokes(u);
      else if (S.module === 'review') h += renderReview(u);
      else if (S.module === 'read') h += renderRead(u);
      else if (S.module === 'text') h += renderText(u);
      else if (S.module === 'drill') h += renderDrill(u);
      else h += renderChallenge(u);
    }
    h += '</div>';
    h += '<div class="foot-note">' + ic('info') + esc(C.notice) + '</div>';

    $('#content').innerHTML = h;
    if (raw && S.module === 'strokes') mountStrokeWriter();
  }

  /* ---------------- 待建设 / 锁定的通用学习框架 ---------------- */
  function renderNotBuilt(title) {
    var subj = C.subjectById(S.subject);
    var frames = [
      { m: 'preview', icon: 'sun', t: '课前预习', items: ['通读一遍，标出不认识的字词或不懂的句子', '借助工具书或点读，把新字词读准并各读 3 遍', '带着一个问题进课堂：这一课最想弄明白什么？'] },
      { m: 'strokes', icon: 'pencil', t: '生字笔顺', items: ['对照课本笔顺表，把每个新字一笔一画书空 3 遍', '边写边说出笔画名称，注意先横后竖、先撇后捺', '在田字格里写 2 遍，检查字的间架结构'] },
      { m: 'review', icon: 'notebook', t: '课后复习', items: ['合上书，用自己的话复述本课主要内容', '整理 3 条要点，写成一张小卡片', '完成课本课后练习，把错题标出来'] },
      { m: 'read', icon: 'speaker', t: '课本跟读', items: ['对照课本逐句朗读，长句先断句再读', '读准停顿与语气，录一遍回听', '选一段最喜欢的，读给家人听'] },
      { m: 'text', icon: 'book', t: '课文原文', items: ['在「录入课本原文」中按课本粘贴这一课的原文', '逐句点读、整篇连读，再开背诵模式试着背', '把读不顺的句子单独挑出来多读 3 遍'] },
      { m: 'drill', icon: 'calc', t: '口算闯关', items: ['选本单元对应题型，每天练 10 道并计时', '错题当场说出正确算法，不要只看答案', '隔天重做错题，连对 3 次再换题型'] },
      { m: 'challenge', icon: 'trophy', t: '通关挑战', items: ['听写本课字词，检验是否真的记住', '完成 5 道自测题并说出理由', '给自己评星：能独立讲清楚这一课吗？'] }
    ];
    var shown = activeModules().map(function (x) { return x.id; });
    var h = '<div class="notbuilt">' +
      '<div class="notbuilt-head">' + ic('pencil') + '<div><h2>本单元内容待建设</h2>' +
      '<p>目录已按 ' + esc(subj.textbook) + ' 对齐，配套内容可按下方框架逐步补充。' +
      '在 <code>js/data-core.js</code> 中按现有格式新增一条数据，各学习模块会自动出现。</p></div></div>' +
      '<h3 class="nb-title">' + esc(title) + ' · 通用学习框架（可直接使用）</h3><div class="frame-grid">';
    frames.forEach(function (f) {
      if (shown.indexOf(f.m) < 0) return;
      h += '<div class="frame-card"><div class="frame-h">' + ic(f.icon) + '<b>' + f.t + '</b></div><ol>';
      f.items.forEach(function (x) { h += '<li>' + esc(x) + '</li>'; });
      h += '</ol></div>';
    });
    h += '</div><button class="btn primary" data-act="guide">' + ic('layers') + '查看扩展指南</button></div>';
    return h;
  }

  function renderLocked() {
    var st = C.stageByGrade(S.grade);
    var subs = st.extraSubjects || [];
    var h = '<div class="locked"><div class="locked-ic">' + ic('lock') + '</div>' +
      '<h1>' + esc(C.gradeLabel(S.grade)) + ' · 内容建设中</h1>' +
      '<p>该年级的年级槽位、教材版本与学科结构已经预留完成，当前版本先交付小学 1—4 年级内容。</p>' +
      '<div class="locked-box"><h3>' + ic('layers') + ' 已为该学段预留</h3>' +
      '<div class="locked-row"><span>学段</span><b>' + esc(st.label) + '</b></div>' +
      '<div class="locked-row"><span>年级</span><b>' + st.grades.map(function (g) { return C.gradeShort(g); }).join(' · ') + '</b></div>' +
      '<div class="locked-row"><span>教材版本</span><b>' + esc(Object.keys(st.textbooks || {}).map(function (k) { return (C.subjectById(k) || { label: k }).label + '：' + st.textbooks[k]; }).join('　')) + '</b></div>' +
      '<div class="locked-row"><span>预置学科</span><b>' + esc(subs.join(' · ')) + '</b></div>' +
      '<div class="locked-row"><span>学习模块</span><b>课前预习 · 生字笔顺 · 课后复习 · 课本跟读 · 课文原文 · 口算闯关 · 通关挑战</b></div>' +
      '</div>' +
      '<p class="locked-note">启用方式：在 <code>js/config.js</code> 中把年级移入 <code>ready</code>，补齐目录，再按 <code>js/data-core.js</code> 格式添加单元数据，无需改动任何业务代码。</p>' +
      '<button class="btn primary" data-act="guide">' + ic('layers') + '查看完整扩展指南</button>' +
      '<button class="btn ghost" data-act="grade" data-v="1">返回一年级</button></div>';
    $('#content').innerHTML = h;
  }

  /* ---------------- 模块一：课前预习 ---------------- */
  function renderPreview(u) {
    var lang = currentLang();
    var h = '<div class="two-col">';

    /* 目标 + 思考 */
    h += '<div class="col-main">';
    h += '<section class="card">' + sectionHead('sun', '这节课要学会什么', '先看清目标，学习才有方向') +
      '<ul class="goal-list">';
    u.goals.forEach(function (g, i) { h += '<li><span class="num">' + (i + 1) + '</span><span>' + esc(g) + '</span></li>'; });
    h += '</ul></section>';

    h += '<section class="card">' + sectionHead('list', '预习步骤（建议 10 分钟）', '按顺序完成，每步都具体到动作');
    h += '<ol class="step-list">';
    u.steps.forEach(function (s) { h += '<li>' + esc(s) + '</li>'; });
    h += '</ol></section>';

    h += '<section class="card">' + sectionHead('pencil', '带着问题去上课', '想一想，不必写出标准答案') +
      '<div class="ask-list">';
    u.ask.forEach(function (a, i) {
      h += '<div class="ask-item"><span class="ask-q">Q' + (i + 1) + '</span><p>' + esc(a) + '</p>' + ic('right') + '</div>';
    });
    h += '</div></section>';
    h += '</div>';

    /* 字词发音 */
    h += '<div class="col-side">';
    h += '<section class="card word-card">' + sectionHead('speaker', wordLabel() + ' · 点读发音',
      S.subject === 'english' ? '英文单词使用 en-US 音色' : '中文字词使用 zh-CN 音色',
      '<button class="btn tiny ' + (S.hideWords ? 'on' : '') + '" data-act="toggle-hide">' + ic('eye') + (S.hideWords ? '退出听写' : '听写模式') + '</button>') +
      '<div class="word-tools">' +
      '<button class="btn tiny primary" data-act="read-all-words">' + ic('play') + '全部连读</button>' +
      '<button class="btn tiny" data-act="stop">' + ic('stop') + '停止</button>' +
      '<span class="word-count">共 ' + u.words.length + ' 条</span></div>';
    if (S.hideWords) h += '<p class="hide-tip">' + ic('info') + '文字已隐藏：点喇叭听读音，点卡片可翻开答案。</p>';
    h += '<div class="word-grid">';
    u.words.forEach(function (w, i) {
      var hidden = S.hideWords && !S.flipped[i];
      h += '<div class="word-item ' + (hidden ? 'hidden-word' : '') + '" data-word="' + i + '">' +
        '<div class="word-top"><span class="word-t">' + (hidden ? '？ ？ ？' : esc(w.t)) + '</span>' +
        speakBtn(w.t, lang, '', 'mini') + '</div>' +
        '<div class="word-p">' + (hidden ? '点卡片翻看' : esc(w.p)) + '</div>' +
        '<div class="word-m">' + (hidden ? '' : esc(w.m)) + '</div></div>';
    });
    h += '</div></section>';
    h += '</div></div>';

    h += '<div class="next-bar"><span>预习完成？接着做课后复习巩固一下。</span>' +
      '<button class="btn primary" data-act="module" data-v="review">进入课后复习 ' + ic('right') + '</button></div>';
    return h;
  }

  /* ---------------- 模块二：课后复习 ---------------- */
  function renderReview(u) {
    var h = '<div class="two-col">';
    h += '<div class="col-main">';
    h += '<section class="card">' + sectionHead('notebook', '本课要点', '合上书先看这几点，再回课本核对') +
      '<ul class="point-list">';
    u.points.forEach(function (p, i) { h += '<li><span>' + (i + 1) + '</span>' + esc(p) + '</li>'; });
    h += '</ul></section>';

    h += '<section class="card">' + sectionHead('check', '随堂练习', '点选项即时判分，每题都有解析',
      '<button class="btn tiny" data-act="reset-quiz">' + ic('refresh') + '重做</button>') +
      '<div id="review-quiz" class="quiz-list">';
    u.quiz.forEach(function (q, i) { h += quizCard(q, i, 'review'); });
    h += '</div></section>';
    h += '</div>';

    h += '<div class="col-side">';
    h += '<section class="card">' + sectionHead('pencil', '分层作业', '按自己的情况选做，不必全做完') +
      '<div class="hw-list">';
    var hwNames = ['基础 · 必做', '提升 · 选做', '拓展 · 挑战'];
    var hwCls = ['hw-a', 'hw-b', 'hw-c'];
    u.hw.forEach(function (x, i) {
      h += '<div class="hw-item ' + (hwCls[i] || 'hw-a') + '"><b>' + hwNames[i] + '</b><p>' + esc(x) + '</p></div>';
    });
    h += '</div></section>';
    h += '<section class="card tip-card">' + ic('heart') + '<div><b>给家长的一句话</b>' +
      '<p>复习时先让孩子自己讲，讲不清的地方再翻书。能讲出来，比多做三道题更有效。</p></div></section>';
    h += '</div></div>';

    h += '<div class="next-bar"><span>要点都记住了吗？去课本跟读把语感练起来。</span>' +
      '<button class="btn primary" data-act="module" data-v="read">进入课本跟读 ' + ic('right') + '</button></div>';
    return h;
  }

  function quizCard(q, i, scope) {
    var h = '<div class="quiz-card" data-qi="' + i + '" data-scope="' + scope + '">' +
      '<div class="quiz-q"><span class="quiz-no">' + (i + 1) + '</span><span>' + esc(q.q) + '</span></div><div class="quiz-opts">';
    q.options.forEach(function (o, j) {
      h += '<button class="quiz-opt" data-act="quiz-answer" data-qi="' + i + '" data-oi="' + j + '" data-scope="' + scope + '">' +
        '<span class="opt-tag">' + 'ABCD'.charAt(j) + '</span>' + esc(o) + '</button>';
    });
    h += '</div><div class="quiz-feedback" style="display:none"></div></div>';
    return h;
  }

  /* ---------------- 模块三：课本跟读 ---------------- */
  function renderRead(u) {
    var lang = currentLang();
    var rate = SP.getSettings().rate;
    var h = '<section class="card read-card">' +
      sectionHead('speaker', readLabel(), u.tip || '先听再读，一句一句模仿',
        '<span class="lang-pill">' + (lang === 'en' ? 'en-US 英文音色' : 'zh-CN 中文音色') + '</span>') +
      '<div class="read-toolbar">' +
      '<button class="btn primary" data-act="read-all-lines">' + ic('play') + '整篇连读</button>' +
      '<button class="btn" data-act="stop">' + ic('stop') + '停止</button>' +
      '<div class="rate-ctl"><span>语速</span>' +
      '<input type="range" id="rate-range" min="0.5" max="1.3" step="0.05" value="' + rate + '" data-act="rate">' +
      '<b id="rate-val">' + Number(rate).toFixed(2) + '×</b></div>' +
      '<span class="read-count">共 ' + u.lines.length + ' 句</span></div>';

    h += '<div class="line-list">';
    u.lines.forEach(function (l, i) {
      h += '<div class="line-item" data-line="' + i + '">' +
        '<span class="line-no">' + (i + 1) + '</span>' +
        '<div class="line-body"><div class="line-t">' + esc(l.t) + '</div>' +
        '<div class="line-p">' + (S.subject === 'english' ? '中文：' : '注音：') + esc(l.p) + '</div>' +
        (l.m ? '<div class="line-m">' + (S.subject === 'math' ? '要点：' : '') + esc(l.m) + '</div>' : '') + '</div>' +
        speakBtn(l.t, lang, '', 'line-play') + '</div>';
    });
    h += '</div>';

    h += '<div class="read-hint">' + ic('info') +
      '<span>跟读三步：① 点整篇连读，闭眼听一遍 → ② 逐句点喇叭，听一句模仿一句 → ③ 关掉声音，自己完整读一遍。' +
      (S.subject === 'chinese' ? '古诗按「二三」或「二二三」停顿。' : '') + '</span></div>';
    h += '</section>';

    h += '<div class="next-bar"><span>读顺了？去通关挑战检验一下成果。</span>' +
      '<button class="btn primary" data-act="module" data-v="challenge">进入通关挑战 ' + ic('trophy') + '</button></div>';
    return h;
  }

  /* ---------------- 新增模块一：生字笔顺（语文） ---------------- */
  function metaCell(label, value) {
    return '<div class="meta-cell"><span>' + esc(label) + '</span><b>' + esc(value) + '</b></div>';
  }

  function renderStrokes(u) {
    var chars = strokeChars(u);
    if (!chars.length) {
      return '<section class="card empty-card">' + ic('info') + '<h3>本单元暂无生字数据</h3>' +
        '<p>在 <code>js/data-core.js</code> 的 words 字段里补上本课生字，笔顺页会自动出现。</p></section>';
    }
    var valid = chars.some(function (x) { return x.ch === S.strokeChar; });
    if (!valid) { S.strokeChar = chars[0].ch; S.strokeStep = 0; }

    var cur = chars[0];
    chars.forEach(function (x) { if (x.ch === S.strokeChar) cur = x; });
    var info = SB.info(S.strokeChar) || {};
    var hasData = SB.has(S.strokeChar);
    var n = hasData ? SB.count(S.strokeChar) : (info.n || 0);

    var h = '<section class="card stroke-pick-card">' +
      sectionHead('pencil', '本课生字 · 点一个字看笔顺', '共 ' + chars.length + ' 个生字，均可点读发音、看笔顺、练描红') +
      '<div class="char-strip">';
    chars.forEach(function (x) {
      var mi = SB.info(x.ch) || {};
      h += '<button class="char-chip ' + (x.ch === S.strokeChar ? 'on' : '') + '" data-act="stroke-pick" data-v="' + esc(x.ch) + '">' +
        '<b>' + esc(x.ch) + '</b><small>' + esc(x.p || '') + '</small>' +
        (mi.n ? '<i>' + mi.n + ' 笔</i>' : '') + '</button>';
    });
    h += '</div></section>';

    h += '<div class="stroke-layout">';
    h += '<section class="card stroke-stage-card">' +
      sectionHead('book', '田字格笔顺演示', '红色为当前笔，深灰为已写过的笔画') +
      '<div class="hw-stage" data-mode="' + (S.strokeStep > 0 ? 'static' : 'animate') + '">' +
      '<div class="hw-grid">' + SB.gridSvg(true) + '</div>' +
      '<div class="hw-static">' + (S.strokeStep > 0 ? SB.stepSvg(S.strokeChar, S.strokeStep) : '') + '</div>' +
      '<div class="hw-target" id="hw-target"></div></div>' +
      '<div class="stroke-ctl">' +
      '<button class="btn primary" data-act="stroke-animate">' + ic('play') + '播放笔顺</button>' +
      '<button class="btn" data-act="stroke-loop">' + ic('refresh') + '循环播放</button>' +
      '<button class="btn" data-act="stroke-show">' + ic('eye') + '显示全字</button>' +
      '<button class="btn" data-act="stroke-quiz">' + ic('pencil') + '描红练习</button>' +
      '<button class="btn" data-act="stop">' + ic('stop') + '停止</button></div>' +
      '<p class="stroke-status" id="stroke-status">' +
      (!hasData ? '这个字暂缺笔顺路径数据，可先看拼音与组词。'
        : (SB.supported ? '点「播放笔顺」看一笔一画；点「描红练习」可用鼠标或手指在田字格里写字。'
          : '笔顺动画库未加载，下方逐笔分解图仍可正常使用。')) + '</p></section>';

    h += '<section class="card stroke-info-card">' +
      sectionHead('speaker', '字音 · 组词 · 字形', '点小喇叭听读音，边读边记') +
      '<div class="stroke-char-head"><div class="big-char">' + esc(S.strokeChar) + '</div>' +
      '<div class="char-py">' + (cur.p ? esc(cur.p) : '<span class="muted">拼音见字词卡</span>') + '</div>' +
      (cur.p ? speakBtn(S.strokeChar, 'zh', '读这个字') : '') + '</div>' +
      '<div class="meta-grid">' +
      metaCell('笔画数', n ? n + ' 笔' : '—') +
      metaCell('部首', info.radical || '—') +
      metaCell('字形结构', info.structure || '—') +
      metaCell('读音', cur.p || '—') + '</div>';

    var ci = String(cur.words || '').split(/[、,，;；\/]+/).map(function (x) { return x.trim(); }).filter(Boolean);
    if (ci.length) {
      h += '<div class="zuoci"><b>组词（点词跟读）</b><div class="zuoci-chips">';
      ci.forEach(function (w) {
        h += '<button class="zuoci-chip" data-act="speak" data-text="' + esc(w) + '" data-lang="zh">' +
          ic('speaker') + esc(w) + '</button>';
      });
      h += '</div></div>';
    }
    if (info.order && info.order.length) {
      h += '<div class="order-box"><b>笔顺名称（点任一笔可跳看）</b><div class="order-chips">';
      info.order.forEach(function (name, i) {
        h += '<button class="order-chip ' + (S.strokeStep === i + 1 ? 'on' : '') + '" data-act="stroke-step" data-v="' + (i + 1) + '">' +
          (i + 1) + '. ' + esc(name) + '</button>';
      });
      h += '</div>' + (SB.note ? '<p class="order-note">' + ic('info') + esc(SB.note) + '</p>' : '') + '</div>';
    }
    h += '</section></div>';

    h += '<section class="card stroke-steps-card">' +
      sectionHead('list', '逐笔分解图', '第 N 格显示写到第 N 笔的样子，红色就是新写的那一笔') +
      '<div class="step-grid">' +
      (hasData ? SB.stepsHtml(S.strokeChar, S.strokeStep) : '<p class="muted">该字暂无笔顺路径数据，可对照课本笔顺表练习。</p>') +
      '</div></section>';

    h += '<div class="next-bar"><span>字认牢了？去做课后复习，把要点和题目过一遍。</span>' +
      '<button class="btn primary" data-act="module" data-v="review">进入课后复习 ' + ic('right') + '</button></div>';
    return h;
  }

  /** innerHTML 重绘后重新挂载笔顺动画实例 */
  function mountStrokeWriter() {
    var el = $('#hw-target');
    if (!el || !SB.has(S.strokeChar)) return;
    var w = SB.create(el, S.strokeChar, { width: 240, height: 240 });
    if (!w) return;
    S.writer = w;
    setTimeout(function () {
      if (S.writer !== w) return;
      SB.call(w, 'showCharacter');
    }, 120);
  }

  function setStrokeMode(mode) {
    var st = $('.hw-stage');
    if (st) st.dataset.mode = mode;
  }

  function setStrokeStatus(text) {
    var el = $('#stroke-status');
    if (el) el.textContent = text;
  }

  /* ---------------- 新增模块二：课文原文跟读（语文 / 英语） ---------------- */
  function roleCls(role) {
    var r = String(role || '').toUpperCase();
    if (r === 'A') return 'r-a';
    if (r === 'B') return 'r-b';
    var n = 0, i;
    for (i = 0; i < r.length; i++) n += r.charCodeAt(i);
    return (n % 2 ? 'r-c' : 'r-d');
  }

  function renderText(u) {
    var ctx = currentTextData();
    var lang = currentLang();
    var rate = SP.getSettings().rate;
    var note = (window.TEXT_NOTE && window.TEXT_NOTE[S.subject]) || '';

    /*
     * 版面顺序：标题 → 工具栏 → 句段 → 说明。
     * 说明统一后置，避免长篇版权提示把句子挤到首屏之外（看起来像「没有内容」）。
     */
    var h = '<section class="card text-card">' +
      sectionHead('book', '课文原文跟读', ctx.data ? esc(ctx.data.title) : '按课本录入原文，逐句跟读',
        '<span class="source-pill">' + esc(ctx.data ? ctx.data.source : '尚未录入') + '</span>');

    h += '<div class="text-toolbar">' +
      '<button class="btn primary" data-act="text-play-all" ' + (ctx.data ? '' : 'disabled') + '>' + ic('play') + '整篇连读</button>' +
      '<button class="btn" data-act="stop">' + ic('stop') + '停止</button>' +
      '<button class="btn ' + (S.textHide ? 'on' : '') + '" data-act="text-hide">' + ic('eye') + (S.textHide ? '显示原文' : '背诵模式') + '</button>' +
      '<button class="btn" data-act="text-edit">' + ic('pencil') + '录入课本原文</button>' +
      '<div class="rate-ctl"><span>语速</span>' +
      '<input type="range" min="0.5" max="1.3" step="0.05" value="' + rate + '" data-act="rate">' +
      '<b class="rate-val">' + Number(rate).toFixed(2) + '×</b></div></div>';

    if (!ctx.data) {
      h += '<div class="text-empty">' + ic('pencil') + '<h3>这一课还没有可跟读的内容</h3>' +
        '<p>点「录入课本原文」，把孩子课本上这一课的文字粘贴进来，系统会自动分成一句一句，之后就能逐句点读、整篇连读、调速和背诵练习。</p>' +
        '<button class="btn primary" data-act="text-edit">' + ic('pencil') + '现在录入</button></div>';
    } else {
      var gi = 0;
      var secs = ctx.data.sections || [];
      secs.forEach(function (sec) {
        /* 单段短文的小标题与卡片标题重复，省略以把句子提前 */
        if (sec.title && (secs.length > 1 || sec.author)) {
          h += '<div class="text-sec-head"><h3>' + esc(sec.title) + '</h3>' +
            (sec.author ? '<span>' + esc(sec.author) + '</span>' : '') + '</div>';
        }
        h += '<div class="text-lines">';
        (sec.lines || []).forEach(function (l) {
          h += '<div class="text-line' + (l.role ? ' has-role' : '') + '" data-ti="' + gi + '">' +
            (l.role ? '<span class="role-badge ' + roleCls(l.role) + '">' + esc(l.role) + '</span>' : '') +
            '<div class="tl-body"><div class="tl-t">' +
            (S.textHide ? '<span class="hidden-text">· · · · · · · ·</span>' : esc(l.t)) + '</div>' +
            (l.p ? '<div class="tl-p">' + esc(l.p) + '</div>' : '') +
            (l.m ? '<div class="tl-m">' + esc(l.m) + '</div>' : '') + '</div>' +
            speakBtn(l.t, lang, '', 'line-play') + '</div>';
          gi++;
        });
        h += '</div>';
      });
      h += '<div class="read-hint">' + ic('info') +
        '<span>' + (ctx.data.note ? esc(ctx.data.note) + ' ' : '') +
        '跟读三步：① 点「整篇连读」听一遍 → ② 逐句点喇叭，听一句模仿一句 → ③ 打开「背诵模式」隐藏原文，试着自己背出来。' +
        (S.subject === 'chinese' ? '古诗按「二三」或「二二三」节奏停顿。' : '英语对话可两人分角色读。') + '</span></div>';
      h += '<p class="text-note text-foot-note">' + ic('info') + esc(note) + '</p>';
    }
    h += '</section>';

    h += '<div class="next-bar"><span>原文读顺了？去通关挑战检验一下。</span>' +
      '<button class="btn primary" data-act="module" data-v="challenge">进入通关挑战 ' + ic('trophy') + '</button></div>';
    return h;
  }

  function openTextEditor() {
    var k = unitFullKey();
    var raw = S.customTexts[k] || '';
    var isEn = S.subject === 'english';
    var h = '<div class="set-box"><h3>' + ic('pencil') + ' 录入 / 编辑课本原文</h3>' +
      '<p class="modal-lead">把孩子课本上这一课的原文粘贴到下面。建议<b>一行一句</b>；如果是一整段，系统会自动按句末标点断句。' +
      (isEn ? '英语可写 <code>A:</code> / <code>B:</code> 分角色，跟读时会显示角色标签。' : '') + '</p>' +
      '<textarea id="custom-text" class="text-editor" rows="12" spellcheck="false" placeholder="' +
      esc(isEn ? 'A: Hello! I am Ben.\nB: Hi, Ben. Nice to meet you.' : '天气凉了，树叶黄了。\n一片片叶子从树上落下来。') +
      '">' + esc(raw) + '</textarea>' +
      '<p class="editor-note">' + ic('info') + ' 内容只保存在本机浏览器，不会上传；换浏览器或清理缓存后需重新录入。清空输入并保存，即可恢复使用内置内容。</p>' +
      '<div class="editor-btns">' +
      '<button class="btn primary" data-act="text-save">' + ic('check') + '保存并开始跟读</button>' +
      '<button class="btn" data-act="text-clear">清空输入</button>' +
      '<button class="btn ghost" data-act="close-modal">取消</button></div></div>';
    openModal('录入课本原文', h, true);
  }

  /* ---------------- 新增模块三：口算闯关（数学） ---------------- */
  function newDrill(typeId) {
    return {
      type: typeId, questions: MD.build(typeId, 10), idx: 0, right: 0, wrong: [],
      finished: false, answered: false, picked: -1,
      startAt: Date.now(), elapsed: 0, streak: 0, best: 0
    };
  }

  function renderDrill(u) {
    var rec = MD.recommend(S.grade, S.volume, S.unitIndex);
    if (!S.drillType || !MD.byId(S.drillType)) S.drillType = rec.length ? rec[0].id : MD.types[0].id;
    var groups = MD.groupByLevel();

    var h = '<section class="card drill-pick">' +
      sectionHead('calc', '口算闯关 · 选择题型', '每轮 10 题，自动出题、即时判分、自动收集错题') +
      '<div class="drill-rec"><b>本单元推荐</b><div class="type-chips">';
    rec.forEach(function (t) {
      h += '<button class="type-chip ' + (t.id === S.drillType ? 'on' : '') + '" data-act="drill-type" data-v="' + t.id + '">' +
        esc(t.label) + '<small>' + esc(t.tip) + '</small></button>';
    });
    h += '</div></div><details class="drill-more"><summary>查看全部 ' + MD.types.length + ' 种题型（可自由切换）</summary><div class="type-groups">';
    Object.keys(groups).forEach(function (lv) {
      h += '<div class="type-group"><b>' + lv + ' 年级</b><div class="type-chips">';
      groups[lv].forEach(function (t) {
        h += '<button class="type-chip ' + (t.id === S.drillType ? 'on' : '') + '" data-act="drill-type" data-v="' + t.id + '">' + esc(t.label) + '</button>';
      });
      h += '</div></div>';
    });
    h += '</div></details></section>';

    var d = S.drill;
    if (!d) {
      h += '<div class="card drill-start">' + ic('calc') +
        '<h3>准备好了吗？</h3><p>当前题型：<b>' + esc((MD.byId(S.drillType) || {}).label || '') + '</b>。' +
        '建议先一口气做完 10 题再看解析，做完记得回看错题。</p>' +
        '<button class="btn primary" data-act="drill-start">' + ic('play') + '开始 10 题闯关</button></div>';
    } else if (d.finished) {
      var pct = Math.round(d.right / d.questions.length * 100);
      h += '<div class="card drill-result ' + (pct >= 80 ? 'pass' : '') + '">' +
        '<div class="result-ic">' + ic(pct >= 80 ? 'trophy' : 'refresh') + '</div>' +
        '<h2>' + (pct >= 80 ? '这一轮很棒！' : '再练一轮就熟了') + '</h2>' +
        '<div class="result-score">' + pct + '<small>分</small></div>' +
        '<p>共 ' + d.questions.length + ' 题 · 答对 ' + d.right + ' 题 · 用时约 ' + d.elapsed + ' 秒 · 最佳连对 ' + d.best + ' 题</p>';
      if (d.wrong.length) {
        h += '<div class="wrong-box"><b>' + ic('pencil') + ' 错题回顾</b>';
        d.wrong.forEach(function (w) {
          h += '<div class="wrong-item"><p>' + esc(w.q) + '</p><span>正确答案：<b>' + esc(w.correct) + '</b>　' + esc(w.tip || '') + '</span></div>';
        });
        h += '</div>';
      }
      h += '<div class="result-btns"><button class="btn primary" data-act="drill-restart">' + ic('refresh') + '再来一轮</button>' +
        '<button class="btn" data-act="module" data-v="review">回课后复习</button></div></div>';
    } else {
      var q = d.questions[d.idx];
      var used = Math.round((Date.now() - d.startAt) / 1000);
      var bar = Math.round(d.idx / d.questions.length * 100);
      h += '<div class="card drill-play">' +
        '<div class="ch-top"><div class="ch-progress"><div class="ch-progress-bar" style="width:' + bar + '%"></div></div>' +
        '<div class="ch-meta"><span>第 ' + (d.idx + 1) + ' / ' + d.questions.length + ' 题</span>' +
        '<span>' + ic('clock') + ' ' + used + ' 秒</span><span>' + ic('check') + ' 连对 ' + d.streak + '</span></div></div>' +
        '<div class="ch-q drill-q">' + esc(q.q) + '</div><div class="ch-opts drill-opts">';
      q.opts.forEach(function (o, j) {
        var cls = '';
        if (d.answered) {
          if (String(o) === String(q.a)) cls = 'correct';
          else if (j === d.picked) cls = 'wrong';
          else cls = 'dim';
        }
        h += '<button class="ch-opt ' + cls + '" data-act="drill-answer" data-oi="' + j + '" ' + (d.answered ? 'disabled' : '') + '>' +
          '<span class="opt-tag">' + 'ABCD'.charAt(j) + '</span>' + esc(o) +
          (d.answered && String(o) === String(q.a) ? ic('check', 'opt-ic') : '') + '</button>';
      });
      h += '</div>';
      if (d.answered) {
        var ok = String(q.opts[d.picked]) === String(q.a);
        h += '<div class="ch-feedback ' + (ok ? 'ok' : 'no') + '">' + ic(ok ? 'check' : 'info') +
          '<span><b>' + (ok ? '算对了！' : '再看一眼：') + '</b> ' + esc(q.tip || '') + '</span></div>' +
          '<div class="ch-next"><button class="btn primary" data-act="drill-next">' +
          (d.idx + 1 >= d.questions.length ? '查看结果 ' : '下一题 ') + ic('right') + '</button></div>';
      }
      h += '</div>';
    }

    h += renderMathCards();
    h += '<div class="next-bar"><span>口算稳了？去通关挑战看看综合掌握情况。</span>' +
      '<button class="btn primary" data-act="module" data-v="challenge">进入通关挑战 ' + ic('trophy') + '</button></div>';
    return h;
  }

  function renderMathCards() {
    var cards = MD.cards(S.grade);
    var h = '<section class="card math-cards">' +
      sectionHead('list', '口诀与公式速查', '点小喇叭听读，读一读比抄三遍更容易记住') + '<div class="mc-grid">';
    cards.forEach(function (c) {
      h += '<div class="mc-card" style="--mc:' + c.color + '"><b>' + esc(c.title) + '</b><ul>';
      c.lines.forEach(function (l) {
        h += '<li><span>' + esc(l) + '</span>' + speakBtn(l, 'zh', '', 'mini') + '</li>';
      });
      h += '</ul></div>';
    });
    h += '</div></section>';

    h += '<section class="card mult-card">' +
      sectionHead('calc', '九九乘法表', '点任意一格听口诀，二年级重点；可用来求商') + '<div class="mult-grid">';
    MD.multiTable().forEach(function (row, ri) {
      h += '<div class="mult-row">';
      for (var pad = 0; pad < ri; pad++) h += '<span class="mult-empty"></span>';
      row.forEach(function (c) {
        h += '<button class="mult-cell" data-act="speak" data-text="' + esc(c.text) + '" data-lang="zh">' +
          '<b>' + c.a + '×' + c.b + '</b><span>' + esc(c.text) + '</span></button>';
      });
      h += '</div>';
    });
    h += '</div></section>';
    return h;
  }

  /* ---------------- 模块四：通关挑战 ---------------- */
  function makeOptions(correct, pool, count) {
    var opts = [correct];
    shuffle(pool.filter(function (x) { return x && x !== correct; })).forEach(function (x) {
      if (opts.length < count && opts.indexOf(x) < 0) opts.push(x);
    });
    var filler = ['以上都不对', '以上都对', '需要再想一想'];
    var k = 0;
    while (opts.length < count && k < filler.length) { if (opts.indexOf(filler[k]) < 0) opts.push(filler[k]); k++; }
    return shuffle(opts.slice(0, count));
  }

  function buildChallenge(u) {
    var lang = currentLang();
    var qs = [];
    var words = u.words;

    /* 听音辨词：核心语音题 */
    shuffle(words).slice(0, 3).forEach(function (w) {
      var pool = words.map(function (x) { return x.t; });
      var opts = makeOptions(w.t, pool, 4);
      qs.push({
        type: 'listen', q: '听一听，选出你听到的' + (lang === 'en' ? '单词' : '字词'),
        audio: w.t, options: opts, a: opts.indexOf(w.t),
        e: '读作「' + w.t + '」' + (w.p ? '（' + w.p + '）' : '') + (w.m ? '，意思是' + w.m : '')
      });
    });

    /* 音形义匹配 */
    shuffle(words).slice(0, 2).forEach(function (w) {
      var isEn = lang === 'en';
      var field = isEn ? 'm' : 'p';
      var label = isEn ? '中文意思' : (S.subject === 'math' ? '含义' : '读音');
      var correct = w[field];
      if (!correct) return;
      var pool = words.map(function (x) { return x[field]; });
      var opts = makeOptions(correct, pool, 4);
      qs.push({
        type: 'match', q: '「' + w.t + '」的' + label + '是？',
        options: opts, a: opts.indexOf(correct), e: '「' + w.t + '」' + label + '是「' + correct + '」'
      });
    });

    /* 复习选择题 */
    u.quiz.forEach(function (q) {
      qs.push({ type: 'choice', q: q.q, options: q.options, a: q.a, e: q.e });
    });

    return shuffle(qs).slice(0, 8);
  }

  function renderChallenge(u) {
    if (!S.challenge) S.challenge = { questions: buildChallenge(u), idx: 0, right: 0, wrong: [], finished: false, answered: false, picked: -1 };

    var ch = S.challenge;
    var p = S.progress[unitKey(S.grade, S.subject, S.volume, S.unitIndex)] || {};
    var h = '<div class="challenge-wrap">';

    if (ch.finished) {
      var score = Math.round(ch.right / ch.questions.length * 100);
      var stars = score >= 90 ? 3 : score >= C.passLine ? 2 : score >= 60 ? 1 : 0;
      var passed = score >= C.passLine;
      h += '<div class="result-card ' + (passed ? 'pass' : 'retry') + '">' +
        '<div class="result-ic">' + ic(passed ? 'trophy' : 'refresh') + '</div>' +
        '<h2>' + (passed ? '恭喜通关！' : '再练一次就过关了') + '</h2>' +
        '<div class="result-stars">' + starStr(stars) + '</div>' +
        '<div class="result-score">' + score + '<small>分</small></div>' +
        '<p>共 ' + ch.questions.length + ' 题，答对 ' + ch.right + ' 题 · 通关线 ' + C.passLine + ' 分' +
        (p.best != null ? ' · 历史最佳 ' + p.best + ' 分' : '') + '</p>';
      if (ch.wrong.length) {
        h += '<div class="wrong-box"><b>' + ic('pencil') + ' 错题回顾</b>';
        ch.wrong.forEach(function (w) {
          h += '<div class="wrong-item"><p>' + esc(w.q) + '</p><span>正确答案：<b>' + esc(w.correct) + '</b>　' + esc(w.e || '') + '</span></div>';
        });
        h += '</div>';
      }
      h += '<div class="result-btns">' +
        '<button class="btn primary" data-act="challenge-restart">' + ic('refresh') + '再挑战一次</button>' +
        '<button class="btn" data-act="module" data-v="review">回课后复习</button></div></div>';
      h += '</div>';
      return h;
    }

    var q = ch.questions[ch.idx];
    var pct = Math.round(ch.idx / ch.questions.length * 100);
    h += '<div class="ch-top"><div class="ch-progress"><div class="ch-progress-bar" style="width:' + pct + '%"></div></div>' +
      '<div class="ch-meta"><span>第 ' + (ch.idx + 1) + ' / ' + ch.questions.length + ' 题</span>' +
      '<span>' + ic('check') + ' 已答对 ' + ch.right + '</span></div></div>';

    h += '<div class="ch-card">';
    h += '<div class="ch-type">' + (q.type === 'listen' ? ic('speaker') + ' 听音辨词' : q.type === 'match' ? ic('book') + ' 音形义匹配' : ic('list') + ' 综合理解') + '</div>';
    h += '<div class="ch-q">' + esc(q.q) + '</div>';
    if (q.type === 'listen') {
      h += '<button class="listen-play" data-act="listen-question">' + ic('speaker') + '<span>点击播放读音</span><small>可重复播放</small></button>';
    }
    h += '<div class="ch-opts">';
    q.options.forEach(function (o, j) {
      var cls = '';
      if (ch.answered) {
        if (j === q.a) cls = 'correct';
        else if (j === ch.picked) cls = 'wrong';
        else cls = 'dim';
      }
      h += '<button class="ch-opt ' + cls + '" data-act="ch-answer" data-oi="' + j + '" ' + (ch.answered ? 'disabled' : '') + '>' +
        '<span class="opt-tag">' + 'ABCD'.charAt(j) + '</span>' + esc(o) +
        (ch.answered && j === q.a ? ic('check', 'opt-ic') : '') + '</button>';
    });
    h += '</div>';
    if (ch.answered) {
      h += '<div class="ch-feedback ' + (ch.picked === q.a ? 'ok' : 'no') + '">' +
        ic(ch.picked === q.a ? 'check' : 'info') +
        '<span><b>' + (ch.picked === q.a ? '答对了！' : '再记一下：') + '</b> ' + esc(q.e || '') + '</span></div>' +
        '<div class="ch-next"><button class="btn primary" data-act="ch-next">' +
        (ch.idx + 1 >= ch.questions.length ? '查看结果 ' : '下一题 ') + ic('right') + '</button></div>';
    }
    h += '</div>';
    h += '<p class="ch-tip">' + ic('info') + '听音题不显示文字，请点大喇叭播放；答题结果保存在本机浏览器，不会上传。</p>';
    h += '</div>';
    return h;
  }

  function finishChallenge() {
    var ch = S.challenge;
    var score = Math.round(ch.right / ch.questions.length * 100);
    var stars = score >= 90 ? 3 : score >= C.passLine ? 2 : score >= 60 ? 1 : 0;
    var k = unitKey(S.grade, S.subject, S.volume, S.unitIndex);
    var p = S.progress[k] || (S.progress[k] = {});
    p.best = Math.max(p.best || 0, score);
    p.stars = Math.max(p.stars || 0, stars);
    p.attempts = (p.attempts || 0) + 1;
    saveProgress();
    ch.finished = true;
    renderMain();
  }

  /* ---------------- 弹层 ---------------- */
  function openModal(title, body, wide) {
    var root = $('#modal-root');
    root.innerHTML = '<div class="modal-mask" data-act="close-modal"><div class="modal ' + (wide ? 'wide' : '') + '" data-stop="1">' +
      '<div class="modal-h"><h2>' + ic('layers') + esc(title) + '</h2>' +
      '<button class="modal-x" data-act="close-modal">' + ic('x') + '</button></div>' +
      '<div class="modal-b">' + body + '</div></div></div>';
  }
  function closeModal() { $('#modal-root').innerHTML = ''; }

  function openGuide() {
    var h = '<p class="modal-lead">这套资料采用「配置 + 数据 + 引擎」三层分离结构。新增年级、学科或教材版本，只需改动配置与数据文件，界面与出题逻辑会自动适配。</p><div class="guide-list">';
    C.extensionGuide.forEach(function (g) {
      h += '<div class="guide-item"><span class="guide-step">' + g.step + '</span><div><b>' + esc(g.title) + '</b><p>' + esc(g.body) + '</p></div></div>';
    });
    h += '</div>';
    h += '<div class="guide-files"><b>文件结构</b><pre>' +
      esc('index.html                     页面骨架\ncss/style.css                 界面样式\njs/config.js                  ★ 学段 / 学科 / 教材目录 / 模块编排\njs/data-core.js               ★ 语文、数学单元数据\njs/data-english.js            ★ 英语单元数据\njs/data-text.js               ★ 语文古诗文原文 / 英语示范对话\njs/stroke-data.js             离线笔顺路径（165 个生字）\njs/hanzi-meta.js              笔画数 / 笔顺名称 / 部首 / 结构\njs/strokes.js                 笔顺渲染引擎（田字格 / 分解图 / 描红）\njs/math-drill.js              口算出题器与口诀公式卡\njs/speech.js                  语音引擎（Web Speech API）\nvendor/hanzi-writer.min.js    笔顺动画库（本地内置）\njs/app.js                     渲染与交互（无需为扩展修改）') +
      '</pre></div>';
    h += '<div class="guide-schema"><b>一条单元数据的最小结构</b><pre>' +
      esc("addUnit('5|chinese|上', 0, {\n  title:  '单元标题',\n  goals:  '目标1|目标2|目标3',\n  words:  '字|拼音|组词;字|拼音|组词',\n  ask:    '思考问题1|思考问题2',\n  steps:  '步骤1|步骤2',\n  points: '要点1|要点2',\n  quiz:   '题干|A,B,C|正确序号|解析',\n  lines:  '句段|注音|提示',\n  hw:     '基础作业|提升作业|拓展作业',\n  tip:    '跟读提示'\n});") + '</pre></div>';
    openModal('扩展指南 · 从 1—4 年级到 5—6 年级与初高中', h, true);
  }

  function openAbout() {
    var h = '<div class="about-box"><h3>适用对象与教材版本</h3><table class="about-table"><tr><th>学科</th><th>教材版本</th><th>起始年级</th></tr>';
    C.subjects.forEach(function (s) {
      h += '<tr><td>' + esc(s.label) + '</td><td>' + esc(s.textbook) + '</td><td>' + (s.from === 1 ? '一年级' : '三年级') + '起</td></tr>';
    });
    h += '</table><p>依据广州市公开教材目录整理：语文为统编版，数学为人教版，英语为教科版（广州版，三年级起点）。' +
      '2024 年起义务教育教材逐年修订，三、四年级英语已启用新版 Unit 制目录，各区、各校进度可能不同，请以孩子学校实际发放的课本为准。</p></div>';
    h += '<div class="about-box"><h3>内容边界（请教师／家长留意）</h3><ul>' +
      '<li>课本目录按教材整理，用于对照定位；<b>配套字词、例句、讲解与习题为教学设计示范内容，不是教材原文</b>。</li>' +
      '<li>「课文原文」页的语文内容为<b>公有领域古诗文</b>（唐宋清诗作与先秦典籍），可全文跟读；教材中的现代课文受著作权保护，本资料未收录。</li>' +
      '<li>英语「课文原文」页内置<b>按单元话题原创编写的示范对话</b>，不是教科版教材原文；课本 Let\'s talk 等对话请用「录入课本原文」按实际课本录入。</li>' +
      '<li>自行录入的原文与学习进度<b>只保存在本机浏览器</b>，不上传、不联网；换浏览器或清理缓存后需重新录入。</li>' +
      '<li>「生字笔顺」的笔画路径来自开源汉字数据，笔画名称按横／竖／撇／点捺／折五类归并，部首与结构供识字参考，细分笔画与部首归属请以课本为准。</li>' +
      '<li>一年级、二年级英语为口语启蒙拓展，广州小学英语国家课程自三年级起开设。</li>' +
      '<li>未填充内容的单元会显示「通用学习框架」，可直接使用，也可按格式补充细节。</li>' +
      '</ul></div>';
    h += '<div class="about-box"><h3>语音、笔顺与隐私</h3><p>' + esc(C.extensionGuide[C.extensionGuide.length - 1].body) + '</p></div>';
    h += '<div class="about-box"><h3>使用建议</h3><p>一次学习建议按「课前预习 → 课后复习 → 课本跟读 → 通关挑战」的顺序走完一个单元，约 20—25 分钟。' +
      '低年级学生建议家长陪同步骤一起完成，重点是开口读、动手摆、自己讲。</p></div>';
    openModal('教材版本与使用说明', h, true);
  }

  function openSettings() {
    var st = SP.getSettings();
    var zh = SP.getVoices('zh'), en = SP.getVoices('en');
    function opts(list, cur) {
      return '<option value="">自动选择（推荐）</option>' + list.map(function (v) {
        return '<option value="' + esc(v.name) + '"' + (cur === v.name ? ' selected' : '') + '>' + esc(v.name) + ' [' + esc(v.lang) + ']</option>';
      }).join('');
    }
    var h = '<div class="set-box"><h3>' + ic('speaker') + ' 朗读语速</h3>' +
      '<div class="rate-ctl big"><input type="range" id="set-rate" min="0.5" max="1.3" step="0.05" value="' + st.rate + '" data-act="rate">' +
      '<b id="rate-val">' + Number(st.rate).toFixed(2) + '×</b></div>' +
      '<p>低年级与英语初学者建议 0.75—0.85×；熟练后可调到 1.0×。</p></div>';
    h += '<div class="set-box"><h3>' + ic('settings') + ' 音色选择</h3>' +
      '<label>中文（zh-CN）<select id="set-zh" data-act="voice" data-lang="zh">' + opts(zh, st.zhVoice) + '</select></label>' +
      '<label>英文（en-US）<select id="set-en" data-act="voice" data-lang="en">' + opts(en, st.enVoice) + '</select></label>' +
      '<p class="set-note">' + (SP.getVoices('zh').length ? '已检测到 ' + (zh.length + en.length) + ' 个可用音色。' : '正在加载系统音色，若列表为空请用 Edge 或 Chrome 打开。') + '留空则由系统自动选择。</p></div>';
    h += '<div class="set-box"><h3>' + ic('play') + ' 试听</h3><div class="try-row">' +
      '<button class="btn" data-act="speak" data-text="春天来了，我们一起读课文。" data-lang="zh">' + ic('speaker') + '试听中文</button>' +
      '<button class="btn" data-act="speak" data-text="Hello! Nice to meet you." data-lang="en">' + ic('speaker') + '试听英文</button></div></div>';
    h += '<div class="set-box"><h3>' + ic('speaker') + ' 答题音效</h3>' +
      '<div class="try-row"><button class="btn" data-act="sound-toggle" id="set-sound">' +
      (window.Sound && window.Sound.isEnabled() ? '答题音效：开（点此关闭）' : '答题音效：关（点此开启）') +
      '</button><span class="set-note">答对播放清脆提示音，答错播放低沉提示音。</span></div></div>';
    h += '<div class="set-box"><h3>' + ic('info') + ' 实现方式</h3><p>使用浏览器内置 Web Speech API 语音合成，离线可用、无需 API Key、无任何调用费用。' +
      '若某个音色无法发音，切换到「自动选择」或换用 Edge / Chrome 浏览器。</p></div>';
    openModal('语音设置', h);
  }

  /* ---------------- 交互 ---------------- */
  function resetChallenge() { S.challenge = null; }
  /** 切换年级 / 学科 / 册次 / 单元时，清空上一单元的各模块临时状态 */
  function resetUnitState() {
    resetChallenge();
    S.flipped = {}; S.hideWords = false;
    S.strokeChar = ''; S.strokeStep = 0; S.strokeQuiz = false;
    S.textHide = false;
    S.drill = null; S.drillType = '';
    SP.stop();
  }

  function handleQuizAnswer(el) {
    var scope = el.dataset.scope, qi = +el.dataset.qi, oi = +el.dataset.oi;
    var card = el.closest('.quiz-card');
    var raw = currentUnitRaw(); if (!raw) return;
    var q = parseUnit(raw).quiz[qi];
    if (!q || card.dataset.done) return;
    card.dataset.done = '1';
    var ok = oi === q.a;
    if (window.Sound) window.Sound.play(ok);
    Array.prototype.slice.call(card.querySelectorAll('.quiz-opt')).forEach(function (b, j) {
      b.classList.add(j === q.a ? 'correct' : (j === oi ? 'wrong' : 'dim'));
      b.disabled = true;
    });
    var fb = card.querySelector('.quiz-feedback');
    fb.style.display = 'flex';
    fb.className = 'quiz-feedback ' + (ok ? 'ok' : 'no');
    fb.innerHTML = ic(ok ? 'check' : 'info') + '<span><b>' + (ok ? '答对了！' : '再想想：') + '</b> ' + esc(q.e || '') + '</span>';
    if (scope === 'review') markVisited('review');
  }

  function handleClick(e) {
    var el = e.target.closest('[data-act]');
    if (!el) {
      /* 听写模式：点卡片翻牌 */
      var card = e.target.closest('.word-item.hidden-word');
      if (card && !e.target.closest('.speak-btn')) {
        S.flipped[+card.dataset.word] = true;
        renderMain();
      }
      return;
    }
    var act = el.dataset.act, v = el.dataset.v;

    switch (act) {
      case 'stage': {
        var st = null;
        C.stages.forEach(function (x) { if (x.id === v) st = x; });
        if (st) { S.grade = st.grades[0]; S.unitIndex = firstReadyUnit(); resetUnitState(); renderAll(); }
        break;
      }
      case 'grade':
        S.grade = +v; S.unitIndex = firstReadyUnit(); resetUnitState(); renderAll(); break;
      case 'subject':
        S.subject = v; S.unitIndex = firstReadyUnit(); S.module = 'preview'; resetUnitState(); markVisited('preview'); renderAll(); break;
      case 'volume':
        S.volume = v; S.unitIndex = firstReadyUnit(); S.module = 'preview'; resetUnitState(); markVisited('preview'); renderAll(); break;
      case 'unit':
        S.unitIndex = +v; S.module = 'preview'; resetUnitState(); markVisited('preview'); renderAll();
        $('#content').scrollTop = 0;
        var sc = document.querySelector('.main'); if (sc) sc.scrollTop = 0;
        break;
      case 'module': {
        /* 只允许切到当前学科开放的模块，防止串科标签被点击后落到错误内容 */
        var allowed = activeModules().some(function (m) { return m.id === v; });
        if (!allowed) break;
        S.module = v; markVisited(v); SP.stop();
        if (v === 'challenge') resetChallenge();
        if (v === 'strokes') S.strokeStep = 0;
        renderMain();
        var sc2 = document.querySelector('.main'); if (sc2) sc2.scrollTop = 0;
        break;
      }
      case 'speak': {
        SP.stop();
        var text = el.dataset.text, lang = el.dataset.lang;
        el.classList.add('speaking');
        SP.speak(text, { lang: lang, onend: function () { el.classList.remove('speaking'); } });
        break;
      }
      case 'sound-toggle': {
        if (window.Sound) window.Sound.setEnabled(!window.Sound.isEnabled());
        openSettings();
        break;
      }
      case 'stop':
        SP.stop();
        if (S.writer) { SB.call(S.writer, 'cancelQuiz'); SB.call(S.writer, 'showCharacter'); }
        S.strokeQuiz = false;
        $$('.speaking').forEach(function (x) { x.classList.remove('speaking'); });
        $$('.line-item.on').forEach(function (x) { x.classList.remove('on'); });
        $$('.text-line.on').forEach(function (x) { x.classList.remove('on'); });
        break;
      case 'toggle-hide':
        S.hideWords = !S.hideWords; S.flipped = {}; renderMain(); break;
      case 'read-all-words': {
        var rawU = currentUnitRaw(); if (!rawU) break;
        var uu = parseUnit(rawU), lg = currentLang();
        el.classList.add('speaking');
        SP.speakSequence(uu.words.map(function (w) {
          return { text: lg === 'en' ? w.t : w.t + '，' + w.m, lang: lg };
        }), {
          lang: lg,
          onItem: function (i) {
            $$('.word-item').forEach(function (x, j) { x.classList.toggle('on', j === i); });
          },
          onDone: function () {
            el.classList.remove('speaking');
            $$('.word-item').forEach(function (x) { x.classList.remove('on'); });
          }
        });
        break;
      }
      case 'read-all-lines': {
        var rawL = currentUnitRaw(); if (!rawL) break;
        var uL = parseUnit(rawL), lgL = currentLang();
        el.classList.add('speaking');
        SP.speakSequence(uL.lines.map(function (l) { return { text: l.t, lang: lgL }; }), {
          lang: lgL,
          onItem: function (i) {
            $$('.line-item').forEach(function (x, j) { x.classList.toggle('on', j === i); });
          },
          onDone: function () {
            el.classList.remove('speaking');
            $$('.line-item').forEach(function (x) { x.classList.remove('on'); });
          }
        });
        break;
      }
      case 'quiz-answer': handleQuizAnswer(el); break;
      case 'reset-quiz': {
        var box = $('#review-quiz'); if (!box) break;
        var ru = currentUnitRaw(); if (!ru) break;
        box.innerHTML = parseUnit(ru).quiz.map(function (q, i) { return quizCard(q, i, 'review'); }).join('');
        break;
      }
      case 'ch-answer': {
        var ch = S.challenge; if (!ch || ch.answered) break;
        ch.picked = +el.dataset.oi; ch.answered = true;
        var q = ch.questions[ch.idx];
        if (ch.picked === q.a) ch.right++;
        else ch.wrong.push({ q: q.q, correct: q.options[q.a], e: q.e });
        if (window.Sound) window.Sound.play(ch.picked === q.a);
        renderMain();
        break;
      }
      case 'ch-next': {
        var ch2 = S.challenge; if (!ch2) break;
        if (ch2.idx + 1 >= ch2.questions.length) { finishChallenge(); break; }
        ch2.idx++; ch2.answered = false; ch2.picked = -1;
        renderMain();
        break;
      }
      case 'challenge-restart': resetChallenge(); renderMain(); break;
      case 'listen-question': {
        var ch3 = S.challenge; if (!ch3) break;
        var qq = ch3.questions[ch3.idx];
        el.classList.add('speaking');
        SP.speak(qq.audio, { lang: currentLang(), onend: function () { el.classList.remove('speaking'); } });
        break;
      }
      /* ---- 生字笔顺 ---- */
      case 'stroke-pick':
        S.strokeChar = v; S.strokeStep = 0; SP.stop(); renderMain();
        break;
      case 'stroke-step':
        S.strokeStep = +v; renderMain();
        break;
      case 'stroke-animate':
        if (!S.writer) { setStrokeStatus('笔顺动画库未加载，可使用下方逐笔分解图练习。'); break; }
        SB.call(S.writer, 'cancelQuiz'); S.strokeQuiz = false; S.strokeStep = 0;
        setStrokeMode('animate');
        SB.call(S.writer, 'animateCharacter');
        setStrokeStatus('正在演示「' + S.strokeChar + '」的笔顺：看清起笔位置和行笔方向。');
        $$('.step-cell').forEach(function (x) { x.classList.remove('on'); });
        $$('.order-chip').forEach(function (x) { x.classList.remove('on'); });
        break;
      case 'stroke-loop':
        if (!S.writer) break;
        SB.call(S.writer, 'cancelQuiz'); S.strokeQuiz = false; S.strokeStep = 0;
        setStrokeMode('animate');
        SB.call(S.writer, 'loopCharacterAnimation');
        setStrokeStatus('循环播放中：跟着一笔一画书空，点「停止」结束。');
        break;
      case 'stroke-show':
        if (!S.writer) break;
        SB.call(S.writer, 'cancelQuiz'); S.strokeQuiz = false; S.strokeStep = 0;
        setStrokeMode('animate');
        SB.call(S.writer, 'showCharacter');
        setStrokeStatus('已显示完整字形，对照田字格看看每一笔的位置。');
        $$('.step-cell').forEach(function (x) { x.classList.remove('on'); });
        $$('.order-chip').forEach(function (x) { x.classList.remove('on'); });
        break;
      case 'stroke-quiz':
        if (!S.writer) { setStrokeStatus('笔顺动画库未加载，描红练习暂不可用。'); break; }
        S.strokeStep = 0;
        setStrokeMode('animate');
        SB.call(S.writer, 'cancelQuiz');
        $$('.step-cell').forEach(function (x) { x.classList.remove('on'); });
        $$('.order-chip').forEach(function (x) { x.classList.remove('on'); });
        S.strokeQuiz = SB.quiz(S.writer, {
          onStroke: function () { setStrokeStatus('写得对！继续写下一笔……'); },
          onMistake: function () { setStrokeStatus('这一笔起笔位置再看看，浅色轮廓是提示。'); },
          onComplete: function () { setStrokeStatus('全部写对啦！可以点「播放笔顺」再看一遍，或换一个字练。'); }
        });
        if (S.strokeQuiz) setStrokeStatus('描红练习开始：用鼠标或手指按笔顺在田字格里写「' + S.strokeChar + '」。');
        break;

      /* ---- 课文原文跟读 ---- */
      case 'text-play-all': {
        var td = currentTextData(); if (!td.data) break;
        var fl = flattenLines(td.data), lgT = currentLang();
        el.classList.add('speaking');
        SP.speakSequence(fl.map(function (x) { return { text: x.t, lang: lgT }; }), {
          lang: lgT,
          onItem: function (i) { $$('.text-line').forEach(function (n, j) { n.classList.toggle('on', j === i); }); },
          onDone: function () {
            el.classList.remove('speaking');
            $$('.text-line').forEach(function (n) { n.classList.remove('on'); });
          }
        });
        break;
      }
      case 'text-hide': S.textHide = !S.textHide; renderMain(); break;
      case 'text-edit': openTextEditor(); break;
      case 'text-save': {
        var ta = $('#custom-text'); if (!ta) break;
        var val = ta.value.trim(), tk = unitFullKey();
        if (val) S.customTexts[tk] = val; else delete S.customTexts[tk];
        saveTexts(); closeModal(); S.textHide = false; renderMain();
        break;
      }
      case 'text-clear': {
        var ta2 = $('#custom-text');
        if (ta2) { ta2.value = ''; ta2.focus(); }
        break;
      }

      /* ---- 口算闯关 ---- */
      case 'drill-type': S.drillType = v; S.drill = null; renderMain(); break;
      case 'drill-start': S.drill = newDrill(S.drillType); renderMain(); break;
      case 'drill-restart': S.drill = newDrill(S.drillType); renderMain(); break;
      case 'drill-answer': {
        var dr = S.drill; if (!dr || dr.answered) break;
        dr.picked = +el.dataset.oi; dr.answered = true;
        var dq = dr.questions[dr.idx];
        if (String(dq.opts[dr.picked]) === String(dq.a)) {
          dr.right++; dr.streak++; if (dr.streak > dr.best) dr.best = dr.streak;
        } else {
          dr.wrong.push({ q: dq.q, correct: dq.a, tip: dq.tip }); dr.streak = 0;
        }
        if (window.Sound) window.Sound.play(String(dq.opts[dr.picked]) === String(dq.a));
        markVisited('drill');
        renderMain();
        break;
      }
      case 'drill-next': {
        var dn = S.drill; if (!dn) break;
        if (dn.idx + 1 >= dn.questions.length) {
          dn.finished = true;
          dn.elapsed = Math.round((Date.now() - dn.startAt) / 1000);
          renderMain(); break;
        }
        dn.idx++; dn.answered = false; dn.picked = -1;
        renderMain();
        break;
      }

      case 'settings': openSettings(); break;
      case 'guide': openGuide(); break;
      case 'about': openAbout(); break;
      case 'close-modal': if (e.target.closest('[data-stop]') && el.classList.contains('modal-mask')) break; closeModal(); break;
      case 'print': window.print(); break;
    }
  }

  function handleChange(e) {
    var el = e.target;
    if (el.dataset.act === 'rate') {
      var r = parseFloat(el.value);
      SP.setRate(r);
      ['#rate-val', '.rate-val'].forEach(function (sel) { $$(sel).forEach(function (n) { n.textContent = Number(r).toFixed(2) + '×'; }); });
      $$('input[data-act="rate"]').forEach(function (n) { if (n !== el) n.value = r; });
    }
    if (el.dataset.act === 'voice') SP.setVoice(el.dataset.lang, el.value);
  }

  function renderAll() { renderSidebar(); renderTopbar(); renderMain(); }

  /** 进入某册时，默认定位到第一个已填充内容的单元，避免首屏落在待建设页 */
  function firstReadyUnit() {
    var titles = C.getCatalog(S.grade, S.subject, S.volume);
    for (var i = 0; i < titles.length; i++) {
      if (DATA[S.grade + '|' + S.subject + '|' + S.volume + '|' + i]) return i;
    }
    return 0;
  }

  function init() {
    document.addEventListener('click', handleClick);
    document.addEventListener('change', handleChange);
    document.addEventListener('input', function (e) { if (e.target.dataset.act === 'rate') handleChange(e); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });
    S.unitIndex = firstReadyUnit();
    markVisited('preview');
    renderAll();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
