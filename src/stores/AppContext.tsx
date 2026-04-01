import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { 
  AppContextType, 
  Settings, 
  Progress, 
  WrongQuestion, 
  ChallengeProgress,
  LevelProgress,
  PinyinFavorite,
} from '../types'
import { 
  loadAppData, 
  saveAppData, 
  checkAndUpdateStreak,
  getTodayDateString 
} from '../utils/storage'

const AppContext = createContext<AppContextType | null>(null)

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const [settings, setSettings] = useState<Settings>(() => loadAppData().settings)
  const [progress, setProgress] = useState<Progress>(() => {
    const data = loadAppData().progress
    return {
      ...data,
      englishProgress: data.englishProgress || { totalQuestions: 0, correctAnswers: 0, learnedWords: [] }
    }
  })
  const [wrongBook, setWrongBook] = useState<WrongQuestion[]>(() => loadAppData().wrongBook)
  const [challengeProgress, setChallengeProgress] = useState<ChallengeProgress>(
    () => loadAppData().challengeProgress
  )
  const [pinyinFavorites, setPinyinFavorites] = useState<PinyinFavorite[]>(
    () => loadAppData().pinyinFavorites || []
  )

  useEffect(() => {
    const data = checkAndUpdateStreak(loadAppData())
    setProgress(prev => ({
      ...data.progress,
      englishProgress: prev.englishProgress || { totalQuestions: 0, correctAnswers: 0, learnedWords: [] }
    }))
    saveAppData(data)
  }, [])

  useEffect(() => {
    saveAppData({ settings, progress, wrongBook, challengeProgress, pinyinFavorites })
  }, [settings, progress, wrongBook, challengeProgress, pinyinFavorites])

  const updateSettings = useCallback((newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }, [])

  const updateProgress = useCallback((newProgress: Partial<Progress>) => {
    setProgress(prev => ({ ...prev, ...newProgress }))
  }, [])

  const addWrongQuestion = useCallback((question: WrongQuestion) => {
    setWrongBook(prev => {
      const existingIndex = prev.findIndex(q => q.id === question.id)
      if (existingIndex >= 0) {
        const updated = [...prev]
        updated[existingIndex] = {
          ...question,
          retryCount: prev[existingIndex].retryCount + 1,
        }
        return updated
      }
      return [...prev, question]
    })
  }, [])

  const removeWrongQuestion = useCallback((id: string) => {
    setWrongBook(prev => prev.filter(q => q.id !== id))
  }, [])

  const clearWrongBook = useCallback(() => {
    setWrongBook([])
  }, [])

  const updateChallengeProgress = useCallback((levelId: string, levelProgress: Partial<LevelProgress>) => {
    setChallengeProgress(prev => {
      const existing = prev[levelId] || { stars: 0, completed: false, attempts: 0 }
      return {
        ...prev,
        [levelId]: {
          ...existing,
          ...levelProgress,
        },
      }
    })
  }, [])

  const resetAllData = useCallback(() => {
    const defaultSettings: Settings = {
      fontSize: 'medium',
      soundEnabled: true,
      theme: 'cartoon',
      pinyinSpeed: 'normal',
      showSpellingHint: true,
    }
    const defaultProgress: Progress = {
      totalQuestions: 0,
      correctAnswers: 0,
      streak: 0,
      lastActiveDate: getTodayDateString(),
      todayQuestions: 0,
      todayCorrect: 0,
      mathProgress: { totalQuestions: 0, correctAnswers: 0 },
      pinyinProgress: { totalQuestions: 0, correctAnswers: 0, learnedPinyin: [] },
      englishProgress: { totalQuestions: 0, correctAnswers: 0, learnedWords: [] },
    }
    setSettings(defaultSettings)
    setProgress(defaultProgress)
    setWrongBook([])
    setChallengeProgress({})
    setPinyinFavorites([])
  }, [])

  const recordAnswer = useCallback((isCorrect: boolean, module: 'math' | 'pinyin' = 'math') => {
    setProgress(prev => {
      const moduleProgress = module === 'math' ? prev.mathProgress : prev.pinyinProgress
      
      return {
        ...prev,
        totalQuestions: prev.totalQuestions + 1,
        correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
        todayQuestions: prev.todayQuestions + 1,
        todayCorrect: isCorrect ? prev.todayCorrect + 1 : prev.todayCorrect,
        lastActiveDate: getTodayDateString(),
        mathProgress: module === 'math' ? {
          totalQuestions: moduleProgress.totalQuestions + 1,
          correctAnswers: isCorrect ? moduleProgress.correctAnswers + 1 : moduleProgress.correctAnswers,
        } : prev.mathProgress,
        pinyinProgress: module === 'pinyin' ? {
          ...prev.pinyinProgress,
          totalQuestions: prev.pinyinProgress.totalQuestions + 1,
          correctAnswers: isCorrect ? prev.pinyinProgress.correctAnswers + 1 : prev.pinyinProgress.correctAnswers,
        } : prev.pinyinProgress,
      }
    })
  }, [])

  const addPinyinFavorite = useCallback((pinyin: string) => {
    setPinyinFavorites(prev => {
      if (prev.some(f => f.pinyin === pinyin)) return prev
      return [...prev, { pinyin, addedAt: Date.now() }]
    })
  }, [])

  const removePinyinFavorite = useCallback((pinyin: string) => {
    setPinyinFavorites(prev => prev.filter(f => f.pinyin !== pinyin))
  }, [])

  const markPinyinLearned = useCallback((pinyin: string) => {
    setProgress(prev => {
      if (prev.pinyinProgress.learnedPinyin.includes(pinyin)) return prev
      return {
        ...prev,
        pinyinProgress: {
          ...prev.pinyinProgress,
          learnedPinyin: [...prev.pinyinProgress.learnedPinyin, pinyin],
        },
      }
    })
  }, [])

  const updatePinyinProgress = useCallback((totalQuestions: number, correctAnswers: number) => {
    setProgress(prev => ({
      ...prev,
      totalQuestions: prev.totalQuestions + totalQuestions,
      correctAnswers: prev.correctAnswers + correctAnswers,
      todayQuestions: prev.todayQuestions + totalQuestions,
      todayCorrect: prev.todayCorrect + correctAnswers,
      lastActiveDate: getTodayDateString(),
      pinyinProgress: {
        ...prev.pinyinProgress,
        totalQuestions: prev.pinyinProgress.totalQuestions + totalQuestions,
        correctAnswers: prev.pinyinProgress.correctAnswers + correctAnswers,
      },
    }))
  }, [])

  const updateEnglishProgress = useCallback((totalQuestions: number, correctAnswers: number) => {
    setProgress(prev => ({
      ...prev,
      totalQuestions: prev.totalQuestions + totalQuestions,
      correctAnswers: prev.correctAnswers + correctAnswers,
      todayQuestions: prev.todayQuestions + totalQuestions,
      todayCorrect: prev.todayCorrect + correctAnswers,
      lastActiveDate: getTodayDateString(),
      englishProgress: {
        ...prev.englishProgress,
        totalQuestions: prev.englishProgress.totalQuestions + totalQuestions,
        correctAnswers: prev.englishProgress.correctAnswers + correctAnswers,
      },
    }))
  }, [])

  const value: AppContextType = {
    settings,
    progress,
    wrongBook,
    challengeProgress,
    pinyinFavorites,
    updateSettings,
    updateProgress,
    addWrongQuestion,
    removeWrongQuestion,
    clearWrongBook,
    updateChallengeProgress,
    resetAllData,
    recordAnswer,
    addPinyinFavorite,
    removePinyinFavorite,
    markPinyinLearned,
    updatePinyinProgress,
    updateEnglishProgress,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp(): AppContextType {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
