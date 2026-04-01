import { Card, SimpleGrid, Title, Text, Stack, Group, Tabs, Box } from '@mantine/core'
import { allVowels, allInitials, wholeSyllables } from '../../data/pinyin'
import { usePinyinAudio } from '../../hooks/usePinyinAudio'
import { useApp } from '../../stores/AppContext'
import { IconTable, IconCheck } from '../../components/Icons'

export default function TablePage() {
  const { speakPinyin } = usePinyinAudio()
  const { progress, markPinyinLearned } = useApp()
  const learnedPinyin = progress.pinyinProgress.learnedPinyin

  const handleClick = (pinyin: string) => {
    const lower = pinyin.toLowerCase()
    speakPinyin(lower)
    markPinyinLearned(lower)
  }

  const isLearned = (pinyin: string) => learnedPinyin.includes(pinyin.toLowerCase())

  const totalCount = allVowels.length + allInitials.length + wholeSyllables.length
  const learnedCount = learnedPinyin.length
  const progressPercent = Math.round((learnedCount / totalCount) * 100)

  return (
    <Stack gap="md" className="px-1">
      {/* 顶部标题 */}
      <Box className="text-center py-3">
        <Group justify="center" gap="sm" mb="sm">
          <Box className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white shadow-lg">
            <IconTable size={26} />
          </Box>
        </Group>
        <Title order={2} className="text-xl font-semibold text-slate-800">
          拼音字母表
        </Title>
        <Text c="dimmed" size="sm" mt="xs">
          点击任意拼音播放发音
        </Text>
      </Box>

      {/* 图例 */}
      <Card shadow="none" padding="sm" radius="xl" className="bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
        <Group justify="center" gap="lg" wrap="wrap">
          <Group gap="xs">
            <Box className="w-5 h-5 rounded-md bg-rose-400" />
            <Text size="xs" c="dimmed">韵母</Text>
          </Group>
          <Group gap="xs">
            <Box className="w-5 h-5 rounded-md bg-blue-400" />
            <Text size="xs" c="dimmed">声母</Text>
          </Group>
          <Group gap="xs">
            <Box className="w-5 h-5 rounded-md bg-violet-400" />
            <Text size="xs" c="dimmed">整体认读</Text>
          </Group>
          <Group gap="xs">
            <Box className="w-5 h-5 rounded-full ring-2 ring-emerald-400 ring-offset-2" />
            <Text size="xs" c="dimmed">已学</Text>
          </Group>
        </Group>
      </Card>

      <Tabs defaultValue="vowels" color="cyan">
        <Tabs.List grow>
          <Tabs.Tab value="vowels">韵母 ({allVowels.length})</Tabs.Tab>
          <Tabs.Tab value="initials">声母 ({allInitials.length})</Tabs.Tab>
          <Tabs.Tab value="whole">整体 ({wholeSyllables.length})</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="vowels" pt="md">
          <SimpleGrid cols={{ base: 4, sm: 6, md: 8 }} spacing="sm">
            {allVowels.map((item) => (
              <Card
                key={item.pinyin}
                shadow="none"
                padding="sm"
                radius="xl"
                className={`
                  cursor-pointer transition-all duration-200 text-center
                  hover:shadow-lg hover:scale-105 hover:-translate-y-0.5 active:scale-95
                  ${isLearned(item.pinyin) 
                    ? 'bg-rose-500 text-white ring-2 ring-emerald-400 ring-offset-2' 
                    : 'bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100'}
                `}
                onClick={() => handleClick(item.pinyin)}
              >
                <Text fw={700} size="lg" className="font-mono">
                  {item.pinyin.toLowerCase()}
                </Text>
              </Card>
            ))}
          </SimpleGrid>
        </Tabs.Panel>

        <Tabs.Panel value="initials" pt="md">
          <SimpleGrid cols={{ base: 4, sm: 6, md: 8 }} spacing="sm">
            {allInitials.map((item) => (
              <Card
                key={item.pinyin}
                shadow="none"
                padding="sm"
                radius="xl"
                className={`
                  cursor-pointer transition-all duration-200 text-center
                  hover:shadow-lg hover:scale-105 hover:-translate-y-0.5 active:scale-95
                  ${isLearned(item.pinyin) 
                    ? 'bg-blue-500 text-white ring-2 ring-emerald-400 ring-offset-2' 
                    : 'bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100'}
                `}
                onClick={() => handleClick(item.pinyin)}
              >
                <Text fw={700} size="lg" className="font-mono">
                  {item.pinyin.toLowerCase()}
                </Text>
              </Card>
            ))}
          </SimpleGrid>
        </Tabs.Panel>

        <Tabs.Panel value="whole" pt="md">
          <Stack gap="md">
            <Card shadow="none" padding="md" radius="lg" className="bg-violet-50 border border-violet-100 hover:shadow-md transition-shadow">
              <Text size="sm" c="dimmed">
                <strong>整体认读音节</strong>要整体记忆，不能拆开拼读。
              </Text>
            </Card>
            
            <SimpleGrid cols={{ base: 3, sm: 4, md: 6 }} spacing="sm">
              {wholeSyllables.map((item) => (
                <Card
                  key={item.pinyin}
                  shadow="none"
                  padding="sm"
                  radius="xl"
                  className={`
                    cursor-pointer transition-all duration-200 text-center
                    hover:shadow-lg hover:scale-105 hover:-translate-y-0.5 active:scale-95
                    ${isLearned(item.pinyin) 
                      ? 'bg-violet-500 text-white ring-2 ring-emerald-400 ring-offset-2' 
                      : 'bg-violet-50 text-violet-600 border border-violet-100 hover:bg-violet-100'}
                  `}
                  onClick={() => handleClick(item.pinyin)}
                >
                  <Text fw={700} size="lg" className="font-mono">
                    {item.pinyin.toLowerCase()}
                  </Text>
                </Card>
              ))}
            </SimpleGrid>
          </Stack>
        </Tabs.Panel>
      </Tabs>

      {/* 学习进度 */}
      <Card shadow="none" padding="lg" radius="xl" className="border border-slate-100 hover:shadow-md transition-shadow">
        <Group justify="space-between" mb="sm">
          <Group gap="sm">
            <Box className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
              <IconCheck size={16} />
            </Box>
            <Text fw={600} className="text-slate-700">学习进度</Text>
          </Group>
          <Text fw={700} className="text-emerald-600">
            {learnedCount} / {totalCount}
          </Text>
        </Group>
        <Box className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <Box 
            className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </Box>
        <Text size="xs" c="dimmed" ta="center" mt="sm">
          已完成 {progressPercent}%
        </Text>
      </Card>

      {/* 底部间距 */}
      <Box className="h-4" />
    </Stack>
  )
}
