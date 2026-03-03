import React, { useState, useMemo, useEffect, useRef } from "react";
import { SrsVocabularyItem } from "@/types";
import { starterKits } from "@/features/data/vocabularyVault";
import {
  createNewSrsItem,
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

  const handleAddToDeck = (item: {
    word: string;
    definition: string;
    ipa?: string;
    example?: string;
    partOfSpeech?: string;
    tags?: string[];
    originalContext?: string;
  }) => {
    const wordKey = item.word.trim().toLowerCase();
    if (deck[wordKey]) {
      alert("Word already in your vault!");
      return;
    }
    const newItem = {
      ...createNewSrsItem(item.word.trim(), item.definition.trim()),
      ipa: item.ipa,
      example: item.example,
      partOfSpeech: item.partOfSpeech,
      tags: item.tags,
      originalContext: item.originalContext,
    };
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

        setDeck(importedDeck);
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
        acc[item.word.trim().toLowerCase()] = createNewSrsItem(
          item.word,
          item.definition,
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
  const showMobileActions = isMobileActionsVisible && !isAddOpen && !isEditOpen;

  const starterSections = [
    {
      title: "🚀 High-Frequency Starter Kit",
      items: starterKits.highFrequency,
    },
    {
      title: "💼 Work & Interview Essentials",
      items: starterKits.workInterview,
    },
    {
      title: "🧳 Travel & Emergency Essentials",
      items: starterKits.travelEmergencies,
    },
    {
      title: "⚠️ Common Mistakes (Spanish Speakers)",
      items: starterKits.commonMistakesEs,
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
      className="flex-1 overflow-y-auto overscroll-y-contain bg-background p-4 sm:p-8 pb-4 sm:pb-8"
      onScroll={handleContainerScroll}
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <ViewToolbar
            left={
              <div>
                <h1 className="text-3xl sm:text-5xl font-black text-text-primary tracking-tighter mb-3 sm:mb-4">
                  Vocabulary Vault
                </h1>
                <nav className="flex bg-surface-2 p-1.5 rounded-xl border border-border w-full md:w-auto shadow-inner">
                  <button
                    onClick={() => setActiveTab("study")}
                    className={`flex-1 md:flex-none min-h-[40px] px-3 sm:px-5 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-lg transition-all active:scale-[0.98] ${activeTab === "study" ? "bg-surface-1 text-accent shadow-sm" : "text-text-secondary hover:text-text-primary"}`}
                    aria-pressed={activeTab === "study"}
                  >
                    Daily Study
                  </button>
                  <button
                    onClick={() => setActiveTab("collection")}
                    className={`flex-1 md:flex-none min-h-[40px] px-3 sm:px-5 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-lg transition-all active:scale-[0.98] ${activeTab === "collection" ? "bg-surface-1 text-accent shadow-sm" : "text-text-secondary hover:text-text-primary"}`}
                    aria-pressed={activeTab === "collection"}
                  >
                    My Collection ({totalInDeck})
                  </button>
                  <button
                    onClick={() => setActiveTab("sync")}
                    className={`flex-1 md:flex-none min-h-[40px] px-3 sm:px-5 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-lg transition-all active:scale-[0.98] ${activeTab === "sync" ? "bg-surface-1 text-accent shadow-sm" : "text-text-secondary hover:text-text-primary"}`}
                    aria-pressed={activeTab === "sync"}
                  >
                    Backup & Sync 🔄
                  </button>
                </nav>
              </div>
            }
            right={
              <div className="flex gap-3 w-full md:w-auto">
                <Button
                  onClick={() => {
                    resetAddForm();
                    setIsAddOpen(true);
                  }}
                  size="lg"
                  variant="secondary"
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 min-h-[44px]"
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
                  className={`flex-1 md:flex-none font-black flex items-center justify-center gap-3 min-h-[44px] ${dueItemsForObjective.length > 0 ? "scale-105" : ""}`}
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
                  className="flex-1 md:flex-none font-black flex items-center justify-center gap-2 min-h-[44px]"
                >
                  {bossReviewCompletedThisWeek
                    ? "Boss Review ✓"
                    : `Boss Review (${bossReviewItemsForObjective.length})`}
                </Button>
              </div>
            }
          />
          {activeTab === "study" && (
            <div className="mt-3 bg-surface-2 border border-border rounded-xl p-3 flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mr-2">
                Practice objective
              </span>
              <button
                onClick={() => setPracticeObjective("all")}
                className={`min-h-[32px] px-3 rounded-md text-xs font-bold uppercase tracking-widest border transition-colors ${practiceObjective === "all" ? "bg-accent text-white border-accent" : "bg-surface-1 text-text-secondary border-border hover:bg-surface-hover"}`}
                aria-label="Objective all"
              >
                All
              </button>
              <button
                onClick={() => setPracticeObjective("interview")}
                className={`min-h-[32px] px-3 rounded-md text-xs font-bold uppercase tracking-widest border transition-colors ${practiceObjective === "interview" ? "bg-accent text-white border-accent" : "bg-surface-1 text-text-secondary border-border hover:bg-surface-hover"}`}
                aria-label="Objective interview"
              >
                Interview
              </button>
              <button
                onClick={() => setPracticeObjective("travel")}
                className={`min-h-[32px] px-3 rounded-md text-xs font-bold uppercase tracking-widest border transition-colors ${practiceObjective === "travel" ? "bg-accent text-white border-accent" : "bg-surface-1 text-text-secondary border-border hover:bg-surface-hover"}`}
                aria-label="Objective travel"
              >
                Travel
              </button>
            </div>
          )}
        </div>

        {activeTab === "study" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            <div className="lg:col-span-1 space-y-6">
              <Card elevated>
                <h3 className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] mb-6">
                  Learning Pulse
                </h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-text-secondary text-xs font-bold uppercase mb-1">
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
                      <span className="text-2xl font-black text-text-primary">
                        {masteredCount}
                      </span>
                    </div>
                  </div>

                  {/* Detailed Stats Breakdown */}
                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between text-xs font-bold uppercase mb-2">
                      <span className="text-text-secondary">
                        New: {newCount}
                      </span>
                      <span className="text-accent">
                        Learning: {learningCount}
                      </span>
                      <span className="text-success">
                        Mastered: {masteredCount}
                      </span>
                    </div>
                    <div className="h-4 w-full bg-surface-2 rounded-full p-1 border border-border flex overflow-hidden gap-0.5">
                      {totalInDeck > 0 ? (
                        <>
                          <div
                            className="bg-text-muted h-full rounded-l-full transition-all duration-1000"
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
                        <div className="bg-surface-hover h-full w-full rounded-full"></div>
                      )}
                    </div>
                  </div>

                  <p className="text-[10px] text-center text-text-secondary font-bold uppercase tracking-widest">
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
              <div className="bg-gradient-to-br from-amber-600/10 to-orange-600/10 border border-amber-500/20 rounded-3xl p-6">
                <h4 className="text-amber-500 font-bold text-sm mb-2 flex items-center gap-2">
                  💡 Zamir's Study Tip
                </h4>
                <p className="text-text-secondary text-xs leading-relaxed">
                  Add whole sentences as "Context" to help you remember how to
                  use the word!
                </p>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-12">
              {starterSections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-xl font-black text-text-primary mb-6 flex items-center gap-3">
                    {section.title}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {section.items.map((item) => (
                      <div
                        key={item.word}
                        className="bg-surface-1 border border-border p-5 rounded-2xl hover:border-accent/30 transition-all group"
                      >
                        <div className="flex justify-between items-start gap-3">
                          <div>
                            <h4 className="text-lg font-black text-text-primary group-hover:text-accent transition-colors">
                              {item.word}
                            </h4>
                            <p className="text-text-secondary text-xs line-clamp-2">
                              {item.definition}
                            </p>
                            {item.tags?.length ? (
                              <p className="text-[10px] text-text-muted mt-2 uppercase tracking-widest font-bold">
                                {item.tags.join(" · ")}
                              </p>
                            ) : null}
                          </div>
                          <button
                            onClick={() => handleAddToDeck(item)}
                            disabled={!!deck[item.word.toLowerCase()]}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shrink-0 ${deck[item.word.toLowerCase()] ? "bg-success/20 text-success" : "bg-surface-2 text-text-secondary hover:bg-accent hover:text-white"}`}
                            aria-label={`Add ${item.word} to deck`}
                          >
                            {deck[item.word.toLowerCase()] ? "✓" : "+"}
                          </button>
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
              <Card className="p-12 text-center flex flex-col items-center justify-center border-dashed border-2 border-border/80 bg-surface-1/50 backdrop-blur-sm animate-fade-in shadow-xl">
                <div className="w-24 h-24 bg-surface-2 rounded-full flex items-center justify-center mb-6 shadow-inner ring-4 ring-surface-1 transform hover:scale-110 transition-transform">
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
              <div className="relative flex-1 mb-8">
                <Input
                  id="vault-search-input"
                  type="text"
                  placeholder="Search by word, definition or tag... (Press / to focus)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-6 pr-12 py-3"
                  aria-label="Search vault words"
                />

                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`p-1.5 rounded-md focus:outline-none transition-colors ${showFilters ? "bg-accent/20 text-accent" : "text-text-secondary hover:text-text-primary"}`}
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
                      className="text-text-secondary hover:text-text-primary p-1 rounded-full hover:bg-surface-2 transition-colors"
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
              <div className="bg-surface-2 border border-border rounded-xl p-4 mt-2 mb-6 animate-fade-in flex flex-wrap gap-4 items-end">
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
                    className="w-full bg-surface-1 border border-border text-text-primary text-sm rounded-lg p-2 outline-none focus:ring-1 focus:ring-focus"
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
                    className="w-full bg-surface-1 border border-border text-text-primary text-sm rounded-lg p-2 outline-none focus:ring-1 focus:ring-focus"
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
                    className="w-full p-2 text-sm"
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
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                <div className="text-sm text-text-secondary flex items-center gap-2">
                  Showing {searchResults.length} of {totalInDeck} words
                  {isSearching && <span className="animate-pulse">...</span>}
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-surface-2 p-1 rounded-lg border border-border">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-1.5 rounded-md transition-colors ${viewMode === "grid" ? "bg-surface-1 text-accent shadow-sm" : "text-text-secondary hover:text-text-primary"}`}
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
                      className={`p-1.5 rounded-md transition-colors ${viewMode === "list" ? "bg-surface-1 text-accent shadow-sm" : "text-text-secondary hover:text-text-primary"}`}
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
                      className="bg-surface-2 border border-border text-text-primary text-sm rounded-lg focus:ring-focus focus:border-focus block p-2 outline-none"
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
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4"
                    : "flex flex-col gap-3 pb-4"
                }
              >
                {searchResults.map(({ item, matches }) => (
                  <div
                    key={item.word}
                    className={`bg-surface-1 border border-border p-5 rounded-2xl hover:shadow-2xl transition-all group relative flex ${viewMode === "grid" ? "flex-col" : "flex-row items-center gap-6"}`}
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
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                          <button
                            onClick={() =>
                              handleEditWord(item.word.trim().toLowerCase())
                            }
                            className="p-2 hover:bg-accent/10 text-text-secondary hover:text-accent rounded-lg"
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
                            className="p-2 hover:bg-red-500/10 text-text-secondary hover:text-red-400 rounded-lg"
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
                        <Badge className="uppercase">{item.partOfSpeech}</Badge>
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
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all ml-4">
                        <button
                          onClick={() =>
                            handleEditWord(item.word.trim().toLowerCase())
                          }
                          className="p-2 hover:bg-accent/10 text-text-secondary hover:text-accent rounded-lg"
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
                          className="p-2 hover:bg-red-500/10 text-text-secondary hover:text-red-400 rounded-lg"
                          aria-label={`Delete ${item.word}`}
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "sync" && (
          <div className="animate-fade-in space-y-10 max-w-2xl mx-auto py-8">
            <Card className="p-8" elevated>
              <h2 className="text-2xl font-black text-text-primary mb-2">
                Export Vault
              </h2>
              <p className="text-text-secondary text-sm mb-6">
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
            <Card className="p-8" elevated>
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
        className={`md:hidden fixed left-3 right-3 bottom-[calc(env(safe-area-inset-bottom)+5.25rem)] z-40 transition-all duration-200 ${showMobileActions ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0 pointer-events-none"}`}
      >
        <div className="bg-surface-1/95 backdrop-blur border border-border rounded-xl p-2 shadow-xl flex gap-2">
          <Button
            onClick={() => {
              resetAddForm();
              setIsAddOpen(true);
            }}
            size="md"
            variant="secondary"
            className="flex-1"
          >
            + Add
          </Button>
          <Button
            onClick={handleStartDailyReview}
            disabled={dueItemsForObjective.length === 0}
            size="md"
            variant={dueItemsForObjective.length > 0 ? "primary" : "secondary"}
            className="flex-1"
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
            className="flex-1"
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
              Context / Source Sentence (Optional)
            </label>
            <Input
              id="new-context-input"
              type="text"
              value={newContext}
              onChange={(e) => setNewContext(e.target.value)}
              onKeyDown={handleAddFormKeyDown}
              className="p-3 text-sm"
              placeholder="Where did you see it? e.g. 'The wifi was ubiquitous in the city.'"
            />
          </div>

          <div>
            <label
              htmlFor="new-def-input"
              className="block text-xs font-bold text-text-secondary uppercase mb-1 ml-1"
            >
              Definition & Notes
            </label>
            <textarea
              id="new-def-input"
              value={newDef}
              onChange={(e) => setNewDef(e.target.value)}
              className="w-full bg-surface-2 border border-border rounded-xl p-3 text-text-primary outline-none focus:ring-2 focus:ring-focus h-24"
              placeholder="Meaning, Example, etc."
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
              Context / Source Sentence
            </label>
            <Input
              id="edit-context-input"
              type="text"
              value={editContext}
              onChange={(e) => setEditContext(e.target.value)}
              className="p-3 text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="edit-def-input"
              className="block text-xs font-bold text-text-secondary uppercase mb-1 ml-1"
            >
              Definition & Notes
            </label>
            <textarea
              id="edit-def-input"
              value={editDef}
              onChange={(e) => setEditDef(e.target.value)}
              className="w-full bg-surface-2 border border-border rounded-xl p-3 text-text-primary outline-none focus:ring-2 focus:ring-focus h-24"
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
