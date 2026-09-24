# UI-ACTIVE-ALPHABET-001 — `alfabetoActivo`

| Campo | Valor |
|---|---|
| Archivo | `programa_web/js/app.js` |
| Tipo | Función de integración |

## Qué hace

Filtra los candidatos del charset según el conjunto de casillas activas y entrega el resultado a `crearAlfabeto`.

## Contrato

- **Entrada:** estado interno de la interfaz.
- **Salida:** alfabeto validado `{ simbolos, indice, modulo }`.
- **Errores:** propaga las validaciones de `crearAlfabeto`, por ejemplo menos de dos símbolos activos.

## Seguridad

Mantiene el orden original y no acepta directamente índices suministrados por el usuario. Complejidad `O(m)`.
