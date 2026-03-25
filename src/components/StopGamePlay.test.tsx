import React from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { StopGamePlay } from "@/components/StopGamePlay";
import { ADAPTIVE_DIFFICULTY_LOG_KEY } from "@/lib/adaptiveDifficulty";
import { stopGameData } from "@/features/data/stopGameData";
import { NORMAL_CATEGORIES, PREDEFINED_ALL_ORDER } from "@/lib/stopGameHelpers";

const { toastMock, speechMock } = vi.hoisted(() => ({
  toastMock: {
    success: vi.fn(),
    info: vi.fn(),
    error: vi.fn(),
  },
  speechMock: {
    startListening: vi.fn(),
    stopListening: vi.fn(),
    abortListening: vi.fn(),
    resetTranscript: vi.fn(),
  },
}));

vi.mock("@/components/ui/Toast", () => ({
  toast: toastMock,
}));

vi.mock("@/hooks/useSpeechRecognition", () => ({
  useSpeechRecognition: () => ({
    micState: "idle",
    startListening: speechMock.startListening,
    stopListening: speechMock.stopListening,
    abortListening: speechMock.abortListening,
    interimTranscript: "",
    finalTranscript: "",
    resetTranscript: speechMock.resetTranscript,
  }),
}));

vi.mock("@/components/visual/AmbientOrbScene", () => ({
  default: () => <div data-testid="ambient-orb-scene" />,
}));

vi.mock("@/components/visual/InsightPanel", () => ({
  default: ({ title }: { title?: string }) => (
    <div>{title || "InsightPanel"}</div>
  ),
}));

vi.mock("@/components/visual/TimePressureScene", () => ({
  default: () => <div data-testid="time-pressure-scene" />,
}));

vi.mock("@/components/visual/AnswerFeedback", () => ({
  default: () => <div data-testid="answer-feedback" />,
}));

vi.mock("@/components/stop/StopFeedbackStage", () => ({
  default: () => <div data-testid="stop-feedback-stage" />,
}));

vi.mock("@/components/stop/StopStreakCelebration", () => ({
  default: () => <div data-testid="stop-streak-celebration" />,
}));

vi.mock("@/components/stop/StopSessionSummary", () => ({
  default: () => <div data-testid="stop-session-summary" />,
}));

vi.mock("@/components/game/StopCategorySpotlight", () => ({
  StopCategorySpotlight: () => <div data-testid="stop-category-spotlight" />,
  supportsStopCategorySpotlight: () => false,
}));

describe("StopGamePlay", () => {
  const getFirstPlayableCombo = (minimumWords = 1) => {
    for (const letter of "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")) {
      const dataForLetter = stopGameData[letter];
      if (!dataForLetter) continue;

      for (const category of PREDEFINED_ALL_ORDER.filter((entry) =>
        NORMAL_CATEGORIES.includes(entry),
      )) {
        const words = dataForLetter[category];
        if (words && words.length >= minimumWords) {
          return { letter, category, words };
        }
      }
    }

    throw new Error("No playable STOP combo found for tests.");
  };

  beforeEach(() => {
    localStorage.clear();
    toastMock.success.mockReset();
    toastMock.info.mockReset();
    toastMock.error.mockReset();
    speechMock.startListening.mockReset();
    speechMock.stopListening.mockReset();
    speechMock.abortListening.mockReset();
    speechMock.resetTranscript.mockReset();
    vi.spyOn(Math, "random").mockReturnValue(0.9999999);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("auto-downshifts category difficulty after 3 consecutive errors and logs cause", () => {
    render(<StopGamePlay onPlayWord={vi.fn()} onAddToVault={vi.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: "Hard" }));
    fireEvent.click(screen.getByRole("button", { name: "Start Game" }));

    for (let index = 0; index < 3; index += 1) {
      fireEvent.change(
        screen.getByPlaceholderText(/Type or speak your answer/i),
        {
          target: { value: "notavalidwordxyz" },
        },
      );
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));
      if (index < 2) {
        fireEvent.click(screen.getByRole("button", { name: "Continue" }));
      }
    }

    expect(toastMock.info).toHaveBeenCalled();

    const rawLog = localStorage.getItem(ADAPTIVE_DIFFICULTY_LOG_KEY);
    expect(rawLog).toBeTruthy();
    const log = JSON.parse(rawLog || "[]");
    expect(log.length).toBeGreaterThan(0);
    expect(log[log.length - 1]).toMatchObject({
      gameId: "stop_game",
      previousLevel: "Hard",
      nextLevel: "Normal",
      reason: "rule_downshift",
      trigger: "consecutive_wrong",
      changed: true,
    });
  });

  test("auto-advances after a normal success using the longer feedback window", () => {
    vi.useFakeTimers();
    vi.spyOn(Math, "random").mockReturnValue(0);
    const combo = getFirstPlayableCombo();

    render(<StopGamePlay onPlayWord={vi.fn()} onAddToVault={vi.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: "Start Game" }));
    fireEvent.change(
      screen.getByPlaceholderText(/Type or speak your answer/i),
      {
        target: { value: combo.words[0].word },
      },
    );
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Continue" }),
    ).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2499);
    });

    expect(screen.getByText(/Correct!/i)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(screen.queryByText(/Correct!/i)).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  test("shows recommended alternatives when the answer was already used for the same letter and category", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const combo = getFirstPlayableCombo(3);
    const repeatedWord = combo.words[0].word;
    const expectedSuggestion = combo.words[1].word;
    const comboKey = `${combo.letter}::${combo.category.toLowerCase()}`;

    localStorage.setItem(
      "stop-game-used-answers",
      JSON.stringify({
        [comboKey]: {
          [repeatedWord.toLowerCase()]: 1,
        },
      }),
    );

    const onAddToVault = vi.fn();

    render(<StopGamePlay onPlayWord={vi.fn()} onAddToVault={onAddToVault} />);

    fireEvent.click(screen.getByRole("button", { name: "Start Game" }));
    fireEvent.change(
      screen.getByPlaceholderText(/Type or speak your answer/i),
      {
        target: { value: repeatedWord },
      },
    );
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(screen.getByText(/already in your history/i)).toBeInTheDocument();
    expect(screen.getByText("Recommended Alternatives")).toBeInTheDocument();
    expect(screen.getAllByText(expectedSuggestion).length).toBeGreaterThan(0);
    expect(
      screen.getByRole("button", { name: "Continue" }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole("button", { name: "Save" })[0]);

    expect(onAddToVault).toHaveBeenCalled();
  });
});
