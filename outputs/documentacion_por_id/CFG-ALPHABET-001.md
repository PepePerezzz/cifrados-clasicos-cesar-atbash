# CFG-ALPHABET-001 — `crearAlfabeto`

| Campo | Valor |
|---|---|
| Archivo | `programa_web/js/alphabet.js` |
| Tipo | Función pura exportada |
| Responsabilidad | Validar y construir el charset activo |

## Qué hace

Convierte una cadena o arreglo de símbolos en un objeto de alfabeto con tres propiedades: lista ordenada `simbolos`, mapa `indice` y cantidad `modulo`. El orden recibido define las posiciones usadas por César y Atbash.

## Contrato

- **Entrada:** cadena o arreglo de grafemas activos.
- **Salida:** objeto `{ simbolos, indice, modulo }`.
- **Errores:** menos de dos símbolos, más de 4096, elementos vacíos o repetidos.

## Seguridad

La coincidencia es literal: no ejecuta contenido ni normaliza Unicode. El arreglo y el objeto exterior se congelan para evitar modificaciones accidentales. El límite de 4096 evita crecimiento ilimitado.

## Complejidad

Tiempo y memoria `O(m)`, donde `m` es el número de símbolos activos.
