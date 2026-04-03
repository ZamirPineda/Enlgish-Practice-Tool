import React from "react";
import { describe, expect, test } from "vitest";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import ContentCurationView from "@/pages/ContentCurationView";

describe("ContentCurationView", () => {
  test("loads the demo batch, filters rows, rejects the filtered set and supports manual reordering", async () => {
    render(<ContentCurationView />);

    expect(
      await screen.findByText(
        "Give a concise interview answer about ownership",
      ),
    ).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Filter by skill"), {
      target: { value: "dev" },
    });

    expect(
      screen.queryByText("Give a concise interview answer about ownership"),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText("Explain idempotency in APIs in one sentence"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Explain circuit breakers in one sentence"),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Reject filtered" }));

    const table = screen.getByRole("table");
    await waitFor(() => {
      expect(within(table).getAllByText("Rejected")).toHaveLength(2);
    });

    fireEvent.click(screen.getByRole("button", { name: "Move row 2 down" }));

    await waitFor(() => {
      const bodyRows = within(table).getAllByRole("row");
      expect(bodyRows[1]).toHaveTextContent(
        "Explain circuit breakers in one sentence",
      );
      expect(bodyRows[2]).toHaveTextContent(
        "Explain idempotency in APIs in one sentence",
      );
    });
  });

  test("validates typed authoring, creates a new row and edits an existing one", async () => {
    render(<ContentCurationView />);

    expect(
      await screen.findByText(
        "Give a concise interview answer about ownership",
      ),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Create row" }));

    expect(await screen.findByText("Prompt is required")).toBeInTheDocument();
    expect(screen.getByText("Answer is required")).toBeInTheDocument();
    expect(screen.getByText("Add at least one tag")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Editor skill"), {
      target: { value: "dev" },
    });
    fireEvent.change(screen.getByLabelText("Editor format"), {
      target: { value: "open_response" },
    });
    fireEvent.change(screen.getByLabelText("Editor review status"), {
      target: { value: "approved" },
    });
    fireEvent.change(screen.getByLabelText("Editor prompt"), {
      target: { value: "Explain eventual consistency in one sentence" },
    });
    fireEvent.change(screen.getByLabelText("Editor answer"), {
      target: {
        value:
          "Replicas converge over time instead of synchronizing immediately.",
      },
    });
    fireEvent.change(screen.getByLabelText("Editor tags"), {
      target: { value: "backend\nconsistency" },
    });
    fireEvent.change(screen.getByLabelText("Editor route objective"), {
      target: { value: "dev_reasoning" },
    });
    fireEvent.change(screen.getByLabelText("Editor topic"), {
      target: { value: "distributed-systems" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Create row" }));

    expect(
      await screen.findByText("Explain eventual consistency in one sentence"),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Edit row 2" }));

    const promptField = screen.getByLabelText("Editor prompt");
    fireEvent.change(promptField, {
      target: { value: "Explain idempotency for retries in one sentence" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Save changes" }));

    expect(
      await screen.findByText(
        "Explain idempotency for retries in one sentence",
      ),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Explain idempotency in APIs in one sentence"),
    ).not.toBeInTheDocument();
  });
});
