# ÍNDICE DE EVIDENCIA — Auditoría ecoandesdrone.com, Hallazgos 01 y 02

Repositorio: https://github.com/Ecoandesdrone/ecoandesdrone.github.io

## Hallazgo 01 — Lecturas simuladas marcadas (portal Su Finca)

- Rama de prueba: `audit/hallazgo-01-simuladas-v2`
- Comparación: https://github.com/Ecoandesdrone/ecoandesdrone.github.io/compare/main...audit/hallazgo-01-simuladas-v2
- Solicitud de fusión #1: https://github.com/Ecoandesdrone/ecoandesdrone.github.io/pull/1
- Commit de fusión en main: https://github.com/Ecoandesdrone/ecoandesdrone.github.io/commit/ebd979c694909562256e1500877f80e262b5c4dd
- Diferencia: 2 archivos, +5/−3 (`su-finca/js/portal.js` +4/−3, `su-finca/css/styles.css` +1/−0)
- Despliegue GitHub Pages: exitoso (ejecución #8, 2026-10-22 ~00:16 EDT)
- Verificación en vivo (desarrollador): el `portal.js` servido por ecoandesdrone.com contiene `simulado: true`, el distintivo `SIMULADA` y el prefijo «Datos de prueba:»
- Validación visual: realizada por el propietario (Jeremy Rico Morales) en su teléfono, 2026-10-22 ~00:30 EDT — `evidencia/captura-produccion-h01-2026-10-22-0030.jpg` (lote «prueba», rótulo SIMULADA en ámbar, 8 lecturas generadas)

## Hallazgo 02 — Inserciones `innerHTML` (portal.js)

- Inventario reconciliado: 20/20 asignaciones a `innerHTML` mapeadas a los puntos H02-01…H02-06 (detalle en `cierre-hallazgo-02-innerhtml.md`)
- H02-01, H02-02, H02-04, H02-05, H02-06: cerrados sin cambios
- H02-03 (única corrección): defecto reproducido en el código original — `TypeError: lec.tempAmb.toFixed is not a function` con `tempAmb: "3"`
  - Rama de prueba: `audit/hallazgo-02-03-tempamb`
  - Comparación: https://github.com/Ecoandesdrone/ecoandesdrone.github.io/compare/main...audit/hallazgo-02-03-tempamb
  - Diferencia: 1 archivo (`su-finca/js/portal.js`), +8/−2, solo `alertasSensor()`
  - Pruebas obligatorias del auditor: 12/12 PASS — script archivado en `evidencia/pruebas-h0203.js`
  - Solicitud de fusión #2: https://github.com/Ecoandesdrone/ecoandesdrone.github.io/pull/2
  - Commit de fusión en main: `210fb1f` («Merge pull request #2»)
  - Despliegue GitHub Pages: exitoso (ejecución #9, 2026-10-22 ~00:55 EDT)
  - Verificación en vivo (desarrollador): el `portal.js` servido contiene `Number.isFinite(tAmb)`
  - Chequeo visual: realizado por el propietario en su teléfono, 2026-10-22 ~01:07 EDT — `evidencia/captura-produccion-h0203-2026-10-22-0107.jpg` (portal normal tras ambas fusiones: SIMULADA, 22.0 °C, batería 87 %)

## Notas de alcance

- El cierre de ambos hallazgos cubre la revisión estática documentada de `su-finca/js/portal.js`; no es una certificación de seguridad integral de la plataforma (texto del auditor en `cierre-final-hallazgos-01-y-02.md`).
- Las validaciones visuales fueron ejecutadas por el propietario en su propio teléfono; el auditor no las ejecutó personalmente y así lo deja constado en su cierre.
- Las reglas de Firestore NO se modificaron en ningún punto de esta auditoría.
