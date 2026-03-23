export interface VerbPatternItem {
  verb: string;
  translation: string;
  pattern: "gerund" | "infinitive" | "both";
  level: "A2" | "B1" | "B2" | "C1";
  exampleGerund?: string;
  exampleInfinitive?: string;
  meaningChangeNote?: string;
}

export const verbPatterns: VerbPatternItem[] = [
  // ── A2 – Gerund ──────────────────────────────────────────
  {
    verb: "enjoy",
    translation: "disfrutar",
    pattern: "gerund",
    level: "A2",
    exampleGerund: "I enjoy reading books in the park.",
  },
  {
    verb: "like",
    translation: "gustar",
    pattern: "both",
    level: "A2",
    exampleGerund: "I like swimming. (general preference)",
    exampleInfinitive: "I like to swim on Sundays. (specific habit)",
    meaningChangeNote:
      "With gerund → general enjoyment. With infinitive → specific occasions or habits.",
  },
  {
    verb: "love",
    translation: "amar / encantar",
    pattern: "both",
    level: "A2",
    exampleGerund: "She loves dancing. (general)",
    exampleInfinitive: "She loves to dance at parties. (specific)",
    meaningChangeNote:
      "Similar to 'like': gerund = general feeling, infinitive = specific action.",
  },
  {
    verb: "hate",
    translation: "odiar",
    pattern: "both",
    level: "A2",
    exampleGerund: "He hates waiting in line.",
    exampleInfinitive: "He hates to wait when he's in a hurry.",
    meaningChangeNote:
      "Gerund = general dislike. Infinitive = dislike in specific situations.",
  },
  {
    verb: "finish",
    translation: "terminar",
    pattern: "gerund",
    level: "A2",
    exampleGerund: "Have you finished eating?",
  },
  {
    verb: "want",
    translation: "querer",
    pattern: "infinitive",
    level: "A2",
    exampleInfinitive: "I want to travel the world.",
  },
  {
    verb: "need",
    translation: "necesitar",
    pattern: "infinitive",
    level: "A2",
    exampleInfinitive: "You need to study harder.",
  },
  {
    verb: "learn",
    translation: "aprender",
    pattern: "infinitive",
    level: "A2",
    exampleInfinitive: "She learned to play the guitar.",
  },
  {
    verb: "start",
    translation: "empezar",
    pattern: "both",
    level: "A2",
    exampleGerund: "It started raining.",
    exampleInfinitive: "It started to rain.",
    meaningChangeNote:
      "No meaning change — both forms are interchangeable with 'start'.",
  },
  {
    verb: "begin",
    translation: "comenzar",
    pattern: "both",
    level: "A2",
    exampleGerund: "She began singing.",
    exampleInfinitive: "She began to sing.",
    meaningChangeNote:
      "No meaning change — both forms are interchangeable with 'begin'.",
  },

  // ── B1 – Gerund ──────────────────────────────────────────
  {
    verb: "avoid",
    translation: "evitar",
    pattern: "gerund",
    level: "B1",
    exampleGerund: "We avoided driving during rush hour.",
  },
  {
    verb: "suggest",
    translation: "sugerir",
    pattern: "gerund",
    level: "B1",
    exampleGerund: "I suggest taking a break.",
  },
  {
    verb: "mind",
    translation: "importar",
    pattern: "gerund",
    level: "B1",
    exampleGerund: "Do you mind opening the window?",
  },
  {
    verb: "keep",
    translation: "seguir / continuar",
    pattern: "gerund",
    level: "B1",
    exampleGerund: "He kept interrupting me.",
  },
  {
    verb: "admit",
    translation: "admitir",
    pattern: "gerund",
    level: "B1",
    exampleGerund: "He admitted stealing the money.",
  },
  {
    verb: "miss",
    translation: "extrañar / echar de menos",
    pattern: "gerund",
    level: "B1",
    exampleGerund: "I miss living in Spain.",
  },
  {
    verb: "practice",
    translation: "practicar",
    pattern: "gerund",
    level: "B1",
    exampleGerund: "She practices speaking English every day.",
  },
  {
    verb: "consider",
    translation: "considerar",
    pattern: "gerund",
    level: "B1",
    exampleGerund: "Have you considered moving abroad?",
  },
  {
    verb: "give up",
    translation: "rendirse / dejar de",
    pattern: "gerund",
    level: "B1",
    exampleGerund: "He gave up smoking last year.",
  },

  // ── B1 – Infinitive ─────────────────────────────────────
  {
    verb: "decide",
    translation: "decidir",
    pattern: "infinitive",
    level: "B1",
    exampleInfinitive: "She decided to go home.",
  },
  {
    verb: "promise",
    translation: "prometer",
    pattern: "infinitive",
    level: "B1",
    exampleInfinitive: "He promised to help me.",
  },
  {
    verb: "hope",
    translation: "esperar (con esperanza)",
    pattern: "infinitive",
    level: "B1",
    exampleInfinitive: "They hope to see you soon.",
  },
  {
    verb: "afford",
    translation: "permitirse",
    pattern: "infinitive",
    level: "B1",
    exampleInfinitive: "I can't afford to buy a new car.",
  },
  {
    verb: "offer",
    translation: "ofrecer",
    pattern: "infinitive",
    level: "B1",
    exampleInfinitive: "She offered to drive us.",
  },
  {
    verb: "manage",
    translation: "lograr / arreglárselas",
    pattern: "infinitive",
    level: "B1",
    exampleInfinitive: "We managed to finish on time.",
  },
  {
    verb: "refuse",
    translation: "rechazar / negarse",
    pattern: "infinitive",
    level: "B1",
    exampleInfinitive: "They refused to pay.",
  },
  {
    verb: "plan",
    translation: "planear",
    pattern: "infinitive",
    level: "B1",
    exampleInfinitive: "We plan to visit Paris next summer.",
  },
  {
    verb: "agree",
    translation: "estar de acuerdo",
    pattern: "infinitive",
    level: "B1",
    exampleInfinitive: "They agreed to share the costs.",
  },
  {
    verb: "expect",
    translation: "esperar (expectativa)",
    pattern: "infinitive",
    level: "B1",
    exampleInfinitive: "I expect to receive the results tomorrow.",
  },

  // ── B1 – Both (meaning change) ──────────────────────────
  {
    verb: "stop",
    translation: "parar / detenerse",
    pattern: "both",
    level: "B1",
    exampleGerund: "He stopped smoking. (He quit the habit.)",
    exampleInfinitive: "He stopped to smoke. (He paused in order to smoke.)",
    meaningChangeNote:
      "Gerund = quit doing something. Infinitive = pause in order to do something.",
  },
  {
    verb: "remember",
    translation: "recordar",
    pattern: "both",
    level: "B1",
    exampleGerund:
      "I remember locking the door. (I recall doing it in the past.)",
    exampleInfinitive:
      "Remember to lock the door. (Don't forget to do it in the future.)",
    meaningChangeNote:
      "Gerund = recall a past action. Infinitive = don't forget a future action.",
  },
  {
    verb: "forget",
    translation: "olvidar",
    pattern: "both",
    level: "B1",
    exampleGerund: "I'll never forget meeting her. (The memory of it.)",
    exampleInfinitive: "Don't forget to call me. (Remember to do it.)",
    meaningChangeNote:
      "Gerund = a memory of something that happened. Infinitive = neglecting to do something.",
  },
  {
    verb: "try",
    translation: "intentar / probar",
    pattern: "both",
    level: "B1",
    exampleGerund:
      "Try turning it off and on again. (Experiment with this approach.)",
    exampleInfinitive:
      "I tried to open the door but it was locked. (I attempted but failed.)",
    meaningChangeNote:
      "Gerund = experiment/test something. Infinitive = attempt with effort.",
  },

  // ── B2 – Gerund ──────────────────────────────────────────
  {
    verb: "deny",
    translation: "negar",
    pattern: "gerund",
    level: "B2",
    exampleGerund: "She denied taking the money.",
  },
  {
    verb: "risk",
    translation: "arriesgar",
    pattern: "gerund",
    level: "B2",
    exampleGerund: "Don't risk losing your job over this.",
  },
  {
    verb: "delay",
    translation: "retrasar / posponer",
    pattern: "gerund",
    level: "B2",
    exampleGerund: "They delayed announcing the results.",
  },
  {
    verb: "imagine",
    translation: "imaginar",
    pattern: "gerund",
    level: "B2",
    exampleGerund: "Can you imagine living on Mars?",
  },
  {
    verb: "resist",
    translation: "resistir",
    pattern: "gerund",
    level: "B2",
    exampleGerund: "I couldn't resist buying those shoes.",
  },
  {
    verb: "postpone",
    translation: "posponer",
    pattern: "gerund",
    level: "B2",
    exampleGerund: "We postponed having the meeting until Monday.",
  },
  {
    verb: "involve",
    translation: "implicar / involucrar",
    pattern: "gerund",
    level: "B2",
    exampleGerund: "The job involves travelling abroad frequently.",
  },
  {
    verb: "recommend",
    translation: "recomendar",
    pattern: "gerund",
    level: "B2",
    exampleGerund: "I recommend visiting the old town.",
  },

  // ── B2 – Infinitive ─────────────────────────────────────
  {
    verb: "pretend",
    translation: "fingir",
    pattern: "infinitive",
    level: "B2",
    exampleInfinitive: "He pretended to be asleep.",
  },
  {
    verb: "tend",
    translation: "tender a",
    pattern: "infinitive",
    level: "B2",
    exampleInfinitive: "She tends to arrive late.",
  },
  {
    verb: "threaten",
    translation: "amenazar",
    pattern: "infinitive",
    level: "B2",
    exampleInfinitive: "He threatened to call the police.",
  },
  {
    verb: "claim",
    translation: "afirmar / reclamar",
    pattern: "infinitive",
    level: "B2",
    exampleInfinitive: "She claims to know the answer.",
  },
  {
    verb: "deserve",
    translation: "merecer",
    pattern: "infinitive",
    level: "B2",
    exampleInfinitive: "You deserve to be happy.",
  },
  {
    verb: "appear",
    translation: "parecer",
    pattern: "infinitive",
    level: "B2",
    exampleInfinitive: "He appears to be sleeping.",
  },
  {
    verb: "fail",
    translation: "fracasar / fallar",
    pattern: "infinitive",
    level: "B2",
    exampleInfinitive: "She failed to meet the deadline.",
  },
  {
    verb: "swear",
    translation: "jurar",
    pattern: "infinitive",
    level: "B2",
    exampleInfinitive: "I swear to tell the truth.",
  },

  // ── B2 – Both (meaning change) ──────────────────────────
  {
    verb: "regret",
    translation: "lamentar / arrepentirse",
    pattern: "both",
    level: "B2",
    exampleGerund: "I regret telling her the truth. (I wish I hadn't.)",
    exampleInfinitive:
      "I regret to inform you that your application was rejected. (I'm sorry to say…)",
    meaningChangeNote:
      "Gerund = feel sorry about a past action. Infinitive = feel sorry about what you are about to say (formal).",
  },
  {
    verb: "go on",
    translation: "continuar / pasar a",
    pattern: "both",
    level: "B2",
    exampleGerund: "He went on talking for hours. (He continued talking.)",
    exampleInfinitive:
      "She went on to become a famous singer. (She moved on to something new.)",
    meaningChangeNote:
      "Gerund = continue the same activity. Infinitive = move on to a different/new activity.",
  },
  {
    verb: "mean",
    translation: "significar / tener intención",
    pattern: "both",
    level: "B2",
    exampleGerund: "Being a doctor means working long hours. (It involves…)",
    exampleInfinitive: "I meant to call you, but I forgot. (I intended to…)",
    meaningChangeNote: "Gerund = involves/implies. Infinitive = intend to.",
  },

  // ── C1 – Gerund ──────────────────────────────────────────
  {
    verb: "resent",
    translation: "resentir / molestar",
    pattern: "gerund",
    level: "C1",
    exampleGerund: "She resents being told what to do.",
  },
  {
    verb: "warrant",
    translation: "justificar / ameritar",
    pattern: "gerund",
    level: "C1",
    exampleGerund: "The situation warrants investigating further.",
  },
  {
    verb: "entail",
    translation: "conllevar / implicar",
    pattern: "gerund",
    level: "C1",
    exampleGerund: "The project entails working weekends.",
  },
  {
    verb: "relish",
    translation: "disfrutar intensamente",
    pattern: "gerund",
    level: "C1",
    exampleGerund: "He relishes cooking elaborate meals.",
  },
  {
    verb: "dread",
    translation: "temer / pavor",
    pattern: "gerund",
    level: "C1",
    exampleGerund: "I dread going to the dentist.",
  },
  {
    verb: "contemplate",
    translation: "contemplar / considerar",
    pattern: "gerund",
    level: "C1",
    exampleGerund: "She contemplated quitting her job.",
  },

  // ── C1 – Infinitive ─────────────────────────────────────
  {
    verb: "endeavour",
    translation: "esforzarse",
    pattern: "infinitive",
    level: "C1",
    exampleInfinitive: "We endeavour to provide the best service.",
  },
  {
    verb: "pledge",
    translation: "comprometerse",
    pattern: "infinitive",
    level: "C1",
    exampleInfinitive: "The government pledged to reduce taxes.",
  },
  {
    verb: "consent",
    translation: "consentir",
    pattern: "infinitive",
    level: "C1",
    exampleInfinitive: "She consented to participate in the study.",
  },
  {
    verb: "vow",
    translation: "jurar / prometer solemnemente",
    pattern: "infinitive",
    level: "C1",
    exampleInfinitive: "He vowed to never make the same mistake again.",
  },
  {
    verb: "undertake",
    translation: "emprender",
    pattern: "infinitive",
    level: "C1",
    exampleInfinitive: "The team undertook to complete the project by March.",
  },
  {
    verb: "strive",
    translation: "esforzarse / luchar por",
    pattern: "infinitive",
    level: "C1",
    exampleInfinitive: "We strive to improve every day.",
  },
];
