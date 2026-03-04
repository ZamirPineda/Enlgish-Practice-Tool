import React from "react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import ErrorHunterView from "@/pages/ErrorHunterView";
import { errorHunterRounds } from "@/features/data/errorHunter";
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

describe("ErrorHunterView", () => {
  const startGame = () => {
    fireEvent.click(screen.getByRole("button", { name: /Comenzar/i }));
  };

  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(Math, "random").mockReturnValue(0.9999999);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("renders title and default level timer", () => {
    render(<ErrorHunterView />);
    startGame();

    expect(screen.getByText("Error Hunter")).toBeInTheDocument();
    expect(screen.getByText("38s")).toBeInTheDocument();
  });

  test("switches to C1 level and updates timer", () => {
    render(<ErrorHunterView />);
    startGame();

    fireEvent.click(
      screen.getByRole("button", { name: "Set error hunter level C1" }),
    );

    expect(screen.getByText("28s")).toBeInTheDocument();
  });

  test("adds score after entering a correct correction", () => {
    render(<ErrorHunterView />);
    startGame();

    const b1Sentence = errorHunterRounds.find((round) => round.level === "B1");
    expect(b1Sentence).toBeDefined();

    fireEvent.change(screen.getByLabelText(/Tu correcci/i), {
      target: { value: b1Sentence!.correctedSentence },
    });

    fireEvent.click(screen.getByRole("button", { name: "Check correction" }));

    expect(screen.getByText(/Correcto/)).toBeInTheDocument();
    expect(screen.getByText(/Score total:/)).toHaveTextContent(/\d+/);
  });

  test("auto-downshifts difficulty after 3 consecutive errors and logs cause", () => {
    render(<ErrorHunterView />);
    startGame();

    fireEvent.click(
      screen.getByRole("button", { name: "Set error hunter level C1" }),
    );
    expect(screen.getByText("28s")).toBeInTheDocument();

    for (let index = 0; index < 3; index += 1) {
      fireEvent.change(screen.getByLabelText(/Tu correcci/i), {
        target: { value: "incorrect answer" },
      });
      fireEvent.click(screen.getByRole("button", { name: "Check correction" }));
      if (index < 2) {
        fireEvent.click(screen.getByRole("button", { name: "Next round" }));
      }
    }

    expect(screen.getByText("32s")).toBeInTheDocument();

    const rawLog = localStorage.getItem(ADAPTIVE_DIFFICULTY_LOG_KEY);
    expect(rawLog).toBeTruthy();
    const log = JSON.parse(rawLog || "[]");
    expect(log.length).toBeGreaterThan(0);
    expect(log[log.length - 1]).toMatchObject({
      gameId: "error_hunter",
      previousLevel: "C1",
      nextLevel: "B2",
      reason: "rule_downshift",
      trigger: "consecutive_wrong",
      changed: true,
    });
  });

  test("auto-upshifts difficulty after 3 consecutive correct answers and logs cause", () => {
    render(<ErrorHunterView />);
    startGame();

    fireEvent.click(
      screen.getByRole("button", { name: "Set error hunter level A2" }),
    );
    expect(screen.getByText("45s")).toBeInTheDocument();

    const a2Rounds = errorHunterRounds.filter((round) => round.level === "A2");
    expect(a2Rounds.length).toBeGreaterThanOrEqual(3);

    for (let index = 0; index < 3; index += 1) {
      fireEvent.change(screen.getByLabelText(/Tu correcci/i), {
        target: { value: a2Rounds[index].correctedSentence },
      });
      fireEvent.click(screen.getByRole("button", { name: "Check correction" }));
      if (index < 2) {
        fireEvent.click(screen.getByRole("button", { name: "Next round" }));
      }
    }

    expect(screen.getByText("38s")).toBeInTheDocument();

    const rawLog = localStorage.getItem(ADAPTIVE_DIFFICULTY_LOG_KEY);
    expect(rawLog).toBeTruthy();
    const log = JSON.parse(rawLog || "[]");
    expect(log.length).toBeGreaterThan(0);
    expect(log[log.length - 1]).toMatchObject({
      gameId: "error_hunter",
      previousLevel: "A2",
      nextLevel: "B1",
      reason: "rule_upshift",
      trigger: "consecutive_correct",
      changed: true,
    });
  });
});
