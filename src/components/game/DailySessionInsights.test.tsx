import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { trackAnalyticsEvent } from "@/lib/analytics";
import DailySessionInsights from "@/components/game/DailySessionInsights";

describe("DailySessionInsights", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-03T12:00:00"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows locked reward by default", () => {
    const { unmount } = render(<DailySessionInsights />);

    expect(
      screen.getByText(
        "Play 2 sessions with 70%+ accuracy to unlock daily reward.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Claim +40 XP for daily session" }),
    ).toBeDisabled();
    unmount();
  });

  it("claims reward once when eligible", () => {
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

    const { unmount } = render(<DailySessionInsights />);

    const claimButton = screen.getByRole("button", {
      name: "Claim +40 XP for daily session",
    });
    expect(claimButton).toBeEnabled();

    act(() => {
      fireEvent.click(claimButton);
    });

    expect(
      screen.getByRole("button", {
        name: "Daily session reward already claimed",
      }),
    ).toBeDisabled();
    expect(localStorage.getItem("english-pal-global-xp")).toBe("40");
    unmount();
  });
});
