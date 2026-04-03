import { toDateKey } from "@/lib/activityTracker";
import {
  buildRoadmapProgressSnapshot,
  type RoadmapProgressState,
} from "@/lib/roadmapProgress";
import {
  buildRoadmapModelIndex,
  type RoadmapDefinition,
  type RoadmapRouteObjective,
} from "@/lib/roadmapModel";

export const ROADMAP_REWARDS_STORAGE_KEY = "skillpal-roadmap-rewards";
export const ROADMAP_REWARDS_UPDATED_EVENT = "roadmapRewardsUpdated";
export const ROADMAP_REWARDS_SCHEMA_VERSION = 1;

const UNIT_COMPLETION_REWARD_XP = 40;
const MODULE_COMPLETION_REWARD_XP = 120;

export interface RoadmapBadgeUnlock {
  id: string;
  title: string;
  description: string;
  category: "unit_completion" | "module_completion" | "continuity";
  rewardXp: number;
  routeObjective: RoadmapRouteObjective | "all";
  earnedAt: string;
}

export interface RoadmapRewardsState {
  schemaVersion: typeof ROADMAP_REWARDS_SCHEMA_VERSION;
  updatedAt: string;
  claimedRewardIds: string[];
  activityDateKeys: string[];
  badges: RoadmapBadgeUnlock[];
}

export interface RoadmapRewardGrant {
  rewardId: string;
  badge: RoadmapBadgeUnlock;
}

export interface RoadmapContinuityTier {
  id: string;
  requiredDays: number;
  rewardXp: number;
}

export interface RoadmapContinuityStatus {
  currentStreak: number;
  bestStreak: number;
  activeDays: number;
  nextTier: RoadmapContinuityTier | null;
}

export interface RoadmapRewardsStatus extends RoadmapContinuityStatus {
  unlockedBadgeCount: number;
  recentBadges: RoadmapBadgeUnlock[];
}

export interface ApplyRoadmapRewardsResult {
  nextRewards: RoadmapRewardsState;
  grants: RoadmapRewardGrant[];
  continuity: RoadmapContinuityStatus;
}

export const ROADMAP_CONTINUITY_TIERS: RoadmapContinuityTier[] = [
  { id: "roadmap_streak_3", requiredDays: 3, rewardXp: 30 },
  { id: "roadmap_streak_5", requiredDays: 5, rewardXp: 60 },
  { id: "roadmap_streak_7", requiredDays: 7, rewardXp: 120 },
];

const sortDateKeys = (dateKeys: string[]) =>
  Array.from(new Set(dateKeys)).sort((left, right) =>
    left.localeCompare(right),
  );

const getDateKeyDiff = (leftDateKey: string, rightDateKey: string) => {
  const leftDate = new Date(`${leftDateKey}T12:00:00`);
  const rightDate = new Date(`${rightDateKey}T12:00:00`);
  return Math.round(
    (rightDate.getTime() - leftDate.getTime()) / (1000 * 60 * 60 * 24),
  );
};

const normalizeBadge = (value: unknown): RoadmapBadgeUnlock | null => {
  if (!value || typeof value !== "object") {
    return null;
  }

  const candidate = value as Partial<RoadmapBadgeUnlock>;
  if (
    typeof candidate.id !== "string" ||
    typeof candidate.title !== "string" ||
    typeof candidate.description !== "string" ||
    typeof candidate.rewardXp !== "number" ||
    typeof candidate.earnedAt !== "string" ||
    (candidate.category !== "unit_completion" &&
      candidate.category !== "module_completion" &&
      candidate.category !== "continuity") ||
    (candidate.routeObjective !== "all" &&
      candidate.routeObjective !== "english_interview" &&
      candidate.routeObjective !== "math_speed" &&
      candidate.routeObjective !== "dev_reasoning")
  ) {
    return null;
  }

  return {
    id: candidate.id,
    title: candidate.title,
    description: candidate.description,
    category: candidate.category,
    rewardXp: candidate.rewardXp,
    routeObjective: candidate.routeObjective,
    earnedAt: candidate.earnedAt,
  };
};

const normalizeRewards = (value: unknown): RoadmapRewardsState => {
  if (!value || typeof value !== "object") {
    return createEmptyRoadmapRewards();
  }

  const candidate = value as Partial<RoadmapRewardsState>;
  const claimedRewardIds = Array.isArray(candidate.claimedRewardIds)
    ? Array.from(
        new Set(
          candidate.claimedRewardIds.filter(
            (rewardId): rewardId is string =>
              typeof rewardId === "string" && rewardId.trim().length > 0,
          ),
        ),
      )
    : [];
  const activityDateKeys = Array.isArray(candidate.activityDateKeys)
    ? sortDateKeys(
        candidate.activityDateKeys.filter(
          (dateKey): dateKey is string =>
            typeof dateKey === "string" && /^\d{4}-\d{2}-\d{2}$/.test(dateKey),
        ),
      )
    : [];
  const badges = Array.isArray(candidate.badges)
    ? candidate.badges
        .map(normalizeBadge)
        .filter((badge): badge is RoadmapBadgeUnlock => badge !== null)
        .sort((left, right) => right.earnedAt.localeCompare(left.earnedAt))
    : [];

  return {
    schemaVersion: ROADMAP_REWARDS_SCHEMA_VERSION,
    updatedAt:
      typeof candidate.updatedAt === "string"
        ? candidate.updatedAt
        : new Date().toISOString(),
    claimedRewardIds,
    activityDateKeys,
    badges,
  };
};

export const createEmptyRoadmapRewards = (): RoadmapRewardsState => ({
  schemaVersion: ROADMAP_REWARDS_SCHEMA_VERSION,
  updatedAt: new Date().toISOString(),
  claimedRewardIds: [],
  activityDateKeys: [],
  badges: [],
});

export const loadRoadmapRewards = (): RoadmapRewardsState => {
  const rawValue = localStorage.getItem(ROADMAP_REWARDS_STORAGE_KEY);

  if (!rawValue) {
    return createEmptyRoadmapRewards();
  }

  try {
    return normalizeRewards(JSON.parse(rawValue));
  } catch {
    return createEmptyRoadmapRewards();
  }
};

export const saveRoadmapRewards = (rewards: RoadmapRewardsState) => {
  const normalizedRewards = normalizeRewards(rewards);
  localStorage.setItem(
    ROADMAP_REWARDS_STORAGE_KEY,
    JSON.stringify(normalizedRewards),
  );

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(ROADMAP_REWARDS_UPDATED_EVENT));
  }
};

export const getRoadmapContinuityStatus = (
  rewards: RoadmapRewardsState,
  date: Date = new Date(),
): RoadmapContinuityStatus => {
  const activityDateKeys = sortDateKeys(rewards.activityDateKeys);

  if (activityDateKeys.length === 0) {
    return {
      currentStreak: 0,
      bestStreak: 0,
      activeDays: 0,
      nextTier: ROADMAP_CONTINUITY_TIERS[0] || null,
    };
  }

  let runningStreak = 1;
  let bestStreak = 1;

  for (let index = 1; index < activityDateKeys.length; index += 1) {
    const previousDateKey = activityDateKeys[index - 1];
    const currentDateKey = activityDateKeys[index];
    const dayDiff = getDateKeyDiff(previousDateKey, currentDateKey);

    runningStreak = dayDiff === 1 ? runningStreak + 1 : 1;
    bestStreak = Math.max(bestStreak, runningStreak);
  }

  const todayDateKey = toDateKey(date);
  const lastActivityDateKey = activityDateKeys[activityDateKeys.length - 1];
  const trailingDiff = getDateKeyDiff(lastActivityDateKey, todayDateKey);

  let currentStreak = 0;
  if (trailingDiff <= 1) {
    currentStreak = 1;

    for (
      let index = activityDateKeys.length - 1;
      index > 0 && currentStreak <= activityDateKeys.length;
      index -= 1
    ) {
      const currentDateKey = activityDateKeys[index];
      const previousDateKey = activityDateKeys[index - 1];
      const dayDiff = getDateKeyDiff(previousDateKey, currentDateKey);

      if (dayDiff !== 1) {
        break;
      }

      currentStreak += 1;
    }
  }

  return {
    currentStreak,
    bestStreak,
    activeDays: activityDateKeys.length,
    nextTier:
      ROADMAP_CONTINUITY_TIERS.find(
        (tier) => tier.requiredDays > Math.max(currentStreak, bestStreak),
      ) || null,
  };
};

export const getRoadmapRewardsStatus = (
  rewards: RoadmapRewardsState,
  date: Date = new Date(),
): RoadmapRewardsStatus => {
  const continuity = getRoadmapContinuityStatus(rewards, date);

  return {
    ...continuity,
    unlockedBadgeCount: rewards.badges.length,
    recentBadges: rewards.badges.slice(0, 4),
  };
};

const buildBadgeUnlock = (
  rewardId: string,
  title: string,
  description: string,
  category: RoadmapBadgeUnlock["category"],
  rewardXp: number,
  routeObjective: RoadmapBadgeUnlock["routeObjective"],
  earnedAt: string,
): RoadmapBadgeUnlock => ({
  id: rewardId,
  title,
  description,
  category,
  rewardXp,
  routeObjective,
  earnedAt,
});

const claimReward = (
  grants: RoadmapRewardGrant[],
  nextRewards: RoadmapRewardsState,
  rewardId: string,
  badge: RoadmapBadgeUnlock,
) => {
  if (nextRewards.claimedRewardIds.includes(rewardId)) {
    return;
  }

  nextRewards.claimedRewardIds.push(rewardId);
  nextRewards.badges = [badge, ...nextRewards.badges].sort((left, right) =>
    right.earnedAt.localeCompare(left.earnedAt),
  );
  grants.push({
    rewardId,
    badge,
  });
};

export const applyRoadmapRewards = (
  definition: RoadmapDefinition,
  previousProgress: RoadmapProgressState,
  nextProgress: RoadmapProgressState,
  rewards: RoadmapRewardsState = loadRoadmapRewards(),
  date: Date = new Date(),
): ApplyRoadmapRewardsResult => {
  const nextRewards = normalizeRewards(rewards);
  const previousSnapshot = buildRoadmapProgressSnapshot(
    definition,
    previousProgress,
  );
  const nextSnapshot = buildRoadmapProgressSnapshot(definition, nextProgress);
  const roadmapIndex = buildRoadmapModelIndex(definition);
  const grants: RoadmapRewardGrant[] = [];
  const earnedAt = date.toISOString();
  const todayDateKey = toDateKey(date);

  nextRewards.updatedAt = earnedAt;
  nextRewards.activityDateKeys = sortDateKeys([
    ...nextRewards.activityDateKeys,
    todayDateKey,
  ]);

  roadmapIndex.unitsInOrder.forEach((unit) => {
    const wasCompleted =
      previousSnapshot.unitProgressById[unit.id]?.isCompleted;
    const isCompleted = nextSnapshot.unitProgressById[unit.id]?.isCompleted;

    if (!wasCompleted && isCompleted) {
      const rewardId = `unit:${unit.id}`;
      claimReward(
        grants,
        nextRewards,
        rewardId,
        buildBadgeUnlock(
          rewardId,
          `Unidad completada: ${unit.title}`,
          `Completaste la unidad ${unit.title}.`,
          "unit_completion",
          UNIT_COMPLETION_REWARD_XP,
          unit.routeObjective,
          earnedAt,
        ),
      );
    }
  });

  definition.modules.forEach((module) => {
    const wasCompleted =
      previousSnapshot.statusByModuleId[module.id] === "completed";
    const isCompleted =
      nextSnapshot.statusByModuleId[module.id] === "completed";

    if (!wasCompleted && isCompleted) {
      const rewardId = `module:${module.id}`;
      claimReward(
        grants,
        nextRewards,
        rewardId,
        buildBadgeUnlock(
          rewardId,
          `Modulo completado: ${module.title}`,
          `Cerraste el modulo ${module.title}.`,
          "module_completion",
          MODULE_COMPLETION_REWARD_XP,
          module.routeObjective,
          earnedAt,
        ),
      );
    }
  });

  const continuity = getRoadmapContinuityStatus(nextRewards, date);
  ROADMAP_CONTINUITY_TIERS.forEach((tier) => {
    if (continuity.currentStreak < tier.requiredDays) {
      return;
    }

    const rewardId = `continuity:${tier.id}`;
    claimReward(
      grants,
      nextRewards,
      rewardId,
      buildBadgeUnlock(
        rewardId,
        `Racha roadmap: ${tier.requiredDays} dias`,
        `Mantuviste ${tier.requiredDays} dias seguidos de avance en el roadmap.`,
        "continuity",
        tier.rewardXp,
        "all",
        earnedAt,
      ),
    );
  });

  return {
    nextRewards,
    grants,
    continuity,
  };
};
