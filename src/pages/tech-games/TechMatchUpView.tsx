import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { techDecks, TechCard } from "@/features/data/techDecks";
import { addGlobalXp, progressQuest } from "@/lib/xpStore";
import { trackAnalyticsEvent } from "@/lib/analytics";

const SHUFFLE = (arr: any[]) => [...arr].sort(() => 0.5 - Math.random());

export const TechMatchUpView: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();

  const [pairs, setPairs] = useState<
    { prompt: string; answer: string; id: string }[]
  >([]);
  const [prompts, setPrompts] = useState<
    { text: string; id: string; matched: boolean }[]
  >([]);
  const [answers, setAnswers] = useState<
    { text: string; id: string; matched: boolean }[]
  >([]);

  const [selectedPromptId, setSelectedPromptId] = useState<string | null>(null);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [errorMatch, setErrorMatch] = useState(false);

  const [score, setScore] = useState(0);
  const [completedSets, setCompletedSets] = useState(0);
  const TOTAL_SETS = 3;

  const loadSet = useCallback(() => {
    const deck = techDecks.find((d) => d.id === deckId);
    if (!deck || deck.cards.length < 4) return;

    // Pick 4 random cards
    const selectedCards = SHUFFLE(deck.cards).slice(0, 4);
    const newPairs = selectedCards.map((c) => ({
      prompt: c.prompt,
      answer: c.answer,
      id: Math.random().toString(36).substr(2, 9),
    }));

    setPairs(newPairs);
    setPrompts(
      SHUFFLE(
        newPairs.map((p) => ({ text: p.prompt, id: p.id, matched: false })),
      ),
    );
    setAnswers(
      SHUFFLE(
        newPairs.map((p) => ({ text: p.answer, id: p.id, matched: false })),
      ),
    );

    setSelectedPromptId(null);
    setSelectedAnswerId(null);
    setErrorMatch(false);
  }, [deckId]);

  useEffect(() => {
    loadSet();
  }, [loadSet]);

  useEffect(() => {
    if (selectedPromptId && selectedAnswerId) {
      if (selectedPromptId === selectedAnswerId) {
        // Match!
        setPrompts((prev) =>
          prev.map((p) =>
            p.id === selectedPromptId ? { ...p, matched: true } : p,
          ),
        );
        setAnswers((prev) =>
          prev.map((a) =>
            a.id === selectedAnswerId ? { ...a, matched: true } : a,
          ),
        );
        setScore((s) => s + 10);
        setSelectedPromptId(null);
        setSelectedAnswerId(null);
        trackAnalyticsEvent("item_correct", {
          game: "tech_matchup",
          deck: deckId,
        });
      } else {
        // Error
        setErrorMatch(true);
        trackAnalyticsEvent("item_wrong", {
          game: "tech_matchup",
          deck: deckId,
        });
        setTimeout(() => {
          setSelectedPromptId(null);
          setSelectedAnswerId(null);
          setErrorMatch(false);
        }, 800);
      }
    }
  }, [selectedPromptId, selectedAnswerId, deckId]);

  // Check if current set is complete
  useEffect(() => {
    if (prompts.length > 0 && prompts.every((p) => p.matched)) {
      setTimeout(() => {
        if (completedSets + 1 >= TOTAL_SETS) {
          setCompletedSets((c) => c + 1);
        } else {
          setCompletedSets((c) => c + 1);
          loadSet();
        }
      }, 1000);
    }
  }, [prompts, completedSets, loadSet]);

  if (pairs.length === 0)
    return (
      <div className="p-8 text-center text-white bg-slate-900 min-h-screen">
        Cargando o no hay suficientes items (min 4)...
      </div>
    );

  if (completedSets >= TOTAL_SETS) {
    addGlobalXp(50 + score);
    progressQuest("play_game", 1, "test_tech");
    trackAnalyticsEvent("session_end", {
      game: "tech_matchup",
      durationSeconds: 60,
    });
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center space-y-6 bg-slate-900 text-white">
        <h2 className="text-4xl font-bold text-fuchsia-400">
          ¡Architecture Completa!
        </h2>
        <div className="text-2xl my-4">Puntuación: {score}</div>
        <button
          onClick={() => navigate("/tech-hub")}
          className="px-8 py-3 bg-fuchsia-600 rounded-full hover:bg-fuchsia-500 font-bold shadow-lg transition-all"
        >
          Volver al Hub
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100 p-4">
      <div className="flex justify-between items-center mb-6 max-w-5xl mx-auto w-full">
        <button
          onClick={() => navigate("/tech-hub")}
          className="text-slate-400 hover:text-white"
        >
          ← Abandonar
        </button>
        <div className="font-bold text-fuchsia-400">
          Ronda {completedSets + 1} / {TOTAL_SETS}
        </div>
        <div className="text-xl font-bold text-slate-300">Score: {score}</div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto w-full pb-10">
        {/* Prompts Column */}
        <div className="space-y-3 flex flex-col">
          <h3 className="text-center text-slate-400 font-semibold mb-2 hidden md:block">
            Conceptos
          </h3>
          {prompts.map((p) => {
            let btnClass = "bg-slate-800 border-slate-700 hover:bg-slate-700";
            if (p.matched)
              btnClass =
                "bg-green-900/20 border-green-800 text-green-700 opacity-20 scale-95 pointer-events-none";
            else if (p.id === selectedPromptId) {
              btnClass = errorMatch
                ? "bg-red-900/40 border-red-500 text-red-200"
                : "bg-fuchsia-900/40 border-fuchsia-500 text-fuchsia-100 ring-2 ring-fuchsia-500/50";
            }

            return (
              <button
                key={`p-${p.id}`}
                onClick={() => !p.matched && setSelectedPromptId(p.id)}
                disabled={p.matched}
                className={`p-4 border-2 rounded-xl text-left transition-all duration-300 ${btnClass}`}
              >
                {p.text}
              </button>
            );
          })}
        </div>

        {/* Answers Column */}
        <div className="space-y-3 flex flex-col mt-6 md:mt-0">
          <h3 className="text-center text-slate-400 font-semibold mb-2 hidden md:block">
            Definiciones
          </h3>
          {answers.map((a) => {
            let btnClass = "bg-slate-800 border-slate-700 hover:bg-slate-700";
            if (a.matched)
              btnClass =
                "bg-green-900/20 border-green-800 text-green-700 opacity-20 scale-95 pointer-events-none";
            else if (a.id === selectedAnswerId) {
              btnClass = errorMatch
                ? "bg-red-900/40 border-red-500 text-red-200"
                : "bg-indigo-900/40 border-indigo-500 text-indigo-100 ring-2 ring-indigo-500/50";
            }

            return (
              <button
                key={`a-${a.id}`}
                onClick={() => !a.matched && setSelectedAnswerId(a.id)}
                disabled={a.matched}
                className={`p-4 border-2 rounded-xl text-left transition-all duration-300 text-sm md:text-base ${btnClass}`}
              >
                {a.text}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
