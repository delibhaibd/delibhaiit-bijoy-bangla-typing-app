import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';

const LiveActivityContext = createContext();

export const useLiveActivity = () => useContext(LiveActivityContext);

// Realistic Live Simulated Students with drill texts
const SIMULATED_LIVE_STUDENTS = [
    {
        id: 'live-std-1',
        roll: 'DB-2026-01',
        name: 'মোঃ রাকিবুল হাসান',
        avatar: 'র',
        lang: 'বাংলা',
        lesson: 'লেসন ৫: বাংলা যুক্তবর্ণ ড্রিল (ক্ষ, জ্ঞ, ষ্ণ)',
        targetText: 'বিজ্ঞান ও প্রযুক্তি মানবকল্যাণে অপরিহার্য অবদান রাখে। শিক্ষা জাতির মেরুদণ্ড।',
        typedBuffer: 'বিজ্ঞান ও প্রযুক্তি মানবক',
        currentIndex: 25,
        wpm: 34,
        accuracy: 96,
        timeSpentSeconds: 340, // 5 min 40s
        status: 'typing', // typing, idle, completed, retry
        currentKey: 'ল',
        lastActivity: 'এইমাত্র'
    },
    {
        id: 'live-std-2',
        roll: 'DB-2026-02',
        name: 'নুসরাত জাহান',
        avatar: 'ন',
        lang: 'English',
        lesson: 'Lesson 8: Full Paragraph & Punctuation',
        targetText: 'The quick brown fox jumps over the lazy dog near the river bank.',
        typedBuffer: 'The quick brown fox jumps over the lazy ',
        currentIndex: 40,
        wpm: 44,
        accuracy: 99,
        timeSpentSeconds: 520, // 8 min 40s
        status: 'typing',
        currentKey: 'd',
        lastActivity: 'এইমাত্র'
    },
    {
        id: 'live-std-3',
        roll: 'DB-2026-03',
        name: 'তানভীর আহমেদ',
        avatar: 'ত',
        lang: 'العربية',
        lesson: 'الدرس 4: الحروف المتصلة والشدة',
        targetText: 'العلم نور والجهل ظلام في طريق الحياة السعيدة',
        typedBuffer: 'العلم نور والجهل ',
        currentIndex: 17,
        wpm: 23,
        accuracy: 89,
        timeSpentSeconds: 195, // 3 min 15s
        status: 'typing',
        currentKey: 'ظ',
        lastActivity: '১ সেকেন্ড আগে'
    },
    {
        id: 'live-std-4',
        roll: 'DB-2026-04',
        name: 'ফারজানা আক্তার',
        avatar: 'ফ',
        lang: 'বাংলা',
        lesson: 'লেসন ২: হোম রো বেসিক কী (ক র ত ন ব)',
        targetText: 'কর বর নর তর বন রব নব রন বরন করন তরন বনর',
        typedBuffer: 'কর বর নর তর বন রব নব ',
        currentIndex: 22,
        wpm: 29,
        accuracy: 94,
        timeSpentSeconds: 410, // 6 min 50s
        status: 'typing',
        currentKey: 'র',
        lastActivity: 'এইমাত্র'
    }
];

export const LiveActivityProvider = ({ children }) => {
    const { user } = useAuth();
    const [liveStudents, setLiveStudents] = useState(SIMULATED_LIVE_STUDENTS);
    const [telemetryLogs, setTelemetryLogs] = useState([
        { id: 1, time: 'এখনই', text: 'মোঃ রাকিবুল হাসান লেসন ৫ এ টাইপিং শুরু করেছে', type: 'info' },
        { id: 2, time: '১০ সেঃ আগে', text: 'নুসরাত জাহান ৯৯% একুরেসিতে ৪৪ WPM স্পিড অর্জন করেছে', type: 'success' },
        { id: 3, time: '২৫ সেঃ আগে', text: 'তানভীর আহমেদ আরবি হরকতে একটি ভুল সংশোধন করেছে', type: 'warning' },
        { id: 4, time: '৪০ সেঃ আগে', text: 'ফারজানা আক্তার হোম রো ড্রিল শুরু করেছে', type: 'info' }
    ]);

    // Local user's active session state
    const localSessionRef = useRef({
        isActive: false,
        lesson: 'হোম রো টাইপিং',
        lang: 'বাংলা',
        typedBuffer: '',
        targetText: '',
        wpm: 0,
        accuracy: 100,
        timeSpentSeconds: 0,
        currentKey: '-',
        status: 'idle'
    });

    // Broadcast called from TypingBoard
    const broadcastKeystroke = (data) => {
        localSessionRef.current = {
            ...localSessionRef.current,
            isActive: true,
            ...data,
            lastActivity: 'এইমাত্র'
        };

        // Add telemetry log on special milestones (errors, complete, speed spikes)
        if (data.isMistake) {
            addTelemetryLog(`${user?.name || 'শিক্ষার্থী'} '${data.lastKey || ''}' কী-তে ভুল করেছে`, 'warning');
        } else if (data.isCompleted) {
            addTelemetryLog(`${user?.name || 'শিক্ষার্থী'} লেসন সম্পন্ন করেছে! (${data.accuracy}% একুরেসি, ${data.wpm} WPM)`, 'success');
        }
    };

    const addTelemetryLog = (text, type = 'info') => {
        const timeStr = new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setTelemetryLogs(prev => [
            { id: Date.now() + Math.random(), time: timeStr, text, type },
            ...prev.slice(0, 30) // Keep last 30 logs
        ]);
    };

    // Realistic Live Classroom Typing Engine Simulator
    useEffect(() => {
        const interval = setInterval(() => {
            setLiveStudents(prevStudents => {
                return prevStudents.map(std => {
                    // Advance typedBuffer character by character
                    let nextIndex = std.currentIndex + 1;
                    let nextWpm = std.wpm + (Math.random() > 0.5 ? 1 : -1);
                    if (nextWpm < 18) nextWpm = 18;
                    if (nextWpm > 55) nextWpm = 55;

                    let nextAcc = std.accuracy;
                    if (Math.random() > 0.85) {
                        nextAcc = +(std.accuracy + (Math.random() > 0.5 ? 0.3 : -0.4)).toFixed(1);
                        if (nextAcc > 100) nextAcc = 100;
                        if (nextAcc < 80) nextAcc = 82;
                    }

                    let nextTyped = std.targetText.slice(0, nextIndex);
                    let currentKey = std.targetText.charAt(nextIndex - 1) || ' ';

                    // If reached end, restart drill
                    if (nextIndex >= std.targetText.length) {
                        nextIndex = 0;
                        nextTyped = '';
                    }

                    return {
                        ...std,
                        currentIndex: nextIndex,
                        typedBuffer: nextTyped,
                        wpm: nextWpm,
                        accuracy: nextAcc,
                        timeSpentSeconds: std.timeSpentSeconds + 1,
                        currentKey: currentKey,
                        lastActivity: 'এইমাত্র'
                    };
                });
            });
        }, 1100);

        return () => clearInterval(interval);
    }, []);

    // Merge local user if currently typing
    const allActiveStudents = React.useMemo(() => {
        if (localSessionRef.current.isActive) {
            const localStudent = {
                id: 'local-active-user',
                roll: user?.id ? `DB-ME` : 'DB-GUEST',
                name: user?.name ? `${user.name} (আপনি / লোকাল)` : 'বর্তমান শিক্ষার্থী (লোকাল)',
                avatar: user?.name ? user.name.charAt(0) : 'আ',
                lang: localSessionRef.current.lang || 'বাংলা',
                lesson: localSessionRef.current.lesson || 'টাইপিং ড্রিল',
                targetText: localSessionRef.current.targetText || 'বাংলা কী-বোর্ড টাইপিং অনুশীলন...',
                typedBuffer: localSessionRef.current.typedBuffer || '',
                currentIndex: localSessionRef.current.currentIndex || 0,
                wpm: localSessionRef.current.wpm || 0,
                accuracy: localSessionRef.current.accuracy || 100,
                timeSpentSeconds: localSessionRef.current.timeSpentSeconds || 10,
                status: localSessionRef.current.status || 'typing',
                currentKey: localSessionRef.current.currentKey || '-',
                lastActivity: 'এইমাত্র',
                isLocal: true
            };
            return [localStudent, ...liveStudents];
        }
        return liveStudents;
    }, [liveStudents, user]);

    return (
        <LiveActivityContext.Provider value={{
            liveStudents: allActiveStudents,
            telemetryLogs,
            broadcastKeystroke,
            addTelemetryLog
        }}>
            {children}
        </LiveActivityContext.Provider>
    );
};
