/* ============================================================
 * data-english.js —— 英语单元学习内容（教科版·广州版，三年级起点）
 * ------------------------------------------------------------
 * 一年级、二年级为「口语启蒙」拓展内容（广州小学英语国家课程自
 * 三年级起开设），已在标题中标注，非课本同步，供有兴趣的学生使用。
 *
 * 数据格式与 data-core.js 一致：
 *   words: 单词|音标|中文；lines: 句子|中文|跟读要点
 * 英语单词/句子由语音引擎使用 en-US 音色朗读。
 * 句型与对话为配套教学设计示范句，非教材原文。
 * ============================================================ */
(function () {
  'use strict';
  var add = window.addUnit;

  /* ==================== 一年级 · 英语（口语启蒙·拓展） ==================== */
  add('1|english|上', 0, {
    title: '启蒙1 Hello! 打招呼（口语启蒙·拓展）',
    goals: '听懂并会说 Hello、Hi、Goodbye|能用 I am... 说出自己的名字|愿意开口与同伴用英语打招呼',
    words: 'hello|/həˈləʊ/|你好;hi|/haɪ/|嗨、你好;I|/aɪ/|我;am|/æm/|是;goodbye|/ˌɡʊdˈbaɪ/|再见;bye|/baɪ/|拜拜;morning|/ˈmɔːnɪŋ/|早晨;friend|/frend/|朋友',
    ask: '见到老师，第一句可以说什么？|放学和同学分开时说什么？',
    steps: '听 3 分钟：点小喇叭，每个词听 2 遍|跟读 4 分钟：听一遍，模仿一遍|换名字 3 分钟：把 I am... 换成自己的名字|演一演 3 分钟：和家长演上学打招呼',
    points: 'Hello 和 Hi 都表示「你好」，Hi 更随意|I am = I\u2019m，后面接名字|Good morning 用于上午，Goodbye 用于分别|英语打招呼常配合挥手、微笑|发音提醒：hello 重音在第二个音节',
    quiz: '「你好」的英文是？|Hello,Bye,Thanks,Sorry|0|Hello 用于打招呼。;早上见到同学说？|Good night,Good morning,Goodbye,Thank you|1|上午用 Good morning。;I am Lily. 的意思是？|我叫莉莉,她是莉莉,莉莉再见,莉莉你好|0|I am + 名字，表示自我介绍。;放学道别时说？|Hello,Hi,Goodbye,Please|2|Goodbye 或 Bye。',
    lines: 'Hello!|你好！|声音上扬，带笑容;Hi, I am Lily.|嗨，我是莉莉。|I am 连读轻一点;Good morning!|早上好！|morning 重音在前;What is your name?|你叫什么名字？|句尾稍降;Goodbye!|再见！|挥手，读得轻快',
    hw: '基础：听读 8 个词各 3 遍|提升：用 I am... 向家人介绍自己|拓展：对着镜子演一遍打招呼的小对话',
    tip: '先听清楚再开口，模仿语调比读对每个字母更重要。'
  });

  add('1|english|上', 1, {
    title: '启蒙2 Colours 颜色（口语启蒙·拓展）',
    goals: '听懂并会说 6 种常见颜色|能用 I like... 表达喜好|能听音指认颜色',
    words: 'red|/red/|红色;yellow|/ˈjeləʊ/|黄色;blue|/bluː/|蓝色;green|/ɡriːn/|绿色;black|/blæk/|黑色;white|/waɪt/|白色;orange|/ˈɒrɪndʒ/|橙色;colour|/ˈkʌlə/|颜色',
    ask: '你今天穿的衣服是什么颜色？|广州的市花木棉花是什么颜色？',
    steps: '听读 4 分钟：点每个颜色词的小喇叭|指一指 3 分钟：听读音，在家里找同色物品|说一说 3 分钟：用 I like red 说三句|小游戏 3 分钟：家长说颜色，孩子快速指',
    points: 'colour 是「颜色」的总称|I like + 颜色，表示「我喜欢……」|问颜色用 What colour is it?|yellow 重音在前，读 /ˈjeləʊ/|orange 既是颜色，也是水果「橙子」',
    quiz: '「蓝色」是？|red,blue,green,black|1|蓝色是 blue。;I like red. 的意思是？|我喜欢红色,我讨厌红色,这是红色,红色在哪里|0|I like 表示喜欢。;问某物颜色用？|What is it?,What colour is it?,How are you?,Who is she?|1|用 What colour 提问颜色。;orange 还可以表示？|动物,水果橙子,数字,文具|1|orange 也指橙子。',
    lines: 'What colour is it?|它是什么颜色？|colour 读清楚;It is red.|它是红色。|is it 连读;I like blue.|我喜欢蓝色。|like 稍重;Look! A green leaf.|看！一片绿叶子。|读出发现的语气;Red, yellow, blue and green.|红、黄、蓝和绿。|像报数一样读',
    hw: '基础：听读 8 个颜色词并指出实物|提升：用 I like... 说 3 句|拓展：画一道彩虹，边画边说颜色',
    tip: '把颜色词和真实物品连起来记，比反复背单词有效。'
  });

  add('1|english|下', 0, {
    title: '启蒙4 My Family 家人（口语启蒙·拓展）',
    goals: '会说 6 个家庭成员称呼|能用 This is my... 介绍家人|能听懂 Who is this?',
    words: 'father|/ˈfɑːðə/|爸爸;mother|/ˈmʌðə/|妈妈;grandpa|/ˈɡrænpɑː/|爷爷、外公;grandma|/ˈɡrænmɑː/|奶奶、外婆;sister|/ˈsɪstə/|姐姐、妹妹;brother|/ˈbrʌðə/|哥哥、弟弟;family|/ˈfæməli/|家庭;love|/lʌv/|爱',
    ask: '你家有几口人？|介绍家人时，英文先说哪几个词？',
    steps: '听读 4 分钟|看照片 3 分钟：指着全家福说称呼|介绍 4 分钟：用 This is my... 说 3 句|问答 3 分钟：家长问 Who is this? 孩子答',
    points: 'father / mother 较正式，日常也说 dad / mum|sister 不分姐妹，brother 不分兄弟|This is my + 称呼，用来介绍身边的人|Who is this? 问「这是谁」|I love my family. 表达情感',
    quiz: '「妈妈」的英文是？|father,mother,grandpa,brother|1|mother 是妈妈。;This is my father. 的意思是？|这是我爸爸,那是妈妈,他是谁,我喜欢爸爸|0|This is 用于介绍。;问「这是谁」用？|What is this?,Who is this?,Where is it?,How old?|1|问人用 Who。;sister 指？|姐姐或妹妹,只有姐姐,只有妹妹,兄弟|0|英语不分长幼。',
    lines: 'This is my family.|这是我的家。|语气温和;This is my father.|这是我爸爸。|This is 连读;Who is this?|这是谁？|句尾上扬;She is my grandma.|她是我奶奶。|She 读清楚;I love my family.|我爱我的家。|love 稍重',
    hw: '基础：听读 8 个词并配全家福指认|提升：用 This is my... 介绍 3 位家人|拓展：画一张家庭树，标上英文称呼',
    tip: '介绍家人时语气放软一点，This is 可以连读成「thisiz」。'
  });

  /* ==================== 二年级 · 英语（口语启蒙·拓展） ==================== */
  add('2|english|上', 0, {
    title: '启蒙7 My Body 身体（口语启蒙·拓展）',
    goals: '会说 8 个身体部位词|能听指令 Touch your... 做出动作|能用 I have... 说一句话',
    words: 'head|/hed/|头;hand|/hænd/|手;eye|/aɪ/|眼睛;ear|/ɪə/|耳朵;nose|/nəʊz/|鼻子;mouth|/maʊθ/|嘴;arm|/ɑːm/|手臂;leg|/leɡ/|腿;touch|/tʌtʃ/|摸、碰',
    ask: 'Touch your head，应该摸哪里？|eye 和 ear 读音有什么不同？',
    steps: '听读 4 分钟|做动作 4 分钟：听单词指身体部位|听指令 3 分钟：家长说 Touch your...|说一说 3 分钟：用 I have two... 造句',
    points: 'Touch your + 部位，是课堂常用指令|eye /aɪ/ 与 I 同音；ear /ɪə/ 别读成 air|成对部位常用复数：eyes、ears、hands、arms|mouth 的 th 咬舌，/maʊθ/|head 与 hand 只差一个字母，注意区分',
    quiz: '「鼻子」是？|nose,mouth,ear,eye|0|nose 是鼻子。;Touch your head. 意思是？|摸摸你的头,摸摸你的手,举起手,转个圈|0|head 是头。;eye 的发音和哪个词相同？|I,ear,arm,egg|0|eye 与 I 都读 /aɪ/。;「两只手」说？|two hand,two hands,hand two,a hand|1|成对部位用复数 hands。',
    lines: 'Touch your head.|摸摸你的头。|像做游戏一样读;Touch your nose.|摸摸你的鼻子。|指令要清楚;These are my eyes.|这是我的双眼。|eyes 是复数;I have two hands.|我有两只手。|two 稍重;Wash your hands.|洗洗手。|日常用语，读得自然',
    hw: '基础：听读 9 个词并做动作|提升：给家人发 3 条 Touch your... 指令|拓展：画一个小人，标上 6 个部位的英文',
    tip: '边说边做动作，身体记忆会让单词记得更牢。'
  });

  add('2|english|下', 0, {
    title: '启蒙10 My Day 一天（口语启蒙·拓展）',
    goals: '会说 4 个时间段与 4 个日常动作|能用 I... in the morning. 说一句|建立时间顺序的表达意识',
    words: 'morning|/ˈmɔːnɪŋ/|早上;afternoon|/ˌɑːftəˈnuːn/|下午;evening|/ˈiːvnɪŋ/|傍晚;night|/naɪt/|夜晚;get up|/ɡet ʌp/|起床;go to school|/ɡəʊ tə skuːl/|去上学;have lunch|/hæv lʌntʃ/|吃午饭;go to bed|/ɡəʊ tə bed/|上床睡觉',
    ask: '你早上起床后第一件事做什么？|Good evening 和 Good night 用法一样吗？',
    steps: '听读 4 分钟|排顺序 3 分钟：把 4 个动作按一天先后排好|说一说 4 分钟：用 I get up in the morning.|问答 3 分钟：家长问 What do you do in the morning?',
    points: 'in the morning / afternoon / evening 表示时间段|Good night 是睡前道别，不是打招呼|at night 用 at，不用 in|afternoon 重音在最后 |get up 是「起床」，不是「起来拿」',
    quiz: '「下午」是？|morning,afternoon,evening,night|1|afternoon 是下午。;睡前道别说？|Good morning,Good afternoon,Good night,Good evening|2|睡前用 Good night。;「起床」是？|go to bed,get up,have lunch,go to school|1|get up 是起床。;in the evening 指？|早上,中午,傍晚,深夜|2|evening 是傍晚。',
    lines: 'I get up in the morning.|我早上起床。|in the 连读轻一点;I go to school at seven.|我七点去上学。|时间点前用 at;We have lunch at school.|我们在学校吃午饭。|have lunch 连读;Good evening!|晚上好！|见面时用;Good night!|晚安！|睡前用，语气轻',
    hw: '基础：听读 8 个词并做时间排序|提升：用 in the... 说 3 句自己的一天|拓展：画一张「我的一天」四格图并配英文',
    tip: '把 4 个动作连起来说一遍，就是一段完整的小口语。'
  });

  /* ==================== 三年级 · 英语（上册） ==================== */
  add('3|english|上', 0, {
    title: 'Module 1 Unit 1 Hello!',
    goals: '能听懂并说出 Hello / Hi / Good morning 等问候语|能用 I am... / My name is... 自我介绍|能听懂课堂用语 Stand up / Sit down',
    words: 'hello|/həˈləʊ/|你好;hi|/haɪ/|嗨;good|/ɡʊd/|好的;morning|/ˈmɔːnɪŋ/|早晨;afternoon|/ˌɑːftəˈnuːn/|下午;name|/neɪm/|名字;I|/aɪ/|我;am|/æm/|是;nice|/naɪs/|令人愉快的;meet|/miːt/|遇见;you|/juː/|你;too|/tuː/|也',
    ask: '第一次见同学，可以怎么介绍自己？|Nice to meet you. 一般在什么场合说？',
    steps: '听单词 4 分钟：逐个点小喇叭，听音标并跟读|听句型 4 分钟：连读 5 个核心句|角色扮演 4 分钟：与家长互问姓名|听写小测 3 分钟：播放读音，选出听到的单词',
    points: 'I am = I\u2019m；My name is = My name\u2019s|Nice to meet you. 用于初次见面，答语常加 too|Good morning 用于上午，Good afternoon 用于下午|Hello / Hi 后常接逗号再加名字|人名首字母要大写：Lily、Ben、Jiamin',
    quiz: '「Nice to meet you.」的合适答语是？|Goodbye,Nice to meet you too,Thank you,Sit down|1|初次见面常用 Nice to meet you, too. 回应。;My name ____ Ben.|am,is,are,be|1|My name 是第三人称单数，用 is。;下午见到老师说？|Good morning,Good afternoon,Good night,Goodbye|1|下午用 Good afternoon。;「名字」的英文是？|name,game,time,same|0|name 是名字。',
    lines: 'Hello! I am Jiamin.|你好！我是嘉民。|I am 可连读成 I\u2019m;Hi! My name is Ben.|嗨！我叫本。|My name is 语速稍快;Good morning, Miss White.|早上好，怀特老师。|morning 重音在前;Nice to meet you.|很高兴认识你。|nice 和 meet 稍重;Nice to meet you too.|我也很高兴认识你。|too 读得清楚',
    hw: '基础：听读 12 个词，抄写 Hello / name / morning|提升：写 3 句自我介绍并读出来|拓展：录一段 20 秒的英文自我介绍，回听一遍',
    tip: '点小喇叭听单词，再看音标核对；先听后读，不要一上来就看拼写。'
  });

  add('3|english|上', 2, {
    title: 'Module 1 Unit 3 What is your name?',
    goals: '掌握问句 What is your name? 及答语|能正确使用 my / your|能听懂并回应 How are you?',
    words: 'what|/wɒt/|什么;your|/jɔː/|你的;my|/maɪ/|我的;is|/ɪz/|是;how|/haʊ/|怎样;are|/ɑː/|是;fine|/faɪn/|很好;thank|/θæŋk/|谢谢;please|/pliːz/|请;welcome|/ˈwelkəm/|欢迎;sorry|/ˈsɒri/|对不起;friend|/frend/|朋友',
    ask: '问别人名字，英文怎么说？|my 和 your 分别指谁？',
    steps: '听单词 4 分钟|问答链 5 分钟：What is your name? → My name is...|辨音 3 分钟：对比 my / your 的读音|对话 3 分钟：完整演一遍问候对话',
    points: 'What is = What\u2019s；How are you? 常答 I am fine, thank you.|my 指「我的」，your 指「你的」，方向不要反|特殊疑问句用 what / how 开头，句尾降调|please 放句首或句末都表示客气|Thank you 的答语可用 You are welcome.',
    quiz: '问对方名字的正确句子是？|What is my name?,What is your name?,Your name is what?,Who name?|1|问「你的」名字用 your。;I am fine, ____ you.|thank,thanks,thanking,to thank|0|固定表达 thank you。;How are you? 的合适答语是？|My name is Ben,I am fine, thank you,Good night,Yes it is|1|回答身体状况或近况。;「我的」是？|your,my,his,our|1|my 表示我的。',
    lines: 'What is your name?|你叫什么名字？|句尾降调;My name is Janet.|我叫珍妮特。|My 读清楚;How are you?|你好吗？|语气亲切;I am fine, thank you.|我很好，谢谢。|thank 咬舌;You are welcome.|不客气。|welcome 重音在前',
    hw: '基础：听读 12 个词，抄写 what / your / my|提升：写出 3 组问答并朗读|拓展：用英语问 3 位家人的「名字」并记下来',
    tip: '问句尾降、答句尾稳；把 my / your 用手势指向自己或对方，不容易混。'
  });

  add('3|english|上', 8, {
    title: 'Module 1 Unit 9 Is it a cat?',
    goals: '掌握一般疑问句 Is it a...? 及肯定否定回答|会说常见动物名称|能使用 a / an 的基本区分',
    words: 'cat|/kæt/|猫;dog|/dɒɡ/|狗;rabbit|/ˈræbɪt/|兔子;bird|/bɜːd/|鸟;fish|/fɪʃ/|鱼;duck|/dʌk/|鸭子;it|/ɪt/|它;yes|/jes/|是的;no|/nəʊ/|不是;not|/nɒt/|不;an|/ən/|一个（元音前）;a|/ə/|一个',
    ask: 'Is it a cat? 该怎么回答？|为什么是 an apple 而不是 a apple？',
    steps: '听单词 4 分钟：注意 cat /kæt/ 的短音|看图问答 5 分钟：Is it a...? Yes, it is.|辨音 3 分钟：a 与 an|小游戏 3 分钟：一人描述一人猜动物',
    points: 'Is it a...? 是一般疑问句，用 Yes / No 回答|肯定：Yes, it is. 否定：No, it isn\u2019t.（= is not）|元音音素前用 an：an apple、an egg|辅音音素前用 a：a cat、a dog|一般疑问句句尾语调上扬',
    quiz: 'Is it a cat? 的否定回答是？|Yes it is,No it is not,No I am not,Yes it is not|1|完整说 No, it is not. 或 No, it isn\u2019t.。;____ apple|A,An,The,Two|1|apple 以元音音素开头，用 an。;「兔子」是？|rabbit,duck,bird,fish|0|rabbit 是兔子。;Is it a dog? 句尾语调应？|下降,上扬,持平,越读越低|1|一般疑问句通常上扬。',
    lines: 'Is it a cat?|它是一只猫吗？|句尾上扬;Yes, it is.|是的，它是。|回答干脆;No, it is not.|不，它不是。|not 读清楚;Look! It is a rabbit.|看！它是只兔子。|带一点惊喜;I have a dog.|我有一只狗。|have 轻读',
    hw: '基础：听读 12 个词，抄写 cat / dog / rabbit|提升：写 4 组 Is it...? 问答|拓展：用 3 句话描述一种你喜欢的动物',
    tip: '问句上扬、答句下降，一问一答读两遍，语感自然就有了。'
  });

  /* ==================== 三年级 · 英语（下册） ==================== */
  add('3|english|下', 0, {
    title: 'Unit 1 Get Up（作息与祈使句）',
    goals: '会说起床、洗漱、上学等动作短语|能听懂并执行祈使句|能用 It is time to... 表达该做某事',
    words: 'get up|/ɡet ʌp/|起床;wash|/wɒʃ/|洗;face|/feɪs/|脸;brush|/brʌʃ/|刷;teeth|/tiːθ/|牙齿;breakfast|/ˈbrekfəst/|早餐;time|/taɪm/|时间;school|/skuːl/|学校;hurry|/ˈhʌri/|赶快;ready|/ˈredi/|准备好的;clock|/klɒk/|钟;late|/leɪt/|迟的',
    ask: '早上妈妈叫你起床，英文可以怎么说？|It is time to... 后面接什么？',
    steps: '听单词 4 分钟|做动作 4 分钟：听短语做相应动作|说时间 4 分钟：用 It is time to... 说 3 句|连读 3 分钟：把 5 个句子连起来读',
    points: '祈使句省略主语 you，直接以动词原形开头：Get up!|It is time to + 动词原形；It is time for + 名词|brush teeth 中 teeth 是 tooth 的复数|Wash your face. 中 your 可换成 my / his|Hurry up! 是常用催促语',
    quiz: '「起床」是？|get on,get up,get off,go up|1|get up 是起床。;It is time ____ go to school.|for,to,at,in|1|to 后接动词原形。;Wash ____ face.|I,my,me,mine|1|用形容词性物主代词 my。;「刷牙」说？|brush teeth,wash teeth,brush tooth,clean teeth|0|固定搭配 brush teeth。',
    lines: 'Get up! It is morning.|起床啦！早上了。|指令读得响亮;Wash your face.|洗洗脸。|your 轻读;Brush your teeth.|刷刷牙。|teeth 咬舌;It is time to go to school.|该去上学了。|time to 连读;Hurry up! We are late.|快点！我们要迟到了。|语速加快',
    hw: '基础：听读 12 个词，抄写 get up / time / school|提升：用 It is time to... 写 3 句|拓展：把早上的 4 件事连成一段英文小口播',
    tip: '祈使句要有「叫人做事」的语气，读得干脆一点，别拖长音。'
  });

  add('3|english|下', 6, {
    title: 'Unit 7 School Rules（规则与礼貌表达）',
    goals: '会说常见课堂规则英语|能用 Please... / Do not... 表达请求与禁止|理解礼貌用语在校园中的使用',
    words: 'rule|/ruːl/|规则;listen|/ˈlɪsn/|听;quiet|/ˈkwaɪət/|安静的;raise|/reɪz/|举起;hand|/hænd/|手;line up|/laɪn ʌp/|排队;polite|/pəˈlaɪt/|有礼貌的;keep|/kiːp/|保持;clean|/kliːn/|干净的;please|/pliːz/|请;do not|/duː nɒt/|不要;late|/leɪt/|迟到的',
    ask: '上课想发言，英文怎么做？|Do not run. 是什么语气？',
    steps: '听单词 4 分钟|配一配 3 分钟：把规则句和场景配对|读规则 5 分钟：Please... / Do not... 各 3 句|演一演 3 分钟：扮演小老师发指令',
    points: '祈使句肯定式：动词原形开头，加 please 更礼貌|否定式：Do not + 动词原形（= Don\u2019t）|listen 的 t 不发音，读 /ˈlɪsn/|Please 可放句首或句末，句末时前面加逗号|Be quiet. 中的 be 不能省略',
    quiz: '「请举手」说？|Please raise your hand.,Do not raise your hand.,Raise not your hand.,Please hands up not|0|Please + 动词原形。;Do not run. 的意思是？|请跑,不要跑,跑得快,在跑步|1|Do not 表示禁止。;listen 中的 t？|要读出来,不发音,读成 d,重读|1|listen 的 t 不发音。;「安静」是？|quiet,quite,quick,queen|0|quiet 是安静，注意与 quite 区分。',
    lines: 'Please listen to the teacher.|请听老师讲。|please 语气柔和;Please raise your hand.|请举手。|raise 读清楚;Be quiet, please.|请安静。|Be 不能漏;Do not run in the classroom.|不要在教室里跑。|Do not 稍重;Line up, please.|请排队。|指令清楚',
    hw: '基础：听读 12 个词，抄写 rule / listen / please|提升：写 3 条班级规则（英文）|拓展：设计一张英文规则小海报，配 4 句话',
    tip: '同一句话加 please 与不加，语气差别很大，两种都读一遍体会一下。'
  });

  /* ==================== 四年级 · 英语（上册） ==================== */
  add('4|english|上', 0, {
    title: 'Unit 1 Come on In!（待客与礼貌用语）',
    goals: '掌握 Come in / Welcome / Please 等待客表达|能用 Would you like...? 礼貌询问|能得体回应邀请与感谢',
    words: 'come in|/kʌm ɪn/|进来;welcome|/ˈwelkəm/|欢迎;please|/pliːz/|请;seat|/siːt/|座位;sit down|/sɪt daʊn/|坐下;would|/wʊd/|愿意（委婉语气）;like|/laɪk/|想要;water|/ˈwɔːtə/|水;tea|/tiː/|茶;thanks|/θæŋks/|谢谢;home|/həʊm/|家;guest|/ɡest/|客人',
    ask: '同学来家里做客，第一句说什么？|Would you like some water? 该怎么回答？',
    steps: '听单词 4 分钟|听句型 4 分钟：连读 5 句待客用语|角色扮演 5 分钟：主人与客人完整对话|礼貌对比 2 分钟：比较 Give me water. 与 Would you like some water?',
    points: 'Come on in! 比 Come in. 更热情随意|Would you like...? 是委婉询问，答语 Yes, please. / No, thanks.|Welcome to my home. 中 to 后接地点|Thanks 与 Thank you 意思相同，前者更口语|some 在表示邀请、请求的疑问句中不用改 any',
    quiz: '客人进门时说？|Go out,Come on in!,Sit down please,Good night|1|Come on in! 是热情的邀请。;Would you like some tea? 的婉拒是？|Yes please,No thanks,No I do not,Yes I would not|1|婉拒用 No, thanks.。;Welcome ____ my home.|in,at,to,on|2|固定搭配 welcome to + 地点。;「请坐」是？|Stand up,Sit down please,Come in,Line up|1|Sit down, please.。',
    lines: 'Come on in!|快请进！|语气热情;Welcome to my home.|欢迎来我家。|welcome 重音在前;Please sit down.|请坐。|please 放句首;Would you like some water?|要喝点水吗？|句尾上扬;Yes, please. / No, thanks.|好的，谢谢。／不用了，谢谢。|两种答语都练一遍',
    hw: '基础：听读 12 个词，抄写 welcome / would / please|提升：写一段 4 句的待客小对话|拓展：与家人用英语演一次「客人来访」',
    tip: 'Would you like...? 的 would 要轻读，句尾上扬才显得礼貌。'
  });

  add('4|english|上', 5, {
    title: 'Unit 6 I Love My Family（家人与职业）',
    goals: '会说家庭成员与常见职业词|能用 He / She is a... 介绍家人|能用 I love... 表达情感',
    words: 'family|/ˈfæməli/|家庭;father|/ˈfɑːðə/|爸爸;mother|/ˈmʌðə/|妈妈;grandparent|/ˈɡrænpeərənt/|祖父母;sister|/ˈsɪstə/|姐妹;brother|/ˈbrʌðə/|兄弟;doctor|/ˈdɒktə/|医生;teacher|/ˈtiːtʃə/|教师;cook|/kʊk/|厨师;driver|/ˈdraɪvə/|司机;kind|/kaɪnd/|和蔼的;love|/lʌv/|爱',
    ask: '介绍妈妈的工作，英文怎么说？|He 和 She 分别指谁？',
    steps: '听单词 5 分钟：注意 doctor / teacher 的 -or / -er|家庭树 3 分钟：标出英文称呼|介绍 5 分钟：用 He / She is a... 说 4 句|连读 2 分钟：把 5 个句子连成一小段',
    points: 'He 指男性，She 指女性，不要混用|职业前要加 a：She is a teacher.|cook 既可作动词「做饭」，也可作名词「厨师」|-er / -or 常表示「做某事的人」：teach→teacher|I love my family. 中的 love 是动词',
    quiz: '介绍妈妈是医生，应说？|He is a doctor.,She is a doctor.,She is doctor.,He is doctor.|1|女性用 She，职业前加 a。;「厨师」是？|cooker,cook,cooking,kitchen|1|cook 作名词是厨师；cooker 是炊具。;teacher 这个词的后缀表示？|地点,做某事的人,过去,否定|1|-er 常表示从事该职业的人。;「和蔼的」是？|kind,kite,king,keep|0|kind 是和蔼的、友善的。',
    lines: 'This is my family.|这是我的家。|语气温暖;He is my father. He is a driver.|他是我爸爸，他是司机。|He 读清楚;She is my mother. She is a teacher.|她是我妈妈，她是老师。|a 不要漏;My grandma is very kind.|我奶奶很和蔼。|very 稍重;I love my family.|我爱我的家。|收尾放慢',
    hw: '基础：听读 12 个词，抄写 family / doctor / teacher|提升：用 He / She is a... 写 4 句|拓展：写 5 句英文介绍自己的家庭并朗读录音',
    tip: '职业前的 a 很小但很重要，读句子时刻意把它读清楚。'
  });

  /* ==================== 四年级 · 英语（下册） ==================== */
  add('4|english|下', 0, {
    title: 'Module 1 Unit 1 He looks like a cook.（外貌与职业推测）',
    goals: '掌握 look like 表示「看起来像」|能描述人物外貌与职业|区分 look like 与 is',
    words: 'look|/lʊk/|看、看起来;like|/laɪk/|像、喜欢;cook|/kʊk/|厨师;tall|/tɔːl/|高的;short|/ʃɔːt/|矮的、短的;strong|/strɒŋ/|强壮的;young|/jʌŋ/|年轻的;glasses|/ˈɡlɑːsɪz/|眼镜;hat|/hæt/|帽子;uniform|/ˈjuːnɪfɔːm/|制服;man|/mæn/|男人;woman|/ˈwʊmən/|女人',
    ask: 'He looks like a cook. 和 He is a cook. 意思一样吗？|描述一个人，可以从哪几方面说？',
    steps: '听单词 5 分钟|看图说话 5 分钟：用 He / She looks like... 描述|对比 3 分钟：look like 与 is 的区别|连读 2 分钟：把 5 句连成一段',
    points: 'look like 表示「看起来像」，是推测，不等于事实|He is a cook. 是确定的职业；He looks like a cook. 只是猜测|第三人称单数动词加 s：look → looks|glasses（眼镜）常用复数|描述顺序：整体（tall/short）→ 局部（hat/glasses）→ 推测',
    quiz: 'He ____ like a cook.|look,looks,looking,looked|1|第三人称单数用 looks。;He looks like a cook. 表示？|他一定是厨师,他看起来像厨师,他是厨师的爸爸,他不喜欢厨师|1|look like 只是外观上的推测。;「眼镜」是？|glass,glasses,glaze,class|1|眼镜通常用复数 glasses。;描述「高的」用？|short,tall,strong,young|1|tall 是高的。',
    lines: 'Look at that man.|看那位男士。|Look at 连读;He looks like a cook.|他看起来像位厨师。|looks 的 s 别吞掉;He is tall and strong.|他又高又壮。|and 轻读;She has glasses and a hat.|她戴眼镜、戴帽子。|has 读清楚;Maybe she is a teacher.|也许她是位老师。|Maybe 表推测',
    hw: '基础：听读 12 个词，抄写 look like / tall / glasses|提升：用 look like 写 3 句人物描述|拓展：描述一位家人，让对方猜是谁',
    tip: 'looks 结尾的 /s/ 要读出来，这是三年级到四年级最容易漏的音。'
  });

  add('4|english|下', 2, {
    title: 'Module 2 Unit 3 It is time to get up.（时间与日常作息）',
    goals: '会表达整点时间 o\u2019clock|能熟练使用 It is time to / It is time for|能说清一天的作息安排',
    words: 'o clock|/əˈklɒk/|…点钟;time|/taɪm/|时间;get up|/ɡet ʌp/|起床;class|/klɑːs/|课;have class|/hæv klɑːs/|上课;lunch|/lʌntʃ/|午餐;dinner|/ˈdɪnə/|晚餐;homework|/ˈhəʊmwɜːk/|家庭作业;bed|/bed/|床;when|/wen/|什么时候;usually|/ˈjuːʒuəli/|通常;early|/ˈɜːli/|早的',
    ask: '七点整用英文怎么说？|It is time to... 和 It is time for... 后面接的词有什么不同？',
    steps: '听单词 5 分钟|看钟面 4 分钟：说出 4 个整点时间|句型对比 4 分钟：to + 动词 / for + 名词|说一天 3 分钟：连说 4 句作息',
    points: '整点表达：It is seven o\u2019clock.（= 7:00）|It is time to + 动词原形：to get up|It is time for + 名词：for class / for lunch|When do you...? 用来问时间|usually 表示通常，常与一般现在时连用',
    quiz: 'It is time ____ lunch.|to,for,at,in|1|lunch 是名词，用 for。;七点整说？|It is seven o clock.,It is seven clock.,It is seven time.,It is o clock seven.|0|整点用「数字 + o\u2019clock」。;When do you get up? 在问？|地点,时间,人物,原因|1|when 问时间。;It is time to ____.|class,go to school,lunch,dinner|1|to 后接动词原形。',
    lines: 'What time is it?|现在几点？|time 读清楚;It is seven o clock.|七点整。|o clock 连读;It is time to get up.|该起床了。|to 轻读;It is time for class.|该上课了。|for 后接名词;When do you have lunch?|你什么时候吃午饭？|句尾上扬',
    hw: '基础：听读 12 个词，抄写 time / o clock / when|提升：写出自己一天的 4 个时间点（英文）|拓展：用 5 句英文介绍「我的一天」并录音回听',
    tip: 'to 后跟动作、for 后跟名词——说之前先判断后面那个词是什么。'
  });
})();
