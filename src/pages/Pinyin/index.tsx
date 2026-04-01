import { useNavigate } from 'react-router-dom'
import { Card, SimpleGrid, Title, Text, Stack, Group, Badge, Box, RingProgress } from '@mantine/core'
import { useApp } from '../../stores/AppContext'
import { pinyinOverview } from '../../data/pinyin'
import {
  IconPinyin,
  IconVowel,
  IconConsonant,
  IconWholeSyllable,
  IconTone,
  IconSpell,
  IconPractice,
  IconTable,
  IconFavorite,
  IconArrowRight,
  IconDiamond,
  IconDiamondOutline,
} from '../../components/Icons'

interface MenuCardProps {
  title: string
  description: string
  icon: React.ReactNode
  iconBg: string
  onClick: () => void
  badge?: string
}

function MenuCard({ title, description, icon, iconBg, onClick, badge }: MenuCardProps) {
  return (
    <Card
      shadow="none"
      padding="md"
      radius="xl"
      className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] bg-white border border-slate-100"
      onClick={onClick}
    >
      <Group gap="md" wrap="nowrap">
        <Box className={`w-11 h-11 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-md ${iconBg}`}>
          {icon}
        </Box>
        <Stack gap={2} className="flex-1 min-w-0">
          <Group gap="xs" wrap="nowrap">
            <Text fw={600} className="truncate text-slate-800">{title}</Text>
            {badge && (
              <Badge size="xs" variant="light" color="violet" className="flex-shrink-0">{badge}</Badge>
            )}
          </Group>
          <Text size="xs" c="dimmed" className="truncate">{description}</Text>
        </Stack>
        <Box className="text-slate-300">
          <IconArrowRight size={16} />
        </Box>
      </Group>
    </Card>
  )
}

export default function PinyinHome() {
  const navigate = useNavigate()
  const { progress, pinyinFavorites } = useApp()

  const pinyinProgress = progress.pinyinProgress
  const learnedCount = pinyinProgress.learnedPinyin.length
  const totalPinyin = pinyinOverview.vowels.total + pinyinOverview.initials.total + pinyinOverview.wholeSyllables.total
  const learnProgress = Math.round((learnedCount / totalPinyin) * 100)

  const pinyinAccuracy = pinyinProgress.totalQuestions > 0
    ? Math.round((pinyinProgress.correctAnswers / pinyinProgress.totalQuestions) * 100)
    : 0

  return (
    <Stack gap="md" className="px-1">
      {/* 顶部标题 */}
      <Box className="text-center py-3">
        <Group justify="center" gap="sm" mb="sm">
          <Box className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white shadow-lg">
            <IconPinyin size={26} />
          </Box>
        </Group>
        <Title order={2} className="text-xl font-semibold text-slate-800">
          拼音天地
        </Title>
        <Text c="dimmed" size="sm" mt="xs">
          轻松学拼音，快乐读汉字
        </Text>
      </Box>

      {/* 学习统计 */}
      <Card shadow="none" padding="lg" radius="xl" className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white hover:shadow-xl transition-shadow">
        <div className="grid grid-cols-4 gap-3">
          <Stack align="center" gap={6}>
            <RingProgress
              size={52}
              thickness={5}
              roundCaps
              sections={[{ value: learnProgress, color: 'white' }]}
              label={<Text ta="center" fw={700} size="xs" c="white">{learnProgress}%</Text>}
            />
            <Text size="xs" className="text-white/80">进度</Text>
          </Stack>

          <Stack align="center" gap={6}>
            <Box className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <Text fw={700} size="xl">{learnedCount}</Text>
            </Box>
            <Text size="xs" className="text-white/80">已学</Text>
          </Stack>

          <Stack align="center" gap={6}>
            <Box className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <Text fw={700} size="xl">{pinyinAccuracy}%</Text>
            </Box>
            <Text size="xs" className="text-white/80">正确率</Text>
          </Stack>

          <Stack align="center" gap={6}>
            <Box className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <Text fw={700} size="xl">{pinyinFavorites.length}</Text>
            </Box>
            <Text size="xs" className="text-white/80">收藏</Text>
          </Stack>
        </div>
      </Card>

      {/* 学习模块 */}
      <Box>
        <Group gap="sm" mb="sm">
          <Box className="w-6 h-6 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600">
            <IconDiamond size={12} />
          </Box>
          <Text size="sm" fw={600} c="dimmed" className="uppercase tracking-wide">学习</Text>
        </Group>
        <SimpleGrid cols={{ base: 1, xs: 1, sm: 2 }} spacing="sm">
          <MenuCard
            title="韵母学习"
            description="单韵母、复韵母、鼻韵母"
            icon={<IconVowel size={20} />}
            iconBg="bg-gradient-to-br from-rose-400 to-pink-500"
            onClick={() => navigate('/pinyin/vowels')}
            badge={`${pinyinOverview.vowels.total}个`}
          />
          <MenuCard
            title="声母学习"
            description="唇音、舌音、平翘舌音"
            icon={<IconConsonant size={20} />}
            iconBg="bg-gradient-to-br from-blue-400 to-indigo-500"
            onClick={() => navigate('/pinyin/initials')}
            badge={`${pinyinOverview.initials.total}个`}
          />
          <MenuCard
            title="整体认读"
            description="16个整体认读音节"
            icon={<IconWholeSyllable size={20} />}
            iconBg="bg-gradient-to-br from-amber-400 to-orange-500"
            onClick={() => navigate('/pinyin/whole')}
            badge={`${pinyinOverview.wholeSyllables.total}个`}
          />
          <MenuCard
            title="声调学习"
            description="一声二声三声四声"
            icon={<IconTone size={20} />}
            iconBg="bg-gradient-to-br from-emerald-400 to-teal-500"
            onClick={() => navigate('/pinyin/tones')}
          />
        </SimpleGrid>
      </Box>

      {/* 练习模块 */}
      <Box>
        <Group gap="sm" mb="sm">
          <Box className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
            <IconDiamondOutline size={12} />
          </Box>
          <Text size="sm" fw={600} c="dimmed" className="uppercase tracking-wide">练习</Text>
        </Group>
        <SimpleGrid cols={{ base: 1, xs: 1, sm: 2 }} spacing="sm">
          <MenuCard
            title="拼读训练"
            description="两拼法、三拼法练习"
            icon={<IconSpell size={20} />}
            iconBg="bg-gradient-to-br from-indigo-400 to-violet-500"
            onClick={() => navigate('/pinyin/spelling')}
          />
          <MenuCard
            title="拼音练习"
            description="拼音选字、字选拼音"
            icon={<IconPractice size={20} />}
            iconBg="bg-gradient-to-br from-teal-400 to-cyan-500"
            onClick={() => navigate('/pinyin/practice')}
          />
          <MenuCard
            title="拼音表"
            description="完整拼音字母表"
            icon={<IconTable size={20} />}
            iconBg="bg-gradient-to-br from-slate-400 to-slate-600"
            onClick={() => navigate('/pinyin/table')}
          />
          <MenuCard
            title="收藏夹"
            description="复习收藏的拼音"
            icon={<IconFavorite size={20} />}
            iconBg="bg-gradient-to-br from-pink-400 to-rose-500"
            onClick={() => navigate('/pinyin/favorites')}
            badge={pinyinFavorites.length > 0 ? `${pinyinFavorites.length}个` : undefined}
          />
        </SimpleGrid>
      </Box>

      {/* 底部间距 */}
      <Box className="h-4" />
    </Stack>
  )
}
