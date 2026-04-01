import { useState } from 'react'
import { Card, SimpleGrid, Title, Text, Stack, Group, Tabs, Badge, Box, Modal } from '@mantine/core'
import { 
  labialInitials, 
  alveolarInitials, 
  velarInitials, 
  palatalInitials,
  flatInitials,
  curledInitials,
  flatVsCurled 
} from '../../data/pinyin'
import { PinyinCard } from '../../components/Pinyin'
import type { PinyinItem } from '../../types'
import { usePinyinAudio } from '../../hooks/usePinyinAudio'
import { IconConsonant } from '../../components/Icons'

export default function InitialsPage() {
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
          <Box className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white">
            <IconConsonant size={22} />
          </Box>
        </Group>
        <Title order={2} className="text-xl font-semibold text-slate-800">
          声母学习
        </Title>
        <Text c="dimmed" size="sm" mt="xs">
          点击卡片听发音
        </Text>
      </Box>

      <Tabs defaultValue="basic" color="blue">
        <Tabs.List grow>
          <Tabs.Tab value="basic">基础声母</Tabs.Tab>
          <Tabs.Tab value="flat">平舌音</Tabs.Tab>
          <Tabs.Tab value="curled">翘舌音</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="basic" pt="md">
          <Stack gap="lg">
            <Card shadow="none" padding="md" radius="lg" className="bg-blue-50 border border-blue-100 hover:shadow-md transition-shadow">
              <Text size="sm" c="dimmed">
                <strong>声母</strong>共23个，是音节开头的辅音。
              </Text>
            </Card>

            <Box>
              <Group gap="xs" mb="sm">
                <Badge color="pink" variant="light" size="sm">唇音</Badge>
                <Text size="xs" c="dimmed">b p m f</Text>
              </Group>
              <SimpleGrid cols={{ base: 4 }} spacing="sm">
                {labialInitials.map((item, index) => (
                  <div key={item.pinyin} className={`animate-pop stagger-${index + 1}`}>
                    <PinyinCard item={item} onClick={() => handleItemClick(item)} />
                  </div>
                ))}
              </SimpleGrid>
            </Box>

            <Box>
              <Group gap="xs" mb="sm">
                <Badge color="blue" variant="light" size="sm">舌尖音</Badge>
                <Text size="xs" c="dimmed">d t n l</Text>
              </Group>
              <SimpleGrid cols={{ base: 4 }} spacing="sm">
                {alveolarInitials.map((item, index) => (
                  <div key={item.pinyin} className={`animate-pop stagger-${index + 1}`}>
                    <PinyinCard item={item} onClick={() => handleItemClick(item)} />
                  </div>
                ))}
              </SimpleGrid>
            </Box>

            <Box>
              <Group gap="xs" mb="sm">
                <Badge color="emerald" variant="light" size="sm">舌根音</Badge>
                <Text size="xs" c="dimmed">g k h</Text>
              </Group>
              <SimpleGrid cols={{ base: 3 }} spacing="sm">
                {velarInitials.map((item, index) => (
                  <div key={item.pinyin} className={`animate-pop stagger-${index + 1}`}>
                    <PinyinCard item={item} onClick={() => handleItemClick(item)} />
                  </div>
                ))}
              </SimpleGrid>
            </Box>

            <Box>
              <Group gap="xs" mb="sm">
                <Badge color="violet" variant="light" size="sm">舌面音</Badge>
                <Text size="xs" c="dimmed">j q x</Text>
              </Group>
              <SimpleGrid cols={{ base: 3 }} spacing="sm">
                {palatalInitials.map((item, index) => (
                  <div key={item.pinyin} className={`animate-pop stagger-${index + 1}`}>
                    <PinyinCard item={item} onClick={() => handleItemClick(item)} />
                  </div>
                ))}
              </SimpleGrid>
            </Box>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="flat" pt="md">
          <Stack gap="md">
            <Card shadow="none" padding="md" radius="lg" className="bg-cyan-50 border border-cyan-100 hover:shadow-md transition-shadow">
              <Text size="sm" c="dimmed">
                <strong>平舌音</strong>：z c s，发音时舌尖平伸抵住上齿龈。
              </Text>
            </Card>
            
            <SimpleGrid cols={{ base: 3 }} spacing="md">
              {flatInitials.map((item, index) => (
                <div key={item.pinyin} className={`animate-pop stagger-${index + 1}`}>
                  <PinyinCard item={item} size="lg" onClick={() => handleItemClick(item)} />
                </div>
              ))}
            </SimpleGrid>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="curled" pt="md">
          <Stack gap="md">
            <Card shadow="none" padding="md" radius="lg" className="bg-orange-50 border border-orange-100 hover:shadow-md transition-shadow">
              <Text size="sm" c="dimmed">
                <strong>翘舌音</strong>：zh ch sh r，发音时舌尖翘起抵住硬腭前部。
              </Text>
            </Card>
            
            <SimpleGrid cols={{ base: 4 }} spacing="md">
              {curledInitials.map((item, index) => (
                <div key={item.pinyin} className={`animate-pop stagger-${index + 1}`}>
                  <PinyinCard item={item} size="md" onClick={() => handleItemClick(item)} />
                </div>
              ))}
            </SimpleGrid>

            {/* 平舌翘舌对比 */}
            <Card shadow="none" padding="md" radius="xl" className="mt-4 border border-slate-100 hover:shadow-lg transition-shadow">
              <Text fw={600} mb="md" ta="center" className="text-slate-700">平舌 vs 翘舌 对比</Text>
              <Stack gap="sm">
                {flatVsCurled.slice(0, 3).map((pair, index) => (
                  <Group key={index} justify="center" gap="lg">
                    <Badge 
                      size="lg" 
                      color="cyan" 
                      variant="light"
                      className="cursor-pointer min-w-[50px] font-mono hover:scale-110 transition-transform"
                      onClick={() => speakPinyin(pair.flat)}
                    >
                      {pair.flat}
                    </Badge>
                    <Text c="dimmed" size="sm">vs</Text>
                    <Badge 
                      size="lg" 
                      color="orange" 
                      variant="light"
                      className="cursor-pointer min-w-[50px] font-mono hover:scale-110 transition-transform"
                      onClick={() => speakPinyin(pair.curled)}
                    >
                      {pair.curled}
                    </Badge>
                  </Group>
                ))}
              </Stack>
            </Card>
          </Stack>
        </Tabs.Panel>
      </Tabs>

      {/* 详情弹窗 */}
      <Modal
        opened={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        title={<Text fw={600}>声母详情</Text>}
        centered
        size="sm"
        radius="lg"
      >
        {selectedItem && (
          <Stack align="center" gap="md">
            <Text className="text-6xl font-bold text-blue-600">
              {selectedItem.pinyin.toLowerCase()}
            </Text>
            <Group gap="xs">
              {selectedItem.isFlat && <Badge color="cyan" variant="light">平舌音</Badge>}
              {selectedItem.isCurled && <Badge color="orange" variant="light">翘舌音</Badge>}
              {!selectedItem.isFlat && !selectedItem.isCurled && <Badge color="blue" variant="light">声母</Badge>}
            </Group>
            {selectedItem.tips && (
              <Card shadow="none" padding="md" radius="lg" className="w-full bg-blue-50 border border-blue-100">
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
