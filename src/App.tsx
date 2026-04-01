import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useApp } from './stores/AppContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Practice from './pages/Practice'
import Challenge from './pages/Challenge'
import WrongBook from './pages/WrongBook'
import Settings from './pages/Settings'
import PinyinHome from './pages/Pinyin'
import VowelsPage from './pages/Pinyin/VowelsPage'
import InitialsPage from './pages/Pinyin/InitialsPage'
import SpellingPage from './pages/Pinyin/SpellingPage'
import TablePage from './pages/Pinyin/TablePage'
import PinyinPracticePage from './pages/Pinyin/PracticePage'
import FavoritesPage from './pages/Pinyin/FavoritesPage'
import EnglishHome from './pages/English'
import FlashcardPage from './pages/English/FlashcardPage'
import SentencesPage from './pages/English/SentencesPage'
import EnglishPracticePage from './pages/English/PracticePage'

function App() {
  const { settings } = useApp()

  useEffect(() => {
    document.body.setAttribute('data-theme', settings.theme)
    document.body.setAttribute('data-font-size', settings.fontSize)
    document.documentElement.setAttribute('data-theme', settings.theme)
  }, [settings.theme, settings.fontSize])

  return (
    <div 
      data-theme={settings.theme} 
      data-font-size={settings.fontSize}
      className="min-h-screen"
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="practice" element={<Practice />} />
          <Route path="practice/:type" element={<Practice />} />
          <Route path="challenge" element={<Challenge />} />
          <Route path="challenge/:levelId" element={<Challenge />} />
          <Route path="wrongbook" element={<WrongBook />} />
          <Route path="settings" element={<Settings />} />
          <Route path="pinyin" element={<PinyinHome />} />
          <Route path="pinyin/vowels" element={<VowelsPage />} />
          <Route path="pinyin/initials" element={<InitialsPage />} />
          <Route path="pinyin/whole" element={<VowelsPage />} />
          <Route path="pinyin/tones" element={<VowelsPage />} />
          <Route path="pinyin/spelling" element={<SpellingPage />} />
          <Route path="pinyin/practice" element={<PinyinPracticePage />} />
          <Route path="pinyin/table" element={<TablePage />} />
          <Route path="pinyin/favorites" element={<FavoritesPage />} />
          <Route path="english" element={<EnglishHome />} />
          <Route path="english/flashcard" element={<FlashcardPage />} />
          <Route path="english/sentences" element={<SentencesPage />} />
          <Route path="english/practice" element={<EnglishPracticePage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
