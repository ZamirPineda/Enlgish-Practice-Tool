import { render, screen, fireEvent } from "@testing-library/react";
import MathFlashCard from "./MathFlashCard";
import { describe, test, expect, vi } from "vitest";
import React from "react";
import { MathStudyStrategy } from "../types";

// Mock dependencies
vi.mock("./LatexRenderer", () => ({
  default: ({ formula }: { formula: string }) => <span>{formula}</span>,
}));

// Mock shuffle to have deterministic order
vi.mock("../utils/arrayUtils", () => ({
  shuffle: (arr: any[]) => arr,
}));

describe("MathFlashCard Accessibility", () => {
  const mockStrategy: MathStudyStrategy = {
    id: "test-strategy",
    name: "Test Strategy",
    questionTemplate: "Solve: {col0}",
    questionColumnIndex: 0,
    answerColumnIndex: 1,
  };

  const mockRows: any[] = [
    ["2+2", "4"],
    ["3+3", "6"],
  ];

  const mockOnExit = vi.fn();

  test("flashcard is keyboard accessible", () => {
    render(
      <MathFlashCard
        strategy={mockStrategy}
        rows={mockRows}
        onExit={mockOnExit}
      />
    );

    // Initial state: not flipped. Question visible.
    expect(screen.getByText("Solve:")).toBeInTheDocument();
    expect(screen.getByText("2+2")).toBeInTheDocument();

    // The card should be accessible as a button with a descriptive label
    const card = screen.getByRole("button", { name: /Flashcard/i });

    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute("tabIndex", "0");

    // Test flip on click
    fireEvent.click(card);
    // After flip, the inner container should have rotation style
    // We check the first child which has the transform style
    const cardInner = card.firstChild as HTMLElement;
    expect(cardInner).toHaveClass("rotate-y-180");

    // Test flip back on Enter
    fireEvent.keyDown(card, { key: "Enter", code: "Enter" });
    expect(cardInner).not.toHaveClass("rotate-y-180");

    // Test flip on Space
    fireEvent.keyDown(card, { key: " ", code: "Space" });
    expect(cardInner).toHaveClass("rotate-y-180");
  });
});
