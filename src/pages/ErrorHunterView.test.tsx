import React from "react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import ErrorHunterView from "@/pages/ErrorHunterView";
import { errorHunterRounds } from "@/features/data/errorHunter";

describe("ErrorHunterView", () => {
  const startGame = () => {
    fireEvent.click(screen.getByRole("button", { name: /Comenzar/i }));
  };

  beforeEach(() => {
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

    fireEvent.change(screen.getByLabelText("Tu corrección"), {
      target: { value: b1Sentence!.correctedSentence },
    });

    fireEvent.click(screen.getByRole("button", { name: "Check correction" }));

    expect(screen.getByText(/Correcto/)).toBeInTheDocument();
    expect(screen.getByText(/Score total:/)).toHaveTextContent(/\d+/);
  });
});
