import React from "react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { TechFlashcardsView } from "@/pages/tech-games/TechFlashcardsView";
import { techDecks } from "@/features/data/techDecks";

describe("TechFlashcardsView", () => {
  const deckId = techDecks[0].id;

  beforeEach(() => {
    vi.spyOn(Math, "random").mockReturnValue(0.9999999);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("renders setup and starts flashcards session", async () => {
    render(
      <MemoryRouter initialEntries={[`/tech-games/flashcards/${deckId}`]}>
        <Routes>
          <Route
            path="/tech-games/flashcards/:deckId"
            element={<TechFlashcardsView />}
          />
        </Routes>
      </MemoryRouter>,
    );

    const startButton = await screen.findByRole("button", {
      name: "Iniciar Flashcards",
    });
    fireEvent.click(startButton);

    expect(screen.getByText(/Pregunta 1 de/)).toBeInTheDocument();
  });
});
