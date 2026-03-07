import {
  algebraTopic,
  calculusTopic,
  geometryTopic,
} from "@/features/data/math";
import {
  PracticeDifficultyTier,
  PracticeRouteObjective,
  uniqueTags,
} from "@/lib/practiceContent";
import { MathTopic } from "@/types";

export type MathAdaptiveLevel = "easy" | "normal" | "hard";

export interface MathPracticeQuestion {
  id: string;
  prompt: string;
  expression?: string;
  answerTypeLabel: string;
  sectionLabel: string;
  referenceLabel?: string;
  referenceValue?: string;
  correctAnswer: string;
  options: string[];
  topicLabel: string;
  difficultyTier: PracticeDifficultyTier;
  routeObjective: PracticeRouteObjective;
  tags: string[];
  sourceTopicId: string;
}

const MATH_ROUTE_OBJECTIVE: PracticeRouteObjective = "math_speed";

const shuffleList = <T,>(items: T[]): T[] => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[randomIndex]] = [copy[randomIndex], copy[i]];
  }
  return copy;
};

const isFormulaLike = (value: string): boolean =>
  value.includes("\\") ||
  value.includes("^") ||
  value.includes("âˆ«") ||
  value.includes("âˆš") ||
  value.includes("=");

const extendTopic = (
  topic: MathTopic,
  extraRowsBySection: Record<number, string[][]>,
): MathTopic => ({
  ...topic,
  sections: topic.sections.map((section, index) => ({
    ...section,
    rows: [...section.rows, ...(extraRowsBySection[index] || [])],
  })),
});

const algebraPracticeTopic = extendTopic(algebraTopic, {
  0: [
    [
      "Binomios con término común",
      "(x+a)(x+b) = xÂ² + (a+b)x + ab",
      "(x+4)(x+9) = xÂ² + 13x + 36",
    ],
    [
      "Factorización por agrupación",
      "ax + ay + bx + by = (a+b)(x+y)",
      "3x + 3y + 2x + 2y = (3+2)(x+y)",
    ],
  ],
  2: [
    ["Potencia fraccionaria", "aáµ/â¿ = â¿âˆšaáµ", "8Â²/Â³ = Â³âˆš64 = 4"],
    ["Radical de cociente", "â¿âˆš(a/b) = â¿âˆša / â¿âˆšb", "âˆš(9/4) = 3/2"],
  ],
});

const geometryPracticeTopic = extendTopic(geometryTopic, {
  0: [
    [
      "Sector circular",
      "A = (Î¸/360) Â· Ï€rÂ²\nL = (Î¸/360) Â· 2Ï€r",
      "Î¸: ángulo central, L: longitud de arco",
    ],
    [
      "Corona circular",
      "A = Ï€(RÂ² - rÂ²)",
      "R: radio mayor, r: radio menor",
    ],
  ],
  1: [
    [
      "Prisma triangular",
      "V = A_base Â· h\nA = P_base Â· h + 2A_base",
      "A_base: área del triángulo base",
    ],
    [
      "Tronco de cono",
      "V = (1/3)Ï€h(RÂ² + Rr + rÂ²)",
      "R: radio mayor, r: radio menor, h: altura",
    ],
  ],
});

const calculusPracticeTopic = extendTopic(calculusTopic, {
  1: [
    [
      "Regla de la constante múltiplo",
      "k Â· u",
      "k Â· u'",
      "k âˆ« u dx",
      "(5xÂ³)' = 15xÂ²",
      "âˆ« 5xÂ² dx = (5/3)xÂ³ + C",
    ],
  ],
  2: [
    [
      "Trigonométrica seno",
      "sin(u)",
      "u' cos(u)",
      "-cos(x)",
      "sin(3x) â†’ 3cos(3x)",
      "âˆ« sin(x) dx = -cos(x) + C",
    ],
    [
      "Trigonométrica coseno",
      "cos(u)",
      "-u' sin(u)",
      "sin(x)",
      "cos(2x) â†’ -2sin(2x)",
      "âˆ« cos(x) dx = sin(x) + C",
    ],
    [
      "Logaritmo base e del cociente",
      "ln(u/v)",
      "(u'v - uv') / uv",
      "(u/v) ln|u/v| - u/v",
      "ln(x/2) â†’ 1/x",
      "âˆ« ln(x/2) dx = x ln(x/2) - x + C",
    ],
  ],
  3: [
    [
      "Integral por fracciones parciales simple",
      "1 / ((x-a)(x-b))",
      "N/A",
      "A/(x-a) + B/(x-b)",
      "Separar coeficientes antes de integrar",
      "âˆ« 1/((x-1)(x-2)) dx",
    ],
    [
      "Sustitución trigonométrica básica",
      "\\sqrt{a^2 - x^2}",
      "N/A",
      "x = a sin(Î¸)",
      "Convierte radicales en expresiones trigonométricas",
      "âˆ« \\sqrt{9-x^2} dx",
    ],
  ],
});

const getMathDifficultyTier = (
  topicId: string,
  sectionIndex: number,
): PracticeDifficultyTier => {
  if (topicId === "algebra") {
    return sectionIndex === 0 ? "foundation" : "core";
  }
  if (topicId === "geometry") {
    return sectionIndex === 0 ? "core" : "stretch";
  }
  return sectionIndex <= 1 ? "stretch" : "expert";
};

const buildMathPracticeQuestionBank = (topics: MathTopic[]): MathPracticeQuestion[] => {
  const questions: MathPracticeQuestion[] = [];

  topics.forEach((topic) => {
    topic.sections.forEach((section, sectionIndex) => {
      section.rows.forEach((row, rowIndex) => {
        if (row.length < 2 || !row[0]?.trim() || !row[1]?.trim()) return;

        const difficultyTier = getMathDifficultyTier(topic.id, sectionIndex);
        const tags = uniqueTags([
          topic.id,
          topic.title,
          section.title,
          difficultyTier,
          MATH_ROUTE_OBJECTIVE,
        ]);

        questions.push({
          id: `${topic.id}-${sectionIndex}-${rowIndex}-formula`,
          prompt: "Selecciona la fórmula correcta",
          answerTypeLabel: "Respuesta esperada: Fórmula",
          sectionLabel: section.title,
          referenceLabel: "Concepto",
          referenceValue: row[0],
          correctAnswer: row[1],
          options: [],
          topicLabel: topic.title,
          difficultyTier,
          routeObjective: MATH_ROUTE_OBJECTIVE,
          tags,
          sourceTopicId: topic.id,
        });

        if (row[2]?.trim()) {
          questions.push({
            id: `${topic.id}-${sectionIndex}-${rowIndex}-concept`,
            prompt: "¿A qué concepto corresponde esta expresión?",
            expression: row[1],
            answerTypeLabel: "Respuesta esperada: Nombre del concepto",
            sectionLabel: section.title,
            referenceLabel: "Tipo de expresión",
            referenceValue: section.headers[1] || "Expresión",
            correctAnswer: row[0],
            options: [],
            topicLabel: topic.title,
            difficultyTier,
            routeObjective: MATH_ROUTE_OBJECTIVE,
            tags,
            sourceTopicId: topic.id,
          });
        }
      });
    });
  });

  const formulaPool = Array.from(
    new Set(questions.map((question) => question.correctAnswer).filter(Boolean)),
  );
  const conceptPool = Array.from(
    new Set(
      topics.flatMap((topic) =>
        topic.sections.flatMap((section) =>
          section.rows.map((row) => row[0]).filter(Boolean),
        ),
      ),
    ),
  );

  return questions.map((question) => {
    const sourcePool = isFormulaLike(question.correctAnswer)
      ? formulaPool
      : conceptPool;
    const distractors = shuffleList(
      sourcePool.filter((item) => item !== question.correctAnswer),
    ).slice(0, 3);

    return {
      ...question,
      options: shuffleList([question.correctAnswer, ...distractors]),
    };
  });
};

export const mathPracticeQuestionBankByLevel: Record<
  MathAdaptiveLevel,
  MathPracticeQuestion[]
> = {
  easy: buildMathPracticeQuestionBank([algebraPracticeTopic]),
  normal: buildMathPracticeQuestionBank([
    algebraPracticeTopic,
    geometryPracticeTopic,
  ]),
  hard: buildMathPracticeQuestionBank([
    algebraPracticeTopic,
    geometryPracticeTopic,
    calculusPracticeTopic,
  ]),
};

export const getMathPracticeQuestionBank = (
  level: MathAdaptiveLevel,
): MathPracticeQuestion[] => mathPracticeQuestionBankByLevel[level];
