import test from "node:test";
import assert from "node:assert/strict";
import { crearAlfabeto } from "../js/alphabet.js";
import { cifrarCesar, transformarAtbash } from "../js/ciphers.js";
import { detectarYDescifrar, generarCandidatos } from "../js/analysis.js";

const alfabeto = crearAlfabeto("abcdefghijklmnopqrstuvwxyz");
const textoLargo = "este proyecto demuestra que el analisis de frecuencias permite comparar los patrones del idioma español en una oracion suficientemente larga y recuperar el mensaje original de manera automatica";

// DOC-BLOCK TEST-AUTODETECT-001 START
test("detecta César y el desplazamiento en una muestra larga de español", () => {
  const resultado = detectarYDescifrar(cifrarCesar(textoLargo, 7, alfabeto), alfabeto);
  assert.deepEqual(
    { metodo: resultado.metodo, desplazamiento: resultado.desplazamiento, texto: resultado.texto },
    { metodo: "caesar", desplazamiento: 7, texto: textoLargo }
  );
});

test("detecta Atbash en una muestra larga de español", () => {
  const resultado = detectarYDescifrar(transformarAtbash(textoLargo, alfabeto), alfabeto);
  assert.equal(resultado.metodo, "atbash");
  assert.equal(resultado.desplazamiento, null);
  assert.equal(resultado.texto, textoLargo);
});

test("la cantidad de hipótesis es Atbash más n-1 desplazamientos César", () => {
  assert.equal(generarCandidatos("abc", alfabeto).length, alfabeto.modulo);
});
// DOC-BLOCK TEST-AUTODETECT-001 END
