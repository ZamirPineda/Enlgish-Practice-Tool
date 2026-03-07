import { z } from "zod";
import {
  contentInventoryDifficultySchema,
  contentInventoryFormatSchema,
  contentInventorySkillSchema,
} from "@/lib/contentInventory";
import type { PracticeRouteObjective } from "@/lib/practiceContent";

export const ROADMAP_SCHEMA_VERSION = 1;

export const roadmapRouteObjectiveSchema = z.enum([
  "english_interview",
  "math_speed",
  "dev_reasoning",
]);

export type RoadmapRouteObjective = z.infer<typeof roadmapRouteObjectiveSchema>;

export const roadmapNodeKindSchema = z.enum([
  "practice",
  "review",
  "assessment",
  "boss",
]);

export type RoadmapNodeKind = z.infer<typeof roadmapNodeKindSchema>;

const roadmapNodeSkillSchema = z.enum(["english", "math", "dev"]);

export const roadmapCompletionRuleSchema = z.union([
  z.object({
    type: z.literal("all_nodes"),
  }),
  z.object({
    type: z.literal("score_target"),
    target: z.number().int().min(1).max(100),
  }),
]);

export type RoadmapCompletionRule = z.infer<typeof roadmapCompletionRuleSchema>;

export const roadmapNodeSchema = z
  .object({
    id: z.string().min(3),
    title: z.string().min(1),
    description: z.string().min(1),
    kind: roadmapNodeKindSchema,
    routeObjective: roadmapRouteObjectiveSchema,
    skill: roadmapNodeSkillSchema,
    difficulty: contentInventoryDifficultySchema,
    gameId: z.string().min(1),
    path: z.string().regex(/^\/.+/, "Roadmap node path must start with /"),
    estimatedMinutes: z.number().int().min(3).max(30),
    tags: z.array(z.string().min(1)).default([]),
    contentFilters: z
      .object({
        routeObjective: roadmapRouteObjectiveSchema.optional(),
        difficulty: contentInventoryDifficultySchema.optional(),
        format: contentInventoryFormatSchema.optional(),
        tags: z.array(z.string().min(1)).default([]),
      })
      .default({ tags: [] }),
  })
  .superRefine((node, context) => {
    if (
      node.contentFilters.routeObjective &&
      node.contentFilters.routeObjective !== node.routeObjective
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["contentFilters", "routeObjective"],
        message:
          "Node content filter routeObjective must match the node routeObjective",
      });
    }
  });

export type RoadmapNode = z.infer<typeof roadmapNodeSchema>;

export const roadmapLessonSchema = z.object({
  id: z.string().min(3),
  title: z.string().min(1),
  description: z.string().min(1),
  routeObjective: roadmapRouteObjectiveSchema,
  prerequisiteLessonIds: z.array(z.string().min(3)).default([]),
  completionRule: roadmapCompletionRuleSchema.default({
    type: "all_nodes",
  }),
  nodes: z.array(roadmapNodeSchema).min(1),
});

export type RoadmapLesson = z.infer<typeof roadmapLessonSchema>;

export const roadmapUnitSchema = z.object({
  id: z.string().min(3),
  title: z.string().min(1),
  description: z.string().min(1),
  routeObjective: roadmapRouteObjectiveSchema,
  prerequisiteUnitIds: z.array(z.string().min(3)).default([]),
  lessons: z.array(roadmapLessonSchema).min(1),
});

export type RoadmapUnit = z.infer<typeof roadmapUnitSchema>;

export const roadmapModuleSchema = z.object({
  id: z.string().min(3),
  title: z.string().min(1),
  description: z.string().min(1),
  routeObjective: roadmapRouteObjectiveSchema,
  estimatedMinutes: z.number().int().min(10).max(240),
  units: z.array(roadmapUnitSchema).min(1),
});

export type RoadmapModule = z.infer<typeof roadmapModuleSchema>;

export const roadmapDefinitionSchema = z
  .object({
    schemaVersion: z.literal(ROADMAP_SCHEMA_VERSION),
    generatedAt: z.string(),
    title: z.string().min(1),
    modules: z.array(roadmapModuleSchema),
  })
  .superRefine((definition, context) => {
    const moduleIds = new Set<string>();
    const unitIds = new Set<string>();
    const lessonIds = new Set<string>();
    const nodeIds = new Set<string>();

    definition.modules.forEach((module, moduleIndex) => {
      if (moduleIds.has(module.id)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["modules", moduleIndex, "id"],
          message: `Duplicate module id ${module.id}`,
        });
      }
      moduleIds.add(module.id);

      module.units.forEach((unit, unitIndex) => {
        if (unit.routeObjective !== module.routeObjective) {
          context.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["modules", moduleIndex, "units", unitIndex, "routeObjective"],
            message: "Unit routeObjective must match parent module routeObjective",
          });
        }

        if (unitIds.has(unit.id)) {
          context.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["modules", moduleIndex, "units", unitIndex, "id"],
            message: `Duplicate unit id ${unit.id}`,
          });
        }
        unitIds.add(unit.id);

        unit.lessons.forEach((lesson, lessonIndex) => {
          if (lesson.routeObjective !== unit.routeObjective) {
            context.addIssue({
              code: z.ZodIssueCode.custom,
              path: [
                "modules",
                moduleIndex,
                "units",
                unitIndex,
                "lessons",
                lessonIndex,
                "routeObjective",
              ],
              message:
                "Lesson routeObjective must match parent unit routeObjective",
            });
          }

          if (lessonIds.has(lesson.id)) {
            context.addIssue({
              code: z.ZodIssueCode.custom,
              path: [
                "modules",
                moduleIndex,
                "units",
                unitIndex,
                "lessons",
                lessonIndex,
                "id",
              ],
              message: `Duplicate lesson id ${lesson.id}`,
            });
          }
          lessonIds.add(lesson.id);

          lesson.nodes.forEach((node, nodeIndex) => {
            if (node.routeObjective !== lesson.routeObjective) {
              context.addIssue({
                code: z.ZodIssueCode.custom,
                path: [
                  "modules",
                  moduleIndex,
                  "units",
                  unitIndex,
                  "lessons",
                  lessonIndex,
                  "nodes",
                  nodeIndex,
                  "routeObjective",
                ],
                message:
                  "Node routeObjective must match parent lesson routeObjective",
              });
            }

            if (nodeIds.has(node.id)) {
              context.addIssue({
                code: z.ZodIssueCode.custom,
                path: [
                  "modules",
                  moduleIndex,
                  "units",
                  unitIndex,
                  "lessons",
                  lessonIndex,
                  "nodes",
                  nodeIndex,
                  "id",
                ],
                message: `Duplicate node id ${node.id}`,
              });
            }
            nodeIds.add(node.id);
          });
        });
      });
    });

    definition.modules.forEach((module, moduleIndex) => {
      module.units.forEach((unit, unitIndex) => {
        unit.prerequisiteUnitIds.forEach((prerequisiteUnitId, prerequisiteIndex) => {
          if (!unitIds.has(prerequisiteUnitId)) {
            context.addIssue({
              code: z.ZodIssueCode.custom,
              path: [
                "modules",
                moduleIndex,
                "units",
                unitIndex,
                "prerequisiteUnitIds",
                prerequisiteIndex,
              ],
              message: `Unknown prerequisite unit id ${prerequisiteUnitId}`,
            });
          }
        });

        unit.lessons.forEach((lesson, lessonIndex) => {
          lesson.prerequisiteLessonIds.forEach(
            (prerequisiteLessonId, prerequisiteIndex) => {
              if (!lessonIds.has(prerequisiteLessonId)) {
                context.addIssue({
                  code: z.ZodIssueCode.custom,
                  path: [
                    "modules",
                    moduleIndex,
                    "units",
                    unitIndex,
                    "lessons",
                    lessonIndex,
                    "prerequisiteLessonIds",
                    prerequisiteIndex,
                  ],
                  message: `Unknown prerequisite lesson id ${prerequisiteLessonId}`,
                });
              }
            },
          );
        });
      });
    });
  });

export type RoadmapDefinition = z.infer<typeof roadmapDefinitionSchema>;

export interface IndexedRoadmapUnit extends RoadmapUnit {
  moduleId: string;
  moduleIndex: number;
  unitIndex: number;
}

export interface IndexedRoadmapLesson extends RoadmapLesson {
  moduleId: string;
  unitId: string;
  moduleIndex: number;
  unitIndex: number;
  lessonIndex: number;
}

export interface IndexedRoadmapNode extends RoadmapNode {
  moduleId: string;
  unitId: string;
  lessonId: string;
  moduleIndex: number;
  unitIndex: number;
  lessonIndex: number;
  nodeIndex: number;
  previousNodeId: string | null;
  nextNodeId: string | null;
}

export interface RoadmapModelIndex {
  modulesInOrder: RoadmapModule[];
  unitsInOrder: IndexedRoadmapUnit[];
  lessonsInOrder: IndexedRoadmapLesson[];
  nodesInOrder: IndexedRoadmapNode[];
  modulesById: Record<string, RoadmapModule>;
  unitsById: Record<string, IndexedRoadmapUnit>;
  lessonsById: Record<string, IndexedRoadmapLesson>;
  nodesById: Record<string, IndexedRoadmapNode>;
  moduleIdsByRoute: Record<RoadmapRouteObjective, string[]>;
  nodeIdsByRoute: Record<RoadmapRouteObjective, string[]>;
}

export const createEmptyRoadmapDefinition = (
  title = "SkillPal Roadmap",
): RoadmapDefinition => ({
  schemaVersion: ROADMAP_SCHEMA_VERSION,
  generatedAt: new Date().toISOString(),
  title,
  modules: [],
});

export const parseRoadmapDefinition = (input: unknown): RoadmapDefinition =>
  roadmapDefinitionSchema.parse(input);

export const buildRoadmapModelIndex = (
  definition: RoadmapDefinition,
): RoadmapModelIndex => {
  const modulesById: Record<string, RoadmapModule> = {};
  const unitsById: Record<string, IndexedRoadmapUnit> = {};
  const lessonsById: Record<string, IndexedRoadmapLesson> = {};
  const nodesById: Record<string, IndexedRoadmapNode> = {};
  const unitsInOrder: IndexedRoadmapUnit[] = [];
  const lessonsInOrder: IndexedRoadmapLesson[] = [];
  const nodesInOrder: IndexedRoadmapNode[] = [];
  const moduleIdsByRoute: Record<RoadmapRouteObjective, string[]> = {
    english_interview: [],
    math_speed: [],
    dev_reasoning: [],
  };
  const nodeIdsByRoute: Record<RoadmapRouteObjective, string[]> = {
    english_interview: [],
    math_speed: [],
    dev_reasoning: [],
  };

  definition.modules.forEach((module, moduleIndex) => {
    modulesById[module.id] = module;
    moduleIdsByRoute[module.routeObjective].push(module.id);

    module.units.forEach((unit, unitIndex) => {
      const indexedUnit: IndexedRoadmapUnit = {
        ...unit,
        moduleId: module.id,
        moduleIndex,
        unitIndex,
      };

      unitsById[unit.id] = indexedUnit;
      unitsInOrder.push(indexedUnit);

      unit.lessons.forEach((lesson, lessonIndex) => {
        const indexedLesson: IndexedRoadmapLesson = {
          ...lesson,
          moduleId: module.id,
          unitId: unit.id,
          moduleIndex,
          unitIndex,
          lessonIndex,
        };

        lessonsById[lesson.id] = indexedLesson;
        lessonsInOrder.push(indexedLesson);

        lesson.nodes.forEach((node, nodeIndex) => {
          const previousNode =
            nodeIndex > 0 ? lesson.nodes[nodeIndex - 1].id : null;
          const nextNode =
            nodeIndex < lesson.nodes.length - 1
              ? lesson.nodes[nodeIndex + 1].id
              : null;
          const indexedNode: IndexedRoadmapNode = {
            ...node,
            moduleId: module.id,
            unitId: unit.id,
            lessonId: lesson.id,
            moduleIndex,
            unitIndex,
            lessonIndex,
            nodeIndex,
            previousNodeId: previousNode,
            nextNodeId: nextNode,
          };

          nodesById[node.id] = indexedNode;
          nodesInOrder.push(indexedNode);
          nodeIdsByRoute[node.routeObjective].push(node.id);
        });
      });
    });
  });

  return {
    modulesInOrder: definition.modules,
    unitsInOrder,
    lessonsInOrder,
    nodesInOrder,
    modulesById,
    unitsById,
    lessonsById,
    nodesById,
    moduleIdsByRoute,
    nodeIdsByRoute,
  };
};

export const getRoadmapRouteObjectives = (
  definition: RoadmapDefinition,
): PracticeRouteObjective[] =>
  Array.from(
    new Set(definition.modules.map((module) => module.routeObjective)),
  ) as PracticeRouteObjective[];
