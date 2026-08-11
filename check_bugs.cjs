const fs = require('fs');
const data = fs.readFileSync('C:/Users/deliBhai CEO/.gemini/antigravity-ide/scratch/bijoy-typing/src/data/lessons.js', 'utf8');

function dump(str) {
    let hex = '';
    for (let i = 0; i < str.length; i++) {
        hex += str.charCodeAt(i).toString(16) + ' ';
    }
    return hex.trim();
}

const match = data.match(/bn: "(র্বে)"/);
if (match) {
    console.log("র্বে:", dump(match[1]));
}
const match2 = data.match(/bn: "(শ্চি)"/);
if (match2) {
    console.log("শ্চি:", dump(match2[1]));
}
const match3 = data.match(/bn: "(য়)"/);
if (match3) {
    console.log("য়:", dump(match3[1]));
}
