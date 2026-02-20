import React from "react";
import { describe, test, expect, beforeEach, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StudyDocsView from "./StudyDocsView";

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
    render(<StudyDocsView />);

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
});
