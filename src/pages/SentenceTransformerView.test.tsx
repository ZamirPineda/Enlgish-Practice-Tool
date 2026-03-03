import React from "react";
import { beforeEach, afterEach, describe, test, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import SentenceTransformerView from "@/pages/SentenceTransformerView";
import {
  clearAnalyticsEventsForTesting,
  getAnalyticsEvents,
} from "@/lib/analytics";

describe("SentenceTransformerView", () => {
  beforeEach(() => {
    localStorage.clear();
    clearAnalyticsEventsForTesting();
    vi.spyOn(Math, "random").mockReturnValue(0.9999999);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("renders title and transformation label", () => {
    render(<SentenceTransformerView />);

    expect(screen.getByText("Sentence Transformer")).toBeInTheDocument();
    expect(screen.getByText(/Transformation:/)).toBeInTheDocument();
  });

  test("accepts correct transformed sentence", () => {
    render(<SentenceTransformerView />);

    fireEvent.change(screen.getByLabelText("Transformer answer"), {
      target: {
        value: "If I finish this report tonight I will send it tomorrow.",
      },
    });
    fireEvent.click(screen.getByRole("button", { name: "Check transform" }));

    expect(screen.getByText(/Correct transformation/)).toBeInTheDocument();
  });

  test("accepts close conditional variant with contraction", () => {
    render(<SentenceTransformerView />);

    fireEvent.change(screen.getByLabelText("Transformer answer"), {
      target: {
        value: "If I finish this report tonight, I'll send it tomorrow.",
      },
    });
    fireEvent.click(screen.getByRole("button", { name: "Check transform" }));

    expect(screen.getByText(/Correct transformation/)).toBeInTheDocument();
  });

  test("tracks mode_mismatch analytics reason", () => {
    render(<SentenceTransformerView />);

    fireEvent.change(screen.getByLabelText("Transformer answer"), {
      target: { value: "I will send it tomorrow" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Check transform" }));

    const events = getAnalyticsEvents();
    expect(events.at(-1)?.name).toBe("item_wrong");
    expect(events.at(-1)?.payload).toMatchObject({
      game: "sentence_transformer",
      errorType: "mode_mismatch",
    });
  });
});
