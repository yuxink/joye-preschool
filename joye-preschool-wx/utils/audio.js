// 音频播放工具 - 使用本地离线音频资源
const { getLocalAudioPath } = require('./localAudioMap')
const { pinyinCharPairs } = require('../data/pinyin')

let innerAudioContext = null
let isPlaying = false
let currentAudioText = ''
let currentPlayback = {
  fallbackUrls: [],
  fallbackIndex: 0,
  fallbackTried: false
}

function resetPlaybackState() {
  currentPlayback = {
    fallbackUrls: [],
    fallbackIndex: 0,
    fallbackTried: false
  }
}

// 获取音频上下文
function getAudioContext() {
  if (!innerAudioContext) {
    innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.obeyMuteSwitch = false
    innerAudioContext.onEnded(() => {
      isPlaying = false
      currentAudioText = ''
      resetPlaybackState()
    })
    innerAudioContext.onError((err) => {
      console.error('音频播放错误:', err)

      // 本地资源失败时自动回退有道 TTS（下载后播放，避免直链解码失败）
      if (currentPlayback.fallbackUrls.length) {
        tryPlayYoudaoFallback()
        return
      }

      isPlaying = false
      currentAudioText = ''
      resetPlaybackState()
    })
  }
  return innerAudioContext
}

function tryPlayYoudaoFallback() {
  const { fallbackUrls, fallbackIndex } = currentPlayback
  if (!fallbackUrls.length || fallbackIndex >= fallbackUrls.length) {
    isPlaying = false
    currentAudioText = ''
    resetPlaybackState()
    return
  }

  const targetUrl = fallbackUrls[fallbackIndex]
  currentPlayback.fallbackTried = true
  currentPlayback.fallbackIndex += 1

  wx.downloadFile({
    url: targetUrl,
    success: (res) => {
      if (res.statusCode !== 200 || !res.tempFilePath) {
        tryPlayYoudaoFallback()
        return
      }
      try {
        innerAudioContext.src = res.tempFilePath
        innerAudioContext.play()
      } catch (e) {
        tryPlayYoudaoFallback()
      }
    },
    fail: () => {
      tryPlayYoudaoFallback()
    }
  })
}

function getYoudaoUrls(text, lang = 'zh') {
  const encoded = encodeURIComponent(text)
  if (lang === 'en') {
    return [
      `https://dict.youdao.com/dictvoice?audio=${encoded}&type=1`,
      `https://dict.youdao.com/dictvoice?audio=${encoded}&type=2`
    ]
  }
  return [
    `https://dict.youdao.com/dictvoice?audio=${encoded}&le=zh&type=1`,
    `https://dict.youdao.com/dictvoice?audio=${encoded}&le=zh&type=0`
  ]
}

function playLocalAudio(type, text, fallbackLang = 'zh', allowFallbackOverride = null) {
  if (!text || isPlaying) return

  const app = getApp()
  if (!app.globalData.settings.soundEnabled) return

  isPlaying = true
  currentAudioText = text
  const allowFallback = allowFallbackOverride === null
    ? (fallbackLang === 'en' || isSuitableForYoudao(String(text)))
    : allowFallbackOverride
  currentPlayback = {
    fallbackUrls: allowFallback ? getYoudaoUrls(text, fallbackLang) : [],
    fallbackIndex: 0,
    fallbackTried: false
  }
  const audio = getAudioContext()
  audio.src = getLocalAudioPath(type, text)
  audio.play()
}

// 判断文本是否适合用有道TTS
function isSuitableForYoudao(text) {
  const cleanText = text.replace(/\s/g, '')
  return cleanText.length <= 15 && !/[，。？！、；：""''【】《》（）]/.test(text)
}

// 播放中文
function speakChinese(text) {
  if (!text) return
  playLocalAudio('chinese', text, 'zh')
}

// 中文仅本地播放（禁用有道回退）
function speakChineseLocal(text) {
  if (!text) return
  playLocalAudio('chinese', text, 'zh', false)
}

// 播放英文
function speakEnglish(text) {
  if (!text) return
  playLocalAudio('english', text, 'en')
}

// 播放拼音（转换为汉字后播放）
const pinyinToChar = {
  'a': '啊', 'o': '哦', 'e': '鹅', 'i': '衣', 'u': '乌', 'ü': '鱼',
  'ai': '爱', 'ei': '诶', 'ui': '威', 'ao': '奥', 'ou': '欧', 'iu': '优',
  'ie': '耶', 'üe': '约', 'er': '耳',
  'an': '安', 'en': '恩', 'in': '因', 'un': '温', 'ün': '晕',
  'ang': '昂', 'eng': '鞥', 'ing': '英', 'ong': '翁',
  'b': '波', 'p': '坡', 'm': '摸', 'f': '佛',
  'd': '得', 't': '特', 'n': '讷', 'l': '勒',
  'g': '哥', 'k': '科', 'h': '喝',
  'j': '机', 'q': '七', 'x': '西',
  'z': '资', 'c': '次', 's': '思',
  'zh': '知', 'ch': '吃', 'sh': '师', 'r': '日',
  'y': '衣', 'w': '乌',
  // 带声调的音节
  'ba': '八', 'pa': '趴', 'ma': '妈', 'fa': '发',
  'da': '搭', 'ta': '他', 'na': '拿', 'la': '拉',
  'ga': '嘎', 'ka': '咖', 'ha': '哈',
  'bo': '波', 'po': '坡', 'mo': '摸', 'fo': '佛',
  'de': '德', 'te': '特', 'ne': '呢', 'le': '乐',
  'ge': '歌', 'ke': '科', 'he': '喝',
  'bi': '逼', 'pi': '批', 'mi': '咪', 'di': '低', 'ti': '梯', 'ni': '妮', 'li': '梨',
  'ji': '机', 'qi': '七', 'xi': '西',
  'bu': '不', 'pu': '扑', 'mu': '姆', 'fu': '夫',
  'du': '都', 'tu': '突', 'nu': '奴', 'lu': '噜',
  'gu': '咕', 'ku': '哭', 'hu': '呼',
  'zhi': '知', 'chi': '吃', 'shi': '师', 'ri': '日',
  'zi': '资', 'ci': '词', 'si': '思',
  'ju': '居', 'qu': '区', 'xu': '虚',
  'jia': '家', 'qia': '恰', 'xia': '虾',
  'gua': '瓜', 'kua': '夸', 'hua': '花',
  'zhu': '猪', 'chu': '出', 'shu': '书', 'ru': '如',
  'zu': '租', 'cu': '粗', 'su': '苏'
}

function normalizePinyinForLookup(rawPinyin) {
  if (!rawPinyin) return ''

  const toneMap = {
    'ā': 'a', 'á': 'a', 'ǎ': 'a', 'à': 'a',
    'ō': 'o', 'ó': 'o', 'ǒ': 'o', 'ò': 'o',
    'ē': 'e', 'é': 'e', 'ě': 'e', 'è': 'e',
    'ī': 'i', 'í': 'i', 'ǐ': 'i', 'ì': 'i',
    'ū': 'u', 'ú': 'u', 'ǔ': 'u', 'ù': 'u',
    'ǖ': 'ü', 'ǘ': 'ü', 'ǚ': 'ü', 'ǜ': 'ü',
    'ü': 'ü'
  }

  return rawPinyin
    .toLowerCase()
    .replace(/v/g, 'ü')
    .split('')
    .map(ch => toneMap[ch] || ch)
    .join('')
}

function speakPinyin(pinyin, tone = 1) {
  if (!pinyin) return

  const app = getApp()
  if (!app.globalData.settings.soundEnabled) return

  const raw = String(pinyin).toLowerCase().replace(/v/g, 'ü')
  const normalized = normalizePinyinForLookup(raw)
  const charToSpeak = mergedPinyinToChar[raw] || mergedPinyinToChar[normalized] || mergedPinyinToChar[normalized.replace('ü', 'u')]

  // 优先用精确音调映射的示例汉字发音
  if (charToSpeak) {
    speakChinese(charToSpeak)
    return
  }

  // 兜底：仅在没有映射时尝试拼音音频
  playLocalAudio('pinyin', raw, 'zh')
}

// 播放音效（使用微信震动作为反馈）
function playCorrectSound() {
  const app = getApp()
  if (!app.globalData.settings.soundEnabled) return
  
  wx.vibrateShort({ type: 'light' })
}

function playWrongSound() {
  const app = getApp()
  if (!app.globalData.settings.soundEnabled) return
  
  wx.vibrateShort({ type: 'heavy' })
}

function playCompletionSound() {
  const app = getApp()
  if (!app.globalData.settings.soundEnabled) return
  
  wx.vibrateLong()
}

// 停止播放
function stopAudio() {
  if (innerAudioContext) {
    innerAudioContext.stop()
    isPlaying = false
    resetPlaybackState()
  }
}

function buildDatasetPinyinMap() {
  const map = {}
  ;(pinyinCharPairs || []).forEach(item => {
    const raw = String(item.pinyin || '').toLowerCase().replace(/v/g, 'ü')
    const normalized = normalizePinyinForLookup(raw)
    if (raw && item.char && !map[raw]) {
      map[raw] = item.char
    }
    if (normalized && item.char && !map[normalized]) {
      map[normalized] = item.char
    }
  })
  return map
}

const datasetPinyinToChar = buildDatasetPinyinMap()
const mergedPinyinToChar = { ...datasetPinyinToChar, ...pinyinToChar }

module.exports = {
  speakChinese,
  speakChineseLocal,
  speakEnglish,
  speakPinyin,
  playCorrectSound,
  playWrongSound,
  playCompletionSound,
  stopAudio
}
