import { describe, expect, it } from "vitest";
import { normalizeAnalyticsPayload, normalizeGameId } from "./gameAnalytics";

describe("game analytics normalization", () => {
  it("maps known aliases to canonical game ids", () => {
    expect(normalizeGameId("bug_hunter")).toBe("code_bug_hunter");
    expect(normalizeGameId("syntax_builder")).toBe("code_syntax_builder");
    expect(normalizeGameId("study_docs_game")).toBe("docs_game");
    expect(normalizeGameId("tech_trivia")).toBe("tech_trivia");
  });

  it("normalizes payload game and duration aliases", () => {
    const normalized = normalizeAnalyticsPayload({
      game: "study_docs_quiz",
      durationSeconds: 80,
    });

    expect(normalized.game).toBe("docs_quiz");
    expect(normalized.duration).toBe(80);
  });
});
