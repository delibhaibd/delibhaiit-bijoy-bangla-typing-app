import { generateBlockSequence } from '../utils/generator';

export const englishCategories = [
    {
        id: 'en-beginner',
        title: 'Beginner (বিগিনার)',
        subLessons: [
            // Getting Started
            { id: 'en-beg-1', title: 'J, F, and Space', sequence: generateBlockSequence([{ keys: ["j"], char: 'j' }, { keys: ["f"], char: 'f' }], 15, 15) },
            { id: 'en-beg-2', title: 'U, R, and K Keys', sequence: generateBlockSequence([{ keys: ["u"], char: 'u' }, { keys: ["r"], char: 'r' }, { keys: ["k"], char: 'k' }], 15, 15) },
            { id: 'en-beg-3', title: 'D, E, and I Keys', sequence: generateBlockSequence([{ keys: ["d"], char: 'd' }, { keys: ["e"], char: 'e' }, { keys: ["i"], char: 'i' }], 15, 15) },
            { id: 'en-beg-4', title: 'C, G, and N Keys', sequence: generateBlockSequence([{ keys: ["c"], char: 'c' }, { keys: ["g"], char: 'g' }, { keys: ["n"], char: 'n' }], 15, 15) },
            { id: 'en-beg-5', title: 'Beginner Review 1', sequence: generateBlockSequence([
                { keys: ["j"], char: 'j' }, { keys: ["f"], char: 'f' }, { keys: ["u"], char: 'u' }, { keys: ["r"], char: 'r' }, { keys: ["k"], char: 'k' }, { keys: ["d"], char: 'd' }, { keys: ["e"], char: 'e' }, { keys: ["i"], char: 'i' }, { keys: ["c"], char: 'c' }, { keys: ["g"], char: 'g' }, { keys: ["n"], char: 'n' }
            ], 5, 20) },
            
            // Reaching Out
            { id: 'en-beg-6', title: 'T, S, and L Keys', sequence: generateBlockSequence([{ keys: ["t"], char: 't' }, { keys: ["s"], char: 's' }, { keys: ["l"], char: 'l' }], 15, 15) },
            { id: 'en-beg-7', title: 'O, B, and A Keys', sequence: generateBlockSequence([{ keys: ["o"], char: 'o' }, { keys: ["b"], char: 'b' }, { keys: ["a"], char: 'a' }], 15, 15) },
            { id: 'en-beg-8', title: 'V, H, and M Keys', sequence: generateBlockSequence([{ keys: ["v"], char: 'v' }, { keys: ["h"], char: 'h' }, { keys: ["m"], char: 'm' }], 15, 15) },
            { id: 'en-beg-9', title: 'Period and Comma', sequence: generateBlockSequence([{ keys: ["."], char: '.' }, { keys: [","], char: ',' }], 15, 15) },
            { id: 'en-beg-10', title: 'Beginner Review 2', sequence: generateBlockSequence([
                { keys: ["t"], char: 't' }, { keys: ["s"], char: 's' }, { keys: ["l"], char: 'l' }, { keys: ["o"], char: 'o' }, { keys: ["b"], char: 'b' }, { keys: ["a"], char: 'a' }, { keys: ["v"], char: 'v' }, { keys: ["h"], char: 'h' }, { keys: ["m"], char: 'm' }, { keys: ["."], char: '.' }, { keys: [","], char: ',' }
            ], 5, 20) },
            
            // The Home Stretch
            { id: 'en-beg-11', title: 'W, X, and ; Keys', sequence: generateBlockSequence([{ keys: ["w"], char: 'w' }, { keys: ["x"], char: 'x' }, { keys: [";"], char: ';' }], 15, 15) },
            { id: 'en-beg-12', title: 'Q, Y, and P Keys', sequence: generateBlockSequence([{ keys: ["q"], char: 'q' }, { keys: ["y"], char: 'y' }, { keys: ["p"], char: 'p' }], 15, 15) },
            { id: 'en-beg-13', title: 'Z and Enter Keys', sequence: generateBlockSequence([{ keys: ["z"], char: 'z' }, { keys: ["Enter"], char: '↵' }], 15, 15) },
            
            // Wrapping Up
            { id: 'en-beg-14', title: 'Beginner Wrap-up', sequence: generateBlockSequence([
                { keys: ["w"], char: 'w' }, { keys: ["x"], char: 'x' }, { keys: [";"], char: ';' }, { keys: ["q"], char: 'q' }, { keys: ["y"], char: 'y' }, { keys: ["p"], char: 'p' }, { keys: ["z"], char: 'z' }, { keys: ["j"], char: 'j' }, { keys: ["a"], char: 'a' }
            ], 5, 20) },
            { id: 'en-beg-15', title: 'Beginner Assessment', sequence: [
                { keys: ["t"], char: "t" }, { keys: ["h"], char: "h" }, { keys: ["e"], char: "e" }, { keys: [" "], char: " " }, 
                { keys: ["q"], char: "q" }, { keys: ["u"], char: "u" }, { keys: ["i"], char: "i" }, { keys: ["c"], char: "c" }, { keys: ["k"], char: "k" }, { keys: [" "], char: " " }, 
                { keys: ["b"], char: "b" }, { keys: ["r"], char: "r" }, { keys: ["o"], char: "o" }, { keys: ["w"], char: "w" }, { keys: ["n"], char: "n" }, { keys: [" "], char: " " }, 
                { keys: ["f"], char: "f" }, { keys: ["o"], char: "o" }, { keys: ["x"], char: "x" }, { keys: [" "], char: " " }, 
                { keys: ["j"], char: "j" }, { keys: ["u"], char: "u" }, { keys: ["m"], char: "m" }, { keys: ["p"], char: "p" }, { keys: ["s"], char: "s" }, { keys: [" "], char: " " }, 
                { keys: ["o"], char: "o" }, { keys: ["v"], char: "v" }, { keys: ["e"], char: "e" }, { keys: ["r"], char: "r" }, { keys: [" "], char: " " }, 
                { keys: ["1"], char: "1" }, { keys: ["3"], char: "3" }, { keys: [" "], char: " " }, 
                { keys: ["l"], char: "l" }, { keys: ["a"], char: "a" }, { keys: ["z"], char: "z" }, { keys: ["y"], char: "y" }, { keys: [" "], char: " " }, 
                { keys: ["d"], char: "d" }, { keys: ["o"], char: "o" }, { keys: ["g"], char: "g" }, { keys: ["s"], char: "s" }, { keys: ["!"], char: "!" }
            ]}
        ]
    },
    {
        id: 'en-intermediate',
        title: 'Intermediate (ইন্টারমিডিয়েট)',
        subLessons: [
            // Common English Words
            { id: 'en-int-1', title: 'Easy Home Row Words', sequence: generateBlockSequence([{ keys: ["a"], char: 'a' }, { keys: ["s"], char: 's' }, { keys: ["d"], char: 'd' }, { keys: ["f"], char: 'f' }, { keys: ["j"], char: 'j' }, { keys: ["k"], char: 'k' }, { keys: ["l"], char: 'l' }, { keys: [";"], char: ';' }], 15, 15) },
            { id: 'en-int-2', title: 'Easy Top Row Words', sequence: generateBlockSequence([{ keys: ["q"], char: 'q' }, { keys: ["w"], char: 'w' }, { keys: ["e"], char: 'e' }, { keys: ["r"], char: 'r' }, { keys: ["t"], char: 't' }, { keys: ["y"], char: 'y' }, { keys: ["u"], char: 'u' }, { keys: ["i"], char: 'i' }, { keys: ["o"], char: 'o' }, { keys: ["p"], char: 'p' }], 15, 15) },
            { id: 'en-int-3', title: 'Easy Bottom Row Words', sequence: generateBlockSequence([{ keys: ["z"], char: 'z' }, { keys: ["x"], char: 'x' }, { keys: ["c"], char: 'c' }, { keys: ["v"], char: 'v' }, { keys: ["b"], char: 'b' }, { keys: ["n"], char: 'n' }, { keys: ["m"], char: 'm' }], 15, 15) },
            
            // On to Sentences
            { id: 'en-int-4', title: 'Shift Key and Capitalization', sequence: generateBlockSequence([{ keys: ["A"], char: 'A' }, { keys: ["B"], char: 'B' }, { keys: ["C"], char: 'C' }, { keys: ["D"], char: 'D' }, { keys: ["E"], char: 'E' }], 15, 15) },
            { id: 'en-int-5', title: 'Basic Punctuation', sequence: generateBlockSequence([{ keys: ["."], char: '.' }, { keys: [","], char: ',' }, { keys: ["?"], char: '?' }, { keys: ["!"], char: '!' }], 15, 15) },
            { id: 'en-int-6', title: 'Intermediate Punctuation', sequence: generateBlockSequence([{ keys: [";"], char: ';' }, { keys: [":"], char: ':' }, { keys: ["'"], char: "'" }, { keys: ['"'], char: '"' }], 15, 15) },
            { id: 'en-int-7', title: 'Quick Sentences', sequence: [{ keys: ["T"], char: "T" }, { keys: ["h"], char: "h" }, { keys: ["i"], char: "i" }, { keys: ["s"], char: "s" }, { keys: [" "], char: " " }, { keys: ["i"], char: "i" }, { keys: ["s"], char: "s" }, { keys: [" "], char: " " }, { keys: ["a"], char: "a" }, { keys: [" "], char: " " }, { keys: ["t"], char: "t" }, { keys: ["e"], char: "e" }, { keys: ["s"], char: "s" }, { keys: ["t"], char: "t" }, { keys: ["."], char: "." }] },
            { id: 'en-int-8', title: 'Short Paragraphs', sequence: [{ keys: ["H"], char: "H" }, { keys: ["e"], char: "e" }, { keys: ["l"], char: "l" }, { keys: ["l"], char: "l" }, { keys: ["o"], char: "o" }, { keys: [" "], char: " " }, { keys: ["w"], char: "w" }, { keys: ["o"], char: "o" }, { keys: ["r"], char: "r" }, { keys: ["l"], char: "l" }, { keys: ["d"], char: "d" }, { keys: ["!"], char: "!" }, { keys: [" "], char: " " }, { keys: ["I"], char: "I" }, { keys: ["t"], char: "t" }, { keys: [" "], char: " " }, { keys: ["i"], char: "i" }, { keys: ["s"], char: "s" }, { keys: [" "], char: " " }, { keys: ["a"], char: "a" }, { keys: [" "], char: " " }, { keys: ["g"], char: "g" }, { keys: ["o"], char: "o" }, { keys: ["o"], char: "o" }, { keys: ["d"], char: "d" }, { keys: [" "], char: " " }, { keys: ["d"], char: "d" }, { keys: ["a"], char: "a" }, { keys: ["y"], char: "y" }, { keys: ["."], char: "." }] },
            { id: 'en-int-9', title: 'Speed Drills', sequence: [{ keys: ["T"], char: "T" }, { keys: ["h"], char: "h" }, { keys: ["e"], char: "e" }, { keys: [" "], char: " " }, { keys: ["q"], char: "q" }, { keys: ["u"], char: "u" }, { keys: ["i"], char: "i" }, { keys: ["c"], char: "c" }, { keys: ["k"], char: "k" }, { keys: [" "], char: " " }, { keys: ["f"], char: "f" }, { keys: ["o"], char: "o" }, { keys: ["x"], char: "x" }, { keys: [" "], char: " " }, { keys: ["j"], char: "j" }, { keys: ["u"], char: "u" }, { keys: ["m"], char: "m" }, { keys: ["p"], char: "p" }, { keys: ["s"], char: "s" }, { keys: ["."], char: "." }] },
            
            // Wrapping Up
            { id: 'en-int-10', title: 'Intermediate Wrap-up', sequence: generateBlockSequence([{ keys: ["A"], char: 'A' }, { keys: ["Z"], char: 'Z' }, { keys: ["!"], char: '!' }, { keys: ["?"], char: '?' }, { keys: ["."], char: '.' }, { keys: [","], char: ',' }], 15, 20) },
            { id: 'en-int-11', title: 'Intermediate Assessment', sequence: [{ keys: ["T"], char: "T" }, { keys: ["h"], char: "h" }, { keys: ["e"], char: "e" }, { keys: [" "], char: " " }, { keys: ["q"], char: "q" }, { keys: ["u"], char: "u" }, { keys: ["i"], char: "i" }, { keys: ["c"], char: "c" }, { keys: ["k"], char: "k" }, { keys: [" "], char: " " }, { keys: ["b"], char: "b" }, { keys: ["r"], char: "r" }, { keys: ["o"], char: "o" }, { keys: ["w"], char: "w" }, { keys: ["n"], char: "n" }, { keys: [" "], char: " " }, { keys: ["f"], char: "f" }, { keys: ["o"], char: "o" }, { keys: ["x"], char: "x" }, { keys: [" "], char: " " }, { keys: ["j"], char: "j" }, { keys: ["u"], char: "u" }, { keys: ["m"], char: "m" }, { keys: ["p"], char: "p" }, { keys: ["s"], char: "s" }, { keys: [" "], char: " " }, { keys: ["o"], char: "o" }, { keys: ["v"], char: "v" }, { keys: ["e"], char: "e" }, { keys: ["r"], char: "r" }, { keys: [" "], char: " " }, { keys: ["t"], char: "t" }, { keys: ["h"], char: "h" }, { keys: ["e"], char: "e" }, { keys: [" "], char: " " }, { keys: ["l"], char: "l" }, { keys: ["a"], char: "a" }, { keys: ["z"], char: "z" }, { keys: ["y"], char: "y" }, { keys: [" "], char: " " }, { keys: ["d"], char: "d" }, { keys: ["o"], char: "o" }, { keys: ["g"], char: "g" }, { keys: ["!"], char: "!" }] },
        ]
    },
    {
        id: 'en-advanced',
        title: 'Advanced (অ্যাডভান্স)',
        subLessons: [
            // Skill Builder
            { id: 'en-adv-1', title: 'Numbers Letters Numbers', sequence: generateBlockSequence([{ keys: ["1"], char: '1' }, { keys: ["a"], char: 'a' }, { keys: ["2"], char: '2' }, { keys: ["b"], char: 'b' }, { keys: ["3"], char: '3' }, { keys: ["c"], char: 'c' }], 15, 15) },
            { id: 'en-adv-2', title: 'Accuracy Focus', sequence: [{ keys: ["T"], char: "T" }, { keys: ["y"], char: "y" }, { keys: ["p"], char: "p" }, { keys: ["i"], char: "i" }, { keys: ["n"], char: "n" }, { keys: ["g"], char: "g" }, { keys: [" "], char: " " }, { keys: ["r"], char: "r" }, { keys: ["e"], char: "e" }, { keys: ["q"], char: "q" }, { keys: ["u"], char: "u" }, { keys: ["i"], char: "i" }, { keys: ["r"], char: "r" }, { keys: ["e"], char: "e" }, { keys: ["s"], char: "s" }, { keys: [" "], char: " " }, { keys: ["p"], char: "p" }, { keys: ["a"], char: "a" }, { keys: ["t"], char: "t" }, { keys: ["i"], char: "i" }, { keys: ["e"], char: "e" }, { keys: ["n"], char: "n" }, { keys: ["c"], char: "c" }, { keys: ["e"], char: "e" }, { keys: ["."], char: "." }] },
            { id: 'en-adv-3', title: 'Advanced Symbols', sequence: generateBlockSequence([{ keys: ["~"], char: '~' }, { keys: ["_"], char: '_' }, { keys: ["+"], char: '+' }, { keys: ["{"], char: '{' }, { keys: ["}"], char: '}' }, { keys: ["|"], char: '|' }], 15, 15) },
            { id: 'en-adv-4', title: 'Numeric Keypad', sequence: generateBlockSequence([{ keys: ["4"], char: '4' }, { keys: ["5"], char: '5' }, { keys: ["6"], char: '6' }, { keys: ["+"], char: '+' }, { keys: ["-"], char: '-' }], 15, 15) },
            
            // Wrapping Up
            { id: 'en-adv-5', title: 'Advanced Wrap-up', sequence: generateBlockSequence([{ keys: ["A"], char: 'A' }, { keys: ["Z"], char: 'Z' }, { keys: ["1"], char: '1' }, { keys: ["0"], char: '0' }, { keys: ["{"], char: '{' }, { keys: ["}"], char: '}' }], 15, 20) },
            { id: 'en-adv-6', title: 'Advanced Assessment', sequence: [{ keys: ["T"], char: "T" }, { keys: ["h"], char: "h" }, { keys: ["e"], char: "e" }, { keys: [" "], char: " " }, { keys: ["1"], char: "1" }, { keys: ["s"], char: "s" }, { keys: ["t"], char: "t" }, { keys: [" "], char: " " }, { keys: ["r"], char: "r" }, { keys: ["u"], char: "u" }, { keys: ["l"], char: "l" }, { keys: ["e"], char: "e" }, { keys: [" "], char: " " }, { keys: ["i"], char: "i" }, { keys: ["s"], char: "s" }, { keys: [":"], char: ":" }, { keys: [" "], char: " " }, { keys: ["A"], char: "A" }, { keys: ["l"], char: "l" }, { keys: ["w"], char: "w" }, { keys: ["a"], char: "a" }, { keys: ["y"], char: "y" }, { keys: ["s"], char: "s" }, { keys: [" "], char: " " }, { keys: ["b"], char: "b" }, { keys: ["e"], char: "e" }, { keys: [" "], char: " " }, { keys: ["a"], char: "a" }, { keys: ["c"], char: "c" }, { keys: ["c"], char: "c" }, { keys: ["u"], char: "u" }, { keys: ["r"], char: "r" }, { keys: ["a"], char: "a" }, { keys: ["t"], char: "t" }, { keys: ["e"], char: "e" }, { keys: ["!"], char: "!" }] },
        ]
    }
];
