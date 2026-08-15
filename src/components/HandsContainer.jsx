import React from 'react';
import { getFingerForKey } from '../utils/fingerMapping';

const FINGER_NAMES_BN = {
    'l-pinky': 'বাম হাত: কনিষ্ঠা (Left Pinky)',
    'l-ring': 'বাম হাত: অনামিকা (Left Ring)',
    'l-middle': 'বাম হাত: মধ্যমা (Left Middle)',
    'l-index': 'বাম হাত: তর্জনী (Left Index)',
    'l-thumb': 'বাম হাত: বৃদ্ধাঙ্গুলি (Left Thumb)',
    'r-thumb': 'ডান হাত: বৃদ্ধাঙ্গুলি (Right Thumb)',
    'r-index': 'ডান হাত: তর্জনী (Right Index)',
    'r-middle': 'ডান হাত: মধ্যমা (Right Middle)',
    'r-ring': 'ডান হাত: অনামিকা (Right Ring)',
    'r-pinky': 'ডান হাত: কনিষ্ঠা (Right Pinky)',
    'thumb': 'স্পেসবার: বৃদ্ধাঙ্গুলি (Thumb)'
};

export default function HandsContainer({ expectedKey, isNumpadMode }) {
    if (isNumpadMode) return null;

    const targetFinger = getFingerForKey(expectedKey); // e.g., 'l-ring', 'r-index', 'thumb'
    
    let leftActive = null;
    let rightActive = null;

    if (targetFinger) {
        if (targetFinger.startsWith('l-')) {
            leftActive = targetFinger.split('-')[1];
        } else if (targetFinger.startsWith('r-')) {
            rightActive = targetFinger.split('-')[1];
        } else if (targetFinger === 'thumb') {
            rightActive = 'thumb';
        }
    }

    const activeFingerLabel = targetFinger ? FINGER_NAMES_BN[targetFinger] : null;

    return (
        <div className="hands-visualizer-section">
            {activeFingerLabel && (
                <div className="active-finger-indicator-badge">
                    <span className="finger-pulse-dot"></span>
                    <span className="finger-guide-text">ব্যবহার করুন: <strong>{activeFingerLabel}</strong></span>
                </div>
            )}

            <div className="hands-container">
                {/* LEFT HAND */}
                <div className="hand-wrapper left-hand-wrapper">
                    <span className="hand-side-label">বাম হাত (Left)</span>
                    <svg 
                        viewBox="0 0 170 195" 
                        className="hand-icon left-hand-svg"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Palm Base Background */}
                        <path 
                            className="hand-palm" 
                            d="M 32,92 C 40,92 115,92 122,92 C 130,105 128,135 120,158 C 112,172 52,172 40,158 C 26,135 24,105 32,92 Z" 
                        />
                        {/* Wrist */}
                        <path 
                            className="hand-wrist" 
                            d="M 52,168 L 52,192 L 108,192 L 108,168 Z" 
                        />

                        {/* Left Thumb */}
                        <path 
                            id="left-thumb" 
                            className={`finger ${leftActive === 'thumb' ? 'active' : ''}`} 
                            d="M 120,114 C 135,104 154,98 162,106 C 168,114 162,128 146,140 C 134,148 122,140 118,130 Z" 
                        />
                        {/* Left Index */}
                        <path 
                            id="left-index" 
                            className={`finger ${leftActive === 'index' ? 'active' : ''}`} 
                            d="M 98,88 C 99,70 103,38 111,18 C 115,8 126,9 129,20 C 133,38 127,70 123,90 Z" 
                        />
                        {/* Left Middle */}
                        <path 
                            id="left-middle" 
                            className={`finger ${leftActive === 'middle' ? 'active' : ''}`} 
                            d="M 68,86 C 68,60 70,26 76,6 C 80,-4 92,-4 95,6 C 100,26 98,60 96,86 Z" 
                        />
                        {/* Left Ring */}
                        <path 
                            id="left-ring" 
                            className={`finger ${leftActive === 'ring' ? 'active' : ''}`} 
                            d="M 40,86 C 38,68 39,36 45,18 C 49,8 60,8 63,18 C 68,36 67,68 64,86 Z" 
                        />
                        {/* Left Pinky */}
                        <path 
                            id="left-pinky" 
                            className={`finger ${leftActive === 'pinky' ? 'active' : ''}`} 
                            d="M 14,92 C 8,80 10,48 16,34 C 20,24 31,25 34,36 C 37,52 36,80 34,92 Z" 
                        />

                        {/* Knuckle Guidelines */}
                        <circle cx="24" cy="94" r="3" className="knuckle-dot" />
                        <circle cx="52" cy="88" r="3" className="knuckle-dot" />
                        <circle cx="82" cy="88" r="3" className="knuckle-dot" />
                        <circle cx="111" cy="90" r="3" className="knuckle-dot" />
                    </svg>
                </div>

                {/* RIGHT HAND */}
                <div className="hand-wrapper right-hand-wrapper">
                    <span className="hand-side-label">ডান হাত (Right)</span>
                    <svg 
                        viewBox="0 0 170 195" 
                        className="hand-icon right-hand-svg"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Palm Base Background */}
                        <path 
                            className="hand-palm" 
                            d="M 138,92 C 130,92 55,92 48,92 C 40,105 42,135 50,158 C 58,172 118,172 130,158 C 144,135 146,105 138,92 Z" 
                        />
                        {/* Wrist */}
                        <path 
                            className="hand-wrist" 
                            d="M 62,168 L 62,192 L 118,192 L 118,168 Z" 
                        />

                        {/* Right Thumb */}
                        <path 
                            id="right-thumb" 
                            className={`finger ${rightActive === 'thumb' ? 'active' : ''}`} 
                            d="M 50,114 C 35,104 16,98 8,106 C 2,114 8,128 24,140 C 36,148 48,140 52,130 Z" 
                        />
                        {/* Right Index */}
                        <path 
                            id="right-index" 
                            className={`finger ${rightActive === 'index' ? 'active' : ''}`} 
                            d="M 72,88 C 71,70 67,38 59,18 C 55,8 44,9 41,20 C 37,38 43,70 47,90 Z" 
                        />
                        {/* Right Middle */}
                        <path 
                            id="right-middle" 
                            className={`finger ${rightActive === 'middle' ? 'active' : ''}`} 
                            d="M 102,86 C 102,60 100,26 94,6 C 90,-4 78,-4 75,6 C 70,26 72,60 74,86 Z" 
                        />
                        {/* Right Ring */}
                        <path 
                            id="right-ring" 
                            className={`finger ${rightActive === 'ring' ? 'active' : ''}`} 
                            d="M 130,86 C 132,68 131,36 125,18 C 121,8 110,8 107,18 C 102,36 103,68 106,86 Z" 
                        />
                        {/* Right Pinky */}
                        <path 
                            id="right-pinky" 
                            className={`finger ${rightActive === 'pinky' ? 'active' : ''}`} 
                            d="M 156,92 C 162,80 160,48 154,34 C 150,24 139,25 136,36 C 133,52 134,80 136,92 Z" 
                        />

                        {/* Knuckle Guidelines */}
                        <circle cx="59" cy="90" r="3" className="knuckle-dot" />
                        <circle cx="88" cy="88" r="3" className="knuckle-dot" />
                        <circle cx="118" cy="88" r="3" className="knuckle-dot" />
                        <circle cx="146" cy="94" r="3" className="knuckle-dot" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
