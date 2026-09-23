# TEST-AUTODETECT-001 — Suite de detección automática

| Campo | Valor |
|---|---|
| Estado | Pruebas básicas y ocho criptogramas Unicode reales aprobados |
| Tipo | Pruebas unitarias, integración e interfaz |
| Archivos | [`programa_web/tests/analysis.test.mjs`](../programa_web/tests/analysis.test.mjs), [`programa_web/tests/large-charset.test.mjs`](../programa_web/tests/large-charset.test.mjs) |
| Rúbrica | Identificación automática y salida única, 30 % + 15 % |

## Qué hace

Evalúa si el sistema identifica César o Atbash, recupera el desplazamiento César y entrega una sola oración sin intervención humana. Separa los mensajes usados para ajustar pesos de los mensajes usados para medir resultados.

## Conjunto mínimo

- Mensajes con trama creados mediante César para varios `k`.
- Mensajes con trama creados mediante Atbash.
- Textos externos sin trama, largos y naturales en español.
- Oraciones breves, nombres propios, signos y caracteres acentuados.
- Alfabetos ASCII, ASCII imprimible y personalizados Unicode.
- Entradas ambiguas, aleatorias, vacías y en un idioma no modelado.
- Texto con contenido HTML para verificar la salida DOM.

## Aserciones

- El resultado contiene exactamente un campo `texto` cuando el estado es `ok`.
- César incluye el `k` esperado; Atbash usa desplazamiento nulo.
- La interfaz no crea una lista de alternativas.
- Una entrada por debajo del umbral produce `inconcluso`, no una falsa certeza.
- El resultado es determinista con modelo y versión idénticos.
- Una puntuación `-Infinity` nunca se ordena por delante de una puntuación finita.

## Medición responsable

Si se informa exactitud, la fracción se calcula sobre un conjunto de evaluación publicado, con número total de casos, distribución por método y matriz de confusión. No se mezclan ejemplos de calibración. Los fallos se conservan en el reporte y se analizan por longitud, alfabeto e idioma.

## Seguridad y rendimiento

Las pruebas no envían textos a servicios externos. Incluyen límites de tiempo razonables y confirman que una entrada grande se rechace antes de generar todos los candidatos. Los datos son sintéticos o tienen licencia compatible.

## Criterio de aceptación

La trama debe seleccionar correctamente todos los vectores válidos del protocolo. El modo lingüístico debe alcanzar el umbral definido por el equipo en un conjunto separado; el documento final debe reportar el valor real, no uno estimado.

## Marcador de código

```js
// DOC-BLOCK TEST-AUTODETECT-001 START
// DOC-BLOCK TEST-AUTODETECT-001 END
```

## Evidencia

- Archivos: [`analysis.test.mjs`](../programa_web/tests/analysis.test.mjs) y [`large-charset.test.mjs`](../programa_web/tests/large-charset.test.mjs)
- Resultado: 12/12 pruebas aprobadas con `npm test` el 23 de septiembre de 2026.
- Enlace al conjunto amplio de evaluación: [PENDIENTE]
- Versión calibrada, matriz de confusión y commit público: [PENDIENTE]
