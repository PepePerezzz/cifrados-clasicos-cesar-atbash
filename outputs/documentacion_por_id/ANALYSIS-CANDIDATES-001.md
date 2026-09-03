# ANALYSIS-CANDIDATES-001 — Generación automática de candidatos

| Campo | Valor |
|---|---|
| Estado | Implementado y verificado localmente |
| Tipo | Función generadora o función pura |
| Función | `generarCandidatos(criptograma, alfabeto)` |
| Archivo | [`programa_web/js/analysis.js`](../programa_web/js/analysis.js) |
| Rúbrica | Determinar Atbash o César y el desplazamiento, 30 % |

## Qué hace

Produce internamente una hipótesis Atbash y una hipótesis César por cada desplazamiento permitido. Añade metadatos uniformes para que las etapas de verificación y puntaje puedan trabajar sin lógica especial de interfaz.

## Contrato

- **Entrada:** criptograma validado y alfabeto activo.
- **Salida interna:** secuencia de objetos `{ texto, metodo, desplazamiento }`.
- **Precondición:** los límites de longitud y tamaño del alfabeto ya fueron aplicados.
- **Postcondición:** cada método y desplazamiento del dominio aparece exactamente una vez.

## Algoritmo

1. Calcular Atbash y etiquetarlo con `metodo: "atbash"` y `desplazamiento: null`.
2. Para `k = 1…n−1`, llamar a `descifrarCesar` y etiquetar cada resultado.
3. No renderizar, registrar ni exponer la colección fuera del motor de análisis.
4. Materializar el arreglo; el límite de 256 símbolos evita un crecimiento sin control.

El desplazamiento cero puede incluirse en pruebas de identidad, pero se excluye del flujo normal si el cifrador prohíbe `k′ = 0`.

## Seguridad

La cantidad de trabajo crece con `n·m`. Por ello, la validación debe limitar el alfabeto y el texto antes de entrar al ciclo. Si la interfaz usa un *Web Worker*, los mensajes entre hilos deben contener solo los datos necesarios y no persistirse.

## Complejidad

Tiempo `O(n·m)`. La memoria es `O(n·m)` si materializa todas las cadenas u `O(m)` adicional si genera y evalúa una por una.

## Pruebas asociadas

- Conteo exacto de candidatos para varios tamaños de alfabeto.
- Metadatos de método y `k` correctos.
- Ausencia de duplicados en el dominio definido.
- Límite de carga antes de generar candidatos.
- Ninguna inserción de candidatos en el DOM.

## Marcador de código

```js
/** @doc-id ANALYSIS-CANDIDATES-001 */
```

## Evidencia

- Dominio real de `k`: `1…n−1`.
- Código local: [`analysis.js`](../programa_web/js/analysis.js)
- Prueba de conteo: [`analysis.test.mjs`](../programa_web/tests/analysis.test.mjs)
- Commit permanente y medición de desempeño: [PENDIENTE]
