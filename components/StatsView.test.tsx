import React from "react";
import { describe, test, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import StatsView from "./StatsView";
import { getIsoWeekKey } from "../utils/srs";

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
    const nowIso = new Date().toISOString();
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    const fiveWeeksAgo = new Date();
    fiveWeeksAgo.setDate(fiveWeeksAgo.getDate() - 35);

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
    localStorage.setItem(
      "vocab-vault-weekly-activity",
      JSON.stringify({
        weekKey: getIsoWeekKey(new Date()),
        sessions: 3,
        attempts: 10,
        correct: 8,
        studyMinutes: 25,
      }),
    );
    localStorage.setItem(
      "vocab-vault-analytics-events",
      JSON.stringify([
        {
          name: "session_start",
          timestamp: nowIso,
          payload: { mode: "daily" },
        },
        {
          name: "session_start",
          timestamp: twoWeeksAgo.toISOString(),
          payload: { mode: "daily" },
        },
        {
          name: "speaking_used",
          timestamp: fiveWeeksAgo.toISOString(),
          payload: { source: "collection_audio" },
        },
      ]),
    );

    render(
      <MemoryRouter>
        <StatsView />
      </MemoryRouter>,
    );

    expect(screen.getByText("Total Cards")).toBeInTheDocument();
    expect(screen.getByText("Global Accuracy")).toBeInTheDocument();
    expect(screen.getByText("Weekly Summary")).toBeInTheDocument();
    expect(screen.getByText("Analytics (MVP)")).toBeInTheDocument();
    expect(screen.getByText("Suggested Focus")).toBeInTheDocument();
    expect(screen.getByText("Session Starts")).toBeInTheDocument();

    const sessionStartsCard = screen
      .getByText("Session Starts")
      .closest("article");
    expect(sessionStartsCard).toHaveTextContent("1");
    expect(sessionStartsCard).toHaveTextContent("vs prev: +1");

    fireEvent.click(screen.getByRole("button", { name: "Last 30 days" }));
    expect(sessionStartsCard).toHaveTextContent("2");
    expect(sessionStartsCard).toHaveTextContent("vs prev: +2");
    expect(screen.queryByText("No data yet")).not.toBeInTheDocument();
  });
});
