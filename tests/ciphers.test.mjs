import test from "node:test";
import assert from "node:assert/strict";
import { crearAlfabeto } from "../js/alphabet.js";
import { cifrarCesar, descifrarCesar, transformarAtbash } from "../js/ciphers.js";

// DOC-BLOCK TEST-CIPHERS-001 START
test("César transforma sólo letras minúsculas habilitadas", () => {
  const alfabeto = crearAlfabeto("abcdefghijklmnopqrstuvwxyz");
  const entrada = "café 😊\nCasa!";
  const cifrado = cifrarCesar(entrada, 3, alfabeto);

  assert.equal(cifrado, "fdié 😊\nCdvd!");
  assert.equal(descifrarCesar(cifrado, 3, alfabeto), entrada);
});

test("un carácter desmarcado se conserva aunque aparezca entre activos", () => {
  // El charset disponible era abc, pero la letra a fue deshabilitada.
  const alfabeto = crearAlfabeto(["b", "c"]);
  const entrada = "a b🙂c á\nb";
  const cifrado = cifrarCesar(entrada, 1, alfabeto);

  assert.equal(cifrado, "a c🙂b á\nc");
  assert.equal(descifrarCesar(cifrado, 1, alfabeto), entrada);
});

test("Atbash mantiene tildes, emoji, puntuación y saltos fuera del charset", () => {
  const alfabeto = crearAlfabeto("ABCXYZ");
  const entrada = "A-ñ Z🙂\nB";
  const salida = transformarAtbash(entrada, alfabeto);

  assert.equal(salida, "Z-ñ A🙂\nY");
  assert.equal(transformarAtbash(salida, alfabeto), entrada);
});

test("no se normaliza Unicode: una forma NFD no equivale a la NFC habilitada", () => {
  const alfabeto = crearAlfabeto(["á", "b"]);
  const nfd = "a\u0301";

  assert.equal(cifrarCesar(`${nfd}á`, 1, alfabeto), `${nfd}b`);
});

test("los desplazamientos negativos también respetan passthrough", () => {
  const alfabeto = crearAlfabeto("abcd");
  assert.equal(cifrarCesar("a-éb", -1, alfabeto), "d-éa");
});

test("ASCII imprimible transforma espacios cuando el espacio sí está habilitado", () => {
  const ascii = Array.from({ length: 95 }, (_, i) => String.fromCharCode(i + 32)).join("");
  const alfabeto = crearAlfabeto(ascii);
  assert.equal(cifrarCesar(" A", 1, alfabeto), "!B");
});

test("se rechazan alfabetos insuficientes o con símbolos repetidos", () => {
  assert.throws(() => crearAlfabeto(["a"]), /al menos dos/u);
  assert.throws(() => crearAlfabeto(["a", "b", "a"]), /repetido/u);
});
// DOC-BLOCK TEST-CIPHERS-001 END
