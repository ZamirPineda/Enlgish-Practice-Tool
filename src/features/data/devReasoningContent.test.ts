import { describe, expect, test } from "vitest";
import { codeBugsData } from "@/features/data/codeBugsData";
import { codeSyntaxData } from "@/features/data/codeSyntaxData";

const countByTier = <T extends { difficultyTier: string }>(items: T[]) =>
  items.reduce<Record<string, number>>((accumulator, item) => {
    accumulator[item.difficultyTier] =
      (accumulator[item.difficultyTier] || 0) + 1;
    return accumulator;
  }, {});

describe("dev reasoning content", () => {
  test("keeps objective metadata and tags on every prompt", () => {
    [...codeBugsData, ...codeSyntaxData].forEach((prompt) => {
      expect(prompt.routeObjective).toBe("dev_reasoning");
      expect(prompt.tags.length).toBeGreaterThan(0);
    });
  });

  test("keeps difficulty tier coverage across both dev datasets", () => {
    expect(countByTier(codeBugsData)).toMatchObject({
      foundation: expect.any(Number),
      core: expect.any(Number),
      stretch: expect.any(Number),
      expert: expect.any(Number),
    });
    expect(countByTier(codeSyntaxData)).toMatchObject({
      foundation: expect.any(Number),
      core: expect.any(Number),
      stretch: expect.any(Number),
      expert: expect.any(Number),
    });
  });

  test("includes the new classified prompts added for APP-603", () => {
    expect(codeBugsData.some((prompt) => prompt.id === "ts_async_foreach")).toBe(
      true,
    );
    expect(
      codeBugsData.some((prompt) => prompt.id === "sql_left_join_filtered"),
    ).toBe(true);
    expect(
      codeSyntaxData.some((prompt) => prompt.id === "ts_async_fetch_wrapper"),
    ).toBe(true);
    expect(codeSyntaxData.some((prompt) => prompt.id === "sql_group_by_having")).toBe(
      true,
    );
  });
});
