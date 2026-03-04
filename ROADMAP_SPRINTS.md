# Roadmap de Producto y Ejecucion (Contexto Diario)

Ultima actualizacion: 4 de marzo de 2026

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
- APP-401 aplicado: Stats incorpora comparativa y filtro por rutas objetivo Google (`english_interview`, `math_speed`, `dev_reasoning`).
- APP-402 aplicado: web-vitals (`LCP`, `INP`, `CLS`) se capturan al iniciar app y se almacenan localmente.
- APP-403 aplicado: Sentry reporta errores frontend con contexto de ruta y juego activo.
- APP-501 aplicado: contrato `Content Inventory` versionado con schema canónico (`id`, `source`, `tags`, `skill`, `difficulty`, `format`, `metadata`) y tests.
- APP-502 aplicado: adaptadores desde `StudyDeck`, `vocab-vault-deck` y `techDecks` generan `Content Inventory` sin afectar vistas existentes.

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

| Key     | Tipo       | Historia                                                          |  SP | Criterios de aceptacion                                  |
| ------- | ---------- | ----------------------------------------------------------------- | --: | -------------------------------------------------------- |
| APP-300 | Initiative | Rollout adaptativo a todos los juegos                             |   0 | Todos los juegos activos usan APP-301/302/303 con tests. |
| APP-301 | Epic Task  | Motor adaptativo reusable                                         |   8 | API unica para subir/bajar dificultad por juego.         |
| APP-302 | Story      | Regla downshift por 2-3 errores seguidos                          |   5 | Dificultad baja automaticamente con log de causa.        |
| APP-303 | Story      | Regla upshift por racha de aciertos                               |   5 | Dificultad sube automaticamente con log de causa.        |
| APP-304 | Story      | SessionSummary unificado (XP, precision, fortalezas, debilidades) |   8 | Todos los juegos muestran resumen comun.                 |
| APP-305 | Story      | Mini-logros y racha semanal                                       |   5 | Usuario recibe badges/recompensas por consistencia.      |
| APP-306 | Story      | Microinteracciones de recompensa con motion + toasts              |   3 | Feedback visual claro al completar hitos.                |
| APP-307 | QA         | Test de reglas adaptativas                                        |   3 | Casos limite cubiertos (oscilacion, top/bottom level).   |

Total estimado: 37 SP

### Subtasks APP-300 (rollout total)

Nota: `APP-300` no suma SP propio; organiza la ejecucion de `APP-301..APP-307`.

| Subtask    | Bloque   | Alcance                                                                    | Estado      | Criterio de cierre                                                                                                |
| ---------- | -------- | -------------------------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------- |
| APP-300-01 | Base     | Inventario de juegos + matriz `gameId`, niveles, default y timer           | Pending     | Documento con todos los juegos jugables y su configuracion adaptativa objetivo.                                   |
| APP-300-02 | Base     | Contrato comun para logs de causa (up/down/manual)                         | Done        | `adaptiveDifficulty.ts` centraliza tipos, helpers y storage key unificada.                                        |
| APP-300-03 | Batch A  | `ErrorHunter`, `CollocationSprint`, `TabooEnglish`                         | Done        | Reglas `downshift/upshift` activas + toast + log en localStorage + tests verdes.                                  |
| APP-300-04 | Batch B  | `ParaphraseDuel`, `SentenceTransformer`, `SpeedBuilder`                    | Done        | Misma integracion adaptativa sin regresiones funcionales ni de UX.                                                |
| APP-300-05 | Batch C  | `DiplomaticReviewer`, `StopGame`                                           | Done        | Dificultad ajusta por rachas y se resetea correctamente en restart/start.                                         |
| APP-300-06 | Batch D  | `MathGame`, `MathView`                                                     | Done        | Escala de dificultad matematica conectada al motor reusable y reglas 302/303.                                     |
| APP-300-07 | Batch E  | `CodeBugHunter`, `CodeSyntaxBuilder`, `StudyDocsGame`, `StudyDocsQuiz`     | Done        | Juegos Dev integrados con mismas reglas adaptativas y logging de causa.                                           |
| APP-300-08 | Batch F  | `TechTriviaSprint`, `TechMatchUp`, `TechFlashcards`, `TechBoss`            | Done        | Juegos Tech migrados con control de limites (top/bottom) y toasts coherentes.                                     |
| APP-300-09 | QA       | Pruebas por juego de rachas (3 correctas/3 errores), bordes y ultima ronda | In Progress | Cobertura en CI para evitar oscilacion y cambios de nivel al cerrar sesion (Batch A, B, C, D, E y F completados). |
| APP-300-10 | QA       | Regresion global (`pnpm typecheck`, `pnpm test:ci`) por cada batch         | Done        | Cada batch mergea solo con suite completa en verde.                                                               |
| APP-300-11 | Producto | Compatibilidad con Daily Loop y SessionSummary unificado (`APP-304`)       | Done        | Flujo diario no rompe progresion y consume nivel ajustado por juego.                                              |
| APP-300-12 | Release  | Checklist de rollout + rollback por feature flag/local toggle              | Done        | Existe plan de apagado rapido por juego si aparece regresion en produccion.                                       |

## Sprint 4 | Observabilidad base

Objetivo: visibilidad minima confiable antes de escalar contenido.

| Key     | Tipo      | Historia                                   |  SP | Criterios de aceptacion                                 |
| ------- | --------- | ------------------------------------------ | --: | ------------------------------------------------------- |
| APP-401 | Epic Task | Metricas de ruta objetivo Google en Stats  |   5 | Dashboard filtra y compara 3 rutas objetivo.            |
| APP-402 | Story     | Integrar web-vitals (LCP/INP/CLS)          |   5 | Metricas se capturan y almacenan localmente.            |
| APP-403 | Story     | Integrar @sentry/react (errores + tracing) |   5 | Errores frontend reportados con contexto de ruta/juego. |

Total estimado: 15 SP

## Sprint 5 | Inventario unificado v1

Objetivo: consolidar contenido para reutilizarlo entre Study Deck, Vault y juegos.

| Key     | Tipo      | Historia                                                              |  SP | Criterios de aceptacion                                                               |
| ------- | --------- | --------------------------------------------------------------------- | --: | ------------------------------------------------------------------------------------- |
| APP-501 | Epic Task | Diseñar `Content Inventory` canonico                                  |   8 | Existe esquema unico (`id`, fuente, tags, skill, dificultad, formato, metadata).      |
| APP-502 | Story     | Crear adaptadores desde `StudyDeck`, `vocab-vault-deck` y `techDecks` |   8 | Fuentes actuales se transforman al inventario sin romper vistas existentes.           |
| APP-503 | Story     | Normalizacion + deduplicacion por huella de contenido                 |   5 | Items duplicados se detectan y consolidan con reglas trazables.                       |
| APP-504 | Story     | Indices por `skill/category/level/game` para consultas rapidas        |   5 | Juegos consumen queries por filtros sin escanear datasets completos.                  |
| APP-505 | Story     | Contrato de seleccion comun para juegos (`pickNextItems`)             |   5 | Al menos 4 juegos usan selector unificado en lugar de acceso directo a data files.    |
| APP-506 | QA        | Tests de inventario, adapters y dedupe                                |   3 | Suite valida consistencia, cardinalidad y estabilidad de ids.                         |
| APP-507 | Story     | UI foundation con `shadcn/ui` + `@radix-ui/themes`                    |   3 | Base de componentes/tokens aplicada en inventario y vistas nuevas sin romper estilos. |

Total estimado: 37 SP

## Sprint 6 | Antirepeticion + expansion de ejemplos

Objetivo: reducir fatiga por repeticion y ampliar volumen util de practica.

| Key     | Tipo      | Historia                                                                       |  SP | Criterios de aceptacion                                                         |
| ------- | --------- | ------------------------------------------------------------------------------ | --: | ------------------------------------------------------------------------------- |
| APP-601 | Epic Task | Motor antirepeticion basado en historial reciente                              |   8 | Seleccion evita repetir el mismo item en ventanas cortas por juego/sesion.      |
| APP-602 | Story     | Expandir ejemplos English core (`SpeedBuilder`, `Paraphrase`, etc.)            |   8 | +40% de ejemplos curados y etiquetados por dificultad/tema.                     |
| APP-603 | Story     | Expandir ejemplos Math/Dev con niveles                                         |   5 | Nuevos items clasificados por nivel y objetivo (`math_speed`, `dev_reasoning`). |
| APP-604 | Story     | Reusar inventario en Daily Loop para variar pasos                              |   5 | Daily Loop rota contenido sin perder foco de ruta objetivo.                     |
| APP-605 | Story     | Telemetria de repeticion (`repeat_rate`, `content_coverage`)                   |   5 | Stats muestra tasa de repeticion y cobertura por categoria/ruta.                |
| APP-606 | QA        | Pruebas de no-regresion en variedad y calidad                                  |   3 | Casos de borde: dataset pequeno, filtros estrictos, sesiones largas.            |
| APP-607 | Story     | Coachmarks/tooltips con `@floating-ui/react` + microinteracciones con `motion` |   3 | Feedback contextual accesible y transiciones claras en flujos de practica.      |

Total estimado: 37 SP

## Sprint 7 | Pipeline de contenido

Objetivo: poder agregar/curar contenido sin tocar N archivos por juego.

| Key     | Tipo      | Historia                                                                         |  SP | Criterios de aceptacion                                                         |
| ------- | --------- | -------------------------------------------------------------------------------- | --: | ------------------------------------------------------------------------------- |
| APP-701 | Epic Task | Pipeline de authoring/import para contenido unificado                            |   8 | Flujo soporta CSV/JSON -> validacion -> inventario versionado.                  |
| APP-702 | Story     | Validadores de calidad (formato, longitud, tags, dificultad)                     |   5 | Se bloquean items invalidos antes de entrar a produccion local.                 |
| APP-703 | Story     | Linter de duplicados/near-duplicates                                             |   5 | Reporte automatizado de colisiones exactas y aproximadas.                       |
| APP-704 | Story     | Herramienta de muestreo para review humano                                       |   5 | Se puede revisar muestra por categoria y aprobar/rechazar lotes.                |
| APP-705 | Story     | Versionado de packs de contenido + changelog                                     |   5 | Cada update de contenido tiene version y notas legibles para rollback.          |
| APP-706 | QA        | Tests de pipeline + snapshots de inventario                                      |   3 | Cambios de contenido rompen CI si alteran contratos sin migracion declarada.    |
| APP-707 | Story     | Mesa de curacion con `@tanstack/react-table` + orden manual con `@dnd-kit/react` |   5 | Curacion/filtrado/reordenamiento de contenido disponible para operacion diaria. |

Total estimado: 36 SP

## Sprint 8 | Roadmap secuencial v1 (estilo modulos)

Objetivo: experiencia tipo camino de aprendizaje por modulos y unidades.

| Key     | Tipo      | Historia                                                     |  SP | Criterios de aceptacion                                                           |
| ------- | --------- | ------------------------------------------------------------ | --: | --------------------------------------------------------------------------------- |
| APP-801 | Epic Task | Crear `RoadmapView` con mapa de modulos/unidades             |   8 | Vista presenta nodos secuenciales con estado: bloqueado/en progreso/completado.   |
| APP-802 | Story     | Modelo de roadmap (`module`, `unit`, `lesson`, `node`)       |   5 | Estructura versionable y compatible con rutas objetivo Google.                    |
| APP-803 | Story     | Reglas de desbloqueo secuencial + prerequisitos              |   5 | Usuario no salta unidades sin cumplir criterio minimo de dominio.                 |
| APP-804 | Story     | Integracion con juegos existentes como lecciones             |   8 | Cada nodo dispara juego/sesion concreta con parametros de contenido y dificultad. |
| APP-805 | Story     | Recompensas de progreso de roadmap                           |   5 | XP/badges por completar unidad/modulo y mantener continuidad.                     |
| APP-806 | QA        | Tests E2E de flujo secuencial completo                       |   3 | Happy path + bloqueo por prerequisitos + reanudacion de unidad.                   |
| APP-807 | Story     | Componentes accesibles complejos con `react-aria-components` |   3 | Navegacion por roadmap/filtros avanzados con soporte robusto de teclado y lector. |

Total estimado: 37 SP

## Sprint 9 | Personalizacion del camino v2

Objetivo: adaptar el roadmap al desempeno real del usuario.

| Key     | Tipo      | Historia                                                  |  SP | Criterios de aceptacion                                                             |
| ------- | --------- | --------------------------------------------------------- | --: | ----------------------------------------------------------------------------------- |
| APP-901 | Epic Task | Motor de recomendacion de siguiente nodo                  |   8 | Recomienda unidad segun errores recurrentes, progreso y objetivo elegido.           |
| APP-902 | Story     | Diagnostico de brechas por skill/tag                      |   5 | Se calculan debilidades accionables por ruta y categoria.                           |
| APP-903 | Story     | Insercion de nodos de refuerzo (remedial)                 |   5 | Roadmap agrega lecciones de refuerzo antes de avanzar cuando sea necesario.         |
| APP-904 | Story     | Evaluacion de ubicacion (placement) para saltar unidades  |   5 | Usuario puede acelerar inicio sin romper secuencia ni precision del diagnostico.    |
| APP-905 | Story     | Integracion con Daily Loop como modo rapido del roadmap   |   5 | Daily Loop consume nodos activos del roadmap cuando existe plan en curso.           |
| APP-906 | QA        | Tests de decisiones adaptativas y no-oscilacion           |   3 | Reglas estables ante ruido de sesiones cortas y errores aislados.                   |
| APP-907 | Spike     | Evaluar migracion a `tailwindcss@4` + `@tailwindcss/vite` |   3 | POC con reporte de compatibilidad, riesgos visuales y plan de migracion progresiva. |

Total estimado: 34 SP

## Sprint 10 | Escalado de contenido + release readiness

Objetivo: preparar crecimiento sostenido de contenido y experiencia estable.

| Key      | Tipo      | Historia                                                    |  SP | Criterios de aceptacion                                                          |
| -------- | --------- | ----------------------------------------------------------- | --: | -------------------------------------------------------------------------------- |
| APP-1001 | Epic Task | Packs tematicos y por objetivo (English/Math/Dev)           |   8 | App soporta multiples packs activables sin duplicar logica de juegos.            |
| APP-1002 | Story     | Carga diferida de packs para reducir peso inicial           |   5 | Bundle inicial baja y los packs se cargan bajo demanda por ruta/modulo.          |
| APP-1003 | Story     | Estrategia offline/cache para roadmap y contenido activo    |   5 | Modulos en curso funcionan sin conexion con sincronizacion al volver online.     |
| APP-1004 | Story     | Panel de salud de contenido (cobertura, repeticion, huecos) |   5 | Stats interno muestra donde falta contenido por skill/level.                     |
| APP-1005 | Story     | Smoke tests mobile + desktop sobre roadmap y juegos         |   5 | Flujo completo validado en ambos formatos con reporte de issues.                 |
| APP-1006 | QA        | Checklist de release de contenido y rollback por pack       |   3 | Se puede desactivar un pack problemático sin afectar progreso global.            |
| APP-1007 | Story     | Migrar UI a `tailwindcss@4` bajo feature flag               |   5 | Migracion estable, sin regresiones criticas de estilos y con rollback inmediato. |

Total estimado: 36 SP

### Criterios de Evaluacion de Librerias (DoD UX)

1. A11y: no introducir regresiones de teclado/focus/lectores de pantalla.
2. Bundle: impacto controlado (preferencia por soluciones headless o copy-paste).
3. DX: onboarding simple para iterar rapido mientras se aprende.
4. Testabilidad: componentes integrables con Vitest/RTL sin hacks.
5. Rollback: cada adopcion debe poder deshabilitarse sin romper flujos core.

## Sprint 11 | Backend-ready, mobile y cierre tecnico

Objetivo: retomar infraestructura de plataforma una vez establecida la capa de contenido/roadmap.

| Key     | Tipo  | Historia                                      |  SP | Criterios de aceptacion                             |
| ------- | ----- | --------------------------------------------- | --: | --------------------------------------------------- |
| APP-404 | Story | Crear capa repository local-first             |   8 | Lectura/escritura desacoplada de UI.                |
| APP-405 | Story | Preparar react-query con feature flag         |   5 | Infra lista sin forzar backend aun.                 |
| APP-406 | Spike | POC de Capacitor Android                      |   5 | Build de prueba documentado + checklist Play Store. |
| APP-407 | QA    | Pruebas de regresion completas + smoke mobile |   3 | Suite verde y reporte final de release readiness.   |

Total estimado: 21 SP

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
