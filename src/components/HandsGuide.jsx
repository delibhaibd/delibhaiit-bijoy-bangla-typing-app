import React from 'react';

const FINGER_KEY_MAP = {
  'left-pinky': ['`', '~', '1', '!', 'q', 'Q', 'a', 'A', 'z', 'Z', 'Tab', 'tab', 'CapsLock', 'capslock', 'Shift', 'shift', 'Control', 'control', 'Alt', 'alt', 'LShift'],
  'left-ring': ['2', '@', 'w', 'W', 's', 'S', 'x', 'X'],
  'left-middle': ['3', '#', 'e', 'E', 'd', 'D', 'c', 'C'],
  'left-index': ['4', '$', '5', '%', 'r', 'R', 't', 'T', 'f', 'F', 'g', 'G', 'v', 'V', 'b', 'B'],
  'left-thumb': [' ', 'Space', 'space'],
  'right-thumb': [' ', 'Space', 'space'],
  'right-index': ['6', '^', '7', '&', 'y', 'Y', 'u', 'U', 'h', 'H', 'j', 'J', 'n', 'N', 'm', 'M'],
  'right-middle': ['8', '*', 'i', 'I', 'k', 'K', ',', '<'],
  'right-ring': ['9', '(', 'o', 'O', 'l', 'L', '.', '>'],
  'right-pinky': ['0', ')', '-', '_', '=', '+', 'p', 'P', '[', '{', ']', '}', '\\', '|', ';', ':', '\'', '"', '/', '?', 'Enter', 'enter', 'Backspace', 'backspace', 'RShift']
};

const FINGER_LABELS_BN = {
  'left-pinky': 'বাম হাত: কনিষ্ঠা (Left Pinky)',
  'left-ring': 'বাম হাত: অনামিকা (Left Ring)',
  'left-middle': 'বাম হাত: মধ্যমা (Left Middle)',
  'left-index': 'বাম হাত: তর্জনী (Left Index)',
  'left-thumb': 'বৃদ্ধাঙ্গুলি (Thumb: Space)',
  'right-thumb': 'বৃদ্ধাঙ্গুলি (Thumb: Space)',
  'right-index': 'ডান হাত: তর্জনী (Right Index)',
  'right-middle': 'ডান হাত: মধ্যমা (Right Middle)',
  'right-ring': 'ডান হাত: অনামিকা (Right Ring)',
  'right-pinky': 'ডান হাত: কনিষ্ঠা (Right Pinky)',
};

function getActiveFinger(key) {
  if (!key) return null;
  for (const [fingerId, keys] of Object.entries(FINGER_KEY_MAP)) {
    if (keys.includes(key) || keys.includes(key.toLowerCase()) || keys.includes(key.toUpperCase())) {
      return fingerId;
    }
  }
  return null;
}

export default function HandsGuide({ expectedKey, isNumpadMode = false }) {
  if (isNumpadMode) return null;

  const activeFinger = getActiveFinger(expectedKey);
  const fingerLabel = activeFinger ? FINGER_LABELS_BN[activeFinger] : null;

  return (
    <div className="touch-hands-container">
      {fingerLabel && (
        <div className="hands-guide-badge">
          <span className="finger-pulse-dot"></span>
          <span>{fingerLabel}</span>
        </div>
      )}

      <div className="touch-hands-wrapper">
        {/* Left Hand */}
        <div className="hand-box">
          <svg className="touch-hand-svg" viewBox="0 0 160 200">
            {/* Left Palm Background */}
            <path 
              className="palm-outline" 
              d="M 20,110 C 20,80 30,70 40,70 L 120,70 C 135,70 140,80 140,110 L 135,185 C 135,195 25,195 25,185 Z" 
            />
            
            {/* Left Fingers */}
            <path 
              id="left-pinky" 
              className={`finger-path ${activeFinger === 'left-pinky' ? 'active' : ''}`} 
              d="M 22,110 L 22,50 C 22,40 38,40 38,50 L 38,110 Z" 
            />
            <path 
              id="left-ring" 
              className={`finger-path ${activeFinger === 'left-ring' ? 'active' : ''}`} 
              d="M 44,110 L 44,28 C 44,18 60,18 60,28 L 60,110 Z" 
            />
            <path 
              id="left-middle" 
              className={`finger-path ${activeFinger === 'left-middle' ? 'active' : ''}`} 
              d="M 66,110 L 66,15 C 66,5 82,5 82,15 L 82,110 Z" 
            />
            <path 
              id="left-index" 
              className={`finger-path ${activeFinger === 'left-index' ? 'active' : ''}`} 
              d="M 88,110 L 88,25 C 88,15 104,15 104,25 L 104,110 Z" 
            />
            <path 
              id="left-thumb" 
              className={`finger-path ${activeFinger === 'left-thumb' ? 'active' : ''}`} 
              d="M 112,120 L 135,90 C 142,82 153,92 145,100 L 125,135 Z" 
            />
          </svg>
          <span className="hand-name-label">বাম হাত (Left Hand)</span>
        </div>

        {/* Right Hand */}
        <div className="hand-box">
          <svg className="touch-hand-svg" viewBox="0 0 160 200">
            {/* Right Palm Background */}
            <path 
              className="palm-outline" 
              d="M 20,110 C 20,80 25,70 40,70 L 120,70 C 130,70 140,80 140,110 L 135,185 C 135,195 25,195 25,185 Z" 
            />

            {/* Right Fingers */}
            <path 
              id="right-thumb" 
              className={`finger-path ${activeFinger === 'right-thumb' ? 'active' : ''}`} 
              d="M 48,120 L 25,90 C 18,82 7,92 15,100 L 35,135 Z" 
            />
            <path 
              id="right-index" 
              className={`finger-path ${activeFinger === 'right-index' ? 'active' : ''}`} 
              d="M 56,110 L 56,25 C 56,15 72,15 72,25 L 72,110 Z" 
            />
            <path 
              id="right-middle" 
              className={`finger-path ${activeFinger === 'right-middle' ? 'active' : ''}`} 
              d="M 78,110 L 78,15 C 78,5 94,5 94,15 L 94,110 Z" 
            />
            <path 
              id="right-ring" 
              className={`finger-path ${activeFinger === 'right-ring' ? 'active' : ''}`} 
              d="M 100,110 L 100,28 C 100,18 116,18 116,28 L 116,110 Z" 
            />
            <path 
              id="right-pinky" 
              className={`finger-path ${activeFinger === 'right-pinky' ? 'active' : ''}`} 
              d="M 122,110 L 122,50 C 122,40 138,40 138,50 L 138,110 Z" 
            />
          </svg>
          <span className="hand-name-label">ডান হাত (Right Hand)</span>
        </div>
      </div>
    </div>
  );
}
