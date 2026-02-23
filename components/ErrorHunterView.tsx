import React, { useEffect, useMemo, useState } from "react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import { errorHunterRounds, type ErrorHunterRound } from "../data/errorHunter";

type ErrorHunterLevel = ErrorHunterRound["level"];

const LEVEL_ORDER: ErrorHunterLevel[] = ["A2", "B1", "B2", "C1"];
const ROUND_TIME_SECONDS: Record<ErrorHunterLevel, number> = {
  A2: 45,
  B1: 38,
  B2: 32,
  C1: 28,
};
const LEVEL_SCORE_MULTIPLIER: Record<ErrorHunterLevel, number> = {
  A2: 1.1,
  B1: 1.25,
  B2: 1.5,
  C1: 1.75,
};
const BASE_POINTS_PER_CORRECT = 120;
const TIME_BONUS_MULTIPLIER = 3;

const normalizeSentence = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9'\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const ErrorHunterView: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<ErrorHunterLevel>("B1");
  const [roundIndex, setRoundIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME_SECONDS.B1);
  const [totalScore, setTotalScore] = useState(0);
  const [lastRoundPoints, setLastRoundPoints] = useState(0);
  const [timeoutReached, setTimeoutReached] = useState(false);

  const rounds = useMemo(
    () => errorHunterRounds.filter((item) => item.level === selectedLevel),
    [selectedLevel],
  );

  const round = rounds[roundIndex];
  const roundTime = ROUND_TIME_SECONDS[selectedLevel];

  useEffect(() => {
    setRoundIndex(0);
    setAnswer("");
    setSubmitted(false);
    setCorrectCount(0);
    setTimeLeft(roundTime);
    setTotalScore(0);
    setLastRoundPoints(0);
    setTimeoutReached(false);
  }, [selectedLevel, roundTime]);

  useEffect(() => {
    if (submitted || !round) return;

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
  }, [submitted, roundIndex, round]);

  useEffect(() => {
    if (submitted || timeLeft !== 0 || !round) return;

    setSubmitted(true);
    setTimeoutReached(true);
    setLastRoundPoints(0);
  }, [submitted, timeLeft, round]);

  if (!round) {
    return (
      <div className="flex-1 overflow-y-auto overscroll-y-contain bg-background p-4 sm:p-8 pb-24 sm:pb-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <p className="text-text-secondary text-sm">
              No rounds available for this level yet.
            </p>
          </Card>
        </div>
      </div>
    );
  }

  const expectedSentence = normalizeSentence(round.correctedSentence);
  const userSentence = normalizeSentence(answer);
  const isCorrect = submitted && userSentence === expectedSentence;
  const levelMultiplier = LEVEL_SCORE_MULTIPLIER[round.level];
  const basePoints = Math.round(BASE_POINTS_PER_CORRECT * levelMultiplier);
  const timeBonus = Math.round(
    timeLeft * TIME_BONUS_MULTIPLIER * levelMultiplier,
  );

  const handleCheck = () => {
    if (!answer.trim() || submitted) return;

    setSubmitted(true);
    setTimeoutReached(false);
    if (userSentence === expectedSentence) {
      const roundPoints = basePoints + timeBonus;
      setCorrectCount((previous) => previous + 1);
      setLastRoundPoints(roundPoints);
      setTotalScore((previous) => previous + roundPoints);
      return;
    }

    setLastRoundPoints(0);
  };

  const handleNextRound = () => {
    if (roundIndex >= rounds.length - 1) return;

    setRoundIndex((previous) => previous + 1);
    setAnswer("");
    setSubmitted(false);
    setTimeLeft(roundTime);
    setTimeoutReached(false);
    setLastRoundPoints(0);
  };

  const handleRestart = () => {
    setRoundIndex(0);
    setAnswer("");
    setSubmitted(false);
    setCorrectCount(0);
    setTimeLeft(roundTime);
    setTotalScore(0);
    setLastRoundPoints(0);
    setTimeoutReached(false);
  };

  const isComplete = roundIndex === rounds.length - 1 && submitted;

  return (
    <div className="flex-1 overflow-y-auto overscroll-y-contain bg-background p-4 sm:p-8 pb-24 sm:pb-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card elevated>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight">
                Error Hunter
              </h1>
              <p className="text-text-secondary text-sm mt-1">
                Detecta y corrige un error gramatical en cada oración.
              </p>
              <p className="text-text-muted text-xs mt-1">
                Hay exactamente 1 error por ronda.
              </p>
              <div className="mt-3 flex items-center gap-2 flex-wrap">
                {LEVEL_ORDER.map((level) => (
                  <Button
                    key={level}
                    size="sm"
                    variant={selectedLevel === level ? "primary" : "secondary"}
                    onClick={() => setSelectedLevel(level)}
                    aria-label={`Set error hunter level ${level}`}
                  >
                    {level}
                  </Button>
                ))}
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

          <div className="rounded-xl border border-border bg-surface-2 p-4">
            <p className="text-xs uppercase tracking-widest font-bold text-text-secondary mb-2">
              Oración con error
            </p>
            <p className="text-lg font-semibold text-text-primary">
              "{round.incorrectSentence}"
            </p>
            <p className="text-xs uppercase tracking-widest font-bold text-text-muted mt-2">
              Tipo de error objetivo: {round.errorType}
            </p>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="error-hunter-answer"
              className="text-xs uppercase tracking-widest font-bold text-text-secondary"
            >
              Tu corrección
            </label>
            <textarea
              id="error-hunter-answer"
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              disabled={submitted}
              className="w-full min-h-[96px] rounded-xl border border-border bg-surface-1 p-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-focus"
              placeholder="Write the corrected sentence here..."
            />
          </div>

          {submitted ? (
            <div
              className={`rounded-xl border px-4 py-3 text-sm font-semibold ${isCorrect ? "border-success/40 bg-success/10 text-success" : "border-amber-500/40 bg-amber-500/10 text-amber-400"}`}
            >
              {isCorrect ? (
                <div className="space-y-1">
                  <p>✅ Correcto. Excelente corrección.</p>
                  <p className="text-xs font-black uppercase tracking-widest">
                    +{lastRoundPoints} pts (base {basePoints} + bonus tiempo{" "}
                    {timeBonus} · x{levelMultiplier})
                  </p>
                </div>
              ) : timeoutReached ? (
                <div className="space-y-1">
                  <p>⏰ Tiempo agotado.</p>
                  <p className="text-xs">
                    Corrección correcta: "{round.correctedSentence}"
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <p>❌ Aún no. Intenta en la siguiente ronda.</p>
                  <p className="text-xs">
                    Corrección correcta: "{round.correctedSentence}"
                  </p>
                </div>
              )}
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <Button
              onClick={handleCheck}
              variant="primary"
              size="lg"
              disabled={!answer.trim() || submitted || timeLeft === 0}
            >
              Check correction
            </Button>

            <Button
              onClick={() => setAnswer("")}
              variant="secondary"
              size="lg"
              disabled={!answer.trim() || submitted}
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

export default ErrorHunterView;
