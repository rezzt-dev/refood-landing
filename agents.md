# GUIA PARA AGENTES DE DESARROLLO

## CONTEXTO DEL PROYECTO

re:food es un proyecto web para reducir el desperdicio alimentario. su objetivo es conectar a personas con restaurantes que ofrecen comida excedente mediante un flujo de descubrimiento, reserva y recogida. la implementación actual es una base técnica: la página de inicio es provisional y no hay datos, reservas, autenticación ni servicios externos activos. no presentes esas funciones como terminadas.

el código nuevo del sitio está en `web/`. `.docs/old-project/` conserva la implementación anterior únicamente como referencia visual y de contenido; no es la aplicación que se compila. respeta los cambios existentes del árbol de trabajo y no recuperes archivos antiguos sin una necesidad concreta.

## PRIMEROS PASOS EN CADA TAREA

1. lee este documento y la documentación del repositorio relacionada con la tarea.
2. accede siempre a `.docs/skills/`: enumera sus subdirectorios y revisa los archivos `SKILL.md` disponibles antes de decidir cómo trabajar. lee el `SKILL.md` de cada habilidad pertinente y sus referencias necesarias; no asumas que todas las habilidades se aplican a todas las tareas.
3. revisa las guías de `.docs/guidelines/` pertinentes. para cualquier archivo markdown, aplica siempre `.docs/guidelines/markdown-guidelines.md`.
4. inspecciona el código y las dependencias reales en `web/` antes de elegir herramientas, patrones o componentes.
5. al terminar un cambio en la aplicación, ejecuta `npm run check` y `npm run build` desde `web/`; para cambios solo documentales, comprueba enlaces, rutas, formato y `git diff --check`.

las habilidades importadas viven en `.docs/skills/`, no en `.agents/skills/`. si una habilidad contiene rutas internas de ejemplo con otra raíz, resuélvelas desde su directorio real antes de ejecutarlas. las habilidades de react, transiciones de react y `shadcn` solo corresponden si la tarea incorpora esas tecnologías; el proyecto actual usa componentes de astro.

## ARQUITECTURA Y CONVENCIONES

- `web/src/pages/` define las rutas; `web/src/layouts/` contiene la estructura html compartida; `web/src/styles/` contiene estilos globales y tokens; `web/public/` guarda recursos públicos sin procesamiento.
- `astro` genera html estático y usa `vite` para desarrollo y compilación. `tailwindcss` v4 se integra mediante `@tailwindcss/vite` en `web/astro.config.mjs`.
- usa componentes de astro y html semántico por defecto. añade javascript de navegador solo cuando una interacción lo requiera. `animejs` está disponible para movimiento y `@lucide/astro` para iconos svg.
- conserva la accesibilidad: etiquetas comprensibles, navegación con teclado, contraste suficiente y respeto a `prefers-reduced-motion`. evita animar contenido que pueda quedar oculto si falla javascript.
- mantén dependencias y configuración dentro de `web/`. no añadas un segundo proyecto vite, un framework de interfaz ni un servicio externo sin necesidad de la tarea.
- no inventes estadísticas, restaurantes, contactos de atención al cliente ni enlaces de producción. los recursos del proyecto anterior son referencias, no datos actuales verificados.

## DOCUMENTACION Y GITHUB

el contenido markdown va en minúsculas, con tildes; los encabezados van en mayúsculas y sin tildes. los nombres de archivo, rutas, comandos y código conservan su escritura literal entre acentos graves. `license.md` contiene texto legal: conserva íntegramente sus términos y limita los cambios a formato salvo instrucción expresa del titular.

`readme.md` explica el estado y uso reales del proyecto; `security.md` define el canal privado para vulnerabilidades; `changelog.md` registra cambios relevantes. los archivos de documentación propios del repositorio se mantienen en minúsculas y sin copias con otro nombre.

para commits, consulta `.docs/guidelines/commit-guidelines.md`. para pull requests, merges y releases, consulta `.docs/guidelines/pr-merge-release-guidelines.md`. no crees commits, pull requests, merges ni releases por el mero hecho de documentar estas reglas.

## FORMATO DE LAS SECCIONES DE `changelog.md`

mantén una sección `## SIN PUBLICAR / UNRELEASED` mientras haya cambios sin versión. cuando se publique una versión, usa `## [x.y.z] - aaaa-mm-dd`. dentro de cada sección, escribe `### CASTELLANO` y `### ENGLISH`; debajo, usa solo las categorías con cambios, en este orden: `#### AÑADIDO` / `#### ADDED`, `#### CAMBIADO` / `#### CHANGED`, `#### CORREGIDO` / `#### FIXED`, `#### ELIMINADO` / `#### REMOVED` y `#### SEGURIDAD` / `#### SECURITY`. cada entrada es un punto de lista de una sola línea en imperativo; pon rutas y comandos entre acentos graves. conserva las marcas `[online]` o `[offline]` solo si realmente existe esa distinción en la aplicación. no inventes una versión publicada ni fechas de lanzamiento.

si una guía antigua contradice la guía de markdown sobre tildes, prevalece `.docs/guidelines/markdown-guidelines.md`. si una guía alude a rutas que no existen, comprueba el árbol actual y utiliza las rutas reales de `.docs/guidelines/`.

## VALIDACION Y ENTREGA

comprueba que las instrucciones describen el estado real del repositorio. en tareas de interfaz, verifica el resultado en los tamaños y estados relevantes cuando haya medios disponibles. comunica qué cambió, cómo se verificó y cualquier límite material. no atribuyas al proyecto funciones que aún no están implementadas.
