import React from "react";
import { act } from "react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import MathGameView from "@/pages/MathGameView";
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

describe("MathGameView", () => {
  const startGame = () => {
    fireEvent.click(screen.getByRole("button", { name: "Iniciar juego" }));
  };

  const getAnswerButtons = () =>
    screen
      .getAllByRole("button")
      .filter((button) => button.className.includes("min-h-[64px]"));

  const answerWithOptionIndex = (index: number) => {
    const answerButtons = getAnswerButtons();
    expect(answerButtons.length).toBeGreaterThan(index);
    fireEvent.click(answerButtons[index]);
    act(() => {
      vi.advanceTimersByTime(700);
    });
  };

  beforeEach(() => {
    localStorage.clear();
    toastMock.success.mockReset();
    toastMock.info.mockReset();
    toastMock.error.mockReset();
    vi.useFakeTimers();
    vi.spyOn(Math, "random").mockReturnValue(0.9999999);
  });

  afterEach(() => {
    act(() => {
      vi.runOnlyPendingTimers();
    });
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  test("renders start panel and starts a session", () => {
    render(<MathGameView />);

    expect(screen.getByText("Math Speed Duel")).toBeInTheDocument();
    startGame();

    expect(screen.getByText(/Tema:/)).toBeInTheDocument();
    expect(screen.getByText(/Respuesta esperada:/)).toBeInTheDocument();
  });

  test("auto-downshifts difficulty after 3 consecutive errors and logs cause", () => {
    render(<MathGameView />);
    startGame();

    fireEvent.click(screen.getByRole("button", { name: "Set math level Hard" }));

    for (let index = 0; index < 3; index += 1) {
      answerWithOptionIndex(1);
    }

    expect(toastMock.info).toHaveBeenCalled();

    const rawLog = localStorage.getItem(ADAPTIVE_DIFFICULTY_LOG_KEY);
    expect(rawLog).toBeTruthy();
    const log = JSON.parse(rawLog || "[]");
    expect(log.length).toBeGreaterThan(0);
    expect(log[log.length - 1]).toMatchObject({
      gameId: "math_game",
      previousLevel: "hard",
      nextLevel: "normal",
      reason: "rule_downshift",
      trigger: "consecutive_wrong",
      changed: true,
    });
  });

  test("auto-upshifts difficulty after 3 consecutive correct answers and logs cause", () => {
    render(<MathGameView />);
    startGame();

    fireEvent.click(screen.getByRole("button", { name: "Set math level Easy" }));

    for (let index = 0; index < 3; index += 1) {
      answerWithOptionIndex(0);
    }

    expect(toastMock.success).toHaveBeenCalled();

    const rawLog = localStorage.getItem(ADAPTIVE_DIFFICULTY_LOG_KEY);
    expect(rawLog).toBeTruthy();
    const log = JSON.parse(rawLog || "[]");
    expect(log.length).toBeGreaterThan(0);
    expect(log[log.length - 1]).toMatchObject({
      gameId: "math_game",
      previousLevel: "easy",
      nextLevel: "normal",
      reason: "rule_upshift",
      trigger: "consecutive_correct",
      changed: true,
    });
  });
});
