import {
  buildRoadmapModelIndex,
  parseRoadmapDefinition,
  type RoadmapDefinition,
} from "@/lib/roadmapModel";

export const defaultRoadmapDefinition: RoadmapDefinition =
  parseRoadmapDefinition({
    schemaVersion: 1,
    generatedAt: "2026-03-07T00:00:00.000Z",
    title: "SkillPal Focus Roadmap",
    modules: [
      {
        id: "module_english_interview",
        title: "English Interview Path",
        description:
          "Build structured answers, tighter grammar and better follow-up fluency for interviews.",
        routeObjective: "english_interview",
        estimatedMinutes: 150,
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
          {
            id: "unit_english_behavioral",
            title: "Behavioral Stories",
            description:
              "Convert raw experience into sharper STAR-style stories and calmer follow-up pivots.",
            routeObjective: "english_interview",
            prerequisiteUnitIds: ["unit_english_followup"],
            lessons: [
              {
                id: "lesson_english_story_builder",
                title: "Story Builder",
                description:
                  "Shape interview stories so the setup, action and result stay easy to follow.",
                routeObjective: "english_interview",
                prerequisiteLessonIds: ["lesson_english_followup"],
                completionRule: {
                  type: "score_target",
                  target: 78,
                },
                nodes: [
                  {
                    id: "node_story_frame_builder",
                    title: "Story frame builder",
                    description:
                      "Build a behavioral answer with clear context, action and measurable outcome.",
                    kind: "practice",
                    routeObjective: "english_interview",
                    skill: "english",
                    difficulty: "core",
                    gameId: "speed_builder",
                    path: "/speed-builder",
                    estimatedMinutes: 9,
                    tags: ["interview", "reflection", "leadership"],
                    contentFilters: {
                      routeObjective: "english_interview",
                      difficulty: "core",
                      tags: ["interview", "reflection"],
                    },
                  },
                  {
                    id: "node_story_error_cleanup",
                    title: "Story error cleanup",
                    description:
                      "Remove tense slips and agreement mistakes that make story answers sound weaker.",
                    kind: "review",
                    routeObjective: "english_interview",
                    skill: "english",
                    difficulty: "core",
                    gameId: "error_hunter",
                    path: "/error-hunter",
                    estimatedMinutes: 9,
                    tags: ["work", "communication", "leadership"],
                    contentFilters: {
                      routeObjective: "english_interview",
                      difficulty: "core",
                      tags: ["work", "communication"],
                    },
                  },
                ],
              },
              {
                id: "lesson_english_story_adaptation",
                title: "Story Adaptation",
                description:
                  "Rephrase and transform the same story for leadership, conflict and ownership questions.",
                routeObjective: "english_interview",
                prerequisiteLessonIds: ["lesson_english_story_builder"],
                completionRule: {
                  type: "score_target",
                  target: 80,
                },
                nodes: [
                  {
                    id: "node_story_rephrase_variants",
                    title: "Story rephrase variants",
                    description:
                      "Retell the same experience with different emphasis depending on the interviewer angle.",
                    kind: "practice",
                    routeObjective: "english_interview",
                    skill: "english",
                    difficulty: "stretch",
                    gameId: "paraphrase_duel",
                    path: "/paraphrase-duel",
                    estimatedMinutes: 10,
                    tags: ["leadership", "strategy", "work"],
                    contentFilters: {
                      routeObjective: "english_interview",
                      difficulty: "stretch",
                      tags: ["leadership", "strategy"],
                    },
                  },
                  {
                    id: "node_story_followup_transform",
                    title: "Story follow-up transform",
                    description:
                      "Transform a prepared story quickly when the interviewer changes focus or adds constraints.",
                    kind: "assessment",
                    routeObjective: "english_interview",
                    skill: "english",
                    difficulty: "stretch",
                    gameId: "sentence_transformer",
                    path: "/sentence-transformer",
                    estimatedMinutes: 11,
                    tags: ["business", "strategy", "meetings"],
                    contentFilters: {
                      routeObjective: "english_interview",
                      difficulty: "stretch",
                      tags: ["business", "strategy"],
                    },
                  },
                ],
              },
            ],
          },
          {
            id: "unit_english_panel",
            title: "Panel Pressure",
            description:
              "Adapt the same core story for sharper panel questions, objections and executive follow-ups.",
            routeObjective: "english_interview",
            prerequisiteUnitIds: ["unit_english_behavioral"],
            lessons: [
              {
                id: "lesson_english_panel_alignment",
                title: "Panel Alignment",
                description:
                  "Keep your answer coherent when the conversation shifts toward meetings, trade-offs and business impact.",
                routeObjective: "english_interview",
                prerequisiteLessonIds: ["lesson_english_story_adaptation"],
                completionRule: {
                  type: "score_target",
                  target: 82,
                },
                nodes: [
                  {
                    id: "node_panel_meeting_builder",
                    title: "Panel meeting builder",
                    description:
                      "Build compact answers that sound credible in meeting-heavy and business-facing interview scenarios.",
                    kind: "practice",
                    routeObjective: "english_interview",
                    skill: "english",
                    difficulty: "stretch",
                    gameId: "speed_builder",
                    path: "/speed-builder",
                    estimatedMinutes: 9,
                    tags: ["meetings", "business", "strategy"],
                    contentFilters: {
                      routeObjective: "english_interview",
                      difficulty: "stretch",
                      tags: ["meetings", "business"],
                    },
                  },
                  {
                    id: "node_panel_precision_cleanup",
                    title: "Panel precision cleanup",
                    description:
                      "Clean up the grammar slips that show up when you explain trade-offs under pressure.",
                    kind: "review",
                    routeObjective: "english_interview",
                    skill: "english",
                    difficulty: "stretch",
                    gameId: "error_hunter",
                    path: "/error-hunter",
                    estimatedMinutes: 9,
                    tags: ["work", "meetings", "strategy"],
                    contentFilters: {
                      routeObjective: "english_interview",
                      difficulty: "stretch",
                      tags: ["work", "meetings"],
                    },
                  },
                ],
              },
              {
                id: "lesson_english_panel_pressure",
                title: "Panel Pressure",
                description:
                  "Reframe the same answer for strategy, leadership and analysis angles without losing control.",
                routeObjective: "english_interview",
                prerequisiteLessonIds: ["lesson_english_panel_alignment"],
                completionRule: {
                  type: "score_target",
                  target: 84,
                },
                nodes: [
                  {
                    id: "node_panel_rephrase_tradeoffs",
                    title: "Panel rephrase trade-offs",
                    description:
                      "Rephrase the same answer so it sounds stronger for strategy, business and analysis prompts.",
                    kind: "practice",
                    routeObjective: "english_interview",
                    skill: "english",
                    difficulty: "expert",
                    gameId: "paraphrase_duel",
                    path: "/paraphrase-duel",
                    estimatedMinutes: 10,
                    tags: ["business", "strategy", "analysis"],
                    contentFilters: {
                      routeObjective: "english_interview",
                      difficulty: "expert",
                      tags: ["business", "strategy"],
                    },
                  },
                  {
                    id: "node_panel_constraint_transform",
                    title: "Panel constraint transform",
                    description:
                      "Transform a polished answer quickly when the panel adds tighter constraints or a leadership angle.",
                    kind: "boss",
                    routeObjective: "english_interview",
                    skill: "english",
                    difficulty: "expert",
                    gameId: "sentence_transformer",
                    path: "/sentence-transformer",
                    estimatedMinutes: 11,
                    tags: ["leadership", "analysis", "business"],
                    contentFilters: {
                      routeObjective: "english_interview",
                      difficulty: "expert",
                      tags: ["business", "analysis"],
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
        estimatedMinutes: 150,
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
          {
            id: "unit_math_rotation",
            title: "Topic Rotation",
            description:
              "Switch across algebra, geometry and calculus without losing pace or recognition speed.",
            routeObjective: "math_speed",
            prerequisiteUnitIds: ["unit_math_timed"],
            lessons: [
              {
                id: "lesson_math_topic_switch",
                title: "Topic Switch",
                description:
                  "Alternate between algebra and geometry prompts while keeping the right pattern in working memory.",
                routeObjective: "math_speed",
                prerequisiteLessonIds: ["lesson_math_timed"],
                completionRule: {
                  type: "score_target",
                  target: 78,
                },
                nodes: [
                  {
                    id: "node_algebra_pattern_dash",
                    title: "Algebra pattern dash",
                    description:
                      "Recognize algebraic patterns quickly enough to answer before overthinking.",
                    kind: "practice",
                    routeObjective: "math_speed",
                    skill: "math",
                    difficulty: "core",
                    gameId: "math_game",
                    path: "/calculus?tab=game",
                    estimatedMinutes: 10,
                    tags: ["math", "algebra", "patterns"],
                    contentFilters: {
                      routeObjective: "math_speed",
                      difficulty: "core",
                      tags: ["algebra"],
                    },
                  },
                  {
                    id: "node_geometry_visual_check",
                    title: "Geometry visual check",
                    description:
                      "Move through geometry formulas and shape properties without pausing the streak.",
                    kind: "review",
                    routeObjective: "math_speed",
                    skill: "math",
                    difficulty: "stretch",
                    gameId: "math_game",
                    path: "/calculus?tab=game",
                    estimatedMinutes: 10,
                    tags: ["math", "geometry", "visual"],
                    contentFilters: {
                      routeObjective: "math_speed",
                      difficulty: "stretch",
                      tags: ["geometry"],
                    },
                  },
                ],
              },
              {
                id: "lesson_math_rotation_finish",
                title: "Rotation Finish",
                description:
                  "Close the route by mixing calculus and cross-topic retrieval under tighter constraints.",
                routeObjective: "math_speed",
                prerequisiteLessonIds: ["lesson_math_topic_switch"],
                completionRule: {
                  type: "score_target",
                  target: 82,
                },
                nodes: [
                  {
                    id: "node_calculus_symbol_burst",
                    title: "Calculus symbol burst",
                    description:
                      "Read symbolic expressions faster and connect them to the right operation on sight.",
                    kind: "practice",
                    routeObjective: "math_speed",
                    skill: "math",
                    difficulty: "stretch",
                    gameId: "math_game",
                    path: "/calculus?tab=game",
                    estimatedMinutes: 11,
                    tags: ["math", "calculus", "symbols"],
                    contentFilters: {
                      routeObjective: "math_speed",
                      difficulty: "stretch",
                      tags: ["calculus"],
                    },
                  },
                  {
                    id: "node_mixed_topic_marathon",
                    title: "Mixed topic marathon",
                    description:
                      "Finish with a high-variance round that forces quick topic recognition and answer selection.",
                    kind: "boss",
                    routeObjective: "math_speed",
                    skill: "math",
                    difficulty: "expert",
                    gameId: "math_game",
                    path: "/calculus?tab=game",
                    estimatedMinutes: 12,
                    tags: ["math", "calculus", "mixed"],
                    contentFilters: {
                      routeObjective: "math_speed",
                      difficulty: "expert",
                      tags: ["calculus"],
                    },
                  },
                ],
              },
            ],
          },
          {
            id: "unit_math_endurance",
            title: "Exam Endurance",
            description:
              "Push past topic recognition into longer streaks where pace, pattern recall and switching all matter.",
            routeObjective: "math_speed",
            prerequisiteUnitIds: ["unit_math_rotation"],
            lessons: [
              {
                id: "lesson_math_pattern_endurance",
                title: "Pattern Endurance",
                description:
                  "Stay fast across repeated algebra and geometry prompts without letting recognition slip.",
                routeObjective: "math_speed",
                prerequisiteLessonIds: ["lesson_math_rotation_finish"],
                completionRule: {
                  type: "score_target",
                  target: 84,
                },
                nodes: [
                  {
                    id: "node_algebra_recall_chain",
                    title: "Algebra recall chain",
                    description:
                      "Chain algebra recognition rounds together without pausing to recompute every pattern from scratch.",
                    kind: "practice",
                    routeObjective: "math_speed",
                    skill: "math",
                    difficulty: "stretch",
                    gameId: "math_game",
                    path: "/calculus?tab=game",
                    estimatedMinutes: 10,
                    tags: ["math", "algebra", "math_speed"],
                    contentFilters: {
                      routeObjective: "math_speed",
                      difficulty: "stretch",
                      tags: ["algebra"],
                    },
                  },
                  {
                    id: "node_geometry_rule_pressure",
                    title: "Geometry rule pressure",
                    description:
                      "Hold the right geometry rule in working memory while the streak speed keeps climbing.",
                    kind: "review",
                    routeObjective: "math_speed",
                    skill: "math",
                    difficulty: "stretch",
                    gameId: "math_game",
                    path: "/calculus?tab=game",
                    estimatedMinutes: 10,
                    tags: ["math", "geometry", "math_speed"],
                    contentFilters: {
                      routeObjective: "math_speed",
                      difficulty: "stretch",
                      tags: ["geometry"],
                    },
                  },
                ],
              },
              {
                id: "lesson_math_cross_topic_pressure",
                title: "Cross-topic Pressure",
                description:
                  "Finish with harder calculus retrieval and a broad round that punishes hesitation.",
                routeObjective: "math_speed",
                prerequisiteLessonIds: ["lesson_math_pattern_endurance"],
                completionRule: {
                  type: "score_target",
                  target: 86,
                },
                nodes: [
                  {
                    id: "node_calculus_conversion_scan",
                    title: "Calculus conversion scan",
                    description:
                      "Translate symbolic calculus prompts into the right operation quickly enough to preserve the run.",
                    kind: "practice",
                    routeObjective: "math_speed",
                    skill: "math",
                    difficulty: "expert",
                    gameId: "math_game",
                    path: "/calculus?tab=game",
                    estimatedMinutes: 11,
                    tags: ["math", "calculus", "math_speed"],
                    contentFilters: {
                      routeObjective: "math_speed",
                      difficulty: "expert",
                      tags: ["calculus"],
                    },
                  },
                  {
                    id: "node_exam_pace_gauntlet",
                    title: "Exam pace gauntlet",
                    description:
                      "Close with a mixed hard round where the main skill is recognizing the topic instantly and committing.",
                    kind: "boss",
                    routeObjective: "math_speed",
                    skill: "math",
                    difficulty: "expert",
                    gameId: "math_game",
                    path: "/calculus?tab=game",
                    estimatedMinutes: 12,
                    tags: ["math", "mixed", "math_speed"],
                    contentFilters: {
                      routeObjective: "math_speed",
                      difficulty: "expert",
                      tags: ["math_speed"],
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
        estimatedMinutes: 154,
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
          {
            id: "unit_dev_systems",
            title: "Systems Decision Loop",
            description:
              "Mix syntax, debugging and documentation into architecture-aware technical decisions.",
            routeObjective: "dev_reasoning",
            prerequisiteUnitIds: ["unit_dev_retrieval"],
            lessons: [
              {
                id: "lesson_dev_architecture",
                title: "Architecture Scan",
                description:
                  "Read implementation snippets and detect the design signal they are pointing to.",
                routeObjective: "dev_reasoning",
                prerequisiteLessonIds: ["lesson_dev_retrieval"],
                completionRule: {
                  type: "score_target",
                  target: 78,
                },
                nodes: [
                  {
                    id: "node_architecture_snippet_builder",
                    title: "Architecture snippet builder",
                    description:
                      "Reconstruct short patterns that appear constantly in production code and interviews.",
                    kind: "practice",
                    routeObjective: "dev_reasoning",
                    skill: "dev",
                    difficulty: "core",
                    gameId: "code_syntax_builder",
                    path: "/syntax-builder",
                    estimatedMinutes: 9,
                    tags: ["typescript", "react", "syntax"],
                    contentFilters: {
                      routeObjective: "dev_reasoning",
                      difficulty: "core",
                      tags: ["typescript", "syntax"],
                    },
                  },
                  {
                    id: "node_architecture_bug_reasoning",
                    title: "Architecture bug reasoning",
                    description:
                      "Explain why a defect appears and what broader engineering trade-off it exposes.",
                    kind: "review",
                    routeObjective: "dev_reasoning",
                    skill: "dev",
                    difficulty: "stretch",
                    gameId: "code_bug_hunter",
                    path: "/bug-hunter",
                    estimatedMinutes: 11,
                    tags: ["typescript", "react", "debugging"],
                    contentFilters: {
                      routeObjective: "dev_reasoning",
                      difficulty: "stretch",
                      tags: ["react", "debugging"],
                    },
                  },
                ],
              },
              {
                id: "lesson_dev_docs_decisions",
                title: "Docs Decisions",
                description:
                  "Use platform and architecture documentation to justify a technical choice under time pressure.",
                routeObjective: "dev_reasoning",
                prerequisiteLessonIds: ["lesson_dev_architecture"],
                completionRule: {
                  type: "score_target",
                  target: 82,
                },
                nodes: [
                  {
                    id: "node_docs_platform_quiz",
                    title: "Docs platform quiz",
                    description:
                      "Pull the right concept from cloud and platform docs before the distractors take over.",
                    kind: "assessment",
                    routeObjective: "dev_reasoning",
                    skill: "dev",
                    difficulty: "stretch",
                    gameId: "study_docs_quiz",
                    path: "/docs?mode=quiz",
                    estimatedMinutes: 10,
                    tags: ["cloud-native & devops", "kubernetes", "aws"],
                    contentFilters: {
                      routeObjective: "dev_reasoning",
                      difficulty: "stretch",
                      tags: ["cloud-native & devops", "kubernetes", "aws"],
                    },
                  },
                  {
                    id: "node_docs_design_pressure",
                    title: "Docs design pressure",
                    description:
                      "Close with a docs round that forces fast trade-off reading across design, Java and algorithms topics.",
                    kind: "boss",
                    routeObjective: "dev_reasoning",
                    skill: "dev",
                    difficulty: "expert",
                    gameId: "study_docs_game",
                    path: "/docs?mode=game",
                    estimatedMinutes: 12,
                    tags: [
                      "patrones de diseño",
                      "java 17",
                      "algoritmos y estructuras de datos",
                    ],
                    contentFilters: {
                      routeObjective: "dev_reasoning",
                      difficulty: "expert",
                      tags: [
                        "patrones de diseño",
                        "java 17",
                        "algoritmos y estructuras de datos",
                      ],
                    },
                  },
                ],
              },
            ],
          },
          {
            id: "unit_dev_delivery",
            title: "Delivery Pressure",
            description:
              "Finish by combining runtime signals, platform docs and implementation trade-offs into faster delivery decisions.",
            routeObjective: "dev_reasoning",
            prerequisiteUnitIds: ["unit_dev_systems"],
            lessons: [
              {
                id: "lesson_dev_runtime_signals",
                title: "Runtime Signals",
                description:
                  "Interpret syntax and bug patterns that usually show up only once a codebase is under real pressure.",
                routeObjective: "dev_reasoning",
                prerequisiteLessonIds: ["lesson_dev_docs_decisions"],
                completionRule: {
                  type: "score_target",
                  target: 84,
                },
                nodes: [
                  {
                    id: "node_runtime_syntax_patterns",
                    title: "Runtime syntax patterns",
                    description:
                      "Recover higher-pressure TypeScript and async syntax fast enough to keep execution flow in your head.",
                    kind: "practice",
                    routeObjective: "dev_reasoning",
                    skill: "dev",
                    difficulty: "stretch",
                    gameId: "code_syntax_builder",
                    path: "/syntax-builder",
                    estimatedMinutes: 9,
                    tags: ["typescript", "async", "tooling"],
                    contentFilters: {
                      routeObjective: "dev_reasoning",
                      difficulty: "stretch",
                      tags: ["typescript", "async"],
                    },
                  },
                  {
                    id: "node_runtime_bug_pressure",
                    title: "Runtime bug pressure",
                    description:
                      "Explain production-facing failures where security, performance or stale state create the real bug.",
                    kind: "review",
                    routeObjective: "dev_reasoning",
                    skill: "dev",
                    difficulty: "expert",
                    gameId: "code_bug_hunter",
                    path: "/bug-hunter",
                    estimatedMinutes: 11,
                    tags: ["security", "performance", "debugging"],
                    contentFilters: {
                      routeObjective: "dev_reasoning",
                      difficulty: "expert",
                      tags: ["security", "performance"],
                    },
                  },
                ],
              },
              {
                id: "lesson_dev_platform_tradeoffs",
                title: "Platform Trade-offs",
                description:
                  "Justify the final call with platform knowledge instead of relying on pattern recall alone.",
                routeObjective: "dev_reasoning",
                prerequisiteLessonIds: ["lesson_dev_runtime_signals"],
                completionRule: {
                  type: "score_target",
                  target: 86,
                },
                nodes: [
                  {
                    id: "node_platform_docs_quiz",
                    title: "Platform docs quiz",
                    description:
                      "Retrieve enough detail from platform ecosystems to separate a good option from a merely familiar one.",
                    kind: "assessment",
                    routeObjective: "dev_reasoning",
                    skill: "dev",
                    difficulty: "expert",
                    gameId: "study_docs_quiz",
                    path: "/docs?mode=quiz",
                    estimatedMinutes: 10,
                    tags: ["gcp", "apache kafka", "spring boot"],
                    contentFilters: {
                      routeObjective: "dev_reasoning",
                      difficulty: "expert",
                      tags: ["gcp", "apache kafka", "spring boot"],
                    },
                  },
                  {
                    id: "node_platform_docs_hunt",
                    title: "Platform docs hunt",
                    description:
                      "Close the route with a docs hunt that forces fast pattern recognition across distributed systems topics.",
                    kind: "boss",
                    routeObjective: "dev_reasoning",
                    skill: "dev",
                    difficulty: "expert",
                    gameId: "study_docs_game",
                    path: "/docs?mode=game",
                    estimatedMinutes: 12,
                    tags: ["microservices", "architecture", "gcp"],
                    contentFilters: {
                      routeObjective: "dev_reasoning",
                      difficulty: "expert",
                      tags: ["microservices", "architecture", "gcp"],
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });

export const defaultRoadmapIndex = buildRoadmapModelIndex(
  defaultRoadmapDefinition,
);
