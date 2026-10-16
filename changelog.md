# HISTORIAL DE CAMBIOS

## SIN PUBLICAR / UNRELEASED

### CASTELLANO

#### AÑADIDO

- incorporar una nueva fotografía optimizada para la portada y una sección que explica la propuesta desde las cocinas y las personas.
- añadir `web/public/images/hero-table.webp` como imagen principal orientada a la idea de compartir un plato rescatado.
- añadir la sección de intercambio en `web/src/pages/index.astro` para explicar el valor de la propuesta para cocinas y personas.
- añadir la base estática de `web/` con astro, tailwind, animejs y lucide.
- documentar la instalación, el trabajo de agentes, la seguridad y la licencia en los archivos raíz.
- incorporar `poppins` y `fraunces` como fuentes locales para la identidad tipográfica de `re:food`.
- crear la landing de `re:food` con secciones de propuesta, funcionamiento, restaurantes y propósito.
- incorporar las imágenes de la landing en `web/public/images/` y optimizarlas en formato `webp`.
- crear las páginas de aviso legal, privacidad y cookies acordes con el estado académico y estático del proyecto.
- añadir progreso de lectura, navegación contextual y retorno al inicio en todas las páginas.
- añadir controles accesibles y contador de posición para recorrer la colección de restaurantes en dispositivos táctiles.

#### CAMBIADO

- renovar el mensaje, la composición visual y la navegación de la portada, con ajustes específicos para móvil.
- mejorar los metadatos sociales y aclarar el carácter ilustrativo de los restaurantes del prototipo.
- actualizar la imagen de portada, el contraste, los botones y la navegación responsive en `web/src/styles/global.css`.
- actualizar la descripción por defecto y los metadatos `og:*` en `web/src/layouts/BaseLayout.astro`.
- retirar el elemento orbital decorativo de la portada y simplificar su movimiento en `web/src/scripts/home-motion.ts`.
- mantener los documentos del repositorio con nombres en minúsculas y eliminar las copias duplicadas en mayúsculas.
- actualizar la portada provisional con una jerarquía editorial responsive, un mensaje de producto claro y tokens tipográficos reutilizables.
- aclarar en la landing que las reservas y los restaurantes del prototipo no están disponibles actualmente.
- añadir navegación responsive, enlaces internos, foco visible y soporte para `prefers-reduced-motion`.
- compartir la cabecera y ampliar el pie de página con navegación, contacto y acceso a la información legal.
- actualizar `readme.md` para documentar las páginas legales y aclarar que `re:food` es una propuesta académica sin empresa constituida.
- convertir los pasos en una secuencia narrativa fija, desplazar la galería con el scroll y diferenciar las secciones con movimiento adaptado a cada dispositivo.
- mantener la galería navegable con teclado y gestos táctiles, y conservar una composición estática cuando el movimiento reducido o el viewport no permiten el efecto de scroll.
- rediseñar la galería de restaurantes como una colección editorial con una ficha destacada, tarjetas secundarias, categorías y estados visuales coherentes.
- separar la lógica de navegación de la galería en `web/src/scripts/restaurant-gallery.ts` y mantener el movimiento general de la portada en `web/src/scripts/home-motion.ts`.

### ENGLISH

#### ADDED

- add an optimized hero photograph and a section explaining the proposal for kitchens and visitors.
- add `web/public/images/hero-table.webp` as the main image for the rescued-meal concept.
- add the exchange section in `web/src/pages/index.astro` to explain the proposal for kitchens and visitors.
- add the static `web/` foundation with astro, tailwind, animejs and lucide.
- document setup, agent workflows, security and licensing in the root files.
- add `poppins` and `fraunces` as local fonts for the `re:food` typographic identity.
- create the `re:food` landing with proposal, process, restaurant and purpose sections.
- add the landing images to `web/public/images/` and optimize them as `webp` assets.
- add legal notice, privacy and cookie pages reflecting the academic, static nature of the project.
- add reading progress, contextual navigation and a return-to-top control across all pages.
- add accessible controls and a position counter for browsing the restaurant collection on touch devices.

#### CHANGED

- refresh homepage copy, visual composition and navigation, including mobile refinements.
- improve social metadata and clarify that prototype restaurant examples are illustrative.
- update the hero image, contrast, buttons and responsive navigation in `web/src/styles/global.css`.
- update the default description and `og:*` metadata in `web/src/layouts/BaseLayout.astro`.
- remove the decorative orbit from the hero and simplify its motion in `web/src/scripts/home-motion.ts`.
- keep repository documents lowercase and remove duplicate uppercase copies.
- update the provisional homepage with a responsive editorial hierarchy, clear product messaging and reusable typography tokens.
- clarify on the landing that bookings and restaurants from the prototype are not currently available.
- add responsive navigation, internal links, visible focus and `prefers-reduced-motion` support.
- share the header and expand the footer with navigation, contact and legal links.
- update `readme.md` to document the legal pages and clarify that `re:food` is an academic proposal with no incorporated company.
- turn the steps into a pinned story, move the gallery with scrolling, and give each section responsive, reduced-motion-aware movement.
- keep the gallery keyboard and touch navigable, and preserve a static composition when reduced motion or the viewport prevents the scroll effect.
- redesign the restaurant gallery as an editorial collection with a featured card, secondary cards, categories and consistent visual states.
- separate gallery navigation logic into `web/src/scripts/restaurant-gallery.ts` and keep the homepage motion system in `web/src/scripts/home-motion.ts`.
