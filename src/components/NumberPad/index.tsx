import { SimpleGrid, Button } from '@mantine/core'
import { IconBackspace } from '@tabler/icons-react'

interface NumberPadProps {
  onNumberClick: (num: number) => void
  onClear: () => void
  onSubmit: () => void
  disabled?: boolean
  maxValue?: number
}

export default function NumberPad({ 
  onNumberClick, 
  onClear, 
  onSubmit,
  disabled = false,
  maxValue = 20,
}: NumberPadProps) {
  const numbers = maxValue <= 10 
    ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    : [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

  const cols = maxValue <= 10 ? 5 : 7

  return (
    <div className="w-full max-w-md mx-auto">
      <SimpleGrid cols={cols} spacing="xs">
        {numbers.map((num) => (
          <Button
            key={num}
            variant="light"
            color="coral"
            size="lg"
            disabled={disabled}
            onClick={() => onNumberClick(num)}
            className="min-h-[50px] text-xl font-bold transition-transform active:scale-95"
          >
            {num}
          </Button>
        ))}
      </SimpleGrid>

      <div className="flex gap-2 mt-3">
        <Button
          variant="light"
          color="gray"
          size="lg"
          onClick={onClear}
          disabled={disabled}
          className="flex-1 min-h-[50px]"
          leftSection={<IconBackspace size={20} />}
        >
          清除
        </Button>
        <Button
          variant="filled"
          color="mint"
          size="lg"
          onClick={onSubmit}
          disabled={disabled}
          className="flex-[2] min-h-[50px] text-xl font-bold"
        >
          确定
        </Button>
      </div>
    </div>
  )
}
