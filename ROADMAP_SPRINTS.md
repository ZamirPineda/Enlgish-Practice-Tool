# Roadmap de Producto y Ejecucion (Contexto Diario)

Ultima actualizacion: 3 de marzo de 2026

## Vision
Construir una app funcional, gratificante y consistente para preparar objetivo Google combinando:
- English interview skills
- Math speed/problem solving
- Dev reasoning/practice

## Norte de Producto
1. Daily loop de 15-25 minutos:
   Start -> 2 juegos English + 1 Math + 1 Dev -> resumen final -> recompensa.
2. UX unificada en todos los juegos:
   start screen + progreso + timer + feedback + cierre.
3. Gratificacion inmediata:
   resumen de sesion + streak + mini-logros.
4. Dificultad adaptativa:
   baja con errores en racha, sube con aciertos en racha.
5. Observabilidad fuerte:
   metricas por ruta objetivo Google.

## Definition of Done (Global)
1. `pnpm test` en verde.
2. `pnpm tsc --noEmit` en verde.
3. Sin warnings criticos de accesibilidad en modales.
4. Eventos analytics documentados y visibles en Stats.
5. Flujo usable en mobile y desktop.

## Plan de 4 Sprints

### Sprint 1 (3-16 marzo 2026): Base UX/UI + Accesibilidad
Objetivo:
- Unificar experiencia visual y de flujo en todos los juegos.

Tickets:
1. Crear `GameShell` base reutilizable.
2. Migrar juegos faltantes al mismo patron de start/progreso/timer/feedback/cierre.
3. Estandarizar variantes UI con `cva + clsx + tailwind-merge`.
4. Integrar `sonner` para feedback inmediato.
5. Integrar `motion` para transiciones/microinteracciones base.
6. Resolver `DialogTitle` y `DialogDescription` en modales.
7. Actualizar tests afectados por el nuevo flujo.

Librerias de esta fase:
- `class-variance-authority`
- `clsx`
- `tailwind-merge`
- `sonner`
- `motion`

---

### Sprint 2 (17-30 marzo 2026): Daily Loop 15-25 min
Objetivo:
- Implementar rutina diaria guiada end-to-end.

Tickets:
1. Crear `DailyLoopView` con secuencia 2 English + 1 Math + 1 Dev.
2. Agregar entrada al loop desde Home.
3. Persistir estado de loop para reanudar.
4. Construir resumen final del loop con recompensa.
5. Agregar selector de ruta objetivo:
   `english_interview`, `math_speed`, `dev_reasoning`.
6. Registrar eventos analytics del loop.
7. Tests de flujo completo (inicio, progreso, resume, cierre).

---

### Sprint 3 (31 marzo-13 abril 2026): Gratificacion + Dificultad Adaptativa
Objetivo:
- Mejorar retencion y aprendizaje progresivo.

Tickets:
1. Crear motor `adaptiveDifficulty` reusable.
2. Auto downshift si hay 2-3 errores seguidos.
3. Auto upshift por racha de aciertos.
4. `SessionSummary` unificado:
   XP, precision, fortalezas, debilidades.
5. Mini-logros y recompensas por consistencia semanal.
6. Mejorar feedback visual con `motion` + `sonner`.
7. Tests de reglas adaptativas y casos limite.

---

### Sprint 4 (14-27 abril 2026): Observabilidad + Performance + Backend-ready
Objetivo:
- Dejar la app lista para escalar y publicar.

Tickets:
1. Stats con metricas por ruta objetivo Google.
2. Integrar `web-vitals` (LCP/INP/CLS).
3. Integrar `@sentry/react` (errores + tracing).
4. Crear capa `repository` (local-first, backend-ready).
5. Dejar base para `@tanstack/react-query` con feature flag.
6. Spike de `Capacitor` para camino Android/Play Store.
7. Regresion completa + checklist release readiness.

Librerias de esta fase:
- `web-vitals`
- `@sentry/react`
- `@tanstack/react-query` (cuando inicie backend)
- `@capacitor/core` + `@capacitor/cli` (fase mobile)

## Orden de adopcion de librerias
1. Ahora:
   `cva`, `clsx`, `tailwind-merge`, `sonner`, `motion`.
2. UX avanzada:
   `@floating-ui/react`, `react-aria-components` (solo donde aporte).
3. Con backend:
   `@tanstack/react-query`.
4. Produccion:
   `web-vitals`, `@sentry/react`.
5. Movil:
   `Capacitor`.

## KPIs a seguir
1. Daily loop completion rate.
2. Tiempo promedio por sesion (objetivo 15-25 min).
3. Retencion semanal (streak activo).
4. Precision por ruta objetivo.
5. Errores frontend y Web Vitals.

## Checklist Diario (Standup rapido)
1. Que ticket cierro hoy.
2. Que riesgo o bloqueo tengo.
3. Que prueba automatica voy a correr.
4. Que evento analytics nuevo toca validar.
5. Si impacta mobile/performance/accesibilidad.

## Log de Decisiones (rellenar cada dia)
```
Fecha:
Sprint:
Ticket:
Decision tomada:
Por que:
Impacto esperado:
Rollback plan:
```

## Referencias de Ejecucion
1. Desglose operativo APP-103 para rollout en todos los juegos:
   `APP_103_SUBTASKS.md`
