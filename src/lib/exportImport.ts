import { z } from "zod";
import { appSettingsSchema } from "./settingsStore";
import { srsVocabularyItemSchema, migrateDeckToFsrsIfNeeded } from "./srs";
import {
  dailyQuestsStateSchema,
  lifetimeStatsSchema,
  claimedMilestonesSchema,
} from "./xpStore";
import { analyticsEventSchema } from "./analytics";

const vaultProgressSchema = z.object({
  currentStreak: z.number().catch(0),
  bestStreak: z.number().catch(0),
  totalReviews: z.number().catch(0),
  lastReviewDate: z.string().nullable().catch(null),
  lastBossReviewWeek: z.string().nullable().catch(null),
  bossReviewsCompleted: z.number().catch(0),
});

const vaultWeeklyActivitySchema = z.object({
  weekKey: z.string(),
  sessions: z.number().catch(0),
  attempts: z.number().catch(0),
  correct: z.number().catch(0),
  studyMinutes: z.number().catch(0),
});

const userCharacterSchema = z.object({
  name: z.string().catch("Learner"),
  avatarStyle: z.string().catch("micah"),
  seed: z.string().catch("Learner123"),
  skinColor: z.string().optional(),
  hairColor: z.string().optional(),
  backgroundColor: z.string().catch("transparent"),
});

const userProfileSchema = z.object({
  character: userCharacterSchema,
});

const dailyActivityDataSchema = z.record(
  z.string(),
  z.object({ score: z.number() }),
);

export const exportDataSchema = z.object({
  exportVersion: z.number().catch(1),
  exportedAt: z.string().optional(),
  settings: appSettingsSchema.optional(),
  profile: userProfileSchema.optional(),
  deck: z.record(z.string(), srsVocabularyItemSchema).optional(),
  vaultProgress: vaultProgressSchema.optional(),
  vaultWeeklyActivity: vaultWeeklyActivitySchema.optional(),
  vaultPracticeObjective: z.string().optional(),
  dailyQuests: dailyQuestsStateSchema.optional(),
  lifetimeStats: lifetimeStatsSchema.optional(),
  claimedMilestones: claimedMilestonesSchema.optional(),
  streakFreezes: z.number().optional(),
  globalXp: z.number().optional(),
  activityData: dailyActivityDataSchema.optional(),
  analyticsEvents: z.array(analyticsEventSchema).optional(),
});

export type ExportData = z.infer<typeof exportDataSchema>;

const safeGetStorage = (key: string) => {
  if (typeof window === "undefined" || !window.localStorage) return null;
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const exportToJSON = () => {
  const data: Partial<ExportData> = {
    exportVersion: 1,
    exportedAt: new Date().toISOString(),
  };

  const settings = safeGetStorage("app-settings");
  if (settings) data.settings = settings;

  const profile = safeGetStorage("app-user-profile");
  if (profile) data.profile = profile;

  let deck = safeGetStorage("vocab-vault-deck");
  if (deck) {
    const migratedDeck = migrateDeckToFsrsIfNeeded(deck);
    if (migratedDeck) deck = migratedDeck;
    data.deck = deck;
  }

  const vaultProgress = safeGetStorage("vocab-vault-progress");
  if (vaultProgress) data.vaultProgress = vaultProgress;

  const vaultWeeklyActivity = safeGetStorage("vocab-vault-weekly-activity");
  if (vaultWeeklyActivity) data.vaultWeeklyActivity = vaultWeeklyActivity;

  const vaultPracticeObjective = localStorage.getItem(
    "vocab-vault-practice-objective",
  );
  if (vaultPracticeObjective)
    data.vaultPracticeObjective = vaultPracticeObjective;

  const dailyQuests = safeGetStorage("skillpal-daily-quests");
  if (dailyQuests) data.dailyQuests = dailyQuests;

  const lifetimeStats = safeGetStorage("skillpal-lifetime-stats");
  if (lifetimeStats) data.lifetimeStats = lifetimeStats;

  const claimedMilestones = safeGetStorage("skillpal-claimed-milestones");
  if (claimedMilestones) data.claimedMilestones = claimedMilestones;

  if (typeof window !== "undefined" && window.localStorage) {
    const freezeRaw = localStorage.getItem("skillpal-streak-freezes");
    if (freezeRaw) data.streakFreezes = parseInt(freezeRaw, 10);

    const xpRaw = localStorage.getItem("english-pal-global-xp");
    if (xpRaw) data.globalXp = parseInt(xpRaw, 10);
  }

  const activityData = safeGetStorage("global-daily-activity");
  if (activityData) data.activityData = activityData;

  const analyticsEvents = safeGetStorage("vocab-vault-analytics-events");
  if (analyticsEvents && Array.isArray(analyticsEvents)) {
    data.analyticsEvents = analyticsEvents;
  }

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `english-practice-tool-backup-${
    new Date().toISOString().split("T")[0]
  }.json`;
  a.click();
  URL.revokeObjectURL(url);
};

export const importFromJSON = (
  jsonString: string,
): { success: boolean; error?: string } => {
  try {
    const parsed = JSON.parse(jsonString);
    const result = exportDataSchema.safeParse(parsed);

    if (!result.success) {
      console.error("Invalid export data schema", result.error);
      return { success: false, error: "Archivo incompatible o corrupto" };
    }

    const data = result.data;
    if (typeof window === "undefined" || !window.localStorage)
      return { success: false, error: "No localStorage" };

    if (data.settings) {
      localStorage.setItem("app-settings", JSON.stringify(data.settings));
    }
    if (data.profile) {
      localStorage.setItem("app-user-profile", JSON.stringify(data.profile));
    }

    // Merge deck intelligently (keep higher repetitions or interval)
    if (data.deck) {
      const currentDeck = safeGetStorage("vocab-vault-deck") || {};
      const newDeck = { ...currentDeck };
      for (const [key, item] of Object.entries(data.deck)) {
        const existing = newDeck[key];
        if (!existing) {
          newDeck[key] = item;
        } else {
          // Compare progress to keep the one with most reps
          const currentReps = existing.repetition || 0;
          const importReps = item.repetition || 0;
          if (importReps > currentReps) {
            newDeck[key] = item;
          }
        }
      }
      localStorage.setItem("vocab-vault-deck", JSON.stringify(newDeck));
    }

    if (data.vaultProgress) {
      localStorage.setItem(
        "vocab-vault-progress",
        JSON.stringify(data.vaultProgress),
      );
    }
    if (data.vaultWeeklyActivity) {
      localStorage.setItem(
        "vocab-vault-weekly-activity",
        JSON.stringify(data.vaultWeeklyActivity),
      );
    }
    if (data.vaultPracticeObjective) {
      localStorage.setItem(
        "vocab-vault-practice-objective",
        data.vaultPracticeObjective,
      );
    }
    if (data.dailyQuests) {
      localStorage.setItem(
        "skillpal-daily-quests",
        JSON.stringify(data.dailyQuests),
      );
    }
    if (data.lifetimeStats) {
      const currentStats = safeGetStorage("skillpal-lifetime-stats") || {};
      const newStats = { ...currentStats };
      for (const [k, v] of Object.entries(data.lifetimeStats)) {
        newStats[k] = Math.max(newStats[k] || 0, v);
      }
      localStorage.setItem("skillpal-lifetime-stats", JSON.stringify(newStats));
    }
    if (data.claimedMilestones) {
      const current = safeGetStorage("skillpal-claimed-milestones") || {};
      localStorage.setItem(
        "skillpal-claimed-milestones",
        JSON.stringify({ ...current, ...data.claimedMilestones }),
      );
    }
    if (data.streakFreezes !== undefined) {
      const current = parseInt(
        localStorage.getItem("skillpal-streak-freezes") || "0",
        10,
      );
      localStorage.setItem(
        "skillpal-streak-freezes",
        Math.max(current, data.streakFreezes).toString(),
      );
    }
    if (data.globalXp !== undefined) {
      const current = parseInt(
        localStorage.getItem("english-pal-global-xp") || "0",
        10,
      );
      localStorage.setItem(
        "english-pal-global-xp",
        Math.max(current, data.globalXp).toString(),
      );
    }
    if (data.activityData) {
      const currentActivity = safeGetStorage("global-daily-activity") || {};
      const newActivity = { ...currentActivity };
      for (const [dateKey, payload] of Object.entries(data.activityData)) {
        if (!newActivity[dateKey]) newActivity[dateKey] = { score: 0 };
        newActivity[dateKey].score = Math.max(
          newActivity[dateKey].score,
          payload.score,
        );
      }
      localStorage.setItem(
        "global-daily-activity",
        JSON.stringify(newActivity),
      );
    }
    if (data.analyticsEvents) {
      const currentEvents =
        safeGetStorage("vocab-vault-analytics-events") || [];
      // Combine and keep mostly newer ones without overflowing
      const allEvents = [...currentEvents, ...data.analyticsEvents];
      // simplistic deduplication by timestamp & name
      const uniqueEventsMap = new Map();
      allEvents.forEach((e) =>
        uniqueEventsMap.set(`${e.timestamp}-${e.name}`, e),
      );
      const mergedEvents = Array.from(uniqueEventsMap.values())
        .sort(
          (a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
        )
        .slice(-500);
      localStorage.setItem(
        "vocab-vault-analytics-events",
        JSON.stringify(mergedEvents),
      );
    }

    // Trigger events for reactive UI
    window.dispatchEvent(new Event("globalXpUpdated"));
    window.dispatchEvent(new Event("streakFreezesUpdated"));
    window.dispatchEvent(new Event("dailyQuestsUpdated"));
    window.dispatchEvent(new Event("lifetimeStatsUpdated"));
    window.dispatchEvent(new Event("activityUpdated"));

    return { success: true };
  } catch (error) {
    console.error("Failed to import JSON", error);
    return { success: false, error: "Failed to parse JSON string" };
  }
};
