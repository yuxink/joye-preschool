import { useState } from 'react'

interface OptionButtonProps {
  value: number | string
  onClick: (value: number | string) => void
  disabled?: boolean
  isCorrect?: boolean | null
  isSelected?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export default function OptionButton({
  value,
  onClick,
  disabled = false,
  isCorrect = null,
  isSelected = false,
}: OptionButtonProps) {
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    if (disabled) return
    setClicked(true)
    onClick(value)
    setTimeout(() => setClicked(false), 200)
  }

  const getBackgroundClass = () => {
    if (isCorrect === true) return 'bg-green-500 hover:bg-green-500 text-white border-green-500'
    if (isCorrect === false && isSelected) return 'bg-red-400 hover:bg-red-400 text-white border-red-400'
    if (isSelected) return 'bg-primary-coral hover:bg-primary-coral text-white border-primary-coral'
    return 'bg-white hover:bg-gray-50 text-gray-800 border-gray-200'
  }

  const getEmoji = () => {
    if (isCorrect === true) return '✓'
    if (isCorrect === false && isSelected) return '✗'
    return null
  }

  return (
    <button
      disabled={disabled && isCorrect === null}
      onClick={handleClick}
      className={`
        w-full min-h-[60px] sm:min-h-[70px] 
        rounded-2xl border-2 
        flex items-center justify-center gap-2
        text-xl sm:text-2xl font-bold
        transition-all duration-200 ease-out
        touch-manipulation
        ${getBackgroundClass()}
        ${clicked ? 'scale-95' : 'scale-100'}
        ${isCorrect === true ? 'animate-bounce-in' : ''}
        ${isCorrect === false && isSelected ? 'animate-shake' : ''}
        ${!disabled && !isSelected ? 'active:scale-95 hover:shadow-md' : ''}
        ${disabled && isCorrect === null ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {getEmoji() && (
        <span className="text-lg">{getEmoji()}</span>
      )}
      <span>{value}</span>
    </button>
  )
}
