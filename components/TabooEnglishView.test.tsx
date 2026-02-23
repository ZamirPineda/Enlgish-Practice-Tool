import React from "react";
import { describe, test, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import TabooEnglishView from "./TabooEnglishView";

describe("TabooEnglishView", () => {
  test("renders title and forbidden words section", () => {
    render(<TabooEnglishView />);

    expect(screen.getByText("Taboo English")).toBeInTheDocument();
    expect(screen.getByText("Forbidden words")).toBeInTheDocument();
  });

  test("flags forbidden word usage", () => {
    render(<TabooEnglishView />);

    fireEvent.change(screen.getByLabelText("Taboo explanation"), {
      target: { value: "You need to finish this task before the time limit" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Check clue" }));

    expect(screen.getByText(/Forbidden used:/)).toBeInTheDocument();
  });
});
