import type { LevelConfig } from '../types'

export const levels: LevelConfig[] = [
  {
    id: 'beginner-1',
    name: '生活小问题',
    description: '解决简单生活问题',
    difficulty: 'beginner',
    module: 'math',
    questionTypes: ['wordProblem'],
    questionCount: 5,
  },
  {
    id: 'beginner-2',
    name: '数一数',
    description: '数数图形有几个',
    difficulty: 'beginner',
    module: 'math',
    questionTypes: ['counting'],
    questionCount: 5,
  },
  {
    id: 'beginner-3',
    name: '加法入门',
    description: '10以内简单加法',
    difficulty: 'beginner',
    module: 'math',
    questionTypes: ['addition10'],
    questionCount: 8,
  },
  {
    id: 'beginner-4',
    name: '减法入门',
    description: '10以内简单减法',
    difficulty: 'beginner',
    module: 'math',
    questionTypes: ['subtraction10'],
    questionCount: 8,
  },
  {
    id: 'beginner-5',
    name: '找邻居',
    description: '找出数字的相邻数',
    difficulty: 'beginner',
    module: 'math',
    questionTypes: ['adjacent'],
    questionCount: 6,
  },
  {
    id: 'intermediate-1',
    name: '混合练习',
    description: '10以内加减混合',
    difficulty: 'intermediate',
    module: 'math',
    questionTypes: ['mixed10'],
    questionCount: 10,
    unlockCondition: 'beginner-3,beginner-4',
  },
  {
    id: 'intermediate-2',
    name: '比大小',
    description: '比较数字大小',
    difficulty: 'intermediate',
    module: 'math',
    questionTypes: ['compare'],
    questionCount: 8,
    unlockCondition: 'beginner-1',
  },
  {
    id: 'intermediate-3',
    name: '拆数游戏',
    description: '把数字拆成两部分',
    difficulty: 'intermediate',
    module: 'math',
    questionTypes: ['decompose'],
    questionCount: 8,
    unlockCondition: 'intermediate-1',
  },
  {
    id: 'intermediate-4',
    name: '进阶加法',
    description: '20以内加法',
    difficulty: 'intermediate',
    module: 'math',
    questionTypes: ['addition20'],
    questionCount: 10,
    unlockCondition: 'intermediate-1',
  },
  {
    id: 'intermediate-5',
    name: '进阶减法',
    description: '20以内减法',
    difficulty: 'intermediate',
    module: 'math',
    questionTypes: ['subtraction20'],
    questionCount: 10,
    unlockCondition: 'intermediate-1',
  },
  {
    id: 'challenge-1',
    name: '数学小达人',
    description: '20以内加减混合',
    difficulty: 'challenge',
    module: 'math',
    questionTypes: ['mixed20'],
    questionCount: 12,
    unlockCondition: 'intermediate-4,intermediate-5',
  },
  {
    id: 'challenge-2',
    name: '全能挑战',
    description: '所有题型混合',
    difficulty: 'challenge',
    module: 'math',
    questionTypes: ['mixed20', 'decompose', 'compare', 'adjacent'],
    questionCount: 15,
    unlockCondition: 'challenge-1',
  },
]

export const difficultyLabels: Record<string, string> = {
  beginner: '入门关',
  intermediate: '进阶关',
  challenge: '挑战关',
}

export const difficultyColors: Record<string, string> = {
  beginner: '#4ECDC4',
  intermediate: '#FF6B6B',
  challenge: '#9B59B6',
}

export function getLevelById(id: string): LevelConfig | undefined {
  return levels.find(level => level.id === id)
}

export function getLevelsByDifficulty(difficulty: string): LevelConfig[] {
  return levels.filter(level => level.difficulty === difficulty)
}
