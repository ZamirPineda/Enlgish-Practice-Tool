# APP-103 Subtasks - Rollout Global en Todos los Juegos

Ultima actualizacion: 3 de marzo de 2026

## Objetivo

Replicar de forma consistente lo ya implementado en APP-101, APP-102 y APP-103
en todos los juegos para evitar deuda de UX/flujo antes de iniciar APP-104.

## Criterio de finalizacion por juego

1. APP-101: tiene pantalla de inicio configurable (dificultad/tiempo o equivalente).
2. APP-102: usa layout unificado (`GameShell` + `GameHudCard`) o componente equivalente aprobado.
3. APP-103: muestra `DailySessionInsights` al finalizar sesion.
4. Mantiene analytics (`session_start`, `item_correct/wrong`, `session_end`) sin regresiones.
5. Tests existentes verdes y nuevos tests minimos por vista si cambia flujo.

## Estado actual (inventario)

`DONE` significa que cumple 101 + 102 + 103.

1. `DONE` `src/pages/SpeedBuilderView.tsx`
2. `DONE` `src/pages/ErrorHunterView.tsx`
3. `DONE` `src/pages/ParaphraseDuelView.tsx`
4. `DONE` `src/pages/CollocationSprintView.tsx`
5. `DONE` `src/pages/TabooEnglishView.tsx`
6. `DONE` `src/pages/SentenceTransformerView.tsx`
7. `PENDING` `src/components/StopGamePlay.tsx` (ruta `/stop` via `StopGameView`)
8. `PENDING` `src/pages/MathGameView.tsx` (accedido desde `MathView`)
9. `PENDING` `src/pages/CodeSyntaxBuilderView.tsx`
10. `PENDING` `src/pages/CodeBugHunterView.tsx`
11. `PENDING` `src/pages/DiplomaticReviewerView.tsx`
12. `PENDING` `src/pages/tech-games/TechFlashcardsView.tsx`
13. `PENDING` `src/pages/tech-games/TechTriviaSprintView.tsx`
14. `PENDING` `src/pages/tech-games/TechMatchUpView.tsx`
15. `PENDING` `src/pages/tech-games/TechBossView.tsx`
16. `PENDING` `src/pages/StudyDocsGameView.tsx`
17. `PENDING` `src/pages/StudyDocsQuizView.tsx`
18. `PENDING` `src/pages/VocabularyVaultView.tsx` (flujo especial, requiere variante de cierre)

## Subtareas APP-103 (global rollout)

### APP-103.4 - Wave Dev Games

Alcance:

1. `CodeSyntaxBuilderView`
2. `CodeBugHunterView`
3. `DiplomaticReviewerView`

Entregables:

1. Migracion a `GameShell` + `GameHudCard`.
2. Integracion `DailySessionInsights` en cierre.
3. Ajustes de tests por flujo start/completion.

### APP-103.5 - Wave Tech Games

Alcance:

1. `TechFlashcardsView`
2. `TechTriviaSprintView`
3. `TechMatchUpView`
4. `TechBossView`

Entregables:

1. Unificar entrada de sesion (start screen consistente).
2. Integrar layout/hud compartido o wrapper tecnico equivalente.
3. Integrar `DailySessionInsights` donde exista fin de sesion.

### APP-103.6 - Wave Core Special Flows

Alcance:

1. `StopGamePlay` (`/stop`)
2. `MathGameView`
3. `StudyDocsGameView`
4. `StudyDocsQuizView`

Entregables:

1. Start flow configurable (o refactor del existente si ya lo tiene parcial).
2. Normalizar HUD/timer/progreso en estructura comun.
3. Cierre con `DailySessionInsights` y recompensas.

### APP-103.7 - Wave Vault + Study

Alcance:

1. `VocabularyVaultView`

Entregables:

1. Definir variante de `DailySessionInsights` para sesiones de repaso (no ronda clasica).
2. Integrar recompensa diaria/semanal sin duplicar claims.
3. Mantener accesibilidad y tests de import/export/streak.

### APP-103.8 - Hardening y cierre

Alcance:

1. Regresion focal completa de juegos.
2. Verificacion en mobile/desktop.
3. Auditoria de analytics por juego en `StatsView`.

Checklist:

1. `pnpm tsc --noEmit`
2. `pnpm vitest` focal (juegos tocados + analytics + home/widget)
3. Smoke manual de claim diario/semanal (sin doble premio)

## Orden recomendado de ejecucion

1. APP-103.4 (Dev Games)
2. APP-103.5 (Tech Games)
3. APP-103.6 (Special Flows)
4. APP-103.7 (Vault)
5. APP-103.8 (Hardening)

## Riesgos y mitigacion

1. Juegos con arquitecturas distintas pueden romper tests de UI.
   Mitigacion: migrar por oleadas pequenas + regression por ola.

2. Duplicacion de recompensas por multiples puntos de claim.
   Mitigacion: usar llaves idempotentes en storage (ya aplicado en daily/weekly rewards).

3. Desalineacion de analytics entre juegos.
   Mitigacion: validar eventos minimos por juego y revisar Stats despues de cada ola.
