import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { 
  Card, 
  Title, 
  Text, 
  Stack, 
  Button,
  Group,
  Box,
  Progress,
  ActionIcon,
} from '@mantine/core'
import { useEnglishAudio } from '../../hooks/useEnglishAudio'
import { 
  englishWords, 
  getWordsByCategory, 
  categoryLabels, 
  WordCategory,
  EnglishWord 
} from '../../data/english'
import { IconRefresh, IconArrowRight, IconPlay } from '../../components/Icons'

// 左箭头图标
function IconArrowLeft({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  )
}

// 翻转图标
function IconFlip({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 1l4 4-4 4" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <path d="M7 23l-4-4 4-4" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  )
}

export default function FlashcardPage() {
  const [searchParams] = useSearchParams()
  const categoryParam = searchParams.get('category') as WordCategory | null
  
  const { speakWord, speakSentence, speakSlow } = useEnglishAudio()
  
  const [words, setWords] = useState<EnglishWord[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [showSentence, setShowSentence] = useState(false)

  useEffect(() => {
    const wordList = categoryParam 
      ? getWordsByCategory(categoryParam)
      : [...englishWords].sort(() => Math.random() - 0.5).slice(0, 20)
    setWords(wordList)
    setCurrentIndex(0)
    setIsFlipped(false)
    setShowSentence(false)
  }, [categoryParam])

  const currentWord = words[currentIndex]
  const progress = words.length > 0 ? ((currentIndex + 1) / words.length) * 100 : 0
  const categoryInfo = categoryParam ? categoryLabels[categoryParam] : null

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setIsFlipped(false)
      setShowSentence(false)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
      setIsFlipped(false)
      setShowSentence(false)
    }
  }

  const handleFlip = () => {
    setIsFlipped(prev => !prev)
  }

  const handleShuffle = () => {
    setWords([...words].sort(() => Math.random() - 0.5))
    setCurrentIndex(0)
    setIsFlipped(false)
    setShowSentence(false)
  }

  const handleSpeak = () => {
    if (currentWord) {
      speakWord(currentWord.word)
    }
  }

  const handleSpeakSlow = () => {
    if (currentWord) {
      speakSlow(currentWord.word)
    }
  }

  const handleSpeakSentence = (sentence: string) => {
    speakSentence(sentence)
  }

  if (!currentWord) {
    return (
      <Stack align="center" justify="center" className="min-h-[60vh]">
        <Text c="dimmed">没有找到单词</Text>
      </Stack>
    )
  }

  return (
    <Stack gap="lg" className="px-1">
      {/* 页面标题 */}
      <Box className="text-center py-2 animate-slide-up">
        <Group justify="center" gap="sm" mb="xs">
          <Box className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white shadow-md">
            <Text size="lg">📚</Text>
          </Box>
        </Group>
        <Title order={3} className="text-lg font-bold text-slate-800">
          {categoryInfo ? categoryInfo.label : '单词闪卡'}
        </Title>
        <Text size="sm" c="dimmed">{currentIndex + 1} / {words.length}</Text>
      </Box>

      {/* 进度条 */}
      <Progress 
        value={progress} 
        size="sm" 
        radius="xl" 
        color="cyan"
        className="animate-slide-up stagger-1"
      />

      {/* 闪卡 */}
      <Card
        shadow="lg"
        padding="xl"
        radius="xl"
        className={`min-h-[280px] cursor-pointer transition-all duration-500 animate-slide-up stagger-2 ${
          isFlipped 
            ? 'bg-gradient-to-br from-cyan-50 to-blue-50' 
            : 'bg-white'
        }`}
        onClick={handleFlip}
      >
        <Stack align="center" justify="center" className="min-h-[200px]">
          {!isFlipped ? (
            // 正面：英文单词
            <>
              <Text 
                className="text-5xl sm:text-6xl font-bold text-cyan-600 animate-bounce-in"
                style={{ fontFamily: "'Comic Sans MS', cursive" }}
              >
                {currentWord.word}
              </Text>
              <Text size="lg" c="dimmed" className="font-mono mt-2">
                {currentWord.phonetic}
              </Text>
              <Group gap="sm" mt="md">
                <ActionIcon 
                  variant="light" 
                  color="cyan" 
                  size="lg"
                  radius="xl"
                  onClick={(e) => { e.stopPropagation(); handleSpeak(); }}
                >
                  <IconPlay size={18} />
                </ActionIcon>
                <ActionIcon 
                  variant="light" 
                  color="blue" 
                  size="lg"
                  radius="xl"
                  onClick={(e) => { e.stopPropagation(); handleSpeakSlow(); }}
                >
                  <Text size="xs" fw={600}>慢</Text>
                </ActionIcon>
              </Group>
              <Text size="xs" c="dimmed" mt="md">点击卡片查看中文</Text>
            </>
          ) : (
            // 背面：中文释义
            <>
              <Text className="text-4xl sm:text-5xl font-bold text-blue-600 animate-bounce-in">
                {currentWord.meaning}
              </Text>
              <Text 
                size="xl" 
                className="text-cyan-600 mt-4"
                style={{ fontFamily: "'Comic Sans MS', cursive" }}
              >
                {currentWord.word}
              </Text>
              <Text size="sm" c="dimmed" mt="md">点击卡片翻回英文</Text>
            </>
          )}
        </Stack>
      </Card>

      {/* 例句展示 */}
      <Card
        shadow="none"
        padding="md"
        radius="xl"
        className="bg-slate-50 border border-slate-100 animate-slide-up stagger-3"
      >
        <Group justify="space-between" mb="sm">
          <Text fw={600} size="sm" className="text-slate-700">例句</Text>
          <Button 
            variant="subtle" 
            size="xs" 
            color="cyan"
            onClick={() => setShowSentence(!showSentence)}
          >
            {showSentence ? '收起' : '展开'}
          </Button>
        </Group>
        {showSentence && (
          <Stack gap="sm">
            {currentWord.sentences.map((sentence, idx) => (
              <Group key={idx} gap="sm" wrap="nowrap">
                <ActionIcon 
                  variant="light" 
                  color="cyan" 
                  size="sm"
                  radius="xl"
                  onClick={() => handleSpeakSentence(sentence)}
                >
                  <IconPlay size={12} />
                </ActionIcon>
                <Text size="sm" className="text-slate-600">{sentence}</Text>
              </Group>
            ))}
          </Stack>
        )}
      </Card>

      {/* 操作按钮 */}
      <Group justify="center" gap="md" className="animate-slide-up stagger-4">
        <Button
          variant="light"
          color="gray"
          size="lg"
          radius="xl"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          leftSection={<IconArrowLeft size={18} />}
        >
          上一个
        </Button>
        <Button
          variant="light"
          color="cyan"
          size="lg"
          radius="xl"
          onClick={handleFlip}
          leftSection={<IconFlip size={18} />}
        >
          翻转
        </Button>
        <Button
          variant="filled"
          color="cyan"
          size="lg"
          radius="xl"
          onClick={handleNext}
          disabled={currentIndex === words.length - 1}
          rightSection={<IconArrowRight size={18} />}
        >
          下一个
        </Button>
      </Group>

      {/* 底部操作 */}
      <Group justify="center" className="animate-slide-up stagger-5">
        <Button
          variant="subtle"
          color="gray"
          size="sm"
          leftSection={<IconRefresh size={16} />}
          onClick={handleShuffle}
        >
          打乱顺序
        </Button>
      </Group>

      {/* 底部间距 */}
      <Box className="h-4" />
    </Stack>
  )
}
