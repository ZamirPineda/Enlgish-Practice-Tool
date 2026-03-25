<div align="center">
  <img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# English Practice Tool

Aplicación web (React + Vite + TypeScript) para practicar inglés con varias modalidades: STOP game, study deck, scripts personales, vocabulary vault, repaso de matemáticas y visor de documentos de estudio.

## Stack técnico

- **Frontend:** React 19 + React Router
- **Build/dev server:** Vite 6
- **Lenguaje:** TypeScript
- **Testing:** Vitest + Testing Library
- **Deploy actual:** GitHub Pages (workflow en `.github/workflows/deploy.yml`)

## Requisitos

### Mínimos para desarrollo local

- **Node.js 20+** (el workflow de CI usa Node 20)
- **pnpm 10.26+** (alineado con la política de seguridad del repo)

### Opcionales (scripts auxiliares)

- **Python 3.10+** si quieres ejecutar `verification_script.py`
- Variables de entorno para scripts de importación de documentos (ver sección de variables)

## Instalación paso a paso

```bash
# 1) Clonar el repositorio
git clone https://github.com/ZamirPineda/Enlgish-Practice-Tool.git

# 2) Entrar al proyecto
cd Enlgish-Practice-Tool

# 3) Activar Corepack y preparar la versión fijada de pnpm
corepack enable
corepack prepare pnpm@10.26.0 --activate

# 4) Instalar dependencias
pnpm install --frozen-lockfile
```

## Ejecutar en local (desarrollo)

```bash
pnpm run dev
```

- Vite está configurado en `vite.config.ts` para correr en:
  - `host: 0.0.0.0`
  - `port: 3000`
- URL local esperada: `http://localhost:3000/`

## Build y modo producción

### Generar build estático

```bash
pnpm run build
```

Salida en carpeta `dist/`.

### Probar build localmente

```bash
pnpm run preview
```

> La base de Vite ahora se resuelve automáticamente:
>
> - En local usa `/`
> - En GitHub Actions (deploy Pages) usa `/${repository-name}/` (ej.: `/Enlgish-Practice-Tool/`)
> - Puedes forzarla con `VITE_BASE_PATH`

## Persistencia y estudio offline

- El progreso del **Vocabulary Vault** (deck + streaks) se guarda en `localStorage`.
- El tab **Backup & Sync** permite exportar/importar backup en formato **JSON**.
- La app incluye configuración **PWA** (`vite-plugin-pwa`) para habilitar modo offline tras instalar/visitar la app.

## Tests y lint

### Tests

```bash
pnpm test
```

Para ejecución no interactiva (útil en CI/local):

```bash
pnpm run test:ci
```

Pruebas end-to-end (Playwright):

```bash
pnpm exec playwright install chromium
pnpm run test:e2e
```

### Lint

```bash
pnpm run lint
```

### Formato (Prettier)

```bash
pnpm run format
```

### Typecheck

```bash
pnpm run typecheck
```

### Instalación segura con pnpm

El repo usa una política restrictiva en `pnpm-workspace.yaml`:

- solo `esbuild` puede ejecutar scripts de instalación;
- cualquier nuevo `preinstall` / `install` / `postinstall` no aprobado falla;
- `pnpm` rechaza versiones publicadas hace menos de 24 horas;
- se bloquean subdependencias transitivas con fuentes exóticas.

Comandos recomendados:

```bash
corepack enable
corepack prepare pnpm@10.26.0 --activate
pnpm install --frozen-lockfile
pnpm audit --audit-level=high
```

Si quieres inspeccionar un cambio sin permitir scripts de instalación, usa temporalmente:

```bash
pnpm install --ignore-scripts --frozen-lockfile
```

Ese modo sirve para revisión, pero no sustituye la instalación normal porque `esbuild` necesita su paso de instalación.

### Pre-commit (Husky + lint-staged)

Al instalar dependencias en una copia local con `.git/`, se activa Husky vía script `prepare`.
En CI y entornos con `HUSKY=0`, ese paso se omite.

En cada commit, el hook `pre-commit` ejecuta `lint-staged` sobre archivos staged:

- `prettier --write --ignore-unknown` en todos los archivos staged.
- `eslint --fix --max-warnings=0` en `*.ts` y `*.tsx` staged.

## Variables de entorno y configuración

No existe un archivo `.env` versionado en el repo actualmente.

### Variables detectadas

| Variable                         | Dónde se usa                   | Requerida                 | Descripción                                                                                |
| -------------------------------- | ------------------------------ | ------------------------- | ------------------------------------------------------------------------------------------ |
| `GEMINI_API_KEY`                 | `vite.config.ts`               | Opcional (a nivel build)  | Se inyecta en `process.env.API_KEY` y `process.env.GEMINI_API_KEY` para el código cliente. |
| `VITE_SENTRY_DSN`                | `src/lib/sentry.ts`            | Opcional                  | Habilita Sentry para errores frontend y contexto de ruta/juego (APP-403).                  |
| `VITE_SENTRY_TRACES_SAMPLE_RATE` | `src/lib/sentry.ts`            | Opcional                  | Sample rate de tracing (valor entre `0` y `1`, por defecto `0.2`).                         |
| `STUDIO_PATH`                    | `scripts/import-study-docs.js` | Sí (solo para ese script) | Ruta fuente para copiar documentos hacia `public/study-docs`.                              |

### Ejemplo de `.env.local` (sin secretos)

```env
# Opcional para funcionalidades que consuman API key
GEMINI_API_KEY=tu_api_key_aqui

# Opcional: activar APP-403 (Sentry)
VITE_SENTRY_DSN=https://<public-key>@o0.ingest.sentry.io/<project-id>
VITE_SENTRY_TRACES_SAMPLE_RATE=0.2
```

### Script auxiliar de importación de docs

```bash
# Linux/macOS
export STUDIO_PATH="/ruta/a/tus/docs"
node scripts/import-study-docs.js

# Windows PowerShell
$env:STUDIO_PATH="C:\ruta\a\tus\docs"
node scripts/import-study-docs.js
```

## Estructura del proyecto

```text
.
├── App.tsx                    # Router principal y navegación entre vistas
├── index.tsx                  # Punto de entrada React
├── components/                # Vistas y componentes UI
├── data/                      # Datos estáticos (drills, vocabulario, etc.)
├── hooks/                     # Hooks personalizados
├── utils/                     # Utilidades y lógica de soporte (incluye tests)
├── public/                    # Assets estáticos y study docs
├── scripts/                   # Scripts auxiliares de mantenimiento/importación
├── .github/workflows/         # CI/CD (deploy a GitHub Pages)
├── vite.config.ts             # Configuración de Vite/Vitest
└── verification_script.py     # Script opcional de verificación con Playwright
```

## Troubleshooting

### 1) `pnpm run dev` falla porque el puerto 3000 está ocupado

El proyecto fija el puerto `3000` en `vite.config.ts`.

- Cierra el proceso que use ese puerto, o
- ajusta temporalmente el puerto en `vite.config.ts`.

### 2) `pnpm run build` muestra warning de chunk grande

Es un warning conocido de Vite por tamaño de bundle, no un error bloqueante.

### 3) `pnpm test` actualmente reporta fallos

La infraestructura de tests existe, pero hay pruebas que ya fallan en el estado actual del repositorio (pendiente de corrección funcional). Esto no bloquea `pnpm run dev` ni `pnpm run build`.

### 4) `Error: STUDIO_PATH environment variable is not set`

Define `STUDIO_PATH` antes de ejecutar `node scripts/import-study-docs.js`.

### 5) Assets no cargan al desplegar en GitHub Pages

Verifica `VITE_BASE_PATH` si necesitas forzar una base específica. En GitHub Pages, la base se deriva automáticamente del repositorio.

## Roadmap (corto)

- Agregar script de lint (`pnpm run lint`) y reglas compartidas.
- Corregir y estabilizar la suite de tests existente.
- Documentar flujos de datos de cada módulo (STOP, Deck, Vault, Docs).
- Refinar guía de release/versionado.
- Incorporar CI de tests en pull requests.

## Conventional Commits (requerido para releases automáticos)

Este repositorio usa **Release Please**. Para que el changelog, el bump de versión y el GitHub Release se generen automáticamente, los commits a `main` deben seguir Conventional Commits:

- `feat: ...` para nuevas funcionalidades
- `fix: ...` para correcciones
- `chore: ...`, `docs: ...`, `refactor: ...` para cambios internos
- Usa `!` o un bloque `BREAKING CHANGE:` cuando haya cambios incompatibles

Ejemplos:

```text
feat: add timer to study deck
fix: correct vocabulary streak reset on import
feat!: replace old stop game scoring model
```

## Cómo contribuir

1. Haz fork del repositorio.
2. Crea una rama desde `main`.
3. Realiza cambios pequeños y enfocados.
4. Ejecuta build/tests disponibles antes de abrir PR.
5. Abre un Pull Request describiendo claramente qué problema resuelve.

> No existe `CONTRIBUTING.md` por ahora (pendiente).
