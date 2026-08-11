import { useState, useEffect } from 'react'
import TypingBoard from './components/TypingBoard'
import OceanWaves from './components/OceanWaves'
import Rain from './components/Rain'
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
        <h1>ডেলিভাই আইটি ইনস্টিটিউট | বিজয় বায়ান্ন <span>বাংলা টাইপিং প্র্যাকটিস</span></h1>
        <p>ইংলিশ কীবোর্ডে বিজয় লেআউটের প্র্যাকটিস করুন</p>
      </header>
      <Rain />
      <OceanWaves />
      <main>
        <TypingBoard />
      </main>
    </div>
  )
}

export default App
