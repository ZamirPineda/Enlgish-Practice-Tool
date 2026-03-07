import React from "react";
import { act } from "react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import MathGameView from "@/pages/MathGameView";
import { ADAPTIVE_DIFFICULTY_LOG_KEY } from "@/lib/adaptiveDifficulty";
import {
  getMathPracticeQuestionBank,
  MathAdaptiveLevel,
  MathPracticeQuestion,
} from "@/lib/mathPracticeBank";

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
  const normalizeText = (value: string | null | undefined) =>
    (value || "").replace(/\s+/g, " ").trim();

  const startGame = () => {
    fireEvent.click(screen.getByRole("button", { name: "Iniciar juego" }));
  };

  const getAnswerButtons = () =>
    screen
      .getAllByRole("button")
      .filter((button) => button.className.includes("min-h-[64px]"));

  const getCurrentQuestion = (
    level: MathAdaptiveLevel,
  ): MathPracticeQuestion => {
    const headingText = normalizeText(
      screen.getByRole("heading", { level: 4 }).textContent,
    );
    const topicText = normalizeText(screen.getByText(/Tema:/).textContent);
    const sectionText = normalizeText(screen.getByText(/Secci.n:/).textContent);
    const bodyText = normalizeText(document.body.textContent);

    const matches = getMathPracticeQuestionBank(level).filter((question) => {
      if (normalizeText(question.prompt) !== headingText) return false;
      if (!topicText.includes(normalizeText(question.topicLabel))) return false;
      if (!sectionText.includes(normalizeText(question.sectionLabel))) {
        return false;
      }
      if (
        question.referenceLabel &&
        question.referenceValue &&
        !bodyText.includes(
          normalizeText(`${question.referenceLabel}: ${question.referenceValue}`),
        )
      ) {
        return false;
      }
      if (
        question.expression &&
        !bodyText.includes(normalizeText(question.expression))
      ) {
        return false;
      }
      return true;
    });

    expect(matches.length).toBeGreaterThan(0);
    return matches[0];
  };

  const answerByOptionIndex = (index: number) => {
    const answerButtons = getAnswerButtons();
    expect(answerButtons.length).toBeGreaterThan(index);
    fireEvent.click(answerButtons[index]);
    act(() => {
      vi.advanceTimersByTime(700);
    });
  };

  const answerCorrectly = (level: MathAdaptiveLevel) => {
    const currentQuestion = getCurrentQuestion(level);
    const correctIndex = currentQuestion.options.findIndex(
      (option) => option === currentQuestion.correctAnswer,
    );
    expect(correctIndex).toBeGreaterThanOrEqual(0);
    answerByOptionIndex(correctIndex);
  };

  const answerIncorrectly = (level: MathAdaptiveLevel) => {
    const currentQuestion = getCurrentQuestion(level);
    const wrongIndex = currentQuestion.options.findIndex(
      (option) => option !== currentQuestion.correctAnswer,
    );
    expect(wrongIndex).toBeGreaterThanOrEqual(0);
    answerByOptionIndex(wrongIndex);
  };

  beforeEach(() => {
    localStorage.clear();
    toastMock.success.mockReset();
    toastMock.info.mockReset();
    toastMock.error.mockReset();
    vi.useFakeTimers();
    vi.spyOn(Math, "random").mockReturnValue(0.9999999);
    window.katex = {
      render: vi.fn((formula: string, element: HTMLElement) => {
        element.textContent = formula;
      }),
    };
  });

  afterEach(() => {
    act(() => {
      vi.runOnlyPendingTimers();
    });
    vi.useRealTimers();
    vi.restoreAllMocks();
    delete window.katex;
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
      answerIncorrectly("hard");
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
      answerCorrectly("easy");
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
