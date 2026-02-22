import React, { useState, useMemo, useEffect } from "react";
import { SrsVocabularyItem } from "../types";
import { starterKits } from "../data/vocabularyVault";
import {
  createNewSrsItem,
  getDueReviewItems,
  calculateSrsData,
} from "../utils/srs";
import ReviewSession from "./ReviewSession";
import SpeechPracticeButton from "./SpeechPracticeButton";
import { PlayIcon, TrashIcon } from "./Icons";
import Button from "./ui/Button";
import Card from "./ui/Card";
import Badge from "./ui/Badge";
import Input from "./ui/Input";
import Modal from "./ui/Modal";

interface VocabularyVaultViewProps {
  onPlayWord: (text: string) => void;
  confirmDialogsEnabled: boolean;
}

interface VaultProgress {
  currentStreak: number;
  bestStreak: number;
  totalReviews: number;
  lastReviewDate: string | null;
}

const VAULT_PROGRESS_KEY = "vocab-vault-progress";
const DEFAULT_VAULT_PROGRESS: VaultProgress = {
  currentStreak: 0,
  bestStreak: 0,
  totalReviews: 0,
  lastReviewDate: null,
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
      ? "bg-emerald-500"
      : percentage > 40
        ? "bg-sky-500"
        : "bg-amber-500";
  return (
    <div
      className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden mt-2"
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
      return saved
        ? normalizeDeck(JSON.parse(saved) as Record<string, SrsVocabularyItem>)
        : {};
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
      return saved
        ? { ...DEFAULT_VAULT_PROGRESS, ...JSON.parse(saved) }
        : DEFAULT_VAULT_PROGRESS;
    } catch (e) {
      console.error("Failed to load progress from storage", e);
      return DEFAULT_VAULT_PROGRESS;
    }
  });

  const [importText, setImportText] = useState("");

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

  // Removed generatedData logic as AI is gone

  const [reviewItems, setReviewItems] = useState<SrsVocabularyItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    localStorage.setItem("vocab-vault-deck", JSON.stringify(deck));
  }, [deck]);

  useEffect(() => {
    localStorage.setItem(VAULT_PROGRESS_KEY, JSON.stringify(progress));
  }, [progress]);

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

  const deckList = useMemo(
    () => Object.values(deck) as SrsVocabularyItem[],
    [deck],
  );
  const dueItems = useMemo(() => getDueReviewItems(deck), [deck]);

  const filteredCollection = useMemo(() => {
    let filtered = deckList.filter(
      (item) =>
        item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.tags &&
          item.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase()),
          )),
    );

    if (sortBy === "alphabetical") {
      filtered = filtered.sort((a, b) => a.word.localeCompare(b.word));
    } else if (sortBy === "strength") {
      filtered = filtered.sort((a, b) => b.interval - a.interval);
    } else if (sortBy === "newest") {
      // We don't have a creation date, but we can sort by nextReviewDate or just reverse alphabetical as a fallback
      // Let's sort by nextReviewDate descending (newest added usually have nextReviewDate = today)
      filtered = filtered.sort(
        (a, b) =>
          new Date(b.nextReviewDate).getTime() -
          new Date(a.nextReviewDate).getTime(),
      );
    }

    return filtered;
  }, [deckList, searchTerm, sortBy]);

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
      if (parsed && typeof parsed === "object") {
        if ("deck" in parsed) {
          const imported = parsed as {
            deck: Record<string, SrsVocabularyItem>;
            progress?: VaultProgress;
          };
          setDeck(imported.deck || {});
          setProgress(
            imported.progress
              ? { ...DEFAULT_VAULT_PROGRESS, ...imported.progress }
              : DEFAULT_VAULT_PROGRESS,
          );
        } else {
          setDeck(parsed as Record<string, SrsVocabularyItem>);
          setProgress(DEFAULT_VAULT_PROGRESS);
        }
        setImportText("");
        alert("Import successful!");
        setActiveTab("collection");
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

  const handleReviewComplete = (wasCorrect: boolean) => {
    const item = reviewItems[currentIndex];
    const updatedItem = calculateSrsData(item, wasCorrect);
    setDeck((prev) => ({
      ...prev,
      [item.word.trim().toLowerCase()]: updatedItem,
    }));
    setProgress((prev) =>
      updateVaultProgress(prev, new Date().toISOString().split("T")[0]),
    );
    if (currentIndex < reviewItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsReviewing(false);
    }
  };

  if (isReviewing && reviewItems[currentIndex]) {
    return (
      <ReviewSession
        item={reviewItems[currentIndex]}
        progress={{ current: currentIndex + 1, total: reviewItems.length }}
        onComplete={handleReviewComplete}
        onFinishSession={() => setIsReviewing(false)}
        onPlayAudio={onPlayWord}
      />
    );
  }

  const masteredCount = deckList.filter((i) => i.status === "mastered").length;
  const newCount = deckList.filter((i) => i.status === "new").length;
  const learningCount = deckList.filter((i) => i.status === "learning").length;
  const totalInDeck = deckList.length;
  const progressPercent =
    totalInDeck > 0 ? ((learningCount + masteredCount) / totalInDeck) * 100 : 0;

  return (
    <div className="flex-1 overflow-y-auto bg-slate-900 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 border-b border-slate-800 pb-8">
          <div>
            <h1 className="text-5xl font-black text-white tracking-tighter mb-4">
              Vocabulary Vault
            </h1>
            <nav className="flex flex-wrap gap-4">
              <button
                onClick={() => setActiveTab("study")}
                className={`text-xs font-bold uppercase tracking-widest pb-2 transition-all ${activeTab === "study" ? "text-sky-400 border-b-2 border-sky-400" : "text-slate-500 hover:text-slate-300"}`}
              >
                Daily Study
              </button>
              <button
                onClick={() => setActiveTab("collection")}
                className={`text-xs font-bold uppercase tracking-widest pb-2 transition-all ${activeTab === "collection" ? "text-sky-400 border-b-2 border-sky-400" : "text-slate-500 hover:text-slate-300"}`}
              >
                My Collection ({totalInDeck})
              </button>
              <button
                onClick={() => setActiveTab("sync")}
                className={`text-xs font-bold uppercase tracking-widest pb-2 transition-all ${activeTab === "sync" ? "text-amber-400 border-b-2 border-amber-400" : "text-slate-500 hover:text-slate-300"}`}
              >
                Backup & Sync 🔄
              </button>
            </nav>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Button
              onClick={() => {
                resetAddForm();
                setIsAddOpen(true);
              }}
              size="lg"
              variant="secondary"
              className="flex-1 md:flex-none flex items-center justify-center gap-2"
            >
              + Add Word
            </Button>
            <Button
              onClick={() => {
                setReviewItems(dueItems);
                setCurrentIndex(0);
                setIsReviewing(true);
              }}
              disabled={dueItems.length === 0}
              size="lg"
              variant={dueItems.length > 0 ? "primary" : "secondary"}
              className={`flex-1 md:flex-none font-black flex items-center justify-center gap-3 ${dueItems.length > 0 ? "scale-105" : ""}`}
            >
              {dueItems.length > 0
                ? `Review Now (${dueItems.length})`
                : "All caught up!"}
            </Button>
          </div>
        </div>

        {activeTab === "study" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            <div className="lg:col-span-1 space-y-6">
              <Card elevated>
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6">
                  Learning Pulse
                </h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-slate-400 text-xs font-bold uppercase mb-1">
                        Due for review
                      </p>
                      <span className="text-5xl font-black text-sky-400">
                        {dueItems.length}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-400 text-xs font-bold uppercase mb-1">
                        Mastered
                      </p>
                      <span className="text-2xl font-black text-white">
                        {masteredCount}
                      </span>
                    </div>
                  </div>

                  {/* Detailed Stats Breakdown */}
                  <div className="pt-4 border-t border-slate-800">
                    <div className="flex justify-between text-xs font-bold uppercase mb-2">
                      <span className="text-slate-500">New: {newCount}</span>
                      <span className="text-sky-500">
                        Learning: {learningCount}
                      </span>
                      <span className="text-emerald-500">
                        Mastered: {masteredCount}
                      </span>
                    </div>
                    <div className="h-4 w-full bg-slate-900/50 rounded-full p-1 border border-slate-700 flex overflow-hidden gap-0.5">
                      {totalInDeck > 0 ? (
                        <>
                          <div
                            className="bg-slate-600 h-full rounded-l-full transition-all duration-1000"
                            style={{
                              width: `${(newCount / totalInDeck) * 100}%`,
                            }}
                            title={`New: ${newCount}`}
                          ></div>
                          <div
                            className="bg-sky-500 h-full transition-all duration-1000 shadow-[0_0_10px_rgba(14,165,233,0.5)]"
                            style={{
                              width: `${(learningCount / totalInDeck) * 100}%`,
                            }}
                            title={`Learning: ${learningCount}`}
                          ></div>
                          <div
                            className="bg-emerald-500 h-full rounded-r-full transition-all duration-1000 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                            style={{
                              width: `${(masteredCount / totalInDeck) * 100}%`,
                            }}
                            title={`Mastered: ${masteredCount}`}
                          ></div>
                        </>
                      ) : (
                        <div className="bg-slate-800 h-full w-full rounded-full"></div>
                      )}
                    </div>
                  </div>

                  <p className="text-[10px] text-center text-slate-500 font-bold uppercase tracking-widest">
                    {learningCount + masteredCount} of {totalInDeck} words
                    started
                  </p>
                  <p className="text-[10px] text-center text-amber-400 font-bold uppercase tracking-widest">
                    {progress.currentStreak} day streak · best{" "}
                    {progress.bestStreak}
                  </p>
                </div>
              </Card>
              <div className="bg-gradient-to-br from-amber-600/10 to-orange-600/10 border border-amber-500/20 rounded-3xl p-6">
                <h4 className="text-amber-400 font-bold text-sm mb-2 flex items-center gap-2">
                  💡 Zamir's Study Tip
                </h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Add whole sentences as "Context" to help you remember how to
                  use the word!
                </p>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-12">
              <section>
                <h2 className="text-xl font-black text-white mb-6 flex items-center gap-3">
                  🚀 High-Frequency Starter Kit
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {starterKits.highFrequency.map((item) => (
                    <div
                      key={item.word}
                      className="bg-slate-800/40 border border-slate-800 p-5 rounded-2xl hover:border-sky-500/30 transition-all group"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-black text-white group-hover:text-sky-400 transition-colors">
                            {item.word}
                          </h4>
                          <p className="text-slate-500 text-xs line-clamp-2">
                            {item.definition}
                          </p>
                        </div>
                        <button
                          onClick={() => handleAddToDeck(item)}
                          disabled={!!deck[item.word.toLowerCase()]}
                          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${deck[item.word.toLowerCase()] ? "bg-emerald-500/20 text-emerald-500" : "bg-slate-800 text-slate-500 hover:bg-sky-600 hover:text-white"}`}
                        >
                          {deck[item.word.toLowerCase()] ? "✓" : "+"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}

        {activeTab === "collection" && (
          <div className="animate-fade-in space-y-6">
            {totalInDeck === 0 ? (
              <Card className="p-8 text-center">
                <h2 className="text-2xl font-black text-white mb-2">
                  Your Vault is empty
                </h2>
                <p className="text-slate-400 text-sm mb-6">
                  Import sample / Add first word
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    onClick={handleImportSample}
                    variant="secondary"
                    size="lg"
                  >
                    Import sample
                  </Button>
                  <Button
                    onClick={() => {
                      resetAddForm();
                      setIsAddOpen(true);
                    }}
                    variant="primary"
                    size="lg"
                  >
                    Add first word
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="relative flex-1 mb-8">
                <Input
                  id="vault-search-input"
                  type="text"
                  placeholder="Search by word, definition or tag..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-6 py-3"
                  aria-label="Search vault words"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                  🔍
                </div>
              </div>
            )}
            {totalInDeck > 0 && (
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                <div className="text-sm text-slate-400">
                  Showing {filteredCollection.length} of {totalInDeck} words
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-lg border border-slate-700">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-1.5 rounded-md transition-colors ${viewMode === "grid" ? "bg-slate-700 text-sky-400" : "text-slate-500 hover:text-slate-300"}`}
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
                      className={`p-1.5 rounded-md transition-colors ${viewMode === "list" ? "bg-slate-700 text-sky-400" : "text-slate-500 hover:text-slate-300"}`}
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
                      className="text-xs font-bold text-slate-500 uppercase"
                    >
                      Sort by:
                    </label>
                    <select
                      id="sort-select"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-slate-800 border border-slate-700 text-white text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block p-2 outline-none"
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
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-20"
                    : "flex flex-col gap-3 pb-20"
                }
              >
                {filteredCollection.map((item) => (
                  <div
                    key={item.word}
                    className={`bg-slate-800 border border-slate-700 p-5 rounded-2xl hover:shadow-2xl transition-all group relative flex ${viewMode === "grid" ? "flex-col" : "flex-row items-center gap-6"}`}
                  >
                    <div
                      className={`flex justify-between items-start ${viewMode === "grid" ? "mb-2" : "flex-1"}`}
                    >
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-black text-white">
                          {item.word}
                        </h3>
                        <button
                          onClick={() => onPlayWord(item.word)}
                          className="text-slate-500 hover:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded"
                          aria-label={`Listen to ${item.word}`}
                        >
                          <PlayIcon className="h-4 w-4" />
                        </button>
                        <SpeechPracticeButton
                          targetText={item.word}
                          onCorrect={() => {}}
                        />
                      </div>
                      {viewMode === "grid" && (
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                          <button
                            onClick={() =>
                              handleEditWord(item.word.trim().toLowerCase())
                            }
                            className="p-2 hover:bg-sky-500/10 text-slate-400 hover:text-sky-400 rounded-lg focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
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
                            className="p-2 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-lg focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
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
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <p
                      className={`text-slate-400 text-sm italic ${viewMode === "grid" ? "mb-4 line-clamp-2 flex-1" : "flex-1 line-clamp-1"}`}
                    >
                      "{item.definition}"
                    </p>

                    <div
                      className={`${viewMode === "grid" ? "w-full" : "w-48 flex flex-col justify-center"}`}
                    >
                      <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-500">
                        <span>Strength</span>
                        <span
                          className={
                            item.status === "mastered"
                              ? "text-emerald-500"
                              : "text-sky-500"
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
                          className="p-2 hover:bg-sky-500/10 text-slate-400 hover:text-sky-400 rounded-lg focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
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
                          className="p-2 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-lg focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
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
              <h2 className="text-2xl font-black text-white mb-2">
                Export Vault
              </h2>
              <p className="text-slate-400 text-sm mb-6">
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
              <h2 className="text-2xl font-black text-white mb-2">
                Import Vault
              </h2>
              <input
                type="file"
                accept="application/json,.json"
                onChange={handleImportFile}
                className="w-full mb-4 text-sm text-slate-300"
              />
              <textarea
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder="Paste code here..."
                className="w-full h-32 bg-slate-900 border border-slate-700 rounded-2xl p-4 text-slate-300 text-xs font-mono mb-4 focus:ring-2 focus:ring-amber-500 outline-none"
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

      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)}>
        <h2 className="text-2xl font-black text-white mb-4">Add New Word</h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="new-word-input"
              className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1"
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
              className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1"
            >
              Context / Source Sentence (Optional)
            </label>
            <Input
              id="new-context-input"
              type="text"
              value={newContext}
              onChange={(e) => setNewContext(e.target.value)}
              onKeyDown={handleAddFormKeyDown}
              className="p-3 text-sm text-slate-300"
              placeholder="Where did you see it? e.g. 'The wifi was ubiquitous in the city.'"
            />
          </div>

          <div>
            <label
              htmlFor="new-def-input"
              className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1"
            >
              Definition & Notes
            </label>
            <textarea
              id="new-def-input"
              value={newDef}
              onChange={(e) => setNewDef(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-sky-500 h-24"
              placeholder="Meaning, Example, etc."
            />
          </div>

          <div>
            <label
              htmlFor="new-tags-input"
              className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1"
            >
              Tags (comma separated)
            </label>
            <Input
              id="new-tags-input"
              type="text"
              value={newTags}
              onChange={(e) => setNewTags(e.target.value)}
              onKeyDown={handleAddFormKeyDown}
              className="p-3 text-sm text-slate-300"
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
      </Modal>

      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
        <h2 className="text-2xl font-black text-white mb-4">Edit Word</h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="edit-word-input"
              className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1"
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
              className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1"
            >
              Context / Source Sentence
            </label>
            <Input
              id="edit-context-input"
              type="text"
              value={editContext}
              onChange={(e) => setEditContext(e.target.value)}
              className="p-3 text-sm text-slate-300"
            />
          </div>

          <div>
            <label
              htmlFor="edit-def-input"
              className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1"
            >
              Definition & Notes
            </label>
            <textarea
              id="edit-def-input"
              value={editDef}
              onChange={(e) => setEditDef(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-sky-500 h-24"
            />
          </div>

          <div>
            <label
              htmlFor="edit-tags-input"
              className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1"
            >
              Tags (comma separated)
            </label>
            <Input
              id="edit-tags-input"
              type="text"
              value={editTags}
              onChange={(e) => setEditTags(e.target.value)}
              className="p-3 text-sm text-slate-300"
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
      </Modal>
    </div>
  );
};

export default VocabularyVaultView;
