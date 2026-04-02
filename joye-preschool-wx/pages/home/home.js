// 首页
const app = getApp()

Page({
  data: {
    progress: {},
    accuracy: 0,
    mathAccuracy: 0,
    pinyinAccuracy: 0,
    englishAccuracy: 0,
    mathProgressPercent: 0,
    pinyinProgressPercent: 0,
    englishProgressPercent: 0
  },

  onLoad() {
    this.loadData()
  },

  onShow() {
    this.loadData()
  },

  getProgressPercent(totalQuestions) {
    // 首页进度条按练习完成量展示，避免和正确率混用
    const value = Number(totalQuestions) || 0
    return Math.max(0, Math.min(100, value))
  },

  // 加载数据
  loadData() {
    const progress = app.globalData.progress
    const accuracy = app.getAccuracy()

    // 计算各科正确率
    const mathAccuracy = progress.mathProgress.totalQuestions > 0
      ? Math.round((progress.mathProgress.correctAnswers / progress.mathProgress.totalQuestions) * 100)
      : 0

    const pinyinAccuracy = progress.pinyinProgress.totalQuestions > 0
      ? Math.round((progress.pinyinProgress.correctAnswers / progress.pinyinProgress.totalQuestions) * 100)
      : 0

    const englishAccuracy = progress.englishProgress.totalQuestions > 0
      ? Math.round((progress.englishProgress.correctAnswers / progress.englishProgress.totalQuestions) * 100)
      : 0

    const mathProgressPercent = this.getProgressPercent(progress.mathProgress.totalQuestions)
    const pinyinProgressPercent = this.getProgressPercent(progress.pinyinProgress.totalQuestions)
    const englishProgressPercent = this.getProgressPercent(progress.englishProgress.totalQuestions)

    this.setData({
      progress,
      accuracy,
      mathAccuracy,
      pinyinAccuracy,
      englishAccuracy,
      mathProgressPercent,
      pinyinProgressPercent,
      englishProgressPercent
    })
  },

  // 跳转到数学模块
  goToMath() {
    wx.navigateTo({
      url: '/pages/math/practice/practice'
    })
  },

  // 跳转到拼音模块
  goToPinyin() {
    wx.showActionSheet({
      itemList: ['韵母学习', '声母学习', '拼读训练', '拼音表'],
      success: (res) => {
        const pages = [
          '/pages/pinyin/vowels/vowels',
          '/pages/pinyin/initials/initials',
          '/pages/pinyin/spelling/spelling',
          '/pages/pinyin/table/table'
        ]
        wx.navigateTo({
          url: pages[res.tapIndex]
        })
      }
    })
  },

  // 跳转到英语模块
  goToEnglish() {
    wx.showActionSheet({
      itemList: ['单词闪卡', '常用句型', '单词练习'],
      success: (res) => {
        const pages = [
          '/pages/english/flashcard/flashcard',
          '/pages/english/sentences/sentences',
          '/pages/english/practice/practice'
        ]
        wx.navigateTo({
          url: pages[res.tapIndex]
        })
      }
    })
  },

  // 跳转到闯关模式
  goToChallenge() {
    wx.navigateTo({
      url: '/pages/math/challenge/challenge'
    })
  },

  // 跳转到错题本
  goToWrongBook() {
    wx.switchTab({
      url: '/pages/wrongbook/wrongbook'
    })
  },

  // 跳转到拼音表
  goToPinyinTable() {
    wx.navigateTo({
      url: '/pages/pinyin/table/table'
    })
  },

  // 跳转到单词卡
  goToFlashcard() {
    wx.navigateTo({
      url: '/pages/english/flashcard/flashcard'
    })
  }
})
