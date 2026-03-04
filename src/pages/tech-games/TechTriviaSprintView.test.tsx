import React from "react";
import { describe, test, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { TechTriviaSprintView } from "@/pages/tech-games/TechTriviaSprintView";
import { techDecks } from "@/features/data/techDecks";

describe("TechTriviaSprintView", () => {
  const deckId = techDecks[0].id;

  test("renders setup and starts trivia sprint", async () => {
    render(
      <MemoryRouter initialEntries={[`/tech-games/trivia/${deckId}`]}>
        <Routes>
          <Route
            path="/tech-games/trivia/:deckId"
            element={<TechTriviaSprintView />}
          />
        </Routes>
      </MemoryRouter>,
    );

    const startButton = await screen.findByRole("button", {
      name: "Iniciar Trivia",
    });
    fireEvent.click(startButton);

    expect(screen.getByText(/^Score:/)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Iniciar Trivia" }),
    ).not.toBeInTheDocument();
  });
});
