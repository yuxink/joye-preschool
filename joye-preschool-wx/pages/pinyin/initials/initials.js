const { initials } = require('../../../data/pinyin')
const { speakPinyin } = require('../../../utils/audio')
Page({
  data: { initials },
  onLoad() {},
  playInitial(e) { speakPinyin(e.currentTarget.dataset.pinyin) }
})
