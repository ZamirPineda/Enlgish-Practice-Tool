import React from "react";
import { act } from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CodeSyntaxBuilderView from "@/pages/CodeSyntaxBuilderView";
import { codeSyntaxData } from "@/features/data/codeSyntaxData";
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

describe("CodeSyntaxBuilderView", () => {
  const renderView = (entries = ["/dev"]) =>
    render(
      <MemoryRouter initialEntries={entries}>
        <CodeSyntaxBuilderView />
      </MemoryRouter>,
    );

  const startGame = () => {
    fireEvent.click(screen.getByRole("button", { name: /Empezar Build/i }));
  };

  const getCurrentRound = () => {
    const currentRound = codeSyntaxData.find(
      (round) => screen.queryByText(round.prompt) !== null,
    );
    expect(currentRound).toBeDefined();
    return currentRound!;
  };

  const clickAvailableToken = (token: string) => {
    const title = screen.getByText("Bloques disponibles");
    const container = title.nextElementSibling as HTMLElement | null;
    expect(container).toBeTruthy();
    const tokenButton = within(container!).getAllByRole("button", { name: token })[0];
    fireEvent.click(tokenButton);
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

  test("renders title and default timer", () => {
    renderView();
    startGame();

    expect(screen.getByText("Code Syntax Builder")).toBeInTheDocument();
    expect(screen.getByText("45s")).toBeInTheDocument();
  });

  test("auto-downshifts difficulty after 3 timeouts and logs cause", () => {
    renderView();
    startGame();

    fireEvent.click(
      screen.getByRole("button", { name: "Set code syntax level Hard" }),
    );
    expect(screen.getByText("35s")).toBeInTheDocument();

    for (let index = 0; index < 3; index += 1) {
      act(() => {
        vi.advanceTimersByTime(36000);
      });

      if (index < 2) {
        fireEvent.click(screen.getByRole("button", { name: "Siguiente" }));
      }
    }

    expect(screen.getByText("45s")).toBeInTheDocument();
    expect(toastMock.info).toHaveBeenCalled();

    const rawLog = localStorage.getItem(ADAPTIVE_DIFFICULTY_LOG_KEY);
    expect(rawLog).toBeTruthy();
    const log = JSON.parse(rawLog || "[]");
    expect(log.length).toBeGreaterThan(0);
    expect(log[log.length - 1]).toMatchObject({
      gameId: "code_syntax_builder",
      previousLevel: "hard",
      nextLevel: "normal",
      reason: "rule_downshift",
      trigger: "consecutive_wrong",
      changed: true,
    });
  });

  test("auto-upshifts difficulty after 3 correct rounds and logs cause", () => {
    renderView();
    startGame();

    fireEvent.click(
      screen.getByRole("button", { name: "Set code syntax level Easy" }),
    );
    expect(screen.getByText("60s")).toBeInTheDocument();

    for (let index = 0; index < 3; index += 1) {
      const round = getCurrentRound();
      for (const token of round.tokens) {
        clickAvailableToken(token);
      }

      fireEvent.click(screen.getByRole("button", { name: /Compilar \/ Run/i }));
      if (index < 2) {
        fireEvent.click(screen.getByRole("button", { name: "Siguiente" }));
      }
    }

    expect(toastMock.success).toHaveBeenCalled();

    const rawLog = localStorage.getItem(ADAPTIVE_DIFFICULTY_LOG_KEY);
    expect(rawLog).toBeTruthy();
    const log = JSON.parse(rawLog || "[]");
    expect(log.length).toBeGreaterThan(0);
    expect(log[log.length - 1]).toMatchObject({
      gameId: "code_syntax_builder",
      previousLevel: "easy",
      nextLevel: "normal",
      reason: "rule_upshift",
      trigger: "consecutive_correct",
      changed: true,
    });
  });
});
