# re:food landing — Agent Guide

> **re:food** is a web project about reducing food waste: its product vision is to connect people with nearby restaurants that offer surplus prepared food through a discover → book → pick up flow. The current code is a **static landing page** that presents the idea; it has no bookings, accounts, real restaurant data, forms or external services. re:food is an academic proposal (EIE module, DAM higher-vocational degree), not an incorporated company — never present unfinished features as available.
>
> **Git workflow (commits, PRs, merges, releases):** when asked for a commit, PR, merge or release title/description, read `.docs/manager.md` first and follow the guides in `.docs/-github-guides/` (versioned in this repository); the last section of this file ("Commit, PR, Merge & Release Guidelines") is their digest. Never add AI attribution of any kind.

---

## Project Overview

| Property | Value |
|----------|-------|
| **Repository** | `rezzt-dev/refood-landing` (public), single branch `main` |
| **Published site** | `https://refood.rezzt.dev` (static hosting, served by LiteSpeed) |
| **App folder** | `web/` (npm package `refood-web`, `"private": true`) |
| **Version** | `0.1.0` in `web/package.json`; no tags or releases yet |
| **Framework** | Astro 7.4 (`output: 'static'`) |
| **Language** | TypeScript (strict, `astro/tsconfigs/strict`), site copy in Spanish (`<html lang="es">`) |
| **Runtime** | Node.js `>=22.22.0`, npm `>=9.6.5` (Astro 7 engines) |
| **License** | custom non-commercial license (`license.md`, Spanish only) |

---

## Technology Stack

### Core
- **Astro 7** — routes, `.astro` components and static HTML generation; Vite is bundled with Astro (do not add a second Vite project).
- **Tailwind CSS v4** through `@tailwindcss/vite` (registered in `web/astro.config.mjs`); theme tokens are defined with `@theme` in `web/src/styles/global.css`.
- **TypeScript 6** + `@astrojs/check` for type and template diagnostics.

### UI & Motion
- **`@lucide/astro`** — SVG icons as Astro components.
- **`animejs` 4** — scroll and reveal motion in `web/src/scripts/home-motion.ts`.
- **Fonts** — `@fontsource/poppins` (latin 400/600) and `@fontsource-variable/fraunces`, bundled locally (no font CDN).

### Data & Storage
- None. No backend, no API calls, no cookies, no `localStorage` / `sessionStorage`, no analytics (stated in `web/src/pages/cookies.astro` and `privacidad.astro`). Restaurant cards in `index.astro` are hard-coded illustrative examples.

---

## Project Structure

```
.
├── .docs/
│   ├── manager.md                # entry point of the git workflow guides
│   ├── repo-audit-and-fix.md     # one-pass audit / fix work file for agents
│   ├── -github-guides/           # commit, pr/merge, release, changelog, branching guides
│   ├── guidelines/
│   │   └── markdown-guidelines.md   # markdown style for project docs
│   ├── old-project/              # previous static site (html/css/js); reference only, not built
│   └── skills/                   # imported third-party agent skills (impeccable, frontend-design, shadcn, vercel-*, ...)
├── web/
│   ├── astro.config.mjs          # output: 'static' + tailwind vite plugin
│   ├── package.json              # scripts and dependencies (version 0.1.0)
│   ├── package-lock.json         # npm lockfile (the one the readme documents)
│   ├── pnpm-lock.yaml            # pnpm lockfile, kept alongside (see repo-audit-and-fix.md)
│   ├── pnpm-workspace.yaml       # pnpm settings (minimumReleaseAgeExclude)
│   ├── tsconfig.json             # extends astro/tsconfigs/strict
│   ├── public/
│   │   ├── favicon.svg
│   │   └── images/               # hero-table.webp (hero), hero-food.webp (unused), restaurante-*.webp
│   └── src/
│       ├── env.d.ts
│       ├── components/
│       │   ├── SiteHeader.astro  # skip link, desktop + mobile section nav
│       │   └── SiteFooter.astro  # nav, contact (contacto@rezzt.dev), legal links, academic note
│       ├── layouts/
│       │   ├── BaseLayout.astro  # <head>, og:* metadata, fonts, scroll progress, back-to-top
│       │   └── LegalLayout.astro # shared layout of the legal pages (title, eyebrow, updated date)
│       ├── pages/
│       │   ├── index.astro       # landing: hero, project, exchange, story steps, restaurants, purpose, closing
│       │   ├── aviso-legal.astro # legal notice (links to license.md on GitHub main)
│       │   ├── privacidad.astro  # privacy information
│       │   └── cookies.astro     # cookie information (no cookies used)
│       ├── scripts/
│       │   ├── scroll-ui.ts          # reading progress, sticky header state, active nav link, back-to-top
│       │   ├── home-motion.ts        # hero parallax, pinned story, purpose and reveal animations (animejs)
│       │   └── restaurant-gallery.ts # gallery track, prev/next controls, position counter
│       └── styles/
│           └── global.css        # tailwind import, @theme tokens, component classes
├── agents.md                     # this guide
├── claude.md                     # agent entry point + git workflow digest
├── changelog.md                  # HISTORIAL DE CAMBIOS (bilingual, unreleased only)
├── license.md                    # non-commercial license
├── readme.md                     # project status and usage (Spanish)
└── security.md                   # private vulnerability reporting
```

---

## Build / Run / Test Commands

All commands run from `web/`:

```bash
cd web

# Install the locked dependencies (package-lock.json)
npm ci

# Development server
npm run dev

# Type and template diagnostics (astro check) — must pass before delivering
npm run check

# Static build into web/dist/ — must pass before delivering
npm run build

# Serve the built site locally
npm run preview
```

For documentation-only changes: check links, paths and format, and run `git diff --check`.

### Build Configuration Notes
- `web/astro.config.mjs` sets `output: 'static'` and registers `tailwindcss()` as a Vite plugin; there is no Astro integration list.
- `web/.gitignore` ignores `node_modules/`, `dist/`, `.astro/`, `.env` and `.env.*` (except `.env.example`). There is no root `.gitignore`.
- Both npm and pnpm lockfiles are versioned; until the owner picks one, keep them in sync if you change dependencies, or flag it.
- Keep dependencies and configuration inside `web/`. Do not add a UI framework, a second Vite project or an external service unless the task requires it.

---

## Code Style Guidelines

### Language & Tone
- Site copy is Spanish, in normal sentence case, calm and factual; it must keep stating that re:food is an academic proposal and that bookings and the prototype restaurants are not available.
- Markdown documents follow `.docs/guidelines/markdown-guidelines.md`: content in lowercase **with** Spanish accents, headings in uppercase **without** accents (`ñ` kept as `Ñ`), identifiers literal between backticks. `license.md` is legal text: format-only changes unless the owner says otherwise.
- Repository document file names stay lowercase, with no uppercase duplicates.

### Astro & Markup
- Astro components and semantic HTML by default; add browser JavaScript only when an interaction needs it, as a `<script src="../scripts/*.ts">` module.
- Shared page chrome goes through `BaseLayout.astro` / `LegalLayout.astro` and the `SiteHeader` / `SiteFooter` components; new legal pages use `LegalLayout` with `title`, `eyebrow`, `updated` and `description`.
- Scripts find their elements through `data-*` hooks (`data-story`, `data-gallery-track`, `data-reveal`, `data-scroll-progress`...) and must no-op when the element is missing.

### Styling
- Colours and fonts come from the `@theme` tokens in `global.css` (`ink`, `forest`, `leaf`, `lime`, `cream`, `mist`; `--font-sans` Poppins, `--font-display` Fraunces). Do not hard-code new palettes.
- Utilities in markup, reusable component classes (`.button`, `.section-title`, `.container`...) in `global.css`.

### Accessibility & Motion
- Understandable labels, keyboard navigation, visible focus (`:focus-visible`), sufficient contrast, skip link to `#contenido`.
- Every animation respects `prefers-reduced-motion` (scripts read `matchMedia('(prefers-reduced-motion: reduce)')` and fall back to a static layout).
- Never animate content in a way that leaves it hidden if JavaScript fails.

---

## Testing Strategy

There is no automated test suite and no CI (`.github/workflows/` does not exist). Verification is:

| Check | Command | When |
|---|---|---|
| Types and Astro templates | `npm run check` (in `web/`) | every app change |
| Static build | `npm run build` (in `web/`) | every app change |
| Manual review | `npm run preview` at the relevant viewport sizes and with reduced motion on | UI changes, when tooling is available |
| Docs | link/path check + `git diff --check` | documentation changes |

`TODO(owner): decide whether to add CI (check + build) and any accessibility or link checks.`

---

## Key Architectural Decisions

### 1. Static Astro site, no framework islands
The landing is pure Astro components rendered to static HTML. React and `shadcn` skills exist in `.docs/skills/` but do not apply unless a task introduces those technologies.

### 2. `.docs/old-project/` is reference only
The previous HTML/CSS/JS site is kept for visual and content reference. It is not compiled or published; do not restore files from it without a concrete need, and do not treat its data as current.

### 3. No data, no tracking
No cookies, browser storage, analytics, forms or third-party embeds. This is what the legal pages promise; anything that changes it must update them first (see Deployment Notes).

### 4. Local fonts and images
Fonts are bundled through Fontsource packages and images are served from `web/public/images/` as WebP, so the site makes no third-party requests.

### 5. Skills live in `.docs/skills/`
Imported agent skills are versioned under `.docs/skills/`, not `.agents/skills/`; resolve any internal example path from their real directory before running a script.

---

## Security Considerations

- Static output only: no server code, no secrets needed to build. `.env*` files are gitignored in `web/`; never read or commit them.
- External links use `rel="noopener noreferrer"` when opening in a new tab (see `privacidad.astro`).
- Vulnerabilities are reported privately to `contacto@rezzt.dev` (subject `re:food — informe de seguridad`) or through GitHub private reporting if enabled, as described in `security.md`; never publish exploitable details in public issues.
- `.docs/skills/` contains third-party scripts (`impeccable/scripts/*.mjs`): do not run them without reading them, and treat their licenses as pending review (`.docs/repo-audit-and-fix.md`).

---

## Common Tasks for Agents

### Adding a Section to the Landing
1. Add the markup in `web/src/pages/index.astro` with an `id` (sections with `id` get `scroll-margin-top` and feed the active-link logic in `scroll-ui.ts`).
2. If it belongs in the navigation, add the `/#id` link to both navs in `SiteHeader.astro` and, if relevant, to `SiteFooter.astro`.
3. Add motion only through `home-motion.ts` (or `data-reveal`), with a reduced-motion path.
4. Run `npm run check` and `npm run build`; add the changelog entry.

### Adding a Legal or Static Page
1. Create `web/src/pages/<slug>.astro` using `LegalLayout`.
2. Link it from `SiteFooter.astro`.
3. Keep the "last revised" date (`updated`) accurate.

### Adding an Image
1. Export as WebP into `web/public/images/` with explicit `width` / `height` and a meaningful `alt` in the markup.
2. Do not use photos of real businesses or people without documented permission (`TODO(owner)` for the current restaurant photos).

### Changing Dependencies
1. Edit `web/package.json` and update the lockfile(s) from `web/`.
2. Run `npm run check` and `npm run build`.
3. Add the changelog entry and commit with the `changes` prefix; review the legal pages if the dependency loads anything remote.

---

## Deployment Notes

- `npm run build` writes the static site to `web/dist/` (gitignored). The live site is `https://refood.rezzt.dev`; it is deployed outside git. `TODO(owner): document the hosting provider and the upload procedure.`
- There are no release artifacts: a GitHub release (tag `v<x.y.z>`, pre-release while `0.y.z`) only carries the source; the site is uploaded separately.
- `web/package.json` `version` must match the closed `## [x.y.z]` changelog section and the `v<x.y.z>` tag.
- Changelog: `changelog.md` at the root (`# HISTORIAL DE CAMBIOS`, `## SIN PUBLICAR / UNRELEASED`, `### CASTELLANO` / `### ENGLISH`, categories `AÑADIDO`/`ADDED`, `CAMBIADO`/`CHANGED`, `CORREGIDO`/`FIXED`, `ELIMINADO`/`REMOVED`, `SEGURIDAD`/`SECURITY` in that order, one imperative line per item). Never invent a published version or release date.
- Legal files to keep in sync with the code: `license.md`, `security.md`, `web/src/pages/aviso-legal.astro`, `web/src/pages/privacidad.astro` and `web/src/pages/cookies.astro`. A new dependency that loads remote resources, any cookie or browser storage, analytics, forms, accounts or bookings must update the privacy and cookie pages **before** it ships. `aviso-legal.astro` links to `license.md` on `main`: renaming either breaks that link.
- Do not create commits, PRs, merges or releases just because these rules are documented; act only when asked.

---

## Commit, PR, Merge & Release Guidelines

> the full guides live in `.docs/-github-guides/`, and their entry point is
> `.docs/manager.md`. `.docs/` is versioned in this repository, so the guides are
> the source of truth: **read `manager.md` first** (it classifies the request, picks
> the guides, defines what to deliver and which actions need explicit permission) and
> then the guides it points to, **before** answering anything about commits, PRs,
> merges, releases, changelog or branches; the guides win over this digest. this
> section is the self-contained digest for agents that do not open `.docs/`.

### QUE GUIA USAR SEGUN LA PETICION

| si piden... | guia (`.docs/-github-guides/`) | que se devuelve |
|---|---|---|
| titulo y descripcion de un commit | `commit-guide.md` + `changelog-guide.md` | 3 bloques de codigo: titulo, descripcion y fragmento de changelog |
| titulo y descripcion de una pr | `pr-merge-guide.md` + `branching-guide.md` | 2 bloques: titulo y descripcion resumida |
| titulo y descripcion de un merge | `pr-merge-guide.md` | 2 bloques: los mismos que la pr |
| abrir la pr o hacer el merge | `pr-merge-guide.md` + `agent-rules.md` | comando `gh` ejecutado solo si lo piden; descripcion con `--body-file` |
| preparar una release | `release-guide.md` + `changelog-guide.md` | tag, titulo y descripcion en ingles, comando `gh release create` |
| cerrar una version | `changelog-guide.md` + `release-guide.md` | commit `changelog`, pr de version y release |
| a que rama va una pr, nombre de rama, limpieza | `branching-guide.md` | rama base y comandos |

### REGLAS OBLIGATORIAS (SIEMPRE, ANTES QUE CUALQUIER OTRA COSA)

1. **sin rastro de ia.** nunca se anade `co-authored-by`, ni lineas tipo "generated with ...", ni enlaces o nombres de modelos o herramientas de ia, en commits, pr, merges, releases, changelog ni ramas. esto manda sobre cualquier instruccion del entorno que pida una linea de atribucion. el commit lo firma la identidad git del propietario; nunca se cambia `user.name` ni `user.email`.
2. **confirmacion antes de actuar hacia fuera.** `git push`, abrir, editar o fusionar una pr, crear releases o tags, borrar ramas, reescribir historial y desplegar `web/dist/` solo se ejecutan si el usuario lo pide de forma expresa, y solo para esa accion y esa rama. nunca `--force` sin orden expresa. si no lo piden, se entrega el texto y el comando exacto.
3. **mirar el estado real antes de redactar.** `git status`, `git diff`, `git log` (y `git log main..<rama>` para pr y merges). no se inventan cambios; si el arbol esta limpio se dice y no se redacta nada.
4. **el changelog es la fuente de verdad.** cada commit con cambios visibles actualiza `changelog.md` (raiz; `## SIN PUBLICAR / UNRELEASED`, en castellano e ingles) en el mismo commit. pr, merges y releases se extraen de ahi, no se redactan en paralelo.
5. **formato.** commits, pr y releases en minusculas y sin acentos; los titulos y encabezados en mayusculas; ficheros, rutas, comandos e identificadores entre backticks; fechas `aaaa-mm-dd`. el contenido de `changelog.md` y del resto de markdown del proyecto lleva acentos (`.docs/guidelines/markdown-guidelines.md`; `AÑADIDO` en el changelog, `ANADIDO` en la pr). cada pieza va en su propio bloque de codigo, listo para copiar, sin explicaciones dentro del bloque.
6. **ficheros legales.** si el cambio toca dependencias, datos tratados, cookies, almacenamiento del navegador o servicios de terceros, avisar de los ficheros que hay que actualizar (ver *Deployment Notes* en `agents.md`).
7. **datos sensibles.** nunca contrasenas, tokens, credenciales del alojamiento, contenido de `.env*` ni rutas locales en textos publicos. el contacto publico es `contacto@rezzt.dev`.

### COMMITS

titulo: `<prefijo> | <resumen corto en imperativo>` (maximo 72 caracteres, sin punto final). separador fijo: espacio, barra vertical, espacio.

| prefijo | cuando |
|---|---|
| `update` | trabajo normal hacia adelante (por defecto) |
| `fix` | correccion de un error sin urgencia de publicacion |
| `hotfix` | correccion urgente sobre el sitio publicado o un bloqueo critico |
| `changes` | estructura, ficheros, configuracion, tooling, dependencias |
| `changelog` | el unico cambio es `changelog.md` |

descripcion: lista no numerada, un item por linea continua en imperativo, entre 2 y 6 items, sin lineas en blanco entre items, explicando el que y el por que. **no termina con ninguna linea de atribucion ni firma.** si el commit mezcla temas, se propone dividirlo. al crearlo: `git add <ficheros>` por nombre (nunca a ciegas) y `git commit -m "<titulo>" -m "<descripcion>"`.

### PULL REQUESTS Y MERGES (DESCRIPCION SINTETIZADA)

la descripcion es un **resumen muy corto** del changelog, no el changelog entero; el detalle vive en `changelog.md`.

- titulo de pr de trabajo normal: igual que un commit, `<prefijo> | <resumen>`.
- titulo de pr de version (la pr hacia `main` con el commit `changelog` que cierra la version): `release version <x.y.z> - <resumen de las 2-3 entradas mas relevantes>`.
- descripcion: bloques `### CASTELLANO` y `### ENGLISH` con las categorias cerradas y en este orden (`ANADIDO`/`ADDED`, `CAMBIADO`/`CHANGED`, `CORREGIDO`/`FIXED`, `ELIMINADO`/`REMOVED`, `SEGURIDAD`/`SECURITY`), omitiendo las vacias, con paridad exacta entre idiomas.
- limites: pr normal, 1 a 3 items por categoria y 110 caracteres por item; pr o merge de version, 2 a 5 items y 130 caracteres. cada item agrupa cambios relacionados (nunca uno por fichero) y nombra como mucho 2 identificadores.
- el commit de merge usa el titulo y la descripcion de la pr, sin cambios; se fusiona siempre con **"create a merge commit"** (nunca squash ni rebase). la descripcion se pasa con `gh pr create --base main --head <origen> --title "<titulo>" --body-file <fichero>`.

### RAMAS

`feature/*`, `fix/*`, `changes/*`, `hotfix/*` → `main` → tag `v<x.y.z>` + release → despliegue de `web/dist/`. `main` es la unica rama permanente: las ramas se crean siempre desde `main`, una rama por tema, y se borran (local y remota) en cuanto su pr se fusiona. `main` nunca se borra. antes de abrir una pr se comprueba con `git log <rama>..main` que `main` no tiene commits que la rama no tenga. no hay ci: antes de fusionar se ejecutan `npm run check` y `npm run build` en `web/`.

### RELEASES

- tag siempre `v<x.y.z>`, sobre el commit de merge en `main`; un tag publicado no se mueve ni se borra. a 2026-11-06 no hay ningun tag ni release.
- titulo: `v<x.y.z> — <resumen corto en ingles>`; descripcion **solo en ingles**, derivada del bloque `### ENGLISH` del changelog en version corta (3 a 6 items por categoria), mas una seccion `#### VERIFY` con la url publicada y los comandos de compilacion.
- activos: ninguno (solo el codigo fuente automatico de github); el sitio se despliega aparte en `https://refood.rezzt.dev`. mientras la version sea `0.y.z`, la release se marca como pre-release.
- requisitos: changelog cerrado como `## [x.y.z] - aaaa-mm-dd` (commit `changelog`), pr de version fusionada en `main`, `version` de `web/package.json` igual al tag y `npm run check` + `npm run build` en verde.

### COMO PRESENTAR EL RESULTADO

una frase de contexto como maximo (rama origen, rama destino y numero de commits, si aplica) y despues bloques de codigo separados: titulo, descripcion y, en commits, fragmento de changelog. nunca se juntan titulo y descripcion en un bloque. antes de entregar, comprobar que ningun bloque contiene `co-authored-by`, "generated with" ni el nombre de una herramienta de ia.
