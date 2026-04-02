const { sentencePatterns } = require('../../../data/english')
const { speakEnglish } = require('../../../utils/audio')
Page({
  data: { patterns: sentencePatterns, currentCategory: 0 },
  switchCategory(e) { this.setData({ currentCategory: e.currentTarget.dataset.index }) },
  playSentence(e) { speakEnglish(e.currentTarget.dataset.sentence) }
})
