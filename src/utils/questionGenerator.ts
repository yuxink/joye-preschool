import type { Question, QuestionType, MathQuestionType } from '../types'

let questionIdCounter = 0

function generateId(): string {
  return `q_${Date.now()}_${++questionIdCounter}`
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function shuffleArray<T>(array: T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

// 视觉物品 - 使用简单符号
const visualItems = ['●', '■', '▲', '★', '◆', '♥', '○', '□']

function getRandomVisualItem(): string {
  return visualItems[randomInt(0, visualItems.length - 1)]
}

function generateAddition10(): Question {
  const num1 = randomInt(0, 10)
  const num2 = randomInt(0, 10 - num1)
  const answer = num1 + num2

  // 多种题目形式
  const formats = [
    `${num1} + ${num2} = ?`,
    `${num2} + ${num1} = ?`,
  ]

  return {
    id: generateId(),
    type: 'addition10',
    module: 'math',
    content: formats[randomInt(0, formats.length - 1)],
    answer,
    num1,
    num2,
    operator: '+',
    options: generateNumberOptions(answer, 0, 10),
    visual: {
      type: 'dots',
      count: answer,
    },
  }
}

function generateSubtraction10(): Question {
  const num1 = randomInt(1, 10)
  const num2 = randomInt(0, num1)
  const answer = num1 - num2

  return {
    id: generateId(),
    type: 'subtraction10',
    module: 'math',
    content: `${num1} - ${num2} = ?`,
    answer,
    num1,
    num2,
    operator: '-',
    options: generateNumberOptions(answer, 0, 10),
  }
}

function generateMixed10(): Question {
  // 增加填空题形式
  const rand = Math.random()
  
  if (rand < 0.4) {
    // 普通加法
    return { ...generateAddition10(), type: 'mixed10' }
  } else if (rand < 0.8) {
    // 普通减法
    return { ...generateSubtraction10(), type: 'mixed10' }
  } else {
    // 填空形式: ? + 3 = 7 或 5 - ? = 2
    const isAddition = Math.random() > 0.5
    if (isAddition) {
      const answer = randomInt(1, 8)
      const num2 = randomInt(1, 10 - answer)
      const total = answer + num2
      return {
        id: generateId(),
        type: 'mixed10',
        module: 'math',
        content: `? + ${num2} = ${total}`,
        answer,
        num1: answer,
        num2,
        operator: '+',
        options: generateNumberOptions(answer, 0, 10),
      }
    } else {
      const num1 = randomInt(3, 10)
      const answer = randomInt(1, num1 - 1)
      const result = num1 - answer
      return {
        id: generateId(),
        type: 'mixed10',
        module: 'math',
        content: `${num1} - ? = ${result}`,
        answer,
        num1,
        num2: answer,
        operator: '-',
        options: generateNumberOptions(answer, 0, num1),
      }
    }
  }
}

function generateAddition20(): Question {
  const num1 = randomInt(0, 20)
  const num2 = randomInt(0, 20 - num1)
  const answer = num1 + num2

  return {
    id: generateId(),
    type: 'addition20',
    module: 'math',
    content: `${num1} + ${num2} = ?`,
    answer,
    num1,
    num2,
    operator: '+',
    options: generateNumberOptions(answer, 0, 20),
    visual: answer <= 15 ? {
      type: 'sticks',
      count: answer,
    } : undefined,
  }
}

function generateSubtraction20(): Question {
  const num1 = randomInt(1, 20)
  const num2 = randomInt(0, num1)
  const answer = num1 - num2

  return {
    id: generateId(),
    type: 'subtraction20',
    module: 'math',
    content: `${num1} - ${num2} = ?`,
    answer,
    num1,
    num2,
    operator: '-',
    options: generateNumberOptions(answer, 0, 20),
  }
}

function generateMixed20(): Question {
  const rand = Math.random()
  
  if (rand < 0.35) {
    return { ...generateAddition20(), type: 'mixed20' }
  } else if (rand < 0.7) {
    return { ...generateSubtraction20(), type: 'mixed20' }
  } else {
    // 连加连减: a + b + c 或 a - b - c 或 a + b - c
    const type = randomInt(1, 3)
    if (type === 1) {
      // a + b + c
      const a = randomInt(1, 8)
      const b = randomInt(1, 8)
      const c = randomInt(1, Math.min(8, 20 - a - b))
      const answer = a + b + c
      return {
        id: generateId(),
        type: 'mixed20',
        module: 'math',
        content: `${a} + ${b} + ${c} = ?`,
        answer,
        num1: a,
        num2: b,
        operator: '+',
        options: generateNumberOptions(answer, 0, 20),
      }
    } else if (type === 2) {
      // a - b - c
      const a = randomInt(8, 15)
      const b = randomInt(1, Math.floor(a / 2))
      const c = randomInt(1, a - b - 1)
      const answer = a - b - c
      return {
        id: generateId(),
        type: 'mixed20',
        module: 'math',
        content: `${a} - ${b} - ${c} = ?`,
        answer,
        num1: a,
        num2: b,
        operator: '-',
        options: generateNumberOptions(answer, 0, 20),
      }
    } else {
      // a + b - c
      const a = randomInt(3, 10)
      const b = randomInt(3, 10)
      const c = randomInt(1, a + b - 1)
      const answer = a + b - c
      return {
        id: generateId(),
        type: 'mixed20',
        module: 'math',
        content: `${a} + ${b} - ${c} = ?`,
        answer,
        num1: a,
        num2: b,
        operator: '+',
        options: generateNumberOptions(answer, 0, 20),
      }
    }
  }
}

function generateDecompose(): Question {
  const total = randomInt(2, 10)
  const part1 = randomInt(1, total - 1)
  const part2 = total - part1

  // 多种问法
  const formats = [
    { content: `${total} 可以分成 ? 和 ${part2}`, answer: part1 },
    { content: `${total} 可以分成 ${part1} 和 ?`, answer: part2 },
    { content: `? 和 ${part2} 合起来是 ${total}`, answer: part1 },
    { content: `${part1} 和 ? 合起来是 ${total}`, answer: part2 },
  ]
  
  const selected = formats[randomInt(0, formats.length - 1)]

  return {
    id: generateId(),
    type: 'decompose',
    module: 'math',
    content: selected.content,
    answer: selected.answer,
    num1: total,
    num2: selected.answer === part1 ? part2 : part1,
    options: generateNumberOptions(selected.answer, 0, total),
    visual: {
      type: 'dots',
      count: total,
    },
  }
}

function generateAdjacent(): Question {
  const num = randomInt(1, 19)
  const questionType = randomInt(1, 4)

  let content: string
  let answer: number

  switch (questionType) {
    case 1:
      content = `${num} 的前面是 ?`
      answer = num - 1
      break
    case 2:
      content = `${num} 的后面是 ?`
      answer = num + 1
      break
    case 3:
      content = `比 ${num} 小 1 的数是 ?`
      answer = num - 1
      break
    default:
      content = `比 ${num} 大 1 的数是 ?`
      answer = num + 1
      break
  }

  return {
    id: generateId(),
    type: 'adjacent',
    module: 'math',
    content,
    answer,
    num1: num,
    options: generateNumberOptions(answer, Math.max(0, answer - 3), Math.min(20, answer + 3)),
    visual: {
      type: 'numberLine',
      range: [Math.max(0, num - 3), Math.min(20, num + 3)],
    },
  }
}

function generateCompare(): Question {
  const num1 = randomInt(0, 20)
  let num2 = randomInt(0, 20)
  
  // 确保有时候两个数相等
  if (Math.random() < 0.2) {
    num2 = num1
  }

  let answer: string
  if (num1 > num2) answer = '>'
  else if (num1 < num2) answer = '<'
  else answer = '='

  // 多种问法
  const formats = [
    `${num1} ○ ${num2}`,
    `比较 ${num1} 和 ${num2}`,
  ]

  return {
    id: generateId(),
    type: 'compare',
    module: 'math',
    content: formats[randomInt(0, formats.length - 1)],
    answer,
    num1,
    num2,
    options: ['>', '<', '='],
  }
}

// 丰富的生活应用题模板
const wordProblemTemplates = [
  // 加法场景
  { template: (n1: number, n2: number) => `小明有 ${n1} 个苹果，妈妈又给了他 ${n2} 个，现在有几个？`, type: 'add' as const },
  { template: (n1: number, n2: number) => `花园里有 ${n1} 朵红花，又开了 ${n2} 朵，现在有几朵？`, type: 'add' as const },
  { template: (n1: number, n2: number) => `停车场有 ${n1} 辆汽车，又开来 ${n2} 辆，一共几辆？`, type: 'add' as const },
  { template: (n1: number, n2: number) => `池塘里有 ${n1} 只鸭子，又游来 ${n2} 只，一共几只？`, type: 'add' as const },
  { template: (n1: number, n2: number) => `教室里有 ${n1} 个小朋友，又来了 ${n2} 个，现在有几个？`, type: 'add' as const },
  { template: (n1: number, n2: number) => `小红有 ${n1} 支铅笔，爸爸又买了 ${n2} 支，现在有几支？`, type: 'add' as const },
  { template: (n1: number, n2: number) => `书包里有 ${n1} 本书，又放进去 ${n2} 本，现在有几本？`, type: 'add' as const },
  { template: (n1: number, n2: number) => `草地上有 ${n1} 只蝴蝶，又飞来 ${n2} 只，现在有几只？`, type: 'add' as const },
  { template: (n1: number, n2: number) => `笼子里有 ${n1} 只小鸡，又放进来 ${n2} 只，现在有几只？`, type: 'add' as const },
  { template: (n1: number, n2: number) => `河边有 ${n1} 棵柳树，又种了 ${n2} 棵，现在有几棵？`, type: 'add' as const },
  { template: (n1: number, n2: number) => `小明上午做了 ${n1} 道题，下午做了 ${n2} 道，一共做了几道？`, type: 'add' as const },
  { template: (n1: number, n2: number) => `篮子里有 ${n1} 个梨，又放进 ${n2} 个，现在有几个？`, type: 'add' as const },
  
  // 减法场景
  { template: (n1: number, n2: number) => `树上有 ${n1} 只小鸟，飞走了 ${n2} 只，还剩几只？`, type: 'sub' as const },
  { template: (n1: number, n2: number) => `小红有 ${n1} 颗糖果，吃掉了 ${n2} 颗，还有几颗？`, type: 'sub' as const },
  { template: (n1: number, n2: number) => `盘子里有 ${n1} 个橘子，小明吃了 ${n2} 个，还剩几个？`, type: 'sub' as const },
  { template: (n1: number, n2: number) => `书架上有 ${n1} 本书，借走了 ${n2} 本，还剩几本？`, type: 'sub' as const },
  { template: (n1: number, n2: number) => `妈妈买了 ${n1} 个鸡蛋，用了 ${n2} 个做饭，还有几个？`, type: 'sub' as const },
  { template: (n1: number, n2: number) => `小兔采了 ${n1} 个蘑菇，送给松鼠 ${n2} 个，还剩几个？`, type: 'sub' as const },
  { template: (n1: number, n2: number) => `小猫钓了 ${n1} 条小鱼，吃掉 ${n2} 条，还有几条？`, type: 'sub' as const },
  { template: (n1: number, n2: number) => `公交车上有 ${n1} 人，下车了 ${n2} 人，还有几人？`, type: 'sub' as const },
  { template: (n1: number, n2: number) => `气球有 ${n1} 个，飞走了 ${n2} 个，还剩几个？`, type: 'sub' as const },
  { template: (n1: number, n2: number) => `小明有 ${n1} 元钱，买文具花了 ${n2} 元，还剩几元？`, type: 'sub' as const },
  { template: (n1: number, n2: number) => `鱼缸里有 ${n1} 条金鱼，捞走了 ${n2} 条，还有几条？`, type: 'sub' as const },
  { template: (n1: number, n2: number) => `桌上有 ${n1} 个杯子，拿走了 ${n2} 个，还剩几个？`, type: 'sub' as const },
  { template: (n1: number, n2: number) => `果园里有 ${n1} 棵苹果树，砍掉了 ${n2} 棵，还有几棵？`, type: 'sub' as const },
  { template: (n1: number, n2: number) => `小狗有 ${n1} 块骨头，吃了 ${n2} 块，还剩几块？`, type: 'sub' as const },
]

function generateWordProblem(): Question {
  const problem = wordProblemTemplates[randomInt(0, wordProblemTemplates.length - 1)]
  
  let num1: number, num2: number, answer: number
  
  if (problem.type === 'add') {
    num1 = randomInt(2, 12)
    num2 = randomInt(1, Math.min(12, 18 - num1))
    answer = num1 + num2
  } else {
    num1 = randomInt(5, 15)
    num2 = randomInt(1, num1 - 1)
    answer = num1 - num2
  }

  return {
    id: generateId(),
    type: 'wordProblem',
    module: 'math',
    content: problem.template(num1, num2),
    answer,
    num1,
    num2,
    operator: problem.type === 'add' ? '+' : '-',
    options: generateNumberOptions(answer, 0, 20),
  }
}

function generateCounting(): Question {
  const count = randomInt(1, 12)
  const item = getRandomVisualItem()
  const items = Array(count).fill(item)

  // 多种问法
  const formats = [
    '数一数，有几个？',
    '下面一共有多少个？',
    '请数一数图中有几个？',
  ]

  return {
    id: generateId(),
    type: 'counting',
    module: 'math',
    content: formats[randomInt(0, formats.length - 1)],
    answer: count,
    options: generateNumberOptions(count, 1, 15),
    visual: {
      type: 'fruits',
      items,
      count,
    },
  }
}

function generateSequence(): Question {
  const rand = Math.random()
  
  if (rand < 0.5) {
    // 顺序填数
    const start = randomInt(0, 15)
    const length = randomInt(4, 5)
    const numbers = Array.from({ length }, (_, i) => start + i)
    
    const missingIndex = randomInt(0, length - 1)
    const answer = numbers[missingIndex]
    
    const displayNumbers = numbers.map((n, i) => 
      i === missingIndex ? '?' : String(n)
    )

    return {
      id: generateId(),
      type: 'sequence',
      module: 'math',
      content: `按顺序填数：${displayNumbers.join(' , ')}`,
      answer,
      num1: start,
      options: generateNumberOptions(answer, Math.max(0, start - 2), start + length + 1),
    }
  } else if (rand < 0.75) {
    // 倒序填数
    const start = randomInt(10, 20)
    const length = 4
    const numbers = Array.from({ length }, (_, i) => start - i)
    
    const missingIndex = randomInt(0, length - 1)
    const answer = numbers[missingIndex]
    
    const displayNumbers = numbers.map((n, i) => 
      i === missingIndex ? '?' : String(n)
    )

    return {
      id: generateId(),
      type: 'sequence',
      module: 'math',
      content: `倒着数：${displayNumbers.join(' , ')}`,
      answer,
      num1: start,
      options: generateNumberOptions(answer, Math.max(0, answer - 3), Math.min(20, answer + 3)),
    }
  } else {
    // 隔一个数
    const start = randomInt(0, 8)
    const step = 2
    const length = 4
    const numbers = Array.from({ length }, (_, i) => start + i * step)
    
    const missingIndex = randomInt(0, length - 1)
    const answer = numbers[missingIndex]
    
    const displayNumbers = numbers.map((n, i) => 
      i === missingIndex ? '?' : String(n)
    )

    return {
      id: generateId(),
      type: 'sequence',
      module: 'math',
      content: `隔一个数：${displayNumbers.join(' , ')}`,
      answer,
      num1: start,
      options: generateNumberOptions(answer, 0, 20),
    }
  }
}

function generateNumberOptions(answer: number, min: number, max: number): number[] {
  const options = new Set<number>([answer])
  
  // 确保有近似的干扰项
  const nearOptions = [answer - 1, answer + 1, answer - 2, answer + 2]
  for (const opt of nearOptions) {
    if (opt >= min && opt <= max && options.size < 4) {
      options.add(opt)
    }
  }
  
  while (options.size < 4) {
    const offset = randomInt(-5, 5)
    const option = answer + offset
    
    if (option >= min && option <= max && option !== answer) {
      options.add(option)
    } else {
      const randOpt = randomInt(min, max)
      if (randOpt !== answer) {
        options.add(randOpt)
      }
    }
  }

  return shuffleArray(Array.from(options))
}

const mathGenerators: Record<MathQuestionType, () => Question> = {
  addition10: generateAddition10,
  subtraction10: generateSubtraction10,
  mixed10: generateMixed10,
  addition20: generateAddition20,
  subtraction20: generateSubtraction20,
  mixed20: generateMixed20,
  decompose: generateDecompose,
  adjacent: generateAdjacent,
  compare: generateCompare,
  wordProblem: generateWordProblem,
  counting: generateCounting,
  sequence: generateSequence,
}

export function generateQuestion(type: QuestionType): Question {
  const generator = mathGenerators[type as MathQuestionType]
  if (!generator) {
    throw new Error(`Unknown question type: ${type}`)
  }
  return generator()
}

export function generateQuestions(types: QuestionType[], count: number): Question[] {
  const questions: Question[] = []
  
  for (let i = 0; i < count; i++) {
    const type = types[i % types.length]
    questions.push(generateQuestion(type))
  }

  return shuffleArray(questions)
}

export function checkAnswer(question: Question, userAnswer: number | string): boolean {
  return String(question.answer) === String(userAnswer)
}
