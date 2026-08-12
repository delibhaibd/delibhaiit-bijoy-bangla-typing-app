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
                    { keys: ["f"], char: 'ب' }, { keys: ["Q"], char: 'َ' }, { keys: ["j"], char: 'ت' }, { keys: ["A"], char: 'ِ' }, { keys: ["f"], char: 'ب' }, { keys: ["R"], char: 'ٌ' },
                    { keys: ["s"], char: 'س' }, { keys: ["E"], char: 'ُ' }, { keys: ["a"], char: 'ش' }, { keys: ["X"], char: 'ْ' }, { keys: ["f"], char: 'ب' }, { keys: ["W"], char: 'ً' },
                    { keys: ["h"], char: 'ا' }, { keys: ["A"], char: 'ِ' }, { keys: ["l"], char: 'م' }, { keys: ["Q"], char: 'َ' }, { keys: ["j"], char: 'ت' }, { keys: ["S"], char: 'ٍ' }
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
                    { keys: ["h"], char: 'ا' }, { keys: ["f"], char: 'ب' },
                    { keys: ["h"], char: 'ا' }, { keys: ["l"], char: 'م' },
                    { keys: ["h"], char: 'ا' }, { keys: ["o"], char: 'خ' },
                    { keys: ["d", "]"], char: 'يد' },
                    { keys: ["]", "l"], char: 'دم' },
                    { keys: ["t"], char: 'ف' }, { keys: ["l"], char: 'م' },
                    { keys: ["l"], char: 'م' }, { keys: ["k"], char: 'ن' },
                    { keys: ["u"], char: 'ع' }, { keys: ["k"], char: 'ن' }
                ], 10, 15) 
            },
            { 
                id: 'ar-words-2', 
                title: 'ধাপ ২: ৩ অক্ষরের শব্দ (3-letter words)', 
                sequence: generateBlockSequence([
                    { keys: ["h", "s", "]"], char: 'اسد' },
                    { keys: ["f"], char: 'ب' }, { keys: ["k"], char: 'ن' }, { keys: ["j"], char: 'ت' },
                    { keys: ["c", "g", "]"], char: 'ولد' },
                    { keys: ["r"], char: 'ق' }, { keys: ["g"], char: 'ل' }, { keys: ["l"], char: 'م' },
                    { keys: ["u"], char: 'ع' }, { keys: ["g"], char: 'ل' }, { keys: ["l"], char: 'م' },
                    { keys: ["u"], char: 'ع' }, { keys: ["d"], char: 'ي' }, { keys: ["k"], char: 'ن' },
                    { keys: ["f"], char: 'ب' }, { keys: ["d"], char: 'ي' }, { keys: ["j"], char: 'ت' },
                    { keys: ["a"], char: 'ش' }, { keys: ["l"], char: 'م' }, { keys: ["s"], char: 'س' }
                ], 10, 15) 
            },
            { 
                id: 'ar-words-3', 
                title: 'ধাপ ৩: ৪ অক্ষরের শব্দ (4-letter words)', 
                sequence: generateBlockSequence([
                    { keys: [";"], char: 'ك' }, { keys: ["j"], char: 'ت' }, { keys: ["h"], char: 'ا' }, { keys: ["f"], char: 'ب' },
                    { keys: ["l"], char: 'م' }, { keys: [";"], char: 'ك' }, { keys: ["j"], char: 'ت' }, { keys: ["f"], char: 'ب' },
                    { keys: ["l", "s", "[", "]"], char: 'مسجد' },
                    { keys: ["l"], char: 'م' }, { keys: ["s"], char: 'س' }, { keys: ["g"], char: 'ل' }, { keys: ["l"], char: 'م' },
                    { keys: ["m"], char: 'ر' }, { keys: ["s"], char: 'س' }, { keys: ["c"], char: 'و' }, { keys: ["g"], char: 'ل' },
                    { keys: ["u"], char: 'ع' }, { keys: ["h"], char: 'ا' }, { keys: ["g"], char: 'ل' }, { keys: ["l"], char: 'م' },
                    { keys: ["r"], char: 'ق' }, { keys: ["m"], char: 'ر' }, { keys: ["h"], char: 'ا' }, { keys: ["k"], char: 'ن' }
                ], 10, 15) 
            },
            { 
                id: 'ar-words-4', 
                title: 'ধাপ ৪: ৫ অক্ষরের শব্দ (5-letter words)', 
                sequence: generateBlockSequence([
                    { keys: ["l", "]", "m", "s", "v"], char: 'مدرسة' },
                    { keys: ["h"], char: 'ا' }, { keys: ["s"], char: 'س' }, { keys: ["j"], char: 'ت' }, { keys: ["h"], char: 'ا' }, { keys: ["`"], char: 'ذ' },
                    { keys: ["l", "i", "k", "]", "s"], char: 'مهندس' },
                    { keys: ["["], char: 'ج' }, { keys: ["h"], char: 'ا' }, { keys: ["l"], char: 'م' }, { keys: ["u"], char: 'ع' }, { keys: ["v"], char: 'ة' },
                    { keys: ["p", "]", "d", "r", "v"], char: 'حديقة' },
                    { keys: ["'"], char: 'ط' }, { keys: ["f"], char: 'ب' }, { keys: ["d"], char: 'ي' }, { keys: ["f"], char: 'ب' }, { keys: ["v"], char: 'ة' },
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
                    { keys: [";"], char: 'ك' }, { keys: ["E"], char: 'ُ' }, { keys: ["j"], char: 'ت' }, { keys: ["A"], char: 'ِ' }, { keys: ["f"], char: 'ب' }, { keys: ["Q"], char: 'َ' },
                    { keys: ["m"], char: 'ر' }, { keys: ["E"], char: 'ُ' }, { keys: ["s"], char: 'س' }, { keys: ["E"], char: 'ُ' }, { keys: ["g"], char: 'ل' }, { keys: ["R"], char: 'ٌ' },
                    { keys: ["r"], char: 'ق' }, { keys: ["Q"], char: 'َ' }, { keys: ["g"], char: 'ل' }, { keys: ["Q"], char: 'َ' }, { keys: ["l"], char: 'م' }, { keys: ["R"], char: 'ٌ' },
                    { keys: ["f"], char: 'ب' }, { keys: ["Q"], char: 'َ' }, { keys: ["d"], char: 'ي' }, { keys: ["X"], char: 'ْ' }, { keys: ["j"], char: 'ت' }, { keys: ["R"], char: 'ٌ' },
                    { keys: ["a"], char: 'ش' }, { keys: ["Q"], char: 'َ' }, { keys: ["l"], char: 'م' }, { keys: ["X"], char: 'ْ' }, { keys: ["s"], char: 'س' }, { keys: ["R"], char: 'ٌ' },
                    { keys: ["p", "Q", "l", "X", "]", "R"], char: 'حَمْدٌ' },
                    { keys: ["l"], char: 'م' }, { keys: ["E"], char: 'ُ' }, { keys: ["s"], char: 'س' }, { keys: ["X"], char: 'ْ' }, { keys: ["g"], char: 'ل' }, { keys: ["A"], char: 'ِ' }, { keys: ["l"], char: 'م' }, { keys: ["R"], char: 'ٌ' },
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
                    { keys: ["h"], char: 'ا' }, { keys: ["k"], char: 'ن' }, { keys: ["h"], char: 'ا' }, { keys: [" "], char: ' ' }, { keys: ["'"], char: 'ط' }, { keys: ["h"], char: 'ا' }, { keys: ["g"], char: 'ل' }, { keys: ["f"], char: 'ب' },
                    { keys: ["i"], char: 'ه' }, { keys: ["`"], char: 'ذ' }, { keys: ["h"], char: 'ا' }, { keys: [" "], char: ' ' }, { keys: [";"], char: 'ك' }, { keys: ["j"], char: 'ت' }, { keys: ["h"], char: 'ا' }, { keys: ["f"], char: 'ب' },
                    { keys: ["f"], char: 'ب' }, { keys: ["h"], char: 'ا' }, { keys: ["f"], char: 'ب' }, { keys: [" "], char: ' ' }, { keys: [";"], char: 'ك' }, { keys: ["f"], char: 'ب' }, { keys: ["d"], char: 'ي' }, { keys: ["m"], char: 'ر' }
                ], 5, 10) 
            },
            { 
                id: 'ar-sen-2', 
                title: 'ধাপ ২: ৩ শব্দের বাক্য (3-word sentences)', 
                sequence: generateBlockSequence([
                    { keys: ["h", "k", "h", " ", "h", "]", "m", "s", " ", "h", "g", "u", "m", "f", "d", "v"], char: 'انا ادرس العربية' },
                    { keys: ["i"], char: 'ه' }, { keys: ["`"], char: 'ذ' }, { keys: ["h"], char: 'ا' }, { keys: [" "], char: ' ' }, { keys: ["r"], char: 'ق' }, { keys: ["g"], char: 'ل' }, { keys: ["l"], char: 'م' }, { keys: [" "], char: ' ' }, { keys: ["["], char: 'ج' }, { keys: ["l"], char: 'م' }, { keys: ["d"], char: 'ي' }, { keys: ["g"], char: 'ل' }
                ], 5, 10) 
            },
            { 
                id: 'ar-sen-3', 
                title: 'ধাপ ৩: হরকত যুক্ত বাক্য (Sentences with Harakat)', 
                sequence: generateBlockSequence([
                    { keys: [";"], char: 'ك' }, { keys: ["Q"], char: 'َ' }, { keys: ["d"], char: 'ي' }, { keys: ["X"], char: 'ْ' }, { keys: ["t"], char: 'ف' }, { keys: ["Q"], char: 'َ' }, { keys: [" "], char: ' ' }, { keys: ["p"], char: 'ح' }, { keys: ["Q"], char: 'َ' }, { keys: ["h"], char: 'ا' }, { keys: ["g"], char: 'ل' }, { keys: ["E"], char: 'ُ' }, { keys: [";"], char: 'ك' }, { keys: ["Q"], char: 'َ' },
                    { keys: ["h"], char: 'ا' }, { keys: ["Q"], char: 'َ' }, { keys: ["k"], char: 'ن' }, { keys: ["Q"], char: 'َ' }, { keys: ["h"], char: 'ا' }, { keys: [" "], char: ' ' }, { keys: ["f"], char: 'ب' }, { keys: ["A"], char: 'ِ' }, { keys: ["o"], char: 'خ' }, { keys: ["Q"], char: 'َ' }, { keys: ["d"], char: 'ي' }, { keys: ["X"], char: 'ْ' }, { keys: ["m"], char: 'ر' }, { keys: ["S"], char: 'ٍ' } 
                ], 5, 10) 
            },
            { 
                id: 'ar-sen-4', 
                title: 'ধাপ ৪: ইসলামী বাক্য (Islamic Sentences)', 
                sequence: generateBlockSequence([
                    { keys: ["f"], char: 'ب' }, { keys: ["A"], char: 'ِ' }, { keys: ["s"], char: 'س' }, { keys: ["X"], char: 'ْ' }, { keys: ["l"], char: 'م' }, { keys: ["A"], char: 'ِ' }, { keys: [" "], char: ' ' }, { keys: ["h"], char: 'ا' }, { keys: ["g"], char: 'ل' }, { keys: ["g"], char: 'ل' }, { keys: ["i"], char: 'ه' }, { keys: ["A"], char: 'ِ' },
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
                    { keys: ["Y"], char: 'إ' }, { keys: ["A"], char: 'ِ' }, { keys: ["k"], char: 'ن' }, { keys: ["~"], char: 'ّ' }, { keys: ["Q"], char: 'َ' }, { keys: ["h"], char: 'ا' }, { keys: [" "], char: ' ' }, { keys: ["H"], char: 'أ' }, { keys: ["Q"], char: 'َ' }, { keys: ["u"], char: 'ع' }, { keys: ["X"], char: 'ْ' }, { keys: ["'"], char: 'ط' }, { keys: ["Q"], char: 'َ' }, { keys: ["d"], char: 'ي' }, { keys: ["X"], char: 'ْ' }, { keys: ["k"], char: 'ن' }, { keys: ["Q"], char: 'َ' }, { keys: ["h"], char: 'ا' }, { keys: [";"], char: 'ك' }, { keys: ["Q"], char: 'َ' }, { keys: [" "], char: ' ' }, { keys: ["h"], char: 'ا' }, { keys: ["g"], char: 'ل' }, { keys: ["X"], char: 'ْ' }, { keys: [";"], char: 'ك' }, { keys: ["Q"], char: 'َ' }, { keys: ["c"], char: 'و' }, { keys: ["X"], char: 'ْ' }, { keys: ["e"], char: 'ث' }, { keys: ["Q"], char: 'َ' }, { keys: ["m"], char: 'ر' }, { keys: ["Q"], char: 'َ' }, { keys: [" "], char: ' ' }, { keys: ["&"], char: '۝' },
                    { keys: ["t"], char: 'ف' }, { keys: ["Q"], char: 'َ' }, { keys: ["w"], char: 'ص' }, { keys: ["Q"], char: 'َ' }, { keys: ["g"], char: 'ل' }, { keys: ["~"], char: 'ّ' }, { keys: ["A"], char: 'ِ' }, { keys: [" "], char: ' ' }, { keys: ["g"], char: 'ل' }, { keys: ["A"], char: 'ِ' }, { keys: ["m"], char: 'ر' }, { keys: ["Q"], char: 'َ' }, { keys: ["f"], char: 'ب' }, { keys: ["~"], char: 'ّ' }, { keys: ["A"], char: 'ِ' }, { keys: [";"], char: 'ك' }, { keys: ["Q"], char: 'َ' }, { keys: [" "], char: ' ' }, { keys: ["c"], char: 'و' }, { keys: ["Q"], char: 'َ' }, { keys: ["h"], char: 'ا' }, { keys: ["k"], char: 'ن' }, { keys: ["X"], char: 'ْ' }, { keys: ["p"], char: 'ح' }, { keys: ["Q"], char: 'َ' }, { keys: ["m"], char: 'ر' }, { keys: ["X"], char: 'ْ' }, { keys: [" "], char: ' ' }, { keys: ["&"], char: '۝' },
                    { keys: ["Y"], char: 'إ' }, { keys: ["A"], char: 'ِ' }, { keys: ["k"], char: 'ن' }, { keys: ["~"], char: 'ّ' }, { keys: ["Q"], char: 'َ' }, { keys: [" "], char: ' ' }, { keys: ["a"], char: 'ش' }, { keys: ["Q"], char: 'َ' }, { keys: ["h"], char: 'ا' }, { keys: ["k"], char: 'ن' }, { keys: ["A"], char: 'ِ' }, { keys: ["/"], char: 'ئ' }, { keys: ["Q"], char: 'َ' }, { keys: [";"], char: 'ك' }, { keys: ["Q"], char: 'َ' }, { keys: [" "], char: ' ' }, { keys: ["i"], char: 'ه' }, { keys: ["E"], char: 'ُ' }, { keys: ["c"], char: 'و' }, { keys: ["Q"], char: 'َ' }, { keys: [" "], char: ' ' }, { keys: ["h"], char: 'ا' }, { keys: ["g"], char: 'ل' }, { keys: ["X"], char: 'ْ' }, { keys: ["H"], char: 'أ' }, { keys: ["Q"], char: 'َ' }, { keys: ["f"], char: 'ب' }, { keys: ["X"], char: 'ْ' }, { keys: ["j"], char: 'ت' }, { keys: ["Q"], char: 'َ' }, { keys: ["m"], char: 'ر' }, { keys: ["E"], char: 'ُ' }, { keys: [" "], char: ' ' }, { keys: ["&"], char: '۝' }
                ]
            }
        ]
    }
];
