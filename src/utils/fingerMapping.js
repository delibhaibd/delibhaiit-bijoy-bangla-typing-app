export const fingerMap = {
    // Left Pinky
    '`': 'l-pinky', '1': 'l-pinky', 'q': 'l-pinky', 'a': 'l-pinky', 'z': 'l-pinky',
    '~': 'l-pinky', '!': 'l-pinky', 'Q': 'l-pinky', 'A': 'l-pinky', 'Z': 'l-pinky',
    'Shift': 'l-pinky', 'Tab': 'l-pinky', 'CapsLock': 'l-pinky', 'Control': 'l-pinky',

    // Left Ring
    '2': 'l-ring', 'w': 'l-ring', 's': 'l-ring', 'x': 'l-ring',
    '@': 'l-ring', 'W': 'l-ring', 'S': 'l-ring', 'X': 'l-ring',

    // Left Middle
    '3': 'l-middle', 'e': 'l-middle', 'd': 'l-middle', 'c': 'l-middle',
    '#': 'l-middle', 'E': 'l-middle', 'D': 'l-middle', 'C': 'l-middle',

    // Left Index
    '4': 'l-index', '5': 'l-index', 'r': 'l-index', 't': 'l-index', 'f': 'l-index', 'g': 'l-index', 'v': 'l-index', 'b': 'l-index',
    '$': 'l-index', '%': 'l-index', 'R': 'l-index', 'T': 'l-index', 'F': 'l-index', 'G': 'l-index', 'V': 'l-index', 'B': 'l-index',

    // Thumbs (usually Space is handled by either, we'll map to right thumb for simplicity or 'thumb' for both)
    ' ': 'thumb', 'Space': 'thumb', 'Alt': 'thumb',

    // Right Index
    '6': 'r-index', '7': 'r-index', 'y': 'r-index', 'u': 'r-index', 'h': 'r-index', 'j': 'r-index', 'n': 'r-index', 'm': 'r-index',
    '^': 'r-index', '&': 'r-index', 'Y': 'r-index', 'U': 'r-index', 'H': 'r-index', 'J': 'r-index', 'N': 'r-index', 'M': 'r-index',

    // Right Middle
    '8': 'r-middle', 'i': 'r-middle', 'k': 'r-middle', ',': 'r-middle',
    '*': 'r-middle', 'I': 'r-middle', 'K': 'r-middle', '<': 'r-middle',

    // Right Ring
    '9': 'r-ring', 'o': 'r-ring', 'l': 'r-ring', '.': 'r-ring',
    '(': 'r-ring', 'O': 'r-ring', 'L': 'r-ring', '>': 'r-ring',

    // Right Pinky
    '0': 'r-pinky', '-': 'r-pinky', '=': 'r-pinky', 'p': 'r-pinky', '[': 'r-pinky', ']': 'r-pinky', '\\': 'r-pinky', ';': 'r-pinky', "'": 'r-pinky', '/': 'r-pinky',
    ')': 'r-pinky', '_': 'r-pinky', '+': 'r-pinky', 'P': 'r-pinky', '{': 'r-pinky', '}': 'r-pinky', '|': 'r-pinky', ':': 'r-pinky', '"': 'r-pinky', '?': 'r-pinky',
    'Enter': 'r-pinky', 'Backspace': 'r-pinky'
};

export const getFingerForKey = (key) => {
    if (!key) return null;
    return fingerMap[key] || null;
};
