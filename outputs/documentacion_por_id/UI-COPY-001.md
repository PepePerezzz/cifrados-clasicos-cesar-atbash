# UI-COPY-001 — `copiarSalida`

| Campo | Valor |
|---|---|
| Archivo | `programa_web/js/app.js` |
| Tipo | Función asíncrona de interfaz |

## Qué hace

Lee el texto visible de una salida y solicita al navegador copiarlo mediante `navigator.clipboard.writeText`. Informa éxito, ausencia de contenido o denegación del permiso.

## Contrato

- **Entrada:** ID del elemento de salida.
- **Salida:** promesa resuelta sin valor útil.
- **Efecto externo:** escritura en el portapapeles autorizada por el navegador.

## Seguridad

Solo copia `textContent`; no lee archivos ni envía información por red. Los fallos de permiso se capturan sin mostrar detalles internos.
