import { useState } from 'react'
import { 
  Card, 
  Title, 
  Text, 
  Stack, 
  Button,
  Group,
  Switch,
  SegmentedControl,
  Modal,
  Divider,
  Box,
} from '@mantine/core'
import { useApp } from '../../stores/AppContext'
import type { FontSize } from '../../types'
import {
  IconSettings,
  IconRefresh,
  IconVolume,
  IconVolumeOff,
} from '../../components/Icons'

function IconTextSize({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="4 7 4 4 20 4 20 7" />
      <line x1="9" y1="20" x2="15" y2="20" />
      <line x1="12" y1="4" x2="12" y2="20" />
    </svg>
  )
}

function IconInfo({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  )
}

function IconPlay({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  )
}

function IconChart({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  )
}

function IconSpelling({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  )
}

export default function Settings() {
  const { settings, updateSettings, progress, resetAllData } = useApp()
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [showAbout, setShowAbout] = useState(false)

  const handleFontSizeChange = (value: string) => {
    updateSettings({ fontSize: value as FontSize })
  }

  const handleSoundToggle = () => {
    updateSettings({ soundEnabled: !settings.soundEnabled })
  }

  const handleSpellingHintToggle = () => {
    updateSettings({ showSpellingHint: !settings.showSpellingHint })
  }

  const handlePinyinSpeedChange = (value: string) => {
    updateSettings({ pinyinSpeed: value as 'slow' | 'normal' | 'fast' })
  }

  const handleReset = () => {
    resetAllData()
    setShowResetConfirm(false)
  }

  return (
    <Stack gap="md" className="px-1">
      {/* 顶部标题 */}
      <Box className="text-center py-2">
        <Group justify="center" gap="sm" mb="xs">
          <Box className="w-10 h-10 rounded-xl bg-slate-500 flex items-center justify-center text-white">
            <IconSettings size={22} />
          </Box>
        </Group>
        <Title order={2} className="text-xl font-semibold text-slate-800">
          设置
        </Title>
      </Box>

      <Card shadow="none" padding="lg" radius="xl" className="border border-slate-100 hover:shadow-md transition-shadow">
        <Stack gap="md">
          <Group justify="space-between" align="center">
            <Group gap="sm">
              <Box className={`w-9 h-9 rounded-lg flex items-center justify-center ${settings.soundEnabled ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                {settings.soundEnabled ? <IconVolume size={18} /> : <IconVolumeOff size={18} />}
              </Box>
              <Stack gap={0}>
                <Text fw={600} className="text-slate-800">声音效果</Text>
                <Text size="xs" c="dimmed">语音朗读和提示音</Text>
              </Stack>
            </Group>
            <Switch
              checked={settings.soundEnabled}
              onChange={handleSoundToggle}
              size="lg"
              color="indigo"
            />
          </Group>
        </Stack>
      </Card>

      <Card shadow="none" padding="lg" radius="xl" className="border border-slate-100 hover:shadow-md transition-shadow">
        <Stack gap="md">
          <Group gap="sm">
            <Box className="w-9 h-9 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600">
              <IconPlay size={18} />
            </Box>
            <Stack gap={0}>
              <Text fw={600} className="text-slate-800">拼音发音速度</Text>
              <Text size="xs" c="dimmed">调整拼音朗读速度</Text>
            </Stack>
          </Group>
          
          <SegmentedControl
            value={settings.pinyinSpeed}
            onChange={handlePinyinSpeedChange}
            data={[
              { label: '慢速', value: 'slow' },
              { label: '正常', value: 'normal' },
              { label: '快速', value: 'fast' },
            ]}
            fullWidth
            color="violet"
          />
        </Stack>
      </Card>

      <Card shadow="none" padding="lg" radius="xl" className="border border-slate-100 hover:shadow-md transition-shadow">
        <Stack gap="md">
          <Group justify="space-between" align="center">
            <Group gap="sm">
              <Box className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                <IconSpelling size={18} />
              </Box>
              <Stack gap={0}>
                <Text fw={600} className="text-slate-800">拼读提示</Text>
                <Text size="xs" c="dimmed">显示声母韵母拼读提示</Text>
              </Stack>
            </Group>
            <Switch
              checked={settings.showSpellingHint}
              onChange={handleSpellingHintToggle}
              size="lg"
              color="indigo"
            />
          </Group>
        </Stack>
      </Card>

      <Card shadow="none" padding="lg" radius="xl" className="border border-slate-100 hover:shadow-md transition-shadow">
        <Stack gap="md">
          <Group gap="sm">
            <Box className="w-9 h-9 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
              <IconTextSize size={18} />
            </Box>
            <Stack gap={0}>
              <Text fw={600} className="text-slate-800">字体大小</Text>
              <Text size="xs" c="dimmed">调整文字显示大小</Text>
            </Stack>
          </Group>
          
          <SegmentedControl
            value={settings.fontSize}
            onChange={handleFontSizeChange}
            data={[
              { label: '小', value: 'small' },
              { label: '中', value: 'medium' },
              { label: '大', value: 'large' },
            ]}
            fullWidth
            color="orange"
          />

          <Box 
            className="p-3 bg-slate-50 rounded-xl text-center text-slate-600"
            style={{ 
              fontSize: settings.fontSize === 'small' ? '14px' 
                : settings.fontSize === 'large' ? '22px' 
                : '18px' 
            }}
          >
            预览：1 + 2 = 3 | bā mā
          </Box>
        </Stack>
      </Card>

      <Card shadow="none" padding="lg" radius="xl" className="border border-slate-100 hover:shadow-md transition-shadow">
        <Stack gap="md">
          <Group gap="sm">
            <Box className="w-9 h-9 rounded-lg bg-cyan-100 flex items-center justify-center text-cyan-600">
              <IconChart size={18} />
            </Box>
            <Text fw={600} className="text-slate-800">学习统计</Text>
          </Group>
          <Divider />
          
          <Group justify="space-between">
            <Text c="dimmed">累计做题</Text>
            <Text fw={600} className="text-slate-800">{progress.totalQuestions} 题</Text>
          </Group>
          
          <Group justify="space-between">
            <Text c="dimmed">数学做题</Text>
            <Text fw={600} className="text-orange-500">{progress.mathProgress.totalQuestions} 题</Text>
          </Group>

          <Group justify="space-between">
            <Text c="dimmed">拼音练习</Text>
            <Text fw={600} className="text-purple-500">{progress.pinyinProgress.totalQuestions} 题</Text>
          </Group>

          <Group justify="space-between">
            <Text c="dimmed">英语练习</Text>
            <Text fw={600} className="text-cyan-500">{progress.englishProgress?.totalQuestions || 0} 题</Text>
          </Group>

          <Group justify="space-between">
            <Text c="dimmed">已学拼音</Text>
            <Text fw={600} className="text-blue-500">{progress.pinyinProgress.learnedPinyin.length} 个</Text>
          </Group>
          
          <Group justify="space-between">
            <Text c="dimmed">累计正确率</Text>
            <Text fw={600} className="text-emerald-500">
              {progress.totalQuestions > 0 
                ? Math.round((progress.correctAnswers / progress.totalQuestions) * 100)
                : 0
              }%
            </Text>
          </Group>
          
          <Group justify="space-between">
            <Text c="dimmed">连续学习</Text>
            <Text fw={600} className="text-amber-500">{progress.streak} 天</Text>
          </Group>
        </Stack>
      </Card>

      <Card shadow="none" padding="lg" radius="xl" className="border border-slate-100 hover:shadow-md transition-shadow">
        <Stack gap="md">
          <Button
            variant="light"
            color="blue"
            leftSection={<IconInfo size={18} />}
            onClick={() => setShowAbout(true)}
            className="hover:scale-[1.01] active:scale-[0.99] transition-transform"
          >
            关于佳宜幼小衔接
          </Button>

          <Button
            variant="light"
            color="red"
            leftSection={<IconRefresh size={18} />}
            onClick={() => setShowResetConfirm(true)}
            className="hover:scale-[1.01] active:scale-[0.99] transition-transform"
          >
            重置所有数据
          </Button>
        </Stack>
      </Card>

      <Modal
        opened={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        title="确认重置"
        centered
        radius="lg"
      >
        <Stack gap="md">
          <Text>确定要重置所有数据吗？</Text>
          <Text size="sm" c="dimmed">
            这将清除所有学习记录、错题本、闯关进度和拼音学习进度，此操作无法撤销。
          </Text>
          <Group justify="flex-end">
            <Button variant="light" onClick={() => setShowResetConfirm(false)}>
              取消
            </Button>
            <Button color="red" onClick={handleReset}>
              确认重置
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Modal
        opened={showAbout}
        onClose={() => setShowAbout(false)}
        title="关于佳宜幼小衔接"
        centered
        radius="lg"
        size="md"
      >
        <Stack gap="md">
          <Text fw={700} size="xl" className="text-center text-indigo-600">
            佳宜幼小衔接
          </Text>
          <Text ta="center" c="dimmed">版本 3.0.0</Text>
          
          <Divider />
          
          <Text size="sm">
            佳宜幼小衔接是一款专为6岁准小学生设计的综合启蒙学习应用，
            涵盖数学、拼音、英语三大学科，帮助孩子轻松完成幼小衔接，
            为小学学习打下坚实基础。
          </Text>
          
          <Text size="sm" fw={600} className="text-orange-600">🔢 数学乐园</Text>
          <Stack gap={4}>
            <Text size="sm">• 10/20以内加减法、混合运算</Text>
            <Text size="sm">• 数字分解与组合</Text>
            <Text size="sm">• 相邻数、比大小、数数</Text>
            <Text size="sm">• 生活应用题、数字规律</Text>
            <Text size="sm">• 闯关模式、错题本复习</Text>
          </Stack>

          <Text size="sm" fw={600} className="text-purple-600">📖 拼音天地</Text>
          <Stack gap={4}>
            <Text size="sm">• 单韵母、复韵母、鼻韵母</Text>
            <Text size="sm">• 23个声母（含平翘舌）</Text>
            <Text size="sm">• 16个整体认读音节</Text>
            <Text size="sm">• 四声调学习与辨别</Text>
            <Text size="sm">• 两拼法、三拼法拼读训练</Text>
            <Text size="sm">• 拼音选字、字选拼音练习</Text>
          </Stack>

          <Text size="sm" fw={600} className="text-cyan-600">🌍 英语启蒙</Text>
          <Stack gap={4}>
            <Text size="sm">• 200+常用英语单词</Text>
            <Text size="sm">• 18个主题分类（动物、颜色、家庭等）</Text>
            <Text size="sm">• 单词闪卡学习</Text>
            <Text size="sm">• 10大类常用句型</Text>
            <Text size="sm">• 单词练习与测试</Text>
          </Stack>

          <Text size="sm" fw={600} className="text-emerald-600">✨ 特色功能</Text>
          <Stack gap={4}>
            <Text size="sm">• 纯离线使用，无需联网</Text>
            <Text size="sm">• 可爱音效反馈，激励学习</Text>
            <Text size="sm">• 学习进度自动保存</Text>
            <Text size="sm">• 支持微信浏览器访问</Text>
            <Text size="sm">• 可打包为桌面应用</Text>
          </Stack>

          <Divider />
          
          <Text size="xs" c="dimmed" ta="center">
            用爱陪伴成长，用心启迪智慧 💕
          </Text>
          <Text size="xs" c="dimmed" ta="center">
            让学习变得简单有趣！
          </Text>
        </Stack>
      </Modal>

      {/* 底部间距 */}
      <Box className="h-4" />
    </Stack>
  )
}
