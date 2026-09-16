Plan to improve UX and accessibility in `MathFlashCard.tsx`:
1. Add `role="button"`, `tabIndex={0}`, and focus styling (`focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none`) to the card container `div`.
2. Add a visually hidden `<span className="sr-only" lang="es">Presiona Espacio o Enter para girar la tarjeta</span>` to the card container.
3. Add a local `onKeyDown` handler on the card container for `Enter` and `Space` to flip the card, and call `e.stopPropagation()`.
4. Wrap `handleNext`, `handlePrev`, and `handleFlip` in `useCallback` to stabilize them.
5. Add a global `keydown` listener in `useEffect` to support `ArrowRight` (Next), `ArrowLeft` (Prev), `Space`/`Enter` (Flip), and `Escape` (Exit), applying the proper safeguards (filtering out other buttons/inputs, checking `useRef` for the card).
6. Add visual shortcut hints (e.g., `<span className="opacity-50 text-xs hidden sm:inline-block ml-1">[→]</span>`) to the Siguiente, Anterior, and Salir buttons.
