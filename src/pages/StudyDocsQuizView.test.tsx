import React from "react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import StudyDocsQuizView from "@/pages/StudyDocsQuizView";

describe("StudyDocsQuizView", () => {
  beforeEach(() => {
    vi.spyOn(Math, "random").mockReturnValue(0.9999999);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("renders start panel and enters playing state", () => {
    render(<StudyDocsQuizView />);

    expect(screen.getByText("Tech Interview Quiz")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Iniciar Quiz" }));

    expect(screen.getByText(/Preguntas restantes:/)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Iniciar Quiz" }),
    ).not.toBeInTheDocument();
  });
});
