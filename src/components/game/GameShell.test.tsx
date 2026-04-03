import React from "react";
import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import GameShell from "@/components/game/GameShell";

describe("GameShell", () => {
  test("renders start screen before session starts", () => {
    render(
      <GameShell hasStarted={false} startScreen={<p>Start panel</p>}>
        <p>Active game</p>
      </GameShell>,
    );

    expect(screen.getByText("Start panel")).toBeInTheDocument();
    expect(screen.queryByText("Active game")).not.toBeInTheDocument();
  });

  test("renders game content after session starts", () => {
    render(
      <GameShell hasStarted startScreen={<p>Start panel</p>}>
        <p>Active game</p>
      </GameShell>,
    );

    expect(screen.queryByText("Start panel")).not.toBeInTheDocument();
    expect(screen.getByText("Active game")).toBeInTheDocument();
  });
});
