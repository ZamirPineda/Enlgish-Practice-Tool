import React from "react";
import { act } from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { TechBossView } from "@/pages/tech-games/TechBossView";
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

describe("TechBossView", () => {
  const deckId = techDecks[0].id;

  const renderView = () => {
    render(
      <MemoryRouter initialEntries={[`/tech-games/boss/${deckId}`]}>
        <Routes>
          <Route path="/tech-games/boss/:deckId" element={<TechBossView />} />
        </Routes>
      </MemoryRouter>,
    );
  };

  const startSession = () => {
    fireEvent.click(screen.getByRole("button", { name: "Iniciar Boss" }));
  };

  const answerCurrentQuestion = (correct: boolean) => {
    fireEvent.click(screen.getByRole("button", { name: correct ? "VERDADERO" : "FALSO" }));
    act(() => {
      vi.advanceTimersByTime(2100);
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

  test("renders setup and starts boss challenge", () => {
    renderView();
    startSession();
    expect(screen.getByText(/Bug Hunter/)).toBeInTheDocument();
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
      gameId: "tech_boss",
      previousLevel: "normal",
      nextLevel: "easy",
      reason: "rule_downshift",
      trigger: "consecutive_wrong",
      changed: true,
    });
  });

  test("auto-upshifts difficulty after 3 correct answers and logs cause", () => {
    renderView();

    fireEvent.click(screen.getByRole("button", { name: /Facil \(8\)/i }));
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
      gameId: "tech_boss",
      previousLevel: "easy",
      nextLevel: "normal",
      reason: "rule_upshift",
      trigger: "consecutive_correct",
      changed: true,
    });
  });
});
