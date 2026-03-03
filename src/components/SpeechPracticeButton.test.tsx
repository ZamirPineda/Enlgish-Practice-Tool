import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SpeechPracticeButton from "@/components/SpeechPracticeButton";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

vi.mock("../hooks/useSpeechRecognition");

describe("SpeechPracticeButton", () => {
  let transcriptHandler:
    | ((transcript: string, accuracyScore?: number) => void)
    | undefined;
  const startListening = vi.fn();
  const stopListening = vi.fn();

  beforeEach(() => {
    transcriptHandler = undefined;
    startListening.mockReset();
    stopListening.mockReset();

    vi.mocked(useSpeechRecognition).mockImplementation((onTranscriptReady) => {
      transcriptHandler = onTranscriptReady;
      return {
        micState: "off",
        interimTranscript: "",
        finalTranscript: "",
        startListening,
        stopListening,
        abortListening: vi.fn(),
        resetTranscript: vi.fn(),
      };
    });
  });

  it("shows green feedback and marks as correct when accuracy is above 90%", () => {
    const onCorrect = vi.fn();
    render(
      <SpeechPracticeButton targetText="acknowledge" onCorrect={onCorrect} />,
    );

    fireEvent.click(
      screen.getByRole("button", { name: /pronunciation practice/i }),
    );
    act(() => transcriptHandler?.("acknowledge", 95));

    expect(onCorrect).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Accuracy: 95%")).toHaveClass("text-emerald-400");
  });

  it("shows yellow feedback for medium accuracy", () => {
    render(
      <SpeechPracticeButton targetText="acknowledge" onCorrect={vi.fn()} />,
    );

    fireEvent.click(
      screen.getByRole("button", { name: /pronunciation practice/i }),
    );
    act(() => transcriptHandler?.("acknowled", 80));

    expect(screen.getByText("Accuracy: 80%")).toHaveClass("text-amber-400");
  });

  it("shows red feedback for low accuracy", () => {
    render(
      <SpeechPracticeButton targetText="acknowledge" onCorrect={vi.fn()} />,
    );

    fireEvent.click(
      screen.getByRole("button", { name: /pronunciation practice/i }),
    );
    act(() => transcriptHandler?.("banana", 45));

    expect(screen.getByText("Accuracy: 45%")).toHaveClass("text-red-400");
  });

  it("updates accessible label when listening", () => {
    vi.mocked(useSpeechRecognition).mockImplementation((onTranscriptReady) => {
      transcriptHandler = onTranscriptReady;
      return {
        micState: "listening",
        interimTranscript: "hello",
        finalTranscript: "",
        startListening,
        stopListening,
        abortListening: vi.fn(),
        resetTranscript: vi.fn(),
      };
    });

    render(
      <SpeechPracticeButton targetText="acknowledge" onCorrect={vi.fn()} />,
    );

    const button = screen.getByRole("button", { name: /stop recording/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});
