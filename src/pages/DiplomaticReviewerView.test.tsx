import React from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import DiplomaticReviewerView from "@/pages/DiplomaticReviewerView";
import { diplomaticRounds } from "@/features/data/diplomaticData";

describe("DiplomaticReviewerView", () => {
  const startGame = () => {
    fireEvent.click(screen.getByRole("button", { name: /Iniciar Revisi/i }));
  };

  beforeEach(() => {
    vi.spyOn(Math, "random").mockReturnValue(0.9999999);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("renders title and default timer", () => {
    render(<DiplomaticReviewerView />);
    startGame();

    expect(screen.getByText("Diplomatic Reviewer")).toBeInTheDocument();
    expect(screen.getByText("45s")).toBeInTheDocument();
  });

  test("submits an option and shows round feedback", () => {
    render(<DiplomaticReviewerView />);
    startGame();

    const wrongOption = diplomaticRounds[0].options.find(
      (option) => !option.isCorrect,
    );
    expect(wrongOption).toBeDefined();

    fireEvent.click(screen.getByRole("button", { name: wrongOption!.text }));

    expect(
      screen.getByText(/(Excelente diplomacia|Cuidado|Tiempo agotado)/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Siguiente Situaci/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Score total:/)).toHaveTextContent(/\d+/);
  });
});
