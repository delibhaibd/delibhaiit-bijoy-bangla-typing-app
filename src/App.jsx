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

  const handleOpenRegister = () => {
    const url = 'https://www.delibhaiit.com/about?modal=register';
    const width = 540;
    const height = 740;
    const left = window.screen.width ? (window.screen.width - width) / 2 : 100;
    const top = window.screen.height ? (window.screen.height - height) / 2 : 100;
    window.open(url, 'deliBhaiRegisterPopup', `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes`);
  };

  const handleOpenLogin = () => {
    const url = 'https://www.delibhaiit.com/about?modal=login';
    const width = 540;
    const height = 740;
    const left = window.screen.width ? (window.screen.width - width) / 2 : 100;
    const top = window.screen.height ? (window.screen.height - height) / 2 : 100;
    window.open(url, 'deliBhaiLoginPopup', `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes`);
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
        onOpenLogin={handleOpenLogin}
        onOpenRegister={handleOpenRegister}
        onOpenAdminPanel={() => {
          if (user?.isAdmin) {
            setCurrentView('admin');
          }
        }}
      />

      {/* Main Page Header Banner: Visible on Main Lesson Selection, Hidden in Practice Mode */}
      {!isPracticeActive && (
        <header className="app-header">
          {currentView === 'admin' && user?.isAdmin ? (
            <p className="app-header-tagline admin-tagline">
              <span className="tagline-highlight admin">👑 এডমিন কন্ট্রোল সেন্টার</span> — <span className="tagline-sub">সিস্টেম পর্যবেক্ষণ, শিক্ষার্থী পরিসংখ্যান ও লেসন ব্যবস্থাপনা</span>
            </p>
          ) : (
            <div className="app-header-tagline-wrap">
              <h1 className="app-header-tagline single-line-bold">
                <span className="tagline-highlight">মাত্র ১২ ঘণ্টার প্র্যাক্টিসে</span> শিখুন কম্পিউটার কী-বোর্ড টাইপিং। কোন সূত্র মুখস্থ করা ছাড়াই শিখুন তিনটি ভাষা— <span className="tagline-lang en">ইংরেজি</span> <span className="tagline-divider">|</span> <span className="tagline-lang bn">বাংলা</span> <span className="tagline-divider">|</span> <span className="tagline-lang ar">আরবী</span>
              </h1>
            </div>
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

