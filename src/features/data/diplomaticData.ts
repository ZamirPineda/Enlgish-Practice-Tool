export interface DiplomaticRound {
  id: string;
  toxicFeedback: string;
  context: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  level: "B2" | "C1";
}

export const diplomaticRounds: DiplomaticRound[] = [
  {
    id: "dr-1",
    toxicFeedback:
      "This code is absolute trash, it will break the prod database.",
    context: "Reviewing a pull request with inefficient database queries.",
    level: "C1",
    options: [
      {
        text: "I have some concerns about the database performance here. Could we review the query logic?",
        isCorrect: true,
        explanation:
          "This is polite, focuses on the code ('database performance') rather than attacking the developer, and opens a dialogue ('Could we review').",
      },
      {
        text: "You clearly don't know how to write SQL. Please fix this.",
        isCorrect: false,
        explanation:
          "A personal attack ('You clearly don't know') is unprofessional.",
      },
      {
        text: "Please delete this code, it's dangerous for production.",
        isCorrect: false,
        explanation:
          "Too direct and commanding without explaining the specific technical concern.",
      },
    ],
  },
  {
    id: "dr-2",
    toxicFeedback:
      "Why did you build it this way? The architecture makes no sense.",
    context: "Commenting on a proposed system architecture design.",
    level: "C1",
    options: [
      {
        text: "Could you walk me through the reasoning behind this architectural choice?",
        isCorrect: true,
        explanation:
          "Seeking to understand the author's thought process is constructive and non-confrontational.",
      },
      {
        text: "I demand you change this architecture immediately.",
        isCorrect: false,
        explanation:
          "Aggressive and authoritarian ('I demand') shuts down collaboration.",
      },
      {
        text: "This architecture is very confusing and wrong.",
        isCorrect: false,
        explanation:
          "Labeling work as 'wrong' without offering alternatives is unhelpful.",
      },
    ],
  },
  {
    id: "dr-3",
    toxicFeedback: "You are always missing deadlines, do it faster.",
    context: "Following up on a delayed task during a stand-up meeting.",
    level: "B2",
    options: [
      {
        text: "I noticed the timeline has slipped slightly. Is there any blocker I can help you with?",
        isCorrect: true,
        explanation:
          "Addresses the delay neutrally ('timeline has slipped') and offers support ('blocker I can help with').",
      },
      {
        text: "Try to work faster so we don't miss the deadline again.",
        isCorrect: false,
        explanation:
          "Patronizing and focuses solely on speed rather than addressing root causes.",
      },
      {
        text: "You need to stop being slow and finish this now.",
        isCorrect: false,
        explanation: "Insulting ('stop being slow') and highly unprofessional.",
      },
    ],
  },
  {
    id: "dr-4",
    toxicFeedback: "This feature is completely useless for our users.",
    context:
      "Giving feedback on a new product feature during a planning session.",
    level: "B2",
    options: [
      {
        text: "I'm not entirely sure this aligns with our current user personas. Let's look at the data.",
        isCorrect: true,
        explanation:
          "Challenges the idea objectively based on alignment and data, rather than calling it 'useless'.",
      },
      {
        text: "Nobody will ever use this feature.",
        isCorrect: false,
        explanation:
          "An absolute statement ('Nobody will ever') that lacks constructive feedback.",
      },
      {
        text: "Why did we even waste time building this?",
        isCorrect: false,
        explanation: "Dismissive of the effort put in by the team.",
      },
    ],
  },
  {
    id: "dr-5",
    toxicFeedback: "Your presentation was boring and too long.",
    context: "Providing feedback after a colleague's technical presentation.",
    level: "B2",
    options: [
      {
        text: "I think the presentation had great content, but it might be more impactful if we condense the timeline.",
        isCorrect: true,
        explanation:
          "Uses the 'sandwich' approach (positive first) and suggests a constructive improvement ('condense timeline').",
      },
      {
        text: "You should talk less next time.",
        isCorrect: false,
        explanation: "Too blunt and negative without actionable advice.",
      },
      {
        text: "I fell asleep midway through your slides.",
        isCorrect: false,
        explanation: "Highly disrespectful and mocking.",
      },
    ],
  },
  {
    id: "dr-6",
    toxicFeedback: "I hate the new UI design, it looks like a child made it.",
    context: "Reviewing a new interface mockup from the design team.",
    level: "C1",
    options: [
      {
        text: "I feel the new UI might benefit from a more mature, refined visual hierarchy.",
        isCorrect: true,
        explanation:
          "Focuses on specific design principles ('visual hierarchy') rather than subjective insults.",
      },
      {
        text: "This design is terrible and needs to be completely redone.",
        isCorrect: false,
        explanation:
          "Overly destructive feedback without pointing out specific flaws.",
      },
      {
        text: "Make it look professional, not like a toy.",
        isCorrect: false,
        explanation: "Condescending and vague.",
      },
    ],
  },
  {
    id: "dr-7",
    toxicFeedback: "You broke the build again. Be more careful.",
    context:
      "Addressing a colleague whose commit broke the continuous integration pipeline.",
    level: "B2",
    options: [
      {
        text: "It looks like the recent commit caused a build failure. Could we investigate together?",
        isCorrect: true,
        explanation:
          "States the fact objectively ('recent commit caused a failure') and promotes teamwork.",
      },
      {
        text: "Stop breaking the build, test your code before pushing.",
        isCorrect: false,
        explanation: "Accusatory and commanding.",
      },
      {
        text: "You are responsible for fixing the pipeline right now.",
        isCorrect: false,
        explanation: "Too aggressive, lacking any collaborative spirit.",
      },
    ],
  },
  {
    id: "dr-8",
    toxicFeedback: "Your idea for the marketing campaign is stupid.",
    context: "Discussing strategy in a cross-functional team meeting.",
    level: "C1",
    options: [
      {
        text: "I foresee some challenges with that approach. Have we considered alternative strategies?",
        isCorrect: true,
        explanation:
          "Expresses disagreement respectfully ('I foresee some challenges') and invites alternative discussion.",
      },
      {
        text: "That idea will never work in a million years.",
        isCorrect: false,
        explanation: "Dismissive and exaggerates the negative aspect.",
      },
      {
        text: "I strongly oppose this foolish suggestion.",
        isCorrect: false,
        explanation: "Uses inflammatory language ('foolish').",
      },
    ],
  },
  {
    id: "dr-9",
    toxicFeedback: "This API documentation is impossible to read.",
    context: "Reviewing documentation written by another developer.",
    level: "B2",
    options: [
      {
        text: "To improve clarity, perhaps we could add more code examples to the API documentation?",
        isCorrect: true,
        explanation:
          "Focuses on the solution ('add more code examples') rather than simply stating it's 'impossible to read'.",
      },
      {
        text: "Rewrite this documentation, it makes no sense.",
        isCorrect: false,
        explanation: "Demanding and unhelpful.",
      },
      {
        text: "Nobody can understand what you wrote here.",
        isCorrect: false,
        explanation: "Hostile and generalizes the problem unfairly.",
      },
    ],
  },
  {
    id: "dr-10",
    toxicFeedback: "You are ignoring my emails. Reply immediately.",
    context: "Following up on an email that hasn't received a response.",
    level: "B2",
    options: [
      {
        text: "I wanted to gently bump this email to the top of your inbox. Let me know when you have a moment to discuss.",
        isCorrect: true,
        explanation:
          "Polite follow-up ('gently bump') that respects the other person's time.",
      },
      {
        text: "Why aren't you replying to me?",
        isCorrect: false,
        explanation: "Accusatory tone that creates defensive responses.",
      },
      {
        text: "I need an answer right now, stop ignoring me.",
        isCorrect: false,
        explanation: "Demanding and assumes negative intent.",
      },
    ],
  },
  {
    id: "dr-11",
    toxicFeedback: "We are wasting time in this meeting. Let's leave.",
    context: "During a meeting that has strayed off-topic.",
    level: "C1",
    options: [
      {
        text: "To ensure we respect everyone's time, perhaps we could take this specific discussion offline?",
        isCorrect: true,
        explanation:
          "Reframes 'wasting time' as 'respecting time' and uses corporate terminology ('take this offline').",
      },
      {
        text: "This meeting is useless, I'm out.",
        isCorrect: false,
        explanation: "Rude and abrupt.",
      },
      {
        text: "Can we stop talking about irrelevant things?",
        isCorrect: false,
        explanation: "Points fingers and creates a hostile environment.",
      },
    ],
  },
  {
    id: "dr-12",
    toxicFeedback: "The backend team is always blocking our frontend work.",
    context: "Explaining a delay during a project retrospective.",
    level: "C1",
    options: [
      {
        text: "We are currently experiencing a dependency bottleneck regarding the backend APIs.",
        isCorrect: true,
        explanation:
          "Uses professional terminology ('dependency bottleneck') without blaming a specific team directly.",
      },
      {
        text: "The backend developers are too slow.",
        isCorrect: false,
        explanation: "A direct insult to colleagues.",
      },
      {
        text: "It's the backend team's fault we are delayed.",
        isCorrect: false,
        explanation: "Finger-pointing destroys cross-team collaboration.",
      },
    ],
  },
  {
    id: "dr-13",
    toxicFeedback: "Your code is completely unreadable with no comments.",
    context: "Leaving a review on a complex Pull Request.",
    level: "B2",
    options: [
      {
        text: "Could we add some inline documentation here to clarify the complex logic?",
        isCorrect: true,
        explanation:
          "Requests a specific, positive action ('add inline documentation') instead of just criticizing.",
      },
      {
        text: "Write better comments, I can't read this.",
        isCorrect: false,
        explanation: "Abrasive and condescending.",
      },
      {
        text: "This PR is rejected until you learn to comment your code.",
        isCorrect: false,
        explanation: "Punitive rather than constructive.",
      },
    ],
  },
  {
    id: "dr-14",
    toxicFeedback: "I refuse to use this terrible library.",
    context: "Discussing technology stack choices for a new project.",
    level: "C1",
    options: [
      {
        text: "I have reservations about adopting this library due to its maintenance history.",
        isCorrect: true,
        explanation:
          "Expresses hesitation professionally ('have reservations') and provides a logical reason.",
      },
      {
        text: "That library is garbage.",
        isCorrect: false,
        explanation: "Unprofessional language for a technical evaluation.",
      },
      {
        text: "If we use this library, I quit the project.",
        isCorrect: false,
        explanation: "Giving ultimatums is toxic behavior.",
      },
    ],
  },
  {
    id: "dr-15",
    toxicFeedback: "You clearly didn't test this before handing it over.",
    context: "Finding a bug in a feature just delivered by QA or another dev.",
    level: "C1",
    options: [
      {
        text: "I ran into an unexpected edge case during my initial review. Should we pair on this?",
        isCorrect: true,
        explanation:
          "Assumes good intent (an 'edge case' was missed) and offers collaborative help.",
      },
      {
        text: "Why did you submit this full of bugs?",
        isCorrect: false,
        explanation: "Accusatory and assumes incompetence or laziness.",
      },
      {
        text: "Test your own work next time.",
        isCorrect: false,
        explanation: "Passive-aggressive and hostile.",
      },
    ],
  },
  {
    id: "dr-16",
    toxicFeedback: "The client’s new request is totally unreasonable.",
    context: "Reacting to scope creep from an external client.",
    level: "C1",
    options: [
      {
        text: "This new request falls outside our current scope. Perhaps we should draft a change request?",
        isCorrect: true,
        explanation:
          "Maintains professionalism by referencing 'scope' and proposing a standard business process ('change request').",
      },
      {
        text: "Tell the client we won't do it.",
        isCorrect: false,
        explanation: "Damages client relations by being too blunt.",
      },
      {
        text: "The client has no idea what they are asking for.",
        isCorrect: false,
        explanation:
          "Insulting the client, even internally, builds a bad culture.",
      },
    ],
  },
  {
    id: "dr-17",
    toxicFeedback:
      "This legacy code is a nightmare and we need to rewrite it all.",
    context: "Suggesting a major code refactor to management.",
    level: "C1",
    options: [
      {
        text: "The current technical debt is impacting velocity. I propose a phased refactoring strategy.",
        isCorrect: true,
        explanation:
          "Translates developer frustration into business terms ('velocity') and proposes a solution ('phased strategy').",
      },
      {
        text: "The code is rotting, we have to start from scratch.",
        isCorrect: false,
        explanation: "Overly dramatic and usually rejected due to risk.",
      },
      {
        text: "Whoever wrote this legacy codebase should be fired.",
        isCorrect: false,
        explanation: "Highly unprofessional and toxic.",
      },
    ],
  },
  {
    id: "dr-18",
    toxicFeedback: "You are micromanaging me and I hate it.",
    context:
      "Giving upward feedback to a manager about their leadership style.",
    level: "C1",
    options: [
      {
        text: "I work best when I have a bit more autonomy. Could we align on high-level goals instead?",
        isCorrect: true,
        explanation:
          "Focuses on personal working style ('I work best') and proposes a constructive compromise ('align on high-level goals').",
      },
      {
        text: "Stop breathing down my neck.",
        isCorrect: false,
        explanation:
          "Aggressive colloquialism inappropriate for upward feedback.",
      },
      {
        text: "You are a terrible manager.",
        isCorrect: false,
        explanation: "A direct personal insult.",
      },
    ],
  },
  {
    id: "dr-19",
    toxicFeedback: "I'm not doing this task, it's beneath my skill level.",
    context:
      "Refusing to do routine maintenance work assigned during a sprint.",
    level: "C1",
    options: [
      {
        text: "I feel my skills might be better utilized on the core architecture tasks, could we reassign this?",
        isCorrect: true,
        explanation:
          "Frames the pushback around resource optimization ('better utilized') rather than ego.",
      },
      {
        text: "Give this trivial work to a junior developer.",
        isCorrect: false,
        explanation: "Arrogant and condescending to junior staff.",
      },
      {
        text: "I am a senior engineer, I shouldn't be fixing typos.",
        isCorrect: false,
        explanation: "Displays poor teamwork and entitlement.",
      },
    ],
  },
  {
    id: "dr-20",
    toxicFeedback: "That meeting could have been an email, what a waste.",
    context: "Complaining openly immediately after a long sync call.",
    level: "B2",
    options: [
      {
        text: "To streamline our communication, perhaps we could handle future status updates asynchronously?",
        isCorrect: true,
        explanation:
          "Uses positive, constructive phrasing ('streamline', 'asynchronously') to suggest a change.",
      },
      {
        text: "Next time just email me instead of wasting my time.",
        isCorrect: false,
        explanation: "Dismissive of the organizer's effort.",
      },
      {
        text: "I'm never attending that meeting again.",
        isCorrect: false,
        explanation: "Immature and rebellious.",
      },
    ],
  },
];
