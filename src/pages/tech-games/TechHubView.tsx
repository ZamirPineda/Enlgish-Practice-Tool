import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { techDecks } from "@/features/data/techDecks";

const GAME_MODES = [
  {
    id: "flashcards",
    name: "🎤 Technical Interview Express",
    description: "Simulador de entrevista oral (Spaced Repetition)",
    color: "bg-blue-500",
  },
  {
    id: "trivia",
    name: "⏱️ Tech Trivia Sprint",
    description: "Preguntas de opción múltiple con tiempo",
    color: "bg-green-500",
  },
  {
    id: "matchup",
    name: "🧩 Architecture Match-Up",
    description: "Empareja conceptos y definiciones",
    color: "bg-purple-500",
  },
  {
    id: "boss",
    name: "🥷 The Tech Boss",
    description: "Debuggea respuestas incorrectas",
    color: "bg-red-500",
  },
];

export const TechHubView: React.FC = () => {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null);

  const handleStart = () => {
    if (selectedGame && selectedDeck) {
      navigate(`/tech-games/${selectedGame}/${selectedDeck}`);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 p-4">
      <div className="max-w-4xl mx-auto w-full space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
            Tech Interview Hub
          </h1>
          <p className="text-slate-400">
            Domina tu stack tecnológico con minijuegos
          </p>
        </div>

        {/* Game Mode Selection */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-slate-300">
            1. Selecciona un Modo de Juego
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {GAME_MODES.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setSelectedGame(mode.id)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  selectedGame === mode.id
                    ? "border-indigo-500 bg-slate-800"
                    : "border-slate-700 bg-slate-800/50 hover:bg-slate-700"
                }`}
              >
                <div className="font-bold text-lg">{mode.name}</div>
                <div className="text-sm text-slate-400 mt-1">
                  {mode.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Deck Selection (Only show if a game is selected) */}
        {selectedGame && (
          <div className="animate-fade-in pb-20">
            <h2 className="text-xl font-semibold mb-4 text-slate-300">
              2. Elige un Tema
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {techDecks.map((deck) => (
                <button
                  key={deck.id}
                  onClick={() => setSelectedDeck(deck.id)}
                  className={`p-3 rounded-lg border flex flex-col items-center justify-center text-center transition-all ${
                    selectedDeck === deck.id
                      ? "border-indigo-500 bg-indigo-500/20"
                      : "border-slate-700 bg-slate-800 hover:bg-slate-700"
                  }`}
                >
                  <span className="font-medium text-sm">{deck.name}</span>
                  <span className="text-xs text-slate-400 mt-1">
                    {deck.cards.length} cards
                  </span>
                </button>
              ))}
            </div>

            {selectedDeck && (
              <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 flex justify-center z-50">
                <button
                  onClick={handleStart}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-12 rounded-full shadow-lg transform transition active:scale-95"
                >
                  ¡Comenzar Desafío!
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
