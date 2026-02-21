import { render, screen, fireEvent } from "@testing-library/react";
import CustomScenarioModal from "./CustomScenarioModal";
import { describe, test, expect, vi } from "vitest";
import React from "react";

describe("CustomScenarioModal Accessibility", () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onStart: vi.fn(),
  };

  test("has accessible dialog role and labels", () => {
    render(<CustomScenarioModal {...defaultProps} />);

    // This should fail initially as role="dialog" is missing
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby", "modal-title");

    // Check for title association
    const title = document.getElementById("modal-title");
    expect(title).toHaveTextContent("Custom Scenario");
  });

  test("close button has accessible label", () => {
    render(<CustomScenarioModal {...defaultProps} />);

    // This should fail initially as aria-label is missing
    const closeButton = screen.getByRole("button", { name: /close/i });
    expect(closeButton).toBeInTheDocument();
  });

  test("form inputs have associated labels", () => {
    render(<CustomScenarioModal {...defaultProps} />);

    // These should fail initially as htmlFor/id are missing
    expect(screen.getByLabelText(/who are you/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/who is the ai/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/the situation/i)).toBeInTheDocument();
  });

  test("focus moves to first input on mount", () => {
    render(<CustomScenarioModal {...defaultProps} />);

    // This should fail initially
    const firstInput = screen.getByLabelText(/who are you/i);
    expect(document.activeElement).toBe(firstInput);
  });

  test("closes on Escape key", () => {
    const onClose = vi.fn();
    render(<CustomScenarioModal {...defaultProps} onClose={onClose} />);

    // This should fail initially
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });

  test("closes on backdrop click", () => {
    const onClose = vi.fn();
    const { container } = render(
      <CustomScenarioModal {...defaultProps} onClose={onClose} />,
    );

    // Click the backdrop (outer div)
    // The outer div is the first child of the container
    const backdrop = container.firstChild as HTMLElement;
    fireEvent.click(backdrop);

    // This should fail initially
    expect(onClose).toHaveBeenCalled();
  });

  test("does not close on content click", () => {
    const onClose = vi.fn();
    render(<CustomScenarioModal {...defaultProps} onClose={onClose} />);

    // Click inside the modal content
    const input = screen.getByPlaceholderText(/lost in new york/i);
    fireEvent.click(input);

    expect(onClose).not.toHaveBeenCalled();
  });
});
