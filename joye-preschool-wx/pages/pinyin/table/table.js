const pinyin = require('../../../data/pinyin')
const { speakPinyin } = require('../../../utils/audio')

const toneClassMap = {
  1: 'tone-1',
  2: 'tone-2',
  3: 'tone-3',
  4: 'tone-4'
}

Page({
  data: {
    singleVowels: pinyin.singleVowels,
    specialVowels: pinyin.specialVowels,
    compoundVowels: pinyin.compoundVowels,
    frontNasalVowels: pinyin.frontNasalVowels,
    backNasalVowels: pinyin.backNasalVowels,
    initials: pinyin.initials,
    wholeSyllables: pinyin.wholeSyllables,
    tones: (pinyin.tones || []).map(item => ({
      ...item,
      toneClass: toneClassMap[item.tone] || ''
    })),
    autoPlaying: false
  },

  play(e) {
    speakPinyin(e.currentTarget.dataset.pinyin)
  },

  playTone(e) {
    const toneExample = e.currentTarget.dataset.example || ''
    const pinyinText = toneExample.split(' ')[0]
    if (pinyinText) speakPinyin(pinyinText)
  },

  async autoPlaySection(e) {
    if (this.data.autoPlaying) return

    const section = e.currentTarget.dataset.section
    const list = this.data[section] || []
    if (!list.length) return

    this.setData({ autoPlaying: true })
    for (let i = 0; i < list.length; i++) {
      speakPinyin(list[i].pinyin)
      await new Promise(resolve => setTimeout(resolve, 700))
    }
    this.setData({ autoPlaying: false })
  }
})
