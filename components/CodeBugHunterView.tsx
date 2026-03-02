import React, { useEffect, useMemo, useState } from "react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import { codeBugsData, type CodeBugPrompt } from "../data/codeBugsData";
import { addGlobalXp, progressQuest } from "../utils/xpStore";
import { trackAnalyticsEvent } from "../utils/analytics";
import { playGameSound } from "../utils/audioUtils";
import { Plus } from "lucide-react";

const ROUND_TIME_SECONDS = 30;
const BASE_POINTS_PER_CORRECT = 100;
const TIME_BONUS_MULTIPLIER = 2;

const getLanguageColor = (language: string) => {
  switch (language) {
    case "tsx":
    case "typescript":
      return "text-blue-400";
    case "javascript":
      return "text-yellow-400";
    case "css":
      return "text-pink-400";
    case "python":
      return "text-green-400";
    case "sql":
      return "text-purple-400";
    default:
      return "text-text-primary";
  }
};

const CodeBugHunterView: React.FC = () => {
  const rounds = useMemo(() => {
    const shuffled = [...codeBugsData];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    // Limit to 5 per session
    return shuffled.slice(0, 5);
  }, []);

  const [roundIndex, setRoundIndex] = useState(0);
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME_SECONDS);
  const [totalScore, setTotalScore] = useState(0);
  const [lastRoundPoints, setLastRoundPoints] = useState(0);
  const [timeoutReached, setTimeoutReached] = useState(false);

  const round = rounds[roundIndex];

  useEffect(() => {
    setRoundIndex(0);
    setSelectedLine(null);
    setSubmitted(false);
    setCorrectCount(0);
    setTimeLeft(ROUND_TIME_SECONDS);
    setTotalScore(0);
    setLastRoundPoints(0);
    setTimeoutReached(false);
  }, [rounds]);

  useEffect(() => {
    if (submitted || !round) return;

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
  }, [submitted, roundIndex, round]);

  useEffect(() => {
    if (submitted || timeLeft !== 0 || !round) return;

    setSubmitted(true);
    setTimeoutReached(true);
    setLastRoundPoints(0);
  }, [submitted, timeLeft, round]);

  if (!round) return null;

  const isCorrect = submitted && selectedLine === round.bugLineIndex;
  const timeBonus = Math.round(timeLeft * TIME_BONUS_MULTIPLIER);

  const handleSelectLine = (lineIndex: number) => {
    if (submitted) return;

    // Auto-submit on click
    setSelectedLine(lineIndex);
    setSubmitted(true);
    setTimeoutReached(false);

    if (lineIndex === round.bugLineIndex) {
      playGameSound("correct");
      const roundPoints = BASE_POINTS_PER_CORRECT + timeBonus;
      setCorrectCount((previous) => previous + 1);
      setLastRoundPoints(roundPoints);
      setTotalScore((previous) => previous + roundPoints);

      progressQuest("correct_answers", 1, "any");

      trackAnalyticsEvent("item_correct", {
        game: "bug_hunter",
        language: round.language,
        bug_id: round.id,
      });
      return;
    }

    playGameSound("wrong");
    setLastRoundPoints(0);
    trackAnalyticsEvent("item_wrong", {
      game: "bug_hunter",
      language: round.language,
      bug_id: round.id,
      errorType: "wrong_line",
    });
  };

  const handleNextRound = () => {
    if (roundIndex >= rounds.length - 1) return;

    setRoundIndex((previous) => previous + 1);
    setSelectedLine(null);
    setSubmitted(false);
    setTimeLeft(ROUND_TIME_SECONDS);
    setTimeoutReached(false);
    setLastRoundPoints(0);
  };

  const handleRestart = () => {
    setRoundIndex(0);
    setSelectedLine(null);
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
      progressQuest("play_game", 1, "bug_hunter");
      progressQuest("play_game", 1, "any");
    }
  }, [isComplete, totalScore]);

  return (
    <div className="flex-1 overflow-y-auto overscroll-y-contain bg-background p-4 sm:p-8 pb-4 sm:pb-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card elevated>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight">
                Code Bug Hunter
              </h1>
              <p className="text-text-secondary text-sm mt-1">
                Encuentra y selecciona la línea de código que contiene el bug.
              </p>
              <p className="text-text-muted text-xs mt-1">
                Hay exactamente 1 bug por ronda. ¡Rápido!
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

          <div className="rounded-xl border border-border bg-[#1e1e1e] p-4 font-mono text-sm sm:text-base overflow-x-auto">
            {round.codeLines.map((line, index) => {
              const isSelected = selectedLine === index;
              const isTargetBug = submitted && index === round.bugLineIndex;

              let lineClass = "hover:bg-[#2d2d2d] cursor-pointer text-blue-100";

              if (submitted) {
                lineClass = "cursor-default text-text-muted opacity-50"; // Dim non-involved lines
                if (isTargetBug) {
                  lineClass =
                    "bg-red-500/20 text-red-300 font-bold border-l-4 border-red-500 opacity-100"; // Highlight actual bug
                }
                if (isSelected && !isTargetBug) {
                  lineClass =
                    "bg-amber-500/20 text-amber-300 border-l-4 border-amber-500 opacity-100 line-through"; // User wrong guess
                }
              }

              return (
                <div
                  key={index}
                  onClick={() => handleSelectLine(index)}
                  className={`flex px-2 py-1 transition-colors ${lineClass}`}
                >
                  <span className="w-8 text-right mr-4 text-[#5c6370] select-none">
                    {index + 1}
                  </span>
                  <span className="whitespace-pre flex-1">{line || " "}</span>
                </div>
              );
            })}
          </div>

          {submitted ? (
            <div
              className={`rounded-xl border px-4 py-3 text-sm font-semibold ${isCorrect ? "border-success/40 bg-success/10 text-success" : "border-amber-500/40 bg-amber-500/10 text-amber-400"}`}
            >
              {isCorrect ? (
                <div className="space-y-1">
                  <p>✅ ¡Bingo! Encontraste el bug.</p>
                  <p className="text-xs font-black uppercase tracking-widest">
                    +{lastRoundPoints} pts
                  </p>
                  <p className="text-xs font-normal text-text-primary mt-2 opacity-90 border-t border-success/20 pt-2">
                    {round.explanation}
                  </p>
                </div>
              ) : timeoutReached ? (
                <div className="space-y-1">
                  <p>⏰ Tiempo agotado.</p>
                  <p className="text-xs font-normal text-text-primary mt-2 opacity-90 border-t border-amber-500/20 pt-2">
                    {round.explanation}
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <p>❌ Incorrecto. Ese no era el bug.</p>
                  <p className="text-xs font-normal text-text-primary mt-2 opacity-90 border-t border-amber-500/20 pt-2">
                    {round.explanation}
                  </p>
                </div>
              )}
            </div>
          ) : null}

          <div className="flex flex-wrap items-center gap-3">
            {submitted && !isComplete ? (
              <Button onClick={handleNextRound} variant="success" size="lg">
                Siguiente Bug
              </Button>
            ) : null}

            {submitted && !isCorrect && round ? (
              <Button
                onClick={() => {
                  import("../utils/srs").then(({ createNewSrsItem }) => {
                    const deck = JSON.parse(
                      localStorage.getItem("vocab-vault-deck") || "{}",
                    );
                    const newId = `bug-${Date.now()}`;
                    deck[newId] = createNewSrsItem(
                      `Bug: ${round.language}`,
                      round.explanation,
                    );
                    localStorage.setItem(
                      "vocab-vault-deck",
                      JSON.stringify(deck),
                    );

                    import("./ui/Toast").then(({ toast }) => {
                      toast.success("Bug agregado a tu Vocabulary Vault");
                    });
                  });
                }}
                variant="secondary"
                size="md"
                className="ml-auto"
                title="Save this explanation to review later"
              >
                <Plus size={16} className="mr-1" />
                Add to Vault
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
                let message = "Keep hunting!";
                if (percentage >= 0.9) {
                  grade = "S";
                  gradeColor = "text-fuchsia-400";
                  message = "QA Legend!";
                } else if (percentage >= 0.75) {
                  grade = "A";
                  gradeColor = "text-emerald-400";
                  message = "Eagle Eye Debugger!";
                } else if (percentage >= 0.5) {
                  grade = "B";
                  gradeColor = "text-sky-400";
                  message = "Good Catch!";
                } else if (percentage >= 0.25) {
                  grade = "C";
                  gradeColor = "text-amber-400";
                  message = "Nice Try!";
                }

                return (
                  <>
                    <div>
                      <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400 mb-1">
                        Sesión Completada
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
                    Score Final
                  </div>
                  <div className="text-2xl font-black text-success-hover">
                    {totalScore}
                  </div>
                </div>
                <div className="bg-surface-2 p-3 rounded-xl border border-border">
                  <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">
                    Bugs Encontrados
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
                Score total:{" "}
                <span className="font-black text-text-primary">
                  {totalScore}
                </span>{" "}
                pts
              </p>
              <p className="text-sm text-text-secondary">
                Bugs encontrados:{" "}
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

export default CodeBugHunterView;
