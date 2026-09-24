# CIPHER-SHIFT-NORMALIZE-001 — `normalizarDesplazamiento`

| Campo | Valor |
|---|---|
| Archivo | `programa_web/js/ciphers.js` |
| Tipo | Función pura exportada |

## Qué hace

Convierte cualquier desplazamiento entero César en un valor válido entre cero y `modulo - 1`. Aplica `((k % modulo) + modulo) % modulo`, por lo que también admite valores negativos o mayores que el alfabeto.

## Contrato

- **Entradas:** entero `k` y entero `modulo` mayor o igual que dos.
- **Salida:** entero normalizado.
- **Errores:** `TypeError` para un desplazamiento no entero y `RangeError` para un módulo inválido.

## Seguridad y complejidad

No modifica estado ni procesa contenido del usuario. Tiempo y memoria constantes, `O(1)`.
