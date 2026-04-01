import { useLocation, useNavigate } from 'react-router-dom'
import { Group, Title, ActionIcon, Box, Badge } from '@mantine/core'
import { useApp } from '../../stores/AppContext'
import {
  IconHome,
  IconMath,
  IconChallenge,
  IconWrongBook,
  IconSettings,
  IconPinyin,
  IconVowel,
  IconConsonant,
  IconWholeSyllable,
  IconTone,
  IconSpell,
  IconPractice,
  IconTable,
  IconFavorite,
  IconBack,
} from '../Icons'

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

interface PageInfo {
  title: string
  icon: React.ReactNode
  iconBg: string
}

const pageTitles: Record<string, PageInfo> = {
  '/': { title: '佳宜幼小衔接', icon: <IconHome size={16} />, iconBg: 'bg-indigo-500' },
  '/practice': { title: '数学练习', icon: <IconMath size={16} />, iconBg: 'bg-orange-500' },
  '/challenge': { title: '闯关模式', icon: <IconChallenge size={16} />, iconBg: 'bg-amber-500' },
  '/wrongbook': { title: '错题本', icon: <IconWrongBook size={16} />, iconBg: 'bg-rose-500' },
  '/settings': { title: '设置', icon: <IconSettings size={16} />, iconBg: 'bg-slate-500' },
  '/pinyin': { title: '拼音天地', icon: <IconPinyin size={16} />, iconBg: 'bg-violet-500' },
  '/pinyin/vowels': { title: '韵母学习', icon: <IconVowel size={16} />, iconBg: 'bg-rose-500' },
  '/pinyin/initials': { title: '声母学习', icon: <IconConsonant size={16} />, iconBg: 'bg-blue-500' },
  '/pinyin/whole': { title: '整体认读', icon: <IconWholeSyllable size={16} />, iconBg: 'bg-purple-500' },
  '/pinyin/tones': { title: '声调学习', icon: <IconTone size={16} />, iconBg: 'bg-emerald-500' },
  '/pinyin/spelling': { title: '拼读训练', icon: <IconSpell size={16} />, iconBg: 'bg-indigo-500' },
  '/pinyin/practice': { title: '拼音练习', icon: <IconPractice size={16} />, iconBg: 'bg-teal-500' },
  '/pinyin/table': { title: '拼音表', icon: <IconTable size={16} />, iconBg: 'bg-cyan-500' },
  '/pinyin/favorites': { title: '收藏夹', icon: <IconFavorite size={16} />, iconBg: 'bg-pink-500' },
  '/english': { title: '英语启蒙', icon: <IconEnglish size={16} />, iconBg: 'bg-cyan-500' },
  '/english/flashcard': { title: '单词闪卡', icon: <IconFlashcard size={16} />, iconBg: 'bg-cyan-500' },
  '/english/sentences': { title: '常用句型', icon: <IconSentence size={16} />, iconBg: 'bg-violet-500' },
  '/english/practice': { title: '单词练习', icon: <IconPractice size={16} />, iconBg: 'bg-emerald-500' },
}

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const { progress } = useApp()

  const isHome = location.pathname === '/'
  const pageInfo = pageTitles[location.pathname] || { title: '佳宜幼小衔接', icon: <IconHome size={16} />, iconBg: 'bg-indigo-500' }

  const handleBack = () => {
    if (location.pathname.startsWith('/pinyin/') && location.pathname !== '/pinyin') {
      navigate('/pinyin')
    } else if (location.pathname.startsWith('/english/') && location.pathname !== '/english') {
      navigate('/english')
    } else {
      navigate(-1)
    }
  }

  return (
    <Box 
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm"
      py="sm"
      px="md"
    >
      <Group justify="space-between" align="center" wrap="nowrap">
        <Group gap="sm" wrap="nowrap">
          {!isHome && (
            <ActionIcon 
              variant="subtle" 
              size="md" 
              radius="lg"
              onClick={handleBack}
              className="text-slate-500 hover:text-slate-700 hover:bg-slate-100 active:scale-95 transition-all"
            >
              <IconBack size={20} />
            </ActionIcon>
          )}
          <Group gap="sm" wrap="nowrap">
            <Box className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${pageInfo.iconBg}`}>
              {pageInfo.icon}
            </Box>
            <Title 
              order={1} 
              className="text-lg font-semibold text-slate-800 truncate"
            >
              {pageInfo.title}
            </Title>
          </Group>
        </Group>

        {isHome && progress.streak > 0 && (
          <Badge 
            size="md" 
            variant="light" 
            color="orange"
            className="font-medium"
          >
            连续{progress.streak}天
          </Badge>
        )}
      </Group>
    </Box>
  )
}
