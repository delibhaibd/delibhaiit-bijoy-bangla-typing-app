import { generateBlockSequence } from '../utils/generator';

export const arabicCategories = [
    {
        id: 'arabic-basic-letters',
        title: 'বেসিক বর্ণ (Basic Letters)',
        subLessons: [
            {
                id: 'ar-letters-1',
                title: 'ধাপ ১: ا ب ت',
                sequence: generateBlockSequence([
                    { keys: ["h"], char: 'ا' }, { keys: ["f"], char: 'ب' }, { keys: ["j"], char: 'ت' }
                ], 15, 15)
            },
            {
                id: 'ar-letters-2',
                title: 'ধাপ ২: ث ج ح',
                sequence: generateBlockSequence([
                    { keys: ["e"], char: 'ث' }, { keys: ["["], char: 'ج' }, { keys: ["p"], char: 'ح' }
                ], 15, 15)
            },
            {
                id: 'ar-letters-3',
                title: 'ধাপ ৩: خ د ذ',
                sequence: generateBlockSequence([
                    { keys: ["o"], char: 'خ' }, { keys: ["]"], char: 'د' }, { keys: ["`"], char: 'ذ' }
                ], 15, 15)
            },
            {
                id: 'ar-letters-4',
                title: 'ধাপ ৪: ر ز س',
                sequence: generateBlockSequence([
                    { keys: ["m"], char: 'ر' }, { keys: ["x"], char: 'ز' }, { keys: ["s"], char: 'س' }
                ], 15, 15)
            },
            {
                id: 'ar-letters-5',
                title: 'ধাপ ৫: ش ص ض',
                sequence: generateBlockSequence([
                    { keys: ["a"], char: 'ش' }, { keys: ["w"], char: 'ص' }, { keys: ["q"], char: 'ض' }
                ], 15, 15)
            },
            {
                id: 'ar-letters-6',
                title: 'ধাপ ৬: ط ظ ع',
                sequence: generateBlockSequence([
                    { keys: ["'"], char: 'ط' }, { keys: ["z"], char: 'ظ' }, { keys: ["u"], char: 'ع' }
                ], 15, 15)
            },
            {
                id: 'ar-letters-7',
                title: 'ধাপ ৭: غ ف ق',
                sequence: generateBlockSequence([
                    { keys: ["y"], char: 'غ' }, { keys: ["t"], char: 'ف' }, { keys: ["r"], char: 'ق' }
                ], 15, 15)
            },
            {
                id: 'ar-letters-8',
                title: 'ধাপ ৮: ك ل م',
                sequence: generateBlockSequence([
                    { keys: [";"], char: 'ك' }, { keys: ["g"], char: 'ل' }, { keys: ["l"], char: 'م' }
                ], 15, 15)
            },
            {
                id: 'ar-letters-9',
                title: 'ধাপ ৯: ن ه و',
                sequence: generateBlockSequence([
                    { keys: ["k"], char: 'ن' }, { keys: ["i"], char: 'ه' }, { keys: ["c"], char: 'و' }
                ], 15, 15)
            },
            {
                id: 'ar-letters-10',
                title: 'ধাপ ১০: ي ء ة',
                sequence: generateBlockSequence([
                    { keys: ["d"], char: 'ي' }, { keys: ["."], char: 'ء' }, { keys: ["v"], char: 'ة' }
                ], 15, 15)
            },
            {
                id: 'ar-letters-11',
                title: 'ধাপ ১১ (বিশেষ বর্ণ): ى لا',
                sequence: generateBlockSequence([
                    { keys: ["b"], char: 'ى' }, { keys: ["n"], char: 'لا' }
                ], 15, 15)
            },
            {
                id: 'ar-all-letters-review',
                title: 'সব বর্ণের প্র্যাক্টিস (All Letters Review)',
                sequence: generateBlockSequence([
                    { keys: ["h"], char: 'ا' }, { keys: ["f"], char: 'ب' }, { keys: ["j"], char: 'ت' }, { keys: ["e"], char: 'ث' }, { keys: ["["], char: 'ج' }, { keys: ["p"], char: 'ح' }, { keys: ["o"], char: 'خ' },
                    { keys: ["]"], char: 'د' }, { keys: ["`"], char: 'ذ' }, { keys: ["m"], char: 'ر' }, { keys: ["x"], char: 'ز' }, { keys: ["s"], char: 'س' }, { keys: ["a"], char: 'ش' }, { keys: ["w"], char: 'ص' },
                    { keys: ["q"], char: 'ض' }, { keys: ["'"], char: 'ط' }, { keys: ["z"], char: 'ظ' }, { keys: ["u"], char: 'ع' }, { keys: ["y"], char: 'غ' }, { keys: ["t"], char: 'ف' }, { keys: ["r"], char: 'ق' },
                    { keys: [";"], char: 'ك' }, { keys: ["g"], char: 'ل' }, { keys: ["l"], char: 'م' }, { keys: ["k"], char: 'ن' }, { keys: ["i"], char: 'ه' }, { keys: ["c"], char: 'و' }, { keys: ["d"], char: 'ي' },
                    { keys: ["."], char: 'ء' }, { keys: ["v"], char: 'ة' }, { keys: ["b"], char: 'ى' }, { keys: ["n"], char: 'لا' }
                ], 0, 40)
            }
        ]
    },
    {
        id: 'arabic-harakat',
        title: 'হরকত ও তাশদীদ (Harakat & Symbols)',
        subLessons: [
            { 
                id: 'ar-harakat-basic', 
                title: 'যবর, যের, পেশ (Fatha, Kasra, Damma)', 
                sequence: generateBlockSequence([
                    { keys: ["Q"], char: 'َ' }, // Shift+Q = Fatha
                    { keys: ["A"], char: 'ِ' }, // Shift+A = Kasra
                    { keys: ["E"], char: 'ُ' }  // Shift+E = Damma
                ], 20, 20) 
            },
            { 
                id: 'ar-harakat-tanween', 
                title: 'দুই যবর, দুই যের, দুই পেশ', 
                sequence: generateBlockSequence([
                    { keys: ["W"], char: 'ً' }, // Shift+W = Fathatan
                    { keys: ["S"], char: 'ٍ' }, // Shift+S = Kasratan
                    { keys: ["R"], char: 'ٌ' }  // Shift+R = Dammatan
                ], 20, 20) 
            },
            { 
                id: 'ar-harakat-shadda-sukun', 
                title: 'সুকুন ও তাশদীদ (Sukun & Shadda)', 
                sequence: generateBlockSequence([
                    { keys: ["X"], char: 'ْ' }, // Shift+X = Sukun
                    { keys: ["~"], char: 'ّ' }  // Shift+` = Shadda
                ], 20, 20) 
            },
            {
                id: 'ar-harakat-practice',
                title: 'শব্দের সাথে হরকত (Words with Harakat)',
                sequence: generateBlockSequence([
                    { keys: ["f", "Q", "j", "A", "f", "R"], char: 'بَتِبٌ' },
                    { keys: ["s", "E", "a", "X", "f", "W"], char: 'سُشْبً' },
                    { keys: ["h", "A", "l", "Q", "j", "S"], char: 'اِمَتٍ' }
                ], 10, 15)
            }
        ]
    },
    {
        id: 'arabic-words',
        title: 'শব্দ প্র্যাক্টিস (Word Practice)',
        subLessons: [
            { 
                id: 'ar-words-1', 
                title: 'ধাপ ১: ২ অক্ষরের শব্দ (2-letter words)', 
                sequence: generateBlockSequence([
                    { keys: ["h", "f"], char: 'اب' },
                    { keys: ["h", "l"], char: 'ام' },
                    { keys: ["h", "o"], char: 'اخ' },
                    { keys: ["d", "]"], char: 'يد' },
                    { keys: ["]", "l"], char: 'دم' },
                    { keys: ["t", "l"], char: 'فم' },
                    { keys: ["l", "k"], char: 'من' },
                    { keys: ["u", "k"], char: 'عن' }
                ], 10, 15) 
            },
            { 
                id: 'ar-words-2', 
                title: 'ধাপ ২: ৩ অক্ষরের শব্দ (3-letter words)', 
                sequence: generateBlockSequence([
                    { keys: ["h", "s", "]"], char: 'اسد' },
                    { keys: ["f", "k", "j"], char: 'بنت' },
                    { keys: ["c", "g", "]"], char: 'ولد' },
                    { keys: ["r", "g", "l"], char: 'قلم' },
                    { keys: ["u", "g", "l"], char: 'علم' },
                    { keys: ["u", "d", "k"], char: 'عين' },
                    { keys: ["f", "d", "j"], char: 'بيت' },
                    { keys: ["a", "l", "s"], char: 'شمس' }
                ], 10, 15) 
            },
            { 
                id: 'ar-words-3', 
                title: 'ধাপ ৩: ৪ অক্ষরের শব্দ (4-letter words)', 
                sequence: generateBlockSequence([
                    { keys: [";", "j", "h", "f"], char: 'كتاب' },
                    { keys: ["l", ";", "j", "f"], char: 'مكتب' },
                    { keys: ["l", "s", "[", "]"], char: 'مسجد' },
                    { keys: ["l", "s", "g", "l"], char: 'مسلم' },
                    { keys: ["m", "s", "c", "g"], char: 'رسول' },
                    { keys: ["u", "h", "g", "l"], char: 'عالم' },
                    { keys: ["r", "m", "h", "k"], char: 'قران' }
                ], 10, 15) 
            },
            { 
                id: 'ar-words-4', 
                title: 'ধাপ ৪: ৫ অক্ষরের শব্দ (5-letter words)', 
                sequence: generateBlockSequence([
                    { keys: ["l", "]", "m", "s", "v"], char: 'مدرسة' },
                    { keys: ["h", "s", "j", "h", "`"], char: 'استاذ' },
                    { keys: ["l", "i", "k", "]", "s"], char: 'مهندس' },
                    { keys: ["[", "h", "l", "u", "v"], char: 'جامعة' },
                    { keys: ["p", "]", "d", "r", "v"], char: 'حديقة' },
                    { keys: ["'", "f", "d", "f", "v"], char: 'طبيبة' },
                    { keys: ["w", "]", "d", "r", "v"], char: 'صديقة' }
                ], 10, 15) 
            },
            { 
                id: 'ar-words-5', 
                title: 'ধাপ ৫: লাম-আলিফ (لا) যুক্ত শব্দ', 
                sequence: generateBlockSequence([
                    { keys: ["s", "n", "l"], char: 'سلام' },
                    { keys: ["h", "s", "n", "l"], char: 'اسلام' },
                    { keys: ["w", "n", "v"], char: 'صلاة' },
                    { keys: ["h", "c", "n", "]"], char: 'اولاد' },
                    { keys: [";", "n", "l"], char: 'كلام' },
                    { keys: ["i", "n", "g"], char: 'هلال' }
                ], 10, 15) 
            },
            { 
                id: 'ar-words-6', 
                title: 'ধাপ ৬: হরকত যুক্ত শব্দ (Words with Harakat)', 
                sequence: generateBlockSequence([
                    { keys: [";", "E", "j", "A", "f", "Q"], char: 'كُتِبَ' },
                    { keys: ["m", "E", "s", "E", "g", "R"], char: 'رُسُلٌ' },
                    { keys: ["r", "Q", "g", "Q", "l", "R"], char: 'قَلَمٌ' },
                    { keys: ["f", "Q", "d", "X", "j", "R"], char: 'بَيْتٌ' },
                    { keys: ["a", "Q", "l", "X", "s", "R"], char: 'شَمْسٌ' },
                    { keys: ["p", "Q", "l", "X", "]", "R"], char: 'حَمْدٌ' },
                    { keys: ["l", "E", "s", "X", "g", "A", "l", "R"], char: 'مُسْلِمٌ' },
                    { keys: ["l", "Q", "s", "X", "[", "A", "]", "R"], char: 'مَسْجِدٌ' }
                ], 5, 10) 
            }
        ]
    },
    {
        id: 'arabic-sentences',
        title: 'বাক্য প্র্যাক্টিস (Sentence Practice)',
        subLessons: [
            { 
                id: 'ar-sen-1', 
                title: 'ধাপ ১: ২ শব্দের বাক্য (2-word sentences)', 
                sequence: generateBlockSequence([
                    { keys: ["h", "k", "h"], char: 'انا' },
                    { keys: [" "], char: ' ' },
                    { keys: ["'", "h", "g", "f"], char: 'طالب' },
                    { keys: ["i", "`", "h"], char: 'هذا' },
                    { keys: [" "], char: ' ' },
                    { keys: [";", "j", "h", "f"], char: 'كتاب' },
                    { keys: ["f", "h", "f"], char: 'باب' },
                    { keys: [" "], char: ' ' },
                    { keys: [";", "f", "d", "m"], char: 'كبير' }
                ], 5, 10) 
            },
            { 
                id: 'ar-sen-2', 
                title: 'ধাপ ২: ৩ শব্দের বাক্য (3-word sentences)', 
                sequence: generateBlockSequence([
                    { keys: ["h", "k", "h", " ", "h", "]", "m", "s", " ", "h", "g", "u", "m", "f", "d", "v"], char: 'انا ادرس العربية' },
                    { keys: ["i", "`", "h"], char: 'هذا' },
                    { keys: [" "], char: ' ' },
                    { keys: ["r", "g", "l"], char: 'قلم' },
                    { keys: [" "], char: ' ' },
                    { keys: ["[", "l", "d", "g"], char: 'جميل' }
                ], 5, 10) 
            },
            { 
                id: 'ar-sen-3', 
                title: 'ধাপ ৩: হরকত যুক্ত বাক্য (Sentences with Harakat)', 
                sequence: generateBlockSequence([
                    { keys: [";", "Q", "d", "X", "t", "Q"], char: 'كَيْفَ' },
                    { keys: [" "], char: ' ' },
                    { keys: ["p", "Q", "h", "g", "E", ";", "Q"], char: 'حَالُكَ' },
                    { keys: ["h", "Q", "k", "Q", "h"], char: 'اَنَا' },
                    { keys: [" "], char: ' ' },
                    { keys: ["f", "A", "o", "Q", "d", "X", "m", "S"], char: 'بِخَيْرٍ' } 
                ], 5, 10) 
            },
            { 
                id: 'ar-sen-4', 
                title: 'ধাপ ৪: ইসলামী বাক্য (Islamic Sentences)', 
                sequence: generateBlockSequence([
                    { keys: ["f", "A", "s", "X", "l", "A"], char: 'بِسْمِ' },
                    { keys: [" "], char: ' ' },
                    { keys: ["h", "g", "g", "i", "A"], char: 'اللهِ' },
                    { keys: ["h", "Q", "g", "X", "p", "Q", "l", "X", "]", "E", " ", "g", "A", "g", "g", "i", "A"], char: 'اَلْحَمْدُ للهِ' }
                ], 5, 10) 
            }
        ]
    },
    {
        id: 'arabic-symbols',
        title: 'বিশেষ চিহ্ন ও শর্টকাট (Symbols & Shortcuts)',
        subLessons: [
            { 
                id: 'ar-sym-1', 
                title: 'ধাপ ১: গুরুত্বপূর্ণ ইসলামী শর্টকাট', 
                sequence: generateBlockSequence([
                    { keys: ["!"], char: 'ﷲ' },
                    { keys: ["@"], char: '﷽' },
                    { keys: ["#"], char: 'ﷺ' },
                    { keys: ["$"], char: 'ﷻ' }
                ], 10, 15) 
            },
            { 
                id: 'ar-sym-2', 
                title: 'ধাপ ২: কোরআনের বিশেষ চিহ্ন (রুকু, সিজদাহ)', 
                sequence: generateBlockSequence([
                    { keys: ["%"], char: '۞' },
                    { keys: ["^"], char: '۩' },
                    { keys: ["&"], char: '۝' }
                ], 10, 15) 
            },
            { 
                id: 'ar-sym-3', 
                title: 'ধাপ ৩: ওয়াক্বফ (থামার চিহ্ন)', 
                sequence: generateBlockSequence([
                    { keys: ["*"], char: 'ۘ' },
                    { keys: ["("], char: 'ۚ' },
                    { keys: [")"], char: 'ۖ' },
                    { keys: ["_"], char: 'ۗ' },
                    { keys: ["+"], char: 'ۛ' }
                ], 10, 15) 
            }
        ]
    },
    {
        id: 'arabic-surahs',
        title: 'কোরআনের সূরা (Quranic Surahs)',
        subLessons: [
            { 
                id: 'ar-surah-ikhlas', 
                title: 'সূরা ইখলাস (Surah Al-Ikhlas)', 
                sequence: [
                    { keys: ["r", "E", "g", "X", " ", "i", "E", "c", "Q", " ", "h", "g", "g", "~", "Q", "i", "E", " ", "H", "Q", "p", "Q", "]", "R", " ", "&"], char: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۝' },
                    { keys: ["h", "g", "g", "~", "Q", "i", "E", " ", "h", "g", "w", "~", "Q", "l", "Q", "]", "E", " ", "&"], char: 'اللَّهُ الصَّمَدُ ۝' },
                    { keys: ["g", "Q", "l", "X", " ", "d", "Q", "g", "A", "]", "X", " ", "c", "Q", "g", "Q", "l", "X", " ", "d", "E", "c", "g", "Q", "]", "X", " ", "&"], char: 'لَمْ يَلِدْ وَلَمْ يُولَدْ ۝' },
                    { keys: ["c", "Q", "g", "Q", "l", "X", " ", "d", "Q", ";", "E", "k", "X", " ", "g", "~", "Q", "i", "E", " ", ";", "E", "t", "E", "c", "W", "h", " ", "H", "Q", "p", "Q", "]", "R", " ", "&"], char: 'وَلَمْ يَكُنْ لَّهُ كُفُوًا أَحَدٌ ۝' }
                ]
            },
            { 
                id: 'ar-surah-kawthar', 
                title: 'সূরা আল-কাওসার (Surah Al-Kawthar)', 
                sequence: [
                    { keys: ["Y", "A", "k", "~", "Q", "h"], char: 'إِنَّا' },
                    { keys: [" "], char: ' ' },
                    { keys: ["H", "Q", "u", "X", "'", "Q", "d", "X", "k", "Q", "h", ";", "Q"], char: 'أَعْطَيْنَاكَ' },
                    { keys: [" "], char: ' ' },
                    { keys: ["h", "g", "X", ";", "Q", "c", "X", "e", "Q", "m", "Q"], char: 'الْكَوْثَرَ' },
                    { keys: [" "], char: ' ' },
                    { keys: ["&"], char: '۝' },
                    { keys: ["t", "Q", "w", "Q", "g", "~", "A"], char: 'فَصَلِّ' },
                    { keys: [" "], char: ' ' },
                    { keys: ["g", "A", "m", "Q", "f", "~", "A", ";", "Q"], char: 'لِرَبِّكَ' },
                    { keys: [" "], char: ' ' },
                    { keys: ["c", "Q", "h", "k", "X", "p", "Q", "m", "X"], char: 'وَانْحَرْ' },
                    { keys: [" "], char: ' ' },
                    { keys: ["&"], char: '۝' },
                    { keys: ["Y", "A", "k", "~", "Q"], char: 'إِنَّ' },
                    { keys: [" "], char: ' ' },
                    { keys: ["a", "Q", "h", "k", "A", "/", "Q", ";", "Q"], char: 'شَانِئَكَ' },
                    { keys: [" "], char: ' ' },
                    { keys: ["i", "E", "c", "Q"], char: 'هُوَ' },
                    { keys: [" "], char: ' ' },
                    { keys: ["h", "g", "X", "H", "Q", "f", "X", "j", "Q", "m", "E"], char: 'الْأَبْتَرُ' },
                    { keys: [" "], char: ' ' },
                    { keys: ["&"], char: '۝' }
                ]
            }
        ]
    }
];
