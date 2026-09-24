# ANALYSIS-LANGUAGE-SCORE-001 — `puntuarEspanol`

| Campo | Valor |
|---|---|
| Archivo | `programa_web/js/analysis.js` |
| Tipo | Función pura exportada |

## Qué hace

Asigna a un candidato una puntuación comparable según su parecido con el español. Combina chi-cuadrada de frecuencias, palabras comunes, n-gramas, secuencias raras, proporción de vocales, cobertura de letras y penalización de símbolos no lingüísticos.

## Contrato

- **Entrada:** texto candidato.
- **Salida:** número; un valor mayor representa mejor ajuste.
- **Caso sin letras:** devuelve `-Infinity`.

## Seguridad y limitaciones

El análisis es local y determinista. Es una heurística, no una prueba matemática ni un porcentaje de certeza. La penalización de símbolos evita falsos positivos en charsets Unicode amplios.

## Complejidad

Tiempo y memoria `O(n)` por candidato.
