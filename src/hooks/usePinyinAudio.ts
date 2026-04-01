import { useCallback, useEffect, useRef } from 'react'
import { useApp } from '../stores/AppContext'
import type { ToneType } from '../types'
import {
  initAudio,
  speakChinese,
  playCorrectSound,
  playWrongSound,
  stopAudio,
} from '../utils/audioPlayer'

// 拼音对应的汉字（用于发音）
const pinyinToChar: Record<string, string> = {
  'a': '啊', 'o': '哦', 'e': '鹅', 'i': '衣', 'u': '乌', 'ü': '鱼', 'v': '鱼',
  'ai': '爱', 'ei': '诶', 'ui': '威', 'ao': '奥', 'ou': '欧', 'iu': '优',
  'ie': '耶', 'üe': '约', 've': '约', 'er': '耳',
  'an': '安', 'en': '恩', 'in': '因', 'un': '温', 'ün': '晕', 'vn': '晕',
  'ang': '昂', 'eng': '鞥', 'ing': '英', 'ong': '翁',
  'b': '波', 'p': '坡', 'm': '摸', 'f': '佛',
  'd': '得', 't': '特', 'n': '讷', 'l': '勒',
  'g': '哥', 'k': '科', 'h': '喝',
  'j': '机', 'q': '七', 'x': '西',
  'z': '资', 'c': '次', 's': '思',
  'zh': '知', 'ch': '吃', 'sh': '师', 'r': '日',
  'y': '衣', 'w': '乌',
}

// 带声调的汉字映射
const tonedChars: Record<string, Record<ToneType, string>> = {
  'a': { 1: '啊', 2: '啊', 3: '啊', 4: '啊', 0: '啊' },
  'o': { 1: '喔', 2: '哦', 3: '哦', 4: '哦', 0: '哦' },
  'e': { 1: '鹅', 2: '额', 3: '恶', 4: '饿', 0: '呃' },
  'i': { 1: '衣', 2: '姨', 3: '椅', 4: '义', 0: '衣' },
  'u': { 1: '乌', 2: '无', 3: '五', 4: '物', 0: '乌' },
  'ü': { 1: '淤', 2: '鱼', 3: '雨', 4: '玉', 0: '于' },
  'yi': { 1: '一', 2: '姨', 3: '椅', 4: '义', 0: '一' },
  'wu': { 1: '乌', 2: '无', 3: '五', 4: '物', 0: '呜' },
  'yu': { 1: '于', 2: '鱼', 3: '雨', 4: '玉', 0: '于' },
  'ba': { 1: '八', 2: '拔', 3: '把', 4: '爸', 0: '吧' },
  'pa': { 1: '趴', 2: '爬', 3: '怕', 4: '帕', 0: '啪' },
  'ma': { 1: '妈', 2: '麻', 3: '马', 4: '骂', 0: '吗' },
  'fa': { 1: '发', 2: '罚', 3: '法', 4: '发', 0: '发' },
  'da': { 1: '搭', 2: '达', 3: '打', 4: '大', 0: '哒' },
  'ta': { 1: '他', 2: '踏', 3: '塔', 4: '踏', 0: '他' },
  'na': { 1: '拿', 2: '拿', 3: '哪', 4: '那', 0: '哪' },
  'la': { 1: '拉', 2: '啦', 3: '喇', 4: '辣', 0: '啦' },
  'ga': { 1: '嘎', 2: '嘎', 3: '嘎', 4: '嘎', 0: '嘎' },
  'ka': { 1: '咖', 2: '卡', 3: '卡', 4: '卡', 0: '咔' },
  'ha': { 1: '哈', 2: '哈', 3: '哈', 4: '哈', 0: '哈' },
  'bo': { 1: '波', 2: '伯', 3: '跛', 4: '簸', 0: '波' },
  'po': { 1: '坡', 2: '婆', 3: '叵', 4: '破', 0: '坡' },
  'mo': { 1: '摸', 2: '模', 3: '抹', 4: '末', 0: '么' },
  'fo': { 1: '佛', 2: '佛', 3: '佛', 4: '佛', 0: '佛' },
  'de': { 1: '德', 2: '德', 3: '德', 4: '的', 0: '的' },
  'te': { 1: '特', 2: '特', 3: '特', 4: '特', 0: '特' },
  'ne': { 1: '呢', 2: '呢', 3: '呢', 4: '呢', 0: '呢' },
  'le': { 1: '乐', 2: '乐', 3: '乐', 4: '乐', 0: '了' },
  'ge': { 1: '歌', 2: '格', 3: '个', 4: '个', 0: '个' },
  'ke': { 1: '科', 2: '壳', 3: '可', 4: '课', 0: '可' },
  'he': { 1: '喝', 2: '合', 3: '合', 4: '贺', 0: '和' },
  'bi': { 1: '逼', 2: '鼻', 3: '比', 4: '必', 0: '笔' },
  'pi': { 1: '批', 2: '皮', 3: '屁', 4: '屁', 0: '皮' },
  'mi': { 1: '咪', 2: '迷', 3: '米', 4: '密', 0: '米' },
  'di': { 1: '低', 2: '敌', 3: '底', 4: '地', 0: '的' },
  'ti': { 1: '梯', 2: '提', 3: '体', 4: '替', 0: '提' },
  'ni': { 1: '妮', 2: '泥', 3: '你', 4: '腻', 0: '呢' },
  'li': { 1: '梨', 2: '离', 3: '里', 4: '力', 0: '哩' },
  'ji': { 1: '机', 2: '极', 3: '几', 4: '记', 0: '吉' },
  'qi': { 1: '七', 2: '奇', 3: '起', 4: '气', 0: '其' },
  'xi': { 1: '西', 2: '席', 3: '喜', 4: '戏', 0: '兮' },
  'bu': { 1: '不', 2: '不', 3: '补', 4: '不', 0: '不' },
  'pu': { 1: '扑', 2: '葡', 3: '普', 4: '铺', 0: '噗' },
  'mu': { 1: '姆', 2: '模', 3: '母', 4: '木', 0: '姆' },
  'fu': { 1: '夫', 2: '扶', 3: '府', 4: '父', 0: '呋' },
  'du': { 1: '都', 2: '读', 3: '肚', 4: '度', 0: '嘟' },
  'tu': { 1: '突', 2: '图', 3: '土', 4: '兔', 0: '突' },
  'nu': { 1: '奴', 2: '奴', 3: '努', 4: '怒', 0: '奴' },
  'lu': { 1: '噜', 2: '卢', 3: '鲁', 4: '路', 0: '噜' },
  'gu': { 1: '咕', 2: '姑', 3: '古', 4: '故', 0: '咕' },
  'ku': { 1: '哭', 2: '窟', 3: '苦', 4: '库', 0: '哭' },
  'hu': { 1: '呼', 2: '胡', 3: '虎', 4: '互', 0: '乎' },
  'zhi': { 1: '知', 2: '直', 3: '纸', 4: '至', 0: '之' },
  'chi': { 1: '吃', 2: '池', 3: '尺', 4: '赤', 0: '吃' },
  'shi': { 1: '师', 2: '十', 3: '使', 4: '是', 0: '时' },
  'ri': { 1: '日', 2: '日', 3: '日', 4: '日', 0: '日' },
  'zi': { 1: '资', 2: '字', 3: '子', 4: '自', 0: '子' },
  'ci': { 1: '词', 2: '词', 3: '此', 4: '次', 0: '词' },
  'si': { 1: '思', 2: '死', 3: '死', 4: '四', 0: '思' },
  'jia': { 1: '家', 2: '夹', 3: '假', 4: '架', 0: '家' },
  'qia': { 1: '恰', 2: '恰', 3: '恰', 4: '恰', 0: '恰' },
  'xia': { 1: '虾', 2: '侠', 3: '下', 4: '下', 0: '虾' },
  'gua': { 1: '瓜', 2: '瓜', 3: '剐', 4: '挂', 0: '瓜' },
  'kua': { 1: '夸', 2: '夸', 3: '垮', 4: '跨', 0: '夸' },
  'hua': { 1: '花', 2: '华', 3: '化', 4: '画', 0: '花' },
  'zhu': { 1: '猪', 2: '竹', 3: '主', 4: '住', 0: '猪' },
  'chu': { 1: '出', 2: '除', 3: '楚', 4: '处', 0: '出' },
  'shu': { 1: '书', 2: '熟', 3: '暑', 4: '树', 0: '书' },
  'ru': { 1: '如', 2: '如', 3: '乳', 4: '入', 0: '如' },
  'zu': { 1: '租', 2: '租', 3: '祖', 4: '足', 0: '租' },
  'cu': { 1: '粗', 2: '粗', 3: '粗', 4: '醋', 0: '粗' },
  'su': { 1: '苏', 2: '苏', 3: '素', 4: '诉', 0: '苏' },
  'lü': { 1: '驴', 2: '驴', 3: '旅', 4: '绿', 0: '驴' },
  'nü': { 1: '女', 2: '女', 3: '女', 4: '女', 0: '女' },
  'ju': { 1: '居', 2: '局', 3: '举', 4: '句', 0: '居' },
  'qu': { 1: '区', 2: '渠', 3: '取', 4: '去', 0: '区' },
  'xu': { 1: '虚', 2: '徐', 3: '许', 4: '序', 0: '须' },
  'ai': { 1: '哎', 2: '挨', 3: '矮', 4: '爱', 0: '哎' },
  'ei': { 1: '诶', 2: '诶', 3: '诶', 4: '诶', 0: '诶' },
  'ao': { 1: '凹', 2: '熬', 3: '袄', 4: '奥', 0: '凹' },
  'ou': { 1: '欧', 2: '欧', 3: '偶', 4: '呕', 0: '欧' },
  'an': { 1: '安', 2: '安', 3: '俺', 4: '按', 0: '安' },
  'en': { 1: '恩', 2: '恩', 3: '恩', 4: '恩', 0: '嗯' },
  'ang': { 1: '昂', 2: '昂', 3: '昂', 4: '昂', 0: '昂' },
  'eng': { 1: '鞥', 2: '鞥', 3: '鞥', 4: '鞥', 0: '鞥' },
  'er': { 1: '耳', 2: '儿', 3: '耳', 4: '二', 0: '而' },
}

export function usePinyinAudio() {
  const { settings } = useApp()
  const initialized = useRef(false)

  useEffect(() => {
    const handleInteraction = () => {
      if (!initialized.current) {
        initialized.current = true
        initAudio()
      }
    }

    document.addEventListener('touchstart', handleInteraction)
    document.addEventListener('touchend', handleInteraction)
    document.addEventListener('click', handleInteraction)

    return () => {
      document.removeEventListener('touchstart', handleInteraction)
      document.removeEventListener('touchend', handleInteraction)
      document.removeEventListener('click', handleInteraction)
    }
  }, [])

  const speak = useCallback((text: string) => {
    if (!settings.soundEnabled) return
    speakChinese(text)
  }, [settings.soundEnabled])

  const speakPinyin = useCallback((pinyin: string, tone?: ToneType) => {
    if (!settings.soundEnabled) return
    
    const lowerPinyin = pinyin.toLowerCase().replace('v', 'ü')
    const actualTone = tone ?? 1
    
    let charToSpeak = ''
    
    if (tonedChars[lowerPinyin] && tonedChars[lowerPinyin][actualTone]) {
      charToSpeak = tonedChars[lowerPinyin][actualTone]
    } else if (pinyinToChar[lowerPinyin]) {
      charToSpeak = pinyinToChar[lowerPinyin]
    }
    
    if (charToSpeak) {
      speakChinese(charToSpeak)
    }
  }, [settings.soundEnabled])

  const speakSyllable = useCallback((initial: string, final: string, medial?: string, tone?: ToneType) => {
    if (!settings.soundEnabled) return
    
    const syllable = medial 
      ? initial.toLowerCase() + medial.toLowerCase() + final.toLowerCase() 
      : initial.toLowerCase() + final.toLowerCase()
    
    const actualTone = tone || 1
    
    // 先读声母
    const initialChar = pinyinToChar[initial.toLowerCase()]
    if (initialChar) {
      speakChinese(initialChar)
    }
    
    // 延迟后读韵母
    setTimeout(() => {
      const finalChar = pinyinToChar[final.toLowerCase()]
      if (finalChar) {
        speakChinese(finalChar)
      }
    }, 800)
    
    // 延迟后读完整音节
    setTimeout(() => {
      let charToSpeak = ''
      if (tonedChars[syllable] && tonedChars[syllable][actualTone]) {
        charToSpeak = tonedChars[syllable][actualTone]
      } else if (pinyinToChar[syllable]) {
        charToSpeak = pinyinToChar[syllable]
      }
      
      if (charToSpeak) {
        speakChinese(charToSpeak)
      }
    }, 1600)
  }, [settings.soundEnabled])

  const speakChar = useCallback((char: string) => {
    if (!settings.soundEnabled) return
    speakChinese(char)
  }, [settings.soundEnabled])

  const speakTone = useCallback((tone: ToneType, pinyin: string = 'ma') => {
    if (!settings.soundEnabled) return
    
    const lowerPinyin = pinyin.toLowerCase()
    const chars = tonedChars[lowerPinyin] || tonedChars['ma']
    const char = chars ? chars[tone] : null
    
    if (char) {
      speakChinese(char)
    }
  }, [settings.soundEnabled])

  const playCorrect = useCallback(() => {
    if (!settings.soundEnabled) return
    playCorrectSound()
  }, [settings.soundEnabled])

  const playWrong = useCallback(() => {
    if (!settings.soundEnabled) return
    playWrongSound()
  }, [settings.soundEnabled])

  const stop = useCallback(() => {
    stopAudio()
  }, [])

  return {
    speak,
    speakPinyin,
    speakSyllable,
    speakChar,
    speakTone,
    playCorrect,
    playWrong,
    stop,
  }
}
