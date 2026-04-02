// 单词练习页面
const { words } = require('../../../data/english')
const { speakEnglish, playCorrectSound, playWrongSound } = require('../../../utils/audio')

Page({
  data: {
    mode: 'select', // select, practice, result
    questionTypes: [
      { id: 'wordToMeaning', name: '看单词选中文', icon: '🔤' },
      { id: 'meaningToWord', name: '看中文选单词', icon: '🀄' },
      { id: 'listenAndChoose', name: '听发音选单词', icon: '🔊' },
      { id: 'phoneticToWord', name: '看音标选单词', icon: '🧩' },
      { id: 'sentenceFill', name: '句子填空', icon: '✍️' }
    ],
    countOptions: [5, 10, 15, 20, 30],
    selectedType: 'wordToMeaning',
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
    const shuffled = this.shuffleArray([...words])
    const selected = shuffled.slice(0, Math.min(questionCount, shuffled.length))

    selected.forEach(item => {
      if (selectedType === 'wordToMeaning') {
        const wrongOptions = this.getWrongOptions(item.meaning, 'meaning', 3)
        questions.push({
          question: item.word,
          phonetic: item.phonetic,
          answer: item.meaning,
          options: this.shuffleArray([item.meaning, ...wrongOptions]),
          type: 'wordToMeaning',
          word: item.word
        })
        return
      }

      if (selectedType === 'meaningToWord') {
        const wrongOptions = this.getWrongOptions(item.word, 'word', 3)
        questions.push({
          question: item.meaning,
          answer: item.word,
          options: this.shuffleArray([item.word, ...wrongOptions]),
          type: 'meaningToWord',
          word: item.word
        })
        return
      }

      if (selectedType === 'listenAndChoose') {
        const wrongOptions = this.getWrongOptions(item.word, 'word', 3)
        questions.push({
          question: '听发音，选择正确的单词',
          answer: item.word,
          options: this.shuffleArray([item.word, ...wrongOptions]),
          type: 'listenAndChoose',
          word: item.word
        })
        return
      }

      if (selectedType === 'phoneticToWord') {
        const wrongOptions = this.getWrongOptions(item.word, 'word', 3)
        questions.push({
          question: item.phonetic,
          answer: item.word,
          options: this.shuffleArray([item.word, ...wrongOptions]),
          type: 'phoneticToWord',
          word: item.word
        })
        return
      }

      const sentence = (item.sentences && item.sentences[0]) || `I like ${item.word}.`
      const escapedWord = item.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const blankSentence = sentence.replace(new RegExp(`\\b${escapedWord}\\b`, 'i'), '____')
      const wrongOptions = this.getWrongOptions(item.word, 'word', 3)
      questions.push({
        question: blankSentence,
        answer: item.word,
        options: this.shuffleArray([item.word, ...wrongOptions]),
        type: 'sentenceFill',
        word: item.word
      })
    })

    return questions.slice(0, questionCount)
  },

  // 获取错误选项
  getWrongOptions(correct, field, count) {
    const options = []
    const shuffled = this.shuffleArray([...words])
    
    for (const item of shuffled) {
      const value = field === 'meaning' ? item.meaning : item.word
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
    if (currentQuestion && currentQuestion.word) {
      speakEnglish(currentQuestion.word)
    }
  },

  // 选择答案
  selectAnswer(e) {
    if (this.data.showResult) return

    const answer = e.currentTarget.dataset.answer
    const { currentQuestion } = this.data
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
    app.updateEnglishProgress(isCorrect, currentQuestion.word)
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
