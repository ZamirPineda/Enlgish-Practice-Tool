import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import GameStartPanel from "@/components/GameStartPanel";
import GameShell from "@/components/game/GameShell";
import GameHudCard from "@/components/game/GameHudCard";
import DailySessionInsights from "@/components/game/DailySessionInsights";
import {
  verbPatterns,
  type VerbPatternItem,
} from "@/features/data/verbPatterns";
import { addGlobalXp, progressQuest } from "@/lib/xpStore";
import { trackAnalyticsEvent } from "@/lib/analytics";
import { playGameSound } from "@/lib/audioUtils";
import {
  getTimeByPreset,
  TIME_PRESET_LABEL,
  TimePreset,
} from "@/lib/gameSessionConfig";
import {
  appendAdaptiveDifficultyLog,
  createAdaptiveDifficultyEngine,
  shouldDownshiftByWrongStreak,
  shouldUpshiftByCorrectStreak,
} from "@/lib/adaptiveDifficulty";
import { toast } from "@/components/ui/Toast";

type VerbLevel = VerbPatternItem["level"];
type VerbPattern = VerbPatternItem["pattern"];

const LEVEL_ORDER: VerbLevel[] = ["A2", "B1", "B2", "C1"];
const BASE_TIME_SECONDS: Record<VerbLevel, number> = {
  A2: 20,
  B1: 16,
  B2: 14,
  C1: 12,
};
const LEVEL_MULTIPLIER: Record<VerbLevel, number> = {
  A2: 1,
  B1: 1.25,
  B2: 1.5,
  C1: 1.75,
};
const BASE_POINTS = 100;
const TIME_BONUS_MULT = 4;
const DOWNSHIFT_STREAK = 3;
const UPSHIFT_STREAK = 3;
const ROUNDS_PER_SESSION = 15;

const DIFFICULTY = createAdaptiveDifficultyEngine<VerbLevel>({
  gameId: "verb_patterns",
  levels: LEVEL_ORDER,
  defaultLevel: "B1",
});

const PATTERN_LABELS: Record<VerbPattern, string> = {
  gerund: "Gerund (-ing)",
  infinitive: "Infinitive (to…)",
  both: "Both",
};

const PATTERN_COLORS: Record<VerbPattern, string> = {
  gerund:
    "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/30",
  infinitive:
    "bg-sky-500/20 text-sky-400 border-sky-500/40 hover:bg-sky-500/30",
  both: "bg-amber-500/20 text-amber-400 border-amber-500/40 hover:bg-amber-500/30",
};

const PATTERN_SELECTED_COLORS: Record<VerbPattern, string> = {
  gerund: "bg-emerald-500 text-white border-emerald-400",
  infinitive: "bg-sky-500 text-white border-sky-400",
  both: "bg-amber-500 text-white border-amber-400",
};

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const VerbPatternGameView: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<VerbLevel>(
    DIFFICULTY.defaultLevel,
  );
  const [timePreset, setTimePreset] = useState<TimePreset>("normal");
  const [hasStarted, setHasStarted] = useState(false);
  const [roundIndex, setRoundIndex] = useState(0);
  const [answer, setAnswer] = useState<VerbPattern | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [lastPoints, setLastPoints] = useState(0);
  const [timeLeft, setTimeLeft] = useState(BASE_TIME_SECONDS.B1);
  const [timeoutReached, setTimeoutReached] = useState(false);
  const sessionStartRef = useRef(Date.now());
  const wrongStreakRef = useRef(0);
  const correctStreakRef = useRef(0);

  const rounds = useMemo(() => {
    const levelVerbs = verbPatterns.filter((v) => v.level === selectedLevel);
    return shuffleArray(levelVerbs).slice(0, ROUNDS_PER_SESSION);
  }, [selectedLevel]);

  const round = rounds[roundIndex] as VerbPatternItem | undefined;
  const roundTime = getTimeByPreset(
    BASE_TIME_SECONDS[selectedLevel],
    timePreset,
  );

  const handleLevelSelect = (next: VerbLevel) => {
    setSelectedLevel((cur) => DIFFICULTY.setLevel(cur, next).nextLevel);
  };

  // Reset state when level changes
  useEffect(() => {
    setRoundIndex(0);
    setAnswer(null);
    setSubmitted(false);
    setCorrectCount(0);
    setTimeLeft(roundTime);
    setTotalScore(0);
    setLastPoints(0);
    setTimeoutReached(false);
    wrongStreakRef.current = 0;
    correctStreakRef.current = 0;
  }, [selectedLevel, roundTime]);

  // Timer
  useEffect(() => {
    if (!hasStarted || submitted || !round) return;
    const id = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(id);
          if (prev === 1) playGameSound("timeout");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [hasStarted, submitted, roundIndex, round]);

  const checkDownshift = useCallback(() => {
    if (
      shouldDownshiftByWrongStreak(wrongStreakRef.current, DOWNSHIFT_STREAK)
    ) {
      const transition = DIFFICULTY.decreaseLevel(
        selectedLevel,
        "rule_downshift",
      );
      appendAdaptiveDifficultyLog({
        ...transition,
        trigger: "consecutive_wrong",
        details: { consecutiveErrors: DOWNSHIFT_STREAK },
      });
      wrongStreakRef.current = 0;
      if (transition.changed) {
        setSelectedLevel(transition.nextLevel);
        toast.info(
          `Dificultad ajustada a ${transition.nextLevel} por ${DOWNSHIFT_STREAK} errores seguidos.`,
        );
      }
    }
  }, [selectedLevel]);

  // Handle timeout
  useEffect(() => {
    if (!hasStarted || submitted || timeLeft !== 0 || !round) return;
    setSubmitted(true);
    setTimeoutReached(true);
    setLastPoints(0);
    wrongStreakRef.current += 1;
    correctStreakRef.current = 0;
    checkDownshift();
  }, [checkDownshift, hasStarted, submitted, timeLeft, round]);

  const startSession = useCallback(() => {
    sessionStartRef.current = Date.now();
    trackAnalyticsEvent("session_start", {
      game: "verb_patterns",
      level: selectedLevel,
      timePreset,
    });
    setHasStarted(true);
    setRoundIndex(0);
    setAnswer(null);
    setSubmitted(false);
    setCorrectCount(0);
    setTimeLeft(roundTime);
    setTotalScore(0);
    setLastPoints(0);
    setTimeoutReached(false);
    wrongStreakRef.current = 0;
    correctStreakRef.current = 0;
  }, [selectedLevel, timePreset, roundTime]);

  const handleAnswer = (choice: VerbPattern) => {
    if (submitted) return;
    setAnswer(choice);
  };

  const handleSubmit = () => {
    if (!answer || submitted || !round) return;
    setSubmitted(true);
    setTimeoutReached(false);
    const isLastRound = roundIndex >= rounds.length - 1;
    const isCorrect = answer === round.pattern;
    const mult = LEVEL_MULTIPLIER[round.level];
    const base = Math.round(BASE_POINTS * mult);
    const timeBonus = Math.round(timeLeft * TIME_BONUS_MULT * mult);

    if (isCorrect) {
      playGameSound("correct");
      const pts = base + timeBonus;
      setCorrectCount((c) => c + 1);
      setLastPoints(pts);
      setTotalScore((s) => s + pts);
      wrongStreakRef.current = 0;
      correctStreakRef.current += 1;
      trackAnalyticsEvent("item_correct", {
        game: "verb_patterns",
        verb: round.verb,
        level: round.level,
      });
      progressQuest("correct_answers", 1, "verb_patterns");
      progressQuest("correct_answers", 1, "any");

      if (
        !isLastRound &&
        shouldUpshiftByCorrectStreak(correctStreakRef.current, UPSHIFT_STREAK)
      ) {
        const transition = DIFFICULTY.increaseLevel(
          selectedLevel,
          "rule_upshift",
        );
        appendAdaptiveDifficultyLog({
          ...transition,
          trigger: "consecutive_correct",
          details: { consecutiveCorrect: UPSHIFT_STREAK },
        });
        correctStreakRef.current = 0;
        if (transition.changed) {
          setSelectedLevel(transition.nextLevel);
          toast.success(
            `Dificultad ajustada a ${transition.nextLevel} por ${UPSHIFT_STREAK} aciertos seguidos.`,
          );
        }
      }
    } else {
      playGameSound("wrong");
      setLastPoints(0);
      correctStreakRef.current = 0;
      wrongStreakRef.current += 1;
      trackAnalyticsEvent("item_wrong", {
        game: "verb_patterns",
        verb: round.verb,
        level: round.level,
        errorType: "wrong_pattern",
      });
      if (!isLastRound) checkDownshift();
    }
  };

  const handleNext = () => {
    if (roundIndex >= rounds.length - 1) return;
    setRoundIndex((i) => i + 1);
    setAnswer(null);
    setSubmitted(false);
    setTimeLeft(roundTime);
    setTimeoutReached(false);
    setLastPoints(0);
  };

  const handleRestart = () => {
    trackAnalyticsEvent("session_end", {
      game: "verb_patterns",
      duration: Math.round((Date.now() - sessionStartRef.current) / 1000),
    });
    startSession();
  };

  const isComplete = roundIndex === rounds.length - 1 && submitted;
  const isCorrect = submitted && round && answer === round.pattern;

  useEffect(() => {
    if (hasStarted && isComplete) {
      trackAnalyticsEvent("session_end", {
        game: "verb_patterns",
        duration: Math.round((Date.now() - sessionStartRef.current) / 1000),
      });
    }
  }, [hasStarted, isComplete]);

  useEffect(() => {
    if (isComplete && totalScore > 0) {
      addGlobalXp(totalScore);
      progressQuest("play_game", 1, "any");
      progressQuest("play_game", 1, "verb_patterns");
    }
  }, [isComplete, totalScore]);

  if (!round && hasStarted) {
    return (
      <div className="flex-1 overflow-y-auto bg-background p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <p className="text-text-secondary text-sm">
              No verbs available for this level yet.
            </p>
          </Card>
        </div>
      </div>
    );
  }

  const startScreen = (
    <GameStartPanel
      title="Verb Patterns"
      description="¿Gerund, Infinitive o Both? Clasifica cada verbo correctamente."
      onStart={startSession}
      startLabel="¡Comenzar!"
    >
      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-widest text-text-muted">
          Dificultad
        </p>
        <div className="flex justify-center flex-wrap gap-2">
          {LEVEL_ORDER.map((lvl) => (
            <Button
              key={`setup-${lvl}`}
              size="sm"
              variant={selectedLevel === lvl ? "primary" : "secondary"}
              onClick={() => handleLevelSelect(lvl)}
            >
              {lvl}
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
        <p className="text-xs text-text-secondary">
          Tiempo por ronda: {roundTime}s
        </p>
      </div>

      {/* Quick rules */}
      <div className="text-left space-y-2 mt-2 bg-surface-2 rounded-xl p-4 border border-border">
        <p className="text-xs font-bold uppercase tracking-widest text-text-muted">
          ¿Cómo funciona?
        </p>
        <ul className="text-sm text-text-secondary space-y-1.5">
          <li>
            <span className="inline-block w-3 h-3 rounded-full bg-emerald-500 mr-2 align-middle" />
            <strong>Gerund</strong>: verbo + -ing (enjoy <em>swimming</em>)
          </li>
          <li>
            <span className="inline-block w-3 h-3 rounded-full bg-sky-500 mr-2 align-middle" />
            <strong>Infinitive</strong>: to + verbo (decide <em>to go</em>)
          </li>
          <li>
            <span className="inline-block w-3 h-3 rounded-full bg-amber-500 mr-2 align-middle" />
            <strong>Both</strong>: acepta ambos (a veces cambia el significado)
          </li>
        </ul>
      </div>
    </GameStartPanel>
  );

  return (
    <GameShell
      hasStarted={hasStarted}
      startScreen={startScreen}
      contentKey={isComplete ? "summary" : "active"}
    >
      <GameHudCard
        title="Verb Patterns"
        description="¿Gerund, Infinitive o Both?"
        timeLeft={timeLeft}
        roundTime={roundTime}
        status={`Ronda ${roundIndex + 1} / ${rounds.length}`}
        controls={LEVEL_ORDER.map((lvl) => (
          <Button
            key={lvl}
            size="sm"
            variant={selectedLevel === lvl ? "primary" : "secondary"}
            onClick={() => handleLevelSelect(lvl)}
            aria-label={`Set verb pattern level ${lvl}`}
          >
            {lvl}
          </Button>
        ))}
      />

      {round && (
        <Card className="space-y-5">
          {/* Verb display */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="text-xs uppercase tracking-widest font-bold text-text-secondary">
              Nivel {round.level}
            </div>
            <div className="text-xs text-text-muted italic">
              {round.translation}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface-2 p-6 text-center">
            <p className="text-xs uppercase tracking-widest font-bold text-text-secondary mb-3">
              ¿Qué patrón sigue este verbo?
            </p>
            <p className="text-4xl font-black text-text-primary tracking-tight">
              {round.verb}
            </p>
          </div>

          {/* Answer buttons */}
          <div className="grid grid-cols-3 gap-3">
            {(["gerund", "infinitive", "both"] as VerbPattern[]).map(
              (pattern) => {
                const isSelected = answer === pattern;
                const showResult = submitted;
                const isCorrectAnswer = round.pattern === pattern;

                let btnClass: string;
                if (showResult && isCorrectAnswer) {
                  btnClass =
                    "bg-success/20 text-success border-success/60 ring-2 ring-success/40";
                } else if (showResult && isSelected && !isCorrectAnswer) {
                  btnClass =
                    "bg-red-500/20 text-red-400 border-red-500/60 ring-2 ring-red-500/40";
                } else if (isSelected) {
                  btnClass = PATTERN_SELECTED_COLORS[pattern];
                } else {
                  btnClass = PATTERN_COLORS[pattern];
                }

                return (
                  <button
                    key={pattern}
                    onClick={() => handleAnswer(pattern)}
                    disabled={submitted || timeLeft === 0}
                    className={`rounded-xl border px-4 py-4 text-sm font-bold transition-all active:scale-[0.97] disabled:opacity-50 ${btnClass}`}
                  >
                    {PATTERN_LABELS[pattern]}
                  </button>
                );
              },
            )}
          </div>

          {/* Feedback */}
          {submitted && (
            <div
              className={`rounded-xl border px-4 py-3 text-sm font-semibold animate-fade-in ${
                isCorrect
                  ? "border-success/40 bg-success/10 text-success"
                  : "border-amber-500/40 bg-amber-500/10 text-amber-400"
              }`}
            >
              {isCorrect ? (
                <div className="space-y-2">
                  <p>
                    ✅ ¡Correcto! <strong>{round.verb}</strong> lleva{" "}
                    <strong>{PATTERN_LABELS[round.pattern]}</strong>.
                  </p>
                  <p className="text-xs font-black uppercase tracking-widest">
                    +{lastPoints} pts
                  </p>
                </div>
              ) : timeoutReached ? (
                <div className="space-y-2">
                  <p>⏰ Tiempo agotado.</p>
                  <p className="text-xs">
                    La respuesta correcta es:{" "}
                    <strong>{PATTERN_LABELS[round.pattern]}</strong>
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p>❌ Incorrecto.</p>
                  <p className="text-xs">
                    La respuesta correcta es:{" "}
                    <strong>{PATTERN_LABELS[round.pattern]}</strong>
                  </p>
                </div>
              )}

              {/* Show examples */}
              <div className="mt-3 space-y-1.5 text-xs text-text-secondary font-normal">
                {round.exampleGerund && (
                  <p>
                    <span className="font-bold text-emerald-400">Gerund:</span>{" "}
                    {round.exampleGerund}
                  </p>
                )}
                {round.exampleInfinitive && (
                  <p>
                    <span className="font-bold text-sky-400">Infinitive:</span>{" "}
                    {round.exampleInfinitive}
                  </p>
                )}
                {round.meaningChangeNote && (
                  <div className="mt-2 rounded-lg bg-amber-500/10 border border-amber-500/30 px-3 py-2">
                    <p className="font-bold text-amber-400 text-[10px] uppercase tracking-widest mb-1">
                      💡 Cambio de significado
                    </p>
                    <p className="text-text-secondary">
                      {round.meaningChangeNote}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            {!submitted && (
              <Button
                onClick={handleSubmit}
                variant="primary"
                size="lg"
                disabled={!answer || timeLeft === 0}
              >
                Confirmar
              </Button>
            )}

            {submitted && !isComplete && (
              <Button onClick={handleNext} variant="success" size="lg">
                Siguiente
              </Button>
            )}

            {isComplete && (
              <Button onClick={handleRestart} variant="success" size="lg">
                Jugar de nuevo
              </Button>
            )}
          </div>
        </Card>
      )}

      {/* Score / Summary */}
      <Card>
        {isComplete ? (
          <div className="text-center space-y-6 animate-fade-in py-4">
            {(() => {
              const pct = correctCount / rounds.length;
              let grade = "D";
              let gradeColor = "text-slate-400";
              let message = "¡Sigue practicando!";
              if (pct >= 0.9) {
                grade = "S";
                gradeColor = "text-fuchsia-400";
                message = "¡Maestro de verbos!";
              } else if (pct >= 0.75) {
                grade = "A";
                gradeColor = "text-emerald-400";
                message = "¡Excelente dominio!";
              } else if (pct >= 0.5) {
                grade = "B";
                gradeColor = "text-sky-400";
                message = "¡Buen trabajo!";
              } else if (pct >= 0.25) {
                grade = "C";
                gradeColor = "text-amber-400";
                message = "¡Buen intento!";
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
                        Rango
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
                  Aciertos
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
              Aciertos:{" "}
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

export default VerbPatternGameView;
