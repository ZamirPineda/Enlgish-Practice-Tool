import React from "react";
import { describe, test, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import ErrorHunterView from "./ErrorHunterView";
import { errorHunterRounds } from "../data/errorHunter";

describe("ErrorHunterView", () => {
  test("renders title and default level timer", () => {
    render(<ErrorHunterView />);

    expect(screen.getByText("Error Hunter")).toBeInTheDocument();
    expect(screen.getByText(/⏱\s38s/)).toBeInTheDocument();
  });

  test("switches to C1 level and updates timer", () => {
    render(<ErrorHunterView />);

    fireEvent.click(
      screen.getByRole("button", { name: "Set error hunter level C1" }),
    );

    expect(screen.getByText(/⏱\s28s/)).toBeInTheDocument();
  });

  test("adds score after entering a correct correction", () => {
    render(<ErrorHunterView />);

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
