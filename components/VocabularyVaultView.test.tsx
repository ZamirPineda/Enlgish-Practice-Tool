import React from "react";
import { describe, test, expect, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import VocabularyVaultView from "./VocabularyVaultView";
import { getIsoWeekKey } from "../utils/srs";
import { ANALYTICS_EVENTS_KEY } from "../utils/analytics";

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

    render(
      <VocabularyVaultView onPlayWord={vi.fn()} confirmDialogsEnabled={true} />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Review Now (1)" }));

    expect(await screen.findByText("Review 1 / 1")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "hello" })).toBeInTheDocument();
  });

  test("objective mode: filters review queue by travel tags", async () => {
    localStorage.setItem(
      "vocab-vault-deck",
      JSON.stringify({
        interviewWord: {
          word: "resume",
          definition: "a CV",
          repetition: 0,
          efactor: 2.5,
          interval: 0,
          nextReviewDate: today,
          status: "new",
          tags: ["Interview", "B1"],
        },
        travelWord: {
          word: "boarding pass",
          definition: "travel document",
          repetition: 0,
          efactor: 2.5,
          interval: 0,
          nextReviewDate: today,
          status: "new",
          tags: ["Travel", "A2"],
        },
      }),
    );

    render(
      <VocabularyVaultView onPlayWord={vi.fn()} confirmDialogsEnabled={true} />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Objective travel" }));
    fireEvent.click(screen.getByRole("button", { name: "Review Now (1)" }));

    expect(await screen.findByText("Review 1 / 1")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "boarding pass" }),
    ).toBeInTheDocument();
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

    render(
      <VocabularyVaultView onPlayWord={vi.fn()} confirmDialogsEnabled={true} />,
    );

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

    const events = JSON.parse(
      localStorage.getItem(ANALYTICS_EVENTS_KEY) || "[]",
    ) as Array<{ name: string }>;
    expect(events.some((event) => event.name === "session_start")).toBe(true);
    expect(events.some((event) => event.name === "item_correct")).toBe(true);
    expect(events.some((event) => event.name === "session_end")).toBe(true);
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

    render(
      <VocabularyVaultView onPlayWord={vi.fn()} confirmDialogsEnabled={true} />,
    );

    expect(
      screen.getByRole("button", { name: "Review Now (1)" }),
    ).toBeInTheDocument();
    expect(screen.getByText("1 of 2 words started")).toBeInTheDocument();
  });

  test("streak: increments streak after completing daily review", async () => {
    localStorage.setItem(
      "vocab-vault-progress",
      JSON.stringify({
        currentStreak: 2,
        bestStreak: 2,
        totalReviews: 10,
        lastReviewDate: today,
      }),
    );
    localStorage.setItem(
      "vocab-vault-deck",
      JSON.stringify({
        hello: {
          word: "hello",
          definition: "a greeting",
          repetition: 0,
          efactor: 2.5,
          interval: 0,
          lapses: 0,
          nextReviewDate: today,
          status: "new",
        },
      }),
    );

    render(
      <VocabularyVaultView onPlayWord={vi.fn()} confirmDialogsEnabled={true} />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Review Now (1)" }));
    fireEvent.click(await screen.findByRole("button", { name: "Show Answer" }));
    fireEvent.click(screen.getByRole("button", { name: "Got it! 🚀" }));

    await waitFor(() => {
      expect(screen.getByText("2 day streak · best 2")).toBeInTheDocument();
    });

    const savedProgress = JSON.parse(
      localStorage.getItem("vocab-vault-progress") || "{}",
    );
    expect(savedProgress.totalReviews).toBe(11);
  });

  test("import: restores deck and streak progress from JSON backup", async () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    render(
      <VocabularyVaultView onPlayWord={vi.fn()} confirmDialogsEnabled={true} />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Backup & Sync 🔄" }));
    fireEvent.change(screen.getByPlaceholderText("Paste code here..."), {
      target: {
        value: JSON.stringify({
          deck: {
            focus: {
              word: "focus",
              definition: "to concentrate",
              repetition: 1,
              efactor: 2.5,
              interval: 1,
              lapses: 0,
              nextReviewDate: today,
              status: "learning",
            },
          },
          progress: {
            currentStreak: 4,
            bestStreak: 7,
            totalReviews: 21,
            lastReviewDate: today,
          },
        }),
      },
    });
    fireEvent.click(screen.getByRole("button", { name: "RESTORE VAULT" }));

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Review Now (1)" }),
      ).toBeInTheDocument();
    });
    const savedProgress = JSON.parse(
      localStorage.getItem("vocab-vault-progress") || "{}",
    );
    expect(savedProgress.currentStreak).toBe(4);
    expect(savedProgress.bestStreak).toBe(7);
    alertSpy.mockRestore();
  });

  test("shortcut /: focuses collection search input", () => {
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

    render(
      <VocabularyVaultView onPlayWord={vi.fn()} confirmDialogsEnabled={true} />,
    );
    fireEvent.click(screen.getByRole("button", { name: /My Collection/i }));

    fireEvent.keyDown(window, { key: "/" });

    expect(screen.getByLabelText("Search vault words")).toHaveFocus();
  });

  test("Enter: confirms save action in add word modal", () => {
    render(
      <VocabularyVaultView onPlayWord={vi.fn()} confirmDialogsEnabled={true} />,
    );

    fireEvent.click(screen.getByRole("button", { name: "+ Add Word" }));
    fireEvent.change(screen.getByLabelText("Word to learn"), {
      target: { value: "testword" },
    });
    fireEvent.change(screen.getByLabelText("Definition & Notes"), {
      target: { value: "a sample definition" },
    });
    fireEvent.keyDown(screen.getByLabelText("Word to learn"), {
      key: "Enter",
    });

    expect(screen.queryByText("Add New Word")).not.toBeInTheDocument();
  });

  test("empty vault: shows import sample and add first word CTAs", () => {
    render(
      <VocabularyVaultView onPlayWord={vi.fn()} confirmDialogsEnabled={true} />,
    );
    fireEvent.click(screen.getByRole("button", { name: /My Collection/i }));

    expect(screen.getByText("Your Vault is empty")).toBeInTheDocument();
    expect(
      screen.getByText("Import sample / Add first word"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Import sample" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add first word" }),
    ).toBeInTheDocument();
  });

  test("empty vault: import sample fills the collection", async () => {
    render(
      <VocabularyVaultView onPlayWord={vi.fn()} confirmDialogsEnabled={true} />,
    );
    fireEvent.click(screen.getByRole("button", { name: /My Collection/i }));
    fireEvent.click(screen.getByRole("button", { name: "Import sample" }));

    expect(await screen.findByText("Acknowledge")).toBeInTheDocument();
  });

  test("speaking analytics: logs speaking_used when playing word audio", () => {
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

    render(
      <VocabularyVaultView onPlayWord={vi.fn()} confirmDialogsEnabled={true} />,
    );

    fireEvent.click(screen.getByRole("button", { name: /My Collection/i }));
    fireEvent.click(screen.getByRole("button", { name: "Listen to hello" }));

    const events = JSON.parse(
      localStorage.getItem(ANALYTICS_EVENTS_KEY) || "[]",
    ) as Array<{ name: string; payload?: { source?: string } }>;
    expect(
      events.some(
        (event) =>
          event.name === "speaking_used" &&
          event.payload?.source === "collection_audio",
      ),
    ).toBe(true);
  });

  test("boss review: completing session marks weekly boss review as done", async () => {
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

    render(
      <VocabularyVaultView onPlayWord={vi.fn()} confirmDialogsEnabled={true} />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Boss Review/i }));
    fireEvent.click(await screen.findByRole("button", { name: "Show Answer" }));
    fireEvent.click(screen.getByRole("button", { name: "Got it! 🚀" }));

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Boss Review ✓" }),
      ).toBeInTheDocument();
    });

    const savedProgress = JSON.parse(
      localStorage.getItem("vocab-vault-progress") || "{}",
    );
    expect(savedProgress.lastBossReviewWeek).toBe(getIsoWeekKey(new Date()));
    expect(savedProgress.bossReviewsCompleted).toBe(1);

    const events = JSON.parse(
      localStorage.getItem(ANALYTICS_EVENTS_KEY) || "[]",
    ) as Array<{ name: string }>;
    expect(
      events.some((event) => event.name === "weekly_review_completed"),
    ).toBe(true);
  });
});
