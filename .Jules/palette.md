## 2026-02-18 - [Icon-Only Button Accessibility Pattern]
**Learning:** This app frequently uses icon-only buttons (Play, Mic, Save, etc.) without accessible labels.
**Action:** Always check for missing aria-labels on icon-only buttons in new components, especially in 'card' components like StopGameCard.

## 2026-02-27 - [Modal & Media Control Accessibility]
**Learning:** Critical navigation (Close Modal) and media controls (Play Audio) often miss `aria-label` when using SVG icons. This blocks screen reader users from basic interactions.
**Action:** Default to checking `StopItemModal` and `ReviewSession` patterns for similar unlabelled controls in future audits.
