import React, { useState, useEffect } from 'react';
import soundManager from '../utils/SoundManager';
import './SoundSettings.css';

const SoundSettings = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAudioOn, setIsAudioOn] = useState(false);
    const [volume, setVolume] = useState(0.5);

    // Toggle popover
    const toggleOpen = () => setIsOpen(!isOpen);

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

    // Close on click outside (simple implementation by detecting clicks outside)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && !event.target.closest('.sound-settings-container')) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="sound-settings-container">
            <div className="sound-controls-group">
                <button className="sound-toggle-btn" onClick={toggleAudio} title={isAudioOn ? "Mute Sound" : "Play Sound"}>
                    {isAudioOn ? '🔊' : '🔇'}
                </button>
                <button className="sound-settings-btn" onClick={toggleOpen} title="Volume Settings">
                    ⚙️
                </button>
            </div>
            
            {isOpen && (
                <div className="sound-popover">
                    <div className="popover-header">
                        <h4>ব্যাকগ্রাউন্ড মিউজিক</h4>
                    </div>
                    <div className="popover-content">
                        <div className="setting-row">
                            <span>মেডিটেশন মিউজিক</span>
                            <label className="switch">
                                <input type="checkbox" checked={isAudioOn} onChange={toggleAudio} />
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <div className="setting-row volume-row">
                            <span>ভলিউম</span>
                            <input 
                                type="range" 
                                min="0" 
                                max="1" 
                                step="0.05" 
                                value={volume} 
                                onChange={handleVolumeChange} 
                                className="volume-slider"
                                disabled={!isAudioOn}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SoundSettings;
