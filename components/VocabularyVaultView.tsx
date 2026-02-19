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
  const [deck, setDeck] = useState<Record<string, SrsVocabularyItem>>({});
  const [isReviewing, setIsReviewing] = useState(false);
  const [activeTab, setActiveTab] = useState<"study" | "collection" | "sync">(
    "study",
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [progress, setProgress] = useState<VaultProgress>(
    DEFAULT_VAULT_PROGRESS,
  );

  const [importText, setImportText] = useState("");

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newWord, setNewWord] = useState("");
  const [newContext, setNewContext] = useState("");
  const [newDef, setNewDef] = useState("");
  // Removed generatedData logic as AI is gone

  const [reviewItems, setReviewItems] = useState<SrsVocabularyItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("vocab-vault-deck");
    const savedProgress = localStorage.getItem(VAULT_PROGRESS_KEY);
    if (saved) {
      try {
        setDeck(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse deck", e);
      }
    }
    if (savedProgress) {
      try {
        setProgress({
          ...DEFAULT_VAULT_PROGRESS,
          ...JSON.parse(savedProgress),
        });
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    }
  }, []);

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
    return deckList
      .filter(
        (item) =>
          item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.tags &&
            item.tags.some((tag) =>
              tag.toLowerCase().includes(searchTerm.toLowerCase()),
            )),
      )
      .sort((a, b) => a.word.localeCompare(b.word));
  }, [deckList, searchTerm]);

  const handleAddToDeck = (item: {
    word: string;
    definition: string;
    ipa?: string;
    example?: string;
    partOfSpeech?: string;
    tags?: string[];
    originalContext?: string;
  }) => {
    const wordKey = item.word.trim();
    if (deck[wordKey]) {
      alert("Word already in your vault!");
      return;
    }
    const newItem = {
      ...createNewSrsItem(wordKey, item.definition.trim()),
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
  };

  const handleSaveFromModal = () => {
    // Manual entry only
    handleAddToDeck({
      word: newWord,
      definition: newDef,
      originalContext: newContext,
    });
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
      const newDeck = { ...deck };
      delete newDeck[word];
      setDeck(newDeck);
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
        acc[item.word] = createNewSrsItem(item.word, item.definition);
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
    setDeck((prev) => ({ ...prev, [item.word]: updatedItem }));
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
  const learningCount = deckList.filter((i) => i.status !== "new").length;
  const totalInDeck = deckList.length;
  const progressPercent =
    totalInDeck > 0 ? (learningCount / totalInDeck) * 100 : 0;

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
                  <div className="h-4 w-full bg-slate-900/50 rounded-full p-1 border border-slate-700 overflow-hidden">
                    <div
                      className="bg-sky-500 h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(14,165,233,0.5)]"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                  <p className="text-[10px] text-center text-slate-500 font-bold uppercase tracking-widest">
                    {learningCount} of {totalInDeck} words started
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
                          disabled={!!deck[item.word]}
                          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${deck[item.word] ? "bg-emerald-500/20 text-emerald-500" : "bg-slate-800 text-slate-500 hover:bg-sky-600 hover:text-white"}`}
                        >
                          {deck[item.word] ? "✓" : "+"}
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-20">
                {filteredCollection.map((item) => (
                  <div
                    key={item.word}
                    className="bg-slate-800 border border-slate-700 p-5 rounded-2xl hover:shadow-2xl transition-all group relative flex flex-col"
                  >
                    <div className="flex justify-between items-start mb-2">
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
                          onCorrect={() => {
                            // Optional: Mark as reviewed or just show fun animation
                            // confetti?
                          }}
                        />
                      </div>
                      <button
                        onClick={() => handleDelete(item.word)}
                        className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/10 rounded-lg transition-all focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                        aria-label={`Delete ${item.word}`}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.partOfSpeech && (
                        <Badge className="uppercase">{item.partOfSpeech}</Badge>
                      )}
                      {item.tags?.map((tag) => (
                        <Badge key={tag} variant="accent">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2 italic flex-1">
                      "{item.definition}"
                    </p>
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
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">
              Word to learn
            </label>
            <div className="flex gap-2">
              <Input
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
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">
              Context / Source Sentence (Optional)
            </label>
            <Input
              type="text"
              value={newContext}
              onChange={(e) => setNewContext(e.target.value)}
              onKeyDown={handleAddFormKeyDown}
              className="p-3 text-sm text-slate-300"
              placeholder="Where did you see it? e.g. 'The wifi was ubiquitous in the city.'"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">
              Definition & Notes
            </label>
            <textarea
              value={newDef}
              onChange={(e) => setNewDef(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-sky-500 h-24"
              placeholder="Meaning, Example, etc."
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
    </div>
  );
};

export default VocabularyVaultView;
