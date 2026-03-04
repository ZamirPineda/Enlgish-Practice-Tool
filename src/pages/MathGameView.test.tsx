import React from "react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import MathGameView from "@/pages/MathGameView";

describe("MathGameView", () => {
  beforeEach(() => {
    vi.spyOn(Math, "random").mockReturnValue(0.9999999);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("renders start panel and starts a session", () => {
    render(<MathGameView />);

    expect(screen.getByText("Math Speed Duel")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Iniciar juego" }));

    expect(screen.getByText(/Tema:/)).toBeInTheDocument();
    expect(screen.getByText(/Respuesta esperada:/)).toBeInTheDocument();
  });
});
