export interface SpeedBuilderRound {
  id: string;
  sentence: string;
  tags: string[];
  level: "A1" | "A2" | "B1" | "B2";
}

export const speedBuilderRounds: SpeedBuilderRound[] = [
  {
    id: "work-1",
    sentence: "I can work well under pressure",
    tags: ["Work", "Interview"],
    level: "A2",
  },
  {
    id: "work-2",
    sentence: "My main strength is clear communication",
    tags: ["Work", "Interview"],
    level: "B1",
  },
  {
    id: "work-3",
    sentence: "I always meet project deadlines",
    tags: ["Work"],
    level: "B1",
  },
  {
    id: "work-4",
    sentence: "I enjoy collaborating with cross functional teams",
    tags: ["Work"],
    level: "B2",
  },
  {
    id: "work-5",
    sentence: "I took initiative to improve onboarding",
    tags: ["Work", "Interview"],
    level: "B2",
  },
  {
    id: "travel-1",
    sentence: "Where is the boarding gate",
    tags: ["Travel"],
    level: "A1",
  },
  {
    id: "travel-2",
    sentence: "My flight is delayed by two hours",
    tags: ["Travel"],
    level: "A2",
  },
  {
    id: "travel-3",
    sentence: "I need to report lost luggage",
    tags: ["Travel"],
    level: "A2",
  },
  {
    id: "travel-4",
    sentence: "Please call an ambulance immediately",
    tags: ["Emergency"],
    level: "B1",
  },
  {
    id: "travel-5",
    sentence: "I have travel insurance for emergencies",
    tags: ["Travel", "Emergency"],
    level: "B2",
  },
];
