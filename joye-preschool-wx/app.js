// app.js
App({
  globalData: {
    settings: {
      soundEnabled: true,
      fontSize: 'medium',
      pinyinSpeed: 'normal'
    },
    progress: {
      totalQuestions: 0,
      correctAnswers: 0,
      streakDays: 0,
      lastPracticeDate: null,
      mathProgress: { totalQuestions: 0, correctAnswers: 0 },
      pinyinProgress: { totalQuestions: 0, correctAnswers: 0 },
      englishProgress: { totalQuestions: 0, correctAnswers: 0, learnedWords: [] }
    },
    wrongBook: [],
    pinyinFavorites: []
  },

  onLaunch() {
    // 加载本地存储的数据
    this.loadAppData()
    // 更新连续学习天数
    this.updateStreakDays()
  },

  // 加载应用数据
  loadAppData() {
    try {
      const settings = wx.getStorageSync('settings')
      if (settings) {
        this.globalData.settings = { ...this.globalData.settings, ...settings }
      }

      const progress = wx.getStorageSync('progress')
      if (progress) {
        this.globalData.progress = { ...this.globalData.progress, ...progress }
      }

      const wrongBook = wx.getStorageSync('wrongBook')
      if (wrongBook) {
        this.globalData.wrongBook = wrongBook
      }

      const pinyinFavorites = wx.getStorageSync('pinyinFavorites')
      if (pinyinFavorites) {
        this.globalData.pinyinFavorites = pinyinFavorites
      }
    } catch (e) {
      console.error('加载数据失败:', e)
    }
  },

  // 保存设置
  saveSettings(settings) {
    this.globalData.settings = { ...this.globalData.settings, ...settings }
    wx.setStorageSync('settings', this.globalData.settings)
  },

  // 保存进度
  saveProgress(progress) {
    this.globalData.progress = { ...this.globalData.progress, ...progress }
    wx.setStorageSync('progress', this.globalData.progress)
  },

  // 更新数学进度
  updateMathProgress(correct) {
    const progress = this.globalData.progress
    progress.totalQuestions++
    progress.mathProgress.totalQuestions++
    if (correct) {
      progress.correctAnswers++
      progress.mathProgress.correctAnswers++
    }
    progress.lastPracticeDate = new Date().toDateString()
    this.saveProgress(progress)
  },

  // 更新拼音进度
  updatePinyinProgress(correct) {
    const progress = this.globalData.progress
    progress.totalQuestions++
    progress.pinyinProgress.totalQuestions++
    if (correct) {
      progress.correctAnswers++
      progress.pinyinProgress.correctAnswers++
    }
    progress.lastPracticeDate = new Date().toDateString()
    this.saveProgress(progress)
  },

  // 更新英语进度
  updateEnglishProgress(correct, word = null) {
    const progress = this.globalData.progress
    progress.totalQuestions++
    progress.englishProgress.totalQuestions++
    if (correct) {
      progress.correctAnswers++
      progress.englishProgress.correctAnswers++
    }
    if (word && !progress.englishProgress.learnedWords.includes(word)) {
      progress.englishProgress.learnedWords.push(word)
    }
    progress.lastPracticeDate = new Date().toDateString()
    this.saveProgress(progress)
  },

  // 更新连续学习天数
  updateStreakDays() {
    const progress = this.globalData.progress
    const today = new Date().toDateString()
    const lastDate = progress.lastPracticeDate

    if (lastDate) {
      const last = new Date(lastDate)
      const now = new Date(today)
      const diffDays = Math.floor((now - last) / (1000 * 60 * 60 * 24))

      if (diffDays === 0) {
        // 今天已经学习过
      } else if (diffDays === 1) {
        // 连续学习
        progress.streakDays++
      } else {
        // 中断了
        progress.streakDays = 0
      }
    }
    this.saveProgress(progress)
  },

  // 添加错题
  addWrongQuestion(question) {
    const wrongBook = this.globalData.wrongBook
    const exists = wrongBook.find(q => q.question === question.question)
    if (!exists) {
      wrongBook.push({
        ...question,
        addedAt: Date.now()
      })
      wx.setStorageSync('wrongBook', wrongBook)
    }
  },

  // 移除错题
  removeWrongQuestion(questionText) {
    this.globalData.wrongBook = this.globalData.wrongBook.filter(
      q => q.question !== questionText
    )
    wx.setStorageSync('wrongBook', this.globalData.wrongBook)
  },

  // 清空错题本
  clearWrongBook() {
    this.globalData.wrongBook = []
    wx.setStorageSync('wrongBook', [])
  },

  // 添加拼音收藏
  addPinyinFavorite(pinyin) {
    const favorites = this.globalData.pinyinFavorites
    if (!favorites.includes(pinyin)) {
      favorites.push(pinyin)
      wx.setStorageSync('pinyinFavorites', favorites)
    }
  },

  // 移除拼音收藏
  removePinyinFavorite(pinyin) {
    this.globalData.pinyinFavorites = this.globalData.pinyinFavorites.filter(
      p => p !== pinyin
    )
    wx.setStorageSync('pinyinFavorites', this.globalData.pinyinFavorites)
  },

  // 重置所有数据
  resetAllData() {
    this.globalData.settings = {
      soundEnabled: true,
      fontSize: 'medium',
      pinyinSpeed: 'normal'
    }
    this.globalData.progress = {
      totalQuestions: 0,
      correctAnswers: 0,
      streakDays: 0,
      lastPracticeDate: null,
      mathProgress: { totalQuestions: 0, correctAnswers: 0 },
      pinyinProgress: { totalQuestions: 0, correctAnswers: 0 },
      englishProgress: { totalQuestions: 0, correctAnswers: 0, learnedWords: [] }
    }
    this.globalData.wrongBook = []
    this.globalData.pinyinFavorites = []

    wx.clearStorageSync()
  },

  // 获取正确率
  getAccuracy() {
    const { totalQuestions, correctAnswers } = this.globalData.progress
    if (totalQuestions === 0) return 0
    return Math.round((correctAnswers / totalQuestions) * 100)
  }
})
