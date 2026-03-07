import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GameStartPanel from "@/components/GameStartPanel";
import DailySessionInsights from "@/components/game/DailySessionInsights";
import GameHudCard from "@/components/game/GameHudCard";
import Button from "@/components/ui/Button";
import { trackAnalyticsEvent } from "@/lib/analytics";
import {
  appendAdaptiveDifficultyLog,
  createAdaptiveDifficultyEngine,
  shouldDownshiftByWrongStreak,
  shouldUpshiftByCorrectStreak,
} from "@/lib/adaptiveDifficulty";
import {
  createContentSelectionSession,
  pickNextTechDeckCards,
  PickedTechDeckCard,
} from "@/lib/contentInventoryPicker";
import { addGlobalXp, progressQuest } from "@/lib/xpStore";
import { toast } from "@/components/ui/Toast";

interface BossCard {
  prompt: string;
  displayedAnswer: string;
  isTrue: boolean;
  actualAnswer: string;
}

type BossDifficulty = "easy" | "normal" | "hard";

const DIFFICULTY_LABEL: Record<BossDifficulty, string> = {
  easy: "Facil",
  normal: "Normal",
  hard: "Dificil",
};

const DIFFICULTY_QUESTIONS: Record<BossDifficulty, number> = {
  easy: 8,
  normal: 10,
  hard: 12,
};
const DOWNSHIFT_AFTER_WRONG_STREAK = 3;
const UPSHIFT_AFTER_CORRECT_STREAK = 3;
const BOSS_DIFFICULTY_ENGINE = createAdaptiveDifficultyEngine<BossDifficulty>({
  gameId: "tech_boss",
  levels: ["easy", "normal", "hard"],
  defaultLevel: "normal",
});

const shuffle = <T,>(items: T[]) => [...items].sort(() => 0.5 - Math.random());

export const TechBossView: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  const [deckCards, setDeckCards] = useState<PickedTechDeckCard[]>([]);
  const [cards, setCards] = useState<BossCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [difficulty, setDifficulty] = useState<BossDifficulty>("normal");
  const [hasStarted, setHasStarted] = useState(false);
  const sessionStartTime = useRef<number>(Date.now());
  const sessionIdRef = useRef<string | null>(null);
  const wrongStreakRef = useRef(0);
  const correctStreakRef = useRef(0);

  useEffect(() => {
    if (!deckId) {
      setDeckCards([]);
      return;
    }
    setDeckCards(
      pickNextTechDeckCards({
        deckId,
        shuffle: false,
      }),
    );
  }, [deckId]);

  const buildBossCards = () => {
    if (!deckId || deckCards.length === 0) return [];
    const selected = pickNextTechDeckCards({
      deckId,
      limit: DIFFICULTY_QUESTIONS[difficulty],
      shuffle: true,
      historyScope: {
        gameId: "tech_boss",
        sessionId: sessionIdRef.current || undefined,
      },
    });

    return selected.map((card) => {
      const isTrue = Math.random() > 0.5;
      let displayedAnswer = card.answer;

      if (!isTrue) {
        const otherCards = deckCards.filter(
          (item) => item.answer !== card.answer,
        );
        if (otherCards.length > 0) {
          displayedAnswer = shuffle(otherCards)[0].answer;
        }
      }

      return {
        prompt: card.prompt,
        displayedAnswer,
        isTrue,
        actualAnswer: card.answer,
      };
    });
  };

  const startSession = () => {
    sessionIdRef.current = createContentSelectionSession("tech_boss");
    const bossCards = buildBossCards();
    if (bossCards.length === 0) return;

    setCards(bossCards);
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
    setIsFinished(false);
    setHasStarted(true);
    sessionStartTime.current = Date.now();
    wrongStreakRef.current = 0;
    correctStreakRef.current = 0;

    trackAnalyticsEvent("session_start", {
      game: "tech_boss",
      deck: deckId,
      difficulty,
      questions: bossCards.length,
    });
  };

  const handleDifficultySelect = (nextDifficulty: BossDifficulty) => {
    setDifficulty((currentDifficulty) => {
      const transition = BOSS_DIFFICULTY_ENGINE.setLevel(
        currentDifficulty,
        nextDifficulty,
      );
      if (transition.changed) {
        appendAdaptiveDifficultyLog({
          ...transition,
          trigger: "manual",
          details: {
            source: "user_select",
          },
        });
      }
      return transition.nextLevel;
    });
  };

  const handleGuess = (guessTrue: boolean) => {
    if (feedback !== null) return;

    const currentCard = cards[currentIndex];
    const isLastCard = currentIndex >= cards.length - 1;
    const isCorrect = currentCard.isTrue === guessTrue;
    const nextScore = isCorrect ? score + 1 : score;

    setFeedback(isCorrect ? "correct" : "wrong");
    if (isCorrect) {
      wrongStreakRef.current = 0;
      correctStreakRef.current += 1;
      setScore(nextScore);
      trackAnalyticsEvent("item_correct", {
        game: "tech_boss",
        deck: deckId,
        difficulty,
      });
      if (
        !isLastCard &&
        shouldUpshiftByCorrectStreak(
          correctStreakRef.current,
          UPSHIFT_AFTER_CORRECT_STREAK,
        )
      ) {
        const transition = BOSS_DIFFICULTY_ENGINE.increaseLevel(
          difficulty,
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
          setDifficulty(transition.nextLevel);
          toast.success(
            `Dificultad ajustada a ${DIFFICULTY_LABEL[transition.nextLevel]} por ${UPSHIFT_AFTER_CORRECT_STREAK} aciertos seguidos.`,
          );
        }
      }
    } else {
      correctStreakRef.current = 0;
      wrongStreakRef.current += 1;
      trackAnalyticsEvent("item_wrong", {
        game: "tech_boss",
        deck: deckId,
        difficulty,
        errorType: "truth_mismatch",
      });
      if (
        !isLastCard &&
        shouldDownshiftByWrongStreak(
          wrongStreakRef.current,
          DOWNSHIFT_AFTER_WRONG_STREAK,
        )
      ) {
        const transition = BOSS_DIFFICULTY_ENGINE.decreaseLevel(
          difficulty,
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
          setDifficulty(transition.nextLevel);
          toast.info(
            `Dificultad ajustada a ${DIFFICULTY_LABEL[transition.nextLevel]} por ${DOWNSHIFT_AFTER_WRONG_STREAK} errores seguidos.`,
          );
        }
      }
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex < cards.length - 1) {
        setCurrentIndex((previous) => previous + 1);
        return;
      }

      setIsFinished(true);
      wrongStreakRef.current = 0;
      correctStreakRef.current = 0;
      addGlobalXp(nextScore * 20);
      progressQuest("play_game", 1, "test_tech");
      trackAnalyticsEvent("session_end", {
        game: "tech_boss",
        duration: Math.round((Date.now() - sessionStartTime.current) / 1000),
        score: nextScore,
      });
    }, 2000);
  };

  if (deckCards.length === 0) {
    return (
      <div className="p-8 text-center bg-slate-900 text-white min-h-screen">
        Loading...
      </div>
    );
  }

  if (!hasStarted) {
    return (
      <div className="flex-1 overflow-y-auto bg-background p-4 sm:p-8 pb-4 sm:pb-8">
        <GameStartPanel
          title="Tech Boss"
          description="Configura dificultad antes de iniciar el reto final."
          onStart={startSession}
          startLabel="Iniciar Boss"
        >
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-text-muted">
              Dificultad
            </p>
            <div className="flex justify-center flex-wrap gap-2">
              {(Object.keys(DIFFICULTY_LABEL) as BossDifficulty[]).map(
                (level) => (
                  <Button
                    key={`difficulty-${level}`}
                    size="sm"
                    variant={difficulty === level ? "primary" : "secondary"}
                    onClick={() => handleDifficultySelect(level)}
                  >
                    {DIFFICULTY_LABEL[level]} ({DIFFICULTY_QUESTIONS[level]})
                  </Button>
                ),
              )}
            </div>
          </div>
        </GameStartPanel>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="p-8 text-center bg-slate-900 text-white min-h-screen">
        Loading...
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center space-y-6 bg-slate-900 text-white">
        <div className="text-6xl mb-2">Boss</div>
        <h2 className="text-4xl font-bold text-red-500">
          Code Review Complete
        </h2>
        <div className="text-2xl mt-4">
          Precision: {score}/{cards.length}
        </div>
        <div className="w-full max-w-2xl">
          <DailySessionInsights className="text-left" />
        </div>
        <button
          onClick={() => navigate("/tech-hub")}
          className="mt-8 px-8 py-3 bg-red-600 rounded-full hover:bg-red-500 font-bold shadow-lg shadow-red-500/20 transition-all"
        >
          Return to Hub
        </button>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100 p-4">
      <GameHudCard
        title="Tech Boss"
        description="Decide si la respuesta mostrada es verdadera o falsa."
        status={`Pregunta ${currentIndex + 1} / ${cards.length}`}
        meta={
          <p className="text-xs text-text-muted mt-1">
            Dificultad: {DIFFICULTY_LABEL[difficulty]} | Score: {score}
          </p>
        }
        timeLeft={cards.length - currentIndex}
        roundTime={cards.length}
        timerLabel="Restantes"
        controls={(Object.keys(DIFFICULTY_LABEL) as BossDifficulty[]).map(
          (level) => (
            <Button
              key={`hud-${level}`}
              size="sm"
              variant={difficulty === level ? "primary" : "secondary"}
              onClick={() => handleDifficultySelect(level)}
              aria-label={`Set tech boss level ${DIFFICULTY_LABEL[level]}`}
            >
              {DIFFICULTY_LABEL[level]}
            </Button>
          ),
        )}
      />
      <div className="flex justify-between items-center mb-6 max-w-2xl mx-auto w-full">
        <button
          onClick={() => navigate("/tech-hub")}
          className="text-slate-400 hover:text-white"
        >
          Flee
        </button>
        <div className="text-red-400 font-mono font-bold uppercase tracking-widest">
          Bug Hunter
        </div>
        <div className="font-bold text-slate-300">
          {currentIndex + 1} / {cards.length}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center max-w-2xl mx-auto w-full pb-20">
        <div className="bg-slate-800/80 border border-red-900/50 p-6 md:p-8 rounded-2xl shadow-2xl w-full relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent h-full w-full pointer-events-none animate-scanline opacity-50" />

          <div className="relative z-10 space-y-6">
            <h3 className="text-xl md:text-2xl font-semibold text-slate-100">
              {currentCard.prompt}
            </h3>

            <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700 font-mono text-sm md:text-base text-green-400">
              {">"} {currentCard.displayedAnswer}
            </div>

            {feedback && (
              <div
                className={`p-4 rounded-xl border-2 text-center text-lg font-bold animate-fade-in ${
                  feedback === "correct"
                    ? "bg-green-900/30 border-green-500 text-green-400"
                    : "bg-red-900/30 border-red-500 text-red-400"
                }`}
              >
                {feedback === "correct" ? "Correcto" : "Te enganaron"}
                {!currentCard.isTrue && (
                  <div className="text-sm font-normal text-slate-300 mt-2">
                    Respuesta real:
                    <br />
                    <span className="text-indigo-300 mt-1 block">
                      {currentCard.actualAnswer}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex w-full gap-4 mt-8">
          <button
            onClick={() => handleGuess(true)}
            disabled={feedback !== null}
            className="flex-1 py-4 bg-slate-800 hover:bg-green-900/40 border-2 border-slate-700 hover:border-green-500 rounded-xl font-bold transition-all text-xl text-slate-300 hover:text-green-400 disabled:opacity-50"
          >
            VERDADERO
          </button>
          <button
            onClick={() => handleGuess(false)}
            disabled={feedback !== null}
            className="flex-1 py-4 bg-slate-800 hover:bg-red-900/40 border-2 border-slate-700 hover:border-red-500 rounded-xl font-bold transition-all text-xl text-slate-300 hover:text-red-400 disabled:opacity-50"
          >
            FALSO
          </button>
        </div>
      </div>
    </div>
  );
};
