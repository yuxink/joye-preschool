import { useNavigate } from 'react-router-dom'
import { 
  Card, 
  SimpleGrid, 
  Title, 
  Text, 
  Group, 
  Stack, 
  Box,
  RingProgress,
  Badge,
} from '@mantine/core'
import { useApp } from '../../stores/AppContext'
import {
  IconMath,
  IconPinyin,
  IconChallenge,
  IconWrongBook,
  IconTable,
  IconSettings,
  IconSun,
  IconMoon,
  IconAfternoon,
  IconCheck,
  IconArrowRight,
} from '../../components/Icons'

// 英文图标 - 地球图案
function IconEnglish({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

// 星星图标
function IconStar({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

interface ModuleCardProps {
  title: string
  subtitle: string
  icon: React.ReactNode
  iconBg: string
  stats: { label: string; value: number | string; color?: string }[]
  onClick: () => void
}

function ModuleCard({ title, subtitle, icon, iconBg, stats, onClick }: ModuleCardProps) {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="xl"
      className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98] bg-white"
      onClick={onClick}
    >
      <Stack gap="md">
        <Group justify="space-between" wrap="nowrap">
          <Group gap="md" wrap="nowrap">
            <Box className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md ${iconBg}`}>
              {icon}
            </Box>
            <div>
              <Title order={3} className="text-lg font-bold text-gray-800">{title}</Title>
              <Text size="sm" className="text-gray-500">{subtitle}</Text>
            </div>
          </Group>
        </Group>
        
        <Group gap="xl" className="pt-3 border-t border-gray-100">
          {stats.map((stat, i) => (
            <Stack key={i} gap={0}>
              <Text fw={700} size="xl" className={stat.color || 'text-gray-800'}>{stat.value}</Text>
              <Text size="xs" className="text-gray-500">{stat.label}</Text>
            </Stack>
          ))}
        </Group>
      </Stack>
    </Card>
  )
}

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
      shadow="sm"
      padding="md"
      radius="xl"
      className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] bg-white"
      onClick={onClick}
    >
      <Stack gap="xs">
        <Group gap="sm" wrap="nowrap">
          <Box className={`w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-sm ${iconBg}`}>
            {icon}
          </Box>
          <Stack gap={0} className="flex-1 min-w-0">
            <Group gap="xs" wrap="nowrap">
              <Text fw={600} size="sm" className="text-gray-800">{title}</Text>
              {badge && <Badge size="xs" variant="filled" color="red" className="flex-shrink-0">{badge}</Badge>}
            </Group>
          </Stack>
          <Box className="text-gray-300 flex-shrink-0">
            <IconArrowRight size={14} />
          </Box>
        </Group>
        <Text size="xs" className="text-gray-500 pl-12">{description}</Text>
      </Stack>
    </Card>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const { progress, wrongBook } = useApp()

  const todayAccuracy = progress.todayQuestions > 0
    ? Math.round((progress.todayCorrect / progress.todayQuestions) * 100)
    : 0

  const mathAccuracy = progress.mathProgress.totalQuestions > 0
    ? Math.round((progress.mathProgress.correctAnswers / progress.mathProgress.totalQuestions) * 100)
    : 0

  const pinyinAccuracy = progress.pinyinProgress.totalQuestions > 0
    ? Math.round((progress.pinyinProgress.correctAnswers / progress.pinyinProgress.totalQuestions) * 100)
    : 0

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return { text: '早上好', icon: <IconSun size={20} />, iconBg: 'bg-amber-300' }
    if (hour < 18) return { text: '下午好', icon: <IconAfternoon size={20} />, iconBg: 'bg-orange-300' }
    return { text: '晚上好', icon: <IconMoon size={20} />, iconBg: 'bg-indigo-300' }
  }

  const greeting = getGreeting()

  return (
    <Stack gap="lg" className="px-1">
      {/* 顶部问候 */}
      <Box className="text-center py-4 animate-slide-up">
        <Group justify="center" gap="sm" mb="sm">
          <Box className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm ${greeting.iconBg}`}>
            {greeting.icon}
          </Box>
          <Text size="lg" className="text-gray-600">{greeting.text}</Text>
        </Group>
        <Title order={1} className="text-2xl sm:text-3xl font-bold text-gray-800">
          佳宜幼小衔接
        </Title>
        <Text className="text-gray-500" size="sm" mt={4}>
          数学 · 拼音 · 英语
        </Text>
      </Box>

      {/* 今日统计卡片 - 马卡龙渐变 */}
      <Card 
        shadow="md" 
        padding="lg"
        radius="xl" 
        className="text-white animate-slide-up stagger-1 hover:shadow-xl transition-shadow"
        style={{ background: 'linear-gradient(135deg, #FFB5C5 0%, #DCD0FF 50%, #AED9E0 100%)' }}
      >
        <div className="grid grid-cols-4 gap-3">
          <Stack align="center" gap={6}>
            <RingProgress
              size={52}
              thickness={5}
              roundCaps
              sections={[{ value: todayAccuracy, color: 'white' }]}
              label={
                <Text ta="center" fw={700} size="xs" className="text-white">
                  {todayAccuracy}%
                </Text>
              }
            />
            <Text size="xs" className="text-white/90">正确率</Text>
          </Stack>
          <Stack align="center" gap={6}>
            <Box className="w-12 h-12 rounded-xl bg-white/30 flex items-center justify-center backdrop-blur-sm">
              <Text fw={700} size="xl" className="text-white">{progress.todayQuestions}</Text>
            </Box>
            <Text size="xs" className="text-white/90">今日</Text>
          </Stack>
          <Stack align="center" gap={6}>
            <Box className="w-12 h-12 rounded-xl bg-white/30 flex items-center justify-center backdrop-blur-sm">
              <Text fw={700} size="xl" className="text-white">{progress.streak}</Text>
            </Box>
            <Text size="xs" className="text-white/90">连续</Text>
          </Stack>
          <Stack align="center" gap={6}>
            <Box className="w-12 h-12 rounded-xl bg-white/30 flex items-center justify-center backdrop-blur-sm">
              <Text fw={700} size="xl" className="text-white">{progress.totalQuestions}</Text>
            </Box>
            <Text size="xs" className="text-white/90">累计</Text>
          </Stack>
        </div>
      </Card>

      {/* 学习模块 */}
      <Box className="animate-slide-up stagger-2">
        <Group gap="sm" mb="sm">
          <Box className="w-6 h-6 rounded-lg flex items-center justify-center text-pink-500" style={{ backgroundColor: '#FFE4EC' }}>
            <IconMath size={14} />
          </Box>
          <Text size="sm" fw={600} className="text-gray-600">学习模块</Text>
        </Group>
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
          <ModuleCard
            title="数学乐园"
            subtitle="加减法 · 数感 · 应用"
            icon={<IconMath size={24} />}
            iconBg="bg-gradient-to-br from-orange-300 to-pink-400"
            stats={[
              { label: '已做', value: progress.mathProgress.totalQuestions, color: 'text-orange-500' },
              { label: '正确率', value: `${mathAccuracy}%`, color: mathAccuracy >= 70 ? 'text-emerald-500' : 'text-amber-500' },
            ]}
            onClick={() => navigate('/practice')}
          />
          
          <ModuleCard
            title="拼音天地"
            subtitle="韵母 · 声母 · 拼读"
            icon={<IconPinyin size={24} />}
            iconBg="bg-gradient-to-br from-purple-300 to-indigo-400"
            stats={[
              { label: '已学', value: progress.pinyinProgress.learnedPinyin.length, color: 'text-purple-500' },
              { label: '正确率', value: `${pinyinAccuracy}%`, color: pinyinAccuracy >= 70 ? 'text-emerald-500' : 'text-amber-500' },
            ]}
            onClick={() => navigate('/pinyin')}
          />

          <ModuleCard
            title="英语启蒙"
            subtitle="单词 · 句型 · 闪卡"
            icon={<IconEnglish size={24} />}
            iconBg="bg-gradient-to-br from-cyan-300 to-blue-400"
            stats={[
              { label: '已学', value: 0, color: 'text-cyan-500' },
              { label: '单词', value: '0个', color: 'text-blue-500' },
            ]}
            onClick={() => navigate('/english')}
          />
        </SimpleGrid>
      </Box>

      {/* 快捷功能 - 调整布局使文字显示完整 */}
      <Box className="animate-slide-up stagger-3">
        <Group gap="sm" mb="sm">
          <Box className="w-6 h-6 rounded-lg flex items-center justify-center text-amber-500" style={{ backgroundColor: '#FFF3CD' }}>
            <IconStar size={14} />
          </Box>
          <Text size="sm" fw={600} className="text-gray-600">快捷功能</Text>
        </Group>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
          <MenuCard
            title="闯关模式"
            description="挑战关卡赢取星星"
            icon={<IconChallenge size={16} />}
            iconBg="bg-gradient-to-br from-amber-300 to-orange-400"
            onClick={() => navigate('/challenge')}
          />
          <MenuCard
            title="错题本"
            description="复习错题巩固知识"
            icon={<IconWrongBook size={16} />}
            iconBg="bg-gradient-to-br from-rose-300 to-pink-400"
            onClick={() => navigate('/wrongbook')}
            badge={wrongBook.length > 0 ? `${wrongBook.length}` : undefined}
          />
          <MenuCard
            title="拼音表"
            description="完整字母表总览"
            icon={<IconTable size={16} />}
            iconBg="bg-gradient-to-br from-teal-300 to-cyan-400"
            onClick={() => navigate('/pinyin/table')}
          />
          <MenuCard
            title="设置"
            description="调整学习偏好"
            icon={<IconSettings size={16} />}
            iconBg="bg-gradient-to-br from-gray-300 to-slate-400"
            onClick={() => navigate('/settings')}
          />
        </SimpleGrid>
      </Box>

      {/* 连续学习提示 */}
      {progress.streak >= 3 && (
        <Card 
          shadow="sm" 
          padding="md" 
          radius="xl" 
          className="animate-slide-up stagger-4 hover:shadow-md transition-shadow"
          style={{ background: 'linear-gradient(135deg, #E8F5E9 0%, #E0F7FA 100%)' }}
        >
          <Group justify="center" gap="sm">
            <Box className="w-9 h-9 rounded-xl bg-emerald-400 flex items-center justify-center text-white shadow-sm">
              <IconCheck size={18} />
            </Box>
            <Text fw={500} size="sm" className="text-emerald-700">
              已连续学习 <span className="font-bold">{progress.streak}</span> 天，继续保持！
            </Text>
          </Group>
        </Card>
      )}

      {/* 底部间距 */}
      <Box className="h-4" />
    </Stack>
  )
}
