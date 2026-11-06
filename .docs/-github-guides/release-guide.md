# GUIA DE RELEASES

> como preparar el titulo, la descripcion y el tag de una release de github.
> se aplica cuando una pr de version ya esta fusionada en `main`. lee antes
> `agent-rules.md`: la release no lleva ningun rastro de ia.

---

## 1. REQUISITOS PREVIOS

1. `changelog.md` tiene la version cerrada como `## [x.y.z] - aaaa-mm-dd` (ver `changelog-guide.md`).
2. la pr de version hacia `main` esta fusionada con "create a merge commit".
3. `web/package.json` (y la entrada raiz de `web/package-lock.json`) tiene `"version": "x.y.z"`, el mismo numero que la cabecera del changelog.
4. `npm run check` y `npm run build` pasan en `web/` sobre el commit que se va a etiquetar. no hay ci en el repositorio: la comprobacion es local; cuando exista ci, tambien debe estar en verde.

a 2026-11-06 el repositorio no tiene tags ni releases: la primera release fijara el formato.

---

## 2. TAG

- siempre `v<x.y.z>`, mismo numero que la cabecera del changelog, sin sufijos extra (ejemplo: `v0.1.0`).
- se crea sobre el commit de merge en `main`, nunca sobre una rama de trabajo.
- no se mueve ni se borra un tag ya publicado; si hay un error, se publica una version nueva.

```
git tag -a v<x.y.z> -m "v<x.y.z>"
git push origin v<x.y.z>
```

---

## 3. TITULO

```
v<x.y.z> — <resumen corto en ingles>
```

- en ingles, minusculas y sin acentos; resume las 2-3 entradas mas relevantes.
- ejemplo: `v0.1.0 — narrative landing, restaurant gallery & legal pages`.

---

## 4. DESCRIPCION

- **solo en ingles**: la release es la cara publica del proyecto.
- reutiliza el bloque `### ENGLISH` de la version cerrada, con sus encabezados `####` en mayusculas, pero en version corta: de 3 a 6 items por categoria, agrupando cambios relacionados (misma regla de sintesis que `pr-merge-guide.md`, seccion 2).
- se omite la categoria sin items; no se reordenan las categorias.
- cierra con una seccion de verificacion:

```
#### VERIFY

- the site built from this tag is published at `https://refood.rezzt.dev`
- build it locally with `cd web && npm ci && npm run check && npm run build`
- re:food is an academic proposal: bookings and restaurant data are not live
```

- sin lineas de atribucion ni enlaces a herramientas de ia.

---

## 5. ACTIVOS

- ninguno: la release solo lleva el codigo fuente que github adjunta de forma automatica. el sitio se publica aparte, subiendo `web/dist/` al alojamiento de `https://refood.rezzt.dev` (`TODO(owner): documentar el proveedor y el procedimiento de despliegue`).
- nunca se adjuntan `web/dist/`, `web/node_modules/`, ficheros `.env*` ni credenciales del alojamiento.
- mientras la version sea `0.y.z` (prototipo academico), la release se marca como pre-release con `--prerelease`.

---

## 6. COMANDO

```
gh release create v<x.y.z> --title "<titulo>" --notes-file <fichero> --prerelease
```

se entrega el comando sin ejecutar; publicar una release es visible para todos y exige confirmacion (ver `agent-rules.md`).

---

## 7. LISTA DE COMPROBACION

- [ ] el tag coincide con la cabecera del changelog y con `web/package.json`.
- [ ] titulo y descripcion estan en ingles.
- [ ] los items salen del bloque `### ENGLISH` del changelog.
- [ ] `npm run check` y `npm run build` pasan sobre el commit etiquetado.
- [ ] no hay atribucion de ia ni datos sensibles.
