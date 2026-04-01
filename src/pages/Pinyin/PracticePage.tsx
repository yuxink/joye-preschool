import { useState, useCallback } from 'react'
import { 
  Card, 
  Title, 
  Text, 
  Stack, 
  Button,
  Group,
  Box,
  Progress,
  SimpleGrid,
} from '@mantine/core'
import { useApp } from '../../stores/AppContext'
import { usePinyinAudio } from '../../hooks/usePinyinAudio'
import { useAudio } from '../../hooks/useAudio'
import { 
  getRandomPinyinCharPairs, 
  PinyinCharPair,
} from '../../data/pinyin/questions'
import { getTonedPinyin } from '../../data/pinyin/syllables'
import { IconRefresh, IconPlay, IconStar, IconCheck, IconArrowRight, IconPractice } from '../../components/Icons'

type QuestionType = 'pinyinToChar' | 'charToPinyin'

interface Question {
  pair: PinyinCharPair
  type: QuestionType
  options: string[]
  answer: string
}

function generateQuestion(pairs: PinyinCharPair[], type: QuestionType, currentPair: PinyinCharPair): Question {
  const otherPairs = pairs.filter(p => p.char !== currentPair.char)
  const shuffled = otherPairs.sort(() => Math.random() - 0.5).slice(0, 3)
  
  if (type === 'pinyinToChar') {
    const options = [...shuffled.map(p => p.char), currentPair.char]
      .sort(() => Math.random() - 0.5)
    return {
      pair: currentPair,
      type,
      options,
      answer: currentPair.char,
    }
  } else {
    const tonedPinyin = getTonedPinyin(currentPair.pinyin, currentPair.tone)
    const options = [...shuffled.map(p => getTonedPinyin(p.pinyin, p.tone)), tonedPinyin]
      .sort(() => Math.random() - 0.5)
    return {
      pair: currentPair,
      type,
      options,
      answer: tonedPinyin,
    }
  }
}

export default function PinyinPracticePage() {
  const { speakPinyin } = usePinyinAudio()
  const { playCorrect, playWrong, playCompletion } = useAudio()
  const { updatePinyinProgress } = useApp()
  
  const [stage, setStage] = useState<'select' | 'practice' | 'result'>('select')
  const [questionCount, setQuestionCount] = useState(10)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)

  const startPractice = useCallback(() => {
    const pairs = getRandomPinyinCharPairs(Math.max(questionCount + 5, 20))
    const types: QuestionType[] = ['pinyinToChar', 'charToPinyin']
    
    const generatedQuestions = pairs.slice(0, questionCount).map((pair, i) => {
      const type = types[i % types.length]
      return generateQuestion(pairs, type, pair)
    })
    
    setQuestions(generatedQuestions)
    setCurrentIndex(0)
    setCorrectCount(0)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setStage('practice')
  }, [questionCount])

  const handleAnswer = useCallback((answer: string) => {
    if (isAnswered) return
    
    setSelectedAnswer(answer)
    setIsAnswered(true)
    
    const isCorrect = answer === questions[currentIndex].answer
    if (isCorrect) {
      setCorrectCount(prev => prev + 1)
      playCorrect()
    } else {
      playWrong()
    }
  }, [isAnswered, questions, currentIndex, playCorrect, playWrong])

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
    } else {
      playCompletion()
      updatePinyinProgress(questions.length, correctCount)
      setStage('result')
    }
  }, [currentIndex, questions.length, playCompletion, correctCount, updatePinyinProgress])

  const handleRestart = () => {
    setStage('select')
  }

  const currentQuestion = questions[currentIndex]
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0
  const percentage = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0

  if (stage === 'select') {
    return (
      <Stack gap="lg" className="px-1">
        <Box className="text-center py-2 animate-slide-up">
          <Group justify="center" gap="sm" mb="xs">
            <Box className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white shadow-md">
              <IconPractice size={20} />
            </Box>
          </Group>
          <Title order={3} className="text-lg font-bold text-gray-800">拼音练习</Title>
          <Text size="sm" className="text-gray-500">拼音选字、字选拼音</Text>
        </Box>

        <Card shadow="none" padding="lg" radius="xl" className="bg-white border-2 border-teal-100 animate-slide-up stagger-1">
          <Text fw={600} size="sm" className="text-gray-700 mb-4">选择题目数量</Text>
          <SimpleGrid cols={4} spacing="sm">
            {[5, 10, 15, 20].map((count) => (
              <Button
                key={count}
                variant={questionCount === count ? 'filled' : 'light'}
                color="teal"
                radius="xl"
                size="md"
                className={questionCount === count ? '' : 'text-gray-700'}
                onClick={() => setQuestionCount(count)}
              >
                {count}题
              </Button>
            ))}
          </SimpleGrid>
        </Card>

        <Button
          size="lg"
          radius="xl"
          className="animate-slide-up stagger-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold"
          onClick={startPractice}
          rightSection={<IconArrowRight size={18} />}
        >
          开始练习
        </Button>

        <Box className="h-4" />
      </Stack>
    )
  }

  if (stage === 'practice' && currentQuestion) {
    const getQuestionText = () => {
      return currentQuestion.type === 'pinyinToChar' 
        ? '根据拼音选择正确的汉字' 
        : '选择正确的拼音'
    }

    const tonedPinyin = getTonedPinyin(currentQuestion.pair.pinyin, currentQuestion.pair.tone)

    return (
      <Stack gap="lg" className="px-1">
        <Box className="animate-slide-up">
          <Group justify="space-between" mb="xs">
            <Text size="sm" className="text-gray-500">第 {currentIndex + 1} / {questions.length} 题</Text>
            <Text size="sm" className="text-gray-500">正确 {correctCount} 题</Text>
          </Group>
          <Progress value={progress} size="sm" radius="xl" color="teal" />
        </Box>

        <Card shadow="md" padding="xl" radius="xl" className="bg-white border-2 border-teal-100 animate-slide-up stagger-1">
          <Stack align="center" gap="md">
            <Text size="sm" className="text-gray-500">{getQuestionText()}</Text>
            
            {currentQuestion.type === 'pinyinToChar' ? (
              <Group gap="sm" align="center">
                <Text className="text-5xl font-bold text-teal-600">
                  {tonedPinyin}
                </Text>
                <Button
                  variant="subtle"
                  color="teal"
                  size="sm"
                  radius="xl"
                  onClick={() => speakPinyin(currentQuestion.pair.pinyin, currentQuestion.pair.tone)}
                >
                  <IconPlay size={16} />
                </Button>
              </Group>
            ) : (
              <Group gap="sm" align="center">
                <Text className="text-5xl font-bold text-gray-700">
                  {currentQuestion.pair.char}
                </Text>
                {currentQuestion.pair.image && (
                  <Text className="text-3xl">{currentQuestion.pair.image}</Text>
                )}
              </Group>
            )}
          </Stack>
        </Card>

        <SimpleGrid cols={2} spacing="sm" className="animate-slide-up stagger-2">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedAnswer === option
            const isCorrect = option === currentQuestion.answer
            const showResult = isAnswered
            
            let bgColor = 'bg-white hover:bg-gray-50'
            let borderColor = 'border-gray-200'
            let textColor = 'text-gray-700'
            
            if (showResult) {
              if (isCorrect) {
                bgColor = 'bg-emerald-50'
                borderColor = 'border-emerald-400'
                textColor = 'text-emerald-700'
              } else if (isSelected && !isCorrect) {
                bgColor = 'bg-red-50'
                borderColor = 'border-red-400'
                textColor = 'text-red-700'
              }
            } else if (isSelected) {
              bgColor = 'bg-teal-50'
              borderColor = 'border-teal-400'
            }

            return (
              <Card
                key={idx}
                shadow="none"
                padding="lg"
                radius="xl"
                className={`cursor-pointer transition-all ${bgColor} border-2 ${borderColor} ${
                  !isAnswered ? 'hover:scale-[1.02] active:scale-[0.98]' : ''
                }`}
                onClick={() => handleAnswer(option)}
              >
                <Text 
                  ta="center" 
                  fw={600} 
                  size="xl"
                  className={textColor}
                >
                  {option}
                </Text>
              </Card>
            )
          })}
        </SimpleGrid>

        {isAnswered && (
          <Button
            size="lg"
            radius="xl"
            className="animate-slide-up bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold"
            onClick={handleNext}
            rightSection={<IconArrowRight size={18} />}
          >
            {currentIndex < questions.length - 1 ? '下一题' : '查看结果'}
          </Button>
        )}

        <Box className="h-4" />
      </Stack>
    )
  }

  if (stage === 'result') {
    return (
      <Stack gap="lg" className="px-1">
        <Card shadow="lg" padding="xl" radius="xl" className="bg-gradient-to-br from-teal-500 to-cyan-500 text-white animate-slide-up">
          <Stack align="center" gap="md">
            <Box className={`w-20 h-20 rounded-full flex items-center justify-center ${
              percentage >= 80 ? 'bg-yellow-400' : percentage >= 60 ? 'bg-white/30' : 'bg-white/20'
            } animate-bounce-in`}>
              {percentage >= 80 ? (
                <IconStar size={40} className="text-yellow-600" />
              ) : percentage >= 60 ? (
                <IconCheck size={40} />
              ) : (
                <IconRefresh size={40} />
              )}
            </Box>
            <Title order={2} className="text-white">
              {percentage >= 80 ? '太棒了！' : percentage >= 60 ? '不错哦！' : '继续加油！'}
            </Title>
            <Group gap="xl">
              <Stack align="center" gap={0}>
                <Text size="xl" fw={700}>{correctCount}</Text>
                <Text size="sm" className="text-white/80">正确</Text>
              </Stack>
              <Stack align="center" gap={0}>
                <Text size="xl" fw={700}>{questions.length - correctCount}</Text>
                <Text size="sm" className="text-white/80">错误</Text>
              </Stack>
              <Stack align="center" gap={0}>
                <Text size="xl" fw={700}>{percentage}%</Text>
                <Text size="sm" className="text-white/80">正确率</Text>
              </Stack>
            </Group>
          </Stack>
        </Card>

        <Group grow className="animate-slide-up stagger-1">
          <Button
            variant="light"
            size="lg"
            radius="xl"
            color="gray"
            className="text-gray-700"
            leftSection={<IconRefresh size={18} />}
            onClick={handleRestart}
          >
            重新选择
          </Button>
          <Button
            size="lg"
            radius="xl"
            className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold"
            leftSection={<IconArrowRight size={18} />}
            onClick={startPractice}
          >
            再练一次
          </Button>
        </Group>

        <Box className="h-4" />
      </Stack>
    )
  }

  return null
}
