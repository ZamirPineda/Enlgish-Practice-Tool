import { useState, useEffect } from "react";
import { toast } from "@/components/ui/Toast";
import { z } from "zod";
import { loadSettings } from "./settingsStore";

const GLOBAL_XP_KEY = "english-pal-global-xp";
const DAILY_QUESTS_KEY = "skillpal-daily-quests";
const STREAK_FREEZES_KEY = "skillpal-streak-freezes";
const LIFETIME_STATS_KEY = "skillpal-lifetime-stats";
const CLAIMED_MILESTONES_KEY = "skillpal-claimed-milestones";
const XP_PER_LEVEL = 1000;

const getDailyCycleKey = (date: Date = new Date()): string => {
  const settings = loadSettings();
  const offsetHours = settings.dayOffsetHours ?? 3;
  const adjustedDate = new Date(date);
  adjustedDate.setHours(adjustedDate.getHours() - offsetHours);

  const year = adjustedDate.getFullYear();
  const month = String(adjustedDate.getMonth() + 1).padStart(2, "0");
  const day = String(adjustedDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const dailyQuestSchema = z.object({
  id: z.string(),
  type: z.enum(["play_game", "correct_answers", "study_cards"]),
  targetName: z.string(), // The game ID or generic "any"
  description: z.string(),
  target: z.number(),
  current: z.number(),
  reward: z.number(),
  completed: z.boolean(),
});

export type DailyQuest = z.infer<typeof dailyQuestSchema>;

export const lifetimeStatsSchema = z.record(z.string(), z.number());

export const claimedMilestonesSchema = z.record(z.string(), z.boolean());

export const dailyQuestsStateSchema = z.object({
  date: z.string(),
  quests: z.array(dailyQuestSchema),
});

const GENERATE_DAILY_QUESTS = (): DailyQuest[] => {
  return [
    {
      id: "quest_1",
      type: "play_game",
      targetName: "any",
      description: "Play any 3 mini-games",
      target: 3,
      current: 0,
      reward: 50,
      completed: false,
    },
    {
      id: "quest_2",
      type: "correct_answers",
      targetName: "any",
      description: "Get 20 correct answers",
      target: 20,
      current: 0,
      reward: 100,
      completed: false,
    },
    {
      id: "quest_3",
      type: "study_cards",
      targetName: "vault",
      description: "Review 10 cards in the Vault",
      target: 10,
      current: 0,
      reward: 75,
      completed: false,
    },
  ];
};

export const getDailyQuests = (): z.infer<typeof dailyQuestsStateSchema> => {
  const today = getDailyCycleKey();
  if (typeof window === "undefined" || !window.localStorage)
    return { date: today, quests: GENERATE_DAILY_QUESTS() };

  const raw = localStorage.getItem(DAILY_QUESTS_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      const result = dailyQuestsStateSchema.safeParse(parsed);
      if (result.success && result.data.date === today) {
        return result.data;
      }
    } catch (e) {
      console.error("Failed to parse daily quests", e);
    }
  }

  // Generate new for today
  const newQuests = { date: today, quests: GENERATE_DAILY_QUESTS() };
  localStorage.setItem(DAILY_QUESTS_KEY, JSON.stringify(newQuests));
  return newQuests;
};

export const getLifetimeStats = (): Record<string, number> => {
  if (typeof window === "undefined" || !window.localStorage) return {};
  try {
    const raw = localStorage.getItem(LIFETIME_STATS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    const result = lifetimeStatsSchema.safeParse(parsed);
    return result.success ? result.data : {};
  } catch {
    return {};
  }
};

export const getClaimedMilestones = (): Record<string, boolean> => {
  if (typeof window === "undefined" || !window.localStorage) return {};
  try {
    const raw = localStorage.getItem(CLAIMED_MILESTONES_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    const result = claimedMilestonesSchema.safeParse(parsed);
    return result.success ? result.data : {};
  } catch {
    return {};
  }
};

export const MILESTONES = [1, 10, 50, 100, 500, 1000];

export const getMilestoneReward = (tier: number) => {
  if (tier === 1) return 100;
  if (tier === 10) return 300;
  if (tier === 50) return 800;
  if (tier === 100) return 2000;
  if (tier === 500) return 5000;
  if (tier === 1000) return 10000;
  return 100;
};

export const MILESTONE_TITLES: Record<string, string> = {
  play_game: "Partidas Completadas",
  correct_answers: "Respuestas Correctas",
  study_cards: "Tarjetas Estudiadas",
  // Game specific milestones
  "play_game:stop": "Partidas de STOP",
  "play_game:math": "Math Quiz",
  "play_game:quiz": "Docs Quiz",
  "play_game:speed": "Speed Builder",
  "play_game:error_hunter": "Error Hunter",
  "play_game:paraphrase": "Paraphrase Duel",
  "play_game:collocation": "Collocation Sprint",
  "play_game:taboo": "Taboo English",
  "play_game:sentence_transformer": "Sentence Transformer",
  "play_game:bug_hunter": "Code Bug Hunter",
  "play_game:syntax_builder": "Code Syntax Builder",
  "play_game:diplomatic": "Diplomatic Reviewer",
  "play_game:test_tech": "Tech Interview Hub",
  "correct_answers:stop": "Respuestas STOP",
  "correct_answers:math": "Respuestas Math",
  "correct_answers:quiz": "Respuestas Docs",
};

export const trackLifetimeMilestone = (
  type: string,
  amount: number,
  targetName?: string,
) => {
  if (typeof window === "undefined" || !window.localStorage) return;

  const stats = getLifetimeStats();
  const claimed = getClaimedMilestones();

  // Update base type counter (e.g., "play_game")
  const currentTotal = (stats[type] || 0) + amount;
  stats[type] = currentTotal;

  // If targetName is provided and not "any", update specific game counter too
  const specificType =
    targetName && targetName !== "any" ? `${type}:${targetName}` : null;
  let specificTotal = 0;

  if (specificType) {
    specificTotal = (stats[specificType] || 0) + amount;
    stats[specificType] = specificTotal;
  }

  localStorage.setItem(LIFETIME_STATS_KEY, JSON.stringify(stats));
  window.dispatchEvent(new Event("lifetimeStatsUpdated"));

  // Helper to check and give milestone rewards
  const checkMilestones = (statKey: string, total: number) => {
    MILESTONES.forEach((tier) => {
      const milestoneId = `${statKey}_${tier}`;
      if (total >= tier && !claimed[milestoneId]) {
        claimed[milestoneId] = true;
        localStorage.setItem(CLAIMED_MILESTONES_KEY, JSON.stringify(claimed));

        const reward = getMilestoneReward(tier);
        const title = MILESTONE_TITLES[statKey] || statKey;

        setTimeout(() => {
          toast.success(
            `🏆 LOGRO DESBLOQUEADO: ${tier} ${title}! (+${reward} XP)`,
            5000,
          );
          addGlobalXp(reward);
        }, 1500); // Delay for UI pacing
      }
    });
  };

  // Check generic milestones first
  checkMilestones(type, currentTotal);

  // Check specific game milestones
  if (specificType) {
    checkMilestones(specificType, specificTotal);
  }
};

export const progressQuest = (
  type: DailyQuest["type"],
  amount: number = 1,
  targetName: string = "any",
) => {
  trackLifetimeMilestone(type, amount, targetName);

  const questData = getDailyQuests();
  let updated = false;

  const newQuests = questData.quests.map((q) => {
    if (q.completed) return q;

    // Check if quest type matches and targetName matches or quest asks for "any"
    if (
      q.type === type &&
      (q.targetName === "any" || q.targetName === targetName)
    ) {
      const newCurrent = Math.min(q.target, q.current + amount);
      if (newCurrent !== q.current) {
        updated = true;
        const newlyCompleted = newCurrent >= q.target;

        if (newlyCompleted) {
          setTimeout(() => {
            toast.success(
              `🎖️ Quest Completed: ${q.description}! (+${q.reward} XP)`,
              5000,
            );
            addGlobalXp(q.reward);
          }, 500); // Small delay to not overlap with immediate game finish sounds
        }

        return { ...q, current: newCurrent, completed: newlyCompleted };
      }
    }
    return q;
  });

  if (updated) {
    localStorage.setItem(
      DAILY_QUESTS_KEY,
      JSON.stringify({ ...questData, quests: newQuests }),
    );
    window.dispatchEvent(new Event("dailyQuestsUpdated"));
  }
};

export const getStreakFreezes = (): number => {
  if (typeof window === "undefined" || !window.localStorage) return 0;
  return parseInt(localStorage.getItem(STREAK_FREEZES_KEY) || "0", 10) || 0;
};

export const useStreakFreezes = () => {
  const [freezes, setFreezes] = useState<number>(getStreakFreezes);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STREAK_FREEZES_KEY) setFreezes(getStreakFreezes());
    };
    const handleCustomEvent = () => setFreezes(getStreakFreezes());

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("streakFreezesUpdated", handleCustomEvent);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("streakFreezesUpdated", handleCustomEvent);
    };
  }, []);

  const buyFreeze = (cost: number = 500) => {
    const currentXp = getGlobalXp();
    if (currentXp < cost) {
      toast.error("Not enough XP to buy a Streak Freeze.");
      return false;
    }

    // Deduct XP
    saveGlobalXp(currentXp - cost);
    // Add freeze
    const currentFreezes = getStreakFreezes();
    localStorage.setItem(STREAK_FREEZES_KEY, (currentFreezes + 1).toString());
    window.dispatchEvent(new Event("streakFreezesUpdated"));
    toast.success(
      "🧊 Streak Freeze purchased! Your next missed day is protected.",
    );
    return true;
  };

  const useFreeze = () => {
    const currentFreezes = getStreakFreezes();
    if (currentFreezes > 0) {
      localStorage.setItem(STREAK_FREEZES_KEY, (currentFreezes - 1).toString());
      window.dispatchEvent(new Event("streakFreezesUpdated"));
      return true;
    }
    return false;
  };

  return { freezes, buyFreeze, useFreeze };
};

export const getGlobalXp = (): number => {
  if (typeof window === "undefined" || !window.localStorage) return 0;
  const raw = localStorage.getItem(GLOBAL_XP_KEY);
  if (!raw) return 0;
  try {
    return parseInt(raw, 10) || 0;
  } catch {
    return 0;
  }
};

export const saveGlobalXp = (xp: number) => {
  if (typeof window === "undefined" || !window.localStorage) return;
  localStorage.setItem(GLOBAL_XP_KEY, xp.toString());
  // Dispatch a custom event so other components (like the Navbar) can react to XP changes
  window.dispatchEvent(new Event("globalXpUpdated"));
};

export const addGlobalXp = (points: number) => {
  if (points <= 0) return;
  const currentXp = getGlobalXp();

  const currentLevel = Math.floor(currentXp / XP_PER_LEVEL) + 1;
  const newLevel = Math.floor((currentXp + points) / XP_PER_LEVEL) + 1;

  saveGlobalXp(currentXp + points);

  // Track this XP globally for the daily goal widget
  import("./activityTracker").then(({ trackActivity }) => {
    trackActivity({ xp: points });
  });

  if (newLevel > currentLevel) {
    toast.success(`🎉 Level Up! You reached Lvl ${newLevel}! ✨`, 4000);
  } else {
    toast.success(`+${points} XP ✨`, 2000);
  }
};

export const useGlobalXp = () => {
  const [xp, setXp] = useState<number>(getGlobalXp);

  const { freezes: streakFreezes, buyFreeze } = useStreakFreezes();
  const [quests, setQuests] = useState(getDailyQuests().quests);

  useEffect(() => {
    const syncQuests = () => setQuests(getDailyQuests().quests);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === GLOBAL_XP_KEY) setXp(parseInt(e.newValue || "0", 10) || 0);
      if (e.key === DAILY_QUESTS_KEY) syncQuests();
    };

    const handleXpEvent = () => setXp(getGlobalXp());
    const handleQuestsEvent = () => syncQuests();
    const handleFocus = () => syncQuests();
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        syncQuests();
      }
    };

    const intervalId = window.setInterval(syncQuests, 60000);

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("globalXpUpdated", handleXpEvent);
    window.addEventListener("dailyQuestsUpdated", handleQuestsEvent);
    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Ensure stale quest state is corrected right after mounting.
    syncQuests();

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("globalXpUpdated", handleXpEvent);
      window.removeEventListener("dailyQuestsUpdated", handleQuestsEvent);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const currentLevelXp = xp % XP_PER_LEVEL;
  const nextLevelXp = XP_PER_LEVEL;
  const progressPercentage = Math.min(
    100,
    Math.max(0, (currentLevelXp / nextLevelXp) * 100),
  );

  return {
    totalXp: xp,
    level,
    currentLevelXp,
    nextLevelXp,
    progressPercentage,
    addXp: addGlobalXp,
    quests,
    streakFreezes,
    buyFreeze,
  };
};
