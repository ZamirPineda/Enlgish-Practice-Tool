import React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";

describe("Base UI components", () => {
  it("renders button text and supports click", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);

    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("only renders modal content when open", () => {
    const onClose = vi.fn();
    const { rerender } = render(
      <Modal isOpen={false} onClose={onClose}>
        <p>Hidden</p>
      </Modal>,
    );

    expect(screen.queryByText("Hidden")).not.toBeInTheDocument();

    rerender(
      <Modal isOpen={true} onClose={onClose}>
        <p>Visible</p>
      </Modal>,
    );

    expect(screen.getByText("Visible")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Visible"));
    expect(onClose).toHaveBeenCalledTimes(0);

    fireEvent.click(screen.getByRole("button", { name: "Close modal" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("supports escape close and focus trapping", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <button type="button">First</button>
        <button type="button">Last</button>
      </Modal>,
    );

    const closeButton = screen.getByRole("button", { name: "Close modal" });
    const lastButton = screen.getByRole("button", { name: "Last" });

    closeButton.focus();
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(lastButton);

    lastButton.focus();
    await user.tab();
    expect(document.activeElement).toBe(closeButton);

    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
