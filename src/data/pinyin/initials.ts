import type { PinyinItem } from '../../types'

export const labialInitials: PinyinItem[] = [
  { pinyin: 'b', category: 'initial', tips: '双唇紧闭，气流冲开' },
  { pinyin: 'p', category: 'initial', tips: '双唇紧闭，送气音' },
  { pinyin: 'm', category: 'initial', tips: '双唇紧闭，气流从鼻出' },
  { pinyin: 'f', category: 'initial', tips: '上齿咬下唇，气流摩擦' },
]

export const alveolarInitials: PinyinItem[] = [
  { pinyin: 'd', category: 'initial', tips: '舌尖顶上牙龈，气流冲开' },
  { pinyin: 't', category: 'initial', tips: '舌尖顶上牙龈，送气音' },
  { pinyin: 'n', category: 'initial', tips: '舌尖顶上牙龈，气流从鼻出' },
  { pinyin: 'l', category: 'initial', tips: '舌尖顶上牙龈，气流从两边出' },
]

export const velarInitials: PinyinItem[] = [
  { pinyin: 'g', category: 'initial', tips: '舌根抬起，气流冲开' },
  { pinyin: 'k', category: 'initial', tips: '舌根抬起，送气音' },
  { pinyin: 'h', category: 'initial', tips: '舌根接近软腭，气流摩擦' },
]

export const palatalInitials: PinyinItem[] = [
  { pinyin: 'j', category: 'initial', tips: '舌面抬起，气流冲开' },
  { pinyin: 'q', category: 'initial', tips: '舌面抬起，送气音' },
  { pinyin: 'x', category: 'initial', tips: '舌面接近上腭，气流摩擦' },
]

export const flatInitials: PinyinItem[] = [
  { pinyin: 'z', category: 'initial', tips: '舌尖平伸，气流摩擦（平舌音）', isFlat: true },
  { pinyin: 'c', category: 'initial', tips: '舌尖平伸，送气音（平舌音）', isFlat: true },
  { pinyin: 's', category: 'initial', tips: '舌尖平伸，气流摩擦（平舌音）', isFlat: true },
]

export const curledInitials: PinyinItem[] = [
  { pinyin: 'zh', category: 'initial', tips: '舌尖翘起，气流冲开（翘舌音）', isCurled: true },
  { pinyin: 'ch', category: 'initial', tips: '舌尖翘起，送气音（翘舌音）', isCurled: true },
  { pinyin: 'sh', category: 'initial', tips: '舌尖翘起，气流摩擦（翘舌音）', isCurled: true },
  { pinyin: 'r', category: 'initial', tips: '舌尖翘起，气流微弱（翘舌音）', isCurled: true },
]

export const specialInitials: PinyinItem[] = [
  { pinyin: 'y', category: 'initial', tips: '发音接近"衣"，做声母用' },
  { pinyin: 'w', category: 'initial', tips: '发音接近"乌"，做声母用' },
]

export const allInitials = [
  ...labialInitials,
  ...alveolarInitials,
  ...velarInitials,
  ...palatalInitials,
  ...flatInitials,
  ...curledInitials,
  ...specialInitials,
]

export const initialCategories = {
  labial: { name: '唇音', emoji: '👄', items: labialInitials },
  alveolar: { name: '舌尖音', emoji: '👅', items: alveolarInitials },
  velar: { name: '舌根音', emoji: '🗣️', items: velarInitials },
  palatal: { name: '舌面音', emoji: '😊', items: palatalInitials },
  flat: { name: '平舌音', emoji: '➖', items: flatInitials },
  curled: { name: '翘舌音', emoji: '↗️', items: curledInitials },
  special: { name: '特殊声母', emoji: '⭐', items: specialInitials },
}

export const flatVsCurled = [
  { flat: 'z', curled: 'zh', example: { flat: 'zī (资)', curled: 'zhī (知)' } },
  { flat: 'c', curled: 'ch', example: { flat: 'cā (擦)', curled: 'chā (插)' } },
  { flat: 's', curled: 'sh', example: { flat: 'sī (丝)', curled: 'shī (师)' } },
]
