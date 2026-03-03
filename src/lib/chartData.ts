import { AnalyticsEvent } from "@/lib/analytics";

export interface DailyActivityPoint {
  date: string; // e.g. "Feb 28"
  attempts: number; // total item_correct + item_wrong that day
  correct: number; // total item_correct that day
  playtimeMinutes: number; // total minutes based on session_end
}

export interface GameDistributionPoint {
  name: string;
  value: number; // total attempts
  fill?: string; // color
}

const prettifyGameName = (value: string) =>
  value
    .split("_")
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(" ");

const GAME_COLORS: Record<string, string> = {
  math_game: "#3b82f6", // blue-500
  docs_game: "#8b5cf6", // violet-500
  docs_quiz: "#10b981", // emerald-500
  speed_builder: "#f59e0b", // amber-500
  error_hunter: "#ef4444", // red-500
  paraphrase_duel: "#f43f5e", // rose-500
  collocation_sprint: "#06b6d4", // cyan-500
  taboo_english: "#d946ef", // fuchsia-500
  sentence_transformer: "#84cc16", // lime-500
  code_syntax_builder: "#eab308", // yellow-500
  code_bug_hunter: "#ef4444", // red-500
  diplomatic_reviewer: "#6366f1", // indigo-500
  vault_review: "#38bdf8", // sky-400
  stop_game: "#f97316", // orange-500
  tech_trivia: "#22c55e", // green-500
  tech_flashcards: "#3b82f6", // blue-500
  tech_matchup: "#a855f7", // purple-500
  tech_boss: "#ef4444", // red-500
};

export const GAME_CATEGORY: Record<string, "english" | "math" | "dev"> = {
  math_game: "math",
  tech_trivia: "dev",
  tech_flashcards: "dev",
  tech_matchup: "dev",
  tech_boss: "dev",
  code_syntax_builder: "dev",
  code_bug_hunter: "dev",
  // English ones default
  docs_game: "english",
  docs_quiz: "english",
  speed_builder: "english",
  error_hunter: "english",
  paraphrase_duel: "english",
  collocation_sprint: "english",
  taboo_english: "english",
  sentence_transformer: "english",
  diplomatic_reviewer: "english",
  vault_review: "english",
  stop_game: "english",
};

export const buildDailyActivityData = (
  events: AnalyticsEvent[],
  daysToLookBack = 14,
): DailyActivityPoint[] => {
  const points: Record<string, DailyActivityPoint> = {};

  // Initialize the last N days
  const now = new Date();
  for (let i = daysToLookBack - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const displayDate = d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    points[dateKey] = {
      date: displayDate,
      attempts: 0,
      correct: 0,
      playtimeMinutes: 0,
    };
  }

  // Aggregate
  events.forEach((event) => {
    if (
      event.name !== "item_correct" &&
      event.name !== "item_wrong" &&
      event.name !== "session_end"
    )
      return;

    // vault reviews might not log game payload as explicitly as games, so let's default
    // to checking if it's from review
    const timestamp = new Date(event.timestamp);
    const dateKey = `${timestamp.getFullYear()}-${String(timestamp.getMonth() + 1).padStart(2, "0")}-${String(timestamp.getDate()).padStart(2, "0")}`;

    if (points[dateKey]) {
      if (
        event.name === "session_end" &&
        typeof event.payload.duration === "number"
      ) {
        points[dateKey].playtimeMinutes += event.payload.duration / 60;
      } else if (event.name === "item_correct" || event.name === "item_wrong") {
        points[dateKey].attempts += 1;
        if (event.name === "item_correct") {
          points[dateKey].correct += 1;
        }
      }
    }
  });

  Object.values(points).forEach(
    (p) => (p.playtimeMinutes = Math.round(p.playtimeMinutes * 10) / 10),
  );
  return Object.values(points);
};

export const getGameFromEvent = (event: AnalyticsEvent): string => {
  if (typeof event.payload.game === "string") {
    return event.payload.game;
  }
  if (
    event.payload.mode === "daily" ||
    event.payload.mode === "boss" ||
    event.payload.mode === "objective"
  ) {
    return "vault_review";
  }
  return "unknown";
};

export const buildGameDistributionData = (
  events: AnalyticsEvent[],
): GameDistributionPoint[] => {
  const distribution: Record<string, number> = {};

  events.forEach((event) => {
    if (
      event.name !== "item_correct" &&
      event.name !== "item_wrong" &&
      event.name !== "session_end"
    )
      return;

    let game = getGameFromEvent(event);
    distribution[game] = (distribution[game] || 0) + 1;
  });

  return Object.entries(distribution)
    .map(([game, value]) => ({
      name: prettifyGameName(game),
      value,
      fill: GAME_COLORS[game] || "#94a3b8", // slate-400 default
    }))
    .sort((a, b) => b.value - a.value);
};
