import { describe, expect, test } from "vitest";
import {
  createLintableRowsFromCurationWorkspace,
  createContentCurationWorkspaceRows,
  filterContentCurationWorkspaceRows,
  moveContentCurationWorkspaceRow,
  reorderContentCurationWorkspaceRows,
  resetContentCurationWorkspaceStatus,
  setContentCurationWorkspaceStatus,
  upsertContentCurationWorkspaceRow,
} from "@/lib/contentCurationWorkspace";

const workspaceRows = createContentCurationWorkspaceRows([
  {
    rowNumber: 2,
    record: {
      source: "manual",
      skill: "english",
      difficulty: "core",
      format: "flashcard",
      prompt: "Give a concise interview answer about ownership",
      answer: "I take ownership early and align stakeholders.",
      alternatives: [],
      hints: [],
      tags: ["interview"],
      metadata: {
        routeObjective: "english_interview",
        topic: "behavioral",
        cefr: "B1",
      },
      active: true,
    },
  },
  {
    rowNumber: 3,
    record: {
      source: "manual",
      skill: "dev",
      difficulty: "core",
      format: "open_response",
      prompt: "Explain idempotency in APIs in one sentence",
      answer: "Repeated requests produce the same effect.",
      alternatives: [],
      hints: [],
      tags: ["backend"],
      metadata: {
        routeObjective: "dev_reasoning",
        topic: "backend",
        cefr: "B2",
      },
      active: true,
    },
  },
  {
    rowNumber: 4,
    record: {
      source: "manual",
      skill: "math",
      difficulty: "foundation",
      format: "flashcard",
      prompt: "What is the value of 8 plus 7?",
      answer: "15",
      alternatives: [],
      hints: [],
      tags: ["arithmetic"],
      metadata: {
        routeObjective: "math_speed",
        topic: "addition",
        cefr: "A2",
      },
      active: true,
    },
  },
]);

describe("contentCurationWorkspace", () => {
  test("filters rows by search, status and skill", () => {
    const reviewed = setContentCurationWorkspaceStatus(
      workspaceRows,
      [workspaceRows[1].id],
      "approved",
    );

    const result = filterContentCurationWorkspaceRows(reviewed, {
      search: "api",
      status: "approved",
      skill: "dev",
    });

    expect(result).toHaveLength(1);
    expect(result[0].rowNumber).toBe(3);
  });

  test("reorders rows and normalizes order indexes", () => {
    const reordered = reorderContentCurationWorkspaceRows(
      workspaceRows,
      workspaceRows[2].id,
      workspaceRows[0].id,
    );

    expect(reordered.map((row) => row.rowNumber)).toEqual([4, 2, 3]);
    expect(reordered.map((row) => row.order)).toEqual([0, 1, 2]);
  });

  test("supports move up/down helpers and batch status updates", () => {
    const moved = moveContentCurationWorkspaceRow(
      workspaceRows,
      workspaceRows[1].id,
      "down",
    );
    expect(moved.map((row) => row.rowNumber)).toEqual([2, 4, 3]);

    const rejected = setContentCurationWorkspaceStatus(
      moved,
      [moved[0].id, moved[1].id],
      "rejected",
    );
    expect(rejected.map((row) => row.status)).toEqual([
      "rejected",
      "rejected",
      "pending",
    ]);

    const reset = resetContentCurationWorkspaceStatus(rejected, [
      rejected[0].id,
      rejected[1].id,
    ]);
    expect(reset.every((row) => row.status === "pending")).toBe(true);
  });

  test("moves rows within the currently visible subset when scope ids are provided", () => {
    const expandedRows = createContentCurationWorkspaceRows([
      {
        rowNumber: 2,
        record: workspaceRows[0].record,
      },
      {
        rowNumber: 3,
        record: {
          ...workspaceRows[1].record,
          prompt: "Explain idempotency in APIs in one sentence",
        },
      },
      {
        rowNumber: 4,
        record: workspaceRows[2].record,
      },
      {
        rowNumber: 5,
        record: {
          ...workspaceRows[1].record,
          prompt: "Explain circuit breakers in one sentence",
          tags: ["backend", "resilience"],
          metadata: {
            ...workspaceRows[1].record.metadata,
            topic: "resilience",
          },
        },
      },
    ]);

    const moved = moveContentCurationWorkspaceRow(
      expandedRows,
      expandedRows[1].id,
      "down",
      [expandedRows[1].id, expandedRows[3].id],
    );

    expect(moved.map((row) => row.rowNumber)).toEqual([2, 4, 5, 3]);
  });

  test("upserts rows and exposes lintable rows without losing row numbers", () => {
    const created = upsertContentCurationWorkspaceRow(workspaceRows, {
      record: {
        ...workspaceRows[1].record,
        prompt: "Explain eventual consistency in one sentence",
        answer:
          "Replicas converge over time instead of synchronizing immediately.",
        tags: ["backend", "consistency"],
      },
      status: "approved",
    });

    expect(created).toHaveLength(4);
    expect(created[3].rowNumber).toBe(5);
    expect(created[3].status).toBe("approved");

    const updated = upsertContentCurationWorkspaceRow(created, {
      rowId: created[1].id,
      record: {
        ...created[1].record,
        prompt: "Explain idempotency for retries in one sentence",
      },
      status: "rejected",
    });

    expect(updated[1].record.prompt).toBe(
      "Explain idempotency for retries in one sentence",
    );
    expect(updated[1].status).toBe("rejected");
    expect(createLintableRowsFromCurationWorkspace(updated)[1].rowNumber).toBe(
      updated[1].rowNumber,
    );
  });
});
