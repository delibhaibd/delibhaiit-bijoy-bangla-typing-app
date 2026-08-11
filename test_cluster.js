function splitBengaliClusters(text) {
    const clusters = [];
    let currentCluster = "";
    
    // Vowels and Consonants start a new cluster, UNLESS they follow a Hasant (্)
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
            expectNextBase = true; // The next base character is part of this conjunct
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
            // Spaces, punctuation
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

const tests = [
    "আমি ভাত খাই।",
    "বিজ্ঞান",
    "গর্ত",
    "বন্যা",
    "ক্ষমা",
    "দোকান"
];

for (const t of tests) {
    console.log(t, "->", splitBengaliClusters(t));
}
