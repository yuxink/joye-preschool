import { useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { 
  Card, 
  SimpleGrid, 
  Title, 
  Text, 
  Stack, 
  Button,
  Group,
  Badge,
  Slider,
  Box,
  Transition,
} from '@mantine/core'
import type { QuestionType, Question, WrongQuestion } from '../../types'
import { useApp } from '../../stores/AppContext'
import { useAudio } from '../../hooks/useAudio'
import { generateQuestions, checkAnswer } from '../../utils/questionGenerator'
import QuestionCard from '../../components/QuestionCard'
import ProgressBar from '../../components/ProgressBar'
import StarRating, { calculateStars } from '../../components/StarRating'
import {
  IconPlus,
  IconMinus,
  IconPlusMinus,
  IconPlusPlus,
  IconMinusMinus,
  IconSum,
  IconSplit,
  IconNeighbor,
  IconCompare,
  IconCount,
  IconSort,
  IconBasicMath,
  IconNumberSense,
  IconFun,
  IconStar,
  IconCheck,
  IconRefresh,
  IconPlay,
  IconArrowRight,
} from '../../components/Icons'

interface PracticeTypeConfig {
  type: QuestionType
  label: string
  description: string
  icon: React.ReactNode
  iconBg: string
  category: 'basic' | 'number' | 'fun'
}

// 应用题图标
function IconWordProblem({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="12" y1="18" x2="12" y2="12" />
      <line x1="9" y1="15" x2="15" y2="15" />
    </svg>
  )
}

const practiceTypes: PracticeTypeConfig[] = [
  { type: 'addition10', label: '10以内加法', description: '简单加法入门', icon: <IconPlus size={18} />, iconBg: 'bg-blue-500', category: 'basic' },
  { type: 'subtraction10', label: '10以内减法', description: '简单减法入门', icon: <IconMinus size={18} />, iconBg: 'bg-indigo-500', category: 'basic' },
  { type: 'mixed10', label: '10以内混合', description: '加减法混合练习', icon: <IconPlusMinus size={18} />, iconBg: 'bg-violet-500', category: 'basic' },
  { type: 'addition20', label: '20以内加法', description: '进阶加法练习', icon: <IconPlusPlus size={18} />, iconBg: 'bg-cyan-500', category: 'basic' },
  { type: 'subtraction20', label: '20以内减法', description: '进阶减法练习', icon: <IconMinusMinus size={18} />, iconBg: 'bg-teal-500', category: 'basic' },
  { type: 'mixed20', label: '20以内混合', description: '加减法综合', icon: <IconSum size={18} />, iconBg: 'bg-emerald-500', category: 'basic' },
  { type: 'decompose', label: '拆数游戏', description: '数字分解组合', icon: <IconSplit size={18} />, iconBg: 'bg-pink-500', category: 'fun' },
  { type: 'adjacent', label: '找邻居', description: '找前后相邻数', icon: <IconNeighbor size={18} />, iconBg: 'bg-purple-500', category: 'number' },
  { type: 'compare', label: '比大小', description: '比较数字大小', icon: <IconCompare size={18} />, iconBg: 'bg-rose-500', category: 'number' },
  { type: 'wordProblem', label: '生活应用', description: '解决生活问题', icon: <IconWordProblem size={18} />, iconBg: 'bg-amber-500', category: 'fun' },
  { type: 'counting', label: '数一数', description: '数数有几个', icon: <IconCount size={18} />, iconBg: 'bg-orange-500', category: 'fun' },
  { type: 'sequence', label: '排排序', description: '数字排序练习', icon: <IconSort size={18} />, iconBg: 'bg-lime-500', category: 'fun' },
]

const categoryLabels = {
  basic: { label: '基础运算', icon: <IconBasicMath size={14} />, iconBg: 'bg-blue-500' },
  number: { label: '数感培养', icon: <IconNumberSense size={14} />, iconBg: 'bg-purple-500' },
  fun: { label: '趣味练习', icon: <IconFun size={14} />, iconBg: 'bg-orange-500' },
}

const questionCountMarks = [
  { value: 5, label: '5题' },
  { value: 10, label: '10题' },
  { value: 15, label: '15题' },
  { value: 20, label: '20题' },
]

export default function Practice() {
  const { type: urlType } = useParams<{ type: string }>()
  const { recordAnswer, addWrongQuestion } = useApp()
  const { playCorrect, playWrong, playCompletion } = useAudio()

  const [selectedType, setSelectedType] = useState<QuestionType | null>(
    urlType as QuestionType || null
  )
  const [questionCount, setQuestionCount] = useState<number>(10)
  const [isPracticing, setIsPracticing] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const selectedConfig = practiceTypes.find(p => p.type === selectedType)

  const startPractice = useCallback(() => {
    if (!selectedType) return
    
    const newQuestions = generateQuestions([selectedType], questionCount)
    setQuestions(newQuestions)
    setCurrentIndex(0)
    setCorrectCount(0)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setIsPracticing(true)
  }, [selectedType, questionCount])

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
      setShowResult(true)
      setIsPracticing(false)
    }
  }, [currentIndex, questions.length, playCompletion])

  const handleRestart = useCallback(() => {
    setSelectedType(null)
    setShowResult(false)
    setIsPracticing(false)
  }, [])

  const handlePracticeAgain = useCallback(() => {
    setShowResult(false)
    startPractice()
  }, [startPractice])

  if (showResult) {
    const percentage = Math.round((correctCount / questions.length) * 100)
    const stars = calculateStars(correctCount, questions.length)

    return (
      <Stack gap="lg" align="center" className="py-4 sm:py-8 px-2">
        <Box className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white animate-bounce-in
          ${percentage >= 90 ? 'bg-gradient-to-br from-amber-400 to-orange-500' : 
            percentage >= 70 ? 'bg-gradient-to-br from-emerald-400 to-teal-500' : 
            percentage >= 50 ? 'bg-gradient-to-br from-blue-400 to-indigo-500' : 
            'bg-gradient-to-br from-slate-400 to-slate-500'}`}>
          {percentage >= 90 ? <IconStar size={32} /> : 
           percentage >= 70 ? <IconCheck size={32} /> : 
           percentage >= 50 ? <IconArrowRight size={32} /> : 
           <IconRefresh size={32} />}
        </Box>
        
        <Title order={2} className="text-center text-slate-800 animate-slide-up">
          练习完成！
        </Title>
        
        <div className="animate-slide-up stagger-2">
          <StarRating stars={stars} size={48} animated />
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
            {percentage === 100 && (
              <Badge size="lg" color="amber" variant="light">
                <Group gap="xs">
                  <IconStar size={14} />
                  <span>全部正确！太棒了！</span>
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
            onClick={handleRestart}
            className="min-h-[52px] hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            换个类型
          </Button>
          <Button
            variant="filled"
            color="indigo"
            size="lg"
            onClick={handlePracticeAgain}
            leftSection={<IconRefresh size={18} />}
            className="min-h-[52px] hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            再练一次
          </Button>
        </Group>
      </Stack>
    )
  }

  if (isPracticing && questions.length > 0) {
    const currentQuestion = questions[currentIndex]

    return (
      <Stack gap="md" className="px-1">
        <ProgressBar
          current={currentIndex + 1}
          total={questions.length}
          correct={correctCount}
        />

        <Transition mounted={true} transition="pop" duration={300}>
          {(styles) => (
            <div style={styles}>
              <QuestionCard
                question={currentQuestion}
                selectedAnswer={selectedAnswer}
                isAnswered={isAnswered}
                onAnswer={handleAnswer}
              />
            </div>
          )}
        </Transition>

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

  const groupedTypes = {
    basic: practiceTypes.filter(p => p.category === 'basic'),
    number: practiceTypes.filter(p => p.category === 'number'),
    fun: practiceTypes.filter(p => p.category === 'fun'),
  }

  return (
    <Stack gap="md" className="px-1">
      {/* 顶部标题 */}
      <Box className="text-center py-2">
        <Group justify="center" gap="sm" mb="xs">
          <Box className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white">
            <IconSum size={22} />
          </Box>
        </Group>
        <Title order={2} className="text-xl font-semibold text-slate-800">
          数学练习
        </Title>
        <Text c="dimmed" size="sm" mt="xs">
          选择题型开始练习
        </Text>
      </Box>

      {selectedType && selectedConfig && (
        <Card 
          shadow="none" 
          padding="lg" 
          radius="xl" 
          className="bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100 animate-slide-up hover:shadow-md transition-shadow"
        >
          <Stack gap="md">
            <Group justify="space-between" align="center" wrap="nowrap">
              <Group gap="sm" wrap="nowrap">
                <Box className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${selectedConfig.iconBg}`}>
                  {selectedConfig.icon}
                </Box>
                <div>
                  <Text fw={700} size="lg" className="text-slate-800">{selectedConfig.label}</Text>
                  <Text size="sm" c="dimmed">{selectedConfig.description}</Text>
                </div>
              </Group>
              <Button 
                variant="subtle" 
                color="gray" 
                size="sm"
                onClick={() => setSelectedType(null)}
                className="hover:scale-105 transition-transform"
              >
                换一个
              </Button>
            </Group>

            <Box className="px-2">
              <Text size="sm" fw={500} mb="xs" className="text-slate-600">
                题目数量: <span className="text-indigo-600 font-bold">{questionCount}题</span>
              </Text>
              <Slider
                value={questionCount}
                onChange={setQuestionCount}
                min={5}
                max={20}
                step={5}
                marks={questionCountMarks}
                color="indigo"
                size="lg"
                className="mb-6"
              />
            </Box>

            <Button
              variant="filled"
              color="indigo"
              size="xl"
              onClick={startPractice}
              leftSection={<IconPlay size={20} />}
              className="min-h-[56px] text-lg hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              开始练习
            </Button>
          </Stack>
        </Card>
      )}

      {!selectedType && (
        <>
          {(['basic', 'number', 'fun'] as const).map((category, catIndex) => (
            <Box key={category} className={`animate-slide-up stagger-${catIndex + 1}`}>
              <Group gap="sm" mb="sm">
                <Box className={`w-7 h-7 rounded-lg flex items-center justify-center text-white ${categoryLabels[category].iconBg}`}>
                  {categoryLabels[category].icon}
                </Box>
                <Text fw={600} size="md" className="text-slate-700">{categoryLabels[category].label}</Text>
                <Badge size="sm" color="gray" variant="light">
                  {groupedTypes[category].length}种
                </Badge>
              </Group>
              
              <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="sm">
                {groupedTypes[category].map((item, index) => (
                  <Card
                    key={item.type}
                    shadow="none"
                    padding="sm"
                    radius="xl"
                    className={`
                      cursor-pointer transition-all duration-200 touch-manipulation border
                      hover:shadow-lg hover:scale-[1.02] hover:border-indigo-200
                      active:scale-[0.98]
                      ${selectedType === item.type 
                        ? 'ring-2 ring-indigo-500 border-indigo-200 bg-indigo-50' 
                        : 'border-slate-100 bg-white'
                      }
                      animate-pop stagger-${index + 1}
                    `}
                    onClick={() => setSelectedType(item.type)}
                  >
                    <Stack align="center" gap="xs" className="py-2">
                      <Box className={`w-11 h-11 rounded-xl flex items-center justify-center text-white ${item.iconBg}`}>
                        {item.icon}
                      </Box>
                      <Text fw={600} size="sm" ta="center" lineClamp={1} className="text-slate-800">
                        {item.label}
                      </Text>
                      <Text size="xs" c="dimmed" ta="center" lineClamp={1} className="hidden sm:block">
                        {item.description}
                      </Text>
                    </Stack>
                  </Card>
                ))}
              </SimpleGrid>
            </Box>
          ))}
        </>
      )}
    </Stack>
  )
}
