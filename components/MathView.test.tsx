import { render, screen, fireEvent } from "@testing-library/react";
import MathView from "./MathView";
import { describe, test, expect, vi } from "vitest";
import React from "react";

// Mock dependencies
vi.mock("./LatexRenderer", () => ({
  default: ({ formula }: { formula: string }) => <span>{formula}</span>,
}));

vi.mock("./MathFlashCard", () => ({
  default: () => <div>MathFlashCard Mock</div>,
}));

describe("MathView Accessibility", () => {
  test("toggle button has correct role and attributes", () => {
    render(<MathView />);

    // Look for the toggle button. It should ideally be found by role="switch"
    // but initially it might not have it, so we'll try to find it by its context or class if role fails.
    // However, the goal is to assert it HAS the role.

    // We expect this to fail initially if we search by role="switch"
    const toggleButton = screen.getByRole("switch", { name: /Modo práctica/i });

    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute("aria-checked", "false");

    // Click it
    fireEvent.click(toggleButton);

    expect(toggleButton).toHaveAttribute("aria-checked", "true");
  });
});
