# ANALYSIS-TEXT-NORMALIZE-001 — `textoAnalizable`

| Campo | Valor |
|---|---|
| Archivo | `programa_web/js/analysis.js` |
| Tipo | Función privada y pura |

## Qué hace

Prepara una copia de un candidato para analizarlo: convierte a minúsculas con configuración española, aplica normalización NFD, elimina marcas combinantes y reemplaza caracteres no lingüísticos por espacios.

## Contrato

- **Entrada:** texto candidato.
- **Salida:** copia simplificada para el modelo de español.
- **Efecto sobre el resultado:** ninguno; el texto original nunca se modifica ni se muestra normalizado.

## Seguridad

La separación entre copia analítica y salida evita reescribir tildes o símbolos del mensaje recuperado. No usa red, HTML ni evaluación dinámica.

## Complejidad

Tiempo y memoria `O(n)`.
