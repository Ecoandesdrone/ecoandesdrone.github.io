// Su Finca — «Mis entregas» de EcoAndes Drone
// Conexión de SOLO LECTURA al proyecto Firebase `ecoandes-pilot`
// (la nube de EcoAndes Drone por donde viaja la tubería de entregas).
//
// Este proyecto es DISTINTO del de Su Finca (`su-finca-ecoandes`, ver
// js/firebase-config.js, que NO se toca): las entregas de EcoAndes Pilot
// (informes de lote, conteos de ganado, mapas) viajan como documentos de
// la colección `ecoandes_sync` con entidadTipo = "ENTREGA_SUFINCA" y el
// contenido en el campo `payloadJson` (JSON en texto).
//
// La llave pública de abajo es un identificador público de cliente (el
// mismo que viaja dentro de la app Android de Su Finca); la seguridad la
// dan las reglas de Firestore. La lectura se hace por REST con sesión
// anónima, igual que en las apps, y el filtro por código de finca se
// aplica aquí en el cliente, con coincidencia EXACTA del código.

const ecoandesPilotConfig = {
  apiKey: "AIzaSyAw2JWwaZnCdzLZdISXmGxsqAUPSrOFpJk",
  projectId: "ecoandes-pilot",
  coleccionSync: "ecoandes_sync"
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

// Tope del escaneo de la colección por consulta (igual que en las apps:
// se pagina hasta agotar la colección o llegar a este tope).
const MAX_DOCUMENTOS_ESCANEO = 1000;
const TAMANO_PAGINA = 200;

/* ---------- Sesión anónima contra ecoandes-pilot (REST) ---------- */
let idTokenPilot = null;

async function obtenerTokenPilot() {
  if (idTokenPilot) return idTokenPilot;
  const resp = await fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
      encodeURIComponent(ecoandesPilotConfig.apiKey),
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ returnSecureToken: true })
    }
  );
  if (!resp.ok) throw new Error("sesion-" + resp.status);
  const datos = await resp.json();
  if (!datos.idToken) throw new Error("sesion-sin-token");
  idTokenPilot = datos.idToken;
  return idTokenPilot;
}

/* ---------- Lectura de documentos Firestore por REST ---------- */

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

// Lee la colección ecoandes_sync paginando (pageSize 200) hasta agotarla
// o llegar al tope documentado. Devuelve los documentos ya desempaquetados.
async function leerDocumentosSync(token) {
  const base =
    "https://firestore.googleapis.com/v1/projects/" + ecoandesPilotConfig.projectId +
    "/databases/(default)/documents/" + ecoandesPilotConfig.coleccionSync;
  const documentos = [];
  let pageToken = null;
  while (documentos.length < MAX_DOCUMENTOS_ESCANEO) {
    let url = base + "?pageSize=" + TAMANO_PAGINA;
    if (pageToken) url += "&pageToken=" + encodeURIComponent(pageToken);
    const resp = await fetch(url, {
      headers: { Authorization: "Bearer " + token }
    });
    if (!resp.ok) throw new Error("lectura-" + resp.status);
    const datos = await resp.json();
    const pagina = datos.documents || [];
    for (const doc of pagina) {
      documentos.push({
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

// Reconstruye una entrega desde un documento de ecoandes_sync.
// Devuelve null si el documento no es una entrega válida del contrato
// (otro entidadTipo, payload ilegible o sin los campos obligatorios):
// esos documentos NO se muestran al cliente. Igual que en las apps.
function interpretarEntrega(doc) {
  const campos = doc.campos || {};
  if (campos.entidadTipo !== ENTIDAD_TIPO_ENTREGA) return null;
  if (typeof campos.payloadJson !== "string" || !campos.payloadJson.trim()) return null;

  let payload;
  try {
    payload = JSON.parse(campos.payloadJson);
  } catch (e) {
    return null;
  }
  if (!payload || typeof payload !== "object") return null;

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

  return { fincaCodigo, tipo, titulo, resumen, creadoMs, cifras };
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
    const token = await obtenerTokenPilot();
    const documentos = await leerDocumentosSync(token);
    const entregas = documentos
      .map(interpretarEntrega)
      .filter((e) => e !== null && e.fincaCodigo === codigo)
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
