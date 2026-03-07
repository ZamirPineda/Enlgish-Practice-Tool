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
    const speedBuilderByLevel = countByLevel(speedBuilderRounds);
    const paraphraseByLevel = countByLevel(paraphraseDuelRounds);
    const transformerByLevel = countByLevel(sentenceTransformerRounds);
    const errorHunterByLevel = countByLevel(errorHunterRounds);

    expect(speedBuilderByLevel.A1).toBeGreaterThanOrEqual(14);
    expect(speedBuilderByLevel.A2).toBeGreaterThanOrEqual(14);
    expect(speedBuilderByLevel.B1).toBeGreaterThanOrEqual(14);
    expect(speedBuilderByLevel.B2).toBeGreaterThanOrEqual(30);
    expect(speedBuilderByLevel.C1).toBeGreaterThanOrEqual(33);

    expect(paraphraseByLevel.A2).toBeGreaterThanOrEqual(11);
    expect(paraphraseByLevel.B1).toBeGreaterThanOrEqual(11);
    expect(paraphraseByLevel.B2).toBeGreaterThanOrEqual(16);
    expect(paraphraseByLevel.C1).toBeGreaterThanOrEqual(17);

    expect(transformerByLevel.A2).toBeGreaterThanOrEqual(9);
    expect(transformerByLevel.B1).toBeGreaterThanOrEqual(9);
    expect(transformerByLevel.B2).toBeGreaterThanOrEqual(18);
    expect(transformerByLevel.C1).toBeGreaterThanOrEqual(19);

    expect(errorHunterByLevel.A2).toBeGreaterThanOrEqual(11);
    expect(errorHunterByLevel.B1).toBeGreaterThanOrEqual(12);
    expect(errorHunterByLevel.B2).toBeGreaterThanOrEqual(14);
    expect(errorHunterByLevel.C1).toBeGreaterThanOrEqual(19);
  });

  test("keeps every round tagged for topic-aware reuse", () => {
    [
      speedBuilderRounds,
      paraphraseDuelRounds,
      sentenceTransformerRounds,
      errorHunterRounds,
    ]
      .flat()
      .forEach((round) => {
        expect(round.tags.length).toBeGreaterThan(0);
        round.tags.forEach((tag) =>
          expect(tag.trim().length).toBeGreaterThan(0),
        );
      });
  });
});
