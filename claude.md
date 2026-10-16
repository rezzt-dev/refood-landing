# GUIA PARA CLAUDE

## CONTEXTO Y OBJETIVO

re:food busca reducir el desperdicio alimentario conectando a personas con restaurantes que ofrecen excedentes. el sitio actual es una base técnica estática en `web/`; su inicio provisional no implementa descubrimiento, reservas ni recogida. `.docs/old-project/` es material de referencia, no código activo.

## LECTURA OBLIGATORIA

al inicio de cada tarea, accede siempre a `.docs/skills/`, enumera los archivos `SKILL.md` y lee las habilidades aplicables con las referencias que necesites. sus rutas se resuelven desde `.docs/skills/` aunque el texto importado mencione `.agents/skills/`. revisa también `.docs/guidelines/` y lee [agents.md](agents.md) para el mapa de arquitectura, el formato de `changelog.md` y las reglas de entrega. no apliques automáticamente habilidades de react o `shadcn`: comprueba antes si la tecnología está presente.

para cualquier edición markdown, lee `.docs/guidelines/markdown-guidelines.md`: contenido en minúsculas con tildes y encabezados en mayúsculas sin tildes. conserva literalmente rutas, comandos y código. el texto contractual de `license.md` se mantiene íntegro salvo indicación expresa del titular.

## TRABAJO EN `web/`

usa `astro` y componentes `.astro` como base; `vite` ya forma parte de astro. los estilos usan `tailwindcss` v4 con `@tailwindcss/vite`, los iconos usan `@lucide/astro` y las animaciones pueden usar `animejs`. mantén html semántico, accesibilidad, uso prudente de javascript y soporte para movimiento reducido. no inventes datos o funcionalidades que aún no existen.

antes de entregar cambios de aplicación, ejecuta `npm run check` y `npm run build` desde `web/`. para documentación, verifica enlaces y formato, además de `git diff --check`. respeta cambios previos del usuario y explica los resultados con precisión.

## PUBLICACION Y SEGURIDAD

usa `.docs/guidelines/commit-guidelines.md` al redactar commits y `.docs/guidelines/pr-merge-release-guidelines.md` para pull requests, merges y releases. registra cambios relevantes en `changelog.md` con el formato indicado en `agents.md`. las vulnerabilidades se comunican de forma privada según [security.md](security.md); no publiques detalles explotables en incidencias abiertas.
