import { useLocation, useNavigate } from 'react-router-dom'
import { Box, UnstyledButton, Stack, Text } from '@mantine/core'
import {
  IconHome,
  IconMath,
  IconPinyin,
  IconSettings,
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

interface NavItem {
  path: string
  label: string
  icon: React.ReactNode
  activeColor: string
}

const navItems: NavItem[] = [
  { path: '/', label: '首页', icon: <IconHome size={18} />, activeColor: 'bg-indigo-500' },
  { path: '/practice', label: '数学', icon: <IconMath size={18} />, activeColor: 'bg-orange-500' },
  { path: '/pinyin', label: '拼音', icon: <IconPinyin size={18} />, activeColor: 'bg-violet-500' },
  { path: '/english', label: '英语', icon: <IconEnglish size={18} />, activeColor: 'bg-cyan-500' },
  { path: '/settings', label: '设置', icon: <IconSettings size={18} />, activeColor: 'bg-slate-500' },
]

export default function Navigation() {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <Box 
      className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 z-50 safe-bottom"
      py="xs"
      px="sm"
    >
      <div className="flex justify-around items-center max-w-lg mx-auto">
        {navItems.map((item) => {
          const active = isActive(item.path)

          return (
            <UnstyledButton
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`
                flex flex-col items-center justify-center p-2 rounded-xl
                transition-all duration-200 min-w-[56px] touch-manipulation
                ${active ? '' : 'hover:bg-slate-50 active:scale-95'}
              `}
            >
              <Stack gap={4} align="center">
                <Box 
                  className={`
                    w-10 h-10 rounded-xl flex items-center justify-center
                    transition-all duration-200
                    ${active 
                      ? `${item.activeColor} text-white shadow-md scale-105` 
                      : 'bg-slate-100 text-slate-500'
                    }
                  `}
                >
                  {item.icon}
                </Box>
                <Text 
                  size="xs" 
                  fw={active ? 600 : 500}
                  className={`whitespace-nowrap transition-colors ${active ? 'text-slate-800' : 'text-slate-500'}`}
                >
                  {item.label}
                </Text>
              </Stack>
            </UnstyledButton>
          )
        })}
      </div>
    </Box>
  )
}
