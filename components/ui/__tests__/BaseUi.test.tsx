import React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Button from "../Button";
import Modal from "../Modal";

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
    fireEvent.click(screen.getByRole("dialog"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
