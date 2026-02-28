# SECURITY_AUDIT

## 1) Stack y gestor de dependencias detectado

- **Stack principal:** Frontend React + Vite + TypeScript.
- **Gestor de dependencias:** **pnpm** (`package.json`, `pnpm-lock.yaml`).
- **CI existente:** `.github/workflows/deploy.yml` (deploy a GitHub Pages).

## 2) Auditoría de vulnerabilidades de dependencias

### Comandos ejecutados

```bash
pnpm install
pnpm audit --json
```

### Resultado

- Estado: **sin vulnerabilidades**.
- Resumen reportado por `pnpm audit`:
  - critical: 0
  - high: 0
  - moderate: 0
  - low: 0

## 3) Revisión de alertas de seguridad en GitHub

Se intentó consultar alertas con GitHub MCP:

- Code scanning alerts (`list_code_scanning_alerts`)
- Secret scanning alerts (`list_secret_scanning_alerts`)

Resultado: **403 Resource not accessible by integration** (sin permisos del token de integración en este entorno).

### Recomendación

- Verificar en GitHub UI:
  - `Security > Code scanning alerts`
  - `Security > Secret scanning alerts`
  - `Security > Dependabot alerts`
- Mantener habilitado Dependabot (configurado en este PR).

## 4) Revisión de secretos (sin exponer valores)

### Métodos de escaneo usados

- Búsqueda de patrones con `rg` (tokens, passwords, API keys, private keys).
- Búsqueda de archivos `.env*`.

### Hallazgos

No se detectaron secretos reales en código ejecutable.

Coincidencias encontradas en documentación/ejemplos (placeholders):

1. `public/study-docs/Ejecución/Guia_Ejecucion_Oracle.html` (línea aprox. 160)
   - Tipo: placeholder de password (`your_secure_password`).
2. `public/study-docs/Ejecución/Guia_Ejecucion_NATS.html` (línea aprox. 160)
   - Tipo: credencial de ejemplo (`admin/password`).
3. `public/study-docs/Ejecución/Guia_Ejecucion_Pulumi.html` (líneas aprox. 124 y 136)
   - Tipo: placeholder de access token (`<your_pulumi_access_token>`).

### Acciones recomendadas

- Mantener estos valores como placeholders (sin secretos reales).
- Si se usaron alguna vez valores reales en esas rutas, **rotar/revocar** credenciales y moverlas a variables de entorno/secret manager.

## 5) Medidas preventivas agregadas en este PR

1. **Dependabot semanal**
   - Archivo: `.github/dependabot.yml`
   - Ecosistemas:
   - pnpm
   - github-actions

2. **Workflow de seguridad en CI**
   - Archivo: `.github/workflows/security-audit.yml`
   - Jobs:
   - `pnpm audit --audit-level=high` (falla ante high/critical)
   - `gitleaks/gitleaks-action@v2` para detección de secretos

3. **Hardening de archivos sensibles**
   - `.gitignore` actualizado para ignorar:
     - `.env`
     - `.env.*` (excepto `.env.example`)
     - `*.pem`
     - `*.key`
   - Nuevo `.env.example` sin secretos reales.

## 6) Notas de validación

- Build verificado: `pnpm run build` ✅
- Tests verificados: `pnpm run test:ci` ✅

## 7) Actualización de remediation (2026-02-19)

### Vulnerabilidades abordadas en este PR

- **Resueltas (high):**
  - `minimatch < 10.2.1` (ReDoS, GHSA-3ppc-4f35-3m26)
- **Pendientes (moderate, no bloquean el check de CI actual):**
  - `ajv < 8.18.0` vía `@eslint/eslintrc` en ESLint 8 (`pnpm audit` reporta _No fix available_ sin saltar a ESLint 10).

### Cambios aplicados

1. Se mantuvo ESLint en major compatible (**8.x**) para evitar breaking changes innecesarios.
2. Se agregó `overrides` en `package.json` para forzar versión segura transitiva:

```json
"overrides": {
  "minimatch": "^10.2.1"
}
```

3. Se regeneró `pnpm-lock.yaml`.

### Resultado verificado

- `pnpm audit --audit-level=high` ✅ **exit code 0** (sin high/critical).
- `pnpm run lint` ✅
- `pnpm run typecheck` ✅
- `pnpm run test:ci` ✅
- `pnpm run build` ✅

### Reproducción local

```bash
pnpm install --frozen-lockfile
pnpm audit --audit-level=high
```

## 8) Hardening de GitHub Actions (2026-02-19)

- Se revisaron los workflows existentes (`ci.yml`, `deploy.yml`, `preview.yml`, `release-please.yml`, `security-audit.yml`) para aplicar principio de **mínimo privilegio**:
  - `ci.yml`: `contents: read`.
  - `preview.yml`: `contents: read` + `pull-requests: write` (solo para publicar/actualizar comentario en PR).
  - `release-please.yml`: `contents: write` + `pull-requests: write` (necesario para crear release PRs y tags).
  - `deploy.yml`: `contents: read`, `pages: write`, `id-token: write` (deploy a GitHub Pages).
  - `security-audit.yml`: `contents: read`.
- Se hizo pin de actions a **commit SHA** para mitigar riesgos de supply chain por tags mutables:
  - `actions/checkout`, `actions/setup-node`, `actions/cache`, `actions/upload-artifact`,
    `actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages`,
    `actions/github-script`, `pnpm/action-setup`, `googleapis/release-please-action`,
    `gitleaks/gitleaks-action`.
- Se confirmó que no se utiliza `pull_request_target`; se mantiene `pull_request` en workflows de PR para evitar ejecución con permisos elevados sobre código no confiable.

## 9) Hardening de CSP y recursos externos (2026-02-20)

- Se redujo la política CSP en `index.html` eliminando orígenes/directivas no necesarios:
  - `script-src`: se eliminó `'unsafe-inline'` y también `https://aistudiocdn.com` / `https://www.gstatic.com` (no se usan como scripts en el build actual).
  - `style-src`: se eliminó `https://fonts.googleapis.com`.
  - `font-src`: se eliminó `https://fonts.gstatic.com`.
  - `connect-src`: se eliminó `https://aistudiocdn.com`.
- Se agregaron directivas defensivas adicionales:
  - `object-src 'none'`
  - `base-uri 'self'`
- Se eliminó el bloque inline `importmap` (no era necesario para el flujo Vite con bundles locales).
- Se eliminó el bloque inline de configuración de Tailwind y se migró la animación `fade-in` a CSS estático para permitir quitar `'unsafe-inline'` en `script-src`.
- Se agregó SRI (`integrity` + `crossorigin="anonymous"`) a recursos externos versionados de KaTeX (`katex.min.css` y `katex.min.js`).
- Se mantiene `'unsafe-eval'` en `script-src` porque el runtime de `https://cdn.tailwindcss.com` lo requiere para generar utilidades en cliente. Quitarla rompería estilos en runtime sin una migración mayor a Tailwind precompilado localmente.
- Se mantiene `'unsafe-inline'` en `style-src` por uso actual de estilos inline en componentes React (`style={...}`), lo que requeriría refactor amplio para eliminarla sin romper UI.
