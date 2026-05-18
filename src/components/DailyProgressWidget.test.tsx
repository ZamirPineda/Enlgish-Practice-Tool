import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DailyProgressWidget from "./DailyProgressWidget";
import { trackActivity } from "@/lib/activityTracker";
import { loadSettings, saveSettings } from "@/lib/settingsStore";
import { trackAnalyticsEvent } from "@/lib/analytics";

describe("DailyProgressWidget", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-03T12:00:00"));

    const settings = loadSettings();
    saveSettings({
      ...settings,
      dailyGoalType: "cards",
      dailyGoalTarget: 50,
      dayOffsetHours: 3,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("updates current progress and resets when the day changes", () => {
    render(
      <MemoryRouter>
        <DailyProgressWidget />
      </MemoryRouter>,
    );

    expect(
      screen.getByText("50 more cards needed to reach your goal."),
    ).toBeInTheDocument();

    act(() => {
      trackActivity({ cards: 10 });
    });

    expect(
      screen.getByText("40 more cards needed to reach your goal."),
    ).toBeInTheDocument();

    act(() => {
      vi.setSystemTime(new Date("2026-03-04T12:00:00"));
      vi.advanceTimersByTime(60000);
    });

    expect(
      screen.getByText("50 more cards needed to reach your goal."),
    ).toBeInTheDocument();
  });

  it("shows session summary and allows claiming the daily session reward once", () => {
    render(
      <MemoryRouter>
        <DailyProgressWidget />
      </MemoryRouter>,
    );

    const rewardButtonBefore = screen.getByRole("button", {
      name: "Play 2 sessions with 70%+ accuracy to unlock daily reward",
    });
    expect(rewardButtonBefore).toBeDisabled();

    act(() => {
      trackAnalyticsEvent("session_start", { game: "speed_builder" });
      for (let i = 0; i < 6; i++) {
        trackAnalyticsEvent("item_correct", { game: "speed_builder" });
      }
      for (let i = 0; i < 2; i++) {
        trackAnalyticsEvent("item_wrong", { game: "speed_builder" });
      }
      trackAnalyticsEvent("session_end", { game: "speed_builder" });

      trackAnalyticsEvent("session_start", { game: "math_game" });
      for (let i = 0; i < 2; i++) {
        trackAnalyticsEvent("item_correct", { game: "math_game" });
      }
      trackAnalyticsEvent("session_end", { game: "math_game" });
    });

    expect(screen.getByText("Daily session reward ready.")).toBeInTheDocument();

    const rewardButton = screen.getByRole("button", {
      name: "Claim your daily reward of 40 XP",
    });
    expect(rewardButton).toBeEnabled();

    act(() => {
      fireEvent.click(rewardButton);
    });

    expect(screen.getByRole("button", { name: "Daily reward claimed" })).toBeDisabled();
    expect(localStorage.getItem("english-pal-global-xp")).toBe("40");
  });

  it("claims weekly consistency reward when enough active days are reached", () => {
    localStorage.setItem(
      "global-daily-activity",
      JSON.stringify({
        "2026-03-02": { xp: 10, cards: 0, time: 0, score: 0 },
        "2026-03-03": { xp: 0, cards: 2, time: 0, score: 0 },
        "2026-03-04": { xp: 5, cards: 0, time: 0, score: 0 },
      }),
    );

    render(
      <MemoryRouter>
        <DailyProgressWidget />
      </MemoryRouter>,
    );

    expect(screen.getByText(/3 \/ 7 active days/i)).toBeInTheDocument();

    const weeklyClaimButton = screen.getAllByRole("button", {
      name: "Claim weekly reward Starter for 30 XP",
    })[0];

    act(() => {
      fireEvent.click(weeklyClaimButton);
    });

    expect(localStorage.getItem("english-pal-global-xp")).toBe("30");
    expect(screen.getByRole("button", { name: "Weekly reward Starter claimed" })).toBeDisabled();
  });
});
