import React, { useEffect, useMemo, useState } from "react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import { trackActivity } from "../utils/activityTracker";
import { trackAnalyticsEvent } from "../utils/analytics";
import { playGameSound } from "../utils/audioUtils";

interface FileNode {
  name: string;
  path: string;
  type: "file" | "directory";
  children?: FileNode[];
}

interface StudyDocEntry {
  path: string;
  category: string;
  title: string;
}

type GameState = "idle" | "playing" | "finished";

interface QuizRound {
  prompt: string;
  clueLabel: string;
  clueText: string;
  answerTypeLabel: string;
  correctAnswer: string;
  options: string[];
}

interface ParsedDocContent {
  headings: string[];
  paragraphs: string[];
  tooltips: { term: string; definition: string }[];
  strongTerms: { term: string; description: string }[];
}

const GAME_DURATION_SECONDS = 60;
const INITIAL_LIVES = 3;
const BEST_SCORE_KEY = "study-docs-game-best-score";

const cleanText = (value: string): string =>
  value
    .replace(/\s+/g, " ")
    .replace(/\*\s+/g, "")
    .replace(/\s+([,.;:!?])/g, "$1")
    .trim();

const normalizeTitle = (fileName: string): string => {
  const withoutExtension = fileName.replace(/\.html$/i, "");
  const normalizedSeparators = withoutExtension
    .replace(/Explicacion_Profunda_/gi, "")
    .replace(/Explicaci[oó]n_Profunda_/gi, "")
    .replace(/Guia_Ejecucion_/gi, "")
    .replace(/Gu[ií]a_Ejecuci[oó]n_/gi, "")
    .replace(/Explicacion /gi, "")
    .replace(/Guia Ejecucion /gi, "")
    .replace(/_/g, " ")
    .replace(/\./g, " ")
    .replace(/\s+/g, " ")
    .replace(/\(\d+\)/g, "")
    .trim();

  return decodeURIComponent(normalizedSeparators);
};

const collectEntries = (
  nodes: FileNode[],
  parentCategory?: string,
): StudyDocEntry[] => {
  return nodes.flatMap((node) => {
    if (node.type === "file") {
      const category = parentCategory || "General";
      return [
        {
          path: node.path,
          category,
          title: normalizeTitle(node.name),
        },
      ];
    }

    const nextCategory = parentCategory || node.name;
    return collectEntries(node.children || [], nextCategory);
  });
};

const shuffle = <T,>(items: T[]): T[] => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[randomIndex]] = [copy[randomIndex], copy[i]];
  }
  return copy;
};

const toDocUrl = (path: string): string => {
  const encodedPath = path
    .split("/")
    .map((segment) => encodeURIComponent(segment).replace(/%26/g, "&"))
    .join("/");
  return `${import.meta.env.BASE_URL}study-docs/${encodedPath}`;
};

const extractDocContent = (
  html: string,
  title?: string,
): ParsedDocContent | null => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const titleLower = title?.toLowerCase() || "";

  const isObvious = (text: string) => {
    const textLower = text.toLowerCase().trim();
    if (textLower.includes("recursos adicionales")) return true;
    if (textLower.includes("preguntas de entrevista")) return true;

    // Bloquear palabras genéricas que todos los documentos tienen
    const genericTerms = [
      "explicación profunda",
      "explicacion profunda",
      "explicación",
      "explicacion",
      "guía de ejecución",
      "guia de ejecucion",
      "escenario empresarial",
      "caso de uso",
      "ejemplo",
      "introducción",
      "introduccion",
      "conclusión",
      "conclusion",
      "resumen",
      "ventajas",
      "desventajas",
      "pros y contras",
      "beneficios",
      "desafíos",
      "desafios",
      "qué es",
      "que es",
      "implementación",
      "implementacion",
      "arquitectura",
      "componentes",
      "conceptos clave",
      "conceptos fundamentales",
      "cuándo usar",
      "cuando usar",
      "cómo funciona",
      "como funciona",
      "contexto",
      "características",
      "caracteristicas",
      "requisitos",
      "conclusiones",
    ];

    if (
      genericTerms.some(
        (term) =>
          textLower === term ||
          textLower.startsWith(term + ":") ||
          textLower.startsWith(term + " ") ||
          textLower.includes(term + " "),
      )
    )
      return true;

    if (titleLower.length > 4 && textLower.includes(titleLower)) return true;
    if (
      titleLower.length > 4 &&
      titleLower.includes(textLower) &&
      textLower.length > 5
    )
      return true;
    return false;
  };

  const headings = Array.from(doc.querySelectorAll("h2, h3"))
    .map((node) => cleanText(node.textContent || ""))
    .filter(
      (text) => text.length >= 8 && text.length <= 120 && !isObvious(text),
    );

  const paragraphs = Array.from(doc.querySelectorAll("p"))
    .map((node) => cleanText(node.textContent || ""))
    .filter(
      (text) =>
        text.length >= 70 &&
        text.length <= 400 &&
        !text.startsWith("---") &&
        !isObvious(text),
    );

  const tooltipsNodes = Array.from(doc.querySelectorAll("span.tooltip"));
  const tooltips = tooltipsNodes
    .map((node) => ({
      term: cleanText(node.textContent || ""),
      definition: cleanText(node.getAttribute("data-tooltip-text") || ""),
    }))
    .filter((t) => t.term.length > 0 && t.definition.length > 20);

  const listItems = Array.from(doc.querySelectorAll("li"));
  const strongTerms: { term: string; description: string }[] = [];
  listItems.forEach((li) => {
    const strong = li.querySelector("strong");
    if (strong) {
      const term = cleanText(strong.textContent || "").replace(/:$/, "");
      const description = cleanText(li.textContent || "")
        .substring(term.length + (li.textContent?.includes(":") ? 1 : 0))
        .trim();
      if (term.length > 2 && description.length > 20) {
        strongTerms.push({ term, description });
      }
    }
  });

  if (
    headings.length === 0 &&
    paragraphs.length === 0 &&
    tooltips.length === 0 &&
    strongTerms.length === 0
  )
    return null;

  return { headings, paragraphs, tooltips, strongTerms };
};

interface StudyDocsGameViewProps {
  fileTree: FileNode[];
}

const StudyDocsGameView: React.FC<StudyDocsGameViewProps> = ({ fileTree }) => {
  const entries = useMemo(
    () =>
      collectEntries(fileTree).filter(
        (e) => !e.category.toLowerCase().includes("ejecuci"),
      ),
    [fileTree],
  );
  const categories = useMemo(
    () => Array.from(new Set(entries.map((entry) => entry.category))),
    [entries],
  );

  const [gameState, setGameState] = useState<GameState>("idle");
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION_SECONDS);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [currentRound, setCurrentRound] = useState<QuizRound | null>(null);
  const [isRoundLoading, setIsRoundLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<"correct" | "wrong" | null>(
    null,
  );
  const [docCache, setDocCache] = useState<Record<string, ParsedDocContent>>(
    {},
  );

  useEffect(() => {
    const saved = Number(localStorage.getItem(BEST_SCORE_KEY) || "0");
    if (!Number.isNaN(saved) && saved > 0) {
      setBestScore(saved);
    }
  }, []);

  const getDocContent = async (
    docEntry: StudyDocEntry,
  ): Promise<ParsedDocContent | null> => {
    if (docCache[docEntry.path]) {
      return docCache[docEntry.path];
    }

    try {
      const response = await fetch(toDocUrl(docEntry.path));
      if (!response.ok) return null;
      const html = await response.text();
      const parsed = extractDocContent(html, docEntry.title);
      if (!parsed) return null;
      setDocCache((previous) => ({ ...previous, [docEntry.path]: parsed }));
      return parsed;
    } catch {
      return null;
    }
  };

  const buildTitleOptions = (correctDoc: StudyDocEntry): string[] => {
    const sameCategory = entries
      .filter(
        (entry) =>
          entry.path !== correctDoc.path &&
          entry.category === correctDoc.category,
      )
      .map((entry) => entry.title);

    const fallbackPool = entries
      .filter((entry) => entry.path !== correctDoc.path)
      .map((entry) => entry.title);

    const distractors = shuffle(
      sameCategory.length >= 3 ? sameCategory : fallbackPool,
    ).slice(0, 3);

    return shuffle([correctDoc.title, ...distractors]);
  };

  const getNextRound = async (): Promise<QuizRound | null> => {
    if (entries.length < 4) return null;

    const candidates = shuffle(entries).slice(0, 15);
    for (const docEntry of candidates) {
      const parsed = await getDocContent(docEntry);
      if (!parsed) continue;

      const questionTypes: (
        | "document"
        | "tooltip"
        | "strong"
        | "heading"
        | "cloze"
      )[] = [];
      if (parsed.paragraphs.length > 0) questionTypes.push("document");
      if (parsed.headings.length > 0) questionTypes.push("heading");
      if (parsed.tooltips.length > 0) questionTypes.push("tooltip");
      if (parsed.strongTerms.length > 0) questionTypes.push("strong");

      const allTerms = Array.from(
        new Set([
          ...parsed.tooltips.map((t) => t.term),
          ...parsed.strongTerms.map((s) => s.term),
        ]),
      );
      const parsWithTerms = parsed.paragraphs.filter((p) =>
        allTerms.some((t) => p.includes(t) && t.length > 4),
      );

      if (parsWithTerms.length > 0 && allTerms.length >= 4) {
        questionTypes.push("cloze");
        questionTypes.push("cloze"); // double weight because it's a good question type
      }

      if (questionTypes.length === 0) continue;

      const selectedType = shuffle(questionTypes)[0];

      if (selectedType === "cloze") {
        const p = shuffle(parsWithTerms)[0];
        const term = shuffle(
          allTerms.filter((t) => p.includes(t) && t.length > 4),
        )[0];
        const clozeText = p.split(term).join("_______");
        const distractorsPool = allTerms.filter((t) => t !== term);
        const options = shuffle([
          term,
          ...shuffle(distractorsPool).slice(0, 3),
        ]);

        if (options.length === 4) {
          return {
            prompt: "Completa el siguiente fragmento correctamente",
            clueLabel: "Fragmento",
            clueText: clozeText,
            answerTypeLabel: `Origen: ${docEntry.title}`,
            correctAnswer: term,
            options,
          };
        }
      }

      if (selectedType === "tooltip") {
        const target = shuffle(parsed.tooltips)[0];
        const sameDocTerms = parsed.tooltips
          .filter((t) => t.term !== target.term)
          .map((t) => t.term);
        const fallbackDistractors = [
          ...parsed.headings,
          ...parsed.strongTerms.map((s) => s.term),
        ].filter((t) => t !== target.term);
        const distractorsPool =
          sameDocTerms.length >= 3
            ? sameDocTerms
            : [...sameDocTerms, ...fallbackDistractors];

        if (distractorsPool.length >= 3) {
          const options = shuffle([
            target.term,
            ...shuffle(distractorsPool).slice(0, 3),
          ]);
          return {
            prompt: "¿A qué concepto corresponde esta definición?",
            clueLabel: "Definición extraída",
            clueText: target.definition,
            answerTypeLabel: `Origen: ${docEntry.title}`,
            correctAnswer: target.term,
            options,
          };
        }
      }

      if (selectedType === "strong") {
        const target = shuffle(parsed.strongTerms)[0];
        const sameDocTerms = parsed.strongTerms
          .filter((t) => t.term !== target.term)
          .map((t) => t.term);
        const fallbackDistractors = [
          ...parsed.tooltips.map((t) => t.term),
          ...parsed.headings,
        ].filter((t) => t !== target.term);
        const distractorsPool =
          sameDocTerms.length >= 3
            ? sameDocTerms
            : [...sameDocTerms, ...fallbackDistractors];

        if (distractorsPool.length >= 3) {
          const options = shuffle([
            target.term,
            ...shuffle(distractorsPool).slice(0, 3),
          ]);
          return {
            prompt:
              "¿A qué elemento o característica corresponde esta descripción?",
            clueLabel: "Descripción extraída",
            clueText: target.description,
            answerTypeLabel: `Origen: ${docEntry.title}`,
            correctAnswer: target.term,
            options,
          };
        }
      }

      const docOptions = buildTitleOptions(docEntry);
      if (docOptions.length < 4) continue;

      if (selectedType === "heading") {
        const heading = shuffle(parsed.headings)[0];
        return {
          prompt: "¿A qué documento pertenece esta sección?",
          clueLabel: "Sección del documento",
          clueText: heading,
          answerTypeLabel: "Esperado: Título del documento",
          correctAnswer: docEntry.title,
          options: docOptions,
        };
      }

      const excerpt = shuffle(parsed.paragraphs)[0];
      return {
        prompt: "¿De qué documento en general proviene este fragmento real?",
        clueLabel: "Fragmento extraído",
        clueText: excerpt,
        answerTypeLabel: "Esperado: Título del documento",
        correctAnswer: docEntry.title,
        options: docOptions,
      };
    }

    return null;
  };

  const finishGame = () => {
    setGameState("finished");
    setSelectedOption(null);
    setLastResult(null);
    if (score > 0) {
      trackActivity(1);
    }
    setBestScore((currentBest) => {
      const nextBest = Math.max(currentBest, score);
      localStorage.setItem(BEST_SCORE_KEY, String(nextBest));
      return nextBest;
    });
  };

  useEffect(() => {
    if (gameState !== "playing") return;
    if (timeLeft <= 0 || lives <= 0) {
      if (timeLeft <= 0 && gameState === "playing") {
        playGameSound("timeout");
      }
      finishGame();
      return;
    }

    const timer = window.setTimeout(() => {
      setTimeLeft((previous) => Math.max(0, previous - 1));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [gameState, lives, timeLeft]);

  const startGame = async () => {
    setIsRoundLoading(true);
    const firstRound = await getNextRound();
    setIsRoundLoading(false);
    if (!firstRound) return;

    setGameState("playing");
    setTimeLeft(GAME_DURATION_SECONDS);
    setLives(INITIAL_LIVES);
    setScore(0);
    setStreak(0);
    setLastResult(null);
    setSelectedOption(null);
    setCurrentRound(firstRound);
  };

  const handleAnswer = (option: string) => {
    if (!currentRound || selectedOption) return;

    const isCorrect = option === currentRound.correctAnswer;
    setSelectedOption(option);
    setLastResult(isCorrect ? "correct" : "wrong");

    if (isCorrect) {
      playGameSound("correct");
      trackAnalyticsEvent("item_correct", {
        game: "study_docs_game",
        question: currentRound.prompt,
      });
      setStreak((previous) => {
        const nextStreak = previous + 1;
        setScore((currentScore) => currentScore + 10 + previous * 2);
        return nextStreak;
      });
    } else {
      playGameSound("wrong");
      trackAnalyticsEvent("item_wrong", {
        game: "study_docs_game",
        question: currentRound.prompt,
        errorType: "docs_error",
      });
      setLives((previous) => previous - 1);
      setStreak(0);
    }

    window.setTimeout(async () => {
      setSelectedOption(null);
      setLastResult(null);
      setIsRoundLoading(true);
      const nextRound = await getNextRound();
      setIsRoundLoading(false);
      if (!nextRound) {
        finishGame();
        return;
      }
      setCurrentRound(nextRound);
    }, 700);
  };

  if (entries.length === 0) {
    return (
      <Card className="max-w-4xl mx-auto text-center">
        <h3 className="text-xl font-black text-text-primary mb-2">
          🕹️ Doc Hunt
        </h3>
        <p className="text-text-secondary">
          No hay documentos para generar preguntas.
        </p>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      <Card elevated>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-black text-text-primary">🕹️ Doc Hunt</h2>
          <span className="text-xs uppercase tracking-widest font-bold text-text-secondary">
            Récord: {bestScore}
          </span>
        </div>
        <p className="text-sm text-text-secondary mt-3">
          Adivina la categoría correcta del documento. 60 segundos, 3 vidas,
          combo y score.
        </p>
      </Card>

      {gameState === "idle" && (
        <Card className="text-center space-y-4">
          <p className="text-text-secondary">
            Pulsa iniciar para jugar con fragmentos reales de tus documentos.
          </p>
          <Button variant="primary" size="lg" onClick={() => void startGame()}>
            Iniciar juego
          </Button>
        </Card>
      )}

      {isRoundLoading && gameState === "playing" && (
        <Card className="text-center text-text-secondary">
          Cargando siguiente reto...
        </Card>
      )}

      {gameState === "playing" && currentRound && (
        <>
          <div className="w-full h-3 bg-surface-2 rounded-full overflow-hidden shadow-inner mb-4 border border-border">
            <div
              className={`h-full transition-all duration-1000 ease-linear rounded-full ${timeLeft <= 10 ? "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)] animate-pulse" : timeLeft <= GAME_DURATION_SECONDS / 2 ? "bg-amber-400" : "bg-success"}`}
              style={{ width: `${(timeLeft / GAME_DURATION_SECONDS) * 100}%` }}
            />
          </div>
          <Card>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              <div className="bg-surface-2 rounded-xl p-3 border border-border">
                <p className="text-[10px] uppercase tracking-widest text-text-muted font-bold">
                  Tiempo
                </p>
                <p className="text-xl font-black text-accent">{timeLeft}s</p>
              </div>
              <div className="bg-surface-2 rounded-xl p-3 border border-border">
                <p className="text-[10px] uppercase tracking-widest text-text-muted font-bold">
                  Vidas
                </p>
                <p className="text-xl font-black text-rose-400">{lives}</p>
              </div>
              <div className="bg-surface-2 rounded-xl p-3 border border-border">
                <p className="text-[10px] uppercase tracking-widest text-text-muted font-bold">
                  Combo
                </p>
                <p className="text-xl font-black text-amber-400">x{streak}</p>
              </div>
              <div className="bg-surface-2 rounded-xl p-3 border border-border">
                <p className="text-[10px] uppercase tracking-widest text-text-muted font-bold">
                  Score
                </p>
                <p className="text-xl font-black text-success">{score}</p>
              </div>
            </div>
          </Card>

          <Card className="space-y-6">
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-accent mb-2">
                {currentRound.answerTypeLabel}
              </p>
              <h3 className="text-xl font-black text-text-primary mb-2">
                {currentRound.prompt}
              </h3>
              <div className="bg-surface-2 border border-border rounded-xl p-4">
                <p className="text-sm uppercase tracking-widest text-text-muted font-bold mb-2">
                  {currentRound.clueLabel}
                </p>
                <p className="text-lg font-semibold text-text-primary break-words">
                  {currentRound.clueText}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentRound.options.map((option) => {
                const isSelected = option === selectedOption;
                const isCorrect = option === currentRound.correctAnswer;

                let stateClass =
                  "bg-surface-2 hover:bg-surface-hover border-border transform hover:scale-[1.02] active:scale-[0.98]";
                if (selectedOption) {
                  if (isCorrect) {
                    stateClass =
                      "bg-success/20 border-success text-success scale-[1.02] shadow-[0_0_15px_rgba(34,197,94,0.3)] z-10 animate-[bounce_0.5s_ease-in-out]";
                  } else if (isSelected) {
                    stateClass =
                      "bg-rose-500/20 border-rose-500 text-rose-400 scale-[0.98] animate-[shake_0.4s_ease-in-out]";
                  } else {
                    stateClass =
                      "bg-surface-2 border-border text-text-secondary opacity-50";
                  }
                }

                return (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    disabled={!!selectedOption || isRoundLoading}
                    className={`w-full text-left rounded-xl border p-4 min-h-[60px] transition-all duration-200 ${stateClass}`}
                  >
                    <span className="font-semibold">{option}</span>
                  </button>
                );
              })}
            </div>

            {lastResult && (
              <p
                className={`text-sm font-bold ${lastResult === "correct" ? "text-success" : "text-rose-400"}`}
              >
                {lastResult === "correct"
                  ? "¡Correcto! +puntos"
                  : `Incorrecto. Era: ${currentRound.correctAnswer}`}
              </p>
            )}
          </Card>
        </>
      )}

      {gameState === "finished" && (
        <Card className="max-w-xl mx-auto w-full p-8 text-center space-y-8 animate-fade-in shadow-2xl border-t-4 border-accent bg-surface-1">
          {(() => {
            const gradeInfo = (() => {
              if (score >= 200)
                return {
                  grade: "S",
                  color: "text-fuchsia-400",
                  message: "¡Maestro de Documentos!",
                };
              if (score >= 100)
                return {
                  grade: "A",
                  color: "text-emerald-400",
                  message: "¡Excelente Trabajo!",
                };
              if (score >= 50)
                return {
                  grade: "B",
                  color: "text-sky-400",
                  message: "¡Gran Esfuerzo!",
                };
              if (score >= 20)
                return {
                  grade: "C",
                  color: "text-amber-400",
                  message: "¡Buen Intento!",
                };
              return {
                grade: "D",
                color: "text-slate-400",
                message: "¡Sigue Practicando!",
              };
            })();

            return (
              <>
                <div>
                  <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400 mb-2">
                    ¡Juego Terminado!
                  </h2>
                  <p className="text-text-secondary text-lg">
                    {gradeInfo.message}
                  </p>
                </div>

                <div className="flex justify-center items-center gap-8 py-4">
                  <div className="text-center">
                    <div className="text-sm font-bold text-text-muted uppercase tracking-widest mb-1">
                      Rango
                    </div>
                    <div
                      className={`text-7xl font-black ${gradeInfo.color} drop-shadow-lg animate-bounce`}
                    >
                      {gradeInfo.grade}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-surface-2 p-4 rounded-2xl border border-border hover:bg-surface-hover transition-colors">
                    <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">
                      Score Final
                    </div>
                    <div className="text-3xl font-black text-success-hover">
                      {score}
                    </div>
                  </div>
                  <div className="bg-surface-2 p-4 rounded-2xl border border-border hover:bg-surface-hover transition-colors">
                    <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">
                      Mejor Score
                    </div>
                    <div className="text-3xl font-black text-amber-500">
                      🏅 {bestScore}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button
                    variant="primary"
                    onClick={() => void startGame()}
                    className="w-full sm:w-auto py-3 px-8 text-lg font-bold"
                  >
                    Jugar de nuevo
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setGameState("idle")}
                    className="w-full sm:w-auto py-3 px-8 text-lg"
                  >
                    Volver al menú
                  </Button>
                </div>
              </>
            );
          })()}
        </Card>
      )}
    </div>
  );
};

export default StudyDocsGameView;
