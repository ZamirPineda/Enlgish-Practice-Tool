import React from "react";
import { act } from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CodeBugHunterView from "@/pages/CodeBugHunterView";
import { codeBugsData } from "@/features/data/codeBugsData";
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

describe("CodeBugHunterView", () => {
  const renderView = (entries = ["/dev"]) =>
    render(
      <MemoryRouter initialEntries={entries}>
        <CodeBugHunterView />
      </MemoryRouter>,
    );

  const startGame = () => {
    fireEvent.click(screen.getByRole("button", { name: /Comenzar Caza/i }));
  };

  const findCurrentRound = () => {
    const visibleRound = codeBugsData.find((round) =>
      round.codeLines
        .filter((line) => line.trim().length > 0)
        .every((line) => screen.queryAllByText(line).length > 0),
    );
    expect(visibleRound).toBeDefined();
    return visibleRound!;
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

    expect(screen.getByText("Code Bug Hunter")).toBeInTheDocument();
    expect(screen.getByText("30s")).toBeInTheDocument();
  });

  test("shows and dismisses the line selection coachmark", () => {
    const firstRender = renderView();
    startGame();

    expect(
      screen.getByRole("dialog", { name: "Marca la unica linea con bug" }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Entendido" }));

    firstRender.unmount();

    renderView();
    startGame();

    expect(
      screen.queryByRole("dialog", { name: "Marca la unica linea con bug" }),
    ).not.toBeInTheDocument();
  });

  test("auto-downshifts difficulty after 3 timeouts and logs cause", () => {
    renderView();
    startGame();

    fireEvent.click(
      screen.getByRole("button", { name: "Set code bug hunter level Hard" }),
    );
    expect(screen.getByText("24s")).toBeInTheDocument();

    for (let index = 0; index < 3; index += 1) {
      act(() => {
        vi.advanceTimersByTime(25000);
      });

      if (index < 2) {
        fireEvent.click(screen.getByRole("button", { name: "Siguiente Bug" }));
      }
    }

    expect(screen.getByText("30s")).toBeInTheDocument();
    expect(toastMock.info).toHaveBeenCalled();

    const rawLog = localStorage.getItem(ADAPTIVE_DIFFICULTY_LOG_KEY);
    expect(rawLog).toBeTruthy();
    const log = JSON.parse(rawLog || "[]");
    expect(log.length).toBeGreaterThan(0);
    expect(log[log.length - 1]).toMatchObject({
      gameId: "code_bug_hunter",
      previousLevel: "hard",
      nextLevel: "normal",
      reason: "rule_downshift",
      trigger: "consecutive_wrong",
      changed: true,
    });
  });

  test("auto-upshifts difficulty after 3 consecutive correct answers and logs cause", () => {
    renderView();
    startGame();

    fireEvent.click(
      screen.getByRole("button", { name: "Set code bug hunter level Easy" }),
    );
    expect(screen.getByText("40s")).toBeInTheDocument();

    for (let index = 0; index < 3; index += 1) {
      const round = findCurrentRound();
      const bugLine = round.codeLines[round.bugLineIndex];
      fireEvent.click(screen.getAllByText(bugLine)[0]);

      if (index < 2) {
        fireEvent.click(screen.getByRole("button", { name: "Siguiente Bug" }));
      }
    }

    expect(screen.getByText("30s")).toBeInTheDocument();
    expect(toastMock.success).toHaveBeenCalled();

    const rawLog = localStorage.getItem(ADAPTIVE_DIFFICULTY_LOG_KEY);
    expect(rawLog).toBeTruthy();
    const log = JSON.parse(rawLog || "[]");
    expect(log.length).toBeGreaterThan(0);
    expect(log[log.length - 1]).toMatchObject({
      gameId: "code_bug_hunter",
      previousLevel: "easy",
      nextLevel: "normal",
      reason: "rule_upshift",
      trigger: "consecutive_correct",
      changed: true,
    });
  });
});
