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
