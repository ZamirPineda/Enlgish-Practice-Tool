import { beforeEach, describe, expect, test, vi } from "vitest";
import { defaultRoadmapDefinition } from "@/lib/roadmapCatalog";
import {
  createEmptyRoadmapProgress,
  recordRoadmapNodeMastery,
} from "@/lib/roadmapProgress";
import {
  applyRoadmapRewards,
  createEmptyRoadmapRewards,
  getRoadmapContinuityStatus,
} from "@/lib/roadmapRewards";

describe("roadmapRewards", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useRealTimers();
  });

  test("grants unit and module rewards only when a new completion happens", () => {
    const emptyProgress = createEmptyRoadmapProgress();
    let progress = emptyProgress;
    let rewards = createEmptyRoadmapRewards();

    progress = recordRoadmapNodeMastery(
      defaultRoadmapDefinition,
      progress,
      "node_interview_opener",
      70,
    );
    progress = recordRoadmapNodeMastery(
      defaultRoadmapDefinition,
      progress,
      "node_fix_grammar_slips",
      70,
    );

    const unitRewardResult = applyRoadmapRewards(
      defaultRoadmapDefinition,
      emptyProgress,
      progress,
      rewards,
      new Date("2026-03-06T12:00:00.000Z"),
    );

    expect(unitRewardResult.grants.map((grant) => grant.badge.title)).toEqual([
      "Unidad completada: Foundation Answers",
    ]);

    rewards = unitRewardResult.nextRewards;
    const unchangedRewardResult = applyRoadmapRewards(
      defaultRoadmapDefinition,
      progress,
      progress,
      rewards,
      new Date("2026-03-06T14:00:00.000Z"),
    );

    expect(unchangedRewardResult.grants).toHaveLength(0);

    let previousProgress = progress;
    progress = recordRoadmapNodeMastery(
      defaultRoadmapDefinition,
      progress,
      "node_rephrase_answers",
      80,
    );
    progress = recordRoadmapNodeMastery(
      defaultRoadmapDefinition,
      progress,
      "node_transform_followups",
      80,
    );

    const moduleRewardResult = applyRoadmapRewards(
      defaultRoadmapDefinition,
      previousProgress,
      progress,
      rewards,
      new Date("2026-03-07T12:00:00.000Z"),
    );

    expect(moduleRewardResult.grants.map((grant) => grant.badge.title)).toEqual(
      ["Unidad completada: Follow-up Control"],
    );

    rewards = moduleRewardResult.nextRewards;
    previousProgress = progress;
    progress = recordRoadmapNodeMastery(
      defaultRoadmapDefinition,
      progress,
      "node_story_frame_builder",
      80,
    );
    progress = recordRoadmapNodeMastery(
      defaultRoadmapDefinition,
      progress,
      "node_story_error_cleanup",
      80,
    );
    progress = recordRoadmapNodeMastery(
      defaultRoadmapDefinition,
      progress,
      "node_story_rephrase_variants",
      80,
    );
    progress = recordRoadmapNodeMastery(
      defaultRoadmapDefinition,
      progress,
      "node_story_followup_transform",
      80,
    );
    progress = recordRoadmapNodeMastery(
      defaultRoadmapDefinition,
      progress,
      "node_panel_meeting_builder",
      90,
    );
    progress = recordRoadmapNodeMastery(
      defaultRoadmapDefinition,
      progress,
      "node_panel_precision_cleanup",
      90,
    );
    progress = recordRoadmapNodeMastery(
      defaultRoadmapDefinition,
      progress,
      "node_panel_rephrase_tradeoffs",
      90,
    );
    progress = recordRoadmapNodeMastery(
      defaultRoadmapDefinition,
      progress,
      "node_panel_constraint_transform",
      90,
    );

    const finalModuleRewardResult = applyRoadmapRewards(
      defaultRoadmapDefinition,
      previousProgress,
      progress,
      rewards,
      new Date("2026-03-09T12:00:00.000Z"),
    );

    expect(
      finalModuleRewardResult.grants.map((grant) => grant.badge.title),
    ).toEqual([
      "Unidad completada: Behavioral Stories",
      "Unidad completada: Panel Pressure",
      "Modulo completado: English Interview Path",
    ]);
  });

  test("tracks roadmap continuity and unlocks streak rewards once", () => {
    const emptyProgress = createEmptyRoadmapProgress();
    let previousProgress = emptyProgress;
    let nextProgress = recordRoadmapNodeMastery(
      defaultRoadmapDefinition,
      emptyProgress,
      "node_interview_opener",
      60,
    );
    let rewards = createEmptyRoadmapRewards();

    let result = applyRoadmapRewards(
      defaultRoadmapDefinition,
      previousProgress,
      nextProgress,
      rewards,
      new Date("2026-03-06T12:00:00.000Z"),
    );

    expect(getRoadmapContinuityStatus(result.nextRewards)).toMatchObject({
      currentStreak: 1,
      bestStreak: 1,
      activeDays: 1,
    });

    previousProgress = nextProgress;
    nextProgress = recordRoadmapNodeMastery(
      defaultRoadmapDefinition,
      previousProgress,
      "node_interview_opener",
      70,
    );
    rewards = result.nextRewards;
    result = applyRoadmapRewards(
      defaultRoadmapDefinition,
      previousProgress,
      nextProgress,
      rewards,
      new Date("2026-03-07T12:00:00.000Z"),
    );

    expect(getRoadmapContinuityStatus(result.nextRewards)).toMatchObject({
      currentStreak: 2,
      bestStreak: 2,
      activeDays: 2,
    });

    previousProgress = nextProgress;
    nextProgress = recordRoadmapNodeMastery(
      defaultRoadmapDefinition,
      previousProgress,
      "node_fix_grammar_slips",
      80,
    );
    rewards = result.nextRewards;
    result = applyRoadmapRewards(
      defaultRoadmapDefinition,
      previousProgress,
      nextProgress,
      rewards,
      new Date("2026-03-08T12:00:00.000Z"),
    );

    expect(result.grants.map((grant) => grant.badge.title)).toContain(
      "Racha roadmap: 3 dias",
    );
    expect(getRoadmapContinuityStatus(result.nextRewards)).toMatchObject({
      currentStreak: 3,
      bestStreak: 3,
      activeDays: 3,
    });

    const duplicateContinuityResult = applyRoadmapRewards(
      defaultRoadmapDefinition,
      nextProgress,
      nextProgress,
      result.nextRewards,
      new Date("2026-03-08T18:00:00.000Z"),
    );

    expect(
      duplicateContinuityResult.grants.some(
        (grant) => grant.badge.title === "Racha roadmap: 3 dias",
      ),
    ).toBe(false);
  });
});
