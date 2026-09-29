1. **Add `useCallback` to handler functions**
   - Wrap `handleNext`, `handlePrev`, `handleFlip`, and `onExit` (from props) in `useCallback` to ensure stable references.
2. **Add global keyboard event listener in `useEffect`**
   - Add a `useEffect` that listens for `keydown` on `window`.
   - Prevent hijacking if `document.activeElement?.tagName` is a `BUTTON`, `A`, `INPUT`, `TEXTAREA`.
   - Map `ArrowRight` to `handleNext`, `ArrowLeft` to `handlePrev`, `Escape` to `onExit`, and `Enter`/`Space` to `handleFlip`.
3. **Make the Flashcard accessible**
   - Add `role="button"`, `tabIndex={0}`, `focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none rounded-2xl` to the card container `div`.
   - Add a local `onKeyDown` to the `div` to handle `Enter` and `Space` locally (and call `e.stopPropagation()` / `e.preventDefault()`).
   - Add a visually hidden `<span className="sr-only" lang="es">Tarjeta de estudio interactiva. Usa Enter o Espacio para girar.</span>` inside the card container.
4. **Add keyboard hints to buttons**
   - Add `[Esc]` to the Salir button.
   - Add `[←]` to the Anterior button.
   - Add `[→]` to the Siguiente button.
   (using `<span className="hidden sm:inline-block opacity-50 text-xs ml-1">...</span>`)
5. **Log learning in journal**
   - Append learning about `role="button"` and `sr-only` to `.Jules/palette.md`.
6. **Verify**
   - Run formatting, linting, and tests.
