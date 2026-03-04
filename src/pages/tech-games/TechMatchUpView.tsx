import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GameStartPanel from "@/components/GameStartPanel";
import DailySessionInsights from "@/components/game/DailySessionInsights";
import GameHudCard from "@/components/game/GameHudCard";
import Button from "@/components/ui/Button";
import { techDecks } from "@/features/data/techDecks";
import { trackAnalyticsEvent } from "@/lib/analytics";
import { addGlobalXp, progressQuest } from "@/lib/xpStore";

type MatchDifficulty = "easy" | "normal" | "hard";

const DIFFICULTY_LABEL: Record<MatchDifficulty, string> = {
  easy: "Facil",
  normal: "Normal",
  hard: "Dificil",
};

const DIFFICULTY_SETS: Record<MatchDifficulty, number> = {
  easy: 2,
  normal: 3,
  hard: 4,
};

const DIFFICULTY_PAIRS_PER_SET: Record<MatchDifficulty, number> = {
  easy: 3,
  normal: 4,
  hard: 5,
};

const shuffle = <T,>(items: T[]) => [...items].sort(() => 0.5 - Math.random());

export const TechMatchUpView: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();

  const [pairs, setPairs] = useState<
    { prompt: string; answer: string; id: string }[]
  >([]);
  const [prompts, setPrompts] = useState<
    { text: string; id: string; matched: boolean }[]
  >([]);
  const [answers, setAnswers] = useState<
    { text: string; id: string; matched: boolean }[]
  >([]);
  const [selectedPromptId, setSelectedPromptId] = useState<string | null>(null);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [errorMatch, setErrorMatch] = useState(false);
  const [score, setScore] = useState(0);
  const [completedSets, setCompletedSets] = useState(0);
  const [difficulty, setDifficulty] = useState<MatchDifficulty>("normal");
  const [hasStarted, setHasStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const sessionStartTime = useRef<number>(Date.now());

  const totalSets = DIFFICULTY_SETS[difficulty];
  const cardsPerSet = DIFFICULTY_PAIRS_PER_SET[difficulty];

  const prepareSet = useCallback(() => {
    const deck = techDecks.find((item) => item.id === deckId);
    if (!deck || deck.cards.length < cardsPerSet) return;

    const selectedCards = shuffle(deck.cards).slice(0, cardsPerSet);
    const nextPairs = selectedCards.map((card) => ({
      prompt: card.prompt,
      answer: card.answer,
      id: Math.random().toString(36).slice(2, 11),
    }));

    setPairs(nextPairs);
    setPrompts(
      shuffle(
        nextPairs.map((pair) => ({
          text: pair.prompt,
          id: pair.id,
          matched: false,
        })),
      ),
    );
    setAnswers(
      shuffle(
        nextPairs.map((pair) => ({
          text: pair.answer,
          id: pair.id,
          matched: false,
        })),
      ),
    );
    setSelectedPromptId(null);
    setSelectedAnswerId(null);
    setErrorMatch(false);
  }, [cardsPerSet, deckId]);

  const startSession = () => {
    setScore(0);
    setCompletedSets(0);
    setIsFinished(false);
    setHasStarted(true);
    sessionStartTime.current = Date.now();
    prepareSet();

    trackAnalyticsEvent("session_start", {
      game: "tech_matchup",
      deck: deckId,
      difficulty,
      sets: totalSets,
      pairsPerSet: cardsPerSet,
    });
  };

  useEffect(() => {
    if (!hasStarted || isFinished) return;
    if (!selectedPromptId || !selectedAnswerId) return;

    if (selectedPromptId === selectedAnswerId) {
      setPrompts((previous) =>
        previous.map((prompt) =>
          prompt.id === selectedPromptId
            ? { ...prompt, matched: true }
            : prompt,
        ),
      );
      setAnswers((previous) =>
        previous.map((answer) =>
          answer.id === selectedAnswerId
            ? { ...answer, matched: true }
            : answer,
        ),
      );
      setScore((previous) => previous + 10);
      setSelectedPromptId(null);
      setSelectedAnswerId(null);
      trackAnalyticsEvent("item_correct", {
        game: "tech_matchup",
        deck: deckId,
        difficulty,
      });
      return;
    }

    setErrorMatch(true);
    trackAnalyticsEvent("item_wrong", {
      game: "tech_matchup",
      deck: deckId,
      difficulty,
      errorType: "mismatch",
    });
    const timer = setTimeout(() => {
      setSelectedPromptId(null);
      setSelectedAnswerId(null);
      setErrorMatch(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [
    deckId,
    difficulty,
    hasStarted,
    isFinished,
    selectedAnswerId,
    selectedPromptId,
  ]);

  useEffect(() => {
    if (!hasStarted || isFinished || prompts.length === 0) return;
    if (!prompts.every((prompt) => prompt.matched)) return;

    const timer = setTimeout(() => {
      const nextCompleted = completedSets + 1;
      setCompletedSets(nextCompleted);
      if (nextCompleted >= totalSets) {
        setIsFinished(true);
        return;
      }
      prepareSet();
    }, 1000);

    return () => clearTimeout(timer);
  }, [completedSets, hasStarted, isFinished, prepareSet, prompts, totalSets]);

  useEffect(() => {
    if (!isFinished) return;

    addGlobalXp(50 + score);
    progressQuest("play_game", 1, "test_tech");
    trackAnalyticsEvent("session_end", {
      game: "tech_matchup",
      duration: Math.round((Date.now() - sessionStartTime.current) / 1000),
      score,
      setsCompleted: completedSets,
    });
  }, [completedSets, isFinished, score]);

  const deck = techDecks.find((item) => item.id === deckId);
  const enoughCards = !!deck && deck.cards.length >= cardsPerSet;

  if (!enoughCards) {
    return (
      <div className="p-8 text-center text-white bg-slate-900 min-h-screen">
        Cargando o no hay suficientes items...
      </div>
    );
  }

  if (!hasStarted) {
    return (
      <div className="flex-1 overflow-y-auto bg-background p-4 sm:p-8 pb-4 sm:pb-8">
        <GameStartPanel
          title="Tech Match Up"
          description="Configura dificultad antes de iniciar."
          onStart={startSession}
          startLabel="Iniciar Match Up"
        >
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-text-muted">
              Dificultad
            </p>
            <div className="flex justify-center flex-wrap gap-2">
              {(Object.keys(DIFFICULTY_LABEL) as MatchDifficulty[]).map(
                (level) => (
                  <Button
                    key={`difficulty-${level}`}
                    size="sm"
                    variant={difficulty === level ? "primary" : "secondary"}
                    onClick={() => setDifficulty(level)}
                  >
                    {DIFFICULTY_LABEL[level]} ({DIFFICULTY_SETS[level]} rondas)
                  </Button>
                ),
              )}
            </div>
            <p className="text-xs text-text-secondary">
              Parejas por ronda: {cardsPerSet}
            </p>
          </div>
        </GameStartPanel>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center space-y-6 bg-slate-900 text-white">
        <h2 className="text-4xl font-bold text-fuchsia-400">
          Architecture Completa
        </h2>
        <div className="text-2xl my-4">Puntuacion: {score}</div>
        <div className="w-full max-w-2xl">
          <DailySessionInsights className="text-left" />
        </div>
        <button
          onClick={() => navigate("/tech-hub")}
          className="px-8 py-3 bg-fuchsia-600 rounded-full hover:bg-fuchsia-500 font-bold shadow-lg transition-all"
        >
          Volver al Hub
        </button>
      </div>
    );
  }

  if (pairs.length === 0) {
    return (
      <div className="p-8 text-center text-white bg-slate-900 min-h-screen">
        Preparando ronda...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100 p-4">
      <GameHudCard
        title="Tech Match Up"
        description="Conecta conceptos con sus definiciones."
        status={`Ronda ${Math.min(completedSets + 1, totalSets)} / ${totalSets}`}
        meta={
          <p className="text-xs text-text-muted mt-1">
            Dificultad: {DIFFICULTY_LABEL[difficulty]} · Score: {score}
          </p>
        }
        timeLeft={totalSets - completedSets}
        roundTime={totalSets}
        timerLabel="Rondas"
      />
      <div className="flex justify-between items-center mb-6 max-w-5xl mx-auto w-full">
        <button
          onClick={() => navigate("/tech-hub")}
          className="text-slate-400 hover:text-white"
        >
          Abandonar
        </button>
        <div className="font-bold text-fuchsia-400">
          Ronda {Math.min(completedSets + 1, totalSets)} / {totalSets}
        </div>
        <div className="text-xl font-bold text-slate-300">Score: {score}</div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto w-full pb-10">
        <div className="space-y-3 flex flex-col">
          <h3 className="text-center text-slate-400 font-semibold mb-2 hidden md:block">
            Conceptos
          </h3>
          {prompts.map((prompt) => {
            let buttonClass =
              "bg-slate-800 border-slate-700 hover:bg-slate-700";
            if (prompt.matched) {
              buttonClass =
                "bg-green-900/20 border-green-800 text-green-700 opacity-20 scale-95 pointer-events-none";
            } else if (prompt.id === selectedPromptId) {
              buttonClass = errorMatch
                ? "bg-red-900/40 border-red-500 text-red-200"
                : "bg-fuchsia-900/40 border-fuchsia-500 text-fuchsia-100 ring-2 ring-fuchsia-500/50";
            }

            return (
              <button
                key={`prompt-${prompt.id}`}
                onClick={() =>
                  !prompt.matched && setSelectedPromptId(prompt.id)
                }
                disabled={prompt.matched}
                className={`p-4 border-2 rounded-xl text-left transition-all duration-300 ${buttonClass}`}
              >
                {prompt.text}
              </button>
            );
          })}
        </div>

        <div className="space-y-3 flex flex-col mt-6 md:mt-0">
          <h3 className="text-center text-slate-400 font-semibold mb-2 hidden md:block">
            Definiciones
          </h3>
          {answers.map((answer) => {
            let buttonClass =
              "bg-slate-800 border-slate-700 hover:bg-slate-700";
            if (answer.matched) {
              buttonClass =
                "bg-green-900/20 border-green-800 text-green-700 opacity-20 scale-95 pointer-events-none";
            } else if (answer.id === selectedAnswerId) {
              buttonClass = errorMatch
                ? "bg-red-900/40 border-red-500 text-red-200"
                : "bg-indigo-900/40 border-indigo-500 text-indigo-100 ring-2 ring-indigo-500/50";
            }

            return (
              <button
                key={`answer-${answer.id}`}
                onClick={() =>
                  !answer.matched && setSelectedAnswerId(answer.id)
                }
                disabled={answer.matched}
                className={`p-4 border-2 rounded-xl text-left transition-all duration-300 text-sm md:text-base ${buttonClass}`}
              >
                {answer.text}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
