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

export default function VirtualKeyboard({ expectedKey, wrongKey }) {
    let targetKey = expectedKey;
    let requiresShift = false;
    
    if (targetKey && targetKey.length === 1 && targetKey >= 'A' && targetKey <= 'Z') {
        requiresShift = true;
        targetKey = targetKey.toLowerCase();
    }
    
    const shiftMap = {
        '~': '`', '!': '1', '@': '2', '#': '3', '$': '4', '%': '5', '^': '6',
        '&': '7', '*': '8', '(': '9', ')': '0', '_': '-', '+': '=', '{': '[',
        '}': ']', '|': '\\', ':': ';', '"': "'", '<': ',', '>': '.', '?': '/'
    };
    
    if (targetKey && shiftMap[targetKey]) {
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

    const isActive = (key) => {
        if (!expectedKey) return false;
        
        if (requiresShift) {
            if (isRightHandKey && key === 'LShift') return true;
            if (isLeftHandKey && key === 'RShift') return true;
            if (!isRightHandKey && !isLeftHandKey && (key === 'LShift' || key === 'RShift')) return true;
        }

        if (key.toLowerCase() === targetKey?.toLowerCase()) return true;
        if (expectedKey === 'Space' && key === ' ') return true;
        return false;
    };

    const isError = (key) => {
        if (!normalizedWrongKey) return false;
        if (key.toLowerCase() === normalizedWrongKey.toLowerCase()) return true;
        if (wrongKey === ' ' && key === ' ') return true;
        return false;
    };

    return (
        <div className="virtual-keyboard">
            {KEYBOARD_ROWS.map((row, rowIndex) => (
                <div key={rowIndex} className="keyboard-row">
                    {row.map((btn, btnIndex) => (
                        <div 
                            key={btnIndex} 
                            className={`key ${btn.width || ''} ${isActive(btn.key) ? 'key-active' : ''} ${isError(btn.key) ? 'key-error' : ''}`}
                        >
                            {btn.label}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
