export type TransformerMode = "question" | "negative" | "conditional";

export interface SentenceTransformerRound {
  id: string;
  baseSentence: string;
  mode: TransformerMode;
  expectedSentence: string;
  tags: string[];
  level: "A2" | "B1" | "B2" | "C1";
}

export const sentenceTransformerRounds: SentenceTransformerRound[] = [
  {
    id: "a2-1",
    baseSentence: "She works remotely on Fridays.",
    mode: "question",
    expectedSentence: "Does she work remotely on Fridays?",
    tags: ["Work"],
    level: "A2",
  },
  {
    id: "a2-2",
    baseSentence: "They are ready for the meeting.",
    mode: "negative",
    expectedSentence: "They are not ready for the meeting.",
    tags: ["Meetings"],
    level: "A2",
  },
  {
    id: "a2-3",
    baseSentence: "You like this new app.",
    mode: "question",
    expectedSentence: "Do you like this new app?",
    tags: ["Daily Life"],
    level: "A2",
  },
  {
    id: "b1-1",
    baseSentence: "I finish this report tonight.",
    mode: "conditional",
    expectedSentence:
      "If I finish this report tonight I will send it tomorrow.",
    tags: ["Work"],
    level: "B1",
  },
  {
    id: "b1-2",
    baseSentence: "He understands the instructions.",
    mode: "negative",
    expectedSentence: "He does not understand the instructions.",
    tags: ["Study"],
    level: "B1",
  },
  {
    id: "b1-3",
    baseSentence: "We finish early today.",
    mode: "question",
    expectedSentence: "Do we finish early today?",
    tags: ["Work"],
    level: "B1",
  },
  {
    id: "b2-1",
    baseSentence: "The team delivered on time.",
    mode: "question",
    expectedSentence: "Did the team deliver on time?",
    tags: ["Work"],
    level: "B2",
  },
  {
    id: "b2-2",
    baseSentence: "We can reduce costs this quarter.",
    mode: "conditional",
    expectedSentence:
      "If we can reduce costs this quarter we will improve margins.",
    tags: ["Business"],
    level: "B2",
  },
  {
    id: "b2-3",
    baseSentence: "The report included all key metrics.",
    mode: "negative",
    expectedSentence: "The report did not include all key metrics.",
    tags: ["Analysis"],
    level: "B2",
  },
  {
    id: "c1-1",
    baseSentence: "The proposal addresses all major risks.",
    mode: "negative",
    expectedSentence: "The proposal does not address all major risks.",
    tags: ["Strategy"],
    level: "C1",
  },
  {
    id: "c1-2",
    baseSentence: "They had enough data before making the decision.",
    mode: "conditional",
    expectedSentence:
      "If they had had enough data they would have made a better decision.",
    tags: ["Analysis"],
    level: "C1",
  },
  {
    id: "c1-3",
    baseSentence: "The board approves the proposal this week.",
    mode: "question",
    expectedSentence: "Does the board approve the proposal this week?",
    tags: ["Business"],
    level: "C1",
  },
  {
    id: "a2-4",
    baseSentence: "He plays football on Sundays.",
    mode: "negative",
    expectedSentence: "He does not play football on Sundays.",
    tags: ["Daily Life"],
    level: "A2",
  },
  {
    id: "a2-5",
    baseSentence: "You are free this afternoon.",
    mode: "question",
    expectedSentence: "Are you free this afternoon?",
    tags: ["Communication"],
    level: "A2",
  },
  {
    id: "b1-4",
    baseSentence: "She attends every training session.",
    mode: "question",
    expectedSentence: "Does she attend every training session?",
    tags: ["Study"],
    level: "B1",
  },
  {
    id: "b1-5",
    baseSentence: "They finish all tasks today.",
    mode: "conditional",
    expectedSentence: "If they finish all tasks today they will leave early.",
    tags: ["Work"],
    level: "B1",
  },
  {
    id: "b2-4",
    baseSentence: "The client accepted the revised contract.",
    mode: "question",
    expectedSentence: "Did the client accept the revised contract?",
    tags: ["Business"],
    level: "B2",
  },
  {
    id: "b2-5",
    baseSentence: "We have enough capacity for this launch.",
    mode: "negative",
    expectedSentence: "We do not have enough capacity for this launch.",
    tags: ["Planning"],
    level: "B2",
  },
  {
    id: "c1-4",
    baseSentence: "The team understands the long term implications.",
    mode: "negative",
    expectedSentence:
      "The team does not understand the long term implications.",
    tags: ["Analysis"],
    level: "C1",
  },
  {
    id: "c1-5",
    baseSentence: "The committee supports the revised methodology.",
    mode: "question",
    expectedSentence: "Does the committee support the revised methodology?",
    tags: ["Academic"],
    level: "C1",
  },
];
