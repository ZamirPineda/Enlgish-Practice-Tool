import React, { useEffect, useRef, useState } from "react";
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

type SessionSize = "short" | "normal" | "extended";

const SESSION_SIZE_LABEL: Record<SessionSize, string> = {
  short: "Corta",
  normal: "Normal",
  extended: "Larga",
};

const SESSION_SIZE_CARDS: Record<SessionSize, number> = {
  short: 10,
  normal: 20,
  extended: 30,
};

const shuffle = <T,>(items: T[]) => [...items].sort(() => 0.5 - Math.random());

export const TechFlashcardsView: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();

  const [deckCards, setDeckCards] = useState<TechCard[]>([]);
  const [cards, setCards] = useState<TechCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [sessionSize, setSessionSize] = useState<SessionSize>("normal");
  const [timePreset, setTimePreset] = useState<TimePreset>("normal");
  const sessionStartTime = useRef<number>(Date.now());

  useEffect(() => {
    const deck = techDecks.find((item) => item.id === deckId);
    if (deck) {
      setDeckCards(deck.cards);
    }
  }, [deckId]);

  const pacePerCard = getTimeByPreset(6, timePreset);

  const startSession = () => {
    const selected = shuffle(deckCards).slice(
      0,
      SESSION_SIZE_CARDS[sessionSize],
    );
    setCards(selected);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsFinished(false);
    setHasStarted(true);
    sessionStartTime.current = Date.now();

    trackAnalyticsEvent("session_start", {
      game: "tech_flashcards",
      deck: deckId,
      sessionSize,
      timePreset,
      pacePerCard,
      cards: selected.length,
    });
  };

  const handleNext = (correct: boolean) => {
    if (correct) {
      trackAnalyticsEvent("item_correct", {
        game: "tech_flashcards",
        deck: deckId,
      });
    } else {
      trackAnalyticsEvent("item_wrong", {
        game: "tech_flashcards",
        deck: deckId,
      });
    }

    if (currentIndex < cards.length - 1) {
      setCurrentIndex((previous) => previous + 1);
      setIsFlipped(false);
      return;
    }

    setIsFinished(true);
    addGlobalXp(50);
    progressQuest("play_game", 1, "test_tech");
    trackAnalyticsEvent("session_end", {
      game: "tech_flashcards",
      duration: Math.round((Date.now() - sessionStartTime.current) / 1000),
      expectedDuration: cards.length * pacePerCard,
      cards: cards.length,
    });
  };

  if (deckCards.length === 0) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!hasStarted) {
    return (
      <div className="flex-1 overflow-y-auto bg-background p-4 sm:p-8 pb-4 sm:pb-8">
        <GameStartPanel
          title="Tech Flashcards"
          description="Configura duracion y ritmo antes de comenzar."
          startLabel="Iniciar Flashcards"
          onStart={startSession}
        >
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-text-muted">
              Tamano de sesion
            </p>
            <div className="flex justify-center flex-wrap gap-2">
              {(Object.keys(SESSION_SIZE_LABEL) as SessionSize[]).map(
                (size) => (
                  <Button
                    key={`size-${size}`}
                    size="sm"
                    variant={sessionSize === size ? "primary" : "secondary"}
                    onClick={() => setSessionSize(size)}
                  >
                    {SESSION_SIZE_LABEL[size]} ({SESSION_SIZE_CARDS[size]})
                  </Button>
                ),
              )}
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-text-muted">
              Ritmo de estudio
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
              Tiempo de referencia por carta: {pacePerCard}s
            </p>
          </div>
        </GameStartPanel>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-6">
        <h2 className="text-3xl font-bold text-green-400">
          Entrevista Completada
        </h2>
        <p className="text-slate-300">
          Has repasado {cards.length} conceptos clave.
        </p>
        <div className="w-full max-w-2xl">
          <DailySessionInsights className="text-left" />
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/tech-hub")}
            className="px-6 py-3 bg-slate-700 rounded-lg hover:bg-slate-600 font-bold"
          >
            Volver al Hub
          </button>
        </div>
      </div>
    );
  }

  if (cards.length === 0) {
    return <div className="p-8 text-center">Preparing cards...</div>;
  }

  const currentCard = cards[currentIndex];

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 p-4 pb-20">
      <GameHudCard
        title="Tech Flashcards"
        description="Repasa conceptos y valida tu dominio."
        meta={
          <p className="text-xs text-text-muted mt-1">
            Ritmo sugerido: {pacePerCard}s por carta
          </p>
        }
        status={`Carta ${currentIndex + 1} / ${cards.length}`}
        timeLeft={cards.length - currentIndex}
        roundTime={cards.length}
        timerLabel="Restantes"
      />
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate("/tech-hub")}
          className="text-slate-400 hover:text-white"
        >
          Back
        </button>
        <span className="text-sm font-medium text-slate-400">
          Pregunta {currentIndex + 1} de {cards.length}
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full">
        <div
          onClick={() => !isFlipped && setIsFlipped(true)}
          className={`relative w-full min-h-[300px] flex items-center justify-center p-8 rounded-2xl cursor-pointer transition-all duration-500 transform-style-3d ${
            isFlipped
              ? "bg-indigo-900/40 border border-indigo-500/50"
              : "bg-slate-800 border border-slate-700 hover:border-slate-500 shadow-xl"
          }`}
        >
          <div className="text-center w-full">
            {!isFlipped ? (
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full font-semibold uppercase tracking-wider mb-2">
                  Entrevistador
                </span>
                <h3 className="text-2xl font-semibold leading-relaxed">
                  {currentCard.prompt}
                </h3>
                <p className="text-sm text-slate-500 mt-8 animate-pulse">
                  Toca para revelar la respuesta
                </p>
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in">
                <span className="inline-block px-3 py-1 bg-green-500/20 text-green-300 text-xs rounded-full font-semibold uppercase tracking-wider mb-2">
                  Respuesta Esperada
                </span>
                <p className="text-xl leading-relaxed text-slate-200">
                  {currentCard.answer}
                </p>
              </div>
            )}
          </div>
        </div>

        {isFlipped && (
          <div className="mt-8 flex justify-center gap-4 animate-slide-up">
            <button
              onClick={() => handleNext(false)}
              className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/50 py-3 px-4 rounded-xl font-medium transition-colors"
            >
              No lo sabia
            </button>
            <button
              onClick={() => handleNext(false)}
              className="flex-1 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-500/50 py-3 px-4 rounded-xl font-medium transition-colors"
            >
              Dudo un poco
            </button>
            <button
              onClick={() => handleNext(true)}
              className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-500/50 py-3 px-4 rounded-xl font-medium transition-colors"
            >
              Lo domine
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
