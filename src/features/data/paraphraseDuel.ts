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
  {
    id: "b2-6",
    sentence: "On condition that the tests pass we will deploy immediately.",
    targetConnector: "on condition that",
    acceptedAnswers: [
      "On condition that the tests pass we will deploy immediately.",
      "We will deploy immediately on condition that the tests pass.",
    ],
    tags: ["Technology", "Testing"],
    level: "B2",
  },
  {
    id: "b2-7",
    sentence: "Consequently the server crashed due to memory leaks.",
    targetConnector: "consequently",
    acceptedAnswers: ["Consequently the server crashed due to memory leaks."],
    tags: ["Technology", "Infrastructure"],
    level: "B2",
  },
  {
    id: "b2-8",
    sentence: "As a result of the audit we improved our data policies.",
    targetConnector: "as a result of",
    acceptedAnswers: [
      "As a result of the audit we improved our data policies.",
      "We improved our data policies as a result of the audit.",
    ],
    tags: ["Business", "Security"],
    level: "B2",
  },
  {
    id: "b2-9",
    sentence: "In light of recent changes the roadmap needs adjustment.",
    targetConnector: "in light of",
    acceptedAnswers: [
      "In light of recent changes the roadmap needs adjustment.",
      "The roadmap needs adjustment in light of recent changes.",
    ],
    tags: ["Business", "Planning"],
    level: "B2",
  },
  {
    id: "b2-10",
    sentence: "Furthermore the new framework reduces boilerplate code.",
    targetConnector: "furthermore",
    acceptedAnswers: [
      "Furthermore the new framework reduces boilerplate code.",
    ],
    tags: ["Technology", "Development"],
    level: "B2",
  },
  {
    id: "c1-6",
    sentence: "Notwithstanding the opposition they proceeded with the merger.",
    targetConnector: "notwithstanding",
    acceptedAnswers: [
      "Notwithstanding the opposition they proceeded with the merger.",
      "They proceeded with the merger notwithstanding the opposition.",
    ],
    tags: ["Business", "Strategy"],
    level: "C1",
  },
  {
    id: "c1-7",
    sentence: "Albeit costly the upgrade resolved our performance issues.",
    targetConnector: "albeit",
    acceptedAnswers: [
      "Albeit costly the upgrade resolved our performance issues.",
    ],
    tags: ["Technology", "Infrastructure"],
    level: "C1",
  },
  {
    id: "c1-8",
    sentence: "Henceforth all commits must pass syntax validation.",
    targetConnector: "henceforth",
    acceptedAnswers: ["Henceforth all commits must pass syntax validation."],
    tags: ["Technology", "Work"],
    level: "C1",
  },
  {
    id: "c1-9",
    sentence: "In the event of a breach isolate the affected instances.",
    targetConnector: "in the event of",
    acceptedAnswers: [
      "In the event of a breach isolate the affected instances.",
      "Isolate the affected instances in the event of a breach.",
    ],
    tags: ["Technology", "Security"],
    level: "C1",
  },
  {
    id: "c1-10",
    sentence: "By virtue of his experience he led the architectural review.",
    targetConnector: "by virtue of",
    acceptedAnswers: [
      "By virtue of his experience he led the architectural review.",
      "He led the architectural review by virtue of his experience.",
    ],
    tags: ["Technology", "Leadership"],
    level: "C1",
  },
  {
    id: "b2-11",
    sentence: "Due to unforeseen circumstances the release was postponed.",
    targetConnector: "due to",
    acceptedAnswers: [
      "Due to unforeseen circumstances the release was postponed.",
      "The release was postponed due to unforeseen circumstances.",
    ],
    tags: ["Business", "Management"],
    level: "B2",
  },
  {
    id: "b2-12",
    sentence: "Therefore we must prioritize fixing the underlying bug.",
    targetConnector: "therefore",
    acceptedAnswers: [
      "Therefore we must prioritize fixing the underlying bug.",
    ],
    tags: ["Technology", "Development"],
    level: "B2",
  },
  {
    id: "a2-6",
    sentence: "They left early so that they could catch the bus.",
    targetConnector: "so that",
    acceptedAnswers: ["They left early so that they could catch the bus."],
    tags: ["Travel"],
    level: "A2",
  },
  {
    id: "a2-7",
    sentence: "I work hard in order to pass my exams.",
    targetConnector: "in order to",
    acceptedAnswers: ["I work hard in order to pass my exams."],
    tags: ["Study"],
    level: "A2",
  },
  {
    id: "b1-6",
    sentence: "In spite of the rain we played football.",
    targetConnector: "in spite of",
    acceptedAnswers: [
      "In spite of the rain we played football.",
      "We played football in spite of the rain.",
    ],
    tags: ["Daily Life"],
    level: "B1",
  },
  {
    id: "b1-7",
    sentence: "She was promoted because of her excellent results.",
    targetConnector: "because of",
    acceptedAnswers: ["She was promoted because of her excellent results."],
    tags: ["Work"],
    level: "B1",
  },
  {
    id: "c1-11",
    sentence:
      "Inasmuch as they are interdependent both systems must be patched.",
    targetConnector: "inasmuch as",
    acceptedAnswers: [
      "Inasmuch as they are interdependent both systems must be patched.",
      "Both systems must be patched inasmuch as they are interdependent.",
    ],
    tags: ["Technology", "Architecture"],
    level: "C1",
  },
  {
    id: "c1-12",
    sentence: "By and large the migration went smoother than anticipated.",
    targetConnector: "by and large",
    acceptedAnswers: [
      "By and large the migration went smoother than anticipated.",
    ],
    tags: ["Technology", "Infrastructure"],
    level: "C1",
  },
  {
    id: "c1-13",
    sentence: "For all its flaws the legacy system was incredibly stable.",
    targetConnector: "for all",
    acceptedAnswers: [
      "For all its flaws the legacy system was incredibly stable.",
    ],
    tags: ["Technology", "Legacy"],
    level: "C1",
  },
  {
    id: "a2-8",
    sentence: "Please send me a message before you leave the office.",
    targetConnector: "before",
    acceptedAnswers: ["Please send me a message before you leave the office."],
    tags: ["Work", "Communication"],
    level: "A2",
  },
  {
    id: "a2-9",
    sentence: "We stayed inside after the storm became stronger.",
    targetConnector: "after",
    acceptedAnswers: ["We stayed inside after the storm became stronger."],
    tags: ["Weather", "Daily Life"],
    level: "A2",
  },
  {
    id: "a2-10",
    sentence: "He was hungry but he finished the call first.",
    targetConnector: "but",
    acceptedAnswers: ["He was hungry but he finished the call first."],
    tags: ["Daily Life", "Communication"],
    level: "A2",
  },
  {
    id: "a2-11",
    sentence: "If you need help ask the teacher.",
    targetConnector: "if",
    acceptedAnswers: [
      "If you need help ask the teacher.",
      "Ask the teacher if you need help.",
    ],
    tags: ["Study"],
    level: "A2",
  },
  {
    id: "b1-8",
    sentence: "While I was updating the spreadsheet Maria called the client.",
    targetConnector: "while",
    acceptedAnswers: [
      "While I was updating the spreadsheet Maria called the client.",
      "Maria called the client while I was updating the spreadsheet.",
    ],
    tags: ["Work", "Multitasking"],
    level: "B1",
  },
  {
    id: "b1-9",
    sentence: "As soon as the package arrives I will text you.",
    targetConnector: "as soon as",
    acceptedAnswers: ["As soon as the package arrives I will text you."],
    tags: ["Logistics", "Communication"],
    level: "B1",
  },
  {
    id: "b1-10",
    sentence: "Even though the room was noisy she stayed focused.",
    targetConnector: "even though",
    acceptedAnswers: [
      "Even though the room was noisy she stayed focused.",
      "She stayed focused even though the room was noisy.",
    ],
    tags: ["Study", "Concentration"],
    level: "B1",
  },
  {
    id: "b1-11",
    sentence: "Whenever we publish a release support tickets increase.",
    targetConnector: "whenever",
    acceptedAnswers: [
      "Whenever we publish a release support tickets increase.",
      "Support tickets increase whenever we publish a release.",
    ],
    tags: ["Technology", "Operations"],
    level: "B1",
  },
  {
    id: "b2-13",
    sentence: "Consequently the team reworked the onboarding flow.",
    targetConnector: "consequently",
    acceptedAnswers: ["Consequently the team reworked the onboarding flow."],
    tags: ["Product", "Analysis"],
    level: "B2",
  },
  {
    id: "b2-14",
    sentence:
      "Provided that legal approves the draft we can publish it tomorrow.",
    targetConnector: "provided that",
    acceptedAnswers: [
      "Provided that legal approves the draft we can publish it tomorrow.",
    ],
    tags: ["Work", "Policy"],
    level: "B2",
  },
  {
    id: "b2-15",
    sentence: "Rather than delay the launch we simplified the feature set.",
    targetConnector: "rather than",
    acceptedAnswers: [
      "Rather than delay the launch we simplified the feature set.",
    ],
    tags: ["Product", "Strategy"],
    level: "B2",
  },
  {
    id: "b2-16",
    sentence: "As long as the data remains anonymized we can share the report.",
    targetConnector: "as long as",
    acceptedAnswers: [
      "As long as the data remains anonymized we can share the report.",
    ],
    tags: ["Data", "Compliance"],
    level: "B2",
  },
  {
    id: "b2-17",
    sentence:
      "Even when the plan changed we kept the team aligned around the main objective.",
    targetConnector: "even when",
    acceptedAnswers: [
      "Even when the plan changed we kept the team aligned around the main objective.",
      "We kept the team aligned around the main objective even when the plan changed.",
    ],
    tags: ["Leadership", "Strategy"],
    level: "B2",
  },
  {
    id: "b2-18",
    sentence:
      "Because the risks were rising we shifted resources toward the critical path.",
    targetConnector: "because",
    acceptedAnswers: [
      "Because the risks were rising we shifted resources toward the critical path.",
      "We shifted resources toward the critical path because the risks were rising.",
    ],
    tags: ["Strategy", "Analysis"],
    level: "B2",
  },
  {
    id: "b2-19",
    sentence:
      "While the timeline was aggressive we still protected the quality bar.",
    targetConnector: "while",
    acceptedAnswers: [
      "While the timeline was aggressive we still protected the quality bar.",
      "We still protected the quality bar while the timeline was aggressive.",
    ],
    tags: ["Leadership", "Strategy"],
    level: "B2",
  },
  {
    id: "c1-14",
    sentence: "Be that as it may the board expects a clearer mitigation plan.",
    targetConnector: "be that as it may",
    acceptedAnswers: [
      "Be that as it may the board expects a clearer mitigation plan.",
    ],
    tags: ["Leadership", "Risk"],
    level: "C1",
  },
  {
    id: "c1-15",
    sentence: "So long as the assumptions hold the forecast remains credible.",
    targetConnector: "so long as",
    acceptedAnswers: [
      "So long as the assumptions hold the forecast remains credible.",
    ],
    tags: ["Finance", "Analysis"],
    level: "C1",
  },
  {
    id: "c1-16",
    sentence: "Granted that the prototype is rough it proves the concept.",
    targetConnector: "granted that",
    acceptedAnswers: [
      "Granted that the prototype is rough it proves the concept.",
    ],
    tags: ["Innovation", "Product"],
    level: "C1",
  },
  {
    id: "c1-17",
    sentence:
      "Seeing that the vendor missed two milestones we reopened the tender.",
    targetConnector: "seeing that",
    acceptedAnswers: [
      "Seeing that the vendor missed two milestones we reopened the tender.",
      "We reopened the tender seeing that the vendor missed two milestones.",
    ],
    tags: ["Procurement", "Operations"],
    level: "C1",
  },
  {
    id: "c1-18",
    sentence:
      "Notwithstanding the budget pressure we kept the strategic partnership intact.",
    targetConnector: "notwithstanding",
    acceptedAnswers: [
      "Notwithstanding the budget pressure we kept the strategic partnership intact.",
    ],
    tags: ["Business", "Strategy"],
    level: "C1",
  },
  {
    id: "c1-19",
    sentence:
      "Provided that the margin holds we can expand without weakening cash flow.",
    targetConnector: "provided that",
    acceptedAnswers: [
      "Provided that the margin holds we can expand without weakening cash flow.",
      "We can expand without weakening cash flow provided that the margin holds.",
    ],
    tags: ["Business", "Finance"],
    level: "C1",
  },
  {
    id: "c1-20",
    sentence:
      "Insofar as the board supports the pivot we can reposition the product sooner.",
    targetConnector: "insofar as",
    acceptedAnswers: [
      "Insofar as the board supports the pivot we can reposition the product sooner.",
    ],
    tags: ["Business", "Strategy"],
    level: "C1",
  },
];
