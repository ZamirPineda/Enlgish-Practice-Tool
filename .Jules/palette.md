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

## 2026-03-12 - [Flashcard Accessibility and Global Keyboard Handling]

**Learning:** Custom interactive components like flashcards need `role="button"`, `tabIndex={0}`, and local `onKeyDown` handlers for `Enter` and `Space`. When implementing global keyboard shortcuts (like `ArrowRight`/`ArrowLeft`/`Escape`), it's crucial to check `document.activeElement?.tagName` to avoid hijacking native interactions, and properly manage event propagation (`e.stopPropagation()` in local handlers, checking `e.defaultPrevented` in global listeners). Visually hiding `aria-label` instructions using `<span className="sr-only">` inside the container prevents overriding the visible text content.
**Action:** Apply `role="button"`, focus styles, and local keyboard handlers to all custom `div` buttons. Implement global keydown listeners carefully with active element checks and `useCallback` for referenced functions. Add visual shortcut hints (e.g., `[Esc]`, `[←]`) to corresponding buttons to improve discoverability.

## 2026-03-12 - [Playwright E2E Flakiness Fixes]

**Learning:** `page.waitForLoadState("networkidle")` can cause timeouts and flakiness because it waits for no network connections for at least 500ms, which may not happen in dynamic apps. `page.evaluate()` immediately after `page.goto()` can fail with `Execution context was destroyed, most likely because of a navigation` due to framework routing. `window.location.reload()` might hang or timeout waiting for navigation in certain Playwright configurations.
**Action:** Use `page.waitForLoadState("domcontentloaded")` instead of `networkidle`. Use `await page.waitForLoadState("domcontentloaded")` before executing `page.evaluate()` after `page.goto("/")` to ensure the routing has stabilized. For mocking PWA reloads, asserting the banner visibility or absence is often more reliable than waiting for the `reload` event.
