# MATRIZ DE ICONOS — H03-02 · Sistema de líneas premium EcoAndes Drone

**Estado:** v2 — observaciones del dictamen provisional del auditor incorporadas (mapeo glifo por glifo, totales exactos, especificación del sprite y preservación funcional de Su Finca) **+ corrección del caso de la bandera 🇨🇴** (observación del auditor al leer la v2 en GitHub; decisión del propietario, 2026-10-22: sustituir por bandera SVG dibujada). Propuesta para dictamen definitivo y aprobación del propietario. **Nada aplicado.**
**Decisión base (propietario, 2026-10-22):** adoptar iconografía de contorno (líneas) en todo el sitio, una sola familia, verde corporativo.
**Excepciones expresas:**
- **El LOGO de EcoAndes Drone NO se toca** (animado, a todo color; encabezado blanco y splash quedan como están).
- Los **logos oficiales de marcas** (WhatsApp, Facebook, Instagram, TikTok) se conservan: identifican plataformas.
- El **portal web Su Finca** (app) queda como bloque aparte: su inclusión en este cambio requiere decisión de alcance separada.

## Especificación del sistema

- **Familia:** SVG de contorno propios, servidos en un sprite del sitio (sin dependencias externas).
- **Calibre visual:** el de los 5 SVG que el sitio YA usa (tarjetas de Inicio, Tecnología y Su Finca): rejilla 48×48, sin relleno, `currentColor` (trazo 2 en cuatro de ellos y 2,4 en uno; el sistema unificado fija el trazo en 2). La familia nueva se calibra con ellos para que todo se vea de una misma mano.
- **Color:** el verde corporativo real del sitio (variables CSS actuales); blanco/verde claro sobre fondos oscuros.
- **Criterio por icono:** CONSERVAR (queda como está) · SUSTITUIR (mismo significado, glifo de contorno) · REDISEÑAR (el glifo actual no representa bien la función; se dibuja uno correcto).

## Bloque compartido (encabezado, menú y pie — todas las páginas)

| Icono actual | Usos | Decisión | Reemplazo |
|---|---|---|---|
| fa-bars (menú) | 27 | SUSTITUIR | Menú de 3 líneas (contorno) |
| fa-xmark (cerrar) | 9 | SUSTITUIR | Equis de contorno |
| fa-chevron-right / fa-chevron-down | 14 | SUSTITUIR | Chevrones de contorno |
| fa-arrow-right | 15 | SUSTITUIR | Flecha de contorno |
| fa-envelope | 11 | SUSTITUIR | Sobre de contorno |
| fa-location-dot | 11 | SUSTITUIR | Pin de ubicación de contorno |
| fa-clock | 2 | SUSTITUIR | Reloj de contorno |
| fa-whatsapp, fa-facebook-f, fa-instagram, fa-tiktok | 48 | **CONSERVAR** | Logos oficiales de marca (excepción aprobada) |

## Por página — iconos de contenido

### Inicio (index.html)
| Icono actual | Decisión | Reemplazo |
|---|---|---|
| fa-helicopter | **REDISEÑAR** | Dron cuadricóptero agrícola (SVG propio de contorno) |
| fa-microchip ×2, fa-tower-broadcast, fa-spray-can, fa-seedling, fa-map-location-dot, fa-leaf, fa-landmark, fa-building, fa-flask, fa-id-card, fa-file-circle-check, fa-camera, fa-mobile-screen, fa-calculator | SUSTITUIR | Equivalentes de contorno de la familia |
| 3 SVG de contorno existentes (tarjetas) | **CONSERVAR** | Son la semilla y el calibre del sistema |

### Nosotros
| Icono actual | Decisión | Reemplazo |
|---|---|---|
| fa-helicopter | **REDISEÑAR** | Dron (el mismo SVG propio) |
| fa-user-tie, fa-user-check, fa-scale-balanced, fa-plane-circle-check, fa-paper-plane, fa-file-shield, fa-file-circle-check, fa-eye, fa-bullseye, fa-book, fa-landmark, fa-building, fa-id-card, fa-triangle-exclamation | SUSTITUIR | Equivalentes de contorno |

### Servicios
| Icono actual | Decisión | Reemplazo |
|---|---|---|
| fa-helicopter | **REDISEÑAR** | Dron (SVG propio) |
| fa-video, fa-screwdriver-wrench, fa-ruler-combined, fa-route, fa-droplet, fa-cubes, fa-crosshairs, fa-spray-can, fa-seedling, fa-map-location-dot, fa-calculator, fa-check ×4 | SUSTITUIR | Equivalentes de contorno |

### Tecnología
| Icono actual | Decisión | Reemplazo |
|---|---|---|
| fa-helicopter | **REDISEÑAR** | Dron (SVG propio) |
| fa-tower-broadcast ×2, fa-mobile-screen ×2, fa-map-location-dot ×2, fa-satellite-dish, fa-seedling | SUSTITUIR | Equivalentes de contorno |
| 1 SVG de contorno existente | **CONSERVAR** | Semilla del sistema |

### Equipos
| Icono actual | Decisión | Reemplazo |
|---|---|---|
| fa-microchip, fa-circle-info, fa-calculator | SUSTITUIR | Equivalentes de contorno |

### Calculadora
| Icono actual | Decisión | Reemplazo |
|---|---|---|
| fa-mountain, fa-arrows-left-right, fa-circle-info ×3, fa-calculator | SUSTITUIR | Equivalentes de contorno |

### Noticias
| Icono actual | Decisión | Reemplazo |
|---|---|---|
| fa-helicopter | **REDISEÑAR** | Dron (SVG propio) |
| fa-scroll ×2, fa-rotate, fa-plane, fa-gear, fa-flag, fa-landmark, fa-clock | SUSTITUIR | Equivalentes de contorno |

### Contacto
| Icono actual | Decisión | Reemplazo |
|---|---|---|
| fa-phone, fa-paper-plane, fa-clock | SUSTITUIR | Equivalentes de contorno |

### Su Finca — página del sitio (su-finca.html)
| Icono actual | Decisión | Reemplazo |
|---|---|---|
| fa-mobile-screen, fa-microchip, fa-map-location-dot, fa-flask, fa-camera | SUSTITUIR | Equivalentes de contorno |
| 1 SVG de contorno existente (trazo 2,4) | **CONSERVAR** | Semilla del sistema (el trazo se unifica a 2 al construir la familia) |
| (bloque compartido y marcas, como en las demás páginas) | — | Sin emojis en esta página |

## Página Su Finca (su-finca/index.html) — emojis a sustituir TODOS

| Actual | Dónde | Reemplazo de contorno |
|---|---|---|
| 🌱 ×2 | Marca «Su Finca» (encabezado y título) | Brote/hoja SVG de contorno (marca de Su Finca; NO es el logo de EcoAndes) |
| 🗺️ | Tarjeta «Mis lotes» | Mapa con pin |
| 🧪 | Tarjeta «Calculadora de pesticidas» | Matraz / calculadora de dosis |
| 📸 | Tarjeta «Doctor de cultivos» | Cámara con hoja |
| 🚦 | Tarjeta «Semáforo de fumigación» | Semáforo de contorno |
| 📲 ×2 | Botones «Descargar la app / APK» | Teléfono con flecha de descarga |
| 👨‍🌾 | Botón «Entrar al portal» | Persona / acceso |
| ⚠️ | Aviso «Importante» | Triángulo de advertencia |
| 💬 | Botón «WhatsApp (próximamente)» | Al activarse: logo oficial de WhatsApp (excepción de marca) |
| 🇨🇴 | Pie de página (L92): «una aplicación de EcoAndes Drone 🇨🇴» | **Bandera SVG dibujada** `ic-bandera-co` — franjas oficiales (amarillo 50 %, azul 25 %, rojo 25 %). Decisión del propietario (2026-10-22): el emoji no se conserva; en Windows ni siquiera se renderiza como bandera (se ve «CO») |

## Resumen de la matriz — TOTALES EXACTOS (sin aproximaciones ni doble conteo)

Conteo por máquina sobre las 220 instancias `<i>` del sitio completo (cada instancia contada una sola vez; los bloques compartidos cuentan por página porque así se sirven):

| Categoría | Instancias | Glifos distintos |
|---|---|---|
| **CONSERVAR** — logos oficiales de marcas (WhatsApp 21, Instagram 9, Facebook 9, TikTok 9) | **48** | 4 |
| **REDISEÑAR** — fa-helicopter → dron propio | **5** | 1 |
| **SUSTITUIR** — sólidos → contorno | **167** | 50 |
| **Total** | **220** | **55** |

Fuera de ese conteo: **5 SVG de contorno existentes → CONSERVAR** (ya son del sistema) y **12 apariciones de emojis (10 símbolos distintos) en `su-finca/index.html` → SUSTITUIR — incluida la bandera 🇨🇴 del pie (L92), por decisión expresa del propietario**.

## Mapeo cerrado glifo por glifo (observación 1 del auditor)

Nombre final = identificador del símbolo en el sprite. Referencia de trazo: familia de contorno tipo Lucide/Feather dibujada en la rejilla 48 del sitio; «propio» = dibujo nuevo de esta casa para esa función.

| Actual (Font Awesome) | n | Decisión | Glifo final |
|---|---|---|---|
| fa-bars | 27 | Sustituir | `ic-menu` — tres líneas |
| fa-arrow-right | 15 | Sustituir | `ic-arrow-right` |
| fa-envelope | 11 | Sustituir | `ic-mail` |
| fa-location-dot | 11 | Sustituir | `ic-map-pin` |
| fa-xmark | 9 | Sustituir | `ic-x` |
| fa-chevron-right | 8 | Sustituir | `ic-chevron-right` |
| fa-mobile-screen | 6 | Sustituir | `ic-smartphone` |
| fa-chevron-down | 6 | Sustituir | `ic-chevron-down` |
| fa-map-location-dot | 5 | Sustituir | `ic-map-pinned` — mapa con pin |
| fa-helicopter | 5 | **Rediseñar** | `ic-dron-agricola` — cuadricóptero con tanque y barra de aspersión (propio) |
| fa-microchip | 4 | Sustituir | `ic-cpu` |
| fa-calculator | 4 | Sustituir | `ic-calculator` |
| fa-check | 4 | Sustituir | `ic-check` |
| fa-circle-info | 4 | Sustituir | `ic-info` |
| fa-building | 3 | Sustituir | `ic-building` |
| fa-landmark | 3 | Sustituir | `ic-landmark` |
| fa-seedling | 3 | Sustituir | `ic-sprout` |
| fa-tower-broadcast | 3 | Sustituir | `ic-radio-tower` |
| fa-id-card | 2 | Sustituir | `ic-id-card` — tarjeta con persona y líneas |
| fa-file-circle-check | 2 | Sustituir | `ic-file-check` — documento con verificación |
| fa-spray-can | 2 | Sustituir | `ic-spray-can` — lata con difusor (propio) |
| fa-flask | 2 | Sustituir | `ic-flask-conical` |
| fa-camera | 2 | Sustituir | `ic-camera` |
| fa-paper-plane | 2 | Sustituir | `ic-send` |
| fa-clock | 2 | Sustituir | `ic-clock` |
| fa-scroll | 2 | Sustituir | `ic-scroll` — pergamino |
| fa-leaf | 1 | Sustituir | `ic-leaf` |
| fa-bullseye | 1 | Sustituir | `ic-target` |
| fa-eye | 1 | Sustituir | `ic-eye` |
| fa-user-tie | 1 | Sustituir | `ic-user-tie` — persona con corbata (propio) |
| fa-scale-balanced | 1 | Sustituir | `ic-scale` — balanza |
| fa-file-shield | 1 | Sustituir | `ic-shield-file` — **escudo con el documento dentro** (seguridad documental; no un archivo genérico) |
| fa-user-check | 1 | Sustituir | `ic-user-check` |
| fa-plane-circle-check | 1 | Sustituir | `ic-plane-check` — avión con verificación (propio) |
| fa-triangle-exclamation | 1 | Sustituir | `ic-triangle-alert` |
| fa-book | 1 | Sustituir | `ic-book-open` |
| fa-ruler-combined | 1 | Sustituir | `ic-ruler` |
| fa-video | 1 | Sustituir | `ic-video` |
| fa-screwdriver-wrench | 1 | Sustituir | `ic-wrench` — herramientas |
| fa-cubes | 1 | Sustituir | `ic-boxes` |
| fa-crosshairs | 1 | Sustituir | `ic-crosshair` — mira |
| fa-droplet | 1 | Sustituir | `ic-droplet` |
| fa-route | 1 | Sustituir | `ic-route` — ruta entre dos puntos |
| fa-satellite-dish | 1 | Sustituir | `ic-satellite-dish` |
| fa-arrows-left-right | 1 | Sustituir | `ic-move-horizontal` |
| fa-mountain | 1 | Sustituir | `ic-mountain` |
| fa-rotate | 1 | Sustituir | `ic-rotate-cw` |
| fa-gear | 1 | Sustituir | `ic-settings` |
| fa-flag | 1 | Sustituir | `ic-flag` |
| fa-plane | 1 | Sustituir | `ic-plane` |
| fa-phone | 1 | Sustituir | `ic-phone` |
| fa-whatsapp (21), fa-instagram (9), fa-facebook-f (9), fa-tiktok (9) | 48 | **Conservar** | Logos oficiales de marca, sin cambio |

Emojis de `su-finca/index.html` → glifo final: 🌱→`ic-sprout` · 🗺️→`ic-map-pinned` · 🧪→`ic-flask-conical` · 📸→`ic-doctor-cultivos` (cámara con hoja, propio) · 🚦→`ic-semaforo` (propio) · 📲→`ic-descargar-app` (teléfono con flecha de descarga, propio) · 👨‍🌾→`ic-acceso-portal` (persona) · ⚠️→`ic-triangle-alert` · 💬→`ic-message-circle` (al activarse WhatsApp, pasará al logo oficial) · 🇨🇴→`ic-bandera-co` (bandera de Colombia dibujada: amarillo 50 %, azul 25 %, rojo 25 %; excepción NO conservada — decisión del propietario, 2026-10-22).

## Especificación técnica del sprite SVG (observación 3 del auditor)

- **Archivo único** `assets/iconos.svg`, servido desde el mismo origen del sitio. **Sin dependencias externas** (ni CDN ni fuentes de iconos de terceros para la familia de contorno).
- **Identificadores únicos:** cada glifo es un `<symbol id="ic-…">` con nombre en minúsculas y guiones; la unicidad se comprueba por script antes de entregar la rama (ningún `id` repetido; todo `<use>` debe resolver a un símbolo existente).
- **Geometría común:** `viewBox="0 0 48 48"`, `fill="none"`, `stroke="currentColor"`, `stroke-width="2"`, extremos y uniones redondeados — el calibre de los 5 SVG semilla.
- **Color heredado:** ningún símbolo fija color; `currentColor` lo toma del contexto CSS (verde corporativo en tarjetas, blanco sobre fondos oscuros, etc.).
- **Escalado:** el tamaño se controla por CSS según contexto (`.ic { width:1.25em; height:1.25em }` y variantes por componente); al ser vector, escala sin pérdida en escritorio y móvil.
- **Accesibilidad:** uso estándar `<svg class="ic" aria-hidden="true" focusable="false"><use href="assets/iconos.svg#ic-…"/></svg>`. Los iconos decorativos o acompañados de texto visible quedan **ocultos a lectores de pantalla**; cuando un icono sea el único contenido de un control, **el control conserva su `aria-label` actual** (p. ej. «Abrir menú», «Cerrar menú», el nombre de cada red social). Ninguna información depende solo del icono: siempre hay texto o etiqueta asociada.
- **Alcance de Font Awesome tras el cambio:** queda cargado únicamente por los 4 logos de marcas conservados (48 instancias), desde el archivo local del sitio — también sin dependencia externa.

## Preservación funcional en Su Finca (observación 4 del auditor)

- En `su-finca/index.html` el reemplazo toca **solo el contenido de los nodos de icono** (los `<span class="logo">`, `<div class="icono">` y el carácter inicial de los botones).
- **No se modifican:** textos, `href`, `onclick` (incluida la alerta del botón de WhatsApp «próximamente»), clases, estructura ni el botón deshabilitado de descarga.
- **Verificación prevista en la rama:** diferencia del archivo mostrando cambios únicamente en esos nodos + prueba manual de cada enlace y botón de la página.
- El **portal** (`su-finca/portal.html` y `portal.js`) **no se toca**: fuera del alcance acordado.

## Procedimiento de implementación (cuando se autorice)

1. Construir el sprite SVG de la familia (calibrado con los SVG actuales) y la CSS de iconos.
2. Aplicar en **rama de prueba** `audit/h03-02-iconos-linea`, sin tocar `main`.
3. Capturas de las 9 páginas (escritorio y móvil) para el expediente.
4. Visto bueno visual del propietario, página por página.
5. Dictamen del auditor sobre la rama.
6. Fusión solo con autorización expresa del propietario; verificación en vivo y validación visual final.

*Inventario verificado el 2026-10-22 sobre los archivos de `main`, reconciliado con las cifras del auditor: **220 etiquetas `<i>` con Font Awesome en el sitio completo** (202 en las 9 páginas del primer alcance + 18 en `su-finca.html`, la página Su Finca del sitio, enlazada desde la navegación de todas las páginas), **5 SVG de contorno** y **12 apariciones de emojis — todos en `su-finca/index.html`** (mapa por línea, corregido tras la observación del auditor sobre la bandera: L13 y L24 marca 🌱; L33 📲 Descargar la app; L34 👨‍🌾 Entrar al portal; L42 🗺️ Mis lotes; L47 🧪 Calculadora; L52 📸 Doctor; L57 🚦 Semáforo; L64 ⚠️ aviso; L75 📲 Descargar APK; L86 💬 WhatsApp próximamente; **L92 🇨🇴 pie de página → sustituir por bandera SVG dibujada, decisión del propietario**). El dron `fa-helicopter` aparece exactamente 1 vez en cada una de 5 páginas: index, nosotros, servicios, tecnologia y noticias.*

---

## Actualización de implementación (decisión del propietario, 2026-10-22)

- **Estilo final elegido por el propietario: Phosphor Duotone** (licencia MIT), tras rechazar una primera familia de contorno fino por «muy básica». El sprite `assets/iconos.svg` se reconstruyó con esa familia (viewBox 256, `currentColor` con capa secundaria al 20 %); los identificadores `ic-*` y el mapeo funcional de esta matriz se mantienen.
- **Sustituciones de glifo al pasar a la familia elegida** (misma función): `ic-file-check` → certificado con sello; `ic-shield-file` → documento con candado; `ic-radio-tower` → torre de señal; `ic-doctor-cultivos` → estetoscopio; `ic-descargar-app` → flecha de descarga; `ic-satellite-dish` → ondas de señal (la familia no incluye antena parabólica); `ic-boxes` → paquete; `ic-user-tie` → usuario profesional (la familia no incluye corbata). Propios en lenguaje duotono: `ic-semaforo`, `ic-spray-can`, `ic-bandera-co`.
- **Animación (a petición del propietario), solo CSS y con mesura:** realce suave al pasar el cursor en todos los iconos; dron con flotación suave, torre con pulso, brote con balanceo en sus puntos destacados; el semáforo de la presentación de Su Finca enciende sus luces en secuencia (SVG en línea). Se respeta `prefers-reduced-motion`. Nada de esto altera textos, enlaces ni acciones.
- La especificación original de esta matriz (rejilla 48, trazo 2) queda **superada** por esta actualización en lo que al trazo se refiere; se conservan identificadores únicos, accesibilidad y ausencia de dependencias externas.
