import React from "react";
import { describe, test, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import StatsView from "@/pages/StatsView";
import { getIsoWeekKey } from "@/lib/srs";

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
    const previousWeekDate = new Date();
    previousWeekDate.setDate(previousWeekDate.getDate() - 7);
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
        {
          name: "item_wrong",
          timestamp: nowIso,
          payload: {
            game: "paraphrase_duel",
            errorType: "connector_missing",
          },
        },
        {
          name: "item_wrong",
          timestamp: nowIso,
          payload: {
            game: "paraphrase_duel",
            errorType: "connector_missing",
          },
        },
        {
          name: "item_wrong",
          timestamp: nowIso,
          payload: {
            game: "sentence_transformer",
            errorType: "mode_mismatch",
          },
        },
        {
          name: "item_wrong",
          timestamp: previousWeekDate.toISOString(),
          payload: {
            game: "paraphrase_duel",
            errorType: "connector_missing",
          },
        },
        {
          name: "daily_loop_started",
          timestamp: nowIso,
          payload: {
            game: "daily_loop",
            focusRoute: "english_interview",
            totalSteps: 4,
          },
        },
        {
          name: "daily_loop_step_completed",
          timestamp: nowIso,
          payload: {
            game: "daily_loop",
            focusRoute: "english_interview",
            stepId: "step-1",
            completedSteps: 1,
            totalSteps: 4,
          },
        },
        {
          name: "daily_loop_step_completed",
          timestamp: nowIso,
          payload: {
            game: "daily_loop",
            focusRoute: "english_interview",
            stepId: "step-2",
            completedSteps: 2,
            totalSteps: 4,
          },
        },
        {
          name: "daily_loop_completed",
          timestamp: nowIso,
          payload: {
            game: "daily_loop",
            focusRoute: "english_interview",
            duration: 900,
            stepsCompleted: 4,
          },
        },
        {
          name: "daily_loop_reward_claimed",
          timestamp: nowIso,
          payload: {
            game: "daily_loop",
            focusRoute: "english_interview",
            rewardXp: 60,
          },
        },
        {
          name: "daily_loop_started",
          timestamp: nowIso,
          payload: {
            game: "daily_loop",
            focusRoute: "math_speed",
            totalSteps: 4,
          },
        },
        {
          name: "daily_loop_step_completed",
          timestamp: nowIso,
          payload: {
            game: "daily_loop",
            focusRoute: "math_speed",
            stepId: "step-1",
            completedSteps: 1,
            totalSteps: 4,
          },
        },
        {
          name: "content_selected",
          timestamp: nowIso,
          payload: {
            game: "speed_builder",
            contentId: "ci_daily_loop_a",
            skill: "english",
            routeObjective: "english_interview",
            repeated: false,
          },
        },
        {
          name: "content_selected",
          timestamp: nowIso,
          payload: {
            game: "collocation_sprint",
            contentId: "ci_daily_loop_b",
            skill: "english",
            routeObjective: "english_interview",
            repeated: true,
          },
        },
        {
          name: "content_selected",
          timestamp: previousWeekDate.toISOString(),
          payload: {
            game: "speed_builder",
            contentId: "ci_daily_loop_prev",
            skill: "english",
            routeObjective: "english_interview",
            repeated: false,
          },
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
    expect(screen.getByText("Content Variety by Route")).toBeInTheDocument();
    expect(screen.getByText("Repeat Rate")).toBeInTheDocument();
    expect(screen.getByText("Content Coverage")).toBeInTheDocument();
    expect(screen.getByText("Error Breakdown by Game")).toBeInTheDocument();
    expect(screen.getByText("Top 3 errores")).toBeInTheDocument();
    expect(screen.getByText("1. Connector Missing — 2")).toBeInTheDocument();
    expect(screen.getByText("2. Mode Mismatch — 1")).toBeInTheDocument();
    expect(screen.getByText("Suggested Focus")).toBeInTheDocument();
    expect(screen.getByText("Session Starts")).toBeInTheDocument();
    expect(screen.getByText("Daily Loop")).toBeInTheDocument();
    expect(screen.getByText("Google Objective Route")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "All routes" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "English Interview" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Math Speed" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Dev Reasoning" }),
    ).toBeInTheDocument();
    const dailyLoopCard = screen.getByText("Daily Loop").closest("article");
    expect(dailyLoopCard).toHaveTextContent("Started: 2 | Steps: 3");
    expect(dailyLoopCard).toHaveTextContent("Rewards: 1");
    expect(
      screen.getByRole("button", { name: "Paraphrase Duel" }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Paraphrase Duel").length).toBeGreaterThan(0);
    expect(
      screen.getByText("Connector Missing: 2 (vs prev: +1)"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Sentence Transformer" }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Sentence Transformer").length).toBeGreaterThan(
      0,
    );
    expect(
      screen.getByText("Mode Mismatch: 1 (vs prev: +1)"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "All games" }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Paraphrase Duel" }));
    expect(
      screen.getByText("Connector Missing: 2 (vs prev: +1)"),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Mode Mismatch: 1 (vs prev: +1)"),
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "All games" }));
    expect(
      screen.getByText("Mode Mismatch: 1 (vs prev: +1)"),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Math Speed" }));
    expect(dailyLoopCard).toHaveTextContent("Started: 1 | Steps: 1");
    expect(dailyLoopCard).toHaveTextContent("Rewards: 0");

    fireEvent.click(screen.getByRole("button", { name: "English Interview" }));
    expect(dailyLoopCard).toHaveTextContent("Started: 1 | Steps: 2");
    expect(dailyLoopCard).toHaveTextContent("Rewards: 1");
    const repeatRateCard = screen.getByText("Repeat Rate").closest("article");
    const coverageCard = screen
      .getByText("Content Coverage")
      .closest("article");
    expect(repeatRateCard).toHaveTextContent("50%");
    expect(repeatRateCard).toHaveTextContent("1 repeated of 2 selections");
    expect(coverageCard).toHaveTextContent("33.3%");
    expect(coverageCard).toHaveTextContent("2 unique of 6 available");
    expect(screen.getByText("Coverage: 33.3%")).toBeInTheDocument();
    expect(screen.getByText("Repeat: 50%")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "All routes" }));
    expect(dailyLoopCard).toHaveTextContent("Started: 2 | Steps: 3");
    expect(dailyLoopCard).toHaveTextContent("Rewards: 1");

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
