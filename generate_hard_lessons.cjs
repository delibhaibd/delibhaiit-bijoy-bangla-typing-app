const fs = require('fs');

const sentences = [
    "স্বাধীনতা অর্জন করার চেয়ে স্বাধীনতা রক্ষা করা অনেক বেশি কঠিন।",
    "একাত্তরের মুক্তিযুদ্ধে বহু শহীদের আত্মত্যাগের বিনিময়ে আমরা পেয়েছি এই স্বাধীন বাংলাদেশ।",
    "আন্তর্জাতিক মাতৃভাষা দিবস হিসেবে একুশে ফেব্রুয়ারি বিশ্বজুড়ে শ্রদ্ধার সাথে উদযাপিত হয়।",
    "রবীন্দ্রনাথ ঠাকুর ১৯১৩ সালে সাহিত্যে নোবেল পুরস্কার অর্জন করে বাংলা ভাষাকে বিশ্বদরবারে সম্মানিত করেন।",
    "কাজী নজরুল ইসলাম ছিলেন আমাদের জাতীয় কবি, যাঁর কবিতা আমাদের অন্যায়ের বিরুদ্ধে বিদ্রোহ করতে শেখায়।",
    "বিজ্ঞানের নিত্যনতুন আবিষ্কার মানব সভ্যতার অগ্রগতিকে অভাবনীয় গতিতে ত্বরাণ্বিত করেছে।",
    "মহাকাশ গবেষণায় কৃত্রিম উপগ্রহ পাঠাল বাংলাদেশ, যা আমাদের প্রযুক্তির উৎকর্ষতার বড় প্রমাণ।",
    "জলবায়ু পরিবর্তনের ক্ষতিকর প্রভাব থেকে পৃথিবীকে রক্ষা করতে বিশ্বনেতাদের জরুরি পদক্ষেপ নেওয়া প্রয়োজন।",
    "তথ্যপ্রযুক্তির অবাধ প্রবাহের যুগে সঠিক ও নির্ভুল তথ্য বাছাই করা অত্যন্ত গুরুত্বপূর্ণ ও চ্যালেঞ্জিং।",
    "আত্মবিশ্বাস ও নিরলস অধ্যবসায় থাকলে যেকোনো কঠিন লক্ষ্য অর্জন করা সম্ভব হয়।",
    "সুশিক্ষিত লোক মাত্রই স্বশিক্ষিত, কারণ প্রকৃত শিক্ষা মনকে চিন্তার স্বাধীনতা প্রদান করে।",
    "দুর্নীতি ও অনিয়ম যেকোনো দেশের অর্থনৈতিক ও সামাজিক অগ্রগতিকে মারাত্মকভাবে ব্যাহত করে।",
    "সংক্রামক ব্যাধি প্রতিরোধের জন্য ব্যক্তিগত স্বাস্থ্যবিধি ও সচেতনতা বজায় রাখা আবশ্যিক।",
    "সৃজনশীল চিন্তাভাবনা ও উদ্ভাবনী শক্তি তরুণ সমাজকে নতুন দিগন্তের সন্ধান দেয়।",
    "ঐতিহ্যবাহী কারুশিল্প ও লোকসংস্কৃতি আমাদের জাতীয় সত্তা ও পরিচয়কে সমৃদ্ধ করে।",
    "সহনশীলতা ও পারস্পরিক শ্রদ্ধা বোধ সামাজিক শান্তি ও সম্প্রীতি রক্ষার মূল ভিত্তি।",
    "কোনো কাজকেই ছোট করে দেখা উচিত নয়, কারণ শ্রমের মর্যাদা সব ক্ষেত্রে সমান।",
    "আধুনিক চিকিৎসাবিজ্ঞানের অভূতপূর্ব উন্নতি জটিল ও দূরারোগ্য ব্যাধির চিকিৎসাকে সহজ করেছে।",
    "তরুণ প্রজন্মই একটি দেশের ভবিষ্যৎ সমৃদ্ধি ও সার্বিক উন্নয়নের মূল চালিকাশক্তি।",
    "টেকসই উন্নয়ন নিশ্চিত করতে প্রাকৃতিক সম্পদের অপচয় রোধ করা অত্যন্ত জরুরি।",
    "ইতিহাস পাঠের মাধ্যমে আমরা অতীতের ভুল থেকে শিক্ষা নিয়ে ভবিষ্যৎকে সুন্দর করতে পারি।",
    "চরিত্র গঠনে শৈশব ও কৈশোরকালের পরিবেশ এবং শিক্ষার ভূমিকা অপরিসীম।",
    "শৃঙ্খলা ও নিয়মানুবর্তিতা ছাড়া কোনো ব্যক্তি বা প্রতিষ্ঠান সাফল্য লাভ করতে পারে না।",
    "সমালোচনাকে ইতিবাচকভাবে গ্রহণ করে নিজের ত্রুটি-বিচ্যুতি সংশোধন করা বিজ্ঞতার লক্ষণ।",
    "সাহিত্য পাঠ মানুষের সূক্ষ্ম অনুভূতিকে জাগ্রত করে এবং মানসিক বিকাশ ঘটায়।",
    "বই পড়া একটি চমৎকার মানসিক ব্যায়াম যা মস্তিষ্কের কার্যক্ষমতা বাড়াতে সাহায্য করে।",
    "বৈষম্যহীন সমাজ গঠনে সমাজের সর্বস্তরের মানুষের সমান অংশগ্রহণ প্রয়োজন।",
    "মানসিক চাপ মুক্ত থাকতে নিয়মিত ধ্যান ও পর্যাপ্ত বিশ্রাম নেওয়া দরকার।",
    "আমাদের সাংস্কৃতিক ঐতিহ্য অত্যন্ত সমৃদ্ধ ও শতাব্দী প্রাচীন ইতিহাস দ্বারা মণ্ডিত।",
    "পর্যটন শিল্পের সঠিক বিকাশ দেশের অর্থনীতিকে নতুন মাত্রায় উন্নীত করতে পারে।",
    "যেকোনো প্রপাগান্ডা বা গুজবে কান না দিয়ে সত্যতা যাচাই করা একজন দায়িত্বশীল নাগরিকের পরিচয়।",
    "প্রতিভার চেয়ে কঠোর পরিশ্রম ও অনুশীলনের গুরুত্ব জীবনে সাফল্য অর্জনে অনেক বেশি।",
    "বিশ্বায়নের এই যুগে নিজের ভাষা ও সংস্কৃতি রক্ষা করা এক বড় চ্যালেঞ্জ হয়ে দাঁড়িয়েছে।",
    "খেলাধুলা কেবল বিনোদন নয়, তা আন্তর্জাতিক অঙ্গনে দেশের প্রতিনিধিত্ব করার বড় মাধ্যম।",
    "জীবনের প্রতিটি প্রতিকূল পরিস্থিতিতে মানসিকভাবে দৃঢ় ও স্থির থাকা অত্যন্ত প্রয়োজন।",
    "শিশুদের মধ্যে নৈতিক মূল্যবোধ ও সততার বীজ শৈশব থেকেই রোপণ করা দরকার।",
    "প্লাস্টিক দূষণ সামুদ্রিক পরিবেশ ও সামগ্রিক বাস্তুতন্ত্রের জন্য মারাত্মক হুমকি হয়ে দাঁড়িয়েছে।",
    "সময় ব্যবস্থাপনা জীবনের প্রতিটি ক্ষেত্রে সফলতার সম্ভাবনা বহুগুণ বাড়িয়ে দেয়।",
    "সঠিক খাদ্যাভ্যাস ও কায়িক পরিশ্রম জীবনযাত্রাজনিত বিভিন্ন রোগ প্রতিরোধে সহায়ক।",
    "দেশীয় শিল্পের প্রসারে দেশি পণ্যের ব্যবহারে আমাদের আরো বেশি সচেষ্ট হওয়া উচিত।"
];

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

function convertSentence(sentence) {
    let result = [];
    
    // Normalize string (just in case there are decomposed characters)
    sentence = sentence.normalize('NFC');
    
    let chars = [...sentence];
    let i = 0;
    while (i < chars.length) {
        let ch = chars[i];
        
        // Handle pre-modifiers by looking ahead
        // But wait! Grapheme clustering is complex.
        // Let's implement a grapheme cluster extractor.
        // A grapheme cluster is (Consonant + Hasanta)* + Consonant + (Vowel modifier)*
        
        let clusterKeys = [];
        let clusterBn = "";
        
        if (ch === ' ' || ch === '।' || ch === ',' || ch === '?' || ch === '-') {
            result.push({ keys: [charMap[ch]], bn: ch });
            i++;
            continue;
        }
        
        // Look ahead to capture full conjunct or single letter with modifiers
        let end = i;
        while (end < chars.length) {
            let nextChar = chars[end];
            if (nextChar === ' ' || nextChar === '।' || nextChar === ',' || nextChar === '?' || nextChar === '-') {
                break;
            }
            if (end > i) {
                // If the previous char was Hasanta (্), the next char is part of conjunct
                if (chars[end-1] === '্') {
                    end++;
                    continue;
                }
                // If it's a vowel modifier, it belongs to this cluster
                if (['া', 'ি', 'ী', 'ু', 'ূ', 'ৃ', 'ে', 'ৈ', 'ো', 'ৌ'].includes(nextChar)) {
                    end++;
                    continue;
                }
                // If it's a ঁ, ং, ঃ, it belongs to this cluster
                if (['ঁ', 'ং', 'ঃ'].includes(nextChar)) {
                    end++;
                    continue;
                }
                // If it's a hasanta, it belongs to this cluster (and will pull the next char)
                if (nextChar === '্') {
                    end++;
                    continue;
                }
                // Otherwise it's a new consonant/vowel
                break;
            }
            end++;
        }
        
        let cluster = chars.slice(i, end).join('');
        clusterBn = cluster;
        
        // Convert cluster to keys
        // Identify if there's any pre-modifier
        let preMods = [];
        let postMods = [];
        let coreKeys = [];
        
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
                // Special case for Ya-phala: if '্য' (hasanta + য়)
                // Wait, Ya-phala is '্' + 'য', which maps to 'Z'
                coreKeys.push(charMap[c]);
            } else if (c === 'য' && j > 0 && clusterChars[j-1] === '্') {
                // Ya phala
                coreKeys.pop(); // remove 'g'
                coreKeys.push('Z');
            } else if (c === 'র' && j > 0 && clusterChars[j-1] === '্') {
                // Ra phala
                coreKeys.pop(); // remove 'g'
                coreKeys.push('z');
            } else if (c === '্' && j < clusterChars.length - 1 && clusterChars[j+1] === 'র') {
                 // Ra phala handled above, but wait: Ra phala is '্' + 'র' (z)
                 coreKeys.push('g');
            } else if (c === 'র' && j < clusterChars.length - 1 && clusterChars[j+1] === '্') {
                // Ref is 'র' + '্', mapped to 'A', typed BEFORE the consonant!
                preMods.push('A');
                j++; // skip hasanta
            } else {
                let mapped = charMap[c];
                if (Array.isArray(mapped)) {
                    coreKeys.push(...mapped);
                } else if (mapped) {
                    coreKeys.push(mapped);
                } else {
                    console.warn("Unknown char:", c, "in", sentence);
                }
            }
            j++;
        }
        
        clusterKeys = [...preMods, ...coreKeys, ...postMods];
        result.push({ keys: clusterKeys, bn: clusterBn });
        
        i = end;
    }
    
    return result;
}

let code = "[\n";
sentences.forEach((s, idx) => {
    let seq = convertSentence(s);
    let seqStr = JSON.stringify(seq);
    code += `  { id: 'prac-hard-${idx+1}', title: 'কঠিন বাক্য পর্ব - ${idx+1}', sequence: ${seqStr} }${idx < sentences.length - 1 ? ',' : ''}\n`;
});
code += "]\n";

fs.writeFileSync('hard_lessons.json', code);
console.log("Done. Check hard_lessons.json");
