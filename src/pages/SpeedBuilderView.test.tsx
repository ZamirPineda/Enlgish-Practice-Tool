import React from "react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import SpeedBuilderView from "@/pages/SpeedBuilderView";
import { speedBuilderRounds } from "@/features/data/speedBuilder";

describe("SpeedBuilderView", () => {
  const startGame = () => {
    fireEvent.click(
      screen.getByRole("button", { name: "Iniciar Speed Builder" }),
    );
  };

  beforeEach(() => {
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
});
