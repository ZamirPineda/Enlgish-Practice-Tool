export type TriviaCategory =
  | "history"
  | "geography"
  | "science"
  | "art_literature"
  | "sports"
  | "music"
  | "cinema_tv"
  | "technology"
  | "food_culture";

export type TriviaDifficulty = "easy" | "medium" | "hard";
export type TriviaLang = "en" | "es";

export interface TriviaQuestion {
  id: string;
  category: TriviaCategory;
  question_en: string;
  question_es: string;
  options_en: [string, string, string, string];
  options_es: [string, string, string, string];
  correctIndex: number;
  explanation_en?: string;
  explanation_es?: string;
  difficulty: TriviaDifficulty;
  funFact_en?: string;
  funFact_es?: string;
  /** ISO 3166-1 alpha-2 code for geography questions with a country answer */
  countryCode?: string;
}

export interface CountryInfo {
  name_en: string;
  name_es: string;
  flag: string;
  capital_en: string;
  capital_es: string;
  continent_en: string;
  continent_es: string;
  population: string;
  area_km2: string;
  lat: number;
  lng: number;
  funFacts_en: string[];
  funFacts_es: string[];
}

export const COUNTRY_INFO: Record<string, CountryInfo> = {
  AU: {
    name_en: "Australia",
    name_es: "Australia",
    flag: "🇦🇺",
    capital_en: "Canberra",
    capital_es: "Canberra",
    continent_en: "Oceania",
    continent_es: "Oceanía",
    population: "26M",
    area_km2: "7,692,024",
    lat: -25.27,
    lng: 133.78,
    funFacts_en: [
      "Home to the Great Barrier Reef",
      "Has more kangaroos than people",
      "The Outback covers 70% of the continent",
    ],
    funFacts_es: [
      "Hogar de la Gran Barrera de Coral",
      "Tiene más canguros que personas",
      "El Outback cubre el 70% del continente",
    ],
  },
  ID: {
    name_en: "Indonesia",
    name_es: "Indonesia",
    flag: "🇮🇩",
    capital_en: "Jakarta",
    capital_es: "Yakarta",
    continent_en: "Asia",
    continent_es: "Asia",
    population: "277M",
    area_km2: "1,904,569",
    lat: -0.79,
    lng: 113.92,
    funFacts_en: [
      "Largest archipelago with 17,000+ islands",
      "Home to Komodo dragons",
      "4th most populated country",
    ],
    funFacts_es: [
      "Mayor archipiélago con más de 17,000 islas",
      "Hogar de los dragones de Komodo",
      "4to país más poblado",
    ],
  },
  JP: {
    name_en: "Japan",
    name_es: "Japón",
    flag: "🇯🇵",
    capital_en: "Tokyo",
    capital_es: "Tokio",
    continent_en: "Asia",
    continent_es: "Asia",
    population: "125M",
    area_km2: "377,975",
    lat: 36.2,
    lng: 138.25,
    funFacts_en: [
      "Has over 6,800 islands",
      "Known for cherry blossoms (sakura)",
      "Invented instant ramen in 1958",
    ],
    funFacts_es: [
      "Tiene más de 6,800 islas",
      "Conocido por los cerezos en flor (sakura)",
      "Inventó el ramen instantáneo en 1958",
    ],
  },
  BR: {
    name_en: "Brazil",
    name_es: "Brasil",
    flag: "🇧🇷",
    capital_en: "Brasília",
    capital_es: "Brasilia",
    continent_en: "South America",
    continent_es: "Sudamérica",
    population: "215M",
    area_km2: "8,515,767",
    lat: -14.24,
    lng: -51.93,
    funFacts_en: [
      "Contains 60% of the Amazon rainforest",
      "5 FIFA World Cup titles",
      "Largest country in South America",
    ],
    funFacts_es: [
      "Contiene el 60% de la selva amazónica",
      "5 títulos de Copa Mundial FIFA",
      "País más grande de Sudamérica",
    ],
  },
  EG: {
    name_en: "Egypt",
    name_es: "Egipto",
    flag: "🇪🇬",
    capital_en: "Cairo",
    capital_es: "El Cairo",
    continent_en: "Africa",
    continent_es: "África",
    population: "104M",
    area_km2: "1,002,450",
    lat: 26.82,
    lng: 30.8,
    funFacts_en: [
      "Home to the Great Pyramid of Giza",
      "The Nile is the lifeline of the country",
      "Has one of the oldest civilizations",
    ],
    funFacts_es: [
      "Hogar de la Gran Pirámide de Giza",
      "El Nilo es la arteria vital del país",
      "Tiene una de las civilizaciones más antiguas",
    ],
  },
  RU: {
    name_en: "Russia",
    name_es: "Rusia",
    flag: "🇷🇺",
    capital_en: "Moscow",
    capital_es: "Moscú",
    continent_en: "Europe/Asia",
    continent_es: "Europa/Asia",
    population: "144M",
    area_km2: "17,098,242",
    lat: 61.52,
    lng: 105.32,
    funFacts_en: [
      "Largest country by area",
      "Spans 11 time zones",
      "Lake Baikal holds 20% of world's fresh water",
    ],
    funFacts_es: [
      "País más grande por superficie",
      "Abarca 11 zonas horarias",
      "El lago Baikal tiene el 20% del agua dulce del mundo",
    ],
  },
  IN: {
    name_en: "India",
    name_es: "India",
    flag: "🇮🇳",
    capital_en: "New Delhi",
    capital_es: "Nueva Delhi",
    continent_en: "Asia",
    continent_es: "Asia",
    population: "1,428M",
    area_km2: "3,287,263",
    lat: 20.59,
    lng: 78.96,
    funFacts_en: [
      "Most populous country since 2023",
      "Has 22 official languages",
      "Home to the Taj Mahal",
    ],
    funFacts_es: [
      "País más poblado desde 2023",
      "Tiene 22 idiomas oficiales",
      "Hogar del Taj Mahal",
    ],
  },
  CA: {
    name_en: "Canada",
    name_es: "Canadá",
    flag: "🇨🇦",
    capital_en: "Ottawa",
    capital_es: "Ottawa",
    continent_en: "North America",
    continent_es: "Norteamérica",
    population: "40M",
    area_km2: "9,984,670",
    lat: 56.13,
    lng: -106.35,
    funFacts_en: [
      "2nd largest country by area",
      "Has the longest coastline in the world",
      "Maple syrup capital of the world",
    ],
    funFacts_es: [
      "2do país más grande por superficie",
      "Tiene la costa más larga del mundo",
      "Capital mundial del jarabe de arce",
    ],
  },
  CL: {
    name_en: "Chile",
    name_es: "Chile",
    flag: "🇨🇱",
    capital_en: "Santiago",
    capital_es: "Santiago",
    continent_en: "South America",
    continent_es: "Sudamérica",
    population: "19M",
    area_km2: "756,102",
    lat: -35.68,
    lng: -71.54,
    funFacts_en: [
      "Longest country north-to-south",
      "Atacama is the driest desert",
      "Has Easter Island (Rapa Nui)",
    ],
    funFacts_es: [
      "País más largo de norte a sur",
      "El Atacama es el desierto más seco",
      "Tiene la Isla de Pascua (Rapa Nui)",
    ],
  },
  CN: {
    name_en: "China",
    name_es: "China",
    flag: "🇨🇳",
    capital_en: "Beijing",
    capital_es: "Pekín",
    continent_en: "Asia",
    continent_es: "Asia",
    population: "1,412M",
    area_km2: "9,596,961",
    lat: 35.86,
    lng: 104.2,
    funFacts_en: [
      "Built the Great Wall over 2,000 years",
      "Invented paper, gunpowder, and the compass",
      "3rd largest country by area",
    ],
    funFacts_es: [
      "Construyó la Gran Muralla en más de 2,000 años",
      "Inventó el papel, la pólvora y la brújula",
      "3er país más grande por superficie",
    ],
  },
  GR: {
    name_en: "Greece",
    name_es: "Grecia",
    flag: "🇬🇷",
    capital_en: "Athens",
    capital_es: "Atenas",
    continent_en: "Europe",
    continent_es: "Europa",
    population: "10.4M",
    area_km2: "131,957",
    lat: 39.07,
    lng: 21.82,
    funFacts_en: [
      "Birthplace of democracy and the Olympics",
      "Has over 6,000 islands",
      "One of the sunniest countries in Europe",
    ],
    funFacts_es: [
      "Cuna de la democracia y los Juegos Olímpicos",
      "Tiene más de 6,000 islas",
      "Uno de los países más soleados de Europa",
    ],
  },
  CO: {
    name_en: "Colombia",
    name_es: "Colombia",
    flag: "🇨🇴",
    capital_en: "Bogotá",
    capital_es: "Bogotá",
    continent_en: "South America",
    continent_es: "Sudamérica",
    population: "52M",
    area_km2: "1,141,748",
    lat: 4.57,
    lng: -74.3,
    funFacts_en: [
      "World's top emerald producer",
      "Has coastline on both Pacific and Atlantic",
      "Home to the colorful Caño Cristales river",
    ],
    funFacts_es: [
      "Mayor productor de esmeraldas del mundo",
      "Tiene costa en el Pacífico y el Atlántico",
      "Hogar del colorido río Caño Cristales",
    ],
  },
  IS: {
    name_en: "Iceland",
    name_es: "Islandia",
    flag: "🇮🇸",
    capital_en: "Reykjavik",
    capital_es: "Reikiavik",
    continent_en: "Europe",
    continent_es: "Europa",
    population: "372K",
    area_km2: "103,000",
    lat: 64.96,
    lng: -19.02,
    funFacts_en: [
      "Nearly 100% renewable energy",
      "Has no army",
      "Home to the world's oldest parliament (Althing)",
    ],
    funFacts_es: [
      "Casi 100% energía renovable",
      "No tiene ejército",
      "Hogar del parlamento más antiguo del mundo (Althing)",
    ],
  },
  MX: {
    name_en: "Mexico",
    name_es: "México",
    flag: "🇲🇽",
    capital_en: "Mexico City",
    capital_es: "Ciudad de México",
    continent_en: "North America",
    continent_es: "Norteamérica",
    population: "128M",
    area_km2: "1,964,375",
    lat: 23.63,
    lng: -102.55,
    funFacts_en: [
      "Home to ancient Mayan and Aztec civilizations",
      "World's largest Spanish-speaking country",
      "Has 35 UNESCO World Heritage sites",
    ],
    funFacts_es: [
      "Hogar de las antiguas civilizaciones maya y azteca",
      "País hispanohablante más grande del mundo",
      "Tiene 35 sitios del Patrimonio Mundial UNESCO",
    ],
  },
  NO: {
    name_en: "Norway",
    name_es: "Noruega",
    flag: "🇳🇴",
    capital_en: "Oslo",
    capital_es: "Oslo",
    continent_en: "Europe",
    continent_es: "Europa",
    population: "5.5M",
    area_km2: "385,207",
    lat: 60.47,
    lng: 8.47,
    funFacts_en: [
      "Famous for fjords and Northern Lights",
      "One of the highest standards of living",
      "Invented the cheese slicer",
    ],
    funFacts_es: [
      "Famoso por los fiordos y la aurora boreal",
      "Uno de los estándares de vida más altos",
      "Inventó el cortador de queso",
    ],
  },
};

export const TRIVIA_CATEGORY_LABEL: Record<
  TriviaCategory,
  { en: string; es: string; emoji: string }
> = {
  history: { en: "History", es: "Historia", emoji: "🏛️" },
  geography: { en: "Geography", es: "Geografía", emoji: "🌍" },
  science: { en: "Science", es: "Ciencia", emoji: "🔬" },
  art_literature: {
    en: "Art & Literature",
    es: "Arte y Literatura",
    emoji: "🎨",
  },
  sports: { en: "Sports", es: "Deportes", emoji: "⚽" },
  music: { en: "Music", es: "Música", emoji: "🎵" },
  cinema_tv: { en: "Cinema & TV", es: "Cine y TV", emoji: "🎬" },
  technology: { en: "Technology", es: "Tecnología", emoji: "💻" },
  food_culture: { en: "Food & Culture", es: "Comida y Cultura", emoji: "🍽️" },
};

export const ALL_TRIVIA_CATEGORIES: TriviaCategory[] = Object.keys(
  TRIVIA_CATEGORY_LABEL,
) as TriviaCategory[];

export const triviaQuestions: TriviaQuestion[] = [
  // ── History ──
  {
    id: "h_01",
    category: "history",
    difficulty: "easy",
    question_en: "In what year did World War II end?",
    question_es: "¿En qué año terminó la Segunda Guerra Mundial?",
    options_en: ["1943", "1945", "1947", "1950"],
    options_es: ["1943", "1945", "1947", "1950"],
    correctIndex: 1,
    explanation_en:
      "WWII ended in 1945 with Japan's surrender after the atomic bombings.",
    explanation_es:
      "La Segunda Guerra Mundial terminó en 1945 con la rendición de Japón tras las bombas atómicas.",
  },
  {
    id: "h_02",
    category: "history",
    difficulty: "medium",
    question_en: "Who was the first Emperor of Rome?",
    question_es: "¿Quién fue el primer emperador de Roma?",
    options_en: ["Julius Caesar", "Augustus", "Nero", "Caligula"],
    options_es: ["Julio César", "Augusto", "Nerón", "Calígula"],
    correctIndex: 1,
    explanation_en:
      "Augustus (Octavian) became the first Roman Emperor in 27 BC.",
    explanation_es:
      "Augusto (Octavio) se convirtió en el primer emperador romano en el 27 a.C.",
  },
  {
    id: "h_03",
    category: "history",
    difficulty: "hard",
    question_en: "The Treaty of Westphalia (1648) ended which conflict?",
    question_es: "El Tratado de Westfalia (1648) puso fin a qué conflicto?",
    options_en: [
      "Hundred Years' War",
      "Thirty Years' War",
      "Seven Years' War",
      "War of the Roses",
    ],
    options_es: [
      "Guerra de los Cien Años",
      "Guerra de los Treinta Años",
      "Guerra de los Siete Años",
      "Guerra de las Rosas",
    ],
    correctIndex: 1,
    explanation_en:
      "The Peace of Westphalia ended the devastating Thirty Years' War in Europe.",
    explanation_es:
      "La Paz de Westfalia puso fin a la devastadora Guerra de los Treinta Años en Europa.",
    funFact_en:
      "This treaty is considered the foundation of the modern nation-state system.",
    funFact_es:
      "Este tratado es considerado el fundamento del sistema moderno de estados-nación.",
  },
  {
    id: "h_04",
    category: "history",
    difficulty: "easy",
    question_en: "Who painted the Mona Lisa?",
    question_es: "¿Quién pintó la Mona Lisa?",
    options_en: ["Michelangelo", "Raphael", "Leonardo da Vinci", "Botticelli"],
    options_es: ["Miguel Ángel", "Rafael", "Leonardo da Vinci", "Botticelli"],
    correctIndex: 2,
    explanation_en:
      "Leonardo da Vinci painted the Mona Lisa between 1503 and 1519.",
    explanation_es: "Leonardo da Vinci pintó la Mona Lisa entre 1503 y 1519.",
  },
  {
    id: "h_05",
    category: "history",
    difficulty: "medium",
    question_en: "In which year did the Berlin Wall fall?",
    question_es: "¿En qué año cayó el Muro de Berlín?",
    options_en: ["1987", "1989", "1991", "1993"],
    options_es: ["1987", "1989", "1991", "1993"],
    correctIndex: 1,
    explanation_en: "The Berlin Wall fell on November 9, 1989.",
    explanation_es: "El Muro de Berlín cayó el 9 de noviembre de 1989.",
  },

  // ── Geography ──
  {
    id: "g_01",
    category: "geography",
    difficulty: "easy",
    question_en: "What is the longest river in the world?",
    question_es: "¿Cuál es el río más largo del mundo?",
    options_en: ["Amazon", "Nile", "Mississippi", "Yangtze"],
    options_es: ["Amazonas", "Nilo", "Mississippi", "Yangtsé"],
    correctIndex: 1,
    explanation_en:
      "The Nile River in Africa stretches approximately 6,650 km.",
    explanation_es:
      "El río Nilo en África se extiende aproximadamente 6,650 km.",
    funFact_en:
      "Some measurements suggest the Amazon might actually be longer!",
    funFact_es:
      "¡Algunas mediciones sugieren que el Amazonas podría ser más largo!",
  },
  {
    id: "g_02",
    category: "geography",
    difficulty: "easy",
    question_en: "What is the capital of Australia?",
    question_es: "¿Cuál es la capital de Australia?",
    options_en: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    options_es: ["Sídney", "Melbourne", "Canberra", "Brisbane"],
    correctIndex: 2,
    countryCode: "AU",
    explanation_en:
      "Canberra was purpose-built as the capital as a compromise between Sydney and Melbourne.",
    explanation_es:
      "Canberra fue construida a propósito como capital como un compromiso entre Sídney y Melbourne.",
  },
  {
    id: "g_03",
    category: "geography",
    difficulty: "medium",
    question_en: "Which country has the most volcanoes?",
    question_es: "¿Qué país tiene la mayor cantidad de volcanes?",
    options_en: ["Japan", "Iceland", "Indonesia", "Chile"],
    options_es: ["Japón", "Islandia", "Indonesia", "Chile"],
    correctIndex: 2,
    countryCode: "ID",
    explanation_en:
      "Indonesia has about 130 active volcanoes, the most in any country.",
    explanation_es:
      "Indonesia tiene alrededor de 130 volcanes activos, el mayor número de cualquier país.",
  },
  {
    id: "g_04",
    category: "geography",
    difficulty: "hard",
    question_en: "What is the driest inhabited continent?",
    question_es: "¿Cuál es el continente habitado más seco?",
    options_en: ["Africa", "Australia", "South America", "Asia"],
    options_es: ["África", "Australia", "Sudamérica", "Asia"],
    correctIndex: 1,
    countryCode: "AU",
    explanation_en:
      "Australia is the driest inhabited continent, with an average of only 460mm of rain per year.",
    explanation_es:
      "Australia es el continente habitado más seco, con un promedio de solo 460mm de lluvia al año.",
  },
  {
    id: "g_05",
    category: "geography",
    difficulty: "medium",
    question_en: "Which sea is the saltiest in the world?",
    question_es: "¿Cuál es el mar más salado del mundo?",
    options_en: ["Red Sea", "Dead Sea", "Caspian Sea", "Mediterranean Sea"],
    options_es: ["Mar Rojo", "Mar Muerto", "Mar Caspio", "Mar Mediterráneo"],
    correctIndex: 1,
    explanation_en:
      "The Dead Sea has a salinity of about 34%, nearly 10 times saltier than the ocean.",
    explanation_es:
      "El Mar Muerto tiene una salinidad de aproximadamente 34%, casi 10 veces más salado que el océano.",
  },

  // ── Science ──
  {
    id: "s_01",
    category: "science",
    difficulty: "easy",
    question_en: "What planet is known as the Red Planet?",
    question_es: "¿Qué planeta es conocido como el Planeta Rojo?",
    options_en: ["Venus", "Mars", "Jupiter", "Saturn"],
    options_es: ["Venus", "Marte", "Júpiter", "Saturno"],
    correctIndex: 1,
    explanation_en: "Mars appears red due to iron oxide (rust) on its surface.",
    explanation_es:
      "Marte se ve rojo debido al óxido de hierro (herrumbre) en su superficie.",
  },
  {
    id: "s_02",
    category: "science",
    difficulty: "medium",
    question_en: "What is the smallest bone in the human body?",
    question_es: "¿Cuál es el hueso más pequeño del cuerpo humano?",
    options_en: ["Hammer", "Stirrup", "Anvil", "Kneecap"],
    options_es: ["Martillo", "Estribo", "Yunque", "Rótula"],
    correctIndex: 1,
    explanation_en: "The stapes (stirrup) in the middle ear is about 3mm long.",
    explanation_es: "El estribo en el oído medio mide unos 3mm de largo.",
  },
  {
    id: "s_03",
    category: "science",
    difficulty: "hard",
    question_en: "What is the half-life of Carbon-14?",
    question_es: "¿Cuál es la vida media del Carbono-14?",
    options_en: ["1,000 years", "5,730 years", "12,000 years", "50,000 years"],
    options_es: ["1,000 años", "5,730 años", "12,000 años", "50,000 años"],
    correctIndex: 1,
    explanation_en:
      "Carbon-14 has a half-life of approximately 5,730 years, used for radiocarbon dating.",
    explanation_es:
      "El Carbono-14 tiene una vida media de aproximadamente 5,730 años, usado para datación por radiocarbono.",
  },
  {
    id: "s_04",
    category: "science",
    difficulty: "easy",
    question_en: "What gas do plants absorb from the atmosphere?",
    question_es: "¿Qué gas absorben las plantas de la atmósfera?",
    options_en: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    options_es: ["Oxígeno", "Nitrógeno", "Dióxido de Carbono", "Hidrógeno"],
    correctIndex: 2,
    explanation_en:
      "Plants absorb CO₂ during photosynthesis and release oxygen.",
    explanation_es:
      "Las plantas absorben CO₂ durante la fotosíntesis y liberan oxígeno.",
  },
  {
    id: "s_05",
    category: "science",
    difficulty: "medium",
    question_en: "How many chromosomes do humans have?",
    question_es: "¿Cuántos cromosomas tienen los humanos?",
    options_en: ["23", "44", "46", "48"],
    options_es: ["23", "44", "46", "48"],
    correctIndex: 2,
    explanation_en: "Humans have 46 chromosomes (23 pairs).",
    explanation_es: "Los humanos tienen 46 cromosomas (23 pares).",
  },

  // ── Art & Literature ──
  {
    id: "al_01",
    category: "art_literature",
    difficulty: "easy",
    question_en: "Who wrote 'Romeo and Juliet'?",
    question_es: "¿Quién escribió 'Romeo y Julieta'?",
    options_en: [
      "Charles Dickens",
      "William Shakespeare",
      "Jane Austen",
      "Mark Twain",
    ],
    options_es: [
      "Charles Dickens",
      "William Shakespeare",
      "Jane Austen",
      "Mark Twain",
    ],
    correctIndex: 1,
    explanation_en: "Shakespeare wrote Romeo and Juliet around 1594-1596.",
    explanation_es:
      "Shakespeare escribió Romeo y Julieta alrededor de 1594-1596.",
  },
  {
    id: "al_02",
    category: "art_literature",
    difficulty: "medium",
    question_en: "Which artist cut off part of his own ear?",
    question_es: "¿Qué artista se cortó parte de su propia oreja?",
    options_en: ["Picasso", "Monet", "Van Gogh", "Dalí"],
    options_es: ["Picasso", "Monet", "Van Gogh", "Dalí"],
    correctIndex: 2,
    explanation_en:
      "Vincent van Gogh cut off part of his left ear in December 1888.",
    explanation_es:
      "Vincent van Gogh se cortó parte de su oreja izquierda en diciembre de 1888.",
  },
  {
    id: "al_03",
    category: "art_literature",
    difficulty: "hard",
    question_en: "Who wrote 'One Hundred Years of Solitude'?",
    question_es: "¿Quién escribió 'Cien Años de Soledad'?",
    options_en: [
      "Mario Vargas Llosa",
      "Gabriel García Márquez",
      "Jorge Luis Borges",
      "Pablo Neruda",
    ],
    options_es: [
      "Mario Vargas Llosa",
      "Gabriel García Márquez",
      "Jorge Luis Borges",
      "Pablo Neruda",
    ],
    correctIndex: 1,
    explanation_en:
      "Gabriel García Márquez published this masterpiece of magical realism in 1967.",
    explanation_es:
      "Gabriel García Márquez publicó esta obra maestra del realismo mágico en 1967.",
    funFact_en:
      "It has been translated into 46 languages and sold over 50 million copies.",
    funFact_es:
      "Ha sido traducida a 46 idiomas y ha vendido más de 50 millones de copias.",
  },
  {
    id: "al_04",
    category: "art_literature",
    difficulty: "medium",
    question_en: "The Sistine Chapel ceiling was painted by whom?",
    question_es: "¿Quién pintó el techo de la Capilla Sixtina?",
    options_en: ["Raphael", "Michelangelo", "Leonardo da Vinci", "Caravaggio"],
    options_es: ["Rafael", "Miguel Ángel", "Leonardo da Vinci", "Caravaggio"],
    correctIndex: 1,
    explanation_en:
      "Michelangelo painted the Sistine Chapel ceiling between 1508 and 1512.",
    explanation_es:
      "Miguel Ángel pintó el techo de la Capilla Sixtina entre 1508 y 1512.",
  },

  // ── Sports ──
  {
    id: "sp_01",
    category: "sports",
    difficulty: "easy",
    question_en: "How many players are on a soccer/football team on the field?",
    question_es: "¿Cuántos jugadores tiene un equipo de fútbol en el campo?",
    options_en: ["9", "10", "11", "12"],
    options_es: ["9", "10", "11", "12"],
    correctIndex: 2,
    explanation_en:
      "Each team has 11 players on the field, including the goalkeeper.",
    explanation_es:
      "Cada equipo tiene 11 jugadores en el campo, incluyendo al portero.",
  },
  {
    id: "sp_02",
    category: "sports",
    difficulty: "medium",
    question_en: "In which country were the first modern Olympic Games held?",
    question_es:
      "¿En qué país se celebraron los primeros Juegos Olímpicos modernos?",
    options_en: ["France", "Greece", "Italy", "England"],
    options_es: ["Francia", "Grecia", "Italia", "Inglaterra"],
    correctIndex: 1,
    explanation_en:
      "The first modern Olympics were held in Athens, Greece in 1896.",
    explanation_es:
      "Los primeros Juegos Olímpicos modernos se celebraron en Atenas, Grecia en 1896.",
  },
  {
    id: "sp_03",
    category: "sports",
    difficulty: "hard",
    question_en: "Which country has won the most FIFA World Cups?",
    question_es: "¿Qué país ha ganado más Copas Mundiales de la FIFA?",
    options_en: ["Germany", "Italy", "Argentina", "Brazil"],
    options_es: ["Alemania", "Italia", "Argentina", "Brasil"],
    correctIndex: 3,
    explanation_en:
      "Brazil has won 5 World Cups (1958, 1962, 1970, 1994, 2002).",
    explanation_es:
      "Brasil ha ganado 5 Copas Mundiales (1958, 1962, 1970, 1994, 2002).",
  },
  {
    id: "sp_04",
    category: "sports",
    difficulty: "easy",
    question_en: "How many rings are on the Olympic flag?",
    question_es: "¿Cuántos anillos tiene la bandera olímpica?",
    options_en: ["3", "4", "5", "6"],
    options_es: ["3", "4", "5", "6"],
    correctIndex: 2,
    explanation_en:
      "The five rings represent the five continents united by the Olympic spirit.",
    explanation_es:
      "Los cinco anillos representan los cinco continentes unidos por el espíritu olímpico.",
  },

  // ── Music ──
  {
    id: "m_01",
    category: "music",
    difficulty: "easy",
    question_en: "Which band released the album 'Abbey Road'?",
    question_es: "¿Qué banda lanzó el álbum 'Abbey Road'?",
    options_en: [
      "The Rolling Stones",
      "The Beatles",
      "Led Zeppelin",
      "Pink Floyd",
    ],
    options_es: [
      "The Rolling Stones",
      "The Beatles",
      "Led Zeppelin",
      "Pink Floyd",
    ],
    correctIndex: 1,
    explanation_en:
      "The Beatles released Abbey Road in 1969, their final recorded album.",
    explanation_es:
      "Los Beatles lanzaron Abbey Road en 1969, su último álbum grabado.",
  },
  {
    id: "m_02",
    category: "music",
    difficulty: "medium",
    question_en: "What instrument does a pianist play?",
    question_es: "¿Qué instrumento toca un pianista?",
    options_en: ["Organ", "Piano", "Harpsichord", "Accordion"],
    options_es: ["Órgano", "Piano", "Clavicémbalo", "Acordeón"],
    correctIndex: 1,
    explanation_en:
      "A pianist plays the piano, one of the most versatile instruments.",
    explanation_es:
      "Un pianista toca el piano, uno de los instrumentos más versátiles.",
  },
  {
    id: "m_03",
    category: "music",
    difficulty: "hard",
    question_en: "Which composer went deaf but continued composing?",
    question_es: "¿Qué compositor se quedó sordo pero siguió componiendo?",
    options_en: ["Mozart", "Bach", "Beethoven", "Chopin"],
    options_es: ["Mozart", "Bach", "Beethoven", "Chopin"],
    correctIndex: 2,
    explanation_en:
      "Beethoven began losing his hearing around age 26 and was nearly deaf by 44.",
    explanation_es:
      "Beethoven comenzó a perder la audición alrededor de los 26 años y estaba casi sordo a los 44.",
    funFact_en:
      "He composed his famous 9th Symphony while almost completely deaf!",
    funFact_es:
      "¡Compuso su famosa 9ª Sinfonía estando casi completamente sordo!",
  },
  {
    id: "m_04",
    category: "music",
    difficulty: "medium",
    question_en: "What genre of music originated in New Orleans?",
    question_es: "¿Qué género musical se originó en Nueva Orleans?",
    options_en: ["Blues", "Jazz", "Rock", "Country"],
    options_es: ["Blues", "Jazz", "Rock", "Country"],
    correctIndex: 1,
    explanation_en:
      "Jazz originated in New Orleans in the early 20th century from African American communities.",
    explanation_es:
      "El Jazz se originó en Nueva Orleans a principios del siglo XX en las comunidades afroamericanas.",
  },

  // ── Cinema & TV ──
  {
    id: "c_01",
    category: "cinema_tv",
    difficulty: "easy",
    question_en: "Which movie features the character 'Jack Dawson'?",
    question_es: "¿En qué película aparece el personaje 'Jack Dawson'?",
    options_en: ["The Great Gatsby", "Titanic", "Inception", "The Revenant"],
    options_es: ["El Gran Gatsby", "Titanic", "El Origen", "El Renacido"],
    correctIndex: 1,
    explanation_en: "Leonardo DiCaprio played Jack Dawson in Titanic (1997).",
    explanation_es:
      "Leonardo DiCaprio interpretó a Jack Dawson en Titanic (1997).",
  },
  {
    id: "c_02",
    category: "cinema_tv",
    difficulty: "medium",
    question_en: "Who directed the movie 'Pulp Fiction'?",
    question_es: "¿Quién dirigió la película 'Pulp Fiction'?",
    options_en: [
      "Martin Scorsese",
      "Quentin Tarantino",
      "Steven Spielberg",
      "Christopher Nolan",
    ],
    options_es: [
      "Martin Scorsese",
      "Quentin Tarantino",
      "Steven Spielberg",
      "Christopher Nolan",
    ],
    correctIndex: 1,
    explanation_en:
      "Quentin Tarantino directed Pulp Fiction, released in 1994.",
    explanation_es:
      "Quentin Tarantino dirigió Pulp Fiction, estrenada en 1994.",
  },
  {
    id: "c_03",
    category: "cinema_tv",
    difficulty: "hard",
    question_en: "What was the first feature-length animated film?",
    question_es: "¿Cuál fue el primer largometraje de animación?",
    options_en: [
      "Fantasia",
      "Snow White and the Seven Dwarfs",
      "Pinocchio",
      "Bambi",
    ],
    options_es: [
      "Fantasía",
      "Blancanieves y los siete enanitos",
      "Pinocho",
      "Bambi",
    ],
    correctIndex: 1,
    explanation_en:
      "Snow White and the Seven Dwarfs (1937) was Disney's first feature-length animated film.",
    explanation_es:
      "Blancanieves y los siete enanitos (1937) fue el primer largometraje animado de Disney.",
  },
  {
    id: "c_04",
    category: "cinema_tv",
    difficulty: "easy",
    question_en: "In which fictional universe do Jedi and Sith exist?",
    question_es: "¿En qué universo ficticio existen los Jedi y los Sith?",
    options_en: ["Star Trek", "Star Wars", "Lord of the Rings", "Marvel"],
    options_es: ["Star Trek", "Star Wars", "El Señor de los Anillos", "Marvel"],
    correctIndex: 1,
  },

  // ── Technology ──
  {
    id: "t_01",
    category: "technology",
    difficulty: "easy",
    question_en: "Who co-founded Apple Inc.?",
    question_es: "¿Quién cofundó Apple Inc.?",
    options_en: ["Bill Gates", "Steve Jobs", "Elon Musk", "Mark Zuckerberg"],
    options_es: ["Bill Gates", "Steve Jobs", "Elon Musk", "Mark Zuckerberg"],
    correctIndex: 1,
    explanation_en:
      "Steve Jobs co-founded Apple in 1976 with Steve Wozniak and Ronald Wayne.",
    explanation_es:
      "Steve Jobs cofundó Apple en 1976 con Steve Wozniak y Ronald Wayne.",
  },
  {
    id: "t_02",
    category: "technology",
    difficulty: "medium",
    question_en: "What does HTTP stand for?",
    question_es: "¿Qué significa HTTP?",
    options_en: [
      "HyperText Transfer Protocol",
      "High Tech Transfer Protocol",
      "Hyper Transfer Text Protocol",
      "Home Tool Transfer Protocol",
    ],
    options_es: [
      "Protocolo de Transferencia de HiperTexto",
      "Protocolo de Transferencia de Alta Tecnología",
      "Protocolo de Texto de Hiper Transferencia",
      "Protocolo de Transferencia de Herramientas",
    ],
    correctIndex: 0,
    explanation_en:
      "HTTP is the foundation of data communication on the World Wide Web.",
    explanation_es:
      "HTTP es la base de la comunicación de datos en la World Wide Web.",
  },
  {
    id: "t_03",
    category: "technology",
    difficulty: "hard",
    question_en: "In what year was the first email sent?",
    question_es: "¿En qué año se envió el primer correo electrónico?",
    options_en: ["1965", "1971", "1978", "1983"],
    options_es: ["1965", "1971", "1978", "1983"],
    correctIndex: 1,
    explanation_en: "Ray Tomlinson sent the first email in 1971 using ARPANET.",
    explanation_es:
      "Ray Tomlinson envió el primer correo electrónico en 1971 usando ARPANET.",
    funFact_en: "He also introduced the @ symbol for email addresses!",
    funFact_es:
      "¡También introdujo el símbolo @ para las direcciones de correo electrónico!",
  },
  {
    id: "t_04",
    category: "technology",
    difficulty: "easy",
    question_en: "What does 'AI' stand for?",
    question_es: "¿Qué significa 'IA'?",
    options_en: [
      "Automated Intelligence",
      "Artificial Intelligence",
      "Advanced Internet",
      "Applied Innovation",
    ],
    options_es: [
      "Inteligencia Automatizada",
      "Inteligencia Artificial",
      "Internet Avanzado",
      "Innovación Aplicada",
    ],
    correctIndex: 1,
  },

  // ── Food & Culture ──
  {
    id: "fc_01",
    category: "food_culture",
    difficulty: "easy",
    question_en: "What country is sushi originally from?",
    question_es: "¿De qué país es originario el sushi?",
    options_en: ["China", "Korea", "Japan", "Thailand"],
    options_es: ["China", "Corea", "Japón", "Tailandia"],
    correctIndex: 2,
    explanation_en:
      "Sushi originated in Japan as a way of preserving fish in fermented rice.",
    explanation_es:
      "El sushi se originó en Japón como una forma de preservar pescado en arroz fermentado.",
  },
  {
    id: "fc_02",
    category: "food_culture",
    difficulty: "medium",
    question_en: "What is the main ingredient in guacamole?",
    question_es: "¿Cuál es el ingrediente principal del guacamole?",
    options_en: ["Tomato", "Avocado", "Lime", "Cilantro"],
    options_es: ["Tomate", "Aguacate", "Lima", "Cilantro"],
    correctIndex: 1,
    explanation_en:
      "Guacamole is made primarily from mashed avocado, originating from Aztec cuisine.",
    explanation_es:
      "El guacamole se hace principalmente de aguacate machacado, originario de la gastronomía azteca.",
  },
  {
    id: "fc_03",
    category: "food_culture",
    difficulty: "hard",
    question_en: "Which spice is the most expensive in the world by weight?",
    question_es: "¿Cuál es la especia más cara del mundo por peso?",
    options_en: ["Vanilla", "Saffron", "Cardamom", "Truffle"],
    options_es: ["Vainilla", "Azafrán", "Cardamomo", "Trufa"],
    correctIndex: 1,
    explanation_en:
      "Saffron can cost up to $5,000 per pound due to the labor-intensive harvesting process.",
    explanation_es:
      "El azafrán puede costar hasta $5,000 por libra debido al proceso de recolección intensivo.",
    funFact_en:
      "It takes about 75,000 flowers to produce one pound of saffron!",
    funFact_es:
      "¡Se necesitan unas 75,000 flores para producir una libra de azafrán!",
  },
  {
    id: "fc_04",
    category: "food_culture",
    difficulty: "medium",
    question_en: "What is the national dish of Spain?",
    question_es: "¿Cuál es el plato nacional de España?",
    options_en: ["Tacos", "Paella", "Pizza", "Croissant"],
    options_es: ["Tacos", "Paella", "Pizza", "Croissant"],
    correctIndex: 1,
    explanation_en: "Paella is a rice dish originating from Valencia, Spain.",
    explanation_es:
      "La paella es un plato de arroz originario de Valencia, España.",
  },
  {
    id: "fc_05",
    category: "food_culture",
    difficulty: "easy",
    question_en: "What drink is traditionally associated with England?",
    question_es: "¿Qué bebida se asocia tradicionalmente con Inglaterra?",
    options_en: ["Coffee", "Tea", "Wine", "Beer"],
    options_es: ["Café", "Té", "Vino", "Cerveza"],
    correctIndex: 1,
    explanation_en:
      "Tea became a staple of British culture in the 17th century.",
    explanation_es:
      "El té se convirtió en un pilar de la cultura británica en el siglo XVII.",
  },
  // ── MORE Geography ──
  {
    id: "g_06",
    category: "geography",
    difficulty: "easy",
    question_en: "What is the largest country by area?",
    question_es: "¿Cuál es el país más grande por superficie?",
    options_en: ["Canada", "China", "Russia", "USA"],
    options_es: ["Canadá", "China", "Rusia", "EE.UU."],
    correctIndex: 2,
    countryCode: "RU",
    explanation_en:
      "Russia covers over 17 million km², spanning Europe and Asia.",
    explanation_es:
      "Rusia cubre más de 17 millones de km², abarcando Europa y Asia.",
  },
  {
    id: "g_07",
    category: "geography",
    difficulty: "easy",
    question_en: "On which continent is Egypt located?",
    question_es: "¿En qué continente se encuentra Egipto?",
    options_en: ["Asia", "Europe", "Africa", "South America"],
    options_es: ["Asia", "Europa", "África", "Sudamérica"],
    correctIndex: 2,
    countryCode: "EG",
    explanation_en:
      "Egypt is in northeastern Africa, bordering the Mediterranean Sea.",
    explanation_es:
      "Egipto está en el noreste de África, junto al mar Mediterráneo.",
  },
  {
    id: "g_08",
    category: "geography",
    difficulty: "medium",
    question_en: "What is the capital of Canada?",
    question_es: "¿Cuál es la capital de Canadá?",
    options_en: ["Toronto", "Vancouver", "Montreal", "Ottawa"],
    options_es: ["Toronto", "Vancouver", "Montreal", "Ottawa"],
    correctIndex: 3,
    countryCode: "CA",
    explanation_en: "Ottawa was chosen as capital by Queen Victoria in 1857.",
    explanation_es:
      "Ottawa fue elegida como capital por la Reina Victoria en 1857.",
  },
  {
    id: "g_09",
    category: "geography",
    difficulty: "hard",
    question_en: "Which South American country has the Atacama Desert?",
    question_es: "¿Qué país sudamericano tiene el desierto de Atacama?",
    options_en: ["Peru", "Chile", "Argentina", "Bolivia"],
    options_es: ["Perú", "Chile", "Argentina", "Bolivia"],
    correctIndex: 1,
    countryCode: "CL",
    explanation_en:
      "The Atacama in Chile is the driest non-polar desert on Earth.",
    explanation_es:
      "El Atacama en Chile es el desierto no polar más seco de la Tierra.",
  },
  {
    id: "g_10",
    category: "geography",
    difficulty: "easy",
    question_en: "Which country is known as the Land of the Rising Sun?",
    question_es: "¿Qué país es conocido como la Tierra del Sol Naciente?",
    options_en: ["China", "Japan", "Thailand", "South Korea"],
    options_es: ["China", "Japón", "Tailandia", "Corea del Sur"],
    correctIndex: 1,
    countryCode: "JP",
    explanation_en:
      "Japan's name (Nihon/Nippon) literally means 'origin of the sun'.",
    explanation_es:
      "El nombre de Japón (Nihon/Nippon) significa literalmente 'origen del sol'.",
  },
  {
    id: "g_11",
    category: "geography",
    difficulty: "medium",
    question_en: "What is the most populous country in South America?",
    question_es: "¿Cuál es el país más poblado de Sudamérica?",
    options_en: ["Argentina", "Colombia", "Brazil", "Peru"],
    options_es: ["Argentina", "Colombia", "Brasil", "Perú"],
    correctIndex: 2,
    countryCode: "BR",
    explanation_en: "Brazil has over 215 million inhabitants.",
    explanation_es: "Brasil tiene más de 215 millones de habitantes.",
  },
  {
    id: "g_12",
    category: "geography",
    difficulty: "medium",
    question_en: "Which European country has geysers and glaciers?",
    question_es: "¿Qué país europeo tiene géiseres y glaciares?",
    options_en: ["Norway", "Iceland", "Finland", "Scotland"],
    options_es: ["Noruega", "Islandia", "Finlandia", "Escocia"],
    correctIndex: 1,
    countryCode: "IS",
    explanation_en:
      "Iceland sits on the Mid-Atlantic Ridge and has both volcanic activity and glaciers.",
    explanation_es:
      "Islandia se encuentra sobre la dorsal mesoatlántica y tiene actividad volcánica y glaciares.",
  },
  {
    id: "g_13",
    category: "geography",
    difficulty: "hard",
    question_en: "The Great Wall of China is approximately how long?",
    question_es: "¿Cuánto mide aproximadamente la Gran Muralla China?",
    options_en: ["5,000 km", "10,000 km", "15,000 km", "21,000 km"],
    options_es: ["5,000 km", "10,000 km", "15,000 km", "21,000 km"],
    correctIndex: 3,
    countryCode: "CN",
    explanation_en:
      "Including all branches and sections, the Great Wall stretches about 21,196 km.",
    explanation_es:
      "Incluyendo ramificaciones y secciones, la Gran Muralla se extiende unos 21,196 km.",
  },
  {
    id: "g_14",
    category: "geography",
    difficulty: "easy",
    question_en: "What is the capital of Colombia?",
    question_es: "¿Cuál es la capital de Colombia?",
    options_en: ["Medellín", "Cali", "Bogotá", "Cartagena"],
    options_es: ["Medellín", "Cali", "Bogotá", "Cartagena"],
    correctIndex: 2,
    countryCode: "CO",
    explanation_en: "Bogotá sits at 2,640m elevation in the Andes mountains.",
    explanation_es: "Bogotá está a 2,640m de altitud en los Andes.",
  },
  {
    id: "g_15",
    category: "geography",
    difficulty: "medium",
    question_en: "Which country is famous for its fjords?",
    question_es: "¿Qué país es famoso por sus fiordos?",
    options_en: ["Sweden", "Denmark", "Norway", "Finland"],
    options_es: ["Suecia", "Dinamarca", "Noruega", "Finlandia"],
    correctIndex: 2,
    countryCode: "NO",
    explanation_en:
      "Norway's fjords were carved by glaciers and are a UNESCO World Heritage site.",
    explanation_es:
      "Los fiordos de Noruega fueron tallados por glaciares y son Patrimonio de la Humanidad UNESCO.",
  },
  {
    id: "g_16",
    category: "geography",
    difficulty: "hard",
    question_en: "Which country has the most UNESCO World Heritage sites?",
    question_es: "¿Qué país tiene más sitios del Patrimonio Mundial UNESCO?",
    options_en: ["China", "Italy", "Spain", "France"],
    options_es: ["China", "Italia", "España", "Francia"],
    correctIndex: 1,
    explanation_en:
      "Italy has 59 UNESCO World Heritage sites, the most in the world.",
    explanation_es:
      "Italia tiene 59 sitios del Patrimonio Mundial UNESCO, el mayor número del mundo.",
  },
  {
    id: "g_17",
    category: "geography",
    difficulty: "easy",
    question_en: "The Amazon rainforest is mostly in which country?",
    question_es:
      "¿En qué país se encuentra la mayor parte de la selva amazónica?",
    options_en: ["Peru", "Colombia", "Brazil", "Venezuela"],
    options_es: ["Perú", "Colombia", "Brasil", "Venezuela"],
    correctIndex: 2,
    countryCode: "BR",
    explanation_en: "About 60% of the Amazon is in Brazil.",
    explanation_es: "Aproximadamente el 60% del Amazonas está en Brasil.",
  },
  {
    id: "g_18",
    category: "geography",
    difficulty: "medium",
    question_en: "What country is home to the Taj Mahal?",
    question_es: "¿En qué país se encuentra el Taj Mahal?",
    options_en: ["Pakistan", "India", "Bangladesh", "Nepal"],
    options_es: ["Pakistán", "India", "Bangladesh", "Nepal"],
    correctIndex: 1,
    countryCode: "IN",
    explanation_en:
      "The Taj Mahal is in Agra, India, built between 1632 and 1653.",
    explanation_es:
      "El Taj Mahal está en Agra, India, construido entre 1632 y 1653.",
  },
  // ── MORE History ──
  {
    id: "h_06",
    category: "history",
    difficulty: "easy",
    question_en: "Who discovered America in 1492?",
    question_es: "¿Quién descubrió América en 1492?",
    options_en: [
      "Vasco da Gama",
      "Christopher Columbus",
      "Ferdinand Magellan",
      "Hernán Cortés",
    ],
    options_es: [
      "Vasco da Gama",
      "Cristóbal Colón",
      "Fernando de Magallanes",
      "Hernán Cortés",
    ],
    correctIndex: 1,
    explanation_en:
      "Christopher Columbus arrived in the Americas on October 12, 1492.",
    explanation_es:
      "Cristóbal Colón llegó a las Américas el 12 de octubre de 1492.",
  },
  {
    id: "h_07",
    category: "history",
    difficulty: "medium",
    question_en: "The French Revolution began in which year?",
    question_es: "¿En qué año comenzó la Revolución Francesa?",
    options_en: ["1776", "1789", "1804", "1815"],
    options_es: ["1776", "1789", "1804", "1815"],
    correctIndex: 1,
    explanation_en:
      "The French Revolution began with the storming of the Bastille on July 14, 1789.",
    explanation_es:
      "La Revolución Francesa comenzó con la toma de la Bastilla el 14 de julio de 1789.",
  },
  {
    id: "h_08",
    category: "history",
    difficulty: "hard",
    question_en: "Who was the first person to walk on the Moon?",
    question_es: "¿Quién fue la primera persona en caminar sobre la Luna?",
    options_en: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "John Glenn"],
    options_es: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "John Glenn"],
    correctIndex: 2,
    explanation_en:
      "Neil Armstrong walked on the Moon on July 20, 1969 during the Apollo 11 mission.",
    explanation_es:
      "Neil Armstrong caminó sobre la Luna el 20 de julio de 1969 durante la misión Apollo 11.",
  },
  {
    id: "h_09",
    category: "history",
    difficulty: "medium",
    question_en: "Which civilization built Machu Picchu?",
    question_es: "¿Qué civilización construyó Machu Picchu?",
    options_en: ["Aztec", "Maya", "Inca", "Olmec"],
    options_es: ["Azteca", "Maya", "Inca", "Olmeca"],
    correctIndex: 2,
    explanation_en:
      "The Inca Empire built Machu Picchu around 1450 AD in the Peruvian Andes.",
    explanation_es:
      "El Imperio Inca construyó Machu Picchu alrededor de 1450 d.C. en los Andes peruanos.",
  },
  {
    id: "h_10",
    category: "history",
    difficulty: "easy",
    question_en: "What ancient wonder was located in Egypt?",
    question_es: "¿Qué antigua maravilla se encontraba en Egipto?",
    options_en: [
      "Colossus of Rhodes",
      "Great Pyramid of Giza",
      "Hanging Gardens",
      "Temple of Artemis",
    ],
    options_es: [
      "Coloso de Rodas",
      "Gran Pirámide de Giza",
      "Jardines Colgantes",
      "Templo de Artemisa",
    ],
    correctIndex: 1,
    explanation_en:
      "The Great Pyramid of Giza is the only ancient wonder still standing.",
    explanation_es:
      "La Gran Pirámide de Giza es la única maravilla antigua que sigue en pie.",
  },
  // ── MORE Science ──
  {
    id: "s_06",
    category: "science",
    difficulty: "easy",
    question_en: "What is the chemical symbol for water?",
    question_es: "¿Cuál es el símbolo químico del agua?",
    options_en: ["CO2", "H2O", "NaCl", "O2"],
    options_es: ["CO2", "H2O", "NaCl", "O2"],
    correctIndex: 1,
    explanation_en:
      "Water is composed of two hydrogen atoms and one oxygen atom.",
    explanation_es:
      "El agua está compuesta por dos átomos de hidrógeno y uno de oxígeno.",
  },
  {
    id: "s_07",
    category: "science",
    difficulty: "medium",
    question_en: "What is the speed of light approximately?",
    question_es: "¿Cuál es la velocidad de la luz aproximadamente?",
    options_en: [
      "150,000 km/s",
      "300,000 km/s",
      "500,000 km/s",
      "1,000,000 km/s",
    ],
    options_es: [
      "150,000 km/s",
      "300,000 km/s",
      "500,000 km/s",
      "1,000,000 km/s",
    ],
    correctIndex: 1,
    explanation_en: "Light travels at approximately 299,792 km per second.",
    explanation_es: "La luz viaja a aproximadamente 299,792 km por segundo.",
  },
  {
    id: "s_08",
    category: "science",
    difficulty: "hard",
    question_en: "Which element has the atomic number 79?",
    question_es: "¿Qué elemento tiene el número atómico 79?",
    options_en: ["Silver", "Gold", "Platinum", "Copper"],
    options_es: ["Plata", "Oro", "Platino", "Cobre"],
    correctIndex: 1,
    explanation_en:
      "Gold (Au) has atomic number 79 and has been valued for thousands of years.",
    explanation_es:
      "El Oro (Au) tiene número atómico 79 y ha sido valorado durante miles de años.",
  },
  {
    id: "s_09",
    category: "science",
    difficulty: "easy",
    question_en: "How many planets are in our solar system?",
    question_es: "¿Cuántos planetas hay en nuestro sistema solar?",
    options_en: ["7", "8", "9", "10"],
    options_es: ["7", "8", "9", "10"],
    correctIndex: 1,
    explanation_en:
      "There are 8 planets. Pluto was reclassified as a dwarf planet in 2006.",
    explanation_es:
      "Hay 8 planetas. Plutón fue reclasificado como planeta enano en 2006.",
  },
  // ── MORE Sports ──
  {
    id: "sp_05",
    category: "sports",
    difficulty: "medium",
    question_en: "In which sport is a 'slam dunk' performed?",
    question_es: "¿En qué deporte se realiza un 'slam dunk'?",
    options_en: ["Volleyball", "Basketball", "Tennis", "Handball"],
    options_es: ["Voleibol", "Baloncesto", "Tenis", "Balonmano"],
    correctIndex: 1,
    explanation_en:
      "A slam dunk is one of basketball's most spectacular plays.",
    explanation_es:
      "Un slam dunk es una de las jugadas más espectaculares del baloncesto.",
  },
  {
    id: "sp_06",
    category: "sports",
    difficulty: "hard",
    question_en: "What country invented cricket?",
    question_es: "¿Qué país inventó el cricket?",
    options_en: ["Australia", "India", "England", "South Africa"],
    options_es: ["Australia", "India", "Inglaterra", "Sudáfrica"],
    correctIndex: 2,
    explanation_en:
      "Cricket originated in southeast England during the 16th century.",
    explanation_es:
      "El cricket se originó en el sureste de Inglaterra durante el siglo XVI.",
  },
  // ── MORE Music ──
  {
    id: "m_05",
    category: "music",
    difficulty: "easy",
    question_en: "Which singer is known as the 'King of Pop'?",
    question_es: "¿Qué cantante es conocido como el 'Rey del Pop'?",
    options_en: [
      "Elvis Presley",
      "Michael Jackson",
      "Prince",
      "Freddie Mercury",
    ],
    options_es: [
      "Elvis Presley",
      "Michael Jackson",
      "Prince",
      "Freddie Mercury",
    ],
    correctIndex: 1,
    explanation_en:
      "Michael Jackson earned the title through hits like Thriller and Billie Jean.",
    explanation_es:
      "Michael Jackson ganó el título con éxitos como Thriller y Billie Jean.",
  },
  {
    id: "m_06",
    category: "music",
    difficulty: "hard",
    question_en: "How many symphonies did Beethoven compose?",
    question_es: "¿Cuántas sinfonías compuso Beethoven?",
    options_en: ["5", "7", "9", "12"],
    options_es: ["5", "7", "9", "12"],
    correctIndex: 2,
    explanation_en:
      "Beethoven composed 9 symphonies, with his 9th being the most famous.",
    explanation_es:
      "Beethoven compuso 9 sinfonías, siendo la 9ª la más famosa.",
  },
  // ── MORE Cinema & TV ──
  {
    id: "c_05",
    category: "cinema_tv",
    difficulty: "medium",
    question_en: "What is the highest-grossing film of all time?",
    question_es: "¿Cuál es la película más taquillera de la historia?",
    options_en: [
      "Avengers: Endgame",
      "Avatar",
      "Titanic",
      "Star Wars: The Force Awakens",
    ],
    options_es: [
      "Avengers: Endgame",
      "Avatar",
      "Titanic",
      "Star Wars: El despertar de la Fuerza",
    ],
    correctIndex: 1,
    explanation_en:
      "Avatar (2009) holds the record at over $2.9 billion worldwide.",
    explanation_es:
      "Avatar (2009) tiene el récord con más de $2.9 mil millones a nivel mundial.",
  },
  {
    id: "c_06",
    category: "cinema_tv",
    difficulty: "easy",
    question_en: "What wizard school does Harry Potter attend?",
    question_es: "¿A qué escuela de magia asiste Harry Potter?",
    options_en: ["Beauxbatons", "Durmstrang", "Hogwarts", "Ilvermorny"],
    options_es: ["Beauxbatons", "Durmstrang", "Hogwarts", "Ilvermorny"],
    correctIndex: 2,
    explanation_en:
      "Hogwarts School of Witchcraft and Wizardry is in Scotland.",
    explanation_es:
      "El Colegio Hogwarts de Magia y Hechicería está en Escocia.",
  },
  // ── MORE Technology ──
  {
    id: "t_05",
    category: "technology",
    difficulty: "medium",
    question_en: "What programming language was created by Guido van Rossum?",
    question_es:
      "¿Qué lenguaje de programación fue creado por Guido van Rossum?",
    options_en: ["Java", "Python", "Ruby", "C++"],
    options_es: ["Java", "Python", "Ruby", "C++"],
    correctIndex: 1,
    explanation_en:
      "Python was first released in 1991 and named after Monty Python.",
    explanation_es:
      "Python fue lanzado por primera vez en 1991 y lleva el nombre de Monty Python.",
  },
  {
    id: "t_06",
    category: "technology",
    difficulty: "hard",
    question_en: "What was the name of the first programmable computer?",
    question_es: "¿Cómo se llamó la primera computadora programable?",
    options_en: ["ENIAC", "Colossus", "Z3", "UNIVAC"],
    options_es: ["ENIAC", "Colossus", "Z3", "UNIVAC"],
    correctIndex: 2,
    explanation_en:
      "The Z3, built by Konrad Zuse in 1941, was the world's first programmable computer.",
    explanation_es:
      "La Z3, construida por Konrad Zuse en 1941, fue la primera computadora programable del mundo.",
  },
  // ── MORE Food & Culture ──
  {
    id: "fc_06",
    category: "food_culture",
    difficulty: "easy",
    question_en: "Where did pizza originate?",
    question_es: "¿Dónde se originó la pizza?",
    options_en: ["France", "Greece", "Italy", "USA"],
    options_es: ["Francia", "Grecia", "Italia", "EE.UU."],
    correctIndex: 2,
    explanation_en:
      "Modern pizza originated in Naples, Italy in the 18th century.",
    explanation_es:
      "La pizza moderna se originó en Nápoles, Italia en el siglo XVIII.",
  },
  {
    id: "fc_07",
    category: "food_culture",
    difficulty: "medium",
    question_en: "What is the traditional Japanese ceremony involving matcha?",
    question_es: "¿Cuál es la ceremonia japonesa tradicional con matcha?",
    options_en: [
      "Sake ceremony",
      "Tea ceremony",
      "Rice ceremony",
      "Flower ceremony",
    ],
    options_es: [
      "Ceremonia del sake",
      "Ceremonia del té",
      "Ceremonia del arroz",
      "Ceremonia de las flores",
    ],
    correctIndex: 1,
    explanation_en:
      "The Japanese tea ceremony (Chanoyu) is a centuries-old cultural practice.",
    explanation_es:
      "La ceremonia del té japonesa (Chanoyu) es una práctica cultural de siglos de antigüedad.",
  },
  {
    id: "fc_08",
    category: "food_culture",
    difficulty: "hard",
    question_en: "Which country produces the most coffee in the world?",
    question_es: "¿Qué país produce más café en el mundo?",
    options_en: ["Colombia", "Vietnam", "Brazil", "Ethiopia"],
    options_es: ["Colombia", "Vietnam", "Brasil", "Etiopía"],
    correctIndex: 2,
    countryCode: "BR",
    explanation_en: "Brazil produces about 1/3 of the world's coffee.",
    explanation_es: "Brasil produce alrededor de 1/3 del café mundial.",
  },
  // ── MORE Art & Literature ──
  {
    id: "al_05",
    category: "art_literature",
    difficulty: "easy",
    question_en: "Who wrote 'Don Quixote'?",
    question_es: "¿Quién escribió 'Don Quijote'?",
    options_en: [
      "Lope de Vega",
      "Miguel de Cervantes",
      "Federico García Lorca",
      "Calderón de la Barca",
    ],
    options_es: [
      "Lope de Vega",
      "Miguel de Cervantes",
      "Federico García Lorca",
      "Calderón de la Barca",
    ],
    correctIndex: 1,
    explanation_en:
      "Miguel de Cervantes published Don Quixote in 1605. It's considered the first modern novel.",
    explanation_es:
      "Miguel de Cervantes publicó Don Quijote en 1605. Se considera la primera novela moderna.",
  },
  {
    id: "al_06",
    category: "art_literature",
    difficulty: "hard",
    question_en: "Which artistic movement did Salvador Dalí belong to?",
    question_es: "¿A qué movimiento artístico perteneció Salvador Dalí?",
    options_en: ["Impressionism", "Cubism", "Surrealism", "Expressionism"],
    options_es: ["Impresionismo", "Cubismo", "Surrealismo", "Expresionismo"],
    correctIndex: 2,
    explanation_en:
      "Dalí was a prominent figure in the Surrealist movement, known for melting clocks.",
    explanation_es:
      "Dalí fue una figura prominente del movimiento Surrealista, conocido por los relojes derretidos.",
  },
];
