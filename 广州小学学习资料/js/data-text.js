/* ============================================================
 * data-text.js —— 课文原文 / 跟读课文数据
 * ------------------------------------------------------------
 * 【合规边界 · 重要】
 *  1. 语文仅收录「公有领域」古诗文（唐、宋、清诗作及先秦典籍），
 *     可全文展示与朗读；教材中的现代课文（如《秋天》《雷雨》《猫》）
 *     受著作权保护，本文件不收录，请用应用内「录入课本原文」功能，
 *     由家长按孩子手上的课本自行录入，仅供本机跟读使用。
 *  2. 英语收录的是按单元话题与句型「原创编写」的示范对话，
 *     不是教科版教材原文，已在 source 字段与界面中明确标注。
 *  3. 古诗文存在版本异文（如「树头新绿／花落未成阴」），
 *     以学校实际发放的课本为准。
 *
 * 【数据格式】key = '年级|学科|册次|单元序号'
 *   { kind: 'poem' | 'dialogue', source, title, note,
 *     sections: [ { title, author, lines: [ {role,t,p,m} ] } ] }
 *     role 英语角色（A/B/人名）；t 原文；p 中文；m 跟读提示/句意
 * ============================================================ */
(function () {
  'use strict';

  var T = {};
  function add(key, cfg) { T[key] = cfg; }
  window.TEXT_DATA = T;

  window.TEXT_NOTE = {
    chinese: '本页古诗文为公有领域作品，可全文跟读。教材中的现代课文受著作权保护未收录，可点「录入课本原文」，按孩子课本自行录入后逐句跟读，内容只保存在本机浏览器。',
    english: '本页对话为按单元话题与句型原创编写的「配套示范对话」，不是教材原文。课本 Let\'s talk / 课文对话请点「录入课本原文」按实际课本录入后跟读，内容只保存在本机浏览器。',
    math: '例题与概念为教学设计示范内容，不是教材原文。'
  };

  /* ==================== 语文 · 公有领域古诗文 ==================== */

  add('1|chinese|下|7', {
    kind: 'poem', source: '公有领域古诗文 · 可全文跟读', title: '静夜思', note: '五言绝句，按「二三」节奏读：床前／明月光。',
    sections: [{
      title: '静夜思', author: '唐 · 李白',
      lines: [
        { t: '床前明月光，', m: '明亮的月光洒在床前。读：床前／明月光' },
        { t: '疑是地上霜。', m: '好像地上铺了一层霜。「疑」是好像' },
        { t: '举头望明月，', m: '抬起头来看那天上的月亮' },
        { t: '低头思故乡。', m: '低下头就想起远方的家乡。语速放慢' }
      ]
    }]
  });

  add('2|chinese|上|11', {
    kind: 'poem', source: '公有领域古诗文 · 可全文跟读', title: '古诗二首', note: '两首都是写景名篇，读时想象画面，一句一停顿。',
    sections: [
      {
        title: '登鹳雀楼', author: '唐 · 王之涣',
        lines: [
          { t: '白日依山尽，', m: '太阳靠着山慢慢落下去' },
          { t: '黄河入海流。', m: '黄河朝着大海奔流' },
          { t: '欲穷千里目，', m: '想要看到更远的风景' },
          { t: '更上一层楼。', m: '就要再登上一层楼。末句读得有力' }
        ]
      },
      {
        title: '望庐山瀑布', author: '唐 · 李白',
        lines: [
          { t: '日照香炉生紫烟，', m: '阳光照着香炉峰，升起紫色云雾' },
          { t: '遥看瀑布挂前川。', m: '远远望去，瀑布像挂在山前的大河' },
          { t: '飞流直下三千尺，', m: '水流飞快地直冲而下，读出气势' },
          { t: '疑是银河落九天。', m: '好像是银河从天上落下来了' }
        ]
      }
    ]
  });

  add('2|chinese|下|0', {
    kind: 'poem', source: '公有领域古诗文 · 可全文跟读', title: '古诗二首', note: '两首写春天，读出轻快明亮的感觉。',
    sections: [
      {
        title: '村居', author: '清 · 高鼎',
        lines: [
          { t: '草长莺飞二月天，', m: '二月里草儿长、黄莺飞' },
          { t: '拂堤杨柳醉春烟。', m: '柳枝轻拂堤岸，像醉在春雾里' },
          { t: '儿童散学归来早，', m: '孩子们放学回来得早' },
          { t: '忙趁东风放纸鸢。', m: '赶紧趁着东风放风筝。读出欢喜' }
        ]
      },
      {
        title: '咏柳', author: '唐 · 贺知章',
        lines: [
          { t: '碧玉妆成一树高，', m: '柳树像用碧玉打扮起来一样高' },
          { t: '万条垂下绿丝绦。', m: '千万条柳枝像绿色丝带垂下' },
          { t: '不知细叶谁裁出，', m: '不知道这细细的叶子是谁剪的' },
          { t: '二月春风似剪刀。', m: '原来二月春风就像一把剪刀' }
        ]
      }
    ]
  });

  add('3|chinese|上|3', {
    kind: 'poem', source: '公有领域古诗文 · 可全文跟读', title: '古诗三首', note: '三首写秋，注意「斜 xiá」「挑 tiǎo」等古诗读音以课本注音为准。',
    sections: [
      {
        title: '山行', author: '唐 · 杜牧',
        lines: [
          { t: '远上寒山石径斜，', m: '石头小路弯弯曲曲伸向深秋的山上' },
          { t: '白云生处有人家。', m: '白云升起的地方竟住着人家' },
          { t: '停车坐爱枫林晚，', m: '停下车来，因为喜爱傍晚的枫林' },
          { t: '霜叶红于二月花。', m: '经霜的枫叶比春花还红' }
        ]
      },
      {
        title: '赠刘景文', author: '宋 · 苏轼',
        lines: [
          { t: '荷尽已无擎雨盖，', m: '荷花凋谢，连挡雨的荷叶也没有了' },
          { t: '菊残犹有傲霜枝。', m: '菊花虽残，枝条还傲然挺立' },
          { t: '一年好景君须记，', m: '一年最好的景致你要记住' },
          { t: '最是橙黄橘绿时。', m: '就是橙子金黄、橘子青绿的时候' }
        ]
      },
      {
        title: '夜书所见', author: '宋 · 叶绍翁',
        lines: [
          { t: '萧萧梧叶送寒声，', m: '梧桐叶沙沙响，送来阵阵寒意' },
          { t: '江上秋风动客情。', m: '江上秋风勾起了游子的思乡情' },
          { t: '知有儿童挑促织，', m: '猜想有孩子在拨弄蟋蟀' },
          { t: '夜深篱落一灯明。', m: '夜深了，篱笆下还亮着一盏灯' }
        ]
      }
    ]
  });

  add('3|chinese|下|0', {
    kind: 'poem', source: '公有领域古诗文 · 可全文跟读', title: '古诗三首', note: '三首写早春与初夏，边读边想画面。',
    sections: [
      {
        title: '绝句', author: '唐 · 杜甫',
        lines: [
          { t: '迟日江山丽，', m: '春日迟迟，江山格外秀丽' },
          { t: '春风花草香。', m: '春风里带着花草的香味' },
          { t: '泥融飞燕子，', m: '泥土湿软，燕子飞来衔泥' },
          { t: '沙暖睡鸳鸯。', m: '沙滩暖和，鸳鸯静静睡着' }
        ]
      },
      {
        title: '惠崇春江晚景', author: '宋 · 苏轼',
        lines: [
          { t: '竹外桃花三两枝，', m: '竹林外开着三两枝桃花' },
          { t: '春江水暖鸭先知。', m: '江水暖了，鸭子最先知道' },
          { t: '蒌蒿满地芦芽短，', m: '蒌蒿长满地，芦芽刚冒尖' },
          { t: '正是河豚欲上时。', m: '正是河豚要逆流而上的时候' }
        ]
      },
      {
        title: '三衢道中', author: '宋 · 曾几',
        lines: [
          { t: '梅子黄时日日晴，', m: '梅子黄了的时节，天天都是晴天' },
          { t: '小溪泛尽却山行。', m: '乘船到小溪尽头，再走山路' },
          { t: '绿阴不减来时路，', m: '树荫和来时一样浓密' },
          { t: '添得黄鹂四五声。', m: '还多了几声黄鹂的鸣叫' }
        ]
      }
    ]
  });

  add('3|chinese|下|4', {
    kind: 'poem', source: '公有领域典籍 · 可全文跟读', title: '守株待兔', note: '文言文按意思断句读，不要一字一顿。',
    sections: [{
      title: '守株待兔', author: '《韩非子 · 五蠹》',
      lines: [
        { t: '宋人有耕者。', m: '宋国有个种地的人。读：宋人／有耕者' },
        { t: '田中有株，兔走触株，折颈而死。', m: '田里有个树桩，兔子跑过撞上树桩，折断脖子死了' },
        { t: '因释其耒而守株，冀复得兔。', m: '于是他放下农具守着树桩，希望再捡到兔子。「耒 lěi」是农具' },
        { t: '兔不可复得，而身为宋国笑。', m: '兔子没再得到，自己反倒被宋国人笑话' }
      ]
    }]
  });

  add('4|chinese|上|8', {
    kind: 'poem', source: '公有领域古诗文 · 可全文跟读', title: '古诗三首', note: '三首都有「讲道理」的味道，读最后一句可稍慢。',
    sections: [
      {
        title: '暮江吟', author: '唐 · 白居易',
        lines: [
          { t: '一道残阳铺水中，', m: '夕阳的光铺在江面上' },
          { t: '半江瑟瑟半江红。', m: '半边碧绿，半边通红' },
          { t: '可怜九月初三夜，', m: '多么可爱啊，九月初三的夜晚' },
          { t: '露似真珠月似弓。', m: '露珠像珍珠，新月像弯弓' }
        ]
      },
      {
        title: '题西林壁', author: '宋 · 苏轼',
        lines: [
          { t: '横看成岭侧成峰，', m: '横看是山岭，侧看是山峰' },
          { t: '远近高低各不同。', m: '远近高低看到的都不一样' },
          { t: '不识庐山真面目，', m: '看不清庐山本来的样子' },
          { t: '只缘身在此山中。', m: '只因为自己就在这山里' }
        ]
      },
      {
        title: '雪梅', author: '宋 · 卢钺',
        lines: [
          { t: '梅雪争春未肯降，', m: '梅和雪争春，谁也不肯认输' },
          { t: '骚人搁笔费评章。', m: '诗人放下笔，难分高下' },
          { t: '梅须逊雪三分白，', m: '梅花要比雪少三分白' },
          { t: '雪却输梅一段香。', m: '雪却比梅花少了一段香' }
        ]
      }
    ]
  });

  add('4|chinese|下|0', {
    kind: 'poem', source: '公有领域古诗文 · 可全文跟读', title: '古诗词三首', note: '存在版本异文（如「树头新绿／花落未成阴」「亡赖／无赖」），请以课本为准。',
    sections: [
      {
        title: '宿新市徐公店', author: '宋 · 杨万里',
        lines: [
          { t: '篱落疏疏一径深，', m: '稀疏的篱笆旁，一条小路伸向远处' },
          { t: '树头新绿未成阴。', m: '树上刚长新叶，还没形成树荫' },
          { t: '儿童急走追黄蝶，', m: '孩子飞快地跑着追黄蝴蝶' },
          { t: '飞入菜花无处寻。', m: '蝴蝶飞进菜花里，再也找不着' }
        ]
      },
      {
        title: '四时田园杂兴（其二十五）', author: '宋 · 范成大',
        lines: [
          { t: '梅子金黄杏子肥，', m: '梅子金黄，杏子长得饱满' },
          { t: '麦花雪白菜花稀。', m: '麦花雪白，油菜花渐渐稀了' },
          { t: '日长篱落无人过，', m: '白天变长，篱笆边没人经过' },
          { t: '惟有蜻蜓蛱蝶飞。', m: '只有蜻蜓和蝴蝶在飞' }
        ]
      },
      {
        title: '清平乐 · 村居', author: '宋 · 辛弃疾',
        lines: [
          { t: '茅檐低小，溪上青青草。', m: '茅屋又低又小，溪边长满青草' },
          { t: '醉里吴音相媚好，白发谁家翁媪？', m: '带着醉意的吴地口音听着亲切，那白发老人是谁家的呢' },
          { t: '大儿锄豆溪东，中儿正织鸡笼。', m: '大儿子在溪东锄豆，二儿子在编鸡笼' },
          { t: '最喜小儿亡赖，溪头卧剥莲蓬。', m: '最逗人喜欢的是小儿子，趴在溪边剥莲蓬。词按上下片停顿' }
        ]
      }
    ]
  });

  /* ==================== 英语 · 原创示范对话（非教材原文） ==================== */

  add('1|english|上|0', {
    kind: 'dialogue', source: '原创示范对话 · 非教材原文', title: 'Hello! · 打招呼', note: '两人一组，先听后演；名字可以换成自己的。',
    sections: [{ title: 'At school 在学校', author: '', lines: [
      { role: 'A', t: 'Hello! I am Lily.', p: '你好！我是莉莉。', m: 'Hello 声音上扬，带笑容' },
      { role: 'B', t: 'Hi, Lily. I am Ben.', p: '嗨，莉莉。我是本。', m: 'I am 可以连读成 I\'m' },
      { role: 'A', t: 'Good morning, Ben!', p: '早上好，本！', m: 'morning 重音在前面' },
      { role: 'B', t: 'Good morning! How are you?', p: '早上好！你好吗？', m: '句尾稍上扬' },
      { role: 'A', t: 'I am fine, thank you.', p: '我很好，谢谢。', m: 'thank 咬清 th 的舌位' },
      { role: 'B', t: 'Goodbye, Lily!', p: '再见，莉莉！', m: '挥手，读得轻快' },
      { role: 'A', t: 'Bye bye! See you tomorrow.', p: '拜拜！明天见。', m: 'tomorrow 分三拍读' }
    ] }]
  });

  add('1|english|上|1', {
    kind: 'dialogue', source: '原创示范对话 · 非教材原文', title: 'Colours · 颜色', note: '把对话里的颜色换成身边真实的物品，边指边说。',
    sections: [{ title: 'In the classroom 在教室', author: '', lines: [
      { role: 'A', t: 'Look at my bag!', p: '看我的书包！', m: 'Look at 连读' },
      { role: 'B', t: 'What colour is it?', p: '它是什么颜色？', m: 'colour 读清楚' },
      { role: 'A', t: 'It is red.', p: '它是红色的。', m: 'is it 轻一点' },
      { role: 'B', t: 'I like red. I like blue, too.', p: '我喜欢红色，也喜欢蓝色。', m: 'too 放句尾，稍上扬' },
      { role: 'A', t: 'This leaf is green.', p: '这片叶子是绿色的。', m: 'green 拖长一点' },
      { role: 'B', t: 'And the flower is yellow.', p: '这朵花是黄色的。', m: 'yellow 重音在前' },
      { role: 'A', t: 'Red, yellow, blue and green!', p: '红、黄、蓝、绿！', m: '像报数一样，越读越轻快' }
    ] }]
  });

  add('1|english|下|0', {
    kind: 'dialogue', source: '原创示范对话 · 非教材原文', title: 'My Family · 家人', note: '拿一张全家福，指着照片把称呼换成自己家人的。',
    sections: [{ title: 'Looking at a family photo 看全家福', author: '', lines: [
      { role: 'A', t: 'This is my family.', p: '这是我的家。', m: 'This is 连读' },
      { role: 'B', t: 'Who is this?', p: '这是谁？', m: '句尾上扬' },
      { role: 'A', t: 'This is my father.', p: '这是我爸爸。', m: 'father 重音在前' },
      { role: 'B', t: 'And who is she?', p: '那她是谁？', m: 'she 读清楚' },
      { role: 'A', t: 'She is my grandma.', p: '她是我奶奶。', m: '语气温和一点' },
      { role: 'B', t: 'You have a big family!', p: '你有一个大家庭！', m: 'big 稍重' },
      { role: 'A', t: 'Yes. I love my family.', p: '是的，我爱我的家。', m: 'love 读得慢一点' }
    ] }]
  });

  add('2|english|上|0', {
    kind: 'dialogue', source: '原创示范对话 · 非教材原文', title: 'My Body · 身体部位', note: '边说边做动作，家长说指令、孩子指部位。',
    sections: [{ title: 'PE time 活动时间', author: '', lines: [
      { role: 'A', t: 'Touch your head!', p: '摸摸你的头！', m: 'Touch 读得有力' },
      { role: 'B', t: 'My head! And my hands.', p: '我的头！还有我的手。', m: 'hands 结尾 s 要轻' },
      { role: 'A', t: 'Touch your nose and your mouth.', p: '摸摸你的鼻子和嘴巴。', m: 'and 可以弱读' },
      { role: 'B', t: 'OK! These are my eyes.', p: '好！这是我的眼睛。', m: 'eyes 双元音饱满' },
      { role: 'A', t: 'I have two arms and two legs.', p: '我有两条胳膊和两条腿。', m: 'two 重读' },
      { role: 'B', t: 'Me too! Let us jump!', p: '我也是！我们跳吧！', m: 'Let us 连读成 Let\'s' }
    ] }]
  });

  add('2|english|下|0', {
    kind: 'dialogue', source: '原创示范对话 · 非教材原文', title: 'My Day · 我的一天', note: '按时间顺序说，注意 in the morning / in the evening 的停顿。',
    sections: [{ title: 'Talking about a day 说说一天', author: '', lines: [
      { role: 'A', t: 'I get up at seven.', p: '我七点起床。', m: 'get up 连读' },
      { role: 'B', t: 'I go to school at seven thirty.', p: '我七点半去上学。', m: 'thirty 咬清 th' },
      { role: 'A', t: 'We have English in the morning.', p: '我们上午有英语课。', m: 'in the 轻读' },
      { role: 'B', t: 'I play with my toys after school.', p: '放学后我玩玩具。', m: 'after 重音在前' },
      { role: 'A', t: 'What do you do in the evening?', p: '你晚上做什么？', m: '句尾降调' },
      { role: 'B', t: 'I read a book and go to bed.', p: '我读一本书，然后睡觉。', m: 'and 轻轻带过' }
    ] }]
  });

  add('3|english|上|0', {
    kind: 'dialogue', source: '原创示范对话 · 非教材原文', title: 'Unit 1 Hello! · Greetings', note: '按课本 Unit 话题编写的示范对话，练 Hello / How are you / This is...',
    sections: [{ title: 'Meeting a new classmate 认识新同学', author: '', lines: [
      { role: 'A', t: 'Hello! My name is Jiamin.', p: '你好！我叫嘉敏。', m: 'My name is 说得连贯' },
      { role: 'B', t: 'Hi, Jiamin. I am Ben. Nice to meet you.', p: '嗨，嘉敏。我是本。很高兴认识你。', m: 'Nice to meet you 一口气读完' },
      { role: 'A', t: 'Nice to meet you, too. How are you?', p: '我也很高兴认识你。你好吗？', m: 'too 稍上扬' },
      { role: 'B', t: 'I am fine, thank you. And you?', p: '我很好，谢谢。你呢？', m: 'And you 短促上扬' },
      { role: 'A', t: 'I am OK. This is my friend, Xiaoling.', p: '我挺好的。这是我的朋友小玲。', m: 'This is 连读' },
      { role: 'B', t: 'Hello, Xiaoling! Welcome to our class.', p: '你好，小玲！欢迎来到我们班。', m: 'Welcome 重音在前' }
    ] }]
  });

  add('3|english|上|2', {
    kind: 'dialogue', source: '原创示范对话 · 非教材原文', title: 'Unit 3 What is your name?', note: '练 What is your name / How do you spell it 的问答。',
    sections: [{ title: 'First day at school 开学第一天', author: '', lines: [
      { role: 'A', t: 'Good morning. What is your name?', p: '早上好。你叫什么名字？', m: '问句句尾稍降' },
      { role: 'B', t: 'My name is Janet. J-A-N-E-T.', p: '我叫珍妮特。J-A-N-E-T。', m: '拼读字母一个一个清楚' },
      { role: 'A', t: 'How do you spell your name?', p: '你的名字怎么拼？', m: 'spell 读清楚' },
      { role: 'B', t: 'B-E-N, Ben. And you?', p: 'B-E-N，本。你呢？', m: '字母之间稍停顿' },
      { role: 'A', t: 'I am Xiaoling. Nice to meet you!', p: '我是小玲。很高兴认识你！', m: '语气热情' },
      { role: 'B', t: 'Nice to meet you, too.', p: '我也很高兴认识你。', m: 'too 轻轻收尾' }
    ] }]
  });

  add('3|english|上|8', {
    kind: 'dialogue', source: '原创示范对话 · 非教材原文', title: 'Unit 9 Is it a cat?', note: '练 Is it...? 一般疑问句与 Yes / No 回答。',
    sections: [{ title: 'Guessing game 猜一猜', author: '', lines: [
      { role: 'A', t: 'Look! Is it a cat?', p: '看！它是一只猫吗？', m: 'Is it 连读，句尾上扬' },
      { role: 'B', t: 'No, it is not. It is a dog.', p: '不，不是。它是一只狗。', m: 'No 读得干脆' },
      { role: 'A', t: 'Is it a ship?', p: '它是一艘船吗？', m: 'ship 别读成 sheep' },
      { role: 'B', t: 'Yes, it is! I have a ship, too.', p: '是的！我也有一艘船。', m: 'Yes 后面稍停' },
      { role: 'A', t: 'Do you have a pencil?', p: '你有铅笔吗？', m: 'Do you 弱读' },
      { role: 'B', t: 'Yes, I do. Put it on the desk.', p: '有。把它放在桌上吧。', m: 'Put it on 连读' }
    ] }]
  });

  add('3|english|下|0', {
    kind: 'dialogue', source: '原创示范对话 · 非教材原文', title: 'Unit 1 Get Up · 作息', note: '练祈使句与时间表达，读指令时语气干脆。',
    sections: [{ title: 'Morning at home 家里的早晨', author: '', lines: [
      { role: 'Mum', t: 'Get up, Ben! It is seven o\'clock.', p: '起床啦，本！七点了。', m: 'Get up 稍响亮' },
      { role: 'Ben', t: 'OK, Mum. What a busy day!', p: '好的，妈妈。今天真忙啊！', m: 'What a 读出感叹' },
      { role: 'Mum', t: 'Wash your face and brush your teeth.', p: '洗脸，刷牙。', m: 'and 轻读带过' },
      { role: 'Ben', t: 'I am on duty today.', p: '今天我值日。', m: 'duty 重音在前' },
      { role: 'Mum', t: 'Then come and join us for breakfast.', p: '那就来和我们一起吃早餐吧。', m: 'join us 连读' },
      { role: 'Ben', t: 'I am coming! Let us plan my day.', p: '我来啦！我们来安排我的一天吧。', m: 'plan 读清楚' }
    ] }]
  });

  add('3|english|下|6', {
    kind: 'dialogue', source: '原创示范对话 · 非教材原文', title: 'Unit 7 School Rules · 规则', note: '练 We must / Please / Don\'t 的礼貌表达。',
    sections: [{ title: 'In the classroom 在教室', author: '', lines: [
      { role: 'A', t: 'Please keep our classroom clean.', p: '请保持教室干净。', m: 'Please 语气柔和' },
      { role: 'B', t: 'OK. We must follow the school rules.', p: '好的。我们必须遵守校规。', m: 'must 稍重' },
      { role: 'A', t: 'That is a polite way to ask.', p: '这样问很有礼貌。', m: 'polite 重音在后' },
      { role: 'B', t: 'Excuse me, may I come in?', p: '打扰一下，我可以进来吗？', m: '句尾上扬' },
      { role: 'A', t: 'Yes, please. Do not run in class.', p: '可以，请进。上课不要跑。', m: 'Do not 读得明确' },
      { role: 'B', t: 'Thank you for telling me.', p: '谢谢你告诉我。', m: 'for 弱读' }
    ] }]
  });

  add('4|english|上|0', {
    kind: 'dialogue', source: '原创示范对话 · 非教材原文', title: 'Unit 1 Come on In! · 待客', note: '练邀请、应答与礼貌用语，注意 Come on in 的连读。',
    sections: [{ title: 'A visitor at the door 客人来了', author: '', lines: [
      { role: 'A', t: 'Hello! Come on in, please.', p: '你好！请进。', m: 'Come on in 连成一串' },
      { role: 'B', t: 'Thank you. What a lovely room!', p: '谢谢。房间真漂亮！', m: 'What a 读出赞叹' },
      { role: 'A', t: 'Help yourself to some fruit.', p: '请随便吃点水果。', m: 'Help yourself 连读' },
      { role: 'B', t: 'Thanks a lot. May I have some tea?', p: '多谢。我可以喝点茶吗？', m: 'May I 语气客气' },
      { role: 'A', t: 'Sure. I am the chef today!', p: '当然。今天我掌勺！', m: 'chef 读 /ʃef/' },
      { role: 'B', t: 'Great! Let me help out in the kitchen.', p: '太好了！我来厨房帮忙吧。', m: 'help out 连读' }
    ] }]
  });

  add('4|english|上|5', {
    kind: 'dialogue', source: '原创示范对话 · 非教材原文', title: 'Unit 6 I Love My Family', note: '练介绍家人职业与 She helps me a lot 的表达。',
    sections: [{ title: 'Talking about family 聊聊家人', author: '', lines: [
      { role: 'A', t: 'Who is that lady in the photo?', p: '照片里那位女士是谁？', m: 'lady 重音在前' },
      { role: 'B', t: 'She is my aunt. She is a cook.', p: '她是我姑姑，她是个厨师。', m: 'cook 别读成 cooker' },
      { role: 'A', t: 'She looks very kind.', p: '她看起来很和善。', m: 'looks 结尾 s 轻' },
      { role: 'B', t: 'Yes. She helps me a lot.', p: '是的，她帮了我很多。', m: 'a lot 连读' },
      { role: 'A', t: 'What does your father do?', p: '你爸爸是做什么的？', m: 'does 弱读' },
      { role: 'B', t: 'He is a doctor. We have family time on Sunday.', p: '他是医生。我们周日有家庭时光。', m: 'Sunday 重音在前' }
    ] }]
  });

  add('4|english|下|0', {
    kind: 'dialogue', source: '原创示范对话 · 非教材原文', title: 'Unit 1 He looks like a cook.', note: '练外貌描述与职业推测，注意 looks like 的连读。',
    sections: [{ title: 'Guessing people 猜猜是谁', author: '', lines: [
      { role: 'A', t: 'Look at that man. He looks like a cook.', p: '看那位男士，他看起来像个厨师。', m: 'looks like 连读' },
      { role: 'B', t: 'Yes, he is in a white hat.', p: '是啊，他戴着白帽子。', m: 'white 读清楚' },
      { role: 'A', t: 'And that lady? She is very kind.', p: '那位女士呢？她很和善。', m: 'kind 稍拖长' },
      { role: 'B', t: 'She is our new teacher.', p: '她是我们的新老师。', m: 'new 别读成 knew 的音' },
      { role: 'A', t: 'When do you have class?', p: '你什么时候上课？', m: 'When 句尾降调' },
      { role: 'B', t: 'At eight thirty. It is time to get up!', p: '八点半。该起床啦！', m: 'It is time to 连读' }
    ] }]
  });

  add('4|english|下|2', {
    kind: 'dialogue', source: '原创示范对话 · 非教材原文', title: 'Unit 3 It is time to get up.', note: '练时间表达与 It is time to... 句型。',
    sections: [{ title: 'A busy morning 忙碌的早晨', author: '', lines: [
      { role: 'Mum', t: 'It is time to get up. It is seven.', p: '该起床了，七点了。', m: 'It is time to 一气读完' },
      { role: 'Ben', t: 'Just five more minutes, please.', p: '再睡五分钟嘛。', m: '语气带点撒娇' },
      { role: 'Mum', t: 'When do you have class today?', p: '你今天几点上课？', m: 'When 读清楚' },
      { role: 'Ben', t: 'At eight thirty. Oh, I must hurry!', p: '八点半。哎呀，我得快点！', m: 'hurry 读得急促' },
      { role: 'Mum', t: 'Breakfast is ready. Wash your hands.', p: '早餐好了，去洗手。', m: 'ready 重音在前' },
      { role: 'Ben', t: 'OK, Mum. Have a nice day!', p: '好的，妈妈。祝你今天愉快！', m: '结尾上扬，带笑容' }
    ] }]
  });

})();
