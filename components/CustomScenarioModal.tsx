import React, { useState, useEffect, useRef } from "react";
import { CustomScenarioConfig } from "../types";

interface CustomScenarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: (config: CustomScenarioConfig) => void;
}

const CustomScenarioModal: React.FC<CustomScenarioModalProps> = ({
  isOpen,
  onClose,
  onStart,
}) => {
  const [userRole, setUserRole] = useState("");
  const [aiRole, setAiRole] = useState("");
  const [situation, setSituation] = useState("");
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Focus the first input when modal opens
      firstInputRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleStart = () => {
    if (userRole.trim() && aiRole.trim() && situation.trim()) {
      onStart({
        userRole,
        aiRole,
        situation,
      });
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-slate-800 rounded-2xl shadow-2xl p-6 w-full max-w-md border border-slate-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2
            id="modal-title"
            className="text-2xl font-bold text-white flex items-center gap-2"
          >
            🎭 Custom Scenario
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="user-role"
              className="block text-sm font-medium text-sky-300 mb-1"
            >
              Who are YOU?
            </label>
            <input
              id="user-role"
              ref={firstInputRef}
              type="text"
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              placeholder="e.g., A tourist lost in New York"
              className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label
              htmlFor="ai-role"
              className="block text-sm font-medium text-pink-300 mb-1"
            >
              Who is the AI?
            </label>
            <input
              id="ai-role"
              type="text"
              value={aiRole}
              onChange={(e) => setAiRole(e.target.value)}
              placeholder="e.g., A grumpy taxi driver"
              className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label
              htmlFor="situation"
              className="block text-sm font-medium text-emerald-300 mb-1"
            >
              The Situation
            </label>
            <textarea
              id="situation"
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              placeholder="e.g., I need to get to the airport in 20 minutes but I have no cash."
              className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white h-24 focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={handleStart}
            disabled={!userRole.trim() || !aiRole.trim() || !situation.trim()}
            className="w-full bg-gradient-to-r from-sky-600 to-purple-600 hover:from-sky-500 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            Start Roleplay ✨
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomScenarioModal;
