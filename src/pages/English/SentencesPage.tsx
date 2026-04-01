import { useState } from 'react'
import { 
  Card, 
  Title, 
  Text, 
  Stack, 
  Group,
  Box,
  ActionIcon,
  Tabs,
  ScrollArea,
} from '@mantine/core'
import { useEnglishAudio } from '../../hooks/useEnglishAudio'
import { IconPlay } from '../../components/Icons'

interface SentencePattern {
  pattern: string
  meaning: string
  examples: { en: string; cn: string }[]
}

const sentencePatterns: { category: string; emoji: string; patterns: SentencePattern[] }[] = [
  {
    category: '问候语',
    emoji: '👋',
    patterns: [
      {
        pattern: 'Hello! / Hi!',
        meaning: '你好！',
        examples: [
          { en: 'Hello, how are you?', cn: '你好，你好吗？' },
          { en: 'Hi, my name is Tom.', cn: '你好，我叫汤姆。' },
          { en: 'Hello, nice to meet you.', cn: '你好，很高兴认识你。' },
        ],
      },
      {
        pattern: 'Good morning / afternoon / evening',
        meaning: '早上好 / 下午好 / 晚上好',
        examples: [
          { en: 'Good morning, teacher!', cn: '老师早上好！' },
          { en: 'Good afternoon, mom.', cn: '妈妈下午好。' },
          { en: 'Good evening, dad.', cn: '爸爸晚上好。' },
        ],
      },
      {
        pattern: 'Good night!',
        meaning: '晚安！',
        examples: [
          { en: 'Good night, mom and dad!', cn: '爸爸妈妈晚安！' },
          { en: 'Good night, sweet dreams!', cn: '晚安，做个好梦！' },
        ],
      },
      {
        pattern: 'Goodbye! / Bye-bye!',
        meaning: '再见！',
        examples: [
          { en: 'Goodbye, see you tomorrow!', cn: '再见，明天见！' },
          { en: 'Bye-bye, have a good day!', cn: '再见，祝你愉快！' },
          { en: 'See you later!', cn: '待会见！' },
        ],
      },
      {
        pattern: 'How are you?',
        meaning: '你好吗？',
        examples: [
          { en: 'How are you today?', cn: '你今天好吗？' },
          { en: "I'm fine, thank you.", cn: '我很好，谢谢。' },
          { en: "I'm great, thanks!", cn: '我很棒，谢谢！' },
        ],
      },
      {
        pattern: 'Nice to meet you!',
        meaning: '很高兴认识你！',
        examples: [
          { en: 'Nice to meet you too!', cn: '我也很高兴认识你！' },
          { en: "Hi, I'm Lucy. Nice to meet you!", cn: '嗨，我是露西。很高兴认识你！' },
        ],
      },
    ],
  },
  {
    category: '自我介绍',
    emoji: '🙋',
    patterns: [
      {
        pattern: 'My name is...',
        meaning: '我的名字是...',
        examples: [
          { en: 'My name is Lucy.', cn: '我的名字是露西。' },
          { en: 'My name is Mike. What is your name?', cn: '我的名字是迈克。你叫什么名字？' },
        ],
      },
      {
        pattern: 'I am ... years old.',
        meaning: '我...岁了。',
        examples: [
          { en: 'I am six years old.', cn: '我六岁了。' },
          { en: 'I am seven years old.', cn: '我七岁了。' },
          { en: 'How old are you? I am five.', cn: '你几岁了？我五岁。' },
        ],
      },
      {
        pattern: 'I am a boy / girl.',
        meaning: '我是男孩/女孩。',
        examples: [
          { en: 'I am a boy.', cn: '我是男孩。' },
          { en: 'I am a girl. I like pink.', cn: '我是女孩。我喜欢粉色。' },
        ],
      },
      {
        pattern: 'I am from...',
        meaning: '我来自...',
        examples: [
          { en: 'I am from China.', cn: '我来自中国。' },
          { en: 'I am from Beijing.', cn: '我来自北京。' },
        ],
      },
      {
        pattern: 'I like...',
        meaning: '我喜欢...',
        examples: [
          { en: 'I like apples.', cn: '我喜欢苹果。' },
          { en: 'I like playing games.', cn: '我喜欢玩游戏。' },
          { en: 'I like cats and dogs.', cn: '我喜欢猫和狗。' },
        ],
      },
      {
        pattern: 'I can...',
        meaning: '我会...',
        examples: [
          { en: 'I can run fast.', cn: '我能跑得很快。' },
          { en: 'I can sing songs.', cn: '我会唱歌。' },
          { en: 'I can swim.', cn: '我会游泳。' },
        ],
      },
      {
        pattern: 'My favorite... is...',
        meaning: '我最喜欢的...是...',
        examples: [
          { en: 'My favorite color is blue.', cn: '我最喜欢的颜色是蓝色。' },
          { en: 'My favorite animal is panda.', cn: '我最喜欢的动物是熊猫。' },
          { en: 'My favorite food is pizza.', cn: '我最喜欢的食物是披萨。' },
        ],
      },
    ],
  },
  {
    category: '礼貌用语',
    emoji: '🙏',
    patterns: [
      {
        pattern: 'Thank you! / Thanks!',
        meaning: '谢谢！',
        examples: [
          { en: 'Thank you very much!', cn: '非常感谢！' },
          { en: 'Thanks for your help.', cn: '谢谢你的帮助。' },
          { en: 'Thank you, teacher.', cn: '谢谢老师。' },
        ],
      },
      {
        pattern: "You're welcome.",
        meaning: '不客气。',
        examples: [
          { en: "You're welcome!", cn: '不客气！' },
          { en: "That's OK. / No problem.", cn: '没关系。' },
        ],
      },
      {
        pattern: "I'm sorry. / Sorry.",
        meaning: '对不起。',
        examples: [
          { en: "I'm sorry for being late.", cn: '抱歉我迟到了。' },
          { en: "Sorry, I don't know.", cn: '对不起，我不知道。' },
          { en: "Sorry, can you say that again?", cn: '对不起，你能再说一遍吗？' },
        ],
      },
      {
        pattern: "That's OK. / It's OK.",
        meaning: '没关系。',
        examples: [
          { en: "That's OK, don't worry.", cn: '没关系，别担心。' },
          { en: "It's OK, I can do it.", cn: '没关系，我能做。' },
        ],
      },
      {
        pattern: 'Please...',
        meaning: '请...',
        examples: [
          { en: 'Please sit down.', cn: '请坐下。' },
          { en: 'Please help me.', cn: '请帮帮我。' },
          { en: 'Please be quiet.', cn: '请安静。' },
        ],
      },
      {
        pattern: 'Excuse me.',
        meaning: '打扰一下。/对不起。',
        examples: [
          { en: 'Excuse me, where is the bathroom?', cn: '打扰一下，卫生间在哪里？' },
          { en: 'Excuse me, can I pass?', cn: '打扰一下，我可以过去吗？' },
        ],
      },
    ],
  },
  {
    category: '描述事物',
    emoji: '📝',
    patterns: [
      {
        pattern: 'This is... / That is...',
        meaning: '这是.../那是...',
        examples: [
          { en: 'This is my book.', cn: '这是我的书。' },
          { en: 'That is a bird.', cn: '那是一只鸟。' },
          { en: 'This is my friend, Tom.', cn: '这是我的朋友，汤姆。' },
        ],
      },
      {
        pattern: 'It is... (颜色/大小)',
        meaning: '它是...的',
        examples: [
          { en: 'It is red.', cn: '它是红色的。' },
          { en: 'It is big.', cn: '它很大。' },
          { en: 'It is small and cute.', cn: '它又小又可爱。' },
        ],
      },
      {
        pattern: 'I have...',
        meaning: '我有...',
        examples: [
          { en: 'I have a dog.', cn: '我有一只狗。' },
          { en: 'I have two hands.', cn: '我有两只手。' },
          { en: 'I have a red bag.', cn: '我有一个红色的书包。' },
        ],
      },
      {
        pattern: 'There is... / There are...',
        meaning: '这里有.../有...',
        examples: [
          { en: 'There is a book on the desk.', cn: '桌子上有一本书。' },
          { en: 'There are three apples.', cn: '这里有三个苹果。' },
          { en: 'There is a cat under the table.', cn: '桌子下面有一只猫。' },
        ],
      },
      {
        pattern: '...is/are + 形容词',
        meaning: '...是...的',
        examples: [
          { en: 'The apple is red.', cn: '苹果是红色的。' },
          { en: 'My shoes are new.', cn: '我的鞋子是新的。' },
          { en: 'The flowers are beautiful.', cn: '花儿很漂亮。' },
        ],
      },
    ],
  },
  {
    category: '提问',
    emoji: '❓',
    patterns: [
      {
        pattern: 'What is this/that?',
        meaning: '这/那是什么？',
        examples: [
          { en: 'What is this? - It is a pen.', cn: '这是什么？- 这是一支笔。' },
          { en: 'What is that? - That is a bird.', cn: '那是什么？- 那是一只鸟。' },
        ],
      },
      {
        pattern: 'What color is it?',
        meaning: '它是什么颜色？',
        examples: [
          { en: 'What color is the apple? - It is red.', cn: '苹果是什么颜色？- 它是红色的。' },
          { en: 'What color is your bag? - It is blue.', cn: '你的书包是什么颜色？- 它是蓝色的。' },
        ],
      },
      {
        pattern: 'Where is...?',
        meaning: '...在哪里？',
        examples: [
          { en: 'Where is my bag?', cn: '我的书包在哪里？' },
          { en: 'Where is the cat? - It is under the bed.', cn: '猫在哪里？- 它在床下面。' },
        ],
      },
      {
        pattern: 'How many...?',
        meaning: '多少...？',
        examples: [
          { en: 'How many apples do you have?', cn: '你有多少个苹果？' },
          { en: 'How many books are there?', cn: '有多少本书？' },
        ],
      },
      {
        pattern: 'Who is...?',
        meaning: '谁是...？',
        examples: [
          { en: 'Who is he? - He is my brother.', cn: '他是谁？- 他是我的弟弟。' },
          { en: 'Who is your teacher?', cn: '谁是你的老师？' },
        ],
      },
      {
        pattern: 'Do you like...?',
        meaning: '你喜欢...吗？',
        examples: [
          { en: 'Do you like bananas? - Yes, I do.', cn: '你喜欢香蕉吗？- 是的，我喜欢。' },
          { en: 'Do you like cats? - No, I like dogs.', cn: '你喜欢猫吗？- 不，我喜欢狗。' },
        ],
      },
      {
        pattern: 'Can you...?',
        meaning: '你会...吗？',
        examples: [
          { en: 'Can you swim? - Yes, I can.', cn: '你会游泳吗？- 是的，我会。' },
          { en: 'Can you sing? - No, I cannot.', cn: '你会唱歌吗？- 不，我不会。' },
        ],
      },
      {
        pattern: 'Is this/that...?',
        meaning: '这/那是...吗？',
        examples: [
          { en: 'Is this your book? - Yes, it is.', cn: '这是你的书吗？- 是的。' },
          { en: 'Is that a dog? - No, it is a cat.', cn: '那是狗吗？- 不，是猫。' },
        ],
      },
    ],
  },
  {
    category: '日常活动',
    emoji: '🏃',
    patterns: [
      {
        pattern: "Let's...",
        meaning: '让我们...',
        examples: [
          { en: "Let's play together!", cn: '让我们一起玩！' },
          { en: "Let's go to school.", cn: '让我们去上学。' },
          { en: "Let's read a book.", cn: '让我们读书吧。' },
        ],
      },
      {
        pattern: 'I want...',
        meaning: '我想要...',
        examples: [
          { en: 'I want an apple.', cn: '我想要一个苹果。' },
          { en: 'I want to play.', cn: '我想玩。' },
          { en: 'I want some water.', cn: '我想要些水。' },
        ],
      },
      {
        pattern: "It's time to...",
        meaning: '该...的时间了',
        examples: [
          { en: "It's time to eat.", cn: '该吃饭了。' },
          { en: "It's time to sleep.", cn: '该睡觉了。' },
          { en: "It's time to go to school.", cn: '该上学了。' },
        ],
      },
      {
        pattern: 'Can I...?',
        meaning: '我可以...吗？',
        examples: [
          { en: 'Can I have some water?', cn: '我可以喝点水吗？' },
          { en: 'Can I play outside?', cn: '我可以出去玩吗？' },
          { en: 'Can I go to the bathroom?', cn: '我可以去卫生间吗？' },
        ],
      },
      {
        pattern: 'I am... (动词ing)',
        meaning: '我正在...',
        examples: [
          { en: 'I am reading a book.', cn: '我正在读书。' },
          { en: 'I am eating breakfast.', cn: '我正在吃早餐。' },
          { en: 'I am playing with my friend.', cn: '我正在和朋友玩。' },
        ],
      },
      {
        pattern: 'I go to...',
        meaning: '我去...',
        examples: [
          { en: 'I go to school every day.', cn: '我每天去上学。' },
          { en: 'I go to the park on Sunday.', cn: '我周日去公园。' },
        ],
      },
    ],
  },
  {
    category: '位置方向',
    emoji: '📍',
    patterns: [
      {
        pattern: 'in / on / under',
        meaning: '在...里面/上面/下面',
        examples: [
          { en: 'The ball is in the box.', cn: '球在盒子里。' },
          { en: 'The book is on the desk.', cn: '书在桌子上。' },
          { en: 'The cat is under the bed.', cn: '猫在床下面。' },
        ],
      },
      {
        pattern: 'next to / beside',
        meaning: '在...旁边',
        examples: [
          { en: 'The dog is next to the tree.', cn: '狗在树旁边。' },
          { en: 'I sit beside my friend.', cn: '我坐在朋友旁边。' },
        ],
      },
      {
        pattern: 'in front of / behind',
        meaning: '在...前面/后面',
        examples: [
          { en: 'The car is in front of the house.', cn: '汽车在房子前面。' },
          { en: 'The tree is behind the school.', cn: '树在学校后面。' },
        ],
      },
      {
        pattern: 'Go straight / Turn left / Turn right',
        meaning: '直走/左转/右转',
        examples: [
          { en: 'Go straight and turn left.', cn: '直走然后左转。' },
          { en: 'Turn right at the corner.', cn: '在拐角处右转。' },
        ],
      },
    ],
  },
  {
    category: '天气表达',
    emoji: '☀️',
    patterns: [
      {
        pattern: "How's the weather?",
        meaning: '天气怎么样？',
        examples: [
          { en: "How's the weather today?", cn: '今天天气怎么样？' },
          { en: "What's the weather like?", cn: '天气怎么样？' },
        ],
      },
      {
        pattern: "It's sunny / cloudy / rainy",
        meaning: '天气晴朗/多云/下雨',
        examples: [
          { en: "It's sunny today.", cn: '今天阳光明媚。' },
          { en: "It's cloudy, take an umbrella.", cn: '多云，带把伞。' },
          { en: "It's rainy, stay inside.", cn: '下雨了，待在室内。' },
        ],
      },
      {
        pattern: "It's hot / cold / warm / cool",
        meaning: '天气热/冷/暖和/凉爽',
        examples: [
          { en: "It's hot today, drink more water.", cn: '今天很热，多喝水。' },
          { en: "It's cold outside, wear your coat.", cn: '外面很冷，穿上外套。' },
          { en: "It's warm and nice today.", cn: '今天很暖和很舒适。' },
        ],
      },
    ],
  },
  {
    category: '数量表达',
    emoji: '🔢',
    patterns: [
      {
        pattern: 'one / two / three...',
        meaning: '一/二/三...',
        examples: [
          { en: 'I have one apple.', cn: '我有一个苹果。' },
          { en: 'There are two cats.', cn: '有两只猫。' },
          { en: 'I can count to ten!', cn: '我能数到十！' },
        ],
      },
      {
        pattern: 'some / many / a lot of',
        meaning: '一些/许多/很多',
        examples: [
          { en: 'I have some books.', cn: '我有一些书。' },
          { en: 'There are many birds in the tree.', cn: '树上有很多鸟。' },
          { en: 'I have a lot of toys.', cn: '我有很多玩具。' },
        ],
      },
      {
        pattern: 'first / second / third',
        meaning: '第一/第二/第三',
        examples: [
          { en: 'I am the first one!', cn: '我是第一个！' },
          { en: 'The second apple is bigger.', cn: '第二个苹果更大。' },
        ],
      },
    ],
  },
  {
    category: '感受表达',
    emoji: '😊',
    patterns: [
      {
        pattern: 'I am happy / sad / tired',
        meaning: '我开心/难过/累了',
        examples: [
          { en: 'I am happy today!', cn: '我今天很开心！' },
          { en: 'I am sad because it is raining.', cn: '我很难过因为下雨了。' },
          { en: 'I am tired, I want to sleep.', cn: '我累了，想睡觉。' },
        ],
      },
      {
        pattern: 'I am hungry / thirsty',
        meaning: '我饿了/渴了',
        examples: [
          { en: 'I am hungry, can I have some food?', cn: '我饿了，可以吃点东西吗？' },
          { en: 'I am thirsty, I want water.', cn: '我渴了，想喝水。' },
        ],
      },
      {
        pattern: 'I feel...',
        meaning: '我感觉...',
        examples: [
          { en: 'I feel good today.', cn: '我今天感觉很好。' },
          { en: 'I feel sick.', cn: '我感觉不舒服。' },
          { en: 'I feel excited!', cn: '我感到很兴奋！' },
        ],
      },
      {
        pattern: 'I love...',
        meaning: '我爱...',
        examples: [
          { en: 'I love my family.', cn: '我爱我的家人。' },
          { en: 'I love you, mom!', cn: '我爱你，妈妈！' },
          { en: 'I love playing with my friends.', cn: '我喜欢和朋友们一起玩。' },
        ],
      },
    ],
  },
]

export default function SentencesPage() {
  const { speakSentence } = useEnglishAudio()
  const [activeTab, setActiveTab] = useState<string | null>('问候语')

  const handleSpeak = (text: string) => {
    speakSentence(text)
  }

  return (
    <Stack gap="lg" className="px-1">
      {/* 页面标题 */}
      <Box className="text-center py-2 animate-slide-up">
        <Group justify="center" gap="sm" mb="xs">
          <Box className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white shadow-md">
            <Text size="lg">💬</Text>
          </Box>
        </Group>
        <Title order={3} className="text-lg font-bold text-gray-800">常用句型</Title>
        <Text size="sm" className="text-gray-500">学习日常英语表达，掌握常用句式</Text>
      </Box>

      {/* 分类标签 */}
      <Tabs value={activeTab} onChange={setActiveTab} className="animate-slide-up stagger-1">
        <ScrollArea>
          <Tabs.List>
            {sentencePatterns.map((cat) => (
              <Tabs.Tab key={cat.category} value={cat.category}>
                <Group gap={4}>
                  <Text>{cat.emoji}</Text>
                  <Text size="xs">{cat.category}</Text>
                </Group>
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </ScrollArea>

        {sentencePatterns.map((cat) => (
          <Tabs.Panel key={cat.category} value={cat.category} pt="md">
            <Stack gap="md">
              {cat.patterns.map((pattern, idx) => (
                <Card
                  key={idx}
                  shadow="none"
                  padding="md"
                  radius="xl"
                  className="bg-white border-2 border-purple-100 hover:shadow-lg hover:border-purple-200 transition-all"
                >
                  <Stack gap="sm">
                    {/* 句型 */}
                    <Group justify="space-between" wrap="nowrap">
                      <Box className="flex-1">
                        <Text 
                          fw={700} 
                          className="text-purple-600"
                          style={{ fontFamily: "'Comic Sans MS', cursive" }}
                        >
                          {pattern.pattern}
                        </Text>
                        <Text size="sm" className="text-gray-600">{pattern.meaning}</Text>
                      </Box>
                      <ActionIcon 
                        variant="light" 
                        color="violet" 
                        size="lg"
                        radius="xl"
                        onClick={() => handleSpeak(pattern.pattern.replace(/\.\.\./g, '').replace(/\//g, ' or '))}
                        className="hover:scale-110 transition-transform"
                      >
                        <IconPlay size={16} />
                      </ActionIcon>
                    </Group>

                    {/* 例句 */}
                    <Box className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3">
                      <Text size="xs" className="text-gray-500" mb="xs">例句：</Text>
                      <Stack gap="xs">
                        {pattern.examples.map((ex, i) => (
                          <Group key={i} gap="sm" wrap="nowrap">
                            <ActionIcon 
                              variant="subtle" 
                              color="violet" 
                              size="sm"
                              onClick={() => handleSpeak(ex.en)}
                              className="hover:scale-110 transition-transform"
                            >
                              <IconPlay size={12} />
                            </ActionIcon>
                            <Box className="flex-1">
                              <Text size="sm" className="text-gray-700">{ex.en}</Text>
                              <Text size="xs" className="text-gray-500">{ex.cn}</Text>
                            </Box>
                          </Group>
                        ))}
                      </Stack>
                    </Box>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </Tabs.Panel>
        ))}
      </Tabs>

      {/* 底部间距 */}
      <Box className="h-4" />
    </Stack>
  )
}
