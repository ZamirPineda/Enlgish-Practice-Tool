import {
  buildRoadmapModelIndex,
  type IndexedRoadmapLesson,
  type IndexedRoadmapUnit,
  type RoadmapCompletionRule,
  type RoadmapDefinition,
  type RoadmapRouteObjective,
} from "@/lib/roadmapModel";

export const ROADMAP_PROGRESS_STORAGE_KEY = "skillpal-roadmap-progress";
export const ROADMAP_PROGRESS_SCHEMA_VERSION = 2;

export type RoadmapNodeProgressStatus = "locked" | "in_progress" | "completed";

export interface RoadmapProgressState {
  schemaVersion: typeof ROADMAP_PROGRESS_SCHEMA_VERSION;
  updatedAt: string;
  completedNodeIds: string[];
  masteryByNodeId: Record<string, number>;
}

export interface RoadmapRouteProgressSummary {
  routeObjective: RoadmapRouteObjective;
  totalNodes: number;
  completedNodes: number;
  currentNodeId: string | null;
}

export interface RoadmapLessonProgressSummary {
  status: RoadmapNodeProgressStatus;
  isUnlocked: boolean;
  isCompleted: boolean;
  masteryTarget: number | null;
  masteryAverage: number | null;
  blockingReason: string | null;
}

export interface RoadmapUnitProgressSummary {
  status: RoadmapNodeProgressStatus;
  isUnlocked: boolean;
  isCompleted: boolean;
  blockingReason: string | null;
}

export interface RoadmapProgressSnapshot {
  completedNodeIds: string[];
  masteryByNodeId: Record<string, number>;
  statusByNodeId: Record<string, RoadmapNodeProgressStatus>;
  statusByLessonId: Record<string, RoadmapNodeProgressStatus>;
  statusByUnitId: Record<string, RoadmapNodeProgressStatus>;
  statusByModuleId: Record<string, RoadmapNodeProgressStatus>;
  lessonProgressById: Record<string, RoadmapLessonProgressSummary>;
  unitProgressById: Record<string, RoadmapUnitProgressSummary>;
  routeSummaries: Record<RoadmapRouteObjective, RoadmapRouteProgressSummary>;
}

const DEFAULT_ROUTE_SUMMARIES: Record<
  RoadmapRouteObjective,
  RoadmapRouteProgressSummary
> = {
  english_interview: {
    routeObjective: "english_interview",
    totalNodes: 0,
    completedNodes: 0,
    currentNodeId: null,
  },
  math_speed: {
    routeObjective: "math_speed",
    totalNodes: 0,
    completedNodes: 0,
    currentNodeId: null,
  },
  dev_reasoning: {
    routeObjective: "dev_reasoning",
    totalNodes: 0,
    completedNodes: 0,
    currentNodeId: null,
  },
};

type LegacyRoadmapProgressState = Partial<
  Omit<RoadmapProgressState, "masteryByNodeId">
> & {
  masteryByNodeId?: unknown;
};

const isRoadmapProgressState = (
  value: unknown,
): value is LegacyRoadmapProgressState =>
  typeof value === "object" && value !== null;

const normalizeCompletedNodeIds = (value: unknown) =>
  Array.from(
    new Set(
      Array.isArray(value)
        ? value.filter(
            (nodeId): nodeId is string =>
              typeof nodeId === "string" && nodeId.trim().length > 0,
          )
        : [],
    ),
  );

const normalizeMasteryValue = (value: unknown) => {
  const numericValue =
    typeof value === "number" ? value : Number.parseInt(String(value), 10);

  if (!Number.isFinite(numericValue)) {
    return null;
  }

  return Math.min(100, Math.max(0, Math.round(numericValue)));
};

const normalizeMasteryByNodeId = (
  value: unknown,
  completedNodeIds: string[],
): Record<string, number> => {
  const masteryByNodeId: Record<string, number> = {};

  if (typeof value === "object" && value !== null) {
    Object.entries(value).forEach(([nodeId, mastery]) => {
      const normalizedMastery = normalizeMasteryValue(mastery);

      if (normalizedMastery !== null) {
        masteryByNodeId[nodeId] = normalizedMastery;
      }
    });
  }

  completedNodeIds.forEach((nodeId) => {
    if (typeof masteryByNodeId[nodeId] !== "number") {
      masteryByNodeId[nodeId] = 100;
    }
  });

  return masteryByNodeId;
};

const getAggregateStatus = (statuses: RoadmapNodeProgressStatus[]) => {
  if (statuses.length === 0) {
    return "locked";
  }

  if (statuses.every((status) => status === "completed")) {
    return "completed";
  }

  if (statuses.some((status) => status !== "locked")) {
    return "in_progress";
  }

  return "locked";
};

const getCompletionTarget = (rule: RoadmapCompletionRule) =>
  rule.type === "score_target" ? rule.target : null;

const getLessonMasteryAverage = (
  nodeIds: string[],
  masteryByNodeId: Record<string, number>,
) => {
  if (nodeIds.length === 0) {
    return null;
  }

  const values = nodeIds
    .map((nodeId) => masteryByNodeId[nodeId])
    .filter((value): value is number => typeof value === "number");

  if (values.length !== nodeIds.length) {
    return null;
  }

  const average = values.reduce((sum, value) => sum + value, 0) / values.length;
  return Math.round(average);
};

const isLessonCompleted = (
  lesson: IndexedRoadmapLesson,
  completedNodeIds: Set<string>,
  masteryByNodeId: Record<string, number>,
) => {
  const lessonNodeIds = lesson.nodes.map((node) => node.id);
  const allNodesComplete = lessonNodeIds.every((nodeId) =>
    completedNodeIds.has(nodeId),
  );

  if (!allNodesComplete) {
    return false;
  }

  if (lesson.completionRule.type === "all_nodes") {
    return true;
  }

  const average = getLessonMasteryAverage(lessonNodeIds, masteryByNodeId);
  return average !== null && average >= lesson.completionRule.target;
};

const getPreviousRouteModuleId = (
  modulesInOrder: RoadmapDefinition["modules"],
  moduleIndex: number,
  routeObjective: RoadmapRouteObjective,
) => {
  for (let index = moduleIndex - 1; index >= 0; index -= 1) {
    const candidate = modulesInOrder[index];

    if (candidate.routeObjective === routeObjective) {
      return candidate.id;
    }
  }

  return null;
};

const getUnitBlockingReason = (
  unit: IndexedRoadmapUnit,
  previousUnitId: string | null,
  previousRouteModuleId: string | null,
  unitCompletionById: Record<string, boolean>,
  moduleCompletionById: Record<string, boolean>,
) => {
  if (previousRouteModuleId && !moduleCompletionById[previousRouteModuleId]) {
    return "Completa el modulo anterior de esta ruta antes de continuar.";
  }

  if (previousUnitId && !unitCompletionById[previousUnitId]) {
    return "Completa la unidad anterior antes de abrir esta unidad.";
  }

  const missingPrerequisite = unit.prerequisiteUnitIds.find(
    (prerequisiteUnitId) => !unitCompletionById[prerequisiteUnitId],
  );

  if (missingPrerequisite) {
    return `Cumple el prerequisito de unidad ${missingPrerequisite} para desbloquear esta unidad.`;
  }

  return null;
};

const getLessonUnlockBlockingReason = (
  lesson: IndexedRoadmapLesson,
  previousLessonId: string | null,
  unitIsUnlocked: boolean,
  unitBlockingReason: string | null,
  lessonCompletionById: Record<string, boolean>,
) => {
  if (!unitIsUnlocked) {
    return unitBlockingReason;
  }

  if (previousLessonId && !lessonCompletionById[previousLessonId]) {
    return "Completa la leccion anterior con mastery suficiente para avanzar.";
  }

  const missingPrerequisite = lesson.prerequisiteLessonIds.find(
    (prerequisiteLessonId) => !lessonCompletionById[prerequisiteLessonId],
  );

  if (missingPrerequisite) {
    return `Cumple el prerequisito de leccion ${missingPrerequisite} para desbloquear esta leccion.`;
  }

  return null;
};

export const createEmptyRoadmapProgress = (): RoadmapProgressState => ({
  schemaVersion: ROADMAP_PROGRESS_SCHEMA_VERSION,
  updatedAt: new Date().toISOString(),
  completedNodeIds: [],
  masteryByNodeId: {},
});

const normalizeProgress = (value: unknown): RoadmapProgressState => {
  if (!isRoadmapProgressState(value)) {
    return createEmptyRoadmapProgress();
  }

  const completedNodeIds = normalizeCompletedNodeIds(value.completedNodeIds);

  return {
    schemaVersion: ROADMAP_PROGRESS_SCHEMA_VERSION,
    updatedAt:
      typeof value.updatedAt === "string"
        ? value.updatedAt
        : new Date().toISOString(),
    completedNodeIds,
    masteryByNodeId: normalizeMasteryByNodeId(
      value.masteryByNodeId,
      completedNodeIds,
    ),
  };
};

export const loadRoadmapProgress = (): RoadmapProgressState => {
  const rawValue = localStorage.getItem(ROADMAP_PROGRESS_STORAGE_KEY);

  if (!rawValue) {
    return createEmptyRoadmapProgress();
  }

  try {
    return normalizeProgress(JSON.parse(rawValue));
  } catch {
    return createEmptyRoadmapProgress();
  }
};

export const saveRoadmapProgress = (progress: RoadmapProgressState) => {
  localStorage.setItem(
    ROADMAP_PROGRESS_STORAGE_KEY,
    JSON.stringify(normalizeProgress(progress)),
  );
};

export const recordRoadmapNodeMastery = (
  definition: RoadmapDefinition,
  progress: RoadmapProgressState,
  nodeId: string,
  mastery: number,
): RoadmapProgressState => {
  const index = buildRoadmapModelIndex(definition);
  const normalizedMastery = normalizeMasteryValue(mastery);

  if (!index.nodesById[nodeId] || normalizedMastery === null) {
    return progress;
  }

  return {
    schemaVersion: ROADMAP_PROGRESS_SCHEMA_VERSION,
    updatedAt: new Date().toISOString(),
    completedNodeIds: progress.completedNodeIds.includes(nodeId)
      ? progress.completedNodeIds
      : [...progress.completedNodeIds, nodeId],
    masteryByNodeId: {
      ...progress.masteryByNodeId,
      [nodeId]: normalizedMastery,
    },
  };
};

export const resetRoadmapRouteProgress = (
  definition: RoadmapDefinition,
  progress: RoadmapProgressState,
  routeObjective: RoadmapRouteObjective,
): RoadmapProgressState => {
  const index = buildRoadmapModelIndex(definition);
  const routeNodeIds = new Set(index.nodeIdsByRoute[routeObjective]);
  const masteryByNodeId = { ...progress.masteryByNodeId };

  routeNodeIds.forEach((nodeId) => {
    delete masteryByNodeId[nodeId];
  });

  return {
    schemaVersion: ROADMAP_PROGRESS_SCHEMA_VERSION,
    updatedAt: new Date().toISOString(),
    completedNodeIds: progress.completedNodeIds.filter(
      (nodeId) => !routeNodeIds.has(nodeId),
    ),
    masteryByNodeId,
  };
};

export const buildRoadmapProgressSnapshot = (
  definition: RoadmapDefinition,
  progress: RoadmapProgressState,
): RoadmapProgressSnapshot => {
  const index = buildRoadmapModelIndex(definition);
  const validCompletedNodeIds = progress.completedNodeIds.filter((nodeId) =>
    Boolean(index.nodesById[nodeId]),
  );
  const completedSet = new Set(validCompletedNodeIds);
  const masteryByNodeId = normalizeMasteryByNodeId(
    progress.masteryByNodeId,
    validCompletedNodeIds,
  );
  const statusByNodeId: Record<string, RoadmapNodeProgressStatus> = {};
  const statusByLessonId: Record<string, RoadmapNodeProgressStatus> = {};
  const statusByUnitId: Record<string, RoadmapNodeProgressStatus> = {};
  const statusByModuleId: Record<string, RoadmapNodeProgressStatus> = {};
  const lessonProgressById: Record<string, RoadmapLessonProgressSummary> = {};
  const unitProgressById: Record<string, RoadmapUnitProgressSummary> = {};
  const routeSummaries: Record<
    RoadmapRouteObjective,
    RoadmapRouteProgressSummary
  > = {
    english_interview: { ...DEFAULT_ROUTE_SUMMARIES.english_interview },
    math_speed: { ...DEFAULT_ROUTE_SUMMARIES.math_speed },
    dev_reasoning: { ...DEFAULT_ROUTE_SUMMARIES.dev_reasoning },
  };
  const lessonCompletionById: Record<string, boolean> = {};
  const unitCompletionById: Record<string, boolean> = {};
  const moduleCompletionById: Record<string, boolean> = {};
  const firstIncompleteNodeByLessonId: Record<string, string | null> = {};

  index.lessonsInOrder.forEach((lesson) => {
    lessonCompletionById[lesson.id] = isLessonCompleted(
      lesson,
      completedSet,
      masteryByNodeId,
    );
  });

  definition.modules.forEach((module) => {
    moduleCompletionById[module.id] = module.units.every((unit) =>
      unit.lessons.every((lesson) => lessonCompletionById[lesson.id]),
    );

    module.units.forEach((unit) => {
      unitCompletionById[unit.id] = unit.lessons.every(
        (lesson) => lessonCompletionById[lesson.id],
      );
    });
  });

  definition.modules.forEach((module, moduleIndex) => {
    const previousRouteModuleId = getPreviousRouteModuleId(
      definition.modules,
      moduleIndex,
      module.routeObjective,
    );
    const moduleStatuses: RoadmapNodeProgressStatus[] = [];

    module.units.forEach((unit, unitIndex) => {
      const indexedUnit = index.unitsById[unit.id];
      const previousUnitId =
        unitIndex > 0 ? module.units[unitIndex - 1].id : null;
      const unitBlockingReason = getUnitBlockingReason(
        indexedUnit,
        previousUnitId,
        previousRouteModuleId,
        unitCompletionById,
        moduleCompletionById,
      );
      const unitIsUnlocked = unitBlockingReason === null;
      const lessonStatuses: RoadmapNodeProgressStatus[] = [];

      unit.lessons.forEach((lesson, lessonIndex) => {
        const indexedLesson = index.lessonsById[lesson.id];
        const previousLessonId =
          lessonIndex > 0 ? unit.lessons[lessonIndex - 1].id : null;
        const lessonUnlockBlockingReason = getLessonUnlockBlockingReason(
          indexedLesson,
          previousLessonId,
          unitIsUnlocked,
          unitBlockingReason,
          lessonCompletionById,
        );
        const lessonIsUnlocked = lessonUnlockBlockingReason === null;
        let firstIncompleteNodeId: string | null = null;

        lesson.nodes.forEach((node) => {
          routeSummaries[node.routeObjective].totalNodes += 1;

          if (completedSet.has(node.id)) {
            statusByNodeId[node.id] = "completed";
            routeSummaries[node.routeObjective].completedNodes += 1;
            return;
          }

          if (!lessonIsUnlocked || firstIncompleteNodeId !== null) {
            statusByNodeId[node.id] = "locked";
            return;
          }

          statusByNodeId[node.id] = "in_progress";
          firstIncompleteNodeId = node.id;
        });

        firstIncompleteNodeByLessonId[lesson.id] = firstIncompleteNodeId;

        const lessonStatus: RoadmapNodeProgressStatus = lessonCompletionById[
          lesson.id
        ]
          ? "completed"
          : lessonIsUnlocked
            ? "in_progress"
            : "locked";
        const lessonMasteryAverage = getLessonMasteryAverage(
          lesson.nodes.map((node) => node.id),
          masteryByNodeId,
        );
        const masteryTarget = getCompletionTarget(lesson.completionRule);
        const lessonBlockingReason =
          lessonUnlockBlockingReason ||
          (masteryTarget !== null &&
          lessonMasteryAverage !== null &&
          lessonMasteryAverage < masteryTarget
            ? `Necesitas mastery minima de ${masteryTarget}%. Actual: ${lessonMasteryAverage}%.`
            : null);

        statusByLessonId[lesson.id] = lessonStatus;
        lessonProgressById[lesson.id] = {
          status: lessonStatus,
          isUnlocked: lessonIsUnlocked,
          isCompleted: lessonCompletionById[lesson.id],
          masteryTarget,
          masteryAverage: lessonMasteryAverage,
          blockingReason: lessonBlockingReason,
        };
        lessonStatuses.push(lessonStatus);
      });

      const unitStatus: RoadmapNodeProgressStatus = unitCompletionById[unit.id]
        ? "completed"
        : unitIsUnlocked
          ? "in_progress"
          : "locked";

      statusByUnitId[unit.id] = unitStatus;
      unitProgressById[unit.id] = {
        status: unitStatus,
        isUnlocked: unitIsUnlocked,
        isCompleted: unitCompletionById[unit.id],
        blockingReason: unitBlockingReason,
      };
      moduleStatuses.push(getAggregateStatus(lessonStatuses));
    });

    statusByModuleId[module.id] = moduleCompletionById[module.id]
      ? "completed"
      : getAggregateStatus(moduleStatuses);
  });

  (Object.keys(routeSummaries) as RoadmapRouteObjective[]).forEach(
    (routeObjective) => {
      const currentNode = index.lessonsInOrder.find((lesson) => {
        if (lesson.routeObjective !== routeObjective) {
          return false;
        }

        if (lessonProgressById[lesson.id].status === "locked") {
          return false;
        }

        if (firstIncompleteNodeByLessonId[lesson.id]) {
          return true;
        }

        return lessonProgressById[lesson.id].isCompleted === false;
      });

      routeSummaries[routeObjective].currentNodeId = currentNode
        ? firstIncompleteNodeByLessonId[currentNode.id] ||
          currentNode.nodes[0].id
        : null;
    },
  );

  return {
    completedNodeIds: validCompletedNodeIds,
    masteryByNodeId,
    statusByNodeId,
    statusByLessonId,
    statusByUnitId,
    statusByModuleId,
    lessonProgressById,
    unitProgressById,
    routeSummaries,
  };
};
