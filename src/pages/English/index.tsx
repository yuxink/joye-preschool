import { useNavigate } from 'react-router-dom'
import { 
  Card, 
  SimpleGrid, 
  Title, 
  Text, 
  Group, 
  Stack, 
  Box,
  Badge,
} from '@mantine/core'
import { IconArrowRight } from '../../components/Icons'
import { categoryLabels, WordCategory } from '../../data/english'

// 英文图标 - 地球加横线表示语言
function IconEnglish({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

// 闪卡图标
function IconFlashcard({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <line x1="6" y1="9" x2="18" y2="9" />
      <line x1="6" y1="13" x2="14" y2="13" />
    </svg>
  )
}

// 句型图标
function IconSentence({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="14" y2="18" />
    </svg>
  )
}

// 练习图标
function IconPractice({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
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
            {badge && <Badge size="xs" variant="filled" color="blue" className="flex-shrink-0">{badge}</Badge>}
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

interface CategoryCardProps {
  category: WordCategory
  onClick: () => void
}

function CategoryCard({ category, onClick }: CategoryCardProps) {
  const info = categoryLabels[category]
  const colorMap: Record<string, string> = {
    amber: 'from-amber-400 to-orange-500',
    pink: 'from-pink-400 to-rose-500',
    blue: 'from-blue-400 to-indigo-500',
    rose: 'from-rose-400 to-pink-500',
    cyan: 'from-cyan-400 to-teal-500',
    orange: 'from-orange-400 to-red-500',
    red: 'from-red-400 to-rose-500',
    indigo: 'from-indigo-400 to-purple-500',
    green: 'from-green-400 to-emerald-500',
    violet: 'from-violet-400 to-purple-500',
    emerald: 'from-emerald-400 to-teal-500',
    purple: 'from-purple-400 to-violet-500',
  }

  return (
    <Card
      shadow="none"
      padding="md"
      radius="xl"
      className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] bg-white border border-slate-100"
      onClick={onClick}
    >
      <Group gap="sm" wrap="nowrap">
        <Box className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorMap[info.color] || 'from-slate-400 to-slate-500'} flex items-center justify-center text-white shadow-md`}>
          <Text size="lg">{info.emoji}</Text>
        </Box>
        <Text fw={600} className="text-slate-800">{info.label}</Text>
      </Group>
    </Card>
  )
}

export default function English() {
  const navigate = useNavigate()

  const categories = Object.keys(categoryLabels) as WordCategory[]

  return (
    <Stack gap="lg" className="px-1">
      {/* 页面标题 */}
      <Box className="text-center py-4 animate-slide-up">
        <Group justify="center" gap="sm" mb="sm">
          <Box className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white shadow-lg">
            <IconEnglish size={26} />
          </Box>
        </Group>
        <Title order={2} className="text-xl font-bold text-slate-800">英语启蒙</Title>
        <Text c="dimmed" size="sm" mt={4}>单词 · 闪卡 · 句型</Text>
      </Box>

      {/* 学习功能 */}
      <Box className="animate-slide-up stagger-1">
        <Group gap="sm" mb="sm">
          <Box className="w-6 h-6 rounded-lg bg-cyan-100 flex items-center justify-center text-cyan-600">
            <IconEnglish size={14} />
          </Box>
          <Text size="sm" fw={600} c="dimmed" className="uppercase tracking-wide">学习功能</Text>
        </Group>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
          <MenuCard
            title="单词闪卡"
            description="卡片式学习单词"
            icon={<IconFlashcard size={18} />}
            iconBg="bg-gradient-to-br from-cyan-400 to-blue-500"
            onClick={() => navigate('/english/flashcard')}
          />
          <MenuCard
            title="常用句型"
            description="学习简单英语句子"
            icon={<IconSentence size={18} />}
            iconBg="bg-gradient-to-br from-violet-400 to-purple-500"
            onClick={() => navigate('/english/sentences')}
          />
          <MenuCard
            title="单词练习"
            description="测试单词掌握情况"
            icon={<IconPractice size={18} />}
            iconBg="bg-gradient-to-br from-emerald-400 to-green-500"
            onClick={() => navigate('/english/practice')}
          />
        </SimpleGrid>
      </Box>

      {/* 单词分类 */}
      <Box className="animate-slide-up stagger-2">
        <Group gap="sm" mb="sm">
          <Box className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
            <Text size="xs" fw={700}>Aa</Text>
          </Box>
          <Text size="sm" fw={600} c="dimmed" className="uppercase tracking-wide">单词分类</Text>
        </Group>
        <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="sm">
          {categories.map((category) => (
            <CategoryCard
              key={category}
              category={category}
              onClick={() => navigate(`/english/flashcard?category=${category}`)}
            />
          ))}
        </SimpleGrid>
      </Box>

      {/* 底部间距 */}
      <Box className="h-4" />
    </Stack>
  )
}
