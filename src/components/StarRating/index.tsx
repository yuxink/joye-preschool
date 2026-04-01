import { Group } from '@mantine/core'
import { IconStar, IconStarFilled } from '@tabler/icons-react'

interface StarRatingProps {
  stars: number
  maxStars?: number
  size?: number
  animated?: boolean
}

export default function StarRating({ 
  stars, 
  maxStars = 3, 
  size = 32,
  animated = false,
}: StarRatingProps) {
  return (
    <Group gap="xs" justify="center">
      {Array.from({ length: maxStars }).map((_, index) => {
        const isFilled = index < stars
        
        return (
          <div
            key={index}
            className={animated && isFilled ? 'animate-star' : ''}
            style={{ 
              animationDelay: animated ? `${index * 0.2}s` : undefined,
            }}
          >
            {isFilled ? (
              <IconStarFilled 
                size={size} 
                className="text-yellow-400 drop-shadow-md"
              />
            ) : (
              <IconStar 
                size={size} 
                className="text-gray-300"
              />
            )}
          </div>
        )
      })}
    </Group>
  )
}

export function calculateStars(correct: number, total: number): number {
  if (total === 0) return 0
  const percentage = (correct / total) * 100
  
  if (percentage >= 90) return 3
  if (percentage >= 70) return 2
  if (percentage >= 50) return 1
  return 0
}
