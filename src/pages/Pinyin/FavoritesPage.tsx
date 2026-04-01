import { 
  Card, 
  Title, 
  Text, 
  Stack, 
  Group,
  Box,
  SimpleGrid,
  ActionIcon,
} from '@mantine/core'
import { useApp } from '../../stores/AppContext'
import { usePinyinAudio } from '../../hooks/usePinyinAudio'
import { getTonedPinyin } from '../../data/pinyin/syllables'
import { IconFavorite, IconPlay, IconTrash } from '../../components/Icons'
import type { ToneType } from '../../types'

export default function FavoritesPage() {
  const { pinyinFavorites, removePinyinFavorite } = useApp()
  const { speakPinyin } = usePinyinAudio()

  const handleSpeak = (pinyin: string) => {
    const tone = 1 as ToneType
    speakPinyin(pinyin, tone)
  }

  if (pinyinFavorites.length === 0) {
    return (
      <Stack gap="lg" className="px-1">
        <Box className="text-center py-2 animate-slide-up">
          <Group justify="center" gap="sm" mb="xs">
            <Box className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white shadow-md">
              <IconFavorite size={20} />
            </Box>
          </Group>
          <Title order={3} className="text-lg font-bold text-gray-800">收藏夹</Title>
          <Text size="sm" className="text-gray-500">复习收藏的拼音</Text>
        </Box>

        <Card shadow="none" padding="xl" radius="xl" className="bg-white border-2 border-pink-100 text-center">
          <Stack align="center" gap="md">
            <Box className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center">
              <Text className="text-3xl">📚</Text>
            </Box>
            <Text className="text-gray-500">
              还没有收藏的拼音哦
            </Text>
            <Text size="sm" className="text-gray-400">
              在学习过程中点击收藏按钮添加
            </Text>
          </Stack>
        </Card>
      </Stack>
    )
  }

  return (
    <Stack gap="lg" className="px-1">
      <Box className="text-center py-2 animate-slide-up">
        <Group justify="center" gap="sm" mb="xs">
          <Box className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white shadow-md">
            <IconFavorite size={20} />
          </Box>
        </Group>
        <Title order={3} className="text-lg font-bold text-gray-800">收藏夹</Title>
        <Text size="sm" className="text-gray-500">共收藏 {pinyinFavorites.length} 个拼音</Text>
      </Box>

      <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="sm">
        {pinyinFavorites.map((favorite, idx) => {
          const tonedPinyin = getTonedPinyin(favorite.pinyin, 1 as ToneType)
          return (
            <Card
              key={idx}
              shadow="none"
              padding="md"
              radius="xl"
              className="bg-white border-2 border-pink-100 hover:shadow-md hover:border-pink-200 transition-all animate-slide-up"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <Stack align="center" gap="sm">
                <Text className="text-2xl font-bold text-pink-600">
                  {tonedPinyin}
                </Text>
                <Group gap="xs">
                  <ActionIcon
                    variant="light"
                    color="pink"
                    size="sm"
                    radius="xl"
                    onClick={() => handleSpeak(favorite.pinyin)}
                  >
                    <IconPlay size={12} />
                  </ActionIcon>
                  <ActionIcon
                    variant="light"
                    color="gray"
                    size="sm"
                    radius="xl"
                    onClick={() => removePinyinFavorite(favorite.pinyin)}
                  >
                    <IconTrash size={12} />
                  </ActionIcon>
                </Group>
              </Stack>
            </Card>
          )
        })}
      </SimpleGrid>

      <Box className="h-4" />
    </Stack>
  )
}
