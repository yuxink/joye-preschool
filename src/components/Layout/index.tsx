import { Outlet } from 'react-router-dom'
import { Container, Box } from '@mantine/core'
import Header from './Header'
import Navigation from './Navigation'

export default function Layout() {
  return (
    <Box className="min-h-screen min-h-[100dvh] bg-[var(--color-background)]">
      {/* 固定顶部导航 */}
      <Header />
      
      {/* 主内容区域 - 添加顶部padding为header腾出空间 */}
      <Box 
        className="pt-14 pb-20 sm:pb-16"
        style={{ minHeight: 'calc(100vh - 56px)' }}
      >
        <Container 
          size="lg" 
          className="py-3 px-3 sm:py-4 sm:px-4 w-full"
        >
          <main>
            <Outlet />
          </main>
        </Container>
      </Box>
      
      {/* 固定底部导航 */}
      <Navigation />
    </Box>
  )
}
