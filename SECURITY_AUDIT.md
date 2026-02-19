# SECURITY_AUDIT

## 1) Stack y gestor de dependencias detectado

- **Stack principal:** Frontend React + Vite + TypeScript.
- **Gestor de dependencias:** **npm** (`package.json`, `package-lock.json`).
- **CI existente:** `.github/workflows/deploy.yml` (deploy a GitHub Pages).

## 2) Auditoría de vulnerabilidades de dependencias

### Comandos ejecutados

```bash
npm install
npm audit --json
```

### Resultado

- Estado: **sin vulnerabilidades**.
- Resumen reportado por `npm audit`:
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
     - npm
     - github-actions

2. **Workflow de seguridad en CI**
   - Archivo: `.github/workflows/security-audit.yml`
   - Jobs:
     - `npm audit --audit-level=high` (falla ante high/critical)
     - `gitleaks/gitleaks-action@v2` para detección de secretos

3. **Hardening de archivos sensibles**
   - `.gitignore` actualizado para ignorar:
     - `.env`
     - `.env.*` (excepto `.env.example`)
     - `*.pem`
     - `*.key`
   - Nuevo `.env.example` sin secretos reales.

## 6) Notas de validación

- Build verificado: `npm run build` ✅
- Tests actuales del repositorio: existen fallos preexistentes no relacionados con esta tarea de seguridad.
