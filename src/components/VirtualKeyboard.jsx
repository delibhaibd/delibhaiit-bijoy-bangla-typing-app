import React from 'react';
import { getFingerForKey } from '../utils/fingerMapping';

const KEYBOARD_ROWS = [
    [
        { key: '`', label: '`' }, { key: '1', label: '1' }, { key: '2', label: '2' }, { key: '3', label: '3' },
        { key: '4', label: '4' }, { key: '5', label: '5' }, { key: '6', label: '6' }, { key: '7', label: '7' },
        { key: '8', label: '8' }, { key: '9', label: '9' }, { key: '0', label: '0' }, { key: '-', label: '-' },
        { key: '=', label: '=' }, { key: 'Backspace', label: 'Bksp', width: 'flex-1-5' }
    ],
    [
        { key: 'Tab', label: 'Tab', width: 'flex-1-5' },
        { key: 'q', label: 'Q' }, { key: 'w', label: 'W' }, { key: 'e', label: 'E' }, { key: 'r', label: 'R' },
        { key: 't', label: 'T' }, { key: 'y', label: 'Y' }, { key: 'u', label: 'U' }, { key: 'i', label: 'I' },
        { key: 'o', label: 'O' }, { key: 'p', label: 'P' }, { key: '[', label: '[' }, { key: ']', label: ']' },
        { key: '\\', label: '\\', width: 'flex-1' }
    ],
    [
        { key: 'CapsLock', label: 'Caps', width: 'flex-1-75' },
        { key: 'a', label: 'A' }, { key: 's', label: 'S' }, { key: 'd', label: 'D' }, { key: 'f', label: 'F' },
        { key: 'g', label: 'G' }, { key: 'h', label: 'H' }, { key: 'j', label: 'J' }, { key: 'k', label: 'K' },
        { key: 'l', label: 'L' }, { key: ';', label: ';' }, { key: "'", label: "'" },
        { key: 'Enter', label: 'Enter', width: 'flex-2' }
    ],
    [
        { key: 'LShift', label: 'Shift', width: 'flex-2-25' },
        { key: 'z', label: 'Z' }, { key: 'x', label: 'X' }, { key: 'c', label: 'C' }, { key: 'v', label: 'V' },
        { key: 'b', label: 'B' }, { key: 'n', label: 'N' }, { key: 'm', label: 'M' }, { key: ',', label: ',' },
        { key: '.', label: '.' }, { key: '/', label: '/' },
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

export default function VirtualKeyboard({ expectedKey, wrongKey, isRandomMode, feedbackKey, isNumpadMode = false }) {
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
            // If it's a digit or math symbol, highlight the right section
            const isDigitOrSymbol = /^[0-9/*\-+.\nEnter]$/.test(key);
            if (isNumpadMode && isDigitOrSymbol) {
                return isNumpadKey;
            }
            if (!isNumpadMode && isDigitOrSymbol) {
                // If it's on the main keyboard, it shouldn't be a numpad key
                // Wait, some keys like Enter are on both.
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
            margin: '0 auto'
        }}>
            {!isNumpadMode && (
                <div className="virtual-keyboard" style={{ flex: 1, margin: '0 0 2rem 0', maxWidth: 'none' }}>
                    {KEYBOARD_ROWS.map((row, rowIndex) => (
                        <div key={rowIndex} className="keyboard-row">
                            {row.map((btn, btnIndex) => (
                                <div 
                                    key={btnIndex} 
                                    className={`key ${btn.width || ''} ${isActive(btn.key) ? 'key-active' : ''} ${isError(btn.key) ? 'key-error' : ''}`}
                                >
                                    <span>{btn.label}</span>
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
