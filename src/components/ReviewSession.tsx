import React, { useState, useEffect, useCallback } from "react";
import { SrsVocabularyItem } from "@/types";
import { SpeakerIcon } from "@/components/Icons";
import { fsrs, Rating, createEmptyCard } from "ts-fsrs";
import { motion, AnimatePresence } from "framer-motion";
import Badge from "@/components/ui/Badge";

const splitMeaningLines = (value: string) =>
  value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

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
  const meaningLines = splitMeaningLines(item.definition);
  const clueText = item.originalContext || item.example || null;
  const maskedClueText = clueText
    ? clueText.replace(
        new RegExp(`(${escapeRegExp(item.word)})`, "gi"),
        "_____",
      )
    : null;
  const hasCluePanel = Boolean(
    maskedClueText || item.partOfSpeech || (item.tags && item.tags.length > 0),
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
    <div className="flex-1 overflow-y-auto overscroll-y-contain pt-4 md:pt-8 pb-[calc(env(safe-area-inset-bottom)+7rem)] md:pb-4">
      <div className="flex min-h-full flex-col max-w-2xl mx-auto w-full px-4 md:px-0">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onFinishSession}
            className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
            aria-label="Quit review session"
          >
            ← Quit
          </button>
          <span className="text-slate-400 font-bold uppercase text-xs tracking-widest bg-slate-800 py-1 px-3 rounded-full">
            Review {progress.current} / {progress.total}
          </span>
        </div>

        <motion.div
          layout
          className="bg-slate-800 border border-slate-700/60 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden md:flex-1"
          style={{
            boxShadow:
              "0 20px 40px -10px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          <div
            className="absolute top-0 left-0 w-full h-1.5 bg-slate-900"
            role="progressbar"
            aria-valuenow={progress.current}
            aria-valuemin={0}
            aria-valuemax={progress.total}
            aria-label="Session progress"
          >
            <div
              className="bg-sky-500 h-full transition-all duration-500 rounded-r-full shadow-[0_0_10px_rgba(14,165,233,0.5)]"
              style={{ width: `${(progress.current / progress.total) * 100}%` }}
            ></div>
          </div>

          <motion.div
            layout
            className="mb-6 md:mb-8 flex flex-col items-center z-10 w-full"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight drop-shadow-md">
              {item.word}
            </h2>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  onPlayAudio(item.word);
                  onSpeakingUsed?.("review_audio");
                }}
                className="bg-slate-700/80 hover:bg-sky-500 text-white p-3.5 rounded-full transition-all inline-flex items-center justify-center hover:scale-105 hover:shadow-lg hover:shadow-sky-500/20 active:scale-95"
                aria-label={`Listen to pronunciation of ${item.word}`}
              >
                <SpeakerIcon />
              </button>
              {item.ipa && (
                <span className="text-slate-400 font-mono text-lg bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-700/50">
                  {item.ipa}
                </span>
              )}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {!isRevealed ? (
              <motion.div
                key="unrevealed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full mt-4"
              >
                {(item.originalContext ||
                  item.example ||
                  (item.tags && item.tags.length > 0) ||
                  item.partOfSpeech) &&
                  hasCluePanel && (
                    <div className="mb-8 p-4 bg-slate-900/40 rounded-2xl border border-slate-700/50 max-w-sm mx-auto shadow-inner text-left">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-amber-400/80 uppercase text-[10px] font-bold tracking-widest">
                          Clue
                        </span>
                        {item.partOfSpeech && (
                          <Badge
                            variant="default"
                            className="text-[10px] py-0 h-4 bg-slate-800 text-slate-300"
                          >
                            {item.partOfSpeech}
                          </Badge>
                        )}
                      </div>
                      {maskedClueText ? (
                        <p className="text-slate-300 text-sm italic font-medium">
                          "{maskedClueText}"
                        </p>
                      ) : item.tags && item.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700/50"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  )}

                <button
                  onClick={() => setIsRevealed(true)}
                  className="w-full max-w-xs bg-sky-600 hover:bg-sky-500 text-white font-bold py-4 md:py-5 rounded-2xl shadow-[0_8px_20px_-6px_rgba(14,165,233,0.5)] transition-all group active:scale-[0.98] border border-sky-400/20"
                  aria-label="Show answer (Space)"
                >
                  <span className="text-lg">Show Answer</span>
                  <span className="opacity-70 ml-2 text-sm font-normal bg-black/20 px-2 py-0.5 rounded text-white/90 hidden sm:inline-block">
                    [Space]
                  </span>
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="revealed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full flex-1 flex flex-col"
              >
                <div className="mb-8 w-full text-left bg-slate-900/40 p-5 md:p-6 rounded-2xl border border-slate-700/50 shadow-inner overflow-y-auto max-h-[40vh] custom-scrollbar">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <h3 className="text-amber-400 font-bold uppercase text-xs tracking-wider">
                      Meaning
                    </h3>
                    {item.partOfSpeech && (
                      <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-[10px] h-5 py-0">
                        {item.partOfSpeech}
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-3 mb-4">
                    {meaningLines.map((line, index) => (
                      <p
                        key={`${item.word}-meaning-${index}`}
                        className={
                          index === 0
                            ? "text-lg md:text-xl text-slate-100 font-medium leading-snug"
                            : "text-sm md:text-base text-slate-300 leading-relaxed"
                        }
                      >
                        {line}
                      </p>
                    ))}
                  </div>

                  {(item.example || item.originalContext) && (
                    <div className="mt-4 pt-4 border-t border-slate-700/50 space-y-4">
                      {item.example && (
                        <div>
                          <span className="text-sky-400/80 uppercase text-[10px] font-bold tracking-widest block mb-1">
                            Example
                          </span>
                          <p className="text-slate-300 italic">
                            "{item.example}"
                          </p>
                        </div>
                      )}
                      {item.originalContext &&
                        item.originalContext !== item.example && (
                          <div>
                            <span className="text-emerald-400/80 uppercase text-[10px] font-bold tracking-widest block mb-1">
                              Context
                            </span>
                            <p className="text-slate-300 text-sm">
                              "{item.originalContext}"
                            </p>
                          </div>
                        )}
                    </div>
                  )}

                  {item.tags && item.tags.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-700/50 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-medium text-slate-400 bg-slate-800/80 px-2 py-1 rounded-md border border-slate-700/30"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  <button
                    onClick={() => handleResult(false, Rating.Again)}
                    className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-red-500/50 text-slate-300 hover:text-red-400 py-3 md:py-4 rounded-2xl transition-all group relative flex flex-col items-center justify-center active:scale-95 touch-manipulation"
                    aria-label="Forgot it (Press 1)"
                  >
                    <span className="font-bold mb-1 text-sm md:text-base group-hover:scale-105 transition-transform">
                      Again
                    </span>
                    <span className="text-[10px] md:text-xs opacity-60 font-medium bg-slate-900/50 px-2 py-0.5 rounded-md">
                      {predictions ? predictions[Rating.Again] : "..."}
                    </span>
                    <span className="absolute top-2 right-2.5 opacity-40 text-[9px] font-normal border border-slate-600 px-1 py-0 rounded hidden md:inline-block">
                      1
                    </span>
                  </button>

                  <button
                    onClick={() => handleResult(true, Rating.Hard)}
                    className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-orange-500/50 text-slate-300 hover:text-orange-400 py-3 md:py-4 rounded-2xl transition-all group relative flex flex-col items-center justify-center active:scale-95 touch-manipulation"
                    aria-label="Hard (Press 2)"
                  >
                    <span className="font-bold mb-1 text-sm md:text-base group-hover:scale-105 transition-transform">
                      Hard
                    </span>
                    <span className="text-[10px] md:text-xs opacity-60 font-medium bg-slate-900/50 px-2 py-0.5 rounded-md">
                      {predictions ? predictions[Rating.Hard] : "..."}
                    </span>
                    <span className="absolute top-2 right-2.5 opacity-40 text-[9px] font-normal border border-slate-600 px-1 py-0 rounded hidden md:inline-block">
                      2
                    </span>
                  </button>

                  <button
                    onClick={() => handleResult(true, Rating.Good)}
                    className="bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-400 py-3 md:py-4 rounded-2xl transition-all group relative flex flex-col items-center justify-center shadow-[0_0_20px_rgba(14,165,233,0.1)] ring-1 ring-sky-500/30 active:scale-95 touch-manipulation"
                    aria-label="Good (Press 3)"
                  >
                    <span className="font-bold mb-1 text-sm md:text-base group-hover:scale-105 transition-transform text-sky-300">
                      Good
                    </span>
                    <span className="text-[10px] md:text-xs opacity-80 font-medium bg-sky-900/50 px-2 py-0.5 rounded-md text-sky-200">
                      {predictions ? predictions[Rating.Good] : "..."}
                    </span>
                    <span className="absolute top-2 right-2.5 opacity-50 text-[9px] font-normal border border-sky-400/30 px-1 py-0 rounded hidden md:inline-block">
                      3/Space
                    </span>
                  </button>

                  <button
                    onClick={() => handleResult(true, Rating.Easy)}
                    className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-emerald-500/50 text-slate-300 hover:text-emerald-400 py-3 md:py-4 rounded-2xl transition-all group relative flex flex-col items-center justify-center active:scale-95 touch-manipulation"
                    aria-label="Easy (Press 4)"
                  >
                    <span className="font-bold mb-1 text-sm md:text-base group-hover:scale-105 transition-transform">
                      Easy
                    </span>
                    <span className="text-[10px] md:text-xs opacity-60 font-medium bg-slate-900/50 px-2 py-0.5 rounded-md">
                      {predictions ? predictions[Rating.Easy] : "..."}
                    </span>
                    <span className="absolute top-2 right-2.5 opacity-40 text-[9px] font-normal border border-slate-600 px-1 py-0 rounded hidden md:inline-block">
                      4
                    </span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ReviewSession;
