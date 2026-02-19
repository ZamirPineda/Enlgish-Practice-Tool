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
      confirmDialogs: true,
    });
  });

  it("loads persisted settings", () => {
    localStorage.setItem(
      "app-settings",
      JSON.stringify({
        theme: "light",
        reducedMotion: false,
        ttsAutoPlay: false,
        confirmDialogs: false,
      }),
    );

    expect(loadSettings()).toEqual({
      theme: "light",
      reducedMotion: false,
      ttsAutoPlay: false,
      confirmDialogs: false,
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
      confirmDialogs: true,
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "app-settings",
      JSON.stringify({
        theme: "light",
        reducedMotion: true,
        ttsAutoPlay: false,
        confirmDialogs: true,
      }),
    );
  });
});
