import { render, screen, fireEvent } from "@testing-library/react";
import { StopItemModal } from "@/components/StopItemModal";
import { StopItem } from "@/types";
import { describe, test, expect, vi } from "vitest";
import React from "react";

const mockItem: StopItem = {
  word: "test",
  ipa: "test",
  translation: "test",
  definition: "test definition",
};

describe("StopItemModal Accessibility", () => {
  test("close button has accessible label", () => {
    render(
      <StopItemModal
        item={mockItem}
        category="General"
        onClose={vi.fn()}
        onPlay={vi.fn()}
      />,
    );

    const button = screen.getByRole("button", { name: /close/i });
    expect(button).toBeInTheDocument();
  });

  test("has correct dialog role and labels", () => {
    render(
      <StopItemModal
        item={mockItem}
        category="General"
        onClose={vi.fn()}
        onPlay={vi.fn()}
      />,
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby", "modal-title");

    const title = dialog.querySelector("#modal-title");
    expect(title).toHaveTextContent("test");
  });

  test("focus moves to first focusable control on mount", () => {
    render(
      <StopItemModal
        item={mockItem}
        category="General"
        onClose={vi.fn()}
        onPlay={vi.fn()}
      />,
    );

    const closeButton = screen.getByRole("button", { name: /close/i });
    expect(document.activeElement).toBe(closeButton);
  });

  test("closes on Escape key", () => {
    const onCloseMock = vi.fn();
    render(
      <StopItemModal
        item={mockItem}
        category="General"
        onClose={onCloseMock}
        onPlay={vi.fn()}
      />,
    );

    fireEvent.keyDown(window, { key: "Escape" });
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
