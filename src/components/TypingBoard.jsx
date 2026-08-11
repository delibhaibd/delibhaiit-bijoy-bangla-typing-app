import React, { useState, useEffect, useCallback } from 'react';
import { categories } from '../data/lessons';
import { useSound } from '../hooks/useSound';
import { getFingerForKey } from '../utils/fingerMapping';
import VirtualKeyboard from './VirtualKeyboard';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';
import confetti from 'canvas-confetti';

export default function TypingBoard() {
    const { user, logout } = useAuth();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const [currentCategoryId, setCurrentCategoryId] = useState(categories[0].id);
    const [currentSubLessonId, setCurrentSubLessonId] = useState(null);
    const [completedLessons, setCompletedLessons] = useState({});

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

    const currentCategory = categories.find(c => c.id === currentCategoryId);
    const currentSubLesson = currentCategory?.subLessons.find(sl => sl.id === currentSubLessonId);
    const rawLessonData = currentSubLesson ? currentSubLesson.sequence : [];

    const lessonData = React.useMemo(() => {
        if (currentCategoryId !== 'conjuncts') return rawLessonData;

        const counts = {};
        return rawLessonData.map(item => {
            if (item.bn === ' ') return item;
            counts[item.bn] = (counts[item.bn] || 0) + 1;
            
            if (counts[item.bn] <= 2) {
                return { ...item, isRandom: false };
            } else {
                return { ...item, isRandom: true };
            }
        });
    }, [rawLessonData, currentCategoryId]);

    // Save completed lessons
    useEffect(() => {
        const storageKey = user ? `bijoyCompletedLessons_${user.id}` : 'bijoyCompletedLessons_guest';
        localStorage.setItem(storageKey, JSON.stringify(completedLessons));
    }, [completedLessons, user]);

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

    // Timer effect for 60s challenge
    useEffect(() => {
        let timer;
        if (currentSubLessonId === 'all-consonants' && startTime && !completed && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        handleComplete(currentIndex);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [currentSubLessonId, startTime, completed, timeLeft, handleComplete, currentIndex]);

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
                    setCurrentIndex(errorIndex);
                    setSubIndex(0); // Restart the current multi-key character
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
                setCurrentIndex(prev => prev + 1); // Advance cursor
                setSubIndex(0);
                
                setFeedbackKey({ key: e.key, status: 'wrong' });
                setTimeout(() => setFeedbackKey(null), 200);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, subIndex, startTime, lessonData, completed, currentSubLessonId, playCorrectSound, playErrorSound, totalKeystrokes, correctKeystrokes, hasError, errorIndex, handleNextLesson, handleRetryLesson]);

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
                <div className="sidebar-buttons">
                    {categories.map(cat => (
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
                    <div className="typing-ui-wrapper" style={{ width: '100%', maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
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
                                            const PAGE_SIZE = currentCategoryId === 'practice' ? lessonData.length : 14;
                                            const totalPages = Math.ceil(lessonData.length / PAGE_SIZE);
                                            const effectiveIndex = hasError ? errorIndex : currentIndex;
                                            const currentPage = Math.floor(effectiveIndex / PAGE_SIZE) + 1;
                                            return currentCategoryId === 'practice' ? `বাক্য অনুশীলন` : `পেজ ${currentPage}/${totalPages}`;
                                        })()}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className={`text-display ${currentCategoryId === 'practice' ? 'practice-mode' : ''}`} key={Math.floor((hasError ? errorIndex : currentIndex) / (currentCategoryId === 'practice' ? lessonData.length : 14))}>
                            {(() => {
                                const PAGE_SIZE = currentCategoryId === 'practice' ? lessonData.length : 14;
                                const effectiveIndex = hasError ? errorIndex : currentIndex;
                                const pageIndex = Math.floor(effectiveIndex / PAGE_SIZE);
                                const startIndex = pageIndex * PAGE_SIZE;
                                const endIndex = startIndex + PAGE_SIZE;

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

                                    const isPracticeMode = currentCategoryId === 'practice';
                                    const displayChar = item.bn === ' ' ? (isPracticeMode ? ' ' : '\u00A0') : item.bn;
                                    const expectedKeys = item.keys || [item.key];
                                    const isConjunct = currentCategoryId === 'conjuncts';
                                    
                                    const displayHint = expectedKeys.map((k, idx) => {
                                        const isPressed = actualIndex === currentIndex && idx < subIndex;
                                        const hintText = isConjunct ? getBnHint(k) : getHint(k);
                                        return (
                                            <React.Fragment key={idx}>
                                                <span className={isPressed ? 'pressed-key' : ''}>{hintText}</span>
                                                {idx < expectedKeys.length - 1 && (isConjunct ? ' ' : ' + ')}
                                            </React.Fragment>
                                        );
                                    });

                                    return (
                                        <div key={actualIndex} className={className}>
                                            <span className="bn-char">{displayChar}</span>
                                            {!item.isRandom && currentCategoryId !== 'practice' && (
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
