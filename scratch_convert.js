const charMap = {
    'অ': ['F'], 'আ': ['g', 'f'], 'ই': ['g', 'd'], 'ঈ': ['g', 'D'], 'উ': ['g', 's'], 'ঊ': ['g', 'S'], 'ঋ': ['g', 'a'], 'এ': ['g', 'c'], 'ঐ': ['g', 'C'], 'ও': ['x'], 'ঔ': ['g', 'X'],
    'ক': ['j'], 'খ': ['J'], 'গ': ['o'], 'ঘ': ['O'], 'ঙ': ['q'],
    'চ': ['y'], 'ছ': ['Y'], 'জ': ['u'], 'ঝ': ['U'], 'ঞ': ['I'],
    'ট': ['t'], 'ঠ': ['T'], 'ড': ['e'], 'ঢ': ['E'], 'ণ': ['B'],
    'ত': ['k'], 'থ': ['K'], 'দ': ['l'], 'ধ': ['L'], 'ন': ['b'],
    'প': ['r'], 'ফ': ['R'], 'ব': ['h'], 'ভ': ['H'], 'ম': ['m'],
    'য': ['w'], 'র': ['v'], 'ল': ['V'], 'শ': ['M'], 'ষ': ['N'], 'স': ['n'], 'হ': ['i'],
    'ড়': ['p'], 'ঢ়': ['P'], 'য়': ['W'],
    'ৎ': ['\\'], 'ং': ['Q'], 'ঃ': ['|'], 'ঁ': ['&'], '্': ['g'], '।': ['G'],
    ' ': [' '], ',': [','], '.': ['.'], '?': ['?'], '!': ['!'], '-': ['-']
};

const modifierMap = {
    'া': ['f'], 'ি': ['d'], 'ী': ['D'], 'ু': ['s'], 'ূ': ['S'], 'ৃ': ['a'], 'ে': ['c'], 'ৈ': ['C'],
    'ো': ['c', 'f'], 'ৌ': ['c', 'X']
};

const preModifiers = ['ি', 'ে', 'ৈ'];

function unicodeToBijoyKeys(text) {
    let keys = [];
    let i = 0;
    while (i < text.length) {
        let char = text[i];
        
        // Handle Reph (র্) which is র + ্ in Unicode
        if (char === 'র' && i + 1 < text.length && text[i+1] === '্') {
            // Wait, is it Jofola or Reph?
            // "র" + "্" + consonant = Reph.
            // In Unicode, it comes before the consonant.
            keys.push('A'); // Shift+a in Bijoy is Reph
            i += 2;
            continue;
        }

        // Handle Jofola (্য) and Rofola (্র)
        if (char === '্' && i + 1 < text.length) {
            if (text[i+1] === 'য') {
                keys.push('Z');
                i += 2;
                continue;
            } else if (text[i+1] === 'র') {
                keys.push('z');
                i += 2;
                continue;
            }
        }

        if (modifierMap[char]) {
            if (preModifiers.includes(char)) {
                let insertPos = keys.length - 1;
                while (insertPos >= 0 && (keys[insertPos] === 'g' || keys[insertPos] === 'Z' || keys[insertPos] === 'z')) {
                    insertPos -= 2;
                }
                keys.splice(insertPos < 0 ? 0 : insertPos, 0, ...modifierMap[char]);
            } else if (char === 'ো') {
                let insertPos = keys.length - 1;
                while (insertPos >= 0 && (keys[insertPos] === 'g' || keys[insertPos] === 'Z' || keys[insertPos] === 'z')) {
                    insertPos -= 2;
                }
                keys.splice(insertPos < 0 ? 0 : insertPos, 0, 'c');
                keys.push('f');
            } else if (char === 'ৌ') {
                let insertPos = keys.length - 1;
                while (insertPos >= 0 && (keys[insertPos] === 'g' || keys[insertPos] === 'Z' || keys[insertPos] === 'z')) {
                    insertPos -= 2;
                }
                keys.splice(insertPos < 0 ? 0 : insertPos, 0, 'c');
                keys.push('X');
            } else {
                keys.push(...modifierMap[char]);
            }
        } else if (charMap[char]) {
            keys.push(...charMap[char]);
        } else {
            keys.push(char);
        }
        i++;
    }
    return keys;
}

const tests = [
    "দোকান",
    "দৌড়",
    "গর্ত",
    "বন্যা",
    "অর্জুন",
    "ত্রুটি"
];

for (const t of tests) {
    console.log(t, "->", unicodeToBijoyKeys(t));
}
