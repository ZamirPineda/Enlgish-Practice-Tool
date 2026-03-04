import React, { useRef, useEffect, useMemo, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import GameStartPanel from "@/components/GameStartPanel";
import GameShell from "@/components/game/GameShell";
import GameHudCard from "@/components/game/GameHudCard";
import DailySessionInsights from "@/components/game/DailySessionInsights";
import {
  diplomaticRounds,
  type DiplomaticRound,
} from "@/features/data/diplomaticData";
import { addGlobalXp, progressQuest } from "@/lib/xpStore";
import { trackAnalyticsEvent } from "@/lib/analytics";
import { playGameSound } from "@/lib/audioUtils";
import {
  getTimeByPreset,
  TIME_PRESET_LABEL,
  TimePreset,
} from "@/lib/gameSessionConfig";

const ROUND_TIME_SECONDS = 45;
const BASE_POINTS_PER_CORRECT = 120;
const TIME_BONUS_MULTIPLIER = 2;

const DiplomaticReviewerView: React.FC = () => {
  const [timePreset, setTimePreset] = useState<TimePreset>("normal");
  const [hasStarted, setHasStarted] = useState(false);
  const rounds = useMemo(() => {
    const shuffled = [...diplomaticRounds];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    // Limit to 5 per session to keep it snappy
    return shuffled.slice(0, 5);
  }, []);

  const [roundIndex, setRoundIndex] = useState(0);
  const sessionStartTime = useRef<number>(Date.now());
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null,
  );
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME_SECONDS);
  const [totalScore, setTotalScore] = useState(0);
  const [lastRoundPoints, setLastRoundPoints] = useState(0);
  const [timeoutReached, setTimeoutReached] = useState(false);

  const round = rounds[roundIndex];
  const roundTime = getTimeByPreset(ROUND_TIME_SECONDS, timePreset);

  // We want to shuffle the options for each round so the correct answer isn't always in the same spot
  const currentOptions = useMemo(() => {
    if (!round) return [];

    // Create an array of options with their original index so we can map back
    const optionsWithIndices = round.options.map((opt, index) => ({
      ...opt,
      originalIndex: index,
    }));

    // Shuffle them
    for (let i = optionsWithIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [optionsWithIndices[i], optionsWithIndices[j]] = [
        optionsWithIndices[j],
        optionsWithIndices[i],
      ];
    }
    return optionsWithIndices;
  }, [round]);

  useEffect(() => {
    setRoundIndex(0);
    setSelectedOptionIndex(null);
    setSubmitted(false);
    setCorrectCount(0);
    setTimeLeft(roundTime);
    setTotalScore(0);
    setLastRoundPoints(0);
    setTimeoutReached(false);
  }, [rounds, roundTime]);

  useEffect(() => {
    if (!hasStarted || submitted || !round) return;

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
  }, [hasStarted, submitted, roundIndex, round]);

  useEffect(() => {
    if (!hasStarted || submitted || timeLeft !== 0 || !round) return;

    setSubmitted(true);
    setTimeoutReached(true);
    setLastRoundPoints(0);
    trackAnalyticsEvent("item_wrong", {
      game: "diplomatic_reviewer",
      round_id: round.id,
      errorType: "timeout",
    });
  }, [hasStarted, submitted, timeLeft, round]);

  if (!round) return null;

  const isCorrect =
    submitted &&
    selectedOptionIndex !== null &&
    currentOptions[selectedOptionIndex].isCorrect;
  const timeBonus = Math.round(timeLeft * TIME_BONUS_MULTIPLIER);

  const startSession = () => {
    sessionStartTime.current = Date.now();
    setHasStarted(true);
    trackAnalyticsEvent("session_start", {
      game: "diplomatic_reviewer",
      timePreset,
      roundTime,
    });
    setRoundIndex(0);
    setSelectedOptionIndex(null);
    setSubmitted(false);
    setCorrectCount(0);
    setTimeLeft(roundTime);
    setTotalScore(0);
    setLastRoundPoints(0);
    setTimeoutReached(false);
  };

  const handleSelectOption = (index: number) => {
    if (submitted) return;

    setSelectedOptionIndex(index);
    setSubmitted(true);
    setTimeoutReached(false);

    const selectedOpt = currentOptions[index];

    if (selectedOpt.isCorrect) {
      playGameSound("correct");
      const roundPoints = BASE_POINTS_PER_CORRECT + timeBonus;
      setCorrectCount((previous) => previous + 1);
      setLastRoundPoints(roundPoints);
      setTotalScore((previous) => previous + roundPoints);

      progressQuest("correct_answers", 1, "any");

      trackAnalyticsEvent("item_correct", {
        game: "diplomatic_reviewer",
        round_id: round.id,
      });
    } else {
      playGameSound("wrong");
      setLastRoundPoints(0);
      trackAnalyticsEvent("item_wrong", {
        game: "diplomatic_reviewer",
        round_id: round.id,
        errorType: "wrong_option",
      });
    }
  };

  const handleNextRound = () => {
    if (roundIndex >= rounds.length - 1) return;

    setRoundIndex((previous) => previous + 1);
    setSelectedOptionIndex(null);
    setSubmitted(false);
    setTimeLeft(roundTime);
    setTimeoutReached(false);
    setLastRoundPoints(0);
  };

  const handleRestart = () => {
    trackAnalyticsEvent("session_end", {
      game: "diplomatic_reviewer",
      duration: Math.round((Date.now() - sessionStartTime.current) / 1000),
    });
    sessionStartTime.current = Date.now();
    trackAnalyticsEvent("session_start", { game: "diplomatic_reviewer" });
    setRoundIndex(0);
    setSelectedOptionIndex(null);
    setSubmitted(false);
    setCorrectCount(0);
    setTimeLeft(roundTime);
    setTotalScore(0);
    setLastRoundPoints(0);
    setTimeoutReached(false);
  };

  const isComplete = roundIndex === rounds.length - 1 && submitted;

  useEffect(() => {
    if (hasStarted && isComplete) {
      trackAnalyticsEvent("session_end", {
        game: "diplomatic_reviewer",
        duration: Math.round((Date.now() - sessionStartTime.current) / 1000),
      });
    }
  }, [hasStarted, isComplete]);

  // Add XP when the game (all 5 rounds) finishes
  useEffect(() => {
    if (isComplete && totalScore > 0) {
      addGlobalXp(totalScore);
      progressQuest("play_game", 1, "any");
      progressQuest("play_game", 1, "diplomatic");
      progressQuest("play_game", 1, "any"); // count as 1 game played
    }
  }, [isComplete, totalScore]);

  const startScreen = (
    <GameStartPanel
      title="Diplomatic Reviewer"
      description="Configura el ritmo de tiempo para tu sesión."
      onStart={startSession}
      startLabel="Iniciar Revisión"
    >
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
        <p className="text-xs text-text-secondary">
          Tiempo por ronda: {roundTime}s
        </p>
      </div>
    </GameStartPanel>
  );

  return (
    <GameShell hasStarted={hasStarted} startScreen={startScreen}>
      <GameHudCard
        title="Diplomatic Reviewer"
        description="Refactoriza el lenguaje tóxico hacia feedback profesional y constructivo."
        timeLeft={timeLeft}
        roundTime={roundTime}
        status={`Situación ${roundIndex + 1} / ${rounds.length}`}
      />

      <Card className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-surface-2 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest text-text-muted border border-border">
              Contexto
            </span>
            <span className="text-sm text-text-secondary">{round.context}</span>
          </div>

          <div className="relative">
            <div className="absolute -left-3 top-3 bottom-3 w-1 bg-red-500/50 rounded-full"></div>
            <div className="pl-4">
              <p className="text-xs uppercase tracking-widest font-bold text-red-400 mb-1">
                Comentario Tóxico
              </p>
              <div className="bg-[#2d1b1e] border border-red-500/20 rounded-xl p-4 text-red-100 font-medium italic">
                "{round.toxicFeedback}"
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm font-semibold text-text-primary text-center">
          Elige la reformulación más profesional y diplomática:
        </p>

        <div className="space-y-3">
          {currentOptions.map((opt, index) => {
            const isSelected = selectedOptionIndex === index;

            let btnVariant: "secondary" | "success" | "danger" = "secondary";

            if (submitted) {
              if (opt.isCorrect) {
                btnVariant = "success"; // Always show the correct one
              } else if (isSelected) {
                btnVariant = "danger"; // Highlight the wrong one they picked
              }
            } else if (isSelected) {
              // Should never hit this because clicking submits, but just in case
              btnVariant = "success";
            }

            return (
              <button
                key={index}
                onClick={() => handleSelectOption(index)}
                disabled={submitted}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  btnVariant === "success"
                    ? "bg-success/20 border-success text-success-hover shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                    : btnVariant === "danger"
                      ? "bg-red-500/20 border-red-500 text-red-400"
                      : "bg-surface-2 border-border text-text-secondary hover:border-focus hover:bg-surface-2-hover hover:text-text-primary"
                } ${submitted && !opt.isCorrect && !isSelected ? "opacity-40" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      btnVariant === "success"
                        ? "border-success bg-success text-[#0f1115]"
                        : btnVariant === "danger"
                          ? "border-red-500 bg-red-500 text-white"
                          : "border-text-muted"
                    }`}
                  >
                    {btnVariant === "success" && (
                      <span className="text-sm leading-none font-black">✓</span>
                    )}
                    {btnVariant === "danger" && (
                      <span className="text-sm leading-none font-black">×</span>
                    )}
                  </div>
                  <span className="font-medium">{opt.text}</span>
                </div>
              </button>
            );
          })}
        </div>

        {submitted && (
          <div
            className={`rounded-xl border px-4 py-3 text-sm font-semibold ${isCorrect ? "border-success/40 bg-success/10 text-success" : "border-amber-500/40 bg-amber-500/10 text-amber-400"}`}
          >
            <div className="space-y-2">
              {isCorrect ? (
                <>
                  <div className="flex justify-between items-center">
                    <p>✅ ¡Excelente diplomacia!</p>
                    <p className="text-xs font-black uppercase tracking-widest bg-success/20 px-2 py-1 rounded">
                      +{lastRoundPoints} pts
                    </p>
                  </div>
                  <p className="text-xs font-normal text-text-primary mt-2 opacity-90 border-t border-success/20 pt-2 leading-relaxed">
                    {currentOptions.find((o) => o.isCorrect)?.explanation}
                  </p>
                </>
              ) : timeoutReached ? (
                <>
                  <p>⏰ Tiempo agotado. Siempre hay que mantener la calma.</p>
                  <p className="text-xs font-normal text-text-primary mt-2 opacity-90 border-t border-amber-500/20 pt-2 leading-relaxed">
                    {currentOptions.find((o) => o.isCorrect)?.explanation}
                  </p>
                </>
              ) : (
                <>
                  <p>
                    ❌ Cuidado, esa opción podría causar fricciones en el
                    equipo.
                  </p>
                  <p className="text-xs font-normal text-text-primary mt-2 opacity-90 border-t border-amber-500/20 pt-2 leading-relaxed">
                    <span className="text-amber-300 font-bold">
                      Por qué falló:
                    </span>{" "}
                    {currentOptions[selectedOptionIndex!].explanation}
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3 pt-2">
          {submitted && !isComplete ? (
            <Button
              onClick={handleNextRound}
              variant="success"
              size="lg"
              className="w-full sm:w-auto"
            >
              Siguiente Situación
            </Button>
          ) : null}

          {isComplete ? (
            <Button
              onClick={handleRestart}
              variant="success"
              size="lg"
              className="w-full sm:w-auto"
            >
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
              let message = "Necesita más tacto.";
              if (percentage >= 0.9) {
                grade = "S";
                gradeColor = "text-fuchsia-400";
                message = "Diplomático Maestro!";
              } else if (percentage >= 0.75) {
                grade = "A";
                gradeColor = "text-emerald-400";
                message = "Gran Comunicador!";
              } else if (percentage >= 0.5) {
                grade = "B";
                gradeColor = "text-sky-400";
                message = "Buen Mediador!";
              } else if (percentage >= 0.25) {
                grade = "C";
                gradeColor = "text-amber-400";
                message = "Puede mejorar.";
              }

              return (
                <>
                  <div>
                    <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400 mb-1">
                      Revisión Finalizada
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
                  Respuestas Diplomáticas
                </div>
                <div className="text-2xl font-black text-accent-hover">
                  {correctCount}/{rounds.length}
                </div>
              </div>
            </div>
            <DailySessionInsights className="mt-4 text-left" />
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-text-secondary">
              Score total:{" "}
              <span className="font-black text-text-primary">{totalScore}</span>{" "}
              pts
            </p>
            <p className="text-sm text-text-secondary">
              Situaciones resueltas:{" "}
              <span className="font-black text-text-primary">
                {correctCount}
              </span>{" "}
              / {roundIndex + (submitted ? 1 : 0)}
            </p>
          </div>
        )}
      </Card>
    </GameShell>
  );
};

export default DiplomaticReviewerView;
