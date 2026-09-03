# CIPHER-CAESAR-DEC-001 — Descifrado César con clave conocida

| Campo | Valor |
|---|---|
| Estado | Implementado y verificado localmente |
| Tipo | Función pura |
| Función | `descifrarCesar(texto, k, alfabeto)` |
| Archivo | [`programa_web/js/ciphers.js`](../programa_web/js/ciphers.js) |
| Rúbrica | Base para la identificación automática César, 30 % |

## Qué hace

Invierte un desplazamiento César conocido. Por cada símbolo ubicado en la posición `i`, selecciona `A[(i − k′) mod n]`. La función es una primitiva interna: en el modo automático el usuario no proporciona `k`; `ANALYSIS-CANDIDATES-001` la invoca para cada desplazamiento posible.

## Contrato

- **Entrada:** criptograma, entero `k` y alfabeto válido.
- **Salida:** candidato descifrado.
- **Precondición:** la segmentación literal y el charset coinciden con los usados al cifrar.
- **Postcondición:** `descifrarCesar(cifrarCesar(x,k),k) === x`.

## Algoritmo

Normalizar `k`, recorrer los grafemas, consultar el índice y aplicar la resta modular. En JavaScript se debe evitar el residuo negativo mediante la normalización previa o la expresión `((i − k′) % n + n) % n`.

## Seguridad y errores

No debe exponerse como un control que obligue a la persona a probar claves durante el descifrado automático. La función no decide si un candidato es correcto y no lo renderiza. Debe compartir las mismas reglas de símbolos externos que el cifrador.

## Complejidad

Una invocación cuesta tiempo `O(m)` y memoria `O(m)`. Probar todos los desplazamientos cuesta `O(n·m)` antes del puntaje lingüístico.

## Pruebas asociadas

- Inversa de cada vector del cifrador.
- Desplazamientos en todo el rango `0…n−1`.
- Alfabeto personalizado y símbolos externos.
- Coincidencia literal entre formas NFC/NFD y segmentación por grafemas.

## Marcador de código

```js
/** @doc-id CIPHER-CAESAR-DEC-001 */
```

## Evidencia

- Código local: [`ciphers.js`](../programa_web/js/ciphers.js)
- Pruebas de ida y vuelta: [`ciphers.test.mjs`](../programa_web/tests/ciphers.test.mjs)
- Resultado local: incluido en la ejecución 10/10 aprobada del 2 de septiembre de 2026.
- Commit permanente: [PENDIENTE]
