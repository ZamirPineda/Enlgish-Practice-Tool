export interface Rank {
  level: number;
  title: string;
  emoji: string;
  color: string;
}

export const USER_RANKS: Rank[] = [
  { level: 1, title: "Curious Novice", emoji: "🌱", color: "text-green-500" },
  { level: 5, title: "Eager Learner", emoji: "📖", color: "text-emerald-500" },
  {
    level: 10,
    title: "Steady Apprentice",
    emoji: "🛠️",
    color: "text-teal-500",
  },
  { level: 15, title: "Rising Scholar", emoji: "🎓", color: "text-cyan-500" },
  { level: 20, title: "Adept Thinker", emoji: "💡", color: "text-sky-500" },
  { level: 30, title: "Skilled Explorer", emoji: "🧭", color: "text-blue-500" },
  {
    level: 40,
    title: "Seasoned Veteran",
    emoji: "⚔️",
    color: "text-indigo-500",
  },
  {
    level: 50,
    title: "Master of Concepts",
    emoji: "🧠",
    color: "text-violet-500",
  },
  { level: 75, title: "Grandmaster", emoji: "👑", color: "text-purple-500" },
  {
    level: 100,
    title: "Omniscient Polymath",
    emoji: "🌌",
    color: "text-fuchsia-500",
  },
];

/**
 * Returns the highest rank achieved by the user based on their current level.
 */
export const getRankForLevel = (currentLevel: number): Rank => {
  // Sort descending by level to find the highest applicable rank first
  const sortedRanks = [...USER_RANKS].sort((a, b) => b.level - a.level);

  for (const rank of sortedRanks) {
    if (currentLevel >= rank.level) {
      return rank;
    }
  }

  // Fallback to the lowest rank (should never hit if first rank is level 1)
  return USER_RANKS[0];
};
