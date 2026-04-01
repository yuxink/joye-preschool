import type { ToneType } from '../../types'

export interface PinyinCharPair {
  pinyin: string
  tone: ToneType
  char: string
  image?: string
}

export const pinyinCharPairs: PinyinCharPair[] = [
  // ===== 家庭人物 =====
  { pinyin: 'ma', tone: 1, char: '妈', image: '👩' },
  { pinyin: 'ba', tone: 4, char: '爸', image: '👨' },
  { pinyin: 'ye', tone: 2, char: '爷', image: '👴' },
  { pinyin: 'nai', tone: 3, char: '奶', image: '👵' },
  { pinyin: 'ge', tone: 1, char: '哥', image: '👦' },
  { pinyin: 'jie', tone: 3, char: '姐', image: '👧' },
  { pinyin: 'di', tone: 4, char: '弟', image: '👦' },
  { pinyin: 'mei', tone: 4, char: '妹', image: '👧' },
  { pinyin: 'wo', tone: 3, char: '我', image: '🙋' },
  { pinyin: 'ni', tone: 3, char: '你', image: '🧑' },
  { pinyin: 'ta', tone: 1, char: '他', image: '👤' },
  { pinyin: 'ren', tone: 2, char: '人', image: '🧑' },
  
  // ===== 动物 =====
  { pinyin: 'ma', tone: 3, char: '马', image: '🐴' },
  { pinyin: 'gou', tone: 3, char: '狗', image: '🐕' },
  { pinyin: 'mao', tone: 1, char: '猫', image: '🐱' },
  { pinyin: 'niao', tone: 3, char: '鸟', image: '🐦' },
  { pinyin: 'yu', tone: 2, char: '鱼', image: '🐟' },
  { pinyin: 'niu', tone: 2, char: '牛', image: '🐄' },
  { pinyin: 'yang', tone: 2, char: '羊', image: '🐑' },
  { pinyin: 'zhu', tone: 1, char: '猪', image: '🐷' },
  { pinyin: 'ji', tone: 1, char: '鸡', image: '🐔' },
  { pinyin: 'ya', tone: 1, char: '鸭', image: '🦆' },
  { pinyin: 'e', tone: 2, char: '鹅', image: '🦢' },
  { pinyin: 'tu', tone: 4, char: '兔', image: '🐰' },
  { pinyin: 'shu', tone: 3, char: '鼠', image: '🐭' },
  { pinyin: 'long', tone: 2, char: '龙', image: '🐲' },
  { pinyin: 'she', tone: 2, char: '蛇', image: '🐍' },
  { pinyin: 'hu', tone: 3, char: '虎', image: '🐯' },
  { pinyin: 'xiong', tone: 2, char: '熊', image: '🐻' },
  { pinyin: 'shi', tone: 1, char: '狮', image: '🦁' },
  { pinyin: 'xiang', tone: 4, char: '象', image: '🐘' },
  { pinyin: 'hou', tone: 2, char: '猴', image: '🐒' },
  { pinyin: 'lang', tone: 2, char: '狼', image: '🐺' },
  { pinyin: 'wa', tone: 1, char: '蛙', image: '🐸' },
  { pinyin: 'feng', tone: 4, char: '蜂', image: '🐝' },
  { pinyin: 'die', tone: 2, char: '蝶', image: '🦋' },
  
  // ===== 水果蔬菜 =====
  { pinyin: 'ping', tone: 2, char: '苹', image: '🍎' },
  { pinyin: 'guo', tone: 3, char: '果', image: '🍎' },
  { pinyin: 'xiang', tone: 1, char: '香', image: '🍌' },
  { pinyin: 'jiao', tone: 1, char: '蕉', image: '🍌' },
  { pinyin: 'pu', tone: 2, char: '葡', image: '🍇' },
  { pinyin: 'tao', tone: 2, char: '桃', image: '🍑' },
  { pinyin: 'xi', tone: 1, char: '西', image: '🍉' },
  { pinyin: 'gua', tone: 1, char: '瓜', image: '🍉' },
  { pinyin: 'cao', tone: 3, char: '草', image: '🍓' },
  { pinyin: 'mei', tone: 2, char: '梅', image: '🌸' },
  { pinyin: 'ju', tone: 2, char: '橘', image: '🍊' },
  { pinyin: 'li', tone: 2, char: '梨', image: '🍐' },
  { pinyin: 'ying', tone: 1, char: '樱', image: '🍒' },
  { pinyin: 'tao', tone: 2, char: '桃', image: '🍒' },
  { pinyin: 'mang', tone: 2, char: '芒', image: '🥭' },
  { pinyin: 'cai', tone: 4, char: '菜', image: '🥬' },
  { pinyin: 'luo', tone: 2, char: '萝', image: '🥕' },
  { pinyin: 'bo', tone: 2, char: '卜', image: '🥕' },
  { pinyin: 'fan', tone: 1, char: '番', image: '🍅' },
  { pinyin: 'qie', tone: 2, char: '茄', image: '🍆' },
  { pinyin: 'dou', tone: 4, char: '豆', image: '🫘' },
  { pinyin: 'yu', tone: 4, char: '芋', image: '🥔' },
  
  // ===== 自然 =====
  { pinyin: 'hua', tone: 1, char: '花', image: '🌺' },
  { pinyin: 'shu', tone: 4, char: '树', image: '🌲' },
  { pinyin: 'ye', tone: 4, char: '叶', image: '🍃' },
  { pinyin: 'cao', tone: 3, char: '草', image: '🌿' },
  { pinyin: 'yue', tone: 4, char: '月', image: '🌙' },
  { pinyin: 'xing', tone: 1, char: '星', image: '⭐' },
  { pinyin: 'tai', tone: 4, char: '太', image: '☀️' },
  { pinyin: 'yang', tone: 2, char: '阳', image: '☀️' },
  { pinyin: 'ri', tone: 4, char: '日', image: '☀️' },
  { pinyin: 'yun', tone: 2, char: '云', image: '☁️' },
  { pinyin: 'yu', tone: 3, char: '雨', image: '🌧️' },
  { pinyin: 'xue', tone: 3, char: '雪', image: '❄️' },
  { pinyin: 'feng', tone: 1, char: '风', image: '💨' },
  { pinyin: 'shui', tone: 3, char: '水', image: '💧' },
  { pinyin: 'huo', tone: 3, char: '火', image: '🔥' },
  { pinyin: 'shan', tone: 1, char: '山', image: '⛰️' },
  { pinyin: 'he', tone: 2, char: '河', image: '🏞️' },
  { pinyin: 'hai', tone: 3, char: '海', image: '🌊' },
  { pinyin: 'tian', tone: 1, char: '天', image: '🌤️' },
  { pinyin: 'di', tone: 4, char: '地', image: '🌍' },
  { pinyin: 'shi', tone: 2, char: '石', image: '🪨' },
  { pinyin: 'tu', tone: 3, char: '土', image: '🟤' },
  
  // ===== 身体部位 =====
  { pinyin: 'tou', tone: 2, char: '头', image: '👤' },
  { pinyin: 'shou', tone: 3, char: '手', image: '✋' },
  { pinyin: 'jiao', tone: 3, char: '脚', image: '🦶' },
  { pinyin: 'yan', tone: 3, char: '眼', image: '👁️' },
  { pinyin: 'er', tone: 3, char: '耳', image: '👂' },
  { pinyin: 'kou', tone: 3, char: '口', image: '👄' },
  { pinyin: 'zui', tone: 3, char: '嘴', image: '👄' },
  { pinyin: 'bi', tone: 2, char: '鼻', image: '👃' },
  { pinyin: 'lian', tone: 3, char: '脸', image: '😊' },
  { pinyin: 'ya', tone: 2, char: '牙', image: '🦷' },
  { pinyin: 'fa', tone: 4, char: '发', image: '💇' },
  { pinyin: 'bei', tone: 4, char: '背', image: '🧍' },
  { pinyin: 'xin', tone: 1, char: '心', image: '❤️' },
  { pinyin: 'du', tone: 4, char: '肚', image: '🫃' },
  
  // ===== 数字 =====
  { pinyin: 'yi', tone: 1, char: '一', image: '1️⃣' },
  { pinyin: 'er', tone: 4, char: '二', image: '2️⃣' },
  { pinyin: 'san', tone: 1, char: '三', image: '3️⃣' },
  { pinyin: 'si', tone: 4, char: '四', image: '4️⃣' },
  { pinyin: 'wu', tone: 3, char: '五', image: '5️⃣' },
  { pinyin: 'liu', tone: 4, char: '六', image: '6️⃣' },
  { pinyin: 'qi', tone: 1, char: '七', image: '7️⃣' },
  { pinyin: 'ba', tone: 1, char: '八', image: '8️⃣' },
  { pinyin: 'jiu', tone: 3, char: '九', image: '9️⃣' },
  { pinyin: 'shi', tone: 2, char: '十', image: '🔟' },
  { pinyin: 'bai', tone: 3, char: '百', image: '💯' },
  { pinyin: 'qian', tone: 1, char: '千', image: '🔢' },
  
  // ===== 颜色 =====
  { pinyin: 'hong', tone: 2, char: '红', image: '🔴' },
  { pinyin: 'huang', tone: 2, char: '黄', image: '🟡' },
  { pinyin: 'lan', tone: 2, char: '蓝', image: '🔵' },
  { pinyin: 'lü', tone: 4, char: '绿', image: '🟢' },
  { pinyin: 'bai', tone: 2, char: '白', image: '⚪' },
  { pinyin: 'hei', tone: 1, char: '黑', image: '⚫' },
  { pinyin: 'zi', tone: 3, char: '紫', image: '🟣' },
  { pinyin: 'cheng', tone: 2, char: '橙', image: '🟠' },
  { pinyin: 'fen', tone: 3, char: '粉', image: '🩷' },
  { pinyin: 'hui', tone: 1, char: '灰', image: '🩶' },
  
  // ===== 交通工具 =====
  { pinyin: 'che', tone: 1, char: '车', image: '🚗' },
  { pinyin: 'chuan', tone: 2, char: '船', image: '🚢' },
  { pinyin: 'fei', tone: 1, char: '飞', image: '✈️' },
  { pinyin: 'ji', tone: 1, char: '机', image: '✈️' },
  { pinyin: 'huo', tone: 3, char: '火', image: '🚂' },
  { pinyin: 'gong', tone: 1, char: '公', image: '🚌' },
  { pinyin: 'jiao', tone: 3, char: '交', image: '🚌' },
  { pinyin: 'di', tone: 4, char: '地', image: '🚇' },
  { pinyin: 'tie', tone: 3, char: '铁', image: '🚇' },
  { pinyin: 'dan', tone: 1, char: '单', image: '🚲' },
  
  // ===== 物品 =====
  { pinyin: 'men', tone: 2, char: '门', image: '🚪' },
  { pinyin: 'chuang', tone: 1, char: '窗', image: '🪟' },
  { pinyin: 'chuang', tone: 2, char: '床', image: '🛏️' },
  { pinyin: 'zhuo', tone: 1, char: '桌', image: '🪑' },
  { pinyin: 'yi', tone: 3, char: '椅', image: '🪑' },
  { pinyin: 'deng', tone: 1, char: '灯', image: '💡' },
  { pinyin: 'bei', tone: 1, char: '杯', image: '🥤' },
  { pinyin: 'wan', tone: 3, char: '碗', image: '🥣' },
  { pinyin: 'pan', tone: 2, char: '盘', image: '🍽️' },
  { pinyin: 'kuai', tone: 4, char: '筷', image: '🥢' },
  { pinyin: 'dian', tone: 4, char: '电', image: '📺' },
  { pinyin: 'shi', tone: 4, char: '视', image: '📺' },
  { pinyin: 'dian', tone: 4, char: '电', image: '📱' },
  { pinyin: 'hua', tone: 4, char: '话', image: '📱' },
  { pinyin: 'nao', tone: 3, char: '脑', image: '💻' },
  { pinyin: 'biao', tone: 3, char: '表', image: '⌚' },
  { pinyin: 'zhong', tone: 1, char: '钟', image: '🕐' },
  
  // ===== 学习用品 =====
  { pinyin: 'shu', tone: 1, char: '书', image: '📚' },
  { pinyin: 'bi', tone: 3, char: '笔', image: '✏️' },
  { pinyin: 'zhi', tone: 3, char: '纸', image: '📄' },
  { pinyin: 'ben', tone: 3, char: '本', image: '📓' },
  { pinyin: 'bao', tone: 1, char: '包', image: '🎒' },
  { pinyin: 'chi', tone: 3, char: '尺', image: '📏' },
  { pinyin: 'pi', tone: 2, char: '皮', image: '✏️' },
  { pinyin: 'xiang', tone: 4, char: '橡', image: '🧽' },
  
  // ===== 食物饮料 =====
  { pinyin: 'mi', tone: 3, char: '米', image: '🍚' },
  { pinyin: 'fan', tone: 4, char: '饭', image: '🍚' },
  { pinyin: 'mian', tone: 4, char: '面', image: '🍜' },
  { pinyin: 'tiao', tone: 2, char: '条', image: '🍜' },
  { pinyin: 'bao', tone: 1, char: '包', image: '🍞' },
  { pinyin: 'dan', tone: 4, char: '蛋', image: '🥚' },
  { pinyin: 'nai', tone: 3, char: '奶', image: '🥛' },
  { pinyin: 'rou', tone: 4, char: '肉', image: '🥩' },
  { pinyin: 'tang', tone: 1, char: '汤', image: '🍲' },
  { pinyin: 'cha', tone: 2, char: '茶', image: '🍵' },
  { pinyin: 'ka', tone: 1, char: '咖', image: '☕' },
  { pinyin: 'fei', tone: 1, char: '啡', image: '☕' },
  { pinyin: 'tang', tone: 2, char: '糖', image: '🍬' },
  { pinyin: 'gao', tone: 1, char: '糕', image: '🎂' },
  { pinyin: 'bing', tone: 1, char: '冰', image: '🧊' },
  { pinyin: 'qi', tone: 2, char: '淇', image: '🍦' },
  { pinyin: 'lin', tone: 2, char: '淋', image: '🍦' },
  
  // ===== 动作 =====
  { pinyin: 'chi', tone: 1, char: '吃', image: '🍽️' },
  { pinyin: 'he', tone: 1, char: '喝', image: '🥤' },
  { pinyin: 'shui', tone: 4, char: '睡', image: '😴' },
  { pinyin: 'jiao', tone: 4, char: '觉', image: '😴' },
  { pinyin: 'kan', tone: 4, char: '看', image: '👀' },
  { pinyin: 'ting', tone: 1, char: '听', image: '👂' },
  { pinyin: 'shuo', tone: 1, char: '说', image: '💬' },
  { pinyin: 'xie', tone: 3, char: '写', image: '✍️' },
  { pinyin: 'du', tone: 2, char: '读', image: '📖' },
  { pinyin: 'zou', tone: 3, char: '走', image: '🚶' },
  { pinyin: 'pao', tone: 3, char: '跑', image: '🏃' },
  { pinyin: 'tiao', tone: 4, char: '跳', image: '🦘' },
  { pinyin: 'zuo', tone: 4, char: '坐', image: '🪑' },
  { pinyin: 'zhan', tone: 4, char: '站', image: '🧍' },
  { pinyin: 'xiao', tone: 4, char: '笑', image: '😀' },
  { pinyin: 'ku', tone: 1, char: '哭', image: '😢' },
  { pinyin: 'chang', tone: 4, char: '唱', image: '🎤' },
  { pinyin: 'ge', tone: 1, char: '歌', image: '🎵' },
  { pinyin: 'tiao', tone: 4, char: '跳', image: '💃' },
  { pinyin: 'wu', tone: 3, char: '舞', image: '💃' },
  { pinyin: 'hua', tone: 4, char: '画', image: '🎨' },
  { pinyin: 'da', tone: 3, char: '打', image: '👊' },
  { pinyin: 'ti', tone: 1, char: '踢', image: '⚽' },
  { pinyin: 'you', tone: 2, char: '游', image: '🏊' },
  { pinyin: 'yong', tone: 3, char: '泳', image: '🏊' },
  { pinyin: 'fei', tone: 1, char: '飞', image: '🕊️' },
  { pinyin: 'pa', tone: 2, char: '爬', image: '🧗' },
  
  // ===== 形容词 =====
  { pinyin: 'da', tone: 4, char: '大', image: '🐘' },
  { pinyin: 'xiao', tone: 3, char: '小', image: '🐜' },
  { pinyin: 'gao', tone: 1, char: '高', image: '🦒' },
  { pinyin: 'ai', tone: 3, char: '矮', image: '🐁' },
  { pinyin: 'chang', tone: 2, char: '长', image: '🐍' },
  { pinyin: 'duan', tone: 3, char: '短', image: '🪱' },
  { pinyin: 'kuai', tone: 4, char: '快', image: '🐇' },
  { pinyin: 'man', tone: 4, char: '慢', image: '🐢' },
  { pinyin: 'hao', tone: 3, char: '好', image: '👍' },
  { pinyin: 'huai', tone: 4, char: '坏', image: '👎' },
  { pinyin: 're', tone: 4, char: '热', image: '🥵' },
  { pinyin: 'leng', tone: 3, char: '冷', image: '🥶' },
  { pinyin: 'pang', tone: 4, char: '胖', image: '🐷' },
  { pinyin: 'shou', tone: 4, char: '瘦', image: '🦴' },
  { pinyin: 'xin', tone: 1, char: '新', image: '✨' },
  { pinyin: 'jiu', tone: 4, char: '旧', image: '📦' },
  { pinyin: 'duo', tone: 1, char: '多', image: '➕' },
  { pinyin: 'shao', tone: 3, char: '少', image: '➖' },
  { pinyin: 'yuan', tone: 3, char: '远', image: '🔭' },
  { pinyin: 'jin', tone: 4, char: '近', image: '👁️' },
  { pinyin: 'nan', tone: 2, char: '难', image: '😰' },
  { pinyin: 'yi', tone: 4, char: '易', image: '😌' },
  
  // ===== 衣物 =====
  { pinyin: 'yi', tone: 1, char: '衣', image: '👕' },
  { pinyin: 'fu', tone: 2, char: '服', image: '👕' },
  { pinyin: 'ku', tone: 4, char: '裤', image: '👖' },
  { pinyin: 'qun', tone: 2, char: '裙', image: '👗' },
  { pinyin: 'xie', tone: 2, char: '鞋', image: '👟' },
  { pinyin: 'mao', tone: 4, char: '帽', image: '🧢' },
  { pinyin: 'wa', tone: 4, char: '袜', image: '🧦' },
  { pinyin: 'wai', tone: 4, char: '外', image: '🧥' },
  { pinyin: 'tao', tone: 4, char: '套', image: '🧥' },
  
  // ===== 其他常用 =====
  { pinyin: 'jia', tone: 1, char: '家', image: '🏠' },
  { pinyin: 'xue', tone: 2, char: '学', image: '📚' },
  { pinyin: 'xiao', tone: 4, char: '校', image: '🏫' },
  { pinyin: 'yuan', tone: 2, char: '园', image: '🏡' },
  { pinyin: 'shi', tone: 4, char: '市', image: '🏙️' },
  { pinyin: 'guo', tone: 2, char: '国', image: '🌏' },
  { pinyin: 'zhong', tone: 1, char: '中', image: '🇨🇳' },
  { pinyin: 'ai', tone: 4, char: '爱', image: '❤️' },
  { pinyin: 'xi', tone: 3, char: '喜', image: '😊' },
  { pinyin: 'huan', tone: 1, char: '欢', image: '😊' },
  { pinyin: 'le', tone: 4, char: '乐', image: '🎉' },
  { pinyin: 'wan', tone: 2, char: '玩', image: '🎮' },
  { pinyin: 'you', tone: 2, char: '游', image: '🎮' },
  { pinyin: 'xi', tone: 4, char: '戏', image: '🎭' },
  { pinyin: 'zao', tone: 3, char: '早', image: '🌅' },
  { pinyin: 'wan', tone: 3, char: '晚', image: '🌆' },
  { pinyin: 'shang', tone: 4, char: '上', image: '⬆️' },
  { pinyin: 'xia', tone: 4, char: '下', image: '⬇️' },
  { pinyin: 'qian', tone: 2, char: '前', image: '⏩' },
  { pinyin: 'hou', tone: 4, char: '后', image: '⏪' },
  { pinyin: 'zuo', tone: 3, char: '左', image: '⬅️' },
  { pinyin: 'you', tone: 4, char: '右', image: '➡️' },
  { pinyin: 'li', tone: 3, char: '里', image: '📥' },
  { pinyin: 'wai', tone: 4, char: '外', image: '📤' },
]

export const flatCurledPairs = [
  { flat: { pinyin: 'zi', char: '字', image: '🔤' }, curled: { pinyin: 'zhi', char: '纸', image: '📄' } },
  { flat: { pinyin: 'ci', char: '刺', image: '🌵' }, curled: { pinyin: 'chi', char: '吃', image: '🍽️' } },
  { flat: { pinyin: 'si', char: '四', image: '4️⃣' }, curled: { pinyin: 'shi', char: '十', image: '🔟' } },
  { flat: { pinyin: 'zu', char: '足', image: '🦶' }, curled: { pinyin: 'zhu', char: '猪', image: '🐷' } },
  { flat: { pinyin: 'cu', char: '粗', image: '🪵' }, curled: { pinyin: 'chu', char: '出', image: '🚪' } },
  { flat: { pinyin: 'su', char: '素', image: '🥬' }, curled: { pinyin: 'shu', char: '书', image: '📚' } },
  { flat: { pinyin: 'san', char: '三', image: '3️⃣' }, curled: { pinyin: 'shan', char: '山', image: '⛰️' } },
  { flat: { pinyin: 'cai', char: '菜', image: '🥬' }, curled: { pinyin: 'chai', char: '柴', image: '🪵' } },
  { flat: { pinyin: 'se', char: '色', image: '🎨' }, curled: { pinyin: 'she', char: '蛇', image: '🐍' } },
  { flat: { pinyin: 'sa', char: '撒', image: '🌾' }, curled: { pinyin: 'sha', char: '沙', image: '🏖️' } },
  { flat: { pinyin: 'suo', char: '锁', image: '🔒' }, curled: { pinyin: 'shuo', char: '说', image: '💬' } },
  { flat: { pinyin: 'ceng', char: '层', image: '🏢' }, curled: { pinyin: 'cheng', char: '城', image: '🏰' } },
  { flat: { pinyin: 'zan', char: '赞', image: '👍' }, curled: { pinyin: 'zhan', char: '站', image: '🧍' } },
  { flat: { pinyin: 'zong', char: '总', image: '📊' }, curled: { pinyin: 'zhong', char: '中', image: '🎯' } },
  { flat: { pinyin: 'cong', char: '从', image: '👥' }, curled: { pinyin: 'chong', char: '虫', image: '🐛' } },
  { flat: { pinyin: 'song', char: '送', image: '📦' }, curled: { pinyin: 'shang', char: '上', image: '⬆️' } },
]

// 按主题获取拼音字符对
export function getPinyinCharPairsByCategory(category: string): PinyinCharPair[] {
  const categories: Record<string, string[]> = {
    '动物': ['马', '狗', '猫', '鸟', '鱼', '牛', '羊', '猪', '鸡', '鸭', '鹅', '兔', '鼠', '龙', '蛇', '虎', '熊', '狮', '象', '猴', '狼', '蛙', '蜂', '蝶'],
    '水果': ['苹', '果', '香', '蕉', '葡', '桃', '西', '瓜', '草', '梅', '橘', '梨', '樱', '芒'],
    '颜色': ['红', '黄', '蓝', '绿', '白', '黑', '紫', '橙', '粉', '灰'],
    '数字': ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '百', '千'],
    '身体': ['头', '手', '脚', '眼', '耳', '口', '嘴', '鼻', '脸', '牙', '发', '背', '心', '肚'],
    '家庭': ['妈', '爸', '爷', '奶', '哥', '姐', '弟', '妹', '我', '你', '他'],
  }
  
  const chars = categories[category] || []
  return pinyinCharPairs.filter(p => chars.includes(p.char))
}

export function getRandomPinyinCharPairs(count: number): PinyinCharPair[] {
  const shuffled = [...pinyinCharPairs].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export function getPinyinCharPairsByTone(tone: ToneType): PinyinCharPair[] {
  return pinyinCharPairs.filter(p => p.tone === tone)
}

export function getUniquePinyinCharPairs(count: number): PinyinCharPair[] {
  const uniqueChars = new Set<string>()
  const result: PinyinCharPair[] = []
  const shuffled = [...pinyinCharPairs].sort(() => Math.random() - 0.5)
  
  for (const pair of shuffled) {
    if (!uniqueChars.has(pair.char) && result.length < count) {
      uniqueChars.add(pair.char)
      result.push(pair)
    }
  }
  
  return result
}
