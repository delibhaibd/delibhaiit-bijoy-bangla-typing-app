import { generateBlockSequence } from '../utils/generator';

export const englishCategories = [
    {
        id: 'en-beginner',
        title: 'Beginner',
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
                    { title: "Short Patterns", text: "ruk ruk fur fur jur jur", isSentence: true },
                    { title: "Mixed Combo 1", text: "fur ruk kur jur fur ruk", isSentence: true },
                    { title: "Mixed Combo 2", text: "ruf kur fur jur ruk ruf", isSentence: true },
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
                    { title: "Short Patterns", text: "red red die die eid eid", isSentence: true },
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
                    { title: "Short Patterns", text: "can can gin gin ice ice", isSentence: true },
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
                    { title: "Home Row & Top Row Mix", text: "fud ruk kid red den cur", isSentence: true },
                    { title: "Key Combinations", text: "fed run ice fun rug kid", isSentence: true },
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
                    { title: "Mixed Combo 2", text: "him vim move jam him vim", isSentence: true },
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
                    { title: "Letter Drills 4", text: "qu py yo pa qu yp" },
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
                    { title: "All Letters 1", text: "a b c d e f g h i j k l m n o p q r s t u v w x y z" },
                    { title: "All Letters 2", text: "q w e r t y u i o p" },
                    { title: "All Letters 3", text: "a s d f g h j k l" },
                    { title: "All Letters 4", text: "z x c v b n m" },
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
                    { title: "1-Minute Assessment", text: "the quick brown fox jumps over the lazy dog near the bank. learning how to type fast and accurately takes continuous practice and focus. always remember to keep your eyes on the screen and place your fingers properly on the home row keys. good posture and clear focus will help you type faster without making many mistakes.", isSentence: true }
                ],
                get sequence() { return this.screens.map(s => s.text).join('').split('').map(c => ({ keys: [c], char: c })); }
            }
        ]
    },
    {
        id: 'en-intermediate',
        title: 'Intermediate',
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
                    { title: "Top Row Keys & Short Words 1", text: "q w e r t y u i o p" },
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
                    { title: "Bottom Row Keys & Short Words 1", text: "z x c v b n m" },
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
                    { title: "Shift Key Practice 1", text: "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z" },
                    { title: "Shift Key Practice 2", text: "Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm" },
                    { title: "Shift Key Practice 3", text: "Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz" },
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
                    { title: "Punctuation Keys 1", text: ". . . , , , ? ? ? ! ! !" },
                    { title: "Punctuation Keys 2", text: ". , ? ! . , ? ! . , ? !" },
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
                    { title: "Punctuation Keys 1", text: ": : : ; ; ; ' ' ' \" \" \"" },
                    { title: "Punctuation Keys 2", text: ": ; ' \" : ; ' \" : ; ' \"" },
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
        title: 'Advanced',
        subLessons: [
            // Skill Builder (Sentence Mode)
            { 
                id: 'en-adv-1', 
                title: 'Numbers Letters Numbers', 
                isSentence: true,
                screens: [
                    { title: "Screen 1", text: "Plan 1 was prepared in room 2b by team 3c for the project.", isSentence: true },
                    { title: "Screen 2", text: "We ordered 4 boxes of item 5a and 6 units of model 7b today.", isSentence: true },
                    { title: "Screen 3", text: "Flight 8c arrives at terminal 9a and departs from gate 10b.", isSentence: true },
                    { title: "Screen 4", text: "Code 1a2b3c was verified by security agent 4d5e at 6:30 pm.", isSentence: true },
                    { title: "Screen 5", text: "Model 7x comes with 8gb ram and 9th generation fast core cpu.", isSentence: true },
                    { title: "Screen 6", text: "Room 101 has 12 computers, 3 printers, and 4 high speed routers.", isSentence: true }
                ],
                get sequence() { return this.screens.map(s => s.text).join(' ').split('').map(c => ({ keys: [c], char: c })); }
            },
            { 
                id: 'en-adv-2', 
                title: 'Accuracy Focus', 
                isSentence: true,
                screens: [
                    { title: "Screen 1", text: "Typing requires patience, rhythm, and steady keystrokes.", isSentence: true },
                    { title: "Screen 2", text: "Accuracy always comes first, and natural speed will soon follow.", isSentence: true },
                    { title: "Screen 3", text: "Focus your eyes on the screen without looking down at the keys.", isSentence: true },
                    { title: "Screen 4", text: "Consistent daily practice builds effortless and lasting muscle memory.", isSentence: true },
                    { title: "Screen 5", text: "Keep wrists relaxed slightly above the desk for the best ergonomic posture.", isSentence: true }
                ],
                get sequence() { return this.screens.map(s => s.text).join(' ').split('').map(c => ({ keys: [c], char: c })); }
            },
            { 
                id: 'en-adv-3', 
                title: 'Advanced Symbols', 
                isSentence: true,
                screens: [
                    { title: "Screen 1", text: "Contact: support@domain.com | Hotline: +1-800-555-0199 [24/7].", isSentence: true },
                    { title: "Screen 2", text: "Formula: {x + y} * {a - b} = c_total ~ 100% accurate result.", isSentence: true },
                    { title: "Screen 3", text: "Config options: [port=8080; mode='production'; active=true].", isSentence: true },
                    { title: "Screen 4", text: "Code tags: #typing_champion #speed+accuracy #keyboard_master!", isSentence: true },
                    { title: "Screen 5", text: "Command: /usr/local/bin/run_app --verbose --timeout=30 --retry=3", isSentence: true }
                ],
                get sequence() { return this.screens.map(s => s.text).join(' ').split('').map(c => ({ keys: [c], char: c })); }
            },
            { 
                id: 'en-adv-4', 
                title: 'Numeric Keypad', 
                screens: [
                    { title: "Page 1: 4 & 5", text: "454545544" },
                    { title: "Page 2: Home Row (4, 5, 6)", text: "456654456" },
                    { title: "Page 3: Home Row Variations", text: "465645654" },
                    { title: "Page 4: 7 & 8", text: "787878877" },
                    { title: "Page 5: Top Row (7, 8, 9)", text: "789987789" },
                    { title: "Page 6: Top Row Variations", text: "798978987" },
                    { title: "Page 7: 1 & 2", text: "121212211" },
                    { title: "Page 8: Bottom Row (1, 2, 3)", text: "123321123" },
                    { title: "Page 9: Bottom Row Variations", text: "132312321" },
                    { title: "Page 10: Zero Key (0)", text: "004050600" },
                    { title: "Page 11: Decimal Point (.)", text: "0.51.23.4" },
                    { title: "Page 12: Decimals 2", text: "5.67.89.0" },
                    { title: "Page 13: Addition (+)", text: "4+5+6+7+8" },
                    { title: "Page 14: Subtraction (-)", text: "9-5-2-1-1" },
                    { title: "Page 15: Addition & Subtraction", text: "12+34-5+6" },
                    { title: "Page 16: Multiplication (*)", text: "2*3*4*5" },
                    { title: "Page 17: Division (/)", text: "80/4/2/5" },
                    { title: "Page 18: Multiply & Divide", text: "12*4/2*3" },
                    { title: "Page 19: All Operators", text: "10+20-5*2" },
                    { title: "Page 20: Ascending Numbers", text: "012345678" },
                    { title: "Page 21: Descending Numbers", text: "987654321" },
                    { title: "Page 22: Left Column (7, 4, 1, 0)", text: "74107410" },
                    { title: "Page 23: Middle Column (8, 5, 2)", text: "852852852" },
                    { title: "Page 24: Right Column (9, 6, 3, .)", text: "963.963.9" },
                    { title: "Page 25: Diagonal Flow 1", text: "753195135" },
                    { title: "Page 26: Diagonal Flow 2", text: "159735791" },
                    { title: "Page 27: Short Sums", text: "145+250" },
                    { title: "Page 28: Short Differences", text: "980-435" },
                    { title: "Page 29: Short Products", text: "25*12*4" },
                    { title: "Page 30: Currency / Rate", text: "99.50+12.25" },
                    { title: "Page 31: Decimals with Math", text: "4.5*2+1.5" },
                    { title: "Page 32: Accounting Line", text: "1250-450+20" },
                    { title: "Page 33: Full Keypad Sequence 1", text: "123+456-789" },
                    { title: "Page 34: Full Keypad Sequence 2", text: "987/3*2+10" },
                    { title: "Page 35: Master Test", text: "0123456789+-*/." }
                ],
                get sequence() { return this.screens.map(s => s.text).join('').split('').map(c => ({ keys: [c], char: c })); }
            },
            { 
                id: 'en-adv-5', 
                title: 'Numeric Keypad Speed Drills', 
                screens: [
                    { title: "Drill 1: Addition Fast", text: "125+350+40" },
                    { title: "Drill 2: Subtraction Fast", text: "980-320-50" },
                    { title: "Drill 3: Mixed Basic", text: "450+150-80" },
                    { title: "Drill 4: Multiply Drill", text: "25*4*12" },
                    { title: "Drill 5: Division Drill", text: "720/6/4" },
                    { title: "Drill 6: Price with Tax", text: "19.99+2.50" },
                    { title: "Drill 7: Discount Calc", text: "150.00-15.5" },
                    { title: "Drill 8: Ledger Sum", text: "250+450+125" },
                    { title: "Drill 9: Quantity x Rate", text: "12*45.50" },
                    { title: "Drill 10: Salary Entry", text: "25000+3500" },
                    { title: "Drill 11: Percent Multiplier", text: "5000*0.15" },
                    { title: "Drill 12: 6-Digit Code 1", text: "789456123" },
                    { title: "Drill 13: 6-Digit Code 2", text: "963852741" },
                    { title: "Drill 14: Mobile Num 1", text: "0171234567" },
                    { title: "Drill 15: Mobile Num 2", text: "0189876543" },
                    { title: "Drill 16: Bank Tx 1", text: "7500-1250" },
                    { title: "Drill 17: Bank Tx 2", text: "9800+3200" },
                    { title: "Drill 18: POS Entry 1", text: "12.75+3.25" },
                    { title: "Drill 19: POS Entry 2", text: "49.50-10.25" },
                    { title: "Drill 20: Unit Scale", text: "1000/100*5" },
                    { title: "Drill 21: Decimals Stream", text: "0.25+0.75" },
                    { title: "Drill 22: Stepped Series", text: "10+20+30+40" },
                    { title: "Drill 23: Column Sprint", text: "741+852+963" },
                    { title: "Drill 24: Cross Signs", text: "100-20+50" },
                    { title: "Drill 25: Daily Sales", text: "1450.5+380" },
                    { title: "Drill 26: Ledger Balance", text: "5000-150-24" },
                    { title: "Drill 27: Math Chain 1", text: "99*4/2+15" },
                    { title: "Drill 28: Math Chain 2", text: "450/15*2-10" },
                    { title: "Drill 29: Rate Spread", text: "85.50*4.25" },
                    { title: "Drill 30: Quick Inventory", text: "15*80+240" },
                    { title: "Drill 31: Fast Decimal 1", text: "3.14*10+5.5" },
                    { title: "Drill 32: Fast Decimal 2", text: "100.50/2-15" },
                    { title: "Drill 33: Keypad Sprint", text: "1472583690" },
                    { title: "Drill 34: Inverse Sprint", text: "9638527410" },
                    { title: "Drill 35: Ultimate Master", text: "8520*1.5/2" }
                ],
                get sequence() { return this.screens.map(s => s.text).join('').split('').map(c => ({ keys: [c], char: c })); }
            },
            
            // Wrapping Up (Sentence Mode)
            { 
                id: 'en-adv-6', 
                title: 'Advanced Wrap-up', 
                isSentence: true,
                screens: [
                    { title: "Screen 1", text: "Chapter 1: The Quick Brown Fox Jumps Over 10 Lazy Dogs.", isSentence: true },
                    { title: "Screen 2", text: "Pack my box with 5 dozen liquor jugs {Quality Grade: A+}.", isSentence: true },
                    { title: "Screen 3", text: "Sphinx of black quartz, judge my vow! (Score: 100/100).", isSentence: true },
                    { title: "Screen 4", text: "How vexingly quick daft zebras jump! [Trial #99 Passed].", isSentence: true },
                    { title: "Screen 5", text: "Jackdaws love my big sphinx of quartz ~ 24/7 Mastery.", isSentence: true }
                ],
                get sequence() { return this.screens.map(s => s.text).join(' ').split('').map(c => ({ keys: [c], char: c })); }
            },
            { 
                id: 'en-adv-7', 
                title: 'Advanced Assessment', 
                isSentence: true,
                screens: [
                    { title: "Screen 1", text: "The 1st rule is: Always be accurate and keep practicing daily!", isSentence: true },
                    { title: "Screen 2", text: "Excellence is not an act, but a habit practiced every single day.", isSentence: true },
                    { title: "Screen 3", text: "Success in typing unlocks faster communication and higher productivity.", isSentence: true },
                    { title: "Screen 4", text: "You have mastered English touch typing from basics to advanced levels!", isSentence: true },
                    { title: "Screen 5", text: "Congratulations on completing the entire advanced typing syllabus!", isSentence: true }
                ],
                get sequence() { return this.screens.map(s => s.text).join(' ').split('').map(c => ({ keys: [c], char: c })); }
            }
        ]
    }
];
