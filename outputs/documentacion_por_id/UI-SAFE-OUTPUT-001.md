# UI-SAFE-OUTPUT-001 — `mostrarResultadoSeguro`

| Campo | Valor |
|---|---|
| Archivo | `programa_web/js/app.js` |
| Tipo | Función con efecto en el DOM |

## Qué hace

Escribe el resultado y su detalle en los elementos indicados. Se usa tanto para presentar respuestas como para limpiar salidas después de un error.

## Contrato

- **Entradas:** IDs de salida y detalle, texto y descripción opcionales.
- **Salida:** ninguna.
- **Efecto:** modifica dos elementos del DOM.

## Seguridad

Usa exclusivamente `textContent`. Una entrada que contenga etiquetas o scripts se muestra como texto literal y no se ejecuta.
