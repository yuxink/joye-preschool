import { Card, Text, Group, Stack, Badge, ActionIcon } from '@mantine/core'
import type { PinyinItem } from '../../types'
import { useApp } from '../../stores/AppContext'
import { usePinyinAudio } from '../../hooks/usePinyinAudio'
import { IconFavorite, IconPlay } from '../Icons'

interface PinyinCardProps {
  item: PinyinItem
  size?: 'sm' | 'md' | 'lg'
  showTips?: boolean
  onClick?: () => void
}

const categoryColors: Record<string, string> = {
  singleVowel: 'rose',
  compoundVowel: 'orange',
  nasalVowel: 'amber',
  initial: 'blue',
  wholeSyllable: 'violet',
}

const categoryLabels: Record<string, string> = {
  singleVowel: '单韵母',
  compoundVowel: '复韵母',
  nasalVowel: '鼻韵母',
  initial: '声母',
  wholeSyllable: '整体认读',
}

export default function PinyinCard({ item, size = 'md', showTips = true, onClick }: PinyinCardProps) {
  const { pinyinFavorites, addPinyinFavorite, removePinyinFavorite, markPinyinLearned } = useApp()
  const { speakPinyin } = usePinyinAudio()

  const isFavorite = pinyinFavorites.some(f => f.pinyin === item.pinyin.toLowerCase())

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation()
    speakPinyin(item.pinyin.toLowerCase())
    markPinyinLearned(item.pinyin.toLowerCase())
  }

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    const lowerPinyin = item.pinyin.toLowerCase()
    if (isFavorite) {
      removePinyinFavorite(lowerPinyin)
    } else {
      addPinyinFavorite(lowerPinyin)
    }
  }

  const handleClick = () => {
    speakPinyin(item.pinyin.toLowerCase())
    markPinyinLearned(item.pinyin.toLowerCase())
    onClick?.()
  }

  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-3xl sm:text-4xl',
    lg: 'text-4xl sm:text-5xl',
  }

  const isInitial = item.category === 'initial'
  const textColorClass = isInitial ? 'text-blue-600' : 'text-rose-500'
  const bgGradient = isInitial 
    ? 'from-blue-50 to-slate-50 border-blue-100' 
    : 'from-rose-50 to-slate-50 border-rose-100'

  return (
    <Card
      shadow="none"
      padding="sm"
      radius="lg"
      className={`
        transition-all duration-200 cursor-pointer border
        hover:shadow-md hover:scale-[1.02] active:scale-[0.98]
        bg-gradient-to-br ${bgGradient}
      `}
      onClick={handleClick}
    >
      <Stack gap="xs" align="center">
        <Group justify="space-between" className="w-full">
          <Badge 
            size="xs" 
            color={categoryColors[item.category]} 
            variant="light"
            className="font-normal"
          >
            {categoryLabels[item.category]}
          </Badge>
          <Group gap={4}>
            <ActionIcon 
              variant="subtle" 
              color={isFavorite ? 'red' : 'gray'}
              size="xs"
              onClick={handleFavorite}
              className="transition-transform hover:scale-110"
            >
              <IconFavorite size={12} style={{ fill: isFavorite ? 'currentColor' : 'none' }} />
            </ActionIcon>
            <ActionIcon 
              variant="subtle" 
              color="blue" 
              size="xs"
              onClick={handleSpeak}
              className="transition-transform hover:scale-110"
            >
              <IconPlay size={10} />
            </ActionIcon>
          </Group>
        </Group>

        <Text 
          className={`${sizeClasses[size]} font-bold ${textColorClass} tracking-wide`}
          onClick={handleSpeak}
        >
          {item.pinyin.toLowerCase()}
        </Text>

        {(item.isFlat || item.isCurled) && (
          <Badge 
            size="xs" 
            color={item.isFlat ? 'cyan' : 'orange'} 
            variant="outline"
            className="font-normal"
          >
            {item.isFlat ? '平舌音' : '翘舌音'}
          </Badge>
        )}

        {showTips && item.tips && (
          <Text size="xs" c="dimmed" ta="center" className="leading-tight line-clamp-2">
            {item.tips}
          </Text>
        )}
      </Stack>
    </Card>
  )
}
