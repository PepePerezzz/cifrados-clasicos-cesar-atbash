# CIPHER-PASSTHROUGH-001 — Transformación exclusiva del charset activo

| Campo | Valor |
|---|---|
| Estado | Implementado y verificado localmente |
| Tipo | Función pura compartida |
| Función | `transformarSoloActivos(texto, alfabeto, resolverIndice)` |
| Archivo | [`programa_web/js/ciphers.js`](../programa_web/js/ciphers.js) |
| Pruebas | [`programa_web/tests/ciphers.test.mjs`](../programa_web/tests/ciphers.test.mjs) |
| Rúbrica | Conjunto configurable; cifrado y descifrado correctos |

## Qué hace

Centraliza la regla de passthrough. Recorre la entrada por grafemas y transforma exclusivamente los que aparecen en el mapa del charset activo. Cualquier grafema ausente —incluidos caracteres desmarcados, mayúsculas no habilitadas, tildes, emoji, signos, espacios o saltos de línea— se devuelve sin cambiar sus unidades originales ni su orden relativo.

## Contrato

- **Entrada:** cadena `texto`, objeto `alfabeto` creado por `crearAlfabeto` y función pura `resolverIndice`.
- **Salida:** una cadena reconstruida en el mismo orden, con sustituciones únicamente en las posiciones cuyos grafemas están activos.
- **Precondición:** el mapa y el arreglo del alfabeto describen el mismo charset ordenado.
- **Postcondición:** para todo grafema `g` no incluido en `alfabeto.indice`, la porción correspondiente de la salida es exactamente `g`.
- **Invariante:** la función no normaliza el mensaje, no elimina caracteres y no inserta separadores.

## Algoritmo

1. Segmentar la entrada con `Intl.Segmenter` y usar puntos de código como alternativa compatible.
2. Consultar `alfabeto.indice.get(grafema)`.
3. Si la consulta devuelve `undefined`, copiar el grafema literalmente.
4. Si existe una posición, obtener el índice destino mediante `resolverIndice`.
5. Validar que el destino sea un entero dentro del módulo.
6. Sustituirlo por `alfabeto.simbolos[destino]` y unir la secuencia.

La comparación es literal. Por ejemplo, si el charset habilita `á` en NFC, una secuencia visualmente equivalente `a` + acento combinante no se considera habilitada y permanece intacta.

## Uso compartido

- `cifrarCesar` entrega una función que suma el desplazamiento.
- `descifrarCesar` entrega una función que resta el desplazamiento.
- `transformarAtbash` entrega una función que refleja el índice.

Esta centralización evita que cifrado y descifrado adopten reglas distintas para los caracteres externos.

## Seguridad y errores

La salida no se registra en consola ni se interpreta como HTML. La función lanza errores controlados si el texto, el alfabeto o la transformación tienen tipos inválidos, o si el índice calculado queda fuera del charset. El passthrough es una regla funcional, no una medida criptográfica; un atacante puede observar los caracteres que se dejan visibles.

## Complejidad

Tiempo `O(m)` y memoria `O(m)`, donde `m` es la cantidad de grafemas. Cada consulta al mapa tiene costo promedio `O(1)`.

## Ejemplos verificados

### Caso 1 — caracteres Unicode y mayúsculas fuera del charset

- Charset activo: `abcdefghijklmnopqrstuvwxyz`
- César: `k = 3`
- Entrada: `café 😊\nCasa!`
- Salida: `fdié 😊\nCdvd!`

Permanecen intactos `é`, espacios, emoji, salto de línea, `C` y `!`.

### Caso 2 — carácter disponible pero desmarcado

- Charset disponible: `abc`
- Charset activo después de desmarcar `a`: `bc`
- César: `k = 1`
- Entrada: `a b🙂c á\nb`
- Salida: `a c🙂b á\nc`

La `a`, el emoji, la `á`, los espacios y el salto se conservan literalmente. Sólo `b` y `c` se intercambian.

## Marcador de código

```js
/** @doc-id CIPHER-PASSTHROUGH-001 */
```

## Evidencia

- Pruebas locales: 10/10 aprobadas con `npm test` el 2 de septiembre de 2026.
- Enlace permanente al commit público: [PENDIENTE]
- Versión publicada: [PENDIENTE]
