const { singleVowels, compoundVowels, frontNasalVowels, backNasalVowels } = require('../../../data/pinyin')
const { speakPinyin } = require('../../../utils/audio')

Page({
  data: {
    tabs: ['单韵母', '复韵母', '前鼻韵母', '后鼻韵母'],
    currentTab: 0,
    vowels: []
  },
  onLoad() {
    this.setData({ vowels: singleVowels })
  },
  switchTab(e) {
    const index = e.currentTarget.dataset.index
    const vowelGroups = [singleVowels, compoundVowels, frontNasalVowels, backNasalVowels]
    this.setData({ currentTab: index, vowels: vowelGroups[index] })
  },
  playVowel(e) {
    const pinyin = e.currentTarget.dataset.pinyin
    speakPinyin(pinyin)
  }
})
