import React from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { StopGamePlay } from "@/components/StopGamePlay";
import { ADAPTIVE_DIFFICULTY_LOG_KEY } from "@/lib/adaptiveDifficulty";

const { toastMock, speechMock } = vi.hoisted(() => ({
  toastMock: {
    success: vi.fn(),
    info: vi.fn(),
    error: vi.fn(),
  },
  speechMock: {
    startListening: vi.fn(),
    stopListening: vi.fn(),
    abortListening: vi.fn(),
    resetTranscript: vi.fn(),
  },
}));

vi.mock("@/components/ui/Toast", () => ({
  toast: toastMock,
}));

vi.mock("@/hooks/useSpeechRecognition", () => ({
  useSpeechRecognition: () => ({
    micState: "idle",
    startListening: speechMock.startListening,
    stopListening: speechMock.stopListening,
    abortListening: speechMock.abortListening,
    interimTranscript: "",
    finalTranscript: "",
    resetTranscript: speechMock.resetTranscript,
  }),
}));

describe("StopGamePlay", () => {
  beforeEach(() => {
    localStorage.clear();
    toastMock.success.mockReset();
    toastMock.info.mockReset();
    toastMock.error.mockReset();
    speechMock.startListening.mockReset();
    speechMock.stopListening.mockReset();
    speechMock.abortListening.mockReset();
    speechMock.resetTranscript.mockReset();
    vi.spyOn(Math, "random").mockReturnValue(0.9999999);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("auto-downshifts category difficulty after 3 consecutive errors and logs cause", () => {
    render(
      <StopGamePlay
        onPlayWord={vi.fn()}
        onAddToVault={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Hard" }));
    fireEvent.click(screen.getByRole("button", { name: "Start Game" }));

    for (let index = 0; index < 3; index += 1) {
      fireEvent.change(screen.getByPlaceholderText(/Type or speak your answer/i), {
        target: { value: "notavalidwordxyz" },
      });
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));
      if (index < 2) {
        fireEvent.click(screen.getByRole("button", { name: "Continue" }));
      }
    }

    expect(toastMock.info).toHaveBeenCalled();

    const rawLog = localStorage.getItem(ADAPTIVE_DIFFICULTY_LOG_KEY);
    expect(rawLog).toBeTruthy();
    const log = JSON.parse(rawLog || "[]");
    expect(log.length).toBeGreaterThan(0);
    expect(log[log.length - 1]).toMatchObject({
      gameId: "stop_game",
      previousLevel: "Hard",
      nextLevel: "Normal",
      reason: "rule_downshift",
      trigger: "consecutive_wrong",
      changed: true,
    });
  });
});
