/* ============================================================
 * build.js —— 生成自包含单文件版「穗学伴.html」
 * 用法：node build.js
 * ------------------------------------------------------------
 * 分文件入口 index.html 便于维护；交付与预览请用 穗学伴.html：
 * CSS 与全部 JS 内联，零外部请求，不受浏览器脚本缓存影响。
 * 修改 css/ 或 js/ 下任意文件后，重新运行本脚本即可同步。
 * ============================================================ */
const fs = require('fs');
const path = require('path');

const root = __dirname;
const src = path.join(root, 'index.html');
const out = path.join(root, '穗学伴.html');

let html = fs.readFileSync(src, 'utf8');

function read(rel) {
  const p = path.join(root, rel);
  if (!fs.existsSync(p)) throw new Error('找不到资源: ' + rel);
  return fs.readFileSync(p, 'utf8');
}
/* 防止脚本内容里的 </script 提前截断内联块 */
function safeJs(s) { return s.replace(/<\/script/gi, '<\\/script'); }

let cssCount = 0, jsCount = 0;
html = html.replace(/<link rel="stylesheet" href="([^"?]+)(?:\?[^"]*)?">/g, function (m, href) {
  cssCount++;
  return '<style>\n' + read(href) + '\n</style>';
});
html = html.replace(/<script src="([^"?]+)(?:\?[^"]*)?"><\/script>/g, function (m, srcPath) {
  jsCount++;
  return '<script>\n' + safeJs(read(srcPath)) + '\n</' + 'script>';
});

if (!cssCount || jsCount < 10) {
  throw new Error('内联数量异常，已中止：css=' + cssCount + ' js=' + jsCount);
}
if (/<script src=|<link rel="stylesheet"/.test(html)) {
  throw new Error('仍存在外部资源引用，已中止');
}

const banner = [
  '<!--',
  '  穗学伴 · 自包含离线版（构建产物）',
  '  CSS 与全部 JS 已内联，零外部请求，不受浏览器脚本缓存影响。',
  '  源文件在 css/ 与 js/ 下；修改后运行 node build.js 重新生成。',
  '  构建时间：' + new Date().toISOString(),
  '-->'
].join('\n');
html = html.replace(/^<!DOCTYPE html>/, '<!DOCTYPE html>\n' + banner);

fs.writeFileSync(out, html, 'utf8');
console.log('已生成: ' + out);
console.log('内联 CSS ' + cssCount + ' 个 / JS ' + jsCount + ' 个，大小 ' +
  (fs.statSync(out).size / 1024).toFixed(1) + ' KB');
