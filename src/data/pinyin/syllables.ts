import type { PinyinItem, PinyinSyllable, ToneType } from '../../types'

export const wholeSyllables: PinyinItem[] = [
  { pinyin: 'zhi', category: 'wholeSyllable', tips: '整体认读，不要拼读' },
  { pinyin: 'chi', category: 'wholeSyllable', tips: '整体认读，不要拼读' },
  { pinyin: 'shi', category: 'wholeSyllable', tips: '整体认读，不要拼读' },
  { pinyin: 'ri', category: 'wholeSyllable', tips: '整体认读，不要拼读' },
  { pinyin: 'zi', category: 'wholeSyllable', tips: '整体认读，不要拼读' },
  { pinyin: 'ci', category: 'wholeSyllable', tips: '整体认读，不要拼读' },
  { pinyin: 'si', category: 'wholeSyllable', tips: '整体认读，不要拼读' },
  { pinyin: 'yi', category: 'wholeSyllable', tips: '整体认读，不要拼读' },
  { pinyin: 'wu', category: 'wholeSyllable', tips: '整体认读，不要拼读' },
  { pinyin: 'yu', category: 'wholeSyllable', tips: '整体认读，不要拼读' },
  { pinyin: 'ye', category: 'wholeSyllable', tips: '整体认读，不要拼读' },
  { pinyin: 'yue', category: 'wholeSyllable', tips: '整体认读，不要拼读' },
  { pinyin: 'yuan', category: 'wholeSyllable', tips: '整体认读，不要拼读' },
  { pinyin: 'yin', category: 'wholeSyllable', tips: '整体认读，不要拼读' },
  { pinyin: 'yun', category: 'wholeSyllable', tips: '整体认读，不要拼读' },
  { pinyin: 'ying', category: 'wholeSyllable', tips: '整体认读，不要拼读' },
]

export const toneMarks: Record<ToneType, string> = {
  1: 'ˉ',
  2: 'ˊ',
  3: 'ˇ',
  4: 'ˋ',
  0: '',
}

export const toneNames: Record<ToneType, string> = {
  1: '一声（阴平）',
  2: '二声（阳平）',
  3: '三声（上声）',
  4: '四声（去声）',
  0: '轻声',
}

export const toneDescriptions: Record<ToneType, string> = {
  1: '高高平平像开车',
  2: '从低到高像上坡',
  3: '先降后升像山谷',
  4: '从高到低像滑梯',
  0: '又轻又短像气球',
}

export const toneSymbols: Record<ToneType, string> = {
  1: '—',
  2: '/',
  3: 'V',
  4: '\\',
  0: '·',
}

export function addToneToVowel(vowel: string, tone: ToneType): string {
  const toneVowels: Record<string, Record<ToneType, string>> = {
    a: { 1: 'ā', 2: 'á', 3: 'ǎ', 4: 'à', 0: 'a' },
    o: { 1: 'ō', 2: 'ó', 3: 'ǒ', 4: 'ò', 0: 'o' },
    e: { 1: 'ē', 2: 'é', 3: 'ě', 4: 'è', 0: 'e' },
    i: { 1: 'ī', 2: 'í', 3: 'ǐ', 4: 'ì', 0: 'i' },
    u: { 1: 'ū', 2: 'ú', 3: 'ǔ', 4: 'ù', 0: 'u' },
    ü: { 1: 'ǖ', 2: 'ǘ', 3: 'ǚ', 4: 'ǜ', 0: 'ü' },
  }

  let result = vowel
  for (const [v, tones] of Object.entries(toneVowels)) {
    if (vowel.includes(v)) {
      result = vowel.replace(v, tones[tone] || v)
      break
    }
  }
  return result
}

export function getTonedPinyin(pinyin: string, tone: ToneType): string {
  if (tone === 0) return pinyin
  
  const toneVowels: Record<string, Record<number, string>> = {
    'a': { 1: 'ā', 2: 'á', 3: 'ǎ', 4: 'à' },
    'o': { 1: 'ō', 2: 'ó', 3: 'ǒ', 4: 'ò' },
    'e': { 1: 'ē', 2: 'é', 3: 'ě', 4: 'è' },
    'i': { 1: 'ī', 2: 'í', 3: 'ǐ', 4: 'ì' },
    'u': { 1: 'ū', 2: 'ú', 3: 'ǔ', 4: 'ù' },
    'ü': { 1: 'ǖ', 2: 'ǘ', 3: 'ǚ', 4: 'ǜ' },
  }
  
  if (pinyin.includes('a')) {
    return pinyin.replace('a', toneVowels['a'][tone])
  }
  if (pinyin.includes('e')) {
    return pinyin.replace('e', toneVowels['e'][tone])
  }
  if (pinyin.includes('ou')) {
    return pinyin.replace('o', toneVowels['o'][tone])
  }
  if (pinyin.includes('iu')) {
    return pinyin.replace('u', toneVowels['u'][tone])
  }
  if (pinyin.includes('ui')) {
    return pinyin.replace('i', toneVowels['i'][tone])
  }
  for (const vowel of ['o', 'i', 'u', 'ü']) {
    if (pinyin.includes(vowel)) {
      return pinyin.replace(vowel, toneVowels[vowel][tone])
    }
  }
  return pinyin
}

// 丰富的常用音节 - 按主题分类
export const commonSyllables: PinyinSyllable[] = [
  // 家庭
  { syllable: 'ba', initial: 'b', final: 'a', tone: 4, char: '爸' },
  { syllable: 'ma', initial: 'm', final: 'a', tone: 1, char: '妈' },
  { syllable: 'ye', initial: 'y', final: 'e', tone: 2, char: '爷' },
  { syllable: 'nai', initial: 'n', final: 'ai', tone: 3, char: '奶' },
  { syllable: 'ge', initial: 'g', final: 'e', tone: 1, char: '哥' },
  { syllable: 'jie', initial: 'j', final: 'ie', tone: 3, char: '姐' },
  { syllable: 'di', initial: 'd', final: 'i', tone: 4, char: '弟' },
  { syllable: 'mei', initial: 'm', final: 'ei', tone: 4, char: '妹' },
  
  // 人称
  { syllable: 'wo', initial: 'w', final: 'o', tone: 3, char: '我' },
  { syllable: 'ni', initial: 'n', final: 'i', tone: 3, char: '你' },
  { syllable: 'ta', initial: 't', final: 'a', tone: 1, char: '他' },
  { syllable: 'men', initial: 'm', final: 'en', tone: 0, char: '们' },
  
  // 身体
  { syllable: 'tou', initial: 't', final: 'ou', tone: 2, char: '头' },
  { syllable: 'yan', initial: 'y', final: 'an', tone: 3, char: '眼' },
  { syllable: 'er', initial: '', final: 'er', tone: 3, char: '耳' },
  { syllable: 'bi', initial: 'b', final: 'i', tone: 2, char: '鼻' },
  { syllable: 'zui', initial: 'z', final: 'ui', tone: 3, char: '嘴' },
  { syllable: 'shou', initial: 'sh', final: 'ou', tone: 3, char: '手' },
  { syllable: 'jiao', initial: 'j', final: 'iao', tone: 3, char: '脚' },
  
  // 自然
  { syllable: 'tian', initial: 't', final: 'ian', medial: 'i', tone: 1, char: '天' },
  { syllable: 'di', initial: 'd', final: 'i', tone: 4, char: '地' },
  { syllable: 'ri', initial: 'r', final: 'i', tone: 4, char: '日' },
  { syllable: 'yue', initial: 'y', final: 'ue', tone: 4, char: '月' },
  { syllable: 'xing', initial: 'x', final: 'ing', tone: 1, char: '星' },
  { syllable: 'shui', initial: 'sh', final: 'ui', tone: 3, char: '水' },
  { syllable: 'huo', initial: 'h', final: 'uo', tone: 3, char: '火' },
  { syllable: 'shan', initial: 'sh', final: 'an', tone: 1, char: '山' },
  { syllable: 'he', initial: 'h', final: 'e', tone: 2, char: '河' },
  { syllable: 'hai', initial: 'h', final: 'ai', tone: 3, char: '海' },
  { syllable: 'feng', initial: 'f', final: 'eng', tone: 1, char: '风' },
  { syllable: 'yu', initial: 'y', final: 'u', tone: 3, char: '雨' },
  { syllable: 'yun', initial: 'y', final: 'un', tone: 2, char: '云' },
  
  // 植物
  { syllable: 'shu', initial: 'sh', final: 'u', tone: 4, char: '树' },
  { syllable: 'hua', initial: 'h', final: 'ua', medial: 'u', tone: 1, char: '花' },
  { syllable: 'cao', initial: 'c', final: 'ao', tone: 3, char: '草' },
  { syllable: 'ye', initial: 'y', final: 'e', tone: 4, char: '叶' },
  { syllable: 'guo', initial: 'g', final: 'uo', tone: 3, char: '果' },
  
  // 动物
  { syllable: 'gou', initial: 'g', final: 'ou', tone: 3, char: '狗' },
  { syllable: 'mao', initial: 'm', final: 'ao', tone: 1, char: '猫' },
  { syllable: 'niao', initial: 'n', final: 'iao', tone: 3, char: '鸟' },
  { syllable: 'yu', initial: 'y', final: 'u', tone: 2, char: '鱼' },
  { syllable: 'niu', initial: 'n', final: 'iu', tone: 2, char: '牛' },
  { syllable: 'yang', initial: 'y', final: 'ang', tone: 2, char: '羊' },
  { syllable: 'zhu', initial: 'zh', final: 'u', tone: 1, char: '猪' },
  { syllable: 'ji', initial: 'j', final: 'i', tone: 1, char: '鸡' },
  { syllable: 'ya', initial: 'y', final: 'a', tone: 1, char: '鸭' },
  { syllable: 'tu', initial: 't', final: 'u', tone: 4, char: '兔' },
  { syllable: 'ma', initial: 'm', final: 'a', tone: 3, char: '马' },
  { syllable: 'hu', initial: 'h', final: 'u', tone: 3, char: '虎' },
  { syllable: 'long', initial: 'l', final: 'ong', tone: 2, char: '龙' },
  
  // 物品
  { syllable: 'che', initial: 'ch', final: 'e', tone: 1, char: '车' },
  { syllable: 'men', initial: 'm', final: 'en', tone: 2, char: '门' },
  { syllable: 'chuang', initial: 'ch', final: 'uang', medial: 'u', tone: 2, char: '床' },
  { syllable: 'zhuo', initial: 'zh', final: 'uo', tone: 1, char: '桌' },
  { syllable: 'yi', initial: 'y', final: 'i', tone: 3, char: '椅' },
  { syllable: 'shu', initial: 'sh', final: 'u', tone: 1, char: '书' },
  { syllable: 'bi', initial: 'b', final: 'i', tone: 3, char: '笔' },
  { syllable: 'zhi', initial: 'zh', final: 'i', tone: 3, char: '纸' },
  
  // 形容
  { syllable: 'da', initial: 'd', final: 'a', tone: 4, char: '大' },
  { syllable: 'xiao', initial: 'x', final: 'iao', tone: 3, char: '小' },
  { syllable: 'gao', initial: 'g', final: 'ao', tone: 1, char: '高' },
  { syllable: 'ai', initial: '', final: 'ai', tone: 3, char: '矮' },
  { syllable: 'hao', initial: 'h', final: 'ao', tone: 3, char: '好' },
  { syllable: 'huai', initial: 'h', final: 'uai', medial: 'u', tone: 4, char: '坏' },
  { syllable: 'kuai', initial: 'k', final: 'uai', medial: 'u', tone: 4, char: '快' },
  { syllable: 'man', initial: 'm', final: 'an', tone: 4, char: '慢' },
  { syllable: 'duo', initial: 'd', final: 'uo', tone: 1, char: '多' },
  { syllable: 'shao', initial: 'sh', final: 'ao', tone: 3, char: '少' },
  { syllable: 'chang', initial: 'ch', final: 'ang', tone: 2, char: '长' },
  { syllable: 'duan', initial: 'd', final: 'uan', medial: 'u', tone: 3, char: '短' },
  
  // 动作
  { syllable: 'zou', initial: 'z', final: 'ou', tone: 3, char: '走' },
  { syllable: 'pao', initial: 'p', final: 'ao', tone: 3, char: '跑' },
  { syllable: 'tiao', initial: 't', final: 'iao', tone: 4, char: '跳' },
  { syllable: 'kan', initial: 'k', final: 'an', tone: 4, char: '看' },
  { syllable: 'ting', initial: 't', final: 'ing', tone: 1, char: '听' },
  { syllable: 'shuo', initial: 'sh', final: 'uo', tone: 1, char: '说' },
  { syllable: 'du', initial: 'd', final: 'u', tone: 2, char: '读' },
  { syllable: 'xie', initial: 'x', final: 'ie', tone: 3, char: '写' },
  { syllable: 'chi', initial: 'ch', final: 'i', tone: 1, char: '吃' },
  { syllable: 'he', initial: 'h', final: 'e', tone: 1, char: '喝' },
  { syllable: 'shui', initial: 'sh', final: 'ui', tone: 4, char: '睡' },
  { syllable: 'qi', initial: 'q', final: 'i', tone: 3, char: '起' },
  { syllable: 'zuo', initial: 'z', final: 'uo', tone: 4, char: '坐' },
  { syllable: 'zhan', initial: 'zh', final: 'an', tone: 4, char: '站' },
  
  // 数字
  { syllable: 'yi', initial: 'y', final: 'i', tone: 1, char: '一' },
  { syllable: 'er', initial: '', final: 'er', tone: 4, char: '二' },
  { syllable: 'san', initial: 's', final: 'an', tone: 1, char: '三' },
  { syllable: 'si', initial: 's', final: 'i', tone: 4, char: '四' },
  { syllable: 'wu', initial: 'w', final: 'u', tone: 3, char: '五' },
  { syllable: 'liu', initial: 'l', final: 'iu', tone: 4, char: '六' },
  { syllable: 'qi', initial: 'q', final: 'i', tone: 1, char: '七' },
  { syllable: 'ba', initial: 'b', final: 'a', tone: 1, char: '八' },
  { syllable: 'jiu', initial: 'j', final: 'iu', tone: 3, char: '九' },
  { syllable: 'shi', initial: 'sh', final: 'i', tone: 2, char: '十' },
  
  // 颜色
  { syllable: 'hong', initial: 'h', final: 'ong', tone: 2, char: '红' },
  { syllable: 'huang', initial: 'h', final: 'uang', medial: 'u', tone: 2, char: '黄' },
  { syllable: 'lan', initial: 'l', final: 'an', tone: 2, char: '蓝' },
  { syllable: 'lü', initial: 'l', final: 'ü', tone: 4, char: '绿' },
  { syllable: 'bai', initial: 'b', final: 'ai', tone: 2, char: '白' },
  { syllable: 'hei', initial: 'h', final: 'ei', tone: 1, char: '黑' },
  
  // 食物
  { syllable: 'mi', initial: 'm', final: 'i', tone: 3, char: '米' },
  { syllable: 'fan', initial: 'f', final: 'an', tone: 4, char: '饭' },
  { syllable: 'cai', initial: 'c', final: 'ai', tone: 4, char: '菜' },
  { syllable: 'tang', initial: 't', final: 'ang', tone: 1, char: '汤' },
  { syllable: 'dan', initial: 'd', final: 'an', tone: 4, char: '蛋' },
  { syllable: 'rou', initial: 'r', final: 'ou', tone: 4, char: '肉' },
]

// 两拼音节示例 - 大幅扩展
export const twoSpellExamples = [
  // b 系列
  { initial: 'b', final: 'a', result: 'ba', char: '八' },
  { initial: 'b', final: 'o', result: 'bo', char: '波' },
  { initial: 'b', final: 'i', result: 'bi', char: '笔' },
  { initial: 'b', final: 'u', result: 'bu', char: '步' },
  { initial: 'b', final: 'ai', result: 'bai', char: '白' },
  { initial: 'b', final: 'ei', result: 'bei', char: '北' },
  { initial: 'b', final: 'ao', result: 'bao', char: '包' },
  { initial: 'b', final: 'an', result: 'ban', char: '班' },
  { initial: 'b', final: 'en', result: 'ben', char: '本' },
  { initial: 'b', final: 'ang', result: 'bang', char: '帮' },
  { initial: 'b', final: 'eng', result: 'beng', char: '蹦' },
  { initial: 'b', final: 'ing', result: 'bing', char: '冰' },
  
  // p 系列
  { initial: 'p', final: 'a', result: 'pa', char: '怕' },
  { initial: 'p', final: 'o', result: 'po', char: '坡' },
  { initial: 'p', final: 'i', result: 'pi', char: '皮' },
  { initial: 'p', final: 'u', result: 'pu', char: '铺' },
  { initial: 'p', final: 'ai', result: 'pai', char: '拍' },
  { initial: 'p', final: 'ei', result: 'pei', char: '陪' },
  { initial: 'p', final: 'ao', result: 'pao', char: '跑' },
  { initial: 'p', final: 'an', result: 'pan', char: '盘' },
  { initial: 'p', final: 'en', result: 'pen', char: '喷' },
  { initial: 'p', final: 'ang', result: 'pang', char: '胖' },
  { initial: 'p', final: 'eng', result: 'peng', char: '朋' },
  { initial: 'p', final: 'ing', result: 'ping', char: '平' },
  
  // m 系列
  { initial: 'm', final: 'a', result: 'ma', char: '妈' },
  { initial: 'm', final: 'o', result: 'mo', char: '摸' },
  { initial: 'm', final: 'e', result: 'me', char: '么' },
  { initial: 'm', final: 'i', result: 'mi', char: '米' },
  { initial: 'm', final: 'u', result: 'mu', char: '木' },
  { initial: 'm', final: 'ai', result: 'mai', char: '买' },
  { initial: 'm', final: 'ei', result: 'mei', char: '美' },
  { initial: 'm', final: 'ao', result: 'mao', char: '猫' },
  { initial: 'm', final: 'ou', result: 'mou', char: '某' },
  { initial: 'm', final: 'an', result: 'man', char: '慢' },
  { initial: 'm', final: 'en', result: 'men', char: '门' },
  { initial: 'm', final: 'ang', result: 'mang', char: '忙' },
  { initial: 'm', final: 'eng', result: 'meng', char: '梦' },
  { initial: 'm', final: 'ing', result: 'ming', char: '明' },
  
  // f 系列
  { initial: 'f', final: 'a', result: 'fa', char: '发' },
  { initial: 'f', final: 'o', result: 'fo', char: '佛' },
  { initial: 'f', final: 'u', result: 'fu', char: '福' },
  { initial: 'f', final: 'ei', result: 'fei', char: '飞' },
  { initial: 'f', final: 'an', result: 'fan', char: '饭' },
  { initial: 'f', final: 'en', result: 'fen', char: '分' },
  { initial: 'f', final: 'ang', result: 'fang', char: '房' },
  { initial: 'f', final: 'eng', result: 'feng', char: '风' },
  
  // d 系列
  { initial: 'd', final: 'a', result: 'da', char: '大' },
  { initial: 'd', final: 'e', result: 'de', char: '的' },
  { initial: 'd', final: 'i', result: 'di', char: '地' },
  { initial: 'd', final: 'u', result: 'du', char: '读' },
  { initial: 'd', final: 'ai', result: 'dai', char: '带' },
  { initial: 'd', final: 'ei', result: 'dei', char: '得' },
  { initial: 'd', final: 'ao', result: 'dao', char: '到' },
  { initial: 'd', final: 'ou', result: 'dou', char: '都' },
  { initial: 'd', final: 'an', result: 'dan', char: '蛋' },
  { initial: 'd', final: 'en', result: 'den', char: '等' },
  { initial: 'd', final: 'ang', result: 'dang', char: '当' },
  { initial: 'd', final: 'eng', result: 'deng', char: '灯' },
  { initial: 'd', final: 'ong', result: 'dong', char: '东' },
  { initial: 'd', final: 'ing', result: 'ding', char: '丁' },
  
  // t 系列
  { initial: 't', final: 'a', result: 'ta', char: '他' },
  { initial: 't', final: 'e', result: 'te', char: '特' },
  { initial: 't', final: 'i', result: 'ti', char: '提' },
  { initial: 't', final: 'u', result: 'tu', char: '兔' },
  { initial: 't', final: 'ai', result: 'tai', char: '太' },
  { initial: 't', final: 'ao', result: 'tao', char: '桃' },
  { initial: 't', final: 'ou', result: 'tou', char: '头' },
  { initial: 't', final: 'an', result: 'tan', char: '谈' },
  { initial: 't', final: 'ang', result: 'tang', char: '汤' },
  { initial: 't', final: 'eng', result: 'teng', char: '疼' },
  { initial: 't', final: 'ong', result: 'tong', char: '同' },
  { initial: 't', final: 'ing', result: 'ting', char: '听' },
  
  // n 系列
  { initial: 'n', final: 'a', result: 'na', char: '那' },
  { initial: 'n', final: 'e', result: 'ne', char: '呢' },
  { initial: 'n', final: 'i', result: 'ni', char: '你' },
  { initial: 'n', final: 'u', result: 'nu', char: '努' },
  { initial: 'n', final: 'ai', result: 'nai', char: '奶' },
  { initial: 'n', final: 'ei', result: 'nei', char: '内' },
  { initial: 'n', final: 'ao', result: 'nao', char: '脑' },
  { initial: 'n', final: 'an', result: 'nan', char: '南' },
  { initial: 'n', final: 'en', result: 'nen', char: '嫩' },
  { initial: 'n', final: 'ang', result: 'nang', char: '囊' },
  { initial: 'n', final: 'eng', result: 'neng', char: '能' },
  { initial: 'n', final: 'ong', result: 'nong', char: '农' },
  { initial: 'n', final: 'ing', result: 'ning', char: '宁' },
  
  // l 系列
  { initial: 'l', final: 'a', result: 'la', char: '拉' },
  { initial: 'l', final: 'e', result: 'le', char: '乐' },
  { initial: 'l', final: 'i', result: 'li', char: '力' },
  { initial: 'l', final: 'u', result: 'lu', char: '路' },
  { initial: 'l', final: 'ai', result: 'lai', char: '来' },
  { initial: 'l', final: 'ei', result: 'lei', char: '累' },
  { initial: 'l', final: 'ao', result: 'lao', char: '老' },
  { initial: 'l', final: 'ou', result: 'lou', char: '楼' },
  { initial: 'l', final: 'an', result: 'lan', char: '蓝' },
  { initial: 'l', final: 'ang', result: 'lang', char: '狼' },
  { initial: 'l', final: 'eng', result: 'leng', char: '冷' },
  { initial: 'l', final: 'ong', result: 'long', char: '龙' },
  { initial: 'l', final: 'ing', result: 'ling', char: '零' },
  
  // g 系列
  { initial: 'g', final: 'a', result: 'ga', char: '嘎' },
  { initial: 'g', final: 'e', result: 'ge', char: '歌' },
  { initial: 'g', final: 'u', result: 'gu', char: '古' },
  { initial: 'g', final: 'ai', result: 'gai', char: '该' },
  { initial: 'g', final: 'ei', result: 'gei', char: '给' },
  { initial: 'g', final: 'ao', result: 'gao', char: '高' },
  { initial: 'g', final: 'ou', result: 'gou', char: '狗' },
  { initial: 'g', final: 'an', result: 'gan', char: '干' },
  { initial: 'g', final: 'en', result: 'gen', char: '跟' },
  { initial: 'g', final: 'ang', result: 'gang', char: '钢' },
  { initial: 'g', final: 'eng', result: 'geng', char: '更' },
  { initial: 'g', final: 'ong', result: 'gong', char: '工' },
  
  // k 系列
  { initial: 'k', final: 'a', result: 'ka', char: '卡' },
  { initial: 'k', final: 'e', result: 'ke', char: '可' },
  { initial: 'k', final: 'u', result: 'ku', char: '哭' },
  { initial: 'k', final: 'ai', result: 'kai', char: '开' },
  { initial: 'k', final: 'ao', result: 'kao', char: '考' },
  { initial: 'k', final: 'ou', result: 'kou', char: '口' },
  { initial: 'k', final: 'an', result: 'kan', char: '看' },
  { initial: 'k', final: 'en', result: 'ken', char: '肯' },
  { initial: 'k', final: 'ang', result: 'kang', char: '康' },
  { initial: 'k', final: 'eng', result: 'keng', char: '坑' },
  { initial: 'k', final: 'ong', result: 'kong', char: '空' },
  
  // h 系列
  { initial: 'h', final: 'a', result: 'ha', char: '哈' },
  { initial: 'h', final: 'e', result: 'he', char: '河' },
  { initial: 'h', final: 'u', result: 'hu', char: '虎' },
  { initial: 'h', final: 'ai', result: 'hai', char: '海' },
  { initial: 'h', final: 'ei', result: 'hei', char: '黑' },
  { initial: 'h', final: 'ao', result: 'hao', char: '好' },
  { initial: 'h', final: 'ou', result: 'hou', char: '后' },
  { initial: 'h', final: 'an', result: 'han', char: '汉' },
  { initial: 'h', final: 'en', result: 'hen', char: '很' },
  { initial: 'h', final: 'ang', result: 'hang', char: '行' },
  { initial: 'h', final: 'eng', result: 'heng', char: '横' },
  { initial: 'h', final: 'ong', result: 'hong', char: '红' },
  
  // j 系列
  { initial: 'j', final: 'i', result: 'ji', char: '鸡' },
  { initial: 'j', final: 'in', result: 'jin', char: '金' },
  { initial: 'j', final: 'ing', result: 'jing', char: '京' },
  
  // q 系列
  { initial: 'q', final: 'i', result: 'qi', char: '七' },
  { initial: 'q', final: 'in', result: 'qin', char: '亲' },
  { initial: 'q', final: 'ing', result: 'qing', char: '青' },
  
  // x 系列
  { initial: 'x', final: 'i', result: 'xi', char: '西' },
  { initial: 'x', final: 'in', result: 'xin', char: '心' },
  { initial: 'x', final: 'ing', result: 'xing', char: '星' },
  
  // zh 系列
  { initial: 'zh', final: 'a', result: 'zha', char: '炸' },
  { initial: 'zh', final: 'e', result: 'zhe', char: '这' },
  { initial: 'zh', final: 'i', result: 'zhi', char: '知' },
  { initial: 'zh', final: 'u', result: 'zhu', char: '猪' },
  { initial: 'zh', final: 'ai', result: 'zhai', char: '摘' },
  { initial: 'zh', final: 'ei', result: 'zhei', char: '这' },
  { initial: 'zh', final: 'ao', result: 'zhao', char: '找' },
  { initial: 'zh', final: 'ou', result: 'zhou', char: '周' },
  { initial: 'zh', final: 'an', result: 'zhan', char: '站' },
  { initial: 'zh', final: 'en', result: 'zhen', char: '真' },
  { initial: 'zh', final: 'ang', result: 'zhang', char: '张' },
  { initial: 'zh', final: 'eng', result: 'zheng', char: '正' },
  { initial: 'zh', final: 'ong', result: 'zhong', char: '中' },
  
  // ch 系列
  { initial: 'ch', final: 'a', result: 'cha', char: '茶' },
  { initial: 'ch', final: 'e', result: 'che', char: '车' },
  { initial: 'ch', final: 'i', result: 'chi', char: '吃' },
  { initial: 'ch', final: 'u', result: 'chu', char: '出' },
  { initial: 'ch', final: 'ai', result: 'chai', char: '柴' },
  { initial: 'ch', final: 'ao', result: 'chao', char: '超' },
  { initial: 'ch', final: 'ou', result: 'chou', char: '丑' },
  { initial: 'ch', final: 'an', result: 'chan', char: '产' },
  { initial: 'ch', final: 'en', result: 'chen', char: '陈' },
  { initial: 'ch', final: 'ang', result: 'chang', char: '长' },
  { initial: 'ch', final: 'eng', result: 'cheng', char: '城' },
  { initial: 'ch', final: 'ong', result: 'chong', char: '虫' },
  
  // sh 系列
  { initial: 'sh', final: 'a', result: 'sha', char: '沙' },
  { initial: 'sh', final: 'e', result: 'she', char: '蛇' },
  { initial: 'sh', final: 'i', result: 'shi', char: '十' },
  { initial: 'sh', final: 'u', result: 'shu', char: '书' },
  { initial: 'sh', final: 'ai', result: 'shai', char: '晒' },
  { initial: 'sh', final: 'ei', result: 'shei', char: '谁' },
  { initial: 'sh', final: 'ao', result: 'shao', char: '少' },
  { initial: 'sh', final: 'ou', result: 'shou', char: '手' },
  { initial: 'sh', final: 'an', result: 'shan', char: '山' },
  { initial: 'sh', final: 'en', result: 'shen', char: '身' },
  { initial: 'sh', final: 'ang', result: 'shang', char: '上' },
  { initial: 'sh', final: 'eng', result: 'sheng', char: '生' },
  
  // r 系列
  { initial: 'r', final: 'e', result: 're', char: '热' },
  { initial: 'r', final: 'i', result: 'ri', char: '日' },
  { initial: 'r', final: 'u', result: 'ru', char: '入' },
  { initial: 'r', final: 'ao', result: 'rao', char: '绕' },
  { initial: 'r', final: 'ou', result: 'rou', char: '肉' },
  { initial: 'r', final: 'an', result: 'ran', char: '然' },
  { initial: 'r', final: 'en', result: 'ren', char: '人' },
  { initial: 'r', final: 'ang', result: 'rang', char: '让' },
  { initial: 'r', final: 'eng', result: 'reng', char: '扔' },
  { initial: 'r', final: 'ong', result: 'rong', char: '容' },
  
  // z 系列
  { initial: 'z', final: 'a', result: 'za', char: '杂' },
  { initial: 'z', final: 'e', result: 'ze', char: '则' },
  { initial: 'z', final: 'i', result: 'zi', char: '字' },
  { initial: 'z', final: 'u', result: 'zu', char: '足' },
  { initial: 'z', final: 'ai', result: 'zai', char: '在' },
  { initial: 'z', final: 'ei', result: 'zei', char: '贼' },
  { initial: 'z', final: 'ao', result: 'zao', char: '早' },
  { initial: 'z', final: 'ou', result: 'zou', char: '走' },
  { initial: 'z', final: 'an', result: 'zan', char: '赞' },
  { initial: 'z', final: 'en', result: 'zen', char: '怎' },
  { initial: 'z', final: 'ang', result: 'zang', char: '脏' },
  { initial: 'z', final: 'eng', result: 'zeng', char: '增' },
  { initial: 'z', final: 'ong', result: 'zong', char: '总' },
  
  // c 系列
  { initial: 'c', final: 'a', result: 'ca', char: '擦' },
  { initial: 'c', final: 'e', result: 'ce', char: '册' },
  { initial: 'c', final: 'i', result: 'ci', char: '词' },
  { initial: 'c', final: 'u', result: 'cu', char: '粗' },
  { initial: 'c', final: 'ai', result: 'cai', char: '菜' },
  { initial: 'c', final: 'ao', result: 'cao', char: '草' },
  { initial: 'c', final: 'ou', result: 'cou', char: '凑' },
  { initial: 'c', final: 'an', result: 'can', char: '参' },
  { initial: 'c', final: 'en', result: 'cen', char: '岑' },
  { initial: 'c', final: 'ang', result: 'cang', char: '藏' },
  { initial: 'c', final: 'eng', result: 'ceng', char: '层' },
  { initial: 'c', final: 'ong', result: 'cong', char: '从' },
  
  // s 系列
  { initial: 's', final: 'a', result: 'sa', char: '撒' },
  { initial: 's', final: 'e', result: 'se', char: '色' },
  { initial: 's', final: 'i', result: 'si', char: '四' },
  { initial: 's', final: 'u', result: 'su', char: '苏' },
  { initial: 's', final: 'ai', result: 'sai', char: '赛' },
  { initial: 's', final: 'ao', result: 'sao', char: '扫' },
  { initial: 's', final: 'ou', result: 'sou', char: '搜' },
  { initial: 's', final: 'an', result: 'san', char: '三' },
  { initial: 's', final: 'en', result: 'sen', char: '森' },
  { initial: 's', final: 'ang', result: 'sang', char: '桑' },
  { initial: 's', final: 'eng', result: 'seng', char: '僧' },
  { initial: 's', final: 'ong', result: 'song', char: '送' },
  
  // y 系列
  { initial: 'y', final: 'a', result: 'ya', char: '牙' },
  { initial: 'y', final: 'e', result: 'ye', char: '也' },
  { initial: 'y', final: 'i', result: 'yi', char: '一' },
  { initial: 'y', final: 'u', result: 'yu', char: '鱼' },
  { initial: 'y', final: 'ao', result: 'yao', char: '要' },
  { initial: 'y', final: 'ou', result: 'you', char: '有' },
  { initial: 'y', final: 'an', result: 'yan', char: '眼' },
  { initial: 'y', final: 'in', result: 'yin', char: '音' },
  { initial: 'y', final: 'ang', result: 'yang', char: '羊' },
  { initial: 'y', final: 'ing', result: 'ying', char: '英' },
  { initial: 'y', final: 'ong', result: 'yong', char: '用' },
  
  // w 系列
  { initial: 'w', final: 'a', result: 'wa', char: '娃' },
  { initial: 'w', final: 'o', result: 'wo', char: '我' },
  { initial: 'w', final: 'u', result: 'wu', char: '五' },
  { initial: 'w', final: 'ai', result: 'wai', char: '外' },
  { initial: 'w', final: 'ei', result: 'wei', char: '为' },
  { initial: 'w', final: 'an', result: 'wan', char: '万' },
  { initial: 'w', final: 'en', result: 'wen', char: '文' },
  { initial: 'w', final: 'ang', result: 'wang', char: '王' },
  { initial: 'w', final: 'eng', result: 'weng', char: '翁' },
]

// 三拼音节示例 - 大幅扩展
export const threeSpellExamples = [
  // j-i-a 组合
  { initial: 'j', medial: 'i', final: 'a', result: 'jia', char: '家' },
  { initial: 'j', medial: 'i', final: 'an', result: 'jian', char: '见' },
  { initial: 'j', medial: 'i', final: 'ang', result: 'jiang', char: '江' },
  { initial: 'j', medial: 'i', final: 'ao', result: 'jiao', char: '叫' },
  
  // q-i-a 组合
  { initial: 'q', medial: 'i', final: 'a', result: 'qia', char: '恰' },
  { initial: 'q', medial: 'i', final: 'an', result: 'qian', char: '钱' },
  { initial: 'q', medial: 'i', final: 'ang', result: 'qiang', char: '强' },
  { initial: 'q', medial: 'i', final: 'ao', result: 'qiao', char: '桥' },
  
  // x-i-a 组合
  { initial: 'x', medial: 'i', final: 'a', result: 'xia', char: '下' },
  { initial: 'x', medial: 'i', final: 'an', result: 'xian', char: '先' },
  { initial: 'x', medial: 'i', final: 'ang', result: 'xiang', char: '想' },
  { initial: 'x', medial: 'i', final: 'ao', result: 'xiao', char: '小' },
  
  // g-u-a 组合
  { initial: 'g', medial: 'u', final: 'a', result: 'gua', char: '瓜' },
  { initial: 'g', medial: 'u', final: 'ai', result: 'guai', char: '怪' },
  { initial: 'g', medial: 'u', final: 'an', result: 'guan', char: '关' },
  { initial: 'g', medial: 'u', final: 'ang', result: 'guang', char: '光' },
  { initial: 'g', medial: 'u', final: 'o', result: 'guo', char: '国' },
  
  // k-u-a 组合
  { initial: 'k', medial: 'u', final: 'a', result: 'kua', char: '夸' },
  { initial: 'k', medial: 'u', final: 'ai', result: 'kuai', char: '快' },
  { initial: 'k', medial: 'u', final: 'an', result: 'kuan', char: '宽' },
  { initial: 'k', medial: 'u', final: 'ang', result: 'kuang', char: '狂' },
  { initial: 'k', medial: 'u', final: 'o', result: 'kuo', char: '阔' },
  
  // h-u-a 组合
  { initial: 'h', medial: 'u', final: 'a', result: 'hua', char: '花' },
  { initial: 'h', medial: 'u', final: 'ai', result: 'huai', char: '坏' },
  { initial: 'h', medial: 'u', final: 'an', result: 'huan', char: '欢' },
  { initial: 'h', medial: 'u', final: 'ang', result: 'huang', char: '黄' },
  { initial: 'h', medial: 'u', final: 'o', result: 'huo', char: '火' },
  
  // zh-u 组合
  { initial: 'zh', medial: 'u', final: 'a', result: 'zhua', char: '抓' },
  { initial: 'zh', medial: 'u', final: 'ai', result: 'zhuai', char: '拽' },
  { initial: 'zh', medial: 'u', final: 'an', result: 'zhuan', char: '转' },
  { initial: 'zh', medial: 'u', final: 'ang', result: 'zhuang', char: '装' },
  { initial: 'zh', medial: 'u', final: 'o', result: 'zhuo', char: '桌' },
  
  // ch-u 组合
  { initial: 'ch', medial: 'u', final: 'a', result: 'chua', char: '欻' },
  { initial: 'ch', medial: 'u', final: 'ai', result: 'chuai', char: '揣' },
  { initial: 'ch', medial: 'u', final: 'an', result: 'chuan', char: '穿' },
  { initial: 'ch', medial: 'u', final: 'ang', result: 'chuang', char: '窗' },
  { initial: 'ch', medial: 'u', final: 'o', result: 'chuo', char: '绰' },
  
  // sh-u 组合
  { initial: 'sh', medial: 'u', final: 'a', result: 'shua', char: '刷' },
  { initial: 'sh', medial: 'u', final: 'ai', result: 'shuai', char: '帅' },
  { initial: 'sh', medial: 'u', final: 'an', result: 'shuan', char: '栓' },
  { initial: 'sh', medial: 'u', final: 'ang', result: 'shuang', char: '双' },
  { initial: 'sh', medial: 'u', final: 'o', result: 'shuo', char: '说' },
  
  // d-u 组合
  { initial: 'd', medial: 'u', final: 'an', result: 'duan', char: '短' },
  { initial: 'd', medial: 'u', final: 'o', result: 'duo', char: '多' },
  
  // t-u 组合
  { initial: 't', medial: 'u', final: 'an', result: 'tuan', char: '团' },
  { initial: 't', medial: 'u', final: 'o', result: 'tuo', char: '拖' },
  
  // n-u 组合
  { initial: 'n', medial: 'u', final: 'an', result: 'nuan', char: '暖' },
  { initial: 'n', medial: 'u', final: 'o', result: 'nuo', char: '挪' },
  
  // l-u 组合
  { initial: 'l', medial: 'u', final: 'an', result: 'luan', char: '乱' },
  { initial: 'l', medial: 'u', final: 'o', result: 'luo', char: '落' },
  
  // l-ü 组合
  { initial: 'l', medial: 'ü', final: 'e', result: 'lüe', char: '略' },
  { initial: 'l', medial: 'ü', final: 'an', result: 'lüan', char: '滦' },
  
  // n-ü 组合
  { initial: 'n', medial: 'ü', final: 'e', result: 'nüe', char: '虐' },
  
  // b-i 组合
  { initial: 'b', medial: 'i', final: 'an', result: 'bian', char: '边' },
  { initial: 'b', medial: 'i', final: 'ao', result: 'biao', char: '表' },
  { initial: 'b', medial: 'i', final: 'e', result: 'bie', char: '别' },
  
  // p-i 组合
  { initial: 'p', medial: 'i', final: 'an', result: 'pian', char: '片' },
  { initial: 'p', medial: 'i', final: 'ao', result: 'piao', char: '飘' },
  { initial: 'p', medial: 'i', final: 'e', result: 'pie', char: '撇' },
  
  // m-i 组合
  { initial: 'm', medial: 'i', final: 'an', result: 'mian', char: '面' },
  { initial: 'm', medial: 'i', final: 'ao', result: 'miao', char: '妙' },
  { initial: 'm', medial: 'i', final: 'e', result: 'mie', char: '灭' },
  
  // d-i 组合
  { initial: 'd', medial: 'i', final: 'an', result: 'dian', char: '点' },
  { initial: 'd', medial: 'i', final: 'ao', result: 'diao', char: '掉' },
  { initial: 'd', medial: 'i', final: 'e', result: 'die', char: '跌' },
  
  // t-i 组合
  { initial: 't', medial: 'i', final: 'an', result: 'tian', char: '天' },
  { initial: 't', medial: 'i', final: 'ao', result: 'tiao', char: '跳' },
  { initial: 't', medial: 'i', final: 'e', result: 'tie', char: '铁' },
  
  // n-i 组合
  { initial: 'n', medial: 'i', final: 'an', result: 'nian', char: '年' },
  { initial: 'n', medial: 'i', final: 'ao', result: 'niao', char: '鸟' },
  { initial: 'n', medial: 'i', final: 'e', result: 'nie', char: '捏' },
  { initial: 'n', medial: 'i', final: 'ang', result: 'niang', char: '娘' },
  
  // l-i 组合
  { initial: 'l', medial: 'i', final: 'an', result: 'lian', char: '脸' },
  { initial: 'l', medial: 'i', final: 'ao', result: 'liao', char: '了' },
  { initial: 'l', medial: 'i', final: 'e', result: 'lie', char: '列' },
  { initial: 'l', medial: 'i', final: 'ang', result: 'liang', char: '亮' },
]
