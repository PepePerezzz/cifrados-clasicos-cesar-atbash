// Permite charsets amplios (alfabetos multilingües, símbolos y emojis) sin
// dejar el tamaño completamente ilimitado, lo que podría bloquear la UI.
const MAX_CHARSET_SIZE = 4096;

/**
 * Separa una cadena sin alterar sus unidades originales.
 * @doc-id CFG-GRAPHEME-SEGMENT-001
 * @see ../../documentacion_por_id/CFG-GRAPHEME-SEGMENT-001.md
 */
export function segmentarGrafemas(texto) {
  if (typeof texto !== "string") {
    throw new TypeError("El valor debe ser una cadena de texto.");
  }

  if (typeof Intl !== "undefined" && typeof Intl.Segmenter === "function") {
    const segmentador = new Intl.Segmenter("es", { granularity: "grapheme" });
    return Array.from(segmentador.segment(texto), ({ segment }) => segment);
  }

  // Array.from conserva los puntos de código; es una degradación segura porque
  // al recomponerlos no cambia ningún carácter que quede fuera del alfabeto.
  return Array.from(texto);
}

/**
 * Crea el alfabeto ordenado y su mapa de índices.
 * La coincidencia es literal: no normaliza el mensaje ni el charset.
 * @doc-id CFG-ALPHABET-001
 * @see ../../documentacion_por_id/CFG-ALPHABET-001.md
 */
export function crearAlfabeto(simbolosActivos) {
  const simbolos = Array.isArray(simbolosActivos)
    ? [...simbolosActivos]
    : segmentarGrafemas(simbolosActivos);

  if (simbolos.length < 2) {
    throw new RangeError("Activa al menos dos caracteres en el charset.");
  }

  if (simbolos.length > MAX_CHARSET_SIZE) {
    throw new RangeError(`El charset no puede superar ${MAX_CHARSET_SIZE} caracteres.`);
  }

  const indice = new Map();
  simbolos.forEach((simbolo, posicion) => {
    if (typeof simbolo !== "string" || simbolo.length === 0) {
      throw new TypeError("Cada elemento del charset debe ser un grafema no vacío.");
    }
    if (indice.has(simbolo)) {
      throw new Error(`El charset contiene un carácter repetido: ${JSON.stringify(simbolo)}.`);
    }
    indice.set(simbolo, posicion);
  });

  return Object.freeze({ simbolos: Object.freeze(simbolos), indice, modulo: simbolos.length });
}

export const PRESETS = Object.freeze({
  minusculas: "abcdefghijklmnopqrstuvwxyz",
  letrasAscii: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  asciiImprimible: Array.from({ length: 95 }, (_, i) => String.fromCharCode(i + 32)).join("")
});

export const LIMITES = Object.freeze({
  texto: 20_000,
  charset: MAX_CHARSET_SIZE
});
