import { useState, useEffect } from 'react'
import TypingBoard from './components/TypingBoard'
import SoundSettings from './components/SoundSettings'
import './App.css'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="app-container">
      <div className="top-controls">
        <SoundSettings />
        <div className="theme-toggle" onClick={toggleTheme}>
          {isDarkMode ? '☀️' : '🌙'}
        </div>
      </div>
      <header className="app-header">
        <h1 className="brand-domain-title">Typing.deliBhaiit.com</h1>
        <p className="brand-domain-subtitle">
          মাত্র ১২ ঘন্টার প্র্যাক্টিসে শিখুন কম্পিউটার কী-বোর্ড টাইপিং। কোন সূত্র মুখস্থ করা ছাড়াই শিখুন তিনটি ভাষা- <span>ইংরেজি</span> | <span>বাংলা</span> | <span>আরবী</span>
        </p>
      </header>
      <main>
        <TypingBoard isDarkMode={isDarkMode} />
      </main>
    </div>
  )
}

export default App
