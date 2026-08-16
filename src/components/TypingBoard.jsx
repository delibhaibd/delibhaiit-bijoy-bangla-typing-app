import React, { useState, useEffect, useCallback, useRef } from 'react';
import { categories } from '../data/lessons';
import { englishCategories } from '../data/englishLessons';
import { arabicCategories } from '../data/arabicLessons';
import VirtualKeyboard from './VirtualKeyboard';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';
import confetti from 'canvas-confetti';
import { applyPageBackground } from '../utils/generator';
import FlagIcon from './FlagIcon';
import { useSound } from '../hooks/useSound';
import { useLiveActivity } from '../context/LiveActivityContext';
import PremiumCourseModal from './PremiumCourseModal';
import { getRequiredShiftSide } from '../utils/fingerMapping';


export default function TypingBoard({ isDarkMode = true, onPracticeStateChange }) {
    const { user, logout } = useAuth();
    const { broadcastKeystroke } = useLiveActivity() || {};
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
    const [lockedLessonTargetTitle, setLockedLessonTargetTitle] = useState('');

    const [typingMode, setTypingMode] = useState('bn');
    const activeCategories = typingMode === 'bn' ? categories : (typingMode === 'ar' ? arabicCategories : englishCategories);
    const [currentCategoryId, setCurrentCategoryId] = useState(activeCategories[0].id);
    const [currentSubLessonId, setCurrentSubLessonId] = useState(null);
    const [completedLessons, setCompletedLessons] = useState({});
    const uiWrapperRef = useRef(null);
    const pressedShiftKeysRef = useRef(new Set());

    useEffect(() => {
        if (onPracticeStateChange) {
            onPracticeStateChange(Boolean(currentSubLessonId));
        }
    }, [currentSubLessonId, onPracticeStateChange]);

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
    const [autoCountdown, setAutoCountdown] = useState(null);
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
        const bounds = [];
        let startIndex = 0;

        for (let i = 0; i < lessonData.length; i++) {
            const char = lessonData[i].bn || lessonData[i].char;
            // Sentence endings in Bangla & English: '।', '.', '?', '!', '\n'
            const isSentenceEnd = char === '।' || char === '.' || char === '?' || char === '!' || char === '\n';
            
            if (isSentenceEnd || i === lessonData.length - 1) {
                let endIndex = i + 1;
                // Include trailing space if there is one right after the punctuation
                if (endIndex < lessonData.length && (lessonData[endIndex].bn === ' ' || lessonData[endIndex].char === ' ')) {
                    endIndex++;
                }
                bounds.push({ start: startIndex, end: endIndex });
                startIndex = endIndex;
                i = endIndex - 1;
            }
        }
        if (startIndex < lessonData.length) {
            bounds.push({ start: startIndex, end: lessonData.length });
        }
        return bounds.length > 0 ? bounds : [{ start: 0, end: lessonData.length }];
    }, [lessonData, currentCategoryId]);

    const screenBounds = React.useMemo(() => {
        if (!currentSubLesson?.screens) return [];
        const bounds = [];
        let startIndex = 0;

        for (let idx = 0; idx < currentSubLesson.screens.length; idx++) {
            const screen = currentSubLesson.screens[idx];
            const len = screen.text.length;
            bounds.push({ 
                start: startIndex, 
                end: startIndex + len, 
                title: screen.title, 
                isSentence: screen.isSentence || screen.text.includes(' ') || len > 10,
                screenIndex: idx
            });
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
            screenOrPage = Math.floor(effectiveIndex / 7);
        }

        const pageKey = `${typingMode}_${currentCategoryId}_${currentSubLessonId || 'menu'}_p${screenOrPage}_${screenTitle}`;

        applyPageBackground(pageKey, isDarkMode);
    }, [typingMode, currentCategoryId, currentSubLessonId, currentIndex, hasError, errorIndex, currentSubLesson, practicePageBounds, screenBounds, isDarkMode]);

    // Load or resume practice states when sub-lesson changes
    useEffect(() => {
        if (!currentSubLessonId) return;

        setAutoCountdown(null);
        const storageKey = user ? `bijoyCompletedLessons_${user.id}` : 'bijoyCompletedLessons_guest';
        let saved = {};
        try {
            const raw = localStorage.getItem(storageKey);
            if (raw) saved = JSON.parse(raw);
        } catch (err) {}

        const lessonProgress = saved[currentSubLessonId];
        // If lesson was in-progress and user hasn't completed it, resume from saved index!
        if (lessonProgress && lessonProgress.status === 'in_progress' && typeof lessonProgress.currentIndex === 'number' && lessonProgress.currentIndex > 0 && lessonProgress.currentIndex < rawLessonData.length) {
            setCurrentIndex(lessonProgress.currentIndex);
            setSubIndex(0);
            setCompleted(false);
            setTotalKeystrokes(lessonProgress.totalKeystrokes || lessonProgress.currentIndex);
            setCorrectKeystrokes(lessonProgress.correctKeystrokes || lessonProgress.currentIndex);
            setWpm(lessonProgress.wpm || 0);
            setAccuracy(lessonProgress.accuracy || 100);
            setTimeSpent(lessonProgress.time || '0:00');
        } else {
            setCurrentIndex(0);
            setSubIndex(0);
            setCompleted(false);
            setStartTime(null);
            setWpm(lessonProgress?.wpm || 0);
            setAccuracy(lessonProgress?.accuracy || 0);
            setTotalKeystrokes(0);
            setCorrectKeystrokes(0);
            setTimeSpent(lessonProgress?.time || '0:00');
        }
        setHasError(false);
        setErrorIndex(-1);
        setCurrentKey('-');
        setWrongIndex(-1);
        setTimeLeft(60);
    }, [currentSubLessonId, user, rawLessonData.length]);

    // Rule: First lesson (index 0) is Free Trial for non-subscribed users. 
    // Premium Subscription access is granted to bkctg540@gmail.com and delibhaiitbd@gmail.com.
    const userEmail = user?.email?.trim()?.toLowerCase();
    const isPremiumUser = Boolean(
        user?.isAdmin ||
        userEmail === 'delibhaiitbd@gmail.com' ||
        userEmail === 'bkctg540@gmail.com'
    );

    const isLessonLocked = useCallback((index) => {
        if (index === 0) return false;
        if (isPremiumUser) return false;
        return true;
    }, [isPremiumUser]);

    const handleNextLesson = useCallback(() => {
        setAutoCountdown(null);
        const currentIndex = currentCategory?.subLessons.findIndex(s => s.id === currentSubLessonId);
        if (currentIndex >= 0 && currentIndex + 1 < currentCategory.subLessons.length) {
            const nextSubLesson = currentCategory.subLessons[currentIndex + 1];
            const nextIndex = currentIndex + 1;

            if (isLessonLocked(nextIndex)) {
                setCurrentSubLessonId(null);
                setLockedLessonTargetTitle(nextSubLesson.title);
                setIsPremiumModalOpen(true);
                return;
            }

            setCurrentSubLessonId(nextSubLesson.id);
        } else {
            setCurrentSubLessonId(null);
        }
    }, [currentCategory, currentSubLessonId, isLessonLocked]);

    const handleRetryLesson = useCallback(() => {
        setAutoCountdown(null);
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

        setCompletedLessons(prev => ({
            ...prev,
            [currentSubLessonId]: {
                status: 'in_progress',
                currentIndex: 0,
                totalChars: lessonData.length,
                percent: 0,
                wpm: 0,
                accuracy: 100,
                time: '0:00',
                totalKeystrokes: 0,
                correctKeystrokes: 0
            }
        }));
    }, [currentSubLessonId, lessonData.length]);

    const handleComplete = useCallback((charsDone) => {
        setCompleted(true);
        
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

        const isPassed = finalAcc >= 90;

        if (isPassed) {
            // Firework animation on >= 90% accuracy
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

            // Auto-advance in 3 seconds
            setAutoCountdown(3);
            
            // Save complete progress
            setCompletedLessons(prev => ({
                ...prev,
                [currentSubLessonId]: {
                    status: 'completed',
                    currentIndex: charsDone,
                    totalChars: charsDone,
                    percent: 100,
                    wpm: finalWpm,
                    accuracy: finalAcc,
                    time: timeString,
                    totalKeystrokes: totalKeystrokes + 1,
                    correctKeystrokes: correctKeystrokes + 1
                }
            }));
        } else {
            // Under 90% accuracy: No celebration, do NOT mark completed, start 3s auto-retry countdown
            setAutoCountdown(3);
            playErrorSound();
            setCompletedLessons(prev => {
                const existing = prev[currentSubLessonId];
                return {
                    ...prev,
                    [currentSubLessonId]: {
                        status: existing?.status === 'completed' ? 'completed' : 'needs_retry',
                        currentIndex: charsDone,
                        totalChars: charsDone,
                        percent: existing?.status === 'completed' ? 100 : 0,
                        wpm: finalWpm,
                        accuracy: finalAcc,
                        time: timeString,
                        totalKeystrokes: totalKeystrokes + 1,
                        correctKeystrokes: correctKeystrokes + 1
                    }
                };
            });
        }
    }, [startTime, totalKeystrokes, correctKeystrokes, currentSubLessonId, playErrorSound]);

    // Auto-advance / Auto-retry countdown timer effect
    useEffect(() => {
        if (!completed || autoCountdown === null) return;

        if (autoCountdown <= 0) {
            if (accuracy >= 90) {
                handleNextLesson();
            } else {
                handleRetryLesson();
            }
            return;
        }

        const timer = setTimeout(() => {
            setAutoCountdown(prev => (prev !== null && prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearTimeout(timer);
    }, [completed, autoCountdown, accuracy, handleNextLesson, handleRetryLesson]);

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
        const handleKeyUp = (e) => {
            if (e.key === 'Shift') {
                if (e.code) pressedShiftKeysRef.current.delete(e.code);
            }
            if (!e.shiftKey) {
                pressedShiftKeysRef.current.clear();
            }
        };

        const handleKeyDown = (e) => {
            if (e.key === 'Shift') {
                if (e.code) pressedShiftKeysRef.current.add(e.code);
            }

            if (!currentSubLessonId) return; // Not in practice mode
            
            if (completed) {
                if (accuracy >= 90) {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        setAutoCountdown(null);
                        handleNextLesson();
                    }
                    if (e.key.toLowerCase() === 'r') {
                        e.preventDefault();
                        setAutoCountdown(null);
                        handleRetryLesson();
                    }
                } else {
                    if (e.key === 'Enter' || e.key.toLowerCase() === 'r' || e.key === ' ') {
                        e.preventDefault();
                        handleRetryLesson();
                    }
                }
                return;
            }
            
            // Ignore standalone modifiers
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

            const expectedItem = lessonData[currentIndex];
            const expectedKeys = expectedItem?.keys || (expectedItem?.key ? [expectedItem.key] : []);
            const currentExpectedKey = expectedKeys[subIndex];
            const requiredShiftSide = getRequiredShiftSide(currentExpectedKey);

            // Check if key matches expected character
            if (e.key === currentExpectedKey) {
                // Strict Shift Side Verification:
                if (requiredShiftSide) {
                    const hasRequiredShift = pressedShiftKeysRef.current.has(requiredShiftSide);
                    const hasWrongShift = pressedShiftKeysRef.current.has(requiredShiftSide === 'ShiftLeft' ? 'ShiftRight' : 'ShiftLeft');

                    if (hasWrongShift && !hasRequiredShift) {
                        // User used the opposite Shift key! Show error feedback for wrong Shift
                        playErrorSound();
                        setHasError(true);
                        setErrorIndex(currentIndex);
                        const wrongShiftKey = requiredShiftSide === 'ShiftLeft' ? 'RShift' : 'LShift';
                        setCurrentKey(wrongShiftKey);
                        setWrongIndex(subIndex);
                        setFeedbackKey({ key: wrongShiftKey, status: 'wrong' });
                        setTimeout(() => setFeedbackKey(null), 300);

                        if (broadcastKeystroke) {
                            broadcastKeystroke({
                                isMistake: true,
                                lastKey: wrongShiftKey,
                                currentKey: wrongShiftKey,
                                status: 'error'
                            });
                        }
                        return;
                    }
                }

                // Correct key with correct Shift side
                setCurrentKey(e.key === ' ' ? 'Space' : e.key);
                setTotalKeystrokes(prev => prev + 1);
                playCorrectSound();
                setCorrectKeystrokes(prev => prev + 1);
                
                setFeedbackKey({ key: e.key, status: 'correct' });
                setTimeout(() => setFeedbackKey(null), 200);
                
                if (subIndex + 1 < expectedKeys.length) {
                    setSubIndex(prev => prev + 1);
                    setWrongIndex(-1);
                } else {
                    const nextIndex = currentIndex + 1;
                    setCurrentIndex(nextIndex);
                    setSubIndex(0);
                    setWrongIndex(-1);
                    if (nextIndex >= lessonData.length) {
                        handleComplete(nextIndex);
                    } else {
                        // Real-time progress update & save
                        const totalChars = lessonData.length;
                        const currentPercent = Math.round((nextIndex / totalChars) * 100);
                        const timeInMs = startTime ? (Date.now() - startTime) : 1000;
                        const timeInMinutes = Math.max(0.01, timeInMs / 60000);
                        const words = nextIndex / 5;
                        const liveWpm = Math.round(words / timeInMinutes) || 0;
                        const liveAcc = (totalKeystrokes + 1) === 0 ? 100 : Math.round(((correctKeystrokes + 1) / (totalKeystrokes + 1)) * 100);
                        const totalSeconds = Math.floor(timeInMs / 1000);
                        const m = Math.floor(totalSeconds / 60);
                        const s = (totalSeconds % 60).toString().padStart(2, '0');
                        const timeString = `${m}:${s}`;

                        setWpm(liveWpm);
                        setAccuracy(liveAcc);
                        setTimeSpent(timeString);

                        setCompletedLessons(prev => ({
                            ...prev,
                            [currentSubLessonId]: {
                                ...(prev[currentSubLessonId] || {}),
                                status: 'in_progress',
                                currentIndex: nextIndex,
                                totalChars: totalChars,
                                percent: currentPercent,
                                wpm: liveWpm,
                                accuracy: liveAcc,
                                time: timeString,
                                totalKeystrokes: totalKeystrokes + 1,
                                correctKeystrokes: correctKeystrokes + 1
                            }
                        }));

                        // Broadcast to Live Monitor
                        if (broadcastKeystroke) {
                            const targetStr = lessonData.map(l => l.bn || l.char || l.key).join('');
                            const typedStr = lessonData.slice(0, nextIndex).map(l => l.bn || l.char || l.key).join('');
                            broadcastKeystroke({
                                lesson: currentSubLesson?.title ? `${currentCategory?.title || ''} - ${currentSubLesson.title}` : 'টাইপিং ড্রিল',
                                lang: typingMode === 'bn' ? 'বাংলা' : (typingMode === 'ar' ? 'العربية' : 'English'),
                                targetText: targetStr,
                                typedBuffer: typedStr,
                                currentIndex: nextIndex,
                                wpm: liveWpm,
                                accuracy: liveAcc,
                                timeSpentSeconds: totalSeconds,
                                currentKey: e.key,
                                status: 'typing',
                                isMistake: false,
                                isCompleted: false
                            });
                        }
                    }
                }
            } else {
                // Wrong key
                setCurrentKey(e.key === ' ' ? 'Space' : e.key);
                setTotalKeystrokes(prev => prev + 1);
                playErrorSound();
                setHasError(true);
                setErrorIndex(currentIndex);
                
                let wrongFeedbackKey = e.key;
                if (requiredShiftSide) {
                    const hasWrongShift = pressedShiftKeysRef.current.has(requiredShiftSide === 'ShiftLeft' ? 'ShiftRight' : 'ShiftLeft');
                    if (hasWrongShift) {
                        wrongFeedbackKey = requiredShiftSide === 'ShiftLeft' ? 'RShift' : 'LShift';
                    }
                }

                setFeedbackKey({ key: wrongFeedbackKey, status: 'wrong' });
                setTimeout(() => setFeedbackKey(null), 200);

                if (broadcastKeystroke) {
                    broadcastKeystroke({
                        isMistake: true,
                        lastKey: wrongFeedbackKey,
                        currentKey: wrongFeedbackKey,
                        status: 'error'
                    });
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [currentIndex, subIndex, startTime, lessonData, completed, currentSubLessonId, currentCategory, currentSubLesson, typingMode, broadcastKeystroke, playCorrectSound, playErrorSound, totalKeystrokes, correctKeystrokes, hasError, errorIndex, handleNextLesson, handleRetryLesson, handleComplete]);

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

    const getCategoryIcon = (catId, forSelect = false) => {
        if (catId === 'consonants') {
            if (forSelect) return 'ক';
            return <span className="cat-icon-letter-badge cat-consonant-badge">ক</span>;
        }
        if (catId === 'vowels') {
            if (forSelect) return 'অ';
            return <span className="cat-icon-letter-badge cat-vowel-badge">অ</span>;
        }
        if (catId === 'conjuncts') {
            if (forSelect) return 'ক্ষ্ম';
            return <span className="cat-icon-letter-badge cat-conjunct-badge">ক্ষ্ম</span>;
        }
        if (catId === 'modifiers') {
            if (forSelect) return 'া';
            return <span className="cat-icon-letter-badge cat-modifier-badge">া</span>;
        }

        const iconMap = {
            'home-row': '🏠',
            'top-row': '⬆️',
            'bottom-row': '⬇️',
            'practice': '📖',
            'speed-test': '⚡',
            'en-beginner': '🟢',
            'en-intermediate': '🟡',
            'en-advanced': '🔥',
            'en-basic': '⌨️',
            'en-adv-1': '🔠',
            'en-adv-2': '🔤',
            'en-adv-3': '🔣',
            'en-adv-4': '🔢',
            'en-adv-5': '🧮',
            'en-adv-6': '💼',
            'en-adv-7': '⚡',
            'arabic-letters': '🔤',
            'arabic-basic-letters': '🔤',
            'arabic-harakat': '〰️',
            'arabic-words': '📝',
            'arabic-sentences': '📜',
            'arabic-surahs': '🕌'
        };
        return iconMap[catId] || '📌';
    };

    const totalCompletedCount = Object.keys(completedLessons).filter(k => completedLessons[k]?.status === 'completed').length;

    const handleLanguageChange = (mode) => {
        setTypingMode(mode);
        setCurrentCategoryId(
            mode === 'bn' 
                ? categories[0].id 
                : mode === 'ar' 
                    ? arabicCategories[0].id 
                    : englishCategories[0].id
        );
        setCurrentSubLessonId(null);
        setSubIndex(0);
        setCurrentIndex(0);
        setStartTime(null);
        setCompleted(false);
        setHasError(false);
        setWrongIndex(-1);
        setErrorIndex(-1);
        setTotalKeystrokes(0);
        setCorrectKeystrokes(0);
        setWpm(0);
        setAccuracy(0);
    };

    const handleCategoryClick = (catId) => {
        setCurrentCategoryId(catId);
        setCurrentSubLessonId(null);
        setSubIndex(0);
        setCurrentIndex(0);
        setStartTime(null);
        setCompleted(false);
        setHasError(false);
        setWrongIndex(-1);
        setErrorIndex(-1);
        setTotalKeystrokes(0);
        setCorrectKeystrokes(0);
        setWpm(0);
        setAccuracy(0);
    };

    return (
        <div className="typing-layout-wrapper">
            {!currentSubLessonId && (
                <aside className="sidebar premium-sidebar">
                    <div className="sidebar-header-premium">
                        <div className="sidebar-header-title-box">
                            <span className="sidebar-header-icon">🧭</span>
                            <div>
                                <div className="sidebar-title-main">মেনু ও ক্যাটাগরি</div>
                                <div className="sidebar-title-sub">টাইপিং লেসন নির্বাচন</div>
                            </div>
                        </div>
                        {totalCompletedCount > 0 && (
                            <span className="sidebar-badge-counter">{totalCompletedCount} ✓</span>
                        )}
                    </div>

                    <div className="menu-lang-selector">
                        <div className="menu-section-label">টাইপিং ভাষা নির্বাচন</div>
                        <div className="lang-segmented-pills">
                            <button 
                                type="button"
                                className={`lang-pill ${typingMode === 'en' ? 'active' : ''}`}
                                onClick={() => handleLanguageChange('en')}
                            >
                                <span className="lang-flag"><FlagIcon lang="en" size={15} /></span>
                                <span className="lang-name">English</span>
                            </button>
                            <button 
                                type="button"
                                className={`lang-pill ${typingMode === 'bn' ? 'active' : ''}`}
                                onClick={() => handleLanguageChange('bn')}
                            >
                                <span className="lang-flag"><FlagIcon lang="bn" size={15} /></span>
                                <span className="lang-name">বাংলা</span>
                            </button>
                            <button 
                                type="button"
                                className={`lang-pill ${typingMode === 'ar' ? 'active' : ''}`}
                                onClick={() => handleLanguageChange('ar')}
                            >
                                <span className="lang-flag"><FlagIcon lang="ar" size={15} /></span>
                                <span className="lang-name">العربية</span>
                            </button>
                        </div>
                    </div>

                    <div className="menu-categories-list">
                        <div className="menu-section-label">ক্যাটাগরি সমূহ</div>
                        <div className="sidebar-buttons desktop-only-categories">
                            {activeCategories.map(cat => {
                                const isCatActive = currentCategoryId === cat.id;
                                const icon = getCategoryIcon(cat.id);
                                const lessonCount = cat.subLessons?.length || 0;
                                const completedInCat = cat.subLessons?.filter(sl => completedLessons[sl.id]?.status === 'completed').length || 0;

                                return (
                                    <button 
                                        key={cat.id}
                                        className={`sidebar-btn ${isCatActive ? 'active' : ''}`}
                                        onClick={() => handleCategoryClick(cat.id)}
                                    >
                                        <div className="cat-btn-content">
                                            <span className="cat-icon">{icon}</span>
                                            <div className="cat-text-group">
                                                <span className="cat-title">{cat.title}</span>
                                                <span className="cat-subinfo">
                                                    {completedInCat > 0 ? `${completedInCat}/${lessonCount} সম্পন্ন` : `${lessonCount}টি লেসন`}
                                                </span>
                                            </div>
                                        </div>
                                        <span className="cat-arrow">›</span>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="mobile-only-categories-dropdown-wrap">
                            <select 
                                className="mobile-categories-select"
                                value={currentCategoryId}
                                onChange={(e) => handleCategoryClick(e.target.value)}
                            >
                                {activeCategories.map(cat => {
                                    const lessonCount = cat.subLessons?.length || 0;
                                    const completedInCat = cat.subLessons?.filter(sl => completedLessons[sl.id]?.status === 'completed').length || 0;
                                    const statusText = completedInCat > 0 ? `(${completedInCat}/${lessonCount} সম্পন্ন)` : `(${lessonCount}টি লেসন)`;
                                    return (
                                        <option key={cat.id} value={cat.id}>
                                            {getCategoryIcon(cat.id, true)} {cat.title} {statusText}
                                        </option>
                                    );
                                })}
                            </select>
                            <span className="select-chevron">▼</span>
                        </div>
                    </div>
                </aside>
            )}
            
            <div className="typing-board-container">
                {!currentSubLessonId ? (
                    <div className="sub-lesson-list-premium">
                        {(() => {
                            const totalCatLessons = currentCategory?.subLessons?.length || 0;
                            let totalCatPercentSum = 0;
                            let completedInCat = 0;
                            currentCategory?.subLessons?.forEach(sl => {
                                const stat = completedLessons[sl.id];
                                if (stat?.status === 'completed' || stat?.percent === 100) {
                                    totalCatPercentSum += 100;
                                    completedInCat++;
                                } else if (stat?.percent) {
                                    totalCatPercentSum += stat.percent;
                                }
                            });
                            const catPercent = totalCatLessons > 0 ? Math.round(totalCatPercentSum / totalCatLessons) : 0;

                            return (
                                <div className="sub-lesson-hero-card only-progress">
                                    <div className="hero-progress-horizontal-wrapper">
                                        <div className="hero-progress-info">
                                            <span className="hero-progress-title">📊 লেসন অগ্রগতি</span>
                                            <div className="hero-stat-number">{completedInCat}/{totalCatLessons} সম্পূর্ণ ({catPercent}% অগ্রগতি)</div>
                                        </div>
                                        <div className="hero-progress-bar-wrap">
                                            <div className="hero-progress-bar-fill" style={{ width: `${Math.max(catPercent > 0 ? 3 : 0, catPercent)}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}
                        
                        <div className="progressive-cards-grid">
                            {currentCategory?.subLessons.map((subLesson, index) => {
                                const lessonStats = completedLessons[subLesson.id];
                                const isCompleted = lessonStats?.status === 'completed' || lessonStats?.percent === 100;
                                const hasProgress = !isCompleted && typeof lessonStats?.percent === 'number' && lessonStats.percent > 0;
                                const progressPercent = isCompleted ? 100 : (lessonStats?.percent || 0);
                                const isLocked = isLessonLocked(index);
                                
                                const handleCardClick = () => {
                                    if (isLocked) {
                                        setLockedLessonTargetTitle(subLesson.title);
                                        setIsPremiumModalOpen(true);
                                        return;
                                    }
                                    setCurrentSubLessonId(subLesson.id);
                                };

                                return (
                                    <div 
                                        key={subLesson.id} 
                                        className={`lesson-card-premium ${isCompleted ? 'completed' : (hasProgress ? 'in-progress' : '')} ${isLocked ? 'locked' : ''}`}
                                        onClick={handleCardClick}
                                    >
                                        <div className="lesson-card-top">
                                            <div className="lesson-badge-and-title">
                                                <div className={`lesson-index-badge ${isCompleted ? 'completed' : (hasProgress ? 'in-progress' : '')} ${isLocked ? 'locked-badge' : ''}`}>
                                                    {isLocked ? '🔒' : (isCompleted ? '✓' : (index + 1))}
                                                </div>
                                                <div className="lesson-title-meta">
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                                        <h3 className="lesson-card-title">{subLesson.title}</h3>
                                                        {!isPremiumUser && index === 0 && (
                                                            <span className="lesson-free-trial-badge">🎁 ফ্রি ট্রায়াল</span>
                                                        )}
                                                        {isLocked && (
                                                            <span className="lesson-lock-badge">🔒 প্রিমিয়াম লেসন</span>
                                                        )}
                                                    </div>
                                                    {hasProgress && (
                                                        <span className="lesson-in-progress-tag">অগ্রগতি: {progressPercent}%</span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="lesson-card-right-group">
                                                <div className="lesson-card-metrics">
                                                    <div className="metric-pill">
                                                        <span className="metric-icon">⚡</span>
                                                        <span className="metric-val">{lessonStats?.wpm ? `${lessonStats.wpm} WPM` : '-- WPM'}</span>
                                                    </div>
                                                    <div className="metric-pill">
                                                        <span className="metric-icon">🎯</span>
                                                        <span className="metric-val">{lessonStats?.accuracy ? `${lessonStats.accuracy}%` : '--%'}</span>
                                                    </div>
                                                    <div className="metric-pill">
                                                        <span className="metric-icon">⏱️</span>
                                                        <span className="metric-val">{lessonStats?.time || '--:--'}</span>
                                                    </div>
                                                </div>

                                                <button 
                                                    type="button" 
                                                    className={`lesson-btn-modern ${isLocked ? 'locked-action-btn' : (isCompleted ? 'resume-btn' : (hasProgress ? 'continue-btn' : 'start-btn'))}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleCardClick();
                                                    }}
                                                >
                                                    {isLocked 
                                                        ? '🔒 আনলক করুন' 
                                                        : (isCompleted ? '▶ পুনরায় অনুশীলন' : (hasProgress ? `▶ চালিয়ে যান (${progressPercent}%)` : '▶ শুরু করুন'))}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="lesson-card-bottom-track">
                                            <div 
                                                className={`track-fill ${isCompleted ? 'filled' : (hasProgress ? 'in-progress-fill' : '')}`}
                                                style={{ width: `${progressPercent}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div ref={uiWrapperRef} className="typing-ui-wrapper practice-page-premium" style={{ width: '100%', maxWidth: '100%', margin: '0', display: 'flex', flexDirection: 'column', scrollMarginTop: '20px' }}>
                        <div className="practice-header-premium">
                            <button 
                                type="button" 
                                className="practice-back-btn eye-catching-back-btn" 
                                onClick={() => setCurrentSubLessonId(null)}
                                title="Back to Lesson List"
                            >
                                <span className="back-arrow-icon-wrap">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="19" y1="12" x2="5" y2="12"></line>
                                        <polyline points="12 19 5 12 12 5"></polyline>
                                    </svg>
                                </span>
                                <span className="back-btn-text">Back</span>
                            </button>
                            <div className="practice-header-center">
                                <span className="practice-cat-badge">
                                    <span className="cat-icon">{getCategoryIcon(currentCategoryId)}</span>
                                    <span>{currentCategory?.title}</span>
                                </span>
                            </div>
                            <button type="button" className="practice-retry-btn" onClick={handleRetryLesson} title="প্রথম থেকে শুরু করুন">
                                <span className="retry-icon">🔄</span>
                                <span>নতুন করে শুরু</span>
                            </button>
                        </div>

                        {(hasError || (!startTime && currentIndex === 0 && totalKeystrokes === 0)) && (
                            <div className="practice-status-strip">
                                {hasError ? (
                                    <div className="practice-error-banner">
                                        <span className="error-pulse-icon">⚠️</span>
                                        <div className="error-msg-wrap">
                                            <span className="error-lead">ভুল বাটন চাপছেন!</span>
                                            <span className="error-sub">ঠিক করতে কীবোর্ডের <kbd className="hud-kbd">Backspace</kbd> বাটন চাপুন</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="practice-instruction-banner">
                                        <span className="instruction-bulb">💡</span>
                                        <span className="instruction-text">নির্দেশনা: কীবোর্ডে হাইলাইট করা বাটনটি দেখে সঠিক আঙুল দিয়ে টাইপ করুন</span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Modern HUD Stats Grid */}
                        {(() => {
                            const effectiveIndex = hasError ? errorIndex : currentIndex;
                            const progressPct = Math.round((effectiveIndex / (lessonData.length || 1)) * 100);
                            
                            let screenInfo = '';
                            if (currentCategoryId === 'practice') {
                                const pageIndex = practicePageBounds.findIndex(b => effectiveIndex >= b.start && effectiveIndex < b.end);
                                const currentPage = (pageIndex !== -1 ? pageIndex : 0) + 1;
                                const totalPages = practicePageBounds.length || 1;
                                screenInfo = `অনুশীলন (${currentPage}/${totalPages})`;
                            } else if (currentSubLesson?.screens) {
                                const pageIndex = screenBounds.findIndex(b => effectiveIndex >= b.start && effectiveIndex < b.end);
                                const currentPage = (pageIndex !== -1 ? pageIndex : 0) + 1;
                                const totalPages = screenBounds.length || 1;
                                screenInfo = `${currentPage}/${totalPages}`;
                            } else {
                                const PAGE_SIZE = 7;
                                const totalPages = Math.ceil(lessonData.length / PAGE_SIZE);
                                const currentPage = Math.floor(effectiveIndex / PAGE_SIZE) + 1;
                                screenInfo = `${currentPage}/${totalPages}`;
                            }

                            return (
                                <div className="practice-hud-grid">
                                    <div className="hud-card hud-wpm">
                                        <div className="hud-card-icon-wrap">⚡</div>
                                        <div className="hud-card-body">
                                            <span className="hud-card-label">টাইপিং গতি</span>
                                            <span className="hud-card-value">{wpm} <small>WPM</small></span>
                                        </div>
                                    </div>

                                    <div className="hud-card hud-accuracy">
                                        <div className="hud-card-icon-wrap">🎯</div>
                                        <div className="hud-card-body">
                                            <span className="hud-card-label">সঠিকতা</span>
                                            <span className="hud-card-value">
                                                {accuracy || (totalKeystrokes === 0 ? 100 : Math.round((correctKeystrokes / totalKeystrokes) * 100))}<small>%</small>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="hud-card hud-screen">
                                        <div className="hud-card-icon-wrap">📑</div>
                                        <div className="hud-card-body">
                                            <span className="hud-card-label">স্ক্রিন / পেজ</span>
                                            <span className="hud-card-value">{screenInfo}</span>
                                        </div>
                                    </div>

                                    <div className="hud-card hud-progress">
                                        <div className="hud-card-icon-wrap">📊</div>
                                        <div className="hud-card-body" style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                                <span className="hud-card-label">লেসন প্রগ্রেস</span>
                                                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                                                    {effectiveIndex}/{lessonData.length} অক্ষর
                                                </span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                                                <span className="hud-card-value" style={{ fontSize: '1.2rem', lineHeight: 1 }}>{progressPct}<small>%</small></span>
                                                <div style={{ flex: 1, height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '6px', overflow: 'hidden' }}>
                                                    <div 
                                                        style={{ 
                                                            height: '100%', 
                                                            width: `${Math.max(progressPct > 0 ? 3 : 0, progressPct)}%`, 
                                                            background: 'linear-gradient(90deg, #10b981 0%, #06b6d4 100%)',
                                                            borderRadius: '6px',
                                                            transition: 'width 0.3s ease'
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}

                        <div 
                            className={`text-display text-display-premium lang-${typingMode} ${(currentCategoryId === 'practice' || currentCategoryId === 'arabic-surahs' || (currentSubLesson?.screens && screenBounds.find(b => (hasError ? errorIndex : currentIndex) >= b.start && (hasError ? errorIndex : currentIndex) < b.end)?.isSentence)) ? 'practice-mode' : ''}`}
                            dir={typingMode === 'ar' ? 'rtl' : 'ltr'}
                        >
                            {(() => {
                                let startIndex = 0;
                                let endIndex = 7;
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
                                    const PAGE_SIZE = 7;
                                    const effectiveIndex = hasError ? errorIndex : currentIndex;
                                    const pageIndex = Math.floor(effectiveIndex / PAGE_SIZE);
                                    startIndex = pageIndex * PAGE_SIZE;
                                    endIndex = startIndex + PAGE_SIZE;
                                }

                                return lessonData.slice(startIndex, endIndex).map((item, i) => {
                                    const actualIndex = startIndex + i;
                                    const isPracticeMode = currentCategoryId === 'practice' || currentCategoryId === 'arabic-surahs' || currentCategoryId === 'arabic-sentences' || (currentSubLesson?.screens && screenBounds.find(b => (hasError ? errorIndex : currentIndex) >= b.start && (hasError ? errorIndex : currentIndex) < b.end)?.isSentence);
                                    const char = item.char || item.bn;
                                    const isSpace = char === ' ';
                                    const displayChar = isSpace ? '\u00A0' : char;
                                    
                                    let className = 'char-box ';
                                    if (isSpace) className += 'char-space ';
                                    
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

                        {(() => {
                            const effectiveIndex = hasError ? errorIndex : currentIndex;
                            const expectedItem = lessonData[effectiveIndex];
                            const expectedKeys = expectedItem?.keys || (expectedItem?.key ? [expectedItem.key] : []);
                            const currentExpectedKey = expectedKeys[subIndex];

                            const currentScreen = currentSubLesson?.screens ? screenBounds.find(b => effectiveIndex >= b.start && effectiveIndex < b.end) : null;
                            const currentScreenIdx = currentScreen ? currentScreen.screenIndex : -1;

                            // English lessons start with initial key tutorials (screens 0-2), then progress into random/mixed drills & combos
                            const isEnglishRandomPhase = typingMode === 'en' && currentScreen && (
                                currentScreenIdx >= 3 ||
                                Boolean(currentScreen.isSentence) ||
                                /mixed|random|drill|review|speed|combo|switching|alternating|sentence|word|challenge|test/i.test(currentScreen.title || '')
                            );

                            const isRandomMode = Boolean(expectedItem?.isRandom) || 
                                                 currentCategoryId === 'conjuncts' || 
                                                 currentCategoryId === 'practice' || 
                                                 isEnglishRandomPhase;

                            return (
                                <div className="practice-guide-area">
                                    <VirtualKeyboard 
                                        expectedKey={currentExpectedKey} 
                                        wrongKey={hasError ? currentKey : null}
                                        isRandomMode={isRandomMode}
                                        feedbackKey={feedbackKey}
                                        isNumpadMode={currentSubLessonId === 'en-adv-4' || currentSubLessonId === 'en-adv-5'}
                                        typingMode={typingMode === 'ar' ? 'en' : typingMode}
                                    />
                                </div>
                            );
                        })()}

                        {completed && (
                            <div className="completion-modal-overlay">
                                <div className={`completion-modal-premium ${accuracy < 90 ? 'failed-attempt' : 'passed-attempt'}`}>
                                    {accuracy >= 90 ? (
                                        <>
                                            <h3>অভিনন্দন! 🎉</h3>
                                            <div className="accuracy-requirement-badge passed">
                                                <span className="req-icon">🎯</span>
                                                <span>একুরেসি লক্ষ্যমাত্রা অর্জিত! (<strong>{accuracy}%</strong> ≥ ৯০%)</span>
                                            </div>
                                            <div className="premium-stars-container">
                                                {(() => {
                                                    let stars = 1;
                                                    if (accuracy >= 95 && wpm >= 15) stars = 3;
                                                    else if (accuracy >= 90) stars = 2;
                                                    return (
                                                        <>
                                                            <span className={stars >= 1 ? 'star active' : 'star'}>★</span>
                                                            <span className={stars >= 2 ? 'star active' : 'star'}>★</span>
                                                            <span className={stars >= 3 ? 'star active' : 'star'}>★</span>
                                                        </>
                                                    );
                                                })()}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <h3 className="failed-title">পুনরায় চেষ্টা করুন ⚠️</h3>
                                            <div className="accuracy-requirement-badge failed">
                                                <span className="req-icon">⚠️</span>
                                                <span>লেসন সফল করতে কমপক্ষে <strong>৯০%</strong> একুরেসি প্রয়োজন (আপনার অর্জন: <strong>{accuracy}%</strong>)</span>
                                            </div>
                                            <div className="failed-helper-msg">
                                                অনুগ্রহ করে কি-বোর্ড গাইড দেখে সঠিক কি-তে চাপ দিন এবং নির্ভুলভাবে টাইপ করুন।
                                            </div>
                                        </>
                                    )}

                                    <div className="premium-stats-grid">
                                        <div className="premium-stat-card">
                                            <div className="premium-stat-value">{wpm} <span style={{fontSize: '1rem'}}>WPM</span></div>
                                            <div className="premium-stat-label">স্পিড</div>
                                        </div>
                                        <div className={`premium-stat-card ${accuracy < 90 ? 'stat-card-warning' : 'stat-card-success'}`}>
                                            <div className="premium-stat-value">{accuracy}%</div>
                                            <div className="premium-stat-label">একুরেসি</div>
                                        </div>
                                        <div className="premium-stat-card">
                                            <div className="premium-stat-value">{timeSpent}</div>
                                            <div className="premium-stat-label">সময়</div>
                                        </div>
                                    </div>
                                    
                                    {autoCountdown !== null && (
                                        <div className={`auto-advance-indicator ${accuracy < 90 ? 'auto-retry-indicator' : ''}`}>
                                            <div className={`auto-advance-text ${accuracy < 90 ? 'auto-retry-text' : ''}`}>
                                                {accuracy >= 90 ? (
                                                    <span>⚡ স্বয়ংক্রিয়ভাবে পরবর্তী লেসনে নিয়ে যাওয়া হচ্ছে... ({autoCountdown} সে.)</span>
                                                ) : (
                                                    <span>🔄 {autoCountdown} সেকেন্ড পর স্বয়ংক্রিয়ভাবে পুনরায় শুরু হচ্ছে...</span>
                                                )}
                                            </div>
                                            <div className={`auto-advance-bar-track ${accuracy < 90 ? 'auto-retry-track' : ''}`}>
                                                <div 
                                                    className={`auto-advance-bar-fill ${accuracy < 90 ? 'auto-retry-fill' : ''}`}
                                                    style={{ width: `${Math.max(5, ((3 - autoCountdown) / 3) * 100)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="modal-actions">
                                        {accuracy >= 90 ? (
                                            <>
                                                <button className="btn-secondary" onClick={handleRetryLesson}>
                                                    পুনরায় <span className="shortcut-hint">R</span>
                                                </button>
                                                <button className="btn-primary" onClick={handleNextLesson}>
                                                    {(() => {
                                                        const cIndex = currentCategory?.subLessons.findIndex(s => s.id === currentSubLessonId);
                                                        const isLast = cIndex === currentCategory?.subLessons.length - 1;
                                                        return isLast ? "তালিকায় ফিরে যান" : "পরবর্তী লেসন";
                                                    })()}
                                                    <span className="shortcut-hint" style={{background: 'rgba(255,255,255,0.2)', color: 'white'}}>Enter</span>
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button className="btn-secondary" onClick={() => setCurrentSubLessonId(null)}>
                                                    তালিকায় ফিরুন
                                                </button>
                                                <button className="btn-primary btn-retry-primary" onClick={handleRetryLesson}>
                                                    🔄 পুনরায় লেসন শুরু করুন
                                                    <span className="shortcut-hint" style={{background: 'rgba(255,255,255,0.2)', color: 'white'}}>Enter / R</span>
                                                </button>
                                            </>
                                        )}
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

            <PremiumCourseModal 
                isOpen={isPremiumModalOpen}
                onClose={() => setIsPremiumModalOpen(false)}
                onOpenLogin={() => setIsLoginModalOpen(true)}
                user={user}
                lessonTitle={lockedLessonTargetTitle}
            />
        </div>
    );
}
