// 数学练习页面
const app = getApp()
const { generateQuestions } = require('../../../utils/questionGenerator')
const { speakChineseLocal, playCorrectSound, playWrongSound } = require('../../../utils/audio')

Page({
  data: {
    mode: 'select', // select, practice, result
    questionTypes: [
      { id: 'mixed10', name: '10以内加减', iconPath: '/images/icons-flat/math-mixed10.png' },
      { id: 'mixed20', name: '20以内加减', iconPath: '/images/icons-flat/math-mixed20.png' },
      { id: 'decompose', name: '拆数练习', iconPath: '/images/icons-flat/math-decompose.png' },
      { id: 'adjacent', name: '相邻数', iconPath: '/images/icons-flat/math-adjacent.png' },
      { id: 'compare', name: '比大小', iconPath: '/images/icons-flat/math-compare.png' },
      { id: 'sequence', name: '数列规律', iconPath: '/images/icons-flat/math-sequence.png' },
      { id: 'wordProblem', name: '应用题', iconPath: '/images/icons-flat/math-word.png' },
      { id: 'multiply10', name: '乘法入门', iconPath: '/images/icons-flat/math-multiply.png' },
      { id: 'division10', name: '除法入门', iconPath: '/images/icons-flat/math-division.png' },
      { id: 'clockRead', name: '认识整点', iconPath: '/images/icons-flat/math-clock.png' },
      { id: 'moneyCount', name: '认识人民币', iconPath: '/images/icons-flat/math-money.png' },
      { id: 'oddEven', name: '奇偶判断', iconPath: '/images/icons-flat/math-oddeven.png' }
    ],
    countOptions: [5, 10, 15, 20, 30],
    selectedType: 'mixed10',
    questionCount: 10,
    questions: [],
    currentIndex: 0,
    currentQuestion: null,
    selectedAnswer: null,
    showResult: false,
    correctCount: 0
  },

  onLoad(options = {}) {
    if (options.mode === 'review') {
      const wrongBook = app.globalData.wrongBook || []
      if (!wrongBook.length) {
        wx.showToast({ title: '没有可复习错题', icon: 'none' })
        return
      }

      this.setData({
        mode: 'practice',
        questions: [...wrongBook],
        currentIndex: 0,
        currentQuestion: wrongBook[0],
        selectedAnswer: null,
        showResult: false,
        correctCount: 0
      })
      this.playQuestion()
    }
  },

  // 选择题型
  selectType(e) {
    this.setData({
      selectedType: e.currentTarget.dataset.type
    })
  },

  // 选择数量
  selectCount(e) {
    this.setData({
      questionCount: e.currentTarget.dataset.count
    })
  },

  // 开始练习
  startPractice() {
    const { selectedType, questionCount } = this.data
    const questions = generateQuestions(selectedType, questionCount)
    
    this.setData({
      mode: 'practice',
      questions,
      currentIndex: 0,
      currentQuestion: questions[0],
      selectedAnswer: null,
      showResult: false,
      correctCount: 0
    })

    // 播放题目
    this.playQuestion()
  },

  // 播放题目
  playQuestion() {
    const { currentQuestion } = this.data
    if (currentQuestion) {
      let text = currentQuestion.question
        .replace(/\+/g, '加')
        .replace(/-/g, '减')
        .replace(/×/g, '乘')
        .replace(/÷/g, '除')
        .replace(/=/g, '等于')
        .replace(/\?/g, '多少')
        .replace(/○/g, '圈圈')
      speakChineseLocal(text)
    }
  },

  // 选择答案
  selectAnswer(e) {
    if (this.data.showResult) return

    const answer = e.currentTarget.dataset.answer
    const { currentQuestion } = this.data
    const isCorrect = answer === currentQuestion.answer || 
                      String(answer) === String(currentQuestion.answer)

    this.setData({
      selectedAnswer: answer,
      showResult: true
    })

    if (isCorrect) {
      playCorrectSound()
      this.setData({
        correctCount: this.data.correctCount + 1
      })
      app.removeWrongQuestion(currentQuestion.question)
    } else {
      playWrongSound()
      // 添加到错题本
      app.addWrongQuestion(currentQuestion)
    }

    // 更新进度
    app.updateMathProgress(isCorrect)
  },

  // 下一题
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
    } else {
      // 显示结果
      this.setData({
        mode: 'result'
      })
    }
  },

  // 返回选择
  backToSelect() {
    this.setData({
      mode: 'select',
      questions: [],
      currentIndex: 0,
      currentQuestion: null,
      selectedAnswer: null,
      showResult: false,
      correctCount: 0
    })
  },

  // 再练一次
  restartPractice() {
    this.startPractice()
  }
})
