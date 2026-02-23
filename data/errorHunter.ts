export interface ErrorHunterRound {
  id: string;
  incorrectSentence: string;
  correctedSentence: string;
  errorType: string;
  tags: string[];
  level: "A2" | "B1" | "B2" | "C1";
}

export const errorHunterRounds: ErrorHunterRound[] = [
  {
    id: "a2-1",
    incorrectSentence: "He go to work by bus every day",
    correctedSentence: "He goes to work by bus every day",
    errorType: "Present Simple (3rd person)",
    tags: ["Daily Life"],
    level: "A2",
  },
  {
    id: "a2-2",
    incorrectSentence: "She don't like cold weather",
    correctedSentence: "She doesn't like cold weather",
    errorType: "Auxiliary do/does",
    tags: ["Daily Life"],
    level: "A2",
  },
  {
    id: "a2-3",
    incorrectSentence: "We was late because of traffic",
    correctedSentence: "We were late because of traffic",
    errorType: "Verb to be (past)",
    tags: ["Travel"],
    level: "A2",
  },
  {
    id: "a2-4",
    incorrectSentence: "I have went to that museum twice",
    correctedSentence: "I have gone to that museum twice",
    errorType: "Present Perfect participle",
    tags: ["Travel"],
    level: "A2",
  },
  {
    id: "a2-5",
    incorrectSentence: "There is many options in this menu",
    correctedSentence: "There are many options in this menu",
    errorType: "There is / There are",
    tags: ["Food"],
    level: "A2",
  },
  {
    id: "b1-1",
    incorrectSentence: "If I will see him I will tell him",
    correctedSentence: "If I see him I will tell him",
    errorType: "First conditional",
    tags: ["Communication"],
    level: "B1",
  },
  {
    id: "b1-2",
    incorrectSentence: "She suggested to take a short break",
    correctedSentence: "She suggested taking a short break",
    errorType: "Gerund after suggest",
    tags: ["Work"],
    level: "B1",
  },
  {
    id: "b1-3",
    incorrectSentence: "I look forward to meet your team",
    correctedSentence: "I look forward to meeting your team",
    errorType: "Gerund after preposition",
    tags: ["Work"],
    level: "B1",
  },
  {
    id: "b1-4",
    incorrectSentence: "He asked me where did I park",
    correctedSentence: "He asked me where I parked",
    errorType: "Reported questions",
    tags: ["Daily Life"],
    level: "B1",
  },
  {
    id: "b1-5",
    incorrectSentence: "By next month I will finish the training",
    correctedSentence: "By next month I will have finished the training",
    errorType: "Future Perfect",
    tags: ["Study"],
    level: "B1",
  },
  {
    id: "b2-1",
    incorrectSentence: "By the time we arrived the meeting already started",
    correctedSentence: "By the time we arrived the meeting had already started",
    errorType: "Past Perfect",
    tags: ["Meetings"],
    level: "B2",
  },
  {
    id: "b2-2",
    incorrectSentence:
      "Not only he missed the deadline but he also ignored feedback",
    correctedSentence:
      "Not only did he miss the deadline but he also ignored feedback",
    errorType: "Inversion with not only",
    tags: ["Work"],
    level: "B2",
  },
  {
    id: "b2-3",
    incorrectSentence: "I wish I would know the answer",
    correctedSentence: "I wish I knew the answer",
    errorType: "Wish + past",
    tags: ["Study"],
    level: "B2",
  },
  {
    id: "b2-4",
    incorrectSentence: "The manager demanded that he submits the report",
    correctedSentence: "The manager demanded that he submit the report",
    errorType: "Mandative subjunctive",
    tags: ["Business"],
    level: "B2",
  },
  {
    id: "b2-5",
    incorrectSentence: "No sooner we had left than the client called",
    correctedSentence: "No sooner had we left than the client called",
    errorType: "Inversion with no sooner",
    tags: ["Work"],
    level: "B2",
  },
  {
    id: "c1-1",
    incorrectSentence: "Hardly I had entered the room when the phone rang",
    correctedSentence: "Hardly had I entered the room when the phone rang",
    errorType: "Inversion with hardly",
    tags: ["Communication"],
    level: "C1",
  },
  {
    id: "c1-2",
    incorrectSentence:
      "Were I knew the implications I would have escalated sooner",
    correctedSentence:
      "Had I known the implications I would have escalated sooner",
    errorType: "Third conditional inversion",
    tags: ["Leadership"],
    level: "C1",
  },
  {
    id: "c1-3",
    incorrectSentence: "It is high time we are addressing this bottleneck",
    correctedSentence: "It is high time we addressed this bottleneck",
    errorType: "High time + past",
    tags: ["Strategy"],
    level: "C1",
  },
  {
    id: "c1-4",
    incorrectSentence:
      "Scarcely had the launch started when the server crashed",
    correctedSentence:
      "Scarcely had the launch started when the servers crashed",
    errorType: "Subject agreement",
    tags: ["Technology"],
    level: "C1",
  },
  {
    id: "c1-5",
    incorrectSentence:
      "So complex the issue was that nobody proposed a quick fix",
    correctedSentence:
      "So complex was the issue that nobody proposed a quick fix",
    errorType: "Inversion with so + adjective",
    tags: ["Debate"],
    level: "C1",
  },
];
