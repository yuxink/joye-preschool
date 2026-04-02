// 数学题目生成器

// 生活应用题模板
const wordProblemTemplates = [
  { template: '小明有 {a} 个苹果，又买了 {b} 个，现在有几个苹果？', type: 'add' },
  { template: '妈妈买了 {a} 个鸡蛋，用掉了 {b} 个，还剩几个？', type: 'sub' },
  { template: '树上有 {a} 只小鸟，飞走了 {b} 只，还剩几只？', type: 'sub' },
  { template: '小红有 {a} 块糖，小明给了她 {b} 块，现在有几块？', type: 'add' },
  { template: '公交车上有 {a} 人，下车了 {b} 人，还有几人？', type: 'sub' },
  { template: '花园里有 {a} 朵红花，{b} 朵黄花，一共有几朵花？', type: 'add' },
  { template: '小狗有 {a} 块骨头，吃了 {b} 块，还剩几块？', type: 'sub' },
  { template: '书架上有 {a} 本书，又放上 {b} 本，现在有几本？', type: 'add' },
  { template: '盘子里有 {a} 个橘子，吃掉 {b} 个，还剩几个？', type: 'sub' },
  { template: '小华有 {a} 支铅笔，借给同学 {b} 支，还剩几支？', type: 'sub' },
  { template: '池塘里有 {a} 只鸭子，又来了 {b} 只，现在有几只？', type: 'add' },
  { template: '篮子里有 {a} 个桃子，拿走 {b} 个，还剩几个？', type: 'sub' },
]

// 生成随机数
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// 打乱数组
function shuffle(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// 生成选项
function generateOptions(correctAnswer, min, max) {
  const options = [correctAnswer]

  while (options.length < 4) {
    const option = randomInt(min, max)
    if (!options.includes(option)) {
      options.push(option)
    }
  }

  return shuffle(options)
}

// 生成10以内加减法
function generateMixed10() {
  const isAdd = Math.random() > 0.5
  let a, b, answer

  if (isAdd) {
    a = randomInt(1, 9)
    b = randomInt(1, 10 - a)
    answer = a + b
    return {
      question: `${a} + ${b} = ?`,
      answer: answer,
      type: 'mixed10',
      options: generateOptions(answer, 0, 10)
    }
  } else {
    a = randomInt(2, 10)
    b = randomInt(1, a - 1)
    answer = a - b
    return {
      question: `${a} - ${b} = ?`,
      answer: answer,
      type: 'mixed10',
      options: generateOptions(answer, 0, 10)
    }
  }
}

// 生成20以内加减法
function generateMixed20() {
  const isAdd = Math.random() > 0.5
  let a, b, answer

  if (isAdd) {
    a = randomInt(1, 18)
    b = randomInt(1, 20 - a)
    answer = a + b
    return {
      question: `${a} + ${b} = ?`,
      answer: answer,
      type: 'mixed20',
      options: generateOptions(answer, 0, 20)
    }
  } else {
    a = randomInt(2, 20)
    b = randomInt(1, a - 1)
    answer = a - b
    return {
      question: `${a} - ${b} = ?`,
      answer: answer,
      type: 'mixed20',
      options: generateOptions(answer, 0, 20)
    }
  }
}

// 生成拆数题
function generateDecompose() {
  const num = randomInt(3, 10)
  const part1 = randomInt(1, num - 1)
  const part2 = num - part1

  const questions = [
    { question: `${num} 可以分成 ${part1} 和 ?`, answer: part2 },
    { question: `${num} = ${part1} + ?`, answer: part2 },
    { question: `? + ${part2} = ${num}`, answer: part1 },
  ]

  const q = questions[randomInt(0, questions.length - 1)]
  return {
    ...q,
    type: 'decompose',
    options: generateOptions(q.answer, 1, 10)
  }
}

// 生成相邻数题
function generateAdjacent() {
  const num = randomInt(1, 19)
  const askPrev = Math.random() > 0.5

  if (askPrev && num > 0) {
    return {
      question: `${num} 的前一个数是？`,
      answer: num - 1,
      type: 'adjacent',
      options: generateOptions(num - 1, 0, 20)
    }
  } else if (num < 20) {
    return {
      question: `${num} 的后一个数是？`,
      answer: num + 1,
      type: 'adjacent',
      options: generateOptions(num + 1, 0, 20)
    }
  }
  return generateAdjacent()
}

// 生成比大小题
function generateCompare() {
  const a = randomInt(0, 20)
  let b = randomInt(0, 20)
  while (b === a) {
    b = randomInt(0, 20)
  }

  let answer
  if (a > b) answer = '>'
  else if (a < b) answer = '<'
  else answer = '='

  return {
    question: `${a} ○ ${b}`,
    answer: answer,
    type: 'compare',
    options: ['>', '<', '='],
    a: a,
    b: b
  }
}

// 生成数列题
function generateSequence() {
  const start = randomInt(1, 15)
  const step = randomInt(1, 3)
  const length = 5
  const blankIndex = randomInt(1, length - 2)
  
  const sequence = []
  for (let i = 0; i < length; i++) {
    sequence.push(start + i * step)
  }
  
  const answer = sequence[blankIndex]
  sequence[blankIndex] = '?'

  return {
    question: `找规律填空：${sequence.join(', ')}`,
    answer: answer,
    type: 'sequence',
    options: generateOptions(answer, 1, 20)
  }
}

// 生成生活应用题
function generateWordProblem() {
  const template = wordProblemTemplates[randomInt(0, wordProblemTemplates.length - 1)]
  let a, b, answer

  if (template.type === 'add') {
    a = randomInt(1, 9)
    b = randomInt(1, 10 - a)
    answer = a + b
  } else {
    a = randomInt(3, 10)
    b = randomInt(1, a - 1)
    answer = a - b
  }

  const question = template.template
    .replace('{a}', a)
    .replace('{b}', b)

  return {
    question: question,
    answer: answer,
    type: 'wordProblem',
    options: generateOptions(answer, 0, 15)
  }
}

// 生成10以内乘法（九九入门）
function generateMultiply10() {
  const a = randomInt(1, 9)
  const b = randomInt(1, 9)
  const answer = a * b
  return {
    question: `${a} × ${b} = ?`,
    answer,
    type: 'multiply10',
    options: generateOptions(answer, 0, 81)
  }
}

// 生成除法（整除）
function generateDivision10() {
  const b = randomInt(1, 9)
  const answer = randomInt(1, 9)
  const a = b * answer
  return {
    question: `${a} ÷ ${b} = ?`,
    answer,
    type: 'division10',
    options: generateOptions(answer, 1, 9)
  }
}

// 认识整点时间
function generateClockRead() {
  const hour = randomInt(1, 12)
  const answer = `${hour}:00`
  const options = []
  while (options.length < 4) {
    const option = `${randomInt(1, 12)}:00`
    if (!options.includes(option)) options.push(option)
  }
  if (!options.includes(answer)) options[Math.floor(Math.random() * 4)] = answer
  return {
    question: `现在是几点（整点）？`,
    answer,
    type: 'clockRead',
    options: shuffle(options),
    hour
  }
}

// 认识人民币（元）
function generateMoneyCount() {
  const a = randomInt(1, 9)
  const b = randomInt(1, 9)
  const answer = a + b
  return {
    question: `${a}元 + ${b}元 = ?元`,
    answer,
    type: 'moneyCount',
    options: generateOptions(answer, 0, 20)
  }
}

// 奇偶判断
function generateOddEven() {
  const num = randomInt(1, 30)
  const answer = num % 2 === 0 ? '偶数' : '奇数'
  return {
    question: `${num} 是奇数还是偶数？`,
    answer,
    type: 'oddEven',
    options: ['奇数', '偶数']
  }
}

// 根据类型生成题目
function generateQuestion(type) {
  switch (type) {
    case 'mixed10':
      return generateMixed10()
    case 'mixed20':
      return generateMixed20()
    case 'decompose':
      return generateDecompose()
    case 'adjacent':
      return generateAdjacent()
    case 'compare':
      return generateCompare()
    case 'sequence':
      return generateSequence()
    case 'wordProblem':
      return generateWordProblem()
    case 'multiply10':
      return generateMultiply10()
    case 'division10':
      return generateDivision10()
    case 'clockRead':
      return generateClockRead()
    case 'moneyCount':
      return generateMoneyCount()
    case 'oddEven':
      return generateOddEven()
    default:
      return generateMixed10()
  }
}

// 批量生成题目
function generateQuestions(type, count) {
  const questions = []
  for (let i = 0; i < count; i++) {
    questions.push(generateQuestion(type))
  }
  return questions
}

module.exports = {
  generateQuestion,
  generateQuestions,
  generateMixed10,
  generateMixed20,
  generateDecompose,
  generateAdjacent,
  generateCompare,
  generateSequence,
  generateWordProblem,
  generateMultiply10,
  generateDivision10,
  generateClockRead,
  generateMoneyCount,
  generateOddEven
}
