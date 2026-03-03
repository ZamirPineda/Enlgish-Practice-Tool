import React, { useState, useMemo, useEffect, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { EnglishLevel, DrillExample, WordPart } from "@/types";
import { drillTopicsByLevel } from "@/features/data/drills";
import { getCategoryStyle } from "@/lib/categoryStyles";
import { getFullTextFromParts } from "@/lib/textUtils";
import ToggleSwitch from "@/components/ToggleSwitch";
import { shuffle } from "@/lib/arrayUtils";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import ViewToolbar from "@/components/ui/ViewToolbar";

import {
  PlayIcon,
  TranslateIcon,
  LoadingSpinner,
  EyeIcon,
  EyeOffIcon,
  ShuffleIcon,
} from "@/components/Icons";

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
        className="group cursor-pointer select-none rounded-lg bg-[var(--color-surface-2)] p-3 border border-[var(--color-border)] border-dashed hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-accent)] transition-all relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)]"
      >
        <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="bg-[var(--color-surface-1)]/80 text-[var(--color-accent)] px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 backdrop-blur-sm">
            <EyeIcon /> Click to Reveal
          </span>
        </div>
        <p
          className="text-lg text-transparent bg-[var(--color-text-muted)]/20 blur-sm font-medium leading-relaxed truncate"
          aria-hidden="true"
        >
          {parts.map((p) => p.word).join(" ")}
        </p>
      </div>
    );
  }

  return (
    <p className="text-lg text-[var(--color-text-primary)] font-medium leading-relaxed">
      {parts
        .map((part, i) =>
          part.category ? (
            <span
              key={i}
              className={`relative group cursor-pointer transition-colors ${getCategoryStyle(part.category)}`}
            >
              {part.word}
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-[var(--color-surface-1)] text-[var(--color-text-primary)] text-xs font-bold rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 border border-[var(--color-border)] shadow-lg">
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
  const [isMobileActionsVisible, setIsMobileActionsVisible] = useState(true);
  const lastScrollTopRef = useRef(0);
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: displayExamples.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 180,
    overscan: 5,
  });

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
            className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
          >
            Select Level:
          </label>
          <select
            id="level-select-empty"
            value={level}
            onChange={(e) => setLevel(e.target.value as EnglishLevel)}
            className="bg-[var(--color-surface-1)] border border-[var(--color-border)] text-[var(--color-text-primary)] text-sm rounded-lg focus:ring-[var(--color-focus)] focus:border-[var(--color-focus)] block w-full p-2.5"
          >
            {Object.values(EnglishLevel).map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
        <div className="bg-[var(--color-surface-1)] p-8 rounded-lg border border-[var(--color-border)]">
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
            No Study Decks Available
          </h2>
          <p className="text-[var(--color-text-secondary)] mt-2">
            There are no study decks for the {level} level yet. Please check
            back later!
          </p>
        </div>
      </div>
    );
  }

  const handleContainerScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const currentScrollTop = event.currentTarget.scrollTop;
    const delta = currentScrollTop - lastScrollTopRef.current;

    if (currentScrollTop < 24) {
      setIsMobileActionsVisible(true);
    } else if (delta > 8) {
      setIsMobileActionsVisible(false);
    } else if (delta < -8) {
      setIsMobileActionsVisible(true);
    }

    lastScrollTopRef.current = currentScrollTop;
  };

  return (
    <div
      ref={parentRef}
      className="flex-1 overflow-y-auto overscroll-y-contain p-4 sm:p-6 lg:p-8 pb-4 sm:pb-8"
      onScroll={handleContainerScroll}
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <ViewToolbar
            left={
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 bg-[var(--color-surface-2)] p-2 rounded-lg border border-[var(--color-border)]">
                  <label
                    htmlFor="level-select"
                    className="text-xs sm:text-sm font-bold text-[var(--color-text-secondary)]"
                  >
                    Level:
                  </label>
                  <select
                    id="level-select"
                    value={level}
                    onChange={(e) => setLevel(e.target.value as EnglishLevel)}
                    className="bg-transparent border-none text-[var(--color-accent)] font-bold text-base sm:text-lg focus:ring-0 cursor-pointer hover:text-[var(--color-accent-hover)] transition-colors py-0 pl-2 pr-8"
                  >
                    {Object.values(EnglishLevel).map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>

                {topicsForLevel.length > 1 && (
                  <div>
                    <label
                      htmlFor="study-topic-select"
                      className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1"
                    >
                      Select Study Topic:
                    </label>
                    <select
                      id="study-topic-select"
                      value={selectedTopicId ?? ""}
                      onChange={(e) => setSelectedTopicId(e.target.value)}
                      className="bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text-primary)] text-sm rounded-lg focus:ring-[var(--color-focus)] focus:border-[var(--color-focus)] block w-full md:min-w-[20rem] p-2.5"
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
            }
            right={
              <>
                {isPracticeMode && (
                  <Button
                    onClick={handleRevealAll}
                    size="md"
                    variant="secondary"
                    className="flex items-center gap-2 min-h-[44px]"
                    title={
                      revealedIndices.size === displayExamples.length
                        ? "Hide All"
                        : "Reveal All"
                    }
                  >
                    <span className="text-sm font-bold">
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
                  className={`flex items-center gap-2 min-h-[44px] ${isAutoPlaying ? "shadow-md bg-sky-600 hover:bg-sky-500" : ""}`}
                  title={isAutoPlaying ? "Stop Auto-Play" : "Start Auto-Play"}
                >
                  {isAutoPlaying ? <PauseIcon /> : <PlayIcon />}
                  <span className="text-sm font-bold">
                    {isAutoPlaying ? "Stop" : "Auto-Play"}
                  </span>
                </Button>

                <Button
                  onClick={() => setIsShuffled(!isShuffled)}
                  size="md"
                  variant={isShuffled ? "primary" : "secondary"}
                  className={`flex items-center gap-2 min-h-[44px] ${isShuffled ? "shadow-md" : ""}`}
                  title="Shuffle Deck"
                >
                  <ShuffleIcon />
                  <span className="text-sm font-bold">Shuffle</span>
                </Button>

                <Card className="p-3 flex items-center gap-3 shadow-sm justify-center rounded-lg min-h-[44px]">
                  <div
                    className={`p-2 rounded-full ${isPracticeMode ? "bg-[var(--color-accent)]/20 text-[var(--color-accent)]" : "bg-[var(--color-surface-2)] text-[var(--color-text-muted)]"}`}
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
              </>
            }
          />
        </div>

        {selectedTopic && (
          <div className="animate-fade-in">
            {isPracticeMode && (
              <div className="mb-6">
                <div className="flex justify-between text-xs font-bold text-text-secondary mb-1">
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
                <div className="w-full bg-surface-1 rounded-full h-2.5">
                  <div
                    className="bg-accent h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  {selectedTopic.name}
                </h1>
                <p className="text-text-secondary max-w-2xl">
                  {selectedTopic.description}
                </p>
              </div>
              {isShuffled && (
                <Badge variant="accent" className="text-xs px-2 py-1">
                  Shuffled
                </Badge>
              )}
            </div>

            <div
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                width: "100%",
                position: "relative",
              }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const index = virtualRow.index;
                const example = displayExamples[index];

                return (
                  <div
                    key={virtualRow.key}
                    data-index={index}
                    ref={rowVirtualizer.measureElement}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                    className="pb-4"
                  >
                    {(() => {
                      // Unique ID for this item pre-calculated to handle shuffle rendering and performance
                      const uniqueKey = example.uniqueKey;
                      const isRevealed = revealedIndices.has(index);

                      // Section Header (Skip if shuffled to avoid confusion)
                      if (
                        example.parts &&
                        example.parts[0].word.startsWith("---")
                      ) {
                        if (isShuffled) return null;
                        const title = example.parts[0].word
                          .replace(/---/g, "")
                          .trim();
                        return (
                          <div key={uniqueKey} className="pt-6 pb-2">
                            <h2 className="text-xl font-semibold text-accent border-b-2 border-accent/20 pb-2">
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
                            <div className="flex flex-col justify-between gap-2 border-b md:border-b-0 md:border-r border-border pb-3 md:pb-0 md:pr-4 h-full">
                              <div className="flex-1">
                                {isFront ? (
                                  <div className="mb-3">
                                    {itemA.translation_es && (
                                      <p className="text-success font-medium text-lg mb-2">
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
                                    <Sentence
                                      parts={itemA.parts}
                                      isHidden={false}
                                    />
                                    <p className="text-cyan-600 dark:text-cyan-300 font-mono text-sm tracking-wider mt-1">
                                      {itemA.ipa}
                                    </p>
                                    {itemA.translation_es && (
                                      <p className="text-text-secondary text-sm mt-1 italic">
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
                                  className={`h-9 w-9 flex items-center justify-center rounded-full transition-colors disabled:opacity-50 ${isFront ? "bg-accent text-white hover:bg-accent-hover" : "bg-surface-2 text-text-secondary hover:bg-accent hover:text-white"}`}
                                  aria-label={`Listen to "${textA}"`}
                                >
                                  {isWordAudioLoading === textA ? (
                                    <LoadingSpinner />
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
                                      <p className="text-success font-medium text-lg mb-2">
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
                                    <Sentence
                                      parts={itemB.parts}
                                      isHidden={false}
                                    />
                                    <p className="text-cyan-600 dark:text-cyan-300 font-mono text-sm tracking-wider mt-1">
                                      {itemB.ipa}
                                    </p>
                                    {itemB.translation_es && (
                                      <p className="text-text-secondary text-sm mt-1 italic">
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
                                  className={`h-9 w-9 flex items-center justify-center rounded-full transition-colors disabled:opacity-50 ${isFront ? "bg-accent text-white hover:bg-accent-hover" : "bg-surface-2 text-text-secondary hover:bg-accent hover:text-white"}`}
                                  aria-label={`Listen to "${textB}"`}
                                >
                                  {isWordAudioLoading === textB ? (
                                    <LoadingSpinner />
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
                                className={`col-start-1 row-start-1 w-full h-full [backface-visibility:hidden] p-4 rounded-lg border transition-all duration-300 cursor-pointer ${autoPlayIndex === index ? "ring-2 ring-focus bg-surface-2" : "bg-surface-1 border-accent/30 ring-1 ring-accent/20 hover:bg-surface-hover"}`}
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
                                className={`col-start-1 row-start-1 w-full h-full [backface-visibility:hidden] [transform:rotateX(180deg)] p-4 rounded-lg border transition-all duration-300 ${autoPlayIndex === index ? "ring-2 ring-focus bg-surface-2" : "bg-surface-1 border-border"}`}
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
                                    <p className="text-success font-semibold text-xl mb-3">
                                      {example.translation_es}
                                    </p>
                                  )}
                                  {example.definition &&
                                    !example.translation_es && (
                                      <p className="text-amber-500 dark:text-yellow-300 text-lg mb-3 italic">
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
                                  <Sentence
                                    parts={example.parts}
                                    isHidden={false}
                                  />
                                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 items-baseline">
                                    <p className="text-cyan-600 dark:text-cyan-300 font-mono text-sm tracking-wider">
                                      {example.ipa}
                                    </p>
                                    {example.translation_es && (
                                      <p className="text-text-secondary text-sm italic">
                                        {example.translation_es}
                                      </p>
                                    )}
                                  </div>
                                  {example.definition && (
                                    <div className="mt-2 pt-2 border-t border-border">
                                      <p className="text-sm text-amber-600 dark:text-yellow-300/90">
                                        <span className="font-semibold text-amber-700 dark:text-yellow-200">
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
                                      example.translation_es ||
                                        example.definition,
                                    );
                                  }}
                                  className={`h-10 w-10 flex items-center justify-center rounded-full transition-colors ${isSaved ? "text-success bg-success/20" : "text-text-secondary hover:text-white hover:bg-surface-hover"}`}
                                  title={
                                    isSaved
                                      ? "Saved to Vault"
                                      : "Save to Vocabulary Vault"
                                  }
                                  aria-label={
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
                                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-surface-2 text-text-secondary cursor-help">
                                      <TranslateIcon />
                                    </div>
                                    <div className="absolute bottom-full right-0 mb-2 w-max max-w-xs px-3 py-1.5 bg-surface-1 text-text-primary text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 border border-border shadow-lg">
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
                                                          ? "bg-accent text-white hover:bg-accent-hover shadow-lg shadow-accent/20"
                                                          : "bg-surface-2 text-text-secondary hover:bg-accent hover:text-white"
                                                      }
                                                  `}
                                aria-label={`Listen to "${fullText}"`}
                                title={isFront ? "Listen for a hint" : "Listen"}
                              >
                                {isWordAudioLoading === fullText ? (
                                  <LoadingSpinner />
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
                                className={`col-start-1 row-start-1 w-full h-full [backface-visibility:hidden] p-4 rounded-lg border transition-all duration-300 cursor-pointer ${autoPlayIndex === index ? "ring-2 ring-[var(--color-focus)] bg-[var(--color-surface-2)]" : "bg-[var(--color-surface-1)] border-[var(--color-accent)]/30 ring-1 ring-[var(--color-accent)]/20 hover:bg-[var(--color-surface-hover)]"}`}
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
                                className={`col-start-1 row-start-1 w-full h-full [backface-visibility:hidden] [transform:rotateX(180deg)] p-4 rounded-lg border transition-all duration-300 ${autoPlayIndex === index ? "ring-2 ring-[var(--color-focus)] bg-[var(--color-surface-2)]" : "bg-[var(--color-surface-1)] border-[var(--color-border)]"}`}
                              >
                                {renderCardContent(false)}
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })()}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div
          className={`md:hidden fixed left-3 right-3 bottom-[calc(env(safe-area-inset-bottom)+5.25rem)] z-40 transition-all duration-200 ${isMobileActionsVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0 pointer-events-none"}`}
        >
          <div className="bg-surface-1/95 backdrop-blur border border-border rounded-xl p-2 shadow-xl flex gap-2">
            <Button
              onClick={toggleAutoPlay}
              size="md"
              variant={isAutoPlaying ? "primary" : "secondary"}
              className="flex-1"
            >
              {isAutoPlaying ? "Stop" : "Auto-Play"}
            </Button>
            <Button
              onClick={() => togglePracticeMode(!isPracticeMode)}
              size="md"
              variant={isPracticeMode ? "primary" : "secondary"}
              className="flex-1"
            >
              {isPracticeMode ? "Practice On" : "Practice Off"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyDeckView;
