import React from "react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
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

  const closeCompletionModalIfOpen = async () => {
    const completionDialog = screen.queryByRole("dialog", {
      name: /Unidad completada:|Modulo completado:/i,
    });
    if (!completionDialog) {
      return;
    }

    fireEvent.click(
      within(completionDialog).getByRole("button", { name: "Continuar" }),
    );

    await waitFor(() => {
      expect(
        screen.queryByRole("dialog", {
          name: /Unidad completada:|Modulo completado:/i,
        }),
      ).not.toBeInTheDocument();
    });
  };

  const recordMastery = async (nodeTitle: string, mastery: number) => {
    const nodeButton = await screen.findByRole("button", {
      name: new RegExp(nodeTitle, "i"),
    });
    fireEvent.click(nodeButton);

    await waitFor(() => {
      expect(
        screen.getByLabelText(`Mastery para ${nodeTitle}`),
      ).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(`Mastery para ${nodeTitle}`), {
      target: { value: String(mastery) },
    });
    fireEvent.click(
      screen.getByRole("button", {
        name: `Registrar mastery para ${nodeTitle}`,
      }),
    );

    await closeCompletionModalIfOpen();
  };

  beforeEach(() => {
    localStorage.clear();
    addGlobalXpMock.mockReset();
    toastMock.success.mockReset();
    toastMock.info.mockReset();
    toastMock.error.mockReset();
  });

  test("completes the English route sequentially from first node to module completion", async () => {
    vitest.setConfig({ testTimeout: 45000 });
    renderView();

    expect(
      screen.getByRole("button", { name: /Abrir: Interview opener/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Bloqueado: Fix grammar slips/i }),
    ).toBeInTheDocument();

    await recordMastery("Interview opener", 80);

    expect(
      screen.getByRole("button", { name: /Abrir: Fix grammar slips/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /Bloqueado: Rephrase concise answers/i,
      }),
    ).toBeInTheDocument();

    await recordMastery("Fix grammar slips", 80);

    expect(
      screen.getByRole("button", { name: /Abrir: Rephrase concise answers/i }),
    ).toBeInTheDocument();

    await recordMastery("Rephrase concise answers", 80);

    expect(
      screen.getByRole("button", {
        name: /Abrir: Transform follow-up answers/i,
      }),
    ).toBeInTheDocument();

    await recordMastery("Transform follow-up answers", 80);

    expect(
      screen.getByRole("button", { name: /Abrir: Story frame builder/i }),
    ).toBeInTheDocument();

    await recordMastery("Story frame builder", 80);

    expect(
      screen.getByRole("button", { name: /Abrir: Story error cleanup/i }),
    ).toBeInTheDocument();

    await recordMastery("Story error cleanup", 80);

    expect(
      screen.getByRole("button", { name: /Abrir: Story rephrase variants/i }),
    ).toBeInTheDocument();

    await recordMastery("Story rephrase variants", 80);

    expect(
      screen.getByRole("button", { name: /Abrir: Story follow-up transform/i }),
    ).toBeInTheDocument();

    await recordMastery("Story follow-up transform", 80);

    expect(
      screen.getByRole("button", { name: /Abrir: Panel meeting builder/i }),
    ).toBeInTheDocument();

    await recordMastery("Panel meeting builder", 90);

    expect(
      screen.getByRole("button", { name: /Abrir: Panel precision cleanup/i }),
    ).toBeInTheDocument();

    await recordMastery("Panel precision cleanup", 90);

    expect(
      screen.getByRole("button", { name: /Abrir: Panel rephrase trade-offs/i }),
    ).toBeInTheDocument();

    await recordMastery("Panel rephrase trade-offs", 90);

    expect(
      screen.getByRole("button", {
        name: /Abrir: Panel constraint transform/i,
      }),
    ).toBeInTheDocument();

    await recordMastery("Panel constraint transform", 90);

    expect(
      screen.getByText("Modulo completado: English Interview Path"),
    ).toBeInTheDocument();
    expect(addGlobalXpMock).toHaveBeenNthCalledWith(1, 40);
    expect(addGlobalXpMock).toHaveBeenNthCalledWith(2, 40);
    expect(addGlobalXpMock).toHaveBeenNthCalledWith(3, 40);
    expect(addGlobalXpMock).toHaveBeenNthCalledWith(4, 160);
  }, 40000);

  test("keeps the next lesson blocked until the current lesson reaches the mastery target", async () => {
    renderView();

    await recordMastery("Interview opener", 60);
    await recordMastery("Fix grammar slips", 60);

    const fixSlipsNode = screen.getByRole("button", {
      name: /Fix grammar slips/i,
    });
    fireEvent.click(fixSlipsNode);

    await waitFor(() => {
      expect(
        screen.getByText("Necesitas mastery minima de 70%. Actual: 60%."),
      ).toBeInTheDocument();
    });

    expect(
      screen.getByRole("button", {
        name: /Bloqueado: Rephrase concise answers/i,
        hidden: true,
      }),
    ).toBeDisabled();
  }, 15000);

  test("resumes an in-progress unit after reload", async () => {
    const firstRender = renderView();

    await recordMastery("Interview opener", 80);
    await recordMastery("Fix grammar slips", 80);
    await recordMastery("Rephrase concise answers", 80);

    firstRender.unmount();

    renderView();

    expect(
      screen.getByRole("button", { name: /Abrir: Rephrase concise answers/i }),
    ).not.toBeDisabled();
    expect(
      screen.getByRole("button", {
        name: /Abrir: Transform follow-up answers/i,
      }),
    ).not.toBeDisabled();

    const transformFollowup = screen.getByRole("button", {
      name: /Abrir: Transform follow-up answers/i,
    });
    fireEvent.click(transformFollowup);

    await waitFor(() => {
      expect(
        screen.getByRole("button", {
          name: "Registrar mastery para Transform follow-up answers",
        }),
      ).toBeInTheDocument();
    });
  }, 15000);
});
