export const correctEncouragements = [
  '太棒了！',
  '真聪明！',
  '答对了！',
  '你真厉害！',
  '非常好！',
  '继续加油！',
  '好极了！',
  '真了不起！',
  '太厉害了！',
  '你是最棒的！',
]

export const wrongEncouragements = [
  '再想想看',
  '加油哦',
  '没关系，再试试',
  '别灰心',
  '仔细看看题目',
]

export const completionMessages = [
  '完成了！太棒了！',
  '全部做完啦！',
  '你真努力！',
  '今天的练习完成了！',
]

export function getRandomEncouragement(type: 'correct' | 'wrong' | 'completion'): string {
  const messages = type === 'correct' 
    ? correctEncouragements 
    : type === 'wrong'
    ? wrongEncouragements
    : completionMessages
  
  return messages[Math.floor(Math.random() * messages.length)]
}

export const numberWords: Record<number, string> = {
  0: '零',
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
  7: '七',
  8: '八',
  9: '九',
  10: '十',
  11: '十一',
  12: '十二',
  13: '十三',
  14: '十四',
  15: '十五',
  16: '十六',
  17: '十七',
  18: '十八',
  19: '十九',
  20: '二十',
}

export const fruitEmojis = ['🍎', '🍊', '🍋', '🍇', '🍓', '🍑', '🍒', '🥝', '🍌', '🍉']
export const animalEmojis = ['🐶', '🐱', '🐰', '🐻', '🐼', '🐨', '🦁', '🐯', '🐮', '🐷']
export const objectEmojis = ['⭐', '🌙', '☀️', '🌈', '🎈', '🎀', '🎁', '💎', '🔔', '🌸']
