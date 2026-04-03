import React from "react";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import ContentCurationEditor, {
  type ContentCurationEditorSubmitInput,
} from "@/components/ContentCurationEditor";
import Card from "@/components/ui/Card";
import ViewToolbar from "@/components/ui/ViewToolbar";
import { Button } from "@/components/ui/shadcn";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn";
import type {
  AuthoredContentValidationIssue,
  ImportedAuthoredContentResult,
} from "@/lib/contentAuthoringPipeline";
import {
  importAuthoredContent,
  prepareAuthoredContentRowsForReview,
} from "@/lib/contentAuthoringPipeline";
import type { ContentAuthoringLintReport } from "@/lib/contentAuthoringLinter";
import {
  createLintableRowsFromCurationWorkspace,
  createContentCurationWorkspaceRows,
  filterContentCurationWorkspaceRows,
  moveContentCurationWorkspaceRow,
  reorderContentCurationWorkspaceRows,
  resetContentCurationWorkspaceStatus,
  setContentCurationWorkspaceStatus,
  upsertContentCurationWorkspaceRow,
  type ContentCurationStatus,
  type ContentCurationWorkspaceFilters,
  type ContentCurationWorkspaceRow,
} from "@/lib/contentCurationWorkspace";

const DEMO_JSON_BATCH = JSON.stringify(
  {
    packVersion: "1.3.0",
    sourceLabel: "ops_demo_batch",
    items: [
      {
        source: "manual",
        skill: "english",
        difficulty: "core",
        format: "flashcard",
        prompt: "Give a concise interview answer about ownership",
        answer: "I take ownership early and align stakeholders on risks.",
        tags: ["interview", "ownership"],
        metadata: {
          routeObjective: "english_interview",
          topic: "behavioral",
          cefr: "B1",
        },
      },
      {
        source: "manual",
        skill: "dev",
        difficulty: "core",
        format: "open_response",
        prompt: "Explain idempotency in APIs in one sentence",
        answer: "Repeated requests should keep the same effect on state.",
        tags: ["backend", "api"],
        metadata: {
          routeObjective: "dev_reasoning",
          topic: "backend",
          cefr: "B2",
        },
      },
      {
        source: "manual",
        skill: "math",
        difficulty: "foundation",
        format: "flashcard",
        prompt: "What is the value of 8 plus 7?",
        answer: "15",
        tags: ["arithmetic"],
        metadata: {
          routeObjective: "math_speed",
          topic: "addition",
          cefr: "A2",
        },
      },
      {
        source: "manual",
        skill: "dev",
        difficulty: "core",
        format: "open_response",
        prompt: "Explain circuit breakers in one sentence",
        answer: "They stop repeated failing calls until the dependency recovers.",
        tags: ["backend", "resilience"],
        metadata: {
          routeObjective: "dev_reasoning",
          topic: "resilience",
          cefr: "B2",
        },
      },
    ],
  },
  null,
  2,
);

const DEMO_CSV_BATCH = [
  "source,skill,difficulty,format,prompt,answer,tags,topic,routeObjective,cefr",
  'manual,english,core,flashcard,"Give a concise interview answer about ownership","I take ownership early and align stakeholders on risks.","interview|ownership",behavioral,english_interview,B1',
  'manual,dev,core,open_response,"Explain idempotency in APIs in one sentence","Repeated requests should keep the same effect on state.","backend|api",backend,dev_reasoning,B2',
  'manual,math,foundation,flashcard,"What is the value of 8 plus 7?","15","arithmetic",addition,math_speed,A2',
  'manual,dev,core,open_response,"Explain circuit breakers in one sentence","They stop repeated failing calls until the dependency recovers.","backend|resilience",resilience,dev_reasoning,B2',
].join("\n");

const formatIssuePreview = (issues: AuthoredContentValidationIssue[]) =>
  issues.slice(0, 5);

const DEFAULT_CURATION_PACK_VERSION = "1.0.0";
const DEFAULT_CURATION_SOURCE_LABEL = "curation_desk";

const statusClasses: Record<ContentCurationStatus, string> = {
  pending: "bg-amber-500/15 text-amber-700",
  approved: "bg-emerald-500/15 text-emerald-700",
  rejected: "bg-rose-500/15 text-rose-700",
};

const transformToString = (
  transform: { x: number; y: number; scaleX: number; scaleY: number } | null,
) =>
  transform
    ? `translate3d(${Math.round(transform.x)}px, ${Math.round(transform.y)}px, 0)`
    : undefined;

const statusLabel = (status: ContentCurationStatus) =>
  status.charAt(0).toUpperCase() + status.slice(1);

const getVisibleRowIds = (rows: ContentCurationWorkspaceRow[]) =>
  rows.map((row) => row.id);

const serializeWorkspaceRowsToJsonDocument = (
  rows: ContentCurationWorkspaceRow[],
  packVersion: string,
  sourceLabel: string,
) =>
  JSON.stringify(
    {
      packVersion,
      sourceLabel,
      items: createLintableRowsFromCurationWorkspace(rows).map((row) => row.record),
    },
    null,
    2,
  );

const MetricCard = ({
  label,
  value,
  helper,
}: {
  label: string;
  value: React.ReactNode;
  helper: string;
}) => (
  <div className="rounded-2xl border border-border bg-surface-2/80 p-4">
    <p className="text-xs font-bold uppercase tracking-widest text-text-muted">
      {label}
    </p>
    <p className="mt-2 text-2xl font-black text-text-primary">{value}</p>
    <p className="mt-1 text-sm text-text-secondary">{helper}</p>
  </div>
);

const SortableWorkspaceRow = ({
  row,
  onEdit,
  onApprove,
  onReject,
  onReset,
  onMoveUp,
  onMoveDown,
}: {
  row: ReturnType<ReturnType<typeof useReactTable<ContentCurationWorkspaceRow>>["getRowModel"]>["rows"][number];
  onEdit: () => void;
  onApprove: () => void;
  onReject: () => void;
  onReset: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id: row.original.id,
    });

  return (
    <TableRow
      ref={setNodeRef}
      style={{
        transform: transformToString(transform),
        transition,
      }}
      className={isDragging ? "relative z-10 bg-surface-hover shadow-xl" : ""}
    >
      {row.getVisibleCells().map((cell) => {
        if (cell.column.id === "drag") {
          return (
            <TableCell key={cell.id} className="w-12">
              <button
                type="button"
                className="rounded-md border border-border bg-surface-2 px-2 py-1 text-text-secondary hover:bg-surface-hover"
                aria-label={`Reorder row ${row.original.rowNumber}`}
                {...attributes}
                {...listeners}
              >
                ::
              </button>
            </TableCell>
          );
        }

        if (cell.column.id === "actions") {
          return (
            <TableCell key={cell.id} className="w-[220px]">
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={onEdit}
                  aria-label={`Edit row ${row.original.rowNumber}`}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={onMoveUp}
                  aria-label={`Move row ${row.original.rowNumber} up`}
                >
                  Up
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={onMoveDown}
                  aria-label={`Move row ${row.original.rowNumber} down`}
                >
                  Down
                </Button>
                <Button
                  size="sm"
                  variant="success"
                  onClick={onApprove}
                  aria-label={`Approve row ${row.original.rowNumber}`}
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onReject}
                  aria-label={`Reject row ${row.original.rowNumber}`}
                >
                  Reject
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onReset}
                  aria-label={`Reset row ${row.original.rowNumber}`}
                >
                  Reset
                </Button>
              </div>
            </TableCell>
          );
        }

        return (
          <TableCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

const ContentCurationView: React.FC = () => {
  const [sourceFormat, setSourceFormat] = React.useState<"json" | "csv">("json");
  const [contentInput, setContentInput] = React.useState(DEMO_JSON_BATCH);
  const [workspaceRows, setWorkspaceRows] = React.useState<
    ContentCurationWorkspaceRow[]
  >([]);
  const [issues, setIssues] = React.useState<AuthoredContentValidationIssue[]>([]);
  const [lintReport, setLintReport] = React.useState<ContentAuthoringLintReport | null>(
    null,
  );
  const [bundleResult, setBundleResult] = React.useState<
    ImportedAuthoredContentResult["bundle"] | null
  >(null);
  const [loadError, setLoadError] = React.useState<string | null>(null);
  const [draftPackVersion, setDraftPackVersion] = React.useState(
    DEFAULT_CURATION_PACK_VERSION,
  );
  const [draftSourceLabel, setDraftSourceLabel] = React.useState(
    DEFAULT_CURATION_SOURCE_LABEL,
  );
  const [selectedEditorRowId, setSelectedEditorRowId] = React.useState<string | null>(
    null,
  );
  const [filters, setFilters] = React.useState<ContentCurationWorkspaceFilters>({
    search: "",
    skill: "all",
    status: "all",
    format: "all",
    routeObjective: "all",
  });

  const loadBatch = React.useCallback(
    (format: "json" | "csv", content: string) => {
      try {
        const prepared = prepareAuthoredContentRowsForReview({
          sourceFormat: format,
          content,
        });
        const imported = importAuthoredContent({
          sourceFormat: format,
          content,
        });

        setWorkspaceRows(createContentCurationWorkspaceRows(prepared.rows));
        setIssues(prepared.issues);
        setLintReport(imported.lintReport);
        setBundleResult(imported.bundle);
        setDraftPackVersion(imported.bundle.packVersion);
        setDraftSourceLabel(imported.bundle.sourceLabel);
        setSelectedEditorRowId(null);
        setLoadError(null);
      } catch (error) {
        setWorkspaceRows([]);
        setIssues([]);
        setLintReport(null);
        setBundleResult(null);
        setSelectedEditorRowId(null);
        setLoadError(
          error instanceof Error
            ? error.message
            : "Unable to parse the current authoring batch.",
        );
      }
    },
    [],
  );

  const syncWorkspaceDraft = React.useCallback(
    (rows: ContentCurationWorkspaceRow[]) => {
      const nextContent = serializeWorkspaceRowsToJsonDocument(
        rows,
        draftPackVersion,
        draftSourceLabel,
      );
      const imported = importAuthoredContent({
        content: nextContent,
        sourceFormat: "json",
        packVersion: draftPackVersion,
        sourceLabel: draftSourceLabel,
      });

      setWorkspaceRows(rows);
      setIssues(imported.issues);
      setLintReport(imported.lintReport);
      setBundleResult(imported.bundle);
      setContentInput(nextContent);
      setSourceFormat("json");
      setLoadError(null);
    },
    [draftPackVersion, draftSourceLabel],
  );

  React.useEffect(() => {
    loadBatch("json", DEMO_JSON_BATCH);
  }, [loadBatch]);

  const visibleRows = React.useMemo(
    () => filterContentCurationWorkspaceRows(workspaceRows, filters),
    [workspaceRows, filters],
  );
  const selectedEditorRow = React.useMemo(
    () => workspaceRows.find((row) => row.id === selectedEditorRowId) || null,
    [selectedEditorRowId, workspaceRows],
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const counts = React.useMemo(
    () => ({
      pending: workspaceRows.filter((row) => row.status === "pending").length,
      approved: workspaceRows.filter((row) => row.status === "approved").length,
      rejected: workspaceRows.filter((row) => row.status === "rejected").length,
    }),
    [workspaceRows],
  );

  const filterOptions = React.useMemo(
    () => ({
      skills: Array.from(new Set(workspaceRows.map((row) => row.record.skill))).sort(),
      formats: Array.from(new Set(workspaceRows.map((row) => row.record.format))).sort(),
      routeObjectives: Array.from(
        new Set(
          workspaceRows.map(
            (row) => row.record.metadata.routeObjective || "none",
          ),
        ),
      ).sort(),
    }),
    [workspaceRows],
  );

  const handleDragEnd = React.useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }

    syncWorkspaceDraft(
      reorderContentCurationWorkspaceRows(
        workspaceRows,
        String(active.id),
        String(over.id),
      ),
    );
  }, [syncWorkspaceDraft, workspaceRows]);

  const setFilteredStatus = React.useCallback((status: ContentCurationStatus) => {
    const rowIds = visibleRows.map((row) => row.id);
    setWorkspaceRows((previous) =>
      setContentCurationWorkspaceStatus(previous, rowIds, status),
    );
  }, [visibleRows]);

  const resetFilteredStatus = React.useCallback(() => {
    const rowIds = visibleRows.map((row) => row.id);
    setWorkspaceRows((previous) =>
      resetContentCurationWorkspaceStatus(previous, rowIds),
    );
  }, [visibleRows]);

  const handleEditorSubmit = React.useCallback(
    (input: ContentCurationEditorSubmitInput) => {
      const nextRows = upsertContentCurationWorkspaceRow(workspaceRows, input);
      const submittedRow =
        nextRows.find((row) => row.id === input.rowId) || nextRows[nextRows.length - 1];

      syncWorkspaceDraft(nextRows);
      setSelectedEditorRowId(submittedRow?.id || null);
    },
    [syncWorkspaceDraft, workspaceRows],
  );

  const columns = React.useMemo<ColumnDef<ContentCurationWorkspaceRow>[]>(
    () => [
      {
        id: "drag",
        header: () => null,
        cell: () => null,
      },
      {
        accessorKey: "order",
        header: "Order",
        cell: ({ row }) => (
          <div className="font-semibold text-text-primary">
            {row.original.order + 1}
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <span
            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${statusClasses[row.original.status]}`}
          >
            {statusLabel(row.original.status)}
          </span>
        ),
      },
      {
        id: "prompt",
        header: "Prompt",
        cell: ({ row }) => (
          <div className="space-y-1">
            <p className="font-semibold text-text-primary">
              {row.original.record.prompt}
            </p>
            {row.original.record.answer ? (
              <p className="text-sm text-text-secondary">
                {row.original.record.answer}
              </p>
            ) : null}
          </div>
        ),
      },
      {
        id: "classification",
        header: "Classification",
        cell: ({ row }) => (
          <div className="space-y-1 text-sm">
            <p className="font-semibold text-text-primary">
              {row.original.record.skill} · {row.original.record.format}
            </p>
            <p className="text-text-secondary">
              {row.original.record.metadata.routeObjective || "no route"} ·{" "}
              {row.original.record.metadata.topic || "no topic"}
            </p>
            <p className="text-text-muted">
              {row.original.record.tags.join(", ")}
            </p>
          </div>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: () => null,
      },
    ],
    [],
  );

  const table = useReactTable({
    data: visibleRows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 sm:p-6">
        <Card elevated className="overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 via-sky-400 to-emerald-400" />
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-accent">
                Operations
              </p>
              <h1 className="mt-2 text-3xl font-black text-text-primary">
                Content Curation Desk
              </h1>
              <p className="mt-2 max-w-3xl text-sm text-text-secondary">
                Review valid authored rows, filter operational batches, mark
                approvals or rejects, and reorder the final list before the next
                import/export step.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 md:min-w-[360px]">
              <MetricCard
                label="Pending"
                value={counts.pending}
                helper="Rows not triaged yet"
              />
              <MetricCard
                label="Approved"
                value={counts.approved}
                helper="Ready to continue to ops"
              />
            </div>
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-4">
          <MetricCard
            label="Rejected"
            value={counts.rejected}
            helper="Rows blocked in current batch"
          />
          <MetricCard
            label="Visible"
            value={visibleRows.length}
            helper="Rows after active filters"
          />
          <MetricCard
            label="Issues"
            value={issues.length}
            helper="Schema or quality blockers"
          />
          <MetricCard
            label="Near Duplicates"
            value={lintReport?.nearDuplicateCount || 0}
            helper="Candidates for merge or rewrite"
          />
        </div>

        <ViewToolbar
          left={
            <div className="grid gap-3 md:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm font-semibold text-text-primary">
                Source format
                <select
                  aria-label="Source format"
                  className="h-11 rounded-lg border border-border bg-surface-2 px-3 text-sm"
                  value={sourceFormat}
                  onChange={(event) =>
                    setSourceFormat(event.target.value as "json" | "csv")
                  }
                >
                  <option value="json">JSON</option>
                  <option value="csv">CSV</option>
                </select>
              </label>
              <div className="flex flex-wrap items-end gap-2">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSourceFormat("json");
                    setContentInput(DEMO_JSON_BATCH);
                    loadBatch("json", DEMO_JSON_BATCH);
                  }}
                >
                  Load demo JSON
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSourceFormat("csv");
                    setContentInput(DEMO_CSV_BATCH);
                    loadBatch("csv", DEMO_CSV_BATCH);
                  }}
                >
                  Load demo CSV
                </Button>
              </div>
            </div>
          }
          right={
            <>
              <Button
                variant="secondary"
                onClick={() => loadBatch(sourceFormat, contentInput)}
              >
                Parse batch
              </Button>
              <Button
                variant="success"
                onClick={() => setFilteredStatus("approved")}
                disabled={visibleRows.length === 0}
              >
                Approve filtered
              </Button>
              <Button
                variant="outline"
                onClick={() => setFilteredStatus("rejected")}
                disabled={visibleRows.length === 0}
              >
                Reject filtered
              </Button>
              <Button
                variant="ghost"
                onClick={resetFilteredStatus}
                disabled={visibleRows.length === 0}
              >
                Reset filtered
              </Button>
            </>
          }
        />

        <Card elevated>
          <label className="flex flex-col gap-2 text-sm font-semibold text-text-primary">
            Authoring batch input
            <textarea
              aria-label="Authoring batch input"
              className="min-h-[240px] rounded-xl border border-border bg-surface-2 p-3 font-mono text-xs text-text-primary"
              value={contentInput}
              onChange={(event) => setContentInput(event.target.value)}
              spellCheck={false}
            />
          </label>
          {loadError ? (
            <div className="mt-3 rounded-xl border border-rose-400/30 bg-rose-500/10 p-3 text-sm text-rose-700">
              {loadError}
            </div>
          ) : null}
        </Card>

        <ViewToolbar
          left={
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
              <label className="flex flex-col gap-1 text-sm font-semibold text-text-primary">
                Search
                <input
                  aria-label="Search rows"
                  className="h-11 rounded-lg border border-border bg-surface-2 px-3 text-sm"
                  placeholder="Prompt, tags, topic..."
                  value={filters.search || ""}
                  onChange={(event) =>
                    setFilters((previous) => ({
                      ...previous,
                      search: event.target.value,
                    }))
                  }
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-semibold text-text-primary">
                Skill
                <select
                  aria-label="Filter by skill"
                  className="h-11 rounded-lg border border-border bg-surface-2 px-3 text-sm"
                  value={filters.skill || "all"}
                  onChange={(event) =>
                    setFilters((previous) => ({
                      ...previous,
                      skill: event.target.value,
                    }))
                  }
                >
                  <option value="all">All skills</option>
                  {filterOptions.skills.map((skill) => (
                    <option key={skill} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1 text-sm font-semibold text-text-primary">
                Status
                <select
                  aria-label="Filter by status"
                  className="h-11 rounded-lg border border-border bg-surface-2 px-3 text-sm"
                  value={filters.status || "all"}
                  onChange={(event) =>
                    setFilters((previous) => ({
                      ...previous,
                      status: event.target.value as ContentCurationWorkspaceFilters["status"],
                    }))
                  }
                >
                  <option value="all">All statuses</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </label>
              <label className="flex flex-col gap-1 text-sm font-semibold text-text-primary">
                Format
                <select
                  aria-label="Filter by format"
                  className="h-11 rounded-lg border border-border bg-surface-2 px-3 text-sm"
                  value={filters.format || "all"}
                  onChange={(event) =>
                    setFilters((previous) => ({
                      ...previous,
                      format: event.target.value,
                    }))
                  }
                >
                  <option value="all">All formats</option>
                  {filterOptions.formats.map((format) => (
                    <option key={format} value={format}>
                      {format}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1 text-sm font-semibold text-text-primary">
                Route
                <select
                  aria-label="Filter by route objective"
                  className="h-11 rounded-lg border border-border bg-surface-2 px-3 text-sm"
                  value={filters.routeObjective || "all"}
                  onChange={(event) =>
                    setFilters((previous) => ({
                      ...previous,
                      routeObjective: event.target.value,
                    }))
                  }
                >
                  <option value="all">All routes</option>
                  {filterOptions.routeObjectives.map((routeObjective) => (
                    <option key={routeObjective} value={routeObjective}>
                      {routeObjective}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          }
          right={
            <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary">
              <Button
                variant="secondary"
                onClick={() => setSelectedEditorRowId(null)}
              >
                Add row
              </Button>
              <span>Imported: {bundleResult?.summary.importedCount || 0}</span>
              <span>
                Exact duplicates: {lintReport?.exactDuplicateGroupCount || 0}
              </span>
              <span>
                Invalid rows: {bundleResult?.summary.invalidCount || 0}
              </span>
            </div>
          }
        />

        <div className="grid gap-4 xl:grid-cols-[minmax(0,2fr)_320px]">
          <Card elevated className="overflow-hidden">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={visibleRows.map((row) => row.id)}
                strategy={verticalListSortingStrategy}
              >
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="py-10 text-center text-sm text-text-secondary"
                        >
                          No rows match the current filters.
                        </TableCell>
                      </TableRow>
                    ) : (
                      table.getRowModel().rows.map((row) => (
                        <SortableWorkspaceRow
                          key={row.id}
                          row={row}
                          onEdit={() => setSelectedEditorRowId(row.original.id)}
                          onApprove={() =>
                            setWorkspaceRows((previous) =>
                              setContentCurationWorkspaceStatus(
                                previous,
                                [row.original.id],
                                "approved",
                              ),
                            )
                          }
                          onReject={() =>
                            setWorkspaceRows((previous) =>
                              setContentCurationWorkspaceStatus(
                                previous,
                                [row.original.id],
                                "rejected",
                              ),
                            )
                          }
                          onReset={() =>
                            setWorkspaceRows((previous) =>
                              resetContentCurationWorkspaceStatus(previous, [
                                row.original.id,
                              ]),
                            )
                          }
                          onMoveUp={() =>
                            syncWorkspaceDraft(
                              moveContentCurationWorkspaceRow(
                                workspaceRows,
                                row.original.id,
                                "up",
                                getVisibleRowIds(visibleRows),
                              ),
                            )
                          }
                          onMoveDown={() =>
                            syncWorkspaceDraft(
                              moveContentCurationWorkspaceRow(
                                workspaceRows,
                                row.original.id,
                                "down",
                                getVisibleRowIds(visibleRows),
                              ),
                            )
                          }
                        />
                      ))
                    )}
                  </TableBody>
                </Table>
              </SortableContext>
            </DndContext>
          </Card>

          <div className="flex flex-col gap-4">
            <ContentCurationEditor
              selectedRow={selectedEditorRow}
              sourceFormat={sourceFormat}
              onSubmit={handleEditorSubmit}
              onCancelEdit={() => setSelectedEditorRowId(null)}
            />

            <Card elevated>
              <h2 className="text-lg font-black text-text-primary">
                Duplicate report
              </h2>
              <div className="mt-3 space-y-3 text-sm text-text-secondary">
                <p>
                  Exact duplicate groups:{" "}
                  <span className="font-bold text-text-primary">
                    {lintReport?.exactDuplicateGroupCount || 0}
                  </span>
                </p>
                <p>
                  Near duplicate pairs:{" "}
                  <span className="font-bold text-text-primary">
                    {lintReport?.nearDuplicateCount || 0}
                  </span>
                </p>
                {(lintReport?.nearDuplicatePairs.length || 0) > 0 ? (
                  <div className="space-y-2 rounded-xl bg-surface-2 p-3">
                    {lintReport!.nearDuplicatePairs.slice(0, 3).map((pair) => (
                      <div key={pair.key} className="rounded-lg bg-surface-1 p-3">
                        <p className="font-semibold text-text-primary">
                          Rows {pair.rowNumbers[0]} and {pair.rowNumbers[1]}
                        </p>
                        <p>{pair.promptPreview}</p>
                        <p className="text-text-muted">
                          Similarity {pair.similarity}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="rounded-xl bg-surface-2 p-3">
                    No near-duplicate warnings in the current valid batch.
                  </p>
                )}
              </div>
            </Card>

            <Card elevated>
              <h2 className="text-lg font-black text-text-primary">
                Validation issues
              </h2>
              <div className="mt-3 space-y-2 text-sm text-text-secondary">
                {issues.length === 0 ? (
                  <p className="rounded-xl bg-surface-2 p-3">
                    No blocking issues in the valid rows currently loaded.
                  </p>
                ) : (
                  formatIssuePreview(issues).map((issue, index) => (
                    <div
                      key={`${issue.row}-${issue.field}-${index}`}
                      className="rounded-xl bg-surface-2 p-3"
                    >
                      <p className="font-semibold text-text-primary">
                        Row {issue.row} · {issue.field}
                      </p>
                      <p>{issue.message}</p>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCurationView;
