// 单词闪卡页面
const { categories, words } = require('../../../data/english')
const { speakEnglish } = require('../../../utils/audio')

Page({
  data: {
    categories,
    currentCategory: 'all',
    filteredWords: [],
    currentIndex: 0,
    currentWord: null,
    isFlipped: false
  },

  autoPlayTimers: [],
  autoPlaySessionId: 0,

  onLoad() {
    this.filterWords()
  },

  onUnload() {
    this.stopAutoPlayQueue()
  },

  stopAutoPlayQueue() {
    this.autoPlaySessionId += 1
    this.autoPlayTimers.forEach(timer => clearTimeout(timer))
    this.autoPlayTimers = []
  },

  getSpeechDelay(text) {
    const len = (text || '').length
    // 略增缓冲，降低连续句子被“正在播放”拦截的概率
    return Math.max(1800, Math.min(4500, 1500 + len * 130))
  },

  queueSpeak(lines, validate, sessionId, index = 0) {
    if (index >= lines.length) return

    const timer = setTimeout(() => {
      if (sessionId !== this.autoPlaySessionId) return
      if (!validate()) return

      speakEnglish(lines[index])
      this.queueSpeak(lines, validate, sessionId, index + 1)
    }, index === 0 ? 160 : this.getSpeechDelay(lines[index - 1]))

    this.autoPlayTimers.push(timer)
  },

  playBackSideSequence() {
    const { currentWord, isFlipped } = this.data
    if (!currentWord || !isFlipped) return

    this.stopAutoPlayQueue()
    const sessionId = this.autoPlaySessionId
    const queue = [currentWord.word, ...(currentWord.sentences || [])]

    this.queueSpeak(
      queue,
      () => this.data.isFlipped && !!this.data.currentWord,
      sessionId
    )
  },

  triggerAutoReadBySide() {
    const { currentWord, isFlipped } = this.data
    if (!currentWord) return

    if (isFlipped) {
      this.playBackSideSequence()
      return
    }

    this.stopAutoPlayQueue()
    const sessionId = this.autoPlaySessionId

    this.queueSpeak(
      [currentWord.word],
      () => !this.data.isFlipped && !!this.data.currentWord,
      sessionId
    )
  },

  // 筛选单词
  filterWords() {
    const { currentCategory } = this.data
    let filteredWords = words

    if (currentCategory !== 'all') {
      filteredWords = words.filter(w => w.category === currentCategory)
    }

    this.stopAutoPlayQueue()
    this.setData({
      filteredWords,
      currentIndex: 0,
      currentWord: filteredWords[0] || null,
      isFlipped: false
    }, () => {
      this.triggerAutoReadBySide()
    })
  },

  // 选择分类
  selectCategory(e) {
    const category = e.currentTarget.dataset.category
    this.setData({ currentCategory: category })
    this.filterWords()
  },

  // 翻转卡片
  toggleCard() {
    const nextFlipped = !this.data.isFlipped
    this.setData({
      isFlipped: nextFlipped
    }, () => {
      this.triggerAutoReadBySide()
    })
  },

  // 播放单词
  playWord() {
    const { currentWord } = this.data
    if (currentWord) {
      speakEnglish(currentWord.word)
    }
  },

  // 上一个单词
  prevWord() {
    const { currentIndex, filteredWords } = this.data
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1
      this.stopAutoPlayQueue()
      this.setData({
        currentIndex: newIndex,
        currentWord: filteredWords[newIndex],
        isFlipped: false
      }, () => {
        this.triggerAutoReadBySide()
      })
    }
  },

  // 下一个单词
  nextWord() {
    const { currentIndex, filteredWords } = this.data
    if (currentIndex < filteredWords.length - 1) {
      const newIndex = currentIndex + 1
      this.stopAutoPlayQueue()
      this.setData({
        currentIndex: newIndex,
        currentWord: filteredWords[newIndex],
        isFlipped: false
      }, () => {
        this.triggerAutoReadBySide()
      })
    }
  }
})
