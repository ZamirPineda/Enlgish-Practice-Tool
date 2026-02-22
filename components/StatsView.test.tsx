import React from "react";
import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import StatsView from "./StatsView";

describe("StatsView", () => {
  test("shows empty state when there are no cards", () => {
    render(
      <MemoryRouter>
        <StatsView />
      </MemoryRouter>,
    );

    expect(screen.getByText("No data yet")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Start first session" }),
    ).toHaveAttribute("href", "/vault");
  });

  test("shows metrics when deck has cards", () => {
    localStorage.setItem(
      "vocab-vault-deck",
      JSON.stringify({
        hello: {
          word: "hello",
          definition: "a greeting",
          repetition: 1,
          efactor: 2.5,
          interval: 1,
          nextReviewDate: "2099-01-01",
          status: "learning",
        },
      }),
    );

    render(
      <MemoryRouter>
        <StatsView />
      </MemoryRouter>,
    );

    expect(screen.getByText("Total Cards")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("Global Accuracy")).toBeInTheDocument();
    expect(screen.queryByText("No data yet")).not.toBeInTheDocument();
  });
});
