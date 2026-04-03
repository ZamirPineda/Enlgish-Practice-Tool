import React from "react";
import { act } from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { TechMatchUpView } from "@/pages/tech-games/TechMatchUpView";
import { techDecks } from "@/features/data/techDecks";
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

describe("TechMatchUpView", () => {
  const deckId = techDecks[0].id;

  const renderView = () => {
    render(
      <MemoryRouter initialEntries={[`/tech-games/matchup/${deckId}`]}>
        <Routes>
          <Route
            path="/tech-games/matchup/:deckId"
            element={<TechMatchUpView />}
          />
        </Routes>
      </MemoryRouter>,
    );
  };

  const startSession = () => {
    fireEvent.click(screen.getByRole("button", { name: "Iniciar Match Up" }));
  };

  const getPromptButtons = () =>
    screen
      .getAllByRole("button")
      .filter(
        (button) =>
          button.className.includes(
            "p-4 border-2 rounded-xl text-left transition-all duration-300",
          ) && !button.className.includes("text-sm md:text-base"),
      );

  const getAnswerButtons = () =>
    screen
      .getAllByRole("button")
      .filter((button) => button.className.includes("text-sm md:text-base"));

  const answerCurrentPair = (correct: boolean) => {
    const promptButtons = getPromptButtons().filter(
      (button) => !(button as HTMLButtonElement).disabled,
    );
    const answerButtons = getAnswerButtons().filter(
      (button) => !(button as HTMLButtonElement).disabled,
    );
    expect(promptButtons.length).toBeGreaterThan(0);
    expect(answerButtons.length).toBeGreaterThan(0);

    const promptButton = promptButtons[0];
    const promptText = promptButton.textContent || "";
    const currentCard = techDecks[0].cards.find((item) => item.prompt === promptText);
    expect(currentCard).toBeDefined();
    const correctAnswer = currentCard!.answer;

    const targetAnswerButton = correct
      ? answerButtons.find((button) => button.textContent === correctAnswer)
      : answerButtons.find((button) => button.textContent !== correctAnswer);
    expect(targetAnswerButton).toBeDefined();

    fireEvent.click(promptButton);
    fireEvent.click(targetAnswerButton!);

    if (!correct) {
      act(() => {
        vi.advanceTimersByTime(900);
      });
    }
  };

  beforeEach(() => {
    localStorage.clear();
    toastMock.success.mockReset();
    toastMock.info.mockReset();
    toastMock.error.mockReset();
    vi.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      vi.runOnlyPendingTimers();
    });
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  test("renders setup and starts matchup session", () => {
    renderView();
    startSession();
    expect(screen.getByText("Conceptos")).toBeInTheDocument();
  });

  test("auto-downshifts difficulty after 3 mismatches and logs cause", () => {
    renderView();
    startSession();

    for (let index = 0; index < 3; index += 1) {
      answerCurrentPair(false);
    }

    expect(toastMock.info).toHaveBeenCalled();

    const rawLog = localStorage.getItem(ADAPTIVE_DIFFICULTY_LOG_KEY);
    expect(rawLog).toBeTruthy();
    const log = JSON.parse(rawLog || "[]");
    expect(log.length).toBeGreaterThan(0);
    expect(log[log.length - 1]).toMatchObject({
      gameId: "tech_matchup",
      previousLevel: "normal",
      nextLevel: "easy",
      reason: "rule_downshift",
      trigger: "consecutive_wrong",
      changed: true,
    });
  });

  test("auto-upshifts difficulty after 3 correct matches and logs cause", () => {
    renderView();

    fireEvent.click(screen.getByRole("button", { name: /Facil \(2 rondas\)/i }));
    startSession();

    for (let index = 0; index < 3; index += 1) {
      answerCurrentPair(true);
    }

    expect(toastMock.success).toHaveBeenCalled();

    const rawLog = localStorage.getItem(ADAPTIVE_DIFFICULTY_LOG_KEY);
    expect(rawLog).toBeTruthy();
    const log = JSON.parse(rawLog || "[]");
    expect(log.length).toBeGreaterThan(0);
    expect(log[log.length - 1]).toMatchObject({
      gameId: "tech_matchup",
      previousLevel: "easy",
      nextLevel: "normal",
      reason: "rule_upshift",
      trigger: "consecutive_correct",
      changed: true,
    });
  });
});
