import { describe, it, expect, beforeEach, vi } from "vitest";
import { loadSettings, saveSettings } from "./settingsStore";

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
      hasCompletedOnboarding: false,
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
        hasCompletedOnboarding: true,
      }),
    );

    expect(loadSettings()).toEqual({
      theme: "light",
      reducedMotion: false,
      ttsAutoPlay: false,
      ttsSpeed: 1.2,
      confirmDialogs: false,
      hasCompletedOnboarding: true,
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
      hasCompletedOnboarding: true,
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "app-settings",
      JSON.stringify({
        theme: "light",
        reducedMotion: true,
        ttsAutoPlay: false,
        ttsSpeed: 1.0,
        confirmDialogs: true,
        hasCompletedOnboarding: true,
      }),
    );
  });
});
