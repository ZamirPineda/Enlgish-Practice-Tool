import { describe, expect, test } from "vitest";
import {
  ROADMAP_SCHEMA_VERSION,
  buildRoadmapModelIndex,
  createEmptyRoadmapDefinition,
  getRoadmapRouteObjectives,
  parseRoadmapDefinition,
  roadmapDefinitionSchema,
} from "@/lib/roadmapModel";

const buildValidRoadmapFixture = () => ({
  schemaVersion: ROADMAP_SCHEMA_VERSION,
  generatedAt: "2026-03-07T00:00:00.000Z",
  title: "Google Prep Path",
  modules: [
    {
      id: "module-english-1",
      title: "English Foundations",
      description: "Interview speaking essentials.",
      routeObjective: "english_interview" as const,
      estimatedMinutes: 45,
      units: [
        {
          id: "unit-english-1",
          title: "Ownership Stories",
          description: "Build concise interview answers.",
          routeObjective: "english_interview" as const,
          prerequisiteUnitIds: [],
          lessons: [
            {
              id: "lesson-english-1",
              title: "Fluency Sprint",
              description: "Practice fast sentence building.",
              routeObjective: "english_interview" as const,
              prerequisiteLessonIds: [],
              completionRule: { type: "all_nodes" as const },
              nodes: [
                {
                  id: "node-english-1",
                  title: "Speed Builder Warmup",
                  description: "Build fluent interview phrases quickly.",
                  kind: "practice" as const,
                  routeObjective: "english_interview" as const,
                  skill: "english" as const,
                  difficulty: "foundation" as const,
                  gameId: "speed_builder",
                  path: "/speed-builder",
                  estimatedMinutes: 8,
                  tags: ["fluency", "ownership"],
                  contentFilters: {
                    routeObjective: "english_interview" as const,
                    difficulty: "foundation" as const,
                    format: "sentence_transform" as const,
                    tags: ["ownership"],
                  },
                },
                {
                  id: "node-english-2",
                  title: "Paraphrase Drill",
                  description: "Say the same idea with stronger structures.",
                  kind: "review" as const,
                  routeObjective: "english_interview" as const,
                  skill: "english" as const,
                  difficulty: "core" as const,
                  gameId: "paraphrase_duel",
                  path: "/paraphrase-duel",
                  estimatedMinutes: 9,
                  tags: ["paraphrase"],
                  contentFilters: {
                    routeObjective: "english_interview" as const,
                    difficulty: "core" as const,
                    format: "sentence_transform" as const,
                    tags: ["interview"],
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "module-math-1",
      title: "Math Speed Core",
      description: "Quick arithmetic and formula recall.",
      routeObjective: "math_speed" as const,
      estimatedMinutes: 35,
      units: [
        {
          id: "unit-math-1",
          title: "Mental Math",
          description: "Speed up arithmetic retrieval.",
          routeObjective: "math_speed" as const,
          prerequisiteUnitIds: [],
          lessons: [
            {
              id: "lesson-math-1",
              title: "Fast Drill",
              description: "Short math speed sessions.",
              routeObjective: "math_speed" as const,
              prerequisiteLessonIds: [],
              completionRule: { type: "score_target" as const, target: 80 },
              nodes: [
                {
                  id: "node-math-1",
                  title: "Math Speed Duel",
                  description: "Solve calculations under time pressure.",
                  kind: "assessment" as const,
                  routeObjective: "math_speed" as const,
                  skill: "math" as const,
                  difficulty: "core" as const,
                  gameId: "math_game",
                  path: "/calculus?tab=game",
                  estimatedMinutes: 10,
                  tags: ["arithmetic"],
                  contentFilters: {
                    routeObjective: "math_speed" as const,
                    difficulty: "core" as const,
                    format: "formula_drill" as const,
                    tags: ["calculus"],
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "module-dev-1",
      title: "Dev Reasoning Core",
      description: "Reason about code and architecture choices.",
      routeObjective: "dev_reasoning" as const,
      estimatedMinutes: 40,
      units: [
        {
          id: "unit-dev-1",
          title: "Backend Decisions",
          description: "Practice debugging and code review judgment.",
          routeObjective: "dev_reasoning" as const,
          prerequisiteUnitIds: [],
          lessons: [
            {
              id: "lesson-dev-1",
              title: "Code Review Sprint",
              description: "Move from syntax to debugging.",
              routeObjective: "dev_reasoning" as const,
              prerequisiteLessonIds: [],
              completionRule: { type: "all_nodes" as const },
              nodes: [
                {
                  id: "node-dev-1",
                  title: "Syntax Builder",
                  description: "Reconstruct code snippets quickly.",
                  kind: "practice" as const,
                  routeObjective: "dev_reasoning" as const,
                  skill: "dev" as const,
                  difficulty: "foundation" as const,
                  gameId: "code_syntax_builder",
                  path: "/syntax-builder",
                  estimatedMinutes: 8,
                  tags: ["syntax"],
                  contentFilters: {
                    routeObjective: "dev_reasoning" as const,
                    difficulty: "foundation" as const,
                    format: "code_snippet" as const,
                    tags: ["commands"],
                  },
                },
                {
                  id: "node-dev-2",
                  title: "Bug Hunter",
                  description: "Find the defect before the timer ends.",
                  kind: "boss" as const,
                  routeObjective: "dev_reasoning" as const,
                  skill: "dev" as const,
                  difficulty: "core" as const,
                  gameId: "code_bug_hunter",
                  path: "/bug-hunter",
                  estimatedMinutes: 9,
                  tags: ["debugging"],
                  contentFilters: {
                    routeObjective: "dev_reasoning" as const,
                    difficulty: "core" as const,
                    format: "code_snippet" as const,
                    tags: ["bugs"],
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

describe("roadmapModel", () => {
  test("parses a versioned roadmap definition and builds an index for modules, lessons and nodes", () => {
    const roadmap = parseRoadmapDefinition(buildValidRoadmapFixture());
    const index = buildRoadmapModelIndex(roadmap);

    expect(roadmap.schemaVersion).toBe(1);
    expect(roadmap.modules).toHaveLength(3);
    expect(index.unitsInOrder).toHaveLength(3);
    expect(index.lessonsInOrder).toHaveLength(3);
    expect(index.nodesInOrder).toHaveLength(5);
    expect(index.moduleIdsByRoute.english_interview).toEqual([
      "module-english-1",
    ]);
    expect(index.nodeIdsByRoute.dev_reasoning).toEqual([
      "node-dev-1",
      "node-dev-2",
    ]);
    expect(index.nodesById["node-dev-1"].nextNodeId).toBe("node-dev-2");
    expect(index.nodesById["node-dev-2"].previousNodeId).toBe("node-dev-1");
  });

  test("exposes the active route objectives and creates empty versioned definitions", () => {
    const empty = createEmptyRoadmapDefinition("Empty Path");
    const roadmap = parseRoadmapDefinition(buildValidRoadmapFixture());

    expect(empty).toMatchObject({
      schemaVersion: ROADMAP_SCHEMA_VERSION,
      title: "Empty Path",
      modules: [],
    });
    expect(getRoadmapRouteObjectives(roadmap)).toEqual([
      "english_interview",
      "math_speed",
      "dev_reasoning",
    ]);
  });

  test("rejects duplicate ids and route mismatches across module, unit, lesson and node levels", () => {
    const invalid = buildValidRoadmapFixture();
    invalid.modules[0].units[0].routeObjective = "math_speed";
    invalid.modules[1].units[0].lessons[0].nodes[0].id = "node-dev-1";
    invalid.modules[1].units[0].prerequisiteUnitIds = ["unit-missing-1"];
    invalid.modules[2].units[0].lessons[0].nodes[0].contentFilters.routeObjective =
      "english_interview";

    const parsed = roadmapDefinitionSchema.safeParse(invalid);

    expect(parsed.success).toBe(false);
    expect(parsed.error.issues.map((issue) => issue.message)).toEqual(
      expect.arrayContaining([
        "Unit routeObjective must match parent module routeObjective",
        "Lesson routeObjective must match parent unit routeObjective",
        "Node content filter routeObjective must match the node routeObjective",
        "Duplicate node id node-dev-1",
        "Unknown prerequisite unit id unit-missing-1",
      ]),
    );
  });
});
