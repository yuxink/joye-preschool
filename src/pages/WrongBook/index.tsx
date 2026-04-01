import { useState, useCallback } from 'react'
import { 
  Card, 
  Title, 
  Text, 
  Stack, 
  Button,
  Group,
  Badge,
  Modal,
  Alert,
  Box,
} from '@mantine/core'
import type { WrongQuestion } from '../../types'
import { useApp } from '../../stores/AppContext'
import { useAudio } from '../../hooks/useAudio'
import { checkAnswer } from '../../utils/questionGenerator'
import QuestionCard from '../../components/QuestionCard'
import ProgressBar from '../../components/ProgressBar'
import StarRating, { calculateStars } from '../../components/StarRating'
import {
  IconWrongBook,
  IconRefresh,
  IconArrowRight,
  IconCheck,
} from '../../components/Icons'

// 删除图标
function IconTrash({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  )
}

// 警告图标
function IconAlert({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}

// 书本图标
function IconBook({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  )
}

export default function WrongBook() {
  const { wrongBook, removeWrongQuestion, clearWrongBook, recordAnswer } = useApp()
  const { playCorrect, playWrong, playCompletion } = useAudio()

  const [isPracticing, setIsPracticing] = useState(false)
  const [practiceQuestions, setPracticeQuestions] = useState<WrongQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set())

  const startPractice = useCallback(() => {
    if (wrongBook.length === 0) return
    
    const shuffled = [...wrongBook].sort(() => Math.random() - 0.5)
    setPracticeQuestions(shuffled)
    setCurrentIndex(0)
    setCorrectCount(0)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setMasteredIds(new Set())
    setIsPracticing(true)
  }, [wrongBook])

  const handleAnswer = useCallback((answer: number | string) => {
    if (isAnswered) return

    setSelectedAnswer(answer)
    setIsAnswered(true)

    const currentWrong = practiceQuestions[currentIndex]
    const isCorrect = checkAnswer(currentWrong.question, answer)

    if (isCorrect) {
      setCorrectCount(prev => prev + 1)
      playCorrect()
      setMasteredIds(prev => new Set([...prev, currentWrong.id]))
    } else {
      playWrong()
    }

    recordAnswer(isCorrect, 'math')
  }, [isAnswered, practiceQuestions, currentIndex, recordAnswer, playCorrect, playWrong])

  const handleNext = useCallback(() => {
    if (currentIndex < practiceQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
    } else {
      playCompletion()
      
      masteredIds.forEach(id => {
        removeWrongQuestion(id)
      })
      
      setShowResult(true)
    }
  }, [currentIndex, practiceQuestions.length, playCompletion, masteredIds, removeWrongQuestion])

  const handleFinish = useCallback(() => {
    setShowResult(false)
    setIsPracticing(false)
  }, [])

  const handleClearAll = useCallback(() => {
    clearWrongBook()
    setShowClearConfirm(false)
  }, [clearWrongBook])

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`
  }

  if (showResult) {
    const stars = calculateStars(correctCount, practiceQuestions.length)
    const percentage = Math.round((correctCount / practiceQuestions.length) * 100)
    
    return (
      <Stack gap="lg" align="center" className="py-4 sm:py-8 px-2">
        <Box className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white animate-bounce-in
          ${percentage >= 90 ? 'bg-gradient-to-br from-amber-400 to-orange-500' : 
            percentage >= 70 ? 'bg-gradient-to-br from-emerald-400 to-teal-500' : 
            'bg-gradient-to-br from-blue-400 to-indigo-500'}`}>
          <IconCheck size={32} />
        </Box>

        <Title order={2} className="text-center text-slate-800 animate-slide-up">
          复习完成！
        </Title>
        
        <div className="animate-slide-up stagger-2">
          <StarRating stars={stars} size={48} animated />
        </div>
        
        <Card shadow="none" padding="xl" radius="xl" className="w-full max-w-md animate-slide-up stagger-3 border border-slate-100 hover:shadow-lg transition-shadow">
          <Stack gap="md" align="center">
            <Group gap="xs" className="text-4xl">
              <span className="text-emerald-500 font-bold">{correctCount}</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-600 font-bold">{practiceQuestions.length}</span>
            </Group>
            <Text c="dimmed">
              已掌握 <span className="font-bold text-emerald-500">{masteredIds.size}</span> 道题，已从错题本移除
            </Text>
          </Stack>
        </Card>

        <Button
          variant="filled"
          color="indigo"
          size="lg"
          onClick={handleFinish}
          className="min-h-[52px] hover:scale-[1.02] active:scale-[0.98] transition-transform"
        >
          完成
        </Button>
      </Stack>
    )
  }

  if (isPracticing && practiceQuestions.length > 0) {
    const currentWrong = practiceQuestions[currentIndex]

    return (
      <Stack gap="md" className="px-1">
        <ProgressBar
          current={currentIndex + 1}
          total={practiceQuestions.length}
          correct={correctCount}
        />

        <Alert 
          icon={<IconAlert size={16} />} 
          color="orange" 
          variant="light"
          radius="lg"
          className="mb-2"
        >
          上次答案：{currentWrong.userAnswer}，正确答案：{currentWrong.correctAnswer}
        </Alert>

        <QuestionCard
          question={currentWrong.question}
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
            {currentIndex < practiceQuestions.length - 1 ? '下一题' : '查看结果'}
          </Button>
        )}
      </Stack>
    )
  }

  return (
    <Stack gap="md" className="px-1">
      {/* 顶部标题 */}
      <Box className="text-center py-2">
        <Group justify="center" gap="sm" mb="xs">
          <Box className="w-10 h-10 rounded-xl bg-rose-500 flex items-center justify-center text-white">
            <IconWrongBook size={22} />
          </Box>
        </Group>
        <Title order={2} className="text-xl font-semibold text-slate-800">
          错题本
        </Title>
        {wrongBook.length > 0 && (
          <Button
            variant="subtle"
            color="red"
            size="xs"
            leftSection={<IconTrash size={14} />}
            onClick={() => setShowClearConfirm(true)}
            className="mt-2"
          >
            清空全部
          </Button>
        )}
      </Box>

      {wrongBook.length === 0 ? (
        <Card shadow="none" padding="xl" radius="xl" className="text-center border border-slate-100 hover:shadow-md transition-shadow">
          <Stack align="center" gap="md">
            <Box className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-500">
              <IconBook size={32} />
            </Box>
            <Text size="lg" fw={600} className="text-slate-800">
              太棒了！没有错题
            </Text>
            <Text size="sm" c="dimmed">
              继续保持，加油！
            </Text>
          </Stack>
        </Card>
      ) : (
        <>
          <Card shadow="none" padding="lg" radius="xl" className="bg-gradient-to-r from-rose-500 to-pink-500 hover:shadow-lg transition-shadow">
            <Group justify="space-between" align="center">
              <Stack gap={4}>
                <Text fw={700} className="text-white">共 {wrongBook.length} 道错题</Text>
                <Text size="sm" className="text-white/80">复习巩固，掌握知识点</Text>
              </Stack>
              <Button
                variant="white"
                color="dark"
                leftSection={<IconRefresh size={18} />}
                onClick={startPractice}
                className="hover:scale-[1.02] active:scale-[0.98] transition-transform font-semibold"
              >
                开始复习
              </Button>
            </Group>
          </Card>

          <Stack gap="sm">
            {wrongBook.map((item, index) => (
              <Card 
                key={item.id} 
                shadow="none" 
                padding="md" 
                radius="lg" 
                className={`border border-slate-100 hover:shadow-lg hover:scale-[1.01] transition-all animate-slide-up stagger-${Math.min(index + 1, 5)}`}
              >
                <Group justify="space-between" align="flex-start">
                  <Stack gap={4} className="flex-1">
                    <Text fw={600} className="text-slate-800">{item.question.content}</Text>
                    <Group gap="xs">
                      <Badge color="red" variant="light" size="sm">
                        你的答案：{item.userAnswer}
                      </Badge>
                      <Badge color="green" variant="light" size="sm">
                        正确答案：{item.correctAnswer}
                      </Badge>
                    </Group>
                    <Text size="xs" c="dimmed">
                      {formatDate(item.timestamp)} · 错误{item.retryCount + 1}次
                    </Text>
                  </Stack>
                  <Button
                    variant="subtle"
                    color="gray"
                    size="xs"
                    onClick={() => removeWrongQuestion(item.id)}
                    className="hover:scale-105 transition-transform"
                  >
                    <IconTrash size={16} />
                  </Button>
                </Group>
              </Card>
            ))}
          </Stack>
        </>
      )}

      <Modal
        opened={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        title="确认清空"
        centered
        radius="lg"
      >
        <Stack gap="md">
          <Text>确定要清空所有错题吗？此操作无法撤销。</Text>
          <Group justify="flex-end">
            <Button variant="light" onClick={() => setShowClearConfirm(false)}>
              取消
            </Button>
            <Button color="red" onClick={handleClearAll}>
              确认清空
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* 底部间距 */}
      <Box className="h-4" />
    </Stack>
  )
}
