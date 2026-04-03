import React, { useRef, useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import GameStartPanel from "@/components/GameStartPanel";
import GameShell from "@/components/game/GameShell";
import GameHudCard from "@/components/game/GameHudCard";
import DailySessionInsights from "@/components/game/DailySessionInsights";
import { trackAnalyticsEvent } from "@/lib/analytics";
import { playGameSound } from "@/lib/audioUtils";
import { addGlobalXp, progressQuest } from "@/lib/xpStore";
import { docsQuizQuestions, QuizQuestion } from "@/features/data/docs_quiz";
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

type GameState = "idle" | "playing" | "finished";
type DocsQuizLevel = "easy" | "normal" | "hard";
type QuizQuestionWithLevel = QuizQuestion & { adaptiveLevel: DocsQuizLevel };

const LEVEL_ORDER: DocsQuizLevel[] = ["easy", "normal", "hard"];
const LEVEL_LABEL: Record<DocsQuizLevel, string> = {
  easy: "Easy",
  normal: "Normal",
  hard: "Hard",
};
const TIME_PER_QUESTION: Record<DocsQuizLevel, number> = {
  easy: 70,
  normal: 60,
  hard: 48,
};
const INITIAL_LIVES = 3;
const BEST_SCORE_KEY = "study-docs-quiz-best-score";
const DOWNSHIFT_AFTER_WRONG_STREAK = 3;
const UPSHIFT_AFTER_CORRECT_STREAK = 3;
const DOCS_QUIZ_DIFFICULTY = createAdaptiveDifficultyEngine<DocsQuizLevel>({
  gameId: "docs_quiz",
  levels: LEVEL_ORDER,
  defaultLevel: "normal",
});

const buildAdaptiveDocsQuizQuestions = (
  questions: QuizQuestion[],
): QuizQuestionWithLevel[] => {
  const ranked = questions
    .map((question, index) => ({
      question,
      index,
      score:
        question.question.length +
        question.explanation.length +
        Math.round(
          question.options.reduce((total, option) => total + option.length, 0) /
            Math.max(1, question.options.length),
        ) +
        (question.subCategory ? 8 : 0),
    }))
    .sort((left, right) => left.score - right.score || left.index - right.index);

  const total = ranked.length;
  const levelById = new Map<string, DocsQuizLevel>();
  ranked.forEach(({ question }, rank) => {
    const percentile = (rank + 1) / total;
    const adaptiveLevel =
      percentile <= 1 / 3 ? "easy" : percentile <= 2 / 3 ? "normal" : "hard";
    levelById.set(question.id, adaptiveLevel);
  });

  return questions.map((question) => ({
    ...question,
    adaptiveLevel: levelById.get(question.id) || "normal",
  }));
};

const ADAPTIVE_DOCS_QUIZ_QUESTIONS =
  buildAdaptiveDocsQuizQuestions(docsQuizQuestions);

const shuffle = <T,>(items: T[]): T[] => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[randomIndex]] = [copy[randomIndex], copy[i]];
  }
  return copy;
};

const StudyDocsQuizView: React.FC = () => {
  const [searchParams] = useSearchParams();
  const roadmapConfig = useMemo(
    () => parseRoadmapSessionConfig(searchParams, "study_docs_quiz"),
    [searchParams],
  );
  const didAutoStartRef = useRef(false);
  const resolveRoadmapLevel = (value?: string | null): DocsQuizLevel => {
    if (value && LEVEL_ORDER.includes(value as DocsQuizLevel)) {
      return value as DocsQuizLevel;
    }

    return DOCS_QUIZ_DIFFICULTY.defaultLevel;
  };
  const sessionStartTime = useRef<number>(Date.now());
  const wrongStreakRef = useRef(0);
  const correctStreakRef = useRef(0);
  const [selectedLevel, setSelectedLevel] = useState<DocsQuizLevel>(
    resolveRoadmapLevel(roadmapConfig?.difficulty),
  );
  const [gameState, setGameState] = useState<GameState>("idle");
  const [timePreset, setTimePreset] = useState<TimePreset>("normal");
  const questionTime = getTimeByPreset(TIME_PER_QUESTION[selectedLevel], timePreset);
  const [timeLeft, setTimeLeft] = useState(questionTime);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const [questionsPool, setQuestionsPool] = useState<QuizQuestion[]>([]);
  const [currentRound, setCurrentRound] = useState<QuizQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<"correct" | "wrong" | null>(
    null,
  );
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const questionsByLevel = useMemo(() => {
    return ADAPTIVE_DOCS_QUIZ_QUESTIONS.reduce(
      (accumulator, question) => {
        accumulator[question.adaptiveLevel].push(question);
        return accumulator;
      },
      {
        easy: [] as QuizQuestionWithLevel[],
        normal: [] as QuizQuestionWithLevel[],
        hard: [] as QuizQuestionWithLevel[],
      },
    );
  }, []);

  useEffect(() => {
    if (!roadmapConfig?.difficulty) return;
    setSelectedLevel(resolveRoadmapLevel(roadmapConfig.difficulty));
  }, [roadmapConfig?.difficulty]);

  const buildPoolForLevel = useCallback(
    (level: DocsQuizLevel): QuizQuestionWithLevel[] => {
      const levelQuestions = questionsByLevel[level];
      const filteredLevelQuestions = levelQuestions.filter((question) =>
        matchesRoadmapTags(
          [
            question.category,
            question.subCategory || "",
            question.question,
            question.explanation,
          ],
          roadmapConfig?.tags || [],
        ),
      );
      const candidateQuestions =
        filteredLevelQuestions.length > 0 ? filteredLevelQuestions : levelQuestions;
      if (candidateQuestions.length === 0) {
        return shuffle([...ADAPTIVE_DOCS_QUIZ_QUESTIONS]);
      }
      return shuffle([...candidateQuestions]);
    },
    [questionsByLevel, roadmapConfig?.tags],
  );

  const handleLevelSelect = (nextLevel: DocsQuizLevel) => {
    setSelectedLevel((currentLevel) => {
      const transition = DOCS_QUIZ_DIFFICULTY.setLevel(currentLevel, nextLevel);
      if (transition.changed) {
        appendAdaptiveDifficultyLog({
          ...transition,
          trigger: "manual",
          details: {
            source: "user_select",
          },
        });
        if (gameState === "playing") {
          setQuestionsPool(buildPoolForLevel(transition.nextLevel));
        }
      }
      return transition.nextLevel;
    });
  };

  useEffect(() => {
    setTimeLeft(questionTime);
  }, [questionTime]);

  useEffect(() => {
    const saved = Number(localStorage.getItem(BEST_SCORE_KEY) || "0");
    if (!Number.isNaN(saved) && saved > 0) {
      setBestScore(saved);
    }
  }, []);

  const finishGame = () => {
    setGameState("finished");
    trackAnalyticsEvent("session_end", {
      game: "docs_quiz",
      duration: Math.round((Date.now() - sessionStartTime.current) / 1000),
    });
    setSelectedOption(null);
    setLastResult(null);
    wrongStreakRef.current = 0;
    correctStreakRef.current = 0;
    if (score > 0) {
      addGlobalXp(score);
    }
    setBestScore((currentBest) => {
      const nextBest = Math.max(currentBest, score);
      localStorage.setItem(BEST_SCORE_KEY, String(nextBest));
      return nextBest;
    });

    setTimeout(() => {
      progressQuest("play_game", 1, "quiz");
      progressQuest("play_game", 1, "any");
    }, 1000);
  };

  useEffect(() => {
    if (gameState !== "playing" || selectedOption !== null) return;

    if (timeLeft <= 0) {
      if (gameState === "playing") {
        playGameSound("timeout");
      }
      handleAnswer("");
      return;
    }

    const timer = window.setTimeout(() => {
      setTimeLeft((previous) => Math.max(0, previous - 1));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [gameState, timeLeft, selectedOption]);

  const getNextRound = (pool: QuizQuestion[]): QuizQuestion | null => {
    if (pool.length === 0) return null;
    return pool[0];
  };

  const startGame = useCallback(() => {
    const shuffledPool = buildPoolForLevel(selectedLevel);
    const firstRound = getNextRound(shuffledPool);
    if (!firstRound) return;

    sessionStartTime.current = Date.now();
    trackAnalyticsEvent("session_start", {
      game: "docs_quiz",
      level: selectedLevel,
      timePreset,
      questionTime,
      questions: shuffledPool.length,
      roadmapNodeId: roadmapConfig?.nodeId,
      roadmapRouteObjective: roadmapConfig?.routeObjective,
      roadmapTags: roadmapConfig?.tags,
    });

    setQuestionsPool(shuffledPool.slice(1));
    setGameState("playing");
    setTimeLeft(questionTime);
    setLives(INITIAL_LIVES);
    setScore(0);
    setStreak(0);
    setLastResult(null);
    setSelectedOption(null);
    wrongStreakRef.current = 0;
    correctStreakRef.current = 0;
    setCurrentRound(firstRound);
    setShuffledOptions(shuffle([...firstRound.options]));
  }, [
    buildPoolForLevel,
    questionTime,
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
      didAutoStartRef.current
    ) {
      return;
    }

    didAutoStartRef.current = true;
    startGame();
  }, [gameState, roadmapConfig?.autostart, startGame]);

  const handleAnswer = (option: string) => {
    if (!currentRound || selectedOption !== null) return;

    const isCorrect = option === currentRound.correctAnswer;
    setSelectedOption(option);
    setLastResult(isCorrect ? "correct" : "wrong");

    if (isCorrect) {
      playGameSound("correct");
      wrongStreakRef.current = 0;
      correctStreakRef.current += 1;
      trackAnalyticsEvent("item_correct", {
        game: "docs_quiz",
        question: currentRound.question,
        level: selectedLevel,
      });

      progressQuest("correct_answers", 1, "quiz");
      progressQuest("correct_answers", 1, "any");

      setStreak((previous) => {
        const nextStreak = previous + 1;
        setScore((currentScore) => currentScore + 15 + previous * 5);
        return nextStreak;
      });

      if (
        shouldUpshiftByCorrectStreak(
          correctStreakRef.current,
          UPSHIFT_AFTER_CORRECT_STREAK,
        )
      ) {
        const transition = DOCS_QUIZ_DIFFICULTY.increaseLevel(
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
          setQuestionsPool(buildPoolForLevel(transition.nextLevel));
          toast.success(
            `Dificultad ajustada a ${LEVEL_LABEL[transition.nextLevel]} por ${UPSHIFT_AFTER_CORRECT_STREAK} aciertos seguidos.`,
          );
        }
      }
    } else {
      if (option !== "") {
        playGameSound("wrong");
      }
      correctStreakRef.current = 0;
      wrongStreakRef.current += 1;
      trackAnalyticsEvent("item_wrong", {
        game: "docs_quiz",
        question: currentRound.question,
        errorType: "quiz_error",
        level: selectedLevel,
      });
      setLives((previous) => Math.max(0, previous - 1));
      setStreak(0);

      if (
        shouldDownshiftByWrongStreak(
          wrongStreakRef.current,
          DOWNSHIFT_AFTER_WRONG_STREAK,
        )
      ) {
        const transition = DOCS_QUIZ_DIFFICULTY.decreaseLevel(
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
          setQuestionsPool(buildPoolForLevel(transition.nextLevel));
          toast.info(
            `Dificultad ajustada a ${LEVEL_LABEL[transition.nextLevel]} por ${DOWNSHIFT_AFTER_WRONG_STREAK} errores seguidos.`,
          );
        }
      }
    }
  };

  const handleNextQuestion = () => {
    if (lives <= 0) {
      finishGame();
      return;
    }
    const nextRound = getNextRound(questionsPool);
    if (!nextRound) {
      finishGame();
      return;
    }
    setQuestionsPool((prev) => prev.slice(1));
    setSelectedOption(null);
    setLastResult(null);
    setCurrentRound(nextRound);
    setShuffledOptions(shuffle([...nextRound.options]));
    setTimeLeft(questionTime);
  };

  if (docsQuizQuestions.length === 0) {
    return (
      <Card className="max-w-4xl mx-auto text-center mt-6">
        <h3 className="text-xl font-black text-text-primary mb-2">
          📝 Tech Quiz
        </h3>
        <p className="text-text-secondary">No hay preguntas configuradas.</p>
      </Card>
    );
  }

  const startScreen = (
    <GameStartPanel
      title="Tech Interview Quiz"
      description="Configura dificultad y ritmo antes de iniciar."
      onStart={startGame}
      startLabel="Iniciar Quiz"
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
          Tiempo por pregunta: {questionTime}s
        </p>
      </div>
    </GameStartPanel>
  );

  return (
    <GameShell
      hasStarted={gameState !== "idle"}
      startScreen={startScreen}
      contentKey={gameState === "finished" ? "summary" : "active"}
      pageClassName="flex-1 overflow-y-auto overscroll-y-contain bg-background p-4 md:p-6"
      contentClassName="max-w-4xl mx-auto space-y-6"
    >
      <GameHudCard
        title="Tech Interview Quiz"
        description="Practica con preguntas de arquitectura e ingenieria."
        meta={
          <p className="text-xs text-text-muted mt-1">
            Record: {bestScore} | Nivel: {LEVEL_LABEL[selectedLevel]}
          </p>
        }
        status={`Vidas ${lives} · Score ${score}`}
        timeLeft={gameState === "playing" ? timeLeft : 0}
        roundTime={questionTime}
        controls={LEVEL_ORDER.map((level) => (
          <Button
            key={level}
            size="sm"
            variant={selectedLevel === level ? "primary" : "secondary"}
            onClick={() => handleLevelSelect(level)}
            aria-label={`Set docs quiz level ${LEVEL_LABEL[level]}`}
          >
            {LEVEL_LABEL[level]}
          </Button>
        ))}
      />
      <Card elevated>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-black text-text-primary">
            📝 Tech Interview Quiz
          </h2>
          <span className="text-xs uppercase tracking-widest font-bold text-text-secondary">
            Récord: {bestScore}
          </span>
        </div>
        <p className="text-sm text-text-secondary mt-3">
          Prepárate para entrevistas de FAANG o certificaciones. {questionTime} segundos por pregunta, 3 vidas. Lee cuidadosamente.
        </p>
      </Card>

      {gameState === "idle" && (
        <Card className="text-center space-y-4">
          <p className="text-text-secondary">
            Pon a prueba tu conocimiento arquitectónico y de ingeniería de
            software.
          </p>
          <Button variant="primary" size="lg" onClick={startGame}>
            Iniciar Quiz
          </Button>
        </Card>
      )}

      {gameState === "playing" && currentRound && (
        <>
          <div className="w-full h-3 bg-surface-2 rounded-full overflow-hidden shadow-inner mb-4 border border-border">
            <div
              className={`h-full transition-all duration-1000 ease-linear rounded-full ${timeLeft <= 10 ? "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)] animate-pulse" : timeLeft <= questionTime / 2 ? "bg-amber-400" : "bg-success"}`}
              style={{ width: `${(timeLeft / questionTime) * 100}%` }}
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
              <div className="flex justify-between items-center mb-2">
                <p className="text-[10px] uppercase tracking-widest font-bold text-accent">
                  {currentRound.category}{" "}
                  {currentRound.subCategory
                    ? `› ${currentRound.subCategory}`
                    : ""}
                </p>
                <p className="text-xs font-medium text-text-muted">
                  Preguntas restantes: {questionsPool.length + 1}
                </p>
              </div>

              <h3 className="text-xl font-black text-text-primary leading-relaxed">
                {currentRound.question}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {shuffledOptions.map((option) => {
                const isSelected = option === selectedOption;
                const isCorrect = option === currentRound.correctAnswer;

                let stateClass =
                  "bg-surface-2 hover:bg-surface-hover border-border transform hover:scale-[1.02] active:scale-[0.98]";
                if (selectedOption !== null) {
                  if (isCorrect) {
                    stateClass =
                      "bg-success/20 border-success text-success scale-[1.02] shadow-[0_0_15px_rgba(34,197,94,0.3)] z-10 animate-[bounce_0.5s_ease-in-out]";
                  } else if (isSelected) {
                    stateClass =
                      "bg-rose-500/20 border-rose-500 text-rose-400 scale-[0.98] animate-[shake_0.4s_ease-in-out]";
                  } else {
                    stateClass =
                      "bg-surface-2 opacity-50 border-border text-text-secondary";
                  }
                }

                return (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    disabled={selectedOption !== null}
                    className={`w-full text-left rounded-xl border p-4 min-h-[60px] transition-all duration-200 flex items-center ${stateClass}`}
                  >
                    <span className="font-semibold text-sm leading-relaxed">
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>

            {selectedOption !== null && (
              <div
                className={`p-4 rounded-xl border flex flex-col gap-4 ${lastResult === "correct" ? "bg-success/10 border-success/30" : "bg-rose-500/10 border-rose-500/30"}`}
              >
                <div>
                  <p
                    className={`text-sm font-bold mb-1 ${lastResult === "correct" ? "text-success" : "text-rose-400"}`}
                  >
                    {lastResult === "correct"
                      ? "¡Excelente respuesta! +puntos"
                      : timeLeft <= 0 && selectedOption === ""
                        ? `¡Se acabó el tiempo! La respuesta era: ${currentRound.correctAnswer}`
                        : `Incorrecto. La respuesta era: ${currentRound.correctAnswer}`}
                  </p>
                  <p className="text-sm text-text-primary leading-relaxed mt-2 border-t border-border pt-2">
                    <span className="font-bold text-text-secondary text-xs uppercase tracking-widest mr-2">
                      Explicación:
                    </span>
                    {currentRound.explanation}
                  </p>
                </div>
                <Button
                  variant={lastResult === "correct" ? "primary" : "secondary"}
                  onClick={handleNextQuestion}
                  className="self-end"
                >
                  Continuar
                </Button>
              </div>
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
                  message: "¡Maestro Arquitecto!",
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
                  message: "¡Sólido Conocimiento!",
                };
              if (score >= 20)
                return {
                  grade: "C",
                  color: "text-amber-400",
                  message: "¡Buen Esfuerzo!",
                };
              return {
                grade: "D",
                color: "text-slate-400",
                message: "¡Repasa la documentación!",
              };
            })();

            return (
              <>
                <div>
                  <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400 mb-2">
                    {lives <= 0 ? "¡Sin vidas!" : "¡Quiz Completado!"}
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

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
                  <Button
                    variant="primary"
                    onClick={startGame}
                    className="w-full sm:w-auto py-3 px-8 text-lg font-bold flex-1"
                  >
                    Jugar de nuevo
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setGameState("idle")}
                    className="w-full sm:w-auto py-3 px-8 text-lg flex-1"
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

export default StudyDocsQuizView;
