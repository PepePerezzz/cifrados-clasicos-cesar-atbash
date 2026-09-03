import { LIMITES, PRESETS, crearAlfabeto, segmentarGrafemas } from "./alphabet.js";
import { cifrarCesar, normalizarDesplazamiento, transformarAtbash } from "./ciphers.js";
import { detectarYDescifrar } from "./analysis.js";

const $ = (selector) => document.querySelector(selector);
const estado = { candidatos: [], activos: new Set() };

function nombreVisible(simbolo) {
  const especiales = new Map([[" ", "␠ espacio"], ["\n", "↵ salto"], ["\t", "⇥ tabulador"]]);
  return especiales.get(simbolo) ?? simbolo;
}

function mostrarMensaje(texto, tipo = "info") {
  const aviso = $("#aviso");
  aviso.textContent = texto;
  aviso.dataset.tipo = tipo;
}

function reconstruirSelector() {
  const bruto = $("#charset").value;
  const vistos = new Set();
  estado.candidatos = segmentarGrafemas(bruto).filter((simbolo) => {
    if (vistos.has(simbolo)) return false;
    vistos.add(simbolo);
    return true;
  });
  estado.activos = new Set(estado.candidatos);

  const fragmento = document.createDocumentFragment();
  estado.candidatos.forEach((simbolo, indice) => {
    const etiqueta = document.createElement("label");
    etiqueta.className = "charset-item";
    const control = document.createElement("input");
    control.type = "checkbox";
    control.checked = true;
    control.dataset.indice = String(indice);
    const texto = document.createElement("span");
    texto.textContent = nombreVisible(simbolo);
    etiqueta.append(control, texto);
    fragmento.append(etiqueta);
  });

  const rejilla = $("#charset-grid");
  rejilla.replaceChildren(fragmento);
  $("#contador-charset").textContent = `${estado.activos.size} activos`;
}

function alfabetoActivo() {
  return crearAlfabeto(estado.candidatos.filter((simbolo) => estado.activos.has(simbolo)));
}

/**
 * @doc-id VAL-INPUT-001
 * @see ../../documentacion_por_id/VAL-INPUT-001.md
 */
function validarTexto(texto) {
  if (texto.length > LIMITES.texto) {
    throw new RangeError(`El mensaje no puede superar ${LIMITES.texto.toLocaleString("es-MX")} caracteres.`);
  }
}

/**
 * Usa exclusivamente textContent para impedir que la entrada cree HTML.
 * @doc-id UI-OUTPUT-001
 * @see ../../documentacion_por_id/UI-OUTPUT-001.md
 */
function mostrarResultadoSeguro(idSalida, idDetalle, texto = "", detalle = "") {
  document.getElementById(idSalida).textContent = texto;
  document.getElementById(idDetalle).textContent = detalle;
}

function actualizarEstadoMetodo() {
  const esCesar = $("#metodo").value === "caesar";
  $("#grupo-desplazamiento").hidden = !esCesar;
  $("#desplazamiento").disabled = !esCesar;
}

/**
 * @doc-id UI-ENCRYPT-001
 * @see ../../documentacion_por_id/UI-ENCRYPT-001.md
 */
function manejarCifrado(evento) {
  evento.preventDefault();
  try {
    const texto = $("#texto-cifrar").value;
    validarTexto(texto);
    const alfabeto = alfabetoActivo();
    const metodo = $("#metodo").value;
    let resultado;
    let detalle;

    if (metodo === "caesar") {
      const k = Number($("#desplazamiento").value);
      const normalizado = normalizarDesplazamiento(k, alfabeto.modulo);
      if (normalizado === 0) throw new Error("El desplazamiento no puede equivaler a cero.");
      resultado = cifrarCesar(texto, k, alfabeto);
      detalle = `César · k=${normalizado} · módulo ${alfabeto.modulo}`;
    } else if (metodo === "atbash") {
      resultado = transformarAtbash(texto, alfabeto);
      detalle = `Atbash · módulo ${alfabeto.modulo}`;
    } else {
      throw new Error("Método no permitido.");
    }

    mostrarResultadoSeguro("salida-cifrado", "detalle-cifrado", resultado, detalle);
    mostrarMensaje("Cifrado completado localmente. Los símbolos inactivos no se modificaron.", "ok");
  } catch (error) {
    mostrarResultadoSeguro("salida-cifrado", "detalle-cifrado");
    mostrarMensaje(error.message, "error");
  }
}

/**
 * @doc-id UI-DECRYPT-001
 * @see ../../documentacion_por_id/UI-DECRYPT-001.md
 */
function manejarDescifrado(evento) {
  evento.preventDefault();
  try {
    const texto = $("#texto-descifrar").value;
    validarTexto(texto);
    const alfabeto = alfabetoActivo();
    const resultado = detectarYDescifrar(texto, alfabeto);
    const detalle = resultado.metodo === "caesar"
      ? `César detectado · k=${resultado.desplazamiento} · confianza ${resultado.confianza}`
      : `Atbash detectado · confianza ${resultado.confianza}`;
    mostrarResultadoSeguro("salida-descifrado", "detalle-descifrado", resultado.texto, detalle);
    mostrarMensaje("Se mostró únicamente la hipótesis con mayor puntuación lingüística.", "ok");
  } catch (error) {
    mostrarResultadoSeguro("salida-descifrado", "detalle-descifrado");
    mostrarMensaje(error.message, "error");
  }
}

async function copiarSalida(id) {
  const texto = document.getElementById(id).textContent;
  if (!texto) return mostrarMensaje("No hay un resultado que copiar.", "error");
  try {
    await navigator.clipboard.writeText(texto);
    mostrarMensaje("Resultado copiado al portapapeles.", "ok");
  } catch {
    mostrarMensaje("El navegador no concedió acceso al portapapeles.", "error");
  }
}

function iniciar() {
  $("#charset").value = PRESETS.minusculas;
  reconstruirSelector();
  actualizarEstadoMetodo();

  $("#preset").addEventListener("change", (evento) => {
    if (evento.target.value !== "personalizado") {
      $("#charset").value = PRESETS[evento.target.value];
      reconstruirSelector();
    }
  });
  $("#charset").addEventListener("input", () => {
    $("#preset").value = "personalizado";
    reconstruirSelector();
  });
  $("#charset-grid").addEventListener("change", (evento) => {
    const indice = Number(evento.target.dataset.indice);
    const simbolo = estado.candidatos[indice];
    if (evento.target.checked) estado.activos.add(simbolo);
    else estado.activos.delete(simbolo);
    $("#contador-charset").textContent = `${estado.activos.size} activos`;
  });
  $("#metodo").addEventListener("change", actualizarEstadoMetodo);
  $("#form-cifrar").addEventListener("submit", manejarCifrado);
  $("#form-descifrar").addEventListener("submit", manejarDescifrado);
  $("#copiar-cifrado").addEventListener("click", () => copiarSalida("salida-cifrado"));
  $("#copiar-descifrado").addEventListener("click", () => copiarSalida("salida-descifrado"));
}

iniciar();
