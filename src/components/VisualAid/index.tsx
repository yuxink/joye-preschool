import { Box, Group, Text } from '@mantine/core'
import type { VisualData } from '../../types'

interface VisualAidProps {
  visual: VisualData
  highlightCount?: number
}

export default function VisualAid({ visual, highlightCount }: VisualAidProps) {
  switch (visual.type) {
    case 'dots':
      return <DotsVisual count={visual.count || 0} highlight={highlightCount} />
    case 'sticks':
      return <SticksVisual count={visual.count || 0} />
    case 'fruits':
    case 'animals':
      return <ItemsVisual items={visual.items || []} />
    case 'numberLine':
      return <NumberLineVisual range={visual.range || [0, 10]} />
    default:
      return null
  }
}

function DotsVisual({ count, highlight }: { count: number; highlight?: number }) {
  const cols = Math.min(count, 5)
  
  return (
    <Box className="p-4 bg-gradient-to-br from-white to-primary-mint/10 rounded-2xl shadow-inner">
      <div 
        className="grid gap-2 max-w-[220px] mx-auto"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={`
              w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center
              transition-all duration-300 animate-pop
              ${highlight !== undefined && i < highlight
                ? 'bg-gradient-to-br from-primary-coral to-orange-400 shadow-lg scale-110'
                : 'bg-gradient-to-br from-primary-mint to-teal-400'
              }
            `}
            style={{ animationDelay: `${i * 0.05}s` }}
          />
        ))}
      </div>
      <Text ta="center" size="sm" c="dimmed" mt="sm" className="animate-slide-up">
        共 <span className="font-bold text-primary-coral">{count}</span> 个圆点
      </Text>
    </Box>
  )
}

function SticksVisual({ count }: { count: number }) {
  const tens = Math.floor(count / 10)
  const ones = count % 10

  return (
    <Box className="p-4 bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-inner">
      <Group justify="center" gap="lg" wrap="wrap">
        {tens > 0 && (
          <div className="flex gap-2 animate-slide-up">
            {Array.from({ length: tens }).map((_, i) => (
              <div
                key={`ten-${i}`}
                className="flex gap-[2px] p-1 bg-orange-100 rounded-lg animate-pop"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {Array.from({ length: 10 }).map((_, j) => (
                  <div
                    key={j}
                    className="w-1.5 sm:w-2 h-8 sm:h-10 bg-gradient-to-b from-orange-400 to-orange-500 rounded-full"
                  />
                ))}
              </div>
            ))}
          </div>
        )}
        
        {ones > 0 && (
          <div className="flex gap-1 animate-slide-up stagger-2">
            {Array.from({ length: ones }).map((_, i) => (
              <div
                key={`one-${i}`}
                className="w-2 sm:w-2.5 h-8 sm:h-10 bg-gradient-to-b from-blue-400 to-blue-500 rounded-full animate-pop"
                style={{ animationDelay: `${i * 0.05}s` }}
              />
            ))}
          </div>
        )}
      </Group>
      <Text ta="center" size="sm" c="dimmed" mt="sm" className="animate-slide-up stagger-3">
        {tens > 0 && <><span className="text-orange-500 font-bold">{tens}</span>捆</>}
        {tens > 0 && ones > 0 && ' + '}
        {ones > 0 && <><span className="text-blue-500 font-bold">{ones}</span>根</>}
        {' = '}
        <span className="text-primary-coral font-bold">{count}</span>
      </Text>
    </Box>
  )
}

function ItemsVisual({ items }: { items: string[] }) {
  return (
    <Box className="p-4 bg-gradient-to-br from-white to-yellow-50 rounded-2xl shadow-inner">
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-[300px] mx-auto">
        {items.map((item, i) => (
          <span
            key={i}
            className="text-3xl sm:text-4xl animate-pop emoji-shadow"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            {item}
          </span>
        ))}
      </div>
    </Box>
  )
}

function NumberLineVisual({ range }: { range: [number, number] }) {
  const [min, max] = range
  const numbers = Array.from({ length: max - min + 1 }, (_, i) => min + i)

  return (
    <Box className="p-4 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-inner overflow-x-auto">
      <div className="flex items-end justify-center gap-0 min-w-max px-2">
        {numbers.map((num, i) => (
          <div key={num} className="flex items-end animate-slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="flex flex-col items-center">
              <Text 
                size="lg" 
                fw={700} 
                className="text-primary-coral mb-1"
              >
                {num}
              </Text>
              <div className="w-0.5 h-4 bg-gray-400" />
            </div>
            {i < numbers.length - 1 && (
              <div className="w-8 sm:w-10 h-0.5 bg-gray-300 mb-2" />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-1">
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <span>◀</span>
          <span>数轴</span>
          <span>▶</span>
        </div>
      </div>
    </Box>
  )
}
