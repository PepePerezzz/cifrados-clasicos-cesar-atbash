import { descifrarCesar, transformarAtbash } from "./ciphers.js";

const FRECUENCIAS_ES = Object.freeze({
  a: 12.53, b: 1.42, c: 4.68, d: 5.86, e: 13.68, f: 0.69,
  g: 1.01, h: 0.70, i: 6.25, j: 0.44, k: 0.02, l: 4.97,
  m: 3.15, n: 6.71, ñ: 0.31, o: 8.68, p: 2.51, q: 0.88,
  r: 6.87, s: 7.98, t: 4.63, u: 3.93, v: 0.90, w: 0.01,
  x: 0.22, y: 0.90, z: 0.52
});

const PALABRAS_COMUNES = new Set([
  "a", "al", "como", "con", "de", "del", "el", "en", "es", "esta", "la",
  "las", "lo", "los", "para", "por", "que", "se", "su", "un", "una", "y"
]);

const NGRAMAS_COMUNES = ["de", "en", "es", "la", "el", "que", "ción", "ent", "est", "los"];
const SECUENCIAS_RARAS = ["jj", "kk", "ww", "qx", "qz", "zx", "ññ"];

function textoAnalizable(texto) {
  return texto.toLocaleLowerCase("es")
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-zñáéíóúü\s]/gu, " ");
}

/**
 * Aplica la idea de análisis de frecuencias atribuida a al-Kindī y añade
 * señales lingüísticas sencillas. Sólo recibe copias; nunca altera la salida.
 * @doc-id ANALYSIS-LANGUAGE-SCORE-001
 * @see ../../documentacion_por_id/ANALYSIS-LANGUAGE-SCORE-001.md
 */
export function puntuarEspanol(texto) {
  const muestra = textoAnalizable(texto);
  const letras = Array.from(muestra).filter((c) => Object.hasOwn(FRECUENCIAS_ES, c));
  const total = letras.length;

  if (total === 0) {
    return Number.NEGATIVE_INFINITY;
  }

  // DOC-BLOCK ANALYSIS-FREQUENCY-001 START
  const conteo = new Map();
  for (const letra of letras) conteo.set(letra, (conteo.get(letra) ?? 0) + 1);

  let chiCuadrada = 0;
  for (const [letra, porcentaje] of Object.entries(FRECUENCIAS_ES)) {
    const esperado = Math.max((porcentaje / 100) * total, 0.01);
    const observado = conteo.get(letra) ?? 0;
    chiCuadrada += ((observado - esperado) ** 2) / esperado;
  }
  // DOC-BLOCK ANALYSIS-FREQUENCY-001 END

  const palabras = muestra.split(/\s+/u).filter(Boolean);
  const comunes = palabras.filter((palabra) => PALABRAS_COMUNES.has(palabra)).length;
  const ngramas = NGRAMAS_COMUNES.reduce(
    (suma, ngrama) => suma + (muestra.split(ngrama).length - 1),
    0
  );
  const raras = SECUENCIAS_RARAS.reduce(
    (suma, secuencia) => suma + (muestra.split(secuencia).length - 1),
    0
  );
  const vocales = letras.filter((letra) => "aeiouáéíóúü".includes(letra)).length / total;
  const penalizacionVocales = Math.abs(vocales - 0.47) * 30;

  return -chiCuadrada + comunes * 14 + ngramas * 2.5 - raras * 8 - penalizacionVocales;
}

/**
 * Genera internamente todas las hipótesis permitidas.
 * @doc-id ANALYSIS-CANDIDATES-001
 * @see ../../documentacion_por_id/ANALYSIS-CANDIDATES-001.md
 */
export function generarCandidatos(criptograma, alfabeto) {
  const candidatos = [{
    metodo: "atbash",
    desplazamiento: null,
    texto: transformarAtbash(criptograma, alfabeto)
  }];

  for (let k = 1; k < alfabeto.modulo; k += 1) {
    candidatos.push({
      metodo: "caesar",
      desplazamiento: k,
      texto: descifrarCesar(criptograma, k, alfabeto)
    });
  }
  return candidatos;
}

/**
 * Selecciona y devuelve una sola hipótesis; las alternativas no llegan al DOM.
 * @doc-id ANALYSIS-AUTO-DETECT-001
 * @see ../../documentacion_por_id/ANALYSIS-AUTO-DETECT-001.md
 */
export function detectarYDescifrar(criptograma, alfabeto) {
  const evaluados = generarCandidatos(criptograma, alfabeto)
    .map((candidato) => ({ ...candidato, puntuacion: puntuarEspanol(candidato.texto) }))
    .sort((a, b) => {
      const diferencia = b.puntuacion - a.puntuacion;
      if (Number.isFinite(diferencia) && diferencia !== 0) return diferencia;
      if (a.metodo !== b.metodo) return a.metodo === "atbash" ? -1 : 1;
      return (a.desplazamiento ?? 0) - (b.desplazamiento ?? 0);
    });

  const mejor = evaluados[0];
  const segundo = evaluados[1];
  const margen = Number.isFinite(mejor.puntuacion) && Number.isFinite(segundo?.puntuacion)
    ? mejor.puntuacion - segundo.puntuacion
    : 0;

  return {
    metodo: mejor.metodo,
    desplazamiento: mejor.desplazamiento,
    texto: mejor.texto,
    confianza: margen >= 20 ? "alta" : margen >= 7 ? "media" : "baja"
  };
}
