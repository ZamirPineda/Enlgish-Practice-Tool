import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import GlobalErrorBoundary from "@/components/GlobalErrorBoundary";

const BrokenComponent = () => {
  throw new Error("boom");
};

describe("GlobalErrorBoundary", () => {
  test("shows fallback UI and allows reporting", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(window.navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <GlobalErrorBoundary>
        <BrokenComponent />
      </GlobalErrorBoundary>,
    );

    expect(await screen.findByText("Something went wrong")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Report issue" }));
    await waitFor(() => expect(writeText).toHaveBeenCalledTimes(1));
    expect(writeText.mock.calls[0][0]).toContain("build=");
    expect(writeText.mock.calls[0][0]).toContain("route=");
    expect(writeText.mock.calls[0][0]).toContain("userAgent=");
    expect(writeText.mock.calls[0][0]).toContain("recentLogs:");

    consoleSpy.mockRestore();
  });
});
