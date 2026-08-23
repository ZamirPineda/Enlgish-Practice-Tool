import React from "react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import RoadmapView from "@/pages/RoadmapView";

const { addGlobalXpMock } = vi.hoisted(() => ({
  addGlobalXpMock: vi.fn(),
}));

vi.mock("@/lib/xpStore", () => ({
  addGlobalXp: addGlobalXpMock,
}));

vi.mock("@/components/ui/Toast", () => ({
  toast: {
    success: vi.fn(),
    info: vi.fn(),
    error: vi.fn(),
  },
}));

describe("RoadmapView", () => {
  beforeEach(() => {
    localStorage.clear();
    addGlobalXpMock.mockReset();
  });

  test(
    "requires enough mastery before unlocking the next lesson",
    { timeout: 30000 },
    async () => {
      const user = userEvent.setup();
      const firstRender = render(
        <MemoryRouter>
          <RoadmapView />
        </MemoryRouter>,
      );

      expect(
        screen.getByRole("heading", { name: "Roadmap" }),
      ).toBeInTheDocument();

      const openerNode = screen.getByRole("button", {
        name: /Interview opener/i,
      });
      await user.click(openerNode);

      await waitFor(() => {
        expect(
          screen.getByLabelText("Mastery para Interview opener"),
        ).toBeInTheDocument();
      });

      fireEvent.change(screen.getByLabelText("Mastery para Interview opener"), {
        target: { value: "60" },
      });
      await user.click(
        screen.getByRole("button", {
          name: "Registrar mastery para Interview opener",
        }),
      );

      const fixSlipsNode = screen.getByRole("button", {
        name: /Fix grammar slips/i,
      });
      await user.click(fixSlipsNode);

      await waitFor(() => {
        expect(
          screen.getByLabelText("Mastery para Fix grammar slips"),
        ).toBeInTheDocument();
      });

      fireEvent.change(
        screen.getByLabelText("Mastery para Fix grammar slips"),
        {
          target: { value: "60" },
        },
      );
      await user.click(
        screen.getByRole("button", {
          name: "Registrar mastery para Fix grammar slips",
        }),
      );

      expect(
        screen.getByText("Necesitas mastery minima de 70%. Actual: 60%."),
      ).toBeInTheDocument();

      const lockedFollowupNode = screen.getByRole("button", {
        name: /Bloqueado: Rephrase concise answers/i,
      });
      expect(lockedFollowupNode).toBeDisabled();

      await user.click(fixSlipsNode);
      await waitFor(() => {
        expect(
          screen.getByLabelText("Mastery para Fix grammar slips"),
        ).toBeInTheDocument();
      });

      fireEvent.change(
        screen.getByLabelText("Mastery para Fix grammar slips"),
        {
          target: { value: "80" },
        },
      );
      await user.click(
        screen.getByRole("button", {
          name: "Registrar mastery para Fix grammar slips",
        }),
      );

      const continueButton = screen.queryByRole("button", {
        name: "Continuar",
      });
      if (continueButton) {
        await user.click(continueButton);
      }

      const unlockedFollowupNode = screen.getByRole("button", {
        name: /Abrir: Rephrase concise answers/i,
        hidden: true,
      });
      expect(unlockedFollowupNode).not.toBeDisabled();

      firstRender.unmount();

      render(
        <MemoryRouter>
          <RoadmapView />
        </MemoryRouter>,
      );

      const rephraseNode = screen.getByRole("button", {
        name: /Abrir: Rephrase concise answers/i,
      });
      await user.click(rephraseNode);

      await waitFor(() => {
        expect(
          screen.getByRole("button", {
            name: "Registrar mastery para Rephrase concise answers",
          }),
        ).toBeInTheDocument();
      });
    },
    15000,
  );

  test("filters modules by route", () => {
    render(
      <MemoryRouter>
        <RoadmapView />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("tab", { name: "Math Speed" }));

    expect(screen.getByText("Math Speed Path")).toBeInTheDocument();
    expect(
      screen.queryByText("English Interview Path"),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Dev Reasoning Path")).not.toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Math Speed" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  test("supports keyboard route navigation and disclosure toggles", async () => {
    render(
      <MemoryRouter>
        <RoadmapView />
      </MemoryRouter>,
    );

    const allRoutesTab = screen.getByRole("tab", { name: "Todas las rutas" });
    fireEvent.focus(allRoutesTab);
    fireEvent.keyDown(allRoutesTab, { key: "ArrowRight" });

    const englishTab = screen.getByRole("tab", { name: "English Interview" });
    fireEvent.keyDown(englishTab, { key: "ArrowRight" });

    const mathSpeedTab = screen.getByRole("tab", { name: "Math Speed" });
    await waitFor(() => {
      expect(mathSpeedTab).toHaveFocus();
      expect(mathSpeedTab).toHaveAttribute("aria-selected", "true");
    });
    expect(screen.getByText("Math Speed Path")).toBeInTheDocument();

    const moduleToggle = screen.getByRole("button", {
      name: "Alternar modulo Math Speed Path",
    });
    expect(moduleToggle).toHaveAttribute("aria-expanded", "true");

    fireEvent.focus(moduleToggle);
    fireEvent.keyDown(moduleToggle, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    await waitFor(() => {
      expect(moduleToggle).toHaveAttribute("aria-expanded", "false");
    });
    expect(
      screen.queryByRole("button", {
        name: "Alternar unidad Warmup Drills",
      }),
    ).not.toBeInTheDocument();
  });

  test("builds guided launch links for roadmap nodes", async () => {
    render(
      <MemoryRouter>
        <RoadmapView />
      </MemoryRouter>,
    );

    const openerNode = await screen.findByRole("button", {
      name: /Interview opener/i,
    });
    fireEvent.click(openerNode);

    await waitFor(() => {
      expect(
        screen.getByRole("link", { name: "Iniciar Practica" }),
      ).toBeInTheDocument();
    });

    const launchLink = screen.getAllByRole("link", {
      name: "Iniciar Practica",
    })[0];

    expect(launchLink).toHaveAttribute(
      "href",
      expect.stringContaining("roadmap=1"),
    );
    expect(launchLink).toHaveAttribute(
      "href",
      expect.stringContaining("autostart=1"),
    );
    expect(launchLink).toHaveAttribute(
      "href",
      expect.stringContaining("roadmapNode="),
    );
    expect(launchLink).toHaveAttribute(
      "href",
      expect.stringContaining("gameId="),
    );
  });

  test("shows roadmap rewards after completing a full unit", async () => {
    render(
      <MemoryRouter>
        <RoadmapView />
      </MemoryRouter>,
    );

    const openerNode = await screen.findByRole("button", {
      name: /Interview opener/i,
    });
    fireEvent.click(openerNode);

    await waitFor(() => {
      expect(
        screen.getByLabelText("Mastery para Interview opener"),
      ).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText("Mastery para Interview opener"), {
      target: { value: "70" },
    });
    fireEvent.click(
      screen.getByRole("button", {
        name: "Registrar mastery para Interview opener",
      }),
    );

    let fixSlipsNode = await screen.findByRole("button", {
      name: /Fix grammar slips/i,
    });
    fireEvent.click(fixSlipsNode);

    await waitFor(() => {
      expect(
        screen.getByLabelText("Mastery para Fix grammar slips"),
      ).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText("Mastery para Fix grammar slips"), {
      target: { value: "70" },
    });
    fireEvent.click(
      screen.getByRole("button", {
        name: "Registrar mastery para Fix grammar slips",
      }),
    );

    expect(
      screen.getAllByText("Unidad completada: Foundation Answers")[0],
    ).toBeInTheDocument();
    expect(addGlobalXpMock).toHaveBeenCalledWith(40);
    expect(
      await screen.findByRole("dialog", {
        name: "Unidad completada: Foundation Answers",
      }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: "Continuar" }),
    ).toBeInTheDocument();
  }, 15000);
});
