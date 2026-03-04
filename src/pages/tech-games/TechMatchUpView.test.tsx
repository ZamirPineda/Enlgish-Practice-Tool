import React from "react";
import { describe, test, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { TechMatchUpView } from "@/pages/tech-games/TechMatchUpView";
import { techDecks } from "@/features/data/techDecks";

describe("TechMatchUpView", () => {
  const deckId = techDecks[0].id;

  test("renders setup and starts matchup session", async () => {
    render(
      <MemoryRouter initialEntries={[`/tech-games/matchup/${deckId}`]}>
        <Routes>
          <Route
            path="/tech-games/matchup/:deckId"
            element={<TechMatchUpView />}
          />
        </Routes>
      </MemoryRouter>,
    );

    const startButton = await screen.findByRole("button", {
      name: "Iniciar Match Up",
    });
    fireEvent.click(startButton);

    expect(screen.getByText("Conceptos")).toBeInTheDocument();
  });
});
