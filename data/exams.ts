
import { EnglishLevel, ExamsByLevel } from '../types';

export const examsByLevel: ExamsByLevel = {
  [EnglishLevel.A1]: [
    {
      id: 'quiz-1',
      name: 'Oral Quiz 1: Basics & Routines',
      description: 'First oral assessment covering basic personal information, descriptions, and daily habits.',
      tasks: [
        'Ask about and describe present activities (Present Continuous vs Simple).',
        'Describe family life (members, jobs, relationships).',
        'Ask for and give personal information (name, age, origin, job).',
        'Give information about quantities (Quantifiers & Demonstratives).',
        'Ask and answer questions about free time/hobbies.',
        'Ask and answer questions about routines (Adverbs of Frequency & "How" questions).'
      ],
      examples: [
        {
            taskDescription: 'Present Simple vs. Present Continuous',
            phrases: [
                { text: "Q: Do you design software every day?", translation: "P: ¿Diseñas software todos los días? (Simple - Rutina)" },
                { text: "A: Yes, I usually design systems, but right now I am fixing a bug.", translation: "R: Sí, normalmente diseño sistemas, pero ahora mismo estoy arreglando un error. (Contraste)" },
                { text: "Q: Are you working in the office today?", translation: "P: ¿Estás trabajando en la oficina hoy? (Continuous - Temporal)" },
                { text: "A: No, I work remotely every day. I am sitting in my home office.", translation: "R: No, trabajo remotamente todos los días. Estoy sentado en mi oficina en casa." },
                { text: "Q: What is your sister doing?", translation: "P: ¿Qué está haciendo tu hermana?" },
                { text: "A: She works as an analyst, but at the moment she is resting.", translation: "R: Ella trabaja como analista, pero en este momento está descansando." },
                { text: "Q: Why are you checking your phone?", translation: "P: ¿Por qué estás revisando tu teléfono?" },
                { text: "A: Because I am waiting for a message from Peru.", translation: "R: Porque estoy esperando un mensaje de Perú." }
            ]
        },
        {
            taskDescription: 'Quantifiers (All, Most, Many, Few, etc.)',
            phrases: [
                { text: "All of my colleagues are in Peru.", translation: "Todos mis colegas están en Perú." },
                { text: "Nearly all our meetings are virtual.", translation: "Casi todas nuestras reuniones son virtuales." },
                { text: "Most of the time, I work from home.", translation: "La mayor parte del tiempo, trabajo desde casa." },
                { text: "I have a lot of tasks this week.", translation: "Tengo muchas tareas esta semana." },
                { text: "There are some new projects in the bank.", translation: "Hay algunos proyectos nuevos en el banco." },
                { text: "Not many people know I live in Colombia.", translation: "No mucha gente sabe que vivo en Colombia." },
                { text: "I have very few technical problems.", translation: "Tengo muy pocos problemas técnicos." },
                { text: "No one is in this room except me.", translation: "Nadie está en esta habitación excepto yo." }
            ]
        },
        {
            taskDescription: 'Demonstratives (This, That, These, Those)',
            phrases: [
                { text: "Q: Whose laptop is this?", translation: "P: ¿De quién es esta portátil? (Cerca)" },
                { text: "A: This is my work laptop.", translation: "R: Esta es mi portátil de trabajo." },
                { text: "Q: Who are those people in the photo?", translation: "P: ¿Quiénes son esas personas en la foto? (Lejos)" },
                { text: "A: Those are my mother's students.", translation: "R: Esos son los estudiantes de mi madre." },
                { text: "Q: Are these your headphones?", translation: "P: ¿Son estos tus auriculares? (Cerca/Plural)" },
                { text: "A: No, those over there are mine.", translation: "R: No, aquellos de allá son los míos." }
            ]
        },
        {
            taskDescription: 'Adverbs of Frequency',
            phrases: [
                { text: "I always start work at 8 AM.", translation: "Siempre empiezo a trabajar a las 8 AM." },
                { text: "I almost always eat lunch with my mom.", translation: "Casi siempre almuerzo con mi mamá." },
                { text: "I usually code in Java or Python.", translation: "Normalmente programo en Java o Python." },
                { text: "I often have video calls with Lima.", translation: "A menudo tengo videollamadas con Lima." },
                { text: "Sometimes I work late on Fridays.", translation: "A veces trabajo hasta tarde los viernes." },
                { text: "I hardly ever wear a suit.", translation: "Casi nunca uso traje." },
                { text: "I almost never have internet issues.", translation: "Casi nunca tengo problemas de internet." },
                { text: "I never go to the office physically.", translation: "Nunca voy a la oficina físicamente." }
            ]
        },
        {
            taskDescription: 'Questions with "How" (Good, Long, Often, Well)',
            phrases: [
                { text: "Q: How often do you have meetings?", translation: "P: ¿Con qué frecuencia tienes reuniones?" },
                { text: "A: I have meetings twice a day.", translation: "R: Tengo reuniones dos veces al día." },
                { text: "Q: How long have you been an Architect?", translation: "P: ¿Cuánto tiempo llevas siendo Arquitecto?" },
                { text: "A: For about two years.", translation: "R: Por unos dos años." },
                { text: "Q: How well do you speak English?", translation: "P: ¿Qué tan bien hablas inglés?" },
                { text: "A: I speak quite well, but I am practicing.", translation: "R: Hablo bastante bien, pero estoy practicando." },
                { text: "Q: How good are you at video games?", translation: "P: ¿Qué tan bueno eres en los videojuegos?" },
                { text: "A: I am very good!", translation: "R: ¡Soy muy bueno!" }
            ]
        },
        {
            taskDescription: 'Describe family life & Personal Info',
            phrases: [
                { text: "Q: Who do you live with?", translation: "P: ¿Con quién vives?" },
                { text: "A: I live with my mother (the tutor) and my sister (the analyst).", translation: "R: Vivo con mi madre (la tutora) y mi hermana (la analista)." },
                { text: "Q: Tell me about your father.", translation: "P: Háblame de tu padre." },
                { text: "A: He is an entrepreneur. He sells motorcycle accessories.", translation: "R: Él es emprendedor. Vende accesorios para motos." },
                { text: "Q: Where are you based?", translation: "P: ¿Dónde estás ubicado?" },
                { text: "A: I am based in Colombia, working for BBVA Peru.", translation: "R: Estoy basado en Colombia, trabajando para BBVA Perú." }
            ]
        }
      ]
    },
    {
      id: 'quiz-2',
      name: 'Oral Quiz 2: Past Events',
      description: 'Assessment focused on past tenses and describing environments.',
      tasks: [
        'Describe a past holiday.',
        'Talk about your last weekend.',
        'Describe your home or city.'
      ],
      examples: [
          {
              taskDescription: 'Describe a past holiday',
              phrases: [
                  { text: "Last year, I went to Santa Marta.", translation: "El año pasado fui a Santa Marta." },
                  { text: "It was sunny and beautiful.", translation: "Estaba soleado y hermoso." },
                  { text: "We stayed in a hotel near the beach.", translation: "Nos alojamos en un hotel cerca de la playa." }
              ]
          }
      ]
    },
    {
      id: 'quiz-3',
      name: 'Oral Quiz 3: Future & Food',
      description: 'Final A1 assessment covering future plans and food vocabulary.',
      tasks: [
        'Talk about plans for next weekend.',
        'Order food at a restaurant.',
        'Talk about likes and dislikes regarding food.'
      ],
      examples: [
          {
              taskDescription: 'Talk about plans for next weekend',
              phrases: [
                  { text: "I am going to visit my grandmother.", translation: "Voy a visitar a mi abuela." },
                  { text: "We are going to watch a movie on Saturday.", translation: "Vamos a ver una película el sábado." }
              ]
          }
      ]
    }
  ],
  [EnglishLevel.A2]: [
    {
      id: 'quiz-1',
      name: 'Oral Quiz 1: A2 Placeholder',
      description: 'A2 First Assessment content pending.',
      tasks: [
        'Task 1 placeholder',
        'Task 2 placeholder'
      ],
      examples: []
    }
  ],
  [EnglishLevel.B1]: [],
  [EnglishLevel.B2]: [],
  [EnglishLevel.C1]: [],
};
