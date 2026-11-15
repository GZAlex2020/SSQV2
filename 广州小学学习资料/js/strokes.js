/* ============================================================
 * strokes.js —— 生字笔顺渲染引擎
 * ------------------------------------------------------------
 * 依赖：vendor/hanzi-writer.min.js（本地内置，MIT）
 *       js/stroke-data.js（笔顺路径）、js/hanzi-meta.js（元信息）
 * 提供：田字格背景、逐笔分解图、笔顺动画、描红测验。
 * 所有数据均在本地，不发起任何网络请求。
 * ============================================================ */
(function () {
  'use strict';

  var DATA = window.STROKE_DATA || {};
  var META = window.HANZI_META || {};

  function has(ch) { return !!(DATA[ch] && DATA[ch].strokes && DATA[ch].strokes.length); }
  function info(ch) { return META[ch] || { n: 0, order: [], radical: '', structure: '' }; }
  function count(ch) { return has(ch) ? DATA[ch].strokes.length : 0; }

  /* 田字格（米字格虚线可选） */
  function gridSvg(extra) {
    var d = 'M50 2 V98 M2 50 H98';
    return '<svg class="hw-grid-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">' +
      '<rect x="1" y="1" width="98" height="98" fill="none" stroke="#d9a09a" stroke-width="1.4"/>' +
      '<path d="' + d + '" fill="none" stroke="#e3b8b3" stroke-width="0.7" stroke-dasharray="3 3"/>' +
      (extra ? '<path d="M2 2 L98 98 M98 2 L2 98" fill="none" stroke="#eed3d0" stroke-width="0.6" stroke-dasharray="2 4"/>' : '') +
      '</svg>';
  }

  /* 逐笔分解图：第 step 步（1 起）的累积字形，当前笔红色 */
  function stepSvg(ch, step) {
    if (!has(ch)) return '';
    var strokes = DATA[ch].strokes;
    var s = '<svg class="step-svg" viewBox="0 0 1024 1024" aria-hidden="true">';
    s += '<g fill="none" stroke="#ead9d6" stroke-width="2">' +
      '<rect x="6" y="6" width="1012" height="1012" stroke-width="3"/>' +
      '<path d="M512 6 V1018 M6 512 H1018" stroke-dasharray="14 12"/>' +
      '</g>';
    s += '<g transform="translate(0,1024) scale(1,-1)">';
    /* 底层淡影：完整字形轮廓 */
    strokes.forEach(function (d) { s += '<path d="' + d + '" fill="#e8eaee"/>'; });
    /* 已完成的笔画 */
    for (var i = 0; i < step - 1 && i < strokes.length; i++) {
      s += '<path d="' + strokes[i] + '" fill="#2f3542"/>';
    }
    /* 当前笔 */
    if (step - 1 < strokes.length) {
      s += '<path d="' + strokes[step - 1] + '" fill="#d9534f"/>';
    }
    s += '</g></svg>';
    return s;
  }

  /* 一次性生成某字全部分解图（供渲染） */
  function stepsHtml(ch, current) {
    if (!has(ch)) return '';
    var n = DATA[ch].strokes.length, h = '';
    for (var i = 1; i <= n; i++) {
      var inf = info(ch);
      var name = (inf.order && inf.order[i - 1]) || '—';
      h += '<button class="step-cell ' + (i === current ? 'on' : '') + '" data-act="stroke-step" data-v="' + i + '" title="第 ' + i + ' 笔：' + name + '">' +
        stepSvg(ch, i) +
        '<span class="step-cap"><b>' + i + '</b>' + name + '</span></button>';
    }
    return h;
  }

  /* 创建笔顺动画实例 */
  function create(el, ch, opt) {
    opt = opt || {};
    if (!window.HanziWriter || !has(ch)) return null;
    try {
      return window.HanziWriter.create(el, ch, {
        width: opt.width || 240,
        height: opt.height || 240,
        padding: opt.padding == null ? 14 : opt.padding,
        showCharacter: false,
        showOutline: true,
        outlineColor: '#e4e7ec',
        strokeColor: '#2f3542',
        drawingColor: '#2f6fed',
        highlightColor: '#d9534f',
        strokeAnimationSpeed: 0.9,
        strokeHighlightSpeed: 1.6,
        delayBetweenStrokes: 260,
        delayBetweenLoops: 900,
        charDataLoader: function (char, onComplete) {
          onComplete(DATA[char] || null);
        }
      });
    } catch (e) { return null; }
  }

  /* 防御性调用：库版本差异不让页面报错 */
  function call(writer, method, args) {
    if (!writer || typeof writer[method] !== 'function') return false;
    try { writer[method].apply(writer, args || []); return true; } catch (e) { return false; }
  }

  function quiz(writer, cb) {
    if (!writer) return false;
    return call(writer, 'quiz', [{
      showHintAfterMisses: 2,
      highlightOnComplete: true,
      onCorrectStroke: function (d) { if (cb && cb.onStroke) cb.onStroke(d); },
      onMistake: function (d) { if (cb && cb.onMistake) cb.onMistake(d); },
      onComplete: function (d) { if (cb && cb.onComplete) cb.onComplete(d); }
    }]);
  }

  window.StrokeBook = {
    has: has,
    info: info,
    count: count,
    gridSvg: gridSvg,
    stepSvg: stepSvg,
    stepsHtml: stepsHtml,
    create: create,
    call: call,
    quiz: quiz,
    supported: !!window.HanziWriter,
    note: window.HANZI_META_NOTE || ''
  };
})();
