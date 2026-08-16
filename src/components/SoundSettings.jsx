import React, { useState, useEffect } from 'react';
import soundManager from '../utils/SoundManager';
import './SoundSettings.css';

const SoundSettings = ({ isDarkMode = true, toggleTheme }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAudioOn, setIsAudioOn] = useState(false);
    const [volume, setVolume] = useState(0.5);

    // Toggle popover
    const toggleOpen = () => setIsOpen(prev => !prev);

    // Toggle audio
    const toggleAudio = () => {
        const newState = !isAudioOn;
        setIsAudioOn(newState);
        if (newState) {
            soundManager.start();
            soundManager.setVolume(volume);
        } else {
            soundManager.stop();
        }
    };

    // Handle volume change
    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (isAudioOn) {
            soundManager.setVolume(newVolume);
        }
    };

    // Close on click outside or ESC key
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && !event.target.closest('.sound-settings-container')) {
                setIsOpen(false);
            }
        };
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    return (
        <div className="sound-settings-container">
            {/* Single Settings Button */}
            <button 
                className={`unified-settings-btn ${isOpen ? 'active' : ''}`} 
                onClick={toggleOpen} 
                title="অ্যাপ সেটিংস ও কন্ট্রোল"
                aria-label="Settings"
            >
                <span className="settings-gear-icon">⚙️</span>
            </button>
            
            {isOpen && (
                <div className="settings-popover-panel">
                    <div className="settings-popover-header">
                        <div className="header-title-wrap">
                            <span className="header-icon">⚙️</span>
                            <h4>সেটিংস ও কন্ট্রোল</h4>
                        </div>
                        <button className="settings-close-btn" onClick={() => setIsOpen(false)} title="বন্ধ করুন">
                            ✕
                        </button>
                    </div>

                    <div className="settings-popover-content">
                        {/* 1. Theme Mode Section */}
                        <div className="settings-item-card">
                            <div className="settings-item-header">
                                <span className="item-icon">{isDarkMode ? '🌙' : '☀️'}</span>
                                <div className="item-text">
                                    <span className="item-title">থিম ও ডিসপ্লে মোড</span>
                                    <span className="item-desc">{isDarkMode ? 'ডার্ক মোড সক্রিয়' : 'লাইট মোড সক্রিয়'}</span>
                                </div>
                            </div>
                            <div className="theme-pill-selector">
                                <button 
                                    type="button"
                                    className={`theme-pill ${isDarkMode ? 'active' : ''}`}
                                    onClick={() => { if (!isDarkMode) toggleTheme(); }}
                                >
                                    🌙 ডার্ক
                                </button>
                                <button 
                                    type="button"
                                    className={`theme-pill ${!isDarkMode ? 'active' : ''}`}
                                    onClick={() => { if (isDarkMode) toggleTheme(); }}
                                >
                                    ☀️ লাইট
                                </button>
                            </div>
                        </div>

                        {/* 2. Background Meditation Music Section */}
                        <div className="settings-item-card">
                            <div className="settings-item-header">
                                <span className="item-icon">{isAudioOn ? '🔊' : '🔇'}</span>
                                <div className="item-text">
                                    <span className="item-title">মেডিটেশন মিউজিক</span>
                                    <span className="item-desc">{isAudioOn ? 'ব্যাকগ্রাউন্ডে চালু আছে' : 'মিউজিক বন্ধ আছে'}</span>
                                </div>
                                <label className="switch">
                                    <input type="checkbox" checked={isAudioOn} onChange={toggleAudio} />
                                    <span className="slider round"></span>
                                </label>
                            </div>

                            {isAudioOn && (
                                <div className="volume-control-box">
                                    <div className="volume-label-row">
                                        <span>ভলিউম</span>
                                        <span className="volume-percent">{Math.round(volume * 100)}%</span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max="1" 
                                        step="0.05" 
                                        value={volume} 
                                        onChange={handleVolumeChange} 
                                        className="volume-slider"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="settings-popover-footer">
                        <span>✨ deliBhai IT Bijoy Bangla Typing</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SoundSettings;

