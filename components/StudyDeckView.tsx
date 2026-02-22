import React, { useState, useMemo, useEffect } from "react";
import { EnglishLevel, DrillExample, WordPart } from "../types";
import { drillTopicsByLevel } from "../data/drills";
import { getCategoryStyle } from "../utils/categoryStyles";
import { getFullTextFromParts } from "../utils/textUtils";
import ToggleSwitch from "./ToggleSwitch";
import { shuffle } from "../utils/arrayUtils";
import Button from "./ui/Button";
import Card from "./ui/Card";
import Badge from "./ui/Badge";

const PlayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
      clipRule="evenodd"
    />
  </svg>
);

const TranslateIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.152 2.335 1 1 0 11-1.74-.928A20.875 20.875 0 008.422 6H8a1 1 0 01-1-1V4a1 1 0 011-1zm3 0a1 1 0 011 1v1h.5a1 1 0 110 2H11v1.132a4.243 4.243 0 01.95 2.197 1 1 0 11-1.9.448A2.25 2.25 0 0011 8.868V8h-.5a1 1 0 01-1-1V4a1 1 0 011-1zm-1 8a1 1 0 011 1v5.236A1 1 0 1110 18v-5.236a1 1 0 011-1zm-2-2a1 1 0 00-1 1v.764a1 1 0 11-2 0V11a1 1 0 00-1-1H3a1 1 0 000 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2H7zM3 3a1 1 0 000 2h1a1 1 0 100-2H3zm12.586 6.586a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L16.172 13H14a1 1 0 110-2h2.172l-1.586-1.586a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

const WordAudioSpinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
    <path
      fillRule="evenodd"
      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
      clipRule="evenodd"
    />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
      clipRule="evenodd"
    />
    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.742L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.064 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
  </svg>
);

const ShuffleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>
);

const BookmarkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-emerald-400"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const PauseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

interface StudyDeckViewProps {
  onPlayWord: (word: string) => void;
  isWordAudioLoading: string | null;
  onAddToVault: (word: string, definition: string) => void;
}

interface DisplayExample extends DrillExample {
  uniqueKey: string;
  fullText?: string;
  textA?: string;
  textB?: string;
}

const Sentence = ({
  parts,
  isHidden,
  onReveal,
}: {
  parts: WordPart[];
  isHidden: boolean;
  onReveal?: () => void;
}) => {
  if (isHidden) {
    return (
      <div
        onClick={onReveal}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (onReveal) onReveal();
          }
        }}
        tabIndex={0}
        role="button"
        className="group cursor-pointer select-none rounded-lg bg-slate-700/50 p-3 border border-slate-600 border-dashed hover:bg-slate-700 hover:border-sky-500 transition-all relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-sky-500"
      >
        <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="bg-slate-900/80 text-sky-400 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
            <EyeIcon /> Click to Reveal
          </span>
        </div>
        <p
          className="text-lg text-transparent bg-slate-600/20 blur-sm font-medium leading-relaxed truncate"
          aria-hidden="true"
        >
          {parts.map((p) => p.word).join(" ")}
        </p>
      </div>
    );
  }

  return (
    <p className="text-lg text-white font-medium leading-relaxed">
      {parts
        .map((part, i) =>
          part.category ? (
            <span
              key={i}
              className={`relative group cursor-pointer transition-colors ${getCategoryStyle(part.category)}`}
            >
              {part.word}
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-slate-900 text-white text-xs font-bold rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 border border-slate-600 shadow-lg">
                {part.category}
              </span>
            </span>
          ) : (
            <span key={i}>{part.word}</span>
          ),
        )
        .reduce((prev, curr) => (
          <>
            {prev} {curr}
          </>
        ))}
    </p>
  );
};

const StudyDeckView: React.FC<StudyDeckViewProps> = ({
  onPlayWord,
  isWordAudioLoading,
  onAddToVault,
}) => {
  const [level, setLevel] = useState<EnglishLevel>(EnglishLevel.B1);
  const topicsForLevel = useMemo(
    () => drillTopicsByLevel[level] || [],
    [level],
  );
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(
    topicsForLevel.length > 0 ? topicsForLevel[0].id : null,
  );
  const [isPracticeMode, setIsPracticeMode] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(
    new Set(),
  );
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set());

  // Handling Shuffle
  const [isShuffled, setIsShuffled] = useState(false);
  const [displayExamples, setDisplayExamples] = useState<DisplayExample[]>([]);

  // Auto-Play State
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [autoPlayIndex, setAutoPlayIndex] = useState(-1);

  // Reset state when topic or level changes
  useEffect(() => {
    if (topicsForLevel.length > 0) {
      setSelectedTopicId(topicsForLevel[0].id);
    } else {
      setSelectedTopicId(null);
    }
    setRevealedIndices(new Set());
    setSavedItems(new Set());
    setIsShuffled(false);
    setIsAutoPlaying(false);
    setAutoPlayIndex(-1);
  }, [topicsForLevel]);

  const selectedTopic = useMemo(() => {
    return topicsForLevel.find((t) => t.id === selectedTopicId);
  }, [topicsForLevel, selectedTopicId]);

  // Update display items when topic or shuffle changes
  useEffect(() => {
    if (selectedTopic) {
      let examples: DisplayExample[] = selectedTopic.examples.map(
        (example, index) => {
          const precalculated: DisplayExample = { ...example, uniqueKey: "" };
          if (example.parts) {
            precalculated.fullText = getFullTextFromParts(example.parts);
            precalculated.uniqueKey = `ex-${index}-${precalculated.fullText}`;
          } else if (example.comparison) {
            precalculated.textA = getFullTextFromParts(
              example.comparison[0].parts,
            );
            precalculated.textB = getFullTextFromParts(
              example.comparison[1].parts,
            );
            precalculated.uniqueKey = `ex-${index}-${precalculated.textA}-${precalculated.textB}`;
          } else {
            precalculated.uniqueKey = `ex-${index}`;
          }
          return precalculated;
        },
      );

      if (isShuffled) {
        // Simple Fisher-Yates shuffle
        for (let i = examples.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [examples[i], examples[j]] = [examples[j], examples[i]];
        }
      }
      setDisplayExamples(examples);
      setIsAutoPlaying(false);
      setAutoPlayIndex(-1);
    }
  }, [selectedTopic, isShuffled]);

  const handleReveal = (index: number) => {
    const newRevealed = new Set(revealedIndices);
    newRevealed.add(index);
    setRevealedIndices(newRevealed);
  };

  const handleRevealAll = () => {
    if (revealedIndices.size === displayExamples.length) {
      setRevealedIndices(new Set());
    } else {
      setRevealedIndices(new Set(displayExamples.map((_, i) => i)));
    }
  };

  const togglePracticeMode = (enabled: boolean) => {
    setIsPracticeMode(enabled);
    if (!enabled) {
      setRevealedIndices(new Set()); // Reset reveals when turning off
    }
    setIsAutoPlaying(false);
    setAutoPlayIndex(-1);
  };

  const handleSave = (phrase: string, translation: string | undefined) => {
    onAddToVault(phrase, translation || "Phrase from Study Deck");
    setSavedItems((prev) => new Set(prev).add(phrase));
  };

  // Auto-Play Logic
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isAutoPlaying && autoPlayIndex < displayExamples.length) {
      const currentExample = displayExamples[autoPlayIndex];

      // Skip headers
      if (
        currentExample?.parts &&
        currentExample.parts[0].word.startsWith("---")
      ) {
        setAutoPlayIndex((prev) => prev + 1);
        return;
      }

      // Play audio if not currently loading
      if (!isWordAudioLoading) {
        if (currentExample?.fullText) {
          onPlayWord(currentExample.fullText);
        } else if (currentExample?.textA) {
          onPlayWord(currentExample.textA);
        }

        // Reveal if in practice mode
        if (isPracticeMode && !revealedIndices.has(autoPlayIndex)) {
          handleReveal(autoPlayIndex);
        }

        // Move to next after a delay (approximate audio length + pause)
        timeoutId = setTimeout(() => {
          if (autoPlayIndex < displayExamples.length - 1) {
            setAutoPlayIndex((prev) => prev + 1);
          } else {
            setIsAutoPlaying(false);
            setAutoPlayIndex(-1);
          }
        }, 4000); // 4 seconds per phrase
      }
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [
    isAutoPlaying,
    autoPlayIndex,
    displayExamples,
    isWordAudioLoading,
    isPracticeMode,
  ]);

  const toggleAutoPlay = () => {
    if (isAutoPlaying) {
      setIsAutoPlaying(false);
    } else {
      setIsAutoPlaying(true);
      setAutoPlayIndex(0);
      if (isPracticeMode) {
        setRevealedIndices(new Set());
      }
    }
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't interfere if user is typing in an input
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      )
        return;

      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const cards = Array.from(
          document.querySelectorAll(".study-item-card"),
        ) as HTMLElement[];
        if (cards.length > 0) {
          const currentIndex = cards.findIndex(
            (card) =>
              card === document.activeElement ||
              card.contains(document.activeElement),
          );

          if (e.key === "ArrowDown") {
            const nextIndex =
              currentIndex >= 0 && currentIndex < cards.length - 1
                ? currentIndex + 1
                : 0;
            cards[nextIndex].focus();
            cards[nextIndex].scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          } else if (e.key === "ArrowUp") {
            const prevIndex =
              currentIndex > 0 ? currentIndex - 1 : cards.length - 1;
            cards[prevIndex].focus();
            cards[prevIndex].scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Progress Calculation
  const progressPercentage =
    displayExamples.length > 0
      ? Math.round(
          (revealedIndices.size /
            displayExamples.filter(
              (e) => !(e.parts && e.parts[0].word.startsWith("---")),
            ).length) *
            100,
        )
      : 0;

  // If no topics, show empty state (omitted code for brevity if not changed, but I need to include it if I'm replacing the whole component or block)
  // Actually, I am replacing the Props and the beginning of the component.

  // ... (helper functions are fine)

  if (topicsForLevel.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
        <div className="mb-6">
          <label
            htmlFor="level-select-empty"
            className="block text-sm font-medium text-slate-300 mb-2"
          >
            Select Level:
          </label>
          <select
            id="level-select-empty"
            value={level}
            onChange={(e) => setLevel(e.target.value as EnglishLevel)}
            className="bg-slate-700 border border-slate-600 text-white text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
          >
            {Object.values(EnglishLevel).map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
        <div className="bg-slate-800 p-8 rounded-lg">
          <h2 className="text-xl font-semibold text-slate-300">
            No Study Decks Available
          </h2>
          <p className="text-slate-400 mt-2">
            There are no study decks for the {level} level yet. Please check
            back later!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Level Select */}
        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2 bg-slate-800 p-2 rounded-lg border border-slate-700">
            <label
              htmlFor="level-select"
              className="text-sm font-bold text-slate-400"
            >
              Level:
            </label>
            <select
              id="level-select"
              value={level}
              onChange={(e) => setLevel(e.target.value as EnglishLevel)}
              className="bg-slate-700 border-none text-sky-400 font-bold text-lg focus:ring-0 cursor-pointer hover:text-sky-300 transition-colors py-0 pl-2 pr-8"
            >
              {Object.values(EnglishLevel).map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
          <div className="w-full md:w-auto flex-1">
            {topicsForLevel.length > 1 && (
              <div className="mb-2">
                <label
                  htmlFor="study-topic-select"
                  className="block text-sm font-medium text-slate-300 mb-1"
                >
                  Select Study Topic:
                </label>
                <select
                  id="study-topic-select"
                  value={selectedTopicId ?? ""}
                  onChange={(e) => setSelectedTopicId(e.target.value)}
                  className="bg-slate-700 border border-slate-600 text-white text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
                >
                  {topicsForLevel.map((topic) => (
                    <option key={topic.id} value={topic.id}>
                      {topic.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            {isPracticeMode && (
              <Button
                onClick={handleRevealAll}
                size="md"
                variant="secondary"
                className="flex items-center gap-2"
                title={
                  revealedIndices.size === displayExamples.length
                    ? "Hide All"
                    : "Reveal All"
                }
              >
                <span className="text-sm font-bold hidden sm:inline">
                  {revealedIndices.size === displayExamples.length
                    ? "Hide All"
                    : "Reveal All"}
                </span>
              </Button>
            )}

            <Button
              onClick={toggleAutoPlay}
              size="md"
              variant={isAutoPlaying ? "primary" : "secondary"}
              className={`flex items-center gap-2 ${isAutoPlaying ? "shadow-md bg-sky-600 hover:bg-sky-500" : ""}`}
              title={isAutoPlaying ? "Stop Auto-Play" : "Start Auto-Play"}
            >
              {isAutoPlaying ? <PauseIcon /> : <PlayIcon />}
              <span className="text-sm font-bold hidden sm:inline">
                {isAutoPlaying ? "Stop" : "Auto-Play"}
              </span>
            </Button>

            <Button
              onClick={() => setIsShuffled(!isShuffled)}
              size="md"
              variant={isShuffled ? "primary" : "secondary"}
              className={`flex items-center gap-2 ${isShuffled ? "shadow-md" : ""}`}
              title="Shuffle Deck"
            >
              <ShuffleIcon />
              <span className="text-sm font-bold hidden sm:inline">
                Shuffle
              </span>
            </Button>

            <Card className="p-3 flex items-center gap-3 shadow-sm flex-1 md:flex-initial justify-center rounded-lg">
              <div
                className={`p-2 rounded-full ${isPracticeMode ? "bg-sky-500/20 text-sky-400" : "bg-slate-700 text-slate-400"}`}
              >
                {isPracticeMode ? <EyeOffIcon /> : <EyeIcon />}
              </div>
              <div>
                <ToggleSwitch
                  label="Practice Mode"
                  checked={isPracticeMode}
                  onChange={togglePracticeMode}
                />
              </div>
            </Card>
          </div>
        </div>

        {selectedTopic && (
          <div className="animate-fade-in">
            {isPracticeMode && (
              <div className="mb-6">
                <div className="flex justify-between text-xs font-bold text-slate-400 mb-1">
                  <span>Progress</span>
                  <span>
                    {revealedIndices.size} /{" "}
                    {
                      displayExamples.filter(
                        (e) => !(e.parts && e.parts[0].word.startsWith("---")),
                      ).length
                    }
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2.5">
                  <div
                    className="bg-sky-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {selectedTopic.name}
                </h1>
                <p className="text-slate-400 max-w-2xl">
                  {selectedTopic.description}
                </p>
              </div>
              {isShuffled && (
                <Badge variant="accent" className="text-xs px-2 py-1">
                  Shuffled
                </Badge>
              )}
            </div>

            <div className="space-y-4">
              {displayExamples.map((example, index) => {
                // Unique ID for this item pre-calculated to handle shuffle rendering and performance
                const uniqueKey = example.uniqueKey;
                const isRevealed = revealedIndices.has(index);

                // Section Header (Skip if shuffled to avoid confusion)
                if (example.parts && example.parts[0].word.startsWith("---")) {
                  if (isShuffled) return null;
                  const title = example.parts[0].word
                    .replace(/---/g, "")
                    .trim();
                  return (
                    <div key={uniqueKey} className="pt-6 pb-2">
                      <h2 className="text-xl font-semibold text-sky-300 border-b-2 border-sky-300/20 pb-2">
                        {title}
                      </h2>
                    </div>
                  );
                }

                // Minimal Pair Card
                if (example.comparison) {
                  const [itemA, itemB] = example.comparison;
                  const textA = example.textA || "";
                  const textB = example.textB || "";

                  const renderMinimalPairContent = (isFront: boolean) => (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 h-full">
                      {/* Item A */}
                      <div className="flex flex-col justify-between gap-2 border-b md:border-b-0 md:border-r border-slate-700 pb-3 md:pb-0 md:pr-4 h-full">
                        <div className="flex-1">
                          {isFront ? (
                            <div className="mb-3">
                              {itemA.translation_es && (
                                <p className="text-emerald-400 font-medium text-lg mb-2">
                                  {itemA.translation_es}
                                </p>
                              )}
                              <Sentence
                                parts={itemA.parts}
                                isHidden={true}
                                onReveal={() => handleReveal(index)}
                              />
                            </div>
                          ) : (
                            <>
                              <Sentence parts={itemA.parts} isHidden={false} />
                              <p className="text-cyan-300 font-mono text-sm tracking-wider mt-1">
                                {itemA.ipa}
                              </p>
                              {itemA.translation_es && (
                                <p className="text-slate-400 text-sm mt-1 italic">
                                  {itemA.translation_es}
                                </p>
                              )}
                            </>
                          )}
                        </div>
                        <div className="flex justify-end mt-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onPlayWord(textA);
                            }}
                            disabled={!!isWordAudioLoading}
                            className={`h-9 w-9 flex items-center justify-center rounded-full transition-colors disabled:opacity-50 ${isFront ? "bg-sky-600 text-white hover:bg-sky-500" : "bg-slate-700 text-slate-300 hover:bg-sky-500 hover:text-white"}`}
                            aria-label={`Listen to "${textA}"`}
                          >
                            {isWordAudioLoading === textA ? (
                              <WordAudioSpinner />
                            ) : (
                              <PlayIcon />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Item B */}
                      <div className="flex flex-col justify-between gap-2 h-full">
                        <div className="flex-1">
                          {isFront ? (
                            <div className="mb-3">
                              {itemB.translation_es && (
                                <p className="text-emerald-400 font-medium text-lg mb-2">
                                  {itemB.translation_es}
                                </p>
                              )}
                              <Sentence
                                parts={itemB.parts}
                                isHidden={true}
                                onReveal={() => handleReveal(index)}
                              />
                            </div>
                          ) : (
                            <>
                              <Sentence parts={itemB.parts} isHidden={false} />
                              <p className="text-cyan-300 font-mono text-sm tracking-wider mt-1">
                                {itemB.ipa}
                              </p>
                              {itemB.translation_es && (
                                <p className="text-slate-400 text-sm mt-1 italic">
                                  {itemB.translation_es}
                                </p>
                              )}
                            </>
                          )}
                        </div>
                        <div className="flex justify-end mt-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onPlayWord(textB);
                            }}
                            disabled={!!isWordAudioLoading}
                            className={`h-9 w-9 flex items-center justify-center rounded-full transition-colors disabled:opacity-50 ${isFront ? "bg-sky-600 text-white hover:bg-sky-500" : "bg-slate-700 text-slate-300 hover:bg-sky-500 hover:text-white"}`}
                          >
                            {isWordAudioLoading === textB ? (
                              <WordAudioSpinner />
                            ) : (
                              <PlayIcon />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );

                  const isFlipped = !isPracticeMode || isRevealed;

                  return (
                    <div
                      key={uniqueKey}
                      className="study-item-card group perspective-[1000px] w-full focus:outline-none"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          if (isPracticeMode && !isRevealed) {
                            handleReveal(index);
                          } else {
                            onPlayWord(textA);
                          }
                        }
                      }}
                    >
                      <div
                        className={`relative w-full grid transition-transform duration-500 [transform-style:preserve-3d] ${isFlipped ? "[transform:rotateX(180deg)]" : ""}`}
                      >
                        {/* Front (Hidden State) */}
                        <div
                          className={`col-start-1 row-start-1 w-full h-full [backface-visibility:hidden] p-4 rounded-lg border transition-all duration-300 cursor-pointer ${autoPlayIndex === index ? "ring-2 ring-sky-500 bg-slate-800/80" : "bg-slate-800/50 border-sky-500/30 ring-1 ring-sky-500/20 hover:bg-slate-800/70"}`}
                          onClick={() => {
                            if (isPracticeMode && !isRevealed) {
                              handleReveal(index);
                            }
                          }}
                        >
                          {renderMinimalPairContent(true)}
                        </div>

                        {/* Back (Revealed State) */}
                        <div
                          className={`col-start-1 row-start-1 w-full h-full [backface-visibility:hidden] [transform:rotateX(180deg)] p-4 rounded-lg border transition-all duration-300 ${autoPlayIndex === index ? "ring-2 ring-sky-500 bg-slate-800/80" : "bg-slate-800 border-slate-700/50"}`}
                        >
                          {renderMinimalPairContent(false)}
                        </div>
                      </div>
                    </div>
                  );
                }

                // Standard Card
                if (example.parts) {
                  const fullText = example.fullText || "";
                  const isSaved = savedItems.has(fullText);

                  const renderCardContent = (isFront: boolean) => (
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 h-full">
                      <div className="flex-1 order-2 sm:order-1">
                        {isFront ? (
                          <div>
                            {example.translation_es && (
                              <p className="text-emerald-400 font-semibold text-xl mb-3">
                                {example.translation_es}
                              </p>
                            )}
                            {example.definition && !example.translation_es && (
                              <p className="text-yellow-300 text-lg mb-3 italic">
                                "{example.definition}"
                              </p>
                            )}
                            <Sentence
                              parts={example.parts}
                              isHidden={true}
                              onReveal={() => handleReveal(index)}
                            />
                          </div>
                        ) : (
                          <div>
                            <Sentence parts={example.parts} isHidden={false} />
                            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 items-baseline">
                              <p className="text-cyan-300 font-mono text-sm tracking-wider">
                                {example.ipa}
                              </p>
                              {example.translation_es && (
                                <p className="text-slate-400 text-sm italic">
                                  {example.translation_es}
                                </p>
                              )}
                            </div>
                            {example.definition && (
                              <div className="mt-2 pt-2 border-t border-slate-700/50">
                                <p className="text-sm text-yellow-300/90">
                                  <span className="font-semibold text-yellow-200">
                                    Meaning:
                                  </span>{" "}
                                  {example.definition}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 order-1 sm:order-2 self-end sm:self-start">
                        {!isFront && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSave(
                                fullText,
                                example.translation_es || example.definition,
                              );
                            }}
                            className={`h-10 w-10 flex items-center justify-center rounded-full transition-colors ${isSaved ? "text-emerald-400 bg-emerald-900/20" : "text-slate-500 hover:text-white hover:bg-slate-700"}`}
                            title={
                              isSaved
                                ? "Saved to Vault"
                                : "Save to Vocabulary Vault"
                            }
                            disabled={isSaved}
                          >
                            {isSaved ? <CheckIcon /> : <BookmarkIcon />}
                          </button>
                        )}

                        {!isPracticeMode &&
                          !isFront &&
                          example.translation_es && (
                            <div className="relative group hidden sm:block">
                              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-700/50 text-slate-300 cursor-help">
                                <TranslateIcon />
                              </div>
                              <div className="absolute bottom-full right-0 mb-2 w-max max-w-xs px-3 py-1.5 bg-slate-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 border border-slate-600 shadow-lg">
                                {example.translation_es}
                              </div>
                            </div>
                          )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onPlayWord(fullText);
                          }}
                          disabled={!!isWordAudioLoading}
                          className={`h-10 w-10 flex items-center justify-center rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                                                      ${
                                                        isFront
                                                          ? "bg-sky-600 text-white hover:bg-sky-500 shadow-lg shadow-sky-500/20"
                                                          : "bg-slate-700/50 text-slate-300 hover:bg-sky-500 hover:text-white"
                                                      }
                                                  `}
                          aria-label={`Listen to "${fullText}"`}
                          title={isFront ? "Listen for a hint" : "Listen"}
                        >
                          {isWordAudioLoading === fullText ? (
                            <WordAudioSpinner />
                          ) : (
                            <PlayIcon />
                          )}
                        </button>
                      </div>
                    </div>
                  );

                  const isFlipped = !isPracticeMode || isRevealed;

                  return (
                    <div
                      key={uniqueKey}
                      className="study-item-card group perspective-[1000px] w-full focus:outline-none"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          if (isPracticeMode && !isRevealed) {
                            handleReveal(index);
                          } else {
                            onPlayWord(fullText);
                          }
                        }
                      }}
                    >
                      <div
                        className={`relative w-full grid transition-transform duration-500 [transform-style:preserve-3d] ${isFlipped ? "[transform:rotateX(180deg)]" : ""}`}
                      >
                        {/* Front (Hidden State) */}
                        <div
                          className={`col-start-1 row-start-1 w-full h-full [backface-visibility:hidden] p-4 rounded-lg border transition-all duration-300 cursor-pointer ${autoPlayIndex === index ? "ring-2 ring-sky-500 bg-slate-800/80" : "bg-slate-800/50 border-sky-500/30 ring-1 ring-sky-500/20 hover:bg-slate-800/70"}`}
                          onClick={() => {
                            if (isPracticeMode && !isRevealed) {
                              handleReveal(index);
                            }
                          }}
                        >
                          {renderCardContent(true)}
                        </div>

                        {/* Back (Revealed State) */}
                        <div
                          className={`col-start-1 row-start-1 w-full h-full [backface-visibility:hidden] [transform:rotateX(180deg)] p-4 rounded-lg border transition-all duration-300 ${autoPlayIndex === index ? "ring-2 ring-sky-500 bg-slate-800/80" : "bg-slate-800 border-slate-700/50"}`}
                        >
                          {renderCardContent(false)}
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyDeckView;
