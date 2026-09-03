# UI-OUTPUT-001 — Presentación segura de una sola salida

| Campo | Valor |
|---|---|
| Estado | Implementado; prueba DOM específica pendiente |
| Tipo | Función de frontera con el DOM |
| Función | `mostrarResultadoSeguro(idSalida, idDetalle, texto, detalle)` |
| Archivo | [`programa_web/js/app.js`](../programa_web/js/app.js) |
| Rúbrica | Documentación segura y una sola línea descifrada |

## Qué hace

Actualiza la región de resultados sin interpretar como HTML el texto proporcionado por el usuario. En descifrado recibe exclusivamente la hipótesis ganadora y muestra una línea, el método detectado y el desplazamiento cuando el método es César.

## Contrato

- **Entrada:** nodos DOM conocidos y un resultado validado.
- **Salida:** texto visible y estado accesible.
- **Precondición:** el contenedor se obtuvo mediante un selector constante.
- **Postcondición:** no se crean nodos a partir de cadenas no confiables.

## Algoritmo

1. Vaciar estados anteriores mediante propiedades seguras o reemplazo de nodos controlados.
2. Asignar la oración a `textContent`.
3. Seleccionar la etiqueta de método desde una tabla constante.
4. Mostrar `k` solo si el método es César y el valor pasó validación.
5. Anunciar la actualización mediante una región `aria-live`.

## Seguridad

Nunca usa `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `document.write` ni atributos de evento. Un valor como `<img src=x onerror=alert(1)>` debe aparecer literalmente como texto. El contenido no se incluye en URLs, registros ni atributos inseguros. OWASP considera `textContent` un destino apropiado para texto no confiable.

## Complejidad

Tiempo y memoria `O(m)` por la asignación del texto, donde `m` es su longitud.

## Pruebas asociadas

- Cadenas con etiquetas, comillas y entidades HTML.
- Confirmación de que no aparecen elementos hijos inesperados.
- Exactamente un nodo de salida descifrada.
- `k` visible solo para César.
- Lectura accesible del resultado y de errores.

## Marcador de código

```js
/** @doc-id UI-OUTPUT-001 */
```

## Evidencia

- Código local: [`app.js`](../programa_web/js/app.js)
- Revisión estática: no existen usos de `innerHTML`, `document.write` ni `eval`.
- Prueba automatizada de inyección DOM, auditoría accesible y commit: [PENDIENTE]
