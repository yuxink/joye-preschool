export interface EnglishWord {
  word: string
  phonetic: string
  meaning: string
  category: WordCategory
  sentences: string[]
}

export type WordCategory = 
  | 'animals' 
  | 'colors' 
  | 'numbers' 
  | 'family' 
  | 'body' 
  | 'food' 
  | 'fruits'
  | 'vegetables'
  | 'school' 
  | 'actions' 
  | 'greetings'
  | 'nature'
  | 'clothes'
  | 'toys'
  | 'transport'
  | 'time'
  | 'weather'
  | 'places'

export const categoryLabels: Record<WordCategory, { label: string; emoji: string; color: string }> = {
  animals: { label: '动物', emoji: '🐶', color: 'amber' },
  colors: { label: '颜色', emoji: '🎨', color: 'pink' },
  numbers: { label: '数字', emoji: '🔢', color: 'blue' },
  family: { label: '家人', emoji: '👨‍👩‍👧', color: 'rose' },
  body: { label: '身体', emoji: '🖐️', color: 'cyan' },
  food: { label: '食物', emoji: '🍔', color: 'orange' },
  fruits: { label: '水果', emoji: '🍎', color: 'red' },
  vegetables: { label: '蔬菜', emoji: '🥕', color: 'green' },
  school: { label: '学校', emoji: '✏️', color: 'indigo' },
  actions: { label: '动作', emoji: '🏃', color: 'emerald' },
  greetings: { label: '问候', emoji: '👋', color: 'violet' },
  nature: { label: '自然', emoji: '🌳', color: 'teal' },
  clothes: { label: '衣物', emoji: '👕', color: 'purple' },
  toys: { label: '玩具', emoji: '🎮', color: 'yellow' },
  transport: { label: '交通', emoji: '🚗', color: 'slate' },
  time: { label: '时间', emoji: '⏰', color: 'gray' },
  weather: { label: '天气', emoji: '☀️', color: 'sky' },
  places: { label: '地点', emoji: '🏠', color: 'lime' },
}

export const englishWords: EnglishWord[] = [
  // ===== 动物 Animals =====
  { word: 'cat', phonetic: '/kæt/', meaning: '猫', category: 'animals', sentences: ['I have a cat.', 'The cat is cute.', 'My cat likes fish.'] },
  { word: 'dog', phonetic: '/dɒɡ/', meaning: '狗', category: 'animals', sentences: ['I like dogs.', 'The dog is big.', 'Dogs are friendly.'] },
  { word: 'bird', phonetic: '/bɜːd/', meaning: '鸟', category: 'animals', sentences: ['Look at the bird!', 'The bird can fly.', 'Birds sing songs.'] },
  { word: 'fish', phonetic: '/fɪʃ/', meaning: '鱼', category: 'animals', sentences: ['I see a fish.', 'Fish can swim.', 'The fish is colorful.'] },
  { word: 'pig', phonetic: '/pɪɡ/', meaning: '猪', category: 'animals', sentences: ['The pig is pink.', 'I like pigs.', 'Pigs are cute.'] },
  { word: 'duck', phonetic: '/dʌk/', meaning: '鸭子', category: 'animals', sentences: ['The duck says quack.', 'Ducks can swim.', 'I see a duck.'] },
  { word: 'rabbit', phonetic: '/ˈræbɪt/', meaning: '兔子', category: 'animals', sentences: ['The rabbit is white.', 'Rabbits like carrots.', 'I have a rabbit.'] },
  { word: 'tiger', phonetic: '/ˈtaɪɡə/', meaning: '老虎', category: 'animals', sentences: ['The tiger is big.', 'Tigers are strong.', 'I like tigers.'] },
  { word: 'lion', phonetic: '/ˈlaɪən/', meaning: '狮子', category: 'animals', sentences: ['The lion is the king.', 'Lions are brave.', 'I see a lion.'] },
  { word: 'elephant', phonetic: '/ˈelɪfənt/', meaning: '大象', category: 'animals', sentences: ['The elephant is big.', 'Elephants have long noses.', 'I like elephants.'] },
  { word: 'monkey', phonetic: '/ˈmʌŋki/', meaning: '猴子', category: 'animals', sentences: ['The monkey is funny.', 'Monkeys like bananas.', 'Look at the monkey!'] },
  { word: 'bear', phonetic: '/beə/', meaning: '熊', category: 'animals', sentences: ['The bear is brown.', 'Bears like honey.', 'I see a bear.'] },
  { word: 'panda', phonetic: '/ˈpændə/', meaning: '熊猫', category: 'animals', sentences: ['The panda is cute.', 'Pandas eat bamboo.', 'I love pandas.'] },
  { word: 'cow', phonetic: '/kaʊ/', meaning: '奶牛', category: 'animals', sentences: ['The cow says moo.', 'Cows give us milk.', 'I see a cow.'] },
  { word: 'sheep', phonetic: '/ʃiːp/', meaning: '绵羊', category: 'animals', sentences: ['The sheep is white.', 'Sheep give us wool.', 'I like sheep.'] },
  { word: 'horse', phonetic: '/hɔːs/', meaning: '马', category: 'animals', sentences: ['The horse can run.', 'Horses are fast.', 'I like horses.'] },
  { word: 'chicken', phonetic: '/ˈtʃɪkɪn/', meaning: '鸡', category: 'animals', sentences: ['The chicken is yellow.', 'Chickens lay eggs.', 'I see a chicken.'] },
  { word: 'frog', phonetic: '/frɒɡ/', meaning: '青蛙', category: 'animals', sentences: ['The frog can jump.', 'Frogs are green.', 'I hear a frog.'] },
  { word: 'snake', phonetic: '/sneɪk/', meaning: '蛇', category: 'animals', sentences: ['The snake is long.', 'Snakes can crawl.', 'I see a snake.'] },
  { word: 'bee', phonetic: '/biː/', meaning: '蜜蜂', category: 'animals', sentences: ['The bee makes honey.', 'Bees are busy.', 'I see a bee.'] },
  { word: 'butterfly', phonetic: '/ˈbʌtəflaɪ/', meaning: '蝴蝶', category: 'animals', sentences: ['The butterfly is pretty.', 'Butterflies can fly.', 'I like butterflies.'] },
  
  // ===== 颜色 Colors =====
  { word: 'red', phonetic: '/red/', meaning: '红色', category: 'colors', sentences: ['I like red.', 'The apple is red.', 'Red is my favorite color.'] },
  { word: 'blue', phonetic: '/bluː/', meaning: '蓝色', category: 'colors', sentences: ['The sky is blue.', 'I have a blue pen.', 'Blue is pretty.'] },
  { word: 'green', phonetic: '/ɡriːn/', meaning: '绿色', category: 'colors', sentences: ['Grass is green.', 'I like green.', 'The tree is green.'] },
  { word: 'yellow', phonetic: '/ˈjeləʊ/', meaning: '黄色', category: 'colors', sentences: ['The sun is yellow.', 'I see yellow.', 'Bananas are yellow.'] },
  { word: 'pink', phonetic: '/pɪŋk/', meaning: '粉色', category: 'colors', sentences: ['I like pink.', 'The flower is pink.', 'Pink is beautiful.'] },
  { word: 'orange', phonetic: '/ˈɒrɪndʒ/', meaning: '橙色', category: 'colors', sentences: ['Orange is nice.', 'I like orange.', 'The orange is orange.'] },
  { word: 'black', phonetic: '/blæk/', meaning: '黑色', category: 'colors', sentences: ['My hair is black.', 'The cat is black.', 'I see black.'] },
  { word: 'white', phonetic: '/waɪt/', meaning: '白色', category: 'colors', sentences: ['Snow is white.', 'I have a white rabbit.', 'The cloud is white.'] },
  { word: 'brown', phonetic: '/braʊn/', meaning: '棕色', category: 'colors', sentences: ['The bear is brown.', 'I see brown.', 'The tree is brown.'] },
  { word: 'purple', phonetic: '/ˈpɜːpl/', meaning: '紫色', category: 'colors', sentences: ['I like purple.', 'The grape is purple.', 'Purple is pretty.'] },
  { word: 'gray', phonetic: '/ɡreɪ/', meaning: '灰色', category: 'colors', sentences: ['The elephant is gray.', 'I see gray.', 'The sky is gray today.'] },
  
  // ===== 数字 Numbers =====
  { word: 'one', phonetic: '/wʌn/', meaning: '一', category: 'numbers', sentences: ['I have one apple.', 'One plus one is two.', 'There is one cat.'] },
  { word: 'two', phonetic: '/tuː/', meaning: '二', category: 'numbers', sentences: ['I have two hands.', 'Two cats are here.', 'One and one is two.'] },
  { word: 'three', phonetic: '/θriː/', meaning: '三', category: 'numbers', sentences: ['I have three books.', 'Three birds fly.', 'Count to three.'] },
  { word: 'four', phonetic: '/fɔː/', meaning: '四', category: 'numbers', sentences: ['I have four books.', 'A dog has four legs.', 'There are four seasons.'] },
  { word: 'five', phonetic: '/faɪv/', meaning: '五', category: 'numbers', sentences: ['I have five fingers.', 'Five plus five is ten.', 'I am five years old.'] },
  { word: 'six', phonetic: '/sɪks/', meaning: '六', category: 'numbers', sentences: ['I am six years old.', 'Six is my number.', 'There are six eggs.'] },
  { word: 'seven', phonetic: '/ˈsevən/', meaning: '七', category: 'numbers', sentences: ['Seven days a week.', 'I like seven.', 'Count to seven.'] },
  { word: 'eight', phonetic: '/eɪt/', meaning: '八', category: 'numbers', sentences: ['I have eight crayons.', 'Eight is great.', 'There are eight apples.'] },
  { word: 'nine', phonetic: '/naɪn/', meaning: '九', category: 'numbers', sentences: ['Nine cats sleep.', 'I like nine.', 'Nine is big.'] },
  { word: 'ten', phonetic: '/ten/', meaning: '十', category: 'numbers', sentences: ['I have ten toys.', 'Ten is a big number.', 'Count to ten.'] },
  { word: 'zero', phonetic: '/ˈzɪərəʊ/', meaning: '零', category: 'numbers', sentences: ['Zero is nothing.', 'I have zero cookies.', 'Start from zero.'] },
  
  // ===== 家人 Family =====
  { word: 'mom', phonetic: '/mɒm/', meaning: '妈妈', category: 'family', sentences: ['I love my mom.', 'Mom is kind.', 'My mom cooks dinner.'] },
  { word: 'dad', phonetic: '/dæd/', meaning: '爸爸', category: 'family', sentences: ['I love my dad.', 'Dad is tall.', 'My dad plays with me.'] },
  { word: 'brother', phonetic: '/ˈbrʌðə/', meaning: '兄弟', category: 'family', sentences: ['He is my brother.', 'My brother is fun.', 'I play with my brother.'] },
  { word: 'sister', phonetic: '/ˈsɪstə/', meaning: '姐妹', category: 'family', sentences: ['She is my sister.', 'My sister is nice.', 'I love my sister.'] },
  { word: 'grandma', phonetic: '/ˈɡrænmɑː/', meaning: '奶奶/外婆', category: 'family', sentences: ['I love grandma.', 'Grandma makes cookies.', 'Grandma tells stories.'] },
  { word: 'grandpa', phonetic: '/ˈɡrænpɑː/', meaning: '爷爷/外公', category: 'family', sentences: ['I love grandpa.', 'Grandpa tells stories.', 'Grandpa is wise.'] },
  { word: 'baby', phonetic: '/ˈbeɪbi/', meaning: '宝宝', category: 'family', sentences: ['The baby is cute.', 'The baby is sleeping.', 'I have a baby sister.'] },
  { word: 'uncle', phonetic: '/ˈʌŋkl/', meaning: '叔叔/舅舅', category: 'family', sentences: ['My uncle is funny.', 'Uncle plays games with me.', 'I visit my uncle.'] },
  { word: 'aunt', phonetic: '/ɑːnt/', meaning: '阿姨/姑姑', category: 'family', sentences: ['My aunt is kind.', 'Aunt gives me gifts.', 'I love my aunt.'] },
  
  // ===== 身体 Body =====
  { word: 'head', phonetic: '/hed/', meaning: '头', category: 'body', sentences: ['Touch your head.', 'My head is big.', 'I nod my head.'] },
  { word: 'eye', phonetic: '/aɪ/', meaning: '眼睛', category: 'body', sentences: ['I have two eyes.', 'My eyes are black.', 'I see with my eyes.'] },
  { word: 'ear', phonetic: '/ɪə/', meaning: '耳朵', category: 'body', sentences: ['I have two ears.', 'I hear with my ears.', 'Touch your ears.'] },
  { word: 'nose', phonetic: '/nəʊz/', meaning: '鼻子', category: 'body', sentences: ['Touch your nose.', 'I smell with my nose.', 'My nose is small.'] },
  { word: 'mouth', phonetic: '/maʊθ/', meaning: '嘴巴', category: 'body', sentences: ['Open your mouth.', 'I eat with my mouth.', 'Close your mouth.'] },
  { word: 'hand', phonetic: '/hænd/', meaning: '手', category: 'body', sentences: ['Raise your hand.', 'I have two hands.', 'Clap your hands.'] },
  { word: 'foot', phonetic: '/fʊt/', meaning: '脚', category: 'body', sentences: ['I have two feet.', 'I kick with my foot.', 'Stomp your feet.'] },
  { word: 'arm', phonetic: '/ɑːm/', meaning: '手臂', category: 'body', sentences: ['Raise your arms.', 'I have two arms.', 'My arms are strong.'] },
  { word: 'leg', phonetic: '/leɡ/', meaning: '腿', category: 'body', sentences: ['I have two legs.', 'My legs are long.', 'I run with my legs.'] },
  { word: 'finger', phonetic: '/ˈfɪŋɡə/', meaning: '手指', category: 'body', sentences: ['I have ten fingers.', 'Point with your finger.', 'Count your fingers.'] },
  { word: 'hair', phonetic: '/heə/', meaning: '头发', category: 'body', sentences: ['My hair is black.', 'I brush my hair.', 'She has long hair.'] },
  { word: 'face', phonetic: '/feɪs/', meaning: '脸', category: 'body', sentences: ['Wash your face.', 'I have a round face.', 'Your face is pretty.'] },
  
  // ===== 食物 Food =====
  { word: 'rice', phonetic: '/raɪs/', meaning: '米饭', category: 'food', sentences: ['I eat rice.', 'Rice is yummy.', 'I like rice.'] },
  { word: 'bread', phonetic: '/bred/', meaning: '面包', category: 'food', sentences: ['I like bread.', 'Bread is soft.', 'I eat bread for breakfast.'] },
  { word: 'egg', phonetic: '/eɡ/', meaning: '鸡蛋', category: 'food', sentences: ['I eat an egg.', 'Eggs are good.', 'I like eggs.'] },
  { word: 'milk', phonetic: '/mɪlk/', meaning: '牛奶', category: 'food', sentences: ['I drink milk.', 'Milk is white.', 'Milk is healthy.'] },
  { word: 'water', phonetic: '/ˈwɔːtə/', meaning: '水', category: 'food', sentences: ['I drink water.', 'Water is good.', 'I need water.'] },
  { word: 'cake', phonetic: '/keɪk/', meaning: '蛋糕', category: 'food', sentences: ['I like cake.', 'Birthday cake is sweet.', 'The cake is yummy.'] },
  { word: 'ice cream', phonetic: '/aɪs kriːm/', meaning: '冰淇淋', category: 'food', sentences: ['I love ice cream.', 'Ice cream is cold.', 'Can I have ice cream?'] },
  { word: 'noodles', phonetic: '/ˈnuːdlz/', meaning: '面条', category: 'food', sentences: ['I like noodles.', 'Noodles are long.', 'I eat noodles.'] },
  { word: 'soup', phonetic: '/suːp/', meaning: '汤', category: 'food', sentences: ['I drink soup.', 'The soup is hot.', 'I like soup.'] },
  { word: 'chicken', phonetic: '/ˈtʃɪkɪn/', meaning: '鸡肉', category: 'food', sentences: ['I eat chicken.', 'Chicken is yummy.', 'I like chicken.'] },
  { word: 'pizza', phonetic: '/ˈpiːtsə/', meaning: '披萨', category: 'food', sentences: ['I love pizza.', 'Pizza is delicious.', 'Can I have pizza?'] },
  { word: 'hamburger', phonetic: '/ˈhæmbɜːɡə/', meaning: '汉堡', category: 'food', sentences: ['I eat a hamburger.', 'The hamburger is big.', 'I like hamburgers.'] },
  
  // ===== 水果 Fruits =====
  { word: 'apple', phonetic: '/ˈæpl/', meaning: '苹果', category: 'fruits', sentences: ['I eat an apple.', 'The apple is red.', 'Apples are healthy.'] },
  { word: 'banana', phonetic: '/bəˈnɑːnə/', meaning: '香蕉', category: 'fruits', sentences: ['I like bananas.', 'Bananas are yellow.', 'Monkeys like bananas.'] },
  { word: 'orange', phonetic: '/ˈɒrɪndʒ/', meaning: '橙子', category: 'fruits', sentences: ['I eat an orange.', 'Oranges are sweet.', 'The orange is juicy.'] },
  { word: 'grape', phonetic: '/ɡreɪp/', meaning: '葡萄', category: 'fruits', sentences: ['I like grapes.', 'Grapes are small.', 'Grapes are purple.'] },
  { word: 'pear', phonetic: '/peə/', meaning: '梨', category: 'fruits', sentences: ['I eat a pear.', 'The pear is green.', 'Pears are sweet.'] },
  { word: 'watermelon', phonetic: '/ˈwɔːtəmelən/', meaning: '西瓜', category: 'fruits', sentences: ['I like watermelon.', 'Watermelon is big.', 'Watermelon is sweet.'] },
  { word: 'strawberry', phonetic: '/ˈstrɔːbəri/', meaning: '草莓', category: 'fruits', sentences: ['I love strawberries.', 'Strawberries are red.', 'Strawberries are yummy.'] },
  { word: 'mango', phonetic: '/ˈmæŋɡəʊ/', meaning: '芒果', category: 'fruits', sentences: ['I like mangoes.', 'Mangoes are sweet.', 'The mango is yellow.'] },
  { word: 'peach', phonetic: '/piːtʃ/', meaning: '桃子', category: 'fruits', sentences: ['I eat a peach.', 'Peaches are soft.', 'The peach is sweet.'] },
  { word: 'cherry', phonetic: '/ˈtʃeri/', meaning: '樱桃', category: 'fruits', sentences: ['I like cherries.', 'Cherries are small.', 'Cherries are red.'] },
  
  // ===== 蔬菜 Vegetables =====
  { word: 'carrot', phonetic: '/ˈkærət/', meaning: '胡萝卜', category: 'vegetables', sentences: ['Rabbits like carrots.', 'Carrots are orange.', 'I eat carrots.'] },
  { word: 'tomato', phonetic: '/təˈmɑːtəʊ/', meaning: '番茄', category: 'vegetables', sentences: ['The tomato is red.', 'I like tomatoes.', 'Tomatoes are healthy.'] },
  { word: 'potato', phonetic: '/pəˈteɪtəʊ/', meaning: '土豆', category: 'vegetables', sentences: ['I like potatoes.', 'Potatoes are yummy.', 'The potato is brown.'] },
  { word: 'cucumber', phonetic: '/ˈkjuːkʌmbə/', meaning: '黄瓜', category: 'vegetables', sentences: ['I eat cucumber.', 'Cucumbers are green.', 'Cucumbers are crunchy.'] },
  { word: 'corn', phonetic: '/kɔːn/', meaning: '玉米', category: 'vegetables', sentences: ['I like corn.', 'Corn is yellow.', 'Corn is sweet.'] },
  
  // ===== 学校 School =====
  { word: 'book', phonetic: '/bʊk/', meaning: '书', category: 'school', sentences: ['I read a book.', 'This book is good.', 'I have many books.'] },
  { word: 'pen', phonetic: '/pen/', meaning: '钢笔', category: 'school', sentences: ['I have a pen.', 'My pen is blue.', 'I write with a pen.'] },
  { word: 'pencil', phonetic: '/ˈpensl/', meaning: '铅笔', category: 'school', sentences: ['I use a pencil.', 'The pencil is long.', 'I draw with a pencil.'] },
  { word: 'ruler', phonetic: '/ˈruːlə/', meaning: '尺子', category: 'school', sentences: ['I need a ruler.', 'The ruler is straight.', 'I measure with a ruler.'] },
  { word: 'bag', phonetic: '/bæɡ/', meaning: '书包', category: 'school', sentences: ['I have a bag.', 'My bag is big.', 'I carry my bag.'] },
  { word: 'desk', phonetic: '/desk/', meaning: '书桌', category: 'school', sentences: ['I sit at the desk.', 'The desk is clean.', 'My desk is brown.'] },
  { word: 'teacher', phonetic: '/ˈtiːtʃə/', meaning: '老师', category: 'school', sentences: ['I love my teacher.', 'The teacher is nice.', 'Teacher helps me.'] },
  { word: 'student', phonetic: '/ˈstjuːdənt/', meaning: '学生', category: 'school', sentences: ['I am a student.', 'Students study hard.', 'Good student!'] },
  { word: 'classroom', phonetic: '/ˈklɑːsruːm/', meaning: '教室', category: 'school', sentences: ['I am in the classroom.', 'The classroom is big.', 'We study in the classroom.'] },
  { word: 'eraser', phonetic: '/ɪˈreɪzə/', meaning: '橡皮', category: 'school', sentences: ['I need an eraser.', 'The eraser is pink.', 'I use an eraser.'] },
  { word: 'paper', phonetic: '/ˈpeɪpə/', meaning: '纸', category: 'school', sentences: ['I need paper.', 'The paper is white.', 'I write on paper.'] },
  { word: 'crayon', phonetic: '/ˈkreɪən/', meaning: '蜡笔', category: 'school', sentences: ['I have crayons.', 'Crayons are colorful.', 'I draw with crayons.'] },
  
  // ===== 动作 Actions =====
  { word: 'run', phonetic: '/rʌn/', meaning: '跑', category: 'actions', sentences: ['I can run fast.', 'Let us run!', 'Run to the park.'] },
  { word: 'jump', phonetic: '/dʒʌmp/', meaning: '跳', category: 'actions', sentences: ['I can jump high.', 'Jump up!', 'The rabbit can jump.'] },
  { word: 'walk', phonetic: '/wɔːk/', meaning: '走', category: 'actions', sentences: ['I walk to school.', 'Let us walk together.', 'Walk slowly.'] },
  { word: 'sit', phonetic: '/sɪt/', meaning: '坐', category: 'actions', sentences: ['Please sit down.', 'I sit on a chair.', 'Sit here.'] },
  { word: 'stand', phonetic: '/stænd/', meaning: '站', category: 'actions', sentences: ['Please stand up.', 'I can stand still.', 'Stand here.'] },
  { word: 'eat', phonetic: '/iːt/', meaning: '吃', category: 'actions', sentences: ['I eat breakfast.', 'Let us eat together.', 'Time to eat.'] },
  { word: 'drink', phonetic: '/drɪŋk/', meaning: '喝', category: 'actions', sentences: ['I drink water.', 'Drink some milk.', 'I like to drink juice.'] },
  { word: 'sleep', phonetic: '/sliːp/', meaning: '睡觉', category: 'actions', sentences: ['I sleep at night.', 'Time to sleep!', 'The baby is sleeping.'] },
  { word: 'read', phonetic: '/riːd/', meaning: '读', category: 'actions', sentences: ['I read books.', 'Read with me.', 'I like to read.'] },
  { word: 'write', phonetic: '/raɪt/', meaning: '写', category: 'actions', sentences: ['I write my name.', 'Write the word.', 'I can write.'] },
  { word: 'draw', phonetic: '/drɔː/', meaning: '画', category: 'actions', sentences: ['I draw pictures.', 'Draw a cat.', 'I like to draw.'] },
  { word: 'sing', phonetic: '/sɪŋ/', meaning: '唱歌', category: 'actions', sentences: ['I can sing.', 'Sing a song.', 'Birds sing.'] },
  { word: 'dance', phonetic: '/dɑːns/', meaning: '跳舞', category: 'actions', sentences: ['I can dance.', 'Let us dance.', 'Dancing is fun.'] },
  { word: 'play', phonetic: '/pleɪ/', meaning: '玩', category: 'actions', sentences: ['I play games.', 'Let us play!', 'I play with friends.'] },
  { word: 'swim', phonetic: '/swɪm/', meaning: '游泳', category: 'actions', sentences: ['I can swim.', 'Fish can swim.', 'Let us swim.'] },
  { word: 'fly', phonetic: '/flaɪ/', meaning: '飞', category: 'actions', sentences: ['Birds can fly.', 'I want to fly.', 'The plane can fly.'] },
  { word: 'climb', phonetic: '/klaɪm/', meaning: '爬', category: 'actions', sentences: ['I climb the tree.', 'Monkeys climb.', 'Climb up!'] },
  { word: 'open', phonetic: '/ˈəʊpən/', meaning: '打开', category: 'actions', sentences: ['Open the door.', 'Open your book.', 'I open the box.'] },
  { word: 'close', phonetic: '/kləʊz/', meaning: '关闭', category: 'actions', sentences: ['Close the door.', 'Close your eyes.', 'I close the window.'] },
  
  // ===== 问候 Greetings =====
  { word: 'hello', phonetic: '/həˈləʊ/', meaning: '你好', category: 'greetings', sentences: ['Hello, my friend!', 'Hello, teacher!', 'Hello, how are you?'] },
  { word: 'goodbye', phonetic: '/ɡʊdˈbaɪ/', meaning: '再见', category: 'greetings', sentences: ['Goodbye, mom!', 'Say goodbye.', 'Goodbye, see you!'] },
  { word: 'thanks', phonetic: '/θæŋks/', meaning: '谢谢', category: 'greetings', sentences: ['Thanks a lot!', 'Thanks for helping.', 'Thanks, friend!'] },
  { word: 'sorry', phonetic: '/ˈsɒri/', meaning: '对不起', category: 'greetings', sentences: ['I am sorry.', 'Sorry for that.', 'Say sorry.'] },
  { word: 'please', phonetic: '/pliːz/', meaning: '请', category: 'greetings', sentences: ['Please help me.', 'Yes, please!', 'Please sit down.'] },
  { word: 'yes', phonetic: '/jes/', meaning: '是', category: 'greetings', sentences: ['Yes, I can.', 'Yes, please.', 'Yes, it is.'] },
  { word: 'no', phonetic: '/nəʊ/', meaning: '不', category: 'greetings', sentences: ['No, thanks.', 'No, I cannot.', 'No problem.'] },
  { word: 'welcome', phonetic: '/ˈwelkəm/', meaning: '欢迎', category: 'greetings', sentences: ['You are welcome.', 'Welcome home!', 'Welcome to school.'] },
  
  // ===== 自然 Nature =====
  { word: 'sun', phonetic: '/sʌn/', meaning: '太阳', category: 'nature', sentences: ['The sun is hot.', 'I see the sun.', 'The sun is bright.'] },
  { word: 'moon', phonetic: '/muːn/', meaning: '月亮', category: 'nature', sentences: ['The moon is round.', 'I see the moon.', 'The moon is pretty.'] },
  { word: 'star', phonetic: '/stɑː/', meaning: '星星', category: 'nature', sentences: ['I see many stars.', 'Stars are bright.', 'I like stars.'] },
  { word: 'tree', phonetic: '/triː/', meaning: '树', category: 'nature', sentences: ['The tree is tall.', 'I like trees.', 'Birds live in trees.'] },
  { word: 'flower', phonetic: '/ˈflaʊə/', meaning: '花', category: 'nature', sentences: ['The flower is pretty.', 'I like flowers.', 'Flowers smell nice.'] },
  { word: 'grass', phonetic: '/ɡrɑːs/', meaning: '草', category: 'nature', sentences: ['Grass is green.', 'I sit on the grass.', 'Cows eat grass.'] },
  { word: 'rain', phonetic: '/reɪn/', meaning: '雨', category: 'nature', sentences: ['It is raining.', 'I hear the rain.', 'Rain is wet.'] },
  { word: 'cloud', phonetic: '/klaʊd/', meaning: '云', category: 'nature', sentences: ['I see clouds.', 'The cloud is white.', 'Clouds are soft.'] },
  { word: 'wind', phonetic: '/wɪnd/', meaning: '风', category: 'nature', sentences: ['The wind is strong.', 'I feel the wind.', 'Wind blows.'] },
  { word: 'snow', phonetic: '/snəʊ/', meaning: '雪', category: 'nature', sentences: ['Snow is white.', 'I like snow.', 'It is snowing.'] },
  { word: 'river', phonetic: '/ˈrɪvə/', meaning: '河', category: 'nature', sentences: ['The river is long.', 'Fish live in the river.', 'I see a river.'] },
  { word: 'mountain', phonetic: '/ˈmaʊntɪn/', meaning: '山', category: 'nature', sentences: ['The mountain is high.', 'I climb the mountain.', 'I see a mountain.'] },
  { word: 'sea', phonetic: '/siː/', meaning: '海', category: 'nature', sentences: ['The sea is big.', 'I like the sea.', 'Fish live in the sea.'] },
  
  // ===== 衣物 Clothes =====
  { word: 'shirt', phonetic: '/ʃɜːt/', meaning: '衬衫', category: 'clothes', sentences: ['I wear a shirt.', 'My shirt is blue.', 'The shirt is clean.'] },
  { word: 'pants', phonetic: '/pænts/', meaning: '裤子', category: 'clothes', sentences: ['I wear pants.', 'My pants are new.', 'The pants are long.'] },
  { word: 'dress', phonetic: '/dres/', meaning: '连衣裙', category: 'clothes', sentences: ['I like this dress.', 'The dress is pretty.', 'She wears a dress.'] },
  { word: 'shoes', phonetic: '/ʃuːz/', meaning: '鞋子', category: 'clothes', sentences: ['I put on my shoes.', 'My shoes are red.', 'I like my shoes.'] },
  { word: 'hat', phonetic: '/hæt/', meaning: '帽子', category: 'clothes', sentences: ['I wear a hat.', 'The hat is cool.', 'My hat is yellow.'] },
  { word: 'coat', phonetic: '/kəʊt/', meaning: '外套', category: 'clothes', sentences: ['I wear a coat.', 'My coat is warm.', 'The coat is big.'] },
  { word: 'socks', phonetic: '/sɒks/', meaning: '袜子', category: 'clothes', sentences: ['I wear socks.', 'My socks are white.', 'Where are my socks?'] },
  { word: 'jacket', phonetic: '/ˈdʒækɪt/', meaning: '夹克', category: 'clothes', sentences: ['I wear a jacket.', 'The jacket is nice.', 'My jacket is blue.'] },
  { word: 'sweater', phonetic: '/ˈswetə/', meaning: '毛衣', category: 'clothes', sentences: ['I wear a sweater.', 'The sweater is warm.', 'My sweater is soft.'] },
  { word: 'skirt', phonetic: '/skɜːt/', meaning: '裙子', category: 'clothes', sentences: ['She wears a skirt.', 'The skirt is short.', 'I like the skirt.'] },
  
  // ===== 玩具 Toys =====
  { word: 'ball', phonetic: '/bɔːl/', meaning: '球', category: 'toys', sentences: ['I play with a ball.', 'The ball is round.', 'Kick the ball!'] },
  { word: 'doll', phonetic: '/dɒl/', meaning: '娃娃', category: 'toys', sentences: ['I have a doll.', 'The doll is pretty.', 'I love my doll.'] },
  { word: 'toy', phonetic: '/tɔɪ/', meaning: '玩具', category: 'toys', sentences: ['I have many toys.', 'This is my toy.', 'I like toys.'] },
  { word: 'car', phonetic: '/kɑː/', meaning: '小汽车', category: 'toys', sentences: ['I have a toy car.', 'The car is fast.', 'I play with cars.'] },
  { word: 'kite', phonetic: '/kaɪt/', meaning: '风筝', category: 'toys', sentences: ['I fly a kite.', 'The kite is high.', 'I like kites.'] },
  { word: 'robot', phonetic: '/ˈrəʊbɒt/', meaning: '机器人', category: 'toys', sentences: ['I have a robot.', 'The robot is cool.', 'I like robots.'] },
  { word: 'puzzle', phonetic: '/ˈpʌzl/', meaning: '拼图', category: 'toys', sentences: ['I do a puzzle.', 'The puzzle is fun.', 'I like puzzles.'] },
  
  // ===== 交通 Transport =====
  { word: 'car', phonetic: '/kɑː/', meaning: '汽车', category: 'transport', sentences: ['I see a car.', 'The car is fast.', 'Dad drives a car.'] },
  { word: 'bus', phonetic: '/bʌs/', meaning: '公交车', category: 'transport', sentences: ['I take the bus.', 'The bus is big.', 'Wait for the bus.'] },
  { word: 'train', phonetic: '/treɪn/', meaning: '火车', category: 'transport', sentences: ['I ride the train.', 'The train is fast.', 'I like trains.'] },
  { word: 'plane', phonetic: '/pleɪn/', meaning: '飞机', category: 'transport', sentences: ['The plane can fly.', 'I see a plane.', 'I like planes.'] },
  { word: 'bike', phonetic: '/baɪk/', meaning: '自行车', category: 'transport', sentences: ['I ride a bike.', 'My bike is blue.', 'I like my bike.'] },
  { word: 'boat', phonetic: '/bəʊt/', meaning: '船', category: 'transport', sentences: ['The boat is on water.', 'I see a boat.', 'I like boats.'] },
  { word: 'ship', phonetic: '/ʃɪp/', meaning: '轮船', category: 'transport', sentences: ['The ship is big.', 'Ships sail on the sea.', 'I see a ship.'] },
  
  // ===== 时间 Time =====
  { word: 'morning', phonetic: '/ˈmɔːnɪŋ/', meaning: '早上', category: 'time', sentences: ['Good morning!', 'I eat breakfast in the morning.', 'The morning is nice.'] },
  { word: 'afternoon', phonetic: '/ˌɑːftəˈnuːn/', meaning: '下午', category: 'time', sentences: ['Good afternoon!', 'I play in the afternoon.', 'The afternoon is warm.'] },
  { word: 'evening', phonetic: '/ˈiːvnɪŋ/', meaning: '晚上', category: 'time', sentences: ['Good evening!', 'I rest in the evening.', 'The evening is cool.'] },
  { word: 'night', phonetic: '/naɪt/', meaning: '夜晚', category: 'time', sentences: ['Good night!', 'I sleep at night.', 'Stars come out at night.'] },
  { word: 'today', phonetic: '/təˈdeɪ/', meaning: '今天', category: 'time', sentences: ['Today is Monday.', 'I am happy today.', 'What day is today?'] },
  { word: 'tomorrow', phonetic: '/təˈmɒrəʊ/', meaning: '明天', category: 'time', sentences: ['See you tomorrow!', 'Tomorrow is Tuesday.', 'I will go tomorrow.'] },
  { word: 'yesterday', phonetic: '/ˈjestədeɪ/', meaning: '昨天', category: 'time', sentences: ['Yesterday was fun.', 'I went to school yesterday.', 'What did you do yesterday?'] },
  
  // ===== 天气 Weather =====
  { word: 'sunny', phonetic: '/ˈsʌni/', meaning: '晴朗的', category: 'weather', sentences: ['It is sunny today.', 'A sunny day!', 'I like sunny days.'] },
  { word: 'cloudy', phonetic: '/ˈklaʊdi/', meaning: '多云的', category: 'weather', sentences: ['It is cloudy today.', 'A cloudy day.', 'The sky is cloudy.'] },
  { word: 'rainy', phonetic: '/ˈreɪni/', meaning: '下雨的', category: 'weather', sentences: ['It is rainy today.', 'A rainy day.', 'Bring an umbrella on rainy days.'] },
  { word: 'windy', phonetic: '/ˈwɪndi/', meaning: '有风的', category: 'weather', sentences: ['It is windy today.', 'A windy day.', 'The wind is strong.'] },
  { word: 'snowy', phonetic: '/ˈsnəʊi/', meaning: '下雪的', category: 'weather', sentences: ['It is snowy today.', 'A snowy day.', 'I like snowy days.'] },
  { word: 'hot', phonetic: '/hɒt/', meaning: '热的', category: 'weather', sentences: ['It is hot today.', 'The weather is hot.', 'I feel hot.'] },
  { word: 'cold', phonetic: '/kəʊld/', meaning: '冷的', category: 'weather', sentences: ['It is cold today.', 'The weather is cold.', 'I feel cold.'] },
  { word: 'warm', phonetic: '/wɔːm/', meaning: '温暖的', category: 'weather', sentences: ['It is warm today.', 'The weather is warm.', 'I feel warm.'] },
  { word: 'cool', phonetic: '/kuːl/', meaning: '凉爽的', category: 'weather', sentences: ['It is cool today.', 'The weather is cool.', 'I feel cool.'] },
  
  // ===== 地点 Places =====
  { word: 'home', phonetic: '/həʊm/', meaning: '家', category: 'places', sentences: ['I go home.', 'I love my home.', 'Home is warm.'] },
  { word: 'school', phonetic: '/skuːl/', meaning: '学校', category: 'places', sentences: ['I go to school.', 'I like school.', 'School is fun.'] },
  { word: 'park', phonetic: '/pɑːk/', meaning: '公园', category: 'places', sentences: ['I go to the park.', 'The park is big.', 'I play in the park.'] },
  { word: 'zoo', phonetic: '/zuː/', meaning: '动物园', category: 'places', sentences: ['I go to the zoo.', 'The zoo has animals.', 'I like the zoo.'] },
  { word: 'hospital', phonetic: '/ˈhɒspɪtl/', meaning: '医院', category: 'places', sentences: ['I go to the hospital.', 'Doctors work in the hospital.', 'The hospital helps people.'] },
  { word: 'library', phonetic: '/ˈlaɪbrəri/', meaning: '图书馆', category: 'places', sentences: ['I go to the library.', 'The library has books.', 'I read in the library.'] },
  { word: 'supermarket', phonetic: '/ˈsuːpəmɑːkɪt/', meaning: '超市', category: 'places', sentences: ['I go to the supermarket.', 'We buy food at the supermarket.', 'The supermarket is big.'] },
  { word: 'restaurant', phonetic: '/ˈrestrɒnt/', meaning: '餐厅', category: 'places', sentences: ['I eat at the restaurant.', 'The restaurant has good food.', 'I like this restaurant.'] },
]

export function getWordsByCategory(category: WordCategory): EnglishWord[] {
  return englishWords.filter(w => w.category === category)
}

export function getRandomWords(count: number, category?: WordCategory): EnglishWord[] {
  const words = category ? getWordsByCategory(category) : englishWords
  const shuffled = [...words].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export function getAllCategories(): WordCategory[] {
  return Object.keys(categoryLabels) as WordCategory[]
}
