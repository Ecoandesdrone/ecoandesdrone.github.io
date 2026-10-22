const fs = require("fs");
const src = fs.readFileSync(process.env.HOME + "/workspace/ecoandes-publicar/su-finca/js/portal.js", "utf8");

function extraer(desde, hasta) {
  const i = src.indexOf(desde);
  if (i < 0) throw new Error("no encontrado: " + desde);
  const j = src.indexOf(hasta, i);
  if (j < 0) throw new Error("sin cierre: " + desde);
  return src.slice(i, j + hasta.length);
}

// Funciones reales del archivo parchado
const codigo =
  extraer("function esc(", "\n}\n") + "\n" +
  extraer("function haceCuanto", "\n  }\n") + "\n" +
  extraer("function alertasSensor", "\n  }\n") + "\n" +
  extraer("function pintarSensores", "\n  }\n");

// DOM mínimo para pintarSensores
const elementos = { listaSensores: { innerHTML: null } };
const $ = (id) => elementos[id];

eval(codigo + `
globalThis.__alertasSensor = alertasSensor;
globalThis.__pintarSensores = pintarSensores;
`);
const AS = globalThis.__alertasSensor;
const PS = globalThis.__pintarSensores;

let pass = 0, fail = 0;
function prueba(nombre, fn) {
  try {
    const r = fn();
    if (r === true) { pass++; console.log("PASS", nombre); }
    else { fail++; console.log("FAIL", nombre, "->", r); }
  } catch (e) {
    fail++; console.log("FAIL (excepción)", nombre, "->", e.message);
  }
}
const helada = (lec) => AS(lec).find((m) => m.includes("helada"));

// 1. tempAmb: 3 (número) → alerta con 3.0 °C
prueba("1 tempAmb 3 → helada 3.0 °C", () => (helada({ tempAmb: 3 }) || "").includes("3.0 °C"));
// 2. tempAmb: "3" (cadena) → misma alerta, sin excepción
prueba("2 tempAmb \"3\" → helada 3.0 °C sin excepción", () => (helada({ tempAmb: "3" }) || "").includes("3.0 °C"));
// 3. tempAmb: -2.5 → alerta con -2.5 °C
prueba("3 tempAmb -2.5 → helada -2.5 °C", () => (helada({ tempAmb: -2.5 }) || "").includes("-2.5 °C"));
// 4. tempAmb: "abc" → sin alerta ni excepción
prueba("4 tempAmb \"abc\" → sin helada, sin excepción", () => helada({ tempAmb: "abc" }) === undefined);
// 5. tempAmb: "" → sin alerta (trampa Number(\"\")===0)
prueba("5 tempAmb \"\" → sin helada", () => helada({ tempAmb: "" }) === undefined);
// 6. tempAmb: null → sin alerta
prueba("6 tempAmb null → sin helada", () => helada({ tempAmb: null }) === undefined);
// 7. tempAmb: 22 → sin alerta
prueba("7 tempAmb 22 → sin helada", () => helada({ tempAmb: 22 }) === undefined);
// 8. tempAmb: Infinity → sin alerta
prueba("8 tempAmb Infinity → sin helada", () => helada({ tempAmb: Infinity }) === undefined);
// 9. Otras alertas intactas (número y cadena)
prueba("9a humSuelo 20 → alerta tierra seca", () =>
  AS({ humSuelo: 20 }).some((m) => m.includes("tierra está seca")));
prueba("9b bateria 10 → alerta batería baja", () =>
  AS({ bateria: 10 }).some((m) => m.includes("Batería baja")));
prueba("9c humSuelo \"20\" y bateria \"10\" (cadenas) → alertas sin excepción", () =>
  AS({ humSuelo: "20", bateria: "10" }).length === 2);
// 10. Varias tarjetas, una con temperatura inválida → se pintan todas
prueba("10 pintarSensores con tempAmb \"abc\" en el lote del medio → 3 tarjetas, sin excepción", () => {
  const lotes = [
    { id: "a", nombre: "Lote A" },
    { id: "b", nombre: "Lote B" },
    { id: "c", nombre: "Lote C" }
  ];
  const ahora = Date.now();
  const ultimas = new Map([
    ["a", { tempAmb: 3, humAmb: 60, humSuelo: 45, bateria: 90, ts: ahora, dispositivoId: "nodo-01" }],
    ["b", { tempAmb: "abc", humAmb: 60, humSuelo: 45, bateria: 90, ts: ahora, dispositivoId: "nodo-01" }],
    ["c", { tempAmb: "3", humAmb: 60, humSuelo: 45, bateria: 90, ts: ahora, dispositivoId: "nodo-01", simulado: true }]
  ]);
  PS(lotes, ultimas, new Map());
  const html = elementos.listaSensores.innerHTML || "";
  return html.includes("Lote A") && html.includes("Lote B") && html.includes("Lote C") &&
    html.includes("Riesgo de helada") && html.includes("SIMULADA");
});

console.log(`\nRESULTADO: ${pass} PASS, ${fail} FAIL`);
process.exit(fail ? 1 : 0);
