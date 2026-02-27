import React from "react";
import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomeView from "./HomeView";

describe("HomeView", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-02-23T12:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("renders phrase of the day card", () => {
    render(
      <MemoryRouter>
        <HomeView />
      </MemoryRouter>,
    );

    expect(screen.getByText("Phrase of the day")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add phrase to Vault" }),
    ).toBeInTheDocument();
  });

  test("adds daily phrase to vault and updates CTA", async () => {
    render(
      <MemoryRouter>
        <HomeView />
      </MemoryRouter>,
    );

    vi.useRealTimers();
    fireEvent.click(
      screen.getByRole("button", { name: "Add phrase to Vault" }),
    );

    expect(
      await screen.findByRole("button", { name: "Added to Vault" }),
    ).toBeDisabled();

    const savedDeck = JSON.parse(
      localStorage.getItem("vocab-vault-deck") || "{}",
    );
    expect(Object.keys(savedDeck).length).toBe(1);

    const item = Object.values(savedDeck)[0] as {
      tags?: string[];
      originalContext?: string;
    };
    expect(item.tags).toContain("Daily Phrase");
    expect(item.originalContext).toBeTruthy();
  });
});
