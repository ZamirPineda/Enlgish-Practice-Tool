import React from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import DiplomaticReviewerView from "@/pages/DiplomaticReviewerView";
import { diplomaticRounds } from "@/features/data/diplomaticData";
import { ADAPTIVE_DIFFICULTY_LOG_KEY } from "@/lib/adaptiveDifficulty";

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

describe("DiplomaticReviewerView", () => {
  const startGame = () => {
    fireEvent.click(screen.getByRole("button", { name: /Iniciar Revisi/i }));
  };

  const getCurrentRound = () => {
    const currentRound = diplomaticRounds.find((round) =>
      screen.queryByText(round.context),
    );
    expect(currentRound).toBeDefined();
    return currentRound!;
  };

  beforeEach(() => {
    localStorage.clear();
    toastMock.success.mockReset();
    toastMock.info.mockReset();
    toastMock.error.mockReset();
    vi.spyOn(Math, "random").mockReturnValue(0.9999999);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("renders title and default timer", () => {
    render(<DiplomaticReviewerView />);
    startGame();

    expect(screen.getByText("Diplomatic Reviewer")).toBeInTheDocument();
    expect(screen.getByText("45s")).toBeInTheDocument();
  });

  test("submits an option and shows round feedback", () => {
    render(<DiplomaticReviewerView />);
    startGame();

    const wrongOption = getCurrentRound().options.find((option) => !option.isCorrect);
    expect(wrongOption).toBeDefined();

    fireEvent.click(screen.getByRole("button", { name: wrongOption!.text }));

    expect(
      screen.getByText(/(Excelente diplomacia|Cuidado|Tiempo agotado)/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Siguiente Situaci/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Score total:/)).toHaveTextContent(/\d+/);
  });

  test("auto-upshifts difficulty after 3 consecutive correct answers and logs cause", () => {
    render(<DiplomaticReviewerView />);
    startGame();

    fireEvent.click(
      screen.getByRole("button", { name: "Set diplomatic level B2" }),
    );

    for (let index = 0; index < 3; index += 1) {
      const correctOption = getCurrentRound().options.find(
        (option) => option.isCorrect,
      );
      expect(correctOption).toBeDefined();
      fireEvent.click(screen.getByRole("button", { name: correctOption!.text }));
      if (index < 2) {
        fireEvent.click(
          screen.getByRole("button", { name: /Siguiente Situaci/i }),
        );
      }
    }

    expect(toastMock.success).toHaveBeenCalled();

    const rawLog = localStorage.getItem(ADAPTIVE_DIFFICULTY_LOG_KEY);
    expect(rawLog).toBeTruthy();
    const log = JSON.parse(rawLog || "[]");
    expect(log.length).toBeGreaterThan(0);
    expect(log[log.length - 1]).toMatchObject({
      gameId: "diplomatic_reviewer",
      previousLevel: "B2",
      nextLevel: "C1",
      reason: "rule_upshift",
      trigger: "consecutive_correct",
      changed: true,
    });
  });
});
