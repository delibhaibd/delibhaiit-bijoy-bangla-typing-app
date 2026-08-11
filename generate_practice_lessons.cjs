const fs = require('fs');

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
        
        if (char === 'র' && i + 1 < text.length && text[i+1] === '্') {
            keys.push('A');
            i += 2;
            continue;
        }

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

function splitBengaliClusters(text) {
    const clusters = [];
    let currentCluster = "";
    
    const isBaseChar = (char) => {
        const code = char.charCodeAt(0);
        return (code >= 0x0985 && code <= 0x09B9) || (code >= 0x09CE && code <= 0x09DC) || (code >= 0x09DF && code <= 0x09E1);
    };

    const isModifier = (char) => {
        const code = char.charCodeAt(0);
        return (code >= 0x09BE && code <= 0x09CC) || code === 0x09D7 || char === 'ঁ' || char === 'ং' || char === 'ঃ' || char === 'ৎ';
    };
    
    let expectNextBase = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        
        if (char === '্') {
            currentCluster += char;
            expectNextBase = true;
        } else if (isBaseChar(char)) {
            if (expectNextBase) {
                currentCluster += char;
                expectNextBase = false;
            } else {
                if (currentCluster) {
                    clusters.push(currentCluster);
                }
                currentCluster = char;
            }
        } else if (isModifier(char)) {
            currentCluster += char;
        } else {
            if (currentCluster) {
                clusters.push(currentCluster);
                currentCluster = "";
            }
            clusters.push(char);
        }
    }
    if (currentCluster) {
        clusters.push(currentCluster);
    }
    
    return clusters;
}

const content = fs.readFileSync('sentences.txt', 'utf-8');
const lines = content.split('\n').map(l => l.trim()).filter(l => l);

const easySentences = [];
const mediumSentences = [];

for (let line of lines) {
    if (line.match(/^\d+\./)) {
        const text = line.replace(/^\d+\.\s*/, '').trim();
        const num = parseInt(line.match(/^\d+/)[0], 10);
        if (num <= 300) {
            easySentences.push(text);
        } else {
            mediumSentences.push(text);
        }
    }
}

const uniqueEasy = [...new Set(easySentences)];
const uniqueMedium = [...new Set(mediumSentences)];

function toObjString(sentence) {
    // Instead of mapping the whole sentence to one object,
    // we return an array of cluster objects.
    const clusters = splitBengaliClusters(sentence);
    const objects = clusters.map(c => {
        return `{ keys: ${JSON.stringify(unicodeToBijoyKeys(c))}, bn: ${JSON.stringify(c)} }`;
    });
    return objects.join(', ');
}

function generateSubLessons(sentences, prefix, titlePrefix) {
    let output = '';
    const CHUNK_SIZE = 5;
    let index = 1;
    for (let i = 0; i < sentences.length; i += CHUNK_SIZE) {
        const chunk = sentences.slice(i, i + CHUNK_SIZE);
        // We join the chunks with commas. We also want a comma/space between sentences
        // But the previous implementation just used a space from the generator.
        // Wait, the previous generator had space between items if generating from array, 
        // but generateBlockSequence with randomCount=0 straightCount=5? 
        // Wait, for practice we just want to run straight through the characters.
        // If we map the clusters, the spaces are already in the clusters array!
        // We just need to pass an array of all clusters for the chunk.
        
        let allObjects = [];
        chunk.forEach((sentence, idx) => {
            const clusters = splitBengaliClusters(sentence);
            clusters.forEach(c => {
                allObjects.push(`{ keys: ${JSON.stringify(unicodeToBijoyKeys(c))}, bn: ${JSON.stringify(c)} }`);
            });
            // if this is not the last sentence in the chunk, we can push a space cluster?
            // Actually, the user's sentence already has "।" at the end, so a space is nice.
            if (idx < chunk.length - 1) {
                allObjects.push(`{ keys: [" "], bn: " " }`);
            }
        });
        
        output += `            { id: '${prefix}-${index}', title: '${titlePrefix} পর্ব - ${index}', sequence: [${allObjects.join(', ')}] },\n`;
        index++;
    }
    return output;
}

const finalCode = `
        id: 'practice',
        title: 'অনুশীলন কাজ',
        subLessons: [
${generateSubLessons(uniqueEasy, 'prac-easy', 'সহজ বাক্য')}
${generateSubLessons(uniqueMedium, 'prac-medium', 'মধ্যম বাক্য')}
        ]
`;

fs.writeFileSync('generated_lessons.txt', finalCode);
console.log('Generated successfully!');
