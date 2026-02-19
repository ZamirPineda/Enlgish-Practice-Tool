import React from "react";
import { describe, test, expect, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import VocabularyVaultView from "./VocabularyVaultView";

const today = new Date().toISOString().split("T")[0];

describe("VocabularyVaultView flows", () => {
  test("crear sesión: starts a review session for due items", async () => {
    localStorage.setItem(
      "vocab-vault-deck",
      JSON.stringify({
        hello: {
          word: "hello",
          definition: "a greeting",
          repetition: 0,
          efactor: 2.5,
          interval: 0,
          nextReviewDate: today,
          status: "new",
        },
      }),
    );

    render(<VocabularyVaultView onPlayWord={vi.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: "Review Now (1)" }));

    expect(await screen.findByText("Review 1 / 1")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "hello" })).toBeInTheDocument();
  });

  test("responder: completing an answer updates deck and exits session", async () => {
    localStorage.setItem(
      "vocab-vault-deck",
      JSON.stringify({
        hello: {
          word: "hello",
          definition: "a greeting",
          repetition: 0,
          efactor: 2.5,
          interval: 0,
          nextReviewDate: today,
          status: "new",
        },
      }),
    );

    render(<VocabularyVaultView onPlayWord={vi.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: "Review Now (1)" }));
    fireEvent.click(await screen.findByRole("button", { name: "Show Answer" }));
    fireEvent.click(screen.getByRole("button", { name: "Got it! 🚀" }));

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "All caught up!" }),
      ).toBeInTheDocument();
    });

    const savedDeck = JSON.parse(
      localStorage.getItem("vocab-vault-deck") || "{}",
    );
    expect(savedDeck.hello.repetition).toBe(1);
    expect(savedDeck.hello.interval).toBe(1);
  });

  test("ver progreso: shows current study progress summary", () => {
    localStorage.setItem(
      "vocab-vault-deck",
      JSON.stringify({
        hello: {
          word: "hello",
          definition: "a greeting",
          repetition: 0,
          efactor: 2.5,
          interval: 0,
          nextReviewDate: today,
          status: "new",
        },
        world: {
          word: "world",
          definition: "the earth",
          repetition: 3,
          efactor: 2.5,
          interval: 15,
          nextReviewDate: "2099-01-01",
          status: "mastered",
        },
      }),
    );

    render(<VocabularyVaultView onPlayWord={vi.fn()} />);

    expect(
      screen.getByRole("button", { name: "Review Now (1)" }),
    ).toBeInTheDocument();
    expect(screen.getByText("1 of 2 words started")).toBeInTheDocument();
  });
});
