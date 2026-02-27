import React from "react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import CollocationSprintView from "./CollocationSprintView";

describe("CollocationSprintView", () => {
  beforeEach(() => {
    vi.spyOn(Math, "random").mockReturnValue(0.9999999);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("renders title and default timer", () => {
    render(<CollocationSprintView />);

    expect(screen.getByText("Collocation Sprint")).toBeInTheDocument();
    expect(screen.getByText("34s")).toBeInTheDocument();
  });

  test("validates correct pair", () => {
    render(<CollocationSprintView />);

    fireEvent.click(screen.getByRole("button", { name: "take" }));
    fireEvent.click(screen.getByRole("button", { name: "responsibility" }));
    fireEvent.click(screen.getByRole("button", { name: "Check pair" }));

    expect(screen.getByText(/Correct collocation/)).toBeInTheDocument();
  });
});
