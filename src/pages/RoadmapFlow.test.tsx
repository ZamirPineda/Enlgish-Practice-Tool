import React from "react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RoadmapView from "@/pages/RoadmapView";

const { addGlobalXpMock, toastMock } = vi.hoisted(() => ({
  addGlobalXpMock: vi.fn(),
  toastMock: {
    success: vi.fn(),
    info: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("@/lib/xpStore", () => ({
  addGlobalXp: addGlobalXpMock,
}));

vi.mock("@/components/ui/Toast", () => ({
  toast: toastMock,
}));

describe("Roadmap sequential flow", () => {
  const renderView = () =>
    render(
      <MemoryRouter>
        <RoadmapView />
      </MemoryRouter>,
    );

  const recordMastery = (nodeTitle: string, mastery: number) => {
    fireEvent.change(screen.getByLabelText(`Mastery para ${nodeTitle}`), {
      target: { value: String(mastery) },
    });
    fireEvent.click(
      screen.getByRole("button", {
        name: `Registrar mastery para ${nodeTitle}`,
      }),
    );
  };

  beforeEach(() => {
    localStorage.clear();
    addGlobalXpMock.mockReset();
    toastMock.success.mockReset();
    toastMock.info.mockReset();
    toastMock.error.mockReset();
  });

  test("completes the English route sequentially from first node to module completion", () => {
    renderView();

    expect(
      within(
        screen.getByRole("article", { name: "Node Interview opener" }),
      ).getByText("En progreso"),
    ).toBeInTheDocument();
    expect(
      within(
        screen.getByRole("article", { name: "Node Fix grammar slips" }),
      ).getByText("Bloqueado"),
    ).toBeInTheDocument();

    recordMastery("Interview opener", 80);

    expect(
      within(
        screen.getByRole("article", { name: "Node Fix grammar slips" }),
      ).getByText("En progreso"),
    ).toBeInTheDocument();
    expect(
      within(
        screen.getByRole("article", { name: "Node Rephrase concise answers" }),
      ).getByText("Bloqueado"),
    ).toBeInTheDocument();

    recordMastery("Fix grammar slips", 80);

    expect(
      within(
        screen.getByRole("article", { name: "Node Rephrase concise answers" }),
      ).getByText("En progreso"),
    ).toBeInTheDocument();

    recordMastery("Rephrase concise answers", 80);

    expect(
      within(
        screen.getByRole("article", {
          name: "Node Transform follow-up answers",
        }),
      ).getByText("En progreso"),
    ).toBeInTheDocument();

    recordMastery("Transform follow-up answers", 80);

    expect(screen.getByText("Modulo completado: English Interview Path")).toBeInTheDocument();
    expect(addGlobalXpMock).toHaveBeenNthCalledWith(1, 40);
    expect(addGlobalXpMock).toHaveBeenNthCalledWith(2, 160);
  });

  test("keeps the next lesson blocked until the current lesson reaches the mastery target", () => {
    renderView();

    recordMastery("Interview opener", 60);
    recordMastery("Fix grammar slips", 60);

    expect(
      screen.getByText("Necesitas mastery minima de 70%. Actual: 60%."),
    ).toBeInTheDocument();
    expect(
      within(
        screen.getByRole("article", { name: "Node Rephrase concise answers" }),
      ).getByText("Bloqueado"),
    ).toBeInTheDocument();
  });

  test("resumes an in-progress unit after reload", () => {
    const firstRender = renderView();

    recordMastery("Interview opener", 80);
    recordMastery("Fix grammar slips", 80);
    recordMastery("Rephrase concise answers", 80);

    firstRender.unmount();

    renderView();

    expect(
      within(
        screen.getByRole("article", {
          name: "Node Rephrase concise answers",
        }),
      ).getByText("Completado"),
    ).toBeInTheDocument();
    expect(
      within(
        screen.getByRole("article", {
          name: "Node Transform follow-up answers",
        }),
      ).getByText("En progreso"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Registrar mastery para Transform follow-up answers",
      }),
    ).toBeInTheDocument();
  });
});
