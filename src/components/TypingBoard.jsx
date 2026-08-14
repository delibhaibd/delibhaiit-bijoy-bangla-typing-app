import React, { useState, useEffect, useCallback, useRef } from 'react';
import { categories } from '../data/lessons';
import { englishCategories } from '../data/englishLessons';
import { arabicCategories } from '../data/arabicLessons';
import { useSound } from '../hooks/useSound';
import { getFingerForKey } from '../utils/fingerMapping';
import VirtualKeyboard from './VirtualKeyboard';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';
import confetti from 'canvas-confetti';
import { applyPageBackground } from '../utils/generator';

export default function TypingBoard({ isDarkMode = true }) {
    const { user, logout } = useAuth();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const [typingMode, setTypingMode] = useState('bn');
    const activeCategories = typingMode === 'bn' ? categories : (typingMode === 'ar' ? arabicCategories : englishCategories);
    const [currentCategoryId, setCurrentCategoryId] = useState(activeCategories[0].id);
    const [currentSubLessonId, setCurrentSubLessonId] = useState(null);
    const [completedLessons, setCompletedLessons] = useState({});
    const uiWrapperRef = useRef(null);

    useEffect(() => {
        if (currentSubLessonId && uiWrapperRef.current) {
            setTimeout(() => {
                uiWrapperRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }, [currentSubLessonId]);

    // Load completed lessons based on user
    useEffect(() => {
        const storageKey = user ? `bijoyCompletedLessons_${user.id}` : 'bijoyCompletedLessons_guest';
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            const parsed = JSON.parse(saved);
            // Migration: if it was an array, convert to empty object
            if (Array.isArray(parsed)) {
                setCompletedLessons({});
            } else {
                setCompletedLessons(parsed);
            }
        } else {
            setCompletedLessons({});
        }
    }, [user]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [wrongIndex, setWrongIndex] = useState(-1);
    const [currentKey, setCurrentKey] = useState('-');
    const [startTime, setStartTime] = useState(null);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [totalKeystrokes, setTotalKeystrokes] = useState(0);
    const [correctKeystrokes, setCorrectKeystrokes] = useState(0);
    const [hasError, setHasError] = useState(false);
    const [errorIndex, setErrorIndex] = useState(-1);
    const [feedbackKey, setFeedbackKey] = useState(null);
    const [completed, setCompleted] = useState(false);
    const [timeSpent, setTimeSpent] = useState('0:00');
    const [timeLeft, setTimeLeft] = useState(60);

    const { playCorrectSound, playErrorSound } = useSound();

    const currentCategory = activeCategories.find(c => c.id === currentCategoryId);
    const currentSubLesson = currentCategory?.subLessons.find(sl => sl.id === currentSubLessonId);
    const rawLessonData = currentSubLesson ? currentSubLesson.sequence : [];

    const lessonData = React.useMemo(() => {
        if (currentCategoryId !== 'conjuncts') return rawLessonData;

        const counts = {};
        return rawLessonData.map(item => {
            const char = item.char || item.bn;
            if (char === ' ') return item;
            counts[char] = (counts[char] || 0) + 1;
            
            if (counts[char] <= 2) {
                return { ...item, isRandom: false };
            } else {
                return { ...item, isRandom: true };
            }
        });
    }, [rawLessonData, currentCategoryId]);

    const practicePageBounds = React.useMemo(() => {
        if (currentCategoryId !== 'practice') return [];
        const MAX_CHARS = 40;
        const bounds = [];
        let startIndex = 0;
        let currentLength = 0;
        let lastSpaceIndex = -1;

        for (let i = 0; i < lessonData.length; i++) {
            currentLength++;
            const char = lessonData[i].bn || lessonData[i].char;
            if (char === ' ') {
                lastSpaceIndex = i;
            }

            if (currentLength >= MAX_CHARS && i < lessonData.length - 1) {
                if (lastSpaceIndex !== -1 && lastSpaceIndex > startIndex) {
                    bounds.push({ start: startIndex, end: lastSpaceIndex + 1 });
                    startIndex = lastSpaceIndex + 1;
                    currentLength = i - startIndex + 1;
                } else {
                    bounds.push({ start: startIndex, end: i + 1 });
                    startIndex = i + 1;
                    currentLength = 0;
                }
            }
        }
        if (startIndex < lessonData.length) {
            bounds.push({ start: startIndex, end: lessonData.length });
        }
        return bounds;
    }, [lessonData, currentCategoryId]);

    const screenBounds = React.useMemo(() => {
        if (!currentSubLesson?.screens) return [];
        const bounds = [];
        let startIndex = 0;
        for (const screen of currentSubLesson.screens) {
            const len = screen.text.length;
            bounds.push({ start: startIndex, end: startIndex + len, title: screen.title, isSentence: screen.isSentence });
            startIndex += len;
        }
        return bounds;
    }, [currentSubLesson]);

    // Save completed lessons
    useEffect(() => {
        const storageKey = user ? `bijoyCompletedLessons_${user.id}` : 'bijoyCompletedLessons_guest';
        localStorage.setItem(storageKey, JSON.stringify(completedLessons));
    }, [completedLessons, user]);

    // Change background pattern dynamically on every page / category / screen switch
    useEffect(() => {
        let screenOrPage = 0;
        let screenTitle = '';
        if (currentCategoryId === 'practice') {
            const effectiveIndex = hasError ? errorIndex : currentIndex;
            const idx = practicePageBounds.findIndex(b => effectiveIndex >= b.start && effectiveIndex < b.end);
            screenOrPage = idx >= 0 ? idx : 0;
        } else if (currentSubLesson?.screens) {
            const effectiveIndex = hasError ? errorIndex : currentIndex;
            const idx = screenBounds.findIndex(b => effectiveIndex >= b.start && effectiveIndex < b.end);
            screenOrPage = idx >= 0 ? idx : 0;
            screenTitle = currentSubLesson.screens[screenOrPage]?.title || '';
        } else if (currentSubLessonId) {
            const effectiveIndex = hasError ? errorIndex : currentIndex;
            screenOrPage = Math.floor(effectiveIndex / 14);
        }

        const pageKey = `${typingMode}_${currentCategoryId}_${currentSubLessonId || 'menu'}_p${screenOrPage}_${screenTitle}`;

        applyPageBackground(pageKey, isDarkMode);
    }, [typingMode, currentCategoryId, currentSubLessonId, currentIndex, hasError, errorIndex, currentSubLesson, practicePageBounds, screenBounds, isDarkMode]);

    // Reset practice states when sub-lesson changes
    useEffect(() => {
        setCurrentIndex(0);
        setSubIndex(0);
        setCompleted(false);
        setStartTime(null);
        setWpm(0);
        setAccuracy(0);
        setTotalKeystrokes(0);
        setCorrectKeystrokes(0);
        setHasError(false);
        setErrorIndex(-1);
        setCurrentKey('-');
        setWrongIndex(-1);
        setTimeLeft(60);
    }, [currentSubLessonId]);

    const handleNextLesson = useCallback(() => {
        const currentIndex = currentCategory?.subLessons.findIndex(s => s.id === currentSubLessonId);
        if (currentIndex >= 0 && currentIndex + 1 < currentCategory.subLessons.length) {
            setCurrentSubLessonId(currentCategory.subLessons[currentIndex + 1].id);
        } else {
            setCurrentSubLessonId(null);
        }
    }, [currentCategory, currentSubLessonId]);

    const handleRetryLesson = useCallback(() => {
        setCurrentIndex(0);
        setSubIndex(0);
        setStartTime(null);
        setWpm(0);
        setAccuracy(0);
        setCompleted(false);
        setTotalKeystrokes(0);
        setCorrectKeystrokes(0);
        setHasError(false);
        setErrorIndex(-1);
        setCurrentKey('-');
        setWrongIndex(-1);
        setTimeSpent('0:00');
        setTimeLeft(60);
    }, []);

    const handleComplete = useCallback((charsDone) => {
        setCompleted(true);
        
        // Firework animation
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

        const interval = setInterval(function() {
            const timeLeftForAnim = animationEnd - Date.now();
            if (timeLeftForAnim <= 0) return clearInterval(interval);
            const particleCount = 50 * (timeLeftForAnim / duration);
            confetti({
                ...defaults, particleCount,
                origin: { x: Math.random() * (0.8 - 0.2) + 0.2, y: Math.random() - 0.2 }
            });
        }, 250);
        
        // Calculate final stats
        const timeInMs = startTime ? (Date.now() - startTime) : 1000;
        const timeInMinutes = timeInMs / 60000;
        const words = charsDone / 5;
        const finalWpm = Math.round(words / timeInMinutes) || 0;
        const finalAcc = totalKeystrokes === 0 ? 100 : Math.round(((correctKeystrokes) / (totalKeystrokes)) * 100);
        
        // Format time to m:ss
        const totalSeconds = Math.floor(timeInMs / 1000);
        const m = Math.floor(totalSeconds / 60);
        const s = (totalSeconds % 60).toString().padStart(2, '0');
        const timeString = `${m}:${s}`;
        
        setWpm(finalWpm);
        setAccuracy(finalAcc);
        setTimeSpent(timeString);
        
        // Save progress
        setCompletedLessons(prev => ({
            ...prev,
            [currentSubLessonId]: {
                status: 'completed',
                wpm: finalWpm,
                accuracy: finalAcc,
                time: timeString
            }
        }));
    }, [startTime, totalKeystrokes, correctKeystrokes, currentSubLessonId]);

    const latestStateRef = useRef({ handleComplete, currentIndex });
    useEffect(() => {
        latestStateRef.current = { handleComplete, currentIndex };
    }, [handleComplete, currentIndex]);

    // Timer effect for 60s challenge
    useEffect(() => {
        let timer;
        if (currentSubLessonId === 'all-consonants' && startTime && !completed) {
            timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        if (latestStateRef.current) {
                            latestStateRef.current.handleComplete(latestStateRef.current.currentIndex);
                        }
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [currentSubLessonId, startTime, completed]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!currentSubLessonId) return; // Not in practice mode
            
            if (completed) {
                if (e.key === 'Enter') handleNextLesson();
                if (e.key.toLowerCase() === 'r') handleRetryLesson();
                return;
            }
            
            // Ignore modifiers
            if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab'].includes(e.key)) return;
            // Prevent scrolling on space
            if (e.key === ' ') e.preventDefault();
            
            if (currentIndex >= lessonData.length) return;
            if (!startTime) setStartTime(Date.now());

            // Handle Backspace for correction
            if (e.key === 'Backspace') {
                if (hasError) {
                    setHasError(false);
                    setErrorIndex(-1);
                    // Do NOT reset subIndex. The user just re-types the current key.
                } else if (subIndex > 0) {
                    // Allow undoing correct keys within the current cluster
                    setSubIndex(prev => prev - 1);
                }
                return;
            }

            // Block further typing if there's an uncorrected error
            if (hasError) {
                playErrorSound();
                return;
            }

            setCurrentKey(e.key === ' ' ? 'Space' : e.key);
            setTotalKeystrokes(prev => prev + 1);

            const expectedItem = lessonData[currentIndex];
            const expectedKeys = expectedItem.keys || [expectedItem.key];
            const currentExpectedKey = expectedKeys[subIndex];

            if (e.key === currentExpectedKey) {
                // Correct key
                playCorrectSound();
                setCorrectKeystrokes(prev => prev + 1);
                
                setFeedbackKey({ key: e.key, status: 'correct' });
                setTimeout(() => setFeedbackKey(null), 200);
                
                if (subIndex + 1 < expectedKeys.length) {
                    setSubIndex(prev => prev + 1);
                    setWrongIndex(-1);
                } else {
                    setCurrentIndex(prev => prev + 1);
                    setSubIndex(0);
                    setWrongIndex(-1);
                    if (currentIndex + 1 === lessonData.length) {
                        handleComplete(currentIndex + 1);
                    }
                }
            } else {
                // Wrong key
                playErrorSound();
                setHasError(true);
                setErrorIndex(currentIndex);
                // Do NOT advance currentIndex or reset subIndex on error!
                
                setFeedbackKey({ key: e.key, status: 'wrong' });
                setTimeout(() => setFeedbackKey(null), 200);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, subIndex, startTime, lessonData, completed, currentSubLessonId, playCorrectSound, playErrorSound, totalKeystrokes, correctKeystrokes, hasError, errorIndex, handleNextLesson, handleRetryLesson]);

    useEffect(() => {
        const activeCharBox = document.querySelector('.char-box.active');
        if (activeCharBox) {
            activeCharBox.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }, [currentIndex, hasError, currentSubLessonId]);

    const getHint = (key) => {
        if (key === ' ') return 'Space';
        if (key.length === 1 && key !== key.toLowerCase() && /[A-Z]/.test(key)) {
            return `Shift + ${key.toLowerCase()}`;
        }
        const shiftSymbols = { '{': 'Shift + [', '}': 'Shift + ]', '|': 'Shift + \\', ':': 'Shift + ;', '"': 'Shift + \'', '<': 'Shift + ,', '>': 'Shift + .', '?': 'Shift + /' };
        if (shiftSymbols[key]) return shiftSymbols[key];
        return key;
    };

    const getBnHint = (key) => {
        const bijoyToBanglaMap = {
            'j': 'ক', 'J': 'খ', 'o': 'গ', 'O': 'ঘ', 'q': 'ঙ',
            'y': 'চ', 'Y': 'ছ', 'u': 'জ', 'U': 'ঝ', 'I': 'ঞ',
            't': 'ট', 'T': 'ঠ', 'e': 'ড', 'E': 'ঢ', 'B': 'ণ',
            'k': 'ত', 'K': 'থ', 'l': 'দ', 'L': 'ধ', 'b': 'ন',
            'r': 'প', 'R': 'ফ', 'h': 'ব', 'H': 'ভ', 'm': 'ম',
            'w': 'য', 'v': 'র', 'V': 'ল', 'M': 'শ', 'N': 'ষ',
            'n': 'স', 'i': 'হ', 'p': 'ড়', 'P': 'ঢ়', 'W': 'য়',
            '\\': 'ৎ', 'Q': 'ং', '|': 'ঃ', '&': 'ঁ',
            'g': '্', 'G': '।',
            'F': 'অ', 'f': 'া', 'd': 'ি', 'D': 'ী',
            's': 'ু', 'S': 'ূ', 'a': 'ৃ',
            'c': 'ে', 'C': 'ৈ', 'x': 'ও', 'X': 'ৗ',
            'Z': '্য', 'z': '্র'
        };
        return bijoyToBanglaMap[key] || key;
    };

    const getArHint = (key) => {
        const arMap = {
            '`': 'ذ', '~': 'ّ', '1': '١', '!': '!', '2': '٢', '@': '@', '3': '٣', '#': '#',
            '4': '٤', '$': '$', '5': '٥', '%': '%', '6': '٦', '^': '^', '7': '٧', '&': '&',
            '8': '٨', '*': '*', '9': '٩', '(': '(', '0': '٠', ')': ')', '-': '-', '_': '_',
            '=': '=', '+': '+',
            'q': 'ض', 'Q': 'َ', 'w': 'ص', 'W': 'ً', 'e': 'ث', 'E': 'ُ', 'r': 'ق', 'R': 'ٌ',
            't': 'ف', 'T': 'لإ', 'y': 'غ', 'Y': 'إ', 'u': 'ع', 'U': '`', 'i': 'ه', 'I': '÷',
            'o': 'خ', 'O': '×', 'p': 'ح', 'P': '؛', '[': 'ج', '{': '<', ']': 'د', '}': '>',
            '\\': '\\', '|': '|',
            'a': 'ش', 'A': 'ِ', 's': 'س', 'S': 'ٍ', 'd': 'ي', 'D': ']', 'f': 'ب', 'F': '[',
            'g': 'ل', 'G': 'لأ', 'h': 'ا', 'H': 'أ', 'j': 'ت', 'J': 'ـ', 'k': 'ن', 'K': '،',
            'l': 'م', 'L': '/', ';': 'ك', ':': ':', "'": 'ط', '"': '"',
            'z': 'ظ', 'Z': '~', 'x': 'ز', 'X': 'ْ', 'c': 'و', 'C': '}', 'v': 'ة', 'V': '{',
            'b': 'ى', 'B': 'لآ', 'n': 'لا', 'N': 'آ', 'm': 'ر', 'M': '\'', ',': 'ؤ', '<': ',',
            '.': 'ء', '>': '.', '/': 'ئ', '?': '؟',
            ' ': 'Space'
        };
        return arMap[key] || key;
    };

    const expectedItem = lessonData[currentIndex];
    const expectedKeys = expectedItem ? (expectedItem.keys || [expectedItem.key]) : [];
    let currentExpectedKey = expectedKeys[subIndex];

    if (hasError) {
        currentExpectedKey = 'Backspace';
    }

    const handleCategoryClick = (catId) => {
        setCurrentCategoryId(catId);
        setCurrentSubLessonId(null);
    };

    return (
        <div className="typing-layout-wrapper">
            {!currentSubLessonId && (
                <aside className="sidebar">
                <div className="sidebar-title">মেনু</div>
                <div className="sidebar-mode-toggle" style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '500' }}>টাইপিং মোড নির্বাচন করুন</label>
                    <div style={{ position: 'relative' }}>
                        <select 
                            className="sidebar-btn" 
                            style={{ 
                                width: '100%', 
                                appearance: 'none', 
                                textAlign: 'left', 
                                paddingRight: '30px',
                                background: 'var(--surface)',
                                cursor: 'pointer',
                                fontSize: '1rem'
                            }}
                            value={typingMode}
                            onChange={(e) => {
                                const mode = e.target.value;
                                setTypingMode(mode);
                                setCurrentCategoryId(
                                    mode === 'bn' 
                                        ? categories[0].id 
                                        : mode === 'ar' 
                                            ? arabicCategories[0].id 
                                            : englishCategories[0].id
                                );
                                setCurrentSubLessonId(null);
                            }}
                        >
                            <option value="bn">বাংলা টাইপিং (Bengali)</option>
                            <option value="en">ইংরেজি টাইপিং (English)</option>
                            <option value="ar">আরবি টাইপিং (Arabic)</option>
                        </select>
                        <div style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--primary)', fontSize: '0.8rem' }}>
                            ▼
                        </div>
                    </div>
                </div>
                <div className="sidebar-buttons">
                    {activeCategories.map(cat => (
                        <button 
                            key={cat.id}
                            className={`sidebar-btn ${currentCategoryId === cat.id ? 'active' : ''}`}
                            onClick={() => handleCategoryClick(cat.id)}
                        >
                            {cat.title}
                        </button>
                    ))}
                </div>
                
                {/* 
                <div className="sidebar-auth-section" style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
                    {user ? (
                        <div className="user-profile">
                            <div style={{ fontSize: '0.9rem', marginBottom: '8px' }}>লগড ইন: <br/><strong>{user.email}</strong></div>
                            <button className="sidebar-btn" onClick={logout} style={{ background: 'var(--surface-hover)', color: 'var(--text-main)' }}>লগআউট</button>
                        </div>
                    ) : (
                        <button className="sidebar-btn" onClick={() => setIsLoginModalOpen(true)} style={{ background: 'var(--primary)', color: 'white' }}>
                            লগইন করুন
                        </button>
                    )}
                </div>
                */}
            </aside>
            )}
            
            <div className="typing-board-container">
                {!currentSubLessonId ? (
                    <div className="sub-lesson-list">
                        <h2>{currentCategory?.title} - প্র্যাকটিস তালিকা</h2>
                        <p className="sub-lesson-subtitle">আপনার পছন্দমত লেসন বেছে নিয়ে টাইপিং শুরু করুন</p>
                        
                        <div className="progressive-buttons-container">
                            {currentCategory?.subLessons.map((subLesson, index) => {
                                const lessonStats = completedLessons[subLesson.id];
                                const isCompleted = lessonStats?.status === 'completed';
                                
                                return (
                                    <div key={subLesson.id} className="lesson-card">
                                        <div className="lesson-card-main">
                                            <div className="lesson-card-header">
                                                <div className="lesson-card-title-area">
                                                    <span className="lesson-number">{index + 1}</span>
                                                    <span className="lesson-title">{subLesson.title}</span>
                                                </div>
                                                <button 
                                                    className={`lesson-action-btn ${isCompleted ? 'resume-btn' : 'start-btn'}`}
                                                    onClick={() => setCurrentSubLessonId(subLesson.id)}
                                                >
                                                    {isCompleted ? '▶ Resume' : '▶ Start'}
                                                </button>
                                            </div>
                                            
                                            <div className="lesson-card-divider"></div>

                                            <div className="lesson-stats">
                                                <span className="stat-item">Avg Speed: {lessonStats ? lessonStats.wpm : '--'} WPM</span>
                                                <span className="stat-item">Avg Acc: {lessonStats ? lessonStats.accuracy : '--'}%</span>
                                                <span className="stat-item">Time: {lessonStats ? lessonStats.time : '--:--'}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="lesson-progress-bar">
                                            {Array.from({ length: 10 }).map((_, i) => (
                                                <div 
                                                    key={i} 
                                                    className={`progress-segment ${isCompleted ? 'filled' : ''}`}
                                                ></div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div ref={uiWrapperRef} className="typing-ui-wrapper" style={{ width: '100%', maxWidth: '100%', margin: '0', display: 'flex', flexDirection: 'column', scrollMarginTop: '20px' }}>
                        <div className="practice-header">
                            <button className="back-btn" onClick={() => setCurrentSubLessonId(null)}>← ফিরে যান</button>
                            <h3>{currentSubLesson?.title}</h3>
                        </div>

                        <div className="keyboard-info">
                            {hasError ? (
                                <div className="error-alert-box">
                                    <span className="error-icon">⚠️</span>
                                    <div className="error-alert-text">
                                        <strong>ভুল হয়েছে!</strong> 
                                        <span>ঠিক করতে কীবোর্ডের <kbd>Backspace</kbd> বাটন চাপুন</span>
                                    </div>
                                </div>
                            ) : (
                                <p className="instruction">নির্দেশনা: কীবোর্ডে হাইলাইট করা বাটনটি চাপুন</p>
                            )}
                        </div>

                        <div className="stats-panel">
                            <div className="stat-box">
                                <span className="stat-label">গতি (WPM)</span>
                                <span className="stat-value">{wpm}</span>
                            </div>
                            {currentSubLessonId === 'all-consonants' ? (
                                <div className="stat-box">
                                    <span className="stat-label">সময় বাকি</span>
                                    <span className="stat-value" style={{ color: '#ef4444', fontWeight: 'bold' }}>{timeLeft}s</span>
                                </div>
                            ) : (
                                <div className="stat-box">
                                    <span className="stat-label">স্ট্যাটাস</span>
                                    <span className="stat-value">
                                        {(() => {
                                            if (currentCategoryId === 'practice') {
                                                const effectiveIndex = hasError ? errorIndex : currentIndex;
                                                const pageIndex = practicePageBounds.findIndex(b => effectiveIndex >= b.start && effectiveIndex < b.end);
                                                const currentPage = (pageIndex !== -1 ? pageIndex : 0) + 1;
                                                const totalPages = practicePageBounds.length || 1;
                                                return `অনুশীলন (${currentPage}/${totalPages})`;
                                            } else if (currentSubLesson?.screens) {
                                                const effectiveIndex = hasError ? errorIndex : currentIndex;
                                                const pageIndex = screenBounds.findIndex(b => effectiveIndex >= b.start && effectiveIndex < b.end);
                                                const currentPage = (pageIndex !== -1 ? pageIndex : 0) + 1;
                                                const totalPages = screenBounds.length || 1;
                                                const title = screenBounds[pageIndex !== -1 ? pageIndex : 0]?.title || '';
                                                return `স্ক্রিন ${currentPage}/${totalPages} - ${title}`;
                                            } else {
                                                const PAGE_SIZE = 14;
                                                const totalPages = Math.ceil(lessonData.length / PAGE_SIZE);
                                                const effectiveIndex = hasError ? errorIndex : currentIndex;
                                                const currentPage = Math.floor(effectiveIndex / PAGE_SIZE) + 1;
                                                return `পেজ ${currentPage}/${totalPages}`;
                                            }
                                        })()}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div 
                            className={`text-display ${(currentCategoryId === 'practice' || currentCategoryId === 'arabic-surahs' || (currentSubLesson?.screens && screenBounds.find(b => (hasError ? errorIndex : currentIndex) >= b.start && (hasError ? errorIndex : currentIndex) < b.end)?.isSentence)) ? 'practice-mode' : ''}`}
                            dir={typingMode === 'ar' ? 'rtl' : 'ltr'}
                        >
                            {(() => {
                                let startIndex = 0;
                                let endIndex = 14;
                                if (currentCategoryId === 'practice') {
                                    const effectiveIndex = hasError ? errorIndex : currentIndex;
                                    const page = practicePageBounds.find(b => effectiveIndex >= b.start && effectiveIndex < b.end) || practicePageBounds[0] || { start: 0, end: lessonData.length };
                                    startIndex = page.start;
                                    endIndex = page.end;
                                } else if (currentSubLesson?.screens) {
                                    const effectiveIndex = hasError ? errorIndex : currentIndex;
                                    const page = screenBounds.find(b => effectiveIndex >= b.start && effectiveIndex < b.end) || screenBounds[0] || { start: 0, end: lessonData.length };
                                    startIndex = page.start;
                                    endIndex = page.end;
                                } else {
                                    const PAGE_SIZE = 14;
                                    const effectiveIndex = hasError ? errorIndex : currentIndex;
                                    const pageIndex = Math.floor(effectiveIndex / PAGE_SIZE);
                                    startIndex = pageIndex * PAGE_SIZE;
                                    endIndex = startIndex + PAGE_SIZE;
                                }

                                return lessonData.slice(startIndex, endIndex).map((item, i) => {
                                    const actualIndex = startIndex + i;
                                    let className = 'char-box ';
                                    
                                    if (actualIndex < currentIndex && !(hasError && actualIndex === errorIndex)) {
                                        className += 'correct';
                                    } else if (actualIndex === currentIndex) {
                                        className += 'active';
                                    }
                                    
                                    if (actualIndex === errorIndex && hasError) {
                                        className += ' error-box';
                                    }
                                    
                                    if (actualIndex === wrongIndex) className += ' wrong';
                                    if (actualIndex === currentIndex && subIndex > 0) className += ' typing-active';

                                    const isPracticeMode = currentCategoryId === 'practice' || currentCategoryId === 'arabic-surahs' || (currentSubLesson?.screens && screenBounds.find(b => (hasError ? errorIndex : currentIndex) >= b.start && (hasError ? errorIndex : currentIndex) < b.end)?.isSentence);
                                    const char = item.char || item.bn;
                                    const displayChar = char === ' ' ? (isPracticeMode ? ' ' : '\u00A0') : char;
                                    const expectedKeys = item.keys || [item.key];
                                    const isConjunct = currentCategoryId === 'conjuncts';
                                    
                                    let boxStyle = {};
                                    let charStyle = {};
                                    if (actualIndex === currentIndex && subIndex > 0 && expectedKeys.length > 1) {
                                        if (!hasError) {
                                            const pct = (subIndex / expectedKeys.length) * 100;
                                            const gradientDir = typingMode === 'ar' ? 'to left' : 'to right';
                                            charStyle = {
                                                backgroundImage: `linear-gradient(${gradientDir}, #10b981 ${pct}%, var(--text-main) ${pct}%)`,
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                backgroundClip: 'text',
                                                color: 'transparent'
                                            };
                                        }
                                    }

                                    const displayHint = expectedKeys.map((k, idx) => {
                                        const isPressed = actualIndex === currentIndex && idx < subIndex;
                                        let hintText = '';
                                        if (typingMode === 'ar' && ['arabic-words', 'arabic-sentences', 'arabic-surahs', 'arabic-harakat'].includes(currentCategoryId)) {
                                            hintText = getArHint(k);
                                        } else {
                                            hintText = isConjunct ? getBnHint(k) : getHint(k);
                                        }
                                        return (
                                            <React.Fragment key={idx}>
                                                <span className={isPressed ? 'pressed-key' : ''}>{hintText}</span>
                                                {idx < expectedKeys.length - 1 && (isConjunct ? ' ' : ' + ')}
                                            </React.Fragment>
                                        );
                                    });

                                     return (
                                        <div key={actualIndex} className={className} style={boxStyle}>
                                            <span className="bn-char" style={charStyle}>{displayChar}</span>
                                            {!item.isRandom && !isPracticeMode && typingMode !== 'en' && currentCategoryId !== 'arabic-sentences' && currentCategoryId !== 'arabic-surahs' && (
                                                <span className="qwerty-hint">{displayHint}</span>
                                            )}
                                        </div>
                                    );
                                });
                            })()}
                        </div>

                        <div className="practice-guide-area">
                            <VirtualKeyboard 
                                expectedKey={currentExpectedKey} 
                                wrongKey={hasError ? currentKey : null}
                                isRandomMode={expectedItem?.isRandom || currentCategoryId === 'conjuncts' || currentCategoryId === 'practice'}
                                feedbackKey={feedbackKey}
                                isNumpadMode={currentSubLessonId === 'en-adv-4' || currentSubLessonId === 'en-adv-5'}
                                typingMode={typingMode === 'ar' ? 'en' : typingMode}
                            />
                        </div>

                        <div className="keyboard-info">
                            আপনি চাপছেন: <span className="key-pressed">{currentKey}</span>
                        </div>

                        {completed && (
                            <div className="completion-modal-overlay">
                                <div className="completion-modal-premium">
                                    <h3>অভিনন্দন!</h3>
                                    <div className="premium-stars-container">
                                        {(() => {
                                            let stars = 1;
                                            if (accuracy >= 95 && wpm >= 15) stars = 3;
                                            else if (accuracy >= 85) stars = 2;
                                            return (
                                                <>
                                                    <span className={stars >= 1 ? 'star active' : 'star'}>★</span>
                                                    <span className={stars >= 2 ? 'star active' : 'star'}>★</span>
                                                    <span className={stars >= 3 ? 'star active' : 'star'}>★</span>
                                                </>
                                            );
                                        })()}
                                    </div>
                                    <div className="premium-stats-grid">
                                        <div className="premium-stat-card">
                                            <div className="premium-stat-value">{wpm} <span style={{fontSize: '1rem'}}>WPM</span></div>
                                            <div className="premium-stat-label">স্পিড</div>
                                        </div>
                                        <div className="premium-stat-card">
                                            <div className="premium-stat-value">{accuracy}%</div>
                                            <div className="premium-stat-label">একুরেসি</div>
                                        </div>
                                        <div className="premium-stat-card">
                                            <div className="premium-stat-value">{timeSpent}</div>
                                            <div className="premium-stat-label">সময়</div>
                                        </div>
                                    </div>
                                    
                                    <div className="modal-actions">
                                        <button className="btn-secondary" onClick={handleRetryLesson}>
                                            পুনরায় <span className="shortcut-hint">R</span>
                                        </button>
                                        <button className="btn-primary" onClick={handleNextLesson}>
                                            {(() => {
                                                const cIndex = currentCategory?.subLessons.findIndex(s => s.id === currentSubLessonId);
                                                const isLast = cIndex === currentCategory?.subLessons.length - 1;
                                                return isLast ? "তালিকায় ফিরে যান" : "পরবর্তী ধাপ";
                                            })()}
                                            <span className="shortcut-hint" style={{background: 'rgba(255,255,255,0.2)', color: 'white'}}>Enter</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <LoginModal 
                isOpen={isLoginModalOpen} 
                onClose={() => setIsLoginModalOpen(false)} 
            />
        </div>
    );
}
