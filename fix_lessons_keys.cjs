const fs = require('fs');
let content = fs.readFileSync('src/data/lessons.js', 'utf8');

const charMap = {
    'ক': 'j', 'খ': 'J', 'গ': 'o', 'ঘ': 'O', 'ঙ': 'q',
    'চ': 'y', 'ছ': 'Y', 'জ': 'u', 'ঝ': 'U', 'ঞ': 'I',
    'ট': 't', 'ঠ': 'T', 'ড': 'e', 'ঢ': 'E', 'ণ': 'B',
    'ত': 'k', 'থ': 'K', 'দ': 'l', 'ধ': 'L', 'ন': 'b',
    'প': 'r', 'ফ': 'R', 'ব': 'h', 'ভ': 'H', 'ম': 'm',
    'য': 'w', 'র': 'v', 'ল': 'V', 'শ': 'M', 'ষ': 'N', 'স': 'n', 'হ': 'i', 'ড়': 'p', 'ঢ়': 'P', 'য়': 'W',
    'ৎ': '\\', 'ং': 'Q', 'ঃ': '|', 'ঁ': '&',
    'অ': 'F', 'আ': ['g', 'f'], 'ই': ['g', 'd'], 'ঈ': ['g', 'D'], 'উ': ['g', 's'], 'ঊ': ['g', 'S'], 'ঋ': ['g', 'a'], 'এ': ['g', 'c'], 'ঐ': ['g', 'C'], 'ও': 'x', 'ঔ': ['g', 'X'],
    'া': 'f', 'ি': 'd', 'ী': 'D', 'ু': 's', 'ূ': 'S', 'ৃ': 'a', 'ে': 'c', 'ৈ': 'C', 'ো': ['c', 'f'], 'ৌ': ['c', 'X'],
    '্': 'g', '।': 'G', ' ': ' ', ',': ',', '.': '>', '-': '-', '?': '?'
};

const preModifiers = ['ি', 'ে', 'ৈ'];

function convertCluster(cluster) {
    let preMods = [];
    let postMods = [];
    let coreKeys = [];
    let refMods = [];
    
    let j = 0;
    let clusterChars = [...cluster];
    while (j < clusterChars.length) {
        let c = clusterChars[j];
        if (c === 'ো') {
            preMods.push('c');
            postMods.push('f');
        } else if (c === 'ৌ') {
            preMods.push('c');
            postMods.push('X');
        } else if (preModifiers.includes(c)) {
            preMods.push(charMap[c]);
        } else if (['া', 'ী', 'ু', 'ূ', 'ৃ', 'ঁ', 'ং', 'ঃ'].includes(c)) {
            postMods.push(charMap[c]);
        } else if (c === 'য়' && j > 0 && clusterChars[j-1] !== '্') {
            coreKeys.push(charMap[c]);
        } else if (c === 'য' && j > 0 && clusterChars[j-1] === '্') {
            coreKeys.pop(); // remove 'g'
            coreKeys.push('Z');
        } else if (c === 'র' && j > 0 && clusterChars[j-1] === '্') {
            coreKeys.pop(); // remove 'g'
            coreKeys.push('z');
        } else if (c === '্' && j < clusterChars.length - 1 && clusterChars[j+1] === 'র') {
             coreKeys.push('g');
        } else if (c === 'র' && j < clusterChars.length - 1 && clusterChars[j+1] === '্') {
            refMods.push('A');
            j++; // skip hasanta
        } else {
            let mapped = charMap[c];
            if (Array.isArray(mapped)) {
                coreKeys.push(...mapped);
            } else if (mapped) {
                coreKeys.push(mapped);
            } else {
                console.warn("Unknown char:", c, "in", cluster);
            }
        }
        j++;
    }
    
    return [...preMods, ...coreKeys, ...refMods, ...postMods];
}

// Regex to find { keys: [...], bn: "..." } or bn: '...'
content = content.replace(/\{ *key(s)?: *(\[.*?\]|'.*?'), *bn: *'([^']+)' *\}/g, (match, p1, p2, bnStr) => {
    let keys = convertCluster(bnStr);
    return `{ keys: ${JSON.stringify(keys)}, bn: '${bnStr}' }`;
});

content = content.replace(/\{ *key(s)?: *(\[.*?\]|'.*?'), *bn: *"([^"]+)" *\}/g, (match, p1, p2, bnStr) => {
    let keys = convertCluster(bnStr);
    return `{ keys: ${JSON.stringify(keys)}, bn: "${bnStr}" }`;
});

fs.writeFileSync('src/data/lessons.js', content);
console.log('Fixed src/data/lessons.js');
