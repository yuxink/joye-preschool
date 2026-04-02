// 拼音数据

// 单韵母
const singleVowels = [
  { pinyin: 'a', char: '啊', desc: '嘴巴张大' },
  { pinyin: 'o', char: '哦', desc: '嘴巴圆圆' },
  { pinyin: 'e', char: '鹅', desc: '嘴巴扁扁' },
  { pinyin: 'i', char: '衣', desc: '嘴巴扁小' },
  { pinyin: 'u', char: '乌', desc: '嘴巴突出' },
  { pinyin: 'ü', char: '鱼', desc: '嘴巴圆小' }
]

// 复韵母（补全常见复韵母）
const compoundVowels = [
  { pinyin: 'ai', char: '爱', desc: '先a后i' },
  { pinyin: 'ei', char: '诶', desc: '先e后i' },
  { pinyin: 'ui', char: '威', desc: '先u后i' },
  { pinyin: 'ao', char: '奥', desc: '先a后o' },
  { pinyin: 'ou', char: '欧', desc: '先o后u' },
  { pinyin: 'iu', char: '优', desc: '先i后u' },
  { pinyin: 'ie', char: '耶', desc: '先i后e' },
  { pinyin: 'üe', char: '约', desc: '先ü后e' },
  { pinyin: 'er', char: '耳', desc: '卷舌音' },
  { pinyin: 'ia', char: '呀', desc: '介母i+a' },
  { pinyin: 'ua', char: '蛙', desc: '介母u+a' },
  { pinyin: 'uo', char: '窝', desc: '介母u+o' },
  { pinyin: 'uai', char: '歪', desc: '介母u+ai' },
  { pinyin: 'iao', char: '腰', desc: '介母i+ao' },
  { pinyin: 'ian', char: '烟', desc: '介母i+an' },
  { pinyin: 'uan', char: '弯', desc: '介母u+an' },
  { pinyin: 'iong', char: '雍', desc: '介母i+ong' }
]

// 前鼻韵母（补全 ian/uan/üan）
const frontNasalVowels = [
  { pinyin: 'an', char: '安', desc: '舌尖抵上齿龈' },
  { pinyin: 'en', char: '恩', desc: '舌尖抵上齿龈' },
  { pinyin: 'in', char: '因', desc: '舌尖抵上齿龈' },
  { pinyin: 'un', char: '温', desc: '舌尖抵上齿龈' },
  { pinyin: 'ün', char: '晕', desc: '舌尖抵上齿龈' },
  { pinyin: 'ian', char: '烟', desc: 'i + an' },
  { pinyin: 'uan', char: '弯', desc: 'u + an' },
  { pinyin: 'üan', char: '冤', desc: 'ü + an' }
]

// 后鼻韵母（补全 iang/uang/ueng/iong）
const backNasalVowels = [
  { pinyin: 'ang', char: '昂', desc: '舌根抵软腭' },
  { pinyin: 'eng', char: '鞥', desc: '舌根抵软腭' },
  { pinyin: 'ing', char: '英', desc: '舌根抵软腭' },
  { pinyin: 'ong', char: '翁', desc: '舌根抵软腭' },
  { pinyin: 'iang', char: '央', desc: 'i + ang' },
  { pinyin: 'uang', char: '汪', desc: 'u + ang' },
  { pinyin: 'ueng', char: '翁', desc: 'u + eng' },
  { pinyin: 'iong', char: '雍', desc: 'i + ong' }
]

// 声母
const initials = [
  { pinyin: 'b', char: '波', type: '双唇音', desc: '双唇紧闭' },
  { pinyin: 'p', char: '坡', type: '双唇音', desc: '双唇紧闭送气' },
  { pinyin: 'm', char: '摸', type: '双唇音', desc: '双唇紧闭鼻音' },
  { pinyin: 'f', char: '佛', type: '唇齿音', desc: '上齿咬下唇' },
  { pinyin: 'd', char: '得', type: '舌尖音', desc: '舌尖抵上齿龈' },
  { pinyin: 't', char: '特', type: '舌尖音', desc: '舌尖抵上齿龈送气' },
  { pinyin: 'n', char: '讷', type: '舌尖音', desc: '舌尖抵上齿龈鼻音' },
  { pinyin: 'l', char: '勒', type: '舌尖音', desc: '舌尖抵上齿龈边音' },
  { pinyin: 'g', char: '哥', type: '舌根音', desc: '舌根抵软腭' },
  { pinyin: 'k', char: '科', type: '舌根音', desc: '舌根抵软腭送气' },
  { pinyin: 'h', char: '喝', type: '舌根音', desc: '舌根接近软腭' },
  { pinyin: 'j', char: '机', type: '舌面音', desc: '舌面抵硬腭' },
  { pinyin: 'q', char: '七', type: '舌面音', desc: '舌面抵硬腭送气' },
  { pinyin: 'x', char: '西', type: '舌面音', desc: '舌面接近硬腭' },
  { pinyin: 'zh', char: '知', type: '翘舌音', desc: '舌尖翘起' },
  { pinyin: 'ch', char: '吃', type: '翘舌音', desc: '舌尖翘起送气' },
  { pinyin: 'sh', char: '师', type: '翘舌音', desc: '舌尖翘起擦音' },
  { pinyin: 'r', char: '日', type: '翘舌音', desc: '舌尖翘起浊音' },
  { pinyin: 'z', char: '资', type: '平舌音', desc: '舌尖平伸' },
  { pinyin: 'c', char: '次', type: '平舌音', desc: '舌尖平伸送气' },
  { pinyin: 's', char: '思', type: '平舌音', desc: '舌尖平伸擦音' },
  { pinyin: 'y', char: '衣', type: '零声母', desc: '介母音' },
  { pinyin: 'w', char: '乌', type: '零声母', desc: '介母音' }
]

// 整体认读音节
const wholeSyllables = [
  { pinyin: 'zhi', char: '知' },
  { pinyin: 'chi', char: '吃' },
  { pinyin: 'shi', char: '师' },
  { pinyin: 'ri', char: '日' },
  { pinyin: 'zi', char: '资' },
  { pinyin: 'ci', char: '次' },
  { pinyin: 'si', char: '思' },
  { pinyin: 'yi', char: '一' },
  { pinyin: 'wu', char: '五' },
  { pinyin: 'yu', char: '鱼' },
  { pinyin: 'ye', char: '夜' },
  { pinyin: 'yue', char: '月' },
  { pinyin: 'yuan', char: '圆' },
  { pinyin: 'yin', char: '因' },
  { pinyin: 'yun', char: '云' },
  { pinyin: 'ying', char: '英' }
]

// 两拼示例
const twoSpellExamples = [
  { initial: 'b', final: 'a', result: 'ba', char: '八' },
  { initial: 'p', final: 'a', result: 'pa', char: '爬' },
  { initial: 'm', final: 'a', result: 'ma', char: '妈' },
  { initial: 'f', final: 'a', result: 'fa', char: '发' },
  { initial: 'd', final: 'a', result: 'da', char: '大' },
  { initial: 't', final: 'a', result: 'ta', char: '他' },
  { initial: 'n', final: 'a', result: 'na', char: '拿' },
  { initial: 'l', final: 'a', result: 'la', char: '拉' },
  { initial: 'g', final: 'e', result: 'ge', char: '歌' },
  { initial: 'k', final: 'e', result: 'ke', char: '科' },
  { initial: 'h', final: 'e', result: 'he', char: '喝' },
  { initial: 'j', final: 'i', result: 'ji', char: '机' },
  { initial: 'q', final: 'i', result: 'qi', char: '七' },
  { initial: 'x', final: 'i', result: 'xi', char: '西' },
  { initial: 'zh', final: 'u', result: 'zhu', char: '猪' },
  { initial: 'ch', final: 'u', result: 'chu', char: '出' },
  { initial: 'sh', final: 'u', result: 'shu', char: '书' }
]

// 三拼示例
const threeSpellExamples = [
  { initial: 'g', medial: 'u', final: 'a', result: 'gua', char: '瓜' },
  { initial: 'k', medial: 'u', final: 'a', result: 'kua', char: '夸' },
  { initial: 'h', medial: 'u', final: 'a', result: 'hua', char: '花' },
  { initial: 'j', medial: 'i', final: 'a', result: 'jia', char: '家' },
  { initial: 'q', medial: 'i', final: 'a', result: 'qia', char: '恰' },
  { initial: 'x', medial: 'i', final: 'a', result: 'xia', char: '虾' },
  { initial: 'l', medial: 'i', final: 'ang', result: 'liang', char: '亮' },
  { initial: 'n', medial: 'i', final: 'ang', result: 'niang', char: '娘' },
  { initial: 'zh', medial: 'u', final: 'ang', result: 'zhuang', char: '装' },
  { initial: 'ch', medial: 'u', final: 'ang', result: 'chuang', char: '床' },
  { initial: 'sh', medial: 'u', final: 'ang', result: 'shuang', char: '双' }
]

// 声调
const tones = [
  { tone: 1, name: '一声', symbol: 'ˉ', desc: '高平调', example: 'mā 妈' },
  { tone: 2, name: '二声', symbol: 'ˊ', desc: '升调', example: 'má 麻' },
  { tone: 3, name: '三声', symbol: 'ˇ', desc: '降升调', example: 'mǎ 马' },
  { tone: 4, name: '四声', symbol: 'ˋ', desc: '降调', example: 'mà 骂' }
]

// 四声训练词（用于拼读页）
const tonePracticeItems = [
  {
    base: 'ma',
    tones: [
      { pinyin: 'mā', char: '妈' },
      { pinyin: 'má', char: '麻' },
      { pinyin: 'mǎ', char: '马' },
      { pinyin: 'mà', char: '骂' }
    ]
  },
  {
    base: 'ba',
    tones: [
      { pinyin: 'bā', char: '八' },
      { pinyin: 'bá', char: '拔' },
      { pinyin: 'bǎ', char: '把' },
      { pinyin: 'bà', char: '爸' }
    ]
  },
  {
    base: 'da',
    tones: [
      { pinyin: 'dā', char: '搭' },
      { pinyin: 'dá', char: '答' },
      { pinyin: 'dǎ', char: '打' },
      { pinyin: 'dà', char: '大' }
    ]
  },
  {
    base: 'ge',
    tones: [
      { pinyin: 'gē', char: '哥' },
      { pinyin: 'gé', char: '格' },
      { pinyin: 'gě', char: '葛' },
      { pinyin: 'gè', char: '个' }
    ]
  },
  {
    base: 'po',
    tones: [
      { pinyin: 'pō', char: '坡' },
      { pinyin: 'pó', char: '婆' },
      { pinyin: 'pǒ', char: '叵' },
      { pinyin: 'pò', char: '破' }
    ]
  },
  {
    base: 'shi',
    tones: [
      { pinyin: 'shī', char: '师' },
      { pinyin: 'shí', char: '十' },
      { pinyin: 'shǐ', char: '史' },
      { pinyin: 'shì', char: '是' }
    ]
  }
]

// 拼音汉字配对（用于练习）
const pinyinCharPairs = [
  // 家人
  { pinyin: 'bà', char: '爸' },
  { pinyin: 'mā', char: '妈' },
  { pinyin: 'gē', char: '哥' },
  { pinyin: 'jiě', char: '姐' },
  { pinyin: 'dì', char: '弟' },
  { pinyin: 'mèi', char: '妹' },
  { pinyin: 'yé', char: '爷' },
  { pinyin: 'nǎi', char: '奶' },
  
  // 动物
  { pinyin: 'māo', char: '猫' },
  { pinyin: 'gǒu', char: '狗' },
  { pinyin: 'niǎo', char: '鸟' },
  { pinyin: 'yú', char: '鱼' },
  { pinyin: 'mǎ', char: '马' },
  { pinyin: 'niú', char: '牛' },
  { pinyin: 'yáng', char: '羊' },
  { pinyin: 'zhū', char: '猪' },
  { pinyin: 'jī', char: '鸡' },
  { pinyin: 'yā', char: '鸭' },
  { pinyin: 'tù', char: '兔' },
  { pinyin: 'shé', char: '蛇' },
  
  // 自然
  { pinyin: 'huā', char: '花' },
  { pinyin: 'shù', char: '树' },
  { pinyin: 'cǎo', char: '草' },
  { pinyin: 'shān', char: '山' },
  { pinyin: 'shuǐ', char: '水' },
  { pinyin: 'huǒ', char: '火' },
  { pinyin: 'tǔ', char: '土' },
  { pinyin: 'shí', char: '石' },
  { pinyin: 'yuè', char: '月' },
  { pinyin: 'rì', char: '日' },
  { pinyin: 'xīng', char: '星' },
  { pinyin: 'yún', char: '云' },
  { pinyin: 'yǔ', char: '雨' },
  { pinyin: 'xuě', char: '雪' },
  { pinyin: 'fēng', char: '风' },
  
  // 身体
  { pinyin: 'tóu', char: '头' },
  { pinyin: 'yǎn', char: '眼' },
  { pinyin: 'ěr', char: '耳' },
  { pinyin: 'bí', char: '鼻' },
  { pinyin: 'zuǐ', char: '嘴' },
  { pinyin: 'shǒu', char: '手' },
  { pinyin: 'jiǎo', char: '脚' },
  
  // 水果
  { pinyin: 'guǒ', char: '果' },
  { pinyin: 'lí', char: '梨' },
  { pinyin: 'táo', char: '桃' },
  { pinyin: 'jú', char: '橘' },
  
  // 颜色
  { pinyin: 'hóng', char: '红' },
  { pinyin: 'huáng', char: '黄' },
  { pinyin: 'lán', char: '蓝' },
  { pinyin: 'lǜ', char: '绿' },
  { pinyin: 'bái', char: '白' },
  { pinyin: 'hēi', char: '黑' },
  
  // 数字
  { pinyin: 'yī', char: '一' },
  { pinyin: 'èr', char: '二' },
  { pinyin: 'sān', char: '三' },
  { pinyin: 'sì', char: '四' },
  { pinyin: 'wǔ', char: '五' },
  { pinyin: 'liù', char: '六' },
  { pinyin: 'qī', char: '七' },
  { pinyin: 'bā', char: '八' },
  { pinyin: 'jiǔ', char: '九' },
  { pinyin: 'shí', char: '十' },
  
  // 常用字
  { pinyin: 'dà', char: '大' },
  { pinyin: 'xiǎo', char: '小' },
  { pinyin: 'duō', char: '多' },
  { pinyin: 'shǎo', char: '少' },
  { pinyin: 'shàng', char: '上' },
  { pinyin: 'xià', char: '下' },
  { pinyin: 'zuǒ', char: '左' },
  { pinyin: 'yòu', char: '右' },
  { pinyin: 'rén', char: '人' },
  { pinyin: 'kǒu', char: '口' },
  { pinyin: 'mù', char: '目' },
  { pinyin: 'ér', char: '儿' },
  { pinyin: 'nǚ', char: '女' },
  { pinyin: 'zǐ', char: '子' }
]

// 平翘舌对比
const flatCurledPairs = [
  { flat: 'zi', flatChar: '资', curled: 'zhi', curledChar: '知' },
  { flat: 'ci', flatChar: '次', curled: 'chi', curledChar: '吃' },
  { flat: 'si', flatChar: '思', curled: 'shi', curledChar: '师' },
  { flat: 'zu', flatChar: '租', curled: 'zhu', curledChar: '猪' },
  { flat: 'cu', flatChar: '粗', curled: 'chu', curledChar: '出' },
  { flat: 'su', flatChar: '苏', curled: 'shu', curledChar: '书' }
]

// 特殊韵母
const specialVowels = [
  { pinyin: 'er', char: '耳', desc: '卷舌独立成音节' }
]

// 两拼分类（按韵母家族）
const twoSpellGroups = [
  {
    id: 'a',
    name: 'a类',
    examples: [
      { initial: 'b', final: 'a', result: 'ba', char: '八' },
      { initial: 'p', final: 'a', result: 'pa', char: '爬' },
      { initial: 'm', final: 'a', result: 'ma', char: '妈' },
      { initial: 'f', final: 'a', result: 'fa', char: '发' },
      { initial: 'd', final: 'a', result: 'da', char: '大' },
      { initial: 't', final: 'a', result: 'ta', char: '他' },
      { initial: 'n', final: 'a', result: 'na', char: '拿' },
      { initial: 'l', final: 'a', result: 'la', char: '拉' }
    ]
  },
  {
    id: 'o_e',
    name: 'o/e类',
    examples: [
      { initial: 'b', final: 'o', result: 'bo', char: '波' },
      { initial: 'p', final: 'o', result: 'po', char: '坡' },
      { initial: 'm', final: 'o', result: 'mo', char: '摸' },
      { initial: 'f', final: 'o', result: 'fo', char: '佛' },
      { initial: 'g', final: 'e', result: 'ge', char: '歌' },
      { initial: 'k', final: 'e', result: 'ke', char: '科' },
      { initial: 'h', final: 'e', result: 'he', char: '喝' },
      { initial: 'd', final: 'e', result: 'de', char: '得' }
    ]
  },
  {
    id: 'i_u',
    name: 'i/u类',
    examples: [
      { initial: 'j', final: 'i', result: 'ji', char: '机' },
      { initial: 'q', final: 'i', result: 'qi', char: '七' },
      { initial: 'x', final: 'i', result: 'xi', char: '西' },
      { initial: 'z', final: 'i', result: 'zi', char: '资' },
      { initial: 'c', final: 'i', result: 'ci', char: '次' },
      { initial: 's', final: 'i', result: 'si', char: '思' },
      { initial: 'l', final: 'u', result: 'lu', char: '路' },
      { initial: 'n', final: 'u', result: 'nu', char: '怒' },
      { initial: 'j', final: 'u', result: 'ju', char: '居' },
      { initial: 'q', final: 'u', result: 'qu', char: '区' },
      { initial: 'x', final: 'u', result: 'xu', char: '需' }
    ]
  },
  {
    id: 'compound',
    name: '复韵母',
    examples: [
      { initial: 'b', final: 'ai', result: 'bai', char: '白' },
      { initial: 'm', final: 'ei', result: 'mei', char: '美' },
      { initial: 'd', final: 'ui', result: 'dui', char: '对' },
      { initial: 'g', final: 'ao', result: 'gao', char: '高' },
      { initial: 'h', final: 'ou', result: 'hou', char: '后' },
      { initial: 'n', final: 'iu', result: 'niu', char: '牛' },
      { initial: 'x', final: 'ie', result: 'xie', char: '写' },
      { initial: 'j', final: 'üe', result: 'jue', char: '觉' }
    ]
  },
  {
    id: 'nasal',
    name: '鼻韵母',
    examples: [
      { initial: 'b', final: 'an', result: 'ban', char: '班' },
      { initial: 'm', final: 'en', result: 'men', char: '门' },
      { initial: 'l', final: 'in', result: 'lin', char: '林' },
      { initial: 'k', final: 'un', result: 'kun', char: '昆' },
      { initial: 'j', final: 'ün', result: 'jun', char: '军' },
      { initial: 'h', final: 'ang', result: 'hang', char: '行' },
      { initial: 'f', final: 'eng', result: 'feng', char: '风' },
      { initial: 'y', final: 'ing', result: 'ying', char: '英' },
      { initial: 'd', final: 'ong', result: 'dong', char: '东' }
    ]
  }
]

// 三拼分类
const threeSpellGroups = [
  {
    id: 'ia_ian_iang',
    name: 'i介音',
    examples: [
      { initial: 'j', medial: 'i', final: 'a', result: 'jia', char: '家' },
      { initial: 'q', medial: 'i', final: 'a', result: 'qia', char: '恰' },
      { initial: 'x', medial: 'i', final: 'a', result: 'xia', char: '虾' },
      { initial: 'j', medial: 'i', final: 'an', result: 'jian', char: '间' },
      { initial: 'q', medial: 'i', final: 'an', result: 'qian', char: '前' },
      { initial: 'x', medial: 'i', final: 'an', result: 'xian', char: '先' },
      { initial: 'l', medial: 'i', final: 'ang', result: 'liang', char: '亮' },
      { initial: 'n', medial: 'i', final: 'ang', result: 'niang', char: '娘' },
      { initial: 'x', medial: 'i', final: 'ong', result: 'xiong', char: '雄' }
    ]
  },
  {
    id: 'ua_uan_uang',
    name: 'u介音',
    examples: [
      { initial: 'g', medial: 'u', final: 'a', result: 'gua', char: '瓜' },
      { initial: 'k', medial: 'u', final: 'a', result: 'kua', char: '夸' },
      { initial: 'h', medial: 'u', final: 'a', result: 'hua', char: '花' },
      { initial: 'g', medial: 'u', final: 'an', result: 'guan', char: '关' },
      { initial: 'k', medial: 'u', final: 'an', result: 'kuan', char: '宽' },
      { initial: 'h', medial: 'u', final: 'an', result: 'huan', char: '欢' },
      { initial: 'z', medial: 'u', final: 'ang', result: 'zhuang', char: '装' },
      { initial: 'ch', medial: 'u', final: 'ang', result: 'chuang', char: '床' },
      { initial: 'sh', medial: 'u', final: 'ang', result: 'shuang', char: '双' }
    ]
  }
]

// 向后兼容：保留平铺数组导出
// 旧版两拼/三拼平铺示例已迁移到分组结构（twoSpellGroups/threeSpellGroups）

// module.exports = {
//   singleVowels,
//   compoundVowels,
//   frontNasalVowels,
//   backNasalVowels,
//   initials,
//   wholeSyllables,
//   twoSpellExamples,
//   threeSpellExamples,
//   tones,
//   tonePracticeItems,
//   pinyinCharPairs,
//   flatCurledPairs
// }

module.exports = {
  singleVowels,
  specialVowels,
  compoundVowels,
  frontNasalVowels,
  backNasalVowels,
  initials,
  wholeSyllables,
  twoSpellExamples,
  threeSpellExamples,
  twoSpellGroups,
  threeSpellGroups,
  tones,
  tonePracticeItems,
  pinyinCharPairs,
  flatCurledPairs
}
