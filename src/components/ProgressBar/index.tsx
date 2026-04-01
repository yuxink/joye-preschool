import { Progress, Text, Group, Box } from '@mantine/core'

interface ProgressBarProps {
  current: number
  total: number
  correct: number
  showCorrect?: boolean
}

export default function ProgressBar({ 
  current, 
  total, 
  correct,
  showCorrect = true,
}: ProgressBarProps) {
  const percentage = total > 0 ? (current / total) * 100 : 0
  const correctPercentage = current > 0 ? (correct / current) * 100 : 0

  return (
    <Box className="w-full mb-4">
      <Group justify="space-between" mb="xs">
        <Text size="sm" fw={600} className="text-gray-600">
          进度：{current} / {total}
        </Text>
        {showCorrect && current > 0 && (
          <Text size="sm" fw={600} className="text-green-600">
            正确率：{Math.round(correctPercentage)}%
          </Text>
        )}
      </Group>
      
      <Progress.Root size="lg" radius="xl">
        <Progress.Section 
          value={percentage} 
          color="coral"
          className="transition-all duration-500"
        >
          <Progress.Label>{Math.round(percentage)}%</Progress.Label>
        </Progress.Section>
      </Progress.Root>
    </Box>
  )
}
