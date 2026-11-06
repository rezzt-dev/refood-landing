# GUIA DE RAMAS

> ramas del repositorio, flujo de versiones y que rama es la base de cada pull
> request. sirve para decidir el destino de una pr sin tener que preguntarlo.

---

## 1. RAMAS PERMANENTES

| rama | funcion |
|---|---|
| `main` | unica rama permanente y rama por defecto; recibe todas las ramas de trabajo y de aqui salen los tags `v<x.y.z>` y el sitio publicado |

a 2026-11-06 el historial es lineal sobre `main` (sin merges ni otras ramas remotas); este modelo formaliza el flujo a partir de ahora.

---

## 2. RAMAS DE TRABAJO

nombre en minusculas, con barra y guiones:

| prefijo | uso | ejemplo |
|---|---|---|
| `feature/` | funcionalidad o seccion nueva | `feature/restaurant-map` |
| `fix/` | correccion de error | `fix/gallery-counter` |
| `changes/` | estructura, tooling, documentacion | `changes/repo-management-guides` |
| `hotfix/` | urgencia sobre el sitio publicado | `hotfix/broken-hero-image` |

- se crean siempre desde `main` actualizada.
- una rama, un tema; si el tema crece, se divide.
- una rama de trabajo se borra (local y remota) en cuanto su pr esta fusionada.

---

## 3. FLUJO DE UNA VERSION

```
feature/* , fix/* , changes/* , hotfix/*   →   main   →   tag v<x.y.z> + release   →   despliegue de web/dist/
```

| paso | origen | destino | tipo de pr | titulo |
|---|---|---|---|---|
| 1 | `feature/*`, `fix/*`, `changes/*`, `hotfix/*` | `main` | trabajo normal | `<prefijo> \| <resumen>` |
| 2 | `changes/*` con el commit `changelog` | `main` | version | `release version <x.y.z> - <resumen>` |
| 3 | `main` | — | release de github | `v<x.y.z> — <resumen en ingles>` |

- todos los pasos se fusionan con "create a merge commit".
- antes de abrir una pr se comprueba que `main` no tiene commits que la rama no tenga: `git log <rama>..main`. si los tiene, se actualiza la rama primero.

---

## 4. CI

- no hay ci: el repositorio no tiene `.github/workflows/`.
- hasta que exista, antes de fusionar se ejecutan en local `npm run check` y `npm run build` desde `web/`.
- cuando exista ci, no se fusiona una pr con ci en rojo.

---

## 5. LIMPIEZA

tras fusionar una pr de trabajo:

```
git checkout main
git pull --ff-only
git branch -d <rama>
git push origin --delete <rama>
```

`main` nunca se borra.
