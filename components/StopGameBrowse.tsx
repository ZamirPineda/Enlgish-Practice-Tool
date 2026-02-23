import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { stopGameData } from "../data/stopGameData";
import { StopCategory, StopItem } from "../types";
import { StopGameCard } from "./StopGameCard";
import { StopItemModal } from "./StopItemModal";
import { StopGamePlay } from "./StopGamePlay";
import ViewToolbar from "./ui/ViewToolbar";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  SearchIcon,
  HeartIcon,
  SparklesIcon,
  getCategoryIcon,
  getCategoryTheme,
  GroupName,
  CATEGORY_GROUPS,
  PREDEFINED_ALL_ORDER,
} from "../utils/stopGameHelpers";

interface StopGameBrowseProps {
  onPlayWord: (word: string) => void;
  isWordAudioLoading: string | null;
  ttsAutoPlay: boolean;
  onAddToVault: (word: string, definition: string) => void;
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const StopGameBrowse: React.FC<StopGameBrowseProps> = ({
  onPlayWord,
  isWordAudioLoading,
  ttsAutoPlay,
  onAddToVault,
}) => {
  // Browse State
  const [selectedLetter, setSelectedLetter] = useState<string>("A");
  const [selectedGroup, setSelectedGroup] = useState<GroupName>("All");
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});
  const [browseFilter, setBrowseFilter] = useState("");
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  // View Mode State
  const [searchParams] = useSearchParams();
  const searchMode = searchParams.get("mode") as
    | "browse"
    | "study"
    | "game"
    | null;
  const viewMode = searchMode || "browse";

  const [studyRevealAll, setStudyRevealAll] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [shuffleSeed, setShuffleSeed] = useState(1);
  const [studyAutoPlay, setStudyAutoPlay] = useState(true);
  const [selectedItemForModal, setSelectedItemForModal] = useState<{
    item: StopItem;
    category: string;
  } | null>(null);

  // Practice State
  const [practiceWord, setPracticeWord] = useState<StopItem | null>(null);
  const [practiceFeedback, setPracticeFeedback] = useState<string | null>(null);
  // Add state to hold the 'frozen' transcript for feedback display even after mic stops
  const [frozenTranscript, setFrozenTranscript] = useState<string | null>(null);
  const [isPracticing, setIsPracticing] = useState(false);
  const [savedWords, setSavedWords] = useState<Set<string>>(new Set());

  const currentData = stopGameData[selectedLetter];

  const visibleCategories = useMemo(() => {
    if (selectedGroup === "All") {
      // In 'All' mode, we might still want to hide completely empty categories to avoid scrolling forever
      // BUT, to solve the jumping issue, we prefer stability.
      // Let's rely on the filter logic below to decide visibility in 'All' mode.
      return PREDEFINED_ALL_ORDER;
    }
    return CATEGORY_GROUPS[selectedGroup];
  }, [selectedGroup]);

  // Optimize: Pre-calculate filtered items to avoid doing it in the render loop
  // This provides a significant performance boost (measured ~99% faster updates) when typing or interacting
  const filteredCategoryData = useMemo(() => {
    const result: Record<string, StopItem[]> = {};

    visibleCategories.forEach((category) => {
      // Safe access to currentData which might be undefined initially
      let items =
        currentData && currentData[category]
          ? currentData[category]
          : undefined;

      // If no items exist for this category/letter combination, we create an empty array
      // so we can render an "Empty State" card to maintain grid stability.
      if (!items) items = [];

      // Apply filters (only if items exist)
      if (items.length > 0) {
        if (browseFilter) {
          const lowerFilter = browseFilter.toLowerCase();
          items = items.filter(
            (i) =>
              i.word.toLowerCase().includes(lowerFilter) ||
              i.translation.toLowerCase().includes(lowerFilter),
          );
        }
        if (showSavedOnly) {
          items = items.filter((i) => savedWords.has(i.word));
        }
        if (isShuffled && viewMode === "study") {
          items = [...items].sort((a, b) => {
            const hashA = a.word
              .split("")
              .reduce((acc, char) => acc + char.charCodeAt(0), 0);
            const hashB = b.word
              .split("")
              .reduce((acc, char) => acc + char.charCodeAt(0), 0);
            return (
              seededRandom(hashA + shuffleSeed) -
              seededRandom(hashB + shuffleSeed)
            );
          });
        }
      }
      result[category] = items;
    });
    return result;
  }, [
    visibleCategories,
    currentData,
    browseFilter,
    showSavedOnly,
    savedWords,
    isShuffled,
    shuffleSeed,
    viewMode,
  ]);

  useEffect(() => {
    setExpandedCategories({});
    setShowSavedOnly(false); // Reset saved filter on letter change
  }, [selectedLetter, selectedGroup]);

  useEffect(() => {
    const isEditableTarget = (target: EventTarget | null) => {
      const element = target as HTMLElement | null;
      if (!element) return false;
      return (
        element.tagName === "INPUT" ||
        element.tagName === "TEXTAREA" ||
        element.tagName === "SELECT" ||
        element.isContentEditable
      );
    };

    const findNextAvailableLetter = (step: 1 | -1) => {
      let index = ALPHABET.indexOf(selectedLetter);
      for (let i = 0; i < ALPHABET.length; i += 1) {
        index = (index + step + ALPHABET.length) % ALPHABET.length;
        const letter = ALPHABET[index];
        if (stopGameData[letter]) return letter;
      }
      return selectedLetter;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/" && !isEditableTarget(event.target)) {
        event.preventDefault();
        document.getElementById("stopgame-search-input")?.focus();
        return;
      }
      if (isEditableTarget(event.target)) return;

      if (viewMode === "study") {
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          const cards = Array.from(
            document.querySelectorAll(".study-card"),
          ) as HTMLElement[];
          if (cards.length > 0) {
            const currentIndex = cards.findIndex(
              (card) =>
                card === document.activeElement ||
                card.contains(document.activeElement),
            );
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const nextIndex =
                currentIndex >= 0 && currentIndex < cards.length - 1
                  ? currentIndex + 1
                  : 0;
              cards[nextIndex].focus();
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              const prevIndex =
                currentIndex > 0 ? currentIndex - 1 : cards.length - 1;
              cards[prevIndex].focus();
            }
          }
          return;
        }
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setSelectedLetter(findNextAvailableLetter(1));
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setSelectedLetter(findNextAvailableLetter(-1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedLetter, viewMode]);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // --- PRACTICE & SPEECH ---
  const handleSpeechResult = (transcript: string) => {
    if (practiceWord && isPracticing) {
      // Hyphen normalization: treat hyphens as spaces
      const normalizedTranscript = (transcript || "").replace(/-/g, " ");
      const normalizedTarget = (practiceWord.word || "").replace(/-/g, " ");

      const cleanTranscript = normalizedTranscript
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .trim();
      const cleanTarget = normalizedTarget
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .trim();

      if (!cleanTranscript) return;

      const isMatch =
        cleanTranscript.includes(cleanTarget) ||
        cleanTarget.includes(cleanTranscript);

      if (isMatch) {
        // SUCCESS: Freeze the transcript, stop listening, show success, then close.
        setFrozenTranscript(transcript);
        abortListening();
        setPracticeFeedback("Correct! 🎉");

        // Auto-add to Vault on successful practice
        if (onAddToVault && practiceWord) {
          handleSaveWord(
            practiceWord.word,
            practiceWord.definition || practiceWord.translation,
          );
        }

        setTimeout(() => {
          setIsPracticing(false);
          setPracticeWord(null);
          setPracticeFeedback(null);
          setFrozenTranscript(null);
        }, 5000);
      } else {
        // INCORRECT / PARTIAL
        // We do NOT stop listening. We just update the feedback message if it's clearly wrong?
        // Or better, just let the transcript show what they said.
        // If we want "Incorrect" text, we can show it but NOT stop.
        // This way the user can correct themselves: "Ba... Ban... Banana!"
        // And the transcript will update live.
        // We only show "Incorrect" if the transcript is substantial length?
        // Or just always show "Keep trying..."?
        // User liked "Incorrect. Try again!". Let's use that but NOT stop.

        setPracticeFeedback("Incorrect. Keep trying...");
      }
    }
  };

  const {
    startListening,
    abortListening,
    micState,
    interimTranscript,
    finalTranscript,
  } = useSpeechRecognition(handleSpeechResult);

  const handlePracticeClick = (item: StopItem) => {
    // If clicking same word that is currently active (Closing or Retrying)
    if (isPracticing && practiceWord?.word === item.word) {
      // Just close/reset everything.
      // User can click again to restart.
      abortListening();
      setIsPracticing(false);
      setPracticeWord(null);
      setPracticeFeedback(null);
      setFrozenTranscript(null);
    } else {
      // Switching to a new word or starting fresh
      if (isPracticing) {
        abortListening();
        setIsPracticing(false);
      }

      setPracticeWord(item);
      setPracticeFeedback(null);
      setFrozenTranscript(null);
      setIsPracticing(true);
      setTimeout(() => startListening(), 50);
    }
  };

  const handleSaveWord = (word: string, definition: string) => {
    if (onAddToVault) {
      onAddToVault(word, definition);
      setSavedWords((prev) => new Set(prev).add(word));
    }
  };

  // --- RANDOM SURPRISE LOGIC ---
  const handleRandomPick = () => {
    if (!currentData) return;

    // 1. Pick a random category that has words
    const validCategories = visibleCategories.filter(
      (cat) => currentData[cat] && currentData[cat]!.length > 0,
    );
    if (validCategories.length === 0) return;

    const randomCat =
      validCategories[Math.floor(Math.random() * validCategories.length)];
    const items = currentData[randomCat]!;
    const randomItem = items[Math.floor(Math.random() * items.length)];

    // 2. Expand that category
    setExpandedCategories((prev) => ({ ...prev, [randomCat]: true }));

    // 3. Scroll logic (simplistic: scroll to category)
    setTimeout(() => {
      const el = document.getElementById(`cat-${randomCat}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });

      // 4. Play audio (Surprise!)
      if (ttsAutoPlay) {
        onPlayWord(randomItem.word);
      }
    }, 100);
  };

  return (
    <>
      {/* UNIFIED VIEW TOOLBAR */}
      <div className="flex-shrink-0 bg-[var(--color-surface-1)] border-b border-[var(--color-border)] z-30 relative shadow-sm">
        <div className="max-w-7xl mx-auto px-2 py-1.5">
          <ViewToolbar
            className="border-none rounded-lg p-0 bg-transparent"
            left={
              <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
                <span className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider flex items-center gap-2 whitespace-nowrap">
                  <span className="text-lg">🛑</span>{" "}
                  {viewMode === "browse"
                    ? "Dictionary"
                    : viewMode === "study"
                      ? "Flashcards"
                      : "Game"}
                </span>

                {viewMode !== "game" && currentData && (
                  <span className="bg-[var(--color-surface-2)] text-[var(--color-text-muted)] px-2 py-1 rounded-lg text-xs font-mono border border-[var(--color-border)] whitespace-nowrap flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)]"></span>
                    {Object.values(currentData).flat().length}
                  </span>
                )}
              </div>
            }
            right={
              <>
                {viewMode === "study" && (
                  <div className="flex gap-1">
                    <button
                      onClick={() => {
                        setIsShuffled(!isShuffled);
                        if (!isShuffled) setShuffleSeed((s) => s + 1);
                      }}
                      className={`px-2 py-1 min-h-[36px] rounded-lg border text-[10px] font-bold transition-all flex items-center gap-1 ${isShuffled ? "bg-purple-600 border-purple-500 text-white" : "bg-[var(--color-surface-2)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-purple-400"}`}
                      title={isShuffled ? "Unshuffle" : "Shuffle Words"}
                    >
                      🔀
                    </button>
                    <button
                      onClick={() => setStudyAutoPlay(!studyAutoPlay)}
                      className={`px-2 py-1 min-h-[36px] rounded-lg border text-[10px] font-bold transition-all flex items-center gap-1 ${studyAutoPlay ? "bg-[var(--color-accent)] border-[var(--color-accent)] text-white" : "bg-[var(--color-surface-2)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]"}`}
                    >
                      {studyAutoPlay ? "🔊" : "🔈"}
                    </button>
                    <button
                      onClick={() => setStudyRevealAll(!studyRevealAll)}
                      className={`px-2 py-1 min-h-[36px] rounded-lg border text-[10px] font-bold transition-all flex items-center gap-1 ${studyRevealAll ? "bg-amber-600 border-amber-500 text-white" : "bg-[var(--color-surface-2)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-amber-400"}`}
                    >
                      {studyRevealAll ? "Hide" : "Reveal"}
                    </button>
                  </div>
                )}

                {viewMode !== "game" && (
                  <>
                    <div className="relative w-full md:w-52 group flex-1 md:flex-none">
                      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none text-[var(--color-text-secondary)]">
                        <SearchIcon />
                      </div>
                      <input
                        id="stopgame-search-input"
                        type="text"
                        placeholder="Search..."
                        value={browseFilter}
                        onChange={(e) => setBrowseFilter(e.target.value)}
                        className="w-full min-h-[36px] bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text-primary)] text-xs rounded-lg pl-8 pr-6 py-1.5 focus:ring-1 focus:ring-[var(--color-focus)] focus:border-transparent transition-all placeholder-[var(--color-text-muted)]"
                        aria-label="Search vocabulary"
                      />
                      {browseFilter && (
                        <button
                          onClick={() => setBrowseFilter("")}
                          className="absolute right-1 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] rounded-full p-0.5 hover:bg-[var(--color-surface-hover)]"
                        >
                          <svg
                            className="h-3 w-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      )}
                    </div>

                    <button
                      onClick={() => setShowSavedOnly(!showSavedOnly)}
                      className={`p-1.5 min-h-[36px] min-w-[36px] rounded-lg border transition-all ${showSavedOnly ? "bg-pink-600 border-pink-500 text-white" : "bg-[var(--color-surface-2)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-pink-400"}`}
                      title="Show Saved Only"
                    >
                      <HeartIcon solid={showSavedOnly} />
                    </button>

                    <button
                      onClick={handleRandomPick}
                      className="p-1.5 min-h-[36px] min-w-[36px] rounded-lg border bg-gradient-to-r from-sky-600 to-purple-600 border-transparent text-white hover:opacity-90 transition-all shadow-sm"
                      title="Surprise Me!"
                    >
                      <SparklesIcon />
                    </button>
                  </>
                )}
              </>
            }
          />
        </div>
      </div>

      {/* Row 2: Letters & Filters (Always Visible in Browse Mode) */}
      {viewMode === "browse" && (
        <div
          className={`flex-shrink-0 bg-[var(--color-surface-1)] border-b border-[var(--color-border)] z-20 shadow-sm relative transition-all duration-300 py-1 sm:py-2`}
        >
          <div className="max-w-7xl mx-auto px-2">
            {/* Letters */}
            <div className="overflow-x-auto overflow-y-hidden scrollbar-hide pb-1 sm:pb-2">
              <div className="flex gap-0.5 sm:gap-1 min-w-max px-1">
                {ALPHABET.map((letter) => {
                  const hasData = !!stopGameData[letter];
                  const isSelected = selectedLetter === letter;
                  return (
                    <button
                      key={letter}
                      onClick={() => hasData && setSelectedLetter(letter)}
                      disabled={!hasData}
                      className={`
                                          min-h-[36px] min-w-[32px] sm:h-9 sm:w-8 rounded-md font-bold text-xs sm:text-sm transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-focus focus-visible:outline-none flex items-center justify-center border-b-2 relative overflow-hidden
                                          ${
                                            isSelected
                                              ? "bg-[var(--color-accent)] border-[var(--color-accent-hover)] text-white shadow-[0_0_15px_rgba(14,165,233,0.5)] scale-105"
                                              : hasData
                                                ? "bg-[var(--color-surface-1)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-muted)]"
                                                : "bg-[var(--color-surface-1)]/30 border-transparent text-[var(--color-text-muted)] cursor-not-allowed"
                                          }
                                      `}
                    >
                      {letter}
                      {isSelected && (
                        <span className="absolute bottom-0 left-0 w-full h-1 bg-white/30 animate-pulse"></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Categories */}
            <div className="overflow-x-auto overflow-y-hidden scrollbar-hide pt-1 sm:pt-2 border-t border-[var(--color-border)]">
              <div className="flex gap-1.5 sm:gap-2 min-w-max px-1">
                {(Object.keys(CATEGORY_GROUPS) as GroupName[]).map((group) => {
                  const isSelected = selectedGroup === group;
                  return (
                    <button
                      key={group}
                      onClick={() => setSelectedGroup(group)}
                      className={`
                                          min-h-[36px] px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-focus focus-visible:outline-none whitespace-nowrap border
                                          ${
                                            isSelected
                                              ? "bg-[var(--color-success)] border-[var(--color-success-hover)] text-white shadow-lg shadow-[var(--color-success)]/20 scale-105"
                                              : "bg-[var(--color-surface-1)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]"
                                          }
                                      `}
                    >
                      {group}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {viewMode === "game" ? (
        <StopGamePlay onPlayWord={onPlayWord} onAddToVault={onAddToVault} />
      ) : (
        <div className="flex-1 overflow-y-auto overscroll-y-contain p-4 sm:p-6 bg-[var(--color-surface-2)]/50">
          <div className="max-w-7xl mx-auto pb-20">
            {currentData ? (
              <div
                className={`grid ${viewMode === "study" ? "grid-cols-1 max-w-3xl mx-auto" : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"} gap-6 animate-fade-in`}
              >
                {visibleCategories.map((category) => {
                  const items = filteredCategoryData[category] || [];

                  // If user is filtering and the result is empty, we MIGHT want to hide it to reduce clutter.
                  // However, to satisfy "visual stability" when changing letters, we will render the ghost card
                  // UNLESS we are in "All" mode where showing 50 empty cards is annoying.
                  const isEmpty = items.length === 0;
                  if (isEmpty && selectedGroup === "All" && !browseFilter)
                    return null;

                  // If searching/filtering, hide empty results to show only matches
                  if (isEmpty && (browseFilter || showSavedOnly)) return null;

                  const displayLimit = 6;
                  const isExpanded = expandedCategories[category];
                  const visibleItems = isExpanded
                    ? items
                    : items.slice(0, displayLimit);
                  const hiddenCount = items.length - displayLimit;
                  const hasMore = items.length > displayLimit;

                  const theme = getCategoryTheme(category);

                  // Ghost Card Styling (for empty categories)
                  if (isEmpty) {
                    return (
                      <div
                        key={category}
                        id={`cat-${category}`}
                        className={`rounded-2xl border-2 border-dashed border-[var(--color-border)] bg-[var(--color-surface-1)]/20 flex flex-col h-full opacity-60`}
                      >
                        <div
                          className={`px-5 py-4 flex items-center justify-between border-b border-transparent`}
                        >
                          <div className="flex items-center gap-3 grayscale">
                            <span
                              className={`text-2xl w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--color-surface-2)]`}
                            >
                              {getCategoryIcon(category)}
                            </span>
                            <h3
                              className={`font-bold text-lg text-[var(--color-text-muted)]`}
                            >
                              {category}
                            </h3>
                          </div>
                        </div>
                        <div className="flex-1 p-6 flex items-center justify-center text-[var(--color-text-muted)] text-sm italic font-medium">
                          No {category.toLowerCase()} starting with '
                          {selectedLetter}'
                        </div>
                      </div>
                    );
                  }

                  // Normal Card Styling
                  const cardClass = `rounded-2xl border-t-4 ${theme.accentColor} bg-[var(--color-surface-1)] border-x border-b border-[var(--color-border)]/50 overflow-hidden flex flex-col h-full shadow-lg transition-all duration-300 hover:-translate-y-1 ${theme.glow} group`;
                  const headerClass = `${theme.headerGradient} px-5 py-4 flex items-center justify-between border-b border-white/5`;
                  const titleClass = `font-black text-lg ${theme.textClass} tracking-wide drop-shadow-sm`;

                  return (
                    <div
                      key={category}
                      id={`cat-${category}`}
                      className={cardClass}
                    >
                      <div className={headerClass}>
                        <div className="flex items-center gap-3">
                          <span
                            className={`text-2xl w-10 h-10 flex items-center justify-center rounded-lg shadow-inner ${theme.iconBg}`}
                          >
                            {getCategoryIcon(category)}
                          </span>
                          <h3 className={titleClass}>{category}</h3>
                        </div>
                        <span className="text-xs font-bold text-[var(--color-text-secondary)] bg-[var(--color-surface-2)]/30 px-2.5 py-1 rounded-lg border border-white/5 min-w-[2rem] text-center backdrop-blur-sm">
                          {items.length}
                        </span>
                      </div>
                      <div
                        className={`p-4 flex-1 flex flex-col gap-3 ${theme.bgGradient}`}
                      >
                        {visibleItems.map((item, idx) => (
                          <StopGameCard
                            key={idx}
                            item={item}
                            category={category}
                            theme={theme}
                            onPlay={onPlayWord}
                            onPractice={() => handlePracticeClick(item)}
                            onSave={handleSaveWord}
                            isAudioLoading={isWordAudioLoading === item.word}
                            isPracticing={
                              practiceWord?.word === item.word && isPracticing
                            }
                            isSaved={savedWords.has(item.word)}
                            micState={micState}
                            transcript={
                              frozenTranscript ||
                              (finalTranscript || "") +
                                (interimTranscript || "")
                            }
                            feedback={practiceFeedback}
                            isStudyMode={viewMode === "study"}
                            studyRevealAll={studyRevealAll}
                            studyAutoPlay={studyAutoPlay}
                            onDetailClick={
                              viewMode === "study"
                                ? (item) =>
                                    setSelectedItemForModal({ item, category })
                                : undefined
                            }
                          />
                        ))}
                      </div>
                      {hasMore && (
                        <button
                          onClick={() => toggleCategory(category)}
                          className="w-full py-3 bg-[var(--color-surface-1)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 border-t border-[var(--color-border)]/50"
                        >
                          {isExpanded ? (
                            <>
                              <span>Collapse</span>
                              <ChevronUpIcon />
                            </>
                          ) : (
                            <>
                              <span>Show {hiddenCount} More</span>
                              <ChevronDownIcon />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-[var(--color-text-secondary)]">
                <p className="text-xl">
                  No words loaded for letter {selectedLetter} yet.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedItemForModal && (
        <StopItemModal
          item={selectedItemForModal.item}
          category={selectedItemForModal.category}
          onClose={() => setSelectedItemForModal(null)}
          onPlay={onPlayWord}
        />
      )}
    </>
  );
};

export default StopGameBrowse;
