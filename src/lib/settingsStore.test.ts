import { describe, it, expect, beforeEach, vi } from "vitest";
import { loadSettings, saveSettings } from "@/lib/settingsStore";

describe("settingsStore", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  // 1. válido
  it("parses valid v3 settings correctly", () => {
    localStorage.setItem(
      "app-settings",
      JSON.stringify({
        settingsVersion: 3,
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
      settingsVersion: 3,
      theme: "light",
      reducedMotion: false,
      ttsAutoPlay: false,
      ttsSpeed: 1.2,
      confirmDialogs: false,
      soundEnabled: false,
      hasCompletedOnboarding: true,
      weeklyGoalSessions: 8,
      dailyGoalTarget: 50,
      dailyGoalType: "cards",
      dayOffsetHours: 3,
      srsSessionLimit: 20,
      srsTimeBoxMinutes: 10,
    });
  });

  // 2. inválido
  it("recovers from invalid data types using defaults", () => {
    localStorage.setItem(
      "app-settings",
      JSON.stringify({
        settingsVersion: 2,
        theme: "neon", // Invalid enum
        reducedMotion: "yes", // Invalid type
        ttsAutoPlay: false, // Valid
        ttsSpeed: "fast", // Invalid type
        confirmDialogs: null, // Invalid type
        soundEnabled: { enabled: true }, // Invalid type
        hasCompletedOnboarding: 1, // Invalid type
        weeklyGoalSessions: -5, // Valid type, but will be clamped to 1
      }),
    );

    const matchMedia = vi.fn().mockReturnValue({ matches: true });
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: matchMedia,
    });

    const settings = loadSettings();
    expect(settings).toEqual({
      settingsVersion: 3,
      theme: "dark", // Fallback
      reducedMotion: true, // Fallback to system
      ttsAutoPlay: false, // Kept valid value
      ttsSpeed: 0.9, // Fallback
      confirmDialogs: true, // Fallback
      soundEnabled: true, // Fallback
      hasCompletedOnboarding: false, // Fallback
      weeklyGoalSessions: 1, // Clamped from -5
      dailyGoalTarget: 50,
      dailyGoalType: "cards",
      dayOffsetHours: 3,
      srsSessionLimit: 20,
      srsTimeBoxMinutes: 10,
    });
  });

  // 3. corrupto
  it("falls back to defaults safely without crashing when JSON is corrupted", () => {
    localStorage.setItem("app-settings", "{ completely corrupted data ;; ");

    expect(() => loadSettings()).not.toThrow();

    const matchMedia = vi.fn().mockReturnValue({ matches: false });
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: matchMedia,
    });

    expect(loadSettings().theme).toBe("dark");
    expect(loadSettings().settingsVersion).toBe(3);
    expect(loadSettings().reducedMotion).toBe(false);
  });

  // 4. faltantes
  it("returns default settings when storage is empty or missing", () => {
    // LocalStorage is cleared in beforeEach
    const matchMedia = vi.fn().mockReturnValue({ matches: false });
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: matchMedia,
    });

    const settings = loadSettings();

    expect(settings).toEqual({
      settingsVersion: 3,
      theme: "dark",
      reducedMotion: false,
      ttsAutoPlay: true,
      ttsSpeed: 0.9,
      confirmDialogs: true,
      soundEnabled: true,
      hasCompletedOnboarding: false,
      weeklyGoalSessions: 5,
      dailyGoalTarget: 50,
      dailyGoalType: "cards",
      dayOffsetHours: 3,
      srsSessionLimit: 20,
      srsTimeBoxMinutes: 10,
    });
  });

  // 5. versión vieja
  it("parses v1 settings and injects new default fields missing in v1", () => {
    localStorage.setItem(
      "app-settings",
      JSON.stringify({
        theme: "light",
        ttsAutoPlay: false,
        // No settingsVersion
        // Missing other fields intentionally
      }),
    );

    const matchMedia = vi.fn().mockReturnValue({ matches: false });
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: matchMedia,
    });

    const settings = loadSettings();

    expect(settings).toEqual({
      settingsVersion: 3, // Upgraded version
      theme: "light", // Retained from v1
      reducedMotion: false, // Default injected
      ttsAutoPlay: false, // Retained from v1
      ttsSpeed: 0.9, // Default injected
      confirmDialogs: true, // Default injected
      soundEnabled: true, // Default injected
      hasCompletedOnboarding: false, // Default injected
      weeklyGoalSessions: 5, // Default injected
      dailyGoalTarget: 50, // Default injected
      dailyGoalType: "cards", // Default injected
      dayOffsetHours: 3, // Default injected
      srsSessionLimit: 20, // Default injected
      srsTimeBoxMinutes: 10, // Default injected
    });
  });

  // 6. migración
  it("migrates old settings to v3 and immediately saves it to storage", () => {
    const setItemSpy = vi.spyOn(localStorage, "setItem");

    localStorage.setItem(
      "app-settings",
      JSON.stringify({
        theme: "light",
        // No settingsVersion
      }),
    );

    const matchMedia = vi.fn().mockReturnValue({ matches: false });
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: matchMedia,
    });

    // Calling loadSettings should trigger the migration save
    loadSettings();

    expect(setItemSpy).toHaveBeenCalledWith(
      "app-settings",
      expect.stringContaining('"settingsVersion":3'),
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      "app-settings",
      expect.stringContaining('"theme":"light"'),
    );

    setItemSpy.mockRestore();
  });
});
