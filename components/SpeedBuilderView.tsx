import React, { useEffect, useMemo, useState } from "react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import { speedBuilderRounds } from "../data/speedBuilder";

type DifficultyMode = "easy" | "medium";

const ROUND_TIME_SECONDS: Record<DifficultyMode, number> = {
  easy: 55,
  medium: 35,
};
const BASE_POINTS_PER_CORRECT = 100;
const TIME_BONUS_MULTIPLIER = 2;

const shuffleWords = (sentence: string): string[] => {
  const words = sentence.trim().split(/\s+/);
  const shuffled = [...words];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  const isSameOrder = shuffled.every((word, index) => word === words[index]);
  if (isSameOrder && shuffled.length > 1) {
    [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
  }

  return shuffled;
};

const SpeedBuilderView: React.FC = () => {
  const [difficulty, setDifficulty] = useState<DifficultyMode>("easy");
  const rounds = useMemo(() => {
    if (difficulty === "easy") {
      return speedBuilderRounds.filter(
        (item) => item.sentence.split(/\s+/).length <= 6,
      );
    }

    return speedBuilderRounds.filter(
      (item) => item.sentence.split(/\s+/).length >= 6,
    );
  }, [difficulty]);

  const [roundIndex, setRoundIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME_SECONDS.easy);
  const [totalScore, setTotalScore] = useState(0);
  const [lastRoundPoints, setLastRoundPoints] = useState(0);
  const [timeoutReached, setTimeoutReached] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const round = rounds[roundIndex];

  const roundTime = ROUND_TIME_SECONDS[difficulty];

  useEffect(() => {
    setRoundIndex(0);
    setSelectedWords([]);
    setSubmitted(false);
    setCorrectCount(0);
    setTimeLeft(roundTime);
    setTotalScore(0);
    setLastRoundPoints(0);
    setTimeoutReached(false);
    setShowHint(false);
  }, [difficulty, roundTime]);

  useEffect(() => {
    if (submitted) return;

    const timerId = window.setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          window.clearInterval(timerId);
          return 0;
        }
        return previous - 1;
      });
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [submitted, roundIndex]);

  useEffect(() => {
    if (submitted || timeLeft !== 0) return;

    setSubmitted(true);
    setTimeoutReached(true);
    setLastRoundPoints(0);
  }, [submitted, timeLeft]);

  const shuffledWords = useMemo(
    () => shuffleWords(round.sentence),
    [round.id, round.sentence],
  );

  const availableWords = useMemo(() => {
    const usageCount: Record<string, number> = {};

    return shuffledWords.filter((word) => {
      usageCount[word] = (usageCount[word] || 0) + 1;
      const selectedCount = selectedWords.filter(
        (item) => item === word,
      ).length;
      return usageCount[word] > selectedCount;
    });
  }, [selectedWords, shuffledWords]);

  const expectedSentence = round.sentence.trim().toLowerCase();
  const userSentence = selectedWords.join(" ").trim().toLowerCase();
  const isCorrect = submitted && userSentence === expectedSentence;

  const handleSelectWord = (word: string) => {
    if (submitted) return;
    setSelectedWords((previous) => [...previous, word]);
  };

  const handleUndoWord = (index: number) => {
    if (submitted) return;
    setSelectedWords((previous) =>
      previous.filter((_, itemIndex) => itemIndex !== index),
    );
  };

  const handleCheck = () => {
    if (selectedWords.length === 0 || submitted) return;
    const nextIsCorrect = userSentence === expectedSentence;
    setSubmitted(true);
    setTimeoutReached(false);
    if (nextIsCorrect) {
      setCorrectCount((previous) => previous + 1);
      const roundPoints =
        BASE_POINTS_PER_CORRECT + timeLeft * TIME_BONUS_MULTIPLIER;
      setLastRoundPoints(roundPoints);
      setTotalScore((previous) => previous + roundPoints);
      return;
    }

    setLastRoundPoints(0);
  };

  const handleNextRound = () => {
    if (roundIndex >= rounds.length - 1) return;
    setRoundIndex((previous) => previous + 1);
    setSelectedWords([]);
    setSubmitted(false);
    setTimeLeft(roundTime);
    setTimeoutReached(false);
    setLastRoundPoints(0);
    setShowHint(false);
  };

  const handleRestart = () => {
    setRoundIndex(0);
    setSelectedWords([]);
    setSubmitted(false);
    setCorrectCount(0);
    setTimeLeft(roundTime);
    setTotalScore(0);
    setLastRoundPoints(0);
    setTimeoutReached(false);
    setShowHint(false);
  };

  const isComplete = roundIndex === rounds.length - 1 && submitted;

  const hintText = useMemo(() => {
    const words = round.sentence.split(/\s+/);
    if (words.length <= 2) {
      return round.sentence;
    }
    return `${words[0]} ... ${words[words.length - 1]}`;
  }, [round.sentence]);

  return (
    <div className="flex-1 overflow-y-auto overscroll-y-contain bg-background p-4 sm:p-8 pb-24 sm:pb-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card elevated>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight">
                Speed Builder
              </h1>
              <p className="text-text-secondary text-sm mt-1">
                Ordena las palabras para formar la oración correcta.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <Button
                  size="sm"
                  variant={difficulty === "easy" ? "primary" : "secondary"}
                  onClick={() => setDifficulty("easy")}
                  aria-label="Set easy mode"
                >
                  Fácil
                </Button>
                <Button
                  size="sm"
                  variant={difficulty === "medium" ? "primary" : "secondary"}
                  onClick={() => setDifficulty("medium")}
                  aria-label="Set medium mode"
                >
                  Medio
                </Button>
              </div>
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-text-secondary">
              Ronda {roundIndex + 1} / {rounds.length}
            </div>
            <div className="text-xs font-black uppercase tracking-widest text-amber-400">
              ⏱ {timeLeft}s
            </div>
          </div>
        </Card>

        <Card className="space-y-5">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="text-xs uppercase tracking-widest font-bold text-text-secondary">
              Nivel {round.level}
            </div>
            <div className="text-xs uppercase tracking-widest font-bold text-text-muted">
              {round.tags.join(" · ")}
            </div>
          </div>

          {difficulty === "easy" && !submitted ? (
            <div className="rounded-xl border border-border bg-surface-2 px-3 py-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowHint((previous) => !previous)}
                >
                  {showHint ? "Hide hint" : "Show hint"}
                </Button>
                {showHint ? (
                  <p className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                    Hint: {hintText}
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}

          <div>
            <p className="text-xs uppercase tracking-widest font-bold text-text-secondary mb-2">
              Tu respuesta
            </p>
            <div className="min-h-[76px] rounded-xl border border-border bg-surface-2 p-3 flex flex-wrap gap-2">
              {selectedWords.length === 0 ? (
                <span className="text-sm text-text-muted">
                  Selecciona palabras para construir la frase.
                </span>
              ) : (
                selectedWords.map((word, index) => (
                  <button
                    key={`${word}-${index}`}
                    onClick={() => handleUndoWord(index)}
                    className="px-3 py-1.5 rounded-lg bg-surface-1 border border-border text-sm font-semibold text-text-primary hover:bg-surface-hover transition-colors"
                    aria-label={`Quitar ${word}`}
                  >
                    {word}
                  </button>
                ))
              )}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest font-bold text-text-secondary mb-2">
              Palabras disponibles
            </p>
            <div className="rounded-xl border border-border bg-surface-1 p-3 flex flex-wrap gap-2">
              {availableWords.map((word, index) => (
                <button
                  key={`${word}-${index}`}
                  onClick={() => handleSelectWord(word)}
                  className="px-3 py-1.5 rounded-lg bg-surface-2 border border-border text-sm font-semibold text-text-primary hover:bg-surface-hover transition-colors"
                  disabled={submitted}
                >
                  {word}
                </button>
              ))}
            </div>
          </div>

          {submitted ? (
            <div
              className={`rounded-xl border px-4 py-3 text-sm font-semibold ${isCorrect ? "border-success/40 bg-success/10 text-success" : "border-amber-500/40 bg-amber-500/10 text-amber-400"}`}
            >
              {isCorrect ? (
                <div className="space-y-1">
                  <p>✅ Correcto. ¡Buen orden!</p>
                  <p className="text-xs font-black uppercase tracking-widest">
                    +{lastRoundPoints} pts (base {BASE_POINTS_PER_CORRECT} +
                    bonus tiempo {timeLeft * TIME_BONUS_MULTIPLIER})
                  </p>
                </div>
              ) : timeoutReached ? (
                <div className="space-y-1">
                  <p>⏰ Tiempo agotado.</p>
                  <p className="text-xs">
                    Respuesta correcta: "{round.sentence}"
                  </p>
                </div>
              ) : (
                `❌ Casi. Respuesta correcta: "${round.sentence}"`
              )}
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <Button
              onClick={handleCheck}
              variant="primary"
              size="lg"
              disabled={
                selectedWords.length === 0 || submitted || timeLeft === 0
              }
            >
              Check answer
            </Button>

            <Button
              onClick={() => setSelectedWords([])}
              variant="secondary"
              size="lg"
              disabled={selectedWords.length === 0 || submitted}
            >
              Clear
            </Button>

            {submitted && !isComplete ? (
              <Button onClick={handleNextRound} variant="success" size="lg">
                Next round
              </Button>
            ) : null}

            {isComplete ? (
              <Button onClick={handleRestart} variant="success" size="lg">
                Play again
              </Button>
            ) : null}
          </div>
        </Card>

        <Card>
          {isComplete ? (
            <div className="space-y-2">
              <p className="text-sm text-text-secondary">
                Resultado final de sesión
              </p>
              <p className="text-2xl font-black text-text-primary">
                {totalScore} pts
              </p>
              <p className="text-sm text-text-secondary">
                Aciertos:{" "}
                <span className="font-black text-text-primary">
                  {correctCount}
                </span>{" "}
                / {rounds.length}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-text-secondary">
                Score total:{" "}
                <span className="font-black text-text-primary">
                  {totalScore}
                </span>{" "}
                pts
              </p>
              <p className="text-sm text-text-secondary">
                Aciertos:{" "}
                <span className="font-black text-text-primary">
                  {correctCount}
                </span>{" "}
                / {roundIndex + (submitted ? 1 : 0)}
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default SpeedBuilderView;
