import { beforeEach, describe, expect, test } from "vitest";
import { defaultRoadmapDefinition } from "@/lib/roadmapCatalog";
import {
  buildRoadmapProgressSnapshot,
  createEmptyRoadmapProgress,
  loadRoadmapProgress,
  recordRoadmapNodeMastery,
  resetRoadmapRouteProgress,
  saveRoadmapProgress,
  ROADMAP_PROGRESS_STORAGE_KEY,
} from "@/lib/roadmapProgress";

describe("roadmapProgress", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("blocks the next lesson until the active lesson reaches the mastery target", () => {
    let progress = createEmptyRoadmapProgress();

    progress = recordRoadmapNodeMastery(
      defaultRoadmapDefinition,
      progress,
      "node_interview_opener",
      60,
    );
    progress = recordRoadmapNodeMastery(
      defaultRoadmapDefinition,
      progress,
      "node_fix_grammar_slips",
      60,
    );

    const blockedSnapshot = buildRoadmapProgressSnapshot(
      defaultRoadmapDefinition,
      progress,
    );

    expect(
      blockedSnapshot.lessonProgressById.lesson_english_opening,
    ).toMatchObject({
      status: "in_progress",
      isCompleted: false,
      masteryTarget: 70,
      masteryAverage: 60,
      blockingReason: "Necesitas mastery minima de 70%. Actual: 60%.",
    });
    expect(blockedSnapshot.statusByLessonId.lesson_english_followup).toBe(
      "locked",
    );
    expect(blockedSnapshot.routeSummaries.english_interview.currentNodeId).toBe(
      "node_interview_opener",
    );

    progress = recordRoadmapNodeMastery(
      defaultRoadmapDefinition,
      progress,
      "node_fix_grammar_slips",
      80,
    );

    const unlockedSnapshot = buildRoadmapProgressSnapshot(
      defaultRoadmapDefinition,
      progress,
    );

    expect(
      unlockedSnapshot.lessonProgressById.lesson_english_opening,
    ).toMatchObject({
      status: "completed",
      isCompleted: true,
      masteryAverage: 70,
    });
    expect(unlockedSnapshot.statusByLessonId.lesson_english_followup).toBe(
      "in_progress",
    );
    expect(unlockedSnapshot.statusByNodeId.node_rephrase_answers).toBe(
      "in_progress",
    );
  });

  test("migrates legacy progress and resets route-specific mastery", () => {
    const legacyProgress = {
      schemaVersion: 1 as const,
      updatedAt: "2026-03-06T10:00:00.000Z",
      completedNodeIds: [
        "node_interview_opener",
        "node_fix_grammar_slips",
        "node_syntax_warmup",
      ],
    };

    localStorage.setItem(
      ROADMAP_PROGRESS_STORAGE_KEY,
      JSON.stringify(legacyProgress),
    );

    expect(loadRoadmapProgress()).toEqual({
      schemaVersion: 2,
      updatedAt: "2026-03-06T10:00:00.000Z",
      completedNodeIds: legacyProgress.completedNodeIds,
      masteryByNodeId: {
        node_interview_opener: 100,
        node_fix_grammar_slips: 100,
        node_syntax_warmup: 100,
      },
    });

    const nextProgress = resetRoadmapRouteProgress(
      defaultRoadmapDefinition,
      loadRoadmapProgress(),
      "english_interview",
    );

    expect(nextProgress.completedNodeIds).toEqual(["node_syntax_warmup"]);
    expect(nextProgress.masteryByNodeId).toEqual({
      node_syntax_warmup: 100,
    });

    saveRoadmapProgress(nextProgress);
    expect(loadRoadmapProgress()).toEqual(nextProgress);
  });
});
