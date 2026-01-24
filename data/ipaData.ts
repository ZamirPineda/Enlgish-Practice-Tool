
import { IPASound } from '../types';

export const ipaData: IPASound[] = [
  // --- VOWELS (MONOPHTHONGS) ---
  {
    symbol: 'iː',
    name: 'Long E',
    category: 'Vowel',
    description: 'A long, tense vowel sound, like the "ee" in "see".',
    mouthPosition: 'Smile widely, tongue high and forward.',
    examples: [
      { word: 'Sheep', ipa: '/ʃiːp/', audioText: 'Sheep' },
      { word: 'Beach', ipa: '/biːtʃ/', audioText: 'Beach' },
      { word: 'Dream', ipa: '/driːm/', audioText: 'Dream' }
    ],
    connectedSpeech: [
      { exact: "She is here", fast: "She's here", context: "Pronoun contraction" },
      { exact: "I see it", fast: "I see_it", context: "Linking /j/ sound: /aɪ siːjɪt/" }
    ],
    similar: ['ɪ']
  },
  {
    symbol: 'ɪ',
    name: 'Short I',
    category: 'Vowel',
    description: 'A short, relaxed vowel sound, like the "i" in "sit".',
    mouthPosition: 'Relax your mouth, tongue slightly lower than for /iː/.',
    examples: [
      { word: 'Ship', ipa: '/ʃɪp/', audioText: 'Ship' },
      { word: 'Bit', ipa: '/bɪt/', audioText: 'Bit' },
      { word: 'Pink', ipa: '/pɪŋk/', audioText: 'Pink' }
    ],
    connectedSpeech: [
      { exact: "It is", fast: "Its", context: "Common contraction" },
      { exact: "Bit of", fast: "Bit_uv", context: "Linking: /bɪtəv/" }
    ],
    similar: ['iː']
  },
  {
    symbol: 'ʊ',
    name: 'Short OO',
    category: 'Vowel',
    description: 'The relaxed sound in "book" or "foot".',
    mouthPosition: 'Lips slightly rounded but relaxed. Don\'t push them out.',
    examples: [
      { word: 'Book', ipa: '/bʊk/', audioText: 'Book' },
      { word: 'Foot', ipa: '/fʊt/', audioText: 'Foot' },
      { word: 'Pull', ipa: '/pʊl/', audioText: 'Pull' }
    ],
    connectedSpeech: [
      { exact: "Good at", fast: "Goo-dat", context: "Linking consonant to vowel" }
    ],
    similar: ['uː']
  },
  {
    symbol: 'uː',
    name: 'Long U',
    category: 'Vowel',
    description: 'The tense, long sound in "goose" or "blue".',
    mouthPosition: 'Tense lips, pushed forward in a small circle.',
    examples: [
      { word: 'Goose', ipa: '/ɡuːs/', audioText: 'Goose' },
      { word: 'Blue', ipa: '/bluː/', audioText: 'Blue' },
      { word: 'Food', ipa: '/fuːd/', audioText: 'Food' }
    ],
    connectedSpeech: [
      { exact: "Who is it?", fast: "Who-wiz-it?", context: "Linking /w/ sound: /huːwɪzɪt/" }
    ],
    similar: ['ʊ']
  },
  {
    symbol: 'æ',
    name: 'Short A (Flat A)',
    category: 'Vowel',
    description: 'The "flat A" sound in "cat" or "black". Higher and wider than the Spanish A.',
    mouthPosition: 'Open mouth wide, tongue flat and forward, corners of mouth pulled back.',
    examples: [
      { word: 'Cat', ipa: '/kæt/', audioText: 'Cat' },
      { word: 'Apple', ipa: '/ˈæpl/', audioText: 'Apple' },
      { word: 'Happy', ipa: '/ˈhæpi/', audioText: 'Happy' }
    ],
    connectedSpeech: [
      { exact: "That apple", fast: "Tha-tapple", context: "Linking: T becomes a light D or glottal stop" }
    ],
    similar: ['ʌ', 'eɪ']
  },
  {
    symbol: 'ʌ',
    name: 'Short U (Strut)',
    category: 'Vowel',
    description: 'The short, sharp sound in "cup" or "love".',
    mouthPosition: 'Mouth open halfway, tongue relaxed in the center.',
    examples: [
      { word: 'Cup', ipa: '/kʌp/', audioText: 'Cup' },
      { word: 'Love', ipa: '/lʌv/', audioText: 'Love' },
      { word: 'But', ipa: '/bʌt/', audioText: 'But' }
    ],
    connectedSpeech: [
      { exact: "But I", fast: "Bu-daɪ", context: "Flap T: T sounds like a fast Spanish R" }
    ],
    similar: ['æ', 'ə']
  },
  {
    symbol: 'ɜː',
    name: 'R-Colored Vowel',
    category: 'Vowel',
    description: 'The deep sound in "bird" or "nurse". Very common in English.',
    mouthPosition: 'Tongue bunched up in the middle, lips neutral.',
    examples: [
      { word: 'Bird', ipa: '/bɜːrd/', audioText: 'Bird' },
      { word: 'Work', ipa: '/wɜːrk/', audioText: 'Work' },
      { word: 'Learn', ipa: '/lɜːrn/', audioText: 'Learn' }
    ],
    connectedSpeech: [
      { exact: "Her office", fast: "He-roffice", context: "Linking R: The R connects to the next vowel" }
    ]
  },
  {
    symbol: 'ə',
    name: 'Schwa',
    category: 'Vowel',
    description: 'The most common sound in English. A weak, unstressed sound.',
    mouthPosition: 'Completely relaxed mouth, neutral position. Like a sigh.',
    examples: [
      { word: 'Teacher', ipa: '/ˈtiːtʃə/', audioText: 'Teacher' },
      { word: 'About', ipa: '/əˈbaʊt/', audioText: 'About' },
      { word: 'Banana', ipa: '/bəˈnænə/', audioText: 'Banana' }
    ],
    connectedSpeech: [
      { exact: "To the store", fast: "t'th' store", context: "Vowel reduction in 'to' and 'the'" },
      { exact: "Of course", fast: "uv course", context: "Reduction of 'of'" }
    ],
    similar: ['ʌ']
  },

  // --- DIPHTHONGS ---
  {
    symbol: 'eɪ',
    name: 'Face Diphthong',
    category: 'Diphthong',
    description: 'A combination of /e/ and /ɪ/, as in "face" or "day".',
    mouthPosition: 'Start with /e/ and move smoothly towards /ɪ/.',
    examples: [
      { word: 'Face', ipa: '/feɪs/', audioText: 'Face' },
      { word: 'Day', ipa: '/deɪ/', audioText: 'Day' },
      { word: 'Wait', ipa: '/weɪt/', audioText: 'Wait' }
    ],
    connectedSpeech: [
      { exact: "Stay up", fast: "Stay-yup", context: "Linking /j/ between vowels" }
    ],
    similar: ['æ']
  },
  {
    symbol: 'aɪ',
    name: 'Price Diphthong',
    category: 'Diphthong',
    description: 'The sound in "my" or "high".',
    mouthPosition: 'Start with a wide open /a/ and move up to /ɪ/.',
    examples: [
      { word: 'My', ipa: '/maɪ/', audioText: 'My' },
      { word: 'High', ipa: '/haɪ/', audioText: 'High' },
      { word: 'Price', ipa: '/praɪs/', audioText: 'Price' }
    ],
    connectedSpeech: [
      { exact: "I am", fast: "I'm", context: "Common contraction" }
    ]
  },
  {
    symbol: 'oʊ',
    name: 'Goat Diphthong',
    category: 'Diphthong',
    description: 'The sound in "go" or "home".',
    mouthPosition: 'Start neutral and round the lips towards /ʊ/.',
    examples: [
      { word: 'Go', ipa: '/ɡoʊ/', audioText: 'Go' },
      { word: 'Home', ipa: '/hoʊm/', audioText: 'Home' },
      { word: 'Boat', ipa: '/boʊt/', audioText: 'Boat' }
    ],
    connectedSpeech: [
      { exact: "Go out", fast: "Go-wout", context: "Linking /w/ between vowels" }
    ]
  },

  // --- CONSONANTS ---
  {
    symbol: 'p',
    name: 'P Sound',
    category: 'Consonant',
    description: 'A voiceless, bilabial plosive. Sudden burst of air.',
    mouthPosition: 'Press lips together, then release with a burst. No vibration.',
    examples: [
      { word: 'Pea', ipa: '/piː/', audioText: 'Pea' },
      { word: 'Pen', ipa: '/pɛn/', audioText: 'Pen' },
      { word: 'Pie', ipa: '/paɪ/', audioText: 'Pie' }
    ],
    connectedSpeech: [
      { exact: "Stop it", fast: "Sto-pit", context: "Linking consonant to vowel" },
      { exact: "Help out", fast: "Hel-pout", context: "Linking /p/ to /aʊ/" }
    ]
  },
  {
    symbol: 'v',
    name: 'V Sound',
    category: 'Consonant',
    description: 'A voiced labiodental fricative. Different from "B"!',
    mouthPosition: 'Top teeth touch bottom lip. Vibrate your vocal cords.',
    examples: [
      { word: 'Voice', ipa: '/vɔɪs/', audioText: 'Voice' },
      { word: 'Travel', ipa: '/ˈtrævəl/', audioText: 'Travel' },
      { word: 'River', ipa: '/ˈrɪvər/', audioText: 'River' }
    ],
    connectedSpeech: [
      { exact: "Have a", fast: "Ha-vuh", context: "Linking: /hævə/" }
    ]
  },
  {
    symbol: 'θ',
    name: 'Voiceless TH',
    category: 'Consonant',
    description: 'The "soft TH" sound in "think" or "bath". No vibration.',
    mouthPosition: 'Place tongue tip between teeth and blow air.',
    examples: [
      { word: 'Think', ipa: '/θɪŋk/', audioText: 'Think' },
      { word: 'Bath', ipa: '/bɑːθ/', audioText: 'Bath' },
      { word: 'Healthy', ipa: '/ˈhɛlθi/', audioText: 'Healthy' }
    ],
    similar: ['ð']
  },
  {
    symbol: 'ð',
    name: 'Voiced TH',
    category: 'Consonant',
    description: 'The "hard TH" sound in "this" or "mother". Uses vibration.',
    mouthPosition: 'Tongue between teeth, blow air and vibrate vocal cords.',
    examples: [
      { word: 'This', ipa: '/ðɪs/', audioText: 'This' },
      { word: 'Mother', ipa: '/ˈmʌðə/', audioText: 'Mother' },
      { word: 'They', ipa: '/ðeɪ/', audioText: 'They' }
    ],
    connectedSpeech: [
      { exact: "With the", fast: "wi'th'", context: "Assimilation of /ð/" }
    ],
    similar: ['θ']
  },
  {
    symbol: 'ʃ',
    name: 'SH Sound',
    category: 'Consonant',
    description: 'The sound in "shoe" or "ship". No vibration.',
    mouthPosition: 'Lips rounded, tongue back, blow air out.',
    examples: [
      { word: 'Shoe', ipa: '/ʃuː/', audioText: 'Shoe' },
      { word: 'Fish', ipa: '/fɪʃ/', audioText: 'Fish' },
      { word: 'Ocean', ipa: '/ˈoʊʃən/', audioText: 'Ocean' }
    ],
    connectedSpeech: [
      { exact: "Cash only", fast: "Ca-shonly", context: "Linking SH to vowel" }
    ],
    similar: ['tʃ']
  },
  {
    symbol: 'ŋ',
    name: 'NG Sound',
    category: 'Consonant',
    description: 'The nasal sound at the end of "sing" or "long". No "G" sound!',
    mouthPosition: 'Back of tongue touches the roof of the mouth. Air goes through nose.',
    examples: [
      { word: 'Sing', ipa: '/sɪŋ/', audioText: 'Sing' },
      { word: 'Long', ipa: '/lɒŋ/', audioText: 'Long' },
      { word: 'Running', ipa: '/ˈrʌnɪŋ/', audioText: 'Running' }
    ],
    connectedSpeech: [
      { exact: "Singing a", fast: "Si-ŋi-ŋuh", context: "Linking nasal to vowel" }
    ]
  },
  {
    symbol: 'tʃ',
    name: 'CH Sound',
    category: 'Consonant',
    description: 'The sound in "church" or "cheese".',
    mouthPosition: 'Stop air with tongue, then release with a hiss.',
    examples: [
      { word: 'Chair', ipa: '/tʃɛə/', audioText: 'Chair' },
      { word: 'Watch', ipa: '/wɒtʃ/', audioText: 'Watch' }
    ],
    connectedSpeech: [
      { exact: "Meet you", fast: "Mee-chu", context: "Yod-coalescence: /t/ + /j/ becomes /tʃ/" },
      { exact: "What you doing", fast: "Whatchu doin'", context: "Informal reduction" }
    ],
    similar: ['ʃ', 'dʒ']
  },
  {
    symbol: 'dʒ',
    name: 'J Sound',
    category: 'Consonant',
    description: 'The sound in "jump" or "judge". Voiced version of /tʃ/.',
    mouthPosition: 'Same as /tʃ/ but with vocal cord vibration.',
    examples: [
      { word: 'Jump', ipa: '/dʒʌmp/', audioText: 'Jump' },
      { word: 'Age', ipa: '/eɪdʒ/', audioText: 'Age' }
    ],
    connectedSpeech: [
      { exact: "Did you", fast: "Di-dju", context: "Yod-coalescence: /d/ + /j/ becomes /dʒ/" },
      { exact: "Would you", fast: "Wou-dju", context: "Polite reduction" }
    ],
    similar: ['tʃ']
  }
];
