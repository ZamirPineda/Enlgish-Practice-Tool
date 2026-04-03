import React, { useRef, useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import GameStartPanel from "@/components/GameStartPanel";
import GameShell from "@/components/game/GameShell";
import GameHudCard from "@/components/game/GameHudCard";
import DailySessionInsights from "@/components/game/DailySessionInsights";
import {
  paraphraseDuelRounds,
  type ParaphraseDuelRound,
} from "@/features/data/paraphraseDuel";
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

type DuelLevel = ParaphraseDuelRound["level"];

const LEVEL_ORDER: DuelLevel[] = ["A2", "B1", "B2", "C1"];
const ROUND_TIME_SECONDS: Record<DuelLevel, number> = {
  A2: 45,
  B1: 38,
  B2: 32,
  C1: 28,
};
const LEVEL_SCORE_MULTIPLIER: Record<DuelLevel, number> = {
  A2: 1.1,
  B1: 1.25,
  B2: 1.5,
  C1: 1.75,
};
const DOWNSHIFT_AFTER_WRONG_STREAK = 3;
const UPSHIFT_AFTER_CORRECT_STREAK = 3;
const PARAPHRASE_DUEL_DIFFICULTY = createAdaptiveDifficultyEngine<DuelLevel>({
  gameId: "paraphrase_duel",
  levels: LEVEL_ORDER,
  defaultLevel: "B1",
});

const normalizeText = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9'\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const getTokenSimilarity = (left: string, right: string): number => {
  const leftTokens = new Set(normalizeText(left).split(" ").filter(Boolean));
  const rightTokens = new Set(normalizeText(right).split(" ").filter(Boolean));

  if (leftTokens.size === 0 || rightTokens.size === 0) {
    return 0;
  }

  let common = 0;
  leftTokens.forEach((token) => {
    if (rightTokens.has(token)) {
      common += 1;
    }
  });

  return (2 * common) / (leftTokens.size + rightTokens.size);
};

const ParaphraseDuelView: React.FC = () => {
  const [searchParams] = useSearchParams();
  const roadmapConfig = useMemo(
    () => parseRoadmapSessionConfig(searchParams, "paraphrase_duel"),
    [searchParams],
  );
  const didAutoStartRef = useRef(false);
  const resolveRoadmapLevel = (value?: string | null): DuelLevel => {
    if (value && LEVEL_ORDER.includes(value as DuelLevel)) {
      return value as DuelLevel;
    }

    return PARAPHRASE_DUEL_DIFFICULTY.defaultLevel;
  };
  const [selectedLevel, setSelectedLevel] = useState<DuelLevel>(
    resolveRoadmapLevel(roadmapConfig?.difficulty),
  );
  const [timePreset, setTimePreset] = useState<TimePreset>("normal");
  const [hasStarted, setHasStarted] = useState(false);
  const [roundIndex, setRoundIndex] = useState(0);
  const sessionStartTime = useRef<number>(Date.now());
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME_SECONDS.B1);
  const [totalScore, setTotalScore] = useState(0);
  const wrongStreakRef = useRef(0);
  const correctStreakRef = useRef(0);

  const rounds = useMemo(() => {
    const levelRounds = paraphraseDuelRounds.filter(
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

  const round = rounds[roundIndex];
  const roundTime = getTimeByPreset(
    ROUND_TIME_SECONDS[selectedLevel],
    timePreset,
  );

  const handleLevelSelect = (nextLevel: DuelLevel) => {
    setSelectedLevel((currentLevel) =>
      PARAPHRASE_DUEL_DIFFICULTY.setLevel(currentLevel, nextLevel).nextLevel,
    );
  };

  useEffect(() => {
    if (!roadmapConfig?.difficulty) return;
    setSelectedLevel(resolveRoadmapLevel(roadmapConfig.difficulty));
  }, [roadmapConfig?.difficulty]);

  useEffect(() => {
    setRoundIndex(0);
    setAnswer("");
    setSubmitted(false);
    setCorrectCount(0);
    setTotalScore(0);
    setTimeLeft(roundTime);
    wrongStreakRef.current = 0;
    correctStreakRef.current = 0;
  }, [selectedLevel, roundTime]);

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

    trackAnalyticsEvent("item_wrong", {
      game: "paraphrase_duel",
      level: round.level,
      roundId: round.id,
      errorType: "timeout",
    });
    setSubmitted(true);
  }, [hasStarted, submitted, timeLeft, round]);

  if (!round) {
    return (
      <div className="flex-1 overflow-y-auto bg-background p-4 sm:p-8 pb-4 sm:pb-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <p className="text-sm text-text-secondary">No rounds available.</p>
          </Card>
        </div>
      </div>
    );
  }

  const normalizedAnswer = normalizeText(answer);
  const normalizedAccepted = round.acceptedAnswers.map(normalizeText);
  const includesConnector = normalizedAnswer.includes(
    normalizeText(round.targetConnector),
  );
  const hasCloseMeaning = round.acceptedAnswers.some(
    (accepted) => getTokenSimilarity(accepted, answer) >= 0.82,
  );
  const passesFlexibleValidation =
    includesConnector &&
    (normalizedAccepted.includes(normalizedAnswer) || hasCloseMeaning);
  const isCorrect = submitted && passesFlexibleValidation;

  const startSession = useCallback(() => {
    sessionStartTime.current = Date.now();
    setHasStarted(true);
    trackAnalyticsEvent("session_start", {
      game: "paraphrase_duel",
      level: selectedLevel,
      timePreset,
      roundTime,
      roadmapNodeId: roadmapConfig?.nodeId,
      roadmapRouteObjective: roadmapConfig?.routeObjective,
      roadmapTags: roadmapConfig?.tags,
    });
    setRoundIndex(0);
    setAnswer("");
    setSubmitted(false);
    setCorrectCount(0);
    setTimeLeft(roundTime);
    setTotalScore(0);
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

  const handleCheck = () => {
    if (!answer.trim() || submitted) return;

    setSubmitted(true);
    const isLastRound = roundIndex >= rounds.length - 1;
    if (passesFlexibleValidation) {
      playGameSound("correct");
      const multiplier = LEVEL_SCORE_MULTIPLIER[round.level];
      const points = Math.round((100 + timeLeft * 2) * multiplier);
      setCorrectCount((previous) => previous + 1);
      setTotalScore((previous) => previous + points);
      wrongStreakRef.current = 0;
      correctStreakRef.current += 1;
      trackAnalyticsEvent("item_correct", {
        game: "paraphrase_duel",
        level: round.level,
        roundId: round.id,
        score: points,
        usedFlexibleMatch: !normalizedAccepted.includes(normalizedAnswer),
      });

      if (
        !isLastRound &&
        shouldUpshiftByCorrectStreak(
          correctStreakRef.current,
          UPSHIFT_AFTER_CORRECT_STREAK,
        )
      ) {
        const transition = PARAPHRASE_DUEL_DIFFICULTY.increaseLevel(
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
    correctStreakRef.current = 0;
    const errorType = !includesConnector
      ? "connector_missing"
      : "similarity_low";
    trackAnalyticsEvent("item_wrong", {
      game: "paraphrase_duel",
      level: round.level,
      roundId: round.id,
      errorType,
    });

    wrongStreakRef.current += 1;
    if (
      !isLastRound &&
      shouldDownshiftByWrongStreak(
        wrongStreakRef.current,
        DOWNSHIFT_AFTER_WRONG_STREAK,
      )
    ) {
      const transition = PARAPHRASE_DUEL_DIFFICULTY.decreaseLevel(
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

  const handleNext = () => {
    if (roundIndex >= rounds.length - 1) return;
    setRoundIndex((previous) => previous + 1);
    setAnswer("");
    setSubmitted(false);
    setTimeLeft(roundTime);
  };

  const handleRestart = () => {
    trackAnalyticsEvent("session_end", {
      game: "paraphrase_duel",
      duration: Math.round((Date.now() - sessionStartTime.current) / 1000),
    });
    sessionStartTime.current = Date.now();
    trackAnalyticsEvent("session_start", { game: "paraphrase_duel" });
    setRoundIndex(0);
    setAnswer("");
    setSubmitted(false);
    setCorrectCount(0);
    setTotalScore(0);
    setTimeLeft(roundTime);
    wrongStreakRef.current = 0;
    correctStreakRef.current = 0;
  };

  const isComplete = roundIndex === rounds.length - 1 && submitted;

  useEffect(() => {
    if (hasStarted && isComplete) {
      trackAnalyticsEvent("session_end", {
        game: "paraphrase_duel",
        duration: Math.round((Date.now() - sessionStartTime.current) / 1000),
      });
    }
  }, [hasStarted, isComplete]);

  useEffect(() => {
    if (isComplete && totalScore > 0) {
      addGlobalXp(totalScore);
      progressQuest("play_game", 1, "any");
      progressQuest("play_game", 1, "paraphrase");
    }
  }, [isComplete, totalScore]);

  const startScreen = (
    <GameStartPanel
      title="Paraphrase Duel"
      description="Configura dificultad y tiempo antes de empezar."
      onStart={startSession}
      startLabel="Iniciar Duelo"
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
        title="Paraphrase Duel"
        description="Reescribe con el mismo significado usando el conector objetivo."
        controls={LEVEL_ORDER.map((level) => (
          <Button
            key={level}
            size="sm"
            variant={selectedLevel === level ? "primary" : "secondary"}
            onClick={() => handleLevelSelect(level)}
            aria-label={`Set paraphrase level ${level}`}
          >
            {level}
          </Button>
        ))}
        timeLeft={timeLeft}
        roundTime={roundTime}
      />
      <Card className="space-y-4">
        <p className="text-xs uppercase tracking-widest font-bold text-text-secondary">
          Frase original
        </p>
        <p className="text-lg font-semibold text-text-primary">
          "{round.sentence}"
        </p>
        <p className="text-xs uppercase tracking-widest font-bold text-text-muted">
          Conector objetivo: {round.targetConnector}
        </p>

        <textarea
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          disabled={submitted}
          className="w-full min-h-[96px] rounded-xl border border-border bg-surface-1 p-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-focus"
          placeholder="Write your paraphrase..."
          aria-label="Paraphrase answer"
        />

        {submitted ? (
          <div
            className={`rounded-xl border px-4 py-3 text-sm font-semibold ${isCorrect ? "border-success/40 bg-success/10 text-success" : "border-amber-500/40 bg-amber-500/10 text-amber-400"}`}
          >
            {isCorrect
              ? "✅ Correct paraphrase."
              : `❌ Keep trying. Example accepted answer: "${round.acceptedAnswers[0]}"`}
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <Button
            onClick={handleCheck}
            variant="primary"
            size="lg"
            disabled={!answer.trim() || submitted || timeLeft === 0}
          >
            Check paraphrase
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
            <Button onClick={handleNext} variant="success" size="lg">
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
                  const newId = `para-${Date.now()}`;
                  deck[newId] = createNewSrsItem(
                    `Paraphrase: ${round.sentence}`,
                    `Accepted: ${round.acceptedAnswers[0]}`,
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
              title="Save this paraphrase to review later"
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
                message = "Grammar Master!";
              } else if (percentage >= 0.75) {
                grade = "A";
                gradeColor = "text-emerald-400";
                message = "Great Expression!";
              } else if (percentage >= 0.5) {
                grade = "B";
                gradeColor = "text-sky-400";
                message = "Solid Work!";
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
            <p className="text-sm text-text-secondary mt-1">
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

export default ParaphraseDuelView;
