import React from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import CodeSyntaxBuilderView from "@/pages/CodeSyntaxBuilderView";
import { codeSyntaxData } from "@/features/data/codeSyntaxData";

describe("CodeSyntaxBuilderView", () => {
  const startGame = () => {
    fireEvent.click(screen.getByRole("button", { name: /Empezar Build/i }));
  };

  beforeEach(() => {
    vi.spyOn(Math, "random").mockReturnValue(0.9999999);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("renders title and default timer", () => {
    render(<CodeSyntaxBuilderView />);
    startGame();

    expect(screen.getByText("Code Syntax Builder")).toBeInTheDocument();
    expect(screen.getByText("45s")).toBeInTheDocument();
  });

  test("allows selecting a token and running the check", () => {
    render(<CodeSyntaxBuilderView />);
    startGame();

    const firstRound = codeSyntaxData[0];
    fireEvent.click(
      screen.getAllByRole("button", { name: firstRound.tokens[0] })[0],
    );

    const runButton = screen.getByRole("button", { name: /Compilar \/ Run/i });
    expect(runButton).not.toBeDisabled();
    fireEvent.click(runButton);

    expect(
      screen.getByText(
        /(Sintaxis impecable|Error de sintaxis|Tiempo agotado)/i,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(/Puntos:/)).toHaveTextContent(/\d+/);
  });
});
