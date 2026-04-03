import React, {
  useRef,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { useSearchParams } from "react-router-dom";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Coachmark from "@/components/ui/Coachmark";
import GameStartPanel from "@/components/GameStartPanel";
import GameShell from "@/components/game/GameShell";
import GameHudCard from "@/components/game/GameHudCard";
import DailySessionInsights from "@/components/game/DailySessionInsights";
import {
  speedBuilderRounds,
  type SpeedBuilderRound,
} from "@/features/data/speedBuilder";
import { addGlobalXp, progressQuest } from "@/lib/xpStore";
import { trackAnalyticsEvent } from "@/lib/analytics";
import { playGameSound } from "@/lib/audioUtils";
import { Plus } from "lucide-react";
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
import {
  matchesRoadmapTags,
  parseRoadmapSessionConfig,
} from "@/lib/roadmapLaunch";

type SpeedBuilderLevel = SpeedBuilderRound["level"];
const LEVEL_ORDER: SpeedBuilderLevel[] = ["A1", "A2", "B1", "B2", "C1"];

const ROUND_TIME_SECONDS: Record<SpeedBuilderLevel, number> = {
  A1: 60,
  A2: 55,
  B1: 45,
  B2: 35,
  C1: 30,
};
const LEVEL_SCORE_MULTIPLIER: Record<SpeedBuilderLevel, number> = {
  A1: 1,
  A2: 1.1,
  B1: 1.25,
  B2: 1.5,
  C1: 1.75,
};
const BASE_POINTS_PER_CORRECT = 100;
const TIME_BONUS_MULTIPLIER = 2;
const DOWNSHIFT_AFTER_WRONG_STREAK = 3;
const UPSHIFT_AFTER_CORRECT_STREAK = 3;
const SPEED_BUILDER_DIFFICULTY =
  createAdaptiveDifficultyEngine<SpeedBuilderLevel>({
    gameId: "speed_builder",
    levels: LEVEL_ORDER,
    defaultLevel: "A2",
  });

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
  const [searchParams] = useSearchParams();
  const roadmapConfig = useMemo(
    () => parseRoadmapSessionConfig(searchParams, "speed_builder"),
    [searchParams],
  );
  const didAutoStartRef = useRef(false);
  const resolveRoadmapLevel = (value?: string | null): SpeedBuilderLevel => {
    if (value && LEVEL_ORDER.includes(value as SpeedBuilderLevel)) {
      return value as SpeedBuilderLevel;
    }

    return SPEED_BUILDER_DIFFICULTY.defaultLevel;
  };
  const [selectedLevel, setSelectedLevel] = useState<SpeedBuilderLevel>(
    resolveRoadmapLevel(roadmapConfig?.difficulty),
  );
  const [timePreset, setTimePreset] = useState<TimePreset>("normal");
  const [hasStarted, setHasStarted] = useState(false);
  const rounds = useMemo(() => {
    const levelRounds = speedBuilderRounds.filter(
      (item) => item.level === selectedLevel,
    );
    const filteredLevelRounds = levelRounds.filter((item) =>
      matchesRoadmapTags(item.tags, roadmapConfig?.tags || []),
    );
    const candidateRounds =
      filteredLevelRounds.length > 0 ? filteredLevelRounds : levelRounds;
    // Simple Fisher-Yates shuffle for replayability
    const shuffled = [...candidateRounds];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [roadmapConfig?.tags, selectedLevel]);

  const [roundIndex, setRoundIndex] = useState(0);
  const sessionStartTime = useRef<number>(Date.now());
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME_SECONDS.A2);
  const [totalScore, setTotalScore] = useState(0);
  const [lastRoundPoints, setLastRoundPoints] = useState(0);
  const [timeoutReached, setTimeoutReached] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const wrongStreakRef = useRef(0);
  const correctStreakRef = useRef(0);
  const beginnerLevel = selectedLevel === "A1" || selectedLevel === "A2";

  const round = rounds[roundIndex];

  const roundTime = getTimeByPreset(
    ROUND_TIME_SECONDS[selectedLevel],
    timePreset,
  );

  const handleLevelSelect = (nextLevel: SpeedBuilderLevel) => {
    setSelectedLevel(
      (currentLevel) =>
        SPEED_BUILDER_DIFFICULTY.setLevel(currentLevel, nextLevel).nextLevel,
    );
  };

  useEffect(() => {
    if (!roadmapConfig?.difficulty) return;
    setSelectedLevel(resolveRoadmapLevel(roadmapConfig.difficulty));
  }, [roadmapConfig?.difficulty]);

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
    wrongStreakRef.current = 0;
    correctStreakRef.current = 0;
  }, [selectedLevel, roundTime]);

  useEffect(() => {
    if (!hasStarted || submitted) return;

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
  }, [hasStarted, submitted, roundIndex]);

  useEffect(() => {
    if (!hasStarted || submitted || timeLeft !== 0) return;

    setSubmitted(true);
    setTimeoutReached(true);
    setLastRoundPoints(0);
  }, [hasStarted, submitted, timeLeft]);

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
  const levelMultiplier = LEVEL_SCORE_MULTIPLIER[round.level];
  const basePoints = Math.round(BASE_POINTS_PER_CORRECT * levelMultiplier);
  const timeBonus = Math.round(
    timeLeft * TIME_BONUS_MULTIPLIER * levelMultiplier,
  );

  const startSession = useCallback(() => {
    sessionStartTime.current = Date.now();
    setHasStarted(true);
    trackAnalyticsEvent("session_start", {
      game: "speed_builder",
      level: selectedLevel,
      timePreset,
      roundTime,
      roadmapNodeId: roadmapConfig?.nodeId,
      roadmapRouteObjective: roadmapConfig?.routeObjective,
      roadmapTags: roadmapConfig?.tags,
    });
    setRoundIndex(0);
    setSelectedWords([]);
    setSubmitted(false);
    setCorrectCount(0);
    setTimeLeft(roundTime);
    setTotalScore(0);
    setLastRoundPoints(0);
    setTimeoutReached(false);
    setShowHint(false);
    wrongStreakRef.current = 0;
    correctStreakRef.current = 0;
  }, [
    roadmapConfig?.nodeId,
    roadmapConfig?.routeObjective,
    roadmapConfig?.tags,
    roundTime,
    selectedLevel,
    timePreset,
  ]);

  useEffect(() => {
    if (
      !roadmapConfig?.autostart ||
      hasStarted ||
      didAutoStartRef.current ||
      rounds.length === 0
    ) {
      return;
    }

    didAutoStartRef.current = true;
    startSession();
  }, [hasStarted, roadmapConfig?.autostart, rounds.length, startSession]);

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
    const isLastRound = roundIndex >= rounds.length - 1;
    if (nextIsCorrect) {
      playGameSound("correct");
      setCorrectCount((previous) => previous + 1);
      const roundPoints = basePoints + timeBonus;
      setLastRoundPoints(roundPoints);
      setTotalScore((previous) => previous + roundPoints);
      wrongStreakRef.current = 0;
      correctStreakRef.current += 1;
      trackAnalyticsEvent("item_correct", {
        game: "speed_builder",
        level: round.level,
        sentence: expectedSentence,
      });

      if (
        !isLastRound &&
        shouldUpshiftByCorrectStreak(
          correctStreakRef.current,
          UPSHIFT_AFTER_CORRECT_STREAK,
        )
      ) {
        const transition = SPEED_BUILDER_DIFFICULTY.increaseLevel(
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
        if (transition.changed) {
          setSelectedLevel(transition.nextLevel);
          toast.success(
            `Dificultad ajustada a ${transition.nextLevel} por ${UPSHIFT_AFTER_CORRECT_STREAK} aciertos seguidos.`,
          );
        }
      }
      return;
    }

    playGameSound("wrong");
    setLastRoundPoints(0);
    correctStreakRef.current = 0;
    trackAnalyticsEvent("item_wrong", {
      game: "speed_builder",
      level: round.level,
      sentence: expectedSentence,
      errorType: "order",
    });

    wrongStreakRef.current += 1;
    if (
      !isLastRound &&
      shouldDownshiftByWrongStreak(
        wrongStreakRef.current,
        DOWNSHIFT_AFTER_WRONG_STREAK,
      )
    ) {
      const transition = SPEED_BUILDER_DIFFICULTY.decreaseLevel(
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
      if (transition.changed) {
        setSelectedLevel(transition.nextLevel);
        toast.info(
          `Dificultad ajustada a ${transition.nextLevel} por ${DOWNSHIFT_AFTER_WRONG_STREAK} errores seguidos.`,
        );
      }
    }
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
    trackAnalyticsEvent("session_end", {
      game: "speed_builder",
      duration: Math.round((Date.now() - sessionStartTime.current) / 1000),
    });
    sessionStartTime.current = Date.now();
    trackAnalyticsEvent("session_start", { game: "speed_builder" });
    setRoundIndex(0);
    setSelectedWords([]);
    setSubmitted(false);
    setCorrectCount(0);
    setTimeLeft(roundTime);
    setTotalScore(0);
    setLastRoundPoints(0);
    setTimeoutReached(false);
    setShowHint(false);
    wrongStreakRef.current = 0;
    correctStreakRef.current = 0;
  };

  const isComplete = roundIndex === rounds.length - 1 && submitted;

  useEffect(() => {
    if (hasStarted && isComplete) {
      trackAnalyticsEvent("session_end", {
        game: "speed_builder",
        duration: Math.round((Date.now() - sessionStartTime.current) / 1000),
      });
    }
  }, [hasStarted, isComplete]);

  useEffect(() => {
    if (isComplete && totalScore > 0) {
      addGlobalXp(totalScore);
      progressQuest("play_game", 1, "any");
      progressQuest("play_game", 1, "speed");
    }
  }, [isComplete, totalScore]);

  const hintText = useMemo(() => {
    const words = round.sentence.split(/\s+/);
    if (words.length <= 2) {
      return round.sentence;
    }
    return `${words[0]} ... ${words[words.length - 1]}`;
  }, [round.sentence]);

  const startScreen = (
    <GameStartPanel
      title="Speed Builder"
      description="Elige tu nivel y ritmo para iniciar la sesión."
      onStart={startSession}
      startLabel="Iniciar Speed Builder"
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
              {level}
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
    </GameStartPanel>
  );

  return (
    <GameShell
      hasStarted={hasStarted}
      startScreen={startScreen}
      contentKey={isComplete ? "summary" : "active"}
    >
      <GameHudCard
        title="Speed Builder"
        description="Ordena las palabras para formar la oración correcta."
        timeLeft={timeLeft}
        roundTime={roundTime}
        status={`Ronda ${roundIndex + 1} / ${rounds.length}`}
        controls={LEVEL_ORDER.map((level) => (
          <Button
            key={level}
            size="sm"
            variant={selectedLevel === level ? "primary" : "secondary"}
            onClick={() => handleLevelSelect(level)}
            aria-label={`Set level ${level}`}
          >
            {level}
          </Button>
        ))}
      />

      <Card className="space-y-5">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="text-xs uppercase tracking-widest font-bold text-text-secondary">
            Nivel {round.level}
          </div>
          <div className="text-xs uppercase tracking-widest font-bold text-text-muted">
            {round.tags.join(" · ")}
          </div>
        </div>

        {beginnerLevel && !submitted ? (
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

        <Coachmark
          id="speed-builder-response-flow"
          enabled={beginnerLevel && !submitted}
          title="Construye la frase en orden"
          description="Empieza tocando palabras desde la lista inferior. Si te equivocas, toca una ficha en Tu respuesta para quitarla antes de validar."
          placement="bottom-start"
        >
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
        </Coachmark>

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
                  +{lastRoundPoints} pts (base {basePoints} + bonus tiempo{" "}
                  {timeBonus} · x{levelMultiplier})
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
            disabled={selectedWords.length === 0 || submitted || timeLeft === 0}
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

          {submitted && !isCorrect && round ? (
            <Button
              onClick={() => {
                import("@/lib/srs").then(({ createNewSrsItem }) => {
                  const deck = JSON.parse(
                    localStorage.getItem("vocab-vault-deck") || "{}",
                  );
                  const newId = `speed-${Date.now()}`;
                  deck[newId] = createNewSrsItem(
                    `Phrase: ${round.sentence}`,
                    `Speed Builder Level ${round.level}`,
                  );
                  localStorage.setItem(
                    "vocab-vault-deck",
                    JSON.stringify(deck),
                  );

                  import("@/components/ui/Toast").then(({ toast }) => {
                    toast.success("Frase agregada a tu Vocabulary Vault");
                  });
                });
              }}
              variant="secondary"
              size="md"
              className="ml-auto"
              title="Save this phrase to review later"
            >
              <Plus size={16} className="mr-1" />
              Add to Vault
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
          <div className="text-center space-y-6 animate-fade-in py-4">
            {(() => {
              const percentage = correctCount / rounds.length;
              let grade = "D";
              let gradeColor = "text-slate-400";
              let message = "Keep practicing!";
              if (percentage >= 0.9) {
                grade = "S";
                gradeColor = "text-fuchsia-400";
                message = "Speed Builder Master!";
              } else if (percentage >= 0.75) {
                grade = "A";
                gradeColor = "text-emerald-400";
                message = "Excellent Speed!";
              } else if (percentage >= 0.5) {
                grade = "B";
                gradeColor = "text-sky-400";
                message = "Great Work!";
              } else if (percentage >= 0.25) {
                grade = "C";
                gradeColor = "text-amber-400";
                message = "Good Effort!";
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

export default SpeedBuilderView;
