import React from "react";
import { describe, test, expect, beforeEach, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DailyLoopView from "@/pages/DailyLoopView";
import { addGlobalXp } from "@/lib/xpStore";

const { toastMock } = vi.hoisted(() => ({
  toastMock: {
    success: vi.fn(),
    info: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("@/components/ui/Toast", () => ({
  toast: toastMock,
}));

vi.mock("@/lib/xpStore", () => ({
  addGlobalXp: vi.fn(),
}));

describe("DailyLoopView", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test("starts a new loop and shows progress", () => {
    render(
      <MemoryRouter>
        <DailyLoopView />
      </MemoryRouter>,
    );

    expect(screen.getByText("Daily Loop")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Iniciar Daily Loop" }));

    expect(screen.getByText("Progreso: 0 / 4 sesiones")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Abrir juego" })).toHaveLength(
      4,
    );
  });

  test("completes the loop manually and claims reward", () => {
    render(
      <MemoryRouter>
        <DailyLoopView />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Iniciar Daily Loop" }));

    for (let index = 0; index < 4; index += 1) {
      const pendingButtons = screen.getAllByRole("button", {
        name: "Marcar completada",
      });
      fireEvent.click(pendingButtons[0]);
    }

    const claimButton = screen.getByRole("button", {
      name: "Reclamar +60 XP",
    });
    fireEvent.click(claimButton);

    expect(vi.mocked(addGlobalXp)).toHaveBeenCalledWith(60);
    expect(
      screen.getByRole("button", { name: "Reward ya reclamada" }),
    ).toBeDisabled();
  });
});
