import { useCallback, useRef, useEffect } from 'react'
import { useApp } from '../stores/AppContext'
import { numberWords } from '../data/encouragements'
import {
  initAudio,
  speakChinese,
  playCorrectSound,
  playWrongSound,
  playCompletionSound,
  playClickSound,
  stopAudio,
} from '../utils/audioPlayer'

export function useAudio() {
  const { settings } = useApp()
  const initialized = useRef(false)

  useEffect(() => {
    const handleInteraction = () => {
      if (!initialized.current) {
        initialized.current = true
        initAudio()
      }
    }

    // 多种事件确保能触发
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

  const speakNumber = useCallback((num: number) => {
    if (!settings.soundEnabled) return
    const word = numberWords[num] || String(num)
    speakChinese(word)
  }, [settings.soundEnabled])

  const playCorrect = useCallback(() => {
    if (!settings.soundEnabled) return
    playCorrectSound()
  }, [settings.soundEnabled])

  const playWrong = useCallback(() => {
    if (!settings.soundEnabled) return
    playWrongSound()
  }, [settings.soundEnabled])

  const playCompletion = useCallback(() => {
    if (!settings.soundEnabled) return
    playCompletionSound()
  }, [settings.soundEnabled])

  const speakQuestion = useCallback((question: string) => {
    if (!settings.soundEnabled) return
    let readable = question
      .replace(/\+/g, '加')
      .replace(/-/g, '减')
      .replace(/×/g, '乘')
      .replace(/÷/g, '除')
      .replace(/=/g, '等于')
      .replace(/\?/g, '多少')
      .replace(/○/g, '圈圈')
    speakChinese(readable)
  }, [settings.soundEnabled])

  const stop = useCallback(() => {
    stopAudio()
  }, [])

  const playClick = useCallback(() => {
    if (!settings.soundEnabled) return
    playClickSound()
  }, [settings.soundEnabled])

  return {
    speak,
    speakNumber,
    playCorrect,
    playWrong,
    playCompletion,
    speakQuestion,
    stop,
    playClick,
  }
}
