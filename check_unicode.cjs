const fs = require('fs');
const data = fs.readFileSync('C:/Users/deliBhai CEO/.gemini/antigravity-ide/scratch/bijoy-typing/src/data/lessons.js', 'utf8');
const match = data.match(/bn: "(সে)"/);
if (match) {
    const str = match[1];
    let hex = '';
    for (let i = 0; i < str.length; i++) {
        hex += str.charCodeAt(i).toString(16) + ' ';
    }
    console.log("Matched:", str);
    console.log("Hex:", hex);
} else {
    console.log("Not found");
}
