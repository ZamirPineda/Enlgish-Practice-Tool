import re

with open("src/components/MathFlashCard.tsx", "r") as f:
    content = f.read()

# 1. Import useCallback and useEffect (useEffect is already there)
content = content.replace(
    'import React, { useState, useEffect } from "react";',
    'import React, { useState, useEffect, useCallback } from "react";'
)

# 2. Add useCallback to handlers
handle_next_orig = """  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev + 1) % randomizedRows.length);
    }, 150); // slight delay for smooth transition
  };"""
handle_next_new = """  const handleNext = useCallback(() => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev + 1) % randomizedRows.length);
    }, 150); // slight delay for smooth transition
  }, [randomizedRows.length]);"""
content = content.replace(handle_next_orig, handle_next_new)

handle_prev_orig = """  const handlePrev = () => {
    // When going back, show the answer side first (since we likely just saw it)
    setIsFlipped(true);
    setTimeout(() => {
      setCurrentCardIndex(
        (prev) => (prev - 1 + randomizedRows.length) % randomizedRows.length,
      );
    }, 150);
  };"""
handle_prev_new = """  const handlePrev = useCallback(() => {
    // When going back, show the answer side first (since we likely just saw it)
    setIsFlipped(true);
    setTimeout(() => {
      setCurrentCardIndex(
        (prev) => (prev - 1 + randomizedRows.length) % randomizedRows.length,
      );
    }, 150);
  }, [randomizedRows.length]);"""
content = content.replace(handle_prev_orig, handle_prev_new)

handle_flip_orig = """  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };"""
handle_flip_new = """  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);"""
content = content.replace(handle_flip_orig, handle_flip_new)

# Add global keydown listener
global_listener = """
  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      const activeTag = document.activeElement?.tagName;
      if (
        activeTag === "INPUT" ||
        activeTag === "TEXTAREA" ||
        activeTag === "SELECT"
      ) {
        return;
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "Escape") {
        e.preventDefault();
        onExit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, onExit]);
"""
content = content.replace("  if (randomizedRows.length === 0)", global_listener + "\n  if (randomizedRows.length === 0)")


# Update Exit Button
exit_button_orig = """        <button
          onClick={onExit}
          className="text-slate-400 hover:text-white transition-colors"
        >
          ✕ Salir
        </button>"""
exit_button_new = """        <button
          onClick={onExit}
          className="text-slate-400 hover:text-white transition-colors"
        >
          ✕ Salir <span className="opacity-50 text-xs hidden sm:inline-block ml-1">[Esc]</span>
        </button>"""
content = content.replace(exit_button_orig, exit_button_new)

# Update Card Container
container_orig = """      <div
        className="w-full relative min-h-[400px] md:min-h-[500px] cursor-pointer perspective-1000 group"
        style={{ perspective: "1000px" }}
        onClick={handleFlip}
      >"""
container_new = """      <div
        className="w-full relative min-h-[400px] md:min-h-[500px] cursor-pointer perspective-1000 group focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none rounded-2xl"
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
        <span className="sr-only" lang="es">Presiona Espacio o Enter para girar la tarjeta</span>"""
content = content.replace(container_orig, container_new)

# Update Anterior Button
anterior_button_orig = """              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="bg-surface-1 hover:bg-surface-hover text-text-primary px-6 py-2 rounded-full font-bold transition-all flex-1 max-w-[150px] border border-border"
              >
                Anterior
              </button>"""
anterior_button_new = """              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="bg-surface-1 hover:bg-surface-hover text-text-primary px-6 py-2 rounded-full font-bold transition-all flex-1 max-w-[150px] border border-border"
              >
                Anterior <span className="opacity-50 text-xs hidden sm:inline-block ml-1">[←]</span>
              </button>"""
content = content.replace(anterior_button_orig, anterior_button_new)

# Update Siguiente Button
siguiente_button_orig = """              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="bg-surface-1 hover:bg-surface-hover text-text-primary px-6 py-2 rounded-full font-bold transition-all flex-1 max-w-[150px] border border-border"
              >
                Siguiente
              </button>"""
siguiente_button_new = """              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="bg-surface-1 hover:bg-surface-hover text-text-primary px-6 py-2 rounded-full font-bold transition-all flex-1 max-w-[150px] border border-border"
              >
                Siguiente <span className="opacity-50 text-xs hidden sm:inline-block ml-1">[→]</span>
              </button>"""
content = content.replace(siguiente_button_orig, siguiente_button_new)

with open("src/components/MathFlashCard.tsx", "w") as f:
    f.write(content)

print("Done")
