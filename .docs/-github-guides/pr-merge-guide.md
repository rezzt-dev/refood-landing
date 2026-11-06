# GUIA DE PULL REQUESTS Y MERGES

> como devolver el titulo y la descripcion de una pull request y de su commit
> de merge, en version sintetizada, para que solo haya que copiar, pegar y
> aceptar. se aplica cada vez que se pida el titulo y la descripcion de una pr
> o de un merge. lee antes `agent-rules.md`: nada de rastro de ia.

---

## 1. PRINCIPIO

la descripcion de una pr o de un merge es un **resumen muy corto** del
changelog, no el changelog entero. el detalle completo vive en
`changelog.md`; la pr solo orienta a quien revisa.

- la fuente es siempre `changelog.md` (seccion `## SIN PUBLICAR / UNRELEASED` o version ya cerrada) y el diff real de la rama.
- minusculas y sin acentos; los encabezados en mayusculas. los items que se toman del changelog pierden los acentos y `AÑADIDO` pasa a `ANADIDO`.
- categorias cerradas y en este orden: `ANADIDO`, `CAMBIADO`, `CORREGIDO`, `ELIMINADO`, `SEGURIDAD` (en ingles `ADDED`, `CHANGED`, `FIXED`, `REMOVED`, `SECURITY`). se omite la que no tenga items.
- sin lineas de atribucion ni pies de pagina (ver `agent-rules.md`).

---

## 2. LIMITES DE LONGITUD

| tipo | items por categoria | longitud maxima de item |
|---|---|---|
| pr de trabajo normal | 1 a 3 | 110 caracteres |
| pr / merge de version | 2 a 5 | 130 caracteres |

- cada item agrupa varios cambios relacionados en una sola linea ("anadir la galeria de restaurantes con navegacion tactil"), nunca uno por fichero.
- se nombran como mucho 2 identificadores por item; el resto se omite.
- los dos idiomas llevan los mismos items en el mismo orden (paridad exacta).

---

## 3. TITULO

### pr de trabajo normal

rama `feature/...`, `fix/...`, `changes/...` o `hotfix/...` hacia `main`. mismo formato que un commit (ver `commit-guide.md`):

```
<prefijo> | <resumen corto en imperativo>
```

si la pr agrupa varios commits, el resumen describe el conjunto.

### pr de version

la pr hacia `main` que lleva el commit `changelog` que cierra una version:

```
release version <x.y.z> - <resumen de las 2-3 entradas mas relevantes>
```

ejemplo:

```
release version 0.1.0 - landing narrativa, galeria de restaurantes y paginas legales
```

---

## 4. DESCRIPCION

plantilla:

```
### CASTELLANO

#### <categoria>
- <cambio agrupado en una linea>

### ENGLISH

#### <category>
- <same change, one line>
```

ejemplo de pr de version, ya sintetizada:

```
### CASTELLANO

#### ANADIDO
- anadir la landing de re:food con propuesta, funcionamiento, restaurantes y proposito
- anadir las paginas de aviso legal, privacidad y cookies

#### CAMBIADO
- convertir los pasos en un recorrido de scroll narrativo con soporte de movimiento reducido
- redisenar la galeria de restaurantes como coleccion editorial navegable

### ENGLISH

#### ADDED
- add the re:food landing with proposal, process, restaurant and purpose sections
- add the legal notice, privacy and cookie pages

#### CHANGED
- turn the steps into a narrative scroll story with reduced-motion support
- redesign the restaurant gallery as a browsable editorial collection
```

si la pr solo aporta parte de `## SIN PUBLICAR / UNRELEASED`, la descripcion incluye solo esos items.

---

## 5. COMMIT DE MERGE

- se fusiona siempre con **"create a merge commit"**; nunca squash ni rebase, para conservar el historial de commits.
- github genera la primera linea (`merge pull request #<n> from <rama>`); el titulo y la descripcion del merge son los de la pr, sin cambios.
- si el merge se hace a mano con `git merge --no-ff`, el mensaje usa el mismo titulo y la misma descripcion, sin atribucion.
- el titulo y la descripcion del merge se entregan en dos bloques de codigo separados.

---

## 6. COMO SE ENTREGA

1. una linea de contexto: rama origen, rama destino y numero de commits.
2. bloque de codigo con el titulo.
3. bloque de codigo con la descripcion.
4. si la pr aun no existe y se pide abrirla, el comando exacto (ver abajo), sin ejecutarlo hasta que lo confirmen.

```
gh pr create --base main --head <origen> --title "<titulo>" --body-file <fichero>
```

la descripcion se pasa con `--body-file` para evitar problemas de comillas y saltos de linea.

---

## 7. LISTA DE COMPROBACION

- [ ] la rama base es `main`, como indica `branching-guide.md`.
- [ ] se ha mirado `git log main..<rama>` y `git diff main...<rama>`.
- [ ] el changelog esta actualizado y la descripcion sale de el.
- [ ] ambos idiomas tienen los mismos items.
- [ ] ningun item supera el limite de longitud.
- [ ] `npm run check` y `npm run build` pasan en `web/` si la pr toca la web.
- [ ] no hay atribucion de ia en ningun bloque.
