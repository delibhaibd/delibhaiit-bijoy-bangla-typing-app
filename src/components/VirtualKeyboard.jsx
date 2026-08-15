import React from 'react';
import { getFingerForKey } from '../utils/fingerMapping';

const KEYBOARD_ROWS = [
    [
        { key: '`', label: '`', ar: 'ذ', arShift: 'ّ' }, { key: '1', label: '1', ar: '١', arShift: '!' }, { key: '2', label: '2', ar: '٢', arShift: '@' }, { key: '3', label: '3', ar: '٣', arShift: '#' },
        { key: '4', label: '4', ar: '٤', arShift: '$' }, { key: '5', label: '5', ar: '٥', arShift: '%' }, { key: '6', label: '6', ar: '٦', arShift: '^' }, { key: '7', label: '7', ar: '٧', arShift: '&' },
        { key: '8', label: '8', ar: '٨', arShift: '*' }, { key: '9', label: '9', ar: '٩', arShift: ')' }, { key: '0', label: '0', ar: '٠', arShift: '(' }, { key: '-', label: '-', ar: '-', arShift: '_' },
        { key: '=', label: '=', ar: '=', arShift: '+' }, { key: 'Backspace', label: 'Bksp', width: 'flex-1-5' }
    ],
    [
        { key: 'Tab', label: 'Tab', width: 'flex-1-5' },
        { key: 'q', label: 'Q', ar: 'ض', arShift: 'َ' }, { key: 'w', label: 'W', ar: 'ص', arShift: 'ً' }, { key: 'e', label: 'E', ar: 'ث', arShift: 'ُ' }, { key: 'r', label: 'R', ar: 'ق', arShift: 'ٌ' },
        { key: 't', label: 'T', ar: 'ف', arShift: 'لإ' }, { key: 'y', label: 'Y', ar: 'غ', arShift: 'إ' }, { key: 'u', label: 'U', ar: 'ع', arShift: '`' }, { key: 'i', label: 'I', ar: 'ه', arShift: '÷' },
        { key: 'o', label: 'O', ar: 'خ', arShift: '×' }, { key: 'p', label: 'P', ar: 'ح', arShift: '؛' }, { key: '[', label: '[', ar: 'ج', arShift: '<' }, { key: ']', label: ']', ar: 'د', arShift: '>' },
        { key: '\\', label: '\\', ar: '\\', arShift: '|', width: 'flex-1' }
    ],
    [
        { key: 'CapsLock', label: 'Caps', width: 'flex-1-75' },
        { key: 'a', label: 'A', ar: 'ش', arShift: 'ِ' }, { key: 's', label: 'S', ar: 'س', arShift: 'ٍ' }, { key: 'd', label: 'D', ar: 'ي', arShift: ']' }, { key: 'f', label: 'F', ar: 'ب', arShift: '[' },
        { key: 'g', label: 'G', ar: 'ل', arShift: 'لأ' }, { key: 'h', label: 'H', ar: 'ا', arShift: 'أ' }, { key: 'j', label: 'J', ar: 'ت', arShift: 'ـ' }, { key: 'k', label: 'K', ar: 'ن', arShift: '،' },
        { key: 'l', label: 'L', ar: 'م', arShift: '/' }, { key: ';', label: ';', ar: 'ك', arShift: ':' }, { key: "'", label: "'", ar: 'ط', arShift: '"' },
        { key: 'Enter', label: 'Enter', width: 'flex-2' }
    ],
    [
        { key: 'LShift', label: 'Shift', width: 'flex-2-25' },
        { key: 'z', label: 'Z', ar: 'ظ', arShift: '~' }, { key: 'x', label: 'X', ar: 'ز', arShift: 'ْ' }, { key: 'c', label: 'C', ar: 'و', arShift: '}' }, { key: 'v', label: 'V', ar: 'ة', arShift: '{' },
        { key: 'b', label: 'B', ar: 'ى', arShift: 'لآ' }, { key: 'n', label: 'N', ar: 'لا', arShift: 'آ' }, { key: 'm', label: 'M', ar: 'ر', arShift: '\'' }, { key: ',', label: ',', ar: 'ؤ', arShift: ',' },
        { key: '.', label: '.', ar: 'ء', arShift: '.' }, { key: '/', label: '/', ar: 'ئ', arShift: '؟' },
        { key: 'RShift', label: 'Shift', width: 'flex-2-25' }
    ],
    [
        { key: 'Control', label: 'Ctrl', width: 'flex-1-25' }, { key: 'Meta', label: 'Win', width: 'flex-1-25' },
        { key: 'Alt', label: 'Alt', width: 'flex-1-25' },
        { key: ' ', label: 'Space', width: 'flex-6' },
        { key: 'Alt', label: 'Alt', width: 'flex-1-25' }, { key: 'Meta', label: 'Win', width: 'flex-1-25' },
        { key: 'ContextMenu', label: 'Menu', width: 'flex-1-25' }, { key: 'Control', label: 'Ctrl', width: 'flex-1-25' }
    ]
];

const FINGER_PATHS = {
    'pinky': "M 50,240 L 50,150 A 15,15 0 0,1 80,150 L 80,240 Z",
    'ring': "M 80,240 L 80,105 A 15,15 0 0,1 110,105 L 110,240 Z",
    'middle': "M 110,240 L 110,60 A 15,15 0 0,1 140,60 L 140,240 Z",
    'index': "M 140,240 L 140,80 A 15,15 0 0,1 170,80 L 170,240 Z",
    'thumb': "M 170,240 L 170,195 A 15,15 0 0,1 200,195 L 200,240 Z"
};

export default function VirtualKeyboard({ expectedKey, wrongKey, isRandomMode, feedbackKey, isNumpadMode = false, typingMode = 'bn' }) {
    const expectedFinger = getFingerForKey(expectedKey);
    const wrongFinger = getFingerForKey(wrongKey);

    const getFingerHighlight = (hand, fingerName) => {
        const fingerKey = fingerName === 'thumb' ? 'thumb' : `${hand === 'left' ? 'l' : 'r'}-${fingerName}`;
        
        if (wrongFinger === fingerKey) {
            return '#ef4444'; // Red error
        }
        if (expectedFinger === fingerKey) {
            return '#437ec4'; // Blue highlight
        }
        return null;
    };

    let requiresShift = false;
    let targetKey = expectedKey;

    const isNumpadOperator = isNumpadMode && ['+', '-', '*', '/'].includes(expectedKey);

    if (targetKey && targetKey.length === 1 && targetKey >= 'A' && targetKey <= 'Z') {
        requiresShift = true;
        targetKey = targetKey.toLowerCase();
    }
    
    const shiftMap = {
        '~': '`', '!': '1', '@': '2', '#': '3', '$': '4', '%': '5', '^': '6',
        '&': '7', '*': '8', '(': '9', ')': '0', '_': '-', '+': '=', '{': '[',
        '}': ']', '|': '\\', ':': ';', '"': "'", '<': ',', '>': '.', '?': '/'
    };
    
    if (targetKey && shiftMap[targetKey] && !isNumpadOperator) {
        requiresShift = true;
        targetKey = shiftMap[targetKey];
    }

    let normalizedWrongKey = wrongKey;
    if (wrongKey && wrongKey.length === 1 && wrongKey >= 'A' && wrongKey <= 'Z') {
        normalizedWrongKey = wrongKey.toLowerCase();
    }
    if (wrongKey && shiftMap[wrongKey]) {
        normalizedWrongKey = shiftMap[wrongKey];
    }

    const targetFinger = getFingerForKey(expectedKey);
    const isRightHandKey = targetFinger && targetFinger.startsWith('r-');
    const isLeftHandKey = targetFinger && targetFinger.startsWith('l-');

    const isActive = (key, isNumpadKey = false) => {
        if (isRandomMode) {
            if (feedbackKey && feedbackKey.status === 'correct' && feedbackKey.key.toLowerCase() === key.toLowerCase()) return true;
            if (feedbackKey && feedbackKey.status === 'correct' && feedbackKey.key === ' ' && key === ' ') return true;
            return false;
        }

        if (!expectedKey) return false;
        
        if (requiresShift) {
            if (isRightHandKey && key === 'LShift') return true;
            if (isLeftHandKey && key === 'RShift') return true;
            if (!isRightHandKey && !isLeftHandKey && (key === 'LShift' || key === 'RShift')) return true;
        }

        if (key.toLowerCase() === targetKey?.toLowerCase()) {
            const isDigitOrSymbol = /^[0-9/*\-+.\nEnter]$/.test(key);
            if (isNumpadMode && isDigitOrSymbol) {
                return isNumpadKey;
            }
            if (!isNumpadMode && isDigitOrSymbol) {
                if (key === 'Enter') return !isNumpadKey;
                return !isNumpadKey;
            }
            return !isNumpadKey;
        }
        if (expectedKey === 'Space' && key === ' ') return true;
        return false;
    };

    const isError = (key, isNumpadKey = false) => {
        if (isRandomMode) {
            if (feedbackKey && feedbackKey.status === 'wrong' && feedbackKey.key.toLowerCase() === key.toLowerCase()) return true;
            if (feedbackKey && feedbackKey.status === 'wrong' && feedbackKey.key === ' ' && key === ' ') return true;
            return false;
        }

        if (!normalizedWrongKey) return false;
        if (key.toLowerCase() === normalizedWrongKey.toLowerCase()) {
            const isDigitOrSymbol = /^[0-9/*\-+.\nEnter]$/.test(key);
            if (isNumpadMode && isDigitOrSymbol) return isNumpadKey;
            if (!isNumpadMode && isDigitOrSymbol) return !isNumpadKey;
            return !isNumpadKey;
        }
        if (wrongKey === ' ' && key === ' ') return true;
        return false;
    };

    const NUMPAD_KEYS = [
        { key: 'NumLock', label: 'Num\nLock' }, { key: '/', label: '/' }, { key: '*', label: '*' }, { key: '-', label: '-' },
        { key: '7', label: '7\nHome' }, { key: '8', label: '8\n↑' }, { key: '9', label: '9\nPgUp' }, { key: '+', label: '+', customClass: 'numpad-plus' },
        { key: '4', label: '4\n←' }, { key: '5', label: '5' }, { key: '6', label: '6\n→' },
        { key: '1', label: '1\nEnd' }, { key: '2', label: '2\n↓' }, { key: '3', label: '3\nPgDn' }, { key: 'Enter', label: 'Enter', customClass: 'numpad-enter' },
        { key: '0', label: '0\nIns', customClass: 'numpad-zero' }, { key: '.', label: '.\nDel' }
    ];

    return (
        <div className="virtual-keyboard-wrapper" style={{ 
            display: 'flex', 
            gap: '20px', 
            justifyContent: 'center',
            width: '100%',
            maxWidth: '900px',
            margin: '0 auto',
            position: 'relative'
        }}>
            
            {!isNumpadMode && (
                <div className="virtual-keyboard" style={{ flex: 1, margin: '0', maxWidth: 'none', position: 'relative' }}>
                    {/* Touch Typing Hands Overlay */}
                    <div className="typing-hands-overlay">
                        <svg viewBox="0 45 500 275" style={{ width: '100%', height: '78%', maxWidth: '480px', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))' }}>
                            <defs>
                                <path id="hand-shape" className="typing-hand-shape" d="
                                    M 40,240 
                                    A 80,80 0 0,0 200,240 
                                    L 200,195
                                    A 15,15 0 0,0 170,195
                                    L 170,80
                                    A 15,15 0 0,0 140,80
                                    L 140,60
                                    A 15,15 0 0,0 110,60
                                    L 110,105
                                    A 15,15 0 0,0 80,105
                                    L 80,150
                                    A 15,15 0 0,0 50,150
                                    L 50,240 
                                    Z" 
                                />
                            </defs>

                            {/* Left Hand Group */}
                            <g transform="translate(10, 0)">
                                <use href="#hand-shape" />
                                {Object.entries(FINGER_PATHS).map(([fingerName, pathD]) => {
                                    const highlightColor = getFingerHighlight('left', fingerName);
                                    return (
                                        <path
                                            key={fingerName}
                                            d={pathD}
                                            fill={highlightColor ? `${highlightColor}cc` : 'none'}
                                            className="typing-hand-highlight"
                                        />
                                    );
                                })}
                            </g>

                            {/* Right Hand Group (Flipped Horizontally) */}
                            <g transform="translate(490, 0) scale(-1, 1)">
                                <use href="#hand-shape" />
                                {Object.entries(FINGER_PATHS).map(([fingerName, pathD]) => {
                                    const highlightColor = getFingerHighlight('right', fingerName);
                                    return (
                                        <path
                                            key={fingerName}
                                            d={pathD}
                                            fill={highlightColor ? `${highlightColor}cc` : 'none'}
                                            className="typing-hand-highlight"
                                        />
                                    );
                                })}
                            </g>
                        </svg>
                    </div>

                    {KEYBOARD_ROWS.map((row, rowIndex) => (
                        <div key={rowIndex} className="keyboard-row">
                            {row.map((btn, btnIndex) => (
                                <div 
                                    key={btnIndex} 
                                    className={`key ${btn.width || ''} ${isActive(btn.key) ? 'key-active' : ''} ${isError(btn.key) ? 'key-error' : ''}`}
                                >
                                    {typingMode === 'ar' && btn.ar ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <span style={{ fontSize: '1.2em' }}>{requiresShift ? btn.arShift : btn.ar}</span>
                                        </div>
                                    ) : (
                                        <span>{btn.label}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}

            
            {isNumpadMode && (
                <div className="virtual-numpad virtual-keyboard" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gridTemplateRows: 'repeat(5, 1fr)',
                    gap: '12px',
                    margin: '0 auto 2rem auto',
                    maxWidth: '280px',
                    width: '100%',
                    height: '350px'
                }}>
                    {NUMPAD_KEYS.map((btn, idx) => (
                        <div 
                            key={idx} 
                            className={`key ${btn.customClass || ''} ${isActive(btn.key, true) ? 'key-active' : ''} ${isError(btn.key, true) ? 'key-error' : ''}`}
                            style={{ margin: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', lineHeight: '1.2' }}
                        >
                            {btn.label.split('\n').map((line, i) => (
                                <span key={i} style={i === 1 ? { fontSize: '0.7em', opacity: 0.8 } : {}}>{line}</span>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
