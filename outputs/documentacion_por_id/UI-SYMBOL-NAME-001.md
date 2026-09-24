# UI-SYMBOL-NAME-001 — `nombreVisible`

| Campo | Valor |
|---|---|
| Archivo | `programa_web/js/app.js` |
| Tipo | Función pura de presentación |

## Qué hace

Convierte espacio, salto de línea y tabulador en etiquetas comprensibles para las casillas del charset. Para cualquier otro símbolo devuelve el valor original.

## Contrato

- **Entrada:** un grafema.
- **Salida:** texto visible para la interfaz.

## Seguridad

La etiqueta se asigna posteriormente con `textContent`, por lo que un símbolo no puede convertirse en HTML ejecutable. Complejidad `O(1)`.
