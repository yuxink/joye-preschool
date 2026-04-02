// 拼音练习页面
const { pinyinCharPairs } = require('../../../data/pinyin')
const { speakChinese, speakPinyin, playCorrectSound, playWrongSound } = require('../../../utils/audio')

Page({
  data: {
    mode: 'select', // select, practice, result
    questionTypes: [
      { id: 'pinyinToChar', name: '看拼音选汉字', icon: '🔤' },
      { id: 'charToPinyin', name: '看汉字选拼音', icon: '🀄' }
    ],
    countOptions: [5, 10, 15],
    selectedType: 'pinyinToChar',
    questionCount: 10,
    questions: [],
    currentIndex: 0,
    currentQuestion: null,
    selectedAnswer: null,
    showResult: false,
    correctCount: 0
  },

  onLoad() {},

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

  // 生成题目
  generateQuestions() {
    const { selectedType, questionCount } = this.data
    const questions = []
    const shuffled = this.shuffleArray([...pinyinCharPairs])
    const selected = shuffled.slice(0, Math.min(questionCount, shuffled.length))

    selected.forEach(item => {
      if (selectedType === 'pinyinToChar') {
        // 看拼音选汉字
        const wrongOptions = this.getWrongOptions(item.char, 'char', 3)
        questions.push({
          question: item.pinyin,
          answer: item.char,
          options: this.shuffleArray([item.char, ...wrongOptions]),
          type: 'pinyinToChar'
        })
      } else {
        // 看汉字选拼音
        const wrongOptions = this.getWrongOptions(item.pinyin, 'pinyin', 3)
        questions.push({
          question: item.char,
          answer: item.pinyin,
          options: this.shuffleArray([item.pinyin, ...wrongOptions]),
          type: 'charToPinyin'
        })
      }
    })

    return questions
  },

  // 获取错误选项
  getWrongOptions(correct, field, count) {
    const options = []
    const shuffled = this.shuffleArray([...pinyinCharPairs])
    
    for (const item of shuffled) {
      const value = field === 'char' ? item.char : item.pinyin
      if (value !== correct && !options.includes(value)) {
        options.push(value)
        if (options.length >= count) break
      }
    }
    return options
  },

  // 打乱数组
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  },

  // 开始练习
  startPractice() {
    const questions = this.generateQuestions()
    
    this.setData({
      mode: 'practice',
      questions,
      currentIndex: 0,
      currentQuestion: questions[0],
      selectedAnswer: null,
      showResult: false,
      correctCount: 0
    })

    this.playQuestion()
  },

  // 播放题目
  playQuestion() {
    const { currentQuestion } = this.data
    if (!currentQuestion) return

    if (currentQuestion.type === 'pinyinToChar') {
      speakPinyin(currentQuestion.question)
    } else {
      speakChinese(currentQuestion.question)
    }
  },

  // 选择答案
  selectAnswer(e) {
    if (this.data.showResult) return

    const answer = e.currentTarget.dataset.answer
    const { currentQuestion } = this.data

    // 点击到拼音选项时先自动播音
    if (currentQuestion && currentQuestion.type === 'charToPinyin') {
      speakPinyin(answer)
    }

    const isCorrect = answer === currentQuestion.answer

    this.setData({
      selectedAnswer: answer,
      showResult: true
    })

    if (isCorrect) {
      playCorrectSound()
      this.setData({
        correctCount: this.data.correctCount + 1
      })
    } else {
      playWrongSound()
    }

    // 更新进度
    const app = getApp()
    app.updatePinyinProgress(isCorrect)
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
