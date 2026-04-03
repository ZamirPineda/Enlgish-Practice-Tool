import React from "react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import StudyDocsQuizView from "@/pages/StudyDocsQuizView";
import { docsQuizQuestions } from "@/features/data/docs_quiz";
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

describe("StudyDocsQuizView", () => {
  const renderView = (entries = ["/docs?mode=quiz"]) =>
    render(
      <MemoryRouter initialEntries={entries}>
        <StudyDocsQuizView />
      </MemoryRouter>,
    );

  const startGame = () => {
    fireEvent.click(screen.getByRole("button", { name: "Iniciar Quiz" }));
  };

  const getCurrentQuestion = () => {
    const question = docsQuizQuestions.find(
      (item) => screen.queryByText(item.question) !== null,
    );
    expect(question).toBeDefined();
    return question!;
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

  test("renders start panel and enters playing state", () => {
    renderView();

    expect(screen.getByText("Tech Interview Quiz")).toBeInTheDocument();
    startGame();

    expect(screen.getByText(/Preguntas restantes:/)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Iniciar Quiz" }),
    ).not.toBeInTheDocument();
  });

  test("auto-downshifts difficulty after 3 wrong answers and logs cause", () => {
    renderView();

    fireEvent.click(screen.getAllByRole("button", { name: "Hard" })[0]);
    startGame();

    for (let index = 0; index < 3; index += 1) {
      const question = getCurrentQuestion();
      const wrongOption =
        question.options.find((option) => option !== question.correctAnswer) ||
        question.options[0];
      fireEvent.click(screen.getByRole("button", { name: wrongOption }));
      fireEvent.click(screen.getByRole("button", { name: "Continuar" }));
    }

    expect(toastMock.info).toHaveBeenCalled();

    const rawLog = localStorage.getItem(ADAPTIVE_DIFFICULTY_LOG_KEY);
    expect(rawLog).toBeTruthy();
    const log = JSON.parse(rawLog || "[]");
    expect(log.length).toBeGreaterThan(0);
    expect(log[log.length - 1]).toMatchObject({
      gameId: "docs_quiz",
      previousLevel: "hard",
      nextLevel: "normal",
      reason: "rule_downshift",
      trigger: "consecutive_wrong",
      changed: true,
    });
  });

  test("auto-upshifts difficulty after 3 correct answers and logs cause", () => {
    renderView();

    fireEvent.click(screen.getAllByRole("button", { name: "Easy" })[0]);
    startGame();

    for (let index = 0; index < 3; index += 1) {
      const question = getCurrentQuestion();
      fireEvent.click(
        screen.getByRole("button", { name: question.correctAnswer }),
      );
      if (index < 2) {
        fireEvent.click(screen.getByRole("button", { name: "Continuar" }));
      }
    }

    expect(toastMock.success).toHaveBeenCalled();

    const rawLog = localStorage.getItem(ADAPTIVE_DIFFICULTY_LOG_KEY);
    expect(rawLog).toBeTruthy();
    const log = JSON.parse(rawLog || "[]");
    expect(log.length).toBeGreaterThan(0);
    expect(log[log.length - 1]).toMatchObject({
      gameId: "docs_quiz",
      previousLevel: "easy",
      nextLevel: "normal",
      reason: "rule_upshift",
      trigger: "consecutive_correct",
      changed: true,
    });
  });
});
