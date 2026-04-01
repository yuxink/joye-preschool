import { useCallback, useEffect, useRef } from 'react'
import { useApp } from '../stores/AppContext'
import {
  initAudio,
  speakEnglish,
  playClickSound,
  stopAudio,
} from '../utils/audioPlayer'

export function useEnglishAudio() {
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
    speakEnglish(text)
  }, [settings.soundEnabled])

  const speakWord = useCallback((word: string) => {
    if (!settings.soundEnabled) return
    speakEnglish(word)
  }, [settings.soundEnabled])

  const speakSentence = useCallback((sentence: string) => {
    if (!settings.soundEnabled) return
    speakEnglish(sentence)
  }, [settings.soundEnabled])

  const speakSlow = useCallback((text: string) => {
    if (!settings.soundEnabled) return
    // 有道没有慢速选项，直接播放
    speakEnglish(text)
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
    speakWord,
    speakSentence,
    speakSlow,
    stop,
    playClick,
  }
}
