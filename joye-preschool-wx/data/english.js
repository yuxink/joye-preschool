// 英语单词数据

const categories = [
  { id: 'animals', name: '动物', icon: '🐾' },
  { id: 'fruits', name: '水果', icon: '🍎' },
  { id: 'colors', name: '颜色', icon: '🎨' },
  { id: 'numbers', name: '数字', icon: '🔢' },
  { id: 'family', name: '家人', icon: '👨‍👩‍👧' },
  { id: 'body', name: '身体', icon: '🧍' },
  { id: 'food', name: '食物', icon: '🍔' },
  { id: 'school', name: '学校', icon: '🏫' },
  { id: 'nature', name: '自然', icon: '🌳' },
  { id: 'weather', name: '天气', icon: '☀️' }
]

const words = [
  // 动物
  { word: 'cat', phonetic: '/kæt/', meaning: '猫', category: 'animals', sentences: ['I have a cat.', 'The cat is cute.'] },
  { word: 'dog', phonetic: '/dɒɡ/', meaning: '狗', category: 'animals', sentences: ['I like dogs.', 'The dog is big.'] },
  { word: 'bird', phonetic: '/bɜːd/', meaning: '鸟', category: 'animals', sentences: ['The bird can fly.', 'I see a bird.'] },
  { word: 'fish', phonetic: '/fɪʃ/', meaning: '鱼', category: 'animals', sentences: ['The fish swims.', 'I have a fish.'] },
  { word: 'rabbit', phonetic: '/ˈræbɪt/', meaning: '兔子', category: 'animals', sentences: ['The rabbit is white.', 'I love rabbits.'] },
  { word: 'duck', phonetic: '/dʌk/', meaning: '鸭子', category: 'animals', sentences: ['The duck can swim.', 'I see a duck.'] },
  { word: 'pig', phonetic: '/pɪɡ/', meaning: '猪', category: 'animals', sentences: ['The pig is pink.', 'Pigs are funny.'] },
  { word: 'cow', phonetic: '/kaʊ/', meaning: '牛', category: 'animals', sentences: ['The cow says moo.', 'I see a cow.'] },
  
  // 水果
  { word: 'apple', phonetic: '/ˈæpl/', meaning: '苹果', category: 'fruits', sentences: ['I eat an apple.', 'Apples are red.'] },
  { word: 'banana', phonetic: '/bəˈnɑːnə/', meaning: '香蕉', category: 'fruits', sentences: ['I like bananas.', 'The banana is yellow.'] },
  { word: 'orange', phonetic: '/ˈɒrɪndʒ/', meaning: '橙子', category: 'fruits', sentences: ['I have an orange.', 'Oranges are sweet.'] },
  { word: 'grape', phonetic: '/ɡreɪp/', meaning: '葡萄', category: 'fruits', sentences: ['I like grapes.', 'Grapes are purple.'] },
  { word: 'watermelon', phonetic: '/ˈwɔːtəmelən/', meaning: '西瓜', category: 'fruits', sentences: ['I eat watermelon.', 'Watermelon is big.'] },
  { word: 'pear', phonetic: '/peə/', meaning: '梨', category: 'fruits', sentences: ['I have a pear.', 'The pear is green.'] },
  
  // 颜色
  { word: 'red', phonetic: '/red/', meaning: '红色', category: 'colors', sentences: ['The apple is red.', 'I like red.'] },
  { word: 'blue', phonetic: '/bluː/', meaning: '蓝色', category: 'colors', sentences: ['The sky is blue.', 'I like blue.'] },
  { word: 'green', phonetic: '/ɡriːn/', meaning: '绿色', category: 'colors', sentences: ['The grass is green.', 'I see green.'] },
  { word: 'yellow', phonetic: '/ˈjeləʊ/', meaning: '黄色', category: 'colors', sentences: ['The sun is yellow.', 'I like yellow.'] },
  { word: 'white', phonetic: '/waɪt/', meaning: '白色', category: 'colors', sentences: ['Snow is white.', 'I have white shoes.'] },
  { word: 'black', phonetic: '/blæk/', meaning: '黑色', category: 'colors', sentences: ['The cat is black.', 'I like black.'] },
  { word: 'pink', phonetic: '/pɪŋk/', meaning: '粉色', category: 'colors', sentences: ['The flower is pink.', 'I like pink.'] },
  { word: 'purple', phonetic: '/ˈpɜːpl/', meaning: '紫色', category: 'colors', sentences: ['Grapes are purple.', 'I like purple.'] },
  
  // 数字
  { word: 'one', phonetic: '/wʌn/', meaning: '一', category: 'numbers', sentences: ['I have one book.', 'One plus one is two.'] },
  { word: 'two', phonetic: '/tuː/', meaning: '二', category: 'numbers', sentences: ['I have two hands.', 'Two cats are playing.'] },
  { word: 'three', phonetic: '/θriː/', meaning: '三', category: 'numbers', sentences: ['I am three years old.', 'I have three apples.'] },
  { word: 'four', phonetic: '/fɔː/', meaning: '四', category: 'numbers', sentences: ['I have four legs.', 'Four birds fly away.'] },
  { word: 'five', phonetic: '/faɪv/', meaning: '五', category: 'numbers', sentences: ['I have five fingers.', 'Five is my favorite.'] },
  { word: 'six', phonetic: '/sɪks/', meaning: '六', category: 'numbers', sentences: ['I am six years old.', 'Six ducks swim.'] },
  { word: 'seven', phonetic: '/ˈsevn/', meaning: '七', category: 'numbers', sentences: ['Seven days in a week.', 'I have seven books.'] },
  { word: 'eight', phonetic: '/eɪt/', meaning: '八', category: 'numbers', sentences: ['Eight legs for a spider.', 'I am eight.'] },
  { word: 'nine', phonetic: '/naɪn/', meaning: '九', category: 'numbers', sentences: ['Nine is after eight.', 'I have nine toys.'] },
  { word: 'ten', phonetic: '/ten/', meaning: '十', category: 'numbers', sentences: ['I have ten fingers.', 'Ten birds fly.'] },
  
  // 家人
  { word: 'father', phonetic: '/ˈfɑːðə/', meaning: '爸爸', category: 'family', sentences: ['My father is tall.', 'I love my father.'] },
  { word: 'mother', phonetic: '/ˈmʌðə/', meaning: '妈妈', category: 'family', sentences: ['My mother is kind.', 'I love my mother.'] },
  { word: 'brother', phonetic: '/ˈbrʌðə/', meaning: '兄弟', category: 'family', sentences: ['I have a brother.', 'My brother is young.'] },
  { word: 'sister', phonetic: '/ˈsɪstə/', meaning: '姐妹', category: 'family', sentences: ['I have a sister.', 'My sister is nice.'] },
  { word: 'grandpa', phonetic: '/ˈɡrænpɑː/', meaning: '爷爷/外公', category: 'family', sentences: ['I love grandpa.', 'Grandpa tells stories.'] },
  { word: 'grandma', phonetic: '/ˈɡrænmɑː/', meaning: '奶奶/外婆', category: 'family', sentences: ['I love grandma.', 'Grandma cooks for me.'] },
  
  // 身体
  { word: 'head', phonetic: '/hed/', meaning: '头', category: 'body', sentences: ['Touch your head.', 'My head is big.'] },
  { word: 'eye', phonetic: '/aɪ/', meaning: '眼睛', category: 'body', sentences: ['I have two eyes.', 'My eyes are black.'] },
  { word: 'ear', phonetic: '/ɪə/', meaning: '耳朵', category: 'body', sentences: ['I have two ears.', 'Touch your ears.'] },
  { word: 'nose', phonetic: '/nəʊz/', meaning: '鼻子', category: 'body', sentences: ['Touch your nose.', 'My nose is small.'] },
  { word: 'mouth', phonetic: '/maʊθ/', meaning: '嘴巴', category: 'body', sentences: ['Open your mouth.', 'My mouth is big.'] },
  { word: 'hand', phonetic: '/hænd/', meaning: '手', category: 'body', sentences: ['Wash your hands.', 'I have two hands.'] },
  { word: 'foot', phonetic: '/fʊt/', meaning: '脚', category: 'body', sentences: ['Touch your foot.', 'I have two feet.'] },
  
  // 食物
  { word: 'rice', phonetic: '/raɪs/', meaning: '米饭', category: 'food', sentences: ['I eat rice.', 'Rice is white.'] },
  { word: 'bread', phonetic: '/bred/', meaning: '面包', category: 'food', sentences: ['I like bread.', 'Bread is soft.'] },
  { word: 'egg', phonetic: '/eɡ/', meaning: '鸡蛋', category: 'food', sentences: ['I eat eggs.', 'Eggs are yummy.'] },
  { word: 'milk', phonetic: '/mɪlk/', meaning: '牛奶', category: 'food', sentences: ['I drink milk.', 'Milk is white.'] },
  { word: 'water', phonetic: '/ˈwɔːtə/', meaning: '水', category: 'food', sentences: ['I drink water.', 'Water is good.'] },
  { word: 'cake', phonetic: '/keɪk/', meaning: '蛋糕', category: 'food', sentences: ['I like cake.', 'The cake is sweet.'] },
  
  // 学校
  { word: 'book', phonetic: '/bʊk/', meaning: '书', category: 'school', sentences: ['I read a book.', 'The book is big.'] },
  { word: 'pen', phonetic: '/pen/', meaning: '钢笔', category: 'school', sentences: ['I have a pen.', 'The pen is blue.'] },
  { word: 'pencil', phonetic: '/ˈpensl/', meaning: '铅笔', category: 'school', sentences: ['I use a pencil.', 'The pencil is yellow.'] },
  { word: 'bag', phonetic: '/bæɡ/', meaning: '书包', category: 'school', sentences: ['I have a bag.', 'My bag is red.'] },
  { word: 'desk', phonetic: '/desk/', meaning: '课桌', category: 'school', sentences: ['I sit at my desk.', 'The desk is big.'] },
  { word: 'chair', phonetic: '/tʃeə/', meaning: '椅子', category: 'school', sentences: ['I sit on a chair.', 'The chair is small.'] },
  { word: 'teacher', phonetic: '/ˈtiːtʃə/', meaning: '老师', category: 'school', sentences: ['My teacher is nice.', 'I like my teacher.'] },
  { word: 'classroom', phonetic: '/ˈklɑːsruːm/', meaning: '教室', category: 'school', sentences: ['This is my classroom.', 'Our classroom is clean.'] },
  { word: 'blackboard', phonetic: '/ˈblækbɔːd/', meaning: '黑板', category: 'school', sentences: ['The blackboard is big.', 'Teacher writes on the blackboard.'] },
  { word: 'ruler', phonetic: '/ˈruːlə/', meaning: '尺子', category: 'school', sentences: ['I have a ruler.', 'The ruler is long.'] },

  // 自然
  { word: 'sun', phonetic: '/sʌn/', meaning: '太阳', category: 'nature', sentences: ['The sun is bright.', 'I see the sun.'] },
  { word: 'moon', phonetic: '/muːn/', meaning: '月亮', category: 'nature', sentences: ['The moon is round.', 'I see the moon.'] },
  { word: 'star', phonetic: '/stɑː/', meaning: '星星', category: 'nature', sentences: ['Stars are shining.', 'I see many stars.'] },
  { word: 'tree', phonetic: '/triː/', meaning: '树', category: 'nature', sentences: ['The tree is tall.', 'I climb a tree.'] },
  { word: 'flower', phonetic: '/ˈflaʊə/', meaning: '花', category: 'nature', sentences: ['The flower is pretty.', 'I like flowers.'] },
  { word: 'grass', phonetic: '/ɡrɑːs/', meaning: '草', category: 'nature', sentences: ['The grass is green.', 'I sit on the grass.'] },
  { word: 'river', phonetic: '/ˈrɪvə/', meaning: '河流', category: 'nature', sentences: ['The river is long.', 'Fish live in the river.'] },
  { word: 'mountain', phonetic: '/ˈmaʊntɪn/', meaning: '山', category: 'nature', sentences: ['The mountain is high.', 'We climb the mountain.'] },
  { word: 'leaf', phonetic: '/liːf/', meaning: '叶子', category: 'nature', sentences: ['The leaf is green.', 'Leaves fall in autumn.'] },

  // 天气
  { word: 'sunny', phonetic: '/ˈsʌni/', meaning: '晴朗的', category: 'weather', sentences: ['It is sunny today.', 'I like sunny days.'] },
  { word: 'cloudy', phonetic: '/ˈklaʊdi/', meaning: '多云的', category: 'weather', sentences: ['It is cloudy today.', 'The sky is cloudy.'] },
  { word: 'rainy', phonetic: '/ˈreɪni/', meaning: '下雨的', category: 'weather', sentences: ['It is rainy today.', 'I stay home on rainy days.'] },
  { word: 'windy', phonetic: '/ˈwɪndi/', meaning: '有风的', category: 'weather', sentences: ['It is windy today.', 'The trees blow in the wind.'] },
  { word: 'hot', phonetic: '/hɒt/', meaning: '热的', category: 'weather', sentences: ['It is hot today.', 'Summer is hot.'] },
  { word: 'cold', phonetic: '/kəʊld/', meaning: '冷的', category: 'weather', sentences: ['It is cold today.', 'Winter is cold.'] },
  { word: 'warm', phonetic: '/wɔːm/', meaning: '温暖的', category: 'weather', sentences: ['It is warm in spring.', 'The sun feels warm.'] },
  { word: 'cool', phonetic: '/kuːl/', meaning: '凉爽的', category: 'weather', sentences: ['It is cool today.', 'I like cool weather.'] },
  { word: 'snowy', phonetic: '/ˈsnəʊi/', meaning: '下雪的', category: 'weather', sentences: ['It is snowy today.', 'Children play in snowy weather.'] }
]

// 常用句型
const sentencePatterns = [
  {
    category: '问候',
    patterns: [
      { pattern: 'Hello!', meaning: '你好！', examples: ['Hello, Tom!', 'Hello, teacher!'] },
      { pattern: 'Hi!', meaning: '嗨！', examples: ['Hi, Mom!', 'Hi, friend!'] },
      { pattern: 'Good morning!', meaning: '早上好！', examples: ['Good morning, Dad!', 'Good morning, class!'] },
      { pattern: 'Good afternoon!', meaning: '下午好！', examples: ['Good afternoon, Miss Li!', 'Good afternoon, everyone!'] },
      { pattern: 'Good evening!', meaning: '晚上好！', examples: ['Good evening, Grandpa!', 'Good evening, teacher!'] },
      { pattern: 'Good night!', meaning: '晚安！', examples: ['Good night, Mom!', 'Good night, Dad!'] },
      { pattern: 'See you!', meaning: '再见！回头见！', examples: ['See you tomorrow!', 'See you at school!'] },
      { pattern: 'Goodbye!', meaning: '再见！', examples: ['Goodbye, Tom!', 'Goodbye, teacher!'] }
    ]
  },
  {
    category: '自我介绍',
    patterns: [
      { pattern: 'My name is...', meaning: '我的名字是...', examples: ['My name is Tom.', 'My name is Lucy.'] },
      { pattern: 'I am...', meaning: '我是...', examples: ['I am a student.', 'I am six years old.'] },
      { pattern: 'I am from...', meaning: '我来自...', examples: ['I am from China.', 'I am from Beijing.'] },
      { pattern: 'This is...', meaning: '这是...', examples: ['This is my father.', 'This is a cat.'] },
      { pattern: 'I like...', meaning: '我喜欢...', examples: ['I like apples.', 'I like dogs.'] },
      { pattern: 'I can...', meaning: '我会...', examples: ['I can sing.', 'I can draw.'] }
    ]
  },
  {
    category: '课堂用语',
    patterns: [
      { pattern: 'Please sit down.', meaning: '请坐下。', examples: ['Please sit down, class.'] },
      { pattern: 'Please stand up.', meaning: '请起立。', examples: ['Please stand up, boys and girls.'] },
      { pattern: 'Listen carefully.', meaning: '认真听。', examples: ['Listen carefully, please.'] },
      { pattern: 'Look at the blackboard.', meaning: '看黑板。', examples: ['Look at the blackboard, please.'] },
      { pattern: 'Open your book.', meaning: '打开书。', examples: ['Open your book to page ten.'] },
      { pattern: 'Close your book.', meaning: '合上书。', examples: ['Close your book now.'] },
      { pattern: 'Raise your hand.', meaning: '举手。', examples: ['Raise your hand if you know.'] },
      { pattern: 'Be quiet.', meaning: '安静。', examples: ['Be quiet, please.'] }
    ]
  },
  {
    category: '日常询问',
    patterns: [
      { pattern: 'What is this?', meaning: '这是什么？', examples: ['What is this? It is a book.'] },
      { pattern: 'What color is it?', meaning: '它是什么颜色？', examples: ['What color is it? It is red.'] },
      { pattern: 'How old are you?', meaning: '你几岁了？', examples: ['How old are you? I am six.'] },
      { pattern: 'How are you?', meaning: '你好吗？', examples: ['How are you? I am fine, thank you.'] },
      { pattern: 'Where is...?', meaning: '...在哪里？', examples: ['Where is my bag?', 'Where is the cat?'] },
      { pattern: 'Who is he/she?', meaning: '他/她是谁？', examples: ['Who is he? He is my brother.', 'Who is she? She is my teacher.'] },
      { pattern: 'How many...?', meaning: '有多少...？', examples: ['How many apples?', 'How many books?'] },
      { pattern: 'What time is it?', meaning: '几点了？', examples: ['What time is it? It is seven.'] }
    ]
  },
  {
    category: '请求与礼貌',
    patterns: [
      { pattern: 'Please...', meaning: '请...', examples: ['Please help me.', 'Please wait a moment.'] },
      { pattern: 'Can I...?', meaning: '我可以...吗？', examples: ['Can I go home?', 'Can I have an apple?'] },
      { pattern: 'May I...?', meaning: '我可以...吗？（更礼貌）', examples: ['May I come in?', 'May I use your pen?'] },
      { pattern: 'Thank you!', meaning: '谢谢！', examples: ['Thank you, Mom!', 'Thank you very much!'] },
      { pattern: 'You are welcome.', meaning: '不客气。', examples: ['You are welcome, Tom.'] },
      { pattern: 'Excuse me.', meaning: '打扰一下/请问。', examples: ['Excuse me, where is my seat?', 'Excuse me, teacher.'] },
      { pattern: 'Sorry.', meaning: '对不起。', examples: ['Sorry, I am late.', 'Sorry, I broke it.'] }
    ]
  },
  {
    category: '场景表达',
    patterns: [
      { pattern: 'I am hungry.', meaning: '我饿了。', examples: ['I am hungry. I want some bread.'] },
      { pattern: 'I am thirsty.', meaning: '我渴了。', examples: ['I am thirsty. I want some water.'] },
      { pattern: 'I am tired.', meaning: '我累了。', examples: ['I am tired. I want to sleep.'] },
      { pattern: 'It is sunny today.', meaning: '今天天气晴朗。', examples: ['It is sunny today. Let us play outside.'] },
      { pattern: 'Let us...', meaning: '让我们...', examples: ['Let us play a game.', 'Let us clean the classroom.'] },
      { pattern: 'I do not know.', meaning: '我不知道。', examples: ['I do not know the answer.', 'I do not know his name.'] }
    ]
  }
]

module.exports = {
  categories,
  words,
  sentencePatterns
}
