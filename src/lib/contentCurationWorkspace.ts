import type { LintableAuthoredContentRow } from "@/lib/contentAuthoringLinter";

export type ContentCurationStatus = "pending" | "approved" | "rejected";

export interface ContentCurationWorkspaceRow {
  id: string;
  order: number;
  rowNumber: number;
  status: ContentCurationStatus;
  record: LintableAuthoredContentRow["record"];
}

export interface ContentCurationWorkspaceFilters {
  search?: string;
  skill?: string;
  status?: ContentCurationStatus | "all";
  format?: string;
  routeObjective?: string;
}

export interface UpsertContentCurationWorkspaceRowInput {
  rowId?: string;
  status: ContentCurationStatus;
  record: LintableAuthoredContentRow["record"];
}

const normalizeText = (value: string) =>
  value.trim().toLowerCase().replace(/\s+/g, " ");

const normalizeWorkspaceRows = (
  rows: ContentCurationWorkspaceRow[],
): ContentCurationWorkspaceRow[] =>
  rows.map((row, index) => ({
    ...row,
    order: index,
  }));

export const createContentCurationWorkspaceRows = (
  rows: LintableAuthoredContentRow[],
): ContentCurationWorkspaceRow[] =>
  rows.map((row, index) => ({
    id: `curation-row-${row.rowNumber}`,
    order: index,
    rowNumber: row.rowNumber,
    status: "pending",
    record: row.record,
  }));

export const createLintableRowsFromCurationWorkspace = (
  rows: ContentCurationWorkspaceRow[],
): LintableAuthoredContentRow[] =>
  rows.map((row) => ({
    rowNumber: row.rowNumber,
    record: row.record,
  }));

export const filterContentCurationWorkspaceRows = (
  rows: ContentCurationWorkspaceRow[],
  filters: ContentCurationWorkspaceFilters = {},
): ContentCurationWorkspaceRow[] => {
  const search = normalizeText(filters.search || "");
  const skill = filters.skill || "all";
  const status = filters.status || "all";
  const format = filters.format || "all";
  const routeObjective = filters.routeObjective || "all";

  return rows.filter((row) => {
    if (skill !== "all" && row.record.skill !== skill) {
      return false;
    }
    if (status !== "all" && row.status !== status) {
      return false;
    }
    if (format !== "all" && row.record.format !== format) {
      return false;
    }
    const rowRouteObjective = row.record.metadata.routeObjective || "none";
    if (routeObjective !== "all" && rowRouteObjective !== routeObjective) {
      return false;
    }

    if (!search) {
      return true;
    }

    const searchableParts = [
      row.record.prompt,
      row.record.answer || "",
      row.record.metadata.topic || "",
      row.record.metadata.routeObjective || "",
      ...row.record.tags,
    ];

    return searchableParts.some((value) =>
      normalizeText(value).includes(search),
    );
  });
};

export const reorderContentCurationWorkspaceRows = (
  rows: ContentCurationWorkspaceRow[],
  activeId: string,
  overId: string,
): ContentCurationWorkspaceRow[] => {
  const activeIndex = rows.findIndex((row) => row.id === activeId);
  const overIndex = rows.findIndex((row) => row.id === overId);

  if (activeIndex === -1 || overIndex === -1 || activeIndex === overIndex) {
    return rows;
  }

  const next = [...rows];
  const [moved] = next.splice(activeIndex, 1);
  next.splice(overIndex, 0, moved);
  return normalizeWorkspaceRows(next);
};

export const moveContentCurationWorkspaceRow = (
  rows: ContentCurationWorkspaceRow[],
  rowId: string,
  direction: "up" | "down",
  scopeRowIds?: string[],
): ContentCurationWorkspaceRow[] => {
  const scopedRowIds = scopeRowIds?.length
    ? rows
        .filter((row) => scopeRowIds.includes(row.id))
        .map((row) => row.id)
    : rows.map((row) => row.id);

  const currentIndex = scopedRowIds.indexOf(rowId);
  if (currentIndex === -1) {
    return rows;
  }

  const targetIndex =
    direction === "up" ? currentIndex - 1 : currentIndex + 1;

  if (targetIndex < 0 || targetIndex >= scopedRowIds.length) {
    return rows;
  }

  return reorderContentCurationWorkspaceRows(rows, rowId, scopedRowIds[targetIndex]);
};

export const upsertContentCurationWorkspaceRow = (
  rows: ContentCurationWorkspaceRow[],
  input: UpsertContentCurationWorkspaceRowInput,
): ContentCurationWorkspaceRow[] => {
  const existingIndex = input.rowId
    ? rows.findIndex((row) => row.id === input.rowId)
    : -1;

  if (existingIndex >= 0) {
    return rows.map((row) =>
      row.id === input.rowId
        ? {
            ...row,
            status: input.status,
            record: input.record,
          }
        : row,
    );
  }

  const nextRowNumber =
    rows.reduce((highest, row) => Math.max(highest, row.rowNumber), 0) + 1;

  return normalizeWorkspaceRows([
    ...rows,
    {
      id: `curation-row-${nextRowNumber}`,
      order: rows.length,
      rowNumber: nextRowNumber,
      status: input.status,
      record: input.record,
    },
  ]);
};

export const setContentCurationWorkspaceStatus = (
  rows: ContentCurationWorkspaceRow[],
  rowIds: string[],
  status: ContentCurationStatus,
): ContentCurationWorkspaceRow[] => {
  const selected = new Set(rowIds);
  return rows.map((row) =>
    selected.has(row.id)
      ? {
          ...row,
          status,
        }
      : row,
  );
};

export const resetContentCurationWorkspaceStatus = (
  rows: ContentCurationWorkspaceRow[],
  rowIds: string[],
): ContentCurationWorkspaceRow[] =>
  setContentCurationWorkspaceStatus(rows, rowIds, "pending");
