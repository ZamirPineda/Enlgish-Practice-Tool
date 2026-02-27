import React, { useEffect, useMemo, useState } from "react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import { codeSyntaxData, type CodeSyntaxPrompt } from "../data/codeSyntaxData";
import { addGlobalXp, progressQuest } from "../utils/xpStore";
import { trackAnalyticsEvent } from "../utils/analytics";
import { playGameSound } from "../utils/audioUtils";

const ROUND_TIME_SECONDS = 45;
const BASE_POINTS_PER_CORRECT = 150;
const TIME_BONUS_MULTIPLIER = 3;

const shuffleTokens = (tokens: string[]): string[] => {
  const shuffled = [...tokens];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  const isSameOrder = shuffled.every((token, index) => token === tokens[index]);
  if (isSameOrder && shuffled.length > 1) {
    [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
  }

  return shuffled;
};

const getLanguageColor = (language: string) => {
  switch (language) {
    case "typescript":
      return "text-blue-400";
    case "javascript":
      return "text-yellow-400";
    case "css":
      return "text-pink-400";
    case "bash":
      return "text-green-400";
    case "sql":
      return "text-purple-400";
    default:
      return "text-text-primary";
  }
};

const CodeSyntaxBuilderView: React.FC = () => {
  const rounds = useMemo(() => {
    const shuffled = [...codeSyntaxData];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    // Pick 5 random rounds per session
    return shuffled.slice(0, 5);
  }, []);

  const [roundIndex, setRoundIndex] = useState(0);
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME_SECONDS);
  const [totalScore, setTotalScore] = useState(0);
  const [lastRoundPoints, setLastRoundPoints] = useState(0);
  const [timeoutReached, setTimeoutReached] = useState(false);

  const round = rounds[roundIndex];

  useEffect(() => {
    setRoundIndex(0);
    setSelectedTokens([]);
    setSubmitted(false);
    setCorrectCount(0);
    setTimeLeft(ROUND_TIME_SECONDS);
    setTotalScore(0);
    setLastRoundPoints(0);
    setTimeoutReached(false);
  }, [rounds]);

  useEffect(() => {
    if (submitted) return;

    const timerId = window.setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          window.clearInterval(timerId);
          if (previous === 1 && !submitted) {
            playGameSound("timeout");
          }
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

  const shuffledTokens = useMemo(
    () => shuffleTokens(round?.tokens || []),
    [round],
  );

  const availableTokens = useMemo(() => {
    const usageCount: Record<string, number> = {};

    return shuffledTokens.filter((token) => {
      usageCount[token] = (usageCount[token] || 0) + 1;
      const selectedCount = selectedTokens.filter(
        (item) => item === token,
      ).length;
      return usageCount[token] > selectedCount;
    });
  }, [selectedTokens, shuffledTokens]);

  const expectedSyntax = (round?.tokens || []).join(" ");
  const userSyntax = selectedTokens.join(" ");
  const isCorrect = submitted && userSyntax === expectedSyntax;
  const timeBonus = Math.round(timeLeft * TIME_BONUS_MULTIPLIER);

  const handleSelectToken = (token: string) => {
    if (submitted) return;
    setSelectedTokens((previous) => [...previous, token]);
  };

  const handleUndoToken = (index: number) => {
    if (submitted) return;
    setSelectedTokens((previous) =>
      previous.filter((_, itemIndex) => itemIndex !== index),
    );
  };

  const handleCheck = () => {
    if (selectedTokens.length === 0 || submitted) return;
    const nextIsCorrect = userSyntax === expectedSyntax;
    setSubmitted(true);
    setTimeoutReached(false);
    if (nextIsCorrect) {
      playGameSound("correct");
      setCorrectCount((previous) => previous + 1);
      const roundPoints = BASE_POINTS_PER_CORRECT + timeBonus;
      setLastRoundPoints(roundPoints);
      setTotalScore((previous) => previous + roundPoints);

      progressQuest("correct_answers", 1, "any");

      trackAnalyticsEvent("item_correct", {
        game: "syntax_builder",
        language: round.language,
        prompt: round.prompt,
      });
      return;
    }

    playGameSound("wrong");
    setLastRoundPoints(0);
    trackAnalyticsEvent("item_wrong", {
      game: "syntax_builder",
      language: round.language,
      prompt: round.prompt,
      errorType: "order",
    });
  };

  const handleNextRound = () => {
    if (roundIndex >= rounds.length - 1) return;
    setRoundIndex((previous) => previous + 1);
    setSelectedTokens([]);
    setSubmitted(false);
    setTimeLeft(ROUND_TIME_SECONDS);
    setTimeoutReached(false);
    setLastRoundPoints(0);
  };

  const handleRestart = () => {
    setRoundIndex(0);
    setSelectedTokens([]);
    setSubmitted(false);
    setCorrectCount(0);
    setTimeLeft(ROUND_TIME_SECONDS);
    setTotalScore(0);
    setLastRoundPoints(0);
    setTimeoutReached(false);
  };

  const isComplete = roundIndex === rounds.length - 1 && submitted;

  useEffect(() => {
    if (isComplete && totalScore > 0) {
      addGlobalXp(totalScore);
      progressQuest("play_game", 1, "any");
    }
  }, [isComplete, totalScore]);

  if (!round) return null;

  return (
    <div className="flex-1 overflow-y-auto overscroll-y-contain bg-background p-4 sm:p-8 pb-24 sm:pb-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card elevated>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight">
                Code Syntax Builder
              </h1>
              <p className="text-text-secondary text-sm mt-1">
                Ordena los bloques para formar la sintaxis correcta.
              </p>
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-text-secondary">
              Ronda {roundIndex + 1} / {rounds.length}
            </div>
            <div className="w-full sm:w-auto flex-1 max-w-xs">
              <div className="flex justify-between text-xs font-black uppercase tracking-widest text-amber-400 mb-1">
                <span>⏱ Tiempo</span>
                <span>{timeLeft}s</span>
              </div>
              <div className="w-full h-2 bg-surface-2 rounded-full overflow-hidden shadow-inner border border-border">
                <div
                  className={`h-full transition-all duration-1000 ease-linear rounded-full ${timeLeft <= 10 ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-pulse" : timeLeft <= ROUND_TIME_SECONDS / 2 ? "bg-amber-400" : "bg-success"}`}
                  style={{ width: `${(timeLeft / ROUND_TIME_SECONDS) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </Card>

        <Card className="space-y-5">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div
              className={`text-sm uppercase tracking-widest font-bold ${getLanguageColor(round.language)}`}
            >
              {round.language}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface-2 px-4 py-3">
            <p className="text-sm font-semibold text-text-primary">
              {round.prompt}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest font-bold text-text-secondary mb-2">
              Tu código
            </p>
            <div className="min-h-[76px] rounded-xl border border-border bg-[#1e1e1e] p-4 flex flex-wrap gap-2 items-center">
              {selectedTokens.length === 0 ? (
                <span className="text-sm text-text-muted font-mono italic">
                  // Selecciona bloques de abajo...
                </span>
              ) : (
                selectedTokens.map((token, index) => (
                  <button
                    key={`${token}-${index}`}
                    onClick={() => handleUndoToken(index)}
                    className="px-2 py-1 rounded bg-[#2d2d2d] border border-[#404040] text-sm font-mono font-medium text-blue-300 hover:bg-[#3d3d3d] transition-colors"
                  >
                    {token}
                  </button>
                ))
              )}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest font-bold text-text-secondary mb-2">
              Bloques disponibles
            </p>
            <div className="rounded-xl border border-border bg-surface-1 p-4 flex flex-wrap gap-2">
              {availableTokens.map((token, index) => (
                <button
                  key={`${token}-${index}`}
                  onClick={() => handleSelectToken(token)}
                  className="px-2 py-1 rounded bg-surface-2 border border-border text-sm font-mono font-medium text-text-primary hover:bg-surface-hover hover:border-focus transition-colors shadow-sm"
                  disabled={submitted}
                >
                  {token}
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
                  <p>✅ Sintaxis impecable.</p>
                  <p className="text-xs font-black uppercase tracking-widest">
                    +{lastRoundPoints} pts
                  </p>
                </div>
              ) : timeoutReached ? (
                <div className="space-y-1">
                  <p>⏰ Tiempo agotado.</p>
                  <p className="text-xs font-mono mt-1 text-text-primary opacity-80">
                    Respuesta: {expectedSyntax}
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <p>❌ Error de sintaxis.</p>
                  <p className="text-xs font-mono mt-1 text-text-primary opacity-80">
                    Respuesta: {expectedSyntax}
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
              disabled={
                selectedTokens.length === 0 || submitted || timeLeft === 0
              }
            >
              Compilar / Run
            </Button>

            <Button
              onClick={() => setSelectedTokens([])}
              variant="secondary"
              size="lg"
              disabled={selectedTokens.length === 0 || submitted}
            >
              Limpiar
            </Button>

            {submitted && !isComplete ? (
              <Button onClick={handleNextRound} variant="success" size="lg">
                Siguiente
              </Button>
            ) : null}

            {isComplete ? (
              <Button onClick={handleRestart} variant="success" size="lg">
                Jugar de nuevo
              </Button>
            ) : null}
          </div>
        </Card>

        <Card>
          {isComplete ? (
            <div className="text-center space-y-6 animate-fade-in py-4">
              {(() => {
                const percentage = correctCount / rounds.length;
                let grade = "D";
                let gradeColor = "text-slate-400";
                let message = "Sigue practicando.";
                if (percentage >= 0.9) {
                  grade = "S";
                  gradeColor = "text-fuchsia-400";
                  message = "Sr. Developer!";
                } else if (percentage >= 0.75) {
                  grade = "A";
                  gradeColor = "text-emerald-400";
                  message = "Excelente código!";
                } else if (percentage >= 0.5) {
                  grade = "B";
                  gradeColor = "text-sky-400";
                  message = "Buen trabajo!";
                } else if (percentage >= 0.25) {
                  grade = "C";
                  gradeColor = "text-amber-400";
                  message = "Buen intento!";
                }

                return (
                  <>
                    <div>
                      <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400 mb-1">
                        Build Satisfactoria
                      </h2>
                      <p className="text-text-secondary">{message}</p>
                    </div>

                    <div className="flex justify-center items-center py-2">
                      <div className="text-center">
                        <div className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">
                          Evaluación
                        </div>
                        <div
                          className={`text-6xl font-black ${gradeColor} drop-shadow-lg animate-bounce`}
                        >
                          {grade}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}

              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                <div className="bg-surface-2 p-3 rounded-xl border border-border">
                  <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">
                    Puntos XP
                  </div>
                  <div className="text-2xl font-black text-success-hover">
                    {totalScore}
                  </div>
                </div>
                <div className="bg-surface-2 p-3 rounded-xl border border-border">
                  <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">
                    Compilaciones Exitosas
                  </div>
                  <div className="text-2xl font-black text-accent-hover">
                    {correctCount}/{rounds.length}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-text-secondary">
                Puntos:{" "}
                <span className="font-black text-text-primary">
                  {totalScore}
                </span>{" "}
                pts
              </p>
              <p className="text-sm text-text-secondary">
                Exitosas:{" "}
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

export default CodeSyntaxBuilderView;
