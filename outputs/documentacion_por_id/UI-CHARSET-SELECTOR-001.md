# UI-CHARSET-SELECTOR-001 — `reconstruirSelector`

| Campo | Valor |
|---|---|
| Archivo | `programa_web/js/app.js` |
| Tipo | Función de interfaz con estado |

## Qué hace

Lee el charset escrito, lo segmenta, elimina duplicados conservando la primera aparición y marca todos los símbolos resultantes como activos. Después crea una casilla por símbolo mediante nodos DOM y actualiza el contador.

## Entradas y efectos

No recibe parámetros. Lee `#charset`, actualiza `estado.candidatos`, `estado.activos`, `#charset-grid` y `#contador-charset`.

## Seguridad

Crea elementos con `createElement` y asigna etiquetas mediante `textContent`; nunca concatena HTML. Los duplicados se eliminan antes de construir el alfabeto.

## Complejidad

Tiempo y memoria `O(m)`.
