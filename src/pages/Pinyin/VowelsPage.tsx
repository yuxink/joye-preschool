import { useState } from 'react'
import { Card, SimpleGrid, Title, Text, Stack, Group, Tabs, Badge, Box, Modal } from '@mantine/core'
import { singleVowels, compoundVowels, frontNasalVowels, backNasalVowels } from '../../data/pinyin'
import { PinyinCard } from '../../components/Pinyin'
import type { PinyinItem } from '../../types'
import { usePinyinAudio } from '../../hooks/usePinyinAudio'
import { IconVowel } from '../../components/Icons'

export default function VowelsPage() {
  const [selectedItem, setSelectedItem] = useState<PinyinItem | null>(null)
  const { speakPinyin } = usePinyinAudio()

  const handleItemClick = (item: PinyinItem) => {
    setSelectedItem(item)
    speakPinyin(item.pinyin.toLowerCase())
  }

  return (
    <Stack gap="md" className="px-1">
      {/* 顶部标题 */}
      <Box className="text-center py-2">
        <Group justify="center" gap="sm" mb="xs">
          <Box className="w-10 h-10 rounded-xl bg-rose-500 flex items-center justify-center text-white">
            <IconVowel size={22} />
          </Box>
        </Group>
        <Title order={2} className="text-xl font-semibold text-slate-800">
          韵母学习
        </Title>
        <Text c="dimmed" size="sm" mt="xs">
          点击卡片听发音
        </Text>
      </Box>

      <Tabs defaultValue="single" color="rose">
        <Tabs.List grow>
          <Tabs.Tab value="single">单韵母</Tabs.Tab>
          <Tabs.Tab value="compound">复韵母</Tabs.Tab>
          <Tabs.Tab value="nasal">鼻韵母</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="single" pt="md">
          <Stack gap="md">
            <Card shadow="none" padding="md" radius="lg" className="bg-rose-50 border border-rose-100 hover:shadow-md transition-shadow">
              <Text size="sm" c="dimmed">
                <strong>单韵母</strong>共6个：a o e i u ü，发音时口型不变。
              </Text>
            </Card>
            
            <SimpleGrid cols={{ base: 3, sm: 6 }} spacing="sm">
              {singleVowels.map((item, index) => (
                <div key={item.pinyin} className={`animate-pop stagger-${index + 1}`}>
                  <PinyinCard
                    item={item}
                    size="lg"
                    onClick={() => handleItemClick(item)}
                  />
                </div>
              ))}
            </SimpleGrid>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="compound" pt="md">
          <Stack gap="md">
            <Card shadow="none" padding="md" radius="lg" className="bg-orange-50 border border-orange-100 hover:shadow-md transition-shadow">
              <Text size="sm" c="dimmed">
                <strong>复韵母</strong>共9个，发音时口型会变化，从一个韵母滑向另一个。
              </Text>
            </Card>
            
            <SimpleGrid cols={{ base: 3, sm: 4 }} spacing="sm">
              {compoundVowels.map((item, index) => (
                <div key={item.pinyin} className={`animate-pop stagger-${index + 1}`}>
                  <PinyinCard
                    item={item}
                    onClick={() => handleItemClick(item)}
                  />
                </div>
              ))}
            </SimpleGrid>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="nasal" pt="md">
          <Stack gap="lg">
            <Card shadow="none" padding="md" radius="lg" className="bg-emerald-50 border border-emerald-100 hover:shadow-md transition-shadow">
              <Text size="sm" c="dimmed">
                <strong>鼻韵母</strong>分为前鼻韵母（-n结尾）和后鼻韵母（-ng结尾）。
              </Text>
            </Card>

            <Box>
              <Group gap="xs" mb="sm">
                <Badge color="amber" variant="light" size="sm">前鼻韵母</Badge>
                <Text size="xs" c="dimmed">-n 结尾</Text>
              </Group>
              <SimpleGrid cols={{ base: 3, sm: 5 }} spacing="sm">
                {frontNasalVowels.map((item, index) => (
                  <div key={item.pinyin} className={`animate-pop stagger-${index + 1}`}>
                    <PinyinCard
                      item={item}
                      onClick={() => handleItemClick(item)}
                    />
                  </div>
                ))}
              </SimpleGrid>
            </Box>

            <Box>
              <Group gap="xs" mb="sm">
                <Badge color="emerald" variant="light" size="sm">后鼻韵母</Badge>
                <Text size="xs" c="dimmed">-ng 结尾</Text>
              </Group>
              <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="sm">
                {backNasalVowels.map((item, index) => (
                  <div key={item.pinyin} className={`animate-pop stagger-${index + 1}`}>
                    <PinyinCard
                      item={item}
                      onClick={() => handleItemClick(item)}
                    />
                  </div>
                ))}
              </SimpleGrid>
            </Box>
          </Stack>
        </Tabs.Panel>
      </Tabs>

      {/* 详情弹窗 */}
      <Modal
        opened={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        title={<Text fw={600}>韵母详情</Text>}
        centered
        size="sm"
        radius="lg"
      >
        {selectedItem && (
          <Stack align="center" gap="md">
            <Text className="text-6xl font-bold text-rose-500">
              {selectedItem.pinyin.toLowerCase()}
            </Text>
            <Badge color="rose" size="md" variant="light">
              韵母
            </Badge>
            {selectedItem.tips && (
              <Card shadow="none" padding="md" radius="lg" className="w-full bg-rose-50 border border-rose-100">
                <Text size="sm" ta="center" c="dimmed">
                  {selectedItem.tips}
                </Text>
              </Card>
            )}
          </Stack>
        )}
      </Modal>

      {/* 底部间距 */}
      <Box className="h-4" />
    </Stack>
  )
}
