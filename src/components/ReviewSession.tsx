import React, { useState, useEffect, useCallback } from "react";
import { SrsVocabularyItem } from "@/types";
import { SpeakerIcon } from "@/components/Icons";
import { fsrs, Rating, createEmptyCard } from "ts-fsrs";

const f = fsrs({
  request_retention: 0.9,
});

interface ReviewSessionProps {
  item: SrsVocabularyItem;
  progress: { current: number; total: number };
  onComplete: (wasCorrect: boolean, rating?: Rating) => void;
  onFinishSession: () => void;
  onPlayAudio: (text: string) => void;
  onSpeakingUsed?: (source: "review_audio") => void;
}

const ReviewSession: React.FC<ReviewSessionProps> = ({
  item,
  progress,
  onComplete,
  onFinishSession,
  onPlayAudio,
  onSpeakingUsed,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [predictions, setPredictions] = useState<Record<Rating, string> | null>(
    null,
  );

  // Memoize handleResult to use in effect
  const handleResult = useCallback(
    (correct: boolean, rating: Rating) => {
      onComplete(correct, rating);
      setIsRevealed(false);
      setPredictions(null);
    },
    [onComplete],
  );

  useEffect(() => {
    if (item && isRevealed) {
      try {
        const now = new Date();
        let card = item.fsrsData;

        if (!card) {
          card = createEmptyCard(now);
        } else {
          // parse dates from localStorage strings
          if (typeof card.due === "string") card.due = new Date(card.due);
          if (typeof card.last_review === "string")
            card.last_review = new Date(card.last_review);
        }

        const schedulingCards = f.repeat(card, now);

        const formatPredictedTime = (scheduled_days: number, due: Date) => {
          if (scheduled_days === 0) {
            const diffMins = Math.max(
              1,
              Math.round((due.getTime() - now.getTime()) / 60000),
            );
            if (diffMins < 60) return `<${diffMins}m`;
            return `${Math.round(diffMins / 60)}h`;
          } else if (scheduled_days < 30) {
            return `${scheduled_days}d`;
          } else if (scheduled_days < 365) {
            return `${(scheduled_days / 30).toFixed(1)}mo`;
          } else {
            return `${(scheduled_days / 365).toFixed(1)}y`;
          }
        };

        setPredictions({
          [Rating.Again]: formatPredictedTime(
            schedulingCards[Rating.Again].card.scheduled_days,
            schedulingCards[Rating.Again].card.due,
          ),
          [Rating.Hard]: formatPredictedTime(
            schedulingCards[Rating.Hard].card.scheduled_days,
            schedulingCards[Rating.Hard].card.due,
          ),
          [Rating.Good]: formatPredictedTime(
            schedulingCards[Rating.Good].card.scheduled_days,
            schedulingCards[Rating.Good].card.due,
          ),
          [Rating.Easy]: formatPredictedTime(
            schedulingCards[Rating.Easy].card.scheduled_days,
            schedulingCards[Rating.Easy].card.due,
          ),
        } as Record<Rating, string>);
      } catch (e) {
        console.error("FSRS prediction error:", e);
      }
    }
  }, [item, isRevealed]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      const activeTag = document.activeElement?.tagName;
      if (
        activeTag === "INPUT" ||
        activeTag === "TEXTAREA" ||
        activeTag === "SELECT"
      ) {
        return;
      }

      if (!isRevealed) {
        if (e.code === "Space" || e.code === "Enter") {
          // If focused on a button or link, let the browser handle the click
          if (activeTag === "BUTTON" || activeTag === "A") {
            return;
          }
          e.preventDefault(); // Prevent scrolling for Space if not focused
          setIsRevealed(true);
        }
      } else {
        if (e.key === "1") {
          handleResult(false, Rating.Again);
        } else if (e.key === "2") {
          handleResult(true, Rating.Hard);
        } else if (e.key === "3" || e.code === "Space") {
          handleResult(true, Rating.Good);
        } else if (e.key === "4") {
          handleResult(true, Rating.Easy);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRevealed, handleResult]);

  return (
    <div className="flex-1 flex flex-col pt-8 pb-4 max-w-2xl mx-auto w-full animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onFinishSession}
          className="text-slate-400 hover:text-white transition-colors"
          aria-label="Quit review session"
        >
          ← Quit
        </button>
        <span className="text-slate-400 font-bold uppercase text-xs tracking-widest">
          Review {progress.current} / {progress.total}
        </span>
      </div>

      <div className="flex-1 bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-1 bg-slate-700"
          role="progressbar"
          aria-valuenow={progress.current}
          aria-valuemin={0}
          aria-valuemax={progress.total}
          aria-label="Session progress"
        >
          <div
            className="bg-sky-500 h-full transition-all duration-500"
            style={{ width: `${(progress.current / progress.total) * 100}%` }}
          ></div>
        </div>

        <div className="mb-8">
          <h2 className="text-4xl font-black text-white mb-4">{item.word}</h2>
          <button
            onClick={() => {
              onPlayAudio(item.word);
              onSpeakingUsed?.("review_audio");
            }}
            className="bg-slate-700 hover:bg-sky-600 text-white p-3 rounded-full transition-all inline-flex items-center justify-center"
            aria-label={`Listen to pronunciation of ${item.word}`}
          >
            <SpeakerIcon />
          </button>
          {item.ipa && (
            <p className="text-slate-400 font-mono mt-4">{item.ipa}</p>
          )}
        </div>

        {!isRevealed ? (
          <button
            onClick={() => setIsRevealed(true)}
            className="w-full max-w-xs bg-sky-600 hover:bg-sky-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all group"
            aria-label="Show answer (Space)"
          >
            Show Answer
            <span className="opacity-70 ml-2 text-sm font-normal bg-black/20 px-1.5 py-0.5 rounded text-white/90 hidden sm:inline-block">
              [Space]
            </span>
          </button>
        ) : (
          <div className="w-full animate-fade-in">
            <div className="mb-8 bg-slate-900/50 p-6 rounded-xl border border-slate-700">
              <h3 className="text-amber-400 font-bold uppercase text-xs mb-2">
                Meaning
              </h3>
              <p className="text-lg text-slate-200">{item.definition}</p>
              {item.example && (
                <div className="mt-4 pt-4 border-t border-slate-700/50">
                  <p className="text-slate-400 italic">"{item.example}"</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                onClick={() => handleResult(false, Rating.Again)}
                className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 py-3 rounded-xl transition-all group relative flex flex-col items-center justify-center"
                aria-label="Forgot it (Press 1)"
              >
                <span className="font-bold mb-1 group-hover:scale-105 transition-transform">
                  Again
                </span>
                <span className="text-xs opacity-80">
                  {predictions ? predictions[Rating.Again] : "..."}
                </span>
                <span className="absolute top-1.5 right-2 opacity-50 text-[9px] font-normal border border-red-400/30 px-1 py-0 rounded hidden md:inline-block">
                  1
                </span>
              </button>

              <button
                onClick={() => handleResult(true, Rating.Hard)}
                className="bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-400 py-3 rounded-xl transition-all group relative flex flex-col items-center justify-center"
                aria-label="Hard (Press 2)"
              >
                <span className="font-bold mb-1 group-hover:scale-105 transition-transform">
                  Hard
                </span>
                <span className="text-xs opacity-80">
                  {predictions ? predictions[Rating.Hard] : "..."}
                </span>
                <span className="absolute top-1.5 right-2 opacity-50 text-[9px] font-normal border border-orange-400/30 px-1 py-0 rounded hidden md:inline-block">
                  2
                </span>
              </button>

              <button
                onClick={() => handleResult(true, Rating.Good)}
                className="bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-400 py-3 rounded-xl transition-all group relative flex flex-col items-center justify-center shadow-[0_0_15px_rgba(14,165,233,0.15)] ring-1 ring-sky-500/50"
                aria-label="Good (Press 3)"
              >
                <span className="font-bold mb-1 group-hover:scale-105 transition-transform">
                  Good
                </span>
                <span className="text-xs opacity-80">
                  {predictions ? predictions[Rating.Good] : "..."}
                </span>
                <span className="absolute top-1.5 right-2 opacity-50 text-[9px] font-normal border border-sky-400/30 px-1 py-0 rounded hidden md:inline-block">
                  3/Space
                </span>
              </button>

              <button
                onClick={() => handleResult(true, Rating.Easy)}
                className="bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 py-3 rounded-xl transition-all group relative flex flex-col items-center justify-center"
                aria-label="Easy (Press 4)"
              >
                <span className="font-bold mb-1 group-hover:scale-105 transition-transform">
                  Easy
                </span>
                <span className="text-xs opacity-80">
                  {predictions ? predictions[Rating.Easy] : "..."}
                </span>
                <span className="absolute top-1.5 right-2 opacity-50 text-[9px] font-normal border border-emerald-400/30 px-1 py-0 rounded hidden md:inline-block">
                  4
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSession;
