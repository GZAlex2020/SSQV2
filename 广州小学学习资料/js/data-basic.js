/* ============================================================
 * data-basic.js —— 课本目录「基础学习内容」生成器
 * ------------------------------------------------------------
 * 目的：让课本目录里的每一课点开都有可学、可读、可练的内容，
 *       不再出现「本单元内容待建设」的空页。
 *
 * 边界（重要）：
 *  - 精编单元（data-core.js / data-english.js）始终优先，本文件只兜底。
 *  - 本文件生成的字词、句段、短文、题目均为「通用教学示范内容」，
 *    按课本目录标题自动生成，不是教材原文，也不冒充课后练习。
 *  - 汉字笔顺 / 拼音 / 组词来自离线数据包 hanzi-extra.js。
 *
 * 输出格式与 data-core.js 完全一致，app.js 无需为新单元改动。
 * ============================================================ */
(function () {
  'use strict';

  var CATALOG = window.APP_CONFIG;
  var UNIT = window.UNIT_DATA || {};
  var PY = window.HANZI_PINYIN || {};
  var WD = window.HANZI_WORDS || {};
  var META = window.HANZI_META || {};
  var cache = {};

  /* ---------------- 小工具 ---------------- */
  function clean(t) {
    return String(t || '')
      .replace(/[（(][^)）]*[)）]/g, '')
      .replace(/^第\s*[0-9一二三四五六七八九十]+\s*(单元|课|模块|章)?\s*/, '')
      .replace(/^(识字|课文|汉语拼音|口语交际|习作|语文园地|快乐读书吧|Module|Unit|Lesson|Part)\s*\d*\s*/i, '')
      .replace(/^\d+\s*/, '').replace(/\s+/g, ' ').trim();
  }
  function hash(s) { var n = 0; for (var i = 0; i < s.length; i++) n = (n * 31 + s.charCodeAt(i)) >>> 0; return n; }
  function pick(arr, seed) { return arr[seed % arr.length]; }
  function uniq(a) { var o = {}, r = []; a.forEach(function (x) { if (x && !o[x]) { o[x] = 1; r.push(x); } }); return r; }
  function shuffle(a) {
    var r = a.slice(), i, j, t;
    for (i = r.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = r[i]; r[i] = r[j]; r[j] = t; }
    return r;
  }
  function cnChars(s) { return uniq(String(s || '').split('').filter(function (c) { return /[\u4e00-\u9fa5]/.test(c); })); }
  function enWords(s) {
    return uniq(String(s || '').match(/[A-Za-z][A-Za-z'’-]*/g) || [])
      .filter(function (w) { return w.length >= 2; });
  }
  function key(g, s, v, i) { return g + '|' + s + '|' + v + '|' + i; }
  function full(g, s, v, i) { return !!UNIT[key(g, s, v, i)]; }

  /* 本册精编单元的字词，用作拼音课等无汉字标题的兜底 */
  function refinedWords(g, s, v) {
    var out = [], ks = Object.keys(UNIT), i;
    for (i = 0; i < ks.length && out.length < 6; i++) {
      var p = ks[i].split('|');
      if (+p[0] !== g || p[1] !== s || p[2] !== v) continue;
      (UNIT[ks[i]].words || '').split(';').forEach(function (w) {
        if (out.length < 6 && w) out.push(w);
      });
    }
    return out;
  }

  /* ---------------- 语文：字词 ---------------- */
  var FALLBACK_CHARS = '天地人日月水火土山石田禾木林虫云雨风花草树叶春夏秋冬大小多少上下左右人口手足书本笔纸门窗爸妈哥姐弟妹';

  function chineseWords(g, v, title) {
    var cs = cnChars(clean(title)).slice(0, 6);
    var out = cs.map(function (ch) {
      var ws = (WD[ch] || []).slice(0, 2).join('、');
      return ch + '|' + (PY[ch] || '') + '|' + (ws || '读一读，组个词');
    });
    /* 两字标题（如「江南」「影子」）补到 5 个：优先本册精编字词，
       让听写、听音辨词、笔顺练习都有足够素材。 */
    if (out.length < 5) {
      refinedWords(g, 'chinese', v).forEach(function (w) {
        if (out.length >= 5) return;
        var ch = (w.split('|')[0] || '').trim();
        if (!ch || out.some(function (x) { return x.split('|')[0] === ch; })) return;
        out.push(w);
      });
    }
    var seed = hash(g + '|' + v + '|' + title);
    for (var i = 0; i < FALLBACK_CHARS.length && out.length < 5; i++) {
      var c = FALLBACK_CHARS[(seed + i) % FALLBACK_CHARS.length];
      if (out.some(function (x) { return x.split('|')[0] === c; })) continue;
      out.push(c + '|' + (PY[c] || '') + '|' + ((WD[c] || []).slice(0, 2).join('、') || '读一读，组个词'));
    }
    return out;
  }

  /* ---------------- 英语：词汇 ---------------- */
  var EN_POOL = [
    ['hello', 'həˈləʊ', '你好'], ['morning', 'ˈmɔːnɪŋ', '早晨'], ['name', 'neɪm', '名字'],
    ['friend', 'frend', '朋友'], ['school', 'skuːl', '学校'], ['book', 'bʊk', '书'],
    ['teacher', 'ˈtiːtʃə', '老师'], ['colour', 'ˈkʌlə', '颜色'], ['red', 'red', '红色'],
    ['blue', 'bluː', '蓝色'], ['family', 'ˈfæməli', '家庭'], ['mother', 'ˈmʌðə', '妈妈'],
    ['father', 'ˈfɑːðə', '爸爸'], ['food', 'fuːd', '食物'], ['apple', 'ˈæpl', '苹果'],
    ['water', 'ˈwɔːtə', '水'], ['animal', 'ˈænɪml', '动物'], ['cat', 'kæt', '猫'],
    ['dog', 'dɒɡ', '狗'], ['bird', 'bɜːd', '鸟'], ['sunny', 'ˈsʌni', '晴朗的'],
    ['rainy', 'ˈreɪni', '下雨的'], ['one', 'wʌn', '一'], ['two', 'tuː', '二'],
    ['three', 'θriː', '三'], ['big', 'bɪɡ', '大的'], ['small', 'smɔːl', '小的'],
    ['happy', 'ˈhæpi', '开心的'], ['please', 'pliːz', '请'], ['thank', 'θæŋk', '谢谢']
  ];
  function englishWords(title, seed) {
    /* 只用带准确中文释义的内置常用词：标题中的英文词释义不确定，
       放进词汇卡会让「中文意思」匹配题失去唯一正确答案，故不采用。 */
    var out = [], start = seed % EN_POOL.length, i;
    for (i = 0; i < EN_POOL.length && out.length < 5; i++)
      out.push(EN_POOL[(start + i) % EN_POOL.length].join('|'));
    return out;
  }

  /* ---------------- 数学：概念词 ---------------- */
  var MATH_CONCEPT = {
    1: [['数一数', 'shǔ yi shǔ', '一个一个地数，不漏也不重'], ['加法', 'jiā fǎ', '把两部分合起来'], ['减法', 'jiǎn fǎ', '从总数里去掉一部分'], ['位置', 'wèi zhì', '上下、前后、左右'], ['图形', 'tú xíng', '长方形、正方形、圆']],
    2: [['乘法', 'chéng fǎ', '几个相同加数的简便运算'], ['除法', 'chú fǎ', '平均分'], ['长度', 'cháng dù', '米和厘米'], ['角', 'jiǎo', '直角、锐角、钝角'], ['时间', 'shí jiān', '时、分、秒']],
    3: [['万以内数', 'wàn yǐ nèi shù', '数位与读写'], ['分数', 'fēn shù', '把一个整体平均分'], ['面积', 'miàn jī', '面的大小'], ['倍数', 'bèi shù', '几个几'], ['小数', 'xiǎo shù', '不满一个整体的数']],
    4: [['大数', 'dà shù', '亿以内数的认识'], ['运算律', 'yùn suàn lǜ', '交换律、结合律、分配律'], ['平行四边形', 'píng xíng sì biān xíng', '两组对边分别平行'], ['条形统计图', 'tiáo xíng tǒng jì tú', '用直条表示数量'], ['优化', 'yōu huà', '找到最省时间的安排']]
  };
  function mathWords(g, title, seed) {
    var pool = MATH_CONCEPT[g] || MATH_CONCEPT[1];
    var own = cnChars(clean(title)).slice(0, 2).map(function (c) { return c + '|—|本课关键词'; });
    var out = own.slice(), i;
    for (i = 0; i < pool.length && out.length < 5; i++) out.push(pool[(seed + i) % pool.length].join('|'));
    return out;
  }

  /* ---------------- 语文：跟读短文（原创示范，非教材原文） ---------------- */
  var ZH_PASSAGES = [
    { t: '校园的早晨', lines: [
      ['早晨，阳光照进教室。', '早晨 / 阳光 / 照进教室', '语速放慢，读出安静的感觉'],
      ['同学们坐得端端正正。', '同学们 / 坐得 / 端端正正', '"端端正正"读得清楚一点'],
      ['老师把新课文读了一遍。', '老师 / 把新课文 / 读了一遍', '注意"一遍"的停顿'],
      ['我们跟着一句一句地读。', '我们 / 跟着 / 一句一句地读', '一句一顿，别抢拍'],
      ['读完，大家把生字写一写。', '读完 / 大家 / 把生字写一写', '逗号处换一口气'],
      ['下课铃响了，笑声跑到走廊上。', '下课铃响了 / 笑声 / 跑到走廊上', '结尾轻快一些'] ] },
    { t: '四季', lines: [
      ['春天来了，小草从土里钻出来。', '春天来了 / 小草 / 从土里钻出来', '"钻"读第一声'],
      ['夏天，树上的叶子又绿又密。', '夏天 / 树上的叶子 / 又绿又密', '读出茂盛的感觉'],
      ['秋天，风把黄叶吹到地上。', '秋天 / 风 / 把黄叶吹到地上', '语速稍慢'],
      ['冬天，窗上结了一层白霜。', '冬天 / 窗上 / 结了一层白霜', '声音轻轻的'],
      ['一年有四个季节。', '一年 / 有 / 四个季节', '一句一顿'],
      ['你最喜欢哪一个呢？', '你 / 最喜欢 / 哪一个呢', '句末语调往上扬'] ] },
    { t: '家里的晚上', lines: [
      ['晚上，家里亮着一盏灯。', '晚上 / 家里 / 亮着一盏灯', '轻声读，像在讲悄悄话'],
      ['妈妈在厨房里做饭。', '妈妈 / 在厨房里 / 做饭', '注意"厨房"都是翘舌音'],
      ['爸爸把桌子擦干净。', '爸爸 / 把桌子 / 擦干净', '"干净"读得利落'],
      ['我摆好碗筷，等大家一起吃。', '我摆好碗筷 / 等大家 / 一起吃', '逗号处停半拍'],
      ['饭后，我们讲今天的小事。', '饭后 / 我们 / 讲今天的小事', '语气自然，像聊天'],
      ['灯灭了，屋子安安静静。', '灯灭了 / 屋子 / 安安静静', '越读越轻'] ] },
    { t: '院子里的小动物', lines: [
      ['院子里有一只小花猫。', '院子里 / 有 / 一只小花猫', '"一只"读得短促'],
      ['它轻轻走过草地。', '它 / 轻轻 / 走过草地', '"轻轻"放慢'],
      ['小鸟在枝头叫了两声。', '小鸟 / 在枝头 / 叫了两声', '读出清脆'],
      ['小猫停下来，竖起耳朵听。', '小猫停下来 / 竖起耳朵 / 听', '逗号处换气'],
      ['一会儿，它又慢慢走开了。', '一会儿 / 它 / 又慢慢走开了', '"慢慢"拖长一点'],
      ['小动物真有意思。', '小动物 / 真有意思', '带点笑意读完'] ] },
    { t: '天亮了', lines: [
      ['天亮了，东边泛起红光。', '天亮了 / 东边 / 泛起红光', '声音由轻到亮'],
      ['云一朵一朵，慢慢飘过去。', '云 / 一朵一朵 / 慢慢飘过去', '节奏放慢'],
      ['风从河面吹来，凉凉的。', '风 / 从河面吹来 / 凉凉的', '"凉凉的"读柔一点'],
      ['水面上有细细的波纹。', '水面上 / 有 / 细细的波纹', '注意三个"细"不吞字'],
      ['远处，山安安静静地站着。', '远处 / 山 / 安安静静地站着', '句末稳稳收住'],
      ['这样的早晨，真让人喜欢。', '这样的早晨 / 真让人喜欢', '读出喜欢的语气'] ] },
    { t: '我会自己读', lines: [
      ['打开书，先看清题目。', '打开书 / 先 / 看清题目', '一句一步，慢慢来'],
      ['遇到不认识的字，圈出来。', '遇到不认识的字 / 圈出来', '逗号处停一停'],
      ['查一查，再读三遍。', '查一查 / 再读 / 三遍', '"三遍"说清楚'],
      ['把想到的写在一旁。', '把想到的 / 写在 / 一旁', '语气像提醒自己'],
      ['读完问自己：我懂了吗？', '读完 / 问自己 / 我懂了吗', '冒号后稍停'],
      ['每天进步一点点。', '每天 / 进步 / 一点点', '结尾轻轻上扬'] ] },
    { t: '田边的小路', lines: [
      ['小路弯弯，通到田边。', '小路弯弯 / 通到 / 田边', '"弯弯"读得圆一点'],
      ['稻子黄了，低着头。', '稻子黄了 / 低着头', '读出沉甸甸的感觉'],
      ['几只小鸟落在田埂上。', '几只小鸟 / 落在 / 田埂上', '注意"埂"是第三声'],
      ['农民伯伯弯腰收稻子。', '农民伯伯 / 弯腰 / 收稻子', '一句一口气'],
      ['筐里装满了粮食。', '筐里 / 装满了 / 粮食', '"满"读得饱满'],
      ['秋天真热闹。', '秋天 / 真热闹', '结尾响亮一点'] ] },
    { t: '一阵雨', lines: [
      ['乌云慢慢压下来。', '乌云 / 慢慢 / 压下来', '声音压低一些'],
      ['雨点先是一滴两滴。', '雨点 / 先是 / 一滴两滴', '读得慢，像在数'],
      ['后来，雨下得密了。', '后来 / 雨 / 下得密了', '节奏稍稍加快'],
      ['雨敲在窗上，滴滴答答。', '雨敲在窗上 / 滴滴答答', '"滴滴答答"清脆一点'],
      ['不多久，天又亮起来。', '不多久 / 天 / 又亮起来', '语气转亮'],
      ['空气里有一股清味儿。', '空气里 / 有 / 一股清味儿', '轻轻收尾'] ] }
  ];

  /* ---------------- 英语：示范对话（原创，非教材原文） ---------------- */
  var EN_DIALOGUES = [
    { t: 'Greetings', lines: [
      ['A', 'Good morning!', '早上好！', 'morning 的 -ing 别吞掉'],
      ['B', 'Good morning! How are you?', '早上好！你好吗？', 'How are you 连读，句末上扬'],
      ['A', "I'm fine, thank you.", '我很好，谢谢。', 'thank 咬舌，别读成 sank'],
      ['B', "What's your name?", '你叫什么名字？', "What's 读成一个音"],
      ['A', 'My name is Lily.', '我叫莉莉。', 'name 的 /eɪ/ 拉长'],
      ['B', 'Nice to meet you, Lily.', '很高兴认识你，莉莉。', 'meet you 可以连读'] ] },
    { t: 'Colours', lines: [
      ['A', 'What colour is it?', '它是什么颜色？', 'colour 重音在前面'],
      ['B', 'It is red.', '它是红色的。', 'red 的 /r/ 卷舌'],
      ['A', 'Do you like blue?', '你喜欢蓝色吗？', '一般疑问句句末上扬'],
      ['B', 'Yes, I like blue very much.', '是的，我很喜欢蓝色。', 'very much 读得稍重'],
      ['A', 'Look at the green tree.', '看那棵绿色的树。', 'green 的 /ɡr/ 连起来'],
      ['B', 'What a beautiful colour!', '多漂亮的颜色啊！', '读出赞叹的语气'] ] },
    { t: 'My family', lines: [
      ['A', 'Who is she?', '她是谁？', 'Who 用降调问'],
      ['B', 'She is my mother.', '她是我妈妈。', 'mother 的 /ð/ 咬舌'],
      ['A', 'Is he your father?', '他是你爸爸吗？', 'Is he 连读，句末上扬'],
      ['B', 'Yes, he is.', '是的，他是。', '简短回答要干脆'],
      ['A', 'You have a happy family.', '你有一个幸福的家。', 'happy 重音在第一个音节'],
      ['B', 'Thank you! I love my family.', '谢谢！我爱我的家。', 'love 读出感情'] ] },
    { t: 'At school', lines: [
      ['A', 'What is in your bag?', '你书包里有什么？', 'What is 可以缩读成 What\'s'],
      ['B', 'A book and a pencil.', '一本书和一支铅笔。', 'and 轻读成 /ən/'],
      ['A', 'May I use your ruler?', '我可以用你的尺子吗？', '礼貌问句语调放柔'],
      ['B', 'Sure. Here you are.', '当然，给你。', 'Here you are 连读'],
      ['A', 'Thank you very much.', '非常感谢。', 'much 收尾清楚'],
      ['B', 'You are welcome.', '不客气。', 'welcome 重音在前'] ] },
    { t: 'Food and drink', lines: [
      ['A', 'Are you hungry?', '你饿了吗？', 'hungry 重音在第一个音节'],
      ['B', 'Yes. I would like an apple.', '是的，我想要一个苹果。', 'an apple 连读'],
      ['A', 'Would you like some water?', '你想喝点水吗？', 'some 轻读'],
      ['B', 'Yes, please.', '好的，谢谢。', 'please 语调上扬更礼貌'],
      ['A', 'Here is your apple.', '这是你的苹果。', 'Here is 连读'],
      ['B', 'It is sweet. Thank you!', '真甜，谢谢你！', 'sweet 的 /iː/ 拉长'] ] },
    { t: 'Animals', lines: [
      ['A', 'What can you see?', '你能看见什么？', 'can 轻读'],
      ['B', 'I can see a little cat.', '我看见一只小猫。', 'little 的 /tl/ 别断开'],
      ['A', 'Is that a dog?', '那是一只狗吗？', 'Is that 连读'],
      ['B', 'No, it is a rabbit.', '不，那是一只兔子。', 'No 后面稍停'],
      ['A', 'Look! A bird is singing.', '看！一只鸟在唱歌。', 'singing 的 -ing 读清楚'],
      ['B', 'I like animals very much.', '我很喜欢动物。', 'animals 复数 /z/ 别漏'] ] },
    { t: 'The weather', lines: [
      ['A', 'How is the weather today?', '今天天气怎么样？', 'weather 的 /ð/ 咬舌'],
      ['B', 'It is sunny and warm.', '晴天，很暖和。', 'sunny 重音在前'],
      ['A', 'Is it rainy tomorrow?', '明天会下雨吗？', 'tomorrow 重音在第二个音节'],
      ['B', 'I do not know. Let us check.', '我不知道，我们查一下。', 'Let us 可读成 Let\'s'],
      ['A', 'Great! Let us go outside.', '太好了！我们出去吧。', '读出开心的语气'],
      ['B', 'Do not forget your hat.', '别忘了你的帽子。', 'forget 重音在后'] ] },
    { t: 'Numbers', lines: [
      ['A', 'How many books do you have?', '你有多少本书？', 'How many 连读'],
      ['B', 'I have three books.', '我有三本书。', 'three 的 /θ/ 咬舌'],
      ['A', 'Can I have one, please?', '可以给我一本吗？', '礼貌问句放柔'],
      ['B', 'Of course. Here you are.', '当然，给你。', 'of course 连读'],
      ['A', 'One, two, three. Thank you!', '一、二、三。谢谢！', '数数时一字一顿'],
      ['B', 'You are welcome. Let us read!', '不客气，我们一起读吧！', '结尾响亮'] ] }
  ];

  /* ---------------- 数学：概念讲解句 ---------------- */
  var MATH_LINES = {
    1: [['读题时，先看清一共有几个。', '读题 / 先看清 / 一共有几个', '一步一顿，别急着算'],
        ['把两部分合起来，用加法。', '把两部分 / 合起来 / 用加法', '"合起来"读重一点'],
        ['从总数里去掉，用减法。', '从总数里 / 去掉 / 用减法', '注意"去掉"的动作感'],
        ['算完再数一遍，检查有没有漏。', '算完 / 再数一遍 / 检查', '读出检查的习惯'],
        ['把想法说给同桌听一听。', '把想法 / 说给同桌 / 听一听', '语气自然'],
        ['会用比会算更重要。', '会用 / 比会算 / 更重要', '结尾稳稳的']],
    2: [['先看清算式里的数和符号。', '先看清 / 数和符号', '一步一顿'],
        ['几个相同的数相加，可以写成乘法。', '几个相同的数 / 相加 / 写成乘法', '"相同"读清楚'],
        ['平均分的时候，我们用除法。', '平均分 / 的时候 / 用除法', '"平均分"是关键词'],
        ['乘法口诀要边读边想意思。', '乘法口诀 / 边读 / 边想意思', '读出节奏'],
        ['算完估一估，答案合理吗？', '算完 / 估一估 / 答案合理吗', '问句上扬'],
        ['把错题再讲一遍，就真的会了。', '把错题 / 再讲一遍 / 就真的会了', '结尾肯定一点']],
    3: [['读数先从高位读起。', '读数 / 先从 / 高位读起', '"高位"读重'],
        ['写数时，哪一位上没有就写零。', '写数时 / 哪一位上没有 / 就写零', '逗号处换气'],
        ['分数表示把一个整体平均分。', '分数 / 表示 / 把一个整体平均分', '"平均分"别吞字'],
        ['面积说的是面的大小，不是线的长短。', '面积 / 说的是 / 面的大小', '对比要读清楚'],
        ['单位不同，先换算再比较。', '单位不同 / 先换算 / 再比较', '一步一顿'],
        ['说清楚道理，比写出答案更棒。', '说清楚道理 / 比写出答案 / 更棒', '结尾上扬']],
    4: [['大数先分级，再从高位读起。', '大数 / 先分级 / 再从高位读起', '读出分级的感觉'],
        ['运算律能让计算更简便。', '运算律 / 能让 / 计算更简便', '"简便"读重一点'],
        ['先想清楚先算什么，再动笔。', '先想清楚 / 先算什么 / 再动笔', '逗号处停一停'],
        ['算图形面积，别忘写单位。', '算图形面积 / 别忘 / 写单位', '"单位"别漏'],
        ['用不同的方法验算一遍。', '用不同的方法 / 验算一遍', '语气像提醒自己'],
        ['把解题过程讲出来，就是真懂了。', '把解题过程 / 讲出来 / 就是真懂了', '稳稳收尾']]
  };

  /* ---------------- 题目生成（答案索引严格校验） ---------------- */
  function qItem(q, opts, ai, e) {
    return q + '|' + opts.join(',') + '|' + ai + '|' + e;
  }
  function chineseQuiz(words, seed) {
    var ws = words.map(function (w) { return w.split('|'); });
    var out = [], i;
    for (i = 0; i < Math.min(4, ws.length); i++) {
      var a = ws[i], ch = a[0], py = a[1];
      if (!/[\u4e00-\u9fa5]/.test(ch) || !py) continue;
      /* 1) 读音 */
      var wrongPy = uniq(ws.filter(function (x, j) { return j !== i && x[1] && x[1] !== py; })
        .map(function (x) { return x[1]; }));
      ['shū', 'bǎi', 'lín', 'huā', 'yǔ', 'xīng'].forEach(function (x) { if (x !== py) wrongPy.push(x); });
      wrongPy = uniq(wrongPy).slice(0, 3);
      if (wrongPy.length === 3) {
        var opts = shuffle([py].concat(wrongPy)), ai = opts.indexOf(py);
        out.push(qItem('「' + ch + '」的正确读音是？', opts, ai, '读一读：' + ch + '，' + py + '。'));
      }
      /* 2) 笔画数 */
      var n = (META[ch] || {}).n || 0;
      if (n) {
        var cand = uniq([n, n + 1, n + 2, Math.max(1, n - 1), n + 3].map(String)).slice(0, 4);
        if (cand.length === 4) {
          var o2 = shuffle(cand.concat()), a2 = o2.indexOf(String(n));
          out.push(qItem('「' + ch + '」一共有几笔？', o2, a2, '按笔顺数一数，一共 ' + n + ' 笔。'));
        }
      }
      /* 3) 组词 */
      var good = (a[2] || '').split(/[、,，]/)[0] || '';
      if (good && good.indexOf(ch) >= 0) {
        var bad = [];
        ws.forEach(function (x, j) {
          if (j === i) return;
          var w = (x[2] || '').split(/[、,，]/)[0];
          if (w && w.indexOf(ch) < 0) bad.push(w);
        });
        ['天空', '小手', '白云', '书本', '花草', '山水', '日月'].forEach(function (w) { if (w.indexOf(ch) < 0) bad.push(w); });
        bad = uniq(bad).slice(0, 3);
        if (bad.length === 3) {
          var o3 = shuffle([good].concat(bad)), a3 = o3.indexOf(good);
          out.push(qItem('下面哪个词里有「' + ch + '」？', o3, a3, '「' + good + '」里就有这个字。'));
        }
      }
    }
    /* 4) 通用：笔顺规则（答案固定，避免无题可练） */
    out.push(qItem('写「横」和「竖」时，一般先写哪一笔？', ['先横后竖', '先竖后横', '随便写', '从右边写起'], 0,
      '笔顺规则：先横后竖，例如「十」先写横再写竖。'));
    out.push(qItem('写字时，左右结构的字一般按什么顺序写？', ['从左到右', '从右到左', '先写中间', '先写下面'], 0,
      '左右结构按「从左到右」写，字才稳。'));
    return uniq(out).slice(0, 8);
  }
  function mathQuiz(g, seed) {
    var out = [], a, b, c, opts, ai, ans, i;
    function num(title, correct, distract, tip) {
      /* 正确答案必须保留在 4 个选项内：先取 3 个互异干扰项，再一起打乱 */
      var d = uniq(distract.map(String).filter(function (x) {
        return x !== String(correct) && x !== 'NaN' && x !== 'undefined' && x !== 'Infinity';
      })).slice(0, 3);
      if (d.length < 3) return;
      var arr = shuffle([String(correct)].concat(d));
      out.push(qItem(title, arr, arr.indexOf(String(correct)), tip));
    }
    for (i = 0; i < 4; i++) {
      a = 2 + ((seed + i * 3) % 8); b = 1 + ((seed + i * 5) % 9);
      if (g === 1) {
        ans = a + b; num(a + ' + ' + b + ' = ?', ans, [ans + 1, ans - 1, ans + 2, a * b], '把 ' + a + ' 和 ' + b + ' 合起来，得 ' + ans + '。');
        var x = a + b, y = 1 + ((seed + i) % Math.max(1, x - 1));
        ans = x - y; num(x + ' − ' + y + ' = ?', ans, [ans + 1, ans + 2, Math.max(0, ans - 1), x + y], '从 ' + x + ' 里去掉 ' + y + '，剩 ' + ans + '。');
      } else if (g === 2) {
        ans = a * b; num(a + ' × ' + b + ' = ?', ans, [ans + a, ans - b, ans + 1, a + b], '口诀：' + a + ' 乘 ' + b + ' 得 ' + ans + '。');
        c = a * b; ans = a; num(c + ' ÷ ' + b + ' = ?', ans, [ans + 1, b, c - b, a + b], '想：' + b + ' 乘几等于 ' + c + '？答案是 ' + a + '。');
      } else if (g === 3) {
        ans = a * 100 + b * 10; num(a + ' 个百和 ' + b + ' 个十合起来是多少？', ans,
          [ans + 100, ans - 10, a * 10 + b * 100, ans + 10], '百位是 ' + a + '，十位是 ' + b + '，个位是 0。');
        ans = a * b + b; num('先算 ' + a + ' × ' + b + '，再加 ' + b + '，得多少？', ans,
          [ans + b, ans - b, a * b, a + b * 2], '先乘后加：' + (a * b) + ' + ' + b + ' = ' + ans + '。');
      } else {
        ans = a * b; num('用乘法分配律：' + a + ' × (' + b + ' + 1) = ' + ans + ' + ?', a,
          [b, 1, a * b + a, a + 1], '拆开就是 ' + a + '×' + b + ' + ' + a + '×1，所缺的是 ' + a + '。');
        ans = (a + b) * 2; num('长 ' + a + ' 厘米、宽 ' + b + ' 厘米的长方形，周长是多少厘米？', ans,
          [a * b, a + b, ans + 2, ans * 2], '周长 = (长 + 宽) × 2 = ' + ans + '。');
      }
    }
    return out.slice(0, 8);
  }
  function englishQuiz(words, seed) {
    var ws = words.map(function (w) { return w.split('|'); })
      .filter(function (a) { return /^[A-Za-z]/.test(a[0]) && a[2] && a[2] !== '课本话题词'; });
    var out = [], i;
    for (i = 0; i < Math.min(5, ws.length); i++) {
      var a = ws[i];
      var wrong = uniq(ws.filter(function (x, j) { return j !== i && x[2] !== a[2]; }).map(function (x) { return x[2]; }));
      ['苹果', '学校', '红色', '老师', '朋友', '早上', '小猫'].forEach(function (x) { if (x !== a[2]) wrong.push(x); });
      wrong = uniq(wrong).slice(0, 3);
      if (wrong.length !== 3) continue;
      var o = shuffle([a[2]].concat(wrong)), ai = o.indexOf(a[2]);
      out.push(qItem('「' + a[0] + '」是什么意思？', o, ai, a[0] + ' = ' + a[2] + '，再读一遍记一记。'));
    }
    out.push(qItem('别人说 "Thank you."，最合适回答是？', ['You are welcome.', 'Good night.', 'See you.', 'How are you?'], 0,
      'Thank you. 的常用回应是 You are welcome.（不客气）。'));
    out.push(qItem('早上见到老师，应该说？', ['Good morning.', 'Good night.', 'Goodbye.', 'Thank you.'], 0,
      '早上问好用 Good morning.，晚上告别才用 Good night.'));
    out.push(qItem('"How are you?" 是在问什么？', ['你好吗', '你叫什么', '你几岁', '你在哪里'], 0,
      'How are you? 用来问候对方近况，回答 I\'m fine, thank you.'));
    return uniq(out).slice(0, 8);
  }

  /* ---------------- 组装单元 ---------------- */
  function linesToRaw(lines) {
    return lines.map(function (l) {
      /* lines 支持 [t,p,m] 或 [role,t,p,m]；单元跟读行为 3 字段格式，
         故把角色写进跟读要点，既保留分角色信息又不破坏数据结构。 */
      if (l.length === 4) return l[1] + '|' + l[2] + '|' + l[0] + ' 角色：' + l[3];
      return l[0] + '|' + l[1] + '|' + l[2];
    }).join(';');
  }
  function build(g, s, v, i, title) {
    var seed = hash(key(g, s, v, i)), topic = clean(title) || title;
    var u = { title: title, tip: '', textTitle: '', goals: '', words: '', ask: '', steps: '', points: '', quiz: '', lines: '', hw: '' };
    if (s === 'chinese') {
      var words = chineseWords(g, v, title);
      var pas = pick(ZH_PASSAGES, seed);
      u.textTitle = pas.t + '（原创跟读短文）';
      u.words = words.join(';');
      u.lines = linesToRaw(pas.lines);
      u.quiz = chineseQuiz(words, seed).join(';');
      u.goals = ['认识本课要学的字，读准字音', '看清字形，能按笔顺写下来', '把句子读通顺，读出停顿'].join('|');
      u.steps = ['5 分钟：看图或看题目，猜一猜这一课讲什么', '8 分钟：点读字词卡，每个字跟读 3 遍', '5 分钟：挑 2 个字，用手指在桌上书空笔顺', '2 分钟：把不懂的地方圈出来，带进课堂'].join('|');
      u.ask = ['这些字里，哪一个你已经见过了？', '哪个字最难写？难在哪一笔？'].join('|');
      u.points = ['读准每个字的音，特别注意平舌音和翘舌音', '按笔顺写字，先横后竖、先撇后捺、从左到右', '读句子时按意思停顿，不要一个字一个字蹦'].join('|');
      u.hw = ['基础：把本课字词各读 3 遍，抄写 2 遍|' +
        '提升：挑 3 个字各组一个词，说给家人听|' +
        '拓展：用其中一个词说一句完整的话，并写下来'].join('');
      u.tip = '示范内容：字词取自本课目录标题，笔顺、拼音、组词为通用词语示例；跟读短文为原创朗读练习，不是教材原文。以学校课本为准。';
    } else if (s === 'math') {
      var mw = mathWords(g, title, seed);
      u.words = mw.join(';');
      u.lines = linesToRaw(MATH_LINES[g] || MATH_LINES[1]);
      u.quiz = mathQuiz(g, seed).join(';');
      u.goals = ['读懂本课题目在问什么', '会说出自己的计算方法', '算完能检查结果合不合理'].join('|');
      u.steps = ['3 分钟：读一遍题目，圈出已知的数', '8 分钟：点读概念卡，把方法说给自己听', '8 分钟：完成口算闯关 10 题，错的当场订正', '3 分钟：挑一道题，把过程讲给家人听'].join('|');
      u.ask = ['这道题要先算什么？为什么？', '有没有更简便的办法？'].join('|');
      u.points = ['先审题再动笔，看清数字和运算符号', '计算时写清步骤，不跳步', '算完估一估、验一验，单位别漏写'].join('|');
      u.hw = ['基础：完成课本对应练习，限时 10 分钟|' +
        '提升：把错题重做一遍，并写出错在哪一步|' +
        '拓展：自己编 2 道同类题，考一考家人'].join('');
      u.tip = '示范内容：概念讲解与算式题为按年级自动生成的通用练习，不是教材原题；口算闯关可反复出题。';
    } else {
      var ew = englishWords(title, seed);
      var dia = pick(EN_DIALOGUES, seed);
      u.textTitle = dia.t + '（原创示范对话）';
      u.words = ew.join(';');
      u.lines = linesToRaw(dia.lines);
      u.quiz = englishQuiz(ew, seed).join(';');
      u.goals = ['听懂并读准本课常用词', '能用一句话做个简单问答', '敢开口，把句子说完整'].join('|');
      u.steps = ['3 分钟：看图或看标题，猜一猜今天的话题', '8 分钟：点读单词卡，每个词跟读 3 遍', '8 分钟：分角色读对话，A、B 各读一遍', '3 分钟：合上书，试着说一句自己的话'].join('|');
      u.ask = ['这句话在什么场合可以用？', '如果把词换掉，句子还说得通吗？'].join('|');
      u.points = ['单词重音要读对，别吞掉词尾', '一般疑问句句末语调往上扬', '对话要看着对方，一句一句接得上'].join('|');
      u.hw = ['基础：跟读单词与对话各 3 遍，录一遍回听|' +
        '提升：和家人分角色表演对话|' +
        '拓展：换 2 个词，编一组新的小对话'].join('');
      u.tip = '示范内容：词汇与对话为按单元话题原创的通用练习，不是教材原文；一二年级英语为口语启蒙拓展。';
    }
    cache[key(g, s, v, i)] = u;
    return u;
  }

  window.BasicData = {
    kind: function (g, s, v, i) { return full(g, s, v, i) ? 'full' : 'basic'; },
    unit: function (g, s, v, i) {
      var k = key(g, s, v, i);
      if (full(g, s, v, i)) return UNIT[k];
      if (cache[k]) return cache[k];
      var titles = CATALOG.getCatalog(g, s, v);
      return build(g, s, v, i, titles[i] || '第 ' + (i + 1) + ' 课');
    },
    isBasic: function (g, s, v, i) { return !full(g, s, v, i); },
    note: '通用教学示范内容（按课本目录自动生成，非教材原文）'
  };
})();
