import React from "react";
import { beforeEach, afterEach, describe, test, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import ParaphraseDuelView from "@/pages/ParaphraseDuelView";
import { paraphraseDuelRounds } from "@/features/data/paraphraseDuel";
import { ADAPTIVE_DIFFICULTY_LOG_KEY } from "@/lib/adaptiveDifficulty";
import {
  clearAnalyticsEventsForTesting,
  getAnalyticsEvents,
} from "@/lib/analytics";

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

describe("ParaphraseDuelView", () => {
  const startGame = () => {
    fireEvent.click(screen.getByRole("button", { name: "Iniciar Duelo" }));
  };

  beforeEach(() => {
    localStorage.clear();
    clearAnalyticsEventsForTesting();
    toastMock.success.mockReset();
    toastMock.info.mockReset();
    toastMock.error.mockReset();
    vi.spyOn(Math, "random").mockReturnValue(0.9999999);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("renders title and default timer", () => {
    render(<ParaphraseDuelView />);
    startGame();

    expect(screen.getByText("Paraphrase Duel")).toBeInTheDocument();
    expect(screen.getByText("38s")).toBeInTheDocument();
  });

  test("accepts a correct paraphrase", () => {
    render(<ParaphraseDuelView />);
    startGame();

    const b1Round = paraphraseDuelRounds.find((round) => round.level === "B1");
    expect(b1Round).toBeDefined();

    fireEvent.change(screen.getByLabelText("Paraphrase answer"), {
      target: { value: b1Round!.acceptedAnswers[0] },
    });
    fireEvent.click(screen.getByRole("button", { name: "Check paraphrase" }));

    expect(screen.getByText(/Correct paraphrase/)).toBeInTheDocument();
  });

  test("accepts a close variant with connector", () => {
    render(<ParaphraseDuelView />);
    startGame();

    fireEvent.change(screen.getByLabelText("Paraphrase answer"), {
      target: {
        value: "Although he felt nervous he gave a clear presentation",
      },
    });
    fireEvent.click(screen.getByRole("button", { name: "Check paraphrase" }));

    expect(screen.getByText(/Correct paraphrase/)).toBeInTheDocument();
  });

  test("tracks connector_missing analytics reason", () => {
    render(<ParaphraseDuelView />);
    startGame();

    fireEvent.change(screen.getByLabelText("Paraphrase answer"), {
      target: { value: "He gave a clear presentation despite feeling nervous" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Check paraphrase" }));

    const events = getAnalyticsEvents();
    expect(events.at(-1)?.name).toBe("item_wrong");
    expect(events.at(-1)?.payload).toMatchObject({
      game: "paraphrase_duel",
      errorType: "connector_missing",
    });
  });

  test("auto-downshifts difficulty after 3 consecutive errors and logs cause", () => {
    render(<ParaphraseDuelView />);
    startGame();

    fireEvent.click(screen.getByRole("button", { name: "Set paraphrase level C1" }));
    expect(screen.getByText("28s")).toBeInTheDocument();

    for (let index = 0; index < 3; index += 1) {
      fireEvent.change(screen.getByLabelText("Paraphrase answer"), {
        target: { value: "wrong paraphrase attempt" },
      });
      fireEvent.click(screen.getByRole("button", { name: "Check paraphrase" }));
      if (index < 2) {
        fireEvent.click(screen.getByRole("button", { name: "Next round" }));
      }
    }

    expect(screen.getByText("32s")).toBeInTheDocument();
    expect(toastMock.info).toHaveBeenCalled();

    const rawLog = localStorage.getItem(ADAPTIVE_DIFFICULTY_LOG_KEY);
    expect(rawLog).toBeTruthy();
    const log = JSON.parse(rawLog || "[]");
    expect(log.length).toBeGreaterThan(0);
    expect(log[log.length - 1]).toMatchObject({
      gameId: "paraphrase_duel",
      previousLevel: "C1",
      nextLevel: "B2",
      reason: "rule_downshift",
      trigger: "consecutive_wrong",
      changed: true,
    });
  });
});
