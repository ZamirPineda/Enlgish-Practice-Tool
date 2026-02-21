import React, { useState, useEffect, useMemo, useCallback } from "react";
import { stopGameData } from "../data/stopGameData";
import { StopCategory } from "../types";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import {
  GroupName,
  CATEGORY_GROUPS,
  PREDEFINED_ALL_ORDER,
  getCategoryIcon,
  getCategoryTheme,
} from "../utils/stopGameHelpers";
import { playGameSound } from "../utils/audioUtils";
import Card from "./ui/Card";
import Input from "./ui/Input";
import Button from "./ui/Button";

interface StopGamePlayProps {
  onPlayWord: (word: string) => void;
  onAddToVault: (word: string, definition: string) => void;
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
      status: "correct" | "skipped" | "incorrect";
    }[];
  }>({ correct: 0, skipped: 0, incorrect: 0, history: [] });

  const [showSummary, setShowSummary] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);

  // Timer Countdown Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !feedback && !showSummary && timeLeft > 0) {
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
    } else if (timeLeft === 0 && isPlaying && !feedback && !showSummary) {
      // Handle timeout immediately when 0 is reached
      handleFailOrSkip(false, true);
    }
    return () => clearInterval(interval);
  }, [isPlaying, feedback, showSummary, timeLeft]);

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
    if (selectedGroup === "All") {
      return PREDEFINED_ALL_ORDER;
    }
    return CATEGORY_GROUPS[selectedGroup];
  }, [selectedGroup]);

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
    setFeedback(null);
    // Important: clear the transcript to avoid "ghost" words from previous rounds appearing
    resetTranscript();
    setTimeLeft(30); // Reset Timer
    playGameSound("start");
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
      const randomWord =
        validWords[Math.floor(Math.random() * validWords.length)];
      const definition = randomWord.definition || randomWord.translation || "";

      playGameSound(isTimeout ? "timeout" : "wrong");

      const messagePrefix = isSkip
        ? "Skipped!"
        : isTimeout
          ? "Time's Out!"
          : "Incorrect!";

      setFeedback({
        type: "error",
        message: `${messagePrefix} A valid answer is: "${randomWord.word}". Added to Vault!`,
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
            word: randomWord.word, // We save the one we suggested
            status: isSkip ? "skipped" : "incorrect",
          },
        ],
      }));

      onAddToVault(randomWord.word, definition);

      setTimeout(() => {
        pickNextChallenge();
      }, 3000);
    } else {
      setFeedback({
        type: "error",
        message: "No valid words found for this category.",
      });
      setTimeout(() => pickNextChallenge(), 1500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const normalizedInput = inputValue.trim().toLowerCase();
    const validWords =
      stopGameData[currentLetter]?.[currentCategory as StopCategory] || [];

    const isCorrect = validWords.some(
      (item) => item.word.toLowerCase() === normalizedInput,
    );

    if (isCorrect) {
      playGameSound("correct");
      setScore((s) => s + 1);
      setCurrentStreak((prev) => {
        const next = prev + 1;
        setBestStreak((b) => Math.max(b, next));
        return next;
      });
      setFeedback({ type: "success", message: "Correct! +1 point" });
      onPlayWord(inputValue.trim());

      setGameStats((prev) => ({
        ...prev,
        correct: prev.correct + 1,
        history: [
          ...prev.history,
          {
            letter: currentLetter,
            category: currentCategory,
            word: inputValue.trim(),
            status: "correct",
          },
        ],
      }));

      setTimeout(() => {
        pickNextChallenge();
      }, 1500);
    } else {
      handleFailOrSkip(false); // Play 'wrong' sound happens inside
    }
  };

  if (!isPlaying) {
    return (
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-900/50 flex flex-col items-center justify-center">
        <Card className="max-w-md w-full p-6 text-center space-y-6">
          <h2 className="text-2xl font-bold text-white">Stop Game Challenge</h2>
          <p className="text-slate-400">
            Select a category group and test your vocabulary! You will be given
            a letter and a category, and you must type a valid word.
          </p>

          <div className="space-y-2 text-left">
            <label className="text-sm font-bold text-slate-300">
              Category Group
            </label>
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value as GroupName)}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            >
              {(Object.keys(CATEGORY_GROUPS) as GroupName[]).map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>

          <Button
            onClick={startGame}
            variant="primary"
            fullWidth
            className="py-3 text-lg font-bold bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 border-none"
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
    return (
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-900/50 flex flex-col items-center justify-center">
        <Card className="max-w-2xl w-full p-6 text-center space-y-6">
          <h2 className="text-3xl font-bold text-white mb-6">Game Summary</h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-800 p-4 rounded-xl">
              <div className="text-sm text-slate-400">Total Score</div>
              <div className="text-2xl font-bold text-emerald-400">{score}</div>
            </div>
            <div className="bg-slate-800 p-4 rounded-xl">
              <div className="text-sm text-slate-400">Best Streak</div>
              <div className="text-2xl font-bold text-amber-400">
                🔥 {bestStreak}
              </div>
            </div>
            <div className="bg-slate-800 p-4 rounded-xl">
              <div className="text-sm text-slate-400">Accuracy</div>
              <div className="text-2xl font-bold text-blue-400">
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
            <div className="bg-slate-800 p-4 rounded-xl">
              <div className="text-sm text-slate-400">Words Learned</div>
              <div className="text-2xl font-bold text-purple-400">
                {gameStats.history.length}
              </div>
            </div>
          </div>

          <div className="w-full text-left max-h-60 overflow-y-auto pr-2 space-y-2 text-sm bg-slate-900/50 p-2 rounded-lg scrollbar-thin scrollbar-thumb-slate-700">
            <div className="sticky top-0 bg-slate-900 py-2 z-10 w-full mb-2 border-b border-slate-700 font-bold uppercase text-slate-400 text-xs tracking-wider">
              Session History (Newest First)
            </div>
            {gameStats.history
              .slice()
              .reverse()
              .map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg flex justify-between items-center ${
                    item.status === "correct"
                      ? "bg-emerald-500/10 border border-emerald-500/20"
                      : item.status === "skipped"
                        ? "bg-slate-700/50 border border-slate-600"
                        : "bg-red-500/10 border border-red-500/20"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-300 w-6 h-6 flex items-center justify-center bg-slate-700 rounded text-xs">
                      {item.letter}
                    </span>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] text-slate-400 uppercase leading-tight truncate max-w-[120px]">
                        {item.category}
                      </span>
                      <span
                        className={`font-medium ${item.status === "correct" ? "text-white" : "text-slate-300"}`}
                      >
                        {item.word}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${
                      item.status === "correct"
                        ? "bg-emerald-500 text-slate-900"
                        : item.status === "skipped"
                          ? "bg-slate-600 text-slate-300"
                          : "bg-red-500 text-white"
                    }`}
                  >
                    {item.status}
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
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-900/50 flex flex-col items-center justify-center">
      <div className="max-w-lg w-full space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <div className="text-xl font-bold text-white">
              Score: <span className="text-emerald-400">{score}</span>
            </div>
            {currentStreak > 1 && (
              <div className="text-sm font-bold text-amber-400 animate-pulse">
                🔥 {currentStreak} Streak!
              </div>
            )}
          </div>
          <button
            onClick={() => setShowSummary(true)}
            className="text-slate-400 hover:text-white text-sm font-bold"
          >
            End Game
          </button>
        </div>

        <Card
          className={`p-8 text-center border-t-4 ${theme?.accentColor || "border-sky-500"} relative overflow-hidden`}
        >
          {/* Timer Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-800/50">
            <div
              className={`h-full transition-all duration-1000 linear ${timeLeft <= 5 ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.7)]" : "bg-emerald-400"}`}
              style={{ width: `${(timeLeft / 30) * 100}%` }}
            />
          </div>

          <div className="space-y-8">
            <div>
              <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">
                Letter
              </div>
              <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 drop-shadow-lg">
                {currentLetter}
              </div>
            </div>

            <div>
              <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">
                Category
              </div>
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl">
                  {currentCategory &&
                    getCategoryIcon(currentCategory as StopCategory)}
                </span>
                <h3
                  className={`text-2xl font-bold ${theme?.textClass || "text-white"}`}
                >
                  {currentCategory}
                </h3>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="relative">
                <Input
                  type="text"
                  value={inputValue}
                  onChange={(e) => {
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
                  className={`text-center text-xl py-4 pr-12 transition-all duration-300 ${micState === "listening" ? "ring-2 ring-red-500/50 bg-red-500/5" : ""}`}
                  autoFocus
                  disabled={feedback !== null}
                />
                <button
                  type="button"
                  onClick={
                    micState === "listening" ? stopListening : startListening
                  }
                  className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors z-10 ${
                    micState === "listening"
                      ? "bg-red-500/20 text-red-500 hover:bg-red-500/30 animate-pulse ring-2 ring-red-500 ring-offset-2 ring-offset-slate-800"
                      : "text-slate-400 hover:text-white hover:bg-slate-700"
                  }`}
                  disabled={feedback !== null}
                  title={
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
                  className={`text-sm font-bold ${feedback.type === "success" ? "text-emerald-400" : "text-red-400"} animate-fade-in`}
                >
                  {feedback.message}
                </div>
              )}

              {hint && !feedback && (
                <div className="text-sm font-medium text-amber-300 bg-amber-500/10 p-3 rounded-lg animate-fade-in border border-amber-500/20">
                  {hint}
                </div>
              )}

              <div className="flex gap-2">
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
                  className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative group"
                  disabled={feedback !== null}
                  title="Get a hint (-5s)"
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
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StopGamePlay;
