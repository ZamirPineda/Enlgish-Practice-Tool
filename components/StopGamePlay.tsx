import React, { useState, useEffect, useMemo, useCallback } from "react";
import { stopGameData } from "../data/stopGameData";
import { StopCategory } from "../types";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import {
  GroupName,
  CATEGORY_GROUPS,
  PREDEFINED_ALL_ORDER,
  RELAXED_CATEGORIES,
  NORMAL_CATEGORIES,
  getCategoryIcon,
  getCategoryTheme,
} from "../utils/stopGameHelpers";
import { playGameSound } from "../utils/audioUtils";
import {
  levenshteinDistance,
  getToleranceForWordStr,
} from "../utils/stringUtils";
import Card from "./ui/Card";
import Input from "./ui/Input";
import Button from "./ui/Button";

interface StopGamePlayProps {
  onPlayWord: (word: string) => void;
  onAddToVault: (
    word: string,
    definition: string,
    options?: { category?: string; tags?: string[] },
  ) => void;
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const StopGamePlay: React.FC<StopGamePlayProps> = ({
  onPlayWord,
  onAddToVault,
}) => {
  const [selectedGroup, setSelectedGroup] = useState<GroupName>("All");
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentLetter, setCurrentLetter] = useState<string>("");
  const [currentCategory, setCurrentCategory] = useState<StopCategory | "">("");
  const [inputValue, setInputValue] = useState("");
  const [score, setScore] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [gameStats, setGameStats] = useState<{
    correct: number;
    skipped: number;
    incorrect: number;
    history: {
      letter: string;
      category: string;
      word: string;
      status: "correct" | "skipped" | "incorrect" | "self-corrected";
    }[];
  }>({ correct: 0, skipped: 0, incorrect: 0, history: [] });

  const [showSummary, setShowSummary] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<15 | 30 | 60>(30);
  const [categoryDifficulty, setCategoryDifficulty] = useState<
    "Relaxed" | "Normal" | "Hard"
  >("Normal");
  const [hintedWord, setHintedWord] = useState<{
    word: string;
    definition?: string;
    translation?: string;
  } | null>(null);
  const [waitingForContinue, setWaitingForContinue] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | "info";
    message: string;
    isTimeout?: boolean;
    isSkip?: boolean;
  } | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Timer Countdown Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (
      isPlaying &&
      !feedback &&
      !showSummary &&
      !waitingForContinue &&
      timeLeft > 0
    ) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            return 0;
          }
          // Sound effect for last few seconds
          if (prev <= 6) {
            playGameSound("tick");
          }
          return prev - 1;
        });
      }, 1000);
    } else if (
      timeLeft === 0 &&
      isPlaying &&
      !feedback &&
      !showSummary &&
      !waitingForContinue
    ) {
      // Handle timeout immediately when 0 is reached
      handleFailOrSkip(false, true);
    }
    return () => clearInterval(interval);
  }, [isPlaying, feedback, showSummary, waitingForContinue, timeLeft]);

  // --- Voice Logic ---
  const handleTranscript = useCallback((transcript: string) => {
    // Basic cleanup: remove trailing periods, trim
    const clean = transcript.replace(/[.,;!?]+$/, "").trim();
    if (clean) {
      setInputValue(clean);
    }
  }, []);

  const {
    micState,
    startListening,
    stopListening,
    interimTranscript,
    resetTranscript,
    finalTranscript,
  } = useSpeechRecognition(handleTranscript, undefined, {
    continuousResults: false,
  });

  // Update input while speaking (interim)
  useEffect(() => {
    if (micState === "listening" && interimTranscript) {
      setInputValue(interimTranscript);
    }
  }, [micState, interimTranscript]);

  const visibleCategories = useMemo(() => {
    let baseCategories: StopCategory[];
    if (selectedGroup === "All") {
      baseCategories = PREDEFINED_ALL_ORDER;
    } else {
      baseCategories = CATEGORY_GROUPS[selectedGroup];
    }

    if (categoryDifficulty === "Relaxed") {
      return baseCategories.filter((c) => RELAXED_CATEGORIES.includes(c));
    } else if (categoryDifficulty === "Normal") {
      return baseCategories.filter((c) => NORMAL_CATEGORIES.includes(c));
    }
    return baseCategories;
  }, [selectedGroup, categoryDifficulty]);

  const pickNextChallenge = () => {
    // Find a valid combination of letter and category that has words
    let validCombinations: { letter: string; category: StopCategory }[] = [];

    ALPHABET.forEach((letter) => {
      const dataForLetter = stopGameData[letter];
      if (dataForLetter) {
        visibleCategories.forEach((category) => {
          if (dataForLetter[category] && dataForLetter[category]!.length > 0) {
            validCombinations.push({ letter, category });
          }
        });
      }
    });

    if (validCombinations.length === 0) {
      setFeedback({
        type: "error",
        message: "No words found for this category group.",
      });
      setIsPlaying(false);
      return;
    }

    const randomCombo =
      validCombinations[Math.floor(Math.random() * validCombinations.length)];
    setCurrentLetter(randomCombo.letter);
    setCurrentCategory(randomCombo.category);
    setInputValue("");
    setHint(null);
    setHintedWord(null);
    setFeedback(null);
    setWaitingForContinue(false);
    // Important: clear the transcript to avoid "ghost" words from previous rounds appearing
    resetTranscript();
    setTimeLeft(difficulty); // Reset Timer
    playGameSound("start");

    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  const startGame = () => {
    setScore(0);
    setCurrentStreak(0);
    setBestStreak(0);
    setGameStats({ correct: 0, skipped: 0, incorrect: 0, history: [] });
    // Stop listening before starting a fresh game to ensure clean state
    stopListening();
    resetTranscript();
    setIsPlaying(true);
    pickNextChallenge();
  };

  const stopGame = () => {
    setIsPlaying(false);
    setInputValue("");
    setHint(null);
    setHintedWord(null);
    setFeedback(null);
    stopListening();
    resetTranscript();
  };

  const handleGetHint = () => {
    // Penality for hint
    setTimeLeft((t) => Math.max(1, t - 5));

    const validWords =
      stopGameData[currentLetter]?.[currentCategory as StopCategory] || [];

    if (validWords.length === 0) {
      setHint("No known words for this combination in our database!");
      return;
    }

    const randomWord =
      validWords[Math.floor(Math.random() * validWords.length)];

    setHintedWord(randomWord);

    if (randomWord.definition) {
      setHint(`💡 Hint: ${randomWord.definition}`);
    } else {
      setHint(
        `💡 Hint: The Spanish translation is "${randomWord.translation}"`,
      );
    }
  };

  const handleFailOrSkip = (isSkip: boolean, isTimeout: boolean = false) => {
    setCurrentStreak(0);
    const validWords =
      stopGameData[currentLetter]?.[currentCategory as StopCategory] || [];
    if (validWords.length > 0) {
      const selectedWordForFeedback =
        hintedWord || validWords[Math.floor(Math.random() * validWords.length)];
      const definition =
        selectedWordForFeedback.definition ||
        selectedWordForFeedback.translation ||
        "";

      playGameSound(isTimeout ? "timeout" : "wrong");

      const messagePrefix = isSkip
        ? "Skipped!"
        : isTimeout
          ? "Time's Out!"
          : "Incorrect!";

      setFeedback({
        type: "error",
        message: `${messagePrefix} A valid answer is: "${selectedWordForFeedback.word}". Added to Vault!`,
        isTimeout,
        isSkip,
      });

      setGameStats((prev) => ({
        ...prev,
        skipped: isSkip ? prev.skipped + 1 : prev.skipped,
        incorrect: !isSkip ? prev.incorrect + 1 : prev.incorrect,
        history: [
          ...prev.history,
          {
            letter: currentLetter,
            category: currentCategory,
            word: selectedWordForFeedback.word, // We save the one we suggested/hinted
            status: isSkip ? "skipped" : "incorrect",
          },
        ],
      }));

      onAddToVault(selectedWordForFeedback.word, definition, {
        category: currentCategory || undefined,
      });

      setWaitingForContinue(true);
    } else {
      setFeedback({
        type: "error",
        message: "No valid words found for this category.",
      });
      setWaitingForContinue(true);
    }
  };

  const handleContinue = () => {
    pickNextChallenge();
  };

  const handleIWasRight = () => {
    if (!inputValue.trim()) return;

    // Add to vault as user-defined
    const word = inputValue.trim();
    onAddToVault(word, "Self-reported valid word", {
      category: currentCategory || undefined,
    });

    // Reverse the "Incorrect" penalty visually and update state
    playGameSound("correct");

    // Recalculate streak and points as if they got it right initially
    // We assume currentStreak was reset to 0 by handleFailOrSkip, so we just treat it as 1 for now (or reset to +1)
    const pointsEarned = 1;

    setScore((s) => s + pointsEarned);
    setCurrentStreak(1);
    setBestStreak((b) => Math.max(b, 1));

    setFeedback({
      type: "success",
      message: `You were right! Added "${word}" to your Vault. +${pointsEarned} point!`,
    });

    // Update history: convert the last 'incorrect' to 'self-corrected'
    setGameStats((prev) => {
      const newHistory = [...prev.history];
      if (newHistory.length > 0) {
        // Find the last incorrect entry and mark it as self-corrected
        const lastEntryIndex = newHistory.length - 1;
        if (newHistory[lastEntryIndex].status === "incorrect") {
          newHistory[lastEntryIndex] = {
            ...newHistory[lastEntryIndex],
            word: word,
            status: "self-corrected",
          };
        }
      }
      return {
        ...prev,
        correct: prev.correct + 1,
        incorrect: Math.max(0, prev.incorrect - 1),
        history: newHistory,
      };
    });

    onPlayWord(word);

    // Briefly show the success message before skipping
    setTimeout(() => {
      pickNextChallenge();
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || feedback !== null) return;

    const normalizedInput = inputValue.trim().toLowerCase();
    const validWords =
      stopGameData[currentLetter]?.[currentCategory as StopCategory] || [];

    // 1. Check for exact match
    let isCorrect = validWords.some(
      (item) => item.word.toLowerCase() === normalizedInput,
    );

    let isCloseMatch = false;
    let actualCorrectWord = "";

    // 2. If not exact, check for typo matches
    if (!isCorrect) {
      for (const item of validWords) {
        const targetWord = item.word.toLowerCase();
        const tolerance = getToleranceForWordStr(targetWord);

        if (tolerance > 0) {
          const distance = levenshteinDistance(normalizedInput, targetWord);
          if (distance <= tolerance) {
            isCorrect = true;
            isCloseMatch = true;
            actualCorrectWord = item.word;
            break; // Stop at first close match found
          }
        }
      }
    }

    if (isCorrect) {
      playGameSound("correct");

      // Calculate combo multiplier based on current streak
      // 0-2 streak: 1x, 3-4 streak: 2x, 5+ streak: 3x
      const multiplier = currentStreak >= 5 ? 3 : currentStreak >= 3 ? 2 : 1;
      const pointsEarned = 1 * multiplier;

      setScore((s) => s + pointsEarned);
      setCurrentStreak((prev) => {
        const next = prev + 1;
        setBestStreak((b) => Math.max(b, next));
        return next;
      });

      const comboMessage = multiplier > 1 ? ` (Combo x${multiplier}!)` : "";

      if (isCloseMatch) {
        setFeedback({
          type: "success",
          // We use 'success' type but style it subtly differently or just rely on the text
          message: `Close enough! Acceptable for "${actualCorrectWord}". +${pointsEarned} point${pointsEarned > 1 ? "s" : ""}${comboMessage}`,
        });
      } else {
        setFeedback({
          type: "success",
          message: `Correct! +${pointsEarned} point${pointsEarned > 1 ? "s" : ""}${comboMessage}`,
        });
      }

      onPlayWord(isCloseMatch ? actualCorrectWord : inputValue.trim());

      setGameStats((prev) => ({
        ...prev,
        correct: prev.correct + 1,
        history: [
          ...prev.history,
          {
            letter: currentLetter,
            category: currentCategory,
            word: isCloseMatch ? actualCorrectWord : inputValue.trim(),
            status: "correct",
          },
        ],
      }));

      // Clear the hint for the next round immediately, though pickNextChallenge does this too
      setHintedWord(null);

      if (isCloseMatch) {
        setWaitingForContinue(true);
      } else {
        setTimeout(() => {
          pickNextChallenge();
        }, 1500);
      }
    } else {
      handleFailOrSkip(false); // Play 'wrong' sound happens inside
    }
  };

  if (!isPlaying) {
    return (
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-background flex flex-col items-center justify-center">
        <Card className="max-w-md w-full p-6 text-center space-y-6 bg-surface-1">
          <h2 className="text-2xl font-bold text-text-primary">
            Stop Game Challenge
          </h2>
          <p className="text-text-secondary">
            Select a category group and test your vocabulary! You will be given
            a letter and a category, and you must type a valid word.
          </p>

          <div className="space-y-2 text-left">
            <label className="text-sm font-bold text-text-muted">
              Category Group
            </label>
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value as GroupName)}
              className="w-full bg-surface-2 border border-border text-text-primary rounded-xl px-4 py-3 focus:ring-2 focus:ring-focus focus:border-transparent outline-none"
            >
              {(Object.keys(CATEGORY_GROUPS) as GroupName[]).map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2 text-left">
            <label className="text-sm font-bold text-text-muted">
              Category Difficulty
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setCategoryDifficulty("Relaxed")}
                className={`flex-1 py-2 rounded-xl border text-sm font-bold transition-all ${categoryDifficulty === "Relaxed" ? "bg-success border-success text-white shadow-lg shadow-success/20" : "bg-surface-2 border-border text-text-muted hover:bg-surface-hover hover:text-text-primary"}`}
              >
                Relaxed
              </button>
              <button
                onClick={() => setCategoryDifficulty("Normal")}
                className={`flex-1 py-2 rounded-xl border text-sm font-bold transition-all ${categoryDifficulty === "Normal" ? "bg-accent border-accent text-white shadow-lg shadow-accent/20" : "bg-surface-2 border-border text-text-muted hover:bg-surface-hover hover:text-text-primary"}`}
              >
                Normal
              </button>
              <button
                onClick={() => setCategoryDifficulty("Hard")}
                className={`flex-1 py-2 rounded-xl border text-sm font-bold transition-all ${categoryDifficulty === "Hard" ? "bg-red-600 border-red-500 text-white shadow-lg shadow-red-500/20" : "bg-surface-2 border-border text-text-muted hover:bg-surface-hover hover:text-text-primary"}`}
              >
                Hard
              </button>
            </div>
          </div>

          <div className="space-y-2 text-left">
            <label className="text-sm font-bold text-text-muted">
              Time Limit (per word)
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setDifficulty(60)}
                className={`flex-1 py-2 rounded-xl border text-sm font-bold transition-all ${difficulty === 60 ? "bg-success border-success text-white shadow-lg shadow-success/20" : "bg-surface-2 border-border text-text-muted hover:bg-surface-hover hover:text-text-primary"}`}
              >
                60s
              </button>
              <button
                onClick={() => setDifficulty(30)}
                className={`flex-1 py-2 rounded-xl border text-sm font-bold transition-all ${difficulty === 30 ? "bg-accent border-accent text-white shadow-lg shadow-accent/20" : "bg-surface-2 border-border text-text-muted hover:bg-surface-hover hover:text-text-primary"}`}
              >
                30s
              </button>
              <button
                onClick={() => setDifficulty(15)}
                className={`flex-1 py-2 rounded-xl border text-sm font-bold transition-all ${difficulty === 15 ? "bg-red-600 border-red-500 text-white shadow-lg shadow-red-500/20" : "bg-surface-2 border-border text-text-muted hover:bg-surface-hover hover:text-text-primary"}`}
              >
                15s
              </button>
            </div>
          </div>

          <Button
            onClick={startGame}
            variant="primary"
            fullWidth
            className="py-3 text-lg font-bold bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 border-none text-white"
          >
            Start Game
          </Button>
        </Card>
      </div>
    );
  }

  const theme = currentCategory
    ? getCategoryTheme(currentCategory as StopCategory)
    : null;

  if (showSummary) {
    const gradeInfo = (() => {
      if (score >= 50)
        return {
          grade: "S",
          color: "text-fuchsia-400",
          message: "Vocabulary Master!",
        };
      if (score >= 30)
        return {
          grade: "A",
          color: "text-emerald-400",
          message: "Excellent Work!",
        };
      if (score >= 15)
        return { grade: "B", color: "text-sky-400", message: "Great Job!" };
      if (score >= 5)
        return { grade: "C", color: "text-amber-400", message: "Good Effort!" };
      return {
        grade: "D",
        color: "text-slate-400",
        message: "Keep Practicing!",
      };
    })();

    return (
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-background flex flex-col items-center justify-center">
        <Card className="max-w-2xl w-full p-8 text-center space-y-8 animate-fade-in shadow-2xl border-t-4 border-accent bg-surface-1">
          <div>
            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400 mb-2">
              Game Complete!
            </h2>
            <p className="text-text-secondary text-lg">{gradeInfo.message}</p>
          </div>

          <div className="flex justify-center items-center gap-8 py-4">
            <div className="text-center">
              <div className="text-sm font-bold text-text-muted uppercase tracking-widest mb-1">
                Rank
              </div>
              <div
                className={`text-7xl font-black ${gradeInfo.color} drop-shadow-lg animate-bounce`}
              >
                {gradeInfo.grade}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-surface-2 p-4 rounded-2xl border border-border hover:bg-surface-hover transition-colors">
              <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">
                Total Score
              </div>
              <div className="text-3xl font-black text-success-hover">
                {score}
              </div>
            </div>
            <div className="bg-surface-2 p-4 rounded-2xl border border-border hover:bg-surface-hover transition-colors">
              <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">
                Best Streak
              </div>
              <div className="text-3xl font-black text-amber-500">
                🔥 {bestStreak}
              </div>
            </div>
            <div className="bg-surface-2 p-4 rounded-2xl border border-border hover:bg-surface-hover transition-colors">
              <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">
                Accuracy
              </div>
              <div className="text-3xl font-black text-accent-hover">
                {gameStats.correct + gameStats.incorrect > 0
                  ? Math.round(
                      (gameStats.correct /
                        (gameStats.correct + gameStats.incorrect)) *
                        100,
                    )
                  : 0}
                %
              </div>
            </div>
            <div className="bg-surface-2 p-4 rounded-2xl border border-border hover:bg-surface-hover transition-colors">
              <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">
                Words Seen
              </div>
              <div className="text-3xl font-black text-purple-500">
                {gameStats.history.length}
              </div>
            </div>
          </div>

          <div className="w-full text-left max-h-60 overflow-y-auto pr-2 space-y-2 text-sm bg-surface-2 p-2 rounded-lg scrollbar-thin scrollbar-thumb-border">
            <div className="sticky top-0 bg-surface-2 py-2 z-10 w-full mb-2 border-b border-border font-bold uppercase text-text-muted text-xs tracking-wider">
              Session History (Newest First)
            </div>
            {gameStats.history
              .slice()
              .reverse()
              .map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg flex justify-between items-center ${
                    item.status === "correct" ||
                    item.status === "self-corrected"
                      ? "bg-success/10 border border-success/20"
                      : item.status === "skipped"
                        ? "bg-surface-hover border border-border"
                        : "bg-red-500/10 border border-red-500/20"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-black text-text-secondary w-6 h-6 flex items-center justify-center bg-surface-1 rounded text-xs">
                      {item.letter}
                    </span>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] text-text-muted uppercase leading-tight truncate max-w-[120px]">
                        {item.category}
                      </span>
                      <span
                        className={`font-medium ${item.status === "correct" ? "text-text-primary" : "text-text-secondary"}`}
                      >
                        {item.word}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${
                      item.status === "correct" ||
                      item.status === "self-corrected"
                        ? "bg-success text-white"
                        : item.status === "skipped"
                          ? "bg-surface-hover text-text-muted"
                          : "bg-red-500 text-white"
                    }`}
                  >
                    {item.status === "self-corrected"
                      ? "I WAS RIGHT"
                      : item.status}
                  </span>
                </div>
              ))}
          </div>

          <Button
            onClick={() => {
              setShowSummary(false);
              setIsPlaying(false);
            }}
            variant="primary"
            fullWidth
            className="py-3 text-lg"
          >
            Back to Menu
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-background flex flex-col items-center justify-center">
      <div className="max-w-lg w-full space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <div className="text-xl font-bold text-text-primary">
              Score: <span className="text-success">{score}</span>
            </div>
            {currentStreak > 1 && (
              <div className="text-sm font-bold text-amber-500 animate-pulse">
                🔥 {currentStreak} Streak!{" "}
                {currentStreak >= 5 ? "(3x)" : currentStreak >= 3 ? "(2x)" : ""}
              </div>
            )}
          </div>
          <button
            onClick={() => setShowSummary(true)}
            className="text-text-muted hover:text-text-primary text-sm font-bold transition-colors"
          >
            End Game
          </button>
        </div>

        {/* Enhanced Timer Progress Bar */}
        <div className="w-full h-6 bg-surface-2 rounded-full overflow-hidden shadow-inner mb-4 border border-border">
          <div
            className={`h-full transition-all duration-1000 ease-linear rounded-full ${timeLeft <= 5 ? "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)] animate-pulse" : timeLeft <= difficulty / 2 ? "bg-amber-400" : "bg-success"}`}
            style={{ width: `${(timeLeft / difficulty) * 100}%` }}
          />
        </div>

        <Card
          className={`p-8 text-center border-t-4 ${theme?.accentColor || "border-accent"} relative overflow-hidden shadow-2xl bg-surface-1`}
        >
          <div
            key={`${currentLetter}-${currentCategory}`}
            className="space-y-8 animate-fade-in"
          >
            <div>
              <div className="text-sm font-bold text-text-muted uppercase tracking-widest mb-2">
                Letter
              </div>
              <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-text-primary to-text-muted drop-shadow-lg transform transition-transform hover:scale-110">
                {currentLetter}
              </div>
            </div>

            <div>
              <div className="text-sm font-bold text-text-muted uppercase tracking-widest mb-2">
                Category
              </div>
              <div className="flex items-center justify-center gap-3 bg-surface-2 p-4 rounded-2xl border border-border">
                <span className="text-4xl animate-bounce">
                  {currentCategory &&
                    getCategoryIcon(currentCategory as StopCategory)}
                </span>
                <h3
                  className={`text-3xl font-bold ${theme?.textClass || "text-text-primary"}`}
                >
                  {currentCategory}
                </h3>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="relative">
                <Input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => {
                    if (feedback) return; // Prevent typing while waiting for next round
                    setInputValue(e.target.value);
                    if (e.target.value === "") {
                      resetTranscript();
                    }
                  }}
                  placeholder={
                    micState === "listening"
                      ? "Listening..."
                      : "Type or speak your answer..."
                  }
                  className={`text-center text-xl py-4 pr-12 transition-all duration-300 ${micState === "listening" ? "ring-2 ring-red-500/50 bg-red-500/5" : ""} ${waitingForContinue ? "opacity-50 cursor-not-allowed" : ""}`}
                  autoFocus
                  disabled={waitingForContinue}
                />
                <button
                  type="button"
                  onClick={
                    micState === "listening" ? stopListening : startListening
                  }
                  className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors z-10 ${
                    micState === "listening"
                      ? "bg-red-500/20 text-red-500 hover:bg-red-500/30 animate-pulse ring-2 ring-red-500 ring-offset-2 ring-offset-surface-1"
                      : "text-text-muted hover:text-text-primary hover:bg-surface-hover"
                  }`}
                  disabled={feedback !== null || waitingForContinue}
                  title={
                    micState === "listening"
                      ? "Stop Listening"
                      : "Start Listening"
                  }
                  aria-label={
                    micState === "listening"
                      ? "Stop Listening"
                      : "Start Listening"
                  }
                >
                  {micState === "listening" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
                      <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {feedback && (
                <div
                  className={`text-sm font-bold ${feedback.type === "success" ? "text-success" : "text-error"} animate-fade-in`}
                >
                  {feedback.message}
                </div>
              )}

              {hint && !feedback && (
                <div className="text-sm font-medium text-amber-500 bg-amber-500/10 p-3 rounded-lg animate-fade-in border border-amber-500/20">
                  {hint}
                </div>
              )}

              <div className="flex gap-2">
                {waitingForContinue ? (
                  <>
                    <Button
                      type="button"
                      variant="primary"
                      className="flex-1 py-3 text-lg font-bold shadow-lg"
                      onClick={handleContinue}
                      autoFocus
                    >
                      Continue
                    </Button>
                    {feedback?.type === "error" &&
                      !feedback.isSkip &&
                      inputValue.trim().length > 0 && (
                        <Button
                          type="button"
                          variant="secondary"
                          className="py-3 px-6 whitespace-nowrap border-amber-500/50 text-amber-500 hover:bg-amber-500 hover:text-white transition-all font-bold group relative"
                          onClick={handleIWasRight}
                          title="I typed a valid word!"
                        >
                          I was right!
                          <span className="absolute -top-3 -right-2 opacity-0 group-hover:opacity-100 bg-amber-500 text-white text-[10px] py-0.5 px-2 rounded-full transition-opacity shadow-lg">
                            Get Points
                          </span>
                        </Button>
                      )}
                  </>
                ) : (
                  <>
                    <Button
                      type="submit"
                      variant="primary"
                      className="flex-1 py-3"
                      disabled={!inputValue.trim() || feedback !== null}
                    >
                      Submit
                    </Button>
                    <button
                      type="button"
                      onClick={handleGetHint}
                      className="px-4 py-3 bg-surface-2 hover:bg-surface-hover text-amber-500 border border-border rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative group"
                      disabled={feedback !== null}
                      title="Get a hint (-5s)"
                      aria-label="Get a hint (-5s)"
                    >
                      💡
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        -5s
                      </span>
                    </button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => handleFailOrSkip(true)}
                      className="py-3"
                      disabled={feedback !== null}
                    >
                      Skip
                    </Button>
                  </>
                )}
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StopGamePlay;
