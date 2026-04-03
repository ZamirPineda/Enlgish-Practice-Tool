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
  {
    id: "b2-6",
    baseSentence:
      "The deployment failed due to a missing environment variable.",
    mode: "conditional",
    expectedSentence:
      "If the deployment had not failed due to a missing environment variable it would have succeeded.",
    tags: ["Technology"],
    level: "B2",
  },
  {
    id: "b2-7",
    baseSentence: "They plan to refactor the legacy code over the weekend.",
    mode: "negative",
    expectedSentence:
      "They do not plan to refactor the legacy code over the weekend.",
    tags: ["Technology", "Work"],
    level: "B2",
  },
  {
    id: "b2-8",
    baseSentence: "The stakeholders agreed to the revised timeline.",
    mode: "question",
    expectedSentence: "Did the stakeholders agree to the revised timeline?",
    tags: ["Business", "Meetings"],
    level: "B2",
  },
  {
    id: "b2-9",
    baseSentence: "The team prioritizes technical debt over new features.",
    mode: "negative",
    expectedSentence:
      "The team does not prioritize technical debt over new features.",
    tags: ["Technology", "Strategy"],
    level: "B2",
  },
  {
    id: "b2-10",
    baseSentence:
      "The new framework improved application performance significantly.",
    mode: "conditional",
    expectedSentence:
      "If the new framework improved application performance significantly we should adopt it globally.",
    tags: ["Technology", "Performance"],
    level: "B2",
  },
  {
    id: "c1-6",
    baseSentence:
      "The security audit revealed several critical vulnerabilities in the architecture.",
    mode: "question",
    expectedSentence:
      "Did the security audit reveal several critical vulnerabilities in the architecture?",
    tags: ["Security", "Technology"],
    level: "C1",
  },
  {
    id: "c1-7",
    baseSentence: "The board recognized the strategic value of the merger.",
    mode: "negative",
    expectedSentence:
      "The board did not recognize the strategic value of the merger.",
    tags: ["Business", "Strategy"],
    level: "C1",
  },
  {
    id: "c1-8",
    baseSentence:
      "We allocate sufficient resources to research and development.",
    mode: "conditional",
    expectedSentence:
      "If we allocate sufficient resources to research and development we will maintain our competitive edge.",
    tags: ["Business", "Strategy"],
    level: "C1",
  },
  {
    id: "c1-9",
    baseSentence: "The migration process disrupted the production environment.",
    mode: "negative",
    expectedSentence:
      "The migration process did not disrupt the production environment.",
    tags: ["Technology", "Infrastructure"],
    level: "C1",
  },
  {
    id: "c1-10",
    baseSentence:
      "The predictive model accurately forecasted the market downturn.",
    mode: "question",
    expectedSentence:
      "Did the predictive model accurately forecast the market downturn?",
    tags: ["Analysis", "Business"],
    level: "C1",
  },
  {
    id: "b2-11",
    baseSentence: "The API endpoint handles concurrent requests efficiently.",
    mode: "question",
    expectedSentence:
      "Does the API endpoint handle concurrent requests efficiently?",
    tags: ["Technology", "Performance"],
    level: "B2",
  },
  {
    id: "b2-12",
    baseSentence: "Optimizing the database queries reduced latency by half.",
    mode: "negative",
    expectedSentence:
      "Optimizing the database queries did not reduce latency by half.",
    tags: ["Technology", "Optimization"],
    level: "B2",
  },
  {
    id: "b2-13",
    baseSentence:
      "We finish the regression testing before the release candidate.",
    mode: "conditional",
    expectedSentence:
      "If we finish the regression testing before the release candidate we can deploy on Friday.",
    tags: ["Technology", "Testing"],
    level: "B2",
  },
  {
    id: "c1-11",
    baseSentence:
      "The algorithm struggles to process unstructured data at scale.",
    mode: "negative",
    expectedSentence:
      "The algorithm does not struggle to process unstructured data at scale.",
    tags: ["Technology", "Data"],
    level: "C1",
  },
  {
    id: "c1-12",
    baseSentence: "They implemented a robust disaster recovery plan.",
    mode: "question",
    expectedSentence: "Did they implement a robust disaster recovery plan?",
    tags: ["Technology", "Infrastructure"],
    level: "C1",
  },
  {
    id: "c1-13",
    baseSentence:
      "The unexpected network partition compromised the distributed consensus.",
    mode: "conditional",
    expectedSentence:
      "If the unexpected network partition had compromised the distributed consensus the system would have halted.",
    tags: ["Technology", "Architecture"],
    level: "C1",
  },
  {
    id: "b2-14",
    baseSentence: "The marketing campaign generated high quality leads.",
    mode: "negative",
    expectedSentence:
      "The marketing campaign did not generate high quality leads.",
    tags: ["Business", "Marketing"],
    level: "B2",
  },
  {
    id: "c1-14",
    baseSentence:
      "The asynchronous operations inadvertently introduced a race condition.",
    mode: "question",
    expectedSentence:
      "Did the asynchronous operations inadvertently introduce a race condition?",
    tags: ["Technology", "Programming"],
    level: "C1",
  },
  {
    id: "c1-15",
    baseSentence: "The company adopts a microservices architecture.",
    mode: "conditional",
    expectedSentence:
      "If the company adopts a microservices architecture it will improve scalability.",
    tags: ["Technology", "Architecture"],
    level: "C1",
  },
  {
    id: "a2-6",
    baseSentence: "Your brother cooks dinner on Sundays.",
    mode: "question",
    expectedSentence: "Does your brother cook dinner on Sundays?",
    tags: ["Family", "Daily Life"],
    level: "A2",
  },
  {
    id: "a2-7",
    baseSentence: "We are late for class.",
    mode: "negative",
    expectedSentence: "We are not late for class.",
    tags: ["Study"],
    level: "A2",
  },
  {
    id: "a2-8",
    baseSentence: "I save enough money this month.",
    mode: "conditional",
    expectedSentence:
      "If I save enough money this month I will buy a new headset.",
    tags: ["Finance", "Daily Life"],
    level: "A2",
  },
  {
    id: "a2-9",
    baseSentence: "The shop opens at nine.",
    mode: "question",
    expectedSentence: "Does the shop open at nine?",
    tags: ["Shopping"],
    level: "A2",
  },
  {
    id: "b1-6",
    baseSentence: "They attend the client workshop every quarter.",
    mode: "negative",
    expectedSentence: "They do not attend the client workshop every quarter.",
    tags: ["Work", "Training"],
    level: "B1",
  },
  {
    id: "b1-7",
    baseSentence: "She finishes the design review today.",
    mode: "conditional",
    expectedSentence:
      "If she finishes the design review today she will send the revised mockups tonight.",
    tags: ["Design", "Work"],
    level: "B1",
  },
  {
    id: "b1-8",
    baseSentence: "You usually take notes during meetings.",
    mode: "question",
    expectedSentence: "Do you usually take notes during meetings?",
    tags: ["Meetings", "Study"],
    level: "B1",
  },
  {
    id: "b1-9",
    baseSentence: "The interns understand the safety guidelines.",
    mode: "negative",
    expectedSentence: "The interns do not understand the safety guidelines.",
    tags: ["Work", "Safety"],
    level: "B1",
  },
  {
    id: "b2-15",
    baseSentence: "The procurement team renegotiated the contract last week.",
    mode: "question",
    expectedSentence:
      "Did the procurement team renegotiate the contract last week?",
    tags: ["Business", "Negotiation"],
    level: "B2",
  },
  {
    id: "b2-16",
    baseSentence: "The dashboard highlights the most critical anomalies.",
    mode: "negative",
    expectedSentence:
      "The dashboard does not highlight the most critical anomalies.",
    tags: ["Data", "Analysis"],
    level: "B2",
  },
  {
    id: "b2-17",
    baseSentence:
      "We complete the migration before the seasonal campaign starts.",
    mode: "conditional",
    expectedSentence:
      "If we complete the migration before the seasonal campaign starts we will avoid a major bottleneck.",
    tags: ["Technology", "Planning"],
    level: "B2",
  },
  {
    id: "b2-18",
    baseSentence: "The facilitator summarized the concerns at the end.",
    mode: "question",
    expectedSentence: "Did the facilitator summarize the concerns at the end?",
    tags: ["Meetings", "Communication"],
    level: "B2",
  },
  {
    id: "c1-16",
    baseSentence: "The revised framework eliminates systemic bias.",
    mode: "negative",
    expectedSentence: "The revised framework does not eliminate systemic bias.",
    tags: ["Policy", "Analysis"],
    level: "C1",
  },
  {
    id: "c1-17",
    baseSentence:
      "The compliance team identified the inconsistency before the audit.",
    mode: "question",
    expectedSentence:
      "Did the compliance team identify the inconsistency before the audit?",
    tags: ["Compliance", "Audit"],
    level: "C1",
  },
  {
    id: "c1-18",
    baseSentence: "The committee had reviewed the evidence carefully.",
    mode: "conditional",
    expectedSentence:
      "If the committee had reviewed the evidence carefully it would have reached a more balanced conclusion.",
    tags: ["Research", "Decision Making"],
    level: "C1",
  },
  {
    id: "c1-19",
    baseSentence:
      "The vendor discloses all material assumptions in the appendix.",
    mode: "negative",
    expectedSentence:
      "The vendor does not disclose all material assumptions in the appendix.",
    tags: ["Procurement", "Documentation"],
    level: "C1",
  },
];
