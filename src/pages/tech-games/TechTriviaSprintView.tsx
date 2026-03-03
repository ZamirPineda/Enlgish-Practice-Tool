import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { techDecks, TechCard } from "@/features/data/techDecks";
import { addGlobalXp, progressQuest } from "@/lib/xpStore";
import { trackAnalyticsEvent } from "@/lib/analytics";

const SHUFFLE = (arr: any[]) => [...arr].sort(() => 0.5 - Math.random());

export const TechTriviaSprintView: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();

  const [cards, setCards] = useState<TechCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(25);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    const deck = techDecks.find((d) => d.id === deckId);
    if (deck && deck.cards.length > 4) {
      setCards(SHUFFLE(deck.cards).slice(0, 15));
    }
  }, [deckId]);

  useEffect(() => {
    if (lives <= 0) {
      handleFinish();
    }
  }, [lives]);

  useEffect(() => {
    if (timeLeft === 0 && !selectedOption && !isFinished) {
      handleAnswer(null); // Time out
    }
    if (timeLeft > 0 && !selectedOption && !isFinished) {
      const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, selectedOption, isFinished]);

  const currentCard = cards[currentIndex];

  const options = useMemo(() => {
    if (!currentCard || cards.length === 0) return [];

    // Get 3 random wrong answers from the SAME deck
    const deck = techDecks.find((d) => d.id === deckId);
    if (!deck) return [currentCard.answer];

    const wrongCards = SHUFFLE(
      deck.cards.filter((c) => c.answer !== currentCard.answer),
    ).slice(0, 3);
    const answers = [currentCard.answer, ...wrongCards.map((c) => c.answer)];
    return SHUFFLE(answers);
  }, [currentCard, deckId, cards]);

  const handleFinish = useCallback(() => {
    setIsFinished(true);
    addGlobalXp(score * 15);
    progressQuest("play_game", 1, "test_tech");
    trackAnalyticsEvent("session_end", {
      game: "tech_trivia",
      durationSeconds: 60,
    });
  }, [score]);

  const handleAnswer = (answer: string | null) => {
    if (selectedOption) return; // Prevent double clicking

    setSelectedOption(answer);

    if (answer === currentCard.answer) {
      setScore((s) => s + 1);
      trackAnalyticsEvent("item_correct", {
        game: "tech_trivia",
        deck: deckId,
      });
    } else {
      setLives((l) => l - 1);
      trackAnalyticsEvent("item_wrong", { game: "tech_trivia", deck: deckId });
    }

    setTimeout(() => {
      if (
        currentIndex < cards.length - 1 &&
        lives > (answer === currentCard.answer ? 0 : 1)
      ) {
        setCurrentIndex((i) => i + 1);
        setSelectedOption(null);
        setTimeLeft(25);
      } else {
        handleFinish();
      }
    }, 1500);
  };

  if (cards.length === 0)
    return (
      <div className="p-8 text-center bg-slate-900 text-white min-h-screen">
        Cargando o no hay suficientes items en el deck (min 4)...
      </div>
    );

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full p-6 text-center space-y-6 bg-slate-900 text-white">
        <h2 className="text-4xl font-bold text-amber-400">
          ¡Sprint Terminado!
        </h2>
        <div className="text-6xl my-4">
          🎯 {score}/{currentIndex + (lives <= 0 ? 0 : 1)}
        </div>
        <p className="text-slate-300">Has ganado {score * 15} XP.</p>
        <button
          onClick={() => navigate("/tech-hub")}
          className="px-8 py-3 bg-indigo-600 rounded-full hover:bg-indigo-500 font-bold shadow-lg shadow-indigo-500/20 transition-all"
        >
          Volver al Hub
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <span
              key={i}
              className={`text-xl ${i < lives ? "text-red-500" : "text-slate-700"}`}
            >
              ❤️
            </span>
          ))}
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
        {/* Question Box */}
        <div className="bg-slate-800 border border-slate-700 p-6 md:p-8 rounded-2xl shadow-xl mb-6 flex-shrink-0">
          <p className="text-xs text-indigo-400 uppercase tracking-wider mb-2 font-semibold">
            Pregunta {currentIndex + 1}
          </p>
          <h2 className="text-xl md:text-2xl font-bold leading-relaxed">
            {currentCard?.prompt}
          </h2>
        </div>

        {/* Options */}
        <div className="grid gap-3 pb-20">
          {options.map((opt, i) => {
            let btnClass =
              "bg-slate-800 border-slate-700 hover:bg-slate-700 hover:border-slate-500";

            if (selectedOption !== null) {
              if (opt === currentCard.answer) {
                btnClass = "bg-green-500/20 border-green-500 text-green-300"; // Correct answer highlights green
              } else if (opt === selectedOption) {
                btnClass = "bg-red-500/20 border-red-500 text-red-300"; // Wrong selected highlights red
              } else {
                btnClass =
                  "bg-slate-800/50 border-slate-800 text-slate-500 opacity-50"; // Others fade
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                disabled={selectedOption !== null}
                className={`p-4 md:p-5 text-left border-2 rounded-xl transition-all duration-300 ${btnClass}`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
