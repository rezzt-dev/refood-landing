# re:food landing — auditoría y corrección completa del repositorio

> fichero de trabajo para un agente de ia (claude code) que opera en el clon local de la landing
> (`refood-landing/`, código en `web/`). contiene todo lo necesario para auditar y corregir
> documentación, aspectos legales, higiene del repositorio, versión y despliegue en una sola pasada.
>
> cómo usarlo: abre claude code en la raíz de este repositorio y escribe
> `lee .docs/repo-audit-and-fix.md y ejecútalo de principio a fin`.

---

## 0. PROMPT DE LANZAMIENTO

```text
Eres el agente responsable de dejar el repositorio re:food landing (sitio estático astro en web/,
propuesta académica sin empresa constituida) profesional, completo y consistente con el sitio
publicado en https://refood.rezzt.dev.
Sigue este documento fase por fase, en orden. No es asesoría legal: todo texto legal que redactes
se marca para revisión de un abogado.

Reglas de ejecución:
1. Fase 1 es de solo lectura. Al terminarla, haz TODAS las preguntas de la sección 3 en una sola
   interacción (AskUserQuestion, agrupadas) y espera. No preguntes nada más después, salvo bloqueo real.
   Lo que no se responda se resuelve con el valor "por defecto" de la sección 3 y se anota como
   TODO(owner) en el informe final.
2. Lee antes `claude.md`, `agents.md`, `.docs/manager.md`, `.docs/-github-guides/` y
   `.docs/guidelines/markdown-guidelines.md`. Son la fuente de verdad: si contradicen este
   documento, gana el repositorio y lo indicas en el informe.
3. Nunca ejecutes sin confirmación expresa: push (menos aún forzado), reescritura de historial,
   mover o borrar tags, crear/editar/publicar releases, cambiar ajustes del repo en GitHub,
   cambiar la rama por defecto, desplegar `web/dist/`. Prepara el comando exacto y lístalo en el
   informe final.
4. Verifica toda afirmación contra el código, el sitio publicado y GitHub (`gh`). No inventes datos
   legales, técnicos, cifras, restaurantes ni capturas. Si falta un dato: `TODO(owner): <qué falta>`.
5. Trabaja en una rama nueva `changes/repo-audit-and-fix` creada desde `main`.
   Commits pequeños y temáticos según la sección 6. Sin push ni PR hasta que yo lo apruebe.
6. Todo documento nuevo o modificado sigue `markdown-guidelines.md`; si se acuerda versión en
   inglés (sección 3), con paridad exacta entre idiomas.
7. Termina con el informe de la sección 8.
```

---

## 1. CONTEXTO VERIFICADO (a 2026-11-06)

hechos comprobados contra git, GitHub y el sitio publicado. el agente debe **re-verificarlos**, no darlos por buenos.

| tema | hallazgo |
|---|---|
| repositorio | `https://github.com/rezzt-dev/refood-landing` (público). rama por defecto `main`; única rama remota. historial lineal de 12 commits, sin merges. |
| descripción | `this project uses this tech stack because it is a simple landing page for a business project called "re:food".`: no describe el proyecto. sin topics. |
| homepage | `https://refood.rezzt.dev`, en línea (`HTTP/2 200`, servidor `LiteSpeed`, `last-modified` 2026-10-16) y sirviendo la portada con `hero-table.webp`. el `readme.md` dice que "no hay una dirección de producción anunciada": contradicción. |
| tags / releases | ninguno. |
| versión | `web/package.json` → `"version": "0.1.0"`, `"private": true`. sin tag que la respalde. |
| changelog | `changelog.md` en la raíz, título `# HISTORIAL DE CAMBIOS`, solo `## SIN PUBLICAR / UNRELEASED` (bilingüe, con acentos según `markdown-guidelines.md`). nunca cerrado. |
| licencia | `license.md`: licencia de uso no comercial, © 2026 Juan García Cazallas ("rezzt-dev"), solo en castellano. GitHub la detecta como `other` (`NOASSERTION`). |
| ficheros de comunidad | `readme.md`, `license.md`, `security.md` (contacto `contacto@rezzt.dev`). sin `contributing`, `code_of_conduct`, plantillas de issue/pr ni `.github/`. salud de comunidad de GitHub: 57 %. |
| ci | no hay `.github/workflows/`. la verificación es local: `npm run check` y `npm run build` en `web/`. |
| dependencias | `astro` ^7.4.0, `@lucide/astro`, `animejs`, `@fontsource/poppins`, `@fontsource-variable/fraunces`, `tailwindcss` + `@tailwindcss/vite` ^4.3.3, `typescript` ^6.0.3, `@astrojs/check`. |
| lockfiles | conviven `web/package-lock.json` y `web/pnpm-lock.yaml` (+ `web/pnpm-workspace.yaml` con `minimumReleaseAgeExclude`). el `readme.md` documenta `npm ci`. riesgo de deriva entre ambos. |
| `.docs/` versionado | `.docs/guidelines/markdown-guidelines.md`, `.docs/old-project/` (sitio anterior, referencia) y `.docs/skills/` con 8 skills de terceros (`impeccable`, `frontend-design`, `shadcn`, `vercel-*`, `web-design-guidelines`, `writing-guidelines`). `frontend-design` remite a un `LICENSE.txt` que no está versionado; `impeccable`, `shadcn`, `web-design-guidelines` y `writing-guidelines` no declaran licencia en su `SKILL.md`. **punto a revisar de licencias** (sin purga). |
| recursos | `web/public/images/hero-food.webp` no se referencia desde `web/src/`. las fotos de restaurantes (`restaurante-*.webp`) muestran negocios reales con nombre propio; la landing aclara que son ilustrativos, pero no consta su origen ni permiso. el fichero `restaurante-octiavia.webp` corresponde a "Mesón Restaurante Octavio" (nombre de fichero con errata). |
| páginas legales | `web/src/pages/aviso-legal.astro`, `privacidad.astro`, `cookies.astro` (actualizadas "16 de octubre de 2026"). declaran: sin cookies, sin almacenamiento local, sin analítica; fuentes e imágenes locales. el proveedor de alojamiento no se nombra. |
| secretos | no se ven secretos versionados. `web/.gitignore` ignora `.env` y `.env.*`. no hay `.gitignore` en la raíz. |
| enlaces externos que dependen del repo | `web/src/pages/aviso-legal.astro` enlaza a `https://github.com/rezzt-dev/refood-landing/blob/main/license.md`: **no renombrar `license.md` ni la rama `main`** sin actualizar ese enlace. |
| permisos de ficheros | en el clon del propietario hay cambios de modo sin commitear en `.docs/`; no deben entrar en ningún commit sin decisión expresa. |

---

## 2. FASES

### Fase 1 — auditoría (solo lectura)

1. `git fetch --all --tags`; revisa `git log --oneline --graph --decorate --all -n 40` y confirma que solo existe `main`.
2. Compara el sitio publicado con `main`: `curl -s https://refood.rezzt.dev` frente a `web/dist/index.html` de una compilación local (en un directorio temporal, no en el clon del propietario). anota diferencias.
3. Inventario real: dependencias de `web/package.json` con su licencia (`npm ls --all --json` o `license-checker` si está disponible), fuentes (`poppins`, `fraunces`: verifica la licencia de cada una), iconos (`lucide`), imágenes de `web/public/` y de `.docs/old-project/assets/` con su procedencia.
4. Estado de la documentación: `readme.md`, `security.md`, `agents.md`, `claude.md` frente al árbol real (`web/src/components/`, `web/src/scripts/` no aparecen en el árbol del readme).
5. Busca secretos y datos personales: `.env*`, tokens, correos, rutas locales (`git grep -nIE`).
6. Entrega el informe de hallazgos (confirmados / refutados / nuevos) y pasa a la sección 3.

### Fase 2 — higiene del repositorio

- `.gitignore` en la raíz si hace falta (artefactos de sistema, `node_modules/` fuera de `web/`).
- elegir un único gestor de paquetes y retirar el lockfile sobrante (`package-lock.json` o `pnpm-lock.yaml` + `pnpm-workspace.yaml`), alineando `readme.md`.
- retirar o usar `web/public/images/hero-food.webp`; valorar renombrar `restaurante-octiavia.webp`.
- `.docs/skills/`: listar origen y licencia de cada skill de terceros en una nota; no purgar historial ni dejar de versionar `.docs/` (decisión del propietario: `.docs/` se versiona).

### Fase 3 — documentos legales

formato: el repositorio está hoy solo en castellano. si se acuerda versión en inglés (sección 3), usar `X.md` + `X.en.md` enlazados entre sí y aplicarlo a todos.

| fichero | contenido mínimo |
|---|---|
| `license.md` | revisar coherencia con el resto de repositorios del titular; traducción al inglés solo si se acuerda, con cláusula de prevalencia. aclarar que **no** es una licencia de código abierto aprobada por la OSI. el texto contractual no se reformula sin orden expresa. |
| `third_party_licenses.md` | cada dependencia de `web/package.json`, fuente e icono: nombre, versión, licencia, url. incluir las skills de `.docs/skills/` como material de terceros versionado. |
| `web/src/pages/privacidad.astro`, `cookies.astro`, `aviso-legal.astro` | contrastar con el código real y con el alojamiento (`LiteSpeed`; proveedor `TODO(owner)`); fecha de actualización. |
| `security.md` | alcance real (sitio estático, sin versión publicada), canal privado, sin plazos ni recompensas inventados. |
| `contributing.md` | setup (`npm ci`), comprobaciones, convención de commits y changelog (enlazar `.docs/-github-guides/`). |
| `.github/` | plantillas de issue y pr si se acuerdan; sin workflows salvo decisión expresa. |

### Fase 4 — readme y changelog

- `readme.md`: corregir la frase sobre la dirección de producción (el sitio está en `https://refood.rezzt.dev`), completar el árbol (`components/`, `scripts/`), aclarar el gestor de paquetes, enlazar licencia, seguridad y páginas legales. sin afirmaciones no verificables.
- `changelog.md`: cerrar `## SIN PUBLICAR / UNRELEASED` como `## [0.1.0] - aaaa-mm-dd` (o la versión acordada) con commit `changelog`. comprobar que cada ítem existe en el código; agrupar ítems redundantes solo si el propietario lo aprueba.

### Fase 5 — contenido del sitio

- comprobar que la landing no presenta como disponibles reservas, cuentas ni datos reales.
- accesibilidad: foco visible, navegación con teclado de la galería, `prefers-reduced-motion`, textos alternativos.
- metadatos sociales (`og:*`) y `og:image` absoluto si el despliegue lo requiere.
- capturas: solo si puedes generarlas; si no, `TODO(owner): screenshot <sección>`.

### Fase 6 — versión, release y despliegue (solo preparar)

preparar, sin ejecutar:

1. confirmar `web/package.json` `0.1.0` (o la acordada) y su alineación con el changelog.
2. texto de release en inglés: título `v<x.y.z> — <summary en minúsculas, sin acentos>`, cuerpo = bloque `### ENGLISH` del changelog en versión corta, sección `#### VERIFY`, marcada como pre-release.
3. tag `v<x.y.z>` sobre el commit de merge en `main`.
4. procedimiento de despliegue de `web/dist/` en el alojamiento de `https://refood.rezzt.dev`: `TODO(owner)` (proveedor, método de subida, quién lo ejecuta).
5. comandos `gh` exactos listos para pegar, sin ejecutarlos.

### Fase 7 — metadatos de GitHub (lista para que los aplique el propietario)

descripción en inglés que describa el proyecto, homepage `https://refood.rezzt.dev` (ya correcta), topics (`astro`, `tailwindcss`, `landing-page`, `food-waste`...), social preview, private vulnerability reporting, protección de `main`, comandos `gh api` exactos.

---

## 3. DECISIONES A PREGUNTAR (una sola vez, tras la fase 1)

| # | pregunta | por defecto si no hay respuesta |
|---|---|---|
| 1 | número de la primera versión publicada | `0.1.0`, tag `v0.1.0`, release marcada pre-release |
| 2 | gestor de paquetes único | `npm` (`package-lock.json`, el que documenta el readme); retirar `pnpm-lock.yaml` y `pnpm-workspace.yaml` |
| 3 | idioma de los documentos raíz | mantener castellano; añadir `readme.en.md` y `security.en.md` |
| 4 | cláusula de prevalencia si se traduce la licencia | castellano prevalece |
| 5 | jurisdicción y ley aplicable | `TODO(owner)` |
| 6 | procedencia y permiso de las fotos de restaurantes reales | `TODO(owner)`; mantener el aviso de carácter ilustrativo |
| 7 | qué hacer con `hero-food.webp` | eliminarlo si no se usa |
| 8 | licencias de las skills de `.docs/skills/` | documentarlas en `third_party_licenses.md`; no purgar |
| 9 | proveedor y procedimiento de despliegue | `TODO(owner)` |
| 10 | nombre de la entidad titular | "Juan García Cazallas (rezzt-dev)" |

---

## 4. REGLAS DE ESTILO

- commits, changelog, pr y release: sección 0 y las guías de `.docs/-github-guides/`. commits y pr en minúsculas y sin acentos; changelog en minúsculas con acentos (`markdown-guidelines.md`); fechas `aaaa-mm-dd`.
- documentación y readme: `markdown-guidelines.md` (contenido en minúsculas con acentos, encabezados en mayúsculas sin acentos); si hay inglés, mismo orden, mismos títulos traducidos, mismas tablas.
- nombres de ficheros, rutas, comandos e identificadores entre backticks.
- sin emojis decorativos, sin superlativos de marketing, sin cifras de impacto inventadas.
- re:food es una propuesta académica: no presentarla como empresa ni como servicio disponible.

---

## 5. COMPROBACIONES (ejecutar y pegar resultados en el informe)

```bash
# enlaces relativos de todos los markdown
git ls-files '*.md' | while read f; do grep -oE '\]\((\./|\.\./)?[^)#h][^)]*\)' "$f" \
  | sed -E 's/^\]\(|\)$//' | while read l; do
    [ -e "$(dirname "$f")/$l" ] || echo "ROTO: $f -> $l"; done; done

# encabezados con acentos (debe salir vacío; la ñ está permitida)
grep -nP '^#+ .*[áéíóúÁÉÍÓÚ]' $(git ls-files '*.md' | grep -v '^.docs/skills/')

# recursos públicos sin referencias
for f in $(git ls-files web/public); do n=$(basename "$f"); \
  git grep -q "$n" -- web/src || echo "SIN USO: $f"; done

# verificación del proyecto (en un clon o worktree propio, nunca en el del propietario)
cd web && npm ci && npm run check && npm run build && cd ..

# formato
git diff --check

# sitio publicado
curl -sI https://refood.rezzt.dev | head -5
```

---

## 6. PLAN DE COMMITS (rama `changes/repo-audit-and-fix`)

orden sugerido; ajusta al estado real del repo.

1. `changes | unificar el gestor de paquetes y limpiar recursos sin uso`
2. `update | anadir third_party_licenses con dependencias, fuentes y skills`
3. `update | revisar las paginas legales frente al codigo y el alojamiento`
4. `update | anadir contributing y plantillas de github`
5. `update | corregir el readme con el sitio publicado y la estructura real`
6. `changes | alinear la version de web/package.json con la release` (solo si se acordó otra)
7. `changelog | cerrar la seccion de changelog para la version <x.y.z>`

cada cuerpo: lista `-` de una línea por ítem, qué y por qué, en minúsculas y sin acentos, **sin línea de atribución**.

---

## 7. DEFINICIÓN DE HECHO

- [ ] ningún hallazgo de la sección 1 queda sin resolver, propuesto o anotado como `TODO(owner)`
- [ ] un solo lockfile y el readme coherente con él
- [ ] el readme refleja el sitio publicado y la estructura real de `web/`
- [ ] `third_party_licenses.md` cubre dependencias, fuentes, iconos y skills de terceros
- [ ] las páginas legales coinciden con lo que hace el código
- [ ] las comprobaciones de la sección 5 pasan o sus fallos están explicados
- [ ] `changelog.md` cerrado con versión y fecha, bilingüe, con categorías cerradas
- [ ] propuesta de release en inglés, pre-release, con tag y procedimiento de despliegue documentados o en `TODO(owner)`
- [ ] ninguna acción prohibida de la sección 0 se ha ejecutado sin confirmación
- [ ] el enlace a `license.md` desde `aviso-legal.astro` sigue funcionando

---

## 8. INFORME FINAL (formato de entrega)

1. **resumen**: qué se hizo, en cinco líneas como máximo.
2. **hallazgos**: tabla confirmado / refutado / nuevo, con evidencia (comando o ruta).
3. **ficheros**: creados, modificados y eliminados del índice.
4. **decisiones aplicadas**: las respondidas y las resueltas por defecto.
5. **`TODO(owner)`**: lista numerada de datos que faltan.
6. **para revisión legal**: puntos concretos que debe revisar un abogado (licencia, fotos de terceros, páginas legales).
7. **acciones pendientes de mi confirmación**: comandos exactos (push, pr, tag, release, despliegue, ajustes de GitHub).
8. **título y descripción de la pr** en el formato del repositorio, en bloques de código separados.
