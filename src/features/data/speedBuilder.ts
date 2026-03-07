export interface SpeedBuilderRound {
  id: string;
  sentence: string;
  tags: string[];
  level: "A1" | "A2" | "B1" | "B2" | "C1";
}

export const speedBuilderRounds: SpeedBuilderRound[] = [
  {
    id: "a1-daily-1",
    sentence: "I wake up at seven every day",
    tags: ["Daily Life"],
    level: "A1",
  },
  {
    id: "a1-daily-2",
    sentence: "She studies English after dinner",
    tags: ["Daily Life", "Study"],
    level: "A1",
  },
  {
    id: "a1-travel-1",
    sentence: "Where is the boarding gate",
    tags: ["Travel"],
    level: "A1",
  },
  {
    id: "a1-home-1",
    sentence: "Please close the window before you leave",
    tags: ["Home", "Daily Life"],
    level: "A1",
  },
  {
    id: "a1-food-1",
    sentence: "I would like a chicken sandwich please",
    tags: ["Food", "Daily Life"],
    level: "A1",
  },
  {
    id: "a1-study-1",
    sentence: "We have a vocabulary quiz on Friday",
    tags: ["Study"],
    level: "A1",
  },
  {
    id: "a1-social-1",
    sentence: "My best friend lives near my school",
    tags: ["Social", "Daily Life"],
    level: "A1",
  },
  {
    id: "a1-travel-2",
    sentence: "Can you show me the city map",
    tags: ["Travel"],
    level: "A1",
  },
  {
    id: "a2-work-1",
    sentence: "I can work well under pressure",
    tags: ["Work", "Interview"],
    level: "A2",
  },
  {
    id: "a2-travel-1",
    sentence: "My train leaves at half past nine",
    tags: ["Travel"],
    level: "A2",
  },
  {
    id: "a2-travel-2",
    sentence: "My flight is delayed by two hours",
    tags: ["Travel"],
    level: "A2",
  },
  {
    id: "a2-travel-3",
    sentence: "I need to report lost luggage",
    tags: ["Travel"],
    level: "A2",
  },
  {
    id: "a2-work-2",
    sentence: "I am responsible for updating customer records",
    tags: ["Work"],
    level: "A2",
  },
  {
    id: "a2-health-1",
    sentence: "I have had this headache since yesterday",
    tags: ["Health", "Daily Life"],
    level: "A2",
  },
  {
    id: "a2-study-1",
    sentence: "Could you repeat that more slowly please",
    tags: ["Study", "Communication"],
    level: "A2",
  },
  {
    id: "a2-social-1",
    sentence: "We are planning a surprise party tonight",
    tags: ["Social"],
    level: "A2",
  },
  {
    id: "b1-work-1",
    sentence: "My main strength is clear communication",
    tags: ["Work", "Interview"],
    level: "B1",
  },
  {
    id: "b1-work-2",
    sentence: "I always meet project deadlines",
    tags: ["Work"],
    level: "B1",
  },
  {
    id: "b1-work-3",
    sentence: "Could you clarify the final project requirements",
    tags: ["Work", "Meetings"],
    level: "B1",
  },
  {
    id: "b1-emergency-1",
    sentence: "Please call an ambulance immediately",
    tags: ["Emergency"],
    level: "B1",
  },
  {
    id: "b1-work-4",
    sentence: "If we leave now we will avoid rush hour traffic",
    tags: ["Work", "Planning"],
    level: "B1",
  },
  {
    id: "b1-study-1",
    sentence: "I have been reviewing these phrasal verbs all week",
    tags: ["Study"],
    level: "B1",
  },
  {
    id: "b1-social-1",
    sentence: "Although I was tired I joined the meeting",
    tags: ["Social", "Work"],
    level: "B1",
  },
  {
    id: "b1-travel-1",
    sentence: "Would you mind helping me fill out this form",
    tags: ["Travel", "Communication"],
    level: "B1",
  },
  {
    id: "b2-work-1",
    sentence: "I enjoy collaborating with cross functional teams",
    tags: ["Work"],
    level: "B2",
  },
  {
    id: "b2-work-2",
    sentence: "I took initiative to improve onboarding",
    tags: ["Work", "Interview"],
    level: "B2",
  },
  {
    id: "b2-work-3",
    sentence: "We need to align expectations before implementation",
    tags: ["Work", "Planning"],
    level: "B2",
  },
  {
    id: "b2-travel-1",
    sentence: "I have travel insurance for emergencies",
    tags: ["Travel", "Emergency"],
    level: "B2",
  },
  {
    id: "b2-work-4",
    sentence:
      "By the time we launched the campaign competitors had already adjusted",
    tags: ["Work", "Strategy"],
    level: "B2",
  },
  {
    id: "b2-business-1",
    sentence: "The report highlights several risks that we cannot ignore",
    tags: ["Business", "Analysis"],
    level: "B2",
  },
  {
    id: "b2-meeting-1",
    sentence: "Unless we prioritize tasks the deadline will be unrealistic",
    tags: ["Work", "Meetings"],
    level: "B2",
  },
  {
    id: "b2-academic-1",
    sentence: "Her argument was persuasive despite limited supporting evidence",
    tags: ["Academic", "Communication"],
    level: "B2",
  },
  {
    id: "b2-interview-1",
    sentence:
      "I would approach that challenge by prioritizing impact over visibility",
    tags: ["Interview", "Work"],
    level: "B2",
  },
  {
    id: "b2-interview-2",
    sentence:
      "One lesson I learned was to escalate issues before they become critical",
    tags: ["Interview", "Reflection"],
    level: "B2",
  },
  {
    id: "b2-negotiation-1",
    sentence: "If we revise the scope now we can still deliver on schedule",
    tags: ["Negotiation", "Planning"],
    level: "B2",
  },
  {
    id: "b2-debate-1",
    sentence:
      "While your point is valid it overlooks the long term maintenance cost",
    tags: ["Debate", "Analysis"],
    level: "B2",
  },
  {
    id: "b2-presentation-1",
    sentence:
      "As this chart illustrates customer retention improved after the redesign",
    tags: ["Presentation", "Business"],
    level: "B2",
  },
  {
    id: "b2-strategy-2",
    sentence:
      "Rather than expanding immediately we should validate demand in smaller markets",
    tags: ["Strategy", "Business"],
    level: "B2",
  },
  {
    id: "b2-meeting-2",
    sentence:
      "Could we revisit the assumptions behind this forecast before approving budget",
    tags: ["Meetings", "Business"],
    level: "B2",
  },
  {
    id: "b2-communication-2",
    sentence:
      "I appreciate the feedback and I will incorporate it into the next draft",
    tags: ["Communication", "Work"],
    level: "B2",
  },
  {
    id: "c1-work-1",
    sentence:
      "Had we anticipated the bottleneck we could have prevented delays",
    tags: ["Work", "Reflection"],
    level: "C1",
  },
  {
    id: "c1-business-1",
    sentence: "The proposal was compelling enough to secure stakeholder buy in",
    tags: ["Business", "Presentation"],
    level: "C1",
  },
  {
    id: "c1-strategy-1",
    sentence:
      "Despite the constraints the team delivered a remarkably coherent strategy",
    tags: ["Work", "Strategy"],
    level: "C1",
  },
  {
    id: "c1-work-2",
    sentence:
      "Seldom have I seen such a nuanced response to a complex operational issue",
    tags: ["Work", "Analysis"],
    level: "C1",
  },
  {
    id: "c1-academic-1",
    sentence:
      "Not only did the findings challenge our assumptions they also reframed the debate",
    tags: ["Academic", "Research"],
    level: "C1",
  },
  {
    id: "c1-meeting-1",
    sentence:
      "Were we to postpone the release we might preserve long term credibility",
    tags: ["Work", "Decision Making"],
    level: "C1",
  },
  {
    id: "c1-business-2",
    sentence:
      "The extent to which customer trust has eroded remains difficult to quantify",
    tags: ["Business", "Customer"],
    level: "C1",
  },
  {
    id: "c1-communication-1",
    sentence:
      "What ultimately convinced the board was the clarity of the risk mitigation plan",
    tags: ["Communication", "Leadership"],
    level: "C1",
  },
  {
    id: "c1-interview-1",
    sentence:
      "What differentiates my profile is the consistency with which I deliver under ambiguity",
    tags: ["Interview", "Leadership"],
    level: "C1",
  },
  {
    id: "c1-interview-2",
    sentence:
      "Had I been given clearer constraints I would have optimized the rollout differently",
    tags: ["Interview", "Reflection"],
    level: "C1",
  },
  {
    id: "c1-debate-1",
    sentence:
      "Much as I sympathize with that view it underestimates the regulatory implications",
    tags: ["Debate", "Policy"],
    level: "C1",
  },
  {
    id: "c1-debate-2",
    sentence:
      "Rarely does a single metric capture the trade off between growth and resilience",
    tags: ["Debate", "Analysis"],
    level: "C1",
  },
  {
    id: "c1-presentation-1",
    sentence:
      "What this trajectory suggests is that profitability hinges on disciplined execution",
    tags: ["Presentation", "Business"],
    level: "C1",
  },
  {
    id: "c1-negotiation-1",
    sentence:
      "Should the vendor fail to meet the terms we will invoke the penalty clause",
    tags: ["Negotiation", "Business"],
    level: "C1",
  },
  {
    id: "c1-strategy-2",
    sentence:
      "It is imperative that we diversify revenue streams before market conditions tighten",
    tags: ["Strategy", "Leadership"],
    level: "C1",
  },
  {
    id: "c1-communication-2",
    sentence:
      "The extent to which teams internalize feedback often determines long term performance",
    tags: ["Communication", "Performance"],
    level: "C1",
  },
  {
    id: "b2-tech-1",
    sentence:
      "We need to ensure backward compatibility before merging this pull request",
    tags: ["Technology", "Engineering"],
    level: "B2",
  },
  {
    id: "b2-tech-2",
    sentence: "The new architecture significantly reduces technical debt",
    tags: ["Technology", "Architecture"],
    level: "B2",
  },
  {
    id: "b2-tech-3",
    sentence: "Are we ready to deploy the hotfix to production environments",
    tags: ["Technology", "Deployment"],
    level: "B2",
  },
  {
    id: "b2-tech-4",
    sentence: "This framework standardizes our approach to state management",
    tags: ["Technology", "Frontend"],
    level: "B2",
  },
  {
    id: "b2-tech-5",
    sentence: "Please document the edge cases for the new authentication flow",
    tags: ["Technology", "Documentation"],
    level: "B2",
  },
  {
    id: "b2-tech-6",
    sentence:
      "We should implement rate limiting to protect the database from abuse",
    tags: ["Technology", "Security"],
    level: "B2",
  },
  {
    id: "c1-tech-1",
    sentence:
      "The monolithic codebase is systematically being decoupled into microservices",
    tags: ["Technology", "Architecture"],
    level: "C1",
  },
  {
    id: "c1-tech-2",
    sentence:
      "Mitigating memory leaks in this component requires a deep understanding of closures",
    tags: ["Technology", "Performance"],
    level: "C1",
  },
  {
    id: "c1-tech-3",
    sentence:
      "Had we provisioned enough instances the outage might have been averted",
    tags: ["Technology", "Infrastructure", "Reflection"],
    level: "C1",
  },
  {
    id: "c1-tech-4",
    sentence:
      "It is paramount that we enforce strict type checking across all repositories",
    tags: ["Technology", "Standards"],
    level: "C1",
  },
  {
    id: "c1-tech-5",
    sentence:
      "Leveraging asynchronous iteration drastically improved the data ingestion pipeline",
    tags: ["Technology", "Optimization"],
    level: "C1",
  },
  {
    id: "c1-tech-6",
    sentence:
      "The underlying vulnerability stems from an insecure deserialization flaw",
    tags: ["Technology", "Security"],
    level: "C1",
  },
  {
    id: "c1-tech-7",
    sentence:
      "Scaling horizontally allows us to handle traffic bursts without performance degradation",
    tags: ["Technology", "Infrastructure"],
    level: "C1",
  },
  {
    id: "c1-tech-8",
    sentence:
      "This paradigm shift largely obsoletes our legacy deployment workflows",
    tags: ["Technology", "Strategy"],
    level: "C1",
  },
  {
    id: "b2-startup-1",
    sentence:
      "We are currently seeking seed funding to accelerate our product roadmap",
    tags: ["Business", "Startup"],
    level: "B2",
  },
  {
    id: "b2-startup-2",
    sentence:
      "Finding an early product market fit is our absolute priority right now",
    tags: ["Business", "Startup", "Strategy"],
    level: "B2",
  },
  {
    id: "c1-startup-1",
    sentence:
      "Pivoting the business model at this stage entails considerable structural risk",
    tags: ["Business", "Startup", "Risk"],
    level: "C1",
  },
  {
    id: "c1-startup-2",
    sentence:
      "The venture capitalists were skeptical of our aggressive customer acquisition cost projections",
    tags: ["Business", "Finance", "Startup"],
    level: "C1",
  },
  {
    id: "c1-startup-3",
    sentence:
      "Bootstrapping constrained our resources but ultimately fostered greater operational discipline",
    tags: ["Business", "Startup", "Reflection"],
    level: "C1",
  },
  {
  id: "a1-daily-3",
  sentence: "I brush my teeth before breakfast",
  tags: ["Daily Life", "Routine"],
  level: "A1",
},
{
  id: "a1-daily-4",
  sentence: "We watch cartoons on Saturday morning",
  tags: ["Daily Life", "Family"],
  level: "A1",
},
{
  id: "a1-work-1",
  sentence: "My father works in a small office",
  tags: ["Work", "Family"],
  level: "A1",
},
{
  id: "a1-shopping-1",
  sentence: "I need milk bread and apples from the store",
  tags: ["Shopping", "Daily Life"],
  level: "A1",
},
{
  id: "a1-health-1",
  sentence: "She drinks a lot of water after running",
  tags: ["Health", "Daily Life"],
  level: "A1",
},
{
  id: "a1-family-1",
  sentence: "Our grandparents visit us every summer",
  tags: ["Family", "Daily Life"],
  level: "A1",
},
{
  id: "a2-work-3",
  sentence: "I usually reply to emails before lunch",
  tags: ["Work", "Communication"],
  level: "A2",
},
{
  id: "a2-work-4",
  sentence: "We share weekly updates with the manager",
  tags: ["Work", "Meetings"],
  level: "A2",
},
{
  id: "a2-study-2",
  sentence: "I wrote the new grammar rules in my notebook",
  tags: ["Study", "Writing"],
  level: "A2",
},
{
  id: "a2-travel-4",
  sentence: "Please keep your passport in a safe place",
  tags: ["Travel", "Safety"],
  level: "A2",
},
{
  id: "a2-health-2",
  sentence: "The pharmacist explained how often to take the tablets",
  tags: ["Health", "Communication"],
  level: "A2",
},
{
  id: "a2-finance-1",
  sentence: "I am saving money for a new laptop",
  tags: ["Finance", "Daily Life"],
  level: "A2",
},
{
  id: "b1-meetings-1",
  sentence: "Could we move the meeting to a quieter room",
  tags: ["Work", "Meetings"],
  level: "B1",
},
{
  id: "b1-meetings-2",
  sentence: "I need a few minutes to summarize the main risks",
  tags: ["Work", "Presentations"],
  level: "B1",
},
{
  id: "b1-problem-1",
  sentence: "The app keeps freezing whenever I upload a file",
  tags: ["Technology", "Problem Solving"],
  level: "B1",
},
{
  id: "b1-learning-1",
  sentence: "Watching tutorials has improved my listening skills",
  tags: ["Study", "Reflection"],
  level: "B1",
},
{
  id: "b1-planning-1",
  sentence: "We should define the scope before estimating the effort",
  tags: ["Planning", "Work"],
  level: "B1",
},
{
  id: "b1-customer-1",
  sentence: "The client asked for a simpler explanation of the dashboard",
  tags: ["Work", "Communication"],
  level: "B1",
},
{
  id: "b2-strategy-1",
  sentence: "Our proposal balances short term wins with long term sustainability",
  tags: ["Strategy", "Business"],
  level: "B2",
},
{
  id: "b2-strategy-2",
  sentence: "The workshop helped us align the roadmap with customer feedback",
  tags: ["Strategy", "Planning"],
  level: "B2",
},
{
  id: "b2-analysis-1",
  sentence: "These metrics reveal a steady decline in activation after signup",
  tags: ["Analysis", "Data"],
  level: "B2",
},
{
  id: "b2-negotiation-1",
  sentence: "They accepted the contract once we clarified the service levels",
  tags: ["Business", "Negotiation"],
  level: "B2",
},
{
  id: "b2-leadership-1",
  sentence: "She handled the conflict calmly and kept the team focused",
  tags: ["Leadership", "Work"],
  level: "B2",
},
{
  id: "b2-quality-1",
  sentence: "We documented the regression so future releases remain predictable",
  tags: ["Quality", "Technology"],
  level: "B2",
},
{
  id: "c1-risk-1",
  sentence: "Unless we diversify suppliers the operation remains dangerously exposed",
  tags: ["Risk", "Operations"],
  level: "C1",
},
{
  id: "c1-governance-1",
  sentence: "The committee insisted that every exception be formally documented",
  tags: ["Governance", "Compliance"],
  level: "C1",
},
{
  id: "c1-research-1",
  sentence: "The findings were compelling albeit limited by a narrow sample size",
  tags: ["Research", "Analysis"],
  level: "C1",
},
{
  id: "c1-stakeholders-1",
  sentence: "Reconciling conflicting stakeholder expectations required careful sequencing",
  tags: ["Stakeholders", "Strategy"],
  level: "C1",
},
{
  id: "c1-ethics-1",
  sentence: "We cannot justify collecting sensitive data without explicit consent",
  tags: ["Ethics", "Policy"],
  level: "C1",
},
{
  id: "c1-change-1",
  sentence: "The reorganization succeeded because managers communicated the rationale transparently",
  tags: ["Change Management", "Leadership"],
  level: "C1",
},
];
