import React from "react";
import { describe, test, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "@/App";
import { APP_VERSION } from "@/lib/appVersion";

import { usePWAUpdate } from "@/hooks/usePWAUpdate";

const mockHandleUpdate = vi.fn();

vi.mock("@/hooks/usePWAUpdate", () => ({
  usePWAUpdate: vi.fn(),
}));

vi.mock("@/pages/StopGameView", async () => {
  await new Promise((resolve) => setTimeout(resolve, 30));
  return {
    default: () => <div>Stop mock view</div>,
  };
});

vi.mock("@/pages/StudyDeckView", () => ({
  default: () => <div>Study mock view</div>,
}));

vi.mock("@/pages/PersonalPhrasesView", () => ({
  default: () => <div>Personal mock view</div>,
}));

vi.mock("@/pages/VocabularyVaultView", () => ({
  default: () => <div>Vault mock view</div>,
}));

vi.mock("@/pages/StatsView", () => ({
  default: () => <div>Stats mock view</div>,
}));

vi.mock("@/pages/MathView", () => ({
  default: () => <div>Math mock view</div>,
}));

vi.mock("@/pages/StudyDocsView", () => ({
  default: () => <div>Docs mock view</div>,
}));

describe("App route lazy loading", () => {
  beforeEach(() => {
    window.location.hash = "#/";
    vi.mocked(usePWAUpdate).mockReturnValue({
      updateAvailable: false,
      handleUpdate: mockHandleUpdate,
    });
    mockHandleUpdate.mockReset();
  });

  test("shows fallback while lazy route loads", async () => {
    window.location.hash = "#/stop";
    render(<App />);

    expect(await screen.findByRole("status")).toHaveTextContent(
      "Loading section...",
    );
    expect(await screen.findByText("Stop mock view")).toBeInTheDocument();
  });

  test("keeps navigation working with lazy loaded routes", async () => {
    window.location.hash = "#/vault";
    render(<App />);

    expect(await screen.findByText("Vault mock view")).toBeInTheDocument();
    expect(screen.getByText(`About · v${APP_VERSION}`)).toBeInTheDocument();
  });

  test("shows onboarding on first run and hides it when completed", async () => {
    render(<App />);

    expect(
      await screen.findByText("Add words to your Vault"),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByText("Start a review session")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    fireEvent.click(screen.getByRole("button", { name: "Let’s go" }));

    expect(
      screen.queryByText("Add words to your Vault"),
    ).not.toBeInTheDocument();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "app-settings",
      expect.stringContaining('"hasCompletedOnboarding":true'),
    );
  });

  test("shows update banner and refresh action when new version is available", async () => {
    vi.mocked(usePWAUpdate).mockReturnValue({
      updateAvailable: true,
      handleUpdate: mockHandleUpdate,
    });
    render(<App />);

    expect(await screen.findByText("Update available")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Refresh" }));
    expect(mockHandleUpdate).toHaveBeenCalled();
  });
});
