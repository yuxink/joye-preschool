import { useState, useEffect } from 'react'
import { Box, Text, Group, Button, Stack, SegmentedControl } from '@mantine/core'
import { usePinyinAudio } from '../../hooks/usePinyinAudio'
import type { ToneType } from '../../types'
import { getTonedPinyin, toneMarks } from '../../data/pinyin/syllables'

interface SpellingAnimationProps {
  initial: string
  final: string
  medial?: string
  tone?: ToneType
  autoPlay?: boolean
  onComplete?: () => void
}

type AnimationStage = 'idle' | 'initial' | 'medial' | 'final' | 'combine' | 'result'

export default function SpellingAnimation({
  initial,
  final,
  medial,
  tone: initialTone = 1,
  autoPlay = false,
  onComplete,
}: SpellingAnimationProps) {
  const [stage, setStage] = useState<AnimationStage>('idle')
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedTone, setSelectedTone] = useState<ToneType>(initialTone)
  const { speakSyllable, speakPinyin } = usePinyinAudio()

  // 构建音节（小写）
  const syllable = medial 
    ? initial.toLowerCase() + medial.toLowerCase() + final.toLowerCase() 
    : initial.toLowerCase() + final.toLowerCase()
  
  // 带声调的拼音
  const tonedResult = getTonedPinyin(syllable, selectedTone)

  useEffect(() => {
    if (autoPlay && stage === 'idle') {
      startAnimation()
    }
  }, [autoPlay])

  // 当 initial/final/medial 变化时重置
  useEffect(() => {
    setStage('idle')
    setIsPlaying(false)
  }, [initial, final, medial])

  const startAnimation = () => {
    if (isPlaying) return
    setIsPlaying(true)
    setStage('initial')

    const timings = medial 
      ? [0, 800, 1600, 2400, 3200]
      : [0, 800, 1600, 2400]

    setTimeout(() => setStage('initial'), timings[0])
    
    if (medial) {
      setTimeout(() => setStage('medial'), timings[1])
      setTimeout(() => setStage('final'), timings[2])
      setTimeout(() => setStage('combine'), timings[3])
      setTimeout(() => {
        setStage('result')
        setIsPlaying(false)
        onComplete?.()
      }, timings[4])
    } else {
      setTimeout(() => setStage('final'), timings[1])
      setTimeout(() => setStage('combine'), timings[2])
      setTimeout(() => {
        setStage('result')
        setIsPlaying(false)
        onComplete?.()
      }, timings[3])
    }

    speakSyllable(initial, final, medial, selectedTone)
  }

  const reset = () => {
    setStage('idle')
    setIsPlaying(false)
  }

  const handleToneChange = (value: string) => {
    const tone = parseInt(value) as ToneType
    setSelectedTone(tone)
    if (stage === 'result') {
      speakPinyin(syllable, tone)
    }
  }

  const getInitialClass = () => {
    if (stage === 'idle') return 'opacity-50'
    if (stage === 'initial') return 'animate-bounce-in scale-110'
    if (stage === 'combine' || stage === 'result') return 'translate-x-4 sm:translate-x-8 transition-transform duration-500'
    return ''
  }

  const getMedialClass = () => {
    if (!medial) return 'hidden'
    if (stage === 'idle' || stage === 'initial') return 'opacity-0 scale-75'
    if (stage === 'medial') return 'animate-bounce-in scale-110'
    if (stage === 'combine' || stage === 'result') return 'transition-transform duration-500'
    return ''
  }

  const getFinalClass = () => {
    if (stage === 'idle' || stage === 'initial' || stage === 'medial') return 'opacity-0 scale-75'
    if (stage === 'final') return 'animate-bounce-in scale-110'
    if (stage === 'combine' || stage === 'result') return '-translate-x-4 sm:-translate-x-8 transition-transform duration-500'
    return ''
  }

  const isShowingResult = stage === 'result'
  const isShowingPlus = stage !== 'idle' && !isShowingResult
  const isShowingMedialPlus = medial && (stage === 'medial' || stage === 'final' || stage === 'combine')

  return (
    <Box className="p-4 sm:p-6 bg-gradient-to-br from-slate-50 to-indigo-50 rounded-2xl border border-slate-200">
      <Stack gap="md" align="center">
        {/* 声调选择器 */}
        <Box className="w-full">
          <Text size="sm" c="dimmed" ta="center" mb="xs">选择声调</Text>
          <SegmentedControl
            value={String(selectedTone)}
            onChange={handleToneChange}
            data={[
              { label: `一声 ${toneMarks[1]}`, value: '1' },
              { label: `二声 ${toneMarks[2]}`, value: '2' },
              { label: `三声 ${toneMarks[3]}`, value: '3' },
              { label: `四声 ${toneMarks[4]}`, value: '4' },
            ]}
            fullWidth
            size="sm"
            color="indigo"
            className="bg-white"
          />
        </Box>

        {/* 拼读动画区域 */}
        <Box className="min-h-[120px] flex items-center justify-center w-full py-4">
          {isShowingResult ? (
            <div className="animate-bounce-in text-center">
              <Text className="text-5xl sm:text-6xl font-bold text-indigo-600">
                {tonedResult}
              </Text>
              <Text size="sm" c="dimmed" mt="sm">
                第{selectedTone}声 {toneMarks[selectedTone]}
              </Text>
            </div>
          ) : (
            <Group gap="sm" justify="center" wrap="nowrap">
              <Text 
                className={`text-4xl sm:text-5xl font-bold text-blue-600 transition-all duration-300 ${getInitialClass()}`}
              >
                {initial.toLowerCase()}
              </Text>

              {isShowingPlus && (
                <Text className="text-2xl text-slate-400">+</Text>
              )}

              {medial && (
                <Text 
                  className={`text-4xl sm:text-5xl font-bold text-emerald-600 transition-all duration-300 ${getMedialClass()}`}
                >
                  {medial.toLowerCase()}
                </Text>
              )}

              {isShowingMedialPlus && (
                <Text className="text-2xl text-slate-400">+</Text>
              )}

              <Text 
                className={`text-4xl sm:text-5xl font-bold text-rose-500 transition-all duration-300 ${getFinalClass()}`}
              >
                {final.toLowerCase()}
              </Text>
            </Group>
          )}
        </Box>

        {/* 图例说明 */}
        <Group gap="xs" justify="center" className="flex-wrap">
          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">声母</span>
          {medial && <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-medium">介母</span>}
          <span className="px-2 py-1 bg-rose-100 text-rose-700 rounded text-xs font-medium">韵母</span>
          <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-medium">= 音节</span>
        </Group>

        {/* 操作按钮 */}
        <Group gap="sm" justify="center">
          <Button
            variant="filled"
            color="indigo"
            size="md"
            onClick={startAnimation}
            disabled={isPlaying}
            className="min-h-[44px] px-6 transition-all hover:scale-105 active:scale-95"
          >
            {stage === 'idle' ? '▶ 开始拼读' : '▶ 再拼一次'}
          </Button>
          
          {stage !== 'idle' && (
            <Button
              variant="light"
              color="gray"
              size="md"
              onClick={reset}
              className="min-h-[44px] transition-all hover:scale-105 active:scale-95"
            >
              ↺ 重置
            </Button>
          )}
        </Group>
      </Stack>
    </Box>
  )
}
