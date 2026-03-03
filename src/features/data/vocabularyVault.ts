type StarterKitItem = {
  word: string;
  definition: string;
  ipa?: string;
  example?: string;
  partOfSpeech?: string;
  tags?: string[];
};

type StarterKits = {
  highFrequency: StarterKitItem[];
  phrasalVerbs: StarterKitItem[];
  business: StarterKitItem[];
  workInterview: StarterKitItem[];
  travelEmergencies: StarterKitItem[];
  commonMistakesEs: StarterKitItem[];
};

export const starterKits: StarterKits = {
  highFrequency: [
    {
      word: "Acknowledge",
      definition: "Accept or admit the existence or truth of.",
      ipa: "/əkˈnɒl.ɪdʒ/",
      example: "He acknowledged that he was wrong.",
      tags: ["General", "B2"],
    },
    {
      word: "Constraint",
      definition: "A limitation or restriction.",
      ipa: "/kənˈstreɪnt/",
      example: "Time constraints make it hard to finish.",
      tags: ["General", "B2"],
    },
    {
      word: "Vulnerable",
      definition: "Exposed to the possibility of being attacked or harmed.",
      ipa: "/ˈvʌl.nər.ə.bəl/",
      example: "Small animals are vulnerable to predators.",
      tags: ["General", "B2"],
    },
    {
      word: "Significant",
      definition: "Great or important to be worthy of attention.",
      ipa: "/sɪɡˈnɪf.ɪ.kənt/",
      example: "There is a significant difference between them.",
      tags: ["General", "B1"],
    },
    {
      word: "Feasible",
      definition: "Possible to do easily or conveniently.",
      ipa: "/ˈfiː.zə.bəl/",
      example: "The project is feasible with the current budget.",
      tags: ["General", "B2"],
    },
  ],
  phrasalVerbs: [
    {
      word: "Look forward to",
      definition: "Be excited about something in the future.",
      example: "I'm looking forward to our trip.",
      tags: ["Phrasal Verb", "A2"],
    },
    {
      word: "Get along with",
      definition: "Have a good relationship with someone.",
      example: "I get along well with my boss.",
      tags: ["Phrasal Verb", "B1"],
    },
    {
      word: "Bring up",
      definition: "Mention a topic in conversation.",
      example: "Why did you bring up that old problem?",
      tags: ["Phrasal Verb", "B1"],
    },
    {
      word: "Run out of",
      definition: "To have no more of something.",
      example: "We ran out of milk this morning.",
      tags: ["Phrasal Verb", "A2"],
    },
  ],
  business: [
    {
      word: "Scalable",
      definition: "Able to grow or be made larger.",
      example: "We need a scalable solution for the database.",
      tags: ["Business", "B2"],
    },
    {
      word: "Leverage",
      definition: "Use something to maximum advantage.",
      example: "We can leverage our existing contacts.",
      tags: ["Business", "B2"],
    },
    {
      word: "Bottleneck",
      definition: "A situation that causes delay in a process.",
      example: "The approval stage is a bottleneck.",
      tags: ["Business", "B2"],
    },
  ],
  workInterview: [
    {
      word: "Strength",
      definition: "A positive quality or skill you have.",
      example: "My main strength is problem-solving under pressure.",
      partOfSpeech: "Noun",
      tags: ["Work", "Interview", "A2"],
    },
    {
      word: "Weakness",
      definition: "An area where you need improvement.",
      example: "One weakness is public speaking, but I am improving it.",
      partOfSpeech: "Noun",
      tags: ["Work", "Interview", "A2"],
    },
    {
      word: "Deadline",
      definition: "The time by which work must be finished.",
      example: "I always organize tasks to meet deadlines.",
      partOfSpeech: "Noun",
      tags: ["Work", "B1"],
    },
    {
      word: "Collaboration",
      definition: "Working together with other people.",
      example: "I value collaboration across teams.",
      partOfSpeech: "Noun",
      tags: ["Work", "B1"],
    },
    {
      word: "Achievement",
      definition: "Something important that you successfully complete.",
      example: "My biggest achievement was launching a new onboarding flow.",
      partOfSpeech: "Noun",
      tags: ["Work", "Interview", "B1"],
    },
    {
      word: "Responsibilities",
      definition: "Duties that you are expected to manage.",
      example: "My responsibilities included reporting and client support.",
      partOfSpeech: "Noun",
      tags: ["Work", "B1"],
    },
    {
      word: "Salary expectation",
      definition: "The amount of money you expect to be paid.",
      example: "My salary expectation is based on market rates.",
      partOfSpeech: "Noun phrase",
      tags: ["Work", "Interview", "B1"],
    },
    {
      word: "Career growth",
      definition: "Long-term professional development and progression.",
      example: "I am looking for strong career growth opportunities.",
      partOfSpeech: "Noun phrase",
      tags: ["Work", "B1"],
    },
    {
      word: "Onboarding",
      definition: "The process of integrating a new employee into a company.",
      example: "The onboarding process helped me adapt quickly.",
      partOfSpeech: "Noun",
      tags: ["Work", "B2"],
    },
    {
      word: "Performance review",
      definition: "A formal evaluation of an employee's work.",
      example: "My performance review highlighted communication skills.",
      partOfSpeech: "Noun phrase",
      tags: ["Work", "B2"],
    },
    {
      word: "Take initiative",
      definition: "To act independently and start useful actions.",
      example: "I usually take initiative when I spot a recurring issue.",
      partOfSpeech: "Verb phrase",
      tags: ["Work", "Interview", "B2"],
    },
    {
      word: "Problem-solving",
      definition: "The skill of finding solutions to difficult issues.",
      example: "Problem-solving is key in fast-paced environments.",
      partOfSpeech: "Noun",
      tags: ["Work", "Interview", "B2"],
    },
  ],
  travelEmergencies: [
    {
      word: "Boarding pass",
      definition: "A document that allows you to board a plane.",
      example: "I can't find my boarding pass.",
      partOfSpeech: "Noun",
      tags: ["Travel", "A1"],
    },
    {
      word: "Gate",
      definition: "The area where passengers board the plane.",
      example: "Our flight leaves from gate 14.",
      partOfSpeech: "Noun",
      tags: ["Travel", "A1"],
    },
    {
      word: "Delayed",
      definition: "Not happening at the planned time.",
      example: "The flight is delayed by two hours.",
      partOfSpeech: "Adjective",
      tags: ["Travel", "A2"],
    },
    {
      word: "Lost luggage",
      definition: "Bags that cannot be located after a trip.",
      example: "I need to report my lost luggage.",
      partOfSpeech: "Noun phrase",
      tags: ["Travel", "A2"],
    },
    {
      word: "Reservation",
      definition: "A booking made in advance.",
      example: "I have a hotel reservation under my name.",
      partOfSpeech: "Noun",
      tags: ["Travel", "A2"],
    },
    {
      word: "Check-in",
      definition: "The process of registering at an airport or hotel.",
      example: "What time does check-in start?",
      partOfSpeech: "Noun",
      tags: ["Travel", "A2"],
    },
    {
      word: "Emergency exit",
      definition: "A special exit used in dangerous situations.",
      example: "Please locate the nearest emergency exit.",
      partOfSpeech: "Noun phrase",
      tags: ["Travel", "Emergency", "B1"],
    },
    {
      word: "Prescription",
      definition: "A doctor's written order for medicine.",
      example: "I need this prescription filled today.",
      partOfSpeech: "Noun",
      tags: ["Health", "Travel", "B1"],
    },
    {
      word: "Allergic reaction",
      definition: "A harmful response of the body to a substance.",
      example: "He is having an allergic reaction to peanuts.",
      partOfSpeech: "Noun phrase",
      tags: ["Emergency", "Health", "B1"],
    },
    {
      word: "Embassy",
      definition: "The official office of one country in another country.",
      example: "You should contact your embassy immediately.",
      partOfSpeech: "Noun",
      tags: ["Travel", "Emergency", "B1"],
    },
    {
      word: "File a report",
      definition: "To officially submit details about an incident.",
      example: "I need to file a report for the stolen passport.",
      partOfSpeech: "Verb phrase",
      tags: ["Emergency", "Travel", "B2"],
    },
    {
      word: "Travel insurance",
      definition: "Insurance coverage for travel-related problems.",
      example: "Travel insurance can cover medical emergencies abroad.",
      partOfSpeech: "Noun phrase",
      tags: ["Travel", "B2"],
    },
  ],
  commonMistakesEs: [
    {
      word: "I am 25 years old",
      definition:
        "Correct form for age. Avoid literal translation from Spanish ('I have 25 years').",
      example: "I am 25 years old and I work in finance.",
      partOfSpeech: "Sentence",
      tags: ["Common Mistake", "Spanish Interference", "A2"],
    },
    {
      word: "I have been here for two years",
      definition:
        "Use present perfect for actions continuing until now ('I have been...').",
      example: "I have been here for two years.",
      partOfSpeech: "Sentence",
      tags: ["Common Mistake", "Spanish Interference", "B1"],
    },
    {
      word: "I am interested in marketing",
      definition: "After 'interested' use 'in', not 'on'.",
      example: "I am interested in marketing and branding.",
      partOfSpeech: "Sentence",
      tags: ["Common Mistake", "Prepositions", "B1"],
    },
    {
      word: "I agree with you",
      definition: "Use 'agree with someone', not 'agree you'.",
      example: "I agree with you about the deadline.",
      partOfSpeech: "Sentence",
      tags: ["Common Mistake", "Grammar", "A2"],
    },
    {
      word: "It depends on the context",
      definition: "Use 'depend on', not 'depend of'.",
      example: "It depends on the context and audience.",
      partOfSpeech: "Sentence",
      tags: ["Common Mistake", "Prepositions", "A2"],
    },
    {
      word: "Actually means in fact",
      definition: "False friend: 'actually' means 'in fact', not 'currently'.",
      example: "Actually, we shipped the feature yesterday.",
      partOfSpeech: "Usage note",
      tags: ["Common Mistake", "False Friends", "B1"],
    },
    {
      word: "I am looking forward to meeting you",
      definition: "Use 'look forward to' + gerund (-ing).",
      example: "I am looking forward to meeting you next week.",
      partOfSpeech: "Sentence",
      tags: ["Common Mistake", "Grammar", "B1"],
    },
    {
      word: "I need to make a decision",
      definition:
        "Use collocation 'make a decision', not 'take a decision' in most contexts.",
      example: "We need to make a decision before Friday.",
      partOfSpeech: "Sentence",
      tags: ["Common Mistake", "Collocations", "B2"],
    },
    {
      word: "I have experience in sales",
      definition: "Use 'experience in' a field, not 'experience on'.",
      example: "I have experience in sales and account management.",
      partOfSpeech: "Sentence",
      tags: ["Common Mistake", "Prepositions", "B1"],
    },
    {
      word: "Can you lend me your pen?",
      definition: "Use 'lend' when someone gives you something temporarily.",
      example: "Can you lend me your pen for a minute?",
      partOfSpeech: "Sentence",
      tags: ["Common Mistake", "Vocabulary", "A2"],
    },
    {
      word: "I missed the bus",
      definition:
        "Use 'missed' for transport/events; avoid literal translations.",
      example: "I missed the bus, so I arrived late.",
      partOfSpeech: "Sentence",
      tags: ["Common Mistake", "Vocabulary", "A2"],
    },
    {
      word: "I am responsible for onboarding",
      definition: "Use 'responsible for', not 'responsible of'.",
      example: "I am responsible for onboarding new team members.",
      partOfSpeech: "Sentence",
      tags: ["Common Mistake", "Prepositions", "B1"],
    },
  ],
};
