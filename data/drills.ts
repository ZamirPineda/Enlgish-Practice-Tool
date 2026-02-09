
import { DrillsByLevel, EnglishLevel } from '../types';

export const drillTopicsByLevel: DrillsByLevel = {
  [EnglishLevel.A1]: [
    {
      id: 'a1-review-basics',
      name: 'Review: Basics, Routines & Quantifiers',
      description: 'Comprehensive review of A1 topics including Present Simple vs Continuous, Quantifiers, Family, and Frequency Adverbs.',
      examples: [
        { parts: [{ word: '--- Present Simple vs. Present Continuous ---' }] },
        { parts: [{ word: 'I' }, { word: 'usually', category: 'Adverb of Frequency' }, { word: 'design' }, { word: 'systems.' }], ipa: '/aɪ ˈjuːʒuəli dɪˈzaɪn ˈsɪstəmz/', translation_es: 'Normalmente diseño sistemas.' },
        { parts: [{ word: 'Right now', category: 'Adverb of Frequency' }, { word: 'I am' }, { word: 'fixing' }, { word: 'a bug.' }], ipa: '/raɪt naʊ aɪ æm ˈfɪksɪŋ ə bʌɡ/', translation_es: 'Ahora mismo estoy arreglando un error.' },
        { parts: [{ word: 'I' }, { word: 'work' }, { word: 'remotely' }, { word: 'every day.' }], ipa: '/aɪ wɜːrk rɪˈmoʊtli ˈɛvri deɪ/', translation_es: 'Trabajo remotamente todos los días.' },
        { parts: [{ word: 'At the moment', category: 'Adverb of Frequency' }, { word: 'she is' }, { word: 'resting.' }], ipa: '/æt ðə ˈmoʊmənt ʃi ɪz ˈrɛstɪŋ/', translation_es: 'En este momento ella está descansando.' },
        { parts: [{ word: 'He' }, { word: 'sells' }, { word: 'motorcycle accessories.' }], ipa: '/hi sɛlz ˈmoʊtərˌsaɪkəl ækˈsɛsəriz/', translation_es: 'Él vende accesorios para motos.' },

        { parts: [{ word: '--- Quantifiers ---' }] },
        { parts: [{ word: 'All', category: 'Quantifier' }, { word: 'of my colleagues are in Peru.' }], ipa: '/ɔːl əv maɪ ˈkɒliːɡz ɑːr ɪn pəˈruː/', translation_es: 'Todos mis colegas están en Perú.' },
        { parts: [{ word: 'Nearly all', category: 'Quantifier' }, { word: 'our meetings are virtual.' }], ipa: '/ˈnɪərli ɔːl ˈaʊər ˈmiːtɪŋz ɑːr ˈvɜːrtʃuəl/', translation_es: 'Casi todas nuestras reuniones son virtuales.' },
        { parts: [{ word: 'Most', category: 'Quantifier' }, { word: 'of the time I work from home.' }], ipa: '/moʊst əv ðə taɪm aɪ wɜːrk frɒm hoʊm/', translation_es: 'La mayor parte del tiempo trabajo desde casa.' },
        { parts: [{ word: 'I have' }, { word: 'a lot of', category: 'Quantifier' }, { word: 'tasks this week.' }], ipa: '/aɪ hæv ə lɒt əv tɑːsks ðɪs wiːk/', translation_es: 'Tengo muchas tareas esta semana.' },
        { parts: [{ word: 'There are' }, { word: 'some', category: 'Quantifier' }, { word: 'new projects.' }], ipa: '/ðɛər ɑːr sʌm njuː ˈprɒdʒɛkts/', translation_es: 'Hay algunos proyectos nuevos.' },
        { parts: [{ word: 'Not many', category: 'Quantifier' }, { word: 'people know I live in Colombia.' }], ipa: '/nɒt ˈmɛni ˈpiːpəl noʊ aɪ lɪv ɪn kəˈlɒmbiə/', translation_es: 'No mucha gente sabe que vivo en Colombia.' },
        { parts: [{ word: 'I have' }, { word: 'very few', category: 'Quantifier' }, { word: 'problems.' }], ipa: '/aɪ hæv ˈvɛri fjuː ˈprɒbləmz/', translation_es: 'Tengo muy pocos problemas.' },
        { parts: [{ word: 'No one', category: 'Quantifier' }, { word: 'is in the office.' }], ipa: '/noʊ wʌn ɪz ɪn ði ˈɒfɪs/', translation_es: 'Nadie está en la oficina.' },

        { parts: [{ word: '--- Adverbs of Frequency ---' }] },
        { parts: [{ word: 'I' }, { word: 'always', category: 'Adverb of Frequency' }, { word: 'start work at 8 AM.' }], ipa: '/aɪ ˈɔːlweɪz stɑːrt wɜːrk æt eɪt eɪ ɛm/', translation_es: 'Siempre empiezo a trabajar a las 8 AM.' },
        { parts: [{ word: 'I' }, { word: 'almost always', category: 'Adverb of Frequency' }, { word: 'eat with my mom.' }], ipa: '/aɪ ˈɔːlmoʊst ˈɔːlweɪz iːt wɪð maɪ mɒm/', translation_es: 'Casi siempre como con mi mamá.' },
        { parts: [{ word: 'I' }, { word: 'usually', category: 'Adverb of Frequency' }, { word: 'code in Java.' }], ipa: '/aɪ ˈjuːʒuəli koʊd ɪn ˈdʒɑːvə/', translation_es: 'Normalmente programo en Java.' },
        { parts: [{ word: 'I' }, { word: 'often', category: 'Adverb of Frequency' }, { word: 'have video calls.' }], ipa: '/aɪ ˈɒfən hæv ˈvɪdioʊ kɔːlz/', translation_es: 'A menudo tengo videollamadas.' },
        { parts: [{ word: 'Sometimes', category: 'Adverb of Frequency' }, { word: 'I work late.' }], ipa: '/ˈsʌmtaɪmz aɪ wɜːrk leɪt/', translation_es: 'A veces trabajo tarde.' },
        { parts: [{ word: 'I' }, { word: 'hardly ever', category: 'Adverb of Frequency' }, { word: 'wear a suit.' }], ipa: '/aɪ ˈhɑːrdli ˈɛvər wɛər ə suːt/', translation_es: 'Casi nunca uso traje.' },
        { parts: [{ word: 'I' }, { word: 'never', category: 'Adverb of Frequency' }, { word: 'go to the office physically.' }], ipa: '/aɪ ˈnɛvər ɡoʊ tu ði ˈɒfɪs ˈfɪzɪkli/', translation_es: 'Nunca voy a la oficina físicamente.' },

        { parts: [{ word: '--- "How" Questions ---' }] },
        { parts: [{ word: 'How often', category: 'Question Word' }, { word: 'do you have meetings?' }], ipa: '/haʊ ˈɒfən du ju hæv ˈmiːtɪŋz/', translation_es: '¿Con qué frecuencia tienes reuniones?' },
        { parts: [{ word: 'How long', category: 'Question Word' }, { word: 'have you been an Architect?' }], ipa: '/haʊ lɒŋ hæv ju biːn ən ˈɑːrkɪtɛkt/', translation_es: '¿Cuánto tiempo llevas siendo Arquitecto?' },
        { parts: [{ word: 'How well', category: 'Question Word' }, { word: 'do you speak English?' }], ipa: '/haʊ wɛl du ju spiːk ˈɪŋɡlɪʃ/', translation_es: '¿Qué tan bien hablas inglés?' },
        { parts: [{ word: 'How good', category: 'Question Word' }, { word: 'are you at coding?' }], ipa: '/haʊ ɡʊd ɑːr ju æt ˈkoʊdɪŋ/', translation_es: '¿Qué tan bueno eres programando?' },

        { parts: [{ word: '--- Demonstratives ---' }] },
        { parts: [{ word: 'This', category: 'Demonstrative' }, { word: 'is my work laptop.' }], ipa: '/ðɪs ɪz maɪ wɜːrk ˈlæptɒp/', translation_es: 'Esta es mi portátil de trabajo.' },
        { parts: [{ word: 'That', category: 'Demonstrative' }, { word: 'is a good idea.' }], ipa: '/ðæt ɪz ə ɡʊd aɪˈdiə/', translation_es: 'Esa es una buena idea.' },
        { parts: [{ word: 'These', category: 'Demonstrative' }, { word: 'are my headphones.' }], ipa: '/ðiːz ɑːr maɪ ˈhɛdfoʊnz/', translation_es: 'Estos son mis auriculares.' },
        { parts: [{ word: 'Those', category: 'Demonstrative' }, { word: 'are my colleagues in Lima.' }], ipa: '/ðoʊz ɑːr maɪ ˈkɒliːɡz ɪn ˈliːmə/', translation_es: 'Aquellos son mis colegas en Lima.' },
      ]
    },
    {
      id: 'adjective-order',
      name: 'Adjective Order',
      description: 'In English, adjectives usually follow a specific order. Hover over the underlined words to see their category. The typical order is: Quantity, Opinion, Size, Condition, Age, Shape, Color, Sound/texture, Origin, Material, Purpose.',
      examples: [
        { parts: [{ word: 'A' }, { word: 'nice', category: 'Opinion' }, { word: 'big', category: 'Size' }, { word: 'dog' }], ipa: '/ə naɪs bɪɡ dɒɡ/', translation_es: 'Un perro grande y simpático' },
        { parts: [{ word: 'A' }, { word: 'small', category: 'Size' }, { word: 'red', category: 'Color' }, { word: 'ball' }], ipa: '/ə smɔːl rɛd bɔːl/', translation_es: 'Una pelota pequeña y roja' },
        { parts: [{ word: 'A' }, { word: 'beautiful', category: 'Opinion' }, { word: 'white', category: 'Color' }, { word: 'cat' }], ipa: '/ə ˈbjuːtɪfʊl waɪt kæt/', translation_es: 'Un gato blanco y hermoso' },
        { parts: [{ word: 'An' }, { word: 'old', category: 'Age' }, { word: 'blue', category: 'Color' }, { word: 'car' }], ipa: '/ən əʊld bluː kɑːr/', translation_es: 'Un coche viejo y azul' },
      ],
    },
    {
      id: 'prepositions-place',
      name: 'Prepositions of Place (in, on, at)',
      description: 'Learn the basic prepositions of place. "in" is for enclosed spaces, "on" is for surfaces, and "at" is for specific points. Hover over the underlined words to see the preposition.',
      examples: [
        { parts: [{ word: 'The cat is' }, { word: 'in', category: 'in' }, { word: 'the box.' }], ipa: '/ðə kæt ɪz ɪn ðə bɒks/', translation_es: 'El gato está en la caja.' },
        { parts: [{ word: 'My keys are' }, { word: 'on', category: 'on' }, { word: 'the table.' }], ipa: '/maɪ kiːz ɑːr ɒn ðə ˈteɪbl/', translation_es: 'Mis llaves están sobre la mesa.' },
        { parts: [{ word: 'She is' }, { word: 'at', category: 'at' }, { word: 'the bus stop.' }], ipa: '/ʃi ɪz æt ðə bʌs stɒp/', translation_es: 'Ella está en la parada de autobús.' },
        { parts: [{ word: 'They live' }, { word: 'in', category: 'in' }, { word: 'London.' }], ipa: '/ðeɪ lɪv ɪn ˈlʌndən/', translation_es: 'Ellos viven en Londres.' },
        { parts: [{ word: 'The picture is' }, { word: 'on', category: 'on' }, { word: 'the wall.' }], ipa: '/ðə ˈpɪktʃər ɪz ɒn ðə wɔːl/', translation_es: 'El cuadro está en la pared.' },
      ]
    }
  ],
  [EnglishLevel.A2]: [
    {
      id: 'reflex-training-past-simple',
      name: 'Reflex Training: Past Simple & Directions',
      description: 'Speed Drills to automate the Past Simple. Focus on the "Did" trap (negative/question) and direction verbs in the past.',
      examples: [
        { parts: [{ word: '--- Present -> Past (Rapid Fire) ---' }] },
        {
          comparison: [
            { parts: [{ word: 'I go to work.' }], ipa: '/aɪ ɡoʊ/', translation_es: 'Voy al trabajo.' },
            { parts: [{ word: 'I went to work.' }], ipa: '/aɪ wɛnt/', translation_es: 'Fui al trabajo.' }
          ]
        },
        {
          comparison: [
            { parts: [{ word: 'I am happy.' }], ipa: '/aɪ æm/', translation_es: 'Estoy feliz.' },
            { parts: [{ word: 'I was happy.' }], ipa: '/aɪ wɒz/', translation_es: 'Estaba feliz.' }
          ]
        },
        {
          comparison: [
            { parts: [{ word: 'There is a bank.' }], ipa: '/ðɛər ɪz/', translation_es: 'Hay un banco.' },
            { parts: [{ word: 'There was a bank.' }], ipa: '/ðɛər wɒz/', translation_es: 'Había un banco.' }
          ]
        },
        {
          comparison: [
            { parts: [{ word: 'She buys food.' }], ipa: '/ʃi baɪz/', translation_es: 'Ella compra comida.' },
            { parts: [{ word: 'She bought food.' }], ipa: '/ʃi bɔːt/', translation_es: 'Ella compró comida.' }
          ]
        },
        {
          comparison: [
            { parts: [{ word: 'We leave early.' }], ipa: '/wi liːv/', translation_es: 'Salimos temprano.' },
            { parts: [{ word: 'We left early.' }], ipa: '/wi lɛft/', translation_es: 'Salimos temprano.' }
          ]
        },
        {
          comparison: [
            { parts: [{ word: 'I turn left.' }], ipa: '/aɪ tɜːrn/', translation_es: 'Giro a la izquierda.' },
            { parts: [{ word: 'I turned left.' }], ipa: '/aɪ tɜːrnd/', translation_es: 'Giré a la izquierda.' }
          ]
        },

        { parts: [{ word: '--- The "Did" Trap (Negatives) ---' }] },
        {
          comparison: [
            { parts: [{ word: 'I played soccer.' }], ipa: '/aɪ pleɪd/', translation_es: 'Jugué fútbol.' },
            { parts: [{ word: 'I didn\'t play soccer.' }], ipa: '/aɪ dɪdnt pleɪ/', translation_es: 'No jugué fútbol. (Base Verb!)' }
          ]
        },
        {
          comparison: [
            { parts: [{ word: 'He went home.' }], ipa: '/hi wɛnt/', translation_es: 'Él se fue a casa.' },
            { parts: [{ word: 'He didn\'t go home.' }], ipa: '/hi dɪdnt ɡoʊ/', translation_es: 'Él no se fue a casa.' }
          ]
        },
        {
          comparison: [
            { parts: [{ word: 'She watched TV.' }], ipa: '/ʃi wɒtʃt/', translation_es: 'Ella vio la tele.' },
            { parts: [{ word: 'She didn\'t watch TV.' }], ipa: '/ʃi dɪdnt wɒtʃ/', translation_es: 'Ella no vio la tele.' }
          ]
        },
        {
          comparison: [
            { parts: [{ word: 'They had money.' }], ipa: '/ðeɪ hæd/', translation_es: 'Ellos tenían dinero.' },
            { parts: [{ word: 'They didn\'t have money.' }], ipa: '/ðeɪ dɪdnt hæv/', translation_es: 'Ellos no tenían dinero.' }
          ]
        },

        { parts: [{ word: '--- Was / Were Reflex ---' }] },
        {
          comparison: [
            { parts: [{ word: 'He was tired.' }], ipa: '/hi wɒz/', translation_es: 'Él estaba cansado.' },
            { parts: [{ word: 'They were tired.' }], ipa: '/ðeɪ wɜːr/', translation_es: 'Ellos estaban cansados.' }
          ]
        },
        {
          comparison: [
            { parts: [{ word: 'It was sunny.' }], ipa: '/ɪt wɒz/', translation_es: 'Estaba soleado.' },
            { parts: [{ word: 'We were happy.' }], ipa: '/wi wɜːr/', translation_es: 'Estábamos felices.' }
          ]
        },
        {
          comparison: [
            { parts: [{ word: 'There was a car.' }], ipa: '/ðɛər wɒz/', translation_es: 'Había un coche.' },
            { parts: [{ word: 'There were two cars.' }], ipa: '/ðɛər wɜːr/', translation_es: 'Había dos coches.' }
          ]
        },

        { parts: [{ word: '--- Directions in Past Tense ---' }] },
        { parts: [{ word: 'I' }, { word: 'went', category: 'Simple Past' }, { word: 'straight' }, { word: 'for two blocks.' }], ipa: '/aɪ wɛnt streɪt fɔːr tuː blɒks/', translation_es: 'Fui derecho por dos cuadras.' },
        { parts: [{ word: 'She' }, { word: 'turned', category: 'Simple Past' }, { word: 'right' }, { word: 'at the corner.' }], ipa: '/ʃi tɜːrnd raɪt æt ðə ˈkɔːrnər/', translation_es: 'Ella giró a la derecha en la esquina.' },
        { parts: [{ word: 'We' }, { word: 'crossed', category: 'Simple Past' }, { word: 'the street.' }], ipa: '/wi krɒst ðə striːt/', translation_es: 'Cruzamos la calle.' },
        { parts: [{ word: 'I' }, { word: 'went', category: 'Simple Past' }, { word: 'past' }, { word: 'the bakery.' }], ipa: '/aɪ wɛnt pɑːst ðə ˈbeɪkəri/', translation_es: 'Pasé por la panadería.' },
        { parts: [{ word: 'He' }, { word: 'took', category: 'Simple Past' }, { word: 'the second exit.' }], ipa: '/hi tʊk ðə ˈsɛkənd ˈɛɡzɪt/', translation_es: 'Tomó la segunda salida.' },
        { parts: [{ word: 'The bank' }, { word: 'was', category: 'Simple Past' }, { word: 'next to' }, { word: 'the park.' }], ipa: '/ðə bæŋk wɒz nɛkst tu ðə pɑːrk/', translation_es: 'El banco estaba al lado del parque.' },
      ]
    },
    {
      id: 'phrasal-verbs-daily-routines',
      name: 'Phrasal Verbs (Daily Routines)',
      description: 'Phrasal verbs are very common in everyday English. Here are some related to daily routines. Read the sentence and the meaning.',
      examples: [
        { parts: [{ word: 'I wake up at 7 AM every day.' }], ipa: '/aɪ weɪk ʌp æt ˈsɛvən eɪ.ɛm ˈɛvri deɪ/', definition: 'to stop sleeping', translation_es: 'Me despierto a las 7 AM todos los días.' },
        { parts: [{ word: 'I get up a few minutes later.' }], ipa: '/aɪ ɡɛt ʌp ə fjuː ˈmɪnɪts ˈleɪtər/', definition: 'to get out of bed', translation_es: 'Me levanto unos minutos después.' },
        { parts: [{ word: 'She puts on her makeup.' }], ipa: '/ʃi pʊts ɒn hɜːr ˈmeɪkʌp/', definition: 'to apply cosmetics or clothes', translation_es: 'Ella se maquilla.' },
        { parts: [{ word: 'He works out at the gym.' }], ipa: '/hi wɜːks aʊt æt ðə dʒɪm/', definition: 'to exercise', translation_es: 'Él hace ejercicio en el gimnasio.' },
        { parts: [{ word: 'They clean up the kitchen after dinner.' }], ipa: '/ðeɪ kliːn ʌp ðə ˈkɪtʃɪn ˈæftər ˈdɪnər/', definition: 'to tidy or make clean', translation_es: 'Ellos limpian la cocina después de la cena.' },
        { parts: [{ word: 'Please turn on the light.' }], ipa: '/pliːz tɜːrn ɒn ðə laɪt/', definition: 'to start a machine or light', translation_es: 'Por favor, enciende la luz.' },
      ],
    },
    {
      id: 'pronunciation-minimal-pairs',
      name: 'Pronunciation: Minimal Pairs',
      description: 'Minimal pairs are two words that sound very similar and are only different by one sound. Practice hearing and saying the difference.',
      examples: [
        {
          comparison: [
            { parts: [{ word: 'I see a big ship.' }], ipa: '/aɪ siː ə bɪɡ ʃɪp/', translation_es: 'Veo un barco grande.' },
            { parts: [{ word: 'The sheep is white.' }], ipa: '/ðə ʃiːp ɪz waɪt/', translation_es: 'La oveja es blanca.' }
          ]
        },
        {
          comparison: [
            { parts: [{ word: 'Where does he live?' }], ipa: '/wɛər dʌz hi lɪv/', translation_es: '¿Dónde vive él?' },
            { parts: [{ word: 'It\'s time to leave.' }], ipa: '/ɪts taɪm tu liːv/', translation_es: 'Es hora de irse.' }
          ]
        },
        {
          comparison: [
            { parts: [{ word: 'I have a new pen.' }], ipa: '/aɪ hæv ə njuː pɛn/', translation_es: 'Tengo un bolígrafo nuevo.' },
            { parts: [{ word: 'Don\'t step in the pan.' }], ipa: '/doʊnt stɛp ɪn ðə pæn/', translation_es: 'No pises la sartén.' }
          ]
        },
      ],
    },
  ],
  [EnglishLevel.B1]: [
    {
      id: 'gerunds-infinitives',
      name: 'Gerunds vs. Infinitives',
      description: 'Some verbs are followed by a gerund (-ing), others by an infinitive (to + verb). Here are common patterns.',
      examples: [
        { parts: [{ word: 'I' }, { word: 'enjoy', category: 'Verb + Gerund' }, { word: 'reading books.' }], ipa: '/aɪ ɪnˈdʒɔɪ ˈriːdɪŋ bʊks/', translation_es: 'Disfruto leyendo libros.' },
        { parts: [{ word: 'She' }, { word: 'decided', category: 'Verb + Infinitive' }, { word: 'to go home.' }], ipa: '/ʃi dɪˈsaɪdɪd tu ɡoʊ hoʊm/', translation_es: 'Ella decidió irse a casa.' },
        { parts: [{ word: 'We' }, { word: 'avoided', category: 'Verb + Gerund' }, { word: 'driving during rush hour.' }], ipa: '/wi əˈvɔɪdɪd ˈdraɪvɪŋ ˈdʊərɪŋ rʌʃ aʊər/', translation_es: 'Evitamos conducir durante la hora pico.' },
        { parts: [{ word: 'He' }, { word: 'promised', category: 'Verb + Infinitive' }, { word: 'to help me.' }], ipa: '/hi ˈprɒmɪst tu hɛlp miː/', translation_es: 'Prometió ayudarme.' },
        { parts: [{ word: 'I' }, { word: 'suggest', category: 'Verb + Gerund' }, { word: 'taking a break.' }], ipa: '/aɪ səˈdʒɛst ˈteɪkɪŋ ə breɪk/', translation_es: 'Sugiero tomar un descanso.' },
        { parts: [{ word: 'They' }, { word: 'hope', category: 'Verb + Infinitive' }, { word: 'to see you soon.' }], ipa: '/ðeɪ hoʊp tu siː ju suːn/', translation_es: 'Esperan verte pronto.' },
        { parts: [{ word: 'Do you' }, { word: 'mind', category: 'Verb + Gerund' }, { word: 'opening the window?' }], ipa: '/du ju maɪnd ˈoʊpənɪŋ ðə ˈwɪndoʊ/', translation_es: '¿Te importa abrir la ventana?' },
        { parts: [{ word: 'I can\'t' }, { word: 'afford', category: 'Verb + Infinitive' }, { word: 'to buy a new car.' }], ipa: '/aɪ kænt əˈfɔːrd tu baɪ ə njuː kɑːr/', translation_es: 'No puedo permitirme comprar un coche nuevo.' },
        { parts: [{ word: 'He' }, { word: 'kept', category: 'Verb + Gerund' }, { word: 'interrupting me.' }], ipa: '/hi kɛpt ˌɪntəˈrʌptɪŋ miː/', translation_es: 'Él siguió interrumpiéndome.' },
        { parts: [{ word: 'She' }, { word: 'offered', category: 'Verb + Infinitive' }, { word: 'to drive us.' }], ipa: '/ʃi ˈɒfərd tu draɪv ʌs/', translation_es: 'Ella se ofreció a llevarnos.' },
      ]
    },
    {
      id: 'modals-deduction',
      name: 'Modals of Deduction (Present)',
      description: 'Use "must" when you are sure something is true, "can\'t" when you are sure it is impossible, and "might/may/could" when it is possible.',
      examples: [
        { parts: [{ word: 'He' }, { word: 'must be', category: 'Auxiliary' }, { word: 'at home. The lights are on.' }], ipa: '/hi mʌst bi æt hoʊm/', translation_es: 'Él debe estar en casa. Las luces están encendidas.' },
        { parts: [{ word: 'It' }, { word: 'can\'t be', category: 'Auxiliary' }, { word: 'true!' }], ipa: '/ɪt kɑːnt bi truː/', translation_es: '¡No puede ser verdad!' },
        { parts: [{ word: 'She' }, { word: 'might be', category: 'Auxiliary' }, { word: 'stuck in traffic.' }], ipa: '/ʃi maɪt bi stʌk ɪn ˈtræfɪk/', translation_es: 'Ella podría estar atrapada en el tráfico.' },
        { parts: [{ word: 'They' }, { word: 'could become', category: 'Auxiliary' }, { word: 'rich.' }], ipa: '/ðeɪ kʊd bɪˈkʌm rɪtʃ/', translation_es: 'Ellos podrían hacerse ricos.' },
        { parts: [{ word: 'You' }, { word: 'must contain', category: 'Auxiliary' }, { word: 'your excitement.' }], ipa: '/ju mʌst kənˈteɪn jɔːr ɪkˈsaɪtmənt/', translation_es: 'Debes contener tu emoción.' },
        { parts: [{ word: 'It' }, { word: 'may rain', category: 'Auxiliary' }, { word: 'later.' }], ipa: '/ɪt meɪ reɪn ˈleɪtər/', translation_es: 'Puede que llueva más tarde.' },
      ]
    },
    {
      id: 'used-to-vs-would',
      name: 'Used to vs. Would',
      description: 'Use "used to" for past states and habits. Use "would" ONLY for past habits (actions), not states.',
      examples: [
        {
          comparison: [
            { parts: [{ word: 'I used to live in Paris.' }], ipa: '/aɪ juːzd tu lɪv ɪn ˈpærɪs/', translation_es: 'Yo solía vivir en París. (State)' },
            { parts: [{ word: 'NOT: I would live in Paris.' }], ipa: '', translation_es: 'Incorrecto para estados.' }
          ]
        },
        {
          comparison: [
            { parts: [{ word: 'We used to go to the beach.' }], ipa: '/wi juːzd tu ɡoʊ tu ðə biːtʃ/', translation_es: 'Solíamos ir a la playa. (Habit)' },
            { parts: [{ word: 'We would go to the beach.' }], ipa: '/wi wʊd ɡoʊ tu ðə biːtʃ/', translation_es: 'Íbamos a la playa. (Habit - Nostalgic)' }
          ]
        },
        { parts: [{ word: 'He' }, { word: 'used to be', category: 'Simple Past' }, { word: 'a teacher.' }], ipa: '/hi juːzd tu bi ə ˈtiːtʃər/', translation_es: 'Él solía ser profesor.' },
        { parts: [{ word: 'Every summer, we' }, { word: 'would visit', category: 'Simple Past' }, { word: 'grandma.' }], ipa: '/ˈɛvri ˈsʌmər wi wʊd ˈvɪzɪt ˈɡrænmɑː/', translation_es: 'Cada verano, visitábamos a la abuela.' },
        { parts: [{ word: 'I' }, { word: 'didn\'t use to', category: 'Simple Past' }, { word: 'like spinach.' }], ipa: '/aɪ dɪdnt juːz tu laɪk ˈspɪnɪtʃ/', translation_es: 'No solía gustarme la espinaca.' },
      ]
    }
  ],
  [EnglishLevel.B2]: [
    {
      id: 'english-idioms',
      name: 'Common English Idioms',
      description: 'Idioms are phrases where the meaning is not clear from the individual words. Learning these will make you sound much more natural.',
      examples: [
        { parts: [{ word: 'I think I will' }, { word: 'hit the sack.', category: 'Idiom' }], ipa: '/hɪt ðə sæk/', definition: 'To go to bed', translation_es: 'Me voy a la cama.' },
        { parts: [{ word: 'It\'s time to' }, { word: 'bite the bullet.', category: 'Idiom' }], ipa: '/baɪt ðə ˈbʊlɪt/', definition: 'To do something difficult or unpleasant', translation_es: 'Es hora de hacer de tripas corazón.' },
        { parts: [{ word: 'Break a leg', category: 'Idiom' }, { word: 'on your performance!' }], ipa: '/breɪk ə lɛɡ/', definition: 'Good luck', translation_es: '¡Mucha mierda (buena suerte) en tu actuación!' },
        { parts: [{ word: 'Stop' }, { word: 'beating around the bush', category: 'Idiom' }, { word: 'and tell me.' }], ipa: '/ˈbiːtɪŋ əˈraʊnd ðə bʊʃ/', definition: 'Avoiding the main topic', translation_es: 'Deja de andarte por las ramas.' },
      ]
    }
  ],
  [EnglishLevel.C1]: [
    {
      id: 'ielts-trends',
      name: 'IELTS Task 1: Describing Trends',
      description: 'Essential vocabulary for describing graphs, charts, and data fluctuations. Focus on strong verbs and precise adjectives.',
      examples: [
        { parts: [{ word: 'Prices' }, { word: 'skyrocketed', category: 'Trend Verb' }, { word: 'last month.' }], ipa: '/ˈskaɪrɒkɪtɪd/', definition: 'To rise extremely quickly', translation_es: 'Los precios se dispararon el mes pasado.' },
        { parts: [{ word: 'The number' }, { word: 'plummeted', category: 'Trend Verb' }, { word: 'to a record low.' }], ipa: '/ˈplʌmɪtɪd/', definition: 'To fall very quickly and suddenly', translation_es: 'El número se desplomó a un mínimo histórico.' },
        { parts: [{ word: 'Sales' }, { word: 'fluctuated', category: 'Trend Verb' }, { word: 'throughout the year.' }], ipa: '/ˈflʌktʃu.eɪtɪd/', definition: 'To change continually; shift back and forth', translation_es: 'Las ventas fluctuaron durante el año.' },
        { parts: [{ word: 'There was a' }, { word: 'gradual', category: 'Trend Adjective' }, { word: 'increase', category: 'Trend Noun' }, { word: 'in profits.' }], ipa: '/ˈɡrædʒ.u.əl ˈɪn.kriːs/', translation_es: 'Hubo un aumento gradual en las ganancias.' },
        { parts: [{ word: 'The graph shows a' }, { word: 'steady', category: 'Trend Adjective' }, { word: 'decline', category: 'Trend Noun' }, { word: 'in usage.' }], ipa: '/ˈstɛd.i dɪˈklaɪn/', translation_es: 'El gráfico muestra una disminución constante en el uso.' },
        { parts: [{ word: 'Figures' }, { word: 'leveled off', category: 'Trend Verb' }, { word: 'after the peak.' }], ipa: '/ˈlɛv.əld ɒf/', definition: 'To stop rising or falling and stay at the same level', translation_es: 'Las cifras se estabilizaron después del pico.' },
        { parts: [{ word: 'There was a' }, { word: 'dramatic', category: 'Trend Adjective' }, { word: 'drop', category: 'Trend Noun' }, { word: 'in temperature.' }], ipa: '/drəˈmæt.ɪk drɒp/', translation_es: 'Hubo una caída dramática en la temperatura.' },
        { parts: [{ word: 'The population' }, { word: 'soared', category: 'Trend Verb' }, { word: 'in the 90s.' }], ipa: '/sɔːrd/', definition: 'To rise very quickly to a high level', translation_es: 'La población se disparó en los 90.' },
      ]
    },
    {
      id: 'global-issues-environment',
      name: 'Global Issues: Environment',
      description: 'High-level vocabulary for discussing climate change, ecology, and sustainability. Key for IELTS Speaking Part 3 and Writing Task 2.',
      examples: [
        { parts: [{ word: 'We must reduce our' }, { word: 'carbon footprint', category: 'Environmental Term' }, { word: '.' }], ipa: '/ˈkɑː.bən ˈfʊt.prɪnt/', definition: 'The amount of CO2 released into the atmosphere', translation_es: 'Debemos reducir nuestra huella de carbono.' },
        { parts: [{ word: 'The loss of' }, { word: 'biodiversity', category: 'Environmental Term' }, { word: 'is alarming.' }], ipa: '/ˌbaɪ.əʊ.daɪˈvɜː.sə.ti/', definition: 'The variety of life in the world or a particular habitat', translation_es: 'La pérdida de biodiversidad es alarmante.' },
        { parts: [{ word: 'Governments encourage' }, { word: 'sustainable development', category: 'Environmental Term' }, { word: '.' }], ipa: '/səˈsteɪ.nə.bəl dɪˈvɛl.əp.mənt/', definition: 'Economic development without depleting natural resources', translation_es: 'Los gobiernos fomentan el desarrollo sostenible.' },
        { parts: [{ word: 'We need more' }, { word: 'renewable energy', category: 'Environmental Term' }, { word: 'sources.' }], ipa: '/rɪˈnjuː.ə.bəl ˈɛn.ə.dʒi/', definition: 'Energy from a source that is not depleted when used', translation_es: 'Necesitamos más fuentes de energía renovable.' },
        { parts: [{ word: 'The ice caps are melting due to' }, { word: 'global warming', category: 'Environmental Term' }, { word: '.' }], ipa: '/ˌɡləʊ.bəl ˈwɔː.mɪŋ/', definition: 'A gradual increase in the overall temperature of the earth\'s atmosphere', translation_es: 'Los casquetes polares se derriten debido al calentamiento global.' },
      ]
    },
    {
      id: 'arts-culture-society',
      name: 'Culture, Arts & Society',
      description: 'Sophisticated vocabulary to describe cultural phenomena, history, and social trends.',
      examples: [
        { parts: [{ word: 'It is a matter of' }, { word: 'cultural heritage', category: 'Cultural Concept' }, { word: '.' }], ipa: '/ˈkʌl.tʃər.əl ˈhɛr.ɪ.tɪdʒ/', definition: 'Traditions, monuments and objects inherited from ancestors', translation_es: 'Es una cuestión de patrimonio cultural.' },
        { parts: [{ word: 'The museum focuses on' }, { word: 'contemporary art', category: 'Cultural Concept' }, { word: '.' }], ipa: '/kənˈtɛm.pər.ər.i ɑːt/', definition: 'Art produced at the present period in time', translation_es: 'El museo se centra en el arte contemporáneo.' },
        { parts: [{ word: 'Globalization has led to' }, { word: 'cultural homogenization', category: 'Academic Noun' }, { word: '.' }], ipa: '/həˌmɒdʒ.ə.naɪˈzeɪ.ʃən/', definition: 'The process of cultures becoming similar to one another', translation_es: 'La globalización ha llevado a una homogeneización cultural.' },
        { parts: [{ word: 'We must address' }, { word: 'social inequality', category: 'Academic Noun' }, { word: '.' }], ipa: '/ˌɪn.ɪˈkwɒl.ə.ti/', definition: 'Unequal opportunities and rewards for different social positions', translation_es: 'Debemos abordar la desigualdad social.' },
        { parts: [{ word: 'This painting is the' }, { word: 'epitome', category: 'Academic Noun' }, { word: 'of the era.' }], ipa: '/ɪˈpɪt.ə.mi/', definition: 'A perfect example of a particular quality or type', translation_es: 'Esta pintura es el epítome de la época.' },
      ]
    },
    {
      id: 'inversion-emphasis',
      name: 'Inversion for Emphasis',
      description: 'In formal or dramatic English, we sometimes invert the subject and auxiliary verb after negative adverbials.',
      examples: [
        { parts: [{ word: 'Never', category: 'Negative Adverb' }, { word: 'have', category: 'Auxiliary' }, { word: 'I', category: 'Subject' }, { word: 'seen such a thing.' }], ipa: '/ˈnɛvər hæv aɪ siːn sʌtʃ ə θɪŋ/', translation_es: 'Nunca he visto tal cosa.' },
        { parts: [{ word: 'Rarely', category: 'Negative Adverb' }, { word: 'do', category: 'Auxiliary' }, { word: 'we', category: 'Subject' }, { word: 'get a chance like this.' }], ipa: '/ˈrɛərli du wi ɡɛt ə tʃɑːns laɪk ðɪs/', translation_es: 'Raramente tenemos una oportunidad como esta.' },
        { parts: [{ word: 'Not only', category: 'Negative Adverb' }, { word: 'is', category: 'Auxiliary' }, { word: 'he', category: 'Subject' }, { word: 'smart, but he is also kind.' }], ipa: '/nɒt ˈoʊnli ɪz hi smɑːrt/', translation_es: 'No solo es inteligente, sino también amable.' },
        { parts: [{ word: 'Little', category: 'Negative Adverb' }, { word: 'did', category: 'Auxiliary' }, { word: 'she', category: 'Subject' }, { word: 'know about the surprise.' }], ipa: '/ˈlɪtl dɪd ʃi noʊ/', translation_es: 'Poco sabía ella sobre la sorpresa.' },
        { parts: [{ word: 'Under no circumstances', category: 'Negative Adverb' }, { word: 'should', category: 'Auxiliary' }, { word: 'you', category: 'Subject' }, { word: 'open this door.' }], ipa: '/ˈʌndər noʊ ˈsɜːrkəmstænsɪz ʃʊd ju ˈoʊpən/', translation_es: 'Bajo ninguna circunstancia debes abrir esta puerta.' },
        { parts: [{ word: 'No sooner', category: 'Negative Adverb' }, { word: 'had', category: 'Auxiliary' }, { word: 'I', category: 'Subject' }, { word: 'arrived than it started raining.' }], ipa: '/noʊ ˈsuːnər hæd aɪ əˈraɪvd/', translation_es: 'Apenas había llegado cuando empezó a llover.' },
        { parts: [{ word: 'Seldom', category: 'Negative Adverb' }, { word: 'does', category: 'Auxiliary' }, { word: 'one', category: 'Subject' }, { word: 'find such honesty.' }], ipa: '/ˈsɛldəm dʌz wʌn faɪnd/', translation_es: 'Rara vez se encuentra tal honestidad.' },
        { parts: [{ word: 'Only then', category: 'Negative Adverb' }, { word: 'did', category: 'Auxiliary' }, { word: 'I', category: 'Subject' }, { word: 'understand the problem.' }], ipa: '/ˈoʊnli ðɛn dɪd aɪ ˌʌndərˈstænd/', translation_es: 'Solo entonces entendí el problema.' },
      ]
    }
  ],
  [EnglishLevel.C2]: [
    {
      id: 'advanced-inversion',
      name: 'Advanced Inversion & Emphasis',
      description: 'In formal English, we use inversion to add emphasis or create a more dramatic effect, especially in conditionals and after negative adverbials.',
      examples: [
        { parts: [{ word: '--- Conditionals without "If" ---' }] },
        { parts: [{ word: 'Had I known', category: 'Auxiliary' }, { word: ', I would have helped.' }], ipa: '/hæd aɪ noʊn aɪ wʊd hæv hɛlpt/', translation_es: 'Si lo hubiera sabido, habría ayudado.' },
        { parts: [{ word: 'Were it not for', category: 'Auxiliary' }, { word: 'your help, I would have failed.' }], ipa: '/wɜːr ɪt nɒt fɔːr jɔːr hɛlp/', translation_es: 'Si no fuera por tu ayuda, habría fracasado.' },
        { parts: [{ word: 'Should you require', category: 'Auxiliary' }, { word: 'assistance, please call.' }], ipa: '/ʃʊd ju rɪˈkwaɪər əˈsɪstəns/', translation_es: 'Si necesita asistencia, por favor llame.' },

        { parts: [{ word: '--- Negative Adverbials ---' }] },
        { parts: [{ word: 'Under no circumstances', category: 'Negative Adverb' }, { word: 'should you', category: 'Auxiliary' }, { word: 'leave.' }], ipa: '/ˈʌndər noʊ ˈsɜːrkəmstænsɪz ʃʊd ju liːv/', translation_es: 'Bajo ninguna circunstancia debes irte.' },
        { parts: [{ word: 'Little', category: 'Negative Adverb' }, { word: 'did we know', category: 'Auxiliary' }, { word: 'the truth.' }], ipa: '/ˈlɪtl dɪd wi noʊ ðə truːθ/', translation_es: 'Poco sabíamos la verdad.' },
        { parts: [{ word: 'Hardly', category: 'Negative Adverb' }, { word: 'had I arrived', category: 'Auxiliary' }, { word: 'when he left.' }], ipa: '/ˈhɑːrdli hæd aɪ əˈraɪvd wɛn hi lɛft/', translation_es: 'Apenas había llegado cuando él se fue.' },
        { parts: [{ word: 'Not until', category: 'Negative Adverb' }, { word: 'midnight did', category: 'Auxiliary' }, { word: 'they return.' }], ipa: '/nɒt ʌnˈtɪl ˈmɪdnaɪt dɪd ðeɪ rɪˈtɜːrn/', translation_es: 'No volvieron hasta medianoche.' },
      ]
    },
    {
      id: 'mixed-conditionals',
      name: 'Mixed Conditionals',
      description: 'Mixed conditionals combine different timeframes (e.g., Past action -> Present result, or Present state -> Past result).',
      examples: [
        { parts: [{ word: 'If I hadn\'t spent all my money,' }, { word: 'I would be rich now.' }], ipa: '/aɪ wʊd bi rɪtʃ naʊ/', translation_es: 'Si no hubiera gastado todo mi dinero, ahora sería rico. (Past -> Present)' },
        { parts: [{ word: 'If I were smarter,' }, { word: 'I wouldn\'t have done that.' }], ipa: '/aɪ ˈwʊdnt hæv dʌn ðæt/', translation_es: 'Si fuera más listo, no habría hecho eso. (Present State -> Past Action)' },
        { parts: [{ word: 'If she had taken the job,' }, { word: 'she would be living in Tokyo.' }], ipa: '/ʃi wʊd bi ˈlɪvɪŋ ɪn ˈtoʊkioʊ/', translation_es: 'Si ella hubiera aceptado el trabajo, estaría viviendo en Tokio.' },
        { parts: [{ word: 'If he wasn\'t afraid of flying,' }, { word: 'he would have traveled with us.' }], ipa: '/hi wʊd hæv ˈtrævəld wɪð ʌs/', translation_es: 'Si no tuviera miedo a volar, habría viajado con nosotros.' },
      ]
    },
    {
      id: 'subjunctive-mood',
      name: 'The Subjunctive Mood',
      description: 'Used in formal English to express importance, necessity, or urgency. It uses the base form of the verb.',
      examples: [
        { parts: [{ word: 'It is essential that' }, { word: 'he be', category: 'Auxiliary' }, { word: 'told immediately.' }], ipa: '/ɪt ɪz ɪˈsɛnʃəl ðæt hi bi toʊld/', translation_es: 'Es esencial que se lo digan inmediatamente.' },
        { parts: [{ word: 'I suggest that' }, { word: 'she arrive', category: 'Auxiliary' }, { word: 'early.' }], ipa: '/aɪ səˈdʒɛst ðæt ʃi əˈraɪv ˈɜːrli/', translation_es: 'Sugiero que ella llegue temprano.' },
        { parts: [{ word: 'The doctor recommended that' }, { word: 'he stop', category: 'Auxiliary' }, { word: 'smoking.' }], ipa: '/ðə ˈdɒktər ˌrɛkəˈmɛndɪd ðæt hi stɒp/', translation_es: 'El médico recomendó que dejara de fumar.' },
        { parts: [{ word: 'It is vital that' }, { word: 'you be', category: 'Auxiliary' }, { word: 'present.' }], ipa: '/ɪt ɪz ˈvaɪtəl ðæt ju bi ˈprɛzənt/', translation_es: 'Es vital que estés presente.' },
        { parts: [{ word: 'God' }, { word: 'save', category: 'Auxiliary' }, { word: 'the King.' }], ipa: '/ɡɒd seɪv ðə kɪŋ/', translation_es: 'Dios salve al Rey.' },
      ]
    },
    {
      id: 'nuanced-vocabulary',
      name: 'Sophisticated Vocabulary & Transition',
      description: 'High-level transition words and vocabulary to refine your speech and writing.',
      examples: [
        { parts: [{ word: 'He is happy,' }, { word: 'albeit', category: 'Connectors' }, { word: 'a bit tired.' }], ipa: '/ɔːlˈbiːɪt/', definition: 'Although', translation_es: 'Está feliz, aunque un poco cansado.' },
        { parts: [{ word: 'Notwithstanding', category: 'Connectors' }, { word: 'the delay, we finished.' }], ipa: '/ˌnɒtwɪθˈstændɪŋ/', definition: 'In spite of', translation_es: 'A pesar del retraso, terminamos.' },
        { parts: [{ word: 'Smartphones are' }, { word: 'ubiquitous', category: 'Adjectives' }, { word: 'these days.' }], ipa: '/juːˈbɪkwɪtəs/', definition: 'Present, appearing, or found everywhere', translation_es: 'Los teléfonos inteligentes son omnipresentes hoy en día.' },
        { parts: [{ word: 'His fame was' }, { word: 'ephemeral', category: 'Adjectives' }, { word: '.' }], ipa: '/ɪˈfɛmərəl/', definition: 'Lasting for a very short time', translation_es: 'Su fama fue efímera.' },
        { parts: [{ word: 'She handled it with' }, { word: 'aplomb', category: 'Adjectives' }, { word: '.' }], ipa: '/əˈplɒm/', definition: 'Self-confidence or assurance', translation_es: 'Ella lo manejó con aplomo.' },
        { parts: [{ word: 'The decision was' }, { word: 'arbitrary', category: 'Adjectives' }, { word: '.' }], ipa: '/ˈɑːrbɪtrɛri/', definition: 'Based on random choice or personal whim', translation_es: 'La decisión fue arbitraria.' },
      ]
    }
  ],
};
