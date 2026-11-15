/* ============================================================
 * config.js —— 全局配置 / 教材目录 / 学段扩展骨架
 * ------------------------------------------------------------
 * 本文件是「扩展新年级、新学科、新教材版本」的唯一入口。
 * 新增年级或学段时，只需修改 stages / catalog / subjects，
 * 不需要改动 app.js、speech.js 中的任何业务逻辑。
 * ============================================================ */
(function () {
  'use strict';

  var CN = ['零', '一', '二', '三', '四', '五', '六'];

  /* ---------- 教材目录 ----------
   * key 格式: '年级|学科|册次'（册次为 上 / 下）
   * value 用 '|' 分隔单元标题；顺序即课本顺序。
   * 目录依据公开教材目录整理，具体单元名称与顺序请以学校实际用书核对。
   */
  var catalog = {
    /* ===== 语文 · 统编版（人教部编版） ===== */
    '1|chinese|上': '我上学了|识字1 天地人|识字2 金木水火土|识字3 口耳目|识字4 日月水火|识字5 对韵歌|汉语拼音1 a o e|汉语拼音2 i u ü y w|汉语拼音3 b p m f|汉语拼音4 d t n l|课文1 秋天|课文2 小小的船|课文3 江南|课文4 四季|识字6 画|识字7 大小多少|识字8 小书包|识字9 日月明|识字10 升国旗|课文5 影子|课文6 比尾巴|课文7 青蛙写诗|课文8 雨点儿|课文9 明天要远足|课文10 大还是小|课文11 项链|课文12 雪地里的小画家|课文13 乌鸦喝水|课文14 小蜗牛',
    '1|chinese|下': '识字1 春夏秋冬|识字2 姓氏歌|识字3 小青蛙|识字4 猜字谜|课文1 吃水不忘挖井人|课文2 我多想去看看|课文3 四个太阳|课文4 静夜思|课文5 夜色|课文6 端午粽|课文7 彩虹|识字5 动物儿歌|识字6 古对今|识字7 操场上|识字8 人之初|课文11 古诗二首（池上·小池）|课文12 荷叶圆圆|课文13 要下雨了|课文14 文具的家|课文15 一分钟|课文16 动物王国开大会|课文17 小猴子下山|课文18 棉花姑娘|课文19 咕咚|课文20 小壁虎借尾巴',
    '2|chinese|上': '课文1 小蝌蚪找妈妈|课文2 我是什么|课文3 植物妈妈有办法|识字1 场景歌|识字2 树之歌|识字3 拍手歌|识字4 田家四季歌|课文4 曹冲称象|课文5 玲玲的画|课文6 一封信|课文7 妈妈睡了|课文8 古诗二首（登鹳雀楼·望庐山瀑布）|课文9 黄山奇石|课文10 日月潭|课文11 葡萄沟|课文12 坐井观天|课文13 寒号鸟|课文14 我要的是葫芦|课文18 古诗二首（夜宿山寺·敕勒歌）|课文19 雾在哪里|课文20 雪孩子|课文21 狐假虎威|课文22 纸船和风筝|课文23 风娃娃',
    '2|chinese|下': '课文1 古诗二首（村居·咏柳）|课文2 找春天|课文3 开满鲜花的小路|课文4 邓小平爷爷植树|课文5 雷锋叔叔，你在哪里|课文6 千人糕|识字1 神州谣|识字2 传统节日|识字3 “贝”的故事|识字4 中国美食|课文8 彩色的梦|课文9 枫树上的喜鹊|课文10 沙滩上的童话|课文11 我是一只小虫子|课文12 寓言二则|课文13 画杨桃|课文14 小马过河|课文15 古诗二首（晓出净慈寺送林子方·绝句）|课文16 雷雨|课文17 要是你在野外迷了路|课文18 太空生活趣事多|课文19 大象的耳朵|课文20 蜘蛛开店|课文21 青蛙卖泥塘|课文22 小毛虫|课文23 当世界年纪还小的时候|课文24 羿射九日',
    '3|chinese|上': '第一单元 1 大青树下的小学|2 花的学校|3* 不懂就要问|第二单元 4 古诗三首（山行·赠刘景文·夜书所见）|5 铺满金色巴掌的水泥道|6 秋天的雨|7* 听听，秋的声音|第三单元 8 卖火柴的小女孩|9* 那一定会很好|10 在牛肚子里旅行|11* 一块奶酪|第四单元 12 总也倒不了的老屋|13* 胡萝卜先生的长胡子|14* 小狗学叫|第五单元 15 搭船的鸟|16 金色的草地|第六单元 17 古诗三首（望天门山·饮湖上初晴后雨·望洞庭）|18 富饶的西沙群岛|19 海滨小城|20 美丽的小兴安岭|第七单元 21 大自然的声音|22 父亲、树林和鸟|23 带刺的朋友|第八单元 24 司马光|25 掌声|26 灰雀|27* 手术台就是阵地',
    '3|chinese|下': '第一单元 1 古诗三首（绝句·惠崇春江晚景·三衢道中）|2 燕子|3 荷花|4* 昆虫备忘录|第二单元 5 守株待兔|6 陶罐和铁罐|7 鹿角和鹿腿|8* 池子与河流|第三单元 9 古诗三首（元日·清明·九月九日忆山东兄弟）|10 纸的发明|11 赵州桥|12* 一幅名扬中外的画|第四单元 13 花钟|14 蜜蜂|15* 小虾|第五单元 16 童年的水墨画|17 剃头大师|18 肥皂泡|19* 我不能失信|第六单元 20 我们奇妙的世界|21 海底世界|22 火烧云|第七单元 23 慢性子裁缝和急性子顾客|24* 方帽子店|25* 漏|26* 枣核',
    '4|chinese|上': '第一单元 1 观潮|2 走月亮|3* 现代诗二首|4* 繁星|第二单元 5 一个豆荚里的五粒豆|6 夜间飞行的秘密|7 呼风唤雨的世纪|8* 蝴蝶的家|第三单元 9 古诗三首（暮江吟·题西林壁·雪梅）|10 爬山虎的脚|11 蟋蟀的住宅|第四单元 12 盘古开天地|13 精卫填海|14 普罗米修斯|15* 女娲补天|第五单元 16 麻雀|17 爬天都峰|第六单元 18 牛和鹅|19 一只窝囊的大老虎|20 陀螺|第七单元 21 古诗三首（出塞·凉州词·夏日绝句）|22 为中华之崛起而读书|23* 梅兰芳蓄须|24* 延安，我把你追寻|第八单元 25 王戎不取道旁李|26 西门豹治邺|27* 故事二则',
    '4|chinese|下': '第一单元 1 古诗词三首（宿新市徐公店·四时田园杂兴·清平乐·村居）|2 乡下人家|3* 天窗|4* 三月桃花水|第二单元 5 琥珀|6 飞向蓝天的恐龙|7 纳米技术就在我们身边|8* 千年梦圆在今朝|第三单元 9 短诗三首|10 绿|11 白桦|12* 在天晴了的时候|第四单元 13 猫|14 母鸡|15 白鹅|第五单元 16 海上日出|17 记金华的双龙洞|第六单元 18 文言文二则|19* 小英雄雨来|20* 我们家的男子汉|21* 芦花鞋|第七单元 22 古诗三首（芙蓉楼送辛渐·塞下曲·墨梅）|23 “诺曼底号”遇难记|24* 黄继光|第八单元 25 宝葫芦的秘密|26 巨人的花园|27* 海的女儿',

    /* ===== 数学 · 人教版 ===== */
    '1|math|上': '准备课|位置|1~5的认识和加减法|认识图形（一）|6~10的认识和加减法|11~20各数的认识|认识钟表|20以内的进位加法|总复习',
    '1|math|下': '认识图形（二）|20以内的退位减法|分类与整理|100以内数的认识|认识人民币|100以内的加法和减法（一）|找规律|总复习',
    '2|math|上': '长度单位|100以内的加法和减法（二）|角的初步认识|表内乘法（一）|观察物体（一）|表内乘法（二）|认识时间|数学广角—搭配（一）|总复习',
    '2|math|下': '数据收集整理|表内除法（一）|图形的运动（一）|表内除法（二）|混合运算|有余数的除法|万以内数的认识|克和千克|数学广角—推理|总复习',
    '3|math|上': '时、分、秒|万以内的加法和减法（一）|测量|万以内的加法和减法（二）|倍的认识|多位数乘一位数|长方形和正方形|分数的初步认识|数学广角—集合|总复习',
    '3|math|下': '位置与方向（一）|除数是一位数的除法|复式统计表|两位数乘两位数|面积|年、月、日|小数的初步认识|数学广角—搭配（二）|总复习',
    '4|math|上': '大数的认识|公顷和平方千米|角的度量|三位数乘两位数|平行四边形和梯形|除数是两位数的除法|条形统计图|数学广角—优化|总复习',
    '4|math|下': '四则运算|观察物体（二）|运算定律|小数的意义和性质|三角形|小数的加法和减法|图形的运动（二）|平均数与条形统计图|数学广角—鸡兔同笼|总复习',

    /* ===== 英语 · 教科版（广州版，三年级起点） =====
     * 三上/三下/四上 采用 2024—2025 起启用之新修订目录（Unit 制）；
     * 四下列出旧版 Module 目录，新版启用后请按学校用书更新 catalog 即可。
     */
    '1|english|上': '启蒙1 Hello! 打招呼|启蒙2 Colours 颜色|启蒙3 Numbers 1-5 数字',
    '1|english|下': '启蒙4 My Family 家人|启蒙5 Animals 动物|启蒙6 Food 食物',
    '2|english|上': '启蒙7 My Body 身体|启蒙8 School Things 文具|启蒙9 Fruits 水果',
    '2|english|下': '启蒙10 My Day 一天|启蒙11 Toys 玩具|启蒙12 Weather 天气',
    '3|english|上': 'Module 1 Greetings · Unit 1 Hello!|Unit 2 How are you?|Unit 3 What\u2019s your name?|Unit 4 This is my dad|Unit 5 Wash your face|Unit 6 Touch your head|Unit 7 A picture of my family|Unit 8 Who\u2019s that lady?|Unit 9 Is it a cat?|Unit 10 I have a ship|Unit 11 Do you have a pencil?|Unit 12 Put it on the desk',
    '3|english|下': 'Unit 1 Get Up|Unit 2 What a Day!|Unit 3 Plan My Day|Unit 4 Come and Join Us!|Unit 5 Our Classroom, Our Call|Unit 6 I\u2019m on Duty|Unit 7 School Rules|Unit 8 A Polite Way|Review Road Helper Day',
    '4|english|上': 'Unit 1 Come on In!|Unit 2 Help Yourself|Unit 3 I\u2019m the Chef Today!|Unit 4 Help Out in the Kitchen|Unit 5 She Helps Me a Lot|Unit 6 I Love My Family|Unit 7 Family Time|Unit 8 Joy in the Air|Review Happy New Year!',
    '4|english|下': 'Module 1 People · Unit 1 He looks like a cook.|Unit 2 She is very kind.|Module 2 Daily routine · Unit 3 It\u2019s time to get up.|Unit 4 When do you have class?|Module 3 Days of the week|Module 4 Activities|Module 5 Sports|Module 6 Celebrations|Module 7 Let\u2019s look back'
  };

  /* ---------- 学段骨架 ----------
   * ready = 已建设内容的年级；planned = 已预留槽位、待填充内容的年级。
   * 预留扩展时把年级号从 planned 移入 ready，并补齐 catalog + 单元数据即可。
   */
  var stages = [
    { id: 'primary', label: '小学', short: '小', grades: [1, 2, 3, 4, 5, 6], ready: [1, 2, 3, 4], planned: [5, 6] },
    { id: 'junior', label: '初中', short: '初', grades: [7, 8, 9], ready: [], planned: [7, 8, 9],
      textbooks: { chinese: '统编版', math: '人教版', english: '上海教育版（广州）' },
      extraSubjects: ['物理', '化学', '生物', '道德与法治', '历史', '地理'] },
    { id: 'senior', label: '高中', short: '高', grades: [10, 11, 12], ready: [], planned: [10, 11, 12],
      textbooks: { chinese: '统编版', math: '人教版', english: '人教版' },
      extraSubjects: ['物理', '化学', '生物', '政治', '历史', '地理'] }
  ];

  var subjects = [
    { id: 'chinese', label: '语文', icon: 'book', color: '#d9534f', soft: '#fdf0ee',
      textbook: '统编版（人教部编版）', from: 1,
      wordLabel: '生字词', readLabel: '课文跟读' },
    { id: 'math', label: '数学', icon: 'calc', color: '#2f6fed', soft: '#edf3ff',
      textbook: '人教版', from: 1,
      wordLabel: '核心概念', readLabel: '例题讲解' },
    { id: 'english', label: '英语', icon: 'globe', color: '#0f9d8c', soft: '#e9f8f5',
      textbook: '教科版（广州版）· 三年级起点', from: 3,
      wordLabel: '单元词汇', readLabel: '对话跟读' }
  ];

  /* ---------- 学习模块 ----------
   * modules 为模块全集；moduleSets 决定各学科显示哪些模块、按什么顺序。
   * 新增学科扩展模块时，只要在 modules 加一项、在 moduleSets 里排好顺序，
   * app.js 会自动渲染对应标签页，不需要改业务代码。
   */
  var modules = [
    { id: 'preview', label: '课前预习', icon: 'sun', hint: '目标 · 新知 · 发音 · 预习任务' },
    { id: 'strokes', label: '生字笔顺', icon: 'pencil', hint: '笔顺动画 · 描红 · 拼音组词', only: ['chinese'] },
    { id: 'review', label: '课后复习', icon: 'notebook', hint: '要点 · 练习 · 分层作业' },
    { id: 'read', label: '课本跟读', icon: 'speaker', hint: '逐句播放 · 连读 · 调速' },
    { id: 'text', label: '课文原文', icon: 'book', hint: '全文跟读 · 逐句 · 背诵', only: ['chinese', 'english'] },
    { id: 'drill', label: '口算闯关', icon: 'calc', hint: '自动出题 · 计时 · 错题', only: ['math'] },
    { id: 'challenge', label: '通关挑战', icon: 'trophy', hint: '听音辨词 · 综合测评 · 星级' }
  ];

  var moduleSets = {
    chinese: ['preview', 'strokes', 'review', 'read', 'text', 'challenge'],
    math: ['preview', 'review', 'read', 'drill', 'challenge'],
    english: ['preview', 'review', 'read', 'text', 'challenge']
  };

  var extensionGuide = [
    { step: '1', title: '新增一个年级（例如五年级）', body: '打开 js/config.js，把 5 从 primary.planned 移入 primary.ready；在 catalog 中按 \u201c5|chinese|上\u201d 等键补上该册目录，一行一个单元，用竖线分隔。' },
    { step: '2', title: '把某一课升级为精编内容', body: '课本目录里的每一课都能直接打开学习：46 个精编单元在 js/data-core.js（语文、数学）与 js/data-english.js（英语）；其余课次由 js/data-basic.js 按目录标题自动生成「通用教学示范内容」（预习目标、字词、练习题、跟读短文、分层作业），点开六大模块都有内容。若要为某一课换成精编内容，只需按同样的键新增一条单元数据，精编内容会自动优先，无需改动任何业务代码。' },
    { step: '3', title: '补充新模块的内容', body: '语文「生字笔顺」读取该单元 words 中的单字；165 个精编生字的笔顺在 js/stroke-data.js，602 个课本目录标题汉字的笔顺、拼音、组词在 js/hanzi-extra.js，字形信息在 js/hanzi-meta.js。「课文原文」与英语示范对话放在 js/data-text.js、js/data-text-init.js；数学「口算闯关」题型在 js/math-drill.js。模块标签由 moduleSets 自动编排。' },
    { step: '4', title: '扩展到初中 / 高中', body: '初中（7—9 年级）、高中（10—12 年级）的年级槽位与教材版本已在 stages 中预留，并预置了物理、化学、生物等学科名。按第 1、2 步操作即可；如需新增学科，在 subjects 中追加一个对象，并在 moduleSets 中给出模块顺序，四大基础模块会自动套用。' },
    { step: '5', title: '更换教材版本或修订目录', body: '只需修改 catalog 中对应的目录字符串与 subjects 中的 textbook 字段。2024 年起义务教育教材逐年修订，广州英语三、四年级已启用新版 Unit 制目录，请以孩子学校实际发放的课本为准核对。' },
    { step: '6', title: '语音、原文与数据说明', body: '发音使用浏览器内置语音合成（Web Speech API），无需联网、无需 API Key、零费用；中文 zh-CN，英文 en-US，可在顶部设置中调速与切换音色。笔顺动画库与汉字数据全部本地内置。教材现代课文与英语课本对话未收录，可用「录入课本原文」按实际课本自行录入，内容只存本机。学习进度同样保存在本机浏览器，不上传任何数据。' }
  ];

  window.APP_CONFIG = {
    appName: '穗学伴',
    appSubTitle: '广州小学同步学习资料',
    region: '广州市',
    version: '1.2.0',
    storageKey: 'suixueban_progress_v1',
    textStorageKey: 'suixueban_texts_v1',
    volumes: ['上', '下'],
    catalog: catalog,
    stages: stages,
    subjects: subjects,
    modules: modules,
    moduleSets: moduleSets,
    extensionGuide: extensionGuide,
    speech: { rate: 0.85, pitch: 1.0, gap: 480, zh: 'zh-CN', en: 'en-US' },
    passLine: 80,
    notice: '教材目录依据公开版本整理。46 个精编单元为教学设计示范内容；其余课次由 js/data-basic.js 按目录标题自动生成「通用教学示范内容」（字词、跟读短文、练习题），均非教材原文。语文仅收录公有领域古诗文，英语对话为原创示范；教材现代课文与课本对话请用「录入课本原文」按实际课本自行录入。笔顺、拼音、组词、部首供识字参考，请以学校课本校对后使用。',
    gradeLabel: function (g) {
      if (g <= 6) return CN[g] + '年级';
      if (g <= 9) return '初' + CN[g - 6] + '（' + CN[g - 6] + '年级）';
      return '高' + CN[g - 9] + '（' + CN[g - 9] + '年级）';
    },
    gradeShort: function (g) {
      if (g <= 6) return CN[g] + '年级';
      if (g <= 9) return '初' + CN[g - 6];
      return '高' + CN[g - 9];
    },
    subjectById: function (id) {
      for (var i = 0; i < subjects.length; i++) if (subjects[i].id === id) return subjects[i];
      return null;
    },
    stageByGrade: function (g) {
      for (var i = 0; i < stages.length; i++) if (stages[i].grades.indexOf(g) >= 0) return stages[i];
      return stages[0];
    },
    getCatalog: function (g, s, v) { return (catalog[g + '|' + s + '|' + v] || '').split('|').filter(Boolean); },
    moduleById: function (id) {
      for (var i = 0; i < modules.length; i++) if (modules[i].id === id) return modules[i];
      return null;
    },
    /**
     * 取某学科可见的模块。
     * 注意：业务层请一律用 modulesFor(subjectId)，不要用 modules 全集——
     * modules 是「模块字典」，直接渲染会把数学专属模块串到语文页面上。
     * 这里再按 only 做一次兜底过滤，即使配置写错也不会跨科显示。
     */
    modulesFor: function (subjectId) {
      var ids = moduleSets[subjectId] || ['preview', 'review', 'read', 'challenge'];
      var out = [], i, j;
      for (i = 0; i < ids.length; i++) {
        for (j = 0; j < modules.length; j++) {
          var m = modules[j];
          if (m.id !== ids[i]) continue;
          if (!m.only || m.only.indexOf(subjectId) >= 0) out.push(m);
        }
      }
      return out;
    },
    isReady: function (g) {
      var st = this.stageByGrade(g);
      return st.ready.indexOf(g) >= 0;
    }
  };
})();
