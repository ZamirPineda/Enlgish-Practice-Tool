with open("src/components/MathFlashCard.tsx", "r") as f:
    content = f.read()

# Add focus visibility classes and local keyboard
content = content.replace(
'''      <div
        className="w-full relative min-h-[400px] md:min-h-[500px] cursor-pointer perspective-1000 group"
        style={{ perspective: "1000px" }}
        onClick={handleFlip}
      >''',
'''      <div
        role="button"
        tabIndex={0}
        aria-label="Flashcard. Press Space or Enter to flip."
        className="w-full relative min-h-[400px] md:min-h-[500px] cursor-pointer perspective-1000 group focus-visible:ring-2 focus-visible:ring-accent outline-none rounded-2xl"
        style={{ perspective: "1000px" }}
        onClick={handleFlip}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            e.stopPropagation();
            handleFlip();
          }
        }}
      >'''
)

content = content.replace(
'''  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };''',
'''  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      const isInput =
        activeTag === "input" ||
        activeTag === "textarea" ||
        activeTag === "button" ||
        activeTag === "a" ||
        document.activeElement?.getAttribute("role") === "button";

      if (isInput && e.key !== "Escape") return;

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          handleNext();
          break;
        case "ArrowLeft":
          e.preventDefault();
          handlePrev();
          break;
        case " ":
        case "Enter":
          e.preventDefault();
          handleFlip();
          break;
        case "Escape":
          e.preventDefault();
          onExit();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onExit, handleNext, handlePrev]);'''
)

with open("src/components/MathFlashCard.tsx", "w") as f:
    f.write(content)
