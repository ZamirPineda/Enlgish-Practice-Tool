import React from "react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { TechBossView } from "@/pages/tech-games/TechBossView";
import { techDecks } from "@/features/data/techDecks";

describe("TechBossView", () => {
  const deckId = techDecks[0].id;

  beforeEach(() => {
    vi.spyOn(Math, "random").mockReturnValue(0.9999999);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("renders setup and starts boss challenge", async () => {
    render(
      <MemoryRouter initialEntries={[`/tech-games/boss/${deckId}`]}>
        <Routes>
          <Route path="/tech-games/boss/:deckId" element={<TechBossView />} />
        </Routes>
      </MemoryRouter>,
    );

    const startButton = await screen.findByRole("button", {
      name: "Iniciar Boss",
    });
    fireEvent.click(startButton);

    expect(screen.getByText(/Bug Hunter/)).toBeInTheDocument();
  });
});
