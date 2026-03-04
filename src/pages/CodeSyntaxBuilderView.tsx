import React, { useRef, useEffect, useMemo, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import GameStartPanel from "@/components/GameStartPanel";
import GameShell from "@/components/game/GameShell";
import GameHudCard from "@/components/game/GameHudCard";
import DailySessionInsights from "@/components/game/DailySessionInsights";
import {
  codeSyntaxData,
  type CodeSyntaxPrompt,
} from "@/features/data/codeSyntaxData";
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

type CodeSyntaxLevel = "easy" | "normal" | "hard";
type CodeSyntaxRound = CodeSyntaxPrompt & { adaptiveLevel: CodeSyntaxLevel };

const LEVEL_ORDER: CodeSyntaxLevel[] = ["easy", "normal", "hard"];
const LEVEL_LABEL: Record<CodeSyntaxLevel, string> = {
  easy: "Easy",
  normal: "Normal",
  hard: "Hard",
};
const ROUND_TIME_SECONDS: Record<CodeSyntaxLevel, number> = {
  easy: 60,
  normal: 45,
  hard: 35,
};
const BASE_POINTS_PER_CORRECT = 150;
const TIME_BONUS_MULTIPLIER = 3;
const LEVEL_SCORE_MULTIPLIER: Record<CodeSyntaxLevel, number> = {
  easy: 1,
  normal: 1.2,
  hard: 1.45,
};
const SESSION_ROUND_LIMIT = 5;
const DOWNSHIFT_AFTER_WRONG_STREAK = 3;
const UPSHIFT_AFTER_CORRECT_STREAK = 3;
const CODE_SYNTAX_DIFFICULTY = createAdaptiveDifficultyEngine<CodeSyntaxLevel>({
  gameId: "code_syntax_builder",
  levels: LEVEL_ORDER,
  defaultLevel: "normal",
});

const buildAdaptiveCodeSyntaxRounds = (
  rounds: CodeSyntaxPrompt[],
): CodeSyntaxRound[] => {
  const ranked = rounds
    .map((round, index) => ({
      round,
      index,
      score:
        round.tokens.length * 10 +
        Math.round(round.prompt.length / 20) +
        (["typescript", "sql"].includes(round.language) ? 2 : 0),
    }))
    .sort((left, right) => left.score - right.score || left.index - right.index);

  const total = ranked.length;
  const levelById = new Map<string, CodeSyntaxLevel>();
  ranked.forEach(({ round }, rank) => {
    const percentile = (rank + 1) / total;
    const adaptiveLevel =
      percentile <= 1 / 3 ? "easy" : percentile <= 2 / 3 ? "normal" : "hard";
    levelById.set(round.id, adaptiveLevel);
  });

  return rounds.map((round) => ({
    ...round,
    adaptiveLevel: levelById.get(round.id) || "normal",
  }));
};

const ADAPTIVE_CODE_SYNTAX_ROUNDS = buildAdaptiveCodeSyntaxRounds(codeSyntaxData);

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
  const [selectedLevel, setSelectedLevel] = useState<CodeSyntaxLevel>(
    CODE_SYNTAX_DIFFICULTY.defaultLevel,
  );
  const [timePreset, setTimePreset] = useState<TimePreset>("normal");
  const [hasStarted, setHasStarted] = useState(false);
  const rounds = useMemo(() => {
    const levelRounds = ADAPTIVE_CODE_SYNTAX_ROUNDS.filter(
      (item) => item.adaptiveLevel === selectedLevel,
    );
    const shuffled = [...levelRounds];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    // Pick 5 random rounds per session
    return shuffled.slice(0, SESSION_ROUND_LIMIT);
  }, [selectedLevel]);

  const [roundIndex, setRoundIndex] = useState(0);
  const sessionStartTime = useRef<number>(Date.now());
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME_SECONDS.normal);
  const [totalScore, setTotalScore] = useState(0);
  const [lastRoundPoints, setLastRoundPoints] = useState(0);
  const [timeoutReached, setTimeoutReached] = useState(false);
  const wrongStreakRef = useRef(0);
  const correctStreakRef = useRef(0);

  const round = rounds[roundIndex];
  const roundTime = getTimeByPreset(ROUND_TIME_SECONDS[selectedLevel], timePreset);
  const levelMultiplier = LEVEL_SCORE_MULTIPLIER[selectedLevel];

  const handleLevelSelect = (nextLevel: CodeSyntaxLevel) => {
    setSelectedLevel((currentLevel) =>
      CODE_SYNTAX_DIFFICULTY.setLevel(currentLevel, nextLevel).nextLevel,
    );
  };

  useEffect(() => {
    setRoundIndex(0);
    setSelectedTokens([]);
    setSubmitted(false);
    setCorrectCount(0);
    setTimeLeft(roundTime);
    setTotalScore(0);
    setLastRoundPoints(0);
    setTimeoutReached(false);
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
    if (!hasStarted || submitted || timeLeft !== 0 || !round) return;

    const isLastRound = roundIndex >= rounds.length - 1;
    setSubmitted(true);
    setTimeoutReached(true);
    setLastRoundPoints(0);
    correctStreakRef.current = 0;
    wrongStreakRef.current += 1;

    trackAnalyticsEvent("item_wrong", {
      game: "code_syntax_builder",
      language: round.language,
      prompt: round.prompt,
      errorType: "timeout",
      level: selectedLevel,
    });

    if (
      !isLastRound &&
      shouldDownshiftByWrongStreak(
        wrongStreakRef.current,
        DOWNSHIFT_AFTER_WRONG_STREAK,
      )
    ) {
      const transition = CODE_SYNTAX_DIFFICULTY.decreaseLevel(
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
          `Dificultad ajustada a ${LEVEL_LABEL[transition.nextLevel]} por ${DOWNSHIFT_AFTER_WRONG_STREAK} errores seguidos.`,
        );
      }
    }
  }, [hasStarted, submitted, timeLeft, round, roundIndex, rounds.length, selectedLevel]);

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
  const basePoints = Math.round(BASE_POINTS_PER_CORRECT * levelMultiplier);
  const timeBonus = Math.round(timeLeft * TIME_BONUS_MULTIPLIER * levelMultiplier);

  const startSession = () => {
    sessionStartTime.current = Date.now();
    setHasStarted(true);
    trackAnalyticsEvent("session_start", {
      game: "code_syntax_builder",
      level: selectedLevel,
      timePreset,
      roundTime,
    });
    setRoundIndex(0);
    setSelectedTokens([]);
    setSubmitted(false);
    setCorrectCount(0);
    setTimeLeft(roundTime);
    setTotalScore(0);
    setLastRoundPoints(0);
    setTimeoutReached(false);
    wrongStreakRef.current = 0;
    correctStreakRef.current = 0;
  };

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
    const isLastRound = roundIndex >= rounds.length - 1;
    if (nextIsCorrect) {
      playGameSound("correct");
      setCorrectCount((previous) => previous + 1);
      const roundPoints = basePoints + timeBonus;
      setLastRoundPoints(roundPoints);
      setTotalScore((previous) => previous + roundPoints);
      wrongStreakRef.current = 0;
      correctStreakRef.current += 1;

      progressQuest("correct_answers", 1, "any");

      trackAnalyticsEvent("item_correct", {
        game: "code_syntax_builder",
        language: round.language,
        prompt: round.prompt,
        level: selectedLevel,
      });

      if (
        !isLastRound &&
        shouldUpshiftByCorrectStreak(
          correctStreakRef.current,
          UPSHIFT_AFTER_CORRECT_STREAK,
        )
      ) {
        const transition = CODE_SYNTAX_DIFFICULTY.increaseLevel(
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
            `Dificultad ajustada a ${LEVEL_LABEL[transition.nextLevel]} por ${UPSHIFT_AFTER_CORRECT_STREAK} aciertos seguidos.`,
          );
        }
      }
      return;
    }

    playGameSound("wrong");
    setLastRoundPoints(0);
    correctStreakRef.current = 0;
    wrongStreakRef.current += 1;
    trackAnalyticsEvent("item_wrong", {
      game: "code_syntax_builder",
      language: round.language,
      prompt: round.prompt,
      errorType: "order",
      level: selectedLevel,
    });

    if (
      !isLastRound &&
      shouldDownshiftByWrongStreak(
        wrongStreakRef.current,
        DOWNSHIFT_AFTER_WRONG_STREAK,
      )
    ) {
      const transition = CODE_SYNTAX_DIFFICULTY.decreaseLevel(
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
          `Dificultad ajustada a ${LEVEL_LABEL[transition.nextLevel]} por ${DOWNSHIFT_AFTER_WRONG_STREAK} errores seguidos.`,
        );
      }
    }
  };

  const handleNextRound = () => {
    if (roundIndex >= rounds.length - 1) return;
    setRoundIndex((previous) => previous + 1);
    setSelectedTokens([]);
    setSubmitted(false);
    setTimeLeft(roundTime);
    setTimeoutReached(false);
    setLastRoundPoints(0);
  };

  const handleRestart = () => {
    trackAnalyticsEvent("session_end", {
      game: "code_syntax_builder",
      duration: Math.round((Date.now() - sessionStartTime.current) / 1000),
    });
    sessionStartTime.current = Date.now();
    trackAnalyticsEvent("session_start", { game: "code_syntax_builder" });
    setRoundIndex(0);
    setSelectedTokens([]);
    setSubmitted(false);
    setCorrectCount(0);
    setTimeLeft(roundTime);
    setTotalScore(0);
    setLastRoundPoints(0);
    setTimeoutReached(false);
    wrongStreakRef.current = 0;
    correctStreakRef.current = 0;
  };

  const isComplete = roundIndex === rounds.length - 1 && submitted;

  useEffect(() => {
    if (hasStarted && isComplete) {
      trackAnalyticsEvent("session_end", {
        game: "code_syntax_builder",
        duration: Math.round((Date.now() - sessionStartTime.current) / 1000),
      });
    }
  }, [hasStarted, isComplete]);

  useEffect(() => {
    if (isComplete && totalScore > 0) {
      addGlobalXp(totalScore);
      progressQuest("play_game", 1, "any");
      progressQuest("play_game", 1, "syntax_builder");
      progressQuest("play_game", 1, "any");
    }
  }, [isComplete, totalScore]);

  if (!round) return null;

  const startScreen = (
    <GameStartPanel
      title="Code Syntax Builder"
      description="Configura dificultad y ritmo de tu sesión antes de empezar."
      onStart={startSession}
      startLabel="Empezar Build"
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
              {LEVEL_LABEL[level]}
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
        title="Code Syntax Builder"
        description="Ordena los bloques para formar la sintaxis correcta."
        timeLeft={timeLeft}
        roundTime={roundTime}
        status={`Ronda ${roundIndex + 1} / ${rounds.length}`}
        controls={LEVEL_ORDER.map((level) => (
          <Button
            key={level}
            size="sm"
            variant={selectedLevel === level ? "primary" : "secondary"}
            onClick={() => handleLevelSelect(level)}
            aria-label={`Set code syntax level ${LEVEL_LABEL[level]}`}
          >
            {LEVEL_LABEL[level]}
          </Button>
        ))}
      />

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
                  +{lastRoundPoints} pts (base {basePoints} + bonus {timeBonus} x{levelMultiplier})
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
            <DailySessionInsights className="mt-4 text-left" />
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-text-secondary">
              Puntos:{" "}
              <span className="font-black text-text-primary">{totalScore}</span>{" "}
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
    </GameShell>
  );
};

export default CodeSyntaxBuilderView;

