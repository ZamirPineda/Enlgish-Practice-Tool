import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import GameStartPanel from "@/components/GameStartPanel";
import DailySessionInsights from "@/components/game/DailySessionInsights";
import GameHudCard from "@/components/game/GameHudCard";
import Button from "@/components/ui/Button";
import { techDecks, TechCard } from "@/features/data/techDecks";
import { trackAnalyticsEvent } from "@/lib/analytics";
import {
  getTimeByPreset,
  TimePreset,
  TIME_PRESET_LABEL,
} from "@/lib/gameSessionConfig";
import { addGlobalXp, progressQuest } from "@/lib/xpStore";

type TriviaDifficulty = "easy" | "normal" | "hard";

const DIFFICULTY_LABEL: Record<TriviaDifficulty, string> = {
  easy: "Facil",
  normal: "Normal",
  hard: "Dificil",
};

const DIFFICULTY_LIVES: Record<TriviaDifficulty, number> = {
  easy: 4,
  normal: 3,
  hard: 2,
};

const DIFFICULTY_QUESTIONS: Record<TriviaDifficulty, number> = {
  easy: 12,
  normal: 15,
  hard: 18,
};

const DIFFICULTY_SCORE_MULTIPLIER: Record<TriviaDifficulty, number> = {
  easy: 1,
  normal: 1.2,
  hard: 1.5,
};

const shuffle = <T,>(items: T[]) => [...items].sort(() => 0.5 - Math.random());

export const TechTriviaSprintView: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();

  const [deckCards, setDeckCards] = useState<TechCard[]>([]);
  const [cards, setCards] = useState<TechCard[]>([]);
  const [difficulty, setDifficulty] = useState<TriviaDifficulty>("normal");
  const [timePreset, setTimePreset] = useState<TimePreset>("normal");
  const [hasStarted, setHasStarted] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(DIFFICULTY_LIVES.normal);
  const [timeLeft, setTimeLeft] = useState(25);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const sessionStartTime = useRef<number>(Date.now());

  useEffect(() => {
    const deck = techDecks.find((item) => item.id === deckId);
    if (deck && deck.cards.length > 4) {
      setDeckCards(deck.cards);
    }
  }, [deckId]);

  const questionTime = getTimeByPreset(25, timePreset);

  const currentCard = cards[currentIndex];

  const options = useMemo(() => {
    if (!currentCard || deckCards.length === 0) return [];
    const wrongCards = shuffle(
      deckCards.filter((card) => card.answer !== currentCard.answer),
    ).slice(0, 3);
    return shuffle([
      currentCard.answer,
      ...wrongCards.map((card) => card.answer),
    ]);
  }, [currentCard, deckCards]);

  const handleFinish = useCallback(
    (finalScore: number) => {
      if (isFinished) return;

      setIsFinished(true);
      addGlobalXp(Math.round(finalScore * 15));
      progressQuest("play_game", 1, "test_tech");
      trackAnalyticsEvent("session_end", {
        game: "tech_trivia",
        duration: Math.round((Date.now() - sessionStartTime.current) / 1000),
        score: finalScore,
        difficulty,
        timePreset,
      });
    },
    [difficulty, isFinished, timePreset],
  );

  useEffect(() => {
    if (!hasStarted || isFinished) return;
    if (lives <= 0) {
      handleFinish(score);
    }
  }, [handleFinish, hasStarted, isFinished, lives, score]);

  useEffect(() => {
    if (!hasStarted || isFinished || selectedOption) return;

    if (timeLeft === 0) {
      handleAnswer(null);
      return;
    }

    const timer = setTimeout(
      () => setTimeLeft((previous) => previous - 1),
      1000,
    );
    return () => clearTimeout(timer);
  }, [hasStarted, isFinished, selectedOption, timeLeft]);

  const startSession = () => {
    const selectedCards = shuffle(deckCards).slice(
      0,
      DIFFICULTY_QUESTIONS[difficulty],
    );
    const initialLives = DIFFICULTY_LIVES[difficulty];

    setCards(selectedCards);
    setCurrentIndex(0);
    setScore(0);
    setLives(initialLives);
    setTimeLeft(questionTime);
    setIsFinished(false);
    setSelectedOption(null);
    setHasStarted(true);
    sessionStartTime.current = Date.now();

    trackAnalyticsEvent("session_start", {
      game: "tech_trivia",
      deck: deckId,
      difficulty,
      timePreset,
      questionTime,
      questions: selectedCards.length,
      lives: initialLives,
    });
  };

  const handleAnswer = (answer: string | null) => {
    if (selectedOption || !currentCard) return;

    setSelectedOption(answer);
    const isCorrect = answer === currentCard.answer;
    const roundPoints = isCorrect
      ? Math.round(10 * DIFFICULTY_SCORE_MULTIPLIER[difficulty])
      : 0;
    const nextScore = score + roundPoints;
    const nextLives = isCorrect ? lives : lives - 1;

    if (isCorrect) {
      setScore(nextScore);
      trackAnalyticsEvent("item_correct", {
        game: "tech_trivia",
        deck: deckId,
        difficulty,
        score: roundPoints,
      });
    } else {
      setLives(Math.max(0, nextLives));
      trackAnalyticsEvent("item_wrong", {
        game: "tech_trivia",
        deck: deckId,
        difficulty,
        errorType: answer === null ? "timeout" : "wrong_answer",
      });
    }

    setTimeout(() => {
      const hasMoreCards = currentIndex < cards.length - 1;
      if (hasMoreCards && nextLives > 0) {
        setCurrentIndex((previous) => previous + 1);
        setSelectedOption(null);
        setTimeLeft(questionTime);
        return;
      }
      handleFinish(nextScore);
    }, 1500);
  };

  if (deckCards.length === 0) {
    return (
      <div className="p-8 text-center bg-slate-900 text-white min-h-screen">
        Cargando o no hay suficientes items en el deck...
      </div>
    );
  }

  if (!hasStarted) {
    return (
      <div className="flex-1 overflow-y-auto bg-background p-4 sm:p-8 pb-4 sm:pb-8">
        <GameStartPanel
          title="Tech Trivia Sprint"
          description="Configura dificultad y tiempo antes de iniciar."
          startLabel="Iniciar Trivia"
          onStart={startSession}
        >
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-text-muted">
              Dificultad
            </p>
            <div className="flex justify-center flex-wrap gap-2">
              {(Object.keys(DIFFICULTY_LABEL) as TriviaDifficulty[]).map(
                (level) => (
                  <Button
                    key={`difficulty-${level}`}
                    size="sm"
                    variant={difficulty === level ? "primary" : "secondary"}
                    onClick={() => setDifficulty(level)}
                  >
                    {DIFFICULTY_LABEL[level]} ({DIFFICULTY_LIVES[level]} vidas)
                  </Button>
                ),
              )}
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-text-muted">
              Ritmo de tiempo
            </p>
            <div className="flex justify-center flex-wrap gap-2">
              {(Object.keys(TIME_PRESET_LABEL) as TimePreset[]).map(
                (preset) => (
                  <Button
                    key={`time-${preset}`}
                    size="sm"
                    variant={timePreset === preset ? "primary" : "secondary"}
                    onClick={() => setTimePreset(preset)}
                  >
                    {TIME_PRESET_LABEL[preset]}
                  </Button>
                ),
              )}
            </div>
            <p className="text-xs text-text-secondary">
              Tiempo por pregunta: {questionTime}s
            </p>
          </div>
        </GameStartPanel>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full p-6 text-center space-y-6 bg-slate-900 text-white">
        <h2 className="text-4xl font-bold text-amber-400">Sprint Terminado</h2>
        <div className="text-6xl my-4">{score} pts</div>
        <p className="text-slate-300">
          Preguntas respondidas: {Math.min(currentIndex + 1, cards.length)}
        </p>
        <div className="w-full max-w-2xl">
          <DailySessionInsights className="text-left" />
        </div>
        <button
          onClick={() => navigate("/tech-hub")}
          className="px-8 py-3 bg-indigo-600 rounded-full hover:bg-indigo-500 font-bold shadow-lg shadow-indigo-500/20 transition-all"
        >
          Volver al Hub
        </button>
      </div>
    );
  }

  if (!currentCard) {
    return (
      <div className="p-8 text-center bg-slate-900 text-white min-h-screen">
        Preparando preguntas...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100 p-4">
      <GameHudCard
        title="Tech Trivia Sprint"
        description="Responde rapido y protege tus vidas."
        status={`Pregunta ${currentIndex + 1} / ${cards.length}`}
        meta={
          <p className="text-xs text-text-muted mt-1">
            Dificultad: {DIFFICULTY_LABEL[difficulty]} · Vidas: {lives}
          </p>
        }
        timeLeft={timeLeft}
        roundTime={questionTime}
      />
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          {Array.from({ length: DIFFICULTY_LIVES[difficulty] }).map(
            (_, index) => (
              <span
                key={`life-${index}`}
                className={`text-xl ${index < lives ? "text-red-500" : "text-slate-700"}`}
              >
                HP
              </span>
            ),
          )}
        </div>
        <div className="text-xl font-bold text-slate-300">
          Score: <span className="text-amber-400">{score}</span>
        </div>
        <div
          className={`text-xl font-mono ${timeLeft <= 5 ? "text-red-500 animate-pulse" : "text-blue-400"}`}
        >
          00:{timeLeft.toString().padStart(2, "0")}
        </div>
      </div>

      <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full">
        <div className="bg-slate-800 border border-slate-700 p-6 md:p-8 rounded-2xl shadow-xl mb-6 flex-shrink-0">
          <p className="text-xs text-indigo-400 uppercase tracking-wider mb-2 font-semibold">
            Pregunta {currentIndex + 1}
          </p>
          <h2 className="text-xl md:text-2xl font-bold leading-relaxed">
            {currentCard.prompt}
          </h2>
        </div>

        <div className="grid gap-3 pb-20">
          {options.map((option, index) => {
            let buttonClass =
              "bg-slate-800 border-slate-700 hover:bg-slate-700 hover:border-slate-500";

            if (selectedOption !== null) {
              if (option === currentCard.answer) {
                buttonClass = "bg-green-500/20 border-green-500 text-green-300";
              } else if (option === selectedOption) {
                buttonClass = "bg-red-500/20 border-red-500 text-red-300";
              } else {
                buttonClass =
                  "bg-slate-800/50 border-slate-800 text-slate-500 opacity-50";
              }
            }

            return (
              <button
                key={`option-${index}`}
                onClick={() => handleAnswer(option)}
                disabled={selectedOption !== null}
                className={`p-4 md:p-5 text-left border-2 rounded-xl transition-all duration-300 ${buttonClass}`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
