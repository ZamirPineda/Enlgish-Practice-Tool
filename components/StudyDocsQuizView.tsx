import React, { useEffect, useState } from "react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import { trackActivity } from "../utils/activityTracker";
import { docsQuizQuestions, QuizQuestion } from "../data/docs_quiz";

type GameState = "idle" | "playing" | "finished";

const TIME_PER_QUESTION = 60;
const INITIAL_LIVES = 3;
const BEST_SCORE_KEY = "study-docs-quiz-best-score";

const shuffle = <T,>(items: T[]): T[] => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[randomIndex]] = [copy[randomIndex], copy[i]];
  }
  return copy;
};

const StudyDocsQuizView: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const [questionsPool, setQuestionsPool] = useState<QuizQuestion[]>([]);
  const [currentRound, setCurrentRound] = useState<QuizQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<"correct" | "wrong" | null>(
    null,
  );
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  useEffect(() => {
    const saved = Number(localStorage.getItem(BEST_SCORE_KEY) || "0");
    if (!Number.isNaN(saved) && saved > 0) {
      setBestScore(saved);
    }
  }, []);

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
    if (gameState !== "playing" || selectedOption !== null) return;

    if (timeLeft <= 0) {
      handleAnswer("");
      return;
    }

    const timer = window.setTimeout(() => {
      setTimeLeft((previous) => Math.max(0, previous - 1));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [gameState, timeLeft, selectedOption]);

  const getNextRound = (pool: QuizQuestion[]): QuizQuestion | null => {
    if (pool.length === 0) return null;
    return pool[0];
  };

  const startGame = () => {
    const shuffledPool = shuffle([...docsQuizQuestions]);
    const firstRound = getNextRound(shuffledPool);
    if (!firstRound) return;

    setQuestionsPool(shuffledPool.slice(1));
    setGameState("playing");
    setTimeLeft(TIME_PER_QUESTION);
    setLives(INITIAL_LIVES);
    setScore(0);
    setStreak(0);
    setLastResult(null);
    setSelectedOption(null);
    setCurrentRound(firstRound);
    setShuffledOptions(shuffle([...firstRound.options]));
  };

  const handleAnswer = (option: string) => {
    if (!currentRound || selectedOption !== null) return;

    const isCorrect = option === currentRound.correctAnswer;
    setSelectedOption(option);
    setLastResult(isCorrect ? "correct" : "wrong");

    if (isCorrect) {
      setStreak((previous) => {
        const nextStreak = previous + 1;
        setScore((currentScore) => currentScore + 15 + previous * 5);
        return nextStreak;
      });
    } else {
      setLives((previous) => Math.max(0, previous - 1));
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (lives <= 0) {
      finishGame();
      return;
    }
    const nextRound = getNextRound(questionsPool);
    if (!nextRound) {
      finishGame();
      return;
    }
    setQuestionsPool((prev) => prev.slice(1));
    setSelectedOption(null);
    setLastResult(null);
    setCurrentRound(nextRound);
    setShuffledOptions(shuffle([...nextRound.options]));
    setTimeLeft(TIME_PER_QUESTION);
  };

  if (docsQuizQuestions.length === 0) {
    return (
      <Card className="max-w-4xl mx-auto text-center mt-6">
        <h3 className="text-xl font-black text-text-primary mb-2">
          📝 Tech Quiz
        </h3>
        <p className="text-text-secondary">No hay preguntas configuradas.</p>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      <Card elevated>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-black text-text-primary">
            📝 Tech Interview Quiz
          </h2>
          <span className="text-xs uppercase tracking-widest font-bold text-text-secondary">
            Récord: {bestScore}
          </span>
        </div>
        <p className="text-sm text-text-secondary mt-3">
          Prepárate para entrevistas de FAANG o certificaciones. 60 segundos por
          pregunta, 3 vidas. Lee cuidadosamente.
        </p>
      </Card>

      {gameState === "idle" && (
        <Card className="text-center space-y-4">
          <p className="text-text-secondary">
            Pon a prueba tu conocimiento arquitectónico y de ingeniería de
            software.
          </p>
          <Button variant="primary" size="lg" onClick={startGame}>
            Iniciar Quiz
          </Button>
        </Card>
      )}

      {gameState === "playing" && currentRound && (
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
              <div className="flex justify-between items-center mb-2">
                <p className="text-[10px] uppercase tracking-widest font-bold text-accent">
                  {currentRound.category}{" "}
                  {currentRound.subCategory
                    ? `› ${currentRound.subCategory}`
                    : ""}
                </p>
                <p className="text-xs font-medium text-text-muted">
                  Preguntas restantes: {questionsPool.length + 1}
                </p>
              </div>

              <h3 className="text-xl font-black text-text-primary leading-relaxed">
                {currentRound.question}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {shuffledOptions.map((option) => {
                const isSelected = option === selectedOption;
                const isCorrect = option === currentRound.correctAnswer;

                let stateClass =
                  "bg-surface-2 hover:bg-surface-hover border-border";
                if (selectedOption) {
                  if (isCorrect) {
                    stateClass = "bg-success/20 border-success text-success";
                  } else if (isSelected) {
                    stateClass = "bg-rose-500/20 border-rose-500 text-rose-400";
                  } else {
                    stateClass =
                      "bg-surface-2 opacity-50 border-border text-text-secondary";
                  }
                }

                return (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    disabled={selectedOption !== null}
                    className={`w-full text-left rounded-xl border p-4 min-h-[60px] transition-all flex items-center ${stateClass}`}
                  >
                    <span className="font-semibold text-sm leading-relaxed">
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>

            {selectedOption !== null && (
              <div
                className={`p-4 rounded-xl border flex flex-col gap-4 ${lastResult === "correct" ? "bg-success/10 border-success/30" : "bg-rose-500/10 border-rose-500/30"}`}
              >
                <div>
                  <p
                    className={`text-sm font-bold mb-1 ${lastResult === "correct" ? "text-success" : "text-rose-400"}`}
                  >
                    {lastResult === "correct"
                      ? "¡Excelente respuesta! +puntos"
                      : timeLeft <= 0 && selectedOption === ""
                        ? `¡Se acabó el tiempo! La respuesta era: ${currentRound.correctAnswer}`
                        : `Incorrecto. La respuesta era: ${currentRound.correctAnswer}`}
                  </p>
                  <p className="text-sm text-text-primary leading-relaxed mt-2 border-t border-border pt-2">
                    <span className="font-bold text-text-secondary text-xs uppercase tracking-widest mr-2">
                      Explicación:
                    </span>
                    {currentRound.explanation}
                  </p>
                </div>
                <Button
                  variant={lastResult === "correct" ? "primary" : "secondary"}
                  onClick={handleNextQuestion}
                  className="self-end"
                >
                  Continuar
                </Button>
              </div>
            )}
          </Card>
        </>
      )}

      {gameState === "finished" && (
        <Card className="text-center space-y-4">
          <h3 className="text-2xl font-black text-text-primary">
            {lives <= 0 ? "¡Sin vidas!" : "¡Quiz Completado!"}
          </h3>
          <p className="text-text-secondary">
            Puntuación final:{" "}
            <span className="font-bold text-text-primary">{score}</span>
          </p>
          <p className="text-text-secondary">
            Mejor puntuación:{" "}
            <span className="font-bold text-accent">{bestScore}</span>
          </p>
          <div className="flex items-center justify-center gap-3 pt-4">
            <Button variant="primary" onClick={startGame}>
              Jugar otra vez
            </Button>
            <Button variant="secondary" onClick={() => setGameState("idle")}>
              Volver
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default StudyDocsQuizView;
