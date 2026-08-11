import { generateBlockSequence } from '../utils/generator';

export const categories = [
    {
        id: 'consonants',
        title: 'ব্যাঞ্জন বর্ণ',
        subLessons: [
            { id: 'k-borgo', title: 'ক, খ, গ, ঘ, ঙ', sequence: generateBlockSequence([{key:'j',bn:'ক'}, {key:'J',bn:'খ'}, {key:'o',bn:'গ'}, {key:'O',bn:'ঘ'}, {key:'q',bn:'ঙ'}], 20, 20) },
            { id: 'ch-borgo', title: 'চ, ছ, জ, ঝ, ঞ', sequence: generateBlockSequence([{key:'y',bn:'চ'}, {key:'Y',bn:'ছ'}, {key:'u',bn:'জ'}, {key:'U',bn:'ঝ'}, {key:'I',bn:'ঞ'}], 20, 20) },
            { id: 't-borgo', title: 'ট, ঠ, ড, ঢ, ণ', sequence: generateBlockSequence([{key:'t',bn:'ট'}, {key:'T',bn:'ঠ'}, {key:'e',bn:'ড'}, {key:'E',bn:'ঢ'}, {key:'B',bn:'ণ'}], 20, 20) },
            { id: 'to-borgo', title: 'ত, থ, দ, ধ, ন', sequence: generateBlockSequence([{key:'k',bn:'ত'}, {key:'K',bn:'থ'}, {key:'l',bn:'দ'}, {key:'L',bn:'ধ'}, {key:'b',bn:'ন'}], 20, 20) },
            { id: 'po-borgo', title: 'প, ফ, ব, ভ, ম', sequence: generateBlockSequence([{key:'r',bn:'প'}, {key:'R',bn:'ফ'}, {key:'h',bn:'ব'}, {key:'H',bn:'ভ'}, {key:'m',bn:'ম'}], 20, 20) },
            { id: 'jo-borgo', title: 'য, র, ল, শ, ষ', sequence: generateBlockSequence([{key:'w',bn:'য'}, {key:'v',bn:'র'}, {key:'V',bn:'ল'}, {key:'M',bn:'শ'}, {key:'N',bn:'ষ'}], 20, 20) },
            { id: 'so-borgo', title: 'স, হ, ড়, ঢ়, য়', sequence: generateBlockSequence([{key:'n',bn:'স'}, {key:'i',bn:'হ'}, {key:'p',bn:'ড়'}, {key:'P',bn:'ঢ়'}, {key:'W',bn:'য়'}], 20, 20) },
            { id: 'special', title: 'ৎ, ং, ঃ, ঁ, ্‌, ।', sequence: generateBlockSequence([{key:'\\',bn:'ৎ'}, {key:'Q',bn:'ং'}, {key:'|',bn:'ঃ'}, {key:'&',bn:'ঁ'}, {key:'g',bn:'্'}, {key:'G',bn:'।'}], 20, 20) },
            { id: 'all-consonants', title: 'ক থেকে ঁ পর্যন্ত', sequence: generateBlockSequence([{key:'j',bn:'ক'}, {key:'J',bn:'খ'}, {key:'o',bn:'গ'}, {key:'O',bn:'ঘ'}, {key:'q',bn:'ঙ'}, {key:'y',bn:'চ'}, {key:'Y',bn:'ছ'}, {key:'u',bn:'জ'}, {key:'U',bn:'ঝ'}, {key:'I',bn:'ঞ'}, {key:'t',bn:'ট'}, {key:'T',bn:'ঠ'}, {key:'e',bn:'ড'}, {key:'E',bn:'ঢ'}, {key:'B',bn:'ণ'}, {key:'k',bn:'ত'}, {key:'K',bn:'থ'}, {key:'l',bn:'দ'}, {key:'L',bn:'ধ'}, {key:'b',bn:'ন'}, {key:'r',bn:'প'}, {key:'R',bn:'ফ'}, {key:'h',bn:'ব'}, {key:'H',bn:'ভ'}, {key:'m',bn:'ম'}, {key:'w',bn:'য'}, {key:'v',bn:'র'}, {key:'V',bn:'ল'}, {key:'M',bn:'শ'}, {key:'N',bn:'ষ'}, {key:'n',bn:'স'}, {key:'i',bn:'হ'}, {key:'p',bn:'ড়'}, {key:'P',bn:'ঢ়'}, {key:'W',bn:'য়'}, {key:'\\',bn:'ৎ'}, {key:'Q',bn:'ং'}, {key:'|',bn:'ঃ'}, {key:'&',bn:'ঁ'}], 0, 20) }
        ]
    },
    {
        id: 'vowels',
        title: 'স্বরবর্ণ',
        subLessons: [
            { id: 'vowels-1', title: 'অ, আ, ই, ঈ', sequence: generateBlockSequence([{ key: 'F', bn: 'অ' }, { keys: ['g', 'f'], bn: 'আ' }, { keys: ['g', 'd'], bn: 'ই' }, { keys: ['g', 'D'], bn: 'ঈ' }], 20, 20) },
            { id: 'vowels-2', title: 'উ, ঊ, ঋ', sequence: generateBlockSequence([{ keys: ['g', 's'], bn: 'উ' }, { keys: ['g', 'S'], bn: 'ঊ' }, { keys: ['g', 'a'], bn: 'ঋ' }], 20, 20) },
            { id: 'vowels-3', title: 'এ, ঐ, ও, ঔ', sequence: generateBlockSequence([{ keys: ['g', 'c'], bn: 'এ' }, { keys: ['g', 'C'], bn: 'ঐ' }, { key: 'x', bn: 'ও' }, { keys: ['g', 'X'], bn: 'ঔ' }], 20, 20) }
        ]
    },
    {
        id: 'modifiers',
        title: 'কার চিহ্ন',
        subLessons: [
            { id: 'mod-1', title: 'া, ি, ী', sequence: generateBlockSequence([{ key: 'f', bn: 'া' }, { key: 'd', bn: 'ি' }, { key: 'D', bn: 'ী' }], 20, 20) },
            { id: 'mod-2', title: 'ু, ূ, ৃ', sequence: generateBlockSequence([{ key: 's', bn: 'ু' }, { key: 'S', bn: 'ূ' }, { key: 'a', bn: 'ৃ' }], 20, 20) },
            { id: 'mod-3', title: 'ে, ৈ, ৗ', sequence: generateBlockSequence([{ key: 'c', bn: 'ে' }, { key: 'C', bn: 'ৈ' }, { key: 'X', bn: 'ৗ' }], 20, 20) }
        ]
    },
    {
        id: 'conjuncts',
        title: 'যুক্ত বর্ণ',
        subLessons: [
            { id: 'conj-1', title: 'ক্ক, ক্ট, ক্র, ক্ষ, গ্ধ', sequence: generateBlockSequence([{ keys: ['j', 'g', 'j'], bn: 'ক্ক' }, { keys: ['j', 'g', 't'], bn: 'ক্ট' }, { keys: ['j', 'g', 'k'], bn: 'ক্ত' }, { keys: ['j', 'z'], bn: 'ক্র' }, { keys: ['j', 'g', 'h'], bn: 'ক্ব' }, { keys: ['j', 'g', 'm'], bn: 'ক্ম' }, { keys: ['j', 'Z'], bn: 'ক্য' }, { keys: ['j', 'g', 'V'], bn: 'ক্ল' }, { keys: ['j', 'g', 'N'], bn: 'ক্ষ' }, { keys: ['j', 'g', 'N', 'g', 'm'], bn: 'ক্ষ্ম' }, { keys: ['j', 'g', 'n'], bn: 'ক্স' }, { keys: ['o', 'g', 'L'], bn: 'গ্ধ' }, { keys: ['o', 'g', 'h'], bn: 'গ্ব' }, { keys: ['o', 'g', 'm'], bn: 'গ্ম' }, { keys: ['o', 'Z'], bn: 'গ্য' }, { keys: ['o', 'g', 'V'], bn: 'গ্ল' }, { keys: ['O', 'g', 'b'], bn: 'ঘ্ন' }], 0, 20) },
            { id: 'conj-2', title: 'ঙ্ক, ঙ্গ, চ্চ, জ্ঞ, ঞ্জ', sequence: generateBlockSequence([{ keys: ['q', 'g', 'j'], bn: 'ঙ্ক' }, { keys: ['q', 'g', 'J'], bn: 'ঙ্খ' }, { keys: ['q', 'g', 'o'], bn: 'ঙ্গ' }, { keys: ['q', 'g', 'O'], bn: 'ঙ্ঘ' }, { keys: ['y', 'g', 'y'], bn: 'চ্চ' }, { keys: ['y', 'g', 'Y'], bn: 'চ্ছ' }, { keys: ['y', 'g', 'Y', 'g', 'h'], bn: 'চ্ছ্ব' }, { keys: ['u', 'g', 'u', 'g', 'h'], bn: 'জ্জ্ব' }, { keys: ['u', 'g', 'I'], bn: 'জ্ঞ' }, { keys: ['u', 'g', 'h'], bn: 'জ্ব' }, { keys: ['u', 'Z'], bn: 'জ্য' }, { keys: ['u', 'z'], bn: 'জ্র' }, { keys: ['I', 'g', 'y'], bn: 'ঞ্চ' }, { keys: ['I', 'g', 'Y'], bn: 'ঞ্ছ' }, { keys: ['I', 'g', 'u'], bn: 'ঞ্জ' }, { keys: ['I', 'g', 'U'], bn: 'ঞ্ঝ' }], 0, 20) },
            { id: 'conj-3', title: 'ট্ট, ত্ত, ত্র, দ্ধ, দ্ব', sequence: generateBlockSequence([{ keys: ['t', 'g', 't'], bn: 'ট্ট' }, { keys: ['t', 'g', 'h'], bn: 'ট্ব' }, { keys: ['k', 'g', 'k'], bn: 'ত্ত' }, { keys: ['k', 'g', 'k', 'g', 'h'], bn: 'ত্ত্ব' }, { keys: ['k', 'g', 'K'], bn: 'ত্থ' }, { keys: ['k', 'g', 'm'], bn: 'ত্ম' }, { keys: ['k', 'z'], bn: 'ত্র' }, { keys: ['l', 'g', 'l'], bn: 'দ্দ' }, { keys: ['l', 'g', 'L'], bn: 'দ্ধ' }, { keys: ['l', 'g', 'h'], bn: 'দ্ব' }, { keys: ['l', 'g', 'H'], bn: 'দ্ভ' }, { keys: ['L', 'g', 'h'], bn: 'ধ্ব' }, { keys: ['l', 'z'], bn: 'দ্র' }], 0, 20) },
            { id: 'conj-4', title: 'ন্ট, ন্ধ, প্ত, ম্ব, ল্ক', sequence: generateBlockSequence([{ keys: ['b', 'g', 't'], bn: 'ন্ট' }, { keys: ['b', 'g', 'T'], bn: 'ন্ঠ' }, { keys: ['b', 'g', 'e', 'z'], bn: 'ন্ড্র' }, { keys: ['b', 'g', 'K'], bn: 'ন্থ' }, { keys: ['b', 'g', 'l', 'g', 'h'], bn: 'ন্দ্ব' }, { keys: ['b', 'g', 'L'], bn: 'ন্ধ' }, { keys: ['b', 'g', 'h'], bn: 'ন্ব' }, { keys: ['b', 'g', 'm'], bn: 'ন্ম' }, { keys: ['r', 'g', 'k'], bn: 'প্ত' }, { keys: ['r', 'g', 'n'], bn: 'প্স' }, { keys: ['h', 'g', 'u'], bn: 'ব্জ' }, { keys: ['h', 'g', 'L'], bn: 'ব্ধ' }, { keys: ['m', 'g', 'R'], bn: 'ম্ফ' }, { keys: ['m', 'g', 'h'], bn: 'ম্ব' }, { keys: ['m', 'g', 'H'], bn: 'ম্ভ' }, { keys: ['m', 'g', 'H', 'z'], bn: 'ম্ভ্র' }, { keys: ['m', 'g', 'm'], bn: 'ম্ম' }, { keys: ['m', 'Z'], bn: 'ম্য' }, { keys: ['V', 'g', 'j'], bn: 'ল্ক' }, { keys: ['V', 'g', 'o'], bn: 'ল্গ' }, { keys: ['V', 'g', 't'], bn: 'ল্ট' }, { keys: ['V', 'g', 'e'], bn: 'ল্ড' }, { keys: ['V', 'g', 'R'], bn: 'ল্ফ' }], 0, 20) },
            { id: 'conj-5', title: 'শ্ব, শ্চ, ষ্ক, স্ক, স্ত্ব', sequence: generateBlockSequence([{ keys: ['M', 'g', 'h'], bn: 'শ্ব' }, { keys: ['M', 'g', 'm'], bn: 'শ্ম' }, { keys: ['M', 'g', 'y'], bn: 'শ্চ' }, { keys: ['M', 'g', 'Y'], bn: 'শ্ছ' }, { keys: ['M', 'g', 'b'], bn: 'শ্ন' }, { keys: ['M', 'Z'], bn: 'শ্য' }, { keys: ['N', 'g', 'j'], bn: 'ষ্ক' }, { keys: ['N', 'g', 'j', 'z'], bn: 'ষ্ক্র' }, { keys: ['N', 'g', 't'], bn: 'ষ্ট' }, { keys: ['N', 'g', 't', 'z'], bn: 'ষ্ট্র' }, { keys: ['N', 'g', 'T'], bn: 'ষ্ঠ' }, { keys: ['N', 'g', 'B'], bn: 'ষ্ণ' }, { keys: ['N', 'g', 'r'], bn: 'ষ্প' }, { keys: ['N', 'g', 'R'], bn: 'ষ্ফ' }, { keys: ['N', 'g', 'h'], bn: 'ষ্ব' }, { keys: ['N', 'g', 'm'], bn: 'ষ্ম' }, { keys: ['n', 'g', 'j'], bn: 'স্ক' }, { keys: ['n', 'g', 'j', 'z'], bn: 'স্ক্র' }, { keys: ['n', 'g', 'J'], bn: 'স্খ' }, { keys: ['n', 'g', 'k', 'g', 'h'], bn: 'স্ত্ব' }, { keys: ['n', 'g', 'k', 'z'], bn: 'স্ত্র' }, { keys: ['n', 'g', 'K'], bn: 'স্থ' }, { keys: ['n', 'g', 'R'], bn: 'স্ফ' }, { keys: ['i', 'g', 'b'], bn: 'হ্ন' }, { keys: ['i', 'g', 'm'], bn: 'হ্ম' }, { keys: ['i', 'Z'], bn: 'হ্য' }, { keys: ['i', 'z'], bn: 'হ্র' }], 0, 20) }
        ]
    },
    {
        id: 'practice',
        title: 'অনুশীলন কাজ',
        subLessons: [
            { id: 'prac-1', title: 'আমি, আমার, নাম', sequence: generateBlockSequence([{ keys: ['g', 'f', 'm', 'd'], bn: 'আমি' }, { keys: ['g', 'f', 'm', 'f', 'v'], bn: 'আমার' }, { keys: ['b', 'f', 'm'], bn: 'নাম' }], 15, 15) },
            { id: 'prac-2', title: 'কাজ, নিয়ম, কেন', sequence: generateBlockSequence([{ keys: ['j', 'f', 'u'], bn: 'কাজ' }, { keys: ['d', 'b', 'w', 'm'], bn: 'নিয়ম' }, { keys: ['c', 'j', 'b'], bn: 'কেন' }], 15, 15) },
            { id: 'prac-3', title: 'দেশ, বাংলা, রূঢ়া', sequence: generateBlockSequence([{ keys: ['c', 'l', 'M'], bn: 'দেশ' }, { keys: ['h', 'f', 'Q', 'V', 'f'], bn: 'বাংলা' }, { keys: ['c', 'v', 'S', 'P', 'f'], bn: 'রূঢ়া' }], 15, 15) }
        ]
    }
];
