# GUIA DEL CHANGELOG

> como se escribe y se cierra `changelog.md` (raiz del repositorio). es la
> fuente de verdad de commits, pull requests, merges y releases: nada se
> redacta en paralelo, todo se extrae de aqui.

---

## 1. ESTRUCTURA

```
# HISTORIAL DE CAMBIOS

## SIN PUBLICAR / UNRELEASED

## [x.y.z] - aaaa-mm-dd

### CASTELLANO

#### AÑADIDO

- <cambio>

### ENGLISH

#### ADDED

- <change>
```

- el titulo del fichero es `# HISTORIAL DE CAMBIOS`; se conserva.
- la seccion `## SIN PUBLICAR / UNRELEASED` esta siempre arriba y recoge lo que aun no se ha publicado.
- las versiones cerradas van de la mas reciente a la mas antigua.
- cada version lleva `### CASTELLANO` y `### ENGLISH` con paridad exacta de items.
- cada encabezado `####` va seguido de una linea en blanco antes de la lista, como en el fichero actual.

---

## 2. CATEGORIAS (CERRADAS Y EN ESTE ORDEN)

| castellano | english | que va |
|---|---|---|
| `AÑADIDO` | `ADDED` | funcionalidades, paginas, ficheros o documentos nuevos |
| `CAMBIADO` | `CHANGED` | cambios en comportamiento, diseno, estructura o documentacion existente |
| `CORREGIDO` | `FIXED` | errores corregidos |
| `ELIMINADO` | `REMOVED` | codigo, ficheros o funciones retirados |
| `SEGURIDAD` | `SECURITY` | correcciones o endurecimiento con impacto de seguridad |

se omite la categoria que no tenga items. no se crean otras.

---

## 3. REGLAS DE ESTILO

- el contenido sigue `.docs/guidelines/markdown-guidelines.md`: minusculas **con** los acentos ortograficos necesarios; titulos y encabezados en mayusculas sin acentos (la `ñ` se conserva: `AÑADIDO`).
- un item por linea, en imperativo ("añadir", "corregir", "mover"), empezando por `-`.
- ficheros, rutas, comandos e identificadores entre backticks.
- explica el efecto visible o el motivo, no el detalle de implementacion linea a linea.
- el proyecto no tiene variantes de producto: no se usan marcadores tipo `[online]` / `[offline]`.
- sin menciones a herramientas de ia ni a quien escribio el item.

---

## 4. CUANDO SE ACTUALIZA

1. **en cada commit** con cambios visibles: se anaden los items a `## SIN PUBLICAR / UNRELEASED`, en los dos idiomas, en el mismo commit.
2. **al preparar una pr o un merge**: se comprueba que el changelog cubre todo el diff; si falta algo, se anade antes de abrirla.
3. **al cerrar una version**: ver seccion 5.

---

## 5. CERRAR UNA VERSION

1. comprobar que `## SIN PUBLICAR / UNRELEASED` esta completo y con paridad entre idiomas.
2. renombrarlo a `## [x.y.z] - aaaa-mm-dd` (fecha de cierre) y dejar encima una seccion `## SIN PUBLICAR / UNRELEASED` vacia.
3. subir `version` en `web/package.json` si aun no se ha hecho, con `npm version <x.y.z> --no-git-tag-version` desde `web/` para que `web/package-lock.json` quede alineado (commit `changes`).
4. commit con prefijo `changelog`:

```
changelog | cerrar la seccion de changelog para la version <x.y.z>
```

5. abrir la pr de version (ver `pr-merge-guide.md`) y, al fusionar en `main`, crear la release (ver `release-guide.md`).

---

## 6. NUMERACION

- versionado semantico `x.y.z`, alineado con `web/package.json` (hoy `0.1.0`, aun sin publicar).
- `0.y.z` mientras el proyecto sea un prototipo academico; `1.0.0` cuando exista un producto estable.
- `x` cambia con rupturas grandes; `y` con funcionalidades o secciones nuevas; `z` con correcciones.
- un numero publicado no se reutiliza.

---

## 7. LISTA DE COMPROBACION

- [ ] los dos idiomas tienen los mismos items.
- [ ] solo hay categorias de la lista cerrada.
- [ ] ningun item queda sin backticks en identificadores.
- [ ] la fecha de la version cerrada usa `aaaa-mm-dd`.
- [ ] no hay atribucion de ia.
