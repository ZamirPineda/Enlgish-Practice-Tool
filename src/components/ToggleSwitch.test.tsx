import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import ToggleSwitch from "./ToggleSwitch";

describe("ToggleSwitch", () => {
  it("renders with proper semantics and handles toggle", async () => {
    const onChange = vi.fn();
    render(<ToggleSwitch label="My Switch" checked={false} onChange={onChange} />);

    const sw = screen.getByRole("switch", { name: "My Switch" });
    expect(sw).toBeInTheDocument();
    expect(sw).not.toBeChecked();

    const user = userEvent.setup();
    await user.click(sw);
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
