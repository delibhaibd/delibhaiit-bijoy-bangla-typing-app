import { useState, useEffect } from 'react'
import { useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import TypingBoard from './components/TypingBoard'
import LoginModal from './components/LoginModal'
import AdminPanel from './components/AdminPanel'
import './App.css'

function App() {
  const { user } = useAuth();
  const [themeMode, setThemeMode] = useState('dark'); // 'dark', 'light', 'system'
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState('typing'); // 'typing' | 'admin'
  const [isPracticeActive, setIsPracticeActive] = useState(false);

  const isDarkMode = themeMode === 'system' 
    ? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    : themeMode === 'dark';

  useEffect(() => {
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Security Guard: General users can NEVER view or open the Admin Dashboard
  useEffect(() => {
    if (currentView === 'admin' && !user?.isAdmin) {
      setCurrentView('typing');
    }
  }, [currentView, user]);

  const toggleTheme = () => {
    setThemeMode(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="app-container">
      {/* Exact deliBhai IT Top Header Navbar */}
      <Navbar 
        themeMode={themeMode}
        setThemeMode={setThemeMode}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        currentView={currentView}
        onNavigateToTyping={() => setCurrentView('typing')}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onOpenRegister={() => setIsLoginModalOpen(true)}
        onOpenAdminPanel={() => {
          if (user?.isAdmin) {
            setCurrentView('admin');
          }
        }}
      />

      {/* Main Page Header Banner: Visible on Main Lesson Selection, Hidden in Practice Mode */}
      {!isPracticeActive && (
        <header className="app-header">
          <h1 
            className="brand-domain-title" 
            onClick={() => setCurrentView('typing')} 
            style={{ cursor: 'pointer' }}
            title="হোম পেজে ফিরুন"
          >
            Typing.deliBhaiit.com
          </h1>
          {currentView === 'admin' && user?.isAdmin ? (
            <p className="brand-domain-subtitle">
              👑 <span>এডমিন কন্ট্রোল সেন্টার</span> — সিস্টেম পর্যবেক্ষণ, শিক্ষার্থী পরিসংখ্যান ও লেসন ব্যবস্থাপনা
            </p>
          ) : (
            <p className="brand-domain-subtitle">
              মাত্র ১২ ঘন্টার প্র্যাক্টিসে শিখুন কম্পিউটার কী-বোর্ড টাইপিং। কোন সূত্র মুখস্থ করা ছাড়াই শিখুন তিনটি ভাষা- <span>ইংরেজি</span> | <span>বাংলা</span> | <span>আরবী</span>
            </p>
          )}
        </header>
      )}

      <main>
        {currentView === 'admin' && user?.isAdmin ? (
          <AdminPanel 
            isOpen={true}
            onClose={() => setCurrentView('typing')}
          />
        ) : (
          <TypingBoard 
            isDarkMode={isDarkMode} 
            onPracticeStateChange={setIsPracticeActive}
          />
        )}
      </main>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={(loggedInUser) => {
          if (loggedInUser?.isAdmin) {
            setCurrentView('admin');
          }
        }}
      />
    </div>
  )
}

export default App

