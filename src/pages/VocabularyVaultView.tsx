import React, { useState, useMemo, useEffect, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { SrsVocabularyItem, VaultAddOptions } from "@/types";
import { starterKits } from "@/features/data/vocabularyVault";
import {
  getDueReviewItems,
  getIsoWeekKey,
  getWeeklyBossReviewItems,
  calculateSrsData,
  migrateDeckToFsrsIfNeeded,
  srsVocabularyItemSchema,
  shuffleItems,
} from "@/lib/srs";
import { loadSettings } from "@/lib/settingsStore";
import { trackAnalyticsEvent } from "@/lib/analytics";
import { progressQuest } from "@/lib/xpStore";
import { Rating } from "ts-fsrs";
import { z } from "zod";
import ReviewSession from "@/components/ReviewSession";
import SpeechPracticeButton from "@/components/SpeechPracticeButton";
import { PlayIcon, TrashIcon } from "@/components/Icons";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import SlideOver from "@/components/ui/SlideOver";
import ViewToolbar from "@/components/ui/ViewToolbar";
import { cn } from "@/lib/cn";
import {
  initVaultSearchWorker,
  updateWorkerDeck,
  searchVault,
  terminateVaultSearchWorker,
} from "@/workers/vaultSearch";
import {
  VaultSearchFilters,
  VaultSearchResult,
} from "@/workers/vaultSearch.worker";
import {
  HighlightedText,
  getMatchIndices,
} from "@/components/ui/HighlightedText";
import { buildVaultItem, upgradeDeckEntries } from "@/lib/vaultEntries";

interface VocabularyVaultViewProps {
  onPlayWord: (text: string) => void;
  confirmDialogsEnabled: boolean;
}

interface VaultProgress {
  currentStreak: number;
  bestStreak: number;
  totalReviews: number;
  lastReviewDate: string | null;
  lastBossReviewWeek: string | null;
  bossReviewsCompleted: number;
}

interface VaultWeeklyActivity {
  weekKey: string;
  sessions: number;
  attempts: number;
  correct: number;
  studyMinutes: number;
}

type PracticeObjective = "all" | "interview" | "travel";

const VAULT_PROGRESS_KEY = "vocab-vault-progress";
const VAULT_WEEKLY_ACTIVITY_KEY = "vocab-vault-weekly-activity";
const VAULT_PRACTICE_OBJECTIVE_KEY = "vocab-vault-practice-objective";
const DEFAULT_VAULT_PROGRESS: VaultProgress = {
  currentStreak: 0,
  bestStreak: 0,
  totalReviews: 0,
  lastReviewDate: null,
  lastBossReviewWeek: null,
  bossReviewsCompleted: 0,
};

const vaultProgressSchema = z.object({
  currentStreak: z.number().catch(0),
  bestStreak: z.number().catch(0),
  totalReviews: z.number().catch(0),
  lastReviewDate: z.string().nullable().catch(null),
  lastBossReviewWeek: z.string().nullable().catch(null),
  bossReviewsCompleted: z.number().catch(0),
});

const createDefaultWeeklyActivity = (weekKey: string): VaultWeeklyActivity => ({
  weekKey,
  sessions: 0,
  attempts: 0,
  correct: 0,
  studyMinutes: 0,
});

const normalizePracticeObjective = (value: unknown): PracticeObjective => {
  if (value === "interview" || value === "travel") {
    return value;
  }
  return "all";
};

const matchesObjective = (
  item: SrsVocabularyItem,
  objective: PracticeObjective,
): boolean => {
  if (objective === "all") return true;
  const tags = (item.tags || []).map((tag) => tag.toLowerCase());

  if (objective === "interview") {
    return tags.some((tag) =>
      ["interview", "work", "business", "job"].includes(tag),
    );
  }

  return tags.some((tag) => ["travel", "emergency", "health"].includes(tag));
};

const updateVaultProgress = (
  previous: VaultProgress,
  reviewDate: string,
): VaultProgress => {
  let currentStreak = previous.currentStreak;
  if (!previous.lastReviewDate) {
    currentStreak = 1;
  } else if (previous.lastReviewDate !== reviewDate) {
    const daysSinceLastReview = Math.round(
      (new Date(`${reviewDate}T00:00:00Z`).getTime() -
        new Date(`${previous.lastReviewDate}T00:00:00Z`).getTime()) /
        86400000,
    );
    currentStreak = daysSinceLastReview === 1 ? previous.currentStreak + 1 : 1;
  }

  return {
    ...previous,
    currentStreak,
    bestStreak: Math.max(previous.bestStreak, currentStreak),
    totalReviews: previous.totalReviews + 1,
    lastReviewDate: reviewDate,
  };
};

const normalizeDeck = (deck: Record<string, SrsVocabularyItem>) => {
  const normalized: Record<string, SrsVocabularyItem> = {};
  Object.values(deck).forEach((item) => {
    if (!item || !item.word) return;
    const key = item.word.trim().toLowerCase();
    if (
      !normalized[key] ||
      (item.repetition || 0) > (normalized[key].repetition || 0)
    ) {
      normalized[key] = item;
    }
  });
  return normalized;
};

const MemoryBar = ({ interval }: { interval: number }) => {
  const percentage = Math.min(100, (interval / 30) * 100);
  const color =
    percentage > 80
      ? "bg-success"
      : percentage > 40
        ? "bg-accent"
        : "bg-amber-500";
  return (
    <div
      className="w-full bg-surface-2 h-1.5 rounded-full overflow-hidden mt-2"
      title={`Memory Strength: ${Math.round(percentage)}%`}
    >
      <div
        className={`${color} h-full transition-all duration-1000`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

const starterSectionThemes = [
  {
    key: "high-frequency",
    eyebrow: "Daily essentials",
    description: "Core words that show up constantly in conversations.",
    accentClass:
      "from-sky-500/20 via-cyan-500/10 to-transparent border-sky-400/20",
    badgeClass: "bg-sky-500/15 text-sky-200 border border-sky-400/20",
    buttonClass: "bg-sky-500/10 text-sky-100 hover:bg-sky-500 hover:text-white",
  },
  {
    key: "work-interview",
    eyebrow: "Career mode",
    description:
      "Vocabulary for interviews, meetings and professional clarity.",
    accentClass:
      "from-emerald-500/20 via-teal-500/10 to-transparent border-emerald-400/20",
    badgeClass:
      "bg-emerald-500/15 text-emerald-100 border border-emerald-400/20",
    buttonClass:
      "bg-emerald-500/10 text-emerald-100 hover:bg-emerald-500 hover:text-white",
  },
  {
    key: "travel",
    eyebrow: "On the move",
    description: "Fast phrases for airports, transport and urgent moments.",
    accentClass:
      "from-amber-500/20 via-orange-500/10 to-transparent border-amber-400/20",
    badgeClass: "bg-amber-500/15 text-amber-100 border border-amber-400/20",
    buttonClass:
      "bg-amber-500/10 text-amber-100 hover:bg-amber-500 hover:text-slate-950",
  },
  {
    key: "mistakes",
    eyebrow: "Fix friction",
    description: "High-value corrections for common Spanish-speaker mistakes.",
    accentClass:
      "from-fuchsia-500/20 via-rose-500/10 to-transparent border-fuchsia-400/20",
    badgeClass:
      "bg-fuchsia-500/15 text-fuchsia-100 border border-fuchsia-400/20",
    buttonClass:
      "bg-fuchsia-500/10 text-fuchsia-100 hover:bg-fuchsia-500 hover:text-white",
  },
] as const;

const VocabularyVaultView: React.FC<VocabularyVaultViewProps> = ({
  onPlayWord,
  confirmDialogsEnabled,
}) => {
  const [deck, setDeck] = useState<Record<string, SrsVocabularyItem>>(() => {
    try {
      const saved = localStorage.getItem("vocab-vault-deck");
      if (!saved) return {};

      const rawParsed = JSON.parse(saved);
      // Soft validation for backward compatibility and fast startup: just rely on normalizeDeck
      // Hard schema validation happens aggressively on imports
      let parsedDeck = normalizeDeck(
        rawParsed as Record<string, SrsVocabularyItem>,
      );
      parsedDeck = upgradeDeckEntries(parsedDeck);

      const migratedDeck = migrateDeckToFsrsIfNeeded(parsedDeck);
      if (migratedDeck) {
        parsedDeck = migratedDeck;
      }

      return parsedDeck;
    } catch (e) {
      console.error("Failed to load deck from storage", e);
      return {};
    }
  });
  const [isReviewing, setIsReviewing] = useState(false);
  const [activeTab, setActiveTab] = useState<"study" | "collection" | "sync">(
    "study",
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [progress, setProgress] = useState<VaultProgress>(() => {
    try {
      const saved = localStorage.getItem(VAULT_PROGRESS_KEY);
      if (!saved) return DEFAULT_VAULT_PROGRESS;
      const parsed = JSON.parse(saved);
      return vaultProgressSchema.parse(parsed) as VaultProgress;
    } catch (e) {
      console.error("Failed to load progress from storage", e);
      return DEFAULT_VAULT_PROGRESS;
    }
  });

  const [importText, setImportText] = useState("");
  const currentWeekKey = getIsoWeekKey(new Date());
  const [weeklyActivity, setWeeklyActivity] = useState<VaultWeeklyActivity>(
    () => {
      try {
        const saved = localStorage.getItem(VAULT_WEEKLY_ACTIVITY_KEY);
        if (!saved) return createDefaultWeeklyActivity(currentWeekKey);
        const parsed = JSON.parse(saved) as VaultWeeklyActivity;
        if (!parsed || parsed.weekKey !== currentWeekKey) {
          return createDefaultWeeklyActivity(currentWeekKey);
        }
        return parsed;
      } catch (error) {
        console.error("Failed to load weekly activity from storage", error);
        return createDefaultWeeklyActivity(currentWeekKey);
      }
    },
  );

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newWord, setNewWord] = useState("");
  const [newContext, setNewContext] = useState("");
  const [newDef, setNewDef] = useState("");
  const [newTags, setNewTags] = useState("");

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingWordKey, setEditingWordKey] = useState<string | null>(null);
  const [editWord, setEditWord] = useState("");
  const [editContext, setEditContext] = useState("");
  const [editDef, setEditDef] = useState("");
  const [editTags, setEditTags] = useState("");

  const [sortBy, setSortBy] = useState<"alphabetical" | "strength" | "newest">(
    "alphabetical",
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [searchFilters, setSearchFilters] = useState<VaultSearchFilters>({
    tags: [],
    states: [],
    dateRange: null,
    difficulty: "all",
  });
  const [searchResults, setSearchResults] = useState<VaultSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Removed generatedData logic as AI is gone

  const [reviewItems, setReviewItems] = useState<SrsVocabularyItem[]>([]);
  const [reviewMode, setReviewMode] = useState<"daily" | "boss">("daily");
  const [practiceObjective, setPracticeObjective] = useState<PracticeObjective>(
    () => {
      try {
        const saved = localStorage.getItem(VAULT_PRACTICE_OBJECTIVE_KEY);
        return normalizePracticeObjective(saved);
      } catch {
        return "all";
      }
    },
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobileActionsVisible, setIsMobileActionsVisible] = useState(true);
  const lastScrollTopRef = useRef(0);

  const parentRef = useRef<HTMLDivElement>(null);

  const [columnCount, setColumnCount] = useState(3);
  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth >= 1024) setColumnCount(3);
      else if (window.innerWidth >= 768) setColumnCount(2);
      else setColumnCount(1);
    };
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const virtualItemCount =
    viewMode === "grid"
      ? Math.ceil(searchResults.length / columnCount)
      : searchResults.length;

  const rowVirtualizer = useVirtualizer({
    count: virtualItemCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => (viewMode === "grid" ? 280 : 140),
    overscan: 5,
  });
  const reviewSessionStartRef = useRef<number | null>(null);
  const reviewSessionStatsRef = useRef({ attempts: 0, correct: 0 });

  const hasShownTimeBoxAlertRef = useRef(false);
  const [showTimeBoxAlert, setShowTimeBoxAlert] = useState(false);
  const settings = useMemo(() => loadSettings(), []);

  useEffect(() => {
    if (
      !isReviewing ||
      !reviewSessionStartRef.current ||
      !settings.srsTimeBoxMinutes
    )
      return;

    const intervalId = setInterval(() => {
      const elapsedMs = Date.now() - reviewSessionStartRef.current!;
      const elapsedMinutes = elapsedMs / 60000;

      if (
        elapsedMinutes >= settings.srsTimeBoxMinutes &&
        !hasShownTimeBoxAlertRef.current
      ) {
        setShowTimeBoxAlert(true);
        hasShownTimeBoxAlertRef.current = true;
      }
    }, 30000);

    return () => clearInterval(intervalId);
  }, [isReviewing, settings.srsTimeBoxMinutes]);

  useEffect(() => {
    localStorage.setItem("vocab-vault-deck", JSON.stringify(deck));
    updateWorkerDeck(Object.values(deck));
  }, [deck]);

  useEffect(() => {
    return () => {
      terminateVaultSearchWorker();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(VAULT_PROGRESS_KEY, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem(
      VAULT_WEEKLY_ACTIVITY_KEY,
      JSON.stringify(weeklyActivity),
    );
  }, [weeklyActivity]);

  useEffect(() => {
    localStorage.setItem(VAULT_PRACTICE_OBJECTIVE_KEY, practiceObjective);
  }, [practiceObjective]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (activeTab !== "collection" || event.key !== "/") return;
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }
      event.preventDefault();
      document.getElementById("vault-search-input")?.focus();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "collection") {
      setTimeout(() => {
        document.getElementById("vault-search-input")?.focus();
      }, 50);
    }
  }, [activeTab]);

  const deckList = useMemo(
    () => Object.values(deck) as SrsVocabularyItem[],
    [deck],
  );
  const dueItems = useMemo(() => getDueReviewItems(deck, 4), [deck]); // Check for items due within 4 hours
  const bossReviewItems = useMemo(
    () => getWeeklyBossReviewItems(deck, settings.srsSessionLimit),
    [deck, settings.srsSessionLimit],
  );
  const dueItemsForObjective = useMemo(
    () => dueItems.filter((item) => matchesObjective(item, practiceObjective)),
    [dueItems, practiceObjective],
  );
  const bossReviewItemsForObjective = useMemo(
    () =>
      bossReviewItems.filter((item) =>
        matchesObjective(item, practiceObjective),
      ),
    [bossReviewItems, practiceObjective],
  );
  const bossReviewCompletedThisWeek =
    progress.lastBossReviewWeek === currentWeekKey;

  useEffect(() => {
    let active = true;
    setIsSearching(true);
    searchVault(searchTerm, searchFilters, sortBy).then((results) => {
      if (active) {
        setSearchResults(results);
        setIsSearching(false);
      }
    });
    return () => {
      active = false;
    };
  }, [deckList, searchTerm, sortBy, searchFilters]);

  const handleAddToDeck = (
    item: {
      word: string;
      definition: string;
    } & VaultAddOptions,
  ) => {
    const wordKey = item.word.trim().toLowerCase();
    if (deck[wordKey]) {
      alert("Word already in your vault!");
      return;
    }
    const newItem = buildVaultItem(item.word, item.definition, {
      ipa: item.ipa,
      example: item.example,
      originalContext: item.originalContext,
      partOfSpeech: item.partOfSpeech,
      tags: item.tags,
      sourceDefinition: item.definition,
    });
    setDeck((prev) => ({ ...prev, [wordKey]: newItem }));
    resetAddForm();
    setIsAddOpen(false);
  };

  const resetAddForm = () => {
    setNewWord("");
    setNewContext("");
    setNewDef("");
    setNewTags("");
  };

  const handleSaveFromModal = () => {
    // Manual entry only
    handleAddToDeck({
      word: newWord,
      definition: newDef,
      originalContext: newContext,
      tags: newTags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t),
    });
  };

  const handleEditWord = (wordKey: string) => {
    const item = deck[wordKey];
    if (!item) return;
    setEditingWordKey(wordKey);
    setEditWord(item.word);
    setEditDef(item.definition);
    setEditContext(item.originalContext || "");
    setEditTags(item.tags ? item.tags.join(", ") : "");
    setIsEditOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingWordKey || !deck[editingWordKey]) return;

    const updatedItem = {
      ...deck[editingWordKey],
      word: editWord,
      definition: editDef,
      originalContext: editContext,
      tags: editTags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t),
    };

    setDeck((prev) => {
      const newDeck = { ...prev };
      // If the word itself changed, we need to update the key
      const newKey = editWord.trim().toLowerCase();
      if (newKey !== editingWordKey) {
        delete newDeck[editingWordKey];
      }
      newDeck[newKey] = updatedItem;
      return newDeck;
    });

    setIsEditOpen(false);
    setEditingWordKey(null);
  };

  const handleAddFormKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter" && newWord.trim() && newDef.trim()) {
      event.preventDefault();
      handleSaveFromModal();
    }
  };

  const handleDelete = (word: string) => {
    if (!confirmDialogsEnabled || confirm(`Remove "${word}"?`)) {
      setDeck((prevDeck) => {
        const newDeck = { ...prevDeck };
        // Try deleting by the exact word passed
        if (newDeck[word]) {
          delete newDeck[word];
        } else {
          // Fallback: search for keys that match physically if there is some mismatch
          // or try trimming?
          const trimmed = word.trim();
          if (newDeck[trimmed]) {
            delete newDeck[trimmed];
          } else {
            // Debug: Log if we can't find it
            console.warn("Could not find word in deck to delete:", word);
            // Is it possible the key is different?
            // Let's look for a key whose lowercase matches?
            const foundKey = Object.keys(newDeck).find(
              (k) => k.toLowerCase() === word.toLowerCase(),
            );
            if (foundKey) delete newDeck[foundKey];
          }
        }
        return newDeck;
      });
    }
  };

  const handleExport = () => {
    const backup = JSON.stringify(
      {
        version: 1,
        exportedAt: new Date().toISOString(),
        deck,
        progress,
      },
      null,
      2,
    );
    const blob = new Blob([backup], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "english-pal-vault-backup.json";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    try {
      const parsed = JSON.parse(importText);
      const deckSchema = z.record(z.string(), srsVocabularyItemSchema);
      let importedDeck: Record<string, SrsVocabularyItem> = {};
      let importedProgress: VaultProgress = DEFAULT_VAULT_PROGRESS;

      if (parsed && typeof parsed === "object") {
        if ("deck" in parsed) {
          const deckResult = deckSchema.safeParse(parsed.deck);
          if (deckResult.success) {
            importedDeck = deckResult.data;
          } else {
            console.error("Invalid deck format in import", deckResult.error);
            alert("Error in import: The deck data is invalid or corrupted.");
            return;
          }

          if (parsed.progress) {
            const progressResult = vaultProgressSchema.safeParse(
              parsed.progress,
            );
            if (progressResult.success) {
              importedProgress = progressResult.data as VaultProgress;
            }
          }
        } else {
          const deckResult = deckSchema.safeParse(parsed);
          if (deckResult.success) {
            importedDeck = deckResult.data;
          } else {
            console.error("Invalid deck format in import", deckResult.error);
            alert("Error in import: The deck data is invalid or corrupted.");
            return;
          }
        }

        setDeck(upgradeDeckEntries(normalizeDeck(importedDeck)));
        setProgress(importedProgress);
        setImportText("");
        alert("Import successful!");
        setActiveTab("collection");
      } else {
        alert("Invalid backup file: Not an object.");
      }
    } catch (e) {
      alert("Invalid backup code.");
    }
  };

  const handleImportSample = () => {
    const sampleDeck = starterKits.highFrequency.slice(0, 12).reduce(
      (acc, item) => {
        acc[item.word.trim().toLowerCase()] = buildVaultItem(
          item.word,
          item.definition,
          {
            ipa: item.ipa,
            example: item.example,
            partOfSpeech: item.partOfSpeech,
            tags: item.tags,
            sourceDefinition: item.definition,
          },
        );
        return acc;
      },
      {} as Record<string, SrsVocabularyItem>,
    );
    setDeck(sampleDeck);
  };

  const handleImportFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImportText(String(reader.result || ""));
    reader.readAsText(file);
    event.target.value = "";
  };

  const handleReviewComplete = (wasCorrect: boolean, rating?: Rating) => {
    const item = reviewItems[currentIndex];
    const updatedItem = calculateSrsData(item, wasCorrect, rating);
    reviewSessionStatsRef.current.attempts += 1;
    if (wasCorrect) {
      reviewSessionStatsRef.current.correct += 1;
    }
    trackAnalyticsEvent(wasCorrect ? "item_correct" : "item_wrong", {
      mode: reviewMode,
      word: item.word,
      position: currentIndex + 1,
      total: reviewItems.length,
    });

    // Quest progression
    progressQuest("study_cards", 1, "vault");
    progressQuest("study_cards", 1, "any");
    if (wasCorrect) {
      progressQuest("correct_answers", 1, "vault");
      progressQuest("correct_answers", 1, "any");
    }

    setDeck((prev) => ({
      ...prev,
      [item.word.trim().toLowerCase()]: updatedItem,
    }));
    setProgress((prev) =>
      updateVaultProgress(prev, new Date().toISOString().split("T")[0]),
    );
    setWeeklyActivity((previous) => {
      const safePrevious =
        previous.weekKey === currentWeekKey
          ? previous
          : createDefaultWeeklyActivity(currentWeekKey);
      return {
        ...safePrevious,
        attempts: safePrevious.attempts + 1,
        correct: safePrevious.correct + (wasCorrect ? 1 : 0),
      };
    });
    if (currentIndex < reviewItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const sessionDurationMs = reviewSessionStartRef.current
        ? Date.now() - reviewSessionStartRef.current
        : 0;
      const sessionMinutes = Math.max(1, Math.round(sessionDurationMs / 60000));
      trackAnalyticsEvent("session_end", {
        mode: reviewMode,
        completed: true,
        durationSeconds: Math.round(sessionDurationMs / 1000),
        attempts: reviewSessionStatsRef.current.attempts,
        correct: reviewSessionStatsRef.current.correct,
      });
      setWeeklyActivity((previous) => {
        const safePrevious =
          previous.weekKey === currentWeekKey
            ? previous
            : createDefaultWeeklyActivity(currentWeekKey);
        return {
          ...safePrevious,
          studyMinutes: safePrevious.studyMinutes + sessionMinutes,
        };
      });
      reviewSessionStartRef.current = null;
      if (reviewMode === "boss") {
        trackAnalyticsEvent("weekly_review_completed", {
          weekKey: currentWeekKey,
          items: reviewItems.length,
        });
        setProgress((previous) => ({
          ...previous,
          lastBossReviewWeek: currentWeekKey,
          bossReviewsCompleted: previous.bossReviewsCompleted + 1,
        }));
      }
      setIsReviewing(false);
      setReviewMode("daily");
      reviewSessionStatsRef.current = { attempts: 0, correct: 0 };
    }
  };

  const handleStartDailyReview = () => {
    if (dueItemsForObjective.length === 0) return;
    reviewSessionStartRef.current = Date.now();
    reviewSessionStatsRef.current = { attempts: 0, correct: 0 };
    hasShownTimeBoxAlertRef.current = false;
    setReviewMode("daily");

    const sessionItems = shuffleItems(dueItemsForObjective).slice(
      0,
      settings.srsSessionLimit,
    );

    setReviewItems(sessionItems);
    setCurrentIndex(0);
    setIsReviewing(true);
    trackAnalyticsEvent("session_start", {
      mode: "daily",
      objective: practiceObjective,
      items: sessionItems.length,
    });
    setWeeklyActivity((previous) => {
      const safePrevious =
        previous.weekKey === currentWeekKey
          ? previous
          : createDefaultWeeklyActivity(currentWeekKey);
      return {
        ...safePrevious,
        sessions: safePrevious.sessions + 1,
      };
    });
  };

  const handleStartBossReview = () => {
    if (bossReviewItemsForObjective.length === 0) return;
    reviewSessionStartRef.current = Date.now();
    reviewSessionStatsRef.current = { attempts: 0, correct: 0 };
    hasShownTimeBoxAlertRef.current = false;
    setReviewMode("boss");

    const sessionItems = shuffleItems(bossReviewItemsForObjective);

    setReviewItems(sessionItems);
    setCurrentIndex(0);
    setIsReviewing(true);
    trackAnalyticsEvent("session_start", {
      mode: "boss",
      objective: practiceObjective,
      items: sessionItems.length,
    });
    setWeeklyActivity((previous) => {
      const safePrevious =
        previous.weekKey === currentWeekKey
          ? previous
          : createDefaultWeeklyActivity(currentWeekKey);
      return {
        ...safePrevious,
        sessions: safePrevious.sessions + 1,
      };
    });
  };

  const handleFinishSessionEarly = () => {
    const sessionDurationMs = reviewSessionStartRef.current
      ? Date.now() - reviewSessionStartRef.current
      : 0;
    trackAnalyticsEvent("session_end", {
      mode: reviewMode,
      completed: false,
      durationSeconds: Math.round(sessionDurationMs / 1000),
      attempts: reviewSessionStatsRef.current.attempts,
      correct: reviewSessionStatsRef.current.correct,
    });
    if (reviewSessionStartRef.current) {
      const sessionMinutes = Math.max(1, Math.round(sessionDurationMs / 60000));
      setWeeklyActivity((previous) => {
        const safePrevious =
          previous.weekKey === currentWeekKey
            ? previous
            : createDefaultWeeklyActivity(currentWeekKey);
        return {
          ...safePrevious,
          studyMinutes: safePrevious.studyMinutes + sessionMinutes,
        };
      });
      reviewSessionStartRef.current = null;
    }
    reviewSessionStatsRef.current = { attempts: 0, correct: 0 };
    setIsReviewing(false);
    setReviewMode("daily");
  };

  if (isReviewing && reviewItems[currentIndex]) {
    return (
      <>
        <ReviewSession
          item={reviewItems[currentIndex]}
          progress={{ current: currentIndex + 1, total: reviewItems.length }}
          onComplete={handleReviewComplete}
          onFinishSession={handleFinishSessionEarly}
          onPlayAudio={onPlayWord}
          onSpeakingUsed={() =>
            trackAnalyticsEvent("speaking_used", { source: "review_audio" })
          }
        />
        <Modal
          isOpen={showTimeBoxAlert}
          onClose={() => setShowTimeBoxAlert(false)}
        >
          <div className="p-2">
            <h2 className="text-xl font-bold mb-4 text-text-primary">
              Time limit reached ⏳
            </h2>
            <p className="text-surface-600 dark:text-surface-400 mb-6 font-medium">
              You've been studying for {settings.srsTimeBoxMinutes} minutes.
              It's a good time to take a small break. Do you want to pause your
              session or keep going?
            </p>
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 w-full">
              <Button
                variant="ghost"
                onClick={() => {
                  setShowTimeBoxAlert(false);
                  handleFinishSessionEarly();
                }}
              >
                End Session
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setShowTimeBoxAlert(false);
                }}
              >
                Keep Going
              </Button>
            </div>
          </div>
        </Modal>
      </>
    );
  }

  const masteredCount = deckList.filter((i) => i.status === "mastered").length;
  const newCount = deckList.filter((i) => i.status === "new").length;
  const learningCount = deckList.filter((i) => i.status === "learning").length;
  const totalInDeck = deckList.length;
  const progressPercent =
    totalInDeck > 0 ? ((learningCount + masteredCount) / totalInDeck) * 100 : 0;
  const weeklyAccuracy =
    weeklyActivity.attempts > 0
      ? Math.round((weeklyActivity.correct / weeklyActivity.attempts) * 100)
      : 0;
  const showMobileActions = isMobileActionsVisible && !isAddOpen && !isEditOpen;

  const starterSections = [
    {
      title: "🚀 High-Frequency Starter Kit",
      items: starterKits.highFrequency,
      theme: starterSectionThemes[0],
    },
    {
      title: "💼 Work & Interview Essentials",
      items: starterKits.workInterview,
      theme: starterSectionThemes[1],
    },
    {
      title: "🧳 Travel & Emergency Essentials",
      items: starterKits.travelEmergencies,
      theme: starterSectionThemes[2],
    },
    {
      title: "⚠️ Common Mistakes (Spanish Speakers)",
      items: starterKits.commonMistakesEs,
      theme: starterSectionThemes[3],
    },
  ];

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
      className="flex-1 overflow-y-auto overscroll-y-contain bg-background p-4 sm:p-8 pb-4 sm:pb-8"
      onScroll={handleContainerScroll}
    >
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        <div className="space-y-4">
          <ViewToolbar
            className="overflow-hidden rounded-[2rem] border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.22),_transparent_42%),linear-gradient(135deg,rgba(15,23,42,0.96),rgba(15,23,42,0.86))] shadow-[0_30px_90px_-45px_rgba(14,165,233,0.65)]"
            left={
              <div className="space-y-4">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-black uppercase tracking-[0.28em] text-sky-100">
                  Card-first flow
                </div>
                <h1 className="text-3xl sm:text-5xl font-black tracking-tighter text-white mb-3 sm:mb-4">
                  Vocabulary Vault
                </h1>
                <p className="-mt-2 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                  Un deck m&aacute;s visual y m&aacute;s t&aacute;ctil, con
                  prioridad en escaneo r&aacute;pido y sensaci&oacute;n de
                  movimiento en m&oacute;vil.
                </p>
                <nav className="flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory md:flex-wrap md:overflow-visible">
                  <button
                    onClick={() => setActiveTab("study")}
                    className={`min-h-[52px] min-w-[150px] snap-start rounded-[1.25rem] border px-4 py-3 text-left text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 active:scale-[0.98] md:min-w-0 md:flex-1 ${activeTab === "study" ? "border-sky-300/30 bg-white text-slate-950 shadow-[0_16px_40px_-24px_rgba(255,255,255,0.9)]" : "border-white/10 bg-white/5 text-slate-200 hover:border-white/20 hover:bg-white/10"}`}
                    aria-pressed={activeTab === "study"}
                  >
                    Daily Study
                  </button>
                  <button
                    onClick={() => setActiveTab("collection")}
                    className={`min-h-[52px] min-w-[170px] snap-start rounded-[1.25rem] border px-4 py-3 text-left text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 active:scale-[0.98] md:min-w-0 md:flex-1 ${activeTab === "collection" ? "border-sky-300/30 bg-white text-slate-950 shadow-[0_16px_40px_-24px_rgba(255,255,255,0.9)]" : "border-white/10 bg-white/5 text-slate-200 hover:border-white/20 hover:bg-white/10"}`}
                    aria-pressed={activeTab === "collection"}
                  >
                    My Collection ({totalInDeck})
                  </button>
                  <button
                    onClick={() => setActiveTab("sync")}
                    className={`min-h-[52px] min-w-[160px] snap-start rounded-[1.25rem] border px-4 py-3 text-left text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 active:scale-[0.98] md:min-w-0 md:flex-1 ${activeTab === "sync" ? "border-sky-300/30 bg-white text-slate-950 shadow-[0_16px_40px_-24px_rgba(255,255,255,0.9)]" : "border-white/10 bg-white/5 text-slate-200 hover:border-white/20 hover:bg-white/10"}`}
                    aria-pressed={activeTab === "sync"}
                  >
                    Backup & Sync 🔄
                  </button>
                </nav>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.28em] text-slate-400">
                      Due today
                    </p>
                    <p className="mt-2 text-3xl font-black text-white">
                      {dueItemsForObjective.length}
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.28em] text-slate-400">
                      Deck progress
                    </p>
                    <p className="mt-2 text-3xl font-black text-sky-300">
                      {Math.round(progressPercent)}%
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.28em] text-slate-400">
                      Streak
                    </p>
                    <p className="mt-2 text-3xl font-black text-amber-300">
                      {progress.currentStreak}
                    </p>
                  </div>
                </div>
              </div>
            }
            right={
              <div className="grid w-full gap-3 md:min-w-[320px]">
                <Button
                  onClick={() => {
                    resetAddForm();
                    setIsAddOpen(true);
                  }}
                  size="lg"
                  variant="secondary"
                  className="min-h-[56px] rounded-[1.25rem] border-white/10 bg-white/10 text-white hover:bg-white hover:text-slate-950"
                >
                  + Add Word
                </Button>
                <Button
                  onClick={handleStartDailyReview}
                  disabled={dueItemsForObjective.length === 0}
                  size="lg"
                  variant={
                    dueItemsForObjective.length > 0 ? "primary" : "secondary"
                  }
                  className={`font-black min-h-[56px] rounded-[1.25rem] ${dueItemsForObjective.length > 0 ? "scale-[1.01] shadow-[0_20px_50px_-24px_rgba(56,189,248,0.95)]" : ""}`}
                >
                  {dueItemsForObjective.length > 0
                    ? `Review Now (${dueItemsForObjective.length})`
                    : practiceObjective === "all"
                      ? "All caught up!"
                      : "No cards for objective"}
                </Button>
                <Button
                  onClick={handleStartBossReview}
                  disabled={
                    bossReviewItemsForObjective.length === 0 ||
                    bossReviewCompletedThisWeek
                  }
                  size="lg"
                  variant={
                    bossReviewItemsForObjective.length > 0 &&
                    !bossReviewCompletedThisWeek
                      ? "success"
                      : "secondary"
                  }
                  className="font-black min-h-[56px] rounded-[1.25rem]"
                >
                  {bossReviewCompletedThisWeek
                    ? "Boss Review ✓"
                    : `Boss Review (${bossReviewItemsForObjective.length})`}
                </Button>
              </div>
            }
          />
          {activeTab === "study" && (
            <div className="rounded-[1.75rem] border border-border/70 bg-surface-1/85 p-3 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.7)]">
              <div className="flex gap-3 overflow-x-auto pb-1 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible">
                <button
                  onClick={() => setPracticeObjective("all")}
                  className={`min-h-[92px] min-w-[220px] snap-start rounded-[1.4rem] border px-4 py-4 text-left text-xs font-bold uppercase tracking-widest transition-all duration-300 active:scale-[0.98] md:min-w-0 ${practiceObjective === "all" ? "border-accent/40 bg-accent text-slate-900 shadow-[0_20px_45px_-28px_rgba(14,165,233,0.95)]" : "border-border bg-surface-2/80 text-text-secondary hover:-translate-y-0.5 hover:border-accent/20"}`}
                  aria-label="Objective all"
                >
                  <span className="block text-[10px] tracking-[0.28em] opacity-70">
                    Practice objective
                  </span>
                  <span className="mt-2 block text-lg font-black tracking-tight normal-case">
                    All
                  </span>
                  <span className="mt-1 block text-[11px] normal-case tracking-normal opacity-80">
                    Mixed review queue
                  </span>
                </button>
                <button
                  onClick={() => setPracticeObjective("interview")}
                  className={`min-h-[92px] min-w-[220px] snap-start rounded-[1.4rem] border px-4 py-4 text-left text-xs font-bold uppercase tracking-widest transition-all duration-300 active:scale-[0.98] md:min-w-0 ${practiceObjective === "interview" ? "border-accent/40 bg-accent text-slate-900 shadow-[0_20px_45px_-28px_rgba(14,165,233,0.95)]" : "border-border bg-surface-2/80 text-text-secondary hover:-translate-y-0.5 hover:border-accent/20"}`}
                  aria-label="Objective interview"
                >
                  <span className="block text-[10px] tracking-[0.28em] opacity-70">
                    Practice objective
                  </span>
                  <span className="mt-2 block text-lg font-black tracking-tight normal-case">
                    Interview
                  </span>
                  <span className="mt-1 block text-[11px] normal-case tracking-normal opacity-80">
                    Work and business terms
                  </span>
                </button>
                <button
                  onClick={() => setPracticeObjective("travel")}
                  className={`min-h-[92px] min-w-[220px] snap-start rounded-[1.4rem] border px-4 py-4 text-left text-xs font-bold uppercase tracking-widest transition-all duration-300 active:scale-[0.98] md:min-w-0 ${practiceObjective === "travel" ? "border-accent/40 bg-accent text-slate-900 shadow-[0_20px_45px_-28px_rgba(14,165,233,0.95)]" : "border-border bg-surface-2/80 text-text-secondary hover:-translate-y-0.5 hover:border-accent/20"}`}
                  aria-label="Objective travel"
                >
                  <span className="block text-[10px] tracking-[0.28em] opacity-70">
                    Practice objective
                  </span>
                  <span className="mt-2 block text-lg font-black tracking-tight normal-case">
                    Travel
                  </span>
                  <span className="mt-1 block text-[11px] normal-case tracking-normal opacity-80">
                    Trips and emergencies
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>

        {activeTab === "study" && (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[320px_minmax(0,1fr)] animate-fade-in">
            <div className="space-y-5">
              <Card
                elevated
                className="overflow-hidden rounded-[2rem] border-white/10 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.16),_transparent_30%),linear-gradient(180deg,rgba(15,23,42,0.98),rgba(15,23,42,0.88))] text-white"
              >
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.28em] mb-6">
                  Learning Pulse
                </h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-slate-400 text-xs font-bold uppercase mb-1">
                        Due for review
                      </p>
                      <span className="text-5xl font-black text-accent">
                        {dueItemsForObjective.length}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-success text-xs font-bold uppercase mb-1">
                        Mastered
                      </p>
                      <span className="text-2xl font-black text-white">
                        {masteredCount}
                      </span>
                    </div>
                  </div>

                  {/* Detailed Stats Breakdown */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between text-xs font-bold uppercase mb-2">
                      <span className="text-slate-400">New: {newCount}</span>
                      <span className="text-accent">
                        Learning: {learningCount}
                      </span>
                      <span className="text-success">
                        Mastered: {masteredCount}
                      </span>
                    </div>
                    <div className="h-4 w-full bg-white/5 rounded-full p-1 border border-white/10 flex overflow-hidden gap-0.5">
                      {totalInDeck > 0 ? (
                        <>
                          <div
                            className="bg-slate-500 h-full rounded-l-full transition-all duration-1000"
                            style={{
                              width: `${(newCount / totalInDeck) * 100}%`,
                            }}
                            title={`New: ${newCount}`}
                          ></div>
                          <div
                            className="bg-accent h-full transition-all duration-1000 shadow-[0_0_10px_rgba(14,165,233,0.5)]"
                            style={{
                              width: `${(learningCount / totalInDeck) * 100}%`,
                            }}
                            title={`Learning: ${learningCount}`}
                          ></div>
                          <div
                            className="bg-success h-full rounded-r-full transition-all duration-1000 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                            style={{
                              width: `${(masteredCount / totalInDeck) * 100}%`,
                            }}
                            title={`Mastered: ${masteredCount}`}
                          ></div>
                        </>
                      ) : (
                        <div className="bg-white/10 h-full w-full rounded-full"></div>
                      )}
                    </div>
                  </div>

                  <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">
                    {learningCount + masteredCount} of {totalInDeck} words
                    started
                  </p>
                  <p className="text-[10px] text-center text-amber-400 font-bold uppercase tracking-widest">
                    {progress.currentStreak} day streak · best{" "}
                    {progress.bestStreak}
                  </p>
                  <p className="text-[10px] text-center text-success font-bold uppercase tracking-widest">
                    Boss weekly:{" "}
                    {bossReviewCompletedThisWeek ? "completed" : "pending"}
                  </p>
                </div>
              </Card>
              <div className="grid grid-cols-3 gap-3">
                <Card className="rounded-[1.5rem] border-border/70 bg-surface-1/90 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-text-secondary">
                    Sessions
                  </p>
                  <p className="mt-2 text-2xl font-black text-text-primary">
                    {weeklyActivity.sessions}
                  </p>
                </Card>
                <Card className="rounded-[1.5rem] border-border/70 bg-surface-1/90 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-text-secondary">
                    Accuracy
                  </p>
                  <p className="mt-2 text-2xl font-black text-accent">
                    {weeklyAccuracy}%
                  </p>
                </Card>
                <Card className="rounded-[1.5rem] border-border/70 bg-surface-1/90 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-text-secondary">
                    Minutes
                  </p>
                  <p className="mt-2 text-2xl font-black text-text-primary">
                    {weeklyActivity.studyMinutes}
                  </p>
                </Card>
              </div>
              <div className="bg-[linear-gradient(145deg,rgba(245,158,11,0.18),rgba(15,23,42,0.9))] border border-amber-500/20 rounded-[2rem] p-6">
                <h4 className="text-amber-200 font-bold text-sm mb-2 uppercase tracking-[0.24em]">
                  💡 Zamir's Study Tip
                </h4>
                <p className="text-amber-50/85 text-sm leading-relaxed">
                  Add whole sentences as "Context" to help you remember how to
                  use the word!
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {starterSections.map((section) => (
                <section
                  key={section.title}
                  className={cn(
                    "overflow-hidden rounded-[2rem] border bg-surface-1/90 p-4 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.9)] sm:p-6",
                    section.theme.accentClass,
                  )}
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.28em] text-text-secondary mb-2">
                    {section.theme.eyebrow}
                  </p>
                  <h2 className="text-xl sm:text-2xl font-black text-text-primary mb-2 flex items-center gap-3">
                    {section.title}
                  </h2>
                  <p className="mb-5 max-w-2xl text-sm text-text-secondary">
                    {section.theme.description}
                  </p>
                  <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory sm:mx-0 sm:grid sm:grid-cols-2 sm:px-0 sm:overflow-visible xl:grid-cols-3">
                    {section.items.map((item) => (
                      <div
                        key={item.word}
                        className="min-w-[82vw] snap-center sm:min-w-0"
                      >
                        <div className="group relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-surface-1/95 p-5 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.95)] transition duration-300 ease-out will-change-transform md:hover:-translate-y-1 md:hover:-rotate-1 active:translate-x-1 active:rotate-1">
                          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-br from-white/10 via-white/5 to-transparent"></div>
                          <div className="relative flex h-full flex-col justify-between">
                            <div className="flex justify-between items-start gap-3">
                              <div>
                                <h4 className="text-xl font-black text-text-primary group-hover:text-accent transition-colors">
                                  {item.word}
                                </h4>
                                <p className="mt-2 text-sm text-text-secondary line-clamp-3 leading-relaxed">
                                  {item.definition}
                                </p>
                                {item.tags.join(" · ")}
                              </div>
                              <button
                                onClick={() => handleAddToDeck(item)}
                                disabled={!!deck[item.word.toLowerCase()]}
                                className={cn(
                                  "relative w-11 h-11 rounded-2xl flex items-center justify-center transition-all shrink-0",
                                  deck[item.word.toLowerCase()]
                                    ? "bg-success/20 text-success"
                                    : section.theme.buttonClass,
                                )}
                                aria-label={`Add ${item.word} to deck`}
                              >
                                {deck[item.word.toLowerCase()] ? "✓" : "+"}
                              </button>
                            </div>
                            {item.tags?.length ? (
                              <p className="text-[10px] text-text-muted mt-5 uppercase tracking-widest font-bold"></p>
                            ) : (
                              <p className="text-[10px] text-text-muted mt-5 uppercase tracking-widest font-bold">
                                Tap to save this card
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        )}

        {activeTab === "collection" && (
          <div className="animate-fade-in space-y-6">
            {totalInDeck === 0 ? (
              <Card className="p-12 text-center flex flex-col items-center justify-center border-dashed border-2 border-border/80 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.14),_transparent_38%),rgba(15,23,42,0.02)] backdrop-blur-sm animate-fade-in shadow-[0_24px_80px_-45px_rgba(15,23,42,0.85)] rounded-[2rem]">
                <div className="w-24 h-24 bg-surface-2/90 rounded-full flex items-center justify-center mb-6 shadow-inner ring-4 ring-surface-1 transform hover:scale-110 transition-transform">
                  <span className="text-4xl drop-shadow-sm">🗃️</span>
                </div>
                <h2 className="text-2xl font-black text-text-primary mb-3">
                  Your Vault is empty
                </h2>
                <p className="text-text-secondary text-base mb-8 max-w-sm mx-auto leading-relaxed">
                  Import our curated sample deck to get started immediately, or
                  add your first word manually.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md">
                  <Button
                    onClick={handleImportSample}
                    variant="secondary"
                    size="lg"
                    className="flex-1 py-4 text-base shadow-sm"
                  >
                    Import Sample
                  </Button>
                  <Button
                    onClick={() => {
                      resetAddForm();
                      setIsAddOpen(true);
                    }}
                    variant="primary"
                    size="lg"
                    className="flex-1 py-4 text-base"
                  >
                    + Add Word
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="relative flex-1 mb-8 rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.14),_transparent_35%),linear-gradient(180deg,rgba(15,23,42,0.98),rgba(15,23,42,0.86))] p-5 shadow-[0_24px_80px_-45px_rgba(15,23,42,0.95)]">
                <p className="mb-4 text-[10px] font-black uppercase tracking-[0.28em] text-slate-400">
                  Search and filter
                </p>
                <Input
                  id="vault-search-input"
                  type="text"
                  placeholder="Search by word, definition or tag... (Press / to focus)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-6 pr-12 py-4 rounded-[1.4rem] border-white/10 bg-white/10 text-white placeholder:text-slate-400"
                  aria-label="Search vault words"
                />

                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`p-2 rounded-xl focus:outline-none transition-colors ${showFilters ? "bg-accent/20 text-accent" : "text-slate-300 hover:bg-white/10 hover:text-slate-900"}`}
                    title="Advanced Filters"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      />
                    </svg>
                  </button>
                  {searchTerm && (
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        document.getElementById("vault-search-input")?.focus();
                      }}
                      className="text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                      aria-label="Clear search"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            )}

            {showFilters && totalInDeck > 0 && (
              <div className="bg-surface-1/90 border border-border/70 rounded-[1.75rem] p-5 mt-2 mb-6 animate-fade-in flex flex-wrap gap-4 items-end shadow-[0_20px_50px_-35px_rgba(15,23,42,0.7)]">
                <div className="flex-1 min-w-[120px]">
                  <label className="block text-xs font-bold text-text-secondary uppercase mb-1">
                    State
                  </label>
                  <select
                    value={searchFilters.states[0] || ""}
                    onChange={(e) =>
                      setSearchFilters((f) => ({
                        ...f,
                        states: e.target.value ? [e.target.value as any] : [],
                      }))
                    }
                    className="w-full bg-surface-2 border border-border text-text-primary text-sm rounded-xl p-2.5 outline-none focus:ring-1 focus:ring-focus"
                  >
                    <option value="">All States</option>
                    <option value="new">New</option>
                    <option value="learning">Learning</option>
                    <option value="mastered">Mastered</option>
                  </select>
                </div>
                <div className="flex-1 min-w-[120px]">
                  <label className="block text-xs font-bold text-text-secondary uppercase mb-1">
                    Difficulty
                  </label>
                  <select
                    value={searchFilters.difficulty}
                    onChange={(e) =>
                      setSearchFilters((f) => ({
                        ...f,
                        difficulty: e.target.value as any,
                      }))
                    }
                    className="w-full bg-surface-2 border border-border text-text-primary text-sm rounded-xl p-2.5 outline-none focus:ring-1 focus:ring-focus"
                  >
                    <option value="all">All Difficulties</option>
                    <option value="hard">Hard (Low EF)</option>
                    <option value="medium">Medium</option>
                    <option value="easy">Easy (High Interval)</option>
                  </select>
                </div>
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-xs font-bold text-text-secondary uppercase mb-1">
                    Tags (Comma sep)
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g. Travel, Verb"
                    value={searchFilters.tags.join(", ")}
                    onChange={(e) =>
                      setSearchFilters((f) => ({
                        ...f,
                        tags: e.target.value
                          .split(",")
                          .map((t) => t.trim())
                          .filter(Boolean),
                      }))
                    }
                    className="w-full p-2.5 text-sm rounded-xl"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setSearchFilters({
                      tags: [],
                      states: [],
                      dateRange: null,
                      difficulty: "all",
                    })
                  }
                  className="mb-0.5 whitespace-nowrap"
                >
                  Clear Filters
                </Button>
              </div>
            )}
            {totalInDeck > 0 && (
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 rounded-[1.75rem] border border-border/70 bg-surface-1/90 p-4 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.7)]">
                <div className="text-sm text-text-secondary flex items-center gap-2">
                  Showing {searchResults.length} of {totalInDeck} words
                  {isSearching && <span className="animate-pulse">...</span>}
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-surface-2 p-1 rounded-xl border border-border">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-surface-1 text-accent shadow-sm" : "text-text-secondary hover:text-text-primary"}`}
                      title="Grid View"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-surface-1 text-accent shadow-sm" : "text-text-secondary hover:text-text-primary"}`}
                      title="List View"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="sort-select"
                      className="text-xs font-bold text-text-secondary uppercase"
                    >
                      Sort by:
                    </label>
                    <select
                      id="sort-select"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-surface-2 border border-border text-text-primary text-sm rounded-xl focus:ring-focus focus:border-focus block p-2.5 outline-none"
                    >
                      <option value="alphabetical">Alphabetical (A-Z)</option>
                      <option value="strength">Memory Strength</option>
                      <option value="newest">Needs Review First</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            {totalInDeck > 0 && (
              <div
                style={{
                  height: `${rowVirtualizer.getTotalSize()}px`,
                  width: "100%",
                  position: "relative",
                }}
              >
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                  const fromIndex =
                    viewMode === "grid"
                      ? virtualRow.index * columnCount
                      : virtualRow.index;
                  const toIndex =
                    viewMode === "grid"
                      ? Math.min(fromIndex + columnCount, searchResults.length)
                      : fromIndex + 1;
                  const rowItems = searchResults.slice(fromIndex, toIndex);

                  return (
                    <div
                      key={virtualRow.key}
                      data-index={virtualRow.index}
                      ref={rowVirtualizer.measureElement}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                      className={
                        viewMode === "grid"
                          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4"
                          : "flex flex-col gap-3 pb-4"
                      }
                    >
                      {rowItems.map(({ item, matches }) => (
                        <div
                          key={item.word}
                          className={`overflow-hidden border border-white/10 bg-surface-1/95 p-5 rounded-[1.75rem] shadow-[0_22px_70px_-42px_rgba(15,23,42,0.95)] transition duration-300 ease-out will-change-transform group relative flex md:hover:-translate-y-1 md:hover:-rotate-1 active:translate-y-1 active:rotate-1 ${viewMode === "grid" ? "flex-col" : "flex-row items-center gap-6"}`}
                        >
                          <div
                            className={`flex justify-between items-start ${viewMode === "grid" ? "mb-2" : "flex-1"}`}
                          >
                            <div className="flex items-center gap-2">
                              <h3 className="text-xl font-black text-text-primary">
                                <HighlightedText
                                  text={item.word}
                                  indices={getMatchIndices(matches, "word")}
                                />
                              </h3>
                              <button
                                onClick={() => {
                                  onPlayWord(item.word);
                                  trackAnalyticsEvent("speaking_used", {
                                    source: "collection_audio",
                                    word: item.word,
                                  });
                                }}
                                className="text-text-secondary hover:text-accent rounded"
                                aria-label={`Listen to ${item.word}`}
                              >
                                <PlayIcon className="h-4 w-4" />
                              </button>
                              <SpeechPracticeButton
                                targetText={item.word}
                                onCorrect={() => {}}
                                onUsage={() =>
                                  trackAnalyticsEvent("speaking_used", {
                                    source: "speech_practice",
                                    word: item.word,
                                  })
                                }
                              />
                            </div>
                            {viewMode === "grid" && (
                              <div className="flex items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all">
                                <button
                                  onClick={() =>
                                    handleEditWord(
                                      item.word.trim().toLowerCase(),
                                    )
                                  }
                                  className="p-2 hover:bg-accent/10 text-text-secondary hover:text-accent rounded-xl"
                                  aria-label={`Edit ${item.word}`}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => handleDelete(item.word)}
                                  className="p-2 hover:bg-red-500/10 text-text-secondary hover:text-red-400 rounded-xl"
                                  aria-label={`Delete ${item.word}`}
                                >
                                  <TrashIcon />
                                </button>
                              </div>
                            )}
                          </div>

                          <div
                            className={`${viewMode === "grid" ? "flex flex-wrap gap-1 mb-3" : "hidden"}`}
                          >
                            {item.partOfSpeech && (
                              <Badge className="uppercase">
                                {item.partOfSpeech}
                              </Badge>
                            )}
                            {item.tags?.map((tag) => (
                              <Badge key={tag} variant="accent">
                                <HighlightedText
                                  text={tag}
                                  indices={getMatchIndices(matches, "tags")}
                                />
                              </Badge>
                            ))}
                          </div>

                          <p
                            className={`text-text-secondary text-sm italic ${viewMode === "grid" ? "mb-4 line-clamp-2 flex-1" : "flex-1 line-clamp-1"}`}
                          >
                            "
                            <HighlightedText
                              text={item.definition}
                              indices={getMatchIndices(matches, "definition")}
                            />
                            "
                          </p>

                          <div
                            className={`${viewMode === "grid" ? "w-full" : "w-48 flex flex-col justify-center"}`}
                          >
                            <div className="flex justify-between items-center text-[10px] font-black uppercase text-text-secondary">
                              <span>Strength</span>
                              <span
                                className={
                                  item.status === "mastered"
                                    ? "text-success"
                                    : "text-accent"
                                }
                              >
                                {item.status}
                              </span>
                            </div>
                            <MemoryBar interval={item.interval} />
                          </div>

                          {viewMode === "list" && (
                            <div className="flex items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all ml-4">
                              <button
                                onClick={() =>
                                  handleEditWord(item.word.trim().toLowerCase())
                                }
                                className="p-2 hover:bg-accent/10 text-text-secondary hover:text-accent rounded-xl"
                                aria-label={`Edit ${item.word}`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                  />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDelete(item.word)}
                                className="p-2 hover:bg-red-500/10 text-text-secondary hover:text-red-400 rounded-xl"
                                aria-label={`Delete ${item.word}`}
                              >
                                <TrashIcon />
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === "sync" && (
          <div className="animate-fade-in grid gap-6 max-w-4xl mx-auto py-4 md:grid-cols-2">
            <Card
              className="p-8 rounded-[2rem] border-white/10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.14),_transparent_40%),linear-gradient(180deg,rgba(15,23,42,0.98),rgba(15,23,42,0.86))] text-white"
              elevated
            >
              <h2 className="text-2xl font-black text-white mb-2">
                Export Vault
              </h2>
              <p className="text-slate-300 text-sm mb-6">
                Download a JSON backup with your deck and streak progress.
              </p>
              <Button
                onClick={handleExport}
                variant="primary"
                size="lg"
                fullWidth
                className="font-black"
              >
                DOWNLOAD JSON BACKUP
              </Button>
            </Card>
            <Card className="p-8 rounded-[2rem]" elevated>
              <h2 className="text-2xl font-black text-text-primary mb-2">
                Import Vault
              </h2>
              <input
                type="file"
                accept="application/json,.json"
                onChange={handleImportFile}
                className="w-full mb-4 text-sm text-text-secondary"
              />
              <textarea
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder="Paste code here..."
                className="w-full h-32 bg-surface-2 border border-border rounded-2xl p-4 text-text-primary text-xs font-mono mb-4 focus:ring-2 focus:ring-focus outline-none"
              />
              <Button
                onClick={handleImport}
                disabled={!importText.trim()}
                variant="secondary"
                size="lg"
                fullWidth
                className="font-black"
              >
                RESTORE VAULT
              </Button>
            </Card>
          </div>
        )}
      </div>

      <div
        className={`md:hidden fixed left-3 right-3 bottom-[calc(env(safe-area-inset-bottom)+5.25rem)] z-40 transition-all duration-300 ${showMobileActions ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-95 pointer-events-none"}`}
      >
        <div className="bg-surface-1/85 backdrop-blur-2xl border border-white/10 rounded-[1.6rem] p-2 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.95)] flex gap-2">
          <Button
            onClick={() => {
              resetAddForm();
              setIsAddOpen(true);
            }}
            size="md"
            variant="secondary"
            className="flex-1 rounded-[1.1rem] active:translate-y-0.5 active:-rotate-1"
          >
            + Add
          </Button>
          <Button
            onClick={handleStartDailyReview}
            disabled={dueItemsForObjective.length === 0}
            size="md"
            variant={dueItemsForObjective.length > 0 ? "primary" : "secondary"}
            className="flex-1 rounded-[1.1rem] active:translate-y-0.5"
          >
            {dueItemsForObjective.length > 0
              ? `Review (${dueItemsForObjective.length})`
              : "No Due"}
          </Button>
          <Button
            onClick={handleStartBossReview}
            disabled={
              bossReviewItemsForObjective.length === 0 ||
              bossReviewCompletedThisWeek
            }
            size="md"
            variant={
              bossReviewItemsForObjective.length > 0 &&
              !bossReviewCompletedThisWeek
                ? "success"
                : "secondary"
            }
            className="flex-1 rounded-[1.1rem] active:translate-y-0.5 active:rotate-1"
          >
            {bossReviewCompletedThisWeek ? "Boss ✓" : "Boss"}
          </Button>
        </div>
      </div>

      <SlideOver
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Add New Word"
      >
        <div className="space-y-4">
          <div>
            <label
              htmlFor="new-word-input"
              className="block text-xs font-bold text-text-secondary uppercase mb-1 ml-1"
            >
              Word to learn
            </label>
            <div className="flex gap-2">
              <Input
                id="new-word-input"
                type="text"
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
                onKeyDown={handleAddFormKeyDown}
                className="flex-1 p-3"
                placeholder="e.g. Ubiquitous"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="new-context-input"
              className="block text-xs font-bold text-text-secondary uppercase mb-1 ml-1"
            >
              Clue / Scene / Source Sentence (Optional)
            </label>
            <Input
              id="new-context-input"
              type="text"
              value={newContext}
              onChange={(e) => setNewContext(e.target.value)}
              onKeyDown={handleAddFormKeyDown}
              className="p-3 text-sm"
              placeholder="Add a scene you can picture. e.g. 'The land was cracked, dry and turning into desert.'"
            />
          </div>

          <div>
            <label
              htmlFor="new-def-input"
              className="block text-xs font-bold text-text-secondary uppercase mb-1 ml-1"
            >
              Meaning (simple + concrete)
            </label>
            <p className="mb-2 ml-1 text-xs leading-relaxed text-text-secondary">
              Mejor si escribes: traduccion, explicacion simple y una imagen
              mental. Ejemplo: "Desertificacion. Cuando una tierra fertil se
              vuelve desierto por sequia y calor."
            </p>
            <textarea
              id="new-def-input"
              value={newDef}
              onChange={(e) => setNewDef(e.target.value)}
              className="w-full bg-surface-2 border border-border rounded-xl p-3 text-text-primary outline-none focus:ring-2 focus:ring-focus h-24"
              placeholder="Write a meaning you can imagine, not only a synonym or translation."
            />
          </div>

          <div>
            <label
              htmlFor="new-tags-input"
              className="block text-xs font-bold text-text-secondary uppercase mb-1 ml-1"
            >
              Tags (comma separated)
            </label>
            <Input
              id="new-tags-input"
              type="text"
              value={newTags}
              onChange={(e) => setNewTags(e.target.value)}
              onKeyDown={handleAddFormKeyDown}
              className="p-3 text-sm"
              placeholder="e.g. Business, Slang, Idiom"
            />
          </div>
        </div>
        <div className="flex gap-3 mt-8">
          <Button
            onClick={() => setIsAddOpen(false)}
            variant="ghost"
            size="lg"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            disabled={!newWord || !newDef}
            onClick={handleSaveFromModal}
            variant="primary"
            size="lg"
            className="flex-1"
          >
            Save Word
          </Button>
        </div>
      </SlideOver>

      <SlideOver
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Word"
      >
        <div className="space-y-4">
          <div>
            <label
              htmlFor="edit-word-input"
              className="block text-xs font-bold text-text-secondary uppercase mb-1 ml-1"
            >
              Word
            </label>
            <Input
              id="edit-word-input"
              type="text"
              value={editWord}
              onChange={(e) => setEditWord(e.target.value)}
              className="w-full p-3"
            />
          </div>

          <div>
            <label
              htmlFor="edit-context-input"
              className="block text-xs font-bold text-text-secondary uppercase mb-1 ml-1"
            >
              Clue / Scene / Source Sentence
            </label>
            <Input
              id="edit-context-input"
              type="text"
              value={editContext}
              onChange={(e) => setEditContext(e.target.value)}
              className="p-3 text-sm"
              placeholder="Add a concrete scene that helps you picture the word"
            />
          </div>

          <div>
            <label
              htmlFor="edit-def-input"
              className="block text-xs font-bold text-text-secondary uppercase mb-1 ml-1"
            >
              Meaning (simple + concrete)
            </label>
            <p className="mb-2 ml-1 text-xs leading-relaxed text-text-secondary">
              Evita meanings demasiado cortos como sinonimos sueltos. Mejor:
              traduccion + idea simple + escena.
            </p>
            <textarea
              id="edit-def-input"
              value={editDef}
              onChange={(e) => setEditDef(e.target.value)}
              className="w-full bg-surface-2 border border-border rounded-xl p-3 text-text-primary outline-none focus:ring-2 focus:ring-focus h-24"
              placeholder="Example: Threateningly. In a way that makes you feel danger is coming."
            />
          </div>

          <div>
            <label
              htmlFor="edit-tags-input"
              className="block text-xs font-bold text-text-secondary uppercase mb-1 ml-1"
            >
              Tags (comma separated)
            </label>
            <Input
              id="edit-tags-input"
              type="text"
              value={editTags}
              onChange={(e) => setEditTags(e.target.value)}
              className="p-3 text-sm"
            />
          </div>
        </div>
        <div className="flex gap-3 mt-8">
          <Button
            onClick={() => setIsEditOpen(false)}
            variant="ghost"
            size="lg"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            disabled={!editWord || !editDef}
            onClick={handleSaveEdit}
            variant="primary"
            size="lg"
            className="flex-1"
          >
            Save Changes
          </Button>
        </div>
      </SlideOver>
    </div>
  );
};

export default VocabularyVaultView;
