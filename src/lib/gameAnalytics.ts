const GAME_ID_ALIASES: Record<string, string> = {
  bug_hunter: "code_bug_hunter",
  syntax_builder: "code_syntax_builder",
  study_docs_game: "docs_game",
  study_docs_quiz: "docs_quiz",
};

export const normalizeGameId = (gameId: string): string =>
  GAME_ID_ALIASES[gameId] || gameId;

export const normalizeAnalyticsPayload = (
  payload: Record<string, unknown>,
): Record<string, unknown> => {
  const normalizedPayload: Record<string, unknown> = { ...payload };

  if (typeof normalizedPayload.game === "string") {
    normalizedPayload.game = normalizeGameId(normalizedPayload.game);
  }

  if (
    typeof normalizedPayload.duration !== "number" &&
    typeof normalizedPayload.durationSeconds === "number"
  ) {
    normalizedPayload.duration = normalizedPayload.durationSeconds;
  }

  if (
    typeof normalizedPayload.duration !== "number" &&
    typeof normalizedPayload.durationMs === "number"
  ) {
    normalizedPayload.duration = Math.round(
      normalizedPayload.durationMs / 1000,
    );
  }

  return normalizedPayload;
};
