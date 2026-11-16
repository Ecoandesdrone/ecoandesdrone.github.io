// Su Finca — «Mis entregas» de EcoAndes Drone
// Conexión de SOLO LECTURA al proyecto Firebase `ecoandes-pilot`
// (la nube de EcoAndes Drone por donde viaja la tubería de entregas).
//
// Este proyecto es DISTINTO del de Su Finca (`su-finca-ecoandes`, ver
// js/firebase-config.js, que NO se toca): las entregas de EcoAndes Pilot
// (informes de lote, conteos de ganado, mapas) se publican como copia
// sanitizada en la colección `entregas_publicas`, con entidadTipo =
// "ENTREGA_SUFINCA", accion = "ENTREGAR" y el contenido en el campo
// `payloadJson` (JSON en texto). La copia la escribe la propia app
// Pilot (SuFincaPublisher, desde la v1.9.33) con su cuenta de servicio.
//
// La colección `entregas_publicas` es de LECTURA PÚBLICA por reglas
// (Fase 1, opción B, Spark $0): esta página ya NO abre sesión anónima
// ni usa token. La lectura se hace por REST sin autenticación, y el
// filtro por código de finca se aplica aquí en el cliente, sin
// distinguir mayúsculas («finca-01» = «FINCA-01», corrección H7 del
// bloque H1–H10, 2026-11-07). Una entrega republicada deja dos copias
// con el mismo entidadId: se deduplica quedando la más reciente.

const ecoandesPilotConfig = {
  projectId: "ecoandes-pilot",
  coleccionPublica: "entregas_publicas"
};

/* ---------- Utilidades ---------- */
const $ = (id) => document.getElementById(id);

// Escapa texto antes de inyectarlo al HTML (anti-XSS, mismo patrón del portal).
function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

/* ---------- Contrato de entregas (espejo de las apps) ---------- */
const ENTIDAD_TIPO_ENTREGA = "ENTREGA_SUFINCA";

// Etiqueta en palabras para el cliente, según el tipo del contrato.
const ETIQUETAS_TIPO = {
  CONTEO: "Conteo de ganado",
  INFORME: "Informe de lote",
  MAPA: "Mapa de la finca"
};

// Nombres bonitos para las cifras conocidas de payload.datos; cualquier
// otra cifra se muestra con su nombre tal como viene en la entrega.
const ETIQUETAS_DATOS = {
  resesConfirmadas: "Reses confirmadas",
  lote: "Lote"
};

// Tamaño de página del escaneo de la colección (igual que en las apps:
// se pagina hasta agotar la colección; sin tope silencioso desde la
// corrección H6 del bloque H1–H10, 2026-11-07).
const TAMANO_PAGINA = 200;

/* ---------- Lectura de documentos Firestore por REST (sin sesión) ---------- */

// Los valores de Firestore por REST vienen tipados
// ({stringValue: "..."}, {integerValue: "42"}, {mapValue: {fields: {...}}}…).
// Esto los convierte a valores normales de JavaScript.
function desempaquetarValor(v) {
  if (v == null || typeof v !== "object") return null;
  if ("stringValue" in v) return v.stringValue;
  if ("integerValue" in v) return Number(v.integerValue);
  if ("doubleValue" in v) return Number(v.doubleValue);
  if ("booleanValue" in v) return v.booleanValue;
  if ("timestampValue" in v) return v.timestampValue;
  if ("mapValue" in v) return desempaquetarCampos(v.mapValue.fields || {});
  if ("arrayValue" in v) return (v.arrayValue.values || []).map(desempaquetarValor);
  return null; // nullValue, referencias, geoPoints: no se usan en las entregas
}

function desempaquetarCampos(fields) {
  const obj = {};
  for (const clave of Object.keys(fields || {})) {
    obj[clave] = desempaquetarValor(fields[clave]);
  }
  return obj;
}

// Lee la colección entregas_publicas paginando (pageSize 200) hasta
// agotarla: la lectura termina cuando Firestore ya no devuelve
// nextPageToken. Devuelve los documentos ya desempaquetados.
// Sin autenticación: la colección es de lectura pública por reglas.
async function leerDocumentosPublicos() {
  const base =
    "https://firestore.googleapis.com/v1/projects/" + ecoandesPilotConfig.projectId +
    "/databases/(default)/documents/" + ecoandesPilotConfig.coleccionPublica;
  const documentos = [];
  let pageToken = null;
  while (true) {
    let url = base + "?pageSize=" + TAMANO_PAGINA;
    if (pageToken) url += "&pageToken=" + encodeURIComponent(pageToken);
    const resp = await fetch(url);
    if (!resp.ok) throw new Error("lectura-" + resp.status);
    const datos = await resp.json();
    const pagina = datos.documents || [];
    for (const doc of pagina) {
      documentos.push({
        id: (doc.name || "").split("/").pop(),
        campos: desempaquetarCampos(doc.fields || {}),
        creadoEnDocumento: doc.createTime || null
      });
    }
    if (!datos.nextPageToken || pagina.length === 0) break;
    pageToken = datos.nextPageToken;
  }
  return documentos;
}

/* ---------- Interpretación de una entrega ---------- */

// Reconstruye una entrega desde un documento de entregas_publicas.
// Devuelve null si el documento no es una entrega válida del contrato
// (otro entidadTipo, payload ilegible o sin los campos obligatorios):
// esos documentos NO se muestran al cliente. Igual que en las apps.
function interpretarEntrega(doc) {
  const campos = doc.campos || {};
  if (campos.entidadTipo !== ENTIDAD_TIPO_ENTREGA) return null;
  // Contrato v1 completo (corrección H3, 2026-11-07): el campo
  // `accion` del documento se lee y se respeta — solo ENTREGAR es una
  // entrega mostrable; otra acción (p. ej. una revocación) no se
  // muestra. Sin campo `accion` (documentos viejos) se acepta.
  if (campos.accion != null && campos.accion !== "ENTREGAR") return null;
  if (typeof campos.payloadJson !== "string" || !campos.payloadJson.trim()) return null;

  let payload;
  try {
    payload = JSON.parse(campos.payloadJson);
  } catch (e) {
    return null;
  }
  if (!payload || typeof payload !== "object") return null;

  // Identidad de la entrega para deduplicar: el espejo escribe una
  // copia nueva por cada publicación de la misma entrega; el campo
  // entidadId es el mismo en todas las copias.
  const entidadId = typeof campos.entidadId === "string" && campos.entidadId.trim()
    ? campos.entidadId.trim()
    : (doc.id || "");

  const fincaCodigo = typeof payload.fincaCodigo === "string" ? payload.fincaCodigo : "";
  const tipo = typeof payload.tipo === "string" ? payload.tipo : "";
  const titulo = typeof payload.titulo === "string" ? payload.titulo : "";
  const resumen = typeof payload.resumen === "string" ? payload.resumen : "";
  if (!fincaCodigo.trim() || !(tipo in ETIQUETAS_TIPO)) return null;
  if (!titulo.trim() || !resumen.trim()) return null;

  // Fecha de creación: epoch millis del payload, o su texto ISO (UTC),
  // o en último caso la fecha del propio documento en la nube.
  let creadoMs = null;
  if (typeof payload.creadoEnEpochMillis === "number") {
    creadoMs = payload.creadoEnEpochMillis;
  } else if (typeof payload.creadoEn === "string") {
    const t = Date.parse(payload.creadoEn);
    if (!Number.isNaN(t)) creadoMs = t;
  }
  if (creadoMs == null && doc.creadoEnDocumento) {
    const t = Date.parse(doc.creadoEnDocumento);
    if (!Number.isNaN(t)) creadoMs = t;
  }

  // Cifras de payload.datos (solo valores simples; nada se inventa).
  const cifras = [];
  if (payload.datos && typeof payload.datos === "object" && !Array.isArray(payload.datos)) {
    for (const clave of Object.keys(payload.datos)) {
      const valor = payload.datos[clave];
      if (typeof valor === "number" || typeof valor === "string" || typeof valor === "boolean") {
        cifras.push({ etiqueta: ETIQUETAS_DATOS[clave] || clave, valor });
      }
    }
  }

  return { entidadId, fincaCodigo, tipo, titulo, resumen, creadoMs, cifras };
}

function fechaEnPalabras(creadoMs) {
  if (creadoMs == null) return "";
  try {
    return new Intl.DateTimeFormat("es", {
      day: "numeric", month: "long", year: "numeric", timeZone: "UTC"
    }).format(new Date(creadoMs));
  } catch (e) {
    return "";
  }
}

function formatearValor(valor) {
  if (typeof valor === "number") return valor.toLocaleString("es-CO");
  if (typeof valor === "boolean") return valor ? "Sí" : "No";
  return String(valor);
}

/* ---------- Vista ---------- */

// Forma comparable de un código de finca (corrección H7, 2026-11-07):
// sin espacios sobrantes y en mayúsculas, en los dos lados de la
// comparación — igual que en la app Android.
function normalizarCodigo(s) {
  return String(s ?? "").trim().toUpperCase();
}

function pintarEntregas(entregas) {
  const lista = $("listaEntregas");
  if (!entregas.length) {
    lista.innerHTML =
      '<p class="seccion-sub">Todavía no hay entregas para este código.</p>';
    return;
  }
  $("estadoEntregas").textContent =
    entregas.length === 1
      ? "Tienes 1 entrega de EcoAndes Drone:"
      : "Tienes " + entregas.length + " entregas de EcoAndes Drone:";
  lista.innerHTML = entregas.map((e) => {
    const fecha = fechaEnPalabras(e.creadoMs);
    const cifras = e.cifras.length
      ? '<div class="cifras">' + e.cifras.map((c) =>
          "<span><strong>" + esc(c.etiqueta) + ":</strong> " + esc(formatearValor(c.valor)) + "</span>"
        ).join("") + "</div>"
      : "";
    return '<div class="entrega">' +
      "<strong>" + esc(e.titulo) + "</strong>" +
      '<span class="tipo">' + esc(ETIQUETAS_TIPO[e.tipo]) + "</span>" +
      (fecha ? "<small>" + esc(fecha) + "</small>" : "") +
      "<p>" + esc(e.resumen) + "</p>" +
      cifras +
      "</div>";
  }).join("");
}

async function buscarEntregas() {
  const codigo = $("codigoFinca").value.trim();
  const estado = $("estadoEntregas");
  const lista = $("listaEntregas");
  if (!codigo) {
    estado.textContent = "";
    lista.innerHTML =
      '<p class="seccion-sub" style="color:var(--rojo)">Escribe el código de tu finca para ver tus entregas.</p>';
    return;
  }

  const boton = $("btnEntregas");
  boton.disabled = true;
  estado.textContent = "Buscando tus entregas…";
  lista.innerHTML = "";
  try {
    const documentos = await leerDocumentosPublicos();
    const vistas = documentos
      .map(interpretarEntrega)
      .filter((e) => e !== null && normalizarCodigo(e.fincaCodigo) === normalizarCodigo(codigo));
    // Deduplica por entidadId: una entrega republicada deja varias
    // copias en entregas_publicas; queda solo la más reciente.
    const porId = new Map();
    for (const e of vistas) {
      const actual = porId.get(e.entidadId);
      if (!actual || (e.creadoMs || 0) > (actual.creadoMs || 0)) porId.set(e.entidadId, e);
    }
    const entregas = [...porId.values()]
      .sort((a, b) => (b.creadoMs || 0) - (a.creadoMs || 0));
    estado.textContent = "";
    pintarEntregas(entregas);
  } catch (e) {
    estado.textContent = "";
    lista.innerHTML =
      '<p class="seccion-sub" style="color:var(--rojo)">No se pudieron consultar las entregas. ' +
      "Revisa tu conexión a internet e inténtalo de nuevo en unos minutos.</p>";
  } finally {
    boton.disabled = false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  $("formEntregas").addEventListener("submit", (ev) => {
    ev.preventDefault();
    buscarEntregas();
  });
});
