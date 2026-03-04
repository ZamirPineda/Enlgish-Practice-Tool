import React from "react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import SpeedBuilderView from "@/pages/SpeedBuilderView";
import { speedBuilderRounds } from "@/features/data/speedBuilder";
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

describe("SpeedBuilderView", () => {
  const startGame = () => {
    fireEvent.click(
      screen.getByRole("button", { name: "Iniciar Speed Builder" }),
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

  test("renders title and first round counter", () => {
    render(<SpeedBuilderView />);
    startGame();

    expect(screen.getByText("Speed Builder")).toBeInTheDocument();
    expect(screen.getByText(/Ronda 1/)).toBeInTheDocument();
    expect(screen.getByText("55s")).toBeInTheDocument();
  });

  test("switches to B2 level with lower timer and no beginner hint", () => {
    render(<SpeedBuilderView />);
    startGame();

    fireEvent.click(screen.getByRole("button", { name: "Set level B2" }));

    expect(screen.getByText("35s")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Show hint" }),
    ).not.toBeInTheDocument();
  });

  test("allows selecting and clearing words", () => {
    render(<SpeedBuilderView />);
    startGame();

    const sentence = speedBuilderRounds.find(
      (round) => round.level === "A2",
    )?.sentence;
    expect(sentence).toBeDefined();
    const [firstWord, secondWord] = sentence!.split(" ");

    fireEvent.click(screen.getByRole("button", { name: firstWord }));
    fireEvent.click(screen.getByRole("button", { name: secondWord }));

    expect(
      screen.queryByText("Selecciona palabras para construir la frase."),
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Clear" }));

    expect(
      screen.getByText("Selecciona palabras para construir la frase."),
    ).toBeInTheDocument();
  });

  test("adds score after a correct answer", () => {
    render(<SpeedBuilderView />);
    startGame();

    const a2Sentence = speedBuilderRounds.find(
      (round) => round.level === "A2",
    )?.sentence;
    expect(a2Sentence).toBeDefined();
    const firstSentenceWords = a2Sentence!.split(" ");

    for (const word of firstSentenceWords) {
      fireEvent.click(screen.getByRole("button", { name: word }));
    }

    fireEvent.click(screen.getByRole("button", { name: "Check answer" }));

    expect(screen.getByText(/Correcto/)).toBeInTheDocument();
    expect(screen.getByText(/Score total:/)).toHaveTextContent(/\d+/);
  });

  test("shows optional hint in easy mode", () => {
    render(<SpeedBuilderView />);
    startGame();

    fireEvent.click(screen.getByRole("button", { name: "Show hint" }));

    expect(screen.getByText(/Hint:/)).toBeInTheDocument();
  });

  test("auto-downshifts difficulty after 3 consecutive errors and logs cause", () => {
    render(<SpeedBuilderView />);
    startGame();

    fireEvent.click(screen.getByRole("button", { name: "Set level C1" }));
    expect(screen.getByText("30s")).toBeInTheDocument();

    const c1Rounds = speedBuilderRounds.filter((round) => round.level === "C1");
    expect(c1Rounds.length).toBeGreaterThanOrEqual(3);

    for (let index = 0; index < 3; index += 1) {
      const firstWord = c1Rounds[index].sentence.split(" ")[0];
      fireEvent.click(screen.getByRole("button", { name: firstWord }));
      fireEvent.click(screen.getByRole("button", { name: "Check answer" }));
      if (index < 2) {
        fireEvent.click(screen.getByRole("button", { name: "Next round" }));
      }
    }

    expect(screen.getByText("35s")).toBeInTheDocument();
    expect(toastMock.info).toHaveBeenCalled();

    const rawLog = localStorage.getItem(ADAPTIVE_DIFFICULTY_LOG_KEY);
    expect(rawLog).toBeTruthy();
    const log = JSON.parse(rawLog || "[]");
    expect(log.length).toBeGreaterThan(0);
    expect(log[log.length - 1]).toMatchObject({
      gameId: "speed_builder",
      previousLevel: "C1",
      nextLevel: "B2",
      reason: "rule_downshift",
      trigger: "consecutive_wrong",
      changed: true,
    });
  });
});
