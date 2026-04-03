import React, { useRef, useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import GameStartPanel from "@/components/GameStartPanel";
import GameShell from "@/components/game/GameShell";
import GameHudCard from "@/components/game/GameHudCard";
import DailySessionInsights from "@/components/game/DailySessionInsights";
import { trackAnalyticsEvent } from "@/lib/analytics";
import { playGameSound } from "@/lib/audioUtils";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import {
  getTimeByPreset,
  TIME_PRESET_LABEL,
  TimePreset,
} from "@/lib/gameSessionConfig";
import { addGlobalXp, progressQuest } from "@/lib/xpStore";
import {
  appendAdaptiveDifficultyLog,
  createAdaptiveDifficultyEngine,
  shouldDownshiftByWrongStreak,
  shouldUpshiftByCorrectStreak,
} from "@/lib/adaptiveDifficulty";
import { toast } from "@/components/ui/Toast";
import {
  matchesRoadmapTags,
  parseRoadmapSessionConfig,
} from "@/lib/roadmapLaunch";

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
type DocsGameLevel = "easy" | "normal" | "hard";

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

const LEVEL_ORDER: DocsGameLevel[] = ["easy", "normal", "hard"];
const LEVEL_LABEL: Record<DocsGameLevel, string> = {
  easy: "Easy",
  normal: "Normal",
  hard: "Hard",
};
const GAME_DURATION_SECONDS: Record<DocsGameLevel, number> = {
  easy: 75,
  normal: 60,
  hard: 50,
};
const INITIAL_LIVES = 3;
const BEST_SCORE_KEY = "study-docs-game-best-score";
const DOWNSHIFT_AFTER_WRONG_STREAK = 3;
const UPSHIFT_AFTER_CORRECT_STREAK = 3;
const DOCS_GAME_DIFFICULTY = createAdaptiveDifficultyEngine<DocsGameLevel>({
  gameId: "docs_game",
  levels: LEVEL_ORDER,
  defaultLevel: "normal",
});

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
  const [searchParams] = useSearchParams();
  const roadmapConfig = useMemo(
    () => parseRoadmapSessionConfig(searchParams, "study_docs_game"),
    [searchParams],
  );
  const didAutoStartRef = useRef(false);
  const resolveRoadmapLevel = (value?: string | null): DocsGameLevel => {
    if (value && LEVEL_ORDER.includes(value as DocsGameLevel)) {
      return value as DocsGameLevel;
    }

    return DOCS_GAME_DIFFICULTY.defaultLevel;
  };
  const { isOnline } = useNetworkStatus();
  const entries = useMemo(
    () =>
      collectEntries(fileTree).filter(
        (e) => !e.category.toLowerCase().includes("ejecuci"),
      ),
    [fileTree],
  );
  const filteredEntries = useMemo(() => {
    const nextEntries = entries.filter((entry) =>
      matchesRoadmapTags(
        [entry.category, entry.title, entry.path],
        roadmapConfig?.tags || [],
      ),
    );

    return nextEntries.length > 0 ? nextEntries : entries;
  }, [entries, roadmapConfig?.tags]);
  const categories = useMemo(
    () => Array.from(new Set(filteredEntries.map((entry) => entry.category))),
    [filteredEntries],
  );

  const sessionStartTime = useRef<number>(Date.now());
  const wrongStreakRef = useRef(0);
  const correctStreakRef = useRef(0);
  const [selectedLevel, setSelectedLevel] = useState<DocsGameLevel>(
    resolveRoadmapLevel(roadmapConfig?.difficulty),
  );
  const [gameState, setGameState] = useState<GameState>("idle");
  const [timePreset, setTimePreset] = useState<TimePreset>("normal");
  const gameDuration = getTimeByPreset(
    GAME_DURATION_SECONDS[selectedLevel],
    timePreset,
  );
  const [timeLeft, setTimeLeft] = useState(gameDuration);
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

  const handleLevelSelect = (nextLevel: DocsGameLevel) => {
    setSelectedLevel((currentLevel) => {
      const transition = DOCS_GAME_DIFFICULTY.setLevel(currentLevel, nextLevel);
      if (transition.changed) {
        appendAdaptiveDifficultyLog({
          ...transition,
          trigger: "manual",
          details: {
            source: "user_select",
          },
        });
      }
      return transition.nextLevel;
    });
  };

  useEffect(() => {
    if (!roadmapConfig?.difficulty) return;
    setSelectedLevel(resolveRoadmapLevel(roadmapConfig.difficulty));
  }, [roadmapConfig?.difficulty]);

  useEffect(() => {
    if (gameState !== "playing") {
      setTimeLeft(gameDuration);
    }
  }, [gameDuration, gameState]);

  useEffect(() => {
    const saved = Number(localStorage.getItem(BEST_SCORE_KEY) || "0");
    if (!Number.isNaN(saved) && saved > 0) {
      setBestScore(saved);
    }
  }, []);

  const getDocContent = useCallback(async (
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
  }, [docCache]);

  const buildTitleOptions = useCallback((correctDoc: StudyDocEntry): string[] => {
    const sameCategory = filteredEntries
      .filter(
        (entry) =>
          entry.path !== correctDoc.path &&
          entry.category === correctDoc.category,
      )
      .map((entry) => entry.title);

    const fallbackPool = filteredEntries
      .filter((entry) => entry.path !== correctDoc.path)
      .map((entry) => entry.title);

    const distractors = shuffle(
      sameCategory.length >= 3 ? sameCategory : fallbackPool,
    ).slice(0, 3);

    return shuffle([correctDoc.title, ...distractors]);
  }, [filteredEntries]);

  const getNextRound = useCallback(async (
    level: DocsGameLevel = selectedLevel,
  ): Promise<QuizRound | null> => {
    if (filteredEntries.length < 4) return null;

    const candidatePoolSize =
      level === "hard" ? 20 : level === "easy" ? 10 : 15;
    const candidates = shuffle(filteredEntries).slice(0, candidatePoolSize);
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
      if (parsed.paragraphs.length > 0) {
        questionTypes.push("document");
        if (level === "easy") questionTypes.push("document");
      }
      if (parsed.headings.length > 0) {
        questionTypes.push("heading");
        if (level !== "hard") questionTypes.push("heading");
      }
      if (parsed.tooltips.length > 0 && level !== "easy") {
        questionTypes.push("tooltip");
        if (level === "hard") questionTypes.push("tooltip");
      }
      if (parsed.strongTerms.length > 0 && level !== "easy") {
        questionTypes.push("strong");
        if (level === "hard") questionTypes.push("strong");
      }

      const allTerms = Array.from(
        new Set([
          ...parsed.tooltips.map((t) => t.term),
          ...parsed.strongTerms.map((s) => s.term),
        ]),
      );
      const parsWithTerms = parsed.paragraphs.filter((p) =>
        allTerms.some((t) => p.includes(t) && t.length > 4),
      );

      if (level !== "easy" && parsWithTerms.length > 0 && allTerms.length >= 4) {
        questionTypes.push("cloze");
        if (level === "hard") {
          questionTypes.push("cloze");
          questionTypes.push("cloze");
        }
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
  }, [buildTitleOptions, filteredEntries, getDocContent, selectedLevel]);

  const finishGame = () => {
    setGameState("finished");
    trackAnalyticsEvent("session_end", {
      game: "docs_game",
      duration: Math.round((Date.now() - sessionStartTime.current) / 1000),
    });
    setSelectedOption(null);
    setLastResult(null);
    wrongStreakRef.current = 0;
    correctStreakRef.current = 0;
    if (score > 0) {
      addGlobalXp(score);
    }
    progressQuest("play_game", 1, "docs_hunt");
    progressQuest("play_game", 1, "any");
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

  const startGame = useCallback(async () => {
    setIsRoundLoading(true);
    const firstRound = await getNextRound(selectedLevel);
    setIsRoundLoading(false);
    if (!firstRound) return;

    sessionStartTime.current = Date.now();
    trackAnalyticsEvent("session_start", {
      game: "docs_game",
      level: selectedLevel,
      timePreset,
      gameDuration,
      roadmapNodeId: roadmapConfig?.nodeId,
      roadmapRouteObjective: roadmapConfig?.routeObjective,
      roadmapTags: roadmapConfig?.tags,
    });
    setGameState("playing");
    setTimeLeft(gameDuration);
    setLives(INITIAL_LIVES);
    setScore(0);
    setStreak(0);
    setLastResult(null);
    setSelectedOption(null);
    wrongStreakRef.current = 0;
    correctStreakRef.current = 0;
    setCurrentRound(firstRound);
  }, [
    gameDuration,
    getNextRound,
    roadmapConfig?.nodeId,
    roadmapConfig?.routeObjective,
    roadmapConfig?.tags,
    selectedLevel,
    timePreset,
  ]);

  useEffect(() => {
    if (
      !roadmapConfig?.autostart ||
      gameState !== "idle" ||
      didAutoStartRef.current ||
      filteredEntries.length < 4
    ) {
      return;
    }

    didAutoStartRef.current = true;
    void startGame();
  }, [
    filteredEntries.length,
    gameState,
    roadmapConfig?.autostart,
    startGame,
  ]);

  const handleAnswer = (option: string) => {
    if (!currentRound || selectedOption) return;

    const isCorrect = option === currentRound.correctAnswer;
    let nextLevelForRound = selectedLevel;
    setSelectedOption(option);
    setLastResult(isCorrect ? "correct" : "wrong");

    if (isCorrect) {
      playGameSound("correct");
      wrongStreakRef.current = 0;
      correctStreakRef.current += 1;
      trackAnalyticsEvent("item_correct", {
        game: "docs_game",
        question: currentRound.prompt,
        level: selectedLevel,
      });
      setStreak((previous) => {
        const nextStreak = previous + 1;
        setScore((currentScore) => currentScore + 10 + previous * 2);
        return nextStreak;
      });

      if (
        shouldUpshiftByCorrectStreak(
          correctStreakRef.current,
          UPSHIFT_AFTER_CORRECT_STREAK,
        )
      ) {
        const transition = DOCS_GAME_DIFFICULTY.increaseLevel(
          selectedLevel,
          "rule_upshift",
        );
        appendAdaptiveDifficultyLog({
          ...transition,
          trigger: "consecutive_correct",
          details: {
            consecutiveCorrect: UPSHIFT_AFTER_CORRECT_STREAK,
          },
        });
        correctStreakRef.current = 0;
        nextLevelForRound = transition.nextLevel;
        if (transition.changed) {
          setSelectedLevel(transition.nextLevel);
          toast.success(
            `Dificultad ajustada a ${LEVEL_LABEL[transition.nextLevel]} por ${UPSHIFT_AFTER_CORRECT_STREAK} aciertos seguidos.`,
          );
        }
      }
    } else {
      playGameSound("wrong");
      correctStreakRef.current = 0;
      wrongStreakRef.current += 1;
      trackAnalyticsEvent("item_wrong", {
        game: "docs_game",
        question: currentRound.prompt,
        errorType: "docs_error",
        level: selectedLevel,
      });
      setLives((previous) => previous - 1);
      setStreak(0);

      if (
        shouldDownshiftByWrongStreak(
          wrongStreakRef.current,
          DOWNSHIFT_AFTER_WRONG_STREAK,
        )
      ) {
        const transition = DOCS_GAME_DIFFICULTY.decreaseLevel(
          selectedLevel,
          "rule_downshift",
        );
        appendAdaptiveDifficultyLog({
          ...transition,
          trigger: "consecutive_wrong",
          details: {
            consecutiveErrors: DOWNSHIFT_AFTER_WRONG_STREAK,
          },
        });
        wrongStreakRef.current = 0;
        nextLevelForRound = transition.nextLevel;
        if (transition.changed) {
          setSelectedLevel(transition.nextLevel);
          toast.info(
            `Dificultad ajustada a ${LEVEL_LABEL[transition.nextLevel]} por ${DOWNSHIFT_AFTER_WRONG_STREAK} errores seguidos.`,
          );
        }
      }
    }

    window.setTimeout(async () => {
      setSelectedOption(null);
      setLastResult(null);
      setIsRoundLoading(true);
      const nextRound = await getNextRound(nextLevelForRound);
      setIsRoundLoading(false);
      if (!nextRound) {
        finishGame();
        return;
      }
      setCurrentRound(nextRound);
    }, 700);
  };

  if (filteredEntries.length === 0) {
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

  const startScreen = (
    <GameStartPanel
      title="Doc Hunt"
      description="Configura dificultad y ritmo antes de iniciar."
      onStart={() => void startGame()}
      startLabel="Iniciar juego"
    >
      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-widest text-text-muted">
          Dificultad
        </p>
        <div className="flex justify-center flex-wrap gap-2">
          {LEVEL_ORDER.map((level) => (
            <Button
              key={`setup-${level}`}
              size="sm"
              variant={selectedLevel === level ? "primary" : "secondary"}
              onClick={() => handleLevelSelect(level)}
            >
              {LEVEL_LABEL[level]}
            </Button>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-widest text-text-muted">
          Ritmo de tiempo
        </p>
        <div className="flex justify-center flex-wrap gap-2">
          {(Object.keys(TIME_PRESET_LABEL) as TimePreset[]).map((preset) => (
            <Button
              key={`time-${preset}`}
              size="sm"
              variant={timePreset === preset ? "primary" : "secondary"}
              onClick={() => setTimePreset(preset)}
            >
              {TIME_PRESET_LABEL[preset]}
            </Button>
          ))}
        </div>
        <p className="text-xs text-text-secondary">Duracion: {gameDuration}s</p>
      </div>
      {!isOnline ? (
        <p className="text-red-400 text-sm font-bold">
          Estas sin conexion. No es posible cargar documentos para el juego.
        </p>
      ) : null}
    </GameStartPanel>
  );

  return (
    <GameShell
      hasStarted={gameState !== "idle"}
      startScreen={startScreen}
      contentKey={gameState === "finished" ? "summary" : "active"}
      pageClassName="flex-1 overflow-y-auto overscroll-y-contain bg-background p-4 md:p-6"
      contentClassName="max-w-4xl mx-auto space-y-6"
    >
      <GameHudCard
        title="Doc Hunt"
        description="Adivina categoria y concepto con fragmentos reales."
        meta={
          <p className="text-xs text-text-muted mt-1">
            Record: {bestScore} | Nivel: {LEVEL_LABEL[selectedLevel]}
          </p>
        }
        status={`Vidas ${lives} · Score ${score}`}
        timeLeft={gameState === "playing" ? timeLeft : 0}
        roundTime={gameDuration}
        controls={LEVEL_ORDER.map((level) => (
          <Button
            key={level}
            size="sm"
            variant={selectedLevel === level ? "primary" : "secondary"}
            onClick={() => handleLevelSelect(level)}
            aria-label={`Set docs game level ${LEVEL_LABEL[level]}`}
          >
            {LEVEL_LABEL[level]}
          </Button>
        ))}
      />
      <Card elevated>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-black text-text-primary">🕹️ Doc Hunt</h2>
          <span className="text-xs uppercase tracking-widest font-bold text-text-secondary">
            Récord: {bestScore}
          </span>
        </div>
        <p className="text-sm text-text-secondary mt-3">
          Adivina la categoría correcta del documento. {gameDuration} segundos, 3 vidas, combo y score.
        </p>
      </Card>

      {gameState === "idle" && (
        <Card className="text-center space-y-4">
          <p className="text-text-secondary">
            Pulsa iniciar para jugar con fragmentos reales de tus documentos.
          </p>
          {!isOnline && (
            <p className="text-red-400 text-sm font-bold">
              Estás sin conexión. No es posible cargar documentos para el juego.
            </p>
          )}
          <Button
            variant="primary"
            size="lg"
            onClick={() => void startGame()}
            disabled={!isOnline}
          >
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
              className={`h-full transition-all duration-1000 ease-linear rounded-full ${timeLeft <= 10 ? "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)] animate-pulse" : timeLeft <= gameDuration / 2 ? "bg-amber-400" : "bg-success"}`}
              style={{ width: `${(timeLeft / gameDuration) * 100}%` }}
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
                <DailySessionInsights className="mt-4 text-left" />

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
    </GameShell>
  );
};

export default StudyDocsGameView;
