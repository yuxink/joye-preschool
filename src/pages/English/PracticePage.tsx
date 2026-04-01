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
import { useEnglishAudio } from '../../hooks/useEnglishAudio'
import { useAudio } from '../../hooks/useAudio'
import { useApp } from '../../stores/AppContext'
import { 
  getRandomWords, 
  categoryLabels, 
  WordCategory,
  EnglishWord 
} from '../../data/english'
import { IconRefresh, IconPlay, IconStar, IconCheck, IconArrowRight } from '../../components/Icons'

type QuestionType = 'wordToMeaning' | 'meaningToWord' | 'listenAndChoose'

interface Question {
  word: EnglishWord
  type: QuestionType
  options: string[]
  answer: string
}

function generateQuestion(words: EnglishWord[], type: QuestionType, currentWord: EnglishWord): Question {
  const otherWords = words.filter(w => w.word !== currentWord.word)
  const shuffled = otherWords.sort(() => Math.random() - 0.5).slice(0, 3)
  
  if (type === 'wordToMeaning') {
    const options = [...shuffled.map(w => w.meaning), currentWord.meaning]
      .sort(() => Math.random() - 0.5)
    return {
      word: currentWord,
      type,
      options,
      answer: currentWord.meaning,
    }
  } else if (type === 'meaningToWord') {
    const options = [...shuffled.map(w => w.word), currentWord.word]
      .sort(() => Math.random() - 0.5)
    return {
      word: currentWord,
      type,
      options,
      answer: currentWord.word,
    }
  } else {
    const options = [...shuffled.map(w => w.word), currentWord.word]
      .sort(() => Math.random() - 0.5)
    return {
      word: currentWord,
      type,
      options,
      answer: currentWord.word,
    }
  }
}

export default function EnglishPracticePage() {
  const { speakWord } = useEnglishAudio()
  const { playCorrect, playWrong, playCompletion } = useAudio()
  const { updateEnglishProgress } = useApp()
  
  const [stage, setStage] = useState<'select' | 'practice' | 'result'>('select')
  const [selectedCategory, setSelectedCategory] = useState<WordCategory | null>(null)
  const [questionCount, setQuestionCount] = useState(10)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)

  const startPractice = useCallback(() => {
    const words = getRandomWords(Math.max(questionCount + 3, 15), selectedCategory || undefined)
    const types: QuestionType[] = ['wordToMeaning', 'meaningToWord', 'listenAndChoose']
    
    const generatedQuestions = words.slice(0, questionCount).map((word, i) => {
      const type = types[i % types.length]
      return generateQuestion(words, type, word)
    })
    
    setQuestions(generatedQuestions)
    setCurrentIndex(0)
    setCorrectCount(0)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setStage('practice')
  }, [selectedCategory, questionCount])

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
      updateEnglishProgress(questions.length, correctCount)
      setStage('result')
    }
  }, [currentIndex, questions.length, playCompletion, correctCount, updateEnglishProgress])

  const handleRestart = () => {
    setStage('select')
    setSelectedCategory(null)
  }

  const categories = Object.keys(categoryLabels) as WordCategory[]
  const currentQuestion = questions[currentIndex]
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0
  const percentage = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0

  if (stage === 'select') {
    return (
      <Stack gap="lg" className="px-1">
        <Box className="text-center py-2 animate-slide-up">
          <Group justify="center" gap="sm" mb="xs">
            <Box className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white shadow-md">
              <Text size="lg">✏️</Text>
            </Box>
          </Group>
          <Title order={3} className="text-lg font-bold text-gray-800">单词练习</Title>
          <Text size="sm" className="text-gray-500">选择分类开始练习</Text>
        </Box>

        {/* 开始按钮 - 放在上面更显眼 */}
        <Button
          size="lg"
          radius="xl"
          className="animate-slide-up stagger-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold shadow-md"
          onClick={startPractice}
          rightSection={<IconArrowRight size={18} />}
        >
          开始练习
        </Button>

        {/* 题目数量 - 放在分类前面 */}
        <Card shadow="none" padding="lg" radius="xl" className="bg-white border-2 border-emerald-100 animate-slide-up stagger-2">
          <Text fw={600} size="sm" className="text-gray-700 mb-3">题目数量</Text>
          <SimpleGrid cols={4} spacing="sm">
            {[5, 10, 15, 20].map((count) => (
              <Button
                key={count}
                variant={questionCount === count ? 'filled' : 'light'}
                color="teal"
                radius="xl"
                className={questionCount === count ? '' : 'text-gray-700'}
                onClick={() => setQuestionCount(count)}
              >
                {count}题
              </Button>
            ))}
          </SimpleGrid>
        </Card>

        {/* 分类选择 */}
        <Card shadow="none" padding="lg" radius="xl" className="bg-white border-2 border-emerald-100 animate-slide-up stagger-3">
          <Text fw={600} size="sm" className="text-gray-700 mb-3">选择单词分类（可选）</Text>
          <SimpleGrid cols={{ base: 3, sm: 4 }} spacing="xs">
            <Button
              variant={selectedCategory === null ? 'filled' : 'light'}
              color="gray"
              radius="xl"
              size="sm"
              className={selectedCategory === null ? '' : 'text-gray-600'}
              onClick={() => setSelectedCategory(null)}
            >
              全部
            </Button>
            {categories.slice(0, 11).map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'filled' : 'light'}
                color="teal"
                radius="xl"
                size="sm"
                className={selectedCategory === cat ? '' : 'text-gray-600'}
                onClick={() => setSelectedCategory(cat)}
              >
                {categoryLabels[cat].emoji} {categoryLabels[cat].label}
              </Button>
            ))}
          </SimpleGrid>
        </Card>

        <Box className="h-4" />
      </Stack>
    )
  }

  if (stage === 'practice' && currentQuestion) {
    const getQuestionText = () => {
      switch (currentQuestion.type) {
        case 'wordToMeaning':
          return '选择正确的中文意思'
        case 'meaningToWord':
          return '选择正确的英文单词'
        case 'listenAndChoose':
          return '听发音，选择正确的单词'
      }
    }

    return (
      <Stack gap="lg" className="px-1">
        <Box className="animate-slide-up">
          <Group justify="space-between" mb="xs">
            <Text size="sm" className="text-gray-500">第 {currentIndex + 1} / {questions.length} 题</Text>
            <Text size="sm" className="text-gray-500">正确 {correctCount} 题</Text>
          </Group>
          <Progress value={progress} size="sm" radius="xl" color="teal" />
        </Box>

        <Card shadow="md" padding="xl" radius="xl" className="bg-white border-2 border-emerald-100 animate-slide-up stagger-1">
          <Stack align="center" gap="md">
            <Text size="sm" className="text-gray-500">{getQuestionText()}</Text>
            
            {currentQuestion.type === 'listenAndChoose' ? (
              <Button
                variant="light"
                color="teal"
                size="xl"
                radius="xl"
                leftSection={<IconPlay size={24} />}
                className="text-teal-700"
                onClick={() => speakWord(currentQuestion.word.word)}
              >
                播放发音
              </Button>
            ) : currentQuestion.type === 'wordToMeaning' ? (
              <Group gap="sm">
                <Text 
                  className="text-4xl font-bold text-teal-600"
                  style={{ fontFamily: "'Comic Sans MS', cursive" }}
                >
                  {currentQuestion.word.word}
                </Text>
                <Button
                  variant="subtle"
                  color="teal"
                  size="sm"
                  radius="xl"
                  onClick={() => speakWord(currentQuestion.word.word)}
                >
                  <IconPlay size={16} />
                </Button>
              </Group>
            ) : (
              <Text className="text-3xl font-bold text-gray-700">
                {currentQuestion.word.meaning}
              </Text>
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
                padding="md"
                radius="xl"
                className={`cursor-pointer transition-all ${bgColor} border-2 ${borderColor} ${
                  !isAnswered ? 'hover:scale-[1.02] active:scale-[0.98]' : ''
                }`}
                onClick={() => handleAnswer(option)}
              >
                <Text 
                  ta="center" 
                  fw={600} 
                  className={textColor}
                  style={currentQuestion.type !== 'wordToMeaning' ? { fontFamily: "'Comic Sans MS', cursive" } : undefined}
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
            className="animate-slide-up bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold"
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
        <Card shadow="lg" padding="xl" radius="xl" className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white animate-slide-up">
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
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold"
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
