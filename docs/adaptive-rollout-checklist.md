# Adaptive Rollout Checklist (APP-300-12)

Last updated: 2026-03-04

## Scope

- Rollout target: adaptive rules (`APP-301/302/303`) across active games.
- Objective: fast rollback by local feature flags when regressions appear.

## Pre-Release Checks

1. `pnpm.cmd typecheck` in green.
2. `pnpm.cmd test:ci` in green.
3. Verify downshift (`3` wrong) and upshift (`3` correct) for each migrated game.
4. Validate top/bottom boundaries (no underflow/overflow of levels).
5. Confirm `skillpal-adaptive-difficulty-log` entries are being written as expected.
6. Confirm Daily Loop shows suggested adaptive level when available.

## Rollout Controls

- Storage key: `skillpal-adaptive-rollout-v1`
- Global flag: `globalEnabled` (`true|false`)
- Per-game rollback list: `disabledGames` (`string[]`)
- Runtime event: `adaptiveRolloutUpdated`
- UI panel: `StatsView -> Adaptive Rollout Controls`

## Fast Rollback Steps

1. Open `StatsView`.
2. In `Adaptive Rollout Controls`, click `Disable Global` for emergency rollback.
3. If impact is isolated, re-enable global and disable only affected game(s).
4. Re-run smoke checks for impacted routes.
5. Keep rollout disabled for affected game(s) until fix is validated in CI.

## Recovery Steps

1. Apply fix and run:
   - `pnpm.cmd typecheck`
   - `pnpm.cmd test:ci`
2. Re-enable game toggle(s) from `Adaptive Rollout Controls`.
3. Monitor adaptive logs and error trends in `StatsView`.
4. If stable, keep rollout enabled and close incident notes.

## Notes

- Manual difficulty selection remains available even when adaptive auto-shifts are disabled.
- When adaptive rollout is disabled for a game, auto up/down shifts are ignored for that game.
