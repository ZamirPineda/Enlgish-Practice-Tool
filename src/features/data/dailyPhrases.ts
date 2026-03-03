export interface DailyPhrase {
  id: string;
  text: string;
  meaning: string;
  context: string;
  tags: string[];
}

export const dailyPhrases: DailyPhrase[] = [
  {
    id: "daily-01",
    text: "Could you walk me through your experience?",
    meaning: "Used in interviews to ask for a structured summary.",
    context: "Interview",
    tags: ["Interview", "Work", "B1"],
  },
  {
    id: "daily-02",
    text: "I am looking for opportunities to grow professionally.",
    meaning: "Expresses career motivation in a positive way.",
    context: "Interview",
    tags: ["Interview", "Work", "B1"],
  },
  {
    id: "daily-03",
    text: "Where can I find the baggage claim area?",
    meaning: "Useful question at airports after landing.",
    context: "Travel",
    tags: ["Travel", "A2"],
  },
  {
    id: "daily-04",
    text: "I need to report a lost passport.",
    meaning: "Essential phrase for travel emergencies.",
    context: "Travel Emergency",
    tags: ["Travel", "Emergency", "B1"],
  },
  {
    id: "daily-05",
    text: "Could we align on priorities for this week?",
    meaning: "Professional phrase to coordinate team focus.",
    context: "Work",
    tags: ["Work", "B2"],
  },
  {
    id: "daily-06",
    text: "I appreciate your feedback and I will apply it.",
    meaning: "Shows coachability in formal settings.",
    context: "Interview",
    tags: ["Interview", "Work", "B1"],
  },
  {
    id: "daily-07",
    text: "Is there a delay on this flight?",
    meaning: "Direct way to ask for status updates.",
    context: "Travel",
    tags: ["Travel", "A2"],
  },
  {
    id: "daily-08",
    text: "I can adapt quickly to new tools and processes.",
    meaning: "Highlights flexibility and learning mindset.",
    context: "Interview",
    tags: ["Interview", "Work", "B2"],
  },
  {
    id: "daily-09",
    text: "Could you tell me where the nearest pharmacy is?",
    meaning: "Helpful phrase for health needs while traveling.",
    context: "Travel Emergency",
    tags: ["Travel", "Health", "B1"],
  },
  {
    id: "daily-10",
    text: "I usually take initiative when I spot a recurring issue.",
    meaning: "Strong interview phrase for ownership.",
    context: "Interview",
    tags: ["Interview", "Work", "B2"],
  },
  {
    id: "daily-11",
    text: "Can you help me with check-in, please?",
    meaning: "Polite request at airports or hotels.",
    context: "Travel",
    tags: ["Travel", "A1"],
  },
  {
    id: "daily-12",
    text: "I am available to start as soon as needed.",
    meaning: "Common closing phrase in interviews.",
    context: "Interview",
    tags: ["Interview", "Work", "B1"],
  },
];
