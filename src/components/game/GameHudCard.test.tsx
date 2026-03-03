import React from "react";
import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Button from "@/components/ui/Button";
import GameHudCard from "@/components/game/GameHudCard";

describe("GameHudCard", () => {
  test("renders title, description, status and timer", () => {
    render(
      <GameHudCard
        title="Test Game"
        description="Practice mode"
        status="Round 1 / 10"
        timeLeft={30}
        roundTime={60}
      />,
    );

    expect(screen.getByText("Test Game")).toBeInTheDocument();
    expect(screen.getByText("Practice mode")).toBeInTheDocument();
    expect(screen.getByText("Round 1 / 10")).toBeInTheDocument();
    expect(screen.getByText("30s")).toBeInTheDocument();
  });

  test("renders optional controls and meta content", () => {
    render(
      <GameHudCard
        title="Test Game"
        description="Practice mode"
        meta={<p>Extra hint</p>}
        controls={<Button size="sm">A2</Button>}
        timeLeft={45}
        roundTime={45}
      />,
    );

    expect(screen.getByText("Extra hint")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "A2" })).toBeInTheDocument();
  });
});

