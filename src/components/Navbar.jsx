import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import SoundSettings from './SoundSettings';
import './Navbar.css';

export default function Navbar({ 
    themeMode, 
    setThemeMode, 
    isDarkMode, 
    toggleTheme,
    currentView = 'typing',
    onNavigateToTyping,
    onOpenLogin,
    onOpenRegister,
    onOpenAdminPanel 
}) {
    const { user, logout } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('courses');
    const dropdownRef = useRef(null);

    // Close profile dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setProfileDropdownOpen(false);
            }
        };
        if (profileDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [profileDropdownOpen]);

    const handleCoursesClick = (e) => {
        e.preventDefault();
        setActiveTab('courses');
        if (onNavigateToTyping) onNavigateToTyping();
        setMobileMenuOpen(false);
    };

    const handleLogout = () => {
        logout();
        if (onNavigateToTyping) onNavigateToTyping();
        setProfileDropdownOpen(false);
        setMobileMenuOpen(false);
    };

    return (
        <header className="main-navbar-container">
            <div className="main-navbar">
                {/* 1. Left: Brand Logo */}
                <div 
                    className="navbar-brand-link" 
                    onClick={() => { if (onNavigateToTyping) onNavigateToTyping(); }} 
                    style={{ cursor: 'pointer' }}
                    title="হোম পেজে যান"
                >
                    <div className="navbar-logo-wrap">
                        {/* DeliBhai Logo Icon */}
                        <div className="logo-badge-icon">
                            <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
                                <circle cx="18" cy="18" r="16" fill="#0c131f" stroke="#10b981" strokeWidth="2.2" />
                                <path d="M12 10.5h6.5a6.5 6.5 0 0 1 0 13H12V10.5zm4 3.5v6h2.5a3 3 0 0 0 0-6H16z" fill="#ffffff"/>
                                <circle cx="24.5" cy="12.5" r="2.2" fill="#10b981"/>
                            </svg>
                        </div>
                        <div className="logo-text-group">
                            <div className="logo-main-text">
                                deli<span className="logo-bhai">Bhai</span>
                                <span className="logo-dot"></span>
                            </div>
                            <div className="logo-sub-text">IT Institute</div>
                        </div>
                    </div>
                </div>

                {/* 2. Middle: Navigation Links */}
                <nav className={`navbar-nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                    <a 
                        href="#courses" 
                        className={`nav-item-link ${currentView === 'typing' && activeTab === 'courses' ? 'active' : ''}`}
                        onClick={handleCoursesClick}
                    >
                        কোর্সসমূহ (টাইপিং বোর্ড)
                    </a>
                    {user?.isAdmin && (
                        <a 
                            href="#admin" 
                            className={`nav-item-link ${currentView === 'admin' ? 'active' : ''}`}
                            onClick={(e) => { 
                                e.preventDefault(); 
                                if (onOpenAdminPanel) onOpenAdminPanel(); 
                                setMobileMenuOpen(false); 
                            }}
                        >
                            👑 এডমিন প্যানেল
                        </a>
                    )}
                    <a 
                        href="https://delibhaiit.com/about" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`nav-item-link ${activeTab === 'about' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('about'); setMobileMenuOpen(false); }}
                    >
                        আমাদের সম্পর্কে
                    </a>
                    <a 
                        href="https://delibhaiit.com/contact" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`nav-item-link ${activeTab === 'contact' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('contact'); setMobileMenuOpen(false); }}
                    >
                        যোগাযোগ
                    </a>

                    {/* Mobile Only Actions */}
                    <div className="mobile-only-nav-actions">
                        {user ? (
                            <>
                                <div className="mobile-user-info-card">
                                    <span className="mobile-avatar">{user.isAdmin ? '👑' : '👤'}</span>
                                    <div>
                                        <div className="mobile-user-name">{user.name || 'ইউজার'}</div>
                                        <div className="mobile-user-email">{user.email}</div>
                                    </div>
                                </div>
                                {user.isAdmin && (
                                    <button 
                                        type="button"
                                        className="nav-admin-mobile-btn" 
                                        onClick={() => { if (onOpenAdminPanel) onOpenAdminPanel(); setMobileMenuOpen(false); }}
                                    >
                                        👑 এডমিন ড্যাশবোর্ড
                                    </button>
                                )}
                                <button className="nav-login-btn" onClick={handleLogout}>লগআউট</button>
                            </>
                        ) : (
                            <>
                                <button className="nav-login-btn" onClick={() => { onOpenLogin(); setMobileMenuOpen(false); }}>লগইন</button>
                                <button className="nav-register-pill-btn" onClick={() => { onOpenRegister(); setMobileMenuOpen(false); }}>ফ্রিতে রেজিস্ট্রেশন</button>
                            </>
                        )}
                    </div>
                </nav>

                {/* 3. Right: Theme Switcher & Actions */}
                <div className="navbar-actions-group">
                    {/* Theme Mode Segmented Pill [ ☀️  💻  🌙 ] */}
                    <div className="theme-segmented-pill" title="থিম নির্বাচন করুন">
                        <button 
                            type="button"
                            className={`theme-segment-btn ${themeMode === 'light' ? 'active' : ''}`}
                            onClick={() => setThemeMode('light')}
                            title="লাইট মোড"
                        >
                            ☀️
                        </button>
                        <button 
                            type="button"
                            className={`theme-segment-btn ${themeMode === 'system' ? 'active' : ''}`}
                            onClick={() => setThemeMode('system')}
                            title="সিস্টেম ডিফল্ট"
                        >
                            💻
                        </button>
                        <button 
                            type="button"
                            className={`theme-segment-btn ${themeMode === 'dark' ? 'active' : ''}`}
                            onClick={() => setThemeMode('dark')}
                            title="ডার্ক মোড"
                        >
                            🌙
                        </button>
                    </div>

                    {/* Settings Button */}
                    <SoundSettings isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

                    {/* Auth Actions (Login & Free Registration / Profile Dropdown) */}
                    {user ? (
                        <div className="profile-dropdown-wrapper" ref={dropdownRef}>
                            <button 
                                type="button"
                                className={`user-profile-badge ${user.isAdmin ? 'admin-user-badge' : ''} ${profileDropdownOpen ? 'dropdown-active' : ''}`}
                                onClick={() => setProfileDropdownOpen(prev => !prev)}
                                aria-expanded={profileDropdownOpen}
                                title="প্রোফাইল মেনু খুলুন"
                            >
                                <span className="user-avatar-circle">{user.isAdmin ? '👑' : '👤'}</span>
                                <span className="user-name-text">{user.name?.split(' ')[0] || 'ইউজার'}</span>
                                {user.isAdmin && <span className="admin-role-tag">অ্যাডমিন</span>}
                                <span className={`dropdown-chevron-icon ${profileDropdownOpen ? 'rotated' : ''}`}>▾</span>
                            </button>

                            {profileDropdownOpen && (
                                <div className="profile-dropdown-menu">
                                    <div className="dropdown-user-header">
                                        <div className="dropdown-avatar-large">
                                            {user.isAdmin ? '👑' : '👤'}
                                        </div>
                                        <div className="dropdown-user-details">
                                            <div className="dropdown-user-fullname">{user.name || 'ইউজার'}</div>
                                            <div className="dropdown-user-email">{user.email}</div>
                                            {user.isAdmin ? (
                                                <span className="dropdown-admin-badge">🛡️ সুপার অ্যাডমিন</span>
                                            ) : (
                                                <span className="dropdown-student-badge">🎓 শিক্ষার্থী</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="dropdown-divider"></div>

                                    <div className="dropdown-menu-list">
                                        {user.isAdmin && (
                                            <button 
                                                type="button" 
                                                className={`dropdown-item-btn item-admin-highlight ${currentView === 'admin' ? 'active-view' : ''}`}
                                                onClick={() => {
                                                    setProfileDropdownOpen(false);
                                                    if (onOpenAdminPanel) onOpenAdminPanel();
                                                }}
                                            >
                                                <span className="item-icon">👑</span>
                                                <div className="item-text-group">
                                                    <span className="item-title">এডমিন ড্যাশবোর্ড</span>
                                                    <span className="item-desc">কন্ট্রোল ও ম্যানেজমেন্ট প্যানেল</span>
                                                </div>
                                                <span className="item-arrow">›</span>
                                            </button>
                                        )}

                                        <button 
                                            type="button" 
                                            className={`dropdown-item-btn ${currentView === 'typing' ? 'active-view' : ''}`}
                                            onClick={() => {
                                                setProfileDropdownOpen(false);
                                                if (onNavigateToTyping) onNavigateToTyping();
                                            }}
                                        >
                                            <span className="item-icon">⌨️</span>
                                            <div className="item-text-group">
                                                <span className="item-title">টাইপিং বোর্ড</span>
                                                <span className="item-desc">টাইপিং প্র্যাক্টিসে ফিরে যান</span>
                                            </div>
                                        </button>

                                        <div className="dropdown-divider"></div>

                                        <button 
                                            type="button" 
                                            className="dropdown-item-btn item-logout"
                                            onClick={handleLogout}
                                        >
                                            <span className="item-icon">🚪</span>
                                            <span className="item-title">লগআউট করুন</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="auth-buttons-wrap">
                            <button 
                                type="button" 
                                className="nav-login-btn" 
                                onClick={onOpenLogin}
                            >
                                লগইন
                            </button>
                            <button 
                                type="button" 
                                className="nav-register-pill-btn" 
                                onClick={onOpenRegister}
                            >
                                ফ্রিতে রেজিস্ট্রেশন
                            </button>
                        </div>
                    )}

                    {/* Mobile Hamburger Toggle */}
                    <button 
                        className="mobile-hamburger-btn" 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle navigation"
                    >
                        {mobileMenuOpen ? '✕' : '☰'}
                    </button>
                </div>
            </div>
        </header>
    );
}
