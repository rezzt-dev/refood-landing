# REFOOD-LANDING: REPOSITORY GUIDE

static landing page presenting an academic food-waste reduction proposal. this guide covers the repository; nested agent instructions apply within their own folders.

## PROJECT OVERVIEW

| property | verified value |
| --- | --- |
| repository | `rezzt-dev/refood-landing` |
| active source | `web/` |
| development base for this change | `main` |
| remote default branch | `main` |
| version source | `web/package.json`: `0.1.0` |
| continuous integration | no tracked github actions workflows |

## TECHNOLOGY STACK

- `web/package.json`: `astro` ^7.4.0, `tailwindcss` ^4.3.3, `typescript` ^6.0.3

## PROJECT STRUCTURE

- `changelog.md`
- `license.md`
- `readme.md`
- `security.md`
- `web/`

management documentation lives in `.docs/manager.md`, `.docs/-github-guides/` and `.docs/repo-audit-and-fix.md`. keep this file and `claude.md` consistent.

## BUILD, RUN AND TEST COMMANDS

from `web/`, the available package scripts are:

| command | implementation |
| --- | --- |
| `npm run dev` | `astro dev` |
| `npm run build` | `astro build` |
| `npm run preview` | `astro preview` |
| `npm run check` | `astro check` |

for application changes, run these checks from `web/`:

```bash
npm run check
npm run build
```

## CODE STYLE AND ARCHITECTURAL DECISIONS

do not describe reservations, restaurant data or accounts as implemented; preserve legal pages and the historical site as reference. follow the existing formatter and naming of the changed module. verify manifest versions when dependencies change.

## TESTING STRATEGY

documentation-only changes require `git diff --check`, existing-path checks and a review of the staged file list. run module checks for application changes, with disposable data. report unavailable tooling and failed checks; never claim a check passed without running it.

## SECURITY AND DEPLOYMENT

keep credentials, local configuration, signing material and user data out of commits. do not print secret values while auditing. inspect configuration names and code references instead.

existing legal and community files: `license.md`, `security.md`. when changing dependencies, permissions, storage or network services, review those files against the implementation. record missing policies as audit work; do not invent licence terms or ownership decisions.

deployment, signing, store publication, migrations against hosted databases and repository settings require their own explicit request. this documentation task prepares management instructions and pull requests.

## COMMON TASKS

1. read the relevant module and its nearest agent instructions
2. inspect the working tree and choose the smallest change that solves the request
3. update the affected documentation and changelog with evidence from the diff
4. run checks appropriate to the changed module and report their actual results
5. for git operations, follow the manager and the digest below

## EXISTING PROJECT CONVENTIONS

the following project-specific context is retained from the previous guide. paths are relative to the active module when stated. for git operations, the manager and final digest supersede previous workflow examples.

## RE:FOOD LANDING — AGENT GUIDE

> **re:food** is a web project about reducing food waste: its product vision is to connect people with nearby restaurants that offer surplus prepared food through a discover → book → pick up flow. the current code is a **static landing page** that presents the idea; it has no bookings, accounts, real restaurant data, forms or external services. re:food is an academic proposal (eie module, dam higher-vocational degree), not an incorporated company — never present unfinished features as available.
>
> **git workflow (commits, prs, merges, releases):** when asked for a commit, pr, merge or release title/description, read `.docs/manager.md` first and follow the guides in `.docs/-github-guides/` (versioned in this repository); the last section of this file ("commit, pr, merge & release guidelines") is their digest. never add ai attribution of any kind.

---

## PROJECT OVERVIEW

| property | value |
|----------|-------|
| **repository** | `rezzt-dev/refood-landing` (public), single branch `main` |
| **published site** | `https://refood.rezzt.dev` (static hosting, served by litespeed) |
| **app folder** | `web/` (npm package `refood-web`, `"private": true`) |
| **version** | `0.1.0` in `web/package.json`; no tags or releases yet |
| **framework** | astro 7.4 (`output: 'static'`) |
| **language** | typescript (strict, `astro/tsconfigs/strict`), site copy in spanish (`<html lang="es">`) |
| **runtime** | node.js `>=22.22.0`, npm `>=9.6.5` (astro 7 engines) |
| **license** | custom non-commercial license (`license.md`, spanish only) |

---

## TECHNOLOGY STACK

### CORE
- **astro 7** — routes, `.astro` components and static html generation; vite is bundled with astro (do not add a second vite project).
- **tailwind css v4** through `@tailwindcss/vite` (registered in `web/astro.config.mjs`); theme tokens are defined with `@theme` in `web/src/styles/global.css`.
- **typescript 6** + `@astrojs/check` for type and template diagnostics.

### UI & MOTION
- **`@lucide/astro`** — svg icons as astro components.
- **`animejs` 4** — scroll and reveal motion in `web/src/scripts/home-motion.ts`.
- **fonts** — `@fontsource/poppins` (latin 400/600) and `@fontsource-variable/fraunces`, bundled locally (no font cdn).

### DATA & STORAGE
- none. no backend, no api calls, no cookies, no `localStorage` / `sessionStorage`, no analytics (stated in `web/src/pages/cookies.astro` and `privacidad.astro`). restaurant cards in `index.astro` are hard-coded illustrative examples.

---

## PROJECT STRUCTURE

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

## BUILD / RUN / TEST COMMANDS

all commands run from `web/`:

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

for documentation-only changes: check links, paths and format, and run `git diff --check`.

### BUILD CONFIGURATION NOTES
- `web/astro.config.mjs` sets `output: 'static'` and registers `tailwindcss()` as a vite plugin; there is no astro integration list.
- `web/.gitignore` ignores `node_modules/`, `dist/`, `.astro/`, `.env` and `.env.*` (except `.env.example`). there is no root `.gitignore`.
- both npm and pnpm lockfiles are versioned; until the owner picks one, keep them in sync if you change dependencies, or flag it.
- keep dependencies and configuration inside `web/`. do not add a ui framework, a second vite project or an external service unless the task requires it.

---

## CODE STYLE GUIDELINES

### LANGUAGE & TONE
- site copy is spanish, in normal sentence case, calm and factual; it must keep stating that re:food is an academic proposal and that bookings and the prototype restaurants are not available.
- markdown documents follow `.docs/guidelines/markdown-guidelines.md`: content in lowercase **with** spanish accents, headings in uppercase **without** accents (`ñ` kept as `Ñ`), identifiers literal between backticks. `license.md` is legal text: format-only changes unless the owner says otherwise.
- repository document file names stay lowercase, with no uppercase duplicates.

### ASTRO & MARKUP
- astro components and semantic html by default; add browser javascript only when an interaction needs it, as a `<script src="../scripts/*.ts">` module.
- shared page chrome goes through `BaseLayout.astro` / `LegalLayout.astro` and the `SiteHeader` / `SiteFooter` components; new legal pages use `LegalLayout` with `title`, `eyebrow`, `updated` and `description`.
- scripts find their elements through `data-*` hooks (`data-story`, `data-gallery-track`, `data-reveal`, `data-scroll-progress`...) and must no-op when the element is missing.

### STYLING
- colours and fonts come from the `@theme` tokens in `global.css` (`ink`, `forest`, `leaf`, `lime`, `cream`, `mist`; `--font-sans` poppins, `--font-display` fraunces). do not hard-code new palettes.
- utilities in markup, reusable component classes (`.button`, `.section-title`, `.container`...) in `global.css`.

### ACCESSIBILITY & MOTION
- understandable labels, keyboard navigation, visible focus (`:focus-visible`), sufficient contrast, skip link to `#contenido`.
- every animation respects `prefers-reduced-motion` (scripts read `matchMedia('(prefers-reduced-motion: reduce)')` and fall back to a static layout).
- never animate content in a way that leaves it hidden if javascript fails.

---

## TESTING STRATEGY

there is no automated test suite and no ci (`.github/workflows/` does not exist). verification is:

| check | command | when |
|---|---|---|
| types and astro templates | `npm run check` (in `web/`) | every app change |
| static build | `npm run build` (in `web/`) | every app change |
| manual review | `npm run preview` at the relevant viewport sizes and with reduced motion on | ui changes, when tooling is available |
| docs | link/path check + `git diff --check` | documentation changes |

`TODO(owner): decide whether to add CI (check + build) and any accessibility or link checks.`

---

## KEY ARCHITECTURAL DECISIONS

### 1. STATIC ASTRO SITE, NO FRAMEWORK ISLANDS
the landing is pure astro components rendered to static html. react and `shadcn` skills exist in `.docs/skills/` but do not apply unless a task introduces those technologies.

### 2. `.docs/old-project/` IS REFERENCE ONLY
the previous html/css/js site is kept for visual and content reference. it is not compiled or published; do not restore files from it without a concrete need, and do not treat its data as current.

### 3. NO DATA, NO TRACKING
no cookies, browser storage, analytics, forms or third-party embeds. this is what the legal pages promise; anything that changes it must update them first (see deployment notes).

### 4. LOCAL FONTS AND IMAGES
fonts are bundled through fontsource packages and images are served from `web/public/images/` as webp, so the site makes no third-party requests.

### 5. SKILLS LIVE IN `.docs/skills/`
imported agent skills are versioned under `.docs/skills/`, not `.agents/skills/`; resolve any internal example path from their real directory before running a script.

---

## SECURITY CONSIDERATIONS

- static output only: no server code, no secrets needed to build. `.env*` files are gitignored in `web/`; never read or commit them.
- external links use `rel="noopener noreferrer"` when opening in a new tab (see `privacidad.astro`).
- vulnerabilities are reported privately to `contacto@rezzt.dev` (subject `re:food — informe de seguridad`) or through github private reporting if enabled, as described in `security.md`; never publish exploitable details in public issues.
- `.docs/skills/` contains third-party scripts (`impeccable/scripts/*.mjs`): do not run them without reading them, and treat their licenses as pending review (`.docs/repo-audit-and-fix.md`).

---

## COMMON TASKS FOR AGENTS

### ADDING A SECTION TO THE LANDING
1. add the markup in `web/src/pages/index.astro` with an `id` (sections with `id` get `scroll-margin-top` and feed the active-link logic in `scroll-ui.ts`).
2. if it belongs in the navigation, add the `/#id` link to both navs in `SiteHeader.astro` and, if relevant, to `SiteFooter.astro`.
3. add motion only through `home-motion.ts` (or `data-reveal`), with a reduced-motion path.
4. run `npm run check` and `npm run build`; add the changelog entry.

### ADDING A LEGAL OR STATIC PAGE
1. create `web/src/pages/<slug>.astro` using `LegalLayout`.
2. link it from `SiteFooter.astro`.
3. keep the "last revised" date (`updated`) accurate.

### ADDING AN IMAGE
1. export as webp into `web/public/images/` with explicit `width` / `height` and a meaningful `alt` in the markup.
2. do not use photos of real businesses or people without documented permission (`TODO(owner)` for the current restaurant photos).

### CHANGING DEPENDENCIES
1. edit `web/package.json` and update the lockfile(s) from `web/`.
2. run `npm run check` and `npm run build`.
3. add the changelog entry and commit with the `changes` prefix; review the legal pages if the dependency loads anything remote.

---

## DEPLOYMENT NOTES

- `npm run build` writes the static site to `web/dist/` (gitignored). the live site is `https://refood.rezzt.dev`; it is deployed outside git. `TODO(owner): document the hosting provider and the upload procedure.`
- there are no release artifacts: a github release (tag `v<x.y.z>`, pre-release while `0.y.z`) only carries the source; the site is uploaded separately.
- `web/package.json` `version` must match the closed `## [x.y.z]` changelog section and the `v<x.y.z>` tag.
- changelog: `changelog.md` at the root (`# HISTORIAL DE CAMBIOS`, `## SIN PUBLICAR / UNRELEASED`, `### CASTELLANO` / `### ENGLISH`, categories `AÑADIDO`/`ADDED`, `CAMBIADO`/`CHANGED`, `CORREGIDO`/`FIXED`, `ELIMINADO`/`REMOVED`, `SEGURIDAD`/`SECURITY` in that order, one imperative line per item). never invent a published version or release date.
- legal files to keep in sync with the code: `license.md`, `security.md`, `web/src/pages/aviso-legal.astro`, `web/src/pages/privacidad.astro` and `web/src/pages/cookies.astro`. a new dependency that loads remote resources, any cookie or browser storage, analytics, forms, accounts or bookings must update the privacy and cookie pages **before** it ships. `aviso-legal.astro` links to `license.md` on `main`: renaming either breaks that link.
- do not create commits, prs, merges or releases just because these rules are documented; act only when asked.

---

## ADDITIONAL ENTRY-POINT CONVENTIONS

## re:food landing — claude.md

> This file gives Claude (and any other AI agent) the working rules of this
> repository in one place. For the full architecture, tech stack, commands and
> code style guide, see [`agents.md`](./agents.md) — this file carries the
> per-task checklist and the commit / PR / merge / release conventions.
>
> **When the user asks for a commit, PR, merge or release title/description,
> follow the section below first. Never add AI attribution of any kind.**
>
> repository layout: the site lives in `web/` (astro 7, static output);
> `.docs/old-project/` is the previous static site, kept only as visual and content
> reference (never compiled or published). `changelog.md`, `readme.md`,
> `security.md` and `license.md` live at the root; there is no `.github/` folder
> (no ci, no issue/pr templates). `.docs/` is versioned: `.docs/manager.md` and
> `.docs/-github-guides/` hold the git workflow guides,
> `.docs/guidelines/markdown-guidelines.md` the markdown style, and `.docs/skills/`
> the imported agent skills.
>
> **on every task:**
> 1. list `.docs/skills/`, read the `SKILL.md` of each skill that applies and the
>    references you need. resolve their paths from `.docs/skills/` even when the
>    imported text says `.agents/skills/`. the react, react view transitions and
>    `shadcn` skills only apply if the task brings those technologies in: the site
>    uses astro components.
> 2. any markdown edit follows `.docs/guidelines/markdown-guidelines.md`: content in
>    lowercase with spanish accents, headings in uppercase without accents; paths,
>    commands and code stay literal. the contractual text of `license.md` is never
>    rewritten without the owner's explicit instruction.
> 3. in `web/`, use astro components and semantic html, tailwind v4 through
>    `@tailwindcss/vite`, `@lucide/astro` icons and `animejs` only when motion adds
>    value; keep accessibility, minimal javascript and `prefers-reduced-motion`
>    support. never invent data, restaurants, statistics or features that do not
>    exist.
> 4. before delivering app changes run `npm run check` and `npm run build` from
>    `web/`; for documentation-only changes check links, format and
>    `git diff --check`. respect the user's existing changes and report results
>    precisely.
> 5. vulnerabilities are reported privately as described in
>    [`security.md`](./security.md); never publish exploitable details in public
>    issues.

## COMMIT, PR, MERGE & RELEASE GUIDELINES

read `.docs/manager.md` first, then the selected guide in `.docs/-github-guides/`. these files are versioned; this digest also works without opening them.

| request | guide |
| --- | --- |
| commit title, body and changelog | `commit-guide.md`, `changelog-guide.md` |
| pull request or merge | `pr-merge-guide.md`, `branching-guide.md` |
| version and release | `release-guide.md`, `changelog-guide.md` |
| permissions and sensitive data | `agent-rules.md` |

- inspect `git status`, both diffs and recent history before describing changes
- use `<prefix> | <imperative summary>` with `update`, `fix`, `hotfix`, `changes` or `changelog`; keep titles within 72 characters
- write commit bodies as 2 to 6 markdown bullets, one logical change per line, with literal paths in backticks
- never add authorship footers, automated attribution, signatures or generation notices; preserve the configured git identity
- update `changelog.md` under `## SIN PUBLICAR / UNRELEASED` in matching `### CASTELLANO` and `### ENGLISH` sections
- use the existing changelog category vocabulary and preserve language parity; describe only changes in the actual diff
- summarize pull requests in 1 to 3 bullets per category and language, at most 110 characters per bullet
- documentation and repository-management work targets `main`; the remote default is `main`; do not silently promote development work to the default branch
- the authorization for a requested action remains valid throughout that task; creating a pull request includes pushing its branch, but does not authorize merging or publishing
- use merge commits when a merge is requested; never force-push, rewrite published history or remove branches without an explicit instruction
- releases use the approved version and an immutable tag on the verified release commit, with english notes from the closed changelog; do not create a release for documentation work
- deliver requested titles, bodies and changelog fragments in separate code blocks; report executed actions with their commit hash or pull request link
