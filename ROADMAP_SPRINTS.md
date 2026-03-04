# Roadmap de Producto y Ejecucion (Contexto Diario)

Ultima actualizacion: 3 de marzo de 2026

## Vision

Construir una app funcional, gratificante y consistente para preparar objetivo Google combinando:

- English interview skills
- Math speed/problem solving
- Dev reasoning/practice

## Definition of Done (Global)

1. `pnpm test` en verde.
2. `pnpm tsc --noEmit` en verde.
3. Sin warnings criticos de accesibilidad en modales.
4. Eventos analytics documentados y visibles en Stats.
5. Flujo usable en mobile y desktop.

## Estado de referencia

- APP-101, APP-102 y APP-103: implementados.
- Daily Loop ya existe en codigo, pero pertenece al bloque APP-20x (Sprint 2), no a APP-104.
- APP-104 correcto para Sprint 1: integrar `sonner` para feedback global.

## Sprint 1 | Base UX/UI + accesibilidad

Objetivo: consistencia total de juegos.

| Key     | Tipo      | Historia                                                  |  SP | Criterios de aceptacion                                                        |
| ------- | --------- | --------------------------------------------------------- | --: | ------------------------------------------------------------------------------ |
| APP-101 | Epic Task | Crear GameShell base para juegos                          |   8 | Todos los juegos pueden usar layout comun (start/progreso/timer/feedback/end). |
| APP-102 | Story     | Migrar juegos faltantes al GameShell                      |   8 | 100% juegos con pantalla start configurable.                                   |
| APP-103 | Story     | Estandarizar variantes UI con cva + clsx + tailwind-merge |   5 | Botones/chips/timer usan variantes consistentes.                               |
| APP-104 | Story     | Integrar sonner para feedback global                      |   3 | Toasts para acierto/error/recompensa funcionando.                              |
| APP-105 | Story     | Integrar motion para transiciones base                    |   3 | Entradas/salidas suaves en start y summary.                                    |
| APP-106 | Bug       | Corregir warnings de DialogTitle/DialogDescription        |   5 | Sin warnings de accesibilidad en modales.                                      |
| APP-107 | QA        | Actualizar/estabilizar tests de juegos                    |   3 | Tests de juegos pasan en CI.                                                   |

Total estimado: 35 SP

## Sprint 2 | Daily Loop 15-25 min

Objetivo: rutina guiada diaria.

| Key     | Tipo      | Historia                                                                   |  SP | Criterios de aceptacion                               |
| ------- | --------- | -------------------------------------------------------------------------- | --: | ----------------------------------------------------- |
| APP-201 | Epic Task | Crear flujo Daily Loop end-to-end                                          |   8 | Ruta nueva con secuencia: 2 English + 1 Math + 1 Dev. |
| APP-202 | Story     | DailyLoopView + navegacion desde Home                                      |   5 | Inicio del loop en 1 clic desde Home.                 |
| APP-203 | Story     | Persistencia local de progreso de loop                                     |   5 | Usuario puede reanudar loop interrumpido.             |
| APP-204 | Story     | Resumen final del loop con XP/recompensa                                   |   5 | Pantalla final con resultados agregados.              |
| APP-205 | Story     | Selector de objetivo Google (english_interview, math_speed, dev_reasoning) |   5 | Loop adapta seleccion inicial y la registra.          |
| APP-206 | Story     | Nuevos eventos analytics de loop                                           |   5 | Eventos visibles en Stats y storage.                  |
| APP-207 | QA        | Tests del flujo completo de loop                                           |   3 | Cobertura minima de happy path + resume path.         |

Total estimado: 36 SP

## Sprint 3 | Gratificacion + dificultad adaptativa

Objetivo: engagement y progreso real.

| Key     | Tipo      | Historia                                                          |  SP | Criterios de aceptacion                                |
| ------- | --------- | ----------------------------------------------------------------- | --: | ------------------------------------------------------ |
| APP-301 | Epic Task | Motor adaptativo reusable                                         |   8 | API unica para subir/bajar dificultad por juego.       |
| APP-302 | Story     | Regla downshift por 2-3 errores seguidos                          |   5 | Dificultad baja automaticamente con log de causa.      |
| APP-303 | Story     | Regla upshift por racha de aciertos                               |   5 | Dificultad sube automaticamente con log de causa.      |
| APP-304 | Story     | SessionSummary unificado (XP, precision, fortalezas, debilidades) |   8 | Todos los juegos muestran resumen comun.               |
| APP-305 | Story     | Mini-logros y racha semanal                                       |   5 | Usuario recibe badges/recompensas por consistencia.    |
| APP-306 | Story     | Microinteracciones de recompensa con motion + toasts              |   3 | Feedback visual claro al completar hitos.              |
| APP-307 | QA        | Test de reglas adaptativas                                        |   3 | Casos limite cubiertos (oscilacion, top/bottom level). |

Total estimado: 37 SP

## Sprint 4 | Observabilidad, performance, backend-ready

Objetivo: escalar sin reescribir.

| Key     | Tipo      | Historia                                      |  SP | Criterios de aceptacion                                 |
| ------- | --------- | --------------------------------------------- | --: | ------------------------------------------------------- |
| APP-401 | Epic Task | Metricas de ruta objetivo Google en Stats     |   5 | Dashboard filtra y compara 3 rutas objetivo.            |
| APP-402 | Story     | Integrar web-vitals (LCP/INP/CLS)             |   5 | Metricas se capturan y almacenan localmente.            |
| APP-403 | Story     | Integrar @sentry/react (errores + tracing)    |   5 | Errores frontend reportados con contexto de ruta/juego. |
| APP-404 | Story     | Crear capa repository local-first             |   8 | Lectura/escritura desacoplada de UI.                    |
| APP-405 | Story     | Preparar react-query con feature flag         |   5 | Infra lista sin forzar backend aun.                     |
| APP-406 | Spike     | POC de Capacitor Android                      |   5 | Build de prueba documentado + checklist Play Store.     |
| APP-407 | QA        | Pruebas de regresion completas + smoke mobile |   3 | Suite verde y reporte final de release readiness.       |

Total estimado: 36 SP

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
