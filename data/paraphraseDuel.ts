export interface ParaphraseDuelRound {
  id: string;
  sentence: string;
  targetConnector: string;
  acceptedAnswers: string[];
  tags: string[];
  level: "A2" | "B1" | "B2" | "C1";
}

export const paraphraseDuelRounds: ParaphraseDuelRound[] = [
  {
    id: "a2-1",
    sentence: "I stayed home because it was raining.",
    targetConnector: "because",
    acceptedAnswers: ["I stayed home because it was raining."],
    tags: ["Daily Life"],
    level: "A2",
  },
  {
    id: "a2-2",
    sentence: "I was tired so I went to bed early.",
    targetConnector: "so",
    acceptedAnswers: ["I was tired so I went to bed early."],
    tags: ["Daily Life"],
    level: "A2",
  },
  {
    id: "a2-3",
    sentence: "We took a taxi because the bus was late.",
    targetConnector: "because",
    acceptedAnswers: ["We took a taxi because the bus was late."],
    tags: ["Travel"],
    level: "A2",
  },
  {
    id: "b1-1",
    sentence: "Although he was nervous he gave a clear presentation.",
    targetConnector: "although",
    acceptedAnswers: [
      "Although he was nervous he gave a clear presentation.",
      "He gave a clear presentation although he was nervous.",
    ],
    tags: ["Work"],
    level: "B1",
  },
  {
    id: "b1-2",
    sentence: "I will call you when I finish the meeting.",
    targetConnector: "when",
    acceptedAnswers: ["I will call you when I finish the meeting."],
    tags: ["Communication"],
    level: "B1",
  },
  {
    id: "b1-3",
    sentence: "Since the task was urgent we reassigned priorities.",
    targetConnector: "since",
    acceptedAnswers: [
      "Since the task was urgent we reassigned priorities.",
      "We reassigned priorities since the task was urgent.",
    ],
    tags: ["Work", "Planning"],
    level: "B1",
  },
  {
    id: "b2-1",
    sentence: "Despite the delay the team met the deadline.",
    targetConnector: "despite",
    acceptedAnswers: ["Despite the delay the team met the deadline."],
    tags: ["Work", "Planning"],
    level: "B2",
  },
  {
    id: "b2-2",
    sentence: "Unless we reduce scope we will miss the release date.",
    targetConnector: "unless",
    acceptedAnswers: ["Unless we reduce scope we will miss the release date."],
    tags: ["Work", "Strategy"],
    level: "B2",
  },
  {
    id: "b2-3",
    sentence:
      "Whereas the first draft was concise this one is more persuasive.",
    targetConnector: "whereas",
    acceptedAnswers: [
      "Whereas the first draft was concise this one is more persuasive.",
    ],
    tags: ["Communication", "Analysis"],
    level: "B2",
  },
  {
    id: "c1-1",
    sentence:
      "Not only did the proposal cut costs but it also improved quality.",
    targetConnector: "not only",
    acceptedAnswers: [
      "Not only did the proposal cut costs but it also improved quality.",
    ],
    tags: ["Business"],
    level: "C1",
  },
  {
    id: "c1-2",
    sentence: "Had we gathered more data we would have avoided that risk.",
    targetConnector: "had",
    acceptedAnswers: [
      "Had we gathered more data we would have avoided that risk.",
    ],
    tags: ["Analysis"],
    level: "C1",
  },
  {
    id: "c1-3",
    sentence:
      "Much as I value speed we cannot compromise the integrity of the findings.",
    targetConnector: "much as",
    acceptedAnswers: [
      "Much as I value speed we cannot compromise the integrity of the findings.",
    ],
    tags: ["Research", "Debate"],
    level: "C1",
  },
  {
    id: "a2-4",
    sentence: "We missed the train so we took a taxi.",
    targetConnector: "so",
    acceptedAnswers: ["We missed the train so we took a taxi."],
    tags: ["Travel"],
    level: "A2",
  },
  {
    id: "a2-5",
    sentence: "I wore a jacket because it was cold.",
    targetConnector: "because",
    acceptedAnswers: ["I wore a jacket because it was cold."],
    tags: ["Daily Life"],
    level: "A2",
  },
  {
    id: "b1-4",
    sentence: "Even though the task was difficult we finished on time.",
    targetConnector: "even though",
    acceptedAnswers: [
      "Even though the task was difficult we finished on time.",
      "We finished on time even though the task was difficult.",
    ],
    tags: ["Work"],
    level: "B1",
  },
  {
    id: "b1-5",
    sentence: "As soon as she arrives we will start the call.",
    targetConnector: "as soon as",
    acceptedAnswers: ["As soon as she arrives we will start the call."],
    tags: ["Communication"],
    level: "B1",
  },
  {
    id: "b2-4",
    sentence: "Provided that we secure funding we can expand next quarter.",
    targetConnector: "provided that",
    acceptedAnswers: [
      "Provided that we secure funding we can expand next quarter.",
    ],
    tags: ["Business", "Planning"],
    level: "B2",
  },
  {
    id: "b2-5",
    sentence: "Even if demand increases we should avoid reducing quality.",
    targetConnector: "even if",
    acceptedAnswers: [
      "Even if demand increases we should avoid reducing quality.",
    ],
    tags: ["Strategy"],
    level: "B2",
  },
  {
    id: "c1-4",
    sentence:
      "Insofar as the data remain incomplete any forecast will be provisional.",
    targetConnector: "insofar as",
    acceptedAnswers: [
      "Insofar as the data remain incomplete any forecast will be provisional.",
    ],
    tags: ["Analysis"],
    level: "C1",
  },
  {
    id: "c1-5",
    sentence:
      "Be that as it may we still need a contingency plan before launch.",
    targetConnector: "be that as it may",
    acceptedAnswers: [
      "Be that as it may we still need a contingency plan before launch.",
    ],
    tags: ["Leadership", "Strategy"],
    level: "C1",
  },
];
