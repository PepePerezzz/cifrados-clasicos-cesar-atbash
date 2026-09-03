# ANALYSIS-LANGUAGE-SCORE-001 — Puntaje lingüístico del español

| Campo | Valor |
|---|---|
| Estado | Prototipo implementado; calibración amplia pendiente |
| Tipo | Función pura |
| Función | `puntuarEspanol(texto)` |
| Archivo | [`programa_web/js/analysis.js`](../programa_web/js/analysis.js) |
| Rúbrica | Descifrado automático sin factor humano, 30 % + 15 % |

## Qué hace

Asigna a cada candidato un puntaje comparable que combina la compatibilidad de frecuencias con el español, la probabilidad de bigramas o trigramas, la cobertura de palabras y penalizaciones por secuencias improbables. No decide el resultado final; devuelve las métricas necesarias para auditar la selección.

## Contrato

- **Entrada:** texto candidato.
- **Salida:** número comparable; un valor mayor indica mejor ajuste al modelo.
- **Precondición:** todas las hipótesis se evalúan con el mismo modelo y normalización.
- **Postcondición:** un puntaje mayor o menor tiene una interpretación única documentada.

## Fórmula general

```text
S(c) = −α·χ²(c) + β·L_ngramas(c) + γ·C_palabras(c) − δ·P(c)
```

La versión actual usa `−χ² + 14·palabras + 2.5·ngramas − 8·secuenciasRaras − penalizaciónVocales`. Es un prototipo transparente y determinista, pero todavía debe calibrarse con un conjunto y evaluarse con otro antes de informar un porcentaje de exactitud.

## Seguridad y calidad

El análisis se realiza localmente. El candidato visible no se convierte a minúsculas ni pierde signos; solo se normaliza una copia. Los datos lingüísticos se importan como estructuras estáticas y no mediante `eval`. Los puntajes no se presentan como probabilidades si no están calibrados como tales.

## Complejidad

Tiempo `O(m)` por candidato para n-gramas de orden fijo, más el costo de segmentar palabras. Memoria `O(m)` o menor, sin contar el modelo estático.

## Pruebas asociadas

- Una oración natural supera a permutaciones aleatorias en un conjunto controlado.
- Componentes del puntaje coinciden con cálculos independientes.
- Texto vacío, sin letras, muy corto y no español.
- Determinismo con la misma versión del modelo.
- Conjunto de evaluación distinto al de calibración.

## Marcador de código

```js
/** @doc-id ANALYSIS-LANGUAGE-SCORE-001 */
```

## Evidencia

- Código local y pesos: [`analysis.js`](../programa_web/js/analysis.js)
- Pruebas básicas: [`analysis.test.mjs`](../programa_web/tests/analysis.test.mjs)
- Corpus externo, licencia, calibración e informe de exactitud: [PENDIENTE]
- Commit permanente: [PENDIENTE]
