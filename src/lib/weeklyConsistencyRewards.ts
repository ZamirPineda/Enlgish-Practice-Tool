import { getGlobalActivityData } from "@/lib/activityTracker";
import { getIsoWeekKey } from "@/lib/srs";

const WEEKLY_CONSISTENCY_CLAIMS_KEY = "skillpal-weekly-consistency-claims";

export interface WeeklyConsistencyTierConfig {
  id: string;
  title: string;
  requiredDays: number;
  rewardXp: number;
}

export interface WeeklyConsistencyTierStatus extends WeeklyConsistencyTierConfig {
  eligible: boolean;
  claimed: boolean;
}

export interface WeeklyConsistencyStatus {
  weekKey: string;
  activeDays: number;
  tiers: WeeklyConsistencyTierStatus[];
}

export const WEEKLY_CONSISTENCY_TIERS: WeeklyConsistencyTierConfig[] = [
  { id: "consistency_3", title: "Starter", requiredDays: 3, rewardXp: 30 },
  { id: "consistency_5", title: "Focused", requiredDays: 5, rewardXp: 60 },
  { id: "consistency_7", title: "Unstoppable", requiredDays: 7, rewardXp: 120 },
];

const parseDateKey = (dateKey: string): Date => {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day, 12, 0, 0, 0);
};

const readClaims = (): Record<string, boolean> => {
  if (typeof window === "undefined" || !window.localStorage) return {};
  try {
    const raw = localStorage.getItem(WEEKLY_CONSISTENCY_CLAIMS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }
    return Object.fromEntries(
      Object.entries(parsed).filter(
        (entry): entry is [string, boolean] => typeof entry[1] === "boolean",
      ),
    );
  } catch {
    return {};
  }
};

const writeClaims = (claims: Record<string, boolean>) => {
  if (typeof window === "undefined" || !window.localStorage) return;
  localStorage.setItem(WEEKLY_CONSISTENCY_CLAIMS_KEY, JSON.stringify(claims));
};

const getClaimKey = (weekKey: string, tierId: string) => `${weekKey}:${tierId}`;

export const isWeeklyConsistencyClaimed = (
  weekKey: string,
  tierId: string,
): boolean => {
  const claims = readClaims();
  return Boolean(claims[getClaimKey(weekKey, tierId)]);
};

export const getWeeklyConsistencyStatus = (
  date: Date = new Date(),
): WeeklyConsistencyStatus => {
  const weekKey = getIsoWeekKey(date);
  const activityData = getGlobalActivityData();
  const claims = readClaims();

  const activeDays = Object.entries(activityData).reduce(
    (count, [dateKey, day]) => {
      if (getIsoWeekKey(parseDateKey(dateKey)) !== weekKey) return count;

      const isActive =
        (day?.cards ?? 0) > 0 ||
        (day?.xp ?? 0) > 0 ||
        (day?.time ?? 0) > 0 ||
        (day?.score ?? 0) > 0;

      return isActive ? count + 1 : count;
    },
    0,
  );

  const tiers: WeeklyConsistencyTierStatus[] = WEEKLY_CONSISTENCY_TIERS.map(
    (tier) => ({
      ...tier,
      eligible: activeDays >= tier.requiredDays,
      claimed: Boolean(claims[getClaimKey(weekKey, tier.id)]),
    }),
  );

  return {
    weekKey,
    activeDays,
    tiers,
  };
};

export type WeeklyConsistencyClaimResult =
  | { ok: true; rewardXp: number }
  | { ok: false; reason: "not_eligible" | "already_claimed" };

export const claimWeeklyConsistencyReward = (
  tierId: string,
  date: Date = new Date(),
): WeeklyConsistencyClaimResult => {
  const status = getWeeklyConsistencyStatus(date);
  const tier = status.tiers.find((item) => item.id === tierId);

  if (!tier || !tier.eligible) {
    return { ok: false, reason: "not_eligible" };
  }

  if (tier.claimed) {
    return { ok: false, reason: "already_claimed" };
  }

  const claims = readClaims();
  claims[getClaimKey(status.weekKey, tierId)] = true;
  writeClaims(claims);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("weeklyConsistencyUpdated"));
  }

  return { ok: true, rewardXp: tier.rewardXp };
};
