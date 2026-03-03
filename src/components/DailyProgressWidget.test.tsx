import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DailyProgressWidget from "./DailyProgressWidget";
import { trackActivity } from "@/lib/activityTracker";
import { loadSettings, saveSettings } from "@/lib/settingsStore";

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
});
