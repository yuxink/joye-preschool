const app = getApp()
const { generateQuestion } = require('../../../utils/questionGenerator')
const { speakChineseLocal, playCorrectSound, playWrongSound, playCompletionSound } = require('../../../utils/audio')

const LEVEL_CONFIG = [
  { id: 1, name: '入门关', difficulty: '简单', total: 8, types: ['mixed10', 'decompose', 'adjacent'] },
  { id: 2, name: '进阶关', difficulty: '中等', total: 10, types: ['mixed20', 'compare', 'sequence'] },
  { id: 3, name: '挑战关', difficulty: '困难', total: 12, types: ['mixed20', 'wordProblem', 'sequence', 'compare'] }
]

// 闯关模式页面
Page({
  data: {
    mode: 'select',
    levels: [],
    currentLevel: null,
    questions: [],
    currentIndex: 0,
    currentQuestion: null,
    selectedAnswer: null,
    showResult: false,
    correctCount: 0,
    earnedStars: 0,
    accuracy: 0
  },

  onLoad() {
    this.loadLevels()
  },

  onShow() {
    this.loadLevels()
  },

  loadLevels() {
    const stars = wx.getStorageSync('challengeStars') || {}
    const levels = LEVEL_CONFIG.map((item, index) => {
      const levelStars = stars[item.id] || 0
      const unlocked = item.id === 1 || (stars[item.id - 1] || 0) > 0
      return { ...item, stars: levelStars, unlocked, index }
    })
    this.setData({ levels })
  },

  getStarsByAccuracy(accuracy) {
    if (accuracy >= 100) return 3
    if (accuracy >= 85) return 2
    if (accuracy >= 65) return 1
    return 0
  },

  buildLevelQuestions(level) {
    const questions = []
    for (let i = 0; i < level.total; i++) {
      const randomType = level.types[Math.floor(Math.random() * level.types.length)]
      questions.push(generateQuestion(randomType))
    }
    return questions
  },

  selectLevel(e) {
    const level = e.currentTarget.dataset.level
    if (!level.unlocked) {
      wx.showToast({ title: '请先通过前一关', icon: 'none' })
      return
    }

    const questions = this.buildLevelQuestions(level)
    this.setData({
      mode: 'practice',
      currentLevel: level,
      questions,
      currentIndex: 0,
      currentQuestion: questions[0],
      selectedAnswer: null,
      showResult: false,
      correctCount: 0,
      earnedStars: 0,
      accuracy: 0
    })

    this.playQuestion()
  },

  playQuestion() {
    const { currentQuestion } = this.data
    if (!currentQuestion) return

    const text = currentQuestion.question
      .replace(/\+/g, '加')
      .replace(/-/g, '减')
      .replace(/=/g, '等于')
      .replace(/\?/g, '多少')
      .replace(/○/g, '圈圈')
    speakChineseLocal(text)
  },

  selectAnswer(e) {
    if (this.data.showResult) return

    const answer = e.currentTarget.dataset.answer
    const { currentQuestion } = this.data
    const isCorrect = answer === currentQuestion.answer || String(answer) === String(currentQuestion.answer)

    this.setData({
      selectedAnswer: answer,
      showResult: true,
      correctCount: isCorrect ? this.data.correctCount + 1 : this.data.correctCount
    })

    if (isCorrect) {
      playCorrectSound()
    } else {
      playWrongSound()
      app.addWrongQuestion(currentQuestion)
    }

    app.updateMathProgress(isCorrect)
  },

  nextQuestion() {
    const { currentIndex, questions } = this.data
    if (currentIndex < questions.length - 1) {
      const nextIndex = currentIndex + 1
      this.setData({
        currentIndex: nextIndex,
        currentQuestion: questions[nextIndex],
        selectedAnswer: null,
        showResult: false
      })
      this.playQuestion()
      return
    }

    const accuracy = Math.round((this.data.correctCount / questions.length) * 100)
    const stars = this.getStarsByAccuracy(accuracy)
    const challengeStars = wx.getStorageSync('challengeStars') || {}
    const prevStars = challengeStars[this.data.currentLevel.id] || 0
    challengeStars[this.data.currentLevel.id] = Math.max(prevStars, stars)
    wx.setStorageSync('challengeStars', challengeStars)

    if (stars > 0) {
      playCompletionSound()
    }

    this.setData({
      mode: 'result',
      earnedStars: stars,
      accuracy
    })

    this.loadLevels()
  },

  backToLevels() {
    this.setData({
      mode: 'select',
      currentLevel: null,
      questions: [],
      currentIndex: 0,
      currentQuestion: null,
      selectedAnswer: null,
      showResult: false,
      correctCount: 0,
      earnedStars: 0,
      accuracy: 0
    })
  },

  replayLevel() {
    if (!this.data.currentLevel) {
      this.backToLevels()
      return
    }
    this.selectLevel({ currentTarget: { dataset: { level: this.data.currentLevel } } })
  }
})
