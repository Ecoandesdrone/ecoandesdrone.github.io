# MATRIZ DE ICONOS — H03-02 · Sistema de líneas premium EcoAndes Drone

**Estado:** propuesta para dictamen del auditor y aprobación del propietario. **Nada aplicado.**
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
| fa-bars (menú) | 24 | SUSTITUIR | Menú de 3 líneas (contorno) |
| fa-xmark (cerrar) | 8 | SUSTITUIR | Equis de contorno |
| fa-chevron-right / fa-chevron-down | 13 | SUSTITUIR | Chevrones de contorno |
| fa-arrow-right | 14 | SUSTITUIR | Flecha de contorno |
| fa-envelope | 10 | SUSTITUIR | Sobre de contorno |
| fa-location-dot | 10 | SUSTITUIR | Pin de ubicación de contorno |
| fa-clock | 2 | SUSTITUIR | Reloj de contorno |
| fa-whatsapp, fa-facebook-f, fa-instagram, fa-tiktok | 43 | **CONSERVAR** | Logos oficiales de marca (excepción aprobada) |

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

## Resumen de la matriz

- **CONSERVAR:** logos de marcas (43 usos) + 5 SVG de contorno existentes.
- **REDISEÑAR:** el dron — 1 glifo nuevo (SVG propio) que reemplaza `fa-helicopter` en 5 páginas.
- **SUSTITUIR:** todo lo demás — ~157 instancias Font Awesome sólidas por equivalentes de contorno de la familia única, y los 12 emojis de la página Su Finca.
- **FUERA DE ALCANCE de esta matriz:** el logo de EcoAndes Drone (intocable) y el portal web Su Finca (bloque aparte, pendiente de decisión).

## Procedimiento de implementación (cuando se autorice)

1. Construir el sprite SVG de la familia (calibrado con los SVG actuales) y la CSS de iconos.
2. Aplicar en **rama de prueba** `audit/h03-02-iconos-linea`, sin tocar `main`.
3. Capturas de las 9 páginas (escritorio y móvil) para el expediente.
4. Visto bueno visual del propietario, página por página.
5. Dictamen del auditor sobre la rama.
6. Fusión solo con autorización expresa del propietario; verificación en vivo y validación visual final.

*Inventario verificado el 2026-10-22 sobre los archivos de `main`, reconciliado con las cifras del auditor: **220 etiquetas `<i>` con Font Awesome en el sitio completo** (202 en las 9 páginas del primer alcance + 18 en `su-finca.html`, la página Su Finca del sitio, enlazada desde la navegación de todas las páginas), **5 SVG de contorno** y **12 emojis — todos en `su-finca/index.html`** (mapa por línea: L13 y L24 marca 🌱; L33 📲 Descargar la app; L34 👨‍🌾 Entrar al portal; L42 🗺️ Mis lotes; L47 🧪 Calculadora; L52 📸 Doctor; L57 🚦 Semáforo; L64 ⚠️ aviso; L75 📲 Descargar APK; L86 💬 WhatsApp próximamente). El dron `fa-helicopter` aparece exactamente 1 vez en cada una de 5 páginas: index, nosotros, servicios, tecnologia y noticias.*

---
**COPIA DE RESPALDO — versión v1 (corregida tras la reconciliación), preservada por orden del propietario el 2026-10-22 antes de publicar la v2. La versión vigente es `matriz-iconos-h03-02.md` (v2).**
