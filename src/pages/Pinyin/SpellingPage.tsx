import { useState } from 'react'
import { Card, SimpleGrid, Title, Text, Stack, Group, Tabs, Button, Box } from '@mantine/core'
import { twoSpellExamples, threeSpellExamples } from '../../data/pinyin'
import { SpellingAnimation } from '../../components/Pinyin'
import { IconSpell, IconRefresh, IconArrowRight } from '../../components/Icons'

export default function SpellingPage() {
  const [currentTwo, setCurrentTwo] = useState(0)
  const [currentThree, setCurrentThree] = useState(0)

  const twoSpell = twoSpellExamples[currentTwo]
  const threeSpell = threeSpellExamples[currentThree]

  const nextTwo = () => {
    setCurrentTwo((prev) => (prev + 1) % twoSpellExamples.length)
  }

  const nextThree = () => {
    setCurrentThree((prev) => (prev + 1) % threeSpellExamples.length)
  }

  const randomTwo = () => {
    const newIndex = Math.floor(Math.random() * twoSpellExamples.length)
    setCurrentTwo(newIndex)
  }

  const randomThree = () => {
    const newIndex = Math.floor(Math.random() * threeSpellExamples.length)
    setCurrentThree(newIndex)
  }

  return (
    <Stack gap="md" className="px-1">
      {/* 顶部标题 */}
      <Box className="text-center py-2">
        <Group justify="center" gap="sm" mb="xs">
          <Box className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white">
            <IconSpell size={22} />
          </Box>
        </Group>
        <Title order={2} className="text-xl font-semibold text-gray-800">
          拼读训练
        </Title>
        <Text className="text-gray-500" size="sm" mt="xs">
          学习声母和韵母如何拼读成音节
        </Text>
      </Box>

      <Tabs defaultValue="two" color="indigo">
        <Tabs.List grow>
          <Tabs.Tab value="two">两拼法</Tabs.Tab>
          <Tabs.Tab value="three">三拼法</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="two" pt="md">
          <Stack gap="md">
            <Card shadow="none" padding="md" radius="lg" className="bg-indigo-50 border-2 border-indigo-100">
              <Text size="sm" className="text-gray-600">
                <strong className="text-indigo-600">两拼法</strong>：声母 + 韵母 = 音节，如 b + a = ba
              </Text>
            </Card>

            <SpellingAnimation
              key={`two-${currentTwo}`}
              initial={twoSpell.initial}
              final={twoSpell.final}
            />

            <Card shadow="none" padding="md" radius="xl" className="border-2 border-gray-100 bg-white">
              <Stack align="center" gap="sm">
                <Group gap="xs" align="center">
                  <Text size="md" className="text-gray-500">例字：</Text>
                  <Text className="text-3xl font-bold text-gray-800">{twoSpell.char}</Text>
                </Group>
                <Text size="sm" className="text-gray-500 font-mono">
                  {twoSpell.initial.toLowerCase()} + {twoSpell.final.toLowerCase()} → {twoSpell.result.toLowerCase()}
                </Text>
              </Stack>
            </Card>

            <Group justify="center" gap="sm">
              <Button
                variant="light"
                color="gray"
                size="sm"
                leftSection={<IconRefresh size={16} />}
                onClick={randomTwo}
                className="hover:scale-105 active:scale-95 transition-transform text-gray-700"
              >
                随机
              </Button>
              <Button
                variant="filled"
                size="sm"
                rightSection={<IconArrowRight size={16} />}
                onClick={nextTwo}
                className="hover:scale-105 active:scale-95 transition-transform bg-gradient-to-r from-indigo-500 to-violet-500 text-white"
              >
                下一个
              </Button>
            </Group>

            {/* 更多示例 */}
            <Card shadow="none" padding="md" radius="xl" className="mt-2 border-2 border-gray-100 bg-white">
              <Text fw={600} mb="sm" ta="center" size="sm" className="text-gray-600">更多示例</Text>
              <SimpleGrid cols={{ base: 5, sm: 8 }} spacing="xs">
                {twoSpellExamples.slice(0, 40).map((example, index) => (
                  <Box
                    key={index}
                    className={`
                      px-2 py-1.5 rounded-lg text-center cursor-pointer font-mono text-sm font-medium
                      transition-all hover:scale-105
                      ${index === currentTwo 
                        ? 'bg-indigo-500 text-white shadow-md' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                    `}
                    onClick={() => setCurrentTwo(index)}
                  >
                    {example.result.toLowerCase()}
                  </Box>
                ))}
              </SimpleGrid>
            </Card>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="three" pt="md">
          <Stack gap="md">
            <Card shadow="none" padding="md" radius="lg" className="bg-emerald-50 border-2 border-emerald-100">
              <Text size="sm" className="text-gray-600">
                <strong className="text-emerald-600">三拼法</strong>：声母 + 介母 + 韵母 = 音节，如 j + i + a = jia
              </Text>
            </Card>

            <SpellingAnimation
              key={`three-${currentThree}`}
              initial={threeSpell.initial}
              medial={threeSpell.medial}
              final={threeSpell.final}
            />

            <Card shadow="none" padding="md" radius="xl" className="border-2 border-gray-100 bg-white">
              <Stack align="center" gap="sm">
                <Group gap="xs" align="center">
                  <Text size="md" className="text-gray-500">例字：</Text>
                  <Text className="text-3xl font-bold text-gray-800">{threeSpell.char}</Text>
                </Group>
                <Text size="sm" className="text-gray-500 font-mono">
                  {threeSpell.initial.toLowerCase()} + {threeSpell.medial.toLowerCase()} + {threeSpell.final.toLowerCase()} → {threeSpell.result.toLowerCase()}
                </Text>
              </Stack>
            </Card>

            <Group justify="center" gap="sm">
              <Button
                variant="light"
                color="gray"
                size="sm"
                leftSection={<IconRefresh size={16} />}
                onClick={randomThree}
                className="hover:scale-105 active:scale-95 transition-transform text-gray-700"
              >
                随机
              </Button>
              <Button
                variant="filled"
                size="sm"
                rightSection={<IconArrowRight size={16} />}
                onClick={nextThree}
                className="hover:scale-105 active:scale-95 transition-transform bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
              >
                下一个
              </Button>
            </Group>

            {/* 更多示例 */}
            <Card shadow="none" padding="md" radius="xl" className="mt-2 border-2 border-gray-100 bg-white">
              <Text fw={600} mb="sm" ta="center" size="sm" className="text-gray-600">更多示例</Text>
              <SimpleGrid cols={{ base: 4, sm: 6 }} spacing="xs">
                {threeSpellExamples.map((example, index) => (
                  <Box
                    key={index}
                    className={`
                      px-2 py-1.5 rounded-lg text-center cursor-pointer font-mono text-sm font-medium
                      transition-all hover:scale-105
                      ${index === currentThree 
                        ? 'bg-emerald-500 text-white shadow-md' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                    `}
                    onClick={() => setCurrentThree(index)}
                  >
                    {example.result.toLowerCase()}
                  </Box>
                ))}
              </SimpleGrid>
            </Card>
          </Stack>
        </Tabs.Panel>
      </Tabs>

      {/* 底部间距 */}
      <Box className="h-4" />
    </Stack>
  )
}
