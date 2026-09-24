# CIPHER-ATBASH-001 — `transformarAtbash`

| Campo | Valor |
|---|---|
| Archivo | `programa_web/js/ciphers.js` |
| Tipo | Función pura exportada |

## Qué hace

Sustituye cada símbolo activo por el ubicado en la posición opuesta del alfabeto. La regla es `módulo - 1 - posición`.

## Contrato

- **Entradas:** texto y alfabeto validado.
- **Salida:** texto transformado.
- **Propiedad involutiva:** aplicar la función dos veces recupera el original.
- **Passthrough:** símbolos inactivos no cambian.

## Seguridad y complejidad

Atbash no tiene una clave secreta y no protege información real. Tiempo y memoria `O(n)`.
