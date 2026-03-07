import React from "react";
import { describe, expect, test, beforeEach, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GlobalCommandPalette } from "@/components/GlobalCommandPalette";

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

const PaletteHarness: React.FC<{ initialOpen?: boolean }> = ({
  initialOpen = false,
}) => {
  const [open, setOpen] = React.useState(initialOpen);
  return <GlobalCommandPalette open={open} onOpenChange={setOpen} />;
};

describe("GlobalCommandPalette", () => {
  beforeEach(() => {
    vi.stubGlobal("ResizeObserver", ResizeObserverMock);
    Object.defineProperty(window.HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      value: vi.fn(),
    });
    window.location.hash = "#/";
  });

  test("opens with Ctrl+K shortcut", async () => {
    render(<PaletteHarness />);
    fireEvent.keyDown(window, { key: "k", ctrlKey: true });

    expect(await screen.findByLabelText("Search command")).toBeInTheDocument();
  });

  test("navigates to route when selecting a command", async () => {
    const user = userEvent.setup();
    render(<PaletteHarness initialOpen={true} />);

    await user.click(screen.getByText("Daily Loop"));

    await waitFor(() => {
      expect(window.location.hash).toBe("#/daily-loop?autostart=1");
    });
  });
});
