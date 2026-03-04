import React from "react";
import { beforeEach, afterEach, describe, test, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import SentenceTransformerView from "@/pages/SentenceTransformerView";
import { sentenceTransformerRounds } from "@/features/data/sentenceTransformer";
import { ADAPTIVE_DIFFICULTY_LOG_KEY } from "@/lib/adaptiveDifficulty";
import {
  clearAnalyticsEventsForTesting,
  getAnalyticsEvents,
} from "@/lib/analytics";

const { toastMock } = vi.hoisted(() => ({
  toastMock: {
    success: vi.fn(),
    info: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("@/components/ui/Toast", () => ({
  toast: toastMock,
}));

describe("SentenceTransformerView", () => {
  const startGame = () => {
    fireEvent.click(screen.getByRole("button", { name: /Iniciar/i }));
  };

  beforeEach(() => {
    localStorage.clear();
    clearAnalyticsEventsForTesting();
    toastMock.success.mockReset();
    toastMock.info.mockReset();
    toastMock.error.mockReset();
    vi.spyOn(Math, "random").mockReturnValue(0.9999999);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("renders title and transformation label", () => {
    render(<SentenceTransformerView />);
    startGame();

    expect(screen.getByText("Sentence Transformer")).toBeInTheDocument();
    expect(screen.getByText(/Transformation:/)).toBeInTheDocument();
  });

  test("accepts correct transformed sentence", () => {
    render(<SentenceTransformerView />);
    startGame();

    fireEvent.change(screen.getByLabelText("Transformer answer"), {
      target: {
        value: "If I finish this report tonight I will send it tomorrow.",
      },
    });
    fireEvent.click(screen.getByRole("button", { name: "Check transform" }));

    expect(screen.getByText(/Correct transformation/)).toBeInTheDocument();
  });

  test("accepts close conditional variant with contraction", () => {
    render(<SentenceTransformerView />);
    startGame();

    fireEvent.change(screen.getByLabelText("Transformer answer"), {
      target: {
        value: "If I finish this report tonight, I'll send it tomorrow.",
      },
    });
    fireEvent.click(screen.getByRole("button", { name: "Check transform" }));

    expect(screen.getByText(/Correct transformation/)).toBeInTheDocument();
  });

  test("tracks mode_mismatch analytics reason", () => {
    render(<SentenceTransformerView />);
    startGame();

    fireEvent.change(screen.getByLabelText("Transformer answer"), {
      target: { value: "I will send it tomorrow" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Check transform" }));

    const events = getAnalyticsEvents();
    expect(events.at(-1)?.name).toBe("item_wrong");
    expect(events.at(-1)?.payload).toMatchObject({
      game: "sentence_transformer",
      errorType: "mode_mismatch",
    });
  });

  test("auto-upshifts difficulty after 3 consecutive correct answers and logs cause", () => {
    render(<SentenceTransformerView />);
    startGame();

    fireEvent.click(
      screen.getByRole("button", { name: "Set transformer level A2" }),
    );
    expect(screen.getByText("45s")).toBeInTheDocument();

    const a2Rounds = sentenceTransformerRounds.filter(
      (round) => round.level === "A2",
    );
    expect(a2Rounds.length).toBeGreaterThanOrEqual(3);

    for (let index = 0; index < 3; index += 1) {
      fireEvent.change(screen.getByLabelText("Transformer answer"), {
        target: { value: a2Rounds[index].expectedSentence },
      });
      fireEvent.click(screen.getByRole("button", { name: "Check transform" }));
      if (index < 2) {
        fireEvent.click(screen.getByRole("button", { name: "Next round" }));
      }
    }

    expect(screen.getByText("38s")).toBeInTheDocument();
    expect(toastMock.success).toHaveBeenCalled();

    const rawLog = localStorage.getItem(ADAPTIVE_DIFFICULTY_LOG_KEY);
    expect(rawLog).toBeTruthy();
    const log = JSON.parse(rawLog || "[]");
    expect(log.length).toBeGreaterThan(0);
    expect(log[log.length - 1]).toMatchObject({
      gameId: "sentence_transformer",
      previousLevel: "A2",
      nextLevel: "B1",
      reason: "rule_upshift",
      trigger: "consecutive_correct",
      changed: true,
    });
  });
});
