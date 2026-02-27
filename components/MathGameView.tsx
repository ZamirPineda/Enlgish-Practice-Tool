import React, { useCallback, useEffect, useMemo, useState } from "react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import LatexRenderer from "./LatexRenderer";
import { addGlobalXp, progressQuest } from "../utils/xpStore";
import { trackAnalyticsEvent } from "../utils/analytics";
import { playGameSound } from "../utils/audioUtils";
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
      addGlobalXp(score);
    }

    setTimeout(() => {
      progressQuest("play_game", 1, "math");
      progressQuest("play_game", 1, "any");
    }, 1500);

    setBestScore((previousBest) => {
      const nextBest = Math.max(previousBest, score);
      localStorage.setItem(BEST_SCORE_KEY, String(nextBest));
      return nextBest;
    });
  }, [score]);

  useEffect(() => {
    if (gameState !== "playing") return;
    if (timeLeft <= 0 || lives <= 0) {
      if (timeLeft <= 0 && gameState === "playing") {
        playGameSound("timeout");
      }
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
      playGameSound("correct");
      trackAnalyticsEvent("item_correct", {
        game: "math_game",
        question: currentQuestion.prompt,
      });

      progressQuest("correct_answers", 1, "math");
      progressQuest("correct_answers", 1, "any");

      setStreak((previous) => {
        const next = previous + 1;
        setScore((currentScore) => currentScore + 10 + previous * 2);
        return next;
      });
    } else {
      playGameSound("wrong");
      trackAnalyticsEvent("item_wrong", {
        game: "math_game",
        question: currentQuestion.prompt,
        errorType: "calculation_error",
      });
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
                    onClick={() => handleOptionSelect(option)}
                    disabled={!!selectedOption}
                    className={`w-full text-left rounded-xl border p-4 transition-all duration-200 min-h-[64px] ${stateClass}`}
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
        <Card className="max-w-xl mx-auto w-full p-8 text-center space-y-8 animate-fade-in shadow-2xl border-t-4 border-accent bg-surface-1">
          {(() => {
            const gradeInfo = (() => {
              if (score >= 200)
                return {
                  grade: "S",
                  color: "text-fuchsia-400",
                  message: "¡Maestro de las Matemáticas!",
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
                    onClick={startGame}
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

export default MathGameView;
