import React from "react";
import { act } from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { TechTriviaSprintView } from "@/pages/tech-games/TechTriviaSprintView";
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

describe("TechTriviaSprintView", () => {
  const deckId = techDecks[0].id;

  const renderView = () => {
    render(
      <MemoryRouter initialEntries={[`/tech-games/trivia/${deckId}`]}>
        <Routes>
          <Route
            path="/tech-games/trivia/:deckId"
            element={<TechTriviaSprintView />}
          />
        </Routes>
      </MemoryRouter>,
    );
  };

  const startSession = () => {
    fireEvent.click(screen.getByRole("button", { name: "Iniciar Trivia" }));
  };

  const getCurrentCard = () => {
    const card = techDecks[0].cards.find(
      (item) => screen.queryByText(item.prompt) !== null,
    );
    expect(card).toBeDefined();
    return card!;
  };

  const getOptionButtons = () =>
    screen
      .getAllByRole("button")
      .filter((button) =>
        button.className.includes("text-left border-2 rounded-xl"),
      );

  const answerCurrentQuestion = (correct: boolean) => {
    const currentCard = getCurrentCard();
    const options = getOptionButtons();
    expect(options.length).toBeGreaterThan(1);

    const target = correct
      ? options.find((button) => button.textContent === currentCard.answer)
      : options.find((button) => button.textContent !== currentCard.answer);

    expect(target).toBeDefined();
    fireEvent.click(target!);
    act(() => {
      vi.advanceTimersByTime(1600);
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

  test("renders setup and starts trivia sprint", () => {
    renderView();
    startSession();

    expect(screen.getByText(/^Score:/)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Iniciar Trivia" }),
    ).not.toBeInTheDocument();
  });

  test("auto-downshifts difficulty after 3 wrong answers and logs cause", () => {
    renderView();
    startSession();

    for (let index = 0; index < 3; index += 1) {
      answerCurrentQuestion(false);
    }

    expect(toastMock.info).toHaveBeenCalled();

    const rawLog = localStorage.getItem(ADAPTIVE_DIFFICULTY_LOG_KEY);
    expect(rawLog).toBeTruthy();
    const log = JSON.parse(rawLog || "[]");
    expect(log.length).toBeGreaterThan(0);
    expect(log[log.length - 1]).toMatchObject({
      gameId: "tech_trivia",
      previousLevel: "normal",
      nextLevel: "easy",
      reason: "rule_downshift",
      trigger: "consecutive_wrong",
      changed: true,
    });
  });

  test("auto-upshifts difficulty after 3 correct answers and logs cause", () => {
    renderView();

    fireEvent.click(screen.getByRole("button", { name: /Facil \(4 vidas\)/i }));
    startSession();

    for (let index = 0; index < 3; index += 1) {
      answerCurrentQuestion(true);
    }

    expect(toastMock.success).toHaveBeenCalled();

    const rawLog = localStorage.getItem(ADAPTIVE_DIFFICULTY_LOG_KEY);
    expect(rawLog).toBeTruthy();
    const log = JSON.parse(rawLog || "[]");
    expect(log.length).toBeGreaterThan(0);
    expect(log[log.length - 1]).toMatchObject({
      gameId: "tech_trivia",
      previousLevel: "easy",
      nextLevel: "normal",
      reason: "rule_upshift",
      trigger: "consecutive_correct",
      changed: true,
    });
  });
});
