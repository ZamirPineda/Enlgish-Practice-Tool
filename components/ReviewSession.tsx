import React, { useState, useEffect, useCallback } from "react";
import { SrsVocabularyItem } from "../types";
import { SpeakerIcon } from "./Icons";

interface ReviewSessionProps {
  item: SrsVocabularyItem;
  progress: { current: number; total: number };
  onComplete: (wasCorrect: boolean) => void;
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

  // Memoize handleResult to use in effect
  const handleResult = useCallback(
    (correct: boolean) => {
      onComplete(correct);
      setIsRevealed(false);
    },
    [onComplete],
  );

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
        if (e.key === "1" || e.code === "ArrowLeft") {
          handleResult(false);
        } else if (e.key === "2" || e.code === "ArrowRight") {
          handleResult(true);
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

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleResult(false)}
                className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-bold py-4 rounded-xl transition-all group relative"
                aria-label="Forgot it (Press 1)"
              >
                Forgot it 😓
                <span className="absolute top-2 right-2 opacity-70 text-[10px] font-normal border border-red-400/30 px-1.5 py-0.5 rounded hidden sm:inline-block">
                  1
                </span>
              </button>
              <button
                onClick={() => handleResult(true)}
                className="bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold py-4 rounded-xl transition-all group relative"
                aria-label="Got it (Press 2)"
              >
                Got it! 🚀
                <span className="absolute top-2 right-2 opacity-70 text-[10px] font-normal border border-emerald-400/30 px-1.5 py-0.5 rounded hidden sm:inline-block">
                  2
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
