import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLiveActivity } from '../context/LiveActivityContext';
import './AdminPanel.css';

// Initial default rich students data
const INITIAL_STUDENTS = [
    { 
        id: 'std-101', 
        roll: 'DB-2026-01',
        name: 'মোঃ রাকিবুল হাসান', 
        email: 'rakibul.it@gmail.com', 
        phone: '01712-345678',
        lang: 'বাংলা', 
        completed: 22, 
        totalLessons: 24,
        avgAcc: 95.8, 
        avgSpeed: 34.5, 
        status: 'পাসকৃত', 
        enrolledDate: '০১ আগস্ট, ২০২৬',
        lastActive: '১০ মিনিট আগে',
        history: [
            { lesson: 'হোম রো বেসিক', acc: 98, wpm: 32, date: '১০ মিনিট আগে', status: 'passed' },
            { lesson: 'টপ রো ক-বর্গ', acc: 94, wpm: 35, date: '১ ঘন্টা আগে', status: 'passed' },
            { lesson: 'যুক্তবর্ণ ড্রিল ১', acc: 92, wpm: 31, date: 'গতকাল', status: 'passed' }
        ],
        notes: 'বাংলা টাইপিংয়ে দ্রুত উন্নতি করছে। নিয়মিত অনুশীলন করে।'
    },
    { 
        id: 'std-102', 
        roll: 'DB-2026-02',
        name: 'নুসরাত জাহান', 
        email: 'nusrat.j@gmail.com', 
        phone: '01819-876543',
        lang: 'English', 
        completed: 24, 
        totalLessons: 24,
        avgAcc: 98.2, 
        avgSpeed: 42.0, 
        status: 'পাসকৃত', 
        enrolledDate: '০২ আগস্ট, ২০২৬',
        lastActive: '২৫ মিনিট আগে',
        history: [
            { lesson: 'Home Row Mastery', acc: 99, wpm: 45, date: '২৫ মিনিট আগে', status: 'passed' },
            { lesson: 'Top Row QWERTY', acc: 98, wpm: 42, date: '২ ঘন্টা আগে', status: 'passed' },
            { lesson: 'Number Row & Symbols', acc: 97, wpm: 39, date: 'গতকাল', status: 'passed' }
        ],
        notes: 'সর্বোচ্চ স্পিড ও নির্ভুলতা। কোর্স সম্পূর্ণ করেছে।'
    },
    { 
        id: 'std-103', 
        roll: 'DB-2026-03',
        name: 'তানভীর আহমেদ', 
        email: 'tanvir55@yahoo.com', 
        phone: '01911-223344',
        lang: 'العربية', 
        completed: 14, 
        totalLessons: 24,
        avgAcc: 88.5, 
        avgSpeed: 22.4, 
        status: 'অনুশীলনরত', 
        enrolledDate: '০৫ আগস্ট, ২০২৬',
        lastActive: '১ ঘন্টা আগে',
        history: [
            { lesson: 'الحروف الأساسية', acc: 91, wpm: 24, date: '১ ঘন্টা আগে', status: 'passed' },
            { lesson: 'الشدة والتنوين', acc: 86, wpm: 20, date: '৩ ঘন্টা আগে', status: 'retry' }
        ],
        notes: 'আরবি হরকতে কিছু ভুল হচ্ছে, পুনরাবৃত্তি প্র্যাক্টিস আবশ্যক।'
    },
    { 
        id: 'std-104', 
        roll: 'DB-2026-04',
        name: 'ফারজানা আক্তার', 
        email: 'farjana.bd@outlook.com', 
        phone: '01678-998877',
        lang: 'বাংলা', 
        completed: 17, 
        totalLessons: 24,
        avgAcc: 92.4, 
        avgSpeed: 29.8, 
        status: 'পাসকৃত', 
        enrolledDate: '০৭ আগস্ট, ২০২৬',
        lastActive: '২ ঘন্টা আগে',
        history: [
            { lesson: 'বটম রো ড্রিল', acc: 93, wpm: 30, date: '২ ঘন্টা আগে', status: 'passed' },
            { lesson: 'হোম রো বেসিক', acc: 94, wpm: 28, date: 'গতকাল', status: 'passed' }
        ],
        notes: 'ধারাবাহিক প্রচেষ্টা রয়েছে। স্পিড বৃদ্ধি পাচ্ছে।'
    },
    { 
        id: 'std-105', 
        roll: 'DB-2026-05',
        name: 'শাকিল মাহমুদ', 
        email: 'shakil.it@gmail.com', 
        phone: '01555-112233',
        lang: 'English', 
        completed: 9, 
        totalLessons: 24,
        avgAcc: 84.6, 
        avgSpeed: 18.2, 
        status: 'রিট্রাই প্রয়োজন', 
        enrolledDate: '১০ আগস্ট, ২০২৬',
        lastActive: 'গতকাল',
        history: [
            { lesson: 'Bottom Row ZXCVB', acc: 82, wpm: 17, date: 'গতকাল', status: 'retry' },
            { lesson: 'Shift Key Drill', acc: 85, wpm: 19, date: '২ দিন আগে', status: 'retry' }
        ],
        notes: '৯০% একুরেসি অর্জন করতে পারছে না। আরও হ্যান্ড পজিশন গাইড প্রয়োজন।'
    },
    { 
        id: 'std-106', 
        roll: 'DB-2026-06',
        name: 'মেহেদী হাসান', 
        email: 'mehedi.bhai@gmail.com', 
        phone: '01799-445566',
        lang: 'বাংলা', 
        completed: 21, 
        totalLessons: 24,
        avgAcc: 96.1, 
        avgSpeed: 36.8, 
        status: 'পাসকৃত', 
        enrolledDate: '০৩ আগস্ট, ২০২৬',
        lastActive: 'গতকাল',
        history: [
            { lesson: 'বাংলা অনুচ্ছেদ ৩', acc: 97, wpm: 38, date: 'গতকাল', status: 'passed' },
            { lesson: 'যুক্তবর্ণ ড্রিল ২', acc: 95, wpm: 35, date: '২ দিন আগে', status: 'passed' }
        ],
        notes: 'চমৎকার পারফরম্যান্স।'
    }
];

export default function AdminPanel({ isOpen, onClose }) {
    const { user } = useAuth();
    const { liveStudents = [], telemetryLogs = [] } = useLiveActivity() || {};
    const [activeTab, setActiveTab] = useState('live'); // 'live', 'overview', 'database', 'analytics', 'settings', 'notices'

    // Student Database State
    const [students, setStudents] = useState(() => {
        const saved = localStorage.getItem('admin_students_database');
        return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
    });

    // Filtering, Search & Sorting
    const [searchTerm, setSearchTerm] = useState('');
    const [filterLang, setFilterLang] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortBy, setSortBy] = useState('default');

    // Selected Student for View / Edit / Delete / Spectate Modals
    const [viewingStudent, setViewingStudent] = useState(null);
    const [editingStudent, setEditingStudent] = useState(null);
    const [spectatingStudent, setSpectatingStudent] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [deletingStudentId, setDeletingStudentId] = useState(null);

    // New Student Form State
    const [newStudentForm, setNewStudentForm] = useState({
        name: '',
        email: '',
        phone: '',
        roll: '',
        lang: 'বাংলা',
        status: 'অনুশীলনরত',
        notes: ''
    });

    // System Configurations with localStorage persistence
    const [minAccuracy, setMinAccuracy] = useState(() => {
        return parseInt(localStorage.getItem('admin_min_accuracy') || '90', 10);
    });
    const [autoTimer, setAutoTimer] = useState(() => {
        return parseInt(localStorage.getItem('admin_auto_timer') || '3', 10);
    });
    const [allowSkipOnPass, setAllowSkipOnPass] = useState(true);
    const [enforceVirtualKeyboard, setEnforceVirtualKeyboard] = useState(true);
    const [saveSuccess, setSaveSuccess] = useState(false);

    // Notice State
    const [notices, setNotices] = useState(() => {
        const saved = localStorage.getItem('admin_notices');
        return saved ? JSON.parse(saved) : [
            { id: 1, text: '📢 সকল শিক্ষার্থীকে জানানো যাচ্ছে যে প্রতিটি লেসনে কমপক্ষে ৯০% একুরেসি অর্জন আবশ্যক।', priority: 'জরুরি', target: 'সকল', date: '১৭ আগস্ট, ২০২৬' },
            { id: 2, text: '⚡ নতুন বাংলা যুক্তবর্ণের এডভান্স প্র্যাক্টিস ড্রিল চালু হয়েছে।', priority: 'নতুন ফিচার', target: 'বাংলা ব্যাচ', date: '১৫ আগস্ট, ২০২৬' }
        ];
    });
    const [newNoticeText, setNewNoticeText] = useState('');
    const [newNoticePriority, setNewNoticePriority] = useState('সাধারণ');
    const [newNoticeTarget, setNewNoticeTarget] = useState('সকল');

    // Sync students to localStorage
    useEffect(() => {
        localStorage.setItem('admin_students_database', JSON.stringify(students));
    }, [students]);

    if (!isOpen) return null;

    // Handlers
    const handleSaveSettings = (e) => {
        e.preventDefault();
        localStorage.setItem('admin_min_accuracy', minAccuracy.toString());
        localStorage.setItem('admin_auto_timer', autoTimer.toString());
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2500);
    };

    const handleAddStudent = (e) => {
        e.preventDefault();
        if (!newStudentForm.name || !newStudentForm.email) return;

        const newStudent = {
            id: `std-${Date.now()}`,
            roll: newStudentForm.roll || `DB-${new Date().getFullYear()}-${Math.floor(10 + Math.random() * 90)}`,
            name: newStudentForm.name,
            email: newStudentForm.email,
            phone: newStudentForm.phone || 'N/A',
            lang: newStudentForm.lang,
            completed: 0,
            totalLessons: 24,
            avgAcc: 0,
            avgSpeed: 0,
            status: newStudentForm.status,
            enrolledDate: new Date().toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' }),
            lastActive: 'এখনই যুক্ত হয়েছে',
            history: [],
            notes: newStudentForm.notes || 'নতুন শিক্ষার্থী'
        };

        setStudents([newStudent, ...students]);
        setIsAddModalOpen(false);
        setNewStudentForm({ name: '', email: '', phone: '', roll: '', lang: 'বাংলা', status: 'অনুশীলনরত', notes: '' });
    };

    const handleUpdateStudent = (e) => {
        e.preventDefault();
        if (!editingStudent) return;

        setStudents(students.map(s => s.id === editingStudent.id ? editingStudent : s));
        setEditingStudent(null);
    };

    const handleDeleteStudent = (id) => {
        setStudents(students.filter(s => s.id !== id));
        setDeletingStudentId(null);
        if (viewingStudent?.id === id) setViewingStudent(null);
    };

    const handleResetProgress = (id) => {
        setStudents(students.map(s => {
            if (s.id === id) {
                return {
                    ...s,
                    completed: 0,
                    avgAcc: 0,
                    avgSpeed: 0,
                    status: 'অনুশীলনরত',
                    history: []
                };
            }
            return s;
        }));
        if (viewingStudent?.id === id) {
            setViewingStudent(prev => ({ ...prev, completed: 0, avgAcc: 0, avgSpeed: 0, status: 'অনুশীলনরত', history: [] }));
        }
    };

    const handleAddNotice = (e) => {
        e.preventDefault();
        if (!newNoticeText.trim()) return;

        const item = {
            id: Date.now(),
            text: newNoticeText.trim(),
            priority: newNoticePriority,
            target: newNoticeTarget,
            date: new Date().toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' })
        };
        const updated = [item, ...notices];
        setNotices(updated);
        localStorage.setItem('admin_notices', JSON.stringify(updated));
        setNewNoticeText('');
    };

    const handleDeleteNotice = (id) => {
        const updated = notices.filter(n => n.id !== id);
        setNotices(updated);
        localStorage.setItem('admin_notices', JSON.stringify(updated));
    };

    // Filter & Sort Logic
    const filteredStudents = students
        .filter(s => {
            const matchesSearch = 
                s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                s.roll.toLowerCase().includes(searchTerm.toLowerCase()) ||
                s.phone.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesLang = filterLang === 'all' || s.lang === filterLang;
            const matchesStatus = filterStatus === 'all' || s.status === filterStatus;
            return matchesSearch && matchesLang && matchesStatus;
        })
        .sort((a, b) => {
            if (sortBy === 'acc-high') return b.avgAcc - a.avgAcc;
            if (sortBy === 'acc-low') return a.avgAcc - b.avgAcc;
            if (sortBy === 'speed-high') return b.avgSpeed - a.avgSpeed;
            if (sortBy === 'completed-high') return b.completed - a.completed;
            if (sortBy === 'name-asc') return a.name.localeCompare(b.name, 'bn');
            return 0;
        });

    // Helper: format seconds to mm:ss or text
    const formatDuration = (secs) => {
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        return `${m < 10 ? '০' : ''}${m.toLocaleString('bn-BD')} মি: ${s < 10 ? '০' : ''}${s.toLocaleString('bn-BD')} সেঃ`;
    };

    // Overall Analytics Computations
    const totalStudentsCount = students.length;
    const passedStudentsCount = students.filter(s => s.status === 'পাসকৃত').length;
    const retryStudentsCount = students.filter(s => s.status === 'রিট্রাই প্রয়োজন').length;
    const overallAvgAcc = (students.reduce((acc, s) => acc + (s.avgAcc || 0), 0) / (totalStudentsCount || 1)).toFixed(1);
    const overallAvgSpeed = (students.reduce((acc, s) => acc + (s.avgSpeed || 0), 0) / (totalStudentsCount || 1)).toFixed(1);
    const totalCompletedLessons = students.reduce((acc, s) => acc + (s.completed || 0), 0);

    // Live Metrics Computations
    const liveActiveCount = liveStudents.length;
    const liveAvgWpm = (liveStudents.reduce((acc, s) => acc + s.wpm, 0) / (liveActiveCount || 1)).toFixed(1);
    const liveAvgAccuracy = (liveStudents.reduce((acc, s) => acc + s.accuracy, 0) / (liveActiveCount || 1)).toFixed(1);

    // Accuracy Distribution
    const starAccCount = students.filter(s => s.avgAcc >= 95).length;
    const passedAccCount = students.filter(s => s.avgAcc >= 90 && s.avgAcc < 95).length;
    const retryAccCount = students.filter(s => s.avgAcc >= 80 && s.avgAcc < 90).length;
    const criticalAccCount = students.filter(s => s.avgAcc < 80).length;

    // Export CSV Helper
    const handleExportCSV = () => {
        const headers = ["রোল", "নাম", "ইমেইল", "ফোন", "ভাষা", "সম্পূর্ণ লেসন", "গড় একুরেসি (%)", "গড় স্পিড (WPM)", "স্ট্যাটাস", "ভর্তির তারিখ"];
        const rows = filteredStudents.map(s => [
            s.roll,
            `"${s.name}"`,
            s.email,
            s.phone,
            s.lang,
            `${s.completed}/${s.totalLessons}`,
            s.avgAcc,
            s.avgSpeed,
            s.status,
            s.enrolledDate
        ]);
        const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `deliBhai_Students_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="admin-page-container">
            {/* Top Navigation & Status Bar */}
            <div className="admin-page-topbar">
                <div className="admin-topbar-left">
                    <button 
                        type="button" 
                        className="admin-back-to-typing-btn"
                        onClick={onClose}
                        title="টাইপিং প্র্যাক্টিস বোর্ডে ফিরে যান"
                    >
                        <span className="back-arrow-icon">←</span>
                        <span>টাইপিং বোর্ডে ফিরুন</span>
                    </button>
                    <div className="admin-page-live-pill">
                        <span className="live-pulse-dot"></span>
                        <span>লাইভ ক্লাস মনিটরিং সক্রিয় ({liveActiveCount} জন)</span>
                    </div>
                </div>

                <div className="admin-page-status-right">
                    <div className="admin-logged-tag">
                        <span className="admin-avatar-mini">👑</span>
                        <div className="admin-meta-info">
                            <span className="admin-email-text">{user?.email || 'bkctg540@gmail.com'}</span>
                            <span className="admin-badge-pill">সুপার এডমিন কন্ট্রোল</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Admin Control Card with Left Sidebar Layout */}
            <div className="admin-main-card">
                {/* 1. Top Header Banner */}
                <div className="admin-panel-header">
                    <div className="admin-header-left">
                        <div className="admin-header-icon">👑</div>
                        <div>
                            <div className="admin-header-title">
                                deliBhai IT - সেন্ট্রাল এডমিন ও লাইভ মনিটরিং সেন্টার
                            </div>
                            <div className="admin-header-subtitle">
                                লাইভ ক্লাসরুম পর্যবেক্ষণ, কি-স্ট্রোক স্ট্রীম, শিক্ষার্থী ডাটাবেজ ও এনালিটিক্স
                            </div>
                        </div>
                    </div>

                    <div className="admin-header-quick-stats">
                        <div className="quick-stat-badge live-glow">
                            <span className="stat-num">{liveActiveCount}</span>
                            <span className="stat-label">🔴 লাইভ টাইপ করছে</span>
                        </div>
                        <div className="quick-stat-badge success">
                            <span className="stat-num">{liveAvgAccuracy}%</span>
                            <span className="stat-label">লাইভ একুরেসি</span>
                        </div>
                        <div className="quick-stat-badge info">
                            <span className="stat-num">{liveAvgWpm}</span>
                            <span className="stat-label">লাইভ WPM</span>
                        </div>
                    </div>
                </div>

                {/* 2. Split Layout: Left Sidebar + Right Content Area */}
                <div className="admin-layout-split">
                    {/* Left Sidebar Navigation */}
                    <aside className="admin-sidebar-nav">
                        <div className="sidebar-section-title">নেভিগেশন মেনু</div>
                        <div className="sidebar-menu-list">
                            <button 
                                type="button"
                                className={`sidebar-nav-item live-pulse-item ${activeTab === 'live' ? 'active' : ''}`}
                                onClick={() => setActiveTab('live')}
                            >
                                <span className="sidebar-nav-icon">🔴</span>
                                <span className="sidebar-nav-text">লাইভ ক্লাস মনিটর</span>
                                <span className="sidebar-count-badge live">{liveActiveCount} জন</span>
                            </button>
                            <button 
                                type="button"
                                className={`sidebar-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                                onClick={() => setActiveTab('overview')}
                            >
                                <span className="sidebar-nav-icon">📊</span>
                                <span className="sidebar-nav-text">ড্যাশবোর্ড ও ওভারভিউ</span>
                            </button>
                            <button 
                                type="button"
                                className={`sidebar-nav-item ${activeTab === 'database' ? 'active' : ''}`}
                                onClick={() => setActiveTab('database')}
                            >
                                <span className="sidebar-nav-icon">👥</span>
                                <span className="sidebar-nav-text">শিক্ষার্থী ডাটাবেজ</span>
                                <span className="sidebar-count-badge">{students.length}</span>
                            </button>
                            <button 
                                type="button"
                                className={`sidebar-nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
                                onClick={() => setActiveTab('analytics')}
                            >
                                <span className="sidebar-nav-icon">📈</span>
                                <span className="sidebar-nav-text">প্রগ্রেসিভ এনালিটিক্স</span>
                            </button>
                            <button 
                                type="button"
                                className={`sidebar-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                                onClick={() => setActiveTab('settings')}
                            >
                                <span className="sidebar-nav-icon">⚙️</span>
                                <span className="sidebar-nav-text">লেসন ও একুরেসি কন্ট্রোল</span>
                            </button>
                            <button 
                                type="button"
                                className={`sidebar-nav-item ${activeTab === 'notices' ? 'active' : ''}`}
                                onClick={() => setActiveTab('notices')}
                            >
                                <span className="sidebar-nav-icon">📢</span>
                                <span className="sidebar-nav-text">নোটিশ ও ব্রডকাস্ট</span>
                                <span className="sidebar-count-badge info">{notices.length}</span>
                            </button>
                        </div>

                        <div className="sidebar-divider"></div>

                        <div className="sidebar-section-title">কুইক একশন</div>
                        <div className="sidebar-quick-actions">
                            <button 
                                type="button" 
                                className="sidebar-quick-btn add-btn"
                                onClick={() => setIsAddModalOpen(true)}
                            >
                                <span>➕ নতুন শিক্ষার্থী যুক্ত</span>
                            </button>
                            <button 
                                type="button" 
                                className="sidebar-quick-btn export-btn"
                                onClick={handleExportCSV}
                            >
                                <span>📥 CSV ব্যাকআপ</span>
                            </button>
                        </div>

                        <div className="sidebar-footer-card">
                            <div className="sidebar-footer-title">🖥️ deliBhai IT System</div>
                            <div className="sidebar-footer-desc">Live Telemetry Engine v2.4</div>
                        </div>
                    </aside>

                    {/* Right Main Content Area */}
                    <div className="admin-tab-content-area">
                        {/* =========================================================
                            TAB 0: LIVE STUDENT ACTIVITY & KEYSTROKE MONITOR
                            ========================================================= */}
                        {activeTab === 'live' && (
                            <div className="admin-live-section">
                                {/* Live Telemetry Header Banner */}
                                <div className="live-header-banner">
                                    <div className="live-header-info">
                                        <div className="live-title-row">
                                            <span className="live-red-indicator"></span>
                                            <h2>🔴 লাইভ শিক্ষার্থী এক্টিভিটি ও কী-স্ট্রোক মনিটরিং</h2>
                                        </div>
                                        <p>
                                            শিক্ষার্থীরা কোন লেসনে কাজ করছে, রিয়েল-টাইমে কী কী টাইপ করছে এবং কতক্ষণ ধরে অনুশীলন করছে তার লাইভ স্ট্রীম
                                        </p>
                                    </div>
                                    <div className="live-telemetry-chips">
                                        <div className="chip-badge active-pill">
                                            <span>🟢 লাইভ এক্টিভ: <strong>{liveActiveCount} জন</strong></span>
                                        </div>
                                        <div className="chip-badge speed-pill">
                                            <span>⚡ লাইভ স্পিড: <strong>{liveAvgWpm} WPM</strong></span>
                                        </div>
                                        <div className="chip-badge acc-pill">
                                            <span>🎯 লাইভ নির্ভুলতা: <strong>{liveAvgAccuracy}%</strong></span>
                                        </div>
                                    </div>
                                </div>

                                {/* Active Live Students Cards Grid */}
                                <div className="live-students-grid">
                                    {liveStudents.map((std) => (
                                        <div key={std.id} className={`live-student-card ${std.isLocal ? 'local-highlight' : ''}`}>
                                            {/* Student Card Top Bar */}
                                            <div className="live-card-topbar">
                                                <div className="live-std-meta">
                                                    <div className="live-avatar">
                                                        {std.avatar}
                                                        <span className="online-green-beacon"></span>
                                                    </div>
                                                    <div>
                                                        <div className="live-std-name">
                                                            {std.name}
                                                            {std.isLocal && <span className="local-tag">লোকাল</span>}
                                                        </div>
                                                        <div className="live-std-sub">
                                                            {std.roll} • <span className="live-lang-tag">{std.lang}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="live-card-actions">
                                                    <button 
                                                        type="button" 
                                                        className="spectate-screen-btn"
                                                        onClick={() => setSpectatingStudent(std)}
                                                        title="সম্পূর্ণ স্ক্রিন লাইভ দেখুন"
                                                    >
                                                        👁️ লাইভ স্ক্রিন
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Active Lesson Info */}
                                            <div className="live-lesson-banner">
                                                <span className="lesson-icon">📖</span>
                                                <div className="lesson-name-box">
                                                    <span className="lesson-label">বর্তমান লেসন:</span>
                                                    <span className="lesson-title-text">{std.lesson}</span>
                                                </div>
                                            </div>

                                            {/* Real-time Keystroke Screen (Virtual Terminal) */}
                                            <div className="live-keystroke-screen">
                                                <div className="screen-header-bar">
                                                    <span className="terminal-dots">🔴 🟡 🟢</span>
                                                    <span className="screen-title">রিয়েল-টাইম টাইপিং ডিসপ্লে</span>
                                                    <span className="live-key-hint">কী: <strong>'{std.currentKey}'</strong></span>
                                                </div>
                                                <div className="screen-content-text">
                                                    <span className="typed-correct-part">{std.typedBuffer}</span>
                                                    <span className="live-cursor-caret">|</span>
                                                    <span className="remaining-target-part">
                                                        {std.targetText.slice(std.currentIndex)}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Live Telemetry Metrics Row */}
                                            <div className="live-metrics-row">
                                                <div className="metric-box">
                                                    <span className="m-label">গতি (WPM)</span>
                                                    <span className="m-val speed">{std.wpm}</span>
                                                </div>
                                                <div className="metric-box">
                                                    <span className="m-label">নির্ভুলতা</span>
                                                    <span className={`m-val acc ${std.accuracy >= 90 ? 'pass' : 'retry'}`}>
                                                        {std.accuracy}%
                                                    </span>
                                                </div>
                                                <div className="metric-box">
                                                    <span className="m-label">কতক্ষণ ধরে টাইপ করছে</span>
                                                    <span className="m-val time">⏱️ {formatDuration(std.timeSpentSeconds)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Live Event Telemetry Stream / Activity Log */}
                                <div className="live-activity-stream-card">
                                    <div className="stream-header">
                                        <div className="stream-title-group">
                                            <span className="stream-icon">📡</span>
                                            <h3>লাইভ ইভেন্ট ও কী-স্ট্রোক লগ (Live Telemetry Log)</h3>
                                        </div>
                                        <span className="stream-refresh-tag">রিয়েল-টাইম অটো-সিঙ্ক</span>
                                    </div>
                                    <div className="stream-logs-container">
                                        {telemetryLogs.map((log) => (
                                            <div key={log.id} className={`stream-log-entry ${log.type}`}>
                                                <span className="log-time-tag">⏱️ {log.time}</span>
                                                <span className="log-msg-text">{log.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* =========================================================
                            TAB 1: OVERVIEW & LIVE STATS
                            ========================================================= */}
                        {activeTab === 'overview' && (
                            <div className="admin-overview-section">
                                {/* KPI Metrics Row */}
                                <div className="admin-stats-grid">
                                    <div className="admin-stat-card stat-cyan">
                                        <div className="stat-card-top">
                                            <span className="stat-label">মোট নিবন্ধিত শিক্ষার্থী</span>
                                            <span className="stat-icon-wrap">👥</span>
                                        </div>
                                        <div className="stat-value">{totalStudentsCount} <span className="stat-unit">জন</span></div>
                                        <div className="stat-footer-text">
                                            <span className="text-trend-up">↑ ১২.৫%</span> গত সপ্তাহের চেয়ে বৃদ্ধি
                                        </div>
                                    </div>

                                    <div className="admin-stat-card stat-emerald">
                                        <div className="stat-card-top">
                                            <span className="stat-label">গড় নির্ভুলতা হার (Accuracy)</span>
                                            <span className="stat-icon-wrap">🎯</span>
                                        </div>
                                        <div className="stat-value">{overallAvgAcc}%</div>
                                        <div className="stat-footer-text">
                                            <span className="text-badge-pass">৯০% থ্রেশহোল্ড পূরণ</span>
                                        </div>
                                    </div>

                                    <div className="admin-stat-card stat-amber">
                                        <div className="stat-card-top">
                                            <span className="stat-label">গড় টাইপিং স্পিড</span>
                                            <span className="stat-icon-wrap">⚡</span>
                                        </div>
                                        <div className="stat-value">{overallAvgSpeed} <span className="stat-unit">WPM</span></div>
                                        <div className="stat-footer-text">
                                            সর্বোচ্চ গতি: <strong style={{ color: '#fbbf24' }}>৪২.০ WPM</strong>
                                        </div>
                                    </div>

                                    <div className="admin-stat-card stat-purple">
                                        <div className="stat-card-top">
                                            <span className="stat-label">সম্পূর্ণকৃত লেসন ড্রিল</span>
                                            <span className="stat-icon-wrap">🏆</span>
                                        </div>
                                        <div className="stat-value">{totalCompletedLessons} <span className="stat-unit">টি</span></div>
                                        <div className="stat-footer-text">
                                            {passedStudentsCount} জন শিক্ষার্থী পাসকৃত
                                        </div>
                                    </div>
                                </div>

                                {/* Middle Analytics Grid */}
                                <div className="overview-dual-grid">
                                    {/* Accuracy Distribution Card */}
                                    <div className="overview-subcard">
                                        <div className="subcard-header">
                                            <h3>🎯 একুরেসি লেভেল ডিস্ট্রিবিউশন</h3>
                                            <span className="subcard-tag">বর্তমান শিক্ষার্থী ব্যাচ</span>
                                        </div>
                                        <div className="acc-distribution-bars">
                                            <div className="dist-row">
                                                <div className="dist-label-group">
                                                    <span className="dist-badge star">৯৫% - ১০০% (এক্সপার্ট)</span>
                                                    <span className="dist-count">{starAccCount} জন</span>
                                                </div>
                                                <div className="dist-track">
                                                    <div className="dist-fill star" style={{ width: `${(starAccCount / totalStudentsCount) * 100}%` }}></div>
                                                </div>
                                            </div>

                                            <div className="dist-row">
                                                <div className="dist-label-group">
                                                    <span className="dist-badge pass">৯০% - ৯৪% (পাসকৃত)</span>
                                                    <span className="dist-count">{passedAccCount} জন</span>
                                                </div>
                                                <div className="dist-track">
                                                    <div className="dist-fill pass" style={{ width: `${(passedAccCount / totalStudentsCount) * 100}%` }}></div>
                                                </div>
                                            </div>

                                            <div className="dist-row">
                                                <div className="dist-label-group">
                                                    <span className="dist-badge practice">৮০% - ৮৯% (অনুশীলনরত)</span>
                                                    <span className="dist-count">{retryAccCount} জন</span>
                                                </div>
                                                <div className="dist-track">
                                                    <div className="dist-fill practice" style={{ width: `${(retryAccCount / totalStudentsCount) * 100}%` }}></div>
                                                </div>
                                            </div>

                                            <div className="dist-row">
                                                <div className="dist-label-group">
                                                    <span className="dist-badge alert">&lt; ৮০% (রিট্রাই প্রয়োজন)</span>
                                                    <span className="dist-count">{criticalAccCount} জন</span>
                                                </div>
                                                <div className="dist-track">
                                                    <div className="dist-fill alert" style={{ width: `${(criticalAccCount / totalStudentsCount) * 100}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Top Performers Leaderboard Card */}
                                    <div className="overview-subcard">
                                        <div className="subcard-header">
                                            <h3>🏆 টপ পারফর্মার লিডারবোর্ড</h3>
                                            <button className="view-all-link-btn" onClick={() => setActiveTab('database')}>সব দেখুন →</button>
                                        </div>
                                        <div className="leaderboard-mini-list">
                                            {students.slice(0, 4).map((std, idx) => (
                                                <div key={std.id} className="leaderboard-item" onClick={() => setViewingStudent(std)}>
                                                    <div className="rank-badge-wrap">
                                                        {idx === 0 && <span className="rank-badge gold">🥇 ১</span>}
                                                        {idx === 1 && <span className="rank-badge silver">🥈 ২</span>}
                                                        {idx === 2 && <span className="rank-badge bronze">🥉 ৩</span>}
                                                        {idx > 2 && <span className="rank-badge default">৪</span>}
                                                    </div>
                                                    <div className="leaderboard-user">
                                                        <div className="leaderboard-name">{std.name}</div>
                                                        <div className="leaderboard-lang">{std.lang} • {std.roll}</div>
                                                    </div>
                                                    <div className="leaderboard-score">
                                                        <span className="score-acc">{std.avgAcc}% নির্ভুলতা</span>
                                                        <span className="score-wpm">{std.avgSpeed} WPM</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* =========================================================
                            TAB 2: FULL STUDENT DATABASE (CRUD, FILTER, SEARCH, EXPORT)
                            ========================================================= */}
                        {activeTab === 'database' && (
                            <div className="admin-database-section">
                                {/* Toolbar: Search, Filters & Action Buttons */}
                                <div className="database-toolbar">
                                    <div className="toolbar-search-wrap">
                                        <span className="search-icon">🔍</span>
                                        <input 
                                            type="text" 
                                            placeholder="শিক্ষার্থীর নাম, ইমেইল, ফোন অথবা রোল দিয়ে খুঁজুন..." 
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="student-search-input"
                                        />
                                        {searchTerm && (
                                            <button className="clear-search-btn" onClick={() => setSearchTerm('')}>✕</button>
                                        )}
                                    </div>

                                    <div className="toolbar-filters-group">
                                        {/* Language Filter */}
                                        <select 
                                            value={filterLang} 
                                            onChange={(e) => setFilterLang(e.target.value)}
                                            className="admin-select-filter"
                                        >
                                            <option value="all">🌐 সকল ভাষা ({students.length})</option>
                                            <option value="বাংলা">বাংলা ({students.filter(s => s.lang === 'বাংলা').length})</option>
                                            <option value="English">English ({students.filter(s => s.lang === 'English').length})</option>
                                            <option value="العربية">العربية ({students.filter(s => s.lang === 'العربية').length})</option>
                                        </select>

                                        {/* Status Filter */}
                                        <select 
                                            value={filterStatus} 
                                            onChange={(e) => setFilterStatus(e.target.value)}
                                            className="admin-select-filter"
                                        >
                                            <option value="all">📌 সকল স্ট্যাটাস</option>
                                            <option value="পাসকৃত">✅ পাসকৃত ({students.filter(s => s.status === 'পাসকৃত').length})</option>
                                            <option value="অনুশীলনরত">⏳ অনুশীলনরত ({students.filter(s => s.status === 'অনুশীলনরত').length})</option>
                                            <option value="রিট্রাই প্রয়োজন">⚠️ রিট্রাই প্রয়োজন ({students.filter(s => s.status === 'রিট্রাই প্রয়োজন').length})</option>
                                        </select>

                                        {/* Sorting */}
                                        <select 
                                            value={sortBy} 
                                            onChange={(e) => setSortBy(e.target.value)}
                                            className="admin-select-filter"
                                        >
                                            <option value="default">↕️ সাজান (ডিফল্ট)</option>
                                            <option value="acc-high">🎯 একুরেসি (সর্বোচ্চ)</option>
                                            <option value="acc-low">🎯 একুরেসি (সর্বনিম্ন)</option>
                                            <option value="speed-high">⚡ স্পিড WPM (সর্বোচ্চ)</option>
                                            <option value="completed-high">🏆 লেসন সম্পন্ন (সর্বোচ্চ)</option>
                                            <option value="name-asc">🔤 নাম (A-Z)</option>
                                        </select>

                                        {/* Action Buttons */}
                                        <button 
                                            type="button" 
                                            className="admin-action-btn export-btn"
                                            onClick={handleExportCSV}
                                            title="এক্সেল/সিএসভি ফরম্যাটে ডাউনলোড করুন"
                                        >
                                            📥 CSV এক্সপোর্ট
                                        </button>

                                        <button 
                                            type="button" 
                                            className="admin-action-btn add-std-btn"
                                            onClick={() => setIsAddModalOpen(true)}
                                        >
                                            ➕ নতুন শিক্ষার্থী
                                        </button>
                                    </div>
                                </div>

                                {/* Student Count Summary Bar */}
                                <div className="table-summary-bar">
                                    <span>মোট পাওয়া গেছে: <strong>{filteredStudents.length} জন</strong> শিক্ষার্থী</span>
                                    {(filterLang !== 'all' || filterStatus !== 'all' || searchTerm) && (
                                        <button 
                                            className="reset-filters-link"
                                            onClick={() => { setSearchTerm(''); setFilterLang('all'); setFilterStatus('all'); setSortBy('default'); }}
                                        >
                                            সব ফিল্টার রিসেট করুন
                                        </button>
                                    )}
                                </div>

                                {/* Database Table */}
                                <div className="admin-table-wrapper">
                                    <table className="admin-table">
                                        <thead>
                                            <tr>
                                                <th>রোল নং</th>
                                                <th>শিক্ষার্থীর নাম ও তথ্য</th>
                                                <th>ভাষা</th>
                                                <th>লেসন অগ্রগতি</th>
                                                <th>গড় একুরেসি</th>
                                                <th>গড় স্পিড</th>
                                                <th>স্ট্যাটাস</th>
                                                <th>সর্বশেষ সক্রিয়</th>
                                                <th style={{ textAlign: 'center' }}>একশন</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredStudents.length > 0 ? (
                                                filteredStudents.map((student) => (
                                                    <tr key={student.id}>
                                                        <td>
                                                            <span className="roll-tag">{student.roll}</span>
                                                        </td>
                                                        <td>
                                                            <div className="std-profile-cell">
                                                                <div className="std-avatar">
                                                                    {student.name.charAt(0)}
                                                                </div>
                                                                <div>
                                                                    <div className="std-name">{student.name}</div>
                                                                    <div className="std-email">{student.email} • {student.phone}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className={`lang-tag-pill ${student.lang === 'বাংলা' ? 'bn' : student.lang === 'English' ? 'en' : 'ar'}`}>
                                                                {student.lang}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <div className="table-progress-cell">
                                                                <div className="progress-info-text">
                                                                    <span>{student.completed}/{student.totalLessons}</span>
                                                                    <span>{Math.round((student.completed / student.totalLessons) * 100)}%</span>
                                                                </div>
                                                                <div className="table-progress-track">
                                                                    <div 
                                                                        className="table-progress-fill" 
                                                                        style={{ width: `${(student.completed / student.totalLessons) * 100}%` }}
                                                                    ></div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className={`table-acc-badge ${student.avgAcc >= 90 ? 'high' : student.avgAcc >= 80 ? 'medium' : 'low'}`}>
                                                                {student.avgAcc}%
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <strong style={{ color: '#f3f4f6' }}>{student.avgSpeed}</strong> <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>WPM</span>
                                                        </td>
                                                        <td>
                                                            <span className={`status-pill ${student.status === 'পাসকৃত' ? 'passed' : student.status === 'অনুশীলনরত' ? 'in-progress' : 'needs-retry'}`}>
                                                                {student.status}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span className="last-active-text">{student.lastActive}</span>
                                                        </td>
                                                        <td>
                                                            <div className="table-action-btns">
                                                                <button 
                                                                    type="button" 
                                                                    className="icon-action-btn view" 
                                                                    onClick={() => setViewingStudent(student)}
                                                                    title="বিস্তারিত প্রোফাইল ও ইতিহাস দেখুন"
                                                                >
                                                                    👁️
                                                                </button>
                                                                <button 
                                                                    type="button" 
                                                                    className="icon-action-btn edit" 
                                                                    onClick={() => setEditingStudent({ ...student })}
                                                                    title="শিক্ষার্থীর তথ্য সম্পাদনা করুন"
                                                                >
                                                                    ✏️
                                                                </button>
                                                                <button 
                                                                    type="button" 
                                                                    className="icon-action-btn delete" 
                                                                    onClick={() => setDeletingStudentId(student.id)}
                                                                    title="শিক্ষার্থী মুছে ফেলুন"
                                                                >
                                                                    🗑️
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="9" style={{ textAlign: 'center', padding: '40px 20px', color: '#9ca3af' }}>
                                                        <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🔍</div>
                                                        কোনো শিক্ষার্থীর রেকর্ড পাওয়া যায়নি।
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* =========================================================
                            TAB 3: PROGRESSIVE ANALYTICS & INSIGHTS
                            ========================================================= */}
                        {activeTab === 'analytics' && (
                            <div className="admin-analytics-section">
                                <div className="analytics-hero-banner">
                                    <div className="hero-text-block">
                                        <h2>📈 শিক্ষার্থী প্রগতি ও পারফরম্যান্স এনালাইসিস</h2>
                                        <p>টাইপিং গতি, নির্ভুলতা উন্নতি এবং লেসন সমাপ্তির লাইভ ভিজ্যুয়াল গ্রাফ ও ট্রেন্ড</p>
                                    </div>
                                    <div className="hero-benchmark-pill">
                                        <span>🎯 স্ট্যান্ডার্ড পাসিং একুরেসি: <strong>{minAccuracy}%</strong></span>
                                    </div>
                                </div>

                                {/* Analytics Visual Grid */}
                                <div className="analytics-charts-grid">
                                    {/* Speed Progression Trend (SVG Chart) */}
                                    <div className="chart-card">
                                        <div className="chart-header">
                                            <h3>⚡ গতি বৃদ্ধির ট্রেন্ড লাইন (WPM Progression)</h3>
                                            <span className="chart-legend">লেসন ১ থেকে লেসন ২৪</span>
                                        </div>
                                        <div className="svg-chart-container">
                                            <svg viewBox="0 0 500 200" className="trend-svg">
                                                <defs>
                                                    <linearGradient id="speedGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                                                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                                                    </linearGradient>
                                                </defs>
                                                {/* Grid Lines */}
                                                <line x1="40" y1="20" x2="480" y2="20" stroke="rgba(255,255,255,0.06)" strokeDasharray="4" />
                                                <line x1="40" y1="70" x2="480" y2="70" stroke="rgba(255,255,255,0.06)" strokeDasharray="4" />
                                                <line x1="40" y1="120" x2="480" y2="120" stroke="rgba(255,255,255,0.06)" strokeDasharray="4" />
                                                <line x1="40" y1="170" x2="480" y2="170" stroke="rgba(255,255,255,0.1)" />

                                                {/* Area & Line */}
                                                <path d="M 50 160 Q 120 140, 180 110 T 300 70 T 420 40 L 470 30 L 470 170 L 50 170 Z" fill="url(#speedGrad)" />
                                                <path d="M 50 160 Q 120 140, 180 110 T 300 70 T 420 40 L 470 30" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
                                                
                                                {/* Data Points */}
                                                <circle cx="50" cy="160" r="5" fill="#10b981" />
                                                <circle cx="180" cy="110" r="5" fill="#10b981" />
                                                <circle cx="300" cy="70" r="5" fill="#10b981" />
                                                <circle cx="420" cy="40" r="5" fill="#10b981" />
                                                <circle cx="470" cy="30" r="6" fill="#fbbf24" stroke="#ffffff" strokeWidth="2" />

                                                {/* Y-Axis Labels */}
                                                <text x="10" y="35" fill="#9ca3af" fontSize="10">45 WPM</text>
                                                <text x="10" y="75" fill="#9ca3af" fontSize="10">30 WPM</text>
                                                <text x="10" y="125" fill="#9ca3af" fontSize="10">15 WPM</text>
                                                <text x="10" y="175" fill="#9ca3af" fontSize="10">0 WPM</text>
                                            </svg>
                                        </div>
                                        <div className="chart-footer-note">
                                            💡 প্রথম ৩ ঘন্টায় গড় স্পিড ১৫ WPM থেকে বৃদ্ধি পেয়ে ৮ম ঘন্টায় ৩৫+ WPM এ উন্নীত হয়।
                                        </div>
                                    </div>

                                    {/* Language Breakdown & Bottleneck Lessons */}
                                    <div className="chart-card">
                                        <div className="chart-header">
                                            <h3>🌐 ভাষা ভিত্তিক ব্যাচ বণ্টন ও সমাপ্তির হার</h3>
                                        </div>
                                        <div className="lang-stats-breakdown">
                                            <div className="lang-stat-bar-item">
                                                <div className="lang-stat-info">
                                                    <span>🇧🇩 বাংলা টাইপিং (বিজয় লেআউট)</span>
                                                    <strong>{students.filter(s => s.lang === 'বাংলা').length} জন ({Math.round((students.filter(s => s.lang === 'বাংলা').length / totalStudentsCount) * 100)}%)</strong>
                                                </div>
                                                <div className="lang-bar-track">
                                                    <div className="lang-bar-fill bn" style={{ width: `${(students.filter(s => s.lang === 'বাংলা').length / totalStudentsCount) * 100}%` }}></div>
                                                </div>
                                            </div>

                                            <div className="lang-stat-bar-item">
                                                <div className="lang-stat-info">
                                                    <span>🇬🇧 English Typing (QWERTY)</span>
                                                    <strong>{students.filter(s => s.lang === 'English').length} জন ({Math.round((students.filter(s => s.lang === 'English').length / totalStudentsCount) * 100)}%)</strong>
                                                </div>
                                                <div className="lang-bar-track">
                                                    <div className="lang-bar-fill en" style={{ width: `${(students.filter(s => s.lang === 'English').length / totalStudentsCount) * 100}%` }}></div>
                                                </div>
                                            </div>

                                            <div className="lang-stat-bar-item">
                                                <div className="lang-stat-info">
                                                    <span>🇸🇦 العربية (Arabic Keyboard)</span>
                                                    <strong>{students.filter(s => s.lang === 'العربية').length} জন ({Math.round((students.filter(s => s.lang === 'العربية').length / totalStudentsCount) * 100)}%)</strong>
                                                </div>
                                                <div className="lang-bar-track">
                                                    <div className="lang-bar-fill ar" style={{ width: `${(students.filter(s => s.lang === 'العربية').length / totalStudentsCount) * 100}%` }}></div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bottleneck Alert Box */}
                                        <div className="bottleneck-alert-box">
                                            <div className="bottleneck-icon">⚠️</div>
                                            <div>
                                                <div className="bottleneck-title">জটিল লেসন পর্যবেক্ষণ (High Retry Drill)</div>
                                                <div className="bottleneck-desc">
                                                    শিক্ষার্থীরা সর্বাধিক সমস্যায় পড়েছে: <strong>লেসন ৫: বাংলা যুক্তবর্ণ (ক্ষ, জ্ঞ, ষ্ণ)</strong> এবং <strong>Arabic Shaddah</strong>।
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* =========================================================
                            TAB 4: SYSTEM & LESSON ACCURACY SETTINGS
                            ========================================================= */}
                        {activeTab === 'settings' && (
                            <div className="admin-settings-section">
                                <form onSubmit={handleSaveSettings} className="admin-settings-form">
                                    <div className="settings-section-card">
                                        <div className="settings-card-header">
                                            <div className="settings-card-icon">🎯</div>
                                            <div>
                                                <h3>লেসন পাসিং একুরেসি রুলস</h3>
                                                <p>লেসন সম্পন্ন করে পরবর্তী ধাপে যাওয়ার জন্য সর্বনিম্ন নির্ভুলতার শর্ত নির্ধারণ করুন</p>
                                            </div>
                                        </div>

                                        <div className="setting-control-row">
                                            <div className="setting-label-block">
                                                <label>মিনিমাম পাসিং নির্ভুলতা (Accuracy Threshold)</label>
                                                <span className="setting-helper-text">
                                                    শিক্ষার্থী এই মানের কম একুরেসি পেলে স্বয়ংক্রিয়ভাবে রিট্রাই কাউন্টডাউন শুরু হবে।
                                                </span>
                                            </div>
                                            <div className="setting-input-block">
                                                <div className="slider-value-display">{minAccuracy}%</div>
                                                <input 
                                                    type="range" 
                                                    min="75" 
                                                    max="100" 
                                                    step="1"
                                                    value={minAccuracy}
                                                    onChange={(e) => setMinAccuracy(parseInt(e.target.value, 10))}
                                                    className="admin-range-slider"
                                                />
                                            </div>
                                        </div>

                                        <div className="setting-control-row">
                                            <div className="setting-label-block">
                                                <label>অটোমেটিক কাউন্টডাউন টাইমার (সেকেন্ড)</label>
                                                <span className="setting-helper-text">
                                                    লেসন শেষ বা রিট্রাই হওয়ার সময় স্বয়ংক্রিয়ভাবে কাউন্টডাউন হওয়ার সময়কাল।
                                                </span>
                                            </div>
                                            <div className="setting-input-block">
                                                <div className="slider-value-display">{autoTimer} সেকেন্ড</div>
                                                <input 
                                                    type="range" 
                                                    min="1" 
                                                    max="10" 
                                                    step="1"
                                                    value={autoTimer}
                                                    onChange={(e) => setAutoTimer(parseInt(e.target.value, 10))}
                                                    className="admin-range-slider"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="settings-section-card">
                                        <div className="settings-card-header">
                                            <div className="settings-card-icon">⌨️</div>
                                            <div>
                                                <h3>টাইপিং ইন্টারফেস পলিসি</h3>
                                                <p>শিক্ষার্থীদের জন্য ভিজ্যুয়াল কী-বোর্ড ও ফিঙ্গার পজিশন সেটিংস</p>
                                            </div>
                                        </div>

                                        <div className="setting-toggle-row">
                                            <div>
                                                <div className="toggle-title">পাস করার পর এন্টার না চেপে অটো-নেক্সট লেসনে যাওয়া</div>
                                                <div className="toggle-subtitle">৯০%+ একুরেসি পেলে ৩ সেকেন্ডের পর স্বয়ংক্রিয়ভাবে পরের লেসনে চলে যাবে</div>
                                            </div>
                                            <input 
                                                type="checkbox" 
                                                checked={allowSkipOnPass} 
                                                onChange={(e) => setAllowSkipOnPass(e.target.checked)}
                                                className="admin-checkbox-toggle"
                                            />
                                        </div>

                                        <div className="setting-toggle-row">
                                            <div>
                                                <div className="toggle-title">ভার্চুয়াল কী-বোর্ড বাধ্যতামূলক প্রদর্শন</div>
                                                <div className="toggle-subtitle">সকল শিক্ষার্থীর জন্য কী-বোর্ডের হাত ও আঙ্গুলের নির্দেশিকা সক্রিয় রাখা</div>
                                            </div>
                                            <input 
                                                type="checkbox" 
                                                checked={enforceVirtualKeyboard} 
                                                onChange={(e) => setEnforceVirtualKeyboard(e.target.checked)}
                                                className="admin-checkbox-toggle"
                                            />
                                        </div>
                                    </div>

                                    <div className="settings-action-bar">
                                        {saveSuccess && (
                                            <span className="save-success-msg">
                                                ✓ সকল পরিবর্তন সফলভাবে সংরক্ষিত ও কার্যকর হয়েছে!
                                            </span>
                                        )}
                                        <button type="submit" className="save-settings-btn">
                                            💾 সেটিংস সংরক্ষণ করুন
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* =========================================================
                            TAB 5: NOTICES & BROADCAST ANNOUNCEMENTS
                            ========================================================= */}
                        {activeTab === 'notices' && (
                            <div className="admin-notices-section">
                                <div className="new-notice-card">
                                    <h3>📢 নতুন নোটিশ প্রকাশ করুন</h3>
                                    <form onSubmit={handleAddNotice} className="notice-form">
                                        <div className="notice-form-row">
                                            <div className="notice-field-group">
                                                <label>অগ্রাধিকার (Priority):</label>
                                                <select 
                                                    value={newNoticePriority} 
                                                    onChange={(e) => setNewNoticePriority(e.target.value)}
                                                    className="notice-select-input"
                                                >
                                                    <option value="জরুরি">🚨 জরুরি (Urgent)</option>
                                                    <option value="সাধারণ">📢 সাধারণ (General)</option>
                                                    <option value="নতুন ফিচার">⚡ নতুন ফিচার (Feature)</option>
                                                </select>
                                            </div>

                                            <div className="notice-field-group">
                                                <label>টার্গেট ব্যাচ:</label>
                                                <select 
                                                    value={newNoticeTarget} 
                                                    onChange={(e) => setNewNoticeTarget(e.target.value)}
                                                    className="notice-select-input"
                                                >
                                                    <option value="সকল">সকল শিক্ষার্থী</option>
                                                    <option value="বাংলা ব্যাচ">বাংলা ব্যাচ</option>
                                                    <option value="English Batch">English Batch</option>
                                                    <option value="Arabic Batch">Arabic Batch</option>
                                                </select>
                                            </div>
                                        </div>

                                        <textarea 
                                            rows="3"
                                            placeholder="শিক্ষার্থীদের জন্য জরুরি ঘোষণা বা নির্দেশিকা লিখুন..."
                                            value={newNoticeText}
                                            onChange={(e) => setNewNoticeText(e.target.value)}
                                            required
                                            className="notice-textarea"
                                        ></textarea>

                                        <button type="submit" className="add-notice-btn">
                                            + নোটিশ প্রকাশ করুন
                                        </button>
                                    </form>
                                </div>

                                <div className="notices-list-container">
                                    <h4>📌 প্রকাশিত নোটিশসমূহ ({notices.length})</h4>
                                    <div className="notices-grid">
                                        {notices.map(notice => (
                                            <div key={notice.id} className="notice-card">
                                                <div className="notice-card-header">
                                                    <div className="notice-tags-wrap">
                                                        <span className={`notice-priority-pill ${notice.priority === 'জরুরি' ? 'urgent' : notice.priority === 'নতুন ফিচার' ? 'feature' : 'general'}`}>
                                                            {notice.priority || 'সাধারণ'}
                                                        </span>
                                                        <span className="notice-target-tag">🎯 {notice.target || 'সকল'}</span>
                                                    </div>
                                                    <button 
                                                        type="button" 
                                                        className="delete-notice-btn"
                                                        onClick={() => handleDeleteNotice(notice.id)}
                                                        title="নোটিশ মুছে ফেলুন"
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                                <div className="notice-text">{notice.text}</div>
                                                <div className="notice-footer">📅 {notice.date}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* =========================================================
                MODAL 1: SPECTATE FULL SCREEN LIVE MONITOR
                ========================================================= */}
            {spectatingStudent && (
                <div className="admin-modal-overlay" onClick={() => setSpectatingStudent(null)}>
                    <div className="admin-modal-dialog spectate-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header spectate-header">
                            <div className="modal-title-wrap">
                                <span className="live-red-indicator big"></span>
                                <div>
                                    <h3>🔴 লাইভ ক্লাসরুম স্ক্রিন স্পেক্টেটর</h3>
                                    <p>{spectatingStudent.name} ({spectatingStudent.roll}) • {spectatingStudent.lang}</p>
                                </div>
                            </div>
                            <button className="modal-close-x" onClick={() => setSpectatingStudent(null)}>✕</button>
                        </div>

                        <div className="modal-body spectate-body">
                            {/* Live Stats Bar */}
                            <div className="spectate-stats-strip">
                                <div className="stat-strip-box">
                                    <span className="strip-label">বর্তমান গতি:</span>
                                    <span className="strip-val speed">{spectatingStudent.wpm} WPM</span>
                                </div>
                                <div className="stat-strip-box">
                                    <span className="strip-label">লাইভ একুরেসি:</span>
                                    <span className={`strip-val acc ${spectatingStudent.accuracy >= 90 ? 'pass' : 'retry'}`}>
                                        {spectatingStudent.accuracy}%
                                    </span>
                                </div>
                                <div className="stat-strip-box">
                                    <span className="strip-label">টাইপিং সময়কাল:</span>
                                    <span className="strip-val time">{formatDuration(spectatingStudent.timeSpentSeconds)}</span>
                                </div>
                                <div className="stat-strip-box">
                                    <span className="strip-label">শেষ কী:</span>
                                    <span className="strip-val key">'{spectatingStudent.currentKey}'</span>
                                </div>
                            </div>

                            {/* Active Lesson Display */}
                            <div className="spectate-lesson-strip">
                                📖 <strong>লেসন:</strong> {spectatingStudent.lesson}
                            </div>

                            {/* Live Typing Virtual Display */}
                            <div className="spectate-screen-monitor">
                                <div className="monitor-top-bar">
                                    <span>🟢 লাইভ টার্মিনাল আউটপুট (Real-time Keystrokes)</span>
                                </div>
                                <div className="monitor-typing-content">
                                    <span className="typed-correct-part">{spectatingStudent.typedBuffer}</span>
                                    <span className="live-cursor-caret pulsating">|</span>
                                    <span className="remaining-target-part">{spectatingStudent.targetText.slice(spectatingStudent.currentIndex)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="modal-btn secondary"
                                onClick={() => setSpectatingStudent(null)}
                            >
                                বন্ধ করুন
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* =========================================================
                MODAL 2: VIEW STUDENT PROFILE & PROGRESS HISTORY
                ========================================================= */}
            {viewingStudent && (
                <div className="admin-modal-overlay" onClick={() => setViewingStudent(null)}>
                    <div className="admin-modal-dialog profile-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className="modal-title-wrap">
                                <span className="modal-title-icon">👤</span>
                                <div>
                                    <h3>শিক্ষার্থীর বিস্তারিত প্রোফাইল</h3>
                                    <p>রোল: {viewingStudent.roll} • {viewingStudent.enrolledDate}</p>
                                </div>
                            </div>
                            <button className="modal-close-x" onClick={() => setViewingStudent(null)}>✕</button>
                        </div>

                        <div className="modal-body">
                            {/* Profile Info Header */}
                            <div className="student-profile-hero">
                                <div className="profile-hero-avatar">
                                    {viewingStudent.name.charAt(0)}
                                </div>
                                <div className="profile-hero-details">
                                    <div className="profile-hero-name">{viewingStudent.name}</div>
                                    <div className="profile-hero-contacts">
                                        📧 {viewingStudent.email} | 📞 {viewingStudent.phone}
                                    </div>
                                    <div className="profile-hero-tags">
                                        <span className="hero-tag-lang">🌐 {viewingStudent.lang}</span>
                                        <span className={`status-pill ${viewingStudent.status === 'পাসকৃত' ? 'passed' : 'in-progress'}`}>
                                            {viewingStudent.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Performance Cards */}
                            <div className="profile-perf-grid">
                                <div className="perf-card">
                                    <span className="perf-label">লেসন সম্পন্ন</span>
                                    <span className="perf-val">{viewingStudent.completed}/{viewingStudent.totalLessons}</span>
                                </div>
                                <div className="perf-card">
                                    <span className="perf-label">গড় নির্ভুলতা</span>
                                    <span className="perf-val highlight">{viewingStudent.avgAcc}%</span>
                                </div>
                                <div className="perf-card">
                                    <span className="perf-label">গড় স্পিড</span>
                                    <span className="perf-val speed">{viewingStudent.avgSpeed} WPM</span>
                                </div>
                            </div>

                            {/* Instructor Notes */}
                            <div className="profile-section-block">
                                <h4>📝 ইন্সট্রাক্টর নোট:</h4>
                                <div className="notes-box">{viewingStudent.notes || 'কোনো বিশেষ নোট নেই।'}</div>
                            </div>

                            {/* Practice History Drill Logs */}
                            <div className="profile-section-block">
                                <h4>📊 সর্বশেষ ড্রিল ইতিহাস:</h4>
                                <div className="history-logs-list">
                                    {viewingStudent.history && viewingStudent.history.length > 0 ? (
                                        viewingStudent.history.map((h, i) => (
                                            <div key={i} className="history-log-row">
                                                <div className="log-lesson-name">⌨️ {h.lesson}</div>
                                                <div className="log-stats">
                                                    <span className={`log-acc ${h.acc >= 90 ? 'passed' : 'retry'}`}>{h.acc}% নির্ভুলতা</span>
                                                    <span className="log-wpm">{h.wpm} WPM</span>
                                                    <span className="log-date">{h.date}</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div style={{ color: '#9ca3af', padding: '10px 0' }}>কোনো পূর্ববর্তী ড্রিল লগ পাওয়া যায়নি।</div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="modal-btn secondary"
                                onClick={() => handleResetProgress(viewingStudent.id)}
                            >
                                🔄 প্রোগ্রেস রিসেট
                            </button>
                            <button 
                                type="button" 
                                className="modal-btn primary"
                                onClick={() => {
                                    setEditingStudent({ ...viewingStudent });
                                    setViewingStudent(null);
                                }}
                            >
                                ✏️ তথ্য সম্পাদনা করুন
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* =========================================================
                MODAL 3: ADD NEW STUDENT MODAL
                ========================================================= */}
            {isAddModalOpen && (
                <div className="admin-modal-overlay" onClick={() => setIsAddModalOpen(false)}>
                    <div className="admin-modal-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className="modal-title-wrap">
                                <span className="modal-title-icon">➕</span>
                                <div>
                                    <h3>নতুন শিক্ষার্থী যুক্ত করুন</h3>
                                    <p>ডাটাবেজে নতুন শিক্ষার্থীর তথ্য ও ব্যাচ এনরোলমেন্ট</p>
                                </div>
                            </div>
                            <button className="modal-close-x" onClick={() => setIsAddModalOpen(false)}>✕</button>
                        </div>

                        <form onSubmit={handleAddStudent}>
                            <div className="modal-body form-grid">
                                <div className="form-group">
                                    <label>শিক্ষার্থীর পূর্ণ নাম <span className="required-star">*</span></label>
                                    <input 
                                        type="text" 
                                        required
                                        placeholder="উদাঃ মোঃ আরিফুল ইসলাম"
                                        value={newStudentForm.name}
                                        onChange={(e) => setNewStudentForm({ ...newStudentForm, name: e.target.value })}
                                        className="modal-form-input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>ইমেইল এড্রেস <span className="required-star">*</span></label>
                                    <input 
                                        type="email" 
                                        required
                                        placeholder="ariful@gmail.com"
                                        value={newStudentForm.email}
                                        onChange={(e) => setNewStudentForm({ ...newStudentForm, email: e.target.value })}
                                        className="modal-form-input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>মোবাইল নম্বর</label>
                                    <input 
                                        type="text" 
                                        placeholder="017xxxxxxxx"
                                        value={newStudentForm.phone}
                                        onChange={(e) => setNewStudentForm({ ...newStudentForm, phone: e.target.value })}
                                        className="modal-form-input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>রোল / স্টুডেন্ট আইডি</label>
                                    <input 
                                        type="text" 
                                        placeholder="DB-2026-07"
                                        value={newStudentForm.roll}
                                        onChange={(e) => setNewStudentForm({ ...newStudentForm, roll: e.target.value })}
                                        className="modal-form-input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>এনরোল্ড টাইপিং কোর্স / ভাষা</label>
                                    <select 
                                        value={newStudentForm.lang}
                                        onChange={(e) => setNewStudentForm({ ...newStudentForm, lang: e.target.value })}
                                        className="modal-form-input"
                                    >
                                        <option value="বাংলা">বাংলা টাইপিং (বিজয় লেআউট)</option>
                                        <option value="English">English Typing (QWERTY)</option>
                                        <option value="العربية">العربية (Arabic Keyboard)</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>স্ট্যাটাস</label>
                                    <select 
                                        value={newStudentForm.status}
                                        onChange={(e) => setNewStudentForm({ ...newStudentForm, status: e.target.value })}
                                        className="modal-form-input"
                                    >
                                        <option value="অনুশীলনরত">অনুশীলনরত</option>
                                        <option value="পাসকৃত">পাসকৃত</option>
                                        <option value="রিট্রাই প্রয়োজন">রিট্রাই প্রয়োজন</option>
                                    </select>
                                </div>

                                <div className="form-group full-width">
                                    <label>ইন্সট্রাক্টর নোট / বিশেষ নির্দেশনা</label>
                                    <textarea 
                                        rows="2"
                                        placeholder="শিক্ষার্থী সংক্রান্ত বিশেষ কোনো নোট..."
                                        value={newStudentForm.notes}
                                        onChange={(e) => setNewStudentForm({ ...newStudentForm, notes: e.target.value })}
                                        className="modal-form-input"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="modal-btn secondary"
                                    onClick={() => setIsAddModalOpen(false)}
                                >
                                    বাতিল
                                </button>
                                <button 
                                    type="submit" 
                                    className="modal-btn primary"
                                >
                                    + শিক্ষার্থী সংরক্ষণ করুন
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* =========================================================
                MODAL 4: EDIT STUDENT MODAL
                ========================================================= */}
            {editingStudent && (
                <div className="admin-modal-overlay" onClick={() => setEditingStudent(null)}>
                    <div className="admin-modal-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className="modal-title-wrap">
                                <span className="modal-title-icon">✏️</span>
                                <div>
                                    <h3>শিক্ষার্থীর তথ্য সম্পাদন</h3>
                                    <p>রোল: {editingStudent.roll}</p>
                                </div>
                            </div>
                            <button className="modal-close-x" onClick={() => setEditingStudent(null)}>✕</button>
                        </div>

                        <form onSubmit={handleUpdateStudent}>
                            <div className="modal-body form-grid">
                                <div className="form-group">
                                    <label>শিক্ষার্থীর পূর্ণ নাম</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={editingStudent.name}
                                        onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                                        className="modal-form-input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>ইমেইল এড্রেস</label>
                                    <input 
                                        type="email" 
                                        required
                                        value={editingStudent.email}
                                        onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })}
                                        className="modal-form-input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>মোবাইল নম্বর</label>
                                    <input 
                                        type="text" 
                                        value={editingStudent.phone}
                                        onChange={(e) => setEditingStudent({ ...editingStudent, phone: e.target.value })}
                                        className="modal-form-input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>কোর্স ভাষা</label>
                                    <select 
                                        value={editingStudent.lang}
                                        onChange={(e) => setEditingStudent({ ...editingStudent, lang: e.target.value })}
                                        className="modal-form-input"
                                    >
                                        <option value="বাংলা">বাংলা</option>
                                        <option value="English">English</option>
                                        <option value="العربية">العربية</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>সম্পূর্ণ লেসন সংখ্যা ({editingStudent.totalLessons} এর মধ্যে)</label>
                                    <input 
                                        type="number" 
                                        min="0"
                                        max="24"
                                        value={editingStudent.completed}
                                        onChange={(e) => setEditingStudent({ ...editingStudent, completed: parseInt(e.target.value || '0', 10) })}
                                        className="modal-form-input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>গড় একুরেসি (%)</label>
                                    <input 
                                        type="number" 
                                        step="0.1"
                                        min="0"
                                        max="100"
                                        value={editingStudent.avgAcc}
                                        onChange={(e) => setEditingStudent({ ...editingStudent, avgAcc: parseFloat(e.target.value || '0') })}
                                        className="modal-form-input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>স্ট্যাটাস</label>
                                    <select 
                                        value={editingStudent.status}
                                        onChange={(e) => setEditingStudent({ ...editingStudent, status: e.target.value })}
                                        className="modal-form-input"
                                    >
                                        <option value="পাসকৃত">পাসকৃত</option>
                                        <option value="অনুশীলনরত">অনুশীলনরত</option>
                                        <option value="রিট্রাই প্রয়োজন">রিট্রাই প্রয়োজন</option>
                                    </select>
                                </div>

                                <div className="form-group full-width">
                                    <label>ইন্সট্রাক্টর নোট</label>
                                    <textarea 
                                        rows="2"
                                        value={editingStudent.notes}
                                        onChange={(e) => setEditingStudent({ ...editingStudent, notes: e.target.value })}
                                        className="modal-form-input"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="modal-btn secondary"
                                    onClick={() => setEditingStudent(null)}
                                >
                                    বাতিল
                                </button>
                                <button 
                                    type="submit" 
                                    className="modal-btn primary"
                                >
                                    💾 আপডেট সংরক্ষণ করুন
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* =========================================================
                MODAL 5: DELETE CONFIRMATION MODAL
                ========================================================= */}
            {deletingStudentId && (
                <div className="admin-modal-overlay" onClick={() => setDeletingStudentId(null)}>
                    <div className="admin-modal-dialog delete-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className="modal-title-wrap">
                                <span className="modal-title-icon danger">🗑️</span>
                                <div>
                                    <h3>শিক্ষার্থী ডিলিট নিশ্চিতকরণ</h3>
                                    <p>এই সিদ্ধান্তটি ফিরিয়ে আনা সম্ভব নয়</p>
                                </div>
                            </div>
                            <button className="modal-close-x" onClick={() => setDeletingStudentId(null)}>✕</button>
                        </div>

                        <div className="modal-body">
                            <p style={{ color: '#d1d5db', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                আপনি কি নিশ্চিতভাবে এই শিক্ষার্থীর সমস্ত অগ্রগতি, ড্রিল রেকর্ড ও অ্যাকাউন্ট ডাটাবেজ থেকে মুছে ফেলতে চান?
                            </p>
                        </div>

                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="modal-btn secondary"
                                onClick={() => setDeletingStudentId(null)}
                            >
                                না, বাতিল করুন
                            </button>
                            <button 
                                type="button" 
                                className="modal-btn danger"
                                onClick={() => handleDeleteStudent(deletingStudentId)}
                            >
                                হ্যাঁ, মুছে ফেলুন
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
