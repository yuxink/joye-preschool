import { useState, useCallback, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  Card, 
  SimpleGrid, 
  Title, 
  Text, 
  Stack, 
  Button,
  Group,
  Badge,
  Box,
  Accordion,
} from '@mantine/core'
import type { Question, WrongQuestion, LevelConfig } from '../../types'
import { useApp } from '../../stores/AppContext'
import { useAudio } from '../../hooks/useAudio'
import { levels, difficultyLabels, difficultyColors, getLevelById } from '../../data/levels'
import { generateQuestions, checkAnswer } from '../../utils/questionGenerator'
import QuestionCard from '../../components/QuestionCard'
import ProgressBar from '../../components/ProgressBar'
import StarRating, { calculateStars } from '../../components/StarRating'
import {
  IconChallenge,
  IconStar,
  IconCheck,
  IconArrowRight,
  IconRefresh,
  IconBack,
} from '../../components/Icons'

// 锁图标
function IconLock({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

// 奖杯图标
function IconTrophy({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  )
}

export default function Challenge() {
  const { levelId } = useParams<{ levelId: string }>()
  const navigate = useNavigate()
  const { challengeProgress, updateChallengeProgress, recordAnswer, addWrongQuestion } = useApp()
  const { playCorrect, playWrong, playCompletion } = useAudio()

  const [currentLevel, setCurrentLevel] = useState<LevelConfig | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    if (levelId) {
      const level = getLevelById(levelId)
      if (level) {
        setCurrentLevel(level)
        startLevel(level)
      }
    }
  }, [levelId])

  const isLevelUnlocked = useCallback((level: LevelConfig): boolean => {
    if (!level.unlockCondition) return true
    
    const requiredLevels = level.unlockCondition.split(',')
    return requiredLevels.every(id => {
      const progress = challengeProgress[id]
      return progress?.completed
    })
  }, [challengeProgress])

  const startLevel = useCallback((level: LevelConfig) => {
    const newQuestions = generateQuestions(level.questionTypes, level.questionCount)
    setQuestions(newQuestions)
    setCurrentIndex(0)
    setCorrectCount(0)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setIsPlaying(true)
    setShowResult(false)
  }, [])

  const handleSelectLevel = useCallback((level: LevelConfig) => {
    if (!isLevelUnlocked(level)) return
    navigate(`/challenge/${level.id}`)
  }, [navigate, isLevelUnlocked])

  const handleAnswer = useCallback((answer: number | string) => {
    if (isAnswered) return

    setSelectedAnswer(answer)
    setIsAnswered(true)

    const currentQuestion = questions[currentIndex]
    const isCorrect = checkAnswer(currentQuestion, answer)

    if (isCorrect) {
      setCorrectCount(prev => prev + 1)
      playCorrect()
    } else {
      playWrong()
      const wrongQuestion: WrongQuestion = {
        id: currentQuestion.id,
        question: currentQuestion,
        userAnswer: answer,
        correctAnswer: currentQuestion.answer,
        timestamp: Date.now(),
        retryCount: 0,
      }
      addWrongQuestion(wrongQuestion)
    }

    recordAnswer(isCorrect, 'math')
  }, [isAnswered, questions, currentIndex, recordAnswer, addWrongQuestion, playCorrect, playWrong])

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
    } else {
      playCompletion()
      
      if (currentLevel) {
        const stars = calculateStars(correctCount, questions.length)
        const currentProgress = challengeProgress[currentLevel.id]
        
        updateChallengeProgress(currentLevel.id, {
          completed: true,
          stars: Math.max(stars, currentProgress?.stars || 0),
          attempts: (currentProgress?.attempts || 0) + 1,
          bestScore: Math.max(correctCount, currentProgress?.bestScore || 0),
        })
      }
      
      setShowResult(true)
    }
  }, [currentIndex, questions.length, playCompletion, currentLevel, correctCount, challengeProgress, updateChallengeProgress])

  const handleBackToLevels = useCallback(() => {
    setIsPlaying(false)
    setShowResult(false)
    setCurrentLevel(null)
    navigate('/challenge')
  }, [navigate])

  const handleRetry = useCallback(() => {
    if (currentLevel) {
      startLevel(currentLevel)
    }
  }, [currentLevel, startLevel])

  if (showResult && currentLevel) {
    const stars = calculateStars(correctCount, questions.length)
    const percentage = Math.round((correctCount / questions.length) * 100)
    
    return (
      <Stack gap="lg" align="center" className="py-4 sm:py-8 px-2">
        <Box className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white animate-bounce-in
          ${stars === 3 ? 'bg-gradient-to-br from-amber-400 to-orange-500' : 
            stars >= 2 ? 'bg-gradient-to-br from-emerald-400 to-teal-500' : 
            'bg-gradient-to-br from-blue-400 to-indigo-500'}`}>
          <IconTrophy size={32} />
        </Box>

        <Title order={2} className="text-center text-slate-800 animate-slide-up">
          {currentLevel.name} 完成！
        </Title>
        
        <div className="animate-slide-up stagger-2">
          <StarRating stars={stars} size={56} animated />
        </div>
        
        <Card shadow="none" padding="xl" radius="xl" className="w-full max-w-md animate-slide-up stagger-3 border border-slate-100 hover:shadow-lg transition-shadow">
          <Stack gap="md" align="center">
            <Group gap="xs" className="text-4xl">
              <span className="text-emerald-500 font-bold">{correctCount}</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-600 font-bold">{questions.length}</span>
            </Group>
            <Text size="lg" c="dimmed">
              正确率：
              <span className={`font-bold ${percentage >= 70 ? 'text-emerald-500' : 'text-orange-500'}`}>
                {percentage}%
              </span>
            </Text>
            {stars === 3 && (
              <Badge size="lg" color="amber" variant="light">
                <Group gap="xs">
                  <IconStar size={14} />
                  <span>满星通关！太棒了！</span>
                </Group>
              </Badge>
            )}
          </Stack>
        </Card>

        <Group className="w-full max-w-md animate-slide-up stagger-4" grow>
          <Button
            variant="light"
            color="gray"
            size="lg"
            leftSection={<IconBack size={18} />}
            onClick={handleBackToLevels}
            className="min-h-[52px] hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            返回关卡
          </Button>
          <Button
            variant="filled"
            color="indigo"
            size="lg"
            leftSection={<IconRefresh size={18} />}
            onClick={handleRetry}
            className="min-h-[52px] hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            再挑战一次
          </Button>
        </Group>
      </Stack>
    )
  }

  if (isPlaying && currentLevel && questions.length > 0) {
    const currentQuestion = questions[currentIndex]

    return (
      <Stack gap="md" className="px-1">
        <Group justify="space-between" align="center">
          <Badge 
            size="lg" 
            color={difficultyColors[currentLevel.difficulty]}
          >
            {currentLevel.name}
          </Badge>
          <Button variant="subtle" size="sm" onClick={handleBackToLevels}>
            退出
          </Button>
        </Group>

        <ProgressBar
          current={currentIndex + 1}
          total={questions.length}
          correct={correctCount}
        />

        <QuestionCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          isAnswered={isAnswered}
          onAnswer={handleAnswer}
        />

        {isAnswered && (
          <Button
            variant="filled"
            color="indigo"
            size="xl"
            onClick={handleNext}
            rightSection={<IconArrowRight size={20} />}
            className="mt-2 min-h-[56px] text-lg animate-pop hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            {currentIndex < questions.length - 1 ? '下一题' : '查看结果'}
          </Button>
        )}
      </Stack>
    )
  }

  const groupedLevels = {
    beginner: levels.filter(l => l.difficulty === 'beginner'),
    intermediate: levels.filter(l => l.difficulty === 'intermediate'),
    challenge: levels.filter(l => l.difficulty === 'challenge'),
  }

  return (
    <Stack gap="md" className="px-1">
      {/* 顶部标题 */}
      <Box className="text-center py-2">
        <Group justify="center" gap="sm" mb="xs">
          <Box className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white">
            <IconChallenge size={22} />
          </Box>
        </Group>
        <Title order={2} className="text-xl font-semibold text-slate-800">
          闯关模式
        </Title>
        <Text c="dimmed" size="sm" mt="xs">
          完成关卡获得星星奖励
        </Text>
      </Box>

      <Accordion defaultValue="beginner" variant="separated" radius="lg">
        {(['beginner', 'intermediate', 'challenge'] as const).map((difficulty) => (
          <Accordion.Item key={difficulty} value={difficulty}>
            <Accordion.Control>
              <Group gap="sm">
                <Box
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: difficultyColors[difficulty] }}
                />
                <Text fw={700} className="text-slate-800">{difficultyLabels[difficulty]}</Text>
                <Badge size="sm" variant="light">
                  {groupedLevels[difficulty].length}关
                </Badge>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
                {groupedLevels[difficulty].map((level) => {
                  const progress = challengeProgress[level.id]
                  const unlocked = isLevelUnlocked(level)
                  
                  return (
                    <Card
                      key={level.id}
                      shadow="none"
                      padding="md"
                      radius="lg"
                      className={`
                        transition-all duration-200 border border-slate-100
                        ${unlocked 
                          ? 'cursor-pointer hover:shadow-lg hover:scale-[1.02] hover:-translate-y-0.5' 
                          : 'opacity-60 cursor-not-allowed bg-slate-50'
                        }
                      `}
                      onClick={() => handleSelectLevel(level)}
                    >
                      <Group justify="space-between" align="flex-start">
                        <Stack gap={4}>
                          <Group gap="xs">
                            {!unlocked && <IconLock size={16} className="text-slate-400" />}
                            {progress?.completed && (
                              <Box className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                <IconCheck size={12} />
                              </Box>
                            )}
                            <Text fw={600} className="text-slate-800">{level.name}</Text>
                          </Group>
                          <Text size="xs" c="dimmed">{level.description}</Text>
                          <Text size="xs" c="dimmed">{level.questionCount}题</Text>
                        </Stack>
                        
                        {progress && (
                          <StarRating stars={progress.stars} size={18} />
                        )}
                      </Group>
                    </Card>
                  )
                })}
              </SimpleGrid>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>

      {/* 底部间距 */}
      <Box className="h-4" />
    </Stack>
  )
}
