# CFG-GRAPHEME-SEGMENT-001 — `segmentarGrafemas`

| Campo | Valor |
|---|---|
| Archivo | `programa_web/js/alphabet.js` |
| Tipo | Función pura exportada |
| Responsabilidad | Separar texto en unidades visibles |

## Qué hace

Recibe una cadena y devuelve un arreglo de grafemas. Utiliza `Intl.Segmenter` con granularidad `grapheme` cuando el navegador lo permite; como alternativa utiliza `Array.from` para conservar puntos de código sin reescribirlos.

## Contrato

- **Entrada:** una cadena de texto.
- **Salida:** arreglo ordenado de cadenas, una por unidad segmentada.
- **Error:** `TypeError` cuando el argumento no es una cadena.

## Importancia

Evita recorrer texto únicamente por unidades UTF-16. Esto mejora el tratamiento de tildes combinadas, emojis y otros símbolos Unicode. La función no normaliza ni corrige el contenido, por lo que respeta la coincidencia literal exigida por el charset.

## Seguridad y complejidad

No usa HTML, red ni almacenamiento. Tiempo y memoria `O(n)` respecto al tamaño del texto.
