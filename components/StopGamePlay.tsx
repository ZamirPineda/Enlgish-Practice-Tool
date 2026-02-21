import React, { useState, useEffect, useMemo } from "react";
import { stopGameData } from "../data/stopGameData";
import { StopCategory } from "../types";
import {
  GroupName,
  CATEGORY_GROUPS,
  PREDEFINED_ALL_ORDER,
  getCategoryIcon,
  getCategoryTheme,
} from "../utils/stopGameHelpers";
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
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

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
    setFeedback(null);
  };

  const startGame = () => {
    setScore(0);
    setIsPlaying(true);
    pickNextChallenge();
  };

  const stopGame = () => {
    setIsPlaying(false);
    setInputValue("");
    setFeedback(null);
  };

  const handleFailOrSkip = (isSkip: boolean) => {
    const validWords =
      stopGameData[currentLetter]?.[currentCategory as StopCategory] || [];
    if (validWords.length > 0) {
      const randomWord =
        validWords[Math.floor(Math.random() * validWords.length)];
      const definition = randomWord.definition || randomWord.translation || "";

      setFeedback({
        type: "error",
        message: `${isSkip ? "Skipped!" : "Incorrect!"} A valid answer is: "${randomWord.word}". Added to Vault!`,
      });

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
      setScore((s) => s + 1);
      setFeedback({ type: "success", message: "Correct! +1 point" });
      onPlayWord(inputValue.trim());
      setTimeout(() => {
        pickNextChallenge();
      }, 1500);
    } else {
      handleFailOrSkip(false);
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

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-900/50 flex flex-col items-center justify-center">
      <div className="max-w-lg w-full space-y-6">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-white">
            Score: <span className="text-emerald-400">{score}</span>
          </div>
          <button
            onClick={stopGame}
            className="text-slate-400 hover:text-white text-sm font-bold"
          >
            End Game
          </button>
        </div>

        <Card
          className={`p-8 text-center border-t-4 ${theme?.accentColor || "border-sky-500"} relative overflow-hidden`}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

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
              <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your answer..."
                className="text-center text-xl py-4"
                autoFocus
                disabled={feedback !== null}
              />

              {feedback && (
                <div
                  className={`text-sm font-bold ${feedback.type === "success" ? "text-emerald-400" : "text-red-400"} animate-fade-in`}
                >
                  {feedback.message}
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
