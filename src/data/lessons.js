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
            { id: 'conj-1', title: 'ক্ক, ক্ষ, জ্ঞ, ঙ্গ', sequence: generateBlockSequence([{ keys: ['j', 'g', 'j'], bn: 'ক্ক' }, { keys: ['j', 'g', 'N'], bn: 'ক্ষ' }, { keys: ['u', 'g', 'I'], bn: 'জ্ঞ' }, { keys: ['q', 'g', 'o'], bn: 'ঙ্গ' }], 20, 20) },
            { id: 'conj-2', title: 'স্ট, শ্য, ম্প, ন্ত', sequence: generateBlockSequence([{ keys: ['n', 'g', 't'], bn: 'স্ট' }, { keys: ['M', 'g', 'w'], bn: 'শ্য' }, { keys: ['m', 'g', 'r'], bn: 'ম্প' }, { keys: ['b', 'g', 'k'], bn: 'ন্ত' }], 20, 20) }
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
