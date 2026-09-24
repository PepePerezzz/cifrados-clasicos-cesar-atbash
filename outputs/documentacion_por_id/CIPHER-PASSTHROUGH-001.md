# CIPHER-PASSTHROUGH-001 — `transformarSoloActivos`

| Campo | Valor |
|---|---|
| Archivo | `programa_web/js/ciphers.js` |
| Tipo | Función pura exportada |

## Qué hace

Es la función central de transformación. Recorre la entrada por grafemas, consulta el mapa del alfabeto y transforma únicamente los símbolos activos. Un símbolo ausente se devuelve exactamente igual y conserva su posición: esta es la regla *passthrough*.

## Contrato

- **Entradas:** texto, alfabeto válido y función `resolverIndice`.
- **Salida:** nueva cadena transformada.
- **Errores:** texto, alfabeto o función inválidos; índice calculado fuera del charset.

## Seguridad

No interpreta HTML ni ejecuta símbolos. Valida que cada índice de destino sea entero y esté dentro del módulo. Los caracteres externos, incluidos saltos, tildes y emojis, no se alteran.

## Complejidad

Tiempo y memoria `O(n)` respecto a los grafemas del mensaje.
