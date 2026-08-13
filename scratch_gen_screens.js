const screens = [
  { title: "j Practice", text: "jjjjjjjj" },
  { title: "f Practice", text: "ffffffff" },
  { title: "j & f Practice", text: "jjjj ffff jjjj ffff" },
  { title: "Space Bar Practice", text: "j f j f j f j f" },
  { title: "Alternating j and f", text: "jf jf jf jf jf jf" },
  { title: "Reverse Combo", text: "fj fj fj fj fj fj" },
  { title: "j, f, and Space Drills", text: "jj ff jj ff j f j f" },
  { title: "Mixed Combo 1", text: "j f j f jjj fff jf fj" },
  { title: "Mixed Combo 2", text: "fj jf f j j f ff jj" },
  { title: "Speed & Accuracy Drill", text: "j f jf fj jj ff j f jf fj" },
  { title: "Final Review", text: "j f jf fj jjj fff j f jf fj" }
];

let sequenceStr = '';
for(let i = 0; i < screens.length; i++) {
    sequenceStr += `...("${screens[i].text}".split('').map(c => ({ keys: [c], char: c }))), `;
}

console.log(`
            { 
                id: 'en-beg-1', 
                title: 'J, F, and Space', 
                screens: ${JSON.stringify(screens)},
                sequence: [${sequenceStr}]
            },
`);
