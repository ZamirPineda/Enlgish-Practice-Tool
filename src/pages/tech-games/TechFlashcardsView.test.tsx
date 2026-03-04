import React from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { TechFlashcardsView } from "@/pages/tech-games/TechFlashcardsView";
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

describe("TechFlashcardsView", () => {
  const deckId = techDecks[0].id;

  const renderView = () => {
    render(
      <MemoryRouter initialEntries={[`/tech-games/flashcards/${deckId}`]}>
        <Routes>
          <Route
            path="/tech-games/flashcards/:deckId"
            element={<TechFlashcardsView />}
          />
        </Routes>
      </MemoryRouter>,
    );
  };

  const startSession = () => {
    fireEvent.click(screen.getByRole("button", { name: "Iniciar Flashcards" }));
  };

  const answerCurrentCard = (correct: boolean) => {
    fireEvent.click(screen.getByText("Toca para revelar la respuesta"));
    fireEvent.click(
      screen.getByRole("button", {
        name: correct ? "Lo domine" : "No lo sabia",
      }),
    );
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

  test("renders setup and starts flashcards session", () => {
    renderView();
    startSession();

    expect(screen.getByText(/Pregunta 1 de/)).toBeInTheDocument();
  });

  test("auto-downshifts difficulty after 3 wrong answers and logs cause", () => {
    renderView();
    startSession();

    for (let index = 0; index < 3; index += 1) {
      answerCurrentCard(false);
    }

    expect(toastMock.info).toHaveBeenCalled();

    const rawLog = localStorage.getItem(ADAPTIVE_DIFFICULTY_LOG_KEY);
    expect(rawLog).toBeTruthy();
    const log = JSON.parse(rawLog || "[]");
    expect(log.length).toBeGreaterThan(0);
    expect(log[log.length - 1]).toMatchObject({
      gameId: "tech_flashcards",
      previousLevel: "normal",
      nextLevel: "easy",
      reason: "rule_downshift",
      trigger: "consecutive_wrong",
      changed: true,
    });
  });

  test("auto-upshifts difficulty after 3 correct answers and logs cause", () => {
    renderView();

    fireEvent.click(screen.getAllByRole("button", { name: "Facil" })[0]);
    startSession();

    for (let index = 0; index < 3; index += 1) {
      answerCurrentCard(true);
    }

    expect(toastMock.success).toHaveBeenCalled();

    const rawLog = localStorage.getItem(ADAPTIVE_DIFFICULTY_LOG_KEY);
    expect(rawLog).toBeTruthy();
    const log = JSON.parse(rawLog || "[]");
    expect(log.length).toBeGreaterThan(0);
    expect(log[log.length - 1]).toMatchObject({
      gameId: "tech_flashcards",
      previousLevel: "easy",
      nextLevel: "normal",
      reason: "rule_upshift",
      trigger: "consecutive_correct",
      changed: true,
    });
  });
});
