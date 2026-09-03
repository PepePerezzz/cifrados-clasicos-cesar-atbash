# CFG-ALPHABET-001 — Construcción del alfabeto

| Campo | Valor |
|---|---|
| Estado | Implementado y verificado localmente |
| Tipo | Función pura |
| Función | `crearAlfabeto(simbolosActivos)` |
| Archivo | [`programa_web/js/alphabet.js`](../programa_web/js/alphabet.js) |
| Rúbrica | Conjunto configurable ASCII/no ASCII, 5 % |

## Qué hace

Convierte los grafemas activados por el usuario en un alfabeto ordenado y libre de duplicados. Calcula el módulo matemático `n`, conserva el orden elegido y prepara un mapa símbolo→índice para que César y Atbash trabajen sobre posiciones, no sobre valores ASCII contiguos. La coincidencia es literal y no normaliza el mensaje.

## Contrato

- **Entrada:** cadena o arreglo con los símbolos activos.
- **Salida:** objeto con `simbolos`, `indice` y `modulo`.
- **Precondición:** la entrada es una cadena y no supera el límite configurado.
- **Postcondición:** `simbolos.length === n` y cada grafema aparece una sola vez.

## Algoritmo

1. Conservar literalmente la entrada, sin normalización Unicode.
2. Segmentar por grafemas mediante `Intl.Segmenter`; usar `Array.from` como reemplazo documentado.
3. Detectar duplicados literales.
4. Rechazar alfabetos con menos de dos o más de 256 grafemas.
5. Construir un `Map` con la posición de cada símbolo.
6. Congelar el arreglo y la envoltura antes de entregarlos al resto del programa.

## Validaciones y seguridad

No evalúa código ni interpreta HTML. Limita la cantidad de símbolos, rechaza duplicados y evita operaciones cuadráticas mediante un `Map`. Una forma precompuesta y otra combinada son deliberadamente distintas: sólo se transforma la secuencia habilitada de manera explícita.

## Complejidad

Tiempo `O(n)` y memoria `O(n)`, donde `n` es el número de grafemas del alfabeto.

## Pruebas asociadas

- ASCII A–Z.
- ASCII imprimible 32–126.
- `ABCDEFGHIJKLMNÑOPQRSTUVWXYZ`.
- Acentos en formas NFC y NFD.
- Emoji y símbolos monetarios.
- Conjunto vacío, un solo símbolo y duplicados.

## Marcador de código

```js
/** @doc-id CFG-ALPHABET-001 */
```

## Evidencia

- Código local: [`alphabet.js`](../programa_web/js/alphabet.js)
- Pruebas: [`ciphers.test.mjs`](../programa_web/tests/ciphers.test.mjs)
- Resultado local: incluido en la ejecución 10/10 aprobada del 2 de septiembre de 2026.
- Commit permanente: [PENDIENTE]
