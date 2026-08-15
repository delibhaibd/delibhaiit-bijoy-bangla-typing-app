import React from 'react';

const KEY_FINGER_MAP = {
  // Left Pinky (LP)
  '`': 'LP', '~': 'LP', '1': 'LP', '!': 'LP', 'q': 'LP', 'Q': 'LP', 'a': 'LP', 'A': 'LP', 'z': 'LP', 'Z': 'LP', 
  'tab': 'LP', 'Tab': 'LP', 'capslock': 'LP', 'CapsLock': 'LP', 'shift': 'LP', 'Shift': 'LP', 'LShift': 'LP', 'control': 'LP', 'Control': 'LP',
  
  // Left Ring (LR)
  '2': 'LR', '@': 'LR', 'w': 'LR', 'W': 'LR', 's': 'LR', 'S': 'LR', 'x': 'LR', 'X': 'LR',
  
  // Left Middle (LM)
  '3': 'LM', '#': 'LM', 'e': 'LM', 'E': 'LM', 'd': 'LM', 'D': 'LM', 'c': 'LM', 'C': 'LM',
  
  // Left Index (LI)
  '4': 'LI', '$': 'LI', '5': 'LI', '%': 'LI', 'r': 'LI', 'R': 'LI', 't': 'LI', 'T': 'LI', 
  'f': 'LI', 'F': 'LI', 'g': 'LI', 'G': 'LI', 'v': 'LI', 'V': 'LI', 'b': 'LI', 'B': 'LI',
  
  // Thumbs (LT / RT)
  ' ': 'RT', 'Space': 'RT', 'space': 'RT', 'alt': 'LT', 'Alt': 'LT',
  
  // Right Index (RI)
  '6': 'RI', '^': 'RI', '7': 'RI', '&': 'RI', 'y': 'RI', 'Y': 'RI', 'u': 'RI', 'U': 'RI', 
  'h': 'RI', 'H': 'RI', 'j': 'RI', 'J': 'RI', 'n': 'RI', 'N': 'RI', 'm': 'RI', 'M': 'RI',
  
  // Right Middle (RM)
  '8': 'RM', '*': 'RM', 'i': 'RM', 'I': 'RM', 'k': 'RM', 'K': 'RM', ',': 'RM', '<': 'RM',
  
  // Right Ring (RR)
  '9': 'RR', '(': 'RR', 'o': 'RR', 'O': 'RR', 'l': 'RR', 'L': 'RR', '.': 'RR', '>': 'RR',
  
  // Right Pinky (RP)
  '0': 'RP', ')': 'RP', '-': 'RP', '_': 'RP', '=': 'RP', '+': 'RP', 
  'p': 'RP', 'P': 'RP', '[': 'RP', '{': 'RP', ']': 'RP', '}': 'RP', 
  '\\': 'RP', '|': 'RP', ';': 'RP', ':': 'RP', "'": 'RP', '"': 'RP', 
  '/': 'RP', '?': 'RP', 'enter': 'RP', 'Enter': 'RP', 'backspace': 'RP', 'Backspace': 'RP', 'RShift': 'RP'
};

const FINGER_LABELS_BN = {
  'LP': 'বাম হাত: কনিষ্ঠা (Left Pinky)',
  'LR': 'বাম হাত: অনামিকা (Left Ring)',
  'LM': 'বাম হাত: মধ্যমা (Left Middle)',
  'LI': 'বাম হাত: তর্জনী (Left Index)',
  'LT': 'বাম হাত: বৃদ্ধাঙ্গুলি (Left Thumb)',
  'RT': 'ডান হাত: বৃদ্ধাঙ্গুলি (Right Thumb)',
  'RI': 'ডান হাত: তর্জনী (Right Index)',
  'RM': 'ডান হাত: মধ্যমা (Right Middle)',
  'RR': 'ডান হাত: অনামিকা (Right Ring)',
  'RP': 'ডান হাত: কনিষ্ঠা (Right Pinky)',
};

export default function HandsGuide({ expectedKey, isNumpadMode = false }) {
  if (isNumpadMode) return null;

  const fingerCode = expectedKey ? KEY_FINGER_MAP[expectedKey] || KEY_FINGER_MAP[expectedKey.toLowerCase()] : null;
  const fingerName = fingerCode ? FINGER_LABELS_BN[fingerCode] : null;

  return (
    <div className="hands-guide-container">
      {fingerName && (
        <div className="hands-guide-badge">
          <span className="finger-pulse-dot"></span>
          <span>{fingerName}</span>
        </div>
      )}

      <div className="hands-wrapper">
        <svg className="hands-svg" viewBox="0 0 800 280" xmlns="http://www.w3.org/2000/svg">
          {/* Left Hand */}
          <path className="hand-base" d="M 120 280 C 140 210, 160 180, 165 160" />
          <path 
            id="finger-LP" 
            className={`finger ${fingerCode === 'LP' ? 'active-finger' : ''}`} 
            d="M 165 160 C 168 135, 175 105, 180 105 C 185 105, 190 130, 190 150" 
          />
          <path 
            id="finger-LR" 
            className={`finger ${fingerCode === 'LR' ? 'active-finger' : ''}`} 
            d="M 190 150 C 195 125, 202 85, 212 85 C 222 85, 224 115, 224 145" 
          />
          <path 
            id="finger-LM" 
            className={`finger ${fingerCode === 'LM' ? 'active-finger' : ''}`} 
            d="M 224 145 C 227 120, 235 75, 246 75 C 256 75, 258 110, 258 145" 
          />
          <path 
            id="finger-LI" 
            className={`finger ${fingerCode === 'LI' ? 'active-finger' : ''}`} 
            d="M 258 145 C 263 115, 275 70, 288 70 C 300 70, 300 110, 295 160 C 288 205, 280 235, 300 260" 
          />
          <path 
            id="finger-LT" 
            className={`finger ${fingerCode === 'LT' ? 'active-finger' : ''}`} 
            d="M 300 260 C 303 240, 308 200, 318 200 C 326 200, 318 245, 295 280" 
          />
          <path className="hand-base" d="M 190 150 C 192 180, 192 205, 190 225" />
          <path className="hand-base" d="M 224 145 C 226 180, 226 210, 224 235" />
          <path className="hand-base" d="M 258 145 C 260 180, 258 215, 250 240" />

          {/* Right Hand */}
          <path className="hand-base" d="M 680 280 C 660 210, 640 180, 635 160" />
          <path 
            id="finger-RP" 
            className={`finger ${fingerCode === 'RP' ? 'active-finger' : ''}`} 
            d="M 635 160 C 632 135, 625 105, 620 105 C 615 105, 610 130, 610 150" 
          />
          <path 
            id="finger-RR" 
            className={`finger ${fingerCode === 'RR' ? 'active-finger' : ''}`} 
            d="M 610 150 C 605 125, 598 85, 588 85 C 578 85, 576 115, 576 145" 
          />
          <path 
            id="finger-RM" 
            className={`finger ${fingerCode === 'RM' ? 'active-finger' : ''}`} 
            d="M 576 145 C 573 120, 565 75, 554 75 C 544 75, 542 110, 542 145" 
          />
          <path 
            id="finger-RI" 
            className={`finger ${fingerCode === 'RI' ? 'active-finger' : ''}`} 
            d="M 542 145 C 537 115, 525 70, 512 70 C 500 70, 500 110, 505 160 C 512 205, 520 235, 500 260" 
          />
          <path 
            id="finger-RT" 
            className={`finger ${fingerCode === 'RT' ? 'active-finger' : ''}`} 
            d="M 500 260 C 497 240, 492 200, 482 200 C 474 200, 482 245, 505 280" 
          />
          <path className="hand-base" d="M 610 150 C 608 180, 608 205, 610 225" />
          <path className="hand-base" d="M 576 145 C 574 180, 574 210, 576 235" />
          <path className="hand-base" d="M 542 145 C 540 180, 542 215, 550 240" />
        </svg>
      </div>
    </div>
  );
}
