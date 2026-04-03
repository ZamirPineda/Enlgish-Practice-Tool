import React, {
  useRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import GameStartPanel from "@/components/GameStartPanel";
import GameShell from "@/components/game/GameShell";
import GameHudCard from "@/components/game/GameHudCard";
import DailySessionInsights from "@/components/game/DailySessionInsights";
import LatexRenderer from "@/components/LatexRenderer";
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
import {
  getMathPracticeQuestionBank,
  MathAdaptiveLevel,
  MathPracticeQuestion,
} from "@/lib/mathPracticeBank";
import {
  matchesRoadmapTags,
  parseRoadmapSessionConfig,
} from "@/lib/roadmapLaunch";

type GameState = "idle" | "playing" | "finished";

const LEVEL_ORDER: MathAdaptiveLevel[] = ["easy", "normal", "hard"];
const LEVEL_LABEL: Record<MathAdaptiveLevel, string> = {
  easy: "Easy",
  normal: "Normal",
  hard: "Hard",
};
const LEVEL_DURATION_SECONDS: Record<MathAdaptiveLevel, number> = {
  easy: 70,
  normal: 60,
  hard: 50,
};
const DOWNSHIFT_AFTER_WRONG_STREAK = 3;
const UPSHIFT_AFTER_CORRECT_STREAK = 3;
const MATH_GAME_DIFFICULTY = createAdaptiveDifficultyEngine<MathAdaptiveLevel>({
  gameId: "math_game",
  levels: LEVEL_ORDER,
  defaultLevel: "normal",
});

const INITIAL_LIVES = 3;
const BEST_SCORE_KEY = "math-game-best-score";

const isFormulaLike = (value: string): boolean => {
  return (
    value.includes("\\") ||
    value.includes("^") ||
    value.includes("âˆ«") ||
    value.includes("âˆš") ||
    value.includes("=")
  );
};

const MathGameView: React.FC = () => {
  const [searchParams] = useSearchParams();
  const roadmapConfig = useMemo(
    () => parseRoadmapSessionConfig(searchParams, "math_game"),
    [searchParams],
  );
  const didAutoStartRef = useRef(false);
  const resolveRoadmapLevel = (value?: string | null): MathAdaptiveLevel => {
    if (value && LEVEL_ORDER.includes(value as MathAdaptiveLevel)) {
      return value as MathAdaptiveLevel;
    }

    return MATH_GAME_DIFFICULTY.defaultLevel;
  };
  const [selectedLevel, setSelectedLevel] = useState<MathAdaptiveLevel>(
    resolveRoadmapLevel(roadmapConfig?.difficulty),
  );
  const questionBank = useMemo(() => {
    const levelQuestions = getMathPracticeQuestionBank(selectedLevel);
    const filteredQuestions = levelQuestions.filter((question) =>
      matchesRoadmapTags(question.tags, roadmapConfig?.tags || []),
    );

    return filteredQuestions.length > 0 ? filteredQuestions : levelQuestions;
  }, [roadmapConfig?.tags, selectedLevel]);

  const sessionStartTime = useRef<number>(Date.now());
  const wrongStreakRef = useRef(0);
  const correctStreakRef = useRef(0);
  const [gameState, setGameState] = useState<GameState>("idle");
  const [timePreset, setTimePreset] = useState<TimePreset>("normal");
  const gameDuration = getTimeByPreset(
    LEVEL_DURATION_SECONDS[selectedLevel],
    timePreset,
  );
  const [timeLeft, setTimeLeft] = useState(gameDuration);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<"correct" | "wrong" | null>(
    null,
  );

  useEffect(() => {
    const saved = localStorage.getItem(BEST_SCORE_KEY);
    const parsed = Number(saved || "0");
    if (!Number.isNaN(parsed) && parsed > 0) {
      setBestScore(parsed);
    }
  }, []);

  const currentQuestion: MathPracticeQuestion | null =
    questionBank[questionIndex] || null;
  const handleLevelSelect = (nextLevel: MathAdaptiveLevel) => {
    setSelectedLevel(
      (currentLevel) =>
        MATH_GAME_DIFFICULTY.setLevel(currentLevel, nextLevel).nextLevel,
    );
  };

  useEffect(() => {
    if (!roadmapConfig?.difficulty) return;
    setSelectedLevel(resolveRoadmapLevel(roadmapConfig.difficulty));
  }, [roadmapConfig?.difficulty]);

  const getNextQuestionIndex = useCallback(
    (currentIndex: number) => {
      if (questionBank.length <= 1) return 0;
      let nextIndex = Math.floor(Math.random() * questionBank.length);
      let attempts = 0;
      while (nextIndex === currentIndex && attempts < 5) {
        nextIndex = Math.floor(Math.random() * questionBank.length);
        attempts += 1;
      }
      if (nextIndex === currentIndex) {
        return (currentIndex + 1) % questionBank.length;
      }
      return nextIndex;
    },
    [questionBank.length],
  );

  useEffect(() => {
    if (questionBank.length === 0) return;
    setQuestionIndex((currentIndex) =>
      Math.min(currentIndex, questionBank.length - 1),
    );
  }, [questionBank.length]);

  const finishGame = useCallback(() => {
    setGameState("finished");
    trackAnalyticsEvent("session_end", {
      game: "math_game",
      duration: Math.round((Date.now() - sessionStartTime.current) / 1000),
    });
    wrongStreakRef.current = 0;
    correctStreakRef.current = 0;
    setSelectedOption(null);
    setLastResult(null);
    if (score > 0) {
      addGlobalXp(score);
    }

    setTimeout(() => {
      progressQuest("play_game", 1, "math");
      progressQuest("play_game", 1, "any");
    }, 1500);

    setBestScore((previousBest) => {
      const nextBest = Math.max(previousBest, score);
      localStorage.setItem(BEST_SCORE_KEY, String(nextBest));
      return nextBest;
    });
  }, [score]);

  useEffect(() => {
    if (gameState !== "playing") return;
    if (timeLeft <= 0 || lives <= 0) {
      if (timeLeft <= 0 && gameState === "playing") {
        playGameSound("timeout");
      }
      finishGame();
      return;
    }

    const timerId = window.setTimeout(() => {
      setTimeLeft((previous) => Math.max(0, previous - 1));
    }, 1000);

    return () => window.clearTimeout(timerId);
  }, [finishGame, gameState, lives, timeLeft]);

  const startGame = useCallback(() => {
    sessionStartTime.current = Date.now();
    trackAnalyticsEvent("session_start", {
      game: "math_game",
      level: selectedLevel,
      timePreset,
      gameDuration,
      roadmapNodeId: roadmapConfig?.nodeId,
      roadmapRouteObjective: roadmapConfig?.routeObjective,
      roadmapTags: roadmapConfig?.tags,
    });
    if (questionBank.length === 0) return;
    setGameState("playing");
    setTimeLeft(gameDuration);
    setLives(INITIAL_LIVES);
    setScore(0);
    setStreak(0);
    setLastResult(null);
    setSelectedOption(null);
    wrongStreakRef.current = 0;
    correctStreakRef.current = 0;
    setQuestionIndex(Math.floor(Math.random() * questionBank.length));
  }, [
    gameDuration,
    questionBank.length,
    roadmapConfig?.nodeId,
    roadmapConfig?.routeObjective,
    roadmapConfig?.tags,
    selectedLevel,
    timePreset,
  ]);

  useEffect(() => {
    if (
      !roadmapConfig?.autostart ||
      gameState !== "idle" ||
      didAutoStartRef.current ||
      questionBank.length === 0
    ) {
      return;
    }

    didAutoStartRef.current = true;
    startGame();
  }, [gameState, questionBank.length, roadmapConfig?.autostart, startGame]);

  const handleOptionSelect = (option: string) => {
    if (!currentQuestion || selectedOption) return;

    const isCorrect = option === currentQuestion.correctAnswer;
    setSelectedOption(option);
    setLastResult(isCorrect ? "correct" : "wrong");

    if (isCorrect) {
      playGameSound("correct");
      wrongStreakRef.current = 0;
      correctStreakRef.current += 1;
      trackAnalyticsEvent("item_correct", {
        game: "math_game",
        question: currentQuestion.prompt,
        level: selectedLevel,
      });

      progressQuest("correct_answers", 1, "math");
      progressQuest("correct_answers", 1, "any");

      setStreak((previous) => {
        const next = previous + 1;
        setScore((currentScore) => currentScore + 10 + previous * 2);
        return next;
      });

      if (
        shouldUpshiftByCorrectStreak(
          correctStreakRef.current,
          UPSHIFT_AFTER_CORRECT_STREAK,
        )
      ) {
        const transition = MATH_GAME_DIFFICULTY.increaseLevel(
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
    } else {
      playGameSound("wrong");
      correctStreakRef.current = 0;
      wrongStreakRef.current += 1;
      trackAnalyticsEvent("item_wrong", {
        game: "math_game",
        question: currentQuestion.prompt,
        errorType: "calculation_error",
        level: selectedLevel,
      });
      setLives((previous) => previous - 1);
      setStreak(0);

      if (
        shouldDownshiftByWrongStreak(
          wrongStreakRef.current,
          DOWNSHIFT_AFTER_WRONG_STREAK,
        )
      ) {
        const transition = MATH_GAME_DIFFICULTY.decreaseLevel(
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
    }

    window.setTimeout(() => {
      setSelectedOption(null);
      setLastResult(null);
      setQuestionIndex((currentIndex) => getNextQuestionIndex(currentIndex));
    }, 650);
  };

  if (questionBank.length === 0) {
    return (
      <Card className="max-w-3xl mx-auto text-center">
        <h3 className="text-xl font-black text-text-primary mb-2">Math Game</h3>
        <p className="text-text-secondary">No hay preguntas disponibles aún.</p>
      </Card>
    );
  }

  const startScreen = (
    <GameStartPanel
      title="Math Speed Duel"
      description="Configura dificultad y ritmo antes de iniciar."
      onStart={startGame}
      startLabel="Iniciar juego"
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
        <p className="text-xs text-text-secondary">Duracion: {gameDuration}s</p>
      </div>
    </GameStartPanel>
  );

  return (
    <GameShell
      hasStarted={gameState !== "idle"}
      startScreen={startScreen}
      contentKey={gameState === "finished" ? "summary" : "active"}
      contentClassName="max-w-4xl mx-auto space-y-6"
    >
      <GameHudCard
        title="Math Speed Duel"
        description="Tiempo, vidas y combo por respuestas correctas seguidas."
        controls={LEVEL_ORDER.map((level) => (
          <Button
            key={level}
            size="sm"
            variant={selectedLevel === level ? "primary" : "secondary"}
            onClick={() => handleLevelSelect(level)}
            aria-label={`Set math level ${LEVEL_LABEL[level]}`}
          >
            {LEVEL_LABEL[level]}
          </Button>
        ))}
        meta={
          <p className="text-xs text-text-muted mt-1">
            Record: {bestScore} | Nivel: {LEVEL_LABEL[selectedLevel]}
          </p>
        }
        status={`Vidas ${lives} / ${INITIAL_LIVES}`}
        timeLeft={gameState === "playing" ? timeLeft : 0}
        roundTime={gameDuration}
      />
      <Card elevated>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-2xl font-black text-text-primary">
            🎮 Math Speed Duel
          </h3>
          <div className="text-xs text-text-secondary font-bold uppercase tracking-widest">
            Récord: {bestScore}
          </div>
        </div>
        <p className="text-text-secondary text-sm mt-3">
          {gameDuration} segundos, 3 vidas y combo por respuestas correctas
          seguidas.
        </p>
      </Card>

      {gameState === "idle" && (
        <Card className="text-center space-y-4">
          <p className="text-text-secondary">
            Pulsa iniciar y responde lo más rápido posible.
          </p>
          <Button variant="primary" size="lg" onClick={startGame}>
            Iniciar juego
          </Button>
        </Card>
      )}

      {gameState === "playing" && currentQuestion && (
        <>
          <div className="w-full h-3 bg-surface-2 rounded-full overflow-hidden shadow-inner mb-4 border border-border">
            <div
              className={`h-full transition-all duration-1000 ease-linear rounded-full ${timeLeft <= 10 ? "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)] animate-pulse" : timeLeft <= gameDuration / 2 ? "bg-amber-400" : "bg-success"}`}
              style={{ width: `${(timeLeft / gameDuration) * 100}%` }}
            />
          </div>
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
              <p className="text-[10px] uppercase tracking-widest font-bold text-text-muted mb-2">
                Tema: {currentQuestion.topicLabel}
              </p>
              <p className="text-[10px] uppercase tracking-widest font-bold text-text-secondary mb-2">
                Sección: {currentQuestion.sectionLabel}
              </p>
              <p className="text-[10px] uppercase tracking-widest font-bold text-accent mb-2">
                {currentQuestion.answerTypeLabel}
              </p>
              <h4 className="text-xl font-black text-text-primary mb-3">
                {currentQuestion.prompt}
              </h4>
              {currentQuestion.referenceLabel &&
                currentQuestion.referenceValue && (
                  <div className="bg-surface-2 border border-border rounded-xl px-4 py-2 mb-2">
                    <p className="text-xs text-text-secondary font-semibold">
                      {currentQuestion.referenceLabel}:{" "}
                      {currentQuestion.referenceValue}
                    </p>
                  </div>
                )}
              {currentQuestion.expression && (
                <div className="bg-surface-2 border border-border rounded-xl p-4 mb-2">
                  {isFormulaLike(currentQuestion.expression) ? (
                    <LatexRenderer formula={currentQuestion.expression} block />
                  ) : (
                    <p className="text-lg font-semibold text-text-primary">
                      {currentQuestion.expression}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentQuestion.options.map((option) => {
                const isSelected = option === selectedOption;
                const isCorrect = option === currentQuestion.correctAnswer;

                let stateClass =
                  "bg-surface-2 hover:bg-surface-hover border-border transform hover:scale-[1.02] active:scale-[0.98]";
                if (selectedOption) {
                  if (isCorrect) {
                    stateClass =
                      "bg-success/20 border-success text-success scale-[1.02] shadow-[0_0_15px_rgba(34,197,94,0.3)] z-10 animate-[bounce_0.5s_ease-in-out]";
                  } else if (isSelected) {
                    stateClass =
                      "bg-rose-500/20 border-rose-500 text-rose-400 scale-[0.98] animate-[shake_0.4s_ease-in-out]";
                  } else {
                    stateClass =
                      "bg-surface-2 border-border text-text-secondary opacity-50";
                  }
                }

                return (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(option)}
                    disabled={!!selectedOption}
                    className={`w-full text-left rounded-xl border p-4 transition-all duration-200 min-h-[64px] ${stateClass}`}
                  >
                    {isFormulaLike(option) ? (
                      <LatexRenderer formula={option} />
                    ) : (
                      <span className="text-base font-semibold text-inherit">
                        {option}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {lastResult && (
              <p
                className={`text-sm font-bold ${lastResult === "correct" ? "text-success" : "text-rose-400"}`}
              >
                {lastResult === "correct"
                  ? "¡Correcto! +puntos"
                  : "Incorrecto, sigue intentando."}
              </p>
            )}
          </Card>
        </>
      )}

      {gameState === "finished" && (
        <Card className="max-w-xl mx-auto w-full p-8 text-center space-y-8 animate-fade-in shadow-2xl border-t-4 border-accent bg-surface-1">
          {(() => {
            const gradeInfo = (() => {
              if (score >= 200)
                return {
                  grade: "S",
                  color: "text-fuchsia-400",
                  message: "¡Maestro de las Matemáticas!",
                };
              if (score >= 100)
                return {
                  grade: "A",
                  color: "text-emerald-400",
                  message: "¡Excelente Trabajo!",
                };
              if (score >= 50)
                return {
                  grade: "B",
                  color: "text-sky-400",
                  message: "¡Gran Esfuerzo!",
                };
              if (score >= 20)
                return {
                  grade: "C",
                  color: "text-amber-400",
                  message: "¡Buen Intento!",
                };
              return {
                grade: "D",
                color: "text-slate-400",
                message: "¡Sigue Practicando!",
              };
            })();

            return (
              <>
                <div>
                  <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400 mb-2">
                    ¡Juego Terminado!
                  </h2>
                  <p className="text-text-secondary text-lg">
                    {gradeInfo.message}
                  </p>
                </div>

                <div className="flex justify-center items-center gap-8 py-4">
                  <div className="text-center">
                    <div className="text-sm font-bold text-text-muted uppercase tracking-widest mb-1">
                      Rango
                    </div>
                    <div
                      className={`text-7xl font-black ${gradeInfo.color} drop-shadow-lg animate-bounce`}
                    >
                      {gradeInfo.grade}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-surface-2 p-4 rounded-2xl border border-border hover:bg-surface-hover transition-colors">
                    <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">
                      Score Final
                    </div>
                    <div className="text-3xl font-black text-success-hover">
                      {score}
                    </div>
                  </div>
                  <div className="bg-surface-2 p-4 rounded-2xl border border-border hover:bg-surface-hover transition-colors">
                    <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">
                      Mejor Score
                    </div>
                    <div className="text-3xl font-black text-amber-500">
                      🏅 {bestScore}
                    </div>
                  </div>
                </div>
                <DailySessionInsights className="mt-4 text-left" />

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button
                    variant="primary"
                    onClick={startGame}
                    className="w-full sm:w-auto py-3 px-8 text-lg font-bold"
                  >
                    Jugar de nuevo
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setGameState("idle")}
                    className="w-full sm:w-auto py-3 px-8 text-lg"
                  >
                    Volver al menú
                  </Button>
                </div>
              </>
            );
          })()}
        </Card>
      )}
    </GameShell>
  );
};

export default MathGameView;
