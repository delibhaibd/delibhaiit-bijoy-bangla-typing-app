const fs = require('fs');

const lessonsFile = 'src/data/lessons.js';
const generatedFile = 'generated_lessons.txt';

let lessons = fs.readFileSync(lessonsFile, 'utf8');
const generated = fs.readFileSync(generatedFile, 'utf8');

// Find the start of the practice block
const startIndex = lessons.indexOf("id: 'practice',");
// Go back to the opening brace of that block
const blockStart = lessons.lastIndexOf('{', startIndex);
// Find the end of the file (assume it's the end of the array, so before ];)
const endIndex = lessons.lastIndexOf('}');

const newLessons = lessons.slice(0, blockStart) + "{\n" + generated + "    }\n];";

fs.writeFileSync(lessonsFile, newLessons, 'utf8');
console.log('Injected successfully!');
