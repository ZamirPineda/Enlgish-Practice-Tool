import { describe, expect, test } from "vitest";
import {
  getMathPracticeQuestionBank,
  mathPracticeQuestionBankByLevel,
} from "@/lib/mathPracticeBank";

describe("mathPracticeBank", () => {
  test("assigns math_speed objective and tags to every generated question", () => {
    Object.values(mathPracticeQuestionBankByLevel)
      .flat()
      .forEach((question) => {
        expect(question.routeObjective).toBe("math_speed");
        expect(question.tags.length).toBeGreaterThan(0);
      });
  });

  test("expands the bank as adaptive difficulty increases", () => {
    const easy = getMathPracticeQuestionBank("easy");
    const normal = getMathPracticeQuestionBank("normal");
    const hard = getMathPracticeQuestionBank("hard");

    expect(easy.length).toBeGreaterThan(0);
    expect(normal.length).toBeGreaterThan(easy.length);
    expect(hard.length).toBeGreaterThan(normal.length);
  });

  test("includes supplemental classified items for APP-603", () => {
    const hard = getMathPracticeQuestionBank("hard");

    expect(
      hard.some((question) => question.referenceValue === "Sector circular"),
    ).toBe(true);
    expect(
      hard.some(
        (question) =>
          question.referenceValue === "Sustitución trigonométrica básica",
      ),
    ).toBe(true);
    expect(
      hard.some((question) => question.difficultyTier === "expert"),
    ).toBe(true);
  });
});
