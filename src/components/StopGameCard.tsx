import React, { useState, useEffect } from "react";
import { StopItem, WordFamily, StopCategory, IrregularVerb } from "@/types";
import {
  getCategoryIcon,
  getCategoryTheme,
  GroupName,
  CATEGORY_GROUPS,
  PREDEFINED_ALL_ORDER,
  getFlagUrl,
} from "@/lib/stopGameHelpers";
import { irregularVerbs } from "@/features/data/verbs";
import {
  PlayIcon,
  LoadingSpinner,
  MicrophoneIcon,
  SaveIcon,
  ChevronDownIcon,
  SpeakerWaveIcon,
} from "@/components/Icons";

const getLevelBadgeColor = (level: string) => {
  switch (level) {
    case "A1":
      return "bg-green-900/50 text-green-400 border-green-500/30";
    case "A2":
      return "bg-emerald-900/50 text-emerald-400 border-emerald-500/30";
    case "B1":
      return "bg-blue-900/50 text-blue-400 border-blue-500/30";
    case "B2":
      return "bg-yellow-900/50 text-yellow-400 border-yellow-500/30";
    case "C1":
      return "bg-red-900/50 text-red-400 border-red-500/30";
    case "C2":
      return "bg-purple-900/50 text-purple-400 border-purple-500/30";
    default:
      return "bg-surface-2 text-text-muted border-border";
  }
};

interface StopGameCardProps {
  item: StopItem;
  category: StopCategory;
  theme: any;
  onPlay: (word: string) => void;
  onPractice: () => void;
  onSave: (word: string, def: string) => void;
  isAudioLoading: boolean;
  isPracticing: boolean;
  isSaved: boolean;
  micState: string;
  transcript: string;
  feedback: string | null;
  onDetailClick?: (item: StopItem) => void;
  isStudyMode?: boolean;
  studyRevealAll?: boolean;
  studyAutoPlay?: boolean;
}

const WordFamilyViewer = ({ family }: { family: WordFamily }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = React.useId();
  return (
    <div className="mt-3 border-t border-border/50 pt-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="text-[10px] uppercase font-bold text-text-muted hover:text-primary flex items-center gap-1 transition-colors"
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        {isOpen ? "Hide Family" : "Show Family 👨‍👩‍👧‍👦"}
        <ChevronDownIcon
          className={`w-3 h-3 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <div
          id={contentId}
          className="mt-2 grid grid-cols-2 gap-2 text-xs bg-surface-1/40 p-2 rounded animate-fade-in"
        >
          {family.noun && (
            <div>
              <span className="text-text-muted font-bold block text-[9px] uppercase">
                Noun
              </span>
              <span className="text-text-primary">{family.noun}</span>
            </div>
          )}
          {family.verb && (
            <div>
              <span className="text-text-muted font-bold block text-[9px] uppercase">
                Verb
              </span>
              <span className="text-text-primary">{family.verb}</span>
            </div>
          )}
          {family.adj && (
            <div>
              <span className="text-text-muted font-bold block text-[9px] uppercase">
                Adj
              </span>
              <span className="text-text-primary">{family.adj}</span>
            </div>
          )}
          {family.adv && (
            <div>
              <span className="text-text-muted font-bold block text-[9px] uppercase">
                Adv
              </span>
              <span className="text-text-primary">{family.adv}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const FeedbackDisplay = ({
  target,
  transcript,
}: {
  target: string;
  transcript: string;
}) => {
  if (!transcript)
    return (
      <span className="text-text-muted italic text-sm">Say "{target}"...</span>
    );

  const normalizedTarget = target.toLowerCase();
  const normalizedTranscript = transcript.toLowerCase();

  // Create an array of result characters
  const result = [];
  let tIndex = 0;

  for (let i = 0; i < target.length; i++) {
    const char = target[i];
    const lowerChar = normalizedTarget[i];

    // Find if char exists in transcript
    const matchIndex = normalizedTranscript.indexOf(lowerChar, tIndex);

    if (matchIndex !== -1) {
      result.push(
        <span key={i} className="text-emerald-400 font-bold">
          {char}
        </span>,
      );
      tIndex = matchIndex + 1;
    } else {
      // If not found in order, try finding it anywhere to hint
      // But strictly speaking for pronunciation flow, we want order.
      result.push(
        <span
          key={i}
          className="text-red-400 opacity-60 decoration-wavy underline text-sm"
        >
          {char}
        </span>,
      );
    }
  }

  return (
    <div className="flex flex-col gap-2 mt-2">
      <div>
        <div className="text-[10px] uppercase font-bold text-text-muted mb-1">
          Target Match
        </div>
        <div className="font-mono text-lg tracking-wider bg-black/40 p-2 rounded border border-border/50 flex flex-wrap">
          {result}
        </div>
      </div>

      <div>
        <div className="text-[10px] uppercase font-bold text-text-muted mb-1">
          Heard
        </div>
        <div className="text-sm font-medium text-text-primary break-words bg-surface-1/50 p-2 rounded border border-border/50">
          <span
            className={
              normalizedTranscript.includes(normalizedTarget)
                ? "text-emerald-300"
                : "text-amber-200"
            }
          >
            {transcript}
          </span>
        </div>
      </div>
    </div>
  );
};

export const StopGameCard: React.FC<StopGameCardProps> = ({
  item,
  category,
  theme,
  onPlay,
  onPractice,
  onSave,
  isAudioLoading,
  isPracticing,
  isSaved,
  micState,
  transcript,
  feedback,
  onDetailClick,
  isStudyMode = false,
  studyRevealAll = false,
  studyAutoPlay = true,
}) => {
  const [layer, setLayer] = useState(1);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    setIsRevealed(false);
  }, [studyRevealAll]);

  // Determine Logic for Layers
  const isVerbOrAdjective = ["Verbs", "Adjectives"].includes(category);
  const isComplexGrammar = [
    "Phrasal Verbs",
    "Connectors",
    "Emphasis",
    "Collocations",
    "Idioms",
  ].includes(category);
  const isCreative = [
    "Compound Words",
    "Sounds & Noise",
    "Philosophy & Concepts",
    "Slang & Colloquial",
  ].includes(category);

  // Minimal Pairs should strictly have 1 layer (maxLayers = 1) so it doesn't cycle.
  // Creative categories (Slang, Compound, etc.) should have 2 layers (Definition -> Example).
  const maxLayers = isVerbOrAdjective
    ? 2
    : isComplexGrammar && item.definition
      ? 3
      : isCreative && item.example
        ? 2
        : 1;

  const isMinimalPair = category === "Minimal Pairs";
  // Force the "fancy card" layout for Minimal Pairs even though it has 1 layer
  const showCardLayout =
    maxLayers > 1 || (isMinimalPair && item.definition?.includes("vs."));

  const handleToggleLayer = () => {
    if (maxLayers > 1) {
      setLayer((prev) => (prev === maxLayers ? 1 : prev + 1));
    }
  };

  // Metadata Logic
  let flagUrl = null;
  if (category === "Countries") {
    flagUrl = getFlagUrl(item.word);
  } else if (
    ["Cities", "Capitals", "World Landmarks"].includes(category) &&
    item.country
  ) {
    flagUrl = getFlagUrl(item.country);
  }

  const isIrregularVerb = category === "Verbs" && item.tag === "Irregular";
  const irregularVerbData: IrregularVerb | undefined = isIrregularVerb
    ? irregularVerbs.find(
        (v) => v.base.toLowerCase() === item.word.toLowerCase(),
      )
    : undefined;

  const handleCardClick = () => {
    if (isStudyMode && !studyRevealAll && !isRevealed) {
      setIsRevealed(true);
      if (studyAutoPlay) {
        onPlay(item.word);
      }
    } else if (onDetailClick) {
      onDetailClick(item);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (isStudyMode && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          handleCardClick();
        }
      }}
      tabIndex={isStudyMode ? 0 : undefined}
      className={`study-card flex flex-col group bg-surface-1/40 p-2.5 rounded-lg border transition-all hover:bg-surface-2 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary ${theme.glow} ${isPracticing ? "border-primary/50 bg-surface-2" : isSaved ? "border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.1)]" : "border-transparent hover:border-border"} ${onDetailClick || (isStudyMode && !studyRevealAll && !isRevealed) ? "cursor-pointer hover:scale-[1.02]" : ""}`}
    >
      <div className="flex items-center justify-between">
        <div className="min-w-0 pr-2 flex-1">
          {/* Top Row: Flag/Color/Word/Level */}
          <div className="flex items-center gap-2 mb-0.5">
            {flagUrl && (
              <img
                src={flagUrl}
                alt="flag"
                className="w-5 h-auto rounded-sm shadow-sm object-cover"
              />
            )}
            {category === "Colors" && (
              <span
                className="w-3 h-3 rounded-full border border-border/50 shadow-sm flex-shrink-0"
                style={{ backgroundColor: item.hex ?? "transparent" }}
                aria-hidden="true"
              />
            )}
            <p
              className={`font-bold truncate text-lg group-hover:text-text-primary transition-colors ${theme.textClass}`}
            >
              {item.word}
            </p>
            {item.level && (
              <span
                className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wide ${getLevelBadgeColor(item.level)}`}
              >
                {item.level}
              </span>
            )}
            {isIrregularVerb && (
              <span className="text-[9px] font-bold bg-amber-900/40 text-amber-400 px-1.5 py-0.5 rounded border border-amber-600/30 uppercase tracking-wide">
                Irregular
              </span>
            )}

            {/* RESTORED: Tags for Animals, Nature, etc. */}
            {item.tag && !isIrregularVerb && (
              <span className="text-[9px] font-bold bg-surface-3 text-text-muted px-1.5 py-0.5 rounded border border-border uppercase tracking-wide">
                {item.tag}
              </span>
            )}
          </div>

          {/* IPA & Translation */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span className="text-accent font-mono text-xs tracking-wide">
              {item.ipa}
            </span>
            {(item.translation ||
              (isStudyMode && !studyRevealAll && !isRevealed)) && (
              <span
                className={`text-xs italic truncate max-w-full transition-all duration-300 ${isStudyMode && !studyRevealAll && !isRevealed ? "text-text-muted bg-surface-2 border border-border rounded px-2 py-0.5 cursor-pointer hover:bg-surface-3 hover:text-text-primary" : "text-text-muted"}`}
                onClick={(e) => {
                  if (isStudyMode && !studyRevealAll) {
                    e.stopPropagation();
                    const willReveal = !isRevealed;
                    setIsRevealed(willReveal);
                    if (willReveal && studyAutoPlay) {
                      onPlay(item.word);
                    }
                  }
                }}
                title={
                  isStudyMode && !studyRevealAll && !isRevealed
                    ? "Click to reveal details"
                    : ""
                }
              >
                {isStudyMode && !studyRevealAll && !isRevealed
                  ? "Reveal Details"
                  : item.translation
                    ? `• ${item.translation}`
                    : ""}
              </span>
            )}
          </div>

          {/* RESTORED: Rich Metadata Badges */}
          <div className="flex flex-wrap gap-2 mt-1.5">
            {item.country && (
              <span className="text-[10px] text-text-muted flex items-center gap-1 bg-surface-2 px-1.5 py-0.5 rounded border border-border">
                📍 {item.country}
              </span>
            )}
            {item.clothingType && (
              <span className="text-[9px] uppercase font-bold text-pink-300 bg-pink-900/30 px-1.5 py-0.5 rounded">
                {item.clothingType}
              </span>
            )}
            {item.toolType && (
              <span className="text-[9px] uppercase font-bold text-amber-300 bg-amber-900/30 px-1.5 py-0.5 rounded">
                {item.toolType}
              </span>
            )}
            {item.roomType && (
              <span className="text-[9px] uppercase font-bold text-indigo-300 bg-indigo-900/30 px-1.5 py-0.5 rounded">
                {item.roomType}
              </span>
            )}
            {item.location && (
              <span className="text-[9px] uppercase font-bold text-emerald-300 bg-emerald-900/30 px-1.5 py-0.5 rounded">
                Loc: {item.location}
              </span>
            )}
            {item.artist && (
              <span className="text-[10px] text-purple-300">
                🎤 {item.artist}
              </span>
            )}
            {item.genre && (
              <span className="text-[9px] uppercase font-bold text-text-muted border border-border px-1.5 py-0.5 rounded">
                {item.genre}
              </span>
            )}
            {item.director && (
              <span className="text-[10px] text-orange-300">
                🎬 {item.director}
              </span>
            )}
            {item.production && (
              <span className="text-[9px] text-text-muted">
                ({item.production})
              </span>
            )}
          </div>

          {/* Interactive Layers (Definitions/Examples) */}
          {showCardLayout && (!isStudyMode || studyRevealAll || isRevealed) ? (
            <div
              onClick={handleToggleLayer}
              className={`mt-2 p-2 rounded cursor-pointer transition-all duration-300 relative group/layer ${isMinimalPair ? "bg-indigo-900/20 border border-indigo-500/20 cursor-default" : layer === 1 ? "bg-sky-900/20 border border-sky-500/20" : layer === 2 ? "bg-emerald-900/20 border border-emerald-500/20" : "bg-purple-900/20 border border-purple-500/20"}`}
            >
              <div className="flex justify-between items-center mb-1">
                <span
                  className={`text-[9px] uppercase font-bold tracking-widest ${isMinimalPair ? "text-indigo-400" : layer === 1 ? "text-sky-400" : layer === 2 ? "text-emerald-400" : "text-purple-400"}`}
                >
                  {isMinimalPair
                    ? "Listen & Compare"
                    : layer === 1
                      ? category === "Verbs"
                        ? "Conjugations"
                        : "Definition"
                      : layer === 2
                        ? "Example"
                        : "Formal Swap"}
                </span>
                {maxLayers > 1 && (
                  <span className="text-[9px] text-slate-400 opacity-0 group-hover/layer:opacity-100 transition-opacity">
                    Flip ⟳
                  </span>
                )}
              </div>
              <div className="text-xs">
                {(layer === 1 || isMinimalPair) &&
                  (category === "Verbs" ? (
                    isIrregularVerb && irregularVerbData ? (
                      <div className="space-y-2 mt-1">
                        <div className="flex items-center justify-between bg-surface-1/20 p-1.5 rounded">
                          <span className="text-[10px] uppercase font-bold text-text-muted">
                            Past
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-text-primary font-medium">
                              {irregularVerbData.past}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onPlay(irregularVerbData.past.split("/")[0]);
                              }}
                              className="p-1 hover:bg-surface-3 rounded-full text-primary transition-colors"
                              title="Play Past Tense"
                              aria-label={`Listen to past tense: ${irregularVerbData.past}`}
                            >
                              <PlayIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between bg-surface-1/20 p-1.5 rounded">
                          <span className="text-[10px] uppercase font-bold text-text-muted">
                            Participle
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-text-primary font-medium">
                              {irregularVerbData.participle}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onPlay(
                                  irregularVerbData.participle.split("/")[0],
                                );
                              }}
                              className="p-1 hover:bg-surface-3 rounded-full text-primary transition-colors"
                              title="Play Participle"
                              aria-label={`Listen to participle: ${irregularVerbData.participle}`}
                            >
                              <PlayIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-text-primary">
                        {item.definition || "Regular Verb"}
                      </p>
                    )
                  ) : (
                    <div className="space-y-1">
                      {category === "Minimal Pairs" &&
                      item.definition?.includes("vs.") ? (
                        <div className="mt-1">
                          <p className="text-[10px] text-text-muted font-bold uppercase mb-1">
                            Compare vs:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {item.definition
                              .replace("vs.", "")
                              .split("/")
                              .map((pairWord) => {
                                const w = pairWord.trim();
                                return (
                                  <button
                                    key={w}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onPlay(w);
                                    }}
                                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-indigo-500/20 hover:bg-indigo-500/40 border border-indigo-500/30 text-indigo-200 text-xs font-medium transition-all"
                                    aria-label={`Listen to compare: ${w}`}
                                  >
                                    <SpeakerWaveIcon className="h-3 w-3" />
                                    {w}
                                  </button>
                                );
                              })}
                          </div>
                        </div>
                      ) : item.definition ? (
                        <p className="text-text-primary">{item.definition}</p>
                      ) : (
                        <p className="text-text-primary italic">
                          {item.translation}
                        </p>
                      )}
                      {item.synonyms && (
                        <p className="text-primary font-bold text-[10px]">
                          Syn: {item.synonyms.join(", ")}
                        </p>
                      )}
                    </div>
                  ))}
                {!isMinimalPair && layer === 2 && (
                  <p className="text-text-secondary italic">
                    "{item.examSentence || item.example || "..."}"
                  </p>
                )}
                {!isMinimalPair && layer === 3 && (
                  <div className="space-y-1">
                    <p className="text-text-primary">
                      {item.transformation || "No structure shift available."}
                    </p>
                    {item.writingSwap && (
                      <p className="text-[10px] text-accent">
                        Formal: "{item.writingSwap}"
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : item.definition &&
            (!isStudyMode || studyRevealAll || isRevealed) ? (
            <p className="text-xs text-text-muted mt-2 pt-2 border-t border-border/50 italic leading-tight">
              {item.definition}
            </p>
          ) : null}

          {item.wordFamily &&
            (!isStudyMode || studyRevealAll || isRevealed) && (
              <WordFamilyViewer family={item.wordFamily} />
            )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 self-start mt-1">
          <button
            onClick={() => onPlay(item.word)}
            disabled={isAudioLoading}
            className="h-8 w-8 flex items-center justify-center rounded-full bg-surface-3 text-primary hover:bg-primary hover:text-white transition-colors disabled:opacity-50"
            title="Listen"
            aria-label={`Listen to ${item.word}`}
          >
            {isAudioLoading ? <LoadingSpinner /> : <PlayIcon />}
          </button>
          <button
            onClick={() => onPractice()}
            className={`h-8 w-8 flex items-center justify-center rounded-full transition-colors ${
              isPracticing
                ? micState === "listening"
                  ? "bg-red-500 text-white animate-pulse"
                  : "bg-emerald-600 text-white hover:bg-emerald-500"
                : "bg-surface-3 text-accent hover:bg-accent hover:text-white"
            }`}
            title={
              isPracticing
                ? micState === "listening"
                  ? "Stop Listening"
                  : "Close Practice"
                : "Practice Pronunciation"
            }
            aria-label={`Practice pronunciation for ${item.word}`}
          >
            <MicrophoneIcon
              className={`h-5 w-5 ${isPracticing ? "text-white" : "text-slate-400"}`}
            />
          </button>
          <button
            onClick={() =>
              onSave(item.word, item.definition || item.translation)
            }
            disabled={isSaved}
            className={`h-8 w-8 flex items-center justify-center rounded-full transition-colors ${isSaved ? "bg-emerald-900/30 text-emerald-400" : "bg-slate-700 text-emerald-400 hover:bg-emerald-500 hover:text-white"}`}
            title="Save"
            aria-label={
              isSaved
                ? `Already saved ${item.word}`
                : `Save ${item.word} to vault`
            }
          >
            <SaveIcon
              className={`h-5 w-5 ${isSaved ? "text-emerald-400" : "text-slate-400"}`}
            />
          </button>
        </div>
      </div>

      {/* Practice Feedback Area */}
      {isPracticing && (
        <div className="mt-2 pt-2 border-t border-slate-700/50 animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <span
              className={`text-[10px] uppercase font-bold ${micState === "listening" ? "text-sky-400 animate-pulse" : "text-slate-400"}`}
            >
              {micState === "listening"
                ? "Listening..."
                : feedback?.includes("Correct")
                  ? "Good job!"
                  : "Tap mic to retry"}
            </span>

            {micState === "listening" && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPractice();
                }}
                className="text-[10px] text-slate-400 hover:text-white underline font-bold"
              >
                Done
              </button>
            )}
          </div>

          <FeedbackDisplay target={item.word} transcript={transcript} />

          {feedback && (
            <div
              className={`mt-2 p-2 rounded text-center text-sm font-bold border ${feedback.includes("Correct") ? "bg-emerald-900/30 border-emerald-500/30 text-emerald-400" : "bg-amber-900/30 border-amber-500/30 text-amber-400"}`}
            >
              {feedback}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
