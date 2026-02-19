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
- **npm 10+** (recomendado con Node 20)

### Opcionales (scripts auxiliares)

- **Python 3.10+** si quieres ejecutar `verification_script.py`
- Variables de entorno para scripts de importación de documentos (ver sección de variables)

## Instalación paso a paso

```bash
# 1) Clonar el repositorio
git clone https://github.com/ZamirPineda/Enlgish-Practice-Tool.git

# 2) Entrar al proyecto
cd Enlgish-Practice-Tool

# 3) Instalar dependencias
npm install
```

## Ejecutar en local (desarrollo)

```bash
npm run dev
```

- Vite está configurado en `vite.config.ts` para correr en:
  - `host: 0.0.0.0`
  - `port: 3000`
- URL local esperada: `http://localhost:3000/`

## Build y modo producción

### Generar build estático

```bash
npm run build
```

Salida en carpeta `dist/`.

### Probar build localmente

```bash
npm run preview
```

> El proyecto está preparado para GitHub Pages con base `/Enlgish-Practice-Tool/`.

## Tests y lint

### Tests

```bash
npm test
```

Para ejecución no interactiva (útil en CI/local):

```bash
npm run test:ci
```

### Lint

```bash
npm run lint
```

### Typecheck

```bash
npm run typecheck
```

## Variables de entorno y configuración

No existe un archivo `.env` versionado en el repo actualmente.

### Variables detectadas

| Variable | Dónde se usa | Requerida | Descripción |
|---|---|---|---|
| `GEMINI_API_KEY` | `vite.config.ts` | Opcional (a nivel build) | Se inyecta en `process.env.API_KEY` y `process.env.GEMINI_API_KEY` para el código cliente. |
| `STUDIO_PATH` | `scripts/import-study-docs.js` | Sí (solo para ese script) | Ruta fuente para copiar documentos hacia `public/study-docs`. |

### Ejemplo de `.env.local` (sin secretos)

```env
# Opcional para funcionalidades que consuman API key
GEMINI_API_KEY=tu_api_key_aqui
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

### 1) `npm run dev` falla porque el puerto 3000 está ocupado

El proyecto fija el puerto `3000` en `vite.config.ts`.

- Cierra el proceso que use ese puerto, o
- ajusta temporalmente el puerto en `vite.config.ts`.

### 2) `npm run build` muestra warning de chunk grande

Es un warning conocido de Vite por tamaño de bundle, no un error bloqueante.

### 3) `npm test` actualmente reporta fallos

La infraestructura de tests existe, pero hay pruebas que ya fallan en el estado actual del repositorio (pendiente de corrección funcional). Esto no bloquea `npm run dev` ni `npm run build`.

### 4) `Error: STUDIO_PATH environment variable is not set`

Define `STUDIO_PATH` antes de ejecutar `node scripts/import-study-docs.js`.

### 5) Assets no cargan al desplegar en GitHub Pages

Verifica que el despliegue use la base `/Enlgish-Practice-Tool/` (ya configurada en `vite.config.ts`).

## Roadmap (corto)

- Agregar script de lint (`npm run lint`) y reglas compartidas.
- Corregir y estabilizar la suite de tests existente.
- Documentar flujos de datos de cada módulo (STOP, Deck, Vault, Docs).
- Añadir guía de release/versionado.
- Incorporar CI de tests en pull requests.

## Cómo contribuir

1. Haz fork del repositorio.
2. Crea una rama desde `main`.
3. Realiza cambios pequeños y enfocados.
4. Ejecuta build/tests disponibles antes de abrir PR.
5. Abre un Pull Request describiendo claramente qué problema resuelve.

> No existe `CONTRIBUTING.md` por ahora (pendiente).
