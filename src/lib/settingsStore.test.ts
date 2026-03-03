import { describe, it, expect, beforeEach, vi } from "vitest";
import { loadSettings, saveSettings } from "@/lib/settingsStore";

describe("settingsStore", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns defaults when there are no saved settings", () => {
    const matchMedia = vi.fn().mockReturnValue({ matches: true });
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: matchMedia,
    });

    const settings = loadSettings();

    expect(settings).toEqual({
      theme: "dark",
      reducedMotion: true,
      ttsAutoPlay: true,
      ttsSpeed: 0.9,
      confirmDialogs: true,
      soundEnabled: true,
      hasCompletedOnboarding: false,
      weeklyGoalSessions: 5,
    });
  });

  it("loads persisted settings", () => {
    localStorage.setItem(
      "app-settings",
      JSON.stringify({
        theme: "light",
        reducedMotion: false,
        ttsAutoPlay: false,
        ttsSpeed: 1.2,
        confirmDialogs: false,
        soundEnabled: false,
        hasCompletedOnboarding: true,
        weeklyGoalSessions: 8,
      }),
    );

    expect(loadSettings()).toEqual({
      theme: "light",
      reducedMotion: false,
      ttsAutoPlay: false,
      ttsSpeed: 1.2,
      confirmDialogs: false,
      soundEnabled: false,
      hasCompletedOnboarding: true,
      weeklyGoalSessions: 8,
    });
  });

  it("falls back safely when saved data is invalid", () => {
    localStorage.setItem("app-settings", "{ invalid json");
    expect(loadSettings().theme).toBe("dark");
  });

  it("persists settings", () => {
    saveSettings({
      theme: "light",
      reducedMotion: true,
      ttsAutoPlay: false,
      ttsSpeed: 1.0,
      confirmDialogs: true,
      soundEnabled: true,
      hasCompletedOnboarding: true,
      weeklyGoalSessions: 6,
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "app-settings",
      JSON.stringify({
        theme: "light",
        reducedMotion: true,
        ttsAutoPlay: false,
        ttsSpeed: 1.0,
        confirmDialogs: true,
        soundEnabled: true,
        hasCompletedOnboarding: true,
        weeklyGoalSessions: 6,
      }),
    );
  });
});
