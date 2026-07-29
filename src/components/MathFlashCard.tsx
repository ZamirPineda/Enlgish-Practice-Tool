import React, { useState, useEffect, useCallback } from "react";
import { MathRow, MathStudyStrategy } from "@/types";
import LatexRenderer from "@/components/LatexRenderer";
import { shuffle } from "@/lib/arrayUtils";

interface MathFlashCardProps {
  strategy: MathStudyStrategy;
  rows: MathRow[]; // Only the rows relevant to this strategy (filtered by section)
  onExit: () => void;
}

const MathFlashCard: React.FC<MathFlashCardProps> = ({
  strategy,
  rows,
  onExit,
}) => {
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [randomizedRows, setRandomizedRows] = useState<MathRow[]>([]);

  // Initialize/Shuffle cards
  useEffect(() => {
    // Shuffle and limit to 50 questions max
    const shuffled = shuffle(rows).slice(0, 50);
    setRandomizedRows(shuffled);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  }, [strategy, rows]);

  const handleNext = useCallback(() => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev + 1) % randomizedRows.length);
    }, 150); // slight delay for smooth transition
  }, [randomizedRows.length]);

  const handlePrev = useCallback(() => {
    // When going back, show the answer side first (since we likely just saw it)
    setIsFlipped(true);
    setTimeout(() => {
      setCurrentCardIndex(
        (prev) => (prev - 1 + randomizedRows.length) % randomizedRows.length,
      );
    }, 150);
  }, [randomizedRows.length]);

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);


  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent hijacking native inputs and buttons
      const activeTag = document.activeElement?.tagName;
      if (
        activeTag === "INPUT" ||
        activeTag === "TEXTAREA" ||
        activeTag === "SELECT" ||
        activeTag === "BUTTON" ||
        activeTag === "A" ||
        document.activeElement?.getAttribute("role") === "button"
      ) {
        return;
      }

      if (e.key === "Escape") {
        onExit();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault(); // Prevent scrolling for space
        handleFlip();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, handleFlip, onExit]);

  if (randomizedRows.length === 0) return <div>Loading...</div>;


  const currentrow = randomizedRows[currentCardIndex];

  // Parse the template to mix Text and LaTeX
  const renderQuestion = () => {
    const parts = strategy.questionTemplate.split(/(\{col\d+\})/g);
    return parts.map((part, idx) => {
      const match = part.match(/\{col(\d+)\}/);
      if (match) {
        const colIndex = parseInt(match[1]);
        const cellContent = currentrow[colIndex];
        return (
          <div key={idx} className="my-2 w-full flex justify-center">
            <LatexRenderer formula={cellContent} block />
          </div>
        );
      }
      // Render text parts
      if (!part.trim()) return null;
      return (
        <div
          key={idx}
          className="font-sans text-slate-300 my-1 text-center w-full"
        >
          {part}
        </div>
      );
    });
  };

  const answerText = currentrow[strategy.answerColumnIndex];

  return (
    <div className="flex flex-col items-center justify-center p-6 h-full max-w-2xl mx-auto">
      {/* ... Header ... */}
      <div className="w-full flex justify-between items-center mb-6 text-slate-400 text-sm">
        <span>{strategy.name}</span>
        <span>
          {currentCardIndex + 1} / {randomizedRows.length}
        </span>
        <button
          onClick={onExit}
          className="text-slate-400 hover:text-white transition-colors"
        >
          ✕ Salir
        </button>
      </div>

      {/* Card Container */}
      <div
        className="w-full relative min-h-[400px] md:min-h-[500px] cursor-pointer perspective-1000 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-2xl"
        style={{ perspective: "1000px" }}
        onClick={handleFlip}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            e.stopPropagation();
            handleFlip();
          }
        }}
      >
        <span className="sr-only" lang="es">Presiona Enter o Espacio para girar la tarjeta</span>
        <div
          className={`relative w-full h-full duration-500 preserve-3d transition-transform ${isFlipped ? "rotate-y-180" : ""}`}
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front */}
          <div
            className="absolute w-full h-full backface-hidden bg-surface-1 rounded-2xl border-2 border-border shadow-2xl flex flex-col items-center p-8 text-center hover:border-accent transition-colors"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <h3 className="text-text-secondary text-lg mb-4 font-semibold uppercase tracking-wider shrink-0">
              Pregunta
            </h3>
            <div className="flex-1 flex flex-col justify-center items-center gap-2 text-xl md:text-3xl text-text-primary font-medium max-w-full overflow-y-auto break-words w-full">
              {renderQuestion()}
            </div>
            <p className="text-text-muted text-sm animate-pulse mt-4 shrink-0">
              Haz click para girar (ver respuesta/pregunta)
            </p>
          </div>

          {/* Back */}
          <div
            className="absolute w-full h-full backface-hidden bg-surface-2 rounded-2xl border-2 border-success shadow-2xl flex flex-col items-center p-8 text-center rotate-y-180"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <h3 className="text-success text-lg mb-4 font-semibold uppercase tracking-wider shrink-0">
              Respuesta
            </h3>
            <div className="flex-1 flex flex-col items-center justify-center text-2xl md:text-4xl text-text-primary font-mono w-full overflow-y-auto">
              <LatexRenderer formula={answerText} block />
            </div>

            <div className="flex gap-4 w-full px-8 justify-center mt-4 shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="bg-surface-1 hover:bg-surface-hover text-text-primary px-6 py-2 rounded-full font-bold transition-all flex-1 max-w-[150px] border border-border"
              >
                Anterior
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="bg-surface-1 hover:bg-surface-hover text-text-primary px-6 py-2 rounded-full font-bold transition-all flex-1 max-w-[150px] border border-border"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats / Motivation */}
      <div className="mt-8 text-center">
        <p className="text-slate-400 text-sm">
          Ganarás XP al completar la sesión (Próximamente)
        </p>
      </div>
    </div>
  );
};

export default MathFlashCard;
