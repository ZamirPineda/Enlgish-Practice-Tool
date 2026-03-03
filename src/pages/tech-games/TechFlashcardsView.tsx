import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { techDecks, TechCard } from "@/features/data/techDecks";
import { addGlobalXp, progressQuest } from "@/lib/xpStore";
import { trackAnalyticsEvent } from "@/lib/analytics";

export const TechFlashcardsView: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  const [cards, setCards] = useState<TechCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const deck = techDecks.find((d) => d.id === deckId);
    if (deck) {
      // Shuffle the cards for the session (take up to 20 for a quick session)
      const shuffled = [...deck.cards]
        .sort(() => 0.5 - Math.random())
        .slice(0, 20);
      setCards(shuffled);
    }
  }, [deckId]);

  if (cards.length === 0)
    return <div className="p-8 text-center">Loading...</div>;

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
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    } else {
      setIsFinished(true);
      addGlobalXp(50); // XP por terminar
      progressQuest("play_game", 1, "test_tech");
      trackAnalyticsEvent("session_end", {
        game: "tech_flashcards",
        durationSeconds: cards.length * 5,
      });
    }
  };

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-6">
        <h2 className="text-3xl font-bold text-green-400">
          ¡Entrevista Completada!
        </h2>
        <p className="text-slate-300">
          Has repasado {cards.length} conceptos clave.
        </p>
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

  const currentCard = cards[currentIndex];

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 p-4 pb-20">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate("/tech-hub")}
          className="text-slate-400 hover:text-white"
        >
          ← Volver
        </button>
        <span className="text-sm font-medium text-slate-400">
          Pregunta {currentIndex + 1} de {cards.length}
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full">
        {/* Flashcard */}
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

        {/* Controls */}
        {isFlipped && (
          <div className="mt-8 flex justify-center gap-4 animate-slide-up">
            <button
              onClick={() => handleNext(false)}
              className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/50 py-3 px-4 rounded-xl font-medium transition-colors"
            >
              No lo sabía
            </button>
            <button
              onClick={() => handleNext(false)}
              className="flex-1 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-500/50 py-3 px-4 rounded-xl font-medium transition-colors"
            >
              Dudé un poco
            </button>
            <button
              onClick={() => handleNext(true)}
              className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-500/50 py-3 px-4 rounded-xl font-medium transition-colors"
            >
              ¡Lo dominé!
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
