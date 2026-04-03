import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/shadcn";
import {
  authoredContentRecordSchema,
  type AuthoredContentRecord,
} from "@/lib/contentAuthoringPipeline";
import { validateAuthoredContentRecordQuality } from "@/lib/contentAuthoringQuality";
import type {
  ContentCurationStatus,
  ContentCurationWorkspaceRow,
} from "@/lib/contentCurationWorkspace";

const SOURCE_OPTIONS = [
  "manual",
  "english_game",
  "math_game",
  "dev_game",
  "daily_loop",
  "study_deck",
  "vocabulary_vault",
  "tech_deck",
] as const;

const SKILL_OPTIONS = ["english", "math", "dev", "mixed"] as const;
const DIFFICULTY_OPTIONS = ["foundation", "core", "stretch", "expert"] as const;
const FORMAT_OPTIONS = [
  "flashcard",
  "multiple_choice",
  "open_response",
  "sentence_transform",
  "pair_match",
  "code_snippet",
  "formula_drill",
  "listening_prompt",
] as const;
const STATUS_OPTIONS = ["pending", "approved", "rejected"] as const;
const ROUTE_OPTIONS = [
  "",
  "english_interview",
  "math_speed",
  "dev_reasoning",
] as const;
const CEFR_OPTIONS = ["", "A1", "A2", "B1", "B2", "C1", "C2"] as const;

const splitListField = (value: string) =>
  value
    .split(/[\n,|]+/g)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

const joinListField = (values: string[] = []) => values.join("\n");

const buildAuthoredRecordFromFormValues = (
  values: ResolvedContentCurationEditorFormValues,
): AuthoredContentRecord =>
  authoredContentRecordSchema.parse({
    source: values.source,
    skill: values.skill,
    difficulty: values.difficulty,
    format: values.format,
    prompt: values.prompt.trim(),
    answer: values.answer.trim(),
    alternatives: splitListField(values.alternativesText),
    hints: splitListField(values.hintsText),
    tags: splitListField(values.tagsText),
    metadata: {
      topic: values.topic.trim() || undefined,
      routeObjective: values.routeObjective || undefined,
      cefr: values.cefr || undefined,
    },
    active: values.active,
  });

const contentCurationEditorFormSchema = z
  .object({
    source: z.enum(SOURCE_OPTIONS),
    skill: z.enum(SKILL_OPTIONS),
    difficulty: z.enum(DIFFICULTY_OPTIONS),
    format: z.enum(FORMAT_OPTIONS),
    prompt: z.string().trim().min(1, "Prompt is required"),
    answer: z.string().trim().min(1, "Answer is required"),
    tagsText: z.string().trim().min(1, "Add at least one tag"),
    alternativesText: z.string().default(""),
    hintsText: z.string().default(""),
    topic: z.string().default(""),
    routeObjective: z.enum(ROUTE_OPTIONS).default(""),
    cefr: z.enum(CEFR_OPTIONS).default(""),
    status: z.enum(STATUS_OPTIONS),
    active: z.boolean().default(true),
  })
  .superRefine((values, context) => {
    const parsedRecord = authoredContentRecordSchema.safeParse({
      source: values.source,
      skill: values.skill,
      difficulty: values.difficulty,
      format: values.format,
      prompt: values.prompt.trim(),
      answer: values.answer.trim(),
      alternatives: splitListField(values.alternativesText),
      hints: splitListField(values.hintsText),
      tags: splitListField(values.tagsText),
      metadata: {
        topic: values.topic.trim() || undefined,
        routeObjective: values.routeObjective || undefined,
        cefr: values.cefr || undefined,
      },
      active: values.active,
    });

    if (!parsedRecord.success) {
      parsedRecord.error.issues.forEach((issue) => {
        const field = issue.path[0];
        const mappedField =
          field === "tags"
            ? "tagsText"
            : field === "alternatives"
              ? "alternativesText"
              : field === "hints"
                ? "hintsText"
                : field === "metadata"
                  ? issue.path[1]
                  : field;

        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: [mappedField || "prompt"],
          message: issue.message,
        });
      });
      return;
    }

    validateAuthoredContentRecordQuality(parsedRecord.data).forEach((issue) => {
      const mappedField =
        issue.field === "tags"
          ? "tagsText"
          : issue.field === "alternatives"
            ? "alternativesText"
            : issue.field === "hints"
              ? "hintsText"
              : issue.field === "metadata.routeObjective"
                ? "routeObjective"
                : issue.field;

      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: [mappedField],
        message: issue.message,
      });
    });
  });

export type ContentCurationEditorFormValues = z.input<
  typeof contentCurationEditorFormSchema
>;
type ResolvedContentCurationEditorFormValues = z.output<
  typeof contentCurationEditorFormSchema
>;

export interface ContentCurationEditorSubmitInput {
  rowId?: string;
  record: AuthoredContentRecord;
  status: ContentCurationStatus;
}

interface ContentCurationEditorProps {
  selectedRow: ContentCurationWorkspaceRow | null;
  sourceFormat: "json" | "csv";
  onSubmit: (input: ContentCurationEditorSubmitInput) => void;
  onCancelEdit: () => void;
}

const toDefaultFormValues = (
  row: ContentCurationWorkspaceRow | null,
): ContentCurationEditorFormValues => {
  if (!row) {
    return {
      source: "manual",
      skill: "english",
      difficulty: "core",
      format: "flashcard",
      prompt: "",
      answer: "",
      tagsText: "",
      alternativesText: "",
      hintsText: "",
      topic: "",
      routeObjective: "",
      cefr: "",
      status: "pending",
      active: true,
    };
  }

  return {
    source: row.record.source,
    skill: row.record.skill,
    difficulty: row.record.difficulty,
    format: row.record.format,
    prompt: row.record.prompt,
    answer: row.record.answer || "",
    tagsText: joinListField(row.record.tags),
    alternativesText: joinListField(row.record.alternatives),
    hintsText: joinListField(row.record.hints),
    topic: row.record.metadata.topic || "",
    routeObjective: row.record.metadata.routeObjective || "",
    cefr: row.record.metadata.cefr || "",
    status: row.status,
    active: row.record.active,
  };
};

const FieldError = ({ message }: { message?: string }) =>
  message ? <p className="mt-1 text-xs text-rose-600">{message}</p> : null;

const TextAreaField = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className = "", ...props }, ref) => (
  <textarea
    ref={ref}
    className={`min-h-[110px] w-full rounded-lg border border-border bg-surface-2 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-focus ${className}`.trim()}
    {...props}
  />
));

TextAreaField.displayName = "TextAreaField";

const ContentCurationEditor: React.FC<ContentCurationEditorProps> = ({
  selectedRow,
  sourceFormat,
  onSubmit,
  onCancelEdit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<
    ContentCurationEditorFormValues,
    unknown,
    ResolvedContentCurationEditorFormValues
  >({
    resolver: zodResolver(contentCurationEditorFormSchema),
    mode: "onChange",
    defaultValues: toDefaultFormValues(selectedRow),
  });

  React.useEffect(() => {
    reset(toDefaultFormValues(selectedRow));
  }, [reset, selectedRow]);

  const submitLabel = selectedRow ? "Save changes" : "Create row";

  return (
    <Card elevated>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-text-primary">
            {selectedRow ? `Edit row ${selectedRow.rowNumber}` : "Add draft row"}
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            Typed authoring stays aligned with the same schema and quality rules
            used by the import pipeline.
          </p>
        </div>
        {selectedRow ? (
          <Button variant="ghost" size="sm" onClick={onCancelEdit}>
            Cancel
          </Button>
        ) : null}
      </div>

      {sourceFormat === "csv" ? (
        <div className="mt-4 rounded-xl border border-sky-400/30 bg-sky-500/10 p-3 text-sm text-sky-700">
          Structured edits normalize the working draft to JSON after save.
        </div>
      ) : null}

      <form
        onSubmit={handleSubmit((values) =>
          onSubmit({
            rowId: selectedRow?.id,
            record: buildAuthoredRecordFromFormValues(values),
            status: values.status,
          }),
        )}
        className="mt-4 space-y-4"
      >
        <div className="grid gap-3 md:grid-cols-2">
          <label className="text-sm font-semibold text-text-primary">
            Source
            <select
              aria-label="Editor source"
              className="mt-1 h-11 w-full rounded-lg border border-border bg-surface-2 px-3 text-sm"
              {...register("source")}
            >
              {SOURCE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <FieldError message={errors.source?.message} />
          </label>

          <label className="text-sm font-semibold text-text-primary">
            Review status
            <select
              aria-label="Editor review status"
              className="mt-1 h-11 w-full rounded-lg border border-border bg-surface-2 px-3 text-sm"
              {...register("status")}
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <FieldError message={errors.status?.message} />
          </label>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <label className="text-sm font-semibold text-text-primary">
            Skill
            <select
              aria-label="Editor skill"
              className="mt-1 h-11 w-full rounded-lg border border-border bg-surface-2 px-3 text-sm"
              {...register("skill")}
            >
              {SKILL_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <FieldError message={errors.skill?.message} />
          </label>

          <label className="text-sm font-semibold text-text-primary">
            Difficulty
            <select
              aria-label="Editor difficulty"
              className="mt-1 h-11 w-full rounded-lg border border-border bg-surface-2 px-3 text-sm"
              {...register("difficulty")}
            >
              {DIFFICULTY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <FieldError message={errors.difficulty?.message} />
          </label>

          <label className="text-sm font-semibold text-text-primary">
            Format
            <select
              aria-label="Editor format"
              className="mt-1 h-11 w-full rounded-lg border border-border bg-surface-2 px-3 text-sm"
              {...register("format")}
            >
              {FORMAT_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <FieldError message={errors.format?.message} />
          </label>
        </div>

        <label className="block text-sm font-semibold text-text-primary">
          Prompt
          <TextAreaField
            aria-label="Editor prompt"
            placeholder="Explain the target task or question"
            {...register("prompt")}
          />
          <FieldError message={errors.prompt?.message} />
        </label>

        <label className="block text-sm font-semibold text-text-primary">
          Answer
          <TextAreaField
            aria-label="Editor answer"
            placeholder="Write the expected answer"
            {...register("answer")}
          />
          <FieldError message={errors.answer?.message} />
        </label>

        <div className="grid gap-3 md:grid-cols-2">
          <label className="text-sm font-semibold text-text-primary">
            Tags
            <TextAreaField
              aria-label="Editor tags"
              placeholder="One tag per line, or separate with commas"
              className="min-h-[96px]"
              {...register("tagsText")}
            />
            <FieldError message={errors.tagsText?.message} />
          </label>

          <label className="text-sm font-semibold text-text-primary">
            Alternatives
            <TextAreaField
              aria-label="Editor alternatives"
              placeholder="Distractors or match values"
              className="min-h-[96px]"
              {...register("alternativesText")}
            />
            <FieldError message={errors.alternativesText?.message} />
          </label>
        </div>

        <label className="block text-sm font-semibold text-text-primary">
          Hints
          <TextAreaField
            aria-label="Editor hints"
            placeholder="Optional hints for easier variants"
            className="min-h-[96px]"
            {...register("hintsText")}
          />
          <FieldError message={errors.hintsText?.message} />
        </label>

        <div className="grid gap-3 md:grid-cols-3">
          <label className="text-sm font-semibold text-text-primary">
            Topic
            <Input
              aria-label="Editor topic"
              placeholder="backend, grammar, arithmetic..."
              {...register("topic")}
            />
            <FieldError message={errors.topic?.message} />
          </label>

          <label className="text-sm font-semibold text-text-primary">
            Route objective
            <select
              aria-label="Editor route objective"
              className="mt-1 h-11 w-full rounded-lg border border-border bg-surface-2 px-3 text-sm"
              {...register("routeObjective")}
            >
              <option value="">No route</option>
              {ROUTE_OPTIONS.filter(Boolean).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <FieldError message={errors.routeObjective?.message} />
          </label>

          <label className="text-sm font-semibold text-text-primary">
            CEFR
            <select
              aria-label="Editor CEFR"
              className="mt-1 h-11 w-full rounded-lg border border-border bg-surface-2 px-3 text-sm"
              {...register("cefr")}
            >
              <option value="">None</option>
              {CEFR_OPTIONS.filter(Boolean).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <FieldError message={errors.cefr?.message} />
          </label>
        </div>

        <label className="flex items-center gap-3 rounded-xl border border-border bg-surface-2 p-3 text-sm font-semibold text-text-primary">
          <input
            type="checkbox"
            aria-label="Editor active"
            className="h-4 w-4 rounded border-border"
            {...register("active")}
          />
          Keep item active in the final pack
        </label>

        <div className="flex flex-wrap gap-2">
          <Button type="submit" variant="success" disabled={isSubmitting}>
            {submitLabel}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => reset(toDefaultFormValues(selectedRow))}
          >
            Reset form
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ContentCurationEditor;
