import React from "react";
import { describe, test, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { APP_VERSION } from "./utils/appVersion";

vi.mock("./components/StopGameView", async () => {
  await new Promise((resolve) => setTimeout(resolve, 30));
  return {
    default: () => <div>Stop mock view</div>,
  };
});

vi.mock("./components/StudyDeckView", () => ({
  default: () => <div>Study mock view</div>,
}));

vi.mock("./components/PersonalPhrasesView", () => ({
  default: () => <div>Personal mock view</div>,
}));

vi.mock("./components/VocabularyVaultView", () => ({
  default: () => <div>Vault mock view</div>,
}));

vi.mock("./components/StatsView", () => ({
  default: () => <div>Stats mock view</div>,
}));

vi.mock("./components/MathView", () => ({
  default: () => <div>Math mock view</div>,
}));

vi.mock("./components/StudyDocsView", () => ({
  default: () => <div>Docs mock view</div>,
}));

describe("App route lazy loading", () => {
  beforeEach(() => {
    window.location.hash = "#/";
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
    render(<App />);

    fireEvent.click(screen.getByRole("link", { name: /vault/i }));
    expect(await screen.findByText("Vault mock view")).toBeInTheDocument();
    expect(screen.getByText(`About · v${APP_VERSION}`)).toBeInTheDocument();
  });
});
