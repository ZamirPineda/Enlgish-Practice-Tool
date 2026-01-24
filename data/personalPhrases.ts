
import { PersonalCategory } from '../types';

export const personalPhrasesData: PersonalCategory[] = [
  {
    title: 'Long Form / Monologues',
    scripts: [
      {
        id: 'sister-monologue',
        question: 'Describe your sister.',
        context: 'Describing a family member in detail (Appearance, Habits, Job)',
        formal: "I’m going to write about my sister. She is a woman who usually wears sports clothes because she is a fitness enthusiast. She is an amiable and quick-witted person; she is also very responsible and disciplined in the gym and regarding her healthy habits. She has long curly brown hair and fair skin. Regarding her professional background, she works as a business management analyst in a construction company. Not only is she a dedicated professional, but she also finds time to improve her English with me at Smart. She has a profound impact on me; furthermore, she helps me work on my social skills and teaches me how to maintain a better routine.",
        casual: "I want to talk about my sister. She's a total fitness enthusiast, so she's usually in activewear. She's super friendly and sharp-witted. She's also incredibly disciplined with the gym and her health. She's got long, curly brown hair and fair skin. Work-wise, she's a business analyst at a construction firm. But she's not just about work; she also makes time to practice English with me at Smart. She's had a huge impact on me—she helps me with my social skills and shows me how to keep a solid routine.",
        nativeTip: "Try the 'Casual' version to sound less academic. Phrases like 'total fitness enthusiast' and 'work-wise' sound very natural."
      }
    ]
  },
  {
    title: 'Identity & Professional Life',
    scripts: [
      {
        id: 'intro-zamir',
        question: 'Tell me about yourself.',
        context: 'General introduction',
        formal: "My name is Zamir Pineda. I'm a 23-year-old Software Engineer based in Bogotá. I currently work remotely for EPAM-Neoris, supporting BBVA Peru.",
        casual: "I'm Zamir! I'm 23 and I live in Bogotá. I work as a dev for a company called EPAM, but my client is actually a bank in Peru, so I work 100% remotely.",
        nativeTip: "Use 'based in' to sound professional about your location. Mentioning '100% remote' is a very common talking point in tech."
      },
      {
        id: 'job-role',
        question: 'What is your current role and focus?',
        context: 'Professional background',
        formal: "I am a Software Engineer focused on backend systems using Java. I am also currently studying Systems Engineering at EAN University, in my fifth semester.",
        casual: "I'm a software engineer, mostly doing backend in Java. I'm still a student too, in my 5th semester at EAN. It's a bit of a juggle!",
        nativeTip: "To 'juggle' things means to handle multiple responsibilities at once."
      },
      {
        id: 'tech-stack',
        question: 'What technologies are you interested in?',
        context: 'Technical interests',
        formal: "I have a strong background in Java, but I am looking to expand into JavaScript and TypeScript. I am particularly fascinated by distributed systems architecture using tools like Kafka, Spark, and Hadoop.",
        casual: "I've been doing Java for a while, but I really want to get into TS and JS. I'm also super geeky about distributed systems—Kafka, Hadoop, all that big data stuff.",
        nativeTip: "Using 'super geeky about' shows passion in a casual way."
      },
      {
        id: 'career-goals',
        question: 'Where do you see yourself in 5 years?',
        context: 'Future aspirations',
        formal: "I aim to become a Lead Architect or Technical Lead. I plan to specialize in Cloud and DevSecOps while contributing to the open-source community.",
        casual: "I want to be a Lead Architect. I'm working towards leading teams and maybe contributing more to open source projects.",
        nativeTip: "To 'contribute to open source' is a standard phrase in the tech industry."
      }
    ]
  },
  {
    title: 'Family & Inner Circle',
    scripts: [
      {
        id: 'family-home',
        question: 'Who do you live with?',
        context: 'Home life',
        formal: "I live in an apartment with my mother, Ligia, and my sister, Wendy. We also have a pug named Tammys.",
        casual: "I'm at home with my mom and one of my sisters. And of course, our dog Tammys—she's a pug and she's basically the boss of the house.",
        nativeTip: "Calling a pet 'the boss of the house' is a common, humorous way to show they are loved."
      },
      {
        id: 'parents-desc',
        question: 'Tell me about your parents.',
        context: 'Describing family personality',
        formal: "My mother is a disciplined teacher, though she can be a bit scattered sometimes. My father, Ricardo, is a serious and disciplined entrepreneur who sells motorcycle accessories.",
        casual: "My mom is super disciplined but a bit of a scatterbrain sometimes—she's a teacher. My dad is more serious; he runs his own business selling bike gear.",
        nativeTip: "'Scatterbrain' is a friendly way to say someone is 'dispersa' or forgets small things easily."
      },
      {
        id: 'sisters-desc',
        question: 'Do you have any siblings?',
        context: 'Talking about sisters',
        formal: "I have two older sisters. Jessica is a lawyer and lives nearby with her husband. Wendy is a Business Management Analyst who lives with me and works hybrid.",
        casual: "I've got two big sisters. Jessica's a lawyer and lives 5 minutes away. Wendy's an analyst; she's home some days and at the office others.",
        nativeTip: "Use 'big sister' instead of 'older sister' in casual conversation for a more natural feel."
      },
      {
        id: 'friends-context',
        question: 'Tell me about your friends.',
        context: 'Social circle',
        formal: "I have a small circle of close friends. One of them, Diego, lives in Brazil, which is why I am interested in learning Portuguese.",
        casual: "I have a tight circle of about 3 friends. They all have partners, so planning is hard! My friend Diego is in Brazil, so that's why I want to learn Portuguese.",
        nativeTip: "'Tight circle' implies a small group of very close friends."
      }
    ]
  },
  {
    title: 'Lifestyle, Hobbies & Tastes',
    scripts: [
      {
        id: 'gaming-hobby',
        question: 'What do you do in your free time?',
        context: 'Talking about gaming',
        formal: "I enjoy playing video games such as League of Legends or Warframe with friends, primarily to relax.",
        casual: "I'm not a 'hardcore gamer,' but I love jumping on LoL or Warframe with my buddies just to blow off some steam.",
        nativeTip: "To 'blow off some steam' means to release stress."
      },
      {
        id: 'running-goal',
        question: 'Do you enjoy sports?',
        context: 'Running and MMB 2026',
        formal: "I've recently started running. I have registered for the Bogotá Half Marathon (MMB) in 2026 to complete the 10K race.",
        casual: "I'm getting into running! I'm not the fastest yet, but I already signed up for the 10K at the MMB in 2026. It gives me a clear goal.",
        nativeTip: "Saying you are 'getting into' something means you are becoming interested in a new hobby."
      },
      {
        id: 'food-preferences',
        question: 'What is your favorite food?',
        context: 'Specific local tastes',
        formal: "I particularly enjoy burgers, specifically the 'Todoterreno' from El Corral, preferably with pineapple and no mayonnaise.",
        casual: "I'm a huge fan of burgers. There's this place called El Corral—I always get the 'Todoterreno' with extra pineapple. It's a beast!",
        nativeTip: "Calling a large meal 'a beast' is slang for something impressively big."
      },
      {
        id: 'pizza-preference',
        question: 'Do you like pizza?',
        context: 'Controversial toppings',
        formal: "I actually enjoy Hawaiian pizza. My favorite place is a local spot in the Kennedy neighborhood where I grew up.",
        casual: "Unpopular opinion: I love pineapple on pizza! There's this spot in Kennedy with cheese-stuffed crust that is just the best.",
        nativeTip: "'Unpopular opinion' is a trendy way to introduce a preference others might disagree with."
      },
      {
        id: 'music-taste',
        question: 'What kind of music do you like?',
        context: 'Gym playlist vs Stats',
        formal: "I don't have a specific genre. I listen to Brazilian Phonk remixes for the gym, but I also listen to popular hits like Bad Bunny occasionally.",
        casual: "My Spotify is all over the place. I mostly listen to 2-hour Brazilian Punk remixes for the gym. It keeps me going!",
        nativeTip: "'All over the place' means varied or not consistent."
      },
      {
        id: 'entertainment',
        question: 'Movies or Series?',
        context: 'Viewing habits',
        formal: "I prefer watching series I have already seen, like Rick and Morty, so I don't have to concentrate too much. I only watch movies at the cinema for the experience.",
        casual: "Honestly, I just re-watch stuff like Rick and Morty or old anime. If I'm at home, I don't want to think too hard. I only do movies at the theater.",
        nativeTip: "'Re-watch' is the verb for watching something again."
      },
      {
        id: 'animals',
        question: 'What is your favorite animal?',
        context: 'Otters and Raccoons',
        formal: "I admire otters and raccoons because they are highly intelligent and adaptable animals.",
        casual: "I love otters and raccoons. They aren't the usual choice, but I think their adaptability is super cool.",
        nativeTip: "'Not the usual choice' acknowledges that these aren't standard pets like dogs or cats."
      }
    ]
  },
  {
    title: 'Travel & Future Plans',
    scripts: [
      {
        id: 'travel-history',
        question: 'Have you traveled much?',
        context: 'Travel experience',
        formal: "I haven't traveled internationally yet. I have visited Cali by plane and taken bus trips to Villa de Leyva and Ricaurte.",
        casual: "I haven't left Colombia yet. Actually, I've never seen the ocean! I've mostly done bus trips to places like Villa de Leyva.",
        nativeTip: "Adding 'Actually' emphasizes a surprising fact (like never seeing the ocean)."
      },
      {
        id: 'language-goals',
        question: 'What languages do you want to learn?',
        context: 'Future learning',
        formal: "After English, I am interested in learning Portuguese, and perhaps an Asian language like Chinese or Korean.",
        casual: "Once I'm done with English, I'm definitely tackling Portuguese. Maybe Chinese or Korean later if I'm feeling brave.",
        nativeTip: "'Tackling' a language implies taking on the challenge of learning it."
      }
    ]
  },
  {
    title: 'Mindset & Affirmations',
    scripts: [
      {
        id: 'personal-motto',
        question: 'Do you have a personal motto?',
        context: 'Core value',
        formal: "My motto is: If I can do it once, I can do it a thousand times better.",
        casual: "I always tell myself: If I can do it once, I can do it 1000 times better. It keeps me improving.",
        nativeTip: "'Motto' is a short sentence or phrase that expresses a rule for sensible behavior."
      },
      {
        id: 'presentation-confidence',
        question: 'Script: Before a Presentation',
        context: 'Self-talk for confidence',
        formal: "What I have to say is valuable. I will deliver this with safety, clarity, and confidence.",
        casual: "What I'm about to say is worth it! I'm just going to let it flow with confidence. I got this.",
        nativeTip: "'I got this' is the ultimate casual mantra for self-confidence."
      },
      {
        id: 'stress-management',
        question: 'Script: Facing Stress',
        context: 'Calming down',
        formal: "I am taking a deep breath. I decide how to react, and I can manage this situation effectively.",
        casual: "Relax, deep breath. I decide how I react to this. It's under control.",
        nativeTip: "Short, punchy sentences work best for self-talk."
      },
      {
        id: 'feedback-response',
        question: 'Script: Receiving Criticism',
        context: 'Handling feedback',
        formal: "This is feedback for growth, not a final verdict. I will take what helps me improve and discard the rest.",
        casual: "It's just feedback, not a verdict. I'll take the useful bits to grow and ignore the rest.",
        nativeTip: "Using 'bits' is a very native way to refer to specific parts of information."
      }
    ]
  }
];
