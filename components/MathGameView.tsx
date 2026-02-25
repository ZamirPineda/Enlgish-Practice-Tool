import React, { useCallback, useEffect, useMemo, useState } from "react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import LatexRenderer from "./LatexRenderer";
import { trackActivity } from "../utils/activityTracker";
import { algebraTopic, calculusTopic, geometryTopic } from "../data/math";
import { MathTopic } from "../types";

type GameState = "idle" | "playing" | "finished";

interface MathQuizQuestion {
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
}

const GAME_DURATION_SECONDS = 60;
const INITIAL_LIVES = 3;
const BEST_SCORE_KEY = "math-game-best-score";

const isFormulaLike = (value: string): boolean => {
  return (
    value.includes("\\") ||
    value.includes("^") ||
    value.includes("∫") ||
    value.includes("√") ||
    value.includes("=")
  );
};

const shuffleList = <T,>(items: T[]): T[] => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[randomIndex]] = [copy[randomIndex], copy[i]];
  }
  return copy;
};

const buildQuestionBank = (topics: MathTopic[]): MathQuizQuestion[] => {
  const questions: MathQuizQuestion[] = [];

  topics.forEach((topic) => {
    topic.sections.forEach((section, sectionIndex) => {
      section.rows.forEach((row, rowIndex) => {
        if (row.length < 2 || !row[0]?.trim() || !row[1]?.trim()) return;
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
          });
        }
      });
    });
  });

  const formulaPool = Array.from(
    new Set(questions.map((q) => q.correctAnswer).filter(Boolean)),
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

    const options = shuffleList([question.correctAnswer, ...distractors]);
    return { ...question, options };
  });
};

const MathGameView: React.FC = () => {
  const questionBank = useMemo(
    () => buildQuestionBank([calculusTopic, geometryTopic, algebraTopic]),
    [],
  );

  const [gameState, setGameState] = useState<GameState>("idle");
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION_SECONDS);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<"correct" | "wrong" | null>(
    null,
  );

  useEffect(() => {
    const saved = localStorage.getItem(BEST_SCORE_KEY);
    const parsed = Number(saved || "0");
    if (!Number.isNaN(parsed) && parsed > 0) {
      setBestScore(parsed);
    }
  }, []);

  const currentQuestion = questionBank[questionIndex] || null;

  const getNextQuestionIndex = useCallback(() => {
    if (questionBank.length <= 1) return 0;
    let nextIndex = Math.floor(Math.random() * questionBank.length);
    while (nextIndex === questionIndex) {
      nextIndex = Math.floor(Math.random() * questionBank.length);
    }
    return nextIndex;
  }, [questionBank.length, questionIndex]);

  const finishGame = useCallback(() => {
    setGameState("finished");
    setSelectedOption(null);
    setLastResult(null);
    if (score > 0) {
      trackActivity(1);
    }
    setBestScore((previousBest) => {
      const nextBest = Math.max(previousBest, score);
      localStorage.setItem(BEST_SCORE_KEY, String(nextBest));
      return nextBest;
    });
  }, [score]);

  useEffect(() => {
    if (gameState !== "playing") return;
    if (timeLeft <= 0 || lives <= 0) {
      finishGame();
      return;
    }

    const timerId = window.setTimeout(() => {
      setTimeLeft((previous) => Math.max(0, previous - 1));
    }, 1000);

    return () => window.clearTimeout(timerId);
  }, [finishGame, gameState, lives, timeLeft]);

  const startGame = () => {
    if (questionBank.length === 0) return;
    setGameState("playing");
    setTimeLeft(GAME_DURATION_SECONDS);
    setLives(INITIAL_LIVES);
    setScore(0);
    setStreak(0);
    setLastResult(null);
    setSelectedOption(null);
    setQuestionIndex(Math.floor(Math.random() * questionBank.length));
  };

  const handleOptionSelect = (option: string) => {
    if (!currentQuestion || selectedOption) return;

    const isCorrect = option === currentQuestion.correctAnswer;
    setSelectedOption(option);
    setLastResult(isCorrect ? "correct" : "wrong");

    if (isCorrect) {
      setStreak((previous) => {
        const next = previous + 1;
        setScore((currentScore) => currentScore + 10 + previous * 2);
        return next;
      });
    } else {
      setLives((previous) => previous - 1);
      setStreak(0);
    }

    window.setTimeout(() => {
      setSelectedOption(null);
      setLastResult(null);
      setQuestionIndex(getNextQuestionIndex());
    }, 650);
  };

  if (questionBank.length === 0) {
    return (
      <Card className="max-w-3xl mx-auto text-center">
        <h3 className="text-xl font-black text-text-primary mb-2">Math Game</h3>
        <p className="text-text-secondary">No hay preguntas disponibles aún.</p>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card elevated>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-2xl font-black text-text-primary">
            🎮 Math Speed Duel
          </h3>
          <div className="text-xs text-text-secondary font-bold uppercase tracking-widest">
            Récord: {bestScore}
          </div>
        </div>
        <p className="text-text-secondary text-sm mt-3">
          60 segundos, 3 vidas y combo por respuestas correctas seguidas.
        </p>
      </Card>

      {gameState === "idle" && (
        <Card className="text-center space-y-4">
          <p className="text-text-secondary">
            Pulsa iniciar y responde lo más rápido posible.
          </p>
          <Button variant="primary" size="lg" onClick={startGame}>
            Iniciar juego
          </Button>
        </Card>
      )}

      {gameState === "playing" && currentQuestion && (
        <>
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
              <p className="text-[10px] uppercase tracking-widest font-bold text-text-muted mb-2">
                Tema: {currentQuestion.topicLabel}
              </p>
              <p className="text-[10px] uppercase tracking-widest font-bold text-text-secondary mb-2">
                Sección: {currentQuestion.sectionLabel}
              </p>
              <p className="text-[10px] uppercase tracking-widest font-bold text-accent mb-2">
                {currentQuestion.answerTypeLabel}
              </p>
              <h4 className="text-xl font-black text-text-primary mb-3">
                {currentQuestion.prompt}
              </h4>
              {currentQuestion.referenceLabel &&
                currentQuestion.referenceValue && (
                  <div className="bg-surface-2 border border-border rounded-xl px-4 py-2 mb-2">
                    <p className="text-xs text-text-secondary font-semibold">
                      {currentQuestion.referenceLabel}:{" "}
                      {currentQuestion.referenceValue}
                    </p>
                  </div>
                )}
              {currentQuestion.expression && (
                <div className="bg-surface-2 border border-border rounded-xl p-4 mb-2">
                  {isFormulaLike(currentQuestion.expression) ? (
                    <LatexRenderer formula={currentQuestion.expression} block />
                  ) : (
                    <p className="text-lg font-semibold text-text-primary">
                      {currentQuestion.expression}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentQuestion.options.map((option) => {
                const isSelected = option === selectedOption;
                const isCorrect = option === currentQuestion.correctAnswer;

                let stateClass =
                  "bg-surface-2 hover:bg-surface-hover border-border";
                if (selectedOption) {
                  if (isCorrect) {
                    stateClass = "bg-success/20 border-success text-success";
                  } else if (isSelected) {
                    stateClass = "bg-rose-500/20 border-rose-500 text-rose-400";
                  } else {
                    stateClass =
                      "bg-surface-2 border-border text-text-secondary";
                  }
                }

                return (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(option)}
                    disabled={!!selectedOption}
                    className={`w-full text-left rounded-xl border p-4 transition-colors min-h-[64px] ${stateClass}`}
                  >
                    {isFormulaLike(option) ? (
                      <LatexRenderer formula={option} />
                    ) : (
                      <span className="text-base font-semibold text-inherit">
                        {option}
                      </span>
                    )}
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
                  : "Incorrecto, sigue intentando."}
              </p>
            )}
          </Card>
        </>
      )}

      {gameState === "finished" && (
        <Card className="text-center space-y-4">
          <h4 className="text-2xl font-black text-text-primary">
            Fin del juego
          </h4>
          <p className="text-text-secondary">Score final: {score}</p>
          <p className="text-text-secondary">Mejor score: {bestScore}</p>
          <div className="flex items-center justify-center gap-3">
            <Button variant="primary" onClick={startGame}>
              Jugar otra vez
            </Button>
            <Button variant="secondary" onClick={() => setGameState("idle")}>
              Volver al menú
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default MathGameView;
