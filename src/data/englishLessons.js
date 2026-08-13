import { generateBlockSequence } from '../utils/generator';

export const englishCategories = [
    {
        id: 'en-beginner',
        title: 'Beginner (বিগিনার)',
        subLessons: [
            // Getting Started
            { 
                id: 'en-beg-1', 
                title: 'J, F, and Space', 
                screens: [
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
                ],
                get sequence() { return this.screens.map(s => s.text).join('').split('').map(c => ({ keys: [c], char: c })); }
            },
            { 
                id: 'en-beg-2', 
                title: 'U, R, and K Keys', 
                screens: [
                    { title: "u Practice", text: "uuuuuuuu" },
                    { title: "r Practice", text: "rrrrrrrr" },
                    { title: "k Practice", text: "kkkkkkkk" },
                    { title: "u & r Combo", text: "uuuu rrrr uuuu rrrr" },
                    { title: "k & Home Keys Combo", text: "kkkk jjjj kkkk ffff" },
                    { title: "Key Switching", text: "ur ur ur ur uk uk uk uk" },
                    { title: "Short Patterns", text: "ruk ruk fur fur jur jur" },
                    { title: "Mixed Combo 1", text: "fur ruk kur jur fur ruk" },
                    { title: "Mixed Combo 2", text: "ruf kur fur jur ruk ruf" },
                    { title: "Speed & Accuracy Drill", text: "u r k ur rk uk fur ruk kur" },
                    { title: "Final Review", text: "u r k ur rk uk fur ruk jur" }
                ],
                get sequence() { return this.screens.map(s => s.text).join('').split('').map(c => ({ keys: [c], char: c })); }
            },
            { 
                id: 'en-beg-3', 
                title: 'D, E, and I Keys', 
                screens: [
                    { title: "d Practice", text: "dddddddd" },
                    { title: "e Practice", text: "eeeeeeee" },
                    { title: "i Practice", text: "iiiiiiii" },
                    { title: "d & e Combo", text: "dddd eeee dddd eeee" },
                    { title: "i & Home Keys Combo", text: "iiii jjjj iiii kkkk" },
                    { title: "Key Switching", text: "de de de de di di di di" },
                    { title: "Short Patterns", text: "red red die die eid eid" },
                    { title: "Mixed Combo 1", text: "fed red die rid fed red", isSentence: true },
                    { title: "Mixed Combo 2", text: "ide rid ed die ide rid", isSentence: true },
                    { title: "Speed & Accuracy Drill", text: "d e i de ed di id red die" },
                    { title: "Final Review", text: "d e i de ed di id red die rid" }
                ],
                get sequence() { return this.screens.map(s => s.text).join('').split('').map(c => ({ keys: [c], char: c })); }
            },
            { 
                id: 'en-beg-4', 
                title: 'C, G, and N Keys', 
                screens: [
                    { title: "c Practice", text: "cccccccc" },
                    { title: "g Practice", text: "gggggggg" },
                    { title: "n Practice", text: "nnnnnnnn" },
                    { title: "c & g Combo", text: "cccc gggg cccc gggg" },
                    { title: "n & Home Keys Combo", text: "nnnn jjjj nnnn ffff" },
                    { title: "Key Switching", text: "cg cg cg cg cn cn cn cn" },
                    { title: "Short Patterns", text: "can can gin gin ice ice" },
                    { title: "Mixed Combo 1", text: "can gin ice nag can gin", isSentence: true },
                    { title: "Mixed Combo 2", text: "cog run pen fin cog run", isSentence: true },
                    { title: "Speed & Accuracy Drill", text: "c g n cg gn cn can gin ice" },
                    { title: "Final Review", text: "c g n cg gn cn can gin ice nag" }
                ],
                get sequence() { return this.screens.map(s => s.text).join('').split('').map(c => ({ keys: [c], char: c })); }
            },
            { 
                id: 'en-beg-5', 
                title: 'Beginner Review 1', 
                screens: [
                    { title: "Warm-up Drill", text: "j f u r k d e i c g n" },
                    { title: "Home Row & Top Row Mix", text: "fud ruk kid red den cur" },
                    { title: "Key Combinations", text: "fed run ice fun rug kid" },
                    { title: "Word Practice 1", text: "run fun red den rug cur", isSentence: true },
                    { title: "Word Practice 2", text: "ice kid fin pen engine", isSentence: true },
                    { title: "Short Sentences 1", text: "red rug fun run", isSentence: true },
                    { title: "Short Sentences 2", text: "fed the kid in red", isSentence: true },
                    { title: "Mixed Review Drill", text: "c g n d e i u r k j f" },
                    { title: "Speed Building", text: "ice fin pen engine run fun", isSentence: true },
                    { title: "Accuracy Challenge", text: "fed the kid in red run fun", isSentence: true },
                    { title: "Final Mastery Test", text: "red rug fun run fed the kid in red ice fin pen engine", isSentence: true }
                ],
                get sequence() { return this.screens.map(s => s.text).join('').split('').map(c => ({ keys: [c], char: c })); }
            },
            
            // Reaching Out
            { 
                id: 'en-beg-6', 
                title: 'T, S, and L Keys', 
                screens: [
                    { title: "t Practice", text: "tttttttt" },
                    { title: "s Practice", text: "ssssssss" },
                    { title: "l Practice", text: "llllllll" },
                    { title: "t & s Combo", text: "tttt ssss tttt ssss" },
                    { title: "l & Home Keys Combo", text: "llll jjjj llll kkkk" },
                    { title: "Key Switching", text: "ts ts ts ts tl tl tl tl" },
                    { title: "Short Patterns", text: "sit sit let let lit lit", isSentence: true },
                    { title: "Mixed Combo 1", text: "sit let lit stil sit let", isSentence: true },
                    { title: "Mixed Combo 2", text: "list salt tell sill list salt", isSentence: true },
                    { title: "Speed & Accuracy Drill", text: "t s l ts sl tl sit let lit list" },
                    { title: "Final Review", text: "t s l ts sl tl sit let lit list salt tell" }
                ],
                get sequence() { return this.screens.map(s => s.text).join('').split('').map(c => ({ keys: [c], char: c })); }
            },
            { 
                id: 'en-beg-7', 
                title: 'O, B, and A Keys', 
                screens: [
                    { title: "o Practice", text: "oooooooo" },
                    { title: "b Practice", text: "bbbbbbbb" },
                    { title: "a Practice", text: "aaaaaaaa" },
                    { title: "o & b Combo", text: "oooo bbbb oooo bbbb" },
                    { title: "a & Home Keys Combo", text: "aaaa jjjj aaaa ffff" },
                    { title: "Key Switching", text: "ob ob ob ob oa oa oa oa" },
                    { title: "Short Patterns", text: "boa boa lab lab bag bag", isSentence: true },
                    { title: "Mixed Combo 1", text: "boa lab bag cob boa lab", isSentence: true },
                    { title: "Mixed Combo 2", text: "rob ban oak bob rob ban", isSentence: true },
                    { title: "Speed & Accuracy Drill", text: "o b a ob ba oa boa lab bag" },
                    { title: "Final Review", text: "o b a ob ba oa boa lab bag cob rob ban" }
                ],
                get sequence() { return this.screens.map(s => s.text).join('').split('').map(c => ({ keys: [c], char: c })); }
            },
            { 
                id: 'en-beg-8', 
                title: 'V, H, and M Keys', 
                screens: [
                    { title: "v Practice", text: "vvvvvvvv" },
                    { title: "h Practice", text: "hhhhhhhh" },
                    { title: "m Practice", text: "mmmmmmmm" },
                    { title: "v & h Combo", text: "vvvv hhhh vvvv hhhh" },
                    { title: "m & Home Keys Combo", text: "mmmm jjjj mmmm ffff" },
                    { title: "Key Switching", text: "vh vh vh vh vm vm vm vm" },
                    { title: "Short Patterns", text: "van van hem hem mug mug", isSentence: true },
                    { title: "Mixed Combo 1", text: "van hem mug ham van hem", isSentence: true },
                    { title: "Mixed Combo 2", text: "him vim Move jam him vim", isSentence: true },
                    { title: "Speed & Accuracy Drill", text: "v h m vh hm vm van hem mug" },
                    { title: "Final Review", text: "v h m vh hm vm van hem mug ham him vim" }
                ],
                get sequence() { return this.screens.map(s => s.text).join('').split('').map(c => ({ keys: [c], char: c })); }
            },
            { 
                id: 'en-beg-9', 
                title: 'Period and Comma', 
                screens: [
                    { title: ". Practice", text: "........" },
                    { title: ", Practice", text: ",,,,,,,," },
                    { title: "Period & Comma Combo", text: ".... ,,,, .... ,,,," },
                    { title: "Sentence Ending Drill", text: "a. b. c. d. e. f.", isSentence: true },
                    { title: "List & Comma Drill", text: "a, b, c, d, e, f,", isSentence: true },
                    { title: "Switching ., ,, and Space", text: ". , . , . , . ," },
                    { title: "Short Patterns", text: "cat. dog, red. blue,", isSentence: true },
                    { title: "Mixed Combo 1", text: "a cat, a dog. red, blue.", isSentence: true },
                    { title: "Mixed Combo 2", text: "run, fun. red, bed.", isSentence: true },
                    { title: "Speed & Accuracy Drill", text: "cat, dog. red, blue. run, fun.", isSentence: true },
                    { title: "Final Review", text: "a cat, a dog. red, blue. run, fun. bed, red.", isSentence: true }
                ],
                get sequence() { return this.screens.map(s => s.text).join('').split('').map(c => ({ keys: [c], char: c })); }
            },
            { 
                id: 'en-beg-10', 
                title: 'Beginner Review 2', 
                screens: [
                    { title: "Key Practice", text: "t s l o b a v h m . ," },
                    { title: "Letter Drills 1", text: "ttt sss lll ooo bbb aaa vvv hhh mmm" },
                    { title: "Letter Drills 2", text: "ts sl lo ob ba av vh hm m. ." },
                    { title: "Letter Drills 3", text: "to so lo bo ao vo ho mo" },
                    { title: "Word Drills 1", text: "the sat lot bat van hat mat", isSentence: true },
                    { title: "Word Drills 2", text: "lab mob tab ham sam tom", isSentence: true },
                    { title: "Word Drills 3", text: "al, as, at, to, so, lo, no, mo", isSentence: true },
                    { title: "Sentence Practice 1", text: "the cat sat on the mat.", isSentence: true },
                    { title: "Sentence Practice 2", text: "she has a hot hat.", isSentence: true },
                    { title: "Sentence Practice 3", text: "tom, sam, and bob.", isSentence: true },
                    { title: "Sentence Practice 4", text: "look at the boat, van, and car.", isSentence: true }
                ],
                get sequence() { return this.screens.map(s => s.text).join('').split('').map(c => ({ keys: [c], char: c })); }
            },
            
            // The Home Stretch
            { 
                id: 'en-beg-11', 
                title: 'W, X, and ; Keys', 
                screens: [
                    { title: "Key Practice 1", text: "w w w x x x ; ; ;" },
                    { title: "Key Practice 2", text: "w x ; x w ; ; x w" },
                    { title: "Letter Drills 1", text: "www xxx ;;;" },
                    { title: "Letter Drills 2", text: "wx xw x; ;x w; ;w" },
                    { title: "Word Drills 1", text: "low wax tax mix fix box", isSentence: true },
                    { title: "Word Drills 2", text: "saw jaw law raw way who", isSentence: true },
                    { title: "Word Drills 3", text: "was win way wax web wet", isSentence: true },
                    { title: "Word Drills 4", text: "six tax mix fix box fox", isSentence: true },
                    { title: "Word Drills 5", text: "who, what, why, when, how;", isSentence: true },
                    { title: "Word Drills 6", text: "saw, law, raw, jaw, way;", isSentence: true },
                    { title: "Sentence Practice 1", text: "the fox was quick and sly;", isSentence: true },
                    { title: "Sentence Practice 2", text: "he saw the wet wax box.", isSentence: true },
                    { title: "Sentence Practice 3", text: "who went to fix the tax?", isSentence: true },
                    { title: "Sentence Practice 4", text: "six cows; two pigs; one horse.", isSentence: true }
                ],
                get sequence() { return this.screens.map(s => s.text).join('').split('').map(c => ({ keys: [c], char: c })); }
            },
            { 
                id: 'en-beg-12', 
                title: 'Q, Y, and P Keys', 
                screens: [
                    { title: "Key Practice 1", text: "q q q y y y p p p" },
                    { title: "Key Practice 2", text: "q y p y q p p y q" },
                    { title: "Letter Drills 1", text: "qqq yyy ppp" },
                    { title: "Letter Drills 2", text: "qy yq yp py qp pq" },
                    { title: "Letter Drills 3", text: "quit quit pay pay yes yes", isSentence: true },
                    { title: "Letter Drills 4", text: "qu py yo pa qu yp", isSentence: true },
                    { title: "Word Drills 1", text: "quip quit quiet queen", isSentence: true },
                    { title: "Word Drills 2", text: "you yes way day toy", isSentence: true },
                    { title: "Word Drills 3", text: "pen pan pet pot pop", isSentence: true },
                    { title: "Word Drills 4", text: "play pay copy type", isSentence: true },
                    { title: "Sentence Practice 1", text: "the quick queen was quiet.", isSentence: true },
                    { title: "Sentence Practice 2", text: "yes, you can play and pay.", isSentence: true },
                    { title: "Sentence Practice 3", text: "type a quick note with a pen.", isSentence: true },
                    { title: "Sentence Practice 4", text: "a happy puppy lay on the path.", isSentence: true }
                ],
                get sequence() { return this.screens.map(s => s.text).join('').split('').map(c => ({ keys: [c], char: c })); }
            },
            { 
                id: 'en-beg-13', 
                title: 'Z and Enter Keys', 
                screens: [
                    { title: "Key Practice 1", text: "z z z ↵ ↵ ↵" },
                    { title: "Key Practice 2", text: "z ↵ z ↵ z ↵" },
                    { title: "Letter Drills 1", text: "zzz ↵ ↵ ↵" },
                    { title: "Letter Drills 2", text: "zz zzz zzzz" },
                    { title: "Letter Drills 3", text: "zoo zip zap zero size", isSentence: true },
                    { title: "Letter Drills 4", text: "buzz buzz maze maze", isSentence: true },
                    { title: "Word Drills 1", text: "zoo zip zap zero", isSentence: true },
                    { title: "Word Drills 2", text: "zone size gaze maze", isSentence: true },
                    { title: "Word Drills 3", text: "lazy crazy prize quiz", isSentence: true },
                    { title: "Word Drills 4", text: "frozen hazard horizon", isSentence: true },
                    { title: "Sentence & Enter 1", text: "the zoo has a zebra.↵", isSentence: true },
                    { title: "Sentence & Enter 2", text: "a quick quiz on size.↵", isSentence: true },
                    { title: "Sentence & Enter 3", text: "it was a lazy day.↵", isSentence: true },
                    { title: "Sentence & Enter 4", text: "prizes for the team.↵", isSentence: true }
                ],
                get sequence() { 
                    return this.screens.map(s => s.text).join('').split('').map(c => {
                        if (c === '↵') return { keys: ["Enter"], char: '↵' };
                        return { keys: [c], char: c };
                    }); 
                }
            },
            { 
                id: 'en-beg-14', 
                title: 'Beginner Wrap-up', 
                screens: [
                    { title: "All Letters 1", text: "a b c d e f g h i j k l m n o p q r s t u v w x y z", isSentence: true },
                    { title: "All Letters 2", text: "q w e r t y u i o p", isSentence: true },
                    { title: "All Letters 3", text: "a s d f g h j k l", isSentence: true },
                    { title: "All Letters 4", text: "z x c v b n m", isSentence: true },
                    { title: "Mixed Key 1", text: "the quick brown fox jumps over the lazy dog.", isSentence: true },
                    { title: "Mixed Key 2", text: "pack my box with five dozen liquor jugs.", isSentence: true },
                    { title: "Mixed Key 3", text: "how vexingly quick deft zebras jump!", isSentence: true },
                    { title: "Sentences 1", text: "who went to the zoo with you?", isSentence: true },
                    { title: "Sentences 2", text: "the sun is bright, but the wind is cold.", isSentence: true },
                    { title: "Sentences 3", text: "please bring six apples, two oranges, and a lime.", isSentence: true },
                    { title: "Sentences 4", text: "she typed a fast note and pressed enter.", isSentence: true },
                    { title: "Paragraph 1", text: "learning to type takes time and patience.↵", isSentence: true },
                    { title: "Paragraph 2", text: "keep your fingers on the home row keys.↵", isSentence: true },
                    { title: "Paragraph 3", text: "try not to look down at your keyboard.↵", isSentence: true },
                    { title: "Paragraph 4", text: "accuracy is much more important than speed.↵", isSentence: true }
                ],
                get sequence() { 
                    return this.screens.map(s => s.text).join('').split('').map(c => {
                        if (c === '↵') return { keys: ["Enter"], char: '↵' };
                        return { keys: [c], char: c };
                    }); 
                }
            },
            { 
                id: 'en-beg-15', 
                title: 'Beginner Assessment', 
                screens: [
                    { title: "1-Minute Assessment", text: "The quick brown fox jumps over the lazy dog near the bank. Learning how to type fast and accurately takes continuous practice and focus. Always remember to keep your eyes on the screen and place your fingers properly on the home row keys. Good posture and clear focus will help you type faster without making many mistakes.", isSentence: true }
                ],
                get sequence() { return this.screens.map(s => s.text).join('').split('').map(c => ({ keys: [c], char: c })); }
            }
        ]
    },
    {
        id: 'en-intermediate',
        title: 'Intermediate (ইন্টারমিডিয়েট)',
        subLessons: [
            // Common English Words
            { 
                id: 'en-int-1', 
                title: 'Common English Words', 
                screens: [
                    { title: "Basic Common Words 1", text: "the and to of a in is it you that", isSentence: true },
                    { title: "Basic Common Words 2", text: "he was for on are as with his they I", isSentence: true },
                    { title: "Basic Common Words 3", text: "at be this have from or one had by word", isSentence: true },
                    { title: "4 & 5 Letter Words 1", text: "that with have this from they", isSentence: true },
                    { title: "4 & 5 Letter Words 2", text: "there would make like time look", isSentence: true },
                    { title: "4 & 5 Letter Words 3", text: "people water find long make thing", isSentence: true },
                    { title: "Word Pair Drills 1", text: "in the / of a / to be / and that / with you", isSentence: true },
                    { title: "Word Pair Drills 2", text: "from this / on it / for them / as well / by all", isSentence: true },
                    { title: "Short Phrases 1", text: "it is for you to make a choice.", isSentence: true },
                    { title: "Short Phrases 2", text: "they have been in the water for a long time.", isSentence: true },
                    { title: "Short Phrases 3", text: "this is one of the best words to know.", isSentence: true },
                    { title: "Short Phrases 4", text: "some people like to learn and practice everyday.", isSentence: true }
                ],
                get sequence() { return this.screens.map(s => s.text).join('').split('').map(c => ({ keys: [c], char: c })); }
            },
            { 
                id: 'en-int-2', 
                title: 'Easy Home Row Words', 
                screens: [
                    { title: "Home Row Keys & Short Words 1", text: "a s d f g h j k l ;", isSentence: true },
                    { title: "Home Row Keys & Short Words 2", text: "as ad ah all ask", isSentence: true },
                    { title: "Home Row Keys & Short Words 3", text: "dad fad glad", isSentence: true },
                    { title: "Home Row Keys & Short Words 4", text: "has had half", isSentence: true },
                    { title: "Medium Home Row Words 1", text: "fall gall hall", isSentence: true },
                    { title: "Medium Home Row Words 2", text: "dash flash lash", isSentence: true },
                    { title: "Medium Home Row Words 3", text: "gash hash mash", isSentence: true },
                    { title: "Medium Home Row Words 4", text: "flask glass class", isSentence: true },
                    { title: "Home Row Phrases & Sentences 1", text: "a glad dad had a flask.", isSentence: true },
                    { title: "Home Row Phrases & Sentences 2", text: "ask a lad to fall back.", isSentence: true },
                    { title: "Home Row Phrases & Sentences 3", text: "a glass hall has a flash.", isSentence: true },
                    { title: "Home Row Phrases & Sentences 4", text: "dad had a glad flash.", isSentence: true }
                ],
                get sequence() { return this.screens.map(s => s.text).join('').split('').map(c => ({ keys: [c], char: c })); }
            },
            { 
                id: 'en-int-3', 
                title: 'Easy Top Row Words', 
                screens: [
                    { title: "Top Row Keys & Short Words 1", text: "q w e r t y u i o p", isSentence: true },
                    { title: "Top Row Keys & Short Words 2", text: "top pot rot pet wet", isSentence: true },
                    { title: "Top Row Keys & Short Words 3", text: "put Out try Red toe", isSentence: true },
                    { title: "Top Row Keys & Short Words 4", text: "you our per pro", isSentence: true },
                    { title: "Medium Top Row Words 1", text: "tree pure wire type", isSentence: true },
                    { title: "Medium Top Row Words 2", text: "port report write quiet", isSentence: true },
                    { title: "Medium Top Row Words 3", text: "quite water super power", isSentence: true },
                    { title: "Medium Top Row Words 4", text: "their write tower route", isSentence: true },
                    { title: "Top Row Phrases & Sentences 1", text: "you were right to try.", isSentence: true },
                    { title: "Top Row Phrases & Sentences 2", text: "the water is pure and sweet.", isSentence: true },
                    { title: "Top Row Phrases & Sentences 3", text: "write a report on power.", isSentence: true },
                    { title: "Top Row Phrases & Sentences 4", text: "our team put up a quiet effort.", isSentence: true }
                ],
                get sequence() { return this.screens.map(s => s.text).join('').split('').map(c => ({ keys: [c], char: c })); }
            },
            { 
                id: 'en-int-3b', 
                title: 'Easy Bottom Row Words', 
                screens: [
                    { title: "Bottom Row Keys & Short Words 1", text: "z x c v b n m", isSentence: true },
                    { title: "Bottom Row Keys & Short Words 2", text: "can van ban man", isSentence: true },
                    { title: "Bottom Row Keys & Short Words 3", text: "box fox mix fix", isSentence: true },
                    { title: "Bottom Row Keys & Short Words 4", text: "cab lab mob tab", isSentence: true },
                    { title: "Medium Bottom Row Words 1", text: "come back move name", isSentence: true },
                    { title: "Medium Bottom Row Words 2", text: "exam zinc bank farm", isSentence: true },
                    { title: "Medium Bottom Row Words 3", text: "clean beach brave match", isSentence: true },
                    { title: "Medium Bottom Row Words 4", text: "music blank cabin voice", isSentence: true },
                    { title: "Bottom Row Phrases & Sentences 1", text: "can you come back soon?", isSentence: true },
                    { title: "Bottom Row Phrases & Sentences 2", text: "the brave man came to the bank.", isSentence: true },
                    { title: "Bottom Row Phrases & Sentences 3", text: "move the box and clean the cabin.", isSentence: true },
                    { title: "Bottom Row Phrases & Sentences 4", text: "she played soft music on the beach.", isSentence: true }
                ],
                get sequence() { return this.screens.map(s => s.text).join('').split('').map(c => ({ keys: [c], char: c })); }
            },
            
            // On to Sentences
            { 
                id: 'en-int-4', 
                title: 'Shift Key and Capitalization', 
                screens: [
                    { title: "Shift Key Practice 1", text: "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z", isSentence: true },
                    { title: "Shift Key Practice 2", text: "Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm", isSentence: true },
                    { title: "Shift Key Practice 3", text: "Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz", isSentence: true },
                    { title: "Capitalized Words 1", text: "Monday Tuesday Wednesday Thursday Friday", isSentence: true },
                    { title: "Capitalized Words 2", text: "January February March April May June", isSentence: true },
                    { title: "Capitalized Words 3", text: "London Paris Tokyo New York Sydney", isSentence: true },
                    { title: "Capitalized Words 4", text: "Sam Tom Alex Mary John Lisa", isSentence: true },
                    { title: "Sentences with Capitalization 1", text: "My name is Sam and I live in New York.", isSentence: true },
                    { title: "Sentences with Capitalization 2", text: "We will visit Paris in June.", isSentence: true },
                    { title: "Sentences with Capitalization 3", text: "Monday and Tuesday are busy days for Alex.", isSentence: true },
                    { title: "Sentences with Capitalization 4", text: "The quick brown Fox jumps over the Lazy Dog.", isSentence: true }
                ],
                get sequence() { return this.screens.map(s => s.text).join('').split('').map(c => ({ keys: [c], char: c })); }
            },
            { 
                id: 'en-int-5', 
                title: 'Basic Punctuation', 
                screens: [
                    { title: "Punctuation Keys 1", text: ". . . , , , ? ? ? ! ! !", isSentence: true },
                    { title: "Punctuation Keys 2", text: ". , ? ! . , ? ! . , ? !", isSentence: true },
                    { title: "Words & Phrases 1", text: "Yes, No, Stop! Wait!", isSentence: true },
                    { title: "Words & Phrases 2", text: "Who? What? Where? Why?", isSentence: true },
                    { title: "Words & Phrases 3", text: "Hello, friend! How are you?", isSentence: true },
                    { title: "Sentences with Basic Punctuation 1", text: "The cat sat on the mat.", isSentence: true },
                    { title: "Sentences with Basic Punctuation 2", text: "Where is the red car?", isSentence: true },
                    { title: "Sentences with Basic Punctuation 3", text: "Look at that bright star!", isSentence: true },
                    { title: "Sentences with Basic Punctuation 4", text: "Yes, I will be there on time.", isSentence: true },
                    { title: "Questions & Exclamations 1", text: "Did you finish your work?", isSentence: true },
                    { title: "Questions & Exclamations 2", text: "Wow, that was a fast run!", isSentence: true },
                    { title: "Questions & Exclamations 3", text: "Is this your pencil, Tom?", isSentence: true },
                    { title: "Questions & Exclamations 4", text: "Hooray, we won the game!", isSentence: true }
                ],
                get sequence() { return this.screens.map(s => s.text).join('').split('').map(c => ({ keys: [c], char: c })); }
            },
            { 
                id: 'en-int-6', 
                title: 'Intermediate Punctuation', 
                screens: [
                    { title: "Punctuation Keys 1", text: ": : : ; ; ; ' ' ' \" \" \"", isSentence: true },
                    { title: "Punctuation Keys 2", text: ": ; ' \" : ; ' \" : ; ' \"", isSentence: true },
                    { title: "Contractions & Possessives 1", text: "don't can't won't it's didn't", isSentence: true },
                    { title: "Contractions & Possessives 2", text: "John's Mary's cat's dog's", isSentence: true },
                    { title: "Contractions & Possessives 3", text: "\"hello\" \"yes\" \"stop\" \"go\"", isSentence: true },
                    { title: "Sentences Practice 1", text: "It's a bright day; the sun is shining.", isSentence: true },
                    { title: "Sentences Practice 2", text: "She said, \"I will be there soon.\"", isSentence: true },
                    { title: "Sentences Practice 3", text: "Please bring these items: apples, oranges, and milk.", isSentence: true },
                    { title: "Sentences Practice 4", text: "Don't forget to pack Sam's bag.", isSentence: true },
                    { title: "Colon & Semicolon Practice 1", text: "The test was hard; however, everyone passed.", isSentence: true },
                    { title: "Colon & Semicolon Practice 2", text: "Remember this rule: practice makes perfect.", isSentence: true },
                    { title: "Colon & Semicolon Practice 3", text: "He brought three things: a pen, a book, and a card.", isSentence: true },
                    { title: "Colon & Semicolon Practice 4", text: "She likes tea; he prefers coffee.", isSentence: true }
                ],
                get sequence() { return this.screens.map(s => s.text).join('').split('').map(c => ({ keys: [c], char: c })); }
            },
            { 
                id: 'en-int-7', 
                title: 'Quick Sentences', 
                screens: [
                    { title: "Short & Simple Sentences 1", text: "The sun rises in the east.", isSentence: true },
                    { title: "Short & Simple Sentences 2", text: "She likes to read books.", isSentence: true },
                    { title: "Short & Simple Sentences 3", text: "We are going to the park.", isSentence: true },
                    { title: "Short & Simple Sentences 4", text: "He has a bright new idea.", isSentence: true },
                    { title: "Sentences with Basic Punctuation 1", text: "Look at that red car, it is moving fast!", isSentence: true },
                    { title: "Sentences with Basic Punctuation 2", text: "Where did you put the blue notebook?", isSentence: true },
                    { title: "Sentences with Basic Punctuation 3", text: "Yes, I will finish the task on time.", isSentence: true },
                    { title: "Sentences with Basic Punctuation 4", text: "He said, \"Please close the front door.\"", isSentence: true },
                    { title: "Mixed Speed Sentences 1", text: "The quick brown fox jumps over the lazy dog.", isSentence: true },
                    { title: "Mixed Speed Sentences 2", text: "Keep your eyes on the screen while typing.", isSentence: true },
                    { title: "Mixed Speed Sentences 3", text: "Practice makes a big difference in speed.", isSentence: true },
                    { title: "Mixed Speed Sentences 4", text: "Typing accurately is the best way to grow.", isSentence: true }
                ],
                get sequence() { return this.screens.map(s => s.text).join('').split('').map(c => ({ keys: [c], char: c })); }
            },
            { 
                id: 'en-int-8', 
                title: 'Short Paragraphs', 
                screens: [
                    { title: "Paragraph 1", text: "Learning to type takes patience and consistent daily practice. Keep your fingers gently resting on the home row keys. Try your best not to look down at the keyboard while typing.", isSentence: true },
                    { title: "Paragraph 2", text: "Good posture is important for comfortable and fast typing. Sit up straight with your feet flat on the floor. Take short breaks to stretch your hands and relax your shoulders.", isSentence: true },
                    { title: "Paragraph 3", text: "Focus on accuracy first before worrying about your typing speed. Speed will naturally improve as your muscle memory develops over time. Stay calm and keep practicing every day.", isSentence: true }
                ],
                get sequence() { return this.screens.map(s => s.text).join('').split('').map(c => ({ keys: [c], char: c })); }
            },
            { 
                id: 'en-int-9', 
                title: 'Speed Drills', 
                screens: [
                    { title: "Short & Fast Phrases 1", text: "go go go run run run fast fast fast", isSentence: true },
                    { title: "Short & Fast Phrases 2", text: "quick quick quick time time time", isSentence: true },
                    { title: "Short & Fast Phrases 3", text: "speed up the rhythm now", isSentence: true },
                    { title: "Short & Fast Phrases 4", text: "move your fingers fast and steady", isSentence: true },
                    { title: "Fast Sentence Drills 1", text: "the quick brown fox jumps over the lazy dog.", isSentence: true },
                    { title: "Fast Sentence Drills 2", text: "speed and accuracy go hand in hand while typing.", isSentence: true },
                    { title: "Fast Sentence Drills 3", text: "keep typing without pausing or stopping.", isSentence: true },
                    { title: "Fast Sentence Drills 4", text: "train your muscle memory every single day.", isSentence: true },
                    { title: "Speed Practice Paragraph", text: "Focus on keeping a smooth and steady rhythm. Do not rush so much that you make mistakes, but try to move smoothly from one word to the next. The key to high typing speed is continuous practice without looking at the keys.", isSentence: true }
                ],
                get sequence() { return this.screens.map(s => s.text).join('').split('').map(c => ({ keys: [c], char: c })); }
            },
            
            // Wrapping Up
            { 
                id: 'en-int-10', 
                title: 'Intermediate Wrap-up', 
                screens: [
                    { title: "Wrap-up Practice 1", text: "Dear Sirs,", isSentence: true },
                    { title: "Wrap-up Practice 2", text: "Thank you for sending the diskettes so promptly.", isSentence: true },
                    { title: "Wrap-up Practice 3", text: "However, the diskettes which you sent are for soft sectored drives. As I stated in my original letter my system accepts only ten sector, hard sectored diskettes. I will return these two boxes as soon as I receive the correct ones.", isSentence: true }
                ],
                get sequence() { return this.screens.map(s => s.text).join('').split('').map(c => ({ keys: [c], char: c })); }
            },
            { 
                id: 'en-int-11', 
                title: 'Intermediate Assessment', 
                screens: [
                    { title: "Assessment Paragraph 1", text: "The serve is the most important stroke in tennis. A good player can serve the ball to any spot on the service court.", isSentence: true },
                    { title: "Assessment Paragraph 2", text: "A ball can also be made to bounce in different ways when it hits the ground. This is done by turning the racket in the hand and putting a spin on the ball when it is struck by the racket.", isSentence: true },
                    { title: "Assessment Paragraph 3", text: "A perfect serve is called an ace. This happens when a serve is so well placed or is hit so hard that it is impossible for the receiver to return the ball. A let is a serve that strikes the top of the net before landing in the proper service court.", isSentence: true },
                    { title: "Assessment Paragraph 4", text: "Because the normal flight of the ball has been interrupted, the receiver has virtually no chance to get to the ball.", isSentence: true },
                    { title: "Assessment Paragraph 5", text: "Here are two simple ways to heat a shelter that cannot use an internal fire.", isSentence: true },
                    { title: "Assessment Paragraph 6", text: "Using these methods there will be no need to spend another", isSentence: true }
                ],
                get sequence() { return this.screens.map(s => s.text).join('').split('').map(c => ({ keys: [c], char: c })); }
            },
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
