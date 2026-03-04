import React from "react";
import { describe, test, expect, beforeEach, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import StudyDocsView from "@/pages/StudyDocsView";

class WorkerMock {
  static instances: WorkerMock[] = [];

  onmessage: ((event: MessageEvent) => void) | null = null;
  onerror: ((event: Event) => void) | null = null;
  postMessage = vi.fn();
  terminate = vi.fn();

  constructor() {
    WorkerMock.instances.push(this);
  }
}

describe("StudyDocsView", () => {
  beforeEach(() => {
    WorkerMock.instances = [];
    vi.stubGlobal("Worker", WorkerMock as unknown as typeof Worker);
  });

  test("delegates document search to the worker and renders async results", async () => {
    render(
      <MemoryRouter>
        <StudyDocsView />
      </MemoryRouter>,
    );

    const worker = WorkerMock.instances[0];
    expect(worker.postMessage).toHaveBeenCalledWith({ term: "" });

    act(() => {
      worker.onmessage?.({
        data: {
          results: [
            {
              name: "MyDoc.html",
              path: "MyDoc.html",
              type: "file",
            },
          ],
        },
      } as MessageEvent);
    });

    expect(await screen.findByText("MyDoc.html")).toBeInTheDocument();

    await userEvent.type(
      screen.getByPlaceholderText("Search docs..."),
      "mydoc",
    );
    expect(worker.postMessage).toHaveBeenLastCalledWith({ term: "mydoc" });
  });

  test("switches to docs game mode", async () => {
    render(
      <MemoryRouter>
        <StudyDocsView />
      </MemoryRouter>,
    );

    const worker = WorkerMock.instances[0];
    act(() => {
      worker.onmessage?.({
        data: {
          results: [
            {
              name: "Cloud-Native & DevOps",
              path: "Cloud-Native & DevOps",
              type: "directory",
              children: [
                {
                  name: "Chaos_Engineering.html",
                  path: "Cloud-Native & DevOps/Chaos_Engineering.html",
                  type: "file",
                },
                {
                  name: "GitOps.html",
                  path: "Cloud-Native & DevOps/GitOps.html",
                  type: "file",
                },
              ],
            },
            {
              name: "Comparación",
              path: "Comparación",
              type: "directory",
              children: [
                {
                  name: "GraphQL_vs._REST.html",
                  path: "Comparación/GraphQL_vs._REST.html",
                  type: "file",
                },
              ],
            },
          ],
        },
      } as MessageEvent);
    });

    await userEvent.click(screen.getByRole("button", { name: /hunt/i }));

    expect(screen.getByText("Doc Hunt")).toBeInTheDocument();
  });
});
