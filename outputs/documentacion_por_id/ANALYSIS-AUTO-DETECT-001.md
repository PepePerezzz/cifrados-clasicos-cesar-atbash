# ANALYSIS-AUTO-DETECT-001 — Selección automática del método y la clave

| Campo | Valor |
|---|---|
| Estado | Prototipo implementado y verificado con muestras largas |
| Tipo | Función orquestadora síncrona |
| Función | `detectarYDescifrar(criptograma, alfabeto)` |
| Archivo | [`programa_web/js/analysis.js`](../programa_web/js/analysis.js) |
| Rúbrica | Determinación automática Atbash/César + módulo, 30 % |

## Qué hace

Coordina la generación y puntuación de hipótesis para devolver exactamente una decisión. Informa `metodo: "caesar"` con su desplazamiento o `metodo: "atbash"` sin desplazamiento. Cuando el margen es pequeño mantiene una sola salida, pero la etiqueta como confianza baja; nunca muestra una lista para selección humana.

## Contrato

- **Entrada:** criptograma y alfabeto validados.
- **Salida:** `{ texto, metodo, desplazamiento, confianza }`.
- **Precondición:** todas las funciones dependientes usan el mismo charset literal.
- **Postcondición:** nunca retorna la colección de candidatos a la interfaz.

## Regla de decisión

1. Generar candidatos.
2. Puntuar lingüísticamente todas las hipótesis.
3. Ordenar por puntaje total; en igualdad preferir Atbash y después el menor `k`.
4. Comparar los dos primeros puntajes para etiquetar el margen como alto, medio o bajo.
5. Devolver únicamente la primera hipótesis.

## Seguridad y limitaciones

Debe abortar el trabajo si se exceden límites o si cambia una solicitud más reciente. La “confianza” no debe etiquetarse como porcentaje sin calibración. Para entradas de una sola letra, aleatorias o en otro idioma, el resultado puede ser indeterminado por razones matemáticas.

## Complejidad

Tiempo aproximado `O(n·m)` más el costo de verificación por candidato. Se recomienda evaluación incremental para limitar memoria y mantener la interfaz receptiva.

## Pruebas asociadas

- César y Atbash con trama válida.
- Entrada externa larga en español.
- Empate, baja confianza y más de una trama válida.
- Confirmación de que el objeto final contiene solo una solución.
- Determinismo de método y desempate.

## Marcador de código

```js
/** @doc-id ANALYSIS-AUTO-DETECT-001 */
```

## Evidencia

- Código local y desempate: [`analysis.js`](../programa_web/js/analysis.js)
- Pruebas César/Atbash: [`analysis.test.mjs`](../programa_web/tests/analysis.test.mjs)
- Resultado local: 3/3 casos básicos aprobados el 2 de septiembre de 2026.
- Informe de exactitud y commit permanente: [PENDIENTE]
