# CIPHER-ATBASH-001 — Transformación Atbash

| Campo | Valor |
|---|---|
| Estado | Implementado y verificado localmente |
| Tipo | Función pura e involutiva |
| Función | `transformarAtbash(texto, alfabeto)` |
| Archivo | [`programa_web/js/ciphers.js`](../programa_web/js/ciphers.js) |
| Rúbrica | Cifrado seleccionable y detección automática |

## Qué hace

Sustituye cada grafema situado en la posición `i` por el grafema de la posición reflejada `n − 1 − i`. La misma función sirve para cifrar y descifrar porque aplicar la transformación dos veces produce el texto original.

## Contrato

- **Entrada:** texto y objeto de alfabeto válido.
- **Salida:** texto transformado con la misma longitud en grafemas.
- **Precondición:** el alfabeto conserva un orden determinista.
- **Postcondición:** `transformarAtbash(transformarAtbash(x,A),A) === x`.

## Algoritmo

Recorrer cada grafema. Si aparece en el mapa, obtener `A[n − 1 − i]`; en caso contrario, conservarlo. No existe clave ni desplazamiento. La interfaz no debe mostrar un campo `k` al seleccionar Atbash.

## Seguridad y limitaciones

Atbash tiene una sola transformación para un alfabeto conocido. No proporciona confidencialidad moderna, integridad ni autenticación. Los patrones repetidos del texto se conservan. La función debe mantenerse separada de la salida DOM y no registrar los mensajes.

## Complejidad

Tiempo `O(m)` y memoria `O(m)`, con búsquedas `O(1)` promedio en el mapa del alfabeto.

## Pruebas asociadas

- Vector A–Z conocido.
- Propiedad involutiva para alfabetos de tamaño par e impar.
- Centro fijo de un alfabeto de tamaño impar.
- ASCII imprimible, acentos y emoji.
- Conservación de símbolos externos.

## Marcador de código

```js
/** @doc-id CIPHER-ATBASH-001 */
```

## Evidencia

- Código local: [`ciphers.js`](../programa_web/js/ciphers.js)
- Pruebas: [`ciphers.test.mjs`](../programa_web/tests/ciphers.test.mjs)
- Resultado local: incluido en la ejecución 10/10 aprobada del 2 de septiembre de 2026.
- Commit permanente: [PENDIENTE]
