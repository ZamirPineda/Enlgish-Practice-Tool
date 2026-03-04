import React from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import CodeBugHunterView from "@/pages/CodeBugHunterView";
import { codeBugsData } from "@/features/data/codeBugsData";

describe("CodeBugHunterView", () => {
  const startGame = () => {
    fireEvent.click(screen.getByRole("button", { name: /Comenzar Caza/i }));
  };

  beforeEach(() => {
    vi.spyOn(Math, "random").mockReturnValue(0.9999999);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("renders title and default timer", () => {
    render(<CodeBugHunterView />);
    startGame();

    expect(screen.getByText("Code Bug Hunter")).toBeInTheDocument();
    expect(screen.getByText("30s")).toBeInTheDocument();
  });

  test("submits a round after selecting a line", () => {
    render(<CodeBugHunterView />);
    startGame();

    const firstRound = codeBugsData[0];
    const selectableLine =
      firstRound.codeLines.find((line) => line.trim().length > 0) ??
      firstRound.codeLines[0];

    fireEvent.click(screen.getAllByText(selectableLine)[0]);

    expect(screen.getByText(/(Bingo|Incorrecto)/i)).toBeInTheDocument();
    expect(screen.getByText(/Score total:/)).toHaveTextContent(/\d+/);
  });
});
