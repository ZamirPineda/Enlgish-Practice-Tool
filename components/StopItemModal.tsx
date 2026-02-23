import React, { useEffect, useRef } from "react";
import { StopCategory, StopItem, WordFamily } from "../types";
import {
  getCategoryTheme,
  getCategoryIcon,
  getFlagUrl,
} from "../utils/stopGameHelpers";

interface StopItemModalProps {
  item: StopItem;
  category: string;
  onClose: () => void;
  onPlay: (word: string) => void;
}

// Helper to parse verb definitions into structured data
const parseVerbDefinition = (
  def: string | undefined,
): { past?: string; participle?: string } => {
  if (!def) return {};
  const parts = def.split("•").map((s) => s.trim());
  const result: { past?: string; participle?: string } = {};

  parts.forEach((part) => {
    if (part.toLowerCase().startsWith("past:")) {
      result.past = part.replace(/past:/i, "").trim();
    } else if (part.toLowerCase().startsWith("part:")) {
      result.participle = part.replace(/part:/i, "").trim();
    }
  });

  return result;
};

export const StopItemModal: React.FC<StopItemModalProps> = ({
  item,
  category,
  onClose,
  onPlay,
}) => {
  const theme = getCategoryTheme(category as StopCategory);
  const isVerb = category === "Verbs";
  const verbForms = isVerb ? parseVerbDefinition(item.definition) : {};

  const countryName = category === "Countries" ? item.word : item.country;
  const flagUrl = getFlagUrl(countryName);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (!modalElement) return;
    const focusableSelector =
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusables = Array.from(
      modalElement.querySelectorAll<HTMLElement>(focusableSelector),
    );
    (focusables[0] || modalElement).focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const currentFocusable = Array.from(
        modalElement.querySelectorAll<HTMLElement>(focusableSelector),
      );
      if (currentFocusable.length === 0) {
        e.preventDefault();
        modalElement.focus();
        return;
      }
      const first = currentFocusable[0];
      const last = currentFocusable[currentFocusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        className={`w-full max-w-lg bg-surface-1 border-2 ${theme.accentColor} rounded-2xl shadow-2xl overflow-hidden relative transform transition-all scale-100 outline-none`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`${theme.headerGradient} p-6 flex items-start justify-between border-b border-border`}
        >
          <div className="flex items-center gap-4">
            <span
              className={`text-4xl w-16 h-16 flex items-center justify-center rounded-2xl shadow-inner ${theme.iconBg} relative overflow-hidden`}
            >
              {flagUrl ? (
                <img
                  src={flagUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                getCategoryIcon(category as StopCategory)
              )}
            </span>
            <div>
              <h2
                id="modal-title"
                className={`text-3xl font-black text-text-primary tracking-tight ${theme.textClass}`}
              >
                {item.word}
              </h2>
              <p className="text-text-muted text-lg font-medium italic">
                {item.translation}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 min-h-[40px] min-w-[40px] bg-black/20 hover:bg-black/40 rounded-full text-white/90 hover:text-white transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {/* Audio Playback */}
          <div className="flex justify-center">
            <button
              onClick={() => onPlay(item.word)}
              className="flex items-center gap-3 min-h-[44px] px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-full font-bold shadow-lg shadow-accent/30 transition-all hover:scale-105 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              aria-label={`Listen pronunciation of ${item.word}`}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Listen Pronunciation</span>
            </button>
          </div>

          {/* IPA */}
          <div className="text-center">
            <span className="font-mono text-2xl text-accent bg-accent/10 px-4 py-2 rounded-lg border border-accent/20">
              {item.ipa}
            </span>
          </div>

          {/* Content Section */}
          <div className="space-y-4">
            {/* Special Layout for Verbs */}
            {isVerb && (verbForms.past || verbForms.participle) ? (
              <div className="bg-surface-2/50 rounded-xl p-4 border border-border">
                <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-3">
                  Conjugation
                </h3>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-surface-2 rounded border border-border">
                    <div className="text-xs text-text-muted mb-1">Base</div>
                    <div className="font-bold text-text-primary text-lg">
                      {item.word}
                    </div>
                  </div>
                  <div className="p-2 bg-surface-2 rounded border border-border">
                    <div className="text-xs text-text-muted mb-1">
                      Past (V2)
                    </div>
                    <div className="font-bold text-amber-400 text-lg">
                      {verbForms.past || "-"}
                    </div>
                  </div>
                  <div className="p-2 bg-surface-2 rounded border border-border">
                    <div className="text-xs text-text-muted mb-1">
                      Participle (V3)
                    </div>
                    <div className="font-bold text-emerald-400 text-lg">
                      {verbForms.participle || "-"}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Generic Definition */
              item.definition && (
                <div className="bg-surface-2/50 rounded-xl p-4 border border-border">
                  <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-2">
                    Definition & Context
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {item.definition}
                  </p>
                </div>
              )
            )}

            {/* Examples */}
            {(item.example || item.examSentence) && (
              <div className="bg-gradient-to-r from-surface-2 to-surface-2/50 rounded-xl p-4 border-l-4 border-l-accent border-y border-r border-border">
                <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-2">
                  Example
                </h3>
                <p className="text-text-primary text-lg font-serif italic">
                  "{item.examSentence || item.example}"
                </p>
              </div>
            )}

            {/* Visual Associations (e.g. Colors, Countries placeholder) */}
            {category === "Colors" && item.hex && (
              <div className="flex items-center gap-4 bg-surface-2/50 p-4 rounded-xl border border-border">
                <div
                  className="w-16 h-16 rounded-full shadow-lg border-2 border-border"
                  style={{ backgroundColor: item.hex }}
                ></div>
                <div>
                  <h3 className="text-sm font-bold text-text-muted uppercase">
                    Visual Color
                  </h3>
                  <p className="font-mono text-text-primary">{item.hex}</p>
                </div>
              </div>
            )}

            {/* Word Family */}
            {item.wordFamily && (
              <div className="bg-surface-2/50 rounded-xl p-4 border border-border">
                <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-3">
                  Word Family
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(item.wordFamily).map(
                    ([pos, word]) =>
                      word && (
                        <div
                          key={pos}
                          className="flex justify-between items-center bg-surface-1/50 px-3 py-2 rounded"
                        >
                          <span className="text-xs font-bold text-text-muted uppercase">
                            {pos}
                          </span>
                          <span className="text-primary font-medium">
                            {word}
                          </span>
                        </div>
                      ),
                  )}
                </div>
              </div>
            )}

            {/* Metadata Tag */}
            <div className="flex flex-wrap gap-2 pt-2">
              {item.level && (
                <span className="px-2 py-1 bg-surface-2 rounded text-xs text-text-muted border border-border">
                  Level: {item.level}
                </span>
              )}
              {item.tag && (
                <span className="px-2 py-1 bg-surface-2 rounded text-xs text-text-muted border border-border">
                  Tag: {item.tag}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
