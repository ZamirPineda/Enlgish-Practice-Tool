import { describe, expect, test } from "vitest";
import { speedBuilderRounds } from "@/features/data/speedBuilder";
import { paraphraseDuelRounds } from "@/features/data/paraphraseDuel";
import { sentenceTransformerRounds } from "@/features/data/sentenceTransformer";
import { errorHunterRounds } from "@/features/data/errorHunter";

const countByLevel = <T extends { level: string }>(items: T[]) =>
  items.reduce<Record<string, number>>((accumulator, item) => {
    accumulator[item.level] = (accumulator[item.level] || 0) + 1;
    return accumulator;
  }, {});

describe("english core content coverage", () => {
  test("keeps expanded minimum volume by dataset", () => {
    expect(speedBuilderRounds.length).toBeGreaterThanOrEqual(105);
    expect(paraphraseDuelRounds.length).toBeGreaterThanOrEqual(55);
    expect(sentenceTransformerRounds.length).toBeGreaterThanOrEqual(55);
    expect(errorHunterRounds.length).toBeGreaterThanOrEqual(56);
  });

  test("keeps level coverage balanced enough for adaptive practice", () => {
    expect(countByLevel(speedBuilderRounds)).toMatchObject({
      A1: 14,
      A2: 14,
      B1: 14,
      B2: 30,
      C1: 33,
    });
    expect(countByLevel(paraphraseDuelRounds)).toMatchObject({
      A2: 11,
      B1: 11,
      B2: 16,
      C1: 17,
    });
    expect(countByLevel(sentenceTransformerRounds)).toMatchObject({
      A2: 9,
      B1: 9,
      B2: 18,
      C1: 19,
    });
    expect(countByLevel(errorHunterRounds)).toMatchObject({
      A2: 11,
      B1: 12,
      B2: 14,
      C1: 19,
    });
  });

  test("keeps every round tagged for topic-aware reuse", () => {
    [speedBuilderRounds, paraphraseDuelRounds, sentenceTransformerRounds, errorHunterRounds]
      .flat()
      .forEach((round) => {
        expect(round.tags.length).toBeGreaterThan(0);
        round.tags.forEach((tag) => expect(tag.trim().length).toBeGreaterThan(0));
      });
  });
});
