# CIPHER-CAESAR-DEC-001 — `descifrarCesar`

| Campo | Valor |
|---|---|
| Archivo | `programa_web/js/ciphers.js` |
| Tipo | Función pura exportada |

## Qué hace

Revierte César restando el desplazamiento a la posición de cada símbolo activo. Usa la misma normalización y regla passthrough que el cifrado.

## Regla

`destino = (posición - desplazamiento + módulo) mod módulo`.

## Contrato

- **Entradas:** criptograma, entero `k` y alfabeto validado.
- **Salida:** texto descifrado.
- **Propiedad:** con el mismo alfabeto y `k`, revierte el resultado de `cifrarCesar`.

## Complejidad

Tiempo y memoria `O(n)`.
