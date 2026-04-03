import React from "react";
import { describe, test, expect, beforeEach, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DailyLoopView from "@/pages/DailyLoopView";
import { resetContentSelectionHistory } from "@/lib/contentSelectionHistory";
import {
  DAILY_LOOP_STORAGE_KEY,
  getTodayDailyLoop,
  markDailyLoopStepComplete,
  saveDailyLoopState,
  startDailyLoop,
} from "@/lib/dailyLoop";
import { getAnalyticsEvents } from "@/lib/analytics";
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
    resetContentSelectionHistory();
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
    expect(
      getAnalyticsEvents().some((event) => event.name === "daily_loop_started"),
    ).toBe(true);
  });

  test("shows and dismisses the focus coachmark before starting", async () => {
    const firstRender = render(
      <MemoryRouter>
        <DailyLoopView />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("dialog", { name: "Elige primero la ruta objetivo" }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Entendido" }));

    await waitFor(() => {
      expect(
        screen.queryByRole("dialog", {
          name: "Elige primero la ruta objetivo",
        }),
      ).not.toBeInTheDocument();
    });

    firstRender.unmount();

    render(
      <MemoryRouter>
        <DailyLoopView />
      </MemoryRouter>,
    );

    expect(
      screen.queryByRole("dialog", { name: "Elige primero la ruta objetivo" }),
    ).not.toBeInTheDocument();
  });

  test("registers selected focus route when starting loop", () => {
    render(
      <MemoryRouter>
        <DailyLoopView />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: /Math Speed/i }));
    fireEvent.click(screen.getByRole("button", { name: "Iniciar Daily Loop" }));

    expect(screen.getByText("Focus: Math Speed")).toBeInTheDocument();
    expect(getTodayDailyLoop()?.focusRoute).toBe("math_speed");

    const startedEvent = getAnalyticsEvents().find(
      (event) => event.name === "daily_loop_started",
    );
    expect(startedEvent?.payload.focusRoute).toBe("math_speed");
  });

  test("autostarts loop from query param", () => {
    render(
      <MemoryRouter initialEntries={["/daily-loop?autostart=1"]}>
        <DailyLoopView />
      </MemoryRouter>,
    );

    expect(screen.getByText("Progreso: 0 / 4 sesiones")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Iniciar Daily Loop" }),
    ).not.toBeInTheDocument();
  });

  test("resumes interrupted loop from local storage", () => {
    const startedLoop = startDailyLoop("math_speed");
    const interruptedLoop = markDailyLoopStepComplete(
      startedLoop,
      startedLoop.steps[0].id,
      "2026-03-03T12:00:00.000Z",
    );
    saveDailyLoopState(interruptedLoop);

    render(
      <MemoryRouter>
        <DailyLoopView />
      </MemoryRouter>,
    );

    expect(screen.getByText("Progreso: 1 / 4 sesiones")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Iniciar Daily Loop" }),
    ).not.toBeInTheDocument();
  });

  test("autostart query does not overwrite an existing interrupted loop", () => {
    const startedLoop = startDailyLoop("dev_reasoning");
    const interruptedLoop = markDailyLoopStepComplete(
      startedLoop,
      startedLoop.steps[0].id,
      "2026-03-03T12:00:00.000Z",
    );
    saveDailyLoopState(interruptedLoop);

    render(
      <MemoryRouter
        initialEntries={["/daily-loop?autostart=1&focus=math_speed"]}
      >
        <DailyLoopView />
      </MemoryRouter>,
    );

    expect(screen.getByText("Progreso: 1 / 4 sesiones")).toBeInTheDocument();
    expect(screen.getByText("Focus: Dev Reasoning")).toBeInTheDocument();
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

    expect(screen.getByText("Loop terminado")).toBeInTheDocument();
    expect(screen.getByText("4/4")).toBeInTheDocument();
    expect(screen.getByText("E2 M1 D1")).toBeInTheDocument();
    expect(screen.getByText("English Interview")).toBeInTheDocument();

    const claimButton = screen.getByRole("button", {
      name: "Reclamar +60 XP",
    });
    fireEvent.click(claimButton);

    expect(vi.mocked(addGlobalXp)).toHaveBeenCalledWith(60);
    expect(
      screen.getByRole("button", { name: "Reward ya reclamada" }),
    ).toBeDisabled();

    const eventNames = getAnalyticsEvents().map((event) => event.name);
    expect(eventNames).toContain("daily_loop_started");
    expect(eventNames).toContain("daily_loop_completed");
    expect(eventNames).toContain("daily_loop_reward_claimed");
    expect(
      eventNames.filter((name) => name === "daily_loop_step_completed"),
    ).toHaveLength(4);
  });

  test("completes loop after resuming an interrupted session", () => {
    const firstRender = render(
      <MemoryRouter>
        <DailyLoopView />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Iniciar Daily Loop" }));
    fireEvent.click(
      screen.getAllByRole("button", { name: "Marcar completada" })[0],
    );
    expect(screen.getByText("Progreso: 1 / 4 sesiones")).toBeInTheDocument();

    firstRender.unmount();

    render(
      <MemoryRouter>
        <DailyLoopView />
      </MemoryRouter>,
    );

    expect(screen.getByText("Progreso: 1 / 4 sesiones")).toBeInTheDocument();

    for (let index = 0; index < 3; index += 1) {
      fireEvent.click(
        screen.getAllByRole("button", { name: "Marcar completada" })[0],
      );
    }

    expect(screen.getByText("Loop terminado")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Reclamar +60 XP" }));
    expect(
      screen.getByRole("button", { name: "Reward ya reclamada" }),
    ).toBeDisabled();
  });

  test("shows suggested adaptive level from stored loop state", () => {
    const startedLoop = startDailyLoop("english_interview");
    const withAdaptiveHint = {
      ...startedLoop,
      steps: startedLoop.steps.map((step, index) =>
        index === 0 ? { ...step, adaptiveLevel: "B2" } : step,
      ),
    };
    localStorage.setItem(
      DAILY_LOOP_STORAGE_KEY,
      JSON.stringify(withAdaptiveHint),
    );

    render(
      <MemoryRouter>
        <DailyLoopView />
      </MemoryRouter>,
    );

    expect(screen.getByText("Nivel sugerido: B2")).toBeInTheDocument();
  });
});
