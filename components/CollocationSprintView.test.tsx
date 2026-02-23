import React from "react";
import { describe, test, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import CollocationSprintView from "./CollocationSprintView";

describe("CollocationSprintView", () => {
  test("renders title and default timer", () => {
    render(<CollocationSprintView />);

    expect(screen.getByText("Collocation Sprint")).toBeInTheDocument();
    expect(screen.getByText(/⏱\s34s/)).toBeInTheDocument();
  });

  test("validates correct pair", () => {
    render(<CollocationSprintView />);

    fireEvent.click(screen.getByRole("button", { name: "take" }));
    fireEvent.click(screen.getByRole("button", { name: "responsibility" }));
    fireEvent.click(screen.getByRole("button", { name: "Check pair" }));

    expect(screen.getByText(/Correct collocation/)).toBeInTheDocument();
  });
});
