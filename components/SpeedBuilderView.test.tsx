import React from "react";
import { describe, test, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import SpeedBuilderView from "./SpeedBuilderView";
import { speedBuilderRounds } from "../data/speedBuilder";

describe("SpeedBuilderView", () => {
  test("renders title and first round counter", () => {
    render(<SpeedBuilderView />);

    expect(screen.getByText("Speed Builder")).toBeInTheDocument();
    expect(screen.getByText(/Ronda 1/)).toBeInTheDocument();
    expect(screen.getByText(/⏱\s55s/)).toBeInTheDocument();
  });

  test("switches to medium mode with lower timer and no easy hint", () => {
    render(<SpeedBuilderView />);

    fireEvent.click(screen.getByRole("button", { name: "Set medium mode" }));

    expect(screen.getByText(/⏱\s35s/)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Show hint" }),
    ).not.toBeInTheDocument();
  });

  test("allows selecting and clearing words", () => {
    render(<SpeedBuilderView />);

    const availableWords = screen
      .getAllByRole("button")
      .filter((button) => button.className.includes("bg-surface-2"));

    fireEvent.click(availableWords[0]);
    fireEvent.click(availableWords[1]);

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

    const firstSentenceWords = speedBuilderRounds[0].sentence.split(" ");

    for (const word of firstSentenceWords) {
      fireEvent.click(screen.getByRole("button", { name: word }));
    }

    fireEvent.click(screen.getByRole("button", { name: "Check answer" }));

    expect(screen.getByText(/Correcto/)).toBeInTheDocument();
    expect(screen.getByText(/Score total:/)).toHaveTextContent(/\d+/);
  });

  test("shows optional hint in easy mode", () => {
    render(<SpeedBuilderView />);

    fireEvent.click(screen.getByRole("button", { name: "Show hint" }));

    expect(screen.getByText(/Hint:/)).toBeInTheDocument();
  });
});
