const { twoSpellGroups, threeSpellGroups, tonePracticeItems, pinyinCharPairs } = require('../../../data/pinyin')
const { speakPinyin, speakChinese } = require('../../../utils/audio')
Page({
  data: {
    mode: 'two',
    groups: twoSpellGroups,
    currentGroupIndex: 0,
    examples: twoSpellGroups[0].examples,
    currentExample: null,
    currentIndex: 0,
    animateClass: '',
    toneItems: tonePracticeItems
  },

  buildCharToneMap() {
    const map = {}
    ;(pinyinCharPairs || []).forEach(item => {
      if (item.char && item.pinyin && !map[item.char]) {
        map[item.char] = item.pinyin
      }
    })
    ;(tonePracticeItems || []).forEach(group => {
      ;(group.tones || []).forEach(t => {
        if (t.char && t.pinyin && !map[t.char]) {
          map[t.char] = t.pinyin
        }
      })
    })
    return map
  },

  extractFinalWithTone(example, tonePinyin) {
    if (!tonePinyin || !example) return example.final || ''

    const initial = example.initial || ''
    const medial = example.medial || ''
    let rest = tonePinyin

    if (initial && rest.startsWith(initial)) {
      rest = rest.slice(initial.length)
    }
    if (medial && rest.startsWith(medial)) {
      rest = rest.slice(medial.length)
    }
    return rest || example.final || ''
  },

  applyFallbackToneMark(syllable = '') {
    if (!syllable) return ''
    if (this.getToneNumber(syllable) > 0) return syllable

    const toneMap = {
      a: 'ā',
      o: 'ō',
      e: 'ē',
      i: 'ī',
      u: 'ū',
      ü: 'ǖ'
    }

    const chars = syllable.split('')
    const priority = ['a', 'o', 'e']
    let toneIndex = -1

    for (let i = 0; i < chars.length; i++) {
      if (priority.includes(chars[i])) {
        toneIndex = i
        break
      }
    }

    if (toneIndex === -1) {
      for (let i = chars.length - 1; i >= 0; i--) {
        if (toneMap[chars[i]]) {
          toneIndex = i
          break
        }
      }
    }

    if (toneIndex >= 0 && toneMap[chars[toneIndex]]) {
      chars[toneIndex] = toneMap[chars[toneIndex]]
    }

    return chars.join('')
  },

  enrichExamples(examples) {
    const charToneMap = this.buildCharToneMap()
    return (examples || []).map(item => {
      const mappedTone = charToneMap[item.char]
      const resultTone = mappedTone || this.applyFallbackToneMark(item.result)
      const rawFinalTone = item.final ? this.extractFinalWithTone(item, resultTone) : ''
      const finalTone = rawFinalTone || (item.final ? this.applyFallbackToneMark(item.final) : '')
      const resultToneNumber = this.getToneNumber(resultTone)
      const finalToneNumber = this.getToneNumber(finalTone)
      return {
        ...item,
        resultTone,
        finalTone,
        resultToneClass: this.getToneClass(resultTone),
        finalToneClass: this.getToneClass(finalTone),
        resultToneNumber,
        finalToneNumber
      }
    })
  },

  enrichGroups(groups) {
    return (groups || []).map(group => ({
      ...group,
      examples: this.enrichExamples(group.examples)
    }))
  },

  onLoad() {
    const groups = this.enrichGroups(twoSpellGroups)
    const examples = groups[0] ? groups[0].examples : []
    this.setData({ groups, examples, currentExample: examples[0] || null })
  },

  switchMode(e) {
    const mode = e.currentTarget.dataset.mode
    if (mode === 'tone') {
      const toneExamples = this.enrichTonePractice(tonePracticeItems)
      this.setData({
        mode,
        groups: [],
        currentGroupIndex: 0,
        examples: toneExamples,
        currentIndex: 0,
        currentExample: toneExamples[0],
        animateClass: 'fade-in'
      })
      setTimeout(() => this.setData({ animateClass: '' }), 280)
      return
    }

    const rawGroups = mode === 'two' ? twoSpellGroups : threeSpellGroups
    const groups = this.enrichGroups(rawGroups)
    const examples = groups[0] ? groups[0].examples : []
    this.setData({
      mode,
      groups,
      currentGroupIndex: 0,
      examples,
      currentIndex: 0,
      currentExample: examples[0] || null,
      animateClass: 'fade-in'
    })
    setTimeout(() => this.setData({ animateClass: '' }), 280)
  },

  switchGroup(e) {
    const index = Number(e.currentTarget.dataset.index || 0)
    const group = this.data.groups[index]
    if (!group) return

    this.setData({
      currentGroupIndex: index,
      examples: group.examples,
      currentIndex: 0,
      currentExample: group.examples[0] || null,
      animateClass: 'fade-in'
    })
    setTimeout(() => this.setData({ animateClass: '' }), 280)
  },

  playSpelling() {
    const { currentExample, mode } = this.data
    if (!currentExample) return

    if (mode === 'tone') {
      const firstTone = currentExample.tones && currentExample.tones[0]
      if (firstTone && firstTone.char) {
        speakChinese(firstTone.char)
      }
      return
    }
    speakPinyin(currentExample.resultTone || currentExample.result)
  },

  playTone(e) {
    const pinyinText = e.currentTarget.dataset.pinyin || ''
    const charText = e.currentTarget.dataset.char || ''
    if (charText) {
      speakChinese(charText)
      return
    }
    if (pinyinText) {
      speakPinyin(pinyinText)
    }
  },

  playAllTones() {
    const { currentExample, mode } = this.data
    if (mode !== 'tone' || !currentExample || !currentExample.tones) return

    currentExample.tones.forEach((item, index) => {
      setTimeout(() => {
        if (item.char) {
          speakChinese(item.char)
        } else if (item.pinyin) {
          speakPinyin(item.pinyin)
        }
      }, index * 850)
    })
  },

  playRawPinyin(e) {
    const pinyin = e.currentTarget.dataset.pinyin
    if (pinyin) speakPinyin(pinyin)
  },

  next() {
    const { currentIndex, examples } = this.data
    if (currentIndex < examples.length - 1) {
      const newIndex = currentIndex + 1
      this.setData({ currentIndex: newIndex, currentExample: examples[newIndex], animateClass: 'slide-in-right' })
      setTimeout(() => this.setData({ animateClass: '' }), 280)
    }
  },

  prev() {
    const { currentIndex, examples } = this.data
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1
      this.setData({ currentIndex: newIndex, currentExample: examples[newIndex], animateClass: 'slide-in-left' })
      setTimeout(() => this.setData({ animateClass: '' }), 280)
    }
  },

  getToneNumber(pinyin = '') {
    if (/[āōēīūǖ]/.test(pinyin)) return 1
    if (/[áóéíúǘ]/.test(pinyin)) return 2
    if (/[ǎǒěǐǔǚ]/.test(pinyin)) return 3
    if (/[àòèìùǜ]/.test(pinyin)) return 4
    return 0
  },

  getToneClass(pinyin = '') {
    const tone = this.getToneNumber(pinyin)
    return tone ? `tone-${tone}` : ''
  },

  enrichTonePractice(items) {
    return (items || []).map(group => ({
      ...group,
      tones: (group.tones || []).map(item => ({
        ...item,
        toneClass: this.getToneClass(item.pinyin),
        toneNumber: this.getToneNumber(item.pinyin)
      }))
    }))
  }
})
