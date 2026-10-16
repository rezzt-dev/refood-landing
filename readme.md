# RE:FOOD

re:food es un proyecto web para reducir el desperdicio alimentario. la visión del producto es ayudar a descubrir restaurantes cercanos con excedentes, reservar un pack sorpresa y recogerlo. el sitio actual es una base técnica para construir esa experiencia; todavía no ofrece reservas, datos reales ni cuentas de usuario.

## ESTADO ACTUAL

la aplicación nueva vive en `web/` y genera una landing estática que presenta el propósito del proyecto, el recorrido previsto de descubrimiento, reserva y recogida, y referencias visuales del prototipo anterior. la implementación anterior se conserva en `.docs/old-project/` como referencia; no se publica desde la nueva aplicación. la landing no ofrece reservas, datos actuales de restaurantes ni cuentas de usuario. no hay una dirección de producción anunciada ni una versión de producto estable.

## TECNOLOGIAS

| herramienta | uso en el proyecto |
| --- | --- |
| `astro` | rutas, componentes y generación estática de html |
| `vite` | servidor de desarrollo y compilación integrados en astro |
| `tailwindcss` v4 y `@tailwindcss/vite` | utilidades de estilo y tema |
| `animejs` | animaciones de navegador cuando aportan valor |
| `@lucide/astro` | iconos svg en componentes astro |
| `typescript` y `@astrojs/check` | comprobación de tipos y diagnósticos |

## REQUISITOS Y PUESTA EN MARCHA

se requiere `node.js` 22.22.0 o superior y `npm` 9.6.5 o superior. ejecuta los comandos desde la raíz del repositorio:

```bash
cd web
npm ci
npm run dev
```

el servidor mostrará la dirección local en la terminal. `npm ci` usa `web/package-lock.json` para instalar las versiones bloqueadas.

## COMANDOS

| comando, dentro de `web/` | resultado |
| --- | --- |
| `npm run dev` | inicia el servidor de desarrollo |
| `npm run check` | comprueba archivos astro y tipos |
| `npm run build` | genera el sitio estático en `web/dist/` |
| `npm run preview` | muestra localmente la compilación generada |

para comprobar una entrega, ejecuta `npm run check` y `npm run build` antes de `npm run preview`.

## ESTRUCTURA DEL REPOSITORIO

```text
.
├── .docs/
│   ├── guidelines/       # reglas para documentación y publicaciones
│   ├── old-project/      # sitio anterior, solo de referencia
│   └── skills/           # habilidades locales para agentes de ia
├── web/
│   ├── public/           # recursos públicos e imágenes de la landing
│   ├── src/
│   │   ├── layouts/      # estructura html compartida
│   │   ├── pages/        # rutas del sitio
│   │   └── styles/       # estilos globales y tema
│   ├── astro.config.mjs  # configuración de astro y vite
│   └── package.json      # dependencias y scripts
├── agents.md             # contexto y reglas para agentes
├── claude.md             # entrada específica para claude
├── changelog.md          # cambios del proyecto
├── license.md            # términos de uso no comercial
└── security.md           # política de seguridad
```

## CONTRIBUCIONES

antes de cambiar código, revisa [agents.md](agents.md) y las guías de `.docs/guidelines/`. las habilidades de ia importadas están en `.docs/skills/`; se consultan según la tarea. mantén los cambios centrados en `web/`, verifica tipos y compilación, y describe el comportamiento real al proponer una contribución. para errores funcionales, abre una [incidencia](https://github.com/rezzt-dev/refood-landing/issues); para vulnerabilidades, sigue [security.md](security.md).

## LICENCIA

el contenido de este repositorio se distribuye bajo una [licencia personalizada de uso no comercial](license.md). los usos comerciales requieren autorización previa y por escrito del titular. lee el texto completo antes de copiar, modificar o redistribuir el proyecto.
