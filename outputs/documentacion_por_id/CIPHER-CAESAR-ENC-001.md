# CIPHER-CAESAR-ENC-001 — Cifrado César

| Campo | Valor |
|---|---|
| Estado | Implementado y verificado localmente |
| Tipo | Función pura |
| Función | `cifrarCesar(texto, k, alfabeto)` |
| Archivo | [`programa_web/js/ciphers.js`](../programa_web/js/ciphers.js) |
| Rúbrica | Selección y ejecución del cifrado, 10 % |

## Qué hace

Desplaza cada grafema perteneciente al alfabeto `k′` posiciones hacia delante. El desplazamiento se normaliza con `k′ = ((k mod n) + n) mod n`. Los grafemas que no pertenecen al alfabeto se conservan conforme a la decisión de diseño.

## Contrato

- **Entrada:** texto literal, entero `k` y alfabeto construido por `CFG-ALPHABET-001`.
- **Salida:** criptograma con el mismo número de grafemas del texto o de la trama recibida.
- **Precondición:** `n ≥ 2`; en la interfaz, `k′ ≠ 0`.
- **Postcondición:** descifrar con el mismo `k` recupera exactamente la entrada.

## Algoritmo

Para cada grafema `g`, consultar su índice `i`. Si existe, elegir `A[(i + k′) mod n]`; si no existe, copiar `g`. La función no consulta el DOM, no modifica el objeto alfabeto y no conserva historial.

## Seguridad y errores

Este algoritmo no protege información real. La función debe evitar aritmética directa sobre códigos ASCII y no aceptar un mapa inconsistente. Debe lanzar o devolver un error controlado si el alfabeto es inválido. No debe escribir texto claro ni resultado en la consola.

## Complejidad

Tiempo `O(m)` y memoria `O(m)`, donde `m` es la cantidad de grafemas procesados. La búsqueda es `O(1)` promedio gracias al mapa de índices.

## Pruebas asociadas

- Vectores conocidos A–Z con `k=3`.
- `k` negativo, mayor que `n` y congruente con cero.
- Texto con espacios fuera del conjunto y con ASCII imprimible dentro del conjunto.
- Propiedad de ida y vuelta con `CIPHER-CAESAR-DEC-001`.

## Marcador de código

```js
/** @doc-id CIPHER-CAESAR-ENC-001 */
```

## Evidencia

- Código local: [`ciphers.js`](../programa_web/js/ciphers.js)
- Pruebas: [`ciphers.test.mjs`](../programa_web/tests/ciphers.test.mjs)
- Resultado local: incluido en la ejecución 10/10 aprobada del 2 de septiembre de 2026.
- Commit permanente: [PENDIENTE]
