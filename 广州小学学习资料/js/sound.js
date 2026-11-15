/* ============================================================
 * sound.js —— 答题音效（Web Audio API 即时合成）
 * ------------------------------------------------------------
 * 完全基于浏览器内置能力：无需音频文件、无需联网、无调用费用。
 * 答对：清脆的上行双音；答错：低沉的下行双音。
 * 同时用语音念一句极短的提示（答对啦 / 再想想）强化“声音提示”。
 * 受静音开关 window.Sound.setEnabled(false) 控制。
 * ============================================================ */
(function () {
  'use strict';

  var Ctx = window.AudioContext || window.webkitAudioContext;
  var ctx = null;
  var enabled = true;

  function ensure() {
    if (!Ctx) return null;
    try {
      if (!ctx) ctx = new Ctx();
      if (ctx.state === 'suspended' && typeof ctx.resume === 'function') ctx.resume();
      return ctx;
    } catch (e) { return null; }
  }

  /* 单个音符：起始频率、相对延迟、时长、波形、峰值音量 */
  function tone(freq, start, dur, type, peak) {
    var c = ensure();
    if (!c) return;
    var t0 = c.currentTime + start;
    var osc = c.createOscillator();
    var g = c.createGain();
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(peak || 0.28, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g);
    g.connect(c.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.03);
  }

  /* 答对：明亮的上行三度 / 八度，轻快积极 */
  function correct() {
    tone(660, 0.00, 0.13, 'sine', 0.32);
    tone(990, 0.11, 0.22, 'sine', 0.30);
  }

  /* 答错：柔和低沉的下行双音，不刺耳，适合小朋友 */
  function wrong() {
    tone(330, 0.00, 0.18, 'triangle', 0.24);
    tone(220, 0.17, 0.30, 'triangle', 0.24);
  }

  /**
   * 统一入口：答对 / 答错都给声音提示
   * @param {boolean} ok true=答对 false=答错
   */
  function play(ok) {
    if (!enabled) return;
    if (ok === false || ok === 0) wrong(); else correct();
    /* 额外念一句极短语音，强化“声音提示”；失败静默不影响音效 */
    try {
      if (window.Speech && window.Speech.supported) {
        window.Speech.speak(ok ? '答对啦' : '再想想', { lang: 'zh', rate: 1.05 });
      }
    } catch (e) {}
  }

  function setEnabled(v) { enabled = !!v; }
  function isEnabled() { return enabled; }

  window.Sound = {
    play: play,
    correct: correct,
    wrong: wrong,
    setEnabled: setEnabled,
    isEnabled: isEnabled,
    supported: !!Ctx
  };
})();
