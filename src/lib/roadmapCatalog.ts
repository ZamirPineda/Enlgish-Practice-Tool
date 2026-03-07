import {
  buildRoadmapModelIndex,
  parseRoadmapDefinition,
  type RoadmapDefinition,
} from "@/lib/roadmapModel";

export const defaultRoadmapDefinition: RoadmapDefinition = parseRoadmapDefinition(
  {
    schemaVersion: 1,
    generatedAt: "2026-03-06T00:00:00.000Z",
    title: "SkillPal Focus Roadmap",
    modules: [
      {
        id: "module_english_interview",
        title: "English Interview Path",
        description:
          "Build structured answers, tighter grammar and better follow-up fluency for interviews.",
        routeObjective: "english_interview",
        estimatedMinutes: 72,
        units: [
          {
            id: "unit_english_foundation",
            title: "Foundation Answers",
            description:
              "Start with short answers that sound structured and grammatically safe.",
            routeObjective: "english_interview",
            lessons: [
              {
                id: "lesson_english_opening",
                title: "Opening Round",
                description:
                  "Practice the first 30 seconds of a confident interview answer.",
                routeObjective: "english_interview",
                completionRule: {
                  type: "score_target",
                  target: 70,
                },
                nodes: [
                  {
                    id: "node_interview_opener",
                    title: "Interview opener",
                    description:
                      "Assemble a clear opener with role, context and ownership.",
                    kind: "practice",
                    routeObjective: "english_interview",
                    skill: "english",
                    difficulty: "foundation",
                    gameId: "speed_builder",
                    path: "/speed-builder",
                    estimatedMinutes: 8,
                    tags: ["interview", "fluency", "structure"],
                    contentFilters: {
                      routeObjective: "english_interview",
                      difficulty: "foundation",
                      tags: ["interview"],
                    },
                  },
                  {
                    id: "node_fix_grammar_slips",
                    title: "Fix grammar slips",
                    description:
                      "Catch the common errors that weaken short interview answers.",
                    kind: "review",
                    routeObjective: "english_interview",
                    skill: "english",
                    difficulty: "foundation",
                    gameId: "error_hunter",
                    path: "/error-hunter",
                    estimatedMinutes: 9,
                    tags: ["interview", "grammar", "accuracy"],
                    contentFilters: {
                      routeObjective: "english_interview",
                      difficulty: "foundation",
                      tags: ["grammar", "interview"],
                    },
                  },
                ],
              },
            ],
          },
          {
            id: "unit_english_followup",
            title: "Follow-up Control",
            description:
              "Increase flexibility when the interviewer pushes for clarification.",
            routeObjective: "english_interview",
            prerequisiteUnitIds: ["unit_english_foundation"],
            lessons: [
              {
                id: "lesson_english_followup",
                title: "Follow-up Round",
                description:
                  "Keep answers concise while adapting tone and structure.",
                routeObjective: "english_interview",
                prerequisiteLessonIds: ["lesson_english_opening"],
                completionRule: {
                  type: "score_target",
                  target: 75,
                },
                nodes: [
                  {
                    id: "node_rephrase_answers",
                    title: "Rephrase concise answers",
                    description:
                      "Retell the same idea with cleaner wording and tighter focus.",
                    kind: "practice",
                    routeObjective: "english_interview",
                    skill: "english",
                    difficulty: "core",
                    gameId: "paraphrase_duel",
                    path: "/paraphrase-duel",
                    estimatedMinutes: 10,
                    tags: ["interview", "paraphrase", "concise"],
                    contentFilters: {
                      routeObjective: "english_interview",
                      difficulty: "core",
                      tags: ["interview", "paraphrase"],
                    },
                  },
                  {
                    id: "node_transform_followups",
                    title: "Transform follow-up answers",
                    description:
                      "Handle reformulations without losing accuracy or confidence.",
                    kind: "assessment",
                    routeObjective: "english_interview",
                    skill: "english",
                    difficulty: "core",
                    gameId: "sentence_transformer",
                    path: "/sentence-transformer",
                    estimatedMinutes: 11,
                    tags: ["interview", "transformations", "followup"],
                    contentFilters: {
                      routeObjective: "english_interview",
                      difficulty: "core",
                      tags: ["interview", "followup"],
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "module_math_speed",
        title: "Math Speed Path",
        description:
          "Move from clean arithmetic recall into timed mixed-speed math rounds.",
        routeObjective: "math_speed",
        estimatedMinutes: 64,
        units: [
          {
            id: "unit_math_warmup",
            title: "Warmup Drills",
            description:
              "Stabilize response time before moving into mixed prompts.",
            routeObjective: "math_speed",
            lessons: [
              {
                id: "lesson_math_core",
                title: "Core Speed",
                description:
                  "Short bursts to lock in correct answers under light pressure.",
                routeObjective: "math_speed",
                completionRule: {
                  type: "score_target",
                  target: 70,
                },
                nodes: [
                  {
                    id: "node_arithmetic_burst",
                    title: "Core arithmetic burst",
                    description:
                      "Solve quick arithmetic prompts with a stable pace.",
                    kind: "practice",
                    routeObjective: "math_speed",
                    skill: "math",
                    difficulty: "foundation",
                    gameId: "math_game",
                    path: "/calculus?tab=game",
                    estimatedMinutes: 8,
                    tags: ["math", "speed", "arithmetic"],
                    contentFilters: {
                      routeObjective: "math_speed",
                      difficulty: "foundation",
                      tags: ["arithmetic"],
                    },
                  },
                  {
                    id: "node_equation_speed_check",
                    title: "Equation speed check",
                    description:
                      "Keep accuracy while working through slightly longer equations.",
                    kind: "review",
                    routeObjective: "math_speed",
                    skill: "math",
                    difficulty: "core",
                    gameId: "math_game",
                    path: "/calculus?tab=game",
                    estimatedMinutes: 9,
                    tags: ["math", "equations", "speed"],
                    contentFilters: {
                      routeObjective: "math_speed",
                      difficulty: "core",
                      tags: ["equations"],
                    },
                  },
                ],
              },
            ],
          },
          {
            id: "unit_math_timed",
            title: "Timed Consistency",
            description:
              "Carry speed into mixed prompts without dropping precision.",
            routeObjective: "math_speed",
            prerequisiteUnitIds: ["unit_math_warmup"],
            lessons: [
              {
                id: "lesson_math_timed",
                title: "Mixed Timers",
                description:
                  "Alternate between familiar and mixed prompts under time pressure.",
                routeObjective: "math_speed",
                prerequisiteLessonIds: ["lesson_math_core"],
                completionRule: {
                  type: "score_target",
                  target: 75,
                },
                nodes: [
                  {
                    id: "node_fraction_timing_drill",
                    title: "Fraction timing drill",
                    description:
                      "Handle fractions and comparisons fast enough for streak play.",
                    kind: "practice",
                    routeObjective: "math_speed",
                    skill: "math",
                    difficulty: "core",
                    gameId: "math_game",
                    path: "/calculus?tab=game",
                    estimatedMinutes: 10,
                    tags: ["math", "fractions", "timed"],
                    contentFilters: {
                      routeObjective: "math_speed",
                      difficulty: "core",
                      tags: ["fractions"],
                    },
                  },
                  {
                    id: "node_mixed_sprint_checkpoint",
                    title: "Mixed sprint checkpoint",
                    description:
                      "Finish the route with a mixed sprint that tests endurance and consistency.",
                    kind: "boss",
                    routeObjective: "math_speed",
                    skill: "math",
                    difficulty: "stretch",
                    gameId: "math_game",
                    path: "/calculus?tab=game",
                    estimatedMinutes: 12,
                    tags: ["math", "mixed", "sprint"],
                    contentFilters: {
                      routeObjective: "math_speed",
                      difficulty: "stretch",
                      tags: ["mixed"],
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "module_dev_reasoning",
        title: "Dev Reasoning Path",
        description:
          "Sharpen debugging, syntax recall and doc-based retrieval under pressure.",
        routeObjective: "dev_reasoning",
        estimatedMinutes: 70,
        units: [
          {
            id: "unit_dev_fundamentals",
            title: "Read and Repair",
            description:
              "Start with direct syntax and bug recognition to stabilize signal detection.",
            routeObjective: "dev_reasoning",
            lessons: [
              {
                id: "lesson_dev_repair",
                title: "Repair Loop",
                description:
                  "Read code fast enough to catch obvious defects before deeper reasoning.",
                routeObjective: "dev_reasoning",
                completionRule: {
                  type: "score_target",
                  target: 70,
                },
                nodes: [
                  {
                    id: "node_syntax_warmup",
                    title: "Syntax warmup",
                    description:
                      "Rebuild short code patterns until syntax recall is automatic.",
                    kind: "practice",
                    routeObjective: "dev_reasoning",
                    skill: "dev",
                    difficulty: "foundation",
                    gameId: "code_syntax_builder",
                    path: "/syntax-builder",
                    estimatedMinutes: 8,
                    tags: ["dev", "syntax", "warmup"],
                    contentFilters: {
                      routeObjective: "dev_reasoning",
                      difficulty: "foundation",
                      tags: ["syntax"],
                    },
                  },
                  {
                    id: "node_bug_scan",
                    title: "Bug scan",
                    description:
                      "Spot likely bugs and explain the failure mode quickly.",
                    kind: "review",
                    routeObjective: "dev_reasoning",
                    skill: "dev",
                    difficulty: "core",
                    gameId: "code_bug_hunter",
                    path: "/bug-hunter",
                    estimatedMinutes: 10,
                    tags: ["dev", "debugging", "analysis"],
                    contentFilters: {
                      routeObjective: "dev_reasoning",
                      difficulty: "core",
                      tags: ["bug"],
                    },
                  },
                ],
              },
            ],
          },
          {
            id: "unit_dev_retrieval",
            title: "Retrieval Under Pressure",
            description:
              "Combine docs retrieval and decision-making in timed practice.",
            routeObjective: "dev_reasoning",
            prerequisiteUnitIds: ["unit_dev_fundamentals"],
            lessons: [
              {
                id: "lesson_dev_retrieval",
                title: "Docs Loop",
                description:
                  "Retrieve the right detail fast enough to justify a technical decision.",
                routeObjective: "dev_reasoning",
                prerequisiteLessonIds: ["lesson_dev_repair"],
                completionRule: {
                  type: "score_target",
                  target: 75,
                },
                nodes: [
                  {
                    id: "node_docs_recall",
                    title: "Docs recall",
                    description:
                      "Answer targeted questions from documentation without drifting off-topic.",
                    kind: "assessment",
                    routeObjective: "dev_reasoning",
                    skill: "dev",
                    difficulty: "core",
                    gameId: "study_docs_quiz",
                    path: "/docs?mode=quiz",
                    estimatedMinutes: 9,
                    tags: ["dev", "docs", "quiz"],
                    contentFilters: {
                      routeObjective: "dev_reasoning",
                      difficulty: "core",
                      tags: ["docs"],
                    },
                  },
                  {
                    id: "node_lookup_under_pressure",
                    title: "Lookup under pressure",
                    description:
                      "Finish with a timed retrieval round that simulates pressure from real debugging.",
                    kind: "boss",
                    routeObjective: "dev_reasoning",
                    skill: "dev",
                    difficulty: "stretch",
                    gameId: "study_docs_game",
                    path: "/docs?mode=game",
                    estimatedMinutes: 11,
                    tags: ["dev", "docs", "retrieval"],
                    contentFilters: {
                      routeObjective: "dev_reasoning",
                      difficulty: "stretch",
                      tags: ["retrieval"],
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
);

export const defaultRoadmapIndex = buildRoadmapModelIndex(
  defaultRoadmapDefinition,
);
