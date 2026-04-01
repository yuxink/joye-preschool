import { Card, Text, Group, Box, Title, Badge } from '@mantine/core'
import type { Question } from '../../types'
import VisualAid from '../VisualAid'
import OptionButton from '../OptionButton'
import { useAudio } from '../../hooks/useAudio'
import { IconVolume } from '../Icons'

interface QuestionCardProps {
  question: Question
  selectedAnswer: number | string | null
  isAnswered: boolean
  onAnswer: (answer: number | string) => void
}

// 使用纯文字标签避免乱码
const questionTypeLabels: Record<string, string> = {
  addition10: '10以内加法',
  subtraction10: '10以内减法',
  mixed10: '混合运算',
  addition20: '20以内加法',
  subtraction20: '20以内减法',
  mixed20: '混合运算',
  decompose: '拆数游戏',
  adjacent: '找邻居',
  compare: '比大小',
  wordProblem: '生活应用',
  counting: '数一数',
  sequence: '排排序',
}

export default function QuestionCard({
  question,
  selectedAnswer,
  isAnswered,
  onAnswer,
}: QuestionCardProps) {
  const { speakQuestion } = useAudio()

  const handleSpeak = () => {
    speakQuestion(question.content.replace('?', '多少').replace('○', '和'))
  }

  const renderQuestionContent = () => {

    if (question.type === 'compare') {
      return (
        <div className="flex items-center justify-center gap-2 sm:gap-4 animate-slide-up">
          <span className="text-4xl sm:text-5xl font-bold text-blue-500 animate-float">
            {question.num1}
          </span>
          <span className="text-3xl sm:text-4xl text-gray-400">○</span>
          <span className="text-4xl sm:text-5xl font-bold text-green-500 animate-float" style={{ animationDelay: '0.5s' }}>
            {question.num2}
          </span>
        </div>
      )
    }

    if (question.type === 'decompose') {
      return (
        <div className="text-center animate-slide-up">
          <div className="text-5xl sm:text-6xl font-bold text-primary-coral mb-2 animate-pulse-soft">
            {question.num1}
          </div>
          <div className="text-lg sm:text-xl text-gray-600 flex items-center justify-center gap-2 flex-wrap">
            <span>可以分成</span>
            {question.content.includes('? 和') ? (
              <>
                <span className="text-2xl font-bold text-orange-500 bg-orange-100 px-3 py-1 rounded-lg">?</span>
                <span>和</span>
                <span className="text-2xl font-bold text-green-600">{question.num2}</span>
              </>
            ) : (
              <>
                <span className="text-2xl font-bold text-green-600">{question.num2}</span>
                <span>和</span>
                <span className="text-2xl font-bold text-orange-500 bg-orange-100 px-3 py-1 rounded-lg">?</span>
              </>
            )}
          </div>
        </div>
      )
    }

    if (question.type === 'sequence') {
      const parts = question.content.replace('按顺序填数：', '').split(' , ')
      return (
        <div className="animate-slide-up">
          <Text size="lg" ta="center" mb="md" c="dimmed">按顺序填数</Text>
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            {parts.map((part, index) => (
              <div
                key={index}
                className={`
                  w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center
                  text-xl sm:text-2xl font-bold transition-all
                  animate-pop stagger-${index + 1}
                  ${part === '?' 
                    ? 'bg-orange-100 text-orange-500 border-2 border-dashed border-orange-300 animate-pulse-soft' 
                    : 'bg-primary-mint/20 text-primary-mint'
                  }
                `}
              >
                {part}
              </div>
            ))}
          </div>
        </div>
      )
    }

    return (
      <Title 
        order={2} 
        className="text-2xl sm:text-4xl text-center text-gray-800 animate-slide-up"
      >
        {question.content.split('').map((char, i) => (
          <span 
            key={i} 
            className={char === '?' ? 'text-orange-500 bg-orange-100 px-2 rounded-lg' : ''}
            style={{ display: 'inline-block', animationDelay: `${i * 0.03}s` }}
          >
            {char}
          </span>
        ))}
      </Title>
    )
  }

  return (
    <Card 
      shadow="lg" 
      padding="lg" 
      radius="xl"
      className="bg-white/95 backdrop-blur-sm border border-gray-100"
    >
      <Group justify="space-between" align="center" mb="sm">
        <Badge 
          size="lg" 
          variant="light" 
          color="pink"
        >
          {questionTypeLabels[question.type]}
        </Badge>
        
        <button
          onClick={handleSpeak}
          className="w-10 h-10 rounded-xl bg-pink-100 hover:bg-pink-200 active:scale-95 transition-all flex items-center justify-center text-pink-600"
          aria-label="朗读题目"
        >
          <IconVolume size={20} />
        </button>
      </Group>

      <Box className="min-h-[100px] flex items-center justify-center my-4">
        {renderQuestionContent()}
      </Box>

      {question.visual && (
        <Box className="mb-4 animate-slide-up stagger-2">
          <VisualAid visual={question.visual} />
        </Box>
      )}

      {question.options && (
        <Box className="animate-slide-up stagger-3">
          <Text size="sm" c="dimmed" mb="sm" ta="center">
            👇 点击选择正确答案
          </Text>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {question.options.map((option, index) => (
              <div key={option} className={`animate-pop stagger-${index + 1}`}>
                <OptionButton
                  value={option}
                  onClick={onAnswer}
                  disabled={isAnswered}
                  isSelected={selectedAnswer === option}
                  isCorrect={
                    isAnswered
                      ? option === question.answer
                        ? true
                        : selectedAnswer === option
                        ? false
                        : null
                      : null
                  }
                />
              </div>
            ))}
          </div>
        </Box>
      )}
    </Card>
  )
}
