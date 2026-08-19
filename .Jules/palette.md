## 2026-02-18 - [Icon-Only Button Accessibility Pattern]

**Learning:** This app frequently uses icon-only buttons (Play, Mic, Save, etc.) without accessible labels.
**Action:** Always check for missing aria-labels on icon-only buttons in new components, especially in 'card' components like StopGameCard.

## 2026-02-27 - [Modal & Media Control Accessibility]

**Learning:** Critical navigation (Close Modal) and media controls (Play Audio) often miss `aria-label` when using SVG icons. This blocks screen reader users from basic interactions.
**Action:** Default to checking `StopItemModal` and `ReviewSession` patterns for similar unlabelled controls in future audits.

## 2026-03-01 - [Modal Accessibility Pattern]

**Learning:** Custom modals (e.g., `StopItemModal`, `CustomScenarioModal`) consistently lack `role="dialog"`, `aria-modal`, focus management, and Escape key handling, making them inaccessible.
**Action:** When implementing or fixing modals, always add `role="dialog"`, `aria-modal="true"`, focus the container on mount, and handle Escape key to close.

## 2026-03-02 - [Form Accessibility in Modals]

**Learning:** Input fields within modals (like "Add New Word") often rely on visual layout for labeling and lack explicit `htmlFor`/`id` associations, failing accessibility checks.
**Action:** Always verify form inputs have programmatically associated labels using `htmlFor` and `id`, and enforce this by testing with `getByLabelText`.

## 2026-03-03 - [Custom Toggle Accessibility Pattern]

**Learning:** Custom toggle buttons implemented with `div`s and CSS classes often lack semantic meaning, making them invisible to screen readers.
**Action:** Always add `role="switch"`, `aria-checked`, and `aria-label` to custom toggle buttons, and ensure inner decorative elements have `aria-hidden="true"`.

## 2026-03-05 - [Skip to Content Link]

**Learning:** The application lacked a "Skip to Content" link, forcing keyboard users to tab through the entire navigation menu on every page load.
**Action:** Added a `Skip to main content` link at the top of `App.tsx` that targets the main content area. Future layouts must preserve this structure.

## 2026-03-06 - [Dynamic Icon Button Accessibility]

**Learning:** Icon-only buttons with changing states (like "Record" / "Stop") often use a static `title` which confuses users about the current action.
**Action:** Use dynamic `aria-label` and `title` based on state, and add `aria-pressed` for toggle buttons. Wrap dynamic feedback in `role="status"` or `aria-live` regions.

## 2026-03-07 - [Global Keyboard Shortcuts Safety]

**Learning:** Global `keydown` listeners (e.g., `Space` to reveal) can hijack native interactions (like activating a "Quit" button) if not scoped correctly.
**Action:** Always check `document.activeElement` for interactive types (BUTTON, A, INPUT, TEXTAREA) before `preventDefault()` in global listeners.

## 2026-03-10 - [Aria Label added for Game Reward Button]

**Learning:** The 'Claim Reward' button in DailySessionInsights.tsx lacked an aria-label which can prevent screen-readers from easily interpreting its purpose given it contains an icon and dynamic text.
**Action:** Use conditional aria-labels for buttons whose state and text changes, so users who rely on screen readers understand what the button currently does and why it might be disabled.

## 2026-03-11 - [Interactive Flashcard Accessibility]

**Learning:** Custom interactive components implemented as generic `div` containers (like flashcards) that handle keyboard events globally often lack accessibility context (e.g. `role="button"`, focus styles) and can unintentionally hijack text field navigation if not properly scoped.
**Action:** Always add `role="button"`, `tabIndex={0}`, visible focus states (`focus-visible:ring`), and local `onKeyDown` handlers with `e.stopPropagation()` when implementing interactive containers. Provide context using visually hidden screen reader text (`sr-only`) rather than `aria-label` to avoid overwriting visible child content, and explicitly exclude `INPUT` and `TEXTAREA` elements when attaching global event listeners.
