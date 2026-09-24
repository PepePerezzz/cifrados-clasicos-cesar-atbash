# ANALYSIS-CANDIDATES-001 — `generarCandidatos`

| Campo | Valor |
|---|---|
| Archivo | `programa_web/js/analysis.js` |
| Tipo | Función pura exportada |

## Qué hace

Genera todas las hipótesis permitidas: una transformación Atbash y un descifrado César para cada desplazamiento desde 1 hasta `módulo - 1`.

## Contrato

- **Entradas:** criptograma y alfabeto validado.
- **Salida:** arreglo de objetos `{ metodo, desplazamiento, texto }`.
- **Cantidad:** exactamente `módulo` candidatos.

## Seguridad y rendimiento

No presenta candidatos en el DOM ni ejecuta contenido. Con charsets grandes el costo crece; la validación limita el alfabeto a 4096 grafemas.

## Complejidad

Tiempo y memoria aproximados `O(m·n)`, con `m` como módulo y `n` como longitud del texto.
