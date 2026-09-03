# UI-DECRYPT-001 — Flujo de interfaz para descifrar automáticamente

| Campo | Valor |
|---|---|
| Estado | Implementado; evaluación amplia pendiente |
| Tipo | Controlador de evento síncrono |
| Función | `manejarDescifrado(evento)` |
| Archivo | [`programa_web/js/app.js`](../programa_web/js/app.js) |
| Rúbrica | Descifrado sin intervención humana, 30 % + 15 % |

## Qué hace

Recibe únicamente el criptograma y el alfabeto, valida ambos, solicita una decisión a `ANALYSIS-AUTO-DETECT-001` y entrega a la vista una sola solución. No pregunta qué método se utilizó ni permite escoger una rotación.

## Contrato

- **Entrada:** evento de formulario y referencias a los controles de descifrado.
- **Salida:** una actualización con la hipótesis ganadora o un error de validación.
- **Precondición:** el módulo de análisis se cargó correctamente.
- **Postcondición:** la capa de interfaz nunca recibe la lista interna de candidatos.

## Flujo

1. Cancelar el envío convencional y limpiar estados visuales anteriores.
2. Aplicar límites y construir el alfabeto.
3. Ejecutar `detectarYDescifrar`.
4. Enviar sólo el objeto ganador a `UI-OUTPUT-001`.
5. Mostrar método, desplazamiento César y confianza cualitativa.
6. Ante una excepción, limpiar la salida y anunciar un error controlado.

## Seguridad y rendimiento

Debe ignorar el resultado de una solicitud anterior si el usuario inició otra. Para cargas altas puede delegar el análisis a un *Web Worker*. Los errores visibles no incluyen trazas, rutas locales ni contenido completo de hipótesis fallidas.

## Pruebas asociadas

- No existe campo de método ni de clave en este modo.
- César devuelve método y desplazamiento correctos.
- Atbash devuelve desplazamiento nulo.
- Error no concluyente sin lista de alternativas.
- Doble envío y cancelación lógica de un resultado obsoleto.

## Marcador de código

```js
/** @doc-id UI-DECRYPT-001 */
```

## Evidencia

- Código local: [`app.js`](../programa_web/js/app.js)
- Pruebas del motor: [`analysis.test.mjs`](../programa_web/tests/analysis.test.mjs)
- Evaluación amplia, prueba DOM y commit público: [PENDIENTE]
