import { Group, Button, Text, Stack, Box } from '@mantine/core'
import type { ToneType } from '../../types'
import { toneMarks, toneDescriptions } from '../../data/pinyin/syllables'
import { usePinyinAudio } from '../../hooks/usePinyinAudio'

interface ToneSelectorProps {
  selectedTone: ToneType | null
  onSelect: (tone: ToneType) => void
  disabled?: boolean
  showLabels?: boolean
  vowel?: string
}

const tones: ToneType[] = [1, 2, 3, 4]

const toneIcons: Record<ToneType, string> = {
  1: '—',
  2: '／',
  3: '∨',
  4: '＼',
  0: '·',
}

const toneColors: Record<ToneType, string> = {
  1: 'bg-blue-500',
  2: 'bg-emerald-500',
  3: 'bg-amber-500',
  4: 'bg-rose-500',
  0: 'bg-slate-400',
}

export default function ToneSelector({ 
  selectedTone, 
  onSelect, 
  disabled = false,
  showLabels = true,
  vowel = 'ma',
}: ToneSelectorProps) {
  const { speakTone } = usePinyinAudio()

  const handleSelect = (tone: ToneType) => {
    if (disabled) return
    onSelect(tone)
    speakTone(tone, vowel)
  }

  return (
    <Stack gap="sm">
      {showLabels && (
        <Text size="sm" c="dimmed" ta="center">选择声调</Text>
      )}
      
      <Group justify="center" gap="sm">
        {tones.map((tone) => (
          <Button
            key={tone}
            variant={selectedTone === tone ? 'filled' : 'light'}
            color={selectedTone === tone ? 'indigo' : 'gray'}
            size="lg"
            disabled={disabled}
            onClick={() => handleSelect(tone)}
            className={`
              min-w-[64px] min-h-[64px] p-2
              transition-all duration-200 rounded-xl
              ${selectedTone === tone ? 'scale-105 shadow-md' : 'hover:scale-102'}
            `}
          >
            <Stack gap={0} align="center">
              <Box className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-lg font-bold ${selectedTone === tone ? 'bg-white/20' : toneColors[tone]}`}>
                {toneIcons[tone]}
              </Box>
              <Text size="xs" mt={4}>{tone}声</Text>
            </Stack>
          </Button>
        ))}
      </Group>

      {showLabels && selectedTone && (
        <Text ta="center" size="sm" c="dimmed" className="animate-fade-in">
          {toneDescriptions[selectedTone]}
        </Text>
      )}
    </Stack>
  )
}

export function ToneDisplay({ tone, size = 'md' }: { tone: ToneType; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
  }

  return (
    <span className={`${sizeClasses[size]} font-bold inline-flex items-center gap-1`}>
      <span className={`w-5 h-5 rounded flex items-center justify-center text-white text-xs ${toneColors[tone]}`}>
        {toneIcons[tone]}
      </span>
      <span className="text-slate-600">{toneMarks[tone]}</span>
    </span>
  )
}
