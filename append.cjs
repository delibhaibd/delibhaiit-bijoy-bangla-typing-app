const fs = require('fs');

let lessons = fs.readFileSync('src/data/lessons.js', 'utf8');
const hard = fs.readFileSync('hard_lessons.json', 'utf8');

const appendStr = `,
        {
            id: 'practice-hard',
            title: '৩য় ধাপ: কঠিন ও জটিল বাক্য',
            subLessons: ${hard}
        }
    ]
};`;

lessons = lessons.replace('    ]\n};', appendStr);
fs.writeFileSync('src/data/lessons.js', lessons);
console.log('Appended lessons');
