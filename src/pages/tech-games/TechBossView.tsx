import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { techDecks, TechCard } from "@/features/data/techDecks";
import { addGlobalXp, progressQuest } from "@/lib/xpStore";
import { trackAnalyticsEvent } from "@/lib/analytics";

const SHUFFLE = (arr: any[]) => [...arr].sort(() => 0.5 - Math.random());

interface BossCard {
  prompt: string;
  displayedAnswer: string;
  isTrue: boolean;
  actualAnswer: string;
}

export const TechBossView: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();

  const [cards, setCards] = useState<BossCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  useEffect(() => {
    const deck = techDecks.find((d) => d.id === deckId);
    if (deck) {
      const selected = SHUFFLE(deck.cards).slice(0, 10);

      const bossCards = selected.map((card) => {
        // 50% chance of being true
        const isTrue = Math.random() > 0.5;
        let displayedAnswer = card.answer;

        if (!isTrue) {
          // Grab a random other answer from the deck
          const otherCards = deck.cards.filter((c) => c.answer !== card.answer);
          if (otherCards.length > 0) {
            displayedAnswer = SHUFFLE(otherCards)[0].answer;
          }
        }

        return {
          prompt: card.prompt,
          displayedAnswer,
          isTrue,
          actualAnswer: card.answer,
        };
      });

      setCards(bossCards);
    }
  }, [deckId]);

  const handleGuess = (guessTrue: boolean) => {
    if (feedback !== null) return; // Prevent double click

    const currentCard = cards[currentIndex];
    const isCorrect = currentCard.isTrue === guessTrue;

    setFeedback(isCorrect ? "correct" : "wrong");
    if (isCorrect) {
      setScore((s) => s + 1);
      trackAnalyticsEvent("item_correct", { game: "tech_boss", deck: deckId });
    } else {
      trackAnalyticsEvent("item_wrong", { game: "tech_boss", deck: deckId });
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex < cards.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else {
        setIsFinished(true);
        addGlobalXp(score * 20);
        progressQuest("play_game", 1, "test_tech");
        trackAnalyticsEvent("session_end", {
          game: "tech_boss",
          durationSeconds: 60,
        });
      }
    }, 2000);
  };

  if (cards.length === 0)
    return (
      <div className="p-8 text-center bg-slate-900 text-white min-h-screen">
        Loading...
      </div>
    );

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center space-y-6 bg-slate-900 text-white">
        <div className="text-6xl mb-2">🧑‍💻</div>
        <h2 className="text-4xl font-bold text-red-500">
          Code Review Complete
        </h2>
        <div className="text-2xl mt-4">
          Precision: {score}/{cards.length}
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
      <div className="flex justify-between items-center mb-6 max-w-2xl mx-auto w-full">
        <button
          onClick={() => navigate("/tech-hub")}
          className="text-slate-400 hover:text-white"
        >
          ← Flee
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
          {/* Scanline effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent h-full w-full pointer-events-none animate-scanline opacity-50"></div>

          <div className="relative z-10 space-y-6">
            <h3 className="text-xl md:text-2xl font-semibold text-slate-100">
              {currentCard.prompt}
            </h3>

            <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700 font-mono text-sm md:text-base text-green-400">
              {">"} {currentCard.displayedAnswer}
            </div>

            {/* In-game feedback overlay */}
            {feedback && (
              <div
                className={`p-4 rounded-xl border-2 text-center text-lg font-bold animate-fade-in ${
                  feedback === "correct"
                    ? "bg-green-900/30 border-green-500 text-green-400"
                    : "bg-red-900/30 border-red-500 text-red-400"
                }`}
              >
                {feedback === "correct"
                  ? "✅ ¡Buen ojo!"
                  : "❌ ¡Te han engañado!"}
                {!currentCard.isTrue && feedback === "wrong" && (
                  <div className="text-sm font-normal text-slate-300 mt-2">
                    Era falso. La respuesta real es:
                    <br />
                    <span className="text-indigo-300 mt-1 block">
                      {currentCard.actualAnswer}
                    </span>
                  </div>
                )}
                {!currentCard.isTrue && feedback === "correct" && (
                  <div className="text-sm font-normal text-slate-300 mt-2">
                    Exacto, era falso. La respuesta real es:
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

        {/* Action Buttons */}
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
