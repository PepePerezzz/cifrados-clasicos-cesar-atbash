import { segmentarGrafemas } from "./alphabet.js";

/**
 * Convierte cualquier entero en un desplazamiento dentro de [0, n - 1].
 * @doc-id CIPHER-SHIFT-NORMALIZE-001
 * @see ../../documentacion_por_id/CIPHER-SHIFT-NORMALIZE-001.md
 */
export function normalizarDesplazamiento(k, modulo) {
  if (!Number.isInteger(k)) {
    throw new TypeError("El desplazamiento César debe ser un número entero.");
  }
  if (!Number.isInteger(modulo) || modulo < 2) {
    throw new RangeError("El módulo debe ser un entero mayor o igual que 2.");
  }
  return ((k % modulo) + modulo) % modulo;
}

/**
 * Recorre la entrada por grafemas. Si un grafema no está en el mapa activo,
 * lo devuelve literalmente y en el mismo orden relativo.
 * @doc-id CIPHER-PASSTHROUGH-001
 * @see ../../documentacion_por_id/CIPHER-PASSTHROUGH-001.md
 */
export function transformarSoloActivos(texto, alfabeto, resolverIndice) {
  if (typeof texto !== "string") {
    throw new TypeError("El texto debe ser una cadena.");
  }
  if (!alfabeto?.indice || !Array.isArray(alfabeto.simbolos)) {
    throw new TypeError("Se requiere un alfabeto válido.");
  }
  if (typeof resolverIndice !== "function") {
    throw new TypeError("Se requiere una transformación de índice.");
  }

  return segmentarGrafemas(texto)
    .map((grafema) => {
      const posicion = alfabeto.indice.get(grafema);
      if (posicion === undefined) {
        return grafema;
      }

      const destino = resolverIndice(posicion, alfabeto.modulo);
      if (!Number.isInteger(destino) || destino < 0 || destino >= alfabeto.modulo) {
        throw new RangeError("La transformación produjo un índice fuera del charset.");
      }
      return alfabeto.simbolos[destino];
    })
    .join("");
}

/**
 * @doc-id CIPHER-CAESAR-ENC-001
 * @see ../../documentacion_por_id/CIPHER-CAESAR-ENC-001.md
 */
export function cifrarCesar(texto, k, alfabeto) {
  const desplazamiento = normalizarDesplazamiento(k, alfabeto.modulo);
  return transformarSoloActivos(
    texto,
    alfabeto,
    (posicion, modulo) => (posicion + desplazamiento) % modulo
  );
}

/**
 * @doc-id CIPHER-CAESAR-DEC-001
 * @see ../../documentacion_por_id/CIPHER-CAESAR-DEC-001.md
 */
export function descifrarCesar(texto, k, alfabeto) {
  const desplazamiento = normalizarDesplazamiento(k, alfabeto.modulo);
  return transformarSoloActivos(
    texto,
    alfabeto,
    (posicion, modulo) => (posicion - desplazamiento + modulo) % modulo
  );
}

/**
 * Atbash es involutivo: la misma función cifra y descifra.
 * @doc-id CIPHER-ATBASH-001
 * @see ../../documentacion_por_id/CIPHER-ATBASH-001.md
 */
export function transformarAtbash(texto, alfabeto) {
  return transformarSoloActivos(
    texto,
    alfabeto,
    (posicion, modulo) => modulo - 1 - posicion
  );
}
