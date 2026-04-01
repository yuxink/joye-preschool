import type { PinyinItem } from '../../types'

export const singleVowels: PinyinItem[] = [
  { pinyin: 'a', category: 'singleVowel', tips: '嘴巴张大，舌头放平' },
  { pinyin: 'o', category: 'singleVowel', tips: '嘴巴圆圆，像个圆圈' },
  { pinyin: 'e', category: 'singleVowel', tips: '嘴巴扁扁，像微笑' },
  { pinyin: 'i', category: 'singleVowel', tips: '嘴巴咧开，牙齿轻合' },
  { pinyin: 'u', category: 'singleVowel', tips: '嘴巴噘起，像吹蜡烛' },
  { pinyin: 'ü', category: 'singleVowel', tips: '嘴巴噘起，像吹口哨' },
]

export const compoundVowels: PinyinItem[] = [
  { pinyin: 'ai', category: 'compoundVowel', tips: '先发a，再滑向i' },
  { pinyin: 'ei', category: 'compoundVowel', tips: '先发e，再滑向i' },
  { pinyin: 'ui', category: 'compoundVowel', tips: '先发u，再滑向i' },
  { pinyin: 'ao', category: 'compoundVowel', tips: '先发a，再滑向o' },
  { pinyin: 'ou', category: 'compoundVowel', tips: '先发o，再滑向u' },
  { pinyin: 'iu', category: 'compoundVowel', tips: '先发i，再滑向u' },
  { pinyin: 'ie', category: 'compoundVowel', tips: '先发i，再滑向e' },
  { pinyin: 'üe', category: 'compoundVowel', tips: '先发ü，再滑向e' },
  { pinyin: 'er', category: 'compoundVowel', tips: '舌头卷起，像"儿"' },
]

export const frontNasalVowels: PinyinItem[] = [
  { pinyin: 'an', category: 'nasalVowel', tips: '舌尖顶上牙龈，气流从鼻子出' },
  { pinyin: 'en', category: 'nasalVowel', tips: '舌尖顶上牙龈，发"恩"的音' },
  { pinyin: 'in', category: 'nasalVowel', tips: '先发i，舌尖顶上牙龈' },
  { pinyin: 'un', category: 'nasalVowel', tips: '先发u，舌尖顶上牙龈' },
  { pinyin: 'ün', category: 'nasalVowel', tips: '先发ü，舌尖顶上牙龈' },
]

export const backNasalVowels: PinyinItem[] = [
  { pinyin: 'ang', category: 'nasalVowel', tips: '舌根抬起，气流从鼻子出' },
  { pinyin: 'eng', category: 'nasalVowel', tips: '舌根抬起，发"嗯"的音' },
  { pinyin: 'ing', category: 'nasalVowel', tips: '先发i，舌根抬起' },
  { pinyin: 'ong', category: 'nasalVowel', tips: '嘴巴圆圆，舌根抬起' },
]

export const allVowels = [
  ...singleVowels,
  ...compoundVowels,
  ...frontNasalVowels,
  ...backNasalVowels,
]

export const vowelCategories = {
  single: { name: '单韵母', emoji: '🔴', items: singleVowels },
  compound: { name: '复韵母', emoji: '🟠', items: compoundVowels },
  frontNasal: { name: '前鼻韵母', emoji: '🟡', items: frontNasalVowels },
  backNasal: { name: '后鼻韵母', emoji: '🟢', items: backNasalVowels },
}
