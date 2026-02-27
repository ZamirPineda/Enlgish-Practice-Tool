import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToggleSwitch from "./ToggleSwitch";

describe("ToggleSwitch", () => {
  it("renders with label and checkbox", () => {
    const handleChange = vi.fn();
    render(
      <ToggleSwitch
        label="Test Toggle"
        checked={false}
        onChange={handleChange}
      />,
    );

    const label = screen.getByText("Test Toggle");
    expect(label).toBeInTheDocument();

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveClass("sr-only"); // Should be visually hidden
    expect(checkbox).not.toBeChecked();
  });

  it("calls onChange when clicked", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    render(
      <ToggleSwitch
        label="Test Toggle"
        checked={false}
        onChange={handleChange}
      />,
    );

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    expect(handleChange).toHaveBeenCalledWith(true);
  });
});
