import React from "react";
import { act } from "react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import StudyDocsGameView from "@/pages/StudyDocsGameView";
import { ADAPTIVE_DIFFICULTY_LOG_KEY } from "@/lib/adaptiveDifficulty";

const { toastMock } = vi.hoisted(() => ({
  toastMock: {
    success: vi.fn(),
    info: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("@/components/ui/Toast", () => ({
  toast: toastMock,
}));

vi.mock("@/hooks/useNetworkStatus", () => ({
  useNetworkStatus: () => ({ isOnline: true }),
}));

const fileTree = [
  {
    name: "Category",
    path: "Category",
    type: "directory" as const,
    children: [
      { name: "doc1.html", path: "Category/doc1.html", type: "file" as const },
      { name: "doc2.html", path: "Category/doc2.html", type: "file" as const },
      { name: "doc3.html", path: "Category/doc3.html", type: "file" as const },
      { name: "doc4.html", path: "Category/doc4.html", type: "file" as const },
    ],
  },
];

const buildDocHtml = (term: string, suffix: string) => `
  <html>
    <body>
      <h2>${term} architecture focus</h2>
      <p>
        This is a long documentation paragraph for ${term} ${suffix}
        that contains enough detail to build a meaningful question and keeps
        the text length above seventy characters for parser validation.
      </p>
      <span class="tooltip" data-tooltip-text="Detailed explanation about ${term} runtime behavior and production implications for reliability.">
        ${term}
      </span>
      <ul>
        <li><strong>${term} Layer:</strong> Defines a specific operational role inside distributed services and integration flows.</li>
      </ul>
    </body>
  </html>
`;

const docsByPath: Record<string, string> = {
  "Category/doc1.html": buildDocHtml(
    "Orchestrator",
    "for pipelines and queue handling",
  ),
  "Category/doc2.html": buildDocHtml(
    "Gateway",
    "for traffic shaping and authentication",
  ),
  "Category/doc3.html": buildDocHtml(
    "Indexer",
    "for retrieval and ranking operations",
  ),
  "Category/doc4.html": buildDocHtml(
    "Replicator",
    "for backup and synchronization logic",
  ),
};

describe("StudyDocsGameView", () => {
  const renderView = (entries = ["/docs?mode=game"]) =>
    render(
      <MemoryRouter initialEntries={entries}>
        <StudyDocsGameView fileTree={fileTree} />
      </MemoryRouter>,
    );

  const getAnswerButtons = () =>
    screen
      .getAllByRole("button")
      .filter((button) => button.className.includes("min-h-[60px]"));

  const startGame = async () => {
    fireEvent.click(screen.getByRole("button", { name: "Iniciar juego" }));
    expect(
      await screen.findByText("Combo", {}, { timeout: 7000 }),
    ).toBeInTheDocument();
  };

  const answerWithOptionIndex = async (index: number) => {
    const buttons = getAnswerButtons();
    expect(buttons.length).toBeGreaterThan(index);
    await act(async () => {
      fireEvent.click(buttons[index]);
      await new Promise((resolve) => {
        setTimeout(resolve, 900);
      });
    });
    await waitFor(() => {
      expect(
        screen.queryByText("Cargando siguiente reto..."),
      ).not.toBeInTheDocument();
    });
  };

  beforeEach(() => {
    localStorage.clear();
    toastMock.success.mockReset();
    toastMock.info.mockReset();
    toastMock.error.mockReset();
    vi.spyOn(Math, "random").mockReturnValue(0.9999999);

    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: unknown) => {
        const url = String(input);
        const marker = "study-docs/";
        const markerIndex = url.indexOf(marker);
        const path =
          markerIndex >= 0
            ? decodeURIComponent(url.slice(markerIndex + marker.length))
            : "";
        const body = docsByPath[path] || "";
        return {
          ok: body.length > 0,
          text: async () => body,
        } as Response;
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  test("renders start panel when file tree is available", () => {
    renderView();

    expect(screen.getByText("Doc Hunt")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Iniciar juego" }),
    ).toBeInTheDocument();
  });

  test("auto-downshifts difficulty after 3 wrong answers and logs cause", async () => {
    renderView();

    fireEvent.click(screen.getAllByRole("button", { name: "Hard" })[0]);
    await startGame();

    for (let index = 0; index < 3; index += 1) {
      await answerWithOptionIndex(1);
    }

    expect(toastMock.info).toHaveBeenCalled();

    const rawLog = localStorage.getItem(ADAPTIVE_DIFFICULTY_LOG_KEY);
    expect(rawLog).toBeTruthy();
    const log = JSON.parse(rawLog || "[]");
    expect(log.length).toBeGreaterThan(0);
    expect(log[log.length - 1]).toMatchObject({
      gameId: "docs_game",
      previousLevel: "hard",
      nextLevel: "normal",
      reason: "rule_downshift",
      trigger: "consecutive_wrong",
      changed: true,
    });
  }, 15000);

  test("auto-upshifts difficulty after 3 correct answers and logs cause", async () => {
    renderView();

    fireEvent.click(screen.getAllByRole("button", { name: "Easy" })[0]);
    await startGame();

    for (let index = 0; index < 3; index += 1) {
      await answerWithOptionIndex(0);
    }

    expect(toastMock.success).toHaveBeenCalled();

    const rawLog = localStorage.getItem(ADAPTIVE_DIFFICULTY_LOG_KEY);
    expect(rawLog).toBeTruthy();
    const log = JSON.parse(rawLog || "[]");
    expect(log.length).toBeGreaterThan(0);
    expect(log[log.length - 1]).toMatchObject({
      gameId: "docs_game",
      previousLevel: "easy",
      nextLevel: "normal",
      reason: "rule_upshift",
      trigger: "consecutive_correct",
      changed: true,
    });
  }, 15000);
});
