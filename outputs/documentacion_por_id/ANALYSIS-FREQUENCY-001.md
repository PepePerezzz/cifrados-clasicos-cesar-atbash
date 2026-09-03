# ANALYSIS-FREQUENCY-001 — Análisis de frecuencias inspirado en al-Kindī

| Campo | Valor |
|---|---|
| Estado | Implementado como bloque; fuente/corpus ampliado pendiente |
| Tipo | Bloque puro dentro del puntaje |
| Bloque | Conteo y chi cuadrada dentro de `puntuarEspanol` |
| Archivo | [`programa_web/js/analysis.js`](../programa_web/js/analysis.js) |
| Rúbrica | Conocimientos de al-Kindī y descifrado automático, 15 % + 30 % |

## Qué hace

Cuenta las letras de una copia normalizada del candidato y compara su distribución con frecuencias esperadas del español. Produce medidas cuantitativas, entre ellas chi cuadrada, que permiten ordenar hipótesis sin que el usuario inspeccione manualmente cada rotación.

## Relación histórica

Al-Kindī explicó que las letras de un idioma no aparecen con igual frecuencia y que una sustitución monoalfabética conserva esa desigualdad. Esta función implementa el paso de conteo y comparación. Los n-gramas y palabras se calculan en otro ID para conservar la trazabilidad de la aportación original.

## Contrato

- **Entrada:** candidato, tabla esperada y reglas de normalización lingüística.
- **Salida:** histograma, total analizado, valor chi cuadrada y advertencias.
- **Precondición:** el modelo declara idioma, fuente, versión y licencia.
- **Postcondición:** el texto original no se modifica.

## Algoritmo

1. Crear una copia en minúsculas y normalizada para el análisis.
2. Conservar las letras definidas por el modelo y contar sus apariciones.
3. Convertir frecuencias esperadas en conteos esperados para la longitud observada.
4. Calcular `χ² = Σ((O−E)²/E)` con manejo definido para expectativas nulas.
5. Devolver métricas; no decidir por sí sola qué candidato gana.

## Seguridad y limitaciones

El texto breve produce estimaciones inestables. La función debe devolver una señal de muestra insuficiente y no fabricar certeza. El modelo lingüístico se incluye como dato estático, nunca como código evaluado. No se debe descargar un corpus durante la operación ni enviar el mensaje a terceros.

## Complejidad

Tiempo `O(m + L)` y memoria `O(L)`, donde `m` es la longitud del texto y `L` el número de letras modeladas.

## Pruebas asociadas

- Histograma manual pequeño.
- Texto sin letras y texto muy corto.
- Suma de conteos igual al total analizado.
- Comparación con un vector calculado de manera independiente.
- Inmutabilidad del texto presentado al usuario.

## Marcador de código

```js
/** @doc-id ANALYSIS-FREQUENCY-001 */
```

## Evidencia

- Código local: [`analysis.js`](../programa_web/js/analysis.js)
- Marcadores: `DOC-BLOCK ANALYSIS-FREQUENCY-001 START/END`.
- Fuente/licencia ampliada, prueba numérica independiente y commit: [PENDIENTE]
