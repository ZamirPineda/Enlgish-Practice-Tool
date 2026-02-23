import React from "react";
import { StopCategory } from "../types";

// --- ICONS ---
export const DiceIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
    />
  </svg>
);

export const BookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
);

export const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

export const ChevronUpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 15l7-7 7 7"
    />
  </svg>
);

export const CheckCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-emerald-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export const XCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-red-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

export const HeartIcon = ({ solid }: { solid?: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill={solid ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={solid ? 0 : 2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
    />
  </svg>
);

export const SparklesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
      clipRule="evenodd"
    />
  </svg>
);

// --- DATA CONSTANTS ---
export type GroupName =
  | "All"
  | "Geography & Travel"
  | "Grammar & Language"
  | "Professional"
  | "Nature & Science"
  | "Daily Life"
  | "Media & Fun"
  | "Knowledge & Culture"
  | "Lifestyle"
  | "Word Challenge";

export const CATEGORY_GROUPS: Record<GroupName, StopCategory[]> = {
  All: [],
  "Geography & Travel": ["Countries", "Cities", "Capitals", "World Landmarks"],
  "Grammar & Language": [
    "Verbs",
    "Modal Verbs",
    "Adjectives",
    "Compound Adjectives",
    "Adverbs",
    "Phrasal Verbs",
    "Phrasal Nouns",
    "Connectors",
    "Emotions",
    "Collocations",
    "Idioms",
    "Proverbs",
    "Homophones",
    "Opposites & Synonyms",
    "Emphasis",
    "Interjections",
  ],
  Professional: [
    "Business",
    "Architecture",
    "Dev Terms",
    "Technology & Internet",
  ],
  "Nature & Science": [
    "Nature",
    "Science",
    "Animals",
    "Fruits & Vegetables",
    "Colors",
    "Environment",
    "Flowers",
    "Flowers (Fancy)",
    "Plants",
    "Trees",
    "Mushrooms",
    "Spices & Herbs",
    "Space Objects",
    "Minerals & Gems",
  ],
  "Daily Life": [
    "Objects",
    "Clothing",
    "Body Parts",
    "Occupations",
    "Tools",
    "Household Items",
    "Housing & Rooms",
  ],
  "Media & Fun": ["Movies", "Songs", "Sports", "Mythology", "Sounds & Noise"],
  "Knowledge & Culture": [
    "IELTS Trends",
    "Abstract Nouns",
    "Culture",
    "Historical Figures",
    "Education & Learning",
    "Philosophy & Concepts",
  ],
  Lifestyle: [
    "Food & Drinks",
    "Health & Fitness",
    "Personality Traits",
    "Relationships & Social",
    "Slang & Colloquial",
  ],
  "Word Challenge": [
    "Short & Rare",
    "Long & Rare",
    "False Friends",
    "Minimal Pairs",
    "Compound Words",
  ],
};

export const PREDEFINED_ALL_ORDER: StopCategory[] = [
  "Slang & Colloquial",
  "Compound Words",
  "Compound Adjectives",
  "Modal Verbs",
  "Sounds & Noise",
  "Philosophy & Concepts",
  "False Friends",
  "Minimal Pairs",
  "Short & Rare",
  "Long & Rare",
  "Countries",
  "Cities",
  "Capitals",
  "World Landmarks",
  "Animals",
  "Fruits & Vegetables",
  "Colors",
  "Objects",
  "Food & Drinks",
  "Clothing",
  "Body Parts",
  "Household Items",
  "Housing & Rooms",
  "Occupations",
  "Tools",
  "Health & Fitness",
  "Personality Traits",
  "Relationships & Social",
  "Emotions",
  "Verbs",
  "Adjectives",
  "Adverbs",
  "Phrasal Verbs",
  "Phrasal Nouns",
  "Collocations",
  "Idioms",
  "Proverbs",
  "Homophones",
  "Opposites & Synonyms",
  "Connectors",
  "Emphasis",
  "Interjections",
  "Movies",
  "Songs",
  "Sports",
  "Mythology",
  "Nature",
  "Science",
  "Environment",
  "Space Objects",
  "Flowers",
  "Flowers (Fancy)",
  "Plants",
  "Trees",
  "Mushrooms",
  "Spices & Herbs",
  "Minerals & Gems",
  "Business",
  "Technology & Internet",
  "Architecture",
  "Dev Terms",
  "Education & Learning",
  "IELTS Trends",
  "Abstract Nouns",
  "Culture",
  "Historical Figures",
];

// --- HELPER FUNCTIONS ---
export const getCategoryIcon = (category: StopCategory) => {
  switch (category) {
    case "Countries":
      return "🌍";
    case "Cities":
      return "🏙️";
    case "Capitals":
      return "🏛️";
    case "Fruits & Vegetables":
      return "🥕";
    case "Colors":
      return "🎨";
    case "Verbs":
      return "🏃";
    case "Animals":
      return "🦁";
    case "Adjectives":
      return "✨";
    case "Objects":
      return "📦";
    case "Movies":
      return "🎬";
    case "Songs":
      return "🎵";
    case "Body Parts":
      return "💪";
    case "Clothing":
      return "👕";
    case "Occupations":
      return "💼";
    case "Tools":
      return "🛠️";
    case "Phrasal Verbs":
      return "↩️";
    case "Sports":
      return "⚽";
    case "Connectors":
      return "🔗";
    case "Emotions":
      return "🎭";
    case "Nature":
      return "🌿";
    case "Science":
      return "🔬";
    case "Business":
      return "📈";
    case "Household Items":
      return "🪑";
    case "Housing & Rooms":
      return "🏠";
    case "IELTS Trends":
      return "📈";
    case "Environment":
      return "♻️";
    case "Culture":
      return "🏯";
    case "Emphasis":
      return "❗";
    case "Abstract Nouns":
      return "💭";
    case "Architecture":
      return "🏛️";
    case "Dev Terms":
      return "💻";
    case "Mythology":
      return "🐉";
    case "World Landmarks":
      return "🗽";
    case "Historical Figures":
      return "📜";
    case "Food & Drinks":
      return "🍔";
    case "Health & Fitness":
      return "🧘";
    case "Technology & Internet":
      return "🌐";
    case "Personality Traits":
      return "🧠";
    case "Education & Learning":
      return "🎓";
    case "Relationships & Social":
      return "🤝";
    case "Collocations":
      return "🔗";
    case "Idioms":
      return "💬";
    case "Opposites & Synonyms":
      return "↔️";
    case "False Friends":
      return "🎭";
    case "Minimal Pairs":
      return "👂";
    case "Short & Rare":
      return "💎";
    case "Long & Rare":
      return "📜";
    case "Compound Words":
      return "🧩";
    case "Sounds & Noise":
      return "🔊";
    case "Philosophy & Concepts":
      return "🧠";
    case "Slang & Colloquial":
      return "😎";
    case "Compound Adjectives":
      return "🧱";
    case "Modal Verbs":
      return "🛡️";
    case "Adverbs":
      return "⏩";
    case "Phrasal Nouns":
      return "🧱";
    case "Homophones":
      return "👯";
    case "Proverbs":
      return "🦉";
    case "Interjections":
      return "💥";
    case "Flowers":
      return "🌸";
    case "Flowers (Fancy)":
      return "🌺";
    case "Plants":
      return "🌱";
    case "Trees":
      return "🌳";
    case "Mushrooms":
      return "🍄";
    case "Spices & Herbs":
      return "🧂";
    case "Space Objects":
      return "🌌";
    case "Minerals & Gems":
      return "💎";
    default:
      return "📝";
  }
};

export const getCategoryTheme = (category: StopCategory) => {
  let theme = {
    accentColor: "border-text-muted",
    bgGradient: "bg-surface-2",
    headerGradient: "bg-surface-2",
    textClass: "text-text-muted",
    iconBg: "bg-surface-3",
    glow: "",
  };

  if (
    ["Compound Words", "Slang & Colloquial", "Compound Adjectives"].includes(
      category,
    )
  ) {
    theme = {
      accentColor: "border-pink-500",
      bgGradient: "bg-gradient-to-b from-surface-2 to-surface-1",
      headerGradient: "bg-gradient-to-r from-pink-900/40 to-surface-2",
      textClass: "text-pink-400",
      iconBg: "bg-pink-900/30 text-pink-300",
      glow: "group-hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]",
    };
  } else if (["Sounds & Noise", "Music", "Songs"].includes(category)) {
    theme = {
      accentColor: "border-amber-400",
      bgGradient: "bg-gradient-to-b from-surface-2 to-surface-1",
      headerGradient: "bg-gradient-to-r from-amber-900/40 to-surface-2",
      textClass: "text-amber-400",
      iconBg: "bg-amber-900/30 text-amber-300",
      glow: "group-hover:shadow-[0_0_20px_rgba(251,191,36,0.15)]",
    };
  } else if (["Philosophy & Concepts", "Abstract Nouns"].includes(category)) {
    theme = {
      accentColor: "border-indigo-500",
      bgGradient: "bg-gradient-to-b from-surface-2 to-surface-1",
      headerGradient: "bg-gradient-to-r from-indigo-900/40 to-surface-2",
      textClass: "text-indigo-300",
      iconBg: "bg-indigo-900/30 text-indigo-300",
      glow: "group-hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]",
    };
  } else if (
    ["Minimal Pairs", "False Friends", "Short & Rare", "Long & Rare"].includes(
      category,
    )
  ) {
    theme = {
      accentColor: "border-violet-500",
      bgGradient: "bg-gradient-to-b from-surface-2 to-surface-1",
      headerGradient: "bg-gradient-to-r from-violet-900/40 to-surface-2",
      textClass: "text-violet-300",
      iconBg: "bg-violet-900/30 text-violet-300",
      glow: "group-hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]",
    };
  } else if (
    ["Countries", "Cities", "Capitals", "World Landmarks"].includes(category)
  ) {
    theme = {
      accentColor: "border-emerald-500",
      bgGradient: "bg-gradient-to-b from-surface-2 to-surface-1",
      headerGradient: "bg-gradient-to-r from-emerald-900/40 to-surface-2",
      textClass: "text-emerald-300",
      iconBg: "bg-emerald-900/30 text-emerald-300",
      glow: "group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]",
    };
  } else if (
    [
      "Nature",
      "Animals",
      "Fruits & Vegetables",
      "Environment",
      "Flowers",
      "Flowers (Fancy)",
      "Plants",
      "Trees",
      "Mushrooms",
    ].includes(category)
  ) {
    theme = {
      accentColor: "border-lime-500",
      bgGradient: "bg-gradient-to-b from-surface-2 to-surface-1",
      headerGradient: "bg-gradient-to-r from-lime-900/40 to-surface-2",
      textClass: "text-lime-300",
      iconBg: "bg-lime-900/30 text-lime-300",
      glow: "group-hover:shadow-[0_0_20px_rgba(132,204,22,0.15)]",
    };
  } else if (
    [
      "Technology & Internet",
      "Business",
      "Dev Terms",
      "Architecture",
      "Science",
      "Space Objects",
    ].includes(category)
  ) {
    theme = {
      accentColor: "border-cyan-500",
      bgGradient: "bg-gradient-to-b from-surface-2 to-surface-1",
      headerGradient: "bg-gradient-to-r from-cyan-900/40 to-surface-2",
      textClass: "text-cyan-300",
      iconBg: "bg-cyan-900/30 text-cyan-300",
      glow: "group-hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]",
    };
  } else if (
    [
      "Verbs",
      "Adjectives",
      "Phrasal Verbs",
      "Idioms",
      "Connectors",
      "Modal Verbs",
    ].includes(category)
  ) {
    theme = {
      accentColor: "border-sky-500",
      bgGradient: "bg-gradient-to-b from-surface-2 to-surface-1",
      headerGradient: "bg-gradient-to-r from-sky-900/40 to-surface-2",
      textClass: "text-sky-300",
      iconBg: "bg-sky-900/30 text-sky-300",
      glow: "group-hover:shadow-[0_0_20px_rgba(14,165,233,0.15)]",
    };
  } else {
    // Includes Spices & Herbs, Minerals & Gems (Orange/Amber theme fits Earth/Cooking)
    theme = {
      accentColor: "border-orange-400",
      bgGradient: "bg-gradient-to-b from-surface-2 to-surface-1",
      headerGradient: "bg-gradient-to-r from-orange-900/40 to-surface-2",
      textClass: "text-orange-300",
      iconBg: "bg-orange-900/30 text-orange-300",
      glow: "group-hover:shadow-[0_0_20px_rgba(249,115,22,0.15)]",
    };
  }
  return theme;
};

// --- COUNTRY DATA ---
export const COUNTRY_CODES: Record<string, string> = {
  Afghanistan: "af",
  Albania: "al",
  Algeria: "dz",
  Andorra: "ad",
  Angola: "ao",
  "Antigua and Barbuda": "ag",
  Argentina: "ar",
  Armenia: "am",
  Australia: "au",
  Austria: "at",
  Azerbaijan: "az",
  Bahamas: "bs",
  Bahrain: "bh",
  Bangladesh: "bd",
  Barbados: "bb",
  Belarus: "by",
  Belgium: "be",
  Belize: "bz",
  Benin: "bj",
  Bhutan: "bt",
  Bolivia: "bo",
  "Bosnia and Herzegovina": "ba",
  Botswana: "bw",
  Brazil: "br",
  Brunei: "bn",
  Bulgaria: "bg",
  "Burkina Faso": "bf",
  Burundi: "bi",
  "Cabo Verde": "cv",
  Cambodia: "kh",
  Cameroon: "cm",
  Canada: "ca",
  "Central African Republic": "cf",
  Chad: "td",
  Chile: "cl",
  China: "cn",
  "China (Tibet)": "cn",
  Colombia: "co",
  Comoros: "km",
  Congo: "cg",
  "Democratic Republic of the Congo": "cd",
  "Costa Rica": "cr",
  Croatia: "hr",
  Cuba: "cu",
  Cyprus: "cy",
  "Czech Republic": "cz",
  Denmark: "dk",
  Djibouti: "dj",
  Dominica: "dm",
  "Dominican Republic": "do",
  Ecuador: "ec",
  Egypt: "eg",
  "El Salvador": "sv",
  "Equatorial Guinea": "gq",
  Eritrea: "er",
  Estonia: "ee",
  Eswatini: "sz",
  Ethiopia: "et",
  Fiji: "fj",
  Finland: "fi",
  France: "fr",
  Gabon: "ga",
  Gambia: "gm",
  Georgia: "ge",
  Germany: "de",
  Ghana: "gh",
  Greece: "gr",
  Grenada: "gd",
  Guatemala: "gt",
  Guinea: "gn",
  "Guinea-Bissau": "gw",
  Guyana: "gy",
  Gibraltar: "gi",
  Haiti: "ht",
  Honduras: "hn",
  Hungary: "hu",
  Iceland: "is",
  India: "in",
  Indonesia: "id",
  Iran: "ir",
  Iraq: "iq",
  "Iraq (Ruins)": "iq",
  Ireland: "ie",
  Israel: "il",
  Italy: "it",
  "Ivory Coast": "ci",
  Jamaica: "jm",
  Japan: "jp",
  Jordan: "jo",
  "Jordan/Israel": "jo",
  Kazakhstan: "kz",
  Kenya: "ke",
  Kiribati: "ki",
  Kuwait: "kw",
  Kyrgyzstan: "kg",
  "North Korea": "kp",
  "South Korea": "kr",
  Laos: "la",
  Latvia: "lv",
  Lebanon: "lb",
  Lesotho: "ls",
  Liberia: "lr",
  Libya: "ly",
  Liechtenstein: "li",
  Lithuania: "lt",
  Luxembourg: "lu",
  Madagascar: "mg",
  Malawi: "mw",
  Malaysia: "my",
  Maldives: "mv",
  Mali: "ml",
  Malta: "mt",
  "Marshall Islands": "mh",
  Mauritania: "mr",
  Mauritius: "mu",
  Mexico: "mx",
  Micronesia: "fm",
  Moldova: "md",
  Monaco: "mc",
  Mongolia: "mn",
  Montenegro: "me",
  Morocco: "ma",
  Mozambique: "mz",
  Myanmar: "mm",
  Namibia: "na",
  Nauru: "nr",
  Nepal: "np",
  "Nepal/China": "np",
  Netherlands: "nl",
  "New Zealand": "nz",
  Nicaragua: "ni",
  Niger: "ne",
  Nigeria: "ng",
  "North Macedonia": "mk",
  Norway: "no",
  Oman: "om",
  Pakistan: "pk",
  Palau: "pw",
  "Palestine State": "ps",
  Palestine: "ps",
  Panama: "pa",
  "Papua New Guinea": "pg",
  Paraguay: "py",
  Peru: "pe",
  Philippines: "ph",
  Poland: "pl",
  Portugal: "pt",
  Qatar: "qa",
  Romania: "ro",
  Russia: "ru",
  Rwanda: "rw",
  "Saint Kitts and Nevis": "kn",
  "Saint Lucia": "lc",
  "Saint Vincent and the Grenadines": "vc",
  Samoa: "ws",
  "San Marino": "sm",
  "Sao Tome and Principe": "st",
  "Saudi Arabia": "sa",
  Senegal: "sn",
  Serbia: "rs",
  Seychelles: "sc",
  "Sierra Leone": "sl",
  Singapore: "sg",
  Slovakia: "sk",
  Slovenia: "si",
  "Solomon Islands": "sb",
  Somalia: "so",
  "South Africa": "za",
  "South Sudan": "ss",
  Spain: "es",
  "Sri Lanka": "lk",
  Sudan: "sd",
  Suriname: "sr",
  Sweden: "se",
  Switzerland: "ch",
  Syria: "sy",
  Scotland: "gb-sct",
  Wales: "gb-wls",
  Tajikistan: "tj",
  Tanzania: "tz",
  Thailand: "th",
  "Timor-Leste": "tl",
  Togo: "tg",
  Tonga: "to",
  "Trinidad and Tobago": "tt",
  Tunisia: "tn",
  Turkey: "tr",
  Turkmenistan: "tm",
  Tuvalu: "tv",
  Taiwan: "tw",
  Uganda: "ug",
  Ukraine: "ua",
  "United Arab Emirates": "ae",
  UAE: "ae",
  "United Kingdom": "gb",
  UK: "gb",
  "United States": "us",
  USA: "us",
  Uruguay: "uy",
  Uzbekistan: "uz",
  Vanuatu: "vu",
  "Vatican City": "va",
  Venezuela: "ve",
  Vietnam: "vn",
  Yemen: "ye",
  Zambia: "zm",
  Zimbabwe: "zw",
  Aruba: "aw",
  Greenland: "gl",
  "Puerto Rico": "pr",
  "Hong Kong": "hk",
  Macau: "mo",
};

export const getFlagUrl = (countryName: string | undefined): string | null => {
  if (!countryName) return null;
  const primaryCountry = countryName.split("/")[0].trim();
  const code = COUNTRY_CODES[primaryCountry];
  if (code) return `https://flagcdn.com/w40/${code}.png`;
  return null;
};
